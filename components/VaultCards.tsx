"use client";
import { motion } from "framer-motion";
import { VAULTS, Allocation, ALLOC_COLORS } from "@/lib/data";

export default function VaultCards({ allocation }: { allocation: Allocation }) {
  return (
    <div className="vault-grid">
      {VAULTS.map((vault, i) => {
        const pct = allocation[vault.id];
        const isActive = pct > 0;
        const accentColor = ALLOC_COLORS[vault.id];

        return (
          <motion.a
            key={vault.id}
            href={vault.vaultUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{
              background: "var(--black-card)",
              border: `1px solid ${isActive ? accentColor : "var(--border)"}`,
              borderRadius: 12,
              padding: "14px 16px",
              textDecoration: "none",
              display: "block",
              boxShadow: isActive ? `0 0 20px ${accentColor}18` : "none",
              transition: "border-color 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.015 }}
          >
            {/* Top row: emoji + name + badges */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8, gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 18 }}>{vault.emoji}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--white)", lineHeight: 1.2 }}>{vault.name}</div>
                  <div style={{ fontSize: 11, color: "var(--grey)", marginTop: 1 }}>
                    {vault.networkEmoji} {vault.network}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <span style={{
                  fontSize: 10, padding: "2px 7px", borderRadius: 20, fontWeight: 700, textTransform: "uppercase",
                  background: isActive ? `${accentColor}22` : "rgba(110,114,113,0.2)",
                  color: isActive ? accentColor : "var(--grey-light)",
                  whiteSpace: "nowrap",
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

            {/* APY + TVL */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "var(--gold)", fontFamily: "var(--font-mono)" }}>
                {vault.apy}
              </div>
            </div>
            <div style={{ fontSize: 11, color: "var(--grey)", marginBottom: 8 }}>
              TVL {vault.tvl} · Deposit: {vault.depositAsset}
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

            {/* Open link hint */}
            <div style={{ marginTop: 8, fontSize: 10, color: "var(--grey)", textAlign: "right" }}>
              View vault ↗
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
