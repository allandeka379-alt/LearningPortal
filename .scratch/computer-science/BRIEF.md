# computer-science-o — writing brief for content agents

You write ORIGINAL study content for the Computer Science family: ZIMSEC O-Level Computer Science (Forms 1-4,
2015-2022) and Cambridge IGCSE Computer Science 0478 (2026-2028, version 6). Content is DEV preview only; a human
reviews it later (§41), but write it as if it ships tomorrow.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, **tables**, `code` and fenced code blocks).
- `content/concepts/computer-science-o.json` (102 concepts, prefix `comp`; each description says exactly what is in
  and out, and "ZIMSEC only" / "Cambridge only" when one board alone examines it).
- The two syllabus files: `content/syllabi/zimsec/o-level/computer-science/2015-2022.json` (topics 6.1-6.11, one
  sub-topic per form: the objective tells you the form) and `content/syllabi/cambridge/igcse/computer-science/2026-2028.json`
  (topics 1-10 with the board's statement numbers). Their `notes` list what each board leaves out and the uncertainties.
- The 0478 pseudocode guide: section 4 of `.scratch/computer-science/sources/0478-2026-2028.txt` (lines ~1330-2000):
  flowchart symbols, logic gate symbols and every pseudocode construct. Read it once; it is the standard for all
  pseudocode in this family (ZIMSEC included).
- `.scratch/computer-science/lib.mjs`: builders (`concept`, `b.mcq/tf/short/fib/match/num/calc/bits/truth/manualShort/
  ext/struct/card`, `P.*` parts) and the **checked helpers**: `toBase`, `fromBase`, `twos`, `fromTwos`, `shift`,
  `addBinary`, `group`, `rle`, `truthRows`, `truthTableMd`, `L` (not/and/or/nand/nor/xor on 0/1), `traceTable`,
  `SCENARIO_LEVELS`. `.scratch/computer-science/selftest.ts` shows each one in use.
- Style examples: `.scratch/english/slices/a1-nouns-pronouns.mjs` (slice style: every MCQ option has a rationale,
  explanations teach, hints from difficulty 3), any `.scratch/accounting/slices/*.mjs` (numeric and structured items),
  and the lesson `content/subjects/combined-science-o/lessons/physics/telecommunication.md` (front matter + blocks).

## What to produce per concept

1. **One lesson** `content/subjects/computer-science-o/lessons/<area>/<name>.md` (key `<area>.<name>`, where the
   concept key is `comp.<area>.<name>`; e.g. `comp.data.binary-denary` → `lessons/data/binary-denary.md`, key
   `data.binary-denary`), **900-1,600 words** (code and tables do not count), template of §6: `## Introduction`
   (a Zimbabwean or everyday context, why it matters in the exam), `## Key definitions` (`:::definition{term="…"}`,
   precise, examinable wording in your own words), explanation sections, **at least two worked examples**
   (`:::worked-solution` for conversions, calculations, traces, truth tables, SQL output; `:::example` for applied
   reasoning and scenarios), `## Common mistakes` (`:::mistake{title="…"}`), `## Exam tips` (`:::exam-tip`; command
   words *state, describe, explain, compare, write an algorithm*), `## Summary` (one `:::summary`). Front matter: key,
   title (unique), summary, concepts ([the concept]), estimatedMinutes (honest), level "core"; `freePreview: true` ONLY
   on the lessons named in your assignment. Do not add `objectives`. Where the boards differ (depth, terms, units,
   language) add a short `:::keyfact{title="ZIMSEC and Cambridge"}`.
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/computer-science/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 40%, four options, 1 mark), `b.bits` (binary/hex/octal/two's complement answers),
     `b.truth` (truth tables), `b.num` / `b.calc` (file sizes, units, counts, outputs), true/false, matching (term →
     definition, device → use, error → type), fill-in-the-blank (trace values, missing pseudocode keywords with
     `choices`), closed `short` answers (only when you can list every correct variant), a few self-marked
     `manualShort` items (describe / explain / write a short algorithm), and 2-4 **practice structured** items
     (`b.struct`, difficulty 3-5, `examStyle: true`, marks **4, 5, 6, 8 or 9** — see reserved marks).
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 application, ~30% d4-5 exam-style. `daily: true` only on 2-3
     auto-marked items of difficulty 2-3 per concept (short; no long code).
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FORMULA, CONCEPT, FACT.
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION / CREATION (writing an algorithm).
   - `calculator: false` on items with arithmetic for Cambridge (no calculators in either 0478 paper); keep all
     arithmetic mental-friendly (powers of 2, small products).

## Computer science quality rules (non-negotiable)

- **Every conversion, sum, shift, file size, trace and truth table is computed in code.** Use `toBase`, `twos`,
  `shift`, `addBinary`, `rle`, `truthRows`/`truthTableMd`, `traceTable` (or plain JS) to produce the values you print
  in stems, explanations and lessons; pass the computed value to `b.bits`/`b.num`/`b.truth`; never type a converted
  value by hand. For lessons, print tables from a script in `.scratch/computer-science/tables/<prefix><name>.mjs`
  (never in `slices/`, which the build imports) and paste the output. Any Python program you show must be run
  (`python` 3 is installed) and its output pasted exactly. Pseudocode algorithms you trace are mirrored in JS in the
  tables script and the trace is generated from that mirror.
- **Pseudocode follows the 0478 conventions** (both boards): fenced code blocks (```` ``` ````, no language tag),
  keywords UPPER CASE, identifiers PascalCase (`NumberOfPlayers`), four-space indentation, assignment `←` (type the
  arrow, never `<-` or `=`), `DECLARE Total : INTEGER`, `CONSTANT Pi ← 3.142`, types INTEGER, REAL, CHAR, STRING,
  BOOLEAN, `ARRAY[1:30] OF STRING`, `ARRAY[1:3, 1:3] OF CHAR` (index from 1 unless stated), `INPUT x`, `OUTPUT "Total
  is ", Total` (commas join output; 0478 defines no concatenation operator), `IF … THEN … ELSE … ENDIF` (THEN and
  ELSE on their own lines, indented), `CASE OF x … OTHERWISE … ENDCASE`, `FOR i ← 1 TO 10 STEP 2 … NEXT i`,
  `WHILE … DO … ENDWHILE`, `REPEAT … UNTIL …`, `PROCEDURE Name(X : INTEGER) … ENDPROCEDURE` with `CALL Name(5)`,
  `FUNCTION Name(X : INTEGER) RETURNS INTEGER … RETURN … ENDFUNCTION` (no CALL for functions), at most three
  parameters, `DIV(10, 3)` and `MOD(10, 3)` written as functions, `ROUND(x, 2)`, `RANDOM()` (0 to 1 inclusive),
  `LENGTH`, `SUBSTRING(s, start, length)` (start at 1), `UCASE`, `LCASE`, `OPENFILE "f.txt" FOR READ`, `READFILE`,
  `WRITEFILE`, `CLOSEFILE`, comments `//`, relational `= < <= > >= <>`, logical `AND OR NOT`. Line numbers only
  when a question refers to lines. Outside code blocks, identifiers and operators go in `inline code`.
- **Programs with many valid forms are self-marked against points** (`manualShort`, manual parts, `ext`), one point
  per creditworthy step as examiners award ("initialises the total to zero before the loop", "uses a loop that runs
  for all 50 values", "outputs the average with a suitable message"), plus a complete model answer in a code block.
  Auto-mark only closed answers: a value, an output, a trace cell, a keyword chosen from `choices`, an MCQ.
- **Tables are Markdown tables**: trace tables (one column per variable plus OUTPUT, a new row for each change, as
  `traceTable` prints them), truth tables (inputs A, B, C in binary order, then intermediate columns, then X),
  binary place-value working (`| 128 | 64 | 32 | … |`), database tables and SQL results. No tables inside MCQ
  options (put the table in the stem).
- **No images: gates, circuits and flowcharts are described precisely in words, expressions or tables.** A circuit:
  "Input A and input B go into an AND gate; input C goes into a NOT gate; the outputs of these two gates go into an
  OR gate, whose output is X", or the expression `X = (A AND B) OR (NOT C)`. Gate symbols are named and described
  ("the NOT gate is a triangle with a small circle at its output"). Flowcharts: a numbered list or table of boxes
  (shape, text, where each arrow goes: "Decision: Count > 10? Yes → box 6, No → box 3"). Never ask a student to
  "draw"; ask them to "write the logic expression", "complete the truth table", "describe the circuit" or "write the
  pseudocode". Use the 0478 logic operators `AND OR NOT NAND NOR XOR` (no Boolean algebra symbols).
- **Units and binary answers**: Cambridge uses 1024-based units with the IEC names (KiB, MiB, GiB, TiB, PiB, EiB);
  the ZIMSEC syllabus names KB, MB, GB, TB — state the factor (1024) in ZIMSEC stems. Say "8-bit" in the stem when
  leading zeros are required; otherwise pass `acceptUnpadded: true` to `b.bits`. Hexadecimal answers in upper case.
- **Facts current and neutral**: describe technologies generically (no brand comparisons, no prices, no "the latest
  phone"); real organisations only in well-established roles (ZIMSEC, POTRAZ as the telecoms regulator, banks
  offering mobile money in general terms). Zimbabwe-specific law (Copyright and Neighbouring Rights Act [Chapter
  26:05]; Cyber and Data Protection Act [Chapter 12:07], 2021) stated only in outline; no invented statistics.
- **MCQs:** exactly one defensible answer, four options, distractors from real misconceptions (rationale for each);
  never "all/none of the above", never refer to options by letter. **No length cue** — the key must not be clearly
  the longest option; check with `node .scratch/tools/length-cue.mjs computer-science-o questions/<your folder>/` →
  `# 0 flagged`.
- **Original wording**, British English, names Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho, Thandeka; places
  Harare, Bulawayo, Mutare, Gweru, Masvingo; fictional schools, shops and firms. Never copy past papers, mark schemes,
  textbooks or the syllabus's own example code.

### Boards

Items without `applies` are tagged to both syllabi: write for both (Cambridge depth, ZIMSEC-friendly wording). Use
`applies: ZIM` / `applies: CAM` when an item depends on one board's depth, units or language (for example Python or
Visual Basic code is ZIMSEC; a 0478 pseudocode-only rule is CAM). Concepts covered by only one syllabus are tagged to
it automatically.

## Exam-format items (rows owned per assignment below)

Use `applies` and `examStyle: true`. The mock papers draw by type + marks, so these must be EXACT:

| Paper item | type | marks | skill | applies | how many |
|---|---|---|---|---|---|
| ZIMSEC P1 (1 h, 40 items): four-option multiple choice, single answer, whole syllabus | MULTIPLE_CHOICE | 1 | any | none (both) or ZIM | every concept's MCQs (≥ 80 ZIMSEC-tagged for two mocks; plenty) |
| ZIMSEC P2 (2 h, 100 marks, 10-12 compulsory structured questions): one question on one topic area, parts (a), (b), … from *state/define* through *convert / trace / complete* to *explain / write an algorithm* | STRUCTURED | 10 | ANALYSIS | ZIM | 6 per writer (24) |
| 0478 P1 Computer Systems (1 h 45, 75 marks, topics 1-6): structured question on one or two subtopics, parts from *state/identify* to *explain/describe*, with conversions or calculations where the topic has them | STRUCTURED | 15 | ANALYSIS | CAM | 10 (W1 4, W2 4, W3 2) |
| 0478 P2 Algorithms, Programming and Logic (topics 7-10), short-answer and structured: trace a given algorithm, find and correct errors, complete a truth table and write the expression, SQL output, validation and test data | STRUCTURED | 12 | APPLICATION | CAM | 10 (W1 3, W3 1, W4 6) |
| 0478 P2 final scenario question (about 30 min): a described problem; write a program in pseudocode (or Python, Visual Basic, Java), self-marked against points (they add up to 15) with `levels: SCENARIO_LEVELS` and a full model answer | EXTENDED_RESPONSE | 15 | CREATION | CAM | 8 (W4) |

Each exam-format item: difficulty 4-5, `secs` 90 per mark, at least a third of the marks auto-marked (`P.bits`,
`P.truth`, `P.num`, `P.mcq`, `P.fib`, closed `P.short`), the rest self-marked with line-by-line points. The scenario
(`b.ext({ marks: 15, points, levels: SCENARIO_LEVELS, modelAnswer, wordLimit: { max: 600 } })`) describes the data
(arrays already populated, their names and sizes), lists the requirements as bullets, and says "All inputs must be
validated" or not; its points cover declarations, input and validation, the main processing loop, each required
calculation, output, and use of the given arrays. Put exam items in `questions/exam/<prefix>zimsec.json` and
`questions/exam/<prefix>cambridge.json`: one extra `concept(...)` module each (`file: "exam/<prefix>zimsec"`,
`keyPrefix: "exam.<prefix>zimsec"`, `applies: ZIM`; the same for Cambridge with `applies: CAM`), setting `concepts:
[...]` on every item to the concepts it actually examines (concepts of your assignment that the item's syllabus covers).

**Reserved mark values.** STRUCTURED worth **10** marks is only for ZIMSEC P2 items; STRUCTURED worth **15** only for
0478 P1; STRUCTURED worth **12** only for 0478 P2; EXTENDED_RESPONSE worth **15** only for the 0478 scenario. Practice
structured items use 4, 5, 6, 8 or 9 marks. One-mark single-answer MCQs feed the ZIMSEC Paper 1 mocks, so keep every
one exam-worthy.

Mock exams (built later, not by writers): ZIMSEC P1 40 × MCQ (60 min); ZIMSEC P2 10 × STRUCTURED 10 (120 min);
0478 P1 5 × STRUCTURED 15 (105 min); 0478 P2 5 × STRUCTURED 12 + 1 × EXTENDED_RESPONSE 15 (105 min). The ZIMSEC
practical (Paper 3), school-based assessment (Paper 4) and project (Paper 5) are not simulated.

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas (from the concept keys): data, logic, hardware, software, network, transmission, internet, security,
  emerging, applications, sad, algorithms, prog, db, web, techno.
- Lesson titles must be unique (slugs come from titles).

## Commands (repo root)

- Build your slices only: `node .scratch/computer-science/build-content.mjs <your-prefix>` (matches the START of the
  slice file name, e.g. `w2-`).
- Validate: `npm run content:validate -- computer-science-o --strict` → 0 error(s), 0 warning(s). Other writers work
  in the same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- computer-science-o` → fix findings in your files (questions must not reuse a
  lesson worked example's numbers).
- Length cue: see above. Helper self-test: `npx tsx --conditions=react-server .scratch/computer-science/selftest.ts`.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, selftest.ts, the registry, the syllabus files or other writers'
  files: report needed changes. Never touch `.scratch/english/` or `content/subjects/english-language-o/`.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation and content:check results, anything unfinished or uncertain.

## Proposed split into 4 writer assignments

Roughly equal effort: calculation- and code-heavy concepts count more, ZIMSEC-only descriptive concepts less.
Concept keys below drop the `comp.` prefix. ZIM = ZIMSEC only, CAM = Cambridge only.

**W1 — prefix `w1-`** (24 concepts; data representation, Boolean logic, data transmission, the internet)
data.number-systems, data.binary-denary, data.hexadecimal, data.octal (ZIM), data.binary-addition,
data.binary-subtraction (ZIM), data.logical-shifts (CAM), data.twos-complement (CAM), data.text-character-sets,
data.sound-images (CAM), data.storage-units, data.file-size (CAM), data.compression (CAM), logic.gates,
logic.truth-tables, logic.circuits-expressions, transmission.packets (CAM), transmission.methods,
transmission.error-detection (CAM), transmission.encryption, hardware.ports-usb, internet.web-browsing,
internet.cookies, internet.digital-currency (CAM).
Folders: `data/ logic/ transmission/ internet/` and `hardware/ports-usb`.
Exam rows: 6 ZIM P2 (number bases; binary arithmetic and ASCII; storage units; logic gates and truth tables;
transmission modes; internet and cookies), 4 CAM P1 (number systems with two's complement and shifts; sound, images,
file size and compression; packets and error detection; USB, encryption and the web), 3 CAM P2 (Boolean logic).
freePreview: `data.binary-denary`, `transmission.packets`, `internet.web-browsing`.

**W2 — prefix `w2-`** (25 concepts; hardware, software, emerging technologies, applications, web design)
hardware.cpu, hardware.fetch-execute (CAM), hardware.embedded-systems (CAM), hardware.input-devices,
hardware.output-devices, hardware.sensors (CAM), hardware.primary-storage, hardware.secondary-storage,
hardware.data-capture-systems (ZIM), hardware.maintenance (ZIM), software.system-application,
software.application-sourcing (ZIM), software.operating-systems, software.interrupts-firmware (CAM),
software.languages-translators (CAM), emerging.automated-systems (CAM), emerging.robotics,
emerging.artificial-intelligence, applications.banking-education-social (ZIM),
applications.transport-health-environment (ZIM), applications.industry-mining-wildlife (ZIM),
applications.agriculture-ambient-gis (ZIM), web.html-elements (ZIM), web.cms-content (ZIM), web.security-testing (ZIM).
Folders: `hardware/` (except ports-usb) `software/ emerging/ applications/ web/`.
Exam rows: 6 ZIM P2 (CPU and storage; input/output devices and POS/ATM systems; software and operating systems;
applications in Zimbabwean sectors; robotics and intelligent systems; web page design), 4 CAM P1 (Von Neumann CPU
and performance; input, output devices and sensors with storage; operating systems, interrupts and translators;
automated systems, robotics and AI). freePreview: `hardware.input-devices`, `software.languages-translators`,
`emerging.robotics`, `web.html-elements`.

**W3 — prefix `w3-`** (27 concepts, mostly ZIMSEC-only descriptive; networks, security and ethics, systems analysis,
technopreneurship)
network.types-topologies (ZIM), network.transmission-media (ZIM), network.wireless-mobile (ZIM), network.devices,
network.addressing, network.protocols (ZIM), network.isp-internet-services (ZIM), network.cloud, security.malware,
security.cyber-attacks, security.authentication-access, security.network-defences, security.cyber-wellness-ethics
(ZIM), security.copyright-plagiarism (ZIM), security.data-privacy (ZIM), security.backup-recovery (ZIM),
algorithms.validation-verification, sad.sdlc-fact-finding (ZIM), sad.feasibility (ZIM), sad.analysis-tools (ZIM),
sad.system-design (ZIM), sad.documentation-training (ZIM), sad.implementation-maintenance (ZIM),
techno.capital-ethics-marketing (ZIM), techno.innovation-ecosystem (ZIM), techno.laws-ipr (ZIM),
techno.finance-market-research (ZIM).
Folders: `network/ security/ sad/ techno/` and `algorithms/validation-verification`.
Exam rows: 6 ZIM P2 (network types and media; protocols and addressing; computer crime and protection; ethics,
copyright and data privacy; a systems analysis case from fact-finding to changeover; technopreneurship), 2 CAM P1
(network hardware, MAC and IP addresses, cloud storage; cyber security threats and defences), 1 CAM P2 (validation
and verification with test data). freePreview: `security.cyber-wellness-ethics`, `sad.sdlc-fact-finding`,
`techno.capital-ethics-marketing`.

**W4 — prefix `w4-`** (26 concepts, the most code-heavy; algorithms, programming, databases)
algorithms.decomposition-pdlc, algorithms.algorithm-basics, algorithms.flowcharts, algorithms.trace-tables,
algorithms.totalling-counting, algorithms.search-sort, algorithms.test-data, algorithms.errors-debugging,
algorithms.scenario-problems, prog.variables-data-types, prog.operators, prog.selection, prog.iteration,
prog.string-handling (CAM), prog.subroutines, prog.maintainable-code, prog.arrays-1d (CAM), prog.arrays-2d (CAM),
prog.file-handling (CAM), prog.gui-oop (ZIM), db.table-design, db.relational-erd (ZIM), db.sql,
db.forms-reports-crud (ZIM), db.advanced-queries (ZIM), db.security (ZIM).
Folders: `algorithms/` (except validation-verification) `prog/ db/`.
Exam rows: 6 ZIM P2 (algorithm and flowchart; trace table; selection and loops; subroutines and testing; relational
database design; SQL and forms), 6 CAM P2 (trace an algorithm; find and fix errors; arrays and string handling;
procedures, functions and files; linear search and bubble sort; single-table database and SQL), 8 CAM scenario
questions. freePreview: `algorithms.algorithm-basics`, `prog.variables-data-types`, `db.table-design`.

freePreview lessons (at most one per top-level topic of each syllabus): binary-denary (Cambridge 1 / ZIMSEC 6.3),
packets (2), input-devices (3 / 6.1), languages-translators (4), web-browsing (5 / 6.4), robotics (6 / 6.2),
algorithm-basics (7 / 6.7), variables-data-types (8 / 6.8), table-design (9 / 6.9), cyber-wellness-ethics (ZIMSEC
6.5), sdlc-fact-finding (6.6), html-elements (6.10), capital-ethics-marketing (6.11). Cambridge topic 10 (Boolean
logic) has none, because its concepts share ZIMSEC topic 6.3 with binary-denary.
