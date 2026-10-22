import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

interface ModulePanelHeaderProps {
  moduleNumber: string; // e.g. "MODULE.001 //"
  title: string;        // e.g. "ABOUT"
  description?: string; // Formal description
  theme?: 'dark' | 'light';
  children?: React.ReactNode;
}

export function ModulePanelHeader({
  moduleNumber,
  title,
  description,
  theme = 'dark',
  children,
}: ModulePanelHeaderProps) {
  const isDark = theme === 'dark';
  const { tokens } = useTheme();

  return (
    <div
      className={cn(
        'w-full border-b transition-colors',
        isDark
          ? 'bg-mecha-black border-mecha-dark3 text-mecha-white'
          : 'bg-mecha-white border-mecha-light1 text-mecha-black'
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[140px] md:min-h-[170px]">
        {/* ── Left Title Box with Chamfer Notch ── */}
        <div
          className={cn(
            'lg:col-span-7 xl:col-span-8 p-6 md:p-10 flex flex-col justify-center relative border-b lg:border-b-0 lg:border-r',
            isDark
              ? 'border-mecha-dark3 bg-mecha-black'
              : 'border-mecha-light1 bg-mecha-white'
          )}
        >
          {/* Subtle top-right angled corner notch */}
          <div
            className={cn(
              'absolute top-0 right-0 w-6 h-6 border-l border-b pointer-events-none hidden md:block',
              isDark ? 'border-mecha-dark3' : 'border-mecha-light1'
            )}
          />

          <div className="flex items-center gap-2.5 mb-3">
            <span
              className={cn(
                'w-2 h-2 inline-block',
                isDark ? 'bg-mecha-white' : ''
              )}
              style={!isDark ? { backgroundColor: tokens.contentPrimary } : undefined}
            />
            <span
              className={cn(
                'font-mono text-xs md:text-sm tracking-[0.22em] uppercase font-medium',
                isDark ? 'text-neutral-400' : 'text-neutral-500'
              )}
              style={!isDark ? { color: tokens.contentPrimary } : undefined}
            >
              {moduleNumber}
            </span>
          </div>

          <h1
            className={cn(
              'font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-[0.06em] uppercase m-0 leading-none select-none',
              isDark ? 'text-mecha-white' : 'text-mecha-black'
            )}
            style={!isDark ? { color: tokens.contentPrimary } : undefined}
          >
            {title}
          </h1>
        </div>

        {/* ── Right Description Box ── */}
        <div
          className={cn(
            'lg:col-span-5 xl:col-span-4 p-6 md:p-8 flex flex-col justify-center',
            isDark ? 'bg-mecha-dark1' : 'bg-mecha-light2'
          )}
        >
          {description && (
            <p
              className={cn(
                'font-mono text-xs md:text-sm leading-relaxed tracking-wider uppercase font-medium m-0',
                isDark ? 'text-neutral-300' : 'text-neutral-700'
              )}
              style={!isDark ? { color: tokens.contentPrimary } : undefined}
            >
              {description}
            </p>
          )}

          {children && (
            <div className="mt-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
