"use client";

import { CalendarClock, ExternalLink } from "lucide-react";
import { useId, useState, useSyncExternalStore } from "react";
import { Badge } from "@/components/ui/Badge";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { localDateString, type LocalDate } from "@/lib/dates";
import { countdownHeadline, countdownState, formatLongDate, formatShortDate, type CountdownState } from "./countdown";

export interface CountdownSessionOption {
  id: string;
  name: string;
  startsOn: LocalDate;
  endsOn: LocalDate;
  isProvisional: boolean;
  isDemo: boolean;
  sourceUrl: string | null;
}

export interface CountdownBoardOption {
  slug: string;
  shortName: string;
  qualifications: { id: string; label: string; sessions: CountdownSessionOption[] }[];
}

export interface ExamCountdownProps {
  boards: readonly CountdownBoardOption[];
}

// The visitor's "today" in the platform time zone. The server snapshot is null, so the cached HTML never bakes in a
// day count that could be stale; the number appears right after hydration.
const noopSubscribe = () => () => {};
const clientToday = () => localDateString(new Date(), DEFAULT_TIMEZONE);
const serverToday = () => null;

function describe(state: CountdownState, label: string, session: CountdownSessionOption): string {
  switch (state.kind) {
    case "upcoming":
      return `until ${label} ${session.name} begins`;
    case "starts_today":
      return `${label} ${session.name} begins today`;
    case "in_progress":
      return `${label} ${session.name} is under way`;
    case "ended":
      return `${label} ${session.name} has ended`;
  }
}

/**
 * Free exam countdown (§17, §46): choose board → qualification → session and see the days left. Sessions and dates are
 * data (admin-entered); provisional dates are labelled as such and link to the board's timetable when recorded.
 */
export function ExamCountdown({ boards }: ExamCountdownProps) {
  const id = useId();
  const today = useSyncExternalStore(noopSubscribe, clientToday, serverToday);
  const [boardSlug, setBoardSlug] = useState(boards[0]?.slug ?? "");
  const board = boards.find((b) => b.slug === boardSlug) ?? boards[0];
  const [qualificationId, setQualificationId] = useState(board?.qualifications[0]?.id ?? "");
  const qualification = board?.qualifications.find((q) => q.id === qualificationId) ?? board?.qualifications[0];
  const [sessionId, setSessionId] = useState(qualification?.sessions[0]?.id ?? "");
  const session = qualification?.sessions.find((s) => s.id === sessionId) ?? qualification?.sessions[0];

  if (!board || !qualification || !session) return null;

  const state = today ? countdownState(today, session.startsOn, session.endsOn) : null;

  return (
    <div className="rounded-card border border-border bg-surface p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Examination board" id={`${id}-board`}>
          <Select
            value={board.slug}
            onChange={(event) => {
              const next = boards.find((b) => b.slug === event.target.value);
              setBoardSlug(event.target.value);
              setQualificationId(next?.qualifications[0]?.id ?? "");
              setSessionId(next?.qualifications[0]?.sessions[0]?.id ?? "");
            }}
            options={boards.map((b) => ({ value: b.slug, label: b.shortName }))}
          />
        </Field>
        <Field label="Qualification" id={`${id}-qualification`}>
          <Select
            value={qualification.id}
            onChange={(event) => {
              const next = board.qualifications.find((q) => q.id === event.target.value);
              setQualificationId(event.target.value);
              setSessionId(next?.sessions[0]?.id ?? "");
            }}
            options={board.qualifications.map((q) => ({ value: q.id, label: q.label }))}
          />
        </Field>
        <Field label="Exam session" id={`${id}-session`}>
          <Select value={session.id} onChange={(event) => setSessionId(event.target.value)} options={qualification.sessions.map((s) => ({ value: s.id, label: s.name }))} />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-card bg-primary-soft p-5 sm:flex-row sm:items-center sm:p-6" aria-live="polite" aria-atomic="true">
        <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface text-primary [&_svg]:size-6">
          <CalendarClock />
        </span>
        <div className="min-w-0">
          <p className="text-3xl font-bold tracking-tight text-on-primary-soft tabular-nums sm:text-4xl">{state ? countdownHeadline(state) : formatShortDate(session.startsOn)}</p>
          <p className="mt-1 text-base text-on-primary-soft">{state ? describe(state, qualification.label, session) : `${qualification.label} ${session.name}`}</p>
          <p className="mt-1 text-sm text-on-primary-soft">First exam day: {formatLongDate(session.startsOn)}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted">
        {session.isProvisional && (
          <Badge tone="warning" size="sm">
            Provisional date
          </Badge>
        )}
        {session.isDemo && (
          <Badge tone="warning" size="sm">
            Demo data
          </Badge>
        )}
        <span>
          {session.isProvisional
            ? "This date has not been confirmed against the official timetable yet. Always check your exam timetable."
            : "Always check the official timetable for your individual papers."}
        </span>
        {session.sourceUrl && (
          <a href={session.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 font-medium text-primary underline underline-offset-4">
            Official timetable
            <ExternalLink aria-hidden="true" className="size-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </div>
  );
}
