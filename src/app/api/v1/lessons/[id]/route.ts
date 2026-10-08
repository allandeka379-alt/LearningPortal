import { operations } from "@/server/api/contract";
import { getLessonForApi } from "@/server/api/learning";
import { v1Route } from "@/server/api/route";
import { toJson } from "@/server/api/serialize";

/**
 * GET /api/v1/lessons/{id}?topicId= — a lesson of the student's pinned syllabus versions, rendered server-side (HTML
 * with KaTeX) plus plain text. Entitlement-checked by the lesson service: a lesson outside the plan answers 200 with
 * `locked: true` and no content.
 */

export const runtime = "nodejs";

export const GET = v1Route(operations.getLesson, async ({ actor, params, query }) => toJson(await getLessonForApi(actor, params.id, query.topicId ?? null)));
