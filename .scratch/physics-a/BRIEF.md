# physics-a — writing brief for content agents

You write ORIGINAL study content for the A-Level Physics family: ZIMSEC A-Level Physics (Forms 5-6, 2015-2022) — the
main product — and Cambridge International AS & A Level Physics 9702 (2025-2027). Content is DEV preview only; a human
reviews it later (§41), but write it as if it ships tomorrow. **Physical correctness is the first rule**: a wrong
definition, sign, unit or number is worse than a missing one. This is A-Level: derivations, multi-step calculations,
graphs, uncertainties and practical skills are expected, at the depth of the deeper board.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, **tables**, LaTeX).
- `content/concepts/physics-a.json` (99 concepts). Each description starts with its coverage label — "Both boards
  (ZIMSEC Form 5; Cambridge AS Level).", "Cambridge only (A Level only).", "ZIMSEC only (Form 6)." — and says exactly
  what is IN and what is OUT; "ZIMSEC detail" / "Cambridge detail" marks content only one board names, and "to be
  confirmed" marks ZIMSEC scope we could not check. Stay inside it; when two concepts touch, give the other one a
  sentence and move on.
- The two syllabus files and their `notes`:
  - `content/syllabi/zimsec/a-level/physics/2015-2022.json`: **built from the Ministry teacher's guide, not the
    syllabus** (which could not be obtained). Seven topic areas (1 General Physics … 7 Modern Physics) with sub-topics
    in Form 5 or Form 6, plus our node P (practical skills). Objectives are generic. The assessment (Papers 1-4) is
    ASSUMED from the ZIMSEC Forms 5-6 Biology and Chemistry syllabi of the same series. ZIMSEC covers 89 concepts.
  - `content/syllabi/cambridge/a-level/physics/2025-2027.json`: section **AS** = topics 1-11 (Papers 1 and 2),
    section **A** = topics 12-25 (A Level only, Paper 4), section **PS** = P3 (Paper 3) and P5 (Paper 5); objectives
    carry the printed learning-outcome codes such as 20.3.3. Cambridge covers 85 concepts; 75 are shared.
- **AS versus A Level (Cambridge).** Every Cambridge concept is labelled "Cambridge AS Level" or "Cambridge A Level
  only". AS items feed Papers 1 and 2; A Level items feed Paper 4. Circular motion, gravitation, oscillations, fields,
  capacitance, thermal physics and gases are A Level only for Cambridge but Form 5 or Form 6 for ZIMSEC: write once.
- **ZIMSEC-only concepts** (electronics, communication, phases of matter, fluid flow, conduction, convection and
  radiation, e/m and Millikan, transformers): write them at standard A-Level depth inside the concept description;
  do not invent ZIMSEC-specific requirements, syllabus wording or paper formats.
- The O-level family `content/subjects/physics-o/` shows the house style (lesson structure, tone, LaTeX, question mix).
  Go well beyond it in depth.
- `.scratch/physics-a/lib.mjs`: builders (`concept`, `b.mcq/tf/short/fib/match/num/calc/manualShort/ext/struct/card`,
  `P.*` parts including `P.group` for sub-parts), selectors `ZIM`, `CAM`, `t` for LaTeX, `EXAM` plans, `checkExam`,
  and the **physics helpers**: `DATA` (the Cambridge data-sheet constants: g 9.81, c 3.00e8, e 1.60e-19, u, m_p, m_e,
  N_A, R, k, G, ε₀, 1/4πε₀ = 8.99e9, h 6.63e-34, σ), `toK`; standard form `sciPlain` (model answers and plain options:
  "1.60 × 10^-19") and `sciTex` (LaTeX: `$${sciTex(x)}\ \text{J}$`); `chk`, `rnd`, `sf`, `sfStr`, `dpStr`, `table`;
  uncertainties `mean`, `range`, `halfRange`, `pctUnc`, `absFromPct`, `pctDifference`, `uncSum`, `fracUnc`; lines
  `linFit`, `gradient`, `interceptThrough`, `worstLines` (steepest/shallowest line through all error bars), `lineUnc`,
  `lg`, `ln`; formulae `seriesR`, `parallelR`, `seriesC`, `parallelC`, `potentialDivider`, `eVtoJ`, `JtoeV`,
  `photonEnergy`, `deBroglie`, `decayLambda`, `decayAt`, `capDischarge`, `rms`, `gField`, `gPotential`,
  `coulombForce`, `ePotential`, `dopplerSource`, `malus`, `reflectionCoeff`, `attenuate`, `luminosity`,
  `fluxIntensity`, `decibels`, `deg`, `rad`. Units for numerical answers are the keys of `UNITS` (m, m/s, m/s², N,
  N m, N s, J, eV, MeV, W, Pa, GPa, kg/m³, J/(kg K), K, °C, mol, C, A, mA, V, Ω, Ω m, F, µF, N/C, V/m, T, Wb, Hz,
  rad/s, Bq, dB, W/m², nm, pm, m⁻¹, …). Values below 10⁻³ or from 10⁶ up get a standard-form model answer; integers
  below 10⁶ are marked exactly; everything else to 3 s.f. unless you pass `sf` or `dp`.
- Style examples: `.scratch/english/slices/a1-nouns-pronouns.mjs` (every MCQ option has a rationale, explanations
  teach, hints from difficulty 3); `.scratch/physics/slices/` (physics question style, numbers, units);
  `.scratch/additional-mathematics/slices/` (structured items with sub-parts); any lesson in
  `content/subjects/physics-o/lessons/`.

## What to produce per concept

1. **One lesson** `content/subjects/physics-a/lessons/<area>/<name>.md` (key `<area>.<name>`, where the concept key is
   `aphys.<area>.<name>`; e.g. `aphys.capacitance.discharge` → `lessons/capacitance/discharge.md`, key
   `capacitance.discharge`), **900-1,600 words** (tables do not count), template of §6: `## Introduction` (why it
   matters, a hook — a Zimbabwean context where it is natural and accurate — and what the student should know
   already), `## Key definitions` (`:::definition{term="…"}` in precise examinable wording of your own;
   `:::formula` for equations with every symbol and unit defined; `:::keyfact` for values to learn), explanation
   sections in a logical order (derivations step by step where the syllabus asks for one), **at least two worked
   examples** (`:::worked-solution` with numbered steps: formula, substitution with units, answer to sensible s.f.
   with unit), a graph section where the concept has graphs (data table plus a sentence on shape, gradient and area),
   `## Common mistakes` (`:::mistake{title="…"}`), `## Exam tips` (`:::exam-tip`: which papers test it — ZIMSEC
   Papers 1-4, Cambridge Papers 1-5 — and how *define, state, explain, show that, derive, calculate, determine,
   sketch, suggest* are answered for this concept), `## Summary` (one `:::summary`, 4-6 bullets). Front matter: key,
   title (unique), summary, concepts ([the concept]), estimatedMinutes (honest), level "core"; `freePreview: true`
   ONLY on the lessons named in your assignment. Do not add `objectives`. Where the boards differ, add a short
   `:::keyfact{title="ZIMSEC and Cambridge"}` saying who needs what (e.g. "Malus's law: Cambridge only").
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/physics-a/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 40%; four options, 1 mark, exam-worthy: they feed ZIMSEC Paper 1 and Cambridge
     Paper 1 — include unit/homogeneity, graph-reading, ratio and "which statement is correct" types), numerical and
     calculation items (`b.num` / `b.calc`, at least 5 per quantitative concept), true/false, matching (quantity ↔
     unit, graph ↔ relationship, device ↔ principle), fill-in-the-blank (with `choices` drop-downs for terms), closed
     `short` answers (a term, a unit, a particle), 3-5 self-marked `manualShort` items (define / explain / describe /
     show that / sketch-described-in-words, 2-6 marks, one tickable point per mark) and 2-4 **practice structured**
     items (`b.struct`, difficulty 3-5, `examStyle: true`, totals 6, 8, 12, 14 or 16 — never 10, 15, 20 or 25, see
     reserved marks) on an original stimulus (data table, described graph or circuit, experiment) with sub-parts.
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 application, ~30% d4-5 exam-style. `daily: true` only on 2-3
     auto-marked items of difficulty 2-3 per concept (short; no long tables).
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION. `calculator: true` on items needing one.
   - `applies`: omit when the item suits both boards (the usual case for shared concepts); `applies: ZIM` /
     `applies: CAM` when it depends on one board's content (a ZIMSEC-detail part such as springs in series or the
     Wheatstone bridge → ZIM; β⁺ decay and neutrinos inside a shared concept → CAM). Single-board concepts are tagged
     to their board automatically.
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FORMULA, CONCEPT, FACT.

## Physics quality rules (non-negotiable)

- **Definitions as examiners want them**: precise, in words, with the quantities named ("the e.m.f. is the energy
  transferred per unit charge in driving charge round a complete circuit"); "per unit" not "per"; vectors named as
  vectors; field strength "per unit positive charge"; potential "from infinity". Your own wording — never a mark
  scheme's.
- **Every number is computed in code.** Use `DATA` constants (data-sheet values, so answers match the papers), build
  data tables and answers with the helpers, and pass the **exact** value to `b.num` / `b.calc`; never type a computed
  answer by hand (`chk` any value you also write in prose). Lesson tables and worked examples: print them from a
  script in `.scratch/physics-a/tables/<prefix><name>.mjs` (never in `slices/`, which the build imports) and paste
  the output. Re-derive every worked example from its data. Invented data must be physically plausible (realistic
  Young moduli ~10¹¹ Pa for steel, work functions 2-5 eV, resistivities, half-lives, densities) and, for experiments,
  show realistic scatter.
- **Numerical answers:** state the unit and the rounding in the stem ("in m s⁻¹, to three significant figures") and
  pass `unit` (a UNITS key) and `dp` or `sf` to match. Significant figures as Cambridge requires: the answer to the
  same s.f. as the least precise data (or one more). Add 1-3 `wrong` values that are real mistakes (°C not converted
  to K, diameter used as radius, eV not converted, peak used for r.m.s., g missed, ln vs lg, mm² not converted to m²,
  sin/cos swapped) and say why in the explanation. `b.calc` items need a numbered `workedSolution` (it defaults to the
  explanation, so write the explanation as the full calculation: formula, substitution with units, answer).
- **Notation.** LaTeX for all maths and units as in `content/subjects/physics-o` but with A-Level index notation for
  compound units: `$v = 3.2\ \text{m s}^{-1}$`, `$g = 9.81\ \text{m s}^{-2}$`, `$E = 1.60 \times 10^{-19}\ \text{J}$`,
  `$\rho = 7.8 \times 10^{3}\ \text{kg m}^{-3}$`; quantity symbols italic (LaTeX default), units upright (`\text{}`),
  vectors described in words; `\lambda`, `\theta`, `\omega`, `\Phi`, `\varepsilon_0`. Standard form as
  $a \times 10^{n}$, never "E" notation in prose (it is fine in a student's typed answer). Decimal point on the line.
  Table headings and graph axes as quantity / unit (`$I\,/\,\text{mA}$`, `$\ln(V/\text{V})$`). British spelling.
  Circuit diagrams, field patterns and ray paths are described in words or tables.
- **Diagrams in words and tables, never images** (only uploaded images are possible and you cannot make them).
  Circuits as an ordered description ("a 6.0 V cell in series with a 12 Ω resistor R and an ammeter; a voltmeter is
  connected across R"); graphs as a data table plus a sentence on the shape; field patterns and wave diagrams in
  words. Questions never say "the diagram below" unless the table is there, and never ask the student to draw
  (self-marked "describe the graph you would sketch: axes, shape, key points" is fine).
- **Uncertainty and practical skills in every quantitative concept**: at least one item per concept on uncertainty
  (percentage uncertainty of a derived quantity, which measurement dominates, half-range of repeats) or on an
  experiment (variables, method, graph to plot and what the gradient means, a limitation and an improvement).
- **Zimbabwean context where natural and accurate:** names (Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho,
  Thandeka), places (Harare, Bulawayo, Mutare, Gweru, Masvingo, Hwange, Kariba), engineering contexts (Kariba dam
  and hydro-electric power, transmission lines, solar geysers and panels, kombis and haulage trucks, mine hoists,
  boreholes and pumps, maize mills, the Victoria Falls). Well-established facts only; no invented statistics about
  real installations ("a hydro-electric turbine" with invented numbers is fine; "Kariba produces X MW" is not unless
  it is clearly labelled illustrative).
- **Safety in practical items**: correct precautions with reasons (hot water, heavy masses and snapping wires —
  goggles and a sand tray, mains and high voltage, radioactive sources — tongs, distance, time, shielding, lasers).
- **MCQs:** exactly one defensible answer, four options, distractors definitely wrong (rationale for each: a real
  misconception — mass/weight, current used up, field lines crossing, intensity changing photoelectron energy, the
  third-law pair on the same body); never "all/none of the above", never refer to options by letter. Numerical MCQ
  distractors come from real mistakes computed in code. **No length cue** — the key must not be clearly the longest
  option; check with `node .scratch/tools/length-cue.mjs physics-a questions/<your folder>/` → `# 0 flagged`.
- **Self-marked items:** one point per creditworthy idea, as A-Level mark schemes award; points add up to the marks;
  example answer complete. *Explain* needs the physics reason, *show that* needs every step and a final value to more
  s.f. than given, *derive* needs each step from stated principles.
- **Original wording** (no textbook, past-paper or mark-scheme text), British English, dates as 7 October 2026.

### Terminology between the boards

| Topic | Note |
|---|---|
| First law of thermodynamics | Cambridge ΔU = q + W (W = work done ON the system). Use that convention and say so; mention that some books use ΔU = Q − W (work done BY the gas). |
| Potentiometer, galvanometer | Both boards (Cambridge 10.3). |
| Communication, electronics, fluid flow, conduction | ZIMSEC only (not in 9702 2025-2027). |
| Doppler, Malus's law, quarks, Hall effect, medical physics, astronomy | Cambridge only (not in the ZIMSEC topic list). |
| Data values | Use the 9702 data sheet (`DATA`) for both boards. |

## Exam-format items (rows owned per assignment below)

Use `examStyle: true`, the exact type, marks, skill and `applies` of the row, `paper:` (e.g. `"Paper 2"`), and set
`concepts` on every item to the concepts it really examines (all covered by every syllabus the item applies to).
Wrap the parts in `checkExam(EXAM.X, [...])` and pass `skill: EXAM.X.skill, secs: EXAM.X.secs` (and
`applies: EXAM.X.applies` where the plan has one). The builder refuses a STRUCTURED item worth 10, 15, 20 or 25 marks
that does not match a plan. Part labels: `(a)`, `(b)`, … with sub-parts `(i)`, `(ii)` one level deep via `P.group`,
or `(1)`, `(2)` with sub-parts `(a)`, `(b)`; never "1(a)" (the validator rejects it). The mocks draw by type + marks +
skill (+ topic), so these must be EXACT:

| Paper item | plan | type, marks, skill | applies | parts and content | how many |
|---|---|---|---|---|---|
| ZIMSEC P1 and Cambridge P1: 40 four-option multiple-choice items | — | MULTIPLE_CHOICE, 1 | none (both) unless board-specific | every concept's MCQs; Cambridge P1 draws AS concepts only | ≥ 80 per syllabus (plenty) |
| **Theory structured** — ZIMSEC P2 (structured questions, 60 marks, assumed), Cambridge P2 (AS content, 60 marks) and Cambridge P4 (A Level content, 100 marks): one structured question on one area | `EXAM.THEORY10` | STRUCTURED, 10, APPLICATION | none when every concept is covered by both syllabi and the wording suits both; otherwise ZIM or CAM | an original stimulus (data, described graph or circuit, experiment); parts (a), (b), (c) … of 1-4 marks from *define/state* through *show that/calculate* to *explain/suggest*, sub-parts allowed; at least 5 marks auto-marked; difficulty 3-4 | 6 per writer (48); mocks need 12 ZIMSEC, 12 Cambridge AS, 20 Cambridge A |
| **ZIMSEC P3**: longer free-response question (format assumed) | `EXAM.ZIM_P3_FREE` | STRUCTURED, 20, APPLICATION | ZIM | (a) definitions/description (self-marked, 4-6 marks), (b) a derivation or explanation (self-marked, 4-6), (c) and (d) multi-step calculations (auto-marked, 8-10) on one area; difficulty 4-5 | 3 per writer (24); mocks need ≥ 12 |
| **Practical: experiment and graph** (Cambridge P3 question 1; ZIMSEC P4 style) | `EXAM.PRACTICAL_GRAPH` | STRUCTURED, 20, ANALYSIS | none (both) unless board-specific | method given in steps with original raw readings (6+ values, repeats, realistic scatter, computed in code); parts: precision of a reading, table headings and derived column (self-marked description), processing (auto-marked), gradient and intercept of the best-fit line (auto-marked with a tolerance that accepts any good line: pass `tol`), constants from gradient/intercept with units; concepts include `aphys.skills.tables-graphs` | 6 |
| **Practical: evaluation** (Cambridge P3 question 2; ZIMSEC P4 style) | `EXAM.PRACTICAL_EVALUATION` | STRUCTURED, 20, EVALUATION | none (both) | two sets of readings; absolute and percentage uncertainty of a reading, a calculated constant (auto-marked), the percentage-difference test against a stated uncertainty, four limitations and four matching improvements (self-marked, quantity + reason); concepts include `aphys.skills.evaluation-improvements` | 6 |
| **Planning** (Cambridge P5 question 1; ZIMSEC P4 planning to be confirmed) | `EXAM.PLANNING` | STRUCTURED, 15, EVALUATION | none (both) unless board-specific | a context and a suggested relationship; variables, method and labelled arrangement in words, measurements and instruments, control of variables, analysis (graph and how the constant follows), safety, additional detail; self-marked with tickable points; concepts include `aphys.skills.planning` | 6 |
| **Data analysis** (Cambridge P5 question 2; ZIMSEC P4 to be confirmed) | `EXAM.DATA_ANALYSIS` | STRUCTURED, 15, ANALYSIS | none (both) unless board-specific | an equation and a data table with uncertainties; what to plot (lg/ln where needed), a completed column with uncertainties (auto-marked values), gradient and worst-line uncertainty (computed with `worstLines`; tolerance generous), the constant with its uncertainty and unit, a final evaluation; concepts include `aphys.skills.data-analysis` | 6 |

Each 20-mark item: difficulty 4-5; each 15- and 10-mark item: difficulty 3-5. Self-marked parts have line-by-line
points. The 10-mark size, the ZIMSEC P3 format and all part structures are our conventions (the ZIMSEC Physics
assessment was not read at all, and Cambridge prints only paper totals for Papers 2 and 4); a reviewer must check
them against recent papers. Put the items in extra modules:
`concept(<one of the item concepts>, { file: "exam/<prefix>theory", keyPrefix: "exam.<prefix>theory" }, …)` for the
10-mark items (set `applies` per item), `exam/<prefix>zimsec` (`applies: ZIM`) for the ZIMSEC P3 items and
`exam/<prefix>practical` for the practical rows (e.g. `exam/w2a-practical`, key prefix `exam.w2a-practical`).

**Reserved mark values.** STRUCTURED worth **10, 15, 20 or 25** marks is only for the exam-format items above.
Practice structured items use 6, 8, 12, 14 or 16 marks.

Mock exams (built later by the lead, not by writers): ZIMSEC P1 40 × MCQ (60 min); ZIMSEC P2 6 × THEORY10 (90 min);
ZIMSEC P3 provisional 5 × ZIM_P3_FREE (format and time to be confirmed); ZIMSEC P4 skills paper PRACTICAL_GRAPH +
PLANNING + DATA_ANALYSIS (50 marks, 150 min); Cambridge P1 40 × MCQ on AS topics (75 min); Cambridge P2 6 × THEORY10
on AS topics (75 min); Cambridge P3 PRACTICAL_GRAPH + PRACTICAL_EVALUATION (40 marks, 120 min); Cambridge P4
10 × THEORY10 on A Level topics (120 min); Cambridge P5 PLANNING + DATA_ANALYSIS (30 marks, 75 min). Continuous
assessment (ZIMSEC) and hands-on practical work are not simulated.

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas (from the concept keys): measurement, kinematics, dynamics, forces, energy, solids, matter, thermal, gases,
  waves, superposition, electricity, circuits, nuclear, particles, circular, gravitation, oscillations, efields,
  capacitance, magnetism, induction, ac, quantum, medical, astro, electronics, communication, skills.
- Lesson titles must be unique (slugs come from titles). Lesson-only scratch scripts go in
  `.scratch/physics-a/tables/<prefix><name>.mjs` (never in `slices/`).

## Commands (repo root)

- Build your slices only: `node .scratch/physics-a/build-content.mjs <your-prefix>` (prefix match on the START of file
  names, e.g. `w2a-`; the trailing dash matters, so `w1a-` does not pick up `w1b-` files).
- Validate: `npm run content:validate -- physics-a --strict` → 0 error(s), 0 warning(s). Other writers work in the
  same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- physics-a` → fix findings in your files.
- Length cue: see the MCQ rule above.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, concepts.mjs, the registry, the syllabus files, `.scratch/tools/`,
  other families or other writers' files: report needed changes (a concept boundary, a missing unit or helper) instead.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation, content:check and length-cue results, any fact you left out or want a reviewer to check.

## Proposed split into 8 writer assignments

99 concepts; 11-14 per assignment plus exam rows of roughly equal weight (a practical row counts about as much as a
concept). Concept keys below drop the `aphys.` prefix. ★ = `freePreview: true` (at most one lesson per top-level topic
of each syllabus — ZIMSEC topic areas 1-7 and P, Cambridge topics 1-25, P3 and P5; a shared concept counts for both).
Every writer owns **6 THEORY10** and **3 ZIM_P3_FREE** items on their own concepts (ZIM_P3_FREE only on concepts ZIMSEC
covers; THEORY10 mix given per writer: AS = Cambridge AS concepts, A = Cambridge A Level concepts, ZIM = ZIMSEC-only
concepts with `applies: ZIM`, CAM = Cambridge-only concepts with `applies: CAM`).

**W1a — prefix `w1a-`** (13; measurement, kinematics, dynamics, recording skills — ZIMSEC 1, 2.1-2.2, P.1; Cambridge
1-3, P3) measurement.si-units ★, measurement.errors-uncertainties, measurement.scalars-vectors,
measurement.instruments, kinematics.motion-graphs, kinematics.suvat ★, kinematics.projectiles, dynamics.newtons-laws,
dynamics.momentum-force, dynamics.conservation-momentum, dynamics.drag-terminal-velocity, skills.tables-graphs ★,
skills.evaluation-improvements.
Folders: `measurement/ kinematics/ dynamics/`, `skills/tables-graphs|evaluation-improvements`. THEORY10: 6 AS.
Practical rows (the main Paper 3 owner): PRACTICAL_GRAPH ×2 (simple pendulum period against length; a ball rolling
down a ramp, distance against time²), PRACTICAL_EVALUATION ×2 (time for a trolley to roll down a slope at two
heights; a falling paper cone or a bouncing ball). The two skills lessons serve every writer: finish them first and
use neutral examples showing both boards' practical papers.

**W1b — prefix `w1b-`** (13; forces, energy, solids, circular motion, planning and analysis skills — ZIMSEC 2.3-2.5,
6.2, P.2; Cambridge 4-6, 12, P5) forces.moments-couples, forces.equilibrium, forces.density-pressure-upthrust,
energy.work-conservation-efficiency, energy.gpe-ke, energy.power, solids.hookes-law, solids.stress-strain-young,
solids.elastic-plastic-energy, circular.angular-speed, circular.centripetal-force, skills.planning,
skills.data-analysis.
Folders: `forces/ energy/ solids/ circular/`, `skills/planning|data-analysis`. THEORY10: 4 AS + 2 A (circular).
Practical rows: PRACTICAL_GRAPH ×1 (extension of a spring or a loaded rule's deflection), PRACTICAL_EVALUATION ×1
(a balanced metre rule and an unknown mass, or a cantilever), PLANNING ×1 (Young modulus of a material in a novel
geometry, or upthrust/flow), DATA_ANALYSIS ×1 (a power law y = axⁿ by lg-lg graph, e.g. a cantilever oscillation).
The planning and data-analysis lessons are the reference for every writer: finish them early.

**W2a — prefix `w2a-`** (12; waves, superposition, oscillations — ZIMSEC 3; Cambridge 7, 8, 17)
waves.progressive-waves ★, waves.transverse-longitudinal, waves.em-spectrum, waves.doppler, waves.polarisation-malus,
superposition.stationary-waves, superposition.diffraction, superposition.two-source-interference,
superposition.diffraction-grating, oscillations.shm, oscillations.shm-energy, oscillations.damping-resonance.
Folders: `waves/ superposition/ oscillations/`. THEORY10: 4 AS (one may be CAM: Doppler or Malus) + 2 A (s.h.m.).
Practical rows: PRACTICAL_GRAPH ×1 (stationary waves on a string: frequency against 1/length, or a resonance tube),
PLANNING ×1 (damping of an oscillating system by card area, or intensity through polarisers), DATA_ANALYSIS ×1
(T = 2π√(m/k) or the double-slit relation with uncertainties).

**W2b — prefix `w2b-`** (12; current electricity, d.c. circuits, capacitance — ZIMSEC 4.1-4.2, 4.4; Cambridge 9,
10, 19) electricity.current-charge, electricity.pd-power, electricity.resistance-iv ★, electricity.resistivity,
circuits.emf-internal-resistance, circuits.series-parallel, circuits.kirchhoff-problems, circuits.potential-dividers,
circuits.potentiometer, capacitance.capacitors, capacitance.energy-stored, capacitance.discharge.
Folders: `electricity/ circuits/ capacitance/`. THEORY10: 4 AS + 2 A (capacitance).
Practical rows: PRACTICAL_GRAPH ×1 (resistance of a wire against length, or e.m.f. and internal resistance from
V against I), PRACTICAL_EVALUATION ×1 (capacitor discharge timed with a stop-watch at two resistances),
DATA_ANALYSIS ×1 (ln V against t for a discharging capacitor, finding C with its uncertainty).

**W3a — prefix `w3a-`** (12; gravitational, electric and magnetic fields, induction — ZIMSEC 2.6, 4.3, 4.5-4.6;
Cambridge 13, 18, 20) gravitation.field-strength, gravitation.newtons-law-orbits, gravitation.potential,
efields.uniform-fields, efields.coulomb-point-charge, efields.electric-potential, magnetism.field-patterns,
magnetism.force-on-conductor, magnetism.force-on-charge, magnetism.hall-effect, induction.flux-faraday,
induction.lenz-applications.
Folders: `gravitation/ efields/ magnetism/ induction/`. THEORY10: 6 A (one may be CAM: Hall effect).
Practical rows: PRACTICAL_EVALUATION ×1 (a magnet dropped through a coil, or a current balance), PLANNING ×1 (how the
e.m.f. induced in a coil depends on frequency or turns, or the force between parallel conductors), DATA_ANALYSIS ×1
(B against distance from a wire or along a solenoid with a Hall probe, power law).

**W3b — prefix `w3b-`** (12; matter, thermal physics, gases, alternating currents — ZIMSEC 4.7, 6.1, 6.3-6.7;
Cambridge 14-16, 21) matter.phases-kinetic-model, matter.fluid-flow, matter.thermal-conduction,
matter.convection-radiation, thermal.temperature-scales, thermal.specific-heat-latent-heat,
thermal.internal-energy-first-law, gases.equation-of-state ★, gases.kinetic-theory, ac.characteristics-rms,
ac.rectification-smoothing, ac.transformers-transmission.
Folders: `matter/ thermal/ gases/ ac/`. THEORY10: 4 A + 2 ZIM (fluid flow, conduction or transformers).
Practical rows: PRACTICAL_GRAPH ×1 (cooling of water: temperature against time and a tangent, or volume of trapped
air against temperature), PRACTICAL_EVALUATION ×1 (specific heat capacity of water with an immersion heater at two
masses), PLANNING ×1 (thermal conductivity of insulating materials, or smoothing ripple against capacitance).

**W4a — prefix `w4a-`** (13; quantum, atomic and nuclear physics, particles, ultrasound — ZIMSEC 7.1-7.4; Cambridge
11, 22-24) particles.electron-charge-mass, particles.quarks-leptons, nuclear.atom-nucleus,
nuclear.radiations-decay-equations, quantum.photons, quantum.photoelectric ★, quantum.wave-particle-duality,
quantum.energy-levels-spectra, nuclear.mass-defect-binding, nuclear.fission-fusion, nuclear.decay-law,
medical.ultrasound ★, medical.x-rays-ct.
Folders: `particles/ nuclear/ quantum/`, `medical/ultrasound|x-rays-ct`. THEORY10: 1 AS (radiations or quarks, CAM
if quarks) + 5 A (one may be CAM: medical). Practical rows: PLANNING ×1 (absorption of gamma or beta radiation by a
material, or Planck's constant from LEDs), DATA_ANALYSIS ×1 (count rate against time or thickness, ln graph, with
background correction).

**W4b — prefix `w4b-`** (12; electronics, communication, PET, astronomy — ZIMSEC 5, 7.5; Cambridge 24.3, 25)
electronics.op-amp-properties, electronics.op-amp-amplifiers, electronics.sensors-output-devices,
electronics.logic-gates ★, electronics.logic-systems, communication.modulation, communication.digital-signals,
communication.channels-attenuation, medical.pet, astro.luminosity-standard-candles, astro.stellar-radii ★,
astro.redshift-hubble.
Folders: `electronics/ communication/ astro/`, `medical/pet`. THEORY10: 4 ZIM (electronics, communication) + 2 CAM
(astronomy or PET). ZIM_P3_FREE on electronics and communication. Practical rows: PLANNING ×1 (attenuation of a
signal in a cable or optical fibre against length, or an LDR sensor calibration), DATA_ANALYSIS ×1 (inverse-square
flux against distance from a lamp, or the gain of an amplifier against frequency).

Totals: THEORY10 48 (19 AS, 23 A, 6 ZIM; a few CAM-only among them), ZIM_P3_FREE 24, PRACTICAL_GRAPH 6,
PRACTICAL_EVALUATION 6, PLANNING 6, DATA_ANALYSIS 6. ★ freePreview: 10 lessons (si-units, suvat, tables-graphs,
progressive-waves, resistance-iv, equation-of-state, photoelectric, ultrasound, logic-gates, stellar-radii).
