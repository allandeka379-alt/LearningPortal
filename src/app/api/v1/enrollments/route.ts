import { operations } from "@/server/api/contract";
import { pageParams, paginateList } from "@/server/api/pagination";
import { v1Route } from "@/server/api/route";
import { toJson } from "@/server/api/serialize";
import { enrolInSubjects, listEnrollments } from "@/server/enrollment";
import { paginated } from "@/server/lib/api";

/**
 * GET  /api/v1/enrollments?includeDropped=&cursor=&limit=  the student's subjects with their pinned syllabus versions.
 * POST /api/v1/enrollments  `{ subjectIds, targetExamSessionId?, targetGrade?, abilityLevel? }` -> 201 enrolments
 *                           (idempotent; pins each subject's current version, §26).
 */

export const runtime = "nodejs";

export const GET = v1Route(operations.listEnrollments, async ({ actor, query }) => {
  const enrollments = await listEnrollments(actor, { includeDropped: query.includeDropped === "true" });
  const page = paginateList(enrollments, (item) => item.id, pageParams(query));
  return paginated(toJson(page.items), page.nextCursor);
});

export const POST = v1Route(operations.createEnrollments, async ({ actor, body }) =>
  Response.json({ data: toJson(await enrolInSubjects(actor, body)) }, { status: 201 }),
);
