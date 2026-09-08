import { Section } from '../ui/Section';
import { education } from '../../data/experience';
import { FadeIn } from '../ui/FadeIn';
import { SectionHeader } from '../ui/SectionHeader';
import type { SectionComponentProps } from '../../types';

export function Education({ theme = 'light', sectionIndex = 5 }: SectionComponentProps) {
  const isDark = theme === 'dark';
  const numberStr = sectionIndex.toString().padStart(2, '0');

  return (
    <Section 
      id="education" 
      className={isDark ? "bg-mecha-black text-mecha-white border-b border-mecha-dark3 relative overflow-hidden" : "bg-mecha-white border-b border-mecha-light1"}
    >
      {isDark && (
        <div className="absolute top-0 right-0 w-64 h-64 border-l border-b border-mecha-dark3 opacity-20 pointer-events-none"></div>
      )}
      
      <SectionHeader number={numberStr} label="EDUCATION" title="Academic Background." dark={isDark} />

      <div className="grid md:grid-cols-2 gap-8 relative z-10">
        {education.map((edu, index) => (
          <FadeIn
            key={edu.id}
            delay={0.1 * (index + 1)}
            className={`border p-6 relative group ${isDark ? 'border-mecha-dark3 bg-mecha-dark1' : 'border-mecha-light1 bg-mecha-white'}`}
          >
            {/* Subtle technical corner */}
            <div className={`absolute top-0 right-0 w-2 h-2 border-l border-b ${isDark ? 'border-mecha-dark3 bg-mecha-dark2' : 'border-mecha-light1 bg-mecha-light2'}`}></div>
            
            <div className={`font-mono text-[10px] tracking-widest uppercase mb-1 ${isDark ? 'text-mecha-light1' : 'text-mecha-dark3'}`}>
              {edu.startDate} — {edu.endDate}
            </div>
            <h3 className={`text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-mecha-black'}`}>{edu.degree}</h3>
            <div className={`font-mono text-xs tracking-wider mb-4 border-b pb-4 ${isDark ? 'text-mecha-light1 border-mecha-dark3' : 'text-mecha-dark2 border-mecha-light1'}`}>
              {edu.institution}
            </div>
            <ul className="space-y-2">
              {edu.details.map((detail, i) => (
                <li key={i} className={`flex gap-3 text-sm ${isDark ? 'text-mecha-light1' : 'text-mecha-dark2'}`}>
                  <span className={`font-bold mt-0.5 shrink-0 ${isDark ? 'text-mecha-dark3' : 'text-mecha-dark3'}`}>—</span>
                  {detail}
                </li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
