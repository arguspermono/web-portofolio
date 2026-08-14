import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-bold tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mecha-blue disabled:opacity-50 disabled:pointer-events-none active:translate-y-0 active:translate-x-0 active:shadow-none',
          {
            'bg-mecha-dark text-white border-2 border-mecha-dark shadow-hard hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_#2563EB]': variant === 'primary',
            'bg-transparent text-mecha-dark border-2 border-mecha-dark shadow-hard hover:-translate-y-1 hover:-translate-x-1 hover:bg-zinc-100': variant === 'secondary',
            'bg-mecha-red text-white border-2 border-mecha-red shadow-[4px_4px_0px_0px_#18181B] hover:-translate-y-1 hover:-translate-x-1': variant === 'danger',
            'px-4 py-2 text-xs': size === 'sm',
            'px-6 py-3 text-sm': size === 'md',
            'px-8 py-4 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
