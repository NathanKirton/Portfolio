import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { EXPEDITIONS } from '../constants';

const AllProjects: React.FC = () => {
  // Show most recent first
  const projects = [...EXPEDITIONS].slice().reverse();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  };

  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="text-3xl font-black mb-8 text-gray-900 dark:text-white"
        >
          All Projects
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((exp) => (
            <motion.div key={exp.id} variants={item}>
              <ProjectCard expedition={exp} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AllProjects;
