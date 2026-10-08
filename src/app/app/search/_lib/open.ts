import "server-only";
import { isSafeInternalPath, type OpenableType } from "@/components/search/links";
import type { Actor } from "@/server/auth/actor";
import { getPublishedSyllabus, getSyllabusForEnrollment, getTopicById, getTopicBySlug } from "@/server/curriculum";
import { isAppError } from "@/server/lib/errors";
import { resolveLessonAccess } from "@/server/lessons";

/**
 * Resolves where a search result opens for a signed-in student (`/app/search/open`). The index stores PUBLIC paths
 * for subjects, topics and guide lessons; inside the app a student should see them in THEIR pinned syllabus version
 * (§26) with progress and locks:
 *
 * - SUBJECT: enrolled (not dropped) → the subject dashboard; otherwise the indexed public page, or "add subjects".
 * - TOPIC:   indexed topics belong to the CURRENT version; a student pinned to another version gets the same topic
 *            there (topic slugs are stable across versions), else their subject page; not enrolled → fallback.
 * - LESSON:  the in-app reader when the lesson is in the student's syllabus (or assigned); else the public guide.
 *
 * Read-only (GET-safe). Every lookup goes through curriculum / lesson services that only see published versions.
 */

export const ADD_SUBJECTS_PATH = "/app/subjects/manage";

/** Not enrolled: public pages are useful on their own; app paths would 404, so offer to add the subject instead. */
function notEnrolledTarget(fallback: string | null): string {
  return fallback !== null && !fallback.startsWith("/app/") ? fallback : ADD_SUBJECTS_PATH;
}

async function enrolledSyllabus(userId: string, subjectId: string) {
  const pinned = await getSyllabusForEnrollment(userId, subjectId);
  return pinned && pinned.enrollment.status !== "DROPPED" ? pinned : null;
}

export async function resolveOpenTarget(
  actor: Actor,
  input: { type: OpenableType; id: string; fallback: string | null },
): Promise<string> {
  const fallback = isSafeInternalPath(input.fallback) ? input.fallback : null;
  switch (input.type) {
    case "SUBJECT": {
      const pinned = await enrolledSyllabus(actor.userId, input.id);
      return pinned ? `/app/subjects/${input.id}` : notEnrolledTarget(fallback);
    }
    case "TOPIC": {
      const detail = await getTopicById(input.id);
      if (!detail) return notEnrolledTarget(fallback);
      const syllabus = await getPublishedSyllabus(detail.topic.syllabusId);
      if (!syllabus) return notEnrolledTarget(fallback);
      const subjectId = syllabus.subjectId;
      const pinned = await enrolledSyllabus(actor.userId, subjectId);
      if (!pinned) return notEnrolledTarget(fallback);
      if (pinned.syllabus.id === detail.topic.syllabusId) return `/app/subjects/${subjectId}/topics/${detail.topic.id}`;
      const same = await getTopicBySlug(pinned.syllabus.id, detail.topic.slug);
      return same ? `/app/subjects/${subjectId}/topics/${same.topic.id}` : `/app/subjects/${subjectId}`;
    }
    case "LESSON": {
      try {
        await resolveLessonAccess(actor, input.id);
        return `/app/lessons/${input.id}`;
      } catch (error) {
        if (isAppError(error) && (error.code === "NOT_FOUND" || error.code === "FORBIDDEN")) return fallback ?? "/app/subjects";
        throw error;
      }
    }
  }
}
