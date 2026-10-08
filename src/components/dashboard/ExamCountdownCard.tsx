import { CalendarClock } from "lucide-react";
import { formatLocalDate } from "@/components/student/format";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { formatNumber, pluralize } from "@/lib/format";

export interface ExamCountdownCardProps {
  countdown: {
    name: string;
    startsOn: string;
    /** Last day of the session; with a negative `daysUntil` the session is under way. */
    endsOn?: string;
    daysUntil: number;
    isProvisional: boolean;
    isDemo: boolean;
  } | null;
  /** Where the student can set a target examination when none is set. */
  setTargetHref?: string;
  className?: string;
}

function DateBadges({ countdown }: { countdown: NonNullable<ExamCountdownCardProps["countdown"]> }) {
  if (!countdown.isProvisional && !countdown.isDemo) return null;
  return (
    <div className="mt-1 flex flex-wrap gap-2">
      {countdown.isProvisional && (
        <Badge tone="accent" size="sm">
          Provisional date
        </Badge>
      )}
      {countdown.isDemo && (
        <Badge tone="neutral" size="sm">
          Demo date (development only)
        </Badge>
      )}
    </div>
  );
}

/**
 * §17 exam countdown: "126 days until your examination", the session (from data) and its first day. Provisional
 * dates and development demo sessions are labelled. The day count is the view's single hero figure. Server
 * component; `id="exam-countdown"` is the header pill's target.
 */
export function ExamCountdownCard({ countdown, setTargetHref = "/app/subjects/manage", className }: ExamCountdownCardProps) {
  if (countdown && countdown.daysUntil < 0 && countdown.endsOn) {
    // The target session has started and not yet ended (the read model never returns an ended one).
    return (
      <Card as="section" id="exam-countdown" aria-labelledby="exam-countdown-title" className={cn("scroll-mt-20", className)}>
        <CardBody className="flex h-full flex-col gap-2">
          <h2 id="exam-countdown-title" className="flex items-center gap-2 text-sm font-semibold text-muted">
            <CalendarClock aria-hidden="true" className="size-4" />
            Exam countdown
          </h2>
          <p className="text-2xl font-bold tracking-tight text-text">Your examinations are under way</p>
          <p className="text-sm text-muted">
            {countdown.name} · {formatLocalDate(countdown.startsOn)} to {formatLocalDate(countdown.endsOn)}
          </p>
          <DateBadges countdown={countdown} />
          <div className="mt-auto pt-1">
            <ButtonLink href={setTargetHref} variant="outline">
              Change your target exam
            </ButtonLink>
          </div>
        </CardBody>
      </Card>
    );
  }
  if (!countdown || countdown.daysUntil < 0) {
    return (
      <Card as="section" id="exam-countdown" aria-labelledby="exam-countdown-title" className={cn("scroll-mt-20", className)}>
        <CardBody className="flex h-full flex-col gap-3">
          <h2 id="exam-countdown-title" className="flex items-center gap-2 text-sm font-semibold text-muted">
            <CalendarClock aria-hidden="true" className="size-4" />
            Exam countdown
          </h2>
          <p className="text-base font-semibold text-text">No examination date yet</p>
          <p className="text-sm text-muted">Choose the examination you are preparing for to see how many days you have left.</p>
          <div className="mt-auto pt-1">
            <ButtonLink href={setTargetHref} variant="outline">
              Set your target exam
            </ButtonLink>
          </div>
        </CardBody>
      </Card>
    );
  }

  const days = Math.floor(countdown.daysUntil);
  return (
    <Card as="section" id="exam-countdown" aria-labelledby="exam-countdown-title" className={cn("scroll-mt-20", className)}>
      <CardBody className="flex h-full flex-col gap-2">
        <h2 id="exam-countdown-title" className="flex items-center gap-2 text-sm font-semibold text-muted">
          <CalendarClock aria-hidden="true" className="size-4" />
          Exam countdown
        </h2>
        {days === 0 ? (
          <p className="text-2xl font-bold tracking-tight text-text">Your examination starts today</p>
        ) : (
          <p className="text-text">
            <span className="block text-5xl font-bold tracking-tight">{formatNumber(days)}</span>
            <span className="mt-1 block text-base font-medium">{pluralize(days, "day")} until your examination</span>
          </p>
        )}
        <p className="text-sm text-muted">
          {countdown.name} · starts {formatLocalDate(countdown.startsOn)}
        </p>
        <DateBadges countdown={countdown} />
        {countdown.isProvisional && (
          <p className="text-xs text-muted">Provisional until it is confirmed against the official examination timetable.</p>
        )}
      </CardBody>
    </Card>
  );
}
