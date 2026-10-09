// Slice W2a: organic manures, compost and green manure.
import { concept, P, field, nutrientKg, productForNutrient, pct, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: manure for a plot at a rate, in scotch-cart loads.
const plot = field(80, 50);
const manureT = plot.ha * 15;
const loads = Math.ceil(manureT / 0.75 - 1e-9);
check(plot.ha === 0.4 && Math.abs(manureT - 6) < 1e-9 && loads === 8, "manure loads");

// Calc: N in poultry manure and AN equivalent.
const pmKg = 4000, pmN = 3;
const nPm = nutrientKg(pmKg, pmN);
const anEq = productForNutrient(nPm, 34.5);
check(nPm === 120 && Math.abs(anEq - 347.826) < 1e-3, "pm");

// Structured 1: compost heap temperatures.
const HEAP = [[0, 24], [3, 47], [7, 61], [14, 54], [21, 38], [24, 57], [35, 42], [56, 28]];
const H_TABLE = table(["Day", "Temperature at the centre of the heap (°C)"], HEAP.map(([d, t]) => [d, t]));
const rise = HEAP[5][1] - HEAP[4][1];
check(rise === 19, "rise");

// Structured 2: three-season trial (maize, t/ha).
const TRIAL = [["No manure or fertiliser", 1.6, 1.4, 1.3], ["Fertiliser only", 4.2, 4.0, 3.9], ["Manure only", 2.6, 3.0, 3.3], ["Manure + fertiliser", 4.8, 5.1, 5.4]];
const TR_TABLE = table(["Treatment", "Season 1", "Season 2", "Season 3"], TRIAL.map(([a, ...y]) => [a, ...y.map((v) => v.toFixed(1))]));
const manureRise = pct(TRIAL[2][3] - TRIAL[2][1], TRIAL[2][1]);
check(Math.abs(manureRise - 26.923) < 1e-3, "manureRise");

concept("agri.soil.organic-manures", { file: "soil/organic-manures", keyPrefix: "soil.organic-manures" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **green manure**?",
    options: [
      ["A crop grown to be ploughed into the soil while still green", "Correct: usually a fast-growing legume ploughed in at about flowering."],
      ["Fresh cattle dung and bedding collected from the kraal each morning", "That is kraal manure."],
      ["Compost that has not yet turned dark brown and crumbly", "Unfinished compost is not green manure."],
      ["An inorganic fertiliser coloured green", "Green manure is a crop, not a bagged fertiliser."],
    ],
    answer: "A",
    explanation: "Green manure crops such as sunn hemp and velvet bean are grown and worked into the soil to add organic matter and nitrogen.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does the centre of a well-made compost heap become hot?",
    options: [
      ["Micro-organisms release heat as they respire while breaking down the material", "Correct: microbial respiration releases energy as heat."],
      ["The sun heats the heap through its grass cover during the day, and the cover keeps the heat in", "The heat comes from inside the heap, even in the shade."],
      ["The wood ash in the layers reacts with the water and burns slowly", "Ash does not burn or react to heat the heap."],
      ["The soil layers hold heat from the previous day", "Soil does not generate heat."],
    ],
    answer: "A",
    explanation: "Bacteria and fungi decomposing the organic material respire and release heat; temperatures of about 60 °C kill many weed seeds and pathogens.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a layer of coarse material such as maize stalks placed at the bottom of a compost heap?",
    options: [
      ["To let air into the heap from below", "Correct: aerobic micro-organisms need oxygen."],
      ["To add most of the nitrogen to the compost", "Maize stalks are high in carbon and low in nitrogen."],
      ["To stop termites from reaching the heap from the soil", "A stalk layer does not keep termites out."],
      ["To make the finished compost more acid", "The base layer is for aeration."],
    ],
    answer: "A",
    explanation: "The decomposers in a compost heap are mostly aerobic; a coarse base and turning keep oxygen in the heap.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a thin layer of manure included between the layers of plant material in a compost heap?",
    options: [
      ["It supplies nitrogen and micro-organisms that speed up decomposition", "Correct: manure is rich in nitrogen and microbes."],
      ["It makes the heap waterproof so that heavy rain cannot enter and wash nutrients out", "Manure does not waterproof the heap; it should stay moist."],
      ["It keeps the heap cool", "Decomposition makes the heap warm."],
      ["It adds weed seeds that rot and feed the heap", "Weed seeds are unwanted; heat is needed to kill them."],
    ],
    answer: "A",
    explanation: "Micro-organisms need nitrogen to grow; manure supplies it, along with the microbes themselves.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tendai ploughs a large amount of dry maize stalks into his field just before planting. His young maize turns pale. What is the most likely reason?",
    options: [
      ["Microbes breaking down the stalks use up soil nitrogen for a while", "Correct: high-carbon residues cause temporary nitrogen lock-up."],
      ["The rotting stalks release too much nitrogen at once, which burns the young seedlings", "Dry stalks are low in nitrogen."],
      ["The stalks make the soil strongly alkaline", "Maize residues do not make soil strongly alkaline."],
      ["The stalks keep all the rainfall out of the soil", "Residues improve infiltration."],
    ],
    answer: "A",
    hints: ["Dry maize stalks are rich in carbon but poor in nitrogen."],
    explanation: "Microbes decomposing carbon-rich residues take up mineral nitrogen from the soil, so the crop is short of nitrogen until the residues have broken down.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer leaves kraal manure spread thinly on bare land in the hot sun for several weeks before ploughing it in. What happens to its value?",
    options: [
      ["Much of its nitrogen is lost as ammonia gas and by leaching", "Correct: exposed manure loses nitrogen."],
      ["It gains phosphorus from the air while it dries out", "Manure cannot gain phosphorus from the air."],
      ["It becomes richer in nitrogen as it dries", "Drying in the sun loses nitrogen."],
      ["Its value is unchanged, because nutrients cannot escape from dung", "Nitrogen escapes easily from exposed manure."],
    ],
    answer: "A",
    hints: ["Which nutrient can be lost as a gas?"],
    explanation: "Store manure in a compacted, covered heap and work it in soon after spreading.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best compares organic manure with ammonium nitrate?",
    options: [
      ["Manure builds soil structure and acts slowly; ammonium nitrate acts fast but adds no organic matter", "Correct: this is the key contrast."],
      ["Manure contains more nitrogen per kilogram than ammonium nitrate", "Manure contains far less nitrogen per kilogram."],
      ["Both release all of their nitrogen within about a week of being applied, so timing does not matter", "Manure releases nutrients slowly, over seasons."],
      ["Ammonium nitrate improves the water-holding capacity of a sandy soil more than manure does", "Only organic matter improves water-holding."],
    ],
    answer: "A",
    hints: ["Think of speed, concentration and effect on the soil."],
    explanation: "Organic manures are bulky, low in nutrients and slow-acting but build the soil; inorganic fertilisers are concentrated and fast but do not add organic matter.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is a green manure crop normally ploughed in at about flowering?",
    options: [
      ["It is soft and nutrient-rich then, so it rots quickly", "Correct: later it becomes woody and rots slowly."],
      ["Its seeds are ripe by then, so the crop will grow again by itself next season", "Letting it seed would make it a weed."],
      ["Its roots have stopped fixing nitrogen only by flowering", "This is not the reason for the timing."],
      ["It is too small to plough in before flowering", "The reason is its succulence and nutrient content."],
    ],
    answer: "A",
    hints: ["Compare young, green stems with old, woody stems."],
    explanation: "At flowering the crop has made most of its leafy growth but is still soft and nitrogen-rich, so it breaks down fast and releases nutrients.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Humus increases the amount of water a sandy soil can hold.",
    answer: true,
    explanation: "True. Humus holds several times its own mass of water.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Compost is ready to use about one week after the heap is built.",
    answer: false,
    explanation: "False. Compost usually takes about two to three months, with turning, before it is dark, crumbly and earthy.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each organic material with its description.",
    pairs: [
      ["Kraal manure", "Dung, urine and bedding from a cattle pen"],
      ["Compost", "Plant and animal wastes decomposed in a heap or pit"],
      ["Green manure", "A legume crop ploughed in at flowering"],
      ["Crop residue mulch", "Stover left on the surface to cover the soil"],
    ],
    explanation: "Each material adds organic matter in a different way.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Legumes improve soil fertility because {{blank:a}} bacteria in their root {{blank:b}} fix nitrogen from the air.",
    blanks: [
      { id: "a", accepted: ["Rhizobium", "rhizobia", "rhizobium"] },
      { id: "b", accepted: ["nodules", "nodule"] },
    ],
    explanation: "*Rhizobium* bacteria in root nodules fix nitrogen.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `A plot measures 80 m by 50 m. Kraal manure is applied at 15 t/ha and carried in a scotch cart that holds 0.75 t. How many cart loads are needed?`,
    value: loads, unit: undefined, tol: 0, wrong: [Math.round(4000 * 15 / 0.75)],
    explanation: `Area = 80 × 50 = 4,000 m² = 0.4 ha. Manure = 0.4 × 15 = ${manureT} t. Loads = ${manureT} ÷ 0.75 = ${loads}. Forgetting to convert m² to ha gives an impossible ${4000 * 15 / 0.75} loads.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Assume poultry manure contains ${pmN}% nitrogen and ammonium nitrate 34.5% N. A farmer applies ${pmKg.toLocaleString("en-GB")} kg of poultry manure. Calculate the mass of ammonium nitrate that contains the same mass of nitrogen, in kg, to the nearest kg.`,
    value: anEq, unit: "kg", tol: 0.5, answer: String(Math.round(anEq)), wrong: [nPm, round(nPm * 0.345, 0)],
    hints: ["Find the nitrogen in the manure first."],
    explanation: `N in manure = ${pmKg.toLocaleString("en-GB")} × ${pmN} ÷ 100 = ${nPm} kg. Ammonium nitrate = ${nPm} ÷ 0.345 = ${Math.round(anEq)} kg. Note that the manure releases its nitrogen slowly.`,
    workedSolution: `1. Nitrogen in the manure = ${pmKg.toLocaleString("en-GB")} × ${pmN} ÷ 100 = ${nPm} kg.\n2. Ammonium nitrate with ${nPm} kg N = ${nPm} ÷ 0.345 = ${round(anEq, 1)} kg.\n3. To the nearest kg: ${Math.round(anEq)} kg.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the dark, stable part of soil organic matter that holds water and nutrients.",
    accepted: ["humus"],
    explanation: "**Humus**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which adding compost improves a sandy soil.",
    hints: ["Think of water and of nutrients."],
    points: [
      "Humus holds water / increases water-holding capacity.",
      "So the crop survives dry spells longer / needs less frequent irrigation.",
      "Humus holds nutrient ions and releases nutrients as it decomposes.",
      "So fewer nutrients are leached / fertility improves (or: binds sand into crumbs, improving structure).",
    ],
    modelAnswer: "Compost adds humus, which holds water, so the sandy soil stays moist longer and the crop survives dry spells. Humus also holds nutrients and releases them slowly as it breaks down, so fewer nutrients are leached and the soil becomes more fertile.",
    explanation: "Give the effect and the reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `Form 2 pupils near Bulawayo built a compost heap of maize stover, grass, kraal manure and soil, and recorded the temperature at its centre. They turned the heap once.\n\n${H_TABLE}`,
    hints: ["Turning lets in air.", "Look for the sudden rise in temperature."],
    parts: [
      P.short({
        label: "(a)", stem: "State the day on which the heap was most likely turned.",
        accepted: ["21", "day 21", "21st day"],
        explanation: "The temperature fell to 38 °C by day 21 and rose sharply to 57 °C by day 24, after turning.",
      }),
      P.num({
        label: "(b)", stem: "Calculate the rise in temperature between day 21 and day 24.",
        value: rise, unit: "°C", wrong: [HEAP[5][1]],
        explanation: `${HEAP[5][1]} − ${HEAP[4][1]} = ${rise} °C.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the temperature rose after the heap was turned.",
        points: ["Turning let air (oxygen) into the heap / moved fresh material to the centre.", "So aerobic micro-organisms respired faster and released more heat."],
        explanation: "Oxygen speeds up aerobic decomposition.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **two** benefits of the high temperatures in the heap.",
        points: ["Kill weed seeds.", "Kill pathogens (disease organisms) and pests' eggs."],
        explanation: "Heat sterilises the compost.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "State **two** signs that the compost was ready to use by day 56.",
        points: ["Dark brown, crumbly texture.", "Earthy smell / original materials not recognisable / heap has cooled."],
        explanation: "Mature compost is dark, crumbly, cool and earthy.",
      }),
    ],
    explanation: "Temperature tracks microbial activity: it rises with air and food and falls as they run out.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8, calculator: true,
    stem: `A three-season trial on a sandy soil near Masvingo compared maize yields (t/ha) under four treatments.\n\n${TR_TABLE}`,
    hints: ["Percentage increase = (new − old) ÷ old × 100.", "Compare the trends, not just one season."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage increase in yield of the manure-only plot from season 1 to season 3, to one decimal place.",
        value: manureRise, unit: "%", tol: 0.05, wrong: [round(TRIAL[2][3] - TRIAL[2][1], 1), round(pct(TRIAL[2][3] - TRIAL[2][1], TRIAL[2][3]), 1)],
        explanation: `(${TRIAL[2][3].toFixed(1)} − ${TRIAL[2][1].toFixed(1)}) ÷ ${TRIAL[2][1].toFixed(1)} × 100 = ${round(manureRise, 1)}%.`,
      }),
      P.mcq({
        label: "(b)", stem: "Apart from the plot with no manure or fertiliser, which treatment's yield fell each season?",
        options: [
          ["Fertiliser only", "Correct: 4.2, 4.0 then 3.9 t/ha."],
          ["Manure only", "It rose each season."],
          ["Manure + fertiliser", "It rose each season."],
          ["None of the plots that received manure or fertiliser", "The fertiliser-only plot fell each season."],
        ],
        answer: "A",
        explanation: "The fertiliser-only plot declined slightly while the plots with manure rose.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the yield of the manure-only plot increased over the three seasons.",
        points: ["Manure releases nutrients slowly, so residues from earlier seasons add up.", "Organic matter builds up, improving structure and water- and nutrient-holding of the sandy soil."],
        explanation: "Slow release and the build-up of organic matter.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Using the data, discuss whether a farmer on this soil should use manure, fertiliser or both.",
        points: ["Fertiliser alone gives a quick, high yield in season 1 (4.2 t/ha) but declines.", "Manure alone is lower at first but improves the soil and rises each season.", "Both together give the highest yield every season (up to 5.4 t/ha), so combining them is best where manure is available."],
        explanation: "Use the figures to weigh short-term and long-term effects.",
      }),
    ],
    explanation: "Manure builds the soil over time; fertiliser gives a fast boost; together they give the best yields.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Discuss the advantages and disadvantages of using organic manures instead of inorganic fertilisers on a small farm.",
    hints: ["Cover soil effects, nutrients, cost and labour.", "End with a judgement."],
    points: [
      "Advantage: improve soil structure, water-holding and soil life (inorganic fertilisers do not).",
      "Advantage: cheap or free on the farm; supply many nutrients including trace elements.",
      "Advantage: slow release means less leaching, burn and pollution.",
      "Disadvantage: low and variable nutrient content, so large amounts are needed.",
      "Disadvantage: bulky; much labour and transport; slow to act; may carry weed seeds or pathogens.",
      "Judgement: combine both, using manure to build soil and a little fertiliser for fast response.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Organic manures add organic matter, which improves crumb structure, water-holding and soil life, something inorganic fertilisers cannot do. They are cheap or free on a farm with livestock and supply many nutrients, including trace elements, slowly, so less is leached and seedlings are not burnt. However, their nutrient content is low and variable, so tonnes are needed per hectare; carting and spreading them takes much labour, they act slowly when a crop needs a quick boost, and poorly made manure can spread weed seeds and diseases. Inorganic fertilisers are concentrated and fast but cost cash and can acidify the soil. On a small farm the best plan is usually to use manure or compost to build the soil and add a small, well-timed fertiliser dose.",
    explanation: "Balanced discussion with a clear judgement.",
  });

  b.card("DEFINITION", "Organic manure", "Plant or animal material (dung, compost, green manure) added to soil for nutrients and organic matter.");
  b.card("DEFINITION", "Compost", "Dark, crumbly material made when micro-organisms decompose plant and animal wastes in a heap or pit.");
  b.card("DEFINITION", "Green manure", "A crop, usually a legume such as sunn hemp, ploughed in while green (about flowering).");
  b.card("CONCEPT", "Steps in making a compost heap", "Shaded level site → coarse base → layers of plant material, manure and soil → water → cover → turn after about 3 weeks → ready in 2-3 months.");
  b.card("FACT", "Why does a compost heap get hot?", "Respiration of micro-organisms decomposing the material; up to about 60 °C, killing weed seeds and pathogens.");
  b.card("CONCEPT", "Effects of organic matter on soil", "Better crumb structure, more water and nutrients held, more soil life, steadier pH, less erosion.");
  b.card("CONCEPT", "Legumes and fertility", "Rhizobium in root nodules fixes nitrogen; rotting legume residues leave nitrogen for the next crop.");
  b.card("CONCEPT", "Organic vs inorganic fertilisers", "Organic: cheap, slow, bulky, low analysis, builds soil. Inorganic: concentrated, fast, known analysis, costly, no organic matter.");
  b.card("FACT", "Nitrogen lock-up", "Ploughing in carbon-rich residues (dry maize stalks) lets microbes use soil nitrogen for a while, so crops turn pale.");
});
