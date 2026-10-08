# Active / recent workflow runs (resume with Workflow({scriptPath, resumeFromRunId}))

| Run | Script | Args | Status |
|---|---|---|---|
| wf_30966f74-362 | .scratch/workflows/simplify-platform.js | - | STOPPED 09:30: flags+AI-off and one-off pricing DONE (reports in .scratch/simplify-upstream-reports.json); its channels agent was building PHONE-first auth from the stale prompt -> stopped |
| wf_23d84471-6ee | .scratch/workflows/channels-email.js | - | DONE 11:15: email auth verified (5474/5474 tests, build OK, smoke green) |
| wf_9823c9cd-fee | .scratch/workflows/content-subject.js | mathematics-o | DONE 2026-10-08 ~05:15: 107 lessons, 2133 Q, 1073 FC, 28 assessments; review fixed 640; imported + DEV-published; smoke 30/30. Gaps in content/subjects/mathematics-o/README.md |
| wf_9418385a-e99 | .scratch/workflows/content-subject.js | biology-o | DONE 10:47: 95 lessons, 2061 Q, 1019 FC, 39 assessments; imported + DEV-published; smoke 37/37; README written. (history: writes 1-5 + reviews DONE; session drop killed ASSEMBLE ~06:42; DB restarted, RESUMED 09:45 (w7auvskeg); machine crash ~10:19 killed it again (journal tail NUL bytes cleaned, backup in scratchpad); RESUMED 10:30 (wl5vvyrc4)) |
| wf_1c5aca19-41d | .scratch/workflows/content-subject.js | chemistry-o | writes 1-5 + reviews DONE; session drop killed ASSEMBLE ~06:42; RESUMED 09:46 (task whk5g5rdl). Cache MISSED from the reviews on (cache keys depend on call order and the 00:34 run's reviews finished out of order), so all 5 reviews re-run as a SECOND review pass (slices 1-2 done: 20 + 23 more errors fixed), then assemble. Crash ~10:19; RESUMED 10:31 (wtiybq6eq) |

OWNER 2026-10-08: when the 3 runs above finish -> NO MORE WORKFLOWS / ULTRACODE. Session is at max effort. Continue content directly in the main session, one subject at a time: physics-o next, then combined-science-o, waveB... (args/notes in .scratch/content-subjects.json are still the brief for each subject).
Resume gotcha: cache keys include call ORDER; pipeline stages that resolved in a different order on the earlier run miss the cache on resume.
Resume rule: pass the EXACT original args (they are part of every agent prompt; any change busts the cache). The Workflow failure notice prints them.
Rule: content-only runs are light (no tsc/next build; smoke is a tsx script): up to 3 content runs at once if >2.5 GB RAM free. Max 2 when any run does typecheck/full tests/next build.

Done in main thread (2026-10-07):
- features.ts: next/navigation imported lazily (db:seed failed with createContext is not a function).
- Demo syllabi re-dated to DEMO_EFFECTIVE_FROM=2000-01-01; demo.student gets the upgrade offer demo-development -> 2015-2022.
- Search "duplicate" topic tests are per-board copies: not a bug.

Follow-ups from the email-auth verifier — DONE in main thread 11:20-11:40 (typecheck clean, touched tests green):
- Referral default qualifyOn PAYMENT (core.ts + tests), /app/invite copy "buys Full access"; dev row updated by SQL.
- Parent child page + /parent/billing: "Has full access" badge instead of pay button (childrenWithLifetimeAccess, link-scoped, tested).
- Teacher + school-admin account menus: Change email / Change password.
- /api/v1/openapi.json hides "AI tutor" operations while features.ai is off (withoutSwitchedOffFeatures + tests).
- Terms draft: one-off Full access wording, AI section "only when announced", Draft 0.2.
Left as known limitations: soft 404 under /app loading boundary; no phone prefill at checkout.
Go-live (owner/external): Resend domain (SPF/DKIM/DMARC) + real inbox tests; Paynow merchant + real USD 1 purchase/refund.

## Physics (written directly, no workflows — owner 2026-10-08)
Sources: .scratch/physics/{concepts,cambridge,zimsec}.mjs -> node .scratch/physics/build-syllabi.mjs (registry + 2 syllabus files, validated).
Content: lessons written directly in content/subjects/physics-o/lessons/**; questions+cards in .scratch/physics/slices/*.mjs -> node .scratch/physics/build-content.mjs.
Checks after each slice: npm run content:validate -- physics-o (0/0) and npm run content:check -- physics-o (no findings).
Slices: A measurement+motion DONE (9 concepts, 141 Q, 82 cards). B forces/machines/structures DONE (15). C energy+engines DONE (8). D thermal DONE (12; totals 44 lessons, 535 Q, 331 cards). E waves+light DONE (11; totals 55 lessons, 685 Q, 408 cards). F electricity+magnetism DONE (12; totals 67 lessons, 853 Q, 488 cards; ZIMSEC 11.3 now also covers emf-pd + series-parallel). G electromagnetism+electronics DONE (11; totals 78 lessons, 1001 Q, 558 cards; ZIMSEC 13.2 also covers em.magnetic-effect). H nuclear+space+practical DONE (14; totals 92 lessons, 1186 Q, 641 cards; every concept covered, Cambridge 76/76, ZIMSEC 81/81; Cambridge 5.2.4 also covers nuclear.uses-safety). PLAN: breadth first, then a deepening pass (+exam-style Q per concept to ~16-20). Next: assessments, import, dev publish, smoke, README; then a DEEPENING PASS (~16-20 Q/concept, more exam-style) and a DIAGRAM PASS (PNG via sharp from SVG: circuit symbols, ray diagrams, field patterns, wave diagrams; media/media.json), assessments (topic tests + Cambridge mocks), import, dev publish, smoke, README.

Main-thread fixes 2026-10-08 (late morning):
- Marking: typed answer-box text is stripped before reading numbers (stripAnswerAffixes in src/lib/questions/number.ts; numeric.ts/calculation.ts/mark.ts pass payload answerPrefix/unitHint). "US$16.20", "x = 5", "x400", "pH 7", "12:1" (unitHint ": 1") now mark correctly; tests added; typecheck + lint clean.
- Self-check: powers-of-ten exponents (10^{-18}) no longer count as distinctive numbers (self-check.ts + test).

OWNER 2026-10-08 ~11:35: "Can you not deploy agents to start on other subjects even if you are not on ultracode" -> tried to launch content-subject.js for english-language-o (args from content-subjects.json waveB); the auto-mode classifier DENIED the Workflow call. Waiting for the owner to allow Workflow; then launch english-language-o (+ geography-o once chemistry finishes; RAM 2.37 GB free, disk 8.5 GB).
OWNER 2026-10-08 11:35: "I Approve" -> launched english-language-o: run wf_7e68f74c-96b (task waqkjy152), exact args = content-subjects.json waveB[0]. Next: geography-o (waveB[1]) as soon as chemistry wf_1c5aca19-41d finishes (RAM 1.9 GB free at launch, disk 8.4 GB). Main session meanwhile: combined-science-o directly.

## HANDOFF TO CLOUD (2026-10-08 ~12:30 SAST) — read this first
- Repo: https://github.com/allandeka379-alt/LearningPortal (main). `.scratch/` is ignored except these tracked folders: physics/, combined-science/, chem-assemble2/, tools/, workflows/ and the notes files. Downloaded syllabus PDFs and their text extracts (`.scratch/**/sources/`) are NOT in git (copyright); they exist only on the owner's PC.
- Owner 2026-10-08 ~12:10: "pause the parallel agents to save tokens" -> both workflow runs STOPPED. english-language-o wf_7e68f74c-96b was still in Plan (nothing written to content/). chemistry-o wf_1c5aca19-41d was stopped in Assemble; "Finish the chemistry one" -> finished directly: the assemble agent had balanced MCQ answer positions AFTER publishing (414 questions changed, script .scratch/chem-assemble2/rebalance-mcq.cjs, letter-reference scan clean), so: content:import (414 CONFLICT drafts), DEV publish (414 published, 0 failed), smoke 37/37 PASS, validate --strict 0/0.
- Chemistry still TODO (no DB needed): content/subjects/chemistry-o/README.md (model: content/subjects/biology-o/README.md; data: .scratch/chem-assemble2/coverage.md, agent-outputs.json (review results), review-unresolved.txt, check-rare.txt; smoke 37/37; validate 0/0; totals 104 lessons, 2,114 questions), the chemistry row in content/README.md, a line in docs/STATUS.md.
- MCQ answer-position bias (found by the chemistry assemble agent): the player shows options in stored order (payload.shuffleOptions defaults to false), so a bank whose key is usually A can be gamed. chemistry-o is fixed. physics-o and combined-science-o (written directly) put the key at A almost always and multi-select keys first: wire `.scratch/tools/rebalance-mcq.mjs` (`rebalanceQuestions(questions, fileId)`) into `.scratch/physics/build-content.mjs` and `.scratch/combined-science/build-content.mjs` just before each file is written, rebuild, then validate --strict + content:check. Then on the owner's PC (needs the DB): content:import -- --family physics-o (CONFLICT drafts) + DEV publish + `npx tsx --conditions=react-server .scratch/physics/smoke.ts`. Check mathematics-o and biology-o answer positions too (count keys per letter).
- Combined Science (combined-science-o, written directly): syllabus + registry from `node .scratch/combined-science/build-syllabus.mjs` (ZIMSEC 2015-2022, conceptFamilies bio/chem/phys/maths, 83 nodes, 182 objectives, 7 cs.* concepts). Done: lessons + question slices for cs.health.hygiene-and-transmission, cs.health.ebola, cs.industry.peanut-processing, cs.physics.fluid-systems, cs.physics.gears (5 lessons, 102 Q, 46 cards; validate --strict 0/0). TODO: content:check flags physics.gears.q14 (shares 14 and 42 with the lesson's bicycle section: change the gear numbers); lessons + slices for cs.physics.solar-heating (7.3.4.5) and cs.physics.telecommunication (7.3.4.6); assessments (topic tests per section drawing on borrowed families, Paper 1-style 40 x 1-mark MCQ mock, Paper 2-style mock); README; then on the owner's PC: import combined-science-o and RE-IMPORT biology-o, chemistry-o, physics-o, mathematics-o (retags them to Combined Science), DEV publish, smoke.
- Cloud notes: no Postgres / dev data in the cloud (scripts/db-local.ps1 is Windows-only), so do only DB-free work there (generators, content:validate, content:check, typecheck/tests that skip the DB with VITEST_SKIP_DB_SETUP=1). `npm ci` first; `npm run db:generate` before typecheck.
- After that: waveB subjects from content-subjects.json, one at a time, directly (no Workflow fan-outs unless the owner asks).

## CLOUD SESSION 2026-10-08 (branch main-uma1fn) — done, and the queue for the owner's PC
Done (DB-free, all pushed to origin/main-uma1fn):
- chemistry-o README (content/subjects/chemistry-o/README.md) + row in content/README.md; family stats tool .scratch/tools/family-stats.mjs.
- MCQ answer-position balance: physics-o + combined-science-o generators call rebalanceQuestions() before writing; mathematics-o (524 keys moved, was A 712/768) and biology-o (224 moved) rebalanced once in place with .scratch/tools/rebalance-files.mjs (do NOT re-run it on those families: multi-select reorder is not idempotent). Text fill-in blanks in the physics/CS generators now strip punctuation (7 physics files changed).
- combined-science-o: gears q14 fixed; new cs.physics.solar-heating + cs.physics.telecommunication (lessons, 22 Q + 10 cards each); 24 old CS MCQs de-cued (key no longer clearly longest); 19 topic tests + Paper 1/Paper 2 mocks (.scratch/combined-science/build-assessments.mjs, inventory.ts, coverage.ts, stats.mjs, alt-check.ts); README written.
- Validate the CS blueprints only with all five families loaded: npm run content:validate -- combined-science-o biology-o chemistry-o physics-o mathematics-o --strict --no-cache -> 0/0.

QUEUE FOR THE OWNER'S PC (needs the DB), in order:
1. git pull (branch main-uma1fn, or main after merge); npm run db:generate.
2. npm run content:import -- --family combined-science-o
3. Re-import (CONFLICT drafts expected for rebalanced MCQs; also tags borrowed items to Combined Science topics):
   npm run content:import -- --family mathematics-o ; biology-o ; physics-o ; chemistry-o (chemistry only for the CS tags).
4. DEV publish each of the five families: npm run content:publish -- --approver demo.admin@example.test --family <family> (with the usual DEV PREVIEW ONLY note).
5. Smoke: npx tsx --conditions=react-server .scratch/physics/smoke.ts ; a Combined Science smoke script is still to be written (model: .scratch/chem-assemble2/smoke.ts).

Next content work (cloud or PC): waveB subjects from .scratch/content-subjects.json, starting with english-language-o. Quality follow-ups: length-cue editing pass for physics-o/biology-o/chemistry-o MCQs; physics-o deepening (exam-style) and independent review.
