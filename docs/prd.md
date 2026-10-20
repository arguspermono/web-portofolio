# Product Requirements Document (PRD)

## Project Name
**ARGUS Portfolio — Minimalist Editorial Technical Interface**

---

## 1. Overview & Vision
The portfolio of Arya Bagus ("ARGUS"), Multimedia Engineering Technologist and Developer.

The visual system is clean, minimalist, classic monochrome with sharp panel lines inspired by official archives (e.g., `gundam-official.com`). It balances high aesthetic minimalism with engaging interactive previews.

### Core Objectives:
1. **Ultra-Clean, Uncluttered UI**: Drastically minimize visual noise, eliminate redundant labels/boxes, and allow content to breathe with generous whitespace and clear hierarchy.
2. **Engaging Interactive Previews**: Retain and enhance interactive preview features:
   - Interactive Certificate Lightbox/Modal with live document view, credential details, and keyboard/prev-next navigation.
   - Interactive Project Quick Preview modal and responsive media viewport (full uncropped mobile screenshots for MemoSpace, landscape for web).
   - Interactive Experience/Education tab switcher.
   - 1-click copy-to-clipboard for contact channels with live toast feedback.
3. **Section Naming**: Rename Section 03 from "ACHIEVEMENTS" to **"CERTIFICATES"** (`/certificates`).
4. **Natural Imagery**: All photos and screenshots presented naturally without harsh contrast overlays.

---

## 2. Information Architecture & Multi-Page Routes

1. **Module 01: ABOUT (`/` and `/about`)**
   - Streamlined single-header hero dossier.
   - Natural portrait photo presentation.
   - Editorial biography with comfortable reading line length.
   - Interactive switcher between Work Experience and Academic Education.
   - Technical skillset taxonomy.
   - Direct contact channel with quick-copy interactions.

2. **Module 02: PROJECTS (`/projects`)**
   - Minimalist split header (`■ MODULE.002 // PROJECTS`).
   - Clean category filtering tabs.
   - Adaptive card viewport: Mobile apps (MemoSpace) rendered uncropped; Web apps rendered full width.
   - Interactive Quick View modal + full case study links (`/projects/:slug`).

3. **Module 03: CERTIFICATES (`/certificates`)**
   - Minimalist split header (`■ MODULE.003 // CERTIFICATES`).
   - Clean filter and search controls.
   - Interactive Certificate Viewer modal for instant credential inspection.

4. **Module 04: RESUME (`/resume`)**
   - Clean ATS-compliant printable curriculum vitae with 1-click print/PDF export.

---

## 3. Visual & Aesthetic Guidelines
- **Palette**: Deep Stark Black (`#0A0A0A`) and Crisp Pure White (`#FFFFFF`).
- **Dividers**: Subtle, structural 1px panel lines (`#E5E5E5` on light surfaces, `#262626` on dark surfaces).
- **Typography**: Outfit / Inter grotesque uppercase for headings with balanced weights (`font-semibold` / `font-bold`), comfortable body prose.
- **Micro-interactions**: Crisp border highlights, instant copy feedback, smooth modal transitions.
