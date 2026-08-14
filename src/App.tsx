import { Button } from './components/ui/Button';
import { Badge } from './components/ui/Badge';
import { Card } from './components/ui/Card';
import { Section } from './components/ui/Section';
import { FadeIn } from './components/ui/FadeIn';

function App() {
  return (
    <div className="min-h-screen bg-mecha-light text-mecha-dark">
      <header className="sticky top-0 z-50 bg-mecha-light border-b-2 border-mecha-dark">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-display font-extrabold text-xl tracking-widest uppercase flex items-center gap-2">
            <div className="w-4 h-4 bg-mecha-red border-2 border-mecha-dark"></div>
            Portfolio // SYS
          </div>
          <nav className="space-x-8 hidden md:flex font-mono text-xs font-bold tracking-widest uppercase">
            <a href="#typography" className="hover:text-mecha-blue transition-colors">TYPOGRAPHY</a>
            <a href="#components" className="hover:text-mecha-blue transition-colors">COMPONENTS</a>
            <a href="#cards" className="hover:text-mecha-blue transition-colors">CARDS</a>
          </nav>
        </div>
      </header>

      <main>
        <Section id="typography">
          <FadeIn>
            <div className="space-y-4 mb-12 border-b-2 border-mecha-dark pb-6">
              <Badge variant="accent">SYS-01</Badge>
              <h2>Font Hierarchy & Colors</h2>
            </div>
            
            <div className="grid gap-12 md:grid-cols-2">
              <div className="space-y-8">
                <div>
                  <small className="block mb-2 text-mecha-blue">H1 // HERO</small>
                  <h1 className="mb-2">Heading 1</h1>
                  <p className="text-zinc-500 font-mono text-xs uppercase">Outfit / ExtraBold / 4rem</p>
                </div>
                <div>
                  <small className="block mb-2 text-mecha-blue">H2 // SECTION</small>
                  <h2 className="mb-2">Heading 2</h2>
                  <p className="text-zinc-500 font-mono text-xs uppercase">Outfit / Bold / 2.5rem</p>
                </div>
                <div>
                  <small className="block mb-2 text-mecha-blue">H3 // COMPONENT</small>
                  <h3 className="mb-2">Heading 3</h3>
                  <p className="text-zinc-500 font-mono text-xs uppercase">Outfit / Bold / 1.5rem</p>
                </div>
                <div>
                  <small className="block mb-2 text-mecha-blue">P // BODY</small>
                  <p className="mb-2">Body Text. The quick brown fox jumps over the lazy dog. This text is meant to be highly legible, structured, and technical in appearance.</p>
                  <p className="text-zinc-500 font-mono text-xs uppercase">Inter / Regular / 1rem</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="mb-6 font-mono text-sm tracking-widest text-zinc-500">COLOR PALETTE // PAL-01</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col border-2 border-mecha-dark bg-mecha-light p-4 shadow-hard">
                    <div className="flex-grow min-h-[3rem]"></div>
                    <div className="mt-4 border-t-2 border-mecha-dark pt-2">
                      <div className="font-bold text-xs">BASE (LIGHT)</div>
                      <div className="font-mono text-[10px] text-zinc-500">#FAFAFA</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col border-2 border-mecha-dark bg-white p-4 shadow-hard">
                    <div className="flex-grow min-h-[3rem]"></div>
                    <div className="mt-4 border-t-2 border-mecha-dark pt-2">
                      <div className="font-bold text-xs">SURFACE</div>
                      <div className="font-mono text-[10px] text-zinc-500">#FFFFFF</div>
                    </div>
                  </div>

                  <div className="flex flex-col border-2 border-mecha-dark bg-mecha-dark text-white p-4 shadow-[4px_4px_0px_0px_#E4E4E7]">
                    <div className="flex-grow min-h-[3rem]"></div>
                    <div className="mt-4 border-t-2 border-zinc-600 pt-2">
                      <div className="font-bold text-xs">DARK CONTRAST</div>
                      <div className="font-mono text-[10px] text-zinc-400">#18181B</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col border-2 border-mecha-dark bg-mecha-blue text-white p-4 shadow-hard">
                    <div className="flex-grow min-h-[3rem]"></div>
                    <div className="mt-4 border-t-2 border-blue-800 pt-2">
                      <div className="font-bold text-xs">ACCENT // BLUE</div>
                      <div className="font-mono text-[10px] text-blue-200">#2563EB</div>
                    </div>
                  </div>

                  <div className="flex flex-col border-2 border-mecha-dark bg-mecha-red text-white p-4 shadow-hard">
                    <div className="flex-grow min-h-[3rem]"></div>
                    <div className="mt-4 border-t-2 border-red-800 pt-2">
                      <div className="font-bold text-xs">ACCENT // RED</div>
                      <div className="font-mono text-[10px] text-red-200">#DC2626</div>
                    </div>
                  </div>

                  <div className="flex flex-col border-2 border-mecha-dark bg-mecha-yellow text-mecha-dark p-4 shadow-hard">
                    <div className="flex-grow min-h-[3rem]"></div>
                    <div className="mt-4 border-t-2 border-yellow-700 pt-2">
                      <div className="font-bold text-xs">ACCENT // YELLOW</div>
                      <div className="font-mono text-[10px] text-yellow-800">#EAB308</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Section>

        <Section id="components" className="bg-mecha-panel">
          <FadeIn direction="up">
            <div className="space-y-4 mb-12 border-b-2 border-mecha-dark pb-6">
              <Badge variant="warning">SYS-02</Badge>
              <h2>UI Controls & Indicators</h2>
            </div>

            <div className="space-y-16">
              <div>
                <h3 className="mb-8 font-mono text-sm tracking-widest text-zinc-500">BUTTONS // INTERACTIVE</h3>
                <div className="flex flex-wrap gap-8 items-center">
                  <Button variant="primary" size="lg">PRIMARY (LG)</Button>
                  <Button variant="primary">PRIMARY (MD)</Button>
                  <Button variant="primary" size="sm">PRIMARY (SM)</Button>
                </div>
                <div className="flex flex-wrap gap-8 items-center mt-8">
                  <Button variant="secondary" size="lg">SECONDARY (LG)</Button>
                  <Button variant="secondary">SECONDARY (MD)</Button>
                  <Button variant="secondary" size="sm">SECONDARY (SM)</Button>
                </div>
                <div className="flex flex-wrap gap-8 items-center mt-8">
                  <Button variant="danger" size="lg">DANGER (LG)</Button>
                  <Button variant="danger">DANGER (MD)</Button>
                  <Button variant="danger" size="sm">DANGER (SM)</Button>
                </div>
              </div>

              <div>
                <h3 className="mb-8 font-mono text-sm tracking-widest text-zinc-500">BADGES // STATUS</h3>
                <div className="flex flex-wrap gap-4">
                  <Badge>DEFAULT LABEL</Badge>
                  <Badge variant="accent">ACCENT LABEL</Badge>
                  <Badge variant="warning">WARNING LABEL</Badge>
                </div>
              </div>
            </div>
          </FadeIn>
        </Section>

        <Section id="cards" className="bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNFNEU0RTciLz48L3N2Zz4=')]">
          {/* Subtle grid background applied via inline SVG data URI */}
          <FadeIn direction="up">
            <div className="space-y-4 mb-12 border-b-2 border-mecha-dark pb-6 bg-mecha-light p-4 inline-block border-2 shadow-hard">
              <Badge variant="accent">SYS-03</Badge>
              <h2 className="mb-0">Structural Panels</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card hoverEffect accentColor="blue" className="flex flex-col h-full bg-white">
                <div className="aspect-video bg-zinc-200 border-2 border-mecha-dark mb-6 relative overflow-hidden flex items-center justify-center font-mono text-sm text-zinc-400">
                  IMG_PLACEHOLDER
                </div>
                <h3 className="mb-2">Project Alpha</h3>
                <p className="text-zinc-600 text-sm mb-8 flex-grow">
                  Technical specifications and overview of Project Alpha. Highlights mechanical borders and rigid structure.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <Badge>REACT</Badge>
                  <Badge>TYPESCRIPT</Badge>
                </div>
              </Card>

              <Card hoverEffect accentColor="red" className="flex flex-col h-full bg-white">
                <div className="aspect-video bg-zinc-200 border-2 border-mecha-dark mb-6 relative overflow-hidden flex items-center justify-center font-mono text-sm text-zinc-400">
                  IMG_PLACEHOLDER
                </div>
                <h3 className="mb-2">Project Bravo</h3>
                <p className="text-zinc-600 text-sm mb-8 flex-grow">
                  Technical specifications and overview of Project Bravo. Note the red accent bar indicating warning or primary status.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <Badge>LARAVEL</Badge>
                  <Badge>MYSQL</Badge>
                </div>
              </Card>

              <Card hoverEffect accentColor="yellow" className="flex flex-col h-full bg-white">
                <div className="aspect-video bg-zinc-200 border-2 border-mecha-dark mb-6 relative overflow-hidden flex items-center justify-center font-mono text-sm text-zinc-400">
                  IMG_PLACEHOLDER
                </div>
                <h3 className="mb-2">Project Charlie</h3>
                <p className="text-zinc-600 text-sm mb-8 flex-grow">
                  Technical specifications and overview of Project Charlie. Utilizes yellow accents for cautionary or auxiliary technical focus.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <Badge>FLUTTER</Badge>
                  <Badge>DART</Badge>
                </div>
              </Card>
            </div>
          </FadeIn>
        </Section>
      </main>
      <footer className="bg-mecha-dark text-white py-12 border-t-4 border-mecha-red">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
            END OF TRANSMISSION // SYS.OFF
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
