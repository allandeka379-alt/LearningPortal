// Slice W3a: crop rotation.
import { concept, P, productForNutrient, pctChange, mean, round, check, table, fmtNum } from "../lib.mjs";

// Q: course area.
const courseHa = 10 / 4;
check(courseHa === 2.5, "course");
// Q: AN saved per ha for 30 kg N.
const anSaved = productForNutrient(30, 34.5);
check(Math.abs(anSaved - 86.957) < 0.001, "anSaved");
// Q: manure for a course.
const manureT = 8 * 2.5;
check(manureT === 20, "manure");

// Struct: rotation plan with gaps.
const PLAN = [
  ["A", "Maize", "Groundnuts", "Cotton", "Grass ley"],
  ["B", "Grass ley", "Maize", "Groundnuts", "Cotton"],
  ["C", "Cotton", "Grass ley", "Maize", "Groundnuts"],
  ["D", "Groundnuts", "Cotton", "Grass ley", "?"],
];
const PLAN_TABLE = table(["Field", "Year 1", "Year 2", "Year 3", "Year 4"], PLAN);

// Struct: monoculture vs rotation yields.
const MONO = [4.6, 4.1, 3.7, 3.2];
const ROT = [4.5, 4.7, 4.6, 4.8];
const Y_TABLE = table(["Season", "Continuous maize (t/ha)", "Maize in a rotation with a legume (t/ha)"], MONO.map((m, i) => [i + 1, m.toFixed(1), ROT[i].toFixed(1)]));
const monoDrop = pctChange(MONO[0], MONO[3]);
const rotMean = mean(ROT);
check(Math.abs(monoDrop + 30.4348) < 0.001 && Math.abs(rotMean - 4.65) < 1e-9, "Y");

concept("agri.land.crop-rotation", { file: "land/crop-rotation", keyPrefix: "land.crop-rotation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is crop rotation?",
    options: [
      ["Growing different crops in turn on the same land in a planned sequence", "Correct."],
      ["Growing the same crop on the same land every year", "That is monoculture."],
      ["Growing two or more crops mixed together in the same field at once", "That is intercropping (mixed cropping)."],
      ["Moving to new land each time the soil becomes infertile", "That is shifting cultivation."],
    ],
    answer: "A",
    explanation: "Rotation changes the crop on each field in a repeated, planned order.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why should a legume be grown before maize in a rotation?",
    options: [
      ["Legume residues release fixed nitrogen for the maize", "Correct: maize is a heavy feeder of nitrogen."],
      ["Legumes remove all the weeds from the soil", "Legumes do not remove all weeds."],
      ["Maize cannot grow at all unless a legume is planted first", "Maize can grow, but needs more fertiliser."],
      ["Legumes make the soil more acid for maize", "This is not a reason for the order."],
    ],
    answer: "A",
    explanation: "Nitrogen fixed by *Rhizobium* in legume nodules benefits the following heavy feeder.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do crops of different families follow one another in a rotation?",
    options: [
      ["Pests and diseases of one family find no host and die out", "Correct: many attack only one family."],
      ["Different families need no fertiliser at all", "All crops need nutrients."],
      ["Crops of the same family cannot be sold together at the market", "Marketing is not the reason."],
      ["Different families all have the same root depth", "Root depths differ; that is another principle."],
    ],
    answer: "A",
    explanation: "Changing family breaks pest, disease and parasitic-weed cycles.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which sequence breaks the life cycle of witchweed best?",
    options: [
      ["Maize, then groundnuts, then cotton", "Correct: groundnuts and cotton are non-hosts."],
      ["Maize, then sorghum, then pearl millet", "All three are hosts of witchweed."],
      ["Maize, then maize, then maize", "Continuous maize builds up witchweed."],
      ["Sorghum, then maize, then sorghum", "Cereal hosts keep witchweed going."],
    ],
    answer: "A",
    hints: ["Which crops can witchweed attack?"],
    explanation: "Witchweed parasitises cereals; non-host crops reduce the seed bank.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are deep-rooted and shallow-rooted crops alternated?",
    options: [
      ["Nutrients and water are drawn from different soil layers", "Correct: the whole profile is used and structure improves."],
      ["Deep-rooted crops add nitrogen to the subsoil from the air", "Only legumes fix nitrogen, whatever their roots."],
      ["Shallow-rooted crops need no water at all", "All crops need water."],
      ["Root depth decides the market price of the crop", "Price is not linked to root depth."],
    ],
    answer: "A",
    hints: ["Think of the soil profile from top to bottom."],
    explanation: "Alternating root depths avoids exhausting one layer and opens the subsoil.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In a rotation, what is a ley?",
    options: [
      ["Land sown to grass for a few years and grazed or cut", "Correct."],
      ["A field left bare and weed-free for one season", "That is a bare fallow."],
      ["A legume crop grown for its grain", "A grain legume is a crop course, not a ley."],
      ["A strip of trees planted to shelter the crops from wind", "That is a windbreak."],
    ],
    answer: "A",
    explanation: "A ley rests the soil, builds organic matter and provides grazing.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which course of a rotation should normally receive the farmyard manure?",
    options: [
      ["The heavy-feeding cereal such as maize", "Correct: it responds most to the nutrients."],
      ["The legume, so it fixes more nitrogen", "Legumes need little nitrogen; manure is better used by maize."],
      ["The grass ley, so cattle eat the manure", "This would waste the manure."],
      ["The bare fallow, which has no crop", "Nutrients would be lost with nothing to use them."],
    ],
    answer: "A",
    hints: ["Which crop needs the most nutrients?"],
    explanation: "Manure goes to the most demanding crop, usually maize or tobacco.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is a genuine limitation of crop rotation for a smallholder with 1 ha?",
    options: [
      ["The land must be split into small fields, some with low-value crops", "Correct: this can reduce income."],
      ["Rotation always reduces soil fertility", "It usually maintains fertility."],
      ["Rotation always increases the build-up of pests and diseases in the soil", "Rotation reduces pests."],
      ["Rotated crops can never be sold", "Rotated crops are sold like any others."],
    ],
    answer: "A",
    hints: ["Think of land and income."],
    explanation: "With little land, dividing it among several crops and a ley may not give enough food or cash.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A four-course rotation takes four years before each field has carried every crop once.",
    answer: true,
    explanation: "True. Each crop moves one field along each year.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Following maize with sorghum is a good rotation because the two crops belong to different families.",
    answer: false,
    explanation: "False. Both are cereals of the grass family and share pests, diseases and witchweed.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each crop with its role in a rotation.",
    pairs: [
      ["Maize", "Heavy feeder that receives the manure"],
      ["Soya beans", "Legume that fixes nitrogen"],
      ["Sunflower", "Deep taproot that uses subsoil nutrients"],
      ["Rhodes grass ley", "Rests the soil and adds organic matter"],
    ],
    explanation: "Each course has a purpose in a well-designed rotation.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Growing the same crop on the same land every year is called {{blank:a}}; each crop and its piece of land in a rotation is called a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["monoculture", "monocropping", "continuous cropping"] },
      { id: "b", accepted: ["course"] },
    ],
    explanation: "Monoculture; course.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A farmer divides 10 ha of arable land into a four-course rotation of equal fields. Calculate the area of each course, in ha.",
    value: courseHa, unit: "ha", tol: 0.005, answer: "2.5", wrong: [40, 0.4],
    explanation: `10 ÷ 4 = ${courseHa} ha per course.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Assume maize after a legume needs 30 kg/ha less nitrogen. Calculate the mass of ammonium nitrate (34.5% N) saved per hectare, in kg, to one decimal place.",
    value: anSaved, unit: "kg/ha", tol: 0.05, answer: "87.0", wrong: [round(30 * 0.345, 1), 30],
    hints: ["Product = nutrient ÷ (percentage ÷ 100)."],
    explanation: `30 ÷ 0.345 = ${round(anSaved, 1)} kg/ha. Multiplying by 0.345 (10.4 kg) gives the nitrogen in 30 kg of fertiliser, not the fertiliser needed.`,
    workedSolution: `1. Nitrogen saved = 30 kg/ha.\n2. Ammonium nitrate = 30 ÷ (34.5 ÷ 100) = 30 ÷ 0.345.\n3. = ${round(anSaved, 2)} ≈ ${round(anSaved, 1)} kg/ha.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "In a four-course rotation on 10 ha, manure is applied at 8 t/ha to the maize course only. How many tonnes of manure are needed each year?",
    value: manureT, unit: "t", tol: 0, wrong: [80, 32],
    hints: ["Only one course gets manure."],
    explanation: `Maize course = 10 ÷ 4 = 2.5 ha; 8 × 2.5 = ${manureT} t. Using the whole 10 ha gives 80 t, which is wrong.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the bacteria in legume root nodules that make legumes valuable in a rotation.",
    accepted: ["Rhizobium", "rhizobia", "Bradyrhizobium", "nitrogen-fixing bacteria"],
    keywords: { any: ["rhizob"] },
    explanation: "***Rhizobium***.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** principles of crop rotation.",
    hints: ["State the principle, then why it helps."],
    points: [
      "Alternate deep- and shallow-rooted crops.",
      "So nutrients and water are used from different soil layers and the subsoil is opened up.",
      "Crops of different families follow each other (or: legume before heavy feeder / include a ley).",
      "So pests and diseases find no host and die out (or: nitrogen is supplied / soil rests and gains organic matter).",
    ],
    modelAnswer: "Deep-rooted and shallow-rooted crops are alternated, so nutrients and water are taken from different layers and the soil is not exhausted in one layer. Crops of different families follow each other, so pests and diseases that attack one family have no host and die out.",
    explanation: "Principle plus reason.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss **two** advantages and **two** limitations of crop rotation for a farmer near Gokwe.",
    hints: ["Both sides are needed."],
    points: [
      "Advantage: legumes add nitrogen, so less fertiliser is bought.",
      "Advantage: pests, diseases and witchweed are reduced / several crops spread labour, income and risk.",
      "Limitation: planning, records and knowledge of several crops are needed / land is divided into small fields.",
      "Limitation: some courses earn less or have no reliable market / different implements and inputs are needed.",
    ],
    modelAnswer: "Rotation lets the groundnut course supply nitrogen to the next maize, cutting fertiliser costs, and it reduces witchweed and pests, while several crops spread labour and risk. However, it needs careful planning and the land is split into smaller fields, and some crops such as a ley may earn little or lack a market.",
    explanation: "Two each side.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 8,
    stem: `Sipho plans a four-course rotation on four equal fields near Chinhoyi.\n\n${PLAN_TABLE}`,
    hints: ["Each crop moves one field along each year.", "Look for the pattern in field D."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which crop should replace the question mark in field D, year 4?",
        options: [
          ["Maize", "Correct: it follows the grass ley as in the other fields."],
          ["Groundnuts", "Groundnuts grew in field D in year 1 and follow maize."],
          ["Cotton", "Cotton grew in field D in year 2."],
          ["Grass ley", "Field D had the ley in year 3."],
        ],
        answer: "A",
        explanation: "The order is maize, groundnuts, cotton, grass ley; after the ley comes maize.",
      }),
      P.short({
        label: "(b)", stem: "Name the crop in the plan that fixes nitrogen.",
        accepted: ["groundnuts", "groundnut", "peanuts"],
        explanation: "Groundnuts (a legume).",
      }),
      P.short({
        label: "(c)", stem: "Name the course that receives the manure.",
        accepted: ["maize"],
        explanation: "Maize, the heavy feeder.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why cotton is placed after groundnuts.",
        points: ["Cotton has a deep taproot whereas groundnuts are shallower, so different layers are used.", "Cotton is a different family, breaking pest and disease cycles (and it uses residual nitrogen)."],
        explanation: "Root depth and family.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Explain **three** benefits of including the grass ley.",
        points: ["Rests the soil and builds organic matter from the dense roots.", "Improves soil structure and protects the soil from erosion.", "Provides grazing or hay, and manure from cattle grazing it."],
        explanation: "Ley benefits.",
      }),
    ],
    explanation: "Complete and justify a four-course rotation.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 12, calculator: true,
    stem: `A demonstration plot near Bindura compared continuous maize with maize grown in a rotation with a legume. Both received the same fertiliser.\n\n${Y_TABLE}`,
    hints: ["Percentage change = (new − old) ÷ old × 100.", "Look at the trend, not one season."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage fall in the yield of continuous maize from season 1 to season 4, to one decimal place.",
        value: -monoDrop, unit: "%", tol: 0.05, answer: "30.4", wrong: [1.4, round(((4.6 - 3.2) / 3.2) * 100, 1)],
        explanation: `(4.6 − 3.2) ÷ 4.6 × 100 = ${round(-monoDrop, 1)}%.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the mean yield of maize in the rotation over the four seasons, in t/ha, to two decimal places.",
        value: rotMean, unit: "t/ha", tol: 0.005, answer: "4.65", wrong: [18.6, 4.7],
        explanation: `(4.5 + 4.7 + 4.6 + 4.8) ÷ 4 = ${rotMean} t/ha.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe the trend shown by each treatment.",
        points: ["Continuous maize yields fell every season.", "Maize in the rotation stayed steady or rose slightly."],
        explanation: "Two trends.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** reasons for the fall in yield of continuous maize.",
        points: ["Build-up of maize pests and diseases (stalk borer, grey leaf spot) with a host every year.", "Build-up of witchweed and other weeds adapted to maize.", "Decline in soil organic matter, structure and nutrients other than those in the fertiliser."],
        explanation: "Monoculture problems.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "The farmer says, \"The legume season earns less than maize, so rotation is not worth it.\" Evaluate this view.",
        points: ["The legume itself earns income (and food), and saves nitrogen fertiliser for the next maize.", "The data show rotation keeps maize yields high, while continuous maize fell by about 30%, so long-term income is better.", "Judgement: rotation is worth it over several seasons, though in one season the legume may earn less."],
        explanation: "Weigh short-term income against long-term yield.",
      }),
    ],
    explanation: "Interpret long-term yield data and evaluate rotation.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "Thandeka grows tobacco near Karoi and has found galls on the roots of her tobacco plants, caused by root-knot nematodes.",
    hints: ["Nematodes need a host to survive."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why growing tobacco on the same land every year makes the nematode problem worse.",
        points: ["Nematodes feed and multiply on tobacco roots every season.", "So their numbers in the soil build up year after year."],
        explanation: "Host present every year.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Suggest how a rotation could reduce the problem.",
        points: ["Follow tobacco with crops that are poor hosts, such as a suitable grass ley.", "Without a good host for several years nematode numbers fall before tobacco is grown again."],
        explanation: "Non-host break.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State **two** other benefits the rotation would bring to her farm.",
        points: ["Improved soil structure and organic matter (ley) / less erosion.", "Income or grazing from other crops / spreads labour and risk."],
        explanation: "Other benefits.",
      }),
    ],
    explanation: "Rotation as a control for soil pests.",
  });

  b.card("DEFINITION", "Crop rotation", "Growing different crops in turn on the same land in a planned, repeated sequence.");
  b.card("DEFINITION", "Monoculture", "Growing the same crop on the same land year after year.");
  b.card("CONCEPT", "Principles of crop rotation", "Alternate deep and shallow roots; legumes with heavy feeders; different families; include a ley or fallow; manure the heavy feeder; suit markets and labour.");
  b.card("DEFINITION", "Ley", "Land under grass (sometimes with legumes) for a few years, grazed or cut, then ploughed for crops.");
  b.card("FACT", "A four-course rotation", "Maize (manure) → legume → deep-rooted crop (e.g. sunflower or cotton) → grass ley; each crop moves one field a year.");
  b.card("CONCEPT", "Advantages of rotation", "Fertility, less fertiliser, pest/disease/witchweed control, better structure, less erosion, spread of labour, income and risk.");
  b.card("CONCEPT", "Limitations of rotation", "Planning and records, land divided, low-value courses, varied implements and skills, markets for every crop.");
  b.card("FACT", "Which course gets the manure?", "The heavy feeder, such as maize or tobacco.");
  b.card("FACT", "Why not maize after sorghum?", "Same (grass) family: shared pests, diseases and witchweed carry over.");
});
