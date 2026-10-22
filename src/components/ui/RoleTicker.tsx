import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const roles = [
  'MULTIMEDIA ENGINEERING TECHNOLOGIST',
  'FULL-STACK WEB & MOBILE DEVELOPER',
  '3D & INTERACTIVE MULTIMEDIA ARTIST',
  'TEAM LEADER // EEPIS NEWS & NETWORK TEAM',
];

export function RoleTicker() {
  const { tokens } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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
  }, [displayText, isDeleting, roleIndex]);

  return (
    <div
      className="inline-flex items-center gap-2 border px-3 py-1 font-mono text-[11px] sm:text-xs tracking-wider uppercase text-white"
      style={{
        backgroundColor: tokens.contentPrimary,
        borderColor: tokens.contentPrimary,
      }}
    >
      <span className="font-bold" style={{ color: tokens.accentHighlight }}>&gt;</span>
      <span className="font-semibold">{displayText}</span>
      <span
        className="inline-block w-2 h-3.5 animate-pulse"
        style={{ backgroundColor: tokens.accent }}
      />
    </div>
  );
}
