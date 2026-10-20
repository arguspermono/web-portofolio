import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { ProjectDetail } from './pages/ProjectDetail';
import { Resume } from './pages/Resume';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <Sidebar />

      <div className="min-h-screen bg-mecha-white text-mecha-black flex flex-col font-sans pt-14 lg:pt-0 lg:pl-64 xl:pl-72">
        <ScrollToTop />

        <main className="flex-grow">
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
  );
}

export default App;
