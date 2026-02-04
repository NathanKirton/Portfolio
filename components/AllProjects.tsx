import React from 'react';
import ProjectCard from './ProjectCard';
import { EXPEDITIONS } from '../constants';

const AllProjects: React.FC = () => {
  // Show most recent first
  const projects = [...EXPEDITIONS].slice().reverse();

  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-black mb-8 text-black dark:text-white">All Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((exp) => (
            <ProjectCard key={exp.id} expedition={exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProjects;
