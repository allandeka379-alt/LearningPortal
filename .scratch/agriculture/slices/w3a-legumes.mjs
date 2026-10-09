// Slice W3a: legume crops (groundnuts, soya beans, field beans).
import { concept, P, fertiliser, plantPopulation, yieldPerHa, pct, pctChange, round, check, table, fmtNum } from "../lib.mjs";

// Q: groundnut population at 45 x 7.5 cm.
const gPop = plantPopulation({ rowCm: 45, inRowCm: 7.5 });
check(Math.abs(gPop.perHa - 296296.296) < 0.01, "gPop");
// Q: gypsum 300 kg/ha on 1.4 ha.
const gyp = fertiliser({ rateKgHa: 300, areaHa: 1.4 });
check(Math.abs(gyp.kg - 420) < 1e-9 && gyp.bags === 9, "gyp");
// Q: shelling percentage.
const shell = pct(1080, 1500);
check(Math.abs(shell - 72) < 1e-9, "shell");
// Q: inoculant sachets for 3 ha at 80 kg/ha, 50 kg per sachet.
const soySeed = 80 * 3;
const sachets = Math.ceil(soySeed / 50);
check(soySeed === 240 && sachets === 5, "sachets");

// Struct: gypsum trial on 100 m2 plots.
const GT = [["Without gypsum", 21, 30], ["With gypsum at early flowering", 28, 8]];
const GT_TABLE = table(["Treatment", "Dry pods from the 100 m² plot (kg)", "Empty pods (pops) in a sample of 100 pods"], GT.map(([t, kg, pops]) => [t, kg, pops]));
const gtY = GT.map(([, kg]) => yieldPerHa({ kg, areaHa: 0.01 }).tPerHa);
const gtInc = pctChange(GT[0][1], GT[1][1]);
check(Math.abs(gtY[1] - 2.8) < 1e-9 && Math.abs(gtY[0] - 2.1) < 1e-9 && Math.abs(gtInc - 33.333) < 0.001, "gt");

// Struct: soya inoculation trial.
const ST = [["Not inoculated", 2, 1.4], ["Inoculated", 31, 2.45]];
const ST_TABLE = table(["Treatment", "Mean number of nodules per plant", "Grain yield (t/ha)"], ST.map(([t, n, y]) => [t, n, y.toFixed(2)]));
const stInc = pctChange(ST[0][2], ST[1][2]);
check(Math.abs(stInc - 75) < 1e-9, "st");

concept("agri.crops.legumes", { file: "crops/legumes", keyPrefix: "crops.legumes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which bacteria live in the root nodules of soya beans and fix nitrogen?",
    options: [
      ["*Rhizobium*", "Correct: the nodule bacteria of legumes."],
      ["*Azotobacter*", "A free-living nitrogen fixer, not a nodule bacterium."],
      ["*Nitrosomonas*", "A nitrifying bacterium that turns ammonium into nitrite."],
      ["*Aspergillus*", "A mould; one species produces aflatoxin."],
    ],
    answer: "A",
    explanation: "*Rhizobium* (for soya, *Bradyrhizobium*) bacteria in nodules fix atmospheric nitrogen for the plant.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is gypsum applied to groundnuts at early flowering?",
    options: [
      ["To supply calcium for pod filling in the pegging zone", "Correct: pods absorb calcium directly from the soil."],
      ["To supply nitrogen to the young leaves", "Gypsum is calcium sulfate; it has no nitrogen."],
      ["To raise the soil pH strongly", "Gypsum is nearly neutral; lime raises pH."],
      ["To kill the aphids that spread groundnut rosette virus", "Gypsum is not an insecticide."],
    ],
    answer: "A",
    explanation: "Without calcium in the pegging zone many pods are empty (pops).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do groundnuts grow best on light, sandy loam soils?",
    options: [
      ["Pegs enter the soil easily and the pods lift out cleanly", "Correct: heavy clay hinders pegging and harvest."],
      ["Sandy soils always contain more nitrogen than clay soils do", "Sandy soils are usually poorer in nutrients."],
      ["Groundnuts need waterlogged conditions", "Groundnuts need well-drained soil."],
      ["Sandy soils hold far more water than clays", "Clays hold more water than sands."],
    ],
    answer: "A",
    explanation: "Pods develop underground, so a loose, well-drained soil suits pegging and lifting.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha mixed soya seed with inoculant in full sun at 10:00 and planted it the next morning. What is the most likely result?",
    options: [
      ["Few nodules form because the bacteria died", "Correct: sunlight, heat and delay kill Rhizobium."],
      ["The seed fails to germinate at all", "Inoculant does not affect germination."],
      ["The plants will form nodules but no pods", "Pod formation is not prevented by this mistake."],
      ["The crop becomes resistant to soya bean rust", "Inoculation has no effect on rust."],
    ],
    answer: "A",
    hints: ["The inoculant contains living bacteria."],
    explanation: "Inoculate in the shade and plant the same day; dead bacteria cannot form nodules, so the crop runs short of nitrogen.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are groundnuts dried with the pods facing upwards, off the damp ground?",
    options: [
      ["To prevent the mould that produces aflatoxin", "Correct: quick drying stops Aspergillus mould growing."],
      ["To let the pods continue to fill with oil after lifting", "Pods do not fill after lifting."],
      ["To make the kernels sprout before storage", "Sprouting spoils groundnuts."],
      ["To let rain wash soil off the shells", "Wet pods mould; rain is avoided."],
    ],
    answer: "A",
    hints: ["What grows on damp groundnuts?"],
    explanation: "Damp pods grow *Aspergillus* mould, which produces aflatoxin, a poison for people and livestock.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which insect spreads groundnut rosette virus?",
    options: [
      ["Aphids", "Correct: aphids carry the virus from plant to plant."],
      ["Leafhoppers", "Leafhoppers spread maize streak virus."],
      ["Bean fly", "The bean fly maggot damages bean stems."],
      ["Bruchids", "Bruchids attack stored beans."],
    ],
    answer: "A",
    explanation: "Early planting at a full, even stand reduces rosette, because aphids prefer sparse, late crops.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why should soya beans be harvested as soon as the pods are dry?",
    options: [
      ["Dry pods shatter and drop their seed if left", "Correct: delay causes heavy losses on the ground."],
      ["Dry soya seed loses all its oil within days", "Oil content does not fall like this."],
      ["The plants regrow leaves and use up the seed", "Mature soya does not regrow."],
      ["The pods turn into nodules", "Pods and nodules are unrelated."],
    ],
    answer: "A",
    hints: ["What happens to very dry pods in hot weather?"],
    explanation: "Shattering is the main harvest loss in soya, so cut and thresh promptly.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A farmer gave his soya crop a large nitrogen top dressing. Which result is most likely?",
    options: [
      ["Little extra yield, since nodules fix less when nitrogen is plentiful", "Correct: the money is largely wasted."],
      ["A doubling of yield, as soya cannot fix nitrogen", "Well-nodulated soya fixes most of its own nitrogen."],
      ["Much more nodule growth on the roots of every single plant in the crop", "Soil nitrate suppresses nodulation."],
      ["Protection of the crop from pod-sucking bugs", "Nitrogen does not control insects."],
    ],
    answer: "A",
    hints: ["Do nodules form more or less when the soil is rich in nitrate?"],
    explanation: "Legumes need phosphorus and potassium; heavy nitrogen reduces fixation and seldom pays.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Groundnut pods develop underground from pegs that grow down from fertilised flowers.",
    answer: true,
    explanation: "True. This is pegging; finish weeding before it starts so that pegs are not damaged.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Soya beans grown on land that has never carried soya need no inoculation because all soils contain the right bacteria.",
    answer: false,
    explanation: "False. The specific bacteria for soya are usually absent from new land, so seed must be inoculated.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each problem with the legume crop and cause.",
    pairs: [
      ["Rosette", "Groundnut virus spread by aphids"],
      ["Rust", "Fungal disease of soya beans"],
      ["Bean stem maggot", "Fly larva tunnelling in young bean stems"],
      ["Holes in stored beans", "Bruchids (bean weevils)"],
      ["Many empty pods (pops)", "Shortage of calcium in groundnuts"],
    ],
    explanation: "Know the main pests, diseases and disorders of each legume.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Gypsum is the chemical calcium {{blank:a}}; it supplies {{blank:b}} to groundnut pods.",
    blanks: [
      { id: "a", accepted: ["sulfate", "sulphate"] },
      { id: "b", accepted: ["calcium", "Ca"] },
    ],
    explanation: "Gypsum, calcium sulfate, supplies calcium (and sulfur) without raising pH much.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Gypsum is spread at 300 kg/ha on 1.4 ha of groundnuts. How many 50 kg bags are needed? Round UP to whole bags.",
    value: gyp.bags, unit: "bags", tol: 0, wrong: [Math.floor(gyp.exactBags), 6],
    explanation: `300 × 1.4 = ${gyp.kg} kg; ${gyp.kg} ÷ 50 = ${gyp.exactBags}, so ${gyp.bags} bags. Using 300 ÷ 50 = 6 forgets the area.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Groundnuts are planted in rows 45 cm apart with one plant every 7.5 cm. Calculate the plant population per hectare, to the nearest whole plant.",
    value: gPop.perHa, unit: "plants/ha", tol: 0.5, answer: "296296", wrong: [round(10000 / (45 * 7.5), 2), 337.5],
    hints: ["Convert both spacings to metres."],
    explanation: `0.45 m × 0.075 m = 0.03375 m²; 10,000 ÷ 0.03375 = ${fmtNum(gPop.perHa)} plants/ha.`,
    workedSolution: `1. Area per plant = 0.45 × 0.075 = 0.03375 m².\n2. Plants/ha = 10,000 ÷ 0.03375 = ${fmtNum(gPop.perHa)}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Tatenda shelled 1,500 kg of dry groundnut pods and obtained 1,080 kg of kernels. Calculate the shelling percentage.",
    value: shell, unit: "%", tol: 0, wrong: [round(pct(1500, 1080), 1), 420],
    hints: ["Kernels ÷ pods × 100."],
    explanation: `1,080 ÷ 1,500 × 100 = ${shell}%. Dividing the pod mass by the kernel mass gives more than 100%, which is impossible.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "Farai will plant 3 ha of soya at 80 kg/ha. Assume one sachet of inoculant treats 50 kg of seed. How many sachets must he buy? Round UP.",
    value: sachets, tol: 0, wrong: [4, soySeed],
    hints: ["Find the total seed first."],
    explanation: `Seed = 80 × 3 = ${soySeed} kg; ${soySeed} ÷ 50 = ${soySeed / 50}, so ${sachets} sachets. Rounding down leaves some seed uninoculated.`,
    workedSolution: `1. Seed = 80 × 3 = ${soySeed} kg.\n2. Sachets = ${soySeed} ÷ 50 = ${soySeed / 50}.\n3. Round up: ${sachets} sachets.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the poison produced by moulds growing on damp groundnuts.",
    accepted: ["aflatoxin", "aflatoxins"],
    keywords: { any: ["aflatox"] },
    explanation: "**Aflatoxin**, produced by *Aspergillus* moulds.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** benefits of growing a legume before maize in a rotation.",
    hints: ["Think of nitrogen and of pests and diseases."],
    points: [
      "Legumes fix atmospheric nitrogen through Rhizobium in root nodules.",
      "Residues release this nitrogen as they decompose, so the maize needs less nitrogen fertiliser.",
      "The legume belongs to a different family, so maize pests and diseases have no host for a season.",
      "So their numbers fall and the maize suffers less damage (also: deep roots / residues improve soil structure).",
    ],
    modelAnswer: "The legume fixes nitrogen through Rhizobium in its nodules, and the residues release it to the next maize crop, which then needs less top dressing. Because it is a different family, maize pests and diseases such as grey leaf spot die out for a season, so the maize is healthier.",
    explanation: "Nitrogen and break-crop benefits.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe how Sipho should inoculate and plant soya bean seed on land where soya has never been grown.",
    hints: ["Keep the bacteria alive and in contact with the seed."],
    points: [
      "Use fresh inoculant of the correct type for soya, stored cool and within its expiry date.",
      "Mix it with the seed (with a little water or sticker) in the shade, not in direct sun.",
      "Do not mix inoculated seed with fertiliser or incompatible seed dressings.",
      "Plant into moist soil the same day and cover the seed promptly.",
    ],
    modelAnswer: "Sipho should buy fresh soya inoculant and keep it cool. In the shade he dampens the seed slightly and mixes in the inoculant so every seed is coated, keeping it away from fertiliser and seed dressings. He plants into moist soil the same day and covers the seed at once.",
    explanation: "Correct strain, shade, no fertiliser contact, plant at once.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Pupils at a school near Chipinge tested gypsum on groundnuts using two 100 m² plots.\n\n${GT_TABLE}`,
    hints: ["100 m² = 0.01 ha.", "Percentage increase = increase ÷ original × 100."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the yield of dry pods from the gypsum plot in t/ha.",
        value: gtY[1], unit: "t/ha", tol: 0.005, answer: "2.8", wrong: [0.28, 28],
        explanation: `28 kg ÷ 0.01 ha = ${fmtNum(gtY[1] * 1000)} kg/ha = ${gtY[1]} t/ha.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage increase in pod yield due to gypsum, to the nearest whole number.",
        value: gtInc, unit: "%", tol: 0.5, answer: "33", wrong: [25, 7],
        explanation: `(28 − 21) ÷ 21 × 100 = ${round(gtInc, 1)}%, about 33%. Dividing by 28 gives 25%, which is wrong.`,
      }),
      P.short({
        label: "(c)", stem: "Name the nutrient in gypsum that reduced the number of empty pods.",
        accepted: ["calcium", "Ca"],
        explanation: "Calcium.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain how the gypsum reduced the number of empty pods.",
        points: ["Gypsum supplies soluble calcium to the pegging zone.", "Developing pods absorb calcium directly from the soil around them (not from the roots).", "With enough calcium the kernels fill properly, so fewer pods are empty (pops)."],
        explanation: "Calcium uptake by pods.",
      }),
    ],
    explanation: "Calculate yield and increase from a gypsum trial and explain the role of calcium.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 12, calculator: true,
    stem: `A farmer near Bindura compared inoculated and uninoculated soya beans on new land.\n\n${ST_TABLE}`,
    hints: ["Link nodules to nitrogen and to yield.", "Inoculant is cheap compared with nitrogen fertiliser."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage increase in yield due to inoculation.",
        value: stInc, unit: "%", tol: 0.5, answer: "75", wrong: [round(pct(1.05, 2.45), 1), 1.05],
        explanation: `(2.45 − 1.40) ÷ 1.40 × 100 = ${stInc}%.`,
      }),
      P.mcq({
        label: "(b)", stem: "Why did the uninoculated plants have so few nodules?",
        options: [
          ["The correct bacteria were not present in the new land", "Correct: soya needs its own specific bacteria."],
          ["Soya plants never form any nodules unless fertiliser is added", "Nodules form when the right bacteria are present."],
          ["The plants were too young to have roots", "Both sets of plants grew the same time."],
          ["Nodules only form on cereal crops", "Nodules form on legumes."],
        ],
        answer: "A",
        explanation: "Specific bacteria for soya are usually absent where soya has not been grown before.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how the extra nodules increased the yield.",
        points: ["Rhizobium in the nodules fixes nitrogen gas from the soil air.", "It is converted to ammonium compounds supplied to the plant (the plant gives the bacteria sugars).", "More nitrogen allows more protein and chlorophyll, so more leaf growth, photosynthesis and pods/seed."],
        explanation: "Fixation to yield.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "State **three** precautions when handling inoculant.",
        points: ["Store it cool and use before the expiry date.", "Mix with seed in the shade, out of direct sunlight.", "Plant the same day and keep it away from fertiliser and incompatible seed dressings."],
        explanation: "Keeping the bacteria alive.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest why inoculation is a cheap way to increase soya yields compared with applying nitrogen fertiliser.",
        points: ["A sachet of inoculant costs far less than the nitrogen fertiliser that would supply the same nitrogen.", "Fixed nitrogen is not leached like fertiliser and also benefits the next crop."],
        explanation: "Cost and residual benefit.",
      }),
    ],
    explanation: "Interpret an inoculation trial and explain nitrogen fixation and the handling of inoculant.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "Thandeka's Spanish-type groundnuts near Mutoko show yellowing leaves in April, and some kernels in a pulled plant are well coloured. Heavy rain is forecast.",
    hints: ["Spanish types have little seed dormancy."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "State **two** signs that would confirm the crop is ready to lift.",
        points: ["Most pods show a darkened inside of the shell.", "Kernels have well-coloured skins / leaves yellowing and dropping."],
        explanation: "Maturity signs.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why delaying the harvest is risky for this type of groundnut.",
        points: ["Spanish types have little seed dormancy.", "So mature kernels may sprout in the moist soil, and pods left in the ground also rot or detach."],
        explanation: "Lack of dormancy.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe how she should dry the lifted plants.",
        points: ["Shake off soil and lay plants in windrows with the pods upwards, off damp ground.", "Then stack them loosely (in stooks) in the open until the pods rattle, before picking."],
        explanation: "Pods up, off the soil, airy.",
      }),
    ],
    explanation: "Maturity, harvest timing and drying of groundnuts.",
  });

  b.card("DEFINITION", "Legume", "Plant of the pea and bean family: seeds in pods, root nodules with nitrogen-fixing Rhizobium.");
  b.card("DEFINITION", "Inoculation", "Coating legume seed with the correct Rhizobium bacteria so that effective nodules form.");
  b.card("FACT", "Why gypsum on groundnuts?", "Supplies calcium to the pegging zone at early flowering; without it many pods are empty (pops).");
  b.card("CONCEPT", "Handling inoculant", "Keep cool, mix with seed in the shade, avoid fertiliser and some seed dressings, plant the same day.");
  b.card("FACT", "Which mould poison affects damp groundnuts?", "Aflatoxin, from Aspergillus moulds; dry pods quickly, pods up, off the soil.");
  b.card("FORMULA", "Shelling percentage", "Mass of kernels ÷ mass of pods × 100.");
  b.card("FACT", "Main legume pests and diseases", "Groundnut rosette (aphids), leaf spots, soya rust, bean stem maggot, bacterial blight, bruchids in store.");
  b.card("CONCEPT", "Legumes in rotation", "Fix nitrogen for the next cereal and break cereal pest and disease cycles.");
  b.card("FACT", "Spanish and Virginia groundnuts", "Spanish: erect, early, little seed dormancy. Virginia: spreading, longer season, dormant seed.");
});
