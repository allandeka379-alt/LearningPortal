# Geography (A-Level) — `geography-a`

Study content for two syllabi that share one concept registry (`content/concepts/geography-a.json`):

- **ZIMSEC A-Level Geography** (Forms 5–6, 2015-2022) — `content/syllabi/zimsec/a-level/geography/2015-2022.json`
- **Cambridge International AS & A Level Geography 9696** (2027-2029) — `content/syllabi/cambridge/a-level/geography/2027-2029.json`
  (AS content, A Level content and geographical skills as sections)

Generators and the writers' brief: `.scratch/geography-a/` (`concepts.mjs`, `build-syllabi.mjs`, `lib.mjs`, `tables/*.mjs`
datasets and statistics checks, `slices/*.mjs` → `build-content.mjs`, `build-assessments.mjs`, `BRIEF.md`); shared tools
in `.scratch/tools/`.

> **Review status.** Written on 2026-10-10/15 by AI writer agents (Claude Sonnet, medium effort) to
> `.scratch/geography-a/BRIEF.md`; every statistic (Spearman, chi-squared, regression, nearest neighbour, Simpson's index,
> RMSE, gradients and map distances, hydrograph and morphometry values) computed in code. Checked by the validator
> (strict: 0 errors, 0 warnings), the length-cue checks (0 flagged; the key is the unique longest option in 9% of
> single-answer MCQs) and the marking harness. `content:check` reports lesson- and question-reuse findings only (shared
> datasets within a concept, standard constants). **No independent AI review and no human review.** Per the owner decision
> of 2026-10-12, content is published to production by the deploy's migrate step.

## At a glance

| | Total | ZIMSEC | 9696 |
| --- | --- | --- | --- |
| Lessons | 111 | | |
| Questions | 2,464 | 1,819 | 1,553 |
| Flashcards | 987 | | |
| Topic tests | 29 | 15 | 14 |
| Mock exams | 7 | Papers 1-3 | Papers 1-4 |

## Assessments

`.scratch/geography-a/build-assessments.mjs` (every rule guaranteed). Topic tests are 20 marks in 25 minutes; the
examination-skills topics have no topic test of their own.

- **ZIMSEC**: P1 physical geography, ten 25-mark structured questions, answer any four (180 min); P2 human geography, the
  same (180 min); P3 practical geography: compulsory statistics question, one of maps/GIS/remote sensing, one research
  techniques enquiry (75 marks, 180 min).
- **9696**: P1 and P2 (AS physical and human core): three compulsory 15-mark resource-based questions and one 15-mark
  essay chosen from three (60 marks, 90 min); P3 and P4 (A Level physical and human options): choose two topics and answer
  each topic's 10-mark structured question and one 20-mark essay (60 marks, 90 min).

Question sizes and part splits are our conventions. In P3 and P4 the "two topics" choice is presented as two choice
sections (any two structured questions, any two essays) with an instruction to keep to the same topics. Continuous
assessment (ZIMSEC research and community projects) and fieldwork are not simulated.

## DEV preview

Imported and published in the DEV database on 2026-10-15 (`--approver demo.admin@example.test`): 111 lessons, 2,464
questions, 987 flashcards and 36 tests; 3,598 items published, 0 failed. Smoke test
`npx tsx --conditions=react-server .scratch/tools/smoke-family.ts geography-a`: **90/90 checks passed** (both syllabi,
all 7 mocks).

## Needs a specialist teacher's check

1. Case-study facts and dates in lessons and essay model answers (for example Three Gorges, Room for the River, Pakistan
   2022 floods, Holderness and Medmerry, the Great Barrier Reef bleaching years, INPE Amazon figures, the Sahel and the
   Great Green Wall, Haiyan, Idai, the Maldives, Zambia's copper dependence, the Lesotho Highlands project).
2. Zimbabwe law and policy names (EMA Act [Chapter 20:27], Mines and Minerals Act, MMCZ, the December 2022 raw-lithium
   export ban, CAMPFIRE, land reform dates, Pfumvudza) and health statistics; mining and legislation lessons say that laws
   change and should be checked against current legislation.
3. The exam part structures and mark splits (see Assessments).
