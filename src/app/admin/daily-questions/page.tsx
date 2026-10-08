import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection } from "@/components/admin/DetailParts";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatDateTime, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { buildHref, firstParam, uuidParam, type PageSearchParams } from "@/components/admin/search-params";
import { DemoBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatNumber } from "@/lib/format";
import { DAILY_CALENDAR_DAYS, DAILY_DIFFICULTY_MAX, DAILY_DIFFICULTY_MIN, DAILY_REUSE_WINDOW_DAYS } from "@/server/cms/daily-questions/core";
import { getDailyQuestionCalendar, type DailyCalendarDay, type DailyScopeSummary } from "@/server/cms/daily-questions/service";
import { isFeatureEnabled } from "@/server/features";
import { dayLabel, questionMeta } from "./_components/labels";
import { autoPickDailyQuestionAction, clearDailyQuestionAction } from "./actions";

export const metadata = { title: "Daily questions" };

const PATH = "/admin/daily-questions";

function scopeParam(subjectId: string | null): string {
  return subjectId ?? "all";
}

/**
 * /admin/daily-questions — the daily-question calendar (§46): the next 14 days of one scope (a subject, or the whole
 * qualification), filled automatically each night at 22:30 CAT and overridable day by day. `content.publish`.
 */
export default async function AdminDailyQuestionsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("content.publish", { next: PATH });
  const params = await searchParams;
  const whatsapp = await isFeatureEnabled("whatsapp");
  const subjectParam = firstParam(params, "subject");
  const calendar = await getDailyQuestionCalendar(actor, {
    qualificationId: uuidParam(params, "qualification") ?? null,
    subjectId: subjectParam === "all" ? "all" : (uuidParam(params, "subject") ?? null),
  });
  const { qualification, scope } = calendar;

  return (
    <Container size="wide">
      <PageHeader
        title="Daily questions"
        description={`One question a day per subject for the daily question page${whatsapp ? ", the student app and WhatsApp" : " and the student app"}. Each night at 22:30 the scheduler fills tomorrow from published, free, auto-marked questions flagged as daily-eligible (difficulty ${DAILY_DIFFICULTY_MIN}-${DAILY_DIFFICULTY_MAX}, varied topics, not used in the last ${DAILY_REUSE_WINDOW_DAYS} days). Choose a question yourself to override a day.`}
      />
      {qualification === null || scope === null ? (
        <EmptyState icon={<CalendarDays aria-hidden="true" />} title="No qualifications yet" description="Create a qualification and its subjects first." />
      ) : (
        <>
          <FilterBar
            action={PATH}
            label="Choose the calendar"
            filters={[
              {
                kind: "select",
                name: "qualification",
                label: "Qualification",
                options: calendar.qualifications.map((q) => ({ value: q.id, label: q.catalogueStatus === "AVAILABLE" ? q.label : `${q.label} (${humanizeEnum(q.catalogueStatus).toLowerCase()})` })),
                value: qualification.id,
              },
              {
                kind: "select",
                name: "subject",
                label: "Scope",
                options: calendar.scopes.map((s) => ({ value: scopeParam(s.subjectId), label: s.name })),
                value: scopeParam(scope.subjectId),
              },
            ]}
          />
          <ScopeNotice scope={scope} />
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
            <AdminSection title={`Next ${DAILY_CALENDAR_DAYS} days: ${scope.name}`} description={qualification.label} flush>
              <DataTable
                caption={`Daily questions for ${scope.name}, ${qualification.label}`}
                captionHidden
                rows={calendar.days}
                rowKey={(day) => day.date}
                className="rounded-none border-x-0 border-b-0"
                columns={[
                  {
                    key: "day",
                    header: "Day",
                    primary: true,
                    cell: (day) => (
                      <span className="flex flex-wrap items-center gap-2 whitespace-nowrap">
                        <span className="font-medium text-text">{dayLabel(day.date)}</span>
                        {day.isToday && (
                          <Badge size="sm" tone="primary">
                            Today
                          </Badge>
                        )}
                      </span>
                    ),
                  },
                  { key: "question", header: "Question", cell: (day) => <QuestionCell day={day} /> },
                  { key: "source", header: "Chosen by", cell: (day) => <SourceCell day={day} /> },
                  {
                    key: "actions",
                    header: <span className="sr-only">Actions</span>,
                    align: "end",
                    cell: (day) => <DayActions day={day} qualificationId={qualification.id} subjectId={scope.subjectId} />,
                  },
                ]}
              />
            </AdminSection>
            <AdminSection title="Scopes" description={`Eligible questions and days scheduled in the next ${DAILY_CALENDAR_DAYS} days.`} flush>
              <DataTable
                caption="Daily-question scopes of this qualification"
                captionHidden
                rows={calendar.scopes}
                rowKey={(s) => scopeParam(s.subjectId)}
                className="rounded-none border-x-0 border-b-0"
                columns={[
                  {
                    key: "name",
                    header: "Scope",
                    primary: true,
                    cell: (s) => (
                      <Link
                        href={buildHref(PATH, { qualification: qualification.id, subject: scopeParam(s.subjectId) })}
                        aria-current={s.subjectId === scope.subjectId ? "page" : undefined}
                        className="font-medium text-text underline-offset-4 hover:underline aria-[current=page]:text-primary"
                      >
                        {s.name}
                      </Link>
                    ),
                  },
                  { key: "pool", header: "Eligible", align: "end", cell: (s) => formatNumber(s.autoPoolSize) },
                  { key: "days", header: "Scheduled", align: "end", cell: (s) => `${s.scheduledDays}/${DAILY_CALENDAR_DAYS}` },
                  { key: "auto", header: "Nightly", cell: (s) => (s.filledAutomatically ? "Yes" : "No") },
                ]}
              />
            </AdminSection>
          </div>
        </>
      )}
    </Container>
  );
}

function ScopeNotice({ scope }: { scope: DailyScopeSummary }) {
  if (scope.filledAutomatically) return null;
  let text: string;
  if (scope.subjectId === null) {
    text =
      "The whole-qualification scope is editorial: the nightly job never fills it. Students see a whole-qualification question only for subjects without their own question that day, so it can come from a subject they do not take.";
  } else if (scope.catalogueStatus === "HIDDEN") {
    text = "This subject is hidden from students, so the nightly job skips it. You can still prepare days by hand.";
  } else if (scope.autoPoolSize === 0) {
    text = `No question of this subject is eligible yet. In the question editor, tick "Can be a daily question" on published, free, auto-marked questions of difficulty ${DAILY_DIFFICULTY_MIN}-${DAILY_DIFFICULTY_MAX}, or choose questions here day by day.`;
  } else {
    text = "The nightly job skips this subject because its qualification or exam board is hidden from students. You can still prepare days by hand.";
  }
  return (
    <Alert tone="info" className="mb-4">
      {text}
    </Alert>
  );
}

function QuestionCell({ day }: { day: DailyCalendarDay }) {
  if (!day.entry) return <span className="text-sm text-muted">Not scheduled yet</span>;
  const { question } = day.entry;
  return (
    <span className="block min-w-0 max-w-xl">
      <Link href={`/admin/questions/${question.id}`} className="text-sm text-text underline-offset-4 hover:underline">
        {question.excerpt}
      </Link>
      <span className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted">
        {questionMeta(question)}
        {question.isDemo && <DemoBadge />}
        {question.status !== "PUBLISHED" && (
          <Badge size="sm" tone="warning">
            {humanizeEnum(question.status)}
          </Badge>
        )}
      </span>
    </span>
  );
}

function SourceCell({ day }: { day: DailyCalendarDay }) {
  if (!day.entry) return <span className="text-sm text-muted">—</span>;
  return (
    <span className="flex flex-col items-start gap-1 text-xs text-muted">
      <Badge size="sm" tone={day.entry.isAutoSelected ? "neutral" : "accent"}>
        {day.entry.isAutoSelected ? "Scheduler" : "Editor"}
      </Badge>
      <span>{formatDateTime(day.entry.createdAt)}</span>
      {day.entry.attemptCount > 0 && <span>Answered by {formatNumber(day.entry.attemptCount)}</span>}
    </span>
  );
}

function DayActions({ day, qualificationId, subjectId }: { day: DailyCalendarDay; qualificationId: string; subjectId: string | null }) {
  if (!day.canChange) return <span className="text-xs text-muted">{day.lockedReason}</span>;
  const scope = { date: day.date, qualificationId, subjectId: scopeParam(subjectId) };
  return (
    <span className="flex flex-wrap justify-end gap-2">
      <ButtonLink
        href={buildHref(`${PATH}/choose`, { qualification: qualificationId, subject: scopeParam(subjectId), date: day.date })}
        variant="outline"
        size="sm"
        aria-label={`${day.entry ? "Change" : "Choose"} the question for ${dayLabel(day.date)}`}
      >
        {day.entry ? "Change" : "Choose"}
      </ButtonLink>
      {day.entry ? (
        <ConfirmAction
          action={clearDailyQuestionAction}
          fields={{ dailyQuestionId: day.entry.id }}
          triggerLabel="Clear"
          triggerVariant="ghost"
          title={`Clear ${dayLabel(day.date)}?`}
          description="The day becomes empty. The nightly job chooses a question for it the evening before, unless you choose one first."
          confirmLabel="Clear the day"
          reason={{ label: "Reason", hint: "Recorded in the audit log.", maxLength: 500 }}
        />
      ) : (
        <ConfirmAction
          action={autoPickDailyQuestionAction}
          fields={scope}
          triggerLabel="Pick now"
          triggerVariant="ghost"
          title={`Pick a question for ${dayLabel(day.date)} now?`}
          description="Runs the scheduler's choice for this day immediately, so you can review it (and change it) ahead of time."
          confirmLabel="Pick a question"
        />
      )}
    </span>
  );
}
