// Slice W4a: birth, colostrum, lactation, weaning and care of young stock.
import { concept, P, dailyGain, pct, mortalityPct, round, check, table } from "../lib.mjs";

// Num: colostrum for a 42 kg calf at 10% of body mass.
const colL = (42 * 10) / 100;
check(Math.abs(colL - 4.2) < 1e-9, "col");
// Calc: kid growth.
const kidAdg = dailyGain({ startKg: 3.2, endKg: 18.2, days: 100 });
check(Math.abs(kidAdg - 0.15) < 1e-9, "kid");
// Struct: calf records on a dairy farm (fictional).
const CALVES = [
  ["C1", "Within 1 hour", "Clean, dry pen", "Healthy"],
  ["C2", "After 14 hours", "Clean, dry pen", "Scours on day 4"],
  ["C3", "Within 2 hours", "Wet, draughty shed", "Pneumonia on day 9"],
  ["C4", "Within 1 hour", "Clean, dry pen", "Healthy"],
  ["C5", "After 20 hours", "Wet, draughty shed", "Died on day 6"],
];
const CALF_TABLE = table(["Calf", "First colostrum", "Housing", "Outcome"], CALVES);
const calfDeaths = mortalityPct({ died: 1, started: 5 });
check(calfDeaths === 20, "deaths");
// Struct 2: beef herd weaning figures.
const COWS_MATED = 60, CALVES_BORN = 52, CALVES_WEANED = 48;
const calvingPct = pct(CALVES_BORN, COWS_MATED);
const weaningPct = pct(CALVES_WEANED, COWS_MATED);
const preWeanLoss = pct(CALVES_BORN - CALVES_WEANED, CALVES_BORN);
check(Math.abs(calvingPct - 86.6667) < 1e-3 && weaningPct === 80 && Math.abs(preWeanLoss - 7.6923) < 1e-3, "herd");

concept("agri.livestock.birth-young-stock", { file: "livestock/birth-young-stock", keyPrefix: "livestock.birth-young-stock" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is colostrum?",
    options: [
      ["The first milk produced after birth, rich in antibodies", "Correct."],
      ["Milk produced at the end of a lactation", "Late-lactation milk is ordinary milk, not colostrum."],
      ["A powdered milk replacer for orphan calves", "Milk replacer is a bought substitute and is not colostrum."],
      ["The fluid in which the foetus floats inside the uterus before it is born", "That is amniotic fluid."],
    ],
    answer: "A",
    explanation: "Colostrum is produced for the first few days after birth.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why must a newborn calf receive colostrum within the first few hours of life?",
    options: [
      ["Its gut can absorb antibodies whole only for a short time", "Correct: absorption falls quickly over the first day."],
      ["Colostrum turns into ordinary milk after one hour", "Colostrum changes gradually over a few days."],
      ["The calf cannot digest water until it has had colostrum", "This is not true."],
      ["The calf already has its own antibodies from the placenta, which need topping up", "In cattle almost no antibodies cross the placenta."],
    ],
    answer: "A",
    explanation: "Antibodies from colostrum give passive immunity, but only while the gut can absorb them whole.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In a normal calving, which parts of the calf appear first?",
    options: [
      ["The two front feet with the nose lying on them", "Correct: the normal (anterior) presentation."],
      ["The tail and hindquarters", "This is a breech presentation and needs help."],
      ["The head alone, with both legs folded back", "Both legs back is an abnormal presentation."],
      ["One front foot only", "A single foot suggests the other leg is back."],
    ],
    answer: "A",
    explanation: "Normal: two front feet, soles down, with the nose resting on them.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Why is a newborn calf's navel dipped in an iodine solution?",
    options: [
      ["To disinfect it and help it dry, preventing navel ill", "Correct."],
      ["To stop the calf bleeding to death", "The cord normally stops bleeding by itself."],
      ["To supply iodine for growth of the thyroid gland", "The iodine is applied to the skin as a disinfectant."],
      ["To mark the calf so that it can be identified later in the herd records", "Identification uses ear tags or other marks."],
    ],
    answer: "A",
    explanation: "Germs entering through the wet navel cause navel ill and joint infections.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Think about the size of the calf and the stress of the operation."],
    stem: "At what stage is a rubber ring (elastrator) best used to castrate a male lamb or calf?",
    options: [
      ["Within the first week of life", "Correct: the scrotum is small and stress is least."],
      ["Just before the animal is sold for slaughter", "Late castration gives no benefit and causes more stress."],
      ["When the animal is about two years old", "The tissues are large; this is painful and risky."],
      ["Only after the animal has mated once, so its fertility has been tested", "Castrated males are those not kept for breeding."],
    ],
    answer: "A",
    explanation: "Rubber rings are applied in the first week; older animals are castrated with a bloodless castrator or a knife.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Where does the horn grow from?"],
    stem: "Why is dehorning best done by disbudding young calves or kids rather than removing horns from adults?",
    options: [
      ["The buds are not yet attached to the skull, so there is less pain and bleeding", "Correct."],
      ["Young animals cannot feel pain", "Young animals feel pain; the operation is simply smaller."],
      ["Horns of adults grow back after they are cut", "Removing a fully grown horn is a large wound; regrowth is not the reason."],
      ["Adult horns are needed for the animal to defend itself against predators in the herd", "This does not explain the best age."],
    ],
    answer: "A",
    explanation: "Early disbudding with a hot iron or caustic paste is quicker, less painful and less risky than cutting adult horns.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Which stage should finish within hours of birth?"],
    stem: "A cow calved normally 30 hours ago, but membranes still hang from her vulva and she has a fever. What is the most likely problem?",
    options: [
      ["A retained afterbirth that may cause infection", "Correct: the placenta should come away within hours."],
      ["She is about to give birth to a second calf", "Twins are born within a short time of each other, not 30 hours later."],
      ["She is coming on heat again", "Cows do not return to heat this soon after calving."],
      ["Normal stage 1 of birth, with the cervix opening for the next delivery", "Stage 1 comes before delivery."],
    ],
    answer: "A",
    explanation: "A retained afterbirth (placenta) can lead to infection of the uterus; call the veterinarian.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Weaning means separating the young animal from its mother's milk so that it lives on solid feed.",
    answer: true,
    explanation: "True. Lactation is milk production; weaning is taking the young off milk.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Calves kept in a wet, draughty shed are more likely to suffer from pneumonia and scours.",
    answer: true,
    explanation: "True. Calf housing must be clean, dry, well ventilated but free of draughts.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each young-stock practice with its main purpose.",
    pairs: [
      ["Ear tagging", "Identification for records"],
      ["Castration", "Prevents unwanted mating and makes males docile"],
      ["Disbudding", "Prevents horn growth and injuries"],
      ["Navel dipping", "Prevents navel infection"],
      ["Offering calf starter early", "Encourages rumen development"],
    ],
    explanation: "Each routine has a clear reason; give it in explanations.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Birth in cattle is called {{blank:a}}, in pigs it is called {{blank:b}} and in goats it is called kidding.",
    blanks: [
      { id: "a", accepted: ["calving"] },
      { id: "b", accepted: ["farrowing"] },
    ],
    explanation: "Calving, farrowing, lambing and kidding are all names for parturition.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["10% of the body mass."],
    stem: "A calf weighs 42 kg at birth. Assume the farm guideline is colostrum equal to 10% of body mass in the first 12 hours and that 1 kg of colostrum is about 1 L. Calculate the volume of colostrum the calf needs, in litres.",
    value: colL, unit: "L", tol: 0.05, answer: "4.2", wrong: [42, 0.42],
    explanation: "10% of 42 = 42 × 10 ÷ 100 = 4.2 L. Answers of 42 or 0.42 come from misplacing the decimal point.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    hints: ["Gain = weaning mass − birth mass.", "Divide by the number of days."],
    stem: "A Boer goat kid weighed 3.2 kg at birth and 18.2 kg when weaned 100 days later. Calculate its average daily gain in kg/day.",
    value: kidAdg, unit: "kg/day", tol: 0.005, answer: "0.15", wrong: [0.182, 15],
    explanation: `Gain = 18.2 − 3.2 = 15 kg; 15 ÷ 100 = ${kidAdg} kg/day. Dividing the weaning mass alone by the days (0.182) ignores the birth mass.`,
    workedSolution: "1. Live-weight gain = 18.2 − 3.2 = 15 kg.\n2. Average daily gain = 15 ÷ 100 = 0.15 kg/day.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Think of the udder, the vulva, the tail head and behaviour."],
    stem: "State **four** signs that a cow is close to giving birth.",
    points: [
      "Udder enlarges and becomes firm; teats fill (bagging up).",
      "Vulva swells and relaxes / clear mucus discharge.",
      "Ligaments beside the tail head slacken, leaving hollows.",
      "Restless, leaves the herd, lies down and gets up often, raises the tail.",
    ],
    modelAnswer: "Her udder fills and the teats become full; the vulva swells and relaxes with some mucus; hollows appear beside the tail head as the ligaments slacken; and she is restless and leaves the herd.",
    explanation: "Any four signs.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    hints: ["Hygiene, presentation, timing and direction of pulling."],
    stem: "Describe how a farmer should assist a cow whose calf is presented normally but is large and slow to come.",
    points: [
      "Wash hands and arms (and the vulva) with soap and use a lubricant / clean calving ropes.",
      "Check that both front feet and the head are present (normal presentation).",
      "Attach ropes above the fetlocks and pull only when the cow strains, resting between contractions.",
      "Pull outwards and then downwards towards her hocks; call the vet if there is no progress.",
    ],
    modelAnswer: "He washes and lubricates, checks both feet and the head are coming, ties clean ropes above the fetlocks and pulls gently with each contraction, outwards then down towards the hocks, calling the vet if the calf does not move.",
    explanation: "Hygiene, check, pull with contractions, direction.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `Records of five dairy calves born on a farm near Gweru in one month.\n\n${CALF_TABLE}`,
    hints: ["Mortality = died ÷ born × 100.", "Look for patterns in colostrum timing and housing."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the calf mortality for the month as a percentage.",
        value: calfDeaths, unit: "%", tol: 0, wrong: [1, 25],
        explanation: "1 calf died out of 5: 1 ÷ 5 × 100 = 20%.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using the records, explain the link between the time of first colostrum and the health of the calves.",
        points: [
          "Calves fed colostrum within 1-2 hours (C1, C3, C4) did not get scours; C2 and C5, fed after 14-20 hours, got scours or died.",
          "Late-fed calves absorbed fewer antibodies because the gut's ability to absorb them falls quickly after birth.",
          "So they had little passive immunity against the germs that cause scours.",
        ],
        explanation: "Use the data, then the biology.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Calf C3 had colostrum early but still fell ill. Suggest why.",
        points: ["It was kept in a wet, draughty shed.", "Cold, damp conditions and draughts lower resistance and favour pneumonia, whatever the colostrum."],
        explanation: "Housing.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State **two** changes the farmer should make.",
        points: ["Make sure every calf sucks or is fed colostrum within the first two hours (freeze spare colostrum).", "House all calves in clean, dry, draught-free pens with fresh bedding."],
        explanation: "Colostrum and housing.",
      }),
    ],
    explanation: "Interpret calf records to link colostrum timing and housing with disease and death.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, calculator: true,
    stem: `On a beef ranch near Masvingo, ${COWS_MATED} cows were mated. ${CALVES_BORN} calves were born alive and ${CALVES_WEANED} were weaned.`,
    hints: ["Use the number of cows mated as the base for both percentages."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the calving percentage (calves born alive ÷ cows mated × 100), to one decimal place.",
        value: calvingPct, unit: "%", tol: 0.05, answer: "86.7", wrong: [round(pct(COWS_MATED, CALVES_BORN), 1), 80],
        explanation: `${CALVES_BORN} ÷ ${COWS_MATED} × 100 = ${round(calvingPct, 1)}%.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the weaning percentage (calves weaned ÷ cows mated × 100).",
        value: weaningPct, unit: "%", tol: 0, wrong: [round(pct(CALVES_WEANED, CALVES_BORN), 1), 48],
        explanation: `${CALVES_WEANED} ÷ ${COWS_MATED} × 100 = ${weaningPct}%. Dividing by calves born gives ${round(pct(CALVES_WEANED, CALVES_BORN), 1)}%, a different measure.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest **three** management practices that could raise the weaning percentage.",
        points: [
          "Supervise calving in a calving paddock and assist difficult births.",
          "Ensure early colostrum, navel dipping and clean, dry shelter for calves.",
          "Control ticks and diseases (dipping, vaccination) and give cows enough feed/licks so they milk well.",
        ],
        explanation: "Reduce losses at and after birth.",
      }),
    ],
    explanation: "Herd fertility and calf survival figures.",
  });

  b.card("DEFINITION", "Colostrum", "First milk for a few days after birth: antibodies (passive immunity), protein, vitamin A, minerals; laxative.");
  b.card("DEFINITION", "Lactation", "Production and secretion of milk by the mammary glands after birth.");
  b.card("DEFINITION", "Weaning", "Permanently separating the young from its mother's milk so it lives on solid feed.");
  b.card("FACT", "Stages of birth", "1 cervix opens; 2 delivery of the young (front feet and nose first); 3 afterbirth expelled.");
  b.card("CONCEPT", "Why colostrum must be given early", "The newborn's gut absorbs antibodies whole only for a short time after birth; the ability falls quickly over the first day.");
  b.card("FACT", "Signs of approaching calving", "Bagging up, swollen relaxed vulva with mucus, hollows beside the tail head, restlessness and isolation.");
  b.card("FACT", "Typical weaning ages", "Beef calves 6-8 months; bucket-fed dairy calves 8-12 weeks; kids and lambs 3-4 months; piglets 4-8 weeks.");
  b.card("CONCEPT", "Castration and disbudding: when?", "Young: rubber ring in the first week; disbud calves and kids at a few days to a few weeks, before horns attach to the skull.");
});
