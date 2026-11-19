# Skill: Interactive ASCII Matrix Masking (Mecha Radar / Emblem Canvas)

## 1. Purpose & Trigger
- **Kapan Digunakan**: Khusus sebagai latar belakang bertekstur pada **Sidebar (kiri)** atau panel header teknis untuk menampilkan siluet emblem faksi Gundam / kepala mecha (*V-Fin* silhouette) dalam bentuk kisi karakter alfanumerik.
- **Batasan**: Dilarang diterapkan di belakang area teks bacaan utama (*Content Area* kanan) agar kontras dan keterbacaan teks tetap bersih di atas `#FFFFFF`.

## 2. Core Mechanics & Luminance Sampling
1. **Offscreen Silhouette Masking**: Gambar siluet objek atau logo faksi (hitam-putih / alpha PNG / SVG path) ke *offscreen canvas*, lalu ambil data kecerahan piksel (*luminance*) pada tiap titik grid (`cellSize = 10px`–`12px`).
2. **Alphanumeric Flux / Scramble**:
   - Isi setiap sel grid dengan karakter acak dari himpunan `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`.
   - Beri probabilitas mutasi rendah (`~2%`–`4%` per tick dengan *throttle* 15–20 FPS untuk pembaruan karakter) agar efek terlihat seperti telemetri radar yang hidup namun tidak terlalu berisik.
3. **Interactive Cursor Spotlight**:
   - Sel di luar area siluet dirender sangat redup (`opacity: 0.06`).
   - Sel di dalam siluet menyala dengan opasitas sedang hingga terang (`opacity: 0.35`–`0.85`).
   - Ketika kursor melintas di atas kanvas (`radius = 90px`), sel di sekitar kursor ikut menyala dan mempercepat frekuensi *scramble* karakter.

## 3. Gundam Theme Engine Integration
- **Dynamic Color Binding**: Pantau perubahan atribut `data-theme` melalui `MutationObserver` dan baca warna langsung dari CSS variables:
  - Karakter redup & karakter utama siluet menggunakan `--text-sidebar` (dengan variasi `globalAlpha`).
  - Karakter highlight di inti siluet dan area *cursor spotlight* menggunakan `--color-secondary` (atau `--accent-highlight` jika `--color-secondary` gelap seperti pada Tema Mafty/Tekkadan).
- **Sharp Monospace Rendering**: Wajib gunakan font `JetBrains Mono` atau `Space Mono` tanpa efek blur/neon glow.

## 4. Reference Implementation (TypeScript)

```typescript
interface MatrixCell {
  x: number;
  y: number;
  maskStrength: number; // 0.0 (luar siluet) s.d. 1.0 (dalam siluet)
  char: string;
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function initAsciiMatrixMask(
  canvas: HTMLCanvasElement,
  drawMaskShape: (ctx: CanvasRenderingContext2D, width: number, height: number) => void,
  options = { cellSize: 11, spotlightRadius: 90, scrambleRate: 0.03 }
) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return () => {};

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  let cells: MatrixCell[] = [];
  let animId = 0;
  let lastScrambleTime = 0;
  const pointer = { x: -9999, y: -9999 };

  const getThemeColors = () => {
    const styles = getComputedStyle(document.documentElement);
    const baseText = styles.getPropertyValue('--text-sidebar').trim() || '#F4F4F5';
    const highlight = styles.getPropertyValue('--accent-highlight').trim() || '#E50922';
    return { baseText, highlight };
  };

  let colors = getThemeColors();

  const themeObserver = new MutationObserver(() => {
    colors = getThemeColors();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  const buildGrid = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 1. Gambar siluet mask sementara di canvas
    ctx.clearRect(0, 0, rect.width, rect.height);
    drawMaskShape(ctx, rect.width, rect.height);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    cells = [];

    for (let y = options.cellSize / 2; y < rect.height; y += options.cellSize) {
      for (let x = options.cellSize / 2; x < rect.width; x += options.cellSize) {
        const px = Math.floor(x * dpr);
        const py = Math.floor(y * dpr);
        const idx = (py * canvas.width + px) * 4;
        const alpha = imgData[idx + 3] / 255;

        cells.push({
          x,
          y,
          maskStrength: alpha,
          char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        });
      }
    }
  };

  const render = (now: number) => {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.font = `600 ${options.cellSize - 2}px "JetBrains Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const shouldScramble = !prefersReducedMotion && now - lastScrambleTime > 65;
    if (shouldScramble) lastScrambleTime = now;

    for (const cell of cells) {
      let spotlight = 0;
      if (!isTouchDevice) {
        const dist = Math.hypot(cell.x - pointer.x, cell.y - pointer.y);
        if (dist < options.spotlightRadius) {
          spotlight = 1 - dist / options.spotlightRadius;
        }
      }

      const activeLevel = Math.max(cell.maskStrength, spotlight * 0.85);

      if (shouldScramble && activeLevel > 0.1 && Math.random() < options.scrambleRate + spotlight * 0.15) {
        cell.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }

      if (activeLevel > 0.55) {
        ctx.fillStyle = colors.highlight;
        ctx.globalAlpha = Math.min(0.95, activeLevel);
      } else {
        ctx.fillStyle = colors.baseText;
        ctx.globalAlpha = Math.max(0.06, activeLevel * 0.65);
      }

      ctx.fillText(cell.char, cell.x, cell.y);
    }

    ctx.globalAlpha = 1;
    animId = requestAnimationFrame(render);
  };

  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
  };

  const onPointerLeave = () => {
    pointer.x = -9999;
    pointer.y = -9999;
  };

  buildGrid();
  animId = requestAnimationFrame(render);

  window.addEventListener('resize', buildGrid);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerleave', onPointerLeave);

  return () => {
    cancelAnimationFrame(animId);
    themeObserver.disconnect();
    window.removeEventListener('resize', buildGrid);
    canvas.removeEventListener('pointermove', onPointerMove);
    canvas.removeEventListener('pointerleave', onPointerLeave);
  };
}