import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/content";
import { getMetadata } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return getMetadata({ title: post.title, description: post.description, path: `/blog/${post.slug}` });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container-shell max-w-4xl space-y-8 py-12 pb-24 lg:py-16">
      <Badge>Blog post</Badge>
      <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">{post.title}</h1>
      <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">{post.publishedAt} • {post.readTime}</p>
      <div className="space-y-6 text-lg leading-8 text-slate-300">
        {post.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}