# Development seed

How the database is seeded, what the **development-only** demo data contains, and the demo accounts you can sign in
with. Product references: §2–§4 catalogue, §26 versioning, §31 prices, §47 content, §50 "realistic seed/demo data only
in development".

> **Never in production.** Demo data is refused when `NODE_ENV=production` **and** independently when the database
> reports `app.environment = 'production'` (every demo row is `isDemo = true`, which the database itself rejects in
> production). The demo password below exists only for local development.

## Commands

| Command | Seeds |
| --- | --- |
| `npm run db:seed` | ALWAYS data only (safe in every environment) |
| `npm run db:seed:demo` | ALWAYS data + DEV-ONLY demo data |
| `SEED_DEMO=1 npm run db:seed` | Same as `--demo` |

Both run `tsx --conditions=react-server prisma/seed.ts` against `DATABASE_URL` (the `app_rw` role, so every CHECK,
trigger and privilege applies exactly as in the app). The seed is **idempotent**: rows are created when missing (by
natural key) and existing rows are never modified, so admin edits survive re-seeding and a second run reports
"nothing new". A full run with demo data takes about 20 seconds; a re-run about 4 seconds.

The demo run ends with a full search reindex (`reindexAll`, logged as "search index rebuilt …"): the seed writes rows
directly instead of going through the publish flows that enqueue `search.reindexEntity` jobs, so without it
`/app/search` would find nothing until the worker's weekly `search.reindexAll` safety net (Sunday 03:00 CAT).

Published content is immutable, so changed demo data files are **not** re-applied to existing rows (the seed prints a
warning when it notices drift). To pick up changed demo content, reset the dev database and seed again:

```powershell
npm run db:reset        # prisma migrate reset --force (dev database only)
npm run db:grants
npm run db:seed:demo
```

## ALWAYS data (every environment)

| Data | Source file | Notes |
| --- | --- | --- |
| Country (Zimbabwe), year groups (Form 1–4, Lower/Upper Sixth) | `prisma/seed/data/catalogue.ts`, `catalogue-extra.ts` | |
| Boards ZIMSEC (`ZIMSEC`) and Cambridge (`CAIE`), offered in ZW | same | `AVAILABLE` |
| Levels O-Level / A-Level; 4 qualifications | same | Qualifications start `COMING_SOON` (listed honestly, not enrollable) |
| 6 subject categories, 105 subjects | same | `verified: false` → seeded **`HIDDEN` with no `sourceId`**: never shown to students until the content team verifies name, code and availability against the board's official list, records that list as the subject's ContentSource and moves it to `COMING_SOON` / `AVAILABLE` |
| Grade schemes (one default per qualification) | same | Flagged estimates (`isEstimate`, disclaimer shown next to every estimated grade) |
| Plans FREE (free preview, the default plan) and FULL_ACCESS with its one-off price **USD 1.00** (ONE_OFF, no end date = lifetime); STUDENT / PREMIUM / SCHOOL created inactive and hidden (retired) | `prisma/seed/data/platform.ts` | Owner decision 2026-10-07: the Full access price is real data in every environment (create-only: an admin price change is never undone). On an existing database the run that first creates FULL_ACCESS also retires the old plans and turns FREE into the free preview, once (`applyOneOffPricingModel`) |
| 9 achievements | same | Codes converted to UPPER_SNAKE (`streak-3` → `STREAK_3`, required by `Achievement_values_chk`); criteria mapped to the documented `{ type: "STREAK_DAYS", days }` contract |
| Settings (AI routing/limits/budget, XP, study defaults, rate limits, notification retention) | `platform.ts`, `settings-extra.ts` | Validated against `SETTING_DEFINITIONS` before insert |
| ContentSource "Original content" | `catalogue-extra.ts` | Provenance for the team's own content (§27) |

## DEV-ONLY demo data (`--demo`)

### Accounts

Every demo account uses the password **`demo-pass-2026`** (override with `SEED_DEMO_PASSWORD`), a reserved
`example.test` address (never deliverable) and a verified email. All are `isDemo`.

| Email | Role | Notes |
| --- | --- | --- |
| `demo.student@example.test` | STUDENT | ZIMSEC O-Level, Form 4, minor with guardian consent granted through the demo parent; enrolled in **O-Level Mathematics** pinned to the demo syllabus; member of the demo school and class; target exam "November 2026" (provisional demo session) |
| `demo.student2@example.test` | STUDENT | Cambridge IGCSE, Form 4, adult (no guardian consent needed); enrolled in **IGCSE Chemistry**; target "October/November 2026" |
| `demo.parent@example.test` | PARENT | ACTIVE link to `demo.student` (student consent via code; no AI-conversation access) |
| `demo.teacher@example.test` | TEACHER | TEACHER member of the demo school; LEAD teacher of class "Form 4A Mathematics (demo)" |
| `demo.schooladmin@example.test` | SCHOOL_ADMIN (via membership) | No platform roles: SCHOOL_ADMIN is held through `SchoolMember` only |
| `demo.editor@example.test` | CONTENT_EDITOR | Author (`createdById`) of all demo content |
| `demo.admin@example.test` | ADMIN | Approver of all demo content (different from the author, so four-eyes holds) |
| `demo.superadmin@example.test` | SUPER_ADMIN | |

Demo school: "Demo Secondary School (development only)" (`demo-secondary-school`, ACTIVE, verified). Demo class join
code: **`DEMO4A`**.

### Provisioned roster (school-created username accounts)

Three students as a roster import creates them (`prisma/seed/demo/roster.ts`): a login **username** instead of an
email or phone, `provisionedBySchoolId` = the demo school, ACTIVE school members (source `ROSTER_IMPORT`, with a
student number), ACTIVE members of class "Form 4A Mathematics (demo)" and enrolled in O-Level Mathematics (via
`SCHOOL`). Their passwords are **temporary passwords the school knows** (`passwordMustChange = true`): signing in
goes straight to **/change-password**, which also asks them to accept the Terms of Use; every other page and action is
held until they choose their own password. Onboarding comes next (they have no subjects chosen by themselves yet).

| Username | Temporary password | Name | Student number |
| --- | --- | --- | --- |
| `dss.tmoyo01` | `msasa-river-4127` | Tendai Moyo | DSS-0001 |
| `dss.rncube02` | `granite-hill-5381` | Rudo Ncube | DSS-0002 |
| `dss.fchirwa03` | `zambezi-dawn-6274` | Farai Chirwa | DSS-0003 |

Re-seeding never resets a roster student who already changed their password. To get a fresh temporary password, sign
in as `demo.schooladmin@example.test` and use **Reset password** on the student's page under /school/students (the
new slip shows the password once), or reset the dev database.

### Class work

| Data | Notes |
| --- | --- |
| Assignment "Read before Monday: the first lesson of the topic (demo)" | A published LESSON assignment of the first demo Mathematics lesson, set by `demo.teacher` through the teaching service, due 7 days after seeding at 17:00 Harare time, late work allowed. Every ACTIVE class member (the demo student and the roster) has a progress row and a "New work" notification |
| Announcement "Welcome to Form 4A Mathematics (demo)" | Pinned CLASS announcement by `demo.teacher` (`isDemo`). The in-app notifications are written by the worker's `announcements.fanout` job: run `npm run worker` once |

### Other demo rows

| Data | Notes |
| --- | --- |
| Exam sessions | The next two sessions of every series in `EXAM_SERIES` (e.g. November 2026 and November 2027 for ZIMSEC O-Level), `PUBLISHED`, `isProvisional`, `isDemo`. Dates come from each series' **typical months**, not an official timetable |
| Plan prices | `devSamplePrices` from `platform.ts`, labelled "Sample price (development only)", `isDemo`: none since 2026-10-07 (the retired plans no longer get samples; Full access has its real USD 1.00 price) |
| ContentSource "Demo content — development only" | Source of every demo content row |
| FAQ | 2 published `isDemo` entries that describe the development environment itself (demo FAQs are excluded from the public site in production) |

### Demo curriculum content

Two subjects are made `AVAILABLE` (with their qualifications) in development so the student flows can be exercised:
**ZIMSEC O-Level Mathematics** and **Cambridge IGCSE Chemistry**. Each gets:

- a syllabus version titled **"Demo syllabus (development only — not official)"** (`versionLabel = demo-development`,
  `isDemo`, OWNED, published as CURRENT) with 5 topics, 13–14 subtopics, learning objectives and two demo papers
  (components). It is a demonstration structure, **not** the official syllabus;
- 3 rich lessons using `:::definition`, `:::worked-solution`, `:::formula`, `:::keyfact`, `:::mistake`,
  `:::exam-tip`, `:::summary`, tables and KaTeX / mhchem maths, with embedded practice questions. Rendered HTML is
  persisted on the row (`bodyHtml`, `renderVersion`, `contentHash`);
- 45 (maths) / 44 (chemistry) ORIGINAL questions covering all 11 types and difficulties 1–5, with explanations,
  hints, worked solutions, MCQ rationales, our own mark schemes for essays/extended answers, and pre-rendered
  `renderedHtml`. Diagram-labelling questions use generated shapes-only diagrams (a circle's parts; a sodium atom)
  stored under `storage/demo/2026/01/` as READY PUBLIC MediaAssets with alt text;
- 17 flashcards;
- one FIXED topic test (FREE, 30 minutes) and one two-paper FIXED mock exam (PREMIUM, each paper timed separately);
- a daily question for each of the next 14 days (Africa/Harare calendar days), cycling through daily-eligible
  questions.

Every content row goes through the real workflow (DRAFT → IN_REVIEW → APPROVED → PUBLISHED) with the shared publish
helper (`src/server/content/publish.ts`), so each has its ContentRevision snapshot and an AuditLog entry. All demo
content is original and was checked: `src/server/curriculum/demo-seed-data.test.ts` validates every question and marks
its intended answer (full marks) and a wrong answer (less) with the real marking engine.

## Row counts after `npm run db:seed:demo` on an empty database

| Table | Rows | Table | Rows |
| --- | ---: | --- | ---: |
| Country | 1 | User | 8 |
| ExamBoard | 2 | School / Class | 1 / 1 |
| QualificationLevel | 2 | ParentStudentLink | 1 |
| Qualification | 4 | SubjectEnrollment | 2 |
| YearGroup | 6 | Syllabus | 2 |
| SubjectCategory | 6 | SyllabusComponent | 4 |
| Subject | 105 | Topic | 37 |
| GradeScheme / GradeBand | 4 / 29 | LearningObjective | 32 |
| Plan / PlanPrice | 5 / 1 (fresh database) | MediaAsset | 2 |
| Achievement | 9 | Question roots / parts | 89 / 14 |
| Setting | 8 | QuestionOption | 84 |
| ContentSource | 2 | Lesson / Flashcard | 6 / 34 |
| ExamSession | 14 | Assessment / AssessmentItem | 4 / 49 |
| FaqItem | 2 | DailyQuestion | 28 |
| | | ContentRevision | 133 |

Without `--demo` the seed creates only the left-hand catalogue/platform rows (the Full access price is the only PlanPrice; no ExamSession, users or
content; ContentSource = 1).
