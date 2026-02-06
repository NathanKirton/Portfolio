import React, { useEffect, useState } from 'react';

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
    if (!token || !personUrn) {
      setError('LinkedIn feed not configured. Set REACT_APP_LINKEDIN_TOKEN and REACT_APP_LINKEDIN_PERSON_URN.');
      return;
    }

    const fetchPosts = async () => {
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
        // data.elements is the array of posts
        setPosts(data.elements || []);
      } catch (err: any) {
        setError(err.message || String(err));
      }
    };

    fetchPosts();
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
          {posts.map((p, i) => (
            <article key={i} className="p-4 border rounded shadow-sm">
              <h3 className="font-bold mb-2">{p.specificContent?.['com.linkedin.ugc.ShareContent']?.shareCommentary?.text || 'LinkedIn Post'}</h3>
              <div className="text-sm text-gray-600">{new Date(p.created?.time || Date.now()).toLocaleString()}</div>
              {/* Try to show media if present */}
              {p.specificContent?.['com.linkedin.ugc.ShareContent']?.shareMedia && (
                <div className="mt-2">
                  {/* This is a simplification; media handling may need more code */}
                  <em>Contains media</em>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blog;
