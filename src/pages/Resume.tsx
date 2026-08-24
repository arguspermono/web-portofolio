import { About } from '../components/sections/About';
import { Experience } from '../components/sections/Experience';
import { Education } from '../components/sections/Education';
import { Skills } from '../components/sections/Skills';
import { Section } from '../components/ui/Section';
import { FadeIn } from '../components/ui/FadeIn';

export function Resume() {
  return (
    <div className="pt-24 pb-12">
      {/* Resume Header */}
      <Section className="pb-0 pt-12">
        <FadeIn delay={0.1} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b-2 border-mecha-dark pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">Curriculum Vitae</h1>
            <p className="text-lg text-zinc-600 font-mono tracking-wide">Professional Profile & Experience</p>
          </div>
          
          <a 
            href="/resume.pdf" 
            download
            className="inline-flex items-center gap-2 p-4 border-2 border-mecha-dark bg-mecha-blue text-white font-mono text-sm font-bold tracking-wider hover:-translate-y-1 hover:-translate-x-1 hover:shadow-hard transition-all group"
          >
            <span>DOWNLOAD PDF</span>
            <span className="transform group-hover:translate-y-1 transition-transform">↓</span>
          </a>
        </FadeIn>
      </Section>

      {/* Reuse existing components */}
      <About />
      <Experience />
      <Education />
      <Skills />
    </div>
  );
}
