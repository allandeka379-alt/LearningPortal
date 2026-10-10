# accounting-a — writing brief for content agents

You write ORIGINAL study content for the A-Level Accounting family: ZIMSEC A-Level Accounting (Forms 5-6, 2015-2022) —
the main product — and Cambridge International AS & A Level Accounting 9706 (2026-2028). Content is DEV preview only; a
human reviews it later (§41), but write it as if it ships tomorrow. **Arithmetic accuracy is the first rule**: a
statement that does not balance, a ratio computed with the wrong formula or an answer that cannot be reproduced is worse
than a missing item. This is A-Level: full statements, adjustments, analysis and recommendations are expected, at the
depth of the deeper board.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, **tables**, money).
- `content/concepts/accounting-a.json` (100 concepts). Each description starts with its coverage label — "Both boards
  (ZIMSEC Form 5; Cambridge AS Level).", "Cambridge only (A Level only).", "ZIMSEC only (Form 6)." — and says exactly
  what is IN and what is OUT; "ZIMSEC detail" / "Cambridge detail" marks content only one board names. Stay inside it;
  when two concepts touch, give the other one a sentence and move on.
- The two syllabus files: `content/syllabi/zimsec/a-level/accounting/2015-2022.json` (4 topics: Financial Accounting,
  Financial Reporting, Cost Accounting, Management Accounting; sub-topic codes 1.1 … 4.2 are ours) and
  `content/syllabi/cambridge/a-level/accounting/2026-2028.json` (section **AS** = topics 1.1-2.2, Papers 1 and 2; section
  **A** = topics 3.1-4.4, A Level only, Paper 3 financial and Paper 4 cost and management accounting). Read the `notes`
  of both (assessment as read, exclusions, routes). ZIMSEC covers 89 concepts, Cambridge 96; 85 are shared.
- **AS versus A Level (Cambridge).** Every Cambridge concept is labelled "Cambridge AS Level" or "Cambridge A Level
  only". AS items feed Papers 1 and 2; A Level items feed Papers 3 and 4. Partnership changes, clubs, manufacturing,
  company cash flows, acquisitions, standard costing, budgets and investment appraisal are A Level only for Cambridge
  but Form 5 or Form 6 for ZIMSEC: write them once, at A Level depth.
- The O-level family `content/subjects/accounting-o/` shows the house style (lesson structure, tone, layouts); go well
  beyond it in depth. Do not repeat its worked examples.
- `.scratch/accounting-a/lib.mjs`: builders (`concept`, `b.mcq/tf/short/fib/match/num/calc/manualShort/ext/struct/card`,
  `P.*` parts including `P.group` for sub-parts), selectors `ZIM`, `CAM`, `t` for LaTeX and multi-line text, `EXAM`
  plans, `checkExam`, and the **checked accounting helpers**: layouts that THROW when figures do not agree (`tAccount`,
  `runningBalance`, `trialBalance`, `journal`, `statement`, `table`), `fmt`, `money`, `check`, `chk`, `r2`, `rd`, `sum`,
  `ratios.*` (all Cambridge appendix ratios and the ZIMSEC extras), `depreciation`, `inventory` (FIFO and AVCO,
  perpetual and periodic, `lowerOfCostAndNrv`), `costing` (`oar`, `overUnder`, `highLow`, `profitDifference`, `flex`,
  `rankByLimitingFactor`), `cvp(...)`, `variances.*` (signed, positive = favourable, with `fa` "F"/"A"), `invest`
  (`payback`, `arr`, `df`, `npv`, `irr`, `irrInterpolated`), `appropriation(...)`, `goodwill.*`, `company.*`.
- Style examples: `.scratch/accounting/slices/` (every MCQ option has a rationale, explanations teach, hints from
  difficulty 3), `.scratch/biology-a/slices/` for sub-parts with `P.group`, and a lesson in
  `content/subjects/accounting-o/lessons/` (front matter + blocks + money written `US\$`).

## What to produce per concept

1. **One lesson** `content/subjects/accounting-a/lessons/<area>/<name>.md` (key `<area>.<name>`, where the concept key
   is `aacc.<area>.<name>`; e.g. `aacc.partnership.goodwill` → `lessons/partnership/goodwill.md`, key
   `partnership.goodwill`), **900-1,600 words** (tables do not count), template of §6: `## Introduction` (a Zimbabwean
   business context, why it matters in the exam, what the student should know already), `## Key definitions`
   (`:::definition{term="…"}` in precise examinable wording of your own; `:::keyfact` for formulas and rules),
   explanation sections in logical order, **at least two fully worked examples** (`:::worked-solution` with the layout
   as a Markdown table, printed by a script in `.scratch/accounting-a/tables/`), `## Common mistakes`
   (`:::mistake{title="…"}`), `## Exam tips` (`:::exam-tip`: which papers test it — ZIMSEC Papers 1-3, Cambridge
   Papers 1-4 — and how *state, calculate, prepare, explain, evaluate, advise, justify* are answered for this concept),
   `## Summary` (one `:::summary`, 4-6 bullets). Front matter: key, title (unique), summary, concepts ([the concept]),
   estimatedMinutes (honest), level "core"; `freePreview: true` ONLY on the lessons named in your assignment. Do not add
   `objectives`. **Terminology box:** every lesson whose terms differ between the boards has a short
   `:::keyfact{title="ZIMSEC and Cambridge terms"}` (table below), and says who needs what ("preference shares:
   ZIMSEC only"; "activity based costing: Cambridge A Level only").
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/accounting-a/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 40%, four options, 1 mark, exam-worthy: they feed ZIMSEC Paper 1 and Cambridge Paper
     1), numerical/calculation (`b.num` / `b.calc`) wherever the concept has figures, true/false, matching (term ↔
     definition, error ↔ type, ratio ↔ formula, cost ↔ classification), fill-in-the-blank (debit/credit, account
     names, missing figures, with `choices` drop-downs), closed `short` answers, 3-5 self-marked `manualShort` items
     (explain / evaluate / advise / suggest, 2-6 marks, one tickable point per mark) and 2-4 **practice structured**
     items (`b.struct`, difficulty 3-5, `examStyle: true`, totals 6, 8, 10, 12, 14, 16, 18 or 20 — never 15, 25 or 30,
     see reserved marks) built on a stimulus (trial balance, list of balances, transactions, notes for adjustments,
     two years of figures) with sub-parts where natural.
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 application, ~30% d4-5 exam-style. `daily: true` only on 2-3
     auto-marked items of difficulty 2-3 per concept (short; no long tables).
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION. `calculator: true` on items needing one.
   - `applies`: omit when the item suits both boards (the usual case for shared concepts); `applies: ZIM` /
     `applies: CAM` when it depends on one board's content or term (a ZIMSEC-detail part such as preference shares,
     return on assets or departmental accounts inside a shared concept → ZIM; the Cambridge appendix formula wording,
     Partnership Act 1890, ABC → CAM). Single-board concepts are tagged to their board automatically.
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FORMULA, CONCEPT, FACT.

## Accounting quality rules (non-negotiable)

- **Every figure is computed and checked in code.** Build stimulus and answer tables with the lib helpers (they throw
  when a trial balance, T account, journal entry, appropriation account or statement does not balance) and pass every
  subtotal you show to `statement(..., { checks })`. Compute answers with code (`ratios.*`, `inventory.*`, `cvp`,
  `variances.*`, `invest.*`, plain arithmetic) and pass the **exact** value to `b.num`/`b.calc`; never type a computed
  answer by hand (`chk(computed, written)` any value you also write in prose). For lessons, print tables from a script
  in `.scratch/accounting-a/tables/<prefix><name>.mjs` (never in `slices/`, which the build imports) and paste the
  output. Re-derive every worked example from its data before you finish. A statement of financial position must
  balance (assets = equity + liabilities) and a cash flow must end at the closing cash and bank figure: build both
  from one data set.
- **Layouts:** IAS 1 style. Statement of profit or loss (revenue, cost of sales, gross profit, other income,
  distribution costs, administrative expenses, finance costs, profit before tax, income tax, profit for the year);
  statement of financial position (non-current assets at carrying amount, current assets, equity, non-current
  liabilities, current liabilities, with sub-totals); statement of changes in equity (columns); statement of cash flows
  (indirect method; operating, investing, financing; net change and reconciliation to cash and cash equivalents);
  schedule of non-current assets (cost, additions, disposals, depreciation, carrying amount); appropriation account;
  manufacturing account. Three-line bold heading above each statement (business name; statement name; "for the year
  ended 31 December 2025" or "at 31 December 2025"). Ledger accounts in the two-sided T format (`tAccount`) or the
  running-balance format; journals with narratives (`journal`). Brackets mean a deduction: `(1,200)`. ZIMSEC titles
  ("income statement", "statement of profit and loss and other comprehensive income") are given in the terminology box;
  Cambridge items use "statement of profit or loss", "profit for the year", "inventory", "trade receivables".
- **Money:** amounts in US dollars, written `US\$1,250` in Markdown (lesson files: `US\$`; JS strings: `"US\\$"`, or
  use `money(1250)`); table headings `US\$` with plain numbers below; thousands separated by commas; cents only when
  needed. A bare `$` before a number is a validation error. Do not use ZiG figures unless a question names another
  currency (then say so in the stem and keep a single currency per question). Tax rates, dividends and interest rates
  are stated in the stem as given assumptions; never present a figure as the real current tax rate.
- **Numerical answers** (`b.num` single step, `b.calc` multi-step with a `workedSolution` — the default is the
  explanation, so write the explanation as the full calculation): `kind: "money"` (US$ prefix; exact to the cent),
  `"pct"` (state "to one decimal place"; ±0.05), `"ratio"` (state "as x : 1 to two decimal places"; the student types
  x), `"days"` (nearest whole day), `"times"` (one decimal place), `"years"` (payback, two decimal places), `"months"`,
  `"units"`, `"hours"`, `"cents"` (EPS or dividend per share in cents), or `"plain"`. Put the rounding rule in the stem
  (Cambridge: "to the number of decimal places required by the question"). Add 1-3 `wrong` values that are the real
  mistakes (sales instead of cost of sales, opening inventory forgotten, margin/mark-up swapped, depreciation added
  instead of deducted in a cash flow, variance sign wrong) and say why in the explanation.
- **Ratios:** use only the formulas printed in the Cambridge appendix (`ratios.*`): gross profit margin, mark-up, profit
  margin, ROCE (profit from operations ÷ capital employed, capital employed = issued shares + reserves + non-current
  liabilities), expenses to revenue, current ratio and acid test as `x : 1`, non-current asset turnover, rate of
  inventory turnover = cost of sales ÷ average inventory, inventory days (average inventory ÷ cost of sales × 365),
  trade receivables days (÷ credit sales × 365), trade payables days (÷ credit purchases × 365), working capital cycle,
  net working assets to revenue, interest cover, gearing = non-current liabilities ÷ (ordinary shares + all reserves +
  non-current liabilities), earnings per share, price/earnings, dividend per share, dividend yield, dividend cover.
  Use year-end balances unless the stem says "average". ZIMSEC-only ratios (return on assets, return on equity, debt to
  equity, earnings yield, total/current assets and capital employed turnover) are `applies: ZIM`; put the formula in
  the stem because the syllabus does not print it. Ratios are never given in the stem of an item that asks for them.
- **Investment appraisal:** payback (even flows within a year), ARR = average profit ÷ average investment × 100 with
  average investment = initial cost ÷ 2 (no residual values are set), discount factors from a table printed in the stem
  (3 d.p.; compute with `invest.npv` which rounds the factors to 3 d.p.), IRR by interpolation between two printed
  rates (`invest.irrInterpolated`). No discounted payback.
- **Standard costing and CVP:** state the sign convention (favourable/adverse) in every variance item; the sales volume
  variance is at standard profit or contribution as the stem says; ZIMSEC items never ask for overhead variances;
  break-even charts are interpreted from a described table, never drawn.
- **Standards:** name IAS 1, 2, 7, 8, 10, 16, 36, 37 (Cambridge only) and 38 as the syllabi list them; describe their
  main provisions in your own words; no quotations from the standards; no IFRS numbers beyond these.
- **MCQs:** exactly one defensible answer, four options, distractors that are definitely wrong (rationale for each:
  numerical distractors from real errors); never "all/none of the above", never refer to options by letter. **No
  length cue** — the key must not be clearly the longest option; check with
  `node .scratch/tools/length-cue.mjs accounting-a questions/<your folder>/` → `# 0 flagged`. MCQ options render inline:
  no tables in options (put the table in the stem).
- **Self-marked "prepare" tasks** (`P.manual` / `b.ext` with `type: "EXTENDED_RESPONSE"`): one point per creditworthy
  line, as examiners award ("Gross profit US\$14,600 (own figure)" / "Correct heading with date"), points add up to the
  marks, and `modelAnswer` is the complete correct layout (a checked table). *Evaluate/advise/justify* parts award
  points for a balanced judgement: one point per reason (with a figure from the stem), one for the recommendation and one
  for a non-financial factor where relevant. Prefer auto-marked parts (`P.num` for key totals, `P.mcq`, `P.fib`)
  wherever the answer is closed; if you put `{{blank:id}}` blanks inside a Markdown table, validate early.
- **Exclusions** (never write items on them): limited liability partnerships; preference shares in Cambridge items;
  using the revaluation reserve for a bonus issue; piecemeal realisation and Garner v Murray; drawing a break-even
  chart; discounted payback; residual values in investment appraisal; overhead variances in ZIMSEC items; consolidated
  accounts; LIFO; contract and process costing; specific software packages; folio columns; IFRS detail beyond the
  syllabi. Partners' interest on loans is an expense, not an appropriation. Financial statements in ZIMSEC items are for
  internal use, not for publication.
- **Original wording**, British English, Zimbabwean contexts (names: Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo,
  Sipho, Thandeka; places: Harare, Bulawayo, Mutare, Gweru, Masvingo, Chinhoyi; businesses: hardware shops, tuck shops,
  market vendors, poultry projects, bakeries, transport operators, school and sports clubs, small manufacturers).
  **Fictional businesses only** (no real company names or real tax rates). Dates as 31 December 2025. No invented
  statistics.

### Terminology between the boards

Items without `applies` are tagged to both syllabi: give both names the first time ("statement of profit or loss
(income statement)") or choose neutral wording. Use `applies: ZIM` / `applies: CAM` when an item depends on one board's
term or rule. Concepts covered by only one syllabus are tagged to it automatically.

| ZIMSEC (syllabus / common usage) | Cambridge 9706 |
|---|---|
| Statement of profit and loss and other comprehensive income; income statement (trading and profit and loss account) | Statement of profit or loss |
| Net profit / net profit margin | Profit for the year / profit margin |
| Bad debts; allowance for doubtful debts | Irrecoverable debts; allowance for irrecoverable debts |
| Books of original entry | Books of prime entry |
| Receivables / debtors; payables / creditors | Trade receivables / trade payables (sales ledger, purchases ledger) |
| Quick ratio | Acid test ratio |
| Accounts receivable collection period; accounts payable payment period | Trade receivables turnover (days); trade payables turnover (days) |
| Rate of inventory turnover; inventory turnover | Rate of inventory turnover (times); inventory turnover (days) |
| Not-for-profit organisations (non-profit making) | Clubs and societies |
| Loan notes; convertible loan stock; preference shares | Debentures; (preference shares not examined) |
| Statements of changes in equity; retained profits | Statement of changes in equity; retained earnings |
| Allotment of overheads (allocation, apportionment, allotment) | Allocation, apportionment, reapportionment |
| Sources of capital (shares, loan notes) | Sources of finance (loans, overdrafts, leasing, shares, debentures) |
| Profit estimation | (incomplete records: profit from the accounting equation) |
| Return on capital employed (profit before interest and tax ÷ capital employed) | ROCE = profit from operations ÷ capital employed × 100, capital employed = issued shares + reserves + non-current liabilities |

## Exam-format items (rows owned per assignment below)

Use `examStyle: true`, the exact type, marks, skill and `applies` of the row, `paper:` (e.g. `"ZIMSEC Paper 2"`), and set
`concepts` on every item to the concepts it really examines (all covered by every syllabus the item applies to; an item
on AS-only Cambridge content cannot be a Cambridge Paper 3/4 item). Wrap the parts in `checkExam(EXAM.X, [...])` and
pass `skill: EXAM.X.skill, secs: EXAM.X.secs` (and `applies: EXAM.X.applies` where the plan has one). The builder
refuses a STRUCTURED item worth 15, 25 or 30 marks that does not match a plan. Part labels: `(a)`, `(b)`, … with
sub-parts `(i)`, `(ii)` one level deep via `P.group`, or `(1)`, `(2)` with sub-parts `(a)`, `(b)`; never "1(a)" (the
validator rejects it). The mocks draw by type + marks + skill (+ topic), so these must be EXACT:

| Paper item | plan | type, marks, skill | applies | parts and content | how many |
|---|---|---|---|---|---|
| ZIMSEC P1 and Cambridge P1: four-option multiple choice (ZIMSEC 40 items on the whole syllabus; Cambridge 30 items on AS content: 22 financial, 8 cost and management) | — | MULTIPLE_CHOICE, 1 | none (both) unless board-specific | every concept's MCQs; Cambridge P1 draws AS concepts only; ZIMSEC P1 draws ~25% from cost and management | ≥ 100 per syllabus (plenty) |
| **ZIMSEC P2**: one of four compulsory structured questions (25 marks) | `EXAM.ZIM_P2_STRUCT` | STRUCTURED, 25, APPLICATION | ZIM | a realistic stimulus (ledger work, adjustments, a statement, a cost statement, a budget or an appraisal); parts (a), (b), … of 2-8 marks with sub-parts; calculations, preparation and explanation; at least 12 marks auto-marked | 16 (2 per writer) |
| **ZIMSEC P3** (problem solving, answer all four) and **Cambridge P3** (financial accounting, A Level, 3 × 25): a full financial accounting problem | `EXAM.FIN25` | STRUCTURED, 25, ANALYSIS | none when every concept is covered by both syllabi and the wording suits both; ZIM for AS-only Cambridge concepts or ZIMSEC detail; CAM for Cambridge-only ones | prepare a statement or account from a data set (with adjustments), supporting workings, then analysis (ratios, comparison, reconciliation) and a short advise/evaluate part; difficulty 4-5 | 16 (W1a 1, W1b 2, W2a 3, W2b 3, W3a 4, W3b 3) |
| **ZIMSEC P3 cost question** (one of four) and **Cambridge P4** (cost and management accounting, A Level, 2 × 25) | `EXAM.COST25` | STRUCTURED, 25, EVALUATION | none when shared; CAM for A Level-only content (ABC, fixed overhead variances); ZIM for ZIMSEC-only wording | a costing, budgeting, variance or appraisal problem with calculations, ending with a recommendation supported by figures and non-financial factors; difficulty 4-5 | 10 (W4a 4, W4b 6) |
| **Cambridge P2 Q1** (30 marks, financial statements and adjustments with analysis; AS content) | `EXAM.CAM_P2_Q1` | STRUCTURED, 30, APPLICATION | CAM | sole trader, partnership or company statements from a trial balance and notes, with a ratio or recommendation part (AO3 about 17% of the paper) | 6 |
| **Cambridge P2 Q2 and Q3** (15 marks each; AS financial accounting) | `EXAM.CAM_P2_SHORT` | STRUCTURED, 15, APPLICATION | CAM | one topic: depreciation and disposal, suspense and corrected profit, bank reconciliation, control accounts, accruals and allowances, share issue, ratios | 8 |
| **Cambridge P2 Q4** (30 marks; AS cost and management accounting) | `EXAM.CAM_P2_COST` | STRUCTURED, 30, ANALYSIS | CAM | inventory/materials, absorption and marginal costing, break-even and decisions, job or batch costing; ends with an evaluation of the decision | 6 |

Each exam item: difficulty 4-5 (the 15-mark ones 3-5), a realistic stimulus built with the helpers, 3-6 parts, a
majority of marks auto-marked (`P.num`/`P.mcq`/`P.fib`), the rest self-marked with line-by-line points and checked
model layouts. Cambridge items end with an advise/evaluate part (2-5 marks) and use international terminology; ZIMSEC
items use ZIMSEC terms. The part structure inside the totals is our convention (the syllabi print only paper totals,
and for Cambridge Paper 2 the question sizes); a reviewer must check it against recent papers. Put the items in extra
modules: `concept(<one of the item concepts>, { file: "exam/<prefix>zimp2", keyPrefix: "exam.<prefix>zimp2", applies: ZIM }, …)`
for ZIM_P2_STRUCT, `exam/<prefix>fin` for FIN25 (set `applies` per item), `exam/<prefix>cost` for COST25 (set `applies`
per item) and `exam/<prefix>camp2` (`applies: CAM`) for the three Cambridge Paper 2 plans (e.g. `exam/w2a-fin`, key
prefix `exam.w2a-fin`).

**Reserved mark values.** STRUCTURED worth **15, 25 or 30** marks is only for the exam-format items above. Practice
structured items use 6, 8, 10, 12, 14, 16, 18 or 20 marks.

Mock exams (built later by the lead, not by writers): ZIMSEC P1 40 × MCQ (80 min); ZIMSEC P2 4 × ZIM_P2_STRUCT (100
marks, 105 min; one on cost and management); ZIMSEC P3 3 × FIN25 + 1 × COST25 (100 marks, 150 min); Cambridge P1 30 × MCQ
on AS topics (22 financial, 8 cost; 60 min); Cambridge P2 CAM_P2_Q1 + 2 × CAM_P2_SHORT + CAM_P2_COST (90 marks, 105
min); Cambridge P3 3 × FIN25 on section 3 topics (75 marks, 90 min); Cambridge P4 2 × COST25 on section 4 topics (50
marks, 60 min). Continuous assessment (ZIMSEC) is not simulated.

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas (from the concept keys): intro, capital, concepts, ledger, valuation, verification, systems, statements,
  partnership, company, acquisition, incomplete, club, manufacturing, departmental, standards, ratios, cost, budget,
  invest.
- Lesson titles must be unique (slugs come from titles). Lesson-only scratch scripts go in
  `.scratch/accounting-a/tables/<prefix><name>.mjs` (never in `slices/`).
- In slice text use real line breaks, or `t` templates: a literal backslash-n in a plain String.raw text would show as
  "\n" on screen.

## Commands (repo root)

- Build your slices only: `node .scratch/accounting-a/build-content.mjs <your-prefix>` (prefix match on the START of
  file names, e.g. `w2a-`; the trailing dash matters, so `w1a-` does not pick up `w1b-` files).
- Validate: `npm run content:validate -- accounting-a --strict` → 0 error(s), 0 warning(s). Other writers work in the
  same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- accounting-a` → fix findings in your files (questions must not reuse a lesson
  worked example's numbers).
- Length cue: see the MCQ rule above.
- Literal backslash-n: `node .scratch/tools/literal-newlines.mjs accounting-a --list` → `# 0 total` for your files.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, concepts.mjs, the registry, the syllabus files, `.scratch/tools/`,
  other families or other writers' files: report needed changes (a concept boundary, a missing helper) instead.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation, content:check, length-cue and literal-newlines results, any fact you left out or want a reviewer
  to check.

## Proposed split into 8 writer assignments

100 concepts; 11-13 per assignment plus exam rows of roughly equal weight. Concept keys below drop the `aacc.` prefix.
★ = `freePreview: true` (at most one lesson per top-level topic of each syllabus; ZIMSEC has 4 topics, Cambridge has
topics 1.1-4.4; a shared concept counts for both). Six lessons are free: `ledger.double-entry` (ZIMSEC topic 1 /
Cambridge 1.2), `capital.short-term-finance` (Cambridge 1.1), `ratios.profitability` (ZIMSEC 2 / Cambridge 1.6),
`cost.break-even` (ZIMSEC 3 / Cambridge 2.2), `cost.activity-based` (Cambridge 4.1) and `invest.payback-arr` (ZIMSEC 4 /
Cambridge 4.4).

**W1a — prefix `w1a-`** (13; introduction, finance, concepts, ledger basics)
intro.users-information, intro.business-entities, intro.branches-accounting, intro.ethics, capital.short-term-finance ★,
capital.sources-of-capital, concepts.recording, concepts.reporting, ledger.double-entry ★, ledger.books-prime-entry,
ledger.accruals-prepayments, ledger.irrecoverable-debts, ledger.capital-revenue.
Folders: `intro/ capital/ concepts/` and `ledger/` (these five). Exam rows: ZIM_P2_STRUCT ×2 (e.g. ledger accounts with
accruals, prepayments and irrecoverable debts; business entities with finance choice), CAM_P2_SHORT ×2 (accruals and
allowances; capital and revenue expenditure or entity/finance decision), FIN25 ×1 (ZIM: a trial balance, adjustments
and an analysis part).

**W1b — prefix `w1b-`** (12; non-current assets, valuation, verification, systems)
ledger.depreciation, ledger.nca-disposal, ledger.trial-balance, valuation.inventory, valuation.nca-models,
verification.principles, verification.errors, verification.suspense, verification.control-accounts,
verification.bank-reconciliation, systems.computerised, systems.data-transfer.
Folders: `ledger/` (these three), `valuation/ verification/ systems/`. Exam rows: ZIM_P2_STRUCT ×2 (disposal accounts;
suspense account and corrected profit), CAM_P2_SHORT ×3 (depreciation and disposal; suspense and corrected profit; bank
reconciliation or control accounts), CAM_P2_Q1 ×1 (sole trader statements with depreciation, an error correction and
inventory valuation), FIN25 ×2 (ZIM: control accounts and personal ledger reconciliation; corrected statement of
profit or loss and financial position).

**W2a — prefix `w2a-`** (12; sole traders, incomplete records, partnerships)
statements.adjustments, statements.sole-trader, incomplete.statement-of-affairs, incomplete.missing-figures,
incomplete.final-accounts, partnership.accounts, partnership.agreement, partnership.goodwill, partnership.revaluation,
partnership.new-partner, partnership.retirement, partnership.mid-year-changes.
Folders: `statements/ incomplete/ partnership/` (these seven). Exam rows: ZIM_P2_STRUCT ×2, CAM_P2_Q1 ×2 (sole trader
from incomplete records; partnership statements with appropriation), CAM_P2_SHORT ×1 (partnership appropriation or
agreement), FIN25 ×3 (admission of a partner with goodwill and revaluation, retirement, a mid-year change; apply to
both boards).

**W2b — prefix `w2b-`** (13; dissolution, acquisitions, manufacturing, clubs)
partnership.dissolution, acquisition.purchase-consideration-goodwill, acquisition.vendor-books,
acquisition.purchaser-books, acquisition.merger-statements, manufacturing.account, manufacturing.profit-unrealised,
manufacturing.statements, club.receipts-payments-fund, club.subscriptions, club.income-generating,
club.income-expenditure, club.sources-fundraising.
Folders: `partnership/` (dissolution), `acquisition/ manufacturing/ club/`. Exam rows: ZIM_P2_STRUCT ×2 (club
subscriptions and income and expenditure; manufacturing account), FIN25 ×3 (acquisition of a partnership by a company;
manufacturing account with unrealised profit; club accounts from incomplete records — all apply to both boards).

**W3a — prefix `w3a-`** (13; company statements, standards, departmental accounts)
company.profit-or-loss, company.changes-in-equity, company.financial-position, company.notes-schedules,
company.cash-flow-operating, company.cash-flow-statement, company.audit-stewardship, standards.ias-1-2,
standards.ias-8-10, standards.ias-16-36-38, standards.ias-37, departmental.apportionment, departmental.statements.
Folders: `company/` (these seven), `standards/ departmental/`. Exam rows: ZIM_P2_STRUCT ×2 (cash flow; departmental
accounts), CAM_P2_Q1 ×2 (company statement of profit or loss, financial position and changes in equity), FIN25 ×4
(company statements with notes and ratios; statement of cash flows with interpretation; IAS-based adjustments; ZIM:
departmental statements). The cash-flow concepts are A Level only for Cambridge (Paper 3).

**W3b — prefix `w3b-`** (11; share capital, loan notes, ratio analysis)
company.share-capital-reserves, company.share-issue, company.bonus-rights, company.redemption-shares,
company.loan-notes, ratios.profitability ★, ratios.liquidity, ratios.efficiency, ratios.solvency-gearing,
ratios.investment, ratios.analysis-limits.
Folders: `company/` (these five), `ratios/`. Exam rows: ZIM_P2_STRUCT ×2 (share issue/bonus; ratio calculation and
interpretation), CAM_P2_Q1 ×1 (company statements with a share issue), CAM_P2_SHORT ×2 (share or rights issue ledger
accounts; profitability and liquidity ratios with evaluation), FIN25 ×3 (investment and gearing analysis for two years;
redemption/loan-note effects on gearing for ZIMSEC; a full ratio report). W3b owns the ratio helpers' conventions: finish
`ratios.profitability` early.

**W4a — prefix `w4a-`** (13; cost accounting)
cost.terms-purpose, cost.behaviour, cost.materials-labour-jit, cost.overhead-allocation, cost.overhead-absorption,
cost.over-under-absorption, cost.absorption-statements, cost.marginal-costing, cost.profit-reconciliation,
cost.break-even ★, cost.decisions, cost.job-batch, cost.activity-based ★.
Folders: `cost/` (these thirteen). Exam rows: ZIM_P2_STRUCT ×2 (absorption statement; break-even and margin of safety),
CAM_P2_COST ×6 (inventory and costing; absorption with over/under absorption; marginal costing and reconciliation;
break-even and a special-order decision; limiting factor; job or batch cost sheet), COST25 ×4 (three ZIM on absorption,
marginal and decisions; one CAM on ABC with traditional absorption — A Level content).

**W4b — prefix `w4b-`** (13; standard costing, budgets, investment appraisal)
cost.standards-basics, cost.variances-direct, cost.variances-sales, cost.variances-fixed-overhead, cost.variances-analysis,
budget.purpose-behaviour, budget.operating-budgets, budget.cash-budget, budget.master-budget, budget.flexible-budgets,
invest.payback-arr ★, invest.npv-irr, invest.evaluation.
Folders: `cost/` (these five), `budget/ invest/`. Exam rows: ZIM_P2_STRUCT ×2 (cash budget; variances), COST25 ×6
(variances and reconciliation of standard to actual profit; sales variances; master budget; flexible budget
reconciliations; investment appraisal with NPV/IRR; payback, ARR and a recommendation — most apply to both boards; the
fixed overhead item applies CAM). W4b owns the investment and variance sign conventions.

Totals: ZIM_P2_STRUCT 16, FIN25 16, COST25 10, CAM_P2_Q1 6, CAM_P2_SHORT 8, CAM_P2_COST 6 (62 exam-format items).
