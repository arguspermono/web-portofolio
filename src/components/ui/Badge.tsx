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
          'inline-flex items-center px-2 py-1 text-[10px] sm:text-xs font-mono font-medium tracking-widest uppercase border rounded-none',
          {
            'bg-mecha-light2 text-mecha-dark3 border-mecha-light1': variant === 'default',
            'bg-mecha-black text-mecha-white border-mecha-black': variant === 'accent',
            'bg-mecha-light1 text-mecha-black border-mecha-black': variant === 'warning',
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
