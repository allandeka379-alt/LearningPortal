import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { NewConversationForm } from "@/components/tutor/NewConversationForm";
import { TutorAvailabilityNotice } from "@/components/tutor/TutorNotices";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { notFoundUnlessFeature } from "@/server/features";
import { getTutorStatus, listTutorSubjects, listTutorTopics, subjectIdForTopic, type TutorTopicOption } from "@/server/tutor";
import { createConversationAction } from "../actions";
import { availabilityOf } from "../_lib/availability";

export const metadata: Metadata = { title: "New tutor conversation" };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function param(value: string | string[] | undefined): string | null {
  return typeof value === "string" && UUID.test(value) ? value.toLowerCase() : null;
}

/**
 * New conversation (§14): pick one of your subjects and, optionally, a topic of its pinned syllabus. "Ask the tutor
 * about this" links land here prefilled (`?subjectId=&topicId=&questionId=`); nothing is created until the student
 * presses Start (no state change on GET).
 */
export default async function NewTutorConversationPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  // AI is switched off (`features.ai`, owner decision 2026-10-07): the whole area is a 404.
  await notFoundUnlessFeature("ai");
  const actor = await requireOnboardedStudent({ next: "/app/tutor/new" });
  const query = await searchParams;
  const questionId = param(query.questionId);
  let topicId = param(query.topicId);
  const [status, subjects] = await Promise.all([getTutorStatus(actor), listTutorSubjects(actor)]);
  const availability = availabilityOf(status);

  let subjectId = param(query.subjectId);
  // A topic link without its subject: find the subject from the topic (validated again on submit).
  if (!subjectId && topicId) subjectId = await subjectIdForTopic(actor, topicId);
  if (subjectId && !subjects.some((subject) => subject.subjectId === subjectId)) subjectId = null;
  if (!subjectId && !questionId && subjects.length === 1) subjectId = subjects[0]?.subjectId ?? null;
  const topics: TutorTopicOption[] = subjectId ? await listTutorTopics(actor, subjectId) : [];
  if (topicId && !topics.some((topic) => topic.id === topicId)) topicId = null;
  const subject = subjects.find((item) => item.subjectId === subjectId);
  const topic = topics.find((item) => item.id === topicId);

  return (
    <Container size="reading" className="pb-12">
      <PageHeader
        title="New conversation"
        description="Choose what you want help with. The tutor uses your subject and topic to pitch its explanations to your syllabus."
        breadcrumbs={[{ label: "AI tutor", href: "/app/tutor" }, { label: "New conversation" }]}
      />
      {availability !== "ready" ? (
        <TutorAvailabilityNotice availability={availability} upgradeHref={status.upgradeHref} />
      ) : subjects.length === 0 ? (
        <EmptyState
          title="Add a subject first"
          description="The tutor helps with the subjects you study. Add your subjects to get started."
          action={<ButtonLink href="/app/subjects/manage">Choose subjects</ButtonLink>}
        />
      ) : (
        <div className="space-y-4">
          {questionId && (
            <Alert tone="info" title="About the question you were working on">
              The tutor will see this question{subject ? ` (${subject.name}${topic ? `, ${topic.name}` : ""})` : ""} and your latest
              answer to it, so you can ask what went wrong.
            </Alert>
          )}
          <NewConversationForm
            subjects={subjects}
            topics={topics.map(({ id, name, code, kind }) => ({ id, name, code, kind }))}
            selectedSubjectId={subjectId}
            selectedTopicId={topicId}
            questionId={questionId}
            pickerPath="/app/tutor/new"
            action={createConversationAction}
          />
        </div>
      )}
    </Container>
  );
}
