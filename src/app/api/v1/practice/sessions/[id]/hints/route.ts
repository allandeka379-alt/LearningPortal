import { operations } from "@/server/api/contract";
import { revealPracticeHintForApi } from "@/server/api/learning";
import { v1Route } from "@/server/api/route";

/**
 * POST /api/v1/practice/sessions/{id}/hints — `{ position }` -> 200 the next hint of that unanswered question
 * `{ hintNumber, totalHints, html }` (§10). The hint is stored on the slot and counted with the answer.
 */

export const runtime = "nodejs";

export const POST = v1Route(operations.revealPracticeHint, async ({ actor, params, body }) => revealPracticeHintForApi(actor, params.id, body.position));
