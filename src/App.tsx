import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { ProjectDetail } from './pages/ProjectDetail';
import { Resume } from './pages/Resume';
import { CursorSwarmController } from './components/ui/CursorSwarmController';
import { IntroLoader } from './components/ui/IntroLoader';
import { ThemeProvider } from './context/ThemeContext';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hash, pathname]);
  return null;
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <IntroLoader />
        <CursorSwarmController />
        <Header />
        <ScrollProgress />

      <div
        id="portfolio-content"
        className="relative z-10 min-h-screen min-w-0 text-mecha-black flex flex-col font-mono print:pt-0 print:pb-0 print:pl-0"
      >
        <ScrollToTop />

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
