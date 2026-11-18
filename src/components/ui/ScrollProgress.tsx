import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { tokens } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none"
      style={{ backgroundColor: `color-mix(in srgb, ${tokens.accent} 24%, transparent)` }}
    >
      <div
        className="h-full transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress}%`, backgroundColor: tokens.accent }}
      />
    </div>
  );
}
