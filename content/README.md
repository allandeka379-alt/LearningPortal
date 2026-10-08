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

Every item is AI-written and imported as `aiGenerated`; nothing reaches students in production until a human reviewer
publishes it (§41). The ZIMSEC syllabus trees were transcribed from secondary or third-party copies and must be checked
against the official documents.
