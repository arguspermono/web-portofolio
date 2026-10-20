import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

interface NavItem {
  id: string;
  name: string;
  to: string;
  serial: string;
  isActive: (pathname: string) => boolean;
}

const navItems: NavItem[] = [
  {
    id: 'about',
    name: 'ABOUT',
    to: '/about',
    serial: '01',
    isActive: (pathname: string) => pathname === '/' || pathname === '/about',
  },
  {
    id: 'projects',
    name: 'PROJECTS',
    to: '/projects',
    serial: '02',
    isActive: (pathname: string) => pathname.startsWith('/projects'),
  },
  {
    id: 'certificates',
    name: 'CERTIFICATES',
    to: '/certificates',
    serial: '03',
    isActive: (pathname: string) => pathname === '/certificates' || pathname === '/achievements',
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {/* ─── Mobile Top Bar ──────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-mecha-black border-b border-mecha-dark3 flex items-center justify-between px-5 lg:hidden print:hidden">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/img/argus-logo.jpg"
            alt="ARGUS Logo"
            className="w-8 h-8 object-cover border border-mecha-dark3"
          />
          <span className="font-display font-extrabold text-sm tracking-[0.25em] uppercase text-mecha-white">
            ARGUS
          </span>
        </Link>

        <button
          className="flex flex-col justify-center items-center gap-[5px] w-9 h-9 border border-mecha-dark3 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation"
        >
          <div className={cn('h-px w-5 bg-mecha-white transition-all duration-300', isOpen ? 'rotate-45 translate-y-[6px]' : '')} />
          <div className={cn('h-px w-5 bg-mecha-white transition-all duration-300', isOpen ? 'opacity-0' : '')} />
          <div className={cn('h-px w-5 bg-mecha-white transition-all duration-300', isOpen ? '-rotate-45 -translate-y-[6px]' : '')} />
        </button>
      </header>

      {/* ─── Mobile Slide-Over Drawer ────────────────────────────── */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-mecha-black flex flex-col pt-14 lg:hidden transition-transform duration-300 ease-in-out print:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="px-6 py-4 border-b border-mecha-dark3 font-mono text-xs tracking-widest text-neutral-400 uppercase">
          NAVIGATION // DIRECT
        </div>

        <nav className="flex flex-col px-6 pt-4 gap-1">
          {navItems.map((item) => {
            const active = item.isActive(currentPath);
            return (
              <Link
                key={item.id}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-4 py-5 border-b border-mecha-dark3 font-display font-bold text-2xl uppercase tracking-[0.15em] transition-colors',
                  active ? 'text-mecha-white font-extrabold' : 'text-neutral-400 hover:text-white'
                )}
              >
                <span className="font-mono text-xs text-neutral-400">{item.serial}</span>
                {item.name}
                {active && (
                  <span className="ml-auto font-mono text-xs text-white">●</span>
                )}
              </Link>
            );
          })}

          <Link
            to="/resume"
            onClick={() => setIsOpen(false)}
            className={cn(
              'flex items-center gap-4 py-5 border-b border-mecha-dark3 font-display font-bold text-2xl uppercase tracking-[0.15em] transition-colors',
              currentPath === '/resume' ? 'text-mecha-white font-extrabold' : 'text-neutral-400 hover:text-white'
            )}
          >
            <span className="font-mono text-xs text-neutral-400">04</span>
            RESUME
            {currentPath === '/resume' && (
              <span className="ml-auto font-mono text-xs text-white">●</span>
            )}
          </Link>
        </nav>

        <div className="mt-auto px-6 pb-10 pt-6 border-t border-mecha-dark3 flex items-center justify-between">
          <div className="flex gap-5">
            <a href={import.meta.env.VITE_GITHUB || 'https://github.com/arguspermono'} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors text-xl">
              <FaGithub />
            </a>
            <a href={import.meta.env.VITE_LINKEDIN || 'https://www.linkedin.com/in/arya-bagus/'} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors text-xl">
              <FaLinkedin />
            </a>
            <a href={`mailto:${import.meta.env.VITE_EMAIL || 'aryabaguspermono@gmail.com'}`} className="text-neutral-400 hover:text-white transition-colors text-xl">
              <FaEnvelope />
            </a>
          </div>
          <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
            VER.2026
          </span>
        </div>
      </div>

      {/* ─── Desktop Fixed Sidebar ───────────────────────────────── */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 xl:w-72 z-50 flex-col bg-mecha-black border-r border-mecha-dark3 print:hidden">
        {/* Subtle corner notches */}
        <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-mecha-dark3 opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-t border-r border-mecha-dark3 opacity-40 pointer-events-none" />

        {/* Logo Monogram Block */}
        <div className="p-8 border-b border-mecha-dark3 bg-mecha-black">
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="relative">
              <img
                src="/assets/img/argus-logo.jpg"
                alt="ARGUS logo"
                className="w-11 h-11 object-cover border border-neutral-700 group-hover:border-white transition-colors"
              />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-white" />
            </div>
            <div>
              <div className="font-display font-extrabold text-lg tracking-[0.25em] uppercase text-mecha-white leading-none">
                ARGUS
              </div>
              <div className="font-mono text-[9px] tracking-[0.2em] text-neutral-400 uppercase mt-1">
                Arya Bagus // PENS
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Modules */}
        <nav className="flex flex-col px-6 pt-8 gap-2 flex-grow">
          <div className="font-mono text-[9px] tracking-[0.3em] text-neutral-400 uppercase px-3 mb-2 flex items-center justify-between">
            <span>SECTIONS</span>
            <span>CODE</span>
          </div>

          {navItems.map((item) => {
            const active = item.isActive(currentPath);
            return (
              <Link
                key={item.id}
                to={item.to}
                className={cn(
                  'relative flex items-center justify-between px-3.5 py-3 font-display font-bold text-xs tracking-[0.2em] uppercase transition-all duration-200 border',
                  active
                    ? 'bg-mecha-dark1 text-mecha-white border-mecha-white'
                    : 'bg-transparent text-neutral-300 border-transparent hover:border-neutral-700 hover:text-white'
                )}
              >
                {/* Active Indicator Bar */}
                {active && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-mecha-white" />
                )}

                <span className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-neutral-400">
                    {item.serial}
                  </span>
                  <span>{item.name}</span>
                </span>

                <span className={cn('font-mono text-[10px] transition-transform', active ? 'text-white' : 'text-neutral-400')}>
                  {active ? '●' : '→'}
                </span>
              </Link>
            );
          })}

          {/* Resume — Dedicated Box */}
          <div className="mt-6 pt-4 border-t border-mecha-dark3">
            <Link
              to="/resume"
              className={cn(
                'flex items-center justify-between w-full border px-4 py-3.5 font-display font-bold text-xs tracking-[0.2em] uppercase transition-all duration-200 relative group',
                currentPath === '/resume'
                  ? 'bg-mecha-white text-mecha-black border-mecha-white'
                  : 'bg-mecha-dark1 text-neutral-300 border-mecha-dark3 hover:border-white hover:text-white'
              )}
            >
              <span className="flex items-center gap-3">
                <span className={cn('font-mono text-[10px]', currentPath === '/resume' ? 'text-black' : 'text-neutral-400')}>
                  04
                </span>
                <span>RESUME</span>
              </span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </nav>

        {/* Bottom Socials & System Credits */}
        <div className="p-8 border-t border-mecha-dark3 bg-mecha-black">
          <div className="flex gap-4 mb-4">
            <a
              href={import.meta.env.VITE_GITHUB || 'https://github.com/arguspermono'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors text-base"
              title="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href={import.meta.env.VITE_LINKEDIN || 'https://www.linkedin.com/in/arya-bagus/'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors text-base"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href={`mailto:${import.meta.env.VITE_EMAIL || 'aryabaguspermono@gmail.com'}`}
              className="text-neutral-400 hover:text-white transition-colors text-base"
              title="Email"
            >
              <FaEnvelope />
            </a>
          </div>
          <div className="font-mono text-[9px] tracking-[0.2em] text-neutral-400 uppercase leading-relaxed">
            © {new Date().getFullYear()} ARYA BAGUS<br />
            ALL RIGHTS RESERVED // PENS
          </div>
        </div>
      </aside>
    </>
  );
}
