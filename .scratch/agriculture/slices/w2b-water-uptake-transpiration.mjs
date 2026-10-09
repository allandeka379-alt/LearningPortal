// Slice W2b: water and mineral uptake, transpiration and wilting.
import { concept, P, pct, pctChange, round, check, table, agricultureLevels } from "../lib.mjs";

// Weighing method (numbers differ from the lesson).
const W0 = 980, W1 = 956, HOURS = 4;
const wLost = W0 - W1;
const wRate = wLost / HOURS;
check(wLost === 24 && wRate === 6, "weighing");

// Potometer: bubble distance in 4 minutes.
const POT_MIN = 4;
const POT = [
  ["A", "Room, still air", 12],
  ["B", "Room, electric fan", 28],
  ["C", "Room, still air, shoot inside a clear plastic bag", 4],
  ["D", "Warm sunny window, still air", 24],
];
const potRate = (d) => d / POT_MIN;
check(potRate(28) === 7 && potRate(12) === 3, "pot rates");
const fanIncrease = pctChange(12, 28);
check(Math.abs(fanIncrease - 133.3333) < 1e-3, "fan increase");
const POT_TABLE = table(["Set-up", "Condition", `Distance moved by bubble in ${POT_MIN} min (mm)`], POT.map(([s, c, d]) => [s, c, d]));

// Percentage loss for a num item.
const P0 = 640, P1 = 608;
const pLossPct = pct(P0 - P1, P0);
check(pLossPct === 5, "pct loss");

concept("agri.plants.water-uptake-transpiration", { file: "plants/water-uptake-transpiration", keyPrefix: "plants.water-uptake-transpiration" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "By which process does water enter a root hair from the soil?",
    options: [
      ["Osmosis", "Correct: water crosses the partially permeable membrane into the more concentrated cell sap."],
      ["Active uptake", "Active uptake moves mineral ions, using energy; water moves by osmosis."],
      ["Transpiration", "Transpiration is the loss of water vapour from the leaves."],
      ["Translocation", "Translocation is the movement of food in the phloem."],
    ],
    answer: "A",
    explanation: "Soil water is dilute and root-hair sap is concentrated, so water enters by osmosis.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which change in the weather would **reduce** the rate of transpiration of a maize crop?",
    options: [
      ["A rise in humidity", "Correct: moist air reduces the diffusion gradient for water vapour."],
      ["A rise in temperature", "Warmer conditions increase evaporation and transpiration."],
      ["A rise in wind speed", "Wind removes water vapour from around the leaves and increases the rate."],
      ["A rise in light intensity", "Brighter light opens stomata wider and increases the rate."],
    ],
    answer: "A",
    explanation: "Humid air already holds much water vapour, so less diffuses out of the stomata.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do roots need oxygen in order to take up mineral salts?",
    options: [
      ["Active uptake of ions uses energy from respiration", "Correct: aerobic respiration in root cells needs oxygen."],
      ["Oxygen dissolves the mineral salts in the soil so that they can then enter the roots", "Oxygen does not dissolve the salts; water does."],
      ["Oxygen makes the soil solution more concentrated than the root sap", "Oxygen has no such effect on the concentration of soil water."],
      ["Mineral ions combine with oxygen in the xylem before moving up the plant", "Ions are not carried as compounds of oxygen in this way."],
    ],
    answer: "A",
    explanation: "Active uptake moves ions against a concentration gradient using energy from respiration, so waterlogged roots take up few minerals.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Through which structures is most water vapour lost from a leaf?",
    options: [
      ["Stomata", "Correct: water vapour diffuses out through the open pores."],
      ["Root hairs", "Root hairs absorb water; they do not lose vapour to the air."],
      ["Xylem vessels", "Xylem carries liquid water up the plant; it does not open to the air."],
      ["Phloem sieve tubes", "Phloem carries food, not water vapour."],
    ],
    answer: "A",
    explanation: "Most transpiration is through the stomata; a little passes through the cuticle.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer places a large amount of fertiliser in contact with young maize roots in moist soil. The seedlings wilt. Which explanation is correct?",
    options: [
      ["The soil solution becomes more concentrated than the sap, so water leaves by osmosis", "Correct: this is fertiliser burn."],
      ["The fertiliser blocks the xylem vessels, so water cannot rise to the leaves", "Fertiliser does not block the xylem."],
      ["The fertiliser makes the soil solution too dilute, so much water enters the root cells that they burst", "Plant cell walls stop cells bursting; and the soil solution becomes more concentrated, not less."],
      ["The fertiliser uses up all the oxygen in the soil, so the roots stop transpiring", "Roots do not transpire; transpiration is from the leaves."],
    ],
    answer: "A",
    hints: ["Compare the concentration of the soil solution with that of the root cell sap."],
    explanation: "Water moves from the dilute cell sap to the concentrated soil solution, so the roots lose water.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Cabbages droop on a hot, windy afternoon although the soil is moist, and recover by evening. What is this called?",
    options: [
      ["Temporary wilting", "Correct: loss exceeds uptake for a while, and the plant recovers when transpiration falls."],
      ["Permanent wilting", "In permanent wilting the plant does not recover without more water in the soil."],
      ["Bacterial wilt", "Bacterial wilt is a disease and the plants do not recover in the evening."],
      ["Imbibition", "Imbibition is uptake of water by dry seeds."],
    ],
    answer: "A",
    hints: ["Do the plants recover without watering?"],
    explanation: "Temporary wilting happens when transpiration is very fast; the plants recover once the rate drops.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a potometer experiment, a leafy shoot in a clear plastic bag takes up water much more slowly than an uncovered shoot beside it. Which explanation is best?",
    options: [
      ["Humid air in the bag makes the diffusion gradient small", "Correct: high humidity slows diffusion of water vapour."],
      ["The bag stops light reaching the leaves, so the stomata close completely", "The bag is clear, so light still passes through."],
      ["The bag makes the leaves much cooler, so the water in the xylem freezes", "Temperature does not fall to freezing; a bag usually warms the leaves slightly."],
      ["The bag prevents oxygen reaching the roots, so osmosis stops", "A cut shoot in a potometer has no roots, and osmosis does not need oxygen."],
    ],
    answer: "A",
    hints: ["What happens to the air inside the bag as the leaves lose water?"],
    explanation: "Inside the bag the air becomes saturated with water vapour, so little more can diffuse out of the stomata and water uptake falls.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Dry seeds first take up water by imbibition.",
    answer: true,
    explanation: "True. Cell walls, starch and proteins in the seed absorb water and swell.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Active uptake moves mineral ions from a higher concentration in the soil to a lower concentration in the root.",
    answer: false,
    explanation: "False. Active uptake moves ions **against** the gradient, from lower to higher concentration, using energy.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each process with its description.",
    pairs: [
      ["Diffusion", "Net movement of particles from high to low concentration"],
      ["Osmosis", "Water moving across a partially permeable membrane into a more concentrated solution"],
      ["Active uptake", "Ions moved against a concentration gradient using energy"],
      ["Imbibition", "Dry seed materials absorbing water and swelling"],
      ["Transpiration", "Loss of water vapour from the aerial parts of a plant"],
    ],
    explanation: "These processes move water and ions into and through the plant.",
  });
  b.fib({
    d: 2,
    stem: "Complete the description of the transpiration stream.",
    template: "Water enters the root hairs by {{blank:a}}, crosses the cortex and rises in the {{blank:b}} vessels to the leaves. It evaporates from the mesophyll cells and diffuses out through the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["osmosis"] },
      { id: "b", accepted: ["xylem"] },
      { id: "c", accepted: ["stomata", "stomates", "stoma", "stomatal pores"] },
    ],
    explanation: "Osmosis in, xylem up, evaporation and diffusion out through the stomata.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the apparatus used to measure the rate of water uptake by a leafy shoot.",
    accepted: ["potometer", "a potometer", "bubble potometer", "simple potometer"],
    explanation: "A **potometer** measures water uptake by a shoot, which is close to the rate of transpiration.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `A potted plant with its soil covered in plastic weighs ${W0} g at 07:00 and ${W1} g at 11:00. Calculate the mean rate of water loss in g per hour.`,
    value: wRate, wrong: [wLost],
    explanation: `Mass lost = ${W0} − ${W1} = ${wLost} g. Time = ${HOURS} hours. Rate = ${wLost} ÷ ${HOURS} = ${wRate} g per hour. ${wLost} g is the total loss, not the rate.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A covered potted seedling weighs ${P0} g in the morning and ${P1} g in the evening. Calculate the water lost as a percentage of the morning mass.`,
    value: pLossPct, unit: "%", wrong: [P0 - P1, round(pct(P0 - P1, P1), 1)],
    hints: ["Find the mass lost first.", "Divide by the starting (morning) mass."],
    explanation: `Mass lost = ${P0} − ${P1} = ${P0 - P1} g. Percentage = ${P0 - P1} ÷ ${P0} × 100 = ${pLossPct}%. Dividing by the evening mass gives ${round(pct(P0 - P1, P1), 1)}%, which is wrong.`,
    workedSolution: `1. Mass lost = ${P0} − ${P1} = ${P0 - P1} g.\n2. Percentage of the morning mass = ${P0 - P1} ÷ ${P0} × 100 = ${pLossPct}%.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how root hairs are suited to absorbing water.",
    hints: ["Think about surface area, wall thickness and the concentration of the cell sap."],
    points: [
      "Long and thin, giving a very large surface area.",
      "Thin cell wall / membrane, so a short distance for water to cross.",
      "Cell sap more concentrated than soil water, so water enters by osmosis.",
      "They grow between soil particles, in close contact with the soil water.",
    ],
    modelAnswer: "Root hairs are long and thin, so they give a huge surface area. Their walls are thin, so water crosses easily. Their sap is more concentrated than the soil water, so water enters by osmosis, and they grow between soil particles in contact with the water film.",
    explanation: "Structure linked to osmosis.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** practices that reduce wilting of newly transplanted tomato seedlings, and explain how each works.",
    hints: ["Think of when and how the seedlings are moved, and the conditions around them afterwards."],
    points: [
      "Transplant in the late afternoon or on a cloudy day.",
      "So transpiration is low while the roots re-establish.",
      "Lift with a ball of soil / water the nursery bed before lifting / shade the transplants / water immediately.",
      "So root hairs are not damaged, or water loss is reduced, or water uptake is maintained.",
    ],
    modelAnswer: "Transplant in the late afternoon so transpiration is low overnight while the roots recover. Water the nursery bed first and lift the seedlings with soil around the roots so that root hairs are not torn off.",
    explanation: "Reduce loss or protect uptake.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `Farai set up four identical potometers with leafy shoots of the same bean plant and measured how far the air bubble moved in ${POT_MIN} minutes.\n\n${POT_TABLE}`,
    hints: ["Rate = distance ÷ time.", "For each set-up, decide which factor was changed compared with set-up A."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the rate of water uptake in set-up B, in mm per minute.",
        value: potRate(28), wrong: [28],
        explanation: `28 ÷ ${POT_MIN} = ${potRate(28)} mm per minute.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage increase in the distance moved in B compared with A, to one decimal place.",
        value: fanIncrease, unit: "%", tol: 0.05, wrong: [round(pct(28, 12), 1), round(pctChange(28, 12), 1)],
        explanation: `(28 − 12) ÷ 12 × 100 = ${round(fanIncrease, 1)}%.`,
      }),
      P.short({
        label: "(c)", stem: "Name the environmental factor that was changed in set-up C.",
        accepted: ["humidity", "air humidity", "relative humidity", "humidity of the air", "water vapour in the air"],
        explanation: "The bag raises the humidity around the shoot.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain the result for set-up B.",
        points: ["The fan moves air over the leaves and removes water vapour from around the stomata.", "This keeps a steep concentration gradient, so water vapour diffuses out faster."],
        explanation: "Wind steepens the gradient.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain the result for set-up D.",
        points: ["Higher temperature makes water evaporate faster from the mesophyll cells (and molecules diffuse faster).", "Bright light opens the stomata wider."],
        explanation: "Warmth and light raise the rate.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "State **two** precautions Farai should take when setting up a potometer.",
        points: ["Cut the shoot under water / fit it under water so no air enters the xylem.", "Seal all joints with petroleum jelly so it is airtight (or: let the shoot settle before timing; dry the leaves)."],
        explanation: "Air bubbles in the xylem or leaks spoil the readings.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Suggest **two** ways in which a farmer could use these results to reduce water loss from an irrigated vegetable crop.",
        points: [
          "Plant windbreaks / hedges to reduce wind speed over the crop.",
          "Irrigate in the early morning or evening, when it is cooler and less water is lost (or: mulch / shade seedlings to lower evaporation and leaf temperature).",
        ],
        explanation: "Apply each factor to management.",
      }),
    ],
    explanation: "Calculate rates from the table, link each set-up to one factor, then apply the factors to crop management.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "Chipo's maize field near Gweru is waterlogged for a week after heavy storms. The young plants turn yellow and grow slowly, although there is plenty of water in the soil.",
    hints: ["What do roots need besides water?", "How are mineral ions taken in?"],
    parts: [
      P.short({
        label: "(a)", stem: "Name the gas that is in short supply in the waterlogged soil.",
        accepted: ["oxygen", "o2", "air"],
        explanation: "Water fills the air spaces, so there is little oxygen.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain why the plants turn yellow although there is plenty of water.",
        points: [
          "Roots cannot respire aerobically without oxygen, so little energy is released.",
          "Mineral ions such as nitrate are taken up by active uptake, which needs this energy.",
          "So the plants lack nitrogen (and other nutrients) and the leaves turn yellow.",
        ],
        explanation: "Low oxygen stops active uptake.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** ways of preventing this problem in future seasons.",
        points: ["Dig drains / ditches to remove excess water.", "Plant on ridges / avoid low-lying land / improve soil structure with organic matter."],
        explanation: "Drainage restores oxygen to the roots.",
      }),
    ],
    explanation: "Waterlogging starves roots of oxygen, stopping active uptake of minerals.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Transpiration loses huge amounts of water that a farmer has paid to irrigate. Discuss whether transpiration is harmful or useful to a crop.",
    hints: ["List what transpiration does for the plant as well as the costs.", "Finish with a judgement."],
    points: [
      "Harmful: water loss can cause wilting, closing stomata and reducing photosynthesis and yield.",
      "Harmful: increases irrigation needs and costs in dry areas.",
      "Useful: pulls the transpiration stream that carries water up the xylem.",
      "Useful: carries mineral salts from the roots to the leaves.",
      "Useful: evaporation cools the leaves on hot days (and keeps cells turgid for support).",
      "Judgement: it is an unavoidable cost of open stomata for photosynthesis; manage it (windbreaks, mulch, timing) rather than stop it.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Transpiration can be harmful: on hot, windy days a crop loses water faster than its roots supply it, the stomata close, photosynthesis slows and yield falls, and in dry areas the farmer must pay for more irrigation. But transpiration is also useful. The evaporation of water from the leaves pulls the transpiration stream up the xylem, bringing water and mineral salts from the roots to the leaves, and it cools leaves in hot sun. Stomata must open to take in carbon dioxide, so some loss cannot be avoided. Overall transpiration is necessary; the farmer should reduce excess loss with windbreaks, mulching and well-timed irrigation rather than see it as only a waste.",
    explanation: "Weigh the costs against the functions and judge.",
  });

  b.card("DEFINITION", "Osmosis", "Movement of water from a dilute to a more concentrated solution through a partially permeable membrane.");
  b.card("DEFINITION", "Active uptake", "Movement of ions against a concentration gradient using energy from respiration.");
  b.card("DEFINITION", "Imbibition", "Uptake of water by dry seed materials (cell walls, starch, protein), which swell.");
  b.card("DEFINITION", "Transpiration", "Loss of water vapour from the aerial parts of a plant, mainly through the stomata.");
  b.card("CONCEPT", "Transpiration stream", "Root hair (osmosis) → cortex → xylem of root and stem → leaf veins → mesophyll → evaporation → water vapour out of stomata.");
  b.card("CONCEPT", "Factors raising transpiration", "Higher temperature, stronger wind, brighter light, lower humidity.");
  b.card("FACT", "Which apparatus measures water uptake by a shoot?", "A potometer.");
  b.card("CONCEPT", "Temporary vs permanent wilting", "Temporary: recovers in the evening when transpiration falls. Permanent: soil too dry; no recovery without water.");
  b.card("CONCEPT", "Why waterlogged crops turn yellow", "No oxygen for root respiration, so no energy for active uptake of nitrate and other ions.");
});
