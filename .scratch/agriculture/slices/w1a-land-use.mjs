// Slice W1a: forms of land use and the factors that limit it (both boards).
import { concept, P, ZIM, pct, pctChange, fmtNum, table, agricultureLevels } from "../lib.mjs";

const perHh = { arable: 900, households: 360 };
const perHhValue = perHh.arable / perHh.households;

const share = { grazing: 2100, total: 8400 };
const shareValue = pct(share.grazing, share.total);

const growth = { arable: 540, before: 90, after: 120 };
const growthBefore = growth.arable / growth.before;
const growthAfter = growth.arable / growth.after;
const growthPct = -pctChange(growthBefore, growthAfter);

const WARD = [["Crop land", 2850], ["Grazing land", 4200], ["Woodland", 1650], ["Settlement and roads", 450], ["Wetland (vlei)", 350]];
const wardTotal = WARD.reduce((s, [, a]) => s + a, 0);
const wardCropPct = pct(2850, wardTotal);

const VILLAGE = [["Households", 150, 250], ["Arable land (ha)", 750, 750], ["Cattle", 600, 1100], ["Grazing land (ha)", 1500, 1200]];
const hhBefore = 750 / 150;
const hhAfter = 750 / 250;

concept("agri.land.land-use", { file: "land/land-use", keyPrefix: "land.land-use" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **aquaculture**?",
    options: [
      ["Farming fish and other water organisms in ponds, tanks or cages", "Correct: aquaculture is the controlled rearing of fish and other water organisms."],
      ["Growing crops with their roots in a nutrient solution", "This is hydroponics, which does not involve rearing fish."],
      ["Watering crops from a dam or river in the dry season", "This is irrigation."],
      ["Conserving wetlands so that they feed rivers all year", "This is wetland conservation, a land use but not aquaculture."],
    ],
    answer: "A",
    explanation: "Aquaculture (fish farming) uses ponds, tanks, dams or cages to rear fish such as tilapia under controlled conditions.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A farm in a high-rainfall area has a steep, stony hillside. Which use of the hillside is most sustainable?",
    options: [
      ["Forestry (woodland or a timber plantation)", "Correct: trees protect steep land from erosion and do not need ploughing."],
      ["Ploughing it for a maize crop each season", "Ploughing steep, stony land causes severe erosion and machines cannot work it safely."],
      ["Building a fish pond on the hillside", "Ponds need flat land and soils that hold water, not a steep stony slope."],
      ["Clearing it for an irrigated vegetable garden", "Clearing and watering steep land would cause erosion; gardens need gentle slopes."],
    ],
    answer: "A",
    explanation: "Steep slopes are best kept under permanent cover such as forest, which holds the soil and needs no cultivation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following is a **topographical** factor that limits land use?",
    options: [
      ["The steepness of the slope", "Correct: topography is the shape of the land surface, including slope and altitude."],
      ["The amount of rain received each year", "Rainfall is a climatic factor."],
      ["The fertility of the topsoil", "Fertility is a soil factor."],
      ["The distance to the nearest market", "Distance to market is an economic (access) factor."],
    ],
    answer: "A",
    explanation: "Topographical factors are slope, altitude, aspect and drainage position (hilltop, valley). Rainfall is climatic; fertility is edaphic (soil).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are tea estates not found in the hot, dry Lowveld?",
    options: [
      ["Tea needs cool temperatures and high, well-spread rainfall", "Correct: the Lowveld is too hot and dry for tea."],
      ["The Lowveld soils are too deep for tea roots", "Deep soils suit most crops; soil depth is not the problem."],
      ["Tea can only be grown on flat, waterlogged valley land", "Tea grows on well-drained slopes, not waterlogged land."],
      ["Tea is grown only on land that is too steep to plough", "Tea is grown on slopes, but the Lowveld's limit is its climate."],
    ],
    answer: "A",
    explanation: "Climate limits land use: tea needs a cool, moist climate such as that of the Eastern Highlands.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In some hot, low-lying valleys, cattle keeping has historically been limited even where there is grass and water. Which factor explains this?",
    options: [
      ["Tsetse flies, which spread trypanosomiasis to cattle", "Correct: a biotic (pest and disease) factor limits livestock there."],
      ["Frost, which kills the grass every winter", "Frost is a problem of high, cold areas, not hot valleys."],
      ["Steep slopes, which cattle cannot climb", "The valleys are low-lying, not steep."],
      ["Waterlogged soils that are too fertile for grazing", "Fertile soils do not prevent grazing."],
    ],
    answer: "A",
    explanation: "Tsetse flies spread trypanosomiasis (nagana), a protozoan disease of cattle. Where tsetse is present, cattle keeping is risky without control measures.",
    hints: ["Look for a living (biotic) factor rather than a physical one."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a communal area the number of households has doubled but the arable land has stayed the same. Which change is most likely?",
    options: [
      ["Fallow periods are shortened and soil fertility falls", "Correct: with less land per family, land is cropped continuously and fertility declines."],
      ["Each household gets more arable land than before", "The land is fixed, so each household gets less, not more."],
      ["Fewer cattle are kept, so grazing land recovers", "Herds usually grow with the population, increasing grazing pressure."],
      ["Steep slopes and wetlands are left uncultivated", "Land pressure pushes people to cultivate steep slopes and wetlands."],
    ],
    answer: "A",
    explanation: "Land pressure leads to fragmentation, continuous cropping without fallow, cultivation of marginal land, overgrazing and deforestation.",
    hints: ["Land is fixed; think about what happens when more people share it."],
  });
  b.mcq({
    d: 1, skill: "RECALL", applies: ZIM,
    stem: "Which of the following is a protected area in Zimbabwe?",
    options: [
      ["Gonarezhou National Park", "Correct: national parks are protected areas where farming and settlement are restricted."],
      ["A tobacco auction floor in Harare", "An auction floor is a marketing facility, not a protected area."],
      ["A Grain Marketing Board depot", "A GMB depot buys and stores grain; it is not a protected area."],
      ["A communal grazing area near Gokwe", "Communal grazing land is used by livestock owners; it is not protected by law for conservation."],
    ],
    answer: "A",
    explanation: "Protected areas include national parks (Hwange, Gonarezhou, Mana Pools, Matobo), safari areas, forest reserves and water catchments.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A ward has a fast-growing population, eroded fields and bare grazing land. Which plan would make its land use **most** efficient and sustainable?",
    options: [
      ["Intensify cropping on the best land and conserve slopes and grazing", "Correct: higher output on suitable land, with protected slopes and controlled grazing, uses land efficiently without degrading it."],
      ["Clear the remaining woodland and plough it for extra maize", "This gives a short-term gain but causes deforestation, erosion and fuelwood shortages."],
      ["Increase cattle numbers so that each family has more wealth", "More cattle on bare grazing land causes worse overgrazing."],
      ["Plough the wetland and stream banks for winter vegetables", "This damages wetlands and causes siltation of streams."],
    ],
    answer: "A",
    explanation: "Efficient land use raises production per hectare on suitable land (improved seed, fertiliser, conservation agriculture) while protecting fragile land and keeping livestock within the carrying capacity.",
    hints: ["Which option raises output without damaging fragile land?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The area of land available cannot be increased, so population growth reduces the land available per person.",
    answer: true,
    explanation: "True. Land is a fixed resource. As population grows, land per person falls unless production per hectare is raised.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Wetlands (vleis) are best ploughed and planted to crops every season because they stay moist.",
    answer: false,
    explanation: "False. Ploughing vleis damages the wetland, which stores water and feeds streams, and causes erosion and siltation. Vleis are better used for controlled grazing or left protected.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each limiting factor with the type of factor it is.",
    pairs: [
      ["Steep slope", "Topographical"],
      ["Frost in cold hollows", "Climatic"],
      ["Shallow, stony soil", "Soil (edaphic)"],
      ["Tsetse fly", "Biotic (pests and diseases)"],
    ],
    explanation: "Topography is the shape of the land; climate covers rain, temperature, frost and wind; edaphic factors are soil properties; biotic factors are living things such as pests and disease vectors.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each blank.",
    template: "Too many animals grazing too little land is called {{blank:a}}. Dividing land into ever smaller plots is called land {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["overgrazing"], choices: ["overgrazing", "afforestation", "irrigation", "aquaculture"] },
      { id: "b", accepted: ["fragmentation"], choices: ["fragmentation", "consolidation", "reclamation", "rotation"] },
    ],
    explanation: "Overgrazing and fragmentation are both effects of land pressure caused by population growth.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the form of land use in which tilapia are reared in ponds.",
    accepted: ["aquaculture", "fish farming", "fish culture", "pisciculture"],
    wrong: ["hydroponics"],
    explanation: "Rearing fish in ponds, tanks or cages is aquaculture (fish farming).",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `A village has ${perHh.arable} ha of arable land shared equally among ${perHh.households} households. Calculate the arable land per household in ha.`,
    value: perHhValue, unit: "ha", wrong: [perHh.households / perHh.arable],
    explanation: `Land per household = ${perHh.arable} ÷ ${perHh.households} = ${perHhValue} ha. (Dividing the households by the land gives 0.4, which is upside down.)`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A ward covers ${fmtNum(share.total)} ha, of which ${fmtNum(share.grazing)} ha is grazing land. Calculate the percentage of the ward used for grazing.`,
    value: shareValue, unit: "%", wrong: [400, 75],
    explanation: `Percentage = ${fmtNum(share.grazing)} ÷ ${fmtNum(share.total)} × 100 = ${shareValue}%.`,
    workedSolution: `1. Part = ${fmtNum(share.grazing)} ha; whole = ${fmtNum(share.total)} ha.\n2. Percentage = ${fmtNum(share.grazing)} ÷ ${fmtNum(share.total)} × 100.\n3. = ${shareValue}%.`,
    hints: ["Percentage = part ÷ whole × 100."],
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A village has ${growth.arable} ha of arable land. The number of households rose from ${growth.before} to ${growth.after}. Calculate the percentage **decrease** in arable land per household.`,
    value: growthPct, unit: "%", wrong: [33.3, 75],
    explanation: `Before: ${growth.arable} ÷ ${growth.before} = ${growthBefore} ha. After: ${growth.arable} ÷ ${growth.after} = ${growthAfter} ha. Decrease = ${growthBefore} − ${growthAfter} = ${growthBefore - growthAfter} ha. Percentage decrease = ${growthBefore - growthAfter} ÷ ${growthBefore} × 100 = ${growthPct}%. (Dividing by the new value, ${growthAfter}, gives 33.3%, which is wrong.)`,
    workedSolution: `1. Land per household before = ${growth.arable} ÷ ${growth.before} = ${growthBefore} ha.\n2. Land per household after = ${growth.arable} ÷ ${growth.after} = ${growthAfter} ha.\n3. Decrease = ${growthBefore} − ${growthAfter} = ${growthBefore - growthAfter} ha.\n4. Percentage decrease = ${growthBefore - growthAfter} ÷ ${growthBefore} × 100 = ${growthPct}%.`,
    hints: ["Find the land per household before and after.", "Divide the decrease by the ORIGINAL value."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which topography limits the use of land for crop production.",
    points: [
      "Steep slopes.",
      "Explains that cleared steep slopes erode easily and machinery cannot work them safely.",
      "Low-lying valley land / vleis.",
      "Explains that it may be waterlogged or flooded, so most crops cannot grow without drainage (or altitude: high land is cold and frosty).",
    ],
    modelAnswer: "Steep slopes cannot be ploughed safely by tractors, and once cleared they lose topsoil quickly to erosion. Low-lying valley bottoms are often waterlogged or flooded, so the roots of most crops lack air unless the land is drained.",
    explanation: "Each topographical feature (slope, valley position, altitude) earns a mark when its effect on cropping is explained.",
    hints: ["Topography means slope, altitude and position (hilltop or valley)."],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which a growing rural community could use its land more efficiently, and explain how each helps.",
    points: [
      "Intensify production on the best land (improved seed, fertiliser, irrigation or conservation agriculture).",
      "Explains that more is produced per hectare, so less land is needed for the same food.",
      "Plan land use / match each area to a suitable use / protect slopes, wetlands and catchments / keep livestock within carrying capacity.",
      "Explains that this prevents erosion and degradation, so the land stays productive for longer.",
    ],
    modelAnswer: "Farmers can raise yields per hectare on their best fields with improved seed, fertiliser and conservation agriculture, so the same land feeds more people. The community can also plan its land, keeping slopes under trees and limiting cattle to what the grazing can support, so the land is not degraded.",
    explanation: "Efficient land use either raises output per hectare or prevents land from being lost to degradation.",
    hints: ["Think of raising output per hectare and of protecting land from damage."],
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, paper: "Paper 2", calculator: true,
    stem: `Table 1 shows the land use in a fictional ward near Gokwe.\n\n**Table 1**\n\n${table(["Land use", "Area (ha)"], WARD.map(([u, a]) => [u, fmtNum(a)]))}`,
    hints: ["Add all the areas first.", "Percentage = part ÷ whole × 100."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the total area of the ward in ha.", value: wardTotal, unit: "ha", wrong: [wardTotal - 350], explanation: `2,850 + 4,200 + 1,650 + 450 + 350 = ${fmtNum(wardTotal)} ha.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage of the ward used as crop land. Give your answer to one decimal place.", value: wardCropPct, tol: 0.05, answer: String(Math.round(wardCropPct * 10) / 10), unit: "%", wrong: [31.1], explanation: `2,850 ÷ ${fmtNum(wardTotal)} × 100 = ${Math.round(wardCropPct * 10) / 10}%.` }),
      P.short({ label: "(c)", marks: 1, stem: "Name the land use in Table 1 that is most at risk of being damaged by ploughing.", accepted: ["wetland", "wetland vlei", "vlei", "vleis", "wetlands"], wrong: ["grazing land"], explanation: "Ploughing a vlei destroys the wetland that stores water and feeds streams." }),
      P.manual({ label: "(d)", marks: 4, stem: "The population of the ward is growing. Describe **two** likely effects on the grazing land and the woodland.", points: [
        "Grazing land: more cattle on less land → overgrazing.",
        "Overgrazing leaves bare soil that erodes / grass cover and quality fall.",
        "Woodland: cleared for new fields, building poles and firewood (deforestation).",
        "Loss of trees exposes the soil to erosion / reduces firewood and wild products.",
      ], explanation: "Land pressure leads to overgrazing and deforestation, both of which cause erosion." }),
    ],
    explanation: "Percentages show how the ward's land is shared; population growth puts pressure on every land use.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Paper 2", calculator: true,
    stem: `Table 2 compares a fictional village in two surveys.\n\n**Table 2**\n\n${table(["Item", "First survey", "Second survey"], VILLAGE.map(([i, a, c]) => [i, fmtNum(a), fmtNum(c)]))}`,
    hints: ["Arable land per household = arable land ÷ households.", "For (c), weigh up several solutions and say which matters most."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the arable land per household in the second survey, in ha.", value: hhAfter, unit: "ha", wrong: [hhBefore], explanation: `750 ÷ 250 = ${hhAfter} ha (it was ${hhBefore} ha in the first survey).` }),
      P.manual({ label: "(b)", marks: 4, stem: "Use the data to describe **two** signs of increasing land pressure in the village.", points: [
        "Households increased (150 to 250) while arable land stayed at 750 ha.",
        "So arable land per household fell (5 ha to 3 ha).",
        "Cattle increased (600 to 1,100) while grazing land fell (1,500 to 1,200 ha).",
        "So there are more cattle per hectare of grazing / risk of overgrazing.",
      ], explanation: "Quote the figures and say what they show." }),
      P.manual({ label: "(c)", marks: 6, stem: "Discuss how the village could make better use of its land in future.", points: [
        "Intensify cropping on the arable land: improved seed, fertiliser/manure, conservation agriculture.",
        "Explains that higher yields per hectare make up for smaller plots.",
        "Reduce cattle numbers / sell surplus animals / rotational grazing / grow fodder.",
        "Explains that grazing kept within the carrying capacity recovers and does not erode.",
        "Protect fragile land (slopes, wetlands, woodland) or plant woodlots / develop small-scale irrigation or non-farm income.",
        "Reasoned judgement on which measure matters most (e.g. controlling livestock numbers, because grazing land is shrinking fastest).",
      ], levels: agricultureLevels(6), explanation: "Credit solutions that raise output per hectare or prevent degradation, with a judgement." }),
    ],
    explanation: "The village is under growing land pressure: less arable land per household and more cattle on less grazing.",
  });

  b.card("DEFINITION", "Land use", "The purpose for which land is used: crops, livestock, forestry, wildlife, aquaculture, settlement or protection.");
  b.card("DEFINITION", "Aquaculture", "Farming fish and other water organisms in ponds, tanks, dams or cages.");
  b.card("DEFINITION", "Protected area", "Land set aside by law to conserve wildlife, plants, scenery or water catchments, e.g. a national park.");
  b.card("CONCEPT", "Topographical limits on land use", "Steep slopes erode and cannot be mechanised; valley bottoms waterlog; high altitude brings cold and frost.");
  b.card("CONCEPT", "Climatic limits on land use", "Low or unreliable rain, very high or low temperatures, frost and strong wind restrict which crops and animals can be kept.");
  b.card("CONCEPT", "Soil limits on land use", "Shallow, stony, infertile, acidic, salty or badly drained soils limit cropping.");
  b.card("FACT", "Which insect has limited cattle keeping in some hot, low-lying valleys?", "The tsetse fly, which spreads trypanosomiasis.");
  b.card("DEFINITION", "Land pressure", "Too many people or animals depending on too little land, so it is overused and degraded.");
  b.card("CONCEPT", "Effects of land pressure", "Fragmentation, shorter fallows, cultivation of slopes and wetlands, overgrazing, deforestation and erosion.");
});
