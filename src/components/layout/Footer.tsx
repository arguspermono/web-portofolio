import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-mecha-black text-mecha-white border-t border-mecha-dark3 relative overflow-hidden mt-auto print:hidden">
      {/* Decorative corner notch */}
      <div className="absolute top-0 right-0 w-24 h-24 border-l border-b border-mecha-dark3 opacity-30 pointer-events-none" />

      <div className="px-6 md:px-12 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/assets/img/argus-logo.jpg"
                alt="ARGUS logo"
                className="w-9 h-9 object-cover border border-neutral-700 group-hover:border-white transition-colors"
              />
              <div>
                <div className="font-display font-extrabold text-base tracking-[0.25em] uppercase text-white leading-none">
                  ARGUS
                </div>
                <div className="font-mono text-[9px] tracking-[0.2em] text-neutral-400 uppercase mt-1">
                  ARYA BAGUS // MULTIMEDIA TECH
                </div>
              </div>
            </Link>
            <p className="font-mono text-xs text-neutral-300 tracking-wider uppercase">
              BUILDING DIGITAL EXPERIENCES THROUGH CODE &amp; CREATIVITY.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <div className="flex gap-5 text-neutral-400">
              <a
                href={import.meta.env.VITE_GITHUB || 'https://github.com/arguspermono'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors text-lg"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href={import.meta.env.VITE_LINKEDIN || 'https://www.linkedin.com/in/arya-bagus/'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors text-lg"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href={`mailto:${import.meta.env.VITE_EMAIL || 'aryabaguspermono@gmail.com'}`}
                className="hover:text-white transition-colors text-lg"
                title="Email"
              >
                <FaEnvelope />
              </a>
            </div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-neutral-400 uppercase">
              BASE // SURABAYA, ID • EST. 2026
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-mecha-dark3 flex flex-col md:flex-row justify-between items-center gap-3 font-mono text-[10px] text-neutral-400 tracking-[0.2em] uppercase">
          <div>&copy; {new Date().getFullYear()} ARYA BAGUS PERMONO. ALL RIGHTS RESERVED.</div>
          <div>SYSTEM ARCHITECTURE // GUNDAM EDITORIAL UI</div>
        </div>
      </div>
    </footer>
  );
}
