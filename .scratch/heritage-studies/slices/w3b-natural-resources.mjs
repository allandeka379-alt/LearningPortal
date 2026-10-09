// W3b: Natural resources as national heritage (her.heritage.natural-resources).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.heritage.natural-resources", { file: "heritage/natural-resources", keyPrefix: "heritage.natural-resources" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following is a **non-renewable** natural resource?",
    options: [
      ["coal", "Correct: coal exists in a fixed amount and cannot be replaced."],
      ["forests", "Forests can regrow if used carefully."],
      ["river water", "Water is renewed by rainfall."],
      ["wildlife", "Wildlife can breed and recover if protected."],
    ],
    answer: "A",
    explanation: "Coal, like gold and diamonds, is non-renewable. Forests, water and wildlife are renewable if used carefully.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which area of Zimbabwe is best known for coal mining?",
    options: [
      ["Hwange", "Correct: Hwange is the main coal-mining area."],
      ["Kariba", "Kariba is known for its lake and hydroelectric power."],
      ["Chimanimani", "Chimanimani is known for mountains and forests."],
      ["Mana Pools", "Mana Pools is a national park and World Heritage Site."],
    ],
    answer: "A",
    explanation: "Coal is mined at Hwange and is used to generate electricity.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Lake Kariba's water is used to generate electricity. What type of power is this?",
    options: [
      ["hydroelectric power", "Correct: falling water turns turbines."],
      ["thermal power from coal", "Thermal power from coal is generated at Hwange."],
      ["solar power from the sun", "Solar power uses sunlight, not lake water."],
      ["wind power from turbines on land", "Kariba's electricity comes from water."],
    ],
    answer: "A",
    explanation: "Water from Lake Kariba flows through turbines in the dam wall to produce hydroelectric power.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Platinum and chrome are mined mainly along which geological feature?",
    options: [
      ["the Great Dyke", "Correct: the Great Dyke is rich in platinum and chrome."],
      ["the Zambezi Escarpment", "The escarpment is not the main source of these minerals."],
      ["the Eastern Highlands", "The Eastern Highlands are known for forests and tea, not platinum."],
      ["the Kalahari sands", "These sands in the west support teak woodland, not platinum mines."],
    ],
    answer: "A",
    explanation: "The Great Dyke, a long ridge running through the centre of the country, holds platinum and chrome.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement **best** explains why forests are called a renewable resource?",
    options: [
      ["Trees can regrow if they are cut no faster than they are replaced", "Correct: renewal depends on careful use."],
      ["Forests can never be destroyed however many trees are cut", "Over-cutting can destroy forests."],
      ["Trees are found only in national parks, where cutting is banned by law", "Trees grow in many places, not only in parks."],
      ["Wood can be dug from the ground like coal", "Wood grows; it is not mined."],
    ],
    answer: "A",
    explanation: "A forest renews itself only if trees are cut no faster than new ones grow.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A clan's totem is the eland, and members do not eat its meat. How does this show that natural resources are part of **cultural** heritage?",
    options: [
      ["An animal is linked to a family's identity and respected", "Correct: totems tie wildlife to identity and respect."],
      ["The eland is a mineral that is mined", "The eland is an animal, not a mineral."],
      ["The clan earns foreign currency by exporting eland meat to Europe", "The clan does not eat or sell its totem animal."],
      ["The eland is the national flower of Zimbabwe", "The national flower is the flame lily."],
    ],
    answer: "A",
    hints: ["What does a totem say about a family?"],
    explanation: "Totems link families to animals, which shows that natural resources carry cultural and spiritual meaning.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Villagers near Bindura dig sand from a riverbed without control, and the river banks collapse. Which principle are they failing to follow?",
    options: [
      ["sustainable use", "Correct: they meet present needs but damage the river for the future."],
      ["separation of powers", "This is about government, not resources."],
      ["unity in diversity", "This is about national unity, not resources."],
      ["willing-buyer willing-seller", "This was a land-transfer principle, not the issue here."],
    ],
    answer: "A",
    hints: ["Will the river still serve the next generation?"],
    explanation: "Uncontrolled sand-digging damages the river, so it is not sustainable use.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement **best** explains why natural resources are described as **heritage** rather than simply as property?",
    options: [
      ["They were inherited and must be passed on to future generations", "Correct: heritage links past, present and future."],
      ["They belong to whoever is using them at present", "This treats them as property, not heritage."],
      ["They have no value at all until they are sold for money", "Resources also have cultural and environmental value."],
      ["They belong only to people who live in towns", "Resources belong to the whole nation."],
    ],
    answer: "A",
    hints: ["Think about past, present and future generations."],
    explanation: "Heritage is inherited and held in trust; resources must be used sustainably and passed on.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Gold is a renewable resource.",
    answer: false,
    explanation: "False. Gold exists in a fixed amount and cannot be replaced once mined, so it is non-renewable.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Section 73 of the Constitution speaks of protecting the environment for present and future generations.",
    answer: true,
    explanation: "True. Section 73 gives every person environmental rights, including protection of the environment for future generations.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each natural resource with a place in Zimbabwe where it is found.",
    pairs: [
      ["coal", "Hwange"],
      ["kapenta", "Lake Kariba"],
      ["platinum", "the Great Dyke"],
      ["teak woodland", "Matabeleland North"],
    ],
    explanation: "Coal at Hwange; kapenta in Lake Kariba; platinum along the Great Dyke; teak woodland in Matabeleland North.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Water and forests are {{blank:a}} resources. Diamonds and chrome are {{blank:b}} resources.",
    blanks: [
      { id: "a", accepted: ["renewable"], choices: ["renewable", "non-renewable"] },
      { id: "b", accepted: ["non-renewable"], choices: ["non-renewable", "renewable"] },
    ],
    explanation: "Water and forests can be renewed if used carefully; diamonds and chrome cannot be replaced.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Identify **four** natural resources found in Zimbabwe.",
    points: [
      "Any one of: land/soils, minerals (gold, platinum, chrome, diamonds, coal, lithium), water/rivers/dams, forests/plants, wildlife, birds, fish, sunlight",
      "A second different resource",
      "A third different resource",
      "A fourth different resource",
    ],
    modelAnswer: "Gold, coal, forests and wildlife.",
    explanation: "One mark per correct resource (different minerals may count separately).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** ways in which natural resources are important to Zimbabwe.",
    points: [
      "Identifies food / farming",
      "Develops: land, soils and water allow crops and livestock, feeding families and the nation",
      "Identifies income / exports / employment",
      "Develops: minerals and farm products are exported for foreign currency, and mines and farms employ many people",
      "Identifies tourism / energy / culture",
      "Develops: e.g. wildlife and Victoria Falls attract tourists, or Kariba water generates electricity, or totems and sacred sites link resources to identity",
    ],
    modelAnswer: "Land, soils and water allow farmers to grow crops and keep livestock, which feeds families and the nation. Minerals such as gold and platinum are exported, earning foreign currency, and mines employ many people. Wildlife and Victoria Falls attract tourists, who bring income and jobs to areas such as Hwange.",
    hints: ["Think of food, money and visitors."],
    explanation: "One mark for each way and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "A fictional school in Gwanda wants to teach pupils that natural resources are heritage. Suggest **two** activities and explain how each would help.",
    points: [
      "Suggests a practical activity, e.g. planting and caring for indigenous trees, a water-saving project, or a clean-up of a local river",
      "Explains that pupils learn by doing that resources must be cared for and renewed for the future",
      "Suggests learning from elders or a visit, e.g. elders explaining sacred places and totems, or a trip to a national park",
      "Explains that pupils see the cultural and historical meaning of resources, not only their economic value",
    ],
    modelAnswer: "Pupils could plant and care for indigenous trees in the school grounds, so they learn by doing that resources must be renewed and passed on. The school could also invite elders to explain the totems and sacred places of the area, so pupils understand that resources carry cultural meaning as well as economic value.",
    hints: ["One activity that cares for a resource, one that teaches its meaning."],
    explanation: "One mark for each suitable activity and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: source("Source A", "an extract from a fictional ward newsletter, Matabeleland North, 2026",
      "Our ward is blessed with teak woodland, a river that never dries completely and herds of elephant that pass through each dry season. Families collect firewood, thatching grass and wild fruits, and visitors pay to see the elephants. Some of the oldest trees near the river are respected as sacred and may not be cut. This year the ward committee has asked families to cut only dead wood and to report anyone felling trees for sale.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which resource mentioned in the source is used to earn income from visitors?",
        options: [
          ["the elephants", "Correct: visitors pay to see the elephants."],
          ["the thatching grass", "The grass is used by families, not visitors."],
          ["the dead wood", "Dead wood is collected for firewood."],
          ["the wild fruits", "Families collect wild fruits for food."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** uses of the woodland mentioned in the source.",
        points: ["Firewood", "Thatching grass / wild fruits"],
        modelAnswer: "Families collect firewood and wild fruits (also thatching grass).",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the source shows that natural resources are heritage.",
        points: [
          "Some trees are sacred, showing cultural and spiritual value",
          "The committee's rules (dead wood only, report felling) protect resources for the future",
          "The resources are shared by the whole ward and support its way of life",
        ],
        modelAnswer: "Some old trees are respected as sacred, which shows that the woodland has cultural and spiritual value. The committee's rule to cut only dead wood and report illegal felling protects the woodland for future generations. The river, woodland and elephants are shared by the whole ward and support its way of life.",
      }),
    ],
    hints: ["In (c), look for culture, sharing and the future."],
    explanation: "A source-based practice item on natural resources as heritage.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about natural resources in Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Distinguish between renewable and non-renewable resources, giving **one** Zimbabwean example of each.",
        points: [
          "Renewable: can be replaced naturally if used carefully",
          "Example, e.g. forests, water, wildlife, fish",
          "Non-renewable: fixed amount, cannot be replaced once used",
          "Example, e.g. gold, coal at Hwange, platinum, diamonds",
        ],
        modelAnswer: "A renewable resource can be replaced naturally if it is used carefully, for example the teak forests of Matabeleland North. A non-renewable resource exists in a fixed amount and cannot be replaced once used, for example coal at Hwange.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Zimbabwe's natural resources are more important for their economic value than as heritage.\" Discuss.",
        points: [
          ["Economic value: exports, foreign currency, jobs, energy, tourism income", 2],
          ["Heritage value: identity (flag, totems), sacred places, inherited from ancestors, held for future generations", 2],
          ["The two are linked: unsustainable use for money destroys both; heritage value supports long-term economic value", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Natural resources have great economic value. Minerals such as gold and platinum earn foreign currency, farming feeds the nation and employs many people, Kariba and Hwange provide energy, and wildlife and Victoria Falls bring tourism income.\n\nHowever, they are also heritage. The flag's green and yellow stripes, totems and sacred forests, pools and hills show that land, animals and plants are tied to identity and belief. They were inherited from earlier generations and must be passed on.\n\nThe two values are linked. If resources are used only for quick profit, forests disappear, rivers silt up and wildlife declines, so the economic value is lost too. Treating resources as heritage encourages sustainable use that keeps their economic value for the future.\n\nI disagree with the statement. Economic value matters greatly today, but it lasts only if resources are also respected as heritage held for future generations.",
      }),
    ],
    hints: ["In (b), ask what happens to economic value if heritage is ignored."],
    explanation: "A practice evaluative item on the economic and heritage value of natural resources.",
  });

  b.card("DEFINITION", "Natural resource", "Anything found in nature that people use to meet their needs, such as land, water, minerals, plants and animals.");
  b.card("DEFINITION", "Renewable resource", "A resource that can be replaced naturally if used carefully, e.g. forests, water, wildlife.");
  b.card("DEFINITION", "Non-renewable resource", "A resource in a fixed amount that cannot be replaced once used, e.g. gold, coal, diamonds.");
  b.card("DEFINITION", "Sustainable use", "Using resources to meet present needs without spoiling them for future generations.");
  b.card("FACT", "Where are platinum and chrome mainly mined?", "Along the Great Dyke.");
  b.card("FACT", "Name two sources of electricity based on Zimbabwe's natural resources.", "Hydroelectric power from Lake Kariba and thermal power from coal at Hwange (also solar).");
  b.card("CONCEPT", "Give four ways natural resources are important.", "Food, income and exports, employment, energy (also tourism, raw materials, culture).");
  b.card("CONCEPT", "Why are natural resources heritage?", "They were inherited from earlier generations, are tied to identity and belief, belong to the nation and must be passed on to future generations.");
  b.card("FACT", "Which section of the Constitution gives environmental rights?", "Section 73.");
});
