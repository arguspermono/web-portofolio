# Visual Verification & Evidence-Based Quality Assurance

Technical standard for verifying UI layout fidelity, Gundam theme compliance, and interactive behavior before completing tasks or reporting success.

---

## 1. Purpose & Trigger Guidelines
- **Mandatory Trigger**: Run before claiming any UI bug is fixed, any design change is completed, or any theme/layout task is done.
- **The Core Rule**: *No completion claims without fresh, direct verification evidence.* Never rely on assumptions ("looks right", "should work now", "linter passed").
- **Permitted Scope**: Verify DOM rendered styles, theme CSS variables, responsive breakpoints, layout containers, and error-free compilation.

---

## 2. Core Mechanics & Automated Verification Scripts

### TypeScript Verification Harness (`scripts/verify-ui.ts` / Browser Console)

```typescript
export interface VisualAuditResult {
  themeId: string;
  isCompliant: boolean;
  violations: string[];
}

export function auditVisualCompliance(): VisualAuditResult {
  const root = document.documentElement;
  const style = getComputedStyle(root);
  const violations: string[] = [];

  // 1. Verify Gundam theme dynamic tokens
  const currentTheme = root.getAttribute('data-theme') || 'default';
  const sidebarBg = style.getPropertyValue('--sidebar-bg').trim();
  const contentBg = style.getPropertyValue('--content-bg').trim();
  const accentPrimary = style.getPropertyValue('--accent-primary').trim();

  if (!sidebarBg || !contentBg || !accentPrimary) {
    violations.push('Missing essential CSS theme custom properties on documentElement.');
  }

  // 2. Anti-Slop Check: Ensure zero illegal corner-accents or double-slash headers
  const illegalCorners = document.querySelectorAll('.corner-tr, .corner-tr-dark, [class*="border-l border-b"]');
  if (illegalCorners.length > 0) {
    violations.push(`Detected ${illegalCorners.length} obsolete corner-box accents.`);
  }

  // 3. Overflow & Scrollbar Check
  if (document.body.scrollWidth > window.innerWidth) {
    violations.push(`Horizontal overflow detected: body scrollWidth (${document.body.scrollWidth}px) > innerWidth (${window.innerWidth}px).`);
  }

  return {
    themeId: currentTheme,
    isCompliant: violations.length === 0,
    violations,
  };
}
```

---

## 3. Gundam Theme Engine & Anti-Slop Adaptation
- **Dynamic Variable Inspection**:
  - Verify that theme elements sample variables from runtime (`--sidebar-bg`, `--accent-primary`, `--content-bg`, `--content-border`, `--content-text`).
  - Hardcoded color tokens (e.g. static `#3B82F6` or `#000000` overrides) are strictly prohibited in component styles.
- **Mecha Technical Aesthetics**:
  - Panels must adhere to crisp 1px borders without bevels or soft diffuse shadows.
  - Typography must maintain strict monospace serial numbers (`01`, `02`) without extra diagonal dividers (`// -`).
  - Hero wordmark must honor solid dual-token theme colors (`wordmarkPrimary` & `wordmarkSecondary`).

---

## 4. Performance & Lifecycle Guardrails
1. **Verification Gate Execution**:
   - Always run verification command (`npm run build` or targeted unit test) and inspect exit code (`exit 0`).
   - If any TypeScript error or compilation warning occurs, state the failure and resolve it before claiming success.
2. **Responsive & Motion Checks**:
   - Verify layout integrity at mobile viewports (< 768px) and desktop viewports (≥ 1024px).
   - Ensure `prefers-reduced-motion: reduce` turns off intensive motion and complex particle simulations.
3. **Resource Teardown**:
   - Clean up any background watchers, test servers, or temporary extract folders immediately after verification.
