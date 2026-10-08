import "server-only";
import type { Actor } from "@/server/auth/actor";
import { getEntitlements, scopeCoversSubject, type EntitlementResolution } from "@/server/billing/entitlements";
import { listEnrollments } from "@/server/enrollment";
import type { PremiumScope, SearchViewer } from "@/server/search/presentation";

/**
 * Builds the search viewer for a signed-in student from SERVER-resolved data (never client input; §3.9 visibility):
 * whether premium results are readable (plan with full content, or a study pack / scoped grant covering the result's
 * subject or qualification, §24) and the enrolled subjects that get a ranking boost.
 *
 * TODO(shared): belongs in `src/server/search/viewer.ts` so the REST API and WhatsApp channel can reuse it.
 */

/**
 * Pure: "may this viewer read premium content in this scope?" Full content access (`lessonAccess: "ALL"`, the same
 * gate the lesson reader, flashcards and premium tests use) from an unscoped source opens everything; otherwise a
 * scoped grant with full content opens results in its subjects or qualifications.
 */
export function premiumAccessChecker(
  resolution: Pick<EntitlementResolution, "entitlements" | "scoped">,
): (scope: PremiumScope) => boolean {
  if (resolution.entitlements.lessonAccess === "ALL") return () => true;
  const grants = resolution.scoped.filter((grant) => grant.entitlements.lessonAccess === "ALL");
  if (grants.length === 0) return () => false;
  return (scope) =>
    grants.some(
      (grant) =>
        scope.subjectIds.some((subjectId) => scopeCoversSubject(grant.scope, { subjectId, qualificationId: null })) ||
        scope.qualificationIds.some((qualificationId) => grant.scope.qualificationIds.includes(qualificationId)),
    );
}

export interface StudentSearchContext {
  viewer: SearchViewer;
  /** The student's current subjects (ACTIVE / PAUSED enrolments), for chips, filters and empty states. */
  subjects: { id: string; name: string }[];
}

export async function buildStudentSearchContext(actor: Actor): Promise<StudentSearchContext> {
  const [resolution, enrollments] = await Promise.all([getEntitlements(actor.userId), listEnrollments(actor)]);
  const subjects = enrollments.map((enrollment) => ({ id: enrollment.subject.id, name: enrollment.subject.name }));
  return {
    viewer: {
      signedIn: true,
      canViewPremium: premiumAccessChecker(resolution),
      boostSubjectIds: subjects.map((subject) => subject.id),
    },
    subjects,
  };
}
