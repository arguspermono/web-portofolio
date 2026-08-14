import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Section } from './components/ui/Section';

function App() {
  return (
    <div className="min-h-screen bg-mecha-light text-mecha-dark flex flex-col font-sans">
      <Header />
      
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">
        <Section className="min-h-[50vh] flex items-center justify-center border-b-2 border-mecha-dark bg-mecha-panel">
          <div className="text-center space-y-6">
            <div className="inline-block border-2 border-mecha-dark bg-mecha-yellow text-mecha-dark px-4 py-1 font-mono text-sm font-bold tracking-widest uppercase shadow-hard mb-4">
              PHASE 3 // CORE LAYOUT
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-wide">
              System Layout<br />Initialized
            </h1>
            <p className="text-zinc-600 max-w-lg mx-auto font-mono text-sm">
              The core navigation and footer structures are in place. Ready for portfolio sections injection.
            </p>
          </div>
        </Section>
        
        {/* Placeholder for future sections */}
        <Section className="flex-grow border-b-2 border-mecha-dark flex items-center justify-center relative overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNFNEU0RTciLz48L3N2Zz4=')]">
           <div className="font-mono text-zinc-500 tracking-widest uppercase bg-white border-2 border-mecha-dark px-6 py-3 shadow-[4px_4px_0px_0px_#18181B] z-10 font-bold">
             [ CONTENT AREA ]
           </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
