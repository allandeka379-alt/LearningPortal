// Slice W1a: climatic factors and rainfall (both boards; Zimbabwe-specific rainfall items tagged ZIM).
import { concept, P, ZIM, pct, mean, table, agricultureLevels } from "../lib.mjs";

const balance = { rain: 115, et: 160 };
const deficit = balance.rain - balance.et;

const storm = { rain: 50, runoff: 15, evap: 5 };
const stormEff = pct(storm.rain - storm.runoff - storm.evap, storm.rain);

const intense = { rain: 36, minutes: 20 };
const intensity = (intense.rain * 60) / intense.minutes;

const STATIONS = [
  ["Station X", 820, 780, 860, 800, 840],
  ["Station Y", 610, 320, 540, 250, 680],
];
const meanX = mean(STATIONS[0].slice(1));
const meanY = mean(STATIONS[1].slice(1));
const rangeY = Math.max(...STATIONS[1].slice(1)) - Math.min(...STATIONS[1].slice(1));
const rangeX = Math.max(...STATIONS[0].slice(1)) - Math.min(...STATIONS[0].slice(1));

const MONTHS = [["October", 20, 158], ["November", 88, 146], ["December", 174, 138], ["January", 192, 132], ["February", 52, 127], ["March", 66, 118]];
const febDeficit = 52 - 127;

concept("agri.environment.climate-rainfall", { file: "environment/climate-rainfall", keyPrefix: "environment.climate-rainfall" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **evapotranspiration**?",
    options: [
      ["Evaporation from the soil plus transpiration from plants", "Correct: it is the total water vapour lost from an area."],
      ["Water that runs off the surface during heavy rain", "This is runoff."],
      ["Water that drains below the root zone", "This is drainage (deep percolation)."],
      ["Water vapour that condenses on leaves and grass at night", "This is dew."],
    ],
    answer: "A",
    explanation: "Evapotranspiration = evaporation (from soil and water surfaces) + transpiration (from leaves).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under which conditions is evapotranspiration from a crop highest?",
    options: [
      ["Hot, sunny, windy and dry", "Correct: heat, sun, wind and dry air all speed up water loss."],
      ["Cool, cloudy, calm and humid", "These conditions slow water loss."],
      ["Cold, frosty and still", "Low temperatures reduce evaporation."],
      ["Warm but very humid with no wind", "Humid, still air slows water loss."],
    ],
    answer: "A",
    explanation: "High temperature, strong sunlight, wind and low humidity all increase evapotranspiration.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Bean plants droop at 14:00 on a hot day but are upright again by 18:00. What is this?",
    options: [
      ["Temporary wilting", "Correct: the plants recover when water loss falls in the evening."],
      ["Permanent wilting", "Permanently wilted plants do not recover without watering."],
      ["Frost damage", "Frost happens on cold nights and blackens leaves."],
      ["Waterlogging", "Waterlogged plants yellow and may wilt, but this pattern follows the heat of the day."],
    ],
    answer: "A",
    explanation: "Temporary wilting happens when transpiration exceeds uptake in the heat of the day; the plant recovers as water loss falls.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "On which kind of night is frost most likely?",
    options: [
      ["A clear, calm winter night", "Correct: heat radiates away into the clear sky and still air lets cold air settle."],
      ["A cloudy, windy winter night", "Clouds trap heat and wind mixes the air, reducing frost."],
      ["A warm, humid summer night", "Temperatures stay well above 0 °C."],
      ["A rainy night in the wet season", "Clouds and rain keep temperatures up."],
    ],
    answer: "A",
    explanation: "Frost forms when the ground loses heat rapidly under clear skies and cold, dense air settles in still conditions.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer's tomato seedlings in a low hollow are often frosted, while those higher up the slope are not. Why?",
    options: [
      ["Cold, dense air drains downhill and collects in the hollow", "Correct: hollows become frost pockets."],
      ["Warm air sinks into the hollow at night", "Warm air rises; it is cold air that sinks."],
      ["The hollow receives more sunlight during the day", "Sunlight is not the reason; hollows often receive less."],
      ["Wind is always stronger in the hollow and freezes the plants", "Hollows are usually more sheltered; still air allows frost."],
    ],
    answer: "A",
    explanation: "Cold air is denser than warm air, so on calm nights it flows downhill and collects in valleys and hollows (frost pockets).",
    hints: ["Which is denser: cold air or warm air?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why does irrigating a vegetable garden the day before a frost help protect the crop?",
    options: [
      ["Moist soil stores more heat and releases it at night", "Correct: wet soil holds and conducts more heat than dry soil."],
      ["Water kills the frost before it forms", "Water does not kill frost; it changes how much heat the soil holds."],
      ["Wet leaves cannot freeze", "Wet leaves can freeze; the benefit comes from the soil."],
      ["Irrigation water raises the air temperature to 20 °C", "The effect is small; it only helps keep temperatures slightly higher near the ground."],
    ],
    answer: "A",
    explanation: "Moist soil absorbs more heat by day and releases it at night, keeping the air near the plants slightly warmer.",
    hints: ["Compare how much heat wet and dry soil can hold."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does **rainfall reliability** describe?",
    options: [
      ["How much rainfall varies from one season to the next", "Correct: reliable rain varies little in amount and timing."],
      ["The total rainfall received in one year", "This is the amount of rainfall."],
      ["The amount of rain falling in one hour", "This is intensity."],
      ["The share of the rain that is actually useful to growing plants", "This is effectiveness."],
    ],
    answer: "A",
    explanation: "Reliability is about variation between seasons; distribution, effectiveness and intensity describe other features.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Most of Zimbabwe's rain falls in short, intense thunderstorms. What is the main effect of this on farmland?",
    options: [
      ["Much rain runs off, causing erosion and less soil water", "Correct: rain arrives faster than the soil can absorb it."],
      ["All the rain soaks in, so crops never wilt", "Intense rain exceeds the infiltration rate and runs off."],
      ["Leaching stops, because the rain is so short", "Heavy rain on permeable soils can still leach nutrients."],
      ["Frost becomes more frequent in summer", "Thunderstorms do not cause frost."],
    ],
    answer: "A",
    explanation: "High-intensity rain exceeds the infiltration rate of the soil, so water runs off, carrying topsoil and reducing rainfall effectiveness.",
    hints: ["Compare the rate of rainfall with the rate at which soil can absorb water."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: "A farmer in a dry part of Zimbabwe notices that some seasons give over 600 mm of rain and others under 300 mm. Which conclusion is correct?",
    options: [
      ["Rainfall reliability is low, so risk must be reduced", "Correct: large variation between seasons means low reliability."],
      ["Rainfall intensity is low, so erosion will not happen", "The data describe variation between seasons, not intensity."],
      ["Rainfall distribution is even through every month of each season", "Season totals say nothing about evenness within a season."],
      ["The mean rainfall is too high for small grains", "Small grains suit low, unreliable rainfall."],
    ],
    answer: "A",
    explanation: "Large differences between seasons show low reliability, typical of dry regions. Drought-tolerant crops, water harvesting and livestock reduce risk.",
    hints: ["Which rainfall term is about variation from season to season?"],
  });
  b.tf({
    d: 1, skill: "RECALL", applies: ZIM,
    stem: "Zimbabwe has one main rainy season, roughly from November to March.",
    answer: true,
    explanation: "True. Most rain falls in summer (about November to March); the rest of the year is largely dry.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A plant that is permanently wilted recovers on its own at night when transpiration falls.",
    answer: false,
    explanation: "False. That describes temporary wilting. A permanently wilted plant cannot recover unless water is added to the soil.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each rainfall term with its meaning.",
    pairs: [
      ["Distribution", "How rain is spread through the season and across the country"],
      ["Effectiveness", "The share of rain that becomes available to plants"],
      ["Reliability", "How much rainfall varies between seasons"],
      ["Intensity", "The amount of rain falling in a given time"],
    ],
    explanation: "Distribution (spread), effectiveness (usefulness), reliability (variation) and intensity (rate).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "Strong winds can flatten tall crops, which is called {{blank:a}}. Seedlings grown in very low light become pale and spindly, which is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["lodging"], choices: ["lodging", "wilting", "leaching", "tillering"] },
      { id: "b", accepted: ["etiolation"], choices: ["etiolation", "pollination", "vernalisation", "transpiration"] },
    ],
    explanation: "Wind causes lodging; too little light causes etiolation.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of wilting from which a plant cannot recover without watering.",
    accepted: ["permanent wilting", "permanent", "permanent wilt"],
    wrong: ["temporary wilting"],
    explanation: "Permanent wilting occurs when the soil reaches the permanent wilting point.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `In a month a field receives ${balance.rain} mm of rain, and evapotranspiration from the crop is ${balance.et} mm. Calculate the rainfall minus evapotranspiration in mm (a negative answer shows a deficit).`,
    value: deficit, unit: "mm", wrong: [-deficit, balance.rain + balance.et],
    explanation: `${balance.rain} − ${balance.et} = ${deficit} mm: a deficit of ${-deficit} mm, which the crop must draw from soil water.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A storm drops ${storm.rain} mm of rain on a field. ${storm.runoff} mm runs off and ${storm.evap} mm evaporates. Calculate the percentage of the rain that entered the soil.`,
    value: stormEff, unit: "%", wrong: [70, 40],
    explanation: `Water entering the soil = ${storm.rain} − ${storm.runoff} − ${storm.evap} = ${storm.rain - storm.runoff - storm.evap} mm. Percentage = ${storm.rain - storm.runoff - storm.evap} ÷ ${storm.rain} × 100 = ${stormEff}%. (Subtracting only the runoff gives 70%; 40% is the share LOST.)`,
    workedSolution: `1. Effective rain = ${storm.rain} − ${storm.runoff} − ${storm.evap} = ${storm.rain - storm.runoff - storm.evap} mm.\n2. Percentage = ${storm.rain - storm.runoff - storm.evap} ÷ ${storm.rain} × 100.\n3. = ${stormEff}%.`,
    hints: ["Subtract both losses from the rain.", "Then divide by the total rain and multiply by 100."],
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `A thunderstorm drops ${intense.rain} mm of rain in ${intense.minutes} minutes. Calculate its intensity, giving your answer as a number of millimetres per hour.`,
    value: intensity, wrong: [1.8, 12],
    explanation: `${intense.minutes} minutes = ${intense.minutes / 60} h (one third of an hour). Intensity = ${intense.rain} ÷ (${intense.minutes} ÷ 60) = ${intensity} mm per hour. (36 ÷ 20 = 1.8 is mm per minute; 36 ÷ 3 = 12 divides the wrong way.)`,
    workedSolution: `1. Convert the time: ${intense.minutes} min ÷ 60 = ${(intense.minutes / 60).toFixed(3)} h.\n2. Intensity = rain ÷ time = ${intense.rain} ÷ ${(intense.minutes / 60).toFixed(3)}.\n3. = ${intensity} mm per hour (or: ${intense.rain} mm × 3, because 20 minutes is one third of an hour).`,
    hints: ["Convert minutes to hours first.", "20 minutes is one third of an hour."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** ways in which a farmer can protect crops from frost.",
    points: [
      "Avoid planting tender crops in low-lying frost hollows / plant on slopes.",
      "Plant tender crops after the frost season (time of planting).",
      "Irrigate the day before an expected frost.",
      "Cover seedlings (grass, plastic, shade cloth) / mulch / grow frost-tolerant crops.",
    ],
    modelAnswer: "Plant tender crops on slopes, not in hollows; plant them after the frost season; irrigate the day before a frost is expected; cover seedlings with grass or plastic at night.",
    explanation: "Any four distinct protection methods.",
    hints: ["Think about where, when and how crops are grown."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how high temperature and low humidity together can reduce the yield of a maize crop.",
    points: [
      "They increase the rate of evapotranspiration.",
      "Soil water is used up faster / the crop wilts (temporarily, then permanently if prolonged).",
      "Stomata close to save water, so photosynthesis falls.",
      "Less food is made / pollination and grain filling are poor, so yield falls.",
    ],
    modelAnswer: "Hot, dry air increases evapotranspiration, so the soil dries quickly and the maize wilts. The leaves close their stomata to save water, so less carbon dioxide enters and photosynthesis falls. Less sugar is made, and heat and drought at tasselling reduce pollination, so fewer and smaller grains form.",
    explanation: "Link the climate to water loss, to photosynthesis and to yield.",
    hints: ["Start with water loss, then think about stomata and photosynthesis."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", calculator: true,
    stem: `Table 1 shows the rainfall (mm) at two fictional stations over five seasons.\n\n**Table 1**\n\n${table(["Station", "Season 1", "Season 2", "Season 3", "Season 4", "Season 5"], STATIONS)}`,
    hints: ["Mean = total ÷ 5.", "Range = highest − lowest."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean seasonal rainfall at Station Y in mm.", value: meanY, unit: "mm", wrong: [meanY * 5], explanation: `(610 + 320 + 540 + 250 + 680) ÷ 5 = ${meanY * 5} ÷ 5 = ${meanY} mm.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the range of seasonal rainfall at Station Y in mm.", value: rangeY, unit: "mm", wrong: [rangeX], explanation: `680 − 250 = ${rangeY} mm (Station X's range is only ${rangeX} mm).` }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which statement about the two stations is correct?", options: [
        ["Station X has the more reliable rainfall", `Correct: its seasons vary by only ${rangeX} mm.`],
        ["Station Y has the more reliable rainfall", `Station Y varies by ${rangeY} mm between seasons.`],
        ["Both stations have equally reliable rainfall", "Their ranges are very different."],
        ["Station Y has the higher mean rainfall", `Station X's mean (${meanX} mm) is higher than Station Y's (${meanY} mm).`],
      ], answer: "A", explanation: "Small variation between seasons means reliable rainfall." }),
      P.manual({ label: "(d)", marks: 4, stem: "Suggest and explain **two** ways in which a farmer at Station Y could reduce the risk caused by its rainfall.", points: [
        "Grow drought-tolerant crops (sorghum, millets) / early-maturing varieties.",
        "They yield something even in the dry seasons (e.g. seasons 2 and 4).",
        "Use water harvesting / conservation (tied ridges, potholes, mulching) or keep livestock.",
        "Stores more rain in the soil for dry spells / livestock income does not depend on one season's crop.",
      ], explanation: "Low reliability calls for risk-reducing crops, water conservation and livestock." }),
    ],
    explanation: `Station X: mean ${meanX} mm, range ${rangeX} mm (reliable). Station Y: mean ${meanY} mm, range ${rangeY} mm (unreliable).`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Paper 2",
    stem: `Table 2 shows monthly rainfall and estimated evapotranspiration (ET) for a maize crop on a fictional farm.\n\n**Table 2**\n\n${table(["Month", "Rainfall (mm)", "ET (mm)"], MONTHS)}`,
    hints: ["Rainfall − ET shows surplus or deficit.", "Maize is most sensitive to water stress at tasselling and silking."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate rainfall minus ET for February, in mm.", value: febDeficit, unit: "mm", wrong: [-febDeficit], explanation: `52 − 127 = ${febDeficit} mm (a deficit).` }),
      P.short({ label: "(b)", marks: 1, stem: "Name the month with the largest water surplus.", accepted: ["January", "Jan"], wrong: ["December"], explanation: "January: 192 − 132 = +60 mm (December is +36 mm)." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain the difference between temporary and permanent wilting, and state which the crop is more likely to suffer in February.", points: [
        "Temporary wilting: plant droops when water loss exceeds uptake in the heat of the day.",
        "It recovers when water loss falls (evening/night).",
        "Permanent wilting: soil at the permanent wilting point; plant does not recover without water and may die.",
        "In February, with a deficit and a dry spell, temporary wilting can become permanent if the deficit continues.",
      ], explanation: "Both types defined, plus the link to February's deficit." }),
      P.manual({ label: "(d)", marks: 6, stem: "Discuss practical ways in which the farmer could reduce the effects of the water deficits shown in Table 2.", points: [
        "Mulching / conservation agriculture to reduce evaporation from the soil.",
        "Water harvesting (tied ridges, potholes) to hold December-January surplus in the soil.",
        "Plant early (with the first effective rains) or choose early-maturing varieties so tasselling avoids the February deficit.",
        "Grow a drought-tolerant crop (sorghum, millets) instead of some maize.",
        "Weed control and windbreaks to reduce competition and water loss / supplementary irrigation if water is available.",
        "Reasoned judgement on the most effective measure for this farm (e.g. combining mulch with an early-maturing variety).",
      ], levels: agricultureLevels(6), explanation: "Credit measures that keep soil water or move the crop's needs away from the deficit months, with a judgement." }),
    ],
    explanation: "Deficits in October-November and February-March threaten the crop; February coincides with tasselling.",
  });

  b.card("DEFINITION", "Evapotranspiration", "Evaporation from the soil plus transpiration from plants: the total water lost as vapour from a field.");
  b.card("CONCEPT", "Temporary versus permanent wilting", "Temporary: recovers when water loss falls. Permanent: soil at the permanent wilting point; no recovery without water.");
  b.card("FACT", "When and where does frost form?", "On clear, calm winter nights, mainly in low-lying hollows where cold air collects.");
  b.card("CONCEPT", "Frost protection", "Avoid hollows, time planting, irrigate the day before, cover or mulch, grow frost-tolerant crops.");
  b.card("DEFINITION", "Rainfall effectiveness", "The share of rain that enters the soil and is available to plants after runoff and evaporation.");
  b.card("DEFINITION", "Rainfall reliability", "How much rainfall amount and timing vary between seasons; low where rainfall is low.");
  b.card("DEFINITION", "Rainfall intensity", "Amount of rain per unit time (e.g. mm per hour); high intensity causes runoff and erosion.");
  b.card("CONCEPT", "Effects of wind on crops", "Pollen and seed spread, more transpiration, lodging, spread of pests and diseases, wind erosion.");
  b.card("CONCEPT", "Effects of high humidity", "Less transpiration, more fungal disease; worse heat stress in livestock.", undefined);
  b.card("FACT", "Zimbabwe's rainy season", "Roughly November to March (one season); dry season about April to October.", undefined, { applies: ZIM });
});
