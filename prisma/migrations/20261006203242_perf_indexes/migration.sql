-- Performance pass at launch scale (§38; measured on the synthetic dataset of scripts/perf: 24k users, 9.7k payments,
-- EXPLAIN (ANALYZE, BUFFERS) before/after in scripts/perf/README.md "Findings").
--
-- Plain CREATE INDEX IF NOT EXISTS: this migration runs before launch, while both tables are empty or small, so the
-- brief lock of a non-concurrent build is harmless. Any index added AFTER launch to a populated table must instead use
-- CREATE INDEX CONCURRENTLY in its own single-statement migration (see 20261006102004_flashcard_review_new_daily_idx).
-- Both indexes are declared in schema.prisma (@@index([createdAt, id])), so Prisma sees no drift.

-- Purpose: admin Payments list (cms/commerce/payments.ts listPayments) orders by ("createdAt" DESC, "id" DESC) with
-- optional provider / purpose / currency / date filters and a keyset cursor. Without this index every page (and every
-- unfiltered first page) sequentially scanned and sorted the whole payment history (6-year retention); with it the
-- page is a backward index walk that stops after limit + 1 rows (9.7k payments: 8.5 ms -> 0.05 ms; provider + 30-day
-- window: 2.3 ms -> 0.07 ms).
CREATE INDEX IF NOT EXISTS "Payment_createdAt_id_idx" ON "Payment"("createdAt", "id");

-- Purpose: admin Users list (cms/users/service.ts listUsers / listStudents / listTeachers) orders by
-- ("createdAt" DESC, "id" DESC) under "status <> 'DELETED'", which the (status, createdAt) index cannot serve. Every
-- page sorted all users after a parallel sequential scan (24k users: 52 ms first page, 24 ms cursor page, 242 ms for a
-- name search); with it the first page and cursor pages read one page of index entries (0.08 ms) and a common-name
-- search stops after the first page of matches (6.5 ms).
CREATE INDEX IF NOT EXISTS "User_createdAt_id_idx" ON "User"("createdAt", "id");
