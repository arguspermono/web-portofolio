import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { ProjectDetail } from './pages/ProjectDetail';
import { Resume } from './pages/Resume';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { AsciiSpotlightBackground } from './components/ui/AsciiSpotlightBackground';
import { CursorSwarmController } from './components/ui/CursorSwarmController';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ContentHeader() {
  const { tokens } = useTheme();

  return (
    <header
      className="hidden lg:flex h-14 shrink-0 items-center justify-end px-6 xl:px-10 border-b print:hidden"
      style={{
        backgroundColor: tokens.contentBg,
        borderBottomColor: tokens.accent + '55',
      }}
      aria-label="Theme controls"
    >
      <ThemeToggle />
    </header>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AsciiSpotlightBackground />
        <CursorSwarmController />
        {/* ── Top Scroll Reading Progress Indicator ── */}
        <ScrollProgress />

      {/* ── Fixed Sidebar ── */}
      <Sidebar />

      <div
        id="portfolio-content"
        className="relative z-10 min-h-screen text-mecha-black flex flex-col font-mono pt-14 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pt-0 lg:pb-0 lg:pl-64 xl:pl-72 print:pt-0 print:pb-0 print:pl-0"
      >
        <ScrollToTop />
        <ContentHeader />

        <main className="blueprint-surface flex-grow">
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            {/* Backward-compatibility redirect */}
            <Route path="/achievements" element={<Navigate to="/certificates" replace />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
