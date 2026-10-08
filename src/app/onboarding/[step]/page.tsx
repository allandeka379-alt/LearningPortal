import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { StepScreen } from "@/components/onboarding/StepScreen";
import { Container } from "@/components/layout/Container";
import { loadOnboardingStep } from "@/server/onboarding/service";
import { DASHBOARD_PATH, isWizardStep, onboardingNext, STEP_LABELS, stepHref, withOnboardingNext } from "@/server/onboarding/steps";
import { requireOnboardingStudent } from "../_lib/guard";
import { finishOnboardingAction, saveOnboardingStepAction } from "../actions";

type Params = Promise<{ step: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { step } = await params;
  return { title: isWizardStep(step) ? `Set up: ${STEP_LABELS[step]}` : "Set up your account" };
}

/**
 * One onboarding screen (§5 country → board → level → year → subjects → target exam → ability → target grade → daily
 * goal → diagnostic offer). Screens ahead of the furthest one reached redirect back to it; once onboarding is complete
 * the student goes to the dashboard.
 */
export default async function OnboardingStepPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { step } = await params;
  if (!isWizardStep(step)) notFound();
  const raw = (await searchParams).next;
  // Where the student continues once the wizard is done (validated; carried through every screen).
  const next = onboardingNext(Array.isArray(raw) ? raw[0] : raw);
  const actor = await requireOnboardingStudent(withOnboardingNext(stepHref(step), next));
  const schoolParam = (await searchParams).school;
  const loaded = await loadOnboardingStep(actor, step, undefined, { schoolQuery: Array.isArray(schoolParam) ? schoolParam[0] : schoolParam });
  if (loaded.kind === "REDIRECT") redirect(loaded.href === DASHBOARD_PATH ? (next ?? DASHBOARD_PATH) : withOnboardingNext(loaded.href, next));

  return (
    <Container size="reading">
      <StepScreen view={loaded.view} saveAction={saveOnboardingStepAction} finishAction={finishOnboardingAction} next={next} />
    </Container>
  );
}
