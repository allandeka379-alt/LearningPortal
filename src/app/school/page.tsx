import { ClipboardList, FileText, GraduationCap, Upload, UserPlus, UsersRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChartEmpty } from "@/components/admin/charts/BarList";
import { TimeSeriesChart } from "@/components/admin/charts/TimeSeriesChart";
import { DateRangeFilter, rangeFromParams } from "@/components/admin/DateRangeFilter";
import { AdminSection } from "@/components/admin/DetailParts";
import { formatDate, formatLocalDate } from "@/components/admin/format";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatTile } from "@/components/ui/StatTile";
import { formatDuration, formatNumber, formatPercent } from "@/lib/format";
import { getSchoolDashboard } from "@/server/schools/dashboard";
import { requireSchoolPage } from "./_lib/context";

export const metadata: Metadata = { title: "School overview" };

function pct(value: number | null | undefined): string {
  return formatPercent(value ?? null, { maximumFractionDigits: 1 });
}

/**
 * /school — the school admin's overview (§23): what needs setting up, seats against the subscription, and the school's
 * analytics for a date range (average score by subject, pass-rate ESTIMATE, weakest topics, engagement, class outcomes
 * per teacher framed as outcomes, examination readiness). Aggregates of the current roster only; never AI data.
 */
export default async function SchoolOverviewPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const { actor, school } = await requireSchoolPage("/school");
  const query = await searchParams;
  const range = rangeFromParams(firstParam(query, "from"), firstParam(query, "to"));
  const dashboard = await getSchoolDashboard(actor, { schoolId: school.schoolId, from: range.from, to: range.to });
  const { analytics, setup, seats, pending } = dashboard;
  const { engagement, passRate } = analytics;

  const gaps: { text: string; href: string; action: string }[] = [];
  if (setup.subjects === 0) gaps.push({ text: "Choose the subjects your school offers.", href: "/school/subjects", action: "Add subjects" });
  if (setup.teachers === 0) gaps.push({ text: "Invite your teachers.", href: "/school/teachers", action: "Invite teachers" });
  if (analytics.roster.students === 0) gaps.push({ text: "Add your students (import a class list or invite them).", href: "/school/students/import", action: "Import students" });
  if (setup.classes === 0) gaps.push({ text: "Create your classes.", href: "/school/classes", action: "Create a class" });
  if (setup.classesWithoutTeacher > 0) {
    gaps.push({ text: `${formatNumber(setup.classesWithoutTeacher)} class${setup.classesWithoutTeacher === 1 ? " has" : "es have"} no teacher.`, href: "/school/classes", action: "Assign teachers" });
  }
  if (setup.studentsWithoutClass > 0 && setup.classes > 0) {
    gaps.push({ text: `${formatNumber(setup.studentsWithoutClass)} student${setup.studentsWithoutClass === 1 ? " is" : "s are"} not in any class.`, href: "/school/classes", action: "Place students" });
  }

  return (
    <Container size="wide">
      <PageHeader
        title={school.name}
        eyebrow="School overview"
        description={`${formatLocalDate(range.from)} to ${formatLocalDate(range.to)}, in your school's time zone. Figures cover the students on your roster today.`}
        actions={
          <>
            <ButtonLink href="/school/students/import" variant="primary" iconStart={<Upload aria-hidden="true" />}>
              Import students
            </ButtonLink>
            <ButtonLink href="/school/reports" variant="outline" iconStart={<FileText aria-hidden="true" />}>
              Reports
            </ButtonLink>
          </>
        }
      />
      <div className="space-y-6 pb-8">
        {school.status === "PENDING_VERIFICATION" && (
          <Alert tone="info" title="Your school is awaiting verification">
            You can set up classes, teachers and students now. School subscriptions start once the platform team has verified
            your school.
          </Alert>
        )}

        {gaps.length > 0 && (
          <AdminSection title="Finish setting up" description="These steps unlock class work and school analytics.">
            <ul className="divide-y divide-border">
              {gaps.map((gap) => (
                <li key={gap.text} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-text">{gap.text}</span>
                  <ButtonLink href={gap.href} size="sm" variant="outline">
                    {gap.action}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </AdminSection>
        )}

        <nav aria-label="Quick actions" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { href: "/school/teachers", label: "Invite a teacher", icon: <UserPlus aria-hidden="true" /> },
            { href: "/school/students", label: "Students", icon: <GraduationCap aria-hidden="true" /> },
            { href: "/school/classes", label: "Classes", icon: <UsersRound aria-hidden="true" /> },
            { href: "/school/reports", label: "Generate a report", icon: <ClipboardList aria-hidden="true" /> },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-16 items-center gap-3 rounded-card border border-border bg-surface px-4 py-3 text-sm font-semibold text-text transition-colors hover:bg-subtle [&_svg]:size-5 [&_svg]:text-primary"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Students on roster" value={analytics.roster.students} hint={`${formatNumber(analytics.roster.teachers)} teachers · ${formatNumber(analytics.roster.classes)} classes`} />
          <StatTile label="Active students" value={engagement.activeStudents} hint={engagement.activeStudentsPct === null ? undefined : `${pct(engagement.activeStudentsPct)} of the roster`} />
          <StatTile
            label="Average test score"
            value={analytics.averageScoreBySubject.overall.averageScorePct === null ? null : pct(analytics.averageScoreBySubject.overall.averageScorePct)}
            hint={`${formatNumber(analytics.averageScoreBySubject.overall.scoredAttempts)} marked tests`}
          />
          <StatTile label="Study time" value={formatDuration(engagement.studyMinutes)} hint={`${formatNumber(engagement.questionsAttempted)} questions answered`} />
        </div>

        <AdminSection
          title="Seats"
          description={seats ? `${seats.planName} · renews or ends ${seats.currentPeriodEnd ? formatDate(seats.currentPeriodEnd, school.timezone) : "—"}` : undefined}
          action={
            <ButtonLink href="/school/billing" size="sm" variant="ghost">
              Subscription
            </ButtonLink>
          }
        >
          {seats ? (
            <div className="space-y-2">
              <ProgressBar label="Seats in use" value={seats.allocated} max={Math.max(seats.purchased, 1)} valueText={`${formatNumber(seats.allocated)} of ${formatNumber(seats.purchased)} seats`} />
              {seats.studentsWithoutSeat > 0 && (
                <p className="text-sm text-muted">
                  {formatNumber(seats.studentsWithoutSeat)} student{seats.studentsWithoutSeat === 1 ? " has" : "s have"} no seat yet. Seats are taken
                  automatically when students next use the platform, while seats are free.
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted">
              Your school has no subscription yet, so students use the free plan.{" "}
              <Link href="/school/billing" className="font-semibold text-primary underline-offset-4 hover:underline">
                Request a school plan
              </Link>
              .
            </p>
          )}
        </AdminSection>

        {(pending.invitations > 0 || pending.joinRequests > 0) && (
          <Alert tone="info">
            {pending.invitations > 0 && `${formatNumber(pending.invitations)} invitation${pending.invitations === 1 ? " is" : "s are"} waiting to be accepted. `}
            {pending.joinRequests > 0 && (
              <Link href="/school/students?status=REQUESTED" className="font-semibold text-primary underline-offset-4 hover:underline">
                {formatNumber(pending.joinRequests)} join request{pending.joinRequests === 1 ? "" : "s"} to review
              </Link>
            )}
          </Alert>
        )}

        <DateRangeFilter path="/school" range={range} />

        <AdminSection title="Daily engagement" description="Active students per day. Days after today are blank, not zero.">
          {analytics.roster.students === 0 ? (
            <ChartEmpty>No students on your roster yet.</ChartEmpty>
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
              empty={<ChartEmpty className="mx-4 mb-4">No marked tests in this period.</ChartEmpty>}
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
              empty={<ChartEmpty className="mx-4 mb-4">Not enough mock exams or subject tests to estimate.</ChartEmpty>}
              columns={[
                { key: "subject", header: "Subject", primary: true, cell: (row) => row.subjectName },
                { key: "assessed", header: "Results", align: "end", cell: (row) => `${formatNumber(row.passed)} of ${formatNumber(row.assessed)} passed` },
                { key: "rate", header: "Estimated pass rate", align: "end", cell: (row) => pct(row.ratePercent) },
              ]}
            />
          </AdminSection>
        </div>

        <AdminSection title="Weakest topics" description="Current mastery of students who have started each topic, weakest first." flush>
          <DataTable
            caption="Weakest topics"
            rows={analytics.topicPerformance}
            rowKey={(row) => `${row.subjectId}:${row.topicId}`}
            empty={<ChartEmpty className="mx-4 mb-4">Not enough students have started topics yet.</ChartEmpty>}
            columns={[
              { key: "topic", header: "Topic", primary: true, cell: (row) => row.topicName },
              { key: "subject", header: "Subject", cell: (row) => row.subjectName },
              { key: "students", header: "Students", align: "end", cell: (row) => formatNumber(row.students) },
              { key: "weak", header: "Weak or developing", align: "end", cell: (row) => formatNumber(row.weakStudents) },
              { key: "mastery", header: "Average mastery", align: "end", cell: (row) => pct(row.averageMastery) },
            ]}
          />
        </AdminSection>

        <AdminSection title="Class outcomes by teacher" description="How each teacher's classes are doing. These are class outcomes, not a judgement of the teacher." flush>
          <DataTable
            caption="Class outcomes by teacher"
            rows={analytics.teacherPerformance.teachers.flatMap((teacher) => teacher.classes.map((cls) => ({ ...cls, teacherName: teacher.teacherName, key: `${teacher.teacherUserId}-${cls.classId}` })))}
            rowKey={(row) => row.key}
            empty={<ChartEmpty className="mx-4 mb-4">No classes with teachers yet.</ChartEmpty>}
            columns={[
              {
                key: "class",
                header: "Class",
                primary: true,
                cell: (row) => (
                  <Link href={`/school/classes/${row.classId}`} className="font-semibold text-primary underline-offset-4 hover:underline">
                    {row.className}
                  </Link>
                ),
              },
              { key: "teacher", header: "Teacher", cell: (row) => `${row.teacherName ?? "Unnamed teacher"}${row.teacherRole === "ASSISTANT" ? " (assistant)" : ""}` },
              { key: "students", header: "Students", align: "end", cell: (row) => formatNumber(row.students) },
              { key: "active", header: "Active", align: "end", cell: (row) => pct(row.activeStudentsPct) },
              { key: "avg", header: "Average score", align: "end", cell: (row) => pct(row.averageScorePct) },
              { key: "assignments", header: "Work completed", align: "end", hideOnMobile: true, cell: (row) => pct(row.assignmentCompletionPct) },
            ]}
          />
        </AdminSection>

        <AdminSection title="Examination readiness" description="Current readiness and mock results of enrolled students, by subject." flush>
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
              { key: "ontrack", header: "On track for target", align: "end", cell: (row) => (row.studentsWithTarget > 0 ? `${formatNumber(row.onTrack)} of ${formatNumber(row.studentsWithTarget)}` : "—") },
              {
                key: "exam",
                header: "Next exam",
                hideOnMobile: true,
                cell: (row) => (row.nextExam ? `${row.nextExam.name} (in ${formatNumber(row.nextExam.daysUntil)} days${row.nextExam.isProvisional ? ", provisional dates" : ""})` : "—"),
              },
            ]}
          />
        </AdminSection>
      </div>
    </Container>
  );
}
