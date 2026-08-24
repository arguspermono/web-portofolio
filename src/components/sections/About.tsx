import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { FadeIn } from '../ui/FadeIn';

export function About() {
  return (
    <Section id="about">
      <div className="grid md:grid-cols-12 gap-12">
        {/* Section label */}
        <div className="md:col-span-4">
          <FadeIn direction="right" delay={0.1} className="sticky top-24 space-y-4">
            <Badge variant="warning">01</Badge>
            <h2>About</h2>
            <div className="w-12 h-1 bg-mecha-red"></div>
          </FadeIn>
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
