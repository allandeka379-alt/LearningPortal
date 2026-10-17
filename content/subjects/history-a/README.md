# History (A-Level) — `history-a`

Study content for two syllabi that share one concept registry (`content/concepts/history-a.json`):

- **ZIMSEC A-Level History** (Forms 5–6, 2015-2022) — `content/syllabi/zimsec/a-level/history/2015-2022.json`
- **Cambridge International AS & A Level History 9489** (2027-2029) — `content/syllabi/cambridge/a-level/history/2027-2029.json`
  (the European option: France 1774-1814, the origins of the First World War, the Holocaust, the origins of the Cold War,
  Napoleon, Italy and Mussolini, Germany and Hitler, Russia and Stalin, and the interpretations skill)

Generators and the writers' brief: `.scratch/history-a/` (`concepts.mjs`, `build-syllabi.mjs`, `lib.mjs`, `tables/*`,
`slices/*.mjs` → `build-content.mjs`, `build-assessments.mjs`, `BRIEF.md`); shared tools in `.scratch/tools/`.

> **Review status.** Written on 2026-10-16/17 by eight AI writer agents (Claude Sonnet, medium effort) to
> `.scratch/history-a/BRIEF.md`. Dates, names and figures were re-checked by the writers against the lessons, contested
> claims are attributed and estimates are given as ranges; the lead corrected two dates (Makoni's capture and execution in
> 1897; Burnham's killing of the man he identified as the Mlimo in June 1896). Politically sensitive Zimbabwean history
> (colonial rule, the liberation struggle, land reform, the 1980s disturbances) is written factually and neutrally.
> Checked by the validator (strict: 0 errors, 0 warnings), `content:check` (reuse notices only: shared years), the
> length-cue checks (0 flagged; the key is the unique longest option in 17% and the unique shortest in 18% of
> single-answer MCQs) and the marking harness. **No independent AI review and no human review.** Per the owner decision of
> 2026-10-12, content is published to production by the deploy's migrate step.

## At a glance

| | Total | ZIMSEC | 9489 |
| --- | --- | --- | --- |
| Lessons | 106 | | |
| Questions | 2,241 | 2,030 | 820 |
| Flashcards | 954 | | |
| Topic tests | 28 | 19 | 9 |
| Mock exams | 12 | Papers 1-2 | Papers 1-4 (by option) |

## Assessments

`.scratch/history-a/build-assessments.mjs` (every rule guaranteed). Topic tests are 20 marks in 25 minutes; the ZIMSEC
assessment-skills topic has no topic test of its own.

- **ZIMSEC**: P1 History of Zimbabwe and P2 Africa and the world, each answer any four 25-mark essays (180 min).
- **9489**: P1 document questions, one mock per option (France, Germany, Russia; 40 marks, 75 min); P2 outline study, one
  mock per examined year (60 marks, 105 min); P3 interpretations, one mock per topic (First World War, Holocaust, Cold War;
  40 marks, 75 min); P4 depth study (60 marks, 105 min).

Question sizes, levels and part splits are our conventions; the invented sources and extracts are written for practice.
ZIMSEC coursework is not simulated.

## DEV preview

Imported and published in the DEV database on 2026-10-17 (`--approver demo.admin@example.test`): 106 lessons, 2,241
questions, 954 flashcards and 40 tests; 3,341 items published, 0 failed. Smoke test
`npx tsx --conditions=react-server .scratch/tools/smoke-family.ts history-a`: **98/98 checks passed** (both syllabi,
all 12 mocks).

## Needs a specialist teacher's check

1. Zimbabwean history: dates and details of pre-colonial states (Mutapa, Torwa, Rozvi, Ndebele), the 1607 and 1629
   treaties, the Rudd Concession and the 1896-97 risings, Company rule and the 1922 referendum, the liberation struggle,
   Lancaster House, land reform figures (Utete, resettlement totals), the 1980s Matabeleland and Midlands disturbances
   (the commonly cited estimate of about 20,000 deaths, labelled as disputed) and the 2013 Constitution.
2. European and world history figures given as ranges (Terror death sentences, Great Leap Forward and 1932-33 famines,
   Soviet war dead, Roma and Sinti deaths, Maji Maji deaths) and the historians' positions as paraphrased.
3. The exam levels, part structures and mark splits (see Assessments).
