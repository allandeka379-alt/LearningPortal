// Slice W4b: rations, Pearson square, feed conversion.
import { concept, P, pearsonSquare, fcr, round, check, table } from "../lib.mjs";

// Num: 18% from sunflower cake 34% and maize 10%, 600 kg.
const PS1 = pearsonSquare({ target: 18, high: { cp: 34 }, low: { cp: 10 }, totalKg: 600 });
check(PS1.kgHigh === 200 && PS1.kgLow === 400, "PS1");
// Calc: 20% from fishmeal 60% and maize 10%, 250 kg.
const PS2 = pearsonSquare({ target: 20, high: { cp: 60 }, low: { cp: 10 }, totalKg: 250 });
check(PS2.kgHigh === 50 && PS2.pctHigh === 20, "PS2");
// Num: rabbit FCR.
const rabF = round(fcr({ feedKg: 5.6, gainKg: 2.4 - 0.8 }), 3);
check(rabF === 3.5, "rabF");
// Num: weaner feed bags: 35 x 1.6 kg x 14 days, 50 kg bags.
const wKg = round(35 * 1.6 * 14, 3);
const wBags = Math.ceil(wKg / 50 - 1e-9);
check(wKg === 784 && wBags === 16, "wBags");
// Num: production ration 0.4 kg per L x 18 L.
const prodMeal = round(18 * 0.4, 3);
check(prodMeal === 7.2, "prodMeal");
// Struct 8: layers 17% from soya 47% and maize 9% -> 8:30, 380 kg.
const PS3 = pearsonSquare({ target: 17, high: { cp: 47 }, low: { cp: 9 }, totalKg: 380 });
check(PS3.partsHigh === 8 && PS3.partsLow === 30 && PS3.kgHigh === 80 && PS3.kgLow === 300, "PS3");
// Struct 6: FCR of two batches of rabbits/pigs.
const BATCH = [["Pen 1", 25, 82, 165], ["Pen 2", 25, 79, 216]];
const f1 = round(fcr({ feedKg: BATCH[0][3], gainKg: BATCH[0][2] - BATCH[0][1] }), 4);
const f2 = round(fcr({ feedKg: BATCH[1][3], gainKg: BATCH[1][2] - BATCH[1][1] }), 4);
check(Math.abs(f1 - 165 / 57) < 1e-3 && f2 === 4, "fcr pens");
const BATCH_TABLE = table(["Pen (one pig)", "Start mass (kg)", "End mass (kg)", "Feed eaten (kg)"], BATCH.map((r) => r));

concept("agri.nutrition.rations", { file: "nutrition/rations", keyPrefix: "nutrition.rations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a ration?",
    options: [
      ["The feed given to an animal in 24 hours", "Correct."],
      ["The feed given to a whole herd in a season", "A ration is per animal per day."],
      ["One ingredient of a mixed feed", "That is a feedstuff."],
      ["The amount of water an animal drinks daily", "Water is separate from the ration."],
    ],
    answer: "A",
    explanation: "A ration is the total feed one animal receives in 24 hours.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which animal needs a production ration as well as a maintenance ration?",
    options: [
      ["A cow in milk", "Correct: milk production needs extra feed."],
      ["A mature dry ox resting in winter", "Only maintenance is needed."],
      ["A dry, non-pregnant ewe", "Only maintenance is needed."],
      ["A mature boar not in service", "Only maintenance is needed."],
    ],
    answer: "A",
    explanation: "A production ration supports milk, growth, eggs, work or pregnancy, on top of maintenance.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Laying hens need more of which mineral than other poultry?",
    options: [
      ["Calcium", "Correct: eggshells are mostly calcium carbonate."],
      ["Iron", "Iron is for haemoglobin; layers need no extra."],
      ["Iodine", "Not specially needed for laying."],
      ["Sodium", "Too much salt causes wet droppings."],
    ],
    answer: "A",
    explanation: "Layers receive limestone grit or a high-calcium layers' mash for strong eggshells.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a Pearson square the target is 15% CP, the high-protein feed is 40% CP and the low-protein feed is 8% CP. How many parts of the high-protein feed are used?",
    options: [
      ["7 parts", "Correct: 15 − 8 = 7."],
      ["25 parts", "40 − 15 = 25 are the parts of the low-protein feed."],
      ["32 parts", "32 is the total number of parts."],
      ["15 parts", "15 is the target, not a number of parts."],
    ],
    answer: "A",
    hints: ["Subtract diagonally: the number opposite the feed."],
    explanation: "Parts of high-protein feed = target − low CP = 15 − 8 = 7; parts of low feed = 40 − 15 = 25.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why can a 50% CP ration **not** be made by mixing maize (9% CP) and soya bean cake (44% CP)?",
    options: [
      ["50% lies outside the two feeds' CP values", "Correct: any mix lies between 9% and 44%."],
      ["The square only works for pig rations", "It works for any animal."],
      ["Maize has too much fibre", "Fibre is not the reason."],
      ["Soya cake cannot be mixed with maize", "They are mixed routinely."],
    ],
    answer: "A",
    hints: ["What is the highest CP possible using only soya cake?"],
    explanation: "A mixture's CP always lies between those of its ingredients; even pure soya cake is only 44%.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Batch P of broilers has an FCR of 1.7 and batch Q an FCR of 2.1. What does this show?",
    options: [
      ["Batch P used feed more efficiently", "Correct: less feed per kg of gain."],
      ["Batch Q grew faster per kg of feed", "Q needed more feed for each kg of gain."],
      ["Batch P ate more feed than batch Q", "FCR is a ratio; it does not give total feed."],
      ["The two batches were equally efficient", "1.7 and 2.1 differ."],
    ],
    answer: "A",
    hints: ["FCR = feed ÷ gain."],
    explanation: "A lower FCR means fewer kg of feed for each kg of gain.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A farmer suddenly changes his steers from grazing to a ration that is mostly maize grain. What is the main risk?",
    options: [
      ["Digestive upsets such as bloat or acidosis", "Correct: rumen microbes need time to adjust."],
      ["The steers will at once need extra iron", "Grain does not create an iron need."],
      ["The steers will stop drinking water", "Not the main risk."],
      ["Their feed conversion ratio will become zero", "FCR cannot be zero."],
    ],
    hints: ["Rumen microbes adapt slowly."],
    answer: "A",
    explanation: "Sudden changes, especially to a lot of grain, upset rumen fermentation; change feeds gradually over several days.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which practice reduces feed waste in a pig pen?",
    options: [
      ["Filling feeders only partly", "Correct: less is pushed out and spilled."],
      ["Feeding at different times each day", "Irregular feeding makes pigs restless."],
      ["Leaving mouldy feed in the trough", "Mouldy feed can poison animals."],
      ["Keeping the water trough empty", "Water must always be available."],
    ],
    answer: "A",
    explanation: "Partly filled feeders at the right height reduce spillage, and spilled feed raises the FCR.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A lower feed conversion ratio means an animal is using its feed more efficiently.",
    answer: true,
    explanation: "True. FCR = feed ÷ gain, so a lower figure means less feed for each kilogram of gain.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each animal with the main feature its ration needs.",
    pairs: [
      ["Day-old chick", "High protein, easily digested starter"],
      ["Laying hen", "Extra calcium for eggshells"],
      ["Working ox on a ploughing day", "Extra energy"],
      ["Cow in late pregnancy", "Extra feed for the growing foetus"],
      ["Dry mature ewe", "Maintenance ration only"],
    ],
    explanation: "Rations are matched to age and stage of production.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the formula.",
    template: "Feed conversion ratio = mass of {{blank:a}} eaten ÷ gain in live {{blank:b}}",
    blanks: [{ id: "a", accepted: ["feed", "food"] }, { id: "b", accepted: ["mass", "weight"] }],
    explanation: "FCR = feed eaten ÷ gain in live mass.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the method used to work out the proportions of two feeds needed to give a mixture with a target crude protein percentage.",
    accepted: ["Pearson square", "the Pearson square", "Pearson's square", "Pearson square method"],
    keywords: { any: ["pearson"] },
    explanation: "The **Pearson square**.",
  });
  b.num({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "A farmer mixes sunflower cake (34% CP) and maize meal (10% CP) to make 600 kg of an 18% CP ration. Use the Pearson square to calculate the mass of sunflower cake needed, in kg.",
    value: PS1.kgHigh, unit: "kg", tol: 0, wrong: [PS1.kgLow, round((600 * 16) / 34, 1)],
    hints: ["Parts sunflower = 18 − 10; parts maize = 34 − 18."],
    explanation: `Sunflower 18 − 10 = 8 parts; maize 34 − 18 = 16 parts; total 24. Sunflower = 8 ÷ 24 × 600 = ${PS1.kgHigh} kg (maize ${PS1.kgLow} kg). Reading across gives ${PS1.kgLow} kg, the maize figure.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "Fishmeal (60% CP) and maize meal (10% CP) are mixed to give 250 kg of a 20% CP poultry ration. Use the Pearson square to calculate the mass of fishmeal needed, in kg.",
    value: PS2.kgHigh, unit: "kg", tol: 0, wrong: [PS2.kgLow, round((250 * 40) / 50, 0)],
    hints: ["Fishmeal parts = 20 − 10.", "Total parts = (20 − 10) + (60 − 20)."],
    explanation: `Fishmeal 20 − 10 = 10 parts; maize 60 − 20 = 40 parts; total 50; fishmeal = 10 ÷ 50 × 250 = ${PS2.kgHigh} kg.`,
    workedSolution: `1. Parts of fishmeal = 20 − 10 = 10.\n2. Parts of maize meal = 60 − 20 = 40.\n3. Total parts = 50, so fishmeal is 10 ÷ 50 = ${PS2.pctHigh}% of the mix.\n4. Fishmeal = 0.20 × 250 = ${PS2.kgHigh} kg (maize meal ${PS2.kgLow} kg).\n5. Check: (50 × 60 + 200 × 10) ÷ 250 = 20%.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A rabbit grows from 0.8 kg to 2.4 kg and eats 5.6 kg of pellets. Calculate its feed conversion ratio.",
    value: rabF, tol: 0.05, answer: "3.5", wrong: [round(5.6 / 2.4, 2), round(1.6 / 5.6, 2)],
    explanation: `Gain = 2.4 − 0.8 = 1.6 kg; FCR = 5.6 ÷ 1.6 = ${rabF}. Dividing by the final mass instead of the gain is a common error.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "35 weaner pigs each eat 1.6 kg of meal a day. How many 50 kg bags must be bought for 14 days? Round UP to whole bags.",
    value: wBags, unit: "bags", tol: 0, wrong: [Math.floor(wKg / 50), round(wKg / 50, 2)],
    hints: ["Total = pigs × kg per day × days."],
    explanation: `35 × 1.6 × 14 = ${wKg} kg; ${wKg} ÷ 50 = ${round(wKg / 50, 2)}, so buy ${wBags} bags (15 would run out).`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Assume a farm gives each cow 0.4 kg of dairy meal for every litre of milk she produces, on top of her grazing. Calculate the dairy meal for a cow producing 18 L a day, in kg.",
    value: prodMeal, unit: "kg", tol: 0.05, answer: "7.2", wrong: [round(18 / 0.4, 1), 18.4],
    explanation: `18 × 0.4 = ${prodMeal} kg of dairy meal (the production ration).`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Distinguish between a maintenance ration and a production ration, giving an example of an animal that needs each.",
    hints: ["What does each ration pay for?"],
    points: [
      "Maintenance ration keeps the animal alive and healthy at constant body weight / covers basic body functions.",
      "Example: a mature dry cow, resting ox or non-breeding adult.",
      "Production ration is extra feed above maintenance for growth, milk, eggs, work, fattening or pregnancy.",
      "Example: a lactating cow, laying hen, growing pig or working ox.",
    ],
    modelAnswer: "A maintenance ration only keeps an animal alive and at constant weight, as for a mature dry cow. A production ration is extra feed on top of maintenance to support production such as milk, eggs, growth or work, as for a cow in milk or a laying hen.",
    explanation: "Purpose and examples.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Suggest **three** reasons why a batch of pigs might have a high (poor) feed conversion ratio.",
    hints: ["Think of waste, health and environment."],
    points: [
      "Feed is wasted or spilled from badly set feeders / eaten by rats.",
      "Pigs are sick or carry worms, so nutrients are lost or used to fight disease.",
      "Poor housing (too cold or too hot), a shortage of water, an unbalanced ration or pigs kept too long / too heavy.",
    ],
    modelAnswer: "Feed may be spilled or eaten by rats and still counted as eaten; worms or disease waste nutrients; and cold or hot housing, little water or an unbalanced ration make pigs grow slowly for the feed they eat.",
    explanation: "Waste, health, environment and ration.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8, calculator: true,
    stem: "Chipo mixes her own layers' ration from soya bean cake (47% CP) and maize meal (9% CP). She wants 380 kg of a 17% CP mixture. She keeps 120 layers, each eating about 120 g of feed a day.",
    hints: ["Subtract diagonally in the square.", "Days = total feed ÷ daily feed."],
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the parts of soya bean cake in the Pearson square.",
        value: PS3.partsHigh, tol: 0, wrong: [PS3.partsLow, 17],
        explanation: `17 − 9 = ${PS3.partsHigh} parts of soya cake.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the mass of maize meal in the 380 kg mixture, in kg.",
        value: PS3.kgLow, unit: "kg", tol: 0, wrong: [PS3.kgHigh, PS3.partsLow],
        explanation: `Maize 47 − 17 = 30 parts; total 38; maize = 30 ÷ 38 × 380 = ${PS3.kgLow} kg (soya ${PS3.kgHigh} kg).`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "For how many whole days will the 380 kg feed the flock?",
        value: Math.floor(380 / (120 * 0.12) + 1e-9), unit: "days", tol: 0, wrong: [Math.ceil(380 / (120 * 0.12)), round(380 / 120, 1)],
        explanation: `Daily feed = 120 × 0.12 = 14.4 kg; 380 ÷ 14.4 = ${round(380 / 14.4, 2)}, so 26 whole days.`,
      }),
      P.short({
        label: "(d)", stem: "Name **one** feed Chipo should add in small amounts so that the hens lay eggs with strong shells.",
        accepted: ["limestone", "limestone grit", "oyster shell", "shell grit", "calcium", "bone meal", "limestone flour", "calcium carbonate", "grit"],
        keywords: { any: ["limestone", "shell", "calcium", "bone", "grit"] },
        explanation: "**Limestone grit** (or crushed shell) supplies calcium.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why the hens need a ration with more protein than a dry, mature cow needs.",
        points: ["Eggs contain a lot of protein, produced almost daily.", "Hens are non-ruminants and cannot use simple nitrogen through rumen microbes, so they need good-quality protein in the feed."],
        explanation: "Production and digestion.",
      }),
    ],
    explanation: "Mix a layers' ration with the Pearson square and plan feed for a flock.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, calculator: true,
    stem: `Two grower pigs at a school farm near Gweru were fed the same ration for six weeks.\n\n${BATCH_TABLE}`,
    hints: ["Gain = end − start.", "FCR = feed ÷ gain."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the feed conversion ratio of the pig in Pen 1, to one decimal place.",
        value: round(f1, 1), tol: 0.05, answer: "2.9", wrong: [round(165 / 82, 1), round(57 / 165, 2)],
        explanation: `Gain = 82 − 25 = 57 kg; FCR = 165 ÷ 57 = ${round(f1, 2)}, about 2.9.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the feed conversion ratio of the pig in Pen 2.",
        value: f2, tol: 0.05, answer: "4", wrong: [round(216 / 79, 1)],
        explanation: `Gain = 79 − 25 = 54 kg; FCR = 216 ÷ 54 = ${f2}.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "The pig in Pen 2 was found to have worms and its feeder was spilling meal. Explain how each problem raised its feed conversion ratio, and suggest one remedy for each.",
        points: ["Worms take nutrients / damage the gut, so less of the feed eaten becomes gain.", "Spilled meal is counted as eaten but not eaten, so the feed figure rises without extra gain.", "Remedies: deworm the pig (and keep pens clean); adjust/repair the feeder or fill it only partly."],
        explanation: "Lost nutrients and wasted feed.",
      }),
    ],
    explanation: "Calculate and interpret feed conversion ratios.",
  });

  b.card("DEFINITION", "Ration", "The total feed given to one animal in 24 hours.");
  b.card("DEFINITION", "Balanced ration", "A ration that supplies all nutrients in the right proportions and amounts for the animal's age and production.");
  b.card("DEFINITION", "Maintenance ration", "Feed that keeps an animal alive and healthy at constant body weight, with no production.");
  b.card("DEFINITION", "Production ration", "Feed given on top of maintenance for growth, milk, eggs, work or pregnancy.");
  b.card("FORMULA", "Pearson square: parts of each feed", "Parts of high-CP feed = target − low CP; parts of low-CP feed = high CP − target (subtract diagonally).");
  b.card("FACT", "Rule for the Pearson square target", "The target CP must lie between the CP values of the two feeds.");
  b.card("FORMULA", "Feed conversion ratio", "FCR = feed eaten (kg) ÷ gain in live mass (kg); lower is better.");
  b.card("CONCEPT", "Why change rations gradually?", "Rumen microbes and the gut need time to adjust; sudden changes cause digestive upsets such as bloat.");
  b.card("FORMULA", "Feed to buy", "Animals × feed per animal per day × days; divide by bag mass and round UP.");
});
