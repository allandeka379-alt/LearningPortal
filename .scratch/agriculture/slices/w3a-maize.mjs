// Slice W3a: maize production.
import { concept, P, fertiliser, perStation, plantPopulation, seedRate, yieldPerHa, pct, round, check, table, fmtNum } from "../lib.mjs";

// Q: population at 75 x 25 cm.
const pop7525 = plantPopulation({ rowCm: 75, inRowCm: 25 });
check(Math.abs(pop7525.perHa - 53333.333) < 0.01, "pop7525");
// Q: Compound D for 0.8 ha at 350 kg/ha.
const cd08 = fertiliser({ rateKgHa: 350, areaHa: 0.8 });
check(cd08.kg === 280 && cd08.bags === 6, "cd08");
// Q: AN per plant at 150 kg/ha and 75 x 25 cm.
const anG = perStation({ rateKgHa: 150, population: pop7525.perHa });
check(Math.abs(anG - 2.8125) < 1e-9, "anG");
// Q: yield from 0.6 ha.
const y06 = yieldPerHa({ kg: 2880, areaHa: 0.6 });
check(Math.abs(y06.tPerHa - 4.8) < 1e-9, "y06");

// Struct: spacing trial on 200 m2 plots.
const TRIAL = [["A", 90, 30, 98], ["B", 75, 25, 112], ["C", 75, 20, 104]];
const PLOT_M2 = 200;
const trialRows = TRIAL.map(([p, r, i, kg]) => ({ p, r, i, kg, pop: plantPopulation({ rowCm: r, inRowCm: i }).perHa, t: yieldPerHa({ kg, areaHa: PLOT_M2 / 10000 }).tPerHa }));
check(Math.abs(trialRows[2].pop - 66666.667) < 0.01 && Math.abs(trialRows[1].t - 5.6) < 1e-9, "trial");
const TRIAL_TABLE = table(["Plot", "Spacing (cm)", "Plants per station", "Grain harvested from the 200 m² plot (kg)"], trialRows.map((x) => [x.p, `${x.r} × ${x.i}`, 1, x.kg]));

// Struct: fall armyworm scouting.
const SCOUT = [["Field 1", 50, 4], ["Field 2", 50, 14], ["Field 3", 50, 9]];
const scoutPct = SCOUT.map(([, n, d]) => pct(d, n));
check(scoutPct[0] === 8 && scoutPct[1] === 28 && scoutPct[2] === 18, "scout");
const SCOUT_TABLE = table(["Field", "Plants checked", "Plants with fresh funnel damage"], SCOUT);

// Struct: seed rate at 90 x 25 cm, 280 g per 1,000 seeds, 85% germination.
const pop9025 = plantPopulation({ rowCm: 90, inRowCm: 25 });
const sr = seedRate({ population: pop9025.perHa, thousandSeedMassG: 280, germinationPct: 85 });
check(Math.abs(pop9025.perHa - 44444.444) < 0.01 && Math.abs(sr.kgPerHa - 14.64) < 0.01, "sr");

concept("agri.crops.maize", { file: "crops/maize", keyPrefix: "crops.maize" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which pest of maize has the scientific name *Busseola fusca*?",
    options: [
      ["Maize stalk borer", "Correct: its larvae tunnel inside maize and sorghum stems."],
      ["Fall armyworm", "Fall armyworm is *Spodoptera frugiperda*."],
      ["American bollworm", "The American bollworm is *Helicoverpa armigera*."],
      ["Maize weevil", "Weevils are beetles that attack stored grain, not stems."],
    ],
    answer: "A",
    explanation: "*Busseola fusca* is the maize stalk borer, a moth whose caterpillars feed in the funnel and then bore into the stem.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why must a farmer buy new hybrid maize seed every season instead of saving seed from the crop?",
    options: [
      ["Saved seed gives uneven plants with lower yields", "Correct: the F1 uniformity and hybrid vigour are lost in the next generation."],
      ["Hybrid seed cannot germinate once it has been stored", "Hybrid grain germinates; the problem is how the plants perform."],
      ["Saving seed from a hybrid crop is banned by the GMB", "This is not the reason; the reason is biological."],
      ["Hybrid plants produce cobs that contain no viable seed", "Hybrid cobs contain viable grain."],
    ],
    answer: "A",
    explanation: "A hybrid is the F1 of two inbred lines. Its offspring segregate, so the next crop is variable and yields fall.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which sign shows that maize grain has reached physiological maturity?",
    options: [
      ["A black layer forms at the base of each kernel", "Correct: the grain has reached its maximum dry mass."],
      ["Silks appear at the tips of the young cobs", "Silking happens at flowering, months before maturity."],
      ["Tassels appear at the top of each plant", "Tasselling is the start of flowering."],
      ["The upper leaves turn a dark, glossy green and curl", "Leaves dry and turn brown at maturity."],
    ],
    answer: "A",
    explanation: "The black layer is a dark band where the kernel joins the cob; after it forms the grain only loses water.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer in natural region IV receives the first effective rains in mid-December. Which maize cultivar is the best choice?",
    options: [
      ["An early-maturing (short-season) cultivar", "Correct: it can finish before the short, unreliable season ends."],
      ["A late-maturing (long-season) cultivar", "It needs a long, wet season and would face drought at grain filling."],
      ["Any cultivar, because maturity group has no effect", "Maturity group is the main choice for a short season."],
      ["Grain saved from last season's hybrid crop", "Saved hybrid seed gives uneven, lower-yielding plants."],
    ],
    answer: "A",
    hints: ["How long is the growing season left after mid-December in a dry region?"],
    explanation: "Late planting in a dry region leaves a short season, so an early cultivar reduces the risk of drought at tasselling and grain fill.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which insects spread maize streak virus?",
    options: [
      ["Leafhoppers", "Correct: they carry the virus from infected grasses and maize."],
      ["Aphids", "Aphids spread many viruses, but maize streak virus is spread by leafhoppers."],
      ["Grain weevils", "Weevils attack stored grain."],
      ["Termites", "Termites damage roots and stems; they do not carry this virus."],
    ],
    answer: "A",
    explanation: "Leafhoppers transmit maize streak virus; control includes resistant cultivars and removing grass weeds.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Where should Compound D be placed when it is applied at planting?",
    options: [
      ["In the furrow or hole a few centimetres from the seed", "Correct: close enough for young roots, but not touching the seed."],
      ["In direct contact with the seed so roots find it at once", "Concentrated salts touching the seed can scorch it and spoil germination."],
      ["On the leaves of the young plants after emergence", "Basal fertiliser goes in the soil at planting."],
      ["On the soil surface between the rows after harvest", "After harvest the fertiliser cannot help the crop."],
    ],
    answer: "A",
    hints: ["Fertiliser salts draw water out of seeds."],
    explanation: "Basal fertiliser is banded or placed near the seed so the phosphorus is near the young roots without burning the seed.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which observation best shows that young maize is being attacked by fall armyworm rather than stalk borer?",
    options: [
      ["Ragged holes and heaps of sawdust-like droppings in the funnel", "Correct: fall armyworm feeds openly in the whorl and leaves frass."],
      ["Narrow yellow streaks running along the length of the leaves", "These are signs of maize streak virus."],
      ["Grey rectangular spots between the leaf veins", "These are signs of grey leaf spot, a fungal disease."],
      ["Small round holes in stored grain with fine powder left in the bag", "These are signs of weevils in storage."],
    ],
    answer: "A",
    hints: ["Think of where each larva feeds."],
    explanation: "Fall armyworm caterpillars feed in the funnel, leaving ragged holes and frass; stalk borer causes windowing and tunnels inside the stem.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why does maize planted three weeks after the first effective rains usually yield less than maize planted with them?",
    options: [
      ["It has a shorter season and is more likely to meet drought at grain fill", "Correct: the crop loses growing time and the late rains may stop."],
      ["Late-planted maize cannot take up any fertiliser at all", "Late maize still takes up fertiliser."],
      ["Seed loses all its viability if it is stored until late December", "Seed stays viable for this time if stored well."],
      ["Late-planted maize is never attacked by stalk borer or by leafhoppers at all", "Late plantings often suffer more pests, not fewer."],
    ],
    answer: "A",
    hints: ["Count the growing days left before the rains end."],
    explanation: "Late planting shortens the season, nitrogen released early in the rains is leached, and later crops often suffer more pests such as leafhoppers and armyworm.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Maize is a frost-tolerant crop that can be planted safely in winter.",
    answer: false,
    explanation: "False. Maize is killed by frost and is a summer (rain-season) crop in Zimbabwe; wheat is the winter cereal.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Maize grain stored at a high moisture content is likely to go mouldy and be attacked by insects.",
    answer: true,
    explanation: "True. Grain is dried to about 12.5% moisture before storage because damp grain heats, moulds and favours insects.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each maize problem with its cause.",
    pairs: [
      ["Maize streak", "A virus spread by leafhoppers"],
      ["Grey leaf spot", "A fungus"],
      ["Dead heart in young plants", "Stalk borer larvae"],
      ["Purple leaves on young plants", "Shortage of phosphorus"],
      ["Holes and powder in stored grain", "Grain weevils"],
    ],
    explanation: "Know each problem's cause: virus, fungus, insect or nutrient shortage.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Maize is top dressed with {{blank:a}} nitrate, which supplies the nutrient {{blank:b}}, usually in split doses.",
    blanks: [
      { id: "a", accepted: ["ammonium"] },
      { id: "b", accepted: ["nitrogen", "N"] },
    ],
    explanation: "Ammonium nitrate (about 34.5% N) is the usual top dressing for maize.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Maize is planted at 75 cm × 25 cm with one plant per station. Calculate the plant population per hectare, to the nearest whole plant.",
    value: pop7525.perHa, unit: "plants/ha", tol: 0.5, answer: "53333", wrong: [round(10000 / (75 * 25), 2), 1875],
    explanation: `Area per station = 0.75 m × 0.25 m = 0.1875 m². Plants/ha = 10,000 ÷ 0.1875 = ${fmtNum(pop7525.perHa)}. Using centimetres without converting (75 × 25 = 1,875) gives a meaningless answer.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "Chipo will apply Compound D at 350 kg/ha to 0.8 ha of maize. Fertiliser is sold in 50 kg bags. Calculate the number of bags she must buy. Round UP to whole bags.",
    value: cd08.bags, unit: "bags", tol: 0, wrong: [Math.floor(cd08.exactBags), cd08.kg],
    hints: ["Mass = rate × area.", "Divide by the bag size and round up."],
    explanation: `Mass = 350 × 0.8 = ${cd08.kg} kg; ${cd08.kg} ÷ 50 = ${cd08.exactBags} bags, so she buys ${cd08.bags}. Rounding down to ${Math.floor(cd08.exactBags)} would leave part of the field without fertiliser.`,
    workedSolution: `1. Mass needed = 350 kg/ha × 0.8 ha = ${cd08.kg} kg.\n2. Bags = ${cd08.kg} ÷ 50 = ${cd08.exactBags}.\n3. Round up: ${cd08.bags} bags.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "Maize at 75 cm × 25 cm (one plant per station) is to be top dressed with ammonium nitrate at 150 kg/ha. Calculate the mass of ammonium nitrate to give each plant, in g, to one decimal place.",
    value: anG, unit: "g/plant", tol: 0.05, answer: "2.8", wrong: [round(150 / pop7525.perHa, 4), round(anG * 10, 1)],
    hints: ["First find the number of plants per hectare.", "Convert kg to g before dividing."],
    explanation: `Plants/ha = 10,000 ÷ (0.75 × 0.25) = ${fmtNum(pop7525.perHa)}. 150 kg = 150,000 g; 150,000 ÷ ${fmtNum(pop7525.perHa)} = ${round(anG, 2)} g, which is 2.8 g per plant. Forgetting to change kg to g gives a tiny, wrong answer.`,
    workedSolution: `1. Area per plant = 0.75 m × 0.25 m = 0.1875 m².\n2. Plants/ha = 10,000 ÷ 0.1875 = ${fmtNum(pop7525.perHa)}.\n3. 150 kg = 150,000 g.\n4. Mass per plant = 150,000 ÷ ${fmtNum(pop7525.perHa)} = ${round(anG, 4)} g ≈ 2.8 g.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Farai harvested 2,880 kg of dry maize grain from 0.6 ha. Calculate his yield in t/ha.",
    value: y06.tPerHa, unit: "t/ha", tol: 0.005, answer: "4.8", wrong: [2880 * 0.6 / 1000, 4800],
    hints: ["Yield = mass ÷ area; 1 t = 1,000 kg."],
    explanation: `2,880 ÷ 0.6 = ${y06.kgPerHa} kg/ha = ${y06.tPerHa} t/ha. Multiplying by the area instead of dividing gives 1.728, which is wrong.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the parasitic weed that attaches to the roots of maize and sorghum on poor, sandy soils.",
    accepted: ["witchweed", "witch weed", "Striga", "witchweed (Striga)"],
    keywords: { any: ["striga", "witch"] },
    explanation: "**Witchweed** (*Striga*) is a root parasite of maize, sorghum and millets.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why weeds must be controlled in maize during the first six to eight weeks after emergence.",
    hints: ["What do weeds and young maize compete for?"],
    points: [
      "Weeds compete with young maize for water, nutrients (especially nitrogen) and light.",
      "Young maize grows slowly and is easily shaded or starved, so early competition causes the largest yield loss.",
      "Once the canopy closes the maize shades out later weeds (and weeds also harbour pests such as leafhoppers).",
    ],
    modelAnswer: "In the first weeks the maize is small and grows slowly, so weeds take water, nitrogen and light from it and the yield falls most. After about eight weeks the maize canopy shades the ground and later weeds do much less harm.",
    explanation: "Critical period of weed competition.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe how Nyasha should prepare and store her shelled maize grain so that it keeps safely until the next harvest.",
    hints: ["Think of moisture, insects, rodents and the store itself."],
    points: [
      "Dry the grain to a safe moisture content (about 12.5%), e.g. on a clean floor or tarpaulin in the sun.",
      "Clean the grain (remove broken grain, chaff and dirt) and clean the store of old grain and insects.",
      "Treat the grain with an approved storage protectant or store it in hermetic (airtight) bags.",
      "Keep bags on pallets off the floor, away from walls, in a dry, cool, rat-proof store, and inspect regularly.",
    ],
    modelAnswer: "Nyasha should dry the grain to about 12.5% moisture and clean it. She should clean and repair the store, treat the grain with an approved protectant or use hermetic bags, and stack the bags on pallets away from walls in a dry, rat-proof store, checking them often for weevils and mould.",
    explanation: "Dry, clean, protect, store properly, inspect.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Form 4 pupils at a school near Marondera grew the same hybrid on three 200 m² plots at different spacings and recorded the grain harvested.\n\n${TRIAL_TABLE}`,
    hints: ["Plants/ha = 10,000 ÷ (row spacing in m × in-row spacing in m).", "200 m² is 0.02 ha."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the plant population per hectare in plot C, to the nearest whole plant.",
        value: trialRows[2].pop, unit: "plants/ha", tol: 0.5, answer: "66667", wrong: [1500, round(trialRows[2].pop / 2, 0)],
        explanation: `0.75 × 0.20 = 0.15 m² per plant; 10,000 ÷ 0.15 = ${fmtNum(trialRows[2].pop)} plants/ha.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the yield of plot B in t/ha.",
        value: trialRows[1].t, unit: "t/ha", tol: 0.005, answer: "5.6", wrong: [112 * 200 / 1000, 0.56],
        explanation: `200 m² = 0.02 ha; 112 ÷ 0.02 = ${fmtNum(trialRows[1].t * 1000)} kg/ha = ${trialRows[1].t} t/ha.`,
      }),
      P.mcq({
        label: "(c)", stem: "Which plot gave the highest yield per hectare?",
        options: [
          ["Plot B", "Correct: 5.6 t/ha."],
          ["Plot A", "Plot A gave 4.9 t/ha."],
          ["Plot C", "Plot C gave 5.2 t/ha."],
          ["All three plots gave the same yield", "Equal plots, different masses: the yields differ."],
        ],
        answer: "A",
        explanation: "The plots are the same size, so the largest harvest (112 kg) is the highest yield: B 5.6, C 5.2, A 4.9 t/ha.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Plot C had the most plants but a lower yield than plot B. Explain why.",
        points: ["Crowded plants compete strongly for water, nutrients and light.", "So each plant forms smaller cobs, or some plants are barren / thin stems lodge."],
        explanation: "Competition at high population.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Suggest why a farmer in a drier area might choose the spacing used in plot A.",
        points: ["Fewer plants per hectare share the limited soil water, so each plant is less likely to wilt and fail."],
        explanation: "Lower population in dry areas.",
      }),
    ],
    explanation: "Calculate plant population and yield, then explain how spacing affects yield.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 12, calculator: true,
    stem: `In January, Farai scouts three maize fields near Gokwe for fall armyworm by checking plants at several places in each field.\n\n${SCOUT_TABLE}\n\nAssume his extension officer advises that a field should be treated when more than 20% of the young plants show fresh damage.`,
    hints: ["Percentage = damaged ÷ checked × 100.", "Compare each field with the threshold.", "Integrated control combines several methods."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage of plants with fresh damage in Field 2.",
        value: scoutPct[1], unit: "%", tol: 0, wrong: [14, round(pct(50, 14), 1)],
        explanation: `14 ÷ 50 × 100 = ${scoutPct[1]}%.`,
      }),
      P.mcq({
        label: "(b)", stem: "Which field or fields should be treated now, according to the advice?",
        options: [
          ["Field 2 only", "Correct: only Field 2 (28%) is above 20%."],
          ["Fields 2 and 3", "Field 3 is at 18%, below the threshold."],
          ["All three fields", "Fields 1 (8%) and 3 (18%) are below 20%."],
          ["None of the fields", "Field 2 is above the threshold."],
        ],
        answer: "A",
        explanation: "Field 1 = 8%, Field 2 = 28%, Field 3 = 18%; only Field 2 exceeds 20%.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State **two** signs Farai would look for when scouting.",
        points: ["Ragged holes / windowing on young leaves.", "Moist sawdust-like droppings (frass) in the funnel / caterpillars in the funnel."],
        explanation: "Fall armyworm damage signs.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why scouting and a threshold are better than spraying every field every week.",
        points: ["Spraying only when damage is high enough to cause yield loss saves money on chemicals and labour.", "Fewer sprays protect natural enemies (parasitoids, predators) that help control the pest.", "Fewer sprays slow the development of insecticide resistance and reduce risks to people and the environment."],
        explanation: "Economic threshold reasoning.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Describe **three** non-chemical methods Farai could use to reduce fall armyworm damage next season.",
        points: ["Plant early and at the same time as neighbours so the crop is past the most vulnerable stage.", "Hand-pick and crush egg masses and caterpillars / apply ash or sand in the funnel.", "Rotate or intercrop with legumes, keep fields weed-free and destroy crop residues; encourage natural enemies."],
        explanation: "Cultural, physical and biological methods.",
      }),
    ],
    explanation: "Use scouting data and a threshold to decide on control, then describe integrated fall armyworm management.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, calculator: true,
    stem: "Thandeka will plant maize at 90 cm × 25 cm, one plant per station. A germination test shows 85% of the seed germinates, and 1,000 seeds have a mass of 280 g.",
    hints: ["Seeds needed = plants ÷ germination fraction.", "Mass = seeds × mass per seed."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the number of plants per hectare, to the nearest whole plant.",
        value: pop9025.perHa, unit: "plants/ha", tol: 0.5, answer: "44444", wrong: [2250, round(pop9025.perHa * 0.85, 0)],
        explanation: `0.9 × 0.25 = 0.225 m²; 10,000 ÷ 0.225 = ${fmtNum(pop9025.perHa)} plants/ha.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the minimum mass of seed needed per hectare, in kg, to one decimal place.",
        value: sr.kgPerHa, unit: "kg/ha", tol: 0.05, answer: "14.6", wrong: [round(pop9025.perHa * 0.28 / 1000, 1), round(pop9025.perHa * 0.85 * 0.28 / 1000, 1)],
        explanation: `Seeds = ${fmtNum(pop9025.perHa)} ÷ 0.85 = ${fmtNum(sr.seeds)}; mass = ${fmtNum(sr.seeds)} × 0.28 g = ${fmtNum(sr.kgPerHa * 1000)} g ≈ ${round(sr.kgPerHa, 1)} kg/ha. Ignoring germination gives 12.4 kg; multiplying by 0.85 instead of dividing gives 10.6 kg.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why farmers usually sow more seed than this minimum.",
        points: ["Some seeds or seedlings are lost to pests (cutworms, birds, rodents) and diseases or poor seedbed conditions.", "Sowing two seeds per station and thinning to one ensures every station has a plant, so the population is not reduced by gaps."],
        explanation: "Allowance for losses.",
      }),
    ],
    explanation: "Plant population and seed rate allowing for germination.",
  });

  b.card("DEFINITION", "Hybrid maize", "F1 seed from crossing inbred lines: uniform, high-yielding; must be bought every season because saved seed gives weaker, uneven plants.");
  b.card("DEFINITION", "Open-pollinated variety (OPV)", "Freely pollinated cultivar; seed can be saved for a few seasons; usually lower yield potential than a hybrid.");
  b.card("FORMULA", "Plant population per hectare", "10,000 ÷ (row spacing in m × in-row spacing in m) × plants per station.", "90 cm × 30 cm, one plant per station: about 37,000 plants/ha.");
  b.card("FACT", "Typical maize seed rate and spacing", "About 25 kg/ha; for example 90 cm × 30 cm or 75 cm × 25 cm, one plant per station.");
  b.card("FACT", "Maize fertiliser programme (typical)", "Basal compound (e.g. Compound D 7:14:7) about 300-400 kg/ha at planting; ammonium nitrate about 200-300 kg/ha top dressing, often split.");
  b.card("CONCEPT", "Stalk borer or fall armyworm?", "Stalk borer: windowing, dead heart, tunnels in stems. Fall armyworm: ragged holes and sawdust-like frass in the funnel.");
  b.card("FACT", "Which insect spreads maize streak virus?", "Leafhoppers. Control with resistant cultivars, early planting and removing grass weeds.");
  b.card("FACT", "Sign of physiological maturity in maize", "A black layer forms at the base of each kernel; husks dry, cobs droop, grain hard.");
  b.card("FACT", "Safe storage of maize grain", "Dry to about 12.5% moisture, clean store, approved protectant or hermetic bags, pallets, rat-proof, inspect often.");
});
