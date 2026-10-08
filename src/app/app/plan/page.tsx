import { UpgradeButton, UpgradeLink } from "@/components/billing/UpgradeOffer";
import { CalendarDays, ChevronRight, Lock } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { AdaptPlanButton } from "@/components/plan/AdaptPlanButton";
import { examCountdownText, examDateText } from "@/components/plan/plan-copy";
import { PlanOverview } from "@/components/plan/PlanOverview";
import { PlanReasons } from "@/components/plan/PlanReasons";
import { PlanSetupForm, type PlanSetupSubject } from "@/components/plan/PlanSetupForm";
import { TodayPlanCard } from "@/components/plan/TodayPlanCard";
import { WeekPlanSection } from "@/components/plan/WeekPlanSection";
import { formatLocalDate } from "@/components/student/format";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { getPlanPage, getPlanSetup, type PlanSetup } from "@/server/studyplan/service";
import { planFormSubjectIds, requestedPlanSubjectIds } from "./_lib/params";
import { adaptPlanAction, createPlanAction, updatePlanItemAction } from "./actions";

export const metadata: Metadata = { title: "Study plan" };

function sessionLabel(exam: { name: string; isProvisional: boolean; isDemo: boolean }): string {
  if (exam.isDemo) return `${exam.name} (demo date, development only)`;
  return exam.isProvisional ? `${exam.name} (provisional date)` : exam.name;
}

function setupSubjects(setup: PlanSetup): PlanSetupSubject[] {
  return setup.subjects.map((s) => ({
    subjectId: s.subjectId,
    name: s.name,
    detail: [s.qualificationName, s.targetExam ? `target: ${sessionLabel(s.targetExam)}` : null, s.targetGrade ? `grade ${s.targetGrade}` : null]
      .filter(Boolean)
      .join(" · "),
  }));
}

function examHint(setup: PlanSetup, examDate: string | null): string | null {
  const suggestion = setup.suggestedExam;
  if (suggestion && examDate === suggestion.date) {
    return `From your target examination: ${sessionLabel(suggestion)}. Change it, or clear it if you don't have an exam date.`;
  }
  return null;
}

/**
 * Personal study plan (§16, §52 step 7; ARCHITECTURE §3.3 `/app/plan`). Without a plan: the creation form (exam date
 * from the target session, subjects from enrolments, availability from the study defaults) or, when the student's
 * plan does not include study plans, an honest upgrade note. With a plan: today first, the week (Monday to Sunday,
 * day selector), why the plan looks as it does, "Update my plan", and the settings to rebuild it. `?subjectIds=a,b`
 * (the diagnostic report's "Create my study plan") pre-selects those subjects in the form.
 */
export default async function StudyPlanPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const actor = await requireOnboardedStudent({ next: "/app/plan" });
  const { week, subjectIds } = await searchParams;
  const page = await getPlanPage(actor, { weekStart: typeof week === "string" ? week : null });

  if (!page.plan || !page.todayPlan || !page.week) {
    if (!page.entitled) {
      return (
        <Container size="reading" className="pb-10">
          <PageHeader title="Study plan" eyebrow={formatLocalDate(page.today, "weekday")} />
          <EmptyState
            icon={<Lock aria-hidden="true" />}
            title="Your personal study plan comes with full access"
            description="A study plan turns your subjects, exam date and weakest topics into a weekly schedule that adapts as you practise."
            action={
              <>
                <UpgradeButton />
                <ButtonLink href="/app/practice" variant="outline">
                  Practise now
                </ButtonLink>
              </>
            }
          />
        </Container>
      );
    }
    const setup = await getPlanSetup(actor);
    const examDate = setup.suggestedExam?.date ?? null;
    const enrolledIds = setup.subjects.map((s) => s.subjectId);
    const { selected } = planFormSubjectIds({ enrolledSubjectIds: enrolledIds, planSubjectIds: null, requested: requestedPlanSubjectIds(subjectIds, enrolledIds) });
    return (
      <Container size="reading" className="space-y-6 pb-10">
        <PageHeader
          title="Create your study plan"
          eyebrow={formatLocalDate(page.today, "weekday")}
          description="Tell us your exam date and the time you have each day. Your plan puts weak topics first, covers the syllabus you have left and adapts as you practise."
          className="pb-0"
        />
        {setup.subjects.length === 0 ? (
          <EmptyState
            icon={<CalendarDays aria-hidden="true" />}
            title="Add a subject first"
            description="Your plan is built from the subjects you study."
            action={<ButtonLink href="/app/subjects/manage">Add subjects</ButtonLink>}
          />
        ) : (
          <Card>
            <CardBody>
              <PlanSetupForm
                mode="create"
                subjects={setupSubjects(setup)}
                selectedSubjectIds={selected}
                examDate={examDate}
                examHint={examHint(setup, examDate)}
                minExamDate={setup.minExamDate}
                maxExamDate={setup.maxExamDate}
                availability={setup.availability}
                maxDailyMinutes={setup.maxDailyMinutes}
                action={createPlanAction}
              />
            </CardBody>
          </Card>
        )}
      </Container>
    );
  }

  const plan = page.plan;
  const setup = page.entitled ? await getPlanSetup(actor) : null;
  const countdown = examCountdownText(plan.daysUntilExam);
  const examText = examDateText(plan);
  const currentExam = setup?.current?.examDate ?? null;
  const enrolledIds = setup?.subjects.map((s) => s.subjectId) ?? [];
  const formSubjects = planFormSubjectIds({
    enrolledSubjectIds: enrolledIds,
    planSubjectIds: setup?.current?.subjectIds ?? [],
    requested: requestedPlanSubjectIds(subjectIds, enrolledIds),
  });

  return (
    <Container className="space-y-6 pb-10">
      <PageHeader
        title="Study plan"
        eyebrow={formatLocalDate(page.today, "weekday")}
        description={countdown && examText ? `${countdown} (${examText}).` : "A rolling plan without an exam date."}
        actions={page.entitled ? <AdaptPlanButton action={adaptPlanAction} /> : undefined}
        className="pb-0"
      />

      {!page.entitled && (
        <Alert tone="info" title="Your plan no longer updates">
          Your current plan doesn&rsquo;t include study plans, so this schedule stays as it is. You can still tick off sessions.{" "}
          <UpgradeLink className="font-semibold underline underline-offset-4" />
        </Alert>
      )}

      <TodayPlanCard today={page.todayPlan} itemAction={updatePlanItemAction} />

      <WeekPlanSection week={page.week} planStart={plan.startsOn} planEnd={plan.endsOn} itemAction={updatePlanItemAction} />

      <PlanOverview plan={plan} week={page.week} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start">
        <PlanReasons plan={plan} upcoming={page.upcoming} timeZone={page.timeZone} />
        {setup && setup.subjects.length > 0 && (
          <Card as="section" aria-labelledby="plan-settings-title">
            <CardHeader
              titleAs="h2"
              title={<span id="plan-settings-title">Plan settings</span>}
              description={`${plan.subjects.map((s) => s.name).join(", ")} · ${examText ?? "no exam date"}`}
            />
            <CardBody>
              <details open={formSubjects.addsSubjects || undefined} className="group rounded-control border border-border">
                <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1 px-3 text-sm font-semibold text-primary [&::-webkit-details-marker]:hidden">
                  <ChevronRight aria-hidden="true" className="size-4 transition-transform group-open:rotate-90 motion-reduce:transition-none" />
                  Change subjects, exam date or study time
                </summary>
                <div className="border-t border-border p-3">
                  <PlanSetupForm
                    mode="edit"
                    subjects={setupSubjects(setup)}
                    selectedSubjectIds={formSubjects.selected}
                    examDate={currentExam}
                    examHint={examHint(setup, currentExam)}
                    minExamDate={setup.minExamDate}
                    maxExamDate={setup.maxExamDate}
                    availability={setup.availability}
                    maxDailyMinutes={setup.maxDailyMinutes}
                    action={createPlanAction}
                  />
                </div>
              </details>
            </CardBody>
          </Card>
        )}
      </div>
    </Container>
  );
}
