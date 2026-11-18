import { useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { Badge } from './Badge';
import { ProjectPreviewGallery } from './ProjectPreviewGallery';
import { SectionHeader } from './SectionHeader';
import { getProjectPreviewImages } from '../../data/projects';
import type { Project } from '../../types';

interface FeaturedProjectRailProps {
  projects: Project[];
}

export function FeaturedProjectRail({ projects }: FeaturedProjectRailProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [isPinned, setIsPinned] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const viewport = section?.querySelector<HTMLElement>('[data-project-rail-viewport]');
    if (!section || !track || !viewport || reduceMotion || projects.length < 2) {
      setIsPinned(false);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia(section);
    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      if (getDistance() === 0) return;

      setIsPinned(true);
      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          id: 'featured-project-rail',
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => setIsPinned(false);
    });

    return () => {
      media.revert();
      setIsPinned(false);
    };
  }, [projects.length, reduceMotion]);

  const handleGalleryKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

    const trigger = ScrollTrigger.getById('featured-project-rail');
    if (trigger) {
      event.preventDefault();
      const step = (trigger.end - trigger.start) / Math.max(projects.length - 1, 1);
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const target = Math.min(trigger.end, Math.max(trigger.start, window.scrollY + step * direction));
      window.scrollTo({ top: target, behavior: reduceMotion ? 'auto' : 'smooth' });
      return;
    }

    event.currentTarget.scrollBy({
      left: event.key === 'ArrowRight' ? event.currentTarget.clientWidth * 0.75 : -event.currentTarget.clientWidth * 0.75,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      className="editorial-section relative isolate border-b border-mecha-light1 py-[var(--editorial-section-space)]"
    >
      <div className="editorial-container relative z-10">
        <SectionHeader number="03" label="SELECTED WORK" title="PROJECTS IN MOTION" />
        <div className="flex flex-col justify-between gap-5 border-t border-mecha-light1 pt-5 sm:flex-row sm:items-end">
          <p className="max-w-2xl font-sans text-sm leading-relaxed text-neutral-700 sm:text-base">
            A selection of shipped interfaces, tools, and multimedia work. Follow each frame into its full project specification.
          </p>
          <Link
            to="/projects"
            className="inline-flex min-h-11 shrink-0 items-center gap-3 border-b border-mecha-black pb-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-mecha-black transition-colors hover:text-[var(--content-highlight)]"
          >
            FULL PROJECT INDEX <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      <div className="relative z-10 mt-8 lg:mt-12">
        <div
          data-project-rail-viewport
          role="region"
          aria-roledescription="horizontal project gallery"
          aria-label="Selected project stories. Use arrow keys, page scrolling, or swipe to explore."
          aria-keyshortcuts="ArrowLeft ArrowRight"
          onKeyDown={handleGalleryKeyDown}
          className={`overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--content-primary)] ${
            isPinned ? 'lg:overflow-hidden' : 'lg:overflow-x-auto'
          }`}
          tabIndex={0}
        >
          <div
            ref={trackRef}
            className="flex w-max min-w-full snap-x snap-mandatory gap-4 px-[var(--editorial-page-gutter)] py-3 sm:gap-6 lg:gap-8"
          >
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="editorial-data-card w-[min(84vw,44rem)] shrink-0 snap-start sm:w-[min(74vw,48rem)] lg:w-[min(62vw,56rem)]"
              >
                <Link
                  to={`/projects/${project.slug}`}
                  aria-label={`Open ${project.title} project details`}
                  className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--content-primary)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-[var(--content-subtle-bg)]">
                    <ProjectPreviewGallery
                      images={getProjectPreviewImages(project)}
                      title={project.title}
                      showIndicators={false}
                      pixelDissolve
                      className="transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />
                    <span className="absolute left-4 top-4 border border-[var(--content-border)] bg-[var(--content-bg)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--content-text)]">
                      {project.category}
                    </span>
                    <span className="absolute bottom-4 right-4 bg-mecha-black px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white">
                      CASE FILE // {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </Link>

                <div className="grid gap-6 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:p-7 lg:p-9">
                  <div className="min-w-0">
                    <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-500">
                      ROLE // {project.role}
                    </div>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="group/title inline-flex items-start gap-3"
                    >
                      <h3 className="m-0 font-display text-2xl font-bold uppercase leading-none tracking-[-0.035em] text-[var(--content-primary)] transition-colors group-hover/title:text-[var(--content-highlight)] sm:text-3xl lg:text-4xl">
                        {project.title}
                      </h3>
                      <span className="mt-1 text-sm text-neutral-400" aria-hidden="true">↗</span>
                    </Link>
                    <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-neutral-600 sm:text-base">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between gap-5 sm:items-end">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-400">
                      {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </span>
                    <div className="flex max-w-xs flex-wrap gap-1.5 sm:justify-end">
                      {project.technologies.slice(0, 4).map((technology) => (
                        <Badge key={technology} className="px-2 py-1 text-[9px]">
                          {technology}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="editorial-container relative z-10 mt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-500">
        <span>SCROLL / ARROW KEYS / SWIPE TO EXPLORE</span>
        <span aria-hidden="true">— — — — →</span>
      </div>
    </section>
  );
}
