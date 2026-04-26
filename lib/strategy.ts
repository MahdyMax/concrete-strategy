import {
  Allocation,
  RiskTier,
  SliderValues,
  StrategyResult,
  STRATEGY_NAMES,
  STRATEGY_DESCRIPTIONS,
  FUN_FACTS,
  VAULTS,
  RISK_EMOJIS,
} from "./data";

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

export function computeAggression(sliders: SliderValues): number {
  const { risk, stability, yieldHunger } = sliders;
  return (risk * 0.4 + yieldHunger * 0.4 + (100 - stability) * 0.2) / 100;
}

function computeRawAllocations(aggression: number): Allocation {
  let usdt: number, weeth: number, wbtc: number, thbill: number,
    theousdc: number, theousdc_arb: number;

  if (aggression < 0.25) {
    // Ultra-conservative: heavy stable & treasury
    thbill = 35 + Math.round((0.25 - aggression) * 60);
    usdt = 30 + Math.round((0.25 - aggression) * 40);
    theousdc = 15;
    theousdc_arb = 10;
    weeth = 5;
    wbtc = 100 - thbill - usdt - theousdc - theousdc_arb - weeth;
  } else if (aggression < 0.5) {
    // Balanced conservative
    const t = (aggression - 0.25) / 0.25;
    thbill = Math.round(25 - t * 15);
    usdt = Math.round(30 - t * 10);
    theousdc = Math.round(15 - t * 8);
    theousdc_arb = Math.round(10 - t * 5);
    weeth = Math.round(10 + t * 25);
    wbtc = 100 - thbill - usdt - theousdc - theousdc_arb - weeth;
  } else if (aggression < 0.75) {
    // Balanced aggressive
    const t = (aggression - 0.5) / 0.25;
    weeth = Math.round(35 + t * 25);
    wbtc = Math.round(15 + t * 10);
    usdt = Math.round(20 - t * 12);
    thbill = Math.round(10 - t * 7);
    theousdc = Math.round(7 - t * 5);
    theousdc_arb = 100 - weeth - wbtc - usdt - thbill - theousdc;
  } else {
    // Full degen: restaking dominant
    const t = (aggression - 0.75) / 0.25;
    weeth = Math.round(55 + t * 30);
    wbtc = Math.round(20 + t * 10);
    usdt = Math.max(3, Math.round(15 - t * 12));
    thbill = Math.max(0, Math.round(7 - t * 7));
    theousdc = Math.max(0, Math.round(5 - t * 5));
    theousdc_arb = 100 - weeth - wbtc - usdt - thbill - theousdc;
  }

  // Clamp negatives
  [thbill, usdt, weeth, wbtc, theousdc, theousdc_arb].forEach((v) => Math.max(0, v));
  thbill = Math.max(0, thbill);
  usdt = Math.max(0, usdt);
  weeth = Math.max(0, weeth);
  wbtc = Math.max(0, wbtc);
  theousdc = Math.max(0, theousdc);
  theousdc_arb = Math.max(0, theousdc_arb);

  // Normalise to 100
  const total = usdt + weeth + wbtc + thbill + theousdc + theousdc_arb;
  const alloc: Allocation = {
    usdt: Math.round((usdt / total) * 100),
    weeth: Math.round((weeth / total) * 100),
    wbtc: Math.round((wbtc / total) * 100),
    thbill: Math.round((thbill / total) * 100),
    theousdc: Math.round((theousdc / total) * 100),
    theousdc_arb: 0,
  };
  alloc.theousdc_arb =
    100 - alloc.usdt - alloc.weeth - alloc.wbtc - alloc.thbill - alloc.theousdc;

  return alloc;
}

function computeApyRange(alloc: Allocation): { min: string; max: string } {
  const vaultMap = Object.fromEntries(VAULTS.map((v) => [v.id, v]));
  const minRaw =
    vaultMap.thbill.apyMin * (alloc.thbill / 100) +
    vaultMap.usdt.apyMin * (alloc.usdt / 100) +
    vaultMap.wbtc.apyMin * (alloc.wbtc / 100) +
    vaultMap.weeth.apyMin * (alloc.weeth / 100) +
    vaultMap.theousdc.apyMin * (alloc.theousdc / 100) +
    vaultMap.theousdc_arb.apyMin * (alloc.theousdc_arb / 100);

  const maxRaw =
    vaultMap.thbill.apyMax * (alloc.thbill / 100) +
    vaultMap.usdt.apyMax * (alloc.usdt / 100) +
    vaultMap.wbtc.apyMax * (alloc.wbtc / 100) +
    vaultMap.weeth.apyMax * (alloc.weeth / 100) +
    vaultMap.theousdc.apyMax * (alloc.theousdc / 100) +
    vaultMap.theousdc_arb.apyMax * (alloc.theousdc_arb / 100);

  return {
    min: clamp(minRaw, 5, 25).toFixed(1),
    max: clamp(maxRaw, 6, 30).toFixed(1),
  };
}

function getRiskTier(aggression: number): RiskTier {
  if (aggression < 0.35) return "low";
  if (aggression < 0.65) return "medium";
  return "high";
}

function getTopVault(alloc: Allocation): string {
  const entries = Object.entries(alloc) as [keyof Allocation, number][];
  const top = entries.reduce((a, b) => (b[1] > a[1] ? b : a));
  const labels: Record<keyof Allocation, string> = {
    usdt: "USDT Stable",
    weeth: "WeETH",
    wbtc: "WBTC",
    thbill: "thBILL",
    theousdc: "Theo USDC",
    theousdc_arb: "Theo USDC (Arb)",
  };
  return labels[top[0]];
}

function computeTVLExposure(alloc: Allocation): string {
  const vaultMap = Object.fromEntries(VAULTS.map((v) => [v.id, v]));
  const totalTVL = (Object.keys(alloc) as (keyof Allocation)[]).reduce(
    (sum, id) => sum + (vaultMap[id]?.tvlRaw ?? 0) * (alloc[id] / 100),
    0
  );
  if (totalTVL >= 100) return `$${totalTVL.toFixed(0)}M`;
  return `$${totalTVL.toFixed(1)}M`;
}

function computeDiversificationScore(alloc: Allocation): number {
  // Shannon entropy-based score normalised to 1-10
  const values = Object.values(alloc).filter((v) => v > 0);
  const total = values.reduce((a, b) => a + b, 0);
  const entropy = -values.reduce((sum, v) => {
    const p = v / total;
    return sum + p * Math.log(p);
  }, 0);
  const maxEntropy = Math.log(6); // 6 vaults
  return Math.round(1 + (entropy / maxEntropy) * 9);
}

export function computeStrategy(sliders: SliderValues): StrategyResult {
  const aggression = computeAggression(sliders);
  const riskTier = getRiskTier(aggression);
  const allocation = computeRawAllocations(aggression);
  const { min: apyMin, max: apyMax } = computeApyRange(allocation);

  const riskLabels: Record<RiskTier, string> = {
    low: "Low Risk",
    medium: "Medium Risk",
    high: "High Risk",
  };

  return {
    name: pick(STRATEGY_NAMES[riskTier]),
    description: pick(STRATEGY_DESCRIPTIONS[riskTier]),
    funFact: pick(FUN_FACTS),
    allocation,
    apyMin,
    apyMax,
    riskTier,
    riskLabel: riskLabels[riskTier],
    riskEmoji: RISK_EMOJIS[riskTier],
    aggression,
    topVault: getTopVault(allocation),
    totalTVLExposure: computeTVLExposure(allocation),
    diversificationScore: computeDiversificationScore(allocation),
    timestamp: new Date().toISOString(),
  };
}

export function buildTweetText(result: StrategyResult): string {
  return encodeURIComponent(
    `I just built my Dream Concrete Strategy: ${result.name}\n` +
      `Expected ${result.apyMin}–${result.apyMax}% APY | ${result.riskLabel}\n` +
      `Diversification Score: ${result.diversificationScore}/10\n\n` +
      `Build yours 👉 https://app.concrete.xyz/earn\n\n` +
      `@ConcreteXYZ #DeFi #Concrete #YieldFarming #Restaking`
  );
}

export function saveToLocalStorage(
  result: StrategyResult,
  sliders: SliderValues
): void {
  if (typeof window === "undefined") return;
  try {
    const existing = JSON.parse(
      localStorage.getItem("concrete_strategies") || "[]"
    );
    const updated = [
      { ...result, sliders, savedAt: new Date().toISOString() },
      ...existing,
    ].slice(0, 10);
    localStorage.setItem("concrete_strategies", JSON.stringify(updated));
  } catch {
    // silently ignore
  }
}

export function loadFromLocalStorage(): (StrategyResult & { sliders: SliderValues; savedAt: string })[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("concrete_strategies") || "[]");
  } catch {
    return [];
  }
}
