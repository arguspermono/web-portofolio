import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../components/ui/FadeIn';
import { Badge } from '../components/ui/Badge';
import { ModulePanelHeader } from '../components/ui/ModulePanelHeader';
import { getProjectPreviewImages, projects } from '../data/projects';
import type { Project } from '../types';
import { cn } from '../utils/cn';
import { ProjectPreviewGallery } from '../components/ui/ProjectPreviewGallery';
import { FaExternalLinkAlt, FaGithub, FaEye, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

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
        title="PROJECTS"
        description="SELECTED PRODUCTION PROJECTS IN WEB PLATFORMS, MOBILE SOFTWARE, 3D MULTIMEDIA, AND EXPERIMENTAL SYSTEMS."
        theme="light"
      />

      {/* ── 2. CATEGORY FILTER ───────────────────────────────── */}
      <div className="editorial-container">
        <div className="my-6 flex flex-wrap items-center justify-between gap-4 border border-[var(--content-border)] bg-[var(--content-subtle-bg)] p-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={isActive}
                  className={cn(
                    'min-h-9 px-3 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors',
                    isActive
                      ? 'theme-accent-bg font-bold'
                      : 'bg-[var(--content-bg)] text-[var(--content-text)] theme-accent-hover'
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="font-mono text-[10px] tracking-[0.12em] text-neutral-500 uppercase">
            {filteredProjects.length} PROJECTS
          </div>
        </div>
      </div>

      {/* ── 3. PROJECTS GRID ─────────────────────────────────── */}
      <div className="editorial-container grid grid-cols-1 gap-5 pb-[var(--editorial-section-space)] md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => {
          const isMobile = project.category.toLowerCase().includes('mobile') || project.slug === 'memospace';

          return (
            <FadeIn
              key={project.id}
              className="editorial-data-card group flex flex-col justify-between transition-colors"
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
            >
              <div>
                {/* Image Showcase — Adaptive for Mobile vs Web */}
                <div
                  onClick={() => setActiveModalProject(project)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setActiveModalProject(project);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open quick preview for ${project.title}`}
                  className="relative block h-64 w-full cursor-pointer overflow-hidden border-b border-[var(--content-border)] bg-[var(--content-subtle-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--content-primary)] sm:h-72"
                >
                  {project.imageUrl ? (
                    <ProjectPreviewGallery
                      images={getProjectPreviewImages(project)}
                      title={project.title}
                      fit={isMobile ? 'contain' : 'cover'}
                      isHovered={hoveredProjectId === project.id}
                      pixelDissolve
                      className={isMobile ? 'p-3' : ''}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-neutral-400 uppercase tracking-widest">
                      PREVIEW UNAVAILABLE
                    </div>
                  )}

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="border border-[var(--content-border)] bg-[var(--content-bg)] px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--content-text)]">
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
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <Badge key={tech} className="border-[var(--content-border)] bg-[var(--content-subtle-bg)] text-[var(--content-text)] text-[11px]">
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
              <div className="flex items-center justify-between border-t border-[var(--content-border)] bg-[var(--content-subtle-bg)] p-6 pt-4 font-mono text-xs tracking-wider uppercase">
                <Link
                  to={`/projects/${project.slug}`}
                  className="flex items-center gap-1.5 font-semibold text-[var(--content-primary)] transition-colors hover:text-[var(--content-highlight)]"
                >
                  <span>SPECIFICATION</span>
                  <span>→</span>
                </Link>

                <div className="flex items-center gap-4 text-neutral-500">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="flex min-h-10 min-w-10 items-center justify-center hover:text-black transition-colors"
                    title="Quick Preview"
                    aria-label={`Quick preview for ${project.title}`}
                  >
                    <FaEye />
                  </button>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-10 min-w-10 items-center justify-center hover:text-black transition-colors"
                      title="GitHub"
                      aria-label={`GitHub repository for ${project.title}`}
                    >
                      <FaGithub className="text-base" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={typeof project.liveUrl === 'string' ? project.liveUrl : project.liveUrl[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-10 min-w-10 items-center justify-center hover:text-black transition-colors"
                      title="Live System"
                      aria-label={`Live project ${project.title}`}
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
                <ProjectPreviewGallery
                  images={getProjectPreviewImages(activeModalProject)}
                  title={activeModalProject.title}
                  fit="contain"
                  autoAdvanceOnHover={false}
                  className="h-[min(420px,60vh)] w-full"
                  imageClassName="mx-auto"
                />
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
