/**
 * ProjectCard Component
 * Displays individual project in the timeline with image, description, and details
 * Features animations on scroll and click-through to project detail pages
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Expedition } from '../types';

interface ProjectCardProps {
  expedition: Expedition;
  onInViewChange?: (id: number, inView: boolean) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ expedition, onInViewChange }) => {
  // Determine card alignment based on project side property
  const isRight = expedition.side === 'right';

  return (
    <div className={`flex flex-col md:flex-row items-center relative group w-full mb-32 md:mb-52 ${isRight ? 'justify-end md:pr-[15%]' : 'justify-start md:pl-[15%]'}`}>
      
      {/* Animated card container with scroll-triggered animation */}
      <motion.div 
        initial={{ opacity: 0, x: isRight ? 40 : -40, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-sm w-full relative z-30 px-6 md:px-0"
        onViewportEnter={() => onInViewChange?.(expedition.id, true)}
        onViewportLeave={() => onInViewChange?.(expedition.id, false)}
      >
        {/* Date badge - positioned absolutely with rotation for visual interest */}
        <div className={`font-handwriting px-3 py-1 bg-background-light/90 dark:bg-black/90 rounded-sm backdrop-blur-[2px] shadow-sm border border-black/10 dark:border-primary/20 absolute -top-8 text-lg whitespace-nowrap select-none font-bold z-40 text-black dark:text-primary ${isRight ? 'right-0 transform -rotate-2' : 'left-0 transform rotate-1'}`}>
          {expedition.date}
        </div>

        {/* Main card body with responsive shadows and hover effects */}
        <div className={`bg-[#fffcf5] dark:bg-neutral-900 rounded-none overflow-hidden border-[4px] border-black dark:border-primary transition-all duration-300 hover:-translate-y-2 relative ${isRight ? 'shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(242,127,13,0.3)] hover:-translate-x-1' : 'shadow-[-10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[-10px_10px_0px_0px_rgba(242,127,13,0.3)] hover:translate-x-1'}`}>
          {/* Project image with hover effect to remove grayscale filter */}
          <div 
            className="h-44 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500"
            style={{ backgroundImage: `url('${expedition.imageUrl}')` }}
          />
          
          {/* Lock overlay for unreleased projects */}
          {expedition.id === 2 && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-none pointer-events-none">
              <span className="material-symbols-outlined text-white text-5xl font-black mb-3">lock</span>
              <p className="text-white font-black text-2xl uppercase tracking-wider">Coming Soon</p>
            </div>
          )}

          
          {/* Card content - metadata and description */}
          <div className="p-5">
            {/* Project tag/category */}
            <span className="text-[9px] font-black text-white bg-black dark:bg-primary dark:text-black px-2 py-1 uppercase tracking-[0.2em]">
              {expedition.tag}
            </span>
            {/* Project title */}
            <h3 className="text-xl font-black mt-3 mb-2 uppercase tracking-tighter text-black dark:text-white">
              {expedition.title}
            </h3>
            {/* Project description */}
            <p className="text-slate-700 dark:text-slate-300 mb-5 font-medium leading-relaxed text-xs">
              {expedition.description}
            </p>
            {/* View project link - navigates to project detail page */}
            {expedition.id === 2 ? (
              <span className="inline-flex items-center gap-2 text-black/40 dark:text-primary/40 font-black uppercase text-[9px] tracking-[0.2em] cursor-not-allowed">
                VIEW PROJECT <span className="material-symbols-outlined text-xs font-black">lock</span>
              </span>
            ) : (
              <a
                className="inline-flex items-center gap-2 text-black dark:text-primary font-black hover:gap-4 transition-all uppercase text-[9px] tracking-[0.2em] cursor-pointer"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  // Navigate to project route and ensure page scrolls to top
                  window.location.hash = `#project/${expedition.id}`;
                  // Defer scroll to allow route change/render to occur, then force top
                  setTimeout(() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                    // Also try resetting document scroll for some browsers
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                  }, 0);
                }}
              >
                VIEW PROJECT <span className="material-symbols-outlined text-xs font-black">arrow_forward</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
