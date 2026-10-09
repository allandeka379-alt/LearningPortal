// Slice W3a: small grains (sorghum, pearl and finger millet) and wheat.
import { concept, P, fertiliser, plantPopulation, seedRate, waterVolume, nutrientKg, round, check, table, fmtNum } from "../lib.mjs";

// Q: wheat seed for 2.4 ha at 120 kg/ha, 50 kg bags.
const wSeed = fertiliser({ rateKgHa: 120, areaHa: 2.4 });
check(wSeed.kg === 288 && wSeed.bags === 6, "wSeed");
// Q: water for 1.5 ha at 50 mm.
const w15 = waterVolume({ areaM2: 15000, depthMm: 50 });
check(w15.m3 === 750, "w15");
// Q: sorghum population at 90 x 12 cm.
const sPop = plantPopulation({ rowCm: 90, inRowCm: 12 });
check(Math.abs(sPop.perHa - 92592.59) < 0.01, "sPop");

// Struct: variety trial in a dry season.
const TRIAL = [["Maize (early hybrid)", 1.2], ["Sorghum", 2.1], ["Pearl millet", 1.8]];
const T_TABLE = table(["Crop", "Grain yield (t/ha)"], TRIAL.map(([c, y]) => [c, y.toFixed(1)]));
const sorgOverMaize = ((TRIAL[1][1] - TRIAL[0][1]) / TRIAL[0][1]) * 100;
check(Math.abs(sorgOverMaize - 75) < 1e-9, "sorgOverMaize");

// Struct: wheat on 4 ha.
const W_A = 4;
const wBasal = fertiliser({ rateKgHa: 400, areaHa: W_A });
const wN = nutrientKg(400, 7) + nutrientKg(250, 34.5);
const wWater = waterVolume({ areaM2: W_A * 10000, depthMm: 35 });
check(wBasal.bags === 32 && Math.abs(wN - 114.25) < 1e-9 && wWater.m3 === 1400, "wheat");

// Struct: sorghum seed with germination test.
const s2Pop = plantPopulation({ rowCm: 80, inRowCm: 10 });
const s2 = seedRate({ population: s2Pop.perHa, thousandSeedMassG: 30, germinationPct: 75 });
check(Math.abs(s2Pop.perHa - 125000) < 1e-6 && Math.abs(s2.kgPerHa - 5) < 1e-9, "s2");

concept("agri.crops.other-cereals", { file: "crops/other-cereals", keyPrefix: "crops.other-cereals" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which cereal is grown in Zimbabwe mainly as an irrigated winter crop?",
    options: [
      ["Wheat", "Correct: planted in late April to May and harvested before the rains."],
      ["Pearl millet", "Pearl millet is a rain-fed summer crop of dry regions."],
      ["Sorghum", "Sorghum is a rain-fed summer crop."],
      ["Finger millet", "Finger millet is a rain-fed summer crop."],
    ],
    answer: "A",
    explanation: "Wheat needs cool weather and dry conditions at harvest, so it is grown in winter under irrigation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does the waxy bloom on sorghum leaves help the crop in dry regions?",
    options: [
      ["It reduces water loss from the leaves", "Correct: the wax cuts transpiration from the surface."],
      ["It increases the rate of photosynthesis at night", "Photosynthesis needs light; wax has no such role."],
      ["It allows the leaves to absorb rain directly", "Leaves do not take up much water; the wax repels it."],
      ["It attracts bees for pollination", "Sorghum is mostly self-pollinated and wind-pollinated."],
    ],
    answer: "A",
    explanation: "The waxy layer reflects sunlight and reduces water loss, one of several drought-tolerance features.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do farmers grow brown, high-tannin sorghum in areas with many quelea birds?",
    options: [
      ["Birds find the bitter grain less palatable", "Correct: tannins make the grain less attractive to birds."],
      ["Brown grain ripens at night when birds sleep", "Grain ripening has nothing to do with night."],
      ["High-tannin sorghum has no grain at all", "It produces grain; birds simply eat less of it."],
      ["The brown colour cannot be seen by birds", "Birds see brown grain perfectly well."],
    ],
    answer: "A",
    explanation: "Tannins give an astringent taste; bird-resistant sorghums lose less grain but are less preferred for food.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer in natural region V has deep sandy soil and very unreliable rain. Which cereal is the most suitable?",
    options: [
      ["Pearl millet", "Correct: the most drought- and heat-tolerant cereal, suited to sandy soils."],
      ["Wheat", "Wheat needs winter irrigation, not dryland conditions."],
      ["A late-maturing maize hybrid", "Long-season maize would often fail in region V."],
      ["Rice", "Rice needs plenty of water."],
    ],
    answer: "A",
    hints: ["Which cereal tolerates heat, sand and drought best?"],
    explanation: "Pearl millet yields where maize fails: it tolerates heat, sandy infertile soils and dry spells.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is wheat in Zimbabwe planted in late April to May rather than in November?",
    options: [
      ["It needs cool weather to grow and must be harvested before the rains", "Correct: summer heat and rain at harvest would spoil it."],
      ["It needs the heavy summer rains to germinate", "Wheat is irrigated; summer rains would harm it at harvest."],
      ["Wheat grain is damaged by cool temperatures", "Wheat grows best in cool conditions."],
      ["Irrigation water from dams is only available during the rainy season", "Irrigation lets wheat grow in the dry season."],
    ],
    answer: "A",
    hints: ["Think about temperature during growth and weather at harvest."],
    explanation: "Planting in late April to May gives cool growing conditions and a dry harvest in September to October.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which practice helps control witchweed in a sorghum field?",
    options: [
      ["Pulling the witchweed before it flowers", "Correct: it stops new seed from being added to the soil."],
      ["Growing sorghum on the same land every year", "Continuous sorghum builds up witchweed seed."],
      ["Leaving the soil infertile and unmanured", "Witchweed is worst on poor soil; manure and nitrogen help."],
      ["Ploughing the witchweed seed deeper every year", "Witchweed seed lives for years and is not destroyed by ploughing."],
    ],
    hints: ["How does witchweed spread from season to season?"],
    answer: "A",
    explanation: "Witchweed produces huge numbers of long-lived seeds; prevent seeding, rotate with non-host crops and improve fertility.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which small grain is best known for keeping for several years in store with little insect damage?",
    options: [
      ["Finger millet", "Correct: its small, hard grain stores very well."],
      ["Maize", "Maize is attacked by weevils and the larger grain borer."],
      ["Wheat", "Wheat stores well only if dry, and is not the small grain intended."],
      ["Groundnuts", "Groundnuts are a legume, not a small grain."],
    ],
    answer: "A",
    explanation: "Finger millet (rapoko) has long been kept as a famine reserve because it stores so well.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a season with a three-week dry spell at flowering, sorghum yielded more than maize on the same farm. Which explanation is best?",
    options: [
      ["Sorghum can pause growth in drought and recover; maize fails at tasselling", "Correct: maize is most sensitive to water stress at flowering."],
      ["Sorghum does not need any water during flowering", "All crops need water; sorghum tolerates shortage better."],
      ["Maize roots are deeper, so they dried out faster", "Sorghum has the more extensive root system."],
      ["The sorghum must have been irrigated by the farmer during the dry spell", "Nothing in the question suggests irrigation."],
    ],
    answer: "A",
    hints: ["When is maize most sensitive to drought?"],
    explanation: "Sorghum's roots, waxy leaves, leaf rolling and ability to recover after drought explain its better yield.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Sorghum and millets suit natural regions IV and V better than maize does.",
    answer: true,
    explanation: "True. They tolerate the low, unreliable rainfall of regions IV and V.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Cattle can safely graze very young sorghum regrowth at any time.",
    answer: false,
    explanation: "False. Young or stressed sorghum can release prussic acid (hydrogen cyanide) in the rumen and poison livestock.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each crop with the description that fits it best.",
    pairs: [
      ["Pearl millet", "Candle-like heads; tolerates hot, sandy, dry land"],
      ["Finger millet", "Small seeds needing a fine seedbed; excellent storage"],
      ["Sorghum", "Waxy leaves; red, brown or white grain used for malt"],
      ["Wheat", "Drilled in close rows in winter under irrigation"],
    ],
    explanation: "Each cereal has distinctive features and conditions.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Side shoots that grow from the base of a wheat plant are called {{blank:a}}, and the small bird that damages ripening sorghum in large flocks is the red-billed {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["tillers"] },
      { id: "b", accepted: ["quelea"] },
    ],
    explanation: "Tillers carry extra ears; quelea flocks can strip fields of small grains.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Wheat is sown at 120 kg/ha on 2.4 ha. Calculate the mass of seed needed, in kg.",
    value: wSeed.kg, unit: "kg", tol: 0, wrong: [28.8, 2880],
    explanation: `120 × 2.4 = ${wSeed.kg} kg of seed (28.8 or 2,880 come from slipping a decimal point).`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "Each irrigation of a 1.5 ha wheat field applies 50 mm of water. Calculate the volume of water per irrigation in m³. (1 mm of water over 1 m² is 1 L; 1 m³ = 1,000 L.)",
    value: w15.m3, unit: "m³", tol: 0, wrong: [75, w15.litres],
    hints: ["Change hectares to m² first.", "Litres = m² × mm."],
    explanation: `1.5 ha = 15,000 m²; 15,000 × 50 = ${fmtNum(w15.litres)} L = ${w15.m3} m³. Using 1.5 × 50 = 75 forgets to convert hectares to square metres.`,
    workedSolution: `1. Area = 1.5 × 10,000 = 15,000 m².\n2. Volume = 15,000 m² × 50 mm = ${fmtNum(w15.litres)} L.\n3. ${fmtNum(w15.litres)} ÷ 1,000 = ${w15.m3} m³.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Sorghum is thinned to 12 cm within rows 90 cm apart. Calculate the plant population per hectare, to the nearest whole plant.",
    value: sPop.perHa, unit: "plants/ha", tol: 0.5, answer: "92593", wrong: [1080, round(sPop.perHa / 10, 0)],
    hints: ["Convert both spacings to metres."],
    explanation: `0.9 × 0.12 = 0.108 m² per plant; 10,000 ÷ 0.108 = ${fmtNum(sPop.perHa)} plants/ha.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the poisonous substance that young sorghum plants can release in the stomach of grazing cattle.",
    accepted: ["prussic acid", "hydrogen cyanide", "HCN", "cyanide", "hydrocyanic acid"],
    keywords: { any: ["cyanide", "prussic", "hcn", "hydrocyanic"] },
    explanation: "**Prussic acid** (hydrogen cyanide).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** features that make sorghum more drought tolerant than maize.",
    hints: ["Give a feature and say how it saves or gets water."],
    points: [
      "Extensive fibrous root system.",
      "Absorbs water from a larger volume of soil.",
      "Waxy bloom on leaves / leaves roll in dry weather (or can become dormant in drought).",
      "Reduces water loss by transpiration (or recovers growth when rain returns).",
    ],
    modelAnswer: "Sorghum has an extensive fibrous root system, so it takes up water from a large volume of soil. Its leaves have a waxy bloom and roll up in heat, which reduces water loss by transpiration.",
    explanation: "Feature plus how it helps.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3,
    stem: "Suggest **three** ways a farmer near Masvingo could reduce bird damage to a sorghum crop.",
    hints: ["Think of cultivar, timing and protection."],
    points: [
      "Grow a bird-resistant (brown, high-tannin) cultivar.",
      "Plant early and at the same time as neighbours so the crop does not ripen alone.",
      "Scare birds (people, noise, scarecrows, reflective strips) during grain filling and harvest promptly when ripe.",
    ],
    modelAnswer: "She could grow a brown high-tannin sorghum, plant at the same time as her neighbours so many fields ripen together, and scare birds from the soft-dough stage, then harvest as soon as the grain is hard.",
    explanation: "Cultivar, timing, scaring, prompt harvest.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A farmer near Gwanda grew three cereals side by side in a season with a long dry spell in February.\n\n${T_TABLE}`,
    hints: ["Percentage increase = difference ÷ original × 100."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage by which the sorghum yield exceeded the maize yield.",
        value: sorgOverMaize, unit: "%", tol: 0.5, answer: "75", wrong: [round(((2.1 - 1.2) / 2.1) * 100, 1), 0.9],
        explanation: `(2.1 − 1.2) ÷ 1.2 × 100 = ${sorgOverMaize}%. Dividing by the sorghum yield instead gives 42.9%.`,
      }),
      P.mcq({
        label: "(b)", stem: "Which crop was most affected by the dry spell?",
        options: [
          ["Maize (early hybrid)", "Correct: it gave the lowest yield, 1.2 t/ha."],
          ["Sorghum", "Sorghum gave the highest yield."],
          ["Pearl millet", "Pearl millet gave 1.8 t/ha, more than maize."],
          ["All were affected equally", "The yields differ widely."],
        ],
        answer: "A",
        explanation: "Maize, which is most sensitive to drought at flowering, yielded least.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why maize yield falls sharply when a dry spell occurs at tasselling and silking.",
        points: ["Water stress at flowering delays silking / dries the silks and pollen.", "So fewer kernels are fertilised and cobs are small or barren."],
        explanation: "Pollination failure.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** reasons why the farmer might still grow some maize despite these results.",
        points: ["Maize is the preferred staple food of the family.", "Maize has a ready market (e.g. the GMB or local buyers) and is easier to process (milling).", "In seasons with good rain maize yields more; it suffers less bird damage than small grains."],
        explanation: "Food preference, markets, bird damage, good-season yields.",
      }),
    ],
    explanation: "Interpret a dry-season trial and explain the choice of cereals.",
  });
  b.struct({
    d: 5, skill: "APPLICATION", examStyle: true, marks: 12, calculator: true,
    stem: `Rudo plans to grow ${W_A} ha of wheat near Marondera. She will apply a compound fertiliser containing 7% N at 400 kg/ha before planting and ammonium nitrate (34.5% N) at 250 kg/ha as top dressing. Each irrigation applies 35 mm of water. Fertiliser is sold in 50 kg bags.`,
    hints: ["Bags = rate × area ÷ 50, rounded up.", "Nitrogen = mass × % ÷ 100.", "Litres = m² × mm."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the number of bags of the compound fertiliser needed. Round UP to whole bags.",
        value: wBasal.bags, unit: "bags", tol: 0, wrong: [8, wBasal.kg],
        explanation: `400 × ${W_A} = ${fmtNum(wBasal.kg)} kg; ÷ 50 = ${wBasal.exactBags} bags.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the total mass of nitrogen applied per hectare, in kg, to two decimal places.",
        value: wN, unit: "kg/ha", tol: 0.005, answer: "114.25", wrong: [nutrientKg(250, 34.5), wN * W_A],
        explanation: `400 × 7 ÷ 100 = ${nutrientKg(400, 7)} kg; 250 × 34.5 ÷ 100 = ${nutrientKg(250, 34.5)} kg; total ${wN} kg N/ha.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the volume of water applied to the whole field in one irrigation, in m³.",
        value: wWater.m3, unit: "m³", tol: 0, wrong: [140, wWater.litres],
        explanation: `${W_A} ha = ${fmtNum(W_A * 10000)} m²; × 35 mm = ${fmtNum(wWater.litres)} L = ${fmtNum(wWater.m3)} m³.`,
      }),
      P.mcq({
        label: "(d)", stem: "At which stage should Rudo stop irrigating the wheat?",
        options: [
          ["When the grain has filled and is hardening", "Correct: water is no longer needed and would delay harvest."],
          ["At tillering", "Tillering needs water to form many tillers."],
          ["At flowering", "Water stress at flowering reduces grain set."],
          ["Straight after the nitrogen top dressing", "Top dressing must be watered in."],
        ],
        answer: "A",
        explanation: "Irrigation continues through grain filling and stops as the grain hardens and dries.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why Rudo should plant by about May and not delay until July.",
        points: ["Late wheat fills its grain in hot weather (September-October), which shortens grain filling and lowers yield.", "Late wheat may still be in the field when the rains start, so the grain sprouts or is damaged and harvest is difficult."],
        explanation: "Heat at grain fill; rain at harvest.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Describe how the seedbed for wheat should be prepared, giving reasons.",
        points: ["Plough or disc to bury residues and weeds.", "Harrow to a fine, firm tilth so the small seed has good contact with moist soil.", "Level the land so that irrigation water spreads evenly without ponding or dry patches."],
        explanation: "Plough, fine tilth, level.",
      }),
    ],
    explanation: "Fertiliser, nitrogen and irrigation calculations for wheat, and timing and seedbed reasons.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, calculator: true,
    stem: "Thandeka drills sorghum in rows 80 cm apart and thins it to 10 cm in the row. A germination test shows 75% germination. 1,000 seeds have a mass of 30 g.",
    hints: ["Seeds = plants ÷ germination fraction."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the plant population per hectare.",
        value: s2Pop.perHa, unit: "plants/ha", tol: 0.5, answer: "125000", wrong: [800, 12500],
        explanation: `0.8 × 0.1 = 0.08 m²; 10,000 ÷ 0.08 = ${fmtNum(s2Pop.perHa)} plants/ha.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the minimum mass of seed needed per hectare, in kg.",
        value: s2.kgPerHa, unit: "kg/ha", tol: 0.05, answer: "5", wrong: [3.75, 2.8125],
        explanation: `Seeds = ${fmtNum(s2Pop.perHa)} ÷ 0.75 = ${fmtNum(s2.seeds)}; × 0.03 g = ${fmtNum(s2.kgPerHa * 1000)} g = ${s2.kgPerHa} kg/ha. Ignoring germination gives 3.75 kg; multiplying by 0.75 gives 2.81 kg.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why small-grain seed needs a fine, firm seedbed.",
        points: ["The seed is small, so it must be sown shallowly and needs close contact with moist soil to absorb water.", "Large clods leave air spaces where the seed dries out, and seedlings cannot push through a crust or clods."],
        explanation: "Seed-soil contact.",
      }),
    ],
    explanation: "Population and seed rate for sorghum, and seedbed needs of small seeds.",
  });

  b.card("DEFINITION", "Small grains", "Sorghum, pearl millet and finger millet: small-seeded cereals adapted to hot, dry conditions.");
  b.card("CONCEPT", "Drought-tolerance features of sorghum", "Extensive fibrous roots, waxy bloom, leaf rolling, dormancy in drought and recovery after rain, short season.");
  b.card("FACT", "Which natural regions suit small grains?", "Mainly regions IV and V (sorghum also III); maize is risky there.");
  b.card("CONCEPT", "Controlling witchweed (Striga)", "Rotate with non-host crops, pull before flowering, add manure and nitrogen, tolerant cultivars.");
  b.card("CONCEPT", "Reducing bird damage to small grains", "Brown high-tannin cultivars, synchronised early planting, bird scaring, prompt harvest.");
  b.card("FACT", "Wheat in Zimbabwe", "Irrigated winter crop: planted late April to May, harvested September to October before the rains; seed about 100-120 kg/ha.");
  b.card("FORMULA", "Water to apply", "Litres = area in m² × depth in mm; m³ = litres ÷ 1,000.");
  b.card("DEFINITION", "Tiller", "A side shoot from the base of a cereal plant that can carry its own ear or head.");
  b.card("FACT", "Danger of grazing young sorghum", "Young or drought-stressed sorghum can release prussic acid (hydrogen cyanide) and poison livestock.");
});
