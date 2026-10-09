// Slice W1b: the water cycle and groundwater (Cambridge only).
import { concept, P, waterVolume, pct, round, check, table, agricultureLevels } from "../lib.mjs";

// Daily: 12 mm on 400 m².
const dV = waterVolume({ areaM2: 400, depthMm: 12 });
check(dV.litres === 4800, "daily litres");

// Calc: 40 mm on 2 ha, 15% runoff.
const cV = waterVolume({ areaM2: 20000, depthMm: 40 });
const cRun = cV.m3 * 0.15;
check(cV.m3 === 800 && Math.abs(cRun - 120) < 1e-9, "calc runoff");

// Structured: two catchments, same 30 mm storm, 5 ha each.
const CATCH = [["Forested catchment", 30, 5, 18], ["Overgrazed catchment", 30, 5, 135]]; // [name, mm, ha, runoff m³]
const vol = waterVolume({ areaM2: 50000, depthMm: 30 }).m3;
check(vol === 1500, "catchment vol");
const runPct = CATCH.map(([, , , r]) => pct(r, vol));
check(Math.abs(runPct[0] - 1.2) < 1e-9 && Math.abs(runPct[1] - 9) < 1e-9, "run pct");
const C_TABLE = table(["Catchment", "Rainfall (mm)", "Area (ha)", "Runoff measured at outlet (m³)"], CATCH);

// Well levels (m below surface).
const WELL = [["April", 4.2], ["June", 5.0], ["August", 6.1], ["October", 7.4], ["December", 5.6]];
const W_TABLE = table(["Month", "Depth to water (m)"], WELL.map(([m, d]) => [m, d.toFixed(1)]));
const wellFall = WELL[3][1] - WELL[0][1];
check(Math.abs(wellFall - 3.2) < 1e-9, "well fall");

concept("agri.water.water-cycle", { file: "water/water-cycle", keyPrefix: "water.water-cycle" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the loss of water vapour from the leaves of plants called?",
    options: [
      ["Transpiration", "Correct: water vapour leaves mainly through the stomata."],
      ["Condensation", "Condensation is vapour turning into liquid droplets."],
      ["Infiltration", "Infiltration is water entering the soil."],
      ["Precipitation", "Precipitation is rain or hail falling from clouds."],
    ],
    answer: "A",
    explanation: "Transpiration is water loss from plants; with evaporation it makes up evapotranspiration.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which process forms clouds in the water cycle?",
    options: [
      ["Condensation of water vapour as rising air cools", "Correct: cooling vapour condenses into droplets."],
      ["Evaporation of water from oceans, lakes and dams", "Evaporation puts vapour into the air; clouds form when it condenses."],
      ["Infiltration of rain into the soil", "This happens at the ground surface."],
      ["Groundwater flow towards rivers", "This happens underground."],
    ],
    answer: "A",
    explanation: "Moist air rises and cools; its water vapour condenses on tiny particles to form cloud droplets.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the **water table**?",
    options: [
      ["The upper surface of the zone in which all pores are full of water", "Correct: below it the ground is saturated."],
      ["A table showing the rainfall for each month", "That is a rainfall record."],
      ["The bottom of the deepest borehole in an area", "Boreholes are drilled to below the water table."],
      ["The level reached by the water in a farm dam at the end of the rains", "That is surface water, not groundwater."],
    ],
    answer: "A",
    explanation: "The water table is the top of the saturated zone; it rises with recharge and falls in dry periods or with heavy pumping.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which material is most likely to form a good aquifer?",
    options: [
      ["Coarse sand and gravel", "Correct: large connected pores store and transmit water."],
      ["Heavy clay", "Clay holds water but its tiny pores let it flow very slowly."],
      ["Solid, unfractured granite", "Without cracks, granite holds very little water."],
      ["A compacted plough pan", "A pan restricts water movement."],
    ],
    answer: "A",
    explanation: "An aquifer must be permeable: sands, gravels, sandstone and fractured or weathered rock make good aquifers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A spring is most likely to be found where",
    options: [
      ["the water table meets the ground surface, often at the foot of a slope", "Correct: groundwater flows out naturally there."],
      ["the soil is deepest, on top of a hill", "The water table is usually far below hilltops."],
      ["a dam wall has been built across a river", "That stores surface water."],
      ["rain falls most heavily during a summer thunderstorm on a hilltop", "Springs come from groundwater, not directly from storms."],
    ],
    answer: "A",
    explanation: "Where the water table reaches the surface, groundwater seeps or flows out as a spring.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A hillside catchment is cleared of trees and then overgrazed. What is the most likely effect on the water cycle there?",
    options: [
      ["More runoff and less infiltration, so higher floods and less groundwater recharge", "Correct: bare, compacted soil sheds water."],
      ["More infiltration and less runoff, so rivers flow more evenly right through the year", "Removing cover has the opposite effect."],
      ["More transpiration, so the soil becomes wetter", "Fewer plants means less transpiration, but also much less infiltration."],
      ["No change, because rainfall is the same", "Land cover controls what happens to the rain."],
    ],
    answer: "A",
    hints: ["What does vegetation do to rain reaching the ground?"],
    explanation: "Trees and grass intercept rain and help it infiltrate. Bare, compacted soil increases runoff, causing floods and erosion, while less water recharges groundwater for the dry season.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why does the water level in a shallow hand-dug well often fall towards the end of the dry season?",
    options: [
      ["The water table falls because there is no recharge while water is still being used", "Correct: abstraction and evaporation continue without new rain."],
      ["Water in the open well evaporates faster than groundwater can flow in during the rains", "Recharge is greatest in the rains."],
      ["The well walls absorb the water", "Lined walls do not absorb significant water."],
      ["Transpiration by crops raises the water table", "Transpiration removes water."],
    ],
    answer: "A",
    hints: ["When is groundwater recharged?"],
    explanation: "Groundwater is recharged mainly in the rainy season. In the dry season the water table falls as water drains to rivers, is pumped out and is taken up by deep roots.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A farmer wants to site a new borehole for drinking water. Which site is best?",
    options: [
      ["Upslope of, and well away from, the pit latrines and the cattle kraal", "Correct: groundwater flows downslope, so pollutants should be downhill."],
      ["Just downslope of the cattle kraal, where the soil is fertile", "Leachate from manure could reach the water."],
      ["Next to the dip tank, so cattle can drink easily", "Dip chemicals could contaminate the groundwater."],
      ["Beside the pit latrine, where the ground is already dug", "Latrine waste would pollute the water."],
    ],
    answer: "A",
    hints: ["Groundwater moves; which way do pollutants travel?"],
    explanation: "Site water points uphill of and far from latrines, kraals and dip tanks, so that pollutants are not carried towards them by groundwater flow.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Evaporation and transpiration together are called evapotranspiration.",
    answer: true,
    explanation: "True. Evapotranspiration is the total water lost to the air from soil, water surfaces and plants.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Most groundwater is found as large underground lakes in open caves.",
    answer: false,
    explanation: "False. Most groundwater fills the pores and cracks in soil, sediment and rock within aquifers.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of the water cycle with its description.",
    pairs: [
      ["Evaporation", "Liquid water changes to vapour using the sun's heat"],
      ["Precipitation", "Water falls from clouds as rain or hail"],
      ["Infiltration", "Water soaks into the soil surface"],
      ["Runoff", "Water flows over the surface into streams"],
    ],
    explanation: "Each stage moves water between stores.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "A permeable rock layer that stores and transmits groundwater is called an {{blank:a}}. A narrow hole drilled by machine to reach groundwater is called a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["aquifer"] },
      { id: "b", accepted: ["borehole", "bore hole", "tube well"] },
    ],
    explanation: "Aquifers store groundwater; boreholes are drilled and cased to reach it.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A rainfall of 12 mm falls on a 400 m² school garden. How many litres of water fall on the garden? (1 mm of rain on 1 m² = 1 litre.)",
    value: dV.litres, unit: "L", wrong: [dV.m3, 400 + 12],
    explanation: `Volume = area × depth = 400 × 12 = ${dV.litres} L (= ${dV.m3} m³).`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A storm drops 40 mm of rain on a 2 ha field. Assume 15% of it runs off. Calculate the volume of runoff in m³.",
    value: cRun, unit: "m³", wrong: [cV.m3, cV.litres * 0.15],
    hints: ["Convert hectares to m²: 1 ha = 10,000 m².", "1 mm on 1 m² = 1 L; 1,000 L = 1 m³."],
    explanation: `Area = 2 × 10,000 = 20,000 m². Rain = 20,000 × 40 = ${cV.litres.toLocaleString("en-GB")} L = ${cV.m3} m³. Runoff = 15% × ${cV.m3} = ${cRun} m³.`,
    workedSolution: `1. Area = 2 ha × 10,000 = 20,000 m².\n2. Volume of rain = 20,000 m² × 40 mm = ${cV.litres.toLocaleString("en-GB")} L = ${cV.m3} m³.\n3. Runoff = 15 ÷ 100 × ${cV.m3} = ${cRun} m³.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the zone below the water table in which all pores are filled with water.",
    accepted: ["saturated zone", "zone of saturation", "saturated"],
    keywords: { any: ["saturat"] },
    explanation: "The **saturated zone** (zone of saturation).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which the water cycle is important to farmers.",
    hints: ["Link stages of the cycle to farm water supplies and crop water use."],
    points: [
      "Precipitation supplies water for rain-fed crops and pastures.",
      "Infiltration refills soil water used by crops (between rains).",
      "Runoff fills rivers and dams used for irrigation and livestock.",
      "Groundwater recharge supplies wells, boreholes and springs in the dry season (or: evapotranspiration determines crop water need / irrigation).",
    ],
    modelAnswer: "Rainfall supplies the water for rain-fed crops, and the part that infiltrates is stored in the soil for the crop between rains. Water that runs off fills dams and rivers used for irrigation, and water that percolates deep recharges the groundwater tapped by boreholes in the dry season.",
    explanation: "Credit any two stages linked clearly to a farming use (2 marks each).",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Runoff was measured at the outlets of two small catchments after the same storm.\n\n${C_TABLE}`,
    hints: ["Rain volume (m³) = area (m²) × rainfall (mm) ÷ 1,000.", "Runoff % = runoff ÷ rain volume × 100."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the volume of rain that fell on each catchment, in m³.",
        value: vol, unit: "m³", wrong: [vol * 1000, 150],
        explanation: `5 ha = 50,000 m²; 50,000 × 30 = 1,500,000 L = ${vol} m³.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the runoff from the overgrazed catchment as a percentage of the rain that fell.",
        value: runPct[1], unit: "%", wrong: [CATCH[1][3]],
        explanation: `${CATCH[1][3]} ÷ ${vol} × 100 = ${runPct[1]}%.`,
      }),
      P.num({
        label: "(c)", stem: "How many times more runoff came from the overgrazed catchment than from the forested one?",
        value: CATCH[1][3] / CATCH[0][3], unit: undefined, wrong: [CATCH[1][3] - CATCH[0][3]],
        explanation: `${CATCH[1][3]} ÷ ${CATCH[0][3]} = ${CATCH[1][3] / CATCH[0][3]} times.`,
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why the forested catchment produced less runoff.",
        points: [
          "Leaves intercept rain, and some evaporates before reaching the ground.",
          "Leaf litter and roots keep the soil porous, so more water infiltrates.",
          "Litter and vegetation slow water flowing over the surface (more time to soak in).",
        ],
        explanation: "Vegetation increases interception and infiltration.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest how the difference in runoff would affect the flow of the rivers fed by each catchment in the dry season.",
        points: ["The forested catchment's river keeps flowing longer in the dry season.", "Because more water infiltrated and recharged groundwater, which feeds the river slowly."],
        explanation: "Infiltrated water returns slowly as groundwater flow.",
      }),
    ],
    explanation: "Convert rainfall to a volume, compare runoff, and link land cover to infiltration and groundwater.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: `Thandeka recorded the depth to water in her family's hand-dug well, which is 8 m deep.\n\n${W_TABLE}`,
    hints: ["Recharge happens in the rainy season (about November to March)."],
    parts: [
      P.num({
        label: "(a)", stem: "By how many metres did the water level fall between April and October?",
        value: wellFall, unit: "m", wrong: [WELL[3][1]],
        explanation: `${WELL[3][1].toFixed(1)} − ${WELL[0][1].toFixed(1)} = ${wellFall.toFixed(1)} m.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why the water level rose between October and December.",
        points: ["The rains started.", "Water infiltrated and percolated down, recharging the groundwater so the water table rose."],
        explanation: "Recharge raises the water table.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest **three** ways the family could make their water supply more reliable at the end of the dry season.",
        points: ["Deepen the well below the lowest water table level / drill a borehole into the aquifer.", "Reduce wasteful use / avoid over-pumping in the dry season.", "Encourage infiltration above the well (grass cover, contour ridges) / harvest roof water in tanks."],
        explanation: "Reach deeper water, use less, or increase recharge and storage.",
      }),
    ],
    explanation: "The water table falls through the dry season and recovers with recharge in the rains.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Discuss the advantages and disadvantages of a borehole compared with a hand-dug well as a water supply for a farm.",
    hints: ["Compare depth, reliability, cost, pollution risk and maintenance.", "End with a judgement."],
    points: [
      "Borehole reaches deeper into the aquifer, so it is more reliable in the dry season.",
      "Borehole is narrow, cased and sealed, so less easily polluted.",
      "Borehole can be fitted with motor or solar pumps to give larger volumes for livestock or irrigation.",
      "But a borehole is expensive to drill and needs a pump that must be maintained.",
      "A hand-dug well is cheap and can be dug with local labour, but it is shallow, may dry up and is easily polluted.",
      "Judgement with reason, e.g. a borehole is better where it can be afforded and the aquifer is deep.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "A borehole is drilled deep into the aquifer, below the dry-season water table, so it gives a reliable supply all year. Its narrow, cased hole is easy to seal, so it is less likely to be polluted, and it can be fitted with a motor or solar pump to supply cattle or irrigation. However, drilling is expensive and the pump needs spare parts and maintenance. A hand-dug well is cheap and can be made with local labour, but it is shallow, often dries up late in the dry season and is easily contaminated unless it is covered. On balance a borehole is the better long-term supply for a farm where the cost can be met, while a protected well is a useful cheaper option for household needs.",
    explanation: "Weigh reliability and safety against cost and maintenance.",
  });

  b.card("DEFINITION", "Water cycle", "Continuous movement of water between oceans, air and land by evaporation, transpiration, condensation, precipitation, infiltration, runoff and groundwater flow.");
  b.card("DEFINITION", "Evapotranspiration", "Total water lost to the air by evaporation from soil and water plus transpiration from plants.");
  b.card("DEFINITION", "Aquifer", "A permeable layer of rock or sediment that stores and transmits groundwater.");
  b.card("DEFINITION", "Water table", "The upper surface of the saturated zone.");
  b.card("CONCEPT", "Spring", "Groundwater flowing out where the water table meets the surface, often at the foot of a slope.");
  b.card("CONCEPT", "Well versus borehole", "Well: wide, hand-dug, shallow, may dry up. Borehole: narrow, drilled, cased, deeper and more reliable, costly.");
  b.card("FORMULA", "Volume of rain on an area", "1 mm of rain on 1 m² = 1 L; litres = area (m²) × rainfall (mm).");
  b.card("CONCEPT", "Effect of removing vegetation on the water cycle", "Less interception and infiltration, more runoff: higher floods, more erosion, less groundwater recharge.");
  b.card("CONCEPT", "Protecting groundwater", "Site wells uphill of and away from latrines, kraals and dip tanks; cover wells; avoid over-pumping; use chemicals carefully.");
});
