import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { navigationLinks, siteConfig, trustBadges } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_0.8fr_1fr] lg:px-8">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <Image
              src="/branding/irongate-badge.png"
              alt="Irongate shield icon"
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
            />
            <div>
              <div className="text-xl font-black tracking-wide text-[#427415]">IRONGATE</div>
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">South Shields Locksmith Service</div>
            </div>
          </div>
          <Badge className="mb-4">Local Locksmith South Shields</Badge>
          <h2 className="max-w-md text-2xl font-semibold text-white">Trusted 24/7 locksmith support across South Shields and the wider North East.</h2>
          <div className="mt-6 grid gap-3 text-sm text-slate-300">
            <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-cyan-300" />{siteConfig.addressLine1}, {siteConfig.city}, {siteConfig.postcode}</div>
            <a href={siteConfig.phoneHref} className="flex items-center gap-3 hover:text-white"><Phone className="h-4 w-4 text-cyan-300" />{siteConfig.phoneDisplay}</a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 hover:text-white"><Mail className="h-4 w-4 text-cyan-300" />{siteConfig.email}</a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Quick Links</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
            <Link href="/locksmith-south-shields" className="hover:text-white">Locksmith South Shields</Link>
            <Link href="/emergency-locksmith-south-shields" className="hover:text-white">Emergency Locksmith South Shields</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Trust Badges</h3>
          <div className="mt-4 grid gap-3">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <div>
                  <div className="font-medium text-white">{badge.title}</div>
                  <div>{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Irongate Locksmiths Lock Solutions. All rights reserved.
      </div>
    </footer>
  );
}