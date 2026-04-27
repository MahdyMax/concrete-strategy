import { NextResponse } from "next/server";

// ── Vault contract addresses (used as DefiLlama pool IDs) ──────────────────
// If Concrete's yield adapter gets added to DefiLlama these IDs will match
const VAULT_POOL_IDS: Record<string, string> = {
  usdt:         "0x0e609b710da5e0aa476224b6c0e5445ccc21251e-ethereum",
  weeth:        "0xb9dc54c8261745cb97070cefbe3d3d815aee8f20-ethereum",
  wbtc:         "0xca4f26f31a3b42afe6a5ae6c2d5c78a8f4ab9998-ethereum",
  thbill:       "0x9f5e7ef0e94d0f781a8af87c3d0b52e3eac9d56f-ethereum",
  theousdc:     "0x4d5fb33f842de73f4ec17ff49c3a7e0e0f5c3f9a-ethereum",
  theousdc_arb: "0x7f3a9c8e2b1d4f06a5c8e3b2a1d7f06c5e8b3a2d-arbitrum",
};

// ── Hardcoded fallback data (sourced from app.concrete.xyz/earn, Apr 2026) ──
// This is always returned when DefiLlama doesn't have the pool yet
const FALLBACK_VAULTS = [
  {
    id: "weeth",
    symbol: "weETH",
    chain: "Ethereum",
    tvlUsd: 705300000,
    apy: null,          // WeETH is "Institutional" — no public fixed APY
    apyDisplay: "Institutional",
    source: "fallback",
  },
  {
    id: "thbill",
    symbol: "thBILL",
    chain: "Ethereum",
    tvlUsd: 66500000,
    apy: 6.5,
    apyDisplay: "~6.5%",
    source: "fallback",
  },
  {
    id: "usdt",
    symbol: "USDT",
    chain: "Ethereum",
    tvlUsd: 62400000,
    apy: 8.5,
    apyDisplay: "8.5%",
    source: "fallback",
  },
  {
    id: "theousdc",
    symbol: "USDC",
    chain: "Ethereum",
    tvlUsd: 20500000,
    apy: 6.0,
    apyDisplay: "~6%",
    source: "fallback",
  },
  {
    id: "wbtc",
    symbol: "WBTC",
    chain: "Ethereum",
    tvlUsd: 4300000,
    apy: 7.0,
    apyDisplay: "7%",
    source: "fallback",
  },
  {
    id: "theousdc_arb",
    symbol: "USDC",
    chain: "Arbitrum",
    tvlUsd: 8700000,
    apy: 6.0,
    apyDisplay: "~6%",
    source: "fallback",
  },
];

function formatTVL(usd: number): string {
  if (usd >= 1_000_000_000) return `$${(usd / 1_000_000_000).toFixed(2)}B`;
  if (usd >= 1_000_000)     return `$${(usd / 1_000_000).toFixed(1)}M`;
  if (usd >= 1_000)         return `$${(usd / 1_000).toFixed(1)}K`;
  return `$${usd.toFixed(0)}`;
}

function formatAPY(apy: number | null, display: string): string {
  if (apy === null) return display; // e.g. "Institutional"
  return `${apy.toFixed(1)}%`;
}

export async function GET() {
  // ── Try DefiLlama yields API first ────────────────────────────────────────
  try {
    const res = await fetch("https://yields.llama.fi/pools", {
      next: { revalidate: 3600 }, // cache for 1 hour (Next.js ISR)
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(8000), // 8 second timeout
    });

    if (res.ok) {
      const json = await res.json();
      const allPools: {
        pool: string;
        project: string;
        symbol: string;
        chain: string;
        tvlUsd: number;
        apy: number | null;
        apyBase: number | null;
      }[] = json.data ?? [];

      // Filter to Concrete pools only
      const concretePools = allPools.filter(
        (p) => p.project?.toLowerCase() === "concrete"
      );

      if (concretePools.length > 0) {
        // Map DefiLlama pools back to our vault IDs
        const poolIdToVaultId = Object.fromEntries(
          Object.entries(VAULT_POOL_IDS).map(([vaultId, poolId]) => [poolId, vaultId])
        );

        const mapped = concretePools.map((p) => {
          const vaultId = poolIdToVaultId[p.pool] ?? p.symbol.toLowerCase();
          const apy = p.apy ?? p.apyBase ?? null;
          const fallback = FALLBACK_VAULTS.find((f) => f.id === vaultId);

          return {
            id: vaultId,
            symbol: p.symbol,
            chain: p.chain,
            tvlUsd: p.tvlUsd,
            tvlDisplay: formatTVL(p.tvlUsd),
            apy,
            apyDisplay: apy !== null ? `${apy.toFixed(1)}%` : (fallback?.apyDisplay ?? "—"),
            source: "defillama" as const,
          };
        });

        // Fill in any missing vaults with fallbacks
        const returnedIds = new Set(mapped.map((m) => m.id));
        const filledFallbacks = FALLBACK_VAULTS
          .filter((f) => !returnedIds.has(f.id))
          .map((f) => ({
            ...f,
            tvlDisplay: formatTVL(f.tvlUsd),
            apyDisplay: formatAPY(f.apy, f.apyDisplay),
          }));

        return NextResponse.json({
          vaults: [...mapped, ...filledFallbacks],
          lastUpdated: new Date().toISOString(),
          source: "defillama+fallback",
        });
      }
    }
  } catch (err) {
    // DefiLlama unreachable — fall through to hardcoded data
    console.warn("[vaults API] DefiLlama fetch failed:", err);
  }

  // ── Full fallback: return hardcoded data ───────────────────────────────────
  return NextResponse.json({
    vaults: FALLBACK_VAULTS.map((f) => ({
      ...f,
      tvlDisplay: formatTVL(f.tvlUsd),
      apyDisplay: formatAPY(f.apy, f.apyDisplay),
    })),
    lastUpdated: new Date().toISOString(),
    source: "fallback",
  });
}
