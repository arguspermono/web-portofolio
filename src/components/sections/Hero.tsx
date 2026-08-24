import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { FadeIn } from '../ui/FadeIn';

export function Hero() {
  return (
    <Section id="hero" className="min-h-[85vh] flex items-center" borderBottom>
      <div className="grid md:grid-cols-12 gap-8 items-center">
        {/* Text Content */}
        <div className="md:col-span-8 space-y-8">
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-mecha-red"></div>
              <Badge variant="accent">SYS // ONLINE</Badge>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-balance">
            Building Digital Experiences Through Code & Creativity.
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="max-w-2xl text-lg">
            I'm a Multimedia Engineering Technology student with experience in
            web and mobile development, and a growing interest in data science,
            machine learning, and artificial intelligence. I enjoy combining
            technology and creativity to build meaningful digital experiences.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button variant="primary" size="lg">
              <a href="#projects">VIEW MY WORK</a>
            </Button>
            <Button variant="secondary" size="lg">
              <a href="#contact">CONTACT ME</a>
              </Button>
            </div>
          </FadeIn>
        </div>

        {/* Right column — decorative panel */}
        <div className="hidden md:flex md:col-span-4 justify-end">
          <FadeIn delay={0.5} direction="left" className="w-full max-w-[280px] space-y-4">
            <div className="border-2 border-mecha-dark p-4 bg-white shadow-hard">
              <div className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase mb-2">
                UNIT // STATUS
              </div>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-500">ROLE</span>
                  <span className="font-bold">DEVELOPER</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-500">FOCUS</span>
                  <span className="font-bold">WEB / MOBILE</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-500">STATUS</span>
                  <span className="font-bold text-green-600">AVAILABLE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">BASE</span>
                  <span className="font-bold">SURABAYA, ID</span>
                </div>
              </div>
            </div>
            <div className="h-1 bg-mecha-red"></div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
