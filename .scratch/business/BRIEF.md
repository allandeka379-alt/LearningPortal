# business-commerce-o — writing brief for content agents

You write ORIGINAL study content for the Commerce and Business family: ZIMSEC O-Level Commerce (Forms 1-4,
2015-2022), ZIMSEC O-Level Business Enterprise and Skills (Forms 1-4, 2015-2022; catalogue slug `business-studies`)
and Cambridge IGCSE Business 0264 (2027-2029; catalogue slug `business-studies`). Content is DEV preview only; a human
reviews it later (§41), but write it as if it ships tomorrow.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, **tables**, money).
- `content/concepts/business-commerce-o.json` (128 concepts). Each description says exactly what is in and out and
  ends with the syllabi that cover it: `[COM]` ZIMSEC Commerce, `[BES]` ZIMSEC Business Enterprise and Skills, `[CAM]`
  Cambridge 0264.
- The three syllabus files: `content/syllabi/zimsec/o-level/commerce/2015-2022.json`,
  `content/syllabi/zimsec/o-level/business-studies/2015-2022.json`,
  `content/syllabi/cambridge/igcse/business-studies/2027-2029.json` (which node covers each concept; node descriptions
  give the ZIMSEC form; `notes` list exclusions and the printed Cambridge formulas).
- `.scratch/business/lib.mjs`: question builders (`concept`, `b.mcq/tf/short/fib/match/num/calc/manualShort/ext/
  struct/card`, `P.*` parts), selectors `ZIM`, `COM`, `BES`, `CAM`, and the **checked helpers**: `f.*` (every formula),
  `money`, `fmt`, `table`, `statement`, `cashFlow`, `breakEvenTable`, `check`, `sum`, `round`.
- Style examples: `.scratch/english/slices/a1-nouns-pronouns.mjs` (slice style: every MCQ option has a rationale,
  explanations teach, hints from difficulty 3) and the lesson `content/subjects/mathematics-o/lessons/finance/consumer-arithmetic.md`
  (front matter, blocks, money written `US\$`, tables).

## What to produce per concept

1. **One lesson** `content/subjects/business-commerce-o/lessons/<area>/<name>.md` (concept `bus.<area>.<name>` → key
   `<area>.<name>`, e.g. `bus.finance.working-capital` → `lessons/finance/working-capital.md`, key
   `finance.working-capital`), **900-1,600 words** (tables do not count), template of §6: `## Introduction` (a
   Zimbabwean business context, why it matters in the exam), `## Key definitions` (`:::definition{term="…"}`),
   explanation sections with `:::example` blocks (and for every concept with figures **at least two fully worked
   examples** in `:::worked-solution`), `## Common mistakes` (`:::mistake{title="…"}`), `## Exam tips` (`:::exam-tip`:
   command words, how marks are earned, the board differences), `## Summary` (one `:::summary`). Front matter: key,
   title (unique), summary, concepts ([the concept]), estimatedMinutes (honest), level "core"; `freePreview: true` ONLY
   on the lessons named in your assignment. Do not add `objectives`. A concept covered by several syllabi gets ONE
   lesson that serves all of them: put board-only depth in a clearly labelled section ("ZIMSEC Commerce: …").
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/business/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 40%, four options, 1 mark: they feed the Commerce Paper 1 mock), true/false, matching
     (term → definition, document → purpose, situation → best source of finance), fill-in-the-blank, short answer
     only for CLOSED answers (list every acceptable variant), numerical/calculation (`b.num` / `b.calc`) wherever the
     concept has figures, a few self-marked `manualShort` items (state / explain / suggest: points add up to the
     marks), and 2-4 **practice structured** items (`b.struct`, difficulty 3-5, `examStyle: true`, **8-15 marks** —
     never a reserved value, see below) built on a short case or data stimulus, ending with an evaluate / justify /
     recommend part.
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 application, ~30% d4-5 exam-style. `daily: true` only on 2-3
     auto-marked items of difficulty 2-3 per concept.
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FORMULA, CONCEPT, FACT.
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION.
   - `calculator: true` on items that need one (no syllabus forbids calculators; Cambridge's use is not stated in the
     text read — keep figures simple enough to do by hand where possible).

## Business quality rules (non-negotiable)

- **Every figure is computed in code.** Use `f.*` and plain arithmetic in the slice and pass the **exact** value to
  `b.num` / `b.calc` (`kind`: `money`, `pct` (state "to one decimal place"), `ratio` (state "as x : 1 to two decimal
  places"; student types x), `times`, `units`, `plain`); never type a computed answer by hand. Build stimulus tables
  with `table`, `statement` (pass `checks` for every subtotal), `cashFlow` (checks opening = previous closing; `blanks`
  for complete-the-forecast items) and `breakEvenTable`. For lessons, print tables from a script in
  `.scratch/business/tables/<prefix><name>.mjs` (never in `slices/`, which the build imports) and paste the output.
  Re-derive every worked example before you finish. Add 1-3 `wrong` values that are real mistakes (margin/mark-up
  swap, dividing by price instead of contribution, forgetting the opening balance, cash discount on the list price).
- **Formulas:** only those printed in the Cambridge syllabus (in `f`): market share, labour productivity, total /
  average cost, contribution, break-even output = fixed costs ÷ contribution per unit, margin of safety = actual
  sales − break-even sales (units), gross profit, profit, working capital, gross profit margin, profit margin, ROCE =
  profit ÷ capital employed × 100, current ratio and acid test as x : 1. ZIMSEC Commerce adds cost of sales, rate of
  stock turnover (cost of sales ÷ average stock), mark-up and margin, trade then cash discount, balance of trade /
  payments and currency conversion. **Cambridge does not assess** constructing a cash flow forecast, a statement of
  profit or loss or a statement of financial position, or exchange-rate calculations: such items take `applies: BES`
  / `COM` (ZIMSEC learners prepare simple statements and cash budgets).
- **Diagrams:** only uploaded images are possible and you cannot draw them: describe break-even charts, product life
  cycles, organisation charts, chains of distribution and demand/supply diagrams in words or Markdown tables (a
  break-even table of output, costs and revenue; an organisation chart as an indented list; the product life cycle as
  a table of stages, sales and profit). Questions say "a break-even chart shows …" and give the readings.
- **Zimbabwean context where natural:** informal traders and vendors, tuck shops, market stalls at Mbare or
  Sakubva, small-scale farmers, cross-border traders, home-industry workshops, co-operatives, mobile money,
  commercial banks, insurance companies, ZIMRA, the Zimbabwe Stock Exchange, the Consumer Council of Zimbabwe. Names:
  Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho, Thandeka; places: Harare, Bulawayo, Mutare, Gweru, Masvingo,
  Chinhoyi, Kwekwe, Victoria Falls. **Fictional businesses only** (no real company names in calculations or
  evaluations; real institutions only in neutral, factual statements of their role). **No invented figures presented
  as real** (no "Zimbabwe's inflation was …", no market shares of real firms, no current tax or interest rates stated
  as fact: say "assume a VAT rate of 15%"). Any statement about an institution's current status (names change:
  telecommunication operators, SME agencies, money transfer services) must be one you are sure of; otherwise keep it
  generic ("a mobile network operator"). Exchange rates in examples are always "assume US\$1 = …".
- **Money:** amounts in US dollars, written `US\$1,250` in lessons; in JS strings `"US\\$"` or `money(1250)`; table
  headings `US\$` with plain numbers below; negatives / deficits in brackets `(1,200)`. A bare `$` before a number is
  a validation error. ZiG may be mentioned in context, never in sums.
- **MCQs:** exactly one defensible answer, four options, distractors definitely wrong (rationale for each), numerical
  distractors from real errors; never "all/none of the above", never refer to options by letter. **No length cue** —
  the key must not be clearly the longest option; check with
  `node .scratch/tools/length-cue.mjs business-commerce-o questions/<your folder>/` → `# 0 flagged`. MCQ options
  render inline: no tables in options.
- **Self-marked items:** points as examiners award them, one per creditworthy point or developed point
  ("Identifies a relevant source: retained profit (1)", "Explains why it suits a sole trader with no access to shares
  (1)", "Justified recommendation (2)"); points add up to the marks; long answers get `levels` (Level 1 identify,
  Level 2 explain/apply, Level 3 analyse/evaluate with a justified conclusion) and a `modelAnswer`.
- **Original wording**, British English, command words as the boards use them (state, define, identify, outline,
  explain, describe, discuss, calculate, justify, recommend, evaluate, consider).

### Terminology between the boards

Items without `applies` are tagged to every syllabus that covers their concept: give both names the first time
("income statement (statement of profit or loss)") or choose neutral wording. Use `applies` when an item depends on
one board's term, depth or format.

| ZIMSEC (Commerce / Business Enterprise and Skills) | Cambridge 0264 |
|---|---|
| Enterpriser, enterprising (BES); entrepreneur | Entrepreneur |
| Sole proprietorship / sole trader; business unit | Sole trader; business organisation |
| Public corporation, parastatal | Public sector (state-owned) organisation |
| Income statement; net profit; net profit margin | Statement of profit or loss; profit; profit margin |
| Stock; debtors; creditors | Inventory; trade receivables; trade payables |
| Cash budget | Cash flow forecast |
| Quick ratio | Acid test ratio |
| Hire purchase, credit sale, deferred payment | Hire purchase (as a source of finance) |
| Marketing concepts (production, product, selling, marketing) | Role of marketing |
| Trading blocs / economic integration | Free trade agreements, globalisation |

## Exam-format items (rows owned per assignment below)

Use `applies` and `examStyle: true`. The mocks draw by syllabus + type + marks, so these must be EXACT. Every item
must examine concepts that its syllabus covers (an item with `applies: COM` whose concepts Commerce does not cover is
tagged nowhere). Mark split of parts is ours where the syllabus does not print it (say so to the reviewer).

| Paper item | type | marks | applies | how many (total; per writer) |
|---|---|---|---|---|
| ZIMSEC Commerce P1: four-option multiple choice, single answer (40 questions, 75 min) | MULTIPLE_CHOICE | 1 | none, or COM/ZIM when board-specific | every concept's MCQs (the Commerce bank needs ≥ 80) |
| Commerce P2 Section A: compulsory structured question, 2-4 parts (state / explain / calculate), short stimulus | STRUCTURED | 7 | COM | ≥ 12; 3 each |
| Commerce P2 Section A: as above, shorter | STRUCTURED | 6 | COM | ≥ 4; 1 each |
| ZIMSEC P2 Section B essay (Commerce: 3 from 7; BES: 3 from 6): parts (a) and (b), e.g. (a) describe/explain 8-10 marks + (b) discuss/evaluate 10-12 marks, all `P.manual` with `type: "EXTENDED_RESPONSE"`, levels and a model answer | STRUCTURED | 20 | COM, BES or ZIM | ≥ 16 tagged to Commerce and ≥ 12 tagged to BES; 4 Commerce + 3 BES each (an item with `applies: ZIM` on concepts both cover counts for both) |
| BES P1: structured short-answer question on a short scenario, 4-6 parts mixing state, explain, calculate and recommend | STRUCTURED | 17 | BES | ≥ 8; 2 each |
| BES P1: as above | STRUCTURED | 16 | BES | ≥ 4; 1 each |
| BES P2 Section A: case study (600-900 words, with a data table) and 6-10 parts from knowledge to evaluation | STRUCTURED | 40 | BES | ≥ 4; 1 each |
| 0264 P1: question on stimulus material (table, graph data or short text), four parts, e.g. (a) 2 + (b) 4 + (c) 6 + (d) 8, the last a justify/recommend part | STRUCTURED | 20 | CAM | ≥ 8; 2 each |
| 0264 P2: complete case-study paper: one case (900-1,300 words plus appendices of data as tables) and four questions of 20 marks each, parts labelled "1(a)" … "4(b)" (e.g. each question (a) 8 applied + (b) 12 justify/recommend); every (a) part applied to the case | STRUCTURED | 80 | CAM | ≥ 4; 1 each |

Timing (`secs`): 6 marks 420, 7 marks 480, 16 marks 1020, 17 marks 1080, ZIMSEC essay 20 marks 1500, 0264 P1 20 marks
1350, BES case study 40 marks 3000, 0264 P2 80 marks 5400. Each exam item: difficulty 4-5 (6-7 mark items 3-4),
realistic fictional stimulus built with the helpers, at least a third of the marks auto-marked where the answer is
closed (`P.num` for calculations, `P.mcq`, `P.fib`), self-marked parts with examiner-style points. Put them in
`questions/exam/<prefix>commerce.json`, `questions/exam/<prefix>bes.json`, `questions/exam/<prefix>cambridge.json`:
one extra `concept(...)` module each (`file: "exam/<prefix>commerce"`, `keyPrefix: "exam.<prefix>commerce"`, default
`applies` of that file), setting `concepts: [...]` on every item to the concepts it actually examines (your own
concepts, and for the 0264 P2 and BES case-study papers any concepts that syllabus covers).

**Reserved mark values.** STRUCTURED worth **6, 7, 16, 17, 20, 40 or 80** marks is only for the exam-format rows above.
Practice structured items use **8-15** marks. One-mark single-answer MCQs feed the Commerce Paper 1 mock, so keep every
one exam-worthy.

Mock exams (built later, not by writers): Commerce P1 40 × MCQ (75 min); Commerce P2 Section A 4 × STRUCTURED 7 +
2 × STRUCTURED 6, Section B 7 × STRUCTURED 20 answer any 3 (120 min); BES P1 4 × STRUCTURED 17 + 2 × STRUCTURED 16
(105 min); BES P2 1 × STRUCTURED 40 + 6 × STRUCTURED 20 answer any 3 (135 min); 0264 P1 4 × STRUCTURED 20 (90 min);
0264 P2 1 × STRUCTURED 80 (90 min).

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas (the concept key's second segment): production, operations, trade, transport, consumer, organisation,
  enterprise, environment, economy, people, communication, marketing, finance, insurance.
- Lesson titles must be unique (slugs come from titles).

## Commands (repo root)

- Build your slices only: `node .scratch/business/build-content.mjs <your-prefix>` (prefix match on file names,
  e.g. `w2-`).
- Validate: `npm run content:validate -- business-commerce-o --strict` → 0 error(s), 0 warning(s). Other writers work
  in the same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- business-commerce-o` → fix findings in your files (questions must not reuse a
  lesson worked example's numbers).
- Length cue: see above.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, the registry, the syllabus files or other writers' files: report
  needed changes. Never touch `.scratch/english/`, `content/subjects/english-language-o/` or other families.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation and content:check results, anything unfinished or uncertain.

## Proposed split into 4 writer assignments

The freePreview lessons below give at most one free lesson per top-level topic of every syllabus (checked with
`node .scratch/business/check-preview.mjs <concepts…>`; Commerce 6.10 Warehousing has none). Roughly equal effort (figure-heavy concepts count more). Concept keys below drop the `bus.` prefix.

**W1 — prefix `w1-`** (32 concepts; production, trade, transport, consumer protection, insurance — mostly Commerce)
production.business-activity, production.sectors, production.ownership-indigenisation, production.division-of-labour,
production.value-addition, trade.introduction, trade.wholesale, trade.retail-types, marketing.ecommerce, trade.credit,
trade.home-trade-documents, trade.foreign-trade, trade.foreign-trade-documents, trade.protectionism,
trade.trading-blocs, trade.balance-of-payments, trade.warehousing, trade.warehouse-types-location, transport.modes,
transport.choice-documents, transport.trends, consumer.rights, consumer.organisations, consumer.legal-protection,
economy.exchange-rates, economy.globalisation, insurance.nature-purpose, insurance.principles,
insurance.procedures-documents, insurance.insurance-policies, insurance.assurance-social-security, insurance.ict.
Folders: `production/ trade/ transport/ consumer/ insurance/`, `marketing/ecommerce*`, `economy/exchange-rates*`,
`economy/globalisation*`. freePreview: `production.division-of-labour`, `trade.introduction`, `transport.modes`,
`consumer.rights`, `insurance.nature-purpose`.

**W2 — prefix `w2-`** (32 concepts; organisations, enterprise, environment, external influences)
organisation.purpose-sectors, organisation.sole-traders-partnerships, organisation.limited-companies,
organisation.formation-liability, organisation.franchises-joint-ventures, organisation.public-enterprises,
organisation.public-sector-reforms, organisation.multinationals, organisation.smes, organisation.associations,
enterprise.entrepreneurship, enterprise.role-drivers, enterprise.opportunities-risks, enterprise.start-up-support,
enterprise.business-plan, enterprise.planning-process, enterprise.objectives, enterprise.stakeholders,
enterprise.business-size, enterprise.business-growth, enterprise.success-failure, enterprise.ethics,
enterprise.intellectual-property, environment.business-environment, environment.resources-capabilities,
economy.business-cycle, economy.government-policy, economy.external-costs-benefits, economy.environmental-issues,
economy.pressure-groups, communication.methods, communication.barriers.
Folders: `organisation/ enterprise/ environment/`, `economy/` (except exchange-rates and globalisation),
`communication/methods*`, `communication/barriers*`. freePreview: `enterprise.entrepreneurship`,
`organisation.public-enterprises`, `enterprise.planning-process`, `environment.resources-capabilities`,
`economy.business-cycle`.

**W3 — prefix `w3-`** (32 concepts; people, marketing, communication services, operations without figures)
people.management-functions, people.organisational-structure, people.leadership, people.motivation-theories,
people.motivation-methods, people.recruitment-selection, people.employment-contracts, people.training,
people.workforce-reduction, people.trade-unions, marketing.role-concepts, marketing.demand-supply,
marketing.market-changes, marketing.types-of-markets, marketing.mass-niche, marketing.segmentation,
marketing.market-research, marketing.demand-forecasting, marketing.product, marketing.product-life-cycle,
marketing.price, marketing.place, marketing.promotion, marketing.marketing-strategy, marketing.foreign-markets,
communication.telecommunications, communication.postal-services, communication.formal-informal-trends,
operations.location, operations.quality, operations.technology, operations.sustainability.
Folders: `people/`, `marketing/` (except ecommerce), `communication/` (except methods and barriers), and
`operations/location* quality* technology* sustainability*`. freePreview: `people.motivation-theories`,
`marketing.role-concepts`, `communication.telecommunications`.

**W4 — prefix `w4-`** (32 concepts; finance and banking, costs and break-even, production operations — the most
figure-heavy set)
finance.money, finance.income-saving-investment, finance.personal-budgeting-borrowing, finance.taxation,
finance.commercial-banks, finance.other-institutions, finance.reserve-bank, finance.banking-trends,
finance.international-institutions, finance.need-for-finance, finance.sources, finance.shares-debentures,
finance.stock-exchange, finance.securing-investors, finance.working-capital, finance.cash-flow-forecast,
finance.cash-flow-problems, finance.budgets, finance.profit, finance.income-statement, finance.financial-position,
finance.trading-calculations, finance.profitability-ratios, finance.liquidity-ratios, finance.users-of-accounts,
operations.production-methods, operations.efficiency-lean, operations.purchasing-inventory, operations.costs,
operations.economies-of-scale, operations.break-even-calculation, operations.break-even-chart.
Folders: `finance/`, `operations/` (except location, quality, technology, sustainability). freePreview:
`finance.money`, `finance.cash-flow-forecast`, `operations.production-methods`.

Exam rows: every writer owns, from their own concepts, 3 Commerce 7-mark + 1 Commerce 6-mark structured questions,
4 Commerce-tagged and 3 BES-tagged 20-mark essays, 2 BES 17-mark + 1 BES 16-mark structured questions, 1 BES 40-mark
case study, 2 Cambridge P1 20-mark questions and 1 complete Cambridge P2 80-mark case-study paper. Writers whose
concepts are thin for a board choose stimulus topics their concepts cover: W1 BES items on value addition, transport, warehousing and trading blocs; W1 Cambridge items on business
activity, sectors, added value, protectionism, globalisation, exchange rates, ecommerce and legal controls; W2 and W3
Commerce items on business organisations, enterprise, management, communication and marketing.
