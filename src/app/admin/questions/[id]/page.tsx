import { notFound } from "next/navigation";
import Link from "next/link";
import { AdminSection, Timestamp } from "@/components/admin/DetailParts";
import { requireAdminPage } from "@/components/admin/guards";
import { ChecksList, ContentWorkflowPanel, RevisionHistory } from "@/components/admin/questions/ContentPanels";
import { FLAG_REASON_LABELS, FLAG_SOURCE_LABELS, QUESTION_TYPE_LABELS } from "@/components/admin/questions/labels";
import { QuestionEditor } from "@/components/admin/questions/QuestionEditor";
import { QuestionTryIt } from "@/components/admin/questions/QuestionTryIt";
import { StatusBadge, ContentStatusBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatNumber, formatPercent } from "@/lib/format";
import { isAppError } from "@/server/lib/errors";
import { can, isFourEyesOn } from "@/server/cms/questions/context";
import { plainExcerpt } from "@/server/cms/questions/core";
import { getMediaByIds, getMediaOptions, getSourceOptions, getSubjectContentOptions } from "@/server/cms/questions/lookups";
import { getQuestionPreview } from "@/server/cms/questions/preview";
import type { QuestionEditorInput } from "@/server/cms/questions/schemas";
import { getQuestionEditor } from "@/server/cms/questions/service";
import {
  approveQuestionAction,
  archiveQuestionAction,
  reopenQuestionAction,
  deleteQuestionAction,
  discardQuestionDraftAction,
  editPublishedQuestionAction,
  loadSubjectOptionsAction,
  previewMarkdownAction,
  publishQuestionAction,
  requestQuestionChangesAction,
  submitQuestionAction,
  tryQuestionAction,
  updateQuestionAction,
} from "../actions";

export const metadata = { title: "Question" };

/** Media ids a question document references (diagrams and option pictures), so the pickers can show them. */
function mediaIdsOf(doc: QuestionEditorInput): string[] {
  const ids: string[] = [];
  const visit = (node: { payload: unknown; options?: { mediaAssetId?: string | null }[]; parts?: { payload: unknown; options?: { mediaAssetId?: string | null }[]; parts?: unknown[] }[] }) => {
    const id = (node.payload as { mediaAssetId?: unknown } | null)?.mediaAssetId;
    if (typeof id === "string") ids.push(id);
    for (const option of node.options ?? []) if (option.mediaAssetId) ids.push(option.mediaAssetId);
    for (const part of node.parts ?? []) visit(part as Parameters<typeof visit>[0]);
  };
  visit(doc);
  return ids;
}

async function load<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
}

/** /admin/questions/[id] — editor (drafts) or read-only review view, "Try it", workflow, checks, history and flags. */
export default async function QuestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actor = await requireAdminPage("content.draft", { next: `/admin/questions/${id}` });
  const view = await load(getQuestionEditor(actor, id));
  const extraSyllabusIds = [...new Set(Object.values(view.topicLabels).map((t) => t.syllabusId))];
  const [preview, content, sources, recentMedia, usedMedia, fourEyes] = await Promise.all([
    getQuestionPreview(actor, id),
    getSubjectContentOptions(actor, { subjectId: view.subject.id, extraSyllabusIds }),
    getSourceOptions(),
    getMediaOptions(["DIAGRAM", "CONTENT_IMAGE"]),
    getMediaByIds(mediaIdsOf(view.document)),
    isFourEyesOn(),
  ]);
  const media = [...usedMedia.filter((m) => !recentMedia.some((r) => r.value === m.value)), ...recentMedia];
  const blocked = Object.keys(view.checks.errors).length > 0;
  const title = plainExcerpt(view.document.stem, 90) || "Untitled question";

  return (
    <Container size="wide">
      <PageHeader
        title={title}
        eyebrow={`${QUESTION_TYPE_LABELS[view.document.type]} · ${view.subject.name} (${view.subject.board} ${view.subject.qualification})`}
        breadcrumbs={[{ label: "Questions", href: "/admin/questions" }, { label: view.draftOf ? `Edit of ${id.slice(0, 8)}` : id.slice(0, 8) }]}
      />
      <div className="grid gap-6 pb-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0 space-y-6">
          {!view.editable && (
            <p className="rounded-card border border-border bg-subtle p-3 text-sm text-muted">
              {view.status === "PUBLISHED"
                ? "Published questions are read-only. Choose “Edit” to start a draft copy."
                : view.status === "ARCHIVED"
                  ? "Archived: students no longer see this question; history is kept."
                  : "In the review workflow: read-only. A reviewer can send it back to draft for changes."}
            </p>
          )}
          <QuestionEditor
            key={view.version}
            mode="update"
            questionId={view.id}
            version={view.version}
            initial={view.document}
            readOnly={!view.editable}
            subjects={[]}
            content={content}
            sources={sources}
            media={media}
            reservedOptionKeys={view.reservedOptionKeys}
            topicLabels={view.topicLabels}
            objectiveLabels={view.objectiveLabels}
            initialErrors={view.checks.errors}
            saveAction={updateQuestionAction}
            previewAction={previewMarkdownAction}
            loadSubjectAction={loadSubjectOptionsAction}
          />
          <AdminSection title="Try it" description="The saved question as a student sees it. Answer it and mark the answer with the real marking engine to check the answer key.">
            <QuestionTryIt questionId={view.id} question={preview.question} problem={preview.problem} tryAction={tryQuestionAction} />
          </AdminSection>
        </div>

        <aside className="space-y-6" aria-label="Review and history">
          <ContentWorkflowPanel
            id={view.id}
            status={view.status}
            revision={view.revision}
            aiGenerated={view.aiGenerated}
            isDemo={view.isDemo}
            draftOf={view.draftOf}
            pendingDraft={view.pendingDraft}
            workflow={view.workflow}
            isOwnWork={view.workflow.createdById === actor.userId}
            fourEyes={fourEyes}
            blocked={blocked}
            itemLabel="this question"
            basePath="/admin/questions"
            neverPublished={view.workflow.publishedAt === null && view.revision === 1}
            actions={{
              submit: can(actor, "content.draft") ? submitQuestionAction : undefined,
              requestChanges: can(actor, "content.review") ? requestQuestionChangesAction : undefined,
              approve: can(actor, "content.review") ? approveQuestionAction : undefined,
              publish: can(actor, "content.publish") ? publishQuestionAction : undefined,
              archive: can(actor, "content.archive") ? archiveQuestionAction : undefined,
              reopen: can(actor, "content.archive") ? reopenQuestionAction : undefined,
            }}
            editAction={editPublishedQuestionAction}
            discardAction={discardQuestionDraftAction}
            deleteAction={deleteQuestionAction}
          />
          <ChecksList errors={view.checks.errors} warnings={view.checks.warnings} />

          <AdminSection title="Flags" description="Problems reported by editors, teachers, students or the automatic checks (§42).">
            {view.flags.length === 0 ? (
              <p className="text-sm text-muted">No flags.</p>
            ) : (
              <ul className="space-y-3">
                {view.flags.map((flag) => (
                  <li key={flag.id} className="text-sm">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-text">{FLAG_REASON_LABELS[flag.reason] ?? flag.reason}</span>
                      <StatusBadge kind="flag" status={flag.status} />
                    </span>
                    <span className="block text-muted">
                      {FLAG_SOURCE_LABELS[flag.source] ?? flag.source}
                      {flag.revision ? ` · revision ${flag.revision}` : ""} · <Timestamp value={flag.createdAt} />
                    </span>
                    {flag.details && <span className="mt-1 block whitespace-pre-wrap text-text">{flag.details}</span>}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-sm">
              <Link href="/admin/flags" className="text-primary underline underline-offset-4">
                Open the flag queue
              </Link>
            </p>
          </AdminSection>

          <AdminSection title="Used in">
            {view.usedIn.length === 0 ? (
              <p className="text-sm text-muted">Not used by any assessment.</p>
            ) : (
              <ul className="space-y-2">
                {view.usedIn.map((assessment) => (
                  <li key={assessment.id} className="flex items-center justify-between gap-2 text-sm">
                    <Link href={`/admin/exams/${assessment.id}`} className="min-w-0 truncate text-text underline-offset-4 hover:underline">
                      {assessment.title}
                    </Link>
                    <ContentStatusBadge status={assessment.status} />
                  </li>
                ))}
              </ul>
            )}
          </AdminSection>

          <AdminSection title="Statistics" description="Aggregated over students' answers; no individual data.">
            {!view.stats || view.stats.answeredCount === 0 ? (
              <p className="text-sm text-muted">No answers yet.</p>
            ) : (
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-muted">Answers</dt>
                  <dd className="font-semibold text-text">{formatNumber(view.stats.answeredCount)}</dd>
                </div>
                <div>
                  <dt className="text-muted">Facility</dt>
                  <dd className="font-semibold text-text">{view.stats.facility === null ? "—" : formatPercent(view.stats.facility, { input: "ratio" })}</dd>
                </div>
                <div>
                  <dt className="text-muted">Full marks</dt>
                  <dd className="font-semibold text-text">{view.stats.correctRate === null ? "—" : formatPercent(view.stats.correctRate, { input: "ratio" })}</dd>
                </div>
                <div>
                  <dt className="text-muted">Observed difficulty</dt>
                  <dd className="font-semibold text-text">{view.stats.empiricalDifficulty === null ? "—" : view.stats.empiricalDifficulty.toFixed(1)}</dd>
                </div>
                {view.stats.suspectAnswerKey && <dd className="col-span-2 font-semibold text-warning-text">The answer key looks suspect: check it.</dd>}
                {view.stats.optionCounts && (
                  <div className="col-span-2">
                    <dt className="text-muted">Options chosen</dt>
                    <dd className="text-text">
                      {Object.entries(view.stats.optionCounts)
                        .map(([key, count]) => `${key}: ${formatNumber(count)}`)
                        .join(" · ")}
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </AdminSection>

          <RevisionHistory revisions={view.revisions} />
        </aside>
      </div>
    </Container>
  );
}
