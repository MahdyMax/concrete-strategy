"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StrategyResult, SliderValues } from "@/lib/data";
import { buildTweetText, saveToLocalStorage } from "@/lib/strategy";
import RiskBadge from "./RiskBadge";
import AllocationBars from "./AllocationBars";
import DiversificationMeter from "./DiversificationMeter";
import FunFact from "./FunFact";
import YieldProjector from "./YieldProjector";
import MiniPieChart from "./MiniPieChart";
import NetworkBadges from "./NetworkBadges";
import CompareMode from "./CompareMode";

interface Props {
  result: StrategyResult;
  sliders: SliderValues;
  onRegenerate: () => void;
  pinned: StrategyResult | null;
  onPin: () => void;
  onClearPin: () => void;
}

const STAT_BOX: React.CSSProperties = {
  background: "var(--black-mid)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  padding: "12px 14px",
};

const BTN: React.CSSProperties = {
  padding: "10px 18px",
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  transition: "all 0.2s",
  border: "1px solid var(--border)",
};

export default function ResultCard({ result, sliders, onRegenerate, pinned, onPin, onClearPin }: Props) {
  const [savedFlash, setSavedFlash] = useState(false);
  const [showProjector, setShowProjector] = useState(false);
  const [showPie, setShowPie] = useState(false);

  function handleShare() {
    window.open(`https://twitter.com/intent/tweet?text=${buildTweetText(result)}`, "_blank");
  }

  function handleSave() {
    saveToLocalStorage(result, sliders);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2200);
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={result.timestamp}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        style={{
          background: "var(--black-card)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: 20,
          marginTop: 20,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg, var(--gold), var(--grey-light), var(--gold))",
          borderRadius: "14px 14px 0 0",
        }} />

        {/* Name + risk badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14, marginTop: 4 }}>
          <h2 style={{ fontSize: "clamp(18px, 4vw, 26px)", fontWeight: 700, color: "var(--gold)", lineHeight: 1.2 }}>
            {result.name}
          </h2>
          <RiskBadge tier={result.riskTier} label={result.riskLabel} emoji={result.riskEmoji} />
        </div>

        {/* Network badges */}
        <NetworkBadges allocation={result.allocation} />

        {/* Stats row */}
        <div className="stats-grid">
          <div style={STAT_BOX}>
            <div style={{ fontSize: 11, color: "var(--grey)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Expected APY</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--gold)", fontFamily: "var(--font-mono)" }}>
              {result.apyMin}–{result.apyMax}%
            </div>
          </div>
          <div style={STAT_BOX}>
            <div style={{ fontSize: 11, color: "var(--grey)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>TVL Exposure</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--white)", fontFamily: "var(--font-mono)" }}>
              {result.totalTVLExposure}
            </div>
          </div>
          <div style={STAT_BOX}>
            <div style={{ fontSize: 11, color: "var(--grey)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Top Vault</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--white)" }}>
              {result.topVault}
            </div>
          </div>
        </div>

        {/* Diversification meter */}
        <div style={{ marginBottom: 16 }}>
          <DiversificationMeter score={result.diversificationScore} />
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", margin: "16px 0" }} />

        {/* Toggle: Bars vs Pie */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--grey)", textTransform: "uppercase", letterSpacing: "1.5px" }}>
            Portfolio Allocation
          </div>
          <div style={{ display: "flex", gap: 0, border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
            {[
              { id: "bars", label: "Bars" },
              { id: "pie", label: "Pie" },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setShowPie(v.id === "pie")}
                style={{
                  padding: "4px 12px", border: "none", cursor: "pointer",
                  fontFamily: "inherit", fontSize: 11, fontWeight: 600,
                  background: (v.id === "pie") === showPie ? "var(--gold)" : "var(--black-card2)",
                  color: (v.id === "pie") === showPie ? "var(--black)" : "var(--grey-light)",
                  transition: "all 0.2s",
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {showPie ? (
            <motion.div key="pie" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MiniPieChart allocation={result.allocation} />
            </motion.div>
          ) : (
            <motion.div key="bars" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AllocationBars allocation={result.allocation} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", margin: "16px 0" }} />

        {/* Description */}
        <div style={{ fontSize: 14, color: "var(--grey-light)", lineHeight: 1.75, display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {result.description.map((para, i) => <p key={i}>{para}</p>)}
        </div>

        {/* Fun fact */}
        <div style={{ marginBottom: 16 }}>
          <FunFact fact={result.funFact} />
        </div>

        {/* Yield projector toggle */}
        <div style={{ marginBottom: 4 }}>
          <button
            onClick={() => setShowProjector(!showProjector)}
            style={{
              ...BTN,
              background: showProjector ? "rgba(255,223,100,0.12)" : "var(--black-card2)",
              color: "var(--gold)",
              borderColor: showProjector ? "rgba(255,223,100,0.4)" : "var(--border)",
              fontSize: 13,
              padding: "8px 14px",
            }}
          >
            📈 {showProjector ? "Hide" : "Show"} Yield Projector
          </button>

          <AnimatePresence>
            {showProjector && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ paddingTop: 10 }}>
                  <YieldProjector apyMin={result.apyMin} apyMax={result.apyMax} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", margin: "16px 0" }} />

        {/* Compare mode */}
        <CompareMode current={result} pinned={pinned} onPin={onPin} onClearPin={onClearPin} />

        {/* Action buttons */}
        <div className="result-actions">
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleShare}
            style={{ ...BTN, background: "var(--black-mid)", color: "var(--white)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--grey-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            ✕ Share on X
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            style={{ ...BTN, background: "rgba(255,223,100,0.08)", color: "var(--gold)", borderColor: "rgba(255,223,100,0.25)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,223,100,0.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,223,100,0.08)")}
          >
            💾 Save Strategy
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={onRegenerate}
            style={{ ...BTN, background: "var(--black-card2)", color: "var(--white)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--grey-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            🔄 Regenerate Name
          </motion.button>
        </div>

        <AnimatePresence>
          {savedFlash && (
            <motion.div
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ fontSize: 13, color: "var(--gold)", marginTop: 8, textAlign: "center" }}
            >
              ✅ Saved Strategy Successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
