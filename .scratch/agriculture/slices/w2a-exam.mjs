// Slice W2a: exam-format items. Theory structured (10 marks: ZIMSEC P2 Section A / Cambridge P1 Section A), ZIMSEC P2
// Section B crop production (20 marks) and Cambridge P1 Section B (15 marks). Part splits are our convention; a reviewer
// must check them against past papers.
import { concept, P, ZIM, CAM, fertiliser, perStation, plantPopulation, nutrientKg, fence, field, waterVolume, round, check, table, agricultureLevels } from "../lib.mjs";

// T1: fertiliser for 1.4 ha of maize at 90 x 30 cm.
const T1A = 1.4;
const T1basal = fertiliser({ rateKgHa: 300, areaHa: T1A });
const T1pop = plantPopulation({ rowCm: 90, inRowCm: 30 });
const T1g = perStation({ rateKgHa: 300, population: T1pop.perHa });
check(Math.abs(T1basal.kg - 420) < 1e-9 && T1basal.bags === 9 && Math.abs(T1g - 8.1) < 1e-9, "T1");

// T2: soil pH results.
const T2_ROWS = [["P", "Red-orange", 4.8, 0.35], ["Q", "Green", 6.8, 0.5], ["R", "Yellow-green", 6.0, 0.4]];
const T2_TABLE = table(["Plot", "Colour of indicator", "pH from chart", "Area (ha)"], T2_ROWS.map(([p, c, ph, a]) => [p, c, ph.toFixed(1), a]));
const T2lime = fertiliser({ rateKgHa: 2000, areaHa: T2_ROWS[0][3] });
const T2times = 10 ** (T2_ROWS[1][2] - T2_ROWS[0][2]);
check(T2lime.bags === 14 && Math.abs(T2times - 100) < 1e-9, "T2");

// T3: irrigation of 0.6 ha.
const T3net = waterVolume({ areaM2: 6000, depthMm: 35 }).litres;
const T3gross = T3net / 0.7;
check(T3net === 210000 && Math.abs(T3gross - 300000) < 1e-6, "T3");

// T4: fence round 160 m x 80 m.
const T4p = field(160, 80);
const T4F = fence({ perimeterM: T4p.perimeterM, postSpacingM: 8, strands: 4, rollM: 250 });
check(T4p.perimeterM === 480 && T4F.posts === 60 && T4F.wireM === 1920 && T4F.rolls === 8, "T4");

// Z1: maize on 3 ha.
const Z1A = 3;
const Z1_TABLE = table(["Test", "Result"], [["pH", "4.9 (strongly acid)"], ["Phosphorus", "Low"], ["Potassium", "Medium"], ["Magnesium", "Low"]]);
const Z1lime = fertiliser({ rateKgHa: 3000, areaHa: Z1A });
const Z1cd = fertiliser({ rateKgHa: 375, areaHa: Z1A });
const Z1n = nutrientKg(375, 7) + nutrientKg(200, 34.5);
check(Z1lime.bags === 180 && Z1cd.bags === 23 && Math.abs(Z1n - 95.25) < 1e-9, "Z1");

// Z2: drip-irrigated tomatoes.
const Z2lines = 25, Z2len = 30, Z2spacingCm = 30;
const Z2em = Z2lines * ((Z2len * 100) / Z2spacingCm);
const Z2flow = Z2em * 2;
const Z2water = waterVolume({ areaM2: 900, depthMm: 5 }).litres;
const Z2min = (Z2water / Z2flow) * 60;
check(Z2em === 2500 && Z2flow === 5000 && Z2water === 4500 && Math.abs(Z2min - 54) < 1e-9, "Z2");

// C2: cattle water.
const C2day = 40 * 45;
const C2days = 12000 / C2day;
check(C2day === 1800 && Math.abs(C2days - 6.6667) < 1e-3, "C2");

concept("agri.soil.inorganic-fertilisers", { file: "exam/w2a-theory", keyPrefix: "exam.w2a-theory" }, (b) => {
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.soil.inorganic-fertilisers", "agri.soil.plant-nutrients"],
    stem: `Tendai will plant ${T1A} ha of maize near Chinhoyi at a spacing of 90 cm × 30 cm, one plant per station. He will apply Compound D at 300 kg/ha at planting and ammonium nitrate as a top dressing. Fertiliser is sold in 50 kg bags.`,
    hints: ["kg = rate × area; bags are rounded up.", "g per station = kg/ha × 1000 ÷ stations per ha."],
    parts: [
      P.short({
        label: "(a)", stem: "State whether Compound D is a straight or a compound fertiliser.",
        accepted: ["compound", "compound fertiliser", "a compound fertiliser", "compound fertilizer"],
        rejected: ["straight"],
        explanation: "It supplies N, P and K, so it is a compound fertiliser.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the number of bags of Compound D Tendai must buy. Round UP to whole bags.",
        value: T1basal.bags, unit: "bags", tol: 0, wrong: [Math.floor(T1basal.exactBags), T1basal.kg],
        explanation: `300 × ${T1A} = ${T1basal.kg} kg; ${T1basal.kg} ÷ 50 = ${T1basal.exactBags}, so ${T1basal.bags} bags.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the mass of Compound D to be placed at each planting station, in g, to one decimal place.",
        value: T1g, unit: "g/plant", tol: 0.05, wrong: [round(300 / T1pop.perHa, 4), round(T1g * 10, 0)],
        explanation: `Stations per ha = 10,000 ÷ (0.9 × 0.3) = ${Math.round(T1pop.perHa).toLocaleString("en-GB")}; 300,000 g ÷ ${Math.round(T1pop.perHa).toLocaleString("en-GB")} = ${T1g.toFixed(1)} g.`,
      }),
      P.mcq({
        label: "(d)", stem: "Why is the ammonium nitrate applied as a top dressing rather than at planting?",
        options: [
          ["Nitrate leaches easily, so it is given when the crop can use it", "Correct."],
          ["Maize seedlings need no nitrogen at all during their first weeks", "Seedlings need some nitrogen; the compound supplies it."],
          ["Ammonium nitrate is mainly a phosphorus fertiliser for root growth", "It supplies nitrogen."],
          ["Top dressing raises the soil pH so that the maize can take up more phosphorus", "Ammonium fertilisers tend to lower pH."],
        ],
        answer: "A",
        explanation: "Applying nitrogen when the crop can use it reduces leaching losses.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why the Compound D should be placed a few centimetres from the seed rather than touching it.",
        points: ["Concentrated fertiliser salts touching the seed draw water out of it by osmosis (fertiliser burn).", "So germination is poor / seedlings die."],
        explanation: "Fertiliser burn.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "State **two** signs on the maize that would show it was short of nitrogen.",
        points: ["Yellowing of the older, lower leaves (a V from the tip along the midrib).", "Stunted, pale plants / thin stems / small cobs."],
        explanation: "Nitrogen deficiency signs.",
      }),
    ],
    explanation: "Identify the fertiliser type, calculate bags and grams per station, then explain timing, placement and deficiency signs.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.soil.ph-liming"],
    stem: `Form 3 pupils tested soil from three plots of a school farm near Gweru with universal indicator and a colour chart.\n\n${T2_TABLE}`,
    hints: ["Below pH 7 is acid.", "Each pH unit is a tenfold change."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which plot has the most acid soil?",
        options: [
          ["Plot P", "Correct: pH 4.8 is the lowest."],
          ["Plot Q", "pH 6.8 is close to neutral."],
          ["Plot R", "pH 6.0 is only slightly acid."],
          ["All three plots are equally acid", "Their pH values differ."],
        ],
        answer: "A",
        explanation: "The lower the pH, the more acid the soil.",
      }),
      P.short({
        label: "(b)", stem: "Name the substance added to the soil and water in the test tube to make the clay settle.",
        accepted: ["barium sulfate", "barium sulphate", "BaSO4"],
        keywords: { any: ["barium"] },
        explanation: "Barium sulfate.",
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Lime is recommended at 2 t/ha for plot P. Calculate the number of 50 kg bags needed for plot P.",
        value: T2lime.bags, unit: "bags", tol: 0, wrong: [round(2 * 0.35, 2), 140],
        explanation: `2,000 × 0.35 = ${T2lime.kg} kg; ${T2lime.kg} ÷ 50 = ${T2lime.bags} bags.`,
      }),
      P.num({
        label: "(d)", stem: "How many times more acid (in hydrogen ion concentration) is the soil of plot P than that of plot Q?",
        value: T2times, tol: 0, wrong: [2, 20],
        explanation: "6.8 − 4.8 = 2 units; 10 × 10 = 100 times.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why crops grow poorly in plot P.",
        points: ["Aluminium and manganese become soluble and toxic, damaging roots.", "Phosphorus is locked up / calcium and magnesium are short / soil bacteria (nitrifiers, Rhizobium) work poorly."],
        explanation: "Toxicity and nutrient lock-up at low pH.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Describe how the lime should be applied to plot P.",
        points: ["Spread it evenly by broadcasting.", "Work (disc or dig) it into the soil.", "Apply well before planting (it acts slowly) and not together with ammonium fertilisers."],
        explanation: "Broadcast, incorporate, early, separate from ammonium fertiliser.",
      }),
    ],
    explanation: "Interpret pH results, calculate lime and explain the effects of acidity and how to correct it.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.water.irrigation-methods", "agri.water.irrigation-need-sources"],
    stem: "Farai grows wheat in winter on 0.6 ha of gently undulating land with a sandy loam soil near Marondera. Water comes from a dam on the farm.",
    hints: ["1 mm over 1 m² = 1 L.", "Water to pump = water needed ÷ efficiency."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which irrigation method is most suitable for this wheat?",
        options: [
          ["Sprinkler irrigation", "Correct: suits close-spaced wheat, sandy loam and uneven land."],
          ["Basin irrigation", "Needs level land; unsuited to a close-sown cereal field."],
          ["Hand watering with cans", "Impossible on 0.6 ha of wheat."],
          ["Drip lines along every row", "Wheat rows are too close together for drip to be economic."],
        ],
        answer: "A",
        explanation: "Sprinklers wet the whole surface evenly and cope with uneven land and sandy soils.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the volume of water, in litres, needed to store 35 mm of water in the root zone over the 0.6 ha.",
        value: T3net, unit: "L", tol: 0, wrong: [0.6 * 35, 6000 * 35 / 1000],
        explanation: `0.6 ha = 6,000 m²; 6,000 × 35 = ${T3net.toLocaleString("en-GB")} L.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Assume the system is 70% efficient. Calculate the volume of water that must be pumped from the dam, in litres.",
        value: T3gross, unit: "L", tol: 0.5, answer: "300000", wrong: [T3net * 0.7, T3net],
        explanation: `${T3net.toLocaleString("en-GB")} ÷ 0.7 = 300,000 L.`,
      }),
      P.short({
        label: "(d)", stem: "Name the method of irrigation that delivers water drop by drop to each plant.",
        accepted: ["drip", "drip irrigation", "trickle", "trickle irrigation", "drip (trickle) irrigation"],
        keywords: { any: ["drip", "trickle"] },
        explanation: "Drip (trickle) irrigation.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why the wheat must be irrigated.",
        points: ["It is grown in the dry winter season when there is almost no rain.", "So without irrigation the crop would wilt and fail / yields would be very low."],
        explanation: "Seasonal rainfall.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "State **two** disadvantages of the method you chose in (a).",
        points: ["High cost of pipes, pump and energy.", "Wind causes uneven watering / evaporation losses / wet leaves favour disease / needs clean water."],
        explanation: "Sprinkler drawbacks.",
      }),
    ],
    explanation: "Choose a method, calculate water needed and supplied, and explain the need for irrigation.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.structures.fencing", "agri.structures.fence-construction"],
    stem: "A farmer near Masvingo will fence a rectangular paddock 160 m long and 80 m wide with 4 strands of barbed wire on gum poles placed every 8 m. Barbed wire is sold in 250 m rolls.",
    hints: ["Closed fence: posts = perimeter ÷ spacing.", "Round rolls UP."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the perimeter of the paddock, in m.",
        value: T4p.perimeterM, unit: "m", tol: 0, wrong: [T4p.m2, 240],
        explanation: `2 × (160 + 80) = ${T4p.perimeterM} m.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the number of posts needed.",
        value: T4F.posts, unit: "posts", tol: 0, wrong: [T4F.posts + 1, 30],
        explanation: `${T4p.perimeterM} ÷ 8 = ${T4F.posts} posts (closed fence).`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the number of rolls of barbed wire needed.",
        value: T4F.rolls, tol: 0, wrong: [Math.floor(T4F.wireM / 250), 1],
        explanation: `${T4p.perimeterM} × 4 = ${T4F.wireM.toLocaleString("en-GB")} m; ÷ 250 = ${T4F.wireM / 250}, so ${T4F.rolls} rolls.`,
      }),
      P.mcq({
        label: "(d)", stem: "Which treatment would make the gum poles last longest?",
        options: [
          ["Pressure treatment with a preservative", "Correct: deepest penetration."],
          ["Brushing preservative onto the surface of each pole", "Stays near the surface."],
          ["Leaving the bark on to protect the wood", "Bark blocks preservative and shelters insects."],
          ["Painting the tops of the poles", "The butt in the soil is where rot and termites attack."],
        ],
        answer: "A",
        explanation: "Pressure treatment forces preservative deep into the wood.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why the poles are debarked and seasoned before treatment.",
        points: ["Bark stops the preservative entering the wood and shelters insects.", "Dry (seasoned) wood absorbs preservative better than wet wood."],
        explanation: "Preparation for treatment.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Give **three** advantages of steel standards compared with gum poles.",
        points: ["Termite-proof and do not rot.", "Fire-proof.", "Long-lasting / quick to drive in / no preservative chemicals to handle."],
        explanation: "Advantages of steel.",
      }),
    ],
    explanation: "Fencing materials: calculate quantities, then explain post treatment and compare materials.",
  });
});

concept("agri.crops.maize", { file: "exam/w2a-zimsec", keyPrefix: "exam.w2a-zimsec", applies: ZIM }, (b) => {
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.crops.maize", "agri.soil.inorganic-fertilisers", "agri.soil.ph-liming", "agri.soil.plant-nutrients"],
    stem: `Rudo farms in natural region II near Chinhoyi. She plans to grow ${Z1A} ha of maize. A soil test of the field gave these results.\n\n${Z1_TABLE}\n\nShe will apply Compound D (assume 7% N) at 375 kg/ha at planting and ammonium nitrate (assume 34.5% N) at 200 kg/ha as top dressing. Lime and fertiliser are sold in 50 kg bags.`,
    hints: ["Bags = rate × area ÷ 50, rounded up.", "Nutrient = product × % ÷ 100.", "For the long part, follow the season in order and give a reason for each step."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the nutrient whose shortage would cause purple leaves on the young maize in this field.",
        accepted: ["phosphorus", "P", "phosphate"],
        explanation: "Phosphorus (low in the test, and locked up by acidity).",
      }),
      P.short({
        label: "(b)", stem: "Name the type of lime Rudo should use, given the soil test.",
        accepted: ["dolomitic lime", "dolomitic", "dolomite"],
        keywords: { any: ["dolomit"] },
        explanation: "Dolomitic lime corrects acidity and supplies the low magnesium.",
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Lime is recommended at 3 t/ha. Calculate the number of bags of lime needed.",
        value: Z1lime.bags, unit: "bags", tol: 0, wrong: [round(3 * Z1A / 50, 2), 18],
        explanation: `3,000 × ${Z1A} = ${Z1lime.kg.toLocaleString("en-GB")} kg; ÷ 50 = ${Z1lime.bags} bags.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Calculate the number of bags of Compound D needed. Round UP to whole bags.",
        value: Z1cd.bags, unit: "bags", tol: 0, wrong: [Math.floor(Z1cd.exactBags), Z1cd.kg],
        explanation: `375 × ${Z1A} = ${Z1cd.kg.toLocaleString("en-GB")} kg; ÷ 50 = ${Z1cd.exactBags}, so ${Z1cd.bags} bags.`,
      }),
      P.num({
        label: "(e)", marks: 2, stem: "Calculate the total mass of nitrogen applied per hectare from both fertilisers, in kg, to two decimal places.",
        value: Z1n, unit: "kg/ha", tol: 0.005, wrong: [nutrientKg(200, 34.5), 375 * 0.07 * Z1A + 200 * 0.345 * Z1A],
        explanation: `375 × 7 ÷ 100 = ${nutrientKg(375, 7)} kg; 200 × 34.5 ÷ 100 = ${nutrientKg(200, 34.5)} kg; total ${Z1n} kg N/ha.`,
      }),
      P.mcq({
        label: "(f)", stem: "When should the ammonium nitrate be applied?",
        options: [
          ["In split doses to the growing crop, e.g. at knee height and again later", "Correct."],
          ["All of it mixed with the lime a month before planting", "Lime with ammonium fertiliser loses ammonia; too early also leaches."],
          ["All of it placed in the planting hole together with the seed at planting", "This would burn the seed and leach."],
          ["After harvest, to prepare for the next season", "Too late to help this crop."],
        ],
        answer: "A",
        explanation: "Split top dressing matches nitrogen supply to rapid growth and reduces leaching.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Explain how liming the field with the lime you named in (b) will help Rudo get more value from her fertiliser.",
        points: ["Raising the pH releases phosphorus locked up by iron and aluminium / removes aluminium toxicity so roots grow well.", "Healthier roots and active soil bacteria (nitrifiers) take up and use more of the applied nutrients, so less is wasted.", "Dolomitic lime also supplies the magnesium (and calcium) that the soil test shows is low."],
        explanation: "Lime improves nutrient availability and uptake.",
      }),
      P.manual({
        label: "(h)", marks: 8,
        stem: "Describe and explain how Rudo should fertilise this maize crop, from preparing the land to tasselling.",
        points: [
          "Test the soil and lime with dolomitic lime well before planting (dry season), broadcast and worked in.",
          "Reason: lime acts slowly; it raises pH and supplies magnesium.",
          "Apply Compound D as a basal dressing at planting, banded or placed beside but not touching the seed.",
          "Reason: P and K move little and are needed for early root growth; contact burns seed.",
          "Add manure or compost where available to improve organic matter and nutrient holding.",
          "Top dress ammonium nitrate in split doses on moist soil beside the plants (e.g. about knee height and before tasselling).",
          "Reason: nitrogen leaches easily and is needed most during rapid vegetative growth; not on wet leaves (scorch).",
          "Watch for deficiency signs (yellow V on old leaves for N, purpling for P) and adjust; keep weeds controlled so they do not take the fertiliser.",
        ],
        levels: agricultureLevels(8),
        explanation: "A programme in order, with reasons: lime, basal, organic matter, split top dressing, monitoring.",
      }),
    ],
    explanation: "Soil test interpretation, lime and fertiliser calculations, and a reasoned fertiliser programme for maize.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.crops.vegetables", "agri.water.irrigation-methods", "agri.water.irrigation-equipment", "agri.water.irrigation-need-sources"],
    stem: `Chipo grows tomatoes in the dry season on a 30 m × 30 m plot near Mutare, using drip irrigation from a borehole. The plot has ${Z2lines} drip lines, each ${Z2len} m long, with an emitter every ${Z2spacingCm} cm. Each emitter delivers 2 L per hour.`,
    hints: ["Emitters per line = line length ÷ spacing (use the same units).", "Time = water needed ÷ flow rate.", "For the long part, link each management practice to yield or quality."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the part of the drip system that removes sand and silt from the water.",
        accepted: ["filter", "screen filter", "disc filter", "sand filter", "media filter"],
        keywords: { any: ["filter"] },
        explanation: "The filter.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the total number of emitters on the plot.",
        value: Z2em, tol: 0, wrong: [Z2lines * Z2len, Z2lines * Z2len * Z2spacingCm],
        explanation: `${Z2len} m = ${Z2len * 100} cm; ${Z2len * 100} ÷ ${Z2spacingCm} = ${(Z2len * 100) / Z2spacingCm} per line; × ${Z2lines} lines = ${Z2em.toLocaleString("en-GB")} emitters.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the total flow of the system, in litres per hour.",
        value: Z2flow, tol: 0, wrong: [Z2em, Z2lines * 2],
        explanation: `${Z2em.toLocaleString("en-GB")} × 2 = ${Z2flow.toLocaleString("en-GB")} L/h.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "The crop needs 5 mm of water over the whole plot. Calculate how many minutes the system must run.",
        value: Z2min, unit: "min", tol: 0, wrong: [Z2water / Z2flow, round(Z2flow / Z2water, 2)],
        explanation: `Water = 900 m² × 5 mm = ${Z2water.toLocaleString("en-GB")} L; ${Z2water.toLocaleString("en-GB")} ÷ ${Z2flow.toLocaleString("en-GB")} = ${Z2water / Z2flow} h = ${Z2min} minutes.`,
      }),
      P.mcq({
        label: "(e)", stem: "Why do tomatoes under drip irrigation usually suffer less from leaf diseases than tomatoes under sprinklers?",
        options: [
          ["The leaves stay dry", "Correct: fungal spores need wet leaves."],
          ["Drip water contains fungicide", "Not unless it is added."],
          ["Drip irrigation uses more water", "Drip uses less water."],
          ["The plants grow faster and outgrow every disease", "Leaf wetness, not growth rate, is the key."],
        ],
        answer: "A",
        explanation: "Overhead watering wets the foliage, which favours fungal infection.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why irregular watering can cause blossom-end rot in tomatoes.",
        points: ["Calcium reaches the fruit dissolved in water moving through the plant.", "When the soil dries out between waterings, too little calcium reaches the fruit, so tissue at the blossom end collapses."],
        explanation: "Calcium moves with water.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "State **two** routine maintenance tasks for Chipo's drip system.",
        points: ["Clean the filter regularly.", "Flush the drip lines / check and repair leaks / replace blocked emitters."],
        explanation: "Drip maintenance.",
      }),
      P.manual({
        label: "(h)", marks: 8,
        stem: "Explain how drip irrigation, correctly managed, can improve the yield and quality of Chipo's tomato crop compared with furrow irrigation.",
        points: [
          "Drip delivers water to the root zone, so little is lost by evaporation, runoff and deep drainage; the limited borehole water irrigates more plants.",
          "Frequent small applications keep soil moisture even, reducing stress, fruit cracking and blossom-end rot.",
          "Leaves stay dry, so fewer fungal leaf diseases and sprays are not washed off.",
          "Fertigation supplies nutrients directly to the roots in small, frequent doses, reducing leaching.",
          "Fewer weeds grow between the rows because the soil there stays dry.",
          "Fruit stays clean (no soil splash), improving marketable quality.",
          "Management needed: filter and flush to prevent blocked emitters; schedule irrigation to crop stage and weather; avoid over-watering.",
          "Comparison: furrow is cheaper but wastes water on sandy soils, wets the soil surface widely and gives less even moisture.",
        ],
        levels: agricultureLevels(8),
        explanation: "Link each feature of drip and its management to yield and quality, and compare with furrows.",
      }),
    ],
    explanation: "Drip system calculations, equipment and maintenance, and how irrigation management affects tomato yield and quality.",
  });
});

concept("agri.soil.organic-manures", { file: "exam/w2a-cambridge", keyPrefix: "exam.w2a-cambridge", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 945,
    paper: "Cambridge Paper 1 Section B",
    concepts: ["agri.soil.organic-manures", "agri.soil.nitrogen-cycle", "agri.soil.inorganic-fertilisers"],
    stem: "A farmer has grown maize on the same field for many years using only inorganic fertilisers. The soil has become hard, holds little water and yields are falling.",
    hints: ["(a) Give the steps in order with reasons.", "(b) Follow nitrogen from the air to the next crop.", "(c) Weigh both types of fertiliser and decide."],
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe how the farmer could make compost.",
        points: [
          "Choose a shaded, level, well-drained site and lay a base of coarse material (stalks) for aeration.",
          "Build layers of plant material, a thin layer of manure (nitrogen and microbes) and soil.",
          "Water each layer to keep it moist and cover the heap; it heats up as microbes respire.",
          "Turn the heap after a few weeks to let in air; it is ready in about two to three months when dark and crumbly.",
        ],
        explanation: "Ordered steps with reasons.",
      }),
      P.manual({
        label: "(b)", marks: 5, stem: "Explain how growing a legume such as groundnuts in rotation with the maize would improve soil fertility. Refer to the nitrogen cycle in your answer.",
        points: [
          "Legume roots have nodules containing Rhizobium bacteria.",
          "Rhizobium fixes nitrogen gas from the soil air into ammonium compounds used by the plant.",
          "When legume roots and residues die, decomposers break down their proteins, releasing ammonium (ammonification).",
          "Nitrifying bacteria convert ammonium to nitrite and then nitrate (nitrification).",
          "The nitrate is available to the following maize crop, so less nitrogen fertiliser is needed (residues also add organic matter).",
        ],
        explanation: "Fixation, decomposition and nitrification.",
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Discuss whether the farmer should stop using inorganic fertilisers and use only organic manures.",
        points: [
          "Organic manures add organic matter, improving structure, water-holding and soil life, which this soil needs.",
          "They release nutrients slowly, reducing leaching, and supply trace elements.",
          "But they are bulky, low in nutrients and slow-acting, so large amounts and much labour are needed.",
          "Inorganic fertilisers act quickly and supply known amounts, so yields can be kept up.",
          "But used alone they add no organic matter and some acidify the soil.",
          "Judgement: combine both rather than stopping inorganic fertilisers, e.g. compost/manure plus legumes plus reduced, well-timed fertiliser.",
        ],
        levels: agricultureLevels(6),
        explanation: "Weigh organic against inorganic and decide.",
      }),
    ],
    explanation: "Compost making, legumes in the nitrogen cycle and a judgement on organic and inorganic fertilisers.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 945, calculator: true,
    paper: "Cambridge Paper 1 Section B",
    concepts: ["agri.structures.water-supply", "agri.water.irrigation-methods"],
    stem: "A farm needs water for the farmhouse, 40 cattle and a vegetable plot. The farmer plans a small earth dam across a stream and a 12,000 L storage tank.",
    hints: ["(a) Think of seepage, pressure and floods.", "(b) Daily demand = animals × litres each.", "(d) Compare water use, cost and crop needs."],
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline how the earth dam should be constructed so that it resists water pressure and does not fail.",
        points: [
          "Dig a cut-off trench to impermeable material and fill it with compacted clay to stop seepage under the wall.",
          "Build the wall in thin, moistened, compacted layers with a clay core.",
          "Make the wall much wider at the base than the top because pressure increases with depth.",
          "Build a spillway in firm ground to carry floods past the wall; protect faces with stones and grass.",
        ],
        explanation: "Seepage control, compaction, shape and spillway.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Assume each animal drinks about 45 L of water a day. Calculate how many whole days a full 12,000 L tank would supply the cattle.",
        value: Math.floor(C2days), unit: "days", tol: 0, wrong: [Math.ceil(C2days), round(12000 / 45, 0)],
        explanation: `40 × 45 = ${C2day.toLocaleString("en-GB")} L a day; 12,000 ÷ ${C2day.toLocaleString("en-GB")} = ${round(C2days, 2)}, so ${Math.floor(C2days)} whole days.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Outline how the dam water could be treated to make it fit for use in the farmhouse.",
        points: [
          "Let it stand in a tank so silt settles (a coagulant such as alum may be added).",
          "Pass it through a slow sand filter (fine sand over coarse sand over gravel) to remove fine particles and many microbes.",
          "Disinfect by chlorination or boiling before drinking.",
        ],
        explanation: "Settle, filter, disinfect.",
      }),
      P.manual({
        label: "(d)", marks: 6, stem: "Discuss which irrigation method the farmer should use for the vegetable plot, given that the dam may run low in the dry season.",
        points: [
          "Drip is the most efficient (water only to the root zone), so limited dam water goes further.",
          "Drip keeps leaves dry (fewer diseases) and allows fertigation; good for high-value vegetables.",
          "But drip is costly and dam water must be filtered to stop emitters blocking.",
          "Furrow irrigation is cheap and simple, may use gravity from the dam, but wastes water and needs level land.",
          "Sprinklers suit uneven land but lose water to evaporation and wind and wet the leaves.",
          "Judgement: drip (with a filter) is best where water is scarce and the farmer can afford it; otherwise careful furrow or hand watering on a smaller area.",
        ],
        levels: agricultureLevels(6),
        explanation: "Weigh efficiency, cost and suitability and decide.",
      }),
    ],
    explanation: "Dam construction, water demand, treatment and choice of irrigation method for limited water.",
  });
});
