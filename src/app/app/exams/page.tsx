import { ClipboardList, History, Target } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { practiceHref } from "@/components/dashboard/links";
import { AssessmentCard } from "@/components/exam/AssessmentCard";
import { AttemptHistoryList } from "@/components/exam/AttemptHistoryList";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { cn } from "@/lib/cn";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { getExamCatalogue, listExamHistory } from "@/server/exams/service";
import { catalogueHref, parseCatalogueParams, type SearchParams } from "./_lib/params";

export const metadata: Metadata = { title: "Tests and exams" };

/**
 * Tests and exams (§12): published topic, chapter and subject tests, timed exams and mock exams for the student's
 * enrolled subjects (pinned syllabus version), grouped by kind, with what the plan allows and friendly upgrade
 * prompts; unfinished attempts to continue; and past results (cursor-paginated). `?topicId=` (from results
 * recommendations) narrows the list to tests covering that topic; `?subjectId=` filters by subject.
 */
export default async function ExamsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = parseCatalogueParams(await searchParams);
  const actor = await requireOnboardedStudent({ next: "/app/exams" });
  const [catalogue, history] = await Promise.all([
    getExamCatalogue(actor, { subjectId: params.subjectId, topicId: params.topicId }),
    listExamHistory(actor, { subjectId: params.subjectId, cursor: params.cursor }),
  ]);
  const { subjects, topic, groups } = catalogue;
  const subjectFilter = catalogue.selectedSubjectId;
  const showSubject = subjects.length > 1 && subjectFilter === null;
  const topicSubjectName = topic ? subjects.find((s) => s.id === topic.subjectId)?.name : undefined;

  return (
    <Container className="space-y-8 pb-12">
      <PageHeader
        title="Tests and exams"
        description="Topic tests, subject tests and timed mock exams for your subjects. Your answers save as you go. Afterwards you get your score, a grade estimate and what to study next."
        className="pb-0"
      />

      {subjects.length > 1 && (
        <nav aria-label="Filter by subject">
          <ul className="flex flex-wrap gap-2">
            {[{ id: null, name: "All subjects" }, ...subjects].map((subject) => {
              const active = subject.id === subjectFilter && !topic;
              return (
                <li key={subject.id ?? "all"}>
                  <Link
                    href={catalogueHref({ subjectId: subject.id })}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors",
                      active ? "border-primary bg-primary text-on-primary" : "border-border bg-surface text-text hover:bg-subtle",
                    )}
                  >
                    {subject.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {topic && (
        <Alert
          tone="info"
          title={`Tests that cover ${topic.name}`}
          action={
            <ButtonLink href={catalogueHref({ subjectId: topic.subjectId })} variant="outline">
              {topicSubjectName ? `Show all ${topicSubjectName} tests` : "Show all tests"}
            </ButtonLink>
          }
        >
          Only tests on this topic are listed.
        </Alert>
      )}
      {catalogue.topicNotFound && <Alert tone="neutral">That topic isn&apos;t in your syllabus, so every test is listed.</Alert>}

      {catalogue.inProgress.length > 0 && (
        <section aria-labelledby="continue-heading" className="space-y-3">
          <h2 id="continue-heading" className="text-lg font-semibold text-text">
            Continue where you left off
          </h2>
          <AttemptHistoryList items={catalogue.inProgress} timeZone={actor.timeZone} showSubject={subjects.length > 1} resume />
        </section>
      )}

      {subjects.length === 0 ? (
        <EmptyState
          motif
          icon={<ClipboardList aria-hidden="true" />}
          title="Add a subject to see its tests"
          description="Tests and mock exams come from the syllabus of the subjects you study."
          action={<ButtonLink href="/app/subjects/manage">Choose subjects</ButtonLink>}
        />
      ) : groups.length === 0 ? (
        <EmptyState
          icon={<ClipboardList aria-hidden="true" />}
          title={topic ? `No test covers ${topic.name} yet` : "No tests for your subjects yet"}
          description={
            topic
              ? "You can practise this topic now. Tests appear here when they are published."
              : "Tests and mock exams appear here when they are published for your syllabus. Practice works for every topic already."
          }
          action={
            <ButtonLink href={topic ? practiceHref({ subjectId: topic.subjectId, topicId: topic.id }) : "/app/practice"} iconStart={<Target aria-hidden="true" />}>
              {topic ? `Practise ${topic.name}` : "Practise instead"}
            </ButtonLink>
          }
        />
      ) : (
        groups.map((group) => (
          <section key={group.kind} aria-labelledby={`group-${group.kind}`} className="space-y-3">
            <h2 id={`group-${group.kind}`} className="text-lg font-semibold text-text">
              {group.label}
            </h2>
            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((item) => (
                <li key={item.id}>
                  <AssessmentCard item={item} showSubject={showSubject} />
                </li>
              ))}
            </ul>
          </section>
        ))
      )}

      <section aria-labelledby="history-heading" className="space-y-3">
        <h2 id="history-heading" className="text-lg font-semibold text-text">
          Your results
        </h2>
        {history.items.length === 0 ? (
          <EmptyState
            appearance="plain"
            titleAs="h3"
            icon={<History aria-hidden="true" />}
            title={params.cursor ? "No older results" : "No results yet"}
            description="When you finish a test or mock exam, your score and analysis appear here."
            className="rounded-card border border-dashed border-border bg-surface"
          />
        ) : (
          <>
            <AttemptHistoryList items={history.items} timeZone={actor.timeZone} showSubject={subjects.length > 1 && !subjectFilter} />
            <Pagination
              label="Results pages"
              prevHref={params.cursor ? catalogueHref({ subjectId: params.subjectId, topicId: params.topicId }) : null}
              prevLabel="Latest"
              nextHref={history.nextCursor ? catalogueHref({ subjectId: params.subjectId, topicId: params.topicId, cursor: history.nextCursor }) : null}
              nextLabel="Older"
            />
          </>
        )}
      </section>
    </Container>
  );
}
