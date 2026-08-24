import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { projects } from '../../data/projects';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/FadeIn';

const accentColors: Array<'blue' | 'red' | 'yellow'> = ['blue', 'red', 'yellow'];

export function Projects() {
  return (
    <Section id="projects" className="bg-mecha-panel">
      <FadeIn className="space-y-4 mb-12">
        <Badge variant="accent">05</Badge>
        <h2>Featured Projects</h2>
        <div className="w-12 h-1 bg-mecha-blue"></div>
      </FadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <FadeIn key={project.id} delay={0.1 * (index + 1)}>
            <Card
              hoverEffect
              accentColor={accentColors[index % accentColors.length]}
              className="flex flex-col h-full bg-white group cursor-default"
            >
            {/* Image placeholder */}
            <Link to={`/projects/${project.slug}`} className="block aspect-video bg-zinc-200 border-2 border-mecha-dark mb-6 relative overflow-hidden flex items-center justify-center group-hover:border-mecha-blue transition-colors duration-300">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNFNEU0RTciLz48L3N2Zz4=')] opacity-20 mix-blend-multiply group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase relative z-10 bg-white px-2 py-1 border-2 border-mecha-dark group-hover:scale-110 group-hover:bg-mecha-dark group-hover:text-white transition-all duration-300">
                {project.category}
              </div>
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-grow">
              <div className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase mb-1">
                {project.role}
              </div>
              <Link to={`/projects/${project.slug}`} className="hover:text-mecha-blue transition-colors">
                <h3 className="text-base mb-2">{project.title}</h3>
              </Link>
              <p className="text-sm mb-6 flex-grow">{project.description}</p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.slice(0, 4).map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge>+{project.technologies.length - 4}</Badge>
                )}
              </div>

              {/* Links - Reveal on hover effect via translation and opacity on inner elements */}
              <div className="flex gap-4 mt-auto border-t-2 border-zinc-200 pt-4 font-mono text-xs font-bold tracking-wider overflow-hidden">
                <Link
                  to={`/projects/${project.slug}`}
                  className="flex items-center gap-1 hover:text-mecha-blue transition-colors group/link opacity-80 hover:opacity-100 mr-auto"
                >
                  <span>DETAILS</span>
                  <span className="transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">→</span>
                </Link>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-mecha-blue transition-colors group/link opacity-80 hover:opacity-100"
                  >
                    <span>GITHUB</span>
                    <span className="transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">→</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-mecha-blue transition-colors group/link opacity-80 hover:opacity-100"
                  >
                    <span>LIVE</span>
                    <span className="transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">→</span>
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
