# Tests

Vitest 4 (`vitest.config.ts`), Node environment, `forks` pool. Test files run **in parallel**.

```
npm test                                   # whole suite
npx vitest run src/server/lib/errors.test.ts   # one file
npx vitest                                 # watch mode
```

## Where tests live

| Kind | Location | Database |
|---|---|---|
| Unit (pure core, helpers) | Next to the code: `foo.ts` → `foo.test.ts` | Never |
| Integration (services + Postgres) | Next to the service (`src/server/<domain>/*.test.ts`) or in `tests/` when cross-cutting | Test DB |

Pure-core modules (marking, grading, mastery, adaptive selection, SRS, study plans, streaks/XP, entitlements) must be
covered by unit tests without any I/O (CLAUDE.md rule 2).

## How the harness works

| File | Runs | Does |
|---|---|---|
| `tests/global-setup.ts` | Once, before all workers | Loads `.env`; if `prisma/migrations` has migrations, runs `prisma migrate deploy` against `DATABASE_URL_TEST` (non-destructive). Prisma output is shown only on failure. |
| `tests/setup.ts` | In every worker, before each test file's imports | Loads `.env`, sets `DATABASE_URL = DATABASE_URL_TEST`, forces `NODE_ENV=test`, fills `APP_URL` / `SESSION_SECRET` with test values when absent. |
| `tests/stubs/server-only.ts` | Via alias | Replaces `server-only` (which throws outside React Server Components) so server modules can be imported. |
| `tests/support/test-database.ts` | Shared | Refuses any test database whose name does not end with `_test`. |
| `tests/factories/` | Imported by tests | Fixture factories, barrel `tests/factories/index.ts`: unique-value helpers (`util.ts`: `uniqueId`, `uniqueEmail`, `uniqueSlug`, `uniquePhone`/`uniquePhoneE164`, ...), identities and schools (`identity.ts`), curriculum chains and lessons (`curriculum.ts`), published questions (`questions.ts`), learners, assessments and attempts (`learning.ts`). `tests/factories.ts` re-exports the barrel for bare `tests/factories` imports. |

Logs are silent under test by default. Set `LOG_LEVEL=debug` to see them while debugging.

## Database integration tests

- Configure `DATABASE_URL_TEST` in `.env` (default: `postgresql://postgres@localhost:5433/zimstudy_test`) and start
  Postgres with `npm run db:start`. The database name **must** end with `_test`, or the run aborts.
- Pending migrations are applied automatically by the global setup. After editing or squashing migrations, rebuild the
  schema from scratch with `npm run test:db:prepare` (`prisma migrate reset --force` against the test DB only).
- **Never truncate or delete other rows, and never depend on global table state.** Other files are writing to the same
  database at the same time. Create your own fixtures with unique values (`tests/factories/`) and assert only on rows
  you created (filter by the ids/unique values you generated).
- Without `DATABASE_URL_TEST`, `DATABASE_URL` is set to an unroutable `*.invalid` URL, so a test that touches the
  database fails with a connection error naming the missing variable instead of hitting the dev database.
- Unit-only run while Postgres is stopped: `VITEST_SKIP_DB_SETUP=1 npx vitest run <files>`
  (PowerShell: `$env:VITEST_SKIP_DB_SETUP="1"; npx vitest run <files>`).

## Next.js specifics

- `next/headers` (`headers()`, `cookies()`) only works inside a request. Test the pure variants instead (for example
  `clientIpFromHeaders(new Headers(...))` in `src/server/lib/request.ts`) or `vi.mock("next/headers")`.
- `redirect()` / `notFound()` throw control-flow errors; `safeAction` and `toHttpResponse` rethrow them, so assert with
  `await expect(action()).rejects.toThrow()`.
- `src/proxy.ts` matchers can be checked with `unstable_doesMiddlewareMatch` from `next/experimental/testing/server`,
  and `next.config.ts` headers with `unstable_getResponseFromNextConfig`.

## Before finishing a task

```
npx tsc --noEmit
npx vitest run <your test files>
npx eslint <your files>
```
