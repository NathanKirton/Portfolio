import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CallToActionBanner } from "@/components/shared/call-to-action-banner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { landingPages, services } from "@/lib/content";
import { getMetadata } from "@/lib/site";

type LandingPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return landingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = landingPages.find((item) => item.slug === slug);

  if (!page) {
    return {};
  }

  return getMetadata({ title: page.metaTitle, description: page.metaDescription, path: `/${page.slug}` });
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { slug } = await params;
  const page = landingPages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="container-shell space-y-12 py-12 pb-24 lg:py-16">
      <section className="max-w-4xl">
        <Badge>{page.eyebrow}</Badge>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white sm:text-6xl">{page.heroTitle}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">{page.heroSummary}</p>
      </section>
      <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-6">
          {page.sections.map((section) => (
            <Card key={section}>
              <CardContent className="p-6 text-base leading-7 text-slate-300 sm:p-8">{section}</CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="space-y-5 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-white">Popular local services</h2>
            {services.slice(0, 4).map((service) => (
              <div key={service.slug} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-base font-semibold text-white">{service.title}</div>
                  <div className="text-sm text-cyan-200">{service.price}</div>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{service.description}</p>
              </div>
            ))}
            <Link href="/contact" className="inline-flex text-sm font-semibold text-cyan-200 hover:text-cyan-100">Book a locksmith callout</Link>
          </CardContent>
        </Card>
      </section>
      <CallToActionBanner />
    </div>
  );
}