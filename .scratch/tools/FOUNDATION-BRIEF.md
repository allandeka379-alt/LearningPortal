# Subject foundation brief (syllabus files, concept registry, writer kit)

A "foundation" prepares one content family so that content writers can start immediately. You transcribe the official
syllabus structure, design the concept registry, set up the generator kit and write the writers' brief. You write NO
lessons or questions.

## Read first

- `docs/CONTENT_PIPELINE.md` §1-§5 (workflow, layout, keys, concept registry, syllabus files) and §9 (assessments),
  §11 (quality bar). Skim §6-§8.
- The worked example: `.scratch/english/build-syllabi.mjs` (registry + three syllabus files built by one script, with
  coverage checks) and `.scratch/english/BRIEF.md` (the writers' brief you will adapt).
- Existing families for conventions: `content/concepts/physics-o.json`, `content/syllabi/zimsec/o-level/physics/2015-2022.json`,
  `content/syllabi/cambridge/igcse/physics/2026-2028.json` (notes, sourceNote, components, objective style).
- Your sources: `.scratch/<subject>/sources/*.txt` (text of the official PDFs, made with `pdftotext -layout`; the PDFs
  are next to them). Tables in the ZIMSEC documents may come out scrambled: read carefully, cross-check the scope and
  sequence against the competency matrix, and record uncertainty in `notes`.
- The catalogue slugs (`prisma/seed/data/catalogue.ts`): the syllabus `subject` must be an existing catalogue slug for
  that board and qualification.

## Deliverables

1. `.scratch/<subject>/build-syllabi.mjs` (run from the repo root with `node`) that writes
   `content/concepts/<family>.json` and one syllabus file per board version
   (`content/syllabi/<board>/<qualification>/<subject>/<version>.json`), with the same checks as the English builder
   (every covered concept exists; a concept is covered at most ONCE per syllabus, on the most specific node; objective
   codes unique; print what each syllabus leaves uncovered).
2. `npm run content:validate -- <family> --strict` passes with 0 errors and 0 warnings (with no content yet, the
   table shows 0/N concepts with content; that is expected).
3. Writer kit in `.scratch/<subject>/`: `lib.mjs` and `build-content.mjs` copied from `.scratch/english/` and adapted
   (family root `content/subjects/<family>`; board selectors for `applies` such as `ZIM`, `CAM`; if the subject has
   numbers, add the `num`/`calc` numeric builders with units and tolerance from `.scratch/combined-science/lib.mjs`
   (`P.num`, `tol2sf`, the UNITS table trimmed/extended for the subject)). Make sure `node .scratch/<subject>/build-content.mjs`
   runs (it can write nothing yet), and that the slice filter works with a trailing-dash prefix.
4. `.scratch/<subject>/BRIEF.md`: the writers' brief, adapted from the English one: what to read, per-concept targets
   (one lesson of 900-1,600 words per concept; 16-22 questions; 8-10 cards), the subject's quality rules (facts,
   numbers verified with code, notation, diagrams described in words or Markdown tables since only uploaded images are
   possible), the **exam-format table** for every paper of every syllabus you built (exact question type, marks,
   `applies` selector, how many items the mocks need — read the papers' structure in each syllabus), **reserved mark
   values** derived from that table, folders and key conventions, commands, hard limits. Then a **proposed split into
   4 writer assignments** (concept lists of roughly equal effort, each with its slice prefix, folders and which
   exam-format rows it owns; at most one lesson per top-level topic gets `freePreview: true`, name them).

## Rules for the syllabus files

- **Structure is transcribed, objectives are paraphrased.** Topic headings and the board's numbering come from the
  document; objective statements are our own short paraphrase; never paste syllabus paragraphs. Codes the board does
  not print are ours and the `sourceNote` says so.
- ZIMSEC versions: `versionLabel` as printed on the document (e.g. 2015-2022), `effectiveFrom` 2018-01-01 unless the
  document says otherwise, `effectiveTo` null, `publishAs` CURRENT, `code` null unless printed (put the commonly cited
  code in a note). `officialDocument.url`: the provincial copy's http URL is not https; use
  `https://www.mopsemashwest.gov.zw/files/<file name URL-encoded>` as the URL and say in `notes` that the site's https
  certificate has expired and which file was read.
- Cambridge versions: the years on the document (e.g. 2027-2029 → effectiveFrom 2027-01-01, effectiveTo 2029-12-31),
  `publishAs` CURRENT, the syllabus code, the PDF URL given in your task. If the version starts in 2027, add the note
  that 2026 candidates are examined on the previous syllabus (not in the repository).
- `components`: every paper with code, name, kind (WRITTEN, MULTIPLE_CHOICE, PRACTICAL, ALTERNATIVE_TO_PRACTICAL,
  COURSEWORK, ORAL, LISTENING, PROJECT), description, durationMinutes, maxMarks, weightingPercent where the document
  gives a clear share of the whole qualification. Core/Extended tiers become `routes` only if the document has tiers.
- `notes`: source read and date (2026-10-08), uncertainties, assessment scheme as read, anything a reviewer must check
  against a clean copy, and the Heritage-Based Curriculum caveat for ZIMSEC (confirm which syllabus November 2026+
  candidates sit).
- Concepts: one concept ≈ one lesson's worth (typically 45-90 per family); key `<prefix>.<area>.<concept>`; shared
  between boards whenever the content is the same, split when depth differs; a description that says exactly what is
  in and out. Every concept is covered by at least one syllabus.

## Hard limits

- Write only inside `.scratch/<subject>/`, `content/concepts/<family>.json` and the syllabus files of your subject.
  Never edit seed data, other families, `.scratch/english/` or `.scratch/tools/`; report needed changes instead (for
  example a catalogue name or code that no longer matches the board).
- Never run git, content:import, content:publish, npm install, prisma, next, or Workflows. One validation at a time.
- Final answer (under 350 words): files written; per syllabus: topics, objectives, concepts covered, what is not
  covered and why; the exam-format table in short; open questions for the owner; anything you could not verify.
