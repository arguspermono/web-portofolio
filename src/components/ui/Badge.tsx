import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent' | 'warning';
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const { tokens } = useTheme();

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-1 text-[10px] sm:text-xs font-mono font-medium tracking-widest uppercase border-2 rounded-[8px]',
          {
            'theme-accent-soft': variant === 'default',
            'theme-accent-bg font-semibold': variant === 'accent',
            'bg-mecha-light1 text-mecha-black border-mecha-black font-semibold': variant === 'warning',
          },
          className
        )}
        {...props}
        style={{
          ...(variant === 'accent' ? {
            backgroundColor: tokens.contentPrimary,
            borderColor: tokens.contentPrimary,
          } : {}),
          ...props.style,
        }}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
