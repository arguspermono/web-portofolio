import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FadeIn } from '../components/ui/FadeIn';
import { Badge } from '../components/ui/Badge';
import { experiences, education } from '../data/experience';
import { skills } from '../data/skills';
import { FaGithub, FaLinkedin, FaEnvelope, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import { RoleTicker } from '../components/ui/RoleTicker';
import { AsciiProfilePortrait } from '../components/ui/AsciiProfilePortrait';
import { Section } from '../components/ui/Section';
import { SectionHeader } from '../components/ui/SectionHeader';
import { FeaturedProjectRail } from '../components/ui/FeaturedProjectRail';
import { projects } from '../data/projects';
import { certifications } from '../data/certifications';
import { useTheme } from '../context/ThemeContext';

const featuredProjects = projects.filter((project) =>
  ['mediapens', 'memospace', 'webcut'].includes(project.slug),
);
const toolkitSkillCount = skills.reduce((total, category) => total + category.skills.length, 0);

export function AboutPage() {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const reduceMotion = useReducedMotion();
  const { tokens } = useTheme();

  const handleCopyEmail = () => {
    const email = import.meta.env.VITE_EMAIL || 'aryabaguspermono@gmail.com';
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="blueprint-surface text-mecha-black min-h-screen">
      {/* ── 1. EDITORIAL IDENTITY HERO ─────────────────────────── */}
      <section
        id="intro"
        className="intro-hero editorial-section relative isolate flex min-h-[calc(100svh-6.5rem)] flex-col overflow-hidden border-b border-mecha-light1 bg-white/90"
      >
        <div className="editorial-container relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.2em] sm:text-[10px]">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 theme-accent-bg" aria-hidden="true" />
              <span className="font-semibold theme-accent-text">MODULE.001 // ABOUT</span>
            </div>
          </div>

          <div className="intro-hero-stage relative flex min-h-[clamp(22rem,63svh,47rem)] flex-1 items-end justify-center">
            <motion.div
              className="intro-hero-portrait relative z-10 -mb-[clamp(3.5rem,10vw,9rem)] w-[min(90vw,58svh,42rem)] sm:w-[min(62vw,76svh,54rem)]"
              initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.12, ease: 'easeOut' }}
            >
              <AsciiProfilePortrait />
            </motion.div>

            <div className="absolute left-0 top-[22%] hidden max-w-36 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-neutral-500 lg:block">
              MULTIMEDIA<br />ENGINEERING<br />TECHNOLOGIST
            </div>
          </div>

          <h1
            className="hero-wordmark relative z-20 -mt-1 whitespace-nowrap text-center font-display text-[clamp(1.5rem,12vw,13rem)] font-black uppercase leading-[0.9] tracking-[-0.085em]"
          >
            <span style={{ color: tokens.wordmarkPrimary }}>ARYA</span>
            <span>{' '}</span>
            <span style={{ color: tokens.wordmarkSecondary }}>BAGUS</span>
          </h1>

          <div className="mx-auto mt-3 max-w-full">
            <RoleTicker />
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 border-t border-mecha-light1 pt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-neutral-500 sm:text-[9px]">
            <span>DESIGNING DIGITAL EXPERIENCES</span>
            <a href="#background" className="shrink-0 transition-colors hover:text-[var(--content-primary)]">
              SCROLL TO EXPLORE ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. BIOGRAPHY STATEMENT ───────────────────────────── */}
      <Section id="background" borderBottom>
        <SectionHeader number="02" label="BACKGROUND" title="BIOGRAPHICAL SUMMARY" />
        <div className="max-w-4xl space-y-4 font-sans text-base leading-relaxed text-neutral-800 md:text-lg">
          <p>
            I am a Multimedia Engineering Technology student at Politeknik Elektronika Negeri Surabaya with a passion for high-craft digital experiences, full-stack software development, and modern engineering paradigms.
          </p>
          <p>
            My development expertise covers modern web architectures and mobile frameworks including Laravel, Flutter, React, PHP, TypeScript, and Tailwind CSS. Concurrently, I actively explore applied Machine Learning, Generative AI integration, and automated data pipelines.
          </p>
          <p>
            Beyond technical programming, I serve as the Team Leader and former Webmaster at EEPIS News and Network Team (ENT). This leadership role has sharpened my project management capabilities and collaboration skills in high-stakes environments.
          </p>
        </div>
      </Section>

      <FeaturedProjectRail projects={featuredProjects} />

      {/* ── 4. PROJECT DEVELOPMENT NOTES ─────────────────────── */}
      <section id="process" className="editorial-section relative isolate border-b border-mecha-light1">
        <div className="editorial-container relative z-10 py-[var(--editorial-section-space)]">
          <SectionHeader number="04" label="DEVELOPMENT NOTES" title="BEHIND THE PROJECTS" />
          <p className="mb-10 max-w-2xl border-t border-mecha-light1 pt-5 font-sans text-sm leading-relaxed text-neutral-700 sm:text-base">
            Each case file pairs the delivered features with the role and toolchain recorded for that project—an outline of how the work moves from interface to system.
          </p>
          <div className="grid gap-x-8 md:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <article key={project.id} className="border-t border-mecha-black py-5 sm:py-7">
                <div className="mb-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-500">
                  <span>BUILD NOTE // {String(index + 1).padStart(2, '0')}</span>
                  <span>{project.category}</span>
                </div>
                <h3 className="mb-3 font-display text-xl font-bold uppercase tracking-tight text-[var(--content-primary)] sm:text-2xl">
                  {project.title}
                </h3>
                <p className="min-h-20 font-sans text-sm leading-relaxed text-neutral-700">
                  {project.keyFeatures.slice(0, 2).join(' ')}
                </p>
                <div className="my-5 border-t border-mecha-light1 pt-4">
                  <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-500">
                    ROLE // {project.role}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((technology) => (
                      <Badge key={technology} className="px-2 py-1 text-[9px]">
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex min-h-10 items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--content-primary)] hover:text-[var(--content-highlight)]"
                >
                  OPEN CASE FILE <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. INTERACTIVE EXPERIENCE & EDUCATION SWITCHER ───── */}
      <section id="experience" className="editorial-section border-b border-mecha-light1">
        <div className="editorial-container relative pb-8 pt-[var(--editorial-section-space)]">
          <SectionHeader number="05" label="CAREER HISTORY" title="EXPERIENCE & EDUCATION" />
        </div>
        <div className="editorial-container">
          <div className="mb-6 flex flex-wrap items-center gap-2 border border-[var(--content-border)] bg-[var(--content-subtle-bg)] p-2.5">
            <button
              onClick={() => setActiveTab('experience')}
              aria-pressed={activeTab === 'experience'}
              className={cn(
                'min-h-10 px-4 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors',
                activeTab === 'experience'
                  ? 'theme-accent-bg font-bold'
                  : 'bg-[var(--content-bg)] text-[var(--content-text)] theme-accent-hover'
              )}
            >
              WORK EXPERIENCE ({experiences.length})
            </button>

            <button
              onClick={() => setActiveTab('education')}
              aria-pressed={activeTab === 'education'}
              className={cn(
                'min-h-10 px-4 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors',
                activeTab === 'education'
                  ? 'theme-accent-bg font-bold'
                  : 'bg-[var(--content-bg)] text-[var(--content-text)] theme-accent-hover'
              )}
            >
              EDUCATION ({education.length})
            </button>
          </div>

          {activeTab === 'experience' ? (
            <div className="space-y-4 pb-[var(--editorial-section-space)]">
              {experiences.map((exp) => (
                <FadeIn key={exp.id} className="editorial-data-card">
                  <div className="grid grid-cols-1 gap-5 p-5 sm:p-8 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-4">
                      <div className="mb-1 font-mono text-[10px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
                        {exp.startDate} — {exp.endDate}
                      </div>
                      <div className="font-mono text-xs tracking-[0.08em] theme-accent-text uppercase font-bold">
                        {exp.company}
                      </div>
                    </div>
                    <div className="lg:col-span-8">
                      <h3 className="mb-3 font-display text-xl font-bold tracking-tight theme-accent-text uppercase md:text-2xl">
                        {exp.role}
                      </h3>
                      <ul className="space-y-2.5 font-sans text-sm leading-relaxed text-[var(--content-text)] md:text-base">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-1 font-mono theme-accent-text" aria-hidden="true">▪</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 pb-[var(--editorial-section-space)] md:grid-cols-2">
              {education.map((edu) => (
                <FadeIn key={edu.id} className="editorial-data-card flex flex-col justify-between p-5 sm:p-8">
                  <div>
                    <div className="mb-1 font-mono text-[10px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
                      {edu.startDate} — {edu.endDate}
                    </div>
                    <h3 className="mb-1 font-display text-xl font-bold tracking-tight theme-accent-text uppercase">
                      {edu.degree}
                    </h3>
                    <div className="mb-4 border-b border-[var(--content-border)] pb-3 font-mono text-xs tracking-[0.08em] theme-accent-text uppercase">
                      {edu.institution}
                    </div>
                    <ul className="space-y-2 font-sans text-sm leading-relaxed text-[var(--content-text)]">
                      {edu.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="font-mono theme-accent-text" aria-hidden="true">—</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 6. TECHNICAL SKILLS ──────────────────────────────── */}
      <section id="toolkit" className="toolkit-section editorial-section relative isolate overflow-hidden border-b border-mecha-light1">
        <div className="editorial-container relative z-10 py-[var(--editorial-section-space)]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5 border-b border-[var(--content-border)] pb-5">
            <SectionHeader number="06" label="TECHNICAL PRACTICE" title="TOOLKIT" className="mb-5 md:mb-0" />
            <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-500 sm:text-[10px]">
              {skills.length} DISCIPLINES <span className="px-2 text-[var(--content-highlight)]">//</span>
              {toolkitSkillCount} TOOLS IN ROTATION
            </p>
          </div>

          <div className="toolkit-category-list">
            {skills.map((category, categoryIndex) => (
              <FadeIn key={category.title} className="toolkit-category-row">
                <h3 className="toolkit-category-title">
                  <span>{String(categoryIndex + 1).padStart(2, '0')}</span>
                  {category.title}
                </h3>
                <div className="toolkit-skill-list">
                  {category.skills.map((skill, skillIndex) => (
                    <span key={skill} className="toolkit-skill-chip">
                      <span>{String(skillIndex + 1).padStart(2, '0')}</span>
                      {skill}
                    </span>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CERTIFICATIONS ────────────────────────────────── */}
      <section id="certifications" className="editorial-section border-b border-mecha-light1">
        <div className="editorial-container py-[var(--editorial-section-space)]">
          <SectionHeader number="07" label="CERTIFICATIONS" title="EVIDENCE OF CURIOSITY" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.slice(0, 3).map((certification, index) => (
              <Link
                key={certification.id}
                to="/certificates"
                className="group border-t border-mecha-black py-5 transition-colors hover:border-[var(--content-highlight)] sm:py-6"
              >
                <div className="mb-8 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-500">
                  <span>CREDENTIAL // {String(index + 1).padStart(2, '0')}</span>
                  <span>{certification.date}</span>
                </div>
                <h3 className="mb-3 font-display text-lg font-bold uppercase leading-tight tracking-tight text-[var(--content-primary)] transition-colors group-hover:text-[var(--content-highlight)]">
                  {certification.title}
                </h3>
                <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-neutral-500">
                  {certification.organization}
                </div>
              </Link>
            ))}
          </div>
          <Link
            to="/certificates"
            className="mt-8 inline-flex min-h-11 items-center gap-3 border-b border-mecha-black pb-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-mecha-black transition-colors hover:text-[var(--content-highlight)]"
          >
            BROWSE ALL CREDENTIALS <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* ── 8. DIRECT CONTACT & CHANNELS ─────────────────────── */}
      <section id="contact" className="editorial-section border-b border-mecha-light1">
        <div className="editorial-container pb-[var(--editorial-section-space)] pt-[var(--editorial-section-space)]">
          <div className="grid grid-cols-1 border border-[var(--content-border)] bg-[var(--content-bg)] lg:grid-cols-12">
            <div className="flex flex-col justify-between border-b border-mecha-light1 bg-[var(--content-subtle-bg)] p-6 sm:p-10 md:p-14 lg:col-span-5 lg:border-b-0 lg:border-r">
              <div>
                <SectionHeader number="08" label="CONTACT" title="LET'S CONNECT" className="mb-6" />
                <p className="font-sans text-sm leading-relaxed text-neutral-700 md:text-base">
                  Open for software engineering opportunities, internships, and technical collaborations. Reach out directly or copy my email address.
                </p>
              </div>
              <div className="mt-8 font-mono text-xs uppercase tracking-wider text-neutral-500">
                LOCATION: SURABAYA, INDONESIA
              </div>
            </div>

            <div className="divide-y divide-[var(--content-border)] lg:col-span-7">
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label={copiedEmail ? 'Email address copied' : 'Copy email address'}
                className="group flex w-full items-center justify-between p-6 text-left transition-colors duration-150 theme-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--content-primary)] sm:p-8"
              >
                <span>
                  <span className="mb-1 block font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-neutral-400">
                    PRIMARY EMAIL <span className="hidden sm:inline">// CLICK TO COPY</span>
                  </span>
                  <span className="flex items-center gap-3 font-display text-base font-bold uppercase tracking-wide sm:text-lg">
                    <FaEnvelope className="theme-hover-icon transition-colors" />
                    <span>{import.meta.env.VITE_EMAIL || 'aryabaguspermono@gmail.com'}</span>
                  </span>
                </span>

                <span aria-live="polite" className="font-mono text-xs font-semibold uppercase tracking-widest">
                  {copiedEmail ? (
                    <span className="flex items-center gap-1.5 text-emerald-600 group-hover:text-emerald-400">
                      <FaCheck /> COPIED!
                    </span>
                  ) : (
                    <span className="hidden text-neutral-400 group-hover:text-white sm:inline">COPY →</span>
                  )}
                </span>
              </button>

              <a
                href={import.meta.env.VITE_GITHUB || 'https://github.com/arguspermono'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 transition-colors duration-150 theme-accent-hover sm:p-8"
              >
                <div>
                  <div className="mb-1 font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-neutral-400">
                    GITHUB REPOSITORY
                  </div>
                  <div className="flex items-center gap-3 font-display text-base font-bold uppercase tracking-wide sm:text-lg">
                    <FaGithub className="theme-hover-icon transition-colors" />
                    <span>github.com/arguspermono</span>
                  </div>
                </div>
                <div className="hidden font-mono text-xs uppercase tracking-widest text-neutral-400 transition-all group-hover:translate-x-1 group-hover:text-white sm:block">
                  VISIT →
                </div>
              </a>

              <a
                href={import.meta.env.VITE_LINKEDIN || 'https://www.linkedin.com/in/arya-bagus/'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 transition-colors duration-150 theme-accent-hover sm:p-8"
              >
                <div>
                  <div className="mb-1 font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-neutral-400">
                    LINKEDIN NETWORK
                  </div>
                  <div className="flex items-center gap-3 font-display text-base font-bold uppercase tracking-wide sm:text-lg">
                    <FaLinkedin className="theme-hover-icon transition-colors" />
                    <span>linkedin.com/in/arya-bagus</span>
                  </div>
                </div>
                <div className="hidden font-mono text-xs uppercase tracking-widest text-neutral-400 transition-all group-hover:translate-x-1 group-hover:text-white sm:block">
                  VISIT →
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
