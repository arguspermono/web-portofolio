import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FadeIn } from '../components/ui/FadeIn';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { experiences, education } from '../data/experience';
import { skills } from '../data/skills';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import { RoleTicker } from '../components/ui/RoleTicker';
import { AsciiProfilePortrait } from '../components/ui/AsciiProfilePortrait';
import { useTheme } from '../context/ThemeContext';

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
      <section className="relative isolate min-h-[calc(100svh-3.5rem)] overflow-hidden border-b border-mecha-light1 bg-white/90">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-y-0 left-1/3 border-l border-mecha-light1/70" />
          <div className="absolute inset-y-0 right-1/3 border-l border-mecha-light1/70" />
          <div
            className="absolute left-1/2 top-1/2 h-[min(80vw,42rem)] w-[min(80vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-3xl"
            style={{ backgroundColor: tokens.contentHighlight }}
          />
        </div>

        <div className="relative mx-auto grid min-h-[inherit] max-w-[1600px] grid-cols-1 items-center gap-8 px-5 py-8 sm:px-8 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)_minmax(0,0.9fr)] lg:gap-6 lg:px-8 xl:gap-10 xl:px-12">
          <motion.div
            className="order-3 min-w-0 lg:order-1"
            initial={reduceMotion ? false : { opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
          >
            <FadeIn className="ascii-spotlight flex h-full flex-col justify-center border-l-2 border-mecha-light1 bg-white/70 py-5 pl-5 pr-2 sm:pl-7 lg:py-8">
              <div className="mb-8 flex items-center gap-2.5">
                <span className="h-2 w-2 theme-accent-bg" />
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] theme-accent-text sm:text-xs">
                  MODULE.001 // ABOUT
                </span>
              </div>

              <div className="mb-4">
                <RoleTicker />
              </div>

              <p className="max-w-sm font-sans text-sm leading-relaxed text-neutral-700 sm:text-base">
                Multimedia Engineering Technology student at Politeknik Elektronika Negeri Surabaya. Specializing in full-stack web and mobile application engineering, 3D multimedia systems, and applied artificial intelligence solutions.
              </p>

              <div className="mt-8 space-y-3 border-t border-mecha-light1 pt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-600 sm:text-[10px]">
                <span className="flex items-center gap-2">
                  <FaBriefcase className="shrink-0 theme-accent-text" />
                  STATUS: AVAILABLE FOR WORK
                </span>
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="shrink-0 theme-accent-text" />
                  BASE: SURABAYA, ID
                </span>
              </div>
            </FadeIn>
          </motion.div>

          <motion.div
            className="order-2 mx-auto w-full min-w-0 max-w-[22rem] sm:max-w-lg lg:order-2"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            transition={{ duration: 0.75, delay: 0.12, ease: 'easeOut' }}
          >
            <div className="relative px-2 sm:px-5 lg:px-0">
              <div className="absolute left-2 top-[18%] z-10 bg-mecha-black px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-white sm:text-[9px]">
                SUBJECT // 001
              </div>
              <AsciiProfilePortrait />
              <div className="mt-4 flex items-center justify-between border-t border-mecha-light1 pt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-500">
                <span>CALLSIGN: ARGUS</span>
                <span>ASCII MATRIX / ACTIVE</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 min-w-0 lg:order-3"
            initial={reduceMotion ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: 'easeOut' }}
          >
            <div className="flex h-full flex-col justify-center py-2 lg:py-8">
              <div className="mb-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-neutral-500 sm:text-[10px]">
                <span style={{ color: tokens.contentHighlight }}>01 / 04</span>
                <span className="h-px flex-1 bg-mecha-light1" />
                <span>IDENTITY</span>
              </div>

              <h1
                className="mb-6 font-display font-black uppercase leading-[0.82] tracking-[-0.06em] theme-accent-text"
                style={{ fontSize: 'clamp(3.2rem, 5vw, 6.2rem)' }}
              >
                ARYA
                <span className="block" style={{ color: tokens.contentHighlight }}>BAGUS</span>
                <span className="block">PERMONO</span>
              </h1>

              <p className="mb-7 max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-neutral-500 sm:text-xs">
                MULTIMEDIA ENGINEER
                <br />
                DESIGNING DIGITAL EXPERIENCES
              </p>

              <div className="flex flex-wrap gap-2.5">
                <Link to="/projects">
                  <Button variant="primary" size="md">
                    EXPLORE PROJECTS →
                  </Button>
                </Link>
                <Link to="/certificates">
                  <Button variant="secondary" size="md">
                    CERTIFICATES
                  </Button>
                </Link>
                <Link to="/resume">
                  <Button variant="secondary" size="md">
                    RESUME (CV)
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. BIOGRAPHY STATEMENT ───────────────────────────── */}
      <section className="p-6 sm:p-10 md:p-14 border-b border-mecha-light1 max-w-4xl">
        <h2 className="font-display font-bold text-xs md:text-sm tracking-[0.2em] theme-accent-text uppercase mb-4">
          // BIOGRAPHICAL SUMMARY
        </h2>
        <div className="space-y-4 font-sans text-neutral-800 text-base md:text-lg leading-relaxed">
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
      </section>

      {/* ── 3. INTERACTIVE EXPERIENCE & EDUCATION SWITCHER ───── */}
      <section className="border-b border-mecha-light1">
        {/* Interactive Segmented Switcher Bar */}
        <div className="border-b border-mecha-light1 bg-mecha-light2 px-6 md:px-14 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('experience')}
              className={cn(
                'px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors border',
                activeTab === 'experience'
                  ? 'theme-accent-bg font-bold'
                  : 'bg-white text-neutral-600 border-mecha-light1 theme-accent-hover'
              )}
            >
              WORK EXPERIENCE ({experiences.length})
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={cn(
                'px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors border',
                activeTab === 'education'
                  ? 'theme-accent-bg font-bold'
                  : 'bg-white text-neutral-600 border-mecha-light1 theme-accent-hover'
              )}
            >
              EDUCATION ({education.length})
            </button>
          </div>

          <div className="font-mono text-xs tracking-wider text-neutral-500 uppercase hidden sm:block">
            ACTIVE TAB: {activeTab.toUpperCase()}
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'experience' ? (
          <div className="divide-y divide-mecha-light1">
            {experiences.map((exp) => (
              <FadeIn key={exp.id} className="neo-card m-4 sm:m-6">
                <div className="p-6 sm:p-10 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-4">
                    <div className="font-mono text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-1">
                      {exp.startDate} — {exp.endDate}
                    </div>
                    <div className="font-mono text-xs tracking-wider theme-accent-text uppercase font-bold">
                      {exp.company}
                    </div>
                  </div>
                  <div className="lg:col-span-8">
                    <h3 className="font-display font-bold text-xl md:text-2xl tracking-wide theme-accent-text uppercase mb-3">
                      {exp.role}
                    </h3>
                    <ul className="space-y-2.5 font-sans text-neutral-700 text-sm md:text-base leading-relaxed">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="font-mono theme-accent-text mt-1">▪</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-mecha-light1">
            {education.map((edu) => (
              <FadeIn key={edu.id} className="neo-card m-4 sm:m-6 p-6 sm:p-10 md:p-14 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-1">
                    {edu.startDate} — {edu.endDate}
                  </div>
                  <h3 className="font-display font-bold text-xl tracking-tight theme-accent-text uppercase mb-1">
                    {edu.degree}
                  </h3>
                  <div className="font-mono text-xs tracking-wider theme-accent-text uppercase mb-4 pb-3 border-b border-mecha-light1">
                    {edu.institution}
                  </div>
                  <ul className="space-y-2 font-sans text-neutral-700 text-sm leading-relaxed">
                    {edu.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="font-mono text-neutral-400">—</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      {/* ── 4. TECHNICAL SKILLS ──────────────────────────────── */}
      <section className="border-b border-mecha-light1">
        <div className="p-6 md:px-14 py-3.5 bg-mecha-light2 border-b border-mecha-light1">
          <h2 className="font-display font-bold text-xs md:text-sm tracking-[0.2em] theme-accent-text uppercase m-0">
            // TECHNICAL CAPABILITIES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 border-b border-mecha-light1">
          {skills.map((cat) => (
            <FadeIn key={cat.title} className="neo-card m-4 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-base tracking-wider theme-accent-text uppercase mb-4 pb-2 border-b border-mecha-light1">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── 5. DIRECT CONTACT & CHANNELS ─────────────────────── */}
      <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 border-b border-mecha-light1">
        <div className="lg:col-span-5 p-6 sm:p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-mecha-light1 bg-mecha-light2/40 flex flex-col justify-between">
          <div>
            <h2 className="font-display font-bold text-2xl tracking-tight theme-accent-text uppercase mb-3">
              LET'S CONNECT
            </h2>
            <p className="font-sans text-neutral-700 text-sm md:text-base leading-relaxed">
              Open for software engineering opportunities, internships, and technical collaborations. Reach out directly or copy my email address.
            </p>
          </div>
          <div className="mt-8 font-mono text-xs tracking-wider text-neutral-500 uppercase">
            LOCATION: SURABAYA, INDONESIA
          </div>
        </div>

        <div className="lg:col-span-7 divide-y divide-mecha-light1">
          {/* Interactive Email Copy Button */}
          <div
            onClick={handleCopyEmail}
            className="p-6 sm:p-8 flex items-center justify-between group theme-accent-hover transition-colors duration-150 cursor-pointer"
          >
            <div>
              <div className="font-mono text-xs tracking-widest text-neutral-500 group-hover:text-neutral-400 uppercase mb-1">
                PRIMARY EMAIL // CLICK TO COPY
              </div>
              <div className="font-display font-bold text-base sm:text-lg tracking-wide uppercase flex items-center gap-3">
                <FaEnvelope className="theme-hover-icon transition-colors" />
                <span>{import.meta.env.VITE_EMAIL || 'aryabaguspermono@gmail.com'}</span>
              </div>
            </div>

            <div className="font-mono text-xs tracking-widest uppercase font-semibold">
              {copiedEmail ? (
                <span className="flex items-center gap-1.5 text-emerald-600 group-hover:text-emerald-400">
                  <FaCheck /> COPIED!
                </span>
              ) : (
                <span className="text-neutral-400 group-hover:text-white">
                  COPY →
                </span>
              )}
            </div>
          </div>

          {/* GitHub Channel */}
          <a
            href={import.meta.env.VITE_GITHUB || 'https://github.com/arguspermono'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 sm:p-8 flex items-center justify-between group theme-accent-hover transition-colors duration-150"
          >
            <div>
              <div className="font-mono text-xs tracking-widest text-neutral-500 group-hover:text-neutral-400 uppercase mb-1">
                GITHUB REPOSITORY
              </div>
              <div className="font-display font-bold text-base sm:text-lg tracking-wide uppercase flex items-center gap-3">
                <FaGithub className="theme-hover-icon transition-colors" />
                <span>github.com/arguspermono</span>
              </div>
            </div>
            <div className="font-mono text-xs tracking-widest uppercase text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all">
              VISIT →
            </div>
          </a>

          {/* LinkedIn Channel */}
          <a
            href={import.meta.env.VITE_LINKEDIN || 'https://www.linkedin.com/in/arya-bagus/'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 sm:p-8 flex items-center justify-between group theme-accent-hover transition-colors duration-150"
          >
            <div>
              <div className="font-mono text-xs tracking-widest text-neutral-500 group-hover:text-neutral-400 uppercase mb-1">
                LINKEDIN NETWORK
              </div>
              <div className="font-display font-bold text-base sm:text-lg tracking-wide uppercase flex items-center gap-3">
                <FaLinkedin className="theme-hover-icon transition-colors" />
                <span>linkedin.com/in/arya-bagus</span>
              </div>
            </div>
            <div className="font-mono text-xs tracking-widest uppercase text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all">
              VISIT →
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
