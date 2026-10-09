// Slice W3a: orchard establishment and fruit production (ZIMSEC only; tagged automatically).
import { concept, P, field, waterVolume, round, check, table, fmtNum } from "../lib.mjs";

// Q: trees in a 96 m x 48 m block at 8 m x 8 m.
const blk = field(96, 48);
const blkTrees = blk.m2 / 64;
check(blkTrees === 72, "blk");
// Q: triangular trees per ha at 7 m.
const triHa = 10000 / (0.866 * 49);
check(Math.abs(triHa - 235.66) < 0.01, "tri");
// Q: AN for 150 trees aged 3 at 120 g per tree per year.
const anKg = (150 * 3 * 120) / 1000;
const anBags = Math.ceil(anKg / 50 - 1e-9);
check(anKg === 54 && anBags === 2, "an");
// Q: water per basin radius 1.5 m, 30 mm.
const basin15 = waterVolume({ areaM2: Math.PI * 1.5 ** 2, depthMm: 30 });
check(Math.abs(basin15.litres - 212.06) < 0.01, "basin15");

// Struct: site choice table.
const SITES = [["P", "Valley floor beside a stream", "Deep, often waterlogged clay", "Frost most winters"], ["Q", "Gentle slope above the valley", "Deep, well-drained loam", "No frost"], ["R", "Steep, rocky hillside", "Shallow, stony soil", "No frost"]];
const SITE_TABLE = table(["Site", "Position", "Soil", "Frost"], SITES);

// Struct: orchard plan.
const ORCH = field(80, 56);
const oTrees = ORCH.m2 / (8 * 7);
const oKg = (oTrees * 2 * 150) / 1000;
const oWater = waterVolume({ areaM2: Math.PI * 1.2 ** 2, depthMm: 35 });
const oTotal = oWater.litres * oTrees;
const oTotal10 = Math.round(oTotal / 10) * 10;
check(oTrees === 80 && oKg === 24 && Math.abs(oWater.litres - 158.34) < 0.01 && oTotal10 === 12670, "orch");

concept("agri.crops.orchards", { file: "crops/orchards", keyPrefix: "crops.orchards" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a deciduous fruit tree?",
    options: [
      ["Peach", "Correct: it sheds its leaves in winter and needs chilling."],
      ["Mango", "Mango is an evergreen tropical fruit."],
      ["Orange", "Citrus trees are evergreen."],
      ["Banana", "Banana is a tropical evergreen herb, not a tree."],
    ],
    answer: "A",
    explanation: "Deciduous fruits (apples, peaches, plums, grapes) lose their leaves in winter.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why should citrus not be planted on a valley floor where cold air collects?",
    options: [
      ["Frost forms there and damages the trees and fruit", "Correct: cold air drains downhill into frost pockets."],
      ["Valley floors receive far too much sunshine for citrus", "Sunshine is not the problem."],
      ["Citrus needs a winter chilling period", "Chilling is needed by deciduous fruit, not citrus."],
      ["Valley soils are always too sandy", "Valley soils are often heavy and wet, not sandy."],
    ],
    answer: "A",
    explanation: "Plant frost-sensitive fruit on gentle slopes, from which cold air drains away.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the purpose of a planting board when planting fruit trees?",
    options: [
      ["To plant each tree exactly where its peg was", "Correct: the end pegs fix the position after digging."],
      ["To measure the depth of the hole", "It is not a depth gauge."],
      ["To carry the tree to the hole", "It does not carry trees."],
      ["To shade the young tree for a few weeks after planting", "Shade is given in other ways."],
    ],
    answer: "A",
    explanation: "The board is set on the peg before digging and replaced on its end pegs afterwards, so rows stay straight.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha is filling a planting hole for a mango tree. What should go back round the roots?",
    options: [
      ["Topsoil mixed with manure and a phosphate fertiliser", "Correct: fertile topsoil and organic matter feed the new roots."],
      ["Subsoil mixed with a few handfuls of ammonium nitrate", "Subsoil is infertile, and concentrated nitrogen can scorch roots."],
      ["Sand only, to improve drainage", "Sand alone holds few nutrients and little water."],
      ["Fresh, unrotted manure only", "Fresh manure can burn roots as it heats and decomposes."],
    ],
    answer: "A",
    hints: ["Which soil layer is most fertile?"],
    explanation: "Keep topsoil and subsoil apart when digging and return enriched topsoil round the roots.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why must the bud union of a citrus tree be well above the soil at planting?",
    options: [
      ["Soil against it lets disease in and lets the scion form roots", "Correct: the rootstock's benefits would be lost."],
      ["The union needs sunlight to photosynthesise", "The union is not a photosynthetic organ."],
      ["Water and nutrients can only enter the tree through the union", "Water enters through the roots."],
      ["It makes the tree flower sooner", "Depth of union does not control flowering time like this."],
    ],
    answer: "A",
    hints: ["What is the rootstock for?"],
    explanation: "The rootstock gives vigour and disease resistance; burying the union defeats it and invites collar rot.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How many plants are normally kept in each banana stool after desuckering?",
    options: [
      ["Three: a mother, a daughter and a granddaughter", "Correct: this gives a continuous supply of bunches."],
      ["One: the mother plant only", "Then there would be a gap after the mother is harvested."],
      ["Ten or more, to raise the yield", "Too many suckers compete and bunches are small."],
      ["None: banana stools are dug out and replanted every year", "Banana stools are kept for several years."],
    ],
    answer: "A",
    explanation: "Removing extra suckers reduces competition so that each bunch is large.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which sign shows that a mango is mature enough to pick?",
    options: [
      ["The shoulders have risen above the stalk end", "Correct: with flesh yellowing near the stone."],
      ["The fruit is still small and hard and dark green", "These are signs of immature fruit."],
      ["The tree has just begun to flower", "Flowering comes months before maturity."],
      ["Black spots cover the whole skin", "Spots usually indicate disease, not maturity."],
    ],
    answer: "A",
    hints: ["Look at the shape near the stalk."],
    explanation: "Rising shoulders, colour change and yellow flesh near the stone show maturity.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Compared with the square system at the same spacing, about how many more trees per hectare does the triangular (equilateral) system hold?",
    options: [
      ["About 15% more", "Correct: each tree occupies 0.866 of the square area."],
      ["About 50% more", "Far too high."],
      ["Exactly the same number", "The triangular system packs trees more closely."],
      ["About 15% fewer", "The triangular system fits more, not fewer."],
    ],
    answer: "A",
    hints: ["Area per tree is 0.866 × spacing² instead of spacing²."],
    explanation: "1 ÷ 0.866 = 1.155, so about 15.5% more trees.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A fire guard is a strip cleared of grass around an orchard to stop veld fires entering it.",
    answer: true,
    explanation: "True. Fire guards are prepared before the dry season.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Deciduous fruit trees such as apples are pruned mainly while they are dormant in winter.",
    answer: true,
    explanation: "True. Without leaves the framework is easy to see and the tree is not actively growing.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each pruning task with its purpose.",
    pairs: [
      ["Training young trees to an open centre", "Build a strong framework that lets in light"],
      ["Removing dead and diseased branches", "Keep the tree healthy"],
      ["Removing suckers below the bud union", "Stop the rootstock competing with the scion"],
      ["Desuckering bananas", "Keep one mother, one daughter and one follower"],
    ],
    explanation: "Each kind of pruning has a purpose.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "In the {{blank:a}} planting pattern each tree is the same distance from six neighbours; in the {{blank:b}} pattern an extra tree is planted in the centre of each square.",
    blanks: [
      { id: "a", accepted: ["triangular", "equilateral", "equilateral triangle", "hexagonal"] },
      { id: "b", accepted: ["quincunx"] },
    ],
    explanation: "Triangular (equilateral) and quincunx patterns.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "An orchard block measures 96 m × 48 m and is planted on the square system at 8 m × 8 m. How many trees does it hold?",
    value: blkTrees, unit: "plants", tol: 0, wrong: [blk.m2 / 8, 18],
    explanation: `Area = 96 × 48 = ${fmtNum(blk.m2)} m²; area per tree = 64 m²; ${fmtNum(blk.m2)} ÷ 64 = ${blkTrees} trees.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Assume young citrus trees receive 120 g of ammonium nitrate per tree for each year of age. Calculate how many 50 kg bags are needed for 150 trees that are 3 years old. Round UP to whole bags.",
    value: anBags, unit: "bags", tol: 0, wrong: [1, anKg],
    hints: ["Grams per tree first, then total kilograms."],
    explanation: `Per tree = 120 × 3 = 360 g; 150 × 360 g = ${fmtNum(anKg * 1000)} g = ${anKg} kg; ${anKg} ÷ 50 = ${anKg / 50}, so ${anBags} bags. Rounding down to 1 bag leaves trees unfed.`,
    workedSolution: `1. Per tree = 120 g × 3 = 360 g.\n2. Total = 150 × 360 = ${fmtNum(anKg * 1000)} g = ${anKg} kg.\n3. Bags = ${anKg} ÷ 50 = ${anKg / 50}; round up to ${anBags}.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "A fruit tree has a circular basin of radius 1.5 m. Calculate the volume of water, in litres, needed to apply 30 mm of water to the basin, to the nearest litre. (Use π = 3.142 or your calculator.)",
    value: basin15.litres, unit: "L", tol: 0.6, answer: "212", wrong: [round(Math.PI * 1.5 * 30, 0), round(Math.PI * 3 ** 2 * 30, 0)],
    hints: ["Area of a circle = π r².", "1 mm of water on 1 m² = 1 L."],
    explanation: `Area = π × 1.5² = ${round(Math.PI * 2.25, 2)} m²; × 30 mm = ${round(basin15.litres, 1)} L ≈ 212 L. Using the diameter (3 m) as the radius gives about 848 L.`,
    workedSolution: `1. Basin area = π × 1.5² = ${round(Math.PI * 2.25, 3)} m².\n2. Volume = ${round(Math.PI * 2.25, 3)} m² × 30 mm = ${round(basin15.litres, 1)} L.\n3. To the nearest litre: 212 L.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Trees are planted on the triangular system 7 m apart, so that each tree occupies 0.866 × 7² m². Calculate the number of trees per hectare, rounded DOWN to whole trees.",
    value: Math.floor(triHa), unit: "plants/ha", tol: 0, wrong: [Math.floor(10000 / 49), Math.ceil(triHa)],
    hints: ["10,000 ÷ area per tree."],
    explanation: `Area per tree = 0.866 × 49 = ${round(0.866 * 49, 2)} m²; 10,000 ÷ ${round(0.866 * 49, 2)} = ${round(triHa, 1)}, so ${Math.floor(triHa)} whole trees. The square system gives only ${Math.floor(10000 / 49)}.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the branch of horticulture that deals with fruit growing.",
    accepted: ["pomology"],
    explanation: "**Pomology**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a planting hole for a citrus tree should be prepared.",
    hints: ["Think of size, soil layers and timing."],
    points: [
      "Dig the hole some weeks before planting, about 1 m wide and deep (large enough for the root system).",
      "Keep the topsoil and subsoil in separate heaps.",
      "Mix the topsoil with well-rotted manure or compost and a phosphate fertiliser.",
      "Refill the hole with the mixture and let it settle (water it) before planting.",
    ],
    modelAnswer: "A few weeks before planting, dig a hole about 1 m wide and deep, putting topsoil and subsoil in separate heaps. Mix the topsoil with rotted manure and phosphate, refill the hole with it and water it so that it settles before the tree is planted.",
    explanation: "Steps in order.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3,
    stem: "Suggest how irrigation of a young citrus orchard on sandy soil should differ from that of a mature orchard on clay soil.",
    hints: ["Think of root depth and how much water each soil holds."],
    points: [
      "Young trees have small, shallow root systems, so they need smaller amounts of water.",
      "Sandy soil holds little water, so water must be given more often (frequent, light irrigations).",
      "Mature trees on clay have deep roots and the soil stores more water, so larger amounts can be given less often.",
    ],
    modelAnswer: "The young trees on sand should get small amounts of water often, because their roots are shallow and sand holds little water. The mature trees on clay can be given more water less often, as their roots are deep and clay stores water.",
    explanation: "Scheduling by tree age and soil.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `A farmer near Mutare is choosing one of three sites for a new citrus orchard.\n\n${SITE_TABLE}`,
    hints: ["Citrus is frost-sensitive and deep-rooted."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which site is best for the orchard?",
        options: [
          ["Site Q", "Correct: no frost, deep well-drained loam, gentle slope."],
          ["Site P", "Frost and waterlogging would harm citrus."],
          ["Site R", "Shallow stony soil and steep slope are unsuitable."],
          ["P and R are equally good", "Both have serious problems."],
        ],
        answer: "A",
        explanation: "Q has deep, well-drained soil and no frost.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why frost forms on site P.",
        points: ["On cold, clear nights cold, dense air flows downhill.", "It collects in the low valley floor (a frost pocket)."],
        explanation: "Cold air drainage.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why site R is unsuitable for fruit trees.",
        points: ["Shallow stony soil restricts deep roots and holds little water, so trees suffer drought and may blow over.", "Steep slopes are prone to erosion and are hard to work, irrigate and harvest."],
        explanation: "Soil depth and slope.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "State **three** other factors the farmer should consider when siting the orchard.",
        points: ["A reliable water supply for irrigation nearby.", "Shelter from strong winds (windbreaks).", "Access to roads and markets / security from animals and theft."],
        explanation: "Other site factors.",
      }),
    ],
    explanation: "Choose a site for citrus and justify it.",
  });
  b.struct({
    d: 5, skill: "APPLICATION", examStyle: true, marks: 12, calculator: true,
    stem: "Tatenda is planting an orange orchard 80 m × 56 m on the rectangular system with rows 8 m apart and trees 7 m apart in the row. In the second year he will give each tree 150 g of ammonium nitrate per year of age. Each tree has a basin of radius 1.2 m, irrigated with 35 mm of water.",
    hints: ["Trees = area ÷ (8 × 7).", "Basin area = π r².", "1 mm on 1 m² = 1 L."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the number of trees.",
        value: oTrees, unit: "plants", tol: 0, wrong: [ORCH.m2 / 64, ORCH.m2 / 15],
        explanation: `Area = 80 × 56 = ${fmtNum(ORCH.m2)} m²; area per tree = 8 × 7 = 56 m²; ${fmtNum(ORCH.m2)} ÷ 56 = ${oTrees} trees.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the mass of ammonium nitrate needed in the second year, in kg.",
        value: oKg, unit: "kg", tol: 0, wrong: [12, 24000],
        explanation: `Per tree = 150 g × 2 = 300 g; ${oTrees} × 300 g = ${fmtNum(oKg * 1000)} g = ${oKg} kg.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the volume of water needed to irrigate all the basins once, in litres, to the nearest 10 L.",
        value: oTotal, unit: "L", tol: 6, answer: String(oTotal10), wrong: [round(Math.PI * 1.2 * 35 * oTrees, 0), round(oWater.litres, 0)],
        explanation: `Basin area = π × 1.2² = ${round(Math.PI * 1.44, 2)} m²; × 35 mm = ${round(oWater.litres, 1)} L per tree; × ${oTrees} = ${fmtNum(oTotal)} L, about ${fmtNum(oTotal10)} L.`,
      }),
      P.short({
        label: "(d)", stem: "Name the shoots that grow from the rootstock below the bud union and should be removed.",
        accepted: ["suckers", "sucker", "rootstock suckers", "water shoots"],
        keywords: { any: ["sucker"] },
        explanation: "Suckers (rootstock shoots).",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Give **two** reasons for planting windbreaks before the orchard.",
        points: ["Windbreaks take years to grow, so they must be established early to protect young trees.", "Wind damages leaves, flowers and fruit (scarring, fruit drop) and increases water loss."],
        explanation: "Windbreak timing and purpose.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Describe how Tatenda should protect the orchard from veld fires.",
        points: ["Clear a fire guard several metres wide around the orchard before the dry season.", "Keep grass short/slashed and remove dry litter under and between the trees.", "Keep water and firefighting tools ready and organise people to watch for fires."],
        explanation: "Fire guards and preparedness.",
      }),
    ],
    explanation: "Tree numbers, fertiliser and irrigation calculations for an orchard, with windbreaks and fire protection.",
  });
  b.struct({
    d: 4, skill: "UNDERSTANDING", examStyle: true, marks: 6,
    stem: "Chipo's banana stools near Chipinge each have six to eight suckers, and her bunches are getting smaller every year.",
    hints: ["Many suckers compete for water and nutrients."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why the bunches are getting smaller.",
        points: ["Too many suckers compete for water, nutrients and light.", "So each plant gets less and produces a smaller bunch."],
        explanation: "Competition.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe how she should desucker each stool.",
        points: ["Keep one mother plant (bearing), one daughter (large sucker) and one granddaughter (follower).", "Cut out the other suckers at ground level and dig out the growing point so they do not regrow."],
        explanation: "Mother, daughter, follower.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State **two** signs that a banana bunch is ready to harvest.",
        points: ["Fingers fill out and become rounded (the angles disappear).", "The top hands begin to change colour / flower remains at the tips dry and fall off easily."],
        explanation: "Banana maturity.",
      }),
    ],
    explanation: "Desuckering and harvesting bananas.",
  });

  b.card("DEFINITION", "Deciduous fruit", "Trees that shed leaves in winter and need winter chilling: apples, peaches, plums, grapes.");
  b.card("CONCEPT", "Orchard site selection", "Right climate, no frost pocket, deep well-drained soil, water, shelter, access to market, security.");
  b.card("FACT", "Planting patterns", "Square, rectangular, triangular (about 15% more trees), quincunx, contour.");
  b.card("FORMULA", "Trees in a block (square or rectangular)", "Area in m² ÷ (row spacing × in-row spacing in m).");
  b.card("CONCEPT", "Preparing a planting hole", "Dig weeks ahead; topsoil and subsoil apart; refill with topsoil, manure and phosphate; let it settle.");
  b.card("FACT", "Planting a budded citrus tree", "Same depth as in the nursery; bud union well above the soil; basin, water, stake, mulch.");
  b.card("CONCEPT", "Purposes of pruning", "Training shape, remove dead/diseased/crossing wood and water shoots, let in light, balance growth and fruiting.");
  b.card("FACT", "Banana desuckering", "Keep a mother, a daughter and a granddaughter (follower) per stool.");
  b.card("FACT", "Signs of maturity in mango", "Shoulders rise above the stalk end, skin colour changes, flesh yellow near the stone.");
});
