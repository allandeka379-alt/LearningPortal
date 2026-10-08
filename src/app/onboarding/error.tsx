"use client";

import { RouteError } from "@/components/student/RouteError";

/** Error fallback of the onboarding wizard: calm wording, retry, and a way back to the resume point. */
export default function OnboardingError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <RouteError error={error} retry={retry} title="We couldn't load this step" backHref="/onboarding" backLabel="Back to setup" />;
}
