// Slice W2b: crop improvement and hybrid maize.
import { concept, P, mean, pct, pctChange, round, check, table, agricultureLevels } from "../lib.mjs";

// Heterosis (fictional trial yields, t/ha; numbers differ from the lesson).
const LC = 2.4, LD = 3.4, HY = 6.96;
const mid = mean([LC, LD]);
const het = pct(HY - mid, mid);
check(Math.abs(mid - 2.9) < 1e-9 && Math.abs(het - 140) < 1e-9, "heterosis");

// F2 yield drop.
const Y1 = 6.8, Y2 = 5.1;
const drop = -pctChange(Y1, Y2);
check(Math.abs(drop - 25) < 1e-9, "drop");

// Seed field rows: 6 female : 2 male, 96 rows.
const ROWS = 96, FEM = 6, MALE = 2;
const femaleRows = (ROWS / (FEM + MALE)) * FEM;
check(femaleRows === 72, "rows");

// Structured trial table (fictional, t/ha).
const TRIAL = [
  ["Inbred line P", 2.2],
  ["Inbred line Q", 3.0],
  ["Single cross P × Q (F1)", 7.0],
  ["Grain saved from P × Q and replanted (F2)", 4.9],
  ["Open-pollinated variety", 4.2],
];
const TRIAL_TABLE = table(["Seed planted", "Mean yield (t/ha)"], TRIAL.map(([s, y]) => [s, y.toFixed(1)]));
const midPQ = mean([2.2, 3.0]);
const hetPQ = pct(7.0 - midPQ, midPQ);
const f2Fall = -pctChange(7.0, 4.9);
check(Math.abs(midPQ - 2.6) < 1e-9 && Math.abs(hetPQ - 169.2308) < 1e-3 && Math.abs(f2Fall - 30) < 1e-9, "trial");

concept("agri.breeding.crop-improvement", { file: "breeding/crop-improvement", keyPrefix: "breeding.crop-improvement" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is heterosis?",
    options: [
      ["Extra vigour of F1 offspring of unrelated parents", "Correct: also called hybrid vigour."],
      ["Loss of vigour after several generations of selfing", "That is inbreeding depression."],
      ["Transfer of a gene from one species into another", "That is genetic modification."],
      ["Removal of the tassels from the female rows of a seed field", "That is detasselling."],
    ],
    answer: "A",
    explanation: "Heterosis is the superior vigour or yield of a cross between genetically different parents.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is a **three-way** maize hybrid produced?",
    options: [
      ["Single cross (A × B) crossed with inbred C", "Correct: (A × B) × C."],
      ["Inbred A crossed with inbred B", "That is a single cross."],
      ["Single cross (A × B) crossed with single cross (C × D)", "That is a double cross."],
      ["Inbred A self-pollinated for three generations", "Selfing produces inbred lines, not hybrids."],
    ],
    answer: "A",
    explanation: "Single cross: A × B. Three-way: (A × B) × C. Double cross: (A × B) × (C × D).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are the tassels removed from the female rows in a hybrid maize seed field?",
    options: [
      ["So their silks receive pollen only from the male rows", "Correct: it prevents self- and sib-pollination."],
      ["So the plants put more energy into growing leaves", "That is not the purpose of detasselling."],
      ["To stop stalk borers entering through the tassels", "Detasselling is not a pest control measure."],
      ["So the male rows can be harvested for seed", "Seed is harvested from the female rows."],
    ],
    answer: "A",
    explanation: "Detasselling ensures every seed on the female rows is a cross with the chosen male parent.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which is a main aim of crop breeding?",
    options: [
      ["Resistance to pests and diseases", "Correct: one of the main aims, with yield, hardiness and quality."],
      ["Greater variation in plant height", "Breeders usually aim for uniformity."],
      ["Later maturity in dry regions", "Early maturity suits dry regions."],
      ["Seed that cannot germinate", "Seed must germinate to be useful."],
    ],
    answer: "A",
    explanation: "Breeding aims include yield, pest and disease resistance, hardiness, early maturity and quality.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why does a single-cross hybrid seed cost more than double-cross seed?",
    options: [
      ["Its female parent is a weak, low-yielding inbred", "Correct: in a double cross the female is a vigorous single cross."],
      ["Its plants are less uniform, so the seed fields need much more checking", "Single crosses are the most uniform hybrids."],
      ["It needs four inbred lines instead of two", "A double cross needs four; a single cross needs two."],
      ["Single-cross seed cannot be stored for long", "Storage life is not the reason for the price."],
    ],
    answer: "A",
    hints: ["Which plant does the seed grow on in each case?"],
    explanation: "Seed yield of the inbred female is low, so single-cross seed is expensive to produce.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer replants grain harvested from his hybrid maize. Why are the new plants uneven and lower-yielding?",
    options: [
      ["Alleles segregate in the F2, so the plants vary", "Correct: much of the hybrid vigour is lost."],
      ["Hybrid grain loses its food store in storage", "Storage is not the reason for the poor crop."],
      ["F2 plants cannot be pollinated by wind", "F2 plants are pollinated normally."],
      ["The F2 seed is always attacked by weevils", "Weevils are not the genetic reason."],
    ],
    answer: "A",
    hints: ["The harvested grain is the F2 generation."],
    explanation: "F2 plants are a mixture of genotypes, some like the weak inbred parents, so uniformity and vigour fall.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best distinguishes genetic modification from selective breeding?",
    options: [
      ["GM can move a chosen gene between unrelated species", "Correct: selective breeding only crosses related plants."],
      ["GM always produces higher yields than any bred variety", "Yield depends on the trait and conditions; this is not a defining difference."],
      ["Selective breeding changes genes; GM does not change them", "Both change the genetic make-up."],
      ["Selective breeding is done only in laboratories", "Selective breeding is done in fields by crossing and selecting."],
    ],
    answer: "A",
    hints: ["Think about which species the genes can come from."],
    explanation: "GM inserts specific genes directly, even from bacteria; selective breeding works through crossing and selection within related plants.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Inbred lines of maize are produced by repeated self-pollination.",
    answer: true,
    explanation: "True. Selfing for several generations makes them nearly homozygous and uniform.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Seed of an open-pollinated variety must be bought new every season because it loses its yield when replanted.",
    answer: false,
    explanation: "False. OPV seed can be saved for a few seasons if kept isolated; it is hybrid seed that must be bought each season.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of maize seed with its parents.",
    pairs: [
      ["Single cross", "Inbred A × inbred B"],
      ["Three-way cross", "Single cross (A × B) × inbred C"],
      ["Double cross", "Single cross (A × B) × single cross (C × D)"],
      ["Inbred line", "One plant self-pollinated for several generations"],
    ],
    explanation: "Know the parents of each hybrid type.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Loss of vigour after repeated self-pollination is called inbreeding {{blank:a}}. The removal of tassels from the female rows is called {{blank:b}}. The seed of a single cross is harvested from the {{blank:c}} rows.",
    blanks: [
      { id: "a", accepted: ["depression"] },
      { id: "b", accepted: ["detasselling", "detasseling"] },
      { id: "c", accepted: ["female", "seed parent"] },
    ],
    explanation: "Inbreeding depression; detasselling; seed is taken from the female rows.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Give the other name for hybrid vigour.",
    accepted: ["heterosis"],
    explanation: "Hybrid vigour is **heterosis**.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `In a trial, inbred lines yield ${LC} t/ha and ${LD} t/ha, and their F1 hybrid yields ${HY} t/ha. Calculate the heterosis as a percentage increase over the mean yield of the two parents, to the nearest whole number.`,
    value: het, unit: "%", tol: 0.5, wrong: [round(pct(HY - LD, LD), 1), round(pct(HY, mid), 1)],
    hints: ["Find the mean of the parents first.", "Increase ÷ parent mean × 100."],
    explanation: `Mean of parents = (${LC} + ${LD}) ÷ 2 = ${mid.toFixed(1)} t/ha. Increase = ${HY} − ${mid.toFixed(1)} = ${round(HY - mid, 2)} t/ha. Heterosis = ${round(HY - mid, 2)} ÷ ${mid.toFixed(1)} × 100 = ${round(het, 0)}%.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: `A hybrid crop yielded ${Y1} t/ha. Its grain was replanted and yielded ${Y2} t/ha. Calculate the percentage fall in yield, to the nearest whole number.`,
    value: drop, unit: "%", tol: 0.5, wrong: [round(Y1 - Y2, 1), round(pct(Y2, Y1), 0)],
    hints: ["Fall ÷ original yield × 100."],
    explanation: `Fall = ${Y1} − ${Y2} = ${round(Y1 - Y2, 1)} t/ha; ${round(Y1 - Y2, 1)} ÷ ${Y1} × 100 = ${drop}%.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `A seed field has ${ROWS} rows planted in a repeating pattern of ${FEM} female rows then ${MALE} male rows. How many rows must be detasselled?`,
    value: femaleRows, wrong: [ROWS - femaleRows, ROWS / FEM],
    explanation: `Each block has ${FEM + MALE} rows; ${ROWS} ÷ ${FEM + MALE} = ${ROWS / (FEM + MALE)} blocks; ${ROWS / (FEM + MALE)} × ${FEM} = ${femaleRows} female rows to detassel.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a single-cross maize hybrid is produced.",
    hints: ["Start with inbred lines and end with the harvest."],
    points: [
      "Two unrelated inbred lines are produced by self-pollinating for several generations.",
      "They are planted in alternating female and male rows in an isolated field.",
      "The tassels of the female rows are removed before they shed pollen (detasselling).",
      "The female rows are pollinated by the male rows and only the female rows are harvested for seed.",
    ],
    modelAnswer: "Inbred lines A and B are made by selfing for several generations. They are planted in an isolated field in rows of A (female) and B (male). Tassels are pulled from the A rows before pollen is shed, so A silks are pollinated by B. Only the A rows are harvested; their seed is the single cross A × B.",
    explanation: "Steps in order.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Compare open-pollinated varieties with hybrid maize for a smallholder farmer.",
    hints: ["Think of yield, seed cost and saving seed."],
    points: [
      "Hybrids yield more (heterosis) and are more uniform.",
      "Hybrid seed must be bought every season and costs more.",
      "OPV seed can be saved and replanted for a few seasons, reducing cost.",
      "OPVs yield less, but suit farmers with little money or in low-input conditions.",
    ],
    modelAnswer: "Hybrids give higher, more uniform yields, but the seed is expensive and must be bought every season. OPV seed can be saved and replanted, so it is cheap, but yields are lower; it suits farmers with little cash or where inputs are low.",
    explanation: "Balance yield against cost.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `A seed company's fictional trial near Harare gave these maize yields.\n\n${TRIAL_TABLE}`,
    hints: ["Mid-parent value = mean of the two inbred lines.", "The F2 is the grain of the hybrid, replanted."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the mean yield of the two inbred lines.",
        value: midPQ, unit: "t/ha", tol: 0.05, wrong: [5.2],
        explanation: `(2.2 + 3.0) ÷ 2 = ${midPQ.toFixed(1)} t/ha.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the heterosis of the single cross as a percentage above this mean, to the nearest whole number.",
        value: hetPQ, unit: "%", tol: 0.5, answer: String(round(hetPQ, 0)), wrong: [round(pct(7.0, midPQ), 0)],
        explanation: `(7.0 − ${midPQ.toFixed(1)}) ÷ ${midPQ.toFixed(1)} × 100 = ${round(hetPQ, 1)}%, about ${round(hetPQ, 0)}%.`,
      }),
      P.num({
        label: "(c)", stem: "Calculate the percentage fall in yield from the F1 to the F2, to the nearest whole number.",
        value: f2Fall, unit: "%", tol: 0.5, wrong: [70],
        explanation: `(7.0 − 4.9) ÷ 7.0 × 100 = ${f2Fall}%.`,
      }),
      P.short({
        label: "(d)", stem: "Name the process by which the inbred lines P and Q were produced.",
        accepted: ["self-pollination", "self pollination", "selfing", "inbreeding", "self-pollinating"],
        explanation: "Repeated self-pollination (inbreeding).",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why the inbred lines yield less than the open-pollinated variety.",
        points: ["Repeated selfing makes them homozygous at many genes.", "Harmful recessive alleles are expressed, causing inbreeding depression / loss of vigour."],
        explanation: "Inbreeding depression.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain the fall in yield from the F1 to the F2.",
        points: ["In the F2 the alleles segregate, giving a mixture of genotypes.", "Many plants are less heterozygous / resemble the inbred parents, so vigour and uniformity are lost."],
        explanation: "Segregation in the F2.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Using the data, advise a farmer who cannot afford hybrid seed every season.",
        points: [
          "Replanting hybrid grain (4.9 t/ha) still gives more than the OPV here, but the F2 is uneven and unpredictable.",
          "OPV seed (4.2 t/ha) can be saved and replanted for several seasons at little cost.",
          "Advice: grow an OPV and save seed (kept isolated), or buy fresh hybrid seed when possible; do not rely on F2 grain as seed.",
        ],
        explanation: "Interpret the data and make a reasoned recommendation.",
      }),
    ],
    explanation: "Calculate heterosis and the F2 fall, explain them genetically and apply them to seed choice.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "A plant breeder wants to produce maize seed that is cheaper for farmers than single-cross seed, using four inbred lines A, B, C and D.",
    hints: ["Which hybrid uses four inbreds?", "Why is seed cheaper when the female is a single cross?"],
    parts: [
      P.short({ label: "(a)", stem: "Name the type of hybrid that uses all four lines.", accepted: ["double cross", "double-cross", "double cross hybrid", "double-cross hybrid"], explanation: "(A × B) × (C × D) is a double cross." }),
      P.manual({
        label: "(b)", marks: 2, stem: "Outline the crosses needed to produce it.",
        points: ["Cross A × B and C × D to make two single crosses.", "Cross the two single crosses, (A × B) × (C × D), using one as the female (detasselled)."],
        explanation: "Two stages of crossing.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why this seed is cheaper to produce than single-cross seed.",
        points: ["The female parent is a vigorous single cross, not a weak inbred.", "So it produces much more seed per hectare, lowering the cost per bag."],
        explanation: "Seed yield of the female parent.",
      }),
      P.short({ label: "(d)", stem: "State **one** disadvantage of this hybrid compared with a single cross.", accepted: ["less uniform", "lower yield", "less uniform and lower yielding", "lower yield potential", "less uniformity", "more variable"], keywords: { any: ["uniform", "lower yield", "variab", "less yield"] }, explanation: "Double crosses are less uniform and usually yield less." }),
    ],
    explanation: "Double crosses trade some yield and uniformity for cheaper seed.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Discuss the advantages and disadvantages to farmers of growing genetically modified crops compared with conventionally bred varieties.",
    hints: ["Consider speed, traits possible, cost, safety concerns and regulation.", "Give a balanced judgement."],
    points: [
      "GM can add traits not available in the crop's relatives, e.g. a bacterial gene for insect resistance.",
      "Fewer pesticide sprays may be needed for insect-resistant GM crops, saving cost and labour.",
      "GM development can be faster than conventional breeding once methods exist.",
      "GM seed is often expensive and controlled by companies; farmers may not be allowed to save it.",
      "Concerns: gene flow to other crops or wild relatives, resistance developing in pests, consumer acceptance and market access; GM crops are strictly regulated and not permitted everywhere.",
      "Judgement: GM offers specific benefits, but conventional breeding is cheaper, widely accepted and still produces most improved varieties.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Genetic modification can give a crop a trait that conventional breeding cannot, because a gene can come from an unrelated organism; for example, insect-resistant varieties carry a gene from a soil bacterium, which can reduce spraying. Once methods are in place, a trait can be added faster than by many generations of crossing and selection. However, GM seed is usually expensive, owned by companies and often cannot be saved. There are concerns about genes spreading to other crops, pests becoming resistant, and consumers or export markets refusing GM products; many countries regulate or restrict GM crops. Conventional breeding is slower but cheaper, widely accepted and has produced the hybrids and open-pollinated varieties most farmers use. For most smallholders, well-bred conventional varieties remain the practical choice, while GM may help with specific pest problems where it is permitted.",
    explanation: "Balance benefits and concerns and reach a judgement.",
  });

  b.card("DEFINITION", "Heterosis", "Greater vigour or yield of F1 offspring of genetically different parents (hybrid vigour).");
  b.card("DEFINITION", "Inbred line", "Nearly homozygous line made by self-pollinating for several generations; uniform but weak.");
  b.card("CONCEPT", "Types of maize hybrid", "Single: A × B. Three-way: (A × B) × C. Double: (A × B) × (C × D).");
  b.card("CONCEPT", "Why buy hybrid seed each season?", "Grain is F2: alleles segregate, plants vary and lose hybrid vigour, so yields fall.");
  b.card("CONCEPT", "Open vs controlled pollination", "Open: natural, pollen parent unknown. Controlled: breeder chooses pollen (bagging, detasselling).");
  b.card("CONCEPT", "Aims of crop breeding", "Yield, pest and disease resistance, hardiness (drought, heat), early maturity, quality, uniformity.");
  b.card("FACT", "Why is single-cross seed expensive?", "It is produced on a weak inbred female that yields little seed.");
  b.card("CONCEPT", "Selective breeding vs GM", "Selective: cross related plants and select over generations. GM: insert chosen genes directly, even from other species.");
  b.card("FORMULA", "Heterosis over the mid-parent (%)", "(F1 yield − mean of parents) ÷ mean of parents × 100.");
});
