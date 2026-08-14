import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent' | 'warning';
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center px-2 py-1 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase border-2',
          {
            'bg-zinc-100 text-mecha-dark border-mecha-dark': variant === 'default',
            'bg-mecha-blue text-white border-mecha-dark': variant === 'accent',
            'bg-mecha-yellow text-mecha-dark border-mecha-dark': variant === 'warning',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
