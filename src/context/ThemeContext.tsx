import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type GundamTheme =
  | 'default'
  | 'efsf'
  | 'neoZeon'
  | 'mafty'
  | 'celestialBeing'
  | 'tekkadan'
  | 'gjallarhorn';

export interface ThemeTokens {
  id: GundamTheme;
  name: string;
  code: string;
  designation: string;
  // Colors ordered by dominance:
  palette: string[];
  wordmarkPrimary: string;
  wordmarkSecondary: string;
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
    wordmarkPrimary: '#0B0B0E',
    wordmarkSecondary: '#71717A',
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

  // ── Theme 1: EFSF ────────────────────────────────────────
  // Dominance order: Putih -> Biru -> Merah -> Kuning
  efsf: {
    id: 'efsf',
    name: 'RX-78-2 GUNDAM',
    code: 'E.F.S.F.',
    designation: 'WHITE DEVIL',
    palette: ['#FFFFFF', '#1B365D', '#DC2626', '#F59E0B'],
    wordmarkPrimary: '#1B365D',
    wordmarkSecondary: '#F59E0B',
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
    contentHighlight: '#FFCB3D',
    contentText: '#0F172A',
    logoVariant: 'light',
  },

  // ── Theme 2: Neo Zeon ────────────────────────────────────────────
  // Dominance order: Merah -> Hitam -> Kuning/Emas
  neoZeon: {
    id: 'neoZeon',
    name: 'MSN-06S SINANJU',
    code: 'NEO ZEON',
    designation: 'RED COMET REBORN',
    palette: ['#991B1B', '#111113', '#D4AF37'],
    wordmarkPrimary: '#991B1B',
    wordmarkSecondary: '#D4AF37',
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
    contentHighlight: '#FFCB3D',
    contentText: '#18181B',
    logoVariant: 'light',
  },

  // -- Theme 3: Mafty -----------------------------------------------------
  mafty: {
    id: 'mafty',
    name: 'MAFTY',
    code: 'MAFTY',
    designation: 'MANHUNT MOVEMENT',
    palette: ['#F58220', '#F8FAFC', '#171717'],
    wordmarkPrimary: '#F58220',
    wordmarkSecondary: '#171717',
    sidebar: '#171717',
    sidebarText: '#F8FAFC',
    sidebarBorder: '#3F3F46',
    activeNav: '#262626',
    activeNavBorder: '#F58220',
    accent: '#F58220',
    accentAlt: '#F8FAFC',
    accentHighlight: '#D76D12',
    contentBg: '#F8F8F7',
    contentSubtleBg: '#F1F1EF',
    contentBorder: '#D8D8D5',
    contentPrimary: '#171717',
    contentHighlight: '#D87416',
    contentText: '#1A1A1A',
    logoVariant: 'light',
  },

  // -- Theme 4: Celestial Being ------------------------------------------
  celestialBeing: {
    id: 'celestialBeing',
    name: 'CELESTIAL BEING',
    code: 'CELESTIAL BEING',
    designation: 'GUNDAM MEISTERS',
    palette: ['#EBCB32', '#4F5D95', '#F8F9FC', '#20233A'],
    wordmarkPrimary: '#EBCB32',
    wordmarkSecondary: '#4F5D95',
    sidebar: '#20233A',
    sidebarText: '#F8F9FC',
    sidebarBorder: '#40496C',
    activeNav: '#343A5A',
    activeNavBorder: '#EBCB32',
    accent: '#EBCB32',
    accentAlt: '#4F5D95',
    accentHighlight: '#DAAC24',
    contentBg: '#F6F7FB',
    contentSubtleBg: '#EFF1F9',
    contentBorder: '#C9CEE0',
    contentPrimary: '#26335E',
    contentHighlight: '#C6A62A',
    contentText: '#20233A',
    logoVariant: 'light',
  },

  // -- Theme 5: Tekkadan --------------------------------------------------
  tekkadan: {
    id: 'tekkadan',
    name: 'TEKKADAN',
    code: 'TEKKADAN',
    designation: 'IRON-BLOODED ORPHANS',
    palette: ['#E50922', '#171717', '#F7F7F7'],
    wordmarkPrimary: '#E50922',
    wordmarkSecondary: '#171717',
    sidebar: '#171717',
    sidebarText: '#F7F7F7',
    sidebarBorder: '#3F3F46',
    activeNav: '#2A2A2A',
    activeNavBorder: '#E50922',
    accent: '#E50922',
    accentAlt: '#F7F7F7',
    accentHighlight: '#BD0C20',
    contentBg: '#F7F7F7',
    contentSubtleBg: '#EEEEEE',
    contentBorder: '#D4D4D4',
    contentPrimary: '#171717',
    contentHighlight: '#D70F27',
    contentText: '#202020',
    logoVariant: 'light',
  },

  // -- Theme 6: Gjallarhorn ----------------------------------------------
  gjallarhorn: {
    id: 'gjallarhorn',
    name: 'GJALLARHORN',
    code: 'GJALLARHORN',
    designation: 'INNER SPHERE',
    palette: ['#F5F3ED', '#243248', '#A7373F', '#C5A565'],
    wordmarkPrimary: '#243248',
    wordmarkSecondary: '#C5A565',
    sidebar: '#1E2A3D',
    sidebarText: '#F9F6EE',
    sidebarBorder: '#465267',
    activeNav: '#293A53',
    activeNavBorder: '#C5A565',
    accent: '#C5A565',
    accentAlt: '#9F3039',
    accentHighlight: '#D0B46F',
    contentBg: '#FAF8F2',
    contentSubtleBg: '#F1EFE8',
    contentBorder: '#D8D2C5',
    contentPrimary: '#243248',
    contentHighlight: '#A77D34',
    contentText: '#253044',
    logoVariant: 'light',
  },
};

export const THEME_ORDER: GundamTheme[] = [
  'default',
  'efsf',
  'neoZeon',
  'mafty',
  'celestialBeing',
  'tekkadan',
  'gjallarhorn',
];

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
    root.style.setProperty('--content-subtle-bg', tokens.contentSubtleBg);
    root.style.setProperty('--content-border', tokens.contentBorder);
    root.style.setProperty('--content-text', tokens.contentText);
    root.style.setProperty('--content-primary', tokens.contentPrimary);
    root.style.setProperty('--content-highlight', tokens.contentHighlight);
    root.style.setProperty('--content-accent', tokens.accent);
    root.style.setProperty('--spotlight-color', tokens.contentHighlight);
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
