# english-language-o — writing brief for content agents

You write ORIGINAL study content for the English Language family (ZIMSEC O-Level English Language 2015-2022,
Cambridge IGCSE First Language English 0500 and English as a Second Language 0510, both 2027-2029). Content is DEV
preview only; a human reviews it later (§41), but write it as if it ships tomorrow.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks in lessons).
- `content/concepts/english-language-o.json` (the 60 concepts; descriptions say what each covers).
- The three syllabus files in `content/syllabi/{zimsec/o-level/english-language,cambridge/igcse/english-language,
  cambridge/igcse/english-second-language}/` (which concepts each syllabus covers; objectives).
- `.scratch/english/lib.mjs` (builders) and the worked example `.scratch/english/slices/a1-nouns-pronouns.mjs`
  (copy its style: every MCQ option has a rationale, explanations teach, hints from difficulty 3).
- A model lesson: `content/subjects/combined-science-o/lessons/physics/telecommunication.md` (front matter + blocks).

## What to produce per concept

1. **One lesson** `content/subjects/english-language-o/lessons/<area>/<name>.md` (key `<area>.<name>`, e.g.
   `grammar.tenses`), 900-1,500 words, template of §6: `## Introduction` (Zimbabwean context, why it matters in the
   exam), `## Key definitions` (`:::definition{term="…"}`), explanation sections with plenty of `:::example` blocks
   (correct vs incorrect sentences, annotated extracts, model paragraphs), `## Common mistakes` (`:::mistake{title="…"}`),
   `## Exam tips` (`:::exam-tip`), `## Summary` (one `:::summary`). Front matter: key, title, summary, concepts
   ([the concept]), estimatedMinutes (honest), level "core"; `freePreview: true` ONLY on the lessons your task names.
   Do not add `objectives` (optional; leave them out). No LaTeX needed; a literal dollar sign must be written `US\$`.
2. **Questions + flashcards** in a slice file `.scratch/english/slices/<your-prefix>-<name>.mjs` using `concept(...)`:
   - Skill concepts (grammar, vocabulary, reading skills, oral): 16-22 questions each. Mix: MCQ (about half),
     fill-in-the-blank (select drop-downs or short text blanks), short answer (only when the set of correct answers is
     CLOSED and you list every acceptable variant), true/false, matching, a few self-marked `manualShort` items
     (explain/rewrite tasks with several valid answers), and 2-4 exam-style items (`examStyle: true`, difficulty 3-4).
   - Difficulty spread per concept: ~25% d1-2, ~45% d2-3, ~30% d3-5. `daily: true` only on 2-3 auto-marked items of
     difficulty 2-3 per concept (MCQ, true/false or short answer).
   - 8-10 flashcards per concept (`b.card(type, front, back, notes?)`; types DEFINITION, VOCABULARY, CONCEPT, FACT).
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION / CREATION as appropriate.
3. Key prefixes: questions `<area>.<name>.qNN`, cards `.cNN` (the builder numbers them). Keep prefixes unique.

## Quality rules (non-negotiable)

- **Original wording.** Never copy textbooks, past papers, mark schemes, websites or literature. No quotations from
  real books or songs. Passages, extracts and example sentences are your own. Real Zimbabwean places, foods, names and
  institutions are fine in neutral, plausible contexts (no invented statistics presented as real facts; clearly
  fictional people). British English spelling and usage.
- **Exactly one defensible answer** for every single-answer MCQ, and distractors that are definitely wrong (state why
  in the rationale). Avoid items where modern usage accepts several forms (singular "they", "who" vs "whom" in speech,
  "It was her"): either choose an unambiguous context or don't write the item. Four options per MCQ (the engine
  needs at least three distractors). Never "all/none of the above", never refer to options by letter.
- **No length cue:** the key must not be clearly the longest option. Write distractors of similar length. Check with
  `node .scratch/tools/length-cue.mjs english-language-o questions/<your folder>/` → must print `# 0 flagged`.
- Short answers: `normalise` defaults to trim/lowercase/collapse whitespace/strip punctuation (apostrophes, full
  stops and hyphens are removed, other punctuation becomes a space), so "wasn't" is compared as "wasnt". List
  variants (contracted/uncontracted, alternative correct words). If you cannot list every correct answer, make it a
  `manualShort` (self-marked against points) instead. `model:` sets the full-marks response if not the first accepted.
- Fill-in-the-blank text blanks: `accepted` lists every correct form; select blanks need 3-4 `choices`.
- Self-marked items (`manualShort`, `ext`, `essay`, manual parts): mark-scheme points must add up to the marks; write
  them so a student can honestly tick them ("Uses the past perfect for the earlier action", not "Good answer").
- Explanations teach the rule; hints (1-3) guide without giving the answer.

## Exam-format items (only the agents whose task names them)

Use `applies` (`ZIM`, `FLE`, `ESL` from lib.mjs) so each exam-format item is tagged only to its syllabus, and
`examStyle: true`. The mock papers will draw them by type + marks, so these must be EXACT:

| Paper item | type | marks | applies | how many |
|---|---|---|---|---|
| ZIMSEC P1 Section A composition | ESSAY | 30 | ZIM | ≥ 12 (mix narrative, descriptive, informative, argumentative, discursive) |
| ZIMSEC P1 Section B guided composition (letter, speech, report, article, memo from notes/data/pictures described in words) | EXTENDED_RESPONSE | 20 | ZIM | ≥ 6 |
| ZIMSEC P2 full paper: original prose passage 600-800 words; comprehension parts + a summary part (Section A, 40 marks) + language-structure parts set in the passage's context (Section B, 10 marks) | STRUCTURED | 50 | ZIM | ≥ 4 |
| 0500 P1 Q1: Text A (about 450-550 words) comprehension parts | STRUCTURED | 20 | FLE | ≥ 3 |
| 0500 P1 Q2: Text B, 2(a) selective summary ≤120 words (manual, 15 marks) + 2(b) attitudes/opinions (5 marks) | STRUCTURED | 20 | FLE | ≥ 3 |
| 0500 P1 Q3+Q4: Text C, short answers + language task (20) and extended response in role (20) | STRUCTURED | 40 | FLE | ≥ 3 |
| 0500 P2 Section A directed writing: one or two texts 550-650 words, 1(a) 5 marks + 1(b) 35 marks | STRUCTURED | 40 | FLE | ≥ 3 |
| 0500 P2 Section B composition (descriptive or narrative, 350-450 words) | ESSAY | 40 | FLE | ≥ 8 (4 descriptive, 4 narrative) |
| 0510 Ex1: text 400-450 words, short answers (last part asks for three things) | STRUCTURED | 8 | ESL | ≥ 3 |
| 0510 Ex2: multiple matching, 9 statements → sections A-E (use `match` with `right` + `rightIndex`, `shuffle: false`) | MATCHING | 9 | ESL | ≥ 3 |
| 0510 Ex3: text 400-500 words, note completion (7 short-answer parts, 1 mark each) | STRUCTURED | 7 | ESL | ≥ 3 |
| 0510 Ex4: text 550-600 words, six MCQ parts (four options each) | STRUCTURED | 6 | ESL | ≥ 3 |
| 0510 Ex5 informal email, 120-160 words (6 content + 9 language) | EXTENDED_RESPONSE | 15 | ESL | ≥ 4 |
| 0510 Ex6 formal article / report / essay / review, 120-160 words | ESSAY | 15 | ESL | ≥ 4 |

**Reserved mark values.** The mocks select items by type and marks, so items that are NOT exam-format items must
never use these combinations: STRUCTURED worth 6, 7, 8, 20, 40 or 50 marks; ESSAY or EXTENDED_RESPONSE worth 15,
20, 30 or 40 marks; MATCHING worth 9 marks. Practice writing tasks use other values (e.g. 10, 12, 16, 24, 25).

**Folders and keys.** Lessons: `lessons/<area>/<name>.md` with key `<area>.<name>`; questions and flashcards:
`questions/<area>/<name>.json`, key prefix `<area>.<name>` (areas: grammar, vocabulary, oral, reading, summary,
composition, functional, exam). Exam-format items live in `questions/exam/...` (reading-paper items) or in the
writer's own area folder with `exam-` in the file name. Lesson titles must be unique (slugs come from titles).

Composition and long-writing mark schemes: points that add up to the marks (e.g. content/relevance, organisation,
style/register, accuracy) plus `levels` from `compositionLevels(total)` in lib.mjs, a `wordLimit`, and a
`modelAnswer` (a full exemplar for about a third of the prompts; a detailed plan with an exemplar opening paragraph
for the rest). Estimated time: about 100-120 seconds per mark for writing (`secs`).

A comprehension STRUCTURED item: the passage goes in `stem` (paragraphs numbered in bold: **[1]**), parts are
`P.mcq/P.short/P.fib/P.manual(...)` with labels "(a)", "(b)", … (sub-parts "(i)" one level deep are allowed only
inside a part with type STRUCTURED — avoid; use flat labels (a)…(p)). Mix auto-marked parts (vocabulary MCQs,
retrieval short answers with closed answers) with manual parts (own words, inference, effects, summary).

## Commands (repo root)

- Build your slices only: `node .scratch/english/build-content.mjs <your-prefix>` (filters slice file names).
- Validate: `npm run content:validate -- english-language-o --strict` → must end with 0 error(s), 0 warning(s).
  Other agents are writing in the same family at the same time: if an error is in a file you do not own, ignore it
  (mention it in your report).
- Self-check: `npm run content:check -- english-language-o` → fix findings in your files.
- Length cue: see above.

## Hard limits

- Edit ONLY the files your task assigns (your slice files, your lesson folder(s), the question/flashcard JSON your
  slices generate). Never edit lib.mjs, build-content.mjs, build-syllabi.mjs, syllabus/registry files or other
  agents' files: if you need a change there, say so in your final report.
- Never run content:import, content:publish, npm install, prisma, next, git commands, or start Workflows.
- Final report (under 300 words): files written, counts (lessons, questions by type, cards) per concept, validation
  and content:check results, anything unfinished or uncertain.
