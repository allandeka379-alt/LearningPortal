import { operations } from "@/server/api/contract";
import { startPracticeForApi } from "@/server/api/learning";
import { idempotencyKeyOf, mergeIdempotencyKey, v1Route } from "@/server/api/route";
import { toJson } from "@/server/api/serialize";

/**
 * POST /api/v1/practice/sessions — starts an adaptive practice session in an enrolled subject (§10, §11):
 * `{ subjectId, topicIds?, count?, difficulty?, mode?, origin?, idempotencyKey? }` (or the `Idempotency-Key` header)
 * -> 201 `{ data: { resumed, shortfall, session } }`; 200 when the key's session already existed. Plan allowance,
 * selection and the pinned syllabus are the attempt engine's; questions are answer-safe.
 */

export const runtime = "nodejs";

const PRACTICE_KEY_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;

export const POST = v1Route(operations.startPracticeSession, async ({ actor, body, request }) => {
  const idempotencyKey = mergeIdempotencyKey(body.idempotencyKey, idempotencyKeyOf(request, PRACTICE_KEY_PATTERN), "idempotencyKey");
  const started = await startPracticeForApi(actor, { ...body, ...(idempotencyKey ? { idempotencyKey } : {}) });
  return Response.json({ data: toJson(started) }, { status: started.resumed ? 200 : 201 });
});
