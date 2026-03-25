"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/lib/content";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  phone: z.string().min(8, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  serviceType: z.string().min(1, "Please choose a service."),
  message: z.string().min(10, "Please include a short message about the job."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceType: "",
      message: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Something went wrong.");
      }

      toast.success("Message sent. Simon will get back to you shortly.");
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to send your message right now.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your full name" {...register("name")} aria-invalid={Boolean(errors.name)} />
          {errors.name ? <p className="text-sm text-rose-300">{errors.name.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="07546 126613" {...register("phone")} aria-invalid={Boolean(errors.phone)} />
          {errors.phone ? <p className="text-sm text-rose-300">{errors.phone.message}</p> : null}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} aria-invalid={Boolean(errors.email)} />
          {errors.email ? <p className="text-sm text-rose-300">{errors.email.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="serviceType">Service Type</Label>
          <select
            id="serviceType"
            className="flex h-12 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            {...register("serviceType")}
            aria-invalid={Boolean(errors.serviceType)}
          >
            <option value="">Choose a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
          {errors.serviceType ? <p className="text-sm text-rose-300">{errors.serviceType.message}</p> : null}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Tell us what has happened, what type of door or lock it is, and whether this is urgent." {...register("message")} aria-invalid={Boolean(errors.message)} />
        {errors.message ? <p className="text-sm text-rose-300">{errors.message.message}</p> : null}
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}