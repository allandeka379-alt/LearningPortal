import { operations } from "@/server/api/contract";
import { answerPracticeForApi } from "@/server/api/learning";
import { v1Route } from "@/server/api/route";
import { toJson } from "@/server/api/serialize";

/**
 * POST /api/v1/practice/sessions/{id}/answers — `{ position, response, timeSpentSeconds?, hintsUsed? }` -> 200 marking
 * result with the correct answer, explanation and a lesson to study (§10). Idempotent per position (a replay returns
 * the stored result); the session closes after its last question.
 */

export const runtime = "nodejs";

export const POST = v1Route(operations.answerPracticeQuestion, async ({ actor, params, body }) => toJson(await answerPracticeForApi(actor, params.id, body)));
