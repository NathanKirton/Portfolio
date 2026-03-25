"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/lib/content";

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[index].author + index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="p-8 sm:p-10"
            >
              <Quote className="h-8 w-8 text-cyan-300" />
              <p className="mt-6 text-xl leading-8 text-white">“{testimonials[index].quote}”</p>
              <div className="mt-6 text-sm text-slate-300">
                <span className="font-semibold text-white">{testimonials[index].author}</span>
                <span className="mx-2 text-slate-500">•</span>
                {testimonials[index].location}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
      <div className="flex gap-2">
        {testimonials.map((testimonial, itemIndex) => (
          <button
            key={testimonial.author + itemIndex}
            onClick={() => setIndex(itemIndex)}
            className={`h-2 rounded-full transition-all ${itemIndex === index ? "w-10 bg-cyan-300" : "w-2 bg-white/20"}`}
            aria-label={`Show testimonial ${itemIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}