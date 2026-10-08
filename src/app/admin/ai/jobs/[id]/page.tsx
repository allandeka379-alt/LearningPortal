import { AlertTriangle, Copy, XCircle } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, KeyValueList } from "@/components/admin/DetailParts";
import { formatDateTime, formatMicrosUsd, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { notFoundUnlessFeature } from "@/server/features";
import { ADMIN_HOME } from "@/components/admin/nav";
import { buildHref } from "@/components/admin/search-params";
import { AiDraftBadge, StatusBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { formatNumber } from "@/lib/format";
import { AI_KIND_META, DIFFICULTY_LABELS, LANGUAGE_LEVEL_LABELS } from "@/server/cms/ai-drafts/schemas";
import { canGenerate, getGenerationJob, isAiConfigured, type GenerationDetail } from "@/server/cms/ai-drafts/service";
import { isAppError } from "@/server/lib/errors";
import { cancelGenerationJobAction, rerunGenerationJobAction } from "../../actions";
import { AutoRefresh } from "../../../imports/_components/AutoRefresh";
import { AiJobStatusBadge } from "../../_components/AiJobBits";

export const metadata = { title: "AI generation job" };

function listHref(detail: GenerationDetail): string | null {
  const output = AI_KIND_META[detail.kind].output;
  const filters = { ai: "yes", status: "DRAFT" };
  switch (output) {
    case "QUESTION":
      return buildHref("/admin/questions", filters);
    case "FLASHCARD":
      return buildHref("/admin/flashcards", filters);
    case "LESSON":
      return buildHref("/admin/lessons", filters);
    default:
      return null;
  }
}

/**
 * /admin/ai/jobs/[id] — one AI generation job (§41): status (refreshing while queued or running), the drafts it
 * created with links to their editors and review pages, items rejected by validation with reasons, near-duplicate
 * warnings, the request settings and the metered tokens and cost against the estimate.
 */
export default async function GenerationJobPage({ params }: { params: Promise<{ id: string }> }) {
  // AI is switched off (`features.ai`, owner decision 2026-10-07): the AI admin pages are a 404.
  await notFoundUnlessFeature("ai");
  const actor = await requireAdminPage("ai.generate", { next: "/admin/ai" });
  if (!canGenerate(actor)) redirect(ADMIN_HOME);
  const { id } = await params;
  let detail: GenerationDetail;
  try {
    detail = await getGenerationJob(actor, id);
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
  const meta = AI_KIND_META[detail.kind];
  const active = detail.status === "QUEUED" || detail.status === "RUNNING";
  const finished = detail.status === "COMPLETED" || detail.status === "FAILED" || detail.status === "CANCELLED";
  const summary = detail.summary;
  const drafts = listHref(detail);
  const createdById = new Map(detail.created.map((item) => [item.id, item]));

  return (
    <Container size="wide">
      <PageHeader
        title={meta.label}
        eyebrow={[detail.subject, detail.topic ?? detail.syllabus].filter(Boolean).join(" · ") || undefined}
        breadcrumbs={[{ label: "AI content generation", href: "/admin/ai" }, { label: "Job" }]}
        description={
          <span className="flex flex-wrap items-center gap-2">
            <AiJobStatusBadge status={detail.status} />
            <span className="tabular-nums">
              {formatNumber(detail.itemsCreated)} of {formatNumber(detail.itemsRequested ?? 0)} {meta.countLabel.toLowerCase()} created
            </span>
          </span>
        }
        actions={
          <>
            {detail.canCancel && (
              <ConfirmAction
                action={cancelGenerationJobAction}
                fields={{ id: detail.id }}
                triggerLabel="Cancel job"
                triggerVariant="outline"
                triggerSize="md"
                tone="danger"
                title="Cancel this job?"
                description="It has not started yet, so nothing has been spent."
                confirmLabel="Cancel job"
              />
            )}
            {finished && isAiConfigured() && (
              <ConfirmAction
                action={rerunGenerationJobAction}
                fields={{ id: detail.id }}
                triggerLabel="Run again"
                triggerIcon={<Copy aria-hidden="true" className="size-4" />}
                triggerVariant="outline"
                triggerSize="md"
                title="Queue a new job with the same settings?"
                description={`It counts towards today's runs and is metered (this job was estimated at ${formatMicrosUsd(detail.estimatedCostMicros)}).`}
                confirmLabel="Queue it"
              />
            )}
          </>
        }
      />
      <div className="space-y-6 pb-12">
        {active && (
          <div className="rounded-card border border-border bg-surface p-4">
            <p className="text-sm text-text">
              {detail.status === "QUEUED" ? "Waiting for the AI worker." : "Generating. Drafts are checked and saved when the AI has finished."}
              {detail.queue && detail.queue.attempts > 1 && ` Attempt ${detail.queue.attempts}.`}
            </p>
            {detail.error && <p className="mt-1 text-sm text-muted">{detail.error}</p>}
            <div className="mt-2">
              <AutoRefresh label="This page updates automatically until the drafts are ready." />
            </div>
          </div>
        )}
        {detail.status === "FAILED" && detail.error && (
          <Alert tone="danger" icon={<XCircle aria-hidden="true" />} title="The job did not create drafts">
            {detail.error}
          </Alert>
        )}
        {detail.status === "CANCELLED" && (
          <Alert tone="neutral" title="Cancelled">
            Cancelled {formatDateTime(detail.cancelledAt)}
            {detail.cancelledBy ? ` by ${detail.cancelledBy}` : ""}. Nothing was generated or spent.
          </Alert>
        )}

        {detail.created.length > 0 && (
          <AdminSection
            title="Drafts created"
            description="Each draft is marked AI-generated with copyright unverified. Open it, check answers, facts, notation and originality, then submit it for review. Another editor approves it."
            action={
              <span className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {drafts && (
                  <Link href={drafts} className="font-medium text-primary underline-offset-4 hover:underline">
                    All AI drafts
                  </Link>
                )}
                <Link href="/admin/review?ai=only" className="font-medium text-primary underline-offset-4 hover:underline">
                  AI items in the review queue
                </Link>
              </span>
            }
          >
            <ul className="divide-y divide-border">
              {detail.created.map((item) => (
                <li key={item.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm">
                  <span className="min-w-0">
                    <span className="block break-words text-text">{item.label}</span>
                    <span className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted">
                      {item.typeLabel}
                      {item.status && <StatusBadge kind="content" status={item.status} />}
                      <AiDraftBadge />
                    </span>
                  </span>
                  {!item.missing && (
                    <span className="flex gap-3">
                      <Link href={item.editorHref} className="font-medium text-primary underline-offset-4 hover:underline">
                        Open
                      </Link>
                      <Link href={item.reviewHref} className="font-medium text-primary underline-offset-4 hover:underline">
                        Review page
                      </Link>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </AdminSection>
        )}

        {summary && summary.nearDuplicates.length > 0 && (
          <Alert tone="warning" icon={<AlertTriangle aria-hidden="true" />} title={`${formatNumber(summary.nearDuplicates.length)} draft${summary.nearDuplicates.length === 1 ? " looks" : "s look"} very similar to existing content`}>
            <ul className="mt-1 space-y-0.5">
              {summary.nearDuplicates.map((dup) => {
                const item = createdById.get(dup.id);
                const type = item?.entityType ?? "QUESTION";
                return (
                  <li key={dup.id}>
                    {item ? (
                      <Link href={item.editorHref} className="underline underline-offset-2">
                        {item.label}
                      </Link>
                    ) : (
                      "A draft"
                    )}{" "}
                    matches{" "}
                    <Link href={type === "FLASHCARD" ? `/admin/flashcards/${dup.similarToId}` : `/admin/questions/${dup.similarToId}`} className="underline underline-offset-2">
                      an existing item
                    </Link>{" "}
                    ({Math.round(dup.similarity * 100)}% similar). Keep only one.
                  </li>
                );
              })}
            </ul>
          </Alert>
        )}

        {summary && summary.rejected.length > 0 && (
          <AdminSection title="Rejected items" description="Items that failed the same checks as hand-written content. They were not saved.">
            <ul className="space-y-2 text-sm">
              {summary.rejected.map((rejection) => (
                <li key={`${rejection.index}-${rejection.reason}`} className="flex gap-2">
                  <span className="shrink-0 font-medium text-text tabular-nums">{rejection.index > 0 ? `Item ${rejection.index}` : "Output"}</span>
                  <span className="min-w-0 break-words text-muted">{rejection.reason}</span>
                </li>
              ))}
            </ul>
          </AdminSection>
        )}

        {summary && summary.warnings.length > 0 && (
          <AdminSection title="Notes for the reviewer">
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
              {summary.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </AdminSection>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminSection title="Request">
            <KeyValueList
              items={[
                { label: "Content", value: meta.label },
                { label: "Subject", value: detail.subject },
                { label: "Syllabus version", value: detail.syllabus, hideWhenEmpty: true },
                { label: "Topic", value: detail.topic, hideWhenEmpty: true },
                { label: "Question", value: detail.targetQuestion ? <Link href={`/admin/questions/${detail.targetQuestion.id}`} className="underline underline-offset-2">{detail.targetQuestion.label}</Link> : null, hideWhenEmpty: true },
                { label: meta.countLabel, value: detail.params ? formatNumber(detail.params.count) : null },
                { label: "Difficulty", value: detail.params && (detail.kind === "QUESTIONS" || detail.kind === "MCQ") ? DIFFICULTY_LABELS[detail.params.difficulty] : null, hideWhenEmpty: true },
                { label: "Language level", value: detail.params ? LANGUAGE_LEVEL_LABELS[detail.params.languageLevel].label : null },
                { label: "Question types", value: detail.kind === "QUESTIONS" ? detail.params?.questionTypes.map((t) => humanizeEnum(t)).join(", ") : null, hideWhenEmpty: true },
                { label: "Marks per question", value: detail.params?.marksPerQuestion ? String(detail.params.marksPerQuestion) : null, hideWhenEmpty: true },
                { label: "Notes for the AI", value: detail.params?.instructions ?? null, hideWhenEmpty: true },
                { label: "Requested", value: `${formatDateTime(detail.createdAt)} by ${detail.requestedByMe ? "you" : (detail.requestedBy ?? "someone")}` },
              ]}
            />
            {detail.objectives.length > 0 && (
              <div className="mt-4 text-sm">
                <p className="text-muted">Learning objectives</p>
                <ul className="mt-1 list-disc space-y-0.5 pl-5">
                  {detail.objectives.map((objective) => (
                    <li key={objective.id}>{objective.label}</li>
                  ))}
                </ul>
              </div>
            )}
          </AdminSection>
          <AdminSection title="Model and cost" description="Metered from the provider's token counts at the configured prices.">
            <KeyValueList
              items={[
                { label: "Model", value: detail.model },
                { label: "Tier", value: detail.tier ? humanizeEnum(detail.tier) : null },
                { label: "Prompt version", value: detail.promptVersion ? <code className="text-xs">{detail.promptVersion}</code> : null },
                { label: "Estimated cost", value: formatMicrosUsd(detail.estimatedCostMicros) },
                { label: "Actual cost", value: detail.tokens.input + detail.tokens.output > 0 ? formatMicrosUsd(detail.costMicros) : null },
                { label: "Tokens in / out", value: detail.tokens.input + detail.tokens.output > 0 ? `${formatNumber(detail.tokens.input)} / ${formatNumber(detail.tokens.output)}` : null },
                { label: "Cached tokens (read / written)", value: detail.tokens.cacheRead + detail.tokens.cacheWrite > 0 ? `${formatNumber(detail.tokens.cacheRead)} / ${formatNumber(detail.tokens.cacheWrite)}` : null, hideWhenEmpty: true },
                { label: "Started", value: detail.startedAt ? formatDateTime(detail.startedAt) : null, hideWhenEmpty: true },
                { label: "Finished", value: detail.completedAt ? formatDateTime(detail.completedAt) : null, hideWhenEmpty: true },
              ]}
            />
          </AdminSection>
        </div>
      </div>
    </Container>
  );
}
