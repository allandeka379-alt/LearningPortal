-- ===== Raw SQL (Prisma ignores partial indexes; no drift) =====
-- ONE statement per file: CREATE INDEX CONCURRENTLY cannot run inside a transaction, and a single-statement migration
-- is not wrapped in one. Profile has a row per user, so the index is built without blocking writes. IF NOT EXISTS keeps
-- a retried deploy idempotent (drop an INVALID leftover first if a build failed).

-- Purpose: the hourly leaderboard snapshot walks opted-in students in userId order (leaderboards/snapshot.ts:
-- WHERE leaderboardOptIn AND userId > $cursor ORDER BY userId LIMIT 500). Through the primary key it reads every
-- profile, opted in or not, every hour (EXPLAIN, 200k profiles at 8% opt-in: 6.5k buffers / 68 ms per batch of 500);
-- this index holds only opted-in students (500 buffers / 3.7 ms per batch). Only changes to leaderboardOptIn itself
-- touch it, so other Profile updates stay HOT.
CREATE INDEX CONCURRENTLY IF NOT EXISTS "Profile_leaderboard_optin_idx" ON "Profile" ("userId") WHERE "leaderboardOptIn";
