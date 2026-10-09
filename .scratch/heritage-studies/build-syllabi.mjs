// Builds content/concepts/heritage-studies-o.json and the Heritage Studies syllabus file:
//   content/syllabi/zimsec/o-level/heritage-studies/2015-2022.json
// Source (local only, not in git): .scratch/heritage-studies/sources/zimsec-heritage-studies.pdf (+ .txt), Ministry
// file "Heritage Brainstorming Forms 1 -4.pdf" (cover: Heritage Studies Syllabus, Forms 1 - 4, 2015 - 2022).
// The concept registry lives in ./concepts.mjs.
// Run from the repo root: node .scratch/heritage-studies/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";
import { CONCEPTS } from "./concepts.mjs";

const ROOT = process.cwd();
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept key in concepts.mjs");
for (const [k] of CONCEPTS) if (!/^her\.[a-z0-9-]+\.[a-z0-9-]+$/.test(k)) throw new Error(`bad concept key ${k}`);
const names = new Set();
for (const [k, n] of CONCEPTS) {
  if (names.has(n)) throw new Error(`duplicate concept name "${n}" (${k})`);
  names.add(n);
}

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. Objectives are our own paraphrase; their codes are node code + .n (ours).
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, children } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) n.objectives = objectives.map((o, i) => (Array.isArray(o) ? { code: o[0], text: o[1] } : { code: `${code}.${i + 1}`, text: o }));
  if (components) n.components = components;
  if (children) n.children = children;
  return n;
};
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);

// ---------------------------------------------------------------------------------------------------------------------
// ZIMSEC O-Level Heritage Studies, Forms 1-4, 2015-2022. Topic numbers 1-9 are the syllabus topics (5.0, and the
// "TOPIC n" headings of the scope and sequence 6.0 and competency matrix 7.0); sub-topics follow the key concepts of
// the competency matrix (Forms 1-4), merged across forms where the same key concept recurs; sub-topic and objective
// codes are ours. Both papers examine every topic (content distribution, 8.3).
const BOTH = ["1", "2"];
const TOPICS = [
  topic("socialisation", "1", "Socialisation", {
    components: BOTH,
    children: [
      sub("socialisation.home", "1.1", "Socialisation in the home", {
        description: "Form 1.",
        covers: ["her.socialisation.home"],
        objectives: [
          "Form 1: define socialisation and list the agents of socialisation in the home.",
          "Form 1: examine the role of each family member in socialisation.",
        ],
      }),
      sub("socialisation.school-peers", "1.2", "Role of the school and of peers in socialisation", {
        description: "Form 2.",
        covers: ["her.socialisation.school-peers"],
        objectives: [
          "Form 2: explain the role of the school in socialisation (rules, punctuality, discipline).",
          "Form 2: state the role of peers in socialisation and analyse their impact.",
        ],
      }),
      sub("socialisation.community-religion", "1.3", "Role of the community and of religious beliefs in socialisation", {
        description: "Form 3.",
        covers: ["her.socialisation.community-religion"],
        objectives: [
          "Form 3: explain how the community socialises its members.",
          "Form 3: describe the role of religious beliefs and religious groups in socialisation.",
        ],
      }),
      sub("socialisation.media", "1.4", "Role of the media in socialisation and responsible use of the media", {
        description: "Forms 2 and 3.",
        covers: ["her.socialisation.media"],
        objectives: [
          "Form 2: identify types of media and describe their role in socialisation.",
          "Form 2: use appropriate media content responsibly.",
          "Form 3: describe the effects of the media in socialisation and explain the advantages and disadvantages of the media as a socialising agent.",
        ],
      }),
      sub("socialisation.ict", "1.5", "Information and Communication Technologies in socialisation", {
        description: "Form 4.",
        covers: ["her.socialisation.ict"],
        objectives: [
          "Form 4: describe the role of ICT in socialisation.",
          "Form 4: explain the positive and negative effects of ICT in socialisation.",
        ],
      }),
    ],
  }),
  topic("identity", "2", "Identity: Family, Local and National Identity", {
    components: BOTH,
    children: [
      sub("identity.families", "2.1", "Types of families", {
        description: "Form 1.",
        covers: ["her.identity.families"],
        objectives: [
          "Form 1: identify different types of families and distinguish the relationships within them.",
          "Form 1: assess the roles of family members in the home, the community and the nation.",
        ],
      }),
      sub("identity.language", "2.2", "Language and national identity", {
        description: "Form 1 (proverbs, idioms, riddles and folklore are listed as language aspects that carry identity; they are taught in 2.10).",
        covers: ["her.identity.language-identity"],
        objectives: [
          "Form 1: identify aspects of language that carry national identity.",
          "Form 1: explain the link between language and identity.",
        ],
      }),
      sub("identity.tools", "2.3", "Indigenous hunting and production tools", {
        description: "Form 1.",
        covers: ["her.identity.tools"],
        objectives: [
          "Form 1: identify indigenous hunting and production tools.",
          "Form 1: explain how indigenous hunting and production tools were used.",
        ],
      }),
      sub("identity.personal-identity", "2.4", "Forms of personal identity and national identification documents", {
        description: "Form 1 (national identification documents: birth certificate, national identity card, passport) and Form 2 (forms of personal identity).",
        covers: ["her.identity.personal-identity"],
        objectives: [
          "Form 1: list the national identification documents and describe the contents of each.",
          "Form 1: explain the importance of national identification documents.",
          "Form 2: identify the forms of personal identity and explain the importance of identity documents.",
        ],
      }),
      sub("identity.totems", "2.5", "Totems, totem praises, genealogy and the purpose of totem systems", {
        description: "Form 2.",
        covers: ["her.identity.totems"],
        objectives: [
          "Form 2: list totems and recite or present totem praises.",
          "Form 2: trace their genealogy through a family tree.",
          "Form 2: explain the significance of totem systems.",
        ],
      }),
      sub("identity.herbs", "2.6", "Indigenous herbs", {
        description: "Form 2.",
        covers: ["her.identity.herbs"],
        objectives: [
          "Form 2: identify indigenous herbs and explain their traditional uses.",
          "Form 2: explain the value of indigenous knowledge about herbs and the need to conserve them.",
        ],
      }),
      sub("identity.languages-cultures", "2.7", "Indigenous languages and cultures of the people of Zimbabwe", {
        description: "Form 2.",
        covers: ["her.identity.languages-cultures"],
        objectives: [
          "Form 2: identify the indigenous languages and cultures of the people of Zimbabwe.",
          "Form 2: explain the importance of upholding indigenous languages and cultures.",
        ],
      }),
      sub("identity.community", "2.8", "Family and the community; indigenous community gatherings, ceremonies and events", {
        description: "Form 3.",
        covers: ["her.identity.community-gatherings"],
        objectives: [
          "Form 3: describe the role of the family and the community in shaping one's identity.",
          "Form 3: identify indigenous community gatherings, ceremonies and events and the ceremonial tools used.",
          "Form 3: explain the significance of indigenous gatherings, ceremonies and events.",
        ],
      }),
      sub("identity.marriages", "2.9", "Indigenous and contemporary marriages", {
        description: "Form 4.",
        covers: ["her.identity.marriage-types"],
        objectives: [
          "Form 4: explain the advantages and disadvantages of monogamy and polygamy.",
          "Form 4: identify types of contemporary marriage and state their advantages and disadvantages.",
        ],
      }),
      sub("identity.wise-sayings", "2.10", "Indigenous wise sayings", {
        description: "Form 4 (types of wise sayings: proverbs, idioms, riddles, folklore); also Form 1, where they are taught as aspects of language and identity.",
        covers: ["her.identity.wise-sayings"],
        objectives: [
          "Form 4: identify the types of indigenous wise sayings.",
          "Form 4: explain the significance of folklore, idioms, riddles and other wise sayings.",
        ],
      }),
      sub("identity.religious-practices", "2.11", "Indigenous religious practices", {
        description: "Form 4.",
        covers: ["her.identity.religious-practices"],
        objectives: [
          "Form 4: state the different indigenous religious practices and identify the forms of spirits.",
          "Form 4: describe indigenous religious practices and explain their significance.",
        ],
      }),
    ],
  }),
  topic("culture", "3", "Cultural Heritage: Norms and Values", {
    components: BOTH,
    children: [
      sub("culture.unhu", "3.1", "The concept of Unhu/Ubuntu/Vumunhu", {
        description: "Form 1.",
        covers: ["her.culture.unhu"],
        objectives: [
          "Form 1: define Unhu/Ubuntu/Vumunhu and state its attributes.",
          "Form 1: explain the importance of Unhu/Ubuntu/Vumunhu.",
        ],
      }),
      sub("culture.norms-values", "3.2", "Norms and values at home, at school and in the community", {
        description: "Form 1 (norms and values at home, school, community and workplace) and Form 2 (norms and values in the community).",
        covers: ["her.culture.norms-values"],
        objectives: [
          "Form 1: identify and describe the norms and values of the home, the school and the community.",
          "Form 2: analyse the importance of norms and values in the community.",
        ],
      }),
      sub("culture.workplace", "3.3", "Norms and values at the workplace", {
        description: "Form 3.",
        covers: ["her.culture.workplace"],
        objectives: [
          "Form 3: identify norms and values at the workplace and explain their significance.",
          "Form 3: analyse threats to norms and values at the workplace.",
        ],
      }),
      sub("culture.indigenous-features", "3.4", "Main features of indigenous Zimbabwean culture", {
        description: "Form 2.",
        covers: ["her.culture.indigenous-features"],
        objectives: ["Form 2: describe the main features of indigenous Zimbabwean culture."],
      }),
      sub("culture.inheritance", "3.5", "Inheritance and heirship", {
        description: "Form 1 (concept of inheritance, indigenous and contemporary heirship), Form 2 (indigenous practices; tangible and intangible inheritance) and Form 3 (contemporary families; the will).",
        covers: ["her.culture.inheritance-indigenous", "her.culture.inheritance-contemporary"],
        objectives: [
          "Form 1: explain heirship and describe indigenous and contemporary heirship practices.",
          "Form 2: describe the inheritance and heirship practices of indigenous families and distinguish tangible from intangible inheritance.",
          "Form 3: describe inheritance and heirship practices in contemporary societies, including the use of a will.",
        ],
      }),
      sub("culture.rites-of-passage", "3.6", "Rites of passage", {
        description: "Form 1 (rites associated with adolescence; the age of consent to sex and to marriage).",
        covers: ["her.culture.rites-of-passage"],
        objectives: [
          "Form 1: explain rites of passage in different ethnic groups in Zimbabwe and their importance.",
          "Form 1: describe the implications of the age of consent and discuss the age of consent to marriage under the Constitution.",
        ],
      }),
      sub("culture.courtship", "3.7", "Indigenous and contemporary courtship practices", {
        description: "Form 1 (indigenous courtship practices of different ethnic groups), Form 2 (contemporary courtship) and Form 3 (indigenous and contemporary courtship).",
        covers: ["her.culture.courtship"],
        objectives: [
          "Form 1: identify indigenous courtship practices and outline their advantages and disadvantages.",
          "Form 2: list contemporary courtship practices and compare them with indigenous practices.",
          "Form 3: evaluate indigenous and contemporary courtship practices.",
        ],
      }),
      sub("culture.marriage-practices", "3.8", "Indigenous marriage practices and marriage counsellors", {
        description: "Form 2 (indigenous marriage counsellors and the counselling process) and Form 3 (indigenous marriage practices; the value of marriage).",
        covers: ["her.culture.marriage-practices"],
        objectives: [
          "Form 2: explain the role of indigenous marriage counsellors and describe the counselling process.",
          "Form 3: describe indigenous marriage practices and explain the value of marriage.",
        ],
      }),
      sub("culture.birth-death-rites", "3.9", "Birth and death rites and ceremonies", {
        description: "Form 2 (birth and death rites among the features of indigenous culture) and Form 3.",
        covers: ["her.culture.birth-death-rites"],
        objectives: [
          "Form 3: describe birth and death rites and ceremonies.",
          "Form 3: explain the significance of birth and death rites and ceremonies.",
        ],
      }),
      sub("culture.entertainment", "3.10", "Indigenous entertainment", {
        description: "Forms 1 and 2.",
        covers: ["her.culture.entertainment"],
        objectives: [
          "Form 1: identify forms of indigenous entertainment and outline their other uses.",
          "Form 2: explain the significance of indigenous forms of entertainment.",
        ],
      }),
      sub("culture.arts-sport", "3.11", "Dance and drama; sport, arts and culture", {
        description: "Form 3 (dance and drama) and Form 4 (sport, arts and culture).",
        covers: ["her.culture.arts-sport"],
        objectives: [
          "Form 3: explain dance and drama as forms of entertainment, leisure and employment.",
          "Form 4: explain the importance of sport, arts and culture.",
        ],
      }),
      sub("culture.foreign-influences", "3.12", "Zimbabwean and foreign norms and values; threats to indigenous culture", {
        description: "Form 4.",
        covers: ["her.culture.foreign-influences"],
        objectives: [
          "Form 4: compare Zimbabwean and foreign norms and values and explain their significance.",
          "Form 4: identify and discuss threats to indigenous culture in Zimbabwe.",
        ],
      }),
      sub("culture.men-women-marriage", "3.13", "Men and women in marriage", {
        description: "Form 4.",
        covers: ["her.culture.men-women-marriage"],
        objectives: ["Form 4: describe the roles of men and women in marriage and explain how they are changing."],
      }),
    ],
  }),
  topic("history", "4", "National History: Sovereignty and Governance", {
    components: BOTH,
    children: [
      sub("history.precolonial-societies", "4.1", "Pre-colonial societies: hunter-gatherer and herder communities", {
        description: "Form 1.",
        covers: ["her.precolonial.san-khoi"],
        objectives: [
          "Form 1: identify the hunter-gatherer and herder communities and describe the economic, social and political systems of the San and the Khoikhoi.",
          "Form 1: explain the heritage passed on by the San and the Khoikhoi.",
        ],
      }),
      sub("history.political-structures", "4.2", "Indigenous political structures", {
        description: "Form 1.",
        covers: ["her.precolonial.political-structures"],
        objectives: [
          "Form 1: outline the hierarchy of indigenous leaders and explain the significance of chieftainship.",
          "Form 1: describe how indigenous leaders are installed.",
        ],
      }),
      sub("history.early-iron-age", "4.3", "Early Iron Age societies", {
        description: "Form 2.",
        covers: ["her.precolonial.early-iron-age"],
        objectives: ["Form 2: identify Early Iron Age societies and outline their social, economic and political activities."],
      }),
      sub("history.late-iron-age", "4.4", "Late Iron Age states", {
        description: "Form 2. The states are not named in the text rendering; Great Zimbabwe, Mutapa, Torwa, Rozvi and Ndebele are the usual set (see notes).",
        covers: ["her.precolonial.great-zimbabwe-mutapa", "her.precolonial.rozvi-ndebele"],
        objectives: ["Form 2: identify Late Iron Age states and outline their social, economic and political activities."],
      }),
      sub("history.iron-age-contributions", "4.5", "Contribution of Iron Age communities to contemporary societies", {
        description: "Form 2.",
        covers: ["her.precolonial.iron-age-contributions"],
        objectives: ["Form 2: list the contributions of Iron Age communities to contemporary societies and assess their significance."],
      }),
      sub("history.foreign-agents", "4.6", "Missionaries, explorers, traders, concession seekers, adventurers and hunters", {
        description: "Form 2.",
        covers: ["her.colonisation.foreign-agents"],
        objectives: [
          "Form 2: identify the foreign groups involved in the colonisation of Zimbabwe.",
          "Form 2: examine the role each group played in colonisation.",
        ],
      }),
      sub("history.colonisation", "4.7", "Colonisation", {
        description: "Form 3 (the Berlin Conference; treaties leading to colonisation).",
        covers: ["her.colonisation.colonisation"],
        objectives: [
          "Form 3: explain the causes of colonisation and outline the resolutions of the Berlin Conference.",
          "Form 3: identify the treaties that led to the colonisation of Zimbabwe and outline their terms.",
        ],
      }),
      sub("history.anglo-ndebele-war", "4.8", "The Anglo-Ndebele War (1893-94)", {
        description: "Form 3.",
        covers: ["her.colonisation.anglo-ndebele-war"],
        objectives: [
          "Form 3: identify the factors that led to the Anglo-Ndebele War.",
          "Form 3: explain the course of the war and outline its effects.",
        ],
      }),
      sub("history.first-chimurenga", "4.9", "The First Chimurenga/Umvukela (1896-97)", {
        description: "Form 3.",
        covers: ["her.colonisation.first-chimurenga"],
        objectives: [
          "Form 3: outline the causes of the First Chimurenga/Umvukela and describe its events.",
          "Form 3: explain the role played by spirit mediums and assess the results.",
        ],
      }),
      sub("history.first-chimurenga-heroes", "4.10", "Heroes and heroines of the First Chimurenga/Umvukela", {
        description: "Form 3.",
        covers: ["her.colonisation.first-chimurenga-heroes"],
        objectives: [
          "Form 3: identify the heroes and heroines of the First Chimurenga/Umvukela.",
          "Form 3: explain the roles they played.",
        ],
      }),
      sub("history.expropriation", "4.11", "Expropriation of resources in colonial Zimbabwe", {
        description: "Form 3 (scope and sequence). The matrix rows are scrambled; ownership of natural resources during the colonial era (Topic 5, Form 3) is taught here too.",
        covers: ["her.colonisation.expropriation"],
        objectives: [
          "Form 3: describe how land and other resources were taken from indigenous people during the colonial era.",
          "Form 3: explain how colonialism prevented Zimbabweans from accessing their natural resources.",
        ],
      }),
      sub("history.liberation-struggle", "4.12", "The Liberation Struggle/Second Chimurenga/Umvukela (1966-79)", {
        description: "Form 3.",
        covers: ["her.liberation.second-chimurenga", "her.liberation.roles-heroes"],
        objectives: [
          "Form 3: outline the causes of the Second Chimurenga/Umvukela and describe its course.",
          "Form 3: describe the roles played by the masses, freedom fighters, mujibhas and chimbwidos and spirit mediums.",
          "Form 3: identify national heroes and heroines and discuss the results of the liberation struggle.",
        ],
      }),
      sub("history.independent-zimbabwe", "4.13", "Independent Zimbabwe", {
        description: "Form 4 (social gains; land reform; access to health facilities; the Unity Accord 1987; challenges faced after independence: sanctions, natural disasters).",
        covers: ["her.independence.gains", "her.independence.challenges"],
        objectives: [
          "Form 4: describe the social, economic and political gains made after independence.",
          "Form 4: analyse the challenges faced by the government after 1980.",
        ],
      }),
      sub("history.local-government", "4.14", "Local government structures", {
        description: "Form 4.",
        covers: ["her.governance.local-government"],
        objectives: [
          "Form 4: outline local government structures and describe their functions.",
          "Form 4: assess the role of local authorities in governance.",
        ],
      }),
      sub("history.systems-of-governance", "4.15", "Systems of governance", {
        description: "Form 4.",
        covers: ["her.governance.systems"],
        objectives: [
          "Form 4: identify the different systems of governance.",
          "Form 4: compare democracy and autocracy.",
        ],
      }),
      sub("history.central-government", "4.16", "Structures and functions of the central government", {
        description: "Form 4.",
        covers: ["her.governance.central-government"],
        objectives: [
          "Form 4: identify the arms of central government.",
          "Form 4: discuss the functions of the arms of government and explain the importance of government.",
        ],
      }),
      sub("history.social-services", "4.17", "Government as a social service provider", {
        description: "Form 4.",
        covers: ["her.governance.social-services"],
        objectives: ["Form 4: describe the social services provided by the government and explain their importance."],
      }),
      sub("history.organisations", "4.18", "Zimbabwe as a member of regional and international organisations", {
        description: "Form 4 (SADC, AU, NAM and the UN are named; COMESA appears in the abbreviations list).",
        covers: ["her.governance.regional-organisations", "her.governance.international-organisations"],
        objectives: [
          "Form 4: identify the regional and international organisations of which Zimbabwe is a member.",
          "Form 4: explain the benefits of Zimbabwe's membership of these organisations.",
        ],
      }),
    ],
  }),
  topic("heritage", "5", "National Heritage", {
    components: BOTH,
    children: [
      sub("heritage.symbols-monuments-shrines", "5.1", "National symbols, monuments and shrines", {
        description: "Form 1 (national symbols, monuments and shrines) and Form 3 (national shrines and monuments).",
        covers: ["her.heritage.national-symbols", "her.heritage.monuments-shrines"],
        objectives: [
          "Form 1: identify national symbols, shrines and monuments.",
          "Form 1: explain the significance of national symbols, shrines and monuments.",
          "Form 3: identify national shrines and monuments in Zimbabwe and explain their significance.",
        ],
      }),
      sub("heritage.national-events", "5.2", "National events and celebrations; participation in and commemoration of national events", {
        description: "Form 2.",
        covers: ["her.heritage.national-events"],
        objectives: [
          "Form 2: identify national events and celebrations and explain their significance.",
          "Form 2: explain the significance of participating in and commemorating national events.",
        ],
      }),
      sub("heritage.heritage-sites", "5.3", "World heritage sites and other heritage sites", {
        description: "Form 3 (national shrines, monuments and world heritage sites) and Form 4 (heritage sites: liberation war heritage sites in neighbouring countries; world heritage sites).",
        covers: ["her.heritage.world-heritage-sites", "her.heritage.liberation-sites"],
        objectives: [
          "Form 3: identify world heritage sites in Zimbabwe and explain their significance.",
          "Form 4: identify liberation war heritage sites in neighbouring countries and examine their importance.",
          "Form 4: assess the importance of world heritage sites.",
        ],
      }),
      sub("heritage.schools-pledge", "5.4", "The National Schools Pledge", {
        description: "Forms 1 to 4 (taught every year).",
        covers: ["her.heritage.schools-pledge"],
        objectives: [
          "Forms 1-4: recite the National Schools Pledge and explain its significance.",
          "Form 4: relate the National Schools Pledge to the national flag and anthem.",
        ],
      }),
      sub("heritage.natural-resources", "5.5", "Natural resources", {
        description: "Forms 1 to 4: definition, types and importance (Forms 1 and 2); key resources in national development and their ownership in the colonial era (Form 3); strategies for increasing indigenous access to natural resources (Form 4).",
        covers: ["her.heritage.natural-resources", "her.heritage.resource-ownership"],
        objectives: [
          "Form 1: define natural resources, identify them and explain their importance.",
          "Form 2: explain the importance of natural resources as heritage.",
          "Form 3: describe the ownership of natural resources during the colonial era and outline government efforts to redistribute them.",
          "Form 4: examine and evaluate the strategies used to improve indigenous people's access to natural resources.",
        ],
      }),
    ],
  }),
  topic("constitution", "6", "Constitution of Zimbabwe", {
    components: BOTH,
    children: [
      sub("constitution.making", "6.1", "The constitution-making process", {
        description: "Form 1.",
        covers: ["her.constitution.making"],
        objectives: [
          "Form 1: explain the process of making a constitution and the rationale for a new constitution.",
          "Form 1: describe the role of citizens in making the Zimbabwean Constitution.",
        ],
      }),
      sub("constitution.declaration-of-rights", "6.2", "Declaration of Rights in Zimbabwe", {
        description: "Form 2.",
        covers: ["her.constitution.declaration-of-rights"],
        objectives: ["Form 2: identify and discuss the rights in the Declaration of Rights."],
      }),
      sub("constitution.citizenship", "6.3", "Zimbabwean citizenship", {
        description: "Form 2.",
        covers: ["her.constitution.citizenship"],
        objectives: [
          "Form 2: define citizenship and explain the different forms of citizenship in Zimbabwe (by birth, descent and registration).",
          "Form 2: analyse the importance of citizenship.",
        ],
      }),
      sub("constitution.laws-courts", "6.4", "Rules and laws of Zimbabwe", {
        description: "Form 2 (rules and laws; types, hierarchy and jurisdiction of courts).",
        covers: ["her.constitution.laws-courts"],
        objectives: [
          "Form 2: distinguish rules from laws and identify the types of courts in Zimbabwe.",
          "Form 2: describe the functions and jurisdiction of Zimbabwe's courts.",
        ],
      }),
      sub("constitution.key-features", "6.5", "Contents and key features of the Constitution", {
        description: "Form 1 (contents and importance of the Constitution) and Form 3 (key features: tiers of government, the Declaration of Rights, health and education, languages of Zimbabwe).",
        covers: ["her.constitution.contents"],
        objectives: [
          "Form 1: summarise the contents of the Zimbabwean Constitution and explain its importance.",
          "Form 3: identify the key features of the Constitution and explain their significance.",
        ],
      }),
      sub("constitution.electoral-system", "6.6", "The electoral system", {
        description: "Form 3.",
        covers: ["her.constitution.electoral-system"],
        objectives: ["Form 3: describe the Zimbabwean electoral system."],
      }),
      sub("constitution.home-grown", "6.7", "The Lancaster House constitution and the new constitution", {
        description: "Form 4.",
        covers: ["her.constitution.lancaster-to-2013"],
        objectives: [
          "Form 4: outline the provisions of the Lancaster House constitution.",
          "Form 4: explain the reasons for the enactment of a new constitution and assess the importance of a home-grown constitution.",
        ],
      }),
    ],
  }),
  topic("rights", "7", "Rights and Responsibilities", {
    components: BOTH,
    children: [
      sub("rights.indigenous-entitlements", "7.1", "Indigenous entitlements of men and women", {
        description: "Form 1 (indigenous entitlements: motherhood and fatherhood) and Form 4 (entitlements of men and women in indigenous societies).",
        covers: ["her.rights.indigenous-entitlements"],
        objectives: [
          "Form 1: list indigenous forms of entitlement and examine the importance of the entitlements of motherhood and fatherhood.",
          "Form 4: explain the entitlements of men and women in indigenous society.",
        ],
      }),
      sub("rights.children", "7.2", "Children's rights and responsibilities", {
        description: "Form 1 (at home) and Form 2 (at school).",
        covers: ["her.rights.children"],
        objectives: [
          "Form 1: state the rights and responsibilities of children and distinguish between them.",
          "Form 2: explain children's rights and responsibilities at school.",
        ],
      }),
      sub("rights.citizens", "7.3", "Roles and responsibilities of citizens; civic responsibilities at community and national level", {
        description: "Form 2 (roles and responsibilities of Zimbabwean citizens) and Form 3 (civic responsibilities).",
        covers: ["her.rights.civic-responsibilities"],
        objectives: [
          "Form 2: describe the roles and responsibilities of Zimbabwean citizens.",
          "Form 3: identify and explain civic responsibilities at community and national level.",
        ],
      }),
      sub("rights.voluntary-activities", "7.4", "Participation in voluntary community activities", {
        description: "Form 2 (participation) and Form 4 (community needs that require voluntary intervention; rural and urban needs).",
        covers: ["her.rights.voluntary-activities"],
        objectives: [
          "Form 2: identify voluntary community activities and explain their importance.",
          "Form 4: describe community needs that require voluntary intervention and distinguish rural from urban needs.",
        ],
      }),
      sub("rights.vulnerable-groups", "7.5", "Rights and responsibilities of vulnerable groups", {
        description: "Form 3.",
        covers: ["her.rights.vulnerable-groups"],
        objectives: ["Form 3: explain the rights and responsibilities of the elderly, persons with disabilities, women, war veterans and other vulnerable groups."],
      }),
      sub("rights.gender", "7.6", "Gender equity and equality in contemporary Zimbabwe", {
        description: "Form 4.",
        covers: ["her.rights.gender-equality", "her.rights.gender-based-violence"],
        objectives: [
          "Form 4: define gender equity and equality and analyse gender roles in contemporary society.",
          "Form 4: identify international conventions on gender equity and equality.",
          "Form 4: identify types of gender-based violence and examine the strengths and weaknesses of gender advocates.",
        ],
      }),
    ],
  }),
  topic("production", "8", "Production, Distribution of Goods and Services", {
    components: BOTH,
    children: [
      sub("production.factors", "8.1", "Factors of production", {
        description: "Form 1 (the factors and their significance) and Form 4 (access to the factors of production; government efforts).",
        covers: ["her.production.factors"],
        objectives: [
          "Form 1: identify the factors of production and describe their significance.",
          "Form 4: analyse government efforts to help people access the factors of production.",
        ],
      }),
      sub("production.industry", "8.2", "Concept of industry and types of industries", {
        description: "Form 1 (indigenous and contemporary industry) and Form 2 (types of industries).",
        covers: ["her.production.industry"],
        objectives: [
          "Form 1: identify types of industries in early Zimbabwean societies and describe contemporary industries in Zimbabwe.",
          "Form 2: describe the types of industries and the economic activities in each.",
        ],
      }),
      sub("production.informal-sector", "8.3", "The informal sector", {
        description: "Form 1 (characteristics and importance), Form 2 (formal and informal sectors) and Form 3 (constraints to the informal sector).",
        covers: ["her.production.informal-sector"],
        objectives: [
          "Form 1: describe the characteristics of the informal sector and explain its importance.",
          "Form 2: distinguish between the formal and informal sectors.",
          "Form 3: identify the constraints to the informal sector and suggest solutions.",
        ],
      }),
      sub("production.food-storage", "8.4", "Storage of indigenous and contemporary foods", {
        description: "Form 1.",
        covers: ["her.production.food-storage"],
        objectives: [
          "Form 1: list indigenous and contemporary foods and describe how they are stored and preserved.",
          "Form 1: explain the importance of indigenous and contemporary foods.",
        ],
      }),
      sub("production.indigenous-conservation", "8.5", "Indigenous conservation and management of resources", {
        description: "Form 2.",
        covers: ["her.production.indigenous-conservation"],
        objectives: [
          "Form 2: describe indigenous methods of conserving and managing natural resources.",
          "Form 2: assess the effectiveness of indigenous ways of conserving natural resources.",
        ],
      }),
      sub("production.manufacturing", "8.6", "Contemporary methods of manufacturing goods", {
        description: "Form 2.",
        covers: ["her.production.manufacturing"],
        objectives: ["Form 2: define manufacturing and outline the processes of manufacturing goods."],
      }),
      sub("production.land-ownership", "8.7", "Land ownership in Zimbabwe", {
        description: "Form 3 (effect of colonial laws on land ownership; measures to redistribute land since 1980); the land reform strategy of Topic 5 (Form 4) is taught here too.",
        covers: ["her.production.land-ownership"],
        objectives: [
          "Form 3: examine how colonial land laws affected indigenous people.",
          "Form 3: outline the measures taken by government to redistribute land since 1980.",
        ],
      }),
      sub("production.strategic-reserves", "8.8", "National strategic reserves", {
        description: "Form 3.",
        covers: ["her.production.strategic-reserves"],
        objectives: ["Form 3: describe the functions of national strategic reserves and explain their significance."],
      }),
      sub("production.inhibiting-factors", "8.9", "Factors inhibiting production", {
        description: "Form 4.",
        covers: ["her.production.inhibiting-factors"],
        objectives: ["Form 4: analyse the factors that inhibit production and suggest solutions."],
      }),
      sub("production.enterprise-skills", "8.10", "Enterprise skills and employment creation", {
        description: "Form 4.",
        covers: ["her.production.enterprise-skills"],
        objectives: [
          "Form 4: identify enterprise skills that promote employment creation.",
          "Form 4: examine how enterprise skills contribute to the growth of the economy.",
        ],
      }),
      sub("production.conservation", "8.11", "Conservation and preservation of resources", {
        description: "Form 4.",
        covers: ["her.production.resource-conservation"],
        objectives: [
          "Form 4: describe contemporary methods of conserving and preserving resources.",
          "Form 4: identify the institutions involved in conservation and explain their roles.",
        ],
      }),
    ],
  }),
  topic("global", "9", "Global Issues", {
    components: BOTH,
    children: [
      sub("global.environmental-issues", "9.1", "Environmental issues", {
        description: "Form 1.",
        covers: ["her.global.environmental-issues"],
        objectives: ["Form 1: identify the forms of natural resources and explain strategies for preserving them."],
      }),
      sub("global.pollution", "9.2", "Pollution", {
        description: "Forms 1 and 3.",
        covers: ["her.global.pollution"],
        objectives: [
          "Form 1: list types of pollution, describe their effects and suggest ways of reducing pollution.",
          "Form 3: identify types of pollution and assess the measures used to reduce it.",
        ],
      }),
      sub("global.hazards-disasters", "9.3", "Hazards, risks and disasters", {
        description: "Form 1 (hazards, risks and disasters; droughts and floods) and Form 2 (disasters: impact, mitigation and management).",
        covers: ["her.global.hazards-disasters"],
        objectives: [
          "Form 1: identify types of hazards, risks and disasters and describe the causes and effects of droughts and floods.",
          "Form 2: explain the impact of disasters and describe disaster mitigation and management measures.",
        ],
      }),
      sub("global.climate-change", "9.4", "Climate change", {
        description: "Form 2.",
        covers: ["her.global.climate-change"],
        objectives: [
          "Form 2: define climate change and outline its causes and effects.",
          "Form 2: explain adaptation and mitigation measures against climate change.",
        ],
      }),
      sub("global.land-degradation", "9.5", "Land degradation", {
        description: "Form 3.",
        covers: ["her.global.land-degradation"],
        objectives: [
          "Form 3: explain the causes and describe the effects of land degradation.",
          "Form 3: suggest measures to reduce land degradation.",
        ],
      }),
      sub("global.pandemics-chronic-illnesses", "9.6", "Pandemics and chronic illnesses", {
        description: "Form 3 in the scope and sequence; the Form 1 matrix also lists infectious and chronic diseases (diabetes, hypertension, HIV/AIDS, Ebola).",
        covers: ["her.global.pandemics", "her.global.chronic-illnesses"],
        objectives: [
          "Form 1: identify infectious and chronic diseases and explain their effects.",
          "Form 3: explain the causes of pandemics and chronic illnesses and assess their social, economic and political impact.",
          "Form 3: evaluate measures to mitigate pandemics and chronic illnesses.",
        ],
      }),
      sub("global.human-trafficking", "9.7", "Human trafficking", {
        description: "Forms 1 and 3.",
        covers: ["her.global.human-trafficking"],
        objectives: [
          "Form 1: describe forms of human trafficking and explain its impact on society.",
          "Form 3: explain the causes and effects of human trafficking and examine measures to prevent it.",
        ],
      }),
      sub("global.waste-management", "9.8", "Waste management", {
        description: "Form 4.",
        covers: ["her.global.waste-management"],
        objectives: ["Form 4: describe waste management strategies and approaches and evaluate their effectiveness."],
      }),
      sub("global.child-labour", "9.9", "Child labour", {
        description: "Form 4.",
        covers: ["her.global.child-labour"],
        objectives: [
          "Form 4: identify forms of child labour and examine the laws and conventions against it.",
          "Form 4: assess the difference between child labour and children's responsibilities.",
        ],
      }),
    ],
  }),
];

const zimsec = {
  board: "zimsec",
  qualification: "o-level",
  subject: "heritage-studies",
  versionLabel: "2015-2022",
  family: "heritage-studies-o",
  title: "ZIMSEC O-Level Heritage Studies",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Heritage Studies Syllabus, Forms 1 - 4, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at O Level",
    url: "https://www.mopsemashwest.gov.zw/files/Heritage%20Brainstorming%20Forms%201%20-4.pdf",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Topic names and their numbers (1 to 9) are transcribed from the syllabus topics (5.0) and the topic headings of the scope and sequence (6.0) and competency matrix (7.0) of the Ministry's Heritage Studies Syllabus Forms 1 - 4 (2015 - 2022); sub-topics follow the key concepts of the competency matrix, with the form in which each is taught. Sub-topic and objective codes are ours, and key concepts that recur in different forms are merged into one node. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-08): the Mashonaland West provincial education office's copy of the Ministry document, file 'Heritage Brainstorming Forms 1 -4.pdf' (http://www.mopsemashwest.gov.zw/files/Heritage%20Brainstorming%20Forms%201%20-4.pdf; the site's https certificate has expired, so the https form of the URL recorded here may not load), read through a pdftotext rendering. Despite the file name, the cover prints 'Heritage Studies Syllabus, Forms 1 - 4, 2015 - 2022' (Curriculum Development and Technical Services, 2015). Large parts of the competency matrix come out of the text rendering with two copies of the text overprinted (characters interleaved); the content of each key concept is read from the legible fragments and cross-checked against the scope and sequence (6.0), which is clean. Check every heading, the form of each item and each objective against a clean copy from ZIMSEC.",
    "Subject code: not printed in the syllabus document; confirm the ZIMSEC O-Level Heritage Studies code (left null).",
    "Version dates: assumed first examined in November 2018 (effectiveFrom 2018-01-01), as for the other 2015-2022 files. Under the Heritage-Based Curriculum (2024-2030) new syllabi were issued; confirm which syllabus the November 2026 and later O-Level Heritage Studies examinations use, set effectiveTo, and create a new version file when a new syllabus replaces this one.",
    "Assessment (8.0) as read: continuous assessment 30% (a theory test each term and a research assignment or project each year; Form 1 5, Form 2 5, Form 3 10, Form 4 10, each task marked out of 100) and summative assessment 70%: Paper 1 multiple choice (1 hour 15 minutes, 40 marks; 40 questions, all compulsory) and Paper 2 structured (2 hours, 100 marks). The paper weightings are printed as 20% and 80%, read here as shares of the summative 70%, i.e. 14% and 56% of the whole qualification (confirm). Continuous assessment is not a component here and is not simulated.",
    "Paper 2 as read: two sections. Section A has 6 short-answer questions, all compulsory. The sentence describing Section B is truncated in the document itself ('Se[ction B ...] essay questions and candidates answer any 2 questions'): the number of essay questions offered is not legible, and the marks of each section and question are not printed. Our convention (reviewer to check against recent papers): Section A 6 x 10 marks = 60, Section B 2 essays x 20 marks = 40, with the part structures given in the writers' brief.",
    "Content distribution (8.3) as read: both Paper 1 and Paper 2 cover all nine topics (no percentages printed). Skills distribution as read (columns scrambled; reconstructed): Paper 1 knowledge and understanding 60%, application 20%, problem solving 20%; Paper 2 knowledge and understanding 40%, application 30%, problem solving 30%.",
    "Matrix versus scope and sequence: the Form 1 matrix of Topic 9 includes pandemics and chronic illnesses (diabetes, hypertension, HIV/AIDS, Ebola), which the scope and sequence places in Form 3; both are merged in 9.6. Topic 5 Form 3 'ownership of natural resources during the colonial era' and Topic 4 Form 3 'expropriation of resources in colonial Zimbabwe' overlap and are taught in one concept (4.11); Topic 8 Form 3 'land ownership in Zimbabwe' and Topic 5 Form 4 'land reform' are taught in one concept (8.7). The names of the Late Iron Age states (4.4) and of some herbs (2.6) and forms of spirits (2.11) are illegible in the rendering; the usual set is taught. The Form 3 Topic 6 content reads 'Tiers of the constitution', taken to mean the tiers of government.",
    "The syllabus is in English with Shona and Ndebele terms (e.g. Unhu/Ubuntu/Vumunhu, mombe yeumai/inkomo yohlanga, mukwerera/ukucela izulu, kurova guva); lessons give the Shona and Ndebele terms side by side where the syllabus does and respect every cultural group equally.",
    "The constitution, institutions and national events are taught with well-established, dated facts (the 2013 Constitution as amended); the liberation struggle, the post-independence period, land reform and sanctions are taught in balanced, non-partisan wording (aims, achievements, recognised problems and different views; no slogans; no statistics unless widely documented). History topics overlap with the history-o family (hist.colonisation.*, hist.liberation.*, hist.independence.*); this family keeps its own lighter, heritage-focused concepts.",
  ],
  overview: "The ZIMSEC O-Level Heritage Studies syllabus (Forms 1-4) prepares learners to be responsible, informed citizens of Zimbabwe. It covers socialisation and identity (family, language, totems, ceremonies and marriage), cultural norms and values grounded in Unhu/Ubuntu/Vumunhu, the national history of Zimbabwe from pre-colonial societies through colonisation, resistance and the liberation struggle to independence and the structures of government, national heritage (symbols, monuments, shrines, heritage sites, national events and natural resources), the Constitution of Zimbabwe, rights and responsibilities, the production and distribution of goods and services, and global issues such as climate change, disasters, disease, human trafficking and child labour.",
  assessmentOverview: "Continuous assessment (theory tests and research projects in Forms 1-4) carries 30% and the examination 70%. Paper 1 (1 hour 15 minutes, 40 marks) has 40 compulsory multiple-choice questions. Paper 2 (2 hours, 100 marks) has Section A, six compulsory short-answer questions, and Section B, essay questions of which candidates answer any two. Both papers cover all nine topics.",
  components: [
    { code: "1", name: "Paper 1: Multiple choice", kind: "MULTIPLE_CHOICE", description: "40 compulsory four-option multiple-choice questions on all nine topics, 1 mark each.", durationMinutes: 75, maxMarks: 40, weightingPercent: 14 },
    { code: "2", name: "Paper 2: Structured", kind: "WRITTEN", description: "Section A: six compulsory short-answer (structured) questions. Section B: essay questions, of which candidates answer any two. All nine topics.", durationMinutes: 120, maxMarks: 100, weightingPercent: 56 },
  ],
  topics: TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Checks: every covered concept exists, each concept is covered exactly once (on a leaf node), node keys and
// objective codes are unique; report what the syllabus leaves out.
const seen = new Map();
const codes = new Set();
const keys = new Set();
let nodes = 0;
const walk = (list) => {
  for (const n of list) {
    nodes++;
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
console.log(`zimsec/o-level/heritage-studies/2015-2022: ${zimsec.topics.length} topics, ${nodes} nodes, ${seen.size} concepts covered, ${codes.size} objectives; not covered (${missing.length}): ${missing.join(", ") || "none"}`);
if (missing.length) throw new Error(`concepts no syllabus covers: ${missing.join(", ")}`);
const perTopic = zimsec.topics.map((t) => `${t.code} ${t.key}: ${(t.children ?? []).reduce((s, c) => s + (c.covers ?? []).length, 0)}`);
console.log(`concepts per topic: ${perTopic.join("; ")}`);
console.log(`${CONCEPTS.length} concepts in the registry`);

const registry = {
  family: "heritage-studies-o",
  name: "Heritage Studies (O-Level)",
  level: "O",
  prefix: "her",
  subjects: ["zimsec/o-level/heritage-studies"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description })),
};

const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/heritage-studies-o.json", registry);
write("content/syllabi/zimsec/o-level/heritage-studies/2015-2022.json", zimsec);
