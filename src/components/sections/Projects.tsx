import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { projects } from '../../data/projects';

const accentColors: Array<'blue' | 'red' | 'yellow'> = ['blue', 'red', 'yellow'];

export function Projects() {
  return (
    <Section id="projects" className="bg-mecha-panel">
      <div className="space-y-4 mb-12">
        <Badge variant="accent">05</Badge>
        <h2>Featured Projects</h2>
        <div className="w-12 h-1 bg-mecha-blue"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Card
            key={project.id}
            hoverEffect
            accentColor={accentColors[index % accentColors.length]}
            className="flex flex-col h-full bg-white"
          >
            {/* Image placeholder */}
            <div className="aspect-video bg-zinc-200 border-2 border-mecha-dark mb-6 relative overflow-hidden flex items-center justify-center">
              <div className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
                {project.category}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
              <div className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase mb-1">
                {project.role}
              </div>
              <h3 className="text-base mb-2">{project.title}</h3>
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

              {/* Links */}
              <div className="flex gap-4 mt-auto border-t-2 border-zinc-200 pt-4 font-mono text-xs font-bold tracking-wider">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-mecha-blue transition-colors"
                  >
                    GITHUB →
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-mecha-blue transition-colors"
                  >
                    LIVE →
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
