# Skill: Kinetic Glyph Particle Text (Mecha Matrix)

## 1. Purpose & Trigger
- **Kapan Digunakan**: Khusus untuk *Hero Display Title* atau *Header Banner* utama di area konten.
- **Batasan**: Dilarang diterapkan pada paragraf panjang, tombol kecil, atau kartu proyek agar keterbacaan tetap maksimal. Wajib sediakan teks HTML semantik (`sr-only` atau `aria-label`) untuk aksesibilitas dan SEO.

## 2. Core Mechanics & Physics
1. **Offscreen Rasterization**: Gambar teks target pada offscreen `<canvas>` dengan font bold geometris, lalu baca piksel menggunakan `ctx.getImageData()`.
2. **Alternating Glyph Matrix**: Sampel piksel berdasarkan jarak kisi (`gap = 6px` s.d. `8px`). Render simbol teknis bergantian berdasarkan posisi grid `(col + row) % 2 === 0 ? '—' : '|'` untuk membentuk tekstur *woven mecha blueprint*.
3. **Radial Cursor Repulsion & Spring Return**:
   - Hitung jarak Euclidean `dx, dy` antara tiap partikel dan posisi kursor.
   - Jika `distance < repulsionRadius` (mis. `75px`), dorong partikel menjauh secara radial sebanding dengan rasio kedekatan.
   - Kembalikan partikel ke posisi asal `(originX, originY)` menggunakan interpolasi *spring damping* (`ease = 0.08`–`0.12`).

## 3. Gundam Theme Engine Integration
- **Dynamic Color Binding**: Ambil warna langsung dari CSS variables pada root document setiap frame atau saat event perubahan `data-theme` terjadi:
  - Glyph dasar menggunakan `--text-primary` (atau `--color-main` pada aksen tertentu).
  - Glyph yang sedang terdorong (*displaced*) berubah warna secara dinamis menjadi `--color-secondary` (misalnya Signal Red di RX-78-2, Mafty Orange di Mafty, atau Tekkadan Red di Tekkadan).
- **No Generic Glow**: Render glyph secara tajam (*crisp 1px monospace*), tanpa efek `shadowBlur` atau neon glow.

## 4. Reference Implementation (TypeScript)

```typescript
interface GlyphParticle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  glyph: string;
}

export function initParticleText(
  canvas: HTMLCanvasElement,
  text: string,
  options = { gap: 7, radius: 75, ease: 0.1, force: 14 }
) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return () => {};

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  let particles: GlyphParticle[] = [];
  let animId = 0;
  const pointer = { x: -9999, y: -9999 };

  const getThemeColors = () => {
    const styles = getComputedStyle(document.documentElement);
    return {
      base: styles.getPropertyValue('--text-primary').trim() || '#0B0B0E',
      active: styles.getPropertyValue('--color-secondary').trim() || '#E50922',
    };
  };

  let colors = getThemeColors();

  // Pantau perubahan tema Gundam (data-theme attribute)
  const themeObserver = new MutationObserver(() => {
    colors = getThemeColors();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  const buildParticles = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, rect.width, rect.height);
    const fontSize = Math.min(rect.width / (text.length * 0.62), rect.height * 0.78);
    ctx.font = `900 ${fontSize}px "Inter", "Space Grotesk", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000';
    ctx.fillText(text, rect.width / 2, rect.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    particles = [];

    const step = options.gap * dpr;
    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        const index = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
        if (imageData[index + 3] > 128) {
          const px = x / dpr;
          const py = y / dpr;
          const gridIndex = Math.round(x / step) + Math.round(y / step);
          particles.push({
            x: px,
            y: py,
            originX: px,
            originY: py,
            vx: 0,
            vy: 0,
            glyph: gridIndex % 2 === 0 ? '—' : '|',
          });
        }
      }
    }
  };

  const render = () => {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.font = `700 ${options.gap + 1}px "JetBrains Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (const p of particles) {
      if (!prefersReducedMotion && !isTouchDevice) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);

        if (dist < options.radius && dist > 0) {
          const angle = Math.atan2(dy, dx);
          const push = ((options.radius - dist) / options.radius) * options.force;
          p.vx += Math.cos(angle) * push * 0.25;
          p.vy += Math.sin(angle) * push * 0.25;
        }
      }

      p.vx += (p.originX - p.x) * options.ease;
      p.vy += (p.originY - p.y) * options.ease;
      p.vx *= 0.82;
      p.vy *= 0.82;
      p.x += p.vx;
      p.y += p.vy;

      const displacement = Math.hypot(p.x - p.originX, p.y - p.originY);
      ctx.fillStyle = displacement > 1.5 ? colors.active : colors.base;
      ctx.fillText(p.glyph, p.x, p.y);
    }

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

  buildParticles();
  render();

  window.addEventListener('resize', buildParticles);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerleave', onPointerLeave);

  // Cleanup function wajib dipanggil saat unmount
  return () => {
    cancelAnimationFrame(animId);
    themeObserver.disconnect();
    window.removeEventListener('resize', buildParticles);
    canvas.removeEventListener('pointermove', onPointerMove);
    canvas.removeEventListener('pointerleave', onPointerLeave);
  };
}