# Performance dataset and harness (§38)

Synthetic, repeatable data at launch scale plus a harness that runs the hot read/write paths with realistic actors and
captures every statement's `EXPLAIN (ANALYZE, BUFFERS)` plan through `auto_explain`. Used to find missing indexes and
slow queries before launch (docs/ARCHITECTURE.md §9.2, §9.12). Results of the first pass: see "Findings" below.

Nothing here touches the dev (`zimstudy`) or test (`zimstudy_test`) databases: the seed script, the harness and the
replay tool refuse any database whose name does not end in `_perf`.

## Files

| File | Purpose |
|---|---|
| `seed-perf.sql` | Set-based SQL (generate_series + joins) that fills a fresh `*_perf` database. All CHECK constraints and triggers stay enabled; rows of tables with `isDemo` are demo-flagged. Deterministic shape (hash-based pseudo-random values), time-anchored at `now()`. |
| `harness.ts` | Calls the services behind each hot path (student/subject dashboards, practice start / answer / end, exam room, history, leaderboards, teacher / school / parent views, admin lists, search, nightly analytics, job claim, rollups) three times each and writes a per-statement report (SQL, parameters, duration, rows, scans, flags, plan) from the auto_explain log. |
| `replay.mjs` | Replays the statements of a harness report serially with `EXPLAIN (ANALYZE, BUFFERS)` in rolled-back transactions and reports median times. `--baseline SQL` runs an A/B per statement (e.g. `DROP INDEX ...` inside the transaction = the old schema), alternating so machine noise hits both variants alike. |

## Dataset (defaults)

| Area | Rows |
|---|---|
| Curriculum | 2 qualifications (ZIMSEC O-Level, Cambridge IGCSE) x 6 subjects, 12 CURRENT syllabi with 2 papers, 720 topics (10 TOPIC x 5 SUBTOPIC each) |
| Content | 2,000 PUBLISHED platform questions (+300 DRAFT, 100 IN_REVIEW) with options, topic tags and revision snapshots; 600 flashcards; 12 mock exams (25 items) |
| People | 50 schools, 50 school admins, 300 teachers, 300 classes (~160 students each), 20,000 students (16,000 in schools), 4,000 parents (6,000 links), 4 staff |
| Learning | ~100k enrolments; ~102k AssessmentAttempts (practice, mocks, some open / abandoned); ~1.08M QuestionAttempts over 90 days, evening-weighted; 821k TopicMastery, 100k SubjectProgress, ~97k DailyActivity, ~100k XpEvent, 20k LearnerStats, QuestionStats |
| Other | 200k FlashcardState, ~250k LeaderboardEntry (13 weekly periods + LIVE + monthly), ~28k AiUsageDaily, ~2.9k subscriptions + ~9.7k payments, 16k seat grants, 3.3k search documents, ~121k jobs (7 days of history + backlog) |

About 1.3 GB on disk after the helper tables are dropped; 6.5 minutes on a 4-core laptop.

## Procedure (local cluster, PowerShell)

```powershell
$pg = "C:\Program Files\PostgreSQL\18\bin"
& "$pg\createdb.exe" -U postgres -h localhost -p 5433 zimstudy_perf
$env:MIGRATION_DATABASE_URL = "postgresql://postgres@localhost:5433/zimstudy_perf"; npx prisma migrate deploy
& "$pg\psql.exe" -U postgres -h localhost -p 5433 -d zimstudy_perf -f scripts/sql/app-role-grants.sql
$env:DATABASE_URL = "postgresql://app_rw@localhost:5433/zimstudy_perf"; npm run db:seed      # ALWAYS data (catalogue)
& "$pg\psql.exe" -U postgres -h localhost -p 5433 -d zimstudy_perf -f scripts/perf/seed-perf.sql
Remove-Item Env:MIGRATION_DATABASE_URL, Env:DATABASE_URL
```

Tip: `CREATE DATABASE zimstudy_perf_seeded TEMPLATE zimstudy_perf` right after seeding keeps a pristine copy; recreate
`zimstudy_perf` from it before each comparison run (the harness mutates data).

Enable plan capture for the perf database only (new sessions pick it up; template copies do not inherit it):

```sql
ALTER DATABASE zimstudy_perf SET session_preload_libraries = 'auto_explain';
ALTER DATABASE zimstudy_perf SET auto_explain.log_min_duration = 0;
ALTER DATABASE zimstudy_perf SET auto_explain.log_analyze = on;
ALTER DATABASE zimstudy_perf SET auto_explain.log_buffers = on;
ALTER DATABASE zimstudy_perf SET auto_explain.log_triggers = on;
ALTER DATABASE zimstudy_perf SET auto_explain.log_format = 'json';
```

Run the harness (writes `<tmp>/dzidza-perf/<label>.json` and prints one line per scenario plus flagged statements:
`SEQ_SCAN_LARGE` = sequential scan of a table with >= 10k rows, `SORT_SPILL`, `TEMP_IO`, `SLOW>50ms`), then replay:

```powershell
npx tsx --conditions=react-server scripts/perf/harness.ts --label before --runs 3
node scripts/perf/replay.mjs $env:TEMP\dzidza-perf\before.json $env:TEMP\dzidza-perf\replay.json --repeat 5 `
  --setup "SET LOCAL max_parallel_workers_per_gather = 0"
# A/B of an index: baseline = the same transaction without it
node scripts/perf/replay.mjs $env:TEMP\dzidza-perf\before.json $env:TEMP\dzidza-perf\ab.json --only admin --repeat 7 `
  --baseline 'DROP INDEX "User_createdAt_id_idx"'
```

Analytics exclude demo users and schools (an empty set in production), so the harness and the replay clear
`User.isDemo` / `School.isDemo` while they run and restore them afterwards.

Clean up when done (each perf database is 1.3-2 GB):

```powershell
& "$pg\dropdb.exe" -U postgres -h localhost -p 5433 zimstudy_perf
```

## Findings (first pass, 2026-10-06)

Method: one harness run before the changes on a freshly seeded database, the same harness after; then every slow or
flagged statement was replayed serially (median of 7, parallel workers off, warm cache) as an A/B on the same data:
old vs new schema (`DROP INDEX` inside the rolled-back transaction) or old vs new SQL. Absolute numbers come from a
shared, busy Windows laptop (other builds and test runs were active during the A/B runs, so the old-plan numbers below
are higher than in the quiet first harness run); the ratios and the plan changes are the result.

### Fixed

| Path (service) | Statement | Rows | Before ms | After ms | Plan change |
|---|---|---|---|---|---|
| Admin users (`listUsers`) | first page, newest first | 26 | 54.1 | 0.17 | Seq Scan User + top-N sort (2,281 buffers) -> Index Scan Backward `User_createdAt_id_idx` (29 buffers) |
| Admin users | cursor page (`createdAt < X OR ...`) | 26 | 40.5 | 0.12 | Seq Scan + sort -> backward index walk |
| Admin users | name search "moyo" | 26 | 129.7 | 9.6 | 1 Seq Scan User + 4 Seq Scans Profile (hash joins) -> index walk + Profile PK probes, stops at one page |
| Admin users | role filter TEACHER | 26 | 2.4 | 0.06 | GIN bitmap + sort -> `User_teacher_createdAt_idx` (also prevents the 18-36 ms backward walk the planner picked in some runs once `User_createdAt_id_idx` existed) |
| Admin payments (`listPayments`) | first page | 26 | 8.6 | 0.06 | Seq Scan Payment + sort -> Index Scan Backward `Payment_createdAt_id_idx` |
| Admin payments | provider + 30-day window | 26 | 2.3 | 0.07 | bitmap + sort -> backward index walk |
| Admin payments | cursor page | 26 | 9.0 | 0.07 | Seq Scan + sort -> backward index walk |
| School dashboard (`getSchoolAnalytics`) | readiness by subject | 6 | 76.1 | 7.4 | Seq Scan SubjectProgress (100k) -> bitmap on its PK (roster predicate repeated on the joined table) |
| School dashboard | target grades on track | 6 | 79.5 | 11.7 | Seq Scan SubjectProgress -> bitmap on its PK |
| School dashboard | weakest topics | 10 | 210.1 | 22.5 | Seq Scan SubjectEnrollment (100k, hashed) + names joined per row -> enrolment check as EXISTS with the roster (bitmap), aggregate first, name 10 rows |
| School dashboard | class outcomes | 4 | 37.1 | 11.9 | Seq Scan ClassMember (48k) -> bitmap on (classId, userId); attempts via `(userId, submittedAt)` |
| Leaderboard snapshot (hourly) | mastery facts per 500-student batch | 1,177 | 115.1 | 7.2 | Prisma relation filter = hash join over every enrolment -> two per-user bitmap reads (SubjectProgress PK, SubjectEnrollment unique) |
| Leaderboard snapshot | stale-row delete per batch | 0 | 36.4 | 26.5 | reads only the computed periods through `(userId, periodKey)` (4,197 -> 972 buffers) |
| Search (`search`) | "algebra" page / facets | 21 / 3 | 88.4 / 93.0 | 2.7 / 0.5 | Seq Scan SearchDocument evaluating word_similarity on every row -> BitmapOr over the tsvector and trigram GIN indexes |
| Search | "electricity" page / facets | 21 / 3 | 111.5 / 97.4 | 10.0 / 4.5 | same |
| Search | "rates of reaction practice" page / facets | 21 / 3 | 191.7 / 172.7 | 46.7 / 28.8 | same (residual cost: trigram recheck of a multi-word query) |

Changes: migrations `20261006203242_perf_indexes` (`User(createdAt, id)`, `Payment(createdAt, id)`, both also
`@@index` in schema.prisma) and `20261006210428_perf_teacher_list_idx` (partial `User(createdAt, id) WHERE roles @>
'{TEACHER}'`); query rewrites in `src/server/analytics/school.ts`, `src/server/leaderboards/snapshot.ts`
(also a typed metric comparison in both DELETEs) and a transaction-local `enable_seqscan = off` for text searches in
`src/server/search/query.ts` (the planner costs pg_trgm's `<%` at one operator per row; at 33k documents the old plan
took 835 ms for a multi-word query).

In-situ (harness, DB time of the third run of each scenario, same machine): school dashboard 747 -> 238 ms, admin
users 502 -> 20 ms, admin payments 21 -> 3 ms, search 462 -> 79 ms, leaderboard snapshot 2,139 -> 1,686 ms (hourly job,
12 batches + sweep).

### Measured and left as is

- Student hot paths are already index-only and small: student dashboard 17 statements / ~1.2 ms DB, subject
  dashboard 0.7 ms, topic progress 0.5 ms, practice builder 1-5 ms, practice start incl. candidatePool 27 ms (worst:
  the 10-slot QuestionAttempt insert), `answerAndMark` 61 statements / ~5.4 ms DB (occasional 10-20 ms single
  statements under machine load), practice end 58 statements / ~9 ms, exam room 1.3-2 ms, exam history 0.4 ms, parent
  views ~1.5 ms, job claim 0.4-0.8 ms, progress rollup 1.3 ms. Their wall time (15-150 ms) is application-side
  (Prisma, rendering), not the database.
- Leaderboard page: the board `count` / `max(computedAt)` join every entry to Profile and User (5-16 ms for a 1-6k-row
  board). Grows with opted-in students; candidates: cache total / updatedAt with the snapshot, or rely on the hourly
  sweep and drop the per-row user join.
- Teacher class view: 8-20 ms worst statement (DailyActivity "last active" and topic aggregation for 160 students); all
  indexed.
- Nightly analytics (`computeDailyMetrics`): ~250-400 ms DB in total; single statements up to ~60-130 ms (DailyMetric
  insert of ~1.9k rows, DAU/WAU/MAU over 30 days of DailyActivity, one day of QuestionAttempt via BRIN). Runs once a
  night; projected ~1 s at 100k students. Not worth extra write-path indexes.
- Leaderboard snapshot upserts: 28-55 ms per 2k-row chunk even when nothing changed, because `ON CONFLICT DO UPDATE ...
  WHERE value IS DISTINCT FROM` still locks (dirties) every conflicting row. Optional: filter unchanged rows before the
  upsert. The opted-out sweep (105-250 ms/hour) keeps a sequential scan at this size (the current boards are 13% of the
  table); its typed predicate lets the board index take over as periods accumulate.
- Remaining `SEQ_SCAN_LARGE` flags after the changes are size-dependent planner choices with the local cluster's
  `random_page_cost = 4`: e.g. the hourly snapshot's opted-in cursor hash-joins User (11-35 ms per batch), school
  engagement uses the date index (8-30 ms), the grade-scheme lookup for pass rates touches 9.6k band rows (19-60 ms).
  With `random_page_cost = 1.1` (SSD) the school dashboard's enrolment / progress / topic queries switched to per-user
  index probes even before the rewrites (checked by replay); the others were not re-checked. Recommendation for production: set
  `random_page_cost = 1.1` and a realistic `effective_cache_size` on the managed instance, and enable
  `pg_stat_statements` + `auto_explain.log_min_duration = 200ms` (ARCHITECTURE §9.2) to catch plan flips.
- Admin user search for a rare term still scans User and Profile (~240 ms at 24k users, linear in users). Fix when it
  matters: a trigram-indexed candidate query (the `Profile_name_trgm_idx` expression) instead of four `ILIKE` joins.
- Admin questions list: Seq Scan of Question (2.4k rows, 3-6 ms). At tens of thousands of questions add a partial
  `(updatedAt, id) WHERE parentId IS NULL AND schoolId IS NULL AND ownerUserId IS NULL` index.
- Parallel query on this Windows box adds 10-40 ms worker start-up to some small plans; Linux production does not show
  this, which is why the A/B replays run with parallel workers off.

## Notes

- Timings are on the local dev cluster (shared_buffers 128 MB, Windows, 4 cores, shared with other work): use them to
  compare plans, not as production latencies.
- New indexes go into a normal migration (plain `CREATE INDEX IF NOT EXISTS`) while the tables are empty before
  launch. Any index added after launch to a populated table must use `CREATE INDEX CONCURRENTLY` in its own
  single-statement migration (see `prisma/migrations/*_flashcard_review_new_daily_idx`).
- The synthetic data is uniform where real data is not (e.g. every teacher is older than every student, question
  stems share long phrases that inflate trigram matches); treat plan choices near a cost boundary with care.
