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
          'editorial-section py-[var(--editorial-section-space)]',
          borderBottom && 'border-b border-mecha-light1',
          className
        )}
        {...props}
      >
        {container ? (
          <div className="editorial-container">
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
