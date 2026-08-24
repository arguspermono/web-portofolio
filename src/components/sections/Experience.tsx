import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { experiences } from '../../data/experience';
import { FadeIn } from '../ui/FadeIn';

export function Experience() {
  return (
    <Section id="experience">
      <FadeIn className="space-y-4 mb-12">
        <Badge variant="warning">03</Badge>
        <h2>Experience</h2>
        <div className="w-12 h-1 bg-mecha-yellow"></div>
      </FadeIn>

      <div className="space-y-0">
        {experiences.map((exp, index) => (
          <FadeIn
            key={exp.id}
            delay={0.1 * (index + 1)}
            className="grid md:grid-cols-12 gap-6 md:gap-8 border-b-2 border-mecha-dark py-8 first:pt-0 last:border-b-0 last:pb-0"
          >
            {/* Left — Date + Index */}
            <div className="md:col-span-4">
              <div className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase mb-1">
                LOG-{String(index + 1).padStart(2, '0')}
              </div>
              <div className="font-mono text-sm font-bold text-mecha-dark">
                {exp.startDate} — {exp.endDate}
              </div>
            </div>

            {/* Right — Role + Details */}
            <div className="md:col-span-8">
              <h3 className="text-base mb-1">{exp.role}</h3>
              <div className="font-mono text-xs text-zinc-500 tracking-wider mb-4">
                {exp.company}
              </div>
              <ul className="space-y-2">
                {exp.responsibilities.map((r, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-600">
                    <span className="text-mecha-red font-bold mt-0.5 shrink-0">—</span>
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
