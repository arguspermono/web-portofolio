# Design System

## Logo Specification: Initials Monogram ("AB")

- **Mark**: Formal initials **"AB"** (Arya Bagus).
- **Typography**: High-craft serif/grotesque display (`Outfit` / `Cinzel` / `Playfair` or geometric modern sans), `tracking-tight` or `tracking-wider`, `font-extrabold`.
- **Styling**: Pure vector CSS/SVG. Stark monochrome contrast (`#FFFFFF` on dark, `#0A0A0A` on light).
- **Hover**: Subtle opacity or frame highlight.

---

## Interactive Patterns (Inspired by rafifnuha.my.id & rzainurtanto.github.io)

1. **Scroll Progress Bar**:
   - Fixed 1px/2px top bar (`bg-white` on dark, `bg-black` on light) tracking scroll percentage.
2. **Dynamic Role Typewriter**:
   - Monospace font, blinking cursor box, clean transition across Arya Bagus's core competencies.
3. **Ambient Audio Visualizer / Player**:
   - Discrete 3-bar equalizer animation (`<i></i><i></i><i></i>`) that animates during playback.
   - Elegant toggle button with tooltip.
4. **Project Card Architecture**:
   - Crisp 1px border.
   - Structured 2-column or 4-column metadata grid (`Role`, `Year`, `Category`, `Context`).
   - Adaptive uncropped media container (MemoSpace portrait vs landscape web).

---

## Logo Specifications (`public/assets/img/logo/logo-b.png`)

- **Theme-Aware Monogram Asset**:
  - `logo-w.png` (Bright/White): Used on dark backgrounds, notably the desktop sidebar and mobile header.
  - `logo-b.png` (Dark/Black): Used on light surfaces and browser tab favicon.
- **Browser Favicon**: Loaded dynamically as `type="image/png" href="/assets/img/logo/logo-b.png"`.

---

## Layout Structure & Content Normalization

- **Sidebar (Left Column)**:
  - Persistent mecha dark background (`#0B0B0E`) across desktop and mobile drawer.
  - Houses the initial monogram logo, navigation links, quick audio player, and theme switcher.
- **Content Area (Right Column)**:
  - Pure white background (`#FFFFFF`) with dark typography (`#0B0B0E`) across all primary pages: About (`/about`), Projects (`/projects`), Certificates (`/certificates`), and Resume (`/resume`).
  - Ensures clean readability and editorial contrast.

---

## Gundam Color Palette System (Theme Engine)

Interactive 1-click theme switcher in the sidebar supports instant cycling through thematic units:

1. **Theme-0: MONO (Monochrome Mecha)**
   - Minimalist black, white, and subtle technical grays.
   - Primary: `#FFFFFF` | Surface: `#0B0B0E` | Accent: `#FFFFFF`

2. **Theme-1: E.F.S.F. (RX-78-2 Gundam)**
   - Dominance hierarchy:
     1. **Putih (White)**: Primary content surface & clarity
     2. **Biru (Federation Blue `#122340`)**: Sidebar frame & module headers
     3. **Merah (Torso Signal Red `#DC2626`)**: Secondary operational markers
     4. **Kuning (V-Fin Yellow `#F59E0B`)**: Active indicators & highlight trim

3. **Theme-2: NEO ZEON (MSN-06S Sinanju / Red Comet)**
   - Dominance hierarchy:
     1. **Merah (Sinanju Crimson `#771616`)**: Primary armor & sidebar chassis
     2. **Hitam (Matte Black `#111113`)**: Inner frame details & card accents
     3. **Kuning / Emas (Imperial Gold `#D4AF37`)**: Sleeves metallic engravings & active nav trim
