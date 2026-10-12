// W1b: climate.projections-environments (Cambridge only; items tagged to Cambridge automatically).
// Question data are ILLUSTRATIVE (a hypothetical model run), different from the IPCC-based figures in the lesson.
// Computed: 4.6 - 1.3 = 3.3; (0.80 - 0.35)/0.35 = 128.6%; (6.8 - 4.4)/6.8 = 35.3%; 500/30 = 16.7; struct: 5.0 - 1.5 = 3.5 and
// 58 cm; permafrost +1.9 °C in 30 years = 0.63 per decade; 0 °C by about 2044.
import { concept, P, geographyLevels, chk, rnd } from "../lib.mjs";
import { mc, tbl } from "../tables/w1b-_q.mjs";

const d12 = chk(rnd(4.6 - 1.3, 1), 3.3);
const p13 = rnd(((0.8 - 0.35) / 0.35) * 100, 1, 128.6, "p13");
const p14 = rnd(((6.8 - 4.4) / 6.8) * 100, 1, 35.3, "p14");
const r15 = rnd(500 / 30, 1, 16.7, "r15");
const sA = rnd(5.0 - 1.5, 1, 3.5, "sA");
const sB = Math.round((0.88 - 0.3) * 100);
const rise = rnd(-1.2 - -3.1, 1, 1.9, "rise");
const perDec = rnd(1.9 / 3, 2, 0.63, "perDec");
const yearZero = rnd(2025 + (1.2 / (1.9 / 3)) * 10, 0, 2044, "yearZero");

concept("ageo.climate.projections-environments", { file: "climate/projections-environments", keyPrefix: "climate.projections-environments" }, (b) => {
  mc(b, 1, "RECALL", "Which category of projected climate change relates to the **largest** amount of global warming?", [
    ["Very high", "Correct: emissions keep rising strongly, giving the most warming by 2100."],
    ["Very low", "The very low category has the smallest warming."],
    ["Intermediate", "Intermediate lies in the middle of the five categories."],
    ["Low", "The low category has little warming compared with the highest categories."],
  ], "The **very high** category has the largest emissions and the greatest warming.");
  mc(b, 1, "RECALL", "What does **net zero** emissions mean?", [
    ["Emissions added are balanced by those removed", "Correct: remaining emissions are offset by sinks or removals."],
    ["Humans stop emitting any greenhouse gases at all", "Net zero allows some emissions if they are balanced by removals."],
    ["Emissions are kept at their present level each year", "That is maintaining emissions, not net zero."],
    ["Temperature returns to the level of the year 1850", "Net zero stops further warming but does not by itself reverse it."],
  ], "**Net zero** means greenhouse gases emitted are balanced by those removed from the atmosphere.");
  mc(b, 2, "UNDERSTANDING", "Why does sea level continue to rise after 2100 even if emissions fall?", [
    ["Greenhouse gases last long and the oceans respond slowly", "Correct: heat continues to move into the deep ocean and ice sheets keep melting."],
    ["Sea level only responds to changes in the Moon's orbit around Earth", "Tides are not the cause of long-term sea-level rise."],
    ["Rainfall adds more water to the oceans every single year", "Rainfall is part of the cycle; it does not cause the long-term rise."],
    ["The projections stop in 2100 so the sea cannot change after it", "Change is not limited to the period for which projections are made."],
  ], "Because **greenhouse gases persist** and the **deep ocean and ice sheets are slow to respond**, sea level keeps rising for centuries.");
  mc(b, 2, "UNDERSTANDING", "Which feedback helps to explain faster warming in the Arctic?", [
    ["Dark open water absorbs more than bright sea ice", "Correct: the albedo falls as ice melts, so more energy is absorbed."],
    ["Bright open water reflects more radiation than the ice does", "Open water is darker, not brighter, than ice."],
    ["Cold air can hold more water vapour than warm air can", "Warm air holds more water vapour."],
    ["Arctic winds blow strongly equatorward away from the Sun", "This is not a feedback and not how the Arctic warms."],
  ], "The **ice–albedo feedback**: less ice, lower albedo, more absorbed energy, more melting.");
  mc(b, 2, "UNDERSTANDING", "What is released when permafrost thaws?", [
    ["Carbon dioxide and methane from decaying matter", "Correct: microbes decompose the frozen carbon once it thaws."],
    ["Large amounts of oxygen released from the melting ice", "Oxygen is not a notable product of permafrost thaw."],
    ["Radioactive gases released from the rock beneath it", "Permafrost thaw does not release these."],
    ["Chlorine compounds that destroy the ozone layer", "These come from human-made chemicals, not permafrost."],
  ], "Thawing **permafrost** releases CO2 and methane, which add to warming.");
  mc(b, 2, "UNDERSTANDING", "What causes ocean acidification?", [
    ["The oceans absorb extra carbon dioxide", "Correct: dissolved CO2 forms carbonic acid, lowering the pH."],
    ["Acid rain from volcanoes fills the ocean basins", "Acid rain is a small effect compared with absorbed CO2."],
    ["Warmer water releases acids from the sea bed", "Acidification is caused by dissolved CO2, not by a release from the sea bed."],
    ["Melting ice adds acid to the sea", "Meltwater is fresh, not acidic."],
  ], "Dissolved **carbon dioxide** makes seawater more acidic.");
  mc(b, 3, "UNDERSTANDING", "For each 1 °C of warming the air can hold about how much more water vapour?", [
    ["About 7%", "Correct: this is the approximate rate, and explains more intense heavy rainfall."],
    ["About 70%", "This is ten times too large."],
    ["About 0.7%", "This is ten times too small."],
    ["None, the amount of vapour is fixed", "Warmer air can hold more water vapour."],
  ], "Warmer air holds about **7% more** vapour per 1 °C, so heavy rain becomes more intense.", { hints: ["Think of the approximate percentage used in the lesson."] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The Arctic is warming faster than the global average.", answer: true, daily: true,
    feedbackTrue: "Correct: at least about twice as fast, partly because of the albedo feedback.",
    feedbackFalse: "Not so: the Arctic warms faster than the global average.",
    explanation: "Arctic warming is at least about **twice** the global rate." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Ground that stays frozen for at least two years is {{blank:a}}. The year in which emissions reach their highest value is the {{blank:b}} year. Seawater becoming more acidic is ocean {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["permafrost"], choices: ["permafrost", "tundra", "scree"] },
      { id: "b", accepted: ["peak"], choices: ["peak", "net-zero", "base"] },
      { id: "c", accepted: ["acidification"], choices: ["acidification", "salinisation", "eutrophication"] },
    ], explanation: "Permafrost; peak; acidification." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each impact to the environment where it is mostly found.",
    pairs: [
      ["Permafrost thaw", "Cold environments"],
      ["Coral bleaching", "Marine environments"],
      ["Glacier retreat in the mountains", "Cold environments"],
      ["Weakening of the overturning circulation", "Marine environments"],
      ["Coastal flooding with storm surge", "Marine environments"],
    ], explanation: "Match each process to the environment it affects." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, dp: 1, unit: "°C",
    stem: "In an illustrative model run the very low category gives 1.3 °C of warming by 2100 and the very high category gives 4.6 °C. Calculate the difference, in °C.",
    value: d12, wrong: [5.9, 3.5],
    explanation: "4.6 − 1.3 = **3.3 °C**." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, dp: 1, unit: "%",
    stem: "In an illustrative model run sea-level rise by 2100 is 0.35 m in the very low category and 0.80 m in the very high category. Calculate the percentage increase from the very low to the very high category, to 1 decimal place.",
    hints: ["Percentage increase = (new − old) ÷ old × 100.", "Use the very low value as the old value."],
    value: p13, wrong: [56.3, 45],
    explanation: "(0.80 − 0.35) ÷ 0.35 × 100 = 0.45 ÷ 0.35 × 100 = **128.6%**. Dividing by 0.80 gives 56.3%, the wrong base." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, dp: 1, unit: "%",
    stem: "Illustrative data: the September extent of Arctic sea ice fell from 6.8 million km² to 4.4 million km² between two years. Calculate the percentage decrease, to 1 decimal place.",
    hints: ["Find the decrease first.", "Divide by the original extent."],
    value: p14, wrong: [54.5, 2.4],
    explanation: "1. Decrease = 6.8 − 4.4 = 2.4 million km².\n2. Percentage = 2.4 ÷ 6.8 × 100 = **35.3%**." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, dp: 1,
    stem: "A country's emissions peak at 500 million tonnes in 2025 and fall by the same amount every year to net zero in 2055. Calculate the fall per year, in million tonnes, to 1 decimal place.",
    hints: ["Find the number of years from peak to net zero.", "Divide the peak emissions by that number."],
    value: r15, wrong: [1.0, 10],
    explanation: "Years = 2055 − 2025 = 30. Fall per year = 500 ÷ 30 = **16.7 million tonnes**." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the ground that remains at or below 0 °C for at least two consecutive years.",
    accepted: ["permafrost", "the permafrost"], wrong: ["tundra"],
    explanation: "**Permafrost** is permanently frozen ground." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the process by which the oceans become more acidic as they absorb carbon dioxide.",
    accepted: ["ocean acidification", "acidification", "the acidification of the oceans"], wrong: ["eutrophication"],
    explanation: "**Ocean acidification** lowers the pH of seawater." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why thawing permafrost matters for the global climate.",
    hints: ["Think about what is stored in the frozen ground."],
    points: [
      "Frozen soils hold large amounts of organic carbon from dead plants.",
      "When the ground thaws, microbes decompose the material and release carbon dioxide and methane.",
      "These greenhouse gases add to warming, creating a positive feedback.",
    ],
    modelAnswer: "Permafrost stores large amounts of carbon in frozen dead plant material. As it thaws, microbes break it down and release carbon dioxide and methane, which increase the greenhouse effect and cause further warming and thaw.",
    explanation: "Permafrost thaw is a carbon release and a positive feedback." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how sea-level rise threatens people living on low-lying coasts.",
    hints: ["Think about flooding, farmland and water supplies."],
    points: [
      "Higher sea level means high tides and storm surges reach further inland, so floods are more frequent and severe.",
      "Salt water enters rivers, aquifers and soil, harming drinking water and farmland.",
      "Coastal erosion and the loss of wetlands and mangroves that protect the coast increase.",
      "Homes, ports and roads are damaged and people may have to move (displacement).",
    ],
    modelAnswer: "Higher sea level lets storm surges and tides flood further inland. Salt water contaminates drinking water and farmland, and erosion removes land and protective wetlands. Homes and infrastructure are damaged and people may be forced to leave.",
    explanation: "Flooding, salinisation, erosion and displacement are the main threats." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Illustrative projections of a hypothetical model run:\n\n" + tbl(["Category", "Very low", "Intermediate", "Very high"], [["Warming by 2100 (°C)", 1.2, 2.4, 4.2], ["Sea-level rise by 2100 (m)", 0.32, 0.50, 0.74]]) + "\n\nDescribe how the projections change between the categories.",
    hints: ["Quote the lowest and highest values.", "Say whether the rise is steady between the categories."],
    points: [
      "Both warming and sea-level rise increase from the very low to the very high category.",
      "Warming rises from 1.2 °C to 4.2 °C, an increase of 3.0 °C (3.5 times as much).",
      "Sea-level rise increases from 0.32 m to 0.74 m, a rise of 0.42 m.",
      "The intermediate category (2.4 °C and 0.50 m) lies between the two, so the change in each variable is progressive.",
    ],
    modelAnswer: "Warming rises from 1.2 °C in the very low category to 2.4 °C in the intermediate and 4.2 °C in the very high category, 3.5 times as much. Sea-level rise increases from 0.32 m to 0.50 m and then 0.74 m. Both measures increase progressively as the category gets higher.",
    explanation: "Describe the trend and quote the extreme values." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "Illustrative projections of another hypothetical model run:\n\n" + tbl(["Category", "Very low", "Low", "Intermediate", "High", "Very high"], [["Warming by 2100 (°C)", 1.5, 2.1, 3.1, 3.9, 5.0], ["Sea-level rise by 2100 (m)", 0.30, 0.41, 0.52, 0.71, 0.88], ["Year of net-zero CO2", 2055, 2075, "None", "None", "None"]]),
    hints: ["Subtract the lowest from the highest.", "Convert metres to centimetres by multiplying by 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the difference in projected warming between the very high and very low categories, in °C.", value: sA, dp: 1, unit: "°C", wrong: [6.5, 3.9],
        explanation: "5.0 − 1.5 = 3.5 °C." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the difference in sea-level rise between the very high and very low categories, in cm.", value: sB, unit: "m", wrong: [0.58, 118],
        explanation: "0.88 − 0.30 = 0.58 m = 58 cm." }),
      P.mcq({ label: "(c)", stem: "Which statement is supported by the table?", options: [
        ["Categories with no net-zero year have the highest warming", "Correct: the intermediate, high and very high categories have no net-zero year and warming of 3.1 °C or more."],
        ["Reaching net zero in 2075 gives more warming than having none", "The low category (2075) has 2.1 °C, less than any category with no net zero."],
        ["Sea-level rise falls as warming increases", "Sea-level rise increases with warming."],
        ["All categories give the same sea-level rise", "The values range from 0.30 m to 0.88 m."],
      ], answer: "A", explanation: "No net-zero year goes with the highest warming." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the year in which net zero is reached affects the amount of warming.",
        points: [
          "Warming depends on the total amount of CO2 added to the atmosphere over time.",
          "Reaching net zero earlier means less total CO2 is emitted before emissions stop adding to the atmosphere.",
          "CO2 stays in the atmosphere for centuries, so extra emissions before net zero cannot be quickly undone and increase the long-term warming.",
        ],
        modelAnswer: "Warming depends on the cumulative amount of CO2 in the atmosphere. If net zero is reached earlier, less CO2 is added, and because CO2 lasts for centuries the extra emissions of a later net-zero date cannot be quickly removed, so warming is greater.",
        explanation: "Cumulative emissions and the long life of CO2 link net-zero timing to warming." }),
    ], explanation: "Compare categories using the table and explain the role of net zero." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "Illustrative ground temperature at a depth of 10 m in permafrost at a site in the Arctic:\n\n" + tbl(["Year", "1995", "2005", "2015", "2025"], [["Ground temperature (°C)", -3.1, -2.6, -1.9, -1.2]]),
    hints: ["Subtract the earliest from the latest value.", "A rate per decade is the change divided by the number of decades."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the rise in ground temperature between 1995 and 2025, in °C.", value: rise, dp: 1, unit: "°C", wrong: [4.3, 0.6],
        explanation: "−1.2 − (−3.1) = 1.9 °C." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the mean rate of increase per decade over the 30 years, to 2 decimal places.", value: perDec, dp: 2, unit: "°C", wrong: [1.9, 0.19],
        explanation: "1.9 °C over 3 decades = 0.63 °C per decade." }),
      P.num({ label: "(c)", marks: 2, stem: "If the rate continued, in which year would the ground reach 0 °C? Give the nearest year.", value: yearZero, wrong: [2025, 2035],
        explanation: "From −1.2 °C to 0 °C needs 1.2 ÷ 0.633 = 1.89 decades = 18.9 years. 2025 + 18.9 = 2044 (nearest year)." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe two consequences if this permafrost thaws.",
        points: [
          "Carbon dioxide and methane are released as organic matter decomposes, adding to the greenhouse effect.",
          "The ground subsides and becomes unstable, damaging buildings, roads and pipelines.",
          "Vegetation, drainage and animal habitats change (for example new ponds and shrubs), affecting people who live and hunt there.",
        ],
        modelAnswer: "Thawing releases carbon dioxide and methane, which add to warming. The ground sinks and becomes unstable, damaging roads and buildings, and the landscape and wildlife habitats change.",
        explanation: "Climate feedback, infrastructure damage and ecosystem change." }),
      P.manual({ label: "(e)", marks: 3, stem: "Evaluate how reliable the prediction in (c) is.",
        points: [
          "The prediction assumes a constant rate, but the rate may speed up or slow down (feedbacks, changing snow cover).",
          "Only four readings at one site are used, so it may not represent other places or short-term variability.",
          "Once the ground nears 0 °C, melting uses energy (latent heat), so the temperature may stay close to 0 °C for a long time and the date is uncertain.",
        ],
        modelAnswer: "The prediction assumes the warming rate stays the same, though feedbacks could change it. It uses only four readings at one site, which may not be typical. Near 0 °C the ice melts, using latent heat, so the temperature may stay near zero for years and the date is uncertain.",
        explanation: "Extrapolation from limited data is uncertain." }),
    ], explanation: "Calculate the trend, extrapolate and evaluate." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the global significance of climate change in cold environments.",
    hints: ["Consider effects on sea level, on greenhouse gas release and on albedo, and on people.", "Reach a judgement."],
    points: [
      "Melting of the Greenland and Antarctic ice sheets and glaciers raises sea level, affecting coastal areas everywhere.",
      "Permafrost thaw releases carbon dioxide and methane, adding to global warming.",
      "Loss of sea ice reduces albedo, so more energy is absorbed and warming increases (a global effect).",
      "Freshwater from melting ice may weaken ocean circulation, altering climates and rainfall in other regions.",
      "Mountain glacier retreat affects water supplies for millions of people downstream.",
      "Local effects (damage to infrastructure, change to indigenous livelihoods and ecosystems) are important but limited in scale.",
      "The size and speed of the effects are uncertain, especially for ice sheets, and depend on the emissions category.",
      "Judgement: cold environments are globally significant because they influence sea level, the carbon cycle and ocean circulation, even though few people live there.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Cold environments matter far beyond the poles. Melting ice sheets and glaciers raise sea level, which threatens coasts worldwide. Thawing permafrost releases carbon dioxide and methane, and shrinking sea ice lowers the albedo of the Arctic, so both add to warming. Meltwater may weaken the ocean circulation that moves heat northwards, changing climates elsewhere, and glacier loss reduces the water supply of mountain rivers. The direct local effects on infrastructure and the livelihoods of the few people who live there are serious but smaller in scale. The speed of ice-sheet loss is uncertain and depends on emissions. I conclude that cold environments are globally very significant because they influence sea level, the carbon cycle and ocean circulation.",
    wordLimit: { max: 300 }, explanation: "Weigh global effects against local ones, and note uncertainty." });

  b.card("CONCEPT", "Five categories of projected change", "Very high, high, intermediate, low, very low: ordered by the amount of warming by 2100 (about 4.4 °C down to about 1.4 °C in IPCC AR6, rounded).");
  b.card("DEFINITION", "Net zero", "Greenhouse gases added to the atmosphere are balanced by those removed; needed to stop CO2-driven warming from increasing.");
  b.card("FACT", "Projections continue after 2100", "Greenhouse gases last for centuries and the deep ocean and ice sheets respond slowly, so sea level keeps rising after 2100.");
  b.card("FACT", "Warmer air and rainfall", "Warm air holds about 7% more water vapour per 1 °C of warming; heavy rainfall becomes more intense, wet areas wetter, dry areas drier.");
  b.card("CONCEPT", "Ice–albedo feedback", "Melting ice exposes dark water or land, which absorbs more radiation, causing more warming and melting.");
  b.card("DEFINITION", "Permafrost", "Ground at or below 0 °C for at least two years; thaw releases carbon dioxide and methane and makes ground unstable.");
  b.card("CONCEPT", "Impacts on marine environments", "Warmer water (coral bleaching), sea-level rise and coastal flooding, ocean acidification, weaker overturning circulation.");
  b.card("FACT", "Oceans and heat", "The oceans have absorbed more than 90% of the extra heat in the climate system.");
  b.card("CONCEPT", "Arctic amplification", "The Arctic is warming at least twice as fast as the global average, partly because of the albedo feedback.");
});
