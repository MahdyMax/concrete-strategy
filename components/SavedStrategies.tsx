"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadFromLocalStorage } from "@/lib/strategy";
import { StrategyResult, SliderValues } from "@/lib/data";

interface SavedEntry extends StrategyResult {
  sliders: SliderValues;
  savedAt: string;
}

interface Props {
  onLoad: (sliders: SliderValues) => void;
}

export default function SavedStrategies({ onLoad }: Props) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState<SavedEntry[]>([]);

  useEffect(() => {
    if (open) setSaved(loadFromLocalStorage());
  }, [open]);

  function handleClear() {
    localStorage.removeItem("concrete_strategies");
    setSaved([]);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: "0", borderRadius: 0, border: "none",
          background: "transparent", color: "var(--white)",
          fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          display: "inline-flex", alignItems: "center", gap: 5,
          textTransform: "uppercase", letterSpacing: "0.5px",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        📚 SAVED ({saved.length})
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,1,0.75)", zIndex: 50 }}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0, width: "min(380px, 95vw)",
                background: "var(--black-card)", borderLeft: "1px solid var(--border)",
                zIndex: 51, overflowY: "auto", padding: 20,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--gold)" }}>📚 Saved Strategies</h3>
                <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "var(--grey)", fontSize: 20, cursor: "pointer" }}>✕</button>
              </div>

              {saved.length === 0 ? (
                <p style={{ color: "var(--grey)", fontSize: 14, textAlign: "center", padding: "40px 0" }}>
                  No saved strategies yet.<br />Generate one and hit 💾 Save!
                </p>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {saved.map((s, i) => (
                      <div key={i} style={{ background: "var(--black-mid)", border: "1px solid var(--border)", borderRadius: 10, padding: 14 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)", marginBottom: 4 }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: "var(--grey)", marginBottom: 8 }}>
                          {s.apyMin}–{s.apyMax}% APY · {s.riskLabel} · {new Date(s.savedAt).toLocaleDateString()}
                        </div>
                        <button
                          onClick={() => { onLoad(s.sliders); setOpen(false); }}
                          style={{
                            padding: "6px 12px", borderRadius: 8, border: "1px solid rgba(255,223,100,0.3)",
                            background: "rgba(255,223,100,0.08)", color: "var(--gold)", fontSize: 12,
                            fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                          }}
                        >
                          Load Strategy ↺
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleClear}
                    style={{ marginTop: 16, padding: "8px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "none", color: "var(--grey)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    🗑 Clear All
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
