
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const roles = ['Web Developer', 'Full Stack Developer', 'Software Developer', 'Data Analyst'];

const TypingAnimation: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 50 : 100;
    const targetText = isDeleting ? '' : currentRole;

    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(displayText.slice(0, -1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      } else {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, roleIndex, isDeleting]);

  return (
    <span className="inline-block min-w-[300px] text-left">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden flex flex-col items-center justify-center text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-primary/10 text-black dark:text-primary border-2 border-black/20 dark:border-primary/20 mb-5 transform -rotate-1">
          <span className="material-symbols-outlined text-xs font-bold">person</span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Junior Developer Seeking work as a</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tighter text-black dark:text-white">
          <span className="text-primary italic underline decoration-black/20 dark:decoration-primary/20 decoration-wavy underline-offset-4"><TypingAnimation /></span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-800 dark:text-slate-400 max-w-2xl mx-auto mb-6 font-medium leading-relaxed">
          I'm a passionate developer seeking full-time opportunities in software development, web development, or data analysis. I also build custom websites and digital solutions for clients.
        </p>
        
        <p className="text-base md:text-lg text-slate-700 dark:text-slate-500 max-w-xl mx-auto mb-10 font-medium">
          Clean architecture • Intuitive UX • Reliable engineering
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => (window.location.hash = '#contact')}
            className="bg-primary text-white px-8 py-4 rounded-none font-black text-lg flex items-center justify-center gap-3 hover:shadow-xl transition-all transform hover:-rotate-1 border-[3px] border-black dark:border-primary shadow-[6px_6px_0px_0px_rgba(242,127,13,1)]"
          >
            GET IN TOUCH <span className="material-symbols-outlined font-black text-sm">mail</span>
          </button>
          <button 
            onClick={() => {
              const projectsSection = document.getElementById('projects-section');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-transparent text-black dark:text-white px-8 py-4 rounded-none font-black text-lg flex items-center justify-center gap-3 hover:bg-black hover:text-white dark:hover:bg-primary dark:hover:text-background-dark transition-all border-[3px] border-black dark:border-primary"
          >
            VIEW PROJECTS
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
