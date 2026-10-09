# Computer Science (O-Level / IGCSE) — `computer-science-o`

Study content for two syllabi that share one concept registry (`content/concepts/computer-science-o.json`, 102
`comp.*` concepts):

- **ZIMSEC O-Level Computer Science** (Forms 1–4 syllabus, 2015-2022) — `content/syllabi/zimsec/o-level/computer-science/2015-2022.json`
- **Cambridge IGCSE Computer Science 0478** (2026-2028, version 6) — `content/syllabi/cambridge/igcse/computer-science/2026-2028.json`

Formats, quality bar and workflow: `docs/CONTENT_PIPELINE.md`. Generators and the writers' brief:
`.scratch/computer-science/` (`build-syllabi.mjs`, `lib.mjs` with number-base, two's complement, truth-table and
trace helpers computed in code, `selftest.ts`, `tables/*.mjs`, `slices/*.mjs` → `build-content.mjs`,
`build-assessments.mjs`, `BRIEF.md`); shared tools in `.scratch/tools/`.

> **Review status.** Written on 2026-10-09 by nine AI writer agents (Claude Opus, medium effort) working to
> `.scratch/computer-science/BRIEF.md`; every conversion, truth table and trace was computed in code. Checked by the
> validator (strict: 0 errors, 0 warnings), `content:check` (no findings), the length-cue check (0 flagged, after 12
> distractors were lengthened in the main session) and the marking harness. **No independent AI review and no human
> review yet.** Production publishing requires a human reviewer (§41).

## At a glance

| | Total | ZIMSEC | 0478 |
| --- | --- | --- | --- |
| Concepts covered | 102 | 84 | 66 |
| Lessons (free preview) | 102 (13) | | |
| Questions | 1,926 | 1,522 | 1,215 |
| Flashcards | 897 | | |
| Topic tests | 21 | 11 | 10 |
| Mock exams | 4 | Paper 1, Paper 2 | Paper 1, Paper 2 |
| Images | 0 | | |

Questions by type: MCQ 742, short answer 295, structured 248, true/false 207, matching 142, fill-in-the-blank 118,
numerical 114, calculation 52, extended response 8. Difficulty 1: 178, 2: 740, 3: 557, 4: 357, 5: 94. 256 are
exam-style; 218 may be daily questions. 35% of marks are self-marked (programs, HTML, explanations). Pseudocode follows
the 0478 conventions in fenced code blocks; logic circuits and flowcharts are described in words and tables.

## Assessments

Built by `.scratch/computer-science/build-assessments.mjs` (every rule guaranteed). Topic tests are 20 marks in 25
minutes, one per topic (Cambridge databases is combined with Boolean logic).

- **ZIMSEC Paper 1** (60 min, 40 marks): 40 MCQs. **ZIMSEC Paper 2** (120 min, 100 marks): ten 10-mark structured
  questions (the syllabus says 10 to 12). Papers 3 (practical), 4 (school-based) and 5 (project) are not simulated.
- **0478 Paper 1** (105 min, 75 marks): five 15-mark questions on topics 1-6. **0478 Paper 2** (105 min, 75 marks):
  five 12-mark questions on topics 7-10 and a 15-mark scenario question. The real papers' question lengths vary; the
  equal lengths are our convention.

## DEV preview

Imported and published in the DEV database on 2026-10-09 (DEV-preview note, `--approver demo.admin@example.test`): 2 syllabus versions (55 and 31 topics), 102 lessons, 1,926 questions, 897 flashcards and 25 tests; 2,950 items published, 0 failed; both subjects became AVAILABLE. Smoke test `npx tsx --conditions=react-server .scratch/tools/smoke-family.ts computer-science-o`: **68/68 checks passed**.

## Known gaps

1. **Programs are self-marked**: answers with many valid forms (pseudocode, programs, HTML, SQL beyond closed
   queries) are marked against points by the student.
2. **No practical or project simulation** for ZIMSEC Papers 3-5; no code execution in the platform.
3. **Length cue (milder form)**: the key is the single longest option in 40% of single-answer MCQs (chance: 25%).
4. **Answer checks ignore case**, so no item depends on upper/lower case; 0478 pseudocode has no end-of-file test or
   string concatenation operator, and items avoid both.
5. **ZIMSEC details**: subject code (commonly 4021) not printed; Paper 3 option weightings unreadable in the copy.

## Needs a specialist teacher's check

Typical figures in networking lessons (Bluetooth about 10 m, twisted pair about 100 m); USB 2/3 duplex statements; the
Cyber and Data Protection Act (outline only); POTRAZ, ZIPO, ARIPO (Harare), ZIMRA and Education 5.0 references; the
test-data classes used (normal, abnormal, extreme); CMS examples (WordPress, Joomla, Drupal); SQL style for 0478.

## Maintenance

- Rebuild questions and flashcards: `node .scratch/computer-science/build-content.mjs` (deterministic). Syllabi and
  registry: `node .scratch/computer-science/build-syllabi.mjs`. Kit self-test: `npx tsx --conditions=react-server
  .scratch/computer-science/selftest.ts`.
- Assessments: `npx tsx --conditions=react-server .scratch/tools/inventory.ts computer-science-o
  .scratch/computer-science/inventory.json` then `node .scratch/computer-science/build-assessments.mjs --write`.
- Checks: `npm run content:validate -- computer-science-o --strict`, `npm run content:check -- computer-science-o`,
  `node .scratch/tools/length-cue.mjs computer-science-o`. Smoke: `npx tsx --conditions=react-server
  .scratch/tools/smoke-family.ts computer-science-o`.
