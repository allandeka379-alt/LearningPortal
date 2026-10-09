// Slice W2a: inorganic fertilisers and fertiliser application.
import { concept, P, fertiliser, perStation, plantPopulation, nutrientKg, productForNutrient, field, round, check, table, agricultureLevels } from "../lib.mjs";

// Num 1: bags for 1.6 ha at 300 kg/ha.
const F1 = fertiliser({ rateKgHa: 300, areaHa: 1.6 });
check(F1.kg === 480 && F1.bags === 10, "F1");
// Num 2: a plot in m².
const plot2 = field(60, 45);
const F2 = fertiliser({ rateKgHa: 400, areaM2: plot2.m2 });
check(plot2.m2 === 2700 && Math.abs(F2.kg - 108) < 1e-9, "F2");
// Calc 3: grams per plant of AN at 75 x 25 cm.
const pop3 = plantPopulation({ rowCm: 75, inRowCm: 25 });
const g3 = perStation({ rateKgHa: 250, population: pop3.perHa });
check(Math.abs(g3 - 4.6875) < 1e-9, "g3");
// Calc 4: urea for 69 kg N.
const urea4 = productForNutrient(69, 46);
check(Math.abs(urea4 - 150) < 1e-9, "urea");
// Num 5: SSP (assume 18%) for 45 kg P2O5.
const ssp5 = productForNutrient(45, 18);
check(Math.abs(ssp5 - 250) < 1e-9, "ssp");
// Num 6: N in 300 kg Compound D.
const n6 = nutrientKg(300, 7);
check(Math.abs(n6 - 21) < 1e-9, "n6");

// Structured: 0.8 ha of maize, basal 400 kg/ha Compound D, top dressing 250 kg/ha AN.
const AREA = 0.8;
const basal = fertiliser({ rateKgHa: 400, areaHa: AREA });
const top = fertiliser({ rateKgHa: 250, areaHa: AREA });
const nPerHa = nutrientKg(400, 7) + nutrientKg(250, 34.5);
check(basal.bags === 7 && top.bags === 4 && Math.abs(nPerHa - 114.25) < 1e-9, "struct");
const S_TABLE = table(["Fertiliser", "Analysis (assume)", "Rate (kg/ha)", "When applied"], [
  ["Compound D", "N:P:K compound, 7% N", 400, "At planting"],
  ["Ammonium nitrate", "34.5% N", 250, "Split: 4 and 7 weeks after emergence"],
]);

concept("agri.soil.inorganic-fertilisers", { file: "soil/inorganic-fertilisers", keyPrefix: "soil.inorganic-fertilisers" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **straight** fertiliser?",
    options: [
      ["Ammonium nitrate", "Correct: it supplies only nitrogen of the three primary nutrients."],
      ["Compound D (7:14:7)", "It supplies N, P and K, so it is a compound fertiliser."],
      ["A 2:3:2 mixture sold for vegetable gardens", "It supplies three nutrients, so it is compound."],
      ["Any granular fertiliser that contains nitrogen together with phosphate", "Two primary nutrients make it compound."],
    ],
    answer: "A",
    explanation: "A straight fertiliser supplies one primary nutrient: ammonium nitrate (N), single superphosphate (P) or muriate of potash (K).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A bag of fertiliser is labelled 7:14:7. What does the middle number tell you?",
    options: [
      ["14% of the fertiliser is phosphate (as P₂O₅)", "Correct: the order is always N : P₂O₅ : K₂O."],
      ["14% of the fertiliser is nitrogen", "Nitrogen is the first number, 7."],
      ["The bag contains 14 kg of potash", "Potash is the last number, and the numbers are percentages."],
      ["The fertiliser should be applied at 14 kg per hectare", "The numbers are an analysis, not a rate."],
    ],
    answer: "A",
    explanation: "The ratio gives percentages by mass of N, P₂O₅ and K₂O, in that order.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is nitrogen usually applied as a top dressing rather than all at planting?",
    options: [
      ["It is soluble and easily leached, so it is given when the crop can use it", "Correct: late, split doses reduce leaching."],
      ["Nitrogen is not needed at all by young seedlings in their first weeks of growth", "Seedlings need some nitrogen; basal compounds supply a little."],
      ["Nitrogen fertilisers cannot be bought before the rains", "Availability is not the reason."],
      ["Nitrogen moves very little in the soil and must be placed on the leaves", "Nitrogen moves easily; that is why it leaches."],
    ],
    answer: "A",
    explanation: "Nitrate moves with soil water. Applying it in split doses when the crop is growing fast means less is lost below the roots.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which method of application is best suited to a wheat crop sown in closely spaced rows?",
    options: [
      ["Broadcasting", "Correct: closely spaced crops cover the whole surface."],
      ["Spot placement beside each individual plant", "Far too slow for thousands of closely spaced plants."],
      ["Foliar feeding of all the nitrogen and phosphorus", "Foliar feeding suits small doses, such as trace elements."],
      ["Ring placement around each plant", "Ring placement suits widely spaced trees."],
    ],
    answer: "A",
    explanation: "Broadcasting spreads fertiliser evenly over the whole field; it suits wheat, pastures and lime.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer drops basal fertiliser directly onto the maize seed in each planting hole. What is the most likely result?",
    options: [
      ["Poor germination: the concentrated salts draw water out of the seed", "Correct: this is fertiliser burn."],
      ["Faster germination, because the seed gets nutrients sooner", "The seed has its own food store; contact with fertiliser harms it."],
      ["No effect at all, because seeds cannot absorb any substances from the soil around them", "Seeds absorb water and are damaged by concentrated salts."],
      ["The fertiliser is washed away by the first rain before the seed can use it", "Placement in the hole does not wash it away."],
    ],
    answer: "A",
    hints: ["Think about osmosis and concentrated salts."],
    explanation: "Concentrated fertiliser salts lower the water potential around the seed, so water leaves it and it may die. Place fertiliser a few centimetres away and cover it with soil.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: `How much nitrogen is contained in one 50 kg bag of a 7:14:7 compound fertiliser?`,
    options: [
      ["3.5 kg", "Correct: 50 × 7 ÷ 100 = 3.5 kg."],
      ["7 kg", "7 is the percentage, not the mass in a 50 kg bag."],
      ["14 kg", "That is the percentage of phosphate."],
      ["0.14 kg", "This divides 7 by 50 instead of taking 7% of 50."],
    ],
    answer: "A",
    hints: ["Find 7% of 50 kg."],
    explanation: "Mass of N = 50 × 7 ÷ 100 = 3.5 kg.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is a trace element such as zinc often applied as a foliar spray?",
    options: [
      ["Only a tiny amount is needed and leaves absorb it quickly", "Correct: foliar sprays correct trace deficiencies fast."],
      ["Zinc is a gas that must be sprayed onto the crop", "Zinc is not a gas."],
      ["Leaves can take up all of the crop's nitrogen and phosphorus needs as well", "Large nutrient needs cannot be met through leaves."],
      ["Foliar sprays never scorch leaves, however concentrated the solution is", "Concentrated sprays do scorch leaves."],
    ],
    answer: "A",
    hints: ["Compare the amounts of trace and major nutrients needed."],
    explanation: "Small doses of trace elements can be absorbed through the leaves, giving a quick correction.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Ammonium nitrate is stored in the same shed as diesel and dry grass. What is the main hazard?",
    options: [
      ["Fire, because ammonium nitrate is an oxidising substance", "Correct: it makes fuels burn fiercely."],
      ["The diesel will turn the fertiliser into a weedkiller", "Diesel does not convert fertiliser into herbicide."],
      ["The dry grass will absorb all the nitrogen from the bags", "Grass does not absorb nitrogen from bags."],
      ["The fertiliser will slowly lose its colour and become useless to crops", "Colour is not the concern."],
    ],
    answer: "A",
    hints: ["What does an oxidising substance do near a fuel?"],
    explanation: "Store ammonium nitrate dry, on pallets, away from fuels, organic material and naked flames.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Basal dressing is fertiliser applied at or just before planting.",
    answer: true,
    explanation: "True. Basal dressing, mainly P and K, is applied at planting; top dressing is applied to the growing crop.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Top dressing should be applied to wet leaves so that it dissolves quickly.",
    answer: false,
    explanation: "False. Fertiliser on wet leaves scorches them. Apply it to moist soil beside the plants.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each method of fertiliser application with its description.",
    pairs: [
      ["Banding", "Placed in a strip along the row, beside and below the seed"],
      ["Side dressing", "Placed beside the rows of a growing crop"],
      ["Foliar feeding", "Sprayed on the leaves as a dilute solution"],
      ["Fertigation", "Dissolved in the irrigation water"],
      ["Placement", "A measured amount put in each planting hole or station"],
    ],
    explanation: "Match the method to where and how the fertiliser is put.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Ammonium nitrate contains about {{blank:a}}% nitrogen, and urea contains about {{blank:b}}% nitrogen.",
    blanks: [
      { id: "a", accepted: ["34.5", "34,5"] },
      { id: "b", accepted: ["46"] },
    ],
    explanation: "Ammonium nitrate about 34.5% N; urea about 46% N.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `A farmer will apply Compound D at 300 kg/ha to 1.6 ha. How many 50 kg bags must be bought? Round UP to whole bags.`,
    value: F1.bags, unit: "bags", tol: 0, wrong: [Math.floor(F1.exactBags), F1.kg],
    explanation: `${300} × 1.6 = ${F1.kg} kg; ${F1.kg} ÷ 50 = ${F1.exactBags}, so ${F1.bags} bags. Rounding down to ${Math.floor(F1.exactBags)} leaves part of the field without fertiliser.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: `A vegetable plot measures 60 m by 45 m. Calculate the mass of fertiliser needed at 400 kg/ha, in kg.`,
    value: F2.kg, unit: "kg", tol: 0, wrong: [400 * plot2.m2, 400 * 0.027],
    hints: ["Convert the area to hectares first: 1 ha = 10,000 m²."],
    explanation: `Area = 60 × 45 = ${plot2.m2.toLocaleString("en-GB")} m² = ${plot2.ha} ha. Fertiliser = 400 × ${plot2.ha} = ${F2.kg} kg. Multiplying by the area in m² gives an answer 10,000 times too big.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Maize is planted at 75 cm between rows and 25 cm within the row, one plant per station. Ammonium nitrate is to be side-dressed at 250 kg/ha. Calculate the mass of ammonium nitrate per plant, in g, to one decimal place.",
    value: g3, unit: "g/plant", tol: 0.05, wrong: [round(250 / pop3.perHa, 4), round(g3 * 100, 0)],
    hints: ["Find the plants per hectare first.", "Convert kg to g before dividing."],
    explanation: `Area per plant = 0.75 × 0.25 = ${pop3.m2PerStation} m²; plants/ha = 10,000 ÷ ${pop3.m2PerStation} = ${Math.round(pop3.perHa).toLocaleString("en-GB")}. Per plant = 250,000 g ÷ ${Math.round(pop3.perHa).toLocaleString("en-GB")} = ${round(g3, 1)} g.`,
    workedSolution: `1. Area per plant = 0.75 m × 0.25 m = ${pop3.m2PerStation} m².\n2. Plants per hectare = 10,000 ÷ ${pop3.m2PerStation} = ${Math.round(pop3.perHa).toLocaleString("en-GB")}.\n3. Fertiliser per hectare in grams = 250 × 1,000 = 250,000 g.\n4. Per plant = 250,000 ÷ ${Math.round(pop3.perHa).toLocaleString("en-GB")} = ${round(g3, 1)} g.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A crop needs 69 kg of nitrogen per hectare. Assume urea contains 46% N. Calculate the mass of urea needed per hectare, in kg.",
    value: urea4, unit: "kg/ha", tol: 0.5, wrong: [round(69 * 0.46, 2), 69],
    hints: ["Divide the nitrogen needed by the fraction of nitrogen in urea."],
    explanation: `Urea = 69 ÷ 0.46 = ${urea4} kg/ha. Multiplying 69 by 0.46 (${round(69 * 0.46, 2)} kg) gives the nitrogen in 69 kg of urea instead.`,
    workedSolution: `1. Each kg of urea contains 0.46 kg N.\n2. Urea needed = 69 ÷ 0.46 = ${urea4} kg/ha.\n3. Check: ${urea4} × 0.46 = 69 kg N.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A soya bean crop needs 45 kg of P₂O₅ per hectare from single superphosphate. Assume single superphosphate contains 18% P₂O₅. Calculate the mass of single superphosphate needed per hectare, in kg.",
    value: ssp5, unit: "kg/ha", tol: 0.5, wrong: [round(45 * 0.18, 2), 45 * 18],
    hints: ["Product = nutrient needed ÷ (percentage ÷ 100)."],
    explanation: `45 ÷ 0.18 = ${ssp5} kg/ha. Multiplying 45 by 0.18 gives the P₂O₅ in 45 kg of fertiliser instead.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Calculate the mass of nitrogen applied when 300 kg of Compound D (7:14:7) is spread on one hectare, in kg.",
    value: n6, unit: "kg", tol: 0, wrong: [42, 300 / 7],
    explanation: `N = 300 × 7 ÷ 100 = ${n6} kg. Using 14% (the phosphate figure) gives 42 kg.`,
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the straight fertiliser that supplies potassium and contains about 60% K₂O.",
    accepted: ["muriate of potash", "potassium chloride", "MOP", "KCl", "muriate of potash (potassium chloride)"],
    explanation: "**Muriate of potash** (potassium chloride).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Distinguish between basal dressing and top dressing of maize.",
    hints: ["Compare when, which nutrients and why."],
    points: [
      "Basal dressing is applied at or just before planting.",
      "It supplies mainly phosphorus and potassium (e.g. Compound D) for root and early growth.",
      "Top dressing is applied to the growing crop after emergence (often split).",
      "It supplies mainly nitrogen (e.g. ammonium nitrate), which is easily leached, when the crop needs it most.",
    ],
    modelAnswer: "Basal dressing is put on at planting and supplies mainly phosphorus and potassium, for example Compound D, which help root growth and move little in the soil. Top dressing is put on the growing maize after emergence, often in two splits, and supplies mainly nitrogen such as ammonium nitrate, because nitrogen leaches easily and is needed most during rapid leafy growth.",
    explanation: "Compare timing, nutrients and reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `Rudo plans to grow ${AREA} ha of maize near Marondera. Her fertiliser programme is shown below. Fertiliser is sold in 50 kg bags.\n\n${S_TABLE}`,
    hints: ["kg = rate × area; bags are rounded up.", "Nutrient = product × % ÷ 100."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the number of bags of Compound D she must buy. Round UP to whole bags.",
        value: basal.bags, unit: "bags", tol: 0, wrong: [Math.floor(basal.exactBags), 8],
        explanation: `400 × ${AREA} = ${basal.kg} kg; ${basal.kg} ÷ 50 = ${basal.exactBags}, so ${basal.bags} bags.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the number of bags of ammonium nitrate she must buy.",
        value: top.bags, unit: "bags", tol: 0, wrong: [5, top.kg],
        explanation: `250 × ${AREA} = ${top.kg} kg; ${top.kg} ÷ 50 = ${top.bags} bags.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the total mass of nitrogen applied per hectare from both fertilisers, in kg, to two decimal places.",
        value: nPerHa, unit: "kg/ha", tol: 0.005, wrong: [nutrientKg(250, 34.5), 400 * 0.07 + 250],
        explanation: `Compound D: 400 × 7 ÷ 100 = ${nutrientKg(400, 7)} kg; ammonium nitrate: 250 × 34.5 ÷ 100 = ${nutrientKg(250, 34.5)} kg; total ${nPerHa} kg N/ha.`,
      }),
      P.mcq({
        label: "(d)", stem: "Which method is best for applying the Compound D at planting?",
        options: [
          ["Banding or placement near, but not touching, the seed", "Correct: P and K move little, so they are placed near the roots."],
          ["Foliar spraying onto the young leaves after the crop has emerged", "Basal fertiliser is applied at planting, in the soil."],
          ["Broadcasting on the soil surface six weeks after planting", "That is too late for a basal dressing."],
          ["Mixing it with the seed in the planter box before sowing", "Contact with the seed can burn it."],
        ],
        answer: "A",
        explanation: "Basal fertiliser is banded or placed a few centimetres from the seed and covered.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why the ammonium nitrate is split into two applications.",
        points: ["Nitrate is soluble and easily leached by heavy rain.", "Smaller doses when the crop is growing fast mean more is taken up and less is lost / wasted."],
        explanation: "Split doses reduce leaching.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Describe **three** precautions Rudo should take when storing the fertiliser.",
        points: ["Keep it dry under a roof, on pallets off the floor (prevents caking).", "Keep it away from seed, food, feed and pesticides.", "Keep ammonium nitrate away from fuels, straw and flames (fire risk) / keep children and animals away."],
        explanation: "Dry, separate and away from fire.",
      }),
      P.manual({
        label: "(g)", marks: 1, stem: "State **one** sign on the maize that would show the top dressing was too little.",
        points: ["Yellowing of the older, lower leaves (V-shape along the midrib) / pale, stunted plants."],
        explanation: "Nitrogen deficiency sign.",
      }),
    ],
    explanation: "Bags = rate × area ÷ 50 (round up); nutrients = product × %; then method, timing and storage.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "Farai grows cabbages under drip irrigation in a garden near Mutare. His neighbour broadcasts all his fertiliser by hand over the whole garden before planting, and many weeds grow between the rows.",
    hints: ["Who uses the fertiliser when it is broadcast?"],
    parts: [
      P.short({
        label: "(a)", stem: "Name the method of applying fertiliser dissolved in the drip irrigation water.",
        accepted: ["fertigation"],
        explanation: "**Fertigation**.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain **three** advantages of Farai's method over the neighbour's.",
        points: ["Nutrients go straight to the root zone of the crop, not to weeds between rows.", "Small, frequent doses match the crop's needs, so less is leached / wasted.", "Saves labour / even distribution / no fertiliser burn from concentrated granules."],
        explanation: "Targeted, small, frequent doses.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State **two** disadvantages of broadcasting fertiliser for widely spaced row crops.",
        points: ["Much fertiliser falls between rows where it feeds weeds.", "More is needed / wasted / lost by leaching or runoff."],
        explanation: "Broadcasting suits closely spaced crops.",
      }),
    ],
    explanation: "Placement methods put nutrients where the crop's roots are.",
  });

  b.card("DEFINITION", "Straight fertiliser", "Supplies only one primary nutrient, e.g. ammonium nitrate (N), single superphosphate (P), muriate of potash (K).");
  b.card("DEFINITION", "Compound fertiliser", "Supplies two or more primary nutrients in a fixed ratio, e.g. Compound D (7:14:7).");
  b.card("FACT", "What does 7:14:7 mean?", "7% N, 14% P₂O₅ and 7% K₂O by mass (always in the order N:P:K).");
  b.card("FACT", "Nitrogen content of common straights (assume)", "Ammonium nitrate 34.5% N; urea 46% N; ammonium sulfate 21% N.");
  b.card("CONCEPT", "Basal vs top dressing", "Basal: at planting, mainly P and K, near the seed. Top: on the growing crop, mainly N, often split.");
  b.card("FORMULA", "Fertiliser needed", "kg = rate (kg/ha) × area (ha); bags = kg ÷ bag mass, rounded UP.");
  b.card("FORMULA", "Grams per station", "g per station = rate (kg/ha) × 1000 ÷ stations per hectare.");
  b.card("FORMULA", "Product for a nutrient target", "Product (kg) = nutrient needed (kg) ÷ (nutrient % ÷ 100).");
  b.card("CONCEPT", "Methods of application", "Broadcasting, banding, placement, side dressing, foliar feeding, fertigation.");
  b.card("FACT", "Storing fertiliser", "Dry, on pallets, away from seed, food and chemicals; ammonium nitrate away from fuels and flames.");
});
