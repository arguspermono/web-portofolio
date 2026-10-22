import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type GundamTheme = 'default' | 'rx78' | 'sinanju';

export interface ThemeTokens {
  id: GundamTheme;
  name: string;
  code: string;
  designation: string;
  // Colors ordered by dominance:
  palette: string[];
  sidebar: string;
  sidebarText: string;
  sidebarBorder: string;
  activeNav: string;
  activeNavBorder: string;
  accent: string;        // Primary accent
  accentAlt: string;     // Secondary accent
  accentHighlight: string; // Tertiary highlight
  contentBg: string;
  contentSubtleBg: string;
  contentBorder: string;
  contentPrimary: string;
  contentHighlight: string;
  contentText: string;
  logoVariant: 'light' | 'dark';
}

export const GUNDAM_THEMES: Record<GundamTheme, ThemeTokens> = {
  // ── Theme 0: Technical Monochrome ──────────────────────────────────────
  default: {
    id: 'default',
    name: 'MONOCHROME',
    code: 'MONOCHROME',
    designation: 'PROTOTYPE UNIT',
    palette: ['#FFFFFF', '#0B0B0E', '#71717A'],
    sidebar: '#0B0B0E',
    sidebarText: '#FFFFFF',
    sidebarBorder: '#27272A',
    activeNav: '#18181B',
    activeNavBorder: '#FFFFFF',
    accent: '#FFFFFF',
    accentAlt: '#71717A',
    accentHighlight: '#E4E4E7',
    contentBg: '#F4F4F5',
    contentSubtleBg: '#F4F4F5',
    contentBorder: '#D4D4D8',
    contentPrimary: '#0B0B0E',
    contentHighlight: '#52525B',
    contentText: '#0B0B0E',
    logoVariant: 'light',
  },

  // ── Theme 1: RX-78-2 Federation ────────────────────────────────────────
  // Dominance order: Putih -> Biru -> Merah -> Kuning
  rx78: {
    id: 'rx78',
    name: 'RX-78-2 GUNDAM',
    code: 'E.F.S.F.',
    designation: 'WHITE DEVIL',
    palette: ['#FFFFFF', '#1B365D', '#DC2626', '#F59E0B'],
    sidebar: '#122340',
    sidebarText: '#F8FAFC',
    sidebarBorder: '#1E3A8A',
    activeNav: '#1E3A8A',
    activeNavBorder: '#F59E0B',
    accent: '#F59E0B',        // V-Fin Yellow
    accentAlt: '#DC2626',     // Torso Signal Red
    accentHighlight: '#3B82F6', // Shield Blue
    contentBg: '#F1F5F9',
    contentSubtleBg: '#EAF0F7',
    contentBorder: '#CBD5E1',
    contentPrimary: '#1B365D',
    contentHighlight: '#F59E0B',
    contentText: '#0F172A',
    logoVariant: 'light',
  },

  // ── Theme 2: Sinanju / Zeon ────────────────────────────────────────────
  // Dominance order: Merah -> Hitam -> Kuning/Emas
  sinanju: {
    id: 'sinanju',
    name: 'MSN-06S SINANJU',
    code: 'NEO ZEON',
    designation: 'RED COMET REBORN',
    palette: ['#991B1B', '#111113', '#D4AF37'],
    sidebar: '#771616',
    sidebarText: '#FEF3C7',
    sidebarBorder: '#991B1B',
    activeNav: '#991B1B',
    activeNavBorder: '#D4AF37',
    accent: '#D4AF37',        // Sleeves Imperial Gold
    accentAlt: '#111113',     // Frame Matte Black
    accentHighlight: '#EF4444', // Thruster Crimson
    contentBg: '#FFF7ED',
    contentSubtleBg: '#FEF2E2',
    contentBorder: '#FECACA',
    contentPrimary: '#771616',
    contentHighlight: '#D4AF37',
    contentText: '#18181B',
    logoVariant: 'light',
  },
};

export const THEME_ORDER: GundamTheme[] = ['default', 'rx78', 'sinanju'];

interface ThemeContextValue {
  theme: GundamTheme;
  tokens: ThemeTokens;
  cycleTheme: () => void;
  setTheme: (t: GundamTheme) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'default',
  tokens: GUNDAM_THEMES.default,
  cycleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<GundamTheme>(() => {
    try {
      const saved = localStorage.getItem('argus_gundam_theme');
      if (saved && saved in GUNDAM_THEMES) {
        return saved as GundamTheme;
      }
    } catch {
      // Local storage not available
    }
    return 'default';
  });

  const tokens = GUNDAM_THEMES[theme];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--sidebar-bg', tokens.sidebar);
    root.style.setProperty('--sidebar-text', tokens.sidebarText);
    root.style.setProperty('--sidebar-border', tokens.sidebarBorder);
    root.style.setProperty('--accent-primary', tokens.accent);
    root.style.setProperty('--accent-alt', tokens.accentAlt);
    root.style.setProperty('--accent-highlight', tokens.accentHighlight);
    root.style.setProperty('--content-bg', tokens.contentBg);
    root.style.setProperty('--content-text', tokens.contentText);
    root.style.setProperty('--content-primary', tokens.contentPrimary);
    root.style.setProperty('--content-highlight', tokens.contentHighlight);
    root.style.setProperty('--content-accent', tokens.accent);
    root.setAttribute('data-theme', theme);
  }, [theme, tokens]);

  const setTheme = (t: GundamTheme) => {
    setThemeState(t);
    try {
      localStorage.setItem('argus_gundam_theme', t);
    } catch {
      // ignore
    }
  };

  const cycleTheme = () => {
    const currentIndex = THEME_ORDER.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
    setTheme(THEME_ORDER[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, tokens, cycleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
