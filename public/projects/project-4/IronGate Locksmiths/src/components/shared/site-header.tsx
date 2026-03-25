"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, PhoneCall, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navigationLinks, siteConfig } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Irongate Locksmiths home">
          <Image src="/branding/irongate-badge.png" alt="Irongate shield icon" width={44} height={44} className="h-11 w-11 object-contain" priority />
          <div className="hidden md:block">
            <div className="text-lg font-black tracking-wide text-[#427415]">IRONGATE</div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">South Shields Locksmith Service</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white",
                pathname === link.href && "bg-white/8 text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button asChild size="lg">
            <a href={siteConfig.phoneHref}>
              <PhoneCall className="h-4 w-4" />
              Call {siteConfig.phoneDisplay}
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="rounded-full border border-white/10" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <div className="space-y-2 px-4 py-4 sm:px-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5",
                    pathname === link.href && "bg-white/8"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="w-full">
                <a href={siteConfig.phoneHref}>
                  <PhoneCall className="h-4 w-4" />
                  Call {siteConfig.phoneDisplay}
                </a>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}