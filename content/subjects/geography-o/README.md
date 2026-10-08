# Geography (O-Level / IGCSE) — `geography-o`

Study content for two syllabi that share one concept registry (`content/concepts/geography-o.json`, 111 `geo.*`
concepts):

- **ZIMSEC O-Level Geography** (Forms 1–4 syllabus, 2015-2022) — `content/syllabi/zimsec/o-level/geography/2015-2022.json`
- **Cambridge IGCSE Geography 0460** (2027-2029) — `content/syllabi/cambridge/igcse/geography/2027-2029.json`

Formats, quality bar and workflow: `docs/CONTENT_PIPELINE.md`. Generators and the writers' brief:
`.scratch/geography/` (`build-syllabi.mjs` + `concepts.mjs`, `lib.mjs`, `slices/*.mjs` → `build-content.mjs`,
`build-assessments.mjs`, `BRIEF.md`); shared tools in `.scratch/tools/` (`inventory.ts`, `assess-lib.mjs`,
`smoke-family.ts`).

> **Review status.** Written on 2026-10-08 by ten AI writer agents (Claude Opus, medium effort) working to
> `.scratch/geography/BRIEF.md`; the syllabus files and registry were built by a foundation agent from the official
> documents. Checked by the validator (strict: 0 errors, 0 warnings), `content:check`, the length-cue check (0
> flagged) and the marking harness (every `modelResponse` scores full marks with the real engine). **No independent AI
> review and no human review yet.** Production publishing requires a human reviewer (§41).

## At a glance

| | Total | ZIMSEC | 0460 |
| --- | --- | --- | --- |
| Concepts covered | 111 | 94 | 64 |
| Lessons (free preview) | 111 (14) | | |
| Questions | 2,253 | 1,854 | 1,255 |
| Flashcards | 986 | | |
| Topic tests | 23 | 12 | 11 |
| Mock exams | 5 | Paper 1, Paper 2 | Papers 1, 2 and 4 |
| Images | 0 | | |

Questions by type: MCQ 919, short answer 284, structured 269, true/false 191, numerical 134, calculation 122,
extended response 112, matching 111, fill-in-the-blank 111. Difficulty 1: 327, 2: 1,041, 3: 685, 4: 200. 46 are
exam-format papers items; 203 may be daily questions. 53% of marks are self-marked (explain/describe parts and
extended answers; AI marking is switched off). Every grid reference, bearing, distance, gradient and statistic was
computed with code.

Free-preview lessons: weather elements and instruments, ecosystem components, resource types, river processes,
coastal processes, pollution and waste, energy sources, map location and coordinates, minerals distribution,
Zimbabwe's natural regions, industry classification, population growth and the DTM, measuring development, transport
modes.

Questions per area: weather 207, maps 210, ecosystems 207, tectonics 137, population 139, industry 120, settlement 118,
rivers 117, agriculture 114, mining 97, energy 80, environment 80, landforms 80, coasts 77, fieldwork 63,
climate change 62, development 57, resources 54, skills 44, transport 43, food 40, tourism 40, trade 21; exam 46.

## Assessments

Built by `.scratch/geography/build-assessments.mjs` (shared helpers in `.scratch/tools/assess-lib.mjs`); every rule is
guaranteed. Topic tests: one per top-level topic, 20 marks in 25 minutes.

- **ZIMSEC Paper 1** (90 min, 40 marks): 40 MCQs, 12 map work, 13 physical, 8 economic, 7 population, settlement,
  transport and trade (the split is ours; the syllabus gives the sections, not the counts).
- **ZIMSEC Paper 2** (150 min, 100 marks): nine 25-mark structured questions (Section A physical, B economic, C
  population/settlement/transport/trade), answer four, one from each section and one more (best four count).
- **0460 Paper 1** and **Paper 2** (105 min, 75 marks each): one compulsory 25-mark question and a choice of four
  25-mark questions, answer two (the real papers offer three in Section B).
- **0460 Paper 4** (90 min, 60 marks): two 30-mark geographical investigations.

Exam-format items are STRUCTURED 25 (ZIMSEC Paper 2, 0460 Papers 1-2) or 30 (0460 Paper 4), reserved for the mocks.

## DEV preview

Imported and published in the DEV database on 2026-10-08 (`--approver demo.admin@example.test`, DEV-preview note): 2 syllabus versions (90 and 51 topics), 111 lessons, 2,253 questions, 986 flashcards and 28 tests; 3,378 items published, 0 failed; both subjects became AVAILABLE. Smoke test `npx tsx --conditions=react-server .scratch/tools/smoke-family.ts geography-o`: **74/74 checks passed** (fresh full-access student per syllabus: topic tree, all 94 and 64 tagged lessons render, practice on the two largest topics marks every model response correctly, every topic test and mock starts with its full blueprint and earns every auto-marked mark, with a fresh student per paper).

## Known gaps

1. **No maps or photographs.** Map work and graph skills use map extracts described in words and Markdown tables;
   Ordnance-style map extracts, aerial photographs and satellite images cannot be shown yet (a diagram/media pass
   would add them).
2. **Length cue (milder form):** the key is the single longest option in 45% of single-answer MCQs (chance: 25%).
   A rewrite pass over the distractors is worth doing.
3. **ZIMSEC Paper 2** is described in the document as nine questions but its grid lists twelve; the mock follows the
   paper description (nine). ZIMSEC paper weightings and the physical/economic split of environmental management are
   assumptions recorded in the syllabus notes.
4. **Cambridge Section B** offers four questions instead of three, and Section A is always drawn from the same topic
   (climate change in Paper 1, development in Paper 2), because a blueprint rule draws from one topic.
5. **Cambridge 2027-2029 only**: 2026 candidates sit the 2025-2026 syllabus (with a geographical skills paper), which
   is not in the repository. Component 3 (coursework) is not simulated.
6. Case-study figures are deliberately approximate ("about", "roughly"); exact statistics were left out where the
   writers could not state them with confidence.

## Needs a specialist teacher's check

Facts the writers flagged for review: Kariba South capacity (about 1,050 MW after its extension) and the Hwange
expansion; drought years; CAMPFIRE's start (1989, Nyaminyami and Guruve); Ramsar sites named (Monavale Vlei, Mana
Pools); kapenta introduced from Lake Tanganyika in the 1960s; Cyclone Idai and Tokwe-Mukosi descriptions; Chirundu as
a one-stop border post; South Africa as the largest source of imports; lithium among exports; Zimbabwe altitude bands;
Antarctic and Amazon figures. Check the natural-regions boundaries (I to V with IIa and IIb), the ZIMSEC tree against
a clean copy of the document, and the Cambridge item numbers.

## Maintenance

- Rebuild questions and flashcards: `node .scratch/geography/build-content.mjs` (deterministic; balances MCQ key
  positions per file). Syllabi and registry: `node .scratch/geography/build-syllabi.mjs`.
- Assessments: `npx tsx --conditions=react-server .scratch/tools/inventory.ts geography-o .scratch/geography/inventory.json`
  then `node .scratch/geography/build-assessments.mjs --write`.
- Checks: `npm run content:validate -- geography-o --strict`, `npm run content:check -- geography-o`,
  `node .scratch/tools/length-cue.mjs geography-o`, `node .scratch/tools/family-stats.mjs geography-o`.
- Smoke (after import and DEV publish): `npx tsx --conditions=react-server .scratch/tools/smoke-family.ts geography-o`.
