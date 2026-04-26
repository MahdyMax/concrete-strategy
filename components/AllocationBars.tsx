"use client";
import { motion } from "framer-motion";
import { Allocation, ALLOC_COLORS, VAULT_DISPLAY_NAMES, VAULTS } from "@/lib/data";

export default function AllocationBars({ allocation }: { allocation: Allocation }) {
  const entries = VAULTS.map((v) => ({
    id: v.id,
    label: VAULT_DISPLAY_NAMES[v.id],
    color: ALLOC_COLORS[v.id],
    pct: allocation[v.id],
  })).filter((e) => e.pct > 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {entries.map((item) => (
        <div key={item.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, color: "var(--white)" }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
              {item.label}
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--grey-light)" }}>{item.pct}%</span>
          </div>
          <div style={{ height: 7, background: "var(--black-mid)", borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.pct}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.04 }}
              style={{ height: "100%", borderRadius: 10, background: item.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
