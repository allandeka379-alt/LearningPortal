import { Gauge, Sparkles } from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { TutorQuota } from "@/server/tutor/protocol";
import { quotaText } from "./labels";

/** Why the tutor cannot answer right now (pages compute it from `getTutorStatus`). */
export type TutorAvailability = "ready" | "not_configured" | "disabled" | "not_entitled";

export interface TutorAvailabilityNoticeProps {
  availability: TutorAvailability;
  upgradeHref: string;
  className?: string;
}

/**
 * Calm, explicit states instead of a broken chat (§6.8 "AI is not configured", kill switch, plan without the tutor).
 * Server-compatible; nothing here pretends an answer exists.
 */
export function TutorAvailabilityNotice({ availability, upgradeHref, className }: TutorAvailabilityNoticeProps) {
  switch (availability) {
    case "ready":
      return null;
    case "not_configured":
      return (
        <Alert tone="neutral" icon={<Sparkles aria-hidden="true" />} title="AI tutor is not configured yet" className={className}>
          The AI tutor hasn&apos;t been switched on for this site yet. You can keep studying with lessons, practice and your study
          plan in the meantime.
        </Alert>
      );
    case "disabled":
      return (
        <Alert tone="info" title="The AI tutor is paused" className={className}>
          AI help is switched off for a while. Please try again later.
        </Alert>
      );
    case "not_entitled":
      return (
        <Alert
          tone="accent"
          title="The AI tutor isn't included in your plan"
          className={className}
          action={
            <ButtonLink href={upgradeHref} variant="accent">
              See plans
            </ButtonLink>
          }
        >
          Upgrade to ask the tutor about any topic you&apos;re studying.
        </Alert>
      );
  }
}

export interface QuotaIndicatorProps {
  quota: TutorQuota | null;
  upgradeHref: string;
  className?: string;
}

/** "3 of 30 messages left today", with an upgrade prompt once the allowance is used up. Nothing for unlimited plans. */
export function QuotaIndicator({ quota, upgradeHref, className }: QuotaIndicatorProps) {
  const text = quotaText(quota);
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
      title="You've used today's tutor messages"
      className={className}
      action={
        <ButtonLink href={upgradeHref} variant="accent">
          Upgrade for more
        </ButtonLink>
      }
    >
      Your allowance resets tomorrow. Upgrade your plan for more messages each day.
    </Alert>
  );
}
