import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[60vh] flex-col items-start justify-center gap-6 py-16">
      <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">Page not found</p>
      <h1 className="text-5xl font-semibold text-white">That locksmith page does not exist.</h1>
      <p className="max-w-2xl text-lg text-slate-300">Use the main service and contact pages to find the right callout, repair or security upgrade information.</p>
      <Button asChild>
        <Link href="/">Back to homepage</Link>
      </Button>
    </div>
  );
}