# Biology (O-Level / IGCSE) — `biology-o`

Original study content for **ZIMSEC O-Level Biology (Forms 3–4 syllabus, 2015-2022)** and **Cambridge IGCSE Biology
(0610, syllabus 2026-2028)**, written once per concept and tagged to both syllabi through the concept registry
(`content/concepts/biology-o.json`). Formats, quality bar and workflow: `docs/CONTENT_PIPELINE.md`.

> **Review status.** Every item was written by AI writing agents and checked by a second, independent AI review pass
> (statistics below). **No human has reviewed it yet.** On 2026-10-08 the family was imported into the DEV database and
> published there **for a local preview only** (`--approver demo.admin@example.test`, with a note on every approval
> that it is not a human attestation). Production publishing requires a human reviewer (§41): review at
> `/admin/review/topics`, then `npm run content:publish -- --approver <reviewer email>`.

## At a glance

| | Total | ZIMSEC O-Level | Cambridge 0610 |
| --- | --- | --- | --- |
| Concepts with content | 95 of 95 | 87 of 87 covered | 79 of 79 covered |
| Lessons (free preview) | 95 (23) | 87 (22) | 79 (23) |
| Questions | 2,061 | 1,835 | 1,577 |
| Flashcards | 1,019 | 911 | 776 |
| Topic tests | 34 | 12 | 22 |
| Mock exams | 5 | Paper 1, Paper 2 | Paper 2, Paper 4, Paper 6 |
| Images | 0 | | |

Questions by type: 1,049 multiple choice (52 of them "select all that apply"), 183 true/false, 129 numerical or
calculation, 148 short answer, 93 fill-in-the-blank, 94 matching, 228 structured (multi-part) and 137 extended
response. By difficulty (1 recall … 5 top-grade problem): 190 / 703 / 722 / 350 / 96. 713 questions are marked
exam-style (the theory mocks draw these) and 273 are daily-question eligible (free tier). Written explanations are
marked by the student against our mark-scheme points while AI marking is switched off: 360 questions contain such
parts, worth 1,532 of the bank's 4,500 marks (34 %); 139 of them (the 137 extended responses and 2 structured
questions) are marked entirely that way.

Board scope: 71 concepts are shared. 16 are ZIMSEC only (branches and careers, crop productivity, pests and diseases,
malnutrition, malaria, bilharzia, tuberculosis and typhoid, smoking, the ear, the skeleton, drug misuse, seeds and
dispersal, contraception, soil, natural and artificial ecosystems, microorganisms, livestock) and 8 Cambridge only
(characteristics of living organisms, classification and keys, vertebrate and arthropod groups, magnification,
protein synthesis, sex linkage, adaptive features, increasing food production). For board-specific depth inside
shared concepts, 143 questions carry `applies: ["zimsec"]` and 54 `applies: ["cambridge"]`, and 237 questions label
Cambridge Supplement-only content "(Supplement)" in the stem or a part.

Lessons run to roughly 800–1,750 words of text (median about 1,200), each with key definitions, worked or illustrative
examples (practical data, Punnett squares, calculations), common mistakes, exam tips and a summary. Zimbabwean context
is used throughout: maize, tobacco, sorghum and cattle, Lake Kariba and Lake Chivero, Hwange and msasa woodland,
malaria, bilharzia, cholera and HIV.

Validation: `npm run content:validate -- biology-o --strict --no-cache` gives **0 errors and 0 warnings**, which
includes rendering every lesson, question and flashcard, marking every `modelResponse` (full marks) and every
`wrongResponse` (less) with the real marking engine, and proving every assessment blueprint can be filled from the bank
for its syllabus. `npm run content:check -- biology-o` leaves 42 advisory findings, all kept on purpose (see
"Needs a specialist teacher's check").

## Coverage by syllabus topic

Columns: lessons (of which free preview), questions, questions by type (MCQ, true/false, numerical or calculation,
short answer, fill-in-the-blank, matching, structured, extended response), questions by difficulty d1–d5, exam-style
questions, flashcards, and whether the topic has a topic test. Cambridge subtopics marked *(Supplement)* are examined
only on the Extended papers (2 and 4). Each top-level topic also counts the items of its subtopics.

#### ZIMSEC O-Level Biology — version 2015-2022

Items are counted under every topic they are tagged to (some lessons, questions and cards serve two subtopics or two
topics), so topic rows can add up to more than the syllabus total.

| Topic | Lessons (free) | Questions | MCQ | T/F | Num/Calc | Short | Fill | Match | Struct | Ext | d1 | d2 | d3 | d4 | d5 | Exam-style | Flashcards | Topic test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **1 Safety, careers and branches in biology** | **2 (1)** | **39** | 20 | 4 | 0 | 4 | 2 | 3 | 3 | 3 | 7 | 20 | 6 | 5 | 1 | 7 | **23** | yes |
| &nbsp;&nbsp;8.1.1 Safety in the laboratory | 1 (1) | 22 | 12 | 2 | 0 | 2 | 1 | 1 | 2 | 2 | 4 | 10 | 4 | 3 | 1 | 5 | 12 |  |
| &nbsp;&nbsp;8.1.2 Branches of biology | 1 (0) | 17 | 8 | 2 | 0 | 2 | 1 | 2 | 1 | 1 | 3 | 10 | 2 | 2 | 0 | 2 | 11 |  |
| &nbsp;&nbsp;8.1.3 Careers | 1 (0) | 17 | 8 | 2 | 0 | 2 | 1 | 2 | 1 | 1 | 3 | 10 | 2 | 2 | 0 | 2 | 11 |  |
| &nbsp;&nbsp;8.12.1 Safety labels and symbols | 1 (1) | 22 | 12 | 2 | 0 | 2 | 1 | 1 | 2 | 2 | 4 | 10 | 4 | 3 | 1 | 5 | 12 |  |
| **2 Chemicals of life** | **4 (1)** | **76** | 40 | 9 | 2 | 6 | 3 | 5 | 6 | 5 | 6 | 30 | 23 | 14 | 3 | 11 | **39** | yes |
| &nbsp;&nbsp;8.2.1 Water | 1 (0) | 15 | 8 | 2 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 8 | 5 | 1 | 0 | 2 | 9 |  |
| &nbsp;&nbsp;8.2.3 Carbohydrates, proteins, lipids and nucleic acids | 3 (1) | 61 | 32 | 7 | 2 | 5 | 2 | 4 | 5 | 4 | 5 | 22 | 18 | 13 | 3 | 9 | 30 |  |
| &nbsp;&nbsp;8.13.1 Carbohydrates | 1 (0) | 22 | 11 | 3 | 0 | 2 | 1 | 2 | 1 | 2 | 2 | 9 | 5 | 5 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;8.13.2 Proteins | 1 (0) | 22 | 11 | 3 | 0 | 2 | 1 | 2 | 1 | 2 | 2 | 9 | 5 | 5 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;8.13.3 Lipids | 1 (0) | 22 | 11 | 3 | 0 | 2 | 1 | 2 | 1 | 2 | 2 | 9 | 5 | 5 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;8.13.4 Nucleic acids | 1 (0) | 20 | 11 | 2 | 2 | 2 | 0 | 1 | 1 | 1 | 2 | 5 | 8 | 4 | 1 | 2 | 10 |  |
| **3 Cells and cellular activities** | **2 (1)** | **42** | 22 | 4 | 0 | 4 | 2 | 2 | 4 | 4 | 4 | 17 | 13 | 6 | 2 | 9 | **22** | yes |
| &nbsp;&nbsp;8.3.1 Plant and animal cells | 1 (1) | 21 | 11 | 2 | 0 | 2 | 1 | 1 | 2 | 2 | 2 | 10 | 7 | 1 | 1 | 4 | 11 |  |
| &nbsp;&nbsp;8.3.2 Cell specialisation | 1 (0) | 21 | 11 | 2 | 0 | 2 | 1 | 1 | 2 | 2 | 2 | 7 | 6 | 5 | 1 | 5 | 11 |  |
| **4 Enzymes** | **3 (1)** | **60** | 34 | 5 | 5 | 2 | 2 | 2 | 7 | 3 | 5 | 20 | 19 | 14 | 2 | 18 | **30** | yes |
| &nbsp;&nbsp;8.4.1 Nature and properties of enzymes | 1 (1) | 23 | 13 | 2 | 1 | 1 | 1 | 1 | 3 | 1 | 1 | 9 | 7 | 5 | 1 | 4 | 11 |  |
| &nbsp;&nbsp;8.4.2 Mode of enzyme action | 1 (0) | 26 | 15 | 2 | 3 | 0 | 1 | 0 | 3 | 2 | 2 | 8 | 7 | 8 | 1 | 5 | 12 |  |
| &nbsp;&nbsp;8.14.1 Industrial applications of enzymes | 1 (0) | 14 | 8 | 1 | 1 | 1 | 0 | 1 | 1 | 1 | 2 | 5 | 5 | 2 | 0 | 10 | 8 |  |
| **5 Plant science** | **14 (2)** | **287** | 151 | 17 | 18 | 21 | 13 | 13 | 38 | 16 | 30 | 101 | 86 | 56 | 14 | 196 | **152** | yes |
| &nbsp;&nbsp;8.5.1 Nutrition | 4 (1) | 83 | 40 | 6 | 6 | 7 | 4 | 4 | 12 | 4 | 9 | 30 | 25 | 16 | 3 | 54 | 46 |  |
| &nbsp;&nbsp;8.5.2 Productivity | 1 (0) | 21 | 10 | 1 | 2 | 2 | 1 | 1 | 3 | 1 | 2 | 8 | 7 | 3 | 1 | 14 | 12 |  |
| &nbsp;&nbsp;8.5.3 Transport | 4 (1) | 79 | 41 | 5 | 7 | 5 | 4 | 3 | 10 | 4 | 7 | 29 | 24 | 14 | 5 | 48 | 39 |  |
| &nbsp;&nbsp;8.15.1 Reproduction | 4 (0) | 82 | 48 | 4 | 3 | 5 | 3 | 4 | 10 | 5 | 10 | 28 | 22 | 18 | 4 | 63 | 44 |  |
| &nbsp;&nbsp;8.15.2 Coordination and response | 1 (0) | 22 | 12 | 1 | 0 | 2 | 1 | 1 | 3 | 2 | 2 | 6 | 8 | 5 | 1 | 17 | 11 |  |
| **6 Animal science** | **32 (8)** | **701** | 348 | 67 | 41 | 45 | 34 | 29 | 86 | 51 | 59 | 230 | 267 | 114 | 31 | 215 | **337** | yes |
| &nbsp;&nbsp;8.6.1 Nutrition | 7 (2) | 159 | 74 | 18 | 9 | 10 | 7 | 7 | 25 | 9 | 13 | 66 | 49 | 24 | 7 | 34 | 78 |  |
| &nbsp;&nbsp;8.6.3 Gaseous exchange (respiratory system) | 3 (1) | 67 | 32 | 6 | 5 | 3 | 3 | 3 | 9 | 6 | 4 | 22 | 26 | 11 | 4 | 15 | 30 |  |
| &nbsp;&nbsp;8.6.4 Respiration | 2 (1) | 44 | 21 | 4 | 3 | 2 | 2 | 2 | 6 | 4 | 4 | 13 | 17 | 7 | 3 | 10 | 20 |  |
| &nbsp;&nbsp;8.6.5 Transport | 4 (1) | 88 | 41 | 8 | 8 | 4 | 4 | 4 | 12 | 7 | 7 | 28 | 34 | 14 | 5 | 19 | 40 |  |
| &nbsp;&nbsp;8.6.6 Immunity | 1 (0) | 22 | 12 | 2 | 1 | 1 | 1 | 1 | 2 | 2 | 1 | 6 | 10 | 4 | 1 | 12 | 12 |  |
| &nbsp;&nbsp;8.6.7 Reproduction in humans | 6 (1) | 122 | 61 | 12 | 7 | 9 | 7 | 4 | 12 | 10 | 12 | 31 | 55 | 20 | 4 | 54 | 63 |  |
| &nbsp;&nbsp;8.16.1 Productivity | 1 (0) | 22 | 10 | 1 | 2 | 2 | 1 | 1 | 3 | 2 | 1 | 7 | 9 | 3 | 2 | 5 | 10 |  |
| &nbsp;&nbsp;8.16.2 Homeostasis | 2 (1) | 46 | 22 | 4 | 4 | 2 | 2 | 2 | 6 | 4 | 3 | 12 | 21 | 8 | 2 | 10 | 20 |  |
| &nbsp;&nbsp;8.16.3 Coordination and response | 3 (1) | 67 | 38 | 6 | 0 | 7 | 4 | 3 | 6 | 3 | 8 | 23 | 23 | 12 | 1 | 35 | 36 |  |
| &nbsp;&nbsp;8.16.4 Endocrine system | 2 (0) | 42 | 25 | 4 | 2 | 4 | 2 | 1 | 2 | 2 | 4 | 13 | 17 | 7 | 1 | 16 | 18 |  |
| &nbsp;&nbsp;8.16.5 Skeletal system | 1 (0) | 22 | 12 | 2 | 0 | 1 | 1 | 1 | 3 | 2 | 2 | 9 | 6 | 4 | 1 | 5 | 10 |  |
| **7 Microbiology and biotechnology** | **3 (1)** | **58** | 30 | 3 | 5 | 4 | 3 | 2 | 7 | 4 | 6 | 17 | 19 | 14 | 2 | 41 | **30** | yes |
| &nbsp;&nbsp;8.7.1 Characteristics, types and economic importance of microorganisms | 2 (1) | 37 | 19 | 2 | 4 | 2 | 2 | 1 | 5 | 2 | 4 | 12 | 11 | 9 | 1 | 26 | 19 |  |
| &nbsp;&nbsp;8.17.1 Recombinant gene technology | 1 (0) | 21 | 11 | 1 | 1 | 2 | 1 | 1 | 2 | 2 | 2 | 5 | 8 | 5 | 1 | 15 | 11 |  |
| **8 Genetics** | **6 (2)** | **132** | 63 | 12 | 12 | 11 | 5 | 7 | 13 | 9 | 12 | 48 | 44 | 21 | 7 | 22 | **61** | yes |
| &nbsp;&nbsp;8.8.1 Chromosomes and genes | 1 (0) | 22 | 11 | 2 | 1 | 2 | 1 | 1 | 2 | 2 | 2 | 8 | 7 | 4 | 1 | 4 | 11 |  |
| &nbsp;&nbsp;8.8.2 Monohybrid inheritance | 2 (1) | 57 | 26 | 5 | 5 | 6 | 2 | 3 | 7 | 3 | 4 | 17 | 22 | 10 | 4 | 10 | 20 |  |
| &nbsp;&nbsp;8.8.3 Mutations | 1 (0) | 21 | 11 | 2 | 0 | 3 | 0 | 2 | 2 | 1 | 2 | 8 | 8 | 2 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;8.18.1 Variation | 1 (0) | 22 | 9 | 2 | 4 | 1 | 1 | 1 | 2 | 2 | 2 | 11 | 4 | 4 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;8.18.2 Selection | 1 (1) | 22 | 11 | 2 | 2 | 1 | 1 | 1 | 2 | 2 | 2 | 8 | 7 | 4 | 1 | 4 | 10 |  |
| **9 Biodiversity** | **5 (1)** | **103** | 48 | 11 | 4 | 11 | 5 | 5 | 10 | 9 | 10 | 36 | 38 | 14 | 5 | 19 | **49** | yes |
| &nbsp;&nbsp;8.9.1 Biodiversity | 1 (0) | 19 | 8 | 3 | 0 | 3 | 1 | 1 | 2 | 1 | 2 | 9 | 5 | 2 | 1 | 3 | 9 |  |
| &nbsp;&nbsp;8.19.1 Threats and conservation measures | 4 (1) | 84 | 40 | 8 | 4 | 8 | 4 | 4 | 8 | 8 | 8 | 27 | 33 | 12 | 4 | 16 | 40 |  |
| **10 Ecosystems** | **7 (1)** | **150** | 76 | 13 | 11 | 12 | 7 | 7 | 15 | 9 | 16 | 50 | 54 | 23 | 7 | 34 | **72** | yes |
| &nbsp;&nbsp;8.10.1 Ecosystems | 1 (0) | 21 | 10 | 1 | 3 | 1 | 1 | 1 | 3 | 1 | 2 | 7 | 6 | 5 | 1 | 14 | 11 |  |
| &nbsp;&nbsp;8.10.2 Natural ecosystem | 4 (1) | 87 | 46 | 8 | 5 | 7 | 4 | 4 | 8 | 5 | 10 | 29 | 31 | 13 | 4 | 13 | 41 |  |
| &nbsp;&nbsp;8.10.3 Artificial ecosystem | 1 (0) | 21 | 10 | 2 | 1 | 2 | 1 | 1 | 2 | 2 | 2 | 6 | 9 | 3 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;8.20.1 Management of ecosystems | 2 (0) | 42 | 20 | 4 | 3 | 4 | 2 | 2 | 4 | 3 | 4 | 14 | 17 | 5 | 2 | 7 | 20 |  |
| **11 Health and disease** | **7 (2)** | **144** | 82 | 14 | 5 | 13 | 3 | 7 | 12 | 8 | 15 | 42 | 58 | 24 | 5 | 61 | **74** | yes |
| &nbsp;&nbsp;8.11.1 Health | 1 (1) | 22 | 13 | 2 | 0 | 2 | 0 | 2 | 2 | 1 | 3 | 8 | 7 | 3 | 1 | 10 | 12 |  |
| &nbsp;&nbsp;8.11.2 Diseases | 5 (1) | 104 | 58 | 10 | 4 | 10 | 3 | 5 | 9 | 5 | 11 | 29 | 43 | 17 | 4 | 47 | 53 |  |
| &nbsp;&nbsp;8.21.1 Drug use and abuse | 2 (1) | 40 | 24 | 4 | 1 | 3 | 0 | 2 | 3 | 3 | 4 | 13 | 15 | 7 | 1 | 14 | 21 |  |
| **Experimental skills** | **2 (1)** | **43** | 21 | 5 | 6 | 2 | 2 | 1 | 4 | 2 | 2 | 17 | 16 | 6 | 2 | 8 | **22** | yes |
| **All topics (distinct items)** | **87 (22)** | **1835** | 935 | 164 | 109 | 135 | 81 | 83 | 205 | 123 | 172 | 628 | 643 | 311 | 81 | 641 | **911** |  |

#### Cambridge IGCSE Biology (0610) — version 2026-2028

Items are counted under every topic they are tagged to (some lessons, questions and cards serve two subtopics or two
topics), so topic rows can add up to more than the syllabus total.

| Topic | Lessons (free) | Questions | MCQ | T/F | Num/Calc | Short | Fill | Match | Struct | Ext | d1 | d2 | d3 | d4 | d5 | Exam-style | Flashcards | Topic test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **1 Characteristics and classification of living organisms** | **4 (1)** | **87** | 46 | 12 | 3 | 7 | 4 | 4 | 7 | 4 | 10 | 40 | 24 | 9 | 4 | 13 | **43** | yes |
| &nbsp;&nbsp;1.1 Characteristics of living organisms | 1 (1) | 22 | 11 | 3 | 1 | 2 | 1 | 1 | 2 | 1 | 3 | 12 | 4 | 2 | 1 | 3 | 11 |  |
| &nbsp;&nbsp;1.2 Concept and uses of classification systems | 1 (0) | 21 | 12 | 3 | 1 | 1 | 1 | 0 | 2 | 1 | 2 | 9 | 7 | 2 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;1.3 Features of organisms | 2 (0) | 44 | 23 | 6 | 1 | 4 | 2 | 3 | 3 | 2 | 5 | 19 | 13 | 5 | 2 | 7 | 22 |  |
| **2 Organisation of the organism** | **3 (1)** | **62** | 26 | 5 | 11 | 4 | 3 | 2 | 7 | 4 | 6 | 26 | 16 | 11 | 3 | 14 | **32** | yes |
| &nbsp;&nbsp;2.1 Cell structure | 2 (1) | 40 | 20 | 4 | 0 | 4 | 2 | 2 | 4 | 4 | 4 | 17 | 11 | 6 | 2 | 9 | 22 |  |
| &nbsp;&nbsp;2.2 Size of specimens | 1 (0) | 22 | 6 | 1 | 11 | 0 | 1 | 0 | 3 | 0 | 2 | 9 | 5 | 5 | 1 | 5 | 10 |  |
| **3 Movement into and out of cells** | **3 (1)** | **52** | 22 | 8 | 5 | 4 | 3 | 2 | 4 | 4 | 2 | 23 | 20 | 5 | 2 | 8 | **25** | yes |
| &nbsp;&nbsp;3.1 Diffusion | 1 (1) | 22 | 9 | 3 | 3 | 1 | 1 | 1 | 2 | 2 | 1 | 9 | 9 | 2 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;3.2 Osmosis | 2 (0) | 30 | 13 | 5 | 2 | 3 | 2 | 1 | 2 | 2 | 1 | 14 | 11 | 3 | 1 | 4 | 15 |  |
| &nbsp;&nbsp;3.3 Active transport | 1 (1) | 22 | 9 | 3 | 3 | 1 | 1 | 1 | 2 | 2 | 1 | 9 | 9 | 2 | 1 | 4 | 10 |  |
| **4 Biological molecules** | **3 (1)** | **51** | 25 | 7 | 3 | 5 | 2 | 2 | 6 | 1 | 5 | 21 | 11 | 12 | 2 | 7 | **24** | yes |
| &nbsp;&nbsp;4.1 Biological molecules | 3 (1) | 51 | 25 | 7 | 3 | 5 | 2 | 2 | 6 | 1 | 5 | 21 | 11 | 12 | 2 | 7 | 24 |  |
| **5 Enzymes** | **2 (1)** | **46** | 26 | 4 | 4 | 1 | 2 | 1 | 6 | 2 | 3 | 15 | 14 | 12 | 2 | 8 | **22** | yes |
| &nbsp;&nbsp;5.1 Enzymes | 2 (1) | 46 | 26 | 4 | 4 | 1 | 2 | 1 | 6 | 2 | 3 | 15 | 14 | 12 | 2 | 8 | 22 |  |
| **6 Plant nutrition** | **4 (1)** | **78** | 39 | 6 | 6 | 6 | 4 | 3 | 11 | 3 | 9 | 30 | 22 | 14 | 3 | 51 | **44** | yes |
| &nbsp;&nbsp;6.1 Photosynthesis | 3 (1) | 58 | 28 | 5 | 5 | 4 | 3 | 2 | 9 | 2 | 7 | 21 | 18 | 10 | 2 | 37 | 33 |  |
| &nbsp;&nbsp;6.2 Leaf structure | 1 (0) | 20 | 11 | 1 | 1 | 2 | 1 | 1 | 2 | 1 | 2 | 9 | 4 | 4 | 1 | 14 | 11 |  |
| **7 Human nutrition** | **5 (1)** | **92** | 41 | 10 | 5 | 6 | 4 | 5 | 17 | 4 | 11 | 38 | 24 | 15 | 4 | 21 | **47** | yes |
| &nbsp;&nbsp;7.1 Diet | 1 (1) | 20 | 9 | 2 | 2 | 1 | 1 | 1 | 4 | 0 | 3 | 9 | 4 | 3 | 1 | 4 | 11 |  |
| &nbsp;&nbsp;7.2 Digestive system | 1 (0) | 22 | 10 | 3 | 0 | 2 | 1 | 1 | 3 | 2 | 3 | 9 | 6 | 3 | 1 | 5 | 10 |  |
| &nbsp;&nbsp;7.3 Physical digestion | 1 (0) | 17 | 7 | 2 | 2 | 1 | 1 | 1 | 3 | 0 | 2 | 7 | 5 | 2 | 1 | 3 | 9 |  |
| &nbsp;&nbsp;7.4 Chemical digestion | 1 (0) | 20 | 9 | 2 | 0 | 2 | 1 | 1 | 4 | 1 | 2 | 8 | 6 | 3 | 1 | 5 | 10 |  |
| &nbsp;&nbsp;7.5 Absorption | 1 (0) | 13 | 6 | 1 | 1 | 0 | 0 | 1 | 3 | 1 | 1 | 5 | 3 | 4 | 0 | 4 | 7 |  |
| **8 Transport in plants** | **3 (1)** | **53** | 28 | 3 | 4 | 4 | 3 | 3 | 6 | 2 | 6 | 19 | 15 | 10 | 3 | 37 | **28** | yes |
| &nbsp;&nbsp;8.1 Xylem and phloem | 1 (1) | 19 | 11 | 1 | 1 | 1 | 1 | 1 | 2 | 1 | 2 | 7 | 6 | 3 | 1 | 14 | 10 |  |
| &nbsp;&nbsp;8.2 Water uptake | 1 (1) | 19 | 11 | 1 | 1 | 1 | 1 | 1 | 2 | 1 | 2 | 7 | 6 | 3 | 1 | 14 | 10 |  |
| &nbsp;&nbsp;8.3 Transpiration | 1 (0) | 20 | 10 | 1 | 3 | 1 | 1 | 1 | 3 | 0 | 2 | 6 | 6 | 5 | 1 | 14 | 10 |  |
| &nbsp;&nbsp;8.4 Translocation (Supplement) | 1 (0) | 14 | 7 | 1 | 0 | 2 | 1 | 1 | 1 | 1 | 2 | 6 | 3 | 2 | 1 | 9 | 8 |  |
| **9 Transport in animals** | **4 (1)** | **82** | 38 | 7 | 7 | 4 | 4 | 4 | 11 | 7 | 7 | 27 | 30 | 13 | 5 | 18 | **37** | yes |
| &nbsp;&nbsp;9.1 Circulatory systems | 1 (1) | 23 | 11 | 2 | 3 | 1 | 1 | 1 | 3 | 1 | 2 | 8 | 9 | 2 | 2 | 4 | 11 |  |
| &nbsp;&nbsp;9.2 Heart | 2 (1) | 41 | 18 | 4 | 4 | 2 | 2 | 2 | 6 | 3 | 3 | 14 | 15 | 6 | 3 | 9 | 19 |  |
| &nbsp;&nbsp;9.3 Blood vessels | 1 (0) | 18 | 9 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 | 6 | 6 | 3 | 1 | 4 | 8 |  |
| &nbsp;&nbsp;9.4 Blood | 1 (0) | 23 | 11 | 2 | 2 | 1 | 1 | 1 | 3 | 2 | 2 | 7 | 9 | 4 | 1 | 5 | 10 |  |
| **10 Diseases and immunity** | **3 (1)** | **57** | 33 | 5 | 2 | 5 | 2 | 2 | 4 | 4 | 5 | 18 | 22 | 9 | 3 | 30 | **27** | yes |
| &nbsp;&nbsp;10.1 Diseases and immunity | 3 (1) | 57 | 33 | 5 | 2 | 5 | 2 | 2 | 4 | 4 | 5 | 18 | 22 | 9 | 3 | 30 | 27 |  |
| **11 Gas exchange in humans** | **2 (1)** | **42** | 20 | 3 | 3 | 2 | 2 | 2 | 6 | 4 | 3 | 13 | 16 | 7 | 3 | 10 | **19** | yes |
| &nbsp;&nbsp;11.1 Gas exchange in humans | 2 (1) | 42 | 20 | 3 | 3 | 2 | 2 | 2 | 6 | 4 | 3 | 13 | 16 | 7 | 3 | 10 | 19 |  |
| **12 Respiration** | **2 (1)** | **40** | 18 | 3 | 3 | 2 | 2 | 2 | 6 | 4 | 4 | 12 | 14 | 7 | 3 | 10 | **18** | yes |
| &nbsp;&nbsp;12.1 Respiration | 1 (1) | 20 | 9 | 1 | 2 | 1 | 1 | 1 | 3 | 2 | 2 | 6 | 7 | 4 | 1 | 5 | 9 |  |
| &nbsp;&nbsp;12.2 Aerobic respiration | 1 (1) | 20 | 9 | 1 | 2 | 1 | 1 | 1 | 3 | 2 | 2 | 6 | 7 | 4 | 1 | 5 | 9 |  |
| &nbsp;&nbsp;12.3 Anaerobic respiration | 1 (0) | 20 | 9 | 2 | 1 | 1 | 1 | 1 | 3 | 2 | 2 | 6 | 7 | 3 | 2 | 5 | 9 |  |
| **13 Excretion in humans** | **1 (1)** | **18** | 9 | 1 | 2 | 1 | 1 | 1 | 1 | 2 | 2 | 6 | 7 | 2 | 1 | 3 | **8** | yes |
| &nbsp;&nbsp;13.1 Excretion in humans | 1 (1) | 18 | 9 | 1 | 2 | 1 | 1 | 1 | 1 | 2 | 2 | 6 | 7 | 2 | 1 | 3 | 8 |  |
| **14 Coordination and response** | **6 (1)** | **119** | 65 | 11 | 4 | 9 | 8 | 3 | 11 | 8 | 12 | 34 | 47 | 21 | 5 | 58 | **60** | yes |
| &nbsp;&nbsp;14.1 Coordination and response | 1 (1) | 20 | 11 | 2 | 0 | 1 | 2 | 0 | 2 | 2 | 3 | 6 | 6 | 4 | 1 | 11 | 11 |  |
| &nbsp;&nbsp;14.2 Sense organs | 1 (0) | 21 | 12 | 2 | 0 | 2 | 2 | 1 | 1 | 1 | 2 | 7 | 9 | 2 | 1 | 11 | 12 |  |
| &nbsp;&nbsp;14.3 Hormones | 1 (0) | 22 | 13 | 2 | 1 | 2 | 1 | 1 | 1 | 1 | 2 | 7 | 9 | 4 | 0 | 8 | 10 |  |
| &nbsp;&nbsp;14.4 Homeostasis | 2 (0) | 41 | 20 | 4 | 3 | 3 | 2 | 1 | 5 | 3 | 3 | 9 | 19 | 8 | 2 | 16 | 18 |  |
| &nbsp;&nbsp;14.5 Tropic responses | 1 (0) | 15 | 9 | 1 | 0 | 1 | 1 | 0 | 2 | 1 | 2 | 5 | 4 | 3 | 1 | 12 | 9 |  |
| **15 Drugs** | **1 (1)** | **15** | 10 | 1 | 0 | 1 | 0 | 0 | 1 | 2 | 2 | 3 | 6 | 3 | 1 | 8 | **8** | yes |
| &nbsp;&nbsp;15.1 Drugs | 1 (1) | 15 | 10 | 1 | 0 | 1 | 0 | 0 | 1 | 2 | 2 | 3 | 6 | 3 | 1 | 8 | 8 |  |
| **16 Reproduction** | **7 (1)** | **129** | 72 | 9 | 6 | 9 | 7 | 4 | 13 | 9 | 15 | 41 | 44 | 23 | 6 | 77 | **68** | yes |
| &nbsp;&nbsp;16.1 Asexual reproduction | 1 (0) | 17 | 10 | 1 | 1 | 1 | 1 | 0 | 2 | 1 | 2 | 6 | 5 | 3 | 1 | 13 | 8 |  |
| &nbsp;&nbsp;16.2 Sexual reproduction | 1 (0) | 17 | 10 | 1 | 1 | 1 | 1 | 0 | 2 | 1 | 2 | 6 | 5 | 3 | 1 | 13 | 8 |  |
| &nbsp;&nbsp;16.3 Sexual reproduction in plants | 2 (0) | 38 | 23 | 2 | 2 | 2 | 2 | 1 | 4 | 2 | 5 | 14 | 9 | 9 | 1 | 29 | 22 |  |
| &nbsp;&nbsp;16.4 Sexual reproduction in humans | 2 (1) | 39 | 20 | 3 | 2 | 3 | 2 | 2 | 4 | 3 | 4 | 11 | 17 | 6 | 1 | 18 | 20 |  |
| &nbsp;&nbsp;16.5 Sex hormones in humans | 1 (0) | 20 | 8 | 2 | 1 | 2 | 2 | 1 | 2 | 2 | 2 | 5 | 8 | 3 | 2 | 9 | 10 |  |
| &nbsp;&nbsp;16.6 Sexually transmitted infections | 1 (0) | 15 | 11 | 1 | 0 | 1 | 0 | 0 | 1 | 1 | 2 | 5 | 5 | 2 | 1 | 8 | 8 |  |
| **17 Inheritance** | **6 (1)** | **132** | 64 | 13 | 10 | 12 | 6 | 6 | 13 | 8 | 13 | 41 | 50 | 22 | 6 | 27 | **62** | yes |
| &nbsp;&nbsp;17.1 Chromosomes, genes and proteins | 2 (0) | 44 | 22 | 5 | 1 | 4 | 2 | 3 | 4 | 3 | 5 | 16 | 15 | 7 | 1 | 7 | 21 |  |
| &nbsp;&nbsp;17.2 Mitosis (Supplement) | 1 (0) | 22 | 11 | 2 | 3 | 1 | 1 | 0 | 2 | 2 | 2 | 6 | 9 | 4 | 1 | 10 | 11 |  |
| &nbsp;&nbsp;17.3 Meiosis (Supplement) | 1 (0) | 22 | 11 | 2 | 3 | 1 | 1 | 0 | 2 | 2 | 2 | 6 | 9 | 4 | 1 | 10 | 11 |  |
| &nbsp;&nbsp;17.4 Monohybrid inheritance | 3 (1) | 78 | 36 | 7 | 6 | 9 | 3 | 4 | 9 | 4 | 6 | 23 | 30 | 14 | 5 | 13 | 30 |  |
| **18 Variation and selection** | **4 (1)** | **83** | 42 | 8 | 6 | 7 | 3 | 4 | 7 | 6 | 7 | 34 | 24 | 14 | 4 | 13 | **39** | yes |
| &nbsp;&nbsp;18.1 Variation | 2 (0) | 40 | 19 | 4 | 4 | 4 | 1 | 2 | 3 | 3 | 4 | 18 | 11 | 5 | 2 | 6 | 19 |  |
| &nbsp;&nbsp;18.2 Adaptive features | 1 (0) | 21 | 12 | 2 | 0 | 2 | 1 | 1 | 2 | 1 | 1 | 8 | 6 | 5 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;18.3 Selection | 1 (1) | 22 | 11 | 2 | 2 | 1 | 1 | 1 | 2 | 2 | 2 | 8 | 7 | 4 | 1 | 4 | 10 |  |
| **19 Organisms and their environment** | **5 (1)** | **106** | 55 | 9 | 7 | 9 | 5 | 5 | 10 | 6 | 12 | 36 | 38 | 15 | 5 | 16 | **49** | yes |
| &nbsp;&nbsp;19.1 Energy flow | 1 (0) | 22 | 12 | 2 | 4 | 0 | 1 | 0 | 2 | 1 | 2 | 6 | 10 | 3 | 1 | 3 | 10 |  |
| &nbsp;&nbsp;19.2 Food chains and food webs | 2 (1) | 44 | 24 | 4 | 4 | 2 | 2 | 2 | 4 | 2 | 5 | 13 | 18 | 6 | 2 | 6 | 21 |  |
| &nbsp;&nbsp;19.3 Nutrient cycles | 2 (0) | 43 | 22 | 4 | 1 | 5 | 2 | 2 | 4 | 3 | 5 | 16 | 13 | 7 | 2 | 7 | 20 |  |
| &nbsp;&nbsp;19.4 Populations | 1 (0) | 19 | 9 | 1 | 2 | 2 | 1 | 1 | 2 | 1 | 2 | 7 | 7 | 2 | 1 | 3 | 8 |  |
| **20 Human influences on ecosystems** | **5 (1)** | **105** | 51 | 9 | 5 | 9 | 5 | 5 | 11 | 10 | 10 | 34 | 38 | 17 | 6 | 32 | **51** | yes |
| &nbsp;&nbsp;20.1 Food supply | 1 (0) | 21 | 11 | 1 | 1 | 1 | 1 | 1 | 3 | 2 | 2 | 7 | 5 | 5 | 2 | 16 | 11 |  |
| &nbsp;&nbsp;20.2 Habitat destruction | 1 (1) | 21 | 10 | 2 | 1 | 2 | 1 | 1 | 2 | 2 | 2 | 8 | 7 | 3 | 1 | 4 | 10 |  |
| &nbsp;&nbsp;20.3 Pollution | 2 (0) | 42 | 20 | 4 | 2 | 4 | 2 | 2 | 4 | 4 | 4 | 13 | 17 | 6 | 2 | 8 | 20 |  |
| &nbsp;&nbsp;20.4 Conservation | 1 (0) | 21 | 10 | 2 | 1 | 2 | 1 | 1 | 2 | 2 | 2 | 6 | 9 | 3 | 1 | 4 | 10 |  |
| **21 Biotechnology and genetic modification** | **3 (1)** | **62** | 32 | 3 | 5 | 4 | 3 | 3 | 6 | 6 | 6 | 17 | 23 | 13 | 3 | 44 | **31** | yes |
| &nbsp;&nbsp;21.1 Biotechnology and genetic modification | 1 (1) | 19 | 9 | 1 | 2 | 1 | 1 | 1 | 2 | 2 | 2 | 5 | 7 | 4 | 1 | 13 | 9 |  |
| &nbsp;&nbsp;21.2 Biotechnology | 2 (1) | 40 | 20 | 2 | 4 | 2 | 2 | 2 | 4 | 4 | 4 | 12 | 14 | 8 | 2 | 28 | 20 |  |
| &nbsp;&nbsp;21.3 Genetic modification | 1 (0) | 22 | 12 | 1 | 1 | 2 | 1 | 1 | 2 | 2 | 2 | 5 | 9 | 5 | 1 | 16 | 11 |  |
| **Experimental skills and investigations** | **3 (2)** | **66** | 33 | 7 | 7 | 4 | 3 | 2 | 6 | 4 | 6 | 27 | 21 | 9 | 3 | 13 | **34** | yes |
| **All topics (distinct items)** | **79 (23)** | **1577** | 795 | 144 | 108 | 115 | 76 | 65 | 170 | 104 | 156 | 555 | 526 | 263 | 77 | 518 | **776** |  |

## Assessments

All tests are blueprints: each attempt draws fresh questions from the published bank, so the tests grow with it.
Files: `assessments/topic-tests/*.json` and `assessments/mocks/*.json`.

**Topic tests (34)** — one per top-level topic per syllabus (12 ZIMSEC, 22 Cambridge, each including the
experimental-skills topic):

- Section A: one-mark questions (difficulty 1–3: multiple choice, true/false, short answer, numerical), spread over
  every subtopic of the topic.
- Section B: one or two medium questions (2–5 marks, difficulty 2–4) and one exam-style structured or extended
  question (5–8 marks, difficulty 4–5). The mark values were chosen per topic from what the bank holds, so every rule
  has a choice of questions where the bank allows it.
- 30 tests are 20 marks in 25 minutes (11–13 questions). The two large ZIMSEC topics (5 Plant science, 6 Animal
  science) are 25 marks in 30 minutes with two exam-style questions. The two small Cambridge topics (13 Excretion in
  humans, 15 Drugs, with 18 and 15 questions) are 15 marks in 20 minutes, so that repeated attempts still vary.
- Cambridge test descriptions say that the test includes Supplement content (naming 8.4 Translocation, 17.2 Mitosis
  and 17.3 Meiosis, which are Supplement-only); the experimental-skills tests have no such note.

**Mock exams (5)** — full-length papers labelled "Mock exam in the style of …", each stating that it is an original
practice paper, not an official paper:

| Mock | Time | Marks | Structure |
| --- | --- | --- | --- |
| ZIMSEC Paper 1 (multiple choice) | 1 h | 40 | 40 multiple-choice questions over all 11 topics in proportion to the syllabus; every Plant science and Animal science subtopic contributes at least one. |
| ZIMSEC Paper 2 (theory) | 2 h | 100 | Section A: 12 compulsory exam-style questions of 4–6 marks, one from each of chemicals of life, cells, enzymes, plant nutrition, plant transport, animal nutrition, animal transport, human reproduction, genetics, biodiversity, ecosystems and health and disease (60 marks). Section B: six 8-mark exam-style questions (Plant science ×2, Animal science ×2, Ecosystems, Microbiology and biotechnology), answer any five (40 marks; the best five count). |
| Cambridge Paper 2 (multiple choice, Extended) | 45 min | 40 | 40 multiple-choice questions of difficulty 2–5, two from each of the 21 topics (one each from 13 Excretion and 15 Drugs). |
| Cambridge Paper 4 (theory, Extended) | 1 h 15 min | 80 | 14 exam-style structured or extended questions of 4–7 marks, one from each of 14 topics in syllabus order: movement into and out of cells, enzymes, plant nutrition, human nutrition, transport in plants, transport in animals, diseases and immunity, respiration, coordination and response, reproduction, inheritance, variation and selection, organisms and their environment, and human influences on ecosystems. |
| Cambridge Paper 6 (Alternative to Practical) | 1 h | 40 | 11 questions from Experimental skills and investigations: five exam-style planning, analysis and evaluation questions (three of 6 marks, one of 7, one of 5), four 2-mark calculations from data and two 1-mark short answers. |

Multiple-choice papers contain only multiple-choice questions; theory and practical papers contain no multiple-choice,
true/false or matching items (both checked in the smoke test). On the theory papers most marks are for written answers,
so students mark about 70–75 % of ZIMSEC Paper 2 and Cambridge Paper 4, and roughly 40–50 % of Paper 6, themselves
against our mark schemes; the multiple-choice papers are marked entirely automatically, and topic tests are about
20–45 % self-marked.

The two theory mocks were revised in a second assemble pass on 2026-10-08 (published as revision 2 in DEV): in the
first version no rule could draw a Biodiversity question into ZIMSEC Paper 2 or an Organisms and their environment
(ecology) question into Cambridge Paper 4. Mark values were re-chosen with `.scratch/bio-assemble2/optimise.cjs` so
that the totals stay 60 (Section A) and 80, every rule keeps at least three candidates, and the Cambridge pools are at
least as large as before (human nutrition 7, inheritance 12 candidates); in ZIMSEC Section A the plant nutrition rule
dropped from 5 to 3 candidates, animal nutrition from 11 to 6 and the health rule, which now draws from the whole of
topic 11 (diseases, health and drugs), from 7 to 6.

Paper names, durations and marks follow the Cambridge 0610 2026-2028 assessment overview and the assessment section of
the ZIMSEC 2015-2022 syllabus as read (unverified, see gap 9). The validator confirms every rule of every blueprint can
be filled for its syllabus without overlapping rules.

## Review statistics

The content was written in five slices of 19 concepts, each reviewed by an independent "adversarial examiner" agent
that solved every question from its stem (numerical answers recomputed with code), checked every distractor,
explanation, marking spec and lesson fact, and fixed errors in place:

| Slice | Concepts | Items checked | Errors found | Fixed |
| --- | --- | --- | --- | --- |
| 1 Foundations: practical skills, classification, cells, biological molecules and enzymes | 19 | 624 | 58 | 58 |
| 2 Plants, crops, microorganisms and biotechnology | 19 | 638 | 46 | 46 |
| 3 Human nutrition, transport, gas exchange, respiration, excretion and support; livestock | 19 | 646 | 50 | 50 |
| 4 Coordination, disease and immunity, drugs and human reproduction | 19 | 647 | 157 | 157 |
| 5 Inheritance, variation and selection, ecology and human influences | 19 | 620 | 54 | 54 |
| **Total** | **95** | **3,175** | **365** | **365** |

Writers computed every numerical answer and genetic ratio in code and reviewers recomputed them; writers and reviewers
also ran more than 1,300 alternative correct answers and near misses (spellings, units, equivalent forms) through the
real marking engine. The most widespread defect was in slice 4: the correct option was the longest in 65 % of
single-answer MCQs, so a student could score by picking the longest answer; the reviewer rebalanced 131 MCQs and the
answer letters (now A 65, B 67, C 63, D 65 in that slice). Other typical fixes: practice questions that copied
a lesson's worked example or data (§11.3, rewritten with new data or contexts), MCQs with two defensible answers,
marking specs that rejected correct answers (equivalent units, "B-lymphocytes", "Eustachian tubes") or credited a
wrong one ("binary fusion"), answers that could be copied from a data table, fill-in templates whose articles gave the
answer away, lesson facts (scaleless catfish, fat-soluble vitamins, pepsin at neutral pH, the biceps lowering a load,
the largest organ, iodine in freshwater fish, X and Y chromosomes carrying different genes) and Core/Supplement
labelling.

In the assemble step one more item was changed: `ecology.food-chains.q11` repeated the scenario and answer of the food
chains lesson's kapenta example (a `content:check` finding the reviewer had kept), so it was replaced by a new
introduced-predator question (largemouth bass in a farm dam) with the same key, concept and objectives.

## DEV preview (2026-10-08)

- **Import:** the first run created both syllabus versions (59 and 83 topics) and 3,214 item rows (2,061 questions,
  95 lessons, 1,019 flashcards, 39 test rows) with 0 errors. After the two small Cambridge topic tests were resized
  (2 rows updated), the next run reported every row unchanged, and so did a run after publishing (no conflicts).
- **Publish (DEV preview only):** `npm run content:publish -- --approver demo.admin@example.test --family biology-o`
  with the note "DEV PREVIEW ONLY … This is NOT a human review attestation (section 41)" published both syllabus
  versions as CURRENT and all 3,214 items (0 failed), and made both biology subjects AVAILABLE in the DEV catalogue.
- **Second assemble pass (revised theory mocks):** `content:validate -- biology-o --strict --no-cache` again gave 0
  errors and 0 warnings (every blueprint feasible and guaranteed). The first import reported the two revised mocks as
  conflicts (published revision 1 kept, draft copies created for review) and every other row unchanged; the second
  run reported every row unchanged ("the database already matches the files"). The DEV publish (same note) published
  the two copies as revision 2 (0 failed), after which an import reported no changes and a dry run had nothing left
  to publish.
- **Smoke test** (`.scratch/bio-assemble/smoke.ts`: a fresh full-access student per board, using the real enrolment,
  lesson, practice and exam services), last run after the second pass: 37 of 37 checks passed.
  - ZIMSEC 2015-2022: the enrolment pins 2015-2022; the topic tree shows the 12 top-level topics (59 nodes); all 87
    lessons tagged to ZIMSEC open unlocked and render; practice on 8.5.3 Transport and 8.8.2 Monohybrid inheritance
    drew 10 new questions each and marked all 20 model responses correct; all 12 topic tests are listed; the Animal
    science topic test (14 questions, 25 marks, 30 minutes) and both mocks (Paper 1: 40 questions, 40 marks, 60
    minutes; Paper 2: 18 questions in two sections, 100 marks, 120 minutes) started with their full blueprint and,
    answered with the model responses and submitted, earned every automatically marked mark.
  - Cambridge 2026-2028: the enrolment pins 2026-2028; the topic tree shows the 22 top-level topics (83 nodes); all
    79 lessons render; practice on 3.2 Osmosis and 19.3 Nutrient cycles marked 20 of 20 model responses correct; all
    22 topic tests are listed; the Inheritance topic test (11 questions, 20 marks, 25 minutes) and the three mocks
    (Paper 2: 40 questions, 45 minutes; Paper 4: 14 questions, 80 marks, 75 minutes; Paper 6: 11 questions, 40
    marks, 60 minutes) started and earned every automatically marked mark.
  - The multiple-choice mocks drew only multiple-choice questions, and the theory and practical mocks none (only
    structured, extended-response, numerical and short-answer items). In the drawn papers the automatic marks were
    29 of 100 (ZIMSEC Paper 2), 23 of 80 (Paper 4) and 22 of 40 (Paper 6); the remaining marks are written answers
    that students mark themselves. The drawn ZIMSEC Paper 2 included a Biodiversity question (habitat destruction)
    and the Cambridge Paper 4 a nutrient-cycle question (`.scratch/bio-assemble2/drawn.ts` lists a drawn paper).

## Known gaps

1. **No diagrams.** The family has no images. Structures, apparatus and graphs are described in words or given as
   tables ("a student describes the labelled parts of a diagram of the heart …"); no question refers to a picture that
   is not there, and there are no diagram-labelling questions. Images would most help cells and specialised cells,
   microscope drawings, leaf, stem and root sections, flowers and seeds, the heart, blood vessels, the alimentary canal
   and villus, the lungs, kidney and nephron, eye, ear, brain, neurones and reflex arc, skin, reproductive systems,
   the skeleton and joints, food webs, pyramids and nutrient cycles, and apparatus (potometer, respirometer, pondweed
   set-up). Drawing, labelling and graph-plotting skills (Papers 3, 5 and 6) can only be practised through questions
   about the result.
2. **Self-marked written answers.** With AI marking switched off, 34 % of the bank's marks (about 70–75 % of the
   theory mocks) are marked by students against our mark-scheme points. Automatic marking covers multiple choice,
   numbers and keyed short answers only.
3. **Mock question length.** The bank's longest questions are worth 9 or 10 marks (8 questions), and 321 of its 364
   exam-style structured and extended questions are worth 4–7 marks. ZIMSEC Paper 2 therefore uses 12 compulsory
   questions in Section A and six 8-mark questions (answer any five) in Section B, where the real paper has six 10-mark
   questions and a choice of four from six; Cambridge Paper 4 uses 14 single-topic questions where the real paper has
   about six long questions that each span several topics, so each attempt covers 14 of the 21 topics (characteristics
   and classification, organisation of the organism, biological molecules, gas exchange, excretion, drugs and
   biotechnology appear only in the multiple-choice mock). Writing some 10–16 mark multi-topic questions would let the
   mocks mirror the papers exactly.
4. **Thin mock pools.** Some mock rules draw from very few questions, so attempts repeat them: Cambridge Paper 6 (its
   7-mark and 5-mark questions are the same in every attempt; 7 candidates for the three 6-mark questions), ZIMSEC
   Paper 2 Section B (2 candidates for Microbiology and biotechnology, 3 for Ecosystems) and Section A (3 for Cells,
   Enzymes and Plant nutrition), and Cambridge Paper 4 (3 for Enzymes, 4 for movement into and out of cells, Transport
   in plants and Variation and selection). More exam-style practical and structured questions would fix this.
5. **No Core-route or practical-test mocks.** There is no Cambridge Core mock (Papers 1 and 3): Supplement items sit
   inside shared subtopics and blueprint rules cannot filter on a question's tier (only stems carry the "(Supplement)"
   label), so a Core paper could not be kept within Core. Objective-scoped rules (the database supports
   `AssessmentBlueprintRule.objectiveId`; the pipeline schema does not expose it yet) or a tier field on questions would
   allow it. Cambridge Paper 5 and ZIMSEC Paper 3 are hands-on practical examinations and have no online mock; the
   experimental-skills topic tests and the Paper 6 mock practise their written side.
6. **"Select all" items in multiple-choice mocks.** Rules cannot filter on an MCQ's select mode, so the 52 multi-select
   items (all 1 or 2 marks) can be drawn into the multiple-choice mocks (one or two per paper on average), although the
   real papers use only single-answer four-option items. The mock instructions warn students.
7. **Thin topics** (fewer than 20 questions): Cambridge 13 Excretion in humans (18), 15 Drugs (15), 7.5 Absorption (13),
   8.4 Translocation (14), 14.5 Tropic responses (15), 16.6 Sexually transmitted infections (15), 7.3 Physical
   digestion (17), 16.1 and 16.2 Asexual and Sexual reproduction (17 each), 9.3 Blood vessels (18), 8.1, 8.2, 19.4 and
   21.1 (19 each); ZIMSEC 8.14.1 Industrial applications of enzymes (14), 8.2.1 Water (15), 8.1.2 Branches and 8.1.3
   Careers (17 each) and 8.9.1 Biodiversity (19). Cambridge 13 and 15 are thin because each is a single concept (the
   family has about 20 questions per concept) and some of its items are ZIMSEC-only (dialysis, osmoregulation and skin
   excretion; analgesics and antimalarials); drug misuse is a separate ZIMSEC-only concept.
8. **Difficulty spread.** 446 of 2,061 questions (22 %) are difficulty 4–5, below the guide's 30 %; writers chose not
   to over-rate easier items. More data-handling and multi-step exam questions would close the gap.
9. **ZIMSEC syllabus unverified.** The official 2015-2022 document was read through a text rendering of a provincial
   copy whose certificate has expired, so headings, objectives and the paper format must be checked against a clean
   copy. The subject code is unknown (null) and the version dates are assumed. Under the Heritage-Based Curriculum
   (2024-2030) new syllabi were issued: confirm which syllabus the November 2026 and later examinations use and add a
   new version file when it changes (a new version must cover the same concepts, docs/CONTENT_PIPELINE.md §13).
10. **Answers typed with the box prefix.** The number parser gives 0 for an answer typed together with the prefix shown
    beside the box, e.g. "×12" or "x400" in magnification boxes (`cells.magnification` q02, q08, q12, q17, q21;
    `practical.results-and-evaluation` q21), "12:1" in ratio boxes (`cells.diffusion-and-active-transport` q06,
    q16(b)) and "pH 7" (`enzymes.temperature-and-ph` q10(a)). The UI shows the prefix and opens a number keypad,
    so the risk is mainly on desktop; the platform could strip a leading answer prefix before marking.
11. **Superscripts in daily questions.** Some daily-eligible genetics items show LaTeX superscripts (I^A, X^b:
    `inheritance.codominance` q03–q05, `inheritance.sex-linkage` q04). They render on the web; they would not render
    in plain-text channels such as WhatsApp (switched off).

## Needs a specialist teacher's check

**Syllabus alignment (ZIMSEC, against a clean copy of the official document):**

- Placement of cell transport: the copy read never uses the word "osmosis", so diffusion and active transport are
  covered under 8.6.1 (absorption) and osmosis under 8.5.3 (water uptake, turgor, wilting). The numbering gaps (no
  8.2.2, no 8.6.2) and the assumption that digestion, teeth and the liver belong to 8.6.1.
- Content covered for Cambridge only because it was not found in the copy read: characteristics of living organisms,
  binomial naming and dichotomous keys, vertebrate and arthropod groups, magnification, protein synthesis, sex
  linkage, adaptive features (hydrophytes and xerophytes) and food-production methods. Mitosis and meiosis are taught
  to ZIMSEC students under 8.6.7 (gamete formation) although the copy says details are not required.
- DNA base-pairing items (`molecules.dna-structure` q01–q05, q09–q15, q19, q20) are shown to ZIMSEC students,
  labelled "(Supplement)", although the copy lists only nucleotides and the roles of DNA and RNA; restrict them with
  `applies: ["cambridge"]` if the official syllabus excludes DNA structure.
- The syllabus names chloroquine and paludrine as antimalarials; the content teaches artemisinin-based combination
  therapy (ACT) as Zimbabwe's current first-line treatment and treats chloroquine resistance as history. Confirm the
  wording ZIMSEC examiners expect.

**Cambridge 0610:**

- Supplement material deliberately not restricted to Cambridge because ZIMSEC teaches the topic in broader terms:
  items on the transpiration pull, sources and sinks in translocation and auxin, and the five kingdoms (Supplement in
  0610 1.3, Core for ZIMSEC 8.9.1; left unlabelled because the lesson explains the split). Decide whether they should
  be restricted or labelled "(Supplement)".
- `ecology.populations` q14(b) uses carrying capacity (a ZIMSEC term) for both boards, with the term explained in the
  stem; q11 and q12 are ZIMSEC-only.

**Local and current facts** (most were checked by writers or reviewers with web searches on 2026-10-07/08 and are
stated in general terms; confirm them before production):

- Health: the 2008–2009 cholera outbreak (one of the largest in Africa's recent history, reaching every province); the
  Blair VIP latrine developed in Zimbabwe; HPV vaccination offered to girls; the Zimbabwe National Family Planning
  Council; "undetectable = untransmittable"; ACT as first-line malaria treatment; school praziquantel programmes;
  "some brands" of maize meal and cooking oil being fortified.
- Drugs and the law: street names for crystal meth (mutoriro, guka); recreational cannabis possession being illegal.
- Farming and environment: fall armyworm first seen in Zimbabwe in 2016; ethanol blending of petrol from Chisumbanje;
  Zimbabwe not allowing GM crops to be grown; dip-tank frequency ("regularly, often every week" in the rainy season);
  the Tuli breed; Pfumvudza; CAMPFIRE (1989); National Tree Planting Day (first Saturday of December).
- Water and fisheries: kapenta introduced from Lake Tanganyika in 1967–68; Lake Chivero's feeder rivers; Kariba power
  cuts in 2022; largemouth bass stocked in Zimbabwean dams for angling (`ecology.food-chains.q11`; introduced in the
  1930s and studied in Lake Manyame, checked on 2026-10-08).

**Marking judgement calls left as they are:**

- Lenient: the genus alone earns the mark for `disease.cholera` q03 ("Vibrio") and `disease.tuberculosis-and-typhoid`
  q20 ("Salmonella", although other Salmonella species cause food poisoning); `coordination.eye` q21 also accepts
  "macula"; `ecology.ecosystem-management` q20 gives full credit for "overgrazing" (with corrective feedback).
- Strict: `variation.adaptive-features` q19 rejects "adaptation" (0610 uses the word for the process; the student sees
  why); `variation.mutation` q04 rejects a bare "sunlight" but accepts UV; `inheritance.protein-synthesis` q13 does not
  accept "pump" for carrier protein.
- Rennin is described as "mainly important in young mammals such as calves", and the fate of lactic acid follows the
  Cambridge wording ("broken down by aerobic respiration in the liver").

**Content:**

- Advisory `content:check` findings kept on purpose: the standard energy values 17 and 39 kJ per gram
  (`human-nutrition.balanced-diet` q09, q10, q17, q24), the 28-day cycle with ovulation on day 14
  (`reproduction.puberty-and-menstrual-cycle` q16, q20), the real Mauna Loa carbon dioxide readings 317, 339, 370 and
  414 ppm used for different calculations (`human-impact.greenhouse` q09, q13), shared class boundaries only
  (`variation.variation` q14), the standard 1.0 mg per cm³ vitamin C solution (`molecules.food-tests` q16), and
  coincidental numbers in different data sets (`animal-transport.blood` q17/q23, `enzymes.enzymes-in-industry`
  q16/q17, `plant-nutrition.rate-and-gas-exchange` q16–q18).
- Options that use the same letters as labels in the stem (flasks, organs or seedlings labelled A–E), e.g.
  `respiration.anaerobic-respiration` q16(a), `human-nutrition.digestive-system` q16(b) and
  `coordination.plant-responses` q17(a): correct, but an option "A" reading "A and B" may confuse; relabelling the stem
  items P, Q, R … would be clearer. (Blood-group options such as "A, B and AB" in `inheritance.codominance` cannot be
  relabelled.)
- All survey, clinic, fishery and school-trial data are invented for illustration and labelled hypothetical; food
  composition, blood-test ranges and joint movements are given as approximate or typical values. Check that none reads
  as an official statistic.
- Two lessons are longer than the 1,600-word guideline (laboratory safety, about 1,750 words; limiting factors and gas
  exchange, about 1,650), and a few others, such as fertilisation and germination and soil, are close to it.

## Maintenance

- The files in this directory are the source of truth. The writers' generator scripts (in the untracked `.scratch/`
  folder, e.g. `.scratch/bio-coord-slice/`) predate the review fixes: **do not re-run them**.
- The topic tests and mocks were generated by `.scratch/bio-assemble/build-assessments.mjs` from a compact spec with a
  pool and overlap check per rule (it reads the bank snapshot `.scratch/bio-assemble/inventory2.json`; regenerate that
  with `.scratch/bio-assemble/inventory2.ts` after the bank changes). Edit the JSON directly (or the script, then run
  it with `--write`) and run `npm run content:validate -- biology-o`, which re-proves every blueprint.
  `.scratch/bio-assemble2/optimise.cjs` picks mark values for a list of single-topic exam-style rules (fixed total,
  largest candidate pools). A changed blueprint of a published test is imported as a draft copy and replaces the
  published revision only when it is published.
- When adding questions, set `examStyle` on exam-format items (the theory mocks draw them), label Supplement-only items
  "(Supplement)" in the stem, and restrict board-specific depth with `applies`.
