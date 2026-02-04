/**
 * SwipeableCardStack Component
 * Interactive skills showcase with drag-to-swipe functionality
 * Features scroll-triggered spread animation, deck mechanics, and expandable view
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ICON_PATHS = {
  react: '/Icons/react-svgrepo-com.svg',
  python: '/Icons/python-svgrepo-com.svg',
  javascript: '/Icons/javascript-svgrepo-com.svg',
  html: '/Icons/html-5-svgrepo-com.svg',
  mongo: '/Icons/mongo-svgrepo-com.svg'
};

/**
 * Skill cards displayed in the stack
 * Each card represents a technology/skill with icon and description
 */
const CARD_DATA = [
  { 
    id: 1, 
    title: 'React', 
    content: 'Building interactive UIs with component-based architecture and state management.',
    icon: ICON_PATHS.react
  },
  { 
    id: 2, 
    title: 'Python', 
    content: 'Backend development, data processing, and automation with clean, readable code.',
    icon: ICON_PATHS.python
  },
  { 
    id: 3, 
    title: 'JavaScript', 
    content: 'Modern ES6+ development for both frontend and full-stack applications.',
    icon: ICON_PATHS.javascript
  },
  { 
    id: 4, 
    title: 'HTML', 
    content: 'Semantic markup and accessible web structures for responsive, SEO-friendly pages.',
    icon: ICON_PATHS.html
  },
  { 
    id: 5,
    title: 'MongoDB',
    content: 'Schema design and document storage for scalable, schema-flexible backends.',
    icon: ICON_PATHS.mongo
  },
];

/**
 * Main swipeable card stack component
 * Handles card rotation, animations, and view modes
 */
export default function SwipeableCardStack() {
  // State management
  const [cards, setCards] = useState(CARD_DATA);           // Deck of cards
  const [expanded, setExpanded] = useState(false);         // Toggle grid view
  const [swipeDir, setSwipeDir] = useState(0);             // Swipe direction (1 or -1)
  const [showSwipeHint, setShowSwipeHint] = useState(true); // Show hint animation
  const containerRef = useRef<HTMLDivElement | null>(null); // Container reference for observer

  // Animation state for spread effect
  const [spreadPositions, setSpreadPositions] = useState<number[] | null>(null);
  const [animatedOnce, setAnimatedOnce] = useState(false);
  const [reassembling, setReassembling] = useState(false);

  /**
   * Handle card swipe/drag action
   * Removes top card and adds to bottom of deck
   */
  const handleSwipe = (dir: number) => {
    setSwipeDir(dir);
    setShowSwipeHint(false);
    
    // Animate card exit
    setTimeout(() => {
      setCards((prev) => {
        const [top, ...rest] = prev;
        return [...rest, top];
      });
      setSwipeDir(0);
    }, 400);
    
    // Trigger reassembly animation
    setReassembling(true);
    setTimeout(() => setReassembling(false), 300);
  };

  /**
   * Trigger initial spread animation when component enters viewport
   * Uses Intersection Observer to detect visibility
   */
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedOnce) {
          // Calculate spread positions for top 3 visible cards
          const visible = Math.min(cards.length, 3);
          const rect = el.getBoundingClientRect();
          const containerWidth = rect.width;
          const cardW = Math.min(288, containerWidth * 0.28);
          const totalGap = containerWidth - cardW;
          const spacing = Math.min(220, totalGap / (visible + 1));

          const targets: number[] = [];
          for (let i = 0; i < visible; i++) {
            const centerIndex = (visible - 1) / 2;
            const pos = (i - centerIndex) * spacing;
            targets.push(pos);
          }

          // Begin spread animation
          setSpreadPositions(targets);

          // Snap back after spread completes
          setTimeout(() => {
            setSpreadPositions(null);
            setTimeout(() => setAnimatedOnce(true), 300);
          }, 800);

          io.disconnect();
        }
      });
    }, { threshold: 0.35 });

    io.observe(el);
    return () => io.disconnect();
  }, [animatedOnce, cards.length]);

  return (
    <div className="w-full flex flex-col items-center py-16 px-6">
      {/* Section header */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-3">
          MY SKILLS
        </h2>
        <p className="text-gray-700 dark:text-gray-300 font-medium max-w-md">
          Technologies and tools I use to build digital solutions
        </p>
      </div>

      {/* Stacked view - default card deck presentation */}
      {!expanded && (
        <div ref={containerRef} className="relative w-full max-w-5xl h-72 flex items-center justify-center">
          {/* Swipe hint animation - loops until first swipe */}
          <AnimatePresence>
            {showSwipeHint && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
              >
                <div className="relative flex items-center gap-8">
                  {/* Left swipe gesture */}
                  <motion.div
                    animate={{ x: [-30, 0, -30] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-2"
                  >
                    <img 
                      src="/Icons/swipe-left-svgrepo-com.svg" 
                      alt="Swipe left" 
                      className="w-20 h-20 opacity-70 hover:opacity-100 transition-opacity invert"
                    />
                  </motion.div>

                  {/* Right swipe gesture */}
                  <motion.div
                    animate={{ x: [30, 0, 30] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-2"
                  >
                    <img 
                      src="/Icons/swipe-right-svgrepo-com.svg" 
                      alt="Swipe right" 
                      className="w-20 h-20 opacity-70 hover:opacity-100 transition-opacity invert"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Card stack - animated cards with drag support */}
          <AnimatePresence initial={false}>
            {cards.slice(0, 3).map((card, idx) => {
              // Calculate stacked position offsets
              const offsetY = idx * 12;
              const offsetX = idx * 8;
              const rotation = idx * 2;
              const isTop = idx === 0;

              // Use spread positions during initial animation, otherwise use stacked offset
              const spreadX = spreadPositions ? spreadPositions[idx] ?? 0 : offsetX;

              // Dynamic duration based on spread distance for smoother animation
              const absDist = Math.abs(spreadX);
              const duration = 0.45 + Math.min(0.6, absDist / 1200);

              return (
                <motion.div
                  key={card.id}
                  className={`absolute w-72 h-56 ${
                    isTop ? 'border-4 border-primary' : 'border-4 border-black'
                  } bg-white dark:bg-neutral-900 shadow-xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none`}
                  initial={{ x: 0, opacity: 1 }}
                  animate={{
                    y: reassembling ? offsetY - 8 : offsetY,
                    x: spreadPositions ? spreadX : offsetX,
                    rotate: rotation,
                    scale: 1 - idx * 0.02,
                    zIndex: 10 - idx,
                    opacity: 1,
                  }}
                  exit={{
                    x: swipeDir > 0 ? 600 : -600,
                    y: 140,
                    rotate: swipeDir > 0 ? 18 : -18,
                    opacity: 0,
                    scale: 0.85,
                    transition: { duration: 0.55, ease: "easeInOut" },
                  }}
                  drag={isTop ? 'x' : false}
                  dragConstraints={{ left: -100, right: 100 }}
                  dragElastic={0.3}
                  onDragEnd={(_e, info) => {
                    // Detect swipe based on velocity or offset distance
                    if (info.velocity.x > 500 || info.offset.x > 80) handleSwipe(1);
                    else if (info.velocity.x < -500 || info.offset.x < -80) handleSwipe(-1);
                  }}
                  transition={ reassembling ? { y: { type: 'spring', stiffness: 400, damping: 28 }, duration, ease: 'easeOut' } : { duration, ease: 'easeOut' } }
                >
                  {/* Card icon and content */}
                  <img
                    src={card.icon}
                    alt={`${card.title} icon`}
                    className="w-20 h-20 mb-4"
                  />
                  <h3 className={`font-black text-3xl mb-3 ${isTop ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>
                    {card.title}
                  </h3>
                  <p className="text-sm text-center text-gray-700 dark:text-gray-300 px-4 leading-relaxed">
                    {card.content}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Grid view - shows all cards when expanded */}
      {expanded && (
        <div className="w-full px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-7xl mx-auto">
            <AnimatePresence>
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-sm h-56 border-4 border-black bg-white dark:bg-neutral-900 shadow-xl flex flex-col items-center justify-center hover:border-primary hover:shadow-2xl transition-all cursor-default"
                >
                  <img
                    src={card.icon}
                    alt={`${card.title} icon`}
                    className="w-20 h-20 mb-4"
                  />
                  <h3 className="font-black text-3xl mb-3 text-gray-900 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="text-sm text-center text-gray-700 dark:text-gray-300 px-4 leading-relaxed">
                    {card.content}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Toggle between stack and grid views */}
      <button
        type="button"
        className="mt-8 mb-4 px-10 py-4 border-4 border-black bg-white dark:bg-neutral-900 text-black dark:text-white font-black text-lg hover:bg-primary hover:border-primary dark:hover:border-primary hover:text-white dark:hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:shadow-xl active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10 relative"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? 'COLLAPSE' : 'VIEW ALL'}
      </button>
    </div>
  );
}
