import { ChartColumn, UsersRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatLocalDate } from "@/components/admin/format";
import { Container } from "@/components/layout/Container";
import { AssignPracticeForm } from "@/components/teacher/AssignPracticeForm";
import { ClassHeader } from "@/components/teacher/ClassHeader";
import { percentText } from "@/components/teacher/labels";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { MasteryBar } from "@/components/ui/MasteryBar";
import { StatTile } from "@/components/ui/StatTile";
import { formatNumber } from "@/lib/format";
import { requireRole } from "@/server/auth/guards";
import { isUuid } from "@/server/teaching/access";
import { getClassPerformance } from "@/server/teaching/analytics";
import { orNotFound } from "../../_lib/page";
import { assignTopicPracticeAction } from "../actions";

export const metadata: Metadata = { title: "Class performance" };

/**
 * §22 drill-down, levels 1-4 on one page: class average → subject performance → topic performance (each topic links
 * to its own page) → students (each links to their page). Weak topics come first with a one-click practice.
 */
export default async function ClassPerformancePage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = await params;
  if (!isUuid(classId)) notFound();
  const actor = await requireRole("TEACHER", { next: `/teacher/classes/${classId}` });
  const { class: cls, scope, analytics, weakTopics } = await orNotFound(getClassPerformance(actor, classId));
  const base = `/teacher/classes/${cls.id}`;
  const average = analytics.classAverage;
  const canAssign = cls.archivedAt === null;

  return (
    <Container className="space-y-6 pb-10">
      <ClassHeader cls={cls} section="overview" />

      {average.students === 0 ? (
        <EmptyState
          icon={<UsersRound aria-hidden="true" />}
          title="No students in this class yet"
          description="Share the join code or add students by email, phone or school username. Their progress appears here."
          action={<ButtonLink href={`${base}/students`}>Add students</ButtonLink>}
        />
      ) : (
        <>
          <section aria-labelledby="class-average-title" className="space-y-3">
            <h2 id="class-average-title" className="text-lg font-semibold text-text">
              Class overview
            </h2>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <StatTile label="Students" value={formatNumber(average.students)} />
              <StatTile
                label="Class average"
                value={average.averageScorePct === null ? null : percentText(average.averageScorePct)}
                hint={average.studentsWithScores > 0 ? `From ${formatNumber(average.studentsWithScores)} students with marked work` : undefined}
                emptyLabel="No marked work yet"
              />
              <StatTile label="Syllabus progress" value={average.averageProgressPct === null ? null : percentText(average.averageProgressPct)} />
              <StatTile label="Active in the last 7 days" value={formatNumber(average.activeLast7Days)} hint={`${formatNumber(average.activeLast30Days)} in the last 30 days`} />
            </div>
          </section>

          {scope.derived && (
            <Alert tone="info" title="This class has no single subject">
              {scope.subjectIds.length === 0
                ? "Set work in a subject and the students' progress in that subject appears here. Nothing else about their studies is shown to you."
                : "You see the students' progress only in the subjects of the work you set to this class."}
            </Alert>
          )}

          {weakTopics.length > 0 && (
            <Card as="section" aria-labelledby="weak-title">
              <CardHeader
                titleAs="h2"
                title={<span id="weak-title">Topics the class finds hard</span>}
                description="Low average mastery, or many students in the weak bands."
              />
              <CardBody className="space-y-5">
                {weakTopics.map((topic) => (
                  <div key={topic.topicId} className="space-y-3 rounded-card border border-border p-4">
                    <MasteryBar label={`${topic.topicName} (${topic.subjectName})`} score={topic.averageMastery} href={`${base}/topics/${topic.topicId}`} />
                    <p className="text-sm text-muted">
                      {formatNumber(topic.weakStudents)} of {formatNumber(topic.studentsStarted)} students who started it are weak or developing ({percentText(topic.weakSharePercent)}).
                    </p>
                    {canAssign && (
                      <AssignPracticeForm classId={cls.id} topicId={topic.topicId} topicName={topic.topicName} weakStudents={topic.weakStudents} action={assignTopicPracticeAction} />
                    )}
                  </div>
                ))}
              </CardBody>
            </Card>
          )}

          {analytics.subjects.map((subject) => (
            <Card as="section" key={subject.subjectId} aria-labelledby={`subject-${subject.subjectId}`}>
              <CardHeader
                titleAs="h2"
                title={<span id={`subject-${subject.subjectId}`}>{subject.subjectName}</span>}
                description={`${formatNumber(subject.studentsEnrolled)} students studying it · average ${percentText(subject.averageScorePct)} · mock average ${percentText(subject.averageMockPct)} · correct answers ${percentText(subject.correctRatePct)}`}
              />
              <CardBody>
                {subject.syllabusVersions.some((version) => !version.isCurrent) && (
                  <p className="mb-4 text-sm text-muted">
                    Syllabus versions:{" "}
                    {subject.syllabusVersions
                      .map((version) => `${version.versionLabel}${version.isCurrent ? " (current)" : " (older)"}: ${formatNumber(version.students)} ${version.students === 1 ? "student" : "students"}`)
                      .join(" · ")}
                    . Students on an older version see their own version&apos;s topics and can move to the current one from their subject page.
                  </p>
                )}
                {subject.topics.length === 0 ? (
                  <p className="text-sm text-muted">No topic has been practised yet.</p>
                ) : (
                  <ul className="space-y-4">
                    {subject.topics.map((topic) => (
                      <li key={topic.topicId}>
                        <MasteryBar label={topic.topicName} score={topic.averageMastery} href={`${base}/topics/${topic.topicId}`} />
                        <p className="mt-1 text-xs text-muted">
                          {formatNumber(topic.studentsStarted)} started · {formatNumber(topic.weakStudents)} weak · {formatNumber(topic.questionsAttempted)} questions answered
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </CardBody>
            </Card>
          ))}

          <section aria-labelledby="students-title" className="space-y-3">
            <h2 id="students-title" className="text-lg font-semibold text-text">
              Students
            </h2>
            <DataTable
              caption="Students' performance in this class"
              rows={analytics.students}
              rowKey={(row) => row.userId}
              empty={<EmptyState title="No students" icon={<ChartColumn aria-hidden="true" />} titleAs="p" />}
              columns={[
                {
                  key: "name",
                  header: "Student",
                  primary: true,
                  cell: (row) => (
                    <Link href={`${base}/students/${row.userId}`} className="font-semibold text-text hover:underline">
                      {row.name ?? "Student"}
                    </Link>
                  ),
                },
                { key: "score", header: "Average score", align: "end", cell: (row) => percentText(row.averageScorePct) },
                { key: "progress", header: "Progress", align: "end", cell: (row) => percentText(row.progressPct) },
                { key: "weak", header: "Weak topics", align: "end", cell: (row) => formatNumber(row.weakTopics) },
                {
                  key: "syllabus",
                  header: "Syllabus version",
                  hideOnMobile: true,
                  cell: (row) =>
                    row.syllabusVersions.length === 0
                      ? "—"
                      : row.syllabusVersions
                          .map((v) => `${analytics.subjects.length > 1 ? `${v.subjectName} ` : ""}${v.versionLabel}${v.isCurrent ? "" : " (older)"}`)
                          .join(", "),
                },
                {
                  key: "work",
                  header: "Work handed in",
                  align: "end",
                  cell: (row) => (row.assignments.assigned > 0 ? `${row.assignments.completed}/${row.assignments.assigned}` : "—"),
                },
                { key: "active", header: "Last active", cell: (row) => (row.lastActiveDate ? formatLocalDate(row.lastActiveDate) : "—"), hideOnMobile: true },
              ]}
            />
          </section>
        </>
      )}
    </Container>
  );
}
