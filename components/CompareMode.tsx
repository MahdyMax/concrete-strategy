"use client";
import { motion, AnimatePresence } from "framer-motion";
import { StrategyResult } from "@/lib/data";

interface Props {
  current: StrategyResult | null;
  pinned: StrategyResult | null;
  onPin: () => void;
  onClearPin: () => void;
}

const ROW = (label: string, a: string, b: string) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8, alignItems: "center" }}>
    <span style={{ fontSize: 11, color: "var(--grey)", fontWeight: 600, textTransform: "uppercase" }}>{label}</span>
    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--gold)", textAlign: "center" }}>{a}</span>
    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--grey-light)", textAlign: "center" }}>{b}</span>
  </div>
);

export default function CompareMode({ current, pinned, onPin, onClearPin }: Props) {
  if (!current) return null;

  return (
    <div style={{ marginTop: 12 }}>
      {!pinned ? (
        <button
          onClick={onPin}
          style={{
            padding: "8px 14px", borderRadius: 8, border: "1px solid var(--border)",
            background: "var(--black-card2)", color: "var(--grey-light)", fontSize: 13,
            fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            display: "inline-flex", alignItems: "center", gap: 5,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--grey-light)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          📌 Pin to Compare
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ background: "var(--black-card)", border: "1px solid var(--border)", borderRadius: 12, padding: 16, marginTop: 4 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--white)" }}>⚖️ Strategy Comparison</h4>
              <button onClick={onClearPin} style={{ background: "none", border: "none", color: "var(--grey)", fontSize: 13, cursor: "pointer" }}>Clear</button>
            </div>
            {/* Column headers */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 10, color: "var(--grey)" }}></span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gold)", textAlign: "center" }}>Current</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--grey-light)", textAlign: "center" }}>Pinned</span>
            </div>
            {ROW("APY Range", `${current.apyMin}–${current.apyMax}%`, `${pinned.apyMin}–${pinned.apyMax}%`)}
            {ROW("Risk", current.riskLabel, pinned.riskLabel)}
            {ROW("Diversif.", `${current.diversificationScore}/10`, `${pinned.diversificationScore}/10`)}
            {ROW("Top Vault", current.topVault, pinned.topVault)}
            {ROW("TVL Exposure", current.totalTVLExposure, pinned.totalTVLExposure)}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
