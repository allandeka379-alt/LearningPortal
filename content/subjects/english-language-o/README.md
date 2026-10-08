# English Language (O-Level / IGCSE) — `english-language-o`

Study content for three syllabi that share one concept registry (`content/concepts/english-language-o.json`, 60
`eng.*` concepts):

- **ZIMSEC O-Level English Language** (Forms 1–4 syllabus, 2015-2022) — `content/syllabi/zimsec/o-level/english-language/2015-2022.json`
- **Cambridge IGCSE First Language English 0500** (2027-2029) — `content/syllabi/cambridge/igcse/english-language/2027-2029.json`
- **Cambridge IGCSE English as a Second Language 0510** (2027-2029) — `content/syllabi/cambridge/igcse/english-second-language/2027-2029.json`

Formats, quality bar and workflow: `docs/CONTENT_PIPELINE.md`. Generators and the writers' brief: `.scratch/english/`
(`build-syllabi.mjs`, `lib.mjs`, `slices/*.mjs` → `build-content.mjs`, `build-assessments.mjs`, `inventory.ts`,
`smoke.ts`, `BRIEF.md`).

> **Review status.** Written on 2026-10-08 by eight AI writer agents (Claude Opus, medium effort) working to
> `.scratch/english/BRIEF.md`, plus nouns and pronouns written in the main session. Checked by the validator (strict:
> 0 errors, 0 warnings), `content:check` (no findings), the length-cue check (0 flagged), the marking harness (every
> `modelResponse` scores full marks with the real engine) and a main-session sample review of about 25 items, which
> found and fixed two ambiguous tense items. **No independent AI review and no human review yet.** Production
> publishing requires a human reviewer (§41).

## At a glance

| | Total | ZIMSEC | 0500 | 0510 |
| --- | --- | --- | --- | --- |
| Concepts covered | 60 | 55 | 54 | 44 |
| Lessons (free preview) | 60 (5) | | | |
| Questions | 1,047 | 930 | 913 | 762 |
| Flashcards | 533 | | | |
| Topic tests | 16 | 8 | 4 | 4 |
| Mock exams | 5 | Paper 1, Paper 2 | Paper 1, Paper 2 | Component 1 |
| Images | 0 | | | |

Questions by type: MCQ 491, short answer 141, true/false 102, fill-in-the-blank 101, extended response 69, matching
66, structured (passage-based) 45, essay 32. Difficulty 1: 129, 2: 445, 3: 366, 4: 107. 179 are exam-style; 110 may be
daily questions. Single-answer MCQ keys are balanced (A 126, B 121, C 124, D 117).

**Self-marking.** AI marking is switched off, so writing cannot be marked automatically: 2,842 of the 4,268 marks
(67%) are self-marked against our mark-scheme points (182 questions entirely, 31 partly). Grammar, vocabulary,
retrieval and multiple-choice reading items are auto-marked.

Free-preview lessons: `grammar.nouns`, `reading.explicit-meaning`, `composition.narrative`, `oral.listening`,
`oral.spoken-interaction`.

## Coverage

| Area (folder) | Concepts | Lessons | Questions | Notes |
| --- | --- | --- | --- | --- |
| Grammar (`grammar/`) | 17 | 17 | 317 | Nouns to punctuation; rewrites have fixed beginnings and listed variants, or are self-marked |
| Vocabulary (`vocabulary/`) | 6 | 6 | 106 | Word formation, homophones, synonyms/antonyms, idioms, spelling (tested by choice, never by typing the word), figures of speech |
| Oral (`oral/`) | 4 | 4 | 69 | Listening strategies practised on written transcripts; pronunciation by syllable position (drop-down marking ignores case) |
| Reading (`reading/`) | 13 | 13 | 212 | Short original extracts and 14 passage items (9-16 marks) |
| Summary (`summary/`) | 2 | 2 | 32 | Point selection and continuous-prose summaries |
| Composition (`composition/`) | 6 | 6 | 104 | Technique items, practice tasks, ZIMSEC P1 Section A (14 × 30 marks), 0500 P2 Section B (8 × 40), 0510 Exercise 6 (5 × 15) |
| Functional writing (`functional/`) | 12 | 12 | 174 | Letters, reports, speeches, articles, memos, CVs and forms, reviews, journals and interviews, directed writing, notes and data; ZIMSEC P1 Section B (9 × 20), 0510 Exercise 5 (5 × 15) |
| Exam papers (`exam/`) | — | — | 33 | ZIMSEC Paper 2 (5 × 50), 0500 Paper 1 Q1, Q2, Q3+4 and Paper 2 Section A (4 each), 0510 Exercises 1-4 (3 each) |

Not covered by a syllabus (by design): ZIMSEC has no multiple-matching, extended response to reading, reviews,
journals/interviews or directed writing; 0500 has no referencing, informative composition, memos, CVs, reviews or
multiple matching; 0510 has no summary, narrative/descriptive composition, writers' craft, fiction or most guided
text types. Exam-format items carry `applies` so they appear only under their own syllabus.

## Assessments

Built by `.scratch/english/build-assessments.mjs` from the inventory (every rule guaranteed). Topic tests are 20
marks in 25 minutes (Section A one-mark items spread over the topic's units; Section B a 2-4 mark and a longer
question, which may be self-marked writing).

- **ZIMSEC:** verbs; nouns, pronouns, adjectives and adverbs; sentence construction and direct speech; spelling and
  word formation; reading and comprehension skills; composition skills; guided compositions; oral work.
  **Paper 1** (90 min, 50 marks): choose one of seven 30-mark compositions + one 20-mark guided composition.
  **Paper 2** (120 min, 50 marks): one passage-based 50-mark item (Section A comprehension 25 + summary 15, Section B
  language structures 10).
- **0500:** reading; spelling, punctuation and grammar; vocabulary and sentence structures; writing skills.
  **Paper 1** (120 min, 80): Q1 Text A (20), Q2 Text B summary (20), Q3+4 Text C (40). **Paper 2** (120 min, 80):
  directed writing (40) + one of four compositions, two descriptive and two narrative (40).
- **0510:** reading; grammar; vocabulary and linking; writing for a purpose. **Component 1** (120 min, 60):
  Exercises 1-6 (8, 9, 7, 6, 15, 15 marks).

Mark values used by exam-format items are reserved (BRIEF.md), so mocks never draw practice items.

## DEV preview

Imported and published in the DEV database on 2026-10-08 (`--approver demo.admin@example.test`, DEV-preview note):
3 syllabus versions (59, 19 and 16 topics), 60 lessons, 1,047 questions, 533 flashcards, 21 tests; 1,661 items
published, 0 failed; the three subjects became AVAILABLE. Smoke test: `npx tsx --conditions=react-server
.scratch/english/smoke.ts` — **69/69 checks passed**. For each syllabus a fresh full-access student is enrolled (ZIMSEC pins 2015-2022, both Cambridge subjects pin 2027-2029), sees the full topic tree (59, 19 and 16 nodes), opens every lesson tagged in the syllabus (55, 54 and 44, all rendering), practises two topics (every model response earns every auto-marked mark), and sits every topic test and mock with a fresh student per paper: each draws its full blueprint and earns every auto-marked mark. The two tense items fixed after the first import were re-imported as draft copies and published (2 items).

## Known gaps

1. **No audio.** Listening is taught as strategy and practised on written transcripts; 0510 Component 2 (Listening)
   and both speaking tests (0500 Component 4, 0510 Component 3) cannot be simulated; 0500 Component 3 (coursework)
   is not simulated either.
2. **0510 Exercise 4** uses four options per question (the engine needs at least three distractors); the real paper
   has three.
3. **Self-marking** of all writing (see above) until AI marking is switched on or a teacher marks.
4. **ZIMSEC Paper 2 split** of the 40 Section A marks (25 comprehension + 15 summary, 150-word summary) is ours; the
   syllabus does not state it.
5. **Cambridge 2027-2029 versions only**: 2026 candidates sit the 2024-2026 syllabi, which are not in the repository.
6. **Milder length cue**: the key is the single longest option in 35% of single-answer MCQs (chance: 25%).
7. Some practice passages are 230-280 words (five reach 300-450); exam passages are full length (400-850 words).
8. Word limits in writing stems read "about N words" (the exact limits are stored in `wordLimit`), because
   `content:check` reads repeated word ranges as reused numbers.

## Needs a specialist teacher's check

- Answer keys that depend on British exam conventions: articles ("a group"), *each/every of*, *neither ... is*,
  formal *were* after *if I*, *whom* in formal writing, collective nouns.
- Pronunciation stress items and listening transcripts; idioms and proverbs chosen as standard British English.
- Mark schemes and level descriptors for compositions and guided writing against ZIMSEC and Cambridge marking
  practice; the quality of the model answers (full models for about a third of the prompts).
- Facts in passages: Great Zimbabwe (0500 Text C4), Harare's wetlands and water supply (ZIMSEC Paper 2), and dates
  and weekdays in letters (checked against the 2026 calendar).
- The syllabus trees against clean copies of the official documents (see each syllabus file's `notes`).

## Maintenance

- Rebuild questions and flashcards: `node .scratch/english/build-content.mjs` (all slices; output is deterministic
  and balances MCQ key positions per file). One slice set: `node .scratch/english/build-content.mjs <prefix>-`.
- Syllabi and registry: `node .scratch/english/build-syllabi.mjs`. Assessments: `npx tsx --conditions=react-server
  .scratch/english/inventory.ts .scratch/english/inventory.json` then `node .scratch/english/build-assessments.mjs
  --write`.
- Checks: `npm run content:validate -- english-language-o --strict`, `npm run content:check -- english-language-o`,
  `node .scratch/tools/length-cue.mjs english-language-o`, `node .scratch/tools/family-stats.mjs english-language-o`.
