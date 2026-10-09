# chemistry-a — writing brief for content agents

You write ORIGINAL study content for the A-Level Chemistry family: ZIMSEC A-Level Chemistry (Forms 5-6, 2015-2022) —
the main product — and Cambridge International AS & A Level Chemistry 9701 (2025-2027). Content is DEV preview only; a
human reviews it later (§41), but write it as if it ships tomorrow. **Chemical accuracy is the first rule**: a wrong
fact, equation, mechanism or number is worse than a missing one. This is A-Level: mechanisms, quantitative physical
chemistry and data analysis are expected, at the depth of the deeper board.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, **tables**, LaTeX and **mhchem** `$\ce{...}$`).
- `content/concepts/chemistry-a.json` (111 concepts). Each description starts with its coverage label — "Both boards
  (ZIMSEC Form 5; Cambridge AS Level).", "Cambridge only (A Level only).", "ZIMSEC only (Form 6)." — and says exactly
  what is IN and what is OUT; "ZIMSEC detail" / "Cambridge detail" marks content only one board names, and "(Cambridge A
  Level only)" marks part of a shared AS concept that Cambridge examines only in Paper 4. Stay inside it; when two
  concepts touch, give the other one a sentence and move on.
- The two syllabus files: `content/syllabi/zimsec/a-level/chemistry/2015-2022.json` (sections 6.1 Physical, 6.2
  Inorganic, 6.3 Organic, 6.4 Applied, with topics 6.1.1 … and sub-topics 6.1.1.1 … grouping the competency-matrix
  content items, plus our Practical skills node P for Paper 4) and `content/syllabi/cambridge/a-level/chemistry/2025-2027.json`
  (section **AS** = topics 1-22, Papers 1 and 2; section **A** = topics 23-37, A Level only, Paper 4; section **PS** =
  practical skills, P3 for Paper 3 and P5 for Paper 5; objectives carry the printed learning-outcome codes such as
  26.1.4). Read the `notes` of both (assessment as read, placement doubts in the ZIMSEC copy, routes, data section).
  ZIMSEC covers 104 concepts, Cambridge 96; 89 are shared.
- **AS versus A Level (Cambridge).** Every Cambridge concept is labelled "Cambridge AS Level" or "Cambridge A Level
  only". AS items feed Papers 1 and 2; A Level items feed Paper 4. Electrode potentials, electrolysis, pH calculations,
  buffers, Ksp, rate equations, Born-Haber cycles and transition elements are A Level only for Cambridge but mostly
  Form 5 for ZIMSEC: write them once, at A Level depth.
- **Data.** Use the values of the Cambridge 9701 Data section (`.scratch/chemistry-a/sources/9701-2025-2027.txt`, from
  the line "Data section": constants, ionisation energies, bond energies, E⦵ values, electronegativities, IR and NMR
  tables, Ar values). The helper constants (`R`, `F`, `L`, `VM_RTP`, `KW`, `C_WATER`, `AR`) are those values. ZIMSEC
  has no data booklet: **every ZIMSEC-applicable item states the data it needs in the stem** (E⦵ values, bond energies,
  Ka, Ar values when they matter). Textbook values (enthalpies of formation, standard entropies, Ka, Ksp, Kstab) are
  allowed when they are standard and labelled "data:"; never invent a "real" value — for fictional data say "a student
  obtained" or "in an experiment".
- The O-level family `content/subjects/chemistry-o/` shows the house style (lesson structure, tone, mhchem use). Go
  well beyond it in depth.
- `.scratch/chemistry-a/lib.mjs`: builders (`concept`, `b.mcq/tf/short/fib/match/num/calc/manualShort/ext/struct/card`,
  `P.*` parts including `P.group` for sub-parts), selectors `ZIM`, `CAM`, `t` for LaTeX, `ce("...")` for mhchem,
  `EXAM` plans, `checkExam`, and the **checked chemistry helpers**: `chk`, `same`, `rnd`, `sf`, `sfStr`, `dpStr`,
  `sciStr`, `table`; constants `R F L E_CHARGE VM_RTP VM_STP KW C_WATER NERNST AR`; `Mr("CuSO4.5H2O")`, `moles`,
  `massOf`, `molesFromSolution`, `concFrom`, `gasVolumeRTP`, `particles`, `percentYield`, `percentPurity`,
  `arFromIsotopes`, `empiricalFormula` (throws unless the data give a whole-number ratio); gases `idealGasMoles`,
  `mrFromGas`, `cm3ToM3`, `dm3ToM3`, `cToK`, `kPaToPa`; titrations `titre` (readings to 0.05 cm³), `meanTitre`
  (concordant within 0.10 cm³); energetics `heatQ`, `deltaHFromQ`, `hessFormation`, `hessCombustion`, `bondEnergyDH`,
  `latticeEnergyFromCycle`, `solutionEnthalpy`, `entropyChange`, `gibbs` (kJ and J handled), `feasibilityT`;
  electrochemistry `ecell`, `nernst`, `gibbsFromE`, `charge`, `molesElectrons`, `massLiberated`, `gasLiberatedRTP`,
  `avogadroFromElectrolysis`; equilibria `kEq`, `partialPressures`, `ice`; acids `pH`, `hFromPH`, `pOH`, `pKa`,
  `kaFromPKa`, `pHStrongBase`, `pHWeakAcid` (√(Ka c) approximation), `kaFromPH`, `bufferPH`, `kspFromSolubility`,
  `solubilityFromKsp`, `solubilityCommonIon`; kinetics `orderFrom` (throws unless 0, 1 or 2), `rateConstant`,
  `rateFrom`, `kFromHalfLife` (0.693/t½), `halfLifeFromK`, `firstOrderRemaining`, `kUnits`; `partitionK`,
  `remainingAfterExtractions`, `rf`, `glcPercent`, `carbonsFromM1`, `inRange`; `mean`, `range`, `pctError`,
  `pctErrorDifference`, `pctDifference`, `linearFit`. Units for numerical answers are the keys of `UNITS` (mol,
  g/mol, mol/dm³, mol²/dm⁶, dm³/mol, cm³, dm³, kJ/mol, J/K/mol, kPa, Pa, K, °C, V, C, A, s, s⁻¹, mol/dm³/s, dm³/mol/s,
  %, cm⁻¹, ppm, …). pH, pKa, Kpc, Rf and relative masses have no unit (omit `unit`). Very small or large values (Ka,
  Ksp, k, particle counts) are marked to 3 s.f. and shown in standard form automatically; students may type 1.8e-5 or
  1.8×10^-5.
- Style examples: `.scratch/english/slices/a1-nouns-pronouns.mjs` (every MCQ option has a rationale, explanations
  teach, hints from difficulty 3); any `.scratch/additional-mathematics/slices/` file (numbers, structured items with
  sub-parts); any lesson in `content/subjects/chemistry-o/lessons/`.

## What to produce per concept

1. **One lesson** `content/subjects/chemistry-a/lessons/<area>/<name>.md` (key `<area>.<name>`, where the concept key
   is `achem.<area>.<name>`; e.g. `achem.acids.buffers` → `lessons/acids/buffers.md`, key `acids.buffers`),
   **900-1,600 words** (tables do not count), template of §6: `## Introduction` (why it matters, a hook — a
   Zimbabwean context where it is natural and accurate — and what the student should know already), `## Key
   definitions` (`:::definition{term="…"}` in precise examinable wording of your own; `:::keyfact` for values and
   equations to learn), explanation sections in a logical order (mechanisms as numbered steps; reactions as
   reagent-condition-product tables; trends with the explanation), **at least two worked examples**
   (`:::worked-solution` for every calculation, every step shown with units; `:::example` for a mechanism, a
   deduction from test results, a spectrum or a synthesis route), `## Common mistakes` (`:::mistake{title="…"}`),
   `## Exam tips` (`:::exam-tip`: which papers test it — ZIMSEC Papers 1-4, Cambridge Papers 1-5 — and how *state,
   describe, explain, deduce, suggest, calculate, predict, construct* are answered for this concept), `## Summary` (one
   `:::summary`, 4-6 bullets). Front matter: key, title (unique), summary, concepts ([the concept]), estimatedMinutes
   (honest), level "core"; `freePreview: true` ONLY on the lessons named ★ in your assignment. Do not add
   `objectives`. Where the boards differ in depth or terms, add a short `:::keyfact{title="ZIMSEC and Cambridge"}`
   saying who needs what (e.g. "pOH and Kb: ZIMSEC only"; "Nernst equation: Cambridge A Level").
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/chemistry-a/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 40%; four options, 1 mark, exam-worthy: they feed ZIMSEC Paper 1 and Cambridge
     Paper 1). **About one MCQ in four per concept in ZIMSEC multiple-completion form**: the stem lists three numbered
     statements and asks "Which of the statements are correct?", options exactly "1, 2 and 3", "1 and 2 only", "2 and
     3 only", "1 only" (each with a rationale); ZIMSEC Paper 1 has 10 such items in 40. Numerical/calculation
     (`b.num` / `b.calc`) wherever the concept has numbers (most physical concepts: at least 5), true/false, matching
     (reagent ↔ product, ion ↔ observation, complex ↔ colour/shape, peak ↔ bond, step ↔ name), fill-in-the-blank
     (with `choices` drop-downs for terms, colours and conditions), closed `short` answers (a formula, a name, a
     reagent, an oxidation number — list every acceptable form), 3-5 self-marked `manualShort` items (describe /
     explain / outline a mechanism / suggest, 2-6 marks, one tickable point per mark) and 2-4 **practice structured**
     items (`b.struct`, difficulty 3-5, `examStyle: true`, totals 6, 8, 12, 14 or 16 — never 10, 15, 20 or 25, see
     reserved marks) on an original stimulus (results table, described spectrum, reaction scheme, unknown compound's
     test results, titration data) with sub-parts where natural.
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 application, ~30% d4-5 exam-style. `daily: true` only on 2-3
     auto-marked items of difficulty 2-3 per concept (short; no long tables).
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION. `calculator: true` on items needing one.
   - `applies`: omit when the item suits both boards (the usual case for shared concepts); `applies: ZIM` /
     `applies: CAM` when it depends on one board's content (pOH, Kb, steam distillation detail, magnetism, uses of
     Group II compounds inside a shared concept → ZIM; the Nernst equation, IR or NMR, Friedel-Crafts details, Kstab
     calculations with Cambridge-only framing → CAM). Single-board concepts are tagged to their board automatically.
     An item whose `concepts` include a single-board concept must carry that board's `applies`.
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FORMULA, CONCEPT, FACT ("What colour is
     [Cu(NH₃)₄(H₂O)₂]²⁺(aq)?").

## Chemistry quality rules (non-negotiable)

- **Facts are right or absent.** Equations balanced (atoms and charge — check every one), reagents and conditions as
  the syllabuses state them (e.g. ethanolic vs aqueous NaOH; distil vs reflux; KCN in ethanol; Sn/concentrated HCl;
  below 10 °C for diazotisation; 25-60 °C for nitration), colours and observations standard (use the qualitative
  analysis notes in both syllabuses as the reference for cation, anion and gas tests). Typical values are labelled
  "about": Haber about 200 atm and 400-450 °C; Contact about 1-2 atm and 400-450 °C. No invented statistics, production
  figures or "studies show".
- **Every number is computed in code.** Build data tables and answers with the helpers (they throw on impossible data:
  titres not concordant, burette readings not to 0.05 cm³, empirical ratios not whole, orders not 0/1/2, an Rf above 1,
  values on a rounding boundary) and pass the **exact** value to `b.num` / `b.calc`; never type a computed answer by
  hand (`chk` any value you also write in prose). Lesson tables and worked calculations: print them from a script in
  `.scratch/chemistry-a/tables/<prefix><name>.mjs` (never in `slices/`, which the build imports) and paste the
  output. Re-derive every worked example from its data. **Calculations covered:** moles, gas volumes, pV = nRT,
  titrations (acid-base, redox, back titrations), empirical formulae, yield and purity, q = mcΔT, Hess cycles, bond
  energies, Born-Haber, hydration cycles, ΔS, ΔG and feasibility temperature, E⦵cell, Nernst, ΔG = −nFE, Faraday
  quantities and the Avogadro constant, Kc, Kp (mole fractions), pH of strong/weak acids and bases, Ka, buffers, Ksp
  and the common ion effect, Kpc and extractions, Kstab, initial rates, orders, k and its units, half-life, Rf, GLC
  percentages, M+1 carbon counts, percentage uncertainty.
- **Conventions in calculations.** Cambridge rules: answers to the same number of significant figures as (or one more
  than) the least precise data; no quadratic equations in equilibrium problems; weak-acid pH with the approximation
  [H⁺] = √(Ka c) stated; k = 0.693/t½; temperatures in K in pV = nRT, ΔG and Nernst; R = 8.31, F = 9.65 × 10⁴, L =
  6.022 × 10²³, Vm = 24.0 dm³ mol⁻¹ (room conditions). State the unit and the rounding in the stem ("in kJ mol⁻¹, to
  three significant figures") and pass `unit` and `dp` or `sf` to match (default: 3 s.f. or better). Add 1-3 `wrong`
  values that are real mistakes (sign of ΔH; J not converted to kJ; °C not converted to K; mass of solution vs mass of
  solid; mole ratio ignored; concentration not converted from cm³; log of the wrong ratio; k from t½ with ln 2 vs 0.693
  is NOT a mistake) and say why in the explanation. `b.calc` items need a numbered `workedSolution` (it defaults to the
  explanation, so write the explanation as the full calculation).
- **Notation.** mhchem for every formula and equation in stems, options and lessons: `$\ce{H2SO4}$`,
  `$\ce{SO4^2-}$`, `$\ce{[Cu(H2O)6]^2+}$`, state symbols `$\ce{NaCl(aq)}$`, arrows `->`, equilibria `<=>`, `$\ce{^{37}Cl}$`
  for isotopes. In JS write them with ``t`$\ce{...}$` `` or `ce("...")` (backslashes single in t-strings). Standard
  symbol: `$\Delta H^\ominus$` (or ⦵ in plain text). Units as `$\text{kJ mol}^{-1}$` or "kJ mol⁻¹" consistently in a
  file. British/IUPAC spelling: **sulfur, sulfate** (Cambridge), with "sulphur/sulphate" accepted in short answers
  because the ZIMSEC document uses it; aluminium; caesium. Names: ethanoic acid, propan-2-ol, 2-methylpropan-2-ol (give
  the old name in brackets once if useful). Oxidation states in Roman numerals: iron(III), manganate(VII),
  dichromate(VI).
- **Mechanisms in words and schemes, never images.** Describe each step: what attacks what, where each curly arrow
  starts and ends ("an arrow from the C=C π bond to the δ+ bromine atom; an arrow from the Br–Br bond to the other
  bromine atom"), the intermediate (with its charge and where it is), the product. Use a numbered list or a table
  (step | species | arrows | result). Questions ask "Which statement describes the first step…", "Where does the curly
  arrow start…", order the steps (matching), or are self-marked "describe the mechanism" with one point per arrow or
  intermediate. Reaction schemes as tables (step | reagent and conditions | product | type of reaction). Structures as
  structural formulae (`CH3CH(OH)CH2CH3`) or text descriptions; skeletal or displayed formulae only described in
  words. Spectra as tables (δ / ppm | relative area | splitting; m/e | relative abundance; wavenumber / cm⁻¹ |
  intensity). Graphs as data tables plus a sentence on the shape; titration curves as tables of pH against volume.
  Never "the diagram below" unless the table is there; never "draw" (self-marked "describe what your sketch would show"
  is fine).
- **Zimbabwean context where natural and accurate:** names (Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho,
  Thandeka), places (Harare, Bulawayo, Mutare, Gweru, Kwekwe, Masvingo, Hwange, Kariba, the Great Dyke), industry in
  general terms only (platinum group metals, chromite and nickel on the Great Dyke; coal at Hwange; fertiliser,
  sugar and ethanol production; water treatment), crops and foods (maize, sorghum, groundnuts, citrus, marula and
  baobab fruit). Well-established facts only; no production figures or company claims; neutral wording on mining,
  pollution and policy.
- **Safety and ethics:** practical items state precautions (eye protection; fume cupboard for chlorine, bromine,
  sulfur dioxide, hydrogen cyanide or concentrated acids; no naked flames with flammable organics; gloves for
  corrosive or toxic reagents; chromium(VI) and mercury compounds as toxic) and treat hydrogen cyanide and diazonium
  salts as hazardous; no instructions that would help make dangerous substances outside a supervised laboratory. Drugs,
  nuclear power and pollution: factual and balanced.
- **MCQs:** exactly one defensible answer, four options, distractors definitely wrong (rationale for each: a real
  misconception — confusing oxidising and reducing agent, SN1 and SN2, Kc and Kp units, cis and trans, the colour of
  Fe²⁺ and Fe³⁺ precipitates); never "all/none of the above", never refer to options by letter (multiple-completion
  options name the statements by number, which is fine). **No length cue** — the key must not be clearly the longest
  option; check with `node .scratch/tools/length-cue.mjs chemistry-a questions/<your folder>/` → `# 0 flagged`.
- **Self-marked items:** one point per creditworthy idea, as A-Level mark schemes award; points add up to the marks;
  example answer complete. *Explain* needs a reason linked to structure or bonding; *describe* a mechanism needs each
  arrow and intermediate; *describe* observations needs colours and states; *suggest* accepts any valid answer (list
  the main ones inside points as "A or B").
- **Original wording** (no textbook, past-paper or mark-scheme text), British English, dates as 7 October 2026.

### Terminology between the boards

| ZIMSEC (syllabus / usage) | Cambridge 9701 |
|---|---|
| sulphur, sulphate, sulphuric acid | sulfur, sulfate, sulfuric acid (use these; accept both in answers) |
| Group II, Group IV, Group VII | Group 2, (Group 14), Group 17 |
| Halogen derivatives (halogenoalkanes and halogenoarenes) | Halogen compounds |
| Charge density | effect of ionic charge and radius |
| Distribution between phases | Partition coefficients, Kpc |
| pOH, Kb, pKb (calculated) | not tested (Kb and Kw = Ka × Kb) |
| Multiple-completion items in Paper 1 | four-choice items only |
| Dative bonding | coordinate (dative covalent) bonding |
| Free response (Paper 3, 4 sections) | Structured questions (Papers 2 and 4) |

In a shared concept use both names the first time ("Group 17 (Group VII)").

## Exam-format items (rows owned per assignment below)

Use `examStyle: true`, the exact type, marks, skill and `applies` of the row, `paper:` (e.g. `"Paper 2"`), and set
`concepts` on every item to the concepts it really examines (all covered by every syllabus the item applies to). Wrap
the parts in `checkExam(EXAM.X, [...])` and pass `skill: EXAM.X.skill, secs: EXAM.X.secs` (and `applies:
EXAM.X.applies` where the plan has one). The builder refuses a STRUCTURED item worth 10, 15, 20 or 25 marks that does
not match a plan. Part labels: `(a)`, `(b)`, … with sub-parts `(i)`, `(ii)` one level deep via `P.group`, or `(1)`,
`(2)` with sub-parts `(a)`, `(b)`; never "1(a)" (the validator rejects it). The mocks draw by type + marks + skill (+
topic), so these must be EXACT:

| Paper item | plan | type, marks, skill | applies | parts and content | how many |
|---|---|---|---|---|---|
| ZIMSEC P1 and Cambridge P1: 40 four-option multiple-choice items | — | MULTIPLE_CHOICE, 1 | none (both) unless board-specific | every concept's MCQs (about a quarter in multiple-completion form); Cambridge P1 draws AS concepts only | ≥ 80 per syllabus for two mocks (plenty) |
| **Theory structured** — ZIMSEC P2 (six compulsory 10-mark questions, 60 marks), Cambridge P2 (AS content, 60 marks) and Cambridge P4 (A Level content, 100 marks): one structured question on one area | `EXAM.THEORY10` | STRUCTURED, 10, APPLICATION | none when every concept is covered by both syllabi and the wording suits both; otherwise ZIM or CAM | an original stimulus (data table, reaction scheme, described spectrum, test results); parts (a), (b), (c) … of 1-4 marks from *state/name* through *calculate/construct an equation* to *explain/suggest*, sub-parts allowed; at least 4 marks auto-marked; difficulty 3-4 | 6 per writer (48); mocks need 12 ZIMSEC, 12 Cambridge AS, 20 Cambridge A |
| **ZIMSEC P3** free response (six answered: 2 from Section A physical, 1 from B inorganic, 2 from C organic, 1 from D applied; 90 marks) | `EXAM.ZIM_P3_FREE` | STRUCTURED, 15, UNDERSTANDING | ZIM | parts (a), (b), (c) … mixing auto-marked calculations or short answers (at least 4 marks) with one or two self-marked explain/describe/discuss parts of 3-6 marks (`P.manual`, one point per mark, `type: "EXTENDED_RESPONSE"` with a `modelAnswer` for parts of 5+ marks); `paper: "Paper 3 Section A"` (B, C or D) naming the section; difficulty 4-5 | 3 per writer, W2b 4, W4b 2 (24: A 9, B 4, C 7, D 4); mocks need A 3, B 2, C 3, D 2 per paper |
| **ZIMSEC P4** quantitative analysis | `EXAM.ZIM_P4_QUANTITATIVE` | STRUCTURED, 20, ANALYSIS | ZIM | the method in steps with original results (burette readings to 0.05 cm³, masses to 0.01 g, temperatures to 0.1 °C or 0.5 °C); parts: recording a results table (self-marked description of headings, units, precision), mean concordant titre (auto), mole calculations to a final answer (auto, with `wrong` values), sources of error and improvements (self-marked); concepts include `achem.skills.quantitative-practical` | 4 (see assignments) |
| **Cambridge P3** quantitative question | `EXAM.CAM_P3_QUANTITATIVE` | STRUCTURED, 25, ANALYSIS | CAM | as above at Paper 3 standard (titration with dilution, or a rate, thermometric, gravimetric or gas-volume experiment): table conventions, processing to correct s.f., graph description (gradient, intercept, extrapolation in words), percentage uncertainty, conclusion, systematic vs random errors, improvements; concepts include `achem.skills.quantitative-practical` | 4 |
| **Qualitative analysis** (ZIMSEC P4 and Cambridge P3 style) | `EXAM.QUALITATIVE_ANALYSIS` | STRUCTURED, 15, APPLICATION | none (both) unless board-specific | tests on one or two unknowns from the qualitative analysis notes (cations with NaOH(aq) and NH₃(aq), anions, gases, simple organic tests); parts: predict or interpret observations (auto-marked fill-in or MCQ/short for ion identities), choose a reagent to distinguish two ions, write an ionic equation (short), deductions linked to observations (self-marked); include ions only in the ZIMSEC list (Pb²⁺, Mn²⁺ are both lists; CrO₄²⁻ ZIMSEC) with `applies` set if needed; concepts include `achem.skills.qualitative-analysis` | 6 |
| **Planning** (ZIMSEC P4 planning/design and Cambridge P5 question 1 style) | `EXAM.PLANNING` | STRUCTURED, 15, EVALUATION | none (both) unless board-specific | an aim and background; prediction (with a sketch graph described), variables, apparatus and quantities (volumes, concentrations, masses computed with the helpers), step-by-step method with standard practice, safety, results table, how to process the results; mostly self-marked with tickable points; concepts include `achem.skills.planning-evaluation` | 6 |
| **Cambridge P5** question 2 style: analysis and evaluation | `EXAM.CAM_P5_ANALYSIS` | STRUCTURED, 15, ANALYSIS | CAM | given raw data (computed with the helpers): processing (auto-marked), choosing what to plot and the gradient or intercept of y = mx + c (`linearFit`, auto-marked with a sensible tolerance), percentage error, anomalies, conclusion, evaluation of the method; concepts include `achem.skills.planning-evaluation` | 6 |

Each 20- and 25-mark item: difficulty 4-5; each 15- and 10-mark item: difficulty 3-5. Self-marked parts have
line-by-line points. The 15-mark Paper 3 size follows from 90 marks over six questions; the ZIMSEC Paper 4 split
(20 + 15 + 15) and the Cambridge Paper 3 split (25 + 15) and all part structures are our conventions (the syllabi give
only paper totals); a reviewer must check them against recent papers. Put the items in extra modules:
`concept(<one of the item concepts>, { file: "exam/<prefix>theory", keyPrefix: "exam.<prefix>theory" }, …)` for the
10-mark items (set `applies` per item), `exam/<prefix>zimsec` (`applies: ZIM`) for ZIMSEC-only rows,
`exam/<prefix>cambridge` (`applies: CAM`) for Cambridge-only rows and `exam/<prefix>practical` for the both-board
practical rows (e.g. `exam/w2a-practical`, key prefix `exam.w2a-practical`).

**Reserved mark values.** STRUCTURED worth **10, 15, 20 or 25** marks is only for the exam-format items above.
Practice structured items use 6, 8, 12, 14 or 16 marks.

Mock exams (built later by the lead, not by writers): ZIMSEC P1 40 × MCQ (60 min); ZIMSEC P2 6 × THEORY10 (90 min);
ZIMSEC P3 10 × ZIM_P3_FREE offered (3 A, 2 B, 3 C, 2 D), answer 6 (150 min); ZIMSEC P4 ZIM_P4_QUANTITATIVE +
QUALITATIVE_ANALYSIS + PLANNING (50 marks, 150 min); Cambridge P1 40 × MCQ on AS topics (75 min); Cambridge P2 6 ×
THEORY10 on AS topics (75 min); Cambridge P3 CAM_P3_QUANTITATIVE + QUALITATIVE_ANALYSIS (40 marks, 120 min); Cambridge
P4 10 × THEORY10 on A Level topics (120 min); Cambridge P5 PLANNING + CAM_P5_ANALYSIS (30 marks, 75 min). Continuous
assessment (ZIMSEC) and the hands-on practical work are not simulated.

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas (from the concept keys): atoms, stoich, bonding, states, energetics, electrochem, equilibria, acids, phase,
  kinetics, periodicity, group2, group14, group17, nitrogen-sulfur, transition, organic, hydrocarbons, halogen, hydroxy,
  carbonyl, carboxylic, amines, polymers, analysis, environment, nano, skills.
- Lesson titles must be unique (slugs come from titles). Lesson-only scratch scripts go in
  `.scratch/chemistry-a/tables/<prefix><name>.mjs` (never in `slices/`).

## Commands (repo root)

- Build your slices only: `node .scratch/chemistry-a/build-content.mjs <your-prefix>` (prefix match on the START of
  file names, e.g. `w2a-`; the trailing dash matters, so `w1a-` does not pick up `w1b-` files).
- Validate: `npm run content:validate -- chemistry-a --strict` → 0 error(s), 0 warning(s). Other writers work in the
  same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- chemistry-a` → fix findings in your files.
- Length cue: see the MCQ rule above.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, concepts.mjs, zimsec.mjs, cambridge.mjs, the registry, the syllabus
  files, `.scratch/tools/`, other families or other writers' files: report needed changes (a concept boundary, a
  missing unit or helper) instead.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation, content:check and length-cue results, any fact you left out or want a reviewer to check.

## Proposed split into 8 writer assignments

111 concepts; 13-14 per assignment plus exam rows of roughly equal weight (a practical row counts about as much as a
concept). Concept keys below drop the `achem.` prefix. ★ = `freePreview: true` (checked: at most one lesson per topic
of each syllabus; 25 ZIMSEC and 25 Cambridge topics get one). Every writer also owns **6 THEORY10** items on their own
concepts (AS / A Level split given per writer: AS items feed Cambridge P2, A Level items P4; items on ZIMSEC-only
concepts are `applies: ZIM` and feed ZIMSEC P2 only) and the **ZIM_P3_FREE** items named (on concepts ZIMSEC covers).

**W1a — prefix `w1a-`** (14; atomic structure, stoichiometry, bonding, states — ZIMSEC 6.1.1-6.1.4, Cambridge 1-4, AS)
atoms.particles-isotopes, atoms.orbitals-configurations ★, atoms.ionisation-energy, stoich.relative-masses-mole ★,
stoich.formulae-equations, stoich.reacting-masses-yield, stoich.solutions-titrations, bonding.ionic-metallic,
bonding.covalent-dative, bonding.orbitals-hybridisation, bonding.shapes-vsepr ★, bonding.intermolecular-forces,
states.gases ★, states.lattice-structures.
Folders: `atoms/ stoich/ bonding/ states/`. THEORY10: 6 AS. ZIM_P3_FREE ×3 (Section A). Practical rows:
ZIM_P4_QUANTITATIVE ×1 (acid-base titration: Mr or water of crystallisation of a carbonate), CAM_P3_QUANTITATIVE ×1
(titration with a diluted solution, or a gas-volume determination).

**W1b — prefix `w1b-`** (14; energetics, electrochemistry, quantitative practical)
energetics.enthalpy-calorimetry ★, energetics.hess-bond-energies, energetics.born-haber, energetics.solution-hydration,
energetics.entropy-gibbs ★, electrochem.oxidation-numbers ★, electrochem.electrode-potentials,
electrochem.nernst-free-energy, electrochem.electrolysis-products, electrochem.industrial-electrolysis,
electrochem.faraday, electrochem.fuel-cells, electrochem.redox-titrations, skills.quantitative-practical ★.
Folders: `energetics/ electrochem/`, `skills/quantitative-practical`. THEORY10: 2 AS + 4 A Level. ZIM_P3_FREE ×3
(Section A). Practical rows: ZIM_P4_QUANTITATIVE ×1 (manganate(VII) with iron(II) or ethanedioate),
CAM_P3_QUANTITATIVE ×1 (thermometric: enthalpy change and a Hess cycle), PLANNING ×1 (an enthalpy determination or the
electrolytic Avogadro constant), CAM_P5_ANALYSIS ×1 (E against log concentration, or ΔG against T: gradient and
intercept). The quantitative-practical lesson is the reference for every writer's practical items: finish it early.

**W2a — prefix `w2a-`** (14; equilibria, acids and bases, kinetics)
equilibria.dynamic-le-chatelier ★, equilibria.kc-kp, equilibria.haber-contact, acids.bronsted-lowry, acids.ph-kw,
acids.weak-acids-bases, acids.titration-curves-indicators, acids.buffers, acids.solubility-product,
phase.partition-extraction, kinetics.collisions-boltzmann ★, kinetics.rate-equations, kinetics.mechanisms-rds,
kinetics.catalysis.
Folders: `equilibria/ acids/ kinetics/`, `phase/partition-extraction`. THEORY10: 3 AS + 3 A Level. ZIM_P3_FREE ×3
(Section A). Practical rows: ZIM_P4_QUANTITATIVE ×1 (sodium thiosulfate and acid clock reaction: order from rates),
CAM_P3_QUANTITATIVE ×1 (a rate experiment with gas volume or a clock reaction), PLANNING ×1 (order of reaction or Ka
by pH measurement), CAM_P5_ANALYSIS ×1 (log rate against log concentration, or initial rates).

**W2b — prefix `w2b-`** (13; Period 3, Groups 2, IV and 17, nitrogen and sulfur, qualitative analysis)
periodicity.physical-properties ★, periodicity.element-reactions, periodicity.oxides-chlorides, group2.reactions-uses ★,
group2.thermal-stability-solubility, group14.elements-uses ★, group14.oxides-chlorides, group17.properties-reactivity ★,
group17.halide-ions, group17.chlorine-uses, nitrogen-sulfur.nitrogen-ammonia ★, nitrogen-sulfur.environment,
skills.qualitative-analysis.
Folders: `periodicity/ group2/ group14/ group17/ nitrogen-sulfur/`, `skills/qualitative-analysis`. THEORY10: 5 AS + 1
A Level (Group 2 explanations). ZIM_P3_FREE ×4 (Section B; nitrogen and sulfur items say "Section B or D" in the
explanation because the placement is unclear). Practical rows: QUALITATIVE_ANALYSIS ×3 (s-block and p-block cations,
anions, gases), CAM_P3_QUANTITATIVE ×1 (gravimetric: thermal decomposition of a Group 2 carbonate or water of
crystallisation of hydrated magnesium sulfate). The qualitative-analysis lesson is the reference for the other
qualitative rows: finish it early.

**W3a — prefix `w3a-`** (14; transition elements, environmental chemistry, nanochemistry — mostly ZIMSEC applied)
transition.general-properties ★, transition.complexes-ligands, transition.colour, transition.stereoisomerism,
transition.stability-constants, transition.vanadium-chromium, transition.manganese, transition.iron,
transition.cobalt-nickel, transition.copper, transition.platinum-group-metals, environment.air-pollution-energy ★,
environment.waste-management, nano.nanomaterials ★.
Folders: `transition/ environment/ nano/`. THEORY10: 4 A Level (shared transition concepts) + 2 `applies: ZIM`
(element chemistry). ZIM_P3_FREE ×3 (Section D). Practical rows: ZIM_P4_QUANTITATIVE ×1 (iodine-thiosulfate:
copper in brass or a copper(II) salt), QUALITATIVE_ANALYSIS ×2 (transition-metal ions, complexes and colour
changes). Platinum group metals and mining contexts: no figures, general terms only.

**W3b — prefix `w3b-`** (14; organic foundations, hydrocarbons, halogen compounds)
organic.nomenclature-formulas ★, organic.reaction-types, organic.isomerism, organic.optical-isomerism-drugs,
hydrocarbons.alkanes-crude-oil, hydrocarbons.free-radical-substitution, hydrocarbons.alkenes-reactions,
hydrocarbons.electrophilic-addition, hydrocarbons.benzene-structure, hydrocarbons.arenes-reactions,
hydrocarbons.electrophilic-substitution, halogen.halogenoalkane-reactions ★, halogen.sn1-sn2,
halogen.halogenoarenes-cfcs.
Folders: `organic/` (not synthesis-*), `hydrocarbons/ halogen/`. THEORY10: 3 AS + 3 A Level. ZIM_P3_FREE ×3
(Section C). Practical rows: PLANNING ×1 (relative rates of hydrolysis of chloro-, bromo- and iodoalkanes with silver
nitrate), CAM_P5_ANALYSIS ×1 (rate data for halogenoalkane hydrolysis). The nomenclature and reaction-types lessons are
the reference for every organic writer: finish them early.

**W4a — prefix `w4a-`** (14; hydroxy, carbonyl, carboxylic and nitrogen compounds)
hydroxy.alcohols-structure, hydroxy.alcohol-reactions ★, hydroxy.phenol, carbonyl.aldehydes-ketones ★,
carbonyl.nucleophilic-addition, carboxylic.acids-reactions, carboxylic.acidity-further-reactions, carboxylic.esters ★,
carboxylic.acyl-chlorides, amines.preparation-basicity, amines.nitriles, amines.phenylamine-azo, amines.amides,
amines.amino-acids ★.
Folders: `hydroxy/ carbonyl/ carboxylic/ amines/`. THEORY10: 2 AS + 4 A Level. ZIM_P3_FREE ×3 (Section C). Practical
rows: QUALITATIVE_ANALYSIS ×1 (organic functional-group tests on unknowns), PLANNING ×1 (preparing and purifying an
ester, or determining the pKa of a weak acid), CAM_P5_ANALYSIS ×1 (data from an esterification equilibrium or an amino
acid titration).

**W4b — prefix `w4b-`** (14; polymers, synthesis, analytical techniques, planning)
polymers.addition ★, polymers.condensation, polymers.uses-degradability, organic.synthesis-as ★, organic.synthesis-a,
analysis.infrared ★, analysis.mass-spectrometry, analysis.chromatography-tlc ★, analysis.chromatography-glc,
analysis.carbon-13-nmr, analysis.proton-nmr, analysis.electrophoresis, phase.steam-distillation,
skills.planning-evaluation.
Folders: `polymers/ analysis/`, `organic/synthesis-as|synthesis-a`, `phase/steam-distillation`,
`skills/planning-evaluation`. THEORY10: 2 AS + 4 A Level (spectroscopy and synthesis items are `applies: CAM`).
ZIM_P3_FREE ×2 (one Section C on polymers, one Section D on chromatography, electrophoresis or steam distillation).
Practical rows: PLANNING ×2 (e.g. separating and identifying a mixture by chromatography; partition or steam
distillation of an essential oil), CAM_P5_ANALYSIS ×2 (y = mx + c from given data; percentage error and evaluation).
The planning-evaluation lesson is the reference for every writer's planning and analysis items: finish it early.

Totals: THEORY10 48 (23 on Cambridge AS concepts, 23 on A Level concepts, 2 ZIMSEC only; most also serve ZIMSEC P2),
ZIM_P3_FREE 24 (A 9, B 4, C 7, D 4), ZIM_P4_QUANTITATIVE 4, CAM_P3_QUANTITATIVE 4, QUALITATIVE_ANALYSIS 6, PLANNING 6,
CAM_P5_ANALYSIS 6.
