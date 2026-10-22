import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { ArgusLogo } from "../ui/ArgusLogo";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { AudioPlayer } from "../ui/AudioPlayer";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useTheme } from "../../context/ThemeContext";

interface NavItem {
  id: string;
  name: string;
  to: string;
  serial: string;
  isActive: (pathname: string) => boolean;
}

const navItems: NavItem[] = [
  {
    id: "about",
    name: "ABOUT",
    to: "/about",
    serial: "01",
    isActive: (pathname) => pathname === "/" || pathname === "/about",
  },
  {
    id: "projects",
    name: "PROJECTS",
    to: "/projects",
    serial: "02",
    isActive: (pathname) => pathname.startsWith("/projects"),
  },
  {
    id: "certificates",
    name: "CERTIFICATES",
    to: "/certificates",
    serial: "03",
    isActive: (pathname) => pathname === "/certificates" || pathname === "/achievements",
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { tokens } = useTheme();

  const sidebarStyle = {
    backgroundColor: tokens.sidebar,
    color: tokens.sidebarText,
    borderColor: tokens.accent + "33",
  };

  const activeNavStyle = {
    backgroundColor: tokens.activeNav,
    borderColor: tokens.activeNavBorder,
    color: tokens.sidebarText,
  };

  const inactiveNavStyle = {
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: tokens.sidebarText + "99",
  };

  const accentIndicatorStyle = {
    backgroundColor: tokens.accent,
  };

  return (
    <>
      {/* --- Mobile Top Bar ---------------------------------------- */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-5 lg:hidden print:hidden border-b"
        style={{ ...sidebarStyle, borderBottomColor: tokens.accent + "33" }}
      >
        <Link to="/" onClick={() => setIsOpen(false)}>
          <ArgusLogo size="sm" showSubtitle={false} />
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <AudioPlayer />
          <button
            className="flex flex-col justify-center items-center gap-[5px] w-9 h-9 border focus:outline-none"
            style={{ borderColor: tokens.accent + "44" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            <div
              className={cn("h-px w-5 transition-all duration-300", isOpen ? "rotate-45 translate-y-[6px]" : "")}
              style={{ backgroundColor: tokens.sidebarText }}
            />
            <div
              className={cn("h-px w-5 transition-all duration-300", isOpen ? "opacity-0" : "")}
              style={{ backgroundColor: tokens.sidebarText }}
            />
            <div
              className={cn("h-px w-5 transition-all duration-300", isOpen ? "-rotate-45 -translate-y-[6px]" : "")}
              style={{ backgroundColor: tokens.sidebarText }}
            />
          </button>
        </div>
      </header>

      {/* --- Mobile Slide-Over Drawer ------------------------------ */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col pt-14 lg:hidden transition-transform duration-300 ease-in-out print:hidden overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={sidebarStyle}
      >
        <div className="px-6 py-4 border-b font-mono text-xs tracking-widest uppercase opacity-40"
          style={{ borderColor: tokens.accent + "33" }}>
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
                className="flex items-center gap-4 py-5 border-b font-display font-bold text-2xl uppercase tracking-[0.15em] transition-colors"
                style={{
                  borderColor: tokens.accent + "22",
                  color: active ? tokens.sidebarText : tokens.sidebarText + "77",
                }}
              >
                <span className="font-mono text-xs opacity-50">{item.serial}</span>
                {item.name}
                {active && (
                  <span className="ml-auto font-mono text-xs" style={{ color: tokens.accent }}>●</span>
                )}
              </Link>
            );
          })}

          <Link
            to="/resume"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 py-5 border-b font-display font-bold text-2xl uppercase tracking-[0.15em] transition-colors"
            style={{
              borderColor: tokens.accent + "22",
              color: currentPath === "/resume" ? tokens.sidebarText : tokens.sidebarText + "77",
            }}
          >
            <span className="font-mono text-xs opacity-50">04</span>
            RESUME
            {currentPath === "/resume" && (
              <span className="ml-auto font-mono text-xs" style={{ color: tokens.accent }}>●</span>
            )}
          </Link>
        </nav>

        <div className="mt-auto px-6 pb-10 pt-6 border-t flex items-center justify-between"
          style={{ borderColor: tokens.accent + "22" }}>
          <div className="flex gap-5">
            <a href={import.meta.env.VITE_GITHUB || "https://github.com/arguspermono"} target="_blank" rel="noopener noreferrer"
              className="text-xl transition-opacity opacity-50 hover:opacity-100" style={{ color: tokens.sidebarText }}>
              <FaGithub />
            </a>
            <a href={import.meta.env.VITE_LINKEDIN || "https://www.linkedin.com/in/arya-bagus/"} target="_blank" rel="noopener noreferrer"
              className="text-xl transition-opacity opacity-50 hover:opacity-100" style={{ color: tokens.sidebarText }}>
              <FaLinkedin />
            </a>
            <a href={`mailto:${import.meta.env.VITE_EMAIL || "aryabaguspermono@gmail.com"}`}
              className="text-xl transition-opacity opacity-50 hover:opacity-100" style={{ color: tokens.sidebarText }}>
              <FaEnvelope />
            </a>
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-40" style={{ color: tokens.sidebarText }}>
            VER.2026
          </span>
        </div>
      </div>

      {/* --- Desktop Fixed Sidebar --------------------------------- */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 xl:w-72 z-50 flex-col border-r print:hidden"
        style={{ ...sidebarStyle, borderRightColor: tokens.accent + "22" }}
      >
        {/* Subtle corner notches */}
        <div className="absolute top-0 right-0 w-8 h-8 border-l border-b opacity-20 pointer-events-none"
          style={{ borderColor: tokens.accent }} />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-t border-r opacity-20 pointer-events-none"
          style={{ borderColor: tokens.accent }} />

        {/* Logo Block */}
        <div className="p-8 border-b" style={{ borderColor: tokens.accent + "22" }}>
          <Link to="/">
            <ArgusLogo size="md" />
          </Link>
        </div>

        {/* Navigation Modules */}
        <nav className="flex flex-col px-6 pt-8 gap-2 flex-grow">
          <div className="font-mono text-[9px] tracking-[0.3em] uppercase px-3 mb-2 flex items-center justify-between opacity-40"
            style={{ color: tokens.sidebarText }}>
            <span>SECTIONS</span>
            <span>CODE</span>
          </div>

          {navItems.map((item) => {
            const active = item.isActive(currentPath);
            return (
              <Link
                key={item.id}
                to={item.to}
                className="relative flex items-center justify-between px-3.5 py-3 font-display font-bold text-xs tracking-[0.2em] uppercase transition-all duration-200 border"
                style={active ? activeNavStyle : inactiveNavStyle}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = tokens.accent + "55";
                    (e.currentTarget as HTMLAnchorElement).style.color = tokens.sidebarText;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color = tokens.sidebarText + "99";
                  }
                }}
              >
                {/* Active Indicator Bar */}
                {active && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5" style={accentIndicatorStyle} />
                )}

                <span className="flex items-center gap-3">
                  <span className="font-mono text-[10px] opacity-40">{item.serial}</span>
                  <span>{item.name}</span>
                </span>                <span className="font-mono text-[10px]" style={{ color: active ? tokens.accent : tokens.sidebarText + "44" }}>
                  {active ? "●" : "→"}
                </span>
              </Link>
            );
          })}

          {/* Resume — Dedicated Box */}
          <div className="mt-6 pt-4 border-t" style={{ borderColor: tokens.accent + "22" }}>
            <Link
              to="/resume"
              className="flex items-center justify-between w-full border px-4 py-3.5 font-display font-bold text-xs tracking-[0.2em] uppercase transition-all duration-200 relative group"
              style={
                currentPath === "/resume"
                  ? { backgroundColor: tokens.accent, color: tokens.sidebar, borderColor: tokens.accent }
                  : { backgroundColor: tokens.activeNav, color: tokens.sidebarText + "BB", borderColor: tokens.accent + "33" }
              }
              onMouseEnter={(e) => {
                if (currentPath !== "/resume") {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = tokens.accent;
                  (e.currentTarget as HTMLAnchorElement).style.color = tokens.sidebarText;
                }
              }}
              onMouseLeave={(e) => {
                if (currentPath !== "/resume") {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = tokens.accent + "33";
                  (e.currentTarget as HTMLAnchorElement).style.color = tokens.sidebarText + "BB";
                }
              }}
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-[10px] opacity-50">04</span>
                <span>RESUME</span>
              </span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </nav>

        {/* Bottom: Audio + Socials */}
        <div className="p-8 border-t space-y-5" style={{ borderColor: tokens.accent + "22" }}>
          <AudioPlayer />

          <div className="flex gap-4 pt-1">
            <a
              href={import.meta.env.VITE_GITHUB || "https://github.com/arguspermono"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base transition-opacity opacity-40 hover:opacity-100"
              style={{ color: tokens.sidebarText }}
              title="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href={import.meta.env.VITE_LINKEDIN || "https://www.linkedin.com/in/arya-bagus/"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base transition-opacity opacity-40 hover:opacity-100"
              style={{ color: tokens.sidebarText }}
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href={`mailto:${import.meta.env.VITE_EMAIL || "aryabaguspermono@gmail.com"}`}
              className="text-base transition-opacity opacity-40 hover:opacity-100"
              style={{ color: tokens.sidebarText }}
              title="Email"
            >
              <FaEnvelope />
            </a>
          </div>

          <div className="font-mono text-[9px] tracking-[0.2em] uppercase leading-relaxed opacity-30"
            style={{ color: tokens.sidebarText }}>
            © {new Date().getFullYear()} ARYA BAGUS<br />
            ALL RIGHTS RESERVED // PENS
          </div>
        </div>
      </aside>
    </>
  );
}
