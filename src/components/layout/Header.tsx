import { useEffect, useState, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaAward, FaFileAlt, FaFolderOpen, FaHome } from 'react-icons/fa';
import { ArgusLogo } from '../ui/ArgusLogo';
import { AudioPlayer } from '../ui/AudioPlayer';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

const pageLinks = [
  { label: 'ABOUT', to: '/#intro', isActive: (path: string) => path === '/' || path === '/about' },
  { label: 'PROJECTS', to: '/projects', isActive: (path: string) => path.startsWith('/projects') },
  { label: 'CERTIFICATES', to: '/certificates', isActive: (path: string) => path === '/certificates' },
];

const mobileNavLinks = [
  { label: 'ABOUT', ariaLabel: 'About', to: '/#intro', Icon: FaHome, isActive: (path: string) => path === '/' || path === '/about' },
  { label: 'PROJECTS', ariaLabel: 'Projects', to: '/projects', Icon: FaFolderOpen, isActive: (path: string) => path.startsWith('/projects') },
  { label: 'CERTS', ariaLabel: 'Certificates', to: '/certificates', Icon: FaAward, isActive: (path: string) => path === '/certificates' },
  { label: 'RESUME', ariaLabel: 'Resume', to: '/resume', Icon: FaFileAlt, isActive: (path: string) => path === '/resume' },
];

const aboutSections = [
  { id: 'intro', label: 'INTRODUCTION' },
  { id: 'background', label: 'BACKGROUND' },
  { id: 'selected-work', label: 'SELECTED WORK' },
  { id: 'process', label: 'BUILD NOTES' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'toolkit', label: 'TOOLKIT' },
  { id: 'certifications', label: 'CERTIFICATIONS' },
  { id: 'contact', label: 'CONTACT' },
];

export function Header() {
  const { pathname } = useLocation();
  const { theme, tokens } = useTheme();
  const [activeSection, setActiveSection] = useState('intro');
  const isAboutRoute = pathname === '/' || pathname === '/about';
  const resumeStyle = theme === 'default'
    ? { backgroundColor: '#FFFFFF', borderColor: '#FFFFFF', color: '#111827' }
    : theme === 'efsf' || theme === 'neoZeon'
      ? { backgroundColor: '#FFCB3D', borderColor: '#FFCB3D', color: '#111827' }
      : { backgroundColor: tokens.activeNav, borderColor: tokens.activeNavBorder, color: tokens.sidebarText };

  useEffect(() => {
    if (!isAboutRoute) return;

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.3;
      const current = aboutSections.find(({ id }) => {
        const section = document.getElementById(id);
        if (!section) return false;
        const bounds = section.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      });
      if (current) setActiveSection(current.id);
    };

    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: '-30% 0px -65% 0px',
    });
    aboutSections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    updateActiveSection();

    return () => observer.disconnect();
  }, [isAboutRoute, pathname]);

  const reloadToIntro = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) return;

    event.preventDefault();
    window.history.replaceState(window.history.state, '', '/#intro');
    window.location.reload();
  };

  return (
    <header
      className="site-header sticky top-0 z-50 border-b print:hidden"
      style={{
        backgroundColor: tokens.sidebar,
        color: tokens.sidebarText,
        borderBottomColor: tokens.accent + '44',
      }}
    >
      <div className="editorial-container !max-w-[1600px] px-4 sm:px-7">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/#intro"
            aria-label="Arya Bagus home"
            onClick={reloadToIntro}
            className="shrink-0"
          >
            <ArgusLogo size="sm" showSubtitle={false} />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {pageLinks.map((item, index) => {
              const active = item.isActive(pathname);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={item.label === 'ABOUT' ? reloadToIntro : undefined}
                  aria-current={active ? 'page' : undefined}
                  className={`site-nav-link ${active ? 'site-nav-link-active' : ''}`}
                >
                  <span className="mr-2 font-mono text-[8px] opacity-45">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/resume"
              aria-current={pathname === '/resume' ? 'page' : undefined}
              className="site-nav-link site-nav-resume"
              style={pathname === '/resume' ? resumeStyle : undefined}
            >
              <span className="mr-2 font-mono text-[8px] opacity-55">04</span>
              RESUME
              <span className="ml-3 font-mono" aria-hidden="true">↗</span>
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <ThemeToggle compact />
            <AudioPlayer compact />
          </div>
        </div>
      </div>

      <nav
        aria-label="Mobile primary navigation"
        className="site-mobile-bottom-nav"
        style={{
          backgroundColor: tokens.sidebar,
          color: tokens.sidebarText,
          borderTopColor: tokens.accent + '44',
        }}
      >
        {mobileNavLinks.map(({ label, ariaLabel, to, Icon, isActive }) => (
          <Link
            key={label}
            to={to}
            onClick={label === 'ABOUT' ? reloadToIntro : undefined}
            aria-label={ariaLabel}
            aria-current={isActive(pathname) ? 'page' : undefined}
            className="site-mobile-bottom-link"
            style={label === 'RESUME' && pathname === '/resume' ? resumeStyle : undefined}
          >
            <Icon aria-hidden="true" className="text-sm" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {isAboutRoute && (
        <nav
          aria-label="About page sections"
          className="site-section-navigation"
        >
          <div className="site-section-index">
            {aboutSections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={activeSection === section.id ? 'location' : undefined}
                aria-label={`${String(index + 1).padStart(2, '0')} ${section.label}`}
                className={`site-section-link ${activeSection === section.id ? 'site-section-link-active' : ''}`}
              >
                <span className="site-section-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="site-section-label">{section.label}</span>
                <span className="site-section-rule" aria-hidden="true" />
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
