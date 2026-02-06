import React, { useEffect, useState } from 'react';
import { SOCIALS } from '../constants';

interface LinkedInPost {
  id: string;
  text: string;
  date: string;
  url: string;
  image?: string;
  video?: string;
  created_at?: string;
}

const LinkedInBlogCards: React.FC = () => {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/get-linkedin-posts');
        if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
        const data = await res.json();
        setPosts(data.elements || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load posts');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="py-20 md:py-28 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-black mb-6 text-white">Blog</h2>
        <div className="text-center text-gray-400">Loading posts…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 md:py-28 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-black mb-6 text-white">Blog</h2>
        <div className="bg-red-900/20 border border-red-500 text-red-400 p-4 rounded">
          Error loading posts: {error}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-20 md:py-28 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-black mb-6 text-white">Blog</h2>
        <div className="text-center text-gray-400">No posts yet. Check back soon!</div>
      </div>
    );
  }

  return (
    <section className="py-20 md:py-28 max-w-5xl mx-auto px-6">
      <h2 className="text-3xl font-black mb-6 text-white">Blog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
        {posts.map((post) => (
          <article key={post.id} className="flex flex-col h-full p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:shadow-lg transition-shadow">
            {post.image && (
              <div className="mb-4 overflow-hidden rounded h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <img src={post.image} alt="post" className="w-full h-full object-cover" />
              </div>
            )}
            {post.video && !post.image && (
              <div className="mb-4 overflow-hidden rounded h-48 bg-gray-800 flex items-center justify-center">
                <span className="text-sm text-gray-400">Video content</span>
              </div>
            )}
            <h3 className="font-bold mb-2 text-base line-clamp-3 flex-grow">
              {post.text && post.text.length > 200 ? `${post.text.slice(0, 200)}…` : post.text}
            </h3>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <time className="text-xs text-gray-600 dark:text-gray-400">
                {post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
              </time>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-semibold">
                Read More
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LinkedInBlogCards;
