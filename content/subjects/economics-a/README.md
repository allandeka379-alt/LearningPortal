# Economics (A-Level) — `economics-a`

Study content for two syllabi that share one concept registry (`content/concepts/economics-a.json`):

- **ZIMSEC A-Level Economics** (Forms 5–6, 2015-2022) — `content/syllabi/zimsec/a-level/economics/2015-2022.json`
- **Cambridge International AS & A Level Economics 9708** (2026-2028) — `content/syllabi/cambridge/a-level/economics/2026-2028.json`
  (AS content, A Level content and examination skills as sections)

Generators and the writers' brief: `.scratch/economics-a/` (`concepts.mjs`, `build-syllabi.mjs`, `lib.mjs`, `tables/*.mjs`
worked examples and lesson generators, `slices/*.mjs` → `build-content.mjs`, `build-assessments.mjs`, `BRIEF.md`); shared
tools in `.scratch/tools/`.

> **Review status.** Written on 2026-10-10/15 by eight AI writer agents (Claude Sonnet, medium effort) to
> `.scratch/economics-a/BRIEF.md`; every elasticity, cost and revenue schedule, multiplier, index number, national income
> figure and trade gain computed in code. Answer keys were re-checked by the writers (one wrong key found and fixed in
> W2b). Checked by the validator (strict: 0 errors, 0 warnings), the length-cue checks (0 flagged; the key is the unique
> longest option in 23% of single-answer MCQs) and the marking harness. **No independent AI review and no human review.**
> Per the owner decision of 2026-10-12, content is published to production by the deploy's migrate step.

## At a glance

| | Total | ZIMSEC | 9708 |
| --- | --- | --- | --- |
| Lessons | 106 | | |
| Questions | 2,395 | 2,128 | 2,163 |
| Flashcards | 947 | | |
| Topic tests | 23 | 12 | 11 |
| Mock exams | 7 | Papers 1-3 | Papers 1-4 |

## Assessments

`.scratch/economics-a/build-assessments.mjs` (every rule guaranteed). Topic tests are 20 marks in 25 minutes; the
Cambridge examination-skills topics have no topic test of their own (they are practised inside the other tests).

- **ZIMSEC**: P1 40 MCQs (90 min); P2 two 20-mark data-response questions (75 min); P3 twelve 25-mark essays (10 + 15),
  answer any four (180 min).
- **9708**: P1 30 AS MCQs (60 min); P2 a 20-mark AS data response, then one micro and one macro 20-mark essay (8 + 12)
  chosen from two of each (120 min); P3 30 A Level MCQs (75 min); P4 a 20-mark A Level data response, then one micro and
  one macro 20-mark essay chosen from two of each (120 min).

Question sizes, the 10 + 15 and 8 + 12 essay splits and the part marks of data items are our conventions; ZIMSEC
continuous assessment is not simulated.

## DEV preview

Imported and published in the DEV database on 2026-10-15 (`--approver demo.admin@example.test`): 106 lessons, 2,395
questions, 947 flashcards and 30 tests; 3,478 items published, 0 failed. Smoke test
`npx tsx --conditions=react-server .scratch/tools/smoke-family.ts economics-a`: **78/78 checks passed** (both syllabi,
all 7 mocks).

## Needs a specialist teacher's check

1. Zimbabwe context stated at a general level (no figures): the 2007-2008 hyperinflation, the multi-currency period from
   2009, mobile money, the Reserve Bank and ZIMRA, the Look East policy, ZIMASSET, the TNDP, NDS1 2021-2025 and Vision
   2030, land reform and the Fast Track programme (`central-planning-zimbabwe`, `wages-land-policies`, `bop-accounts`).
2. Board-scope notes in key-fact boxes (for example that the ZIMSEC syllabus does not list supply-side policy separately;
   J-curve and Marshall-Lerner tagged Cambridge only).
3. Conventions: the multiplier as 1/(MPS + MPT + MPM), the cash-drain credit multiplier, the illustrative
   expectations-augmented Phillips curve, and the older ZIMSEC balance of payments layout.
4. The exam part structures and mark splits (see Assessments).
