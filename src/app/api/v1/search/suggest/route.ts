import { z } from "zod";
import { searchRateLimit } from "@/app/app/search/_lib/rate-limit";
import { apiRoute } from "@/server/lib/api";
import { MAX_SUGGESTIONS, suggest } from "@/server/search/suggest";

/**
 * GET /api/v1/search/suggest?q=quadr[&subjectId=…][&limit=8] — autocomplete titles for the search field (§28).
 *
 * Titles only (premium items are safe to suggest: their titles never contain their content, documents.ts), so the
 * answer does not depend on the caller's plan. Signed-in callers (cookie or bearer token) are rate-limited per
 * account, anonymous callers per IP (`publicSearch`, ARCHITECTURE §5.5). Response: `{ data: Suggestion[] }`.
 */

export const runtime = "nodejs";

const querySchema = z.object({
  q: z.string().max(200).default(""),
  subjectId: z.uuid().optional(),
  limit: z.coerce.number().int().min(1).max(MAX_SUGGESTIONS).optional(),
});

export const GET = apiRoute(
  {
    auth: "optional",
    operation: "search.suggest",
    input: { query: querySchema },
    rateLimit: ({ actor, ip }) => searchRateLimit(actor?.userId ?? null, ip),
  },
  async ({ query }) =>
    suggest(query.q, {
      ...(query.subjectId ? { subjectId: query.subjectId } : {}),
      ...(query.limit ? { limit: query.limit } : {}),
    }),
);
