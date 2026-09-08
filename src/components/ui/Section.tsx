import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  container?: boolean;
  borderBottom?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, container = true, borderBottom = false, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'py-16 md:py-24',
          borderBottom && 'border-b border-mecha-light1',
          className
        )}
        {...props}
      >
        {container ? (
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';
