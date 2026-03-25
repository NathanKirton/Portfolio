import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { areasCovered, landingPages, siteConfig } from "@/lib/content";
import { getMetadata } from "@/lib/site";

export const metadata = getMetadata({
  title: "Areas Covered | Locksmith South Shields and North East",
  description: "Coverage areas for Irongate Locksmiths across South Shields, South Tyneside, Jarrow, Hebburn, Boldon, Sunderland, Newcastle and the wider North East.",
  path: "/coverage",
});

export default function CoveragePage() {
  return (
    <div className="container-shell space-y-12 py-12 pb-24 lg:py-16">
      <section className="max-w-4xl">
        <Badge>Areas covered</Badge>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white sm:text-6xl">Locksmith coverage across South Shields and the wider North East</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">{siteConfig.serviceRadius}</p>
      </section>
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {areasCovered.map((area) => (
          <Card key={area}>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-white">{area}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">Emergency lockouts, lock changes, repairs and upgrades available subject to location and demand.</p>
            </CardContent>
          </Card>
        ))}
      </section>
      <section>
        <h2 className="text-3xl font-semibold text-white">Local SEO landing pages</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {landingPages.map((page) => (
            <Link key={page.slug} href={`/${page.slug}`} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-white">
              <div className="text-sm uppercase tracking-[0.25em] text-cyan-200">{page.eyebrow}</div>
              <div className="mt-2 text-xl font-semibold text-white">{page.heroTitle}</div>
              <div className="mt-2 text-sm leading-6">{page.heroSummary}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}