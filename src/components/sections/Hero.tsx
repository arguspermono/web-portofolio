import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { FadeIn } from '../ui/FadeIn';
import { SectionHeader } from '../ui/SectionHeader';

export function Hero() {
  return (
    <Section id="hero" className="min-h-[85vh] flex flex-col justify-center border-b border-mecha-light1 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full relative z-10">

        {/* Text Content */}
        <div className="lg:col-span-7 xl:col-span-7 min-w-0 flex flex-col order-2 lg:order-1">

          <FadeIn delay={0.1}>
            <div>
              <SectionHeader
                number="00"
                label="WELCOME"
                className="sticky top-24"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="
              text-balance
              text-5xl
              sm:text-6xl
              lg:text-7xl
              xl:text-8xl
              font-extrabold
              tracking-tight
              text-mecha-black
              leading-[0.95]
              max-w-full
              break-words
            ">
              Building Digital Experiences Through Code & Creativity.
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="max-w-xl text-lg text-mecha-dark2 leading-relaxed mt-8">
              I'm a Multimedia Engineering Technology student with experience in
              web and mobile development, and a growing interest in data science,
              machine learning, and artificial intelligence.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-wrap gap-4 pt-4 lg:pt-8">
              <Button variant="primary" size="lg">
                <a href="#projects">VIEW MY WORK</a>
              </Button>

              <Button variant="secondary" size="lg">
                <a href="#contact">CONTACT ME</a>
              </Button>
            </div>
          </FadeIn>

        </div>


        {/* Profile Photo Container */}
        <div className="
          lg:col-span-5
          lg:justify-self-end
          flex
          justify-center
          order-1
          lg:order-2
          w-full
          min-w-0
        ">
          <FadeIn
            delay={0.5}
            className="w-full max-w-[320px] xl:max-w-[380px] aspect-[4/5] relative group"
          >
            <div className="
              absolute
              inset-0
              bg-mecha-light2
              border
              border-mecha-light1
              overflow-hidden
              flex
              items-center
              justify-center
              transition-colors
              duration-500
              group-hover:border-mecha-dark2
            ">

              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-mecha-black opacity-30" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-mecha-black opacity-30" />

              <div className="
                font-mono
                text-[10px]
                text-mecha-dark3
                tracking-[0.2em]
                text-center
                space-y-3
                opacity-50
              ">
                <div className="w-12 h-px bg-mecha-dark3 mx-auto" />
                <div>IMAGE.PENDING</div>
                <div className="w-12 h-px bg-mecha-dark3 mx-auto" />
              </div>

            </div>

            <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-mecha-black" />
            <div className="absolute -top-1 -right-1 w-1 h-1 bg-mecha-black" />

          </FadeIn>
        </div>

      </div>
    </Section>
  );
}
