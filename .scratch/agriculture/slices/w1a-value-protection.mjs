// Slice W1a: wildlife value, classification and protection (ZIMSEC only).
import { concept, P, pct, pctChange, fmtNum, table, agricultureLevels } from "../lib.mjs";

const kudu = { before: 150, after: 180 };
const kuduPct = pctChange(kudu.before, kudu.after);

const quota = { pop: 400, rate: 3 };
const quotaValue = (quota.pop * quota.rate) / 100;

const COUNT = [["Zebra", 320, 352], ["Giraffe", 45, 36], ["Impala", 900, 945], ["Lion", 12, 12]];
const giraffePct = pctChange(45, 36);
const zebraPct = pctChange(320, 352);

const INCIDENTS = [["Elephants raiding crops", 14], ["Lions or hyenas killing livestock", 9], ["Baboons raiding gardens", 21], ["Crocodile attacks at the river", 2]];
const incTotal = INCIDENTS.reduce((s, [, n]) => s + n, 0);
const elephantPct = pct(14, incTotal);

concept("agri.wildlife.value-protection", { file: "wildlife/value-protection", keyPrefix: "wildlife.value-protection" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which animal is one of the **big five**?",
    options: [
      ["Leopard", "Correct: the big five are lion, leopard, elephant, buffalo and rhinoceros."],
      ["Hippopotamus", "The hippo is dangerous but is not one of the big five."],
      ["Cheetah", "The cheetah is not one of the big five."],
      ["Giraffe", "The giraffe is not one of the big five."],
    ],
    answer: "A",
    explanation: "The big five, named by hunters, are lion, leopard, elephant, buffalo and rhinoceros.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **browser**?",
    options: [
      ["A herbivore that eats leaves and twigs of trees", "Correct: giraffe and kudu are browsers."],
      ["A herbivore that eats mainly grass", "This is a grazer."],
      ["An animal that eats both plants and animals", "This is an omnivore."],
      ["An animal that eats the remains of animals killed by others", "This is a scavenger."],
    ],
    answer: "A",
    explanation: "Browsers feed on woody plants; grazers feed on grass; mixed feeders such as elephant and impala do both.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A troop of baboons eats fruit, seeds, insects and occasionally young antelope. How is the baboon classified by feeding habit?",
    options: [
      ["Omnivore", "Correct: it eats both plant and animal food."],
      ["Herbivore", "Herbivores eat only plants."],
      ["Carnivore", "Carnivores eat mainly flesh."],
      ["Grazer", "Grazers eat grass."],
    ],
    answer: "A",
    explanation: "Animals that eat both plant and animal food are omnivores; baboons and bushpigs are examples.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an **ecological** value of wildlife?",
    options: [
      ["Predators keep herbivore numbers in balance", "Correct: this is a role in the ecosystem."],
      ["Tourists pay fees to visit national parks", "This is an economic value."],
      ["Families use the lion as a totem", "This is a cultural value."],
      ["Hunters pay trophy fees to rural district councils", "This is an economic value."],
    ],
    answer: "A",
    explanation: "Ecological values include food chains, predator control of herbivores, pollination, seed dispersal and nutrient recycling.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a **sustainable** way of using wildlife?",
    options: [
      ["Hunting within a quota set from game counts", "Correct: quotas keep the off-take below the population's growth."],
      ["Shooting every animal that enters the farm", "This would wipe out populations and is illegal for protected species."],
      ["Setting wire snares along game paths", "Snaring is poaching: it is illegal and kills indiscriminately."],
      ["Burning the veld every month to drive game", "Frequent fires destroy habitat."],
    ],
    answer: "A",
    explanation: "Sustainable use (tourism, game ranching, quota hunting, culling within carrying capacity) keeps populations and habitats healthy.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Lions have killed cattle at night in a village near a national park. Which measure best protects the herd?",
    options: [
      ["Keeping cattle in strong, predator-proof kraals at night", "Correct: most lion attacks on cattle happen at night in weak enclosures."],
      ["Leaving cattle to graze freely inside the national park at night", "This exposes them to predators."],
      ["Poisoning a carcass to kill the lions", "Poisoning is illegal and kills many other animals, such as vultures."],
      ["Moving the cattle closer to the park boundary", "This increases contact with predators."],
    ],
    answer: "A",
    explanation: "Predator-proof kraals, herding by day and reporting problem animals to the wildlife authority protect livestock.",
    hints: ["When do lions usually attack livestock?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why can buffalo be a problem for cattle farmers living near game areas?",
    options: [
      ["They can carry diseases such as foot-and-mouth disease", "Correct: contact between buffalo and cattle can spread disease."],
      ["They eat only the leaves of trees that cattle need", "Buffalo are grazers, and the main concern is disease."],
      ["They are far too small to compete with cattle for the grass", "Buffalo are large animals."],
      ["They are omnivores that kill cattle for food", "Buffalo are herbivores."],
    ],
    answer: "A",
    explanation: "Buffalo can carry foot-and-mouth disease without showing much sign of it, so contact with cattle is controlled.",
    hints: ["Think about disease rather than feeding."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A community earns income from tourists who come to see wildlife, but elephants damage its crops. Which approach is most likely to benefit both people and wildlife?",
    options: [
      ["Share tourism income locally and invest in fences and guarding", "Correct: people gain from wildlife and losses are reduced, so they support conservation."],
      ["Kill all the elephants so crops are safe", "This destroys the tourism income and is illegal without authority."],
      ["Stop farming and leave the area", "This removes livelihoods rather than managing the conflict."],
      ["Ignore the damage, because wildlife is protected", "Unmanaged losses turn people against wildlife and encourage poaching."],
    ],
    answer: "A",
    explanation: "When communities benefit from wildlife and losses are reduced, they value wildlife and help protect it; this is the idea behind community-based conservation.",
    hints: ["Which option gives people a reason to protect wildlife?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Flora means the plants of an area and fauna means its animals.",
    answer: true,
    explanation: "True.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A farmer may kill a specially protected animal, such as a pangolin, if he finds it on his land.",
    answer: false,
    explanation: "False. Specially protected species may not be killed, captured or traded without a permit; problem animals are reported to the wildlife authority.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each animal with its feeding group.",
    pairs: [
      ["Zebra", "Grazer"],
      ["Giraffe", "Browser"],
      ["Wild dog", "Carnivore"],
      ["Bushpig", "Omnivore"],
      ["Impala", "Mixed feeder (grazes and browses)"],
    ],
    explanation: "Grazers eat grass, browsers eat woody plants, carnivores eat flesh, omnivores eat both, mixed feeders graze and browse.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "A limit on the number of animals that may be hunted in a year is called a {{blank:a}}. An animal used as a clan symbol, such as shumba (lion), is called a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["quota"], choices: ["quota", "licence", "fee", "census"] },
      { id: "b", accepted: ["totem"], choices: ["totem", "taboo", "trophy", "mascot"] },
    ],
    explanation: "Hunting quotas keep off-take sustainable; totems are part of the cultural value of wildlife.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name **one** animal in the big five other than the lion and the elephant.",
    accepted: ["leopard", "buffalo", "rhinoceros", "rhino", "black rhinoceros", "white rhinoceros", "cape buffalo", "african buffalo"],
    wrong: ["hippo", "cheetah"],
    explanation: "The big five: lion, leopard, elephant, buffalo and rhinoceros.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `A game count found ${kudu.before} kudu one year and ${kudu.after} two years later. Calculate the percentage increase.`,
    value: kuduPct, unit: "%", wrong: [16.7, 30],
    explanation: `Increase = ${kudu.after} − ${kudu.before} = ${kudu.after - kudu.before}. Percentage = ${kudu.after - kudu.before} ÷ ${kudu.before} × 100 = ${kuduPct}%. (Dividing by ${kudu.after} gives 16.7%, the wrong base.)`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: `A conservancy has an estimated ${quota.pop} impala. The hunting quota is set at ${quota.rate}% of the population. How many impala may be hunted?`,
    value: quotaValue, unit: "animals", wrong: [quota.pop / quota.rate],
    explanation: `Quota = ${quota.rate}% × ${quota.pop} = ${quota.rate} ÷ 100 × ${quota.pop} = ${quotaValue} impala.`,
    workedSolution: `1. Quota = ${quota.rate} ÷ 100 × ${quota.pop}.\n2. = ${quotaValue} impala.`,
    hints: ["Find 3% of the population."],
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Of ${incTotal} problem-animal incidents reported in a ward in one year, 14 were elephants raiding crops. Calculate the percentage caused by elephants, to one decimal place.`,
    value: elephantPct, tol: 0.05, answer: String(Math.round(elephantPct * 10) / 10), unit: "%", wrong: [14],
    explanation: `14 ÷ ${incTotal} × 100 = ${Math.round(elephantPct * 10) / 10}%.`,
    workedSolution: `1. Percentage = 14 ÷ ${incTotal} × 100.\n2. = ${elephantPct.toFixed(3)}%.\n3. To one decimal place: ${Math.round(elephantPct * 10) / 10}%.`,
    hints: ["Percentage = part ÷ total × 100."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** socio-economic and **two** cultural values of wildlife to communities in Zimbabwe.",
    points: [
      "Socio-economic: tourism brings jobs and income (guides, lodges, crafts).",
      "Socio-economic: game meat, skins, hunting fees or community income (e.g. CAMPFIRE projects).",
      "Cultural: animals are totems for clans.",
      "Cultural: taboos protect animals and sacred places / medicinal plants / animals in songs, stories and art.",
    ],
    modelAnswer: "Wildlife attracts tourists, creating jobs as guides and in lodges, and hunting fees are shared with communities for schools and clinics. Culturally, animals such as the lion and elephant are clan totems, and taboos protect certain animals and sacred places.",
    explanation: "Two of each type.",
    hints: ["Socio-economic = money and jobs; cultural = beliefs and traditions."],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe **four** ways in which a village can reduce crop damage by elephants.",
    points: [
      "Report the problem animal to the wildlife authority / rural district council.",
      "Fences: electric fences or chilli-treated fences around fields.",
      "Guarding and scaring: watch platforms, noise, fires or chilli smoke at night.",
      "Plan fields away from wildlife corridors and water routes / group fields together so they are easier to guard.",
    ],
    modelAnswer: "Report the elephant to the wildlife authority; put up chilli-treated or electric fences; guard fields at night from raised platforms using noise and fires; and site fields together, away from the elephants' route to water.",
    explanation: "Any four practical, legal measures.",
    hints: ["Think about reporting, barriers, guarding and planning."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", calculator: true,
    stem: `Table 1 shows game counts on a fictional conservancy in two years.\n\n**Table 1**\n\n${table(["Species", "First count", "Second count"], COUNT.map(([s, a, c]) => [s, fmtNum(a), fmtNum(c)]))}`,
    hints: ["Percentage change = change ÷ first count × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage change in giraffe numbers.", value: giraffePct, unit: "%", wrong: [20, 25], explanation: `(36 − 45) ÷ 45 × 100 = ${giraffePct}% (a decrease of 20%).` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the percentage change in zebra numbers.", value: zebraPct, unit: "%", wrong: [32], explanation: `(352 − 320) ÷ 320 × 100 = ${zebraPct}%.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which species in Table 1 is a carnivore?", options: [
        ["Lion", "Correct."],
        ["Zebra", "Zebra is a grazer."],
        ["Giraffe", "Giraffe is a browser."],
        ["Impala", "Impala is a mixed feeder."],
      ], answer: "A", explanation: "Lions eat other animals." }),
      P.manual({ label: "(d)", marks: 4, stem: "Suggest how the conservancy should respond to the changes in zebra and giraffe numbers.", points: [
        "Zebra increased: a small hunting or cropping quota could be allowed / income from sustainable use.",
        "But numbers must stay within the carrying capacity of the grazing.",
        "Giraffe decreased: stop any hunting of giraffe.",
        "Investigate the cause (poaching, disease, lack of browse, predation) and act, e.g. anti-poaching patrols.",
      ], explanation: "Growing populations can support use; falling ones need protection and investigation." }),
    ],
    explanation: "Game counts guide sustainable use: quotas where numbers grow, protection where they fall.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Paper 2",
    stem: `Table 2 shows problem-animal incidents reported in one year in a fictional ward bordering a national park.\n\n**Table 2**\n\n${table(["Type of incident", "Number"], INCIDENTS)}`,
    hints: ["Add the incidents first.", "For (c), weigh up the costs and benefits of living near wildlife."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the total number of incidents.", value: incTotal, wrong: [incTotal - 2], explanation: `14 + 9 + 21 + 2 = ${incTotal}.` }),
      P.manual({ label: "(b)", marks: 5, stem: "For **two** types of incident in Table 2, describe practical ways of reducing them.", points: [
        "Names a type of incident (e.g. livestock killed by lions or hyenas).",
        "Measure: predator-proof kraals at night / herding by day.",
        "Names a second type (e.g. baboons raiding gardens, elephants raiding crops, crocodile attacks).",
        "Measure: fences, guarding, scaring (noise, chilli), or for crocodiles safe water points and avoiding river banks.",
        "Reporting problem animals to the wildlife authority rather than killing them illegally.",
      ], explanation: "Measures must fit the animal." }),
      P.manual({ label: "(c)", marks: 6, stem: "Discuss whether the people of the ward benefit or lose from living next to the national park.", points: [
        "Losses: crops eaten, livestock killed, injuries or deaths, time spent guarding.",
        "Benefits: jobs and income from tourism, crafts and lodges.",
        "Benefits: share of hunting and tourism revenue for community projects (e.g. CAMPFIRE).",
        "Benefits: cultural and ecological value (totems, pollination, seed dispersal).",
        "Losses can be reduced by fences, kraals and problem-animal control; benefits depend on fair sharing of income.",
        "Reasoned conclusion, e.g. the ward gains overall only if income is shared and conflict is managed.",
      ], levels: agricultureLevels(6), explanation: "A discussion weighs costs and benefits and reaches a judgement." }),
    ],
    explanation: "Living near wildlife brings both conflict and income; management and fair benefit-sharing decide the balance.",
  });

  b.card("DEFINITION", "Herbivore, carnivore, omnivore", "Herbivore eats plants; carnivore eats flesh; omnivore eats both.");
  b.card("CONCEPT", "Grazer versus browser", "Grazers eat grass (zebra, buffalo); browsers eat leaves and twigs of trees (giraffe, kudu).");
  b.card("FACT", "Name the big five.", "Lion, leopard, elephant, buffalo, rhinoceros.");
  b.card("CONCEPT", "Ecological value of wildlife", "Food chains, predator control of herbivores, pollination, seed dispersal, nutrient recycling, biodiversity.");
  b.card("CONCEPT", "Cultural value of wildlife", "Totems, taboos, sacred places, traditional medicines, songs and stories.");
  b.card("DEFINITION", "Sustainable utilisation", "Using wildlife in ways that do not reduce populations or damage habitats, so it lasts.");
  b.card("CONCEPT", "Sustainable uses of wildlife", "Tourism, game ranching, quota hunting, culling within carrying capacity, crocodile and ostrich farming.");
  b.card("FACT", "Give two specially protected animals in Zimbabwe.", "Rhinoceros (both species) and pangolin.");
  b.card("CONCEPT", "Dealing with problem animals", "Report to the wildlife authority; kraals, fences and chilli; guarding and scaring; plan fields away from corridors.");
});
