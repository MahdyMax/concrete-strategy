"use client";

import { useEffect, useState } from "react";

export interface LiveVaultData {
  id: string;
  symbol: string;
  chain: string;
  tvlUsd: number;
  tvlDisplay: string;
  apy: number | null;
  apyDisplay: string;
  source: "defillama" | "fallback";
}

interface VaultsResponse {
  vaults: LiveVaultData[];
  lastUpdated: string;
  source: string;
}

export function useVaults() {
  const [data, setData]       = useState<LiveVaultData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [source, setSource]   = useState<string>("fallback");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/api/vaults");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: VaultsResponse = await res.json();
        if (!cancelled) {
          setData(json.vaults);
          setSource(json.source);
          setLastUpdated(json.lastUpdated);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error, source, lastUpdated };
}
