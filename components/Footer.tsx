
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black dark:bg-background-dark py-20 border-t-[12px] border-primary relative z-50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex items-center gap-6">
          <img src="/Icons/MyLogo.png" alt="Nathan's Logo" className="h-24 w-24 object-contain" />
          <div>
            <p className="text-2xl text-white font-black uppercase tracking-widest">Nathan Kirton</p>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">© 2026 • Full-Stack Developer</p>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <a href="https://github.com/NathanKirton" target="_blank" rel="noopener noreferrer" title="GitHub" className="transform hover:scale-110 transition-transform">
            <img src="/Icons/github-142-svgrepo-com.svg" alt="GitHub" className="w-8 h-8 invert filter" />
          </a>
          <a href="https://www.linkedin.com/in/nathan-kirton-473621352/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="transform hover:scale-110 transition-transform">
            <img src="/Icons/linkedin-linked-in-svgrepo-com.svg" alt="LinkedIn" className="w-8 h-8 invert filter" />
          </a>
          <a href="#contact" title="Contact" className="transform hover:scale-110 transition-transform">
            <img src="/Icons/contact-us-filled-svgrepo-com.svg" alt="Contact" className="w-8 h-8 invert filter" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
