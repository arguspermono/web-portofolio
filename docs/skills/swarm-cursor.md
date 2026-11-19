# Swarm Cursors & Autonomous Multi-Agent Canvas Choreography

Engineering standard for autonomous multiplayer cursor swarm simulations, flocking physics, and scroll-driven blueprint reconstruction in the Gundam Mecha Technical Editorial aesthetic.

---

## 1. Purpose & Trigger Guidelines
- **Permitted Locations**:
  - Global background construction layer (`CursorSwarmController.tsx`) bound to `#portfolio-content`.
  - Tactical blueprint grid and section element reconstructions (headings, structural frames, project cards).
- **Strictly Prohibited**:
  - Blocking interactive native controls (inputs, buttons, links) with high z-index synthetic pointer layers.
  - Spawning excessive agent counts (> 4 agents during regular browsing) that causes frame drops or CPU throttling.
  - Applying swarm deconstruction/retyping effects to critical titles (e.g. `hero-wordmark` `ARYA BAGUS`).

---

## 2. Core Mechanics & Mathematical Logic

The engine uses a hybrid of Reynolds Boids flocking physics, spring-damper targeting, and task queue scheduling:
1. **Targeting & Steering**:
   $$\vec{F}_{\text{steer}} = \text{clamp}(\vec{v}_{\text{desired}} - \vec{v}, -\vec{F}_{\max}, \vec{F}_{\max})$$
2. **Orbiting Swirl Vector**:
   $$\vec{v}_{\text{swirl}} = \langle -n_y \cdot v_{\text{tang}} + n_x \cdot v_{\text{rad}},\, n_x \cdot v_{\text{tang}} + n_y \cdot v_{\text{rad}} \rangle$$
3. **Task Lifecycle**: `idle` $\rightarrow$ `approach` $\rightarrow$ `draw_frame / type_text` $\rightarrow$ `dissolve / flock`.

```typescript
export interface SwarmAgentConfig {
  cursors: number;
  palette: string[];
  targets: string;
  speed: number;
  typeDuration: number;
  respectReducedMotion: boolean;
}

export function createSwarmChoreographer(root: HTMLElement, config: SwarmAgentConfig) {
  let animId: number | null = null;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Immediate bail-out for accessibility & low-power touch devices
  if (isTouch || reduceMotion) {
    return { destroy: () => {} };
  }

  const agents = Array.from({ length: Math.min(config.cursors, 4) }, (_, i) => ({
    id: i,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    target: null as HTMLElement | null,
  }));

  const tick = () => {
    // Steering calculations & CSS transform application
    animId = requestAnimationFrame(tick);
  };

  animId = requestAnimationFrame(tick);

  return {
    destroy: () => {
      if (animId) cancelAnimationFrame(animId);
      agents.length = 0;
    },
  };
}
```

---

## 3. Gundam Theme Engine & Anti-Slop Adaptation
- **Dynamic Color Sampling**:
  - Never hardcode Figma/preset color arrays (`#F24E1E`, `#A259FF`).
  - Read active theme tokens directly via `getComputedStyle(document.documentElement)`:
    `var(--content-primary)`, `var(--content-highlight)`, `var(--accent-alt)`.
- **Mecha Technical Cursors**:
  - Replace generic pointer arrows with military telemetry reticles: crosshairs (`+`), precision target markers (`⌖`), and monospace telemetry tags (`AGENT.01 [ACT]`).
  - Strict 90° panel frame tracking; avoid rounded soft cursor badges or playful bounce physics.
  - Sound synthesis (if enabled) must use crisp tactile mechanical clicks via Web Audio API, not cartoon boings or loud audio files.

---

## 4. Performance & Lifecycle Guardrails
1. **Lifecycle Teardown**:
   - Cancel all `requestAnimationFrame` and interval timers upon unmount.
   - Listen for `beforeprint` and `afterprint` events to reveal full DOM content and pause the swarm during PDF/print generation.
2. **Throttling & Concurrency Limits**:
   - Limit active autonomous agents to **2–4 cursors** on production portfolio pages.
   - Restrict DOM scanning to meaningful containers (`targets: 'h1:not(.hero-wordmark), h2, h3, p, a, button, article'`).
3. **Accessibility & Touch Bypass**:
   - Check `window.matchMedia('(pointer: coarse)').matches` and `(prefers-reduced-motion: reduce)`.
   - On touchscreens or when reduced motion is preferred, completely bypass script loading and retain pristine static layout.
