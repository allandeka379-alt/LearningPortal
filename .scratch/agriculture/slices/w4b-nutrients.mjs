// Slice W4b: livestock nutrients.
import { concept, P, pct, round, check, table } from "../lib.mjs";

// Num: dry matter of lucerne, 400 g fresh -> 92 g dry.
const lucDm = pct(92, 400);
check(lucDm === 23, "lucDm");
// Num: dry matter eaten from 30 kg silage at 35% DM.
const silDm = round((30 * 35) / 100, 2);
check(silDm === 10.5, "silDm");
// Calc: protein eaten by a layer, 115 g feed at 16% CP.
const henCp = round((115 * 16) / 100, 2);
check(henCp === 18.4, "henCp");
// Struct 8: food test results.
const TESTS = table(
  ["Sample", "Iodine solution", "Benedict's solution (heated)", "Biuret reagent", "Ethanol emulsion"],
  [
    ["W", "blue-black", "blue (no change)", "blue (no change)", "clear"],
    ["X", "brown (no change)", "blue (no change)", "purple", "milky white"],
    ["Y", "brown (no change)", "brick-red", "blue (no change)", "clear"],
    ["Z", "brown (no change)", "blue (no change)", "purple", "clear"],
  ],
);
// Struct 6: goat water need: 24 goats x 4 L, tank 300 L.
const goatsL = 24 * 4;
const goatDays = round(300 / goatsL, 3);
check(goatsL === 96 && goatDays === 3.125, "goat water");

concept("agri.nutrition.nutrients", { file: "nutrition/nutrients", keyPrefix: "nutrition.nutrients" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which nutrient is needed mainly for growth and the repair of body tissues?",
    options: [
      ["Protein", "Correct: proteins build muscle and organs and repair tissues."],
      ["Carbohydrate", "Carbohydrates supply energy, not body-building material."],
      ["Water", "Water transports substances and cools the body; it does not build tissue."],
      ["Vitamin K", "Vitamin K is needed for blood clotting."],
    ],
    answer: "A",
    explanation: "Proteins (made of amino acids) build and repair tissues and are needed to produce milk, eggs and young.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Piglets reared on a concrete floor become pale and breathe rapidly. Which mineral is most likely lacking?",
    options: [
      ["Iron", "Correct: iron forms haemoglobin; shortage causes anaemia."],
      ["Iodine", "Iodine shortage causes goitre, a swollen neck."],
      ["Calcium", "Calcium shortage causes rickets or soft eggshells, not pale skin."],
      ["Sodium chloride (common salt)", "Salt shortage causes licking of soil and objects."],
    ],
    answer: "A",
    explanation: "Sow's milk is low in iron and piglets on concrete cannot pick it up from soil, so they become anaemic.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can cattle be fed simpler nitrogen sources than pigs to meet their protein needs?",
    options: [
      ["Rumen microbes build protein from them", "Correct: microbial protein is later digested by the cow."],
      ["Cattle need no protein in their diet at all", "All animals need protein for growth and production."],
      ["Cattle make amino acids from sunlight", "Sunlight is linked to vitamin D, not protein."],
      ["Pigs digest fibre better than cattle do", "Pigs digest fibre poorly; ruminants digest it well."],
    ],
    answer: "A",
    hints: ["Think about what lives in the rumen."],
    explanation: "Rumen microbes use simple nitrogen compounds to make their own protein, which the ruminant then digests.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which reagent is used to test a feed sample for starch?",
    options: [
      ["Iodine solution", "Correct: starch turns iodine blue-black."],
      ["Benedict's solution", "Benedict's tests for reducing sugars."],
      ["Biuret reagent", "Biuret tests for protein."],
      ["Ethanol followed by water", "The emulsion test is for fats and oils."],
    ],
    answer: "A",
    explanation: "Iodine turns from brown to blue-black when starch is present.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Cattle on a ranch are seen chewing old bones and pieces of wood. Which deficiency do these signs suggest?",
    options: [
      ["Phosphorus", "Correct: pica (depraved appetite) is the classic sign."],
      ["Vitamin A", "Vitamin A shortage shows as night blindness and watery eyes."],
      ["Iodine", "Iodine shortage shows as goitre."],
      ["Energy from carbohydrate", "Energy shortage causes loss of condition, not bone chewing."],
    ],
    answer: "A",
    hints: ["Bones are rich in which mineral besides calcium?"],
    explanation: "Chewing bones, wood or soil (pica) is a well-known sign of phosphorus deficiency in grazing cattle; a phosphate lick prevents it.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is vitamin D important for laying hens?",
    options: [
      ["It helps absorb calcium for eggshells", "Correct: without it shells are thin."],
      ["It is needed for blood to clot", "That is vitamin K."],
      ["It keeps the eyes able to see in dim light", "That is vitamin A."],
      ["It supplies most of the bird's energy", "Vitamins supply no energy."],
    ],
    answer: "A",
    hints: ["Which mineral do eggshells contain most of?"],
    explanation: "Vitamin D is needed to absorb calcium and phosphorus; shortage gives thin or soft shells and rickets in chicks.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A dairy herd's milk yield falls sharply during a hot week although feed is unchanged. The water trough is found to be dirty and often empty. What is the best explanation?",
    options: [
      ["Cows drinking too little eat and milk less", "Correct: milk is mostly water and intake falls with thirst."],
      ["Dirty water directly lowers the fat in milk", "Fat content is not the main effect of a water shortage."],
      ["Hot weather means cows need less water", "Animals need more water in hot weather."],
      ["Lack of water causes iron-deficiency anaemia in cows", "Anaemia comes from a lack of iron, not of water."],
    ],
    answer: "A",
    hints: ["What is milk mostly made of?", "What happens to feed intake when animals are thirsty?"],
    explanation: "Milk is mostly water and thirsty cows eat less, so a shortage of clean water quickly reduces yield, especially in heat.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are feeds compared on a dry-matter basis?",
    options: [
      ["Feeds contain very different amounts of water", "Correct: removing water makes comparison fair."],
      ["Animals digest only the dry part of their food", "Water is absorbed too; this is not the reason."],
      ["Dry feeds always contain more protein than fresh ones", "Not always true; the point is fair comparison."],
      ["Water contains energy that would distort results", "Water supplies no energy."],
    ],
    answer: "A",
    hints: ["Compare fresh grass with hay."],
    explanation: "Fresh grass may be over 75% water while hay is mostly dry matter, so nutrient contents are given per kg of dry matter.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "Fats and oils supply about twice as much energy per kilogram as carbohydrates.",
    answer: true,
    explanation: "True. Fats and oils supply about 2.25 times the energy of the same mass of carbohydrate.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each nutrient with a sign of its deficiency.",
    pairs: [
      ["Vitamin A", "Night blindness"],
      ["Iodine", "Goitre (swollen neck)"],
      ["Iron", "Anaemia with pale gums"],
      ["Calcium", "Thin, soft eggshells"],
      ["Vitamin K", "Bleeding that does not stop"],
    ],
    explanation: "Each deficiency sign links to the nutrient's function: vision, thyroid hormone, haemoglobin, shell formation, clotting.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence about the protein test.",
    template: "When biuret reagent is added to a feed containing protein, the colour changes from blue to {{blank:c}}.",
    blanks: [{ id: "c", accepted: ["purple", "violet", "lilac", "mauve", "purple or violet"] }],
    explanation: "A purple (violet) colour shows protein.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the condition in which young animals have soft, bent bones because of a shortage of calcium, phosphorus or vitamin D.",
    accepted: ["rickets", "rickets disease"],
    keywords: { any: ["rickets"] },
    explanation: "**Rickets**.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "Name the condition of dairy cows, usually soon after calving, caused by a low level of calcium in the blood.",
    accepted: ["milk fever", "hypocalcaemia", "hypocalcemia", "parturient paresis"],
    keywords: { any: ["milk fever", "hypocalc"] },
    hints: ["Milk production suddenly takes a lot of calcium out of the blood."],
    explanation: "**Milk fever** (hypocalcaemia): the cow is weak, wobbly and may lie down and be unable to rise.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A 400 g sample of fresh lucerne weighs 92 g after drying in an oven. Calculate its dry matter content, as a percentage.",
    value: lucDm, unit: "%", tol: 0, wrong: [100 - lucDm, round(400 / 92, 2)],
    explanation: `DM % = 92 ÷ 400 × 100 = ${lucDm}%. (${100 - lucDm}% is the moisture content, a common mix-up.)`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A steer eats 30 kg of maize silage a day. The silage contains 35% dry matter. Calculate the mass of dry matter eaten per day, in kg.",
    value: silDm, unit: "kg", tol: 0.05, answer: "10.5", wrong: [round(30 - 30 * 0.35, 2), round(30 / 0.35, 1)],
    hints: ["Dry matter = fresh mass × DM % ÷ 100."],
    explanation: `30 × 35 ÷ 100 = ${silDm} kg of dry matter. Subtracting gives the water (19.5 kg), not the dry matter.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A laying hen eats 115 g of layers' mash a day. The mash contains 16% crude protein. Calculate the mass of crude protein the hen eats per day, in grams, to one decimal place.",
    value: henCp, unit: "g", tol: 0.05, answer: "18.4", wrong: [round(115 / 16, 1), 16],
    hints: ["Protein = feed mass × CP % ÷ 100."],
    explanation: `Protein = 115 × 16 ÷ 100 = ${henCp} g per day.`,
    workedSolution: `1. Crude protein is 16 g in every 100 g of mash.\n2. Protein eaten = 115 × 16 ÷ 100 = ${henCp} g per day.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "State **four** functions of water in the body of a farm animal.",
    hints: ["Think of blood, digestion, temperature and products."],
    points: [
      "Transports nutrients, hormones and wastes (in blood and urine).",
      "Needed for digestion / fermentation in the rumen / as a solvent for chemical reactions.",
      "Controls body temperature (sweating, panting, evaporation).",
      "Forms most of the body and of milk and eggs / keeps cells and tissues turgid / lubricates joints.",
    ],
    modelAnswer: "Water carries nutrients and wastes in the blood and urine, is needed for digestion and rumen fermentation, cools the body by sweating and panting, and makes up most of the body and of milk and eggs.",
    explanation: "Transport, digestion, temperature control, body and product composition.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Explain why pigs and poultry need protein of better quality than cattle do.",
    hints: ["What can rumen microbes make that pigs cannot?"],
    points: [
      "Pigs and poultry are non-ruminants (simple stomachs) without rumen microbes.",
      "They must obtain essential amino acids (e.g. lysine, methionine) ready-made in their feed.",
      "Ruminants' microbes build protein from simple nitrogen compounds / poor-quality protein, which the animal then digests.",
    ],
    modelAnswer: "Pigs and poultry have simple stomachs with no rumen microbes, so they must get essential amino acids such as lysine directly from good-quality protein. In cattle, rumen microbes make protein from simple nitrogen sources, and the cow digests the microbes.",
    explanation: "Essential amino acids versus microbial protein.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `Tatenda tests four feed samples, W, X, Y and Z, at school. His results are shown.\n\n${TESTS}`,
    hints: ["Match each colour change with the nutrient the reagent detects."],
    parts: [
      P.short({
        label: "(a)", stem: "Which sample contains starch only? Give its letter.",
        accepted: ["W", "sample W"], normalise: ["trim", "lowercase", "strip_punctuation"],
        explanation: "Only W turns iodine blue-black and gives no other positive result.",
      }),
      P.short({
        label: "(b)", stem: "Which sample contains both protein and fat? Give its letter.",
        accepted: ["X", "sample X"], normalise: ["trim", "lowercase", "strip_punctuation"],
        explanation: "X is purple with biuret and milky in the emulsion test.",
      }),
      P.mcq({
        label: "(c)", stem: "Which feed is sample X most likely to be?",
        options: [
          ["Ground soya beans", "Correct: rich in both protein and oil."],
          ["Molasses", "Molasses is mainly sugar; it would resemble Y."],
          ["Maize meal", "Maize meal is mostly starch; it would resemble W."],
          ["Salt lick", "A salt lick contains no protein or fat."],
        ],
        answer: "A",
        explanation: "Soya beans are rich in protein and oil.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Describe how Tatenda carried out the Benedict's test on sample Y.",
        points: ["Mixed the ground sample with water and added an equal volume / a few drops of Benedict's solution.", "Heated it in a hot water bath for a few minutes (wearing eye protection) and watched for a colour change to brick-red."],
        explanation: "Add Benedict's, heat, observe.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Sample Z is a protein feed. Explain why young growing animals need more protein in their diet than mature animals kept for maintenance.",
        points: ["Protein is needed to build new tissues (muscle, organs).", "Young animals are growing fast, so they lay down a lot of new tissue each day.", "Mature animals on maintenance need protein only to repair and replace tissues, so their requirement is lower."],
        explanation: "Growth versus repair.",
      }),
    ],
    explanation: "Interpret food test results and link protein needs to growth.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "Nyasha keeps 24 goats near Hwange in the hot season. Assume each goat drinks about 4 L of water a day. The water is stored in a 300 L drum, and the goats have recently started licking soil around the pens.",
    hints: ["Total water = goats × litres per goat.", "What substance do animals seek when they lick soil?"],
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the volume of water the goats drink in one day, in litres.",
        value: goatsL, unit: "L", tol: 0, wrong: [24 + 4, 300 - 24],
        explanation: `24 × 4 = ${goatsL} L.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "How many **whole** days will a full drum last before it is empty?",
        value: Math.floor(goatDays), unit: "days", tol: 0, wrong: [Math.ceil(goatDays), round(goatsL / 300, 2)],
        explanation: `300 ÷ ${goatsL} = ${goatDays}, so the drum lasts 3 whole days; it must be refilled before the fourth day.`,
      }),
      P.short({
        label: "(c)", stem: "Name the mineral supplement Nyasha should provide to stop the soil licking.",
        accepted: ["salt", "salt lick", "common salt", "sodium chloride", "mineral lick", "salt block"],
        keywords: { any: ["salt", "lick", "sodium"] },
        explanation: "A **salt (mineral) lick**; soil licking often shows a craving for salt or other minerals.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why the goats must have clean water available at all times in the hot season.",
        points: ["Goats lose water by panting and evaporation and drink more in the heat; shortage leads to dehydration.", "Thirsty animals eat less, so growth and milk yield fall.", "Dirty water may carry disease organisms or worm larvae / animals drink less of foul water."],
        explanation: "Heat stress, intake and disease.",
      }),
    ],
    explanation: "Calculate water needs and link a deficiency sign to a supplement.",
  });

  b.card("DEFINITION", "Nutrient", "A substance in food that an animal uses for energy, growth, repair, production or regulating body processes.");
  b.card("CONCEPT", "Name the six classes of livestock nutrients.", "Carbohydrates, fats and oils, proteins, minerals, vitamins and water.");
  b.card("FACT", "Which nutrient deficiency causes pale gums and rapid breathing in piglets kept on concrete?", "Iron (iron-deficiency anaemia).", "Prevented by an iron injection or a clean sod of soil.");
  b.card("FACT", "What does pica (chewing bones and wood) in grazing cattle suggest?", "Phosphorus deficiency.");
  b.card("FACT", "What are the signs of vitamin A deficiency?", "Night blindness, watery eyes, poor growth and poor fertility.");
  b.card("FORMULA", "Dry matter percentage", "DM % = dry mass ÷ fresh mass × 100; moisture % = 100 − DM %.");
  b.card("FACT", "Food tests: reagent and positive result for starch, reducing sugar, protein and fat.", "Iodine → blue-black; Benedict's (heated) → brick-red; biuret → purple; ethanol emulsion → milky white.");
  b.card("CONCEPT", "Why can ruminants use poorer-quality protein than pigs?", "Rumen microbes build protein from simple nitrogen compounds; the animal digests the microbes.");
  b.card("FACT", "What is milk fever?", "Low blood calcium in a dairy cow, usually soon after calving; she becomes weak and may be unable to rise.");
});
