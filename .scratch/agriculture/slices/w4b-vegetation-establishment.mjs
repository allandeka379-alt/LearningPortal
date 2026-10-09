// Slice W4b: grazing land vegetation and improved pastures (Cambridge only).
import { concept, P, field, fertiliser, mean, pct, round, check, table } from "../lib.mjs";

const F = field(180, 100);
check(F.ha === 1.8, "F");
const seedKg = round(5 * F.ha, 3);
check(seedKg === 9, "seedKg");
const ssp = fertiliser({ rateKgHa: 250, areaHa: F.ha });
check(ssp.kg === 450 && ssp.bags === 9, "ssp");
const limeT = round(2 * F.ha, 3);
check(limeT === 3.6, "limeT");
// Num: quadrat 0.25 m2, mean count 18 -> per m2.
const perM2 = 18 / 0.25;
check(perM2 === 72, "perM2");
// Struct 8: establishment trial, seedlings per m2 at 6 weeks (means of 4 quadrats).
const TRIAL = [
  ["P", "Fine, firm seedbed; seed 1 cm deep; rolled", [64, 70, 58, 68]],
  ["Q", "Fine seedbed; seed 1 cm deep; not rolled", [40, 46, 38, 44]],
  ["R", "Cloddy seedbed; seed 5 cm deep; not rolled", [9, 12, 7, 8]],
];
const tMeans = TRIAL.map(([, , xs]) => mean(xs));
check(tMeans.join() === "65,42,9", "tMeans");
const TT = table(["Plot", "Treatment", "Seedlings per m² (four quadrats)"], TRIAL.map(([p, t, xs]) => [p, t, xs.join(", ")]));
const rVsP = round(pct(tMeans[2], tMeans[0]), 1);
check(rVsP === 13.8, "rVsP");
// Struct 6: grass alone vs grass-legume mixture (example dry-matter yields and CP).
const MIX = [["Grass alone, no nitrogen", 4.2, 7], ["Grass alone + nitrogen fertiliser", 7.5, 10], ["Grass + legume mixture, no nitrogen", 6.8, 14]];
const MT = table(["Pasture", "Dry matter yield (t/ha)", "Crude protein in dry matter (%)"], MIX.map((r) => [r[0], r[1].toFixed(1), r[2]]));
const cpKg = MIX.map(([, y, cp]) => round(y * 1000 * cp / 100, 1));
check(cpKg.join() === "294,750,952", "cpKg");

concept("agri.pasture.vegetation-establishment", { file: "pasture/vegetation-establishment", keyPrefix: "pasture.vegetation-establishment" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a pasture legume?",
    options: [
      ["Lucerne", "Correct: a deep-rooted, high-protein legume."],
      ["Rhodes grass", "A grass."],
      ["Star grass", "A grass spread by runners."],
      ["Kikuyu grass", "A grass of cool, moist areas."],
    ],
    answer: "A",
    explanation: "Lucerne is a legume; the others are grasses.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are legumes included in a grass pasture?",
    options: [
      ["They fix nitrogen and raise the protein in the feed", "Correct: both animals and grass benefit."],
      ["They grow taller than the grass and shade out all weeds", "Not the main reason."],
      ["They are never eaten, so they protect the soil", "Legumes are highly palatable."],
      ["They make the soil more acid", "Not a benefit; legumes prefer near-neutral soil."],
    ],
    answer: "A",
    explanation: "Rhizobium in legume nodules fixes nitrogen, feeding the grass, and legumes are rich in protein.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is browse?",
    options: [
      ["Leaves, shoots and pods of trees and shrubs", "Correct."],
      ["Dry grass cut and stored for winter", "That is hay."],
      ["Green maize preserved in a pit", "That is silage."],
      ["Short grass under trees", "That is grazing, not browse."],
    ],
    answer: "A",
    explanation: "Browse is woody plant material eaten by livestock, especially goats.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why must pasture seed be sown into a fine, firm seedbed?",
    options: [
      ["The seeds are small and need close soil contact", "Correct: they need moisture and shallow cover."],
      ["Fine soil holds more fertiliser than any other kind of soil", "Not the reason."],
      ["Firm soil keeps away all pests", "Not the reason."],
      ["Large clods make the seed germinate too fast", "Clods slow and reduce germination."],
    ],
    answer: "A",
    hints: ["How big are grass seeds?"],
    explanation: "Small seeds have little food store; they need firm contact with moist soil and shallow cover.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "When should a newly sown pasture first be grazed?",
    options: [
      ["Lightly, once plants are firmly rooted", "Correct: they are not pulled out."],
      ["Heavily, as soon as the seedlings emerge", "Animals would uproot the seedlings."],
      ["Never: improved pastures are only cut for hay", "They are grazed."],
      ["Only after the plants have set seed and dried", "Quality would be low and growth wasted."],
    ],
    answer: "A",
    hints: ["What happens if a weak seedling is tugged?"],
    explanation: "Light, brief first grazing once plants are well rooted encourages tillering without uprooting.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is legume seed inoculated before sowing?",
    options: [
      ["To supply the right Rhizobium bacteria", "Correct: for nodules and nitrogen fixation."],
      ["To kill weed seeds mixed with it", "Inoculant is not a herbicide."],
      ["To make the seed heavier for broadcasting", "Not the purpose."],
      ["To protect the seed from birds", "Not the purpose."],
    ],
    answer: "A",
    hints: ["What lives in root nodules?"],
    explanation: "Inoculation coats the seed with the correct Rhizobium so nodules form and fix nitrogen.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Cattle on veld in a high-rainfall area lose condition every dry season although grass is still standing. What best explains this?",
    options: [
      ["It is sour veld: dry grass is low in quality", "Correct: palatable only when young."],
      ["It is sweet veld: the grass there is far too rich for cattle", "Sweet veld keeps its value when dry."],
      ["Grass in high-rainfall areas has no fibre", "Mature grass is very fibrous."],
      ["The cattle are drinking too much water", "Not the reason."],
    ],
    answer: "A",
    hints: ["Which kind of veld loses its value as it matures?"],
    explanation: "On sour veld (higher rainfall, leached soils) mature grass is low in protein and unpalatable, so animals need supplements in the dry season.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which pasture grass is usually established vegetatively from runners or splits?",
    options: [
      ["Star grass", "Correct: it spreads by stolons."],
      ["Lucerne", "A legume grown from seed."],
      ["Cowpea", "A legume grown from seed."],
      ["Maize", "A cereal crop, not a pasture grass."],
    ],
    answer: "A",
    explanation: "Star grass and Kikuyu are commonly planted from runners or root splits in moist soil.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Browse is especially important for goats in the dry season because many tree leaves stay green and rich in protein.",
    answer: true,
    explanation: "True. Browse supplies protein after grasses have dried off.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each establishment step with its reason.",
    pairs: [
      ["Liming an acid soil", "Raises pH so legumes grow and nodulate"],
      ["Rolling after sowing", "Firms soil around the small seeds"],
      ["Phosphorus at sowing", "Promotes root growth of seedlings"],
      ["Slashing weeds", "Reduces competition before weeds seed"],
      ["Light first grazing", "Encourages tillering without uprooting"],
    ],
    explanation: "Each step solves a problem of young pasture.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Legumes fix nitrogen with the help of {{blank:a}} bacteria living in swellings on their roots called {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["Rhizobium", "rhizobia", "rhizobium"] }, { id: "b", accepted: ["nodules", "root nodules", "nodule"] }],
    explanation: "*Rhizobium* in root nodules.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the substance applied to an acid soil to raise its pH before sowing lucerne.",
    accepted: ["lime", "agricultural lime", "limestone", "calcitic lime", "dolomitic lime", "calcium carbonate", "ground limestone"],
    keywords: { any: ["lime", "calcium carbonate"] },
    explanation: "**Lime** (ground limestone).",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A field measures 180 m by 100 m. Assume grass seed is sown at 5 kg/ha. Calculate the mass of seed needed, in kg.",
    value: seedKg, unit: "kg", tol: 0, wrong: [5 * 18000, 5 * 18],
    explanation: `Area = 180 × 100 = 18,000 m² = 1.8 ha; 5 × 1.8 = ${seedKg} kg. Using m² instead of ha gives a huge figure.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Single superphosphate is applied at 250 kg/ha to the same 1.8 ha field. How many 50 kg bags are needed? (Round UP to whole bags.)",
    value: ssp.bags, unit: "bags", tol: 0, wrong: [ssp.kg, 5],
    hints: ["kg = rate × area; bags = kg ÷ 50."],
    explanation: `250 × 1.8 = ${ssp.kg} kg; ${ssp.kg} ÷ 50 = ${ssp.bags} bags.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A student counts seedlings in quadrats of 0.25 m² and finds a mean of 18 seedlings per quadrat. Calculate the number of seedlings per m².",
    value: perM2, tol: 0, wrong: [4.5, 18],
    hints: ["How many 0.25 m² quadrats make 1 m²?"],
    explanation: `18 ÷ 0.25 = ${perM2} seedlings per m². Multiplying by 0.25 gives 4.5.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A soil test recommends 2 t/ha of lime for a 1.8 ha field before lucerne is sown. Calculate the lime needed, in tonnes.",
    value: limeT, unit: "t", tol: 0.05, answer: "3.6", wrong: [2, round(2 / 1.8, 2)],
    hints: ["Rate × area."],
    explanation: `2 × 1.8 = ${limeT} t.`,
    workedSolution: `1. Lime = rate × area.\n2. 2 t/ha × 1.8 ha = ${limeT} t.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** steps in preparing land and sowing an improved pasture.",
    hints: ["From the soil to the seed."],
    points: [
      "Test the soil and lime if acid.",
      "Clear, plough and harrow to a fine, firm seedbed.",
      "Apply phosphorus fertiliser and sow certified seed (inoculated legumes) shallowly at the start of the rains.",
      "Roll to firm the soil, then control weeds while the pasture establishes.",
    ],
    modelAnswer: "Test and lime the soil, plough and harrow to a fine firm seedbed, apply superphosphate and sow certified, inoculated seed shallowly at the start of the rains, and roll to firm the soil.",
    explanation: "Soil, seedbed, sowing, after-care.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest why a smallholder in a dry area might prefer to improve the management of natural veld rather than establish an improved pasture.",
    hints: ["Think of cost, rainfall and risk."],
    points: [
      "Establishing an improved pasture is costly (seed, fertiliser, lime, machinery, fencing).",
      "In low, unreliable rainfall, sown species may fail or yield little without irrigation.",
      "Better veld management (rotation, correct stocking, bush control) improves grazing at low cost and risk.",
    ],
    modelAnswer: "An improved pasture needs seed, fertiliser, lime and machinery that a smallholder may not afford, and in a dry area it may fail without irrigation. Managing the veld better with correct stocking, rotation and bush control costs little and carries less risk.",
    explanation: "Cost, climate and risk.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Students near Marondera sowed Rhodes grass on three plots with different seedbed treatments.\n\n${TT}`,
    hints: ["Mean = total ÷ 4.", "Think of seed size and depth."],
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the mean number of seedlings per m² in plot P.",
        value: tMeans[0], tol: 0, wrong: [64 + 70 + 58 + 68],
        explanation: `(64 + 70 + 58 + 68) ÷ 4 = ${tMeans[0]}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Express the mean for plot R as a percentage of the mean for plot P, to one decimal place.",
        value: rVsP, unit: "%", tol: 0.05, answer: "13.8", wrong: [round(pct(65, 9), 1), 56],
        explanation: `Plot R mean = 9; 9 ÷ 65 × 100 = ${rVsP}%.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why plot P had more seedlings than plot Q.",
        points: ["Rolling firmed the soil around the seeds, giving close seed-soil contact.", "Seeds took up water better / the surface did not dry out so quickly, so more germinated and established."],
        explanation: "Rolling improves contact and moisture.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why so few seedlings established in plot R.",
        points: ["Pasture seeds are small with little stored food.", "At 5 cm deep the seedlings used up their food before reaching the light and died.", "Clods left air spaces so seeds had poor contact with moist soil."],
        explanation: "Depth and seedbed.",
      }),
    ],
    explanation: "Interpret an establishment trial and explain seedbed requirements.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, calculator: true,
    stem: `Example results from three pastures on one farm.\n\n${MT}`,
    hints: ["Protein (kg/ha) = DM yield in kg × CP % ÷ 100."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the crude protein produced per hectare by the grass-legume mixture, in kg/ha.",
        value: cpKg[2], unit: "kg/ha", tol: 0, wrong: [round(6.8 * 14 / 100, 3), 6.8 * 14],
        explanation: `6.8 t = 6,800 kg; 6,800 × 14 ÷ 100 = ${cpKg[2]} kg/ha.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why the mixture has the highest protein content although it received no nitrogen.",
        points: ["The legume fixes nitrogen from the air through Rhizobium in its nodules, some of which also reaches the grass.", "Legume leaves are rich in protein, raising the protein of the mixture."],
        explanation: "Nitrogen fixation and legume protein.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** advantages to a dairy farmer of the mixture over grass with nitrogen fertiliser.",
        points: ["Saves the cost of nitrogen fertiliser (and less risk of leaching).", "More protein per hectare / higher-quality feed, so less protein concentrate is needed for milk."],
        explanation: "Cost and quality.",
      }),
    ],
    explanation: "Compare pastures by yield and protein.",
  });

  b.card("DEFINITION", "Improved pasture", "A pasture sown or planted with selected, productive grasses and legumes and managed with fertiliser, weed control and controlled grazing.");
  b.card("DEFINITION", "Browse", "Leaves, shoots and pods of shrubs and trees eaten by livestock, especially goats.");
  b.card("CONCEPT", "Value of grasses, legumes and browse", "Grasses: energy and bulk. Legumes: protein and nitrogen fixation. Browse: green, protein-rich feed in the dry season.");
  b.card("CONCEPT", "Sweet veld versus sour veld", "Sweet veld keeps its feeding value when dry; sour veld is palatable only when young and green.");
  b.card("FACT", "Why inoculate legume seed?", "To supply the correct Rhizobium bacteria so nodules form and fix nitrogen.");
  b.card("CONCEPT", "Steps in establishing a pasture", "Choose site; test and lime soil; fine firm seedbed; choose species and certified seed; phosphorus at sowing; sow shallow and roll; weed control; light first grazing.");
  b.card("FACT", "When is a new pasture first grazed?", "Lightly and briefly, once plants are firmly rooted and not pulled out when tugged.");
  b.card("FORMULA", "Seed or fertiliser for a field", "kg needed = rate (kg/ha) × area (ha); area in ha = m² ÷ 10,000.");
});
