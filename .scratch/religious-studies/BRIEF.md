# religious-studies-o — writing brief for content agents

You write ORIGINAL study content for the Family and Religious Studies family: ZIMSEC O-Level Family and Religious
Studies (Forms 1-4, 2015-2022), the only syllabus in the family (catalogue subject `religious-studies`, catalogue name
"Family and Religious Studies"). Content is DEV preview only; a human reviews it later (§41), but write it as if it
ships tomorrow. **Accuracy and respect come first**: the subject is multi-faith, non-proselytising and
non-confessional. Indigenous Religion, Judaism, Christianity and Islam are described accurately, as their adherents
understand them, with equal respect, and never ranked. A wrong belief, festival, scripture reference or date is worse
than a missing one.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, tables).
- `content/concepts/religious-studies-o.json` (89 concepts). Each description says exactly what is IN and what is
  OUT ("… is frs.x.y"). Stay inside it; where two concepts touch (e.g. Indigenous Religion marriage rites and gender
  roles), give the other a sentence and move on.
- The syllabus file `content/syllabi/zimsec/o-level/religious-studies/2015-2022.json` (two sections, topics 1-15)
  and its `notes`. IMPORTANT: the only document read was the Ministry **Teacher's Guide**, which lists the fifteen
  topics but not their full content; the sub-topics (except Topic 6, whose Form 1-4 scope is printed) and the paper
  structure are our breakdown. Write to the concept descriptions; do not claim "the syllabus says" for details.
- `.scratch/religious-studies/lib.mjs`: builders (`concept`, `b.mcq/tf/short/fib/match/manualShort/ext/essay/struct/
  card`, `P.*` parts) and the helpers `source()`, `sources()`, `table()`, `timeline()`, `levels(marks)`, `ref()`
  (scripture references in house style), `EXAM` (exam-format plans) and `checkExam(plan, parts)`.
- Style examples: `.scratch/english/slices/a1-nouns-pronouns.mjs` (slice style: every MCQ option has a rationale,
  explanations teach, hints from difficulty 3); any slice in `.scratch/history/slices/` (sources, timelines,
  structured items with levels); any lesson in `content/subjects/economics-o/lessons/` (front matter + blocks).

## What to produce per concept

1. **One lesson** `content/subjects/religious-studies-o/lessons/<area>/<name>.md` (key `<area>.<name>`, where the
   concept key is `frs.<area>.<name>`; e.g. `frs.judaism.beliefs` → `lessons/judaism/beliefs.md`, key
   `judaism.beliefs`), **900-1,600 words** (tables do not count), template of §6: `## Introduction` (why it matters
   to a young Zimbabwean; an everyday hook — a family funeral, a wedding, a school assembly, a neighbour fasting in
   Ramadan, a church service, a news report — and what the student should know already), `## Key definitions`
   (`:::definition{term="…"}` for terms such as *covenant*, *Torah*, *sacrament*, *Tawhid*, *rite of passage*,
   *taboo*, *stewardship*, *gender equity*; `:::keyfact` for dates, scripture references and names to learn),
   explanation sections with **at least one table** (a comparison of the four religions, a festival calendar, a
   "practitioner → role" table, or a timeline from `timeline()` for historical concepts) and at least two
   `:::example` blocks (a rite described step by step with its meaning, a case worked through from two religious
   perspectives, a scripture passage paraphrased and explained), `## Common mistakes` (`:::mistake{title="…"}` —
   confusing Sabbath and Sunday, Eid al-Fitr and Eid al-Adha, Torah and Tanakh, sacrament and ordinance; writing
   one religion's view as "religion says"; listing instead of explaining), `## Exam tips` (`:::exam-tip`: how
   *identify*, *outline*, *describe*, *explain*, *discuss*, *assess* and *how far* are answered for this concept,
   naming Paper 1 or Paper 2 and the (a)/(b) parts), `## Summary` (one `:::summary`, 4-6 bullets). Front matter: key,
   title (unique), summary, concepts ([the concept]), estimatedMinutes (honest), level "core"; `freePreview: true`
   ONLY on the lessons named in your assignment. Do not add `objectives`.
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/religious-studies/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 40%; four options, 1 mark: terms, beliefs, practices, festivals, practitioners,
     "which best explains", "which statement about the source is supported"), true/false, matching (term →
     definition, festival → meaning, practitioner → role, scripture reference → teaching, religion → practice),
     fill-in-the-blank (with `choices` drop-downs for names, terms and references — free-text spellings of
     Hebrew, Arabic, Shona and Ndebele words are risky), short answer ONLY for closed answers (list every accepted
     spelling: "Qur'an", "Quran", "Koran"; "Hajj", "Hadj"; "roora", "lobola"; "Pesach", "Passover"),
     3-5 self-marked `manualShort` items (identify / describe / explain, 2-6 marks, tickable points) and 2-4
     **practice structured** items (`b.struct`, difficulty 3-5, `examStyle: true`, totals 6, 8, 12, 14 or 16 —
     never 25, see reserved marks), at least one built on a short original stimulus (a scenario, a fictional
     newspaper report, a described photograph of a ceremony, a conversation between two fictional students of
     different faiths).
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 understanding/application, ~30% d4-5 analysis/evaluation.
     `daily: true` only on 2-3 auto-marked items of difficulty 2-3 per concept.
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION. Include application items ("Tatenda's
     family is preparing for kurova guva; which …") and evaluation items ("Assess the view that …"), not only recall.
   - `applies`: omit it (the family has one syllabus).
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FACT ("Which festival marks the end of
     Ramadan?" → "Eid al-Fitr"), CONCEPT ("Why is the Exodus central to Jewish identity?").

## Family and Religious Studies quality rules (non-negotiable)

- **Describe, do not preach.** Beliefs are reported as beliefs: "Christians believe that Jesus rose from the dead",
  "Muslims believe the Qur'an was revealed to the Prophet Muhammad through the angel Jibril", "In Indigenous
  Religion, ancestral spirits are believed to …". Never assert a religious claim as fact, never call a belief false,
  primitive, superstitious or pagan, never urge conversion or practice. Questions test knowledge and understanding of
  what a religion teaches, never the student's own faith ("According to Jewish teaching, …").
- **Accuracy of beliefs and practices.** Use the terms adherents use, with a short gloss: Shabbat, Pesach, Torah,
  Tanakh, kashrut; Eucharist/Holy Communion/Lord's Supper as denominations call it; Allah, Salah, Sawm, Zakat, Hajj,
  Qur'an, Hadith; midzimu/amadlozi, mhondoro, svikiro, n'anga/inyanga, bira, kurova guva/umbuyiso, mukwerera/ukucela
  izulu, roora/lobola. Where practice differs within a religion (Orthodox and Reform Jews; Catholic, Protestant,
  Pentecostal and African Independent churches; Sunni and Shi'a Muslims; different Zimbabwean peoples in Indigenous
  Religion) say so ("many", "most", "in Catholic and Orthodox churches") rather than generalising. The Prophet
  Muhammad is never depicted or described physically; writing "the Prophet Muhammad" is fine (the honorific "peace
  be upon him" may be added once in a lesson where it reads naturally).
- **Scripture: cite and paraphrase.** Every scripture reference is cited by book, chapter and verse with `ref()`
  ("Genesis 12:1-3", "Matthew 5:3-12", "Qur'an 2:183" — surah:ayah) and PARAPHRASED in your own words. No quotation
  longer than about ten words, and only if you are certain of the wording of a well-known translation (prefer
  paraphrase). Check every reference you give: if you are not sure of the verse, cite the chapter only or leave the
  reference out. Never quote textbooks, revision sites, past papers or mark schemes.
- **Indigenous Religion on its own terms.** It is a religion, not "culture" or "superstition": describe God (Mwari,
  uMlimo/uNkulunkulu), the spirits, practitioners, rituals and taboos respectfully, give Shona and Ndebele terms side
  by side, and mention other peoples (Tonga, Venda, Kalanga, Nambya, Shangani, Ndau, Remba and others) only where you
  know a fact about them. Witchcraft beliefs and accusations are described factually with their social harm; no
  instructions or endorsement. Traditional medicine: no claims that it cures disease.
- **Family, morality and social issues without bias.** Marriage forms (monogamy, polygamy), gender roles, sexuality,
  abortion, euthanasia, contraception, HIV prevention and the prosperity gospel: present the range of views within
  and between religions fairly ("Some Christians argue …; others …"), with the law where relevant, and let the
  student judge. MCQs never hinge on a contested judgement; they test facts or what a view says. Harmful or illegal
  practices (child and forced marriage, pledging girls (kuzvarira), virginity testing, wife inheritance without
  consent, property grabbing, refusing children medical care) are stated as harmful and, where true, illegal. Sexual
  content is age-appropriate and non-graphic; diverse religious views on sexual orientation are stated factually,
  without endorsing hostility to any person.
- **Health and safety.** Health content (HIV, substance abuse, healing, disability) matches Ministry of Health/WHO
  public messages; non-stigmatising language ("people living with HIV", "a person with a disability"); always "seek a
  trained health worker"; help channels in general terms or as listed below.
- **History and politics.** Dates and events only if well established (reference list below). The liberation
  struggle: the roles of spirit mediums, churches and other religious bodies are described with both supportive and
  critical facts; ZANU/ZANLA and ZAPU/ZIPRA fairly; no slogans, no praise or blame of living politicians. Middle
  East politics, the Israeli-Palestinian conflict and current religious controversies are out of scope; the Holocaust
  is stated accurately and respectfully (about six million Jews murdered by the Nazi regime), without graphic detail.
- **No statistics** on religious affiliation, HIV prevalence or similar unless widely documented, dated and named in a
  reviewer note in the slice; prefer "many", "a large majority", or name where the figure is published (ZIMSTAT
  census).
- **No images.** Places of worship, symbols and attire are described in words; comparisons and calendars are
  Markdown tables. Never write "the picture below shows" unless the table is there.
- **Sources and scenarios are ORIGINAL and labelled.** Build stimuli with `source(label, kind, text, { described })`
  ("a letter in a fictional church newsletter, 2026", "a photograph of a Muslim family at Eid prayers, described in
  words"). Attribute invented words only to fictional or anonymous people; **never put invented words in the mouth of
  a real person or a real religious body** (no invented saying of Jesus, the Prophet, a rabbi, a pope, Nehanda or a
  named church), and never present an invented source as real scripture.
- **MCQs:** exactly one defensible answer, four options, distractors definitely wrong (rationale for each: the right
  practice from the wrong religion, a festival with a different meaning, a role of a different practitioner); never
  "all/none of the above", never refer to options by letter. **No length cue** — the key must not be clearly the
  longest option; check with `node .scratch/tools/length-cue.mjs religious-studies-o questions/<your folder>/` →
  `# 0 flagged`.
- **Self-marked items:** one point per creditworthy idea, as examiners award (identify 1 + explain/develop 1:
  "Explains that the Shema expresses belief in one God, so Jews recite it daily to renew their commitment"); points
  add up to the marks; example answer complete. Explain parts need developed reasons, not lists; *discuss / assess /
  how far* parts need more than one view (ideally from more than one religion) and a supported conclusion, and get
  `levels: levels(marks)`.
- **Original wording**, British English, names Tendai, Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho, Thandeka, Themba,
  Nokuthula, Tafadzwa, Mthulisi, and also Aisha, Yusuf, Fatima, Ibrahim (Muslim characters), Miriam, David, Rachel
  (Jewish characters) for invented people; places Harare, Bulawayo, Mutare, Gweru, Masvingo, Chinhoyi, Kariba,
  Hwange, Lupane, Gwanda, Bindura, Marondera. Fictional schools, churches, mosques, congregations and villages only.
  Dates as 7 October 2026; BCE/CE for ancient dates; money as US\$ (in JS `"US\\$"`).

### Reference facts you may rely on (all well established)

- **Judaism:** Abraham, Isaac, Jacob (Israel) and the twelve tribes; Moses, the Exodus and Sinai (Exodus 3, 12, 20;
  Deuteronomy 5); the Shema (Deuteronomy 6:4-9); First Temple built under Solomon; Babylonian destruction of
  Jerusalem and exile 586 BCE; Second Temple destroyed by the Romans 70 CE; the Holocaust 1941-45 (about six million
  Jews); State of Israel proclaimed 14 May 1948. Tanakh = Torah (5 books) + Nevi'im + Ketuvim. Shabbat from Friday
  sunset to Saturday nightfall. Festivals: Pesach (spring, Exodus), Shavuot (giving of the Torah), Sukkot (wilderness
  shelters), Rosh Hashanah (new year), Yom Kippur (Day of Atonement, a fast), Hanukkah (rededication of the Temple,
  eight nights), Purim (Esther). Brit milah on the eighth day; bar mitzvah at 13, bat mitzvah at 12 (Orthodox) or 13.
- **Christianity:** Pentecost (Acts 2); Paul's journeys (Acts 13-28); Edict of Milan 313; Council of Nicaea 325;
  Great Schism 1054; Luther's Ninety-five Theses 1517; Gonçalo da Silveira killed at the Mutapa court 1561; London
  Missionary Society at Inyati 1859. Seven sacraments in Catholic and Orthodox churches; most Protestant churches
  keep two (baptism and Holy Communion). Christian year: Advent, Christmas, Epiphany, Lent (from Ash Wednesday),
  Holy Week, Good Friday, Easter, Ascension (40 days after Easter), Pentecost (50 days after Easter). Seventh-day
  Adventists keep a Saturday Sabbath.
- **Islam:** the Prophet Muhammad born about 570 CE in Makkah; first revelation about 610 CE (cave of Hira, Laylat
  al-Qadr); Hijrah to Madinah 622 CE (year 1 of the Islamic calendar); return to Makkah 630 CE; death 632 CE. Caliphs:
  Abu Bakr, Umar, Uthman, Ali. Qur'an: 114 surahs, Al-Fatihah first. Six articles of faith; Five Pillars (Shahadah,
  Salah five times a day, Zakat usually 2.5% of qualifying savings held for a lunar year, Sawm in Ramadan, Hajj in
  Dhul-Hijjah once in a lifetime for those able). Eid al-Fitr ends Ramadan; Eid al-Adha at the end of Hajj
  (Ibrahim's willingness to sacrifice his son). Friday congregational prayer: Jumu'ah. Islamic calendar is lunar
  (about 354 days), so festivals move about 11 days earlier each year.
- **Indigenous Religion (Zimbabwe):** God: Mwari, Musikavanhu, Nyadenga (Shona), uMlimo, uNkulunkulu (Ndebele);
  Mwari shrines in the Matopo Hills (Njelele/Matonjeni); ancestral spirits midzimu/amadlozi; territorial spirits
  mhondoro; spirit medium svikiro; healer n'anga/inyanga; rest day chisi; rain-making mukwerera/ukucela izulu;
  bira ceremony; bringing-home ceremony kurova guva/umbuyiso; taboos zviera; bride wealth roora/lobola; totem
  mutupo/isibongo. Nehanda (Charwe Nyakasikana) and Kaguvi executed April 1898; Mkwati associated with the Mwari
  shrines in 1896.
- **Zimbabwe (law and history):** independence 18 April 1980; Unity Accord 22 December 1987; Constitution of
  Zimbabwe 2013: section 56 (equality and non-discrimination), 60 (freedom of conscience, including religion), 75
  (education), 78 (marriage rights; minimum age 18), 80 (women), 81 (children), 83 (persons with disabilities), 22
  (persons with disabilities, national objective), 17 (gender balance), 251 (National Peace and Reconciliation
  Commission). Domestic Violence Act 2007; Marriages Act 2022 (outline only, reviewer note); the age of consent to sex
  was raised to 18 after a 2022 Constitutional Court ruling — teach "the law protects children under 18". Help
  channels: Childline Zimbabwe (116), the police Victim Friendly Unit, a clinic, a trusted adult.
- **International:** Universal Declaration of Human Rights (10 December 1948); UN Convention on the Rights of the
  Child (1989); African Charter on the Rights and Welfare of the Child (1990); UN Convention on the Rights of Persons
  with Disabilities (2006).

## Exam-format items (rows owned per assignment below)

`examStyle: true`, skill and parts EXACTLY as the plan in `EXAM` (lib.mjs) — the builder refuses a 25-mark
STRUCTURED item that does not match a plan. Wrap the parts in `checkExam(EXAM.X, [...])`, pass
`skill: EXAM.X.skill, secs: EXAM.X.secs`, difficulty 4-5, and set `concepts: [...]` on every item to the concepts it
really examines (any of yours). Labels are flat: `(a)`, `(b)` (never `1(a)`). Mocks draw by type + marks + skill
(+ topic).

| Paper item | plan | type, marks, skill | parts (our convention: reviewer to check) | how many |
|---|---|---|---|---|
| Paper 1 (Religions, topics 1-5): structured essay question | `EXAM.ZIM_P1` | STRUCTURED, 25, ANALYSIS | (a) "Describe / Outline / Narrate …" 15 — tickable points (about 7-8 developed points, 2 marks each, or 15 one-mark points for a narrative), self-marked with a full example answer; (b) "Explain the significance of … / What lessons can believers learn from … / How is … relevant today?" 10 — `levels(10)`, `type: "EXTENDED_RESPONSE"`, full `modelAnswer` | 26 in all (see split) |
| Paper 2 (Contemporary issues, topics 6-15): structured essay question | `EXAM.ZIM_P2` | STRUCTURED, 25, EVALUATION | (a) "Describe / Explain …" 15 — tickable points, drawing on at least two religions where the question allows; (b) "Discuss / Assess / How far / To what extent …" 10 — more than one view (ideally from more than one religion) and a supported conclusion, `levels(10)`, `type: "EXTENDED_RESPONSE"`, full `modelAnswer` | 23 in all (see split) |

The document read (the Teacher's Guide) gives only 30% continuous assessment and 70% examination; the two-paper
model, the 25-mark question and the 15 + 10 split are **our convention**, modelled on the long-standing ZIMSEC
humanities/religious studies essay format (a reviewer checks them against the syllabus and recent papers). Each
self-marked exam part: indicative content as points that add up to the marks (with `levels` for (b)) and a full
example answer. Put the items in `questions/exam/<prefix>zimsec.json`: one extra `concept(...)` module
(`file: "exam/<prefix>zimsec"`, `keyPrefix: "exam.<prefix>zimsec"`, first argument any concept of yours).

**Reserved mark values.** STRUCTURED worth **25** is only for the Paper 1 and Paper 2 exam-format items. Practice
structured items use 6, 8, 12, 14 or 16 marks. One-mark single-answer MCQs feed topic tests (neither modelled paper
is multiple choice), so keep them exam-worthy.

Mock exams (built later by the lead, not by writers; our convention): Paper 1 offers eight questions (at least one on
each of topics 2-5 and one on topic 1), answer four, 100 marks, 2 hours 30 minutes; Paper 2 offers eight questions
on eight different topics of 6-15, answer four, 100 marks, 2 hours 30 minutes.

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in
  `questions/exam/`.
- Areas (from the concept keys): religion, indigenous, judaism, christianity, islam, family, education, gender,
  ethics, disability, environment, enterprise, liberation, rights, conflict.
- Lesson titles must be unique (slugs come from titles). Lesson-only scratch scripts go in
  `.scratch/religious-studies/tables/<prefix><name>.mjs` (never in `slices/`, which the build imports).

## Commands (repo root)

- Build your slices only: `node .scratch/religious-studies/build-content.mjs <your-prefix>` (prefix match on the
  START of file names, e.g. `w2a-`; the trailing dash matters).
- Validate: `npm run content:validate -- religious-studies-o --strict` → 0 error(s), 0 warning(s). Other writers work
  in the same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- religious-studies-o` → fix findings in your files.
- Length cue: see above.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, concepts.mjs, the registry, the syllabus file, `.scratch/tools/`,
  other families or other writers' files: report needed changes (a concept boundary, a missing book in `ref()`)
  instead.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation, content:check and length-cue results, any fact or scripture reference you left out or want a
  reviewer to check.

## Proposed split into 8 writer assignments

89 concepts; every assignment has 9-12 concepts plus 6-7 exam-format items. Concept keys below drop the `frs.`
prefix. ★ = `freePreview: true` (at most one lesson per top-level topic: fifteen in all).

**W1a — prefix `w1a-`** (12; Topic 1 Concept of Religion, Topic 2 Indigenous Religion part 1)
religion.meaning-features ★ (Topic 1), religion.origins-theories, religion.functions, religion.diversity-zimbabwe,
religion.study-approaches, religion.morality-unhu, indigenous.nature-sources ★ (Topic 2), indigenous.god-creation,
indigenous.spirit-world, indigenous.practitioners, indigenous.sacred-places-attire, indigenous.worship-rituals.
Folders: `religion/`, `indigenous/nature-sources|god-creation|spirit-world|practitioners|sacred-places-attire|worship-rituals`.
Exam rows: ZIM_P1 ×6 (features and functions of religion; theories of origin; the concept of God in IR; the spirit
world; practitioners; sacred places and rituals).

**W1b — prefix `w1b-`** (12; Topic 2 Indigenous Religion part 2, Topic 6 Religion, Family and Identity)
indigenous.rites-birth-initiation, indigenous.rites-marriage, indigenous.rites-death, indigenous.morality-taboos,
indigenous.change-continuity, family.concept-structure ★ (Topic 6), family.ir-family-identity, family.names-totems,
family.community-values, family.interdependence, family.zimbabwean-african-identity, family.changing-family.
Folders: `indigenous/rites-birth-initiation|rites-marriage|rites-death|morality-taboos|change-continuity`, `family/`.
Exam rows: ZIM_P1 ×3 (IR marriage; death and kurova guva/umbuyiso; taboos and morality); ZIM_P2 ×3 (family types and
roles; names and totems in identity; changing families and national values).

**W2a — prefix `w2a-`** (11; Topic 3 Judaism)
judaism.patriarchs, judaism.exodus-sinai, judaism.kingdom-diaspora, judaism.beliefs ★ (Topic 3),
judaism.scriptures, judaism.worship-practitioners, judaism.sabbath-festivals, judaism.rites-passage,
judaism.home-food-laws, judaism.groups, judaism.ethics.
Folders: `judaism/`.
Exam rows: ZIM_P1 ×6 (Abraham and the covenant; Moses and the Exodus; the synagogue and worship; Shabbat and
festivals; rites of passage; Jewish moral teaching).

**W2b — prefix `w2b-`** (11; Topic 4 Christianity)
christianity.jesus-life ★ (Topic 4), christianity.teachings-jesus, christianity.early-church,
christianity.denominations, christianity.zimbabwe, christianity.beliefs, christianity.bible,
christianity.worship-practitioners, christianity.sacraments-rites, christianity.festivals, christianity.ethics.
Folders: `christianity/`.
Exam rows: ZIM_P1 ×6 (the life of Jesus; parables or the Sermon on the Mount; the early Church; Christianity in
Zimbabwe and the AICs; sacraments; Christian festivals).

**W3a — prefix `w3a-`** (12; Topic 5 Islam, Topic 10 Religion and Disability)
islam.muhammad, islam.caliphs-spread, islam.beliefs ★ (Topic 5), islam.quran-hadith, islam.pillars-shahadah-salah,
islam.pillars-zakat-sawm-hajj, islam.mosque-festivals, islam.rites-passage, islam.groups-sharia,
disability.concepts-causes ★ (Topic 10), disability.religious-teachings, disability.inclusion-rights.
Folders: `islam/`, `disability/`.
Exam rows: ZIM_P1 ×5 (the life of the Prophet; the Qur'an and Hadith; Salah; Zakat, Sawm and Hajj; Muslim rites of
passage); ZIM_P2 ×2 (religious attitudes to disability; inclusion of people with disabilities).

**W3b — prefix `w3b-`** (11; Topic 7 Education, Topic 8 Gender, Topic 11 Natural environment)
education.indigenous-education, education.institutions ★ (Topic 7), education.nation-building,
education.negative-impact, gender.concepts, gender.ir-judaism, gender.christianity-islam ★ (Topic 8),
gender.equality-gbv, environment.teachings ★ (Topic 11), environment.ir-conservation, environment.issues-responses.
Folders: `education/`, `gender/`, `environment/`.
Exam rows: ZIM_P2 ×6 (religion and the founding of schools; negative impact on education; gender roles in two
religions; religion and GBV; teachings on stewardship; IR conservation, how effective).

**W4a — prefix `w4a-`** (9; Topic 9 Ethics, Health and Sexuality, Topic 12 Enterprise)
ethics.health-healing, ethics.sexuality, ethics.hiv-aids ★ (Topic 9), ethics.substance-abuse, ethics.bioethics,
ethics.moral-decision, enterprise.work-wealth ★ (Topic 12), enterprise.religious-projects,
enterprise.business-ethics.
Folders: `ethics/`, `enterprise/`.
Exam rows: ZIM_P2 ×6 (religious healing and modern medicine; HIV and AIDS responses; substance abuse; abortion or
euthanasia, views compared; teachings on work and wealth; religious enterprise projects).

**W4b — prefix `w4b-`** (11; Topic 13 Liberation struggle, Topic 14 Rights, Topic 15 Conflict management)
liberation.first-chimurenga ★ (Topic 13), liberation.second-chimurenga-ir, liberation.churches,
liberation.reconciliation, rights.human-rights, rights.children ★ (Topic 14), rights.social-responsibility,
conflict.causes-types, conflict.teachings-peace ★ (Topic 15), conflict.resolution-methods, conflict.religion-cause.
Folders: `liberation/`, `rights/`, `conflict/`.
Exam rows: ZIM_P2 ×6 (IR in the First Chimurenga; the churches in the struggle, both sides; religion and human
rights; children's rights and religious teaching; teachings on peace; religion as a cause of conflict and of peace).

Totals: ZIM_P1 26 (topic 1 ×2, topic 2 ×7, topics 3 and 4 ×6, topic 5 ×5), ZIM_P2 23 (every topic 6-15 at least
twice); freePreview: fifteen lessons, one per topic.
