import { SearchX } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { AdminSection } from "@/components/admin/DetailParts";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatLocalDate } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { buildHref, dateParam, enumParam, firstParam, uuidParam, type PageSearchParams } from "@/components/admin/search-params";
import { DemoBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { DAILY_DIFFICULTY_MAX, DAILY_DIFFICULTY_MIN, DAILY_REUSE_WINDOW_DAYS } from "@/server/cms/daily-questions/core";
import { listDailyQuestionCandidates, type DailyCandidatePage, type DailyCandidateItem } from "@/server/cms/daily-questions/service";
import { isAppError } from "@/server/lib/errors";
import { dayLabel, questionMeta } from "../_components/labels";
import { scheduleDailyQuestionAction } from "../actions";

export const metadata = { title: "Choose a daily question" };

const PATH = "/admin/daily-questions/choose";
const POOLS = ["auto", "all"] as const;

/**
 * /admin/daily-questions/choose — pick the question of one day and scope (an editor's override, audited). Lists the
 * scheduler's pool by default, or every published, free, auto-marked question of the scope; searchable by text.
 */
export default async function ChooseDailyQuestionPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("content.publish", { next: "/admin/daily-questions" });
  const params = await searchParams;
  const qualificationId = uuidParam(params, "qualification");
  const date = dateParam(params, "date");
  const subjectRaw = firstParam(params, "subject");
  const subjectId = subjectRaw === "all" ? null : uuidParam(params, "subject");
  if (!qualificationId || !date || subjectId === undefined) notFound();
  const pool = enumParam(params, "pool", POOLS) ?? "auto";
  const q = firstParam(params, "q");

  let page: DailyCandidatePage;
  try {
    page = await listDailyQuestionCandidates(actor, { date, qualificationId, subjectId, q, autoOnly: pool === "auto", cursor: uuidParam(params, "cursor") });
  } catch (error) {
    if (isAppError(error) && (error.code === "NOT_FOUND" || error.code === "VALIDATION")) notFound();
    throw error;
  }
  const scopeName = page.subject?.name ?? "Whole qualification";
  const calendarHref = buildHref("/admin/daily-questions", { qualification: page.qualification.id, subject: subjectId ?? "all" });
  const day = dayLabel(page.date);

  return (
    <Container size="wide">
      <PageHeader
        title={`Choose the question for ${day}`}
        eyebrow={`${page.qualification.label} · ${scopeName}`}
        breadcrumbs={[{ label: "Daily questions", href: calendarHref }, { label: formatLocalDate(page.date) }]}
        description={`Your choice replaces the scheduler's for this day and is never overwritten by it. The scheduler's own pool is daily-eligible questions of difficulty ${DAILY_DIFFICULTY_MIN}-${DAILY_DIFFICULTY_MAX} not used within ${DAILY_REUSE_WINDOW_DAYS} days.`}
      />
      {!page.canChange && (
        <Alert tone="warning" className="mb-4">
          {page.lockedReason}
        </Alert>
      )}
      <AdminSection title="Currently scheduled" className="mb-6">
        {page.current ? (
          <div className="space-y-1 text-sm">
            <Link href={`/admin/questions/${page.current.question.id}`} className="text-text underline-offset-4 hover:underline">
              {page.current.question.excerpt}
            </Link>
            <p className="text-xs text-muted">
              {questionMeta(page.current.question)} · {page.current.isAutoSelected ? "chosen by the scheduler" : "chosen by an editor"}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted">Nothing yet. The nightly job chooses a question the evening before unless you do.</p>
        )}
      </AdminSection>
      <FilterBar
        action={PATH}
        keep={{ qualification: page.qualification.id, subject: subjectId ?? "all", date: page.date }}
        search={{ name: "q", label: "Search question text", placeholder: "Words from the question", value: q }}
        filters={[
          {
            kind: "select",
            name: "pool",
            label: "Questions",
            options: [
              { value: "auto", label: "Scheduler's pool (daily-eligible)" },
              { value: "all", label: "All free, auto-marked questions" },
            ],
            value: pool,
          },
        ]}
      />
      <DataTable
        caption={`Questions that can be the daily question for ${day}`}
        rows={page.items}
        rowKey={(item) => item.id}
        empty={
          <EmptyState
            icon={<SearchX aria-hidden="true" />}
            title={q ? "No question matches this search" : "No question can be chosen here yet"}
            description={
              pool === "auto"
                ? "Switch to all free, auto-marked questions, or flag questions as daily-eligible in the question editor."
                : "Only published, free (or public), auto-marked multiple-choice, true/false, numerical and short-answer questions of this scope can be daily questions."
            }
          />
        }
        columns={[
          { key: "question", header: "Question", primary: true, cell: (item) => <CandidateCell item={item} /> },
          { key: "used", header: "Last used", cell: (item) => <LastUsedCell item={item} /> },
          {
            key: "choose",
            header: <span className="sr-only">Choose</span>,
            align: "end",
            cell: (item) =>
              page.current?.question.id === item.id ? (
                <span className="text-xs text-muted">Scheduled</span>
              ) : (
                <ConfirmAction
                  action={scheduleDailyQuestionAction}
                  fields={{ date: page.date, qualificationId: page.qualification.id, subjectId: subjectId ?? "all", questionId: item.id }}
                  triggerLabel="Use this"
                  triggerVariant="secondary"
                  disabled={!page.canChange}
                  disabledReason={page.lockedReason ?? undefined}
                  title={`Use this question on ${day}?`}
                  description={item.excerpt}
                  confirmLabel="Schedule it"
                  reason={{ label: "Note", hint: "Optional. Recorded in the audit log.", maxLength: 500 }}
                >
                  {item.recentlyScheduled && <p>This question was scheduled within {DAILY_REUSE_WINDOW_DAYS} days of this day; students may have seen it recently.</p>}
                </ConfirmAction>
              ),
          },
        ]}
      />
      <CursorPagination className="mt-4" path={PATH} params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Question pages" />
    </Container>
  );
}

function CandidateCell({ item }: { item: DailyCandidateItem }) {
  return (
    <span className="block min-w-0 max-w-2xl">
      <Link href={`/admin/questions/${item.id}`} className="text-sm text-text underline-offset-4 hover:underline">
        {item.excerpt}
      </Link>
      <span className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted">
        {questionMeta(item)}
        {item.inAutoPool ? (
          <Badge size="sm" tone="primary" appearance="outline">
            Scheduler&apos;s pool
          </Badge>
        ) : (
          <Badge size="sm" tone="neutral" appearance="outline">
            {item.isDailyEligible ? "Outside difficulty band" : "Not flagged"}
          </Badge>
        )}
        {item.isDemo && <DemoBadge />}
      </span>
    </span>
  );
}

function LastUsedCell({ item }: { item: DailyCandidateItem }) {
  if (!item.lastScheduledOn) return <span className="text-sm text-muted">Never</span>;
  return (
    <span className="flex flex-col items-start gap-1 text-sm">
      {formatLocalDate(item.lastScheduledOn)}
      {item.recentlyScheduled && (
        <Badge size="sm" tone="warning">
          Within {DAILY_REUSE_WINDOW_DAYS} days
        </Badge>
      )}
    </span>
  );
}
