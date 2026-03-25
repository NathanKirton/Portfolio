import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/lib/content";
import { getMetadata } from "@/lib/site";

export const metadata = getMetadata({
  title: "Locksmith Advice Blog",
  description: "Practical locksmith advice, security tips and local guidance from Irongate Locksmiths in South Shields.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="container-shell space-y-12 py-12 pb-24 lg:py-16">
      <section className="max-w-4xl">
        <Badge>Blog</Badge>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white sm:text-6xl">Helpful locksmith advice and local security insights</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">A cleaner replacement for the older Wix blog structure, with room to expand later if you want to migrate more posts.</p>
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.slug}>
            <CardContent className="p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">{post.readTime}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{post.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{post.description}</p>
              <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm font-semibold text-cyan-200 hover:text-cyan-100">Read article</Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}