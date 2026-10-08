import { operations } from "@/server/api/contract";
import { idempotencyKeyOf, mergeIdempotencyKey, v1Route } from "@/server/api/route";
import { reviewCard } from "@/server/flashcards/service";

/**
 * POST /api/v1/flashcards/{id}/review — `{ rating, durationMs?, clientReviewId?, reviewedAt?, subjectId? }` -> 200 the
 * card's new schedule (§18). `clientReviewId` (or the `Idempotency-Key` header) makes retries and offline replays
 * apply once.
 */

export const runtime = "nodejs";

export const POST = v1Route(operations.reviewFlashcard, async ({ actor, params, body, request }) => {
  const clientReviewId = mergeIdempotencyKey(body.clientReviewId, idempotencyKeyOf(request), "clientReviewId");
  return reviewCard(actor, { ...body, flashcardId: params.id, ...(clientReviewId ? { clientReviewId } : {}) });
});
