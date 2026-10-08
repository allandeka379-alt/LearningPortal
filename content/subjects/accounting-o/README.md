# Accounting (O-Level / IGCSE) — `accounting-o`

Study content for two syllabi that share one concept registry (`content/concepts/accounting-o.json`, 66 `acc.*`
concepts):

- **ZIMSEC O-Level Principles of Accounting** (Forms 1–4 syllabus, 2015-2022) — `content/syllabi/zimsec/o-level/accounting/2015-2022.json`
- **Cambridge IGCSE Accounting 0452** (2027-2029) — `content/syllabi/cambridge/igcse/accounting/2027-2029.json`

Formats, quality bar and workflow: `docs/CONTENT_PIPELINE.md`. Generators and the writers' brief:
`.scratch/accounting/` (`build-syllabi.mjs`, `lib.mjs` with balance-checked ledger, journal, trial-balance and
statement helpers, `tables/*.mjs` per writer, `slices/*.mjs` → `build-content.mjs`, `build-assessments.mjs`,
`BRIEF.md`); shared tools in `.scratch/tools/`.

> **Review status.** Written on 2026-10-08 by eight AI writer agents (Claude Opus, medium effort) working to
> `.scratch/accounting/BRIEF.md`; every ledger account, statement and calculation is built by code that throws if the
> figures do not balance. Checked by the validator (strict: 0 errors, 0 warnings), `content:check` (no findings), the
> length-cue check (0 flagged) and the marking harness. **No independent AI review and no human review yet.**
> Production publishing requires a human reviewer (§41).

## At a glance

| | Total | ZIMSEC | 0452 |
| --- | --- | --- | --- |
| Concepts covered | 66 | 62 | 63 |
| Lessons (free preview) | 66 (7) | | |
| Questions | 1,268 | 1,129 | 1,178 |
| Flashcards | 573 | | |
| Topic tests | 13 | 6 | 7 |
| Mock exams | 4 | Paper 1, Paper 2 | Paper 1, Paper 2 |
| Images | 0 | | |

Questions by type: MCQ 540, structured 157, true/false 144, short answer 115, calculation 91, numerical 79, matching
71, fill-in-the-blank 71. Difficulty 1: 135, 2: 560, 3: 373, 4: 156, 5: 44. 157 are exam-style (including 24
twenty-mark Paper 2 questions, 12 per board); 147 may be daily questions. 32% of marks are self-marked (layouts and
explanations; numerical answers are auto-marked). Lessons run 1,060-2,400 words counted with their ledger tables.

Free-preview lessons: the accounting equation, double entry, accounting concepts (foundation), the trial balance,
depreciation methods, the income statement and profitability ratios.

## Assessments

Built by `.scratch/accounting/build-assessments.mjs` (every rule guaranteed). Topic tests are 20 marks in 25
minutes; ZIMSEC's 21 small topics are grouped into six tests (foundations; books of prime entry; verification;
statements and adjustments; other organisations; incomplete records and ratios); Cambridge has one per topic.

- **ZIMSEC Paper 1** and **0452 Paper 1** (90 min, 40 marks): 40 four-option MCQs spread over every topic in
  proportion to the bank.
- **ZIMSEC Paper 2** (90 min as printed, 100 marks) and **0452 Paper 2** (105 min, 100 marks): five compulsory
  20-mark structured questions on stimulus material, spread over the topics.

## DEV preview

Imported and published in the DEV database on 2026-10-08 (DEV-preview note, `--approver demo.admin@example.test`):
2 syllabus versions (37 and 35 topics), 66 lessons, 1,268 questions, 573 flashcards and 17 tests; 1,924 items
published, 0 failed; both subjects became AVAILABLE. Smoke test `npx tsx --conditions=react-server
.scratch/tools/smoke-family.ts accounting-o`: **52/52 checks passed**.

## Known gaps

1. **Layouts are self-marked.** Ledger accounts, journals and statements that a student writes cannot be marked
   automatically; numerical answers and MCQs are. The model layouts are shown after submission.
2. **ZIMSEC paper details**: the Paper 2 duration (printed as 1 hour 30 minutes) and the ZIMSEC code (commonly 7112)
   need confirming; the document's tables were scrambled in the copy read.
3. **Terminology**: ZIMSEC items use ZIMSEC terms where they differ, but generated statements say "Inventory" rather
   than "Stock" (both are acceptable).
4. **Cambridge 2027-2029 only**: 2026 candidates sit the previous syllabus, which is not in the repository.

## Needs a specialist teacher's check

The partnership "no agreement" rules (including 5% interest on partners' loans) follow the UK Partnership Act 1890
used by textbooks: confirm they suit ZIMSEC. ROCE for sole traders uses capital + non-current liabilities (the
Cambridge syllabus prints the company formula). Company items deduct dividends paid; proposed dividends appear only in
a note. The lessons name ZIMRA and give 2 to 20 partners for a partnership. Check the ZIMSEC tree against a clean copy
of the document.

## Maintenance

- Rebuild questions and flashcards: `node .scratch/accounting/build-content.mjs` (deterministic). Syllabi and
  registry: `node .scratch/accounting/build-syllabi.mjs`. Note: `tables/w4b-lib.mjs` imports `tables/w3b-lib.mjs`.
- Assessments: `npx tsx --conditions=react-server .scratch/tools/inventory.ts accounting-o .scratch/accounting/inventory.json`
  then `node .scratch/accounting/build-assessments.mjs --write`.
- Checks: `npm run content:validate -- accounting-o --strict`, `npm run content:check -- accounting-o`,
  `node .scratch/tools/length-cue.mjs accounting-o`. Smoke: `npx tsx --conditions=react-server
  .scratch/tools/smoke-family.ts accounting-o`.
