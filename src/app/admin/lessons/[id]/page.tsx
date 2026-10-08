import { ClipboardCheck } from "lucide-react";
import { AdminSection, KeyValueList } from "@/components/admin/DetailParts";
import { humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { ContentWorkflowBar } from "@/components/admin/editor/ContentWorkflowBar";
import { LessonEditorForm } from "@/components/admin/editor/LessonEditorForm";
import { COPYRIGHT_OPTIONS, LESSON_KIND_OPTIONS, optionLabel } from "@/components/admin/editor/options";
import { PreviewSections } from "@/components/admin/editor/PreviewSections";
import { WorkflowSummary } from "@/components/admin/editor/WorkflowSummary";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { getLessonEditor, previewMarkdown } from "@/server/cms/lessons/service";
import { reviewHref, revisionsHref } from "@/server/cms/review/labels";
import { reviewCapabilities } from "@/server/cms/review/service";
import { contentSourceOptions, subjectOptions, syllabusOptions } from "@/server/cms/review/taxonomy";
import { searchMediaAction } from "../../media/actions";
import { orNotFound } from "../../review/_lib/load";
import {
  approveAction,
  archiveAction,
  reopenAction,
  discardDraftAction,
  publishAction,
  requestChangesAction,
  startEditAction,
  submitForReviewAction,
} from "../../review/actions";
import { loadTopicsAction, previewMarkdownAction, saveLessonAction, searchQuestionsAction } from "../actions";

export const metadata = { title: "Edit lesson" };

/**
 * /admin/lessons/[id] — the lesson editor (DRAFT rows: new lessons and draft copies of published ones) or the read-only
 * view with the workflow actions (in review, approved, published, archived). Editing a published lesson starts a draft
 * copy; students keep the published revision until the copy is approved and published (publish merge).
 */
export default async function LessonEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actor = await requireAdminPage("content.draft", { next: `/admin/lessons/${id}` });
  const lesson = await orNotFound(getLessonEditor(actor, id));
  const capabilities = reviewCapabilities(actor);
  const liveId = lesson.draftOfId ?? lesson.id;

  const [subjects, sources, syllabi, subjectSyllabi] = await Promise.all([
    subjectOptions(actor),
    contentSourceOptions(actor, [lesson.fields.sourceId]),
    syllabusOptions(actor),
    lesson.fields.subjectId ? syllabusOptions(actor, lesson.fields.subjectId) : Promise.resolve([]),
  ]);
  const defaultSyllabusId = lesson.topics.find((t) => t.isPrimary)?.syllabusId ?? subjectSyllabi[0]?.value ?? null;
  const preview = lesson.editable || lesson.fields.body.trim() === "" ? null : await previewMarkdown(actor, { body: lesson.fields.body, mode: "lesson" });

  return (
    <Container size="wide">
      <PageHeader
        title={lesson.fields.title}
        eyebrow={lesson.draftOfId ? "Draft of a published lesson" : optionLabel(LESSON_KIND_OPTIONS, lesson.fields.kind)}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Lessons", href: "/admin/lessons" },
          { label: lesson.fields.title },
        ]}
        actions={
          <ButtonLink href={reviewHref("LESSON", lesson.id)} variant="outline" iconStart={<ClipboardCheck aria-hidden="true" />}>
            Review view
          </ButtonLink>
        }
      />
      <div className="space-y-6 pb-12">
        <AdminSection title="Workflow">
          <div className="space-y-4">
            <WorkflowSummary
              status={lesson.status}
              revision={lesson.revision}
              draftOfId={lesson.draftOfId}
              aiGenerated={lesson.aiGenerated}
              reviewNotes={lesson.reviewNotes}
              people={lesson.people}
              openFlags={lesson.openFlags}
              flagsHref={`/admin/flags?entityType=LESSON&entityId=${liveId}`}
              historyHref={revisionsHref("LESSON", liveId)}
              liveHref={lesson.draftOfId ? `/admin/lessons/${lesson.draftOfId}` : null}
              pendingDraft={lesson.pendingDraft ? { href: `/admin/lessons/${lesson.pendingDraft.id}`, status: lesson.pendingDraft.status } : null}
            />
            <ContentWorkflowBar
              entityType="LESSON"
              id={lesson.id}
              status={lesson.status}
              draftOfId={lesson.draftOfId}
              pendingDraftId={lesson.pendingDraft?.id ?? null}
              aiGenerated={lesson.aiGenerated}
              isOwnWork={lesson.isOwnWork}
              fourEyes={lesson.fourEyes}
              capabilities={capabilities}
              itemLabel="this lesson"
              actions={{
                submit: submitForReviewAction,
                requestChanges: requestChangesAction,
                approve: approveAction,
                publish: publishAction,
                archive: archiveAction,
                reopen: reopenAction,
                startEdit: startEditAction,
                discard: discardDraftAction,
              }}
            />
          </div>
        </AdminSection>

        {lesson.editable ? (
          <LessonEditorForm
            action={saveLessonAction}
            lesson={{
              id: lesson.id,
              updatedAt: lesson.updatedAt.toISOString(),
              ...lesson.fields,
              topics: lesson.topics,
              objectives: lesson.objectives,
              objectiveIds: lesson.objectiveIds,
              questions: lesson.questions,
            }}
            subjects={subjects}
            sources={sources}
            syllabi={syllabi}
            defaultSyllabusId={defaultSyllabusId}
            previewAction={previewMarkdownAction}
            mediaSearchAction={searchMediaAction}
            loadTopicsAction={loadTopicsAction}
            questionSearchAction={searchQuestionsAction}
          />
        ) : (
          <>
            <Alert tone="info" title={lesson.status === "PUBLISHED" ? "Published lessons are not edited in place" : "This lesson is locked while it is in the workflow"}>
              {lesson.status === "PUBLISHED"
                ? "Use “Edit published version” to create a draft copy. Students keep this version until the copy is approved and published."
                : lesson.status === "ARCHIVED"
                  ? "Archived lessons are hidden from students. Their history stays available."
                  : "A reviewer can send it back to draft with notes, or approve and publish it."}
            </Alert>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <AdminSection title="Preview">
                <PreviewSections sections={preview ? [{ label: "Body", html: preview.html, inline: false, warnings: preview.warnings }] : []} emptyLabel="This lesson has no body yet." />
              </AdminSection>
              <AdminSection title="Details">
                <KeyValueList
                  columns={1}
                  items={[
                    { label: "Summary", value: lesson.fields.summary },
                    { label: "Subject", value: subjects.find((s) => s.value === lesson.fields.subjectId)?.label ?? "General" },
                    { label: "Topics", value: lesson.topics.map((t) => `${t.label}${t.isPrimary ? " (primary)" : ""} — ${t.syllabusLabel}`).join("; ") },
                    { label: "Learning objectives", value: lesson.objectiveIds.length ? `${lesson.objectiveIds.length} selected` : null },
                    { label: "Practice questions", value: lesson.questions.length ? lesson.questions.map((q, i) => `${i + 1}. ${q.excerpt}`).join(" · ") : null },
                    { label: "Access", value: humanizeEnum(lesson.fields.accessTier) },
                    { label: "Estimated minutes", value: String(lesson.fields.estimatedMinutes) },
                    { label: "Slug", value: lesson.fields.slug },
                    { label: "Copyright", value: optionLabel(COPYRIGHT_OPTIONS, lesson.fields.copyrightStatus) },
                    { label: "Source", value: sources.find((s) => s.value === lesson.fields.sourceId)?.label },
                    { label: "Author", value: lesson.fields.author },
                    { label: "Licence", value: lesson.fields.licenceCode },
                    { label: "Publication date", value: lesson.fields.publicationDate },
                  ]}
                />
              </AdminSection>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
