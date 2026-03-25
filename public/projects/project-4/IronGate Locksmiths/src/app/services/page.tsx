import Image from "next/image";

import { FadeLeft, FadeRight, ScaleIn } from "@/components/shared/animate";
import { CallToActionBanner } from "@/components/shared/call-to-action-banner";
import { ServicesFilter } from "@/components/shared/services-filter";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/content";
import { getMetadata } from "@/lib/site";

export const metadata = getMetadata({
  title: "Locksmith Services South Shields",
  description:
    "Emergency lockouts, UPVC door servicing, lock changes, van locks, boarding up and more across South Shields and the North East.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="container-shell space-y-12 py-12 pb-24 lg:py-16">
      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <FadeLeft>
          <div>
            <Badge>Local locksmith service</Badge>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white sm:text-6xl">Low cost locksmith services with real local response</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              At Irongate Locksmiths South Shields, we hold ourselves to the highest British locksmith standards throughout Tyne and Wear and across every aspect of the locksmith work we undertake.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Locks from £19.99, door servicing from £29.99 and hourly rates from £44.99. Whether you are locked out, need a UPVC repair, a new insurance lock package or van lock upgrades, you can call Simon directly on {siteConfig.phoneDisplay}.
            </p>
          </div>
        </FadeLeft>
        <FadeRight delay={0.1}>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 p-3">
            <Image
              src={siteConfig.serviceImage}
              alt="Placeholder image showing a locksmith fitting upgraded locks and servicing a modern residential door"
              width={1400}
              height={1100}
              className="h-[420px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </FadeRight>
      </section>

      <ServicesFilter />

      <ScaleIn>
        <CallToActionBanner />
      </ScaleIn>
    </div>
  );
}