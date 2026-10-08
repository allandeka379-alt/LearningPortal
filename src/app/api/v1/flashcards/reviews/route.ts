import { operations } from "@/server/api/contract";
import { v1Route } from "@/server/api/route";
import { syncReviews } from "@/server/flashcards/service";

/**
 * POST /api/v1/flashcards/reviews — `{ reviews: [{ flashcardId, rating, clientReviewId?, reviewedAt?, durationMs? }] }`
 * -> 200 one result per review in press order (§18, ARCHITECTURE §3.13 offline sync). Each review is applied on its
 * own, idempotent per `clientReviewId`; a failing item is reported in its slot and never blocks the rest.
 */

export const runtime = "nodejs";

export const POST = v1Route(operations.syncFlashcardReviews, async ({ actor, body }) => syncReviews(actor, body.reviews));
