// Slice W4a: reproduction in poultry and the egg (ZIMSEC only).
import { concept, P, pct, round, check, table } from "../lib.mjs";

// Num: yolk share of a 55 g egg.
const E = { egg: 55, shell: 5.5, alb: 33, yolk: 16.5 };
check(E.shell + E.alb + E.yolk === E.egg, "egg");
const yolkPct = pct(E.yolk, E.egg);
check(Math.abs(yolkPct - 30) < 1e-9, "yolk");
// Struct: incubation results of three batches.
const BATCH = [["Batch 1 (cock aged 1 year)", 90, 81, 72], ["Batch 2 (cock aged 4 years)", 90, 54, 48], ["Batch 3 (eggs stored 3 weeks)", 90, 80, 44]];
const fert = BATCH.map(([, s, f]) => pct(f, s));
const hatchFertile = BATCH.map(([, , f, h]) => pct(h, f));
check(fert[0] === 90 && Math.abs(fert[1] - 60) < 1e-9 && Math.abs(hatchFertile[0] - 88.8889) < 1e-3 && Math.abs(hatchFertile[2] - 55) < 1e-9, "batch");
const BATCH_TABLE = table(["Batch", "Eggs set", "Fertile at candling", "Chicks hatched"], BATCH);
// Calc: hatchability of eggs set.
const hSet = pct(63, 75);
check(hSet === 84, "hset");

concept("agri.livestock.poultry-reproduction", { file: "livestock/poultry-reproduction", keyPrefix: "livestock.poultry-reproduction" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which part of the hen's oviduct secretes the albumen (egg white)?",
    options: [
      ["Magnum", "Correct: the longest part of the oviduct."],
      ["Infundibulum", "The infundibulum catches the yolk; fertilisation happens there."],
      ["Isthmus", "The isthmus adds the shell membranes."],
      ["Uterus (shell gland)", "The uterus adds the shell."],
    ],
    answer: "A",
    explanation: "The magnum adds the albumen in about three hours.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Where in the hen does fertilisation of the egg take place?",
    options: [
      ["Infundibulum", "Correct: sperm meet the yolk as it enters the oviduct."],
      ["Ovary", "The ovary releases the yolk; it is not fertilised there."],
      ["Uterus (shell gland)", "Once the shell is forming, sperm can no longer reach the germinal disc."],
      ["Cloaca", "The cloaca is where sperm are received, not where fertilisation happens."],
    ],
    answer: "A",
    explanation: "The infundibulum (funnel) catches the yolk, and fertilisation occurs there before the albumen is added.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the function of the chalazae in an egg?",
    options: [
      ["They hold the yolk in the centre of the egg", "Correct: twisted cords of albumen anchor the yolk."],
      ["They seal the pores of the shell against bacteria", "This is the cuticle (bloom)."],
      ["They supply air to the chick before hatching", "This is the air cell."],
      ["They are the part that develops into the chick when the egg is fertile and incubated", "That is the germinal disc."],
    ],
    answer: "A",
    explanation: "The chalazae keep the yolk suspended so the germinal disc is protected.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Where are the testes of a cock found?",
    options: [
      ["Inside the body cavity, near the kidneys", "Correct: birds have no scrotum."],
      ["In a scrotum below the vent", "Birds have no scrotum."],
      ["In the crop, near the base of the neck", "The crop is part of the digestive system."],
      ["Under the skin of the comb and wattles on the head", "The comb is a secondary sexual feature, not a site of the testes."],
    ],
    answer: "A",
    explanation: "The two bean-shaped testes lie along the backbone near the kidneys.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which part of the oviduct makes the shell, and what is the shell made of?"],
    stem: "A flock of layers lays many soft-shelled eggs. Which nutrient is most likely to be short in their feed?",
    options: [
      ["Calcium", "Correct: the shell is calcium carbonate formed in the uterus."],
      ["Carbohydrate", "Energy shortage reduces laying but is not the usual cause of soft shells."],
      ["Vitamin C", "Poultry make their own vitamin C."],
      ["Fibre, because the gizzard needs it to grind the food properly", "Fibre does not form the shell."],
    ],
    answer: "A",
    explanation: "Layers need much calcium (limestone or shell grit and layer mash) to form shells; disease can also cause soft shells.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What happens to an egg's contents as it loses water?"],
    stem: "When an egg is candled, a large air cell is seen. What does this most likely show?",
    options: [
      ["The egg is old", "Correct: the air cell enlarges as water evaporates through the pores."],
      ["The egg is fertile", "Fertility is shown by an embryo and blood vessels, not the air cell."],
      ["The egg has a double yolk", "A double yolk shows as two yolk shadows."],
      ["The egg was laid by a very young pullet that has only just started laying eggs", "Young pullets lay small eggs; air cell size shows age of the egg."],
    ],
    answer: "A",
    explanation: "Fresh eggs have a small air cell; as eggs age they lose water and the air cell grows.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Which two parts of the egg are most damaged by washing?"],
    stem: "Why should eggs meant for hatching or storage not be scrubbed and washed?",
    options: [
      ["Washing removes the cuticle, letting bacteria enter through the pores", "Correct: the bloom seals the pores."],
      ["Water dissolves the calcium carbonate of the shell", "Water does not dissolve the shell in this way."],
      ["Washing kills the sperm stored in the egg before it is incubated", "Fertilisation happened in the hen; there are no free sperm to kill."],
      ["The yolk absorbs water and bursts", "Water does not pass in like this during washing."],
    ],
    answer: "A",
    explanation: "The cuticle (bloom) is a natural seal; washing removes it, so collect clean eggs from clean nests instead.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A hen must mate with a cock before she can lay eggs.",
    answer: false,
    explanation: "False. Hens lay without a cock; the cock is needed only for fertile eggs that can hatch.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In the hen, only the left ovary and the left oviduct are functional.",
    answer: true,
    explanation: "True. The right ovary and oviduct stay small and do not work.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of the oviduct with what it adds to the egg.",
    pairs: [
      ["Infundibulum", "Site of fertilisation; chalazae begin"],
      ["Magnum", "Albumen"],
      ["Isthmus", "Shell membranes"],
      ["Uterus (shell gland)", "Hard calcium carbonate shell"],
      ["Vagina", "Cuticle; egg is laid"],
    ],
    explanation: "The order down the oviduct is infundibulum, magnum, isthmus, uterus, vagina.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Fertile hen eggs hatch after about {{blank:a}} days of incubation, and the part of the yolk that develops into the chick is the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["21", "twenty-one", "twenty one"] },
      { id: "b", accepted: ["germinal disc", "blastodisc", "blastoderm", "germinal disk"] },
    ],
    explanation: "Incubation lasts 21 days; the embryo develops from the germinal disc.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the space between the two shell membranes at the broad end of an egg.",
    accepted: ["air cell", "air space", "air sac", "the air cell"],
    keywords: { any: ["air"] },
    explanation: "The **air cell** supplies air to the chick just before hatching and grows as the egg ages.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["Percentage = part ÷ whole × 100."],
    stem: `A ${E.egg} g egg contains ${E.shell} g of shell, ${E.alb} g of albumen and ${E.yolk} g of yolk. Calculate the yolk as a percentage of the egg mass.`,
    value: yolkPct, unit: "%", tol: 0.05, answer: "30", wrong: [round(pct(E.yolk, E.alb), 1), E.yolk],
    explanation: `${E.yolk} ÷ ${E.egg} × 100 = ${yolkPct}%. Dividing by the albumen mass instead of the whole egg gives 50%.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Hatchability of eggs set = chicks ÷ eggs set × 100."],
    stem: "Tendai sets 75 eggs under broody hens and in a small incubator, and 63 chicks hatch. Calculate the hatchability as a percentage of the eggs set.",
    value: hSet, unit: "%", tol: 0, wrong: [round(pct(75, 63), 1), 63],
    explanation: `63 ÷ 75 × 100 = ${hSet}%. Dividing the other way round gives more than 100%, which is impossible.`,
    workedSolution: "1. Hatchability = chicks hatched ÷ eggs set × 100.\n2. = 63 ÷ 75 × 100 = 84%.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Follow the yolk from the ovary to the vent."],
    stem: "Describe how an egg is formed after the yolk is released from the ovary.",
    points: [
      "The yolk is caught by the infundibulum, where it may be fertilised and the chalazae begin.",
      "In the magnum the albumen is added (about 3 hours).",
      "In the isthmus the inner and outer shell membranes are added.",
      "In the uterus (shell gland) the shell is formed (about 20 hours); the vagina adds the cuticle and the egg is laid through the cloaca.",
    ],
    modelAnswer: "The infundibulum catches the yolk and fertilisation can occur there. The magnum adds albumen, the isthmus adds the shell membranes and the uterus adds the hard shell over about 20 hours. The vagina adds the bloom and the egg is laid through the cloaca and vent.",
    explanation: "Part and what it adds, in order.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A farmer near Gokwe incubated three batches of eggs from indigenous chickens.\n\n${BATCH_TABLE}`,
    hints: ["Fertility = fertile ÷ set × 100.", "Hatchability of fertile eggs = hatched ÷ fertile × 100."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the fertility of batch 2 as a percentage.",
        value: fert[1], unit: "%", tol: 0, wrong: [54, round(pct(48, 90), 1)],
        explanation: `54 ÷ 90 × 100 = ${fert[1]}%.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the hatchability of the fertile eggs in batch 3, as a percentage.",
        value: hatchFertile[2], unit: "%", tol: 0, wrong: [round(pct(44, 90), 1), 44],
        explanation: `44 ÷ 80 × 100 = ${hatchFertile[2]}%. Using all 90 eggs set (${round(pct(44, 90), 1)}%) answers a different question.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why fertility was low in batch 2.",
        points: ["The cock was old (4 years), so his fertility / mating activity was lower.", "So fewer eggs were fertilised; replace old cocks with young, active ones (about one cock to ten hens)."],
        explanation: "Cock age.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why batch 3 had good fertility but poor hatchability.",
        points: ["The eggs were fertile, but storage for three weeks is too long.", "Embryos die during long storage (eggs lose water and the embryo weakens), so many fertile eggs failed to hatch; set eggs within about a week."],
        explanation: "Egg storage.",
      }),
    ],
    explanation: "Fertility and hatchability calculations and their causes.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, marks: 6,
    stem: "A described diagram of a hen's egg cut lengthways shows, from outside to inside: A, a hard outer layer with pores; B, two thin layers separated at the broad end by C, a space; D, a clear thick and thin jelly; E, two twisted cords; F, a yellow sphere with G, a small pale spot on its surface.",
    hints: ["Name each part in order from the outside."],
    parts: [
      P.short({
        label: "(a)", stem: "Name part E.",
        accepted: ["chalazae", "chalaza", "chalazas"],
        keywords: { any: ["chalaz"] },
        explanation: "E is the chalazae.",
      }),
      P.short({
        label: "(b)", stem: "Name part D.",
        accepted: ["albumen", "egg white", "white", "albumin"],
        explanation: "D is the albumen.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State the function of part A and of part C.",
        points: ["A (shell): protects the contents / pores allow gas exchange.", "C (air cell): supplies air to the chick before hatching."],
        explanation: "Shell and air cell.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why part G is important when eggs are incubated.",
        points: ["G is the germinal disc, which develops into the embryo/chick.", "Only if the egg was fertilised (the hen mated with a cock) can it develop."],
        explanation: "Germinal disc and fertility.",
      }),
    ],
    explanation: "Identify the parts of an egg from a described diagram and give their functions.",
  });

  b.card("FACT", "Parts of the hen's oviduct in order", "Infundibulum (fertilisation), magnum (albumen), isthmus (shell membranes), uterus/shell gland (shell), vagina (cuticle; laying).");
  b.card("FACT", "Cock's reproductive system", "Two testes inside the body near the kidneys; two sperm ducts open into the cloaca; mating by cloacal contact; no scrotum.");
  b.card("FACT", "Which ovary works in a hen?", "Only the left ovary and left oviduct develop.");
  b.card("FACT", "How long does an egg take to form?", "About a day (roughly 24-26 hours), most of it in the shell gland.");
  b.card("CONCEPT", "Cuticle (bloom)", "Thin coat sealing the shell pores against bacteria and water loss; washing removes it.");
  b.card("CONCEPT", "Chalazae and air cell", "Chalazae: cords holding the yolk central. Air cell: space at the broad end; air for the chick; grows as the egg ages.");
  b.card("FORMULA", "Fertility and hatchability", "Fertility = fertile ÷ set × 100. Hatchability = hatched ÷ fertile × 100 (or ÷ set).");
  b.card("CONCEPT", "Do hens need a cock to lay?", "No. A cock is needed only for fertile eggs; incubation of fertile eggs takes 21 days.");
});
