# additional-mathematics-o — writing brief for content agents

You write ORIGINAL study content for the Additional Mathematics family: ZIMSEC O-Level Additional Mathematics
(Forms 3-4, 2015-2022) and Cambridge IGCSE Additional Mathematics 0606 (2025-2027). Content is DEV preview only; a
human reviews it later (§41), but write it as if it ships tomorrow. Concept prefix `amath` (`math` is mathematics-o).

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec, §7.4 the nested
  STRUCTURED example), §8 (flashcards), §11 (quality bar). `docs/CONTENT_AUTHORING.md` §3 (KaTeX: inline `$…$`,
  display `$$` on its own lines, `\$` for money), §4 (blocks), tables.
- `content/concepts/additional-mathematics-o.json` (89 concepts; each description says exactly what is in and out, and
  "ZIMSEC only" / "Cambridge only" when one board alone examines it).
- The two syllabus files: `content/syllabi/zimsec/o-level/additional-mathematics/2015-2022.json` and
  `content/syllabi/cambridge/igcse/additional-mathematics/2025-2027.json` (which node covers each concept, Cambridge's
  exclusions and accuracy conventions in `notes`, ZIMSEC form of each item, uncertainties).
- `.scratch/additional-mathematics/lib.mjs`: question builders (`concept`, `b.mcq/tf/num/calc/expr/short/fib/match/
  manualShort/proof/struct/card`, parts `P.*` including `P.group` for sub-parts and `P.proof` for "show that") and the
  **checked maths helpers**: `t` (String.raw for LaTeX), `chk`, `same`, `round`, `rnd`, `sf`, `sfStr`, `dpStr`, `F`
  and `Fr` (exact fractions with `.tex`), `simplifySurd`, `poly` (eval/add/mul/div/deriv/rationalRoots/str/tex),
  `quad` (disc/roots/completeSquare), `root` (bisection), `lg`, `ln`, `logb`, `rad`, `deg`, `sec`, `cosec`, `cot`,
  `solveTrig` (all solutions in an interval, degrees or radians), `fact`, `nPr`, `nCr`, `binomialCoeffs`, `ap`, `gp`,
  `vec`, `deriv`, `integrate`, `checkDeriv`, `checkAntideriv`, statistics (`mean`, `median`, `quartiles`, `variance`,
  `sd`, `s2`, `freqStats`, `grouped`, `cv`), `binom`, `Phi`, `invPhi`, `phiTable`, `zCrit`, `normalProb`, `ciMean`,
  mechanics (`suvat`, `resultant`), text (`table`, `steps`, `paras`, `money`, `forms`).
- Style examples: `.scratch/english/slices/a1-nouns-pronouns.mjs` (slice style: every MCQ option has a rationale,
  explanations teach, hints from difficulty 3), `.scratch/physics/slices/a2-motion.mjs` (numeric items with units and
  LaTeX through `t`), and the lessons `content/subjects/mathematics-o/lessons/algebra/quadratics-completing-the-square-and-formula.md`
  and `content/subjects/mathematics-o/lessons/calculus/differentiation.md` (front matter, blocks, LaTeX style).

## What to produce per concept

1. **One lesson** `content/subjects/additional-mathematics-o/lessons/<area>/<name>.md` (the concept
   `amath.<area>.<name>` → `lessons/<area>/<name>.md`, key `<area>.<name>`; e.g. `amath.logs.laws` →
   `lessons/logs/laws.md`, key `logs.laws`), **900-1,600 words** (display maths and tables do not count), template of
   §6: `## Introduction` (where the idea is used, why it matters in the exam), `## Key definitions` (`:::definition`,
   `:::formula{name="…"}` — say whether the formula is in Cambridge's List of formulas), explanation sections, **at least
   three worked examples** (`:::worked-solution[Example n: …]`, numbered steps, every value shown, from routine to exam
   standard; one should be a typical "show that" or multi-step exam question), `## Common mistakes`
   (`:::mistake{title="…"}`), `## Exam tips` (`:::exam-tip`; the command words *find, show that, hence, sketch, solve,
   prove, explain*; accuracy; Cambridge Paper 1 has no calculator), `## Summary` (one `:::summary`). Front matter: key,
   title (unique; the concept name is a good start), summary, concepts ([the concept]), estimatedMinutes (honest),
   level "core"; `freePreview: true` ONLY on the lessons named in your assignment. No `objectives`. Where the boards
   differ in notation or depth, add a short `:::keyfact{title="ZIMSEC and Cambridge"}`.
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/additional-mathematics/slices/<prefix><name>.mjs`
   using `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: about 30% MCQ (four options, 1 mark), 35-45% answers typed by the student (`b.num` / `b.calc` for
     numbers; `b.fib` with number blanks for coefficients, constants and several roots; `b.expr` for exact or
     algebraic answers), some true/false and matching (function → derivative, graph feature → equation), 1-3
     self-marked `b.proof` / `manualShort` items where the concept has proofs, "show that" or sketch descriptions, and
     2-4 **practice structured** items (`b.struct`, difficulty 3-5, `examStyle: true`, marks 5, 6, 7, 9 or 11 — never
     8, 10, 12 or 13, see reserved marks) built like real exam questions ("(a) show that … (b) hence find …").
   - Difficulty spread: ~20% d1-2 recall/routine, ~50% d2-3 standard technique, ~30% d4-5 exam-style multi-step.
     `daily: true` only on 2-3 auto-marked items of difficulty 2-3 per concept (short; no long tables).
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FORMULA, CONCEPT, FACT; LaTeX allowed.
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION. `calculator`: `false` on every item that
     can be done by hand (they feed Cambridge Paper 1 practice), `true` when a calculator is needed (logs to 3 s.f.,
     trig of non-special angles, normal probabilities). ZIMSEC's calculator rules are not printed in the syllabus.

## Maths quality rules (non-negotiable)

- **Every answer is computed in code.** Compute every value with the lib helpers or plain JS maths, pass the EXACT
  value to `b.num` / `b.calc` (the builder rounds for display and sets the tolerance), and tie numbers you also write
  in LaTeX to the computation with `chk(...)` / `same(...)` (they throw on a mismatch). Check derivatives and
  integrals you derived by hand with `checkDeriv` / `checkAntideriv`, every root by substitution, and every trig
  solution list with `solveTrig`. For lessons, compute worked examples in a script
  `.scratch/additional-mathematics/tables/<prefix><name>.mjs` (NEVER in `slices/`: the build imports every `.mjs`
  there), print the numbers and LaTeX, and paste them. Re-derive every worked example from its data before you finish.
- **Accuracy and tolerance.** The default numeric rule follows Cambridge's conventions (also fine for ZIMSEC):
  integers are exact; other answers "correct to 3 significant figures" — the tolerance is half a unit in the 3rd
  significant figure, so the 3-s.f. answer and anything more accurate score, and a fraction typed exactly (`2/3`)
  scores too; angles in degrees default to 1 decimal place (`unit: "°"`). Use `dp` when the question asks for decimal
  places and `sf` for other significant figures. **Say the accuracy in the stem.** The builder throws when a value
  sits on a rounding boundary: change the data. Add 1-3 `wrong` values that are real errors (sign slip, forgot the
  second solution, degrees instead of radians, divided by n instead of n − 1) and explain them.
- **Exact and algebraic answers.** Prefer forms that mark reliably: `b.fib` with `input: "number"` blanks for the
  constants of a required form ("Write $2x^2 + 12x + 13$ in the form $a(x + b)^2 + c$: $a =$ {{blank:a}} …" — blanks
  never inside `$…$`), or `b.num` for a single value. Use `b.expr` for genuinely algebraic answers (a factorisation, a
  surd, f⁻¹(x), a derivative): say the form in the stem, list every equivalent form a student may type (orders of
  factors and terms, `x =` included or not); `forms()` adds √/sqrt, π/pi, superscripts, `*` and `ln(x)`/`lnx`
  variants automatically. Several solutions: one number blank each, "in ascending order", or a self-marked part.
- **Proofs and "show that".** Never auto-mark a given result. Use `b.proof` / `P.proof` with mark-scheme style points
  (one line each a student can tick: "M1 uses sec²θ = 1 + tan²θ", "A1 reaches the given result with no errors") and a
  complete model proof, one step per line in display maths. Proofs that a function has no inverse, explanations of a
  maximum, of a sum to infinity, of an asymptote: self-marked points too.
- **Graphs and diagrams are described, never drawn** (only uploaded images are possible and we have none). Lessons
  describe a graph precisely (shape, intercepts with coordinates, turning points, asymptotes with equations, behaviour
  as x grows) and give a table of values (`table(...)`). "Sketch" questions become: auto-marked features (intercepts,
  vertex, asymptote equation, number of solutions as `b.num`) and/or a self-marked "describe the sketch you would draw"
  with one point per feature. Geometry and mechanics figures are described in words (points, lengths, angles,
  directions of forces) with every value needed.
- **Notation.** All maths in LaTeX: `$x^2$`, `$\frac{dy}{dx}$`, `$\sqrt{3}$`, `$\log_2 x$`, `$\lg x$`, `$\ln x$`,
  `$\mathrm{e}^{x}$` or `$e^{x}$` (be consistent within a file), vectors `$\overrightarrow{AB}$`, bold
  `$\mathbf{a}$`, column vectors `$\begin{pmatrix} 3 \\ -4 \end{pmatrix}$`, units in text after the maths
  (`$12.5$ m s$^{-1}$` or "12.5 m/s"). Radians are written without a unit or as "rad"; calculus with trigonometric
  functions is always in radians. Money is `US\$` (`money(n)`); never a bare `$` before a number. No LaTeX inside FIB
  blanks or in `unitHint` / `answerPrefix` (plain text, e.g. `"x ="`).
- **Statistics (ZIMSEC).** Candidates use 4-figure standard normal tables: compute with `normalProb` (gives the exact
  value and a tolerance that also accepts the table answer); use `zCrit(95)` = 1.96 and `zCrit(99)` = 2.576; say
  which variance is meant (data: divide by n; unbiased estimate: divide by n − 1). State probabilities "as a fraction
  or a decimal" (percentages are not accepted by number boxes).
- **Mechanics (ZIMSEC).** State g in every stem that needs it ("Take $g = 9.8$ m s$^{-2}$" or 10) and pass the same
  value to the computation; units on every numeric answer (`unit: "m/s"`, `"N"`, `"J"`, `"W"`, `"m/s²"`); particles,
  light inextensible strings, smooth or rough planes stated; forces listed with directions.
- **MCQs:** exactly one defensible answer, four options, distractors from real errors (rationale for each), never
  "all/none of the above", never refer to options by letter, no tables in options. **No length cue**: run
  `node .scratch/tools/length-cue.mjs additional-mathematics-o questions/<your folder>/` → `# 0 flagged`.
- **Original wording**, British English ("factorise", "metres"), Zimbabwean contexts for applied problems (a maize
  field near Chinhoyi, a water tank in Masvingo, a kombi on the Harare–Mutare road, a borehole, Lake Kariba,
  Victoria Falls), names Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho, Thandeka. Never copy or closely
  paraphrase past-paper or textbook questions; invent your own numbers.

### Notation and terms between the boards

Items without `applies` are tagged to both syllabi (only for concepts both cover): use neutral wording. Use
`applies: ZIM` / `applies: CAM` when an item depends on one board's notation, depth or rule. Concepts covered by only
one syllabus are tagged to it automatically.

| ZIMSEC | Cambridge 0606 |
|---|---|
| one-to-one mapping, two-to-one mapping | one-one function, many-one function |
| log x (base 10), ln x | lg x (base 10), ln x |
| differentiation from first principles (chords) asked | informal idea only; first principles not required |
| stationary points: maximum, minimum (change of sign or second derivative) | the same, with full justification; points of inflexion excluded |
| integration includes volumes of revolution | plane areas only (between curves too); sec²(ax + b) included |
| kinematics with the equations of motion (constant acceleration) | kinematics with calculus (variable acceleration) |
| no List of formulas printed in the syllabus | List of formulas: quadratic formula, binomial theorem, AP/GP sums, the three Pythagorean identities, sine and cosine rules, triangle area, circle equation (arc length and sector area NOT given; no calculus formulas) |

## Exam-format items (rows owned per assignment below)

The mock papers draw by type STRUCTURED + exact marks + topic subtree, so these must be EXACT. All are
`examStyle: true`, difficulty 3-5 (with hints), the `applies` shown, `secs` = 90 × marks, at least half of the marks
auto-marked (`P.num`, `P.fib`, `P.expr`, `P.mcq`), the rest self-marked with mark-scheme points (`P.proof`,
`P.manual`). Part labels: flat `(a)`, `(b)`, … with optional sub-parts `(i)`, `(ii)` through `P.group`; or `(1)` …
with sub-parts `(a)` … — never labels like `1(a)`.

| Paper item | type | marks | applies | how many |
|---|---|---|---|---|
| ZIMSEC P1 Section A: compulsory short-answer structured question, Pure Mathematics (our reading: four questions of 13 marks; to be confirmed), 2-4 parts | STRUCTURED | 13 | ZIM | 2 per pure writer (12) |
| ZIMSEC P1 Section B: long structured question, Pure Mathematics, candidates answer 4 of 6; 3-5 parts building to a "hence" | STRUCTURED | 12 | ZIM | 3 per pure writer (18) |
| ZIMSEC P2 Section A: compulsory question from Mechanics or Statistics, 2-3 parts | STRUCTURED | 10 | ZIM | 5 mechanics (w4a) + 5 statistics (w4b) |
| ZIMSEC P2 Section B: Mechanics question, answer any 5 of 14 across B and C | STRUCTURED | 12 | ZIM | 8 (w4a) |
| ZIMSEC P2 Section C: Probability and Statistics question | STRUCTURED | 12 | ZIM | 2 (w4a: data, averages, dispersion) + 8 (w4b) |
| 0606 Paper 1 (non-calculator): structured question, exact working by hand, `calculator: false` | STRUCTURED | 8 | CAM | 4 per pure writer (24) |
| 0606 Paper 2 (calculator): structured question, `calculator: true` where needed | STRUCTURED | 10 | CAM | 3 per pure writer (18) |

ZIMSEC items need only concepts ZIMSEC covers; Cambridge items only concepts Cambridge covers. Put the items in
`questions/exam/<prefix>zimsec.json` and `questions/exam/<prefix>cambridge.json`: one extra `concept(...)` module each
(`file: "exam/<prefix>zimsec"`, `keyPrefix: "exam.<prefix>zimsec"`, `applies: ZIM`; the same for Cambridge with
`applies: CAM`), setting `concepts: [...]` on every item to the concepts it actually examines (the first is the
topic it is filed under; all must be in your assignment and covered by the item's syllabus). Spread your items over
your topics.

**Reserved mark values.** No question of any type may be worth **8, 10, 12 or 13** marks unless it is one of the
exam-format STRUCTURED items above (`b.*` throws otherwise). Practice structured items use 5, 6, 7, 9 or 11 marks.

Mock exams (built later, not by writers): ZIMSEC P1 (150 min, 100 marks): Section A 4 × STRUCTURED 13 (pure),
Section B 6 × STRUCTURED 12 (pure), answer any 4. ZIMSEC P2 (150 min, 100 marks): Section A 2 × STRUCTURED 10 from
mechanics + 2 from statistics; Sections B and C 7 × STRUCTURED 12 mechanics + 7 × STRUCTURED 12 statistics, answer any
5. 0606 P1 (120 min, 80 marks): 10 × STRUCTURED 8, no calculator. 0606 P2 (120 min, 80 marks): 8 × STRUCTURED 10.
The fixed marks per question are our convention (real papers vary question by question); a reviewer checks them.

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas (from the concept keys): indices, polynomials, algebra, quadratics, modulus, graphs, functions, logs,
  coordinate, circle, circular, trig, counting, sequences, series, vectors, calculus, probability, statistics,
  distributions, sampling, estimation, mechanics.
- Lesson titles must be unique (slugs come from titles).

## Commands (repo root)

- Build your slices only: `node .scratch/additional-mathematics/build-content.mjs <your-prefix>` (prefix match on file
  names, e.g. `w1a-`).
- Validate: `npm run content:validate -- additional-mathematics-o --strict` → 0 error(s), 0 warning(s). Other writers
  work in the same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- additional-mathematics-o` → fix findings in your files (questions must not
  reuse a lesson worked example's numbers; balanced `$`).
- Length cue: see above.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, the registry, the syllabus files or other writers' files: report
  needed changes (a missing unit, a helper). Never touch `.scratch/english/` or other families.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation and content:check results, anything unfinished or uncertain.

## Proposed split into 8 writer assignments

Roughly equal effort. Concept keys below drop the `amath.` prefix. ZIM = ZIMSEC only, CAM = Cambridge only.
"Pure exam rows" = 2 × ZIM P1 Section A (13), 3 × ZIM P1 Section B (12), 4 × 0606 P1 (8), 3 × 0606 P2 (10).
freePreview: at most one lesson per syllabus topic (ZIMSEC topic 6.x.y, Cambridge topic 1-14); the eleven named below
respect that.

**W1a — prefix `w1a-`** (11 concepts; indices, surds, polynomials, algebra, counting)
indices.indices (ZIM), indices.surds (ZIM), polynomials.operations, polynomials.remainder-factor,
polynomials.cubic-equations, algebra.identities (ZIM), algebra.linear-inequalities (ZIM),
algebra.simultaneous-equations, algebra.substitution (CAM), counting.permutations (CAM), counting.combinations (CAM).
Folders: `indices/ polynomials/ algebra/ counting/`. Exam rows: pure exam rows (ZIM items on indices, surds,
polynomials, identities, simultaneous equations; CAM items on polynomials, simultaneous equations, substitution,
permutations and combinations). freePreview: `polynomials.remainder-factor`.

**W1b — prefix `w1b-`** (11 concepts; quadratics, modulus, cubic and modulus graphs, functions)
quadratics.solving, quadratics.completing-square, quadratics.discriminant, quadratics.inequalities,
modulus.equations (CAM), modulus.inequalities (CAM), graphs.modulus-functions (CAM), graphs.cubic (CAM),
functions.domain-range, functions.composite, functions.inverse.
Folders: `quadratics/ modulus/ graphs/ functions/`. Exam rows: pure exam rows. freePreview: `quadratics.discriminant`,
`functions.domain-range`.

**W2a — prefix `w2a-`** (11 concepts; logarithms, straight lines, circles, circular measure)
logs.laws, logs.equations, logs.graphs, coordinate.lines, coordinate.parallel-perpendicular,
coordinate.linear-law (CAM), circle.equation (CAM), circle.line-tangents (CAM), circle.two-circles (CAM),
circular.radians (CAM), circular.compound-shapes (CAM).
Folders: `logs/ coordinate/ circle/ circular/`. Exam rows: pure exam rows (ZIM items on logarithms and straight
lines). freePreview: `logs.laws`.

**W2b — prefix `w2b-`** (12 concepts; trigonometry, sequences and series)
trig.six-ratios, trig.graphs, trig.identities, trig.equations, trig.equations-identities, sequences.behaviour (ZIM),
series.sigma-notation (ZIM), series.arithmetic, series.geometric, series.sum-to-infinity,
series.binomial-expansion (CAM), series.binomial-terms (CAM).
Folders: `trig/ sequences/ series/`. Exam rows: pure exam rows. freePreview: `trig.six-ratios`, `series.arithmetic`.

**W3a — prefix `w3a-`** (10 concepts; differentiation)
calculus.derivative-idea, calculus.differentiating-powers, calculus.chain-rule, calculus.product-quotient,
calculus.trig-exp-log, calculus.tangents-normals, calculus.stationary-points, calculus.max-min-problems (CAM),
calculus.rates-of-change, calculus.small-increments.
Folders: `calculus/` (these ten files only). Exam rows: pure exam rows. freePreview: `calculus.derivative-idea`.

**W3b — prefix `w3b-`** (8 concepts; integration, calculus kinematics, vectors)
calculus.integration-basics, calculus.integration-functions, calculus.definite-integrals-area,
calculus.volumes-of-revolution (ZIM), calculus.kinematics (CAM), vectors.notation-magnitude (CAM),
vectors.geometry (CAM), vectors.velocity (CAM).
Folders: `calculus/` (these five files only), `vectors/`. Exam rows: pure exam rows (ZIM items on integration, areas
and volumes; CAM items on integration, areas, kinematics and vectors). freePreview: `vectors.notation-magnitude`.

**W4a — prefix `w4a-`** (13 concepts; mechanics, data and descriptive statistics)
mechanics.kinematics-graphs, mechanics.constant-acceleration, mechanics.forces-resultants, mechanics.equilibrium,
mechanics.friction, mechanics.newtons-laws, mechanics.newtons-laws-planes, mechanics.work-energy, mechanics.power,
statistics.data-types, statistics.data-presentation, statistics.central-tendency, statistics.dispersion (all ZIM).
Folders: `mechanics/ statistics/`. Exam rows: 5 × ZIM P2 Section A (10, mechanics), 8 × ZIM P2 Section B (12,
mechanics), 2 × ZIM P2 Section C (12, averages and dispersion of grouped data). freePreview:
`mechanics.kinematics-graphs`, `statistics.central-tendency`.

**W4b — prefix `w4b-`** (13 concepts; probability, distributions, sampling, estimation)
probability.set-language, probability.approaches, probability.addition-product-rules, probability.conditional,
distributions.discrete-random-variables, distributions.binomial, distributions.continuous-random-variables,
distributions.normal, distributions.normal-parameters, sampling.methods, sampling.sample-mean, estimation.point,
estimation.confidence-intervals (all ZIM).
Folders: `probability/ distributions/ sampling/ estimation/`. Exam rows: 5 × ZIM P2 Section A (10, statistics),
8 × ZIM P2 Section C (12). freePreview: `probability.set-language`.

freePreview lessons (one per syllabus topic at most): polynomials.remainder-factor (ZIMSEC 6.1.2 / Cambridge 3),
quadratics.discriminant (6.1.7 / 2), functions.domain-range (6.1.6 / 1), logs.laws (6.1.8 / 6), trig.six-ratios
(6.1.9 / 10), series.arithmetic (6.1.4 / 12), calculus.derivative-idea (6.1.10 / 14), vectors.notation-magnitude
(Cambridge 13 only), mechanics.kinematics-graphs (ZIMSEC 6.3.1 only), statistics.central-tendency (6.2.3 only),
probability.set-language (6.2.1 only).
