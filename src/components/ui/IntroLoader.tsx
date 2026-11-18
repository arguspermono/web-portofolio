import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const introLine = 'PORTFOLIO WEBSITE';

export function IntroLoader() {
  const { tokens } = useTheme();
  const [phase, setPhase] = useState<'typing' | 'leaving' | 'hidden'>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'hidden' : 'typing',
  );
  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('hidden');
      return;
    }

    let position = 0;
    let pauseTimer = 0;
    let exitTimer = 0;
    const typingTimer = window.setInterval(() => {
      position += 1;
      setTypedLength(position);

      if (position >= introLine.length) {
        window.clearInterval(typingTimer);
        pauseTimer = window.setTimeout(() => {
          setPhase('leaving');
          exitTimer = window.setTimeout(() => setPhase('hidden'), 420);
        }, 900);
      }
    }, 64);

    return () => {
      window.clearInterval(typingTimer);
      window.clearTimeout(pauseTimer);
      window.clearTimeout(exitTimer);
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div
      className={`intro-loader ${phase === 'leaving' ? 'intro-loader-leaving' : ''}`}
      aria-hidden="true"
    >
      <div className="intro-loader-content">
        <div className="intro-loader-logo">
          <img
            src={tokens.logoVariant === 'light' ? '/assets/img/logo/logo-w.png' : '/assets/img/logo/logo-b.png'}
            alt="Argus logo"
            draggable={false}
          />
        </div>
        <span className="intro-loader-eyebrow">ARYA BAGUS PERMONO</span>
        <div className="intro-loader-line">
          {introLine.slice(0, typedLength)}
          <span className="intro-loader-caret" />
        </div>
        <div className="intro-loader-track">
          <span style={{ width: `${(typedLength / introLine.length) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
