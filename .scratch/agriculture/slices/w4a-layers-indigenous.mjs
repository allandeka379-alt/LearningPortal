// Slice W4a: layers and indigenous chickens (ZIMSEC only).
import { concept, P, layingPct, profitLoss, pct, round, check, table, fmtNum } from "../lib.mjs";

// Num: hen-day % for 250 hens over 30 days.
const hd250 = layingPct({ eggs: 6000, hens: 250, days: 30 });
check(hd250 === 80, "hd250");
// Num: trays.
const trays = 4170 / 30;
check(trays === 139, "trays");
// Struct: a week's egg record for 300 hens.
const WEEK = [["Monday", 261], ["Tuesday", 255], ["Wednesday", 264], ["Thursday", 249], ["Friday", 258], ["Saturday", 252], ["Sunday", 246]];
const weekEggs = WEEK.reduce((s, [, n]) => s + n, 0);
const weekPct = layingPct({ eggs: weekEggs, hens: 300, days: 7 });
check(weekEggs === 1785 && weekPct === 85, "week");
const WEEK_TABLE = table(["Day", "Eggs collected"], WEEK);
// Struct: monthly profit for a small unit (assume prices).
const PL = profitLoss({
  income: [["Eggs: 210 trays at US$3.50", 210 * 3.5], ["Off-layers: 20 at US$4", 80]],
  expenses: [["Layer mash", 495], ["Vaccines and medicines", 18], ["Packaging trays", 21], ["Labour", 60]],
});
check(PL.totalIncome === 815 && PL.totalExpenses === 594 && PL.profit === 221, "pl");
const PL_TABLE = table(["Item", "US\\$"], [
  ["Sale of eggs (210 trays at US\\$3.50)", 735], ["Sale of off-layers (20 at US\\$4)", 80],
  ["Layer mash", 495], ["Vaccines and medicines", 18], ["Packaging trays", 21], ["Labour", 60],
]);

concept("agri.livestock.layers-indigenous", { file: "livestock/layers-indigenous", keyPrefix: "livestock.layers-indigenous" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a light layer breed that lays white eggs?",
    options: [
      ["White Leghorn", "Correct: a small, non-broody, white-egg breed."],
      ["Rhode Island Red", "A dual-purpose breed laying brown eggs."],
      ["Black Australorp", "A heavy dual-purpose breed laying brown eggs."],
      ["Light Sussex", "Despite its name, a heavier dual-purpose breed laying tinted eggs."],
    ],
    answer: "A",
    explanation: "The White Leghorn is the classic light, white-egg layer.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "At about what age do pullets usually come into lay?",
    options: [
      ["18-22 weeks", "Correct: this is the point of lay."],
      ["5-7 weeks", "This is the slaughter age of broilers."],
      ["About 2 years", "Hens are usually culled before this age."],
      ["21 days", "This is the incubation period of hen eggs."],
    ],
    answer: "A",
    explanation: "Point of lay is usually about 18-22 weeks.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is layer mash higher in calcium than grower mash?",
    options: [
      ["Calcium is needed to form eggshells", "Correct: each shell is mostly calcium carbonate."],
      ["Calcium makes the yolk a deeper yellow", "Yolk colour comes from pigments in the feed, such as those in yellow maize."],
      ["Calcium speeds up the growth of feathers", "Feathers are mainly protein."],
      ["Calcium stops hens from going broody", "Broodiness is controlled by hormones and breeding, not calcium."],
    ],
    answer: "A",
    explanation: "A laying hen puts a large amount of calcium into shells, so layer mash (and shell grit) supplies extra.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Look at the comb, the vent and the pelvic bones."],
    stem: "Which hen should be culled from a laying flock?",
    options: [
      ["Pale shrunken comb, dry puckered vent, pelvic bones one finger apart", "Correct: signs of a non-layer."],
      ["Large red comb, moist oval vent, pelvic bones three fingers apart", "These are signs of a hen in full lay."],
      ["Bleached beak and shanks, soft deep abdomen", "Bleaching and a soft abdomen show she has been laying well."],
      ["Bright eyes, active, eating well", "These are signs of good health."],
    ],
    answer: "A",
    explanation: "Non-layers have small pale combs, small dry vents and narrow pelvic bones.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["How does day length affect laying?"],
    stem: "A farmer switched off the evening lights in his layer house to save electricity. What is the most likely result?",
    options: [
      ["Egg production falls", "Correct: shorter days reduce laying."],
      ["Egg production rises because the hens rest more", "Laying is stimulated by long days."],
      ["The eggs become larger but fewer", "Shortening the day reduces laying; it does not enlarge eggs."],
      ["Nothing changes, because hens lay the same number of eggs in any amount of light", "Day length strongly affects laying."],
    ],
    answer: "A",
    explanation: "Layers need about 16 hours of light, and the day length should never be reduced during lay.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["Compare cleanliness, cost and welfare."],
    stem: "Which is an advantage of keeping layers in cages rather than on deep litter?",
    options: [
      ["Eggs are cleaner and poor layers are easier to identify", "Correct."],
      ["Cages are cheaper to build than a deep-litter house", "Cages are more expensive."],
      ["Hens in cages can move about freely and dust-bathe", "Caged hens have very little freedom of movement."],
      ["Hens in cages never need to be vaccinated against disease", "Vaccination is still required."],
    ],
    answer: "A",
    explanation: "Eggs roll away from the birds, and laying can be recorded per cage, but cages cost more and raise welfare concerns.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Which disease kills many village chickens and can be prevented cheaply?"],
    stem: "Many households lose most of their free-range indigenous chickens in outbreaks every few years. Which single measure would most reduce these losses?",
    options: [
      ["Regular vaccination against Newcastle disease", "Correct: Newcastle disease causes the large outbreaks."],
      ["Feeding the birds layer mash only", "Better feed helps, but does not stop outbreaks."],
      ["Replacing all the birds with broilers", "Broilers do not suit free-range scavenging."],
      ["Washing all eggs before they are put under broody hens to hatch them", "Washing removes the cuticle and does nothing against outbreaks."],
    ],
    answer: "A",
    explanation: "Newcastle disease is the main killer of village chickens; vaccination is cheap and effective.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Eggs should be packed in trays with the broad end facing up.",
    answer: true,
    explanation: "True. This keeps the air cell at the top and the yolk central, so the egg stays fresher.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Broodiness is a desirable trait in hens kept in a commercial egg unit.",
    answer: false,
    explanation: "False. A broody hen stops laying, so broodiness is bred out of commercial layers; it is useful only where hens hatch their own chicks.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feed with the stage at which it is given.",
    pairs: [
      ["Chick mash", "Day-old to about 6-8 weeks"],
      ["Grower mash", "About 8 weeks to point of lay"],
      ["Layer mash", "From point of lay"],
      ["Limestone or shell grit", "Extra calcium for laying hens"],
    ],
    explanation: "Feeds change with the bird's needs: growth, then egg production.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Laying hens should receive about {{blank:a}} hours of light a day, and a hen that has stopped laying and is sold for meat is called an {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["16", "sixteen"] },
      { id: "b", accepted: ["off-layer", "off layer", "offlayer"] },
    ],
    explanation: "About 16 hours of light; off-layers are culled hens.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the method of examining eggs in front of a bright light to detect cracks and blood spots.",
    accepted: ["candling", "candle", "candling eggs"],
    keywords: { any: ["candl"] },
    explanation: "**Candling** shows cracks, blood spots and the air cell.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["Hen-days = hens × days."],
    stem: "A flock of 250 hens laid 6,000 eggs in 30 days. Calculate the hen-day laying percentage.",
    value: hd250, unit: "%", tol: 0, wrong: [24, 2400],
    explanation: `Hen-days = 250 × 30 = 7,500. 6,000 ÷ 7,500 × 100 = ${hd250}%. Dividing by the hens alone gives 24 eggs per hen, not a percentage.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Nyasha collected 4,170 eggs in a month. How many trays of 30 eggs can she fill?",
    value: trays, tol: 0, answer: "139", wrong: [347.5, 4170 / 12],
    explanation: `4,170 ÷ 30 = ${trays} trays. Dividing by 12 gives dozens (347.5), not trays.`,
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    hints: ["Think of collection, cleaning, checking, grading and storage."],
    stem: "Describe how eggs should be prepared for market.",
    points: [
      "Collect eggs two or three times a day from clean nests.",
      "Do not wash; clean slight dirt off with a dry cloth (keeps the cuticle).",
      "Candle to remove cracked eggs and those with blood spots; grade by size/mass.",
      "Pack in clean trays, broad end up; store in a cool, dry place and sell fresh.",
    ],
    modelAnswer: "Collect eggs often from clean nests, dry-clean dirty ones instead of washing, candle out cracked and blood-spotted eggs, grade them by size, pack them broad end up in clean trays and keep them cool until sold.",
    explanation: "Collect, clean, candle, grade, pack, store.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    hints: ["Compare predators, disease, feed and cost."],
    stem: "Explain why moving indigenous chickens from free-range to a semi-intensive system can increase a household's income.",
    points: [
      "Birds housed at night in a secure run are protected from predators and theft, so fewer are lost.",
      "Supplementary feed and water improve growth and egg numbers.",
      "Vaccination and better hygiene are easier when birds are confined, reducing deaths from Newcastle disease.",
      "Chicks can be creep-fed and taken from the hen sooner, so she lays again and more birds are reared for sale (costs of housing/feed must be weighed).",
    ],
    modelAnswer: "A secure night house cuts losses to predators and thieves; extra feed and water improve growth and laying; confined birds are easier to vaccinate against Newcastle disease; and creep-feeding chicks lets hens return to lay sooner, so more birds and eggs are sold.",
    explanation: "Fewer losses, more growth and eggs.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A school has 300 layers. The egg record for one week is shown.\n\n${WEEK_TABLE}`,
    hints: ["Add the eggs for the week.", "Hen-day % = eggs ÷ (hens × days) × 100."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the total number of eggs collected in the week.",
        value: weekEggs, unit: "eggs", tol: 0, wrong: [weekEggs - 246, 255],
        explanation: `261 + 255 + 264 + 249 + 258 + 252 + 246 = ${fmtNum(weekEggs)}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the hen-day laying percentage for the week.",
        value: weekPct, unit: "%", tol: 0, wrong: [round(pct(weekEggs, 300), 0), round(pct(255, 300), 0)],
        explanation: `${fmtNum(weekEggs)} ÷ (300 × 7) × 100 = ${fmtNum(weekEggs)} ÷ 2,100 × 100 = ${weekPct}%.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State **two** reasons why records of daily egg numbers are useful.",
        points: ["A sudden drop warns of disease, stress, feed or water problems so action can be taken early.", "They show when the flock is no longer profitable (when to cull) / are used to calculate laying % and income."],
        explanation: "Uses of production records.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** causes of a sudden fall in egg numbers in a layer flock.",
        points: ["Water or feed shortage (empty drinkers, change of feed).", "Disease (e.g. Newcastle disease) or parasites (mites, worms).", "Stress: heat, a shortened day length/power cut to lights, predators or disturbance in the house."],
        explanation: "Feed and water, disease, stress and light.",
      }),
    ],
    explanation: "Analyse a weekly egg record and explain changes in production.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, calculator: true,
    stem: `Sipho's laying unit had the following income and expenses for one month (assume these figures).\n\n${PL_TABLE}`,
    hints: ["Profit = total income − total expenses."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the total income for the month, in US\\$.",
        value: PL.totalIncome, prefix: "US$", wrong: [735, 80],
        explanation: `735 + 80 = US\\$${PL.totalIncome}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the profit for the month, in US\\$.",
        value: PL.profit, prefix: "US$", wrong: [PL.totalExpenses, 735 - PL.totalExpenses],
        explanation: `Expenses = 495 + 18 + 21 + 60 = US\\$${PL.totalExpenses}; profit = ${PL.totalIncome} − ${PL.totalExpenses} = US\\$${PL.profit}.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** ways Sipho could reduce the cost of layer mash per tray of eggs.",
        points: ["Cull non-laying hens so feed is not wasted on birds that do not lay.", "Prevent feed spillage and wastage (correct feeder height, rat control) / buy feed in bulk."],
        explanation: "Feed is the largest cost.",
      }),
    ],
    explanation: "Profit and loss for a layer unit.",
  });

  b.card("DEFINITION", "Point of lay", "The age at which a pullet lays her first egg: about 18-22 weeks.");
  b.card("DEFINITION", "Off-layer", "A hen culled because she has stopped laying or lays too few eggs to pay for her feed.");
  b.card("FORMULA", "Hen-day laying percentage", "Eggs laid ÷ (number of hens × days) × 100.");
  b.card("FACT", "Light for layers", "About 16 hours a day; never reduce day length during lay.");
  b.card("FACT", "Laying hen vs non-layer", "Layer: large red comb, moist oval vent, pelvic bones 2-3 fingers apart. Non-layer: pale small comb, dry puckered vent, bones 1 finger apart.");
  b.card("CONCEPT", "Deep litter vs cages", "Deep litter: cheaper, more freedom, dirtier eggs. Cages: clean eggs, easy culling and records, more birds; costly and welfare concerns.");
  b.card("CONCEPT", "Indigenous chickens", "Hardy, scavenge, good brooders and mothers, tasty meat; slow growth and fewer eggs. Improve with night housing, extra feed and Newcastle vaccination.");
  b.card("FACT", "Preparing eggs for market", "Collect often, do not wash, candle, grade by size, pack broad end up, store cool.");
});
