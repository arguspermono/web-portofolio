import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-mecha-black text-mecha-white border-t border-mecha-dark3 relative overflow-hidden mt-auto print:hidden">
      {/* Decorative mechanical elements */}
      <div className="absolute top-0 right-0 w-32 h-32 border-l border-b border-mecha-dark3 opacity-20 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 py-12 max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-end">
          <div className="space-y-4">
            <div className="font-display font-extrabold text-2xl tracking-widest uppercase flex items-center gap-2">
              <div className="w-4 h-4 bg-mecha-white border border-mecha-dark3"></div>
              ARYA BAGUS
            </div>
            <p className="text-mecha-light1 font-mono text-sm max-w-md opacity-80">
              Building Digital Experiences Through Code & Creativity.
            </p>
          </div>
          
          <div className="md:text-right space-y-4">
            <div className="flex gap-4 md:justify-end font-mono text-sm font-bold tracking-wider text-mecha-light1">
              <a href={import.meta.env.VITE_GITHUB} className="hover:text-mecha-white transition-colors text-2xl">
                <FaGithub />
              </a>
              <a href={import.meta.env.VITE_LINKEDIN} className="hover:text-mecha-white transition-colors text-2xl">
                <FaLinkedin />
              </a>
              <a href={import.meta.env.VITE_EMAIL} className="hover:text-mecha-white transition-colors text-2xl">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-mecha-dark3 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-mecha-light1 tracking-widest uppercase">
          <div>&copy; {new Date().getFullYear()} ARYA. ALL RIGHTS RESERVED.</div>
          {/* <div>STATUS: ONLINE // SYS.READY</div> */}
        </div>
      </div>
    </footer>
  );
}
