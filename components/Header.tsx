"use client";
import Mascot from "./Mascot";

export default function Header({ aggression }: { aggression: number }) {
  return (
    <header style={{ textAlign: "center", padding: "32px 0 20px" }}>
      <Mascot aggression={aggression} />
      <h1 style={{
        fontSize: "clamp(22px, 5vw, 36px)",
        fontWeight: 700,
        color: "var(--gold)",
        lineHeight: 1.2,
        marginBottom: 8,
        letterSpacing: "-0.5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12
      }}>
        <img src="/concrete-logo.png" alt="Concrete Logo" className="header-logo" />
        Concrete Strategy
      </h1>
      <p style={{ fontSize: 14, color: "var(--grey-light)", maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
        Mix &amp; match Concrete vaults like Lego bricks.
      </p>

      {/* Live platform stats banner */}
      {/* <div style={{
        display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10,
        marginTop: 18, padding: "10px 16px",
        background: "var(--black-card)", border: "1px solid var(--border)",
        borderRadius: 12, maxWidth: 520, margin: "18px auto 0",
      }}>
        {[
          { label: "Assets on Platform", value: "$902.3M" },
          { label: "Volume Processed", value: "$11.25B" },
          { label: "Smart Contract Audits", value: "6" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center", padding: "4px 14px" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--gold)", fontFamily: "var(--font-mono)" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "var(--grey)", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: 1 }}>{s.label}</div>
          </div>
        ))}
      </div> */}
    </header>
  );
}
