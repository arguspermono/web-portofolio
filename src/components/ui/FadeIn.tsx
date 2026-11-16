import { type ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  onClick?: () => void;
  ariaLabel?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const FadeIn = ({
  children,
  className = '',
  onClick,
  ariaLabel,
  onMouseEnter,
  onMouseLeave,
}: FadeInProps) => {
  return (
    <div
      className={`${className}${onClick ? ' focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--content-primary)]' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      onKeyDown={onClick ? (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      } : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};
