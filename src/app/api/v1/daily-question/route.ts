import { operations } from "@/server/api/contract";
import { getDailyQuestionForApi } from "@/server/api/learning";
import { v1Route } from "@/server/api/route";
import { toJson } from "@/server/api/serialize";

/**
 * GET /api/v1/daily-question?subjectId= — today's daily question per enrolled subject (§46) and, in `current`, the
 * selected subject's question once opened. Read-only: POST /daily-question/start opens it, /answer answers it.
 */

export const runtime = "nodejs";

export const GET = v1Route(operations.getDailyQuestion, async ({ actor, query }) => toJson(await getDailyQuestionForApi(actor, query.subjectId ?? null)));
