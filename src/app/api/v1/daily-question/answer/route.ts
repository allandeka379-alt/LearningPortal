import { operations } from "@/server/api/contract";
import { answerDailyQuestionForApi } from "@/server/api/learning";
import { v1Route } from "@/server/api/route";
import { toJson } from "@/server/api/serialize";

/**
 * POST /api/v1/daily-question/answer — `{ subjectId, response, timeSpentSeconds?, hintsUsed? }` -> 200
 * `{ data: { attemptId, feedback } }`. Marked immediately; counts for the streak exactly like the web (§19, §30).
 */

export const runtime = "nodejs";

export const POST = v1Route(operations.answerDailyQuestion, async ({ actor, body }) => toJson(await answerDailyQuestionForApi(actor, body)));
