
import React from 'react';
import { motion } from 'framer-motion';
import { SOCIALS } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden flex flex-col items-center justify-center text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-primary/10 text-gray-700 dark:text-primary border-2 border-black/20 dark:border-primary/20 mb-5 transform -rotate-1">
          <span className="material-symbols-outlined text-xs font-bold">person</span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Junior Developer Seeking work as a</span>
        </div>
        
        <motion.h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tighter text-gray-900 dark:text-white">
          <motion.span
            initial={{ y: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-primary italic decoration-black/20 dark:decoration-primary/20 underline-offset-4"
          >
            Software Developer
          </motion.span>
        </motion.h1>
        
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6 font-medium leading-relaxed">
          I'm a passionate developer seeking full-time opportunities in software development, web development, or data analysis. I also build custom websites and digital solutions for clients.
        </p>
        
        <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 max-w-xl mx-auto mb-10 font-medium">
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

        <div className="mt-6 flex items-center justify-center gap-6">
          <motion.a
            whileHover={{ scale: 1.08 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-block"
          >
            <img src="/Icons/github-142-svgrepo-com.svg" alt="GitHub" className="h-8 w-8 filter brightness-0 invert" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.08 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-block"
          >
            <img src="/Icons/linkedin-linked-in-svgrepo-com.svg" alt="LinkedIn" className="h-8 w-8 filter brightness-0 invert" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
