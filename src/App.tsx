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
        {/* ── Top Scroll Reading Progress Indicator ── */}
        <ScrollProgress />

      {/* ── Fixed Sidebar ── */}
      <Sidebar />

      <div
        className="min-h-screen bg-[var(--content-bg)] text-mecha-black flex flex-col font-sans pt-14 lg:pt-0 lg:pl-64 xl:pl-72"
        style={{ backgroundColor: 'var(--content-bg)' }}
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
