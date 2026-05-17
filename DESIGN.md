# Design

## Theme

Dark-first with light variant. Physical scene: a Phoenix engineer working at dawn or dusk, ambient warmth, the desert outside the window. Dark is the working state (IDE-adjacent, ember-toned). Light is the daylight state (warm cream, like a desk near a window at noon). Both themes share the saguaro-amber accent and warm-neutral system.

## Color

Strategy: **Committed** — one bold accent hue (saguaro amber, oklch 50°) carries the brand. All neutrals tinted within ±15° of accent hue for true cohesion. The desert palette is the differentiator: nearly zero dev portfolios use warm-earth tones, which is the point.

Color space: **OKLCH everywhere.** Hue family: 30°–60° (ember red through saguaro amber). No `#fff` or `#000` — all neutrals tinted with brand chroma.

### Dark (default)

| Token | OKLCH | Use |
|---|---|---|
| `--bg-primary` | `oklch(13% 0.018 35)` | Page background (deep ember) |
| `--bg-card` | `oklch(18% 0.022 38)` | Cards, inputs, code blocks (warmer card) |
| `--bg-strong` | `oklch(9% 0.012 32)` | Footer, deepest surfaces, modal backdrops |
| `--border-subtle` | `oklch(28% 0.030 42)` | Card borders, dividers |
| `--accent` | `oklch(72% 0.16 50)` | CTAs, accent letter, focus, hover (saguaro amber) |
| `--accent-warm` | `oklch(64% 0.18 40)` | Deeper ember for secondary accents |
| `--fg-strong` | `oklch(98% 0.005 60)` | Headings, primary text (warm near-white) |
| `--fg-default` | `oklch(85% 0.015 55)` | Body text |
| `--fg-muted` | `oklch(67% 0.022 50)` | Secondary body, nav links |
| `--fg-subtle` | `oklch(53% 0.025 48)` | Tertiary, captions |
| `--fg-faint` | `oklch(42% 0.028 45)` | Disabled, placeholders, mono markers |

### Light

| Token | OKLCH | Use |
|---|---|---|
| `--bg-primary` | `oklch(96% 0.015 65)` | Warm cream page |
| `--bg-card` | `oklch(99% 0.008 65)` | Cleaner cream cards |
| `--bg-strong` | `oklch(92% 0.020 60)` | Footer, deepest surfaces |
| `--border-subtle` | `oklch(87% 0.025 55)` | Dusty sand borders |
| `--accent` | `oklch(58% 0.18 50)` | Deeper amber for contrast on light |
| `--accent-warm` | `oklch(52% 0.18 40)` | Deeper ember for secondary |
| `--fg-strong` | `oklch(18% 0.03 40)` | Warm near-black |
| `--fg-default` | `oklch(32% 0.025 45)` | Body |
| `--fg-muted` | `oklch(45% 0.022 48)` | Secondary |
| `--fg-subtle` | `oklch(56% 0.020 52)` | Tertiary |
| `--fg-faint` | `oklch(70% 0.018 55)` | Mono markers, disabled |

### Notes

- All neutrals tinted with brand chroma (0.015–0.030). Pure `#fff` and `#000` banned.
- Accent at 10–15% alpha for pill backgrounds (`bg-accent/10`, `bg-accent/15`).
- Reference: Klim Type Foundry's earthy specimens, Sonoran-desert sunsets, saguaro cactus bloom.

## Theme transition

Switching themes uses the View Transitions API for a radial wipe out of the click origin (`ThemeToggle` passes cursor `{x, y}` to `ThemeProvider.toggle()`). 600ms ease-out-quart. Falls back to instant swap on browsers without `startViewTransition` (Firefox at time of writing) and on `prefers-reduced-motion`. Implementation in `app/globals.css` (`@keyframes theme-radial-wipe`) and `components/ThemeProvider.tsx`.

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
