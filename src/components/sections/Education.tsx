import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { education } from '../../data/experience';
import { FadeIn } from '../ui/FadeIn';

export function Education() {
  return (
    <Section id="education" className="bg-mecha-panel">
      <FadeIn className="space-y-4 mb-12">
        <Badge variant="accent">04</Badge>
        <h2>Education</h2>
        <div className="w-12 h-1 bg-mecha-blue"></div>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-8">
        {education.map((edu, index) => (
          <FadeIn
            key={edu.id}
            delay={0.1 * (index + 1)}
            className="border-2 border-mecha-dark bg-white p-6 shadow-hard"
          >
            <div className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase mb-1">
              {edu.startDate} — {edu.endDate}
            </div>
            <h3 className="text-base mb-1">{edu.degree}</h3>
            <div className="font-mono text-xs text-zinc-500 tracking-wider mb-4 border-b-2 border-mecha-dark pb-4">
              {edu.institution}
            </div>
            <ul className="space-y-2">
              {edu.details.map((detail, i) => (
                <li key={i} className="flex gap-3 text-sm text-zinc-600">
                  <span className="text-mecha-blue font-bold mt-0.5 shrink-0">—</span>
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
