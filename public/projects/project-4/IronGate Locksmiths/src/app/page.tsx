import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, Star } from "lucide-react";

import { AnimatedHeroSection } from "@/components/shared/animated-hero";
import { FadeLeft, FadeRight, FadeUp, ScaleIn, StaggerContainer, StaggerItem } from "@/components/shared/animate";
import { CallToActionBanner } from "@/components/shared/call-to-action-banner";
import { TestimonialsCarousel } from "@/components/shared/testimonials-carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { areasCovered, services, siteConfig, whyChooseUs } from "@/lib/content";
import { getMetadata } from "@/lib/site";

export const metadata = getMetadata({
  title: "24/7 Emergency Locksmith South Shields",
  description: siteConfig.description,
  path: "/",
});

export default function Home() {
  return (
    <div className="pb-24 lg:pb-0">
      <AnimatedHeroSection />

      <section className="container-shell py-12">
        <FadeUp>
          <div className="flex items-end justify-between gap-4">
            <div>
              <Badge>Services</Badge>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Locksmith services built around urgent local callouts</h2>
            </div>
            <Button asChild variant="ghost"><Link href="/services">View all services</Link></Button>
          </div>
        </FadeUp>
        <StaggerContainer className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.slice(0, 8).map((service) => (
            <StaggerItem key={service.slug}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold text-cyan-200">{service.price}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{service.details}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="container-shell grid gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr]">
        <FadeLeft>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 sm:p-8">
            <Badge>Why choose us</Badge>
            <h2 className="mt-4 text-3xl font-semibold text-white">A trustworthy local locksmith, not a faceless lead service</h2>
            <div className="mt-8 grid gap-4">
              {whyChooseUs.map((reason) => (
                <div key={reason} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
                  <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
                  {reason}
                </div>
              ))}
            </div>
          </div>
        </FadeLeft>
        <FadeRight delay={0.1}>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 p-3">
            <Image
              src={siteConfig.secondaryImage}
              alt="Placeholder supporting image showing a professional locksmith inspecting upgraded door hardware on a residential property"
              width={1400}
              height={1100}
              className="h-full min-h-[480px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </FadeRight>
      </section>

      <section className="container-shell py-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeLeft>
            <div>
              <Badge>Testimonials</Badge>
              <h2 className="mt-4 text-3xl font-semibold text-white">Happy customers who needed honest, low cost locksmith help</h2>
              <p className="mt-4 max-w-xl text-slate-300">We always get a big thumbs up from our customers because we save them money and deliver a quality service.</p>
              <div className="mt-8 flex items-center gap-3 text-cyan-200">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
            </div>
          </FadeLeft>
          <FadeRight delay={0.1}>
            <TestimonialsCarousel />
          </FadeRight>
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeLeft>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 p-3">
              <iframe
                src={siteConfig.mapEmbed}
                title="Map showing Irongate Locksmiths coverage around South Shields"
                className="h-[420px] w-full rounded-[1.5rem] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeLeft>
          <FadeRight delay={0.1}>
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 sm:p-8">
              <Badge>Areas covered</Badge>
              <h2 className="mt-4 text-3xl font-semibold text-white">South Shields first, then the wider North East</h2>
              <p className="mt-4 text-slate-300">From Hebburn to Newcastle, Durham to Hartlepool, Irongate Locksmiths offer emergency callouts, repairs and security upgrades throughout the region.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {areasCovered.map((area) => (
                  <span key={area} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">{area}</span>
                ))}
              </div>
              <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5 text-sm text-slate-200">
                <Award className="mb-3 h-5 w-5 text-cyan-300" />
                Master locksmith trained, DBS checked, fully insured, and focused on explaining the issue clearly before work starts.
              </div>
            </div>
          </FadeRight>
        </div>
      </section>

      <section className="container-shell py-12">
        <ScaleIn>
          <CallToActionBanner />
        </ScaleIn>
      </section>
    </div>
  );
}
