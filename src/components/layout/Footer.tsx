import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ArgusLogo } from '../ui/ArgusLogo';
import { useTheme } from '../../context/ThemeContext';

export function Footer() {
  const { tokens } = useTheme();

  return (
    <footer
      className="site-footer relative mt-auto overflow-hidden border-t print:hidden"
      style={{
        backgroundColor: tokens.sidebar,
        color: tokens.sidebarText,
        borderColor: tokens.sidebarBorder,
      }}
    >
      <div className="editorial-container relative z-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <Link to="/">
              <ArgusLogo size="md" />
            </Link>
            <p className="site-footer-muted font-mono text-xs tracking-wider uppercase">
              BUILDING DIGITAL EXPERIENCES THROUGH CODE &amp; CREATIVITY.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <div className="site-footer-muted flex gap-5">
              <a
                href={import.meta.env.VITE_GITHUB || 'https://github.com/arguspermono'}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-lg"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href={import.meta.env.VITE_LINKEDIN || 'https://www.linkedin.com/in/arya-bagus/'}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-lg"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href={`mailto:${import.meta.env.VITE_EMAIL || 'aryabaguspermono@gmail.com'}`}
                className="transition-colors text-lg"
                title="Email"
              >
                <FaEnvelope />
              </a>
            </div>
            <div className="site-footer-muted font-mono text-[9px] tracking-[0.2em] uppercase">
              BASE // SURABAYA, ID • EST. 2026
            </div>
          </div>
        </div>

        <div
          className="site-footer-muted mt-8 flex flex-col items-center justify-between gap-3 border-t pt-6 font-mono text-[10px] tracking-[0.2em] uppercase md:flex-row"
          style={{ borderColor: tokens.sidebarBorder }}
        >
          <div>&copy; {new Date().getFullYear()} ARYA BAGUS PERMONO. ALL RIGHTS RESERVED.</div>
          {/* <div>SYSTEM ARCHITECTURE // GUNDAM EDITORIAL UI</div> */}
        </div>
      </div>
    </footer>
  );
}
