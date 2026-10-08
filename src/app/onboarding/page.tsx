import { redirect } from "next/navigation";
import { getOnboardingState } from "@/server/onboarding/service";
import { DASHBOARD_PATH, onboardingNext, stepHref, withOnboardingNext } from "@/server/onboarding/steps";
import { requireOnboardingStudent } from "./_lib/guard";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * `/onboarding` resumes the wizard at the furthest screen the student has reached (the position is stored on the
 * Student row, so a dropped connection or another device loses nothing, ARCHITECTURE §3.3). A validated `?next=` (where
 * the student was going, e.g. an invitation) is carried through the screens and opened at the end.
 */
export default async function OnboardingIndexPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = (await searchParams).next;
  const next = onboardingNext(Array.isArray(raw) ? raw[0] : raw);
  const actor = await requireOnboardingStudent();
  const state = await getOnboardingState(actor);
  redirect(state.furthest === "done" ? (next ?? DASHBOARD_PATH) : withOnboardingNext(stepHref(state.furthest), next));
}
