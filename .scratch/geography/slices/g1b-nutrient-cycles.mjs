// Slice G1b: ecosystems — nutrient, nitrogen and carbon cycles (ZIMSEC 7.3.5).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.ecosystems.nutrient-cycles", { file: "ecosystems/nutrient-cycles", keyPrefix: "ecosystems.nutrient-cycles" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which are the **three stores** of the nutrient cycle?",
    options: [
      ["Biomass, litter and soil", "Correct: nutrients are held in living things, dead organic matter on the ground and the soil."],
      ["Air, water and rock", "These are stores in other cycles, not the three nutrient-cycle stores."],
      ["Producers, consumers and decomposers", "These are groups of organisms, not stores."],
      ["Rainfall, runoff and leaching", "Rainfall is an input; runoff and leaching are outputs."],
    ],
    answer: "A",
    explanation: "The nutrient cycle is drawn as three stores: **biomass** (living plants and animals), **litter** (dead leaves and twigs on the surface) and **soil**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which transfer moves nutrients from the **litter** store into the **soil** store?",
    options: [
      ["Decomposition", "Correct: decomposers break litter down and release nutrients into the soil."],
      ["Uptake by roots", "Uptake moves nutrients from soil to biomass."],
      ["Leaf fall", "Leaf fall moves nutrients from biomass to litter."],
      ["Leaching", "Leaching removes nutrients from the soil; it is an output."],
    ],
    answer: "A",
    explanation: "Fallout (leaf fall) links biomass to litter, decomposition links litter to soil, and uptake links soil back to biomass.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a tropical rainforest, where are **most** of the nutrients stored?",
    options: [
      ["In the biomass", "Correct: rapid decay and quick uptake keep most nutrients in the plants."],
      ["In the litter", "Litter decays within weeks in the hot, wet climate, so this store is small."],
      ["In the soil", "Heavy rain leaches the soil, so the soil store is small."],
      ["In the bedrock", "Bedrock is a source of new nutrients by weathering, not the main store."],
    ],
    answer: "A",
    explanation: "Hot, wet conditions make litter rot quickly; dense roots absorb nutrients almost at once, and heavy rainfall leaches what is left in the soil. So the biomass store is by far the largest.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which organisms change nitrogen gas into compounds in the root nodules of groundnuts and beans?",
    options: [
      ["Nitrogen-fixing bacteria", "Correct: they live in nodules on the roots of legumes."],
      ["Denitrifying bacteria", "These change nitrates back into nitrogen gas."],
      ["Fungi on the roots", "Fungi are decomposers; they do not fix nitrogen from the air."],
      ["Earthworms in the soil", "Earthworms mix soil and break down litter but do not fix nitrogen."],
    ],
    answer: "A",
    explanation: "Legumes (groundnuts, beans, soya, cowpeas, acacia) carry **nitrogen-fixing bacteria** in root nodules, which is why legumes improve soil fertility in crop rotations.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In which conditions is **denitrification** most likely to happen?",
    options: [
      ["In waterlogged soil of a vlei", "Correct: denitrifying bacteria thrive where oxygen is scarce."],
      ["In dry, sandy soil on a ridge", "Well-aerated dry soil does not favour denitrifying bacteria."],
      ["In the leaves of a tree", "Denitrification is a soil process carried out by bacteria."],
      ["During a lightning storm", "Lightning fixes nitrogen; it does not denitrify."],
    ],
    answer: "A",
    hints: ["Denitrifying bacteria work best where there is little oxygen."],
    explanation: "Denitrifying bacteria convert nitrates back into nitrogen gas. They are most active in waterlogged soils with little oxygen, such as vleis and flooded fields.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which process **removes** carbon dioxide from the air?",
    options: [
      ["Photosynthesis", "Correct: plants take in carbon dioxide and store the carbon as sugars."],
      ["Respiration", "Respiration releases carbon dioxide."],
      ["Combustion of charcoal", "Burning releases carbon dioxide."],
      ["Decomposition of litter", "Decomposers respire and release carbon dioxide."],
    ],
    answer: "A",
    explanation: "Photosynthesis is the main way carbon moves from the air into living things. Respiration, decomposition and combustion all return carbon dioxide to the air.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Fertiliser washes off farmland into a dam. Which sequence of events is **eutrophication**?",
    options: [
      ["Algae grow fast, then decay and use up oxygen, so fish die", "Correct: the extra nutrients feed algae whose decay removes oxygen."],
      ["The water becomes acidic, so plants stop growing", "Eutrophication is about excess nutrients, not acidity."],
      ["Fish eat the fertiliser and grow larger", "Fish do not feed on fertiliser; numbers usually fall."],
      ["The fertiliser settles and the water becomes clearer", "The water usually turns green and murky with algae."],
    ],
    answer: "A",
    hints: ["Nitrates and phosphates are plant foods.", "What uses oxygen when dead algae rot?"],
    explanation: "Nitrates and phosphates feed algae and water weeds, which grow rapidly. When they die, bacteria decompose them and use up the dissolved oxygen, so fish and other animals die.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does a cleared patch of rainforest soon become infertile?",
    options: [
      ["The main nutrient store, the vegetation, has been removed", "Correct: most nutrients were held in the biomass."],
      ["The temperature of the bare soil falls sharply once the trees are gone", "Bare ground usually becomes hotter, not cooler."],
      ["Leaching stops when there are no trees", "Leaching increases, because no roots take up the nutrients and the soil is exposed to heavy rain."],
      ["Decomposers multiply and destroy the soil", "Decomposers release nutrients; they do not destroy soil."],
    ],
    answer: "A",
    hints: ["Which store is largest in the rainforest?"],
    explanation: "Most rainforest nutrients are in the biomass. Clearing removes them, and the bare soil is leached and eroded by heavy rain, so crops fail after a few seasons.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Fictional data: in a woodland, the nutrient stores hold biomass 520 units, litter 80 units and soil 400 units. What percentage of the total is held in the **soil**?",
    value: 40, unit: "%",
    wrong: [52, 8, 400],
    explanation: "Total = $520 + 80 + 400 = 1\\,000$ units. Soil share = $400 \\div 1\\,000 \\times 100 = 40\\%$.",
  });
  b.calc({
    d: 3, skill: "ANALYSIS",
    stem: "Fictional data for one hectare of farmland: 90 kg of nitrogen is in the soil at planting. The maize harvest removes 35 kg and leaching removes 12 kg. A groundnut crop the previous year had added 20 kg, already included in the 90 kg. How many kilograms of nitrogen remain in the soil after harvest (assume no other gains or losses)?",
    value: 43,
    wrong: [63, 23, 55],
    hints: ["Only subtract the outputs from the starting store.", "The 20 kg is already counted."],
    workedSolution: "1. Starting store = 90 kg (it already includes the groundnut contribution).\n2. Outputs = 35 kg (harvest) + 12 kg (leaching) = 47 kg.\n3. Remaining = 90 − 47 = 43 kg.",
    explanation: "$90 - (35 + 12) = 43$ kg. Adding the 20 kg again would count it twice.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "In the nitrogen cycle, bacteria change ammonium compounds into nitrates by {{blank:a}}, and change nitrates back into nitrogen gas by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["nitrification"], choices: ["nitrification", "denitrification", "fixation", "leaching"] },
      { id: "b", accepted: ["denitrification"], choices: ["nitrification", "denitrification", "fixation", "leaching"] },
    ],
    wrong: [["denitrification", "nitrification"]],
    explanation: "**Nitrification** makes nitrates that plants can absorb; **denitrification** returns nitrogen to the air, mainly in waterlogged soils.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each carbon-cycle process to what it does.",
    pairs: [
      ["Photosynthesis", "Takes carbon dioxide from the air into plants"],
      ["Combustion", "Releases carbon dioxide quickly by burning"],
      ["Fossilisation", "Turns buried dead matter into coal over millions of years"],
      ["Respiration", "Releases carbon dioxide as organisms use food for energy"],
    ],
    explanation: "Photosynthesis is the main carbon sink process; respiration and combustion are sources; fossilisation locks carbon away in rocks for a very long time.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Energy is recycled in an ecosystem in the same way as nutrients.",
    answer: false,
    explanation: "False. Energy flows through an ecosystem once and is lost as heat; nutrients and carbon are recycled.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Lightning can fix nitrogen from the air into compounds that reach the soil in rain.",
    answer: true,
    explanation: "True. The energy of lightning combines nitrogen and oxygen; the compounds dissolve in rain and add a small amount of nitrogen to the soil.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the process by which heavy rain washes dissolved nutrients down through the soil, out of reach of plant roots.",
    accepted: ["leaching"],
    wrong: ["eluviation of clay", "runoff"],
    explanation: "**Leaching** removes soluble nutrients downwards. It is strongest where rainfall is heavy, such as in the rainforest.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain why a farmer in a communal area might plant groundnuts in a field before planting maize.",
    points: [
      "Groundnuts are legumes with nitrogen-fixing bacteria in root nodules",
      "The bacteria change nitrogen from the air into compounds; decaying roots and leaves add nitrogen to the soil",
      "The following maize crop has more nitrogen / needs less (costly) fertiliser / yields more",
    ],
    hints: ["What lives in the roots of legumes?"],
    modelAnswer: "Groundnuts are legumes whose root nodules hold nitrogen-fixing bacteria. When the plants' roots and leaves decay, the fixed nitrogen is added to the soil, so the maize that follows has more nitrogen and needs less bought fertiliser.",
    explanation: "Crop rotation with legumes is a practical use of the nitrogen cycle.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** ways in which people disrupt the carbon cycle.",
    points: [
      "Burning fossil fuels (coal, oil, gas) / charcoal",
      "releases stored carbon as carbon dioxide quickly, increasing the amount in the air",
      "Deforestation / veld fires",
      "removes plants that take in carbon dioxide (a carbon sink) and releases the carbon in the wood",
    ],
    hints: ["Think of burning and of clearing vegetation."],
    modelAnswer: "Burning coal in power stations releases carbon that was locked away for millions of years, adding carbon dioxide to the air. Clearing forests removes trees that absorbed carbon dioxide and, when the wood is burnt, releases the carbon they stored.",
    explanation: "Human activities move carbon from long-term stores into the air faster than natural processes remove it.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows the size of nutrient stores in two ecosystems (fictional data, in units per hectare).\n\n| Store | Ecosystem X | Ecosystem Y |\n| --- | --- | --- |\n| Biomass | 900 | 150 |\n| Litter | 40 | 60 |\n| Soil | 160 | 590 |",
    parts: [
      P.num({
        label: "(a)",
        marks: 1,
        stem: "Calculate the total nutrients stored in Ecosystem Y.",
        value: 800,
        explanation: "$150 + 60 + 590 = 800$ units.",
      }),
      P.num({
        label: "(b)",
        marks: 2,
        stem: "Calculate the percentage of Ecosystem X's nutrients held in its biomass. Give your answer to the nearest whole number.",
        value: 82, unit: "%", tol: 0.5, answer: "82",
        explanation: "Total X = $900 + 40 + 160 = 1\\,100$. Biomass share = $900 \\div 1\\,100 \\times 100 = 81.8\\% \\approx 82\\%$.",
      }),
      P.mcq({
        label: "(c)",
        stem: "Which ecosystem is most likely to be a tropical rainforest?",
        options: [
          ["X, because most nutrients are in the biomass", "Correct: rapid decay and uptake keep nutrients in the plants."],
          ["Y, because most nutrients are in the soil", "A large soil store is typical of grassland and savanna."],
          ["X, because its litter store is the largest", "X's litter store is its smallest."],
          ["Y, because its total store is the smallest", "Total size does not identify a rainforest; the balance of stores does."],
        ],
        answer: "A",
        explanation: "A dominant biomass store with small litter and soil stores is the rainforest pattern.",
      }),
      P.manual({
        label: "(d)",
        marks: 4,
        stem: "Explain why Ecosystem Y holds most of its nutrients in the soil.",
        points: [
          "Grasses die back in the dry season / short-lived plants add organic matter to the soil",
          "Decay is slower than in a rainforest (dry season), so humus builds up",
          "Lower rainfall means less leaching, so nutrients stay in the soil",
          "Smaller plants (grass, scattered trees) hold less biomass",
        ],
        modelAnswer: "Y is probably a grassland or savanna. Grasses die back each dry season and their remains are worked into the soil. Decay is slower and rainfall lower than in a rainforest, so humus builds up and less is leached. The small plants themselves hold little.",
      }),
    ],
    hints: ["Compare the largest store in each ecosystem."],
    explanation: "The relative size of the stores reflects climate: hot, wet rainforests keep nutrients in biomass; seasonally dry grasslands keep them in the soil.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 480,
    stem: "A farmer near Murehwa has grown maize on the same field for many years without adding manure or fertiliser. Her yields have fallen each year.",
    parts: [
      P.manual({
        label: "(a)",
        marks: 2,
        stem: "Use the nutrient cycle to explain why her yields have fallen.",
        points: [
          "Each harvest removes nutrients (an output) from the cycle",
          "Nothing replaces them (no manure, fertiliser or legumes), so the soil store shrinks",
        ],
        modelAnswer: "Each harvest removes the nutrients held in the maize, and nothing is put back, so the soil store becomes smaller each year.",
      }),
      P.mcq({
        label: "(b)",
        stem: "Which practice would add **nitrogen** to her soil most cheaply?",
        options: [
          ["Rotating maize with beans or groundnuts", "Correct: legumes fix nitrogen at no cost."],
          ["Burning the maize stalks after harvest", "Burning releases nitrogen to the air and loses organic matter."],
          ["Ploughing deeper each season", "Ploughing does not add nitrogen."],
          ["Planting maize closer together", "This uses nitrogen faster rather than adding it."],
        ],
        answer: "A",
        explanation: "Legumes host nitrogen-fixing bacteria, adding nitrogen to the soil without bought fertiliser.",
      }),
      P.manual({
        label: "(c)",
        marks: 3,
        stem: "Suggest **three** other ways she could return nutrients to the field.",
        points: [
          "Apply cattle manure / compost",
          "Leave crop residues (stover) to rot in the field / mulching",
          "Apply fertiliser in the right amounts / plant cover crops / agroforestry trees",
        ],
        modelAnswer: "She could spread cattle manure or compost, leave the maize stalks to rot into the soil as mulch, and apply a measured amount of fertiliser.",
      }),
    ],
    hints: ["Think of what leaves the field each harvest."],
    explanation: "Harvesting is an output from the nutrient cycle; fertility is kept up by returning organic matter, using legumes and careful fertiliser use.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Discuss the view that clearing tropical rainforest for farming causes more damage to the nutrient cycle than clearing savanna woodland.",
    points: [
      "In rainforest most nutrients are in the biomass, so clearing removes most of the store",
      "Heavy rain leaches and erodes exposed rainforest soil rapidly",
      "Savanna holds more nutrients in the soil, so some fertility remains after clearing",
      "But savanna soils are often thin/sandy and clearing exposes them to erosion and fire",
      "Effects depend on how land is used afterwards (shifting cultivation with long fallow vs permanent cropping)",
      "Reasoned conclusion (e.g. damage is greater and faster in the rainforest)",
    ],
    levels: geographyLevels(6),
    hints: ["Where is the largest store in each ecosystem?", "What happens to bare soil under heavy rain?"],
    wordLimit: { max: 300 },
    modelAnswer: "In a rainforest most nutrients are held in the trees. Clearing them removes that store, and the bare soil is then leached and eroded by heavy convectional rain, so fertility falls within a few seasons. Savanna holds a larger share of its nutrients in the soil, so cleared land keeps some fertility for longer. However, many savanna soils are sandy and thin, and clearing exposes them to erosion and fire, so damage still occurs. Much depends on later use: long fallows allow recovery in both. Overall the statement is largely true, because the rainforest loses its main store at once.",
    explanation: "Compare the main stores, the climate-driven losses and the land use after clearing, then judge.",
  });
  b.card("DEFINITION", "What is a **biogeochemical cycle**?", "The continuous movement of an element (such as carbon or nitrogen) between living things, rocks and soil, and the air and water.");
  b.card("CONCEPT", "The three stores and three transfers of the nutrient cycle", "Stores: biomass, litter, soil. Transfers: fallout (biomass → litter), decomposition (litter → soil), uptake (soil → biomass).");
  b.card("CONCEPT", "Inputs and outputs of the nutrient cycle", "Inputs: weathering of rock, nutrients in rain and dust. Outputs: leaching, runoff and erosion, harvesting.");
  b.card("FACT", "Largest nutrient store in a tropical rainforest", "Biomass: litter rots fast, roots take nutrients up quickly and heavy rain leaches the soil.");
  b.card("VOCABULARY", "Nitrogen fixation", "Changing nitrogen gas into compounds plants can use, by bacteria in legume root nodules, lightning or fertiliser factories.");
  b.card("VOCABULARY", "Nitrification vs denitrification", "Nitrification: bacteria turn ammonium into nitrates. Denitrification: bacteria turn nitrates back into nitrogen gas, mainly in waterlogged soil.");
  b.card("CONCEPT", "Processes that return carbon dioxide to the air", "Respiration, decomposition and combustion (burning wood, charcoal, fossil fuels, veld fires).");
  b.card("DEFINITION", "What is **eutrophication**?", "Excess nutrients (from fertiliser or sewage) cause rapid algal growth; decay of the algae uses up oxygen and fish die.");
  b.card("DEFINITION", "What is **leaching**?", "The washing of dissolved nutrients down through the soil, out of reach of roots, by heavy rain.");
});
