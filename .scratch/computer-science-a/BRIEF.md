# computer-science-a — writing brief for content agents

You write ORIGINAL study content for the A-Level Computer Science family: ZIMSEC A-Level Computer Science (Forms 5-6,
2015-2022) — the main product — and Cambridge International AS & A Level Computer Science 9618 (2027-2029). Content is
DEV preview only; a human reviews it later (§41), but write it as if it ships tomorrow. **Technical accuracy is the first
rule**: a wrong fact, a wrong conversion or a trace that does not match the program is worse than a missing item. This is
A-Level: algorithms, data structures, assembly, logic design and programming are expected, at the depth of the deeper
board.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, **tables**, `code` and fenced code blocks).
- `content/concepts/computer-science-a.json` (109 concepts, prefix `acs`). Each description starts with its coverage
  label — "Both boards (ZIMSEC Form 5; Cambridge AS Level).", "Cambridge only (A Level only).", "ZIMSEC only (Form 6)." —
  and says exactly what is IN and what is OUT; "ZIMSEC detail" / "Cambridge detail" marks content only one board names.
  Stay inside it; when two concepts touch, give the other one a sentence and move on. 49 concepts are shared, 18 are
  ZIMSEC only, 42 are Cambridge only.
- The two syllabus files: `content/syllabi/zimsec/a-level/computer-science/2015-2022.json` (topics 1-9 of the topic
  list; sub-topics are the competency-matrix content items, with our own codes) and
  `content/syllabi/cambridge/a-level/computer-science/2027-2029.json` (section **AS** = topics 1-12, Papers 1 and 2;
  section **A** = topics 13-20, A Level only, Papers 3 and 4; section **PS** = Paper 4 practical). Read the `notes` of
  both (assessment as read, placement of Form 6 items, what each board leaves out).
- **AS versus A Level (Cambridge).** Every Cambridge concept is labelled "Cambridge AS Level" or "Cambridge A Level
  only". AS items feed Papers 1 and 2; A Level items feed Papers 3 and 4. ZIMSEC has no AS/A split: both forms are
  examined together, so a concept that is A Level only for Cambridge (floating point, recursion, OOP) is Form 5 or 6 for
  ZIMSEC. Write it once, at A Level depth, and keep the board differences in a `:::keyfact{title="ZIMSEC and Cambridge"}`.
- The O-level family `content/subjects/computer-science-o/` shows the house style and the pseudocode conventions; go well
  beyond it in depth. `.scratch/computer-science/BRIEF.md` is the O-level brief (same pseudocode rules).
- `.scratch/computer-science-a/lib.mjs`: builders (`concept`, `b.mcq/tf/short/fib/match/num/calc/bits/truth/manualShort/
  ext/struct/card`, `P.*` parts including `P.group` for sub-parts), selectors `ZIM`, `CAM`, `t` (template that turns a
  typed `\n` into a real line break), `EXAM` plans, `checkExam`, `SCENARIO_LEVELS`, and the **checked computer science
  helpers**; the file header and each helper's comment say what it does, and `selftest.mjs` shows every one in use
  (`node --no-warnings .scratch/computer-science-a/selftest.mjs` → `OK 86 checks`):
  - number work: `toBase`, `fromBase`, `twos`, `fromTwos`, `onesComp`, `negateTwos`, `addTwos` (overflow), `subTwos`,
    `addBinary`, `shift`, `binaryMultiply`, `binaryDivide`, `bcd`, `fromBcd`, `fracToBinary`, `group`, `bin`;
  - floating point (mantissa and exponent in two's complement): `fpDecode`, `fpEncode` (throws if inexact unless
    `approx`), `fpNormalise`, `fpRange`, `fpMantissaValue`;
  - media and storage: `bitmapBits`, `depthFor`, `soundBits`, `bytesTo`, `toBytes`, `transferSeconds`, `rle`, `rleText`;
  - integrity and security: `parityBit`, `mod11CheckDigit`, `checksum8`, `asciiSum`, `hashMod`, `caesar`, `modPow`;
  - networks: `ipToInt`, `intToIp`, `subnet`, `ipBinary`, `ipv6Abbrev`;
  - operating systems: `schedule` (FCFS, SJF, SRT, RR) with `ganttMd`, `pageReplace` (FIFO, LRU, OPT);
  - assembly: `runAsm` (the full Cambridge 9618 instruction set; returns the trace, output and memory), `asmTraceMd`,
    `asmListingMd`;
  - algorithms: `traceTable` (generic), `bubbleSort`, `insertionSort`, `quickSort`, `linearSearch`, `binarySearch`,
    `growthTable`, `toRpn`, `evalRpn`;
  - data structures: `bstFrom`, `bstInsert`, `bstDelete`, `inorder`, `preorder`, `postorder`, `bstHeight`, `bstTable`,
    `dijkstra`, `pathTo`, `aStar`;
  - logic: `truthRows`, `truthTableMd`, `L` (not, and, or, nand, nor, xor, xnor), `equivalent`, `minterms`, `kmapMd`,
    `minimise` (Quine-McCluskey simplification, to check Boolean algebra and K-map answers);
  - other: `leastSquares`, `neuron`, `seriesR`, `parallelR`, `mdTable`, `codeBlock`, `chk`, `same`, `round`;
  - **real code**: `py(code, stdin)` runs Python 3 and returns the real output; `pyBlock(code, stdin)` returns the fenced
    code, the fenced output and the text; `sql(setup, query)` and `sqlAfter(...)` run SQL on an in-memory SQLite
    database and return the rows and a Markdown table.
- Style examples: `.scratch/english/slices/a1-nouns-pronouns.mjs` (every MCQ option has a rationale, explanations teach,
  hints from difficulty 3), any `.scratch/computer-science/slices/w1-*.mjs` (bits and truth builders, structured items),
  any `.scratch/biology-a/slices/` file (sub-parts with `P.group`, exam-format items).

## What to produce per concept

1. **One lesson** `content/subjects/computer-science-a/lessons/<area>/<name>.md` (key `<area>.<name>`, where the concept
   key is `acs.<area>.<name>`; e.g. `acs.data.floating-point-representation` →
   `lessons/data/floating-point-representation.md`, key `data.floating-point-representation`), **900-1,600 words** (code
   blocks and tables do not count), template of §6: `## Introduction` (why it matters, a hook — a Zimbabwean or everyday
   context where it is natural and accurate — and what the student should know already), `## Key definitions`
   (`:::definition{term="…"}` in precise examinable wording of your own; `:::keyfact` for values and rules to learn),
   explanation sections in a logical order (mechanisms step by step; algorithms as pseudocode plus a trace; hardware part
   by part with function), **at least two worked examples** (`:::worked-solution` for every conversion, calculation,
   trace, truth table, SQL result, schedule, file size or program output; `:::example` for applied reasoning and
   scenarios), `## Common mistakes` (`:::mistake{title="…"}`), `## Exam tips` (`:::exam-tip`: which papers test it —
   ZIMSEC Papers 1-4, Cambridge Papers 1-4 — and how *state, describe, explain, compare, trace, write an algorithm, write
   a program* are answered for this concept), `## Summary` (one `:::summary`, 4-6 bullets). Front matter: key, title
   (unique), summary, concepts ([the concept]), estimatedMinutes (honest), level "core"; `freePreview: true` ONLY on the
   lessons named in your assignment. Do not add `objectives`. Where the boards differ in depth, terms, units or language add
   a short `:::keyfact{title="ZIMSEC and Cambridge"}` saying who needs what ("Harvard architecture: ZIMSEC only";
   "two's complement overflow: both"; "SQL to 3NF: Cambridge, ZIMSEC stops at 2NF").
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/computer-science-a/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 40%; four options, 1 mark, exam-worthy: they feed ZIMSEC and Cambridge practice and the
     daily questions), `b.bits` (binary / hexadecimal / octal / two's complement answers), `b.truth` (truth tables),
     numerical/calculation (`b.num` / `b.calc`) wherever the concept has numbers (file sizes, addresses, hosts, comparisons,
     waiting times, page faults, outputs of a program), true/false, matching (term ↔ definition, component ↔ function,
     protocol ↔ purpose, test type ↔ description), fill-in-the-blank (trace-table cells, missing pseudocode keywords with
     `choices`, register contents), closed `short` answers (only when every correct form can be listed), 3-5 self-marked
     `manualShort` items (describe / explain / compare / write a short routine, 2-6 marks, one tickable point per mark with
     a model answer, code in a fenced block) and 2-4 **practice structured** items (`b.struct`, difficulty 3-5,
     `examStyle: true`, totals 4, 6, 8, 9, 14 or 16 — never 5, 10, 12, 25, 30 or 40, see reserved marks) on an original
     stimulus (a program, a trace, a table of data, a circuit described in words, a network plan, a database) with
     sub-parts where natural.
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 application, ~30% d4-5 exam-style. `daily: true` only on 2-3
     auto-marked items of difficulty 2-3 per concept (short; no long code).
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION / CREATION (writing an algorithm or program).
     `calculator: false` on items with arithmetic for Cambridge (no calculators in any 9618 paper); keep arithmetic
     mental-friendly (powers of 2, small products). ZIMSEC items may allow a calculator: omit the field for shared items.
   - `applies`: omit when the item suits both boards (the usual case for shared concepts); `applies: ZIM` /
     `applies: CAM` when it depends on one board's content (octal, EBCDIC or Harvard inside a shared concept → ZIM;
     third normal form, two's complement subtraction with overflow rules, `INHERITS` syntax → CAM). Single-board concepts are
     tagged to their board automatically.
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FORMULA, CONCEPT, FACT.

## Computer science quality rules (non-negotiable)

- **Every conversion, sum, shift, file size, trace and truth table is computed in code.** Use the helpers (or plain JS) to
  produce each value you print in stems, explanations and lessons, and pass the computed value to `b.bits` / `b.num` /
  `b.truth`; never type a converted or traced value by hand. Lessons: print tables and traces from a script in
  `.scratch/computer-science-a/tables/<prefix><name>.mjs` (never in `slices/`, which the build imports) and paste the
  output. Run every Python program you show with `py(...)` or `pyBlock(...)` and paste its real output; run every SQL
  query with `sql(...)` and paste its real result. Pseudocode algorithms you trace are mirrored in JS (or Python) in the
  tables script and the trace is generated from that mirror. Assembly programs are run with `runAsm`. Use `chk`/`same` to
  assert a value you also write in prose. Re-derive every worked example from its data.
- **Pseudocode follows the Cambridge 9618 pseudocode guide** (both boards; the guide is on the Cambridge support site and
  is not in the repository, so these are the conventions as we have recorded them; mark any construct you are unsure of
  for the reviewer): fenced code blocks (no language tag), keywords UPPER CASE, identifiers in mixed case
  (`NumberOfPlayers`), four-space indentation, assignment `←` (type the arrow, never `<-` or `=`), `//` comments,
  `DECLARE Total : INTEGER`, `CONSTANT Pi ← 3.142`, types INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE,
  `DECLARE Marks : ARRAY[1:30] OF INTEGER`, `ARRAY[1:3, 1:4] OF CHAR` (lower bound stated; 1 unless the stem says
  otherwise), `INPUT x`, `OUTPUT "Total is ", Total`, `&` for string concatenation, `IF … THEN … ELSE … ENDIF`,
  `CASE OF x … OTHERWISE … ENDCASE`, `FOR i ← 1 TO 10 STEP 2 … NEXT i`, `WHILE … DO … ENDWHILE`,
  `REPEAT … UNTIL …`, `PROCEDURE Name(BYVAL X : INTEGER, BYREF Y : INTEGER) … ENDPROCEDURE` with `CALL Name(5, Count)`,
  `FUNCTION Name(X : INTEGER) RETURNS INTEGER … RETURN … ENDFUNCTION`, `DIV(10, 3)` and `MOD(10, 3)` written as
  functions, `^` for powers, built-in functions in the guide's forms (`LENGTH(s)`, `LEFT(s, n)`, `RIGHT(s, n)`,
  `MID(s, start, n)` with start at 1, `TO_UPPER`, `TO_LOWER`, `NUM_TO_STR`, `STR_TO_NUM`, `ASC`, `CHR`, `INT`,
  `RAND`; the real paper supplies string functions, so say in the stem what a function does), records with
  `TYPE … ENDTYPE`, files with `OPENFILE f FOR READ|WRITE|APPEND`, `READFILE`, `WRITEFILE`, `CLOSEFILE`, `EOF(f)` (random
  files `SEEK`, `GETRECORD`, `PUTRECORD`), classes with `CLASS … ENDCLASS`, `INHERITS`, `NEW`, `PUBLIC`/`PRIVATE`, and
  exceptions `TRY … EXCEPT … ENDTRY`. Relational `= < <= > >= <>`, logical `AND OR NOT`. Line numbers only when a question
  refers to lines. Outside code blocks, identifiers and operators go in `inline code`.
- **Python is the practical language** (Cambridge Paper 4 allows Python, Java or Visual Basic in console mode; ZIMSEC
  allows several): Python 3 console programs in ```` ```python ```` blocks, `snake_case` names, no packages outside the
  standard library, no internet, `input()`/`print()` only, with the output printed from a real run. Show the pseudocode first
  when the paper asks for pseudocode, then the Python.
- **Programs with many valid forms are self-marked against points** (`manualShort`, manual parts, `ext`), one point per
  creditworthy step as examiners award ("initialises the total to zero before the loop", "uses a loop that runs for all
  50 values", "outputs the average with a suitable message"), plus a complete model answer in a code block. Auto-mark
  only closed answers: a value, an output, a trace cell, a keyword chosen from `choices`, an MCQ, a number of passes.
- **Tables are Markdown tables**: trace tables (one column per variable plus OUTPUT, a new row for each change, as
  `traceTable` prints them), truth tables (inputs in binary order, then intermediate columns, then X), Karnaugh maps
  (`kmapMd`), binary place-value working, memory-and-register traces (`asmTraceMd`), schedules (`ganttMd` and the table of
  waiting times), page-replacement tables, database tables and SQL results. No tables inside MCQ options (put the table in
  the stem).
- **No images: gates, circuits, flowcharts, networks, trees and graphs are described precisely in words, expressions or
  tables.** A circuit: "Input A and input B go into an AND gate; input C goes into a NOT gate; the outputs of these two
  gates go into an OR gate, whose output is X", or the expression `X = (A AND B) OR (NOT C)`. A network: a table of devices
  and links. A tree: the order of insertion plus a table of index, left pointer, key, right pointer. A graph: a table of
  edges and weights. Flowcharts: a numbered list or table of boxes (shape, text, where each arrow goes: "Decision:
  Count > 10? Yes → box 6, No → box 3"). Never ask a student to "draw"; ask them to "write the expression", "complete the
  truth table", "describe the circuit", "write the pseudocode", "complete the table". Use `AND OR NOT NAND NOR XOR` in
  expressions (the 9618 style); Boolean algebra laws with the symbols `·`, `+` and an overbar may appear in the
  Boolean-algebra and Karnaugh-map lessons only, defined in the text.
- **Notation and units.** Cambridge uses the IEC names KiB, MiB, GiB, TiB (1024-based) and the decimal kB, MB, GB;
  the ZIMSEC syllabus says KB, MB, GB, TB: in ZIMSEC items state "1 KB = 1024 bytes". Say "8-bit" in the stem when leading
  zeros are required; otherwise pass `acceptUnpadded: true` to `b.bits`. Hexadecimal in upper case; binary in groups of
  four in explanations. Floating-point examples use the Cambridge layout (two's complement mantissa with the binary point
  after the sign bit, two's complement exponent, a stated number of bits for each); never mix in the IEEE 754 layout without
  naming it. `^` is a power, `x` or `×` a product.
- **Facts current and neutral.** Describe technologies generically (no brand comparisons, no prices, no "the latest
  phone"); real organisations only in well-established roles (ZIMSEC, POTRAZ as the telecoms regulator, banks and mobile
  money in general terms, EMA for environment). Zimbabwe-specific law (the Cyber and Data Protection Act, the Copyright and
  Neighbouring Rights Act) stated only in outline and with no section numbers; no legal advice; no invented statistics, usage
  figures or "studies show". Protocol, port and standard numbers must be standard values (HTTP 80, HTTPS 443, SMTP 25,
  POP3 110, IMAP 143, FTP 21); if unsure, leave the number out.
- **Zimbabwean context where natural and accurate:** names (Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho, Thandeka),
  places (Harare, Bulawayo, Mutare, Gweru, Masvingo, Hwange, Kariba), fictional schools, shops, clinics and firms; school
  results, mobile money, load-shedding and borehole pumps as scenarios. Sensitive topics (computer crime, social media
  harm, AI and jobs): balanced, factual, non-judgemental.
- **MCQs:** exactly one defensible answer, four options, distractors from real misconceptions (rationale for each);
  never "all/none of the above", never refer to options by letter. **No length cue** — the key must not be clearly the
  longest option; check with `node .scratch/tools/length-cue.mjs computer-science-a questions/<your folder>/` →
  `# 0 flagged`.
- **Original wording**, British English, dates as 7 October 2026. Never copy past papers, mark schemes, textbooks or the
  syllabus's own example code or tables (the 9618 instruction-set table is a published specification: describe instructions
  in your own words and use your own programs).

### Terminology between the boards

| ZIMSEC (syllabus / usage) | Cambridge 9618 |
|---|---|
| Number bases: binary, octal, denary, hexadecimal, 2's complement; binary multiplication and division | binary, denary, hexadecimal, BCD, one's and two's complement; addition and subtraction |
| Floating point arithmetic (normalisation); computer arithmetic errors (overflow, underflow) | floating-point numbers, normalisation, rounding errors, overflow, underflow (A Level) |
| ASCII, UNICODE, BCD, EBCDIC | ASCII, extended ASCII, Unicode |
| OSI model and TCP/IP model; RIP, OSPF | four-layer TCP/IP stack; protocols HTTP, FTP, POP3, IMAP, SMTP, BitTorrent; circuit and packet switching |
| Hardware architecture: Von Neumann, Harvard, buses, processor components, pipelining | Von Neumann model, registers, buses, performance, RISC and CISC, parallel processors, virtual machines |
| Fetch-decode-execute cycle; internal, external and software interrupts | fetch-execute (F-E) cycle in register transfer notation; interrupts and the ISR |
| Addressing modes (direct, indirect, immediate, indexed, relative) | the same modes, applied in assembly programs |
| Protection, access control and authentication; risk management; disaster recovery | authentication, firewalls, encryption; validation and verification |
| Waterfall SDLC (nine stages), object-oriented methodology, prototyping | program development life cycle (waterfall, iterative, RAD), structure charts |
| Pseudocode structures, trace tables, bubble and quick sort, linear and binary search | algorithms in the 9618 pseudocode guide; bubble, insertion; binary search; Big O |
| Primitive data types (integer, floating point, character, Boolean); static (array) and dynamic (binary tree) structures | INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE; ADTs stack, queue, linked list, dictionary, graph |
| Functions and procedures, parameter passing by value and by reference | procedures and functions, BYVAL and BYREF |
| Relational modelling and normalisation to 2NF; DDL and DML | normalisation to 3NF; DDL and DML in SQL |
| Interface design, user profiling | (not examined) |

In a shared concept use both names the first time ("the fetch-decode-execute (fetch-execute) cycle").

## Exam-format items (rows owned per assignment below)

Use `examStyle: true`, the exact type, marks, skill and `applies` of the row, `paper:` (e.g. `"Cambridge Paper 1"`,
`"ZIMSEC Paper 2"`), and set `concepts` on every item to the concepts it really examines (all covered by every syllabus the
item applies to: an item on a Cambridge-only concept needs `applies: CAM`, on a ZIMSEC-only concept `applies: ZIM`). Wrap
the parts in `checkExam(EXAM.X, [...])` and pass `skill: EXAM.X.skill, secs: EXAM.X.secs` (and
`applies: EXAM.X.applies` where the plan has one). The builder refuses a STRUCTURED item worth 5, 10, 12, 25, 30 or 40
marks, and an EXTENDED_RESPONSE worth 15, that does not match a plan. Part labels: `(a)`, `(b)`, … with sub-parts `(i)`,
`(ii)` one level deep via `P.group`, or `(1)`, `(2)` with sub-parts `(a)`, `(b)`; never "1(a)" (the validator rejects
it). The mocks draw by type + marks + skill (+ topic), so these must be EXACT:

| Paper item | plan | type, marks, skill | applies | parts and content | how many |
|---|---|---|---|---|---|
| ZIMSEC P1 and Cambridge P1 / P3 practice: four-option multiple choice | — | MULTIPLE_CHOICE, 1 | none (both) unless board-specific | every concept's MCQs | ≥ 100 per syllabus (plenty) |
| **Theory structured, 10 marks** — ZIMSEC P1 (9 per mock), Cambridge P1 (AS concepts, 5 per mock), Cambridge P3 (A Level concepts, 5 per mock) | `EXAM.THEORY10` | STRUCTURED, 10, ANALYSIS | none when every concept is covered by both syllabi and the wording suits both; otherwise ZIM or CAM | an original stimulus (a short program, a table of values, a described circuit or network, a database table, a scenario); parts (a), (b), (c) … of 1-4 marks from *state / define* through *calculate / trace / complete* to *explain / compare / evaluate*, sub-parts allowed; at least 5 marks auto-marked; difficulty 3-4 | 4 per writer (32) |
| **Theory structured, 5 marks** — ZIMSEC P1 (2 per mock), Cambridge P1 / P3 (5 per paper) | `EXAM.THEORY5` | STRUCTURED, 5, UNDERSTANDING | as above | one concept area, 2-4 parts of 1-3 marks, mostly short *state / describe / explain / convert*; difficulty 2-3 | 3 per writer (24) |
| **Cambridge P2** (topics 9-12): one structured question | `EXAM.CAM_P2_SHORT` | STRUCTURED, 12, APPLICATION | CAM | a given algorithm or pseudocode to trace (trace table, auto-marked cells), find-and-fix errors, write a short routine (self-marked), identifier table or test data, a record, array or file task, procedure or function with parameters; parts (a), (b) … with sub-parts; at least 4 marks auto-marked; difficulty 3-5 | 8 (W3b 2, W4a 3, W4b 3) |
| **Cambridge P2 final scenario** (15 marks, about 30 minutes) | `CAM_P2_SCENARIO` | EXTENDED_RESPONSE, 15, CREATION | CAM | a described problem; arrays or files already declared (names and sizes given); requirements as bullets; write pseudocode (a Python alternative is not accepted in Paper 2), self-marked with `b.ext({ marks: 15, points, levels: SCENARIO_LEVELS, modelAnswer, wordLimit: { max: 600 } })`; points cover declarations, input and validation, the main loop, each required calculation, output, use of the given structures; the model answer is a complete pseudocode listing in a code block, tested by a JS or Python mirror | 6 (W4a 3, W4b 3) |
| **Cambridge P4** (practical, written practice of 3 programming tasks in Python) | `EXAM.CAM_P4_TASK` | STRUCTURED, 25, CREATION | CAM | one scenario with a source of data given (a table of records or a short file described), 3-5 parts building a program: write a function or class (self-marked against points with a model answer), state the output of the model program for given input (auto-marked, from a real run), choose test data and expected results (auto-marked), explain a design choice; topics 19-20 only (recursion, ADTs, sorting and searching, OOP, file processing and exceptions; no low-level or declarative); difficulty 4-5 | 6 (W4a 2, W4b 4) |
| **ZIMSEC P2 section A** — Computer Architecture (30 marks) | `EXAM.ZIM_P2_ARCH` | STRUCTURED, 30, APPLICATION | ZIM | a practical architecture task on topics 3.1-3.8: logic circuit design and truth tables from a statement (computed), number-base and register work, buses and the fetch-decode-execute cycle with register contents, addressing modes, testing electronic components, an architectural design for a scenario (self-marked); parts (a)-(f) of 2-8 marks; at least 10 marks auto-marked | 4 (W1a 1, W1b 3) |
| **ZIMSEC P2 section B** — Programming, Algorithm design and Databases (40 marks) | `EXAM.ZIM_P2_PROG` | STRUCTURED, 40, CREATION | ZIM | a practical task: design an algorithm (pseudocode and trace), write a Python program or procedures (self-marked against points with a model answer in a code block, run for real), arrays and files, SQL on a given table (auto-marked from a real result) and a relational design or normalisation to 2NF; parts of 2-10 marks; at least 10 marks auto-marked | 4 (W3b 1, W4a 1, W4b 2) |
| **ZIMSEC P2 section C** — Networking (30 marks) | `EXAM.ZIM_P2_NET` | STRUCTURED, 30, ANALYSIS | ZIM | a practical networking task on topics 2.1-2.5: map OSI to TCP/IP for a described transfer, IP addressing and subnet calculations (computed), public/private and DNS reasoning on a given lookup table, routing decisions with RIP hop counts and OSPF costs on a given topology, choosing a cloud service model for a school or business (self-marked); parts of 2-8 marks; at least 10 marks auto-marked | 4 (W2b 4) |

Each exam item: difficulty as stated, `secs` from the plan, a majority of marks auto-marked where the table says so
(`P.num`, `P.bits`, `P.truth`, `P.mcq`, `P.fib`, closed `P.short`), the rest self-marked with line-by-line points and a
model answer. Cambridge items use the 9618 pseudocode guide and Cambridge terms; ZIMSEC items use ZIMSEC terms. The part
structure inside the totals is our convention (the syllabi print only paper totals and, for ZIMSEC Paper 2, three sections
of 30, 40 and 30 marks with six questions); a reviewer must check it against recent papers. ZIMSEC Paper 2 and Cambridge
Paper 4 are done on a computer: our items are written practice of the same skills and the product cannot run a student's
code. Put the items in extra modules:
`concept(<one of the item concepts>, { file: "exam/<prefix>theory", keyPrefix: "exam.<prefix>theory" }, …)` for THEORY10 and
THEORY5 (set `applies` per item), `exam/<prefix>cambridge` (`applies: CAM`) for the Cambridge-only plans (CAM_P2_SHORT,
the scenario, CAM_P4_TASK) and `exam/<prefix>zimsec` (`applies: ZIM`) for the three ZIMSEC Paper 2 plans (e.g.
`exam/w4a-cambridge`, key prefix `exam.w4a-cambridge`).

**Reserved mark values.** STRUCTURED worth **5, 10, 12, 25, 30 or 40** marks, and EXTENDED_RESPONSE worth **15**, are only
for the exam-format items above. Practice structured items use **4, 6, 8, 9, 14 or 16** marks.

**Mock exams** (built later by the lead, not by writers): ZIMSEC P1 9 × THEORY10 + 2 × THEORY5 = 100 marks, 180 min, by
the printed topic shares (Data Representation 15 = 10 + 5, Networking 20 = 10 + 10, Computer Architecture 20 = 10 + 10,
Security and Ethics 10, Algorithm Design and Data Structures 15 = 10 + 5, Databases 10, Enterprising 10); ZIMSEC P2
ZIM_P2_ARCH + ZIM_P2_PROG + ZIM_P2_NET = 100 marks, 180 min (one question from each section); Cambridge P1 5 × THEORY10 +
5 × THEORY5 on topics 1-8 = 75 marks, 90 min; Cambridge P2 5 × CAM_P2_SHORT + 1 × CAM_P2_SCENARIO = 75 marks, 120 min;
Cambridge P3 5 × THEORY10 + 5 × THEORY5 on topics 13-20 = 75 marks, 90 min; Cambridge P4 3 × CAM_P4_TASK = 75 marks,
150 min. ZIMSEC coursework (Paper 3) and the project (Paper 4) are not simulated, and no practical paper can run code.

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas (from the concept keys): data, media, network, hardware, logic, cpu, asm, os, translation, security, ethics, db,
  algo, ds, prog, sdlc, ai, enterprise, skills.
- Lesson titles must be unique (slugs come from titles). Lesson-only scratch scripts go in
  `.scratch/computer-science-a/tables/<prefix><name>.mjs` (never in `slices/`).
- In slice text use real line breaks, or `t` templates: a literal backslash-n in a plain `String.raw` text would show as
  "\n" on screen. Code in template literals: pseudocode arrows `←` are typed as the character.

## Commands (repo root)

- Build your slices only: `node --no-warnings .scratch/computer-science-a/build-content.mjs <your-prefix>` (prefix match on
  the START of file names, e.g. `w2a-`; the trailing dash matters, so `w1a-` does not pick up `w1b-` files).
- Validate: `npm run content:validate -- computer-science-a --strict` → 0 error(s), 0 warning(s). Other writers work in
  the same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- computer-science-a` → fix findings in your files (questions must not reuse a
  lesson worked example's numbers).
- Length cue: see the MCQ rule above.
- Literal backslash-n: `node .scratch/tools/literal-newlines.mjs computer-science-a --list` → `# 0 total` for your files.
- Helper self-test: `node --no-warnings .scratch/computer-science-a/selftest.mjs`.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, concepts.mjs, selftest.mjs, the registry, the syllabus files,
  `.scratch/tools/`, other families or other writers' files: report needed changes (a concept boundary, a missing unit or
  helper) instead.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation, content:check, length-cue and literal-newlines results, any fact you left out or want a reviewer to
  check.

## Proposed split into 8 writer assignments

109 concepts; 13-14 per assignment plus exam rows of roughly equal weight (code-heavy and calculation-heavy concepts count
more; the large ZIMSEC Paper 2 and Cambridge Paper 4 items count about as much as two concepts). Concept keys below drop
the `acs.` prefix. ★ = `freePreview: true` (at most one lesson per top-level topic of each syllabus; a shared concept
counts for both). 19 lessons are free: `data.number-bases` (ZIMSEC 1 / Cambridge 1), `network.ip-addressing` (2 / 2),
`hardware.io-devices` (Cambridge 3), `cpu.architecture-registers` (ZIMSEC 3 / Cambridge 4), `os.functions-utilities`
(Cambridge 5), `security.threats-vulnerabilities` (ZIMSEC 4 / Cambridge 6), `ethics.copyright-licensing` (ZIMSEC 9 /
Cambridge 7), `db.relational-concepts` (8 / 8), `algo.algorithm-design` (ZIMSEC 6 / Cambridge 9), `ds.arrays` (ZIMSEC 7 /
Cambridge 10), `sdlc.life-cycles` (ZIMSEC 5 / Cambridge 12), `data.file-organisation` (Cambridge 13),
`network.application-protocols` (14), `cpu.virtual-machines` (15), `os.process-scheduling` (16),
`security.ssl-tls-certificates` (17), `ai.machine-learning` (18), `ds.stack-queue-algorithms` (19) and
`prog.declarative-programming` (20). Cambridge topic 11 has none, because its concepts share ZIMSEC topic 7 with `ds.arrays`.

**W1a — prefix `w1a-`** (14; data representation, multimedia, logic)
data.number-bases ★, data.binary-arithmetic, data.character-sets, data.floating-point-representation,
data.floating-point-errors, data.file-organisation ★, media.graphics, media.sound, media.compression,
logic.gates-truth-tables, logic.circuits-expressions, logic.adders-flip-flops, logic.boolean-algebra, logic.karnaugh-maps.
Folders: `data/ media/ logic/`. Exam rows: THEORY10 ×4 (number bases and binary arithmetic with overflow, both boards;
floating point, both; logic circuits and truth tables, both; Boolean algebra and K-maps, CAM), THEORY5 ×3 (character sets
and BCD, both; bitmap and sound file size, CAM; compression, CAM), ZIM_P2_ARCH ×1 (logic circuit design for a practical
task, with number-base and gate-count parts).

**W1b — prefix `w1b-`** (14; hardware and the processor)
hardware.io-devices ★, hardware.secondary-storage, hardware.primary-memory, hardware.embedded-control,
hardware.electronic-components, cpu.architecture-registers ★, cpu.buses-ports, cpu.performance,
cpu.fetch-execute-interrupts, cpu.risc-cisc-pipelining, cpu.parallel-processing, cpu.virtual-machines ★,
asm.assembly-language, asm.addressing-modes.
Folders: `hardware/ cpu/` and `asm/` (these two). Exam rows: THEORY10 ×4 (Von Neumann, registers and the F-E cycle, both;
memory and storage with an embedded control system, CAM; interrupts, both; RISC, CISC, pipelining and parallel
processing, CAM), THEORY5 ×3 (buses and bus width, both; input and output devices, CAM; addressing modes, both),
ZIM_P2_ARCH ×3 (electronic components and testing; the F-E cycle with registers and addressing modes; buses, performance
and pipelining).

**W2a — prefix `w2a-`** (13; assembly programs, operating systems, translation, AI)
asm.assembly-programs, asm.bit-manipulation, os.functions-utilities ★, os.process-scheduling ★, os.memory-management,
translation.translators-ide, translation.compilation-stages, translation.bnf-syntax-diagrams, translation.rpn,
ai.graphs-search, ai.machine-learning ★, ethics.ai-impact, ds.graphs-dictionaries.
Folders: `asm/` (assembly-programs, bit-manipulation), `os/ translation/ ai/`, `ethics/ai-impact`,
`ds/graphs-dictionaries`. Every concept here is Cambridge only. Exam rows: THEORY10 ×4 (an assembly trace with bit
manipulation; scheduling and page replacement; compilation, BNF and RPN; Dijkstra and A*; all `applies: CAM`),
THEORY5 ×3 (operating system functions and utilities; translators and IDEs; AI impact).

**W2b — prefix `w2b-`** (13; networks and encryption)
network.lan-wan-models, network.topologies-media, network.lan-hardware, network.internet-hardware-streaming,
network.ip-addressing ★, network.url-dns, network.cloud-computing, network.osi-tcpip-models,
network.application-protocols ★, network.switching, network.routing-protocols, security.encryption,
security.ssl-tls-certificates ★.
Folders: `network/` and `security/` (encryption, ssl-tls-certificates). Exam rows: THEORY10 ×4 (IP addressing and
subnets, both; OSI and TCP/IP layering, both; encryption and certificates, CAM; topologies, media and LAN hardware, CAM),
THEORY5 ×3 (URL and DNS, both; cloud computing, both; protocols and packet switching, CAM), ZIM_P2_NET ×4 (the four
networking tasks described above, one per sub-topic group: OSI/TCP-IP mapping; IP addressing and subnets; DNS and public/
private addresses; routing and cloud service choice).

**W3a — prefix `w3a-`** (14; security, ethics, enterprising, project)
security.privacy-integrity, security.threats-vulnerabilities ★, security.protection-methods,
security.validation-verification, security.risk-recovery-policies, security.legislation-crime,
ethics.professional-ethics, ethics.copyright-licensing ★, ethics.social-environment, enterprise.application-areas,
enterprise.e-business, enterprise.marketing, enterprise.business-proposal, skills.project-report.
Folders: `security/` (these six), `ethics/` (these three), `enterprise/`, `skills/project-report`. Exam rows: THEORY10 ×4
(threats and protection, both; validation and verification with test data, CAM; risk, recovery and legislation, ZIM;
enterprising case, ZIM), THEORY5 ×3 (privacy and integrity, both; ethics and licensing, both; social media and
e-waste, ZIM). The ZIMSEC concepts here are descriptive: set stimuli as short scenarios and mark against points.

**W3b — prefix `w3b-`** (14; databases and software development)
db.relational-concepts ★, db.er-diagrams, db.normalisation, db.dbms, db.sql-ddl, db.sql-dml, db.application-interfaces,
sdlc.life-cycles ★, sdlc.fact-finding-feasibility, sdlc.analysis-design-documentation, sdlc.program-design,
sdlc.testing-maintenance, sdlc.prototyping-oom, sdlc.software-architecture.
Folders: `db/ sdlc/`. Exam rows: THEORY10 ×4 (normalisation of a table to 2NF/3NF, both; SQL on two tables, both;
life cycles and testing, both; a ZIMSEC systems-development case, ZIM), THEORY5 ×3 (DBMS features, both; keys and
relationships, both; maintenance types, CAM), CAM_P2_SHORT ×2 (testing: normal, abnormal and extreme test data with
expected results and error types; structure chart, state-transition and a life-cycle choice), ZIM_P2_PROG ×1 (a school
database: relational design to 2NF, SQL queries from a real run, and a short program that reads it).

**W4a — prefix `w4a-`** (14; algorithms and data structures)
algo.algorithm-design ★, algo.trace-tables, algo.linear-search-bubble-sort, algo.binary-search-insertion-sort,
algo.quick-sort, algo.complexity-big-o, algo.recursion, ds.data-types-records, ds.arrays ★, ds.text-files,
ds.adt-introduction, ds.stack-queue-algorithms ★, ds.linked-list-algorithms, ds.binary-tree-algorithms.
Folders: `algo/` and `ds/` (these seven). Exam rows: THEORY10 ×4 (trace table and errors, both; sorting and searching
with counted comparisons, both; stacks, queues and linked lists, CAM; recursion and binary trees, both), THEORY5 ×3
(data types and records, both; arrays and text files, both; Big O, CAM), CAM_P2_SHORT ×3 (trace and correct an
algorithm; arrays with bubble sort and linear search; records and text files), CAM_P2_SCENARIO ×3 (a Zimbabwean scenario
over arrays: marks processing, stock control, queue management), CAM_P4_TASK ×2 (recursion with a stack or tree in
Python; sorting and searching records), ZIM_P2_PROG ×1 (an algorithm design practical: pseudocode, trace table and Python
with quick sort or binary search).

**W4b — prefix `w4b-`** (13; programming and the practical)
prog.programming-basics, prog.selection, prog.iteration, prog.procedures-functions, prog.language-paradigms,
prog.oop-concepts, prog.oop-programming, prog.declarative-programming ★, prog.file-processing-exceptions,
prog.interface-design, prog.mobile-games-apps, ds.user-defined-types, skills.python-practical.
Folders: `prog/`, `ds/user-defined-types`, `skills/python-practical`. Exam rows: THEORY10 ×4 (constructs and
procedures with parameters, both; OOP design with classes, both; paradigms and declarative reasoning, CAM; files and
exceptions, CAM), THEORY5 ×3 (variables, data types and expressions, both; interface design, ZIM; user-defined types,
CAM), CAM_P2_SHORT ×3 (selection and iteration; procedures and functions with BYVAL/BYREF; string handling),
CAM_P2_SCENARIO ×3 (scenarios using procedures, functions and files), CAM_P4_TASK ×4 (OOP with inheritance; file
processing with exceptions; a record-processing program; a mixed task), ZIM_P2_PROG ×2 (a Python practical with
functions, arrays and a file; an object-oriented practical).

Totals: THEORY10 32, THEORY5 24, CAM_P2_SHORT 8, CAM_P2_SCENARIO 6, CAM_P4_TASK 6, ZIM_P2_ARCH 4, ZIM_P2_PROG 4,
ZIM_P2_NET 4. Concepts per assignment: 14, 14, 13, 13, 14, 14, 14, 13.
