import { PhoneCall } from "lucide-react";

import { siteConfig } from "@/lib/content";

export function MobileCallButton() {
  return (
    <a
      href={siteConfig.phoneHref}
      className="fixed bottom-4 left-4 right-4 z-40 flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-4 text-sm font-semibold text-slate-950 shadow-[0_20px_50px_rgba(0,212,255,0.3)] lg:hidden"
      aria-label={`Call ${siteConfig.phoneDisplay}`}
    >
      <PhoneCall className="h-4 w-4" />
      Call {siteConfig.phoneDisplay}
    </a>
  );
}