import { Archive, Send } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { TestBuilder } from "@/components/teacher/TestBuilder";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { requireRole } from "@/server/auth/guards";
import { isUuid } from "@/server/teaching/access";
import { getTeacherTest, listSubjectTopics } from "@/server/teaching/test-builder";
import { orNotFound } from "../../_lib/page";
import { archiveTestAction, createQuestionAction, previewMarkdownAction, publishTestAction, saveTestAction, searchQuestionsAction } from "../actions";

export const metadata: Metadata = { title: "Test builder" };

/** Build a class test (§22): details, questions (bank + own), publish. Published tests are read-only. */
export default async function TestBuilderPage({ params }: { params: Promise<{ assessmentId: string }> }) {
  const { assessmentId } = await params;
  if (!isUuid(assessmentId)) notFound();
  const actor = await requireRole("TEACHER", { next: `/teacher/assessments/${assessmentId}` });
  const test = await orNotFound(getTeacherTest(actor, assessmentId));
  const topics = test.canEdit ? await listSubjectTopics(actor, test.subjectId) : [];
  const fields = { assessmentId: test.id };

  return (
    <Container className="space-y-6 pb-24">
      <PageHeader
        breadcrumbs={[{ label: "Tests", href: "/teacher/assessments" }, { label: test.title }]}
        eyebrow={`${test.subjectName} · ${test.ownerName}`}
        title={
          <span className="inline-flex flex-wrap items-center gap-2">
            {test.title}
            <Badge tone={test.status === "PUBLISHED" ? "success" : "neutral"}>{test.status === "PUBLISHED" ? "Published" : test.status === "ARCHIVED" ? "Archived" : "Draft"}</Badge>
          </span>
        }
        actions={
          <>
            {test.canEdit && (
              <ConfirmAction
                action={publishTestAction}
                fields={fields}
                triggerLabel="Publish"
                triggerSize="md"
                triggerVariant="primary"
                triggerIcon={<Send aria-hidden="true" />}
                title="Publish this test?"
                description="Save your changes first. Once published, the test can be set to classes and can no longer be edited."
                confirmLabel="Publish"
              />
            )}
            {test.status !== "ARCHIVED" && test.canManage && (
              <ConfirmAction
                action={archiveTestAction}
                fields={fields}
                triggerLabel={test.status === "DRAFT" ? "Delete draft" : "Archive"}
                triggerSize="md"
                triggerIcon={<Archive aria-hidden="true" />}
                tone="danger"
                title={test.status === "DRAFT" ? "Delete this draft?" : "Archive this test?"}
                description={test.status === "DRAFT" ? "The draft is deleted." : "Students can't start it any more. Results already handed in stay."}
                confirmLabel={test.status === "DRAFT" ? "Delete" : "Archive"}
              />
            )}
          </>
        }
        className="pb-0"
      />
      {test.status === "PUBLISHED" && <Alert tone="info">This test is published and read-only. Set it to a class from the class&apos;s Assignments page.</Alert>}
      <TestBuilder
        assessmentId={test.id}
        owner={test.owner}
        ownerName={test.ownerName}
        subjectId={test.subjectId}
        editable={test.canEdit}
        topics={topics}
        initialDetails={{
          title: test.title,
          description: test.description ?? "",
          instructions: test.instructions ?? "",
          kind: test.kind as "QUIZ" | "TOPIC_TEST" | "CHAPTER_TEST" | "SUBJECT_TEST",
          timeLimitMinutes: test.timeLimitMinutes === null ? "" : String(test.timeLimitMinutes),
          feedbackTiming: test.feedbackTiming,
        }}
        initialItems={test.items}
        actions={{ save: saveTestAction, search: searchQuestionsAction, createQuestion: createQuestionAction, preview: previewMarkdownAction }}
      />
    </Container>
  );
}
