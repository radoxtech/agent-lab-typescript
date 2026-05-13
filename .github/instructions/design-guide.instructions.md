---
applyTo: "src/**/*.tsx,src/**/*.css"
---

# Design Guide — Bingo Mixer

## Aesthetic

**Festival Night** — a bold, high-energy palette built for social gatherings and events. Dark background, vivid neon accents, and smooth micro-interactions.

## Color Palette

| Token | Value | Usage |
|---|---|---|
| `surface` | `#0f0a1e` | Page background |
| `surface-card` | `#1e1333` | Cards, headers, panels |
| `surface-elevated` | `#2a1a4a` | Elevated overlays, modals |
| `accent` | `#e91e8c` | Primary CTA, highlights |
| `accent-light` | `#f06ac0` | Hover/active state |
| `accent-2` | `#00c9b1` | Secondary CTA, success marks |
| `highlight` | `#ffd600` | Win states, bingo |
| `fail` | `#f44336` | Fail/error states |
| `success` | `#00c853` | Success states |
| `text` | `#f5eeff` | Primary text |
| `text-muted` | `#9e86cc` | Secondary text, labels |

## Typography

Font family: `'Trebuchet MS', ui-rounded, system-ui, -apple-system, sans-serif`

- **Headings**: `font-black` (900 weight), tight tracking
- **Labels/captions**: `uppercase tracking-widest text-xs` for metadata labels
- **Body**: `font-bold` for interactive elements, regular for descriptive text
- **Gradient text**: Use `linear-gradient(90deg, #e91e8c, #ffd600)` with `-webkit-background-clip: text` for hero titles

## Gradients

Primary button gradient: `linear-gradient(135deg, #e91e8c, #9c27b0)`
Secondary button gradient: `linear-gradient(135deg, #00c9b1, #0077b6)`
Fail button gradient: `linear-gradient(135deg, #b71c1c, #f44336)`
Success button gradient: `linear-gradient(135deg, #00695c, #00c853)`
Page background: `linear-gradient(160deg, #0f0a1e 0%, #1a0d38 60%, #0d1a2e 100%)`
Modal/card background: `linear-gradient(160deg, #1e1333, #2a1a4a)`

## Borders & Shadows

- Default card border: `1px solid #3d2870`
- Active/highlighted border: `1.5px solid #e91e8c` (accent) or `1.5px solid #ffd600` (win)
- Button glow shadow (primary): `0 4px 20px rgba(233,30,140,0.4)`
- Button glow shadow (secondary): `0 4px 20px rgba(0,201,177,0.4)`
- Modal glow: `0 0 40px rgba(233,30,140,0.35)`

## Animations

Defined in `index.css`:
- `animate-bingo-pop` — elastic scale-in with slight rotation for modals and win reveals
- `animate-slide-up` — staggered entrance for page sections
- `animate-fade-in` — subtle opacity transition for overlays and banners
- `animate-glow-pulse` — repeating glow for winning squares

Use `animation-delay` on staggered list items (0.08s, 0.14s, 0.2s increments).

## Interaction States

- All interactive elements: `active:scale-95 transition-transform duration-150` for tactile feedback
- No hover-only effects (mobile-first)
- Disabled states: reduced opacity, no scale transform

## Layout Patterns

- Full-height screens: `flex flex-col min-h-full`
- Header: dark card background with bottom border, flex between
- Content area: `flex-1 flex items-center justify-center p-4`
- Bottom action area: fixed padding `px-4 pb-6`
- Card/panel max width: `max-w-sm` (start screen) or `max-w-md` (game content)
- Border radius: `rounded-xl` (cards), `rounded-2xl` (modals), `rounded-full` (pills)
