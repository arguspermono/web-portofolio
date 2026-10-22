# Product Requirements Document (PRD)

## Project Name

**ARGUS Portfolio — Clean Technical Editorial Interface**

---

## 1. Reference Analysis & Interactive Benchmarks

Inspired by two reference portfolios provided by the user:

1. **`https://www.rafifnuha.my.id/`**:
   - Ultra-clean stark monochrome palette (`bg-black`, `text-white`, `border-neutral-800`).
   - Minimalist 2-letter initials logo (`RN`) with clean, commanding typography.
   - Dynamic typewriter status/role ticker with blinking cursor.
   - Structured project cards with clean metadata grid (Role, Year, Type, Stack) and direct action pills.
2. **`https://rzainurtanto.github.io/`**:
   - Interactive ambient audio player toggle with animated equalizer bars.
   - Interactive local time HUD / live clock indicator.
   - Subtle scroll progress bar tracking user scroll.

---

## 2. Updated Identity: Initials Monogram Logo ("AB")

- **Logo Transition**: Change logo from wordmark to pure name initials: **"AB"** (Arya Bagus).
- **Typography**: Proper, high-craft editorial typeface with balanced letter-spacing, sharp geometric alignment, and crisp vector rendering.
- **Placement**: Mobile top header and desktop fixed sidebar, linking to `/`.

---

## 3. Interactive Systems & UX Refinements

1. **Dynamic Typewriter Ticker**:
   - In Hero / About dossier: Animated role ticker cycling through:
     - `MULTIMEDIA ENGINEERING TECHNOLOGIST`
     - `FULL-STACK WEB & MOBILE DEVELOPER`
     - `3D & CREATIVE INTERACTIVE CODER`
   - Styled in crisp monochrome badge with blinking cursor.
2. **Interactive Ambient Audio Player (Toggle)**:
   - Minimalist audio player in Sidebar footer / top bar with animated equalizer bars and volume/mute control.
   - Non-intrusive, starts paused by default with clear visual state.
3. **Scroll Reading Progress Bar**:
   - Thin 1px monochrome progress bar at the top of the viewport indicating page scroll depth.
4. **Interactive Project Cards (Rafif Nuha Style + Adaptive Mobile Media)**:
   - Clean 1px border cards.
   - Structured metadata table: Context, Role, Year, Category.
   - Adaptive media container: 100% full uncropped portrait for MemoSpace; landscape for web apps.
   - Interactive Quick View modal + direct links (Demo, GitHub, Specification).
5. **Interactive Certificate Document Modal**:
   - Clean in-app lightbox with arrow key navigation for certificate documents.
6. **1-Click Copy Interaction**:
   - Instant email copy with visual feedback badge.

---

## 4. Logo Assets & Browser Identity Integration

- **Image Asset Sourcing**: Logo assets stored in `public/assets/img/logo/logo-b.png`:
  - `logo-w.png`: White/light monogram logo used for dark themes and dark sidebar backgrounds.
  - `logo-b.png`: Black/dark monogram logo used for light themes and browser favicon.
- **Browser Favicon & Title**:
  - Favicon configured with `assets/img/logo/logo-b.png` for crisp visibility on browser tabs.
  - Page title: `ARGUS // ARYA BAGUS — MULTIMEDIA ENGINEERING TECHNOLOGIST`.

---

## 5. Layout Color Normalization & Gundam Theme Engine

- **Layout Structure**:
  - **Sidebar (Left)**: Dark mecha background (`#0B0B0E`) with high-contrast technical typography, navigation serial indicators, and quick action controls.
  - **Content Area (Right)**: Crisp pure white background (`#FFFFFF`) with dark text (`#0B0B0E`) across all pages (About, Projects, Certificates, Resume) for maximum readability and clean modern aesthetic.
  - **Projects Page Fix**: Normalize Projects page background from black to clean white background with crisp border panel lines, replacing dark cards with clean white cards with dark typography.
- **Gundam Color Palette Switcher Engine**:
  - Interactive switcher button positioned in the sidebar to toggle theme palettes instantly:
  - **Theme-0 (Default Monochrome)**: Pure technical black, neutral whites, subtle technical grays.
  - **Theme-1 (RX-78-2 Federation)**:
    - Dominance order: Putih (White - primary content) → Biru (Federation Blue - sidebar/accents) → Merah (Signal Red - secondary markers) → Kuning (Yellow - active highlights).
  - **Theme-2 (Sinanju / Zeon)**:
    - Dominance order: Merah (Sinanju Crimson - primary/sidebar) → Hitam (Zeon Black - content accents/details) → Kuning/Emas (Gold/Yellow - elite metallic trim).
  - Instant theme transition with persistent state in `localStorage`.
