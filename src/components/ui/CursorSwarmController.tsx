import { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import cursorSwarmScriptUrl from 'cursor-swarm/cursor-swarm.js?url';
import { useTheme } from '../../context/ThemeContext';

interface CursorSwarmInstance {
  init(): CursorSwarmInstance;
  refresh(): CursorSwarmInstance;
  stop(options?: { reveal?: boolean }): CursorSwarmInstance;
  destroy(): CursorSwarmInstance;
  setPalette(palette: string | string[]): CursorSwarmInstance;
}

interface CursorSwarmOptions {
  root: HTMLElement;
  cursors: number;
  palette: string[];
  targets: string;
  frames: boolean;
  deconstruct: boolean;
  startPosition: string;
  speed: number;
  adaptiveSpeed: boolean;
  maxSpeed: number;
  trigger: number;
  typeDuration: number;
  hud: boolean;
  labels: boolean;
  marquee: boolean;
  guides: boolean;
  sparks: boolean;
  copyPaste: number;
  relocation: boolean;
  zIndex: number;
  respectReducedMotion: boolean;
}

declare global {
  interface Window {
    CursorSwarm?: new (options: CursorSwarmOptions) => CursorSwarmInstance;
  }
}

let cursorSwarmScriptPromise: Promise<void> | undefined;

function loadCursorSwarmScript() {
  if (window.CursorSwarm) return Promise.resolve();
  if (cursorSwarmScriptPromise) return cursorSwarmScriptPromise;

  cursorSwarmScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = cursorSwarmScriptUrl;
    script.async = true;
    script.onload = () => {
      if (window.CursorSwarm) {
        resolve();
        return;
      }

      cursorSwarmScriptPromise = undefined;
      reject(new Error('CursorSwarm script loaded without exposing its constructor.'));
    };
    script.onerror = () => {
      cursorSwarmScriptPromise = undefined;
      script.remove();
      reject(new Error('Failed to load the CursorSwarm script.'));
    };
    document.head.appendChild(script);
  });

  return cursorSwarmScriptPromise;
}

export function CursorSwarmController() {
  const { pathname } = useLocation();
  const { theme, tokens } = useTheme();
  const swarmRef = useRef<CursorSwarmInstance | null>(null);
  const palette = useMemo(
    () => theme === 'default'
      ? ['#71717A', '#D4D4D8', '#0B0B0E']
      : [tokens.contentPrimary, tokens.contentHighlight, tokens.accentAlt],
    [theme, tokens],
  );
  const paletteRef = useRef(palette);
  paletteRef.current = palette;
  const paletteKey = palette.join(',');

  useEffect(() => {
    let cancelled = false;
    let printing = false;

    const initializeSwarm = () => {
      const root = document.getElementById('portfolio-content');
      const CursorSwarm = window.CursorSwarm;
      if (!root || !CursorSwarm) {
        throw new Error('Unable to initialize CursorSwarm on the portfolio content.');
      }

      swarmRef.current = new CursorSwarm({
        root,
        cursors: 2,
        palette: paletteRef.current,
        targets: 'h1:not(.hero-wordmark), h2, h3, p, a, button, img, video, article, .neo-card, [data-swarm]',
        frames: true,
        deconstruct: true,
        startPosition: 'corners',
        speed: 0.9,
        adaptiveSpeed: true,
        maxSpeed: 3,
        trigger: 0.88,
        typeDuration: 1.1,
        hud: false,
        labels: true,
        marquee: false,
        guides: false,
        sparks: false,
        copyPaste: 0,
        relocation: false,
        zIndex: 49,
        respectReducedMotion: true,
      }).init();
    };

    const handleBeforePrint = () => {
      if (printing) return;
      printing = true;
      swarmRef.current?.stop({ reveal: true });
    };
    const handleAfterPrint = () => {
      if (!printing) return;
      printing = false;
      try {
        initializeSwarm();
      } catch (error: unknown) {
        console.error('CursorSwarm failed to resume after printing.', error);
      }
    };
    const printMedia = window.matchMedia('print');
    const handlePrintMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) handleBeforePrint();
      else handleAfterPrint();
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    printMedia.addEventListener('change', handlePrintMediaChange);

    loadCursorSwarmScript()
      .then(() => {
        if (cancelled) return;
        initializeSwarm();
      })
      .catch((error: unknown) => {
        console.error('CursorSwarm failed to initialize.', error);
      });

    return () => {
      cancelled = true;
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      printMedia.removeEventListener('change', handlePrintMediaChange);
      swarmRef.current?.destroy();
      swarmRef.current = null;
    };
  }, [pathname]);

  useEffect(() => {
    swarmRef.current?.setPalette(palette);
  }, [paletteKey, palette]);

  return null;
}
