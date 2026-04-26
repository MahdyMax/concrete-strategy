"use client";
import { motion } from "framer-motion";
import { Allocation, ALLOC_COLORS, VAULT_DISPLAY_NAMES, VAULTS } from "@/lib/data";

interface Props { allocation: Allocation }

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeSlice(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const s = polarToXY(cx, cy, r, startDeg);
  const e = polarToXY(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y} Z`;
}

export default function MiniPieChart({ allocation }: Props) {
  const cx = 70, cy = 70, r = 58;
  const slices: { id: string; pct: number; color: string; label: string }[] = [];

  VAULTS.forEach((v) => {
    const pct = allocation[v.id];
    if (pct > 0) slices.push({ id: v.id, pct, color: ALLOC_COLORS[v.id], label: VAULT_DISPLAY_NAMES[v.id] });
  });

  let current = 0;
  const paths = slices.map((s) => {
    const start = current;
    const sweep = (s.pct / 100) * 360;
    current += sweep;
    return { ...s, start, end: current };
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
      {/* SVG pie */}
      <svg width={140} height={140} viewBox="0 0 140 140" style={{ flexShrink: 0 }}>
        {/* Background circle */}
        <circle cx={cx} cy={cy} r={r} fill="var(--black-mid)" />
        {paths.map((p, i) => (
          <motion.path
            key={p.id}
            d={describeSlice(cx, cy, r, p.start, p.end)}
            fill={p.color}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            style={{ cursor: "default" }}
          >
            <title>{p.label}: {p.pct}%</title>
          </motion.path>
        ))}
        {/* Centre hole */}
        <circle cx={cx} cy={cy} r={r * 0.45} fill="var(--black-card)" />
        <text x={cx} y={cy - 5} textAnchor="middle" fill="var(--gold)" fontSize={10} fontWeight={700} fontFamily="var(--font-mono)">
          Alloc
        </text>
        <text x={cx} y={cy + 9} textAnchor="middle" fill="var(--grey-light)" fontSize={9} fontFamily="var(--font-mono)">
          {slices.length} vaults
        </text>
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {paths.map((p) => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "var(--grey-light)" }}>{p.label}</span>
            <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--gold)", marginLeft: "auto", paddingLeft: 10 }}>{p.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
