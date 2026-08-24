import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.4,
  className = '',
  direction = 'up',
}: FadeInProps) => {
  const prefersReducedMotion = useReducedMotion();

  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
    none: { x: 0, y: 0 },
  };

  // If user prefers reduced motion, just do a simple opacity fade with no movement
  const initial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, ...directions[direction] };

  const animate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: prefersReducedMotion ? 0.15 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0, 0.55, 0.45, 1], // Mechanical snappy easing from design system
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
