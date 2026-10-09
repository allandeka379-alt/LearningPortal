# mathematics-a — writing brief for content agents

You write ORIGINAL study content for the A-Level Mathematics family. One family serves four syllabi:

| Selector | Syllabus | File |
|---|---|---|
| `ZP` | ZIMSEC A-Level Pure Mathematics, Forms 5-6, 2015-2022 | `content/syllabi/zimsec/a-level/pure-mathematics/2015-2022.json` |
| `ZS` | ZIMSEC A-Level Statistics, Forms 5-6, 2015-2022 | `content/syllabi/zimsec/a-level/statistics/2015-2022.json` |
| `ZM` | ZIMSEC A-Level Mechanics (the Ministry's "Mechanical Mathematics"), Forms 5-6, 2015-2022 | `content/syllabi/zimsec/a-level/mechanics/2015-2022.json` |
| `CAM` | Cambridge International AS & A Level Mathematics 9709, 2026-2027 (Papers 1-6, AS and A Level routes) | `content/syllabi/cambridge/a-level/mathematics/2026-2027.json` |

**ZIMSEC is the main product**: write for a Zimbabwean Form 5-6 student first, with Cambridge depth notes where the
boards differ. Content is DEV preview only; a human reviews it later (§41), but write it as if it ships tomorrow.
Concept prefix `amaths` (`math` is mathematics-o, `amath` is additional-mathematics-o).

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec, §7.4 the nested
  STRUCTURED example), §8 (flashcards), §11 (quality bar). `docs/CONTENT_AUTHORING.md` §3 (KaTeX: inline `$…$`,
  display `$$` on its own lines, `\$` for money), §4 (blocks), tables.
- `content/concepts/mathematics-a.json` (110 concepts). Every description starts with WHO examines it: "ZIMSEC Pure
  (F5)", "ZIMSEC Statistics (F6)", "ZIMSEC Mechanics (F5)", "Cambridge P1 (AS & A Level)", "Cambridge P2 (AS only)",
  "Cambridge P3 (A Level only)", "Cambridge P6 (A Level only)"; "ZIMSEC only" / "Cambridge only" when one board alone
  examines it. The description says exactly what is in and out, and which parts are one board's only.
- Your syllabus files (which node covers each concept, the form of each ZIMSEC objective, node `components` on the
  Cambridge tree, exclusions and conventions in `notes`). Cambridge Papers 2 and 3 share one section ("2-3"): node
  components `["2","3"]` are in both papers, `["3"]` A Level only, `["2"]` (the trapezium rule) AS only.
- `.scratch/mathematics-a/lib.mjs`: question builders (`concept`, `b.mcq/tf/num/calc/expr/short/fib/match/
  manualShort/proof/struct/card`, parts `P.*` including `P.group` for sub-parts and `P.proof` for "show that") and the
  **checked maths helpers**: `t` (String.raw for LaTeX), `chk`, `same`, `round`, `rnd`, `sf`, `sfStr`, `dpStr`, `F`
  and `Fr` (exact fractions with `.tex`), `simplifySurd`, `poly` (eval/add/mul/div/deriv/rationalRoots/str/tex),
  `quad`, `root` (bisection), `lg`, `ln`, `logb`, `rad`, `deg`, `sec`, `cosec`, `cot`, `solveTrig`, `fact`, `nPr`,
  `nCr`, `binomialCoeffs`, `ap`, `gp`, `vec` (2-D), `v3` (3-D: dot, cross, angle, `lines` → parallel/intersect/skew,
  `foot`, `planeDist`, `tex`, `ijk`), `mat` (mul, det, adj, inv, pow, tex), `cx` (complex: add, mul, div, conj, mod,
  arg, polar, pow, roots, tex), `deriv`, `integrate` (Simpson), `checkDeriv`, `checkAntideriv`, `iterate`,
  `newtonRaphson`, `trapezium`; statistics `mean`, `median`, `quartiles`, `variance`, `sd`, `s2`, `freqStats`,
  `grouped`, `est` (unbiased estimates from Σx, Σx²), `biv` (Sxx, Sxy, regression lines, r), `movingAverages`,
  `chi2Stat`, `expectedTable`; distributions **computed, never quoted from printed tables**: `binom`, `poisson`, `geo`,
  `expo`, `Phi`, `invPhi`, `phiTable`, `zCrit`, `normalProb`, `ciMean`, `ciProp`, `tCdf`, `tCrit`, `tTable`,
  `chi2Cdf`, `chi2Crit`, `chi2Table`, `criticalRegion` (discrete one-tailed critical regions); mechanics `suvat`,
  `resultant`; text `table`, `steps`, `paras`, `money`, `forms`. `lib.mjs` checks its own table values on import.
- Style examples: `.scratch/english/slices/a1-nouns-pronouns.mjs` (slice style: every MCQ option has a rationale,
  explanations teach, hints from difficulty 3), `.scratch/physics/slices/a2-motion.mjs` (numeric items with units and
  LaTeX through `t`), and the lessons `content/subjects/mathematics-o/lessons/algebra/quadratics-completing-the-square-and-formula.md`
  and `content/subjects/mathematics-o/lessons/calculus/differentiation.md` (front matter, blocks, LaTeX style). The
  additional-mathematics-o kit (`.scratch/additional-mathematics/`) is the O-Level sibling of this one.

## What to produce per concept

1. **One lesson** `content/subjects/mathematics-a/lessons/<area>/<name>.md` (concept `amaths.<area>.<name>` →
   `lessons/<area>/<name>.md`, key `<area>.<name>`; e.g. `amaths.diff.product-quotient` → `lessons/diff/product-quotient.md`,
   key `diff.product-quotient`), **900-1,600 words** (display maths and tables do not count), template of §6:
   `## Introduction` (where the idea is used, which papers examine it), `## Key definitions` (`:::definition`,
   `:::formula{name="…"}` — say whether Cambridge's formula list MF19 gives it), explanation sections, **at least three
   worked examples** (`:::worked-solution[Example n: …]`, numbered steps, every value shown, routine to exam standard;
   one a typical "show that" or multi-step exam question), `## Common mistakes` (`:::mistake{title="…"}`),
   `## Exam tips` (`:::exam-tip`; command words *find, show that, hence, sketch, solve, prove, determine, explain*;
   accuracy), `## Summary` (one `:::summary`). Front matter: key, title (unique; the concept name is a good start),
   summary, concepts ([the concept]), estimatedMinutes (honest), level "core"; `freePreview: true` ONLY on the lessons
   named in your assignment. No `objectives`. Where the boards differ in depth or notation, add a short
   `:::keyfact{title="ZIMSEC and Cambridge"}` (e.g. "Cambridge: A Level only (Paper 3)"; "ZIMSEC also asks for points
   of inflexion"). Lessons for "ZIMSEC only" concepts need no Cambridge note.
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/mathematics-a/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: about 30% MCQ (four options, 1 mark), 35-45% answers typed by the student (`b.num` / `b.calc`
     for numbers; `b.fib` with number blanks for coefficients, constants and several roots; `b.expr` for exact or
     algebraic answers), some true/false and matching, 1-3 self-marked `b.proof` / `manualShort` items where the
     concept has proofs, "show that", sketches or interpretations, and 2-4 **practice structured** items (`b.struct`,
     difficulty 3-5, `examStyle: true`, marks **4, 5, 12, 13, 14 or 15** — see reserved marks) built like real exam
     questions ("(a) show that … (b) hence find …").
   - Difficulty spread: ~20% d1-2, ~50% d2-3, ~30% d4-5 (A-Level standard: d3 is a routine A-Level question).
     `daily: true` only on 2-3 auto-marked items of difficulty 2-3 per concept.
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FORMULA, CONCEPT, FACT; LaTeX allowed.
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION. `calculator`: `false` on items that are
     done by hand, `true` when a calculator is needed. Cambridge allows a scientific calculator in every paper; ZIMSEC
     does not print its rule.

## Maths quality rules (non-negotiable)

- **Every answer is computed in code.** Compute every value with the lib helpers or plain JS, pass the EXACT value to
  `b.num` / `b.calc` (the builder rounds for display and sets the tolerance), and tie numbers you also write in LaTeX
  to the computation with `chk(...)` / `same(...)`. Check derivatives and integrals with `checkDeriv` /
  `checkAntideriv`, roots by substitution, trig solution lists with `solveTrig`, matrix inverses by multiplying back,
  complex arithmetic with `cx`, line intersections with `v3.lines`. For lessons, compute worked examples in a script
  `.scratch/mathematics-a/tables/<prefix><name>.mjs` (NEVER in `slices/`: the build imports every `.mjs` there), print
  the numbers and LaTeX, and paste them. Re-derive every worked example from its data before you finish.
- **Statistical tables are computed, not quoted.** Normal: `normalProb(mu, sigma, lo, hi)` gives the exact value and a
  tolerance that also accepts the 4-figure-table answer (z to 2 d.p.); `invPhi`, `zCrit(95)` = 1.96, `zCrit(99)` =
  2.576. Binomial, Poisson and geometric probabilities from `binom` / `poisson` / `geo` (cumulative sums, never a
  remembered table). t and χ² critical values from `tTable(ν, p)` / `chi2Table(ν, α)` (3 d.p., what printed tables
  show). Discrete critical regions from `criticalRegion`. State the table convention in explanations ("from tables,
  Φ(1.25) = 0.8944").
- **Accuracy and tolerance.** Default: integers exact; other answers "correct to 3 significant figures" (half a unit
  in the 3rd s.f. tolerance; exact fractions typed as fractions score); angles in degrees to 1 d.p. (`unit: "°"`). Use
  `dp` for decimal places and `sf` for other significant figures; probabilities usually 3 s.f. (ZIMSEC often 4 d.p.:
  say which in the stem). **Say the accuracy in the stem.** The builder throws when a value sits on a rounding
  boundary: change the data. Add 1-3 `wrong` values that are real errors (divided by n instead of n − 1, forgot the
  continuity correction, used the wrong tail, degrees instead of radians, sign slip) and explain them.
- **Exact and algebraic answers.** Prefer `b.fib` with `input: "number"` blanks for the constants of a required form
  ("Express in the form $R\cos(\theta - \alpha)$: $R =$ {{blank:R}}, $\alpha =$ {{blank:a}} (degrees, 1 d.p.)" — blanks
  never inside `$…$`), or `b.num` for one value. Use `b.expr` for genuinely algebraic answers and list every equivalent
  form a student may type; `forms()` adds √/sqrt, π/pi, superscripts, `*` and `ln(x)`/`lnx` variants.
- **Proofs and "show that".** Never auto-mark a given result. Use `b.proof` / `P.proof` with mark-scheme points (one
  line each: "M1 uses cos 2A = 1 − 2 sin²A", "A1 reaches the given result with no errors") and a complete model proof,
  one step per line in display maths. Induction proofs, group axioms, de Moivre, derivations of formulae
  (suvat, projectile range, Newton–Raphson, trapezium rule) and interpretations ("explain why the sampling method is
  unsatisfactory", "state an assumption of the model") are self-marked too.
- **Graphs and diagrams are described, never drawn** (no images). Describe graphs precisely (shape, intercepts,
  turning points, asymptotes, behaviour) and give tables of values (`table(...)`). Sketch questions become auto-marked
  features (intercepts, coordinates, asymptotes, number of roots) and/or a self-marked "describe the sketch". Force
  diagrams, Argand diagrams, histograms, box plots and 3-D figures are described in words or Markdown tables with every
  value needed.
- **Notation.** All maths in LaTeX: `$\frac{\mathrm{d}y}{\mathrm{d}x}$` or `$\frac{dy}{dx}$` (consistent within a
  file), `$\ln x$`, `$\mathrm{e}^{x}$`, `$\mathrm{i}$` for $\sqrt{-1}$, `$z^{*}$`, `$\arg z$`, `$|z|$`,
  vectors `$\overrightarrow{AB}$`, bold `$\mathbf{a}$`, `$\mathbf{i}, \mathbf{j}, \mathbf{k}$`, column vectors with
  `v3.tex`, matrices with `mat.tex`, `$\mathrm{B}(n, p)$`, `$\mathrm{Po}(\lambda)$`, `$\mathrm{Geo}(p)$`,
  `$\mathrm{N}(\mu, \sigma^2)$`, `$\mathrm{E}(X)$`, `$\mathrm{Var}(X)$`, `$H_0$`, `$H_1$`, `$\bar{x}$`, `$\chi^2$`.
  Units after the maths (`$12.5$ m s$^{-1}$`); radians in calculus always. Money `US\$` (`money(n)`). No LaTeX in FIB
  blanks, `unitHint` or `answerPrefix`.
- **Mechanics.** Cambridge Paper 4 uses **g = 10 m s⁻²** and particles only, without vector notation. ZIMSEC items
  state g ("Take $g = 9.8$ m s$^{-2}$" or 10). Pass the same g to the computation. Units on every numeric answer
  (`"m/s"`, `"m/s²"`, `"N"`, `"J"`, `"W"`, `"kW"`, `"N m"`, `"N s"`, `"rad/s"`). Strings light and inextensible,
  pulleys smooth, planes smooth or rough — stated.
- **MCQs:** exactly one defensible answer, four options, distractors from real errors (rationale for each), never
  "all/none of the above", never refer to options by letter, no tables in options. **No length cue**: run
  `node .scratch/tools/length-cue.mjs mathematics-a questions/<your folder>/` → `# 0 flagged`.
- **Original wording**, British English, Zimbabwean contexts for applied problems (tobacco auction floors in Harare,
  maize yields in Mashonaland, a kombi on the Harare–Bulawayo road, Kariba water levels, Hwange coal trucks, Victoria
  Falls bungee jump, a borehole pump in Masvingo, ZESA load figures — invented numbers, never "real statistics"),
  names Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho, Thandeka. Never copy or closely paraphrase past-paper or
  textbook questions.

### Which syllabus an item goes to (`applies`)

Items without `applies` are tagged to every syllabus covering their concept. Add `applies` when an item depends on
one board's depth, notation or rule:

| Use | When |
|---|---|
| `applies: ZP` | ZIMSEC-only parts of a shared pure concept: points of inflexion, formal first principles, improper partial fractions, small-angle approximations, injective/surjective/bijective, y = \|f(x)\| for non-linear f, perpendicular distance from a point to a line, Cartesian equations of a 3-D line, cubic/rational inequalities |
| `applies: ZS` | ZIMSEC-only parts of a shared statistics concept: geometric variance, Bernoulli, discrete uniform, named sampling techniques (stratified, quota …), the general addition rule, the mode of a pdf |
| `applies: ZM` | mechanics items using g = 9.8, vector notation, impulse, rigid bodies, or ZIMSEC-only graphs (acceleration–time) |
| `applies: CAM` | Cambridge-only parts: Poisson hypothesis tests, change-of-base exclusions that matter, "A Level only" emphasis where an item would mislead a ZIMSEC student |
| `applies: ZIM` | ZIMSEC conventions that apply to all three ZIMSEC syllabi |

| ZIMSEC | Cambridge 9709 |
|---|---|
| one-to-one, injective, surjective, bijective, co-domain | one-one function (no co-domain terms) |
| differentiation from first principles is examined | informal limit of chords only |
| points of inflexion examined | excluded |
| partial fractions include improper fractions | proper fractions only |
| geometric distribution: mean, variance, sd | expectation only |
| cumulative distribution functions, rectangular and exponential distributions, t and χ² tests, regression, time series | not in 9709 |
| Poisson: no approximations named | Poisson ≈ binomial (n > 50, np < 5); normal ≈ Poisson (λ > 15) |
| mechanics: rigid bodies, moments, vectors, projectiles, impulse, centres of mass, elasticity, circular motion, variable force, SHM; g stated | particles only, no vector notation, g = 10 |
| no formula list printed in the syllabus | MF19 list of formulae and statistical tables supplied |

## Exam-format items (rows owned per assignment below)

The mock papers draw by type STRUCTURED + exact marks + topic subtree + `examStyleOnly`, so these must be EXACT. All
are `b.struct`, `examStyle: true`, difficulty 3-5 (with hints), `applies` = exactly the ONE syllabus shown, `secs` =
90 × marks (Cambridge: 88 × marks is the real pace; 90 is fine), at least half of the marks auto-marked (`P.num`,
`P.fib`, `P.expr`, `P.mcq`), the rest self-marked with mark-scheme points (`P.proof`, `P.manual`). Part labels:
`(a)`, `(b)`, … with optional sub-parts `(i)`, `(ii)` one level deep through `P.group`; or `(1)`, `(2)`, … with
sub-parts `(a)`, `(b)` — never labels like `1(a)` (the validator rejects them). Every concept an item examines must
be in YOUR assignment and covered by the item's syllabus (and, for Cambridge, by a node of the paper named).

| Row | Paper item | marks | applies | content allowed | total | owners (count) |
|---|---|---|---|---|---|---|
| C1s | 9709 Paper 1, short structured question (2-3 parts) | 6 | CAM | Paper 1 nodes (1.1-1.8) | 8 | W1a 3, W1b 3, W2a 2 |
| C1l | 9709 Paper 1, long structured question (3-5 parts) | 9 | CAM | Paper 1 nodes | 8 | W1a 3, W1b 3, W2a 2 |
| C2s | 9709 Paper 2 (AS only), structured question | 7 | CAM | nodes with component "2" only (no partial fractions, rational binomial, tan⁻¹, 1/(x²+a²), parts, substitution, vectors, DEs, complex) | 6 | W1a 2, W1b 1, W2a 2, W2b 1 |
| C2l | 9709 Paper 2, long structured question | 11 | CAM | as C2s | 3 | W1a 1, W1b 1, W2a 1 |
| C3s | 9709 Paper 3 (A Level), structured question | 6 | CAM | nodes with component "3" | 8 | W1a 1, W1b 1, W2a 2, W2b 3, W4a 1 |
| C3l | 9709 Paper 3, long structured question | 9 | CAM | nodes with component "3" | 8 | W1b 1, W2a 3, W2b 2, W4a 2 |
| C4s / C4l | 9709 Paper 4 Mechanics, g = 10 | 6 / 8 | CAM | 4.1-4.5 | 4 / 5 | W4a |
| C5s / C5l | 9709 Paper 5 Probability & Statistics 1 | 6 / 8 | CAM | 5.1-5.5 | 4 / 5 | W3a |
| C6s / C6l | 9709 Paper 6 Probability & Statistics 2 | 6 / 8 | CAM | 6.1-6.5 | 4 / 5 | W3b |
| ZP1 | ZIMSEC Pure Paper 1, compulsory structured question | 10 | ZP | any ZP node | 16 | W1a 4, W1b 4, W2a 4, W2b 3, W4a 1 |
| ZP2A | ZIMSEC Pure Paper 2 Section A, compulsory question | 8 | ZP | any ZP node | 6 | W1a 1, W1b 1, W2a 2, W2b 2 |
| ZP2B | ZIMSEC Pure Paper 2 Section B, long question (choice of 5 of 7), 3-5 parts building to a "hence" | 16 | ZP | any ZP node | 10 | W1a 2, W1b 2, W2a 2, W2b 3, W4b 1 |
| ZS1 | ZIMSEC Statistics Paper 1, compulsory structured question | 10 | ZS | any ZS node | 16 | W3a 7, W3b 6, W4b 3 |
| ZS2A | ZIMSEC Statistics Paper 2 Section A, compulsory question | 8 | ZS | any ZS node | 6 | W3a 2, W3b 2, W4b 2 |
| ZS2B | ZIMSEC Statistics Paper 2 Section B, long question (5 of 7) | 16 | ZS | any ZS node | 10 | W3a 3, W3b 4, W4b 3 |
| ZM1a | ZIMSEC Mechanics Paper 1, short structured question | 7 | ZM | any ZM node | 12 | W4a 5, W4b 7 |
| ZM1b | ZIMSEC Mechanics Paper 1, short structured question | 6 | ZM | any ZM node | 6 | W4a 3, W4b 3 |
| ZM2 | ZIMSEC Mechanics Paper 2, long structured question (any 5 of 8) | 20 | ZM | any ZM node | 10 | W4a 4, W4b 6 |

Put the items in `questions/exam/<prefix>cambridge.json`, `questions/exam/<prefix>zimsec-pure.json`,
`questions/exam/<prefix>zimsec-statistics.json` and `questions/exam/<prefix>zimsec-mechanics.json` (only the files
you need): one extra `concept(...)` module each (`file: "exam/<prefix>cambridge"`, `keyPrefix:
"exam.<prefix>cambridge"`, `applies: CAM`; likewise ZP, ZS, ZM), setting `concepts: [...]` on every item (the first
is the topic it is filed under). Spread your items over your topics, with ZIMSEC items emphasising ZIMSEC-only
content where you own it.

**Reserved mark values.** No STRUCTURED question and no `examStyle` question may be worth **6, 7, 8, 9, 10, 11, 16
or 20** marks unless it is one of the exam-format items above (`b.*` throws otherwise; it also throws if an
exam-format item names more than one syllabus). Practice structured items use 4, 5, 12, 13, 14 or 15 marks.
Non-exam-style single items (a 6-mark proof, a 7-mark calculation) are allowed.

**Mock exams** (built later, not by writers; "in the style of", never official): 9709 P1 (110 min, 75 marks): 5 × C1s
+ 5 × C1l. P2 (75 min, 50): 4 × C2s + 2 × C2l. P3 (110 min, 75): 5 × C3s + 5 × C3l. P4/P5/P6 (75 min, 50): 3 × 6 +
4 × 8. ZIMSEC Pure and Statistics P1 (180 min, 120): 12 × 10. P2 (180 min, 120): Section A 5 × 8, Section B 7 × 16,
answer any 5. ZIMSEC Mechanics P1 (180 min, 100): 10 × 7 + 5 × 6; P2 (180 min, 100): 8 × 20, answer any 5. The ZIMSEC
Pure Mathematics paper structure is NOT printed in its syllabus: its mocks assume the Statistics pattern (owner to
confirm). The fixed marks per question are our convention (real papers vary).

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas (from the concept keys): algebra, quadratics, matrices, proof, groups, functions, graphs, coordinate, trig,
  series, diff, integ, numerical, vectors, de, complex, data, counting, probability, discrete, normal, continuous, rv,
  sampling, estimation, inference, bivariate, timeseries, forces, kinematics, newton, momentum, energy, projectiles,
  com, elasticity, circular, variable, shm.
- Lesson titles must be unique across the family (slugs come from titles).

## Commands (repo root)

- Build your slices only: `node .scratch/mathematics-a/build-content.mjs <your-prefix>` (prefix match on file names,
  e.g. `w1a-`).
- Validate: `npm run content:validate -- mathematics-a --strict` → 0 error(s), 0 warning(s). Other writers work in the
  same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- mathematics-a` → fix findings in your files.
- Length cue: see above.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, concepts.mjs, the registry, the syllabus files or other writers'
  files: report needed changes (a missing unit, a helper). Never touch other families or `.scratch/tools/`.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items per row, validation and content:check results, anything unfinished or uncertain.

## Proposed split into 8 writer assignments

Concept keys drop the `amaths.` prefix. (Z) = ZIMSEC only, (C) = Cambridge only. freePreview: at most one lesson per
syllabus topic (ZIMSEC 6.x of each subject; Cambridge 1.1-6.5); the lessons named below respect that.

**W1a — prefix `w1a-`** (14; algebra, quadratics, functions, lines)
algebra.indices-variation (Z), algebra.polynomials, algebra.partial-fractions, algebra.modulus,
quadratics.completing-square-discriminant, quadratics.equations-inequalities, functions.domain-range,
functions.composite-inverse, functions.transformations, functions.exponential-log, functions.logarithms,
functions.linear-law, graphs.curve-sketching (Z), coordinate.straight-lines.
Folders: `algebra/ quadratics/ functions/ graphs/ coordinate/` (straight-lines only). Exam rows: C1s 3, C1l 3, C2s 2,
C2l 1, C3s 1 (partial fractions), ZP1 4, ZP2A 1, ZP2B 2. freePreview: `quadratics.completing-square-discriminant`,
`coordinate.straight-lines`.

**W1b — prefix `w1b-`** (14; circles, trigonometry, series, induction)
coordinate.circles, trig.radians-arcs-sectors, trig.graphs-exact-values, trig.basic-identities-equations,
trig.reciprocal-functions, trig.compound-double-angle, trig.harmonic-form, series.arithmetic, series.geometric,
series.binomial-positive, series.binomial-rational, series.standard-sums-differences (Z), series.maclaurin-taylor (Z),
proof.induction (Z).
Folders: `coordinate/` (circles only), `trig/ series/ proof/`. Exam rows: C1s 3, C1l 3, C2s 1, C2l 1, C3s 1, C3l 1
(rational binomial / trig), ZP1 4, ZP2A 1, ZP2B 2. freePreview: `trig.radians-arcs-sectors`, `series.arithmetic`.

**W2a — prefix `w2a-`** (14; differentiation and integration)
diff.first-principles, diff.powers-chain, diff.applications, diff.stationary-points, diff.exp-log-trig,
diff.product-quotient, diff.implicit-parametric, integ.reverse-powers, integ.definite-area, integ.volumes,
integ.standard-functions, integ.recognition-substitution, integ.partial-fractions, integ.by-parts.
Folders: `diff/ integ/`. Exam rows: C1s 2, C1l 2, C2s 2, C2l 1, C3s 2, C3l 3, ZP1 4, ZP2A 2, ZP2B 2.
freePreview: `diff.first-principles`.

**W2b — prefix `w2b-`** (12; differential equations, numerical methods, complex numbers, matrices, groups)
de.separable, numerical.locating-roots, numerical.newton-raphson (Z), numerical.trapezium-errors, complex.cartesian,
complex.argand-polar, complex.polynomial-equations, complex.loci, complex.de-moivre (Z),
matrices.operations-inverses (Z), matrices.transformations (Z), groups.binary-operations-groups (Z).
Folders: `de/ numerical/ complex/ matrices/ groups/`. Exam rows: C2s 1 (iteration / trapezium), C3s 3, C3l 2, ZP1 3,
ZP2A 2, ZP2B 3. freePreview: `complex.cartesian`, `numerical.locating-roots`.

**W3a — prefix `w3a-`** (14; data, counting, probability, discrete distributions, normal distribution)
data.diagrams, data.histograms-cumulative, data.location-spread, data.mean-sd, counting.permutations,
counting.combinations, probability.events-rules, probability.conditional, probability.bayes (Z),
discrete.random-variables, discrete.binomial, discrete.geometric, normal.probabilities, normal.inverse-parameters.
Folders: `data/ counting/ probability/ discrete/` (these three files only), `normal/` (these two). Exam rows: C5s 4,
C5l 5, ZS1 7, ZS2A 2, ZS2B 3. freePreview: `data.location-spread`, `probability.events-rules`.

**W3b — prefix `w3b-`** (14; Poisson, approximations, linear combinations, continuous variables, sampling,
estimation, hypothesis tests)
normal.binomial-approximation, discrete.poisson, discrete.poisson-approximations (C), rv.linear-combinations,
continuous.pdf, continuous.cdf (Z), sampling.methods, sampling.sample-mean-clt, estimation.unbiased,
estimation.confidence-intervals, inference.hypothesis-basics, inference.binomial-poisson-tests,
inference.normal-mean-test, inference.errors.
Folders: `normal/` (binomial-approximation), `discrete/` (poisson files), `rv/ continuous/` (pdf, cdf), `sampling/
estimation/ inference/` (these four files). Exam rows: C6s 4, C6l 5, ZS1 6, ZS2A 2, ZS2B 4. freePreview:
`discrete.poisson` (Cambridge 6.1), `inference.hypothesis-basics` (ZIMSEC 6.8, Cambridge 6.5).

**W4a — prefix `w4a-`** (14; mechanics shared with Cambridge, vectors)
forces.equilibrium, forces.friction, kinematics.graphs, kinematics.constant-acceleration, kinematics.calculus,
newton.laws, newton.connected-particles, momentum.collisions, energy.work-energy, energy.power, vectors.basics,
vectors.scalar-product, vectors.lines, kinematics.vector-motion (Z).
Folders: `forces/ kinematics/ newton/ momentum/ energy/` (these files), `vectors/` (basics, scalar-product, lines).
Exam rows: C4s 4, C4l 5, C3s 1, C3l 2 (vectors), ZP1 1 (vectors), ZM1a 5, ZM1b 3, ZM2 4. freePreview:
`kinematics.constant-acceleration`, `forces.equilibrium`.

**W4b — prefix `w4b-`** (14; ZIMSEC-only mechanics, planes, ZIMSEC-only statistics)
forces.moments-rigid-body (Z), projectiles.motion (Z), com.centre-of-mass (Z), elasticity.hookes-law-energy (Z),
circular.motion (Z), variable.force (Z), shm.motion (Z), vectors.cross-product-planes (Z), vectors.lines-planes (Z),
continuous.rectangular-exponential (Z), inference.t-distribution (Z), inference.chi-squared (Z),
bivariate.regression-correlation (Z), timeseries.moving-averages (Z).
Folders: `forces/` (moments-rigid-body), `projectiles/ com/ elasticity/ circular/ variable/ shm/`, `vectors/`
(the two plane files), `continuous/` (rectangular-exponential), `inference/` (t, chi-squared), `bivariate/
timeseries/`. Exam rows: ZP2B 1 (lines and planes), ZS1 3, ZS2A 2, ZS2B 3, ZM1a 7, ZM1b 3, ZM2 6. freePreview:
`projectiles.motion` (ZIMSEC Mechanics 6.5), `bivariate.regression-correlation` (ZIMSEC Statistics 6.9).

freePreview lessons (final list, at most one per syllabus topic): quadratics.completing-square-discriminant (ZP 6.1 /
C 1.1), coordinate.straight-lines (ZP 6.2 / C 1.3), trig.radians-arcs-sectors (ZP 6.4 / C 1.4), series.arithmetic
(ZP 6.3 / C 1.6), diff.first-principles (ZP 6.5 / C 1.7), complex.cartesian (ZP 6.7 / C 3.9),
numerical.locating-roots (ZP 6.6 / C 2.6-3.6), data.location-spread (ZS 6.1 / C 5.1), probability.events-rules
(ZS 6.3 / C 5.3), discrete.poisson (ZS 6.4 / C 6.1), inference.hypothesis-basics (ZS 6.8 / C 6.5),
kinematics.constant-acceleration (ZM 6.3 / C 4.2), forces.equilibrium (ZM 6.2 / C 4.1), projectiles.motion (ZM 6.5),
bivariate.regression-correlation (ZS 6.9).
