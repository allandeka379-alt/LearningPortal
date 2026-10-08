import { operations } from "@/server/api/contract";
import { getStudyPlanTodayForApi } from "@/server/api/learning";
import { v1Route } from "@/server/api/route";
import { toJson } from "@/server/api/serialize";

/**
 * GET /api/v1/study-plan/today — today's study-plan items and the plan's summary (§16), the same read model the web
 * /app/plan page uses. Without an active plan: 200 with `plan: null`, `todayPlan: null`.
 */

export const runtime = "nodejs";

export const GET = v1Route(operations.getStudyPlanToday, async ({ actor }) => toJson(await getStudyPlanTodayForApi(actor)));
