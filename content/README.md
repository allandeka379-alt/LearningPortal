# content/

The version-controlled source of the platform's study content: syllabus topic trees, concept registries, lessons,
questions, flashcards, tests and media. **Read `docs/CONTENT_PIPELINE.md` before adding anything.**

```
concepts/<family>.json                                     concept registry of a subject family
syllabi/<board>/<qualification>/<subject>/<version>.json   one syllabus version
subjects/<family>/{lessons,questions,flashcards,assessments,media}/
```

Workflow: write files → `npm run content:validate` → `npm run content:import -- --family <family>` → review at
`/admin/review/topics` → `npm run content:publish -- --approver <your email>` (a human attestation that the content
was reviewed).

Families (each family has its own `subjects/<family>/README.md` with coverage, review statistics and known gaps once
its run completes; counts change as the runs write, so check `npm run content:validate -- <family>`):

| Family | Syllabi | Status (2026-10-08) |
| --- | --- | --- |
| `mathematics-o` | ZIMSEC O-Level Mathematics (4004), Cambridge IGCSE Mathematics (0580) | Complete: 107 lessons, 2,133 questions, 1,073 flashcards, 23 topic tests, 4 mock exams, 1 fixed quadratics test; independent AI review fixed 640 defects; DEV preview only, awaiting human review |
| `biology-o` | ZIMSEC O-Level Biology, Cambridge IGCSE Biology (0610) | Complete: 95 lessons, 2,061 questions, 1,019 flashcards, 34 topic tests, 5 mock exams; independent AI review fixed 365 defects; DEV preview only, awaiting human review |
| `chemistry-o` | ZIMSEC O-Level Chemistry, Cambridge IGCSE Chemistry (0620) | Complete: 104 lessons, 2,114 questions, 1,056 flashcards, 35 topic tests, 5 mock exams; two independent AI review passes fixed 461 defects; DEV preview only, awaiting human review |
| `physics-o` | ZIMSEC O-Level Physics, Cambridge IGCSE Physics (0625) | Complete (breadth): 92 lessons, 1,186 questions, 641 flashcards, 21 topic tests, 2 Cambridge mocks, 1 ZIMSEC practice exam; written in the main session with automated checks only (no independent AI review yet); DEV preview only, awaiting human review |
| `combined-science-o` | ZIMSEC O-Level Combined Science (borrows biology-o, chemistry-o, physics-o and mathematics-o through `conceptFamilies`) | Complete: 7 own lessons, 146 questions, 66 flashcards (2,996 questions and 163 lessons available with borrowed content), 19 topic tests, 2 mock exams; written in the main session with automated checks only; DEV-published 2026-10-08, smoke 57/57 |
| `english-language-o` | ZIMSEC O-Level English Language, Cambridge IGCSE First Language English (0500), Cambridge IGCSE English as a Second Language (0510) | Complete: 60 lessons, 1,047 questions (67% of marks self-marked writing), 533 flashcards, 16 topic tests, 5 mock exams; written by eight AI writer agents with automated checks and a sample review (no independent AI review yet); DEV-published 2026-10-08, smoke 69/69 |
| `geography-o` | ZIMSEC O-Level Geography, Cambridge IGCSE Geography (0460) | Complete: 111 lessons, 2,253 questions, 986 flashcards, 23 topic tests, 5 mock exams; written by ten AI writer agents with automated checks (no independent AI review yet); DEV-published 2026-10-08, smoke 74/74 |
| `accounting-o` | ZIMSEC O-Level Principles of Accounting, Cambridge IGCSE Accounting (0452) | Complete: 66 lessons, 1,268 questions, 573 flashcards, 13 topic tests, 4 mock exams; written by eight AI writer agents, every figure balance-checked in code (no independent AI review yet); DEV-published 2026-10-08, smoke 52/52 |
| `economics-o` | ZIMSEC O-Level Economics, Cambridge IGCSE Economics (0455) | Complete: 92 lessons, 1,741 questions, 808 flashcards, 14 topic tests, 5 mock exams; written by eight AI writer agents, figures computed in code (no independent AI review yet); DEV-published 2026-10-09, smoke 56/56 |
| `computer-science-o` | ZIMSEC O-Level Computer Science, Cambridge IGCSE Computer Science (0478) | Complete: 102 lessons, 1,926 questions, 897 flashcards, 21 topic tests, 4 mock exams; written by nine AI writer agents, conversions and traces computed in code (no independent AI review yet); DEV-published 2026-10-09, smoke 68/68 |
| `business-commerce-o` | ZIMSEC O-Level Commerce, ZIMSEC O-Level Business Enterprise and Skills, Cambridge IGCSE Business (0264) | Complete: 128 lessons, 2,301 questions, 1,091 flashcards, 23 topic tests, 6 mock exams; written by eight AI writer agents (no independent AI review yet); DEV-published 2026-10-09, smoke 85/85 |
| `agriculture-o` | ZIMSEC O-Level Agriculture, Cambridge IGCSE Agriculture (0600) | Complete: 102 lessons, 2,052 questions, 902 flashcards, 15 topic tests, 3 mock exams; written by eight AI writer agents (no independent AI review yet); DEV-published 2026-10-09, smoke 54/54 |
| `history-o` | ZIMSEC O-Level History, Cambridge IGCSE History (0470) | Complete: 111 lessons, 2,223 questions, 1,015 flashcards, 18 topic tests, 5 mock exams; written by eight AI writer agents, invented sources only (no independent AI review yet); DEV-published 2026-10-09, smoke 64/64 |
| `heritage-studies-o` | ZIMSEC O-Level Heritage Studies | Complete: 95 lessons, 1,757 questions, 846 flashcards, 9 topic tests, 2 mock exams; written by eight AI writer agents (no independent AI review yet); DEV-published 2026-10-09, smoke 31/31 |
| `additional-mathematics-o` | ZIMSEC O-Level Additional Mathematics, Cambridge IGCSE Additional Mathematics (0606) | Complete: 89 lessons, 1,767 questions, 766 flashcards, 31 topic tests, 4 mock exams; written by eight AI writer agents, every answer computed in code (no independent AI review yet); DEV-published 2026-10-09, smoke 88/88 |
| `biology-a` | ZIMSEC A-Level Biology, Cambridge International AS & A Level Biology (9700) | Complete: 106 lessons, 2,208 questions, 923 flashcards, 34 topic tests, 9 mock exams; written by eight AI writer agents, every calculation computed in code (no independent AI review yet); DEV-published 2026-10-10, smoke 104/104 |
| `mathematics-a` | ZIMSEC A-Level Pure Mathematics, Statistics and Mechanics; Cambridge International AS & A Level Mathematics (9709) | Complete: 110 lessons, 2,262 questions, 944 flashcards, 43 topic tests, 12 mock exams; written by eight AI writer agents, every answer computed in code (no independent AI review yet); DEV-published 2026-10-10, smoke 146/146 |
| `physics-a` | ZIMSEC A-Level Physics, Cambridge International AS & A Level Physics (9702) | Complete: 99 lessons, 2,218 questions, 870 flashcards, 33 topic tests, 9 mock exams; written by eight AI writer agents, every calculation computed in code (no independent AI review yet); DEV-published 2026-10-10, smoke 102/102 |
| `chemistry-a` | ZIMSEC A-Level Chemistry, Cambridge International AS & A Level Chemistry (9701) | Complete: 111 lessons, 2,473 questions, 975 flashcards, 55 topic tests, 9 mock exams; written by eight AI writer agents, every calculation computed in code (no independent AI review yet); DEV-published 2026-10-10, smoke 146/146 |
| `religious-studies-o` | ZIMSEC O-Level Family and Religious Studies | Complete: 89 lessons, 1,670 questions, 783 flashcards, 15 topic tests, 2 mock exams; written by eight AI writer agents (Sonnet; no independent AI review yet); DEV-published 2026-10-10, smoke 43/43 |
| `economics-a` | ZIMSEC A-Level Economics, Cambridge International AS & A Level Economics (9708) | Complete: 106 lessons, 2,395 questions, 947 flashcards, 23 topic tests, 7 mock exams; written by eight AI writer agents (Sonnet), every calculation computed in code (no independent AI review); DEV-published 2026-10-15, smoke 78/78 |

Every item is AI-written and imported as `aiGenerated`; nothing reaches students in production until a human reviewer
publishes it (§41). The ZIMSEC syllabus trees were transcribed from secondary or third-party copies and must be checked
against the official documents.
