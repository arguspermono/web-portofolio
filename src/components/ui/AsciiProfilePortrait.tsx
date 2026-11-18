import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../context/ThemeContext';

const portraitSrc = '/assets/img/profile/bagus-1.png';
const characterRamp = ' .,:;irsXA253hMHGS#9B&@';
const animationDuration = 1100;

interface PhotoColor {
  r: number;
  g: number;
  b: number;
}

interface PortraitThemeColors {
  primary: string;
  accent: string;
  accentAlt: string;
  highlight: string;
  paper: string;
}

interface AsciiGlyph {
  index: number;
  x: number;
  y: number;
  char: string;
  digitSeed: number;
  opacity: number;
  offsetX: number;
  offsetY: number;
  color: string;
}

function cellRandom(x: number, y: number, salt: number) {
  let value = Math.imul(x + salt * 374761393, 0x45d9f3b);
  value = Math.imul(value ^ (y + salt * 668265263), 0x45d9f3b);
  value ^= value >>> 16;
  return (value >>> 0) / 4294967296;
}

function colorLuminance(color: PhotoColor) {
  return color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722;
}

function parseHexColor(hex: string): PhotoColor {
  const value = hex.replace('#', '');
  const expanded = value.length === 3
    ? value.split('').map((character) => `${character}${character}`).join('')
    : value;

  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16),
  };
}

function blendPhotoColor(photo: PhotoColor, theme: PhotoColor, amount: number): PhotoColor {
  return {
    r: photo.r * (1 - amount) + theme.r * amount,
    g: photo.g * (1 - amount) + theme.g * amount,
    b: photo.b * (1 - amount) + theme.b * amount,
  };
}

function getPhotoPalette(pixels: Uint8ClampedArray, theme: PortraitThemeColors): PhotoColor[] {
  const samples: PhotoColor[] = [];
  for (let index = 0; index < pixels.length; index += 4) {
    if (pixels[index + 3] < 24) continue;
    samples.push({
      r: pixels[index],
      g: pixels[index + 1],
      b: pixels[index + 2],
    });
  }

  if (!samples.length) return [parseHexColor(theme.primary)];

  const clusterCount = Math.min(5, samples.length);
  const orderedSamples = [...samples].sort((a, b) => colorLuminance(a) - colorLuminance(b));
  let centers = Array.from({ length: clusterCount }, (_, index) => {
    const sampleIndex = Math.round((index / Math.max(1, clusterCount - 1)) * (orderedSamples.length - 1));
    return { ...orderedSamples[sampleIndex] };
  });

  for (let iteration = 0; iteration < 5; iteration += 1) {
    const totals = centers.map(() => ({ r: 0, g: 0, b: 0, count: 0 }));
    for (const sample of samples) {
      let nearest = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;
      centers.forEach((center, centerIndex) => {
        const red = sample.r - center.r;
        const green = sample.g - center.g;
        const blue = sample.b - center.b;
        const distance = red * red + green * green + blue * blue;
        if (distance < nearestDistance) {
          nearest = centerIndex;
          nearestDistance = distance;
        }
      });

      const total = totals[nearest];
      total.r += sample.r;
      total.g += sample.g;
      total.b += sample.b;
      total.count += 1;
    }

    centers = centers.map((center, index) => {
      const total = totals[index];
      if (!total.count) return center;
      return {
        r: total.r / total.count,
        g: total.g / total.count,
        b: total.b / total.count,
      };
    });
  }

  const sortedCenters = centers.sort((a, b) => colorLuminance(a) - colorLuminance(b));
  const themeTones = [
    { color: parseHexColor(theme.primary), amount: 0.2 },
    { color: parseHexColor(theme.accentAlt), amount: 0.18 },
    { color: parseHexColor(theme.highlight), amount: 0.2 },
    { color: parseHexColor(theme.accent), amount: 0.18 },
    { color: parseHexColor(theme.paper), amount: 0.16 },
  ];

  return sortedCenters.map((photoColor, index) => {
    const themeTone = themeTones[Math.min(index, themeTones.length - 1)];
    return blendPhotoColor(photoColor, themeTone.color, themeTone.amount);
  });
}

function closestPhotoColor(red: number, green: number, blue: number, palette: PhotoColor[]) {
  let nearest = palette[0];
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const color of palette) {
    const redDistance = red - color.r;
    const greenDistance = green - color.g;
    const blueDistance = blue - color.b;
    const distance = redDistance * redDistance + greenDistance * greenDistance + blueDistance * blueDistance;
    if (distance < nearestDistance) {
      nearest = color;
      nearestDistance = distance;
    }
  }

  return `rgb(${Math.round(nearest.r)}, ${Math.round(nearest.g)}, ${Math.round(nearest.b)})`;
}

function findSubjectBounds(image: HTMLImageElement) {
  const scanWidth = 128;
  const scanHeight = Math.max(128, Math.round(scanWidth * image.naturalHeight / image.naturalWidth));
  const scanCanvas = document.createElement('canvas');
  scanCanvas.width = scanWidth;
  scanCanvas.height = scanHeight;
  const scanContext = scanCanvas.getContext('2d', { willReadFrequently: true });

  if (!scanContext) {
    return { x: 0, y: 0, width: image.naturalWidth, height: image.naturalHeight };
  }

  scanContext.drawImage(image, 0, 0, scanWidth, scanHeight);
  const pixels = scanContext.getImageData(0, 0, scanWidth, scanHeight).data;
  let minX = scanWidth;
  let minY = scanHeight;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < scanHeight; y += 1) {
    for (let x = 0; x < scanWidth; x += 1) {
      if (pixels[(y * scanWidth + x) * 4 + 3] < 16) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (maxX < minX || maxY < minY) {
    return { x: 0, y: 0, width: image.naturalWidth, height: image.naturalHeight };
  }

  const scaleX = image.naturalWidth / scanWidth;
  const scaleY = image.naturalHeight / scanHeight;
  const x = minX * scaleX;
  const y = minY * scaleY;
  const width = (maxX - minX + 1) * scaleX;
  const height = (maxY - minY + 1) * scaleY;
  const padX = width * 0.035;
  const padY = height * 0.025;

  return {
    x: Math.max(0, x - padX),
    y: Math.max(0, y - padY),
    width: Math.min(image.naturalWidth, width + padX * 2),
    height: Math.min(image.naturalHeight, height + padY * 2),
  };
}

function smoothstep(value: number) {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
}

export function AsciiProfilePortrait() {
  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme, tokens } = useTheme();

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
    let assemblyTween: gsap.core.Tween | null = null;
    let digitTween: gsap.core.Tween | null = null;
    let digitFrame = 0;
    let width = 0;
    let height = 0;
    let glyphs: AsciiGlyph[] = [];
    const progressState = { value: progress };
    const digitClock = { value: 0 };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (const glyph of glyphs) {
        const x = glyph.x + glyph.offsetX * (1 - progress);
        const y = glyph.y + glyph.offsetY * (1 - progress);
        const opacity = glyph.opacity * progress;
        if (opacity <= 0.01) continue;

        context.globalAlpha = opacity;
        context.fillStyle = glyph.color;
        const digit = progress >= 1 && glyph.digitSeed < 0.075;
        const char = digit
          ? '0123456789'[Math.floor(cellRandom(glyph.index, digitFrame, 19) * 10)]
          : glyph.char;
        context.fillText(char, x, y);
      }
      context.globalAlpha = 1;
    };

    const stopDigitAnimation = () => {
      digitTween?.kill();
      digitTween = null;
    };

    const startDigitAnimation = () => {
      stopDigitAnimation();
      if (!visible || reducedMotion.matches) return;

      digitTween = gsap.to(digitClock, {
        value: 1,
        duration: 0.14,
        ease: 'none',
        repeat: -1,
        onRepeat: () => {
          if (!disposed && visible && !reducedMotion.matches && progress >= 1) {
            digitFrame += 1;
            draw();
          }
        },
      });
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

      const columns = Math.max(94, Math.ceil(width / 5.5));
      const rows = Math.max(106, Math.ceil(height / 5.5));
      const sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = columns;
      sampleCanvas.height = rows;
      const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true });
      if (!sampleContext) {
        console.error('Unable to sample the ASCII profile portrait image.');
        return;
      }

      const targetAspect = width / height;
      const subject = findSubjectBounds(image);
      const subjectCenterX = subject.x + subject.width / 2;
      const subjectCenterY = subject.y + subject.height / 2;
      let cropWidth = subject.width;
      let cropHeight = subject.height;

      if (cropWidth / cropHeight > targetAspect) {
        cropHeight = cropWidth / targetAspect;
      } else {
        cropWidth = cropHeight * targetAspect;
      }

      cropWidth = Math.min(cropWidth, image.naturalWidth);
      cropHeight = Math.min(cropHeight, image.naturalHeight);
      const cropX = Math.max(0, Math.min(image.naturalWidth - cropWidth, subjectCenterX - cropWidth / 2));
      const cropY = Math.max(0, Math.min(image.naturalHeight - cropHeight, subjectCenterY - cropHeight / 2));

      sampleContext.clearRect(0, 0, columns, rows);
      sampleContext.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        columns,
        rows,
      );

      const pixels = sampleContext.getImageData(0, 0, columns, rows).data;
      const photoPalette = getPhotoPalette(pixels, {
        primary: tokens.contentPrimary,
        accent: tokens.accent,
        accentAlt: tokens.accentAlt,
        highlight: tokens.accentHighlight,
        paper: tokens.contentBg,
      });
      const cellWidth = width / columns;
      const cellHeight = height / rows;
      const fontSize = Math.min(cellHeight * 1.24, cellWidth / 0.58);
      context.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      glyphs = [];
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const pixelIndex = (row * columns + column) * 4;
          const alpha = pixels[pixelIndex + 3] / 255;
          if (alpha < 0.035) continue;

          const luminance = (
            pixels[pixelIndex] * 0.2126
            + pixels[pixelIndex + 1] * 0.7152
            + pixels[pixelIndex + 2] * 0.0722
          ) / 255;
          const ditheredLuminance = Math.max(
            0,
            Math.min(1, luminance + (cellRandom(column, row, 11) - 0.5) * 0.18),
          );
          const contrast = Math.max(0, Math.min(1, (ditheredLuminance - 0.42) * 1.65 + 0.5));
          const rampIndex = Math.max(
            0,
            Math.min(
              characterRamp.length - 1,
              Math.round(
                (1 - contrast) * (characterRamp.length - 1)
                + (cellRandom(column, row, 29) - 0.5) * 3,
              ),
            ),
          );
          const index = row * columns + column;
          const edgeFeather = Math.min(
            smoothstep((column + 0.5) / (columns * 0.025)),
            smoothstep((columns - column - 0.5) / (columns * 0.025)),
            smoothstep((row + 0.5) / (rows * 0.025)),
            smoothstep((rows - row - 0.5) / (rows * 0.035)),
          );

          glyphs.push({
            index,
            x: (column + 0.5) * cellWidth,
            y: (row + 0.5) * cellHeight,
            char: characterRamp[rampIndex],
            digitSeed: cellRandom(column, row, 43),
            opacity: alpha * (0.58 + (1 - contrast) * 0.42) * edgeFeather,
            offsetX: (cellRandom(column, row, 53) - 0.5) * width * 0.48,
            offsetY: (cellRandom(column, row, 67) - 0.5) * height * 0.36,
            color: closestPhotoColor(
              pixels[pixelIndex],
              pixels[pixelIndex + 1],
              pixels[pixelIndex + 2],
              photoPalette,
            ),
          });
        }
      }

      draw();
      if (reducedMotion.matches) {
        progress = 1;
        progressState.value = 1;
        draw();
      } else if (visible) {
        animateTo(1);
      }
    };

    const animateTo = (target: number) => {
      assemblyTween?.kill();
      assemblyTween = null;
      stopDigitAnimation();
      if (reducedMotion.matches) {
        progress = target;
        progressState.value = target;
        draw();
        return;
      }
      if (progress === target) {
        if (target === 1) startDigitAnimation();
        return;
      }

      progressState.value = progress;
      assemblyTween = gsap.to(progressState, {
        value: target,
        duration: animationDuration / 1000,
        ease: 'power3.out',
        onUpdate: () => {
          if (disposed) return;
          progress = progressState.value;
          draw();
        },
        onComplete: () => {
          progress = target;
          draw();
          assemblyTween = null;
          if (target === 1) startDigitAnimation();
        },
      });
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
        assemblyTween?.kill();
        assemblyTween = null;
        stopDigitAnimation();
        progress = 1;
        progressState.value = 1;
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
      assemblyTween?.kill();
      stopDigitAnimation();
      observer.disconnect();
      resizeObserver.disconnect();
      reducedMotion.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, [theme, tokens.accent, tokens.accentAlt, tokens.accentHighlight, tokens.contentBg, tokens.contentPrimary]);

  return (
    <figure
      ref={containerRef}
      className="relative block aspect-[9/10] w-full overflow-visible"
      aria-label="ASCII portrait of Arya Bagus Permono"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="ASCII portrait of Arya Bagus Permono"
      >
        ASCII portrait of Arya Bagus Permono
      </canvas>
      <div className="portrait-title-blur" aria-hidden="true" />
    </figure>
  );
}
