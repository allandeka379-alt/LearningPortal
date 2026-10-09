// Slice W3b: safe use of agro-chemicals and the knapsack sprayer.
import { concept, P, sprayVolume, dilution, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: calibration 2.7 L on 180 m².
const n1 = sprayVolume({ litresUsed: 2.7, areaM2: 180 });
check(Math.abs(n1.lPerHa - 150) < 1e-9, "n1");
// Num: fills for 150 L/ha with a 16 L tank.
const n2 = sprayVolume({ litresUsed: 2.7, areaM2: 180, tankL: 16 });
const fills = Math.ceil(n2.tanksPerHa - 1e-9);
check(Math.abs(n2.tanksPerHa - 9.375) < 1e-9 && fills === 10, "n2");
// Num: ratio 1:79 in 20 L.
const n3 = dilution({ ratio: 79, tankL: 20 });
check(Math.abs(n3.concentrateMl - 250) < 1e-9, "n3");
// Num: 4 mL per litre in 18 L.
const n4 = dilution({ mlPerL: 4, tankL: 18 });
check(n4.concentrateMl === 72, "n4");
// Calc: 3.5 L on 250 m², 2 L/ha product, 14 L tank.
const c1 = sprayVolume({ litresUsed: 3.5, areaM2: 250, tankL: 14 });
const cPerTank = (2 * 1000 * 14) / c1.lPerHa;
check(Math.abs(c1.lPerHa - 140) < 1e-9 && Math.abs(cPerTank - 200) < 1e-9, "calc");

// Structured: calibration runs by three pupils over a 12 m x 25 m strip (300 m²).
const RUNS = [["Rudo", 6.3], ["Sipho", 6.6], ["Nyasha", 6.0]];
const R_TABLE = table(["Pupil", "Water used on the strip (L)"], RUNS.map(([n, l]) => [n, l.toFixed(1)]));
const runMean = RUNS.reduce((s, [, l]) => s + l, 0) / RUNS.length;
const sv = sprayVolume({ litresUsed: runMean, areaM2: 300, tankL: 18 });
sv.lPerHa = round(sv.lPerHa, 2);
const sPerTank = (1.8 * 1000 * 18) / sv.lPerHa;
check(Math.abs(runMean - 6.3) < 1e-9 && Math.abs(sv.lPerHa - 210) < 1e-9 && Math.abs(sPerTank - 154.2857) < 1e-3, "struct");

concept("agri.protection.agrochemicals", { file: "protection/agrochemicals", keyPrefix: "protection.agrochemicals" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which part of a knapsack sprayer builds up the pressure that forces the liquid out?",
    options: [
      ["The pump, worked by the lever", "Correct: the pump pressurises the liquid."],
      ["The strainer at the tank opening", "The strainer removes debris as the tank is filled."],
      ["The nozzle at the end of the lance", "The nozzle forms the droplets and the spray pattern."],
      ["The trigger valve on the lance", "The valve starts and stops the spray."],
    ],
    answer: "A",
    explanation: "Moving the lever works the pump, which pressurises the liquid; a pressure chamber keeps the pressure steady.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which WHO hazard class contains the most dangerous pesticides?",
    options: [
      ["Class Ia: extremely hazardous", "Correct."],
      ["Class Ib: highly hazardous", "Ib is next, but below Ia."],
      ["Class II: moderately hazardous", "II is less hazardous than Ia and Ib."],
      ["Class III: slightly hazardous", "III is the least hazardous of these four."],
    ],
    answer: "A",
    explanation: "The classes run Ia (extremely), Ib (highly), II (moderately), III (slightly) hazardous, and U (unlikely to present acute hazard).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why should pesticide concentrate be measured with a jug kept only for chemicals?",
    options: [
      ["Kitchen utensils could carry poison into food", "Correct."],
      ["Chemicals dissolve plastic kitchen jugs at once", "This is not the reason."],
      ["Kitchen cups always hold too little liquid", "Size is not the main issue."],
      ["The label forbids measuring the concentrate", "Concentrate must be measured accurately."],
    ],
    answer: "A",
    explanation: "Utensils used for chemicals must never be used for food or water; they are marked and kept with the chemicals.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When is the best time to spray a crop with a knapsack sprayer?",
    options: [
      ["On a calm, cool early morning", "Correct: little drift and little evaporation."],
      ["At midday in hot, windy weather", "Wind causes drift and heat increases evaporation."],
      ["Just before heavy rain is expected", "Rain washes the chemical off and into water."],
      ["Any time the labourers are free", "Weather matters for safety and effect."],
    ],
    answer: "A",
    explanation: "Calm, cool conditions reduce drift onto people, crops and water and loss by evaporation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does the **pre-harvest interval** on a pesticide label tell the farmer?",
    options: [
      ["How long to wait after spraying before harvesting", "Correct: residues must fall to a safe level."],
      ["How many days to wait between two sprays", "That is the spray interval."],
      ["How long the product keeps before it expires", "That is the expiry date."],
      ["How long the crop takes to grow from planting to harvest", "That is the crop's growing period."],
    ],
    answer: "A",
    explanation: "The pre-harvest interval is the minimum time between the last application and harvest.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "What is the correct way to deal with an empty liquid pesticide container?",
    options: [
      ["Triple-rinse it into the tank, puncture it, dispose as directed", "Correct."],
      ["Wash it in the river and use it to carry drinking water", "This pollutes the river and risks poisoning."],
      ["Keep it closed in the kitchen for storing cooking oil", "Containers must never be used for food."],
      ["Burn it next to the homestead with the household rubbish", "Burning near homes can release toxic fumes."],
    ],
    answer: "A",
    hints: ["The rinsings still contain chemical."],
    explanation: "Triple-rinsing uses the last of the chemical on the crop; puncturing stops reuse; disposal follows the label or local rules.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Where should the water used for rinsing a knapsack sprayer after use go?",
    options: [
      ["Sprayed over the field that was just treated", "Correct: the residue stays on land already treated."],
      ["Poured into the nearest stream or farm dam to dilute it", "This pollutes water used by people and animals."],
      ["Poured down the borehole drain", "This can contaminate groundwater."],
      ["Tipped onto the vegetable garden", "Untreated crops could be damaged or contaminated."],
    ],
    answer: "A",
    hints: ["Where will the chemical do no extra harm?"],
    explanation: "Rinsings are sprayed onto the crop or area that was treated, away from water sources.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A farmer sprays without calibrating his sprayer and puts on twice the intended volume of mixture per hectare. Which result is most likely?",
    options: [
      ["Wasted chemical, crop damage risk and higher residues", "Correct: double the chemical reaches each hectare."],
      ["Better pest control with no extra risk", "Overdosing adds cost and risk."],
      ["No effect, because the mixture strength was right", "Twice the volume means twice the chemical per hectare."],
      ["Too little chemical reaching the pests", "The opposite: too much reaches the crop."],
    ],
    answer: "A",
    hints: ["Same mixture strength, twice the litres per hectare."],
    explanation: "Calibration matches the mixture to the volume applied; applying twice the volume doubles the dose, wasting money and risking crop damage, residues and pollution.",
  });
  b.mcq({
    d: 4, skill: "APPLICATION",
    stem: "The nozzle of a knapsack sprayer blocks in the middle of the field. What should the operator do?",
    options: [
      ["Release pressure, clean it with a soft brush and water", "Correct, wearing gloves."],
      ["Blow through the nozzle to clear it quickly", "Never put a nozzle to your mouth: poisoning risk."],
      ["Push a nail through the hole to open it up", "This damages the nozzle and changes the spray."],
      ["Remove the nozzle and spray from the open lance", "Spray would be uneven and wasteful."],
    ],
    answer: "A",
    hints: ["Safety first: nothing goes near the mouth."],
    explanation: "Release pressure, remove the nozzle and clean it with a soft brush or by rinsing, wearing gloves; never blow through it.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Pesticides should always be kept in their original, labelled containers.",
    answer: true,
    explanation: "True. The label carries the instructions, warnings and first aid; unlabelled containers cause accidental poisoning.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each part of a knapsack sprayer with its function.",
    pairs: [
      ["Strainer", "Stops debris entering the tank"],
      ["Pressure chamber", "Keeps the spray pressure steady"],
      ["Trigger valve", "Starts and stops the spray"],
      ["Lance", "Lets the operator direct the spray"],
      ["Nozzle", "Breaks the liquid into droplets of a set pattern"],
    ],
    explanation: "Learn the parts in order from tank to nozzle.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "Empty pesticide containers should be {{blank:a}}-rinsed, with the rinsings added to the spray tank, and then {{blank:b}} so that they cannot be reused.",
    blanks: [
      { id: "a", accepted: ["triple", "three times", "3 times"] },
      { id: "b", accepted: ["punctured", "pierced", "holed", "crushed"] },
    ],
    explanation: "Triple-rinse and puncture.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name of the process of measuring how much liquid a sprayer applies to a known area?",
    accepted: ["calibration", "calibrating", "sprayer calibration", "calibrate"],
    keywords: { any: ["calibrat"] },
    explanation: "**Calibration.**",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A label says to mix 4 mL of insecticide in each litre of water. How many mL of insecticide are needed for an 18 L tank?",
    value: n4.concentrateMl, unit: "mL", tol: 0, wrong: [4.5, 18 / 4],
    explanation: `4 × 18 = ${n4.concentrateMl} mL.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "During calibration, Chipo uses 2.7 L of water to spray an area of 180 m². Calculate the spray volume in L/ha.",
    value: n1.lPerHa, unit: "L/ha", tol: 0, wrong: [round(2.7 / 180, 3), 1.5],
    hints: ["1 ha = 10,000 m²."],
    explanation: `2.7 ÷ 180 × 10,000 = ${n1.lPerHa} L/ha. Forgetting to multiply by 10,000 gives litres per m².`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A sprayer applies 150 L/ha and its tank holds 16 L. How many full tanks must be prepared to spray 1 ha? Round UP to a whole number of tanks.",
    value: fills, tol: 0, wrong: [Math.floor(n2.tanksPerHa), 9.375],
    hints: ["Tanks = spray volume ÷ tank size; part of a tank still needs a fill."],
    explanation: `150 ÷ 16 = ${n2.tanksPerHa}, so ${fills} tank fills (9 would leave part of the hectare unsprayed).`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A product is mixed at 1 part concentrate to 79 parts water. How many mL of concentrate are needed to make 20 L of spray mixture?",
    value: n3.concentrateMl, unit: "mL", tol: 0, wrong: [round(20000 / 79, 1), 79 * 20],
    hints: ["How many parts are there altogether?"],
    explanation: `Total parts = 1 + 79 = 80; 20,000 mL ÷ 80 = ${n3.concentrateMl} mL. Dividing by 79 forgets the concentrate's own part.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "Tatenda calibrates his 14 L knapsack sprayer and finds that he uses 3.5 L of water on 250 m². The label rate is 2 L of product per hectare. Calculate the volume of product, in mL, he must put in each full tank.",
    value: cPerTank, unit: "mL", tol: 0, wrong: [2 * 14, round((2 * 14) / 140, 3)],
    hints: ["Find the spray volume in L/ha first.", "Product per tank = product per ha × tank ÷ spray volume."],
    explanation: `Spray volume = 3.5 ÷ 250 × 10,000 = ${c1.lPerHa} L/ha. Each tank covers 14 ÷ ${c1.lPerHa} = 0.1 ha, so needs 2 L × 0.1 = 0.2 L = ${cPerTank} mL.`,
    workedSolution: `1. Spray volume = 3.5 L ÷ 250 m² × 10,000 = ${c1.lPerHa} L/ha.\n2. Area covered by one tank = 14 ÷ ${c1.lPerHa} = 0.1 ha.\n3. Product per tank = 2 L/ha × 0.1 ha = 0.2 L.\n4. 0.2 L × 1000 = ${cPerTank} mL.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** precautions that should be taken **during** spraying.",
    hints: ["Think of the weather, the operator and the nozzle."],
    points: [
      "Spray in calm, cool weather / not into the wind.",
      "So the spray does not drift onto the operator, people, other crops or water.",
      "Do not eat, drink or smoke / never blow through a blocked nozzle.",
      "Because the chemical can be swallowed and cause poisoning.",
    ],
    modelAnswer: "Spray only in calm, cool weather and not into the wind, so the spray does not drift onto the operator, people, crops or water. Do not eat, drink or smoke, or blow through a nozzle, because chemical on the hands or nozzle could be swallowed.",
    explanation: "Precaution plus reason, twice.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe **four** features of a safe store for farm chemicals.",
    hints: ["Think of who can get in, air, containers, shelves and spills."],
    points: [
      "Locked, with a warning sign, so children and unauthorised people cannot enter.",
      "Well ventilated, cool and away from houses, food, feed and water sources.",
      "Chemicals kept in original labelled containers on shelves off the floor (liquids below powders).",
      "Sand or sawdust for spills and a fire extinguisher; fuels stored separately.",
    ],
    modelAnswer: "The store is locked with a warning sign, well ventilated and away from houses, food and water. Chemicals stay in their labelled containers on shelves with liquids below powders, and sand for spills and a fire extinguisher are kept by the door, with fuels in a separate store.",
    explanation: "Security, location, containers, emergency equipment.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 12, calculator: true,
    stem: `Three Form 4 pupils near Gweru each calibrate the same 18 L knapsack sprayer by spraying water over a 12 m × 25 m strip of grass.\n\n${R_TABLE}`,
    hints: ["Area = 12 × 25 m².", "Use the mean of the three runs.", "Product per tank = product per ha × tank ÷ spray volume."],
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the mean volume of water used, in litres.",
        value: runMean, unit: "L", tol: 0.05, answer: "6.3", wrong: [6.6, 18.9],
        explanation: `(6.3 + 6.6 + 6.0) ÷ 3 = ${runMean.toFixed(1)} L.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Using your answer to (a), calculate the spray volume in L/ha.",
        value: sv.lPerHa, unit: "L/ha", tol: 0, wrong: [round(runMean / 300, 3), runMean * 300],
        explanation: `Area = 12 × 25 = 300 m²; ${runMean.toFixed(1)} ÷ 300 × 10,000 = ${sv.lPerHa} L/ha.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "The label rate is 1.8 L of product per hectare. Calculate the mL of product for each full 18 L tank, to the nearest mL.",
        value: sPerTank, unit: "mL", tol: 0.5, answer: "154", wrong: [1.8 * 18, round((1.8 * 1000) / 18, 1)],
        explanation: `1.8 × 1000 × 18 ÷ ${sv.lPerHa} = ${round(sPerTank, 1)}, so about 154 mL per tank.`,
      }),
      P.mcq({
        label: "(d)", stem: "Why did the pupils use water rather than the pesticide mixture to calibrate?",
        options: [
          ["It is safe and nothing is wasted", "Correct: only the volume matters during calibration."],
          ["Water flows faster than the mixture", "This is not the reason."],
          ["The pesticide would clog the strainer", "This is not the reason."],
          ["Calibration only works on grass with water", "It is done with water for safety, not because of the grass."],
        ],
        answer: "A",
        explanation: "Calibrating with water avoids exposure and waste; the flow is close to that of the dilute mixture.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest why the three pupils used different volumes of water on the same strip.",
        points: ["They walked at different speeds.", "They pumped at different rates (different pressure) / held the nozzle at different heights."],
        explanation: "Walking speed and pressure.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why the person who will spray the crop should do the calibration.",
        points: ["Each person walks and pumps at their own speed and rate.", "So the measured spray volume (and the dose) is only correct for the person who calibrated."],
        explanation: "Calibration is personal.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "State **two** maintenance tasks to carry out on the sprayer after use.",
        points: ["Rinse the tank and spray clean water through the hose and nozzle (onto the treated area).", "Clean the strainer and nozzle / oil moving parts / store empty and dry out of the sun."],
        explanation: "Cleaning and storage.",
      }),
    ],
    explanation: "Calibrate a knapsack sprayer from class data and calculate the product per tank.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "On a farm near Chipinge, pesticides, fertiliser, diesel and animal feed are kept together in an unlocked shed next to the kitchen. Some insecticide has been poured into an unlabelled cooldrink bottle for convenience.",
    hints: ["List the hazards first, then the improvements and why they matter."],
    parts: [
      P.manual({
        label: "(a)", marks: 3, stem: "Identify **three** dangerous practices on this farm.",
        points: ["The store is unlocked and next to the kitchen (children, food contamination).", "Insecticide in an unlabelled drink bottle (could be drunk by mistake; no instructions or first aid).", "Fuel stored with chemicals and feed (fire risk; feed contamination)."],
        explanation: "Spot the hazards.",
      }),
      P.manual({
        label: "(b)", marks: 5, stem: "Evaluate the changes the farmer should make, and say which is most urgent.",
        points: [
          "Return the insecticide to its original labelled container at once (or dispose of it safely); never use drink bottles.",
          "Move chemicals to a locked, ventilated store away from the kitchen, food and water, with a warning sign.",
          "Store diesel separately, away from flames, with a fire extinguisher and sand for spills.",
          "Keep feed in a separate store so it cannot be contaminated.",
          "Judgement: the unlabelled drink bottle is the most urgent, because it could kill a child or worker who drinks from it.",
        ],
        levels: agricultureLevels(5),
        explanation: "Improvements with reasons and a justified priority.",
      }),
    ],
    explanation: "Identify unsafe storage practices and evaluate improvements.",
  });

  b.card("DEFINITION", "Calibration", "Measuring how much liquid a sprayer applies to a known area at normal speed and pressure, so the correct dose can be mixed.");
  b.card("FORMULA", "Spray volume", "L/ha = litres used ÷ area sprayed (m²) × 10,000.");
  b.card("FORMULA", "Mixing by ratio 1 : n", "Concentrate = mixture volume ÷ (n + 1).");
  b.card("FACT", "WHO pesticide hazard classes", "Ia extremely, Ib highly, II moderately, III slightly hazardous; U unlikely to present acute hazard.");
  b.card("CONCEPT", "Protective clothing for spraying", "Overalls, gloves, rubber boots, goggles or face shield, mask or respirator, hat.");
  b.card("CONCEPT", "After spraying", "Rinse sprayer onto the treated field, triple-rinse and puncture containers, wash clothing and body, record, observe re-entry and pre-harvest intervals.");
  b.card("CONCEPT", "Safe chemical store", "Locked, ventilated, signed, away from homes, food and water; original labelled containers; liquids below powders; sand and extinguisher; fuels apart.");
  b.card("FACT", "Knapsack sprayer parts", "Tank, strainer, lever and pump, pressure chamber, hose, trigger valve, lance, nozzle, straps.");
  b.card("DEFINITION", "Pre-harvest interval", "Minimum time between the last application of a chemical and harvesting the crop.");
});
