import { operations } from "@/server/api/contract";
import { startDailyQuestionForApi } from "@/server/api/learning";
import { v1Route } from "@/server/api/route";
import { toJson } from "@/server/api/serialize";

/**
 * POST /api/v1/daily-question/start — `{ subjectId }` opens today's question for the subject (one attempt per day and
 * subject) -> 201, or 200 with the existing one. Entitlement `daily_question` is checked by the attempt engine.
 */

export const runtime = "nodejs";

export const POST = v1Route(operations.startDailyQuestion, async ({ actor, body }) => {
  const { resumed, current } = await startDailyQuestionForApi(actor, body.subjectId);
  return Response.json({ data: toJson(current) }, { status: resumed ? 200 : 201 });
});
