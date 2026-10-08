# accounting-o — writing brief for content agents

You write ORIGINAL study content for the Accounting family: ZIMSEC O-Level Principles of Accounting (Forms 1-4,
2015-2022) and Cambridge IGCSE Accounting 0452 (2027-2029). Content is DEV preview only; a human reviews it later
(§41), but write it as if it ships tomorrow.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, **tables**, money).
- `content/concepts/accounting-o.json` (66 concepts; each description says exactly what is in and out, and which
  board a concept belongs to when only one examines it).
- The two syllabus files: `content/syllabi/zimsec/o-level/accounting/2015-2022.json` and
  `content/syllabi/cambridge/igcse/accounting/2027-2029.json` (which node covers each concept; the objectives say in
  which ZIMSEC form an item is taught; the notes list the exclusions).
- `.scratch/accounting/lib.mjs`: question builders (`concept`, `b.mcq/tf/short/fib/match/num/calc/manualShort/ext/
  struct/card`, `P.*` parts) and the **checked layout helpers** (`tAccount`, `runningBalance`, `trialBalance`,
  `journal`, `statement`, `money`, `fmt`, `check`, `ratios`, `depreciation`).
- Style examples: `.scratch/english/slices/a1-nouns-pronouns.mjs` (slice style: every MCQ option has a rationale,
  explanations teach, hints from difficulty 3) and the lesson `content/subjects/mathematics-o/lessons/finance/consumer-arithmetic.md`
  (front matter + blocks + money written `US\$`).

## What to produce per concept

1. **One lesson** `content/subjects/accounting-o/lessons/<area>/<name>.md` (key `<area>.<name>`, where the concept key
   is `acc.<area>.<name>`; e.g. `acc.verification.suspense-account` → `lessons/verification/suspense-account.md`, key
   `verification.suspense-account`), **900-1,600 words** (tables do not count), template of §6: `## Introduction`
   (a Zimbabwean business context, why it matters in the exam), `## Key definitions` (`:::definition{term="…"}`),
   explanation sections with **at least two fully worked examples** (`:::worked-solution` with the layout as a Markdown
   table), `## Common mistakes` (`:::mistake{title="…"}`), `## Exam tips` (`:::exam-tip`), `## Summary` (one
   `:::summary`). Front matter: key, title (unique), summary, concepts ([the concept]), estimatedMinutes (honest),
   level "core"; `freePreview: true` ONLY on the lessons named in your assignment. Do not add `objectives`.
   **Terminology box:** every lesson whose terms differ between the boards has a short `:::keyfact{title="ZIMSEC and
   Cambridge terms"}` (see the table below).
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/accounting/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 40%, four options, 1 mark), numerical/calculation (`b.num` / `b.calc`) wherever the
     concept has figures, true/false, matching (e.g. document → book of prime entry, error → type), fill-in-the-blank
     (debit/credit, account names, missing figures with `choices` or closed answers), a few self-marked `manualShort`
     items (explain / suggest / advise), and 2-4 **practice structured** items (`b.struct`, difficulty 3-5,
     `examStyle: true`, 6-16 marks — never 20, see reserved marks) built on a stimulus table.
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 application, ~30% d4-5 exam-style. `daily: true` only on 2-3
     auto-marked items of difficulty 2-3 per concept (short; no long tables).
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FORMULA, CONCEPT, FACT (formats and rules,
     e.g. "Where does carriage inwards go?").
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION.
   - `calculator: true` on items needing one (both boards allow calculators).

## Accounting quality rules (non-negotiable)

- **Every figure is computed and checked in code.** Build stimulus and answer tables with the lib helpers (they throw
  when a trial balance, account, journal entry or statement does not balance) and pass every subtotal you show to
  `statement(..., { checks })`. Compute answers with code (`ratios.*`, `depreciation.*`, plain arithmetic) and pass
  the **exact** value to `b.num`/`b.calc`; never type a computed answer by hand. For lessons, print tables from a
  script in `.scratch/accounting/tables/<prefix><name>.mjs` (never in `slices/`, which the build imports) and paste the
  output. Re-derive every worked example from its data before you finish.
- **Layouts:** ledger accounts in the two-sided T format (`tAccount`: Date | Details | US\$ on each side, balance c/d
  and b/d) or the three-column running balance format (`runningBalance`) — both boards accept it; journals with
  narratives (`journal`); trial balance with Debit/Credit columns and totals; vertical statements (`statement`) with a
  three-line heading in bold text above the table (business name; statement name; "for the year ended 31 December
  2025" for income statements, "at 31 December 2025" for statements of financial position) and the usual groupings
  (non-current assets at cost less accumulated depreciation, current assets, current liabilities, net current assets /
  working capital, non-current liabilities, capital + profit − drawings). Brackets mean a deduction: `(1,200)`.
- **Money:** amounts in US dollars, written `US\$1,250` in Markdown (lesson files: `US\$`; JS strings: `"US\\$"`, or
  use `money(1250)`); table headings `US\$` with plain numbers below; thousands separated by commas; cents only when
  needed (`1,250.50`). A bare `$` before a number is a validation error. Do not use ZiG figures (the boards set
  questions in a single currency; a context sentence may mention ZiG, never with sums).
- **Numerical answers** (`b.num` single step, `b.calc` multi-step with a `workedSolution` — the default is the
  explanation, so write the explanation as the full calculation): `kind: "money"` (US$ prefix; exact to the cent),
  `"pct"` (state "to one decimal place"; ±0.05), `"ratio"` (state "as x : 1 to two decimal places"; the student types
  x; ±0.005), `"days"` (state "to the nearest whole day"; ±0.5) or `"times"` (one decimal place). Put the rounding rule
  in the stem. Add 1-3 `wrong` values that are the real mistakes (using sales instead of cost of sales, forgetting
  opening inventory, the margin/mark-up swap) and say why in the explanation.
- **Ratios:** use only the formulas printed in the Cambridge syllabus (they are in `ratios`; ZIMSEC uses the same
  ones it lists): gross profit margin, mark-up, profit margin, ROCE (profit before interest ÷ capital employed,
  capital employed = issued shares + reserves + non-current liabilities), current ratio and acid test as `x : 1`, rate
  of inventory turnover = cost of sales ÷ average inventory, inventory / trade receivables / trade payables days × 365.
  ZIMSEC calls the profit margin "net profit percentage" and the acid test the "quick ratio".
- **MCQs:** exactly one defensible answer, four options, distractors that are definitely wrong (rationale for each),
  numerical distractors from real errors; never "all/none of the above", never refer to options by letter. **No
  length cue** — the key must not be clearly the longest option; check with
  `node .scratch/tools/length-cue.mjs accounting-o questions/<your folder>/` → `# 0 flagged`. MCQ options render
  inline: no tables in options (put the table in the stem).
- **Self-marked "prepare" tasks** (`P.manual` / `b.ext` with `type: "EXTENDED_RESPONSE"`): one point per creditworthy
  line, as examiners award ("Gross profit US\$14,600 (own figure)" / "Correct heading with date"), points add up to
  the marks, and `modelAnswer` is the complete correct layout (a checked table). Prefer auto-marked parts
  (`P.num` for key totals, `P.mcq`, `P.fib`) wherever the answer is closed; if you put `{{blank:id}}` blanks inside a
  Markdown table, validate early.
- **Exclusions** (never examined, never write items on them): partnership dissolution, admission/retirement of a
  partner, changes in profit-sharing ratio, LLPs; reconciling control accounts with ledger lists; incomplete records
  for service or manufacturing businesses; folio columns in Cambridge items; specific software packages; IFRS detail
  beyond the syllabi. Partners' interest on loans is an expense, not an appropriation.
- **Original wording**, British English, Zimbabwean contexts (names: Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo,
  Sipho, Thandeka; places: Harare, Bulawayo, Mutare, Gweru, Masvingo, Chinhoyi; businesses: hardware shops, tuck shops,
  market vendors, poultry projects, transport operators, school clubs). Fictional businesses only (no real company
  names). Dates as 31 December 2025. No invented statistics.

### Terminology between the boards

Items without `applies` are tagged to both syllabi: give both names the first time ("income statement (statement of
profit or loss)") or choose neutral wording. Use `applies: ZIM` / `applies: CAM` when an item depends on one board's
term or rule. Concepts covered by only one syllabus are tagged to it automatically (no `applies` needed).

| ZIMSEC (syllabus / common usage) | Cambridge 0452 |
|---|---|
| Income statement (trading and profit and loss account) | Statement of profit or loss |
| Net profit / net profit percentage | Profit for the year / profit margin |
| Provision for doubtful debts; bad debts | Allowance for irrecoverable debts; irrecoverable debts |
| Subsidiary books / books of original entry | Books of prime entry |
| Trade receivables ledger (debtors) / trade payables ledger (creditors) | Sales ledger / purchases ledger |
| Inventory (stock) | Inventory |
| Quick ratio | Acid test (liquid) ratio |
| Retained profits | Retained earnings |
| Non-trading concerns / not-for-profit organisations | Clubs and societies |
| Provision for depreciation | Provision for depreciation (accumulated depreciation) |

## Exam-format items (the 20-mark rows are owned per assignment below)

Use `applies` and `examStyle: true`. The mock papers draw by type + marks, so these must be EXACT:

| Paper item | type | marks | applies | how many |
|---|---|---|---|---|
| ZIMSEC P1 / 0452 P1: four-option multiple choice, single answer (both papers: 40 questions, 90 minutes) | MULTIPLE_CHOICE | 1 | none (both) unless the term is board-specific | every concept's MCQs (the bank needs ≥ 80 per syllabus for two mocks; ≈ 26 per concept-set is plenty) |
| ZIMSEC P2: compulsory structured question on stimulus data (ledger work, adjustments, statements, analysis; parts (a), (b), … with marks) | STRUCTURED | 20 | ZIM | ≥ 12 in total (3 per writer) |
| 0452 P2: compulsory structured question based on stimulus material (calculations, completing a cash book or an incomplete statement, preparing accounts, suspense accounts and journal entries, plus analysis/evaluation parts: AO3 is 15% of P2) | STRUCTURED | 20 | CAM | ≥ 12 in total (3 per writer) |

Each 20-mark item: difficulty 4-5, `secs: 1260`, a realistic stimulus (trial balance, list of balances, transactions,
notes for adjustments) built with the helpers, 3-6 parts, at least half the marks auto-marked (`P.num`/`P.mcq`/
`P.fib`), the rest self-marked with line-by-line points and checked model layouts. Cambridge items end with an
advise/evaluate part (2-4 marks); ZIMSEC items use ZIMSEC terms. Put them in `questions/exam/<prefix>zimsec.json` and
`questions/exam/<prefix>cambridge.json`: one extra `concept(...)` module each (`file: "exam/<prefix>zimsec"`,
`keyPrefix: "exam.<prefix>zimsec"`, `applies: ZIM`), setting `concepts: [...]` on every item to the concepts it
actually examines (any concepts of your assignment).

**Reserved mark values.** STRUCTURED worth **20** marks is only for the exam-format items above. Practice structured
items use 6-16 marks. One-mark single-answer MCQs feed both Paper 1 mocks, so keep every one exam-worthy.

Mock exams (built later, not by writers): ZIMSEC P1 40 × MCQ (90 min), ZIMSEC P2 5 × STRUCTURED 20 (90 min as printed;
to be confirmed), 0452 P1 40 × MCQ (90 min), 0452 P2 5 × STRUCTURED 20 (105 min).

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas: fundamentals, technology, documents, books, ledger, verification, adjustments, statements, manufacturing,
  partnerships, companies, clubs, incomplete, analysis, concepts, ethics.
- Lesson titles must be unique (slugs come from titles).

## Commands (repo root)

- Build your slices only: `node .scratch/accounting/build-content.mjs <your-prefix>` (prefix match on file names,
  e.g. `w2-`).
- Validate: `npm run content:validate -- accounting-o --strict` → 0 error(s), 0 warning(s). Other writers work in the
  same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- accounting-o` → fix findings in your files (questions must not reuse a
  lesson worked example's numbers).
- Length cue: see above.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, the registry, the syllabus files or other writers' files: report
  needed changes. Never touch `.scratch/english/` or `content/subjects/english-language-o/`.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation and content:check results, anything unfinished or uncertain.

## Proposed split into 4 writer assignments

Roughly equal effort (figure-heavy concepts count more). Concept keys below drop the `acc.` prefix.

**W1 — prefix `w1-`** (16 concepts; foundations, ledger, concepts, ethics, technology)
fundamentals.purpose-of-accounting, fundamentals.key-terms, fundamentals.accounting-equation,
fundamentals.business-organisations, fundamentals.users, fundamentals.accounting-cycle (ZIMSEC only),
technology.manual-digital-records, technology.data-storage (Cambridge only), documents.source-documents,
ledger.double-entry, ledger.posting-balancing, ledger.divisions, ledger.closing-entries,
concepts.foundation-concepts, concepts.applied-concepts, ethics.professional-ethics.
Folders: lessons/questions/flashcards `fundamentals/ technology/ documents/ ledger/ concepts/ ethics/`.
Exam rows: 3 ZIM + 3 CAM 20-mark items (double entry from transactions, the accounting equation and statement of
financial position, concepts and ethics applied to a case). freePreview: `fundamentals.accounting-equation`,
`ledger.double-entry`, `concepts.foundation-concepts`.

**W2 — prefix `w2-`** (17 concepts; books of prime entry and verification)
books.sales-purchases-journals, books.returns-journals, books.cash-book, books.discounts-cash-book, books.petty-cash,
books.general-journal, verification.trial-balance, verification.errors-not-revealed, verification.correcting-errors,
verification.suspense-account, verification.errors-effect-on-profit, verification.updating-cash-book,
verification.bank-reconciliation, verification.sales-ledger-control, verification.purchases-ledger-control,
adjustments.capital-revenue, adjustments.capital-revenue-errors.
Folders: `books/ verification/` and `adjustments/capital-revenue*`.
Exam rows: 3 ZIM + 3 CAM (three-column cash book and petty cash; suspense account with journal corrections and revised
profit; updated cash book with bank reconciliation; control accounts). freePreview: `verification.trial-balance`.

**W3 — prefix `w3-`** (15 concepts; adjustments and sole trader / manufacturing statements)
adjustments.depreciation-methods, adjustments.depreciation-accounts, adjustments.disposal,
adjustments.accrued-prepaid-expenses, adjustments.accrued-prepaid-income, adjustments.irrecoverable-debts,
adjustments.allowance-doubtful-debts, adjustments.provision-discounts (ZIMSEC only), adjustments.inventory-valuation
(Cambridge only), statements.income-statement, statements.financial-position, statements.adjusted-statements,
statements.departmental (ZIMSEC only), manufacturing.costs, manufacturing.accounts.
Folders: `adjustments/` (except capital-revenue*), `statements/ manufacturing/`.
Exam rows: 3 ZIM + 3 CAM (full sole trader statements from a trial balance with adjustments; depreciation and disposal
accounts; manufacturing account; ZIMSEC departmental accounts). freePreview: `adjustments.depreciation-methods`,
`statements.income-statement`.

**W4 — prefix `w4-`** (18 concepts; other organisations, incomplete records, analysis)
partnerships.formation, partnerships.appropriation, partnerships.capital-current-accounts, companies.share-capital,
companies.financial-statements, clubs.receipts-payments, clubs.subscriptions-activities, clubs.income-expenditure,
incomplete.statement-of-affairs, incomplete.missing-figures, incomplete.financial-statements,
analysis.profitability-ratios, analysis.liquidity-ratios, analysis.efficiency-ratios, analysis.mark-up-margin,
analysis.interpretation, analysis.inter-business-comparison (Cambridge only), analysis.limitations (Cambridge only).
Folders: `partnerships/ companies/ clubs/ incomplete/ analysis/`.
Exam rows: 3 ZIM + 3 CAM (partnership appropriation and current accounts; company statement of changes in equity and
equity extract; club income and expenditure with subscriptions; incomplete records with mark-up; ratios with
evaluation). freePreview: `analysis.profitability-ratios`.

freePreview lessons (one per top-level topic of each syllabus): accounting-equation (Cambridge 1 / ZIMSEC 1),
double-entry (2 / 6), trial-balance (3 / 7), depreciation-methods (4 / 10), income-statement (5 / 9),
profitability-ratios (6 / 14), foundation-concepts (7 / 8).
