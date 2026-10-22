import { useState, useEffect } from 'react';
import { FadeIn } from '../components/ui/FadeIn';
import { ModulePanelHeader } from '../components/ui/ModulePanelHeader';
import { certifications, type Certification } from '../data/certifications';
import { FaExternalLinkAlt, FaAward, FaSearch, FaEye, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { cn } from '../utils/cn';

export function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('ALL');
  const [activeModalCert, setActiveModalCert] = useState<Certification | null>(null);

  const organizations = ['ALL', ...Array.from(new Set(certifications.map((c) => c.organization.toUpperCase())))];

  const filteredCerts = certifications.filter((cert) => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrg = selectedOrg === 'ALL' || cert.organization.toUpperCase() === selectedOrg;
    return matchesSearch && matchesOrg;
  });

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalCert) return;
      if (e.key === 'Escape') {
        setActiveModalCert(null);
      } else if (e.key === 'ArrowRight') {
        navigateModal(1);
      } else if (e.key === 'ArrowLeft') {
        navigateModal(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalCert, filteredCerts]);

  const navigateModal = (direction: number) => {
    if (!activeModalCert) return;
    const currentIndex = filteredCerts.findIndex((c) => c.id === activeModalCert.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + filteredCerts.length) % filteredCerts.length;
    setActiveModalCert(filteredCerts[nextIndex]);
  };

  return (
    <div className="blueprint-surface text-mecha-black min-h-screen flex flex-col">
      {/* ── 1. MODULE PANEL HEADER ───────────────────────────── */}
      <ModulePanelHeader
        moduleNumber="MODULE.003 //"
        title="CERTIFICATES"
        description="VERIFIED ACCREDITATIONS & CREDENTIALS IN CLOUD COMPUTING, ARTIFICIAL INTELLIGENCE, DATA SCIENCE, AND SOFTWARE ENGINEERING."
        theme="light"
      />

      {/* ── 2. FILTER & SEARCH ───────────────────────────────── */}
      <div className="border-b border-mecha-light1 bg-mecha-light2 px-6 md:px-12 py-3.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Organization Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {organizations.map((org) => {
            const isActive = selectedOrg === org;
            return (
              <button
                key={org}
                onClick={() => setSelectedOrg(org)}
                className={cn(
                  'px-3 py-1.5 font-mono text-xs tracking-wider uppercase transition-colors border',
                  isActive
                    ? 'theme-accent-bg font-bold'
                    : 'bg-white text-neutral-700 border-mecha-light1 theme-accent-hover'
                )}
              >
                {org}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs" />
          <input
            type="text"
            placeholder="SEARCH CERTIFICATES..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-mecha-light1 pl-9 pr-4 py-2 font-mono text-xs tracking-wider uppercase text-mecha-black placeholder-neutral-400 focus:outline-none theme-focus-accent transition-colors"
          />
        </div>
      </div>

      {/* ── 3. CERTIFICATES GRID ─────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 divide-y md:divide-y-0 border-b border-mecha-light1 bg-transparent">
        {filteredCerts.map((cert) => (
          <FadeIn
            key={cert.id}
            className="neo-card m-4 p-6 sm:p-8 flex flex-col justify-between transition-colors group relative cursor-pointer"
            onClick={() => setActiveModalCert(cert)}
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs tracking-wider text-neutral-500 uppercase pb-2 mb-3 border-b border-mecha-light1">
                <span>{cert.organization}</span>
                <span className="flex items-center gap-1.5 text-neutral-800 font-semibold">
                  <FaAward className="text-neutral-900 text-xs" />
                  VERIFIED
                </span>
              </div>

              <h3 className="font-display font-bold text-lg sm:text-xl tracking-tight theme-accent-text uppercase mb-3 leading-snug group-hover:text-[var(--content-highlight)] transition-colors">
                {cert.title}
              </h3>

              <div className="font-mono text-xs tracking-wider text-neutral-600 uppercase mb-6">
                DATE: {cert.date}
              </div>
            </div>

            {/* Bottom Interactive Action */}
            <div className="pt-4 mt-auto border-t border-mecha-light1 flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-wider text-neutral-500 uppercase flex items-center gap-1.5 group-hover:text-black transition-colors font-semibold">
                <FaEye className="text-xs" />
                <span>INTERACTIVE PREVIEW</span>
              </span>

              {cert.imageUrl && (
                <span className="font-mono text-xs text-neutral-400 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              )}
            </div>
          </FadeIn>
        ))}
      </div>

      {/* ── 4. INTERACTIVE DOCUMENT PREVIEW MODAL ────────────── */}
      {activeModalCert && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fadeIn"
          onClick={() => setActiveModalCert(null)}
        >
          <div
            className="neo-dialog bg-mecha-white text-mecha-black w-full max-w-4xl max-h-[92vh] flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 md:p-6 border-b border-mecha-light1 bg-mecha-light2 flex items-center justify-between">
              <div>
                <div className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
                  {activeModalCert.organization} // {activeModalCert.date}
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl tracking-tight uppercase text-mecha-black mt-1">
                  {activeModalCert.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeModalCert.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-mecha-black bg-mecha-black text-mecha-white font-mono text-xs tracking-wider uppercase hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                >
                  <span>OPEN FULL</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>

                <button
                  onClick={() => setActiveModalCert(null)}
                  className="p-2 border border-mecha-light1 bg-white hover:bg-neutral-100 transition-colors"
                  aria-label="Close Preview"
                >
                  <FaTimes className="text-base" />
                </button>
              </div>
            </div>

            {/* Modal Interactive Document Viewer */}
            <div className="flex-grow bg-neutral-900 p-2 sm:p-4 flex items-center justify-center min-h-[400px] overflow-hidden">
              {activeModalCert.imageUrl.endsWith('.pdf') ? (
                <iframe
                  src={`${activeModalCert.imageUrl}#toolbar=0&navpanes=0`}
                  title={activeModalCert.title}
                  className="w-full h-full min-h-[500px] md:min-h-[560px] border-0 bg-white"
                />
              ) : (
                <img
                  src={activeModalCert.imageUrl}
                  alt={activeModalCert.title}
                  className="max-h-[560px] w-auto max-w-full object-contain mx-auto border border-neutral-700 shadow-lg"
                />
              )}
            </div>

            {/* Modal Navigation Footer */}
            <div className="p-3 md:p-4 border-t border-mecha-light1 bg-mecha-white flex items-center justify-between font-mono text-xs tracking-wider uppercase">
              <button
                onClick={() => navigateModal(-1)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-mecha-light1 hover:border-black transition-colors"
              >
                <FaChevronLeft className="text-[10px]" />
                <span>PREVIOUS</span>
              </button>

              <span className="text-neutral-500 hidden sm:inline">
                USE ARROW KEYS [← / →] TO BROWSE • ESC TO EXIT
              </span>

              <button
                onClick={() => navigateModal(1)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-mecha-light1 hover:border-black transition-colors"
              >
                <span>NEXT</span>
                <FaChevronRight className="text-[10px]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
