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
      <div className="editorial-container">
        <div className="grid min-h-[140px] grid-cols-1 border-x border-[var(--content-border)] md:min-h-[170px] lg:grid-cols-12">
          <div
            className={cn(
              'relative flex flex-col justify-center border-b p-6 md:p-10 lg:col-span-7 lg:border-b-0 lg:border-r xl:col-span-8',
              isDark
                ? 'border-mecha-dark3 bg-mecha-black'
                : 'border-mecha-light1 bg-mecha-white'
            )}
          >
            <div
              className={cn(
                'pointer-events-none absolute right-0 top-0 hidden h-6 w-6 border-b border-l md:block',
                isDark ? 'border-mecha-dark3' : 'border-mecha-light1'
              )}
            />

            <div className="mb-3 flex items-center gap-2.5">
              <span
                className={cn('inline-block h-2 w-2', isDark ? 'bg-mecha-white' : '')}
                style={!isDark ? { backgroundColor: tokens.contentPrimary } : undefined}
              />
              <span
                className={cn(
                  'font-mono text-xs font-medium uppercase tracking-[0.22em] md:text-sm',
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                )}
                style={!isDark ? { color: tokens.contentPrimary } : undefined}
              >
                {moduleNumber}
              </span>
            </div>

            <h1
              className={cn(
                'm-0 select-none font-display text-3xl font-bold uppercase leading-none tracking-[0.06em] sm:text-5xl md:text-6xl',
                isDark ? 'text-mecha-white' : 'text-mecha-black'
              )}
              style={!isDark ? { color: tokens.contentPrimary } : undefined}
            >
              {title}
            </h1>
          </div>

          <div
            className={cn(
              'flex flex-col justify-center p-6 md:p-8 lg:col-span-5 xl:col-span-4',
              isDark ? 'bg-mecha-dark1' : 'bg-mecha-light2'
            )}
          >
            {description && (
              <p
                className={cn(
                  'm-0 font-mono text-xs font-medium uppercase leading-relaxed tracking-wider md:text-sm',
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
    </div>
  );
}
