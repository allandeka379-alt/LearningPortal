# heritage-studies-o — writing brief for content agents

You write ORIGINAL study content for the Heritage Studies family: ZIMSEC O-Level Heritage Studies (Forms 1-4,
2015-2022), the only syllabus in the family. Content is DEV preview only; a human reviews it later (§41), but write it
as if it ships tomorrow. **Accuracy and respect come first**: a wrong date, law, section number or institution is
worse than a missing one, and every culture, faith and community of Zimbabwe is described with the same respect.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, tables).
- `content/concepts/heritage-studies-o.json` (95 concepts). Each description opens with the form(s) that teach it and
  says exactly what is IN and what is OUT ("… is her.x.y"). Stay inside it; where two concepts touch (e.g. the
  colonial land laws and land reform), give the other a sentence and move on.
- The syllabus file `content/syllabi/zimsec/o-level/heritage-studies/2015-2022.json` (topics 1-9; objectives say in
  which form each item is taught) and its `notes` (assessment as read, uncertainties).
- `.scratch/heritage-studies/lib.mjs`: builders (`concept`, `b.mcq/tf/short/fib/match/manualShort/ext/essay/struct/
  card`, `P.*` parts) and the helpers `source()`, `sources()`, `table()`, `timeline()`, `levels(marks)`, `EXAM`
  (exam-format plans) and `checkExam(plan, parts)`.
- Style examples: `.scratch/english/slices/a1-nouns-pronouns.mjs` (slice style: every MCQ option has a rationale,
  explanations teach, hints from difficulty 3); any slice in `.scratch/history/slices/` (sources, timelines,
  structured items with levels); any lesson in `content/subjects/economics-o/lessons/` (front matter + blocks).

## What to produce per concept

1. **One lesson** `content/subjects/heritage-studies-o/lessons/<area>/<name>.md` (key `<area>.<name>`, where the
   concept key is `her.<area>.<name>`; e.g. `her.culture.unhu` → `lessons/culture/unhu.md`, key `culture.unhu`),
   **900-1,600 words** (tables do not count), template of §6: `## Introduction` (why it matters to a young Zimbabwean;
   an everyday hook — a family gathering, a school assembly, a council meeting, a news event — and what the student
   should know already), `## Key definitions` (`:::definition{term="…"}` for terms such as *socialisation*, *totem*,
   *heirship*, *citizenship*, *devolution*, *gender equity*, *informal sector*; `:::keyfact` for dates, sections of
   the Constitution and names to learn), explanation sections with **at least one table** (a comparison, a list of
   types with examples, a timeline from `timeline()` for historical concepts, or a "who does what" table) and at least
   two `:::example` blocks (a case worked through: a family deciding on an heir, a community choosing a voluntary
   project, a council explaining a by-law, a source read for its message), `## Common mistakes`
   (`:::mistake{title="…"}` — confusing norms and values, rights and responsibilities, equity and equality, the arms
   of government; listing instead of explaining), `## Exam tips` (`:::exam-tip`: how *state*, *identify*,
   *outline*, *describe*, *explain*, *discuss*, *assess* and *how far* are answered for this concept, naming Paper 1
   or Paper 2 Section A/B), `## Summary` (one `:::summary`, 4-6 bullets). Front matter: key, title (unique), summary,
   concepts ([the concept]), estimatedMinutes (honest), level "core"; `freePreview: true` ONLY on the lessons named in
   your assignment. Do not add `objectives`.
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/heritage-studies/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 40%; four options, 1 mark: definitions, examples, which institution does what, dates
     of national events, "which best explains", "which statement about the source is supported"), true/false,
     matching (term → definition, institution → function, symbol → meaning, right → section or example, event →
     date), fill-in-the-blank (with `choices` drop-downs for names, dates and terms — free-text names are risky),
     short answer ONLY for closed answers (list every accepted spelling and both Shona and Ndebele forms where they
     apply: "roora", "lobola"; "mukwerera", "ukucela izulu"), 3-5 self-marked `manualShort` items (state / describe /
     explain, 2-6 marks, tickable points) and 2-4 **practice structured** items (`b.struct`, difficulty 3-5,
     `examStyle: true`, totals 6, 8, 12, 14 or 16 — never 10 or 20, see reserved marks), at least one built on a short
     original stimulus (a scenario, a fictional newspaper report, a table of invented survey results, a described
     poster).
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 understanding/application, ~30% d4-5 analysis/evaluation.
     `daily: true` only on 2-3 auto-marked items of difficulty 2-3 per concept.
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION. The syllabus weights Paper 1 at 60%
     knowledge and understanding, 20% application, 20% problem solving, and Paper 2 at 40/30/30: include application
     (a scenario: "Rudo's family …; which right is being denied?") and problem-solving items ("suggest two ways the
     council could …"), not just recall.
   - `applies`: omit it (the family has one syllabus).
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FACT ("On what date is Unity Day
     commemorated?" → "22 December"), CONCEPT ("Why do totems discourage marriage between close relatives?").

## Heritage Studies quality rules (non-negotiable)

- **Facts are right or absent.** Dates, names, laws, section numbers and institutions must be well established; if
  you are not sure, leave the detail out or write the general statement ("the Constitution protects the right to
  education"). Never invent people, laws, cases, statistics or "a survey found". No statistics (HIV prevalence,
  unemployment, numbers of seats beyond those below) unless widely documented, dated and named in a reviewer note in
  the slice; prefer "many", "rose sharply", or tell the student where the official figure is published (ZIMSTAT,
  the Ministry of Health and Child Care).
- **The Constitution is the 2013 Constitution of Zimbabwe (as amended).** Cite chapters and sections only from the
  reference list below or when you are certain. Describe amendments only in outline ("amended in 2017 and 2021")
  and never present a proposed change as law. Institutions are described by function, not by who leads them.
- **Politics without partisanship.** Political parties, elections and leaders: describe structures and processes, not
  who won or who is right. The liberation struggle: ZANU/ZANLA and ZAPU/ZIPRA both receive fair treatment; the masses,
  mujibhas and chimbwidos, spirit mediums, churches and the Frontline States are credited; violence by all sides is
  acknowledged factually without graphic detail; attacks on refugee and guerrilla camps (Nyadzonia, Chimoio, Freedom
  Camp) are stated with dates and approximate, labelled estimates only. After 1980: reconciliation, achievements in
  education and health, the Unity Accord (22 December 1987), ESAP, the disturbances in Matabeleland and the Midlands
  in the 1980s (Gukurahundi; acknowledged factually and sensitively), land reform, sanctions/restrictive measures,
  economic difficulties — aims, outcomes, criticisms and different views; no slogans, no praise or blame of living
  politicians, no "enemies of the state" language.
- **Contested matters are presented as such** and MCQs never hinge on them: the effects of land reform; whether
  Western measures are "sanctions" or "targeted restrictive measures" and what effect they had; polygamy; the
  National Schools Pledge debate of 2016; the causes of the decline of Great Zimbabwe; coordination of the 1896-97
  risings; indigenous and foreign values ("foreign" is not "bad"). Give the main views fairly ("Some people argue…;
  others point out…") and let the student judge.
- **Culture and religion with respect.** Describe indigenous beliefs and practices (midzimu/amadlozi, mhondoro, bira,
  kurova guva/umbuyiso, rain-making) descriptively and respectfully, alongside Christianity, Islam and other faiths,
  never ranking them. Do not single out one ethnic group as typical: give Shona and Ndebele terms side by side
  (`roora/lobola`, `vatete/ubabakazi`, `sekuru/umalume`, `nhimbe/ilima`, `mukwerera/ukucela izulu`) and mention
  other groups (Tonga, Venda, Kalanga, Nambya, Shangani, Ndau, Sotho, Tswana, Chewa and others) where you know a fact
  about them; when you do not know the term in a language, use English. Harmful or illegal practices (child marriage,
  forced marriage, pledging girls (kuzvarira), virginity testing, property grabbing) are stated as harmful and, where
  true, illegal — never described approvingly.
- **Children and health.** Rites of passage, courtship, sexuality and the age of consent are taught factually and
  age-appropriately (no graphic detail). Health content (herbs, pandemics, chronic illness, HIV) is general public
  information that matches Ministry of Health/WHO messages: no claims that herbs cure disease, no dosages, always
  "seek a trained health worker"; non-stigmatising language ("people living with HIV"). Human trafficking and
  gender-based violence: no graphic detail; name real help channels only in general terms ("the police Victim
  Friendly Unit", "a trusted adult", "a clinic").
- **No images.** Flags, symbols, monuments and maps are described in words; data and chronologies are Markdown
  tables. Never write "the picture below shows" unless the table is there.
- **Do not reproduce protected or official texts at length.** The national anthem and the National Schools Pledge
  are paraphrased (never quoted in full; a phrase of under ten words only if you are certain of it). Constitution
  sections are paraphrased ("section 81 gives every child the right to…"). Never quote textbooks, revision sites, past
  papers or mark schemes.
- **Sources and scenarios are ORIGINAL and labelled.** Build stimulus extracts with `source(label, kind, text,
  { described })` ("a report in a fictional community newsletter, 2026", "a poster of the kind used in a clean-up
  campaign, described in words"). Attribute invented words only to fictional or anonymous people; **never put
  invented words in the mouth of a real person** (no invented Nehanda saying, presidential speech or chief's
  statement) and never present an invented source as real. Tables of survey results are fictional, internally
  consistent and labelled "invented for this question".
- **MCQs:** exactly one defensible answer, four options, distractors definitely wrong (rationale for each: the right
  term from the wrong concept, a function of a different arm of government, a date of a different national event);
  never "all/none of the above", never refer to options by letter. **No length cue** — the key must not be clearly
  the longest option; check with `node .scratch/tools/length-cue.mjs heritage-studies-o questions/<your folder>/` →
  `# 0 flagged`.
- **Self-marked items:** one point per creditworthy idea, as examiners award (identify 1 + explain/develop 1:
  "Explains that totems prevent marriage between relatives, so the family line stays healthy and respected"); points
  add up to the marks; example answer complete. Explain parts need developed reasons, not lists; *discuss / assess /
  how far* parts need both sides and a supported conclusion and get `levels: levels(marks)`.
- **Original wording**, British English, names Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho, Thandeka,
  Themba, Nokuthula, Tafadzwa, Mthulisi for invented people; places Harare, Bulawayo, Mutare, Gweru, Masvingo,
  Chinhoyi, Kariba, Hwange, Lupane, Gwanda, Bindura, Marondera. Fictional schools, councils, companies and
  villages only. Dates as 7 October 2026; money as US\$ (in JS `"US\\$"`).

### Reference facts you may rely on (all well established)

- **Constitution (2013):** made through the parliamentary select committee COPAC (from 2009) after the Global
  Political Agreement of 2008; outreach meetings; referendum on 16 March 2013 (approved); signed into law on 22 May
  2013; the remaining provisions took effect after the 2013 harmonised elections. 18 chapters. Section 1 (Zimbabwe a
  unitary, democratic and sovereign republic), section 2 (supremacy of the Constitution), section 3 (founding values
  and principles), section 4 (national flag, national anthem, public seal and coat of arms), section 6 (16 officially
  recognised languages: Chewa, Chibarwe, English, Kalanga, Koisan, Nambya, Ndau, Ndebele, Shangani, Shona, sign
  language, Sotho, Tonga, Tswana, Venda and Xhosa), Chapter 2 (national objectives), Chapter 3 (citizenship: by
  birth, descent or registration, sections 36-38), Chapter 4 (Declaration of Rights, sections 44-87; section 81
  children, 80 women, 82 elderly, 83 persons with disabilities, 84 veterans of the liberation struggle, 86 limitation
  of rights), Chapter 5 (the Executive), Chapter 6 (the Legislature: Senate and National Assembly), Chapter 7
  (elections), Chapter 8 (the Judiciary; section 162 lists the courts: Constitutional Court, Supreme Court, High
  Court, Labour Court, Administrative Court, magistrates courts, customary law courts), Chapter 12 (independent
  commissions supporting democracy: Zimbabwe Electoral Commission, Zimbabwe Human Rights Commission, Zimbabwe Gender
  Commission, Zimbabwe Media Commission, National Peace and Reconciliation Commission), Chapter 14 (provincial and
  local government; devolution), Chapter 15 (traditional leaders), Chapter 16 (agricultural land). The minimum age of
  marriage is 18 (section 78; confirmed by the Constitutional Court in 2016). Elections are harmonised every five
  years; voting age 18; a presidential candidate needs more than half of the votes cast, otherwise a run-off; the
  National Assembly has 210 constituency seats plus seats reserved for women elected by proportional representation
  (give further seat numbers only if certain). Ten provinces (eight provinces and the metropolitan provinces of
  Harare and Bulawayo); local authorities are urban councils and rural district councils.
- **Lancaster House:** conference September-December 1979; agreement signed 21 December 1979; the constitution
  reserved 20 of the 100 House of Assembly seats for whites for seven years and protected property (land acquisition
  on a willing-buyer willing-seller basis for ten years); it was amended many times (executive presidency from
  1987); a draft new constitution was rejected in the referendum of February 2000.
- **National history:** Grobler Treaty 1887; Moffat Treaty February 1888; Rudd Concession 30 October 1888; Royal
  Charter 29 October 1889; Pioneer Column at Fort Salisbury 12 September 1890; Anglo-Ndebele War 1893-94; risings in
  Matabeleland (March 1896) and Mashonaland (June 1896); Nehanda and Kaguvi executed April 1898; Land Apportionment
  Act 1930; Native Land Husbandry Act 1951; Federation 1953-1963; UDI 11 November 1965; Battle of Chinhoyi 28 April
  1966; Land Tenure Act 1969; Altena Farm 21 December 1972; Nyadzonia 9 August 1976; Chimoio 23 November 1977;
  Freedom Camp 19 October 1978; independence 18 April 1980; Unity Accord 22 December 1987; ESAP from 1991; fast-track
  land reform from 2000; Cyclone Idai March 2019; the first COVID-19 case in Zimbabwe March 2020.
- **National heritage:** national flag adopted 18 April 1980 (green, yellow, red and black stripes, a white triangle
  with a red star and the Zimbabwe Bird; teach the commonly given meanings: green — vegetation and agriculture,
  yellow — mineral wealth, red — blood shed in the liberation struggle, black — the heritage of the majority, white —
  peace, red star — hopes and aspirations, Zimbabwe Bird — national identity and history); national anthem "Simudzai
  Mureza wedu weZimbabwe" / "Kalibusiswe Ilizwe leZimbabwe" ("Blessed be the land of Zimbabwe"), adopted in 1994
  (reviewer to confirm the year; do not quote the verses); Independence Day 18 April; Heroes Day (second Monday of August) and Defence Forces Day
  (the following Tuesday); Unity Day 22 December; Africa Day 25 May; National Schools Pledge introduced in 2016.
  UNESCO World Heritage Sites: Mana Pools National Park, Sapi and Chewore Safari Areas (1984); Great Zimbabwe
  National Monument (1986); Khami Ruins National Monument (1986); Mosi-oa-Tunya/Victoria Falls (1989, shared with
  Zambia); Matobo Hills (2003). National Museums and Monuments of Zimbabwe protects monuments; the National Heroes
  Acre is in Harare.
- **Organisations:** UN 24 October 1945 (Zimbabwe a member from 1980); OAU 25 May 1963, African Union 2002; SADCC
  1980, SADC 1992; COMESA (treaty 1993, in force 1994); Non-Aligned Movement founded 1961, Harare summit 1986;
  Zimbabwe left the Commonwealth in 2003 (do not state its current status).
- **Laws and bodies:** Legal Age of Majority Act 1982; Domestic Violence Act 2007; Environmental Management Act and
  the Environmental Management Agency (EMA); Zimbabwe Parks and Wildlife Management Authority; Forestry Commission;
  Grain Marketing Board (strategic grain reserve); Registrar General (birth certificates, IDs, passports); Master of
  the High Court (deceased estates). The age of consent to sex: raised to 18 by a 2024 amendment of the criminal law
  after a 2022 Constitutional Court ruling — teach "the law protects children under 18"; name the Act only if
  certain. Marriage law was reformed by the Marriages Act of 2022: outline only, reviewer note.
- **International conventions:** UN Convention on the Rights of the Child (1989); African Charter on the Rights and
  Welfare of the Child (1990); CEDAW (1979); the SADC Protocol on Gender and Development (2008); the Maputo Protocol
  (2003); ILO conventions on child labour (minimum age; worst forms).

## Exam-format items (rows owned per assignment below)

`examStyle: true`, skill and parts EXACTLY as the plan in `EXAM` (lib.mjs) — the builder refuses a 10- or 20-mark
STRUCTURED item that does not match a plan. Wrap the parts in `checkExam(EXAM.X, [...])`, pass
`skill: EXAM.X.skill, secs: EXAM.X.secs`, difficulty 4 (Section A may be 3), and set `concepts: [...]` on every item
to the concepts it really examines (any of yours). Labels are flat: `(a)`, `(b)`, `(c)` (never `1(a)`). Mocks draw by
type + marks + skill (+ topic).

| Paper item | plan | type, marks, skill | parts (our convention: reviewer to check) | how many |
|---|---|---|---|---|
| Paper 1: four-option multiple choice, single answer (40 compulsory items, 1 hour 15 minutes, all nine topics) | — | MULTIPLE_CHOICE, 1, any | every concept's MCQs; keep each one exam-worthy | ≥ 80 for two mocks (plenty) |
| Paper 2 Section A: short-answer question (six, all compulsory) on one topic, often on a short stimulus | `EXAM.ZIM_P2A` | STRUCTURED, 10, UNDERSTANDING | (a) define/state 2; (b) identify/list/outline 3; (c) describe/explain 5 — at least (a) and (b) auto-marked where possible (MCQ multi-select, `fib` with choices, closed `short`), (c) self-marked points (developed points × 2-3) | 4 per writer (32) |
| Paper 2 Section B: essay (candidates answer any two) | `EXAM.ZIM_P2B` | STRUCTURED, 20, EVALUATION | (a) describe/explain 8 — tickable points (about 4 developed points × 2); (b) "Discuss / Assess / How far / To what extent…" 12 — both sides and a supported conclusion, `levels(12)`, `type: "EXTENDED_RESPONSE"` with a full `modelAnswer` | 3 per writer (24) |

The marks of the sections and parts are not printed in the syllabus (the sentence describing Section B is cut off in
the document); our convention is Section A 6 × 10 = 60 and Section B 2 × 20 = 40. Section A: `secs: 720`; Section B:
`secs: 1440`. Each self-marked exam part: indicative content as points that add up to the marks (with `levels` for
Section B (b)) and a full example answer. Put the items in `questions/exam/<prefix>zimsec.json`: one extra
`concept(...)` module (`file: "exam/<prefix>zimsec"`, `keyPrefix: "exam.<prefix>zimsec"`, first argument any concept
of yours).

**Reserved mark values.** STRUCTURED worth **10** is only for Paper 2 Section A items and **20** only for Section B
essays. Practice structured items use 6, 8, 12, 14 or 16 marks. One-mark single-answer MCQs feed the Paper 1 mocks.

Mock exams (built later by the lead, not by writers): Paper 1 40 × MCQ across all nine topics (75 min); Paper 2
Section A 6 × STRUCTURED 10 UNDERSTANDING on six different topics + Section B 4 × STRUCTURED 20 EVALUATION offered,
answer any 2 (100 marks, 120 min; the number offered is our assumption).

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in
  `questions/exam/`.
- Areas (from the concept keys): socialisation, identity, culture, precolonial, colonisation, liberation,
  independence, governance, heritage, constitution, rights, production, global.
- Lesson titles must be unique (slugs come from titles). Lesson-only scratch scripts go in
  `.scratch/heritage-studies/tables/<prefix><name>.mjs` (never in `slices/`, which the build imports).

## Commands (repo root)

- Build your slices only: `node .scratch/heritage-studies/build-content.mjs <your-prefix>` (prefix match on the START
  of file names, e.g. `w2a-`; the trailing dash matters).
- Validate: `npm run content:validate -- heritage-studies-o --strict` → 0 error(s), 0 warning(s). Other writers work
  in the same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- heritage-studies-o` → fix findings in your files.
- Length cue: see above.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, concepts.mjs, the registry, the syllabus file, `.scratch/tools/`,
  other families or other writers' files: report needed changes (a concept boundary, a missing helper) instead.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation, content:check and length-cue results, any fact you left out or want a reviewer to check.

## Proposed split into 8 writer assignments

95 concepts; every assignment has 11-13 concepts plus 4 Section A and 3 Section B items. Concept keys below drop the
`her.` prefix. ★ = `freePreview: true` (at most one lesson per top-level topic: nine in all).

**W1a — prefix `w1a-`** (12; Topic 1 Socialisation, Topic 2 Identity part 1)
socialisation.home ★ (Topic 1), socialisation.school-peers, socialisation.community-religion, socialisation.media,
socialisation.ict, identity.families, identity.language-identity, identity.languages-cultures, identity.wise-sayings,
identity.tools, identity.personal-identity, identity.totems ★ (Topic 2).
Folders: `socialisation/`, `identity/families|language-identity|languages-cultures|wise-sayings|tools|personal-identity|totems`.
Exam rows: ZIM_P2A ×4 (agents of socialisation; the media/ICT; totems; identity documents), ZIM_P2B ×3 (the role of
the family versus the media in socialisation; "How far does ICT threaten indigenous values?"; the importance of
language and totems to identity).

**W1b — prefix `w1b-`** (12; Topic 2 Identity part 2, Topic 3 Norms and values part 1)
identity.herbs, identity.community-gatherings, identity.marriage-types, identity.religious-practices, culture.unhu ★
(Topic 3), culture.norms-values, culture.workplace, culture.indigenous-features, culture.foreign-influences,
culture.inheritance-indigenous, culture.inheritance-contemporary, culture.rites-of-passage.
Folders: `identity/herbs|community-gatherings|marriage-types|religious-practices`,
`culture/unhu|norms-values|workplace|indigenous-features|foreign-influences|inheritance-indigenous|inheritance-contemporary|rites-of-passage`.
Exam rows: ZIM_P2A ×4 (Unhu attributes; workplace norms; inheritance and wills; community ceremonies), ZIM_P2B ×3
(threats to indigenous culture; indigenous versus contemporary inheritance; monogamy and polygamy, both sides).

**W2a — prefix `w2a-`** (13; Topic 3 Norms and values part 2, Topic 7 Rights and responsibilities)
culture.courtship, culture.marriage-practices, culture.men-women-marriage, culture.birth-death-rites,
culture.entertainment, culture.arts-sport, rights.indigenous-entitlements, rights.children ★ (Topic 7),
rights.vulnerable-groups, rights.civic-responsibilities, rights.voluntary-activities, rights.gender-equality,
rights.gender-based-violence.
Folders: `culture/courtship|marriage-practices|men-women-marriage|birth-death-rites|entertainment|arts-sport`,
`rights/`.
Exam rows: ZIM_P2A ×4 (marriage counsellors; children's rights and responsibilities; vulnerable groups; voluntary
activities), ZIM_P2B ×3 (gender equality progress; the value of indigenous marriage practices today; how far
citizens meet their civic responsibilities).

**W2b — prefix `w2b-`** (11; Topic 4 National history: pre-colonial societies to the First Chimurenga)
precolonial.san-khoi, precolonial.political-structures, precolonial.early-iron-age,
precolonial.great-zimbabwe-mutapa ★ (Topic 4), precolonial.rozvi-ndebele, precolonial.iron-age-contributions,
colonisation.foreign-agents, colonisation.colonisation, colonisation.anglo-ndebele-war,
colonisation.first-chimurenga, colonisation.first-chimurenga-heroes.
Folders: `precolonial/`, `colonisation/foreign-agents|colonisation|anglo-ndebele-war|first-chimurenga|first-chimurenga-heroes`.
Exam rows: ZIM_P2A ×4 (chieftainship; Iron Age contributions; treaties and concessions; spirit mediums in 1896-97),
ZIM_P2B ×3 (role of foreign agents in colonisation; causes and results of the First Chimurenga; heritage of the
pre-colonial states). Write to Heritage depth; history-o has deeper concepts on the same events (do not copy them).

**W3a — prefix `w3a-`** (12; Topic 4 National history: colonial expropriation to governance; land ownership)
colonisation.expropriation, liberation.second-chimurenga, liberation.roles-heroes, independence.gains,
independence.challenges, governance.systems, governance.central-government, governance.local-government,
governance.social-services, governance.regional-organisations, governance.international-organisations,
production.land-ownership.
Folders: `colonisation/expropriation`, `liberation/ independence/ governance/`, `production/land-ownership`.
Exam rows: ZIM_P2A ×4 (arms of government; local authorities; roles of the masses in the struggle; SADC), ZIM_P2B ×3
(gains and challenges since 1980, balanced; democracy versus autocracy; land redistribution since 1980, balanced).

**W3b — prefix `w3b-`** (12; Topic 5 National heritage, Topic 6 Constitution part 1)
heritage.national-symbols ★ (Topic 5), heritage.monuments-shrines, heritage.world-heritage-sites,
heritage.liberation-sites, heritage.national-events, heritage.schools-pledge, heritage.natural-resources,
heritage.resource-ownership, constitution.making, constitution.contents ★ (Topic 6),
constitution.declaration-of-rights, constitution.citizenship.
Folders: `heritage/`, `constitution/making|contents|declaration-of-rights|citizenship`.
Exam rows: ZIM_P2A ×4 (national flag; world heritage sites; ways of acquiring citizenship; the constitution-making
process), ZIM_P2B ×3 (importance of national events and shrines; access to natural resources since 1980, balanced;
how far the Declaration of Rights protects citizens).

**W4a — prefix `w4a-`** (12; Topic 6 Constitution part 2, Topic 8 Production)
constitution.laws-courts, constitution.electoral-system, constitution.lancaster-to-2013, production.factors ★
(Topic 8), production.industry, production.informal-sector, production.food-storage,
production.indigenous-conservation, production.manufacturing, production.strategic-reserves,
production.inhibiting-factors, production.enterprise-skills.
Folders: `constitution/laws-courts|electoral-system|lancaster-to-2013`, `production/` (except land-ownership and
resource-conservation).
Exam rows: ZIM_P2A ×4 (courts; the electoral system; the informal sector; food preservation), ZIM_P2B ×3 (why a
home-grown constitution replaced Lancaster House; factors inhibiting production; indigenous conservation methods,
how effective).

**W4b — prefix `w4b-`** (11; Topic 9 Global issues, conservation)
global.environmental-issues, global.pollution, global.land-degradation, global.hazards-disasters,
global.climate-change ★ (Topic 9), global.pandemics, global.chronic-illnesses, global.human-trafficking,
global.waste-management, global.child-labour, production.resource-conservation.
Folders: `global/`, `production/resource-conservation`.
Exam rows: ZIM_P2A ×4 (pollution; droughts and floods; human trafficking; child labour), ZIM_P2B ×3 (climate change
adaptation and mitigation; pandemics' impact and response; waste management approaches).

Totals: ZIM_P2A 32 and ZIM_P2B 24, every topic at least twice in each (topic 4 most, as the largest topic);
freePreview: nine lessons, one per topic.
