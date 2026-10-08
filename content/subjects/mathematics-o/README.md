# Mathematics (O-Level / IGCSE) — `mathematics-o`

Original study content for **ZIMSEC O-Level Mathematics (4004, syllabus 2015-2022)** and **Cambridge IGCSE
Mathematics (0580, syllabus 2025-2027)**, written once per concept and tagged to both syllabi through the concept
registry (`content/concepts/mathematics-o.json`). Formats, quality bar and workflow: `docs/CONTENT_PIPELINE.md`.

> **Review status.** Every item was written by AI writing agents and checked by a second, independent AI review pass
> (statistics below). **No human has reviewed it yet.** On 2026-10-08 the family was imported into the DEV database and
> published there **for a local preview only** (`--approver demo.admin@example.test`, with a note on every approval
> that it is not a human attestation). Production publishing requires a human reviewer (§41): review at
> `/admin/review/topics`, then `npm run content:publish -- --approver <reviewer email>`.

## At a glance

| | Total | ZIMSEC 4004 | Cambridge 0580 |
| --- | --- | --- | --- |
| Concepts with content | 109 of 109 | 95 of 95 covered | 98 of 98 covered |
| Lessons (free preview) | 107 (16) | 93 (16) | 96 (15) |
| Questions | 2,133 | 1,829 | 1,892 |
| Flashcards | 1,073 | 923 | 950 |
| Topic tests | 23 + 1 | 14 + quadratics | 9 + quadratics |
| Mock exams | 4 | Paper 1, Paper 2 | Paper 2, Paper 4 |
| Images | 0 | | |

Questions by type: 621 multiple choice, 197 true/false, 598 numerical or calculation, 74 short answer, 157
fill-in-the-blank, 90 matching, 395 structured (multi-part) and 1 extended response. By difficulty
(1 recall … 5 top-grade problem): 170 / 649 / 785 / 398 / 131. 438 questions are marked exam-style (the mocks draw
these), 318 are daily-question eligible (free tier), and 52 contain "show that" or "explain" parts worth 120 marks in
total that students mark against our mark-scheme points (AI marking is switched off).

Lessons run to roughly 700–1,650 words (median about 1,100), each with key definitions, at least two fully worked
examples, common mistakes, exam tips and a summary.

Validation: `npm run content:validate -- mathematics-o` gives **0 errors and 0 warnings**, which includes rendering
every lesson, question and flashcard, marking every `modelResponse` (full marks) and `wrongResponse` (less) with the
real marking engine, and proving every assessment blueprint can be filled from the bank for its syllabus.

## Coverage by syllabus topic

Columns: lessons (of which free preview), questions, questions by type (MCQ, true/false, numerical or calculation,
short answer, fill-in-the-blank, matching, structured, extended response), questions by difficulty d1–d5, exam-style
questions, flashcards, and whether the topic has a topic test. Subtopics marked *(Extended)* are examined only on
Cambridge Papers 2 and 4.

#### ZIMSEC O-Level Mathematics (4004) — version 2015-2022

Items are counted under every topic they are tagged to (a few questions span two topics), so topic rows can add up to more than the syllabus total.

| Topic | Lessons (free) | Questions | MCQ | T/F | Num/Calc | Short | Fill | Match | Struct | Ext | d1 | d2 | d3 | d4 | d5 | Exam-style | Flashcards | Topic test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **1 Real numbers** | **15 (2)** | **297** | 76 | 21 | 89 | 24 | 17 | 16 | 54 | 0 | 25 | 96 | 101 | 54 | 21 | 65 | **148** | yes |
| &nbsp;&nbsp;1.1 Number concepts and operations | 8 (1) | 157 | 47 | 13 | 43 | 8 | 10 | 9 | 27 | 0 | 15 | 55 | 53 | 26 | 8 | 27 | 77 |  |
| &nbsp;&nbsp;1.2 Approximations and estimations | 2 (0) | 40 | 9 | 2 | 16 | 0 | 3 | 2 | 8 | 0 | 3 | 9 | 15 | 9 | 4 | 12 | 20 |  |
| &nbsp;&nbsp;1.3 Ratios, rates and proportions | 2 (1) | 40 | 11 | 2 | 15 | 0 | 2 | 2 | 8 | 0 | 2 | 17 | 11 | 7 | 3 | 11 | 21 |  |
| &nbsp;&nbsp;1.4 Ordinary and standard form | 1 (0) | 20 | 3 | 1 | 2 | 8 | 1 | 1 | 4 | 0 | 2 | 5 | 7 | 5 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;1.5 Number bases | 1 (0) | 20 | 2 | 1 | 6 | 7 | 0 | 1 | 3 | 0 | 2 | 4 | 7 | 4 | 3 | 6 | 10 |  |
| &nbsp;&nbsp;1.6 Scales and simple map problems | 1 (0) | 20 | 4 | 2 | 7 | 1 | 1 | 1 | 4 | 0 | 1 | 6 | 8 | 3 | 2 | 5 | 10 |  |
| **2 Sets** | **2 (1)** | **40** | 16 | 4 | 7 | 0 | 3 | 2 | 8 | 0 | 3 | 9 | 14 | 9 | 5 | 8 | **20** | yes |
| **3 Financial mathematics** | **6 (1)** | **120** | 25 | 10 | 47 | 0 | 6 | 6 | 26 | 0 | 6 | 36 | 45 | 23 | 10 | 31 | **60** | yes |
| &nbsp;&nbsp;3.1 Consumer arithmetic | 6 (1) | 120 | 25 | 10 | 47 | 0 | 6 | 6 | 26 | 0 | 6 | 36 | 45 | 23 | 10 | 31 | 60 |  |
| **4 Measures and mensuration** | **7 (1)** | **135** | 27 | 13 | 52 | 5 | 6 | 7 | 25 | 0 | 8 | 41 | 48 | 29 | 9 | 35 | **67** | yes |
| &nbsp;&nbsp;4.1 Measures | 2 (0) | 35 | 7 | 3 | 13 | 4 | 1 | 2 | 5 | 0 | 3 | 14 | 9 | 8 | 1 | 7 | 18 |  |
| &nbsp;&nbsp;4.2 Mensuration | 5 (1) | 100 | 20 | 10 | 39 | 1 | 5 | 5 | 20 | 0 | 5 | 27 | 39 | 21 | 8 | 28 | 49 |  |
| **5 Graphs** | **9 (1)** | **178** | 61 | 18 | 42 | 8 | 12 | 8 | 29 | 0 | 22 | 61 | 61 | 28 | 6 | 32 | **90** | yes |
| &nbsp;&nbsp;5.1 Functional graphs | 8 (1) | 158 | 56 | 16 | 35 | 8 | 11 | 7 | 25 | 0 | 19 | 55 | 54 | 25 | 5 | 28 | 80 |  |
| &nbsp;&nbsp;5.2 Travel graphs | 1 (0) | 20 | 5 | 2 | 7 | 0 | 1 | 1 | 4 | 0 | 3 | 6 | 7 | 3 | 1 | 4 | 10 |  |
| **6 Variation** | **2 (1)** | **40** | 9 | 4 | 12 | 2 | 2 | 2 | 9 | 0 | 2 | 9 | 16 | 10 | 3 | 11 | **20** | yes |
| **7 Algebra** | **15 (2)** | **281** | 98 | 25 | 61 | 15 | 25 | 14 | 42 | 1 | 20 | 90 | 104 | 53 | 14 | 51 | **145** | yes |
| &nbsp;&nbsp;7.1 Algebraic manipulation | 5 (1) | 103 | 42 | 8 | 13 | 10 | 10 | 5 | 15 | 0 | 6 | 35 | 37 | 21 | 4 | 15 | 50 |  |
| &nbsp;&nbsp;7.2 Equations | 4 (1) | 60 | 16 | 6 | 18 | 1 | 6 | 3 | 9 | 1 | 3 | 21 | 24 | 10 | 2 | 16 | 35 |  |
| &nbsp;&nbsp;7.3 Inequalities | 3 (0) | 60 | 25 | 6 | 8 | 4 | 5 | 3 | 9 | 0 | 6 | 20 | 20 | 10 | 4 | 10 | 30 |  |
| &nbsp;&nbsp;7.4 Indices and logarithms | 3 (0) | 60 | 16 | 5 | 22 | 1 | 4 | 3 | 9 | 0 | 5 | 16 | 23 | 12 | 4 | 10 | 30 |  |
| **8 Geometry** | **12 (1)** | **246** | 76 | 23 | 79 | 4 | 9 | 8 | 47 | 0 | 20 | 93 | 82 | 38 | 13 | 48 | **123** | yes |
| &nbsp;&nbsp;8.1 Points, lines and angles | 3 (1) | 64 | 21 | 6 | 21 | 1 | 3 | 2 | 10 | 0 | 7 | 30 | 17 | 7 | 3 | 11 | 33 |  |
| &nbsp;&nbsp;8.2 Bearing | 1 (0) | 22 | 5 | 2 | 7 | 1 | 1 | 1 | 5 | 0 | 2 | 8 | 8 | 3 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;8.3 Polygons | 1 (0) | 22 | 5 | 2 | 10 | 0 | 1 | 1 | 3 | 0 | 1 | 9 | 7 | 4 | 1 | 5 | 11 |  |
| &nbsp;&nbsp;8.4 Similarity and congruency | 2 (0) | 40 | 15 | 3 | 9 | 0 | 2 | 1 | 10 | 0 | 2 | 14 | 15 | 6 | 3 | 8 | 20 |  |
| &nbsp;&nbsp;8.5 Constructions and loci | 2 (0) | 41 | 18 | 4 | 9 | 1 | 1 | 0 | 8 | 0 | 3 | 17 | 13 | 7 | 1 | 7 | 20 |  |
| &nbsp;&nbsp;8.6 Symmetry | 1 (0) | 17 | 4 | 2 | 5 | 0 | 1 | 1 | 4 | 0 | 2 | 4 | 7 | 3 | 1 | 4 | 9 |  |
| &nbsp;&nbsp;8.7 Circle properties | 2 (0) | 40 | 8 | 4 | 18 | 1 | 0 | 2 | 7 | 0 | 3 | 11 | 15 | 8 | 3 | 9 | 20 |  |
| **9 Statistics** | **7 (1)** | **137** | 41 | 15 | 43 | 1 | 8 | 3 | 26 | 0 | 16 | 35 | 53 | 27 | 6 | 21 | **69** | yes |
| **10 Trigonometry** | **5 (1)** | **107** | 23 | 8 | 43 | 0 | 4 | 3 | 26 | 0 | 5 | 27 | 43 | 24 | 8 | 28 | **50** | yes |
| &nbsp;&nbsp;10.1 Pythagoras theorem | 1 (1) | 19 | 4 | 1 | 9 | 0 | 1 | 0 | 4 | 0 | 1 | 5 | 10 | 2 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;10.2 Trigonometrical ratios | 4 (0) | 88 | 19 | 7 | 34 | 0 | 3 | 3 | 22 | 0 | 4 | 22 | 33 | 22 | 7 | 25 | 40 |  |
| **11 Vectors** | **3 (1)** | **60** | 21 | 7 | 12 | 1 | 6 | 3 | 10 | 0 | 6 | 18 | 23 | 9 | 4 | 10 | **30** | yes |
| **12 Matrices** | **2 (1)** | **40** | 12 | 4 | 9 | 0 | 6 | 2 | 7 | 0 | 4 | 9 | 18 | 7 | 2 | 7 | **20** | yes |
| **13 Transformation** | **4 (1)** | **81** | 27 | 9 | 14 | 0 | 12 | 3 | 16 | 0 | 8 | 23 | 32 | 14 | 4 | 16 | **41** | yes |
| **14 Probability** | **4 (1)** | **79** | 19 | 8 | 27 | 0 | 7 | 1 | 17 | 0 | 9 | 23 | 30 | 13 | 4 | 15 | **40** | yes |
| **All topics (distinct items)** | **93 (16)** | **1829** | 530 | 169 | 532 | 60 | 123 | 78 | 336 | 1 | 154 | 569 | 666 | 333 | 107 | 372 | **923** |  |

#### Cambridge IGCSE Mathematics (0580) — version 2025-2027

Items are counted under every topic they are tagged to (a few questions span two topics), so topic rows can add up to more than the syllabus total.

| Topic | Lessons (free) | Questions | MCQ | T/F | Num/Calc | Short | Fill | Match | Struct | Ext | d1 | d2 | d3 | d4 | d5 | Exam-style | Flashcards | Topic test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **1 Number** | **23 (4)** | **460** | 119 | 32 | 140 | 26 | 30 | 24 | 89 | 0 | 34 | 140 | 155 | 94 | 37 | 108 | **229** | yes |
| &nbsp;&nbsp;1.1 Types of number | 2 (1) | 40 | 12 | 4 | 10 | 2 | 3 | 2 | 7 | 0 | 4 | 15 | 12 | 7 | 2 | 7 | 20 |  |
| &nbsp;&nbsp;1.2 Sets | 2 (1) | 38 | 15 | 4 | 6 | 0 | 3 | 2 | 8 | 0 | 3 | 9 | 12 | 9 | 5 | 8 | 19 |  |
| &nbsp;&nbsp;1.3 Powers and roots | 1 (0) | 20 | 6 | 1 | 8 | 0 | 1 | 1 | 3 | 0 | 2 | 7 | 6 | 4 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;1.4 Fractions, decimals and percentages | 1 (0) | 20 | 5 | 1 | 4 | 4 | 1 | 1 | 4 | 0 | 2 | 7 | 6 | 4 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;1.5 Ordering | 1 (0) | 20 | 10 | 2 | 1 | 0 | 2 | 2 | 3 | 0 | 2 | 5 | 7 | 5 | 1 | 3 | 9 |  |
| &nbsp;&nbsp;1.6 The four operations | 1 (0) | 21 | 4 | 1 | 9 | 2 | 0 | 1 | 4 | 0 | 2 | 6 | 8 | 3 | 2 | 5 | 10 |  |
| &nbsp;&nbsp;1.7 Indices I | 1 (0) | 20 | 4 | 1 | 9 | 1 | 1 | 1 | 3 | 0 | 2 | 6 | 6 | 4 | 2 | 4 | 10 |  |
| &nbsp;&nbsp;1.8 Standard form | 1 (0) | 20 | 3 | 1 | 2 | 8 | 1 | 1 | 4 | 0 | 2 | 5 | 7 | 5 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;1.9 Estimation | 1 (0) | 20 | 5 | 1 | 8 | 0 | 1 | 1 | 4 | 0 | 2 | 5 | 8 | 4 | 1 | 5 | 10 |  |
| &nbsp;&nbsp;1.10 Limits of accuracy | 1 (0) | 20 | 4 | 1 | 8 | 0 | 2 | 1 | 4 | 0 | 1 | 4 | 7 | 5 | 3 | 7 | 10 |  |
| &nbsp;&nbsp;1.11 Ratio and proportion | 1 (1) | 20 | 6 | 1 | 7 | 0 | 1 | 1 | 4 | 0 | 1 | 8 | 6 | 3 | 2 | 5 | 11 |  |
| &nbsp;&nbsp;1.12 Rates | 1 (0) | 20 | 5 | 1 | 8 | 0 | 1 | 1 | 4 | 0 | 1 | 9 | 5 | 4 | 1 | 6 | 10 |  |
| &nbsp;&nbsp;1.13 Percentages | 3 (1) | 60 | 15 | 5 | 21 | 0 | 3 | 3 | 13 | 0 | 3 | 19 | 23 | 11 | 4 | 14 | 30 |  |
| &nbsp;&nbsp;1.14 Using a calculator | 1 (0) | 20 | 4 | 1 | 9 | 1 | 0 | 1 | 4 | 0 | 1 | 7 | 6 | 5 | 1 | 6 | 10 |  |
| &nbsp;&nbsp;1.15 Time | 1 (0) | 20 | 3 | 1 | 5 | 6 | 0 | 1 | 4 | 0 | 2 | 5 | 6 | 5 | 2 | 6 | 10 |  |
| &nbsp;&nbsp;1.16 Money | 2 (0) | 40 | 8 | 3 | 16 | 0 | 2 | 2 | 9 | 0 | 2 | 14 | 14 | 7 | 3 | 9 | 20 |  |
| &nbsp;&nbsp;1.17 Exponential growth and decay (Extended) | 1 (0) | 20 | 4 | 2 | 8 | 0 | 1 | 1 | 4 | 0 | 1 | 4 | 9 | 4 | 2 | 5 | 10 |  |
| &nbsp;&nbsp;1.18 Surds (Extended) | 1 (0) | 21 | 6 | 1 | 1 | 2 | 7 | 1 | 3 | 0 | 1 | 5 | 7 | 5 | 3 | 6 | 10 |  |
| **2 Algebra and graphs** | **24 (3)** | **460** | 155 | 43 | 104 | 17 | 43 | 22 | 75 | 1 | 32 | 144 | 177 | 86 | 21 | 84 | **235** | yes |
| &nbsp;&nbsp;2.1 Introduction to algebra | 1 (1) | 20 | 6 | 1 | 7 | 1 | 1 | 1 | 3 | 0 | 2 | 8 | 6 | 4 | 0 | 3 | 10 |  |
| &nbsp;&nbsp;2.2 Algebraic manipulation | 2 (0) | 43 | 16 | 3 | 4 | 7 | 5 | 2 | 6 | 0 | 2 | 17 | 15 | 7 | 2 | 6 | 21 |  |
| &nbsp;&nbsp;2.3 Algebraic fractions (Extended) | 1 (0) | 20 | 8 | 2 | 1 | 2 | 3 | 1 | 3 | 0 | 1 | 5 | 8 | 5 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;2.4 Indices II | 1 (0) | 20 | 7 | 2 | 5 | 0 | 2 | 1 | 3 | 0 | 1 | 5 | 9 | 4 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;2.5 Equations | 6 (1) | 100 | 33 | 10 | 21 | 1 | 11 | 5 | 18 | 1 | 4 | 30 | 40 | 21 | 5 | 25 | 54 |  |
| &nbsp;&nbsp;2.6 Inequalities | 2 (0) | 40 | 17 | 4 | 5 | 3 | 3 | 2 | 6 | 0 | 4 | 13 | 14 | 7 | 2 | 7 | 20 |  |
| &nbsp;&nbsp;2.7 Sequences | 2 (0) | 40 | 11 | 4 | 12 | 1 | 4 | 2 | 6 | 0 | 3 | 12 | 17 | 6 | 2 | 6 | 20 |  |
| &nbsp;&nbsp;2.8 Proportion (Extended) | 1 (1) | 20 | 5 | 2 | 6 | 1 | 1 | 1 | 4 | 0 | 1 | 5 | 8 | 5 | 1 | 5 | 10 |  |
| &nbsp;&nbsp;2.9 Graphs in practical situations | 2 (0) | 39 | 11 | 4 | 12 | 0 | 3 | 2 | 7 | 0 | 5 | 14 | 12 | 7 | 1 | 7 | 20 |  |
| &nbsp;&nbsp;2.10 Graphs of functions | 1 (0) | 20 | 7 | 1 | 4 | 0 | 3 | 1 | 4 | 0 | 2 | 9 | 6 | 2 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;2.11 Sketching curves | 1 (0) | 20 | 9 | 2 | 2 | 0 | 3 | 1 | 3 | 0 | 1 | 5 | 10 | 3 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;2.12 Differentiation (Extended) | 2 (0) | 40 | 12 | 4 | 13 | 2 | 2 | 1 | 6 | 0 | 3 | 12 | 16 | 7 | 2 | 6 | 20 |  |
| &nbsp;&nbsp;2.13 Functions (Extended) | 2 (0) | 40 | 14 | 4 | 12 | 0 | 2 | 2 | 6 | 0 | 3 | 11 | 16 | 8 | 2 | 6 | 20 |  |
| **3 Coordinate geometry** | **7 (1)** | **140** | 47 | 16 | 28 | 11 | 10 | 6 | 22 | 0 | 16 | 45 | 49 | 25 | 5 | 27 | **70** | yes |
| &nbsp;&nbsp;3.1 Coordinates | 1 (0) | 20 | 8 | 2 | 3 | 2 | 2 | 1 | 2 | 0 | 3 | 7 | 8 | 2 | 0 | 2 | 10 |  |
| &nbsp;&nbsp;3.2 Drawing linear graphs | 1 (1) | 20 | 7 | 2 | 3 | 1 | 2 | 1 | 4 | 0 | 2 | 10 | 4 | 4 | 0 | 4 | 10 |  |
| &nbsp;&nbsp;3.3 Gradient of linear graphs | 1 (0) | 20 | 7 | 2 | 6 | 0 | 1 | 1 | 3 | 0 | 3 | 6 | 8 | 3 | 0 | 3 | 10 |  |
| &nbsp;&nbsp;3.4 Length and midpoint (Extended) | 1 (0) | 20 | 6 | 2 | 5 | 1 | 2 | 0 | 4 | 0 | 2 | 6 | 7 | 4 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;3.5 Equations of linear graphs | 1 (0) | 20 | 7 | 2 | 3 | 3 | 1 | 1 | 3 | 0 | 2 | 5 | 8 | 4 | 1 | 5 | 10 |  |
| &nbsp;&nbsp;3.6 Parallel lines | 1 (0) | 20 | 6 | 3 | 4 | 2 | 1 | 1 | 3 | 0 | 3 | 6 | 6 | 4 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;3.7 Perpendicular lines (Extended) | 1 (0) | 20 | 6 | 3 | 4 | 2 | 1 | 1 | 3 | 0 | 1 | 5 | 8 | 4 | 2 | 5 | 10 |  |
| **4 Geometry** | **10 (1)** | **200** | 52 | 19 | 74 | 3 | 8 | 8 | 36 | 0 | 17 | 72 | 69 | 31 | 11 | 40 | **101** | yes |
| &nbsp;&nbsp;4.1 Geometrical terms | 1 (0) | 24 | 12 | 2 | 3 | 1 | 1 | 1 | 4 | 0 | 5 | 14 | 4 | 1 | 0 | 2 | 12 |  |
| &nbsp;&nbsp;4.2 Geometrical constructions | 1 (0) | 13 | 4 | 1 | 5 | 0 | 1 | 0 | 2 | 0 | 1 | 6 | 4 | 2 | 0 | 2 | 7 |  |
| &nbsp;&nbsp;4.3 Scale drawings | 2 (0) | 39 | 7 | 4 | 14 | 1 | 2 | 2 | 9 | 0 | 3 | 12 | 15 | 6 | 3 | 9 | 18 |  |
| &nbsp;&nbsp;4.4 Similarity | 1 (0) | 20 | 5 | 1 | 9 | 0 | 1 | 0 | 4 | 0 | 1 | 6 | 8 | 3 | 2 | 5 | 10 |  |
| &nbsp;&nbsp;4.5 Symmetry | 1 (0) | 22 | 7 | 3 | 6 | 0 | 1 | 1 | 4 | 0 | 2 | 5 | 10 | 4 | 1 | 4 | 12 |  |
| &nbsp;&nbsp;4.6 Angles | 2 (1) | 42 | 9 | 4 | 19 | 0 | 2 | 2 | 6 | 0 | 2 | 18 | 13 | 7 | 2 | 9 | 22 |  |
| &nbsp;&nbsp;4.7 Circle theorems I | 1 (0) | 20 | 4 | 2 | 8 | 1 | 0 | 1 | 4 | 0 | 1 | 6 | 8 | 4 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;4.8 Circle theorems II (Extended) | 1 (0) | 20 | 4 | 2 | 10 | 0 | 0 | 1 | 3 | 0 | 2 | 5 | 7 | 4 | 2 | 5 | 10 |  |
| **5 Mensuration** | **6 (1)** | **120** | 25 | 12 | 47 | 1 | 6 | 6 | 23 | 0 | 6 | 36 | 44 | 25 | 9 | 32 | **60** | yes |
| &nbsp;&nbsp;5.1 Units of measure | 1 (0) | 20 | 5 | 2 | 8 | 0 | 1 | 1 | 3 | 0 | 1 | 9 | 5 | 4 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;5.2 Area and perimeter | 1 (1) | 20 | 4 | 2 | 8 | 0 | 1 | 1 | 4 | 0 | 1 | 7 | 7 | 4 | 1 | 6 | 10 |  |
| &nbsp;&nbsp;5.3 Circles, arcs and sectors | 1 (0) | 20 | 4 | 2 | 7 | 1 | 1 | 1 | 4 | 0 | 1 | 6 | 7 | 4 | 2 | 5 | 10 |  |
| &nbsp;&nbsp;5.4 Surface area and volume | 2 (0) | 40 | 8 | 4 | 16 | 0 | 2 | 2 | 8 | 0 | 2 | 10 | 16 | 9 | 3 | 11 | 20 |  |
| &nbsp;&nbsp;5.5 Compound shapes and parts of shapes | 1 (0) | 20 | 4 | 2 | 8 | 0 | 1 | 1 | 4 | 0 | 1 | 4 | 9 | 4 | 2 | 6 | 10 |  |
| **6 Trigonometry** | **8 (1)** | **169** | 38 | 13 | 61 | 3 | 13 | 5 | 36 | 0 | 8 | 45 | 68 | 34 | 14 | 40 | **80** | yes |
| &nbsp;&nbsp;6.1 Pythagoras' theorem | 1 (1) | 20 | 4 | 1 | 9 | 1 | 1 | 0 | 4 | 0 | 1 | 5 | 11 | 2 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;6.2 Right-angled triangles | 2 (0) | 49 | 9 | 3 | 22 | 0 | 2 | 1 | 12 | 0 | 2 | 15 | 16 | 11 | 5 | 14 | 20 |  |
| &nbsp;&nbsp;6.3 Exact trigonometric values (Extended) | 1 (0) | 20 | 6 | 1 | 6 | 2 | 1 | 1 | 3 | 0 | 1 | 9 | 7 | 2 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;6.4 Trigonometric functions (Extended) | 2 (0) | 40 | 11 | 4 | 10 | 0 | 7 | 2 | 6 | 0 | 2 | 8 | 19 | 8 | 3 | 6 | 20 |  |
| &nbsp;&nbsp;6.5 Non-right-angled triangles (Extended) | 1 (0) | 21 | 3 | 2 | 9 | 0 | 1 | 1 | 5 | 0 | 1 | 3 | 8 | 7 | 2 | 7 | 10 |  |
| &nbsp;&nbsp;6.6 Pythagoras' theorem and trigonometry in 3D (Extended) | 1 (0) | 20 | 5 | 2 | 6 | 0 | 1 | 0 | 6 | 0 | 1 | 5 | 7 | 5 | 2 | 7 | 10 |  |
| **7 Transformations and vectors** | **5 (2)** | **101** | 36 | 11 | 18 | 1 | 12 | 5 | 18 | 0 | 10 | 30 | 39 | 16 | 6 | 18 | **51** | yes |
| &nbsp;&nbsp;7.1 Transformations | 2 (1) | 41 | 15 | 4 | 6 | 0 | 6 | 2 | 8 | 0 | 4 | 12 | 16 | 7 | 2 | 8 | 21 |  |
| &nbsp;&nbsp;7.2 Vectors in two dimensions (Extended) | 1 (1) | 20 | 7 | 2 | 2 | 0 | 5 | 1 | 3 | 0 | 3 | 8 | 7 | 1 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;7.3 Magnitude of a vector (Extended) | 1 (0) | 20 | 5 | 2 | 9 | 1 | 0 | 1 | 2 | 0 | 2 | 6 | 8 | 3 | 1 | 2 | 10 |  |
| &nbsp;&nbsp;7.4 Vector geometry (Extended) | 1 (0) | 20 | 9 | 3 | 1 | 0 | 1 | 1 | 5 | 0 | 1 | 4 | 8 | 5 | 2 | 5 | 10 |  |
| **8 Probability** | **5 (1)** | **100** | 25 | 10 | 31 | 0 | 9 | 1 | 24 | 0 | 10 | 29 | 37 | 19 | 5 | 21 | **50** | yes |
| &nbsp;&nbsp;8.1 Introduction to probability | 1 (1) | 20 | 6 | 2 | 8 | 0 | 1 | 0 | 3 | 0 | 3 | 6 | 7 | 3 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;8.2 Relative and expected frequencies | 1 (0) | 20 | 4 | 2 | 8 | 0 | 0 | 1 | 5 | 0 | 2 | 7 | 7 | 3 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;8.3 Probability of combined events | 2 (0) | 40 | 10 | 4 | 11 | 0 | 6 | 0 | 9 | 0 | 4 | 11 | 16 | 7 | 2 | 8 | 20 |  |
| &nbsp;&nbsp;8.4 Conditional probability (Extended) | 1 (0) | 20 | 5 | 2 | 4 | 0 | 2 | 0 | 7 | 0 | 1 | 5 | 7 | 6 | 1 | 6 | 10 |  |
| **9 Statistics** | **8 (1)** | **153** | 47 | 18 | 46 | 1 | 8 | 4 | 29 | 0 | 18 | 40 | 57 | 30 | 8 | 26 | **74** | yes |
| &nbsp;&nbsp;9.1 Classifying statistical data | 1 (0) | 18 | 4 | 3 | 3 | 1 | 1 | 1 | 5 | 0 | 4 | 7 | 3 | 3 | 1 | 3 | 8 |  |
| &nbsp;&nbsp;9.2 Interpreting statistical data | 1 (0) | 20 | 8 | 2 | 5 | 0 | 0 | 1 | 4 | 0 | 2 | 5 | 8 | 4 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;9.3 Averages and range | 2 (1) | 38 | 12 | 4 | 13 | 0 | 3 | 0 | 6 | 0 | 4 | 10 | 14 | 8 | 2 | 6 | 19 |  |
| &nbsp;&nbsp;9.4 Statistical charts and diagrams | 1 (0) | 20 | 5 | 2 | 6 | 0 | 1 | 1 | 5 | 0 | 2 | 5 | 9 | 3 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;9.5 Scatter diagrams | 1 (0) | 20 | 8 | 3 | 5 | 0 | 0 | 1 | 3 | 0 | 2 | 5 | 9 | 3 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;9.6 Cumulative frequency diagrams (Extended) | 1 (0) | 19 | 5 | 2 | 8 | 0 | 1 | 0 | 3 | 0 | 2 | 4 | 7 | 5 | 1 | 3 | 9 |  |
| &nbsp;&nbsp;9.7 Histograms (Extended) | 1 (0) | 18 | 5 | 2 | 6 | 0 | 2 | 0 | 3 | 0 | 2 | 4 | 7 | 4 | 1 | 3 | 8 |  |
| **All topics (distinct items)** | **96 (15)** | **1892** | 544 | 174 | 544 | 63 | 139 | 81 | 346 | 1 | 151 | 581 | 691 | 355 | 114 | 390 | **950** |  |

Concepts only one board covers are tagged to that board alone. ZIMSEC only: number bases, taxes, joint and partial
variation, logarithms, linear programming, congruence, loci, matrix operations, determinants and inverses, matrix
transformations, stretches and shears. Cambridge only: calculator use, surds, non-linear sequences, non-linear
simultaneous equations, graphs in practical situations, sketching curves, differentiation, inverse and composite
functions, length and midpoint, perpendicular lines, exact trigonometric values, trigonometric functions, scatter
diagrams and conditional probability. A few items inside shared concepts carry `applies` for board-specific depth
(for example compass bearings and bisector constructions for ZIMSEC, the ambiguous case of the sine rule for
Cambridge).

## Assessments

All tests are blueprints: each attempt draws fresh questions from the published bank, so the tests grow with it.
Files: `assessments/topic-tests/*.json`, `assessments/mocks/*.json` and the reviewed sample
`assessments/algebra/quadratic-equations-topic-test.json`.

**Topic tests (23)** — one per top-level topic per syllabus (14 ZIMSEC, 9 Cambridge), 25 minutes, 10 questions,
19 marks:

- Section A: six 1-mark questions (difficulty 1–3). Where a topic has two to six subtopics they are spread over every
  subtopic (for example ZIMSEC Real numbers draws one from each of 1.1–1.6); larger topics draw from the whole topic.
- Section B: two 2-mark (difficulty 2–4), one 4-mark (2–5) and one 5-mark (3–5) question from the whole topic.
- Cambridge topic tests include Extended subtopics and say so in their description.
- The fixed **Quadratic equations** test (11 questions, both syllabi) is the reviewed sample.

**Mock exams (4)** — full-length papers labelled "Mock exam in the style of …", each stating that it is an original
practice paper, not an official paper:

| Mock | Time | Marks | Structure |
| --- | --- | --- | --- |
| ZIMSEC Paper 1 | 2 h 30 min | 100 | 53 short-answer questions (1–4 marks) across all 14 topics, all compulsory; non-calculator. Numerical-answer items for 1 mark, exam-style questions for 3–4 marks. |
| ZIMSEC Paper 2 | 2 h 30 min | 100 | Section A: 12 compulsory exam-style questions (52 marks). Section B: ten 6-mark exam-style questions, answer any eight (48 marks; the best eight count). Calculator allowed. |
| Cambridge Paper 2 (Extended) | 2 h | 100 | 35 short and structured questions across all nine topics, all compulsory; non-calculator, drawn from subtopics chosen to avoid calculator work. |
| Cambridge Paper 4 (Extended) | 2 h | 100 | 17 exam-style structured questions of 5–7 marks across all nine topics; calculator. |

Multiple-choice, true/false and matching items are kept out of the mocks (the real papers have none): the rules ask
for numerical answers, exam-style questions or 2-mark items (fill-in, numerical, short-answer, calculation or small
structured questions; the two 2-mark multiple-choice items in the bank are excluded by type).

Paper names, durations and marks follow the Cambridge 0580 2025-2027 assessment overview and the publicly documented
ZIMSEC O-Level Mathematics papers (4004 details still to be confirmed, see below). The validator confirms every rule of
every blueprint can be filled for its syllabus, without overlapping rules.

## Review statistics

The content was written in six slices, each reviewed by an independent "adversarial examiner" agent that re-solved
every question from its stem (numerical answers checked with code), checked every distractor, explanation, marking spec
and lesson fact, and fixed errors in place:

| Slice | Concepts | Items checked | Errors found | Fixed |
| --- | --- | --- | --- | --- |
| 1 Number foundations and sets | 16 | 497 | 191 | 191 |
| 2 Proportion, finance, measures and mensuration | 18 | 559 | 167 | 167 |
| 3 Algebra and matrices | 17 | 529 | 42 | 42 |
| 4 Coordinate geometry, graphs, calculus and vectors | 18 | 558 | 175 | 175 |
| 5 Geometry and trigonometry | 18 | 569 | 39 | 39 |
| 6 Transformations, symmetry, probability and statistics | 18 | 564 | 26 | 26 |
| **Total** (the 4 quadratic-equation concepts are the earlier reviewed sample) | **105** | **3,276** | **640** | **640** |

Writers generated every numerical answer in code (assertions on values, rounding boundaries and distractors), and
writers and reviewers marked several hundred alternative correct answers (equivalent forms, units, rounding) through
the real marking engine. The most common defect was practice questions that repeated a lesson's worked example
(several hundred rewritten with new data, §11.3). Other typical fixes: marking specs that accepted an answer the stem
did not ask for or rejected a correctly rounded one, distractor rationales naming the wrong mistake, a multiple-choice
question with two correct options, impossible data (a triangle whose given sides and angles disagreed), lesson facts
(the litre is not an SI unit; a tax allowance is not a tax credit), answers given away by lesson tips or flashcards,
and unrealistic contexts.

DEV preview (2026-10-08): imported, published for the preview (3,305 items, then a revised ZIMSEC Paper 1 mock as
revision 2) and smoke-tested as students of both boards:

- **Import:** first run 0 errors; the second run reported every one of the 3,342 item rows unchanged (2,133
  questions, 107 lessons, 1,073 flashcards, 29 test rows). Only the two DEV syllabus versions are reported as
  conflicts on every run (see gap 9).
- **Smoke test** (a fresh full-access student per board, using the real enrolment, lesson, practice and exam
  services): 30 of 30 checks passed.
  - ZIMSEC 2015-2022: the topic tree shows the 14 topics; all 92 lessons tagged to ZIMSEC open unlocked and render
    their maths; practice on 1.5 Number bases and 12 Matrices drew 10 new questions each and marked all 20 model
    responses correct; the Real numbers topic test (10 questions, 19 marks, 25 minutes) and both mocks (53 and 22
    questions, 100 marks, 150 minutes) started with their full blueprint, and, answered with the model responses and
    submitted, earned every auto-marked mark.
  - Cambridge 2025-2027: the topic tree shows the 9 topics (81 nodes); all 96 lessons render; practice on 2.12
    Differentiation and 8.4 Conditional probability marked 20 of 20 model responses correct; the Trigonometry topic
    test and both mocks (35 and 17 questions, 100 marks, 120 minutes) started and earned every auto-marked mark.
  - No mock contained a multiple-choice, true/false or matching item. Marks not awarded automatically belong to
    self-marked "show that" parts.

## Known gaps

1. **No diagrams.** The family has no images yet. Diagrams are described in words or given as tables (Venn regions,
   frequency tables, coordinates); no question refers to a picture that is not there. Images would most help
   constructions and loci, transformations, graph plotting and sketching, statistical charts (histograms, cumulative
   frequency curves, pie charts, scatter diagrams), bearings, circle theorems, vector geometry and 3D trigonometry. There are no diagram-labelling questions, and drawing tasks (plotting, constructing,
   shading regions) can only be practised through questions about the result.
2. **Calculator rules in mocks.** Blueprint rules cannot filter on a question's calculator flag, and only 517 of 2,133
   questions record one. The Cambridge Paper 2 mock therefore draws only from subtopics chosen to avoid calculator
   work; the ZIMSEC Paper 1 mock covers every topic, as the real paper does. Both non-calculator mocks tell students
   what to do if a drawn question still needs a calculator. A calculator filter on rules (and the flag set on every
   question) would close this.
3. **No Core-route mock for Cambridge (Papers 1 and 3).** Extended-depth questions sit inside shared subtopics (for
   example 2.5 Equations, 6.2 Right-angled triangles, 9.3 Averages) and neither questions nor blueprint rules carry a
   Core/Extended tier, so a "Core" paper could not be kept within Core. Tagging questions by tier, or objective-scoped
   rules (the database supports `AssessmentBlueprintRule.objectiveId`; the pipeline schema does not expose it yet),
   would allow Core mocks and Core-only topic tests.
4. **Mock question length.** The bank's longest questions are 8 marks (most exam-style ones are 4–7). ZIMSEC Paper 2 Section B therefore uses ten
   6-mark questions (answer any eight) instead of fewer, longer questions of which candidates choose three, and the
   Cambridge Paper 4 mock uses 17 structured questions where the real paper has about ten long ones. Writing some
   10–16 mark multi-part questions would let the mocks mirror the papers exactly.
5. **Hand-marked parts.** 52 questions include "show that" or "explain" parts (120 marks) that students self-assess
   against mark-scheme points while AI marking is off; auto-marking checks final answers only, never method marks.
6. **Thin subtopics** (fewer than 20 questions): Cambridge 4.2 Geometrical constructions (13), 9.1 Classifying data
   (18), 9.7 Histograms (18), 9.6 Cumulative frequency (19); ZIMSEC 8.6 Symmetry (17) and 10.1 Pythagoras (19).
7. **ZIMSEC syllabus and papers unverified.** The official 2015-2022 syllabus PDF could not be opened, so the topic
   tree, subject code, dates and the 102 objectives come from secondary summaries and the predecessor syllabus
   (4008/4028); topics 2, 6, 9 and 11–14 have no subtopic headings. Paper durations, marks and calculator rules for
   4004 are not recorded in the syllabus file; the ZIMSEC mocks follow the publicly documented format and say so.
8. **Number-base answers with subscript digits** (for example 10001₂) are not accepted, because Unicode
   normalisation turns the subscript into an ordinary digit; 10001_2, 10001(2) and "10001 base 2" are accepted.
9. **DEV database only:** its two mathematics syllabus versions were published on 2026-10-07 from the early sample
   files and are frozen (§26), so imports report them as conflicts. In DEV, ZIMSEC topic 1.6 Scales and simple map
   problems is missing (its lesson, 20 questions and 10 flashcards appear only under Cambridge 4.3 there, and the
   rule for 1.6 in the Real numbers topic test and the Paper 1 mock falls back to the whole topic or the whole
   syllabus), most objectives are missing (5 of 102 ZIMSEC, 7 of 172 Cambridge), and Cambridge 1.17, 3.4 and 7.2 lack
   their Extended-only paper links. Production has no published versions yet, so it would import the files as they
   are. Making DEV match needs an owner decision (for example resetting the DEV database's mathematics syllabus
   versions).

## Needs a specialist teacher's check

**Syllabus alignment (ZIMSEC 4004, against the official document):**

- Whether recurring decimals to fractions and time-zone calculations are examined (for now the 4 recurring-decimal
  questions `number.fdp.q12`–`q14` and `q20`, the 5 time-zone questions in `number.time` and their 4 flashcards are
  Cambridge-only), and whether the 2ⁿ count of subsets is (`sets.notation.q13` and the card `sets.notation.card.number-of-subsets` are ZIMSEC-only).
- Frustums (the compound-shapes lesson labels them Cambridge Extended and says nothing about ZIMSEC), histograms with
  unequal class widths, reflections in y = x and y = −x, and formulas where the subject appears twice (taught for both
  boards in the histograms, transformations and changing-the-subject material).
- Whether 4.2.4 (density) should also cover rates, the placement of matrix transformations (under 13 Transformation),
  number patterns and function notation (from secondary sources), and the heading and position of 8.7 Circle
  properties.
- Paper format for the mocks: Paper 1 and Paper 2 durations, marks, calculator rules and the Section A/B structure.

**Cambridge 0580:**

- A house rule for labelling Extended-only items in stems. Some items say "(Cambridge Extended)"; about 30 factorising
  and inequality items (Extended under objectives 2.2.4 and 2.6.2) and shared Extended items (three-set Venn
  diagrams, set notation, bounds of calculations) do not, and the quadratics sample has no labels.
- The formula-sheet statements in the mensuration lessons (which area, surface area and volume formulas the paper
  gives) and the claim in the tree-diagrams lesson that trees with dependent second branches are Extended.

**Content:**

- Difficulty calibration: a few difficulty-5 items may be difficulty 4 (`geometry.similarity.q16`,
  `geometry.polygons.q19`, `trigonometry.functions.q12` and `q19`, `trigonometry.obtuse.q20`).
- Invented data presented as examples (tax bands, tariffs, exchange rates such as US$1 = R18, the Harare–Bulawayo
  coach timetable): check that every item labels them as example values and none reads as a current real rate.
- Known lenient or strict marking left as it is: 31/80 = 0.3875 also accepts 0.387; typing "US$442" into a box that
  already shows the US$ prefix is not understood ("442" is).
- `coordinate.perpendicular.q19` reuses the line from a lesson example for a different task, and the
  graphs-in-practical-situations lesson is shorter than the 900-word guideline (about 700 words).

## Maintenance

- **MCQ answer positions (2026-10-08):** the correct option was at A in 712 of the 768 four-option MCQs, and the
  player shows options in stored order. `.scratch/tools/rebalance-files.mjs mathematics-o --write` moved 524 keys
  (now A 194, B 200, C 188, D 186; sorted numeric options and items whose text names a letter were left as they
  were) and reordered 16 multi-select or 5–7-option MCQs; `content:validate --strict --no-cache` stays 0/0. The DEV
  database still has the old order until the family is re-imported and the conflict copies are published.

- The files in this directory are the source of truth. The writers' and reviewers' generator scripts (in the
  untracked `.scratch/` folder) predate the review fixes: do not re-run them.
- The topic tests and mocks were generated from a compact spec with a pool check per rule; edit the JSON directly and
  run `npm run content:validate -- mathematics-o`, which re-proves every blueprint.
- When adding questions, set `examStyle` on exam-format items (the mocks draw them) and `calculator` where it matters.
