import { Section } from '../ui/Section';
import { experiences } from '../../data/experience';
import { FadeIn } from '../ui/FadeIn';
import { SectionHeader } from '../ui/SectionHeader';
import type { SectionComponentProps } from '../../types';

export function Experience({ theme = 'dark', sectionIndex = 4 }: SectionComponentProps) {
  const isDark = theme === 'dark';
  const numberStr = sectionIndex.toString().padStart(2, '0');

  return (
    <Section 
      id="experience" 
      className={isDark ? "bg-mecha-black text-mecha-white border-b border-mecha-dark3 relative overflow-hidden" : "bg-mecha-white text-mecha-black border-b border-mecha-light1 relative overflow-hidden"}
    >
      {/* Decorative mechanical elements for dark section */}
      {isDark && (
        <div className="absolute top-0 right-0 w-64 h-64 border-l border-b border-mecha-dark3 opacity-20 pointer-events-none"></div>
      )}

      <SectionHeader number={numberStr} label="EXPERIENCE" title="Career Journey." dark={isDark} />

      <div className="space-y-0 relative z-10">
        {experiences.map((exp, index) => (
          <FadeIn
            key={exp.id}
            delay={0.1 * (index + 1)}
            className={`grid md:grid-cols-12 gap-6 md:gap-8 border-b py-8 first:pt-0 last:border-b-0 last:pb-0 relative z-10 ${isDark ? 'border-mecha-dark3' : 'border-mecha-light1'}`}
          >
            {/* Left — Date + Index */}
            <div className="md:col-span-4">
              <div className={`font-mono text-[10px] tracking-[0.2em] uppercase mb-2 ${isDark ? 'text-mecha-light1' : 'text-mecha-dark2'}`}>
                Experience {String(index + 1).padStart(2, '0')}
              </div>
              <div className={`font-mono text-xs font-bold tracking-widest ${isDark ? 'text-mecha-light1' : 'text-mecha-dark2'}`}>
                {exp.startDate} — {exp.endDate}
              </div>
            </div>

            {/* Right — Role + Details */}
            <div className="md:col-span-8">
              <h3 className={`text-lg md:text-xl font-bold tracking-tight mb-1 ${isDark ? 'text-white' : 'text-mecha-black'}`}>
                {exp.role}
              </h3>
              <div className={`font-mono text-xs tracking-widest mb-6 ${isDark ? 'text-mecha-light1' : 'text-mecha-dark2'}`}>
                {exp.company}
              </div>
              <ul className="space-y-3">
                {exp.responsibilities.map((r, i) => (
                  <li key={i} className={`flex gap-4 text-sm leading-relaxed opacity-80 ${isDark ? 'text-mecha-light1' : 'text-mecha-dark2'}`}>
                    <span className={`font-mono text-[10px] mt-1 shrink-0 ${isDark ? 'text-mecha-dark3' : 'text-mecha-light1'}`}>■</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
