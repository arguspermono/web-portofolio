import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { projects } from '../../data/projects';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/FadeIn';
import { SectionHeader } from '../ui/SectionHeader';
import { useRef } from 'react';
import type { SectionComponentProps } from '../../types';

export function Projects({ theme = 'light', sectionIndex = 3 }: SectionComponentProps) {
  const isDark = theme === 'dark';
  const numberStr = sectionIndex.toString().padStart(2, '0');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : 400;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Section 
      id="projects" 
      className={isDark ? "bg-mecha-black text-mecha-white border-b border-mecha-dark3 relative overflow-hidden" : "bg-mecha-light2 border-b border-mecha-light1"}
    >
      {isDark && (
        <div className="absolute top-0 right-0 w-64 h-64 border-l border-b border-mecha-dark3 opacity-20 pointer-events-none"></div>
      )}
      
      <SectionHeader number={numberStr} label="PROJECTS" title="Featured Work." dark={isDark}>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className={`w-10 h-10 flex items-center justify-center border transition-all group ${isDark ? 'border-mecha-dark3 text-mecha-light1 hover:bg-mecha-dark2 hover:text-white hover:border-mecha-light1' : 'border-mecha-light1 text-mecha-dark3 hover:bg-mecha-white hover:border-mecha-dark2 hover:text-mecha-black'}`} aria-label="Scroll left">
            <span className="font-mono transform group-hover:-translate-x-1 transition-transform">←</span>
          </button>
          <button onClick={() => scroll('right')} className={`w-10 h-10 flex items-center justify-center border transition-all group ${isDark ? 'border-mecha-dark3 text-mecha-light1 hover:bg-mecha-dark2 hover:text-white hover:border-mecha-light1' : 'border-mecha-light1 text-mecha-dark3 hover:bg-mecha-white hover:border-mecha-dark2 hover:text-mecha-black'}`} aria-label="Scroll right">
            <span className="font-mono transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </SectionHeader>

      <div ref={scrollRef} className="flex overflow-x-auto gap-6 md:gap-8 pb-8 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-10">
        {projects.map((project, index) => (
          <FadeIn key={project.id} delay={0.1 * (index + 1)} className="flex-none w-[85vw] sm:w-[400px] lg:w-[450px] snap-start">
            <Card
              hoverEffect
              className={`flex flex-col h-full group cursor-default border ${isDark ? 'bg-mecha-dark1 border-mecha-dark3' : 'bg-mecha-white border-mecha-light1'}`}
            >
            {/* Image placeholder */}
            <Link to={`/projects/${project.slug}`} className={`aspect-video border mb-6 relative overflow-hidden flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-mecha-dark2 border-mecha-dark3' : 'bg-mecha-light2 border-mecha-light1'}`}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNFNUU1RTciLz48L3N2Zz4=')] opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className={`font-mono text-[10px] tracking-[0.2em] uppercase relative z-10 px-2 py-1 border transition-all duration-300 ${isDark ? 'bg-mecha-dark1 text-mecha-light1 border-mecha-dark3' : 'text-mecha-dark2 bg-mecha-white border-mecha-light1'}`}>
                {project.category}
              </div>
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-grow">
              <div className={`font-mono text-[10px] tracking-[0.2em] uppercase mb-1 ${isDark ? 'text-mecha-light1' : 'text-mecha-dark3'}`}>
                {project.role}
              </div>
              <Link to={`/projects/${project.slug}`} className={`transition-colors ${isDark ? 'hover:text-mecha-light1' : 'hover:text-mecha-dark2'}`}>
                <h3 className={`text-lg md:text-xl font-bold tracking-tight mb-2 ${isDark ? 'text-white' : 'text-mecha-black'}`}>{project.title}</h3>
              </Link>
              <p className={`text-sm mb-6 flex-grow leading-relaxed ${isDark ? 'text-mecha-light1' : 'text-mecha-dark2'}`}>{project.description}</p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.slice(0, 4).map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge>+{project.technologies.length - 4}</Badge>
                )}
              </div>

              {/* Links - Minimal transition */}
              <div className={`flex gap-4 mt-auto pt-4 font-mono text-[10px] sm:text-xs font-bold tracking-wider overflow-hidden border-t ${isDark ? 'border-mecha-dark3 text-white' : 'border-mecha-light1 text-mecha-black'}`}>
                <Link
                  to={`/projects/${project.slug}`}
                  className={`flex items-center gap-1 transition-colors group/link opacity-80 hover:opacity-100 mr-auto ${isDark ? 'hover:text-mecha-light1 text-white' : 'hover:text-mecha-dark2 text-mecha-black'}`}
                >
                  <span>DETAILS</span>
                  <span className="transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">→</span>
                </Link>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 transition-colors group/link opacity-80 hover:opacity-100 ${isDark ? 'hover:text-mecha-light1 text-white' : 'hover:text-mecha-dark2 text-mecha-black'}`}
                  >
                    <span>GITHUB</span>
                    <span className="transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">↗</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 transition-colors group/link opacity-80 hover:opacity-100 ${isDark ? 'hover:text-mecha-light1 text-white' : 'hover:text-mecha-dark2 text-mecha-black'}`}
                  >
                    <span>LIVE</span>
                    <span className="transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">↗</span>
                  </a>
                )}
              </div>
            </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
