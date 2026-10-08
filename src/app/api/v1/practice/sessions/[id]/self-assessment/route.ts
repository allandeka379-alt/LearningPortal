import { operations } from "@/server/api/contract";
import { selfAssessPracticeForApi } from "@/server/api/learning";
import { v1Route } from "@/server/api/route";
import { toJson } from "@/server/api/serialize";

/**
 * POST /api/v1/practice/sessions/{id}/self-assessment — `{ position, pointIds?, marks? }` -> 200 the answer's feedback
 * with the self-assessed mark (open answers waiting for marking while AI marking is unavailable; ARCHITECTURE §6.5).
 */

export const runtime = "nodejs";

export const POST = v1Route(operations.selfAssessPracticeAnswer, async ({ actor, params, body }) => toJson(await selfAssessPracticeForApi(actor, params.id, body)));
