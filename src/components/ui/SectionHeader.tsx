import { FadeIn } from './FadeIn';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

interface SectionHeaderProps {
  number: string;
  label: string;
  title?: string;
  className?: string;
  dark?: boolean;
  children?: React.ReactNode;
}

export function SectionHeader({ number, label, title, className, dark = false, children }: SectionHeaderProps) {
  const { tokens } = useTheme();

  return (
    <FadeIn className={cn('editorial-section-header relative z-10 mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end', className)}>
      <div className="min-w-0">
        <div className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4">
          <span
            className="editorial-index"
            style={{ color: dark ? tokens.accent : tokens.contentPrimary }}
          >
            {number}
          </span>
          <span className={cn('h-px w-8 sm:w-12', dark ? 'bg-mecha-dark3' : 'bg-mecha-light1')} />
          <span className={cn('font-mono text-[10px] tracking-[0.2em] uppercase sm:text-xs', dark ? 'text-mecha-light1' : 'theme-accent-text')}>
            // {label}
          </span>
        </div>
        {title && (
          <h2
            className="m-0 max-w-4xl font-display text-3xl font-bold leading-[0.98] tracking-[-0.035em] uppercase sm:text-4xl md:text-5xl"
            style={{ color: dark ? tokens.accent : tokens.contentPrimary }}
          >
            {title}
          </h2>
        )}
      </div>
      {children && (
        <div className="shrink-0">
          {children}
        </div>
      )}
    </FadeIn>
  );
}
