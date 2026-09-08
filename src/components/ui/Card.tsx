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
          'relative bg-mecha-white p-6 sm:p-8 border border-mecha-light1 transition-colors duration-300 group',
          hoverEffect && 'hover:border-mecha-dark2',
          className
        )}
        {...props}
      >
        {/* Technical Corner Cut Detail (Subtle) */}
        <div className="absolute top-0 right-0 w-4 h-4 overflow-hidden pointer-events-none">
          <div className="absolute top-[-8px] right-[-8px] w-4 h-4 border border-mecha-light1 transform rotate-45 group-hover:border-mecha-dark2 transition-colors duration-300"></div>
        </div>
        
        {/* Tiny grid dot accent */}
        <div className="absolute bottom-2 right-2 w-1 h-1 bg-mecha-light1 group-hover:bg-mecha-dark2 transition-colors duration-300"></div>

        <div>
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';
