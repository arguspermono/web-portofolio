import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { skills } from '../../data/skills';
import { FadeIn } from '../ui/FadeIn';

export function Skills() {
  return (
    <Section id="skills" className="bg-mecha-panel">
      <FadeIn className="space-y-4 mb-12">
        <Badge variant="accent">02</Badge>
        <h2>Skills</h2>
        <div className="w-12 h-1 bg-mecha-blue"></div>
      </FadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((category, index) => (
          <FadeIn
            key={category.title}
            delay={0.1 * (index + 1)}
            className="border-2 border-mecha-dark bg-white p-6 shadow-hard"
          >
            <div className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase mb-1">
              MODULE
            </div>
            <h3 className="text-base mb-4 border-b-2 border-mecha-dark pb-3">
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
