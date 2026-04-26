"use client";
import { motion } from "framer-motion";
import { Allocation, VAULTS } from "@/lib/data";

export default function NetworkBadges({ allocation }: { allocation: Allocation }) {
  const activeNetworks = new Map<string, { emoji: string; count: number }>();

  VAULTS.forEach((v) => {
    if (allocation[v.id] > 0) {
      const existing = activeNetworks.get(v.network);
      if (existing) existing.count++;
      else activeNetworks.set(v.network, { emoji: v.networkEmoji, count: 1 });
    }
  });

  const entries = Array.from(activeNetworks.entries());

  return (
    <div className="networks-container">
      <span style={{ fontSize: 11, color: "var(--grey)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
        Networks:
      </span>
      <div className="networks-badges">
        {entries.map(([network, { emoji, count }], i) => (
          <motion.span
            key={network}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              padding: "3px 10px", borderRadius: 20,
              background: "rgba(110,114,113,0.2)", border: "1px solid var(--border)",
              fontSize: 12, fontWeight: 600, color: "var(--grey-light)",
            }}
          >
            {emoji} {network}
            <span style={{ color: "var(--grey)", fontWeight: 400 }}>({count})</span>
          </motion.span>
        ))}
      </div>
    </div>
  );
}
