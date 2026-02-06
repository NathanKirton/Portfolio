import React from 'react';
import LinkedInBlogCards from './LinkedInBlogCards';

/**
 * Blog page wrapper
 * Uses LinkedInBlogCards component to display posts from Supabase
 * Posts are received from Zapier via /api/linkedin-post endpoint
 */

const Blog: React.FC = () => {
  return <LinkedInBlogCards />;
};

export default Blog;
