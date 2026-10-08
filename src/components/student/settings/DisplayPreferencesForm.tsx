"use client";

import { useState, useTransition } from "react";
import type { FormActionState } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { FontScaleSwitcher, ThemeSwitcher } from "@/components/layout/PreferenceSwitchers";

export interface DisplayPreferencesFormProps {
  /** Saves a cookie-form value ("dark", "lg") to the student's profile. */
  save: (input: { theme?: string; fontScale?: string }) => Promise<FormActionState>;
}

/**
 * Theme and text size (§43, dark mode via tokens). The switchers apply instantly on this device (cookies read by the
 * root layout, no flash on the next page load); each change is also saved to the profile in the background so the
 * choice follows the account. The outcome is announced politely.
 */
export function DisplayPreferencesForm({ save }: DisplayPreferencesFormProps) {
  const [state, setState] = useState<FormActionState>(null);
  const [pending, startTransition] = useTransition();

  const persist = (input: { theme?: string; fontScale?: string }) => {
    startTransition(async () => {
      setState(await save(input));
    });
  };

  return (
    <div className="space-y-5">
      <ThemeSwitcher onChange={(theme) => persist({ theme })} />
      <FontScaleSwitcher onChange={(fontScale) => persist({ fontScale })} />
      <FormFeedback state={pending ? null : state} />
    </div>
  );
}
