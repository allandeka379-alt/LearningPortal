// Slice W1a: tree nurseries, plantations and agroforestry (ZIMSEC only).
import { concept, P, plantPopulation, germinationPct, fmtNum, table, agricultureLevels } from "../lib.mjs";

const germ = { sown: 480, up: 432 };
const germValue = germinationPct(germ.up, germ.sown);

const pop3 = plantPopulation({ rowCm: 300, inRowCm: 300 });
const pop9 = plantPopulation({ rowCm: 400, inRowCm: 250, areaHa: 0.8 });
const withExtra = pop9.total * 1.15;

const NURSERY = [
  ["Day 0", "Seeds sown", 600],
  ["Day 14", "Seedlings emerged", 510],
  ["Day 21", "Seedlings collapsed at soil level (damping-off)", 45],
  ["Day 28", "Seedlings pricked out", 465],
];
const nurseryGerm = germinationPct(510, 600);
const lossPct = (45 / 510) * 100;

const WOODLOT = { lengthM: 120, widthM: 50, rowCm: 300, inRowCm: 200 };
const wlHa = (WOODLOT.lengthM * WOODLOT.widthM) / 10000;
const wlPop = plantPopulation({ rowCm: WOODLOT.rowCm, inRowCm: WOODLOT.inRowCm, areaHa: wlHa });

concept("agri.forestry.nursery-plantation", { file: "forestry/nursery-plantation", keyPrefix: "forestry.nursery-plantation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **pricking out** in a tree nursery?",
    options: [
      ["Moving young seedlings from a seedbed into pots", "Correct: seedlings are transferred at about the first true leaf stage."],
      ["Cutting the lower branches off young trees", "This is pruning."],
      ["Removing weak trees from a plantation", "This is thinning."],
      ["Reducing water and shade in the weeks before planting out", "This is hardening off."],
    ],
    answer: "A",
    explanation: "Pricking out transfers small seedlings from a seedbed into tubes or pots, where each can develop its own root ball.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the most important requirement of a tree nursery site?",
    options: [
      ["A reliable water supply close by", "Correct: seedlings need watering every day."],
      ["A steep slope facing the wind", "Steep, windy sites wash away and dry out seedlings."],
      ["Shade from a large tree overhead", "Large trees compete for water and nutrients and give too much shade."],
      ["Distance from the homestead", "The nursery should be near for supervision and security."],
    ],
    answer: "A",
    explanation: "A nursery needs water, good drainage, shelter, security, good soil and protection from livestock and frost.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are hard-coated tree seeds soaked in hot water before sowing?",
    options: [
      ["To soften the coat so that water can enter the seed", "Correct: pre-treatment breaks the hard coat's dormancy."],
      ["To kill the embryo so the seed does not rot", "A dead embryo cannot germinate."],
      ["To remove all the food stored in the seed", "The stored food is needed for germination."],
      ["To make the seeds float so that they are easier to sow", "Floating seeds are often empty or damaged; this is not the purpose."],
    ],
    answer: "A",
    explanation: "Hot-water soaking or nicking (scarification) lets water into hard seeds, so germination is faster and more even.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the purpose of **hardening off** seedlings?",
    options: [
      ["To toughen them for field conditions before planting out", "Correct: less water and shade prepares them for the field."],
      ["To make the wood of the seedlings harder for later use as timber", "Hardening off does not change timber quality."],
      ["To kill weeds growing in the pots", "Weeding is done by hand; hardening off is about the seedlings."],
      ["To speed up germination of the seeds", "Hardening off is done weeks after germination."],
    ],
    answer: "A",
    explanation: "Gradually reducing water and shade before planting out reduces transplanting shock and losses in the field.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "When should seedlings from a nursery be planted out in a woodlot in Zimbabwe?",
    options: [
      ["At the start of the rainy season, after good rains", "Correct: the soil is moist and the young trees have a whole season to establish."],
      ["In the middle of the hot, dry season", "Seedlings would die of drought."],
      ["Just before the frost season", "Frost could kill young seedlings."],
      ["At any time of year, as long as they are watered once", "One watering is not enough to establish trees in dry soil."],
    ],
    answer: "A",
    explanation: "Planting at the start of the rains, once the soil is wet, gives the trees the longest moist period to establish roots.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Many young seedlings in a nursery collapse at soil level and die. The beds are watered heavily twice a day. What is the most likely cause?",
    options: [
      ["Damping-off, a fungal disease favoured by overwatering", "Correct: wet, crowded conditions favour damping-off fungi."],
      ["Frost damage during hot afternoons", "Frost does not occur on hot afternoons."],
      ["Too little nitrogen in the potting mixture used to fill the tubes", "Nitrogen shortage causes yellowing, not collapse at soil level."],
      ["Termites eating the leaves", "Termites attack roots and stems, but collapse with overwatering points to damping-off."],
    ],
    answer: "A",
    explanation: "Damping-off fungi attack the stem at soil level. Avoid overwatering and overcrowding, and use clean potting mixture.",
    hints: ["Think about what heavy watering encourages."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the main difference between **thinning** and **pruning** in a plantation?",
    options: [
      ["Thinning removes whole trees; pruning removes branches", "Correct."],
      ["Thinning removes branches; pruning removes whole trees", "This is the wrong way round."],
      ["Both remove whole trees, at different ages", "Pruning removes branches only."],
      ["Both remove roots to slow the trees' growth", "Neither operation removes roots."],
    ],
    answer: "A",
    explanation: "Thinning gives the remaining trees more space; pruning gives knot-free timber and reduces fire risk.",
    hints: ["Which one leaves every tree standing?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A farmer's soil is losing fertility and her goats lack feed in the dry season. Which agroforestry practice best addresses both problems?",
    options: [
      ["Alley cropping with nitrogen-fixing fodder trees", "Correct: prunings add nitrogen and mulch, and leaves feed the goats."],
      ["A boundary of ornamental jacarandas", "Jacarandas give shade but neither fodder nor nitrogen."],
      ["A pine woodlot on the best arable land", "Pines give timber, not fodder or nitrogen, and take the best land."],
      ["Clearing all trees from the field", "This reduces fertility and fodder further."],
    ],
    answer: "A",
    explanation: "Nitrogen-fixing fodder trees in alley cropping improve soil fertility through litter and prunings and provide dry-season feed.",
    hints: ["Look for one practice that gives both nitrogen and feed."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Agroforestry means growing trees together with crops and/or livestock on the same land.",
    answer: true,
    explanation: "True. The trees, crops and animals interact to benefit the farmer.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Pruning the lower branches of plantation trees increases the risk of fire reaching the tree crowns.",
    answer: false,
    explanation: "False. Pruning removes the 'ladder' of low branches, so a ground fire is less likely to climb into the crowns.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each operation with its purpose.",
    pairs: [
      ["Pitting", "Preparing loose, enriched soil for each tree before planting"],
      ["Beating up", "Replacing seedlings that died after planting"],
      ["Thinning", "Giving the best trees more space to grow"],
      ["Root pruning", "Stopping nursery roots growing into the ground"],
      ["Ring weeding", "Removing competition around each young tree"],
    ],
    explanation: "Each operation has a specific aim in raising or managing trees.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "Growing crops between rows of trees whose prunings are used as mulch is called {{blank:a}} cropping. Regrowth of eucalyptus from the stump after cutting is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["alley"], choices: ["alley", "relay", "strip", "mixed"] },
      { id: "b", accepted: ["coppicing"], choices: ["coppicing", "grafting", "budding", "layering"] },
    ],
    explanation: "Alley cropping is an agroforestry practice; coppicing lets eucalyptus give several harvests from one planting.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the fungal disease that makes nursery seedlings collapse at soil level.",
    accepted: ["damping off", "damping-off", "dampingoff"],
    wrong: ["wilt"],
    explanation: "Damping-off is favoured by overwatering, overcrowding and dirty potting mixture.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `${germ.sown} tree seeds were sown and ${germ.up} germinated. Calculate the germination percentage.`,
    value: germValue, unit: "%", wrong: [germ.sown / germ.up * 100, 10],
    explanation: `Germination % = ${germ.up} ÷ ${germ.sown} × 100 = ${germValue}%.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Eucalyptus is planted at a spacing of 3 m × 3 m. Calculate the number of trees per hectare, to the nearest whole number.",
    value: pop3.perHa, tol: 0.5, answer: String(Math.round(pop3.perHa)), unit: "plants/ha", wrong: [11, 3333],
    explanation: `Area per tree = 3 × 3 = 9 m². Trees per ha = 10,000 ÷ 9 = ${Math.round(pop3.perHa)}.`,
    workedSolution: `1. Area per tree = 3 m × 3 m = 9 m².\n2. Trees per ha = 10,000 m² ÷ 9 m².\n3. = ${pop3.perHa.toFixed(1)}, about ${Math.round(pop3.perHa)} trees.`,
    hints: ["Find the area each tree occupies.", "1 ha = 10,000 m²."],
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "A 0.8 ha woodlot is to be planted at 4 m × 2.5 m. The farmer orders 15% extra seedlings for beating up. How many seedlings should be ordered?",
    value: withExtra, tol: 0.5, answer: String(Math.round(withExtra)), unit: "plants", wrong: [pop9.total, pop9.perHa * 1.15],
    explanation: `Area per tree = 4 × 2.5 = 10 m²; trees per ha = 1,000; for 0.8 ha = ${fmtNum(pop9.total)}; with 15% extra = ${fmtNum(pop9.total)} × 1.15 = ${Math.round(withExtra)}.`,
    workedSolution: `1. Area per tree = 4 × 2.5 = 10 m².\n2. Trees per ha = 10,000 ÷ 10 = 1,000.\n3. Trees for 0.8 ha = 1,000 × 0.8 = ${fmtNum(pop9.total)}.\n4. With 15% extra = ${fmtNum(pop9.total)} × 1.15 = ${Math.round(withExtra)} seedlings.`,
    hints: ["Trees per ha first, then multiply by the area.", "Add 15% at the end."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** steps in establishing a woodlot from nursery seedlings.",
    points: [
      "Clear the land and make fire guards.",
      "Mark out planting positions at the chosen spacing and dig pits, refilling with topsoil and manure.",
      "Plant at the start of the rainy season after good rains, removing the polythene tube without breaking the root ball.",
      "Firm the soil, water if possible, and protect the trees from livestock and termites / beat up dead seedlings.",
    ],
    modelAnswer: "Clear the site and make fire guards. Mark out the spacing and dig pits, refilling them with topsoil and manure. Plant after the first good rains, removing the tube carefully. Firm the soil, water, and fence the woodlot against livestock.",
    explanation: "Steps should be in a sensible order.",
    hints: ["From clearing the land to protecting the young trees."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** benefits and **two** problems of agroforestry for a smallholder.",
    points: [
      "Benefit: nitrogen-fixing trees and leaf litter improve soil fertility.",
      "Benefit: products (fodder, firewood, fruit, poles) / erosion control / windbreak and shade / diversified income.",
      "Problem: trees compete with crops for light, water and nutrients.",
      "Problem: trees take years to give returns / need labour for pruning / may harbour pests or birds.",
    ],
    modelAnswer: "Nitrogen-fixing trees add nutrients, so crops need less fertiliser, and the trees give firewood and fodder. However, trees shade and compete with crops for water, and they take several years before they give any return.",
    explanation: "Two benefits and two problems, each explained.",
    hints: ["Think about soil, products, competition and time."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", calculator: true,
    stem: `Table 1 shows a fictional school nursery's records for one batch of eucalyptus.\n\n**Table 1**\n\n${table(["Day", "Event", "Number"], NURSERY)}`,
    hints: ["Germination % = emerged ÷ sown × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the germination percentage.", value: nurseryGerm, unit: "%", wrong: [15], explanation: `510 ÷ 600 × 100 = ${nurseryGerm}%.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage of emerged seedlings lost to damping-off. Give your answer to one decimal place.", value: lossPct, tol: 0.05, answer: String(Math.round(lossPct * 10) / 10), unit: "%", wrong: [7.5], explanation: `45 ÷ 510 × 100 = ${Math.round(lossPct * 10) / 10}%. (Dividing by 600 sown gives 7.5%, the wrong base.)` }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest **two** ways of reducing damping-off in the next batch.", points: [
        "Water less often / avoid overwatering; ensure good drainage.",
        "Sow thinly (avoid overcrowding) / use clean or sterilised potting mixture / good ventilation.",
      ], explanation: "Damping-off is favoured by wet, crowded, dirty conditions." }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe how the pricked-out seedlings should be prepared before they are planted in the field.", points: [
        "Harden off: gradually reduce watering and remove shade over the last few weeks.",
        "Root prune by moving the tubes so roots do not grow into the ground.",
      ], explanation: "Hardening off and root pruning prepare seedlings for transplanting." }),
    ],
    explanation: "Germination was 85%; damping-off losses could be reduced by better water management and hygiene.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Paper 2", calculator: true,
    stem: `A school plans a eucalyptus woodlot on a plot measuring ${WOODLOT.lengthM} m by ${WOODLOT.widthM} m, at a spacing of 3 m between rows and 2 m within rows, to supply firewood and building poles.`,
    hints: ["Convert the plot area to hectares first.", "For (c), think about the whole life of the woodlot."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the area of the plot in hectares.", value: wlHa, unit: "ha", wrong: [WOODLOT.lengthM * WOODLOT.widthM], explanation: `${WOODLOT.lengthM} × ${WOODLOT.widthM} = ${fmtNum(WOODLOT.lengthM * WOODLOT.widthM)} m² = ${wlHa} ha.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the number of trees needed to plant the plot.", value: (WOODLOT.lengthM * WOODLOT.widthM) / 6, unit: "plants", wrong: [Math.round(wlPop.perHa)], explanation: `Area per tree = 3 × 2 = 6 m²; trees = ${fmtNum(WOODLOT.lengthM * WOODLOT.widthM)} ÷ 6 = ${fmtNum(wlPop.total)}.` }),
      P.manual({ label: "(c)", marks: 8, stem: "Discuss how the school should manage the woodlot from planting until the first harvest so that it supplies good poles and firewood.", points: [
        "Ring weeding around young trees until the canopy closes.",
        "Beating up: replace dead seedlings in the first season.",
        "Fire guards cleared every year before the dry season.",
        "Protection from livestock (fencing) and termites.",
        "Pruning lower branches for straight, knot-free poles and to keep fire on the ground.",
        "Thinning weak or crooked trees so the best grow larger; thinnings used as firewood.",
        "Harvest poles at a suitable size; eucalyptus coppices, giving further harvests.",
        "Judgement on the most critical operations (e.g. weeding and fire protection in the first years, when losses are greatest).",
      ], levels: agricultureLevels(8), explanation: "Credit management operations in a logical order with reasons." }),
    ],
    explanation: `The ${wlHa} ha plot needs ${fmtNum(wlPop.total)} trees; good management protects them and shapes them for poles.`,
  });

  b.card("DEFINITION", "Tree nursery", "A place where tree seedlings are raised and cared for until they are ready to plant out.");
  b.card("DEFINITION", "Pricking out", "Transferring young seedlings from a seedbed into individual pots or tubes.");
  b.card("DEFINITION", "Hardening off", "Gradually reducing water and shade before planting out so seedlings survive field conditions.");
  b.card("CONCEPT", "Nursery site requirements", "Near water, well drained, sheltered but not under big trees, secure and fenced, good soil, not a frost hollow.");
  b.card("CONCEPT", "Thinning versus pruning", "Thinning removes whole trees to give space; pruning removes lower branches for knot-free timber and fire control.");
  b.card("DEFINITION", "Beating up", "Replacing seedlings that die after planting out.");
  b.card("DEFINITION", "Agroforestry", "Growing trees together with crops and/or livestock on the same land for mutual benefit.");
  b.card("CONCEPT", "Agroforestry practices", "Alley cropping, boundary planting, windbreaks, improved fallows, fodder banks, scattered trees, woodlots.");
  b.card("FORMULA", "Trees per hectare", "Trees/ha = 10,000 ÷ (row spacing in m × in-row spacing in m).");
});
