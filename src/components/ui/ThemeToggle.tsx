import { useTheme, type GundamTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

const themeLogos: Partial<Record<GundamTheme, string>> = {
  efsf: '/assets/img/logo/theme/esfs.png',
  neoZeon: '/assets/img/logo/theme/zeon.png',
  mafty: '/assets/img/logo/theme/mafty.png',
  celestialBeing: '/assets/img/logo/theme/celestial_being.png',
  tekkadan: '/assets/img/logo/theme/tekkadan.png',
  gjallarhorn: '/assets/img/logo/theme/gjallarhorn.png',
};

const themeMarks: Partial<Record<GundamTheme, string>> = {
  gjallarhorn: 'GH',
};

interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
}

export function ThemeToggle({ className, compact = false }: ThemeToggleProps) {
  const { theme, tokens, cycleTheme } = useTheme();
  const themeLogo = themeLogos[theme];

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={cn(
        'inline-flex items-center border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        compact ? 'h-9 w-9 justify-center p-0' : 'h-12 w-[190px] max-w-full justify-between gap-2 px-2.5 py-1.5',
        className
      )}
      style={{
        borderColor: tokens.accent + '66',
        backgroundColor: tokens.sidebar,
        color: tokens.sidebarText,
        outlineColor: tokens.accent,
      }}
      title={`Current Gundam theme: ${tokens.name}. Click to switch palette.`}
      aria-label={`Switch Gundam theme. Current theme: ${tokens.name}`}
    >
      <span className={cn(
        'flex shrink-0 items-center justify-center',
        compact ? 'h-5 w-5' : 'h-8 w-8 sm:h-9 sm:w-9'
      )}>
        {theme === 'default' ? (
          <svg
            viewBox="0 0 24 24"
            className={compact ? 'h-5 w-5' : 'h-5 w-5 sm:h-6 sm:w-6'}
            fill="none"
            stroke="white"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
          </svg>
        ) : themeLogo ? (
          <img
            src={themeLogo}
            alt=""
            aria-hidden="true"
            className={compact ? 'h-5 w-5 object-contain' : 'h-8 w-8 object-contain sm:h-9 sm:w-9'}
          />
        ) : (
          <span
            className={cn(
              'font-mono font-black leading-none tracking-tight',
              compact ? 'text-[10px]' : 'text-xs',
            )}
            aria-hidden="true"
            style={{ color: tokens.accent }}
          >
            {themeMarks[theme]}
          </span>
        )}
      </span>
      {!compact && (
        <span className="min-w-0 flex-1 text-center font-mono text-[9px] font-bold leading-tight tracking-[0.08em] break-words">
          {tokens.code}
        </span>
      )}
    </button>
  );
}
