# Physics (A-Level) — `physics-a`

Study content for two syllabi that share one concept registry (`content/concepts/physics-a.json`):

- **ZIMSEC A-Level Physics** (Forms 5–6, 2015-2022) — `content/syllabi/zimsec/a-level/physics/2015-2022.json`. The
  ZIMSEC A-Level Physics syllabus document was not found: the tree was built from the Ministry's Physics Forms 3-6
  teachers' guide and is flagged for confirmation.
- **Cambridge International AS & A Level Physics 9702** (2025-2027) — `content/syllabi/cambridge/a-level/physics/2025-2027.json`
  (AS content, A Level content and practical skills as sections)

Generators and the writers' brief: `.scratch/physics-a/` (`concepts.mjs`, `build-syllabi.mjs`, `lib.mjs`, `tables/*.mjs`
calculation checks, `slices/*.mjs` → `build-content.mjs`, `build-assessments.mjs`, `BRIEF.md`); shared tools in
`.scratch/tools/`.

> **Review status.** Written on 2026-10-10 by eight AI writer agents (Claude Opus, medium effort) to
> `.scratch/physics-a/BRIEF.md`; every calculation computed in code, data near rounding boundaries changed. Checked by
> the validator (strict: 0 errors, 0 warnings), the length-cue checks (0 flagged; key is the unique longest option in 21%
> of MCQs), the literal-newline check (0) and the marking harness. `content:check` reports 83 lesson-reuse and 44
> question-reuse findings, mostly physical constants and data-sheet values shared across items. **No independent AI
> review and no human review yet.** Production publishing requires a human reviewer (§41).

## At a glance

| | Total | ZIMSEC | 9702 |
| --- | --- | --- | --- |
| Lessons (free preview) | 99 (10) | | |
| Questions | 2,218 | 1,998 | 1,875 |
| Flashcards | 870 | | |
| Topic tests | 33 | 8 | 25 |
| Mock exams | 9 | Papers 1-4 | Papers 1-5 |

## Assessments

`.scratch/physics-a/build-assessments.mjs` (every rule guaranteed). Topic tests 20 marks in 25 minutes; 9702
temperature, ideal gases and thermodynamics are merged as "Thermal physics".

- **ZIMSEC**: P1 40 MCQs (60 min); P2 six 10-mark structured questions (90 min); P3 five 20-mark free-response questions
  (120 min, format assumed); P4 written practical skills: experiment and graph (20), planning (15), data analysis (15)
  (150 min).
- **9702**: P1 40 MCQs on AS content (75 min); P2 six 10-mark AS questions (75 min); P3 experiment and graph (20) and
  evaluation (20) (120 min); P4 ten 10-mark A Level questions (120 min); P5 planning (15) and data analysis (15) (75 min).

Question sizes and part structures are our conventions; the hands-on practicals are not simulated.

## DEV preview

Imported and published in the DEV database on 2026-10-10 (DEV-preview note, `--approver demo.admin@example.test`):
99 lessons, 2,218 questions, 870 flashcards and 42 tests; 3,229 items published, 0 failed. Smoke test
`npx tsx --conditions=react-server .scratch/tools/smoke-family.ts physics-a`: **102/102 checks passed** (both syllabi).

## Known gaps

1. ZIMSEC A-Level Physics syllabus document not found (tree from the teachers' guide); ZIMSEC Paper 3 format assumed.
2. ZIMSEC scope to confirm: springs in series/parallel and ½σε, B = μ₀I/(2πr) and B = μ₀nI, Wheatstone/metre bridge
   (tagged ZIMSEC only); β⁺ decay and neutrinos (tagged Cambridge only); whether pendulum and spring periods are recalled
   or given; the first-law sign convention (Cambridge ΔU = q + W used).
3. Difficulty in the W4a concepts (nuclear, quantum, medical) skews low: no difficulty-5 items there.
4. ZIMSEC code and the Heritage-Based Curriculum version to confirm.

## Needs a specialist teacher's check

Cantilever formula y = 4WL³/(Ebd³); assumed Young moduli (copper 1.2×10¹¹ Pa, aluminium 7.0×10¹⁰ Pa); ZESA transmission
and distribution voltages (330/420 kV, 33/11 kV); the smoothing ripple formula (beyond Cambridge 21.2, said so in the
lesson); 1 u × c² = 934 MeV with data-sheet constants vs 931.5 MeV stated where used; tissue impedances and attenuation
coefficients (typical values); invented engineering numbers (suspension resonance, CD track spacing 1.6 µm, US$0.14 per
kW h); the rolling-ball ramp acceleration (5/7)g·h/L stated in the stem.

## Maintenance

- Rebuild: `node .scratch/physics-a/build-content.mjs`. Syllabi: `node .scratch/physics-a/build-syllabi.mjs`.
- Assessments: `npx tsx --conditions=react-server .scratch/tools/inventory.ts physics-a .scratch/physics-a/inventory.json`
  then `node .scratch/physics-a/build-assessments.mjs --write`.
- Checks: `npm run content:validate -- physics-a --strict`, `npm run content:check -- physics-a`,
  `node .scratch/tools/length-cue.mjs physics-a`, `node .scratch/tools/longest-key.mjs physics-a`,
  `node .scratch/tools/literal-newlines.mjs physics-a`. Smoke: `npx tsx --conditions=react-server
  .scratch/tools/smoke-family.ts physics-a`.
