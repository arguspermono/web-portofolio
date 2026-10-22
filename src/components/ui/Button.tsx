import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const { tokens } = useTheme();

    return (
      <button
        ref={ref}
        className={cn(
          'neo-button inline-flex items-center justify-center font-bold tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--content-primary)] disabled:opacity-50 disabled:pointer-events-none',
          {
            'theme-button-primary border': variant === 'primary',
            'theme-button-secondary border': variant === 'secondary',
            'bg-mecha-light1 text-mecha-dark1 border border-mecha-dark3 hover:border-mecha-black hover:bg-mecha-light2': variant === 'danger',
            'px-4 py-2 text-xs': size === 'sm',
            'px-6 py-3 text-sm': size === 'md',
            'px-8 py-4 text-base': size === 'lg',
          },
          className
        )}
        {...props}
        style={{
          ...(variant === 'primary' ? {
            backgroundColor: tokens.contentPrimary,
            borderColor: tokens.contentPrimary,
            color: '#FFFFFF',
          } : {}),
          ...(variant === 'secondary' ? {
            backgroundColor: 'transparent',
            borderColor: tokens.contentPrimary,
            color: tokens.contentPrimary,
          } : {}),
          ...props.style,
        }}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
