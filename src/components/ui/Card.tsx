import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'neo-card relative p-6 sm:p-8 transition-colors duration-300 group',
          hoverEffect && 'hover:border-mecha-dark2',
          className
        )}
        {...props}
      >
        <div>
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';
