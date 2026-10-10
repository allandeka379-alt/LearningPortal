# Family and Religious Studies (O-Level) — `religious-studies-o`

Study content for **ZIMSEC O-Level Family and Religious Studies** (Forms 1–4, 2015-2022; ZIMSEC only) —
`content/syllabi/zimsec/o-level/religious-studies/2015-2022.json`, concept registry
`content/concepts/religious-studies-o.json` (topics 1-5 religions: the concept of religion, Indigenous Religion,
Judaism, Christianity, Islam; topics 6-15 contemporary issues).

Generators and the writers' brief: `.scratch/religious-studies/` (`concepts.mjs`, `build-syllabi.mjs`, `lib.mjs`,
`slices/*.mjs` → `build-content.mjs`, `build-assessments.mjs`, `BRIEF.md`); shared tools in `.scratch/tools/`.

> **Review status.** Written on 2026-10-10 by eight AI writer agents (**Claude Sonnet**, medium effort; the first family
> written on Sonnet, owner decision) to `.scratch/religious-studies/BRIEF.md`: respectful, factual treatment of every
> faith; Indigenous Religion customs written in hedged "many families" / "some communities" terms; contested history
> presented as such; no percentages (ZIMSTAT cited instead). Checked by the validator (strict: 0 errors, 0 warnings),
> `content:check` (no findings), the length-cue checks (0 flagged; key is the unique longest option in 12% of MCQs), the
> literal-newline check (0) and the marking harness. **No independent AI review and no human review yet.** Production
> publishing requires a human reviewer (§41); the Islamic, Jewish and Indigenous Religion material should be read by
> people of those traditions.

## At a glance

89 lessons (15 free preview), 1,670 questions, 783 flashcards, 15 topic tests (one per topic) and 2 mock exams:
**Paper 1** (religions) and **Paper 2** (contemporary issues), each four 25-mark questions chosen from eight, 100 marks,
2 hours 30 minutes. Each question is part (a) 15 marks and part (b) 10 marks: the paper structure and that split are our
convention (the syllabus gives only the paper totals).

## DEV preview

Imported and published in the DEV database on 2026-10-10 (DEV-preview note): 89 lessons, 1,670 questions, 783
flashcards and 17 tests (2,559 items); the subject became AVAILABLE. Smoke test
`npx tsx --conditions=react-server .scratch/tools/smoke-family.ts religious-studies-o`: **43/43 checks passed**.

## Known gaps

1. Paper structure and the 15 + 10 split assumed; ZIMSEC code and the Heritage-Based Curriculum version to confirm.
2. Indigenous Religion customs (birth, initiation, marriage, death, kurova guva/umbuyiso) need checking with practitioners
   and community elders; Shona and Ndebele terms used where the writers were confident.

## Needs a specialist teacher's check

Legal references: the Witchcraft Suppression Act (offence of accusing someone of witchcraft; the 1899 Ordinance), the
Traditional Medical Practitioners Council Act (2000), the Marriages Act 2022 (minimum age 18), the Education Amendment
Act 2020, the Termination of Pregnancy Act, the Disabled Persons Act 1992, the Environmental Management Act, Constitution
section numbers (Chapter 15; sections 48, 51, 56, 60, 69, 78, 81, 86, 251, 282). Dates: UNESCO inscriptions (Great
Zimbabwe and Khami 1986, Matobo Hills 2003); Silveira 1561; Johane Masowe and Marange (1930s); ZAOGA 1960; church
history dates (313, 325, 380-381, 1054, 1517, 1948); Reform 1972 and Conservative 1985 women's ordination; 619 CE,
Mansa Musa 1324; CCJP 1972, Bishop Lamont 1976-77, the 1997 Matabeleland report, *The Zimbabwe We Want* (2006).
Scripture references (Qur'an, Hebrew Bible and New Testament) cited in items; the Lemba wording; mission-school founding
churches; Childline 116; the qiblah from Zimbabwe ("roughly north, a little east of north").

## Maintenance

- Rebuild: `node .scratch/religious-studies/build-content.mjs`. Syllabi: `node .scratch/religious-studies/build-syllabi.mjs`.
- Assessments: `npx tsx --conditions=react-server .scratch/tools/inventory.ts religious-studies-o .scratch/religious-studies/inventory.json`
  then `node .scratch/religious-studies/build-assessments.mjs --write`.
- Checks: `npm run content:validate -- religious-studies-o --strict`, `npm run content:check -- religious-studies-o`,
  `node .scratch/tools/length-cue.mjs religious-studies-o`, `node .scratch/tools/literal-newlines.mjs religious-studies-o`.
  Smoke: `npx tsx --conditions=react-server .scratch/tools/smoke-family.ts religious-studies-o`.
