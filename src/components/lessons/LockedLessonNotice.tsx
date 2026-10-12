import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { Lock } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export interface LockedLessonNoticeProps {
  upgradeHref: string;
  /** Where to go back to (e.g. the topic page). */
  backHref: string;
  backLabel: string;
  className?: string;
}

/**
 * What a student sees instead of a lesson their plan does not cover (§31): why, and where to go next. The lesson's
 * content is never rendered or sent for a locked lesson. Server component.
 */
export function LockedLessonNotice({ upgradeHref, backHref, backLabel, className }: LockedLessonNoticeProps) {
  return (
    <section aria-labelledby="locked-lesson-title" className={cn("rounded-card border border-border bg-surface px-5 py-8 text-center sm:px-8", className)}>
      <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-accent-soft text-on-accent-soft [&_svg]:size-6">
        <Lock aria-hidden="true" />
      </div>
      <h2 id="locked-lesson-title" className="text-lg font-semibold text-text">
        Unlock full access to read this lesson
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">
        Full access opens every lesson in every subject, with practice, topic tests, mock exams and flashcards. One payment
        through Paynow, and nothing renews.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <UpgradeButton fallbackHref={upgradeHref} variant="accent" />
        <ButtonLink href={backHref} variant="outline">
          {backLabel}
        </ButtonLink>
      </div>
    </section>
  );
}
