import { CalendarClock, ChartColumn, Hourglass, ListChecks, Target } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { SIGN_UP_HREF } from "../site-nav";
import { Section } from "../Section";

const PACK_FEATURES: readonly { title: string; icon: ReactNode }[] = [
  { title: "Mock exams", icon: <ListChecks aria-hidden="true" /> },
  { title: "Weak-topic practice", icon: <Target aria-hidden="true" /> },
  { title: "Daily revision plan", icon: <CalendarClock aria-hidden="true" /> },
  { title: "Exam countdown", icon: <Hourglass aria-hidden="true" /> },
  { title: "Instant progress tracking", icon: <ChartColumn aria-hidden="true" /> },
];

const TRUST_LOGOS = [
  { src: "/images/brands/zimsec.png", alt: "ZIMSEC", width: 1910, height: 1909, className: "max-h-12" },
  { src: "/images/brands/cambridge.png", alt: "Cambridge", width: 452, height: 128, className: "max-h-9" },
] as const;

export function ExamRescuePack() {
  return (
    <Section
      id="exam-rescue-pack"
      tone="surface"
      eyebrow="Exam Rescue Pack"
      title="Exam Rescue Pack: full access for $1"
      description="A fast route from panic to a practical revision plan for students writing soon."
      action={<ButtonLink href={SIGN_UP_HREF}>Get full access</ButtonLink>}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.65fr] lg:items-center">
        <ul className="grid gap-3 sm:grid-cols-2">
          {PACK_FEATURES.map((feature) => (
            <li key={feature.title} className="flex min-h-16 items-center gap-3 rounded-card border border-border bg-bg p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary [&_svg]:size-5">{feature.icon}</span>
              <span className="font-semibold text-text">{feature.title}</span>
            </li>
          ))}
        </ul>
        <div className="rounded-card border border-border bg-bg p-5">
          <p className="text-sm font-semibold text-text">Built for Zimbabwean exam paths</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {TRUST_LOGOS.map((logo) => (
              <span key={logo.src} className="inline-flex h-16 min-w-32 items-center justify-center rounded-md border border-border bg-white px-3 py-2 shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element -- fixed public board logos in small trust chips. */}
                <img src={logo.src} width={logo.width} height={logo.height} alt={logo.alt} loading="lazy" decoding="async" className={`w-auto object-contain ${logo.className}`} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
