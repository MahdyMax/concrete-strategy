"use client";
import { motion } from "framer-motion";

export default function DiversificationMeter({ score }: { score: number }) {
  const pct = (score / 10) * 100;
  const color = score <= 3 ? "var(--white)" : score <= 6 ? "var(--gold-dim)" : "var(--gold)";
  const label = score <= 2 ? "Concentrated" : score <= 4 ? "Focused" : score <= 6 ? "Balanced" : score <= 8 ? "Diversified" : "Max Spread";

  return (
    <div style={{ background: "var(--black-mid)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: "var(--grey)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          🧩 Diversification
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color }}>
          {score}/10
        </span>
      </div>
      <div style={{ height: 6, background: "var(--border)", borderRadius: 10, overflow: "hidden", marginBottom: 5 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          style={{ height: "100%", borderRadius: 10, background: color }}
        />
      </div>
      <div style={{ fontSize: 11, color: "var(--grey)" }}>{label}</div>
    </div>
  );
}
