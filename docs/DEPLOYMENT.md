# Deployment and operations

How to build, deploy, run and operate the platform in staging and production. Architecture background: ARCHITECTURE
§9 (performance and scaling) and §10 (deployment). Product scope: PRODUCT_SPEC §38 (scale), §39 (security).

| Artifact | Purpose |
|---|---|
| [`Dockerfile`](../Dockerfile) | One build, two targets: `runtime` (web + worker) and `tools` (migrations, section D, catalogue seed) |
| [`.dockerignore`](../.dockerignore) | Keeps secrets (`.env*`), local state and build output out of the build context |
| [`docker-compose.prod.example.yml`](../docker-compose.prod.example.yml) | Example single-host stack: Postgres 18, PgBouncer, 2 web replicas, worker, migrate job, Caddy |
| [`deploy/compose/postgres-init/10-roles.sh`](../deploy/compose/postgres-init/10-roles.sh) | First-boot roles, database and section D defaults for the compose stack |
| [`scripts/db-deploy.ts`](../scripts/db-deploy.ts) | Deploy-time database step: migrate, grants, section D defaults, verification |
| [`scripts/build-worker.mjs`](../scripts/build-worker.mjs) | Bundles the worker into one ES module for the image |
| [`src/app/api/health/route.ts`](../src/app/api/health/route.ts), [`src/app/api/ready/route.ts`](../src/app/api/ready/route.ts) | Liveness and readiness probes |
| [`src/server/lib/s3.ts`](../src/server/lib/s3.ts) | S3-compatible storage client (SigV4 over `fetch`) behind `STORAGE_DRIVER=s3` |
| [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) | CI: typecheck, lint, tests on PostgreSQL 18, build, image smoke test |

> **What has been verified, and what has not (2026-10-06).** Verified on the development machine (Windows, no
> Docker): `next build` with `output: "standalone"`; the standalone server started in production mode against a
> database configured by `scripts/db-deploy.ts` as a non-superuser owner, answering `/api/health` and `/api/ready`
> (`dbSafety.enforced: true`); the bundled worker in production mode draining 26 recurring jobs; native addons
> (sharp, argon2) loading from the image layout; the catalogue seed and the demo-seed refusal against that database;
> the compose first-boot SQL script. **Not run yet:** `docker build`, the compose stack and the CI workflow itself
> (the `image` job in CI is the first end-to-end run of the Dockerfile). Treat their first runs as part of staging
> bring-up.

---

## 1. Recommended topology for Zimbabwe

```
 Students (Econet, NetOne, Telecel, Liquid; mostly Android on mobile data)
        │
 CDN with Southern African PoPs (TLS, WAF, caching of /_next/static and public pages)
        │
 Load balancer (health check: /api/ready)
        │
 ┌──────┴──────────────┐      ┌─────────────────────────────┐      ┌───────────────────────────┐
 │ web x 2+ (runtime)  │      │ worker x 1+ (runtime image, │      │ migrate (tools image),    │
 │ node server.js      │      │ node worker/index.mjs)      │      │ one-shot before each      │
 └──────┬──────────────┘      └──────────┬──────────────────┘      │ release                   │
        │ PgBouncer / RDS Proxy           │ direct connection       └────────────┬──────────────┘
        │ (transaction pooling)           │ (LISTEN/NOTIFY)                      │ direct, owner role
        ▼                                 ▼                                      ▼
 Managed PostgreSQL 18 (Multi-AZ, PITR)        Object storage (S3-compatible, private bucket)
```

### Region

Every dynamic page and Server Action is at least one round trip between the student's phone and the region; a new
connection costs one or two more for TCP and TLS. Indicative round-trip times from Harare (verify with probes from
each mobile network before committing; most Zimbabwean international transit lands in Johannesburg):

| Region | Typical RTT from Harare | Notes |
|---|---|---|
| Johannesburg (Azure South Africa North, Google Cloud africa-south1) | ~15–35 ms | Closest |
| Cape Town (AWS af-south-1) | ~30–55 ms | ARCHITECTURE §10.1 recommendation; mature managed Postgres, S3, ECS |
| Western Europe (Frankfurt, London, Dublin) | ~150–200 ms | Adds roughly half a second per navigation on mobile networks |
| US East | ~230–300 ms | Not suitable for the app servers |

**Recommendation:** a South African region. AWS af-south-1 (option A in ARCHITECTURE §10.1) unless the owner
prefers a Johannesburg provider for the extra 15–20 ms; decide on (1) managed PostgreSQL **18** availability in that
region (the schema and its raw SQL were verified on 18.3), (2) cost, (3) the team's operational familiarity. Keep the
database, web, worker and bucket in the SAME region: the app makes several database round trips per request.
Data residency (Zimbabwe's Cyber and Data Protection Act; most users are minors) needs the legal review listed in the
go-live checklist before personal data leaves Zimbabwe.

### Managed PostgreSQL

- PostgreSQL 18, Multi-AZ, storage autoscaling, `pg_stat_statements` enabled, slow-query log at 200 ms.
- PITR enabled (7–35 days of WAL), automated daily snapshots kept 30 days (§9 below for restores).
- `timezone = UTC` in the parameter group (the app also sets it per role and per connection).
- A pooler in transaction mode in front of the app role (PgBouncer, RDS Proxy, or the provider's pooler).
- TLS required. With `pg`, use `?sslmode=verify-full` and point `sslrootcert` at the provider's CA bundle (mount it
  into the container), e.g. `postgresql://app_rw:…@db.example:5432/dzidza?sslmode=verify-full&sslrootcert=/etc/ssl/rds-ca.pem`.

### Object storage

`STORAGE_DRIVER=s3` (implemented in `src/server/lib/s3.ts`, SigV4 over `fetch`, tested against AWS's published
signature vectors and a fake S3 endpoint; **not yet exercised against a real bucket**: do that in staging). One
**private** bucket in the same region; objects are never public: `/api/media/<key>` checks `MediaAsset` visibility and
sets `Cache-Control` (PUBLIC assets are `immutable`, so the CDN caches them). Bucket setup:

- Block all public access; default encryption (SSE-S3) on; versioning on (accidental deletes); a lifecycle rule
  expiring non-current versions after 30 days.
- An IAM user (or role) limited to this bucket: `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject` on
  `arn:aws:s3:::<bucket>/*` and `s3:ListBucket` on `arn:aws:s3:::<bucket>` (without ListBucket S3 answers 403
  instead of 404 for missing keys).
- Cloudflare R2: `S3_REGION=auto`, `S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com`,
  `S3_FORCE_PATH_STYLE=true`. MinIO: path style, and an `https://` endpoint in production.
- Credentials are static keys today (`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY`, optional `S3_SESSION_TOKEN`).
  Loading ECS task-role / instance-profile credentials automatically is a follow-up.

`STORAGE_DRIVER=local` (files under `/app/storage`) is only correct when every web and worker container shares one
volume on ONE host (the compose example).

### CDN

- Proxy everything through the CDN; terminate TLS there; enable HTTP/3 and Brotli.
- Respect origin `Cache-Control`. `/_next/static/*` is immutable; prerendered public pages carry `s-maxage` from
  their `revalidate`; `/api/media/*` PUBLIC assets are immutable; everything authenticated is `private`/`no-store`.
- Never cache `/sw.js` and `/sw-routing.mjs` at the edge longer than the origin says (the service worker must be able
  to update; docs/OFFLINE.md), and never cache `/api/*` other than PUBLIC media.
- Client IP: with CDN + load balancer both appending `X-Forwarded-For`, set `TRUSTED_PROXY_HOPS=2`; if the origin
  accepts traffic ONLY from the CDN, `CLIENT_IP_HEADER=cf-connecting-ip` (Cloudflare) is simpler. Every IP rate limit
  depends on this being right. Exact values below.

#### Client IP: exact values

The app reads the client address from the entry `TRUSTED_PROXY_HOPS` places from the RIGHT of `X-Forwarded-For`, or
from `CLIENT_IP_HEADER` when set (`src/server/lib/request.ts`). Next.js itself never appends to `X-Forwarded-For` (it
only fills it from the socket when the header is absent), so the hop count is exactly the number of proxies in front of
the app that APPEND to it. Re-check each provider's current documentation before go-live.

| Topology | Setting | Condition that makes it safe |
|---|---|---|
| Cloudflare -> AWS ALB -> app (recommended) | `TRUSTED_PROXY_HOPS=2` | Cloudflare appends the visitor address, the ALB appends the Cloudflare edge address (ALB attribute `routing.http.xff_header_processing.mode` = `append`, the default). The ALB security group (or a Cloudflare Tunnel) admits **only Cloudflare's published IP ranges**; otherwise a client can call the ALB directly and the second entry from the right is whatever they sent. |
| Cloudflare -> AWS ALB -> app (alternative) | `CLIENT_IP_HEADER=cf-connecting-ip` (leave `TRUSTED_PROXY_HOPS` unset) | Same origin lock as above (Cloudflare overwrites `CF-Connecting-IP`; a direct caller can set it). Use this one if the ALB is set to `replace` or `remove` `X-Forwarded-For`. |
| AWS ALB only | `TRUSTED_PROXY_HOPS=1` | ALB in `append` (or `replace`) mode. |
| Cloudflare only (origin directly behind it) | `TRUSTED_PROXY_HOPS=1` or `CLIENT_IP_HEADER=cf-connecting-ip` | Origin firewall admits Cloudflare's ranges only. |
| Compose example (one reverse proxy) | `TRUSTED_PROXY_HOPS=1` | The proxy appends (nginx `$proxy_add_x_forwarded_for`, Caddy default). |

Never set `CLIENT_IP_HEADER` to `x-forwarded-for` (a client-written list) and set only one of the two variables.

At boot in production the web server logs `msg="client IP policy"` (the rule in force) and one
`msg="client IP configuration warning"` per risky value: neither variable set, both set, a client-controlled or
overwrite-dependent header, more than 3 hops (`src/server/lib/client-ip-safety.ts`). At runtime it logs ONE warning per
process when traffic contradicts the setting: an `X-Forwarded-For` chain shorter than `TRUSTED_PROXY_HOPS`
(`anomaly: "chain_shorter_than_hops"`: the setting is too large and addresses can be forged) or the configured header
missing (`anomaly: "header_missing"`). Either line after a deploy means the setting is wrong.

**Verify from outside before launch** (from a network that is not the office NAT), against the public hostname:

```bash
# 1. Forged hops must not change who you are: 61 searches in a minute, each claiming a different address.
for i in $(seq 1 61); do
  curl -s -o /dev/null -w "%{http_code}\n" -H "X-Forwarded-For: 203.0.113.$i" "https://<host>/api/v1/search/suggest?q=algebra"
done | sort | uniq -c        # expect a 429 at the end (publicSearch: 60 per minute per client IP)
# 2. Calling the load balancer directly must fail (origin locked to Cloudflare):
curl -sv --max-time 10 "https://<alb-dns-name>/api/health" -H "Host: <host>"   # expect a timeout / refusal
```

If step 1 returns only 200s, the forged entry was used as the client address: lower `TRUSTED_PROXY_HOPS` (or switch to
`CLIENT_IP_HEADER`) and repeat. Wait a minute between runs (the bucket is per minute).

---

## 2. Container image

```bash
SHA=$(git rev-parse --short=12 HEAD)
# Runtime image (web + worker). next build prerenders public pages from a database: see "Build-time database".
BUILD_DATABASE_URL='postgresql://app_build:…@db-replica.example:5432/dzidza?sslmode=require' \
docker build \
  --secret id=build_database_url,env=BUILD_DATABASE_URL \
  --build-arg APP_URL=https://learn.example.com \
  --build-arg NEXT_PUBLIC_APP_NAME=BvunzoHub \
  --build-arg GIT_SHA=$SHA \
  -t registry.example.com/dzidza:$SHA .
# Tools image (migrations, section D, seed). No database or secret needed.
docker build --target tools -t registry.example.com/dzidza-tools:$SHA .
```

| Target | Contents | Runs as | Entry |
|---|---|---|---|
| `runtime` (default) | Next standalone server, `.next/static`, `public/`, `worker/index.mjs`, native addons (sharp + libvips, argon2), `prisma/schema.prisma` + `prisma/migrations` | `node` (uid 1000); code root-owned, `.next` and `/app/storage` writable | `tini -- node server.js` |
| `tools` | Full source, all dependencies, generated Prisma client | `node` | `tsx scripts/db-deploy.ts` |

- **Base:** `node:24-bookworm-slim`. `npm ci` from the lockfile (it records the Linux native packages), `prisma generate`,
  `next build` (standalone), `scripts/build-worker.mjs`.
- **Build arguments:** `APP_URL` (required; prerendered canonical URLs and the sitemap embed it, and env validation
  needs it), `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_SUPPORT_EMAIL` (inlined into client bundles), `GIT_SHA` (becomes the
  Next.js `deploymentId` for version-skew protection during rolling deploys, and `APP_RELEASE`, shown by
  `/api/health`). Because `APP_URL` and `NEXT_PUBLIC_*` are baked in, build one runtime image **per environment**.
- **Healthcheck:** `HEALTHCHECK` calls `/api/health` with Node's `fetch` (the image has no curl). The worker container
  disables it (it serves no HTTP). ECS/Kubernetes ignore Docker healthchecks: configure their own (§3).
- **Signals:** `tini` is PID 1 and forwards `SIGTERM`. Web: Next.js stops accepting connections, finishes in-flight
  requests and exits 143. Worker: see "Worker entry".
- **Native addons:** the standalone file trace copies `sharp`'s `.node` file but NOT libvips (verified: the traced
  output could not load sharp), so the Dockerfile copies `sharp`, `@img/*`, `@node-rs/*`, `detect-libc` and `semver`
  from the full install. Without that, image uploads and the media job fail at runtime while the server still boots.

### Worker entry (decision)

The worker runs from the **same runtime image** with a command override: `node --enable-source-maps worker/index.mjs`.
`scripts/build-worker.mjs` bundles `src/worker/index.ts` with esbuild (the version pinned by tsx in the lockfile) into
one ES module, resolving the `react-server` condition (so `server-only` is a no-op, exactly like
`tsx --conditions=react-server`) and the `@/*` alias; native addons stay external. Chosen over `npm run worker` because:
one process receives `SIGTERM` directly (npm → sh → tsx → node relays it through three layers); no TypeScript
sources, tsx or dev dependencies in the runtime image; no transpilation at boot. Development keeps `npm run worker`.

Shutdown (src/worker/shutdown.ts, tested in `shutdown.test.ts`): the first `SIGTERM` stops claiming; in-flight jobs get
30 s; then their `AbortSignal` fires (a well-behaved handler fails and its job is retried with backoff); after 5 s more
the process exits and anything still running stays `RUNNING` until its 5-minute lease expires and another worker
reclaims it. Give the container a stop grace period of **at least 40 s** (compose `stop_grace_period: 45s`, ECS
`stopTimeout: 45`, Kubernetes `terminationGracePeriodSeconds: 45`). A second signal exits immediately.

### Build-time database

`next build` prerenders the marketing and curriculum pages (`/`, `/pricing`, `/faq`, `/daily/...`, `/[board]/...`)
from the database; a build without database access currently **fails** (`/daily/[board]/[qualification]` calls the
database in `generateStaticParams` without the `staticParamsOrEmpty` fallback the SEO pages use, and the marketing
loaders have no fallback). So:

- Give the build network access to a migrated database and pass its URL as the `build_database_url` **secret** (never
  a build argument: those are visible in `docker history`).
- Use a **read-only role on the target environment's database or a replica** (`app_build`: `GRANT SELECT ON ALL
  TABLES`). Pages are served from the prerendered output until they revalidate (5 minutes to 24 hours depending on the
  page), so building against an empty or seed-only database would publish placeholder content after each deploy.
- CI builds against its own catalogue-seeded service database only to prove the build works.

Making builds database-free (each loader falling back to "render on first request") is a follow-up (§12).

---

## 3. Health checks

| Endpoint | Kind | Checks | Use it for |
|---|---|---|---|
| `GET /api/health` | Liveness | The Node process answers. No database, no environment checks. `200 {"status":"ok","uptimeSeconds":…,"release":"<git sha>"}` | Container liveness / restart policy; external uptime monitoring |
| `GET /api/ready` | Readiness | (1) `SELECT 1` through the app role and pool; (2) every migration shipped in the image is applied and finished; (3) section D safety checks (enforced in production only). `200` ready / `503` not ready | Load-balancer target health; rolling-deploy gates; uptime alerting |

Readiness body (booleans and counts only; details go to the server log with the request id):

```json
{"status":"ready","checkedAt":"2026-10-06T21:47:34.039Z","checks":{
  "database":{"ok":true,"latencyMs":3},
  "migrations":{"ok":true,"expected":7,"applied":7,"pending":0,"failed":0,"ahead":0},
  "dbSafety":{"ok":true,"enforced":true,"failures":0,"warnings":0}}}
```

- Errors are codes: `timeout`, `unavailable`, `no_privilege` (the `_prisma_migrations` column grant is missing: run
  the migrate job), `migrations_dir_missing` (broken image).
- `ahead > 0` is normal during a rolling deploy: a newer release already migrated (expand-then-contract migrations
  keep the old code working). A `pending` migration means this release's `migrate` step did not run.
- Results are cached for 2 s per instance and computed single-flight, so frequent probes cost at most three small
  queries every two seconds. Neither endpoint is rate limited or behind the auth redirect.
- Suggested load balancer settings: path `/api/ready`, interval 10 s, timeout 5 s, healthy 2, unhealthy 3. Liveness:
  `/api/health`, interval 30 s, 3 failures. Never use `/api/ready` for liveness (a database outage would restart
  every web container at once).
- `KEEP_ALIVE_TIMEOUT` (ms) must exceed the load balancer's idle timeout (AWS ALB default 60 s → `65000`).

---

## 4. Database roles and section D

The app must connect as a role that cannot bypass the database's privacy and integrity rules (ARCHITECTURE §4.12,
raw SQL section D). Production uses three principals:

| Principal | Attributes | Used by |
|---|---|---|
| Admin (managed DB master user / `postgres`) | Superuser or provider admin | One-time setup only |
| Owner (`dzidza_owner`) | Owns the database and every table; NOSUPERUSER; CREATEROLE only to hold ADMIN on `app_rw` | `migrate` job (`MIGRATION_DATABASE_URL`, direct connection) |
| App (`app_rw`) | LOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE | web and worker (`DATABASE_URL`) |
| Maintenance (`app_maintenance`) | LOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE; `SELECT, INSERT, DELETE` on `AuditLog` only | the scheduled audit-log retention purge (`MAINTENANCE_DATABASE_URL`, see "Scheduled operations" below) |

### One-time setup (managed database)

As the admin, connected to the server:

```sql
CREATE ROLE dzidza_owner LOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB CREATEROLE PASSWORD '<owner password>';
CREATE DATABASE dzidza OWNER dzidza_owner;
-- Create app_rw AS the owner, so the owner holds ADMIN OPTION on it (PostgreSQL 16+), which
-- `ALTER ROLE app_rw SET TimeZone = 'UTC'` in the grants script needs.
SET ROLE dzidza_owner;
CREATE ROLE app_rw LOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE PASSWORD '<app password>';
RESET ROLE;
-- app.* are placeholder parameters: since PostgreSQL 15 only a superuser, or a role granted SET on them, may store
-- them as database defaults. Either let the owner do it on every deploy ...
GRANT SET ON PARAMETER app.environment, app.four_eyes TO dzidza_owner;
-- ... or set them once here (the migrate job then only verifies them):
ALTER DATABASE dzidza SET app.environment = 'production';   -- 'staging' on staging
ALTER DATABASE dzidza SET app.four_eyes = 'on';
```

Prefer `\password <role>` in psql over literal passwords (the statement can end up in server logs). If the provider's
admin cannot `GRANT SET ON PARAMETER`, use the second form. The compose example does all of this in
`deploy/compose/postgres-init/10-roles.sh` on first boot. Use URL-safe passwords (hex) or percent-encode them in URLs.

### What the migrate job enforces on every deploy (`scripts/db-deploy.ts`)

1. `prisma migrate deploy` as the owner.
2. `scripts/sql/app-role-grants.sql`: `SELECT/INSERT/UPDATE/DELETE` on all tables, sequences, functions (and default
   privileges for future objects); **no** `UPDATE/DELETE/TRUNCATE` on `AuditLog`; **no** `DELETE/TRUNCATE` on
   `ContentRevision` and `PaymentEvent`; nothing on `_prisma_migrations` except `SELECT (migration_name, finished_at,
   rolled_back_at)` for `/api/ready`; `ALTER ROLE app_rw SET TimeZone = 'UTC'`.
3. Database defaults `app.environment` (`production` refuses every demo row; `staging` on staging) and
   `app.four_eyes = 'on'` (an approver must differ from the author), set only if they differ.
4. Verification of all of the above from the owner's side; exit 1 with the list of problems otherwise.

The web server (`src/instrumentation-node.ts`) and the worker additionally run the boot assertions as the app role
(`src/server/lib/db-safety.ts`) and refuse to start in production if the role is a superuser or `BYPASSRLS`, can
rewrite `AuditLog`, or `app.environment` is not `production`; `/api/ready` reports the same checks.

### Scheduled operations: audit-log retention purge

The privacy notice and ARCHITECTURE §4.13 promise that audit entries are kept **2 years** (payment-related entries:
Payment, PaymentEvent, Subscription, EntitlementGrant, PlanPrice, PromoCode, **6 years**) and then deleted. The app role
can never delete audit rows (by design: `AuditLog` is append-only for `app_rw`, enforced by privileges and by the
`AuditLog_append_only` trigger), so the purge is an **ops task** run as the separate `app_maintenance` role:
`scripts/maintenance/purge-audit.ts`. In each batch transaction it runs `SET LOCAL app.audit_retention_purge = 'on'`
and deletes at most `--batch-size` rows past retention; the trigger re-checks every row (no flag, or a row younger than
its retention, and the DELETE fails), so the script cannot remove live history even if it had a bug. A run that deleted
anything writes one SYSTEM audit entry `audit.retention_purge` with the count and cutoffs.

One-time setup per database (as the owner, so the owner can manage the role):

```sql
SET ROLE dzidza_owner;
CREATE ROLE app_maintenance LOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE PASSWORD '<maintenance password>';
RESET ROLE;
```

then apply its grants (idempotent; also creates a password-less role on local trust-auth clusters):

```bash
psql "$MIGRATION_DATABASE_URL" -v ON_ERROR_STOP=1 -f scripts/sql/maintenance-role-grants.sql
```

Schedule it **weekly** (Sunday 02:00 CAT is quiet; daily is fine too) from the tools image, on a DIRECT connection or
through PgBouncer in transaction mode (the flag is `SET LOCAL`, so it never leaks across pooled transactions):

```bash
# First time: see what would go (counts only).
docker run --rm -e MAINTENANCE_DATABASE_URL='postgresql://app_maintenance:…@db.example:5432/dzidza?sslmode=verify-full'   registry.example.com/dzidza-tools:$SHA node_modules/.bin/tsx scripts/maintenance/purge-audit.ts --dry-run
# Scheduled (cron, ECS scheduled task, Kubernetes CronJob):
docker run --rm -e MAINTENANCE_DATABASE_URL=… registry.example.com/dzidza-tools:$SHA   node_modules/.bin/tsx scripts/maintenance/purge-audit.ts            # --batch-size=5000 --max-batches=200 by default
```

Watch the exit code (1 = failed: alert) and the single `[purge-audit] … eligible=… deleted=… cutoffs: …` line; a run
that stops at `--max-batches` says so and the next run continues. Keep `MAINTENANCE_DATABASE_URL` out of the web and
worker environments. The 6-year `PaymentEvent` purge (`app.payment_retention_purge`) is **not built**: nothing is old
enough before 2032; give `app_maintenance` `SELECT, DELETE` on `PaymentEvent` when it is.

Other retention purges need no ops task: they run inside the worker as the app role (ARCHITECTURE §3.7), e.g.
`imports.purgeFiles` (uploaded import files after 90 days), `accounts.retentionPurge`, `whatsapp.purge`,
`maintenance.purgeJobs`, `maintenance.purgeNotifications`.

---

## 5. Migrations

```bash
# Every release, before the new web/worker containers start (compose: the `migrate` service; ECS: a one-off task;
# Kubernetes: a Job / Helm pre-upgrade hook):
docker run --rm \
  -e MIGRATION_DATABASE_URL='postgresql://dzidza_owner:…@db.example:5432/dzidza?sslmode=verify-full&…' \
  -e DB_APP_ENVIRONMENT=production \
  registry.example.com/dzidza-tools:$SHA
# Check only (no changes):      … dzidza-tools:$SHA node_modules/.bin/tsx scripts/db-deploy.ts --verify-only
# Grants/defaults only:         … --skip-migrate
```

- **Direct connection** for migrations (never through PgBouncer: Prisma Migrate takes a session-level advisory lock).
- **Expand, then contract.** During a rolling deploy the previous release runs against the new schema. Add columns
  as nullable or with defaults, backfill in a job, and only drop or tighten in a later release.
- **Raw SQL rules** (CLAUDE.md, ARCHITECTURE §4.12): Prisma does not manage the ~290 CHECK constraints, 83 triggers and
  RLS policies, so keep raw SQL in the same migration file with a `-- Purpose:` comment per statement; new CHECKs on
  populated tables are added `NOT VALID` and then `VALIDATE`d; indexes on large tables use
  `CREATE INDEX CONCURRENTLY` (in a migration of its own, since it cannot run inside a transaction); a changed index
  definition is `DROP`ped first. Never edit a migration that has been applied anywhere.
- **Drift check:** CI runs `prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code`
  against a freshly migrated database.
- **A failed migration** leaves a row with `finished_at IS NULL`; `migrate deploy` then refuses to continue and
  `/api/ready` reports `failed: 1` on the new release (the old release keeps serving). Fix forward: repair the
  database by hand if needed, then `prisma migrate resolve --rolled-back <name>` (or `--applied <name>`) from the tools
  image and rerun the job. Restore from PITR only if data was damaged.
- Long migrations: run them in a low-traffic window (evenings 18:00–22:00 CAT are the peak; avoid exam seasons).

---

## 6. Seeding

| Environment | Command | Seeds |
|---|---|---|
| Production / staging | `docker run --rm -e DATABASE_URL=<app role, direct> … dzidza-tools:$SHA npm run db:seed` (compose: `--profile ops run --rm seed`) | Catalogue ("ALWAYS" data: countries, boards, qualifications, subjects, plans, settings, achievements). Idempotent; never modifies existing rows |
| Development only | `npm run db:seed:demo` | Catalogue + demo users and content (docs/DEV_SEED.md) |

**Never run `db:seed:demo`, `--demo` or `SEED_DEMO=1` outside development.** It is refused when `NODE_ENV=production`,
and independently by the database when `app.environment = 'production'` (every demo row has `isDemo = true`).
Real content enters through the CMS workflow (docs/CONTENT_AUTHORING.md).

---

## 7. Environment variables

### Application (validated by `src/server/lib/env.ts`)

Every key of the server environment contract; the server and worker refuse to start when the contract fails, and
production adds rules (listed under Purpose). A test (`tests/deployment-docs.test.ts`) keeps this table in sync with
`ENV_KEYS`. "Build" means the value is also needed when building the image.

| Variable | Required | Example | Purpose |
|---|---|---|---|
| `NODE_ENV` | Yes (`production`) | `production` | Enables production rules: env policy below, HSTS, database boot assertions, no demo data. The image sets it |
| `APP_URL` | Yes; build | `https://learn.example.com` | Public origin for links, emails, OAuth and payment return URLs, canonical URLs. `https://` in production |
| `NEXT_PUBLIC_APP_NAME` | No; build | `BvunzoHub` | Brand name (BvunzoHub); inlined into client bundles at build time |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | No; build | `support@example.com` | Support address shown in the UI; inlined at build time |
| `DATABASE_URL` | Yes | `postgresql://app_rw:…@pgbouncer:5432/dzidza` | App role connection. Web: through the pooler. Worker: DIRECT (LISTEN/NOTIFY) |
| `DATABASE_URL_TEST` | Tests only | `postgresql://app_rw@localhost:5433/zimstudy_test` | Test database; its name must end in `_test`. Never set in production |
| `MIGRATION_DATABASE_URL` | Migrate job only | `postgresql://dzidza_owner:…@db:5432/dzidza` | Owner role for `prisma migrate` and `db-deploy`. Never give it to web or worker |
| `MIGRATION_DATABASE_URL_TEST` | Tests only | `postgresql://postgres@localhost:5433/zimstudy_test` | Owner of the test database (migrations and grants before tests) |
| `SESSION_SECRET` | Yes | 64 hex chars (`openssl rand -hex 32`) | Key for OTP code hashes, sealed auth-flow values, family link codes, rate-limit subjects, payer fingerprints, payment return signatures. ≥ 32 chars and not the example value in production. See §10 before rotating |
| `LOG_LEVEL` | No | `info` | `debug`, `info`, `warn`, `error`, `silent`. Default `info` (`debug` in development) |
| `NEXT_PHASE` | Never set | — | Set by Next.js while building; relaxes runtime-only rules during prerendering |
| `ANTHROPIC_API_KEY` | For AI features | `sk-ant-…` | Without it every AI feature answers "AI is not configured" (never fabricated output) |
| `GOOGLE_CLIENT_ID` | No (with secret) | `…apps.googleusercontent.com` | Google sign-in; both Google keys or neither |
| `GOOGLE_CLIENT_SECRET` | No (with id) | — | Google sign-in client secret |
| `EMAIL_PROVIDER` | **Yes in production** | `resend` | Email adapter (`src/server/messaging/providers.ts`). Accounts are email-based (owner decision 2026-10-07): verification and sign-in codes, password resets, security notices and invitations always go by email, so production refuses an unset value, `console` (dev/test capture) and unknown names. Only `resend` exists; verify it against Resend's docs on staging (§11) |
| `EMAIL_FROM` | With `resend` | `BvunzoHub <no-reply@mail.learn.example.org>` | Sender: `address` or `Name <address>` on a domain verified at the provider (SPF/DKIM). `example.com` placeholders are refused in production |
| `EMAIL_REPLY_TO` | No | `support@learn.example.org` | Reply-To for outbound email |
| `RESEND_API_KEY` | With `resend` | `re_…` | Resend API key (sending access only). Required whenever `EMAIL_PROVIDER=resend` |
| `SMS_PROVIDER` | No (SMS is off) | unset (= `none`) | SMS is switched off (`features.sms`, default off) and nothing in sign-in uses it. Unset in production means `none`. Set `twilio` or `africastalking` (with its keys) only before switching SMS on in `/admin/settings`; `console` and unknown names are refused in production. Neither adapter has been run against the live service |
| `TWILIO_ACCOUNT_SID` | With `twilio` | `AC` + 32 hex | Twilio account SID (also in the API path) |
| `TWILIO_AUTH_TOKEN` | With `twilio` | — | Twilio auth token (HTTP basic auth with the SID) |
| `TWILIO_FROM` | With `twilio` (or a Messaging Service) | `+15551234567` or `DZIDZA` | Sender: E.164 number or alphanumeric sender ID (≤ 11 chars). Check what Twilio supports for Zimbabwe |
| `TWILIO_MESSAGING_SERVICE_SID` | Alternative to `TWILIO_FROM` | `MG` + 32 hex | Messaging Service (sender pool); takes precedence over `TWILIO_FROM` |
| `AFRICASTALKING_USERNAME` | With `africastalking` | `dzidza` | Africa's Talking app username. `sandbox` uses the sandbox API and is refused in production |
| `AFRICASTALKING_API_KEY` | With `africastalking` | — | Africa's Talking API key (`apiKey` header) |
| `AFRICASTALKING_SENDER_ID` | No | `DZIDZA` | Registered alphanumeric sender ID or short code; unset = the provider's default sender |
| `PAYMENTS_ENABLED_PROVIDERS` | No | `paynow` | Comma list of `sandbox`, `paynow`, `stripe`. `sandbox` is refused in production. Stripe is dormant (`features.stripe` off): it is never offered or called, even when listed here with its keys |
| `PAYNOW_INTEGRATION_ID` | With `paynow` | `12345` | Paynow integration id (one integration per currency) |
| `PAYNOW_INTEGRATION_KEY` | With `paynow` | — | Paynow integration key (hash secret) |
| `PAYNOW_CURRENCY` | No | `USD` | ISO currency of the Paynow integration. Default `USD` |
| `PAYNOW_MERCHANT_EMAIL` | Paynow test mode | `merchant@example.com` | `authemail` required by Paynow in test mode |
| `PAYNOW_TEST_MODE` | No | `false` | `true` only on staging |
| `STRIPE_SECRET_KEY` | With `stripe` (dormant) | `sk_live_…` | Stripe API key. Not needed while `features.stripe` is off |
| `STRIPE_WEBHOOK_SECRET` | With `stripe` | `whsec_…` | Verifies `POST /api/webhooks/payments/stripe` |
| `STRIPE_API_VERSION` | Recommended with `stripe` | `2025-09-30.clover` | Pins the `Stripe-Version` header |
| `WHATSAPP_VERIFY_TOKEN` | With WhatsApp (all four; dormant) | random string | Webhook verification handshake (`GET /api/webhooks/whatsapp`). Not needed while `features.whatsapp` is off |
| `WHATSAPP_ACCESS_TOKEN` | With WhatsApp | — | Cloud API token (use a system-user token) |
| `WHATSAPP_PHONE_NUMBER_ID` | With WhatsApp | `1234567890` | Sending number id |
| `WHATSAPP_APP_SECRET` | With WhatsApp | — | Verifies webhook signatures (`X-Hub-Signature-256`) |
| `WHATSAPP_GRAPH_VERSION` | No | `v23.0` | Graph API version; verify the current one before go-live |
| `STORAGE_DRIVER` | No | `s3` | `local` (default; one host only) or `s3` |
| `S3_BUCKET` | With `s3` | `dzidza-media-prod` | Private bucket name |
| `S3_REGION` | With `s3` | `af-south-1` | Bucket region; `auto` for Cloudflare R2 |
| `S3_ENDPOINT` | Non-AWS providers | `https://<account>.r2.cloudflarestorage.com` | Provider origin; `https://` in production |
| `S3_ACCESS_KEY_ID` | With `s3` | `AKIA…` | Access key limited to the bucket |
| `S3_SECRET_ACCESS_KEY` | With `s3` | — | Secret key |
| `S3_SESSION_TOKEN` | Temporary credentials | — | STS session token |
| `S3_FORCE_PATH_STYLE` | No | `false` | `true` for MinIO / R2 path-style URLs |
| `TRUSTED_PROXY_HOPS` | Production (or `CLIENT_IP_HEADER`) | `2` | Proxies in front that append to `X-Forwarded-For` (CDN + load balancer = 2). Every IP rate limit depends on it |
| `CLIENT_IP_HEADER` | Alternative to hops | `cf-connecting-ip` | Header the edge overwrites with the client IP; only if the origin accepts traffic from the edge alone |
| `CRON_SECRET` | On Vercel | 64 hex chars | Bearer secret for `GET /api/cron/jobs`, a job runner for serverless hosts without a worker (e.g. Vercel Cron); unset = the route refuses every request. Not needed with a worker process (Railway, containers) |

### Process, build and tooling variables (read outside `env.ts`)

| Variable | Where | Example | Purpose |
|---|---|---|---|
| `PORT`, `HOSTNAME` | web | `3000`, `0.0.0.0` | Standalone server bind address (the image sets both; Docker otherwise sets `HOSTNAME` to the container id) |
| `KEEP_ALIVE_TIMEOUT` | web | `65000` | Node keep-alive (ms); must exceed the load balancer's idle timeout |
| `DATABASE_POOL_MAX` | web, worker | `10` | `pg` pool size per process (default 10) |
| `PRISMA_LOG_QUERIES` | web, worker | `1` | Logs every SQL query. Debugging only (volume, and parameters may contain personal data) |
| `WORKER_CONCURRENCY` | worker | `2` | Parallel job lanes per worker process, 1–4 (default 2); also `--concurrency=N` |
| `WORKER_QUEUES` | worker | `payments,notifications` | Queues this worker serves (default: all); also `--queues=` |
| `WORKER_POLL_MS` | worker | `2000` | Idle poll interval; LISTEN/NOTIFY usually wakes the worker sooner |
| `APP_RELEASE` | image | git SHA | Release id reported by `/api/health` (set from the `GIT_SHA` build argument) |
| `NEXT_DEPLOYMENT_ID` | build | git SHA | Next.js deploymentId (skew protection); the Dockerfile sets it from `GIT_SHA` |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | build + web | 32-byte base64 | Server Action encryption key. Optional with one image for all replicas (the key generated at build time is shared); set the same value at build and run time to keep it across releases |
| `NEXT_TELEMETRY_DISABLED` | build, web | `1` | Set by the image |
| `CHECKPOINT_DISABLE` | tools | `1` | No Prisma update checks from production jobs (set by the tools image) |
| `DB_APP_ENVIRONMENT` | migrate job | `production` | Value for `app.environment` (`production`, `staging`, `development`); default `production` when `NODE_ENV=production` |
| `DB_FOUR_EYES` | migrate job | `on` | Value for `app.four_eyes`; must be `on` in production |
| `MAINTENANCE_DATABASE_URL` | audit purge task | `postgresql://app_maintenance:…@db:5432/dzidza` | The `app_maintenance` role for `scripts/maintenance/purge-audit.ts` (§4 "Scheduled operations"). Never set on web or worker |
| `NEXT_DIST_DIR` | development | `.next-<label>` | Build directory for parallel dev servers (CLAUDE.md) |
| `SEED_DEMO`, `SEED_DEMO_PASSWORD` | development | `1` | Demo seed switch and demo password. Never in production |
| `VITEST_SKIP_DB_SETUP` | development | `1` | Skips test-database migrations for unit-only runs |
| `PERF_*` | load tests | — | `scripts/perf` harness (scripts/perf/README.md) |

---

## 8. Scaling and connection pooling

| Knob | Default | Guidance |
|---|---|---|
| Web replicas | 2 | Minimum 2 in production. Autoscale on CPU (~60%) and p95 latency. Each replica is stateless (sessions, rate limits, jobs and caches live in Postgres) |
| Web memory | — | 1 GB limit per replica is a reasonable start; watch RSS after a day (ISR and image caches) |
| `DATABASE_POOL_MAX` (web) | 10 | Client connections per replica into PgBouncer. 10 replicas × 10 = 100 client connections, well under `MAX_CLIENT_CONN` |
| PgBouncer `DEFAULT_POOL_SIZE` | 40 | Real server connections for `app_rw`. Size to roughly 2–4 × the database's vCPUs |
| Worker replicas | 1 | Add replicas when the oldest PENDING job is older than a minute at peak (`SKIP LOCKED` makes replicas safe). Dedicate one to `--queues=ai` during AI-marking bursts |
| `WORKER_CONCURRENCY` | 2 | Lanes per worker (max 4). Each lane holds a connection while a job runs |
| `DATABASE_POOL_MAX` (worker) | 5–10 | ≥ `WORKER_CONCURRENCY` + 2 (scheduler and heartbeat), plus one LISTEN connection per process (direct) |
| Postgres `max_connections` | 200 (compose) | ≥ pooler pool size + workers × (pool + 1) + migrations + monitoring + 3 reserved |

Capacity planning numbers (100k registered students, ~1,000 concurrent at the evening peak, ~3,000 in exam season)
are in ARCHITECTURE §9.1; load test against staging before each exam season (scripts/perf).

---

## 9. Observability

**Logs.** Production logs are JSON lines on stdout/stderr (`src/server/lib/logger.ts`) with `requestId` (propagated
from the `x-request-id` header by `src/proxy.ts`), `route`, `userId` (never names, emails, phones or answer text;
sensitive keys are redacted). Ship container output to the cloud log store; retain 30 days hot.

**Error tracking (hook points; no vendor wired yet).**

| Hook point | What reaches it |
|---|---|
| `normalizeError()` in `src/server/lib/errors.ts` | Every unexpected error in Server Actions and API routes, with an `errorId` shown to the user |
| `src/instrumentation.ts` | Add `export async function onRequestError(err, request, context)` (Next.js) for uncaught render and route errors |
| `runClaimedJob()` in `src/server/lib/jobs.ts` | Job failures (`msg: "job failed"`, `outcome`) |
| `error.tsx` boundaries in each area (`src/app/*/error.tsx`) | Client-side render errors |
| `createLogger({ write })` | A log sink can forward `error` lines to the vendor |

Scrub with the logger's `redact()` before sending anything; upload source maps privately (the worker bundle ships a
linked `.map`).

**Uptime checks** (external, every minute, from Johannesburg and Europe): `/api/health` (alert after 3 failures),
`/api/ready` (alert after 3 failures), and one public SEO page.

**Alerts.**

| Signal | Source | Rule |
|---|---|---|
| Dead jobs | `SELECT type, count(*) FROM "Job" WHERE status = 'DEAD' AND "updatedAt" > now() - interval '1 hour' GROUP BY type` (owner or a read-only monitoring role), or logs `msg="job failed"` with `outcome="dead"` | Any row: page the on-call for `payments.*`; ticket otherwise. Inspect, retry (fresh attempts) or cancel from `/admin/jobs` (ADMIN / SUPER_ADMIN; audited `job.retry` / `job.cancel`) |
| Queue backlog | `SELECT queue, count(*), now() - min("runAt") AS oldest FROM "Job" WHERE status = 'PENDING' AND "runAt" <= now() GROUP BY queue` | Oldest > 5 min (payments, notifications) or > 30 min (others) |
| SMS budget reached | Built in: the first SMS refused by the daily cap of `messaging.smsBudget` (default 2,000 per Africa/Harare day) queues `messaging.smsBudgetAlert`, which sends every ACTIVE SUPER_ADMIN one in-app notification for that day, plus one email while optional email (`features.email`) is on (`src/server/messaging/sms-budget.ts`). Logs: `msg="sms refused: daily platform budget reached"`, `msg="sms budget reached; alert queued"`, and `msg="sms refused: country not allowed"` for numbers outside `allowedCountryPrefixes` | Only while SMS is switched on (`features.sms`; off by default, and sign-in never uses SMS). Page the on-call: text messages stop until midnight. Check SMS volume and the provider dashboard for SMS pumping before raising the cap in `/admin/settings` |
| AI budget trip | Built in: the first refusal of a platform day queues `ai.budgetAlert`, which sends every ACTIVE SUPER_ADMIN one in-app notification for that day, plus one email while optional email (`features.email`) is on (src/server/ai/budget-alert.ts; email needs a live email provider and a verified address). Never fires while AI is switched off (`features.ai`). Logs: `msg="AI daily budget reached; request refused"`, `msg="ai budget alert queued"` | Optionally also page on the first log line per day; the ceiling is the `ai.budget` setting (`dailyCostCeilingMicros`) |
| Not ready | `/api/ready` 503 or logs `readiness:` | > 1 min on any instance |
| 5xx rate | Load balancer metrics | > 1% for 5 min |
| Latency | p95 per route group | Answer submission > 300 ms, dashboard > 500 ms (ARCHITECTURE §9.1) |
| Database | CPU, connections, replication lag, storage, slow queries (`pg_stat_statements`) | CPU > 70% for 15 min; connections > 80% of max |
| Payments | PENDING older than 24 h; webhook signature failures in logs | Any |
| Abuse | OTP send volume; rate-limit refusals | Sudden spikes |

---

## 10. Backups, restore drill and secrets

**Backups.** Managed PITR (7–35 days), daily snapshots kept 30 days, and a monthly encrypted logical dump
(`pg_dump -Fc` as the owner) copied to a separate account. Object storage: versioning plus a lifecycle rule; consider
replication to a second bucket in the same country/region set allowed by the data-protection review. Targets: RPO
≤ 15 minutes, RTO ≤ 4 hours (ARCHITECTURE §10.5).

**Restore drill (quarterly).** Restore the latest PITR point into an **isolated, access-controlled** instance (it holds
real student data: never into dev, and not into a staging environment that many people can reach). Then:

1. Run the migrate job with `--verify-only` against it (expect `app.environment = 'production'`).
2. Start one runtime container against it and check `/api/ready` returns 200.
3. Spot-check: latest `AuditLog."createdAt"`, row counts of `User`, `QuestionAttempt`, `Payment` against production.
4. Record the time from "start restore" to "ready" (RTO) and the gap to the last committed write (RPO); destroy the
   instance.

**Secrets.** Keep secrets in the platform's secret store (AWS Secrets Manager / SSM, Azure Key Vault), injected as
environment variables; never in images (the Dockerfile reads the build database URL from a BuildKit secret and
`.dockerignore` excludes `.env*`), never in git.

| Secret | Rotation |
|---|---|
| Database passwords (`app_rw`, owner) | Create the new password (`ALTER ROLE … PASSWORD`), update the secret store, roll the pooler (or its userlist), then web/worker. Yearly or on staff change |
| `SESSION_SECRET` | No dual-key support yet: rotating it invalidates in-flight OTP codes (10 min), sealed auth-flow values, unredeemed family link codes, rate-limit buckets, payer fingerprints and in-flight payment return links. Database sessions are unaffected (stored as plain SHA-256). Rotate in a quiet window; only on suspected compromise until a `SESSION_SECRET_PREVIOUS` fallback exists |
| `ANTHROPIC_API_KEY`, `STRIPE_*`, `PAYNOW_*`, `WHATSAPP_*`, `S3_*`, `RESEND_API_KEY`, `TWILIO_AUTH_TOKEN`, `AFRICASTALKING_API_KEY` | Create the new credential at the provider, deploy it, then revoke the old one (zero downtime; Twilio: rotate via a secondary auth token, then promote it) |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | Changes with each build unless set; set and rotate at a release |

---

## 11. Go-live checklist

**Blockers (must be done before real students):**

- [ ] **Email provider live (accounts depend on it).** Sign-up, sign-in codes, password resets, security notices and
      invitations all go by email (owner decision 2026-10-07; SMS is off). The Resend adapter
      (`src/server/messaging/providers.ts`, plain `fetch`) is tested only against mocked responses. Before real
      students: verify the `EMAIL_FROM` domain at Resend (SPF, DKIM and DMARC), re-check the request/response shapes
      against Resend's current docs, and on staging with the real key send a sign-up code and a password reset to
      Gmail / Outlook / Yahoo addresses (inbox, not spam), plus a revoked key to see the logged `reason`. Watch
      `messaging.email` log lines and `notifications.send` dead jobs after launch. (SMS stays off: if it is ever
      switched on, first confirm Zimbabwe coverage in writing for Econet, NetOne and Telecel and verify the chosen
      adapter the same way.)
- [ ] **Build pipeline with a build database** (§2) or the database-free build follow-up.
- [ ] **Payments live:** Paynow integration ids/keys per currency, `PAYNOW_TEST_MODE=false`; Paynow result URLs
      reachable from Paynow; one real low-value transaction (EcoCash, OneMoney and a card on the Paynow page) and a
      refund; reconciliation job (`payments.reconcile`) observed; `sandbox` removed. Stripe is dormant
      (`features.stripe` off): no Stripe keys or webhook are needed.
- [ ] **WhatsApp:** dormant (`features.whatsapp` off; the webhook answers 404). Only before switching it on: business
      verification, number, message templates approved in Meta Business Manager (docs/WHATSAPP.md "Templates"),
      webhook `https://<host>/api/webhooks/whatsapp` subscribed, Graph API version re-checked against current Meta docs.
- [ ] **Legal review:** terms, privacy notice and cookie notice (`/legal/*`), parental consent for minors, data
      residency / cross-border transfer under Zimbabwe's Cyber and Data Protection Act, content licences (§27).
- [ ] **Section D** verified on the production database (migrate job passes; `/api/ready` shows
      `dbSafety.enforced: true` with no failures).
- [ ] **Object storage:** `STORAGE_DRIVER=s3` verified against the real bucket in staging (upload, view, delete,
      media job), or a single-host deployment with a backed-up volume.

**Before launch:**

- [ ] DNS and TLS: CDN in front, HSTS (already sent in production; add `preload` only once the domain is final),
      HTTP → HTTPS redirect, `APP_URL` matching the public origin, `TRUSTED_PROXY_HOPS` / `CLIENT_IP_HEADER` set
      for the real proxy chain (Cloudflare + ALB: `TRUSTED_PROXY_HOPS=2`, or `CLIENT_IP_HEADER=cf-connecting-ip`; ALB
      locked to Cloudflare's ranges; §1 "Client IP: exact values"), the boot log shows the expected
      `client IP policy` and no `client IP configuration warning`, and the outside verification in §1 passes.
- [ ] Optional features (`/admin/settings` → "Optional features"): AI, WhatsApp, optional email, SMS and Stripe are
      all off at launch (owner decision 2026-10-07). Account email does not depend on them. Before switching SMS on:
      `SMS_PROVIDER` configured and the SMS budget (`messaging.smsBudget`) reviewed: `allowedCountryPrefixes` lists
      only the countries you serve (default `+263`) and `dailyMax` (default 2,000) sized to the expected volume.
- [ ] CSP nonce hardening for the authenticated areas (`next.config.ts` notes the plan: nonce-based `script-src` from
      `src/proxy.ts` for `/app`, `/admin`, …), or a recorded decision to launch with the current policy.
- [ ] `ANTHROPIC_API_KEY` set; `ai.budget.dailyCostCeilingMicros`, `ai.routing` and `ai.limits` reviewed in
      `/admin/ai/settings`; every SUPER_ADMIN has a verified email so the once-a-day budget alert reaches them (§9).
- [ ] `app_maintenance` role created and the audit-log retention purge scheduled weekly (§4 "Scheduled operations");
      first `--dry-run` checked.
- [ ] Exchange rates for revenue reports (`fx.rates` in `/admin/settings`) entered from a checked source if ZWG (or any
      non-USD) prices are sold, or accepted that revenue is reported per currency only.
- [ ] Google OAuth client with the production redirect URI, if Google sign-in is offered.
- [ ] Catalogue seeded; real, reviewed content PUBLISHED through the CMS (no demo data anywhere).
- [ ] Backups, PITR and the first restore drill done; alerts and uptime checks firing to a real on-call.
- [ ] Load test of an exam-season evening on staging (ARCHITECTURE §9.12).
- [ ] Bundle budgets re-baselined or accepted (CI reports 37 routes over budget; the framework floor is ~144–148 kB gzip).
- [ ] Error-tracking vendor chosen and wired at the hook points (§9).

---

## 12. Known gaps and follow-ups

- `docker build`, the compose stack and the CI workflow have not been executed yet (no Docker on the development
  machine); the CI `image` job is their first run.
- Database-free image builds: wrap `generateStaticParams` of `/daily/[board]/[qualification]` in
  `staticParamsOrEmpty` and give the marketing loaders a build-time fallback, then drop the build database.
- S3: automatic credentials from ECS task roles / instance profiles; short-lived signed URLs (`/api/media` streams
  every object today); multipart uploads are unnecessary at the current 20 MB cap.
- `SESSION_SECRET_PREVIOUS` for zero-impact rotation.
- `onRequestError` and a vendor for error tracking; OpenTelemetry traces (ARCHITECTURE §10.6).
- Messaging: delivery receipts (Resend webhooks, and Twilio / Africa's Talking reports if SMS is ever switched on)
  are not wired, so "sent" means "accepted by the provider"; no automatic fallback to a second email provider; OTP
  codes are sent inline (one in-process retry), other direct sends (invitations, security notices, admin emails) are
  not queued, so they are not retried; only Resend honours the `idempotencyKey` that `notifications.send` passes;
  staging has no recipient allow-list.
- The worker has no health endpoint; liveness is the process itself (it exits on fatal errors). A heartbeat file or
  port could be added for orchestrators that need one.

---

## Appendix: Railway (owner decision 2026-10-10)

Production runs on Railway, project `caring-stillness` (environment `production`), three services in **EU West
(Amsterdam)** on Railway's private network. Railway has no African region; put Cloudflare in front (§1). (A Vercel +
Neon plan was dropped the same day; `GET /api/cron/jobs` and `after()` for email sends came from it and stay: the
route is unused while a worker runs, and `after()` is harmless in a long-running server.)

| Service | Source | Settings (Railway dashboard) |
|---|---|---|
| `Postgres` | image `ghcr.io/railwayapp-templates/postgres-ssl:18`, volume `postgres-volume` | Public TCP proxy on (builds and the release script use it) |
| `LearningPortal` (web) | GitHub `main`, builder Dockerfile, path `/Dockerfile.railway` | Public domain on port 8080; healthcheck `/api/ready`; watch paths `/src/**`, `/public/**`, `/prisma/**`, `/scripts/**`, `/package.json`, `/package-lock.json`, `/next.config.ts`, `/Dockerfile.railway` (content and scratch commits do not rebuild) |
| `worker` | duplicate of web | Start command `node --enable-source-maps worker/index.mjs`; no healthcheck; no public domain |

Settings live in the dashboard: Railway's config-as-code is deprecated and services that never used it cannot opt in
(since 2026-08-28), so there are no `railway.json` files.

**Variables.** Web and worker: everything in §7 for production. `DATABASE_URL` = `app_rw` on the **private** host
(`postgres.railway.internal:5432/dzidza`); `PORT=8080`; `EMAIL_PROVIDER=resend`; `PAYMENTS_ENABLED_PROVIDERS=paynow`;
`STORAGE_DRIVER=s3`; `CLIENT_IP_HEADER=x-real-ip` (`cf-connecting-ip` once Cloudflare is in front). Web builds also
need `APP_URL`, `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_SUPPORT_EMAIL` and `BUILD_DATABASE_URL` = `app_build` (read-only)
through the **public proxy**: Railway passes variables to Docker builds as build arguments (no secret mounts) and builds
cannot reach the private network. Never put the owner or `app_rw` URL there, and never set `MIGRATION_DATABASE_URL` on a
service.

**First release** (owner, from this repo on a trusted machine; every password is typed into a hidden prompt):

1. `psql "<Postgres DATABASE_PUBLIC_URL>" -f scripts/sql/railway-setup.sql`: roles `dzidza_owner`, `app_rw`,
   `app_build`, `app_maintenance`, database `dzidza`, production guards.
2. `powershell -ExecutionPolicy Bypass -File scripts/railway-release.ps1 -FirstRun`: migrations, grants and section D
   (`scripts/db-deploy.ts` as the owner), the catalogue seed and the content import (IN REVIEW).
3. Deploy web and worker; register on the site with the owner's email and verify it.
4. `scripts/railway-release.ps1 -BootstrapEmail <email>`: makes that account the first SUPER_ADMIN
   (`src/server/accounts/bootstrap-admin.ts`; refused once any active super admin exists; audited).
5. `scripts/railway-release.ps1 -PublishAs <email>`: dry run, then publish after the reviewer types PUBLISH (§41).

Later releases with a new migration: `scripts/railway-release.ps1` (no switch) before the deploy.

`app_build` is read-only: if a prerendered page ever writes during the build, the build fails loudly rather than
writing as the build role. Builds take the 4 GB heap of `scripts/next-build.mjs` (the plan allows 8 GB per replica).

## Appendix: local verification of the production setup

```powershell
# Production build into a private dist dir (needs the dev database for prerendering)
$env:NEXT_DIST_DIR=".next-deploy"; $env:NODE_ENV="production"; $env:APP_URL="https://dzidza.example"
$env:SESSION_SECRET="<32+ random chars>"; npm run build
node scripts/build-worker.mjs                       # -> build/worker/index.mjs
npx tsx scripts/db-deploy.ts --verify-only          # with MIGRATION_DATABASE_URL set (owner)
# Delete .next-deploy and build/ afterwards (disk), and do not commit the tsconfig.json include lines Next adds.
```
