"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SliderValues } from "@/lib/data";

interface Props {
  onResult: (sliders: SliderValues) => void;
}

const QUESTIONS = [
  {
    q: "If crypto crashes 40% tonight, you would:",
    opts: [
      { label: "😴 Sleep fine — I'm in stables", risk: 10, stab: 90, yld: 20 },
      { label: "😬 Check once and close the app", risk: 40, stab: 60, yld: 50 },
      { label: "📉 Buy the dip aggressively", risk: 75, stab: 30, yld: 80 },
      { label: "🚀 Go all-in — this is the opportunity", risk: 95, stab: 5, yld: 95 },
    ],
  },
  {
    q: "Your ideal DeFi portfolio vibe is:",
    opts: [
      { label: "🏰 Fort Knox — safe above all", risk: 5, stab: 95, yld: 30 },
      { label: "⚖️ Balanced — some yield, some safety", risk: 45, stab: 55, yld: 55 },
      { label: "🔥 Yield-first — I want maximum APY", risk: 70, stab: 25, yld: 90 },
      { label: "🌪️ Chaos is fine — I live for the gains", risk: 92, stab: 8, yld: 95 },
    ],
  },
  {
    q: "How often do you want to think about your DeFi?",
    opts: [
      { label: "🧘 Never — set and forget", risk: 15, stab: 90, yld: 40 },
      { label: "📅 Monthly check-in is fine", risk: 40, stab: 60, yld: 55 },
      { label: "📊 Weekly — I like watching it", risk: 65, stab: 40, yld: 70 },
      { label: "⚡ Daily — I'm basically full-time", risk: 90, stab: 15, yld: 90 },
    ],
  },
];

export default function PersonalityQuiz({ onResult }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ risk: number; stab: number; yld: number }[]>([]);

  function pick(opt: { risk: number; stab: number; yld: number }) {
    const next = [...answers, opt];
    if (step < QUESTIONS.length - 1) {
      setAnswers(next);
      setStep(step + 1);
    } else {
      // Average all answers
      const avg = (key: "risk" | "stab" | "yld") =>
        Math.round(next.reduce((s, a) => s + a[key], 0) / next.length);
      onResult({ risk: avg("risk"), stability: avg("stab"), yieldHunger: avg("yld") });
      setOpen(false);
      setStep(0);
      setAnswers([]);
    }
  }

  function handleOpen() { setOpen(true); setStep(0); setAnswers([]); }

  return (
    <>
      <button
        onClick={handleOpen}
        style={{
          padding: "10px 18px", borderRadius: 10,
          border: "1px solid rgba(255,223,100,0.3)",
          background: "rgba(255,223,100,0.06)", color: "var(--gold)",
          fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          display: "inline-flex", alignItems: "center", gap: 6,
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,223,100,0.12)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,223,100,0.06)")}
      >
        🎯 Personality Quiz
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,1,0.8)", zIndex: 100, cursor: "pointer" }}
            />
            <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 101, padding: 20 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                style={{
                  pointerEvents: "auto",
                  width: "min(480px, 100%)",
                  maxHeight: "min(680px, 92vh)",
                  overflowY: "auto",
                  background: "var(--black-card)", border: "1px solid var(--border)",
                  borderRadius: 16, padding: 24,
                  boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
                }}
              >
                {/* Progress */}
                <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
                  {QUESTIONS.map((_, i) => (
                    <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? "var(--gold)" : "var(--border)", transition: "background 0.3s" }} />
                  ))}
                </div>

                <div style={{ fontSize: 11, color: "var(--grey)", marginBottom: 8 }}>
                  Question {step + 1} of {QUESTIONS.length}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--white)", marginBottom: 18, lineHeight: 1.4 }}>
                  {QUESTIONS[step].q}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {QUESTIONS[step].opts.map((opt) => (
                    <motion.button
                      key={opt.label}
                      whileHover={{ scale: 1.02, borderColor: "var(--gold)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => pick(opt)}
                      style={{
                        padding: "12px 16px", borderRadius: 10,
                        border: "1px solid var(--border)", background: "var(--black-mid)",
                        color: "var(--white)", fontSize: 14, fontWeight: 500,
                        cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                        transition: "border-color 0.2s",
                      }}
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </div>

                <button
                  onClick={() => setOpen(false)}
                  style={{ marginTop: 14, background: "none", border: "none", color: "var(--grey)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}
                >
                  Cancel
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
