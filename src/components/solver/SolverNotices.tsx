import { Gauge, Sparkles, Timer } from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { SolverAvailability, SolverQuota } from "@/server/solver/types";
import { NOT_CONFIGURED_TITLE, solverQuotaText } from "./labels";

export interface SolverAvailabilityNoticeProps {
  availability: SolverAvailability;
  upgradeHref: string;
  /** Where the student resumes their exam (exam lock). */
  examsHref?: string;
  className?: string;
}

/**
 * Calm, explicit states instead of a broken form (ARCHITECTURE §6.8 "AI is not configured", kill switch, plan without
 * the solver, exam integrity). Server-compatible; nothing here pretends an answer exists.
 */
export function SolverAvailabilityNotice({ availability, upgradeHref, examsHref = "/app/exams", className }: SolverAvailabilityNoticeProps) {
  switch (availability) {
    case "ready":
      return null;
    case "not_configured":
      return (
        <Alert tone="neutral" icon={<Sparkles aria-hidden="true" />} title={NOT_CONFIGURED_TITLE} className={className}>
          The question solver hasn&apos;t been switched on for this site yet. You can keep studying with lessons, practice and your
          study plan in the meantime.
        </Alert>
      );
    case "disabled":
      return (
        <Alert tone="info" title="The question solver is paused" className={className}>
          AI help is switched off for a while. Please try again later.
        </Alert>
      );
    case "not_entitled":
      return (
        <Alert
          tone="accent"
          title="The question solver isn't included in your plan"
          className={className}
          action={
            <ButtonLink href={upgradeHref} variant="accent">
              See plans
            </ButtonLink>
          }
        >
          Upgrade to get step-by-step help with any question you&apos;re stuck on.
        </Alert>
      );
    case "exam_locked":
      return (
        <Alert
          tone="info"
          icon={<Timer aria-hidden="true" />}
          title="AI help is paused during your exam"
          className={className}
          action={
            <ButtonLink href={examsHref} variant="outline">
              Go to your exam
            </ButtonLink>
          }
        >
          You have a test, exam or assignment in progress that doesn&apos;t allow the solver. Submit it first, and then you can use
          the solver again.
        </Alert>
      );
  }
}

export interface SolverQuotaIndicatorProps {
  quota: SolverQuota | null;
  upgradeHref: string;
  className?: string;
}

/** "3 of 10 questions left today", with an upgrade prompt once the allowance is used up. Nothing for unlimited plans. */
export function SolverQuotaIndicator({ quota, upgradeHref, className }: SolverQuotaIndicatorProps) {
  const text = solverQuotaText(quota);
  if (!quota || !text) return null;
  if (quota.remaining > 0) {
    return (
      <p className={cn("inline-flex items-center gap-1.5 text-sm text-muted", className)}>
        <Gauge aria-hidden="true" className="size-4" />
        {text}
      </p>
    );
  }
  return (
    <Alert
      tone="accent"
      title="You've used today's solver questions"
      className={className}
      action={
        <ButtonLink href={upgradeHref} variant="accent">
          Upgrade for more
        </ButtonLink>
      }
    >
      Your allowance resets tomorrow. Upgrade your plan for more questions each day.
    </Alert>
  );
}
