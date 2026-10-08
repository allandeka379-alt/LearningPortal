# economics-o — writing brief for content agents

You write ORIGINAL study content for the Economics family: ZIMSEC O-Level Economics (Forms 1-4, 2015-2022) and
Cambridge IGCSE Economics 0455 (2027-2029). Content is DEV preview only; a human reviews it later (§41), but write it
as if it ships tomorrow.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, **tables**, money).
- `content/concepts/economics-o.json` (92 concepts; each description says exactly what is in and out, and "ZIMSEC
  only" / "Cambridge only" when one board alone examines it).
- The two syllabus files: `content/syllabi/zimsec/o-level/economics/2015-2022.json` and
  `content/syllabi/cambridge/igcse/economics/2027-2029.json` (which node covers each concept; ZIMSEC objectives say
  in which form an item is taught; the `notes` list what each board leaves out and the uncertainties).
- `.scratch/economics/lib.mjs`: question builders (`concept`, `b.mcq/tf/short/fib/match/num/calc/manualShort/ext/
  struct/card`, `P.*` parts) and the **checked economics helpers** (`table`, `schedule`, `marketSum`, `elasticity`,
  `costTable`, `revenueTable`, `productivity`, `prices`, `nationalIncome`, `currentAccount`, `termsOfTrade`,
  `budgetBalance`, `unemploymentRate`, `dependencyRatio`, `population`, `comparativeAdvantage`, `forex`, `tax`,
  `pctChange`, `money`, `pct`, `fmt`, `check`).
- Style examples: `.scratch/english/slices/a1-nouns-pronouns.mjs` (slice style: every MCQ option has a rationale,
  explanations teach, hints from difficulty 3), any `.scratch/accounting/slices/*.mjs` (numeric items, stimulus
  tables, structured items) and the lesson `content/subjects/mathematics-o/lessons/finance/consumer-arithmetic.md`
  (front matter + blocks + money written `US\$`).

## What to produce per concept

1. **One lesson** `content/subjects/economics-o/lessons/<area>/<name>.md` (key `<area>.<name>`, where the concept key
   is `econ.<area>.<name>`; e.g. `econ.elasticity.ped` → `lessons/elasticity/ped.md`, key `elasticity.ped`),
   **900-1,600 words** (tables do not count), template of §6: `## Introduction` (a Zimbabwean or everyday context, why
   it matters in the exam), `## Key definitions` (`:::definition{term="…"}` — precise, examinable wording in your own
   words), explanation sections, **at least two worked examples** (`:::worked-solution` for calculations or
   data interpretation; `:::example` for applied reasoning) wherever the concept has numbers or diagrams,
   `## Common mistakes` (`:::mistake{title="…"}`), `## Exam tips` (`:::exam-tip`; how the command words *state,
   explain, analyse, discuss* are answered for this concept), `## Summary` (one `:::summary`). Front matter: key, title
   (unique), summary, concepts ([the concept]), estimatedMinutes (honest), level "core"; `freePreview: true` ONLY on
   the lessons named in your assignment. Do not add `objectives`. **Terminology box:** where the boards' terms differ
   (table below) add a short `:::keyfact{title="ZIMSEC and Cambridge terms"}`.
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/economics/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 40%, four options, 1 mark), numerical/calculation (`b.num` / `b.calc`) wherever the
     concept has figures (elasticities, costs, revenue, indices, balances, rates), true/false, matching (cause →
     effect, term → definition, tax → type), fill-in-the-blank (shift left/right, rise/fall with `choices`), a few
     self-marked `manualShort` items (explain / analyse / suggest), and 2-4 **practice structured** items (`b.struct`,
     difficulty 3-5, `examStyle: true`, marks 6, 8, 12, 14 or 16 — never 10 or 20, see reserved marks) built on a
     short stimulus (a fictional data table or a few lines of context) ending with a discuss/evaluate part.
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 application, ~30% d4-5 exam-style. `daily: true` only on 2-3
     auto-marked items of difficulty 2-3 per concept (short; no long tables).
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FORMULA, CONCEPT, FACT ("What happens to total
     revenue when price falls and demand is elastic?").
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION. `calculator: true` on items needing one
     (Cambridge allows calculators in both papers; ZIMSEC does not say — keep ZIMSEC arithmetic simple).

## Economics quality rules (non-negotiable)

- **Diagrams are taught and examined in words and tables, never images.** Describe a diagram precisely: axes ("price
  on the vertical axis, quantity on the horizontal axis"), the curves and their slopes, what shifts and which way
  ("the supply curve shifts to the left, from S1 to S2"), the old and new equilibrium (P1/Q1 → P2/Q2), and any area
  (shortage, surplus, tax revenue) as a range of quantities or a calculated figure. Show the numbers in a demand and
  supply schedule (`schedule(...)`), a cost table, a PPC table of output combinations, or a before/after table.
  Questions about diagrams ask what happens ("Which describes the change…", "The new equilibrium price is…"), use a
  schedule, or ask the student to describe the diagram they would draw (self-marked points: "labels axes", "shows the
  demand curve shifting right", "identifies the higher equilibrium price"). Sketch prompts say "describe the
  diagram"; never "draw". Market failure: no demand-and-supply diagrams for Cambridge (2.9 note); competitive markets
  and monopoly: no diagrams for Cambridge (3.7 notes) — the ZIMSEC-only concepts (`structures.equilibrium`,
  `costs.profit-maximisation`) use cost and revenue tables (MR = MC, AR = AC) instead of curves.
- **Every figure is computed and checked in code.** Build stimulus tables with the helpers (they throw when a schedule
  breaks the law of demand or supply, when no price clears a market you said clears, or when totals are wrong) and
  compute answers with code (`elasticity.ped(...)`, `prices.weightedIndex(...)`, `currentAccount(...).total`); pass
  the **exact** value to `b.num`/`b.calc`; never type a computed answer by hand. For lessons, print tables from a
  script in `.scratch/economics/tables/<prefix><name>.mjs` (never in `slices/`, which the build imports) and paste the
  output. Re-derive every worked example from its data before you finish.
- **Numerical answers** (`b.num` single step; `b.calc` multi-step with a `workedSolution`, which defaults to the
  explanation, so write the explanation as the full calculation): `kind: "money"` (US$ prefix), `"pct"` (state "to one
  decimal place"), `"elasticity"` (two decimal places; **say whether the minus sign is wanted** — "include the minus
  sign" for PED, since the box accepts one value; or ask for "the value of PED, ignoring the sign"), `"index"` (one
  decimal place), `"plain"` (with `dp`). Put the rounding rule in the stem. Use the simple percentage-change method
  (change ÷ ORIGINAL value), as both boards do; never the midpoint formula. Add 1-3 `wrong` values that are real
  mistakes (formula upside down, new value as the base, sign dropped) and say why in the explanation.
- **Data is original and clearly fictional.** Data-response stimuli use a fictional country ("Country X"), a fictional
  firm or town, or "a fictional economy in southern Africa"; the figures are invented, internally consistent and
  checked. Never present invented numbers as real Zimbabwean or world statistics. Fictional currencies get invented
  names (for example "the kora, K"); never write a bare `$` before a number (US dollars are `US\$`, in JS `"US\\$"`).
- **Zimbabwean context, well-established facts only.** Use Zimbabwean settings naturally (maize, tobacco, cotton,
  cattle, gold, platinum, lithium, chrome, tourism at Victoria Falls, informal traders and vendors, kombi transport,
  mobile money, the Reserve Bank of Zimbabwe, ZIMRA, ZIMSTAT, SADC, COMESA). Facts you may state as such: the
  hyperinflation of 2007-2008 and the abandonment of the Zimbabwe dollar for a multi-currency system in 2009; the
  re-introduction of a local currency in 2019; the introduction of the Zimbabwe Gold (ZiG) currency by the Reserve
  Bank in April 2024; the fast-track land reform programme from 2000; Zimbabwe's membership of SADC, COMESA and the
  African Union. **No specific statistics** (inflation rates, unemployment rates, GDP figures, export values) unless
  they are widely documented, dated and cited in a reviewer note; prefer "very high", "rose sharply", or ask students
  how to find the official ZIMSTAT figure. Politically contested topics (land reform, indigenisation, currency
  changes) are treated in a balanced way: aims, recognised benefits and recognised problems, no blame, no slogans.
- **MCQs:** exactly one defensible answer, four options, distractors that are definitely wrong (rationale for each),
  numerical distractors from real errors; never "all/none of the above", never refer to options by letter. **No
  length cue** — the key must not be clearly the longest option; check with
  `node .scratch/tools/length-cue.mjs economics-o questions/<your folder>/` → `# 0 flagged`. MCQ options render
  inline: no tables in options (put the table in the stem).
- **Self-marked items** (`manualShort`, manual parts, `ext`): one point per creditworthy idea, as examiners award
  (identify 1 + explain/develop 1; "Explains that demand is price inelastic, so revenue rises when price rises"), points
  add up to the marks, `modelAnswer` / example answer complete. Evaluative parts (*discuss*, *evaluate*) need both
  sides and a justified conclusion; give them `levels` (see Exam-format items).
- **Original wording**, British English, names Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho, Thandeka; places
  Harare, Bulawayo, Mutare, Gweru, Masvingo, Chinhoyi, Kariba, Hwange. Fictional firms only (no real company names in
  invented situations). Dates as 7 October 2026. No invented quotations or "studies show".

### Terminology between the boards

Items without `applies` are tagged to both syllabi: use neutral wording or give both terms the first time. Use
`applies: ZIM` / `applies: CAM` when an item depends on one board's term, depth or rule. Concepts covered by only one
syllabus are tagged to it automatically (no `applies` needed).

| ZIMSEC (syllabus / common usage) | Cambridge 0455 |
|---|---|
| Planned (command) economy, market (free enterprise) economy, mixed economy | Market economic system, mixed economic system (planned economy not examined) |
| Price ceiling / price floor | Maximum price / minimum price |
| Integration (vertical, horizontal) | Mergers (horizontal, vertical, conglomerate) |
| Public corporations (parastatals) | Public sector firms |
| Multinational corporations (MNCs) | Multinational companies (MNCs) |
| Balance of trade (visible exports and imports); invisibles | Trade in goods; trade in services |
| Net income from abroad, current transfers | Primary income; secondary income |
| Consumer Price Index and Retail Price Index | Consumer Prices Index (CPI) |
| Abnormal (supernormal) profit, normal profit | Profit (no theory of normal profit) |
| Stages of production (primary, secondary, tertiary) | Primary, secondary and tertiary sector firms |
| Price elasticity, income elasticity, cross elasticity of demand | PED and PES only |

## Exam-format items (rows owned per assignment below)

Use `applies` and `examStyle: true`. The mock papers draw by type + marks (+ skill for Cambridge Paper 2), so these
must be EXACT:

| Paper item | type | marks | skill | applies | how many |
|---|---|---|---|---|---|
| ZIMSEC P1 / 0455 P1: four-option multiple choice, single answer (ZIMSEC 40 items in 75 min; 0455 40 in 60 min; may need a calculation or a described diagram) | MULTIPLE_CHOICE | 1 | any | none (both) unless board-specific | every concept's MCQs (≥ 80 per syllabus for two mocks; plenty) |
| ZIMSEC P2 data response: one compulsory question on a fictional data stimulus (table of figures + short text), parts (a), (b), … from *state/identify* through *calculate* to *explain/discuss*. **Only concepts of the Paper 2 topics** (6.3-6.9, 6.11, 6.13-6.17: not intro, systems, business organisation, money and banking, market failure) | STRUCTURED | 20 | ANALYSIS | ZIM | 3 per writer (12) |
| ZIMSEC P3 essay: (a) explain/describe [4] + (b) discuss/evaluate [6], both self-marked; candidates answer 4 of 10 | STRUCTURED | 10 | EVALUATION | ZIM | 5 per writer (20) |
| 0455 P2 Section A: compulsory question on unseen information about an economic situation (original passage of 250-400 words with a data table; fictional or anonymised country, invented figures), six parts (a)-(f) from short answers (define, identify, calculate) to a final discuss part (about 6 marks, levels) | STRUCTURED | 20 | ANALYSIS | CAM | 2 per writer (8) |
| 0455 P2 Section B: short context paragraph, four parts — (a) define/identify [2], (b) explain [4], (c) analyse [6], (d) discuss, two-sided with a conclusion [8, levels] | STRUCTURED | 20 | EVALUATION | CAM | 3 per writer (12) |

Each 20-mark item: difficulty 4-5, `secs: 1260` (ZIM P2: `secs: 2100`), a stimulus built and checked with the
helpers, at least a third of the marks auto-marked (`P.num` for calculations, `P.mcq`, `P.fib`, closed `P.short`), the
rest self-marked with line-by-line points. ZIM essays: difficulty 4, `secs: 1080`, no stimulus (one-sentence
question), points that a student can tick. The Section B (a)-(d) marks 2/4/6/8 are our convention (the 2027 specimen
paper was not available to us; a reviewer must check it). Level descriptors for discuss parts (pass as `levels`):
Level 3 (top third of the marks) "two-sided analysis, developed, with a justified conclusion"; Level 2 (middle third)
"some analysis of both sides or one side well developed, limited conclusion"; Level 1 (bottom third) "simple points,
little explanation". Put the items in `questions/exam/<prefix>zimsec.json` and `questions/exam/<prefix>cambridge.json`:
one extra `concept(...)` module each (`file: "exam/<prefix>zimsec"`, `keyPrefix: "exam.<prefix>zimsec"`, `applies:
ZIM`; and the same for Cambridge with `applies: CAM`), setting `concepts: [...]` on every item to the concepts it
actually examines (any concepts of your assignment that the item's syllabus covers).

**Reserved mark values.** STRUCTURED worth **20** marks is only for the ZIMSEC P2 and 0455 P2 items above; STRUCTURED
worth **10** marks is only for the ZIMSEC P3 essays. Practice structured items use 6, 8, 12, 14 or 16 marks. One-mark
single-answer MCQs feed both Paper 1 mocks, so keep every one exam-worthy.

Mock exams (built later, not by writers): ZIMSEC P1 40 × MCQ (75 min); ZIMSEC P2 2 × STRUCTURED 20 ANALYSIS (75 min);
ZIMSEC P3 10 × STRUCTURED 10, answer any 4 (40 marks; 75 min as printed in the table, 2 hours in the text — to be
confirmed); 0455 P1 40 × MCQ (60 min); 0455 P2 Section A 1 × STRUCTURED 20 ANALYSIS + Section B 4 × STRUCTURED 20
EVALUATION, answer any 3 (80 marks, 120 min).

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas (from the concept keys): basics, systems, demand, supply, markets, elasticity, market-failure, money,
  households, labour, production, costs, firms, structures, national-income, macro, fiscal, monetary, growth,
  development, inflation, population, unemployment, trade, forex, bop.
- Lesson titles must be unique (slugs come from titles).

## Commands (repo root)

- Build your slices only: `node .scratch/economics/build-content.mjs <your-prefix>` (prefix match on file names,
  e.g. `w2-`).
- Validate: `npm run content:validate -- economics-o --strict` → 0 error(s), 0 warning(s). Other writers work in the
  same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- economics-o` → fix findings in your files (questions must not reuse a lesson
  worked example's numbers).
- Length cue: see above.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, the registry, the syllabus files or other writers' files: report
  needed changes. Never touch `.scratch/english/` or `content/subjects/english-language-o/`.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation and content:check results, anything unfinished or uncertain.

## Proposed split into 4 writer assignments

Roughly equal effort (calculation- and diagram-heavy concepts count more). Concept keys below drop the `econ.` prefix.
ZIM = ZIMSEC only, CAM = Cambridge only.

**W1 — prefix `w1-`** (22 concepts; the basic problem, systems, demand and supply, elasticity)
basics.scarcity, basics.opportunity-cost, basics.ppc, basics.ppc-shapes-shifts, basics.positive-normative (ZIM),
basics.factors-of-production, systems.types (ZIM), systems.market-economy, systems.planned-mixed,
markets.price-mechanism, demand.law-of-demand, demand.shifts, supply.law-of-supply, supply.shifts,
supply.climate-change (ZIM), markets.equilibrium, markets.price-changes, elasticity.ped, elasticity.ped-determinants,
elasticity.ped-revenue, elasticity.income-cross (ZIM), elasticity.pes.
Folders: `basics/ systems/ demand/ supply/ elasticity/` and `markets/price-mechanism|equilibrium|price-changes`.
Exam rows: 3 ZIM P2 (demand and supply schedules with a shift; PED/PES and revenue; YED/XED), 5 ZIM P3 essays,
2 CAM Section A (a commodity market with price and elasticity data; a PPC and resource allocation case), 3 CAM
Section B. freePreview: `basics.opportunity-cost`, `demand.law-of-demand`.

**W2 — prefix `w2-`** (23 concepts; government in markets, market failure, money and banking, labour, production,
unemployment)
markets.price-controls, markets.taxes-subsidies, markets.other-interventions, market-failure.goods,
market-failure.externalities, money.money, money.banking, households.spending-saving (CAM), labour.occupation-choice,
labour.unions-government, labour.wage-determination, labour.wage-differentials, labour.mobility,
labour.division-of-labour, production.stages, production.land-reform (ZIM), production.productivity,
production.factor-demand (CAM), production.location-of-industry (ZIM), unemployment.measurement, unemployment.types,
unemployment.effects-policies, unemployment.job-creation (ZIM).
Folders: `markets/price-controls|taxes-subsidies|other-interventions`, `market-failure/ money/ households/ labour/
production/ unemployment/`.
Exam rows: 3 ZIM P2 (labour market and wage data; productivity table; unemployment survey data — Paper 2 topics only),
5 ZIM P3 essays, 2 CAM Section A (a labour market or a market with a maximum price; unemployment data), 3 CAM
Section B. freePreview: `money.money`.

**W3 — prefix `w3-`** (24 concepts; costs, firms, market structures, national income, government policy, inflation)
costs.costs-of-production, costs.revenue, costs.profit-maximisation (ZIM), firms.objectives (CAM),
firms.business-organisations (ZIM), firms.private-public-sector, firms.size-mergers, firms.economies-of-scale,
firms.sources-of-finance (ZIM), firms.smes-business-plan (ZIM), structures.competitive-markets, structures.monopoly,
structures.monopolistic-competition (ZIM), structures.equilibrium (ZIM), national-income.measurement (ZIM),
national-income.uses-limitations (ZIM), macro.aims-conflicts (CAM), fiscal.budget-fiscal-policy, fiscal.taxation,
monetary.monetary-policy, macro.supply-side-policy (CAM), inflation.meaning-causes, inflation.measurement,
inflation.effects-policies.
Folders: `costs/ firms/` (except multinationals) `structures/ national-income/ macro/ fiscal/ monetary/ inflation/`.
Exam rows: 3 ZIM P2 (cost and revenue table with profit; national income by expenditure; weighted price index and
inflation), 5 ZIM P3 essays, 2 CAM Section A (a government budget and taxation case; inflation data with policy
choice), 3 CAM Section B. freePreview: `firms.business-organisations`, `national-income.measurement`,
`inflation.meaning-causes`.

**W4 — prefix `w4-`** (23 concepts; growth and development, population, trade, exchange rates, the balance of
payments, multinationals)
growth.economic-growth, growth.recession-policies (CAM), development.meaning-indicators,
development.international-differences (CAM), development.poverty (CAM), development.sustainable (ZIM),
population.growth-distribution, population.effects, population.hiv-aids (ZIM), population.labour-force (ZIM),
trade.domestic-trade (ZIM), trade.international-trade, trade.comparative-advantage, trade.free-trade, trade.protection,
trade.globalisation (CAM), trade.economic-integration (ZIM), trade.terms-of-trade (ZIM), forex.exchange-rates,
forex.shortages (ZIM), bop.current-account, bop.imbalances-policies (CAM), firms.multinationals.
Folders: `growth/ development/ population/ trade/ forex/ bop/` and `firms/multinationals`.
Exam rows: 3 ZIM P2 (current account and terms of trade; population and dependency data; growth and development
indicators), 5 ZIM P3 essays, 2 CAM Section A (a developing economy's trade, exchange rate and current account; living
standards with GDP per head and HDI data), 3 CAM Section B. freePreview: `population.growth-distribution`,
`trade.comparative-advantage`.

freePreview lessons (at most one per top-level topic of each syllabus): opportunity-cost (Cambridge 1 / ZIMSEC 6.1),
law-of-demand (2 / 6.5), money (3 / 6.12), inflation meaning-causes (4 / 6.13), population growth-distribution
(5 / 6.14), comparative-advantage (6 / 6.16), business-organisations (ZIMSEC 6.10 only), national-income measurement
(ZIMSEC 6.11 only).
