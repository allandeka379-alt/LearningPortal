import { ArrowRight, ClipboardList } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

export interface DiagnosticOfferCardProps {
  /** OFFER: never taken (and not skipped). SKIPPED: the student skipped it during onboarding (softer reminder). */
  status: "OFFER" | "SKIPPED";
  href?: string;
  className?: string;
}

/**
 * "Find your starting point" (the diagnostic) on the dashboard (§46, §52): shown until the student's first diagnostic is finished. A
 * student who skipped it in onboarding gets a quieter reminder instead of the full invitation. Server component.
 */
export function DiagnosticOfferCard({ status, href = "/app/diagnostic", className }: DiagnosticOfferCardProps) {
  if (status === "SKIPPED") {
    return (
      <Card as="section" variant="sunken" aria-labelledby="diagnostic-offer-title" className={cn("flex items-start gap-3 p-4", className)}>
        <ClipboardList aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-muted" />
        <div className="min-w-0 space-y-1">
          <h2 id="diagnostic-offer-title" className="text-base font-semibold text-text">
            The diagnostic is still here when you want it
          </h2>
          <p className="text-sm text-muted">A short test of each subject shows your strengths and gaps, so your practice starts in the right place.</p>
          <Link href={href} className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline">
            Take the diagnostic
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </Card>
    );
  }
  return (
    <Card as="section" aria-labelledby="diagnostic-offer-title" className={cn("border-primary/40 p-4 sm:p-5", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft">
            <ClipboardList aria-hidden="true" className="size-5" />
          </span>
          <div className="min-w-0 space-y-1">
            <h2 id="diagnostic-offer-title" className="text-lg font-semibold text-text">
              Find your starting point
            </h2>
            <p className="text-sm text-muted">
              A short test of each of your subjects. It finds your strengths and gaps, sets your starting mastery and shapes
              your study plan.
            </p>
          </div>
        </div>
        <ButtonLink href={href} className="shrink-0" iconEnd={<ArrowRight aria-hidden="true" />}>
          Start the diagnostic
        </ButtonLink>
      </div>
    </Card>
  );
}
