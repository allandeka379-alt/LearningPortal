// Slice G1b: ecosystems — components, food chains and food webs (ZIMSEC 7.3.1).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.ecosystems.components", { file: "ecosystems/components", keyPrefix: "ecosystems.components" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an **abiotic** component of a vlei ecosystem?",
    options: [
      ["Water in the pools", "Correct: water is non-living, so it is abiotic."],
      ["Sedges along the edge", "Sedges are plants: living, so biotic."],
      ["Frogs in the shallows", "Frogs are animals: living, so biotic."],
      ["Bacteria in the mud", "Bacteria are living decomposers: biotic."],
    ],
    answer: "A",
    explanation: "Abiotic components are the non-living parts of an ecosystem: sunlight, temperature, rainfall, water, air, soil and rock. Plants, animals, fungi and bacteria are biotic.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In an ecosystem, which organisms make their own food using sunlight?",
    options: [
      ["Producers", "Correct: green plants and algae photosynthesise."],
      ["Primary consumers", "Primary consumers (herbivores) eat producers; they cannot make food."],
      ["Decomposers", "Decomposers feed on dead matter; they do not photosynthesise."],
      ["Detritivores", "Detritivores such as termites eat dead plant material."],
    ],
    answer: "A",
    explanation: "Producers (autotrophs) use sunlight, carbon dioxide and water to make sugars by photosynthesis. Every food chain starts with a producer.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In the food chain *maize → rat → snake → eagle*, which organism is the **secondary consumer**?",
    options: [
      ["Snake", "Correct: the snake eats the rat, a primary consumer, so it is at the third trophic level."],
      ["Rat", "The rat eats maize (a producer), so it is the primary consumer."],
      ["Eagle", "The eagle eats the snake, so it is the tertiary consumer."],
      ["Maize", "Maize is the producer at the first trophic level."],
    ],
    answer: "A",
    explanation: "Count from the producer: maize (producer), rat (primary consumer), snake (secondary consumer), eagle (tertiary consumer).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What do the arrows in a food chain show?",
    options: [
      ["The direction in which energy flows", "Correct: arrows point from the food to the feeder."],
      ["Which animal hunts which", "This reverses the meaning: arrows point to the eater, not the prey."],
      ["The size of each organism", "Size is not shown by arrows."],
      ["The number of each organism present", "Numbers are shown in a pyramid of numbers, not by arrows."],
    ],
    answer: "A",
    explanation: "Food-chain arrows show energy passing from the organism eaten to the organism that eats it: grass → zebra means energy moves from grass into the zebra.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A Form 1 class lists the following for a termite mound: *rain, leaf litter, sunlight*. Under which heading of a systems diagram do these belong?",
    options: [
      ["Inputs", "Correct: they enter the mound from outside."],
      ["Processes", "Processes are actions inside the system, such as decay and respiration."],
      ["Outputs", "Outputs leave the system, such as heat and carbon dioxide."],
      ["Stores", "A store holds material inside the system, such as nutrients in the mound soil."],
    ],
    answer: "A",
    explanation: "Rain, leaf litter and sunlight enter the mound, so they are inputs. Digestion, decay and respiration are processes; heat, carbon dioxide and flying termites are outputs.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a savanna food web, lions eat zebra and buffalo. Poachers remove most of the lions. What is the **most likely first** effect?",
    options: [
      ["Zebra numbers rise", "Correct: with fewer predators, more zebra survive."],
      ["Grass cover increases", "More zebra would eat more grass, so grass cover is more likely to fall."],
      ["Buffalo numbers fall", "Buffalo lose a predator too, so their numbers are more likely to rise."],
      ["Decomposers disappear", "Decomposers feed on all dead matter and would not disappear."],
    ],
    answer: "A",
    hints: ["Which animals did the lions eat?", "What happens to prey when their predator is removed?"],
    explanation: "Removing a predator lets its prey increase first. Later effects follow through the web: more zebra and buffalo graze more heavily, grass cover falls and soil erosion may increase. This is interdependence.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is a pyramid of energy always wider at the bottom than at the top?",
    options: [
      ["Energy is used and lost as heat at each trophic level", "Correct: respiration, movement and waste use most of the energy at each level."],
      ["Top predators are larger than producers", "Size explains a pyramid of biomass, not why energy decreases."],
      ["Decomposers take all the energy from the top level", "Decomposers act at every level, not only the top."],
      ["Producers make new energy from the soil", "Energy enters from sunlight, not from the soil."],
    ],
    answer: "A",
    hints: ["Think about what an animal does with the food it eats."],
    explanation: "Each organism uses most of the energy it takes in for respiration, movement and warmth; some is lost in dung and uneaten parts. Only about 10% passes to the next level, so each level holds less energy.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of these is a **decomposer**?",
    options: [
      ["Mushroom fungus on a rotting log", "Correct: fungi break dead matter down into nutrients."],
      ["Grasshopper eating green grass leaves", "A grasshopper is a primary consumer."],
      ["Algae in a pond", "Algae photosynthesise, so they are producers."],
      ["Hawk eating a lizard", "A hawk is a carnivore (secondary or tertiary consumer)."],
    ],
    answer: "A",
    explanation: "Decomposers are bacteria and fungi. They break down dead plants, animals and dung and return nutrients to the soil.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "In a fictional study plot, grass stores 45,000 units of energy in a year. Using the rule that about 10% of the energy passes to the next trophic level, how many units reach the **primary consumers**?",
    value: 4500,
    wrong: [450, 40500],
    explanation: "Primary consumers receive about 10% of the producer level: $45\\,000 \\times 0.1 = 4\\,500$ units.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "Fictional data for a food chain: grass 60,000 units; impala 5,400 units; leopard 480 units. Calculate the percentage of the impala's energy that passes to the leopard. Give your answer to one decimal place.",
    value: 8.9, unit: "%", tol: 0.05,
    wrong: [9, 11.1, 0.8],
    hints: ["Divide the energy at the higher level by the energy at the level below.", "Multiply by 100."],
    workedSolution: "1. Energy passed on = 480 units; energy at the level below = 5,400 units.\n2. Percentage = $\\dfrac{480}{5\\,400} \\times 100 = 8.888\\ldots$\n3. To one decimal place: 8.9%.",
    explanation: "$480 \\div 5\\,400 \\times 100 = 8.9\\%$, close to the usual rough figure of about 10%.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Animals that eat only plants are called {{blank:a}}, and animals that eat both plants and animals are called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["herbivores", "herbivore", "primary consumers"], wrong: "carnivores" },
      { id: "b", accepted: ["omnivores", "omnivore"], wrong: "decomposers" },
    ],
    explanation: "Herbivores (such as kudu and grasshoppers) eat plants; carnivores eat animals; omnivores (such as baboons and people) eat both.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each organism from a pond to its role.",
    pairs: [["Water lily", "producer"], ["Tadpole grazing algae", "primary consumer"], ["Kingfisher", "secondary consumer"], ["Bacteria in the mud", "decomposer"]],
    explanation: "The water lily photosynthesises (producer); tadpoles eat algae (primary consumer); kingfishers eat fish and tadpoles (secondary consumer); bacteria break down dead matter (decomposer).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Soil is a biotic component of an ecosystem.",
    answer: false,
    explanation: "False. Soil (minerals, water and air) is abiotic. The living things in it, such as earthworms and bacteria, are biotic.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the process by which green plants use sunlight to make food.",
    accepted: ["photosynthesis"],
    wrong: ["respiration", "transpiration"],
    explanation: "**Photosynthesis**: plants turn carbon dioxide and water into sugars using light energy, releasing oxygen.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why there are usually fewer lions than zebra in a savanna ecosystem.",
    points: [
      "States that lions are at a higher trophic level than zebra",
      "Explains that energy is lost (respiration, heat, waste) at each level / only about 10% is passed on",
      "So less energy is available to support lions, and each lion needs many prey animals / a large territory",
    ],
    hints: ["Think about the pyramid of energy."],
    modelAnswer: "Lions are secondary consumers, a level above zebra. At each level most energy is used in respiration and lost as heat, so only about a tenth passes on. Less energy reaches the lions, so the ecosystem can support only a few, each needing many zebra.",
    explanation: "Energy loss between trophic levels limits the number of animals at the top of a food chain.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "For a pond micro-ecosystem, identify **two** inputs and **two** processes.",
    points: [
      "One input, e.g. sunlight / rainfall / runoff from surrounding land",
      "A second, different input, e.g. leaves blown in / nutrients washed in / air (oxygen, carbon dioxide)",
      "One process, e.g. photosynthesis by water plants and algae / feeding by consumers",
      "A second, different process, e.g. decomposition of dead matter / respiration / evaporation",
    ],
    hints: ["Inputs come from outside the pond.", "Processes happen inside it."],
    modelAnswer: "Inputs: sunlight and rainfall. Processes: photosynthesis by water lilies and algae, and decomposition of dead leaves by bacteria.",
    explanation: "Inputs enter the system from outside; processes transform material and energy inside it; outputs leave it (water vapour, oxygen, outflowing water).",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "A Form 2 class surveyed a 10 m by 10 m plot of savanna near their school (fictional data).\n\n| Organism | Number counted | Feeds on |\n| --- | --- | --- |\n| Grass plants | 2,400 | sunlight (photosynthesis) |\n| Grasshoppers | 180 | grass |\n| Lizards | 6 | grasshoppers |\n| Shrike (bird) | 1 | lizards and grasshoppers |",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which organism in the table is the producer?",
        options: [
          ["Grass plants", "Correct: grass photosynthesises."],
          ["Grasshoppers", "Grasshoppers eat grass, so they are primary consumers."],
          ["Lizards", "Lizards eat grasshoppers: secondary consumers."],
          ["Shrike", "The shrike eats animals: a consumer."],
        ],
        answer: "A",
        explanation: "The producer is the organism that makes its own food by photosynthesis: the grass.",
      }),
      P.num({
        label: "(b)",
        marks: 1,
        stem: "How many trophic levels are shown in the food chain grass → grasshopper → lizard → shrike?",
        value: 4,
        explanation: "Grass (1), grasshopper (2), lizard (3), shrike (4).",
      }),
      P.num({
        label: "(c)",
        marks: 1,
        stem: "Calculate how many grass plants there are for every grasshopper.",
        value: 13.3, tol: 0.05, answer: "13.3",
        explanation: "$2\\,400 \\div 180 = 13.3$ grass plants per grasshopper.",
      }),
      P.manual({
        label: "(d)",
        marks: 2,
        stem: "The shrike eats both lizards and grasshoppers. Explain why this makes it a secondary **and** a tertiary consumer.",
        points: [
          "Eating grasshoppers (primary consumers) makes it a secondary consumer",
          "Eating lizards (secondary consumers) makes it a tertiary consumer",
        ],
        modelAnswer: "When it eats grasshoppers it feeds at the third level (secondary consumer); when it eats lizards it feeds at the fourth level (tertiary consumer).",
      }),
      P.manual({
        label: "(e)",
        marks: 3,
        stem: "Describe the shape of a pyramid of numbers drawn from the table and explain it.",
        points: [
          "Describes: a wide base (2,400 grass) narrowing to a very small top (1 shrike)",
          "Explains: energy is lost at each trophic level",
          "So fewer organisms can be supported at each higher level",
        ],
        modelAnswer: "It has a very wide base of 2,400 grass plants and narrows steeply to one shrike at the top, because energy is lost at each level, so fewer animals can be fed at each higher level.",
      }),
    ],
    hints: ["Start counting trophic levels at the producer."],
    explanation: "The table shows a typical pyramid of numbers: many producers, fewer herbivores, very few carnivores, because energy decreases at every trophic level.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 540,
    stem: "Read this description of a vlei (fictional field notes).\n\n*In January the vlei is waterlogged. Sedges and grasses grow thickly. Frogs eat insects, and herons eat frogs. Dead plants rot in the black mud. Water seeps slowly out of the lower end into a stream. Cattle graze the edges in the dry season.*",
    parts: [
      P.short({
        label: "(a)",
        stem: "From the notes, name **one** producer.",
        accepted: ["sedges", "sedge", "grasses", "grass"],
        wrong: ["frogs"],
        explanation: "Sedges and grasses are green plants that photosynthesise.",
      }),
      P.mcq({
        label: "(b)",
        stem: "Which of these is an **output** of the vlei system?",
        options: [
          ["Water seeping into a stream", "Correct: it leaves the system."],
          ["Rainfall in January", "Rain enters the vlei: an input."],
          ["Plants rotting in the mud", "Decay is a process inside the system."],
          ["Frogs eating insects", "Feeding is a process inside the system."],
        ],
        answer: "A",
        explanation: "Outputs leave the system. Water seeping out into the stream is an output; rain is an input; decay and feeding are processes.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "Write a food chain of **three** organisms from the notes, with arrows in the correct direction.",
        points: [
          "Three organisms from the notes in a feeding sequence starting with a producer or insects, e.g. grass → insect → frog, or insect → frog → heron",
          "Arrows point from the food to the feeder",
        ],
        modelAnswer: "sedges → insects → frogs (or insects → frogs → herons)",
      }),
      P.manual({
        label: "(d)",
        marks: 4,
        stem: "Suggest how draining the vlei for crops could affect the organisms in it.",
        points: [
          "Sedges and wetland grasses die as the soil dries",
          "Frogs lose their breeding pools / numbers fall",
          "Herons lose their food (frogs) and leave or decline",
          "Less rotting / fewer decomposers in wet mud, or the stream gets less steady seepage",
        ],
        modelAnswer: "Without water, sedges die and frogs lose the pools they breed in. Herons, which eat frogs, would leave. Decay in the wet mud would change and the stream would lose the steady seepage that kept it flowing.",
      }),
    ],
    hints: ["Outputs leave the system; processes happen inside it."],
    explanation: "A vlei is a micro-ecosystem: rain and runoff are inputs, photosynthesis, feeding and decay are processes, and seepage is an output. Changing one component affects the whole food web.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "\"Decomposers are the most important organisms in an ecosystem.\" To what extent do you agree?",
    points: [
      "Decomposers break down dead matter and dung",
      "They return nutrients to the soil for producers / without them nutrients stay locked in dead matter",
      "Producers are also essential: they capture the sunlight energy that every other organism depends on",
      "Consumers control numbers (e.g. predators prevent overgrazing) / interdependence",
      "Removing any level disrupts the whole web, with an example",
      "A reasoned conclusion (e.g. all are interdependent, but producers and decomposers are the foundation)",
    ],
    levels: geographyLevels(6),
    hints: ["Consider what would happen if each group disappeared.", "Weigh decomposers against producers."],
    wordLimit: { max: 300 },
    modelAnswer: "Decomposers such as bacteria and fungi break down dead leaves, dead animals and dung, releasing nutrients that plants take up again. Without them, nutrients would stay locked in dead matter and plant growth would slow. However, producers are just as vital: only they capture sunlight energy by photosynthesis, so no consumer or decomposer could exist without them. Consumers also matter, because predators keep herbivore numbers down and prevent overgrazing. Every group depends on the others, so I agree only partly: decomposers and producers form the foundation, but the ecosystem works only because all its parts are interdependent.",
    explanation: "A good answer weighs decomposers against producers and consumers and reaches a judgement based on interdependence.",
  });
  b.card("DEFINITION", "What is an **ecosystem**?", "A community of living organisms interacting with each other and with their non-living environment in a particular area.");
  b.card("VOCABULARY", "Biotic vs abiotic components", "Biotic: living (plants, animals, fungi, bacteria). Abiotic: non-living (sunlight, temperature, rainfall, water, air, soil, rock).");
  b.card("DEFINITION", "What is a **producer**?", "An organism, usually a green plant or alga, that makes its own food by photosynthesis.");
  b.card("DEFINITION", "What is a **decomposer**?", "A bacterium or fungus that breaks down dead matter and dung, returning nutrients to the soil.");
  b.card("CONCEPT", "Which way do the arrows point in a food chain?", "From the food to the feeder, showing the direction of energy flow (grass → zebra → lion).");
  b.card("FACT", "Roughly how much energy passes from one trophic level to the next?", "About 10%; the rest is used in respiration, movement and warmth or lost in waste.");
  b.card("CONCEPT", "Inputs, processes and outputs of a system", "Inputs enter (sunlight, rain, leaf litter); processes happen inside (photosynthesis, decay, feeding); outputs leave (oxygen, heat, water).");
  b.card("VOCABULARY", "What is a **micro-ecosystem**?", "A small ecosystem that can be studied at close range, such as a pond, vlei, rotting log or termite mound.");
  b.card("CONCEPT", "What does a food web show that a food chain does not?", "That most organisms eat and are eaten by several others, so the parts of an ecosystem are interdependent.");
});
