"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Clock3, MapPinned, ShieldCheck, Wallet } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { QuoteDialog } from "@/components/shared/quote-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig, trustBadges } from "@/lib/content";

const heroStats = [
  { label: "Local rapid response", value: "Under 30 mins", icon: Clock3 },
  { label: "Emergency lockout labour", value: "From £44.99", icon: Wallet },
  { label: "Trusted workmanship", value: "DBS & insured", icon: ShieldCheck },
  { label: "Real local coverage", value: "South Shields + North East", icon: MapPinned },
];

const badgeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.45 } },
};

const badgeItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const statsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const statsItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export function AnimatedHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const rawImageY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const imageY = useSpring(rawImageY, { stiffness: 50, damping: 22 });

  return (
    <>
      <section
        ref={heroRef}
        className="container-shell grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20"
      >
        {/* Left — animated text content */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Badge>24 hour emergency locksmith</Badge>
          </motion.div>

          <motion.h1
            className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            24/7 Emergency Locksmith South Shields
          </motion.h1>

          <motion.p
            className="mt-5 max-w-2xl text-lg leading-8 text-slate-300"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          >
            Arrive in under 30 mins • From £44.99 • Local &amp; Trusted. Irongate Locksmiths provide lockouts, lock changes, UPVC door repairs, van locks and emergency boarding across South Shields and the North East.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          >
            <Button asChild size="lg">
              <a href={siteConfig.phoneHref}>Call {siteConfig.phoneDisplay}</a>
            </Button>
            <QuoteDialog />
          </motion.div>

          {/* Trust badges — stagger in after buttons */}
          <motion.div
            className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
            variants={badgeContainer}
            initial="hidden"
            animate="visible"
          >
            {trustBadges.map((badge) => (
              <motion.div
                key={badge.title}
                variants={badgeItem}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"
              >
                <div className="font-semibold text-white">{badge.title}</div>
                <div className="mt-2 leading-6">{badge.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right — hero image with scroll parallax */}
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 p-3 shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
          style={{ y: imageY }}
          initial={{ opacity: 0, x: 46 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,212,255,0.22),_transparent_38%)]" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10">
            <Image
              src={siteConfig.heroImage}
              alt="Placeholder hero image showing a locksmith working carefully on a secure front door in evening light"
              width={1600}
              height={1200}
              priority
              className="h-[520px] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-6">
              <motion.div
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 backdrop-blur"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">Trusted local service</p>
                <p className="mt-3 text-base leading-7 text-slate-200">
                  Family based locksmith business in South Shields UK. No call centre, no hidden fees, and honest advice from a real local locksmith.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats row — stagger on scroll into view */}
      <motion.section
        className="container-shell grid gap-4 pb-12 sm:grid-cols-2 xl:grid-cols-4"
        variants={statsContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {heroStats.map((item) => (
          <motion.div key={item.label} variants={statsItem}>
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">{item.label}</div>
                  <div className="text-lg font-semibold text-white">{item.value}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>
    </>
  );
}
