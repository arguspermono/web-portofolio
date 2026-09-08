import { Section } from '../ui/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { FadeIn } from '../ui/FadeIn';
import type { SectionComponentProps } from '../../types';

export function About({ theme = 'light', sectionIndex = 1 }: SectionComponentProps) {
  const isDark = theme === 'dark';
  const numberStr = sectionIndex.toString().padStart(2, '0');

  return (
    <Section 
      id="about"
      className={isDark ? "bg-mecha-black text-mecha-white border-b border-mecha-dark3 relative overflow-hidden" : ""}
    >
      {isDark && (
        <div className="absolute top-0 right-0 w-64 h-64 border-l border-b border-mecha-dark3 opacity-20 pointer-events-none"></div>
      )}
      <div className="grid md:grid-cols-12 gap-12 relative z-10">
        {/* Section label */}
        <div className="md:col-span-4">
          <SectionHeader number={numberStr} label="ABOUT ME" title="Who am I." className="sticky top-24" dark={isDark} />
        </div>

        {/* Content */}
        <div className="md:col-span-8 space-y-6">
          <FadeIn delay={0.2}>
            <p className="text-lg">
              I'm a Multimedia Engineering Technology student at Politeknik
              Elektronika Negeri Surabaya with a strong interest in technology,
              web development, and digital experiences. I have experience
              developing web and mobile applications using technologies such as
              Laravel, Flutter, PHP, JavaScript, and Tailwind CSS, while also
              exploring data science, machine learning, and artificial
              intelligence.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p>
              Beyond technical development, I actively contribute to EEPIS News
              and Network Team (ENT), where I currently serve as the team leader
              and have previously worked as a Webmaster. These experiences have
              strengthened my ability to collaborate, communicate, manage
              projects, and solve problems in a team environment.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p>
              I enjoy learning new technologies and turning ideas into practical
              solutions. I'm always looking for opportunities to expand my
              technical and creative skills, work with people from different
              backgrounds, and create digital products that are useful and
              meaningful.
            </p>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
