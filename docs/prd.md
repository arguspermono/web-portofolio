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
  - Keep the available profile photos ordered from `bagus-1.png` through `bagus-4.png`.
  - Clip the photo deck's dotted overlay to each image's transparent silhouette so the effect follows the subject's body.
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
  - Scope the effect to the routed main content, preserve the native pointer and clickable controls, and restore DOM state on route changes/unmount.
  - Respect reduced-motion preferences, reveal all content and hide swarm overlays during printing, and use the exact licensed upstream source rather than a similarly named npm package from another project.
