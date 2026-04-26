"use client";

const LINKS = [
  { label: "Earn App", href: "https://app.concrete.xyz/earn" },
  { label: "Docs", href: "https://docs.concrete.xyz/Overview/welcome" },
  { label: "Blog", href: "https://concrete.xyz/blog" },
  { label: "Discord", href: "https://discord.gg/concretexyz" },
  { label: "X / Twitter", href: "https://x.com/ConcreteXYZ" },
  { label: "Points", href: "https://points.concrete.xyz/home" },
];

const linkStyle: React.CSSProperties = {
  color: "var(--grey-light)", textDecoration: "none", fontSize: 12,
  transition: "color 0.2s",
};

export default function Footer() {
  return (
    <footer style={{ textAlign: "center", padding: "32px 0 16px", fontSize: 12, color: "var(--grey)", lineHeight: 2 }}>
      {/* Quick links */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 16px", marginBottom: 14 }}>
        {LINKS.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={linkStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--grey-light)")}
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* Powered badge */}
      <div style={{ marginBottom: 10 }}>
        <a href="https://x.com/OnlyRiskGuy" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--black-card)", border: "1px solid var(--border)", padding: "4px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: "var(--grey-light)", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--grey-light)"; }}
        >
          Built for Concrete Community by @OnlyRiskGuy
        </a>
      </div>

      {/* Backers */}
      <div style={{ fontSize: 11, color: "var(--grey)", marginBottom: 8 }}>
        Backed by Polychain · VanEck · YziLabs · Portal Ventures · Hashed · Tribe Capital
      </div>

      <div>⚠️ This is a fun simulation only. Real yields vary. Always DYOR.</div>
      <div>
        <a href="https://app.concrete.xyz/earn" target="_blank" rel="noopener noreferrer"
          style={{ color: "var(--grey-light)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--grey-light)")}
        >
          Check real vaults → app.concrete.xyz/earn
        </a>
      </div>
    </footer>
  );
}
