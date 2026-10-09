# Business Studies and Commerce (O-Level / IGCSE) — `business-commerce-o`

Study content for three syllabi that share one concept registry (`content/concepts/business-commerce-o.json`, 128
`bus.*` concepts):

- **ZIMSEC O-Level Commerce** (Forms 1–4, 2015-2022) — `content/syllabi/zimsec/o-level/commerce/2015-2022.json`
- **ZIMSEC O-Level Business Enterprise and Skills** (Forms 1–4, 2015-2022; catalogue slug `business-studies`) —
  `content/syllabi/zimsec/o-level/business-studies/2015-2022.json`
- **Cambridge IGCSE Business 0264** (2027-2029; replaces Business Studies 0450) —
  `content/syllabi/cambridge/igcse/business-studies/2027-2029.json`

Formats, quality bar and workflow: `docs/CONTENT_PIPELINE.md`. Generators and the writers' brief: `.scratch/business/`
(`build-syllabi.mjs`, `lib.mjs` with checked formula, cash-flow, break-even and statement helpers, `check-preview.mjs`,
`tables/*.mjs`, `slices/*.mjs` → `build-content.mjs`, `build-assessments.mjs`, `BRIEF.md`); shared tools in
`.scratch/tools/`.

> **Review status.** Written on 2026-10-09 by eight AI writer agents (Claude Opus, medium effort) working to
> `.scratch/business/BRIEF.md`; every figure was computed in code. Checked by the validator (strict: 0 errors, 0
> warnings), `content:check` (no findings), the length-cue check (0 flagged) and the marking harness. **No independent
> AI review and no human review yet.** Production publishing requires a human reviewer (§41).

## At a glance

| | Total | Commerce | BES | 0264 |
| --- | --- | --- | --- | --- |
| Concepts covered | 128 | 77 | 70 | 73 |
| Lessons (free preview) | 128 (16) | | | |
| Questions | 2,301 | 1,339 | 1,207 | 1,226 |
| Flashcards | 1,091 | | | |
| Topic tests | 23 | 10 | 7 | 6 |
| Mock exams | 6 | Papers 1 and 2 | Papers 1 and 2 | Papers 1 and 2 |

Questions by type: MCQ 944, structured 328, short answer 306, true/false 258, matching 141, fill-in-the-blank 128,
numerical 100, calculation 96. Difficulty 1: 346, 2: 997, 3: 569, 4: 321, 5: 68. 328 are exam-format items; 266 may
be daily questions. 56% of marks are self-marked (essays, case-study answers, explanations).

## Assessments

Built by `.scratch/business/build-assessments.mjs` (every rule guaranteed). Topic tests are 20 marks in 25 minutes.

- **Commerce Paper 1** (75 min, 40): 40 MCQs. **Paper 2** (120 min, 100): six compulsory structured questions
  (4 × 7 + 2 × 6 marks, our split) and three essays chosen from seven (20 marks each).
- **BES Paper 1** (105 min, 100): six compulsory structured questions (4 × 17 + 2 × 16, our split). **Paper 2**
  (135 min, 100): a 40-mark case study and three essays chosen from six.
- **0264 Paper 1** (90 min, 80): four 20-mark data-response questions. **Paper 2** (90 min, 80): one complete
  case-study paper (four 20-mark questions on one case with appendices).

Exam-format mark values (6, 7, 16, 17, 20, 40, 80 for STRUCTURED) are reserved for these papers. Part labels in the
0264 Paper 2 are "(1)"-"(4)" with sub-parts "(a)"/"(b)" because the validator rejects "1(a)".

## DEV preview

Imported and published in the DEV database on 2026-10-09 (DEV-preview note, `--approver demo.admin@example.test`): 3 syllabus versions (72, 58 and 96 topics), 128 lessons, 2,301 questions, 1,091 flashcards and 29 tests; 3,549 items published, 0 failed; the three subjects became AVAILABLE. Smoke test `npx tsx --conditions=react-server .scratch/tools/smoke-family.ts business-commerce-o`: **85/85 checks passed**.

## Known gaps

1. **Catalogue name/code**: the Cambridge subject is still listed as "Business Studies 0450"; from 2027 it is
   "Business 0264" (an owner decision to rename in the seed/CMS).
2. **Mark splits** inside every exam item are ours (no syllabus prints them); several Cambridge Paper 1 items have
   slightly under a third of their marks auto-marked.
3. **Self-marking** of essays and case studies (AI marking off).
4. **Commercial Studies** (a separate Forms 3-4 Ministry syllabus overlapping Commerce by about 80%) is not built.
5. **ZIMSEC details**: subject codes not printed (Commerce commonly 7103); Form placements uncertain where the tables
   were scrambled in the copies read; institutions named in 2015 documents may have changed.

## Needs a specialist teacher's check

The 51% indigenisation rule and its later amendments; trading-bloc headquarters and members; NSSA benefits (named
without rates); consumer-protection bodies after the 2019 Consumer Protection Act; ZIPO, ARIPO and WIPO references;
POTRAZ; the World Bank, IMF and African Development Bank statements. Interest and tax rates in questions are always
stated as assumptions.

## Maintenance

- Rebuild: `node .scratch/business/build-content.mjs` (deterministic). Syllabi: `node .scratch/business/build-syllabi.mjs`.
- Assessments: `npx tsx --conditions=react-server .scratch/tools/inventory.ts business-commerce-o .scratch/business/inventory.json`
  then `node .scratch/business/build-assessments.mjs --write`.
- Checks: `npm run content:validate -- business-commerce-o --strict`, `npm run content:check -- business-commerce-o`,
  `node .scratch/tools/length-cue.mjs business-commerce-o`. Smoke: `npx tsx --conditions=react-server
  .scratch/tools/smoke-family.ts business-commerce-o`.
