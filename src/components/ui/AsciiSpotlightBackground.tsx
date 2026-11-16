import { useEffect, useRef } from 'react';

const CELL_SIZE = 20;
const SPOTLIGHT_RADIUS = 100;

export function AsciiSpotlightBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) {
      throw new Error('Unable to initialize the ASCII background canvas.');
    }

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let pointerX = -SPOTLIGHT_RADIUS * 2;
    let pointerY = -SPOTLIGHT_RADIUS * 2;
    let animationFrame = 0;

    const draw = () => {
      animationFrame = 0;
      context.clearRect(0, 0, width, height);
      context.font = '12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--content-highlight')
        .trim();
      const color = /^#[\da-f]{6}$/i.test(accent) ? accent : '#52525b';
      const red = Number.parseInt(color.slice(1, 3), 16);
      const green = Number.parseInt(color.slice(3, 5), 16);
      const blue = Number.parseInt(color.slice(5, 7), 16);

      for (let y = CELL_SIZE / 2; y < height; y += CELL_SIZE) {
        for (let x = CELL_SIZE / 2; x < width; x += CELL_SIZE) {
          const distance = Math.hypot(x - pointerX, y - pointerY);
          const proximity = Math.max(0, 1 - distance / SPOTLIGHT_RADIUS);
          const alpha = 0.1 + proximity * 0.45;
          context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
          context.fillText('+', x, y);
        }
      }
    };

    const scheduleDraw = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      scheduleDraw();
    };

    const trackPointer = (event: MouseEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      scheduleDraw();
    };

    const trackSpotlight = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const panel = event.target.closest<HTMLElement>('.ascii-spotlight, .neo-card, .neo-dialog');
      if (!panel) return;
      const bounds = panel.getBoundingClientRect();
      panel.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`);
      panel.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`);
    };

    const clearSpotlight = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const panel = event.target.closest<HTMLElement>('.ascii-spotlight, .neo-card, .neo-dialog');
      if (!panel || (event.relatedTarget instanceof Node && panel.contains(event.relatedTarget))) return;
      panel.style.removeProperty('--mouse-x');
      panel.style.removeProperty('--mouse-y');
    };

    resize();
    const themeObserver = new MutationObserver(scheduleDraw);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', trackPointer, { passive: true });
    document.addEventListener('pointermove', trackSpotlight, { passive: true });
    document.addEventListener('pointerout', clearSpotlight);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', trackPointer);
      themeObserver.disconnect();
      document.removeEventListener('pointermove', trackSpotlight);
      document.removeEventListener('pointerout', clearSpotlight);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ascii-background"
      aria-hidden="true"
    />
  );
}
