# Business (A-Level) — `business-a`

Study content for three syllabi that share one concept registry (`content/concepts/business-a.json`):

- **ZIMSEC A-Level Business Studies** (Forms 5–6, 2015-2022) — `content/syllabi/zimsec/a-level/business-studies/2015-2022.json`
- **ZIMSEC A-Level Business Enterprise and Skills** (Forms 5–6, 2015-2022) — `content/syllabi/zimsec/a-level/business-enterprise-skills/2015-2022.json`
- **Cambridge International AS & A Level Business 9609** (2026-2028) — `content/syllabi/cambridge/a-level/business/2026-2028.json`
  (AS content and A Level content as sections)

The Business Enterprise and Skills A-Level subject was added to the seed catalogue (`prisma/seed/data/catalogue.ts`)
with this family.

Generators and the writers' brief: `.scratch/business-a/` (`concepts.mjs`, `build-syllabi.mjs`, `lib.mjs`, `tables/*.mjs`
worked examples and lesson generators, `slices/*.mjs` → `build-content.mjs`, `build-assessments.mjs`, `BRIEF.md`); shared
tools in `.scratch/tools/`.

> **Review status.** Written on 2026-10-15/16 by eight AI writer agents (Claude Sonnet, medium effort) to
> `.scratch/business-a/BRIEF.md`; every break-even, ratio, budget variance, depreciation, cash-flow, payback/ARR/NPV,
> critical-path, EOQ, elasticity and forecasting value computed in code (the build rounds numbers to 12 significant
> figures). A finishing pass rebalanced option lengths: the key is the unique longest option in 11% and the unique
> shortest in 13% of single-answer MCQs, with no file above 35% on either. Checked by the validator (strict: 0 errors,
> 0 warnings), `content:check` (no findings) and the marking harness. **No independent AI review and no human review.**
> Per the owner decision of 2026-10-12, content is published to production by the deploy's migrate step.

## At a glance

| | Total | ZIMSEC BS | ZIMSEC BES | 9609 |
| --- | --- | --- | --- | --- |
| Lessons | 107 | | | |
| Questions | 2,448 | 2,082 | 1,909 | 2,138 |
| Flashcards | 955 | | | |
| Topic tests | 41 | 7 | 7 | 27 |
| Mock exams | 8 | Papers 1-2 | Papers 1-2 | Papers 1-4 |

## Assessments

`.scratch/business-a/build-assessments.mjs` (every rule guaranteed). Topic tests are 20 marks in 25 minutes; small
topics are merged (ICT with communication; Cambridge objectives with stakeholders, marketing with market research,
inventory with capacity, cash flow with budgets, communication with leadership, organisational structure with HR
strategy, location and scale with quality).

- **ZIMSEC Business Studies**: P1 seven 10-mark structured questions and a 30-mark case study (180 min); P2 a 25-mark data
  response and three 25-mark essays chosen from nine (180 min).
- **ZIMSEC Business Enterprise and Skills**: P1 four 10-mark structured questions and two 30-mark case studies (180 min);
  P2 four 25-mark essays chosen from ten (180 min).
- **9609**: P1 four 5-mark questions and one 20-mark essay from two (AS, 75 min); P2 two 30-mark data responses (AS,
  90 min); P3 two 8-mark, two 16-mark and one 12-mark question on case material (A Level, 105 min); P4 two 20-mark
  essays (A Level, 75 min).

Question sizes and part splits are our conventions; continuous assessment and the enterprise project are not simulated.
The bank supports one mock of each paper (a second needs the essay and case-study rows doubled).

## DEV preview

Imported and published in the DEV database on 2026-10-16 (`--approver demo.admin@example.test`): 107 lessons, 2,448
questions, 955 flashcards and 49 tests. Smoke test `npx tsx --conditions=react-server .scratch/tools/smoke-family.ts
business-a`: **125/125 checks passed** (all three syllabi, all 8 mocks).

## Needs a specialist teacher's check

1. Board tagging: which concepts are Business Studies only, Business Enterprise and Skills only or Cambridge only (for
   example EOQ, kaizen and work study ZIMSEC only; outsourcing, ERP and total/free float Cambridge only; beneficiation
   and negotiation BES only).
2. Theorists and models (Fayol, Mintzberg's roles, Blake and Mouton, French and Raven, Goleman, Handy's cultures,
   McClelland, Vroom) and the Hawthorne description.
3. Conventions stated in stems as assumptions (interest and discount rates, tariffs, piece rates, redundancy pay, the ARR
   basis, LIFO wording) and generic descriptions of insolvency terms and of the AfDB, World Bank and IMF.
4. The exam part structures and mark splits (see Assessments).
