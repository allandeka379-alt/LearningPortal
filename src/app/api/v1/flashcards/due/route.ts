import { operations } from "@/server/api/contract";
import { v1Route } from "@/server/api/route";
import { getDueQueue } from "@/server/flashcards/service";

/**
 * GET /api/v1/flashcards/due?subjectId=&topicId=&limit= — the review queue (§18): due cards first, then today's new
 * cards, faces rendered server-side. A study session rather than an archive: `nextCursor` is always null (review, then
 * ask again); counts and the plan flag are in `meta`.
 */

export const runtime = "nodejs";

export const GET = v1Route(operations.listDueFlashcards, async ({ actor, query }) => {
  const { cards, ...meta } = await getDueQueue(actor, {
    ...(query.subjectId ? { subjectId: query.subjectId } : {}),
    ...(query.topicId ? { topicId: query.topicId } : {}),
    ...(query.limit ? { limit: query.limit } : {}),
  });
  return Response.json({ data: cards, nextCursor: null, meta });
});
