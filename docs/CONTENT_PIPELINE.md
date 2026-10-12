# Content pipeline: authoring spec, quality bar and workflow

This is the authoritative guide for everyone who writes study content for the platform — human editors and AI
writing agents alike. Content is written as **version-controlled files** under `content/`, checked by a validator,
imported into the database as drafts, **reviewed by a person**, and only then published to students.

Related: `docs/CONTENT_AUTHORING.md` (Markdown blocks, LaTeX and images — required reading), `docs/PRODUCT_SPEC.md`
§8 lessons, §9 question bank, §18 flashcards, §12/§13 tests, §26 syllabus versions, §27 copyright, §41 AI content,
§43 accessibility. Code: `src/server/content-pipeline/`, CLIs in `scripts/content/`.

```
write files ──► npm run content:validate ──► npm run content:import ──► human review ──► npm run content:publish
 (content/)        (no database)               (drafts, IN_REVIEW)     (/admin/review/topics     (approver's attestation)
                                                                         or the files)
```

---

## 1. Workflow and commands

| Step | Command | What it does |
| --- | --- | --- |
| 1 | write / edit files in `content/` | Follow this document. One concept per file is a good unit. |
| 2 | `npm run content:validate` | Checks everything (or `-- <family>` / `-- <path>`). Exit code 1 on errors. Run it until clean. `--strict` also fails on warnings, `--quiet` hides warnings, `--no-cache` re-checks every item. |
| 2b | `npm run content:check -- <family>` | Advisory self-checks the validator cannot prove: questions that repeat a lesson's worked example (two or more shared distinctive numbers), near-duplicate questions within a concept, and unbalanced `$` in rendered text. Go through every finding before review; a shared number can be a deliberate reuse (say so in a note). `--kind`, `--limit`, `--fail`. |
| 3 | `npm run content:import -- --family <family>` | Validates, then upserts into the database (syllabi, media, questions, lessons, flashcards, tests). New and changed items become **IN_REVIEW**. Safe to run any number of times: a second run over unchanged files changes nothing. `--approver <admin email>` also publishes DRAFT syllabus versions; `--author <email>` records an editor instead of the pipeline account. |
| 4 | review | Read every item at **/admin/review/topics** (syllabus → topic → everything in that topic, answers included). Approve, or request changes and fix the **files** (then import again). |
| 5 | `npm run content:publish -- --approver <your email> [--family f] [--topic node-key] [--dry-run]` | Approves (as you) and publishes everything still waiting, in dependency order. **Running it is your attestation that you reviewed the content (§41).** Use `--dry-run` first. |

Rules that never bend:

- **Students only ever see PUBLISHED content.** Import never publishes; publishing always names a human approver.
- **Production publishes automatically (owner decision 2026-10-12: no human review step before production).** The
  Railway migrate service imports `IMPORT_FAMILIES` and then runs `content:publish` for the same families with
  `--approver "$CONTENT_PUBLISH_APPROVER"` (an ADMIN account; `scripts/railway-migrate.sh`). Unchanged families are a
  fast no-op; changed files (draft copies) are merged as a new revision. Quality rests on `content:validate --strict`,
  `content:check` and the smoke tests before a commit.
- **Four-eyes:** the importer records the pipeline account (or `--author`) as the author; the approver must be a
  different person (the database refuses otherwise when `app.four_eyes = 'on'`, as in production).
- **Published content is immutable.** Changing a file of a published item creates a *draft copy* for review
  (reported as a conflict); students keep the published revision until the copy is approved and published.
- **Keys are forever.** The database finds items by their key. Renaming a key creates a new item and leaves the old
  one as an orphan (reported, never deleted).
- **The files are the source of truth.** Do not fix pipeline content in the CMS: the next import overwrites drafts,
  and differences on published items become conflicts. Fix the file, then import.

---

## 2. Directory layout

```
content/
  concepts/<family>.json                                       concept registry of a subject family
  syllabi/<board>/<qualification>/<subject>/<version>.json     one syllabus version (topic tree)
  subjects/<family>/
    lessons/**/<name>.md                                       one lesson per file (JSON front matter + Markdown)
    questions/**/<name>.json                                   JSON array of questions
    flashcards/**/<name>.json                                  JSON array of flashcards
    assessments/**/<name>.json                                 JSON array of tests / mock exams
    media/media.json + media/<files>                           images (PNG, JPEG or WebP; listed in media.json)
    README.md                                                  coverage notes (ignored by the tools)
```

- `<board>/<qualification>/<subject>` are the catalogue slugs (`zimsec/o-level/mathematics`,
  `cambridge/igcse/mathematics`, `cambridge/a-level/…`). The subject must already exist in the catalogue.
- A **family** is board-agnostic and level-specific: `mathematics-o`, `biology-o`, `chemistry-a`,
  `pure-mathematics-a`. Content is written once per family and tagged automatically to every board's syllabus.
- Organise sub-folders by topic (`questions/algebra/quadratic-equations.json`). File names are free; keys are not.

---

## 3. Keys and naming rules

| Key | Format | Example | Unique within |
| --- | --- | --- | --- |
| family | lower-case words joined by `-` | `mathematics-o` | everything |
| concept key | `<prefix>.<area>.<concept>[.<sub>]`, lower-case segments with `-` | `math.algebra.quadratic-equations.formula` | its family registry |
| item key (lesson, question, flashcard, assessment) | dot-separated lower-case segments, `-` or `_` inside | `quadratics.formula.q08` | its family **and** type |
| node key (syllabus topic) | same as item keys | `algebra.equations` | its syllabus file |

- Concept keys start with the family's `prefix` (`math`, `bio`, `chem`, `phys`, `geo`, `hist`, …), then the broad
  area, then the teachable concept. One concept ≈ one syllabus subtopic or one lesson's worth of learning. Share a
  concept between boards whenever the content is the same; split it when boards examine different depth.
- Item keys: `<topic>.<concept or skill>.<qNN>` for questions, `<topic>.<lesson-name>` for lessons,
  `<topic>.card.<name>` for flashcards, `<topic>.topic-test` / `mock.<paper>.<n>` for tests.
- Database references are `content:<family>:<key>` (tests: `…@<board>/<qualification>/<subject>/<version>`).

---

## 4. Concept registry — `content/concepts/<family>.json`

```json
{
  "family": "mathematics-o",
  "name": "Mathematics (O-Level / IGCSE)",
  "level": "O",
  "prefix": "math",
  "subjects": ["zimsec/o-level/mathematics", "cambridge/igcse/mathematics"],
  "concepts": [
    { "key": "math.algebra.quadratic-equations.factorising", "name": "Solving quadratic equations by factorising", "description": "Rearranging to ax^2 + bx + c = 0, factorising and using the zero-product rule." }
  ]
}
```

- `subjects` lists the catalogue subjects this family serves, **in home-subject preference order** (an item's home
  subject is the first of these it is tagged in; ZIMSEC first).
- `level`: `O` (O-Level / IGCSE) or `A` (AS & A Level).
- Every concept used by a syllabus `covers` list or an item must be in the registry. The validator reports concepts
  no syllabus covers (their content would be invisible) and how many concepts have content.

---

## 5. Syllabus files — `content/syllabi/<board>/<qualification>/<subject>/<version>.json`

The file name is the version label (`2025-2027.json`). One file per syllabus **version**: a published version is
frozen (§26), so a new syllabus is a new file.

```json
{
  "board": "cambridge",
  "qualification": "igcse",
  "subject": "mathematics",
  "versionLabel": "2025-2027",
  "family": "mathematics-o",
  "title": "Cambridge IGCSE Mathematics (0580)",
  "code": "0580",
  "effectiveFrom": "2025-01-01",
  "effectiveTo": "2027-12-31",
  "publishAs": "CURRENT",
  "officialDocument": {
    "title": "Cambridge IGCSE Mathematics 0580 syllabus for examination in 2025, 2026 and 2027",
    "url": "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-mathematics-0580/",
    "publisher": "Cambridge University Press & Assessment (Cambridge International Education)"
  },
  "sourceNote": "Topic headings transcribed from the publicly available syllabus; verify against the current official document.",
  "notes": ["Paper durations must be confirmed in the syllabus assessment overview."],
  "overview": "Our own one-paragraph summary of the syllabus.",
  "assessmentOverview": "Our own summary of the papers.",
  "components": [
    { "code": "2", "name": "Paper 2 (Extended, non-calculator)", "kind": "WRITTEN", "durationMinutes": 120, "maxMarks": 100, "weightingPercent": 50, "calculatorAllowed": false }
  ],
  "routes": [
    { "code": "EXTENDED", "name": "Extended", "components": ["2"] }
  ],
  "topics": [
    {
      "key": "algebra", "code": "2", "name": "Algebra and graphs",
      "children": [
        {
          "key": "algebra.equations", "code": "2.5", "name": "Equations",
          "covers": ["math.algebra.linear-equations", "math.algebra.quadratic-equations.factorising"],
          "objectives": [
            { "code": "2.5.5", "text": "Extended: solve quadratic equations by factorising.", "skill": "APPLICATION" }
          ],
          "components": ["2"]
        }
      ]
    }
  ]
}
```

Node fields: `key` (required, stable), `name` (required), `code` (the board's reference number), `slug` (URL; default
from the name — set it explicitly if two nodes would get the same slug), `kind` (`SECTION` / `TOPIC` / `SUBTOPIC`;
default TOPIC at the top level, SUBTOPIC below a topic; a SECTION groups topics), `description`, `covers` (concept
keys), `objectives` (`code`, `text`, optional `skill`), `components` (paper codes that examine the node — e.g.
Extended-only content), `optional` + `optionGroup` (alternative options), `estimatedStudyMinutes`, `children`.

Rules:

- **Transcribe the structure only**: topic headings and numbering from the publicly available document. Objective
  statements must be **our own paraphrase** (record that in `sourceNote`); never paste syllabus paragraphs.
- Put **uncertainty in `notes`**, never guesses in the tree. Missing objectives are fine; wrong ones are not.
- `covers`: list the concept keys taught under that node, on the **most specific** node only (covering a concept on a
  node and its ancestor is redundant). This is the cross-board mapping: content tagged with a concept appears under
  every node of every syllabus that covers it.
- **Borrowing another family's concepts** (file field `conceptFamilies`, e.g. `["biology-o", "chemistry-o",
  "physics-o"]` for ZIMSEC Combined Science): `covers` may then list those families' concept keys as well as the
  syllabus's own, and every lesson, question and flashcard of those families tagged with a covered concept is tagged
  to this syllabus too (no copies). The syllabus's family still owns the file, its subject and its assessments, whose
  blueprint rules draw from all the questions tagged in it. After adding or changing such a syllabus, re-import the
  borrowed families as well (`--family biology-o,chemistry-o,physics-o`): their published items are re-tagged in
  place.
- Objective codes must be unique within the file (items reference them as `board/qualification/subject:code`).

---

## 6. Lessons — `content/subjects/<family>/lessons/**/*.md`

A lesson file is JSON front matter between two `---` lines, then the Markdown body (no YAML):

```md
---
{
  "key": "quadratics.solving-by-factorising",
  "title": "Solving quadratic equations by factorising",
  "summary": "Rearrange a quadratic equation so that one side is zero, factorise it, and use the zero-product rule.",
  "concepts": ["math.algebra.quadratic-equations.factorising"],
  "objectives": ["zimsec/o-level/mathematics:7.2.3", "cambridge/igcse/mathematics:2.5.5"],
  "estimatedMinutes": 25,
  "freePreview": true,
  "level": "extended"
}
---
## Introduction
…
```

| Field | Required | Meaning |
| --- | --- | --- |
| `key` | yes | Stable item key. |
| `title` | yes | Shown as the page heading (do not repeat it as `#` in the body). |
| `summary` | yes | One or two sentences (cards, search, SEO fallback). |
| `concepts` | yes | Concept keys; the lesson is tagged to every covering topic. The first concept decides the primary topic. |
| `objectives` | no | `board/qualification/subject:code` references; each must belong to a topic the lesson is tagged to. |
| `estimatedMinutes` | yes | Honest study time (3–240), including working through the examples (≈ 60–150 words a minute). |
| `freePreview` | no | `true` = free preview for everyone; default `false` (full access). About one lesson per top-level topic. |
| `level` | no | `core` (default) or `extended` (Cambridge Extended / supplement material). Informational for reviewers only: it is not stored and does not change who sees the lesson (that is decided by the topics its concepts are tagged to). |
| `kind` | no | `LESSON` (default), `REVISION_NOTES`, `WORKED_EXAMPLES`, `EXAM_TIPS`. |
| `slug` | no | URL slug; default from the title. |
| `applies` | no | Restrict to some syllabi (see `applies` in §7). |

### Lesson template (every lesson follows it)

1. `## Introduction` — why the topic matters, a short Zimbabwean context, what the student should already know.
2. `## Key definitions` — `:::definition{term="…"}` blocks (and `:::keyfact` / `:::formula` for facts to learn).
3. `## Explanation` sections (`##` / `###`) with **at least two fully worked examples** for quantitative topics
   (`:::worked-solution[Title with $maths$]` and a numbered list of steps, each step one idea) or well-developed
   illustrative examples (`:::example`) otherwise. Build from easy to exam level.
4. `## Common mistakes` — `:::mistake{title="…"}` blocks naming the misconception and the correction.
5. `## Exam tips` — `:::exam-tip` blocks: command words, mark-earning working, typical traps.
6. `## Summary` — one `:::summary` block with 4–6 bullet points.

Length: typically 900–1,600 words. Short paragraphs (students read on phones). Headings start at `##`, in order.

### Markdown, directives and LaTeX (see `docs/CONTENT_AUTHORING.md` for the full syntax)

- Blocks: `definition`, `keyfact`, `example`, `worked-solution`, `mistake`, `exam-tip`, `note`, `formula`,
  `summary` — anything else is an error. Titles with maths use brackets: `:::worked-solution[Solve $x^2 = 9$]`.
- Inline maths `$…$`, display maths `$$` on their own lines. Chemistry `$\ce{2H2 + O2 -> 2H2O}$`.
- **Units**: upright and spaced — `$5\ \text{cm}$`, `$9.8\ \text{m/s}^2$`, `$32\ \text{m}^2$`, or `$\pu{9.81 m/s^2}$`.
  Never italic units (`$5cm$`). Degrees: `$35^\circ$`.
- **Money**: a dollar sign starts maths, so write `US\$3.50` (and `ZiG 120`). In JSON strings the backslash is
  doubled: `"US\\$3.50"` (see "JSON strings: double every backslash" below).
- Multiplication `\times`, division `\div` or fractions `\frac{a}{b}` (`\dfrac` in display-style inline maths),
  `\pm`, `\sqrt{…}`, `\leq` / `\geq`, `\neq`. No `\href`, `\url`, images inside maths, or macros (`\def`).
- No raw HTML (only `<br>` in tables). No external images. `::question` embeds are not supported in source files.
- Images: `![what the image shows for the learning point](media:diagrams/heart.png "Figure 1: The human heart")`;
  the file must be listed in `media/media.json` (§10). Alt text is mandatory.

### JSON strings: double every backslash

A lesson **body** is a Markdown file, so its LaTeX is written as it is: `$\frac{1}{2}$`, `$8 \times 4$`. Everything
else is a **JSON string**: lesson front matter, questions (stems, options, explanations, hints, worked solutions,
payloads, answer specs), flashcards, assessments, syllabus files. In JSON a backslash starts an escape, so **every
LaTeX backslash is written twice**:

| You want to show | Write in JSON |
| --- | --- |
| $\frac{1}{2}$, $8 \times 4$, $x \neq 0$ | `"$\\frac{1}{2}$, $8 \\times 4$, $x \\neq 0$"` |
| $5\ \text{cm}$, $\sqrt{65}$, $\pm$ | `"$5\\ \\text{cm}$, $\\sqrt{65}$, $\\pm$"` |
| US\$3.50 (money, not maths) | `"US\\$3.50"` |
| a line break (between the steps of a worked solution) | `"1. First step.\n2. Second step."` |

With a single backslash the text is either invalid JSON (`\(`, `\$`, `\sqrt`, `\pi`, `\dfrac`: reported as "Invalid
JSON") or, worse, it silently turns into another character: `\t` is a tab (`\times`, `\text`, `\theta`, `\tan`),
`\f` a form feed (`\frac`), `\b` a backspace (`\beta`, `\bar`, `\binom`), `\r` a carriage return (`\right`, `\rho`)
and `\n` a line break (`\neq`, `\nu`, `\nabla`). KaTeX would then show "8 imes 4" without any error, so the validator
reports every such string as a `json-escape` error.

---

## 7. Questions — `content/subjects/<family>/questions/**/*.json`

A file is a JSON **array** of questions. Common fields:

| Field | Required | Meaning |
| --- | --- | --- |
| `key` | yes | Stable item key. |
| `type` | yes | `MULTIPLE_CHOICE` (also multi-select), `TRUE_FALSE`, `SHORT_ANSWER`, `NUMERICAL`, `CALCULATION`, `FILL_IN_THE_BLANK`, `MATCHING`, `DIAGRAM_LABELLING`, `STRUCTURED`, `ESSAY`, `EXTENDED_RESPONSE`. |
| `concepts` | yes | Concept keys (first = primary topic in each syllabus). |
| `difficulty` | yes | 1–5, see §11.3. |
| `marks` | yes | 1–100. STRUCTURED: the sum of its parts. |
| `estimatedSeconds` | yes | Realistic time (about 60–90 s per mark at exam pace; 30–60 s for one-mark recall). |
| `stem` | yes | The question (Markdown + LaTeX). STRUCTURED: the shared context. |
| `options` | MCQ | `[{ "key": "A", "content": "…", "correct": true, "rationale": "…" }]` — keys A, B, C… in order; `correct` defaults to false. Also on MULTIPLE_CHOICE parts. |
| `payload` | per type | Presentation data (§7.3; the contract is `src/lib/questions/payload.ts`). Never contains the answer. |
| `answerSpec` | per type | Marking specification (§7.3; the contract is `src/lib/questions/answer-spec.ts`). |
| `parts` | STRUCTURED | Parts `{ "label": "(a)", "type", "marks", "stem", "payload", "answerSpec", "options", "markingMode", "explanation", "workedSolution", "hints", "parts" }`; sub-parts `(i)`, `(ii)` one level deep. |
| `markingMode` | no | `AUTO` (default) or `MANUAL` (default for essays). **AI marking is switched off**: never `AI_ASSISTED`. |
| `explanation` | yes | Why the answer is right; shown after answering. |
| `workedSolution` | calculations | Numbered steps with every value shown. |
| `conceptSummary` | no | The idea in one or two sentences. |
| `hints` | recommended | 1–3 progressive hints (required in spirit from difficulty 3). |
| `modelResponse` | auto-marked | A response that must score **full marks** with the real marking engine (§7.2). |
| `wrongResponses` | recommended | Typical wrong responses; each must score **less** than full marks. |
| `skill` | yes | `RECALL`, `UNDERSTANDING`, `APPLICATION`, `ANALYSIS`, `EVALUATION`, `CREATION` (board assessment objectives map onto these: AO1 ≈ recall/understanding, AO2 ≈ application/analysis, AO3 ≈ evaluation). |
| `examStyle` | no | `true` when it mirrors real exam format and difficulty (mock exams draw these). |
| `dailyEligible` | no | `true` = may be the daily question: MCQ, true/false, numerical or short answer; AUTO; difficulty 2–3; access FREE/PUBLIC (default when daily). 2–3 per concept. |
| `applies` | no | Selectors that restrict where it is tagged: `"zimsec"`, `"cambridge/igcse"`, `"zimsec/o-level/mathematics"`, `"…@2025-2027"`. Default: every syllabus whose topics cover its concepts. |
| `objectives` | no | `board/qualification/subject:code` references (must be in a tagged topic). |
| `calculator` | no | `true` / `false` / `null` (unspecified). |
| `paper` | no | Paper it is styled on, e.g. `"Paper 2"`. |
| `access` | no | `PREMIUM` (default, full access), `FREE`, `PUBLIC`. |

### 7.1 Marking: what the engine does

- Deterministic types are always auto-marked: MCQ, true/false, numerical, matching, fill-in-the-blank, diagram
  labelling. SHORT_ANSWER is auto-marked from `accepted` answers, `patterns`, `keywords` or a `rubric`.
- **Accept every equivalent correct answer**: alternative orders (`(x-3)(x-4)` and `(x-4)(x-3)`), spellings
  (`"normalise": ["remove_whitespace", "strip_punctuation"]`), units (`units.accepted`, `units.conversions`),
  sensible rounding (`tolerance`, `decimalPlaces`, `sigFigs` + `precisionPenaltyMarks`).
- `rejected` lists answers that must never be credited (with feedback).
- CALCULATION: the final answer is marked like NUMERICAL. Do **not** use `methodMarks` (they need AI marking, which
  is off); describe M/A marks in the worked solution instead.
- ESSAY / EXTENDED_RESPONSE and "show that" / "explain" parts: `markingMode: "MANUAL"` with our own
  `answerSpec.markScheme.points` (students self-assess against them; teachers can mark). Points must cover all marks.

### 7.2 Responses (`modelResponse`, `wrongResponses`)

Exactly the student response shapes of `src/lib/questions/response.ts`. The response `type` is always the question's
own type (inside a STRUCTURED response: the part's type).

| Type | Response |
| --- | --- |
| MULTIPLE_CHOICE | `{ "type": "MULTIPLE_CHOICE", "optionKeys": ["B"] }` (multi-select: every correct key) |
| TRUE_FALSE | `{ "type": "TRUE_FALSE", "value": false }` (a JSON boolean) |
| SHORT_ANSWER | `{ "type": "SHORT_ANSWER", "text": "(x - 3)(x - 4)" }` |
| NUMERICAL | `{ "type": "NUMERICAL", "value": "75.1", "unit": "km/h" }` — `value` is the typed text, a **string**; `unit` is optional |
| CALCULATION | `{ "type": "CALCULATION", "value": "5" }` — same fields as NUMERICAL |
| FILL_IN_THE_BLANK | `{ "type": "FILL_IN_THE_BLANK", "blanks": [{ "blankId": "p", "text": "3" }] }` (one entry per blank) |
| MATCHING | `{ "type": "MATCHING", "pairs": [{ "leftId": "L1", "rightId": "R2" }] }` (one pair per left item) |
| DIAGRAM_LABELLING | `{ "type": "DIAGRAM_LABELLING", "labels": [{ "targetId": "h1", "labelId": "aorta" }] }` (`targetId` = hotspot id; free-text labelling uses `"text"` instead of `"labelId"`) |
| STRUCTURED | `{ "type": "STRUCTURED", "parts": { "(a)": <response>, "(b)(i)": <response> } }` — keyed by the label path of each part a student answers (a nested part is `"(b)(i)"`, never `"(b)"`); MANUAL parts are left out |
| ESSAY / EXTENDED_RESPONSE | none: they are MANUAL, so put the exemplar in `answerSpec.modelAnswer` |

### 7.3 `payload` and `answerSpec` by type

Field names are exact (unknown fields are errors). Optional fields are marked `?`.

| Type | `payload` (what the student sees) | `answerSpec` (how it is marked) |
| --- | --- | --- |
| MULTIPLE_CHOICE | `selectMode?` `"single"` (default) / `"multiple"`; `shuffleOptions?` (default false) | optional. `scoring?` `"all_or_nothing"` (default) / `"partial"` (multi-select only). The answer is the options with `"correct": true`. |
| TRUE_FALSE | optional. `statementStyle?` `"true_false"` (default) / `"yes_no"` | `correct` (boolean, required); `feedbackTrue?`, `feedbackFalse?` (Markdown shown after answering) |
| SHORT_ANSWER | optional. `maxLength?` (answer box limit) | at least one rule: `accepted [{ value, marks?, feedback?, caseSensitive? }]` (objects), `patterns?` (anchored regular expressions), `keywords? { all?, any?, minAny? }`, `rubric? [{ id, anyOf: ["…"], marks, description? }]`; plus `rejected? [{ value, feedback? }]` and `normalise?` flags. Comparison ignores case unless `caseSensitive`. |
| NUMERICAL, CALCULATION | optional. `unitHint?` (shown after the box, e.g. `"km/h"`), `answerPrefix?` (before it, e.g. `"x ="` or `"US$"`); both are plain text, not Markdown or LaTeX | `value` (a JSON number); `tolerance? { "kind": "absolute", "amount": 0.005 }` or `{ "kind": "relative", "amount": 0.01 }` (a fraction: 0.01 = 1 %); `decimalPlaces?` or `sigFigs? { min?, max? }` with `precisionPenaltyMarks?` (marks lost for the right value at the wrong accuracy; without it a wrongly rounded answer gets nothing); `units? { required? (default false), accepted: ["m", "metres"], conversions? [{ unit, factor, offset? }], penaltyMarks? }`. The tolerance must accept every correctly rounded answer. No `methodMarks`. |
| FILL_IN_THE_BLANK | `template` (prose with `{{blank:id}}`, each blank exactly once, never inside `$…$`); `blanks [{ id, input? "text" (default) / "number" / "select", choices? (select only, at least 2) }]` | `blanks [{ id, accepted: ["…"] (plain strings; for select blanks, one of the choices; for number blanks, numbers), marks?, tolerance? (number blanks, absolute), caseSensitive?, normalise? }]` — one entry per blank; per-blank `marks` add up to the question's marks (omitted: shared equally) |
| MATCHING | `left [{ id, content }]`, `right [{ id, content }]` (content is inline Markdown), `shuffle?` (default true) | `pairs [{ leftId, rightId }]` (every left item; list a left id twice to accept either right item); `marksPerPair?` (pairs × marksPerPair should equal the marks) |
| DIAGRAM_LABELLING | `media` (a file in media.json); `labels? [{ id, text }]` (word bank; omit for free-text labels); `hotspots [{ id, x, y, w?, h? }]` (percent of the image width / height); `shuffleLabels?` (default true) | `hotspots [{ hotspotId, labelId?, alternativeLabelIds?, accepted? ["…"], caseSensitive?, marks? }]` — every hotspot; `labelId` with a word bank, `accepted` texts without one |
| ESSAY, EXTENDED_RESPONSE | optional. `wordLimit? { min?, max? }` | `markScheme { points [{ id, description, marks, indicators? ["…"] }], levels? [{ level, minMarks, maxMarks, descriptor }] }` — points cover every mark; `modelAnswer?` (Markdown, shown after marking); `markingNotes?` |
| STRUCTURED | none (omit it): each part has its own | none: each part has its own |

`normalise` flags: `trim`, `lowercase`, `collapse_whitespace`, `remove_whitespace`, `strip_punctuation`,
`strip_diacritics`, `strip_articles`. Every type also accepts `markingNotes?` (Markdown guidance for human markers).

### 7.4 One complete example per type

These examples are checked by `src/server/content-pipeline/docs-examples.test.ts`; keep them valid.

**Multiple choice (single answer)** — exactly one correct option, at least three plausible distractors, each with a
rationale naming the misconception.

<!-- example:question -->
```json
{
  "key": "doc.quadratics.mcq",
  "type": "MULTIPLE_CHOICE",
  "concepts": ["math.algebra.quadratic-equations.factorising"],
  "difficulty": 2,
  "marks": 1,
  "estimatedSeconds": 60,
  "stem": "Solve $x^2 - 7x + 10 = 0$.",
  "options": [
    { "key": "A", "content": "$x = 2$ or $x = 5$", "correct": true, "rationale": "$(x - 2)(x - 5) = 0$." },
    { "key": "B", "content": "$x = -2$ or $x = -5$", "rationale": "Sign error: $x - 2 = 0$ gives $x = +2$." },
    { "key": "C", "content": "$x = 7$ or $x = 10$", "rationale": "These are coefficients, not roots." },
    { "key": "D", "content": "$x = 1$ or $x = 10$", "rationale": "$1 \\times 10 = 10$ but $1 + 10 \\neq 7$." }
  ],
  "explanation": "Two numbers that multiply to $10$ and add to $-7$ are $-2$ and $-5$, so $(x - 2)(x - 5) = 0$ and $x = 2$ or $x = 5$.",
  "hints": ["Find two numbers that multiply to $10$ and add to $-7$."],
  "modelResponse": { "type": "MULTIPLE_CHOICE", "optionKeys": ["A"] },
  "wrongResponses": [{ "type": "MULTIPLE_CHOICE", "optionKeys": ["B"] }],
  "skill": "APPLICATION",
  "dailyEligible": true
}
```

**Multiple choice (select all that apply)** — `payload.selectMode: "multiple"`, at least two correct options.

<!-- example:question -->
```json
{
  "key": "doc.quadratics.multi",
  "type": "MULTIPLE_CHOICE",
  "concepts": ["math.algebra.quadratic-equations.factorising"],
  "difficulty": 2,
  "marks": 1,
  "estimatedSeconds": 45,
  "stem": "Select **all** the solutions of $x^2 - 16 = 0$.",
  "payload": { "selectMode": "multiple", "shuffleOptions": true },
  "answerSpec": { "scoring": "all_or_nothing" },
  "options": [
    { "key": "A", "content": "$4$", "correct": true, "rationale": "$4^2 = 16$." },
    { "key": "B", "content": "$-4$", "correct": true, "rationale": "$(-4)^2 = 16$ as well." },
    { "key": "C", "content": "$8$", "rationale": "Halving does not undo squaring." },
    { "key": "D", "content": "$16$", "rationale": "$16^2 - 16 \\neq 0$." },
    { "key": "E", "content": "$-16$", "rationale": "$(-16)^2 - 16 \\neq 0$." }
  ],
  "explanation": "$x^2 - 16 = (x - 4)(x + 4)$, so $x = 4$ or $x = -4$.",
  "hints": ["Use the difference of two squares."],
  "modelResponse": { "type": "MULTIPLE_CHOICE", "optionKeys": ["A", "B"] },
  "wrongResponses": [{ "type": "MULTIPLE_CHOICE", "optionKeys": ["A"] }],
  "skill": "APPLICATION"
}
```

**True / false**

<!-- example:question -->
```json
{
  "key": "doc.transport.true-false",
  "type": "TRUE_FALSE",
  "concepts": ["bio.transport.heart"],
  "difficulty": 1,
  "marks": 1,
  "estimatedSeconds": 30,
  "stem": "True or false: arteries carry blood **away from** the heart.",
  "answerSpec": {
    "correct": true,
    "feedbackTrue": "Correct: arteries carry blood away from the heart; veins return it.",
    "feedbackFalse": "Arteries carry blood away from the heart (remember: **a**rteries, **a**way)."
  },
  "explanation": "Arteries carry blood away from the heart under high pressure; veins carry it back to the heart.",
  "modelResponse": { "type": "TRUE_FALSE", "value": true },
  "wrongResponses": [{ "type": "TRUE_FALSE", "value": false }],
  "skill": "RECALL"
}
```

**Short answer** — list every acceptable wording; normalise case, spaces and punctuation; reject common wrong ones.

<!-- example:question -->
```json
{
  "key": "doc.nutrition.short-answer",
  "type": "SHORT_ANSWER",
  "concepts": ["bio.nutrition.photosynthesis"],
  "difficulty": 2,
  "marks": 1,
  "estimatedSeconds": 30,
  "stem": "Name the green pigment in leaves that absorbs light energy for photosynthesis.",
  "answerSpec": {
    "accepted": [{ "value": "chlorophyll" }, { "value": "chlorophyl" }],
    "rejected": [{ "value": "chloroplast", "feedback": "The chloroplast is the organelle; the pigment inside it is chlorophyll." }],
    "normalise": ["strip_punctuation", "strip_articles"]
  },
  "explanation": "Chlorophyll, found in chloroplasts, absorbs mainly red and blue light and passes the energy on for photosynthesis.",
  "modelResponse": { "type": "SHORT_ANSWER", "text": "Chlorophyll" },
  "wrongResponses": [{ "type": "SHORT_ANSWER", "text": "chloroplast" }],
  "skill": "RECALL",
  "dailyEligible": true
}
```

**Numerical** — the value, a tolerance that accepts correct rounding, and accepted units.

<!-- example:question -->
```json
{
  "key": "doc.rates.numerical",
  "type": "NUMERICAL",
  "concepts": ["math.number.rates"],
  "difficulty": 2,
  "marks": 2,
  "estimatedSeconds": 120,
  "stem": "A kombi travels 263 km. It leaves at 07:15 and arrives at 10:45. Calculate its average speed in km/h, correct to 3 significant figures.",
  "payload": { "unitHint": "km/h" },
  "answerSpec": {
    "value": 75.1,
    "sigFigs": { "min": 3, "max": 3 },
    "tolerance": { "kind": "absolute", "amount": 0.05 },
    "precisionPenaltyMarks": 1,
    "units": { "required": false, "accepted": ["km/h", "kmh", "km h^-1", "kilometres per hour"] }
  },
  "explanation": "The journey takes 3 hours 30 minutes, which is $3.5$ hours. Average speed $= \\dfrac{263}{3.5} = 75.14\\ldots \\approx 75.1\\ \\text{km/h}$.",
  "workedSolution": "1. Time: 07:15 to 10:45 is 3 h 30 min $= 3.5$ h.\n2. Speed $= \\dfrac{\\text{distance}}{\\text{time}} = \\dfrac{263}{3.5} = 75.142\\ldots$\n3. To 3 significant figures: $75.1\\ \\text{km/h}$.",
  "hints": ["Convert 3 hours 30 minutes to hours as a decimal."],
  "modelResponse": { "type": "NUMERICAL", "value": "75.1", "unit": "km/h" },
  "wrongResponses": [{ "type": "NUMERICAL", "value": "79.7" }],
  "skill": "APPLICATION"
}
```

**Calculation** — a numeric final answer with full working in `workedSolution`.

<!-- example:question -->
```json
{
  "key": "doc.quadratics.calculation",
  "type": "CALCULATION",
  "concepts": ["math.algebra.quadratic-equations.problems"],
  "difficulty": 3,
  "marks": 3,
  "estimatedSeconds": 210,
  "stem": "A rectangular vegetable bed is $(x + 3)$ m long and $(x - 1)$ m wide. Its area is $32\\ \\text{m}^2$. Form and solve an equation to find $x$.",
  "payload": { "answerPrefix": "x =" },
  "answerSpec": { "value": 5 },
  "explanation": "$(x + 3)(x - 1) = 32$ gives $x^2 + 2x - 35 = 0$, so $(x + 7)(x - 5) = 0$. A width must be positive, so $x = 5$.",
  "workedSolution": "1. $(x + 3)(x - 1) = 32$ **(M1)**\n2. $x^2 + 2x - 35 = 0$\n3. $(x + 7)(x - 5) = 0$ **(M1)**\n4. $x = 5$; reject $x = -7$ because the width would be negative. **(A1)**",
  "hints": ["Area = length × width."],
  "modelResponse": { "type": "CALCULATION", "value": "5" },
  "wrongResponses": [{ "type": "CALCULATION", "value": "-7" }],
  "skill": "APPLICATION",
  "examStyle": true
}
```

**Fill in the blank** — `{{blank:id}}` placeholders in plain prose (never inside `$…$`); `input` is `text`,
`number` or `select` (with `choices`).

<!-- example:question -->
```json
{
  "key": "doc.nutrition.blanks",
  "type": "FILL_IN_THE_BLANK",
  "concepts": ["bio.nutrition.photosynthesis"],
  "difficulty": 2,
  "marks": 2,
  "estimatedSeconds": 60,
  "stem": "Complete the word equation for photosynthesis.",
  "payload": {
    "template": "carbon dioxide + {{blank:water}} → glucose + {{blank:oxygen}}",
    "blanks": [
      { "id": "water", "input": "text" },
      { "id": "oxygen", "input": "select", "choices": ["oxygen", "nitrogen", "carbon dioxide"] }
    ]
  },
  "answerSpec": {
    "blanks": [
      { "id": "water", "accepted": ["water", "H2O"], "marks": 1 },
      { "id": "oxygen", "accepted": ["oxygen"], "marks": 1 }
    ]
  },
  "explanation": "Plants take in carbon dioxide and water and, using light energy, make glucose and release oxygen.",
  "modelResponse": { "type": "FILL_IN_THE_BLANK", "blanks": [{ "blankId": "water", "text": "water" }, { "blankId": "oxygen", "text": "oxygen" }] },
  "wrongResponses": [{ "type": "FILL_IN_THE_BLANK", "blanks": [{ "blankId": "water", "text": "light" }, { "blankId": "oxygen", "text": "carbon dioxide" }] }],
  "skill": "RECALL"
}
```

**Matching** — left items each have a correct right item; add one unused right item as a distractor.

<!-- example:question -->
```json
{
  "key": "doc.cells.matching",
  "type": "MATCHING",
  "concepts": ["bio.cells.organelles"],
  "difficulty": 2,
  "marks": 3,
  "estimatedSeconds": 90,
  "stem": "Match each part of a plant cell with its function.",
  "payload": {
    "left": [
      { "id": "nucleus", "content": "Nucleus" },
      { "id": "chloroplast", "content": "Chloroplast" },
      { "id": "wall", "content": "Cell wall" }
    ],
    "right": [
      { "id": "f1", "content": "Controls the activities of the cell" },
      { "id": "f2", "content": "Carries out photosynthesis" },
      { "id": "f3", "content": "Strengthens the cell and keeps its shape" },
      { "id": "f4", "content": "Releases energy in aerobic respiration" }
    ],
    "shuffle": true
  },
  "answerSpec": {
    "pairs": [
      { "leftId": "nucleus", "rightId": "f1" },
      { "leftId": "chloroplast", "rightId": "f2" },
      { "leftId": "wall", "rightId": "f3" }
    ],
    "marksPerPair": 1
  },
  "explanation": "The nucleus contains the genetic material that controls the cell; chloroplasts trap light for photosynthesis; the cellulose cell wall strengthens the cell. Respiration happens in mitochondria.",
  "modelResponse": { "type": "MATCHING", "pairs": [{ "leftId": "nucleus", "rightId": "f1" }, { "leftId": "chloroplast", "rightId": "f2" }, { "leftId": "wall", "rightId": "f3" }] },
  "wrongResponses": [{ "type": "MATCHING", "pairs": [{ "leftId": "nucleus", "rightId": "f4" }, { "leftId": "chloroplast", "rightId": "f2" }, { "leftId": "wall", "rightId": "f3" }] }],
  "skill": "RECALL"
}
```

**Diagram labelling** — the diagram is a family media file named in `payload.media` (not a database id); hotspots are
percentages of the image width/height; with a word bank (`labels`) the answer is a label id.

<!-- example:question -->
```json
{
  "key": "doc.transport.diagram",
  "type": "DIAGRAM_LABELLING",
  "concepts": ["bio.transport.heart"],
  "difficulty": 2,
  "marks": 2,
  "estimatedSeconds": 90,
  "stem": "Label the two blood vessels marked on the diagram of the heart.",
  "payload": {
    "media": "diagrams/heart-front.png",
    "labels": [
      { "id": "aorta", "text": "Aorta" },
      { "id": "vena-cava", "text": "Vena cava" },
      { "id": "pulmonary-vein", "text": "Pulmonary vein" }
    ],
    "hotspots": [
      { "id": "h1", "x": 55, "y": 12 },
      { "id": "h2", "x": 22, "y": 30 }
    ]
  },
  "answerSpec": {
    "hotspots": [
      { "hotspotId": "h1", "labelId": "aorta", "marks": 1 },
      { "hotspotId": "h2", "labelId": "vena-cava", "marks": 1 }
    ]
  },
  "explanation": "The aorta leaves the left ventricle at the top of the heart; the vena cava returns deoxygenated blood to the right atrium.",
  "modelResponse": { "type": "DIAGRAM_LABELLING", "labels": [{ "targetId": "h1", "labelId": "aorta" }, { "targetId": "h2", "labelId": "vena-cava" }] },
  "wrongResponses": [{ "type": "DIAGRAM_LABELLING", "labels": [{ "targetId": "h1", "labelId": "vena-cava" }, { "targetId": "h2", "labelId": "aorta" }] }],
  "skill": "RECALL"
}
```

**Structured (exam-style, with parts)** — marks of the parts add up to the question's marks; "show that" parts are
MANUAL with mark-scheme points; auto-marked parts are answered in `modelResponse` by label.

<!-- example:question -->
```json
{
  "key": "doc.quadratics.structured",
  "type": "STRUCTURED",
  "concepts": ["math.algebra.quadratic-equations.problems"],
  "difficulty": 4,
  "marks": 6,
  "estimatedSeconds": 420,
  "stem": "A rectangular maize field near Chinhoyi is 20 m longer than it is wide. Its area is $4800\\ \\text{m}^2$. Let the width be $x$ metres.",
  "parts": [
    {
      "label": "(a)",
      "type": "SHORT_ANSWER",
      "markingMode": "MANUAL",
      "marks": 2,
      "stem": "Show that $x^2 + 20x - 4800 = 0$.",
      "answerSpec": {
        "markScheme": {
          "points": [
            { "id": "M1", "description": "Writes the area as $x(x + 20) = 4800$", "marks": 1 },
            { "id": "A1", "description": "Expands and rearranges correctly", "marks": 1 }
          ]
        }
      }
    },
    {
      "label": "(b)",
      "type": "NUMERICAL",
      "marks": 2,
      "stem": "Solve the equation to find the width of the field.",
      "payload": { "unitHint": "m" },
      "answerSpec": { "value": 60, "units": { "required": false, "accepted": ["m", "metres"] } }
    },
    {
      "label": "(c)",
      "type": "NUMERICAL",
      "marks": 2,
      "stem": "Fencing costs US\\$3.50 per metre. Calculate the cost of fencing the perimeter.",
      "payload": { "answerPrefix": "US$" },
      "answerSpec": { "value": 980 }
    }
  ],
  "explanation": "$x(x + 20) = 4800$ gives $(x + 80)(x - 60) = 0$, so the field is 60 m by 80 m; the perimeter is 280 m and the fencing costs US\\$980.",
  "workedSolution": "**(a)** $x(x + 20) = 4800 \\Rightarrow x^2 + 20x - 4800 = 0$.\n\n**(b)** $(x + 80)(x - 60) = 0$, so $x = 60$ (reject $-80$).\n\n**(c)** $2(60 + 80) = 280$ m, $280 \\times 3.50 = 980$.",
  "hints": ["The length is $x + 20$."],
  "modelResponse": { "type": "STRUCTURED", "parts": { "(b)": { "type": "NUMERICAL", "value": "60" }, "(c)": { "type": "NUMERICAL", "value": "980" } } },
  "wrongResponses": [{ "type": "STRUCTURED", "parts": { "(b)": { "type": "NUMERICAL", "value": "80" }, "(c)": { "type": "NUMERICAL", "value": "490" } } }],
  "skill": "ANALYSIS",
  "examStyle": true
}
```

**Structured with sub-parts and a multiple-choice part** — a part of type STRUCTURED holds sub-parts `(i)`, `(ii)`
(one level only; its marks are the sum of its sub-parts and it has no payload or answer spec). Any part type can be
used, including MULTIPLE_CHOICE with `options`. The response is keyed by the full label path: `"(b)(i)"`.

<!-- example:question -->
```json
{
  "key": "doc.quadratics.structured-nested",
  "type": "STRUCTURED",
  "concepts": ["math.algebra.quadratic-equations.completing-the-square", "math.algebra.quadratic-equations.factorising"],
  "difficulty": 3,
  "marks": 5,
  "estimatedSeconds": 360,
  "stem": "This question is about the curve $y = x^2 - 6x + 5$.",
  "parts": [
    {
      "label": "(a)",
      "type": "MULTIPLE_CHOICE",
      "marks": 1,
      "stem": "Which of these is $x^2 - 6x + 5$ written in completed-square form?",
      "options": [
        { "key": "A", "content": "$(x - 3)^2 - 4$", "correct": true, "rationale": "$(x - 3)^2 = x^2 - 6x + 9$ and $9 - 4 = 5$." },
        { "key": "B", "content": "$(x - 3)^2 + 5$", "rationale": "This expands to $x^2 - 6x + 14$: the $9$ from the square must be taken away." },
        { "key": "C", "content": "$(x - 6)^2 - 31$", "rationale": "Halve the coefficient of $x$: $(x - 6)^2$ gives $-12x$, not $-6x$." },
        { "key": "D", "content": "$(x + 3)^2 - 4$", "rationale": "This expands to $x^2 + 6x + 5$: the sign in the bracket must match the $-6x$." }
      ]
    },
    {
      "label": "(b)",
      "type": "STRUCTURED",
      "marks": 2,
      "stem": "Hence write down the coordinates of the turning point of the curve.",
      "parts": [
        { "label": "(i)", "type": "NUMERICAL", "marks": 1, "stem": "The $x$-coordinate.", "payload": { "answerPrefix": "x =" }, "answerSpec": { "value": 3 } },
        { "label": "(ii)", "type": "NUMERICAL", "marks": 1, "stem": "The $y$-coordinate.", "payload": { "answerPrefix": "y =" }, "answerSpec": { "value": -4 } }
      ]
    },
    {
      "label": "(c)",
      "type": "FILL_IN_THE_BLANK",
      "marks": 2,
      "stem": "Solve $x^2 - 6x + 5 = 0$.",
      "payload": {
        "template": "The smaller solution is $x =$ {{blank:small}} and the larger solution is $x =$ {{blank:large}}.",
        "blanks": [{ "id": "small", "input": "number" }, { "id": "large", "input": "number" }]
      },
      "answerSpec": { "blanks": [{ "id": "small", "accepted": ["1"], "marks": 1 }, { "id": "large", "accepted": ["5"], "marks": 1 }] }
    }
  ],
  "explanation": "$x^2 - 6x + 5 = (x - 3)^2 - 9 + 5 = (x - 3)^2 - 4$, so the turning point (a minimum) is $(3, -4)$. Factorising, $(x - 1)(x - 5) = 0$, so $x = 1$ or $x = 5$.",
  "workedSolution": "**(a)** Half of $-6$ is $-3$: $x^2 - 6x = (x - 3)^2 - 9$, so $x^2 - 6x + 5 = (x - 3)^2 - 4$.\n\n**(b)** $(x - 3)^2 \\geq 0$, so the least value of $y$ is $-4$, when $x = 3$: the turning point is $(3, -4)$.\n\n**(c)** $(x - 1)(x - 5) = 0$, so $x = 1$ or $x = 5$. Check: $1 - 6 + 5 = 0$ and $25 - 30 + 5 = 0$.",
  "hints": ["Halve the coefficient of $x$.", "The turning point of $y = (x + p)^2 + q$ is $(-p, q)$."],
  "modelResponse": {
    "type": "STRUCTURED",
    "parts": {
      "(a)": { "type": "MULTIPLE_CHOICE", "optionKeys": ["A"] },
      "(b)(i)": { "type": "NUMERICAL", "value": "3" },
      "(b)(ii)": { "type": "NUMERICAL", "value": "-4" },
      "(c)": { "type": "FILL_IN_THE_BLANK", "blanks": [{ "blankId": "small", "text": "1" }, { "blankId": "large", "text": "5" }] }
    }
  },
  "wrongResponses": [
    {
      "type": "STRUCTURED",
      "parts": {
        "(a)": { "type": "MULTIPLE_CHOICE", "optionKeys": ["D"] },
        "(b)(i)": { "type": "NUMERICAL", "value": "-3" },
        "(b)(ii)": { "type": "NUMERICAL", "value": "-4" },
        "(c)": { "type": "FILL_IN_THE_BLANK", "blanks": [{ "blankId": "small", "text": "-5" }, { "blankId": "large", "text": "-1" }] }
      }
    }
  ],
  "skill": "APPLICATION",
  "examStyle": true
}
```

**Essay / extended response** — MANUAL, our own mark-scheme points covering every mark, a model answer and an
optional word limit. (`ESSAY` and `EXTENDED_RESPONSE` use the same fields; use EXTENDED_RESPONSE for structured
explanations of a few paragraphs, ESSAY for long-form writing in humanities and languages.)

<!-- example:question -->
```json
{
  "key": "doc.digestion.extended",
  "type": "EXTENDED_RESPONSE",
  "concepts": ["bio.nutrition.digestion-absorption"],
  "difficulty": 4,
  "marks": 6,
  "estimatedSeconds": 480,
  "stem": "Explain how the small intestine is adapted for the absorption of digested food. [6]",
  "payload": { "wordLimit": { "max": 250 } },
  "answerSpec": {
    "markScheme": {
      "points": [
        { "id": "P1", "description": "Villi (and microvilli) give a large surface area", "marks": 1 },
        { "id": "P2", "description": "The wall of each villus is one cell thick, so the diffusion distance is short", "marks": 1 },
        { "id": "P3", "description": "A dense capillary network absorbs glucose and amino acids", "marks": 1 },
        { "id": "P4", "description": "Blood flow keeps a steep concentration gradient", "marks": 1 },
        { "id": "P5", "description": "Lacteals absorb fatty acids and glycerol", "marks": 1 },
        { "id": "P6", "description": "The intestine is long, giving time for absorption", "marks": 1 }
      ]
    },
    "modelAnswer": "The small intestine is long and its lining is folded into millions of **villi**, each covered in microvilli, giving a very large surface area. The wall of a villus is only one cell thick, so digested food diffuses a short distance. Each villus has a dense network of capillaries that carry glucose and amino acids away, keeping the concentration gradient steep, and a lacteal that absorbs fatty acids and glycerol."
  },
  "explanation": "Absorption is fast when the surface area is large, the diffusion distance is short and the concentration gradient is kept steep.",
  "skill": "UNDERSTANDING",
  "examStyle": true
}
```

**Essay with a levels mark scheme** (humanities and languages) — the `points` are the indicative content (here each
cause earns 1 mark for identifying it and 1 for explaining it) and the optional `levels` describe the quality of the
whole answer. Both are shown to the student when they compare their answer, and to a teacher who marks it.

<!-- example:question -->
```json
{
  "key": "doc.history.essay",
  "type": "ESSAY",
  "concepts": ["hist.colonial.risings-1896"],
  "difficulty": 4,
  "marks": 12,
  "estimatedSeconds": 1200,
  "stem": "Explain why the Ndebele and the Shona rose against British South Africa Company rule in 1896–1897. [12]",
  "payload": { "wordLimit": { "min": 250, "max": 600 } },
  "answerSpec": {
    "markScheme": {
      "points": [
        { "id": "P1", "description": "Land: settlers took the best land and many Ndebele were moved to the dry Gwaai and Shangani reserves", "marks": 2 },
        { "id": "P2", "description": "Cattle: the Company and the settlers seized most Ndebele cattle after the 1893 war", "marks": 2 },
        { "id": "P3", "description": "Forced labour and the hut tax, often enforced violently by Company officials and the Native Police", "marks": 2 },
        { "id": "P4", "description": "Natural disasters in 1896 (drought, locusts, rinderpest) were blamed on the settlers, and the Company shot cattle to stop rinderpest spreading", "marks": 2 },
        { "id": "P5", "description": "Religious leaders such as Mkwati, Kaguvi and Nehanda encouraged resistance and spread the call to rise", "marks": 2 },
        { "id": "P6", "description": "Opportunity: the Jameson Raid (December 1895 to January 1896) had taken most of the Company's police out of the country", "marks": 2 }
      ],
      "levels": [
        { "level": 3, "minMarks": 9, "maxMarks": 12, "descriptor": "Explains at least four causes with accurate detail, covers both the Ndebele and the Shona, and shows how the causes are linked." },
        { "level": 2, "minMarks": 5, "maxMarks": 8, "descriptor": "Explains two or three causes with some detail, or describes several causes without explaining them." },
        { "level": 1, "minMarks": 1, "maxMarks": 4, "descriptor": "Identifies one or more causes with little or no explanation." },
        { "level": 0, "minMarks": 0, "maxMarks": 0, "descriptor": "Nothing creditworthy." }
      ]
    },
    "modelAnswer": "In 1896 the Ndebele (from March) and then the Shona (from June) rose against Company rule for several connected reasons. After the 1893 war the Company and the settlers took the best land and most of the Ndebele cattle, and many Ndebele were pushed into the dry Gwaai and Shangani reserves. Both peoples resented forced labour on settler farms and mines and the hut tax, which Company officials and the Native Police often collected with violence.\n\nIn 1896 drought, locusts and rinderpest struck. Many people blamed the settlers, and the Company's shooting of cattle to stop the rinderpest made the losses worse. Religious leaders such as Mkwati, Kaguvi and Nehanda encouraged resistance and spread the call to rise. Finally, the failed Jameson Raid had taken most of the Company's police out of the country, so the moment to strike seemed right."
  },
  "explanation": "The risings had long-term causes (loss of land and cattle, forced labour, the hut tax and harsh treatment), short-term triggers (the disasters of 1896), encouragement from religious leaders and an opportunity (few police after the Jameson Raid).",
  "hints": ["Group the causes: long-term grievances, short-term triggers and the opportunity."],
  "skill": "ANALYSIS",
  "examStyle": true
}
```

---

## 8. Flashcards — `content/subjects/<family>/flashcards/**/*.json`

<!-- example:flashcard -->
```json
{
  "key": "doc.card.discriminant",
  "cardType": "DEFINITION",
  "front": "What is the **discriminant** of $ax^2 + bx + c = 0$?",
  "back": "$b^2 - 4ac$, the expression under the square root in the quadratic formula.",
  "notes": "Positive: two roots; zero: one repeated root; negative: no real roots.",
  "concepts": ["math.algebra.quadratic-equations.formula"]
}
```

`cardType`: `DEFINITION`, `FORMULA`, `VOCABULARY`, `CONCEPT`, `DATE`, `FACT`. One idea per card; the front is a short
prompt (fits a phone screen), the back the answer; front and back must differ. About 10 cards per concept: key terms,
formulas, facts, processes, dates. `access` defaults to PREMIUM.

---

## 9. Assessments — `content/subjects/<family>/assessments/**/*.json`

A topic test or mock exam is built from **blueprint rules** that draw questions from the bank, so each attempt is
different and the test grows with the bank. One assessment row is created **per target syllabus version**.

<!-- example:assessment -->
```json
{
  "key": "doc.quadratics.topic-test",
  "kind": "TOPIC_TEST",
  "title": "Quadratic equations: topic test",
  "description": "Factorising and problems leading to quadratic equations.",
  "instructions": "Answer every question. Show your working.",
  "timeLimitMinutes": 10,
  "access": "PREMIUM",
  "feedback": "AFTER_SUBMIT",
  "shuffleOptions": true,
  "scope": { "concepts": ["math.algebra.quadratic-equations.factorising", "math.algebra.quadratic-equations.problems"] },
  "sections": [
    {
      "title": "Section A",
      "rules": [
        { "concepts": ["math.algebra.quadratic-equations.factorising"], "count": 2, "difficulty": [1, 2], "marksPerQuestion": 1 }
      ]
    },
    {
      "title": "Section B",
      "rules": [
        { "concepts": ["math.algebra.quadratic-equations.problems"], "count": 1, "difficulty": [3, 5], "marksPerQuestion": 3, "examStyleOnly": true }
      ]
    }
  ]
}
```

A **fixed** quiz lists question keys instead of rules (every attempt gets the same questions; it can only be published
after its questions are):

<!-- example:assessment -->
```json
{
  "key": "doc.quadratics.quiz",
  "kind": "QUIZ",
  "title": "Quadratic equations: quick quiz",
  "timeLimitMinutes": 5,
  "feedback": "IMMEDIATE",
  "sections": [{ "title": "Questions", "items": [{ "question": "doc.quadratics.mcq" }, { "question": "doc.quadratics.multi" }] }]
}
```

A **mock exam** targets one syllabus (`"syllabus"`) so its sections can name the board's papers (`component`):

<!-- example:assessment -->
```json
{
  "key": "doc.mock.paper-2",
  "kind": "MOCK_EXAM",
  "title": "Mock exam in the style of ZIMSEC O-Level Mathematics Paper 2",
  "description": "An original practice paper in the style of the real exam. It is not an official paper.",
  "timeLimitMinutes": 10,
  "syllabus": "zimsec/o-level/mathematics",
  "sections": [
    {
      "title": "Paper 2",
      "component": "2",
      "rules": [{ "count": 1, "difficulty": [3, 5], "examStyleOnly": true, "marksPerQuestion": 6 }]
    }
  ]
}
```

Fields: `key`, `kind` (`QUIZ`, `TOPIC_TEST`, `CHAPTER_TEST`, `SUBJECT_TEST`, `MOCK_EXAM`, `DIAGNOSTIC`,
`TIMED_EXAM`), `title`, `description`, `instructions`, `timeLimitMinutes`, `access` (default PREMIUM), `feedback`
(`IMMEDIATE`, `AFTER_SUBMIT`, `AFTER_CLOSE`), `shuffleQuestions`, `shuffleOptions`, `allowNavigation`,
`maxAttempts`, `applies` **or** `syllabus`, `scope` (`concepts` or, with `syllabus`, node `topics`), `assembly`
(default BLUEPRINT with rules, FIXED with items only; `ADAPTIVE` for diagnostics), `sections`
(`title`, `instructions`, `component`, `timeLimitMinutes`, `answerCount` + `marks` for "answer any N", `rules`,
`items`).

Rules: `concepts` **or** `topics` (one node key, with `syllabus`), `includeSubtopics` (default true), `count`,
`difficulty` `[min, max]`, `type`, `skill`, `marksPerQuestion`, `examStyleOnly`. Every rule property is a **filter**
on the bank: `marksPerQuestion: 3` draws only questions worth exactly 3 marks (it never rescales a question), so a
section's marks are `count × marksPerQuestion` per rule, and the bank needs at least `count` matching questions for
every target syllabus. Omit `marksPerQuestion` to accept any mark value. A concept-scoped rule draws from the
smallest topic subtree covering its concepts; if that subtree also contains other concepts with questions, those can be
drawn too (the validator warns). The validator proves every rule can be filled from the bank (questions of the
assessment's access tier and below) — exactly like the assessment builder. Mock exams are labelled "in the style of";
never claim to be official papers. Allow about 1–1.5 minutes per mark.

---

## 10. Media — `content/subjects/<family>/media/`

```json
[
  { "file": "diagrams/heart-front.png", "alt": "Front view of the human heart with the aorta at the top right and the vena cava on the left", "caption": "The human heart", "purpose": "DIAGRAM" }
]
```

PNG, JPEG or WebP, under 2 MB, lower-case paths. Draw diagrams yourself (or use licensed / public-domain images and
say so to the reviewer); never screenshots of books or past papers. Alt text describes the learning point (labels,
trends, values), not "diagram". The importer uploads each file once (as `content-<family>-<file>`) through the normal
upload checks; to replace an image, give the new version a new file name.

---

## 11. Quality bar and style guide

### 11.1 Originality and accuracy (non-negotiable)

- **Original wording only.** Never copy or lightly reword textbooks, revision guides, websites, past papers, mark
  schemes or examiner reports. Writing in the exam **style** of a board (command words, mark allocations, structure)
  is expected; reproducing its questions is not.
- **Every fact must be checkable** against established knowledge at the syllabus level. If you are not sure, leave it
  out or flag it for the reviewer in a note — never guess.
- **Every answer is verified**: solve each question independently from the stem alone; compute every number with code
  (unit conversions, rounding, significant figures); check each MCQ distractor is definitely wrong and that the
  marking spec accepts every equivalent correct answer.
- No invented statistics, quotations, dates or "studies show" claims. Real places and organisations only in neutral,
  plausible contexts.

### 11.2 Language and context

- **British English** spelling and usage (colour, metre, organise, programme, practise/practice).
- **SI units** with correct symbols and spacing (`$5\ \text{kg}$`, `$3.2 \times 10^{4}\ \text{J}$`); 24-hour times
  (07:15); dates as 7 October 2026.
- **Zimbabwean context where natural**: names (Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho, Thandeka),
  places (Harare, Bulawayo, Mutare, Gweru, Masvingo, Chinhoyi, Victoria Falls, Kariba, Hwange, the Eastern Highlands),
  money in US dollars (`US\$`) or ZiG, local agriculture (maize, tobacco, cotton, groundnuts, cattle), industry
  (mining, manufacturing), climate and geography. Contexts must be respectful and realistic; do not force them.
- **Command words** used exactly as examiners use them: *state / name / give* (recall, no explanation), *define*,
  *describe* (what happens), *explain* (why / how, with reasons), *suggest* (apply knowledge to a new situation),
  *calculate / work out* (numerical answer, show working), *show that* (prove a given result), *compare*,
  *evaluate / discuss* (weigh up, conclude), *sketch*, *plot*, *hence* (use the previous result).
- **Exam-style mark allocations**: roughly one mark per creditworthy point or step; show marks in the stem of
  long questions (`[3]`) only when the exam style does.
- **Accessibility (§43)**: alt text on every image; do not rely on colour alone; maths as LaTeX, never as images;
  short paragraphs; meaningful link text.

### 11.3 Difficulty calibration

| Difficulty | Description | Typical |
| --- | --- | --- |
| 1 | Recall of a single fact, term or formula | "Which of these is a quadratic equation?" |
| 2 | One routine step or a direct application | "Solve $x^2 - 7x + 10 = 0$." |
| 3 | Two or three steps, or choosing the right method | "Complete the square and find the minimum." |
| 4 | Multi-step problem in context; exam Section B standard | Forming and solving an equation from an area problem |
| 5 | Unfamiliar, multi-step exam-level problem combining ideas; top grades | Proof-style or extended reasoning across topics |

Per concept aim for a spread: about 20% difficulty 1–2 recall, 50% difficulty 2–3 application, 30% difficulty 4–5
exam-style; mostly MCQ, short-answer / numerical and structured exam-style questions, plus fill-in-the-blank,
matching and true/false where they fit; essays and extended responses for humanities and languages.

**Practice is not a copy of the lesson.** A question must not reuse a worked example's numbers, data or wording from
the lesson on the same concept (a student who has just read "US\$1200 at 6% for 3 years = US\$216" learns nothing
from being asked it again). Change the values, the context or the direction (find the rate instead of the interest).
The same applies between questions of one concept: no two questions with the same numbers and the same task.

### 11.4 Writer's checklist

1. Concept keys exist in the registry and every syllabus that should show the item covers them.
2. The lesson follows the template; every worked example has been re-derived.
3. Each question: explanation, hints, realistic marks / time, `modelResponse` scores full marks, `wrongResponses`
   capture real mistakes, MCQs have exactly the intended correct option(s) and ≥ 3 plausible distractors with
   rationales; no question repeats a lesson worked example or another question of the concept (§11.3).
4. Every LaTeX backslash in a JSON string is doubled (`"$\\frac{1}{2}$"`); lesson bodies use single backslashes.
5. `npm run content:validate -- <family>` passes with no errors (and warnings understood), and every
   `npm run content:check -- <family>` finding is fixed or deliberately kept.
6. Nothing copied; British English; SI units; Zimbabwean context where natural.

---

## 12. What the validator checks

Errors (exit code 1): file layout and JSON syntax; LaTeX that lost a backslash to a JSON escape (`json-escape`: a tab,
form feed, backspace or carriage return in any JSON string, or a line break directly followed by the rest of an `\n…`
command such as `eq` of `\neq`); schemas (unknown fields are errors); unique keys; concept,
objective, media and syllabus references resolve; every item is tagged to at least one syllabus topic; lesson,
question and flashcard Markdown renders with **no warnings** (unknown blocks, raw HTML, missing alt text, external
images, money written with `$`, inline-flattened blocks) and no KaTeX errors; question definitions are valid
(`validateQuestionDefinition`); MCQ keys A, B, C…, exactly one correct option (single) or at least two (multi-select)
and at least three distractors; structured parts add up; essays are MANUAL with mark schemes covering the marks; no
AI marking; `modelResponse` scores full marks and each `wrongResponse` scores less with the real marking engine;
daily-question eligibility; duplicate lesson slugs; flashcard sides differ; assessment blueprints satisfiable for every
target syllabus, fixed items exist, papers exist.

Warnings: lesson template blocks missing, lesson length or reading time implausible, missing rationales or hints,
time per mark implausible, redundant or duplicate covers, uncovered concepts, overlapping syllabus versions, rules that
draw from a wider subtree than their concepts.

The validator caches each item's render / marking result under `node_modules/.cache/content-pipeline` (keyed by the
item, the renderer and KaTeX versions), so re-validating tens of thousands of unchanged items takes seconds.

---

## 13. Importing in detail

- Runs as the application database role: every trigger and CHECK applies (§4 of `docs/ARCHITECTURE.md`).
- **Accounts**: the author is the password-less system account `content-pipeline@system.invalid`
  (`CONTENT_PIPELINE_AUTHOR_EMAIL` to change it) with the CONTENT_EDITOR role, created on first use and audited; it
  can never sign in or approve. `--author <email>` records an existing editor instead.
- **Provenance**: every item is `aiGenerated = true` (permanent), source "Original content (AI-assisted, editor review
  required)" (type ORIGINAL), author "Content team", copyright OWNED, licence PROPRIETARY. Syllabus versions cite an
  OFFICIAL_SYLLABUS source per document (headings transcribed, objectives paraphrased: copyright OWNED).
- **Syllabus versions** are created as DRAFT and kept in step with their file while DRAFT (nodes by key). Published
  versions never change: differences are reported as conflicts. With `--approver <admin>` DRAFT versions are published
  and subjects that have a current syllabus and published content are made AVAILABLE. A version is **never** published
  as CURRENT over a CURRENT version that takes effect later (`effectiveFrom`): that would supersede the newer version
  and strand its students, who are only ever offered a move forward. The run reports it instead; check the dates in
  the file, or retire the other version in the CMS.
- **Students see the version they are pinned to** (§26). Content is tagged to the topics of every imported version, so
  a new version file must cover the same concepts; students on an older version keep seeing that version's content
  until they accept the "newer syllabus" move.
- **Items**: see the table at the top of `src/server/content-pipeline/import-items.ts` — created / updated (drafts,
  resubmitted) / unchanged / retagged (published, tags only) / conflict (published, content changed → draft copy for
  review) / skipped (archived) / error. Orphans (keys no longer in the files) are listed, never deleted.
- Tagging: an item is tagged to every node of every syllabus (of its family or borrowing its family's concepts through
  `conceptFamilies`, filtered by `applies`) that covers one of its concepts; questions get one primary topic per syllabus, lessons and flashcards one primary topic overall (in the
  home subject). `dailyEligible` → `Question.isDailyEligible` (used by the nightly daily-question fill).

## 14. Reviewing and publishing

- **/admin/review/topics** (needs `content.review`): pick a syllabus version, then a topic. The page shows everything
  waiting in that topic's subtree in full — lessons rendered, questions with their answers, mark schemes, the stored
  marking specification, explanations and hints, flashcards and test blueprints — with per-item Approve / Request
  changes / Publish, and **Approve and publish all items on this page** (your note is recorded with every approval;
  your own work is skipped under four-eyes; only the items you had on screen are published).
- **`npm run content:publish -- --approver <email>`** does the same from the command line for a family or a topic
  (`--topic <node key>`). **Running it is a human attestation (§41)**: you state that you reviewed every item it
  publishes. Use `--dry-run` to list them first and `--note "<what you checked>"` to record your own words. Order:
  DRAFT syllabus versions (ADMIN approver) → questions → flashcards → lessons → tests. Every approval and publication is
  audited and queues the search re-index; a summary entry records the attestation. With an ADMIN approver, subjects
  with a current syllabus and published content become AVAILABLE (and their qualification, if it was hidden or coming
  soon); `--no-catalogue` skips that.
- **Search** is updated by the background worker (`npm run worker`): publishing queues one `search.reindexEntity`
  job per item, so new content appears in search only once the worker has run. Lessons, practice and tests are visible
  as soon as they are published.
- Development: `npm run content:publish -- --approver demo.admin@example.test` publishes for a local preview only.
  Production publishing runs on deploy under the configured ADMIN approver (see section 1). The demo students' enrolments start on the seeded
  `demo-development` syllabus versions (dated 2000-01-01, so every pipeline version counts as newer): once a pipeline
  version is CURRENT they are offered the move to it on the subject page (progress does not carry over, there is no topic
  lineage between the two), or enrol a fresh student on the pipeline version to preview it.
