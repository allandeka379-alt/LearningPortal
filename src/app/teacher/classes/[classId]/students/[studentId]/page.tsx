import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, formatLocalDate } from "@/components/admin/format";
import { Container } from "@/components/layout/Container";
import { ClassHeader } from "@/components/teacher/ClassHeader";
import { percentText } from "@/components/teacher/labels";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { MasteryBar } from "@/components/ui/MasteryBar";
import { StatTile } from "@/components/ui/StatTile";
import { formatNumber } from "@/lib/format";
import { requireRole } from "@/server/auth/guards";
import { isUuid } from "@/server/teaching/access";
import { getClassStudentPerformance } from "@/server/teaching/analytics";
import { orNotFound } from "../../../../_lib/page";
import { auditRequest } from "../../../../_lib/action";

export const metadata: Metadata = { title: "Student performance" };

const MODE_LABELS: Record<string, string> = {
  QUIZ: "Quiz",
  TOPIC_TEST: "Topic test",
  CHAPTER_TEST: "Chapter test",
  SUBJECT_TEST: "Subject test",
  TIMED_EXAM: "Timed exam",
  MOCK_EXAM: "Mock exam",
};

const ASSIGNMENT_STATUS: Record<string, { label: string; tone: "neutral" | "success" | "warning" | "danger" | "info" }> = {
  NOT_STARTED: { label: "Not started", tone: "neutral" },
  IN_PROGRESS: { label: "In progress", tone: "info" },
  SUBMITTED: { label: "Handed in", tone: "success" },
  LATE: { label: "Handed in late", tone: "warning" },
  MISSED: { label: "Missed", tone: "danger" },
  EXCUSED: { label: "Excused", tone: "neutral" },
  NOT_ASSIGNED: { label: "Not set to this student", tone: "neutral" },
};

/**
 * §22 level 4: one student's performance in this class's subject(s): progress, topic mastery, recent test scores,
 * the class's work and study activity. Opening it is recorded in the audit log (student.view). No AI conversations,
 * payments or contact details.
 */
export default async function ClassStudentPage({ params }: { params: Promise<{ classId: string; studentId: string }> }) {
  const { classId, studentId } = await params;
  if (!isUuid(classId) || !isUuid(studentId)) notFound();
  const actor = await requireRole("TEACHER", { next: `/teacher/classes/${classId}/students/${studentId}` });
  const { class: cls, scope, detail } = await orNotFound(getClassStudentPerformance(actor, classId, studentId, { request: await auditRequest() }));
  const base = `/teacher/classes/${cls.id}`;
  const name = detail.student.name ?? "Student";

  return (
    <Container className="space-y-6 pb-10">
      <ClassHeader
        cls={cls}
        section="students"
        title={name}
        description={`In this class since ${formatDate(detail.student.joinedClassAt, actor.timeZone)}.`}
        trail={[{ label: "Students", href: `${base}/students` }, { label: name }]}
      />

      <section aria-labelledby="activity-title" className="space-y-3">
        <h2 id="activity-title" className="text-lg font-semibold text-text">
          Study activity
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile label="Last active" value={detail.activity.lastActiveDate ? formatLocalDate(detail.activity.lastActiveDate) : null} emptyLabel="Not yet" />
          <StatTile label="Active days (30 days)" value={formatNumber(detail.activity.activeDaysLast30)} />
          <StatTile label="Study time (30 days)" value={`${formatNumber(detail.activity.studyMinutesLast30)} min`} />
          <StatTile
            label="Work handed in"
            value={detail.assignments.summary.assigned > 0 ? `${detail.assignments.summary.completed}/${detail.assignments.summary.assigned}` : null}
            hint={detail.assignments.summary.late > 0 ? `${detail.assignments.summary.late} late` : undefined}
            emptyLabel="None set yet"
          />
        </div>
      </section>

      {detail.subjects.length === 0 ? (
        <EmptyState
          title={scope.derived && scope.subjectIds.length === 0 ? "No subject data for this class yet" : "Not studying this subject yet"}
          description={
            scope.derived && scope.subjectIds.length === 0
              ? "This class has no subject. Set work in a subject to see the student's progress in it."
              : "Progress appears once the student starts lessons, practice or tests in the class subject."
          }
        />
      ) : (
        detail.subjects.map((subject) => (
          <Card as="section" key={subject.subjectId} aria-labelledby={`s-${subject.subjectId}`}>
            <CardHeader
              titleAs="h2"
              title={<span id={`s-${subject.subjectId}`}>{subject.subjectName}</span>}
              description={`Syllabus version ${subject.syllabus.versionLabel}${subject.syllabus.isCurrent ? "" : " (an older version; the student can move to the current one)"} · progress ${percentText(subject.progressPct)} · average score ${percentText(subject.averageScorePct)} · mocks ${percentText(subject.averageMockPct)} · ${formatNumber(subject.questionsAttempted)} questions, ${percentText(subject.correctRatePct)} correct`}
            />
            <CardBody>
              {subject.mastery.length === 0 ? (
                <p className="text-sm text-muted">No topic practised yet.</p>
              ) : (
                <ul className="space-y-4">
                  {subject.mastery.map((topic) => (
                    <li key={topic.topicId}>
                      <MasteryBar label={topic.topicName} score={topic.score} href={`${base}/topics/${topic.topicId}`} />
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
        ))
      )}

      <section aria-labelledby="scores-title" className="space-y-3">
        <h2 id="scores-title" className="text-lg font-semibold text-text">
          Recent tests
        </h2>
        <DataTable
          caption="Recent test and exam results"
          rows={detail.recentScores}
          rowKey={(row) => row.attemptId}
          empty={<EmptyState appearance="plain" titleAs="p" title="No marked tests yet" />}
          columns={[
            { key: "title", header: "Test", primary: true, cell: (row) => row.title ?? MODE_LABELS[row.mode] ?? "Test" },
            { key: "date", header: "Handed in", cell: (row) => formatDate(row.submittedAt, actor.timeZone) },
            {
              key: "score",
              header: "Score",
              align: "end",
              cell: (row) => (
                <span className="inline-flex items-center gap-2">
                  {percentText(row.percentage)}
                  {row.isProvisional && <Badge tone="info" size="sm">Provisional</Badge>}
                </span>
              ),
            },
            { key: "grade", header: "Grade estimate", align: "end", cell: (row) => row.gradeEstimate ?? "—", hideOnMobile: true },
          ]}
        />
      </section>

      <section aria-labelledby="work-title" className="space-y-3">
        <h2 id="work-title" className="text-lg font-semibold text-text">
          Work in this class
        </h2>
        <DataTable
          caption="Assignments of this class for the student"
          rows={detail.assignments.items}
          rowKey={(row) => row.assignmentId}
          empty={<EmptyState appearance="plain" titleAs="p" title="No work set yet" />}
          columns={[
            {
              key: "title",
              header: "Assignment",
              primary: true,
              cell: (row) => (
                <Link href={`${base}/assignments/${row.assignmentId}`} className="font-semibold text-text hover:underline">
                  {row.title}
                </Link>
              ),
            },
            { key: "due", header: "Due", cell: (row) => formatDate(row.dueAt, actor.timeZone) },
            {
              key: "status",
              header: "Status",
              cell: (row) => {
                const status = ASSIGNMENT_STATUS[row.status] ?? ASSIGNMENT_STATUS.NOT_ASSIGNED!;
                return <Badge tone={status.tone}>{status.label}</Badge>;
              },
            },
            { key: "score", header: "Score", align: "end", cell: (row) => percentText(row.scorePercent) },
          ]}
        />
      </section>
    </Container>
  );
}
