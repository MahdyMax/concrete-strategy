"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SliderValues, StrategyResult } from "@/lib/data";
import { computeStrategy, computeAggression } from "@/lib/strategy";
import { useConfetti } from "@/lib/useConfetti";

import Header from "@/components/Header";
import Slider from "@/components/Slider";
import ResultCard from "@/components/ResultCard";
import VaultCards from "@/components/VaultCards";
import Footer from "@/components/Footer";
import SavedStrategies from "@/components/SavedStrategies";
import PersonalityQuiz from "@/components/PersonalityQuiz";
import StrategyHistory from "@/components/StrategyHistory";

const DEFAULT_SLIDERS: SliderValues = { risk: 50, stability: 50, yieldHunger: 50 };

const CARD: React.CSSProperties = {
  background: "var(--black-card)",
  border: "1px solid var(--border)",
  borderRadius: 14,
  padding: 20,
  margin: "20px 0",
};

const BTN_BASE: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  transition: "all 0.2s",
  border: "1px solid transparent",
};

export default function Home() {
  const [sliders, setSliders] = useState<SliderValues>(DEFAULT_SLIDERS);
  const [result, setResult] = useState<StrategyResult | null>(null);
  const [pinned, setPinned] = useState<StrategyResult | null>(null);
  const [history, setHistory] = useState<StrategyResult[]>([]);
  const [savedCount, setSavedCount] = useState(0);

  const { fire } = useConfetti();

  const aggression = computeAggression(sliders);

  const updateSlider = useCallback(
    (key: keyof SliderValues) => (val: number) =>
      setSliders((prev) => ({ ...prev, [key]: val })),
    []
  );

  const pushHistory = useCallback((r: StrategyResult) => {
    setHistory((prev) => [r, ...prev].slice(0, 8));
  }, []);

  const generate = useCallback(() => {
    const r = computeStrategy(sliders);
    setResult(r);
    pushHistory(r);
    if (r.aggression < 0.2 || r.aggression > 0.85 || (r.aggression > 0.4 && r.aggression < 0.6)) {
      fire(55);
    }
  }, [sliders, fire, pushHistory]);

  const regenerate = useCallback(() => {
    const r = computeStrategy(sliders);
    setResult(r);
    pushHistory(r);
  }, [sliders, pushHistory]);

  const randomize = useCallback(() => {
    const s: SliderValues = {
      risk: Math.floor(Math.random() * 101),
      stability: Math.floor(Math.random() * 101),
      yieldHunger: Math.floor(Math.random() * 101),
    };
    setSliders(s);
    const r = computeStrategy(s);
    setResult(r);
    pushHistory(r);
    fire(35);
  }, [fire, pushHistory]);

  const fullDegen = useCallback(() => {
    const s: SliderValues = { risk: 97, stability: 3, yieldHunger: 99 };
    setSliders(s);
    const r = computeStrategy(s);
    setResult(r);
    pushHistory(r);
    fire(70);
    setTimeout(() => fire(45), 380);
  }, [fire, pushHistory]);

  const handleQuizResult = useCallback(
    (s: SliderValues) => {
      setSliders(s);
      const r = computeStrategy(s);
      setResult(r);
      pushHistory(r);
      fire(40);
    },
    [fire, pushHistory]
  );

  const handleLoadSaved = useCallback((s: SliderValues) => {
    setSliders(s);
    const r = computeStrategy(s);
    setResult(r);
    pushHistory(r);
  }, [pushHistory]);

  const handleSelectHistory = useCallback((r: StrategyResult) => {
    setResult(r);
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const displayAlloc = result?.allocation ?? {
    usdt: 17, weeth: 17, wbtc: 16, thbill: 17, theousdc: 17, theousdc_arb: 16,
  };

  return (
    <>
      {/* Confetti layer */}
      <div id="confetti-container" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999, overflow: "hidden" }} />

      {/* Ambient glows */}
      <div aria-hidden style={{ position: "fixed", width: 500, height: 500, borderRadius: "50%", filter: "blur(100px)", pointerEvents: "none", zIndex: 0, opacity: 0.06, background: "var(--gold)", top: -150, right: -150 }} />
      <div aria-hidden style={{ position: "fixed", width: 500, height: 500, borderRadius: "50%", filter: "blur(100px)", pointerEvents: "none", zIndex: 0, opacity: 0.04, background: "var(--grey)", bottom: -150, left: -200 }} />

      <main style={{ maxWidth: 920, margin: "0 auto", padding: "0 16px 40px", position: "relative", zIndex: 1 }}>

        {/* Header + mascot */}
        <Header aggression={aggression} />

        {/* ── Sliders card ── */}
        <div style={CARD}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--grey)", textTransform: "uppercase", letterSpacing: "1.5px", margin: 0 }}>
              🎛️ Dial in your preferences
            </p>
            <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
              <SavedStrategies onLoad={handleLoadSaved} />
            </div>
          </div>

          <Slider id="risk" label="Risk Level" emoji="🔥" value={sliders.risk} onChange={updateSlider("risk")} tickLabels={["Safe Stables", "Balanced", "Degen Mode"]} />
          <Slider id="stability" label="Stability Shield" emoji="🛡️" value={sliders.stability} onChange={updateSlider("stability")} tickLabels={["Wild Ride", "Managed", "Fort Knox"]} />
          <Slider id="yieldHunger" label="Yield Hunger" emoji="💰" value={sliders.yieldHunger} onChange={updateSlider("yieldHunger")} tickLabels={["Chill Earner", "Hungry", "Yield Vampire"]} />

          {/* Action buttons row 1 */}
          <div className="actions-grid">
            <motion.button whileHover={{ filter: "brightness(1.08)" }} whileTap={{ scale: 0.97 }} onClick={generate}
              style={{ ...BTN_BASE, background: "var(--gold)", color: "var(--black)", borderColor: "var(--gold)" }}>
              ⚡ Generate Strategy
            </motion.button>
            <motion.button whileHover={{ borderColor: "var(--grey-light)" }} whileTap={{ scale: 0.97 }} onClick={randomize}
              style={{ ...BTN_BASE, background: "var(--black-card2)", color: "var(--white)", borderColor: "var(--border)" }}>
              🎲 Randomize
            </motion.button>
            <motion.button whileHover={{ filter: "brightness(1.1)" }} whileTap={{ scale: 0.97 }} onClick={fullDegen}
              style={{ ...BTN_BASE, background: "var(--grey-dark)", color: "var(--gold)", borderColor: "var(--grey-dark)" }}>
              🚀 Full Degen
            </motion.button>
            <PersonalityQuiz onResult={handleQuizResult} />
          </div>

          {/* Feature #6: Strategy history strip */}
          <StrategyHistory history={history} onSelect={handleSelectHistory} onClear={handleClearHistory} />
        </div>

        {/* ── Result card ── */}
        {result ? (
          <ResultCard
            result={result}
            sliders={sliders}
            onRegenerate={regenerate}
            pinned={pinned}
            onPin={() => setPinned(result)}
            onClearPin={() => setPinned(null)}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ ...CARD, textAlign: "center", padding: "40px 20px", color: "var(--grey)", fontSize: 15 }}
          >
            <div style={{ fontSize: 42, marginBottom: 12 }}>🎯</div>
            <p>
              Move the sliders and hit{" "}
              <strong style={{ color: "var(--gold)" }}>Generate Strategy</strong>{" "}
              — or try the <strong style={{ color: "var(--gold)" }}>Personality Quiz</strong> to auto-tune your settings.
            </p>
          </motion.div>
        )}

        {/* ── Vault cards ── */}
        <div style={{ marginTop: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "var(--grey)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12 }}>
            🏦 Concrete Vaults Available
          </p>
          <VaultCards allocation={displayAlloc} />
        </div>

        <Footer />
      </main>
    </>
  );
}
