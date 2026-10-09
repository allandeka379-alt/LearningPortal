// Slice W4b: feedstuffs, roughages and concentrates, hay and silage.
import { concept, P, round, check, table } from "../lib.mjs";

// Num: cost per kg protein of cottonseed cake (assume US$0.42/kg, 35% CP).
const cotCp = round(0.42 / 0.35, 2);
check(cotCp === 1.2, "cotCp");
// Calc: silage bunker 15 x 5 x 2.4 m at 600 kg/m3; 30 cows x 30 kg/day.
const bunkVol = round(15 * 5 * 2.4, 3);
const bunkKg = round(bunkVol * 600, 3);
const bunkDays = round(bunkKg / (30 * 30), 3);
check(bunkVol === 180 && bunkKg === 108000 && bunkDays === 120, "bunker");
// Num: hay bales: 3 ha x 4 t/ha in 20 kg bales.
const bales = (3 * 4 * 1000) / 20;
check(bales === 600, "bales");
// Struct 8: compare three feeds by cost per kg of crude protein (assumed prices).
const FEEDS = [["Groundnut cake", 45, 0.72], ["Cottonseed cake", 35, 0.49], ["Maize grain", 9, 0.27]];
const perCp = FEEDS.map(([, cp, p]) => round(p / (cp / 100), 2));
check(perCp[0] === 1.6 && perCp[1] === 1.4 && perCp[2] === 3, "perCp");
const FEED_TABLE = table(["Feed", "Crude protein (%)", "Price (US\\$ per kg, assume)"], FEEDS.map(([n, cp, p]) => [n, cp, p.toFixed(2)]));

concept("agri.nutrition.feedstuffs", { file: "nutrition/feedstuffs", keyPrefix: "nutrition.feedstuffs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which feedstuff is a roughage?",
    options: [
      ["Maize stover", "Correct: bulky, high in fibre."],
      ["Fishmeal", "A protein concentrate."],
      ["Maize grain", "An energy concentrate."],
      ["Soya bean cake", "A protein concentrate."],
    ],
    answer: "A",
    explanation: "Stover (dry maize stalks and leaves left after harvest) is a dry roughage: bulky and fibrous.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which feedstuff is a protein concentrate?",
    options: [
      ["Sunflower cake", "Correct: a by-product of oil extraction, high in protein."],
      ["Molasses", "Molasses is mainly sugar: an energy concentrate."],
      ["Wheat bran", "Bran is classed with the energy concentrates."],
      ["Veld hay from mixed grasses", "Hay is a roughage."],
    ],
    answer: "A",
    explanation: "Oilseed cakes (soya, sunflower, cotton, groundnut) are protein concentrates.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are broilers fed mainly on concentrates rather than roughages?",
    options: [
      ["They digest fibre poorly", "Correct: non-ruminants lack rumen microbes."],
      ["Roughages contain no energy at all", "Roughages contain energy, but bound in fibre."],
      ["Concentrates are always cheaper", "Concentrates are usually dearer per kg."],
      ["Broilers cannot eat any plant material whatsoever", "Most broiler feed is plant material (grain and cake)."],
    ],
    answer: "A",
    explanation: "Poultry have simple stomachs and grow fast, so they need low-fibre, nutrient-dense concentrates.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "At about which growth stage should grass be cut for good hay?",
    options: [
      ["Early flowering", "Correct: a balance of bulk and quality."],
      ["When seeds have fully ripened and dropped", "The grass is then stemmy and low in protein."],
      ["Two weeks after it starts to grow", "Too little bulk."],
      ["After the first frost has dried it", "Frosted grass has lost quality."],
    ],
    answer: "A",
    explanation: "At early flowering yield is reasonable and leaves are still plentiful and rich in protein.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why must silage be compacted and sealed?",
    options: [
      ["To keep air out for lactic fermentation", "Correct: anaerobic conditions are essential."],
      ["To dry the crop quickly", "Silage is preserved moist, not dried."],
      ["To let rain water in to keep it moist", "Water must be kept out."],
      ["To speed up rotting by aerobic bacteria", "Aerobic rotting is what sealing prevents."],
    ],
    answer: "A",
    hints: ["Which bacteria make silage, and do they need oxygen?"],
    explanation: "Lactic acid bacteria work without air and lower the pH to about 4; air allows moulds and rotting.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Cottonseed cake is used mainly for cattle rather than for pigs. Why?",
    options: [
      ["It contains gossypol, harmful to pigs", "Correct: ruminants tolerate it better."],
      ["It has too little protein for pigs", "It is a protein concentrate."],
      ["Pigs cannot digest any kind of oilseed cake at all", "Pigs are fed soya cake routinely."],
      ["It is classed as a roughage", "It is a concentrate."],
    ],
    answer: "A",
    hints: ["Think of a natural substance in cotton seed."],
    explanation: "Cottonseed cake contains gossypol, which is harmful to pigs and poultry in large amounts.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A farmer with a tractor and a field of maize lives in an area of frequent cloudy, damp weather in late summer. Which way of conserving fodder suits him best?",
    options: [
      ["Silage from the whole maize crop", "Correct: does not depend on sunny drying weather."],
      ["Hay from the maize leaves", "Hay needs dry, sunny days."],
      ["Leaving the maize standing to dry in the field", "This gives low-quality stover."],
      ["Burning off old grass so that it regrows", "This conserves no feed."],
    ],
    answer: "A",
    hints: ["Which method needs drying weather?"],
    explanation: "Silage is preserved by fermentation, so cloudy weather does not stop it, and he has the crop and machinery.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a **compound** feed?",
    options: [
      ["Pig grower meal", "Correct: a balanced mixture of ingredients."],
      ["Maize meal", "A single ingredient: a straight feed."],
      ["Soya bean cake", "A single ingredient."],
      ["Lucerne hay", "A single roughage."],
    ],
    answer: "A",
    hints: ["Compound means made of several ingredients."],
    explanation: "Compound feeds are ready-mixed and balanced for a class and stage of animal.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Good silage is black, slimy and smells bad.",
    answer: false,
    explanation: "False. Good silage is yellow-green or olive, moist and smells pleasantly sharp; black, slimy silage has spoiled.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each feedstuff with its class.",
    pairs: [
      ["Fishmeal", "Animal protein concentrate"],
      ["Sorghum grain", "Energy concentrate"],
      ["Maize silage", "Succulent roughage"],
      ["Groundnut haulms", "Dry roughage"],
      ["Salt lick", "Mineral supplement"],
    ],
    explanation: "Classify by fibre, water and the main nutrient supplied.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence about silage.",
    template: "In silage, bacteria change sugars into {{blank:a}} acid, which lowers the pH and preserves the crop.",
    blanks: [{ id: "a", accepted: ["lactic"] }],
    explanation: "**Lactic** acid preserves silage.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the process that preserves silage when air is kept out.",
    accepted: ["fermentation", "anaerobic fermentation", "lactic acid fermentation", "lactic fermentation", "ensiling"],
    keywords: { any: ["ferment", "ensil"] },
    explanation: "**Anaerobic (lactic acid) fermentation**.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A farmer cuts 3 ha of grass that yields 4 t of hay per hectare. How many 20 kg bales are made?",
    value: bales, tol: 0, wrong: [(3 * 4) / 20, 4 * 1000 / 20],
    explanation: `3 × 4 = 12 t = 12,000 kg; 12,000 ÷ 20 = ${bales} bales. Forgetting to convert tonnes to kg gives 0.6.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Assume cottonseed cake costs US\\$0.42 per kg and contains 35% crude protein. Calculate the cost of 1 kg of crude protein from this cake.",
    value: cotCp, prefix: "US$", answer: "1.20", wrong: [round(0.42 * 0.35, 2), round(0.35 / 0.42, 2)],
    hints: ["Divide the price by the fraction of protein."],
    explanation: `0.42 ÷ 0.35 = US\\$${cotCp.toFixed(2)} per kg of protein.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "A silage bunker is 15 m long, 5 m wide and filled to 2.4 m deep. Assume packed silage weighs 600 kg per m³ and that 30 dairy cows each eat 30 kg a day. For how many days will the silage last?",
    value: bunkDays, unit: "days", tol: 0, wrong: [round(bunkVol / 30, 1), round(bunkKg / 30, 0)],
    hints: ["Volume = length × width × depth.", "Mass = volume × density; days = mass ÷ daily use."],
    explanation: `Volume = 15 × 5 × 2.4 = ${bunkVol} m³; mass = ${bunkVol} × 600 = ${bunkKg.toLocaleString("en-GB")} kg; daily use = 30 × 30 = 900 kg; days = ${bunkKg.toLocaleString("en-GB")} ÷ 900 = ${bunkDays}.`,
    workedSolution: `1. Volume = 15 × 5 × 2.4 = ${bunkVol} m³.\n2. Mass = ${bunkVol} × 600 = ${bunkKg.toLocaleString("en-GB")} kg.\n3. Daily use = 30 cows × 30 kg = 900 kg.\n4. Days = ${bunkKg.toLocaleString("en-GB")} ÷ 900 = ${bunkDays} days.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** steps in making good-quality hay from a grass crop.",
    hints: ["From cutting to storage."],
    points: [
      "Cut at early flowering, in a spell of dry weather.",
      "Leave in rows and turn so that it dries quickly and evenly.",
      "Bale or stack when dry enough (stems snap; about 15-20% moisture).",
      "Store under a roof or covered, off the ground, away from buildings (damp hay can heat and catch fire).",
    ],
    modelAnswer: "Cut the grass at early flowering in dry weather, spread it in rows and turn it so it dries evenly, bale it when the stems snap, and store the bales under a roof, raised off the ground and away from other buildings.",
    explanation: "Cut, dry, bale, store.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Explain why legume hay such as lucerne can replace part of the protein concentrate fed to dairy cows.",
    hints: ["Compare legume hay with grass hay."],
    points: [
      "Legume hay contains much more protein (and calcium) than grass hay.",
      "Cows can eat it in quantity as part of their roughage.",
      "So less (expensive) protein concentrate is needed to meet the cow's protein requirement / it lowers feed cost.",
    ],
    modelAnswer: "Lucerne hay is far richer in protein and calcium than grass hay, and cows eat it readily as roughage, so it supplies part of their protein need and the farmer can buy less expensive protein concentrate.",
    explanation: "Protein-rich roughage.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Rudo compares three feeds for her dairy herd near Mutare.\n\n${FEED_TABLE}`,
    hints: ["Cost per kg of protein = price ÷ (CP % ÷ 100)."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the energy concentrate in the table.",
        accepted: ["maize grain", "maize", "maize meal"],
        keywords: { any: ["maize"] },
        explanation: "**Maize grain** (9% CP, mainly starch).",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the cost of 1 kg of crude protein from groundnut cake.",
        value: perCp[0], prefix: "US$", answer: "1.60", wrong: [round(0.72 * 0.45, 2), 0.72],
        explanation: `0.72 ÷ 0.45 = US\\$${perCp[0].toFixed(2)}.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the cost of 1 kg of crude protein from cottonseed cake.",
        value: perCp[1], prefix: "US$", answer: "1.40", wrong: [round(0.49 * 0.35, 2), 0.49],
        explanation: `0.49 ÷ 0.35 = US\\$${perCp[1].toFixed(2)}.`,
      }),
      P.mcq({
        label: "(d)", stem: "Which feed gives Rudo the cheapest protein?",
        options: [
          ["Cottonseed cake", "Correct: US\\$1.40 per kg of protein."],
          ["Groundnut cake", "US\\$1.60 per kg of protein."],
          ["Maize grain", "US\\$3.00 per kg of protein: dear as a protein source."],
          ["All three cost the same per kg of protein", "The costs differ."],
        ],
        answer: "A",
        explanation: "Cottonseed cake is cheapest per kg of protein, and it suits cattle.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why the cheapest feed per kilogram is not necessarily the cheapest source of protein.",
        points: ["Feeds differ in protein content.", "A cheap feed with little protein (such as maize) must be fed in large amounts to supply the same protein, so its cost per kg of protein is high."],
        explanation: "Compare on cost per unit of nutrient.",
      }),
    ],
    explanation: "Classify feeds and compare protein sources by cost per kilogram of crude protein.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "Tendai opens his maize silage pit in August. Near the top and at one corner where the plastic sheet was torn, the silage is black, slimy and mouldy; deeper down it is olive-green, moist and smells pleasantly sharp.",
    hints: ["What got into the pit at the torn corner?"],
    parts: [
      P.mcq({
        label: "(a)", stem: "What is the most likely cause of the spoiled silage?",
        options: [
          ["Air and rain entered through the torn sheet", "Correct: oxygen allows moulds and rotting."],
          ["The maize was cut at the dough stage", "That is the correct stage."],
          ["Too much lactic acid was produced there", "Lactic acid preserves silage."],
          ["The silage at the bottom was overcompacted", "The spoilage is at the top and the torn corner."],
        ],
        answer: "A",
        explanation: "Spoilage where the seal failed shows that air and water got in.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "State **two** features of the good silage deeper in the pit.",
        points: ["Olive or yellow-green colour.", "Moist / pleasant sharp (acidic) smell / no mould."],
        explanation: "Colour, smell, texture.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest **three** ways Tendai can make better silage next season.",
        points: ["Chop the maize finely and fill the pit quickly in layers.", "Compact each layer well to squeeze out air.", "Seal at once with strong, unholed plastic weighted with soil or tyres, and check and repair the sheet."],
        explanation: "Exclude air.",
      }),
    ],
    explanation: "Diagnose spoiled silage and suggest improvements.",
  });

  b.card("DEFINITION", "Roughage", "A bulky, high-fibre feedstuff such as grazing, hay, silage or stover.");
  b.card("DEFINITION", "Concentrate", "A low-fibre feedstuff rich in energy or protein, fed in small amounts (grains, oilseed cakes, fishmeal).");
  b.card("FACT", "What is the dividing line between energy and protein concentrates?", "About 20% crude protein: protein concentrates contain more than this.");
  b.card("CONCEPT", "Straight feed or compound feed?", "Straight: one ingredient (maize meal). Compound: a balanced mixture for one class of animal (broiler starter, dairy meal).");
  b.card("FACT", "When should grass be cut for hay?", "At about early flowering, in dry weather.");
  b.card("CONCEPT", "How is silage preserved?", "Lactic acid bacteria ferment sugars without air, lowering the pH to about 4.");
  b.card("FACT", "Why is cottonseed cake fed mainly to ruminants?", "It contains gossypol, harmful to pigs and poultry in large amounts.");
  b.card("FORMULA", "Cost per kg of protein", "Price per kg of feed ÷ (crude protein % ÷ 100).");
  b.card("CONCEPT", "Hay versus silage", "Hay is dried and needs sunny weather; silage is fermented without air and can be made in damper weather.");
});
