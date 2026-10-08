import { PenLine, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { AdminSection } from "@/components/admin/DetailParts";
import { requireAdminPage } from "@/components/admin/guards";
import { ContentWorkflowBar } from "@/components/admin/editor/ContentWorkflowBar";
import { DiffView } from "@/components/admin/editor/DiffView";
import { PreviewSections } from "@/components/admin/editor/PreviewSections";
import { WorkflowSummary } from "@/components/admin/editor/WorkflowSummary";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { CONTENT_TYPE_LABELS, reviewHref, revisionsHref, typeFromSegment } from "@/server/cms/review/labels";
import { getReviewDetail, reviewCapabilities } from "@/server/cms/review/service";
import { orNotFound } from "../../_lib/load";
import {
  approveAction,
  archiveAction,
  reopenAction,
  discardDraftAction,
  publishAction,
  requestChangesAction,
  startEditAction,
  submitForReviewAction,
} from "../../actions";

export const metadata = { title: "Review" };

const AI_CHECKLIST = [
  "Every answer, number and step re-derived independently.",
  "Facts, units and notation (LaTeX, chemistry) are correct.",
  "Matches the syllabus topic and learning objectives it is tagged to.",
  "Original wording: it does not reproduce past papers, textbooks or other sites.",
];

/**
 * /admin/review/[type]/[id] — review one item (§41, §42): workflow state and approval trail, a readable field-level
 * diff against the last published revision, the rendered preview students will see, blocking issues, and the
 * workflow actions (approve disabled for the author under four-eyes; AI drafts need a written review note).
 */
export default async function ReviewItemPage({ params }: { params: Promise<{ type: string; id: string }> }) {
  const { type: segment, id } = await params;
  const type = typeFromSegment(segment);
  if (!type) notFound();
  const actor = await requireAdminPage("content.draft", { next: reviewHref(type, id) });
  const item = await orNotFound(getReviewDetail(actor, type, id));
  const capabilities = reviewCapabilities(actor);
  const labels = CONTENT_TYPE_LABELS[type];
  const liveId = item.draftOfId ?? item.id;
  const issues = Object.entries(item.issues);
  const ownEditor = type === "LESSON" || type === "FLASHCARD";

  return (
    <Container size="wide">
      <PageHeader
        title={item.title}
        eyebrow={`${labels.singular}${item.draftOfId ? " · edit of a published version" : ""}`}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Review queue", href: "/admin/review" },
          { label: labels.singular },
        ]}
        actions={
          <ButtonLink href={item.editorHref} variant="outline" iconStart={<PenLine aria-hidden="true" />}>
            Open in editor
          </ButtonLink>
        }
      />
      <div className="space-y-6 pb-12">
        <AdminSection title="Workflow">
          <div className="space-y-4">
            <WorkflowSummary
              status={item.status}
              revision={item.revision}
              draftOfId={item.draftOfId}
              aiGenerated={item.aiGenerated}
              reviewNotes={item.reviewNotes}
              people={{
                createdBy: item.createdBy.name,
                createdAt: item.createdBy.at,
                reviewedBy: item.reviewedBy.name,
                reviewedAt: item.reviewedBy.at,
                approvedBy: item.approvedBy.name,
                approvedAt: item.approvedBy.at,
                publishedAt: item.publishedAt,
              }}
              openFlags={item.openFlags}
              flagsHref={`/admin/flags?entityType=${type}&entityId=${liveId}`}
              historyHref={revisionsHref(type, liveId)}
              liveHref={item.draftOfId ? reviewHref(type, item.draftOfId) : null}
              pendingDraft={item.pendingDraft ? { href: reviewHref(type, item.pendingDraft.id), status: item.pendingDraft.status } : null}
            />
            {item.aiGenerated && (item.status === "IN_REVIEW" || item.status === "DRAFT") && (
              <Alert tone="accent" title="AI-generated: a person must check it" icon={<Sparkles aria-hidden="true" />}>
                <ul className="list-disc space-y-0.5 pl-5">
                  {AI_CHECKLIST.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p className="mt-2">Approving asks you to describe what you checked; it is recorded with the approval.</p>
              </Alert>
            )}
            {issues.length > 0 && (
              <Alert tone="warning" title={`${issues.length} problem${issues.length === 1 ? "" : "s"} must be fixed before review or approval`}>
                <ul className="list-disc space-y-0.5 pl-5">
                  {issues.flatMap(([field, messages]) => messages.map((message) => <li key={`${field}-${message}`}>{message}</li>))}
                </ul>
              </Alert>
            )}
            <ContentWorkflowBar
              entityType={type}
              id={item.id}
              status={item.status}
              draftOfId={item.draftOfId}
              pendingDraftId={item.pendingDraft?.id ?? null}
              aiGenerated={item.aiGenerated}
              isOwnWork={item.isOwnWork}
              fourEyes={item.fourEyes}
              capabilities={capabilities}
              itemLabel={`this ${labels.singular.toLowerCase()}`}
              issueCount={issues.length}
              actions={{
                submit: submitForReviewAction,
                requestChanges: requestChangesAction,
                approve: approveAction,
                publish: publishAction,
                archive: archiveAction,
                reopen: reopenAction,
                discard: discardDraftAction,
                ...(ownEditor ? { startEdit: startEditAction } : {}),
              }}
            />
          </div>
        </AdminSection>

        <div className="grid gap-6 xl:grid-cols-2">
          <AdminSection
            title={
              item.baselineRevision
                ? item.status === "PUBLISHED" || item.status === "ARCHIVED"
                  ? `Changes since revision ${item.baselineRevision}`
                  : `Changes since published revision ${item.baselineRevision}`
                : "Changes"
            }
            description={
              item.diff === null
                ? item.status === "PUBLISHED" || item.status === "ARCHIVED"
                  ? "This is the first published revision."
                  : "First version: there is no published revision to compare with. Review the whole item in the preview."
                : undefined
            }
          >
            {item.diff !== null && <DiffView entries={item.diff} emptyLabel="No content changes compared with the published revision." />}
          </AdminSection>
          <AdminSection title="Preview" description="Exactly as students will see it.">
            <PreviewSections sections={item.preview} />
          </AdminSection>
        </div>
      </div>
    </Container>
  );
}
