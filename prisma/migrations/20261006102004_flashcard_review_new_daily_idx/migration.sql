-- ===== Raw SQL (Prisma ignores partial indexes; no drift) =====
-- ONE statement per file: CREATE INDEX CONCURRENTLY cannot run inside a transaction, and a single-statement migration
-- is not wrapped in one. FlashcardReview is append-only and grows with every review, so the index is built without
-- blocking writes. IF NOT EXISTS keeps a retried deploy idempotent (drop an INVALID leftover first if a build failed).

-- Purpose: today's new-card count behind the daily new-card cap (flashcards/service.ts countNewStudiedToday:
-- userId = $1 AND previousState = 'NEW' AND reviewedAt in [local day start, next day start)), read on every flashcard
-- queue and deck page. The (userId, flashcardId, reviewedAt) index walks the student's WHOLE review history for it
-- (EXPLAIN on 40k reviews: 794 buffers, 19.8 ms cold); this partial index reads only first reviews (6 buffers,
-- 0.09 ms; about 3% of the table's size, since only first presses on new cards are indexed).
CREATE INDEX CONCURRENTLY IF NOT EXISTS "FlashcardReview_new_daily_idx" ON "FlashcardReview" ("userId", "reviewedAt") WHERE "previousState" = 'NEW';
