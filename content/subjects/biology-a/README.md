# Biology (A-Level) — `biology-a`

Study content for two syllabi that share one concept registry (`content/concepts/biology-a.json`):

- **ZIMSEC A-Level Biology** (Forms 5–6, 2015-2022) — `content/syllabi/zimsec/a-level/biology/2015-2022.json`
- **Cambridge International AS & A Level Biology 9700** (2025-2027) — `content/syllabi/cambridge/a-level/biology/2025-2027.json`
  (AS content, A Level content and practical skills as sections)

Generators and the writers' brief: `.scratch/biology-a/` (`concepts.mjs`, `build-syllabi.mjs`, `lib.mjs`, `tables/*.mjs`
worked-example and data checks, `slices/*.mjs` → `build-content.mjs`, `build-assessments.mjs`, `BRIEF.md`); shared tools
in `.scratch/tools/`.

> **Review status.** Written on 2026-10-09/10 by eight AI writer agents (Claude Opus, medium effort) to
> `.scratch/biology-a/BRIEF.md`; every calculation (magnification, water potential, chi-squared, t-test, Spearman,
> Hardy-Weinberg, Simpson's index) computed in code, and the codon table self-checked. Checked by the validator (strict:
> 0 errors, 0 warnings), the length-cue checks (0 flagged; key is the unique longest option in 20% of MCQs) and the
> marking harness. `content:check` reports 26 lesson-reuse and 10 question-reuse findings: standard values (p = 0.05,
> chi-squared, t and Spearman critical values, 70S/80S, energy values of food), which stems must state. **No independent
> AI review and no human review yet.** Production publishing requires a human reviewer (§41).

## At a glance

| | Total | ZIMSEC | 9700 |
| --- | --- | --- | --- |
| Lessons (free preview) | 106 (17) | | |
| Questions | 2,208 | 1,790 | 1,880 |
| Flashcards | 923 | | |
| Topic tests | 34 | 14 | 20 |
| Mock exams | 9 | Papers 1-4 | Papers 1-5 |

52% of marks are self-marked (essays, explanations, planning and drawing descriptions).

## Assessments

`.scratch/biology-a/build-assessments.mjs` (every rule guaranteed). Topic tests 20 marks in 25 minutes; 9700 transport in
mammals and gas exchange are merged.

- **ZIMSEC**: P1 40 MCQs (60 min); P2 six 10-mark structured questions (90 min); P3 five 20-mark essays from seven
  (120 min); P4 written practical skills: investigation (20), microscopy (15), planning (15) (150 min).
- **9700**: P1 40 MCQs on AS content (75 min); P2 six 10-mark AS questions (75 min); P3 written investigation (25) and
  microscopy (15) (120 min); P4 ten 10-mark A Level questions (120 min); P5 planning (15) and data analysis (15) (75 min).

Question sizes, the essay split and part structures are our conventions; the hands-on practicals are not simulated.

## DEV preview

Imported and published in the DEV database on 2026-10-10 (DEV-preview note, `--approver demo.admin@example.test`):
106 lessons, 2,208 questions, 923 flashcards and 43 tests; 3,280 items published, 0 failed. Smoke test
`npx tsx --conditions=react-server .scratch/tools/smoke-family.ts biology-a`: **104/104 checks passed** (both syllabi).

## Known gaps

1. Practical microscopy items carry `paper: "ZIMSEC P4 / Cambridge P3"` (the field allows 32 characters).
2. Board-scope statements in key-fact boxes (for example that 9700 does not examine blood pressure, the menstrual cycle
   or fertilisation, and that homeostasis is not in the ZIMSEC list) need a teacher's confirmation.
3. ZIMSEC code and the Heritage-Based Curriculum version to confirm.

## Needs a specialist teacher's check

Illustrative data labelled as such (salt solutions and red cells, alga ion concentrations, Lake Kariba temperatures,
urine sodium, glucose-cascade amplification, fetal haemoglobin saturation); amylopectin/glycogen branching and
microfibril chain counts; iodine and Benedict's colorimetry claims; aflatoxin heat stability, HPV/hepatitis B and cancer,
streptomycin and 70S ribosomes; chromosome numbers (cat 38, tomato 24, cabbage 18, maize 20); haemoglobin per red cell,
alveolar area, translocation rate, root pressure, CO₂ transport fractions; the 2008-09 cholera totals and the malaria
temperature threshold; street names for drugs; ATP yields (2.5/1.5 and the older 3/2, stated in each stem); Venus fly trap
timing, the Le allele substitution and the HTT repeat threshold.

## Maintenance

- Rebuild: `node .scratch/biology-a/build-content.mjs`. Syllabi: `node .scratch/biology-a/build-syllabi.mjs`.
- Assessments: `npx tsx --conditions=react-server .scratch/tools/inventory.ts biology-a .scratch/biology-a/inventory.json`
  then `node .scratch/biology-a/build-assessments.mjs --write`.
- Checks: `npm run content:validate -- biology-a --strict`, `npm run content:check -- biology-a`,
  `node .scratch/tools/length-cue.mjs biology-a`, `node .scratch/tools/longest-key.mjs biology-a`. Smoke:
  `npx tsx --conditions=react-server .scratch/tools/smoke-family.ts biology-a`.
