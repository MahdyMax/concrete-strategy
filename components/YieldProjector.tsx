"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  apyMin: string;
  apyMax: string;
}

export default function YieldProjector({ apyMin, apyMax }: Props) {
  const [deposit, setDeposit] = useState(10000);
  const [years, setYears] = useState(1);

  const minApy = parseFloat(apyMin) / 100;
  const maxApy = parseFloat(apyMax) / 100;

  const compound = (principal: number, rate: number, t: number) =>
    principal * Math.pow(1 + rate, t);

  const minFinal = compound(deposit, minApy, years);
  const maxFinal = compound(deposit, maxApy, years);
  const minGain = minFinal - deposit;
  const maxGain = maxFinal - deposit;

  const fmt = (n: number) =>
    n >= 1000
      ? `$${(n / 1000).toFixed(2)}k`
      : `$${n.toFixed(2)}`;

  return (
    <div style={{
      background: "var(--black-mid)", border: "1px solid var(--border)",
      borderRadius: 12, padding: "16px", marginTop: 4,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
        📈 Yield Projector
        <span style={{ fontSize: 11, color: "var(--grey)", fontWeight: 400 }}>(compound interest, for fun only)</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        {/* Deposit */}
        <div>
          <label style={{ fontSize: 11, color: "var(--grey)", display: "block", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Deposit Amount
          </label>
          <input
            type="range" min={100} max={1000000} step={100} value={deposit}
            onChange={(e) => setDeposit(Number(e.target.value))}
          />
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 700, color: "var(--gold)", marginTop: 4 }}>
            ${deposit.toLocaleString()}
          </div>
        </div>
        {/* Years */}
        <div>
          <label style={{ fontSize: 11, color: "var(--grey)", display: "block", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Time Horizon
          </label>
          <input
            type="range" min={1} max={10} step={1} value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 700, color: "var(--gold)", marginTop: 4 }}>
            {years} {years === 1 ? "year" : "years"}
          </div>
        </div>
      </div>

      {/* Result */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { label: "Conservative Scenario", final: minFinal, gain: minGain, apy: apyMin },
          { label: "Optimistic Scenario", final: maxFinal, gain: maxGain, apy: apyMax },
        ].map((s) => (
          <motion.div
            key={s.apy}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ background: "var(--black-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px" }}
          >
            <div style={{ fontSize: 10, color: "var(--grey)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: "var(--grey)", marginBottom: 6 }}>at {s.apy}% APY</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, color: "var(--gold)" }}>{fmt(s.final)}</div>
            <div style={{ fontSize: 11, color: "var(--grey-light)", marginTop: 2 }}>+{fmt(s.gain)} earned</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
