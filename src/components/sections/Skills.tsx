import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { skills } from '../../data/skills';
import { FadeIn } from '../ui/FadeIn';
import { SectionHeader } from '../ui/SectionHeader';
import type { SectionComponentProps } from '../../types';

export function Skills({ theme = 'dark', sectionIndex = 2 }: SectionComponentProps) {
  const isDark = theme === 'dark';
  const numberStr = sectionIndex.toString().padStart(2, '0');

  return (
    <Section 
      id="skills" 
      className={isDark ? "bg-mecha-black text-mecha-white border-b border-mecha-dark3 relative overflow-hidden" : "bg-mecha-white text-mecha-black border-b border-mecha-light1 relative overflow-hidden"}
    >
      {/* Decorative mechanical elements for dark section */}
      {isDark && (
        <div className="absolute top-0 right-0 w-64 h-64 border-l border-b border-mecha-dark3 opacity-20 pointer-events-none"></div>
      )}

      <SectionHeader number={numberStr} label="SKILLS" title="Technical Arsenal." dark={isDark} />

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 relative z-10">
        {skills.map((category, index) => (
          <FadeIn
            key={category.title}
            delay={0.1 * (index + 1)}
            className={`border p-6 sm:p-8 relative group ${isDark ? 'border-mecha-dark3 bg-mecha-dark1' : 'border-mecha-light1 bg-mecha-white'}`}
          >
            {/* Subtle technical corner */}
            <div className={`absolute top-0 right-0 w-2 h-2 border-l border-b ${isDark ? 'border-mecha-dark3 bg-mecha-dark2' : 'border-mecha-light1 bg-mecha-light2'}`}></div>
            
            <div className={`font-mono text-[10px] tracking-[0.2em] uppercase mb-1 ${isDark ? 'text-mecha-light1' : 'text-mecha-dark3'}`}>
              MODULE {String(index + 1).padStart(2, '0')}
            </div>
            <h3 className={`text-lg mb-6 border-b pb-3 ${isDark ? 'text-white border-mecha-dark3' : 'text-mecha-black border-mecha-light1'}`}>
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
