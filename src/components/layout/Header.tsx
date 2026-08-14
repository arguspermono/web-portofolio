import { useState } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-mecha-light border-b-2 border-mecha-dark">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-display font-extrabold text-xl tracking-widest uppercase flex items-center gap-2 hover:opacity-80 transition-opacity z-50">
          <div className="w-4 h-4 bg-mecha-red border-2 border-mecha-dark"></div>
          ARYA // SYS
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 font-mono text-xs font-bold tracking-widest uppercase">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="hover:text-mecha-blue transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-0.5 after:bg-mecha-blue hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
          <Button variant="primary" size="sm">RESUME</Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 z-50 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className={cn("h-0.5 w-full bg-mecha-dark transition-all duration-300", isMenuOpen ? "rotate-45 translate-y-2" : "")}></div>
          <div className={cn("h-0.5 w-full bg-mecha-dark transition-all duration-300", isMenuOpen ? "opacity-0" : "")}></div>
          <div className={cn("h-0.5 w-full bg-mecha-dark transition-all duration-300", isMenuOpen ? "-rotate-45 -translate-y-2" : "")}></div>
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={cn(
        "fixed inset-0 bg-mecha-light z-40 transition-transform duration-300 ease-in-out flex flex-col pt-24 px-6 md:hidden",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col space-y-6 font-display font-bold text-2xl uppercase">
          {navLinks.map((link, index) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-4 hover:text-mecha-blue transition-colors border-b-2 border-mecha-dark pb-4"
            >
              <span className="text-sm font-mono text-mecha-red">0{index + 1}</span>
              {link.name}
            </a>
          ))}
          <div className="pt-4">
             <Button variant="primary" size="lg" className="w-full justify-center">DOWNLOAD RESUME</Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
