import { useState } from 'react';
import { FadeIn } from '../components/ui/FadeIn';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { experiences, education } from '../data/experience';
import { skills } from '../data/skills';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import { RoleTicker } from '../components/ui/RoleTicker';
import { ProfilePhotoDeck } from '../components/ui/ProfilePhotoDeck';

export function AboutPage() {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    const email = import.meta.env.VITE_EMAIL || 'aryabaguspermono@gmail.com';
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="blueprint-surface text-mecha-black min-h-screen">
      {/* ── 1. UNIFIED CLEAN HERO & DOSSIER HEADER ─────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-mecha-light1">
        {/* Left Column: Introduction & Identity */}
        <div className="lg:col-span-7 xl:col-span-8 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-mecha-light1 bg-mecha-white">
          <div>
            {/* Minimalist Module Indicator */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 theme-accent-bg inline-block" />
              <span className="font-mono text-xs tracking-widest theme-accent-text uppercase font-medium">
                MODULE.001 // ABOUT
              </span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[0.95] theme-accent-text uppercase mb-4">
              ARYA BAGUS<br />
              <span>PERMONO</span>
            </h1>

            <div className="mb-6">
              <RoleTicker />
            </div>

            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-neutral-800 font-sans font-normal mb-8">
              Multimedia Engineering Technology student at Politeknik Elektronika Negeri Surabaya. Specializing in full-stack web and mobile application engineering, 3D multimedia systems, and applied artificial intelligence solutions.
            </p>

            <div className="flex flex-wrap gap-3">
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

          <div className="border-t border-mecha-light1 pt-6 mt-10 flex flex-wrap gap-6 font-mono text-xs tracking-wider text-neutral-600 uppercase">
            <span className="flex items-center gap-2">
              <FaBriefcase className="theme-accent-text" /> STATUS: AVAILABLE FOR WORK
            </span>
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="theme-accent-text" /> BASE: SURABAYA, ID
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Portrait Photo Stack */}
        <div className="lg:col-span-5 xl:col-span-4 bg-mecha-light2 flex flex-col justify-between">
          <div className="w-full flex-grow flex items-center justify-center p-6 md:p-10">
            <ProfilePhotoDeck />
          </div>

          <div className="border-t border-mecha-light1 bg-mecha-white px-6 py-3 font-mono text-xs tracking-widest text-neutral-600 uppercase flex justify-between items-center">
            <span>CALLSIGN: ARGUS</span>
            <span>DEVELOPER DOSSIER</span>
          </div>
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
