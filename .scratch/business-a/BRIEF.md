# business-a — writing brief for content agents

You write ORIGINAL study content for the A-Level Business family: ZIMSEC A-Level **Business Studies** (Forms 5-6,
2015-2022) and ZIMSEC A-Level **Business Enterprise Skills** (Forms 5-6, 2015-2022) — together the main product — and
Cambridge International AS & A Level **Business 9609** (2026-2028). One family serves all three: concepts are shared
wherever the content is the same. Content is DEV preview only; a human reviews it later (§41), but write it as if it
ships tomorrow. **Numerical accuracy is the first rule**: a ratio computed with the wrong formula, a break-even that does
not reproduce or a network whose critical path was found by eye is worse than a missing item. This is A-Level: analysis,
application to a stated context and a justified judgement (evaluation) are expected, at the depth of the deeper board.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, **tables**, money).
- `content/concepts/business-a.json` (107 concepts). Each description starts with its coverage label — "Both boards
  (ZIMSEC Business Studies Form 5, Business Enterprise Skills Form 5; Cambridge AS Level).", "Cambridge only (A Level
  only).", "ZIMSEC only (Business Studies Form 6)." — and says exactly what is IN and what is OUT; "ZIMSEC detail" /
  "Cambridge detail" / "BES detail" marks content only one syllabus names. Stay inside it; when two concepts touch, give
  the other one a sentence and move on. 92 concepts are shared by both boards, 8 are ZIMSEC only, 7 Cambridge only; 82 are
  in both ZIMSEC syllabi (BS = Business Studies, BES = Business Enterprise Skills; the labels name the form for each).
- The three syllabus files: `content/syllabi/zimsec/a-level/business-studies/2015-2022.json` (8 topics),
  `content/syllabi/zimsec/a-level/business-enterprise-skills/2015-2022.json` (7 topics, numbered 6.1-6.7 as printed) and
  `content/syllabi/cambridge/a-level/business/2026-2028.json` (section **AS** = topics 1.1-5.5, Papers 1 and 2; section
  **A** = topics 6.1-10.4, A Level only, Papers 3 and 4). Read the `notes` of all three (assessment as read,
  conventions, exclusions, routes). Sub-topic and objective codes below topic level are ours (ZIMSEC) or the printed
  numbers (Cambridge 1.1.1 ...).
- **AS versus A Level (Cambridge).** Every Cambridge concept is labelled "Cambridge AS Level" or "Cambridge A Level
  only". AS items feed Papers 1 and 2; A Level items Papers 3 and 4. Many A Level topics for Cambridge (political and
  legal environment, government and the economy, business strategy, organisational structure, communication, leadership,
  elasticity, forecasting, location and scale, quality, lean production, critical path analysis, financial statements,
  ratio analysis, investment appraisal) are Form 5 or Form 6 for ZIMSEC: write them once, at A Level depth.
- The O-level families `content/subjects/business-commerce-o/` and `content/subjects/economics-o/` show the house style
  (lesson structure, tone, layouts); go well beyond them in depth and do not repeat their worked examples.
- `.scratch/business-a/lib.mjs`: builders (`concept`, `b.mcq/tf/short/fib/match/num/calc/manualShort/ext/struct/card`,
  `P.*` parts including `P.group` for sub-parts), selectors `ZIM` (both ZIMSEC syllabi), `ZBS`, `ZBE`, `CAM`, `t`,
  `EXAM` plans, `checkExam`, and the **business calculators**: `ratios.*` (all Cambridge appendix ratios and ZIMSEC
  extras), `cvp(...)` with `.table()`, `costing.*`, `invest.*` (`payback`, `arr`, `df`, `npv`, `npvTable`),
  `evaluateTree` / `expectedValue` (decision trees), `cpa` / `cpaNodes` / `cpaTable` (critical path), `elasticity.*`,
  `market.*`, `movingAverage4` (sales forecasts), `operations.*` (productivity, capacity, EOQ, re-order level),
  `hr.*` (labour turnover), `stats.*` (mean, median, mode, range, standard deviation, stratified samples),
  `variances.*`, `cashForecast`, `inventory.*` (FIFO, LIFO, AVCO, NRV), `depreciation.*`, and checked layouts
  `profitLoss`, `positionStatement`, `cashFlowIndirect`, `cashFlowDirect`, `statement`, `table`, `fmt`, `money`,
  `check`, `chk`, `r2`, `rd`, `sum`, `pctChange`.
- Style examples: `.scratch/accounting-a/slices/` and `.scratch/biology-a/slices/` (sub-parts with `P.group`; every MCQ
  option has a rationale, explanations teach, hints from difficulty 3) and a lesson in
  `content/subjects/business-commerce-o/lessons/` (front matter + blocks + money written `US\$`).

## What to produce per concept

1. **One lesson** `content/subjects/business-a/lessons/<area>/<name>.md` (key `<area>.<name>`, where the concept key is
   `abus.<area>.<name>`; e.g. `abus.finance.break-even` → `lessons/finance/break-even.md`, key `finance.break-even`),
   **900-1,600 words** (tables do not count), template of §6: `## Introduction` (an invented Zimbabwean or regional
   business context, why it matters in the exam, what the student should know already), `## Key definitions`
   (`:::definition{term="…"}` in precise examinable wording of your own; `:::keyfact` for formulas and rules),
   explanation sections in logical order, **at least two fully worked examples** — for numerical concepts
   (`:::worked-solution` with the layout as a Markdown table printed by a script in `.scratch/business-a/tables/`), for
   descriptive concepts a worked **case analysis** (context → point → application to the case → analysis chain →
   judgement) — `## Common mistakes` (`:::mistake{title="…"}`), `## Exam tips` (`:::exam-tip`: which papers test it —
   ZIMSEC Business Studies Papers 1-2, Business Enterprise Skills Papers 1-2, Cambridge Papers 1-4 — and how the command
   words are answered for this concept: Cambridge *define, identify, explain, analyse, assess, evaluate, justify,
   advise, calculate* and ZIMSEC *state, outline, describe, discuss, examine, evaluate*), `## Summary` (one
   `:::summary`, 4-6 bullets). Front matter: key, title (unique), summary, concepts ([the concept]), estimatedMinutes
   (honest), level "core"; `freePreview: true` ONLY on the lessons named in your assignment. Do not add `objectives`.
   **Terminology box:** every lesson whose terms differ between the boards has a short
   `:::keyfact{title="ZIMSEC and Cambridge terms"}` (table below), and says who needs what ("EOQ: ZIMSEC only";
   "Goleman's emotional intelligence: Cambridge A Level only").
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/business-a/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 40%, four options, 1 mark, exam-worthy; these are practice items: neither ZIMSEC nor
     Cambridge Business has a multiple-choice paper), numerical/calculation (`b.num` / `b.calc`) wherever the concept has
     figures, true/false, matching (term ↔ definition, theory ↔ theorist, method ↔ description), fill-in-the-blank
     (with `choices` drop-downs), closed `short` answers, 3-5 self-marked `manualShort` items (explain / analyse /
     assess / justify, 2-6 marks, one tickable point per mark) and 2-4 **practice structured** items (`b.struct`,
     difficulty 3-5, `examStyle: true`, totals **6, 9, 14, 15 or 18** — see reserved marks) built on a stimulus
     (short case extract, data table, figures) with sub-parts where natural.
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 application, ~30% d4-5 exam-style (analysis and evaluation).
     `daily: true` only on 2-3 auto-marked items of difficulty 2-3 per concept (short; no long tables).
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION (AO1-AO4 map: knowledge → RECALL or
     UNDERSTANDING, application → APPLICATION, analysis → ANALYSIS, evaluation → EVALUATION). `calculator: true` on items
     needing one.
   - `applies`: omit when the item suits all syllabi (the usual case for shared concepts); `applies: ZIM` /
     `ZBS` / `ZBE` / `CAM` when it depends on one board's content or term (EOQ, LIFO, reducing balance, cross elasticity,
     statement of cash flows → ZIM or ZBS; Goleman, Vroom, ARR wording of the appendix → CAM). Single-board concepts are
     tagged to their board automatically.
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FORMULA, CONCEPT, FACT.

## Business quality rules (non-negotiable)

- **Every figure is computed and checked in code.** Build stimulus and answer tables with the lib helpers (they throw
  when a statement does not balance, a cash forecast does not carry forward, probabilities do not sum to 1, a network has
  a cycle) and pass every subtotal you show to `statement(..., { checks })`. Compute answers with code (`ratios.*`,
  `cvp`, `invest.*`, `evaluateTree`, `cpa`, `elasticity.*`, `movingAverage4`, `operations.*`) and pass the **exact** value
  to `b.num`/`b.calc`; never type a computed answer by hand (`chk(computed, written)` any value you also write in prose).
  For lessons, print tables from a script in `.scratch/business-a/tables/<prefix><name>.mjs` (never in `slices/`, which
  the build imports) and paste the output. Re-derive every worked example from its data before you finish. A statement of
  financial position must balance and a statement of cash flows must end at the closing cash figure: build both from one
  data set.
- **Numerical answers** (`b.num` single step, `b.calc` multi-step with a `workedSolution` — the default is the
  explanation, so write the explanation as the full calculation): `kind: "money"` (US$ prefix; exact to the cent),
  `"pct"` (state "to one decimal place"; ±0.05), `"ratio"` (state "as x : 1 to two decimal places"; the student types x),
  `"days"` (nearest whole day), `"times"` (one decimal place), `"years"` (payback, two decimal places), `"months"`,
  `"units"`, `"hours"`, `"weeks"`, `"cents"`, `"index"` (a pure number to 2 d.p.: elasticity, EOQ factors), or `"plain"`
  with `unit: "…"` for a unit hint. Put the rounding rule in the stem. Add 1-3 `wrong` values that are the real mistakes
  (sales instead of cost of sales, average inventory forgotten, margin/mark-up swapped, percentage change taken on the
  new value, float read as duration, discount factor of the wrong year) and say why in the explanation.
- **Ratios:** use only the formulas of the Cambridge appendix (`ratios.*`); state the basis in the stem when a figure is
  ambiguous: gross profit margin, operating (profit from operations) margin, ROCE = profit from operations ÷ capital
  employed with capital employed = issued shares + reserves + non-current liabilities, current ratio and acid test as
  `x : 1`, rate of inventory turnover = cost of sales ÷ average inventory, trade receivables days = trade receivables ÷
  credit sales × 365, trade payables days = trade payables ÷ credit purchases × 365, gearing = non-current liabilities ÷
  capital employed × 100, price/earnings, dividend yield = dividend per share ÷ market price × 100, dividend cover =
  profit for the year ÷ annual dividend. ZIMSEC extras (net profit margin, inventory days, EPS) are `applies: ZIM` with
  the formula in the stem. Ratios are never given in the stem of an item that asks for them.
- **Investment appraisal:** payback (inflows even within a year) in years or years and months; **ARR: every stem states
  the formula and its basis** (`invest.arr(outlay, flows, { basis: "initial" })` = average annual profit ÷ initial
  investment × 100, or `"average"` = ÷ half the outlay); NPV with discount factors from a table printed in the stem
  (3 d.p.; `invest.npv` rounds the factors; show it with `invest.npvTable`). No IRR, no discounted payback, no residual
  values (neither board lists them).
- **Break-even and costing:** break-even charts are interpreted from a table (`cvp(...).table([...])`), never drawn by the
  student; contribution = price − variable cost; margin of safety in units or %; special-order decisions state spare
  capacity and no effect on normal sales; full-costing overhead absorption states the basis (units, labour hours).
- **Decision trees and networks:** build the tree with `evaluateTree` and show it as a nested list or table of
  probabilities, outcomes, costs and expected values (state whether outcomes are net of cost); probabilities sum to 1;
  show networks as a precedence table (`cpa`) or an arc table (`cpaNodes`) and print them with `cpaTable`; minimum
  duration, critical path and floats come from the helper, never from the eye. Dummy activities have duration 0.
- **Forecasting:** quarterly data with `movingAverage4`; show the moving totals, centred averages and seasonal
  variations in a table; state the model (additive) and rounding.
- **Statistics (ZIMSEC):** mean, median, mode, range and standard deviation via `stats.*`; stratified sample sizes via
  `stats.stratified` (state rounding); data sets are small and invented.
- **Diagrams** cannot be drawn (only uploaded images are possible): describe organisational charts as indented lists,
  the product life cycle and Boston Matrix as tables, networks as tables, break-even and demand graphs as tables of
  values with a described shape, and decision trees as nested lists.
- **Facts.** Attribute theories to the right person and keep them exact: Taylor (scientific management), Mayo (human
  relations; the Hawthorne studies), Maslow (hierarchy of five needs), Herzberg (hygiene factors and motivators),
  McClelland (achievement, power, affiliation), Vroom (expectancy, instrumentality, valence), McGregor (Theory X and Y),
  Fayol (functions of management) and Mintzberg (managerial roles), Goleman (the four competencies named in the
  syllabus), Porter (five forces), Ansoff (matrix), the Boston Consulting Group (growth-share matrix), Kim and
  Mauborgne (blue ocean), Lewin (force field), Blake and Mouton (managerial grid), Weber (bureaucracy). Give dates only
  when certain. Do not invent statistics, survey results, laws, rates or the names of real firms. Real institutions
  appear only where the syllabi name them (the Zimbabwe Stock Exchange, the African Development Bank, the World Bank, the
  IMF, SADC, COMESA, ECOWAS, ZIMSEC). Refer to laws generally ("labour legislation", "company law") unless you are
  certain of the name; a reviewer checks every statutory reference.
- **Context:** **fictional businesses only** (no real company names): bakeries, tuck shops, poultry projects, mushroom
  and bee-farming ventures, hardware shops, transport operators, small manufacturers, schools' production units, software
  start-ups, mining suppliers, tourism lodges; names such as Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho, Thandeka;
  places Harare, Bulawayo, Mutare, Gweru, Masvingo, Chinhoyi, Victoria Falls, Lusaka, Gaborone, Johannesburg. Case studies
  and data responses are invented and say so ("a fictional business"). Cambridge items use international terminology and
  are valid anywhere; ZIMSEC items use Zimbabwean examples and ZIMSEC wording. British English; dates as 31 December 2025.
- **Money:** US dollars, written `US\$1,250` in Markdown (lesson files: `US\$`; JS strings: `"US\\$"`, or `money(1250)`);
  table headings `US\$` with plain numbers below; commas as thousands separators; cents only when needed. A bare `$` before
  a number is a validation error. No ZiG figures unless a question names another currency (then one currency per
  question). Tax rates, interest rates, discount rates and dividends are stated in the stem as assumptions, never as
  real current figures.
- **MCQs:** exactly one defensible answer, four options, distractors that are definitely wrong (a rationale for each;
  numerical distractors from real errors); never "all/none of the above", never refer to options by letter. **No length
  cue**: the key must not be clearly the longest option; check with
  `node .scratch/tools/length-cue.mjs business-a questions/<your folder>/` → `# 0 flagged`. MCQ options render inline:
  no tables in options (put the table in the stem).
- **Self-marked written items** (`P.manual` / `b.ext` / `b.manualShort`): one tickable point per mark as examiners award
  them (a *point*, a *development using the case*, an *analysis step*; for *evaluate/assess/justify* parts: a judgement
  with a reason, a counter-argument, a recommendation, a condition or a time-frame); points add up to the marks; a model
  answer in full sentences. Evaluation parts use `levels` (level descriptors) in `P.manual` where the mark allocation is
  8 or more.
- **Exclusions** (never write items on them): drawing a full set of accounts (Cambridge asks for ratios and
  interpretation; ZIMSEC asks for straightforward statements); depreciation methods other than straight line in
  Cambridge items (reducing balance is ZIMSEC detail); FIFO/LIFO/AVCO in Cambridge items (net realisable value only); EOQ
  and the cash flow statement in Cambridge items; IRR, discounted payback and residual values; standard costing; drawing
  break-even charts; consolidated accounts; specific software packages; invented laws or policy claims about current
  Zimbabwean government. The enterprise project and the continuous assessment are practical and are not simulated.
- **Original wording.** Never paste or lightly rephrase a syllabus, a textbook or a past paper.

### Terminology between the boards

Items without `applies` are tagged to all syllabi: give both names the first time ("inventory (stock)") or choose neutral
wording. Use `applies` when an item depends on one board's term or rule.

| ZIMSEC (syllabus / common usage) | Cambridge 9609 |
|---|---|
| Stock; stock control; stock turnover; stock valuation (FIFO, LIFO, AVCO) | Inventory; inventory control; rate of inventory turnover; net realisable value (no methods named) |
| Debtors / creditors; debtor days / creditor days | Trade receivables / trade payables; trade receivables / payables turnover (days) |
| Turnover; sales | Revenue |
| Income statement; net profit | Statement of profit or loss; profit for the year; profit from operations (operating profit) |
| Statement of financial position (balance sheet) | Statement of financial position |
| Absorption costing; contribution costing | Full costing; contribution costing |
| Labour/management relations; promotion of cooperation | Management and workforce relations; collective bargaining |
| Business enterprise; enterprise; enterpriser (BES) | Business; entrepreneur; enterprise |
| Quality control; quality assurance (inspection, TQM, kaizen groups) | Quality control; quality assurance; TQM; benchmarking |
| Strategic, tactical, operational objectives | Mission statement, aims, objectives, strategy, tactics |
| Production methods (job, batch, flow/continuous) | Operations methods (job, batch, flow, mass customisation) |
| Production plant location and relocation | Location (local, national, international), offshoring, reshoring |
| Economic order quantity (EOQ) | Not examined |
| Network analysis (EST, LFT, minimum project duration) | Critical path analysis (total and free float) |
| Cash flow forecast; cash budget (BES) | Cash flow forecast |
| Capital structure ratio (BES); investor ratios | Gearing ratio; investment ratios |

## Exam-format items (rows owned per assignment below)

Use `examStyle: true`, the exact type, marks, skill and `applies` of the row, `paper:` (e.g. `"ZIMSEC Business Studies
Paper 2"`, `"Cambridge Paper 3"`), and set `concepts` on every item to the concepts it really examines (all covered by
every syllabus the item applies to; a Cambridge Paper 1 or 2 item must use AS concepts only; a Paper 3 or 4 item
A Level concepts only). Wrap the parts in `checkExam(EXAM.X, [...])` and pass `skill: EXAM.X.skill, secs: EXAM.X.secs`
and an `applies` allowed by the plan (`EXAM.X.appliesAny`: ZIMSEC plans accept `ZIM`, `ZBS` or `ZBE`; Cambridge plans
`CAM`). The builder refuses a STRUCTURED item worth 5, 8, 10, 12, 16, 20, 25 or 30 marks (and an EXTENDED_RESPONSE worth
12) that does not match a plan. Part labels: `(a)`, `(b)`, … with sub-parts `(i)`, `(ii)` one level deep via `P.group`,
or `(1)`, `(2)` with sub-parts `(a)`, `(b)`; never "1(a)" (the validator rejects it). The mocks draw by type + marks +
skill (+ topic), so these must be EXACT:

| Paper item | plan | type, marks, skill | applies | parts and content | how many |
|---|---|---|---|---|---|
| **ZIMSEC BS P1 section A** (structured, 70 marks) and **BES P1 section A** (40 marks): one structured question | `EXAM.ZIM_STRUCT10` | STRUCTURED, 10, APPLICATION | ZIM, or ZBS / ZBE when the concept is covered by one syllabus only | a short stimulus (data, extract or figures); parts (a), (b), (c) of 2-4 marks from *state/outline* through *calculate* to *explain/discuss*, sub-parts allowed; at least 4 marks auto-marked; difficulty 3-4 | 3 per writer, 4 for W1a (25) |
| **ZIMSEC BS P2 section A**: the data response question (25 marks) | `EXAM.ZIM_DATA25` | STRUCTURED, 25, ANALYSIS | ZIM or ZBS | a data stimulus (text with a table of figures: sales, costs, survey results, ratios); 4-6 parts with sub-parts mixing extraction, calculation (auto-marked), interpretation and a final recommendation; difficulty 4-5 | 1 per writer (8) |
| **ZIMSEC BS P2 section B** (3 essays of 25 from 9) and **BES P2** (4 essays of 25 from 10): an essay question | `EXAM.ZIM_ESSAY25` | STRUCTURED, 25, EVALUATION | ZIM, ZBS or ZBE | (a) 10 *describe/explain/analyse* and (b) 15 *discuss/evaluate*, both `P.manual({ type: "EXTENDED_RESPONSE", points, levels, modelAnswer, wordLimit })` with one point per mark and a full model answer; difficulty 4-5 | 2 per writer (16) |
| **ZIMSEC BS P1 section B** (one case study, 30 marks) and **BES P1 section B** (two case studies, 60 marks): 30 marks on a case study | `EXAM.ZIM_CASE30` | STRUCTURED, 30, ANALYSIS | ZIM, ZBS or ZBE | a fictional case study of 150-250 words with a table of figures; 5-7 parts across functional areas (calculations auto-marked, analysis and a recommendation self-marked); difficulty 4-5 | 1 per writer (8) |
| **Cambridge P1 section A**: a five-mark question (two parts) | `EXAM.CAM_SHORT5` | STRUCTURED, 5, APPLICATION | CAM | AS concepts; (a) 2 marks *define/identify/calculate*, (b) 3 marks *explain* with application to a one-sentence context | 2 per writer (16) |
| **Cambridge P1 section B** (AS content) and **Cambridge P4** (A Level content, with a case extract): a 20-mark essay | `EXAM.CAM_ESSAY20` | STRUCTURED, 20, EVALUATION | CAM | (a) 8 *analyse/explain/assess* and (b) 12 *evaluate/assess/advise*, both `P.manual` with points, `levels` and a model answer; AS concepts for P1, A Level concepts for P4 (see assignments) | 2 per writer (16: 7 AS, 9 A Level) |
| **Cambridge P2**: a data response question (30 marks, six parts, last part evaluation) | `EXAM.CAM_DATA30` | STRUCTURED, 30, APPLICATION | CAM | AS concepts; a text-and-data stimulus (a fictional business, figures); six parts (a)-(f) of 2-6 marks: identify, calculate (auto-marked), explain, analyse, assess, and a final evaluate/advise (6-8 marks, self-marked) | 1 per writer (8) |
| **Cambridge P3 questions 1 and 2**: an 8-mark question | `EXAM.CAM_P3_8` | STRUCTURED, 8, APPLICATION | CAM | A Level concepts; a short case extract; a calculation or a short analysis; (a)/(b) parts allowed (our convention: the real question is undivided) | 2 each for W1b-W4b (14) |
| **Cambridge P3 questions 3 and 4**: a 16-mark question ending with evaluation | `EXAM.CAM_P3_16` | STRUCTURED, 16, ANALYSIS | CAM | A Level concepts; case extract and figures; 3 parts (calculate, analyse, evaluate) or 2 parts (analyse 6, evaluate 10) | 1 each for W1b-W4b (7) |
| **Cambridge P3 question 5**: a 12-mark extended response with evaluation | `EXAM.CAM_P3_12` | EXTENDED_RESPONSE, 12, EVALUATION | CAM | A Level concepts; a stimulus and one question ("Evaluate …", "Advise …"); `b.ext` with 12 points / levels and a model answer | 1 each for W1b-W4b (7) |

Each exam item: difficulty 4-5 (the 5- and 8-mark ones 2-4), a realistic stimulus built with the helpers, a majority of
the marks of ZIM_STRUCT10, ZIM_DATA25, ZIM_CASE30 and CAM_DATA30 where the question is numerical auto-marked
(`P.num`/`P.mcq`/`P.fib`), the rest self-marked with line-by-line points and a model answer. ZIMSEC items use ZIMSEC
terms and Zimbabwean examples; Cambridge items end with an evaluate/advise part where the plan says so and use
international terminology. The part structure inside the totals is our convention (the syllabi print only paper
totals, and for Cambridge the question sizes): a reviewer must check it against recent papers. Put the items in extra
modules: `concept(<one of the item concepts>, { file: "exam/<prefix>struct", keyPrefix: "exam.<prefix>struct" }, …)` for
ZIM_STRUCT10 (set `applies` per item), `exam/<prefix>zimsec` for ZIM_DATA25, ZIM_ESSAY25 and ZIM_CASE30 (set `applies`
per item), `exam/<prefix>cambridge` (`applies: CAM`) for all Cambridge rows (e.g. `exam/w2a-cambridge`, key prefix
`exam.w2a-cambridge`).

**Reserved mark values.** STRUCTURED worth **5, 8, 10, 12, 16, 20, 25 or 30** marks, and EXTENDED_RESPONSE worth **12**,
are only for the exam-format items above. Practice structured items use **6, 9, 14, 15 or 18** marks.

Mock exams (built later by the lead, not by writers): ZIMSEC Business Studies P1 7 × ZIM_STRUCT10 + 1 × ZIM_CASE30
(100 marks, 180 min); BS P2 1 × ZIM_DATA25 + 3 of 9 offered ZIM_ESSAY25 (100 marks, 180 min); BES P1 4 × ZIM_STRUCT10 +
2 × ZIM_CASE30 (100 marks, 180 min); BES P2 4 of 10 offered ZIM_ESSAY25 (100 marks, 180 min); Cambridge P1 4 ×
CAM_SHORT5 + 1 of 2 offered CAM_ESSAY20 on AS topics (40 marks, 75 min); P2 2 × CAM_DATA30 (60 marks, 90 min); P3 2 ×
CAM_P3_8 + 2 × CAM_P3_16 + 1 × CAM_P3_12 on A Level topics (60 marks, 105 min); P4 2 × CAM_ESSAY20 on A Level topics
(40 marks, 75 min). The bank supports one mock of each paper; a second mock needs the essay and case-study rows
doubled. Continuous assessment and the enterprise project are not simulated.

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas (from the concept keys): enterprise, structure, size, objectives, stakeholders, environment, international,
  strategy, project, ict, hrm, motivation, management, leadership, organisation, communication, marketing, research, mix,
  operations, finance, accounts, ratios, invest.
- Lesson titles must be unique (slugs come from titles). Lesson-only scratch scripts go in
  `.scratch/business-a/tables/<prefix><name>.mjs` (never in `slices/`).
- In slice text use real line breaks, or `t` templates: a typed backslash-n inside a plain `String.raw` text would show
  as a literal "\n" on screen (`t` turns it into a real line break).

## Commands (repo root)

- Build your slices only: `node .scratch/business-a/build-content.mjs <your-prefix>` (prefix match on the START of file
  names, e.g. `w2a-`; the trailing dash matters, so `w1a-` does not pick up `w1b-` files).
- Validate: `npm run content:validate -- business-a --strict` → 0 error(s), 0 warning(s). Other writers work in the
  same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- business-a` → fix findings in your files (questions must not reuse a lesson
  worked example's numbers).
- Length cue: see the MCQ rule above.
- Literal backslash-n: `node .scratch/tools/literal-newlines.mjs business-a --list` → `# 0 total` for your files.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, concepts.mjs, the registry, the syllabus files, `.scratch/tools/`,
  other families or other writers' files: report needed changes (a concept boundary, a missing helper) instead.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation, content:check, length-cue and literal-newlines results, any fact you left out or want a reviewer
  to check.

## Proposed split into 8 writer assignments

107 concepts; 13-14 per assignment plus exam rows of roughly equal weight (about 15 exam items each). Concept keys below
drop the `abus.` prefix. ★ = `freePreview: true` (at most one lesson per top-level topic of each ZIMSEC syllabus and per
Cambridge topic; eleven lessons are free: `enterprise.entrepreneurs` (BES 6.1 / Cambridge 1.1),
`structure.unincorporated` (BS 1 / BES 6.2 / Cambridge 1.2), `ict.role-in-business` (BS 2), `project.formulation` (BS 3 /
BES 6.3), `motivation.needs-maslow-herzberg` (BS 4 / BES 6.5 / Cambridge 2.2), `mix.pricing` (BS 6 / BES 6.6 /
Cambridge 3.3), `finance.break-even` (BS 7 / BES 6.7 / Cambridge 5.4), `finance.cash-flow-forecast` (BS 8 / BES 6.4 /
Cambridge 5.3), `environment.social-environmental` (Cambridge 6.1), `hrm.hard-soft-flexible` (Cambridge 7.4),
`marketing.plan-strategy` (Cambridge 8.2)). Exam row counts in each assignment are in the order ZIM_STRUCT10,
ZIM_DATA25, ZIM_CASE30, ZIM_ESSAY25, CAM_SHORT5, CAM_DATA30, CAM_ESSAY20 (AS + A), CAM_P3_8, CAM_P3_16, CAM_P3_12.

**W1a — prefix `w1a-`** (14; enterprise, structure, small business and growth)
enterprise.business-activity, enterprise.entrepreneurs ★, enterprise.success-failure, enterprise.business-plans,
enterprise.ventures-risks, enterprise.resources-capabilities, structure.sectors, structure.economic-systems,
structure.unincorporated ★, structure.companies, structure.franchise-jv-social, size.measuring, size.small-business,
size.organic-growth.
Folders: `enterprise/ structure/` and `size/` (these three). Exam rows: ZIM_STRUCT10 ×5 (e.g. forms of business, SME
problems, business failure), ZIM_DATA25 ×1, ZIM_CASE30 ×1, ZIM_ESSAY25 ×2, CAM_SHORT5 ×2, CAM_DATA30 ×1 (AS 1.1-1.3),
CAM_ESSAY20 ×2 (both AS: ownership, growth); no Cambridge Paper 3 rows (all this assignment's Cambridge content is AS).

**W1b — prefix `w1b-`** (13; objectives, stakeholders, environment, international, ICT, projects)
size.mergers-takeovers, objectives.aims-types, objectives.decisions-ethics, stakeholders.roles-influence,
environment.political-legal, environment.government-economy, environment.social-environmental ★,
environment.technology-competitors, international.trade-integration, international.multinationals-globalisation,
ict.role-in-business ★, project.formulation ★, project.cost-benefit.
Folders: `objectives/ stakeholders/ environment/ international/ ict/ project/` and `size/` (mergers-takeovers).
Exam rows: 3, 1, 1, 2, 2, 1, CAM_ESSAY20 ×2 (one AS on objectives or stakeholders, one A Level on the environment), CAM_P3_8 ×2,
CAM_P3_16 ×1, CAM_P3_12 ×1 (all 6.1 topics).

**W2a — prefix `w2a-`** (13; strategy, HRM, financial and non-financial motivation)
strategy.environment-scanning, strategy.models, strategy.decision-trees, strategy.strategic-management,
hrm.purpose-planning, hrm.recruitment-selection, hrm.redundancy-dismissal, hrm.morale-welfare-safety,
hrm.training-development, hrm.labour-relations, hrm.hard-soft-flexible ★, motivation.financial, motivation.non-financial.
Folders: `strategy/ hrm/` (these seven) and `motivation/` (financial, non-financial). Exam rows: 3, 1, 1, 2, 2, 1,
CAM_ESSAY20 ×2 (one AS on HRM or motivation, one A Level on strategy), CAM_P3_8 ×2 (decision trees; analysis tools),
CAM_P3_16 ×1, CAM_P3_12 ×1. W2a owns the decision-tree conventions.

**W2b — prefix `w2b-`** (13; theories of motivation, management, leadership, organisation, communication)
hrm.performance-mbo, motivation.scientific-human-relations, motivation.needs-maslow-herzberg ★,
motivation.mcclelland-vroom, management.functions-roles-theories, management.styles-mcgregor, leadership.nature-qualities,
leadership.theories-eq, organisation.structure-features, organisation.structure-types, organisation.delegation-control,
organisation.centralisation-line-staff, communication.purposes-methods.
Folders: `management/ leadership/ organisation/` and `motivation/`, `hrm/` (performance-mbo), `communication/`
(purposes-methods). Exam rows: 3, 1, 1, 2, 2, 1, CAM_ESSAY20 ×2 (both A Level: structure and leadership), CAM_P3_8 ×2,
CAM_P3_16 ×1, CAM_P3_12 ×1 (7.1-7.4 topics).

**W3a — prefix `w3a-`** (13; communication, marketing analysis and strategy, market research, the product)
communication.channels-barriers, marketing.role-objectives, marketing.demand-supply, marketing.markets,
marketing.segmentation-niche, marketing.elasticity, marketing.product-development, marketing.sales-forecasting,
marketing.plan-strategy ★, marketing.international-marketing, research.purposes-methods, research.data-analysis,
mix.product.
Folders: `marketing/ research/` and `communication/` (channels-barriers), `mix/` (product). Exam rows: 3, 1, 1, 2, 2, 1,
CAM_ESSAY20 ×2 (one AS on the nature of marketing or research, one A Level on marketing strategy), CAM_P3_8 ×2 (elasticity
and sales forecasting calculations), CAM_P3_16 ×1, CAM_P3_12 ×1. W3a owns the elasticity and moving-average conventions.

**W3b — prefix `w3b-`** (13; the marketing mix and the nature of operations)
mix.life-cycle-portfolio, mix.pricing ★, mix.promotion, mix.digital, mix.place, operations.transformation,
operations.productivity, operations.methods-intensity, operations.inventory-control, operations.inventory-eoq-jit,
operations.capacity-outsourcing, operations.location-scale, operations.quality.
Folders: `mix/` (these five) and `operations/` (these eight). Exam rows: 3, 1, 1, 2, 2, 1, CAM_ESSAY20 ×2 (one AS on the mix or
operations, one A Level on location, scale or quality), CAM_P3_8 ×2, CAM_P3_16 ×1, CAM_P3_12 ×1 (9.1-9.2 topics).

**W4a — prefix `w4a-`** (14; operations strategy, business finance, costs)
operations.lean, operations.strategy-flexibility, operations.erp-ict, operations.critical-path,
operations.work-study, finance.need, finance.working-capital, finance.sources-internal, finance.sources-external,
finance.choosing-source, finance.financial-markets, finance.cash-flow-forecast ★, finance.cost-types,
finance.costing-methods.
Folders: `operations/` (these five) and `finance/` (these nine). Exam rows: 3, 1, 1, 2, 2, 1, CAM_ESSAY20 ×2 (one AS on
finance, one A Level on operations strategy), CAM_P3_8 ×2 (critical path calculations; lean), CAM_P3_16 ×1, CAM_P3_12 ×1
(9.3 topics). W4a owns the critical-path and cash-flow-forecast conventions.

**W4b — prefix `w4b-`** (14; break-even, budgets, accounting, ratios, investment appraisal)
finance.break-even ★, finance.budgets-variances, accounts.users-reports-concepts, accounts.profit-loss,
accounts.financial-position, accounts.cash-flow-statement, accounts.depreciation-inventory, ratios.liquidity,
ratios.profitability, ratios.efficiency, ratios.gearing-investor, ratios.interpretation-limits, invest.payback-arr,
invest.npv-decisions.
Folders: `accounts/ ratios/ invest/` and `finance/` (break-even, budgets-variances). Exam rows: 3, 1, 1, 2, 2, 1,
CAM_ESSAY20 ×2 (both A Level: ratio analysis and investment appraisal), CAM_P3_8 ×2, CAM_P3_16 ×1, CAM_P3_12 ×1
(10.1-10.4 topics). W4b owns the ratio and investment-appraisal conventions: finish `ratios.profitability` and
`invest.payback-arr` early.

Totals: ZIM_STRUCT10 25, ZIM_DATA25 8, ZIM_CASE30 8, ZIM_ESSAY25 16, CAM_SHORT5 16, CAM_DATA30 8, CAM_ESSAY20 16,
CAM_P3_8 14, CAM_P3_16 7, CAM_P3_12 7 (125 exam-format items).
