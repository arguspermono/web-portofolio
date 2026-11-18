import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const roles = [
  'MULTIMEDIA ENGINEERING TECHNOLOGIST',
  'FULL-STACK WEB & MOBILE DEVELOPER',
  '3D & INTERACTIVE MULTIMEDIA ARTIST',
];

export function RoleTicker() {
  const { tokens } = useTheme();
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setRoleIndex(0);
      setDisplayText(roles[0]);
      setIsDeleting(false);
      return;
    }

    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentRole) {
      // Pause at full word
      timeout = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayText === '') {
      // Move to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      timeout = setTimeout(() => {}, 400);
    } else {
      // Typing or deleting
      const speed = isDeleting ? 30 : 60;
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? currentRole.substring(0, prev.length - 1)
            : currentRole.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, reduceMotion, roleIndex]);

  return (
    <div
      className="inline-flex w-fit max-w-full flex-wrap items-center gap-1 border px-2 py-1 font-mono text-[clamp(0.5rem,2.4vw,0.65rem)] tracking-[0.08em] uppercase text-white sm:gap-2 sm:px-3 sm:text-xs sm:tracking-wider"
      style={{
        backgroundColor: tokens.contentPrimary,
        borderColor: tokens.contentPrimary,
      }}
    >
      <span className="font-bold" style={{ color: '#FFCB3D' }}>&gt;</span>
      <span className="min-w-0 flex-1 whitespace-normal break-words font-semibold">{displayText}</span>
      <span
        className="inline-block w-2 h-3.5 motion-safe:animate-pulse"
        style={{ backgroundColor: '#FFCB3D' }}
      />
    </div>
  );
}
