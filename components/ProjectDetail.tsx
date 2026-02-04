/**
 * ProjectDetail Component
 * Displays comprehensive information for a single project/expedition
 * Shows tools, overview, and demo content with animations
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EXPEDITIONS } from '../constants';

interface ProjectDetailProps {
  projectId: number;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  // Find project by ID
  const project = EXPEDITIONS.find(p => p.id === projectId);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    
    if (isFullscreen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isFullscreen]);

  // Handle missing project
  if (!project) {
    return (
      <main className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-black mb-4">Project Not Found</h1>
          <button
            onClick={() => (window.location.hash = '')}
            className="bg-primary text-white px-6 py-3 font-black rounded hover:shadow-lg transition-all"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation back button */}
        <button
          onClick={() => (window.location.hash = '')}
          className="mb-8 inline-flex items-center gap-2 text-primary font-black hover:gap-4 transition-all uppercase text-sm tracking-wider"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Home
        </button>

        {/* Main content container with fade-in animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Project header with title and metadata */}
          <div className="mb-12">
            <span className="text-xs font-black text-white bg-black dark:bg-primary dark:text-black px-3 py-1 uppercase tracking-[0.2em]">
              {project.tag}
            </span>
            <h1 className="text-5xl font-black mt-4 mb-4 uppercase tracking-tighter text-gray-900 dark:text-white">
              {project.title}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {project.description}
            </p>
            <div className="text-sm font-black text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              {project.date}
            </div>
          </div>

          {/* Project Image */}
          <div className="mb-12 h-96 rounded-lg overflow-hidden border-4 border-black dark:border-primary shadow-lg">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Tools Used */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 bg-primary/10 dark:bg-primary/5 p-8 rounded-lg border-2 border-primary"
          >
            <h2 className="text-3xl font-black mb-6">Tools &amp; Technologies</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.tools ? (
                project.tools.map((category, idx) => (
                  <div key={idx}>
                    <h3 className="font-black uppercase tracking-wider mb-2">{category.name}</h3>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                      {category.items.map((item, itemIdx) => (
                        <li key={itemIdx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-gray-700 dark:text-gray-300 md:col-span-2">No tools information available.</p>
              )}
            </div>
          </motion.section>

          {/* Project Notes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-black mb-6">Project Overview</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.overview ? (
                // Handle both string and array formats for sections
                Array.isArray(project.overview.sections) ? (
                  project.overview.sections.map((section, idx) => (
                    <p key={idx}>{section}</p>
                  ))
                ) : (
                  <p>{project.overview.sections}</p>
                )
              ) : (
                <p>No overview information available.</p>
              )}
              <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 rounded">
                <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200 mb-2">⚠ Demo Limitations</p>
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  Please note: This project may not function as fully intended due to limitations including protected databases, external service dependencies, and restricted API access in this demo environment. The interactive demo provides a visual representation of the interface and core functionality.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Interactive Environment */}
          {isFullscreen && (
            <div 
              className="fixed top-0 left-0 w-screen h-screen z-[9999] bg-black flex flex-col overflow-hidden"
              onClick={() => setIsFullscreen(false)}
            >
              <div 
                className="bg-neutral-900 border-b-4 border-primary px-6 py-3 flex items-center justify-between flex-shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-black text-white">Interactive Demo</h2>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="bg-primary hover:bg-primary/90 text-black px-6 py-2 rounded font-black text-sm transition-all flex items-center gap-2 border-[2px] border-black shadow-lg"
                  title="Exit Fullscreen (Esc)"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                  Exit
                </button>
              </div>
              
              <div 
                className="flex-1 bg-black overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {projectId === 1 ? (
                  (() => {
                    const rawPath = '/projects/project-1/NorthTech Microservices/tracking-service/public/index.html';
                    const iframeSrc = encodeURI(rawPath);
                    return (
                      <iframe
                        title={`project-${project.id}-demo`}
                        src={iframeSrc}
                        className="w-full h-full"
                        style={{ border: 'none' }}
                        sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                      />
                    );
                  })()
                ) : projectId === 3 ? (
                  (() => {
                    return (
                      <iframe
                        title={`project-${project.id}-demo`}
                        src="https://www.move2earn.uk"
                        className="w-full h-full"
                        style={{ border: 'none' }}
                        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-pointer-lock"
                      />
                    );
                  })()
                ) : projectId === 4 ? (
                  (() => {
                    const iframeSrc = '/projects/project-4/IronGate Locksmiths/index.html';
                    return (
                      <iframe
                        title={`project-${project.id}-demo`}
                        src={iframeSrc}
                        className="w-full h-full"
                        style={{ border: 'none' }}
                        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-pointer-lock"
                      />
                    );
                  })()
                ) : null}
              </div>
            </div>
          )}
          
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black">Interactive Demo</h2>
              {(projectId === 1 || projectId === 3 || projectId === 4) && (
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="bg-primary text-white px-4 py-2 rounded font-black text-sm hover:shadow-lg transition-all flex items-center gap-2 border-[2px] border-black dark:border-primary"
                  title="Enter Fullscreen"
                >
                  <span className="material-symbols-outlined text-sm">fullscreen</span>
                  Fullscreen
                </button>
              )}
            </div>
            
            <div className="bg-white dark:bg-neutral-900 border-4 border-black dark:border-primary p-0 rounded-lg overflow-hidden">
                {projectId === 1 ? (
                  (() => {
                    const rawPath = '/projects/project-1/NorthTech Microservices/tracking-service/public/index.html';
                    const iframeSrc = encodeURI(rawPath);
                    return (
                      <iframe
                        title={`project-${project.id}-demo`}
                        src={iframeSrc}
                        className="w-full"
                        style={{ height: 600, border: '0' }}
                        sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                      />
                    );
                  })()
                ) : projectId === 3 ? (
                  (() => {
                    return (
                      <iframe
                        title={`project-${project.id}-demo`}
                        src="https://www.move2earn.uk"
                        className="w-full"
                        style={{ height: 600, border: '0' }}
                        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-pointer-lock"
                      />
                    );
                  })()
                ) : projectId === 4 ? (
                  (() => {
                    const iframeSrc = '/projects/project-4/IronGate Locksmiths/index.html';
                    return (
                      <iframe
                        title={`project-${project.id}-demo`}
                        src={iframeSrc}
                        className="w-full"
                        style={{ height: 700, border: '0' }}
                        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-pointer-lock"
                      />
                    );
                  })()
                ) : (
                  <div className="p-8 min-h-96 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-slate-700 dark:text-slate-300 mb-4">
                        The interactive demo environment will be loaded here. Project files should be placed in:
                      </p>
                      <code className="block bg-black/5 dark:bg-white/5 p-4 rounded font-mono text-sm mb-4 text-left">
                        /public/projects/project-{project.id}/
                      </code>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Upload your project files to this folder for interactive demonstration.
                      </p>
                    </div>
                  </div>
                )}
            </div>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <button
              onClick={() => (window.location.hash = '#contact')}
              className="bg-primary text-white px-8 py-4 rounded-none font-black text-lg inline-flex items-center gap-3 hover:shadow-xl transition-all transform hover:-rotate-1 border-[3px] border-black dark:border-primary shadow-[6px_6px_0px_0px_rgba(242,127,13,1)]"
            >
              INTERESTED? GET IN TOUCH <span className="material-symbols-outlined font-black text-sm">arrow_forward</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default ProjectDetail;
