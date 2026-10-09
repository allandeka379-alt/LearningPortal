// Builds content/concepts/history-o.json and the two History syllabus files:
//   content/syllabi/zimsec/o-level/history/2015-2022.json
//   content/syllabi/cambridge/igcse/history/2027-2028.json   (Cambridge IGCSE History 0470)
// Sources (local only, not in git): .scratch/history/sources/zimsec-history.pdf (+ .txt, Ministry file
// "History Syllabus.pdf") and 0470-2027-2028.pdf (+ .txt).
// The concept registry lives in ./concepts.mjs.
// Run from the repo root: node .scratch/history/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";
import { CONCEPTS } from "./concepts.mjs";

const ROOT = process.cwd();
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept key in concepts.mjs");
for (const [k] of CONCEPTS) if (!/^hist\.[a-z0-9-]+\.[a-z0-9-]+$/.test(k)) throw new Error(`bad concept key ${k}`);

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. Objectives are our own paraphrase; their codes are node code + .n (ours on both boards).
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, optional, optionGroup, children } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) n.objectives = objectives.map((o, i) => (Array.isArray(o) ? { code: o[0], text: o[1] } : { code: `${code}.${i + 1}`, text: o }));
  if (components) n.components = components;
  if (optional) n.optional = true;
  if (optionGroup) n.optionGroup = optionGroup;
  if (children) n.children = children;
  return n;
};
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);

// ---------------------------------------------------------------------------------------------------------------------
// ZIMSEC O-Level History, Forms 1-4, 2015-2022. Topic numbers 1-15 are the topic list (5.0); sub-topics follow the
// competency matrix (7.0, Forms 1-4) and the scope and sequence (6.0); sub-topic and objective codes are ours.
const P1 = ["1"];
const P2 = ["2"];
const ZIMSEC_TOPICS = [
  topic("conceptualisation", "1", "Conceptualisation of History", {
    components: P1,
    children: [
      sub("conceptualisation.introduction", "1.1", "Introduction to History, types and sources of History", {
        description: "Form 1 (Introduction to History, Sources of History, Types of History).",
        covers: ["hist.intro.history-and-sources"],
        objectives: [
          "Form 1: define history and explain why it is studied.",
          "Form 1: identify and describe the types of history (social, political, economic, local).",
          "Form 1: list and describe the sources of history and explain the advantages and disadvantages of each.",
        ],
      }),
      sub("conceptualisation.analysing-sources", "1.2", "Analysing sources of History", {
        description: "Form 3 (Sources of History: archaeology, written evidence, oral tradition); also the skill tested by the source-based question in Paper 1.",
        covers: ["hist.skills.source-evaluation"],
        objectives: [
          "Form 3: analyse archaeological, written and oral sources of history.",
          "Analyse and evaluate historical evidence, points of view and value judgements, and detect bias (assessment objective 8.1).",
        ],
      }),
    ],
  }),
  topic("origins", "2", "Origins of Humankind", {
    description: "Form 1: theories on the origins of humankind, Charles Darwin and human evolution, Africa the cradle of humankind. Not named in either paper's specification grid (see notes).",
    covers: ["hist.origins.humankind"],
    objectives: [
      "Form 1: identify and describe the major theories on the origins of humankind.",
      "Form 1: explain Darwin's theory of evolution and identify the stages of human development.",
      "Form 1: identify sites in Africa where remains of early humans were found and explain why Africa is regarded as the cradle of humankind.",
    ],
  }),
  topic("egypt", "3", "Ancient Civilisation in Africa: Egypt", {
    description: "Form 1: ancient civilisation in Egypt; Egyptian science, religion, writing and architecture; Egyptian agriculture; the spread of Egyptian civilisation. Not named in either paper's specification grid (see notes).",
    covers: ["hist.egypt.civilisation"],
    objectives: [
      "Form 1: define ancient civilisation, locate ancient Egypt and describe its civilisation.",
      "Form 1: describe the development of Egyptian science, religion, writing and architecture.",
      "Form 1: describe the characteristics of Egyptian agriculture and irrigation.",
      "Form 1: state the forms of Egyptian civilisation adopted elsewhere and explain its impact on other parts of the world.",
    ],
  }),
  topic("zimbabwean-societies", "4", "Development of Zimbabwean Societies", {
    components: P1,
    children: [
      sub("zimbabwean-societies.stone-iron-age", "4.1", "Early societies from the Stone Age to the Early Iron Age", {
        description: "Form 1.",
        covers: ["hist.precolonial.stone-iron-age"],
        objectives: [
          "Form 1: identify the tools of the Stone Age and the Early Iron Age.",
          "Form 1: describe the political, social and economic activities of Stone Age and Iron Age societies and explain the changes between them.",
        ],
      }),
      sub("zimbabwean-societies.great-zimbabwe", "4.2", "Mapungubwe and the Great Zimbabwe state", {
        description: "Form 1 (state formation) and Form 3 (formation of the states: Mapungubwe, Great Zimbabwe).",
        covers: ["hist.precolonial.great-zimbabwe"],
        objectives: [
          "Form 1 and Form 3: locate the state and describe the factors that led to its rise.",
          "Form 1 and Form 3: describe its political, economic, social and religious organisation.",
          "Form 3: explain the factors that led to its decline.",
        ],
      }),
      sub("zimbabwean-societies.mutapa", "4.3", "The Mutapa state", {
        description: "Forms 1 and 3.",
        covers: ["hist.precolonial.mutapa"],
        objectives: [
          "Form 1 and Form 3: locate the Mutapa state and describe the factors that led to its rise.",
          "Form 1 and Form 3: describe its political, economic, social and religious organisation and explain its decline.",
        ],
      }),
      sub("zimbabwean-societies.rozvi", "4.4", "The Rozvi state", {
        description: "Forms 1 and 3.",
        covers: ["hist.precolonial.rozvi"],
        objectives: [
          "Form 1 and Form 3: describe the rise of the Rozvi state and its political, economic, social and religious organisation.",
          "Form 3: explain the factors that led to the decline of the Rozvi state.",
        ],
      }),
      sub("zimbabwean-societies.mfecane-zulu", "4.5", "The Mfecane and the Zulu state", {
        description: "Form 1 (Zulu state) and Form 3 (Nguni migrations: Mfecane, formation of the Zulu state, Tshaka's military reforms).",
        covers: ["hist.precolonial.mfecane-zulu"],
        objectives: [
          "Form 3: define the Mfecane and outline its causes.",
          "Form 3: describe the factors that led to the formation of the Zulu state and explain Shaka's military reforms.",
          "Form 1 and Form 3: describe the political, economic and social organisation of the Zulu state and analyse its decline.",
        ],
      }),
      sub("zimbabwean-societies.ndebele", "4.6", "The Ndebele state", {
        description: "Forms 1 and 3.",
        covers: ["hist.precolonial.ndebele-state"],
        objectives: [
          "Form 1 and Form 3: describe the factors that led to the formation of the Ndebele state.",
          "Form 1 and Form 3: describe its political, economic and social organisation and analyse its decline.",
        ],
      }),
    ],
  }),
  topic("slavery", "5", "Slavery and the Slave Trade", {
    components: P2,
    children: [
      sub("slavery.forms-causes", "5.1", "Forms of slavery and the slave trade in Africa", {
        description: "Form 1 (forms of slavery, causes of the slave trade) and Form 3 (slave trade in Africa, methods).",
        covers: ["hist.slavery.forms-causes"],
        objectives: [
          "Form 1: identify and describe the different forms of slavery.",
          "Form 1 and Form 3: outline the economic, social and political causes of the slave trade in Africa.",
          "Form 3: explain the methods used to obtain slaves in Africa.",
        ],
      }),
      sub("slavery.triangular", "5.2", "The triangular slave trade", {
        description: "Form 1.",
        covers: ["hist.slavery.atlantic-trade"],
        objectives: ["Form 1: list the areas involved in the triangular slave trade, state the goods exchanged and describe its routes."],
      }),
      sub("slavery.effects-abolition", "5.3", "Impact and abolition of slavery and the slave trade", {
        description: "Form 3.",
        covers: ["hist.slavery.effects-abolition"],
        objectives: [
          "Form 3: describe the negative and positive effects of slavery and the slave trade on the African continent.",
          "Form 3: identify the groups that campaigned for abolition, describe the reasons for abolition and examine the challenges of ending the trade.",
        ],
      }),
    ],
  }),
  topic("european-contacts", "6", "Early European Contacts with Zimbabwe: Portuguese and Missionaries", {
    components: P1,
    children: [
      sub("european-contacts.portuguese", "6.1", "The Portuguese in the Zambezi valley and the prazo system", {
        description: "Form 1 (the Portuguese prazo system in the Zambezi valley) and Form 3 (Portuguese activities in the Zambezi valley).",
        covers: ["hist.contact.portuguese-prazos"],
        objectives: [
          "Form 3: give reasons for Portuguese penetration of the Zambezi valley, describe their activities and explain their relationship with Africans.",
          "Form 1: describe the prazo system and the prazeros and explain its impact on Africans.",
        ],
      }),
      sub("european-contacts.missionaries", "6.2", "Early missionary activities and European agents of colonisation", {
        description: "Form 1 and Form 3 (early missionary activities; European agents of colonisation).",
        covers: ["hist.contact.missionaries-agents"],
        objectives: [
          "Form 1 and Form 3: identify early missionary groups and their areas of operation and describe their activities.",
          "Form 1 and Form 3: explain the challenges faced by missionaries and analyse the impact of their activities.",
          "Form 3: identify European agents of colonisation and assess their role in colonisation.",
        ],
      }),
    ],
  }),
  topic("colonisation", "7", "Colonisation", {
    components: P1,
    children: [
      sub("colonisation.scramble-berlin", "7.1", "The Scramble and Partition of southern Africa and the Berlin Conference (1884-1885)", {
        description: "Forms 2 and 3.",
        covers: ["hist.colonisation.scramble-berlin"],
        objectives: [
          "Form 2 and Form 3: name the countries involved in the scramble for southern Africa and describe its causes.",
          "Form 2 and Form 3: state why the Berlin Conference was called, name the countries that attended and describe its resolutions.",
          "Form 3: explain the effects of the scramble and partition of southern Africa.",
        ],
      }),
      sub("colonisation.zimbabwe", "7.2", "The colonisation of Zimbabwe", {
        description: "Forms 2 and 3 (treaties and concessions, the Royal Charter, the BSAC, invasion and occupation).",
        covers: ["hist.colonisation.occupation"],
        objectives: [
          "Form 2 and Form 3: identify the countries involved in the scramble for Zimbabwe and describe the reasons for its colonisation.",
          "Form 2 and Form 3: explain the colonisation process: treaties and concessions, the Royal Charter, the BSAC and the occupation.",
        ],
      }),
      sub("colonisation.anglo-ndebele-war", "7.3", "The Anglo-Ndebele War (1893-1894)", {
        description: "Forms 2 and 3.",
        covers: ["hist.colonisation.anglo-ndebele-war"],
        objectives: ["Form 2 and Form 3: state the causes, describe the course and analyse the results of the Anglo-Ndebele War."],
      }),
      sub("colonisation.first-chimurenga", "7.4", "The First Chimurenga/Umvukela (1896-1897)", {
        description: "Forms 2 and 3.",
        covers: ["hist.colonisation.first-chimurenga"],
        objectives: [
          "Form 2 and Form 3: outline the causes and describe the course of the First Chimurenga/Umvukela.",
          "Form 2 and Form 3: examine the role of chiefs and spirit mediums and analyse the results.",
        ],
      }),
    ],
  }),
  topic("colonial-administration", "8", "Colonial Administration in Rhodesia", {
    components: P1,
    children: [
      sub("colonial-administration.company-rule", "8.1", "Company rule", {
        description: "Forms 2 and 3.",
        covers: ["hist.colonial.company-rule"],
        objectives: [
          "Form 2: describe Company rule and outline the political, economic and social policies of the BSAC.",
          "Form 3: analyse the factors that led to the end of Company rule.",
        ],
      }),
      sub("colonial-administration.responsible-government", "8.2", "Responsible Government", {
        description: "Forms 2 and 3.",
        covers: ["hist.colonial.responsible-government"],
        objectives: [
          "Form 2 and Form 3: describe Responsible Government and outline the reasons for its establishment.",
          "Form 2 and Form 3: explain its policies and assess their impact on the indigenous people.",
        ],
      }),
      sub("colonial-administration.federation", "8.3", "The Federation of Rhodesia and Nyasaland", {
        description: "Forms 2 and 3.",
        covers: ["hist.colonial.federation"],
        objectives: [
          "Form 2 and Form 3: outline the reasons for the Federation and trace the steps towards its formation.",
          "Form 2 and Form 3: describe its policies and developments and explain its successes and failures.",
          "Form 2 and Form 3: explain the factors that led to its collapse.",
        ],
      }),
      sub("colonial-administration.udi", "8.4", "The Unilateral Declaration of Independence (UDI)", {
        description: "Forms 2 and 3.",
        covers: ["hist.colonial.udi"],
        objectives: [
          "Form 2 and Form 3: outline the reasons for UDI.",
          "Form 2 and Form 3: describe and analyse the policies and developments during UDI and assess their impact on the indigenous people.",
        ],
      }),
    ],
  }),
  topic("nationalism", "9", "Nationalism", {
    description: "Form 2: Pan-Africanist movements and the rise of mass nationalism. Not named in either paper's specification grid (see notes); mass nationalism in Zimbabwe is taught under topic 10.",
    covers: ["hist.nationalism.pan-africanism"],
    objectives: [
      "Form 2: define Pan-Africanism, describe the reasons for its rise and explain the roles of W. E. B. Du Bois and Marcus Garvey.",
      "Form 2: define mass nationalism and outline the factors that led to its rise in Africa.",
    ],
  }),
  topic("armed-struggle", "10", "The Armed Struggle", {
    components: P1,
    children: [
      sub("armed-struggle.nationalist-movements", "10.1", "Mass nationalism and nationalist movements, 1957-1964", {
        description: "Form 2 (mass nationalism 1957-1967 as printed in the matrix; 1957-1966 in the scope and sequence) and Form 3 (nationalist movements).",
        covers: ["hist.liberation.nationalist-movements"],
        objectives: [
          "Form 2: identify the mass nationalist movements of the period and describe their aims and activities.",
          "Form 3: describe the political activities of the nationalist movements and explain the challenges they faced.",
        ],
      }),
      sub("armed-struggle.early-phase", "10.2", "The turn to armed struggle, recruitment and training, and the early phase", {
        description: "Form 2 (early recruitment and training of freedom fighters; the early phase) and Form 3 (causes of the armed struggle).",
        covers: ["hist.liberation.early-armed-struggle"],
        objectives: [
          "Form 2 and Form 3: explain the causes of the armed struggle and the move from peaceful politics to armed struggle.",
          "Form 2: identify the countries where freedom fighters trained and describe the recruitment strategies of the political parties.",
          "Form 2: identify and describe the early battles and explain the failure of the early phase.",
        ],
      }),
      sub("armed-struggle.second-phase", "10.3", "The second phase of the armed struggle", {
        description: "Forms 2 and 3 (main events; role of the masses, chiefs, spirit mediums, war collaborators, churches and international organisations).",
        covers: ["hist.liberation.second-phase"],
        objectives: [
          "Form 2 and Form 3: describe the main events of the second phase of the liberation struggle.",
          "Form 2 and Form 3: outline the role of the masses, chiefs, spirit mediums, war collaborators and churches.",
          "Form 2 and Form 3: explain the role of external support and other countries in the armed struggle.",
        ],
      }),
      sub("armed-struggle.settlement", "10.4", "Attempts at a peaceful settlement", {
        description: "Forms 2 and 3 (peace talks, the internal settlement, the Geneva talks, the Lancaster House settlement).",
        covers: ["hist.liberation.peace-settlement"],
        objectives: ["Form 2 and Form 3: explain and analyse the attempts to end the war by peaceful means, including the internal settlement, the Geneva talks and the Lancaster House settlement."],
      }),
    ],
  }),
  topic("post-independence", "11", "Post-Independence Developments in Zimbabwe", {
    components: ["1", "2"],
    children: [
      sub("post-independence.reconciliation", "11.1", "Independence and the policy of reconciliation", {
        description: "Form 2.",
        covers: ["hist.independence.reconciliation"],
        objectives: ["Form 2: describe the events leading to independence and explain the policy of reconciliation."],
      }),
      sub("post-independence.policies", "11.2", "Social, political and economic policies since independence", {
        description: "Form 2 (policies 1980-1990) and Form 4 (developments since independence).",
        covers: ["hist.independence.policies"],
        objectives: [
          "Form 2: describe and explain the economic, political and social policies and developments since independence.",
          "Form 4: assess the economic, political and social developments in Zimbabwe.",
        ],
      }),
      sub("post-independence.land-reform", "11.3", "Land reform and indigenisation", {
        description: "Form 4.",
        covers: ["hist.independence.land-reform-indigenisation"],
        objectives: [
          "Form 4: describe the reasons for the land reform programme and assess the role of the Constitution in the redistribution of land.",
          "Form 4: describe indigenisation policies in Zimbabwe and explain the reaction of Western countries to land reform.",
        ],
      }),
    ],
  }),
  topic("world-wars", "12", "World Wars and the Inter-War Period", {
    description: "Form 4. The topic list prints 'World Wars'; the scope and sequence 'World Wars and the Inter-war Period'.",
    components: P2,
    children: [
      sub("world-wars.first-world-war", "12.1", "The First World War (1914-1918)", {
        covers: ["hist.ww1-origins.alliances-arms-race", "hist.ww1-origins.colonial-balkans", "hist.ww1-origins.july-crisis", "hist.ww1.course-results"],
        objectives: [
          "Form 4: explain the causes of the First World War.",
          "Form 4: describe the events of the First World War and examine its consequences.",
        ],
      }),
      sub("world-wars.paris-peace", "12.2", "The Paris Peace Conference", {
        description: "In the matrix under the First World War sub-topic; a separate node here.",
        covers: ["hist.versailles.peacemaking", "hist.versailles.terms-impact"],
        objectives: ["Form 4: explain the provisions of the Paris Peace Conference."],
      }),
      sub("world-wars.league", "12.3", "The League of Nations", {
        covers: ["hist.league.organisation", "hist.league.1920s", "hist.league.1930s"],
        objectives: [
          "Form 4: describe the aims and outline the structure and functions of the organs of the League of Nations.",
          "Form 4: evaluate the work of the League up to 1939 and explain the reasons for its collapse.",
        ],
      }),
      sub("world-wars.dictators", "12.4", "The rise of European dictators", {
        covers: ["hist.dictators.fascism-mussolini", "hist.germany.nazi-rise", "hist.germany.nazi-control", "hist.road-to-war.hitler-aims-1933-36", "hist.road-to-war.anschluss-munich"],
        objectives: [
          "Form 4: explain the concepts of fascism and Nazism.",
          "Form 4: outline the inter-war problems that led to dictatorship in Italy and Germany.",
          "Form 4: describe the domestic and foreign policies of Mussolini and Hitler.",
        ],
      }),
      sub("world-wars.second-world-war", "12.5", "The Second World War (1939-1945)", {
        covers: ["hist.road-to-war.outbreak-1939", "hist.ww2.course-results"],
        objectives: [
          "Form 4: explain the causes of the Second World War.",
          "Form 4: describe the events of the Second World War and evaluate its results.",
        ],
      }),
      sub("world-wars.cold-war", "12.6", "The Cold War", {
        covers: ["hist.cold-war.breakdown-1945", "hist.cold-war.eastern-europe-1948", "hist.cold-war.berlin-blockade", "hist.cold-war.manifestations-impact"],
        objectives: [
          "Form 4: explain the concept of the Cold War and trace its origins.",
          "Form 4: describe the manifestations of the Cold War and evaluate its impact on the world.",
        ],
      }),
    ],
  }),
  topic("cooperation", "13", "Regional and International Co-operation", {
    description: "Form 2 (Frontline States, SADC, OAU/AU, the Commonwealth, the Non-Aligned Movement) and Form 4 ('International co-operation': the United Nations; Zimbabwe and the international community).",
    components: P2,
    children: [
      sub("cooperation.frontline-states", "13.1", "The Frontline States", {
        description: "Form 2.",
        covers: ["hist.cooperation.frontline-states"],
        objectives: ["Form 2: list the Frontline States, outline their aims and describe their role in the liberation of Zimbabwe."],
      }),
      sub("cooperation.sadc", "13.2", "SADC", {
        description: "Form 2.",
        covers: ["hist.cooperation.sadc"],
        objectives: [
          "Form 2: list the members of SADC and outline its aims.",
          "Form 2: describe the role of SADC in the socio-economic development of the region and explain its successes and failures.",
        ],
      }),
      sub("cooperation.oau-au", "13.3", "The OAU/AU", {
        description: "Form 2.",
        covers: ["hist.cooperation.oau-au"],
        objectives: [
          "Form 2: describe the origins and state the aims of the OAU/AU.",
          "Form 2: describe the functions of the organs of the OAU/AU and assess its successes and failures.",
        ],
      }),
      sub("cooperation.commonwealth-nam", "13.4", "The Commonwealth and the Non-Aligned Movement", {
        description: "Form 2: two sub-topics of the matrix taught together here.",
        covers: ["hist.cooperation.commonwealth-nam"],
        objectives: [
          "Form 2: describe the origins and aims of the Commonwealth, explain the functions of its organs and assess its activities.",
          "Form 2: outline the origins and aims of the Non-Aligned Movement and describe its activities.",
        ],
      }),
      sub("cooperation.united-nations", "13.5", "The United Nations", {
        description: "Form 4.",
        covers: ["hist.cooperation.united-nations"],
        objectives: [
          "Form 4: describe the formation and aims of the United Nations and outline its structure.",
          "Form 4: assess the effectiveness of the United Nations and examine its role in promoting and protecting human rights.",
        ],
      }),
      sub("cooperation.zimbabwe-foreign-policy", "13.6", "Zimbabwe and the international community (foreign policy) since independence", {
        description: "Form 4 (the scope and sequence places it under this topic; the specification grid gives Post-independence developments a share of Paper 2).",
        covers: ["hist.independence.foreign-policy"],
        objectives: [
          "Form 4: describe Zimbabwe's relations with China and the European Union and explain the reasons for the Look East Policy.",
          "Form 4: describe Zimbabwe's peacekeeping and peacemaking policy since independence.",
        ],
      }),
    ],
  }),
  topic("socialism", "14", "Socialism and Communism", {
    components: P2,
    children: [
      sub("socialism.russia", "14.1", "The Russian Revolution", {
        description: "Form 2 (causes, stages since 1905, policies of Lenin and Stalin) and Form 4 (the February and October 1917 revolutions, Lenin, Bolshevik rule, Stalin's domestic policy).",
        covers: ["hist.russia.tsarist-1905", "hist.russia.revolutions-1917", "hist.russia.civil-war-nep", "hist.russia.stalin-power", "hist.russia.stalin-economy"],
        objectives: [
          "Form 2: outline the causes of the Russian Revolution and trace its stages since 1905.",
          "Form 4: explain the causes and assess the course and results of the revolutions of February and October 1917, and outline the role of Lenin.",
          "Form 2 and Form 4: describe Bolshevik rule (the Civil War and the New Economic Policy) and the domestic policies of Stalin.",
        ],
      }),
      sub("socialism.china", "14.2", "The Chinese Revolution", {
        description: "Forms 2 and 4.",
        covers: ["hist.china.revolution", "hist.china.mao"],
        objectives: [
          "Form 2 and Form 4: identify the causes of the Chinese Revolution and describe the struggle between the Communists and the Nationalists.",
          "Form 4: explain how the Communists won the support of the peasants and describe the peasants' role in the revolution.",
          "Form 2 and Form 4: evaluate how the Communists dealt with China's political, social and economic problems under Mao Zedong, 1949-1976.",
        ],
      }),
      sub("socialism.cuba", "14.3", "The Cuban Revolution", {
        description: "Forms 2 and 4.",
        covers: ["hist.cuba.revolution", "hist.containment.cuba"],
        objectives: [
          "Form 2 and Form 4: describe the nature of the Batista regime and outline the stages of the Cuban Revolution, including Fidel Castro and the 26th of July Movement.",
          "Form 2 and Form 4: describe the results of the Cuban Revolution on the world.",
        ],
      }),
    ],
  }),
  topic("constitution", "15", "The Constitution of Zimbabwe, Democracy and Human Rights", {
    components: P1,
    children: [
      sub("constitution.constitution", "15.1", "The Constitution of Zimbabwe", {
        description: "Forms 2 and 4.",
        covers: ["hist.constitution.zimbabwe"],
        objectives: [
          "Form 2 and Form 4: define a constitution and explain the functions of the Constitution of Zimbabwe.",
          "Form 2 and Form 4: outline the provisions of the Constitution on citizenship and human rights.",
          "Form 4: describe the functions of the executive, the legislature and the judiciary.",
        ],
      }),
      sub("constitution.democracy", "15.2", "Democracy", {
        description: "Form 4.",
        covers: ["hist.constitution.democracy"],
        objectives: ["Form 4: describe the principles and types of democracy and explain how the government has promoted democracy in Zimbabwe."],
      }),
      sub("constitution.human-rights", "15.3", "Human rights, children's rights and responsibilities", {
        description: "Form 2 (children's rights and responsibilities) and Form 4 (human rights, children's rights and responsibilities).",
        covers: ["hist.constitution.human-rights"],
        objectives: [
          "Form 4: outline human rights and children's rights in the Universal Declaration of Human Rights and the Constitution of Zimbabwe.",
          "Form 2: describe the rights of children in the Constitution and outline the limitations on some rights.",
          "Form 4: assess the government's efforts to promote human and children's rights.",
        ],
      }),
    ],
  }),
];

const zimsec = {
  board: "zimsec",
  qualification: "o-level",
  subject: "history",
  versionLabel: "2015-2022",
  family: "history-o",
  title: "ZIMSEC O-Level History",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "History Syllabus, Forms 1 - 4, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at O Level",
    url: "https://www.mopsemashwest.gov.zw/files/History%20Syllabus.pdf",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Topic names and their numbers (1 to 15) are transcribed from the topic list (5.0) of the Ministry's History Syllabus Forms 1 - 4 (2015 - 2022); the content of each topic and the form in which it is taught come from the scope and sequence (6.0) and the competency matrix (7.0). Sub-topic and objective codes are ours, and sub-topics that the matrix lists separately in different forms are merged into one node. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-08): the Mashonaland West provincial education office's copy of the Ministry document, file 'History Syllabus.pdf' (http://www.mopsemashwest.gov.zw/files/History%20Syllabus.pdf; the site's https certificate has expired, so the https form of the URL recorded here may not load), read through a pdftotext rendering. The cover prints 'History Syllabus, Forms 1 - 4, 2015 - 2022' (Curriculum Development and Technical Services, 2015). The scope-and-sequence and competency-matrix tables come out of the text rendering with their columns scrambled; the form of each item is read from the matrix's Form 1 to Form 4 sections and cross-checked against the scope and sequence. Check every heading, the form of each item and each objective against a clean copy from ZIMSEC.",
    "Subject code: not printed in the syllabus document. ZIMSEC O-Level History is commonly cited as 2167 (an older code; the code under the 2015-2022 syllabus may differ, e.g. 4044); confirm it (code left null).",
    "Version dates: assumed first examined in November 2018 (effectiveFrom 2018-01-01), as for the other 2015-2022 files. Under the Heritage-Based Curriculum (2024-2030) new syllabi were issued; confirm which syllabus the November 2026 and later O-Level History examinations use, set effectiveTo, and create a new version file when a new syllabus replaces this one.",
    "Assessment (8.0) as read: continuous assessment 30% (theory tests, a practical test, assignments and project work over 12 terms, each task marked out of 100) and a summative examination 70%: Paper 1 History of Zimbabwe (structured questions, 2 hours, 100 marks, 35%) and Paper 2 Regional and International History (structured questions, 2 hours, 100 marks, 35%). Paper 1 has 22 questions (one source-based question and 21 structured questions on conceptualisation of history and Zimbabwe from pre-colonial times to after independence), of which candidates answer any four, 25 marks each. Paper 2 has 20 structured questions on regional and international history, of which candidates answer any four, 25 marks each. The marks of the parts of a question are not printed; our practice items use a part structure that a reviewer must check against recent papers. Continuous assessment is not a component here and is not simulated.",
    "Specification grids as read (scrambled; totals reconstructed): Paper 1 History of Zimbabwe: Conceptualisation of History 5%, Development of Zimbabwean Societies 10%, Early European Contacts (Missionaries and the Portuguese) 10%, Colonisation of Zimbabwe and Colonial Administration in Rhodesia 25%, the Armed Struggle 25%, Post-independence developments and the Constitution of Zimbabwe, Democracy and Human Rights 25%. Paper 2 Regional and International History: Slavery and the Slave Trade 5%, World Wars and the Inter-war Period 45%, Regional and International Co-operation 20%, Socialism and Communism 15%, Post-independence developments in Zimbabwe 15%. Skill weighting printed for Papers 1 and 2: knowledge and understanding 30, comprehension 20, application and analysis 20, synthesis and evaluation 15, practical skills 15 (percentages). Topic components follow these grids; Post-independence developments carries both papers (Paper 2 presumably for its foreign-policy and land-reform aspects; confirm).",
    "Topics 2 (Origins of Humankind), 3 (Ancient Civilisation in Africa: Egypt) and 9 (Nationalism: Pan-Africanism and the rise of mass nationalism) are in the topic list, the scope and sequence and the matrix (Forms 1 and 2) but in neither paper's specification grid; they carry no paper component here. Confirm whether ZIMSEC examines them (Egypt and Pan-Africanism would fit Paper 2; origins may be taught but not examined).",
    "Scope and sequence versus matrix: 'South Africa since 1848' appears in the Form 4 column of the scope and sequence (in the Colonial Administration row) but has no matrix entry, objectives or grid share; it is not in this tree and no content is written for it. 'Mass nationalism 1957-1966' (scope and sequence) is '1957 - 1967' in the matrix. The Form 4 matrix names its topics 'World Wars and the Inter-war Period', 'World Wars', 'Socialism and Communism', 'International Co-operation', 'Post-independence developments' and 'The Constitution of Zimbabwe, Democracy and Human Rights'; the foreign-policy sub-topic sits under International Co-operation (13.6 here). Mapungubwe is named only in the Form 3 matrix; the Torwa state is not named (taught with the Rozvi as background).",
    "The Russian Revolution topic is shared with Cambridge 0470 Depth study C (concepts hist.russia.*), and the causes of the First World War, the Paris peace settlement, the League of Nations, the rise of Hitler, the causes of the Second World War and the origins of the Cold War are shared with Cambridge Option B (and Option A for 1914). Lessons on these concepts are written to Cambridge depth; ZIMSEC candidates may use the overview concepts (hist.ww1.course-results, hist.ww2.course-results, hist.cold-war.manifestations-impact, hist.dictators.fascism-mussolini) for the parts Cambridge does not cover.",
    "Zimbabwean history after 1980 and the liberation war are taught with well-established, dated facts and balanced, non-partisan wording: aims, achievements, recognised problems and different views; no slogans and no statistics unless widely documented. The disturbances in Matabeleland and the Midlands in the 1980s (Gukurahundi) are acknowledged factually.",
  ],
  overview: "The ZIMSEC O-Level History syllabus (Forms 1-4) develops a historical view of Zimbabwe, Africa and the wider world. It starts with the nature and sources of history, human origins and ancient Egypt, then follows Zimbabwean societies from the Stone Age to the Great Zimbabwe, Mutapa, Rozvi and Ndebele states, the slave trade, early Portuguese and missionary contacts, colonisation and resistance, colonial administration, nationalism and the armed struggle, and developments since independence. Regional and international history covers the world wars and the inter-war period, the Cold War, socialist revolutions in Russia, China and Cuba, regional and international organisations, and the Constitution, democracy and human rights.",
  assessmentOverview: "Continuous assessment (tests, a practical test, assignments and a project over Forms 1-4) carries 30%. The examination carries 70%: Paper 1 History of Zimbabwe (2 hours, 100 marks, 35%) offers 22 structured questions, one of them source-based, and candidates answer any four (25 marks each); Paper 2 Regional and International History (2 hours, 100 marks, 35%) offers 20 structured questions, and candidates answer any four (25 marks each).",
  components: [
    { code: "1", name: "Paper 1: History of Zimbabwe", kind: "WRITTEN", description: "22 structured questions (one source-based) on the conceptualisation of history and Zimbabwe from pre-colonial times to after independence; candidates answer any four, 25 marks each.", durationMinutes: 120, maxMarks: 100, weightingPercent: 35 },
    { code: "2", name: "Paper 2: Regional and International History", kind: "WRITTEN", description: "20 structured questions on regional and international history; candidates answer any four, 25 marks each.", durationMinutes: 120, maxMarks: 100, weightingPercent: 35 },
  ],
  topics: ZIMSEC_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Cambridge IGCSE History 0470, 2027-2028. The syllabus prints no content numbers: options, key questions and depth
// studies are lettered/numbered as printed (Option A key questions 1-6, Depth study B key question 3(a)); node codes
// (A1, B4, DS-B3a) and objective codes (A1.1 = Option A, key question 1, focus point 1) are ours.
const CORE = ["1", "2"];
const DEPTH = ["1", "3", "4"];
const kq = (key, code, name, { covers, focus, content }) =>
  sub(key, code, name, { description: `Specified content: ${content}`, covers, objectives: focus });

const C0470_TOPICS = [
  topic("option-a", "A", "Core content Option A: The nineteenth century: the development of modern nation states, 1848-1914", {
    description: "Candidates study EITHER Option A OR Option B of the Core content (Paper 1 Section A and Paper 2).",
    components: CORE,
    optional: true,
    optionGroup: "core-content",
    children: [
      kq("option-a.revolutions-1848", "A1", "Were the revolutions of 1848 important?", {
        covers: ["hist.revolutions-1848.causes", "hist.revolutions-1848.events-outcomes"],
        content: "the nature of the 1848 revolutions and the influence of liberalism and nationalism; causes, events and results in France, Italy, Germany and the Austrian Empire; reasons for failure. (Italy and Germany in 1848 are taught with key questions 2 and 3.)",
        focus: [
          "Explain why liberalism and nationalism had grown in influence by 1848.",
          "Explain why so many revolutions broke out in 1848 and what they had in common.",
          "Explain why most of the revolutions failed.",
          "Assess what, if anything, the revolutions changed.",
        ],
      }),
      kq("option-a.italy", "A2", "How was Italy unified?", {
        covers: ["hist.italy.before-1850", "hist.italy.cavour", "hist.italy.garibaldi-completion"],
        content: "Austrian influence over Italy; Italian nationalism and Mazzini; events of 1848-49; Victor Emmanuel II and Cavour, Plombières and the war with Austria in 1859; Garibaldi and the invasion of Sicily and Naples; the Kingdom of Italy and the completion of unification by 1870.",
        focus: [
          "Explain why Italy was not unified in 1848-49.",
          "Assess how important Garibaldi's contribution was to unification.",
          "Assess whether Cavour helped or hindered unification.",
          "Explain how important moves towards Italian unification were for other European countries.",
        ],
      }),
      kq("option-a.germany", "A3", "How was Germany unified?", {
        covers: ["hist.german-unification.before-1851", "hist.german-unification.bismarck-austria", "hist.german-unification.bismarck-france"],
        content: "German nationalism; the Zollverein; the 1848 revolution in Prussia; the Frankfurt Parliament and its failure; Austrian influence restored by 1850; Bismarck as Minister-President and his foreign policy to 1871 (Schleswig-Holstein, the Austro-Prussian War, relations with France, the Spanish succession and the Franco-Prussian War, the German Empire).",
        focus: [
          "Explain why Germany was not unified in 1848-50.",
          "Explain how Bismarck brought about Austria's defeat in 1866.",
          "Explain how Bismarck brought about France's defeat in 1870.",
          "Assess how far Bismarck was responsible for German unification.",
        ],
      }),
      kq("option-a.us-civil-war", "A4", "Why was there a civil war in the United States and what were its results?", {
        covers: ["hist.us-civil-war.causes", "hist.us-civil-war.northern-victory", "hist.us-civil-war.reconstruction"],
        content: "causes and consequences of the American Civil War, 1820-77: differences between North and South; slavery, slave and free states, abolitionism; the 1860 election and secession; reasons for the North's victory; the role of Lincoln; Reconstruction and its success.",
        focus: [
          "Assess how far slavery caused the Civil War.",
          "Explain the significance of Lincoln's election as president.",
          "Explain why the North won the war.",
          "Assess whether the war changed anything.",
        ],
      }),
      kq("option-a.imperialism", "A5", "Why, and with what effects, did nations gain and expand their overseas empires in the nineteenth century?", {
        covers: ["hist.imperialism.motives", "hist.imperialism.french-british-africa", "hist.imperialism.belgian-congo", "hist.imperialism.india-1857", "hist.imperialism.us-empire"],
        content: "economic, military, geopolitical, religious and cultural motives; French assimilation and direct rule (Faidherbe and Senegal), British indirect rule (Lugard and Nigeria) and Belgian private imperialism (Leopold II and the Congo) and their impacts on Africans; the British in India and 1857; the wars of independence in the Philippines and Cuba, the Spanish-American War and the Treaty of Paris, the US debate on imperialism, the Philippines under American control, American intervention in Cuba to 1906.",
        focus: [
          "Explain the motives behind European and US imperialism.",
          "Assess how varied the impacts of European imperialism on Africans were.",
          "Explain why Indians resisted British rule and with what effects.",
          "Explain why, and with what effects, the United States gained former Spanish colonies.",
        ],
      }),
      kq("option-a.ww1-causes", "A6", "What caused the First World War?", {
        covers: ["hist.ww1-origins.alliances-arms-race", "hist.ww1-origins.colonial-balkans", "hist.ww1-origins.july-crisis"],
        content: "the origins of the war, 1890-1914: the alliance system and European diplomacy; the 1902 Anglo-Japanese Alliance; the arms race; colonial rivalries; developments in the Balkans; the crisis of June-July 1914 and the outbreak of war.",
        focus: [
          "Assess whether the alliance system and global diplomacy made war more or less likely.",
          "Assess how far colonial problems created tension between the Great Powers.",
          "Explain why problems in the Balkans were so hard for the Great Powers to solve.",
          "Explain how the assassination of Franz Ferdinand led to war.",
        ],
      }),
    ],
  }),
  topic("option-b", "B", "Core content Option B: The twentieth century: international relations since 1919", {
    description: "Candidates study EITHER Option A OR Option B of the Core content (Paper 1 Section A and Paper 2).",
    components: CORE,
    optional: true,
    optionGroup: "core-content",
    children: [
      kq("option-b.versailles", "B1", "Was the Treaty of Versailles fair?", {
        covers: ["hist.versailles.peacemaking", "hist.versailles.terms-impact"],
        content: "the roles of Wilson, Clemenceau and Lloyd George; the terms of the Treaty; its social, economic and political impact in Germany to the end of 1923; contemporary opinions about the Treaty.",
        focus: [
          "Describe the motives and aims of the Big Three at Versailles.",
          "Explain why the victors did not get everything they wanted.",
          "Explain the impact of the Treaty on Germany up to the end of 1923.",
          "Assess whether the Treaty could be justified at the time.",
        ],
      }),
      kq("option-b.league", "B2", "To what extent was the League of Nations a success?", {
        covers: ["hist.league.organisation", "hist.league.1920s", "hist.league.1930s"],
        content: "the League's structure, aims and membership; peacekeeping in the 1920s (Vilna 1920, the Aaland Islands 1920-21, Corfu 1923, Bulgaria 1925); humanitarian work (refugees, health, working conditions, slavery); the 1930s: causes, events and consequences of the Manchurian and Abyssinian crises.",
        focus: [
          "Assess how far weaknesses in the League's organisation and membership made failure inevitable.",
          "Assess how successful the League's peacekeeping was in the 1920s.",
          "Assess how important the League's humanitarian work was.",
          "Explain how far the Depression made the League's work more difficult in the 1930s.",
        ],
      }),
      kq("option-b.hitler-war", "B3", "How far was Hitler's foreign policy to blame for the outbreak of war in Europe in 1939?", {
        covers: ["hist.road-to-war.hitler-aims-1933-36", "hist.road-to-war.anschluss-munich", "hist.road-to-war.outbreak-1939"],
        content: "Hitler's foreign policy aims; rearmament; the Saar; the remilitarisation of the Rhineland; the Rome-Berlin Axis and the Anti-Comintern Pact; German and Italian involvement in the Spanish Civil War; the Anschluss; the Czechoslovakian crisis and the Munich Agreement; the Polish crisis and the outbreak of war.",
        focus: [
          "Explain the long-term consequences of the Treaty of Versailles.",
          "Explain the consequences of the League's failures in the 1930s.",
          "Assess whether appeasement was justified.",
          "Assess how important the Nazi-Soviet Pact was.",
          "Explain why Britain and France declared war on Germany in September 1939.",
        ],
      }),
      kq("option-b.cold-war", "B4", "Who was to blame for the Cold War?", {
        covers: ["hist.cold-war.breakdown-1945", "hist.cold-war.eastern-europe-1948", "hist.cold-war.berlin-blockade"],
        content: "the origins of the Cold War: the 1945 summit conferences and the breakdown of the US-Soviet alliance in 1945-46; Soviet expansion into Eastern Europe to 1948 and American reactions; the occupation of Germany and the Berlin Blockade; NATO and the Warsaw Pact.",
        focus: [
          "Explain why the US-Soviet alliance began to break down in 1945.",
          "Explain how the USSR had gained control of Eastern Europe by 1948.",
          "Explain how the United States reacted to Soviet expansion.",
          "Explain the consequences of the Berlin Blockade.",
          "Assess whether the United States or the USSR was more to blame for starting the Cold War.",
        ],
      }),
      kq("option-b.containment", "B5", "How effectively did the United States contain the spread of communism?", {
        covers: ["hist.containment.korea", "hist.containment.cuba", "hist.containment.vietnam"],
        content: "case studies: American reactions to North Korea's invasion of South Korea, UN involvement and the course of the war to 1953; American reactions to the Cuban Revolution, including the Missile Crisis and its aftermath; American involvement in Vietnam, including reasons, tactics and strategy, and reasons for withdrawal.",
        focus: [
          "Assess how effectively the United States contained communism in Korea, 1950-53.",
          "Assess how effectively the United States dealt with Cuba, 1959-62.",
          "Explain American involvement in Vietnam, 1955-75, and why the United States withdrew.",
        ],
      }),
      kq("option-b.eastern-europe", "B6", "How secure was the USSR's control over Eastern Europe, 1948-c.1989?", {
        covers: ["hist.soviet-control.hungary-czechoslovakia", "hist.soviet-control.berlin-wall", "hist.soviet-control.solidarity-gorbachev"],
        content: "resistance to Soviet power in Hungary (1956) and Czechoslovakia (1968); the Berlin Wall; Solidarity in Poland; Gorbachev and the collapse of Soviet control over Eastern Europe.",
        focus: [
          "Explain why there was opposition to Soviet control in Hungary in 1956 and Czechoslovakia in 1968, and how the USSR reacted.",
          "Compare events in Hungary in 1956 and in Czechoslovakia in 1968.",
          "Explain why the Berlin Wall was built in 1961.",
          "Explain the significance of Solidarity in Poland for the decline of Soviet influence.",
          "Assess how far Gorbachev was personally responsible for the collapse of Soviet control over Eastern Europe.",
        ],
      }),
    ],
  }),
  topic("depth-a", "DS-A", "Depth study A: The First World War, 1914-18", {
    description: "Candidates study at least one depth study (Paper 1 Section B; Component 3 or Paper 4).",
    components: DEPTH,
    optional: true,
    optionGroup: "depth-studies",
    children: [
      kq("depth-a.stalemate", "DS-A1", "Why was there stalemate on the Western Front?", {
        covers: ["hist.ww1.schlieffen-stalemate", "hist.ww1.trench-warfare"],
        content: "the Schlieffen Plan in practice (Belgium, the BEF, Russian mobilisation); Mons, the Marne, the race to the sea and the First Battle of Ypres; trenches and attrition; trench warfare; tanks, machine guns, aircraft and gas; Verdun and the Somme and Haig's leadership.",
        focus: [
          "Explain why the Schlieffen Plan failed.",
          "Explain why a defensive war had emerged by the end of 1914.",
          "Describe what living and fighting in the trenches was like.",
          "Assess how important new methods of warfare were.",
          "Explain the significance of the battles of Verdun and the Somme.",
        ],
      }),
      kq("depth-a.world-war", "DS-A2", "To what extent was it a world war?", {
        covers: ["hist.ww1.world-war"],
        content: "British Empire troops on the Western Front (Indian and Canadian case studies); the war in Africa (German East Africa, South West Africa); Japan in Asia (Tsingtao, sea lanes); the Arab Revolt.",
        focus: [
          "Assess the importance of British Empire troops on the Western Front.",
          "Describe the contribution of Indian and South African troops in Africa.",
          "Assess Japan's contribution to the Allied victory.",
          "Assess how important the Arab Revolt was.",
        ],
      }),
      kq("depth-a.other-fronts", "DS-A3", "How important were other fronts?", {
        covers: ["hist.ww1.other-fronts"],
        content: "the war at sea (Jutland, convoys, submarines and the U-boat campaign); the Gallipoli campaign; the Eastern Front and the defeat of Russia; the impact of war on civilians.",
        focus: [
          "Assess who won the war at sea.",
          "Explain why the Gallipoli campaign of 1915 failed.",
          "Assess how important the Eastern Front was.",
          "Explain the impact of the war on civilian populations.",
        ],
      }),
      kq("depth-a.armistice", "DS-A4", "Why did Germany ask for an armistice in 1918?", {
        covers: ["hist.ww1.end-1918"],
        content: "the German offensive of 1918 and the Allied advance; the impact of American entry; conditions in Germany (the Kiel mutiny, the German revolution, the Kaiser's abdication); the Armistice.",
        focus: [
          "Explain the importance of America's entry into the war.",
          "Explain why the German offensive of 1918 failed.",
          "Explain why revolution broke out in Germany in October 1918.",
          "Explain why the Armistice was signed.",
        ],
      }),
    ],
  }),
  topic("depth-b", "DS-B", "Depth study B: Germany, 1918-45", {
    description: "Candidates study at least one depth study (Paper 1 Section B; Component 3 or Paper 4).",
    components: DEPTH,
    optional: true,
    optionGroup: "depth-studies",
    children: [
      kq("depth-b.weimar", "DS-B1", "Was the Weimar Republic doomed from the start?", {
        covers: ["hist.germany.weimar-1918-23", "hist.germany.stresemann-era"],
        content: "the 1918 revolution and the Republic; the Versailles settlement and German reactions; the Weimar Constitution, political divisions and the army; political disorder 1919-23 (left and right, economic crisis and hyperinflation, the Ruhr); the Stresemann era (economic and foreign policy achievements); cultural achievements.",
        focus: [
          "Explain how Germany emerged from defeat at the end of the First World War.",
          "Explain the impact of the Treaty of Versailles on the Republic.",
          "Assess how far the Republic recovered after 1923.",
          "Describe the achievements of the Weimar period.",
        ],
      }),
      kq("depth-b.hitler-power", "DS-B2", "Why was Hitler able to dominate Germany by 1934?", {
        covers: ["hist.germany.nazi-rise"],
        content: "the early Nazi Party (ideas and methods, the Munich Putsch, the roles of Hitler and other leaders); the impact of the Depression (the crisis of 1930-33, reasons for the Nazi rise, Hitler takes power, the Reichstag Fire and the 1933 election). The consolidation of 1933-34 is taught with key question 3(a).",
        focus: [
          "Describe what the Nazi Party stood for in the 1920s.",
          "Explain why the Nazis had little success before 1930.",
          "Explain why Hitler was able to become Chancellor by 1933.",
          "Explain how Hitler consolidated his power in 1933-34.",
        ],
      }),
      kq("depth-b.nazi-control", "DS-B3a", "The Nazi regime: (a) How effectively did the Nazis control Germany, 1933-45?", {
        covers: ["hist.germany.nazi-control", "hist.germany.persecution"],
        content: "Nazi rule (the Enabling Act, the Night of the Long Knives, the death of Hindenburg, the removal of opposition, methods of control and repression, culture and the mass media); anti-Semitism and the persecution of minorities; opposition to Nazi rule; the Final Solution.",
        focus: [
          "Assess how much opposition there was to the Nazi regime.",
          "Explain how effectively the Nazis dealt with their political opponents.",
          "Explain how the Nazis used culture and the mass media to control the people.",
          "Explain why the Nazis persecuted many groups in German society.",
          "Assess whether Nazi Germany was a totalitarian state.",
        ],
      }),
      kq("depth-b.life", "DS-B3b", "The Nazi regime: (b) What was it like to live in Nazi Germany?", {
        covers: ["hist.germany.life-nazi"],
        content: "economic policy including rearmament; the experiences of women and young people; the impact of the Second World War on Germany (the war economy).",
        focus: [
          "Explain how young people reacted to the Nazi regime.",
          "Assess how successful Nazi policies towards women and the family were.",
          "Assess whether most people in Germany benefited from Nazi rule.",
          "Explain how the coming of war changed life in Nazi Germany.",
        ],
      }),
    ],
  }),
  topic("depth-c", "DS-C", "Depth study C: Russia, 1905-41", {
    description: "Candidates study at least one depth study (Paper 1 Section B; Component 3 or Paper 4).",
    components: DEPTH,
    optional: true,
    optionGroup: "depth-studies",
    children: [
      kq("depth-c.tsarist-collapse", "DS-C1", "Why did the Tsarist regime collapse in 1917?", {
        covers: ["hist.russia.tsarist-1905"],
        content: "the main features of Tsarist rule and Russian society before 1914 (the 1905 Revolution and its aftermath, attempts at reform); the First World War and its impact on the Russian people; the March Revolution of 1917 (taught with key question 2).",
        focus: [
          "Assess how well the Tsarist regime dealt with the difficulties of ruling Russia up to 1914.",
          "Explain how the Tsar survived the 1905 Revolution.",
          "Assess how far the Tsar was weakened by the First World War.",
          "Explain why the March 1917 revolution succeeded.",
        ],
      }),
      kq("depth-c.bolsheviks", "DS-C2", "How did the Bolsheviks gain power, and how did they consolidate their rule?", {
        covers: ["hist.russia.revolutions-1917", "hist.russia.civil-war-nep"],
        content: "the Provisional Government and the Soviets; reasons for its failure; the Bolshevik seizure of power and the role of Lenin; Bolshevik rule, the Civil War and War Communism; the Kronstadt Rising and the New Economic Policy.",
        focus: [
          "Assess how effectively the Provisional Government ruled Russia in 1917.",
          "Explain why the Bolsheviks were able to seize power in November 1917.",
          "Explain why the Bolsheviks won the Civil War.",
          "Assess how far the New Economic Policy was a success.",
        ],
      }),
      kq("depth-c.stalin-power", "DS-C3", "How did Stalin gain and hold on to power?", {
        covers: ["hist.russia.stalin-power"],
        content: "Lenin's death and the struggle for power; reasons for Stalin's emergence by 1928; Stalin's dictatorship (terror, the Purges, propaganda and official culture).",
        focus: [
          "Explain why Stalin, and not Trotsky, emerged as Lenin's successor.",
          "Explain why Stalin launched the Purges.",
          "Describe the methods Stalin used to control the Soviet Union.",
          "Assess how complete Stalin's control was by 1941.",
        ],
      }),
      kq("depth-c.stalin-economy", "DS-C4", "What was the impact of Stalin's economic policies?", {
        covers: ["hist.russia.stalin-economy"],
        content: "the modernisation of Soviet industry; the Five-Year Plans; collectivisation; life in the Soviet Union (social groups, ethnic minorities and women).",
        focus: [
          "Explain why Stalin introduced the Five-Year Plans and collectivisation.",
          "Assess how successful Stalin's economic changes were.",
          "Explain how the Soviet people were affected by these changes.",
        ],
      }),
    ],
  }),
  topic("depth-d", "DS-D", "Depth study D: The United States, 1919-41", {
    description: "Candidates study at least one depth study (Paper 1 Section B; Component 3 or Paper 4).",
    components: DEPTH,
    optional: true,
    optionGroup: "depth-studies",
    children: [
      kq("depth-d.boom", "DS-D1", "How far did the US economy boom in the 1920s?", {
        covers: ["hist.usa.boom"],
        content: "the expansion of the economy (government policies, mass production of cars and consumer goods, older industries, credit and hire purchase, the decline of agriculture); weaknesses in the economy by the late 1920s.",
        focus: [
          "Explain the factors on which the boom was based.",
          "Explain why some industries prospered while others did not.",
          "Explain why agriculture did not share in the prosperity.",
          "Assess whether all Americans benefited from the boom.",
        ],
      }),
      kq("depth-d.society", "DS-D2", "How far did US society change in the 1920s?", {
        covers: ["hist.usa.roaring-twenties", "hist.usa.intolerance"],
        content: "the 'Roaring Twenties'; film and other media; Prohibition and gangsterism; immigration restrictions, the Red Scare and religious intolerance; discrimination against Black Americans; the Ku Klux Klan; the changing roles of women.",
        focus: [
          "Describe the 'Roaring Twenties'.",
          "Assess how widespread intolerance was in US society.",
          "Explain why Prohibition was introduced and later repealed.",
          "Assess how far the roles of women changed during the 1920s.",
        ],
      }),
      kq("depth-d.crash", "DS-D3", "What were the causes and consequences of the Wall Street Crash?", {
        covers: ["hist.usa.crash-1932"],
        content: "the Wall Street Crash and its financial, economic and social effects; Hoover's reaction; the 1932 presidential election and the two candidates' programmes.",
        focus: [
          "Assess how far speculation was responsible for the Crash.",
          "Explain the impact of the Crash on the economy.",
          "Explain the social consequences of the Crash.",
          "Explain why Roosevelt won the 1932 election.",
        ],
      }),
      kq("depth-d.new-deal", "DS-D4", "How successful was the New Deal?", {
        covers: ["hist.usa.new-deal", "hist.usa.new-deal-assessment"],
        content: "Roosevelt's inauguration and the 'Hundred Days'; New Deal legislation, the 'alphabet agencies' and the changes they caused; opposition (Republicans, the rich, business, the Supreme Court, radical critics such as Huey Long); strengths and weaknesses in dealing with unemployment and the Depression.",
        focus: [
          "Describe the New Deal as introduced in 1933.",
          "Explain how far the character of the New Deal changed after 1933.",
          "Explain why the New Deal met opposition.",
          "Explain why unemployment persisted despite the New Deal.",
          "Assess whether the New Deal was a failure because it did not solve unemployment.",
        ],
      }),
    ],
  }),
  topic("depth-e", "DS-E", "Depth study E: The Second World War in Europe and the Asia-Pacific, 1939-c.1945", {
    description: "Candidates study at least one depth study (Paper 1 Section B; Component 3 or Paper 4).",
    components: DEPTH,
    optional: true,
    optionGroup: "depth-studies",
    children: [
      kq("depth-e.europe", "DS-E1", "How did the Second World War in Europe develop?", {
        covers: ["hist.ww2.europe-1939-43"],
        content: "the extent of German conquest in 1940 (the fall of France and Vichy, Dunkirk, Operation Sea Lion, the Battle of Britain); Operation Barbarossa and initial Nazi successes; defeat at Stalingrad and its impact.",
        focus: [
          "Assess to what extent Nazi Germany had gained control of Europe in 1940.",
          "Explain why Germany was unable to conquer Britain.",
          "Explain why Hitler invaded the Soviet Union in 1941.",
          "Explain why the Battle of Stalingrad was a turning point.",
        ],
      }),
      kq("depth-e.asia-pacific", "DS-E2", "How did the Second World War in the Asia-Pacific develop?", {
        covers: ["hist.ww2.asia-pacific"],
        content: "reasons for and consequences of the attack on Pearl Harbor; reasons for initial Japanese successes in Southeast Asia by early 1942 (case study: Malaya and Singapore); the Battle of Midway and its impact.",
        focus: [
          "Explain how US-Japanese relations deteriorated.",
          "Assess how successful the Japanese attack on Pearl Harbor was.",
          "Explain why the Japanese were successful in the early stages of the war.",
          "Explain why the Battle of Midway was a turning point.",
        ],
      }),
      kq("depth-e.civilians", "DS-E3", "What was the impact of war on civilian populations in Europe and the Asia-Pacific?", {
        covers: ["hist.ww2.civilians-resistance", "hist.ww2.occupied-poland-holocaust"],
        content: "the impact of bombing (the Blitz, Allied bombing of German cities); Japanese control (case study: Malaya and Singapore); Nazi control in occupied Europe (case study: Poland, including the circumstances leading to the Holocaust and its impact); resistance movements in Malaya and France.",
        focus: [
          "Explain the impact on civilians of the bombing of Britain (1940-41) and Germany (1943-45).",
          "Explain how Japanese control affected people's lives.",
          "Describe the experiences of civilians in Nazi-occupied Europe.",
          "Assess how effective resistance movements were in Europe and the Asia-Pacific.",
        ],
      }),
      kq("depth-e.victory", "DS-E4", "How did the Allies achieve victory over the Axis powers?", {
        covers: ["hist.ww2.victory-europe", "hist.ww2.victory-pacific"],
        content: "the invasion of Sicily and victory in Italy; the collapse and surrender of Germany in 1945 (D-Day and the advance to Germany, the Russian advance); the defeat of Japan (Guadalcanal and Okinawa, island-hopping, bombing, the atomic bomb); consolidation of victory (occupations of Germany and Japan, the Nuremberg and Tokyo trials).",
        focus: [
          "Explain the importance of the Allied advance through Italy.",
          "Explain why Nazi Germany was on the point of collapse by April 1945.",
          "Explain why the Allies achieved victory over Japan.",
          "Explain how the Allies consolidated their victories in Germany and Japan.",
        ],
      }),
    ],
  }),
  topic("skills", "AO3", "Historical skills: using sources as evidence", {
    description: "Not a content section of the syllabus: this node is ours, from assessment objective AO3 (understand, interpret, evaluate and use a range of sources as evidence in their historical context), which Paper 2 tests. The source skills it covers apply to whichever core option the candidate studies.",
    components: ["2"],
    covers: ["hist.skills.source-evaluation"],
    objectives: [
      "Understand and interpret sources, making inferences about their message and purpose.",
      "Evaluate the reliability and usefulness of sources in their historical context, and compare sources.",
      "Use a range of sources, with contextual knowledge, to reach a supported judgement.",
    ],
  }),
];

const c0470 = {
  board: "cambridge",
  qualification: "igcse",
  subject: "history",
  versionLabel: "2027-2028",
  family: "history-o",
  title: "Cambridge IGCSE History (0470)",
  code: "0470",
  effectiveFrom: "2027-01-01",
  effectiveTo: "2028-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge IGCSE History 0470 syllabus for 2027 and 2028 (version 1, published September 2024)",
    url: "https://www.cambridgeinternational.org/Images/721327-2027-2028-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Option, key question and depth study headings are transcribed from the subject content of the official syllabus with their printed letters and numbers (Option A key questions 1-6, Option B key questions 1-6, Depth studies A-E with key questions 1-4 and 3(a)/3(b) for Germany). The syllabus prints no content codes: node codes (A1, B4, DS-B3a) and objective codes (A1.1 = Option A, key question 1, first focus point) are ours. Objectives paraphrase the printed focus points and node descriptions summarise the specified content in our own words; the 'Historical skills' node is ours (from assessment objective AO3). No syllabus text is reproduced.",
  notes: [
    "Read 2026-10-08 from the official PDF (version 1, published September 2024, for exams in 2027 and 2028; June and November series, and March in India): content overview, assessment overview and objectives, the whole subject content, details of the assessment (including the prescribed topics for Paper 2) and the changes page ('no significant changes which affect teaching').",
    "This version is examined from 2027. A candidate sitting the examination in 2026 is examined on the previous syllabus (for 2024-2026), which is not in the repository; the syllabus states there are no significant changes affecting teaching, so the content here also serves 2026 candidates, but the prescribed Paper 2 topics differ by year.",
    "Optional structure: all candidates study EITHER Option A (the nineteenth century, 1848-1914) OR Option B (the twentieth century, international relations since 1919) of the Core content (option group 'core-content'), AND at least one of the five Depth studies A-E (option group 'depth-studies'). Coursework candidates may instead base Component 3 on a centre-devised depth study, which is not modelled.",
    "Assessment overview as read: all candidates take Paper 1 Structured Questions (2 hours, 60 marks, 40%: Section A has eight questions, four on Option A and four on Option B, two from key questions 1-3 and two from 4-6 in each option, answer any two; Section B has two questions on each depth study, answer one; every question is a structured essay in three parts (a), (b) and (c); AO1 and AO2) and Paper 2 Document Questions (1 hour 45 minutes, 40 marks, 30%: one question on the prescribed topic of Option A or of Option B, each with up to seven sources and five parts; AO1 and AO3), and EITHER Component 3 Coursework (40 marks, 30%: one piece of extended writing of up to 2,000 words on the significance of an individual, group, development or event, from a depth study; internally assessed, externally moderated) OR Paper 4 Alternative to Coursework (1 hour, 40 marks, 30%: two questions on each depth study, answer one; parts (a), an account (AO1), and (b), the importance of a person, organisation, development or event (AO2)). Grades A* to G. AO weightings: AO1 30%, AO2 45%, AO3 25% overall (Paper 1: 33/67/0; Paper 2: 20/0/80; Component 3 and Paper 4: 38/62/0).",
    "The marks of the parts are not printed in the syllabus. Our practice items assume Paper 1 (a) 4, (b) 6, (c) 10 (20 per question); Paper 2 five parts of 7, 8, 7, 8 and 10 marks; Paper 4 (a) 16 and (b) 24. A reviewer must check these against current specimen papers and mark schemes.",
    "Prescribed topics for Paper 2 as printed: 2027 Option A: How was Germany unified? (March, India), the overseas empires key question (June), the 1848 revolutions (November); Option B: Versailles (March, India), the USSR's control over Eastern Europe (June), Versailles (November). 2028 Option A: Italy (March, India and June), the causes of the First World War (November); Option B: the Cold War (March, India and November), Hitler's foreign policy (June).",
    "Command words printed: describe, discuss, explain; phrases such as 'How far do you agree...?' and 'Write an account...' may also be used.",
    "Shared with the ZIMSEC syllabus: the causes of the First World War (Option A key question 6), the Versailles settlement, the League, Hitler's foreign policy and the origins of the Cold War (Option B key questions 1-4), the Cuban Missile Crisis (key question 5), the rise and rule of the Nazis (Depth study B key questions 2 and 3(a)) and Russia (Depth study C). Concepts taught only for ZIMSEC (Zimbabwean, African and other world history) are not tagged to this syllabus. Component 3 Coursework is not simulated.",
  ],
  overview: "Cambridge IGCSE History studies world history in the nineteenth and twentieth centuries. Candidates take one Core content option: Option A, the development of modern nation states 1848-1914 (the 1848 revolutions, the unification of Italy and of Germany, the American Civil War, nineteenth-century imperialism and the causes of the First World War), or Option B, international relations since 1919 (the Treaty of Versailles, the League of Nations, the road to war in 1939, the origins of the Cold War, American containment in Korea, Cuba and Vietnam, and Soviet control of Eastern Europe). They also study at least one depth study: the First World War, Germany 1918-45, Russia 1905-41, the United States 1919-41, or the Second World War in Europe and the Asia-Pacific.",
  assessmentOverview: "All candidates take Paper 1 Structured Questions (2 hours, 60 marks, 40%: two core-content questions and one depth-study question, each in three parts) and Paper 2 Document Questions (1 hour 45 minutes, 40 marks, 30%: one question with up to seven sources on the prescribed topic of the candidate's option). They also take either Component 3 Coursework (an essay of up to 2,000 words, 40 marks, 30%) or Paper 4 Alternative to Coursework (1 hour, 40 marks, 30%: one two-part question on a depth study).",
  components: [
    { code: "1", name: "Paper 1: Structured Questions", kind: "WRITTEN", description: "Section A: eight questions on the Core content (four on Option A, four on Option B), answer two. Section B: two questions on each of the five depth studies, answer one. Each question is a structured essay in parts (a), (b) and (c).", durationMinutes: 120, maxMarks: 60, weightingPercent: 40 },
    { code: "2", name: "Paper 2: Document Questions", kind: "WRITTEN", description: "One question on the prescribed topic of Option A or of Option B (the topic changes each series), with up to seven sources and five parts.", durationMinutes: 105, maxMarks: 40, weightingPercent: 30 },
    { code: "3", name: "Component 3: Coursework", kind: "COURSEWORK", description: "One piece of extended writing of up to 2,000 words on the significance of an individual, group, organisation, development, place or event, from a syllabus or centre-devised depth study. Taken instead of Paper 4. Internally assessed, externally moderated.", maxMarks: 40, weightingPercent: 30 },
    { code: "4", name: "Paper 4: Alternative to Coursework", kind: "WRITTEN", description: "Two questions on each of the five depth studies; candidates answer one. Each question has part (a), an account, and part (b), on the importance of a person, organisation, development or event. Taken instead of Component 3.", durationMinutes: 60, maxMarks: 40, weightingPercent: 30 },
  ],
  topics: C0470_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Checks: every covered concept exists, each concept is covered at most once per syllabus (on the most specific node),
// every concept is covered by at least one syllabus, node keys and objective codes are unique; report what each
// syllabus leaves out.
const coveredBy = new Map();
for (const s of [zimsec, c0470]) {
  const seen = new Map();
  const codes = new Set();
  const keys = new Set();
  let nodes = 0;
  const walk = (list) => {
    for (const n of list) {
      nodes++;
      if (keys.has(n.key)) throw new Error(`${s.board}: duplicate node key ${n.key}`);
      keys.add(n.key);
      if ((n.covers ?? []).length && (n.children ?? []).length) throw new Error(`${s.board}: ${n.key} covers concepts and has children (cover on the most specific node)`);
      if (n.optionGroup && !n.optional) throw new Error(`${s.board}: ${n.key} has an optionGroup but is not optional`);
      for (const c of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: unknown concept ${c} on ${n.key}`);
        if (seen.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: ${c} covered on ${seen.get(c)} and ${n.key}`);
        seen.set(c, n.key);
        coveredBy.set(c, [...(coveredBy.get(c) ?? []), s.board]);
      }
      for (const o of n.objectives ?? []) {
        if (codes.has(o.code)) throw new Error(`${s.board}: duplicate objective code ${o.code}`);
        codes.add(o.code);
      }
      walk(n.children ?? []);
    }
  };
  walk(s.topics);
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${s.topics.length} topics, ${nodes} nodes, ${seen.size} concepts covered, ${codes.size} objectives; not covered (${missing.length}): ${missing.join(", ") || "none"}\n`);
}
const orphans = [...CONCEPT_KEYS].filter((k) => !coveredBy.has(k));
if (orphans.length) throw new Error(`concepts no syllabus covers: ${orphans.join(", ")}`);
// The descriptions must agree with the coverage ("ZIMSEC only" / "Cambridge only" / "Both boards").
for (const [k, , d] of CONCEPTS) {
  const boards = coveredBy.get(k);
  const label = boards.length === 2 ? "Both boards" : boards[0] === "zimsec" ? "ZIMSEC only" : "Cambridge only";
  if (!d.startsWith(label)) throw new Error(`${k}: description should start with "${label}"`);
}
const shared = [...coveredBy.values()].filter((b) => b.length === 2).length;
console.log(`${CONCEPTS.length} concepts in the registry (${shared} shared by both syllabi)`);

const registry = {
  family: "history-o",
  name: "History (O-Level / IGCSE)",
  level: "O",
  prefix: "hist",
  subjects: ["zimsec/o-level/history", "cambridge/igcse/history"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description })),
};

const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/history-o.json", registry);
write("content/syllabi/zimsec/o-level/history/2015-2022.json", zimsec);
write("content/syllabi/cambridge/igcse/history/2027-2028.json", c0470);
