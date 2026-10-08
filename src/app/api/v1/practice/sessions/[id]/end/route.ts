import { operations } from "@/server/api/contract";
import { endPracticeForApi } from "@/server/api/learning";
import { v1Route } from "@/server/api/route";
import { toJson } from "@/server/api/serialize";

/**
 * POST /api/v1/practice/sessions/{id}/end — ends a practice session early (§10): answered questions are scored,
 * unanswered ones left out -> 200 the results. Idempotent (an already closed session returns its results).
 */

export const runtime = "nodejs";

export const POST = v1Route(operations.endPracticeSession, async ({ actor, params }) => toJson(await endPracticeForApi(actor, params.id)));
