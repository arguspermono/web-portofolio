import { FadeIn } from '../ui/FadeIn';
import { Badge } from '../ui/Badge';
import { experiences, education } from '../../data/experience';
import { skills } from '../../data/skills';
import type { SectionComponentProps } from '../../types';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

// ── Reusable panel row divider ──────────────────────────────────────────────
function PanelRow({ index, label }: { index: string; label: string }) {
  return (
    <div className="border-b border-t border-mecha-light1 px-8 md:px-12 py-3 flex items-center gap-4 bg-mecha-white">
      <span className="font-mono text-[10px] tracking-[0.25em] text-mecha-dark3 uppercase">
        ▶ MODULE.{index} //
      </span>
      <span className="font-display font-extrabold text-xs tracking-[0.25em] text-mecha-black uppercase">
        {label}
      </span>
      <div className="flex-1 border-t border-mecha-light1" />
    </div>
  );
}

export function About({ sectionIndex: _i = 1 }: SectionComponentProps) {
  return (
    <section id="about" className="bg-mecha-white text-mecha-black">

      {/* ══ SECTION PANEL HEADER ══════════════════════════════════ */}
      <div className="border-b border-mecha-light1 px-8 md:px-12 py-4 flex items-center gap-4">
        <span className="font-mono text-[10px] tracking-[0.25em] text-mecha-dark3 uppercase">▶ MODULE.001 //</span>
        <div className="flex-1 border-t border-mecha-light1" />
      </div>

      {/* Section title strip */}
      <div className="border-b border-mecha-light1 px-8 md:px-12 py-10 md:py-16">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-mecha-black uppercase leading-none">
            ABOUT
          </h2>
        </FadeIn>
      </div>

      {/* ══ BIO ══════════════════════════════════════════════════ */}
      <PanelRow index="001.A" label="BIO" />
      <div className="border-b border-mecha-light1 px-8 md:px-12 py-12 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="font-mono text-[10px] tracking-[0.25em] text-mecha-dark3 uppercase mb-3">
            IDENTITY
          </div>
          <p className="text-xl font-display font-bold uppercase text-mecha-black leading-tight">
            Arya Bagus<br />Permono
          </p>
          <div className="mt-4 font-mono text-[10px] tracking-[0.2em] text-mecha-dark3 space-y-1 uppercase">
            <div>Role // Web Developer</div>
            <div>Status // Available</div>
            <div>Base // Surabaya, ID</div>
          </div>
        </div>
        <div className="md:col-span-8 space-y-5">
          <FadeIn delay={0.1}>
            <p className="text-base leading-relaxed text-mecha-black font-sans normal-case tracking-normal">
              I'm a Multimedia Engineering Technology student at Politeknik
              Elektronika Negeri Surabaya with a strong interest in technology,
              web development, and digital experiences. I have experience
              developing web and mobile applications using technologies such as
              Laravel, Flutter, PHP, JavaScript, and Tailwind CSS, while also
              exploring data science, machine learning, and artificial intelligence.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base leading-relaxed text-mecha-dark3 font-sans normal-case tracking-normal">
              Beyond technical development, I actively contribute to EEPIS News
              and Network Team (ENT), where I currently serve as the team leader
              and have previously worked as a Webmaster. These experiences have
              strengthened my ability to collaborate, communicate, manage
              projects, and solve problems in a team environment.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-base leading-relaxed text-mecha-dark3 font-sans normal-case tracking-normal">
              I enjoy learning new technologies and turning ideas into practical
              solutions, always looking for opportunities to expand my technical
              and creative skills and create digital products that are useful and meaningful.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* ══ EXPERIENCE ══════════════════════════════════════════ */}
      <PanelRow index="001.B" label="EXPERIENCE" />
      <div className="border-b border-mecha-light1">
        {experiences.map((exp, index) => (
          <FadeIn
            key={exp.id}
            delay={0.1 * (index + 1)}
            className="border-b border-mecha-light1 last:border-b-0 px-8 md:px-12 py-10 grid md:grid-cols-12 gap-8"
          >
            <div className="md:col-span-4">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-mecha-dark3 mb-2">
                EXP.{String(index + 1).padStart(2, '0')}
              </div>
              <div className="font-mono text-xs font-bold tracking-widest text-mecha-black uppercase">
                {exp.startDate} — {exp.endDate}
              </div>
            </div>
            <div className="md:col-span-8">
              <h3 className="text-lg font-bold tracking-tight mb-1 text-mecha-black uppercase">
                {exp.role}
              </h3>
              <div className="font-mono text-xs tracking-widest mb-5 text-mecha-dark3 uppercase">
                {exp.company}
              </div>
              <ul className="space-y-2">
                {exp.responsibilities.map((r: string, i: number) => (
                  <li key={i} className="flex gap-3 text-sm text-mecha-dark3 font-sans normal-case tracking-normal leading-relaxed">
                    <span className="font-mono shrink-0 mt-0.5 text-mecha-light1">▪</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* ══ EDUCATION ════════════════════════════════════════════ */}
      <PanelRow index="001.C" label="EDUCATION" />
      <div className="border-b border-mecha-light1 px-8 md:px-12 py-12 grid md:grid-cols-2 gap-6">
        {education.map((edu, index) => (
          <FadeIn
            key={edu.id}
            delay={0.1 * (index + 1)}
            className="border border-mecha-light1 p-6 relative"
          >
            <div className="absolute top-0 right-0 w-3 h-3 border-l border-b border-mecha-light1" />
            <div className="font-mono text-[10px] tracking-widest uppercase mb-1 text-mecha-dark3">
              {edu.startDate} — {edu.endDate}
            </div>
            <h3 className="text-sm font-bold mb-1 text-mecha-black uppercase tracking-wide">
              {edu.degree}
            </h3>
            <div className="font-mono text-xs tracking-wider mb-4 border-b pb-4 border-mecha-light1 text-mecha-dark3 uppercase">
              {edu.institution}
            </div>
            <ul className="space-y-2">
              {edu.details.map((detail: string, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-mecha-dark3 font-sans normal-case tracking-normal">
                  <span className="font-mono shrink-0 text-mecha-dark3">—</span>
                  {detail}
                </li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>

      {/* ══ SKILLS ═══════════════════════════════════════════════ */}
      <PanelRow index="001.D" label="SKILLS" />
      <div className="border-b border-mecha-light1 px-8 md:px-12 py-12 grid md:grid-cols-2 gap-6">
        {skills.map((category, index) => (
          <FadeIn
            key={category.title}
            delay={0.1 * (index + 1)}
            className="border border-mecha-light1 p-6 relative"
          >
            <div className="absolute top-0 right-0 w-3 h-3 border-l border-b border-mecha-light1" />
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1 text-mecha-dark3">
              MODULE {String(index + 1).padStart(2, '0')}
            </div>
            <h3 className="text-sm font-bold mb-5 border-b pb-3 border-mecha-light1 text-mecha-black uppercase tracking-wide">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill: string) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>

      {/* ══ CONTACT ══════════════════════════════════════════════ */}
      <PanelRow index="001.E" label="CONTACT" />
      <div className="px-8 md:px-12 py-12 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <FadeIn delay={0.1}>
            <p className="text-base text-mecha-dark3 leading-relaxed font-sans normal-case tracking-normal">
              I'm currently open for internship opportunities and freelance
              projects. Feel free to reach out through any of the channels below.
            </p>
          </FadeIn>
        </div>
        <div className="md:col-span-8">
          <FadeIn delay={0.2} className="border border-mecha-light1 relative">
            <div className="absolute top-0 right-0 w-3 h-3 border-l border-b border-mecha-light1" />
            <div className="border-b border-mecha-light1 px-6 py-3">
              <span className="font-mono text-[10px] tracking-[0.25em] text-mecha-dark3 uppercase">
                TRANSMISSION CHANNELS
              </span>
            </div>
            {[
              {
                label: 'EMAIL',
                value: import.meta.env.VITE_EMAIL,
                href: `mailto:${import.meta.env.VITE_EMAIL}`,
                icon: null,
              },
              {
                label: 'GITHUB',
                value: import.meta.env.VITE_GITHUB,
                href: import.meta.env.VITE_GITHUB,
                icon: <FaGithub className="text-sm" />,
              },
              {
                label: 'LINKEDIN',
                value: import.meta.env.VITE_LINKEDIN,
                href: import.meta.env.VITE_LINKEDIN,
                icon: <FaLinkedin className="text-sm" />,
              },
            ].map((ch) => (
              <a
                key={ch.label}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-6 py-4 border-b border-mecha-light1 last:border-b-0 group hover:bg-mecha-light2 transition-colors"
              >
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-mecha-dark3 mb-0.5">
                    {ch.label}
                  </div>
                  <div className="font-bold text-sm text-mecha-black uppercase tracking-wide flex items-center gap-2">
                    {ch.icon}
                    {ch.value}
                  </div>
                </div>
                <span className="font-mono text-mecha-dark3 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            ))}
          </FadeIn>
        </div>
      </div>

    </section>
  );
}
