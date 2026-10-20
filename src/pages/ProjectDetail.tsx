import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { Badge } from '../components/ui/Badge';
import { FadeIn } from '../components/ui/FadeIn';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const isMobileProject = project.category.toLowerCase().includes('mobile') || project.slug === 'memospace';

  return (
    <div className="bg-mecha-white text-mecha-black min-h-screen flex flex-col">
      {/* ── Navigation Strip ─────────────────────────────────── */}
      <div className="border-b border-mecha-light1 px-6 md:px-12 py-3.5 flex items-center justify-between font-mono text-xs tracking-wider uppercase bg-mecha-light2">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-bold hover:text-neutral-600 transition-colors"
        >
          <FaArrowLeft className="text-[10px]" />
          <span>BACK TO PROJECTS</span>
        </Link>
        <span className="text-neutral-500 hidden sm:inline">
          {project.category}
        </span>
      </div>

      {/* ── Title Banner ─────────────────────────────────────── */}
      <div className="border-b border-mecha-light1 px-6 sm:px-10 md:px-14 py-8 md:py-12 bg-mecha-white">
        <FadeIn delay={0.1}>
          <div className="font-mono text-xs tracking-widest text-neutral-500 uppercase mb-2">
            PROJECT SPECIFICATION
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-mecha-black uppercase leading-tight">
            {project.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge className="bg-mecha-black text-mecha-white border-mecha-black">
              {project.category}
            </Badge>
            <Badge className="bg-mecha-light2 text-neutral-800 border-mecha-light1">
              ROLE: {project.role}
            </Badge>
          </div>
        </FadeIn>
      </div>

      {/* ── Adaptive Media Showcase (Full Mobile & Landscape Support) ── */}
      <div className="border-b border-mecha-light1 bg-mecha-dark1 p-4 sm:p-8 md:p-12 flex justify-center">
        <div className="w-full max-w-5xl border border-neutral-700 bg-mecha-black relative overflow-hidden flex items-center justify-center min-h-[350px] max-h-[700px] p-4 sm:p-8">
          {project.imageUrl ? (
            isMobileProject ? (
              /* Mobile Screen: portrait full display, zero cropping */
              <img
                src={project.imageUrl}
                alt={project.title}
                className="max-h-[580px] w-auto max-w-full object-contain mx-auto shadow-2xl border border-neutral-700"
              />
            ) : (
              /* Landscape Project: full display */
              <img
                src={project.imageUrl}
                alt={project.title}
                className="max-h-[550px] w-auto max-w-full object-contain mx-auto"
              />
            )
          ) : (
            <div className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
              PREVIEW IMAGE NOT AVAILABLE
            </div>
          )}

          {/* Corner Notch */}
          <div className="absolute top-0 right-0 w-4 h-4 border-l border-b border-neutral-500" />
        </div>
      </div>

      {/* ── Specification Details Grid ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-mecha-light1 flex-grow">
        {/* Left: Overview & Key Features */}
        <div className="lg:col-span-8 p-6 sm:p-10 md:p-12 border-b lg:border-b-0 lg:border-r border-mecha-light1 space-y-8">
          <div>
            <h2 className="font-display font-bold text-xl md:text-2xl tracking-wide text-mecha-black uppercase mb-3">
              OVERVIEW
            </h2>
            <p className="font-sans text-neutral-800 text-base md:text-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="border-t border-mecha-light1 pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl tracking-wide text-mecha-black uppercase mb-4">
              KEY FEATURES
            </h2>
            <div className="divide-y divide-mecha-light1 border border-mecha-light1">
              {project.keyFeatures.map((feature, i) => (
                <div key={i} className="p-4 flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-neutral-400 mt-0.5">
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  <span className="font-sans text-neutral-800 text-sm md:text-base leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Technical Stack & Actions */}
        <div className="lg:col-span-4 p-6 sm:p-10 bg-mecha-light2/30 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="border border-mecha-light1 bg-mecha-white p-6">
              <h3 className="font-mono text-xs tracking-widest text-neutral-500 uppercase mb-4 pb-2 border-b border-mecha-light1">
                TECHNOLOGIES &amp; TOOLS
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <Badge key={tech} className="bg-mecha-light2 text-neutral-800 border-mecha-light1">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Direct Action Links */}
            <div className="space-y-3">
              {project.liveUrl && (
                <a
                  href={typeof project.liveUrl === 'string' ? project.liveUrl : project.liveUrl[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3.5 bg-mecha-black text-mecha-white font-mono text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <FaExternalLinkAlt className="text-xs" />
                    <span>LAUNCH SYSTEM</span>
                  </span>
                  <span>↗</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3.5 border border-mecha-black text-mecha-black font-mono text-xs tracking-widest uppercase hover:bg-mecha-light2 transition-colors font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <FaGithub className="text-sm" />
                    <span>GITHUB REPOSITORY</span>
                  </span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>

          <div className="font-mono text-xs text-neutral-500 uppercase">
            CATEGORY // {project.category}
          </div>
        </div>
      </div>
    </div>
  );
}
