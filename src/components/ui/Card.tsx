import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  accentColor?: 'blue' | 'red' | 'yellow' | 'none';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, accentColor = 'blue', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative bg-mecha-panel p-6 sm:p-8 border-2 border-mecha-dark transition-all duration-200',
          hoverEffect && 'hover:-translate-y-1 hover:-translate-x-1 hover:shadow-hard',
          className
        )}
        {...props}
      >
        {/* Mecha Accent Bar */}
        {accentColor !== 'none' && (
          <div className={cn(
            'absolute top-0 left-0 w-full h-2 border-b-2 border-mecha-dark',
            {
              'bg-mecha-blue': accentColor === 'blue',
              'bg-mecha-red': accentColor === 'red',
              'bg-mecha-yellow': accentColor === 'yellow',
            }
          )} />
        )}
        
        {/* Technical Corner Detail */}
        <div className="absolute top-0 right-0 w-4 h-4 border-l-2 border-b-2 border-mecha-dark bg-mecha-light z-10 hidden sm:block" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>

        <div className={cn(accentColor !== 'none' && 'mt-4')}>
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';
