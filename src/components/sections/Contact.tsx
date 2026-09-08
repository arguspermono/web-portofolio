import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { FadeIn } from '../ui/FadeIn';
import { SectionHeader } from '../ui/SectionHeader';
import type { SectionComponentProps } from '../../types';

export function Contact({ theme = 'light', sectionIndex = 7 }: SectionComponentProps) {
  const isDark = theme === 'dark';
  const numberStr = sectionIndex.toString().padStart(2, '0');

  return (
    <Section 
      id="contact" 
      borderBottom={false} 
      className={isDark ? "bg-mecha-black text-mecha-white relative overflow-hidden" : "bg-mecha-light2 relative overflow-hidden"}
    >
      {isDark && (
        <div className="absolute top-0 right-0 w-64 h-64 border-l border-b border-mecha-dark3 opacity-20 pointer-events-none"></div>
      )}

      <SectionHeader number={numberStr} label="CONTACT" title="Let's connect." dark={isDark} />
      <div className="grid md:grid-cols-12 gap-12 relative z-10">
        {/* Left text */}
        <div className="md:col-span-5 space-y-4">
          <FadeIn direction="right" delay={0.1}>
            <p className={`text-lg mt-4 ${isDark ? 'text-mecha-light1' : 'text-mecha-dark2'}`}>
              I'm currently open for internship opportunities and freelance
              projects. Let's connect!
            </p>
          </FadeIn>
        </div>

        {/* Right — links */}
        <div className="md:col-span-7 flex items-center">
          <FadeIn direction="left" delay={0.3} className={`w-full border p-8 relative space-y-6 ${isDark ? 'border-mecha-dark3 bg-mecha-dark1' : 'border-mecha-light1 bg-mecha-white'}`}>
            <div className={`absolute top-0 right-0 w-2 h-2 border-l border-b ${isDark ? 'border-mecha-dark3 bg-mecha-dark2' : 'border-mecha-light1 bg-mecha-light2'}`}></div>
            <div className={`font-mono text-[10px] tracking-widest uppercase mb-4 ${isDark ? 'text-mecha-light1' : 'text-mecha-dark3'}`}>
              TRANSMISSION CHANNELS
            </div>

            <div className="space-y-4">
              <a
                href="mailto:todo@example.com"
                className={`flex items-center justify-between border-b pb-4 group ${isDark ? 'border-mecha-dark3' : 'border-mecha-light1'}`}
              >
                <div>
                  <div className={`font-mono text-[10px] tracking-widest uppercase ${isDark ? 'text-mecha-light1' : 'text-mecha-dark3'}`}>
                    EMAIL
                  </div>
                  <div className={`font-bold text-sm transition-colors ${isDark ? 'text-mecha-white group-hover:text-mecha-light1' : 'text-mecha-black group-hover:text-mecha-dark2'}`}>
                    todo@example.com
                  </div>
                </div>
                <span className={`group-hover:translate-x-1 transition-all ${isDark ? 'text-mecha-light1' : 'text-mecha-dark3'}`}>→</span>
              </a>

              <a
                href="#"
                className={`flex items-center justify-between border-b pb-4 group ${isDark ? 'border-mecha-dark3' : 'border-mecha-light1'}`}
              >
                <div>
                  <div className={`font-mono text-[10px] tracking-widest uppercase ${isDark ? 'text-mecha-light1' : 'text-mecha-dark3'}`}>
                    GITHUB
                  </div>
                  <div className={`font-bold text-sm transition-colors ${isDark ? 'text-mecha-white group-hover:text-mecha-light1' : 'text-mecha-black group-hover:text-mecha-dark2'}`}>
                    github.com/arguspermono
                  </div>
                </div>
                <span className={`group-hover:translate-x-1 transition-all ${isDark ? 'text-mecha-light1' : 'text-mecha-dark3'}`}>→</span>
              </a>

              <a
                href="#"
                className={`flex items-center justify-between border-b pb-4 group ${isDark ? 'border-mecha-dark3' : 'border-mecha-light1'}`}
              >
                <div>
                  <div className={`font-mono text-[10px] tracking-widest uppercase ${isDark ? 'text-mecha-light1' : 'text-mecha-dark3'}`}>
                    LINKEDIN
                  </div>
                  <div className={`font-bold text-sm transition-colors ${isDark ? 'text-mecha-white group-hover:text-mecha-light1' : 'text-mecha-black group-hover:text-mecha-dark2'}`}>
                    linkedin.com/in/[TODO]
                  </div>
                </div>
                <span className={`group-hover:translate-x-1 transition-all ${isDark ? 'text-mecha-light1' : 'text-mecha-dark3'}`}>→</span>
              </a>
            </div>

            <div className="pt-2">
              <Button variant="primary" size="lg" className="w-full justify-center">
                SEND MESSAGE
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
