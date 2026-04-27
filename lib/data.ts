// ── Types ────────────────────────────────────────────────────────────────────

export interface Vault {
  id: "usdt" | "weeth" | "wbtc" | "thbill" | "theousdc" | "theousdc_arb";
  name: string;
  emoji: string;
  apy: string;
  apyMin: number;
  apyMax: number;
  tvl: string;
  tvlRaw: number;
  badgeText: string;
  network: string;
  networkEmoji: string;
  description: string;
  color: string;
  vaultUrl: string;
  depositAsset: string;
  institutional?: boolean;
  pointsEnabled?: boolean;
}

export interface Allocation {
  usdt: number;
  weeth: number;
  wbtc: number;
  thbill: number;
  theousdc: number;
  theousdc_arb: number;
}

export type RiskTier = "low" | "medium" | "high";

export interface StrategyResult {
  name: string;
  description: string[];
  funFact: string;
  allocation: Allocation;
  apyMin: string;
  apyMax: string;
  riskTier: RiskTier;
  riskLabel: string;
  riskEmoji: string;
  aggression: number;
  topVault: string;
  totalTVLExposure: string;
  diversificationScore: number;
  timestamp: string;
}

export interface SliderValues {
  risk: number;
  stability: number;
  yieldHunger: number;
}

export interface SavedStrategy extends StrategyResult {
  sliders: SliderValues;
  savedAt: string;
}

// ── Palette ───────────────────────────────────────────────────────────────────
export const PALETTE = {
  black: "#000001",
  grey: "#6e7271",
  gold: "#ffdf64",
  white: "#ffffff",
  goldDim: "#c9ad3e",
  greyLight: "#a8abaa",
} as const;

// ── Vault definitions (from app.concrete.xyz/earn, April 2026) ────────────────
export const VAULTS: Vault[] = [
  {
    id: "weeth",
    name: "WeETH Vault",
    emoji: "⚡",
    apy: "Institutional",
    apyMin: 10,
    apyMax: 18,
    tvl: "$705.3M",
    tvlRaw: 705.3,
    badgeText: "Restaking",
    network: "Ethereum",
    networkEmoji: "🔷",
    description:
      "Concrete's flagship restaking vault. $705M+ TVL with institutional APY strategies across Ethereum's restaking layer. ERC-4626 standardised. Monitored by Hypernative in real-time.",
    color: PALETTE.greyLight,
    vaultUrl: "https://app.concrete.xyz/vault/concrete/delta-weeth/0xb9dc54c8261745cb97070cefbe3d3d815aee8f20",
    depositAsset: "weETH",
    institutional: true,
  },
  {
    id: "thbill",
    name: "Theo thBILL Stable",
    emoji: "🏛️",
    apy: "~6.5%",
    apyMin: 5.5,
    apyMax: 7.5,
    tvl: "$66.5M",
    tvlRaw: 66.5,
    badgeText: "Ultra Safe",
    network: "Ethereum",
    networkEmoji: "🔷",
    description:
      "Treasury bill-backed stable vault. $66.5M TVL. Bridge & deposit with ETH, USDC, or USDT. The institutional safety net of the Concrete ecosystem.",
    color: PALETTE.goldDim,
    vaultUrl: "https://thusd.theo.xyz/",
    depositAsset: "thBILL",
  },
  {
    id: "usdt",
    name: "Concrete DeFi USDT",
    emoji: "💵",
    apy: "8.5%",
    apyMin: 7.5,
    apyMax: 9.5,
    tvl: "$62.4M",
    tvlRaw: 62.4,
    badgeText: "Stable",
    network: "Ethereum",
    networkEmoji: "🔷",
    description:
      "8.5% target APY with Concrete's automated quantitative rebalancing. Deposit once, earn forever. Audited by Cantina, Code4rena, Zellic & more.",
    color: PALETTE.gold,
    vaultUrl: "https://app.concrete.xyz/vault/concrete/defi-finance-usdt/0x0e609b710da5e0aa476224b6c0e5445ccc21251e",
    depositAsset: "USDT",
  },
  {
    id: "theousdc",
    name: "Theo USDC",
    emoji: "🔵",
    apy: "~6%",
    apyMin: 5,
    apyMax: 7,
    tvl: "$20.5M",
    tvlRaw: 20.5,
    badgeText: "Stable",
    network: "Ethereum",
    networkEmoji: "🔷",
    description:
      "USDC-denominated stable vault on Ethereum. Optimized for capital preservation with competitive stable yields and seamless Enso-powered swap deposits.",
    color: PALETTE.greyLight,
    vaultUrl: "https://thusd.theo.xyz/",
    depositAsset: "USDC",
  },
  {
    id: "wbtc",
    name: "WBTC Vault",
    emoji: "🟠",
    apy: "7%",
    apyMin: 6,
    apyMax: 8.5,
    tvl: "$4.3M",
    tvlRaw: 4.3,
    badgeText: "Bitcoin",
    network: "Ethereum",
    networkEmoji: "🔷",
    description:
      "Bitcoin yield without selling your BTC. 7% target APY. Backed by Figment partnership for staking infrastructure. Stack sats AND earn yield.",
    color: PALETTE.white,
    vaultUrl: "https://wbtc.concrete.xyz/",
    depositAsset: "WBTC",
  },
  {
    id: "theousdc_arb",
    name: "Theo USDC (Arbitrum)",
    emoji: "🔴",
    apy: "~6%",
    apyMin: 5,
    apyMax: 7,
    tvl: "$8.7M",
    tvlRaw: 8.7,
    badgeText: "L2 Stable",
    network: "Arbitrum",
    networkEmoji: "🔴",
    description:
      "USDC stable yield on Arbitrum L2 — same institutional-grade Concrete infrastructure, lower gas costs. Bridge & deposit supported via Enso routing.",
    color: PALETTE.grey,
    vaultUrl: "https://thusd.theo.xyz/",
    depositAsset: "USDC",
  },
];

// ── Strategy names (12 per tier) ─────────────────────────────────────────────
export const STRATEGY_NAMES: Record<RiskTier, string[]> = {
  low: [
    "Safe Yield Guardian 🛡️",
    "The Steady Compounder 🌱",
    "Fort Knox Farmer 🏰",
    "Chill Stable Harvester 🌴",
    "The Zen Stablecoin Monk 🧘",
    "Diamond Hands Defender 💎",
    "The Patient Accumulator 🐢",
    "Quiet Money Machine 🤫",
    "The Boring Billionaire Blueprint 🏦",
    "Stablecoin Sommelier 🍷",
    "Treasury Whisperer 📜",
    "The Silent Compounder 🌙",
  ],
  medium: [
    "Balanced Yield Architect 🏗️",
    "The Calculated Risk Taker ⚖️",
    "Strategic Compounder Pro 📐",
    "The Smart Diversifier 🧠",
    "Portfolio Alchemist ✨",
    "Methodical Yield Engineer 🔧",
    "The Pragmatic Farmer 🌾",
    "Risk-Adjusted Royalty 👑",
    "The Moderate Maximalist 🎯",
    "Diversified Degen Lite 🃏",
    "The Yield Sculptor 🎨",
    "Structured Chaos Agent 🌀",
  ],
  high: [
    "Degen Restaking Rocket 🚀",
    "The Yield Vampire 🧛",
    "Moonshot Maximalist 🌙",
    "Turbo Degen Mode 💥",
    "The Restaking Berserker ⚔️",
    "Max Yield Chaos Agent 🎰",
    "Gigabrain APY Hunter 🧬",
    "The Perpetual Degen Machine 🤖",
    "Ape Season Architect 🦍",
    "The Restaking Overlord 👾",
    "Full Send Yield Farmer 🌪️",
    "The APY Supremacist 🔥",
  ],
};

// ── Descriptions (3 per tier, 4 paragraphs each) ──────────────────────────────
export const STRATEGY_DESCRIPTIONS: Record<RiskTier, string[][]> = {
  low: [
    [
      "Your strategy is the cozy cardigan of DeFi portfolios. You've chosen the path of wisdom, allocating heavily to Concrete's battle-tested stablecoin and treasury vaults — infrastructure managing $902M+ in total assets.",
      "While degens sweat over liquidation alerts at 3am, you're collecting automated yield from Concrete's quantitative rebalancing engine, which processes capital across the best on-chain opportunities without you lifting a finger.",
      "Your thBILL and USDT allocations are backed by treasury-grade stability. Concrete's three-party automation model — Transaction Proposer, Independent Signer, Smart Contract Safeguards — runs 24/7 so you genuinely don't have to.",
      "One deposit. No protocol-hopping. No strategy micromanagement. Just yield, compounding quietly like a garden you never have to weed.",
    ],
    [
      "You've discovered what every DeFi OG eventually learns: boring is extraordinarily beautiful.",
      "Your stable allocations sit inside vaults audited by Cantina, Code4rena, Halborn, Zellic, and monitored by Hypernative's real-time security system. This isn't just yield — it's yield with institutional-grade guardrails.",
      "The Concrete DeFi USDT vault's 8.5% target APY is powered by automated strategies you'd need a quant team to replicate manually. You're essentially getting hedge fund execution with one click.",
      "Low volatility, steady returns, enough peace of mind to enjoy your weekend. Rare energy in this industry. Very rare.",
    ],
    [
      "The tortoise wins the race, and your Concrete portfolio agrees completely.",
      "Treasury-backed vaults and stablecoin yield — the kind Concrete's quantitative system squeezes every sustainable basis point from, without the drama of volatile assets or mercenary liquidity chasing incentives.",
      "Backed by Polychain, VanEck, and YziLabs, Concrete has processed $11.25B+ in total volume with proven infrastructure. Your stable allocation is in capable hands.",
      "No leverage. No illiquid positions. Clean, compounding, audited yield. Your future self — with significantly more stablecoins — will nod approvingly.",
    ],
  ],
  medium: [
    [
      "You've achieved the holy grail of DeFi: not reckless, but not boring either. The vibe is 'portfolio manager who also goes to the gym.'",
      "Your balanced Concrete allocation combines stablecoin predictability with restaking upside — letting Concrete's ERC-4626-standardised vault infrastructure do the heavy lifting across multiple yield layers simultaneously.",
      "WeETH restaking captures Ethereum's staking premium while your stable floor (USDT/thBILL) cushions the ride. Concrete's automated rebalancing adjusts continuously so you don't babysit anything.",
      "This is managed DeFi done right. You're not timing markets or chasing incentives — you're allocating to a structured strategy and letting Concrete's $902M+ infrastructure engine do what it was built for.",
    ],
    [
      "Somewhere between 'my portfolio is up' and 'my portfolio exists' — you've built something genuinely sustainable.",
      "Diversified exposure across Concrete's ecosystem: stablecoin yield, Bitcoin optimization, and restaking premiums working in parallel. The Figment partnership even integrates staking infrastructure for BTC — your WBTC allocation benefits at the infrastructure level.",
      "Concrete vaults centralize strategy execution, not custody. You stay in control of assets while the quantitative engine rebalances and protects against the $3.1B in multisig losses that plagued DeFi in H1 2025.",
      "It's like index investing, but the index is 'best automated yield strategies on Ethereum and Arbitrum,' run by a quant team you never have to pay separately.",
    ],
    [
      "Neither degen nor bore — you walk the middle path with quiet, deliberate confidence.",
      "Your allocation captures yield from four distinct sources: stablecoin efficiency, treasury stability, Bitcoin's store-of-value premium, and Ethereum restaking — all coordinated by Concrete's automated framework.",
      "On-chain asset management grew 118% in 2025 to $35B. You're early to the part that actually works: institutional-grade vault infrastructure accessible with a single deposit.",
      "The result is a portfolio that explains itself in one sentence: 'I allocate to automated on-chain vaults that manage risk and compound yield.' Nobody argues with that at dinner.",
    ],
  ],
  high: [
    [
      "You absolute unit. You've gone full degen and we deeply respect the conviction.",
      "Your strategy leans aggressively into Concrete's WeETH restaking vault — the $705M TVL beast running institutional APY strategies across Ethereum's restaking layer. This is not a savings account.",
      "Even at these settings, Concrete's three-party security model has your back: Transaction Proposer, Independent Signer, and Smart Contract Safeguards running at market speed — no governance delays, no bottlenecks.",
      "Pro tip: tell people you're 'maximizing risk-adjusted returns through ERC-4626 standardized restaking infrastructure.' The silence that follows is called respect.",
    ],
    [
      "WAGMI — With Automated Governance, Monitoring, and Infrastructure. You've gone aggressive and Concrete's got your back.",
      "Heavy WeETH allocation puts you inside Concrete's flagship institutional vault: audited by three separate firms, monitored by Hypernative in real-time, backed by quantitative strategies institutional allocators use — just with a consumer interface.",
      "The restaking premium is real. Ethereum validator economics plus restaking rewards plus Concrete's automated compounding creates layered yield that manual DeFi participation can't replicate.",
      "High yield. High conviction. Institutional infrastructure. You're aggressive, but at least you're being aggressive with the best stack in the game.",
    ],
    [
      "The audacity. The vision. The complete prioritization of yield over sleep. We salute you.",
      "Your portfolio is built around restaking — WeETH vault at $705M+ TVL is your primary engine. The Figment partnership means even your BTC exposure benefits from staking infrastructure at the protocol level.",
      "Concrete processes $11.25B+ in total volume with automated execution faster than any governance process. When your vault needs rebalancing, it executes — no committee, no delays, just market-speed allocation.",
      "May the APYs be ever in your favor, may 6 auditing firms keep your funds safe, and may you occasionally close the charts and touch grass.",
    ],
  ],
};

// ── Fun facts ─────────────────────────────────────────────────────────────────
export const FUN_FACTS: string[] = [
  "🏛️ Concrete is audited by 6 top firms: Cantina, Code4rena, Halborn, Zellic, Hypernative & zeroShadow.",
  "💰 Total assets on Concrete platform: $902.3M — and still climbing.",
  "📊 Concrete has processed over $11.25B in total volume since launch.",
  "🔗 All Concrete vaults use ERC-4626 — the gold standard for on-chain vault interoperability.",
  "🏦 Backed by Polychain, VanEck, YziLabs, Portal Ventures, Hashed & Tribe Capital.",
  "⚡ The WeETH Vault holds $705M+ TVL — one of the largest restaking vaults in all of DeFi.",
  "🤖 Concrete's three-party automation eliminated single-point failure risks that cost DeFi $3.1B in H1 2025.",
  "🌐 Concrete vaults operate across Ethereum, Arbitrum, Berachain, Morph & Katana.",
  "📈 On-chain asset management grew 118% in 2025 to $35B. Concrete is leading this wave.",
  "🔒 Hypernative provides real-time security monitoring — threats are caught before they become losses.",
  "🤝 Concrete partnered with Figment to integrate staking infrastructure for BTC & XRP yield strategies.",
  "🌍 Deposit any asset into any vault via Enso routing — swap ETH, USDC, or USDT directly.",
  "🏗️ Concrete's Enterprise offering powers institutional clients — same infrastructure, bigger bags.",
];

// ── Mascot states ─────────────────────────────────────────────────────────────
export interface MascotState {
  emoji: string;
  label: string;
}

export function getMascotState(aggression: number): MascotState {
  if (aggression < 0.15) return { emoji: "😴", label: "Ultra chill. Almost asleep. Maximum yield." };
  if (aggression < 0.28) return { emoji: "😌", label: "Zen mode. Treasury vibes only." };
  if (aggression < 0.42) return { emoji: "🤖", label: "Calculating optimal yield pathways..." };
  if (aggression < 0.55) return { emoji: "😤", label: "Getting hungry for those yields!" };
  if (aggression < 0.68) return { emoji: "🤑", label: "Show me the APY! Restaking detected!" };
  if (aggression < 0.82) return { emoji: "🔥", label: "It's getting spicy in here..." };
  if (aggression < 0.92) return { emoji: "🚀", label: "FULL DEGEN MODE. Wen lambo?" };
  return { emoji: "💀", label: "Sir, this is a Concrete vault... not a casino. (or is it?)" };
}

export const RISK_EMOJIS: Record<RiskTier, string> = {
  low: "🛡️",
  medium: "⚖️",
  high: "🔥",
};

export const ALLOC_COLORS: Record<string, string> = {
  usdt: "#ffdf64",
  weeth: "#a8abaa",
  wbtc: "#ffffff",
  thbill: "#c9ad3e",
  theousdc: "#6e7271",
  theousdc_arb: "#3a3c3b",
};

export const VAULT_DISPLAY_NAMES: Record<string, string> = {
  usdt: "USDT Stable",
  weeth: "WeETH Restaking",
  wbtc: "WBTC Yield",
  thbill: "thBILL Safe",
  theousdc: "Theo USDC",
  theousdc_arb: "Theo USDC (Arb)",
};
