// Slice W3a: exam-format items. Theory structured (10 marks: ZIMSEC P2 Section A / Cambridge P1 Section A), ZIMSEC P2
// Section B crop production (20 marks) and Cambridge P1 Section B (15 marks). Part splits are our convention; a reviewer
// must check them against past papers.
import { concept, P, ZIM, CAM, agricultureLevels, plantPopulation, fertiliser, yieldPerHa, pct, money, round, check, table, fmtNum } from "../lib.mjs";

// T1: maize population and seed.
const T1pop = plantPopulation({ rowCm: 80, inRowCm: 25 });
const T1seedKg = (T1pop.perHa * 2 * 2.4 * 0.3) / 1000;
check(Math.abs(T1pop.perHa - 50000) < 1e-6 && Math.abs(T1seedKg - 72) < 1e-6, "T1");

// T2: rotation.
const T2_TABLE = table(["Field", "Year 1 crop"], [["A", "Maize (receives manure)"], ["B", "Groundnuts"], ["C", "Sunflower"], ["D", "Grass ley"]]);
const T2ha = 14 / 4;
const T2manure = 12 * T2ha;
check(T2ha === 3.5 && T2manure === 42, "T2");

// T3: plough parts description.
const T3_TABLE = table(["Label", "Description"], [["P", "Pointed steel blade at the bottom front of the body"], ["Q", "Curved plate behind P"], ["R", "Flat plate on the side opposite Q"], ["S", "Metal piece at the front of the beam with holes in two rows"], ["T", "Small wheel under the front of the beam"]]);

// T4: groundnut records.
const T4 = { ha: 0.5, pods: 1150, kernels: 828 };
const T4y = yieldPerHa({ kg: T4.pods, areaHa: T4.ha }).tPerHa;
const T4shell = pct(T4.kernels, T4.pods);
check(Math.abs(T4y - 2.3) < 1e-9 && Math.abs(T4shell - 72) < 1e-9, "T4");

// Z1: maize on 3.5 ha.
const Z1A = 3.5;
const Z1pop = plantPopulation({ rowCm: 90, inRowCm: 25 });
const Z1an = fertiliser({ rateKgHa: 250, areaHa: Z1A });
const Z1y = yieldPerHa({ kg: 16800, areaHa: Z1A }).tPerHa;
check(Math.abs(Z1pop.perHa - 44444.444) < 0.01 && Z1an.bags === 18 && Math.abs(Z1y - 4.8) < 1e-9, "Z1");
const Z1_TABLE = table(["Item", "Record"], [["Natural region", "IIb, near Chinhoyi"], ["Planting date", "12 December (first effective rains on 20 November)"], ["Spacing", "90 cm × 25 cm, one plant per station"], ["Top dressing", "Ammonium nitrate at 250 kg/ha"], ["Problems seen", "Ragged leaves with frass in the funnel in January; long grey rectangular leaf spots in February"], ["Grain harvested", "16,800 kg from 3.5 ha"]]);

// Z2: soya on 4 ha.
const Z2A = 4;
const Z2seed = 90 * Z2A;
const Z2sachets = Math.ceil(Z2seed / 60 - 1e-9);
const Z2y = yieldPerHa({ kg: 9800, areaHa: Z2A }).tPerHa;
check(Z2seed === 360 && Z2sachets === 6 && Math.abs(Z2y - 2.45) < 1e-9, "Z2");

// Z3: cabbages.
const Z3plot = 24 * 13.5;
const Z3plants = Z3plot / 0.27;
const Z3seedlings = Z3plants * 1.2;
const Z3income = Z3plants * 0.9 * 0.55;
check(Math.abs(Z3plants - 1200) < 1e-6 && Math.abs(Z3seedlings - 1440) < 1e-6 && Math.abs(Z3income - 594) < 1e-6, "Z3");

// C1: cotton lint.
const C1lint = (3200 * 40) / 100;
check(C1lint === 1280, "C1");

concept("agri.crops.maize", { file: "exam/w3a-theory", keyPrefix: "exam.w3a-theory" }, (b) => {
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.crops.maize"],
    stem: "Chipo will plant 2.4 ha of maize near Marondera at 80 cm × 25 cm. She sows two seeds per station and thins to one plant. Assume each seed has a mass of 0.3 g.",
    hints: ["Plants/ha = 10,000 ÷ (row spacing × in-row spacing in m).", "Seeds = stations × 2."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the plant population per hectare after thinning.",
        value: T1pop.perHa, unit: "plants/ha", tol: 0.5, answer: "50000", wrong: [2000, 100000],
        explanation: `0.8 × 0.25 = 0.2 m² per station; 10,000 ÷ 0.2 = ${fmtNum(T1pop.perHa)} plants/ha.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the mass of seed, in kg, she needs for the whole field.",
        value: T1seedKg, unit: "kg", tol: 0.05, answer: "72", wrong: [36, 30],
        explanation: `Stations = 50,000 × 2.4 = 120,000; seeds = 240,000; × 0.3 g = 72,000 g = ${round(T1seedKg, 1)} kg. Forgetting the second seed gives 36 kg; giving the rate per hectare only gives 30 kg.`,
      }),
      P.mcq({
        label: "(c)", stem: "Why does Chipo thin the seedlings to one plant per station?",
        options: [
          ["To avoid competition so each plant forms a good cob", "Correct."],
          ["To let the removed seedlings be transplanted to another field", "Maize transplants poorly."],
          ["To raise the plant population per hectare", "Thinning lowers the number of plants."],
          ["To make the plants flower and tassel much earlier", "Thinning is not done to change flowering."],
        ],
        answer: "A",
        explanation: "Two plants at one station compete for water, nutrients and light.",
      }),
      P.short({
        label: "(d)", stem: "Name the pest whose larvae cause dead hearts and tunnels in maize stems.",
        accepted: ["stalk borer", "maize stalk borer", "Busseola fusca", "stem borer", "maize stem borer"],
        keywords: { any: ["borer", "busseola"] },
        explanation: "The maize stalk borer.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why hybrid maize seed must be bought every season.",
        points: ["Hybrid seed is F1 from crossing two inbred lines, uniform with hybrid vigour.", "Saved seed (F2) gives variable plants and lower yields."],
        explanation: "Hybrid vigour lost.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "State **two** factors Chipo should consider when choosing a maize cultivar.",
        points: ["Maturity group to suit the natural region / length of season / planting date.", "Disease resistance (e.g. maize streak virus, grey leaf spot) / yield potential / market or grain type."],
        explanation: "Cultivar choice.",
      }),
    ],
    explanation: "Plant population, seed requirement and cultivar choice for maize.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.land.crop-rotation"],
    stem: `Tendai has 14 ha of arable land divided into four equal fields. He follows a four-course rotation in the order maize → groundnuts → sunflower → grass ley, moving each crop one field along every year.\n\n${T2_TABLE}`,
    hints: ["Field A grows the next crop in the order.", "Only the maize course gets manure."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which crop will grow in field A in year 2?",
        options: [
          ["Groundnuts", "Correct: groundnuts follow maize."],
          ["Maize", "Maize moves to the field that had the ley."],
          ["Sunflower", "Sunflower follows groundnuts."],
          ["Grass ley", "The ley follows sunflower."],
        ],
        answer: "A",
        explanation: "Field A had maize in year 1, so it carries groundnuts in year 2.",
      }),
      P.num({
        label: "(b)", stem: "Calculate the area of each field, in ha.",
        value: T2ha, unit: "ha", tol: 0.005, answer: "3.5", wrong: [56, 4],
        explanation: `14 ÷ 4 = ${T2ha} ha.`,
      }),
      P.short({
        label: "(c)", stem: "Name the plant family (group) to which groundnuts belong.",
        accepted: ["legumes", "legume", "Fabaceae", "Leguminosae", "pea family", "bean family", "pulses"],
        keywords: { any: ["legum", "fabaceae", "pea", "bean"] },
        explanation: "Legumes (Fabaceae).",
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Manure is applied at 12 t/ha to the maize course only. Calculate the mass of manure needed each year, in tonnes.",
        value: T2manure, unit: "t", tol: 0, wrong: [168, 12],
        explanation: `12 × 3.5 = ${T2manure} t. Applying it to all 14 ha would need 168 t.`,
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why maize is followed by groundnuts.",
        points: ["Maize is a heavy feeder that removes much nitrogen; groundnuts fix their own nitrogen through Rhizobium.", "Groundnuts are a different family, so maize pests, diseases and witchweed have no host."],
        explanation: "Nitrogen and break crop.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Explain **three** advantages of including the grass ley in the rotation.",
        points: ["Rests the soil and builds up organic matter from dense grass roots.", "Improves soil structure and protects the soil from erosion.", "Provides grazing or hay; manure from grazing animals improves fertility for the next maize."],
        explanation: "Ley benefits.",
      }),
    ],
    explanation: "Follow, calculate and justify a four-course rotation.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.machinery.tillage-implements"],
    stem: `A diagram of an ox-drawn mouldboard plough is described by its labelled parts.\n\n${T3_TABLE}`,
    hints: ["Name the part from its position, then its job."],
    parts: [
      P.match({
        label: "(a)", stem: "Match each labelled part with its function.",
        pairs: [
          ["P", "Cuts the furrow slice horizontally"],
          ["Q", "Lifts and turns the furrow slice over"],
          ["R", "Presses on the furrow wall to keep the plough straight"],
          ["S", "Hitch used to adjust depth and width of cut"],
        ],
        explanation: "P share, Q mouldboard, R landside, S hake.",
      }),
      P.mcq({
        label: "(b)", stem: "What happens if part T is raised?",
        options: [
          ["The plough works deeper", "Correct: the share runs lower relative to the wheel."],
          ["The plough works shallower", "Lowering the wheel makes it shallower."],
          ["The width of cut doubles", "The wheel controls depth."],
          ["The mouldboard stops turning the soil", "The mouldboard still turns the slice."],
        ],
        answer: "A",
        explanation: "Raising the wheel lets the body go deeper.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Describe how the plough should be maintained at the end of the ploughing season.",
        points: ["Clean off all soil and repair or replace worn parts (share, heel) and loose bolts.", "Coat bright surfaces (share, mouldboard) with used oil or grease and paint the frame.", "Store under a roof, off the ground."],
        explanation: "Season-end care.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why part P should be kept sharp.",
        points: ["A sharp share penetrates and cuts easily, so less draught is needed and the oxen tire less.", "The plough stays in the ground at an even depth (a blunt share rides out)."],
        explanation: "Sharp share.",
      }),
    ],
    explanation: "Functions, adjustment and maintenance of the mouldboard plough.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.crops.legumes"],
    stem: `Thandeka grew ${T4.ha} ha of groundnuts near Mutoko. She harvested ${fmtNum(T4.pods)} kg of dry pods, which gave ${T4.kernels} kg of kernels. Some pods stored in a damp shed went mouldy.`,
    hints: ["Yield = mass ÷ area.", "Shelling % = kernels ÷ pods × 100."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the yield of dry pods in t/ha.",
        value: T4y, unit: "t/ha", tol: 0.005, answer: "2.3", wrong: [0.575, 2300],
        explanation: `${fmtNum(T4.pods)} ÷ 0.5 = ${fmtNum(T4y * 1000)} kg/ha = ${T4y} t/ha.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the shelling percentage.",
        value: T4shell, unit: "%", tol: 0, wrong: [round(pct(T4.pods, T4.kernels), 1), 322],
        explanation: `${T4.kernels} ÷ ${fmtNum(T4.pods)} × 100 = ${T4shell}%.`,
      }),
      P.mcq({
        label: "(c)", stem: "When should gypsum be applied to the groundnuts?",
        options: [
          ["At early flowering, over the rows", "Correct: calcium is then in the pegging zone."],
          ["Mixed with the seed at planting", "Too early, and it is not a seed treatment."],
          ["After the pods have been lifted", "Too late to help pod filling."],
          ["Only to the following maize crop", "The groundnuts need the calcium."],
        ],
        answer: "A",
        explanation: "Pods absorb calcium directly from the soil around them as they fill.",
      }),
      P.short({
        label: "(d)", stem: "Name the poison that can be produced by the mould on damp groundnuts.",
        accepted: ["aflatoxin", "aflatoxins"],
        keywords: { any: ["aflatox"] },
        explanation: "Aflatoxin.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain how the groundnuts should have been dried and stored to prevent mould.",
        points: ["Dry quickly with pods upwards, off damp soil, then in airy stacks until the pods rattle.", "Store dry, in the shell, in a well-ventilated store off the floor."],
        explanation: "Drying and storage.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why groundnuts need little nitrogen fertiliser.",
        points: ["Root nodules contain Rhizobium bacteria.", "These fix nitrogen from the air for the plant."],
        explanation: "Nitrogen fixation.",
      }),
    ],
    explanation: "Groundnut yield and shelling calculations, gypsum, aflatoxin and nitrogen fixation.",
  });
});

concept("agri.crops.maize", { file: "exam/w3a-zimsec", keyPrefix: "exam.w3a-zimsec", applies: ZIM }, (b) => {
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.crops.maize"],
    stem: `Farai keeps these records for a ${Z1A} ha maize field.\n\n${Z1_TABLE}\n\nFertiliser is sold in 50 kg bags.`,
    hints: ["Plants/ha = 10,000 ÷ (0.9 × 0.25).", "Round bags up.", "For the long part, follow the season in order and give reasons."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the maturity group of cultivar Farai should have chosen for planting as late as 12 December.",
        accepted: ["early", "early maturing", "early-maturing", "short season", "short-season", "early maturity"],
        keywords: { any: ["early", "short"] },
        explanation: "An early-maturing (short-season) cultivar.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the plant population per hectare, to the nearest whole plant.",
        value: Z1pop.perHa, unit: "plants/ha", tol: 0.5, answer: "44444", wrong: [2250, round(Z1pop.perHa * Z1A, 0)],
        explanation: `0.9 × 0.25 = 0.225 m²; 10,000 ÷ 0.225 = ${fmtNum(Z1pop.perHa)} plants/ha.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the number of bags of ammonium nitrate needed. Round UP to whole bags.",
        value: Z1an.bags, unit: "bags", tol: 0, wrong: [17, Z1an.kg],
        explanation: `250 × 3.5 = ${Z1an.kg} kg; ÷ 50 = ${Z1an.exactBags}, so ${Z1an.bags} bags.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Calculate the grain yield in t/ha.",
        value: Z1y, unit: "t/ha", tol: 0.005, answer: "4.8", wrong: [58.8, 16.8],
        explanation: `16,800 ÷ 3.5 = ${fmtNum(Z1y * 1000)} kg/ha = ${Z1y} t/ha.`,
      }),
      P.mcq({
        label: "(e)", stem: "Which problem caused the long grey rectangular leaf spots in February?",
        options: [
          ["Grey leaf spot", "Correct: a fungal disease."],
          ["Maize streak virus", "Streak gives narrow yellow streaks."],
          ["Fall armyworm", "Armyworm gave the ragged leaves and frass."],
          ["Nitrogen deficiency", "This gives yellowing from the leaf tip along the midrib."],
        ],
        answer: "A",
        explanation: "Grey, rectangular lesions limited by the veins are typical of grey leaf spot.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why planting on 12 December probably reduced Farai's yield.",
        points: ["The crop missed about three weeks of the season, so it had less time to grow and fill grain.", "It was more likely to meet drought at grain filling as the rains ended / more pest pressure / nitrogen released early was leached."],
        explanation: "Late planting.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Suggest **two** ways Farai could reduce grey leaf spot next season.",
        points: ["Rotate maize with a non-host crop such as a legume.", "Grow a resistant cultivar / bury or destroy infected residues / spray an approved fungicide when needed."],
        explanation: "Disease control.",
      }),
      P.manual({
        label: "(h)", marks: 8, stem: "Describe and explain how Farai should manage his next maize crop, from land preparation to storage, to obtain a higher yield.",
        points: [
          "Prepare land early (plough after harvest or prepare basins), lime acid soil and keep a mulch where possible, so planting is not delayed.",
          "Choose a cultivar of suitable maturity and disease resistance for region IIb.",
          "Plant with the first effective rains at about 25 kg/ha and the recommended spacing, so the crop uses the full season.",
          "Apply a basal compound at planting beside (not touching) the seed, for phosphorus and early root growth.",
          "Top dress ammonium nitrate in split doses at about knee height and before tasselling, on moist soil, to reduce leaching.",
          "Weed in the first six to eight weeks, when competition reduces yield most.",
          "Scout weekly for fall armyworm and stalk borer and treat when thresholds are reached; control grey leaf spot by rotation and resistant cultivars.",
          "Harvest after the black layer forms, dry to about 12.5% moisture, treat or use hermetic bags and store off the floor in a clean, rat-proof store.",
        ],
        levels: agricultureLevels(8),
        explanation: "A sequenced, reasoned management plan.",
      }),
    ],
    explanation: "Interpret maize records, calculate population, fertiliser and yield, and plan improved management.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.crops.legumes", "agri.land.crop-rotation"],
    stem: `Sipho will grow ${Z2A} ha of soya beans near Bindura on land that has carried maize for several years but never soya. He will sow 90 kg/ha of seed. Assume one sachet of inoculant treats 60 kg of seed. Last year a neighbour harvested 9,800 kg of soya from 4 ha.`,
    hints: ["Seed = rate × area.", "Round sachets up.", "For the long part, go through the season in order with reasons."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the bacteria in the inoculant.",
        accepted: ["Rhizobium", "Bradyrhizobium", "rhizobia", "Bradyrhizobium japonicum"],
        keywords: { any: ["rhizob"] },
        explanation: "Rhizobium (Bradyrhizobium) bacteria.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the mass of seed needed, in kg.",
        value: Z2seed, unit: "kg", tol: 0, wrong: [22.5, 94],
        explanation: `90 × 4 = ${Z2seed} kg.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the number of sachets of inoculant needed. Round UP.",
        value: Z2sachets, tol: 0, wrong: [5, 2],
        explanation: `${Z2seed} ÷ 60 = ${Z2seed / 60}, so ${Z2sachets} sachets.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Calculate the neighbour's yield in t/ha, to two decimal places.",
        value: Z2y, unit: "t/ha", tol: 0.005, answer: "2.45", wrong: [39.2, 9.8],
        explanation: `9,800 ÷ 4 = ${fmtNum(Z2y * 1000)} kg/ha = ${Z2y} t/ha.`,
      }),
      P.mcq({
        label: "(e)", stem: "Why must the soya be harvested promptly once the pods are dry?",
        options: [
          ["Dry pods shatter and drop their seed", "Correct."],
          ["Dry soya seed loses its oil within a day", "Oil is not lost like this."],
          ["The plants start to grow new pods", "Mature soya does not regrow pods."],
          ["Rhizobium bacteria rot the pods", "Rhizobium lives in root nodules."],
        ],
        answer: "A",
        explanation: "Shattering losses rise quickly when harvest is delayed.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "State **two** precautions Sipho must take when inoculating the seed.",
        points: ["Mix inoculant with seed in the shade, out of the sun.", "Plant the same day; keep inoculated seed away from fertiliser and incompatible seed dressings / store inoculant cool."],
        explanation: "Keeping bacteria alive.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Explain how the soya will benefit the maize Sipho grows next season.",
        points: ["Soya residues and roots release fixed nitrogen as they decompose, so the maize needs less nitrogen fertiliser.", "As a different family it breaks the cycle of maize pests and diseases (and witchweed)."],
        explanation: "Rotation benefits.",
      }),
      P.manual({
        label: "(h)", marks: 8, stem: "Describe and explain how Sipho should grow the soya crop, from land preparation to marketing.",
        points: [
          "Prepare a firm, fine-to-medium seedbed on well-drained soil; lime if acid, because nodulation is poor in acid soil.",
          "Apply a basal fertiliser supplying phosphorus and potassium with little nitrogen, because nodules supply nitrogen.",
          "Inoculate seed in the shade and plant the same day into moist soil, in rows about 45 cm apart, at the start of the rains.",
          "Weed early, because young soya competes poorly.",
          "Scout for rust, pod-sucking bugs and red spider mite and spray approved chemicals when needed.",
          "Harvest when leaves have dropped and pods rattle, promptly to avoid shattering.",
          "Thresh, clean and dry to a safe moisture content and store in a dry, clean store.",
          "Market through a contract or buyer (oil and stock-feed processors), grading and keeping records of costs and sales.",
        ],
        levels: agricultureLevels(8),
        explanation: "A sequenced, reasoned production plan.",
      }),
    ],
    explanation: "Inoculation, seed and yield calculations, rotation value and a full soya production plan.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.crops.vegetables"],
    stem: "Chipo will grow cabbages on a plot 24 m × 13.5 m near Mutare at 60 cm × 45 cm. She will raise 20% more seedlings than she needs in a nursery bed. She expects 90% of the heads to be marketable at an assumed price of US\\$0.55 each.",
    hints: ["Plants = plot area ÷ area per plant.", "Income = plants × fraction sold × price."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the branch of horticulture to which cabbage production belongs.",
        accepted: ["olericulture"],
        explanation: "Olericulture.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the number of cabbage plants on the plot.",
        value: Z3plants, unit: "plants", tol: 0.5, answer: "1200", wrong: [12, 120],
        explanation: `Plot = 24 × 13.5 = ${Z3plot} m²; per plant 0.6 × 0.45 = 0.27 m²; ${Z3plot} ÷ 0.27 = ${fmtNum(Z3plants)} plants.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the number of seedlings she should raise.",
        value: Z3seedlings, unit: "plants", tol: 0.5, answer: "1440", wrong: [1220, 960],
        explanation: `${fmtNum(Z3plants)} × 1.2 = ${fmtNum(Z3seedlings)}.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Calculate her expected income, in US dollars.",
        value: Z3income, prefix: "US$", wrong: [660, 1080],
        explanation: `${fmtNum(Z3plants)} × 0.9 = 1,080 heads; × US\\$0.55 = ${money(Z3income)}.`,
      }),
      P.mcq({
        label: "(e)", stem: "When is the best time of day to transplant the seedlings?",
        options: [
          ["In the late afternoon", "Correct: less heat and evaporation overnight."],
          ["At midday in full sun", "Seedlings wilt badly."],
          ["Early in a hot, windy morning", "Wind and heat increase water loss."],
          ["Any time; it makes no difference", "Timing affects survival."],
        ],
        answer: "A",
        explanation: "Transplanting in the cool reduces wilting while roots re-establish.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why the seedlings are hardened off before transplanting.",
        points: ["Reducing water and removing shade toughens the seedlings.", "So they survive the shock of transplanting and field conditions with less wilting."],
        explanation: "Hardening off.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Name **two** pests of cabbage and give a control measure for each.",
        points: ["Diamondback moth / cutworms: approved insecticide when scouting shows damage / collars and digging out cutworms.", "Aphids: approved insecticide or natural enemies; remove badly infested plants."],
        explanation: "Cabbage pests.",
      }),
      P.manual({
        label: "(h)", marks: 8, stem: "Describe how Chipo should prepare a nursery bed, raise the seedlings and transplant them, giving reasons.",
        points: [
          "Choose a sheltered, well-drained site near water where brassicas were not grown recently (soil-borne disease).",
          "Dig deeply, remove stones and weeds, add rotted compost and rake to a fine tilth in a raised bed about 1 m wide.",
          "Sterilise the soil (burning trash or solarisation) to kill damping-off fungi, pests and weed seeds.",
          "Sow thinly in shallow drills, cover lightly and mulch until germination, then remove mulch and give light shade.",
          "Water gently morning and evening; thin crowded seedlings; control pests.",
          "Harden off for one to two weeks by reducing water and shade.",
          "Water the bed before lifting; lift with soil on the roots, holding leaves; transplant in the late afternoon at 60 cm × 45 cm.",
          "Firm, water immediately, shade if hot and replace any that die (gapping).",
        ],
        levels: agricultureLevels(8),
        explanation: "Nursery to transplanting in order with reasons.",
      }),
    ],
    explanation: "Cabbage plot calculations, income, and nursery and transplanting practice.",
  });
});

concept("agri.crops.cotton-tobacco", { file: "exam/w3a-cambridge", keyPrefix: "exam.w3a-cambridge", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 945, calculator: true,
    paper: "Cambridge Paper 1 Section B",
    concepts: ["agri.crops.cotton-tobacco"],
    stem: "Cotton is an important cash crop for smallholders in the drier parts of Zimbabwe.",
    hints: ["(a) Steps from seedbed to early growth.", "(b) Lint = seed cotton × out-turn ÷ 100.", "(d) Weigh both crops for the farmer and decide."],
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe how cotton is planted and managed during its first eight weeks.",
        points: [
          "Prepare a clean seedbed and plant with the first effective rains (late planting meets cold weather and pests).",
          "Sow several seeds per station in rows about 1 m apart and thin to one or two strong plants.",
          "Apply a basal fertiliser at planting and a moderate nitrogen top dressing (too much gives leafy plants that shed bolls).",
          "Weed early and scout weekly for pests such as bollworm eggs, aphids and jassids.",
        ],
        explanation: "Planting and early management.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Assume a ginnery's out-turn is 40% lint. Calculate the lint obtained from 3,200 kg of seed cotton, in kg.",
        value: C1lint, unit: "kg", tol: 0, wrong: [1920, 8000],
        explanation: `3,200 × 40 ÷ 100 = ${fmtNum(C1lint)} kg of lint.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why cotton stalks must be destroyed after harvest.",
        points: ["Bollworms and other pests survive the dry season in old stalks and regrowth.", "Destroying stalks creates a closed season with no host plants.", "So pest numbers at the start of the next season are lower and fewer sprays are needed."],
        explanation: "Closed season.",
      }),
      P.manual({
        label: "(d)", marks: 6, stem: "Discuss whether a smallholder in natural region IV should grow cotton or maize.",
        points: [
          "Cotton tolerates heat and dry spells better than maize, which often fails in region IV.",
          "Cotton is a cash crop with buyers and contract input schemes, so the farmer can grow it without cash at planting.",
          "But cotton needs much labour for picking and scouting, several sprays and stalk destruction.",
          "Cotton prices vary and contract deductions may leave little profit; it cannot be eaten.",
          "Maize provides the family's food, but small grains may be safer than maize in region IV.",
          "Judgement: e.g. grow cotton for cash with small grains or some maize for food, in rotation.",
        ],
        levels: agricultureLevels(6),
        explanation: "Weigh both crops and decide.",
      }),
    ],
    explanation: "Cotton production, lint calculation, closed season and choice of crop.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 945,
    paper: "Cambridge Paper 1 Section B",
    concepts: ["agri.machinery.mechanisation", "agri.machinery.tillage-implements"],
    stem: "A group of smallholders who plough with oxen are considering buying a tractor together.",
    hints: ["(a) Use and care of one implement.", "(b) Link each advantage to yield or labour.", "(c) Weigh costs and benefits and decide."],
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe the use and routine maintenance of an ox-drawn cultivator.",
        points: [
          "Used to weed between crop rows and loosen surface crusts after the crop has emerged.",
          "Width is adjusted to the row spacing with the expanding lever and depth with the wheel.",
          "After use: clean off soil, tighten nuts and bolts and grease moving parts.",
          "Sharpen or replace worn shovels/sweeps; store clean, oiled, under cover and off the ground.",
        ],
        explanation: "Use and maintenance.",
      }),
      P.manual({
        label: "(b)", marks: 5, stem: "Explain the advantages of using a tractor rather than oxen for land preparation.",
        points: [
          "Much faster work rate, so land is prepared and planted with the first rains (timeliness).",
          "Timely planting lets the crop use the whole season, increasing yields.",
          "Oxen are weak at the end of the dry season, but a tractor is not affected.",
          "Larger areas can be cultivated with the same labour, and drudgery is reduced.",
          "Deeper ploughing or ripping is possible, breaking hardpans and improving rooting.",
        ],
        explanation: "Advantages with effects.",
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Discuss whether the group should buy the tractor.",
        points: [
          "High purchase cost, plus fuel, repairs, spares and a trained driver; fixed costs must be spread over enough hectares.",
          "Hiring out the tractor to other farmers could cover fixed costs.",
          "Sharing creates problems of timing: every member wants ploughing at the start of the rains.",
          "Heavy tractors can compact soil and increase erosion if used badly; fewer jobs for people with oxen.",
          "Oxen give manure and can be kept for weeding and carting, so selective mechanisation is possible.",
          "Judgement linked to the group's area, money and hire services (e.g. hire first, buy if area and demand are enough).",
        ],
        levels: agricultureLevels(6),
        explanation: "Weigh costs, benefits and risks and decide.",
      }),
    ],
    explanation: "Implement care, advantages of tractors and a decision on shared mechanisation.",
  });
});
