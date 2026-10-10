// Builds content/concepts/history-a.json and the two A-Level History syllabus files:
//   content/syllabi/zimsec/a-level/history/2015-2022.json      (ZIMSEC A-Level History, Forms 5-6)
//   content/syllabi/cambridge/a-level/history/2027-2029.json   (Cambridge International AS & A Level History 9489)
// Sources (local only, not in git): .scratch/history-a/sources/zimsec-history-a.pdf (+ .txt) and 9489-2027-2029.pdf
// (+ .txt). The concept registry lives in ./concepts.mjs; this script prepends each concept's coverage label.
// Run from the repo root: node .scratch/history-a/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";
import { CONCEPTS } from "./concepts.mjs";

const ROOT = process.cwd();
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept key in concepts.mjs");
for (const [k] of CONCEPTS) if (!/^ahist\.[a-z0-9-]+\.[a-z0-9-]+$/.test(k)) throw new Error(`bad concept key ${k}`);

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. `form` (ZIMSEC) and `stage` (Cambridge: "AS Level" / "A Level only") are build-time metadata used for the
// concept labels; keys starting with "_" are not written. Objective codes are node code + .n (ours on both boards).
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, optional, optionGroup, children, form, stage } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) n.objectives = objectives.map((o, i) => (Array.isArray(o) ? { code: o[0], text: o[1] } : { code: `${code}.${i + 1}`, text: o }));
  if (components) n.components = components;
  if (optional) n.optional = true;
  if (optionGroup) n.optionGroup = optionGroup;
  if (children) n.children = children;
  if (form) n._form = form;
  if (stage) n._stage = stage;
  return n;
};
const section = (key, code, name, opts) => node("SECTION", key, code, name, opts);
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);

// =====================================================================================================================
// ZIMSEC A-Level History, Forms 5-6, 2015-2022. Top-level topics are the nineteen topics of the topic list (6.0), numbered
// 1-19 as printed. Sub-topics follow the sub-topic column of the competency matrix (8.0); where the matrix lists several
// states or items under one sub-topic, our nodes are one per state or item (codes 2.4 ..., ours). The "S" node is ours.
const F = "Forms 5-6";
const P1 = ["1"];
const P2 = ["2"];
const P12 = ["1", "2"];

const ZIMSEC_TOPICS = [
  topic("sources-of-history", "1", "Sources of History", {
    components: P1,
    children: [
      sub("sources-of-history.types", "1.1", "Types of sources of history", {
        form: F,
        description: "Matrix sub-topic 'Types of Sources of History'.",
        covers: ["ahist.skills.sources-of-history"],
        objectives: [
          "Identify and explain the sources of history: written evidence, archaeology, oral traditions and visual sources.",
          "Examine the advantages and disadvantages of each type of source.",
        ],
      }),
      sub("sources-of-history.interpretation", "1.2", "Interpretation of sources", {
        form: F,
        description: "Matrix sub-topic 'Interpretation of sources'. The skill of evaluating sources in an examination question is also taught here.",
        covers: ["ahist.skills.source-evaluation"],
        objectives: [
          "Evaluate the contribution of various sources in recovering pre-colonial history.",
          "Interpret and evaluate historical evidence, points of view and bias in sources.",
        ],
      }),
    ],
  }),
  topic("precolonial", "2", "Development of Pre-colonial Societies and States", {
    description: "Paper 1 examines this topic for Zimbabwe, Paper 2 for Africa (specification grids).",
    components: P12,
    children: [
      sub("precolonial.san-khoikhoi", "2.1", "Pre-colonial societies (San and Khoi-Khoi): internal organisation and indigenous knowledge systems", {
        form: F,
        covers: ["ahist.precolonial.san-khoikhoi"],
        objectives: [
          "Explain the internal organisation of San and Khoi-Khoi societies.",
          "Examine the impact of the San and Khoi-Khoi indigenous knowledge systems (medicine, paint, poison, hunting methods) on present societies.",
        ],
      }),
      sub("precolonial.bantu-migrations", "2.2", "Bantu migrations", {
        form: F,
        description: "Matrix sub-topics 'Bantu migrations' and 'Impact of the Bantu migrations'.",
        covers: ["ahist.precolonial.bantu-migrations"],
        objectives: [
          "Trace the origins of the Bantu migrations and explain the theories about them.",
          "Analyse the causes of the Bantu migrations.",
          "Evaluate the impact of the migrations on pre-colonial societies in southern Africa.",
        ],
      }),
      sub("precolonial.origins-of-states", "2.3", "Origins of states: theories and internal organisation", {
        form: F,
        description: "Matrix sub-topic 'Origins of states' (with its internal organisation and decline), general part.",
        components: P12,
        covers: ["ahist.precolonial.state-origins-theories"],
        objectives: [
          "Examine the origins of pre-colonial states in sub-Saharan Africa and explain the theories of their origins.",
          "Outline the internal organisation of pre-colonial states and analyse how it contributed to their development and expansion.",
        ],
      }),
      sub("precolonial.great-zimbabwe", "2.4", "Mapungubwe and Great Zimbabwe", {
        form: F,
        components: P1,
        covers: ["ahist.precolonial.mapungubwe-great-zimbabwe"],
        objectives: [
          "Analyse the controversies surrounding the origins and construction of Great Zimbabwe.",
          "Outline the political, economic and social organisation of the state.",
          "Examine the factors that led to its decline.",
        ],
      }),
      sub("precolonial.mutapa", "2.5", "The Mutapa state", {
        form: F,
        components: P1,
        covers: ["ahist.precolonial.mutapa"],
        objectives: ["Explain the origins and the controversies about the origins of the Mutapa state.", "Outline its internal organisation and the factors that led to its decline."],
      }),
      sub("precolonial.rozvi", "2.6", "The Torwa and Rozvi states", {
        form: F,
        components: P1,
        covers: ["ahist.precolonial.torwa-rozvi"],
        objectives: ["Examine the origins of the Torwa and Rozvi states.", "Outline their internal organisation and the factors that led to their decline."],
      }),
      sub("precolonial.ndebele", "2.7", "The Ndebele state", {
        form: F,
        components: P1,
        covers: ["ahist.precolonial.ndebele-state"],
        objectives: ["Examine the origins of the Ndebele state.", "Outline its political, economic and social organisation and the factors that led to its decline."],
      }),
      sub("precolonial.zulu", "2.8", "The Zulu state and the Mfecane", {
        form: F,
        components: P2,
        covers: ["ahist.precolonial.mfecane-zulu"],
        objectives: ["Explain the causes of the Mfecane and the rise of the Zulu state.", "Outline the organisation of the Zulu state and the factors that led to its decline."],
      }),
      sub("precolonial.gaza", "2.9", "The Gaza state", {
        form: F,
        components: P12,
        covers: ["ahist.precolonial.gaza"],
        objectives: ["Examine the origins of the Gaza state.", "Outline its internal organisation and the factors that led to its decline."],
      }),
      sub("precolonial.mandinka", "2.10", "The Mandinka states", {
        form: F,
        components: P2,
        covers: ["ahist.precolonial.mandinka"],
        objectives: ["Examine the origins of the Mandinka state.", "Outline its internal organisation and the factors that led to its decline."],
      }),
      sub("precolonial.decline", "2.11", "Decline of states: internal and external factors", {
        form: F,
        components: P12,
        covers: ["ahist.precolonial.decline-of-states"],
        objectives: ["Examine the factors that led to the decline of pre-colonial states.", "Compare the impact of internal and external factors on the decline of states."],
      }),
    ],
  }),
  topic("early-contacts", "3", "Early Foreign Contacts with Zimbabwe", {
    components: P1,
    children: [
      sub("early-contacts.individuals-groups", "3.1", "Individuals and groups: traders, missionaries, hunters, concession seekers and explorers", {
        form: F,
        covers: ["ahist.contact.missionaries-hunters-traders"],
        objectives: ["Identify the individuals and groups that had early contact with Zimbabwean societies and outline their activities.", "Assess their impact on Zimbabwean societies."],
      }),
      sub("early-contacts.indian-ocean", "3.2", "States: Persia, China, India and Arabia", {
        form: F,
        covers: ["ahist.contact.indian-ocean-traders"],
        objectives: ["Identify the states that had early contact with Zimbabwe and examine the nature of their activities.", "Evaluate the impact of their activities on Zimbabwean societies."],
      }),
      sub("early-contacts.portugal", "3.3", "States: Portugal", {
        form: F,
        covers: ["ahist.contact.portuguese"],
        objectives: ["Examine the nature of Portuguese activities in Zimbabwe.", "Evaluate the impact of the Portuguese on Zimbabwean societies."],
      }),
      sub("early-contacts.european-states", "3.4", "States: Britain, Germany, the Transvaal and the Orange Free State", {
        form: F,
        covers: ["ahist.contact.european-states-interests"],
        objectives: ["Examine the nature of the activities of Britain, Germany, the Transvaal and the Orange Free State in Zimbabwe.", "Evaluate the impact of their activities on Zimbabwean societies."],
      }),
    ],
  }),
  topic("slave-trade-to-legitimate-trade", "4", "Transition from Slave Trade to Legitimate Trade", {
    components: P2,
    children: [
      sub("slave-trade-to-legitimate-trade.abolition", "4.1", "Abolition of the slave trade", {
        form: F,
        covers: ["ahist.slavery.abolition"],
        objectives: ["Explain the abolition of the slave trade and analyse the process leading to it.", "Examine the impact of the abolition of the slave trade on Africa."],
      }),
      sub("slave-trade-to-legitimate-trade.legitimate-trade", "4.2", "Transition to legitimate trade", {
        form: F,
        covers: ["ahist.slavery.legitimate-trade"],
        objectives: [
          "Outline the reasons for the transition to legitimate trade.",
          "Identify states that switched successfully to legitimate trade and those that failed in East and West Africa.",
          "Assess the impact of the transition on African societies (for example the growth of towns and the rise of powerful states such as Opobo).",
        ],
      }),
    ],
  }),
  topic("imperialism", "5", "Imperialism in Africa", {
    components: P2,
    children: [
      sub("imperialism.scramble-causes", "5.1", "Scramble for Africa: causes", {
        form: F,
        covers: ["ahist.imperialism.scramble-causes"],
        objectives: ["Explain the causes of the Scramble for Africa."],
      }),
      sub("imperialism.partition", "5.2", "Partition of Africa and the Berlin Conference, 1884-85", {
        form: F,
        covers: ["ahist.imperialism.berlin-partition"],
        objectives: [
          "Analyse the process of the partition of Africa.",
          "Examine the terms of the Berlin Colonial Conference of 1884-85.",
          "Assess the effects of the partition on both Africa and Europe.",
        ],
      }),
    ],
  }),
  topic("colonisation", "6", "Colonisation of Zimbabwe and Primary Resistance", {
    components: P1,
    children: [
      sub("colonisation.occupation", "6.1", "The occupation of Zimbabwe", {
        form: F,
        covers: ["ahist.colonisation.occupation"],
        objectives: [
          "Examine the reasons for the colonisation of Zimbabwe.",
          "Analyse the steps taken to occupy Zimbabwe up to 1890: treaties and concessions, the Royal Charter and the Pioneer Column.",
        ],
      }),
      sub("colonisation.anglo-ndebele-war", "6.2", "The Anglo-Ndebele War (1893-94)", {
        form: F,
        covers: ["ahist.colonisation.anglo-ndebele-war"],
        objectives: ["Examine the causes of the Anglo-Ndebele War.", "Assess the events of the war.", "Analyse the results of the war."],
      }),
    ],
  }),
  topic("first-chimurenga", "7", "First Chimurenga/Umvukela 1896-7", {
    components: P1,
    children: [
      sub("first-chimurenga.causes", "7.1", "Causes of the First Chimurenga/Umvukela", {
        form: F,
        covers: ["ahist.risings.causes"],
        objectives: ["Explain the causes of the First Chimurenga/Umvukela."],
      }),
      sub("first-chimurenga.course-results", "7.2", "Course and results of the First Chimurenga/Umvukela", {
        form: F,
        covers: ["ahist.risings.course-results"],
        objectives: ["Analyse the course of the First Chimurenga/Umvukela.", "Assess its impact."],
      }),
      sub("first-chimurenga.mediums-defeat", "7.3", "Spirit mediums, heroes and heroines, and African defeat", {
        form: F,
        covers: ["ahist.risings.spirit-mediums-defeat"],
        objectives: ["Examine the role played by spirit mediums, heroes and heroines in the First Chimurenga/Umvukela.", "Account for African defeat."],
      }),
    ],
  }),
  topic("colonial-administration", "8", "Colonial Administration in Rhodesia", {
    components: P1,
    children: [
      sub("colonial-administration.company-rule", "8.1", "Colonial rule: Company Rule (1890-1923)", {
        form: F,
        covers: ["ahist.colonial.company-rule"],
        objectives: ["Explain the nature of colonial administration under the Company.", "Assess the impact of Company rule on Africans."],
      }),
      sub("colonial-administration.settler-rule", "8.2", "Colonial rule: Settler Rule (1923-79), legislation and the Federation", {
        form: F,
        covers: ["ahist.colonial.settler-rule-legislation"],
        objectives: ["Explain the nature of settler rule and colonial legislation.", "Assess the impact of settler administration on Africans."],
      }),
      sub("colonial-administration.udi", "8.3", "Colonial rule: Settler Rule (1923-79), the Rhodesian Front and UDI", {
        form: F,
        covers: ["ahist.colonial.udi-rhodesian-front"],
        objectives: ["Explain the nature of the Rhodesian Front government and UDI.", "Assess the impact of the later settler administration on Africans."],
      }),
    ],
  }),
  topic("primary-resistance-africa", "9", "Primary Resistance Movements and Armed Struggles in other African Countries", {
    components: P2,
    children: [
      sub("primary-resistance-africa.ethiopia", "9.1", "Initial primary resistance in Ethiopia (Menelik II)", {
        form: F,
        covers: ["ahist.resistance.ethiopia-menelik"],
        objectives: ["Assess the causes and nature of the initial primary resistance in Ethiopia.", "Examine its results."],
      }),
      sub("primary-resistance-africa.maji-maji", "9.2", "Post-pacification resistance in Tanzania (the Maji Maji Uprising)", {
        form: F,
        covers: ["ahist.resistance.maji-maji"],
        objectives: ["Explain the causes, course and results of the Maji Maji Uprising.", "Assess the effectiveness of the methods used."],
      }),
      sub("primary-resistance-africa.mozambique", "9.3", "Armed struggle in Mozambique", {
        form: F,
        covers: ["ahist.resistance.mozambique"],
        objectives: ["Analyse the causes, course and results of the armed struggle in Mozambique.", "Examine the contribution of foreign states to the struggle."],
      }),
    ],
  }),
  topic("second-chimurenga", "10", "Second Chimurenga/Umvukela", {
    components: P1,
    children: [
      sub("second-chimurenga.early-nationalism", "10.1", "Rise of African nationalism: early organisations and the move from trade unionism to mass nationalism", {
        form: F,
        covers: ["ahist.liberation.early-nationalism"],
        objectives: ["Assess the nature of early African nationalist organisations up to 1957.", "Analyse the transition from trade unionism to mass nationalism."],
      }),
      sub("second-chimurenga.parties", "10.2", "Nationalist political parties", {
        form: F,
        covers: ["ahist.liberation.nationalist-parties"],
        objectives: ["Explain the formation of the nationalist political parties."],
      }),
      sub("second-chimurenga.causes-peaceful", "10.3", "Armed struggle: causes and attempts to end the war by peaceful means", {
        form: F,
        covers: ["ahist.liberation.causes-peaceful-attempts"],
        objectives: ["Explain the causes of the Second Chimurenga/Umvukela.", "Examine the attempts to end the war by peaceful means."],
      }),
      sub("second-chimurenga.war-1966-72", "10.4", "Armed struggle: political and military developments, 1966-72", {
        form: F,
        covers: ["ahist.liberation.armed-struggle-1966-72"],
        objectives: ["Analyse the main political and military developments in the Second Chimurenga/Umvukela, including the battles fought, to 1972."],
      }),
      sub("second-chimurenga.war-1972-79", "10.5", "Armed struggle: political and military developments, 1972-79", {
        form: F,
        covers: ["ahist.liberation.armed-struggle-1972-79"],
        objectives: ["Analyse the main political and military developments in the Second Chimurenga/Umvukela, including the battles fought, from 1972."],
      }),
      sub("second-chimurenga.roles-impact", "10.6", "Roles of spirit mediums, peasants, chiefs, women, churches, organisations and collaborators; impact of the war", {
        form: F,
        covers: ["ahist.liberation.roles-and-impact"],
        objectives: [
          "Examine the role of spirit mediums, peasants, chiefs, women, churches, organisations and war collaborators in the Second Chimurenga/Umvukela.",
          "Assess the impact of the war on Africans.",
        ],
      }),
      sub("second-chimurenga.lancaster-house", "10.7", "Lancaster House Conference", {
        form: F,
        covers: ["ahist.liberation.lancaster-house"],
        objectives: ["Explain the reasons behind convening the Lancaster House Conference.", "Assess the key provisions of the Lancaster House Settlement."],
      }),
    ],
  }),
  topic("post-independence", "11", "Post-Independence Developments in Zimbabwe (1980-2000)", {
    components: P1,
    children: [
      sub("post-independence.political", "11.1", "Political developments", {
        form: F,
        covers: ["ahist.independence.political"],
        objectives: [
          "Examine the composition of the 1980 Government of National Unity and analyse the policy of reconciliation.",
          "Explain the political challenges faced by the government.",
          "Outline the terms of the Unity Accord of 1987.",
        ],
      }),
      sub("post-independence.economic", "11.2", "Economic developments", {
        form: F,
        covers: ["ahist.independence.economic"],
        objectives: ["Explain the government's economic blueprints (for example Growth with Equity, the Transitional National Development Plan, the Five Year Plan).", "Analyse the economic achievements and examine the economic challenges."],
      }),
      sub("post-independence.social", "11.3", "Social developments", {
        form: F,
        covers: ["ahist.independence.social"],
        objectives: ["Examine social developments after 1980 (education, health, human rights).", "Assess the social challenges faced by the government."],
      }),
      sub("post-independence.foreign-policy", "11.4", "Foreign policy", {
        form: F,
        description: "In the scope and sequence for this topic; no competency-matrix entry in the copy read (see notes).",
        covers: ["ahist.independence.foreign-policy"],
        objectives: ["Outline the principles and main features of Zimbabwe's foreign policy after independence."],
      }),
    ],
  }),
  topic("indigenisation-land", "12", "Indigenisation, Land Reform and Empowerment in Zimbabwe", {
    components: P1,
    children: [
      sub("indigenisation-land.indigenisation", "12.1", "Indigenisation, empowerment and enterprise skills", {
        form: F,
        covers: ["ahist.empowerment.indigenisation"],
        objectives: ["Outline the indigenisation and empowerment policies introduced after independence.", "Examine the implementation of the policies and design business models that promote indigenisation and national pride."],
      }),
      sub("indigenisation-land.land-1980-99", "12.2", "Land reform: theory and practice after 1980 (to 1999)", {
        form: F,
        covers: ["ahist.empowerment.land-1980-99"],
        objectives: ["Identify the laws governing land reform from 1980.", "Assess the implementation of the land reform policies."],
      }),
      sub("indigenisation-land.land-third-chimurenga", "12.3", "Land reform after 2000 and the Third Chimurenga", {
        form: F,
        covers: ["ahist.empowerment.land-third-chimurenga"],
        objectives: ["Assess the reasons for the Third Chimurenga.", "Analyse the impact of the Third Chimurenga."],
      }),
      sub("indigenisation-land.intellectual-property", "12.4", "Protection of intellectual property", {
        form: F,
        covers: ["ahist.empowerment.intellectual-property"],
        objectives: [
          "Identify the laws and regulations governing the protection of intellectual property in Zimbabwe.",
          "Analyse the government's efforts in enforcing the registration of intellectual property and evaluate the successes and challenges faced.",
        ],
      }),
    ],
  }),
  topic("constitution", "13", "The Constitution of Zimbabwe", {
    components: P1,
    children: [
      sub("constitution.human-rights", "13.1", "Human rights and responsibilities", {
        form: F,
        covers: ["ahist.constitution.human-rights"],
        objectives: ["Outline human rights and responsibilities.", "Assess the efforts made by the Government of Zimbabwe in promoting human rights and responsibilities."],
      }),
      sub("constitution.democracy", "13.2", "Democracy in Zimbabwe", {
        form: F,
        covers: ["ahist.constitution.democracy"],
        objectives: [
          "Describe the characteristics and types of democracy.",
          "Examine the roles of the executive, the legislature and the judiciary.",
          "Assess government efforts in promoting democracy.",
        ],
      }),
    ],
  }),
  topic("french-revolution", "14", "The French Revolution and the Napoleonic Era", {
    components: P2,
    children: [
      sub("french-revolution.causes", "14.1", "The French Revolution: causes", {
        form: F,
        covers: ["ahist.france.ancien-regime-1789"],
        objectives: ["Analyse the causes of the French Revolution."],
      }),
      sub("french-revolution.events-1789-92", "14.2", "The French Revolution: events, 1789-1792", {
        form: F,
        covers: ["ahist.france.republic-1792"],
        objectives: ["Examine the events of the French Revolution up to the establishment of the republic."],
      }),
      sub("french-revolution.events-1792-99", "14.3", "The French Revolution: events, 1792-1799", {
        form: F,
        covers: ["ahist.france.terror-directory"],
        objectives: ["Examine the events of the French Revolution from the Terror to the Directory."],
      }),
      sub("french-revolution.impact", "14.4", "The French Revolution: impact on France and the world", {
        form: F,
        covers: ["ahist.france.revolution-impact"],
        objectives: ["Assess the impact of the French Revolution on France and the world."],
      }),
      sub("french-revolution.napoleon-rise", "14.5", "The Napoleonic Era: the rise of Napoleon Bonaparte and his domestic policies", {
        form: F,
        covers: ["ahist.france.napoleon-power"],
        objectives: ["Explain the rise of Napoleon Bonaparte.", "Examine his domestic policies."],
      }),
      sub("french-revolution.napoleon-fall", "14.6", "The Napoleonic Era: foreign policy, impact and fall", {
        form: F,
        covers: ["ahist.france.napoleon-empire-fall"],
        objectives: ["Examine Napoleon Bonaparte's foreign policy and assess the impact of his policies on France and Europe.", "Analyse the factors that led to his fall."],
      }),
    ],
  }),
  topic("nationalism-europe", "15", "Nationalism in Europe", {
    components: P2,
    children: [
      sub("nationalism-europe.vienna-congress", "15.1", "The Vienna Settlement and the Congress System", {
        form: F,
        covers: ["ahist.europe.vienna-congress-system"],
        objectives: ["Assess the Vienna Settlement and examine the Congress System.", "Analyse the reasons for the collapse of the Congress System."],
      }),
      sub("nationalism-europe.bourbons", "15.2", "The Restored Bourbons in France", {
        form: F,
        covers: ["ahist.europe.restored-bourbons"],
        objectives: ["Examine the reigns of Louis XVIII and Charles X.", "Analyse the reasons for the fall of the Restored Bourbons."],
      }),
      sub("nationalism-europe.italy", "15.3", "Unification in Italy", {
        form: F,
        covers: ["ahist.italy.unification"],
        objectives: ["Explain the background to the unification of Italy.", "Analyse the process of unification."],
      }),
      sub("nationalism-europe.germany-background", "15.4", "Unification in Germany: background to 1848", {
        form: F,
        covers: ["ahist.germany.vienna-to-1848"],
        objectives: ["Explain the background to the unification of Germany."],
      }),
      sub("nationalism-europe.germany-1848", "15.5", "Unification in Germany: the 1848-49 revolutions and Austria-Prussia relations", {
        form: F,
        covers: ["ahist.germany.revolutions-1848-49", "ahist.germany.austria-prussia-1850-62"],
        objectives: ["Analyse the part played by the revolutions of 1848-49 and by Austro-Prussian rivalry in the process of German unification."],
      }),
      sub("nationalism-europe.germany-bismarck", "15.6", "Unification in Germany: Bismarck and the wars of unification", {
        form: F,
        covers: ["ahist.germany.bismarck-to-1866", "ahist.germany.unification-1871"],
        objectives: ["Analyse the process of the unification of Germany under Bismarck."],
      }),
    ],
  }),
  topic("ww1-peace", "16", "The First World War and Peace Settlements", {
    components: P2,
    children: [
      sub("ww1-peace.causes", "16.1", "The First World War: causes", {
        form: F,
        covers: ["ahist.ww1.long-term-causes", "ahist.ww1.july-crisis"],
        objectives: ["Explain the causes of the First World War."],
      }),
      sub("ww1-peace.events", "16.2", "The First World War: events", {
        form: F,
        covers: ["ahist.ww1.events"],
        objectives: ["Examine the events of the First World War."],
      }),
      sub("ww1-peace.results-impact", "16.3", "The First World War: results and impact", {
        form: F,
        covers: ["ahist.ww1.results-impact"],
        objectives: ["Analyse the results of the First World War.", "Evaluate the impact of the war on the world."],
      }),
      sub("ww1-peace.paris", "16.4", "Peace settlements: the Paris Peace Settlement", {
        form: F,
        covers: ["ahist.peace.paris-settlement"],
        objectives: ["Assess the Paris Peace Settlement."],
      }),
      sub("ww1-peace.league", "16.5", "The League of Nations", {
        form: F,
        covers: ["ahist.peace.league-of-nations"],
        objectives: ["Evaluate the work of the League of Nations.", "Analyse the factors that led to the collapse of the League."],
      }),
    ],
  }),
  topic("fascism-ww2", "17", "Fascism and the Second World War", {
    components: P2,
    children: [
      sub("fascism-ww2.mussolini-rise", "17.1", "Fascism in Italy: the rise of Mussolini (1919-22)", {
        form: F,
        covers: ["ahist.mussolini.rise-dictatorship"],
        objectives: ["Explain the rise of Mussolini in Italy and the establishment of his dictatorship."],
      }),
      sub("fascism-ww2.hitler-rise", "17.2", "Fascism in Germany: the rise of Hitler (1919-33)", {
        form: F,
        covers: ["ahist.nazi.rise-dictatorship"],
        objectives: ["Explain the rise of Hitler in Germany and the creation of his dictatorship."],
      }),
      sub("fascism-ww2.domestic-policies", "17.3", "Domestic policies of Mussolini and Hitler", {
        form: F,
        covers: ["ahist.mussolini.governance", "ahist.mussolini.economy", "ahist.mussolini.society", "ahist.nazi.governance", "ahist.nazi.economy", "ahist.nazi.society"],
        objectives: ["Examine the domestic policies of Hitler and Mussolini."],
      }),
      sub("fascism-ww2.comparison", "17.4", "Foreign policies of Hitler and Mussolini and their impact on the world", {
        form: F,
        covers: ["ahist.fascism.comparison-impact"],
        objectives: ["Assess the foreign policies of Hitler and Mussolini.", "Evaluate the impact of their policies on the world."],
      }),
      sub("fascism-ww2.causes", "17.5", "The Second World War: causes", {
        form: F,
        covers: ["ahist.ww2.causes"],
        objectives: ["Explain the causes of the Second World War."],
      }),
      sub("fascism-ww2.events", "17.6", "The Second World War: events", {
        form: F,
        covers: ["ahist.ww2.events"],
        objectives: ["Examine the events of the Second World War."],
      }),
      sub("fascism-ww2.results-impact", "17.7", "The Second World War: results and impact", {
        form: F,
        covers: ["ahist.ww2.results-impact"],
        objectives: ["Analyse the results of the Second World War.", "Evaluate its impact on the world."],
      }),
    ],
  }),
  topic("communist-revolutions", "18", "The Communist Revolutions: Russia (1905-1945) and China (1900-1976)", {
    components: P2,
    children: [
      sub("communist-revolutions.russia-to-1917", "18.1", "Russia: causes and events of the revolutions, 1905-1917", {
        form: F,
        covers: ["ahist.russia.tsarist-challenges", "ahist.russia.revolution-1905", "ahist.russia.revolutions-1917"],
        objectives: ["Examine the causes of the Russian Revolutions.", "Analyse the events of the revolutionary years 1905 to 1917."],
      }),
      sub("communist-revolutions.russia-1917-45", "18.2", "Russia: revolutionary policies, 1917-1945", {
        form: F,
        covers: [
          "ahist.russia.bolshevik-consolidation",
          "ahist.stalin.power-struggle",
          "ahist.stalin.governance",
          "ahist.stalin.economy",
          "ahist.stalin.society",
          "ahist.russia.great-patriotic-war",
        ],
        objectives: ["Analyse the events and revolutionary policies in Russia from 1917 to 1945."],
      }),
      sub("communist-revolutions.china", "18.3", "China: causes, events and revolutionary policies, 1900-1976", {
        form: F,
        covers: ["ahist.china.revolutions-1900-49", "ahist.china.mao-1949-76"],
        objectives: ["Examine the causes of the Chinese Revolution and analyse its events and revolutionary policies."],
      }),
      sub("communist-revolutions.comparison", "18.4", "Comparison of the revolutionary policies in Russia and China", {
        form: F,
        covers: ["ahist.china.comparison-with-russia"],
        objectives: ["Compare the revolutionary policies in Russia and China."],
      }),
    ],
  }),
  topic("regional-international", "19", "Regional and International Relations", {
    components: P2,
    children: [
      sub("regional-international.un", "19.1", "The United Nations", {
        form: F,
        covers: ["ahist.orgs.united-nations"],
        objectives: ["Analyse the origins and aims of the United Nations.", "Examine its structure and work."],
      }),
      sub("regional-international.au", "19.2", "The Organisation of African Unity and the African Union", {
        form: F,
        covers: ["ahist.orgs.african-union"],
        objectives: ["Analyse the origins and aims of the African Union and its predecessor.", "Examine its structure and work and assess the concept of integration."],
      }),
      sub("regional-international.sadc", "19.3", "The Southern African Development Community", {
        form: F,
        covers: ["ahist.orgs.sadc"],
        objectives: ["Analyse the origins and aims of SADC.", "Examine its structure and work and assess the concept of integration."],
      }),
    ],
  }),
  topic("assessment-skills", "S", "Assessment skills (ours): writing historical arguments", {
    description: "Not a syllabus topic: the written-examination skills of Papers 1 and 2 (the specification grid's analysis, synthesis and evaluation skills carry 70% of the marks).",
    components: P12,
    form: F,
    covers: ["ahist.skills.essay-and-judgement"],
    objectives: ["Plan and write a balanced essay that explains, evaluates and reaches a supported judgement."],
  }),
];

const zimsec = {
  board: "zimsec",
  qualification: "a-level",
  subject: "history",
  versionLabel: "2015-2022",
  family: "history-a",
  title: "ZIMSEC A-Level History",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "History Syllabus, Forms 5 - 6, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at A Level",
    url: "https://www.zimsake.co.zw/softidrive/",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Topic names and their numbers (1 to 19) are transcribed from the topic list (6.0) of the Ministry's History Syllabus Forms 5 - 6 (2015 - 2022); sub-topics follow the sub-topic column of the competency matrix (8.0), with one node per state or item where the matrix lists several under one sub-topic. Sub-topic codes (2.1 ...) and objective codes are ours, and the Assessment skills node S is ours. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-10): Ministry document, copy obtained from zimsake.co.zw softidrive (the zimsake.co.zw document library; the URL recorded is the library's https address because the file has no stable direct link). The cover prints 'History Syllabus Forms 5 - 6, 2015 - 2022' (Curriculum Development and Technical Services, 2015). It was read through a pdftotext rendering in which the scope-and-sequence, competency-matrix and specification-grid tables come out with their columns interleaved; check every heading, the form of each item and each objective against a clean copy from ZIMSEC.",
    "Subject code: not printed in the syllabus document; confirm it with ZIMSEC (code left null).",
    "Heritage-Based Curriculum: ZIMSEC introduced Heritage-Based Curriculum syllabi, including versions for Forms 5-6 (2024-2030) in some subjects. The version must be confirmed: which History syllabus November 2026 and later A-Level candidates sit, then set effectiveTo and create a new version file when a new syllabus replaces this one. Version dates assumed: first examined in November 2018 (effectiveFrom 2018-01-01).",
    "Numbering: the topic list numbers the topics 1-19 and the matrix repeats 'TOPIC 1 ... TOPIC 19'; this tree follows them. The scope and sequence (7.0) divides the topics between Form 5 and Form 6, but its columns are scrambled in the copy read (it appears to place the topics up to the Occupation of Zimbabwe and the early resistance topics in Form 5 and the later topics in Form 6, with the Transition from Slave Trade to Legitimate Trade in Form 6); the form of each item is therefore recorded as 'Forms 5-6' and must be confirmed.",
    "Scope and sequence versus matrix: 'Foreign Policy' appears under Post-Independence Developments in the scope and sequence but has no matrix entry, objectives or grid share (recorded as 11.4 with objectives of ours). 'Protection of intellectual property' and 'Indigenisation, empowerment and enterprise skills' are matrix sub-topics of topic 12. Some matrix cells in the copy read are garbled or cut off.",
    "Assessment (9.0) as read: continuous assessment 30% (practical assignments, theory tests, written assignments and a written research project over Forms 5 and 6, each task marked out of 100) and a summative examination 70%: Paper 1 History of Zimbabwe (Pre-colonial, Colonial, Post-colonial), 3 hours, 100 marks, 35%; Paper 2 Regional and International History, 3 hours, 100 marks, 35%. Paper 1 has four sections A-D of four essay questions each; Paper 2 has five sections A-E of four essay questions each. Candidates answer four questions from at least three sections; each question carries 25 marks. The marks of the parts of a question are not printed; our practice items are single 25-mark essays with levels of response. Continuous assessment is not a component here and is not simulated.",
    "Specification grids as read (scrambled): Paper 1: four sections of 25% each, listing Sources of History; Development of pre-colonial societies and states in Zimbabwe; Early Foreign contacts with Zimbabwe; Colonisation of Zimbabwe and Primary Resistance; Colonial Administration in Zimbabwe; First Chimurenga/Umvukela; Second Chimurenga/Umvukela; Post-Independence Developments in Zimbabwe (1980-2000); Indigenisation, Land Reform and Empowerment in Zimbabwe; The Constitution of Zimbabwe. Paper 2: five sections of 20% each, listing Development of pre-colonial societies and states in Africa; Transition from Slave Trade to Legitimate Trade; Imperialism in Africa; Primary Resistance Movements and Armed Struggles in other African countries; The French Revolution and the Napoleonic Era; Nationalism in Europe; The First World War and Peace Settlements; Fascism and the Second World War; The Communist Revolutions; Regional and International Relations. Which topic belongs to which lettered section is not recoverable from the copy; the node components follow the paper each topic is listed under. Skill weighting for Papers 1 and 2 as read: knowledge and understanding 5, comprehension 5, application and analysis 30, synthesis and evaluation 40, practical skills 20 (percentages).",
    "Sensitive topics (the liberation war, the Matabeleland and Midlands disturbances of the 1980s, land reform and the Holocaust, the Terror and the Great Leap Forward famine) are taught with well-established dates, estimate ranges for casualties and balanced, non-partisan wording; see the brief.",
    "Shared with Cambridge 9489 (concepts ahist.*): the French Revolution and Napoleon, German unification, the First World War's causes, Italian Fascism, Nazi Germany and Soviet Russia. Lessons are written to the depth of the deeper board; parts named only by ZIMSEC (topics 1-13 on Zimbabwe, Africa and the organisations; Italy's unification, the Vienna settlement, China, the world wars' course and results) are marked as ZIMSEC detail.",
  ],
  overview: "The ZIMSEC A-Level History syllabus (Forms 5-6) builds on Forms 1-4 and has nineteen topics. It starts with the sources of history, the pre-colonial societies and states of Zimbabwe and Africa, early foreign contacts, the transition from the slave trade to legitimate trade, the Scramble for Africa, the colonisation of Zimbabwe and the First Chimurenga/Umvukela, colonial administration, other African resistance movements, the Second Chimurenga/Umvukela, developments since independence, indigenisation, land reform and the Constitution. The world history topics cover the French Revolution and Napoleon, nationalism in Europe, the First World War and the peace settlements, Fascism and the Second World War, the Russian and Chinese revolutions, and regional and international organisations.",
  assessmentOverview: "Continuous assessment (practical assignments, theory tests, written assignments and a research project) carries 30%. The examination carries 70%: Paper 1 History of Zimbabwe (3 hours, 100 marks, 35%) and Paper 2 Regional and International History (3 hours, 100 marks, 35%). Each paper has lettered sections of four essay questions; candidates answer four questions from at least three sections, 25 marks each.",
  components: [
    { code: "1", name: "Paper 1: History of Zimbabwe (Pre-colonial, Colonial, Post-colonial)", kind: "WRITTEN", description: "Essay paper in four sections A-D of four questions each; candidates answer four questions from at least three sections, 25 marks each.", durationMinutes: 180, maxMarks: 100, weightingPercent: 35 },
    { code: "2", name: "Paper 2: Regional and International History", kind: "WRITTEN", description: "Essay paper in five sections A-E of four questions each; candidates answer four questions from at least three sections, 25 marks each.", durationMinutes: 180, maxMarks: 100, weightingPercent: 35 },
  ],
  topics: ZIMSEC_TOPICS,
};

// =====================================================================================================================
// Cambridge International AS & A Level History 9489, 2027-2029. Option, topic and key-question headings are transcribed
// with their printed numbers: AS topics 1-9 (Papers 1 and 2; European 1-3, American 4-6, International 7-9) and, repeating
// the numbers 1-9, the Paper 4 topics (codes prefixed P4-). Paper 3 topic codes (P3-1 ...) and objective codes are ours.
// The platform covers three sets first (see notes): the AS European option, all three Paper 3 topics and the Paper 4
// European option; the other options are listed (headings only) and have no concept coverage yet.
const AS = ["1", "2"];
const ASL = "AS Level";
const ALO = "A Level only";
const EXTRA = "Not yet covered by the platform's content (a later phase; see the notes of this file).";
const kq = (key, code, name, opts) => sub(key, code, name, opts);
const stub = (key, code, name) => sub(key, code, name, { description: EXTRA });

const AS_EUROPEAN = topic("as-european", "AS-E", "AS Level European option: Modern Europe, 1774-1924", {
  description: "Candidates study ONE of the three AS options for Papers 1 and 2. Covered first by the platform (see notes). The three topics rotate between Paper 1 and Paper 2 each year.",
  components: AS,
  optional: true,
  optionGroup: "as-option",
  children: [
    sub("as-european.france", "1", "France, 1774-1814", {
      description: "Candidates are not expected to study foreign policy and military campaigns in detail; they should understand their impact on events and policies within France.",
      children: [
        kq("as-european.france.1-1", "1.1", "What were the causes and immediate consequences of the 1789 Revolution?", {
          stage: ASL,
          covers: ["ahist.france.ancien-regime-1789"],
          objectives: [
            "Explain how absolute monarchy, the estate system, the Enlightenment and the American war created pressure for change.",
            "Explain the economic problems and failed reforms up to 1787 and the financial and political crisis of 1787-89.",
            "Describe the events from the Estates-General and the Tennis Court Oath to the storming of the Bastille, the Great Fear, the August Decrees, the Declaration of Rights and the March of the Women.",
          ],
        }),
        kq("as-european.france.1-2", "1.2", "How and why did France become a republic by 1792?", {
          stage: ASL,
          covers: ["ahist.france.republic-1792"],
          objectives: [
            "Explain the aims of the revolutionary groups and why the counter-revolutionary groups failed.",
            "Assess the financial, local government, justice and Church reforms.",
            "Explain the political instability (the constitution, the flight to Varennes, the Champ de Mars) and the move from constitutional monarchy to republic.",
          ],
        }),
        kq("as-european.france.1-3", "1.3", "How well was France governed in the period 1793-99?", {
          stage: ASL,
          covers: ["ahist.france.terror-directory"],
          objectives: [
            "Explain the problems facing France after the execution of Louis XVI and the effects of war.",
            "Describe the Committee of Public Safety, the Constitution of 1793, Robespierre and the Terror, and the reaction after 1794.",
            "Assess the aims, problems, successes and failures of the Directory, 1795-99.",
          ],
        }),
        kq("as-european.france.1-4", "1.4", "What caused the rise and fall of Napoleon Bonaparte?", {
          stage: ASL,
          covers: ["ahist.france.napoleon-power", "ahist.france.napoleon-empire-fall"],
          objectives: [
            "Explain Napoleon's military reputation, ambitions and the coup of 1799.",
            "Describe the means by which he established authoritarian control and the domestic reforms (law, education, finance, religion).",
            "Explain the reasons for his fall from power, from the Continental System and the Peninsular War to Russia, Leipzig and the capture of Paris.",
          ],
        }),
      ],
    }),
    sub("as-european.germany", "2", "Liberalism and nationalism in Germany, 1815-71", {
      children: [
        kq("as-european.germany.2-1", "2.1", "What were the causes of the Revolutions of 1848?", {
          stage: ASL,
          covers: ["ahist.germany.vienna-to-1848"],
          objectives: [
            "Assess the Confederation and the impact of Metternich's system, including the Carlsbad Decrees.",
            "Explain the growth of liberal and nationalist ideas and reactions to them.",
            "Explain the economic and political impact of the Zollverein and railways and the economic and social problems of the 1840s.",
          ],
        }),
        kq("as-european.germany.2-2", "2.2", "What happened during the 1848-49 revolutions and what were their consequences?", {
          stage: ASL,
          covers: ["ahist.germany.revolutions-1848-49", "ahist.germany.austria-prussia-1850-62"],
          objectives: [
            "Describe the spread of revolution in the German states and the Frankfurt Parliament and explain why it collapsed.",
            "Explain why Austrian control was reasserted.",
            "Explain the changing relations between Austria and Prussia after 1848, including economic and political issues and Bismarck's role up to 1859.",
          ],
        }),
        kq("as-european.germany.2-3", "2.3", "Why was Bismarck appointed as Minister-President and what were his aims in the period up to 1866?", {
          stage: ASL,
          covers: ["ahist.germany.bismarck-to-1866"],
          objectives: [
            "Explain the constitutional crisis and how Bismarck resolved it.",
            "Explain the war with Denmark and its outcome, and the preparation for war with Austria.",
            "Explain why war broke out in 1866 and its outcome, including the North German Confederation and the Indemnity Bill.",
          ],
        }),
        kq("as-european.germany.2-4", "2.4", "How and why was German unification achieved by 1871?", {
          stage: ASL,
          covers: ["ahist.germany.unification-1871"],
          objectives: [
            "Explain the problem of the southern states and Napoleon III's ambitions, including the Luxemburg crisis.",
            "Explain the Hohenzollern candidature, the Ems Telegram and the Franco-Prussian War.",
            "Describe the creation and constitution of the German Empire in 1871.",
          ],
        }),
      ],
    }),
    sub("as-european.russia", "3", "Russia from autocracy to revolution, 1881-1924", {
      children: [
        kq("as-european.russia.3-1", "3.1", "What challenges faced the Tsarist regime in the years 1881-94?", {
          stage: ASL,
          covers: ["ahist.russia.tsarist-challenges"],
          objectives: [
            "Explain how Russia was ruled and the policies of reform and repression under Alexander III.",
            "Assess economic development and its problems, and social change.",
            "Explain the development of opposition, including the growth of Marxism.",
          ],
        }),
        kq("as-european.russia.3-2", "3.2", "What were the causes and outcomes of the 1905 Revolution up to 1914?", {
          stage: ASL,
          covers: ["ahist.russia.revolution-1905"],
          objectives: [
            "Explain the causes of the 1905 Revolution, including political opposition, economic problems and the Russo-Japanese War.",
            "Describe the events of 1905 and the reactions of Nicholas II, including the October Manifesto and the Duma.",
            "Explain why the Tsarist regime survived and how far Russia changed between 1905 and 1914.",
          ],
        }),
        kq("as-european.russia.3-3", "3.3", "How and why did the Bolsheviks seize power in October 1917?", {
          stage: ASL,
          covers: ["ahist.russia.revolutions-1917"],
          objectives: [
            "Explain the impact of the First World War on Tsarist rule and the causes and effects of the February Revolution.",
            "Explain the aims of the Provisional Government and the reasons for its failure.",
            "Explain the methods the Bolsheviks used to seize power and describe the October Revolution.",
          ],
        }),
        kq("as-european.russia.3-4", "3.4", "How were the Bolsheviks able to consolidate their power up to 1924?", {
          stage: ASL,
          covers: ["ahist.russia.bolshevik-consolidation"],
          objectives: [
            "Describe Bolshevik policies, Sovnarkom and the Treaty of Brest-Litovsk, and the establishment of a dictatorship.",
            "Explain the reasons for the Bolshevik victory in the Civil War, including War Communism and the weaknesses of the Whites.",
            "Explain the importance of the Kronstadt Mutiny and the introduction and impact of the New Economic Policy.",
          ],
        }),
      ],
    }),
  ],
});

const AS_AMERICAN = topic("as-american", "AS-A", "AS Level American option: The history of the USA, 1820-1941", {
  description: "An alternative AS option for Papers 1 and 2. Headings only: " + EXTRA,
  components: AS,
  optional: true,
  optionGroup: "as-option",
  children: [
    sub("as-american.civil-war", "4", "The Civil War and Reconstruction, 1820-77", {
      children: [
        stub("as-american.civil-war.4-1", "4.1", "Why was there increasing tension between the North and the South before 1860?"),
        stub("as-american.civil-war.4-2", "4.2", "Why did the Civil War break out in April 1861?"),
        stub("as-american.civil-war.4-3", "4.3", "Why did the Civil War last four years?"),
        stub("as-american.civil-war.4-4", "4.4", "What were the aims of Reconstruction and how successful was it?"),
      ],
    }),
    sub("as-american.gilded-age", "5", "The Gilded Age and the Progressive Era, 1870-1920", {
      children: [
        stub("as-american.gilded-age.5-1", "5.1", "Why was there rapid industrialisation after 1870?"),
        stub("as-american.gilded-age.5-2", "5.2", "What were the consequences of the rapid economic growth after 1870?"),
        stub("as-american.gilded-age.5-3", "5.3", "Why did the Progressive Movement develop and what were its aims and policies?"),
        stub("as-american.gilded-age.5-4", "5.4", "How successful was the Progressive Movement from 1890 to 1920?"),
      ],
    }),
    sub("as-american.great-depression", "6", "The Great Crash, the Great Depression and the New Deal, 1920-41", {
      children: [
        stub("as-american.great-depression.6-1", "6.1", "What were the causes of the Great Crash and the Great Depression?"),
        stub("as-american.great-depression.6-2", "6.2", "What was the impact of the Great Crash and the Great Depression in the United States?"),
        stub("as-american.great-depression.6-3", "6.3", "How successful was Roosevelt's first New Deal?"),
        stub("as-american.great-depression.6-4", "6.4", "Why was there a second New Deal and how successful was it?"),
      ],
    }),
  ],
});

const AS_INTERNATIONAL = topic("as-international", "AS-I", "AS Level International option: International history, 1870-1939", {
  description: "An alternative AS option for Papers 1 and 2. Headings only: " + EXTRA + " Second priority after the European option because Topic 7 overlaps ZIMSEC topics 5 and 16.",
  components: AS,
  optional: true,
  optionGroup: "as-option",
  children: [
    sub("as-international.imperialism", "7", "Imperialism and the emergence of world powers, c.1870-1918", {
      children: [
        stub("as-international.imperialism.7-1", "7.1", "Why was imperialism a significant force in Africa from 1870?"),
        stub("as-international.imperialism.7-2", "7.2", "What was the impact of imperial expansion on international relations?"),
        stub("as-international.imperialism.7-3", "7.3", "Why did Japan emerge as a world power and what was the impact on international relations?"),
        stub("as-international.imperialism.7-4", "7.4", "Why did the USA emerge as a world power and what was the impact on international relations?"),
      ],
    }),
    sub("as-international.relations-1919-29", "8", "International relations 1919-29: conflict and cooperation", {
      children: [
        stub("as-international.relations-1919-29.8-1", "8.1", "Why was there such extensive dissatisfaction with the peace settlements of 1919-20?"),
        stub("as-international.relations-1919-29.8-2", "8.2", "Why was the League of Nations created and what challenges did it face in the 1920s?"),
        stub("as-international.relations-1919-29.8-3", "8.3", "How and why did international tensions remain high after the Versailles settlement?"),
        stub("as-international.relations-1919-29.8-4", "8.4", "How and why did international relations improve, 1924-29?"),
      ],
    }),
    sub("as-international.relations-1929-39", "9", "International history 1929-39: the rise of extremism and the road to war", {
      children: [
        stub("as-international.relations-1929-39.9-1", "9.1", "How did the rise of extremism affect international relations?"),
        stub("as-international.relations-1929-39.9-2", "9.2", "Why did the League of Nations fail to keep the peace in the 1930s?"),
        stub("as-international.relations-1929-39.9-3", "9.3", "Why, and with what effects, did Britain and France pursue a policy of appeasement?"),
        stub("as-international.relations-1929-39.9-4", "9.4", "Why did war break out in 1939?"),
      ],
    }),
  ],
});

const P3 = ["3"];
const PAPER3 = topic("paper-3", "P3", "Paper 3: Historical interpretations", {
  description: "Candidates study ONE of three topics and learn to analyse different historians' interpretations and approaches (A Level only, Paper 3). All three topics are covered.",
  children: [
    sub("paper-3.ww1", "P3-1", "Topic 1: The origins of the First World War", {
      description: "Over-arching key question: who or what was to blame for the First World War?",
      components: P3,
      optional: true,
      optionGroup: "paper-3-topic",
      children: [
        sub("paper-3.ww1.context", "P3-1.1", "Historical context: tensions and events, c.1890-1914", {
          stage: ALO,
          covers: ["ahist.ww1.long-term-causes", "ahist.ww1.july-crisis"],
          objectives: [
            "Explain the tensions between the Great Powers, the alliance system, militarism, the arms race and Balkan instability.",
            "Describe war plans, the assassination at Sarajevo, the July Crisis, mobilisation and the declarations of war.",
          ],
        }),
        sub("paper-3.ww1.debate-responsibility", "P3-1.2", "The debate: responsibility, Article 231 and the Fischer thesis", {
          stage: ALO,
          covers: ["ahist.ww1-debate.responsibility-fischer"],
          objectives: [
            "Explain how Article 231 and the Second World War affected the debate and how the idea of shared responsibility arose.",
            "Explain the Fischer thesis, the German reaction and the challenges to Fischer.",
          ],
        }),
        sub("paper-3.ww1.debate-modern", "P3-1.3", "The debate: modern interpretations", {
          stage: ALO,
          covers: ["ahist.ww1-debate.modern-interpretations"],
          objectives: [
            "Explain interpretations that explore the responsibility of nations other than Germany and the relative importance of long-term and short-term factors.",
            "Explain how the importance of individuals' decisions, contingency over motive and the centenary have shaped the debate.",
          ],
        }),
      ],
    }),
    sub("paper-3.holocaust", "P3-2", "Topic 2: The Holocaust", {
      description: "Over-arching key question: who or what was to blame for the Holocaust?",
      components: P3,
      optional: true,
      optionGroup: "paper-3-topic",
      children: [
        sub("paper-3.holocaust.context", "P3-2.1", "Historical context: antisemitism, persecution and the Holocaust", {
          stage: ALO,
          covers: ["ahist.holocaust.nazi-policy-1933-45"],
          objectives: [
            "Describe the background of European and German antisemitism and racist theories and Nazi persecution of the Jews, 1933-41.",
            "Describe the effect of war on Nazi policy, ghettoisation, Jewish responses, the development of extermination policies and contemporary reactions.",
          ],
        }),
        sub("paper-3.holocaust.debate-origins", "P3-2.2", "The debate: intentionalism, structuralism, functionalism and synthesis", {
          stage: ALO,
          covers: ["ahist.holocaust.debate-origins"],
          objectives: [
            "Explain how far the Holocaust was a consequence of racist ideas that pre-dated the Nazis.",
            "Explain the intentionalist, structuralist, functionalist and synthesis interpretations.",
          ],
        }),
        sub("paper-3.holocaust.debate-people", "P3-2.3", "The debate: perpetrators, victims and bystanders", {
          stage: ALO,
          covers: ["ahist.holocaust.debate-perpetrators-victims-bystanders"],
          objectives: [
            "Explain interpretations of who carried out the Holocaust and why.",
            "Explain interpretations of Jewish resistance, of which victims the definition includes, and of the response of the USA and Britain.",
          ],
        }),
      ],
    }),
    sub("paper-3.cold-war", "P3-3", "Topic 3: The origins and development of the Cold War", {
      description: "Over-arching key question: who or what was to blame for the Cold War?",
      components: P3,
      optional: true,
      optionGroup: "paper-3-topic",
      children: [
        sub("paper-3.cold-war.context", "P3-3.1", "Historical context: the Cold War in Europe, 1941-49", {
          stage: ALO,
          covers: ["ahist.coldwar.origins-1941-49"],
          objectives: [
            "Describe tensions in the wartime alliance, problems of peace-making and the Yalta and Potsdam conferences.",
            "Describe the Truman Doctrine, the Marshall Plan, the Berlin Blockade and Airlift and the establishment of NATO.",
          ],
        }),
        sub("paper-3.cold-war.debate-schools", "P3-3.2", "The debate: traditionalism, revisionism and post-revisionism", {
          stage: ALO,
          covers: ["ahist.coldwar.debate-schools"],
          objectives: [
            "Explain how far inherent tensions, leaders' personalities, ideology, security and economics caused the Cold War.",
            "Explain the traditionalist, revisionist and post-revisionist interpretations.",
          ],
        }),
        sub("paper-3.cold-war.debate-new", "P3-3.3", "The debate: Russian perspectives, new archives and the 'New' Cold War history", {
          stage: ALO,
          covers: ["ahist.coldwar.debate-new-history"],
          objectives: [
            "Explain how Russian historians' perspectives differ from those in the West.",
            "Explain reinterpretations based on new archival sources and the emergence of post-post-revisionism.",
          ],
        }),
      ],
    }),
  ],
});

const P4 = ["4"];
const P4_EUROPEAN = topic("p4-european", "P4-E", "Paper 4 European option: European history, 1919-41", {
  description: "Candidates study ONE of the three Paper 4 options (A Level only). Covered first by the platform (see notes).",
  components: P4,
  optional: true,
  optionGroup: "paper-4-option",
  children: [
    sub("p4-european.mussolini", "P4-1", "Mussolini's Italy, 1919-41", {
      children: [
        kq("p4-european.mussolini.1-1", "P4-1.1", "How did Mussolini gain control of Italy?", {
          stage: ALO,
          covers: ["ahist.mussolini.rise-dictatorship"],
          objectives: [
            "Explain the problems facing Italy after the First World War, including the 'mutilated victory', Fiume, economic challenges and unstable governments.",
            "Explain Mussolini's appointment in 1922: the Fascist programme, squadrismo, the March on Rome and the role of the King and the elites.",
            "Describe the establishment of a dictatorship, 1922-26, and the extent of Fascist control by 1926.",
          ],
        }),
        kq("p4-european.mussolini.1-2", "P4-1.2", "How effectively did Mussolini govern Italy?", {
          stage: ALO,
          covers: ["ahist.mussolini.governance"],
          objectives: [
            "Assess the terror state, propaganda and censorship.",
            "Describe the nature of Fascist government and its institutions.",
            "Assess Mussolini's foreign policy aims, methods and success.",
          ],
        }),
        kq("p4-european.mussolini.1-3", "P4-1.3", "How successful were Mussolini's economic policies?", {
          stage: ALO,
          covers: ["ahist.mussolini.economy"],
          objectives: [
            "Assess the attempts to modernise the economy, the 'battles' and autarky.",
            "Assess the response to the Great Depression, the Corporate State and living standards.",
          ],
        }),
        kq("p4-european.mussolini.1-4", "P4-1.4", "How far did Mussolini transform Italian society?", {
          stage: ALO,
          covers: ["ahist.mussolini.society"],
          objectives: [
            "Assess Fascist policies towards women and young people, education and the youth movements.",
            "Assess religious policy, the Lateran Treaties and the impact of Fascist organisations.",
            "Assess the extent of opposition to the regime.",
          ],
        }),
      ],
    }),
    sub("p4-european.stalin", "P4-2", "Stalin's Russia, 1924-41", {
      children: [
        kq("p4-european.stalin.2-1", "P4-2.1", "How did Stalin gain control of the Soviet Union?", {
          stage: ALO,
          covers: ["ahist.stalin.power-struggle"],
          objectives: [
            "Explain the power vacuum after Lenin's death and the strengths and weaknesses of the candidates.",
            "Explain the ideological differences and the power struggle, changing alliances, repression and propaganda to 1929.",
          ],
        }),
        kq("p4-european.stalin.2-2", "P4-2.2", "How effectively did Stalin govern the Soviet Union?", {
          stage: ALO,
          covers: ["ahist.stalin.governance"],
          objectives: [
            "Assess the reasons for and the impact of the Terror and the Purges.",
            "Assess the cult of personality, Stalin's leadership and the 1936 Constitution.",
            "Assess the aims and impact of foreign policy, including the Nazi-Soviet Pact.",
          ],
        }),
        kq("p4-european.stalin.2-3", "P4-2.3", "How successful were Stalin's economic policies?", {
          stage: ALO,
          covers: ["ahist.stalin.economy"],
          objectives: [
            "Explain the reasons for the 'Great Turn'.",
            "Assess agricultural policies (collectivisation), industrial policies (the Five Year Plans) and living standards.",
          ],
        }),
        kq("p4-european.stalin.2-4", "P4-2.4", "How far did Stalin transform Soviet society?", {
          stage: ALO,
          covers: ["ahist.stalin.society"],
          objectives: [
            "Assess the impact on women and the family, youth and education.",
            "Assess cultural change, Socialist Realism and religious policy.",
          ],
        }),
      ],
    }),
    sub("p4-european.hitler", "P4-3", "Hitler's Germany, 1929-41", {
      children: [
        kq("p4-european.hitler.3-1", "P4-3.1", "How did Hitler gain control of Germany?", {
          stage: ALO,
          covers: ["ahist.nazi.rise-dictatorship"],
          objectives: [
            "Explain the problems of the Weimar governments and the growth of Nazi support, 1929-32.",
            "Explain Hitler's appointment as Chancellor in 1933.",
            "Explain the consolidation of power and the creation of a dictatorship, 1933-34.",
          ],
        }),
        kq("p4-european.hitler.3-2", "P4-3.2", "How effectively did the Nazis govern Germany?", {
          stage: ALO,
          covers: ["ahist.nazi.governance"],
          objectives: [
            "Assess the terror state and propaganda.",
            "Assess the extent of opposition to the regime.",
            "Assess Nazi foreign policy, its aims, methods and consistency.",
          ],
        }),
        kq("p4-european.hitler.3-3", "P4-3.3", "How successful were Nazi economic policies?", {
          stage: ALO,
          covers: ["ahist.nazi.economy"],
          objectives: [
            "Assess the responses to the Great Depression and agricultural policies.",
            "Assess rearmament and autarky and the effect on living standards.",
          ],
        }),
        kq("p4-european.hitler.3-4", "P4-3.4", "How far did the Nazis transform German society?", {
          stage: ALO,
          covers: ["ahist.nazi.society"],
          objectives: [
            "Assess the impact on women, young people and religion.",
            "Assess the persecution of Jews and other minorities and its reasons.",
          ],
        }),
      ],
    }),
  ],
});

const P4_AMERICAN = topic("p4-american", "P4-A", "Paper 4 American option: The USA, 1945-93", {
  description: "An alternative Paper 4 option. Headings only: " + EXTRA,
  components: P4,
  optional: true,
  optionGroup: "paper-4-option",
  children: [
    sub("p4-american.truman-eisenhower", "P4-4", "Truman, Eisenhower and post-war USA, 1945-61", {
      children: [
        stub("p4-american.truman-eisenhower.4-1", "P4-4.1", "How well did Truman deal with the internal issues facing post-war US?"),
        stub("p4-american.truman-eisenhower.4-2", "P4-4.2", "How effective was Eisenhower as President?"),
        stub("p4-american.truman-eisenhower.4-3", "P4-4.3", "How far were the years 1945-61 ones of economic and social change?"),
        stub("p4-american.truman-eisenhower.4-4", "P4-4.4", "How different were the foreign policies of Truman and Eisenhower?"),
      ],
    }),
    sub("p4-american.challenges", "P4-5", "A time of challenges: the USA, 1961-74", {
      children: [
        stub("p4-american.challenges.5-1", "P4-5.1", "How significant were the presidencies of Kennedy, Johnson and Nixon for the USA?"),
        stub("p4-american.challenges.5-2", "P4-5.2", "How well did US governments deal with Cuba and Vietnam?"),
        stub("p4-american.challenges.5-3", "P4-5.3", "How much progress was made in achieving civil rights for African Americans?"),
        stub("p4-american.challenges.5-4", "P4-5.4", "Why were there challenges to authority?"),
      ],
    }),
    sub("p4-american.usa-1974-93", "P4-6", "The USA, 1974-93", {
      children: [
        stub("p4-american.usa-1974-93.6-1", "P4-6.1", "How significant were the problems facing the US in the late 1970s?"),
        stub("p4-american.usa-1974-93.6-2", "P4-6.2", "How great was the impact of the New Conservatism, 1981-92?"),
        stub("p4-american.usa-1974-93.6-3", "P4-6.3", "How effective were Carter's foreign policies, 1977-81?"),
        stub("p4-american.usa-1974-93.6-4", "P4-6.4", "Why did relations between the US and the USSR change?"),
      ],
    }),
  ],
});

const P4_INTERNATIONAL = topic("p4-international", "P4-I", "Paper 4 International option: International history, 1909-94", {
  description: "An alternative Paper 4 option. Headings only: " + EXTRA + " First priority for the second phase: Topic 8 (End of minority rule in South Africa and Zimbabwe, 1948-94) overlaps ZIMSEC topics 10 and 11.",
  components: P4,
  optional: true,
  optionGroup: "paper-4-option",
  children: [
    sub("p4-international.soviet-empire", "P4-7", "The Soviet Empire in Eastern Europe, 1953-91", {
      children: [
        stub("p4-international.soviet-empire.7-1", "P4-7.1", "How did the Soviet Union's relationship with the satellite states develop in the period up to 1968?"),
        stub("p4-international.soviet-empire.7-2", "P4-7.2", "Why did the period 1964-85 become characterised by political and economic stagnation?"),
        stub("p4-international.soviet-empire.7-3", "P4-7.3", "How did Gorbachev try to respond to the crisis in the Soviet Union?"),
        stub("p4-international.soviet-empire.7-4", "P4-7.4", "How and why did Soviet control of Eastern Europe collapse in 1991?"),
      ],
    }),
    sub("p4-international.minority-rule", "P4-8", "End of minority rule in South Africa and Zimbabwe, 1948-94", {
      children: [
        stub("p4-international.minority-rule.8-1", "P4-8.1", "How was the apartheid state established in South Africa and what was its impact from 1948 to 1959?"),
        stub("p4-international.minority-rule.8-2", "P4-8.2", "How did resistance grow in South Africa and how did the authorities respond in the period 1960-77?"),
        stub("p4-international.minority-rule.8-3", "P4-8.3", "Why did apartheid and minority rule in South Africa come to an end, 1978-94?"),
        stub("p4-international.minority-rule.8-4", "P4-8.4", "How was the ending of white minority rule in Zimbabwe achieved in the period 1965-80?"),
      ],
    }),
    sub("p4-international.independence", "P4-9", "The route to independence: Malaysia and Indonesia, c.1909-67", {
      children: [
        stub("p4-international.independence.9-1", "P4-9.1", "How widespread was the growth of nationalism and hostility to colonial rule in Malaya in the period up to 1945?"),
        stub("p4-international.independence.9-2", "P4-9.2", "What factors led to the formation of Malaysia?"),
        stub("p4-international.independence.9-3", "P4-9.3", "In what ways, and for what reasons, did the nationalist movement develop in Indonesia up to 1945?"),
        stub("p4-international.independence.9-4", "P4-9.4", "What factors led to the formation of Indonesia and what challenges did it face up to the mid-1960s?"),
      ],
    }),
  ],
});

const C9489_TOPICS = [
  section("as-level", "AS", "AS Level content (Papers 1 and 2)", {
    description: "Historical sources (Paper 1) and the outline study (Paper 2) on ONE of the three options. The platform covers the European option first.",
    components: AS,
    children: [
      topic("as-skills", "AS-S", "AS skills: historical sources and extended answers", {
        description: "Skills for Paper 1 (comparing sources and judging how far sources support a statement) and Paper 2 (explaining causes and judging between perspectives); no option-specific content.",
        components: AS,
        stage: ASL,
        covers: ["ahist.skills.source-evaluation", "ahist.skills.essay-and-judgement"],
        objectives: [
          "Compare two sources, using context and source evaluation to explain similarities and differences.",
          "Use all the sources and own knowledge to argue how far sources support a statement.",
          "Explain causes and construct a judgement that weighs a given and alternative perspectives.",
        ],
      }),
      AS_EUROPEAN,
      AS_AMERICAN,
      AS_INTERNATIONAL,
    ],
  }),
  section("a-level", "A", "A Level only content (Papers 3 and 4)", {
    description: "Historical interpretations (Paper 3) and the depth study (Paper 4); AS Level skills and knowledge are assumed.",
    children: [
      topic("a-skills", "A-S", "A Level skills: historians' interpretations and approaches", {
        description: "Skills for Paper 3 (reading an extract for interpretation and approach); also the extended answers of Paper 4.",
        components: ["3", "4"],
        stage: ALO,
        covers: ["ahist.skills.interpretations-and-approach"],
        objectives: [
          "Explain why historians produce different interpretations of the same events.",
          "Explain what an extract shows about the historian's interpretation and approach, using own knowledge.",
        ],
      }),
      PAPER3,
      P4_EUROPEAN,
      P4_AMERICAN,
      P4_INTERNATIONAL,
    ],
  }),
];

const c9489 = {
  board: "cambridge",
  qualification: "a-level",
  subject: "history",
  versionLabel: "2027-2029",
  family: "history-a",
  title: "Cambridge International AS & A Level History (9489)",
  code: "9489",
  effectiveFrom: "2027-01-01",
  effectiveTo: "2029-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge International AS & A Level History 9489 syllabus for examination in 2027, 2028 and 2029 (version 2)",
    url: "https://www.cambridgeinternational.org/Images/718292-2027-2029-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Option, topic and key-question headings are transcribed with their printed numbers (AS topics 1-9; Paper 4 topics 1-9 are prefixed P4- here because the numbers repeat). The sections AS and A, the skills nodes AS-S and A-S, the Paper 3 topic and sub-topic codes (P3-1 ...) and all objective codes are ours. Objectives paraphrase the 'content' bullets in our own words; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-10): the official PDF 'Cambridge International AS & A Level History 9489 syllabus for examination in 2027, 2028 and 2029', version 2, read through a pdftotext rendering. Exams in the June and November series; the syllabus is not available in all administrative zones. This syllabus starts in 2027: 2026 candidates are examined on the previous syllabus (not in the repository). Check headings against the PDF.",
    "Routes as printed: AS Level only (Papers 1 and 2 in one series; grades a-e); A Level staged over two years (AS in year 1, carried forward, then Papers 3 and 4); A Level in one series (all four papers; grades A*-E). Route A here covers both A Level routes. weightingPercent records the A Level share (Paper 1 20%, Paper 2 30%, Paper 3 20%, Paper 4 30%); the AS shares are Paper 1 40% and Paper 2 60%.",
    "Options as optional groups: AS Papers 1 and 2 (group as-option: European, American, International), Paper 3 (group paper-3-topic: one of three topics) and Paper 4 (group paper-4-option: European, American, International). Candidates study ONE of each group.",
    "WHAT THE PLATFORM COVERS FIRST, AND WHY: (1) the AS European option, Modern Europe 1774-1924 (France 1774-1814, Liberalism and nationalism in Germany 1815-71, Russia 1881-1924); (2) all three Paper 3 topics (the origins of the First World War, the Holocaust, the origins and development of the Cold War); (3) the Paper 4 European option, European history 1919-41 (Mussolini, Stalin, Hitler). Reasons: ZIMSEC is the main product and these options overlap its topics (French Revolution and Napoleon, nationalism in Europe including German unification, the causes of the First World War, Fascism and Nazism, the Russian Revolution and Stalin), so one lesson serves both boards; the European AS option and the Paper 4 European option fit together as one coherent course (Russia and Germany continue into Paper 4); Paper 3 needs only context and debate lessons for three topics that overlap ZIMSEC topics 16 and 17 and the Cold War. The American and International options at AS and Paper 4 are transcribed (headings only, no concepts). Recommended second phase: the International option (AS: Topic 7 overlaps ZIMSEC topics 5 and 16; Paper 4: Topic 8, End of minority rule in South Africa and Zimbabwe 1948-94, overlaps ZIMSEC topics 10 and 11, the most relevant addition for Zimbabwean candidates), then the American option. A candidate studying an uncovered option finds only the shared skills content here.",
    "Rotation of AS topics: in 2027 Paper 1 uses France (European), the Gilded Age (American) and Imperialism (International) and Paper 2 the other two topics of the option; in 2028 Paper 1 uses Germany, the Great Crash and International relations 1919-29; in 2029 Paper 1 uses Russia, the Civil War and Reconstruction and the road to war 1929-39. The topic assessed on Paper 1 in a year is not assessed on Paper 2 that year.",
    "Papers: Paper 1 Historical sources (1 hour 15 minutes, 40 marks): one question on one option, four sources (at least three written, at most one visual, 600 words in total), (a) compare two sources 15 marks, (b) how far do the sources support a statement 25 marks. Paper 2 Outline study (1 hour 45 minutes, 60 marks): two questions from one section, each (a) explain why 10 marks and (b) 20 marks. Paper 3 Historical interpretations (1 hour 15 minutes, 40 marks): one 40-mark question on an unattributed extract of up to 600 words, 'What can you learn from this extract about the interpretation and approach of the historian?'. Paper 4 Depth study (1 hour 45 minutes, 60 marks): two questions from a choice of three on one option, 30 marks each, 'Assess' or 'Evaluate'. All papers are written. Assessment objectives: AO1 knowledge, AO2 explanation, analysis and judgement, AO3 sources, AO4 interpretations (A Level weightings 45, 30, 15 and 10).",
    "The mark scheme level descriptors (Tables A and B, Paper 3 and 4 grids) are in the specimen mark schemes, not in the syllabus; our 'levels' descriptors for self-marked answers are our own wording and a reviewer must check them against the published grids. Part marks within Paper 1 and Paper 2 questions are as printed; the Paper 3 and Paper 4 questions are single questions.",
    "Source questions use invented sources, labelled as such, never attributed to real people; Paper 3 extracts are invented, unattributed passages of up to 600 words written in the style of a historian, never real historians' words.",
    "Many concepts are shared with ZIMSEC (ahist.*); lessons are written to the depth of the deeper board. Cambridge specifies detail (for example Calonne, the Carlsbad Decrees, Bunge, OVRA, Mefo Bills, the Stakhanovite movement) that ZIMSEC does not name; ZIMSEC detail that Cambridge does not name (Italy's unification, the course of the wars, China, the organisations) is marked as such in the concept descriptions.",
    "This syllabus is for examination in 2027-2029. Candidates from 2030 will follow a later syllabus (not in the repository); check the Cambridge website and add a new version file.",
  ],
  overview: "Cambridge International AS & A Level History (9489) is a two-stage course. At AS Level candidates study one option (European, American or International) for a sources paper and an outline-study paper; each option has three topics divided into four key questions. The European option covers France 1774-1814, liberalism and nationalism in Germany 1815-71 and Russia from autocracy to revolution 1881-1924. At A Level candidates also study one historians' debate (the origins of the First World War, the Holocaust or the origins and development of the Cold War) and one depth-study option, such as European history 1919-41 (Mussolini's Italy, Stalin's Russia, Hitler's Germany).",
  assessmentOverview: "AS Level candidates take Paper 1 Historical Sources (1 hour 15 minutes, 40 marks) and Paper 2 Outline Study (1 hour 45 minutes, 60 marks). A Level candidates also take Paper 3 Historical Interpretations (1 hour 15 minutes, 40 marks) and Paper 4 Depth Study (1 hour 45 minutes, 60 marks), in the same series or after carrying forward their AS result.",
  components: [
    { code: "1", name: "Paper 1: Historical Sources", kind: "WRITTEN", description: "One two-part question on four sources from the prescribed topic of one option: (a) compare two sources (15 marks), (b) how far the sources support a statement (25 marks). 40% of AS Level, 20% of A Level.", durationMinutes: 75, maxMarks: 40, weightingPercent: 20 },
    { code: "2", name: "Paper 2: Outline Study", kind: "WRITTEN", description: "Two two-part questions on one option: (a) explain why (10 marks), (b) a balanced judgement (20 marks). 60% of AS Level, 30% of A Level.", durationMinutes: 105, maxMarks: 60, weightingPercent: 30 },
    { code: "3", name: "Paper 3: Historical Interpretations", kind: "WRITTEN", description: "One 40-mark question on an extract from a historian's writing, on one of three topics: what can be learned about the interpretation and approach of the historian. 20% of A Level.", durationMinutes: 75, maxMarks: 40, weightingPercent: 20 },
    { code: "4", name: "Paper 4: Depth Study", kind: "WRITTEN", description: "Two 30-mark questions from a choice of three on one depth-study option ('Assess' or 'Evaluate'). 30% of A Level.", durationMinutes: 105, maxMarks: 60, weightingPercent: 30 },
  ],
  routes: [
    { code: "AS", name: "AS Level", description: "Papers 1 and 2 (grades a-e). Also the first year of the staged A Level route.", components: ["1", "2"] },
    { code: "A", name: "A Level", description: "All four papers, in one series or staged (AS Level carried forward, then Papers 3 and 4) (grades A*-E).", isDefault: true, components: ["1", "2", "3", "4"] },
  ],
  topics: C9489_TOPICS,
};

// =====================================================================================================================
// Checks: every covered concept exists, each concept is covered at most once per syllabus (on the most specific node),
// every concept is covered by at least one syllabus, node keys and objective codes are unique; report what each
// syllabus leaves out. Then label each concept description with its coverage.
const coverage = new Map(); // concept -> { zimsec?: form, cambridge?: stage }
for (const s of [zimsec, c9489]) {
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
      if ((n.covers ?? []).length && !(n._form || n._stage)) throw new Error(`${s.board}: ${n.key} covers concepts but has no form/stage`);
      for (const c of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: unknown concept ${c} on ${n.key}`);
        if (seen.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: ${c} covered on ${seen.get(c)} and ${n.key}`);
        seen.set(c, n.key);
        const prev = coverage.get(c) ?? {};
        // A concept covered by several Cambridge nodes of different stages cannot happen (once per syllabus).
        coverage.set(c, { ...prev, [s.board]: n._form ?? n._stage });
      }
      for (const ob of n.objectives ?? []) {
        if (codes.has(ob.code)) throw new Error(`${s.board}: duplicate objective code ${ob.code}`);
        codes.add(ob.code);
      }
      walk(n.children ?? []);
    }
  };
  walk(s.topics);
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${s.topics.length} top-level nodes, ${nodes} nodes, ${seen.size} concepts covered, ${codes.size} objectives; not covered (${missing.length}): ${missing.join(", ") || "none"}\n`);
}
const orphans = [...CONCEPT_KEYS].filter((k) => !coverage.has(k));
if (orphans.length) throw new Error(`concepts no syllabus covers: ${orphans.join(", ")}`);

const label = (cv) => {
  if (cv.zimsec && cv.cambridge) return `Both boards (ZIMSEC ${cv.zimsec}; Cambridge ${cv.cambridge}).`;
  if (cv.zimsec) return `ZIMSEC only (${cv.zimsec}).`;
  return `Cambridge only (${cv.cambridge}).`;
};
const shared = [...coverage.values()].filter((c) => c.zimsec && c.cambridge).length;
console.log(`${CONCEPTS.length} concepts in the registry (${shared} shared, ${[...coverage.values()].filter((c) => !c.cambridge).length} ZIMSEC only, ${[...coverage.values()].filter((c) => !c.zimsec).length} Cambridge only)`);

const registry = {
  family: "history-a",
  name: "History (A-Level / AS & A Level)",
  level: "A",
  prefix: "ahist",
  subjects: ["zimsec/a-level/history", "cambridge/a-level/history"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description: `${label(coverage.get(key))} ${description}` })),
};

const strip = (k, v) => (k.startsWith("_") ? undefined : v);
const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, strip, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/history-a.json", registry);
write("content/syllabi/zimsec/a-level/history/2015-2022.json", zimsec);
write("content/syllabi/cambridge/a-level/history/2027-2029.json", c9489);
