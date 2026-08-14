# Design System

## Visual Direction
**Theme**: Technical, Mechanical, Structured, Futuristic, Professional.
**Concept**: "Gundam-inspired Technical Interface".
The design uses a clean, light-themed foundation inspired by mecha design. It relies on stark contrast, sharp edges, structured panels, and intentional grid alignments to convey a mechanical and highly technical feel. It actively avoids generic "AI" aesthetics like glassmorphism, soft glows, and excessive rounding.

## Color System
- **Background (Base)**: `#FAFAFA` (Zinc 50) - Clean, stark white/light grey for main surfaces.
- **Background (Panel/Surface)**: `#F4F4F5` (Zinc 100) or `#FFFFFF` (White) - For structured cards and overlapping panels.
- **Dark Contrast**: `#18181B` (Zinc 900) - For heavy contrast, footers, headers, or robust mechanical borders.
- **Accent (Blue)**: `#2563EB` (Blue 600) - Primary technical accent.
- **Accent (Red)**: `#DC2626` (Red 600) - Secondary accent for warnings, badges, or key highlights.
- **Accent (Yellow)**: `#EAB308` (Yellow 500) - Tertiary accent for technical labels or subtle mechanical details.
- **Text (Primary)**: `#18181B` (Zinc 900) - Deep charcoal for maximum readability on light backgrounds.
- **Text (Secondary)**: `#52525B` (Zinc 600) - For metadata, technical specs, or supporting text.
- **Border/Divider**: `#E4E4E7` (Zinc 200) or `#18181B` (Zinc 900) depending on the desired visual weight.

## Typography
- **Primary Font**: `Inter` - Structured, clean, highly legible.
- **Display Font**: `Space Grotesk` or `Outfit` - Geometric and technical feel.

### Font Hierarchy
- **H1 (Hero)**: Display Font, Bold, uppercase, tracking-wider, 4rem (Desktop).
- **H2 (Section Title)**: Display Font, Bold, uppercase, tracking-wide, 2.5rem (Desktop).
- **H3 (Project/Role Title)**: Display Font, SemiBold, 1.5rem.
- **Body**: Primary Font, Regular, 1rem (16px), 1.5 line height.
- **Small/Detail**: Primary Font, Mono or Medium, 0.75rem - 0.875rem, often uppercase for technical labels.

## Spacing System
- Intentional, grid-based spacing. Use standard Tailwind scales.
- **Section Padding**: `py-24` (Desktop) / `py-16` (Mobile)
- **Component Gap**: `gap-4` or `gap-8`
- **Inner Padding (Cards)**: `p-6` or `p-8`

## Borders and Geometry
- **Border Radius**: Sharp edges. Use `rounded-none` or minimally `rounded-sm` (2px-4px). Absolutely no rounded-full or 2xl.
- **Borders**: Strong, solid borders. Cards and buttons should have definitive outlines (`border-2 border-zinc-900`).
- **Shadows**: Hard, solid shadows offset from the element (e.g., `shadow-[4px_4px_0px_#18181B]`), evoking physical, mechanical panels.

## UI Elements

### Buttons
- **Primary Button**: Solid Zinc 900 background, white text, sharp corners. Hover: translates slightly with a hard shadow reveal, or border color shift to an accent (Red/Blue).
- **Secondary Button**: Transparent background, solid Zinc 900 border, dark text.

### Navigation
- Structured, panel-like top bar. Solid borders, clear demarcation. No blur/glassmorphism.

### Project Cards
- Mechanical panels: Stark borders (`border-2 border-zinc-900`), sharp corners.
- Often feature a small colored accent bar (e.g., a 4px red or blue top border) to evoke mecha decals.
- Clear structural division between image and text.

### Tags/Badges
- Rectangular (`rounded-none` or `rounded-sm`).
- Solid background with high-contrast text, or bordered with a technical mono-spaced label.

## Animation Principles
- **Timing Function**: Snappy, mechanical easing (e.g., `cubic-bezier(0, 0.55, 0.45, 1)` or linear steps).
- **Movement**: Hard cuts, sudden slides, or quick opacity reveals rather than slow, ethereal fades. 
