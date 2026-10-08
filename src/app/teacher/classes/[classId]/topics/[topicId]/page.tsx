import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/components/admin/format";
import { Container } from "@/components/layout/Container";
import { AssignPracticeForm } from "@/components/teacher/AssignPracticeForm";
import { ClassHeader } from "@/components/teacher/ClassHeader";
import { percentText } from "@/components/teacher/labels";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { MasteryBadge } from "@/components/ui/MasteryBadge";
import { MasteryBar } from "@/components/ui/MasteryBar";
import { StatTile } from "@/components/ui/StatTile";
import { formatNumber } from "@/lib/format";
import { MASTERY_BAND_LABELS, MASTERY_BANDS } from "@/lib/mastery-band";
import { requireRole } from "@/server/auth/guards";
import { isUuid } from "@/server/teaching/access";
import { getClassTopicPerformance } from "@/server/teaching/analytics";
import { orNotFound } from "../../../../_lib/page";
import { assignTopicPracticeAction } from "../../../actions";

export const metadata: Metadata = { title: "Topic performance" };

/** §22 level 3: one topic across the class — mastery bands, sub-topics and every student (weakest first). */
export default async function ClassTopicPage({ params }: { params: Promise<{ classId: string; topicId: string }> }) {
  const { classId, topicId } = await params;
  if (!isUuid(classId) || !isUuid(topicId)) notFound();
  const actor = await requireRole("TEACHER", { next: `/teacher/classes/${classId}/topics/${topicId}` });
  const view = await orNotFound(getClassTopicPerformance(actor, classId, topicId));
  const { class: cls, topic, summary } = view;
  const base = `/teacher/classes/${cls.id}`;

  return (
    <Container className="space-y-6 pb-10">
      <ClassHeader
        cls={cls}
        section="overview"
        title={topic.code ? `${topic.code} ${topic.name}` : topic.name}
        description={topic.subjectName}
        trail={[{ label: topic.name }]}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Students who started it" value={`${formatNumber(summary.started)}/${formatNumber(summary.students)}`} />
        <StatTile label="Average mastery" value={summary.averageMastery === null ? null : percentText(summary.averageMastery)} emptyLabel="Not started yet" />
        <StatTile label="Weak or developing" value={formatNumber(summary.weakStudents)} />
        <StatTile label="Mastered" value={formatNumber(summary.bands.MASTERED)} />
      </div>

      <Card as="section" aria-labelledby="bands-title">
        <CardHeader titleAs="h2" title={<span id="bands-title">Mastery bands</span>} />
        <CardBody>
          <ul className="flex flex-wrap gap-3">
            {MASTERY_BANDS.map((band) => (
              <li key={band} className="inline-flex items-center gap-2 text-sm">
                <MasteryBadge band={band} size="sm" />
                <span className="tabular-nums text-text">
                  {formatNumber(summary.bands[band])} <span className="sr-only">students {MASTERY_BAND_LABELS[band]}</span>
                </span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      {cls.archivedAt === null && (
        <Card as="section" aria-labelledby="assign-title">
          <CardHeader titleAs="h2" title={<span id="assign-title">Practise this topic</span>} description="Adaptive practice, due in a week." />
          <CardBody>
            <AssignPracticeForm classId={cls.id} topicId={topic.id} topicName={topic.name} weakStudents={summary.weakStudents} action={assignTopicPracticeAction} />
          </CardBody>
        </Card>
      )}

      {view.subtopics.length > 0 && (
        <Card as="section" aria-labelledby="sub-title">
          <CardHeader titleAs="h2" title={<span id="sub-title">Sub-topics</span>} />
          <CardBody>
            <ul className="space-y-4">
              {view.subtopics.map((sub) => (
                <li key={sub.id}>
                  <MasteryBar label={sub.code ? `${sub.code} ${sub.name}` : sub.name} score={sub.averageMastery} />
                  <p className="mt-1 text-xs text-muted">
                    {formatNumber(sub.started)} started · {formatNumber(sub.weakStudents)} weak
                  </p>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}

      <section aria-labelledby="topic-students" className="space-y-3">
        <h2 id="topic-students" className="text-lg font-semibold text-text">
          Students
        </h2>
        <DataTable
          caption={`Students' mastery of ${topic.name}`}
          rows={view.students}
          rowKey={(row) => row.userId}
          columns={[
            {
              key: "name",
              header: "Student",
              primary: true,
              cell: (row) => (
                <Link href={`${base}/students/${row.userId}`} className="font-semibold text-text hover:underline">
                  {row.name}
                </Link>
              ),
            },
            { key: "band", header: "Mastery", cell: (row) => <MasteryBadge score={row.score} band={row.band ?? undefined} showScore={row.score !== null} size="sm" /> },
            { key: "questions", header: "Questions", align: "end", cell: (row) => formatNumber(row.questionsAttempted) },
            { key: "correct", header: "Correct", align: "end", cell: (row) => percentText(row.correctRatePct) },
            { key: "last", header: "Last practised", cell: (row) => formatDate(row.lastPracticedAt, actor.timeZone), hideOnMobile: true },
          ]}
        />
      </section>
    </Container>
  );
}
