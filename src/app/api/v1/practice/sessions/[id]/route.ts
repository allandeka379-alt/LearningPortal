import { operations } from "@/server/api/contract";
import { getPracticeSessionForApi } from "@/server/api/learning";
import { v1Route } from "@/server/api/route";
import { toJson } from "@/server/api/serialize";

/**
 * GET /api/v1/practice/sessions/{id} — every question of the student's practice session (answer-safe), their own
 * answers and the feedback of marked ones. Other students' sessions are 404.
 */

export const runtime = "nodejs";

export const GET = v1Route(operations.getPracticeSession, async ({ actor, params }) => toJson(await getPracticeSessionForApi(actor, params.id)));
