// Slice W1b: conservation agriculture (Pfumvudza/Intwasa).
import { concept, P, ZIM, plantPopulation, perStation, field, fertiliser, round, check, agricultureLevels } from "../lib.mjs";

// Daily: basins per hectare at 90 cm × 50 cm.
const popD = plantPopulation({ rowCm: 90, inRowCm: 40 });
check(Math.abs(popD.perHa - 27777.7778) < 1e-3, "pop daily");

// Calc: plot 30 m × 20 m at 80 cm × 50 cm.
const plotC = field(30, 20);
const popC = plantPopulation({ rowCm: 80, inRowCm: 50 });
const basinsC = plotC.m2 / popC.m2PerStation;
check(Math.abs(basinsC - 1500) < 1e-6, "basins C");

// Manure: 0.4 kg per basin for 1,500 basins.
const manureKg = 0.4 * 1500;
check(Math.abs(manureKg - 600) < 1e-9, "manure");

// Structured: plot 24 m × 15 m, 75 × 60 cm; AN top dressing 250 kg/ha.
const plotS = field(24, 15);
const popS = plantPopulation({ rowCm: 75, inRowCm: 60 });
const gPerBasinS = perStation({ rateKgHa: 250, population: popS.perHa });
const anS = fertiliser({ rateKgHa: 250, areaM2: plotS.m2 });
check(Math.abs(gPerBasinS - 11.25) < 1e-9, "AN per basin");
check(Math.abs(anS.kg - 9) < 1e-9, "AN for plot");
const basinsS = plotS.m2 / popS.m2PerStation;
check(Math.abs(basinsS - 800) < 1e-6, "basins S");

concept("agri.crops.conservation-agriculture", { file: "crops/conservation-agriculture", keyPrefix: "crops.conservation-agriculture" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which list gives the three principles of conservation agriculture?",
    options: [
      ["Minimum soil disturbance, permanent soil cover, crop rotation or association", "Correct: all three are applied together."],
      ["Deep ploughing every year, burning crop residues, growing maize every season", "These practices damage soil and are the opposite of conservation agriculture."],
      ["Minimum soil disturbance, burning residues, crop rotation", "Burning removes the soil cover that the system needs."],
      ["Permanent soil cover, deep ploughing, irrigation", "Deep ploughing disturbs the soil; irrigation is not a principle."],
    ],
    answer: "A",
    explanation: "Conservation agriculture = minimum soil disturbance + permanent soil cover + crop rotation or association.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are planting basins dug in the dry season, before the rains?",
    options: [
      ["So the crop can be planted on time with the first effective rains", "Correct: preparation is finished early, so planting is timely."],
      ["Because dry soil is much softer and easier to dig than wet soil in the rains", "Dry soil is usually harder to dig."],
      ["So that weeds grow in the basins before the crop", "Weeds compete with the crop; they are not wanted."],
      ["So that manure can dry out completely in the sun", "Manure should be well rotted, and is placed just before planting."],
    ],
    answer: "A",
    explanation: "Early preparation removes the delay of waiting to plough, so the crop uses the whole rainy season.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does a mulch of maize stover help the crop in a planting-basin field?",
    options: [
      ["It reduces evaporation and protects the soil surface from raindrops", "Correct: it conserves water and prevents capping and erosion."],
      ["It supplies all of the nitrogen that the next maize crop will need to grow", "Stover is low in nitrogen; it adds organic matter slowly."],
      ["It raises the soil temperature to speed germination", "Organic mulch keeps soil cooler by day."],
      ["It kills termites and other soil insects", "Termites may actually feed on the mulch."],
    ],
    answer: "A",
    explanation: "Mulch absorbs raindrop impact, slows runoff, reduces evaporation, keeps soil cooler and feeds soil organisms.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a conservation-agriculture rotation, why is groundnuts or soya beans grown after maize?",
    options: [
      ["Legumes fix nitrogen and break the pest and disease cycles of maize", "Correct: rotation adds nitrogen and interrupts pests."],
      ["Legumes need more nitrogen fertiliser than maize", "Legumes need little nitrogen because they fix their own."],
      ["Legumes grow best in a field that has been deeply ploughed every season", "Conservation agriculture avoids deep ploughing."],
      ["Legumes produce more stover for mulch than maize", "Maize usually produces more residue."],
    ],
    answer: "A",
    explanation: "Rotating a cereal with a legume adds fixed nitrogen and breaks the cycles of pests, diseases and weeds of the cereal.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "A smallholder in a communal area keeps a stover mulch on her Pfumvudza plot, but after harvest neighbours' cattle graze it all. What is the most practical solution?",
    options: [
      ["Fence the plot or agree with neighbours to keep cattle out after harvest", "Correct: protecting residues is necessary to keep soil cover."],
      ["Burn the stover immediately after harvest so that cattle have nothing to graze", "Burning destroys the cover the system relies on."],
      ["Plough the whole field after harvest so that cattle cannot walk on it", "Ploughing breaks the minimum-disturbance principle."],
      ["Stop mulching and leave the plot bare", "Bare soil caps, erodes and loses water."],
    ],
    answer: "A",
    hints: ["The problem is competition for residues; how can the residues be kept?"],
    explanation: "Competition between livestock and mulch is a major limitation; fencing, community by-laws or growing extra mulch material help.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why is basal fertiliser covered with a little soil before the seed is placed in a planting basin?",
    options: [
      ["To stop the fertiliser touching and damaging the germinating seed", "Correct: concentrated fertiliser can scorch the seed."],
      ["To hide the fertiliser from birds", "Birds are not the reason."],
      ["To make the fertiliser dissolve faster", "Covering does not speed dissolving."],
      ["To stop the fertiliser being washed out of the basin into the next one by rain", "The main reason is protecting the seed."],
    ],
    answer: "A",
    hints: ["Fertiliser salts are concentrated near the seed."],
    explanation: "Direct contact with concentrated fertiliser salts can damage the seed or seedling root; a thin layer of soil separates them.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a season with long dry spells, maize in planting basins with mulch yielded more than maize in a ploughed field nearby. Which is the best explanation?",
    options: [
      ["Basins collected rainwater at the roots and mulch reduced evaporation", "Correct: more water was available to the crop during the dry spells."],
      ["Ploughing added more organic matter than the basins did", "Ploughing reduces organic matter."],
      ["The ploughed field had more soil cover than the basin field", "The basin field had the mulch cover."],
      ["Basins raise the soil temperature, so the maize plants need much less water", "Mulch keeps soil cooler; temperature does not reduce water need this way."],
    ],
    answer: "A",
    hints: ["Think about water during dry spells."],
    explanation: "Basins harvest rain around each plant and mulch cuts evaporation and runoff, so more water is stored for the dry spells.",
  });
  b.tf({
    d: 1, skill: "RECALL", applies: ZIM,
    stem: "Pfumvudza/Intwasa is a conservation-agriculture programme for smallholder farmers in Zimbabwe, introduced in 2020.",
    answer: true,
    explanation: "True. Pfumvudza (Intwasa in isiNdebele) was introduced in 2020 to promote conservation agriculture on smallholder plots.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Conservation agriculture always needs less labour than ploughing, because no ploughing is done.",
    answer: false,
    explanation: "False. Digging basins and frequent hand weeding often need more labour, especially in the first seasons.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each practice with the principle of conservation agriculture it applies.",
    pairs: ["Digging planting basins instead of ploughing", "Keeping maize stover on the surface", "Growing soya beans after maize", "Ripping narrow lines with an ox-drawn ripper"],
    right: ["Minimum soil disturbance", "Permanent soil cover", "Crop rotation or association"],
    rightIndex: [0, 1, 2, 0],
    explanation: "Basins and rip lines disturb little soil; residues give cover; legume-cereal sequences are rotation.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "In conservation agriculture, crop residues kept on the surface are called {{blank:a}}. Manure and fertiliser are placed only in the planting {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["mulch", "a mulch"] },
      { id: "b", accepted: ["basins", "basin", "holes", "stations"] },
    ],
    explanation: "Mulch gives permanent cover; precise application in basins puts nutrients near roots.",
  });
  b.num({
    d: 3, skill: "APPLICATION", daily: true, calculator: true,
    stem: "Basins are spaced 90 cm between rows and 40 cm within the row. How many basins are there per hectare, to the nearest whole number?",
    value: Math.round(popD.perHa), unit: "plants/ha", tol: 1, wrong: [Math.round(10000 / (90 * 40)), 90 * 40],
    hints: ["Convert both spacings to metres first.", "Basins per ha = 10,000 m² ÷ area per basin."],
    explanation: `Area per basin = 0.90 × 0.40 = 0.36 m². Basins = 10,000 ÷ 0.36 = ${round(popD.perHa, 1)}, about ${Math.round(popD.perHa).toLocaleString("en-GB")} per hectare. Forgetting to convert cm to m gives a far too small number.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A Pfumvudza plot measures 30 m × 20 m. Basins are spaced 80 cm between rows and 50 cm within rows. Calculate the number of basins on the plot (ignore edge effects).",
    applies: ZIM,
    value: Math.round(basinsC), unit: undefined, wrong: [Math.round(plotC.m2 / (80 * 50)), plotC.m2],
    hints: ["Find the plot area in m².", "Divide by the area of one basin in m²."],
    explanation: `Plot area = 30 × 20 = ${plotC.m2} m². Area per basin = 0.80 × 0.50 = ${round(popC.m2PerStation, 2)} m². Basins = ${plotC.m2} ÷ ${round(popC.m2PerStation, 2)} = ${Math.round(basinsC)}.`,
    workedSolution: `1. Plot area = 30 × 20 = ${plotC.m2} m².\n2. Area per basin = 0.80 m × 0.50 m = ${round(popC.m2PerStation, 2)} m².\n3. Number of basins = ${plotC.m2} ÷ ${round(popC.m2PerStation, 2)} = ${Math.round(basinsC)}.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Assume a farmer applies 0.4 kg of manure to each of 1,500 planting basins. How much manure, in kg, does she need?",
    value: manureKg, unit: "kg", wrong: [1500 / 0.4, 0.4 * 150],
    explanation: `Manure = 0.4 × 1,500 = ${manureKg} kg.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the conservation-agriculture principle that is applied by keeping crop residues on the soil surface.",
    accepted: ["permanent soil cover", "soil cover", "permanent cover", "mulching", "mulch cover", "permanent organic soil cover"],
    keywords: { any: ["cover", "mulch"] },
    explanation: "**Permanent soil cover** (mulching).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how minimum soil disturbance improves soil structure over several seasons.",
    hints: ["Think about organic matter, earthworms and pans."],
    points: [
      "Less air is mixed into the soil, so organic matter is oxidised more slowly and builds up.",
      "Humus binds particles into stable crumbs.",
      "Earthworm and root channels are not destroyed, so drainage and aeration improve.",
      "No plough pan forms (or: crumbs are not broken by repeated tillage).",
    ],
    modelAnswer: "Without ploughing, less air is mixed in, so humus is broken down more slowly and builds up, binding particles into crumbs. Earthworm burrows and old root channels stay open, improving drainage and aeration, and no plough pan forms.",
    explanation: "Tillage destroys structure; minimum disturbance lets it rebuild.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true, applies: ZIM,
    stem: "Tendai's family prepares a Pfumvudza maize plot of 24 m × 15 m. Basins are spaced 75 cm between rows and 60 cm within rows. Assume ammonium nitrate is applied as a top dressing at 250 kg/ha.",
    hints: ["Area per basin = 0.75 × 0.60 m².", "g per basin = kg/ha × 1,000 ÷ basins per ha."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the number of basins on the plot (ignore edge effects).",
        value: Math.round(basinsS), wrong: [plotS.m2],
        explanation: `${plotS.m2} m² ÷ 0.45 m² = ${Math.round(basinsS)} basins.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the mass of ammonium nitrate needed for the whole plot, in kg.",
        value: anS.kg, unit: "kg", wrong: [250 * plotS.m2],
        explanation: `${plotS.m2} m² = ${plotS.ha} ha; 250 × ${plotS.ha} = ${anS.kg} kg.`,
      }),
      P.num({
        label: "(c)", stem: "Calculate the mass of ammonium nitrate per basin, in g, to two decimal places.",
        value: gPerBasinS, unit: "g/plant", tol: 0.005, wrong: [round(250 / basinsS, 2)],
        explanation: `Basins per ha = 10,000 ÷ 0.45 = ${round(popS.perHa, 1)}; 250,000 g ÷ ${round(popS.perHa, 1)} = ${gPerBasinS} g. (Or ${anS.kg * 1000} g ÷ ${Math.round(basinsS)} basins.)`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why fertiliser is placed in each basin rather than spread over the whole plot.",
        points: ["The fertiliser is placed close to the roots of the crop.", "So less is wasted on soil between rows / feeding weeds / lost, and a small amount goes further."],
        explanation: "Precision application is efficient.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Suggest **three** management practices, other than fertiliser, that Tendai's family should follow to get a good yield from the plot.",
        points: ["Plant with the first effective rains (timely planting).", "Keep a mulch cover between the rows.", "Weed early and often / rotate with a legume next season / apply manure in each basin."],
        explanation: "Timeliness, cover, weeding and rotation are essential parts of the system.",
      }),
    ],
    explanation: "Basins = area ÷ area per basin; fertiliser per basin = rate in g/ha ÷ basins per ha.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "Two neighbouring farmers near Masvingo grow maize. Farmer A ploughs every year, plants maize every season and burns the stover. Farmer B uses planting basins, keeps stover as mulch and rotates maize with cowpeas.",
    hints: ["Compare the three principles one at a time."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which farmer's soil is likely to have more organic matter after five years?",
        options: [
          ["Farmer B", "Correct: no ploughing, residues returned and legumes in rotation."],
          ["Farmer A", "Ploughing and burning reduce organic matter."],
          ["Both the same", "Their practices differ greatly."],
          ["Neither, because maize removes all organic matter", "Residues returned to the soil add organic matter."],
        ],
        answer: "A",
        explanation: "Minimum disturbance and returned residues build organic matter.",
      }),
      P.manual({
        label: "(b)", marks: 5, stem: "Explain **five** advantages of Farmer B's system over Farmer A's.",
        points: [
          "Mulch protects soil from raindrop impact, so less capping and erosion.",
          "Basins and mulch conserve water, so the crop withstands dry spells.",
          "Minimum disturbance keeps organic matter and structure (no plough pan).",
          "Cowpeas fix nitrogen, reducing fertiliser needs for the next maize crop.",
          "Rotation breaks pest and disease cycles of maize / precise inputs and less draught power needed.",
        ],
        explanation: "Each principle gives specific benefits.",
      }),
    ],
    explanation: "Compare the systems principle by principle.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6, applies: ZIM,
    stem: "Discuss the benefits and limitations of the Pfumvudza/Intwasa programme for smallholder farmers in Zimbabwe.",
    hints: ["Give benefits linked to soil, water and yield.", "Give limitations linked to labour, livestock and inputs, then judge."],
    points: [
      "Benefit: basins and mulch conserve water, giving more reliable yields in seasons with dry spells.",
      "Benefit: less erosion and improved soil structure and organic matter over time.",
      "Benefit: precise use of manure and fertiliser; timely planting without needing draught animals.",
      "Limitation: heavy labour for digging basins and weeding, especially for elderly or small households.",
      "Limitation: livestock graze residues in communal areas, so mulch is hard to keep; termites eat mulch.",
      "Judgement: benefits are greatest where labour is available and residues can be protected; overall a sound approach if supported.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Pfumvudza helps smallholders because basins collect rain at the roots and mulch reduces evaporation, so maize survives dry spells and yields are more reliable. Without ploughing and with residues kept, erosion falls and organic matter builds up. Manure and fertiliser are placed exactly where they are needed, and households without oxen can still plant on time. However, digging basins and hand weeding demand a lot of labour, which is hard for small or elderly households. In communal areas cattle graze the stover after harvest, so the mulch is often lost, and termites can eat what remains. Overall the programme is a sound way to conserve soil and water, but its success depends on available labour and on protecting residues.",
    explanation: "Balanced answers apply benefits and limitations to real smallholder conditions.",
  });

  b.card("FACT", "Three principles of conservation agriculture", "Minimum soil disturbance, permanent soil cover, crop rotation or association.");
  b.card("DEFINITION", "Planting basin", "A small hand-dug hole at each planting station where seed, manure and fertiliser are placed and rain collects.");
  b.card("FACT", "Pfumvudza/Intwasa", "Zimbabwe's conservation-agriculture programme for smallholders, introduced in 2020.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Why dig basins in the dry season?", "So the crop can be planted on time with the first effective rains.");
  b.card("CONCEPT", "Benefits of mulch", "Absorbs raindrop impact, stops capping, slows runoff, reduces evaporation, cools soil, feeds organisms.");
  b.card("FORMULA", "Basins per hectare", "10,000 m² ÷ (row spacing in m × in-row spacing in m).");
  b.card("FORMULA", "Fertiliser per basin", "Rate (kg/ha) × 1,000 ÷ basins per ha = grams per basin.");
  b.card("CONCEPT", "Limitations of conservation agriculture", "Labour for basins and weeding, livestock grazing residues, termites, weeds, waterlogging on heavy soils.");
  b.card("CONCEPT", "Why rotate maize with a legume?", "The legume fixes nitrogen and the rotation breaks maize pest, disease and weed cycles.");
});
