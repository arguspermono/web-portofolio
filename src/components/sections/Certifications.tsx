import { Section } from '../ui/Section';
import { certifications } from '../../data/certifications';
import { FadeIn } from '../ui/FadeIn';
import { SectionHeader } from '../ui/SectionHeader';
import { useRef } from 'react';
import type { SectionComponentProps } from '../../types';

export function Certifications({ theme = 'dark', sectionIndex = 6 }: SectionComponentProps) {
  const isDark = theme === 'dark';
  const numberStr = sectionIndex.toString().padStart(2, '0');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : 320;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Section 
      id="certifications" 
      className={isDark ? "bg-mecha-black text-mecha-white relative overflow-hidden border-b border-mecha-dark3" : "bg-mecha-white text-mecha-black relative overflow-hidden border-b border-mecha-light1"}
    >
      {/* Decorative mechanical elements for dark section */}
      {isDark && (
        <div className="absolute top-0 right-0 w-64 h-64 border-l border-b border-mecha-dark3 opacity-20 pointer-events-none"></div>
      )}
      
      <SectionHeader number={numberStr} label="CERTIFICATIONS" title="Learning & Achievements." dark={isDark}>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className={`w-10 h-10 flex items-center justify-center border transition-all group ${isDark ? 'border-mecha-dark3 text-mecha-light1 hover:bg-mecha-dark1 hover:border-mecha-light1 hover:text-white' : 'border-mecha-light1 text-mecha-dark3 hover:bg-mecha-light2 hover:border-mecha-dark2 hover:text-mecha-black'}`} aria-label="Scroll left">
            <span className="font-mono transform group-hover:-translate-x-1 transition-transform">←</span>
          </button>
          <button onClick={() => scroll('right')} className={`w-10 h-10 flex items-center justify-center border transition-all group ${isDark ? 'border-mecha-dark3 text-mecha-light1 hover:bg-mecha-dark1 hover:border-mecha-light1 hover:text-white' : 'border-mecha-light1 text-mecha-dark3 hover:bg-mecha-light2 hover:border-mecha-dark2 hover:text-mecha-black'}`} aria-label="Scroll right">
            <span className="font-mono transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </SectionHeader>

      <div ref={scrollRef} className="flex overflow-x-auto gap-6 pb-8 relative z-10 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {certifications.map((cert, index) => (
          <FadeIn key={cert.id} delay={0.1 * (index + 1)} className="flex-none w-[85vw] sm:w-[320px] lg:w-[350px] snap-start">
            <div className={`flex flex-col h-full border p-4 transition-colors duration-300 group relative ${isDark ? 'bg-mecha-dark1 border-mecha-dark3 hover:border-mecha-light1' : 'bg-mecha-white border-mecha-light1 hover:border-mecha-dark3'}`}>
              {/* Image Container */}
              <div className={`aspect-[4/3] border mb-4 relative overflow-hidden flex items-center justify-center ${isDark ? 'bg-mecha-dark2 border-mecha-dark3' : 'bg-mecha-light2 border-mecha-light1'}`}>
                {cert.imageUrl ? (
                  <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                ) : (
                  <div className={`font-mono text-[10px] tracking-widest ${isDark ? 'text-mecha-dark3' : 'text-mecha-dark3'}`}>IMG.UNAVAILABLE</div>
                )}
                
                {/* Subtle corner detail */}
                <div className={`absolute top-0 right-0 w-3 h-3 border-l border-b transition-colors ${isDark ? 'border-mecha-dark3 group-hover:border-mecha-light1' : 'border-mecha-light1 group-hover:border-mecha-dark3'}`}></div>
              </div>
              
              {/* Content */}
              <div className="flex flex-col flex-grow">
                <h4 className={`text-base font-bold leading-tight mb-2 transition-colors ${isDark ? 'text-mecha-white group-hover:text-white' : 'text-mecha-black group-hover:text-black'}`}>{cert.title}</h4>
                <div className="mt-auto pt-4">
                  <div className={`font-mono text-[10px] tracking-widest uppercase mb-1 ${isDark ? 'text-mecha-light1' : 'text-mecha-dark2'}`}>
                    {cert.organization}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-500 tracking-widest">
                    {cert.date}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
