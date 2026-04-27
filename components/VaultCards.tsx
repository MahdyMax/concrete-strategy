"use client";

import { motion } from "framer-motion";
import { VAULTS, Allocation, ALLOC_COLORS } from "@/lib/data";
import { useVaults, LiveVaultData } from "@/lib/useVaults";

function SkeletonCard() {
  return (
    <div style={{ background: "var(--black-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px" }}>
      <style>{`
        @keyframes skPulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .sk { background:var(--border); border-radius:6px; animation:skPulse 1.6s ease-in-out infinite; }
      `}</style>
      <div className="sk" style={{ height: 13, width: "55%", marginBottom: 10 }} />
      <div className="sk" style={{ height: 26, width: "38%", marginBottom: 10 }} />
      <div className="sk" style={{ height: 10, width: "75%", marginBottom: 5 }} />
      <div className="sk" style={{ height: 10, width: "90%", marginBottom: 5 }} />
      <div className="sk" style={{ height: 10, width: "65%", marginBottom: 14 }} />
      <div className="sk" style={{ height: 5,  width: "100%" }} />
    </div>
  );
}

function SourceBadge({ source, lastUpdated }: { source: string; lastUpdated: string | null }) {
  const isLive = source.includes("defillama");
  const time   = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : null;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 12px", borderRadius: 20, marginBottom: 12,
      fontSize: 11, fontWeight: 600,
      background: isLive ? "rgba(255,223,100,0.07)" : "rgba(110,114,113,0.12)",
      border: `1px solid ${isLive ? "rgba(255,223,100,0.2)" : "var(--border)"}`,
      color: isLive ? "var(--gold)" : "var(--grey)",
    }}>
      <style>{`@keyframes livePulse{0%,100%{opacity:1}50%{opacity:0.25}}`}</style>
      <span style={{
        width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
        background: isLive ? "var(--gold)" : "var(--grey)",
        animation: isLive ? "livePulse 1.5s ease-in-out infinite" : "none",
      }} />
      {isLive
        ? `Live via DefiLlama${time ? ` · updated ${time}` : ""}`
        : "Showing reference data · Live rates at app.concrete.xyz/earn"}
    </div>
  );
}

export default function VaultCards({ allocation }: { allocation: Allocation }) {
  const { data: liveVaults, loading, source, lastUpdated } = useVaults();

  const liveMap = new Map<string, LiveVaultData>(
    (liveVaults ?? []).map((v) => [v.id, v])
  );

  return (
    <div>
      {!loading && <SourceBadge source={source} lastUpdated={lastUpdated} />}

      <div className="vault-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : VAULTS.map((vault, i) => {
              const pct         = allocation[vault.id];
              const isActive    = pct > 0;
              const accentColor = ALLOC_COLORS[vault.id];
              const live        = liveMap.get(vault.id);
              const tvlDisplay  = live?.tvlDisplay  ?? vault.tvl;
              const apyDisplay  = live?.apyDisplay  ?? vault.apy;
              const isLiveData  = live?.source === "defillama";

              return (
                <motion.a
                  key={vault.id}
                  href={vault.vaultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ scale: 1.015 }}
                  style={{
                    background: "var(--black-card)",
                    border: `1px solid ${isActive ? accentColor : "var(--border)"}`,
                    borderRadius: 12, padding: "14px 16px",
                    textDecoration: "none", display: "block",
                    boxShadow: isActive ? `0 0 20px ${accentColor}18` : "none",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    cursor: "pointer",
                  }}
                >
                  {/* Header row */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8, gap: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 18 }}>{vault.emoji}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--white)", lineHeight: 1.2 }}>{vault.name}</div>
                        <div style={{ fontSize: 11, color: "var(--grey)", marginTop: 1 }}>{vault.networkEmoji} {vault.network}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                      <span style={{
                        fontSize: 10, padding: "2px 7px", borderRadius: 20, fontWeight: 700,
                        textTransform: "uppercase", whiteSpace: "nowrap",
                        background: isActive ? `${accentColor}22` : "rgba(110,114,113,0.2)",
                        color: isActive ? accentColor : "var(--grey-light)",
                      }}>
                        {vault.badgeText}
                      </span>
                      {vault.institutional && (
                        <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, fontWeight: 700, textTransform: "uppercase", background: "rgba(255,223,100,0.1)", color: "var(--gold)" }}>
                          Institutional
                        </span>
                      )}
                    </div>
                  </div>

                  {/* APY row */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "var(--gold)", fontFamily: "var(--font-mono)" }}>
                      {apyDisplay}
                    </div>
                    {vault.pointsEnabled && (
                      <span style={{ fontSize: 10, color: "var(--gold-dim)", fontWeight: 600 }}>+ Points ✨</span>
                    )}
                    {isLiveData && (
                      <span style={{ fontSize: 9, color: "var(--gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", opacity: 0.7, marginLeft: "auto" }}>
                        LIVE
                      </span>
                    )}
                  </div>

                  {/* TVL */}
                  <div style={{ fontSize: 11, color: "var(--grey)", marginBottom: 8 }}>
                    TVL {tvlDisplay} · Deposit: {vault.depositAsset}
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: 11, color: "var(--grey)", lineHeight: 1.55, marginBottom: 10 }}>
                    {vault.description}
                  </p>

                  {/* Allocation bar */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 5, background: "var(--black-mid)", borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 18 }}
                        style={{ height: "100%", borderRadius: 10, background: isActive ? accentColor : "var(--grey-dark)" }}
                      />
                    </div>
                    <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: isActive ? accentColor : "var(--grey)", fontWeight: 700, minWidth: 32, textAlign: "right" }}>
                      {pct}%
                    </span>
                  </div>

                  <div style={{ marginTop: 8, fontSize: 10, color: "var(--grey)", textAlign: "right" }}>View vault ↗</div>
                </motion.a>
              );
            })}
      </div>
    </div>
  );
}
