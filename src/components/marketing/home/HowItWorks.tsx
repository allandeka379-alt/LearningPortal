import { howItWorksSteps } from "../copy";
import { Section } from "../Section";

export interface HowItWorksProps {
  aiEnabled?: boolean;
  /** The one-off Full access price from the database ("US$1"), or null when nothing is on sale. */
  priceLabel?: string | null;
  id?: string;
  tone?: "plain" | "surface" | "subtle";
}

/** "How it works" (§45, §52): the journey from sign-up to exam day as numbered steps (AI tutor only when on). */
export function HowItWorks({ aiEnabled = false, priceLabel = null, id = "how-it-works", tone = "plain" }: HowItWorksProps) {
  return (
    <Section
      id={id}
      tone={tone}
      eyebrow="Getting started"
      title="From sign-up to your first lesson in minutes"
      description="Tell us your form and subjects, unlock everything with one payment, and start where your class is."
    >
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {howItWorksSteps(aiEnabled, priceLabel).map((step, index) => (
          <li key={step.title} className="flex gap-4 rounded-card border border-border bg-surface p-5">
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-on-primary tabular-nums"
            >
              {index + 1}
            </span>
            <div className="min-w-0">
              <h3 className="font-semibold text-text">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
