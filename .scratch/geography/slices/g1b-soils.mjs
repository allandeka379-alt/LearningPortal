// Slice G1b: ecosystems — soils: components, properties, formation and profiles (ZIMSEC 7.3.7).
import { concept, P, geographyLevels } from "../lib.mjs";

const TESTS =
  "Table 1: results of soil tests by a Form 3 class (fictional data).\n\n| Sample | Fresh mass (g) | Mass after drying (g) | Mass after burning (g) |\n| --- | --- | --- | --- |\n| Vlei edge | 120 | 96 | 91.2 |\n| Granite ridge | 52 | 44.2 | 42.5 |";

concept("geo.ecosystems.soils", { file: "ecosystems/soils", keyPrefix: "ecosystems.soils" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which component makes up the **largest** share of a typical loam soil?",
    options: [
      ["Mineral particles", "Correct: about 45% of the volume."],
      ["Organic matter", "Organic matter is only about 5%."],
      ["Air", "Air is about 25%, sharing the pore spaces with water."],
      ["Water", "Water is about 25%, varying with the weather."],
    ],
    answer: "A",
    explanation: "A typical loam is roughly 45% mineral particles, 5% organic matter, 25% water and 25% air by volume.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **humus**?",
    options: [
      ["Dark, decomposed organic matter in the soil", "Correct: it holds water and nutrients."],
      ["The solid rock beneath the soil", "That is bedrock (R horizon)."],
      ["Fine clay particles washed into the subsoil", "That describes illuviation of clay."],
      ["The water held between soil particles", "That is soil water."],
    ],
    answer: "A",
    explanation: "Humus forms when dead plants and animals decompose. It darkens the soil and improves its water and nutrient holding.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which soil drains quickly, holds little water and is easily leached of nutrients?",
    options: [
      ["Sandy soil", "Correct: large particles leave large pores."],
      ["Clay soil", "Clay drains slowly and holds water and nutrients."],
      ["Loam", "Loam drains well but holds water and nutrients well too."],
      ["Gley soil", "Gley soils are waterlogged, not quick-draining."],
    ],
    answer: "A",
    explanation: "Sand particles are large, so the pores between them are large; water drains through quickly, taking dissolved nutrients with it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A soil is grey with rusty orange mottles. What does this usually show?",
    options: [
      ["The soil is waterlogged for long periods", "Correct: this is gleying."],
      ["The soil is rich in humus", "Humus makes soil dark brown or black."],
      ["The soil is well drained and red", "Well-drained soils with iron oxides are red, not grey."],
      ["The soil has been burned by veld fire", "Fire blackens the surface; it does not cause grey mottling."],
    ],
    answer: "A",
    explanation: "Waterlogging removes oxygen, so iron compounds are reduced and the soil turns grey; rusty mottles form where some air reaches the soil.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In a soil profile, which horizon is the **topsoil**, rich in humus and roots?",
    options: [
      ["A", "Correct: the dark, humus-rich layer."],
      ["B", "B is the subsoil, where material washed down may collect."],
      ["C", "C is weathered parent material."],
      ["R", "R is the solid bedrock."],
    ],
    answer: "A",
    explanation: "The A horizon is the topsoil: dark with humus, full of roots and soil organisms.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which process leaves deep, red, infertile soils rich in iron and aluminium oxides in hot, wet climates?",
    options: [
      ["Laterisation", "Correct: silica and bases are leached out, oxides remain."],
      ["Gleying", "Gleying gives grey soils in waterlogged conditions."],
      ["Calcification", "Calcification deposits calcium carbonate in dry climates."],
      ["Salinisation", "Salinisation leaves salts at the surface in dry, irrigated land."],
    ],
    answer: "A",
    hints: ["Which process is linked to latosols and laterite?"],
    explanation: "Laterisation: intense weathering and leaching remove silica and bases, leaving iron and aluminium oxides that make the soil red. Hardened layers form laterite.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In cheluviation, what moves iron and aluminium down the soil profile?",
    options: [
      ["Organic acids from decaying plant litter", "Correct: they combine with iron and aluminium and carry them down."],
      ["Earthworms carrying soil downwards", "Earthworms mix soil, but they do not cause cheluviation."],
      ["Capillary rise of groundwater", "Capillary rise moves water up, not down."],
      ["Wind blowing dust into cracks", "Wind does not move iron down the profile."],
    ],
    answer: "A",
    hints: ["The word contains 'chelate': a chemical that grips metals."],
    explanation: "Acids released by decaying litter combine with (chelate) iron and aluminium, which are then washed down, leaving a bleached layer above. This forms podzolic soils.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "In a sedimentation (jar) test, which particles settle at the **bottom** of the jar first?",
    options: [
      ["Sand", "Correct: the largest, heaviest particles settle first."],
      ["Silt", "Silt settles above the sand."],
      ["Clay", "Clay is finest and settles last, on top."],
      ["Humus", "Humus is light and floats on the surface."],
    ],
    answer: "A",
    explanation: "Particles settle in order of size: sand first, then silt, then clay; humus floats.",
  });
  b.tf({
    d: 1, skill: "UNDERSTANDING",
    stem: "Soil texture means the way soil particles clump together into crumbs or blocks.",
    answer: false,
    explanation: "False. That is soil structure. Texture is the proportions of sand, silt and clay.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A fresh soil sample from a school garden weighs 150 g. After drying in an oven it weighs 123 g (fictional data). Calculate its water content as a percentage of its fresh mass.",
    value: 18, unit: "%",
    wrong: [27, 22],
    workedSolution: "1. Water lost = 150 − 123 = 27 g.\n2. Water content = $\\dfrac{27}{150} \\times 100 = 18\\%$.",
    explanation: "$(150 - 123) \\div 150 \\times 100 = 18\\%$.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A dried soil sample from a woodland weighs 85 g. After strong heating to burn off the organic matter it weighs 81.6 g (fictional data). Calculate its organic content as a percentage of its dry mass.",
    value: 4, tol: 0.05, unit: "%",
    wrong: [3.4, 4.2],
    hints: ["Organic matter lost = dry mass − burnt mass.", "Divide by the dry mass."],
    workedSolution: "1. Organic matter burnt off = 85 − 81.6 = 3.4 g.\n2. Organic content = $\\dfrac{3.4}{85} \\times 100 = 4\\%$.",
    explanation: "$(85 - 81.6) \\div 85 \\times 100 = 4\\%$.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "In a jar test, the settled soil is 60 mm deep. The sand layer is 36 mm deep. What percentage of the settled soil is sand?",
    value: 60, unit: "%",
    wrong: [36, 40],
    explanation: "$36 \\div 60 \\times 100 = 60\\%$ sand.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each soil-forming process to the soil it produces.",
    pairs: [
      ["Gleying", "grey, waterlogged gley soil"],
      ["Laterisation", "deep red latosol, sometimes with a laterite crust"],
      ["Cheluviation", "podzolic soil with a bleached upper layer"],
      ["Leaching", "acidic upper soil with nutrients washed out"],
    ],
    explanation: "Each process leaves a distinctive soil: grey gleys, red latosols, bleached podzolic soils or leached, acidic topsoils.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The washing of material out of a horizon is called {{blank:a}}, and the deposition of that material in a lower horizon is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["eluviation"], wrong: "illuviation" },
      { id: "b", accepted: ["illuviation"], wrong: "eluviation" },
    ],
    explanation: "Eluviation removes material (E and A horizons); illuviation deposits it (B horizon).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of soil made of a balanced mix of sand, silt and clay that is best for most crops.",
    accepted: ["loam", "loam soil", "loamy soil"],
    wrong: ["clay"],
    explanation: "**Loam** drains well, holds water and nutrients, and is easy to work.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the process of gleying and the soil it forms.",
    points: [
      "Occurs where soil is waterlogged, e.g. in a vlei or poorly drained hollow",
      "Water fills the pore spaces, so there is little oxygen",
      "Iron compounds are reduced, turning the soil grey or blue-grey, with rusty mottles where air enters",
      "Forms a gley (hydromorphic) soil",
    ],
    hints: ["Start with the conditions, then the chemistry, then the colour and name."],
    modelAnswer: "Gleying happens where the soil is waterlogged, such as in a vlei. Water fills the pores, so there is little oxygen and the iron compounds are reduced. The soil turns grey or blue-grey with rusty mottles where some air gets in. The result is a gley soil.",
    explanation: "Conditions → process → colour → soil name earns full marks.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 660,
    stem: TESTS,
    parts: [
      P.num({
        label: "(a)",
        marks: 1,
        stem: "Calculate the water content of the granite-ridge sample as a percentage of its fresh mass.",
        value: 15, tol: 0.05, unit: "%",
        explanation: "$(52 - 44.2) \\div 52 \\times 100 = 15\\%$.",
      }),
      P.num({
        label: "(b)",
        marks: 2,
        stem: "Calculate the organic content of the granite-ridge sample as a percentage of its dry mass. Give your answer to one decimal place.",
        value: 3.8, tol: 0.05, unit: "%", answer: "3.8",
        explanation: "$(44.2 - 42.5) \\div 44.2 \\times 100 = 3.85\\ldots$, so 3.8%.",
      }),
      P.manual({
        label: "(c)",
        marks: 3,
        stem: "Using the results, suggest **three** reasons why the vlei-edge soil holds more water than the granite-ridge soil.",
        points: [
          "The vlei is low-lying, so water drains towards it / the water table is high",
          "The vlei soil probably has more clay / finer particles, so it holds water",
          "It has more organic matter (5% against about 3.8%), and humus holds water",
        ],
        modelAnswer: "The vlei is in a hollow where water collects and the water table is high; its soil is likely to be finer and more clayey; and it has more organic matter (5% against 3.8%), which holds water. The granite ridge has sandy, free-draining soil.",
      }),
      P.manual({
        label: "(d)",
        marks: 2,
        stem: "State **two** precautions to make these tests fair.",
        points: [
          "Use the same method / oven temperature and time for every sample",
          "Take samples from the same depth and at the same time / weigh on the same scale",
        ],
        modelAnswer: "Dry and burn every sample at the same temperature for the same time, and take all samples from the same depth on the same day.",
      }),
    ],
    hints: ["Water content uses fresh mass; organic content uses dry mass."],
    explanation: "Simple drying and burning tests let you compare water and organic content between soils.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 540,
    stem: "A student describes a soil pit (fictional field notes).\n\n*0-3 cm: dead leaves and twigs. 3-20 cm: dark brown, crumbly, many roots. 20-32 cm: pale, ash-grey, sandy. 32-68 cm: reddish-brown, firmer, with a hard dark layer at 40 cm. 68-110 cm: broken pieces of rock in sandy soil. Below 110 cm: solid rock.*",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which depth is the E horizon?",
        options: [
          ["20-32 cm", "Correct: the pale, bleached layer."],
          ["3-20 cm", "This dark, crumbly layer with roots is the A horizon."],
          ["32-68 cm", "This reddish layer with a hard pan is the B horizon."],
          ["68-110 cm", "Broken rock in soil is the C horizon."],
        ],
        answer: "A",
        explanation: "The E (eluviated) horizon is pale and bleached because minerals have been washed out.",
      }),
      P.short({
        label: "(b)",
        stem: "Name the soil-forming process suggested by the pale layer above a reddish layer with a hard dark pan.",
        accepted: ["cheluviation", "podzolisation", "podzolization"],
        wrong: ["gleying"],
        explanation: "Cheluviation (podzolisation) removes iron and aluminium from the upper soil and deposits them lower down, forming a pale E horizon and a darker B horizon, sometimes with a pan.",
      }),
      P.manual({
        label: "(c)",
        marks: 3,
        stem: "Explain how the hard dark layer at 40 cm formed.",
        points: [
          "Iron and aluminium (and humus) were removed from the upper layers by organic acids / leaching",
          "They were carried down by water moving through the soil",
          "They were deposited (illuviation) in the B horizon and cemented into a hard pan",
        ],
        modelAnswer: "Organic acids from the leaf litter combined with iron and aluminium in the upper soil, and water carried them down. They were deposited at about 40 cm and cemented into a hard pan by illuviation.",
      }),
    ],
    hints: ["E means eluviated: washed out."],
    explanation: "Reading a profile: O (litter), A (topsoil), E (bleached), B (deposition, pan), C (weathered rock), R (bedrock).",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "\"Climate is the most important factor in the formation of soils in Zimbabwe.\" Discuss.",
    points: [
      "Rainfall controls leaching: high rainfall areas (e.g. Eastern Highlands) have more leached, acidic soils",
      "Temperature and moisture control weathering and the rate of decomposition / humus content",
      "Parent material matters: granite gives sandy soils, dolerite or basalt gives heavier red clays; Kalahari sands in the west",
      "Relief/drainage: vleis and hollows give gley soils; steep slopes thin soils",
      "Organisms (termites, vegetation) and time also influence soils",
      "Reasoned conclusion, e.g. climate sets the general pattern but parent rock and drainage explain local differences",
    ],
    levels: geographyLevels(6),
    hints: ["Compare climate with parent material and relief."],
    wordLimit: { max: 300 },
    modelAnswer: "Climate is very important: rainfall drives leaching, so soils in the wetter Eastern Highlands are more leached and acidic than those in drier areas, and temperature and moisture control the speed of weathering and of decomposition, which affects humus content. However, parent material explains many local differences: granite weathers to light sandy soils, while dolerite and basalt give heavier, more fertile red clays, and western Zimbabwe has Kalahari sands. Relief also matters, because waterlogged vleis develop grey gley soils while steep slopes have thin soils. Termites and vegetation mix and enrich soils over time. Climate sets the broad pattern, but in Zimbabwe parent material and drainage are just as important at a local scale.",
    explanation: "A strong answer weighs climate against parent material, relief, organisms and time, using Zimbabwean examples.",
  });
  b.card("DEFINITION", "What is **soil**?", "The loose surface layer of weathered rock particles, organic matter, water and air in which plants grow.");
  b.card("FACT", "Approximate make-up of a typical loam", "About 45% mineral particles, 5% organic matter, 25% water, 25% air (by volume).");
  b.card("VOCABULARY", "Texture vs structure", "Texture: proportions of sand, silt and clay. Structure: how particles clump into crumbs, blocks or plates.");
  b.card("CONCEPT", "Sand vs clay soils", "Sand: drains fast, holds little water and few nutrients, easy to work. Clay: drains slowly, holds water and nutrients, heavy and sticky.");
  b.card("CONCEPT", "Gleying", "In waterlogged soil, lack of oxygen reduces iron compounds, giving grey or blue-grey soil with rusty mottles: a gley soil.");
  b.card("CONCEPT", "Cheluviation", "Organic acids from litter combine with iron and aluminium and carry them down, leaving a bleached layer: podzolic soils.");
  b.card("CONCEPT", "Laterisation", "Intense weathering and leaching in hot, wet climates leave iron and aluminium oxides: red latosols; hardened layers form laterite.");
  b.card("VOCABULARY", "Soil horizons O, A, E, B, C, R", "O litter; A topsoil; E eluviated (bleached); B subsoil (illuviation); C weathered parent material; R bedrock.");
  b.card("CONCEPT", "Water and organic content tests", "Water % = (fresh − dry) ÷ fresh × 100. Organic % = (dry − burnt) ÷ dry × 100.");
});
