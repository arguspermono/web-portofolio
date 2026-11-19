# GSAP Motion & Scroll Choreography Guide

Engineering standard for performant, accessible, and theme-synchronized GSAP animations tailored for the Gundam Mecha Technical Editorial aesthetic.

---

## 1. Purpose & Trigger Guidelines
- **Permitted Locations**:
  - Pinned horizontal showcases (`FeaturedProjectRail.tsx`).
  - Strict directional reveals and micro-scrubs on section entries (`SectionHeader`, numeric index counters).
  - Subtle interactive state transitions on technical reticles, viewport rulers, and status tickers.
- **Strictly Prohibited**:
  - Global scroll-jacking or full-page hijacking (Lenis/Locomotive without user bypass).
  - Excessive floating continuous ambient drift that compromises copy legibility or text selection.
  - Staggered entrance animations on body copy or paragraphs longer than 2 lines.

---

## 2. Core Mechanics & Implementation Template

```typescript
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useTechnicalScroll(triggerRef: React.RefObject<HTMLElement>) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    // Responsive & accessibility gate
    const media = gsap.matchMedia();

    media.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        ctxRef.current = gsap.context(() => {
          // Read active Gundam theme tokens from computed root variables
          const style = getComputedStyle(document.documentElement);
          const accentColor = style.getPropertyValue('--accent-primary').trim() || '#FFFFFF';
          const borderColor = style.getPropertyValue('--content-border').trim() || '#D4D4D8';

          gsap.fromTo(
            el.querySelectorAll('[data-mecha-track]'),
            { opacity: 0, x: -24 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.08,
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                end: 'top 30%',
                scrub: false,
                toggleActions: 'play none none reverse',
              },
            }
          );
        }, el);
      }
    );

    return () => {
      media.revert(); // Full cleanup of triggers & media listeners
      ctxRef.current?.revert();
    };
  }, [triggerRef]);
}
```

---

## 3. Gundam Theme Engine & Anti-Slop Adaptation
- **Dynamic CSS Variables**: Always sample colors at runtime via `getComputedStyle(document.documentElement)`.
  - Primary Accent: `var(--accent-primary)`
  - Surface & Panel Borders: `var(--content-border)`, `var(--sidebar-border)`
  - Content Typography: `var(--content-primary)`, `var(--content-text)`
  - *Never hardcode hex values like `#3b82f6` or `#a855f7` in GSAP tween configurations.*
- **Mecha Technical Editorial Form**:
  - **Motion Curve**: Mechanical, crisp, snap-to-grid (`power2.out`, `expo.out`, or linear scrub). Avoid playful elastic, bounce, or cartoon overshoot easings.
  - **Geometry**: Sharp 90° edges, 1px blueprint grid lines, monospace coordinates, precision reticles.
  - **Anti-Slop Ban**: No generic circular particle clouds, no purple/cyan neon bloom, no heavy drop-shadow blurs.

---

## 4. Performance & Lifecycle Guardrails
1. **Lifecycle Teardown**:
   - Wrap all GSAP animations inside `gsap.context()` or `gsap.matchMedia()`.
   - Call `.revert()` inside React `useEffect`/`useLayoutEffect` cleanup to prevent memory leaks and orphaned pinned spacers.
2. **Device & Accessibility Gates**:
   - Check `(prefers-reduced-motion: no-preference)`. If reduced motion is requested, instantly render terminal states (`progress: 1`).
   - On touch/mobile (`pointer: coarse` or `max-width: 1023px`), disable pin-scrolling in favor of native CSS scroll-snapping (`overflow-x-auto snap-x`).
3. **GPU Layering**:
   - Animate only transform properties (`x`, `y`, `scale`) and `opacity`.
   - Avoid animating layout triggers (`width`, `height`, `padding`, `top`, `left`).
