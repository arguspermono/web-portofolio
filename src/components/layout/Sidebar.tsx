import { Link, useLocation } from "react-router-dom";
import { ArgusLogo } from "../ui/ArgusLogo";
import { FaGithub, FaLinkedin, FaEnvelope, FaUser, FaFolderOpen, FaAward, FaFileAlt } from "react-icons/fa";
import type { IconType } from "react-icons";
import { AudioPlayer } from "../ui/AudioPlayer";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useTheme } from "../../context/ThemeContext";

interface NavItem {
  id: string;
  name: string;
  to: string;
  serial: string;
  isActive: (pathname: string) => boolean;
  icon: IconType;
}

const navItems: NavItem[] = [
  {
    id: "about",
    name: "ABOUT",
    to: "/about",
    serial: "01",
    isActive: (pathname) => pathname === "/" || pathname === "/about",
    icon: FaUser,
  },
  {
    id: "projects",
    name: "PROJECTS",
    to: "/projects",
    serial: "02",
    isActive: (pathname) => pathname.startsWith("/projects"),
    icon: FaFolderOpen,
  },
  {
    id: "certificates",
    name: "CERTIFICATES",
    to: "/certificates",
    serial: "03",
    isActive: (pathname) => pathname === "/certificates" || pathname === "/achievements",
    icon: FaAward,
  },
];

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { theme, tokens } = useTheme();
  const mobileNavItems: NavItem[] = [
    ...navItems,
    {
      id: "resume",
      name: "RESUME",
      to: "/resume",
      serial: "04",
      isActive: (pathname) => pathname === "/resume",
      icon: FaFileAlt,
    },
  ];

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
  const isYellowResumeTheme = theme === "efsf" || theme === "neoZeon";
  const resumeDesktopStyle = theme === "default"
    ? {
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        color: "#111827",
      }
    : isYellowResumeTheme
    ? {
        backgroundColor: "#FFCB3D",
        borderColor: "#FFCB3D",
        color: "#111827",
      }
    : {
        backgroundColor: tokens.activeNav,
        borderColor: tokens.activeNavBorder,
        color: tokens.sidebarText,
      };

  return (
    <>
      {/* --- Mobile Header ------------------------------------------ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between gap-2 px-3 sm:px-5 lg:hidden print:hidden border-b"
        style={{ ...sidebarStyle, borderBottomColor: tokens.accent + "33" }}
      >
        <Link to="/" className="min-w-0 shrink">
          <ArgusLogo size="sm" showSubtitle={false} />
        </Link>

        <div className="flex shrink-0 items-center gap-1.5">
          <ThemeToggle compact />
          <AudioPlayer compact />
        </div>
      </header>

      {/* --- Mobile Bottom Tab Bar ---------------------------------- */}
      <nav
        aria-label="Primary navigation"
        className="fixed inset-x-3 bottom-3 z-50 lg:hidden print:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div
          className="mx-auto grid max-w-lg grid-cols-4 gap-1 rounded-2xl border p-1.5 shadow-xl backdrop-blur-md"
          style={{
            backgroundColor: tokens.sidebar,
            borderColor: tokens.accent + "44",
            boxShadow: `0 12px 32px ${tokens.sidebar}66`,
          }}
        >
          {mobileNavItems.map((item) => {
            const active = item.isActive(currentPath);
            const isHighlightedResume = item.id === "resume" && isYellowResumeTheme;
            const isMonochromeResume = item.id === "resume" && theme === "default";
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                to={item.to}
                aria-label={item.name}
                aria-current={active ? "page" : undefined}
                className="relative flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 transition-colors"
                style={{
                  backgroundColor: isMonochromeResume
                    ? "#FFFFFF"
                    : active
                    ? isHighlightedResume
                      ? "#FFCB3D"
                      : tokens.activeNav
                    : "transparent",
                  color: isHighlightedResume || isMonochromeResume
                    ? "#111827"
                    : active
                      ? tokens.sidebarText
                      : tokens.sidebarText + "99",
                }}
              >
                {active && (
                  <span
                    className="absolute inset-x-3 top-0 h-0.5 rounded-full"
                    style={{ backgroundColor: isHighlightedResume || (item.id === "resume" && theme === "default") ? "#111827" : tokens.accent }}
                  />
                )}
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="max-w-full truncate font-mono text-[8px] font-bold tracking-[0.06em] sm:text-[9px]">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

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
              style={resumeDesktopStyle}
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
              className="flex min-h-10 min-w-10 items-center justify-center text-base transition-opacity opacity-40 hover:opacity-100"
              style={{ color: tokens.sidebarText }}
              title="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href={import.meta.env.VITE_LINKEDIN || "https://www.linkedin.com/in/arya-bagus/"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-10 min-w-10 items-center justify-center text-base transition-opacity opacity-40 hover:opacity-100"
              style={{ color: tokens.sidebarText }}
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href={`mailto:${import.meta.env.VITE_EMAIL || "aryabaguspermono@gmail.com"}`}
              className="flex min-h-10 min-w-10 items-center justify-center text-base transition-opacity opacity-40 hover:opacity-100"
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

