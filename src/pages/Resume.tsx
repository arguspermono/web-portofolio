import { About } from '../components/sections/About';
import { Experience } from '../components/sections/Experience';
import { Education } from '../components/sections/Education';
import { Skills } from '../components/sections/Skills';
import { Certifications } from '../components/sections/Certifications';
import { AtsResume } from '../components/sections/AtsResume';
import { Section } from '../components/ui/Section';
import { FadeIn } from '../components/ui/FadeIn';

export function Resume() {
  return (
    <>
      <div className="pt-24 pb-12 print:hidden">
        {/* Resume Header */}
        <Section className="pb-0 pt-12">
          <FadeIn delay={0.1} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b-2 border-mecha-dark pb-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">Curriculum Vitae</h1>
              <p className="text-lg text-zinc-600 font-mono tracking-wide">Professional Profile & Experience</p>
            </div>
            
            <button 
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 p-4 border-2 border-mecha-dark hover:bg-none bg-mecha-white hover:bg-black text-black hover:text-white font-mono text-sm font-bold tracking-wider hover:text-gray hover:shadow-hard transition-all group"
            >
              <span>DOWNLOAD PDF (ATS)</span>
            </button>
          </FadeIn>
        </Section>

        {/* Reuse existing components */}
        {[About, Experience, Education, Skills, Certifications].map((Component, index) => (
          <Component 
            key={index} 
            theme={index % 2 === 0 ? 'light' : 'dark'} 
            sectionIndex={index + 1} 
          />
        ))}
      </div>

      <div className="hidden print:block w-full bg-white print:bg-white text-black min-h-screen">
        <AtsResume />
      </div>
    </>
  );
}
