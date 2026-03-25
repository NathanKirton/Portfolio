import { CheckCircle2, ShieldCheck } from "lucide-react";

import { FadeLeft, FadeRight, FadeUp } from "@/components/shared/animate";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getMetadata } from "@/lib/site";

export const metadata = getMetadata({
  title: "About Irongate Locksmiths",
  description: "Learn more about Irongate Locksmiths, the local family based locksmith service in South Shields with Master Locksmith training and trusted local coverage.",
  path: "/about",
});

const aboutPoints = [
  "Irongate Locksmiths have been a consistent and trustworthy locksmith service since day one.",
  "All locksmiths are committed to providing a low cost locksmith service throughout the region to the highest quality.",
  "We are a fully trained Master Locksmith service and have trained under Master Locksmith Steven J Taylor.",
  "We are also part of the Guild of Master Locksmiths.",
  "Each locksmith is fully DBS checked, carries full insurance cover and uses British Standard hardware where required.",
];

export default function AboutPage() {
  return (
    <div className="container-shell space-y-12 py-12 pb-24 lg:py-16">
      <FadeUp>
        <section className="max-w-4xl">
          <Badge>About Irongate</Badge>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white sm:text-6xl">A local locksmith service built on trust, skill and fair pricing</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            We do not want to be just a locksmith, we want to be your family locksmith for generations to come, which means we keep our pricing right and our customers happy.
          </p>
        </section>
      </FadeUp>

      <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <FadeLeft>
          <Card>
            <CardContent className="space-y-5 p-6 sm:p-8">
              {aboutPoints.map((point) => (
                <div key={point} className="flex gap-4 text-slate-300">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
                  <p className="leading-7">{point}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </FadeLeft>
        <FadeRight delay={0.1}>
          <Card>
            <CardContent className="p-6 sm:p-8">
              <ShieldCheck className="h-10 w-10 text-cyan-300" />
              <h2 className="mt-5 text-2xl font-semibold text-white">Master Locksmith and Owner</h2>
              <p className="mt-4 leading-7 text-slate-300">
                Irongate Locksmiths have worked throughout the local area for over a decade and stay close to the local community. You get clear explanations, honest pricing and direct contact with the locksmith doing the work.
              </p>
              <p className="mt-4 leading-7 text-slate-300">
                Whether the job is a lock upgrade, emergency lockout, UPVC repair or boarding service, the aim is always the same: keep the property secure and the pricing sensible.
              </p>
            </CardContent>
          </Card>
        </FadeRight>
      </section>
    </div>
  );
}