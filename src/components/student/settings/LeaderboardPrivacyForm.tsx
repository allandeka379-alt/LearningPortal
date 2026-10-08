"use client";

import { useActionState, useState } from "react";
import { fieldErrorsOf, type FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Switch } from "@/components/ui/Switch";

export type LeaderboardMode = "REAL_NAME" | "FIRST_NAME" | "USERNAME" | "ANONYMOUS";

export interface LeaderboardPrivacyFormProps {
  optIn: boolean;
  display: LeaderboardMode;
  /** How the student's name would appear in each mode; null = the mode is not available for this profile. */
  previews: Readonly<Record<LeaderboardMode, string | null>>;
  action: FormAction;
  /** A student under 18 without a parent's or guardian's consent: the full-name option is unavailable for that reason. */
  realNameNeedsConsent?: boolean;
}

const MODES: readonly { value: LeaderboardMode; label: string; description: string }[] = [
  { value: "ANONYMOUS", label: "Anonymous", description: "Your score counts, but your name is hidden." },
  { value: "USERNAME", label: "Username", description: "Your public username, never your real name." },
  { value: "FIRST_NAME", label: "First name and initial", description: "Your first name and the first letter of your surname." },
  { value: "REAL_NAME", label: "Full name", description: "Your first name and surname." },
];

/**
 * Leaderboard privacy (§20): leaderboards are opt-in (off by default) and the student chooses how their name appears.
 * Each option previews the exact text others would see; options the profile cannot support are disabled with the
 * reason. Turning leaderboards off removes the student from every board straight away.
 */
function unavailableReason(mode: LeaderboardMode, realNameNeedsConsent: boolean): string {
  if (mode === "USERNAME") return "no username yet";
  if (mode === "REAL_NAME" && realNameNeedsConsent) return "needs your parent or guardian's consent";
  return "no first name on your account";
}

export function LeaderboardPrivacyForm({ optIn, display, previews, action, realNameNeedsConsent = false }: LeaderboardPrivacyFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const [enabled, setEnabled] = useState(optIn);

  return (
    <form action={formAction} className="space-y-5">
      <Switch
        name="optIn"
        defaultChecked={optIn}
        onCheckedChange={setEnabled}
        label="Show me on leaderboards"
        description="Weekly questions, mock exam scores, streaks and subject mastery. Off by default."
      />
      <RadioGroup
        legend="How your name appears"
        hint={enabled ? undefined : "Used only if you turn leaderboards on."}
        name="display"
        defaultValue={display}
        appearance="card"
        error={fieldErrorsOf(state, "display")}
        options={MODES.map((mode) => {
          const preview = previews[mode.value];
          return {
            value: mode.value,
            label: mode.label,
            disabled: preview === null,
            description: preview === null ? `${mode.description} Not available: ${unavailableReason(mode.value, realNameNeedsConsent)}.` : (
              <>
                {mode.description}
                <span className="mt-1 block font-medium text-text">Shown as: {preview}</span>
              </>
            ),
          };
        })}
      />
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" loading={pending} loadingText="Saving…">
          Save privacy settings
        </Button>
        <FormFeedback state={state} />
      </div>
    </form>
  );
}
