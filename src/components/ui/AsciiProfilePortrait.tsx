import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const portraitSrc = '/assets/img/profile/bagus-1.png';
const characterRamp = '.:-=+*#%@';
const animationDuration = 1100;

interface AsciiGlyph {
  index: number;
  x: number;
  y: number;
  char: string;
  opacity: number;
  offsetX: number;
  offsetY: number;
  color: string;
}

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 127.1) * 43758.5453;
  return value - Math.floor(value);
}

export function AsciiProfilePortrait() {
  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { tokens } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!container || !canvas || !context) {
      console.error('Unable to initialize the ASCII profile portrait canvas.');
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const image = new Image();
    let disposed = false;
    let visible = false;
    let progress = reducedMotion.matches ? 1 : 0;
    let animationFrame = 0;
    let digitAnimationFrame = 0;
    let digitFrame = 0;
    let width = 0;
    let height = 0;
    let glyphs: AsciiGlyph[] = [];

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (const glyph of glyphs) {
        const x = glyph.x + glyph.offsetX * (1 - progress);
        const y = glyph.y + glyph.offsetY * (1 - progress);
        const opacity = glyph.opacity * progress;
        if (opacity <= 0.01) continue;

        context.globalAlpha = opacity;
        context.fillStyle = glyph.color;
        const digit = progress >= 1 && glyph.index % 13 === digitFrame % 13;
        const char = digit
          ? '0123456789'[Math.floor(pseudoRandom(glyph.index + digitFrame * 19) * 10)]
          : glyph.char;
        context.fillText(char, x, y);
      }
      context.globalAlpha = 1;
    };

    const stopDigitAnimation = () => {
      window.cancelAnimationFrame(digitAnimationFrame);
      digitAnimationFrame = 0;
    };

    const startDigitAnimation = () => {
      stopDigitAnimation();
      if (!visible || reducedMotion.matches) return;

      let lastDraw = 0;
      const tick = (time: number) => {
        if (disposed || !visible || reducedMotion.matches || progress < 1) {
          digitAnimationFrame = 0;
          return;
        }
        if (time - lastDraw >= 140) {
          digitFrame += 1;
          draw();
          lastDraw = time;
        }
        digitAnimationFrame = window.requestAnimationFrame(tick);
      };
      digitAnimationFrame = window.requestAnimationFrame(tick);
    };

    const rebuildGlyphs = () => {
      if (disposed || !image.complete || !image.naturalWidth) return;

      const bounds = container.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (!width || !height) return;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const columns = Math.max(36, Math.ceil(width / 6.5));
      const rows = Math.max(36, Math.ceil(height / 9));
      const sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = columns;
      sampleCanvas.height = rows;
      const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true });
      if (!sampleContext) {
        console.error('Unable to sample the ASCII profile portrait image.');
        return;
      }

      const imageScale = Math.min(columns / image.naturalWidth, rows / image.naturalHeight);
      const imageWidth = image.naturalWidth * imageScale;
      const imageHeight = image.naturalHeight * imageScale;
      sampleContext.clearRect(0, 0, columns, rows);
      sampleContext.drawImage(
        image,
        (columns - imageWidth) / 2,
        (rows - imageHeight) / 2,
        imageWidth,
        imageHeight,
      );

      const pixels = sampleContext.getImageData(0, 0, columns, rows).data;
      const cellWidth = width / columns;
      const cellHeight = height / rows;
      const fontSize = Math.min(cellHeight * 1.15, cellWidth / 0.58);
      context.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      glyphs = [];
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const pixelIndex = (row * columns + column) * 4;
          const alpha = pixels[pixelIndex + 3] / 255;
          if (alpha < 0.12) continue;

          const luminance = (
            pixels[pixelIndex] * 0.2126
            + pixels[pixelIndex + 1] * 0.7152
            + pixels[pixelIndex + 2] * 0.0722
          ) / 255;
          const rampIndex = Math.min(
            characterRamp.length - 1,
            Math.round((1 - luminance) * (characterRamp.length - 1)),
          );
          const index = row * columns + column;
          const seed = index + 1;

          glyphs.push({
            index,
            x: (column + 0.5) * cellWidth,
            y: (row + 0.5) * cellHeight,
            char: characterRamp[rampIndex],
            opacity: alpha * (0.36 + (1 - luminance) * 0.64),
            offsetX: (pseudoRandom(seed) - 0.5) * width * 0.7,
            offsetY: (pseudoRandom(seed + 13) - 0.5) * height * 0.65,
            color: index % 23 === 0 ? tokens.contentHighlight : tokens.contentPrimary,
          });
        }
      }

      draw();
      if (reducedMotion.matches) {
        progress = 1;
        draw();
      } else if (visible) {
        animateTo(1);
      }
    };

    const animateTo = (target: number) => {
      window.cancelAnimationFrame(animationFrame);
      stopDigitAnimation();
      if (reducedMotion.matches) {
        progress = target;
        draw();
        return;
      }
      if (progress === target) {
        if (target === 1) startDigitAnimation();
        return;
      }

      const startProgress = progress;
      let startTime: number | undefined;
      const tick = (time: number) => {
        if (disposed) return;
        startTime ??= time;
        const elapsed = Math.min(1, (time - startTime) / animationDuration);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        progress = startProgress + (target - startProgress) * eased;
        draw();

        if (elapsed < 1) {
          animationFrame = window.requestAnimationFrame(tick);
        } else if (target === 1) {
          startDigitAnimation();
        }
      };

      animationFrame = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        animateTo(visible ? 1 : 0);
      },
      { threshold: 0.18 },
    );
    observer.observe(container);

    const resizeObserver = new ResizeObserver(rebuildGlyphs);
    resizeObserver.observe(container);

    const handleMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        window.cancelAnimationFrame(animationFrame);
        stopDigitAnimation();
        progress = 1;
        draw();
      } else {
        animateTo(visible ? 1 : 0);
      }
    };
    reducedMotion.addEventListener('change', handleMotionPreferenceChange);

    image.onload = rebuildGlyphs;
    image.onerror = () => console.error(`Failed to load the ASCII profile portrait: ${portraitSrc}`);
    image.src = portraitSrc;
    if (image.complete && image.naturalWidth) rebuildGlyphs();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      stopDigitAnimation();
      observer.disconnect();
      resizeObserver.disconnect();
      reducedMotion.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, [tokens.contentHighlight, tokens.contentPrimary]);

  return (
    <figure
      ref={containerRef}
      className="relative block aspect-[4/5] w-full overflow-hidden rounded-[14px] border-2 border-black bg-white shadow-[-4px_4px_0_#d4d4d8,-8px_8px_0_#a1a1aa]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="ASCII portrait of Arya Bagus Permono"
      >
        ASCII portrait of Arya Bagus Permono
      </canvas>
      <figcaption className="absolute bottom-3 right-3 z-10 bg-black/70 px-2 py-1 font-mono text-[9px] tracking-widest text-white">
        ASCII PORTRAIT // 01
      </figcaption>
    </figure>
  );
}
