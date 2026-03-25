"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ServiceCategory, services } from "@/lib/content";

const filters: Array<ServiceCategory | "All"> = ["All", "Emergency", "Doors", "Security"];

export function ServicesFilter() {
  const [active, setActive] = useState<ServiceCategory | "All">("All");

  const visible = active === "All" ? services : services.filter((service) => service.category === active);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <Button key={filter} variant={filter === active ? "default" : "secondary"} onClick={() => setActive(filter)}>
            {filter}
          </Button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {visible.map((service, index) => (
          <motion.div key={service.slug} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <CardTitle>{service.title}</CardTitle>
                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">{service.price}</span>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm leading-6 text-slate-300">{service.details}</p>
                <ul className="grid gap-2 text-sm text-slate-300">
                  {service.highlights.map((highlight) => (
                    <li key={highlight}>• {highlight}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/contact">Book Now</Link>
                  </Button>
                  <Button asChild variant="ghost">
                    <a href="tel:07546126613">Call Now</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}