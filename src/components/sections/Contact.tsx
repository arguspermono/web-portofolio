import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function Contact() {
  return (
    <Section id="contact" borderBottom={false}>
      <div className="grid md:grid-cols-12 gap-12">
        {/* Left label */}
        <div className="md:col-span-5 space-y-4">
          <Badge variant="warning">05</Badge>
          <h2>Contact</h2>
          <div className="w-12 h-1 bg-mecha-red"></div>
          <p className="text-lg">
            I'm currently open for internship opportunities and freelance
            projects. Let's connect!
          </p>
        </div>

        {/* Right — links */}
        <div className="md:col-span-7 flex items-center">
          <div className="w-full border-2 border-mecha-dark bg-white p-8 shadow-hard space-y-6">
            <div className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase mb-4">
              TRANSMISSION CHANNELS
            </div>

            <div className="space-y-4">
              <a
                href="mailto:todo@example.com"
                className="flex items-center justify-between border-b-2 border-zinc-200 pb-4 group"
              >
                <div>
                  <div className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
                    EMAIL
                  </div>
                  <div className="font-bold text-sm group-hover:text-mecha-blue transition-colors">
                    todo@example.com
                  </div>
                </div>
                <span className="text-zinc-400 group-hover:text-mecha-blue group-hover:translate-x-1 transition-all">→</span>
              </a>

              <a
                href="#"
                className="flex items-center justify-between border-b-2 border-zinc-200 pb-4 group"
              >
                <div>
                  <div className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
                    GITHUB
                  </div>
                  <div className="font-bold text-sm group-hover:text-mecha-blue transition-colors">
                    github.com/arguspermono
                  </div>
                </div>
                <span className="text-zinc-400 group-hover:text-mecha-blue group-hover:translate-x-1 transition-all">→</span>
              </a>

              <a
                href="#"
                className="flex items-center justify-between border-b-2 border-zinc-200 pb-4 group"
              >
                <div>
                  <div className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
                    LINKEDIN
                  </div>
                  <div className="font-bold text-sm group-hover:text-mecha-blue transition-colors">
                    linkedin.com/in/[TODO]
                  </div>
                </div>
                <span className="text-zinc-400 group-hover:text-mecha-blue group-hover:translate-x-1 transition-all">→</span>
              </a>
            </div>

            <div className="pt-2">
              <Button variant="primary" size="lg" className="w-full justify-center">
                SEND MESSAGE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
