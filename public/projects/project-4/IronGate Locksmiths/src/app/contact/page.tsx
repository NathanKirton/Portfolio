import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/shared/contact-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/content";
import { getMetadata } from "@/lib/site";

export const metadata = getMetadata({
  title: "Contact Irongate Locksmiths South Shields",
  description: "Call, email or send a message to Irongate Locksmiths for emergency locksmith help, lock repairs, lock changes and UPVC door servicing.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container-shell space-y-12 py-12 pb-24 lg:py-16">
      <section className="max-w-3xl">
        <Badge>We want to hear from you</Badge>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white sm:text-6xl">Need a local South Shields locksmith?</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          When you are in need of a dependable locksmith service in South Shields, do not hesitate to call Simon at Irongate Locksmiths today. Your local family based locksmith business in South Shields UK.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardContent className="p-6 sm:p-8">
            <ContactForm />
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardContent className="grid gap-5 p-6 text-slate-300 sm:p-8">
              <div className="flex gap-4"><Phone className="mt-1 h-5 w-5 text-cyan-300" /><div><p className="text-sm text-slate-400">Phone</p><a href={siteConfig.phoneHref} className="text-lg font-semibold text-white">{siteConfig.phoneDisplay}</a></div></div>
              <div className="flex gap-4"><Mail className="mt-1 h-5 w-5 text-cyan-300" /><div><p className="text-sm text-slate-400">Email</p><a href={`mailto:${siteConfig.email}`} className="text-lg font-semibold text-white">{siteConfig.email}</a></div></div>
              <div className="flex gap-4"><MapPin className="mt-1 h-5 w-5 text-cyan-300" /><div><p className="text-sm text-slate-400">Address</p><p className="text-lg font-semibold text-white">{siteConfig.addressLine1}, {siteConfig.city}, {siteConfig.postcode}</p></div></div>
              <div className="flex gap-4"><Clock3 className="mt-1 h-5 w-5 text-cyan-300" /><div><p className="text-sm text-slate-400">Hours</p><p className="text-lg font-semibold text-white">{siteConfig.openingHours}</p></div></div>
            </CardContent>
          </Card>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 p-3">
            <iframe
              src={siteConfig.mapEmbed}
              title="Map showing Irongate Locksmiths address in South Shields"
              className="h-[320px] w-full rounded-[1.5rem] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}