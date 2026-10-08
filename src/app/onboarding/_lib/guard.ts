import "server-only";
import { redirect } from "next/navigation";
import type { Actor } from "@/server/auth/actor";
import { requireUser } from "@/server/auth/guards";
import { ONBOARDING_BASE_PATH, onboardingEntryRedirect } from "@/server/onboarding/steps";

/**
 * Page guard of the onboarding wizard: a signed-in STUDENT who has not finished onboarding. Signed-out visitors go to
 * `/login?next=…`; other roles to their own area; students who have finished to `/app` (rules in
 * `onboardingEntryRedirect`, unit tested).
 */
export async function requireOnboardingStudent(next: string = ONBOARDING_BASE_PATH): Promise<Actor> {
  const actor = await requireUser({ next });
  const elsewhere = onboardingEntryRedirect(actor);
  if (elsewhere) redirect(elsewhere);
  return actor;
}
