# Chemistry (A-Level) — `chemistry-a`

Study content for two syllabi that share one concept registry (`content/concepts/chemistry-a.json`):

- **ZIMSEC A-Level Chemistry** (Forms 5–6, 2015-2022) — `content/syllabi/zimsec/a-level/chemistry/2015-2022.json`
  (physical, inorganic, organic and applied chemistry, practical skills)
- **Cambridge International AS & A Level Chemistry 9701** (2025-2027) — `content/syllabi/cambridge/a-level/chemistry/2025-2027.json`
  (AS content, A Level content and practical skills as sections)

Generators and the writers' brief: `.scratch/chemistry-a/` (`concepts.mjs`, `nodes.mjs`, `zimsec.mjs`, `cambridge.mjs`,
`build-syllabi.mjs`, `lib.mjs`, `tables/*.mjs`, `slices/*.mjs` → `build-content.mjs`, `build-assessments.mjs`, `BRIEF.md`);
shared tools in `.scratch/tools/`.

> **Review status.** Written on 2026-10-10 by eight AI writer agents (Claude Opus, medium effort) to
> `.scratch/chemistry-a/BRIEF.md`; every calculation (moles, titres, enthalpy cycles, K, pH, E⦵, rates) computed in code.
> Checked by the validator (strict: 0 errors, 0 warnings), the length-cue checks (0 flagged; key is the unique longest
> option in 17% of MCQs), the literal-newline check (0; the kit's `t` helper was fixed to turn a typed `\n` into a line
> break, which had left 20 multiple-statement stems on one line) and the marking harness. `content:check` reports 299
> lesson-reuse and 332 question-reuse findings: data-booklet values (Ar, R, E⦵, Ka, Kw, bond energies) and standard
> practical volumes shared across items. **No independent AI review and no human review yet.** Production publishing
> requires a human reviewer (§41).

## At a glance

| | Total | ZIMSEC | 9701 |
| --- | --- | --- | --- |
| Lessons (free preview) | 111 (28) | | |
| Questions | 2,473 | 2,304 | 2,070 |
| Flashcards | 975 | | |
| Topic tests | 55 | 24 | 31 |
| Mock exams | 9 | Papers 1-4 | Papers 1-5 |

## Assessments

`.scratch/chemistry-a/build-assessments.mjs` (every rule guaranteed). Topic tests 20 marks in 25 minutes; small topics
are merged (for example AS electrochemistry + kinetics, ZIMSEC environmental + nanochemistry). Topic tests with the same
name at AS and A Level are labelled "(AS)" and "(A Level)" (`disambiguateTitles` in `assess-lib.mjs`).

- **ZIMSEC**: P1 40 MCQs (60 min); P2 six 10-mark structured questions (90 min); P3 six 15-mark free-response questions
  from ten (physical 3, inorganic 2, organic 3, applied 2) (150 min, 90 marks); P4 written practical skills: quantitative
  analysis (20), qualitative analysis (15), planning (15) (150 min).
- **9701**: P1 40 MCQs on AS content (75 min); P2 six 10-mark AS questions (75 min); P3 quantitative (25) and qualitative
  analysis (15) (120 min); P4 ten 10-mark A Level questions (120 min); P5 planning (15) and data analysis (15) (75 min).

Question sizes and part structures are our conventions; the hands-on practicals are not simulated.

## DEV preview

Imported and published in the DEV database on 2026-10-10 (DEV-preview note): 111 lessons, 2,473 questions, 975
flashcards and 64 tests; 3,623 items published, 0 failed. Smoke test
`npx tsx --conditions=react-server .scratch/tools/smoke-family.ts chemistry-a`: **146/146 checks passed** (both syllabi; the first run
failed 2 checks because AS and A Level topic tests shared titles, fixed by labelling them).

## Known gaps

1. ZIMSEC scope details tagged per the concept descriptions (pOH, Kb and soil buffering ZIMSEC only); Section C
   placement of amino-acid chemistry to confirm.
2. No `cm³/g` unit in the kit, so one Cambridge P3 gradient part has no unit hint.
3. ZIMSEC code and the Heritage-Based Curriculum version to confirm.

## Needs a specialist teacher's check

Data values added by the writers (lattice-energy cycle data, Kw at 283–333 K, Ksp and Kstab values, pKa/pKb of
substituted acids, phenols and amines, isoelectric points, E⦵ for MnO₄²⁻/MnO₂, Co ammine and Cu²⁺/CuI); the carbon-13
shift table (taken from a garbled source; nitrile 100–125 ppm in particular) and aldehyde C–H IR peaks; VSEPR wording
(PH₃ 94° measured vs 107° predicted) and the "vacant d orbitals" expanded-octet explanation; industrial conditions
(hydration, cracking, LDPE/HDPE); Zimbabwe statements (lithium, nickel, PGMs on the Great Dyke; no figures); the
thalidomide example. (Checked: an oxidation number typed as "+4" or "+ 4" is accepted by the number parser.)

## Maintenance

- Rebuild: `node .scratch/chemistry-a/build-content.mjs`. Syllabi: `node .scratch/chemistry-a/build-syllabi.mjs`.
- Assessments: `npx tsx --conditions=react-server .scratch/tools/inventory.ts chemistry-a .scratch/chemistry-a/inventory.json`
  then `node .scratch/chemistry-a/build-assessments.mjs --write`.
- Checks: `npm run content:validate -- chemistry-a --strict`, `npm run content:check -- chemistry-a`,
  `node .scratch/tools/length-cue.mjs chemistry-a`, `node .scratch/tools/longest-key.mjs chemistry-a`,
  `node .scratch/tools/literal-newlines.mjs chemistry-a`. Smoke: `npx tsx --conditions=react-server
  .scratch/tools/smoke-family.ts chemistry-a`.
