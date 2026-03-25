import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";

import { QuoteDialog } from "@/components/shared/quote-dialog";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/content";

export function CallToActionBanner() {
  return (
    <section className="rounded-[2rem] border border-[#427415]/30 bg-[radial-gradient(circle_at_top_left,_rgba(66,116,21,0.22),_transparent_50%),linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(244,248,239,0.96))] p-8 sm:p-10 dark:border-[#7daa48]/35 dark:bg-[radial-gradient(circle_at_top_left,_rgba(66,116,21,0.28),_transparent_45%),linear-gradient(135deg,_rgba(16,23,17,0.96),_rgba(12,19,14,0.96))]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-[#427415] dark:text-[#9fcc74]">Ready to help</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">Need a local locksmith right now?</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Call Simon directly for lockouts, lock changes, UPVC door repairs, emergency boarding and security upgrades across South Shields and the North East.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={siteConfig.phoneHref}>
              <PhoneCall className="h-4 w-4" />
              Call {siteConfig.phoneDisplay}
            </a>
          </Button>
          <QuoteDialog triggerLabel="Get Instant Quote" />
          <Button asChild variant="ghost" size="lg">
            <Link href="/contact">
              Contact page
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}