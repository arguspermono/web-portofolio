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

## 7. Experimental Editorial Portfolio Redesign

### Objective

Evolve the existing routed portfolio into one cohesive, narrative-led editorial experience while preserving all current content, project data, themes, navigation, project details, resume behavior, and certificate interactions.

### Reference roles

- JarnKet: modular editorial grid, consistent section rhythm, and connected transitions.
- Christen Dijoux: restrained reusable dot-matrix visual identity.
- Vadim Carazan: image-led hero with layered imagery and scroll depth.
- DEV IN THE HOOD: guided storytelling and a horizontal selected-project gallery.
- Sebastien Graf: reversible pixel dissolve concentrated at the top and bottom viewport edges.

### Current implementation audit

- `/` and `/about` render `AboutPage`; existing sections include the hero, biography, experience/education switcher, skills, and contact.
- Projects and project details use `ProjectsPage`, `ProjectDetail`, and the local `projects` dataset. Project preview images already exist locally and `ProjectPreviewGallery` supports them.
- Certificates have a separate route and local data; resume and routing are independent and must remain intact.
- Existing reusable foundation includes `Section`, `SectionHeader`, `FadeIn`, `ModulePanelHeader`, `ProjectPreviewGallery`, Framer Motion, the theme system, scroll progress, and the Cursor Swarm controller.
- GSAP/ScrollTrigger are already installed and used for scroll choreography and the pinned horizontal project rail; PixiJS is not installed. Prefer the existing custom WebGL image shader for the edge pixel treatment; do not rasterize arbitrary DOM. Keep a reduced-motion/mobile sharp-image fallback and do not add Lenis or PixiJS unless a prototype demonstrates a concrete need.

### Ordered implementation phases

1. **Audit and preparation** — understand the routes, data, visual utilities, animation dependencies, media assets, and interaction conflicts before editing.
2. **Design foundation** — unify section widths, spacing, typography, index labels, separators, and transitions without removing sections or routes.
3. **Dot matrix system** — add a reusable CSS radial-gradient utility with configurable spacing/scale/opacity; apply it only to selected areas.
4. **Immersive hero** — reuse the profile image and selected local project imagery, layer the composition, and connect controlled scroll movement to the next section.
5. **Story and project exploration** — sequence the existing content into introduction, background, selected projects, development notes, experience/education, skills, certifications, and contact; add an accessible horizontal gallery using existing project data and detail routes.
6. **Viewport-edge pixel dissolve** — prototype on selected images, then implement reversible lower-edge resolution and upper-edge breakup in sync with scroll. Keep the viewport center sharp and all text and controls accessible.
7. **Integration and refinement** — reconcile GSAP, Framer Motion, Cursor Swarm, and native scroll; verify keyboard use, responsive layouts, reduced motion, cleanup, and mobile alternatives.

### Global constraints

- Do not rebuild the app, remove existing portfolio content, change route semantics, replace user imagery, or add a separate demo page.
- Keep horizontal scrolling limited to the selected-project gallery and provide keyboard and touch affordances.
- Restrict pixel processing to selected image/media visuals; never rasterize the entire DOM.
- Keep edge effects deterministic, reversible, and limited to viewport boundaries. Provide sharp-content fallback for reduced motion, touch/mobile, or unsupported WebGL.
- Preserve the current theme palettes, native pointer, project/certificate modals, resume print layout, and Cursor Swarm integration.
- Keep animation ownership clear: Framer Motion for component/micro interactions; GSAP/ScrollTrigger for scroll timelines and gallery pinning; custom WebGL only for selected-media pixelation.

### Phase 5 implementation notes

- The selected-project gallery applies a custom WebGL shader to its preview images only; titles, descriptions, controls, and other page content remain native DOM.
- Shader progress is derived from each image's viewport position on scroll, so lower-edge resolution and upper-edge breakup reverse with scroll direction without rasterizing the page.
- Each image initializes lazily near the viewport and releases its WebGL context on unmount. Reduced-motion, coarse-pointer, WebGL-unavailable, and shader-error paths keep the sharp HTML image visible.

### Phase 6 integration notes

- The pinned project rail is limited to desktop with no reduced-motion preference. Touch and reduced-motion layouts retain native horizontal scrolling, with arrow-key support for both modes.
- Scroll-linked canvases and the hero ticker respect reduced motion; project text and navigation remain DOM-based and keyboard-accessible.

## Follow-up: unified navigation, art direction, and ASCII portrait

### Scope

- Make the desktop sidebar reflect the current About-page section and provide direct in-page navigation, while preserving route navigation and the mobile bottom navigation.
- Unify buttons, borders, typography, and panel treatments around the existing technical-editorial direction and theme tokens; remove conflicting global neo-brutalist overrides.
- Widen the ASCII portrait composition and sample a closer, top-aligned crop of the existing profile image so facial features occupy more of the frame without distorting the source.
- Reuse the installed GSAP library for the portrait's reveal/assembly animation and keep Canvas 2D for image sampling and glyph rendering. Do not add a separate ASCII conversion package or rendering engine: the available packages are terminal-oriented or disproportionately large for this browser-only effect.

### Acceptance criteria

- The sidebar's active in-page item tracks scrolling, is keyboard accessible, and offers links to each existing About-page section without changing other routes.
- Shared controls and panels use consistent theme-aware colors, square editorial geometry, legible typography, and visible focus states.
- The portrait remains based on `bagus-1.png`, has a wider frame, preserves facial proportions, and honors reduced-motion preferences.
- Existing project, theme, audio, resume, and mobile-navigation behavior remains intact.

## Follow-up: modern navigation, hero, and scroll transitions

### User requirements

- Remove the fixed left sidebar and replace it with a responsive top navigation that fits the existing editorial art direction.
- Keep route navigation, Resume, theme/audio controls, and About section anchors available without retaining a desktop sidebar or bottom tab bar.
- Make Cursor Swarm respond promptly while scrolling; it must not continue a stale/delayed build after the visitor has moved into another section.
- Remove the diagonal divider lines around the portrait composition.
- Keep `MODULE.001 // ABOUT` visible when navigating to the Introduction anchor.
- Reframe the existing ASCII portrait to show the full upper body, with a smoother silhouette and no abrupt cut-off at the head or body edges.
- Make the name `ARYA BAGUS` a dominant, large-scale hero wordmark; reduce copy and metadata to the left and right of the portrait.
- Implement a visible, reversible pixel transition at the top and bottom viewport edges, following scroll position rather than playing as a one-time entrance.

### Implementation constraints and acceptance criteria

- Reuse the current React Router, theme tokens, GSAP, Canvas portrait, and licensed Cursor Swarm integration; do not add a dependency unless the existing implementation cannot meet the behavior.
- The new top navigation remains keyboard-accessible, responsive, theme-aware, and available on all routes. Existing route URLs, project links, Resume, audio, and theme controls remain functional.
- Anchor navigation accounts for the sticky header. The Introduction anchor must not scroll the module label out of view; the module label remains visible at the top of the hero when the anchor is selected.
- Cursor Swarm speed/settling behavior is tuned against the upstream library's actual options. Rebuild work is cancelled or refreshed promptly on scroll/section changes, and reduced-motion/print behavior remains intact.
- Portrait sampling uses a subject-aware, full upper-body crop (not a head-only zoom), preserves natural aspect ratio, and fades the silhouette edge rather than ending on a hard rectangular crop. The non-ASCII photo fragments and diagonal separator rules are removed from the hero.
- The hero prioritizes the portrait and large `ARYA BAGUS` wordmark; secondary copy, role, and status remain concise and do not crowd either side of the portrait.
- Pixel transitions are visibly tied to both viewport edges and reverse naturally on scroll-up. Keep textual content and controls sharp and accessible, restrict GPU pixel processing to visual media, and retain a low-cost sharp fallback for touch devices, reduced motion, or WebGL failure.

## Follow-up: floating About section navigation

### User requirements

- Remove the full-width horizontal About section link strip beneath the main header.
- Replace it with a compact vertical section index that floats along the right side of the viewport, inspired by the understated numbered list in DEV IN THE HOOD.
- Keep the active section identifiable while rendering inactive items in a restrained, low-contrast color.
- Preserve section anchors, active-section tracking, keyboard accessibility, and responsive navigation without covering important content.

### Acceptance criteria

- The About page has no secondary full-width horizontal section strip.
- Desktop About pages show a fixed, right-aligned vertical section index with numbered labels and a subtle active marker.
- The floating index remains legible over page themes and does not obstruct the hero or project interactions.
- On narrow screens, section links remain available through the existing mobile navigation rather than an overflowing rail.

## Follow-up: hero clarity and photo-aware ASCII rendering

### User requirements

- Prevent the floating About section index from overlapping hero metadata or other readable content.
- Ensure the `ARYA BAGUS` hero title is visible immediately and remains stable after a reload.
- Replace the ASCII portrait's visibly diagonal/repeating glyph pattern with a more natural, irregular distribution.
- Derive portrait glyph colors from the source photo so regions such as skin, clothing, and hair/background retain distinct tones instead of using arbitrary speckles.

### Acceptance criteria

- The floating section index does not collide with hero labels at desktop or mobile sizes.
- The hero wordmark does not depend on Cursor Swarm assembly or delayed animation to become visible.
- ASCII character placement has no repeated diagonal pattern; any variation remains visually bounded by the portrait silhouette.
- Glyph colors are sampled/classified from the original profile image, preserving distinct photo regions while remaining legible in the active theme.

## Follow-up: immersive profile, theme-aware chrome, and loading experience

### User requirements

- Increase facial detail in the ASCII portrait and regenerate/recolor it when the active theme changes.
- Apply the active theme consistently to the footer and project cards, and unify the content width across sections.
- Restore a more visible Cursor Swarm build/deconstruction process rather than the overly restrained current behavior.
- Keep the floating section index numeric by default; reveal each section label on hover/focus and clearly indicate the active/targeted section.
- Add an original, brief typing-style loading overlay on full page reload, inspired by the pacing of the provided reference without copying its text or page design.
- Layer concise project-image previews partly behind and to the sides of the profile portrait.
- Give typography more character while keeping it readable and consistent with the technical-editorial direction.

### Acceptance criteria

- The portrait uses a denser sample grid and theme-aware tones while preserving photo-based color regions; switching themes triggers a visible rebuild.
- Footer, cards, and section containers use shared theme tokens and a consistent maximum width.
- Cursor Swarm targets meaningful content and visibly builds/deconstructs it with a moderate duration, while never modifying the stable hero wordmark.
- The section index shows numbers by default, reveals labels on hover and keyboard focus, and exposes the active section with an accent marker.
- The loading overlay types a portfolio-specific label, completes quickly, does not trap interaction, and is skipped or reduced for reduced-motion preferences.
- Existing project data and routes are reused for the hero previews; no new dependency or replacement imagery is introduced.

## Follow-up: hero layering, woven identity, and toolkit section

### User requirements

- Remove the small gap beneath the LinkedIn action at the end of the contact section.
- Start the two local project previews hidden behind the portrait, then animate them outward to the left and right.
- Enlarge the ASCII portrait so it reads clearly as both a portrait and ASCII; let its lower edge sit behind the large name with a softened/blurred transition.
- Remove the decorative dotted/plus-pattern backgrounds from the portfolio sections.
- Redesign Toolkit as a distinctive, theme-aware editorial section with a woven-inspired header and grouped technology rows, guided by the supplied reference.
- Give the large `ARYA BAGUS` wordmark a woven-text treatment inspired by the supplied reference while keeping the name readable and theme-aware.

### Acceptance criteria

- The contact card ends flush with the LinkedIn action; no unnecessary trailing section padding remains.
- Hero project imagery begins concealed beneath the portrait and animates outward; reduced-motion users see the final positions without movement.
- The larger portrait maintains detail and silhouette proportions, overlaps the wordmark, and fades/blurs near the text rather than merging with it.
- Decorative dot/plus backgrounds are removed from sections without affecting the content or viewport-edge image effects.
- Toolkit categories and skills remain sourced from existing data, use a shared content width, and adapt their colors to the active theme.
- The wordmark remains selectable, responsive, accessible, and legible with or without the woven texture.

## Follow-up: inline interactive woven wordmark

### User requirements

- Keep `ARYA BAGUS` on one line instead of stacking the two words, including at narrow viewport widths.
- Refine the wordmark texture to resemble the supplied crosshatch reference: bold theme-aware lettering with a clear woven grid.
- Add a restrained pointer-driven texture response without making the name hard to read or adding unnecessary animation dependencies.
- Remove the full-width woven band shown above the Toolkit content; keep the Toolkit section and grouped skill rows.

### Acceptance criteria

- The full name remains on one line at supported viewport sizes without horizontal page overflow.
- Crosshatch is clipped to the letters, follows active theme colors, and moves subtly with pointer position.
- Keyboard access, text selection, and reduced-motion behavior remain unaffected.
- The Toolkit no longer renders a decorative full-width woven band or its added spacer.

## Follow-up: shared content width and hero/contact spacing

### User requirements

- Align the content width of Projects, Certificates, project details, and other portfolio content with the shared About-page editorial container.
- Temporarily remove the woven/pointer effect from the `ARYA BAGUS` wordmark and hide the floating project previews beside the profile portrait.
- Keep the large name on one line while the texture effect is disabled.
- Restore breathing room between the Contact card and the footer.

### Acceptance criteria

- Main content areas across About, Projects, Certificates, and project detail pages share the same maximum width and responsive gutters; full-bleed section backgrounds may remain full width.
- The hero wordmark is plain, theme-aware text, and the floating project preview cards are not rendered.
- The Contact section has visible bottom spacing before the footer without adding space inside the contact card.
- The resume's existing ATS layout remains unchanged.

## Follow-up: intro navigation, loader timing, and logo

### User requirements

- Home/intro links that point to the `#` destination should perform a full page reload and return to the Introduction section so the intro sequence runs again.
- Keep section-specific anchors working as in-page navigation.
- Match the intro loader's main typeface to the portfolio's content display font, slow down typing, and hold the completed text briefly before the loader exits.
- Show the appropriate `logo-b` or `logo-w` asset in the intro loader and emphasize it with a restrained theme-aware highlight.

### Acceptance criteria

- Logo and About navigation reload the site at `/#intro`; mobile section links and the section rail continue to navigate to their selected section.
- The loader uses the existing display font, types at a readable pace, and pauses after the full line before fading out.
- The loader logo variant follows the active theme and remains legible against the loader background; its highlight uses theme accent tokens.
- Reduced-motion users continue to skip the loader.

## Follow-up: mobile typography, navigation, and overflow

### User requirements

- Tune typography and spacing for phone-sized screens, preventing horizontal overflow.
- Replace the mobile dropdown/sub-navigation with a primary navigation bar fixed to the bottom of the viewport.
- Do not show the About section sub-navigation on mobile.
- Remove the portrait's gradient/blur treatment on mobile while retaining the desktop treatment.

### Acceptance criteria

- Mobile primary links remain accessible in the bottom bar, including safe-area spacing, and page content is not obscured by it.
- The mobile section sub-navigation and hamburger dropdown are absent; desktop navigation behavior remains unchanged.
- Hero text and role ticker scale/wrap within the viewport, and long content does not cause horizontal scrolling.
- The portrait edge has no gradient at any mobile-navigation breakpoint (below 1024px).

## Follow-up: ASCII portrait contrast and glyph scale

### User requirements

- Darken the rendered ASCII portrait so its colors and glyphs read more clearly.
- Increase the size of the ASCII glyphs without losing facial or silhouette detail.

### Acceptance criteria

- Glyph contrast is stronger while photo-derived colors and tonal separation remain intact.
- Glyphs are visibly larger, but the existing sampling grid and subject bounds remain unchanged so portrait detail is preserved.

## Follow-up: content typography and intro composition

### User requirements

- Justify paragraph copy so content aligns to both sides, while keeping labels and navigation readable.
- Use a consistent responsive type scale for page titles, section headings, card headings, and body copy across portfolio sections.
- Remove the unnecessary empty outlined decoration shown in the first attached screenshot without removing functional controls.
- Hide the "COPY" and "VISIT" action labels in the Contact rows on mobile.
- Reduce excessive empty space above the portrait in the Introduction hero.
- Do not keep the Resume navigation item highlighted when it is not the active page.
- In the intro loader, enlarge and center the logo without a surrounding border; center the text and align the visual widths of the eyebrow and main line.

### Acceptance criteria

- Descriptive paragraphs use justified alignment and retain comfortable mobile line lengths.
- Shared responsive typography styles are used for page/section/card headings and body content, without changing the ATS resume typography.
- The mobile Contact links remain fully clickable and legible after action labels are hidden.
- The portrait begins higher in the mobile hero and the hero remains responsive at narrow widths.
- Resume is highlighted only when active or hovered.
- The loader logo is visibly larger and centered, with no border frame; both text lines are centered and balanced to a shared width.

## Follow-up: ATS resume typography and pagination

### User requirements

- Restore a compact, polished CV heading scale; site-wide heading styles must not enlarge the ATS resume.
- Set regular resume copy to approximately 12 px (9 pt) for A4 readability, with proportionate heading sizes.
- Never clip resume content at the bottom of an A4 sheet; split longer content across two A4 pages in both preview and print/PDF.

### Acceptance criteria

- ATS resume font sizes remain controlled by its own styles and are not affected by portfolio-wide typography rules.
- Resume body copy is about 9 pt / 12 px and headings remain visibly hierarchical but compact.
- All resume content is visible across one or two A4 portrait pages; page boundaries do not cut through sections or hide overflow.
- Print/save PDF produces the same pagination and content as the on-screen A4 preview.

### Clarification: prefer one page when it fits

- Use one A4 page by default and make efficient use of its available space.
- Add a second page only when the complete resume cannot fit legibly on one page at the agreed 9 pt / 12 px body size and with safe print margins.
- The page count is content-driven, not fixed at two pages.

## Follow-up: theme-palette hero wordmark

### User requirements

- Color “ARYA” and “BAGUS” separately with two theme palette colors in the large hero wordmark.
- Do not use a gradient between the two colors.
- Use the exact, saturated palette colors instead of muted derived content colors.

### Acceptance criteria

- “ARYA” and “BAGUS” use explicit palette color tokens for each theme: monochrome black/gray; EFSF blue/yellow; Neo Zeon crimson/gold; Mafty orange/black; Celestial Being gold/blue; Tekkadan red/black; Gjallarhorn navy/gold.
- Prefer the palette's vivid brand colors; do not use white as a wordmark fill on the white hero background.
- The two solid word colors update when the user changes theme and remain legible over the hero portrait/background.
