import { FadeIn } from '../ui/FadeIn';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section id="hero" className="min-h-screen bg-mecha-white relative overflow-hidden flex flex-col">

      {/* ── Panel header bar ─────────────────────────────────── */}
      <div className="border-b border-mecha-light1 px-8 md:px-12 py-3 flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.25em] text-mecha-dark3 uppercase">▶ MODULE.000 //</span>
        <div className="flex-1 border-t border-mecha-light1" />
      </div>

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 border-b border-mecha-light1">

        {/* Left — text block */}
        <div className="lg:col-span-7 flex flex-col justify-between border-r border-mecha-light1 p-8 md:p-12 lg:p-16">

          <div className="space-y-8 flex-1 flex flex-col justify-center">
            <FadeIn delay={0.1}>
              <div className="font-mono text-[10px] tracking-[0.3em] text-mecha-dark3 uppercase mb-6">
                ARYA BAGUS // MULTIMEDIA ENGINEERING
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold tracking-tight leading-[0.92] text-mecha-black uppercase">
                Building<br />
                Digital<br />
                Experiences<br />
                <span className="text-mecha-dark3">Through Code</span><br />
                <span className="text-mecha-dark3">&amp; Creativity.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="max-w-lg text-base text-mecha-dark3 leading-relaxed font-sans normal-case tracking-normal">
                Multimedia Engineering Technology student at PENS with experience in
                web &amp; mobile development, and a growing interest in data science,
                machine learning, and AI.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="#projects">
                  <Button variant="primary" size="lg">VIEW MY WORK</Button>
                </a>
                <a href="#about">
                  <Button variant="secondary" size="lg">CONTACT ME</Button>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Bottom status bar */}
          <div className="border-t border-mecha-light1 pt-4 mt-8 flex gap-8 font-mono text-[9px] tracking-[0.2em] text-mecha-dark3 uppercase">
            <span>STATUS // AVAILABLE</span>
            <span>LOCATION // SURABAYA, ID</span>
          </div>
        </div>

        {/* Right — photo panel */}
        <div className="lg:col-span-5 relative overflow-hidden min-h-[50vh] lg:min-h-0">
          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-mecha-black opacity-40 z-10" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-mecha-black opacity-40 z-10" />

          {/* Module label overlay */}
          <div className="absolute top-4 right-4 z-10 font-mono text-[9px] tracking-[0.2em] text-mecha-black opacity-40 uppercase">
            IMG.001
          </div>

          <FadeIn delay={0.5} className="w-full h-full">
            <img
              src="/assets/img/profile/bagus-1.png"
              alt="Arya Bagus"
              className="w-full h-full object-cover object-top grayscale opacity-85"
              style={{ minHeight: '400px' }}
            />
            {/* Photo overlay — bottom strip */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-mecha-light1 bg-mecha-white/90 px-4 py-2">
              <div className="font-mono text-[9px] tracking-[0.2em] text-mecha-dark3 uppercase">
                ARYA BAGUS // MULTIMEDIA ENGINEER
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── Bottom info bar ───────────────────────────────────── */}
      <div className="border-t border-mecha-light1 px-8 md:px-12 py-3 flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-mecha-dark3 uppercase">
        <span>SYS.READY // PORTFOLIO v1.0</span>
        <span>2026</span>
      </div>
    </section>
  );
}
