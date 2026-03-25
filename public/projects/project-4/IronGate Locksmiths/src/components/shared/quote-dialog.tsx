"use client";

import { Clock3, PhoneCall, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { siteConfig } from "@/lib/content";

export function QuoteDialog({ triggerLabel = "Get Instant Quote" }: { triggerLabel?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get an Instant Locksmith Quote</DialogTitle>
          <DialogDescription>
            For the fastest quote, call Simon directly and describe the lock, door and issue. For urgent jobs, we are available 24 hours.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <PhoneCall className="mb-3 h-5 w-5 text-cyan-300" />
            Direct phone line
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <Clock3 className="mb-3 h-5 w-5 text-cyan-300" />
            24/7 emergency response
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <ShieldCheck className="mb-3 h-5 w-5 text-cyan-300" />
            Honest local pricing
          </div>
        </div>
        <div className="mt-6 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">Call now</p>
          <a href={siteConfig.phoneHref} className="mt-2 block text-3xl font-semibold text-white">
            {siteConfig.phoneDisplay}
          </a>
          <p className="mt-3 text-sm text-slate-300">Lockouts from £44.99, locks from £19.99, and UPVC door servicing from £29.99.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}