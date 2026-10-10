# history-a — writing brief for content agents

You write ORIGINAL study content for the A-Level History family: ZIMSEC A-Level History (Forms 5-6, 2015-2022) — the
main product — and Cambridge International AS & A Level History 9489 (2027-2029). Content is DEV preview only; a human
reviews it later (§41), but write it as if it ships tomorrow. **Historical accuracy is the first rule**: a wrong date,
name or event is worse than a missing one. This is A-Level: sustained explanation, judgement, source work and
historiography are expected, at the depth of the deeper board.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, tables).
- `content/concepts/history-a.json` (106 concepts). Each description starts with its coverage label — "Both boards
  (ZIMSEC Forms 5-6; Cambridge AS Level).", "Cambridge only (A Level only).", "ZIMSEC only (Forms 5-6)." — and says exactly
  what is IN and what is OUT; "ZIMSEC detail" / "Cambridge detail" marks content only one board names. Stay inside it;
  when two concepts touch, give the other one a sentence and move on. 30 concepts are shared, 67 ZIMSEC only, 9
  Cambridge only (the Paper 3 debates and the A Level skill).
- The two syllabus files: `content/syllabi/zimsec/a-level/history/2015-2022.json` (topics 1-19 of the topic list;
  sub-topics follow the competency matrix; node S is our essay-skills node) and
  `content/syllabi/cambridge/a-level/history/2027-2029.json` (section **AS**: skills node AS-S plus three alternative
  options — the **European option is the one the platform covers**, the American and International options are listed
  as headings only; section **A**: skills node A-S, **Paper 3** with three topics each split into a *context* node and
  *debate* nodes, and **Paper 4** options — the **European option** (Mussolini, Stalin, Hitler) is covered, the other
  two are headings only; every covered key question is a node whose objectives paraphrase the specified content).
  Read the `notes` of both (assessment as read, the Heritage-Based Curriculum caveat, scrambled ZIMSEC tables, the
  covered-options decision).
- **Which Cambridge options the platform covers first, and why.** AS European option (France 1774-1814, Germany 1815-71,
  Russia 1881-1924), all three Paper 3 topics and the Paper 4 European option, because they overlap ZIMSEC (the French
  Revolution and Napoleon, German unification, the causes of 1914, Fascism and Nazism, the Russian Revolution and Stalin)
  so that one lesson serves both boards, and because the European AS option and the Paper 4 European option form one
  course. The International option (with Paper 4 Topic 8, the end of minority rule in South Africa and Zimbabwe) is the
  recommended next phase. Do not write content for the uncovered options.
- **AS versus A Level (Cambridge).** Every Cambridge concept is labelled "Cambridge AS Level" (Papers 1 and 2) or
  "Cambridge A Level only" (Papers 3 and 4). AS items feed Papers 1 and 2; A Level items feed Papers 3 and 4. Concepts
  shared with ZIMSEC (for example the First World War's causes, which is Paper 3 context for Cambridge) are written once,
  to the deeper depth.
- `.scratch/history-a/lib.mjs`: builders (`concept`, `b.mcq/tf/short/fib/match/manualShort/ext/essay/struct/card`,
  `P.*` parts including `P.group` for sub-parts), selectors `ZIM`, `CAM`, and the history helpers `source()`, `sources()`,
  `paper1Sources()` (exactly four sources, at most one visual, at most 600 words in total), `extract()` (an invented,
  unattributed passage of at most 600 words for Paper 3), `table()`, `timeline()`, `levels(marks, kind)` (kinds
  `"argument"`, `"sources"`, `"interpretation"`), `EXAM` (exam-format plans) and `checkExam(plan, parts)`. There is **no
  `String.raw` helper `t`** in this kit: write real line breaks in template literals. A typed backslash-n is refused by
  the builder (and shows on screen as the two characters "\" and "n").
- Style examples: `.scratch/english/slices/a1-nouns-pronouns.mjs` (slice style: every MCQ option has a rationale,
  explanations teach, hints from difficulty 3); any `.scratch/history/slices/w*.mjs` (O-Level History slices with sources,
  timelines and levels of response); the worked ESSAY example on the 1896-97 risings in `docs/CONTENT_PIPELINE.md` §7;
  any lesson in `content/subjects/history-o/lessons/` (front matter + blocks). Go well beyond them in depth and analysis.

## What to produce per concept

1. **One lesson** `content/subjects/history-a/lessons/<area>/<name>.md` (key `<area>.<name>`, where the concept key is
   `ahist.<area>.<name>`; e.g. `ahist.france.terror-directory` → `lessons/france/terror-directory.md`, key
   `france.terror-directory`), **900-1,600 words** (tables do not count), template of §6: `## Introduction` (why it
   matters; a hook that links to Zimbabwe or Africa where it fits naturally; what the student should know already),
   `## Key definitions` (`:::definition{term="…"}` for terms such as *concession*, *estate*, *collectivisation*,
   *intentionalism*; `:::keyfact` for dates and names to learn), explanation sections in chronological or thematic order
   with **a timeline table** (`timeline()` output pasted in) and at least two `:::example` blocks (a cause explained step
   by step, an interpretation weighed, a source analysed, a paragraph of an essay answer), `## Common mistakes`
   (`:::mistake{title="…"}` — confused dates, names, causes vs results, narrative instead of explanation), `## Exam tips`
   (`:::exam-tip`: which papers test it — ZIMSEC Paper 1 or 2 (25-mark essays), Cambridge Papers 1-4 — and how
   *describe, explain, to what extent / how far, assess, evaluate* and source or extract questions are answered for this
   concept), `## Summary` (one `:::summary`, 4-6 bullets). Front matter: key, title (unique), summary, concepts ([the
   concept]), estimatedMinutes (honest), level "core"; `freePreview: true` ONLY on the lessons named in your assignment.
   Do not add `objectives`. Where the boards differ, add a short `:::keyfact{title="ZIMSEC and Cambridge"}` saying who
   needs what (for example "Italy's unification: ZIMSEC only"; "Calonne and the Assembly of Notables: Cambridge").
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/history-a/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 40%; four options, 1 mark; dates, people, causes, consequences, "which best explains",
     "which statement about the source or extract is supported"), true/false, matching (person → role, event → date, term →
     definition, cause → consequence), fill-in-the-blank (dates and names with `choices` drop-downs — free-text names are
     risky), short answer ONLY for closed answers (list every accepted spelling: Lobengula/Lobhengula, Mzilikazi/Mzilikazi
     kaMashobane, Robespierre), a chronology item (order four events: a `match` of event → position, built from a
     `timeline()`), 3-5 self-marked `manualShort` items (describe/explain, 2-6 marks, tickable points), and 2-4 **practice
     structured or extended** items (`b.struct` / `b.ext`, difficulty 3-5, `examStyle: true`, totals 6, 8, 12, 14 or 16 —
     never 25, 30 or 40, see reserved marks), at least one built on 1-3 original sources (or, for Paper 3 concepts, on an
     original extract of 100-250 words).
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 understanding/application, ~30% d4-5 analysis/evaluation.
     `daily: true` only on 2-3 auto-marked items of difficulty 2-3 per concept.
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION.
   - `applies`: shared concepts ("Both boards") — omit it when an item suits both; `applies: ZIM` / `applies: CAM` when
     it depends on one board's depth or wording.
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FACT ("When was the Rudd Concession signed?" →
     "30 October 1888"), CONCEPT ("Why did the early phase of the armed struggle fail?").

## History quality rules (non-negotiable)

- **Facts are right or absent.** Dates, names, places and sequences must be well established. If you are not sure, leave
  the detail out or write the general statement ("in the late 1880s"). Never invent people, events, treaties, statistics
  or "a historian said". Numbers of deaths, armies or migrants: only widely accepted estimates, labelled as estimates
  ("historians estimate that about…"), with a range where historians differ (the First World War, the Second World War,
  the Great Leap Forward famine, the Maji Maji deaths, the Soviet war dead, the Holocaust). Russian dates: say whether old
  or new style (February/March, October/November 1917).
- **Contested interpretations are presented as such**: the decline of Great Zimbabwe, the causes and scale of the Mfecane,
  the coordination of the 1896-97 risings, the partition of Africa's causes, responsibility for 1914, the Holocaust
  (intentionalism, structuralism, functionalism), the Cold War's origins, land reform, the success of Stalin's policies,
  the Great Leap Forward. Give the main views fairly ("Some historians argue…; others point out…") and let the student
  judge. MCQs never hinge on a contested judgement; they test facts or what a view says.
- **Historians and historiography (Paper 3 concepts and any lesson that names a historian).** Name a historian and a
  work only where the concept description names them or you are certain (author, title, year). Paraphrase positions;
  NEVER quote a historian, textbook, mark scheme or past paper, and never write "as X said" with invented words.
  **Extracts are invented**: build them with `extract(text)` — an original passage of at most 600 words in the manner of
  a historian, unattributed, labelled invented, with a clear argument and approach (what the author asks, assumes,
  values) that a candidate can analyse; never reproduce or closely imitate a real historian's text.
- **Sources in questions are ORIGINAL and labelled.** Build them with `source(label, kind, text, { described })`: the
  label line says what the source is and "(invented for this question)". Attribute invented sources only to fictional or
  anonymous people ("a fictional Ndebele elder interviewed in the 1930s", "an editorial in a British newspaper, 1919",
  "a cartoon of the kind published in German newspapers in 1919, described in words"). **Never put invented words in the
  mouth of a real person** (no invented Rhodes letter, Robespierre speech or Hitler order) and never present an invented
  source as a real document. Visual sources are described in words (no images). Real documents may be named and
  PARAPHRASED in lessons. Direct quotation of real documents only if public domain, short (under 25 words), you are
  certain of the exact wording, and it is cited in the text; otherwise paraphrase.
- **Source questions test the skill, not trivia**: message and inference, purpose and provenance, reliability with a
  reason from the source's origin AND its content checked against own knowledge, comparison of two sources (agree and
  disagree on specific points), "How far do these sources show…" with both sides. Each source carries enough provenance
  (who, when, why, for whom) to evaluate; make sources differ in reliability on purpose and say why in the mark scheme.
- **Zimbabwean and African history with balance and care.** Pre-colonial states are African achievements studied on their
  own terms (say clearly that Great Zimbabwe was built by the ancestors of the Shona, as archaeology shows). Colonisation,
  land seizure, forced labour and segregation laws are described plainly and factually, including African resistance and
  agency. The liberation struggle: ZANU/ZANLA and ZAPU/ZIPRA both receive fair treatment; violence by all sides is
  acknowledged factually without graphic detail; the raids on camps at Nyadzonia (1976) and Chimoio (1977) are stated with
  dates and approximate numbers only where well documented. After 1980: reconciliation, achievements in education and
  health, ESAP, the disturbances in Matabeleland and the Midlands in the 1980s (acknowledged factually and sensitively; the
  Unity Accord of 22 December 1987), land reform and sanctions — aims, outcomes, criticisms and different views; no party
  slogans, no praise or blame of living politicians. Slavery, the Holocaust, the Terror and famines: accurate, respectful,
  focused on victims as people, no graphic description; never use slurs even in quoted context.
- **Reference dates you may rely on** (all well established): Grobler Treaty 1887; Moffat Treaty February 1888; Rudd
  Concession 30 October 1888; Royal Charter 29 October 1889; Pioneer Column at Fort Salisbury 12 September 1890;
  Anglo-Ndebele War 1893-94; Umvukela (Matabeleland) March 1896, Mashonaland June 1896; Nehanda and Kaguvi executed April
  1898; referendum 1922 and Responsible Government from 1 October 1923; Land Apportionment Act 1930; Federation 1953-63
  (dissolved 31 December 1963); UDI 11 November 1965; Chinhoyi 28 April 1966; Altena Farm 21 December 1972; Lancaster
  House September-December 1979 (agreement signed 21 December 1979); independence 18 April 1980; Unity Accord 22
  December 1987; ESAP from 1991; fast-track land reform from 2000; new Constitution 2013; OAU 25 May 1963, AU 2002; SADCC
  1980, SADC 1992; UN 24 October 1945. Berlin Conference November 1884-February 1885; Adwa 1 March 1896; Maji Maji
  1905-07. French Revolution: Estates-General 5 May 1789, Tennis Court Oath 20 June, Bastille 14 July 1789, Louis XVI
  executed 21 January 1793, Robespierre fell 27 July 1794 (9 Thermidor), coup of 18 Brumaire 9 November 1799, Napoleon
  emperor 2 December 1804, Leipzig October 1813, abdication April 1814, Waterloo 18 June 1815. Germany: Carlsbad Decrees
  1819, Zollverein 1834, Frankfurt Parliament opened 18 May 1848, Olmütz November 1850, Bismarck Minister-President
  September 1862, Königgrätz (Sadowa) 3 July 1866, Ems Telegram 13 July 1870, Sedan 2 September 1870, Empire proclaimed 18
  January 1871. Russia: Bloody Sunday 22 January 1905 (new style), Stolypin murdered 1911, Tsar abdicated 15 March 1917
  (2 March old style), Bolsheviks seized power 7 November 1917 (25 October old style), Brest-Litovsk 3 March 1918, Lenin
  died 21 January 1924, Kirov murdered 1 December 1934. Italy and Germany: March on Rome 28 October 1922, Matteotti
  murdered June 1924, Lateran Treaties 11 February 1929; Hitler Chancellor 30 January 1933, Reichstag Fire 27 February
  1933, Enabling Act 23 March 1933, Night of the Long Knives 30 June-2 July 1934, Kristallnacht 9-10 November 1938,
  Wannsee Conference 20 January 1942. First World War 28 July 1914-11 November 1918; Sarajevo 28 June 1914; Treaty of
  Versailles 28 June 1919; Nazi-Soviet Pact 23 August 1939; invasion of Poland 1 September 1939; German surrender 8 May
  1945; Yalta February 1945; Potsdam July-August 1945; Truman Doctrine 12 March 1947; Berlin Blockade 24 June 1948-12 May
  1949; NATO 4 April 1949; People's Republic of China 1 October 1949.
- **No images.** Maps and pictures are described in words; data and chronologies are Markdown tables. Never write "the map
  below shows" unless the table is there.
- **MCQs:** exactly one defensible answer, four options, distractors definitely wrong (rationale for each, e.g. the right
  event with the wrong date, a cause of a different war, a person from the wrong side); never "all/none of the above",
  never refer to options by letter. **No length cue** — the key must not be clearly the longest option; check with
  `node .scratch/tools/length-cue.mjs history-a questions/<your folder>/` → `# 0 flagged`.
- **Self-marked items:** one point per creditworthy idea, as examiners award (identify 1 + explain/develop 1: "Explains
  that the Land Apportionment Act reserved the best land for whites, so Africans were crowded into reserves"); points add
  up to the marks; example answer complete. Explain parts need developed reasons, not lists; *how far / to what extent*
  parts need both sides and a supported conclusion and get `levels: levels(marks)`.
- **Original wording**, British English, names in Zimbabwean contexts (Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho,
  Thandeka) for invented modern people only. Dates as 7 October 2026; centuries as "the nineteenth century"; BCE/CE for
  ancient dates. Use a real line break wherever you want one; never type a backslash followed by n.

### Terminology between the boards

| ZIMSEC (syllabus / common usage) | Cambridge 9489 |
|---|---|
| First Chimurenga/Umvukela; Second Chimurenga/Umvukela, the armed (liberation) struggle | (not in the covered options) |
| The French Revolution and the Napoleonic Era | France, 1774-1814 (Ancien Régime, the Revolution, the Terror, the Directory, Napoleon) |
| Unification in Germany and Italy | Liberalism and nationalism in Germany, 1815-71 (Italy is not in 9489) |
| The Russian Revolution (1905, February and October 1917) | Russia from autocracy to revolution, 1881-1924 |
| Fascism in Italy and Germany; Hitler and Mussolini's domestic and foreign policies | Mussolini's Italy; Hitler's Germany (Paper 4) |
| Russia 1905-1945 (Stalin) | Stalin's Russia, 1924-41 (Paper 4) |
| The First World War: causes | Paper 3 Topic 1 context, c.1890-1914, plus the historians' debate |

In a shared concept give both names the first time ("the February (March) Revolution").

## Exam-format items (rows owned per assignment below)

Every paper of both boards is **written**: there are no multiple-choice papers (one-mark MCQs feed topic tests and the
practice mix only). `examStyle: true`, the exact `type`, marks, `skill` and `applies` of the plan in `EXAM` (lib.mjs);
`paper:` (for example `"Paper 2"`); difficulty 4-5; `concepts: [...]` on every item set to the concepts it really
examines (all covered by that syllabus). The builder refuses an item worth 25, 30 or 40 marks that does not match a plan,
and STRUCTURED parts must carry the plan's labels and marks (use `checkExam(EXAM.X, [...])`). Part labels are `(a)`,
`(b)` … with sub-parts `(i)`, `(ii)` one level deep via `P.group` if you need them, or `(1)` with sub-parts `(a)`; never
"1(a)" (the validator rejects it). Mocks draw by type + marks + skill (+ topic), so these must be EXACT:

| Paper item | plan | type, marks, skill | applies | content and parts (our convention: the syllabi give only paper totals; a reviewer must check) | how many |
|---|---|---|---|---|---|
| **ZIMSEC Paper 1** (History of Zimbabwe) and **Paper 2** (Regional and International History): one essay question out of the four of a lettered section; candidates answer four of 16-20 in 3 hours | `EXAM.ZIM_ESSAY` | ESSAY, 25, EVALUATION | ZIM | `b.essay({ stem, marks: 25, points, levels: levels(25), modelAnswer, wordLimit })`: one question ("To what extent…?", "Assess…", "Account for…", "Examine…") with points that add up to 25 (about 8 developed points at 2-3 marks plus marks for judgement), `levels(25)` and a full model answer of 600-900 words; `paper: "Paper 1"` or `"Paper 2"` | 28 (13 on Paper 1 topics, 15 on Paper 2 topics) |
| **Cambridge Paper 1**: historical sources, one question on a prescribed AS topic (European option: France, Germany or Russia) | `EXAM.CAM_P1` | STRUCTURED, 40, ANALYSIS | CAM | stem = `paper1Sources([...])` (four invented sources with provenance; at least three written, at most one visual; 600 words in all) plus the topic; (a) 15 "Compare Sources A and B as evidence about…" (`levels(15, "sources")`, similarities and differences with context and evaluation); (b) 25 "How far do the sources support the view that…?" (`levels(25, "sources")`, all four sources + own knowledge, both support and challenge) | 6 |
| **Cambridge Paper 2**: outline study, two questions on one option | `EXAM.CAM_P2` | STRUCTURED, 30, EVALUATION | CAM | (a) 10 "Explain why…" (`levels(10)`); (b) 20 "To what extent… / How far do you agree… / How successful was…?" (`levels(20)`, the given and alternative perspectives, a comparative judgement) | 12 (one per European-option key question) |
| **Cambridge Paper 3**: historical interpretations, one question on one topic | `EXAM.CAM_P3` | ESSAY, 40, ANALYSIS | CAM | stem = `extract(text)` (invented, unattributed, at most 600 words) + "What can you learn from this extract about the interpretation and approach of the historian who wrote it? Use the extract and your knowledge of … to explain your answer."; `levels(40, "interpretation")`; points (about half knowledge, half interpretation), model answer | 6 (two per topic) |
| **Cambridge Paper 4**: depth study, "Assess" or "Evaluate" | `EXAM.CAM_P4` | ESSAY, 30, EVALUATION | CAM | one question on a European-option key question (for example "Evaluate the view that…"); `levels(30)`; points, model answer | 9 (three per topic: Mussolini, Stalin, Hitler) |

Each self-marked exam item: indicative content as points that add up to the marks (with `levels`) and a full model
answer (`modelAnswer`). Put the items in extra modules: `concept(<one of the item's concepts>, { file:
"exam/<prefix>zimsec", keyPrefix: "exam.<prefix>zimsec" }, …)` for ZIM_ESSAY rows and `exam/<prefix>cambridge` (key prefix
`exam.<prefix>cambridge`) for the Cambridge rows (the file names are the slice prefix plus `zimsec` / `cambridge`, for
example `exam/w1a-zimsec`).

**Reserved mark values.** An item worth **25** (ZIM_ESSAY), **30** (CAM_P2 STRUCTURED and CAM_P4 ESSAY) or **40** (CAM_P1
STRUCTURED and CAM_P3 ESSAY) marks is only for the exam-format rows above. Practice structured and extended items use 6, 8,
12, 14 or 16 marks. (The part marks 10, 15 and 20 occur only inside the plans.)

**Mock exams** (built later by the lead from these items, not by writers; `.scratch/history-a/build-assessments.mjs`):
ZIMSEC Paper 1 offers eight 25-mark essays by topic (topics 1-3, 6-8, 10-13), answer any four, 180 minutes, 100 marks;
ZIMSEC Paper 2 offers ten 25-mark essays (topics 2, 4, 5, 9, 14-19), answer any four, 180 minutes, 100 marks;
Cambridge Paper 1: one 40-mark question on one prescribed topic (three mocks: France, Germany, Russia), 75 minutes;
Cambridge Paper 2: two 30-mark questions on the two European topics rotated into Paper 2 in 2027, 2028 or 2029 (three
mocks), 105 minutes, 60 marks; Cambridge Paper 3: one 40-mark question (three mocks, one per topic), 75 minutes;
Cambridge Paper 4: a choice of three 30-mark questions (Mussolini, Stalin, Hitler), answer two, 105 minutes, 60 marks.
Continuous assessment (ZIMSEC coursework) and the hidden practical skills are not simulated.

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas (from the concept keys): skills, precolonial, contact, slavery, imperialism, colonisation, risings, colonial,
  resistance, liberation, independence, empowerment, constitution, france, europe, italy, germany, ww1, peace,
  ww1-debate, mussolini, nazi, fascism, ww2, russia, stalin, china, orgs, holocaust, coldwar.
- Lesson titles must be unique (slugs come from titles). Lesson-only scratch scripts go in
  `.scratch/history-a/tables/<prefix><name>.mjs` (never in `slices/`, which the build imports).

## Commands (repo root)

- Build your slices only: `node .scratch/history-a/build-content.mjs <your-prefix>` (prefix match on the START of file
  names, e.g. `w2a-`; the trailing dash matters, so `w1a-` does not pick up `w1b-` files).
- Validate: `npm run content:validate -- history-a --strict` → 0 error(s), 0 warning(s). Other writers work in the same
  family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- history-a` → fix findings in your files.
- Length cue: `node .scratch/tools/length-cue.mjs history-a questions/<your folder>/` → `# 0 flagged`.
- Literal "\n" check: `node .scratch/tools/literal-newlines.mjs history-a` → `# 0 total` (a typed backslash-n in text shows
  on screen as "\n"; use real line breaks).

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, build-assessments.mjs, concepts.mjs, the registry, the syllabus files,
  `.scratch/tools/`, other families or other writers' files: report needed changes (a concept boundary, a missing helper)
  instead.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format items,
  validation, content:check, length-cue and literal-newline results, any fact you left out or want a reviewer to check.

## Proposed split into 8 writer assignments

106 concepts; 13-14 per assignment plus exam rows of roughly equal weight (an exam row counts about half a concept).
Concept keys below drop the `ahist.` prefix. ★ = `freePreview: true` (at most one lesson per top-level topic of each
syllabus: a ZIMSEC topic 1-19 or node S; for Cambridge a covered AS topic (France, Germany, Russia), a Paper 3 topic or a
Paper 4 topic; a shared concept counts for both). ZIM = ZIM_ESSAY rows, CAM = Cambridge rows.

**W1a — prefix `w1a-`** (13; ZIMSEC: sources, pre-colonial societies and states)
skills.sources-of-history ★ (topic 1), precolonial.san-khoikhoi, precolonial.bantu-migrations,
precolonial.state-origins-theories, precolonial.mapungubwe-great-zimbabwe ★ (topic 2), precolonial.mutapa,
precolonial.torwa-rozvi, precolonial.ndebele-state, precolonial.mfecane-zulu, precolonial.gaza, precolonial.mandinka,
precolonial.decline-of-states, contact.indian-ocean-traders.
Folders: `skills/sources-of-history`, `precolonial/`, `contact/indian-ocean-traders`.
Exam rows: ZIM_ESSAY ×5 (Paper 1: sources of history ×1, Zimbabwean states ×2 — Great Zimbabwe/Mutapa/Rozvi and the
Ndebele state; Paper 2: African states ×2 — the Zulu state and Mfecane; Gaza, Mandinka and the decline of states).

**W1b — prefix `w1b-`** (13; ZIMSEC: contacts, colonisation, risings, colonial rule, the slave trade)
contact.portuguese ★ (topic 3), contact.missionaries-hunters-traders, contact.european-states-interests,
colonisation.occupation, colonisation.anglo-ndebele-war, risings.causes ★ (topic 7), risings.course-results,
risings.spirit-mediums-defeat, colonial.company-rule ★ (topic 8), colonial.settler-rule-legislation,
colonial.udi-rhodesian-front, slavery.abolition ★ (topic 4), slavery.legitimate-trade.
Folders: `contact/` (three concepts), `colonisation/ risings/ colonial/ slavery/`.
Exam rows: ZIM_ESSAY ×5 (Paper 1: early contacts ×1, colonisation and the Anglo-Ndebele War ×1, the First Chimurenga ×1,
colonial administration ×1; Paper 2: the transition from the slave trade to legitimate trade ×1).

**W2a — prefix `w2a-`** (13; ZIMSEC: imperialism, resistance, the liberation struggle)
imperialism.scramble-causes, imperialism.berlin-partition ★ (topic 5), resistance.ethiopia-menelik,
resistance.maji-maji, resistance.mozambique, liberation.early-nationalism, liberation.nationalist-parties,
liberation.causes-peaceful-attempts, liberation.armed-struggle-1966-72 ★ (topic 10), liberation.armed-struggle-1972-79,
liberation.roles-and-impact, liberation.lancaster-house, independence.political.
Folders: `imperialism/ resistance/ liberation/`, `independence/political`.
Exam rows: ZIM_ESSAY ×5 (Paper 1: the Second Chimurenga ×2, post-independence political developments ×1; Paper 2:
imperialism and the partition ×1, primary resistance elsewhere in Africa ×1).

**W2b — prefix `w2b-`** (14; ZIMSEC: post-independence, empowerment, the Constitution, organisations, the peace settlements)
independence.economic, independence.social, independence.foreign-policy, empowerment.indigenisation,
empowerment.land-1980-99, empowerment.land-third-chimurenga, empowerment.intellectual-property, constitution.human-rights ★
(topic 13), constitution.democracy, orgs.united-nations, orgs.african-union, orgs.sadc ★ (topic 19), peace.paris-settlement,
peace.league-of-nations.
Folders: `independence/` (economic, social, foreign-policy), `empowerment/ constitution/ orgs/ peace/`.
Exam rows: ZIM_ESSAY ×5 (Paper 1: economic and social developments ×1, indigenisation and land reform ×1, the Constitution
×1; Paper 2: the Paris peace settlement or the League ×1, regional and international organisations ×1).

**W3a — prefix `w3a-`** (13; France, European nationalism, Italy, Mussolini)
france.ancien-regime-1789 ★ (ZIMSEC topic 14, Cambridge France), france.republic-1792, france.terror-directory,
france.napoleon-power, france.napoleon-empire-fall, france.revolution-impact, europe.vienna-congress-system,
europe.restored-bourbons, italy.unification, mussolini.rise-dictatorship, mussolini.governance, mussolini.economy,
mussolini.society.
Folders: `france/ europe/ italy/ mussolini/`.
Exam rows: ZIM_ESSAY ×3 (Paper 2: the French Revolution or Napoleon ×1, nationalism in Europe — Vienna, Bourbons, Italy ×1,
Fascism — Mussolini ×1); CAM_P1 ×2 (France, 2 different sets of sources); CAM_P2 ×4 (one per France key question 1.1-1.4);
CAM_P4 ×3 (Mussolini: one each on 1.1, 1.2/1.3 and 1.4).

**W3b — prefix `w3b-`** (13; Germany, the First World War, the essay skill)
germany.vienna-to-1848, germany.revolutions-1848-49, germany.austria-prussia-1850-62, germany.bismarck-to-1866,
germany.unification-1871 ★ (ZIMSEC topic 15, Cambridge Germany), ww1.long-term-causes ★ (ZIMSEC topic 16, Cambridge Paper 3
Topic 1 context), ww1.july-crisis, ww1.events, ww1.results-impact, ww1-debate.responsibility-fischer,
ww1-debate.modern-interpretations, skills.source-evaluation, skills.essay-and-judgement ★ (ZIMSEC node S, Cambridge
AS-S).
Folders: `germany/ ww1/ ww1-debate/ skills/` (source-evaluation, essay-and-judgement).
Exam rows: ZIM_ESSAY ×2 (Paper 2: German unification ×1, the First World War ×1); CAM_P1 ×2 (Germany); CAM_P2 ×4 (one per
Germany key question 2.1-2.4); CAM_P3 ×2 (the origins of the First World War, different extracts).

**W4a — prefix `w4a-`** (14; Nazi Germany, the Holocaust, the Cold War, the Second World War)
nazi.rise-dictatorship ★ (ZIMSEC topic 17, Cambridge Hitler), nazi.governance, nazi.economy, nazi.society,
fascism.comparison-impact, ww2.causes, ww2.events, ww2.results-impact, holocaust.nazi-policy-1933-45 ★ (Paper 3 Topic 2),
holocaust.debate-origins, holocaust.debate-perpetrators-victims-bystanders, coldwar.origins-1941-49 ★ (Paper 3 Topic 3),
coldwar.debate-schools, coldwar.debate-new-history.
Folders: `nazi/ fascism/ ww2/ holocaust/ coldwar/`.
Exam rows: ZIM_ESSAY ×1 (Paper 2: the Second World War); CAM_P4 ×3 (Hitler's Germany); CAM_P3 ×4 (the Holocaust ×2, the
Cold War ×2, different extracts). The Holocaust lessons are written with particular care (see the quality rules).

**W4b — prefix `w4b-`** (13; Russia, Stalin, China, the A Level interpretations skill)
russia.tsarist-challenges, russia.revolution-1905, russia.revolutions-1917 ★ (ZIMSEC topic 18, Cambridge Russia),
russia.bolshevik-consolidation, russia.great-patriotic-war, stalin.power-struggle, stalin.governance, stalin.economy,
stalin.society, china.revolutions-1900-49, china.mao-1949-76, china.comparison-with-russia,
skills.interpretations-and-approach ★ (Cambridge A-S).
Folders: `russia/ stalin/ china/`, `skills/interpretations-and-approach`.
Exam rows: ZIM_ESSAY ×2 (Paper 2: the Russian Revolution ×1, China ×1); CAM_P1 ×2 (Russia); CAM_P2 ×4 (one per Russia key
question 3.1-3.4); CAM_P4 ×3 (Stalin's Russia).

Totals: ZIM_ESSAY 28, CAM_P1 6 (France 2, Germany 2, Russia 2), CAM_P2 12 (every European key question once), CAM_P3 6
(two per topic), CAM_P4 9 (three per topic). The shared skills concepts (source-evaluation, essay-and-judgement) are
taught on examples from several periods; the interpretations lesson uses invented extracts on topics other than the three
prescribed ones.
