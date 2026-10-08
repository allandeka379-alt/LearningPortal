import { Eye } from "lucide-react";
import { notFound } from "next/navigation";
import { AdminSection, KeyValueList } from "@/components/admin/DetailParts";
import { requireAdminPage } from "@/components/admin/guards";
import { AssessmentBuilder } from "@/components/admin/questions/assessments/AssessmentBuilder";
import { AssessmentSettingsForm } from "@/components/admin/questions/assessments/AssessmentSettingsForm";
import { ChecksList, ContentWorkflowPanel, LinkButton, RevisionHistory } from "@/components/admin/questions/ContentPanels";
import { ACCESS_TIER_LABELS, ASSEMBLY_LABELS, ASSESSMENT_KIND_LABELS, FEEDBACK_TIMING_LABELS } from "@/components/admin/questions/labels";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatNumber } from "@/lib/format";
import { isAppError } from "@/server/lib/errors";
import { getAssessmentBuilderOptions, getAssessmentEditor } from "@/server/cms/assessments/service";
import { can, isFourEyesOn } from "@/server/cms/questions/context";
import { getObjectiveOptions, getSourceOptions, getSyllabusOptions, getTopicOptions } from "@/server/cms/questions/lookups";
import {
  approveAssessmentAction,
  archiveAssessmentAction,
  reopenAssessmentAction,
  checkBlueprintAction,
  deleteAssessmentAction,
  discardAssessmentDraftAction,
  editPublishedAssessmentAction,
  publishAssessmentAction,
  requestAssessmentChangesAction,
  saveStructureAction,
  searchQuestionsAction,
  submitAssessmentAction,
  updateAssessmentAction,
} from "../actions";

export const metadata = { title: "Assessment" };

async function load<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
}

/** /admin/exams/[id] — settings, sections / questions / blueprint rules, workflow and history of one assessment. */
export default async function AssessmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actor = await requireAdminPage("content.draft", { next: `/admin/exams/${id}` });
  const view = await load(getAssessmentEditor(actor, id));
  const syllabusId = typeof view.meta.syllabusId === "string" ? view.meta.syllabusId : null;
  const syllabi = await getSyllabusOptions([view.subject.id]);
  const [options, sources, topics, objectives, fourEyes] = await Promise.all([
    getAssessmentBuilderOptions(actor, { qualificationId: view.subject.qualificationId, syllabusIds: syllabi.map((s) => s.value) }),
    getSourceOptions(),
    syllabusId ? getTopicOptions([syllabusId]) : Promise.resolve([]),
    syllabusId ? getObjectiveOptions([syllabusId]) : Promise.resolve([]),
    isFourEyesOn(),
  ]);
  const components = options.components.filter((c) => c.syllabusId === syllabusId);
  const blocked = Object.keys(view.checks.errors).length > 0;

  return (
    <Container size="wide">
      <PageHeader
        title={view.meta.title}
        eyebrow={`${ASSESSMENT_KIND_LABELS[view.meta.kind]} · ${view.subject.label}`}
        breadcrumbs={[{ label: "Exams", href: "/admin/exams" }, { label: view.draftOf ? "Edit" : view.meta.title }]}
        actions={
          <LinkButton href={`/admin/exams/${id}/preview`}>
            <Eye aria-hidden="true" className="size-4" /> Preview as a student
          </LinkButton>
        }
      />
      <div className="grid gap-6 pb-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0 space-y-6">
          <AdminSection title="Settings" description={view.editable ? undefined : "Read-only outside Draft. Published assessments change through “Edit”."}>
            {view.editable ? (
              <AssessmentSettingsForm
                action={updateAssessmentAction}
                submitLabel="Save settings"
                hiddenFields={{ id: view.id, version: view.version, subjectId: view.subject.id }}
                values={view.meta}
                syllabi={syllabi}
                routes={options.routes}
                gradeSchemes={options.gradeSchemes}
                sources={sources}
                topics={topics}
              />
            ) : (
              <KeyValueList
                items={[
                  { label: "Kind", value: ASSESSMENT_KIND_LABELS[view.meta.kind] },
                  { label: "Questions", value: ASSEMBLY_LABELS[view.meta.assembly] },
                  { label: "Syllabus version", value: syllabi.find((s) => s.value === syllabusId)?.label ?? "Any" },
                  { label: "Time limit", value: view.meta.timeLimitMinutes ? `${String(view.meta.timeLimitMinutes)} minutes` : "Untimed" },
                  { label: "Attempts", value: view.meta.maxAttempts ? String(view.meta.maxAttempts) : "Unlimited" },
                  { label: "Feedback", value: FEEDBACK_TIMING_LABELS[view.meta.feedbackTiming] },
                  { label: "Access", value: ACCESS_TIER_LABELS[view.meta.accessTier] },
                  { label: "Navigation", value: view.meta.allowNavigation ? "Free" : "One way" },
                  { label: "Shuffling", value: [view.meta.shuffleQuestions ? "questions" : null, view.meta.shuffleOptions ? "options" : null].filter(Boolean).join(", ") || "None" },
                  { label: "Copyright", value: view.meta.copyrightStatus },
                ]}
              />
            )}
          </AdminSection>

          <AdminSection
            title="Sections and questions"
            description={
              view.meta.assembly === "FIXED"
                ? "Every student gets the same questions. Pick published questions per section; marks add up automatically."
                : "Fixed questions are always included; rules draw the rest for each attempt from the published bank."
            }
          >
            <AssessmentBuilder
              key={view.version}
              assessmentId={view.id}
              version={view.version}
              editable={view.editable}
              usesRules={view.meta.assembly !== "FIXED"}
              subjectId={view.subject.id}
              syllabusId={syllabusId}
              initialSections={view.sections}
              questionInfo={view.questionInfo}
              components={components}
              topics={topics}
              objectives={objectives}
              savedBlueprint={view.checks.blueprint}
              saveAction={saveStructureAction}
              checkAction={checkBlueprintAction}
              searchAction={searchQuestionsAction}
            />
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
            itemLabel="this assessment"
            basePath="/admin/exams"
            neverPublished={view.workflow.publishedAt === null && view.revision === 1}
            actions={{
              submit: can(actor, "content.draft") ? submitAssessmentAction : undefined,
              requestChanges: can(actor, "content.review") ? requestAssessmentChangesAction : undefined,
              approve: can(actor, "content.review") ? approveAssessmentAction : undefined,
              publish: can(actor, "content.publish") ? publishAssessmentAction : undefined,
              archive: can(actor, "content.archive") ? archiveAssessmentAction : undefined,
              reopen: can(actor, "content.archive") ? reopenAssessmentAction : undefined,
            }}
            editAction={editPublishedAssessmentAction}
            discardAction={discardAssessmentDraftAction}
            deleteAction={deleteAssessmentAction}
            extra={<p className="text-sm text-muted">{view.attemptCount === 0 ? "No attempts yet." : `${formatNumber(view.attemptCount)} attempts so far.`}</p>}
          />
          <ChecksList errors={view.checks.errors} warnings={view.checks.warnings} />
          <RevisionHistory revisions={view.revisions} />
        </aside>
      </div>
    </Container>
  );
}
