# History (O-Level / IGCSE) — `history-o`

Study content for two syllabi that share one concept registry (`content/concepts/history-o.json`, 111 `hist.*`
concepts):

- **ZIMSEC O-Level History** (Forms 1–4, 2015-2022) — `content/syllabi/zimsec/o-level/history/2015-2022.json`
- **Cambridge IGCSE History 0470** (2027-2028) — `content/syllabi/cambridge/igcse/history/2027-2028.json`
  (Core content Options A and B and Depth studies A-E as optional groups)

Generators and the writers' brief: `.scratch/history/` (`concepts.mjs` + `build-syllabi.mjs`, `lib.mjs`,
`slices/*.mjs` → `build-content.mjs`, `build-assessments.mjs`, `BRIEF.md`); shared tools in `.scratch/tools/`.

> **Review status.** Written on 2026-10-09 by eight AI writer agents (Claude Opus, medium effort) working to
> `.scratch/history/BRIEF.md`: established dates and facts only, contested interpretations presented as such, casualty
> figures given as estimate ranges, and every source in a source-based question **invented and labelled as such**.
> Checked by the validator (strict: 0 errors, 0 warnings), the length-cue checks (0 flagged; key is the unique longest
> option in 11% of MCQs) and the marking harness. `content:check` reports 624 lesson-reuse and 81 question-reuse
> findings: they are shared topic dates (for example 1893-94, 1957-1964), which recur by nature in history items, not
> reused working. **No independent AI review and no human review yet.** Production publishing requires a human reviewer
> (§41).

## At a glance

| | Total | ZIMSEC | 0470 |
| --- | --- | --- | --- |
| Concepts covered | 111 | 69 | 65 |
| Lessons | 111 | | |
| Questions | 2,223 | 1,349 | 1,307 |
| Flashcards | 1,015 | | |
| Topic tests | 18 | 11 | 7 |
| Mock exams | 5 | Paper 1, Paper 2 | Papers 1, 2 and 4 |

## Assessments

`.scratch/history/build-assessments.mjs` (every rule guaranteed). Topic tests 20 marks in 25 minutes.

- **ZIMSEC Paper 1** (History of Zimbabwe) and **Paper 2** (Regional and International), 120 min each: a choice of
  25-mark structured questions (ten and eight offered; the real papers offer 22 and 20), answer any four. Part marks
  5/12/8 (and 5/8/12 for the source-based question) are our convention.
- **0470 Paper 1** (120 min, 60): two Core questions (Option A or B) and one depth-study question. **Paper 2** (105 min,
  40): one source question on a prescribed topic (the real topic changes each series). **Paper 4** (60 min, 40): one
  depth-study question. Coursework is not simulated.

## DEV preview

Imported and published in the DEV database on 2026-10-09 (DEV-preview note, `--approver demo.admin@example.test`): 2 syllabus versions (61 and 40 topics), 111 lessons, 2,223 questions, 1,015 flashcards and 23 tests; 3,372 items published, 0 failed; both subjects became AVAILABLE. Smoke test `npx tsx --conditions=react-server .scratch/tools/smoke-family.ts history-o`: **64/64 checks passed**.

## Known gaps

1. ZIMSEC topics 2 (origins), 3 (Egypt) and 9 (nationalism) are taught but in neither paper's specification grid: they
   have practice content and topic tests but no 25-mark exam items. Owner to confirm whether they are examinable.
2. Part-mark conventions for all exam items need checking against current mark schemes.
3. South Africa since 1848 (ZIMSEC Form 4 scope and sequence, no objectives) is not covered.
4. ZIMSEC code (commonly 2167) not printed; Heritage-Based Curriculum version to confirm. Cambridge 2027-2028 only.

## Needs a specialist teacher's check

Dates flagged by the writers: Maungwe 1684, Dambarare 1693, Empandeni 1887, Morgenster 1891, the Moffat Treaty
(11 February 1888), Gatsi Rusere 1607, Mavhura 1629; Pioneer Column size; capital names (Mhlahlandlela, Manyanga);
casualty estimates (Nyadzonia, Chimoio, Freedom Camp, Gukurahundi, the war overall); the Kariba displacement figure;
the 1914-15 reserves commission, ICU and Bantu Congress dates; the historians named in the 1896 coordination debate;
estimate ranges for the Atlantic trade and China. The writers left out details they could not confirm.

## Maintenance

- Rebuild: `node .scratch/history/build-content.mjs`. Syllabi: `node .scratch/history/build-syllabi.mjs`.
- Assessments: `npx tsx --conditions=react-server .scratch/tools/inventory.ts history-o .scratch/history/inventory.json`
  then `node .scratch/history/build-assessments.mjs --write`.
- Checks: `npm run content:validate -- history-o --strict`, `node .scratch/tools/length-cue.mjs history-o`,
  `node .scratch/tools/longest-key.mjs history-o`. Smoke: `npx tsx --conditions=react-server
  .scratch/tools/smoke-family.ts history-o`.
