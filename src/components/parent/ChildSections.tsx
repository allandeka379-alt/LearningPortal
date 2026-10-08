import { BookOpen, CalendarClock, ChartLine, ClipboardList, Clock, EyeOff, Lock, Target } from "lucide-react";
import type { ReactNode } from "react";
import { formatInstantDate, formatLocalDate } from "@/components/student/format";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { MasteryBadge } from "@/components/ui/MasteryBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatTile } from "@/components/ui/StatTile";
import { formatCount, formatDuration, formatNumber, formatPercent } from "@/lib/format";
import type { ChildOverview } from "@/server/analytics/parent";
import { ActivityCalendar } from "./ActivityCalendar";

/**
 * Sections of a child's page for a linked parent (§21: subjects, study time, progress, test results, weak areas,
 * examination countdown, activity). Each section receives the analytics read model's value, which is ABSENT when the
 * student does not share it: the section then says so plainly (never an empty chart that looks like "no work").
 * Progress, topics to work on, test results and the activity calendar are detailed reports (§31 `parentReports`, on
 * the CHILD's plan): with `locked` the section says it is not in the child's plan instead of "not shared".
 * Server components; no links into the student area.
 */

const MODE_LABELS: Readonly<Record<string, string>> = {
  QUIZ: "Quiz",
  TOPIC_TEST: "Topic test",
  CHAPTER_TEST: "Chapter test",
  SUBJECT_TEST: "Subject test",
  MOCK_EXAM: "Mock exam",
  TIMED_EXAM: "Timed exam",
  DIAGNOSTIC: "Diagnostic",
  ASSIGNMENT: "Assignment",
};

export function modeLabel(mode: string): string {
  return MODE_LABELS[mode] ?? "Test";
}

export function NotShared({ name, what }: { name: string; what: string }) {
  return (
    <p className="flex items-start gap-2 text-sm text-muted">
      <EyeOff aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <span>
        {name} hasn&rsquo;t shared {what} with you. Only {name} can change this, from Family in their own account.
      </span>
    </p>
  );
}

/** A detailed-report section the student shares, but their plan does not include parent reports. */
export function NotInPlan({ name }: { name: string }) {
  return (
    <p className="flex items-start gap-2 text-sm text-muted">
      <Lock aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <span>Part of detailed reports, which {name}&rsquo;s current plan doesn&rsquo;t include.</span>
    </p>
  );
}

function SectionCard({ id, title, icon, description, children }: { id: string; title: string; icon: ReactNode; description?: string; children: ReactNode }) {
  return (
    <Card as="section" aria-labelledby={id}>
      <CardHeader
        titleAs="h2"
        title={
          <span id={id} className="flex items-center gap-2">
            <span className="text-primary [&_svg]:size-5">{icon}</span>
            {title}
          </span>
        }
        description={description}
      />
      <CardBody>{children}</CardBody>
    </Card>
  );
}

/** "126 days until the November 2027 examinations" for the child's soonest target session. */
export function ChildCountdownCard({ countdown, name }: { countdown: ChildOverview["examCountdown"]; name: string }) {
  const next = countdown.next;
  return (
    <SectionCard id="child-countdown" title="Exam countdown" icon={<CalendarClock aria-hidden="true" />}>
      {!next ? (
        <p className="text-sm text-muted">{name} hasn&rsquo;t chosen a target examination yet.</p>
      ) : (
        <div className="space-y-2">
          {next.daysUntil <= 0 ? (
            <p className="text-2xl font-bold tracking-tight text-text">{next.daysUntil === 0 ? "Examinations start today" : "Examinations are under way"}</p>
          ) : (
            <p className="text-text">
              <span className="block text-4xl font-bold tracking-tight tabular-nums">{formatNumber(next.daysUntil)}</span>
              <span className="mt-1 block text-base font-medium">{next.daysUntil === 1 ? "day" : "days"} until the examinations</span>
            </p>
          )}
          <p className="text-sm text-muted">
            {next.name} · starts {formatLocalDate(next.startsOn)}
            {next.subjects.length > 0 ? ` · ${next.subjects.join(", ")}` : ""}
          </p>
          {next.isProvisional && (
            <Badge tone="accent" size="sm">
              Provisional date
            </Badge>
          )}
          {countdown.sessions.length > 1 && (
            <ul className="mt-3 space-y-1 border-t border-border pt-3 text-sm text-muted">
              {countdown.sessions.slice(1).map((session) => (
                <li key={session.examSessionId}>
                  {session.name}: {formatLocalDate(session.startsOn)} ({formatCount(Math.max(0, session.daysUntil), "day")})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </SectionCard>
  );
}

export function ChildSubjectsCard({ subjects, name }: { subjects: ChildOverview["subjects"]; name: string }) {
  return (
    <SectionCard id="child-subjects" title="Subjects" icon={<BookOpen aria-hidden="true" />}>
      {subjects.length === 0 ? (
        <p className="text-sm text-muted">{name} hasn&rsquo;t added any subjects yet.</p>
      ) : (
        <ul className="divide-y divide-border">
          {subjects.map((subject) => (
            <li key={subject.subjectId} className="flex flex-wrap items-center justify-between gap-2 py-2.5 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="font-medium text-text">{subject.subjectName}</p>
                <p className="text-sm text-muted">{subject.qualification}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {subject.targetGrade && <Badge size="sm">Target {subject.targetGrade}</Badge>}
                {subject.status === "PAUSED" && (
                  <Badge size="sm" tone="neutral" appearance="outline">
                    Paused
                  </Badge>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

export function ChildProgressCard({ progress, name, locked = false }: { progress: ChildOverview["progress"]; name: string; locked?: boolean }) {
  return (
    <SectionCard id="child-progress" title="Progress" icon={<ChartLine aria-hidden="true" />} description="Syllabus progress, accuracy and readiness per subject.">
      {locked ? (
        <NotInPlan name={name} />
      ) : !progress ? (
        <NotShared name={name} what="their progress" />
      ) : progress.length === 0 ? (
        <p className="text-sm text-muted">No subjects to show yet.</p>
      ) : (
        <ul className="space-y-5">
          {progress.map((row) => (
            <li key={row.subjectId} className="space-y-2">
              <ProgressBar label={row.subjectName} value={row.progressPct} />
              <p className="text-sm text-muted">
                {formatCount(row.topicsCompleted, "topic")} of {formatNumber(row.topicsTotal)} completed · {formatCount(row.questionsAttempted, "question")} answered
                {row.correctRatePct !== null ? ` · ${formatPercent(row.correctRatePct)} correct` : ""}
                {row.readinessPct !== null ? ` · readiness ${formatPercent(row.readinessPct)}` : ""}
              </p>
              {row.predictedGradeEstimate && (
                <p className="text-sm text-text">
                  Estimated grade: <span className="font-semibold">{row.predictedGradeEstimate}</span>{" "}
                  <span className="text-muted">(an estimate from practice, not an official grade)</span>
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

export function ChildWeakAreasCard({
  weakAreas,
  name,
  limit,
  locked = false,
}: {
  weakAreas: ChildOverview["weakAreas"];
  name: string;
  limit?: number;
  locked?: boolean;
}) {
  const rows = weakAreas ? (limit ? weakAreas.slice(0, limit) : weakAreas) : undefined;
  return (
    <SectionCard id="child-weak-areas" title="Topics to work on" icon={<Target aria-hidden="true" />} description="The topics with the lowest mastery so far.">
      {locked ? (
        <NotInPlan name={name} />
      ) : !rows ? (
        <NotShared name={name} what="their progress" />
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted">No weak topics found yet. They show up once {name} has practised.</p>
      ) : (
        <ul className="divide-y divide-border">
          {rows.map((topic) => (
            <li key={topic.topicId} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="font-medium text-text">{topic.topicName}</p>
                <p className="text-sm text-muted">{topic.subjectName}</p>
              </div>
              <MasteryBadge band={topic.band} score={topic.score} size="sm" />
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

export function ChildStudyTimeCard({
  studyTime,
  activityCalendar,
  name,
  today,
  calendarLocked = false,
}: {
  studyTime: ChildOverview["studyTime"];
  activityCalendar: ChildOverview["activityCalendar"];
  name: string;
  today: string;
  /** The day-by-day calendar is a detailed report not in the child's plan (the totals still show). */
  calendarLocked?: boolean;
}) {
  return (
    <SectionCard id="child-study-time" title="Study time and activity" icon={<Clock aria-hidden="true" />}>
      {!studyTime ? (
        <NotShared name={name} what="their study activity" />
      ) : (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <StatTile
              label="Last 7 days"
              value={formatDuration(studyTime.last7Days.minutes)}
              hint={`Active on ${formatCount(studyTime.last7Days.activeDays, "day")}`}
            />
            <StatTile
              label="Last 30 days"
              value={formatDuration(studyTime.last30Days.minutes)}
              hint={`Active on ${formatCount(studyTime.last30Days.activeDays, "day")}`}
            />
            <StatTile
              label="Study streak"
              value={studyTime.streak ? formatCount(studyTime.streak.current, "day") : null}
              emptyLabel="No streak yet"
              hint={studyTime.streak ? `Longest: ${formatCount(studyTime.streak.longest, "day")}` : undefined}
            />
          </div>
          {studyTime.bySubjectLast30Days.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-text">By subject, last 30 days</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {studyTime.bySubjectLast30Days.map((row) => (
                  <li key={row.subjectId ?? "general"} className="flex justify-between gap-3">
                    <span className="text-text">{row.subjectName ?? "General study"}</span>
                    <span className="text-muted tabular-nums">{formatDuration(row.minutes)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activityCalendar && <ActivityCalendar days={activityCalendar.days} today={today} />}
          {calendarLocked && (
            <div>
              <h3 className="text-sm font-semibold text-text">Day-by-day activity</h3>
              <div className="mt-2">
                <NotInPlan name={name} />
              </div>
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
}

export function ChildResultsCard({
  testResults,
  name,
  timeZone,
  showBySubject = true,
  locked = false,
}: {
  testResults: ChildOverview["testResults"];
  name: string;
  timeZone: string;
  showBySubject?: boolean;
  locked?: boolean;
}) {
  return (
    <SectionCard id="child-results" title="Test results" icon={<ClipboardList aria-hidden="true" />}>
      {locked ? (
        <NotInPlan name={name} />
      ) : !testResults ? (
        <NotShared name={name} what="their test results" />
      ) : testResults.recent.length === 0 ? (
        <p className="text-sm text-muted">No marked tests or mock exams yet.</p>
      ) : (
        <div className="space-y-5">
          <ul className="divide-y divide-border">
            {testResults.recent.map((result) => (
              <li key={result.attemptId} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="font-medium break-words text-text">{result.title ?? modeLabel(result.mode)}</p>
                  <p className="text-sm text-muted">
                    {modeLabel(result.mode)} · {result.subjectName}
                    {result.submittedAt ? ` · ${formatInstantDate(result.submittedAt, timeZone)}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="text-lg font-semibold text-text tabular-nums">{formatPercent(result.percentage)}</span>
                  {result.isProvisional ? (
                    <Badge tone="info" size="sm">
                      Marking in progress
                    </Badge>
                  ) : (
                    result.gradeEstimate && <Badge size="sm">Est. grade {result.gradeEstimate}</Badge>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {showBySubject && testResults.bySubject.some((row) => row.assessmentsCompleted > 0 || row.mockExamsCompleted > 0) && (
            <div className="relative overflow-x-auto">
              <table className="w-full min-w-[20rem] text-left text-sm">
                <caption className="pb-2 text-left text-sm font-semibold text-text">Averages by subject</caption>
                <thead className="text-xs text-muted">
                  <tr>
                    <th scope="col" className="py-1 pr-3 font-medium">
                      Subject
                    </th>
                    <th scope="col" className="py-1 pr-3 text-right font-medium">
                      Tests
                    </th>
                    <th scope="col" className="py-1 pr-3 text-right font-medium">
                      Average
                    </th>
                    <th scope="col" className="py-1 text-right font-medium">
                      Best mock
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {testResults.bySubject.map((row) => (
                    <tr key={row.subjectId}>
                      <th scope="row" className="py-2 pr-3 font-normal text-text">
                        {row.subjectName}
                      </th>
                      <td className="py-2 pr-3 text-right tabular-nums">{formatNumber(row.assessmentsCompleted + row.mockExamsCompleted)}</td>
                      <td className="py-2 pr-3 text-right tabular-nums">{formatPercent(row.averageScorePct)}</td>
                      <td className="py-2 text-right tabular-nums">{formatPercent(row.bestMockPct)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
}
