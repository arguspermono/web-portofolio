import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, tokens, cycleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={cn(
        'inline-flex w-[132px] items-center justify-between gap-2.5 border px-2.5 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
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
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center"
        style={{ backgroundColor: tokens.activeNav, border: `1px solid ${tokens.accent}66` }}
      >
        {theme === 'default' ? (
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="white"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
          </svg>
        ) : (
          <img
            src={theme === 'rx78' ? '/assets/img/logo/theme/esfs.png' : '/assets/img/logo/theme/zeon.png'}
            alt=""
            aria-hidden="true"
            className="h-7 w-7 object-contain"
          />
        )}
      </span>
      <span className="w-[70px] whitespace-nowrap text-center font-mono text-[9px] font-bold tracking-wider">
        {tokens.code}
      </span>
    </button>
  );
}
