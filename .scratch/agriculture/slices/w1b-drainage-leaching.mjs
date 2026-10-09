// Slice W1b: soil drainage, waterlogging and leaching.
import { concept, P, pct, round, nutrientKg, check, table, agricultureLevels } from "../lib.mjs";

// Daily: water balance.
const WB = { rain: 45, runoff: 9, evap: 5, stored: 18 };
const wbDrain = WB.rain - WB.runoff - WB.evap - WB.stored;
check(wbDrain === 13, "wb");

// Calc: AN 250 kg/ha, 20% of N leached.
const anKg = 250;
const nApplied = nutrientKg(anKg, 34.5);
const nLost = nApplied * 0.2;
check(Math.abs(nLost - 17.25) < 1e-9, "N lost");

// Structured: soil columns leaching experiment.
const COLS = [["Sandy soil, no manure", 500, 410, 96], ["Sandy soil + manure", 500, 330, 58], ["Clay loam", 500, 240, 31]];
const C_TABLE = table(["Column", "Water added (mL)", "Water drained out (mL)", "Nitrate in drained water (mg)"], COLS);
const drainPctA = pct(COLS[0][2], COLS[0][1]);
check(drainPctA === 82, "drain A");
const nitrateRed = pct(COLS[0][3] - COLS[1][3], COLS[0][3]);
check(Math.abs(nitrateRed - 39.5833) < 1e-3, "nitrate reduction");

concept("agri.water.drainage-leaching", { file: "water/drainage-leaching", keyPrefix: "water.drainage-leaching" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **leaching**?",
    options: [
      ["The washing of dissolved nutrients down through the soil below the roots", "Correct: drainage water carries soluble nutrients down."],
      ["The removal of topsoil by running water over the surface", "That is erosion."],
      ["The upward movement of water by capillarity", "Capillary rise moves water up, not nutrients down."],
      ["The loss of water vapour from leaves", "That is transpiration."],
    ],
    answer: "A",
    explanation: "Leaching removes soluble nutrients such as nitrate, potassium, calcium and magnesium from the root zone.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do crops in a waterlogged soil often turn yellow and wilt?",
    options: [
      ["Roots lack oxygen, so they respire poorly and take up less water and nutrients", "Correct: water fills the air spaces."],
      ["The water dissolves the chlorophyll in the leaves", "Chlorophyll is not dissolved by soil water."],
      ["Waterlogged soil quickly becomes too warm for roots, so they stop growing and die", "Wet soils are usually cooler."],
      ["Too much nitrogen is taken up from the wet soil", "Nitrogen is lost by denitrification in waterlogged soil."],
    ],
    explanation: "With pores full of water, roots get little oxygen; respiration and active uptake fall, so plants yellow and wilt even in wet soil.",
    answer: "A",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which nutrient is most easily lost by leaching?",
    options: [
      ["Nitrogen in the form of nitrate", "Correct: nitrate is very soluble and not held by clay or humus."],
      ["Phosphorus held in the soil", "Phosphorus is held tightly and leaches very little."],
      ["Iron in soil minerals", "Iron is mostly in insoluble minerals."],
      ["Silicon in sand grains", "Quartz is very insoluble."],
    ],
    answer: "A",
    explanation: "Nitrate ions are negatively charged and not held on clay and humus, so they move freely with drainage water.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which drainage method involves pulling a bullet-shaped tool through a clay subsoil to leave an unlined channel?",
    options: [
      ["Mole drainage", "Correct: the 'mole' forms a channel in the clay."],
      ["Tile drainage", "Tile drains are pipes laid in trenches."],
      ["Open ditches", "Ditches are open channels dug at the surface."],
      ["Ridging", "Ridging raises the crop above wet furrows."],
    ],
    answer: "A",
    explanation: "Mole drains are cheap channels formed in stable clay subsoils; they last a few years.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a waterlogged soil, nitrogen is lost as a gas. Which organisms cause this?",
    options: [
      ["Denitrifying bacteria", "Correct: without oxygen they turn nitrate into nitrogen gas."],
      ["Nitrifying bacteria", "Nitrifying bacteria need oxygen and make nitrate."],
      ["*Rhizobium* bacteria", "*Rhizobium* fixes nitrogen into the plant."],
      ["Earthworms", "Earthworms leave waterlogged soil; they do not release nitrogen gas."],
    ],
    answer: "A",
    hints: ["Which bacteria thrive when oxygen is absent?"],
    explanation: "In waterlogged, anaerobic soil, denitrifying bacteria use nitrate instead of oxygen and release nitrogen gas.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer applies all his nitrogen top dressing in one dose to maize on sandy soil, just before a week of heavy rain. What is the most likely result?",
    options: [
      ["Much of the nitrate is leached below the roots, so the maize shows nitrogen deficiency", "Correct: sandy soil and heavy rain leach soluble nitrate."],
      ["The nitrogen is fixed in the sand and released slowly over years", "Sand holds little nitrogen."],
      ["The heavy rain dilutes the fertiliser so it cannot burn the crop, and all of it is then used", "Much of it will be leached."],
      ["The nitrogen is changed into phosphorus by soil bacteria", "Nutrients are not changed into other elements."],
    ],
    answer: "A",
    hints: ["Think about soil texture, solubility and timing."],
    explanation: "Sandy soils hold few nutrients and heavy rain drains through them quickly, carrying soluble nitrate away. Splitting doses avoids this.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A low-lying field has a high water table for most of the rainy season. Which plan would best allow a smallholder to use it?",
    options: [
      ["Dig an open main drain to the stream and plant on raised beds or ridges", "Correct: the drain lowers the water table and the beds lift roots above wet soil."],
      ["Add more irrigation water to wash out the excess", "More water worsens waterlogging."],
      ["Plough the field when the soil is at its wettest to break up the sticky clay", "Working wet soil destroys structure."],
      ["Leave the soil bare to increase evaporation", "Bare soil gains little and erodes; it does not drain the field."],
    ],
    answer: "A",
    hints: ["Water must be led away to a lower outlet."],
    explanation: "Drains lead excess water to an outlet and lower the water table; ridges and raised beds keep roots in aerated soil. Many vleis are used for winter crops when the water table falls.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Drainage is the downward movement of gravitational water through the soil.",
    answer: true,
    explanation: "True. Gravitational water drains down through large pores after heavy rain or irrigation.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Leaching makes soils more alkaline because calcium and magnesium are added.",
    answer: false,
    explanation: "False. Leaching removes calcium and magnesium, so soils become more acid; liming replaces them.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each drainage method with its description.",
    pairs: [
      ["Tile drains", "Perforated pipes laid in trenches and covered with gravel"],
      ["Open ditches", "Channels dug at the surface leading to an outlet"],
      ["Rubble (French) drains", "Trenches filled with stones or brushwood"],
      ["Subsoiling", "Breaking an impermeable pan so water can drain down"],
    ],
    explanation: "Each method removes excess water in a different way.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Four ways in which water is lost from the soil are evaporation, {{blank:a}} by plants, surface {{blank:b}} and drainage.",
    blanks: [
      { id: "a", accepted: ["transpiration"] },
      { id: "b", accepted: ["runoff", "run-off", "run off"] },
    ],
    explanation: "Evaporation, transpiration, runoff and drainage.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `After a ${WB.rain} mm storm, ${WB.runoff} mm runs off, ${WB.evap} mm evaporates and ${WB.stored} mm is stored in the soil. How many mm drain below the root zone?`,
    value: wbDrain, unit: "mm", wrong: [WB.rain - WB.runoff, WB.rain - WB.stored],
    explanation: `Drainage = ${WB.rain} − ${WB.runoff} − ${WB.evap} − ${WB.stored} = ${wbDrain} mm.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A farmer applies ${anKg} kg/ha of ammonium nitrate. Assume it contains 34.5% nitrogen and that 20% of this nitrogen is leached in a wet season. Calculate the mass of nitrogen leached, in kg/ha, to two decimal places.`,
    value: nLost, unit: "kg/ha", tol: 0.005, wrong: [anKg * 0.2, round(nApplied, 2)],
    hints: ["Find the nitrogen in the fertiliser first.", "Then take 20% of it."],
    explanation: `N applied = ${anKg} × 34.5 ÷ 100 = ${round(nApplied, 2)} kg. N leached = 20% × ${round(nApplied, 2)} = ${round(nLost, 2)} kg/ha. Taking 20% of the fertiliser instead of the nitrogen gives ${anKg * 0.2} kg.`,
    workedSolution: `1. Nitrogen in the fertiliser = ${anKg} × 34.5 ÷ 100 = ${round(nApplied, 2)} kg/ha.\n2. Nitrogen leached = 20 ÷ 100 × ${round(nApplied, 2)} = ${round(nLost, 2)} kg/ha.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the condition in which all the pores of a soil are filled with water for a long time.",
    accepted: ["waterlogging", "waterlogged", "water logging", "water-logging", "saturation"],
    explanation: "**Waterlogging**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** effects of waterlogging on soil organisms.",
    hints: ["Which organisms need oxygen?", "What happens to nitrogen?"],
    points: [
      "Aerobic organisms (earthworms, nitrifying bacteria, many fungi) lack oxygen and die or leave.",
      "So decomposition slows / structure suffers / organic matter is not broken down.",
      "Nitrifying bacteria stop working, so little nitrate is made.",
      "Denitrifying bacteria convert nitrate to nitrogen gas, so nitrogen is lost from the soil.",
    ],
    modelAnswer: "Earthworms and aerobic bacteria and fungi need oxygen, so they die or leave a waterlogged soil and decomposition slows. Nitrifying bacteria stop making nitrate, while denitrifying bacteria turn the nitrate that is present into nitrogen gas, so the crop loses nitrogen.",
    explanation: "Link lack of oxygen to the organisms and to the nitrogen supply.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Form 4 pupils packed three columns with soil, added the same amount of nitrogen fertiliser to each, then poured the same volume of water through them.\n\n${C_TABLE}`,
    hints: ["Percentage drained = drained ÷ added × 100.", "Organic matter and clay hold water and nutrients."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the percentage of the water added that drained out of the sandy soil with no manure.",
        value: drainPctA, unit: "%", wrong: [100 - drainPctA],
        explanation: `${COLS[0][2]} ÷ ${COLS[0][1]} × 100 = ${drainPctA}%.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the percentage reduction in nitrate leached when manure was added to the sandy soil, to one decimal place.",
        value: nitrateRed, unit: "%", tol: 0.05, wrong: [COLS[0][3] - COLS[1][3], round(pct(COLS[1][3], COLS[0][3]), 1)],
        explanation: `(${COLS[0][3]} − ${COLS[1][3]}) ÷ ${COLS[0][3]} × 100 = ${round(nitrateRed, 1)}%.`,
      }),
      P.mcq({
        label: "(c)", stem: "Which column lost the least nitrate?",
        options: [
          ["Clay loam", "Correct: only 31 mg."],
          ["Sandy soil, no manure", "It lost the most (96 mg)."],
          ["Sandy soil + manure", "It lost 58 mg, more than the clay loam."],
          ["All lost the same", "The amounts differ widely."],
        ],
        answer: "A",
        explanation: "The clay loam drained least water and so carried away least nitrate.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why less nitrate was leached from the sandy soil with manure.",
        points: ["Organic matter (humus) increases water-holding, so less water drained through.", "Less drainage water carried less nitrate down (and humus holds some nutrients)."],
        explanation: "Less drainage means less leaching.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Suggest **three** ways a farmer with sandy soil could reduce the leaching of nitrogen in the field.",
        points: ["Split the nitrogen into two or more doses (top dressing when the crop needs it).", "Add manure or compost to the soil.", "Avoid applying before heavy rain / avoid over-irrigation / keep the soil covered by crops or mulch."],
        explanation: "Timing, organic matter and cover reduce leaching.",
      }),
    ],
    explanation: "Leaching depends on how much water drains through the soil; organic matter and finer texture reduce it.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "A maize field near Marondera has a dense clay pan at 40 cm. After heavy rains, water stands in the furrows for several days, the soil below 20 cm is grey with rusty mottles, and the maize is short and yellow.",
    hints: ["Identify the cause, then the effect on roots, then a remedy."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the condition shown by the standing water and grey, mottled soil.",
        accepted: ["waterlogging", "waterlogged", "water logging", "poor drainage", "water-logging"],
        explanation: "The soil is waterlogged.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain why the maize is short and yellow.",
        points: [
          "Water fills the soil pores so roots get little oxygen.",
          "Root respiration is poor, so roots die / take up little water and mineral salts.",
          "Nitrate is lost by denitrification (and nitrification stops), so the maize lacks nitrogen and yellows.",
        ],
        explanation: "Oxygen shortage and nitrogen loss explain the symptoms.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** ways of improving the drainage of this field.",
        points: ["Break the clay pan by subsoiling / ripping.", "Install drains (open ditches, tile or mole drains) / plant on ridges or raised beds."],
        explanation: "Remove the impermeable layer and lead water away.",
      }),
    ],
    explanation: "An impermeable pan causes waterlogging; break it and drain the land.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A farmer says: \"Good drainage always improves crop yields.\" Discuss this statement.",
    hints: ["When does drainage help, and can it ever go too far?", "Think about leaching and drought on very free-draining soils."],
    points: [
      "Drainage of waterlogged soils supplies oxygen to roots, improving respiration and uptake.",
      "It allows aerobic organisms, nitrification and earlier cultivation and planting.",
      "But very free-draining (sandy) soils lose water quickly, so crops suffer in dry spells.",
      "Excess drainage increases leaching of nitrate and bases, lowering fertility and pH.",
      "Drains cost money and take land; draining vleis can lower water tables and harm wetlands.",
      "Judgement: drainage improves yields where soils are waterlogged, but more drainage is not always better.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Where a soil is waterlogged, drainage improves yields: roots get oxygen, nitrification resumes, denitrification stops and the land can be worked and planted on time. However, the statement goes too far. On sandy soils that already drain freely, more drainage means less water held for the crop in dry spells and more leaching of nitrate, potassium and calcium, so yields can fall unless organic matter is added and fertiliser is split. Drains also cost money and take land, and draining vleis can lower the water table and damage wetlands that store water for the dry season. So drainage improves yields only up to the point where the soil is well aerated but still holds enough water and nutrients.",
    explanation: "Balance the benefits of removing excess water against drought risk, leaching and cost.",
  });

  b.card("DEFINITION", "Drainage", "Downward movement of gravitational water through the soil; also removing excess water by drains.");
  b.card("DEFINITION", "Waterlogging", "All or most soil pores filled with water for a long time, leaving little air.");
  b.card("DEFINITION", "Leaching", "Washing of soluble nutrients down through the soil and out of the root zone.");
  b.card("FACT", "Four ways water is lost from soil", "Evaporation, transpiration, runoff and drainage.");
  b.card("CONCEPT", "Effects of waterlogging on crops", "No oxygen → poor root respiration → little water and nutrient uptake → yellowing, wilting, root death.");
  b.card("CONCEPT", "Waterlogging and nitrogen", "Nitrification stops; denitrifying bacteria turn nitrate into nitrogen gas.");
  b.card("CONCEPT", "Drainage methods", "Open ditches, tile drains, mole drains, rubble drains, ridges and raised beds, subsoiling pans.");
  b.card("FACT", "Nutrients most easily leached", "Nitrate, then potassium, calcium and magnesium; phosphorus leaches very little.");
  b.card("CONCEPT", "Controlling leaching", "Split nitrogen doses, add organic matter, keep soil covered, avoid over-irrigation, lime to replace bases.");
});
