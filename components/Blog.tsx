import React, { useEffect, useState } from 'react';
import { SOCIALS } from '../constants';

/**
 * Blog page
 *
 * This component attempts to fetch LinkedIn posts for a configured person URN using
 * the LinkedIn v2 API. To make this work you must supply the following environment
 * variables at build/runtime (do NOT commit secrets to source control):
 *
 * - REACT_APP_LINKEDIN_TOKEN: A LinkedIn API OAuth2 access token with permission to read the user's UGC posts.
 * - REACT_APP_LINKEDIN_PERSON_URN: The person URN (e.g. urn:li:person:xxxxxxxx)
 *
 * Example fetch (server-side proxy is recommended):
 * GET https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(urn:li:person:XXXXX)
 * headers: { Authorization: `Bearer ${token}` }
 *
 * NOTE: Exposing access tokens in client-side code is not recommended for production.
 * Set up a small server/proxy that holds the token and returns a sanitized feed instead.
 */

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = (process.env.REACT_APP_LINKEDIN_TOKEN || process.env.VITE_LINKEDIN_TOKEN) as string | undefined;
  const personUrn = (process.env.REACT_APP_LINKEDIN_PERSON_URN || process.env.VITE_LINKEDIN_PERSON_URN) as string | undefined;

  useEffect(() => {
    const fetchFromProxy = async () => {
      try {
        const res = await fetch('/api/linkedin/posts');
        if (!res.ok) return null;
        const data = await res.json();
        // support both { elements: [...] } and direct array
        return data.elements || data;
      } catch (e) {
        return null;
      }
    };

    const fetchDirect = async () => {
      if (!token || !personUrn) return null;
      try {
        const encoded = encodeURIComponent(`List(${personUrn})`);
        const url = `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=${encoded}&count=10`;
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Restli-Protocol-Version': '2.0.0'
          }
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`LinkedIn API error: ${res.status} ${text}`);
        }
        const data = await res.json();
        return data.elements || [];
      } catch (err: any) {
        throw err;
      }
    };

    (async () => {
      try {
        // Try proxy first (recommended). If not available, fallback to direct fetch if token provided.
        let elements = await fetchFromProxy();
        if (!elements) {
          if (!token || !personUrn) {
            setError('LinkedIn feed not configured. Add a server proxy at /api/linkedin/posts or set REACT_APP_LINKEDIN_TOKEN and REACT_APP_LINKEDIN_PERSON_URN.');
            return;
          }
          elements = await fetchDirect();
        }

        setPosts(elements || []);
      } catch (err: any) {
        setError(err.message || String(err));
      }
    })();
  }, [token, personUrn]);

  return (
    <section className="py-20 md:py-28 max-w-4xl mx-auto px-6">
      <h2 className="text-3xl font-black mb-6">Blog</h2>
      {!token || !personUrn ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">Please configure your LinkedIn credentials (see README).</div>
      ) : error ? (
        <div className="text-red-600">Error loading LinkedIn posts: {error}</div>
      ) : !posts ? (
        <div>Loading posts…</div>
      ) : posts.length === 0 ? (
        <div>No posts found.</div>
      ) : (
        <div className="grid gap-6">
          {posts.map((p, i) => {
            const content = p.specificContent?.['com.linkedin.ugc.ShareContent'] || {};
            const text = content.shareCommentary?.text || '';
            const created = p.created?.time || p.createdAt || null;
            const mediaArr = Array.isArray(content.shareMedia) ? content.shareMedia : [];
            const firstMedia = mediaArr[0]?.media || mediaArr[0]?.originalUrl || null;
            // Try to derive a linkedIn post URL if possible, otherwise link to profile
            const postId = p.id || p['id'] || null;
            const postUrl = postId ? `https://www.linkedin.com/feed/update/${encodeURIComponent(postId)}` : SOCIALS.linkedin;

            return (
              <article key={i} className="p-6 border rounded-lg shadow-md bg-white dark:bg-background-dark">
                {firstMedia && (
                  <div className="mb-4">
                    <img src={firstMedia} alt="post media" className="w-full h-48 object-cover rounded" />
                  </div>
                )}
                <h3 className="font-bold mb-2 text-lg">{text ? (text.length > 180 ? `${text.slice(0, 180)}…` : text) : 'LinkedIn Post'}</h3>
                {text && text.length > 180 && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{text}</p>
                )}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">{created ? new Date(created).toLocaleString() : ''}</div>
                  <a href={postUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">View on LinkedIn</a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Blog;
