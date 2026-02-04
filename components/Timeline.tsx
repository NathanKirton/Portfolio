import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { EXPEDITIONS } from '../constants';
import ProjectCard from './ProjectCard';

const XMark = ({ progress, threshold, visible }: { progress: any; threshold: number; visible?: boolean }) => {
  const progressOpacity = useTransform(progress, [threshold - 0.5, threshold], [0, 1]);

  if (visible === true) {
    return (
      <motion.g animate={{ opacity: 1 }} transition={{ duration: 0.12 }}>
        <path
          d="M -22 -22 L 22 22 M 22 -22 L -22 22"
          stroke="#f27f0d"
          strokeWidth="12"
          strokeLinecap="round"
        />
      </motion.g>
    );
  }

  return (
    <motion.g style={{ opacity: progressOpacity }}>
      <path
        d="M -22 -22 L 22 22 M 22 -22 L -22 22"
        stroke="#f27f0d"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </motion.g>
  );
};

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.6", "end 0.6"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  const MAX_PATH_LENGTH = 0.92;
  const cappedPathLength = useTransform(pathLength, (v: number) => Math.min(v, MAX_PATH_LENGTH));

  const pathD =
    "M500 0 C 400 150, 600 350, 550 500 C 500 650, 350 850, 400 1000 C 450 1150, 650 1350, 600 1500 C 550 1650, 400 1850, 450 2000 C 500 2150, 650 2350, 600 2500 C 550 2650, 400 2850, 500 3000";

  const markerPoints = [
    { x: 550, y: 500, r: 5 },
    { x: 400, y: 1000, r: -10 },
    { x: 600, y: 1500, r: 15 },
    { x: 450, y: 2000, r: -5 },
    { x: 600, y: 2500, r: 10 }
  ];

  const [visibleMap, setVisibleMap] = useState<Record<number, boolean>>({});

  // Render timeline so the most recent projects appear at the top
  const reversedExpeditions = [...EXPEDITIONS].slice().reverse();

  const markers = markerPoints.slice(0, reversedExpeditions.length).map((pt, i) => {
    const exp = reversedExpeditions[i];
    const threshold = (i + 1) / (reversedExpeditions.length + 1);
    const isVisible = !!visibleMap[exp.id];

    return (
      <g key={i} transform={`translate(${pt.x}, ${pt.y}) rotate(${pt.r})`}>
        <XMark progress={cappedPathLength} threshold={threshold} visible={isVisible} />
      </g>
    );
  });

  return (
    <section id="projects-section" ref={containerRef} className="relative w-full pb-40">
      <div className="max-w-7xl mx-auto px-6 pt-12 z-20 relative">
        <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-6">Projects</h2>
      </div>
      <div className="absolute inset-0 flex justify-center pointer-events-none z-0">
        <svg
          className="w-full max-w-[1000px] h-full overflow-visible"
          viewBox="0 0 1000 3000"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Ghost path */}
          <path
            d={pathD}
            stroke="#f27f0d"
            strokeOpacity="0.02"
            strokeWidth="15"
            strokeLinecap="round"
          />

          {/* Main animated dashed path */}
          <motion.path
            d={pathD}
            stroke="#f27f0d"
            strokeWidth="12"
            strokeDasharray="12 12"
            strokeLinecap="round"
            pathLength={1}
            style={{ pathLength: cappedPathLength }}
          />

          {markers}
        </svg>
      </div>

      <div className="relative flex flex-col pt-10">
        {reversedExpeditions.map((exp) => (
          <ProjectCard
            key={exp.id}
            expedition={exp}
            onInViewChange={(id, inView) =>
              setVisibleMap(prev => ({ ...prev, [id]: inView }))
            }
          />
        ))}

        {/* View all button under the last project */}
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={() => (window.location.hash = '#projects')}
            className="bg-transparent text-black dark:text-white px-8 py-3 rounded-none font-black text-lg flex items-center justify-center gap-3 hover:bg-black hover:text-white dark:hover:bg-primary dark:hover:text-background-dark transition-all border-[3px] border-black dark:border-primary"
          >
            VIEW ALL
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mt-20 text-center relative z-20"
        >
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-primary dark:bg-primary text-white dark:text-background-dark shadow-lg mb-6 transform rotate-6 border-2 border-white/10">
            <span className="material-symbols-outlined text-4xl font-black">flag</span>
          </div>

          <p className="text-base text-slate-800 dark:text-slate-400 max-w-sm mb-8 font-bold leading-relaxed px-6">
            Looking to embark on a new project or collaboration? Or maybe you are a hiring manager seeking a dedicated developer to join your crew. Either way, feel free to drop me a message!
          </p>

          <button onClick={() => (window.location.hash = '#contact')} className="group relative bg-primary dark:bg-primary text-white dark:text-background-dark px-8 py-4 rounded-none font-black text-lg hover:scale-105 transition-transform shadow-[6px_6px_0px_0px_rgba(242,127,13,1)] border-[3px] border-primary dark:border-primary uppercase tracking-tighter overflow-hidden">
            <span className="relative z-10">MESSAGE ME</span>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;