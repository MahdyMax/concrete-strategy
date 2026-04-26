"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function FunFact({ fact }: { fact: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={fact}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "rgba(255,223,100,0.05)",
          border: "1px solid rgba(255,223,100,0.15)",
          borderRadius: 10,
          padding: "10px 14px",
          fontSize: 12,
          color: "var(--grey-light)",
          lineHeight: 1.6,
          display: "flex",
          gap: 8,
          alignItems: "flex-start",
        }}
      >
        <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>💡</span>
        <span><strong style={{ color: "var(--gold)" }}>Did you know?</strong> {fact}</span>
      </motion.div>
    </AnimatePresence>
  );
}
