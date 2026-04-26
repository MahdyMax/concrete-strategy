"use client";
import { RiskTier } from "@/lib/data";

const STYLES: Record<RiskTier, React.CSSProperties> = {
  low:    { background: "rgba(255,223,100,0.1)",  color: "var(--gold)",       border: "1px solid rgba(255,223,100,0.3)" },
  medium: { background: "rgba(110,114,113,0.2)",  color: "var(--grey-light)", border: "1px solid rgba(110,114,113,0.4)" },
  high:   { background: "rgba(255,255,255,0.07)", color: "var(--white)",      border: "1px solid rgba(255,255,255,0.2)" },
};

export default function RiskBadge({ tier, label, emoji }: { tier: RiskTier; label: string; emoji: string }) {
  return (
    <span style={{ ...STYLES[tier], display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
      {emoji} {label}
    </span>
  );
}
