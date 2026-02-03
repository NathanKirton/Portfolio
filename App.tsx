/**
 * Main App Component
 * Handles routing and page switching for the portfolio site
 * Uses hash-based routing for client-side navigation
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SwipeableCardStack from './components/SwipeableCardStack';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';

const App: React.FC = () => {
  // State for current route based on URL hash
  const [route, setRoute] = useState<string>(window.location.hash || '');

  // Update route when hash changes
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Route detection
  const isAbout = route === '#about';
  const isContact = route === '#contact';
  const isProject = route.startsWith('#project/');
  const projectId = isProject ? parseInt(route.split('/')[1], 10) : null;

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Decorative texture overlays */}
      <div className="fixed inset-0 vintage-overlay z-[100] pointer-events-none" />
      <div className="fixed inset-0 map-texture opacity-40 z-[1] pointer-events-none" />

      {/* Main navigation and header */}
      <Header />
      
      {/* Route-based content rendering */}
      {isAbout ? (
        <About />
      ) : isContact ? (
        <Contact />
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

      {/* Site footer */}
      <Footer />
    </div>
  );
};

export default App;
