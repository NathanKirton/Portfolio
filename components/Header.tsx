
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[60] bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-black/10 dark:border-primary/10">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => { window.location.hash = ''; window.scrollTo(0,0); }}>
          <img src="/Icons/MyLogo.png" alt="Nathan's Logo" className="h-14 w-14 object-contain" />
          <h2 className="text-lg font-black tracking-tighter uppercase dark:text-white cursor-pointer">Nathans Portfolio</h2>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a className="text-[10px] font-black hover:text-primary transition-colors uppercase tracking-[0.2em] dark:text-white" href="#about">About me</a>
          <a className="text-[10px] font-black hover:text-primary transition-colors uppercase tracking-[0.2em] dark:text-white" href="#contact">Contact</a>
          <a className="border-2 border-black dark:border-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background-dark text-black dark:text-primary px-3 py-1.5 rounded font-black text-[10px] transition-all uppercase tracking-widest" href="/resume/Nathan_Kirtons_CV.pdf" download>
            CV
          </a>
          <button className="bg-primary hover:scale-105 active:scale-95 text-white font-black py-1.5 px-5 rounded-md text-[10px] transition-all shadow-[3px_3px_0px_0px_rgba(242,127,13,0.9)] uppercase tracking-widest" onClick={() => (window.location.hash = '#contact')}>
            CONTACT ME
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
