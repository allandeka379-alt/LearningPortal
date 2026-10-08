import { describe, expect, it } from "vitest";
import { db } from "@/server/db";

/**
 * Raw-SQL indexes Prisma cannot express (partial indexes added by migrations with CREATE INDEX CONCURRENTLY). A failed
 * concurrent build leaves an INVALID index that the planner ignores, so presence alone is not enough: they must be valid
 * and keep the predicate the queries rely on.
 */
describe("raw-SQL partial indexes", () => {
  it("exist, are valid and keep their predicates", async () => {
    const rows = await db.$queryRaw<{ name: string; valid: boolean; definition: string }[]>`
      SELECT c.relname AS name, i.indisvalid AS valid, pg_get_indexdef(i.indexrelid) AS definition
        FROM pg_index i JOIN pg_class c ON c.oid = i.indexrelid
       WHERE c.relname IN ('FlashcardReview_new_daily_idx', 'Profile_leaderboard_optin_idx')
       ORDER BY c.relname`;
    expect(rows.map((row) => [row.name, row.valid])).toEqual([
      ["FlashcardReview_new_daily_idx", true],
      ["Profile_leaderboard_optin_idx", true],
    ]);
    expect(rows[0]?.definition).toMatch(/\("userId", "reviewedAt"\) WHERE \("previousState" = 'NEW'::"FlashcardSrsState"\)/);
    expect(rows[1]?.definition).toMatch(/\("userId"\) WHERE "leaderboardOptIn"/);
  });
});
