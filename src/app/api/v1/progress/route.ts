import { operations } from "@/server/api/contract";
import { v1Route } from "@/server/api/route";
import { toJson } from "@/server/api/serialize";
import { getProgressOverview } from "@/server/progress/student-overview";

/**
 * GET /api/v1/progress — the student's progress overview (§6, §11, §19): mastery distribution per subject, the last 30
 * days of activity, XP and level, streak and achievements; the same read model as the web /app/progress page.
 */

export const runtime = "nodejs";

export const GET = v1Route(operations.getProgress, async ({ actor }) => toJson(await getProgressOverview(actor)));
