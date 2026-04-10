# Design Brief

## Overview
Premium hospital management system for Noheria Nursing Home, Panchkula. Multi-panel application: public website, admin dashboard, doctor panel. Dark navy (#1a2035) medical foundation, crimson (#dc2626) for patient-facing actions. Clinical authority + human care through intentional accent usage.

## Tone & Differentiation
Clinical authority meets patient care warmth. Dark navy background = trustworthy medical foundation. Crimson accent = patient touchpoints (appointment CTAs, status highlights, active navigation). Minimalist information architecture, card-based layouts, no decorative overload. Zero transparency abuse — solid colors for AA+ accessibility.

## Color Palette

| Token | OKLCH | Purpose | Light | Dark |
|-------|-------|---------|-------|------|
| Background | - | Primary surface | 0.99 0 0 | 0.11 0 0 |
| Card | - | Contained zones | 1.0 0 0 | 0.18 0 0 |
| Primary | - | Navigation, CTA | 0.52 0.15 264 | 0.65 0.12 264 |
| Accent | - | Action, highlight | 0.58 0.17 16 | 0.58 0.17 16 |
| Destructive | - | Warning, delete | 0.65 0.19 22 | 0.65 0.19 22 |
| Success | - | Confirmation | 0.68 0.14 142 | 0.68 0.14 142 |
| Muted | - | Disabled, secondary | 0.95 0 0 | 0.45 0 0 |
| Foreground | - | Text, emphasis | 0.15 0 0 | 0.97 0 0 |

## Typography
- **Display**: General Sans (geometric, confident, medical authority)
- **Body**: Nunito (warm legibility, accessible dashboards & patient content)
- **Mono**: Geist Mono (appointment IDs, timestamps, system data)
- **Scale**: 12px (caption) → 14px (body) → 16px (label) → 18px (title) → 24px (section) → 32px (hero)

## Structural Zones
| Zone | Background | Treatment | Purpose |
|------|-----------|-----------|---------|
| Navigation | bg-card | border-b subtle | Header nav, crimson active state |
| Hero | bg-background | gradient text | Public site intro + patient CTA |
| Dashboard Card | bg-card | border, shadow-xs | Appointment slot, doctor profile, metric widget |
| Sidebar | bg-card | border-r | Admin/doctor nav tree, crimson active highlight |
| Data Row | bg-background / bg-card | alternating | Appointment table, patient list scanability |
| Modal/Overlay | bg-card | shadow-md, border | Appointment form, confirmation dialog |
| Footer | bg-card | border-t | Symmetrical close, links | |

## Component Patterns
- **CTA Buttons**: Crimson (patient actions), primary purple (secondary), destructive red (delete/cancel) with opacity hover
- **Input Fields**: bg-background border-input, focus ring-primary (2px), placeholder muted-foreground
- **Appointment Cards**: bg-card, border-border, crimson "Book" CTA, status badge with token colors
- **Tables**: Row alternation (bg-background / bg-card), sticky header, muted-foreground labels
- **Status Badges**: Success (green/0.68), warning (orange/0.57), pending (amber/0.65), rejected (red/0.65)
- **Navigation Breadcrumb**: Foreground text, muted separators, accent on active page

## Elevation & Shadows
- Subtle depth: `shadow-xs` (1px lift), `shadow-md` (4px) for elevated elements
- No glow/neon shadows — clinical precision maintained
- Borders used for surface definition over shadows

## Motion
- Transition default: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` — smooth, professional
- No bouncy animations, no parallax on scroll
- Micro-interactions: button scale (hover), link underline (fade), modal fade-in

## Spacing & Density
- Base unit: 0.25rem (4px grid)
- Padding: 0.5rem (xs), 1rem (sm), 1.5rem (md), 2rem (lg)
- Admin panels: tight (md), public site: relaxed (lg)

## Signature Detail
**Crimson as patient care thread**: Active navigation highlight, "Book Appointment" CTA, appointment confirmation states, patient action emphasis. Creates warmth + urgency without medical coldness. No gradients, no glows — clinical precision maintained through careful color choreography. Each crimson pixel earns its presence.

## Constraints
- Dark navy primary theme (matches hospital dashboard conventions)
- Crimson accent reserved for patient CTAs + critical states (max 15% screen color)
- Purple primary for secondary UI, success/warning tokens for status
- No transparency overload — solid colors for AA+ contrast. Min 7:1 FG-on-BG, 4.5:1 FG-on-primary
- No rainbow palettes, no generic blue. Medical credibility first.
