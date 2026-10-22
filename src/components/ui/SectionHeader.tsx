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
    <FadeIn className={cn("mb-12 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6", className)}>
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div
            className={cn(
            "font-mono text-xs tracking-widest uppercase",
            dark ? "text-mecha-light1" : "theme-accent-text"
            )}
            style={!dark ? { color: tokens.contentPrimary } : undefined}
          >
            {number}
          </div>
          <div className={cn(
            "w-12 h-px",
            dark ? "bg-mecha-dark3" : "bg-mecha-light1"
          )}></div>
          <h2 className={cn(
            "text-sm font-mono tracking-widest m-0",
            dark ? "text-mecha-light1" : "theme-accent-text"
          )}>
            // {label}
          </h2>
        </div>
        {title && (
          <h3 className={cn(
            "text-3xl md:text-4xl font-extrabold tracking-tight",
            dark ? "" : "theme-accent-text"
          )}
            style={{ color: dark ? tokens.accent : tokens.contentPrimary }}
          >
            {title}
          </h3>
        )}
      </div>
      {children && (
        <div className="flex-shrink-0">
          {children}
        </div>
      )}
    </FadeIn>
  );
}
