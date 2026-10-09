// Slice W2a: soil sampling, soil pH and liming.
import { concept, P, fertiliser, field, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: lime bags for 0.45 ha at 2.5 t/ha.
const L1 = fertiliser({ rateKgHa: 2500, areaHa: 0.45 });
check(Math.abs(L1.kg - 1125) < 1e-9 && L1.bags === 23, "L1");
// Num: lime for a garden in m².
const g2 = field(40, 30);
const L2 = fertiliser({ rateKgHa: 3000, areaM2: g2.m2 });
check(Math.abs(L2.kg - 360) < 1e-9, "L2");
// Num: times more acid.
const times = 10 ** (7 - 4);
check(times === 1000, "times");

// Structured: soil test results for four fields.
const FIELDS = [["A", 4.6, "Low", "Low", 1.2], ["B", 6.4, "Medium", "Medium", 2.0], ["C", 5.0, "Medium", "Low", 0.75], ["D", 8.1, "Medium", "High", 1.5]];
const F_TABLE = table(["Field", "pH", "Magnesium", "Calcium", "Area (ha)"], FIELDS.map(([f, ph, mg, ca, a]) => [f, ph.toFixed(1), mg, ca, a]));
const limeA = fertiliser({ rateKgHa: 3000, areaHa: FIELDS[0][4] });
check(Math.abs(limeA.kg - 3600) < 1e-9 && limeA.bags === 72, "limeA");

concept("agri.soil.ph-liming", { file: "soil/ph-liming", keyPrefix: "soil.ph-liming" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A soil has a pH of 5.2. How is this soil described?",
    options: [
      ["Acid", "Correct: below 7 is acid."],
      ["Neutral", "Neutral is pH 7."],
      ["Alkaline", "Alkaline soils have a pH above 7."],
      ["Saline, because it contains a lot of dissolved salt", "pH measures acidity, not salt content."],
    ],
    answer: "A",
    explanation: "On the pH scale, 7 is neutral, below 7 is acid and above 7 is alkaline.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are many subsamples mixed to make one composite soil sample?",
    options: [
      ["So that the sample represents the whole area", "Correct: one core could come from an unusual spot."],
      ["So that the laboratory has enough soil to dry", "Half a kilogram is enough; the reason is representativeness."],
      ["To raise the pH of the sample before testing", "Mixing does not change pH."],
      ["To kill the soil organisms before the sample is sent away for testing", "Mixing does not kill organisms."],
    ],
    answer: "A",
    explanation: "Soil varies from spot to spot, so many cores mixed together give an average picture of the field.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which place should be **avoided** when taking soil samples from a maize field?",
    options: [
      ["The site of an old cattle kraal", "Correct: manure makes it unrepresentative of the field."],
      ["A point in the middle of the field", "The middle of the field is normal sampling ground."],
      ["Ground between the crop rows", "Between rows is normally sampled."],
      ["A point along the zig-zag path across the field", "That is where samples should be taken."],
    ],
    answer: "A",
    explanation: "Avoid anthills, old kraals, manure heaps, fertiliser bands, wet spots, edges, paths and burnt areas.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a little barium sulfate added when testing soil pH with universal indicator?",
    options: [
      ["It makes the clay settle so the colour of the liquid can be seen", "Correct: it clears the suspension."],
      ["It raises the pH of the soil to neutral", "It is not used to change the pH."],
      ["It reacts with the indicator to make it turn green", "It does not change the indicator colour."],
      ["It supplies the nutrients that the indicator needs to work", "Indicators do not need nutrients."],
    ],
    answer: "A",
    explanation: "Barium sulfate flocculates clay, leaving clear liquid whose colour is compared with the chart.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a very acid soil, maize shows purple leaves even after a good basal dressing. What is the most likely explanation?",
    options: [
      ["Phosphorus is locked up by iron and aluminium, so the roots cannot take it up", "Correct: acidity fixes phosphorus."],
      ["The basal dressing contained too much potassium, which turned the leaves purple", "Potassium does not cause purpling."],
      ["Acid soil makes too much nitrogen available", "Nitrogen supply is not the cause of purpling."],
      ["The acid has dissolved the chlorophyll", "Soil acidity does not dissolve chlorophyll."],
    ],
    answer: "A",
    hints: ["Purpling is a sign of which deficiency?", "How does acidity affect that nutrient?"],
    explanation: "At low pH, phosphate combines with iron and aluminium into insoluble forms, so the crop shows phosphorus deficiency.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A soil test shows a low pH and a low magnesium level. Which liming material is the best choice?",
    options: [
      ["Dolomitic lime", "Correct: it raises pH and supplies magnesium."],
      ["Calcitic (agricultural) lime", "It raises pH but adds no magnesium."],
      ["Gypsum, because it supplies calcium and sulfur", "Gypsum does not correct acidity."],
      ["Ammonium sulfate", "It is a fertiliser that makes the soil more acid."],
    ],
    answer: "A",
    hints: ["Which lime contains both calcium and magnesium?"],
    explanation: "Dolomitic lime is calcium magnesium carbonate: it corrects acidity and supplies magnesium.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which fertiliser makes soil acid most strongly when used year after year?",
    options: [
      ["Ammonium sulfate", "Correct: its ammonium is nitrified, releasing acid, and it adds sulfate."],
      ["Muriate of potash", "Potassium chloride has little effect on pH."],
      ["Single superphosphate", "It has little acidifying effect."],
      ["Agricultural lime spread at a high rate", "Lime raises pH; it is not an acidifying fertiliser."],
    ],
    answer: "A",
    hints: ["Which nitrogen form releases acid when bacteria act on it?"],
    explanation: "Ammonium fertilisers acidify soil when nitrifying bacteria change ammonium to nitrate; ammonium sulfate does so most strongly.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A farmer limes a field heavily every year without testing. After several years, the crops show yellowing between the veins of young leaves. What has most likely happened?",
    options: [
      ["The pH has risen too high, so iron and manganese have become unavailable", "Correct: over-liming causes trace element deficiencies."],
      ["The soil has become more acid, releasing toxic aluminium", "Liming raises pH; it does not make the soil more acid."],
      ["The lime has added too much nitrogen to the soil", "Lime contains no nitrogen."],
      ["The lime has washed all the calcium out of the soil", "Lime adds calcium."],
    ],
    answer: "A",
    hints: ["Which nutrients become less available in alkaline soil?"],
    explanation: "Too much lime makes the soil alkaline; iron, manganese, zinc and boron become less available, causing chlorosis of young leaves.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Lime is applied mainly to raise the pH of an acid soil.",
    answer: true,
    explanation: "True. Lime corrects acidity; it also supplies calcium (and magnesium if dolomitic).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Lime should be mixed with ammonium nitrate and applied together at planting to save labour.",
    answer: false,
    explanation: "False. Lime with ammonium fertilisers causes nitrogen loss as ammonia gas; lime is worked in well before planting.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each material with its description.",
    pairs: [
      ["Calcitic lime", "Ground limestone, calcium carbonate"],
      ["Dolomitic lime", "Calcium magnesium carbonate"],
      ["Quicklime", "Calcium oxide, fast-acting and caustic"],
      ["Gypsum", "Calcium sulfate, which does not raise pH"],
    ],
    explanation: "Know the chemical in each material and whether it corrects acidity.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "When sampling a field, subsamples are taken in a {{blank:a}} pattern using a soil {{blank:b}} or a spade.",
    blanks: [
      { id: "a", accepted: ["zig-zag", "zigzag", "zig zag", "W", "W-shaped"] },
      { id: "b", accepted: ["auger"] },
    ],
    explanation: "A zig-zag (W) pattern; a soil auger.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A laboratory recommends 2.5 t/ha of agricultural lime for a 0.45 ha field. How many 50 kg bags of lime are needed? Round UP to whole bags.",
    value: L1.bags, unit: "bags", tol: 0, wrong: [Math.floor(L1.exactBags), round(2.5 * 0.45 / 50, 4)],
    explanation: `2.5 t/ha = 2,500 kg/ha; 2,500 × 0.45 = ${L1.kg.toLocaleString("en-GB")} kg; ${L1.kg.toLocaleString("en-GB")} ÷ 50 = ${L1.exactBags}, so ${L1.bags} bags. Forgetting to change tonnes to kilograms gives a tiny fraction of a bag.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A school garden measures 40 m by 30 m. Calculate the mass of lime needed at 3 t/ha, in kg.",
    value: L2.kg, unit: "kg", tol: 0, wrong: [3000 * g2.m2, 3 * 0.12],
    hints: ["Convert the area to hectares and the rate to kg/ha."],
    explanation: `Area = 40 × 30 = ${g2.m2.toLocaleString("en-GB")} m² = ${g2.ha} ha; lime = 3,000 × ${g2.ha} = ${L2.kg} kg.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "How many times more acid (in hydrogen ion concentration) is a soil at pH 4 than a soil at pH 7?",
    value: times, tol: 0, wrong: [3, 30],
    hints: ["Each unit on the pH scale is a tenfold change."],
    explanation: `The difference is 3 units, so 10 × 10 × 10 = ${times.toLocaleString("en-GB")} times. Answering 3 treats the scale as if it were not logarithmic.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the tool used to take a core of soil from a set depth when sampling.",
    accepted: ["soil auger", "auger", "core sampler", "soil corer"],
    explanation: "A **soil auger**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which lime differs from a fertiliser.",
    hints: ["Think of purpose, effect on pH and rate of use."],
    points: [
      "Lime is used to correct acidity / raise pH.",
      "A fertiliser is used to supply plant nutrients (and nitrogen fertilisers may lower pH).",
      "Lime is applied in tonnes per hectare, every few years.",
      "Fertiliser is applied in kilograms per hectare, every season.",
    ],
    modelAnswer: "Lime is applied to raise the pH of an acid soil, whereas a fertiliser is applied to supply nutrients to the crop, and many nitrogen fertilisers actually lower pH. Lime is applied in tonnes per hectare only every few years, whereas fertiliser is applied in kilograms per hectare every season.",
    explanation: "Contrast purpose and rate.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how a farmer should collect a soil sample from a 2 ha maize field for laboratory testing.",
    hints: ["Give the pattern, tool, depth, number of cores and what happens after mixing."],
    points: [
      "Walk a zig-zag (W) pattern across the field, avoiding anthills, kraals, edges and fertiliser bands.",
      "Take 15-20 cores with an auger or spade to the same depth (about 0-20 cm).",
      "Mix the cores well in a clean plastic bucket to form a composite sample.",
      "Air-dry about half a kilogram in the shade, bag and label it (field, depth, date) and send it.",
    ],
    modelAnswer: "Walk across the field in a zig-zag, avoiding unusual spots such as anthills, old kraals and the field edges. At 15-20 points take a core of topsoil to about 20 cm with a clean auger and put it in a clean plastic bucket. Mix all the cores well, take about half a kilogram, dry it in the shade, put it in a labelled bag with the field name, depth and date and send it to the laboratory.",
    explanation: "Pattern, tool and depth, mixing, labelling.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `A farm near Gweru had soil tests on four fields.\n\n${F_TABLE}`,
    hints: ["Most crops grow best in slightly acid to neutral soil.", "Bags = rate × area ÷ 50, rounded up."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the field whose soil is alkaline.",
        accepted: ["D", "field D"],
        explanation: "Field D, with pH 8.1, is alkaline.",
      }),
      P.mcq({
        label: "(b)", stem: "Which field should receive dolomitic lime?",
        options: [
          ["Field A", "Correct: very acid and low in magnesium."],
          ["Field B", "pH 6.4 needs no lime."],
          ["Field C", "It is acid, but magnesium is not low there, so calcitic lime would do."],
          ["Field D", "It is alkaline and must not be limed."],
        ],
        answer: "A",
        explanation: "Field A is very acid and short of magnesium; dolomitic lime corrects both.",
      }),
      P.num({
        label: "(c)", marks: 2, stem: `The laboratory recommends 3 t/ha of lime for field A. Calculate the number of 50 kg bags needed.`,
        value: limeA.bags, unit: "bags", tol: 0, wrong: [round(3 * FIELDS[0][4], 1), 7.2],
        explanation: `3,000 × ${FIELDS[0][4]} = ${limeA.kg.toLocaleString("en-GB")} kg; ÷ 50 = ${limeA.bags} bags.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why maize in field A grows poorly even when fertilised.",
        points: ["At low pH aluminium (and manganese) become soluble and toxic, damaging roots.", "Phosphorus is locked up by iron and aluminium / calcium and magnesium are short, so nutrients are not taken up."],
        explanation: "Toxicity and nutrient lock-up in acid soil.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** trace elements that may be deficient in crops on field D, and give the reason.",
        points: ["Any two of iron, manganese, zinc, boron.", "They become less available (less soluble) at high pH."],
        explanation: "Alkaline soils lock up trace elements.",
      }),
    ],
    explanation: "Interpret pH and nutrient results, then decide whether and how to lime.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A farmer on an acid sandy soil uses ammonium nitrate every season but has never limed. Discuss whether he should lime his land, and how.",
    hints: ["Why is the soil acid and getting worse?", "What are the benefits and risks of liming?"],
    points: [
      "Ammonium fertiliser, leaching on sandy soil and crop removal keep making the soil more acid.",
      "Acidity locks up phosphorus, releases toxic aluminium/manganese and reduces bacteria (nitrification, Rhizobium).",
      "Liming raises pH, improving nutrient availability and soil life, so fertiliser is used efficiently.",
      "He should test the soil first and lime at the recommended rate (dolomitic if magnesium is low).",
      "Broadcast and work in well before planting; not mixed with ammonium fertiliser; re-test every few years.",
      "Risk: over-liming causes trace element deficiencies and wastes money, so liming must follow a soil test.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "His soil is likely to be getting steadily more acid: the ammonium in his fertiliser releases acid when it is nitrified, and heavy rain leaches calcium and magnesium from the sandy soil. In acid soil phosphorus is locked up, aluminium and manganese damage the roots and nitrifying bacteria and Rhizobium work poorly, so much of his fertiliser is wasted. He should therefore lime, but only after a soil test. He should use the recommended rate, choosing dolomitic lime if magnesium is low, spread it evenly in the dry season, work it in well before planting and not apply it with ammonium nitrate. Too much lime would make trace elements unavailable, so he should re-test every few years rather than liming every season.",
    explanation: "Link the cause of acidity to its effects and give a tested, correctly applied liming plan.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "Thandeka has grown maize on a sandy soil near Marondera for ten years, top dressing with ammonium sulfate every season and never liming. The soil pH has fallen from 6.2 to 5.0, and her soil test shows normal magnesium.",
    hints: ["Which processes remove bases or release acid?"],
    parts: [
      P.num({
        label: "(a)", stem: "By how many pH units has the soil pH fallen?",
        value: round(6.2 - 5.0, 1), tol: 0.05, wrong: [round(6.2 + 5.0, 1), 5.0],
        explanation: "6.2 − 5.0 = 1.2 units (more than ten times more acid).",
      }),
      P.mcq({
        label: "(b)", stem: "Which liming material is most suitable for her field?",
        options: [
          ["Calcitic (agricultural) lime", "Correct: magnesium is normal, so the cheaper calcium carbonate lime will do."],
          ["Gypsum", "Gypsum does not correct acidity."],
          ["More ammonium sulfate", "It would make the soil more acid."],
          ["Muriate of potash", "It supplies potassium; it does not raise pH."],
        ],
        answer: "A",
        explanation: "Calcitic lime corrects the acidity; dolomitic lime is chosen only when magnesium is also low.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the soil pH fell.",
        points: ["Nitrifying bacteria changing the ammonium in the fertiliser to nitrate release acid (ammonium sulfate is strongly acidifying).", "Heavy rain on the sandy soil leaches calcium and magnesium / crops remove bases, leaving the soil more acid."],
        explanation: "Ammonium fertiliser and leaching.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **two** ways Thandeka could slow down acidification in future.",
        points: ["Use a less acidifying nitrogen fertiliser (e.g. ammonium nitrate) / apply only the nitrogen needed.", "Lime regularly according to soil tests / add organic matter / reduce leaching by splitting doses."],
        explanation: "Fertiliser choice, liming and organic matter.",
      }),
    ],
    explanation: "Ammonium fertilisers and leaching acidify sandy soils; lime by soil test and choose fertilisers carefully.",
  });

  b.card("DEFINITION", "Soil pH", "Measure of acidity or alkalinity on a 0-14 scale; 7 neutral, below 7 acid, above 7 alkaline.");
  b.card("DEFINITION", "Composite sample", "Many subsamples (about 15-20 cores) from a uniform area, mixed thoroughly.");
  b.card("CONCEPT", "Principles of soil sampling", "Representative; avoid anthills, kraals, edges, fertiliser bands; same depth; clean tools; label.");
  b.card("CONCEPT", "Testing pH with universal indicator", "Soil + barium sulfate + distilled water + indicator; shake, settle, compare colour with chart.");
  b.card("FACT", "Effects of strongly acid soil", "Toxic aluminium and manganese; phosphorus locked up; Ca, Mg, Mo short; poor bacterial activity.");
  b.card("FACT", "Causes of soil acidity", "Ammonium fertilisers, leaching of bases, crop removal, organic matter decay, acid parent rock.");
  b.card("FACT", "Liming materials", "Calcitic lime (CaCO₃), dolomitic lime (supplies Mg), quicklime (CaO), slaked lime (Ca(OH)₂). Gypsum does not raise pH.");
  b.card("CONCEPT", "Lime vs fertiliser", "Lime corrects pH (t/ha, every few years); fertiliser supplies nutrients (kg/ha, every season).");
  b.card("FACT", "How many times more acid is pH 5 than pH 6?", "10 times: the pH scale is logarithmic.");
});
