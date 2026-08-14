import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { Section } from '../components/ui/Section';
import { Badge } from '../components/ui/Badge';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <Section className="min-h-screen pt-32 pb-24">
      {/* Back Navigation */}
      <div className="mb-12">
        <Link 
          to="/#projects" 
          className="inline-flex items-center gap-2 font-mono text-sm font-bold tracking-wider hover:text-mecha-blue transition-colors"
        >
          <span className="transform -translate-x-1 hover:-translate-x-2 transition-transform">←</span>
          BACK TO PROJECTS
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 mb-12">
          <Badge variant="accent" className="mb-4 inline-block">{project.category}</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl break-words">{project.title}</h1>
          <div className="w-16 h-1 bg-mecha-red mt-6"></div>
        </div>

        {/* Hero Image */}
        <div className="w-full aspect-video bg-zinc-200 border-2 border-mecha-dark mb-12 relative overflow-hidden flex items-center justify-center shadow-hard">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNFNEU0RTciLz48L3N2Zz4=')] opacity-20 mix-blend-multiply"></div>
          <div className="font-mono text-xl text-zinc-400 tracking-widest uppercase relative z-10 bg-white px-4 py-2 border-2 border-mecha-dark">
            PROJECT PREVIEW
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl mb-4">Overview</h2>
              <p className="text-lg leading-relaxed text-zinc-700">{project.description}</p>
            </div>

            <div>
              <h2 className="text-2xl mb-4">Key Features</h2>
              <ul className="space-y-4">
                {project.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-mecha-blue font-mono font-bold mt-1">{(i + 1).toString().padStart(2, '0')}</span>
                    <span className="text-zinc-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <div className="p-6 bg-white border-2 border-mecha-dark relative shadow-hard">
              {/* Corner tech detail */}
              <div className="absolute top-0 right-0 w-4 h-4 border-l-2 border-b-2 border-mecha-dark bg-mecha-panel" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
              
              <h3 className="font-mono text-sm tracking-widest text-zinc-400 mb-2 uppercase">Role</h3>
              <p className="font-bold">{project.role}</p>

              <div className="w-full h-px bg-zinc-200 my-6"></div>

              <h3 className="font-mono text-sm tracking-widest text-zinc-400 mb-4 uppercase">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <Badge key={tech} variant="default">{tech}</Badge>
                ))}
              </div>
            </div>

            {/* Links Block */}
            <div className="flex flex-col gap-4 font-mono text-sm font-bold tracking-wider">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 border-2 border-mecha-dark bg-mecha-blue text-white text-center hover:-translate-y-1 hover:-translate-x-1 hover:shadow-hard transition-all flex items-center justify-center gap-2 group"
                >
                  VIEW LIVE PROJECT
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 border-2 border-mecha-dark bg-white text-mecha-dark text-center hover:-translate-y-1 hover:-translate-x-1 hover:shadow-hard transition-all flex items-center justify-center gap-2 group"
                >
                  SOURCE CODE
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
