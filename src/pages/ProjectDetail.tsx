import { useParams, Link, Navigate } from 'react-router-dom';
import { getProjectPreviewImages, projects } from '../data/projects';
import { Badge } from '../components/ui/Badge';
import { FadeIn } from '../components/ui/FadeIn';
import { ProjectPreviewGallery } from '../components/ui/ProjectPreviewGallery';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const { tokens } = useTheme();

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const isMobileProject = project.category.toLowerCase().includes('mobile') || project.slug === 'memospace';

  return (
    <div className="blueprint-surface text-mecha-black min-h-screen flex flex-col">
      {/* ── Navigation Strip ─────────────────────────────────── */}
      <div
        className="border-b transition-colors"
        style={{
          backgroundColor: tokens.contentSubtleBg,
          borderBottomColor: tokens.contentBorder,
        }}
      >
        <div className="editorial-container flex items-center justify-between py-3.5 font-mono text-xs uppercase tracking-wider">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-bold transition-colors"
            style={{ color: tokens.contentPrimary }}
          >
            <FaArrowLeft className="text-[10px]" />
            <span>BACK TO PROJECTS</span>
          </Link>
          <span className="hidden text-neutral-500 sm:inline">
            {project.category}
          </span>
        </div>
      </div>

      {/* ── Title Banner ─────────────────────────────────────── */}
      <div
        className="border-b bg-mecha-white"
        style={{ borderBottomColor: tokens.contentBorder }}
      >
        <div className="editorial-container py-8 md:py-12">
          <FadeIn delay={0.1}>
            <div
              className="mb-2 font-mono text-xs font-bold uppercase tracking-widest"
              style={{ color: tokens.contentPrimary }}
            >
              PROJECT SPECIFICATION
            </div>

            <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight theme-accent-text sm:text-5xl md:text-6xl">
              {project.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className="inline-flex items-center border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] sm:text-xs"
                style={{
                  backgroundColor: tokens.contentPrimary,
                  borderColor: tokens.contentPrimary,
                  color: '#FFFFFF',
                }}
              >
                {project.category}
              </span>
              <Badge className="border-mecha-light1 bg-mecha-light2 text-neutral-800">
                ROLE: {project.role}
              </Badge>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── Adaptive Media Showcase (Full Mobile & Landscape Support) ── */}
      <div className="border-b border-mecha-light1 bg-mecha-dark1">
        <div className="editorial-container flex justify-center py-4 sm:py-8 md:py-12">
          <div className="relative flex min-h-[350px] max-h-[700px] w-full items-center justify-center overflow-hidden border border-neutral-700 bg-mecha-black p-4 sm:p-8">
            {project.imageUrl ? (
              <ProjectPreviewGallery
                images={getProjectPreviewImages(project)}
                title={project.title}
                fit="contain"
                autoAdvanceOnHover={false}
                pixelDissolve
                className={isMobileProject ? 'h-[580px] max-h-[60vh] w-full' : 'h-[550px] max-h-[60vh] w-full'}
                imageClassName="mx-auto"
              />
            ) : (
              <div className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
                PREVIEW IMAGE NOT AVAILABLE
              </div>
            )}

            <div className="absolute top-0 right-0 w-4 h-4 border-l border-b border-neutral-500" />
          </div>
        </div>
      </div>

      {/* ── Specification Details Grid ───────────────────────── */}
      <div className="flex-grow border-b border-mecha-light1">
        <div className="editorial-container grid grid-cols-1 lg:grid-cols-12">
          <div className="space-y-8 border-b border-mecha-light1 p-6 sm:p-10 lg:col-span-8 lg:border-b-0 lg:border-r lg:p-12">
            <div>
              <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide theme-accent-text md:text-2xl">
                OVERVIEW
              </h2>
              <p className="font-sans text-base leading-relaxed text-neutral-800 md:text-lg">
                {project.description}
              </p>
            </div>

            <div className="border-t border-mecha-light1 pt-8">
              <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wide theme-accent-text md:text-2xl">
                KEY FEATURES
              </h2>
              <div className="divide-y divide-mecha-light1 border border-mecha-light1">
                {project.keyFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-4">
                    <span className="mt-0.5 font-mono text-xs font-bold text-neutral-400">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    <span className="font-sans text-sm leading-relaxed text-neutral-800 md:text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-6 bg-mecha-light2/30 p-6 sm:p-10 lg:col-span-4">
            <div className="space-y-6">
              <div className="border border-mecha-light1 bg-mecha-white p-6">
                <h3 className="mb-4 border-b border-mecha-light1 pb-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
                  TECHNOLOGIES &amp; TOOLS
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} className="border-mecha-light1 bg-mecha-light2 text-neutral-800">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {project.liveUrl && (
                  <a
                    href={typeof project.liveUrl === 'string' ? project.liveUrl : project.liveUrl[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-between border px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:opacity-90"
                    style={{
                      backgroundColor: tokens.contentPrimary,
                      borderColor: tokens.contentPrimary,
                    }}
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
                    className="flex w-full items-center justify-between border px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-widest transition-colors hover:bg-neutral-50"
                    style={{
                      borderColor: tokens.contentPrimary,
                      color: tokens.contentPrimary,
                    }}
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

            <div className="font-mono text-xs uppercase text-neutral-500">
              CATEGORY // {project.category}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
