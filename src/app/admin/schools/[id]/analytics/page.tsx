import { notFound } from "next/navigation";
import { ChartEmpty } from "@/components/admin/charts/BarList";
import { TimeSeriesChart } from "@/components/admin/charts/TimeSeriesChart";
import { DateRangeFilter, rangeFromParams } from "@/components/admin/DateRangeFilter";
import { AdminSection } from "@/components/admin/DetailParts";
import { formatLocalDate } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { adminRequestMeta } from "@/components/admin/server-action";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { DataTable } from "@/components/ui/DataTable";
import { StatTile } from "@/components/ui/StatTile";
import { formatDuration, formatNumber, formatPercent } from "@/lib/format";
import { getSchoolAnalyticsForAdmin } from "@/server/cms/schools/service";
import { auditRequestFrom } from "@/server/cms/users/service";
import { isAppError } from "@/server/lib/errors";

export const metadata = { title: "School analytics" };

function pct(value: number | null | undefined): string {
  return formatPercent(value ?? null, { maximumFractionDigits: 1 });
}

/**
 * /admin/schools/[id]/analytics — the §23 school analytics for staff: averages by subject, pass-rate ESTIMATE,
 * engagement, weakest topics, class outcomes per teacher and examination readiness. Aggregates only; never AI data.
 */
export default async function AdminSchoolAnalyticsPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<PageSearchParams> }) {
  const { id } = await params;
  const actor = await requireAdminPage("school.manage", { next: `/admin/schools/${id}/analytics` });
  const query = await searchParams;
  const range = rangeFromParams(firstParam(query, "from"), firstParam(query, "to"));
  let analytics;
  try {
    analytics = await getSchoolAnalyticsForAdmin(actor, id, range, auditRequestFrom(await adminRequestMeta()));
  } catch (error) {
    if (isAppError(error) && (error.code === "NOT_FOUND" || error.code === "VALIDATION")) notFound();
    throw error;
  }
  const { engagement, passRate } = analytics;
  const path = `/admin/schools/${id}/analytics`;

  return (
    <Container size="wide">
      <PageHeader
        title={`${analytics.school.name}: analytics`}
        breadcrumbs={[
          { label: "Schools", href: "/admin/schools" },
          { label: analytics.school.name, href: `/admin/schools/${id}` },
          { label: "Analytics" },
        ]}
        description={`${formatLocalDate(range.from)} to ${formatLocalDate(range.to)}, in the school's time zone (${analytics.school.timezone}). Current roster only.`}
      />
      <div className="space-y-6">
        <DateRangeFilter path={path} range={range} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Students on roster" value={analytics.roster.students} />
          <StatTile label="Active students" value={engagement.activeStudents} hint={engagement.activeStudentsPct === null ? undefined : `${pct(engagement.activeStudentsPct)} of the roster`} />
          <StatTile label="Average test score" value={analytics.averageScoreBySubject.overall.averageScorePct === null ? null : pct(analytics.averageScoreBySubject.overall.averageScorePct)} hint={`${formatNumber(analytics.averageScoreBySubject.overall.scoredAttempts)} marked tests`} />
          <StatTile label="Study time" value={formatDuration(engagement.studyMinutes)} hint={`${formatNumber(engagement.questionsAttempted)} questions answered`} />
        </div>

        <AdminSection title="Daily engagement" description="Active students per day. Days after today are blank, not zero.">
          {analytics.roster.students === 0 ? (
            <ChartEmpty>No students on this school&apos;s roster yet.</ChartEmpty>
          ) : (
            <TimeSeriesChart
              title="Active students per day"
              dates={engagement.daily.map((day) => day.date)}
              series={[{ key: "active", label: "Active students", values: engagement.daily.map((day) => day.activeStudents) }]}
            />
          )}
        </AdminSection>

        <div className="grid gap-6 xl:grid-cols-2">
          <AdminSection title="Average score by subject" flush>
            <DataTable
              caption="Average score by subject"
              rows={analytics.averageScoreBySubject.subjects}
              rowKey={(row) => row.subjectId}
              empty={<ChartEmpty className="mx-4 mb-4">No marked tests in this range.</ChartEmpty>}
              columns={[
                { key: "subject", header: "Subject", primary: true, cell: (row) => row.subjectName },
                { key: "tests", header: "Marked tests", align: "end", cell: (row) => formatNumber(row.scoredAttempts) },
                { key: "students", header: "Students", align: "end", cell: (row) => formatNumber(row.students) },
                { key: "avg", header: "Average", align: "end", cell: (row) => pct(row.averageScorePct) },
              ]}
            />
          </AdminSection>
          <AdminSection title="Pass rate (estimate)" flush>
            <Alert tone="neutral" className="mx-4 mb-3 sm:mx-5">
              {passRate.basisNote}
            </Alert>
            <DataTable
              caption="Estimated pass rate by subject"
              rows={passRate.subjects}
              rowKey={(row) => row.subjectId}
              empty={<ChartEmpty className="mx-4 mb-4">Not enough marked tests to estimate.</ChartEmpty>}
              columns={[
                { key: "subject", header: "Subject", primary: true, cell: (row) => row.subjectName },
                { key: "assessed", header: "Results judged", align: "end", cell: (row) => `${formatNumber(row.passed)} of ${formatNumber(row.assessed)} passed` },
                { key: "rate", header: "Estimated pass rate", align: "end", cell: (row) => pct(row.ratePercent) },
              ]}
            />
          </AdminSection>
        </div>

        <AdminSection title="Weakest topics" description="Current mastery of students who started the topic, weakest first." flush>
          <DataTable
            caption="Weakest topics"
            rows={analytics.topicPerformance}
            rowKey={(row) => row.topicId}
            empty={<ChartEmpty className="mx-4 mb-4">Not enough students have started topics yet.</ChartEmpty>}
            columns={[
              { key: "topic", header: "Topic", primary: true, cell: (row) => row.topicName },
              { key: "subject", header: "Subject", cell: (row) => row.subjectName },
              { key: "students", header: "Students", align: "end", cell: (row) => formatNumber(row.students) },
              { key: "weak", header: "Weak or developing", align: "end", cell: (row) => formatNumber(row.weakStudents) },
              { key: "mastery", header: "Average mastery", align: "end", cell: (row) => pct(row.averageMastery) },
              { key: "correct", header: "Correct answers", align: "end", hideOnMobile: true, cell: (row) => pct(row.correctRatePct) },
            ]}
          />
        </AdminSection>

        <AdminSection title="Class outcomes by teacher" description="Descriptive outcomes of each teacher's classes, not a judgement of the teacher." flush>
          <DataTable
            caption="Class outcomes by teacher"
            rows={analytics.teacherPerformance.teachers.flatMap((teacher) => teacher.classes.map((cls) => ({ ...cls, teacherName: teacher.teacherName, key: `${teacher.teacherUserId}-${cls.classId}` })))}
            rowKey={(row) => row.key}
            empty={<ChartEmpty className="mx-4 mb-4">No classes with teachers yet.</ChartEmpty>}
            columns={[
              { key: "class", header: "Class", primary: true, cell: (row) => row.className },
              { key: "teacher", header: "Teacher", cell: (row) => `${row.teacherName ?? "Unnamed teacher"}${row.teacherRole === "ASSISTANT" ? " (assistant)" : ""}` },
              { key: "students", header: "Students", align: "end", cell: (row) => formatNumber(row.students) },
              { key: "active", header: "Active", align: "end", cell: (row) => pct(row.activeStudentsPct) },
              { key: "avg", header: "Average score", align: "end", cell: (row) => pct(row.averageScorePct) },
              { key: "assignments", header: "Assignments completed", align: "end", hideOnMobile: true, cell: (row) => pct(row.assignmentCompletionPct) },
            ]}
          />
        </AdminSection>

        <AdminSection title="Examination readiness" flush>
          <DataTable
            caption="Examination readiness by subject"
            rows={analytics.examinationReadiness}
            rowKey={(row) => row.subjectId}
            empty={<ChartEmpty className="mx-4 mb-4">No subject enrolments yet.</ChartEmpty>}
            columns={[
              { key: "subject", header: "Subject", primary: true, cell: (row) => row.subjectName },
              { key: "enrolled", header: "Enrolled", align: "end", cell: (row) => formatNumber(row.studentsEnrolled) },
              { key: "readiness", header: "Average readiness", align: "end", cell: (row) => pct(row.averageReadinessPct) },
              { key: "mock", header: "Average mock", align: "end", cell: (row) => pct(row.averageMockPct) },
              { key: "ontrack", header: "On track", align: "end", cell: (row) => (row.studentsWithTarget > 0 ? `${formatNumber(row.onTrack)} of ${formatNumber(row.studentsWithTarget)}` : "—") },
              {
                key: "exam",
                header: "Next exam",
                hideOnMobile: true,
                cell: (row) => (row.nextExam ? `${row.nextExam.name} (${row.nextExam.daysUntil} days${row.nextExam.isProvisional ? ", provisional" : ""})` : "—"),
              },
            ]}
          />
        </AdminSection>
      </div>
    </Container>
  );
}
