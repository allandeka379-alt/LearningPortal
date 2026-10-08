import { operations } from "@/server/api/contract";
import { getPracticeSummaryForApi } from "@/server/api/learning";
import { v1Route } from "@/server/api/route";
import { toJson } from "@/server/api/serialize";

/**
 * GET /api/v1/practice/sessions/{id}/summary — score, per-topic results with the mastery change, XP and every answer
 * for review (§10, §11, §19). `result` is null while the session is still open.
 */

export const runtime = "nodejs";

export const GET = v1Route(operations.getPracticeSummary, async ({ actor, params }) => toJson(await getPracticeSummaryForApi(actor, params.id)));
