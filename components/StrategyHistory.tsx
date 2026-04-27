"use client";
import { motion } from "framer-motion";
import { StrategyResult } from "@/lib/data";
import { useRef, useState, useEffect } from "react";

interface Props {
  history: StrategyResult[];
  onSelect: (r: StrategyResult) => void;
  onClear: () => void;
}

const TIER_COLOR: Record<string, string> = {
  low: "var(--gold-dim)",
  medium: "var(--grey-light)",
  high: "var(--white)",
};

export default function StrategyHistory({ history, onSelect, onClear }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftShadow(scrollLeft > 5);
    setShowRightShadow(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScroll();
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [history]);

  if (history.length < 2) return null;

  return (
    <div style={{ marginTop: 20, position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: "var(--grey)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12 }}>🕑</span> RECENT GENERATIONS
        </div>
        {history.length > 2 && (
          <motion.button
            whileHover={{ color: "var(--white)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onClear}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--grey)",
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              cursor: "pointer",
              padding: 0,
              fontFamily: "inherit",
              transition: "color 0.2s"
            }}
          >
            Clear
          </motion.button>
        )}
      </div>

      <div style={{ position: "relative" }}>
        {/* Left Shadow */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 40,
          background: "linear-gradient(to right, var(--black-card), transparent)",
          pointerEvents: "none", zIndex: 2, opacity: showLeftShadow ? 1 : 0, transition: "opacity 0.3s"
        }} />

        {/* Right Shadow */}
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 40,
          background: "linear-gradient(to left, var(--black-card), transparent)",
          pointerEvents: "none", zIndex: 2, opacity: showRightShadow ? 1 : 0, transition: "opacity 0.3s"
        }} />

        <div
          ref={scrollRef}
          className="history-scroll"
          style={{
            display: "flex", gap: 8, overflowX: "auto", paddingBottom: 10,
            scrollbarWidth: "thin",
          }}
        >
          {history.slice(0, 10).map((r, i) => (
            <motion.button
              key={r.timestamp}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onSelect(r)}
              style={{
                flexShrink: 0, padding: "4px 8px",
                background: "transparent", border: "none",
                cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                minWidth: 120,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div style={{ fontSize: 11, color: "var(--white)", fontWeight: 700, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {r.name}
              </div>
              <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: TIER_COLOR[r.riskTier], fontWeight: 600 }}>
                {r.apyMin}–{r.apyMax}%
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .history-scroll::-webkit-scrollbar {
          height: 3px;
        }
        .history-scroll::-webkit-scrollbar-track {
          background: transparent !important;
          border: none;
        }
        .history-scroll::-webkit-scrollbar-thumb {
          background: var(--grey-dark) !important;
          border-radius: 10px;
        }
        .history-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--grey) !important;
        }
        .history-scroll {
          scrollbar-width: thin;
          scrollbar-color: var(--grey-dark) transparent;
        }
      `}</style>
    </div>
  );
}
