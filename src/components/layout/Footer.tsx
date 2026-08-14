import { cn } from '../../utils/cn';

export function Footer() {
  return (
    <footer className="bg-mecha-dark text-white border-t-4 border-mecha-red relative overflow-hidden mt-auto">
      {/* Decorative mechanical elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-mecha-blue opacity-10 rotate-45 transform origin-bottom-left translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 py-12 max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-end">
          <div className="space-y-4">
            <div className="font-display font-extrabold text-2xl tracking-widest uppercase flex items-center gap-2">
              <div className="w-4 h-4 bg-mecha-yellow border-2 border-white"></div>
              ARYA // SYS
            </div>
            <p className="text-zinc-400 font-mono text-sm max-w-md">
              Building Digital Experiences Through Code & Creativity.
            </p>
          </div>
          
          <div className="md:text-right space-y-4">
            <div className="flex gap-4 md:justify-end font-mono text-sm font-bold tracking-wider">
              <a href="#" className="hover:text-mecha-blue transition-colors">GITHUB</a>
              <span className="text-zinc-600">//</span>
              <a href="#" className="hover:text-mecha-blue transition-colors">LINKEDIN</a>
              <span className="text-zinc-600">//</span>
              <a href="#" className="hover:text-mecha-blue transition-colors">EMAIL</a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t-2 border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-zinc-500 tracking-widest uppercase">
          <div>&copy; {new Date().getFullYear()} ARYA. ALL RIGHTS RESERVED.</div>
          <div>STATUS: ONLINE // SYS.READY</div>
        </div>
      </div>
    </footer>
  );
}
