// Slice W2b: livestock breeding and artificial insemination.
import { concept, P, pct, round, check, table, agricultureLevels } from "../lib.mjs";

// Upgrading: local genes remaining after n generations (lesson shows exotic %).
const localAfter = (n) => 100 / 2 ** n;
check(localAfter(3) === 12.5 && localAfter(4) === 6.25, "local");

// Conception rate (numbers differ from the lesson).
const AI_N = 60, AI_P = 42;
const conc = pct(AI_P, AI_N);
check(conc === 70, "conc");

// Straws per pregnancy (assumed figures).
const STRAWS = 1200, PER_PREG = 1.5;
const pregnancies = STRAWS / PER_PREG;
check(pregnancies === 800, "preg");

// Structured: bull selection records (fictional).
const BULLS = [
  ["Bull K", "Purebred exotic", 210, 52],
  ["Bull L", "Indigenous (Mashona)", 165, 88],
  ["Bull M", "Crossbred (exotic × Mashona)", 195, 81],
];
const BULL_TABLE = table(["Bull", "Type", "Mean weaning weight of calves (kg)", "Calves weaned per 100 cows mated"], BULLS);
const kgPer100 = (w, n) => w * n;
const kK = kgPer100(210, 52), kL = kgPer100(165, 88), kM = kgPer100(195, 81);
check(kK === 10920 && kL === 14520 && kM === 15795, "kg weaned");

concept("agri.breeding.livestock-breeding", { file: "breeding/livestock-breeding", keyPrefix: "breeding.livestock-breeding" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which breeding system mates closely related animals such as father and daughter?",
    options: [
      ["Inbreeding", "Correct: mating close relatives."],
      ["Cross-breeding", "Cross-breeding mates two different breeds."],
      ["Upgrading", "Upgrading uses purebred males on each generation of local females."],
      ["Outcrossing", "Outcrossing mates unrelated animals of the same breed."],
    ],
    answer: "A",
    explanation: "Inbreeding is the mating of closely related animals.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main advantage of cross-breeding?",
    options: [
      ["Hybrid vigour in the offspring", "Correct: crossbreds often grow faster and survive better."],
      ["Offspring that breed true to type", "Crossbreds do not breed true when mated together."],
      ["Fixing the characteristics of one ancestor", "That is the aim of line breeding."],
      ["Exposing hidden recessive defects", "Inbreeding exposes recessive defects."],
    ],
    answer: "A",
    explanation: "Cross-breeding combines the qualities of two breeds and gives hybrid vigour.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "At what temperature is bull semen stored for artificial insemination?",
    options: [
      ["About −196 °C in liquid nitrogen", "Correct: frozen semen keeps for many years."],
      ["About 4 °C in a refrigerator", "Fresh semen may be chilled briefly, but long-term storage is frozen."],
      ["About 38.5 °C, body temperature", "Semen would not keep at body temperature."],
      ["About −18 °C in a deep freezer", "A domestic freezer is not cold enough for long storage."],
    ],
    answer: "A",
    explanation: "Semen in straws is stored in liquid nitrogen at about −196 °C.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **conformation** feature a farmer checks when selecting a breeding bull?",
    options: [
      ["Strong legs and sound feet", "Correct: conformation is body shape and soundness."],
      ["The milk yield of his mother", "This is a pedigree record."],
      ["The weaning weights of all the calves he has sired", "This is a progeny record."],
      ["The price paid for him at an auction", "Price is not a breeding criterion."],
    ],
    answer: "A",
    explanation: "Conformation covers body shape, legs and feet, teeth, eyes and reproductive organs.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer has used the same bull for six years and some of the bull's daughters are now in the herd. Calves are being born weak and fertility is falling. What is the most likely cause?",
    options: [
      ["Inbreeding depression", "Correct: close relatives share harmful recessive alleles."],
      ["Hybrid vigour", "Hybrid vigour improves, not reduces, performance."],
      ["Upgrading to an exotic breed", "No new breed has been introduced."],
      ["Use of too many bulls", "The problem is one bull used too long."],
    ],
    answer: "A",
    hints: ["Who is the bull mating?"],
    explanation: "Replace the bull every few years, or use AI, to avoid father-daughter matings.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why do exotic dairy cows often give much less milk on a hot lowveld farm than in a cool highland area?",
    options: [
      ["Heat stress cuts their intake and fertility", "Correct: the environment limits the genetic potential."],
      ["Their genes for milk production change in hot weather", "Genes do not change; their expression is limited."],
      ["Hot weather turns their milk into butter fat", "This is not what happens."],
      ["Heat improves their fertility but greatly reduces their appetite for feed", "Heat stress lowers fertility as well."],
    ],
    answer: "A",
    hints: ["Think about the effect of the environment on gene expression."],
    explanation: "Exotic breeds are not adapted to heat; heat stress lowers intake, yield and fertility.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which is the most reliable way of judging the breeding value of a young dairy bull?",
    options: [
      ["Recording the milk yields of his daughters", "Correct: this is progeny testing; offspring show the genes he passes on."],
      ["Judging his body shape and size at an agricultural show", "Conformation alone shows little about milk genes."],
      ["Weighing him at one year old", "His growth says little about his daughters' milk."],
      ["Checking the price of his semen", "Price does not prove breeding value."],
    ],
    answer: "A",
    hints: ["A bull cannot give milk. How can his genes for milk be measured?"],
    explanation: "Progeny testing is slow but measures what the bull actually passes on.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Artificial insemination reduces the spread of venereal diseases.",
    answer: true,
    explanation: "True. Semen is collected under hygienic conditions and checked, and there is no physical mating.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Upgrading produces a nearly purebred herd after only one generation.",
    answer: false,
    explanation: "False. The first generation is 50% improved breed; about five generations are needed to be nearly purebred.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each breeding system with its description.",
    pairs: [
      ["Inbreeding", "Mating close relatives such as brother and sister"],
      ["Line breeding", "Keeping offspring closely related to one outstanding ancestor"],
      ["Cross-breeding", "Mating animals of two different breeds"],
      ["Upgrading", "Using purebred males on local females in every generation"],
    ],
    explanation: "Know the mating pattern of each system.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Removing poor animals from breeding is called {{blank:a}}. Judging a male by the performance of his offspring is called {{blank:b}} testing. Loss of fertility and vigour from mating close relatives is called inbreeding {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["culling"] },
      { id: "b", accepted: ["progeny"] },
      { id: "c", accepted: ["depression"] },
    ],
    explanation: "Culling; progeny testing; inbreeding depression.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the liquid used to store frozen semen for artificial insemination.",
    accepted: ["liquid nitrogen", "nitrogen"],
    explanation: "Straws are kept in **liquid nitrogen**.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `In a district, ${AI_N} cows were inseminated and ${AI_P} became pregnant. Calculate the conception rate.`,
    value: conc, unit: "%", wrong: [AI_P, round(pct(AI_N - AI_P, AI_N), 0)],
    explanation: `${AI_P} ÷ ${AI_N} × 100 = ${conc}%.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Local does are mated to a purebred Boer buck, and in every later generation the female offspring are mated to purebred Boer bucks. What percentage of local goat genes is expected in the third generation?",
    value: localAfter(3), unit: "%", tol: 0.05, wrong: [87.5, 25],
    hints: ["Each generation halves the share of local genes."],
    explanation: `Local genes halve each generation: 100 → 50 → 25 → ${localAfter(3)}%. (87.5% is the share of Boer genes.)`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: `Assume one bull's semen fills ${STRAWS.toLocaleString("en-GB")} straws and that on average ${PER_PREG} straws are used for each pregnancy. How many pregnancies can be expected?`,
    value: pregnancies, wrong: [STRAWS * PER_PREG],
    hints: ["Divide the straws by the straws needed per pregnancy."],
    explanation: `${STRAWS} ÷ ${PER_PREG} = ${pregnancies} pregnancies, far more than a bull could achieve by natural mating in a season.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "State **two** benefits and **two** limitations of artificial insemination.",
    hints: ["Think of the farmer's costs, disease, skill and timing."],
    points: [
      "Benefit: semen of a superior, proven male can be used on many females (even after his death).",
      "Benefit: no need to keep a bull / less venereal disease / avoids inbreeding and injury.",
      "Limitation: needs a skilled inseminator and equipment (liquid nitrogen).",
      "Limitation: heat must be detected accurately, or conception rates are low (or: a hidden defect can spread widely).",
    ],
    modelAnswer: "AI lets a farmer use semen from a proven bull without keeping one, and it reduces venereal diseases. But it needs a trained inseminator and liquid nitrogen, and cows must be inseminated at the right time in heat.",
    explanation: "Two of each.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Suggest **three** characteristics a farmer should look for when selecting a sow for breeding.",
    hints: ["Think about performance, records and conformation for pigs."],
    points: [
      "Large litters weaned / from a line with large litters (records).",
      "At least 12 well-spaced, functional teats / good conformation (sound legs, long body).",
      "Good mothering ability and temperament / fast growth and good feed conversion.",
    ],
    modelAnswer: "Choose a sow from a family with large litters, with at least twelve evenly spaced teats and strong legs, and with a calm temperament and good mothering ability.",
    explanation: "Any three valid selection points.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A cattle co-operative near Gweru compared three bulls used on similar cows. The figures are fictional.\n\n${BULL_TABLE}`,
    hints: ["Total weaned = weaning weight × calves weaned per 100 cows.", "Consider survival as well as growth."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the total mass of calves weaned per 100 cows mated for Bull L, in kg.",
        value: kL, unit: "kg", wrong: [165 + 88],
        explanation: `165 × 88 = ${kL.toLocaleString("en-GB")} kg.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the same figure for Bull M, in kg.",
        value: kM, unit: "kg", wrong: [195 + 81],
        explanation: `195 × 81 = ${kM.toLocaleString("en-GB")} kg.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why Bull K's calves were heaviest but the fewest were weaned.",
        points: ["Exotic genes give fast growth, so calves are heavy at weaning.", "But exotic crosses are less adapted to heat, ticks and poor grazing, so fewer cows conceive or calves survive (or: large calves cause difficult births)."],
        explanation: "Growth against adaptation.",
      }),
      P.short({
        label: "(d)", stem: "Name the effect that explains why Bull M's calves combined good growth with good survival.",
        accepted: ["hybrid vigour", "heterosis"],
        explanation: "Crossbred calves show hybrid vigour.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Recommend which bull the co-operative should use and justify your choice, using the figures.",
        points: ["Bull M.", "It gives the greatest mass of calves weaned per 100 cows mated (15,795 kg), combining growth with adaptation / survival.", "Bull K gives heavy calves but the lowest total (10,920 kg) because few calves are weaned; Bull L survives well but its calves are light."],
        explanation: "Total output per cow matters more than calf weight alone.",
      }),
    ],
    explanation: "Combine growth and survival into output per 100 cows; crossbreds often do best in harsh conditions.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "Chipo wants to improve her flock of indigenous goats for meat. She is considering upgrading with purebred Boer bucks.",
    hints: ["How many generations does upgrading take?", "What might the flock lose?"],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Describe how upgrading would be carried out.",
        points: ["Mate the local does to a purebred Boer buck.", "Mate the female offspring (and each later generation) to purebred Boer bucks again, for several generations."],
        explanation: "Repeated use of purebred males.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "State **two** advantages of upgrading.",
        points: ["Cheap: only purebred males (or semen) have to be bought.", "Gradual improvement in growth and meat yield / the farmer can learn to manage the improved animals over time."],
        explanation: "Low cost, gradual change.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State **two** disadvantages of upgrading for Chipo.",
        points: ["It is slow, taking several generations.", "Upgraded goats may lose the hardiness and disease resistance of indigenous goats and need better feed and care."],
        explanation: "Slow; loss of adaptation.",
      }),
    ],
    explanation: "Upgrading slowly converts a flock but can sacrifice local adaptation.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate the use of artificial insemination to improve cattle herds in a communal farming area.",
    hints: ["Consider the benefits for genetic improvement and the practical problems in remote areas.", "Give a judgement with conditions."],
    points: [
      "Gives smallholders access to semen of proven, superior bulls they could never buy.",
      "Removes the need to keep a bull and avoids inbreeding from using one bull too long.",
      "Reduces the spread of venereal diseases.",
      "Needs trained inseminators, liquid nitrogen and reliable transport, which may be lacking in remote areas.",
      "Accurate heat detection is needed; herded or communal cattle may not be watched closely, lowering conception rates; improved breeds may need better feeding.",
      "Judgement: very useful where an organised AI service, heat detection and good feeding exist (e.g. through a co-operative or extension programme); otherwise natural service with a well-chosen bull may be more practical.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "AI could improve communal herds quickly, because farmers gain semen from proven bulls that they could never afford to buy, and they need not keep a bull, which also avoids inbreeding and reduces venereal disease. However, AI depends on trained inseminators, liquid nitrogen and transport arriving at the right time, which is difficult in remote areas, and cows must be watched closely to detect heat, which is hard when cattle graze communally. Calves from exotic semen may need more feed and health care than the farmers can provide. AI is therefore valuable where a co-operative or extension service organises inseminators, synchronises heats and supports feeding; elsewhere, a carefully selected, regularly replaced bull is more practical.",
    explanation: "Weigh benefits against practical limits and give a conditional judgement.",
  });

  b.card("DEFINITION", "Inbreeding", "Mating closely related animals; fixes traits but risks inbreeding depression.");
  b.card("DEFINITION", "Cross-breeding", "Mating two different breeds to combine traits and gain hybrid vigour.");
  b.card("DEFINITION", "Upgrading (grading up)", "Using purebred males of an improved breed on local females, and on their female offspring each generation.");
  b.card("DEFINITION", "Line breeding", "Mild inbreeding that keeps offspring closely related to one outstanding ancestor.");
  b.card("CONCEPT", "Three bases for selecting breeding animals", "Performance, records (pedigree and progeny) and conformation.");
  b.card("CONCEPT", "Environmental effects on breeding", "Heat stress, poor nutrition, disease and parasites, and management reduce fertility and performance.");
  b.card("CONCEPT", "Benefits of AI", "Superior sires used widely, no bull kept, less venereal disease, no inbreeding or injury, access to many breeds.");
  b.card("CONCEPT", "Limitations of AI", "Needs skilled inseminators, liquid nitrogen and accurate heat detection; can spread hidden defects.");
  b.card("FACT", "Exotic genes after five generations of upgrading", "About 97% (96.875%).");
});
