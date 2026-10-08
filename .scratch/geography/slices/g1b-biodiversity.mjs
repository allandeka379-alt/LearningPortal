// Slice G1b: ecosystems — biodiversity and the value of ecosystems (ZIMSEC 7.3.2).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.ecosystems.biodiversity", { file: "ecosystems/biodiversity", keyPrefix: "ecosystems.biodiversity" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **biodiversity** mean?",
    options: [
      ["The variety of life in an area", "Correct: species, genetic and habitat variety."],
      ["The total number of animals in an area", "Biodiversity is about variety, not simply numbers."],
      ["The amount of vegetation in an area", "A dense maize field has much vegetation but low biodiversity."],
      ["The area of land set aside for wildlife", "That is a protected area, not biodiversity itself."],
    ],
    answer: "A",
    explanation: "Biodiversity is the variety of living things: the number of species, the genetic variety within them and the variety of habitats.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A village keeps five local varieties of sorghum. Which type of biodiversity does this show?",
    options: [
      ["Genetic diversity", "Correct: variety within one species."],
      ["Species diversity", "All five are the same species, sorghum."],
      ["Habitat diversity", "Habitat diversity is the variety of places where organisms live."],
      ["Ecosystem services", "These are benefits from ecosystems, not a type of diversity."],
    ],
    answer: "A",
    explanation: "Different varieties of one crop carry different genes (drought tolerance, taste, pest resistance): genetic diversity.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is an ecosystem **service** rather than an ecosystem good?",
    options: [
      ["Roots binding soil on a hillside", "Correct: a process that benefits people, not a product."],
      ["Poles cut for a cattle kraal", "Poles are a product (a good)."],
      ["Honey sold at a growth point", "Honey is a product (a good)."],
      ["Mopane worms dried for sale", "Mopane worms are a product (a good)."],
    ],
    answer: "A",
    explanation: "Goods are products people harvest (timber, honey, food). Services are processes such as soil protection, water regulation, pollination and carbon storage.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which area is likely to have the **highest** species diversity?",
    options: [
      ["A mixed woodland with a vlei and a rocky kopje", "Correct: several habitats support many species."],
      ["A large field of maize", "A monoculture has very few species."],
      ["A tarred school car park", "Almost no habitat for plants or animals."],
      ["A eucalyptus plantation of trees all the same age", "A single-species plantation supports few other species."],
    ],
    answer: "A",
    explanation: "Habitat variety increases species diversity: each habitat (woodland, wetland, rock) supports different plants and animals.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which business is **most** likely to use a local woodland sustainably?",
    options: [
      ["Beekeeping in the standing woodland", "Correct: the business depends on the trees staying alive."],
      ["Clearing the woodland to sell charcoal", "This removes the resource completely."],
      ["Cutting all large trees for timber at once", "This exhausts the timber faster than it regrows."],
      ["Burning the woodland each year to hunt mice", "Frequent fires damage trees and soil."],
    ],
    answer: "A",
    hints: ["Which business still has its resource in ten years?"],
    explanation: "Beekeeping gives an income only while the trees flower, so it encourages people to protect the woodland. The other options use the resource up.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How does woodland help keep a stream flowing during the dry season?",
    options: [
      ["It slows runoff so more rain soaks into the ground", "Correct: infiltration recharges groundwater, which feeds the stream."],
      ["Its leaves trap water and release it in the dry season", "Leaves do not store rain for months."],
      ["Trees pump groundwater into the stream", "Trees take water up; they do not pump it into streams."],
      ["Shade stops all evaporation from the stream", "Shade reduces evaporation a little but does not supply water."],
    ],
    answer: "A",
    hints: ["Think about what happens to rain on bare ground compared with ground under trees."],
    explanation: "Leaf litter and roots slow runoff and help rain infiltrate. The stored groundwater seeps into streams over the dry season.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **habitat**?",
    options: [
      ["A vlei where frogs breed", "Correct: a place where organisms live."],
      ["The process of photosynthesis", "A process, not a place."],
      ["A food chain", "A feeding sequence, not a place."],
      ["Genetic variety in cattle", "A type of biodiversity, not a place."],
    ],
    answer: "A",
    explanation: "A habitat is the place where a plant or animal lives, such as a vlei, a kopje or a river bank.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Students recorded tree species in two quadrats (fictional data). Quadrat 1: msasa, munondo, mobola plum, mutondo. Quadrat 2: msasa, mobola plum, wild loquat, acacia, mutondo. How many **different** species were recorded altogether?",
    value: 6,
    wrong: [9, 5, 4],
    explanation: "List each species once: msasa, munondo, mobola plum, mutondo, wild loquat, acacia = 6 species. Msasa, mobola plum and mutondo appear in both but are counted once.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A craft group harvests reeds from a vlei. The vlei produces about 4,000 bundles of new reeds a year (fictional data). The group decides to cut no more than 60% of the annual growth. What is the largest number of bundles they should cut in a year?",
    value: 2400,
    wrong: [1600, 6000, 240],
    hints: ["Find 60% of the annual growth."],
    workedSolution: "1. Annual growth = 4,000 bundles.\n2. 60% of 4,000 = $0.6 \\times 4\\,000 = 2\\,400$ bundles.",
    explanation: "Cutting at most $0.6 \\times 4\\,000 = 2\\,400$ bundles leaves 40% to regrow and keep the reed bed healthy.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Forests store carbon and so act as carbon {{blank:a}}; bees from woodland help {{blank:b}} nearby crops.",
    blanks: [
      { id: "a", accepted: ["sinks", "sink", "stores", "store"], wrong: "sources" },
      { id: "b", accepted: ["pollinate"], wrong: "fertilise the soil of" },
    ],
    explanation: "Forests are **carbon sinks** when they absorb more carbon than they release. Bees **pollinate** crops such as fruit trees and sunflowers.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each woodland product to a small business that could use it.",
    pairs: [
      ["Nectar from flowering trees", "Beekeeping"],
      ["Grass and reeds", "Weaving mats and baskets"],
      ["Wild fruits", "Making juice and jam"],
      ["Birds and scenery", "Eco-tourism guiding"],
    ],
    explanation: "Each business turns an ecosystem product into income; it is sustainable only if harvesting allows the resource to recover.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A large field planted with a single crop has high biodiversity.",
    answer: false,
    explanation: "False. A monoculture contains one main species and few others, so its biodiversity is low.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of biodiversity that refers to the variety of habitats in an area.",
    accepted: ["habitat diversity", "ecosystem diversity", "habitat biodiversity"],
    wrong: ["species diversity", "genetic diversity"],
    explanation: "**Habitat (ecosystem) diversity** is the variety of habitats, such as woodland, grassland, vlei and kopje.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Outline **three** goods that rural households obtain from miombo woodland.",
    points: [
      "Fuelwood / firewood for cooking",
      "Timber or poles for building, fencing or furniture",
      "Food (wild fruits, mushrooms, honey, edible insects) or medicines or craft materials",
    ],
    modelAnswer: "Firewood for cooking, poles for building huts and kraals, and wild fruits and honey for food.",
    explanation: "Woodland goods are products people harvest directly; many rural households depend on them.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which ecosystems protect the soil.",
    points: [
      "Plant roots bind soil particles together",
      "so soil is less easily washed or blown away (less erosion)",
      "Leaf litter / vegetation cover shields the ground from raindrop impact or slows runoff",
      "so less soil is splashed or carried downslope, and organic matter improves soil structure",
    ],
    hints: ["Think of what is under the ground and what is on top of it."],
    modelAnswer: "Roots bind soil particles, so rain and wind cannot easily remove them. Leaf litter and plant cover break the force of raindrops and slow runoff, so less soil is carried away; as the litter decays it adds humus that holds the soil together.",
    explanation: "Vegetation protects soil both below ground (roots) and above it (cover and litter).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 600,
    stem: "A Form 2 class recorded the number of plant species in five habitats near their school (fictional data).\n\n| Habitat | Species recorded |\n| --- | --- |\n| Miombo woodland | 24 |\n| Grassland | 15 |\n| Vlei | 18 |\n| Maize field | 3 |\n| Rocky kopje | 12 |",
    parts: [
      P.short({
        label: "(a)",
        stem: "Name the habitat with the **lowest** number of species.",
        accepted: ["maize field", "the maize field", "maize"],
        wrong: ["rocky kopje"],
        explanation: "The maize field has only 3 species.",
      }),
      P.num({
        label: "(b)",
        marks: 1,
        stem: "Calculate the mean number of species per habitat.",
        value: 14.4, tol: 0.05, answer: "14.4",
        explanation: "$(24 + 15 + 18 + 3 + 12) \\div 5 = 72 \\div 5 = 14.4$.",
      }),
      P.num({
        label: "(c)",
        marks: 1,
        stem: "How many times more species were found in the woodland than in the maize field?",
        value: 8,
        explanation: "$24 \\div 3 = 8$ times.",
      }),
      P.manual({
        label: "(d)",
        marks: 2,
        stem: "Suggest why the maize field has so few species.",
        points: [
          "It is a monoculture: one crop is planted",
          "Weeds are removed / herbicides, ploughing or pesticides destroy other plants",
        ],
        modelAnswer: "Only maize is planted, and the farmer weeds and ploughs the field, removing other plants.",
      }),
      P.manual({
        label: "(e)",
        marks: 3,
        stem: "Suggest **three** benefits the community gets from the miombo woodland.",
        points: [
          "A good: fuelwood, poles, wild fruits, honey, medicines or craft materials",
          "A service: soil protection, water regulation, carbon storage or oxygen",
          "Another benefit: grazing, income from tourism/beekeeping, cultural or spiritual value",
        ],
        modelAnswer: "Firewood and wild fruits, protection of the soil from erosion, and income from selling honey.",
      }),
    ],
    hints: ["For (b), add all five values and divide by five."],
    explanation: "Habitats with varied vegetation support more species; cultivated monocultures support very few.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", secs: 720,
    stem: "A youth group near a woodland with a waterfall wants to start a small business. They are considering (1) a charcoal business, (2) a guided eco-tourism walk to the waterfall, (3) beekeeping.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which option is **least** sustainable?",
        options: [
          ["The charcoal business", "Correct: it cuts and burns trees faster than they regrow."],
          ["The guided walk", "Walks can be managed to cause little damage."],
          ["Beekeeping", "Beekeeping depends on standing trees."],
          ["They are equally sustainable", "Charcoal clearly removes the resource."],
        ],
        answer: "A",
        explanation: "Charcoal production removes trees; the woodland, and therefore the business, would run out.",
      }),
      P.manual({
        label: "(b)",
        marks: 3,
        stem: "Describe **three** things the group would need to start the eco-tourism walk.",
        points: [
          "Trained guides who know the plants, birds and history",
          "A safe, marked path / signs / basic facilities at the waterfall",
          "Advertising or links to visitors (lodges, schools, social media) / a fee system and permission from the community or authorities",
        ],
        modelAnswer: "Guides trained to explain the plants and birds, a safe marked path to the waterfall, and a way of attracting visitors and collecting a fee.",
      }),
      P.manual({
        label: "(c)",
        marks: 4,
        stem: "Explain how the eco-tourism walk could help protect the woodland.",
        points: [
          "Income depends on the woodland staying attractive",
          "so the community has a reason to stop cutting/burning",
          "Part of the fees can pay for fireguards, tree planting or patrols",
          "Visitors and guides learn about conservation / environmental awareness grows",
        ],
        modelAnswer: "The walk earns money only if the woodland and waterfall stay attractive, so the community gains a reason to stop tree cutting and late fires. Fees can pay for fireguards and tree planting, and guiding raises awareness of conservation among both visitors and local people.",
      }),
    ],
    hints: ["A sustainable business keeps its resource for the future."],
    explanation: "Businesses that depend on a healthy ecosystem give people a reason to protect it.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "\"The services that ecosystems provide are more valuable than the goods people take from them.\" Discuss this statement with reference to a Zimbabwean ecosystem.",
    points: [
      "Goods named and their value (fuelwood, timber, food, medicine, crafts, income)",
      "Services named: soil protection, water regulation/streamflow, rainfall, carbon storage, pollination",
      "Services support farming and water supply for many people, often far from the ecosystem",
      "Goods give direct, immediate income and survival for poor households",
      "Over-harvesting goods destroys services (e.g. deforestation leads to erosion and dry streams)",
      "Reasoned judgement with a named ecosystem (e.g. miombo woodland, a vlei)",
    ],
    levels: geographyLevels(6),
    hints: ["Think about who benefits from each, and for how long."],
    wordLimit: { max: 300 },
    modelAnswer: "Miombo woodland gives households firewood, poles, wild fruits, honey and medicines, which matter for daily survival and income. Its services are less visible but reach more people: roots and litter protect the soil, the woodland helps rain soak in so streams keep flowing, trees store carbon and bees pollinate crops. If goods are over-harvested, these services are lost: cleared slopes erode and streams dry up. So the services are probably more valuable in the long run, but the goods matter most to poor families today, so the best answer is sustainable harvesting that keeps both.",
    explanation: "Weigh direct goods against wider, long-term services, using a named ecosystem, and conclude.",
  });
  b.card("DEFINITION", "What is **biodiversity**?", "The variety of life in an area: species diversity, genetic diversity and habitat diversity.");
  b.card("VOCABULARY", "Species diversity", "The number of different species in an area and how evenly individuals are spread among them.");
  b.card("VOCABULARY", "Genetic diversity", "Variety of genes within one species, e.g. local varieties of sorghum or indigenous chickens.");
  b.card("VOCABULARY", "Habitat diversity", "The variety of habitats in an area, e.g. woodland, grassland, vlei, kopje and river bank.");
  b.card("CONCEPT", "Ecosystem goods vs services", "Goods are products (timber, fuel, food, medicines). Services are processes (soil protection, water regulation, pollination, carbon storage).");
  b.card("FACT", "Small businesses that can use woodland sustainably", "Beekeeping, eco-tourism, crafts from grass and reeds, processing wild fruits, tree nurseries.");
  b.card("CONCEPT", "What makes a resource-based business sustainable?", "The resource is harvested no faster than it can recover, so it lasts for future use.");
  b.card("CONCEPT", "Why is a monoculture low in biodiversity?", "One crop is planted and other plants are removed by weeding, ploughing or chemicals.");
});
