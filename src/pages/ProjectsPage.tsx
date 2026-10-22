import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../components/ui/FadeIn';
import { Badge } from '../components/ui/Badge';
import { ModulePanelHeader } from '../components/ui/ModulePanelHeader';
import { projects } from '../data/projects';
import type { Project } from '../types';
import { cn } from '../utils/cn';
import { FaExternalLinkAlt, FaGithub, FaEye, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['ALL', ...Array.from(new Set(projects.map((p) => p.category.toUpperCase())))];

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter((p) => p.category.toUpperCase() === selectedCategory);

  // Keyboard navigation for preview modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalProject) return;
      if (e.key === 'Escape') {
        setActiveModalProject(null);
      } else if (e.key === 'ArrowRight') {
        navigateModal(1);
      } else if (e.key === 'ArrowLeft') {
        navigateModal(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProject, filteredProjects]);

  const navigateModal = (direction: number) => {
    if (!activeModalProject) return;
    const currentIndex = filteredProjects.findIndex((p) => p.id === activeModalProject.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + filteredProjects.length) % filteredProjects.length;
    setActiveModalProject(filteredProjects[nextIndex]);
  };

  return (
    <div className="blueprint-surface text-mecha-black min-h-screen flex flex-col">
      {/* ── 1. MODULE PANEL HEADER ───────────────────────────── */}
      <ModulePanelHeader
        moduleNumber="MODULE.002 //"
        title="PROJECTS"
        description="SELECTED PRODUCTION PROJECTS IN WEB PLATFORMS, MOBILE SOFTWARE, 3D MULTIMEDIA, AND EXPERIMENTAL SYSTEMS."
        theme="light"
      />

      {/* ── 2. CATEGORY FILTER ───────────────────────────────── */}
      <div className="border-b border-mecha-light1 bg-mecha-light2 px-6 md:px-12 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-3 py-1.5 font-mono text-xs tracking-wider uppercase transition-colors border',
                  isActive
                    ? 'theme-accent-bg font-bold'
                    : 'bg-white text-neutral-700 border-mecha-light1 theme-accent-hover'
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="font-mono text-xs tracking-wider text-neutral-500 uppercase">
          {filteredProjects.length} PROJECTS
        </div>
      </div>

      {/* ── 3. PROJECTS GRID ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 divide-y md:divide-y-0 border-b border-mecha-light1 bg-transparent">
        {filteredProjects.map((project) => {
          const isMobile = project.category.toLowerCase().includes('mobile') || project.slug === 'memospace';

          return (
            <FadeIn
              key={project.id}
              className="neo-card m-4 flex flex-col justify-between group transition-colors"
            >
              <div>
                {/* Image Showcase — Adaptive for Mobile vs Web */}
                <div
                  onClick={() => setActiveModalProject(project)}
                  className="h-64 sm:h-72 w-full bg-mecha-light2 relative overflow-hidden block border-b border-mecha-light1 cursor-pointer"
                >
                  {project.imageUrl ? (
                    <div className="w-full h-full flex items-center justify-center p-3">
                      {isMobile ? (
                        /* Mobile Mockup: full height, centered, zero cropping */
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="h-full w-auto max-w-full object-contain mx-auto shadow-md border border-neutral-300"
                        />
                      ) : (
                        /* Landscape: full width */
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-neutral-400 uppercase tracking-widest">
                      PREVIEW UNAVAILABLE
                    </div>
                  )}

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-3 h-3 border-l border-b border-neutral-400 z-10" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="font-mono text-[10px] tracking-widest uppercase bg-white/95 text-neutral-800 border border-neutral-300 px-2 py-0.5 shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Interactive Quick Preview Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-mecha-white text-mecha-black font-mono text-xs tracking-widest uppercase font-bold flex items-center gap-2">
                      <FaEye />
                      QUICK PREVIEW
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8">
                  <div className="font-mono text-xs tracking-wider text-neutral-500 uppercase mb-2">
                    ROLE: {project.role}
                  </div>

                  <Link to={`/projects/${project.slug}`}>
                    <h3 className="font-display font-bold text-xl md:text-2xl tracking-wide uppercase theme-accent-text group-hover:text-[var(--content-highlight)] transition-colors mb-3 leading-snug">
                      {project.title}
                    </h3>
                  </Link>

                  <p className="font-sans text-neutral-600 text-sm leading-relaxed mb-6 font-normal line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <Badge key={tech} className="bg-mecha-light2 text-neutral-800 border-mecha-light1 text-[11px]">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="font-mono text-[10px] text-neutral-500 self-center">
                        +{project.technologies.length - 5} MORE
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-4 border-t border-mecha-light1 flex items-center justify-between font-mono text-xs tracking-wider uppercase bg-mecha-light2/30">
                <Link
                  to={`/projects/${project.slug}`}
                  className="text-mecha-black hover:text-neutral-600 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>SPECIFICATION</span>
                  <span>→</span>
                </Link>

                <div className="flex items-center gap-4 text-neutral-500">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="hover:text-black transition-colors flex items-center gap-1"
                    title="Quick Preview"
                  >
                    <FaEye />
                  </button>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black transition-colors"
                      title="GitHub"
                    >
                      <FaGithub className="text-base" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={typeof project.liveUrl === 'string' ? project.liveUrl : project.liveUrl[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black transition-colors"
                      title="Live System"
                    >
                      <FaExternalLinkAlt className="text-sm" />
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* ── 4. INTERACTIVE PROJECT PREVIEW MODAL ──────────────── */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fadeIn"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="neo-dialog bg-white text-black w-full max-w-4xl max-h-[92vh] flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 md:p-6 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
              <div>
                <div className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
                  {activeModalProject.category} // ROLE: {activeModalProject.role}
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight uppercase text-black mt-1">
                  {activeModalProject.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/projects/${activeModalProject.slug}`}
                  className="px-3.5 py-1.5 border border-black bg-black text-white font-mono text-xs tracking-wider uppercase font-bold hover:bg-neutral-800 transition-colors"
                >
                  FULL CASE STUDY →
                </Link>

                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-2 border border-neutral-300 bg-white hover:bg-neutral-100 transition-colors text-black"
                  aria-label="Close Preview"
                >
                  <FaTimes className="text-base" />
                </button>
              </div>
            </div>

            {/* Modal Image Viewport */}
            <div className="bg-neutral-100 p-4 md:p-6 flex items-center justify-center max-h-[480px] overflow-hidden border-b border-neutral-200">
              {activeModalProject.imageUrl ? (
                (activeModalProject.category.toLowerCase().includes('mobile') || activeModalProject.slug === 'memospace') ? (
                  <img
                    src={activeModalProject.imageUrl}
                    alt={activeModalProject.title}
                    className="max-h-[420px] w-auto max-w-full object-contain mx-auto shadow-xl border border-neutral-300"
                  />
                ) : (
                  <img
                    src={activeModalProject.imageUrl}
                    alt={activeModalProject.title}
                    className="max-h-[420px] w-auto max-w-full object-contain mx-auto shadow-md"
                  />
                )
              ) : (
                <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest py-16">
                  PREVIEW NOT AVAILABLE
                </div>
              )}
            </div>

            {/* Modal Details */}
            <div className="p-6 overflow-y-auto space-y-4">
              <p className="font-sans text-neutral-700 text-sm md:text-base leading-relaxed">
                {activeModalProject.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeModalProject.technologies.map((tech) => (
                  <Badge key={tech} className="bg-neutral-100 text-neutral-800 border-neutral-200 text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Modal Navigation Footer */}
            <div className="p-3 md:p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between font-mono text-xs tracking-wider uppercase">
              <button
                onClick={() => navigateModal(-1)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 bg-white hover:border-black hover:text-black transition-colors"
              >
                <FaChevronLeft className="text-[10px]" />
                <span>PREVIOUS</span>
              </button>

              <span className="text-neutral-500 hidden sm:inline">
                USE ARROW KEYS [← / →] TO BROWSE • ESC TO EXIT
              </span>

              <button
                onClick={() => navigateModal(1)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 bg-white hover:border-black hover:text-black transition-colors"
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
