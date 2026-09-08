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
          'inline-flex items-center justify-center font-bold tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mecha-black disabled:opacity-50 disabled:pointer-events-none rounded-none',
          {
            'bg-mecha-black text-mecha-white border border-mecha-black hover:bg-transparent hover:text-mecha-black': variant === 'primary',
            'bg-transparent text-mecha-black border border-mecha-black hover:bg-mecha-black hover:text-mecha-white': variant === 'secondary',
            'bg-mecha-light1 text-mecha-dark1 border border-mecha-dark3 hover:border-mecha-black hover:bg-mecha-light2': variant === 'danger',
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
