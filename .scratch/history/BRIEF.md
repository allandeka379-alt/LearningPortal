# history-o — writing brief for content agents

You write ORIGINAL study content for the History family: ZIMSEC O-Level History (Forms 1-4, 2015-2022) and Cambridge
IGCSE History 0470 (2027-2028). Content is DEV preview only; a human reviews it later (§41), but write it as if it
ships tomorrow. **Historical accuracy is the first rule**: a wrong date, name or event is worse than a missing one.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, tables).
- `content/concepts/history-o.json` (111 concepts). Each description says exactly what is IN and what is OUT, and
  starts "ZIMSEC only", "Cambridge only" or "Both boards". Stay inside it; when two concepts touch (e.g. Versailles
  and the Weimar crises), give the other one a sentence and move on.
- The two syllabus files: `content/syllabi/zimsec/o-level/history/2015-2022.json` (topics 1-15; objectives say in
  which form an item is taught) and `content/syllabi/cambridge/igcse/history/2027-2028.json` (Option A or Option B of
  the Core content — option group `core-content`; at least one of Depth studies A-E — option group `depth-studies`;
  each key question is a node whose objectives paraphrase the focus points and whose description lists the specified
  content). Read the `notes` of both (assessment as read, prescribed Paper 2 topics, uncertainties).
- `.scratch/history/lib.mjs`: builders (`concept`, `b.mcq/tf/short/fib/match/manualShort/ext/essay/struct/card`,
  `P.*` parts), selectors `ZIM`, `CAM`, and the history helpers `source()`, `sources()`, `table()`, `timeline()`,
  `levels(marks)`, `EXAM` (exam-format plans) and `checkExam(plan, parts)`.
- Style examples: `.scratch/english/slices/a1-nouns-pronouns.mjs` (slice style: every MCQ option has a rationale,
  explanations teach, hints from difficulty 3); the worked ESSAY example on the 1896-97 risings in
  `docs/CONTENT_PIPELINE.md` §7 (points, levels and a model answer); any lesson in
  `content/subjects/economics-o/lessons/` (front matter + blocks).

## What to produce per concept

1. **One lesson** `content/subjects/history-o/lessons/<area>/<name>.md` (key `<area>.<name>`, where the concept key
   is `hist.<area>.<name>`; e.g. `hist.colonial.udi` → `lessons/colonial/udi.md`, key `colonial.udi`),
   **900-1,600 words** (tables do not count), template of §6: `## Introduction` (why it matters; a hook that links to
   Zimbabwe or Africa where it fits naturally; what the student should know already), `## Key definitions`
   (`:::definition{term="…"}` for terms such as *concession*, *appeasement*, *collectivisation*; `:::keyfact` for
   dates and names to learn), explanation sections in chronological or thematic order with **a timeline table**
   (`timeline()` output pasted in) and at least two `:::example` blocks (a cause explained step by step, an
   interpretation weighed, a source analysed), `## Common mistakes` (`:::mistake{title="…"}` — confused dates,
   names, causes vs results, narrative instead of explanation), `## Exam tips` (`:::exam-tip`: how *describe*,
   *explain*, *how far / to what extent* and source questions are answered for this concept, naming the paper),
   `## Summary` (one `:::summary`, 4-6 bullets). Front matter: key, title (unique), summary, concepts ([the concept]),
   estimatedMinutes (honest), level "core"; `freePreview: true` ONLY on the lessons named in your assignment. Do not
   add `objectives`.
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/history/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 40%; four options, 1 mark; dates, people, causes, consequences, "which best explains",
     "which statement about the source is supported"), true/false, matching (person → role, event → date, term →
     definition, cause → consequence), fill-in-the-blank (dates and names with `choices` drop-downs — free-text names
     are risky), short answer ONLY for closed answers (list every accepted spelling: Lobengula/Lobhengula,
     Mzilikazi/Mzilikazi kaMashobane, Chimurenga/Umvukela), a chronology item (order four events: a `match` of event →
     position, built from a `timeline()`), 3-5 self-marked `manualShort` items (describe/explain, 2-6 marks, tickable
     points) and 2-4 **practice structured** items (`b.struct`, difficulty 3-5, `examStyle: true`, totals 6, 8, 12,
     14 or 16 — never 20, 25 or 40, see reserved marks), at least one of them built on 1-3 original sources.
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 understanding/application, ~30% d4-5 analysis/evaluation.
     `daily: true` only on 2-3 auto-marked items of difficulty 2-3 per concept.
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION.
   - `applies`: shared concepts ("Both boards") — omit it when an item suits both; `applies: ZIM` / `applies: CAM`
     when it depends on one board's depth or wording (Cambridge-only detail such as Plombières inside a shared concept
     never occurs; the overlap concepts are 1914 causes, Versailles, the League, Hitler, the Cold War origins, Cuba
     1959-62, Russia and the Nazi rise and regime).
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FACT ("When was the Rudd Concession
     signed?" → "30 October 1888"), CONCEPT ("Why did the early phase of the armed struggle fail?").

## History quality rules (non-negotiable)

- **Facts are right or absent.** Dates, names, places and sequences must be well established. If you are not sure,
  leave the detail out or write the general statement ("in the late 1880s"). Never invent people, events, treaties,
  statistics or "a historian said". Numbers of deaths, armies or migrants: only widely accepted estimates, labelled as
  estimates ("historians estimate that about…"), with a range where historians differ. Russian dates: say whether
  old or new style (February/March, October/November 1917).
- **Contested interpretations are presented as such**: the causes of the Mfecane, the decline of Great Zimbabwe, the
  coordination of the 1896-97 risings, responsibility for 1914 and for the Cold War, Haig's generalship, appeasement,
  the atomic bombs, the success of the New Deal, land reform. Give the main views fairly ("Some historians argue…;
  others point out…") and let the student judge. MCQs never hinge on a contested judgement; they test facts or what a
  view says.
- **Sources in questions are ORIGINAL and labelled.** Build them with `source(label, kind, text, { described })`: the
  label line says what the source is and "(invented for this question)". Attribute invented sources only to
  fictional or anonymous people ("a fictional Ndebele elder interviewed in the 1930s", "an editorial in a British
  newspaper, 1919", "a cartoon of the kind published in German newspapers in 1919, described in words"). **Never put
  invented words in the mouth of a real person** (no invented Rhodes letter, Lloyd George speech or Nehanda saying)
  and never present an invented source as a real document. Visual sources are described in words (no images). Real
  documents may be named and PARAPHRASED in lessons ("the Rudd Concession gave Rudd and his partners the sole right to
  mine metals in Lobengula's kingdom"). Direct quotation of real documents only if public domain, short (under 25
  words), you are certain of the exact wording, and it is cited in the text (author, title, date); otherwise
  paraphrase. Never quote textbooks, revision sites, past papers or mark schemes.
- **Source questions test the skill, not trivia**: message and inference, purpose and provenance, reliability with a
  reason from the source's origin AND its content checked against own knowledge, comparison of two sources (agree and
  disagree on specific points), "How far do these sources show…" with both sides. Each source carries enough
  provenance (who, when, why, for whom) to evaluate; make sources differ in reliability on purpose and say why in the
  mark scheme.
- **Zimbabwean and African history with balance and care.** Pre-colonial states are African achievements studied on
  their own terms (no "lost civilisation" myths; say clearly that Great Zimbabwe was built by the ancestors of the
  Shona, as archaeology shows). Colonisation, land seizure, forced labour and segregation laws are described plainly
  and factually, including African resistance and agency. The liberation struggle: ZANU/ZANLA and ZAPU/ZIPRA both
  receive fair treatment; violence by all sides is acknowledged factually without graphic detail; massacres of
  refugees (Nyadzonia, Chimoio, Freedom Camp) are stated with dates and approximate numbers only where well
  documented. After 1980: reconciliation, achievements in education and health, ESAP, the Gukurahundi disturbances in
  Matabeleland and the Midlands (acknowledged factually and sensitively; the Unity Accord of 22 December 1987), land
  reform and sanctions — aims, outcomes, criticisms and different views; no party slogans, no praise or blame of
  living politicians. Slavery and the Holocaust: accurate, respectful, focused on victims as people, no graphic
  description; never use slurs even in quoted context.
- **Reference dates you may rely on** (all well established): Grobler Treaty 1887; Moffat Treaty February 1888; Rudd
  Concession 30 October 1888; Royal Charter 29 October 1889; Pioneer Column at Fort Salisbury 12 September 1890;
  Anglo-Ndebele War 1893-94; risings in Matabeleland (March 1896) and Mashonaland (June 1896); Nehanda and Kaguvi
  executed April 1898; referendum 1922 and Responsible Government from 1 October 1923; Land Apportionment Act 1930;
  Federation 1953-1963 (dissolved 31 December 1963); UDI 11 November 1965; Chinhoyi 28 April 1966; Altena Farm
  21 December 1972; Lancaster House Conference September-December 1979 (agreement signed 21 December 1979);
  independence 18 April 1980; Unity Accord 22 December 1987; ESAP from 1991; fast-track land reform from 2000; new
  Constitution 2013; OAU 25 May 1963, AU 2002; SADCC 1980, SADC 1992; UN 24 October 1945; UDHR 10 December 1948;
  Berlin Conference November 1884-February 1885; First World War 28 July 1914-11 November 1918; Treaty of Versailles
  signed 28 June 1919; Hitler Chancellor 30 January 1933; Nazi-Soviet Pact 23 August 1939; invasion of Poland
  1 September 1939; Pearl Harbor 7 December 1941; D-Day 6 June 1944; German surrender 8 May 1945; Hiroshima 6 August
  and Nagasaki 9 August 1945; People's Republic of China 1 October 1949; Castro's victory 1 January 1959; Cuban
  Missile Crisis October 1962; Berlin Wall built August 1961, opened 9 November 1989.
- **No images.** Maps and pictures are described in words; data and chronologies are Markdown tables. Never write
  "the map below shows" unless the table is there.
- **MCQs:** exactly one defensible answer, four options, distractors definitely wrong (rationale for each, e.g. the
  right event with the wrong date, a cause of a different war, a person from the wrong side); never "all/none of the
  above", never refer to options by letter. **No length cue** — the key must not be clearly the longest option; check
  with `node .scratch/tools/length-cue.mjs history-o questions/<your folder>/` → `# 0 flagged`.
- **Self-marked items:** one point per creditworthy idea, as examiners award (identify 1 + explain/develop 1: "Explains
  that the Land Apportionment Act reserved the best land for whites, so Africans were crowded into reserves"); points
  add up to the marks; example answer complete. Explain parts need developed reasons, not lists; *how far / to what
  extent* parts need both sides and a supported conclusion and get `levels: levels(marks)` (descriptors in lib.mjs).
- **Original wording**, British English, names in Zimbabwean contexts (Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo,
  Sipho, Thandeka) for invented modern people only. Dates as 7 October 2026; centuries as "the nineteenth century";
  BCE/CE for ancient dates.

### Terminology between the boards

| ZIMSEC (syllabus / common usage) | Cambridge 0470 |
|---|---|
| First Chimurenga/Umvukela; Second Chimurenga/Umvukela, the armed (liberation) struggle | (not in the syllabus) |
| Paris Peace Conference (all the treaties) | The Treaty of Versailles (Germany) |
| Rise of European dictators; fascism and Nazism | Hitler's rise and the Nazi regime (Depth study B) |
| The Russian Revolution (February and October 1917) | The March and November revolutions of 1917 (new-style dates) |
| Manifestations of the Cold War | Containment case studies; Soviet control of Eastern Europe |
| Structured question (state / describe / explain / how far) | Structured essay (a) describe, (b) explain, (c) how far / evaluate |

In a shared concept give both names the first time ("the February (March) Revolution").

## Exam-format items (rows owned per assignment below)

`examStyle: true`, skill and parts EXACTLY as the plan in `EXAM` (lib.mjs) — the builder refuses a 20-, 25- or
40-mark STRUCTURED item that does not match a plan. Wrap the parts in `checkExam(EXAM.X, [...])`, pass
`skill: EXAM.X.skill, applies: EXAM.X.applies, secs: EXAM.X.secs`, difficulty 4-5, and set `concepts: [...]` on every
item to the concepts it really examines (all covered by that syllabus). Mocks draw by type + marks + skill (+ topic
for ZIMSEC Papers 1 and 2 and for the Cambridge options/depth studies).

| Paper item | plan | type, marks, skill | applies | parts (our convention: reviewer to check) |
|---|---|---|---|---|
| ZIMSEC P1 (History of Zimbabwe) / P2 (Regional and International): structured question, candidates answer 4 of 22 / 20 | `EXAM.ZIM_STRUCTURED` | STRUCTURED, 25, EVALUATION | ZIM | (a) state/list/identify 5 — auto-marked where possible (MCQ multi-select, `fib` with choices, closed `short`) or 5 one-mark points; (b) describe/explain 12 — tickable points (about 6 developed points × 2); (c) "How far…? / To what extent…?" 8 — both sides + judgement, `levels(8)` |
| ZIMSEC P1 source-based question (one per paper) | `EXAM.ZIM_SOURCE` | STRUCTURED, 25, ANALYSIS | ZIM | 2-3 invented sources on a Paper 1 topic; (a) comprehension 5 (auto-marked or points); (b) inference / message / purpose 8; (c) reliability and usefulness, or "how far do the sources show…", using own knowledge, 12 (`levels(12)`) |
| 0470 Paper 1: structured essay (Section A core, Section B depth) | `EXAM.CAM_P1` | STRUCTURED, 20, EVALUATION | CAM | (a) describe 4 (four 1-mark points or 2 × 2); (b) explain why 6 (`levels(6)`); (c) "How far…? / How significant…? / To what extent…?" 10 (`levels(10)`, both sides + judgement) |
| 0470 Paper 2: document question on a prescribed core topic | `EXAM.CAM_P2` | STRUCTURED, 40, ANALYSIS | CAM | 5-7 invented sources (`sources([...])` in the stem, each with provenance); (a)-(e) 7, 8, 7, 8, 10: e.g. (a) message/inference of one source, (b) comparison of two sources, (c) purpose or "why was this published then", (d) reliability / "are you surprised", (e) "How far do these sources provide convincing evidence that…?" using all sources and own knowledge (`levels(10)`) |
| 0470 Paper 4: alternative to coursework (depth study) | `EXAM.CAM_P4` | STRUCTURED, 40, EVALUATION | CAM | (a) "Write an account of…" 16 (`levels(16)`); (b) "How important / significant was…?" 24, discussing different ways of judging importance (`levels(24)`) |

Each self-marked exam part: indicative content as points that add up to the marks (with `levels` for (c)/(e)/P4
parts) and a full model answer (`modelAnswer` on EXTENDED_RESPONSE parts: pass `type: "EXTENDED_RESPONSE"` to
`P.manual`). Put the items in `questions/exam/<prefix>zimsec.json` and `questions/exam/<prefix>cambridge.json`: one
extra `concept(...)` module each (`file: "exam/<prefix>zimsec"`, `keyPrefix: "exam.<prefix>zimsec"`, first argument
any concept of yours that the syllabus covers; same for Cambridge with `exam/<prefix>cambridge`).

**Reserved mark values.** STRUCTURED worth **25** is only for the ZIMSEC items, **20** only for 0470 Paper 1, **40**
only for 0470 Papers 2 (ANALYSIS) and 4 (EVALUATION). Practice structured items use 6, 8, 12, 14 or 16 marks.
One-mark single-answer MCQs feed topic tests (no paper of either board is multiple choice), so keep them exam-worthy.

Mock exams (built later by the lead, not by writers): ZIMSEC P1 and P2 offer a choice of 25-mark questions by topic
(P1: topics 1, 4, 6, 7, 8, 10, 11, 15, with one source-based question; P2: topics 5, 11-14), answer 4, 2 hours; 0470
P1 Section A (Option A or Option B, answer 2) + Section B (one depth study, answer 1), 2 hours; 0470 P2 one question
on a prescribed topic, 1 hour 45 minutes; 0470 P4 one question on a depth study, 1 hour. Topics 2, 3 and 9 of ZIMSEC
are in neither specification grid: no 25-mark items on them.

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas (from the concept keys): intro, skills, origins, egypt, precolonial, slavery, contact, colonisation, colonial,
  nationalism, liberation, independence, cooperation, constitution, china, cuba, dictators, ww1, ww2, cold-war,
  revolutions-1848, italy, german-unification, us-civil-war, imperialism, ww1-origins, versailles, league,
  road-to-war, containment, soviet-control, germany, russia, usa.
- Lesson titles must be unique (slugs come from titles). Lesson-only scratch scripts go in
  `.scratch/history/tables/<prefix><name>.mjs` (never in `slices/`, which the build imports).

## Commands (repo root)

- Build your slices only: `node .scratch/history/build-content.mjs <your-prefix>` (prefix match on the START of file
  names, e.g. `w2a-`; the trailing dash matters).
- Validate: `npm run content:validate -- history-o --strict` → 0 error(s), 0 warning(s). Other writers work in the
  same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- history-o` → fix findings in your files.
- Length cue: see above.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, concepts.mjs, the registry, the syllabus files, `.scratch/tools/`,
  other families or other writers' files: report needed changes (a concept boundary, a missing helper) instead.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation, content:check and length-cue results, any fact you left out or want a reviewer to check.

## Proposed split into 8 writer assignments

111 concepts; every assignment has 13-14 concepts plus exam rows of roughly equal weight (a 0470 Paper 2 item with
5-7 sources counts about as much as a concept). Concept keys below drop the `hist.` prefix. ★ = `freePreview: true`
(at most one lesson per top-level topic of each syllabus; a shared concept counts for both).

**W1a — prefix `w1a-`** (14; ZIMSEC: sources, early societies, contacts, colonisation to 1890)
intro.history-and-sources, skills.source-evaluation ★ (both boards: ZIMSEC topic 1, 0470 skills), origins.humankind,
egypt.civilisation, precolonial.stone-iron-age, precolonial.great-zimbabwe ★, precolonial.mutapa, precolonial.rozvi,
precolonial.mfecane-zulu, precolonial.ndebele-state, contact.portuguese-prazos, contact.missionaries-agents,
colonisation.scramble-berlin, colonisation.occupation.
Folders: `intro/ skills/ origins/ egypt/ precolonial/ contact/`, `colonisation/scramble-berlin|occupation`.
Exam rows: ZIM_STRUCTURED ×6 (Great Zimbabwe, Mutapa or Rozvi, Ndebele state, Portuguese, missionaries, colonisation
of Zimbabwe); ZIM_SOURCE ×1 (e.g. the Rudd Concession and its interpretation, with invented sources). The
source-evaluation lesson serves both boards: teach with neutral examples and show both papers' question styles.

**W1b — prefix `w1b-`** (14; ZIMSEC: resistance, colonial rule, nationalism, liberation, independence)
colonisation.anglo-ndebele-war, colonisation.first-chimurenga ★, colonial.company-rule,
colonial.responsible-government, colonial.federation, colonial.udi, nationalism.pan-africanism,
liberation.nationalist-movements ★, liberation.early-armed-struggle, liberation.second-phase,
liberation.peace-settlement, independence.reconciliation, independence.policies,
independence.land-reform-indigenisation.
Folders: `colonisation/anglo-ndebele-war|first-chimurenga`, `colonial/ nationalism/ liberation/`,
`independence/reconciliation|policies|land-reform-indigenisation`.
Exam rows: ZIM_STRUCTURED ×9 (Anglo-Ndebele War, First Chimurenga, Company rule or Responsible Government,
Federation, UDI, early armed struggle, second phase, Lancaster House, post-independence policies or land reform);
ZIM_SOURCE ×1 (e.g. the First Chimurenga or the Federation, invented sources).

**W2a — prefix `w2a-`** (14; ZIMSEC: slavery, regional and international co-operation, constitution, China)
slavery.forms-causes, slavery.atlantic-trade ★, slavery.effects-abolition, independence.foreign-policy,
cooperation.frontline-states, cooperation.sadc ★, cooperation.oau-au, cooperation.commonwealth-nam,
cooperation.united-nations, constitution.zimbabwe ★, constitution.democracy, constitution.human-rights,
china.revolution, china.mao.
Folders: `slavery/ cooperation/ constitution/ china/`, `independence/foreign-policy`.
Exam rows: ZIM_STRUCTURED ×9 (P2: slave trade ×2, Frontline States, SADC or OAU/AU, UN, Zimbabwe's foreign policy,
China; P1: constitution, democracy and human rights ×2); ZIM_SOURCE ×1 (on a Paper 1 topic: the Constitution and
rights, invented sources).

**W2b — prefix `w2b-`** (14; the inter-war years and ZIMSEC world overviews)
versailles.peacemaking, versailles.terms-impact, league.organisation ★ (ZIMSEC topic 12, 0470 Option B),
league.1920s, league.1930s, road-to-war.hitler-aims-1933-36, road-to-war.anschluss-munich, road-to-war.outbreak-1939,
dictators.fascism-mussolini, ww1.course-results, ww2.course-results, cold-war.manifestations-impact,
cuba.revolution, containment.cuba.
Folders: `versailles/ league/ road-to-war/ dictators/ cuba/`, `ww1/course-results`, `ww2/course-results`,
`cold-war/manifestations-impact`, `containment/cuba`.
Exam rows: ZIM_STRUCTURED ×7 (P2: WWI, Paris peace or League, dictators, WWII, Cold War, Cuba, League); CAM_P1 ×6
(Versailles ×2, League ×2, Hitler ×2); CAM_P2 ×5 (Versailles ×2 and Hitler's foreign policy ×2 — prescribed 2027-28 —
and the League ×1).

**W3a — prefix `w3a-`** (14; Cold War and the United States)
cold-war.breakdown-1945, cold-war.eastern-europe-1948, cold-war.berlin-blockade, containment.korea,
containment.vietnam, soviet-control.hungary-czechoslovakia, soviet-control.berlin-wall,
soviet-control.solidarity-gorbachev, usa.boom ★, usa.roaring-twenties, usa.intolerance, usa.crash-1932,
usa.new-deal, usa.new-deal-assessment.
Folders: `cold-war/breakdown-1945|eastern-europe-1948|berlin-blockade`, `containment/korea|vietnam`,
`soviet-control/ usa/`.
Exam rows: CAM_P1 ×10 (Cold War origins ×2, containment ×2, Eastern Europe ×2, Depth D ×4); CAM_P2 ×5 (Cold War ×2
and Soviet control of Eastern Europe ×2 — prescribed — and containment ×1); CAM_P4 ×3 (Depth D). The three
cold-war.* concepts are shared with ZIMSEC (no ZIMSEC exam rows here; W2b writes the ZIMSEC Cold War question).

**W3b — prefix `w3b-`** (14; the two world wars)
ww1-origins.alliances-arms-race, ww1-origins.colonial-balkans, ww1-origins.july-crisis, ww1.schlieffen-stalemate ★,
ww1.trench-warfare, ww1.world-war, ww1.other-fronts, ww1.end-1918, ww2.europe-1939-43, ww2.asia-pacific ★,
ww2.civilians-resistance, ww2.occupied-poland-holocaust, ww2.victory-europe, ww2.victory-pacific.
Folders: `ww1-origins/`, `ww1/` (except course-results), `ww2/` (except course-results).
Exam rows: CAM_P1 ×10 (causes of WWI ×2, Depth A ×4, Depth E ×4); CAM_P2 ×2 (causes of the First World War —
prescribed November 2028); CAM_P4 ×6 (Depth A ×3, Depth E ×3). The ww1-origins concepts are shared with ZIMSEC.

**W4a — prefix `w4a-`** (14; Germany and Russia)
german-unification.before-1851, german-unification.bismarck-austria, german-unification.bismarck-france,
germany.weimar-1918-23 ★, germany.stresemann-era, germany.nazi-rise, germany.nazi-control, germany.life-nazi,
germany.persecution, russia.tsarist-1905, russia.revolutions-1917 ★ (ZIMSEC topic 14, 0470 Depth C),
russia.civil-war-nep, russia.stalin-power, russia.stalin-economy.
Folders: `german-unification/ germany/ russia/`.
Exam rows: CAM_P1 ×10 (German unification ×2, Depth B ×4, Depth C ×4); CAM_P2 ×2 (German unification — prescribed
March 2027); CAM_P4 ×6 (Depth B ×3, Depth C ×3); ZIM_STRUCTURED ×2 (P2: the Russian Revolution; Stalin's domestic
policy). Russia and germany.nazi-rise / nazi-control are shared with ZIMSEC.

**W4b — prefix `w4b-`** (13; the nineteenth century, Option A)
revolutions-1848.causes ★, revolutions-1848.events-outcomes, italy.before-1850, italy.cavour,
italy.garibaldi-completion, us-civil-war.causes, us-civil-war.northern-victory, us-civil-war.reconstruction,
imperialism.motives, imperialism.french-british-africa, imperialism.belgian-congo, imperialism.india-1857,
imperialism.us-empire.
Folders: `revolutions-1848/ italy/ us-civil-war/ imperialism/`.
Exam rows: CAM_P1 ×9 (1848 ×2, Italy ×2, US Civil War ×2, imperialism ×3); CAM_P2 ×7 (1848 ×2, Italy ×2 and
imperialism ×2 — prescribed 2027-28 — and the US Civil War ×1).

Totals: ZIM_STRUCTURED 33 (P1 topics 17, P2 topics 16), ZIM_SOURCE 3, CAM_P1 45 (Option A 13, Option B 12, depth
studies 20: four each), CAM_P2 21 (every core key question at least once; the nine prescribed ones twice), CAM_P4 15
(three per depth study).
