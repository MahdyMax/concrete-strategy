# Build Your Dream Concrete Strategy

> Mix & match Concrete vaults like Lego bricks. Discover your perfect yield style — no real money needed!

An interactive DeFi portfolio builder powered by [Concrete.xyz](https://concrete.xyz). Fully client-side — no wallet, no auth, no backend.

---

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

```bash
# Production build
npm run build && npm start
```

---

## Tech Stack

- **Next.js 16** (App Router, static export)
- **TypeScript** (strict, zero errors)
- **Tailwind CSS v4**
- **Framer Motion** — all animations, spring transitions, AnimatePresence
- **Google Fonts** — Space Grotesk + JetBrains Mono

---

## 10 New Features

| # | Feature | Component |
|---|---------|-----------|
| 1 | **Diversification Meter** — Shannon entropy score (1-10) with animated bar | `DiversificationMeter.tsx` |
| 2 | **Did You Know Facts** — rotating real Concrete stats per generation | `FunFact.tsx` |
| 3 | **Saved Strategies Drawer** — save up to 10, reload sliders, clear all | `SavedStrategies.tsx` |
| 4 | **Compare Mode** — pin a strategy and compare APY/risk/diversification | `CompareMode.tsx` |
| 5 | **Yield Projector** — compound interest calculator with deposit + time sliders | `YieldProjector.tsx` |
| 6 | **Generation History** — scrollable strip of last 8 strategies, click to revisit | `StrategyHistory.tsx` |
| 7 | **Personality Quiz** — 3-question modal that auto-sets your sliders | `PersonalityQuiz.tsx` |
| 8 | **Mini Pie Chart** — SVG donut chart toggle alongside bar view | `MiniPieChart.tsx` |
| 9 | **Network Badges** — shows which chains the strategy touches | `NetworkBadges.tsx` |
| 10 | **Points Estimator** — estimates Concrete Points per day/month/year | `PointsEstimator.tsx` |

---

## Concrete Vaults (Live Data, April 2026)

| Vault | APY | TVL | Network | Points |
|-------|-----|-----|---------|--------|
| WeETH Vault | Institutional | $705.3M | Ethereum | Yes |
| Theo thBILL | ~6.5% | $66.5M | Ethereum | No |
| Concrete DeFi USDT | 8.5% | $62.4M | Ethereum | Yes |
| Theo USDC | ~6% | $20.5M | Ethereum | No |
| WBTC Vault | 7% | $4.3M | Ethereum | Yes |
| Theo USDC (Arbitrum) | ~6% | $8.7M | Arbitrum | No |

Platform: $902.3M assets · $11.25B volume · 6 audits · Backed by Polychain, VanEck, YziLabs

---

## Project Structure

```
├── app/
│   ├── layout.tsx            Root layout + Google Fonts
│   ├── page.tsx              Main page — all state + layout
│   └── globals.css           CSS vars, slider reset, keyframes
│
├── components/
│   ├── Header.tsx            Title + mascot + live platform stats banner
│   ├── Mascot.tsx            Animated emoji (8 aggression states)
│   ├── Slider.tsx            Reusable slider with animated value
│   ├── ResultCard.tsx        Full strategy output card
│   ├── AllocationBars.tsx    Spring-animated bars for 6 vaults
│   ├── VaultCards.tsx        2-column grid, links to real vault URLs
│   ├── RiskBadge.tsx         Low / Medium / High pill badge
│   ├── Footer.tsx            Links, backers, disclaimer
│   ├── DiversificationMeter.tsx  Feature 1
│   ├── FunFact.tsx               Feature 2
│   ├── SavedStrategies.tsx       Feature 3
│   ├── CompareMode.tsx           Feature 4
│   ├── YieldProjector.tsx        Feature 5
│   ├── StrategyHistory.tsx       Feature 6
│   ├── PersonalityQuiz.tsx       Feature 7
│   ├── MiniPieChart.tsx          Feature 8
│   ├── NetworkBadges.tsx         Feature 9
│   └── PointsEstimator.tsx       Feature 10
│
└── lib/
    ├── data.ts         Vaults, types, names (12/tier), descriptions, mascot states
    ├── strategy.ts     Allocation math, APY blending, tweet builder, localStorage
    └── useConfetti.ts  Palette-only confetti hook
```

---

## Customisation Guide

**Colors** — CSS variables in `app/globals.css` under `:root`. Palette: `#000001` · `#6e7271` · `#ffdf64` · `#ffffff`.

**Add vaults** — extend `VAULTS` in `lib/data.ts`, add key to `Allocation` type, update `computeRawAllocations()` in `lib/strategy.ts`.

**Strategy names / descriptions** — `STRATEGY_NAMES` and `STRATEGY_DESCRIPTIONS` in `lib/data.ts`. 12 names and 3 description sets per tier.

**Mascot** — `getMascotState()` in `lib/data.ts`. 8 thresholds from 😴 to 💀.

**Allocation logic** — `computeRawAllocations()` in `lib/strategy.ts`. Four aggression bands: ultra-safe / balanced-conservative / balanced-aggressive / full-degen.

**Points rates** — `POINTS_RATE` map in `PointsEstimator.tsx`.

---

## Disclaimer

This is a fun simulation only. Real yields vary. Always DYOR.  
Check real vaults at [app.concrete.xyz/earn](https://app.concrete.xyz/earn)
