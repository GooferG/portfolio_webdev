# Design

## Theme

Dark-first with light variant. Physical scene: a hiring manager or small-business owner skimming on a 14" laptop at midday, or a recruiter on a phone in transit. Dark default reads as "engineer who works in a dark IDE," but light is provided for daylight skimming. Both themes share the teal accent and tinted-neutral system.

## Color

Strategy: **Restrained** — tinted dark neutrals + one teal accent used sparingly for CTAs, eyebrow labels, and hover states.

### Dark (default)

| Token | Hex | Use |
|---|---|---|
| `--bg-primary` | `#0A0F1E` | Page background |
| `--bg-card` | `#0d1f2e` | Cards, inputs, code blocks |
| `--bg-strong` | `#060b12` | Footer, deepest surfaces |
| `--border-subtle` | `#1e3a4a` | Card borders, dividers |
| `--accent` | `#00D4AA` | CTAs, eyebrows, focus, hover highlights |
| `--fg-strong` | `#ffffff` | Headings, primary text |
| `--fg-default` | `#cbd5e1` | Body text |
| `--fg-muted` | `#94a3b8` | Secondary body, nav links |
| `--fg-subtle` | `#64748b` | Tertiary, captions |
| `--fg-faint` | `#475569` | Disabled, placeholders, separators |

### Light

| Token | Hex |
|---|---|
| `--bg-primary` | `#F8FAFC` |
| `--bg-card` | `#FFFFFF` |
| `--bg-strong` | `#EEF2F7` |
| `--border-subtle` | `#E2E8F0` |
| `--accent` | `#00B894` |
| `--fg-strong` | `#0f172a` |
| `--fg-default` | `#334155` |
| `--fg-muted` | `#475569` |
| `--fg-subtle` | `#64748b` |
| `--fg-faint` | `#94a3b8` |

### Notes

- Pure `#fff` and `#000` used at extremes — could be tinted with brand hue (chroma ~0.005) for cohesion. **Tech-debt note**, not a blocker.
- Accent at 10–15% alpha for pill backgrounds (`bg-accent/10`, `bg-accent/15`).

## Typography

- **Family**: Inter, via `next/font/google`, swap display. Variable `--font-inter`. System fallback `system-ui, sans-serif`.
- **Scale**: Tailwind defaults. Hero `text-7xl` (down to `5xl` on mobile), section headings `text-3xl`–`4xl`, body `text-sm` to `text-base`, captions `text-xs`.
- **Weight contrast**: `font-extrabold` (800) for hero + page titles, `font-semibold` (600) for sub-headings + CTA labels, regular for body, `font-medium` for nav and pills.
- **Eyebrow pattern**: `text-accent text-xs font-semibold tracking-[3px] uppercase` — repeated above every page title ("Who I Am", "My Work", "Writing", "What I Do", "Let's Talk", "Curriculum Vitae", "Selected Work"). Consistent, possibly *too* consistent (see critique).
- **Line height**: `leading-tight` for titles, `leading-relaxed` for prose.
- **Body line length**: max-w containers cap most prose around 65–75ch — acceptable.

## Spacing & Layout

- Container: `max-w-6xl mx-auto px-6` on most pages; `max-w-5xl` on experience; `max-w-4xl` on blog.
- Section padding: `pt-32 pb-24` for top-level routes, `py-24` for homepage subsections, `py-16` for CTA strip.
- Card padding: `p-5` (project) to `p-6` (service, blog).
- Gaps: `gap-6` for grids, `gap-3`/`gap-4` for inline action rows.
- Rhythm tends to repeat (24/32/96) — varies less than ideal.

## Radius & Borders

- Pills/CTAs: `rounded-full`.
- Cards: `rounded-xl` (12px-ish).
- Inputs: `rounded-xl`.
- Tag chips: `rounded` (4px) or `rounded-full` depending on context — inconsistent.
- Borders: 1px `--border-subtle`; hover state escalates to `--accent/50`.

## Elevation

- No shadows on most surfaces — borders carry separation.
- Hero photo: layered `drop-shadow` with a teal-tinted glow (`rgba(0, 212, 170, 0.15)`).
- Popular service card: `shadow-[0_0_24px_rgba(0,212,170,0.08)]` accent halo.
- Scrolled nav: `backdrop-blur-md` with translucent bg.

## Motion

- `framer-motion` v12 for fade-ins (`FadeIn` wrapper with staggered `delay` per item).
- Hover transitions: `transition-colors duration-200/300` everywhere.
- Image hover: `group-hover:scale-105` over 500ms on project cards.
- Hero shader: WebGL fragment shader, ~60fps animated noise + mouse parallax.
- Pill shimmer: 4s sheen sweep on `shimmer-pill` (Frontend Developer / AI Engineer).
- Typewriter: rotates through 3 taglines in hero subhead.
- "Available for work" indicator: `animate-pulse` dot.
- No `prefers-reduced-motion` handling detected — gap.

## Components

- `Nav` — fixed top, transparent → translucent backdrop-blur on scroll. Logo `LM.`, 7 links, theme toggle, "Hire Me" CTA pill. Mobile: hamburger → full-screen overlay.
- `Footer` — single row: copyright, social icons, build credit.
- `Hero` — split layout (text + radial-masked portrait), shader bg, service marquee strip at bottom.
- `ProjectCard` — image (h-48) + title + 4-line clamp + tag chips + GitHub/Live actions. Whole card is a `role="link"`.
- `ServiceCard` — icon tile + title + description; "Popular" variant adds accent halo and pill badge.
- `BlogCard` — full-width row, tag chips on top, title + excerpt + date/read-time + "Read More →".
- `FadeIn` — viewport-triggered framer-motion wrapper used liberally.
- `TypewriterText` + `useRotatingTypewriter` — hero subhead rotator.
- `ShimmerPill` (CSS) — accent pill with sweep animation, used twice on hero.
- `ThemeToggle` — dark/light switch, persists to localStorage.
- `ShaderBackground` — WebGL canvas, dark only (filtered in light theme).
- `SocialIcons` — inline SVG for GH / LI / X (replaces missing lucide v1 brand icons).

## Icons

`lucide-react` v1.8.0 for utility icons (Menu, X, Download, Mail, MapPin, ArrowDown/Up, ExternalLink, Globe, Server, Brain, Cpu, Wrench, CheckCircle, AlertCircle). Brand glyphs via custom SVG.

## Imagery

- Hero portrait: radial-masked, drop-shadow + teal glow.
- About portrait: aspect 3/4, ring border, corner radial glow.
- Project thumbnails: `next/image` `fill`, `object-cover`, optional `objectPosition`.

## Forms

Contact form: stacked labels, `rounded-xl` inputs, `bg-bg-card` fill, `border-border-subtle` border, focus → `border-accent`. Submit is full-pill accent button. Inline success/error states with lucide icon + colored copy.
