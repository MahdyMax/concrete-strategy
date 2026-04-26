"use client";
import { motion } from "framer-motion";

interface SliderProps {
  id: string;
  label: string;
  emoji: string;
  value: number;
  onChange: (val: number) => void;
  tickLabels: [string, string, string];
}

export default function Slider({ id, label, emoji, value, onChange, tickLabels }: SliderProps) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <label htmlFor={id} style={{ fontSize: 15, fontWeight: 600, color: "var(--white)", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <span style={{ fontSize: 20 }}>{emoji}</span>{label}
        </label>
        <motion.span
          key={value}
          initial={{ scale: 1.35 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.18 }}
          style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-mono)", minWidth: 42, textAlign: "right", color: "var(--gold)" }}
        >
          {value}
        </motion.span>
      </div>
      <input id={id} type="range" min={0} max={100} step={1} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 5, fontSize: 11, color: "var(--grey)" }}>
        <span>{tickLabels[0]}</span><span>{tickLabels[1]}</span><span>{tickLabels[2]}</span>
      </div>
    </div>
  );
}
