// Slice W4a: goat and sheep production.
import { concept, P, pct, dailyGain, mortalityPct, round, check, table } from "../lib.mjs";

// Num: lambing percentage.
const lambPct = pct(39, 30);
check(lambPct === 130, "lamb");
// Num: ADG of a lamb.
const adgL = dailyGain({ startKg: 4, endKg: 28, days: 150 });
check(Math.abs(adgL - 0.16) < 1e-9, "adgL");
// Struct: flock records over two seasons (before and after flushing).
const FLOCK = [["Season 1 (no flushing)", 50, 44, 55, 46], ["Season 2 (flushed)", 50, 46, 74, 64]];
const kp = FLOCK.map(([, m, , born]) => pct(born, m));
const wp = FLOCK.map(([, m, , , w]) => pct(w, m));
const loss2 = mortalityPct({ died: 74 - 64, started: 74 });
check(kp[0] === 110 && kp[1] === 148 && wp[1] === 128 && Math.abs(loss2 - 13.5135) < 1e-3, "flock");
const FLOCK_TABLE = table(["Season", "Does mated", "Does that kidded", "Kids born", "Kids weaned"], FLOCK.map((r) => r));
// Struct: wireworm and dosing.
const EYES = [["Red", 22], ["Pink", 15], ["Pale pink", 8], ["White", 5]];
const goatsChecked = EYES.reduce((s, [, n]) => s + n, 0);
const anaemicPct = pct(8 + 5, goatsChecked);
check(goatsChecked === 50 && anaemicPct === 26, "eyes");
const EYE_TABLE = table(["Colour of the inner eyelid", "Number of goats"], EYES);

concept("agri.livestock.goats-sheep", { file: "livestock/goats-sheep", keyPrefix: "livestock.goats-sheep" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which goat breed is a white dairy breed with a high milk yield?",
    options: [
      ["Saanen", "Correct: a Swiss dairy breed."],
      ["Boer goat", "A meat breed with a white body and red-brown head."],
      ["Angora", "Kept for mohair."],
      ["Kalahari Red", "A red-brown meat breed."],
    ],
    answer: "A",
    explanation: "The Saanen is the main exotic dairy goat.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which of these is an indigenous sheep breed of Zimbabwe?",
    options: [
      ["Sabi", "Correct: a hardy, fat-tailed hair sheep."],
      ["Dorper", "An exotic meat breed developed in South Africa."],
      ["Merino", "An exotic fine-wool breed."],
      ["Boer", "The Boer is a goat breed."],
    ],
    answer: "A",
    explanation: "The Sabi is indigenous; the Dorper and Merino are exotic.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does the feeding behaviour of goats differ from that of sheep?",
    options: [
      ["Goats mainly browse shrubs and trees; sheep graze close to the ground", "Correct."],
      ["Goats graze grass close to the ground; sheep browse trees", "This is the wrong way round."],
      ["Goats and sheep eat exactly the same plants in the same way", "Their preferences differ, which is why mixed flocks use veld well."],
      ["Goats eat only concentrates and cannot digest leaves", "Goats are ruminants that digest leaves well."],
    ],
    answer: "A",
    explanation: "Goats are browsers and sheep are grazers, so they compete little.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What happens to droppings and urine on a slatted floor?"],
    stem: "Why is a raised slatted floor recommended in a goat house?",
    options: [
      ["Droppings fall through and the floor stays dry, reducing foot rot and worms", "Correct."],
      ["It lets the goats see predators approaching at night", "This is not the reason."],
      ["It makes the house warmer in the rainy season", "A raised floor is cooler and drier, not warmer."],
      ["It allows the farmer to keep twice as many goats in the same small house", "Stocking density must still be reasonable."],
    ],
    answer: "A",
    explanation: "A dry, clean floor reduces pneumonia, foot rot and worm infection.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["What raises the number of eggs released?"],
    stem: "A farmer wants more twins from her does next season. What should she do?",
    options: [
      ["Feed the does better for 2-3 weeks before and during mating", "Correct: flushing raises the ovulation rate."],
      ["Reduce their feed so they become lean before mating", "Poor condition lowers ovulation and conception."],
      ["Keep the buck with the does all year round", "This spreads kidding but does not cause twins."],
      ["Mate the does as soon as they are weaned at about three months old", "They are far too young."],
    ],
    answer: "A",
    explanation: "Flushing increases the number of eggs released, so more does have twins.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which internal parasite sucks blood?"],
    stem: "Several goats are weak, with pale inner eyelids and swelling under the jaw. Which problem is most likely?",
    options: [
      ["Wireworm infection causing anaemia", "Correct: these worms suck blood in the abomasum."],
      ["Foot rot", "Foot rot causes lameness and a foul smell from the hooves."],
      ["Heartwater", "Heartwater is tick-borne and causes nervous signs and fever."],
      ["Overfeeding during flushing, which makes the goats fat and slow", "Overfeeding does not cause pale eyelids."],
    ],
    answer: "A",
    explanation: "Pale membranes (anaemia) and bottle jaw are classic signs of wireworm; dose and improve grazing management.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Compare hardiness and growth."],
    stem: "A farmer with local Mashona does wants faster-growing kids without losing hardiness. What is the best plan?",
    options: [
      ["Mate the local does with a Boer buck", "Correct: crossbred kids grow faster and keep much of the dam's hardiness."],
      ["Replace all the does with Saanen does", "Saanens are dairy goats needing good feed and shelter."],
      ["Keep only Mashona bucks and does and feed them less", "This will not raise growth rate."],
      ["Buy Merino rams to mate with the does to improve their growth rate", "Rams cannot breed with goats."],
    ],
    answer: "A",
    explanation: "Crossbreeding with a meat breed such as the Boer improves growth while the local dam provides hardiness and mothering ability.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The gestation period of both goats and sheep is about 150 days.",
    answer: true,
    explanation: "True: about five months.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A kidding percentage of 140% must be a mistake, because a percentage cannot be more than 100.",
    answer: false,
    explanation: "False. Kids born ÷ does mated × 100 exceeds 100% when twins are common.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each management practice with its reason.",
    pairs: [
      ["Hoof trimming", "Prevents lameness and foot rot"],
      ["Dipping", "Controls ticks that spread heartwater"],
      ["Dosing", "Controls wireworm and other internal parasites"],
      ["Castration", "Prevents unwanted mating"],
      ["Shearing", "Harvests wool from wool sheep"],
    ],
    explanation: "Each routine practice protects health or production.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Giving birth in sheep is called {{blank:a}}, and the oestrous cycle of a ewe lasts about {{blank:b}} days.",
    blanks: [
      { id: "a", accepted: ["lambing"] },
      { id: "b", accepted: ["17", "seventeen", "16", "18"] },
    ],
    explanation: "Lambing; about 17 days.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the tick-borne disease of goats and sheep spread by the bont tick.",
    accepted: ["heartwater", "heart water", "cowdriosis", "ehrlichiosis"],
    keywords: { any: ["heartwater", "heart water"] },
    explanation: "**Heartwater** is spread by the bont tick; goats and sheep are very susceptible.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "30 ewes were mated and 39 lambs were born. Calculate the lambing percentage.",
    value: lambPct, unit: "%", tol: 0, wrong: [round(pct(30, 39), 1), 39],
    explanation: `39 ÷ 30 × 100 = ${lambPct}%.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["Gain ÷ days."],
    stem: "A Dorper lamb weighed 4 kg at birth and 28 kg at 150 days. Calculate its average daily gain, in kg/day.",
    value: adgL, unit: "kg/day", tol: 0.005, answer: "0.16", wrong: [round(28 / 150, 3), 24],
    explanation: `Gain = 28 − 4 = 24 kg; 24 ÷ 150 = ${adgL} kg/day.`,
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    hints: ["Floor, roof, security and fittings."],
    stem: "Describe a suitable house for a flock of goats.",
    points: [
      "Raised slatted floor about a metre off the ground so droppings fall through and the floor stays dry.",
      "Roof and walls that keep out rain and wind but allow ventilation.",
      "Secure doors/walls against predators and thieves.",
      "Feed racks above floor level, water troughs and separate pens for kids and the buck.",
    ],
    modelAnswer: "The house should have a raised slatted floor, a roof and walls that keep out rain and draughts while allowing ventilation, strong lockable doors against predators and thieves, and raised feed racks, water troughs and separate pens for kids and the buck.",
    explanation: "Each feature with its reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A farmer near Gokwe kept these records for her goat flock. In season 2 she flushed the does before mating.\n\n${FLOCK_TABLE}`,
    hints: ["Kidding % = kids born ÷ does mated × 100.", "Weaning % = kids weaned ÷ does mated × 100."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the kidding percentage in season 1.",
        value: kp[0], unit: "%", tol: 0, wrong: [round(pct(55, 44), 1), 88],
        explanation: `55 ÷ 50 × 100 = ${kp[0]}%.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the weaning percentage in season 2.",
        value: wp[1], unit: "%", tol: 0, wrong: [round(pct(64, 74), 1), round(pct(64, 46), 1)],
        explanation: `64 ÷ 50 × 100 = ${wp[1]}%.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain how flushing caused the change in the number of kids born.",
        points: ["Better feeding before and during mating raised the does' body condition.", "So more eggs were released (higher ovulation rate) and more does had twins: kids born rose from 55 to 74."],
        explanation: "Flushing and ovulation.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "In season 2, 10 of the 74 kids died before weaning. Suggest **three** ways to reduce these losses.",
        points: ["Ensure every kid gets colostrum soon after birth, especially twins (help weak kids to suck).", "Keep does and kids in a dry, sheltered, predator-proof pen; dip navels.", "Feed does well in late pregnancy and lactation; creep-feed kids; control worms and ticks."],
        explanation: "Colostrum, shelter, nutrition and health.",
      }),
    ],
    explanation: "Calculate flock performance and explain the effect of flushing.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8, calculator: true,
    stem: `After a wet season, a farmer checked the colour of the inner eyelids of ${goatsChecked} goats (red is healthy; white is severe anaemia).\n\n${EYE_TABLE}`,
    hints: ["Pale pink and white show anaemia.", "Percentage = anaemic goats ÷ goats checked × 100."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage of goats with pale pink or white eyelids.",
        value: anaemicPct, unit: "%", tol: 0, wrong: [13, 10],
        explanation: `8 + 5 = 13 goats; 13 ÷ ${goatsChecked} × 100 = ${anaemicPct}%.`,
      }),
      P.short({
        label: "(b)", stem: "Name the blood-sucking internal parasite most likely to be causing the anaemia.",
        accepted: ["wireworm", "wire worm", "Haemonchus", "barber's pole worm", "Haemonchus contortus"],
        keywords: { any: ["wireworm", "wire worm", "haemonchus", "barber"] },
        explanation: "Wireworm (*Haemonchus*) sucks blood in the abomasum.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why worm problems are worst after a wet season.",
        points: ["Worm eggs and larvae on the pasture survive and develop best in warm, moist conditions.", "Goats grazing wet, short grass pick up many larvae."],
        explanation: "Moisture and larvae.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** ways to control worms in the flock.",
        points: ["Dose the anaemic goats (and the flock at strategic times) with an approved dewormer at the correct dose.", "Rotate grazing/move goats to clean paddocks; let goats browse rather than graze short wet grass.", "House on raised slatted floors, keep feed off the ground, and cull goats that are repeatedly anaemic."],
        explanation: "Dosing, grazing management, hygiene and selection.",
      }),
    ],
    explanation: "Interpret eyelid colour scores for anaemia and plan worm control.",
  });

  b.card("FACT", "Indigenous goats and sheep", "Matebele and Mashona goats; Sabi sheep: hardy, tolerate heat, ticks and poor feed.");
  b.card("FACT", "Exotic goats and sheep", "Boer and Kalahari Red (meat goats), Saanen (dairy goat), Angora (mohair), Dorper (meat sheep), Merino (wool sheep).");
  b.card("DEFINITION", "Browsing vs grazing", "Browsing: eating leaves and twigs of shrubs and trees (goats). Grazing: eating grass close to the ground (sheep, cattle).");
  b.card("DEFINITION", "Flushing", "Extra feeding for 2-3 weeks before and during mating to raise ovulation rate and the number of twins.");
  b.card("FACT", "Goat and sheep breeding facts", "Cycle: doe about 21 days, ewe about 17 days; gestation about 150 days; wean at 3-4 months.");
  b.card("FORMULA", "Kidding or lambing percentage", "Young born ÷ females mated × 100 (can exceed 100% with twins).");
  b.card("CONCEPT", "Wireworm", "Blood-sucking worm in the abomasum: anaemia (pale eyelids), bottle jaw, weakness; worst after wet seasons.");
  b.card("CONCEPT", "Raised slatted floor", "Keeps goats dry and clean: droppings fall through, less foot rot, pneumonia and worms.");
});
