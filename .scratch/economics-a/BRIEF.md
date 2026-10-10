# economics-a — writing brief for content agents

You write ORIGINAL study content for the A-Level Economics family: ZIMSEC A-Level Economics (Forms 5-6, 2015-2022) — the
main product — and Cambridge International AS & A Level Economics 9708 (2026-2028). Content is DEV preview only; a human
reviews it later (§41), but write it as if it ships tomorrow. **Economic accuracy is the first rule**: a wrong definition,
formula, sign or diagram description is worse than a missing one. This is A-Level: models, calculations, data analysis,
evaluation and structured argument are expected, at the depth of the deeper board.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, **tables**, LaTeX).
- `content/concepts/economics-a.json` (106 concepts). Each description starts with its coverage label — "Both boards
  (ZIMSEC Form 5; Cambridge AS Level).", "Cambridge only (A Level only).", "ZIMSEC only (Form 6)." — and says exactly what
  is IN and what is OUT; "ZIMSEC detail" / "Cambridge detail" marks content only one board names. Stay inside it; when two
  concepts touch, give the other one a sentence and move on.
- The two syllabus files: `content/syllabi/zimsec/a-level/economics/2015-2022.json` (topics 1-11 of the topic list; the
  sub-topic codes 1.1 … and objective codes are ours; node S = Examination skills) and
  `content/syllabi/cambridge/a-level/economics/2026-2028.json` (section **AS** = topics 1-6, Papers 1 and 2; section **A**
  = topics 7-11, A Level only, Papers 3 and 4; section **SK** = examination skills; objectives carry the printed
  learning-outcome codes such as 2.2.7). Read the `notes` of both (assessment as read, routes, gaps in the ZIMSEC copy).
  ZIMSEC covers 96 concepts, Cambridge 98; 88 are shared.
- **AS versus A Level (Cambridge).** Every Cambridge concept is labelled "Cambridge AS Level" or "Cambridge A Level only"
  (skills lessons: "AS and A Level"). AS items feed Cambridge Papers 1 and 2; A Level items feed Papers 3 and 4. Utility,
  costs, market structures, labour markets, money and banking and development are A Level only for Cambridge but Form 5 or
  Form 6 for ZIMSEC: write them once, at A Level depth.
- The O-level family `content/subjects/economics-o/` and its kit `.scratch/economics/` (lessons in
  `content/subjects/economics-o/lessons/`, slices in `.scratch/economics/slices/`) show the house style (lesson structure,
  tone, question mix). Go well beyond it in depth: A Level adds models (elasticity values, surplus areas, multipliers),
  algebraic and tabular calculation, and evaluation.
- `.scratch/economics-a/lib.mjs`: builders (`concept`, `b.mcq/tf/short/fib/match/num/calc/manualShort/ext/essay/struct/card`,
  `P.*` parts including `P.group` for sub-parts), selectors `ZIM`, `CAM`, `t` for Markdown/LaTeX text, `EXAM` plans,
  `checkExam`, and the **checked economics helpers**: `chk`, `rnd`, `sf`, `sfStr`, `dpStr`, `fmt`, `money`, `pct`,
  `signedPct`, `table`, `pctChange`, `elasticity` (ped, pes, yed, xed, fromPct, describe), `arcElasticity`, `pedPoint`,
  `unitaryPrice`, `schedule`, `marketSum`, `linearMarket` (equilibrium and surpluses), `linearAt`, `taxIncidence`,
  `subsidyEffect`, `priceControl`, `triangleArea`, `utility` (marginal, table, bestBundle), `budgetLine`, `costTable`,
  `revenueTable`, `profitSchedule`, `productivity`, `concentrationRatio`, `monopolyLinear`, `thirdDegree`, `game2x2`,
  `mrpTable`, `labourMarket`, `prices` (weighted index, inflation, real value), `deflator`, `nationalIncome`,
  `nationalAccounts`, `growthRate`, `compoundRate`, `keynes` (multiplier, equilibriumIncome, change, gap, accelerator),
  `quantityTheory`, `realInterest`, `creditCreation`, `currentAccount`, `termsOfTrade`, `tariffEffect`,
  `tradeWeightedIndex`, `realExchangeIndex`, `marshallLerner`, `comparativeAdvantage`, `forex`, `pppRate`,
  `debtServiceRatio`, `lorenz` (table and Gini), `hdi`, `cba`/`discount`, `tax`, `budgetBalance`, `unemploymentRate`,
  `dependencyRatio`, `population`, and descriptive statistics `mean`, `median`, `modes`, `range`, `weightedMean`,
  `groupedMean`, `modalClass`, `pieAngles`. Read the doc comment of each before use; the module checks its own arithmetic
  at import.
- Numeric `kind`s: `money` (US$), `pct`, `elasticity` (2 dp: also multipliers, Gini, HDI with `dp: 3`), `index`, `ratio`,
  `times`, `plain`; `unit` is a key of `UNITS` (`US$ million`, `%`, `percentage points`, `units`, `tonnes`, `workers`,
  `index points`, …); ask the coordinator to add a missing unit.
- Style examples: `.scratch/economics/slices/` (stimulus tables, structured items, self-marked points, essays with
  levels), `.scratch/biology-a/slices/` (A-level exam-format wrapping with `checkExam`), and any lesson in
  `content/subjects/economics-o/lessons/`.

## What to produce per concept

1. **One lesson** `content/subjects/economics-a/lessons/<area>/<name>.md` (key `<area>.<name>`, where the concept key is
   `aecon.<area>.<name>`; e.g. `aecon.market.ped-revenue` → `lessons/market/ped-revenue.md`, key `market.ped-revenue`),
   **900-1,600 words** (tables do not count), template of §6: `## Introduction` (why it matters, a hook — a Zimbabwean or
   regional context where it is natural and accurate — and what the student should know already), `## Key definitions`
   (`:::definition{term="…"}` in precise examinable wording of your own; `:::keyfact` for formulae and rules to learn),
   explanation sections in a logical order (models step by step; causal chains as numbered stages; diagrams described in
   words with a schedule), **at least two worked examples** (`:::worked-solution` for every calculation — elasticity,
   surplus, multiplier, index, GDP, credit creation, terms of trade, Gini …; `:::example` for data interpretation and for
   an evaluation paragraph), `## Common mistakes` (`:::mistake{title="…"}`), `## Exam tips` (`:::exam-tip`: which papers
   test it — ZIMSEC Papers 1-3, Cambridge Papers 1-4 — and how *define, explain, calculate, analyse, assess, discuss,
   evaluate* are answered for this concept), `## Summary` (one `:::summary`, 4-6 bullets). Front matter: key, title
   (unique), summary, concepts ([the concept]), estimatedMinutes (honest), level "core"; `freePreview: true` ONLY on the
   lessons named in your assignment. Do not add `objectives`. Where the boards differ in depth or terms, add a short
   `:::keyfact{title="ZIMSEC and Cambridge"}` saying who needs what (e.g. "Giffen goods: Cambridge"; "quasi-rent: ZIMSEC").
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/economics-a/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 40%; four options, 1 mark, exam-worthy: they feed ZIMSEC Paper 1 and Cambridge Papers 1
     and 3 — many Cambridge MCQs need a short calculation or the reading of a described diagram or table),
     numerical/calculation (`b.num` / `b.calc`) wherever the concept has numbers, true/false, matching (term ↔ definition,
     policy ↔ effect, theory ↔ economist's view), fill-in-the-blank (with `choices` drop-downs for terms), closed `short`
     answers (list every acceptable form), 3-5 self-marked `manualShort` items (define / explain / analyse, 2-6 marks, one
     tickable point per mark) and 2-4 **practice structured** items (`b.struct`, difficulty 3-5, `examStyle: true`, totals
     6, 8, 10, 12, 14 or 16 — never 20 or 25, see reserved marks) on an original data stimulus (a schedule, a table of
     national statistics, a short passage about a fictional economy) with sub-parts where natural; and, where the concept
     is evaluative, one practice extended response (`b.ext`, 8-16 marks, `levels`).
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 application, ~30% d4-5 exam-style. `daily: true` only on 2-3
     auto-marked items of difficulty 2-3 per concept (short; no long tables).
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION. `calculator: true` on items needing one.
   - `applies`: omit when the item suits both boards (the usual case for shared concepts); `applies: ZIM` / `applies: CAM`
     when it depends on one board's content (a ZIMSEC-detail part inside a shared concept → ZIM; Giffen goods, hysteresis,
     Marshall-Lerner, nudge theory → CAM). Single-board concepts are tagged to their board automatically.
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FORMULA, CONCEPT, FACT ("What does a PED of −0.4
     tell you?").

## Economics quality rules (non-negotiable)

- **Definitions and models are right or absent.** Use the standard A-Level treatment (as in the major A-Level textbooks
  and the syllabus wording of the board, but in your own words). If you are not sure, leave it out or say it generally.
  State assumptions (ceteris paribus; perfect information; constant technology). Distinguish a movement along a curve from
  a shift, short run from long run, nominal from real, a stock from a flow, average from marginal.
- **Every number is computed in code.** Build schedules, tables and answers with the helpers (they throw on impossible
  data: a demand curve that slopes upward, shares that do not add up, a market with no equilibrium, a tie for maximum
  profit) and pass the **exact** value to `b.num` / `b.calc`; never type a computed answer by hand (`chk` any value you
  also write in prose). Lesson tables and worked calculations: print them from a script in
  `.scratch/economics-a/tables/<prefix><name>.mjs` (never in `slices/`, which the build imports) and paste the output.
  Re-derive every worked example from its data. Avoid data that sits on a rounding boundary (the builders refuse it).
- **All data is illustrative.** Invent original, plausible figures for fictional or anonymised economies ("Country X",
  "Zandia", "a fictional town"); label tables "illustrative" and never present invented data as real statistics. For
  Zimbabwe use well-established facts at a general level only (sectors, institutions, policies, wildlife and mining as
  industries); no GDP, inflation, unemployment, debt or trade figures presented as real.
- **Formulae as the boards use them.** Elasticities by the simple percentage-change method (the base is the ORIGINAL
  value): PED = %ΔQd ÷ %ΔP, PES = %ΔQs ÷ %ΔP, YED = %ΔQd ÷ %ΔY, XED = %ΔQd of A ÷ %ΔP of B; point elasticity on a
  straight-line demand curve is a Cambridge/ZIMSEC checklist extension and the midpoint method an optional aside. PED is
  normally negative: say in the stem whether the sign is wanted ("include the minus sign" or "ignore the sign"), because
  an answer box accepts one value only. Tax: average rate = tax ÷ income × 100; marginal rate from banded schedules. Real
  value = nominal ÷ index × 100; GDP deflator = nominal GDP ÷ real GDP × 100; multiplier k = 1/(1 − MPC(1 − MRT) + MPM) =
  1/(MPS + MPT + MPM) with propensities as fractions of national income (say which form you use); bank credit multiplier
  = 1/reserve ratio; terms of trade = export price index ÷ import price index × 100; Gini = area between the diagonal and
  the Lorenz curve ÷ area under the diagonal; MV = PT; unemployment rate = unemployed ÷ labour force × 100; concentration
  ratio = combined share of the n largest firms. Cambridge does not print formulae in papers: lessons teach them.
- **Numerical answers:** state the unit and the rounding in the stem ("in US$ million", "to one decimal place") and pass
  `kind`/`unit` and `dp` (or `sf`) to match; add 1-3 `wrong` values that are real mistakes (base taken as the new value;
  wrong sign; MPS used instead of MPC; the reserve ratio not inverted; units confused) and say why in the explanation.
  `b.calc` items need a numbered `workedSolution` (it defaults to the explanation, so write the explanation as the full
  calculation).
- **Notation.** British spelling (labour, programme, defence), US$ for money (`money()` or `US\$` in text: a bare `$`
  starts maths), % for percentages, "percentage points" for differences of rates, thousands separated with commas,
  true minus signs (−) in prose and tables. Use P, Q, D, S, MC, MR, AR, ATC, AVC, TR, TC, AD, AS, SRAS, LRAS, C, I, G, X,
  M, Y as the boards do and define each on first use.
- **Diagrams in words and tables, never images** (only uploaded images are possible and you cannot make them). Describe a
  diagram as "a downward-sloping demand curve D and an upward-sloping supply curve S, with price (US$) on the vertical axis
  and quantity (units per week) on the horizontal axis, cross at the equilibrium price …"; give the numbers in a schedule;
  describe shifts as "D shifts to the right from D1 to D2" and read off the new equilibrium. Questions say "Which
  statement describes …" or give a labelled description; never "draw" (self-marked "describe the diagram you would draw,
  labelling the axes, curves and equilibrium" is fine) and never "the diagram below" unless the table or description is
  there.
- **Zimbabwean context where natural and accurate:** names (Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho, Thandeka),
  places (Harare, Bulawayo, Mutare, Gweru, Masvingo, Hwange, Kariba, Victoria Falls), sectors (maize, tobacco, cotton,
  horticulture, mining, tourism, transport, the informal sector, mobile money), institutions (the Reserve Bank, the
  Ministry of Finance, ZIMRA, ZIMSTAT, SADC, COMESA). Zimbabwe's currency history (the severe inflation of 2007-2008, the
  use of foreign currencies from 2009, later local currencies) may be mentioned factually and briefly, without figures.
- **Politically neutral and balanced.** Land reform, indigenisation, sanctions, price and exchange-rate controls,
  privatisation, the Look East policy, taxes and wages are economic topics: present arguments for and against, attribute
  views to groups ("supporters argue …", "critics argue …"), never to invented individuals, take no side and make no claim
  you cannot support. Cambridge material must stay politically neutral too. Sensitive topics (poverty, HIV/AIDS, aid, debt):
  factual, respectful, no stigma.
- **MCQs:** exactly one defensible answer, four options, distractors definitely wrong (rationale for each: a real
  misconception — confusing a movement with a shift, nominal with real, average with marginal, a stock with a flow);
  never "all/none of the above", never refer to options by letter. **No length cue** — the key must not be clearly the
  longest option; check with `node .scratch/tools/length-cue.mjs economics-a questions/<your folder>/` → `# 0 flagged`.
- **Self-marked items:** one point per creditworthy idea, as A-Level mark schemes award; points add up to the marks;
  example answer complete. *Define* needs a precise definition; *explain* a reason linked to the mechanism; *analyse* a
  developed chain of cause and effect; *calculate* the working; *assess/discuss/evaluate* two-sided argument and a
  justified judgement. Essay parts use `levels` (see exam rows).
- **Original wording** (no textbook, past-paper or mark-scheme text), British English, dates as 7 October 2026.

### Terminology between the boards

| ZIMSEC (syllabus / usage) | Cambridge 9708 |
|---|---|
| Abnormal profit | Supernormal profit (and subnormal profit) |
| GNP, NNP (and GDP) | GNI, NNI (and GDP); adjust market prices to basic prices |
| Output, income and expenditure approaches | Same three methods; Cambridge emphasises GDP, GNI, NNI definitions |
| Retail Price Index and Consumer Price Index | Consumer price index (CPI) |
| Economic union (and free trade area, customs union) | Free trade area, customs union, monetary union, full economic union |
| BOP: current account, capital account, balance for official financing | BOP: current account, capital account, financial account (reserve assets); balance of trade in goods/services |
| Common property, market imperfections | Common resources are not named; imperfect competition, asymmetric information, moral hazard |
| Wages legislation, incomes policy | National minimum wage; price and wage controls |
| Money multiplier | Bank credit multiplier |
| Marginal Revenue Productivity Theory (MRPT) | Marginal revenue product (MRP) theory |
| Cost-benefit analysis (CBA) | Use of costs and benefits in analysing decisions (NPV not required) |
| Exchange rate policy; Look East policy | Exchange rate policy; expenditure-switching and expenditure-reducing policies |

In a shared concept use both names the first time ("supernormal (abnormal) profit"). ZIMSEC lists the older BOP layout
in which long-term and short-term capital flows sit in the "capital account"; Cambridge uses the capital account (capital
transfers) and the financial account. Teach the Cambridge layout and note the ZIMSEC wording as ZIMSEC detail; a reviewer
will check.

## Exam-format items (rows owned per assignment below)

Use `examStyle: true`, the exact type, marks, skill and `applies` of the row, `paper:` (e.g. `"Paper 2"`), and set
`concepts` on every item to the concepts it really examines (all covered by every syllabus the item applies to; AS
concepts for Cambridge Paper 2 items, A Level concepts for Paper 4 items; any concept of a ZIMSEC row must be covered by
ZIMSEC). Wrap the parts of STRUCTURED rows in `checkExam(EXAM.X, [...])` and pass `skill: EXAM.X.skill, secs: EXAM.X.secs,
applies: EXAM.X.applies`. The builder refuses a reserved-mark item that does not match a plan. Part labels: `(a)`, `(b)`,
… with sub-parts `(i)`, `(ii)` one level deep via `P.group`, or `(1)`, `(2)` with sub-parts `(a)`, `(b)`; never "1(a)" (the
validator rejects it). The mocks draw by type + marks + skill (+ topic) + applies, so these must be EXACT:

| Paper item | plan | type, marks, skill | applies | parts and content | how many |
|---|---|---|---|---|---|
| ZIMSEC P1 (40 items), Cambridge P1 (30, AS concepts only) and Cambridge P3 (30, A Level concepts only): four-option multiple choice | — | MULTIPLE_CHOICE, 1 | none (both) unless board-specific | every concept's MCQs; Paper 3 items test A Level content with AS assumed | ≥ 80 per syllabus for two mocks (plenty) |
| **ZIMSEC P2**: one of two compulsory data-response questions | `EXAM.ZIM_P2_DATA` | STRUCTURED, 20, ANALYSIS | ZIM | an original stimulus (table of figures and a short fictional passage; 250-400 words) and 4-6 parts (a)-(f): state/identify/define → calculate (auto-marked: `P.num`) → explain/analyse (self-marked) → discuss/evaluate (last part, levels); skills mix as printed: knowledge ~20%, application ~40%, analysis ~30%, communication ~10%; any ZIMSEC concept (incl. tools) | 1 per writer (8) |
| **ZIMSEC P3**: one of 12 essays (answer 4, 100 marks) | `EXAM.ZIM_P3_ESSAY` | STRUCTURED, 25, EVALUATION | ZIM | (a) 10 *explain/analyse* and (b) 15 *discuss/evaluate*, both `P.manual({ type: "EXTENDED_RESPONSE", points, modelAnswer, wordLimit })` with one point per mark and a full model answer; (b) with `levels` (L3 11-15 two-sided developed analysis with a justified conclusion; L2 6-10 some analysis, limited conclusion; L1 1-5 simple points); no stimulus beyond a one-sentence setting; difficulty 4-5; ZIMSEC concepts of topics 2-11 only (not the tools topic) | 3 per writer (24) |
| **Cambridge P2 Section A**: AS data response | `EXAM.CAM_P2_DATA` | STRUCTURED, 20, ANALYSIS | CAM | an original stimulus (fictional economy; a table or schedule plus a short passage of 250-400 words); six parts (a)-(f) from *define/identify/calculate* (auto-marked) through *explain/analyse* to a final *assess/discuss* part worth about 6 marks (levels); AS concepts only | 4 in total (writers named below) |
| **Cambridge P2 Sections B and C**: AS essay in two parts | `EXAM.CAM_P2_ESSAY` | STRUCTURED, 20, EVALUATION | CAM | (a) 8 *explain/analyse* and (b) 12 *assess/discuss/evaluate*, both `EXTENDED_RESPONSE` with points and a model answer, (b) with `levels` (L3 9-12; L2 5-8; L1 1-4); set on microeconomic AS topics (Cambridge topics 2-3) or macroeconomic AS topics (4-6); diagrams are *described* in the model answer | 8 in total (4 micro, 4 macro) |
| **Cambridge P4 Section A**: A Level data response | `EXAM.CAM_P4_DATA` | STRUCTURED, 20, ANALYSIS | CAM | stimulus as above; four parts (a)-(d) of unequal marks (for example 3, 5, 5, 7; the last evaluative with levels); A Level concepts (AS assumed, not the focus) | 4 in total |
| **Cambridge P4 Sections B and C**: unstructured A Level essay | `EXAM.CAM_P4_ESSAY` | ESSAY, 20, EVALUATION | CAM | one question (a sentence or a short quotation), `b.essay({ marks: 20, points, levels, modelAnswer, wordLimit, examStyle: true, applies: CAM, skill: "EVALUATION", paper: "Paper 4" })`; levels L3 14-20 (developed two-sided analysis and evaluation with a justified judgement), L2 7-13, L1 1-6; set on microeconomic A Level topics (7-8) or macroeconomic ones (9-11); A Level concepts | 8 in total (4 micro, 4 macro) |

Each 20- and 25-mark item: difficulty 4-5, at least a third of the marks of data items auto-marked (`P.num`, `P.mcq`,
`P.fib`, closed `P.short`), the rest self-marked with line-by-line points. The 25-mark ZIMSEC split (10 + 15), the part
structures of the ZIMSEC rows, the 8 + 12 Cambridge AS split and the part marks of the data rows are our conventions (the
syllabi give only paper totals, question counts and, for Cambridge, the number of parts); a reviewer must check them
against specimen and recent papers. Put the items in extra modules:
`concept(<one of the item concepts>, { file: "exam/<prefix>zimsec", keyPrefix: "exam.<prefix>zimsec", applies: ZIM }, …)` for
the ZIMSEC rows and `exam/<prefix>cambridge` (`applies: CAM`) for the Cambridge rows (one module each; the exam items'
`concepts` list says what they really examine).

**Reserved mark values.** STRUCTURED worth **20 or 25** marks and ESSAY worth **20** marks are only for the exam-format
items above. Practice structured items use 6, 8, 10, 12, 14 or 16 marks; practice essays use `b.ext` (EXTENDED_RESPONSE).

Mock exams (built later by the lead, not by writers): ZIMSEC P1 40 × MCQ (90 min, 40 marks); ZIMSEC P2 2 × ZIM_P2_DATA
(75 min, 40 marks); ZIMSEC P3 12 × ZIM_P3_ESSAY, answer any 4 (180 min, 100 marks; topics 2-11); Cambridge P1 30 × MCQ on
AS topics (60 min, 30 marks); Cambridge P2 1 × CAM_P2_DATA + 2 micro and 2 macro CAM_P2_ESSAY, answer one micro and one
macro (120 min, 60 marks); Cambridge P3 30 × MCQ on A Level topics (75 min, 30 marks); Cambridge P4 1 × CAM_P4_DATA +
2 micro and 2 macro CAM_P4_ESSAY, answer one of each (120 min, 60 marks). Continuous assessment (ZIMSEC) is not simulated.

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas (from the concept keys): tools, basics, enterprise, market, utility, costs, firms, distribution, labour,
  intervention, equity, macro, policy, money, trade, dev, skills.
- Lesson titles must be unique (slugs come from titles). Lesson-only scratch scripts go in
  `.scratch/economics-a/tables/<prefix><name>.mjs` (never in `slices/`).

## Commands (repo root)

- Build your slices only: `node .scratch/economics-a/build-content.mjs <your-prefix>` (prefix match on the START of file
  names, e.g. `w2a-`; the trailing dash matters, so `w1a-` does not pick up `w1b-` files).
- Validate: `npm run content:validate -- economics-a --strict` → 0 error(s), 0 warning(s). Other writers work in the same
  family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- economics-a` → fix findings in your files.
- Length cue: see the MCQ rule above.
- Literal newlines: `node .scratch/tools/literal-newlines.mjs economics-a` → no findings in your files. `t` turns a
  typed `\n` (not followed by a lower-case letter) into a line break; otherwise use a real line break in the template.
  Inside plain `"…"` strings use `\n` as usual.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, concepts.mjs, the registry, the syllabus files, `.scratch/tools/`, other
  families or other writers' files: report needed changes (a concept boundary, a missing unit or helper) instead.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation, content:check, length-cue and literal-newlines results, any fact you left out or want a reviewer to
  check.

## Proposed split into 8 writer assignments

106 concepts; 12-14 per assignment plus exam rows of roughly equal weight. Concept keys below drop the `aecon.` prefix.
★ = `freePreview: true` (at most one lesson per top-level topic of each syllabus; a shared concept counts for both; the
13 starred lessons cover all eleven ZIMSEC topics and Cambridge topics 1-11). Every writer owns **1 ZIM_P2_DATA** and **3
ZIM_P3_ESSAY** items on their own concepts (ZIMSEC essays only on concepts ZIMSEC covers, never `tools.*`), plus the
Cambridge rows named below, on concepts they own that suit the paper (AS concepts for Paper 2 rows, A Level concepts for
Paper 4 rows).

**W1a — prefix `w1a-`** (13; foundations: method, resources, systems, enterprise, demand and supply)
tools.research-methods ★, tools.economic-method, tools.data-analysis, basics.scarcity-choice ★,
basics.factors-of-production, basics.entrepreneur-specialisation, basics.ppc, basics.economic-systems,
basics.goods-classification, enterprise.sources-capital, enterprise.business-forms-ethics, market.demand ★,
market.supply.
Folders: `tools/ basics/ enterprise/ market/` (demand, supply). Cambridge rows: CAM_P2_ESSAY ×1 (micro, e.g. PPC or
goods classification). Several concepts are ZIMSEC only (tools.research-methods, tools.data-analysis, enterprise.*):
their items carry ZIM automatically; `tools.economic-method` is Cambridge only.

**W1b — prefix `w1b-`** (12; the price system: elasticity, equilibrium, surplus, utility, taxes and price controls)
market.ped, market.ped-revenue, market.yed-xed, market.pes, market.equilibrium, market.price-mechanism, market.surplus,
utility.marginal-utility, utility.indifference-curves, intervention.taxes-subsidies,
intervention.price-controls-buffer-stocks, skills.diagrams-and-data.
Folders: `market/ utility/ intervention/ skills/`. Heavy on numbers: finish early, the other writers use these
helpers' conventions. Cambridge rows: CAM_P2_DATA ×1 (a market with elasticity and a tax or price control),
CAM_P2_ESSAY ×2 (micro). Utility and indifference curves are Cambridge A Level only (ZIMSEC Form 6).

**W2a — prefix `w2a-`** (13; production, costs, revenue and market structures)
costs.short-run-production, costs.short-run-costs, costs.long-run-costs-scale, costs.revenue-curves, costs.profit-types,
firms.objectives, firms.structures-features, firms.perfect-competition ★, firms.monopoly, firms.monopolistic-competition,
firms.oligopoly, firms.collusion-game-theory, firms.price-discrimination.
Folders: `costs/ firms/`. All Cambridge A Level only (Paper 3/4 content). Cambridge rows: CAM_P4_DATA ×1 (costs and
revenue schedule, profit), CAM_P4_ESSAY ×2 (micro, e.g. oligopoly or monopoly). Use `profitSchedule`, `costTable`,
`monopolyLinear`, `game2x2` and `concentrationRatio`.

**W2b — prefix `w2b-`** (14; efficiency, firm growth, labour and distribution, externalities)
firms.efficiency, firms.growth-integration, firms.sme ★, dev.mncs-fdi, distribution.factor-rewards,
distribution.rent-transfer-earnings, labour.demand-mrp ★, labour.supply, labour.wage-determination,
labour.wage-differentials, intervention.market-failure ★, intervention.externalities, intervention.cost-benefit,
skills.essay-evaluation.
Folders: `firms/ dev/ distribution/ labour/ intervention/ skills/`. Cambridge rows: CAM_P4_DATA ×1 (labour market or
externality data), CAM_P4_ESSAY ×2 (micro, e.g. labour market or externalities). `skills.essay-evaluation` serves both
boards' essay papers: model an evaluation paragraph and the level descriptors. Uses `mrpTable`, `labourMarket`,
`cba`.

**W3a — prefix `w3a-`** (14; government intervention (rest), equity, measurement of the macroeconomy and AD/AS)
intervention.direct-provision-information, intervention.regulation-permits-nudge, intervention.privatisation,
intervention.government-failure, intervention.central-planning-zimbabwe, intervention.wages-land-policies,
equity.inequality-redistribution, equity.poverty-equity, macro.national-income-statistics,
macro.price-indices-real-values, macro.circular-flow ★, macro.aggregate-demand, macro.aggregate-supply,
macro.ad-as-equilibrium.
Folders: `intervention/ equity/ macro/`. Cambridge rows: CAM_P2_DATA ×1 (national income or price index data),
CAM_P2_ESSAY ×2 (one micro on intervention, one macro on AD/AS). The two ZIMSEC-only intervention lessons
(central-planning-zimbabwe, wages-land-policies) must be factual, balanced and politically neutral.

**W3b — prefix `w3b-`** (13; growth, unemployment, inflation, income determination, policy objectives and conflicts)
macro.growth-measurement-causes, macro.growth-cycles-gaps, macro.growth-inclusive-sustainable, macro.unemployment,
macro.unemployment-natural-rate, macro.inflation, macro.consumption-saving-investment, macro.multiplier,
macro.income-gaps, macro.schools-of-thought, policy.objectives, policy.interrelated-problems-phillips ★,
policy.effectiveness-conflicts.
Folders: `macro/ policy/`. Cambridge rows: CAM_P2_DATA ×1 (unemployment or inflation data), CAM_P2_ESSAY ×1 (macro),
CAM_P4_DATA ×1 (multiplier and gap data), CAM_P4_ESSAY ×1 (macro). Uses `keynes`, `prices`, `deflator`,
`unemploymentRate`. growth-cycles-gaps, growth-inclusive-sustainable and unemployment-natural-rate are Cambridge only.

**W4a — prefix `w4a-`** (13; fiscal and monetary policy, money and banking, the basis of trade)
policy.taxes, policy.fiscal-policy, policy.monetary-policy, policy.supply-side ★, money.functions-characteristics ★,
money.banking-institutions, money.credit-creation, money.money-demand-supply, money.quantity-theory,
money.interest-rates, trade.absolute-comparative ★, trade.free-trade, trade.protectionism.
Folders: `policy/ money/ trade/`. Cambridge rows: CAM_P2_ESSAY ×1 (macro, fiscal or monetary), CAM_P4_DATA ×1
(money and banking data), CAM_P4_ESSAY ×1 (macro, e.g. monetary policy). Uses `tax`, `creditCreation`, `quantityTheory`,
`realInterest`, `comparativeAdvantage`, `tariffEffect`. `policy.supply-side` is Cambridge only.

**W4b — prefix `w4b-`** (14; balance of payments, exchange rates, integration and development)
trade.economic-integration, trade.terms-of-trade, trade.bop-current-account, trade.bop-accounts, trade.bop-policies,
trade.exchange-rates-floating, trade.exchange-rate-systems, trade.exchange-rate-effects,
dev.living-standards-indicators, dev.population, dev.economic-structure, dev.income-distribution-lorenz,
dev.aid-debt-institutions, dev.globalisation ★.
Folders: `trade/ dev/`. Cambridge rows: CAM_P2_DATA ×1 (current account data), CAM_P2_ESSAY ×1 (macro, international),
CAM_P4_ESSAY ×2 (macro, e.g. exchange rates, development). Uses `currentAccount`, `termsOfTrade`, `forex`,
`tradeWeightedIndex`, `marshallLerner`, `lorenz`, `hdi`, `pppRate`, `debtServiceRatio`.

Totals: ZIM_P2_DATA 8, ZIM_P3_ESSAY 24, CAM_P2_DATA 4 (W1b, W3a, W3b, W4b), CAM_P2_ESSAY 8 (W1a 1, W1b 2, W3a 2, W3b 1,
W4a 1, W4b 1: four micro and four macro), CAM_P4_DATA 4 (W2a, W2b, W3b, W4a), CAM_P4_ESSAY 8 (W2a 2, W2b 2, W3b 1, W4a 1,
W4b 2: four micro and four macro). Cambridge microeconomic topics are 2, 3, 7, 8; macroeconomic topics are 4, 5, 6, 9,
10, 11.
