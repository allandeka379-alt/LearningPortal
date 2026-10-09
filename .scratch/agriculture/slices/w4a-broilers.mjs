// Slice W4a: broiler production.
import { concept, P, fcr, dressingPct, mortalityPct, dailyGain, grossMargin, round, check, table, fmtNum } from "../lib.mjs";

// Num: FCR from feed and gain.
const fcrA = fcr({ feedKg: 315, gainKg: 175 });
check(Math.abs(fcrA - 1.8) < 1e-9, "fcrA");
// Num: dressing percentage.
const dpA = dressingPct({ carcassKg: 1.44, liveKg: 1.92 });
check(Math.abs(dpA - 75) < 1e-9, "dpA");
// Calc: mortality.
const morA = mortalityPct({ died: 9, started: 150 });
check(Math.abs(morA - 6) < 1e-9, "morA");
// Num: floor area.
const AREA_BIRDS = 450, DENSITY = 10;
const areaNeeded = AREA_BIRDS / DENSITY;
check(areaNeeded === 45, "area");
// Struct: growth records of a batch (sample mean masses).
const GROWTH = [[0, 0.042], [7, 0.16], [14, 0.42], [21, 0.82], [28, 1.3], [35, 1.82], [42, 2.38]];
const GROWTH_TABLE = table(["Age (days)", "Mean live mass (kg)"], GROWTH.map(([d, m]) => [d, m.toFixed(2)]));
const adgWeek6 = dailyGain({ startKg: 1.82, endKg: 2.38, days: 7 });
const adgWeek1 = dailyGain({ startKg: 0.042, endKg: 0.16, days: 7 });
check(Math.abs(adgWeek6 - 0.08) < 1e-9 && Math.abs(adgWeek1 - 0.016857) < 1e-5, "adg");
const adgG6 = round(adgWeek6 * 1000, 0);
check(adgG6 === 80, "adgG6");
// Struct: batch gross margin (assume prices).
const SOLD = 285;
const GM = grossMargin({
  output: [["Live broilers sold", SOLD, 4.5]],
  variable: [["Day-old chicks", 255], ["Feed", 630], ["Vaccines and medicines", 24], ["Litter, disinfectant and fuel", 66]],
});
check(GM.grossOutput === 1282.5 && GM.variableCosts === 975 && GM.grossMargin === 307.5, "gm");
const GM_TABLE = table(["Variable cost", "Amount (US\\$)"], GM.variableRows.map(([i, a]) => [i, a]));

concept("agri.livestock.broilers", { file: "livestock/broilers", keyPrefix: "livestock.broilers" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "At about what age are broilers usually slaughtered?",
    options: [
      ["5-7 weeks", "Correct: modern strains reach market weight very quickly."],
      ["18-22 weeks", "This is when layers start to lay."],
      ["About 12 months", "This is far too long for a meat chicken."],
      ["About 2-3 weeks, while they are still being brooded", "They are far too small at this age."],
    ],
    answer: "A",
    explanation: "Broilers are usually sold at about 5-7 weeks.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "In a brooder, the chicks are crowded together under the heater and cheeping loudly. What should the farmer do?",
    options: [
      ["Provide more heat", "Correct: the chicks are cold."],
      ["Raise the heater to reduce the heat", "That would make them colder."],
      ["Open all the curtains to let in fresh air", "This would cool the chicks further."],
      ["Remove the chick guard so that the chicks have more space to move around", "The guard keeps chicks near the heat; removing it does not warm them."],
    ],
    answer: "A",
    explanation: "Crowding under the heat source means the brooder is too cold.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a broiler house built with its long axis running east-west?",
    options: [
      ["So the sun does not shine directly in through the long sides", "Correct: this keeps the house cooler."],
      ["So the wind always blows straight through the house", "Draughts are harmful to chicks."],
      ["So that rain falls only on the roof and never reaches the walls", "Orientation is chosen for the sun, not the rain."],
      ["Because it is the cheapest way to build", "Cost is not affected by direction."],
    ],
    answer: "A",
    explanation: "With the long sides facing north and south, little direct sunlight enters and the house stays cooler.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which feed is given to broilers in their first one to two weeks?",
    options: [
      ["Broiler starter crumbs", "Correct: high in protein for fast early growth."],
      ["Broiler finisher pellets", "Finisher is fed in the last weeks."],
      ["Layer mash", "Layer mash is high in calcium and meant for laying hens."],
      ["Whole maize grain", "Chicks need a balanced, high-protein feed, not grain alone."],
    ],
    answer: "A",
    explanation: "Starter, grower and finisher are fed in that order.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which disease is linked to wet litter?"],
    stem: "After drinkers leaked for several days, broilers in a house had bloody droppings and many were dull and huddled. Which disease is most likely?",
    options: [
      ["Coccidiosis", "Correct: protozoa that multiply in wet litter and damage the gut."],
      ["Newcastle disease", "Newcastle disease is viral and mainly gives breathing and nervous signs."],
      ["Anthrax", "Anthrax is not a typical poultry disease."],
      ["Gumboro disease, which is spread by contaminated drinking water in buckets", "Gumboro is a viral disease controlled by vaccination; bloody droppings after wet litter point to coccidiosis."],
    ],
    answer: "A",
    explanation: "Coccidiosis thrives in damp litter; keep litter dry and use a coccidiostat in starter feed.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["FCR = feed ÷ gain; lower is better."],
    stem: "Two batches of broilers had feed conversion ratios of 1.7 and 2.3. Which statement is correct?",
    options: [
      ["The batch with FCR 1.7 used feed more efficiently", "Correct: it needed less feed per kg of gain."],
      ["The batch with FCR 2.3 used feed more efficiently", "A higher FCR means more feed for each kg of gain."],
      ["Both batches converted feed equally well", "The ratios differ."],
      ["FCR tells us nothing about feed efficiency, only about how many birds died", "FCR is the measure of feed efficiency."],
    ],
    answer: "A",
    explanation: "FCR 1.7 means 1.7 kg of feed per kg of gain, which is better than 2.3.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["What can survive in a house between batches?"],
    stem: "Why do broiler farmers practise all-in, all-out management?",
    options: [
      ["Disease cannot pass from older birds to new chicks, and the house can be cleaned and rested", "Correct."],
      ["Birds of different ages grow faster and more evenly when they are kept together in one house", "Mixed ages spread disease and are hard to feed correctly."],
      ["It allows the farmer to sell birds every day of the year", "All-in, all-out gives sales in batches."],
      ["It removes the need to vaccinate", "Vaccination is still needed."],
    ],
    answer: "A",
    explanation: "One age group at a time breaks disease cycles; the empty house is cleaned, disinfected and rested.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Feed should be withdrawn from broilers for about 8-12 hours before slaughter, but water should still be given.",
    answer: true,
    explanation: "True. An empty gut makes evisceration cleaner; water prevents dehydration.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A dressing percentage of 130% shows a very well-finished broiler.",
    answer: false,
    explanation: "False. The carcass is always lighter than the live bird; a broiler typically dresses at about 70-75%. A figure above 100% means the division was done upside down.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item of broiler equipment or practice with its purpose.",
    pairs: [
      ["Chick guard", "Keeps chicks close to the heat source"],
      ["Footbath", "Disinfects boots entering the house"],
      ["Deep litter", "Absorbs moisture from droppings"],
      ["Curtains", "Control ventilation and temperature"],
      ["Raised drinkers", "Reduce spillage and wet litter"],
    ],
    explanation: "Each item helps keep the birds warm, dry or disease-free.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Broilers are vaccinated against {{blank:a}} disease and Gumboro disease, and their feed efficiency is measured by the feed {{blank:b}} ratio.",
    blanks: [
      { id: "a", accepted: ["Newcastle"] },
      { id: "b", accepted: ["conversion"] },
    ],
    explanation: "Newcastle disease vaccination; feed conversion ratio.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A batch of broilers ate 315 kg of feed and gained 175 kg in live mass. Calculate the feed conversion ratio.",
    value: fcrA, tol: 0.005, answer: "1.8", wrong: [round(175 / 315, 2), 140],
    explanation: `FCR = feed ÷ gain = 315 ÷ 175 = ${fcrA}. Dividing gain by feed gives ${round(175 / 315, 2)}, which is upside down.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["Dressing % = carcass ÷ live mass × 100."],
    stem: "A broiler weighed 1.92 kg live and 1.44 kg after dressing. Calculate its dressing percentage.",
    value: dpA, unit: "%", tol: 0.05, answer: "75", wrong: [round((1.92 / 1.44) * 100, 1), 25],
    explanation: `1.44 ÷ 1.92 × 100 = ${dpA}%. Dividing live mass by carcass mass gives 133.3%, which is impossible; 25% is the mass lost, not the dressing percentage.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Mortality = deaths ÷ chicks placed × 100."],
    stem: "Chipo placed 150 day-old chicks and 9 died before slaughter. Calculate the mortality percentage.",
    value: morA, unit: "%", tol: 0, wrong: [9, round((9 / 141) * 100, 1)],
    explanation: `Mortality = 9 ÷ 150 × 100 = ${morA}%. Dividing by the survivors (141) gives ${round((9 / 141) * 100, 1)}%, which uses the wrong base.`,
    workedSolution: "1. Mortality = number that died ÷ number placed × 100.\n2. = 9 ÷ 150 × 100 = 6%.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["Area = number of birds ÷ birds per m²."],
    stem: `Assume a stocking density of ${DENSITY} broilers per m² at slaughter weight. Calculate the floor area in m² needed for ${AREA_BIRDS} broilers.`,
    value: areaNeeded, unit: "m²", tol: 0, wrong: [AREA_BIRDS * DENSITY, 4.5],
    explanation: `${AREA_BIRDS} ÷ ${DENSITY} = ${areaNeeded} m². Multiplying gives ${fmtNum(AREA_BIRDS * DENSITY)} m², far too large.`,
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    hints: ["Think of what must be done in the house before the chicks arrive."],
    stem: "Describe how Farai should prepare a broiler house before a new batch of day-old chicks arrives.",
    points: [
      "Remove old litter, clean, wash and disinfect the house and all feeders and drinkers.",
      "Rest the house empty for about two weeks / repair rat holes and curtains.",
      "Spread clean, dry litter (wood shavings or grass) about 5-10 cm deep and set up the chick guard.",
      "Switch on the brooder several hours early to warm the house; fill drinkers and put out starter feed; refill the footbath.",
    ],
    modelAnswer: "He should remove old litter, wash and disinfect the house and equipment and rest it for two weeks. Then he spreads fresh, dry litter, sets up the chick guard, warms the brooder for several hours, fills drinkers, puts starter on trays and refills the footbath.",
    explanation: "Clean, rest, litter, heat, feed and water ready.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Tatenda weighed a sample of broilers every week and recorded the mean live mass.\n\n${GROWTH_TABLE}`,
    hints: ["Daily gain = increase in mass ÷ days.", "Compare early and late weeks."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the average daily gain between day 35 and day 42, in g per day, to the nearest gram.",
        value: adgG6, unit: "g/day", tol: 0.5, answer: "80", wrong: [round(2.38 / 42 * 1000, 0), 560],
        explanation: `Gain = 2.38 − 1.82 = 0.56 kg = 560 g; 560 ÷ 7 = ${round(adgWeek6 * 1000, 1)} g/day, about ${adgG6} g.`,
      }),
      P.mcq({
        label: "(b)", stem: "Which statement describes the growth shown by the data?",
        options: [
          ["Daily gain increased as the birds got older", "Correct: from about 17 g/day in week 1 to 80 g/day in week 6."],
          ["Daily gain was the same every week", "The weekly increases grow from 0.12 kg to 0.48 kg."],
          ["The birds lost mass in the last week", "Mass rose from 1.82 to 2.38 kg."],
          ["Growth stopped completely after day 28 because the birds had reached full size", "Mass kept rising after day 28."],
        ],
        answer: "A",
        explanation: "Weekly gains: 0.12, 0.26, 0.40, 0.48, 0.52 and 0.56 kg, so the birds gained more each week.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the farmer weighs a sample of birds every week.",
        points: ["To compare growth with the target/expected curve and detect problems (disease, underfeeding) early.", "To calculate FCR and decide the best time to sell."],
        explanation: "Monitoring growth.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** management practices that help broilers reach a high mass by six weeks.",
        points: [
          "Correct brooding temperature in the first weeks, judged by chick behaviour.",
          "Feed and clean water always available, with the right starter, grower and finisher feeds.",
          "Dry litter, good ventilation without draughts, correct stocking density and vaccination against Newcastle and Gumboro disease.",
        ],
        explanation: "Heat, feed and water, environment and health.",
      }),
    ],
    explanation: "Interpret broiler growth records and link management to growth.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8, calculator: true,
    stem: `A youth club near Masvingo sold ${SOLD} live broilers at US\\$4.50 each (assume this price). Their variable costs for the batch were:\n\n${GM_TABLE}`,
    hints: ["Income = birds × price.", "Gross margin = income − total variable costs."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the income from the sale of the broilers, in US\\$.",
        value: GM.grossOutput, prefix: "US$", wrong: [SOLD * 4, SOLD + 4.5],
        explanation: `${SOLD} × 4.50 = US\\$${GM.grossOutput.toFixed(2)}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the gross margin for the batch, in US\\$.",
        value: GM.grossMargin, prefix: "US$", wrong: [GM.variableCosts, GM.grossOutput + GM.variableCosts],
        explanation: `Variable costs = 255 + 630 + 24 + 66 = US\\$${GM.variableCosts}; gross margin = ${GM.grossOutput.toFixed(2)} − ${GM.variableCosts} = US\\$${GM.grossMargin.toFixed(2)}.`,
      }),
      P.short({
        label: "(c)", stem: "Name the variable cost that is the largest.",
        accepted: ["feed", "the feed", "feed costs", "broiler feed"],
        explanation: "Feed (US\\$630) is by far the largest cost, as in most broiler enterprises.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** ways the club could increase its gross margin on the next batch.",
        points: [
          "Reduce feed waste (correct feeder height, no spillage) and improve FCR.",
          "Reduce deaths through good brooding, hygiene and vaccination, so more birds are sold.",
          "Sell dressed birds or sell at times of high demand (month-end, holidays) for a better price / buy inputs in bulk.",
        ],
        explanation: "Costs down, output up, price up.",
      }),
    ],
    explanation: "Calculate income and gross margin for a broiler batch and suggest improvements.",
  });

  b.card("DEFINITION", "Broiler", "A fast-growing meat chicken (hybrid strain) slaughtered at about 5-7 weeks.");
  b.card("FORMULA", "Feed conversion ratio (FCR)", "Feed eaten ÷ live-weight gain (both in kg). Lower is better.");
  b.card("FORMULA", "Dressing (killing-out) percentage", "Dressed carcass mass ÷ live mass × 100; broilers typically about 70-75%.");
  b.card("FORMULA", "Mortality percentage", "Number that died ÷ number placed × 100.");
  b.card("FACT", "Brooding temperature", "About 32-35 °C at chick level at first, falling about 3 °C a week; judge by the chicks' behaviour.");
  b.card("CONCEPT", "Reading chick behaviour", "Crowding under heat = too cold; spread away and panting = too hot; huddled on one side = draught; evenly spread = correct.");
  b.card("FACT", "Broiler feeds in order", "Starter (crumbs, highest protein) → grower → finisher (pellets) until slaughter.");
  b.card("CONCEPT", "All-in, all-out", "One batch of one age at a time; then clean, disinfect and rest the house to break disease cycles.");
  b.card("FACT", "Steps in dressing a broiler", "Starve 8-12 h (water given), kill humanely, bleed, scald, pluck, remove head and feet, eviscerate, wash, chill, pack.");
});
