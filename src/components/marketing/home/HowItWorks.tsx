import { howItWorksSteps } from "../copy";
import { Section } from "../Section";

/** "How it works" (§45): the §52 journey from sign-up to daily practice, as numbered steps (AI tutor only when on). */
export function HowItWorks({ aiEnabled = false }: { aiEnabled?: boolean }) {
  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="From sign-up to knowing where you stand in minutes"
      description="Tell us what you are studying, find out where you stand, and practise what matters most."
    >
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {howItWorksSteps(aiEnabled).map((step, index) => (
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
