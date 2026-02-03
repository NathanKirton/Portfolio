import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <main className="relative z-10 py-28 px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-6">About Me</h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            I'm a full-stack developer passionate about building scalable, user-focused web applications. With expertise in modern JavaScript frameworks, backend systems, and database design, I deliver solutions that combine technical excellence with intuitive user experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <motion.section variants={itemVariants}>
            <h2 className="text-3xl font-black mb-6 text-primary">Technical Expertise</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-black uppercase tracking-wide mb-2">Frontend Development</h3>
                <p className="text-slate-700 dark:text-slate-300">React, TypeScript, Tailwind CSS, Framer Motion, and modern responsive design patterns. I focus on performance optimization and creating engaging user interfaces.</p>
              </div>
              <div>
                <h3 className="font-black uppercase tracking-wide mb-2">Backend Development</h3>
                <p className="text-slate-700 dark:text-slate-300">Node.js, Express, RESTful APIs, and real-time data systems. Experience with database architecture and API design principles.</p>
              </div>
              <div>
                <h3 className="font-black uppercase tracking-wide mb-2">Database &amp; Tools</h3>
                <p className="text-slate-700 dark:text-slate-300">MongoDB, PostgreSQL, Git, CI/CD pipelines, and cloud deployment on Azure and AWS. Python for data processing and automation.</p>
              </div>
            </div>
          </motion.section>

          {/* Professional Background */}
          <motion.section variants={itemVariants}>
            <h2 className="text-3xl font-black mb-6 text-primary">Professional Journey</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-black text-lg uppercase tracking-wider mb-1">Education</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Computer Science • University</p>
                <p className="text-slate-700 dark:text-slate-300">Focused on software engineering, data structures, and web technologies.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-black text-lg uppercase tracking-wider mb-1">Experience</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Full-Stack Developer Projects</p>
                <p className="text-slate-700 dark:text-slate-300">Built and deployed production applications including mobile apps, dashboards, and secure APIs. Worked with teams on collaborative projects.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-black text-lg uppercase tracking-wider mb-1">Current Focus</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Seeking New Opportunities</p>
                <p className="text-slate-700 dark:text-slate-300">Open to freelance projects, contract work, and full-time positions where I can contribute to meaningful technical challenges.</p>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Core Values */}
        <motion.section variants={itemVariants} className="mt-12 bg-primary/10 dark:bg-primary/5 p-8 rounded-lg border-2 border-primary">
          <h2 className="text-3xl font-black mb-6">My Approach</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-4xl font-black text-primary mb-3">🏗️</div>
              <h3 className="font-black uppercase tracking-wider mb-2">Clean Code</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">I prioritize readable, maintainable code that follows best practices and design patterns.</p>
            </div>
            <div>
              <div className="text-4xl font-black text-primary mb-3">⚡</div>
              <h3 className="font-black uppercase tracking-wider mb-2">Performance</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">Every application is optimized for speed and efficiency. Fast load times and responsive interactions matter.</p>
            </div>
            <div>
              <div className="text-4xl font-black text-primary mb-3">🤝</div>
              <h3 className="font-black uppercase tracking-wider mb-2">Collaboration</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm">I communicate clearly, take feedback well, and work effectively with designers, backend teams, and stakeholders.</p>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">Interested in working together? Let's connect!</p>
          <button
            onClick={() => (window.location.hash = '#contact')}
            className="bg-primary text-white px-8 py-4 rounded-none font-black text-lg inline-flex items-center gap-3 hover:shadow-xl transition-all transform hover:-rotate-1 border-[3px] border-black dark:border-primary shadow-[6px_6px_0px_0px_rgba(242,127,13,1)]"
          >
            GET IN TOUCH <span className="material-symbols-outlined font-black text-sm">arrow_forward</span>
          </button>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default About;
