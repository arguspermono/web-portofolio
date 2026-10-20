import { Badge } from '../ui/Badge';
import { projects } from '../../data/projects';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/FadeIn';
import { useRef } from 'react';
import type { SectionComponentProps } from '../../types';

export function Projects({ sectionIndex: _i = 2 }: SectionComponentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : 420;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="bg-mecha-black text-mecha-white">

      {/* ── Panel header bar ─────────────────────────────────── */}
      <div className="border-b border-mecha-dark3 px-8 md:px-12 py-4 flex items-center gap-4">
        <span className="font-mono text-[10px] tracking-[0.25em] text-mecha-dark3 uppercase">▶ MODULE.002 //</span>
        <div className="flex-1 border-t border-mecha-dark3" />
      </div>

      {/* Section title strip + scroll controls */}
      <div className="border-b border-mecha-dark3 px-8 md:px-12 py-10 md:py-16 flex items-end justify-between gap-6">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-mecha-white uppercase leading-none">
            PROJECTS
          </h2>
        </FadeIn>
        {/* Scroll controls */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 flex items-center justify-center border border-mecha-dark3 text-mecha-dark3 hover:border-mecha-white hover:text-mecha-white transition-all group"
            aria-label="Scroll left"
          >
            <span className="font-mono group-hover:-translate-x-0.5 transition-transform">←</span>
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 flex items-center justify-center border border-mecha-dark3 text-mecha-dark3 hover:border-mecha-white hover:text-mecha-white transition-all group"
            aria-label="Scroll right"
          >
            <span className="font-mono group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* ── Project cards ─────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border-b border-mecha-dark3"
      >
        {projects.map((project, index) => (
          <FadeIn
            key={project.id}
            delay={0.1 * (index + 1)}
            className="flex-none w-[85vw] sm:w-[400px] lg:w-[440px] snap-start border-r border-mecha-dark3 last:border-r-0 flex flex-col"
          >
            {/* Card image */}
            <Link
              to={`/projects/${project.slug}`}
              className="aspect-video bg-mecha-dark2 border-b border-mecha-dark3 relative overflow-hidden group block"
            >
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-mecha-dark3 uppercase border border-mecha-dark3 px-3 py-1">
                    {project.category}
                  </span>
                </div>
              )}
              {/* Index label */}
              <div className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.2em] text-mecha-dark3 uppercase">
                PROJ.{String(index + 1).padStart(2, '0')}
              </div>
              {/* Corner */}
              <div className="absolute top-0 right-0 w-3 h-3 border-l border-b border-mecha-dark3" />
            </Link>

            {/* Card content */}
            <div className="flex flex-col flex-grow p-6">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-mecha-dark3 mb-1">
                {project.role}
              </div>
              <Link to={`/projects/${project.slug}`} className="group/title">
                <h3 className="text-base font-bold tracking-tight mb-2 text-white uppercase group-hover/title:text-mecha-light1 transition-colors">
                  {project.title}
                </h3>
              </Link>
              <p className="text-sm mb-5 flex-grow leading-relaxed text-mecha-dark3 font-sans normal-case tracking-normal">
                {project.description}
              </p>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.slice(0, 4).map((tech: string) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge>+{project.technologies.length - 4}</Badge>
                )}
              </div>

              {/* Links */}
              <div className="flex gap-5 mt-auto pt-4 border-t border-mecha-dark3 font-mono text-[10px] tracking-[0.18em] text-mecha-dark3 uppercase">
                <Link
                  to={`/projects/${project.slug}`}
                  className="flex items-center gap-1 hover:text-white transition-colors group/link"
                >
                  DETAILS
                  <span className="opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all">→</span>
                </Link>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-white transition-colors group/link"
                  >
                    GITHUB
                    <span className="opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all">↗</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-white transition-colors group/link"
                  >
                    LIVE
                    <span className="opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all">↗</span>
                  </a>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Bottom status bar */}
      <div className="px-8 md:px-12 py-3 flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-mecha-dark3 uppercase">
        <span>{projects.length} PROJECTS LISTED</span>
        <span>SCROLL TO EXPLORE →</span>
      </div>
    </section>
  );
}
