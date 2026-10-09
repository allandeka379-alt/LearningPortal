// W4b: Environmental issues and the preservation of natural resources (her.global.environmental-issues).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.global.environmental-issues", { file: "global/environmental-issues", keyPrefix: "global.environmental-issues" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **deforestation**?",
    options: [
      ["cutting down forests without replacing them", "Correct: trees are removed and not replanted."],
      ["the illegal killing or capture of wild animals in parks", "This is poaching."],
      ["the planting of new trees where none grew before", "This is afforestation, the opposite."],
      ["the washing away of topsoil by water", "This is soil erosion, an effect of deforestation."],
    ],
    answer: "A",
    explanation: "Deforestation is the clearing of forests and woodland without replacing the trees.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which term describes the variety of plants and animals living in an area?",
    options: [
      ["biodiversity", "Correct: bio = life, diversity = variety."],
      ["deforestation", "Deforestation is the clearing of trees."],
      ["conservation farming", "This is a farming method that protects soil."],
      ["urbanisation", "Urbanisation is the growth of towns."],
    ],
    answer: "A",
    explanation: "Biodiversity means the variety of living things in an area.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which natural resource is **most directly** threatened by poaching?",
    options: [
      ["wildlife", "Correct: poachers kill or capture wild animals."],
      ["minerals", "Minerals are threatened by illegal mining, not poaching."],
      ["underground water", "Water is threatened by overuse and pollution."],
      ["the soil on farmland", "Soil is threatened by erosion and poor farming."],
    ],
    answer: "A",
    explanation: "Poaching is the illegal hunting or capture of wild animals, so wildlife is the resource lost.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which activity is a common cause of deforestation in Zimbabwe's tobacco-growing areas?",
    options: [
      ["cutting wood to cure tobacco leaves", "Correct: many small-scale farmers cure tobacco with firewood."],
      ["spraying crops against pests", "Spraying may pollute but does not remove trees."],
      ["selling tobacco at auction floors", "Selling does not cut trees."],
      ["building contour ridges across sloping fields", "Contour ridges protect soil; they do not remove forests."],
    ],
    answer: "A",
    explanation: "Curing tobacco needs heat; where wood is the fuel, large amounts of woodland are cut.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which body is the main agency responsible for protecting the environment in Zimbabwe?",
    options: [
      ["the Environmental Management Agency (EMA)", "Correct: EMA works under the Environmental Management Act."],
      ["the Grain Marketing Board", "The GMB buys and stores grain."],
      ["the Zimbabwe Electoral Commission", "ZEC runs elections."],
      ["the Registrar General's Office", "This office issues birth certificates and IDs."],
    ],
    answer: "A",
    explanation: "EMA, set up under the Environmental Management Act, is the main environmental protection body.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha's family uses a fuel-efficient (tsotso) stove instead of an open fire. Which environmental issue does this **most** help to reduce?",
    options: [
      ["deforestation", "Correct: the stove burns less firewood, so fewer trees are cut."],
      ["poaching of elephants", "A stove has nothing to do with hunting."],
      ["overuse of water", "Cooking fuel does not affect water use."],
      ["noise from traffic in towns", "Noise is not linked to how food is cooked."],
    ],
    answer: "A",
    hints: ["What does the stove burn?"],
    explanation: "Efficient stoves need less wood, so fewer trees are cut for fuel.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A council in Gweru repairs leaking pipes and asks residents to water gardens in the early morning. Which issue is it addressing?",
    options: [
      ["overuse and waste of water", "Correct: both actions save water."],
      ["loss of biodiversity in national parks", "The actions concern town water, not parks."],
      ["poaching of wild animals", "Pipes and watering do not affect poaching."],
      ["deforestation for building poles and timber", "No trees are involved."],
    ],
    answer: "A",
    hints: ["Leaks and midday watering both lose something."],
    explanation: "Leaks lose treated water and midday watering loses water to evaporation; fixing both saves water.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement **best** explains why the loss of one species can harm a whole ecosystem?",
    options: [
      ["Living things depend on each other for food, pollination and shelter", "Correct: species are linked in a web of life."],
      ["Each species lives alone and does not affect other living things", "This is the opposite of how ecosystems work."],
      ["Only large animals such as elephants matter in an ecosystem, while insects, birds and small plants do not", "Small species such as bees and vultures play vital roles."],
      ["Species that disappear are always replaced at once by new ones", "Lost species are not quickly replaced."],
    ],
    answer: "A",
    hints: ["Think of bees and crops, or vultures and carcasses."],
    explanation: "Species are linked: bees pollinate crops, vultures clean carcasses, trees shelter birds. Losing one affects the others.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Forests and water are renewable resources only if they are used no faster than they can recover.",
    answer: true,
    explanation: "True. A renewable resource can still be destroyed if it is overused.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Section 73 of the Constitution protects the environment only for the benefit of people alive today.",
    answer: false,
    explanation: "False. Section 73 speaks of protecting the environment for present AND future generations.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each environmental issue with the resource it most directly damages.",
    pairs: [
      ["deforestation", "forests and woodland"],
      ["poaching", "wildlife"],
      ["overuse of water", "rivers, dams and boreholes"],
      ["unregulated gold panning", "land and riverbeds"],
    ],
    explanation: "Deforestation removes trees; poaching kills animals; overuse drains water sources; panning digs up land and riverbeds.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "National Tree Planting Day is held on the first Saturday of {{blank:a}}. The illegal killing of wild animals is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["December"], choices: ["December", "April", "August", "May"] },
      { id: "b", accepted: ["poaching"], choices: ["poaching", "culling", "grazing", "ranching"] },
    ],
    explanation: "Tree Planting Day falls on the first Saturday of December; illegal hunting is poaching.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the **abbreviation** of the government agency set up under the Environmental Management Act to protect the environment.",
    accepted: ["EMA"],
    wrong: ["ZEC"],
    explanation: "EMA: the Environmental Management Agency.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Identify **four** environmental issues facing Zimbabwe.",
    points: [
      "Any one of: deforestation, poaching, overuse/waste of water, loss of wildlife/biodiversity, unregulated mining/gold panning, veld fires, pollution, land degradation",
      "A second different issue",
      "A third different issue",
      "A fourth different issue",
    ],
    modelAnswer: "Deforestation, poaching, overuse of water and loss of biodiversity.",
    explanation: "One mark per correct issue.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** effects of deforestation on a rural community.",
    points: [
      "Identifies firewood shortage",
      "Develops: women and girls walk further to collect fuel, losing time for school or work",
      "Identifies soil erosion / loss of fertility",
      "Develops: exposed soil is washed away, so crop yields fall",
      "Identifies loss of wild foods, medicinal plants or wildlife / rivers drying or silting",
      "Develops: e.g. families lose fruits and income, or rivers fill with sand and stop flowing earlier in the dry season",
    ],
    modelAnswer: "Firewood becomes scarce, so women and girls walk long distances to fetch it and lose time for school and other work. Without tree roots, the soil is exposed and washed away by rain, so crop yields fall. Wild fruits, honey and medicinal plants disappear, so families lose food and income, and soil washed into rivers makes them dry up earlier.",
    hints: ["Think of fuel, soil and food."],
    explanation: "One mark for each effect and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which a school could help to preserve natural resources in its area, and explain how each would help.",
    points: [
      "Suggests planting trees / a woodlot / an indigenous tree nursery",
      "Explains that trees replace those cut and provide fuel, so fewer wild trees are cut",
      "Suggests a water project (rainwater tank, fixing taps) or an awareness activity (environment club, drama, posters) or a clean-up",
      "Explains how it saves the resource or changes behaviour in families",
    ],
    modelAnswer: "The school could start a woodlot of fast-growing and indigenous trees, which would supply firewood and replace trees so that fewer wild trees are cut. It could also run an environment club that performs plays at assembly and on parents' days about poaching and water saving, which would change behaviour in pupils' families.",
    hints: ["One way that replaces or saves a resource, one that changes behaviour."],
    explanation: "One mark for each strategy and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: source("Source A", "a notice from a fictional ward environment committee, Lupane District, 2026",
      "1. No green trees may be cut within the ward woodland. Dead wood only.\n2. The sacred pool at Gumbo Hill remains closed to cattle and washing.\n3. Snares found will be removed and reported to ZimParks rangers.\n4. Every homestead is asked to plant two indigenous trees before the rains.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which rule in the source is aimed at reducing poaching?",
        options: [
          ["removing and reporting snares", "Correct: snares are used to catch wild animals illegally."],
          ["cutting dead wood only", "This protects trees, not animals."],
          ["closing the pool to cattle and washing", "This protects water and a sacred place."],
          ["planting two indigenous trees", "This replaces trees."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** natural resources the committee is trying to preserve.",
        points: ["Trees / woodland", "Water (the pool) / wildlife"],
        modelAnswer: "The woodland and the water of the sacred pool (also wildlife).",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the notice combines indigenous and modern ways of preserving resources.",
        points: [
          "Indigenous: the pool is protected because it is sacred, a traditional belief",
          "Modern: reporting snares to ZimParks rangers uses a government institution and the law",
          "Both work towards keeping resources for the future / the community enforces its own rules",
        ],
        modelAnswer: "The sacred pool is protected because of a traditional belief, which is an indigenous method. Snares are reported to ZimParks rangers, a modern institution that enforces the law. Together they protect resources for future generations, with the community itself enforcing the rules.",
      }),
    ],
    hints: ["In (c), which rule rests on belief and which on the law?"],
    explanation: "A source-based practice item on community strategies to preserve resources.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "This question is about preserving natural resources.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** strategies that individuals can use to preserve natural resources.",
        points: [
          "Strategy 1, e.g. saving water (closing taps, reusing water)",
          "Described: how it is done and the resource it saves",
          "Strategy 2, e.g. planting trees, using efficient stoves, refusing bush meat or ivory, reporting poaching",
          "Described: how it is done and the resource it saves",
        ],
        modelAnswer: "An individual can save water by closing taps, fixing leaks and reusing washing water on the garden, which keeps more water in dams for everyone. An individual can also plant and care for indigenous trees, which replaces trees cut for firewood and protects the soil.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Preserving natural resources is the job of the government, not of ordinary people.\" Discuss.",
        points: [
          ["Government role: laws, EMA, ZimParks, Forestry Commission, protected areas, enforcement", 2],
          ["Limits of government alone: too few officers, resources used daily by millions, poverty drives use", 2],
          ["Role of individuals, schools and communities: daily choices, by-laws, traditional rules, reporting, tree planting", 2],
          ["Supported judgement (e.g. shared responsibility)", 2],
        ],
        levels: levels(8),
        modelAnswer: "The government has an important role. It makes laws such as the Environmental Management Act and the Parks and Wild Life Act, and bodies such as EMA, ZimParks and the Forestry Commission enforce them and run protected areas.\n\nHowever, the government cannot do it alone. Natural resources are used every day by millions of people, and there are not enough rangers or officers to watch every tree, tap and river. Poverty also pushes people to cut trees or hunt, whatever the law says.\n\nOrdinary people therefore matter. Families decide how much firewood and water they use; schools plant woodlots and teach; communities make by-laws, keep traditional rules about sacred places and report poachers.\n\nI disagree with the statement. Government sets the rules, but resources are preserved only when ordinary people also take responsibility.",
      }),
    ],
    hints: ["In (b), ask what the law can achieve without the people's help."],
    explanation: "A practice evaluative item on responsibility for preserving resources.",
  });

  b.card("DEFINITION", "Environmental issue", "A problem caused when the environment is damaged or its resources are used faster than they can recover.");
  b.card("DEFINITION", "Deforestation", "Clearing or cutting down forests without replacing them.");
  b.card("DEFINITION", "Poaching", "Illegal hunting, killing or capture of wild animals (or illegal harvesting of plants).");
  b.card("DEFINITION", "Biodiversity", "The variety of plants, animals and other living things in an area.");
  b.card("FACT", "When is National Tree Planting Day?", "The first Saturday of December.");
  b.card("FACT", "Which section of the Constitution gives environmental rights?", "Section 73.");
  b.card("CONCEPT", "Name four causes of deforestation in Zimbabwe.", "Firewood for cooking, curing tobacco, clearing land for farms and settlements, timber and brick-making.");
  b.card("CONCEPT", "Give three things a school can do to preserve resources.", "Plant trees or a woodlot, save and harvest water, run an environment club or awareness campaign (also clean-ups).");
  b.card("CONCEPT", "Why is wildlife part of heritage as well as a resource?", "It belongs to the nation, brings tourism income, is linked to totems and culture, and must be passed on to future generations.");
});
