// Builds content/concepts/religious-studies-o.json and the Family and Religious Studies syllabus file:
//   content/syllabi/zimsec/o-level/religious-studies/2015-2022.json
// Source (local only, not in git): .scratch/religious-studies/sources/zimsec-family-religious-studies.pdf (+ .txt):
// the Ministry's "Family and Religious Studies, Secondary School Level, Forms 1-4, 2015-2022, Teacher's Guide"
// (Curriculum Development and Technical Services, copyright 2015; running header "F.R.S Teacher's Guide 2017").
// It is a TEACHER'S GUIDE, not the syllabus: it lists the fifteen syllabus topics in two groups (Religions;
// Contemporary issues), prints the Form 1-4 scope and sequence for Religion, Family and Identity only, one competency
// matrix sample (Topic 3: Judaism) and the 30% / 70% assessment split. Everything else (sub-topics, objectives, paper
// structure) is our breakdown, recorded as such in sourceNote and notes.
// The concept registry lives in ./concepts.mjs. Run from the repo root: node .scratch/religious-studies/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";
import { CONCEPTS } from "./concepts.mjs";

const ROOT = process.cwd();
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept key in concepts.mjs");
for (const [k] of CONCEPTS) if (!/^frs\.[a-z0-9-]+\.[a-z0-9-]+$/.test(k)) throw new Error(`bad concept key ${k}`);
const names = new Set();
for (const [k, n] of CONCEPTS) {
  if (names.has(n)) throw new Error(`duplicate concept name "${n}" (${k})`);
  names.add(n);
}
const NAME = new Map(CONCEPTS.map(([k, n]) => [k, n]));

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. Objectives are our own paraphrase; sub-topic and objective codes are ours (topic code + .n, + .n).
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, children } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) n.objectives = objectives.map((o, i) => ({ code: `${code}.${i + 1}`, text: o }));
  if (components) n.components = components;
  if (children) n.children = children;
  return n;
};
// One sub-topic per concept: [conceptKey, objectives[], description?]. The sub-topic name is the concept name.
const topic = (key, code, name, components, subs, description) =>
  node("TOPIC", key, code, name, {
    description,
    components,
    children: subs.map(([c, objectives, desc], i) => {
      if (!NAME.has(c)) throw new Error(`unknown concept ${c}`);
      return node("SUBTOPIC", `${key}.${c.split(".")[2]}`, `${code}.${i + 1}`, NAME.get(c), { description: desc, covers: [c], objectives });
    }),
  });
const section = (key, name, description, children) => ({ key, name, kind: "SECTION", description, children });

const P1 = ["1"];
const P2 = ["2"];

const RELIGIONS = section("religions", "Religions", "The first group of syllabus topics (Teacher's Guide, Table 1): the concept of religion and the historical background, beliefs, practices, practitioners, rites and rituals of Indigenous Religion, Judaism, Christianity and Islam.", [
  topic("concept-of-religion", "1", "Concept of Religion", P1, [
    ["frs.religion.meaning-features", ["Define religion from different perspectives.", "Identify and explain the common features of religions."]],
    ["frs.religion.origins-theories", ["Outline theories of the origin of religion.", "Evaluate the strengths and weaknesses of each theory."]],
    ["frs.religion.functions", ["Explain the functions of religion for the individual, family, community and nation.", "Discuss positive and negative effects of religion in society."]],
    ["frs.religion.diversity-zimbabwe", ["Identify the religions practised in Zimbabwe.", "Explain the importance of religious tolerance, freedom of religion and interfaith dialogue."]],
    ["frs.religion.study-approaches", ["Define key terms used in the study of religion (monotheism, polytheism, atheism, revelation and others).", "Explain the multi-faith, non-confessional approach to studying religion."]],
    ["frs.religion.morality-unhu", ["Explain the relationship between religion and morality.", "Describe Unhu/Ubuntu/Vumunhu and how different religions support its values."]],
  ]),
  topic("indigenous-religion", "2", "Indigenous Religion", P1, [
    ["frs.indigenous.nature-sources", ["Describe the features of Indigenous Religion.", "Identify the sources of Indigenous Religion and discuss misconceptions about it."]],
    ["frs.indigenous.god-creation", ["Identify names and attributes of God in Indigenous Religion.", "Narrate creation myths and explain the relationship between God, ancestors and people."]],
    ["frs.indigenous.spirit-world", ["Identify the categories of spirits believed in Indigenous Religion.", "Explain the roles believers attribute to each category of spirit."]],
    ["frs.indigenous.practitioners", ["Identify religious practitioners in Indigenous Religion.", "Describe the roles of practitioners in the family and community."]],
    ["frs.indigenous.sacred-places-attire", ["Identify sacred places, objects, attire and symbols in Indigenous Religion.", "Explain their significance."], "The Teacher's Guide names attire as a teachable unit of Indigenous Religion."],
    ["frs.indigenous.worship-rituals", ["Describe forms of worship and rituals in Indigenous Religion.", "Explain the significance of sacred days and ceremonies."], "The Teacher's Guide names sacred days as a teachable unit of Indigenous Religion."],
    ["frs.indigenous.rites-birth-initiation", ["Describe birth, naming and initiation rites in Indigenous Religion.", "Explain the purposes of these rites and discuss contemporary debates about them."], "The Teacher's Guide names rites of passage as a teachable unit of Indigenous Religion."],
    ["frs.indigenous.rites-marriage", ["Describe the marriage process in Indigenous Religion.", "Discuss the advantages and disadvantages of types of marriage and identify harmful practices."]],
    ["frs.indigenous.rites-death", ["Describe death and burial rites, including the bringing-home ceremony.", "Explain beliefs about the afterlife in Indigenous Religion."]],
    ["frs.indigenous.morality-taboos", ["Identify moral teachings and taboos in Indigenous Religion.", "Explain the purposes of taboos and sanctions."]],
    ["frs.indigenous.change-continuity", ["Explain how Indigenous Religion has changed through contact with other religions and modern life.", "Assess the place of Indigenous Religion in contemporary Zimbabwe."]],
  ]),
  topic("judaism", "3", "Judaism", P1, [
    ["frs.judaism.patriarchs", ["Define Judaism.", "Narrate the call of Abraham and the history of the patriarchs and explain the covenant."], "The Teacher's Guide competency matrix sample (Topic 3: Judaism) lists the definition and the historical background of Judaism."],
    ["frs.judaism.exodus-sinai", ["Narrate the story of Moses and the Exodus.", "Explain the significance of the Sinai covenant and the Ten Commandments."]],
    ["frs.judaism.kingdom-diaspora", ["Trace the history of Judaism from the monarchy to the diaspora.", "Describe Jewish communities in Zimbabwe."]],
    ["frs.judaism.beliefs", ["Describe the main Jewish beliefs.", "Explain the significance of the Shema and the covenant for Jews."]],
    ["frs.judaism.scriptures", ["Identify the parts of the Tanakh and the Talmud.", "Explain how Jews use scripture."]],
    ["frs.judaism.worship-practitioners", ["Describe the synagogue and Jewish worship.", "Identify Jewish religious leaders, attire and symbols and explain their roles and meanings."]],
    ["frs.judaism.sabbath-festivals", ["Describe how Jews observe the Sabbath.", "Describe Jewish festivals and explain their significance."]],
    ["frs.judaism.rites-passage", ["Describe Jewish rites of passage.", "Explain the meaning of each rite."]],
    ["frs.judaism.home-food-laws", ["Describe religious practice in the Jewish home.", "Explain the Jewish dietary laws and the reasons given for them."]],
    ["frs.judaism.groups", ["Identify the main groups within Judaism.", "Compare their beliefs and practices."]],
    ["frs.judaism.ethics", ["Explain Jewish moral teachings.", "Relate Jewish moral teachings to life today."]],
  ]),
  topic("christianity", "4", "Christianity", P1, [
    ["frs.christianity.jesus-life", ["Describe the background to the life of Jesus.", "Narrate the main events of the life, death and resurrection of Jesus as recorded in the Gospels."]],
    ["frs.christianity.teachings-jesus", ["Explain the main teachings and selected parables of Jesus.", "Relate the teachings of Jesus to life today."]],
    ["frs.christianity.early-church", ["Describe the growth of the early Church.", "Explain how Christianity spread, including to Africa."]],
    ["frs.christianity.denominations", ["Trace the origins of the main Christian denominations.", "Compare denominations and explain the work of ecumenical bodies."]],
    ["frs.christianity.zimbabwe", ["Trace the coming and spread of Christianity in Zimbabwe.", "Describe the growth of African Independent and Pentecostal churches."]],
    ["frs.christianity.beliefs", ["Describe the main Christian beliefs.", "Explain the doctrine of the Trinity and Christian beliefs about salvation and the afterlife."]],
    ["frs.christianity.bible", ["Describe the structure of the Bible.", "Explain how Christians interpret and use the Bible."]],
    ["frs.christianity.worship-practitioners", ["Describe forms of Christian worship and places of worship.", "Identify Christian leaders, attire and symbols and explain their roles and meanings."]],
    ["frs.christianity.sacraments-rites", ["Describe the sacraments and Christian rites of passage.", "Explain differences between denominations on the sacraments."]],
    ["frs.christianity.festivals", ["Describe the Christian sacred days and festivals.", "Explain their significance."]],
    ["frs.christianity.ethics", ["Explain Christian moral teachings.", "Relate Christian moral teachings to life today."]],
  ]),
  topic("islam", "5", "Islam", P1, [
    ["frs.islam.muhammad", ["Describe Arabia before Islam.", "Narrate the main events of the life of the Prophet Muhammad."]],
    ["frs.islam.caliphs-spread", ["Describe the rule of the four rightly guided caliphs.", "Trace the spread of Islam to Africa and Zimbabwe."]],
    ["frs.islam.beliefs", ["Describe the Muslim articles of faith.", "Explain the meaning and importance of Tawhid."]],
    ["frs.islam.quran-hadith", ["Describe the revelation, compilation and structure of the Qur'an.", "Explain the role of the Hadith and Sunnah."]],
    ["frs.islam.pillars-shahadah-salah", ["Describe the Shahadah and Salah.", "Explain the significance of prayer for Muslims."]],
    ["frs.islam.pillars-zakat-sawm-hajj", ["Describe Zakat, Sawm and Hajj.", "Explain their significance for the individual and the community."]],
    ["frs.islam.mosque-festivals", ["Describe the mosque and Muslim religious leaders.", "Describe Muslim festivals and sacred days and explain their significance."]],
    ["frs.islam.rites-passage", ["Describe Muslim rites of passage.", "Explain the meaning of each rite."]],
    ["frs.islam.groups-sharia", ["Explain Sharia and Islamic moral teachings.", "Identify groups within Islam and explain their differences."]],
  ]),
]);

const CONTEMPORARY = section("contemporary-issues", "Contemporary Issues", "The second group of syllabus topics (Teacher's Guide, Table 1): how religion relates to family and identity, education, gender, ethics and health, disability, the environment, enterprise, the liberation struggle, rights and conflict.", [
  topic("family-identity", "6", "Religion, Family and Identity", P2, [
    ["frs.family.concept-structure", ["Form 1: explain the concept of family and describe its structure.", "Form 1: describe the roles of family members."], "Form 1 (scope and sequence: the concept of family; structure of a family)."],
    ["frs.family.ir-family-identity", ["Form 1: explain how Indigenous Religion shapes family identity."], "Form 1 (scope and sequence: Indigenous Religion and family identity)."],
    ["frs.family.names-totems", ["Form 2: explain the significance of names and totems for identity."], "Form 2 (scope and sequence: names and totems)."],
    ["frs.family.community-values", ["Form 2: identify family and community values.", "Form 2: explain the relationship between Indigenous Religion and the community."], "Form 2 (scope and sequence: Indigenous Religion and community; family values; community values)."],
    ["frs.family.interdependence", ["Form 3: explain the inter-dependency of families and the role of religion in it."], "Form 3 (scope and sequence: inter-dependency of families)."],
    ["frs.family.zimbabwean-african-identity", ["Form 3: explain the contribution of Indigenous Religion to Zimbabwean identity.", "Form 4: explain the contribution of Indigenous Religion to African identity."], "Forms 3 and 4 (scope and sequence: Indigenous Religion and Zimbabwean identity; Indigenous Religion and African identity)."],
    ["frs.family.changing-family", ["Form 4: explain how culture and types of families are changing.", "Form 4: discuss the family and national values."], "Form 4 (scope and sequence: changing culture and different types of families; family and the national values)."],
  ], "The only topic whose Form 1-4 scope and sequence is printed in the Teacher's Guide (Table 2); the form of each sub-topic is taken from it."),
  topic("education", "7", "Religion and Education", P2, [
    ["frs.education.indigenous-education", ["Describe indigenous education and its religious content.", "Assess the strengths and limitations of indigenous education."]],
    ["frs.education.institutions", ["Explain the role of religions in establishing educational institutions.", "Assess their contribution to human resource capacity building."], "The Teacher's Guide (Table 6) names this teachable unit."],
    ["frs.education.nation-building", ["Assess the role of religion in education and nation building."], "The Teacher's Guide (Table 6) names this teachable unit (religious organisations and educational infrastructure)."],
    ["frs.education.negative-impact", ["Examine the negative impact of some religious beliefs and practices on education.", "Suggest ways of addressing them."], "The Teacher's Guide (Table 6) names this teachable unit."],
  ]),
  topic("gender-roles", "8", "Religion and Gender Roles", P2, [
    ["frs.gender.concepts", ["Define gender and related terms.", "Explain how gender roles are learned."]],
    ["frs.gender.ir-judaism", ["Identify what Indigenous Religion and Judaism teach on gender.", "Explain gender roles in Indigenous Religion and Judaism."], "The Teacher's Guide sample scheme of work (Form 2) has the objectives: identify what various religions say on gender; explain gender roles in various religions."],
    ["frs.gender.christianity-islam", ["Identify what Christianity and Islam teach on gender.", "Explain gender roles in Christianity and Islam."]],
    ["frs.gender.equality-gbv", ["Assess the influence of religion on gender equality.", "Discuss religious responses to gender-based violence and harmful practices."]],
  ]),
  topic("ethics-health-sexuality", "9", "Religion, Ethics, Health and Sexuality", P2, [
    ["frs.ethics.health-healing", ["Describe religious understandings of illness and healing.", "Discuss the relationship between religious healing and modern medicine."]],
    ["frs.ethics.sexuality", ["Explain religious teachings on sexuality and marriage.", "Discuss responsible sexual behaviour and protection from abuse."]],
    ["frs.ethics.hiv-aids", ["Explain religious responses to HIV and AIDS.", "Discuss stigma and the role of religion in prevention and care."]],
    ["frs.ethics.substance-abuse", ["Explain the effects of drug and substance abuse.", "Describe religious teachings and responses on substance abuse."]],
    ["frs.ethics.bioethics", ["Explain religious views on the sanctity of life.", "Compare religious views on abortion, contraception, euthanasia and related medical issues."]],
    ["frs.ethics.moral-decision", ["Explain how religious people make moral decisions.", "Apply religious teachings to contemporary moral issues."]],
  ]),
  topic("disability", "10", "Religion and Disability", P2, [
    ["frs.disability.concepts-causes", ["Define disability and identify its types and causes.", "Explain and correct myths about the causes of disability."]],
    ["frs.disability.religious-teachings", ["Describe religious teachings and attitudes towards disability."]],
    ["frs.disability.inclusion-rights", ["Explain the rights of people with disabilities.", "Describe the role of religion in the inclusion of people with disabilities."]],
  ]),
  topic("natural-environment", "11", "Religion and the Natural Environment", P2, [
    ["frs.environment.teachings", ["Explain religious teachings on creation and the natural environment.", "Compare the views of different religions."]],
    ["frs.environment.ir-conservation", ["Describe how Indigenous Religion conserves the environment.", "Assess the effectiveness of indigenous conservation methods."]],
    ["frs.environment.issues-responses", ["Identify environmental problems and their causes.", "Describe religious responses to environmental problems."]],
  ], "The Teacher's Guide states that this topic is covered in Forms 1-3 and not in Form 4."),
  topic("enterprise", "12", "Religion and Enterprise", P2, [
    ["frs.enterprise.work-wealth", ["Explain religious teachings on work, wealth and poverty."]],
    ["frs.enterprise.religious-projects", ["Describe enterprise projects run by religious organisations.", "Assess their contribution to communities."]],
    ["frs.enterprise.business-ethics", ["Explain religious teachings on honesty and fairness in business.", "Discuss religious views on lending, interest and corruption."]],
  ]),
  topic("liberation-struggle", "13", "Religion and the Liberation Struggle (Chimurenga/Umvukela)", P2, [
    ["frs.liberation.first-chimurenga", ["Explain the role of Indigenous Religion in the First Chimurenga/Umvukela."]],
    ["frs.liberation.second-chimurenga-ir", ["Explain the role of Indigenous Religion in the Second Chimurenga/Umvukela."]],
    ["frs.liberation.churches", ["Assess the role of Christianity and other religions in the liberation struggle."]],
    ["frs.liberation.reconciliation", ["Explain the role of religion in reconciliation and healing after the liberation struggle."]],
  ]),
  topic("rights-responsibility", "14", "Religion, Rights and Social Responsibility", P2, [
    ["frs.rights.human-rights", ["Explain the relationship between religion and human rights.", "Discuss cases where religious practices and human rights conflict."]],
    ["frs.rights.children", ["Identify children's rights and responsibilities.", "Explain religious teachings on children and child protection."]],
    ["frs.rights.social-responsibility", ["Explain religious teachings on social responsibility.", "Describe the welfare work of religious organisations."]],
  ]),
  topic("conflict-management", "15", "Religion and Conflict Management", P2, [
    ["frs.conflict.causes-types", ["Define conflict and identify its types and causes."]],
    ["frs.conflict.teachings-peace", ["Explain religious teachings on peace and conflict."]],
    ["frs.conflict.resolution-methods", ["Describe traditional, religious and modern methods of resolving conflict."]],
    ["frs.conflict.religion-cause", ["Discuss how religion can be a source of conflict and a means of building peace."]],
  ]),
]);

const zimsec = {
  board: "zimsec",
  qualification: "o-level",
  subject: "religious-studies",
  versionLabel: "2015-2022",
  family: "religious-studies-o",
  title: "ZIMSEC O-Level Family and Religious Studies",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Family and Religious Studies, Secondary School Level, Forms 1-4, 2015-2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at O Level",
    url: "https://www.zimsake.co.zw/softidrive/",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "The fifteen topic names, their two groups (Religions; Contemporary issues) and their order are transcribed from the topic list of the Ministry's Family and Religious Studies Forms 1-4 (2015-2022) Teacher's Guide (Table 1, repeated in Table 5); the topic numbers 1-15 follow that order (the guide's competency matrix sample confirms 'Topic 3: Judaism'). The Form 1-4 sub-topics of Religion, Family and Identity are transcribed from the guide's scope and sequence sample (Table 2). All other sub-topics, every objective statement and all sub-topic and objective codes are ours, written as our own paraphrase of the topic; no text of the document is reproduced.",
  notes: [
    "Source (read 2026-10-09): Ministry document, copy obtained from zimsake.co.zw softidrive (https://www.zimsake.co.zw/softidrive/; the same Ministry documents are listed on the Mashonaland West provincial education office site, www.mopsemashwest.gov.zw), read through a pdftotext rendering. The document read is the TEACHER'S GUIDE, not the national syllabus: the cover prints 'Family and Religious Studies, Secondary School Level, Forms 1-4, 2015-2022, Teacher's Guide' (Curriculum Development Unit, copyright 2015; running header 'F.R.S Teacher's Guide 2017'). It gives the topic list, one scope and sequence sample (Religion, Family and Identity, Forms 1-4), one competency matrix sample (Topic 3: Judaism: definition and history), sample teachable units (Indigenous Religion: rites of passage, attire, sacred days; Religion and Education: role in nation building, establishment of educational institutions, negative impact on education) and the 30%/70% assessment split. The sub-topics of the other topics and all objectives here are OUR breakdown: a reviewer must check the tree against the national syllabus (competency matrix, Forms 1-4) and add form labels, which are only known for Topic 6.",
    "Topic numbering: the guide lists the topics without numbers; we number them 1-15 in the listed order (consistent with the matrix sample 'Topic 3: Judaism'). The guide's scope and sequence sample is headed 'TOPIC 1: Religion, SUB-TOPIC: Religion, Family and Identity', which suggests the syllabus may group content differently (e.g. broad topics with sub-topics); confirm the numbering against the syllabus.",
    "Subject code: not printed in the document; confirm the ZIMSEC O-Level Family and Religious Studies code (left null). The catalogue name 'Family and Religious Studies' matches the document title.",
    "Version dates: assumed first examined in November 2018 (effectiveFrom 2018-01-01), as for the other 2015-2022 files. ZIMSEC introduced Heritage-Based Curriculum syllabi under the 2024-2030 curriculum framework (and Heritage-Based Curriculum syllabi for Forms 5-6; 2024-2030 versions exist for some subjects): confirm which Family and Religious Studies syllabus November 2026 and later O-Level candidates sit, set effectiveTo and create a new version file when a new syllabus replaces this one.",
    "Assessment as read: 30% continuous assessment and 70% summative assessment (Forms 1-4); time allocation four 40-minute periods a week. The guide prints NO paper structure (number of papers, durations, marks, question types, choice). The two components here are OUR CONVENTION, to be checked against the syllabus assessment section and recent ZIMSEC papers: Paper 1 on the Religions topics (1-5) and Paper 2 on the Contemporary issues topics (6-15), each a written paper of structured essay questions worth 25 marks (parts (a) 15 and (b) 10), candidates answering four. Durations, marks and weightings are therefore left out of the components. Continuous assessment is not a component here and is not simulated.",
    "Approach (from the guide): multi-faith, learner-centred, non-proselytising and non-confessional; the religions are studied for their historical backgrounds, beliefs and practices, practitioners, rites and rituals, and their impact on the individual, family, community, nation and world; cross-cutting themes include gender, children's rights, HIV and AIDS, sexuality, child protection, human rights, disaster risk management, financial literacy and the environment. Content describes what adherents believe, cites scripture by book, chapter and verse (paraphrased) and treats every religion and denomination with equal respect.",
    "Overlaps: Religion and the Liberation Struggle overlaps history-o (hist.colonisation.first-chimurenga, hist.liberation.*); Religion, Family and Identity and parts of Indigenous Religion overlap heritage-studies-o (totems, ceremonies, marriage types, indigenous religious practices). This family keeps its own concepts focused on the religious dimension.",
  ],
  overview: "The ZIMSEC O-Level Family and Religious Studies syllabus (Forms 1-4) is a multi-faith, non-confessional study of religion in Zimbabwe. Learners study the concept of religion and the history, beliefs, practices, practitioners, rites and rituals of Indigenous Religion, Judaism, Christianity and Islam, and then apply religious teaching to contemporary issues: family and identity, education, gender roles, ethics, health and sexuality, disability, the natural environment, enterprise, the liberation struggle (Chimurenga/Umvukela), rights and social responsibility, and conflict management, with Unhu/Ubuntu/Vumunhu as a unifying value.",
  assessmentOverview: "Continuous assessment in Forms 1-4 carries 30% and the final examination 70%. The paper structure is not given in the document read; our working model has two written papers of structured essay questions: Paper 1 on the religions (topics 1-5) and Paper 2 on contemporary issues (topics 6-15).",
  components: [
    { code: "1", name: "Paper 1: Religions (structured essays)", kind: "WRITTEN", description: "Our working model (confirm): structured essay questions on the Concept of Religion, Indigenous Religion, Judaism, Christianity and Islam; candidates answer four questions of 25 marks." },
    { code: "2", name: "Paper 2: Contemporary issues (structured essays)", kind: "WRITTEN", description: "Our working model (confirm): structured essay questions on topics 6-15 (religion and family, education, gender, ethics and health, disability, environment, enterprise, the liberation struggle, rights and conflict); candidates answer four questions of 25 marks." },
  ],
  topics: [RELIGIONS, CONTEMPORARY],
};

// ---------------------------------------------------------------------------------------------------------------------
// Checks: every covered concept exists, each concept is covered exactly once (on a leaf node), node keys and
// objective codes are unique; report what the syllabus leaves out.
const seen = new Map();
const codes = new Set();
const keys = new Set();
let nodes = 0;
let topics = 0;
const walk = (list) => {
  for (const n of list) {
    nodes++;
    if (n.kind === "TOPIC") topics++;
    if (keys.has(n.key)) throw new Error(`duplicate node key ${n.key}`);
    keys.add(n.key);
    if ((n.covers ?? []).length && (n.children ?? []).length) throw new Error(`${n.key} covers concepts and has children (cover on the most specific node)`);
    for (const c of n.covers ?? []) {
      if (!CONCEPT_KEYS.has(c)) throw new Error(`unknown concept ${c} on ${n.key}`);
      if (seen.has(c)) throw new Error(`${c} covered on ${seen.get(c)} and ${n.key}`);
      seen.set(c, n.key);
    }
    for (const o of n.objectives ?? []) {
      if (codes.has(o.code)) throw new Error(`duplicate objective code ${o.code}`);
      codes.add(o.code);
    }
    walk(n.children ?? []);
  }
};
walk(zimsec.topics);
const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
console.log(`zimsec/o-level/religious-studies/2015-2022: ${topics} topics, ${nodes} nodes, ${seen.size} concepts covered, ${codes.size} objectives; not covered (${missing.length}): ${missing.join(", ") || "none"}`);
if (missing.length) throw new Error(`concepts no syllabus covers: ${missing.join(", ")}`);
const perTopic = zimsec.topics.flatMap((s) => s.children).map((t) => `${t.code} ${t.key}: ${t.children.length}`);
console.log(`concepts per topic: ${perTopic.join("; ")}`);
console.log(`${CONCEPTS.length} concepts in the registry`);

const registry = {
  family: "religious-studies-o",
  name: "Family and Religious Studies (O-Level)",
  level: "O",
  prefix: "frs",
  subjects: ["zimsec/o-level/religious-studies"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description })),
};

const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/religious-studies-o.json", registry);
write("content/syllabi/zimsec/o-level/religious-studies/2015-2022.json", zimsec);
