/**
 * Main App Component
 * Handles routing and page switching for the portfolio site
 * Uses hash-based routing for client-side navigation
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import SwipeableCardStack from './components/SwipeableCardStack';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';
import AllProjects from './components/AllProjects';
import Blog from './components/Blog';

const App: React.FC = () => {
  // State for current route based on URL hash
  const [route, setRoute] = useState<string>(window.location.hash || '');
  const { scrollYProgress } = useScroll();
  const orbOneY = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const orbTwoY = useTransform(scrollYProgress, [0, 1], [0, 210]);
  const textureY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Update route when hash changes
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Ensure page is scrolled to top on route change (prevents jumping to embedded demo)
  useEffect(() => {
    // Defer slightly to let content render, then force top
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
  }, [route]);

  // Route detection
  const isAbout = route === '#about';
  const isContact = route === '#contact';
  const isBlog = route === '#blog';
  const isAllProjects = route === '#projects';
  const isProject = route.startsWith('#project/');
  const projectId = isProject ? parseInt(route.split('/')[1], 10) : null;

  return (
    <div className="relative z-20 min-h-screen overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Decorative texture overlays */}
      <motion.div style={{ y: textureY }} className="fixed inset-0 vintage-overlay z-0 pointer-events-none" />
      <div className="fixed inset-0 map-texture opacity-40 z-0 pointer-events-none" />
      <motion.div
        style={{ y: orbOneY }}
        className="fixed -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl z-0 pointer-events-none"
      />
      <motion.div
        style={{ y: orbTwoY }}
        className="fixed -bottom-44 -right-36 h-[32rem] w-[32rem] rounded-full bg-cyan-400/10 blur-3xl z-0 pointer-events-none"
      />

      {/* Main navigation and header */}
      <Header />
      
      {/* Route-based content rendering */}
      <motion.div
        key={route || 'home'}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {isAbout ? (
          <About />
        ) : isContact ? (
          <Contact />
        ) : isBlog ? (
          <Blog />
        ) : isAllProjects ? (
          <AllProjects />
        ) : isProject && projectId ? (
          <ProjectDetail projectId={projectId} />
        ) : (
          // Default home page with hero and portfolio sections
          <main className="relative z-10">
            <Hero />
            <SwipeableCardStack />
            <Timeline />
          </main>
        )}
      </motion.div>

      {/* Site footer */}
      <Footer />
    </div>
  );
};

export default App;
