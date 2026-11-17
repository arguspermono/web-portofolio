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
7. **Editorial Portfolio Layout**:
   - Recompose the About hero as a balanced editorial layout with the ASCII profile portrait centered between identity and introduction panels.
   - Preserve all existing routes, portfolio sections, content, and interactions; update presentation rather than removing modules.
   - Use the existing Framer Motion library for restrained hero entrance/hover motion and respect reduced-motion preferences.

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
  - **Theme-3 (Mafty)**:
    - Dominance order: Mafty Orange (`#F58220`) → White (`#F8FAFC`) → Black (`#171717`), matching the requested orange/white/black direction and the existing gold Mafty emblem.
  - **Theme-4 (Celestial Being / Gundam 00)**:
    - Dominance order: Emblem Gold (`#EBCB32`) → Insignia Blue (`#4F5D95`) → White (`#F8F9FC`) → Deep Navy (`#20233A`), matching the logo's wings and globe.
  - **Theme-5 (Tekkadan)**:
    - Dominance order: Tekkadan Red (`#E50922`) → Black (`#171717`) → White (`#F7F7F7`), matching the existing red insignia.
  - **Theme-6 (Gjallarhorn)**:
    - Dominance order: Warm White (`#F5F3ED`) → Officer Navy (`#243248`) → Crimson (`#A7373F`) → Gold (`#C5A565`).
    - No Gjallarhorn logo asset is currently present in `public/assets/img/logo/theme`; retain its current palette until a matching logo is added.
  - Keep the existing Monochrome, E.F.S.F., and Neo Zeon palettes intact and include every theme in the persistent cycle.
  - Highlight Resume in yellow only for E.F.S.F. and Neo Zeon; use each added faction's own palette for its Resume navigation state.
  - Prevent theme toggle labels from overflowing their button; size the desktop toggle for the longest faction label while keeping the compact mobile toggle unchanged.
  - Use `CELESTIAL BEING` as the Celestial Being theme's displayed code label.
  - Instant theme transition with persistent state in `localStorage`.

## 6. Project Gallery & Navigation Refinements

- **Project Card Media**:
  - Round the project preview/card image corners so the media follows the card's rounded shape.
  - Allow each project to include multiple preview images, presented as a gallery rather than a single static screenshot.
  - Automatically cycle through a project's available preview images while its card is hovered; keep the first preview visible when not hovered and respect reduced-motion preferences.
- **Theme Logo**:
  - Display the theme logo without a surrounding border or box.
- **Resume Navigation**:
  - Highlight the Resume item in yellow only for the E.F.S.F. and Neo Zeon themes, using `#FFCB3D`.
  - Keep the Resume item styled with the normal sidebar palette in the Monochrome theme.
- **Role Ticker**:
  - Use `#FFCB3D` for the bright yellow ticker accent.
- **Theme Highlight Color**:
  - Use `#FFCB3D` for the content highlight color in the E.F.S.F. and Neo Zeon themes.
- **Profile Photo Deck**:
  - Use `bagus-1.png` as the single primary About-page portrait instead of cycling through the profile-photo deck.
  - Render the portrait as a responsive, wider ASCII character image, preserving the transparent subject silhouette and portrait proportions.
  - Animate ASCII glyphs gathering into the recognizable portrait when it enters the viewport and scattering when it leaves; show it fully assembled for reduced-motion preferences.
  - While visible, animate a restrained subset of glyphs as changing digits so the portrait stays alive without redrawing continuously at full frame rate.
  - Use the active theme's content and highlight colors for the ASCII portrait.
- **Responsive Layout & Mobile Navigation**:
  - Improve layouts for narrow mobile screens and preserve comfortable spacing around fixed navigation.
  - Hide the viewport's vertical and horizontal scrollbar visuals while preserving normal scrolling.
  - Replace the mobile slide-over sidebar with a fixed bottom tab bar for About, Projects, Certificates, and Resume, using icons that match each section.
  - Style the mobile tab bar with the active Gundam theme palette and ensure active/current-page states remain clear.
  - Prevent decorative full-screen backgrounds and content from causing horizontal overflow on mobile.
  - Keep the layered profile-photo deck within the viewport on narrow screens.
  - Allow resume role/date metadata and contact links to wrap on narrow screens while preserving its print layout.
  - Do not add a custom cursor; retain the platform's native cursor behavior.
- **Header Controls & Interactive Targets**:
  - Match the Theme button dimensions to the music button in the mobile header.
  - Keep the Resume sidebar action white in the Monochrome theme, whether or not it is the current route.
  - Make each visible interactive control respond across its full displayed hit area.
- **ATS Resume Layout**:
  - Keep resume text and content fixed rather than dynamically changing with viewport size.
  - Present a compact ATS-friendly resume on an A4 portrait page, using the supplied Glints templates as layout references.
  - Keep the print output to a single A4 page, without site navigation spacing or mobile/desktop layout padding.
  - Include every documented work experience and its responsibilities, with supporting education details, selected projects, skills, and relevant certifications; do not reduce the CV to a short summary.
- **Scroll-Driven Portfolio Presentation**:
  - Integrate the upstream `ZhengLinLei/cursor-swarm.js` library into the existing portfolio content; do not add a separate demo or mock website section.
  - Let the library build and deconstruct actual text, frames, controls, and media in response to scroll, using a restrained theme-aware cursor palette.
  - Reduce cursor count and limit build detection to meaningful headings, copy, controls, links, and media; disable nonessential guide/spark effects to reduce scroll-time lag.
  - Scope the effect to the routed main content, preserve the native pointer and clickable controls, and restore DOM state on route changes/unmount.
  - Respect reduced-motion preferences, reveal all content and hide swarm overlays during printing, and use the exact licensed upstream source rather than a similarly named npm package from another project.
