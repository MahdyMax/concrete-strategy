"use client";
import { motion, AnimatePresence } from "framer-motion";
import { getMascotState } from "@/lib/data";

export default function Mascot({ aggression }: { aggression: number }) {
  const { emoji, label } = getMascotState(aggression);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginBottom: 12 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={emoji}
          initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.4, opacity: 0, rotate: 15 }}
          transition={{ type: "spring", stiffness: 420, damping: 22 }}
          style={{ fontSize: 68, lineHeight: 1, display: "block", animation: "floatBounce 2.5s ease-in-out infinite" }}
        >
          {emoji}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.p
          key={label}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.22 }}
          style={{ fontSize: 12, color: "var(--grey)", textAlign: "center", minHeight: 18 }}
        >
          {label}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
