import { ProgressBar } from "@/components/ui/ProgressBar";
import { STEP_LABELS, stepProgress, type WizardStep } from "@/server/onboarding/steps";

/**
 * Wizard progress (§5 "beautiful onboarding"): the current step's name with "Step 3 of 10" as its value, on a calm
 * thin bar. Server component; the bar is a labelled `progressbar`, so the position is announced, not only drawn.
 */
export function OnboardingProgress({ step }: { step: WizardStep }) {
  const { current, total } = stepProgress(step);
  return <ProgressBar value={current} max={total} label={STEP_LABELS[step]} valueText={`Step ${current} of ${total}`} size="sm" />;
}
