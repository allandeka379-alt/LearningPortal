# Heritage Studies (O-Level) — `heritage-studies-o`

Study content for **ZIMSEC O-Level Heritage Studies** (Forms 1–4, 2015-2022; ZIMSEC only) —
`content/syllabi/zimsec/o-level/heritage-studies/2015-2022.json`, concept registry
`content/concepts/heritage-studies-o.json` (95 `her.*` concepts over the nine syllabus topics).

Generators and the writers' brief: `.scratch/heritage-studies/` (`build-syllabi.mjs`, `lib.mjs`, `slices/*.mjs` →
`build-content.mjs`, `build-assessments.mjs`, `BRIEF.md`); shared tools in `.scratch/tools/`.

> **Review status.** Written on 2026-10-09 by eight AI writer agents (Claude Opus, medium effort) to
> `.scratch/heritage-studies/BRIEF.md`: factual, respectful treatment of culture, identity, the Constitution and the
> liberation heritage without party-political bias; contested matters presented as such; no statistics. Checked by the
> validator (strict: 0 errors, 0 warnings), `content:check`, the length-cue checks (0 flagged; key is the unique longest
> option in 18% of MCQs) and the marking harness. **No independent AI review and no human review yet.** Production
> publishing requires a human reviewer (§41).

## At a glance

95 lessons, 1,757 questions, 846 flashcards, 9 topic tests (one per topic) and 2 mock exams: **Paper 1** (75 min, 40
MCQs) and **Paper 2** (120 min, 100 marks: six compulsory 10-mark structured questions and two 20-mark essays chosen from
four; the number offered is our assumption).

## DEV preview

Imported and published in the DEV database on 2026-10-09 (DEV-preview note): 94 topics, 95 lessons, 1,757 questions, 846 flashcards and 11 tests; 2,709 items published, 0 failed; the subject became AVAILABLE. Smoke test `npx tsx --conditions=react-server .scratch/tools/smoke-family.ts heritage-studies-o`: **31/31 checks passed**.

## Known gaps

The essay and structured part splits are our convention; terms in Shona, Ndebele and other languages are used where the
writers were confident and given in English otherwise; Heritage-Based Curriculum version and the subject code to
confirm.

## Needs a specialist teacher's check

Constitution section references (3, 17, 26, 35(3), 56, 82); the Domestic Violence Act and the Anti-Domestic Violence
Council; intestate succession (outline only) and the Marriages Act 2022; UNESCO recognition of Jerusarema/Mbende; the
regions where smaller languages are spoken; dances, initiation rites and plant names (zumbani = umsuzwane, gavakava =
aloe); totems named; ZACC's role; estate administration by magistrates courts.

## Maintenance

Rebuild `node .scratch/heritage-studies/build-content.mjs`; assessments via `.scratch/tools/inventory.ts` then
`node .scratch/heritage-studies/build-assessments.mjs --write`; checks `npm run content:validate -- heritage-studies-o
--strict`; smoke `npx tsx --conditions=react-server .scratch/tools/smoke-family.ts heritage-studies-o`.
