// Slice W1a: wildlife conservation and management (ZIMSEC only). No disputed statistics; revenue figures fictional.
import { concept, P, pct, pctChange, money, fmtNum, table, agricultureLevels } from "../lib.mjs";

const rev = { total: 36000, wardPct: 55 };
const wardShare = (rev.total * rev.wardPct) / 100;

const hh = { ward: 9000, project: 60, households: 250 };
const perHh = (hh.ward * (100 - hh.project)) / 100 / hh.households;

const SNARES = [["Year 1", 480], ["Year 2", 410], ["Year 3", 300], ["Year 4", 216]];
const snareDrop = -pctChange(480, 216);

const SURVEY = [
  ["Miombo woodland", 46, 18],
  ["Riverine forest", 58, 22],
  ["Cleared farmland", 19, 4],
];
const lossBirds = pct(46 - 19, 46);

const CAMP = "In a fictional district bordering a national park, the rural district council has appropriate authority over wildlife under a CAMPFIRE arrangement. Safari hunting earns US\\$60,000 a year. Of this, 50% goes to the producer wards, 30% to the council and 20% to wildlife management. Elephants raid crops in the wards every season.";
const campWard = 60000 * 0.5;

concept("agri.wildlife.conservation-management", { file: "wildlife/conservation-management", keyPrefix: "wildlife.conservation-management" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the difference between **conservation** and **preservation**?",
    options: [
      ["Conservation allows sustainable use; preservation allows no use", "Correct: conservation manages use, preservation prevents it."],
      ["Conservation allows no use; preservation allows sustainable use", "This is the wrong way round."],
      ["Both mean hunting as many animals as possible", "Neither term means unlimited hunting."],
      ["Both apply only to plants, not to animals", "Both apply to plants and animals."],
    ],
    answer: "A",
    explanation: "Conservation is wise, sustainable use (e.g. quota hunting, regulated harvesting); preservation keeps a resource untouched (e.g. strict protection of rhinos or sacred forests).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **CITES** control?",
    options: [
      ["International trade in endangered species and their products", "Correct: it is the Convention on International Trade in Endangered Species of Wild Fauna and Flora."],
      ["Hunting seasons inside Zimbabwe's communal areas", "Hunting within the country is controlled by national law."],
      ["The prices paid to farmers for crops sold to the Grain Marketing Board", "CITES has nothing to do with crop marketing."],
      ["The allocation of land to resettlement farmers", "This is a land tenure matter, not CITES."],
    ],
    answer: "A",
    explanation: "CITES regulates or bans international trade in threatened species and products such as ivory, rhino horn and pangolin scales.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did totems help to conserve wildlife in traditional communities?",
    options: [
      ["Clan members did not kill or eat their totem animal", "Correct: each totem species was protected by a whole clan."],
      ["Totem animals were hunted first at the start of each season", "The opposite: totem animals were not hunted by the clan."],
      ["Totems were used to sell animals to traders", "Totems are cultural symbols, not trade permits."],
      ["Totem animals were kept in cages in the village", "Totem animals were wild and simply not harmed."],
    ],
    answer: "A",
    explanation: "Because many clans each protected their own totem animal, many species were spared; taboos and sacred places added further protection.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of **ecosystem diversity**?",
    options: [
      ["A park with woodland, grassland, vleis, rivers and kopjes", "Correct: it is the variety of habitats and ecosystems."],
      ["Different coat patterns among the zebra within one single herd", "This is genetic diversity within a species."],
      ["Many species of birds in one patch of woodland", "This is species diversity."],
      ["A large number of impala in one area", "A large number of one species is not diversity."],
    ],
    answer: "A",
    explanation: "Biodiversity has three levels: genetic (within a species), species (number and variety of species) and ecosystem (variety of habitats).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main aim of the **CAMPFIRE** programme?",
    options: [
      ["To let communities manage and benefit from wildlife", "Correct: benefits give communities a reason to conserve wildlife."],
      ["To ban all hunting in communal areas", "CAMPFIRE earns much of its income from controlled safari hunting."],
      ["To move all people out of areas with wildlife", "CAMPFIRE works with communities living alongside wildlife."],
      ["To convert wildlife areas into large commercial tobacco farms", "Its aim is managing indigenous resources, including wildlife."],
    ],
    answer: "A",
    explanation: "CAMPFIRE (Communal Areas Management Programme for Indigenous Resources) devolves wildlife management to rural district councils and communities, which earn income from hunting and tourism.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why are wire snares set by poachers especially damaging to wildlife?",
    options: [
      ["They kill any animal that walks into them", "Correct: snares trap whatever walks into them."],
      ["They only catch old animals that would die anyway", "Snares catch animals of any age, including young and breeding animals."],
      ["They are legal and controlled by quotas", "Snaring is illegal and uncontrolled."],
      ["They help to spread the seeds of trees across the park", "Snares do nothing for seed dispersal."],
    ],
    answer: "A",
    explanation: "Snares are cheap and easy to set, and kill or maim many animals, including protected and non-target species, without any control.",
    hints: ["Can a snare choose what it catches?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Under which law in Zimbabwe are national parks established and specially protected animals listed?",
    options: [
      ["The Parks and Wild Life Act", "Correct: it is the main wildlife law."],
      ["The Land Apportionment Act", "This colonial law divided land racially."],
      ["The Forest Act", "The Forest Act controls timber and state forests."],
      ["The Environmental Management Act", "This law created EMA and covers the wider environment."],
    ],
    answer: "A",
    explanation: "The Parks and Wild Life Act provides for parks and protected areas, specially protected species, hunting permits and appropriate authority for landholders and councils.",
    hints: ["Its name refers to parks and wildlife."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which measure is most likely to reduce poaching in communal areas next to a park over the long term?",
    options: [
      ["Sharing wildlife income with communities and involving them in protection", "Correct: when wildlife benefits people, they protect it and report poachers."],
      ["Fencing communities out of all natural resources and giving them no benefit", "This causes resentment and can increase poaching."],
      ["Raising the price paid for ivory on local markets", "Higher prices increase poaching."],
      ["Stopping all game counts and research", "Monitoring is needed to manage and protect wildlife."],
    ],
    answer: "A",
    explanation: "Patrols and laws are needed, but lasting reductions come when communities gain from wildlife and become partners in protecting it.",
    hints: ["Which option gives local people a reason to protect wildlife?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Biodiversity includes genetic, species and ecosystem diversity.",
    answer: true,
    explanation: "True: these are the three levels of biodiversity.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Human-wildlife conflict usually decreases when people settle across wildlife corridors.",
    answer: false,
    explanation: "False. Settling and farming in wildlife corridors brings people and animals into contact, so conflict increases.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each organisation or agreement with its role.",
    pairs: [
      ["Zimbabwe Parks and Wildlife Management Authority", "Manages national parks and anti-poaching"],
      ["CAMPFIRE", "Community management of and income from wildlife"],
      ["CITES", "Controls international trade in endangered species"],
      ["Environmental Management Agency", "Protects the environment, including control of veld fires"],
      ["Transfrontier conservation area", "Lets wildlife move freely across national borders"],
    ],
    explanation: "Government, community, international and voluntary bodies each have a role in wildlife management.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "The illegal hunting or killing of wildlife is called {{blank:a}}. The natural home that gives an animal food, water and shelter is its {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["poaching"], choices: ["poaching", "culling", "cropping", "ranching"] },
      { id: "b", accepted: ["habitat"], choices: ["habitat", "niche", "territory", "quota"] },
    ],
    explanation: "Poaching is illegal; a habitat supplies all of an organism's needs.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the full name of the programme known as CAMPFIRE.",
    accepted: ["communal areas management programme for indigenous resources", "communal areas management program for indigenous resources", "communal area management programme for indigenous resources"],
    wrong: ["campfire programme"],
    explanation: "CAMPFIRE = Communal Areas Management Programme for Indigenous Resources.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `A fictional district earns US\\$${fmtNum(rev.total)} from safari hunting and gives ${rev.wardPct}% to the producer wards. Calculate the wards' share in US\\$.`,
    value: wardShare, prefix: "US$", wrong: [rev.total - wardShare],
    explanation: `${rev.wardPct}% × ${money(rev.total)} = ${money(wardShare)}. (${money(rev.total - wardShare)} is the remaining 45%.)`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: `A ward receives US\\$${fmtNum(hh.ward)}. It spends ${hh.project}% on a borehole and shares the rest equally among ${hh.households} households. Calculate the amount each household receives, in US\\$.`,
    value: perHh, prefix: "US$", wrong: [hh.ward / hh.households, (hh.ward * hh.project) / 100 / hh.households],
    explanation: `Shared amount = ${100 - hh.project}% × ${money(hh.ward)} = ${money((hh.ward * (100 - hh.project)) / 100)}. Per household = ${money((hh.ward * (100 - hh.project)) / 100)} ÷ ${hh.households} = ${money(perHh)}.`,
    workedSolution: `1. Amount for households = (100 − ${hh.project})% × ${fmtNum(hh.ward)} = ${fmtNum((hh.ward * (100 - hh.project)) / 100)}.\n2. Per household = ${fmtNum((hh.ward * (100 - hh.project)) / 100)} ÷ ${hh.households}.\n3. = ${money(perHh)}.`,
    hints: ["Find the part NOT spent on the borehole first."],
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Rangers removed 480 wire snares in year 1 and 216 in year 4 of an anti-poaching project. Calculate the percentage decrease in snares found.",
    value: snareDrop, unit: "%", wrong: [122.2, 45],
    explanation: `Decrease = 480 − 216 = 264. Percentage = 264 ÷ 480 × 100 = ${snareDrop}%. (Dividing by 216 gives 122.2%, the wrong base; 45% is 216 as a percentage of 480.)`,
    workedSolution: `1. Decrease = 480 − 216 = 264 snares.\n2. Percentage decrease = 264 ÷ 480 × 100.\n3. = ${snareDrop}%.`,
    hints: ["Divide the decrease by the year 1 figure."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** effects of poaching on wildlife and **two** effects on people.",
    points: [
      "Wildlife: target species (rhinos, elephants) decline or become locally extinct.",
      "Wildlife: snares kill non-target animals / ecosystems lose balance.",
      "People: tourism and hunting income and jobs fall.",
      "People: community revenue for projects falls / rangers and others are hurt in confrontations.",
    ],
    modelAnswer: "Poaching reduces rhino and elephant numbers and snares kill many other animals. Fewer animals means fewer tourists and hunters, so jobs and the community's share of wildlife income fall.",
    explanation: "Two effects on wildlife and two on people.",
    hints: ["Think about the animals, the ecosystem, income and jobs."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain why indigenous knowledge systems are less effective in conserving wildlife today than in the past, and suggest how they can still help.",
    points: [
      "Changing beliefs / influence of modern religions and urban life reduce respect for totems and taboos.",
      "Population growth and land pressure / commercial demand for wildlife products override traditional rules.",
      "Weaker authority of traditional leaders over resource use.",
      "Suggestion: combine IKS with modern conservation (traditional leaders in CAMPFIRE committees, sacred sites protected by by-laws, teaching taboos in schools).",
    ],
    modelAnswer: "Fewer people now follow totems and taboos, and population growth and the high value of ivory and bushmeat tempt people to break them. Traditional leaders also have less control. They can still help if chiefs sit on wildlife committees and sacred forests are protected by local by-laws.",
    explanation: "Reasons for decline plus a practical suggestion.",
    hints: ["What has changed in society, and how can tradition support modern laws?"],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", calculator: true,
    stem: `Pupils counted species in three habitats near Mutare (fictional survey).\n\n**Table 1**\n\n${table(["Habitat", "Bird species", "Tree species"], SURVEY)}`,
    hints: ["Percentage decrease = decrease ÷ original × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage decrease in bird species from miombo woodland to cleared farmland. Give your answer to the nearest whole number.", value: lossBirds, tol: 0.5, answer: String(Math.round(lossBirds)), unit: "%", wrong: [142, 41], explanation: `(46 − 19) ÷ 46 × 100 = 27 ÷ 46 × 100 = ${Math.round(lossBirds)}%.` }),
      P.short({ label: "(b)", marks: 1, stem: "Which habitat has the highest species diversity?", accepted: ["riverine forest", "riverine", "the riverine forest"], wrong: ["cleared farmland"], explanation: "Riverine forest has the most bird (58) and tree (22) species." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the cleared farmland has fewer bird species.", points: [
        "Trees and shrubs have been removed, so there is less food (fruit, insects, seeds) and fewer nesting sites.",
        "Habitat loss reduces the variety of niches, so fewer species can live there.",
      ], explanation: "Habitat loss is the main threat to biodiversity." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest **three** ways the farming community could increase biodiversity on its land.", points: [
        "Leave or replant strips of indigenous trees (field boundaries, stream banks, windbreaks).",
        "Protect vleis and riverine forest from clearing and fires.",
        "Agroforestry / reduce pesticide use / keep sacred groves and patches of woodland.",
      ], explanation: "Restoring habitats increases biodiversity." }),
    ],
    explanation: "Clearing woodland for farmland reduces species diversity; keeping and restoring habitats raises it.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Paper 2",
    stem: CAMP,
    hints: ["Find 50% of the hunting income.", "For (c), consider benefits, problems and a conclusion."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the amount received by the producer wards, in US\\$.", prefix: "US$", value: campWard, wrong: [18000], explanation: `50% × ${money(60000)} = ${money(campWard)}.` }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe **three** ways in which the wards could use their share to benefit the community and wildlife.", points: [
        "Community projects: boreholes, schools, clinics, grinding mills.",
        "Measures against crop raiding: electric or chilli fences, guards.",
        "Household dividends / support for anti-poaching scouts / compensation for losses.",
      ], explanation: "Spending that benefits people also builds support for wildlife." }),
      P.manual({ label: "(c)", marks: 8, stem: "Discuss the advantages and disadvantages of community-based wildlife management such as CAMPFIRE.", points: [
        "Advantage: communities earn income from wildlife, so they value and protect it.",
        "Advantage: income pays for schools, clinics, boreholes and household dividends.",
        "Advantage: local people report poachers / poaching falls; wildlife habitat is kept rather than cleared.",
        "Advantage: uses land unsuited to crops in dry regions (IV and V) productively.",
        "Disadvantage: income may be small per household or shared unequally; councils may keep a large share.",
        "Disadvantage: crop and livestock losses to wildlife continue and may exceed benefits for some families.",
        "Disadvantage: dependence on hunting income, which can fall with drought, disease, travel restrictions or trade rules.",
        "Reasoned conclusion, e.g. effective where income reaches households fairly and conflict is controlled.",
      ], levels: agricultureLevels(8), explanation: "A balanced discussion with a conclusion." }),
    ],
    explanation: "Community-based management links wildlife to local benefits, but its success depends on fair sharing and conflict control.",
  });

  b.card("DEFINITION", "Conservation", "Wise management and sustainable use of resources so they last.");
  b.card("DEFINITION", "Preservation", "Protecting a resource from any use, keeping it in its natural state.");
  b.card("CONCEPT", "Three levels of biodiversity", "Genetic (within a species), species (variety of species), ecosystem (variety of habitats).");
  b.card("DEFINITION", "Poaching", "Illegal hunting, capturing, killing or collecting of wild animals or plants.");
  b.card("CONCEPT", "How IKS protected wildlife", "Totems (not killing the clan animal), taboos, sacred places and chiefs' control of hunting.");
  b.card("FACT", "What does CAMPFIRE stand for?", "Communal Areas Management Programme for Indigenous Resources.");
  b.card("FACT", "What does CITES control?", "International trade in endangered species and their products (e.g. ivory, rhino horn).");
  b.card("FACT", "Main wildlife law in Zimbabwe", "The Parks and Wild Life Act (parks, specially protected species, permits, appropriate authority).");
  b.card("CONCEPT", "Causes of human-wildlife conflict", "Settlement near parks and in corridors, drought, growing human and animal populations.");
  b.card("FACT", "Name a transfrontier park that includes Gonarezhou.", "The Great Limpopo Transfrontier Park.");
});
