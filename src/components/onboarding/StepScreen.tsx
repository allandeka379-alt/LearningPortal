import { ArrowLeft, CalendarClock, ClipboardCheck, Search } from "lucide-react";
import type { ReactNode } from "react";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { WhatsAppGroupShare } from "@/components/share/WhatsAppGroupShare";
import { APP_NAME } from "@/lib/config";
import { absoluteUrl } from "@/server/lib/env";
import { DIAGNOSTIC_MINUTES_PER_SUBJECT } from "@/server/onboarding/report";
import type { ChoiceOption, SchoolPickerView, StepView } from "@/server/onboarding/service";
import { previousStep, stepHref, withOnboardingNext, type WizardStep } from "@/server/onboarding/steps";
import { ChoiceCards, type ChoiceCardOption } from "./ChoiceCards";
import { ABILITY_COPY, dailyGoalLabel, sessionDescription, type AbilityValue } from "./copy";
import { FinishForm } from "./FinishForm";
import type { OnboardingFormAction } from "./form-state";
import { OnboardingProgress } from "./OnboardingProgress";
import { OnboardingSummary } from "./OnboardingSummary";
import { StepForm } from "./StepForm";
import { SubjectPicker } from "./SubjectPicker";

export interface StepScreenProps {
  view: StepView;
  /** Saves one screen and redirects to the next. */
  saveAction: OnboardingFormAction;
  /** Completes onboarding (last screen). */
  finishAction: OnboardingFormAction;
  /** Validated page to continue to once the wizard is done (kept on every link and form of the screen). */
  next?: string | null;
}

const toCards = (options: readonly ChoiceOption[]): ChoiceCardOption[] =>
  options.map((o) => ({ value: o.id, label: o.label, description: o.description ?? undefined, comingSoon: !o.available }));

/** Question and supporting line of each screen (UI copy; names inside come from the database). */
function heading(view: StepView): { title: string; description: ReactNode } {
  switch (view.step) {
    case "country":
      return { title: "Where do you go to school?", description: "We'll show the examination boards offered in your country." };
    case "board":
      return { title: "Which examination board are you writing?", description: `Boards offered in ${view.countryName}.` };
    case "level":
      return { title: "Which level are you studying?", description: `Choose the ${view.boardName} qualification you're working towards.` };
    case "year":
      return { title: "Which year or form are you in?", description: `For ${view.qualificationName}.` };
    case "subjects":
      return {
        title: "Which subjects are you taking?",
        description: `Choose every subject you're studying for ${view.qualificationName}. You can add or remove subjects later.`,
      };
    case "exam":
      return {
        title: "When are you writing your examinations?",
        description: "We count down to this date (and pace your study plan around it once you have full access). You can change it later.",
      };
    case "ability":
      return {
        title: "How would you describe your level right now?",
        description: "This sets how hard your first questions are. It adjusts on its own as you practise.",
      };
    case "grade":
      return { title: "Do you have a target grade?", description: "Optional. It helps us show how close you are to it." };
    case "goal":
      return {
        title: "How much time can you study each day?",
        description: "Your daily target uses this until you create a study plan. You can change it any time in Settings.",
      };
    case "finish":
      return {
        title: "You're nearly done",
        description: "Check your answers, then finish to start learning. A diagnostic test can show where you stand, topic by topic.",
      };
  }
}

/**
 * "Find your school" (optional, year screen): a plain GET search (`?school=`) so it works without JavaScript. It sits
 * OUTSIDE the step form (forms cannot nest); the matches are radio cards inside the step form.
 */
function SchoolSearchForm({ picker, next }: { picker: SchoolPickerView; next: string | null }) {
  return (
    <form method="get" action={stepHref("year")} role="search" aria-label="Find your school" className="space-y-2 rounded-card border border-border bg-surface p-4">
      {next ? <input type="hidden" name="next" value={next} /> : null}
      <Field label="Your school (optional)" hint="Your school can then add you to its classes after it approves your request.">
        <Input name="school" type="search" defaultValue={picker.query} minLength={picker.minQueryLength} maxLength={100} autoComplete="off" startIcon={<Search aria-hidden="true" />} />
      </Field>
      <Button type="submit" variant="outline" size="sm">
        Find my school
      </Button>
    </form>
  );
}

function schoolFields(picker: SchoolPickerView, errorId: string): ReactNode {
  const options = [...(picker.selected ? [picker.selected] : []), ...picker.results].map((school) => ({
    value: school.id,
    label: school.name,
    description: school.place ?? undefined,
  }));
  if (options.length === 0) {
    return picker.query.length >= picker.minQueryLength ? (
      <p role="status" className="text-sm text-muted">
        No school matches &ldquo;{picker.query}&rdquo;. Check the spelling or search for your town. You can also continue without a school.
      </p>
    ) : null;
  }
  return (
    <ChoiceCards
      describedBy={errorId}
      legend="Your school (optional)"
      legendHidden={false}
      name="schoolId"
      required={false}
      options={[...options, { value: "", label: "My school isn't listed, or I'd rather not say" }]}
      defaultValue={picker.selected?.id ?? null}
    />
  );
}

function ExamBoardTrustLogos() {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-card border border-border bg-surface p-3">
      <span className="text-sm font-medium text-muted">Exam-board paths included</span>
      <span className="inline-flex h-20 min-w-64 max-w-full items-center justify-center rounded-md border border-border bg-white px-4 py-2 shadow-xs">
        {/* eslint-disable-next-line @next/next/no-img-element -- fixed public board logo in a small trust chip. */}
        <img src="/images/brands/zimsec-wordmark.png" width={1946} height={546} alt="ZIMSEC" loading="lazy" decoding="async" className="max-h-16 w-auto object-contain" />
      </span>
      <span className="inline-flex h-14 min-w-36 items-center justify-center rounded-md border border-border bg-white px-3 py-2 shadow-xs">
        {/* eslint-disable-next-line @next/next/no-img-element -- fixed public board logo in a small trust chip. */}
        <img src="/images/brands/cambridge.png" width={452} height={128} alt="Cambridge" loading="lazy" decoding="async" className="max-h-8 w-auto object-contain" />
      </span>
    </div>
  );
}

function fieldsFor(view: Exclude<StepView, { step: "finish" }>, errorId: string): ReactNode {
  switch (view.step) {
    case "country":
      return <ChoiceCards describedBy={errorId} legend="Your country" name="countryId" options={toCards(view.countries)} defaultValue={view.selectedId} />;
    case "board":
      return view.boards.length === 0 ? (
        <Alert tone="info" title="No examination boards yet">
          We don&rsquo;t offer an examination board in {view.countryName} yet. Go back and choose another country.
        </Alert>
      ) : (
        <ChoiceCards describedBy={errorId} legend="Examination board" name="examBoardId" options={toCards(view.boards)} defaultValue={view.selectedId} />
      );
    case "level":
      return view.groups.length === 0 ? (
        <Alert tone="info" title="No qualifications yet">
          This board has no qualifications on the platform yet. Go back and choose another board.
        </Alert>
      ) : (
        <div className="space-y-6">
          {view.groups.map((group) => (
            <ChoiceCards
              describedBy={errorId}
              key={group.levelId}
              legend={group.levelName}
              legendHidden={false}
              name="qualificationId"
              options={toCards(group.options)}
              defaultValue={view.selectedId}
            />
          ))}
        </div>
      );
    case "year": {
      if (view.primary.length === 0 && view.others.length === 0) {
        return (
          <>
            {view.school && schoolFields(view.school, errorId)}
            <Alert tone="info" title="No years to choose from yet">
              Years and forms for your country aren&rsquo;t set up on the platform yet. Continue; you won&rsquo;t need to answer this.
            </Alert>
            <input type="hidden" name="yearGroupId" value="" />
          </>
        );
      }
      const savedInOthers = view.others.some((o) => o.id === view.selectedId);
      return (
        <div className="space-y-4">
          {view.school && schoolFields(view.school, errorId)}
          <ChoiceCards describedBy={errorId} legend="Year or form" name="yearGroupId" options={toCards(view.primary)} defaultValue={view.selectedId} />
          {view.others.length > 0 && (
            <details open={savedInOthers} className="rounded-card border border-border bg-surface">
              <summary className="flex min-h-11 cursor-pointer items-center px-4 py-3 text-sm font-medium text-text">My year isn&rsquo;t listed</summary>
              <div className="border-t border-border p-4">
                <ChoiceCards describedBy={errorId} legend="Other years" legendHidden={false} name="yearGroupId" options={toCards(view.others)} defaultValue={view.selectedId} />
              </div>
            </details>
          )}
        </div>
      );
    }
    case "subjects":
      return view.groups.length === 0 ? (
        <Alert tone="info" title="No subjects are open yet">
          Subjects for {view.qualificationName} are still being prepared. Go back and choose another level, or check again soon.
        </Alert>
      ) : (
        <SubjectPicker groups={view.groups} comingSoon={view.comingSoon} defaultSelected={view.selectedIds} max={view.maxSubjects} describedBy={errorId} />
      );
    case "exam": {
      const options: ChoiceCardOption[] = [
        ...view.sessions.map((s) => ({ value: s.id, label: s.name, description: sessionDescription(s) })),
        { value: "", label: "I'm not sure yet", description: "You can set it later from Subjects." },
      ];
      const fallback = view.answered || view.sessions.length === 0 ? "" : undefined;
      return (
        <div className="space-y-4">
          {view.sessions.length === 0 && (
            <Alert tone="info" icon={<CalendarClock aria-hidden="true" />} title="No examination dates yet">
              Examination dates for {view.qualificationName} haven&rsquo;t been published on the platform yet. Choose &ldquo;I&rsquo;m not sure
              yet&rdquo; and set one later.
            </Alert>
          )}
          {view.sessions.some((s) => s.isProvisional) && (
            <p className="text-sm text-muted">Provisional dates haven&rsquo;t been confirmed against the board&rsquo;s official timetable yet.</p>
          )}
          <ChoiceCards describedBy={errorId} legend="Target examination" name="targetExamSessionId" options={options} defaultValue={view.selectedId ?? fallback} />
        </div>
      );
    }
    case "ability": {
      const options = (Object.keys(ABILITY_COPY) as AbilityValue[]).map((value) => ({
        value,
        label: ABILITY_COPY[value].label,
        description: ABILITY_COPY[value].description,
      }));
      return <ChoiceCards describedBy={errorId} legend="Current ability" name="abilityLevel" options={options} defaultValue={view.selected} />;
    }
    case "grade": {
      if (view.grades.length === 0) {
        return (
          <>
            <Alert tone="info" title="Grade targets aren't available yet">
              Grades for {view.qualificationName} aren&rsquo;t set up on the platform yet. Continue, and set a target later from Subjects.
            </Alert>
            <input type="hidden" name="targetGrade" value="" />
          </>
        );
      }
      const options: ChoiceCardOption[] = [
        ...view.grades.map((grade) => ({ value: grade, label: grade })),
        { value: "", label: "No target yet" },
      ];
      return (
        <ChoiceCards
          describedBy={errorId}
          legend="Target grade"
          name="targetGrade"
          layout="chips"
          options={options}
          defaultValue={view.selected ?? ""}
          hint="Grades follow your qualification's grading scale. Results on the platform are always estimates, never official grades."
          legendHidden
        />
      );
    }
    case "goal": {
      const values = view.selected !== null && !view.options.includes(view.selected) ? [...view.options, view.selected].sort((a, b) => a - b) : view.options;
      const options: ChoiceCardOption[] = values.map((minutes) => ({
        value: String(minutes),
        label: dailyGoalLabel(minutes),
        ...(minutes === view.defaultMinutes ? { tag: "Suggested" } : {}),
      }));
      return (
        <div className="space-y-5">
          <ChoiceCards
            describedBy={errorId}
            legend="Daily study goal"
            name="dailyGoalMinutes"
            layout="chips"
            options={options}
            defaultValue={String(view.selected ?? view.defaultMinutes)}
            required={false}
          />
          <Field label="Or enter your own" hint={`Minutes a day, from ${view.min} to ${view.max}. Leave empty to use your choice above.`} optional>
            <Input name="customDailyGoalMinutes" aria-describedby={errorId} type="number" inputMode="numeric" min={view.min} max={view.max} step={1} className="max-w-40" />
          </Field>
        </div>
      );
    }
  }
}

/**
 * One onboarding screen (§5, §52): progress, the question as the page's single h1, its controls and Back / Continue.
 * The last screen shows the answers with "Change" links and the diagnostic offer. Server component; the only client
 * islands are the form wrapper and the subject search.
 */
export function StepScreen({ view, saveAction, finishAction, next = null }: StepScreenProps) {
  const step: WizardStep = view.step;
  const back = previousStep(step);
  const hrefOf = (target: WizardStep) => withOnboardingNext(stepHref(target), next);
  const { title, description } = heading(view);
  const errorId = `onboarding-${step}-error`;
  const joinUrl = absoluteUrl("/register");

  return (
    <div className="space-y-6">
      <OnboardingProgress step={step} />
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-balance text-text sm:text-3xl">{title}</h1>
        {description && <p className="text-base text-muted">{description}</p>}
      </header>
      {view.step === "board" && <ExamBoardTrustLogos />}

      {view.step === "finish" ? (
        <div className="space-y-6">
          <Card as="section" aria-labelledby="summary-heading">
            <CardHeader titleAs="h2" title={<span id="summary-heading">Your answers</span>} />
            <CardBody className="pt-2">
              <OnboardingSummary summary={view.summary} next={next} />
            </CardBody>
          </Card>

          <Card as="section" aria-labelledby="diagnostic-heading" className="border-primary/40">
            <CardBody className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft [&_svg]:size-5">
                  <ClipboardCheck aria-hidden="true" />
                </span>
                <div className="min-w-0 space-y-1.5">
                  <h2 id="diagnostic-heading" className="flex flex-wrap items-center gap-2 text-lg font-semibold text-text">
                    {view.fullAccess ? "Take the diagnostic test" : "Next: unlock full access"}
                    {view.diagnosticIncluded && (
                      <Badge tone="primary" size="sm">
                        Recommended
                      </Badge>
                    )}
                  </h2>
                  {view.diagnosticIncluded ? (
                    <p className="text-sm text-muted">
                      About {DIAGNOSTIC_MINUTES_PER_SUBJECT} minutes per subject. It checks what you already know across your topics, so your study
                      plan starts in the right place. There&rsquo;s no penalty for wrong answers, and you can skip a question you don&rsquo;t know.
                    </p>
                  ) : view.fullAccess ? (
                    <p className="text-sm text-muted">The diagnostic test isn&rsquo;t included in your current plan. You can still start studying straight away.</p>
                  ) : (
                    <p className="text-sm text-muted">
                      Your account is ready. Full access opens every lesson, practice question, test and the diagnostic in your subjects, paid
                      monthly through Paynow.
                    </p>
                  )}
                </div>
              </div>
              <FinishForm
                action={finishAction}
                diagnosticIncluded={view.diagnosticIncluded}
                unlockNext={!view.fullAccess}
                subjectsHref={hrefOf("subjects")}
                next={next}
              />
              <WhatsAppGroupShare
                url={joinUrl}
                message={`I just set up my ${APP_NAME} study account. Join our class/group on ${APP_NAME}: ${joinUrl}`}
                className="w-full sm:w-auto"
              />
            </CardBody>
          </Card>

          {back && (
            <div className="border-t border-border pt-5">
              <ButtonLink href={hrefOf(back)} variant="ghost" iconStart={<ArrowLeft aria-hidden="true" />}>
                Back
              </ButtonLink>
            </div>
          )}
        </div>
      ) : (
        <>
          {view.step === "year" && view.school && <SchoolSearchForm picker={view.school} next={next} />}
          <StepForm step={step} action={saveAction} backHref={back ? hrefOf(back) : null} errorId={errorId} next={next}>
            {fieldsFor(view, errorId)}
          </StepForm>
        </>
      )}
    </div>
  );
}
