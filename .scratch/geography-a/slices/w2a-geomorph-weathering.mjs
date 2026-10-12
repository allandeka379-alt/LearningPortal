// W2a: geomorph.weathering (both boards; Peltier diagram is ZIMSEC detail). Numbers computed: tablet mass loss (% and % per year),
// rate-doubling rule of thumb (see tables/w2a-geomorph-weathering.mjs for the lesson examples).
import { concept, P, geographyLevels, chk, rnd, ZIM } from "../lib.mjs";
import { mc, tbl } from "../tables/w2a-_q.mjs";

const pct = (a, b) => ((a - b) / a) * 100;
const SITES = [["X: shaded forest floor", 45.0, 42.3], ["Y: open field", 45.0, 43.8], ["Z: bare sun-exposed rock", 45.0, 44.7]];
const fmt = (x, dp = 1) => x.toFixed(dp);
const SITETAB = tbl(["Site", "Start mass (g)", "Mass after 24 months (g)"], SITES.map(([n, a, b]) => [n, fmt(a), fmt(b)]));
const xPerYear = rnd(pct(45.0, 42.3) / 2, 1, 3.0, "xPerYear");
const zPerYear = pct(45.0, 44.7) / 2;
const ratioXZ = rnd(xPerYear / zPerYear, 0, 9, "ratioXZ");

concept("ageo.geomorph.weathering", { file: "geomorph/weathering", keyPrefix: "geomorph.weathering" }, (b) => {
  mc(b, 1, "RECALL", "Which of these is a **chemical** weathering process?", [
    ["Hydrolysis", "Correct: feldspar in granite reacts with water to form clay."],
    ["Freeze-thaw", "Freeze-thaw is physical: ice expands in cracks and breaks the rock."],
    ["Pressure release", "Pressure release is physical: rock expands as overlying material is removed."],
    ["Salt crystallisation", "Salt crystallisation is physical: growing crystals force grains apart."],
  ], "**Hydrolysis**, carbonation, oxidation and solution are chemical processes; the others are physical.");
  mc(b, 2, "UNDERSTANDING", "Which conditions are needed for freeze-thaw weathering?", [
    ["Water in cracks and temperatures that cross 0 °C", "Correct: water must freeze and thaw repeatedly in jointed rock."],
    ["Dry rock and temperatures that stay above 30 °C", "Without water and freezing there can be no ice wedging."],
    ["Acidic rain and a thick cover of dense vegetation", "These conditions favour chemical and biological processes."],
    ["Salty water and strong evaporation at the surface", "These conditions favour salt crystallisation."],
  ], "Freeze-thaw needs **water in joints and frequent freezing and thawing** (ice expands by about 9%).", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which rock is most strongly attacked by carbonation?", [
    ["Limestone, which is made of calcium carbonate", "Correct: carbonic acid dissolves calcium carbonate."],
    ["Granite, which is made mainly of quartz and feldspar", "Granite is mainly weathered by hydrolysis, not carbonation."],
    ["Quartzite, which is made almost entirely of quartz", "Quartz is extremely resistant to chemical attack."],
    ["Basalt, which is made of iron-rich volcanic minerals", "Basalt is attacked by hydrolysis and oxidation more than carbonation."],
  ], "Carbonation dissolves **limestone** (calcium carbonate) as soluble calcium hydrogencarbonate.");
  mc(b, 2, "RECALL", "The peeling of curved sheets from a granite dome is called exfoliation. Which process is the main cause?", [
    ["Pressure release as overlying rock is removed", "Correct: the rock expands and cracks open parallel to the surface."],
    ["Carbonation by weak carbonic acid in the rain", "Granite does not contain calcium carbonate."],
    ["Chelation by organic compounds from lichens", "Chelation weathers mineral surfaces but does not peel large sheets."],
    ["Oxidation of iron in the mineral grains", "Oxidation changes colour and weakens grains but does not peel curved sheets."],
  ], "Unloading causes **sheeting joints** parallel to the surface, and slabs peel off (exfoliation).");
  mc(b, 3, "APPLICATION", "On a Peltier diagram, in which climate is chemical weathering expected to be strongest?", [
    ["Hot and wet, as in a tropical rainforest", "Correct: heat and water speed up chemical reactions."],
    ["Cold and wet, as on a periglacial mountain", "Here freeze-thaw is strong, but low temperatures slow chemical reactions."],
    ["Hot and dry, as in a desert interior", "Little water limits chemical reactions."],
    ["Cold and dry, as in a polar region", "Weathering of all types is slow because it is both cold and dry."],
  ], "Chemical weathering needs **both heat and water**, so it is strongest in the humid tropics.", { hints: ["Which two factors speed up chemical reactions?"] });
  mc(b, 3, "UNDERSTANDING", "What is **chelation**?", [
    ["Organic compounds removing metal ions from minerals", "Correct: this weakens the mineral structure and speeds up breakdown."],
    ["Ice wedging apart the sides of a crack as it repeatedly freezes and thaws", "That is freeze-thaw weathering."],
    ["Rock slabs peeling off a dome as the overlying rock is removed", "That is pressure release (exfoliation)."],
    ["Salt crystals growing in the pores of the rock as water evaporates", "That is salt crystallisation."],
  ], "**Chelation** is a biological/chemical process: organic compounds remove metal ions such as iron and aluminium.", { hints: ["It involves organic compounds from lichens and humus."] });
  mc(b, 4, "ANALYSIS", "Two outcrops of the same granite lie in the same climate: one on a steep slope and one on a gentle plateau. Why is the regolith likely to be thicker on the plateau?", [
    ["Debris stays in place and keeps water against the rock", "Correct: on gentle ground the regolith builds up, holds water and weathering continues beneath it."],
    ["Granite weathers only on flat ground, whatever the climate may be", "Granite weathers on any slope; the difference is in removal of the debris."],
    ["Steep slopes receive less rainfall than flat ground in the same climate", "Rainfall may be similar; the key is the removal of material."],
    ["Rock on a plateau is exposed to stronger freeze-thaw cycles every night", "The climate is the same; the difference is the removal of debris."],
  ], "On steep slopes weathered debris is carried away, exposing fresh rock; on gentle ground it **accumulates**, holds water and speeds chemical weathering.",
  { hints: ["Think about what happens to the weathered material."] });

  b.tf({ d: 1, skill: "RECALL", stem: "Weathering and erosion mean the same thing.", answer: false,
    feedbackFalse: "Correct: weathering breaks rock in place, while erosion involves transport by water, wind or ice.", feedbackTrue: "Not so: erosion needs a moving agent to carry the material away.",
    explanation: "Weathering is breakdown **in place**; erosion is removal by a moving agent." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Chemical weathering is generally faster in warm, wet climates than in cold, dry ones.", answer: true,
    feedbackTrue: "Correct: heat and water both speed up chemical reactions.", feedbackFalse: "Not so: chemical reactions need heat and water.",
    explanation: "Reactions speed up with temperature (roughly doubling for each 10 °C rise) and need water." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each weathering process to what happens.",
    pairs: [
      ["Hydrolysis", "Feldspar reacts with water to form clay minerals"],
      ["Carbonation", "Carbonic acid dissolves calcium carbonate"],
      ["Oxidation", "Iron minerals react with oxygen to form red-brown oxides"],
      ["Salt crystallisation", "Growing salt crystals push grains apart as water evaporates"],
      ["Pressure release", "Rock expands and cracks as overlying material is removed"],
    ], explanation: "Match each process to its mechanism." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Weathering breaks rock down {{blank:a}}, but {{blank:b}} involves transport by a moving agent. Water expands by about {{blank:c}} when it freezes.",
    blanks: [
      { id: "a", accepted: ["in place"], choices: ["in place", "after transport", "only underwater"] },
      { id: "b", accepted: ["erosion"], choices: ["erosion", "oxidation", "regolith"] },
      { id: "c", accepted: ["9%"], choices: ["9%", "50%", "0.1%"] },
    ], explanation: "Weathering happens in place; erosion needs transport; ice occupies about 9% more volume than water." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the process in which curved sheets of granite peel from a dome as overlying rock is removed.",
    accepted: ["exfoliation", "pressure release", "unloading", "sheeting"], explanation: "**Exfoliation** (sheeting), caused by pressure release, peels curved slabs from granite domes." });

  const lossPerYear = chk(pct(60.0, 57.3) / 2.5, 1.8);
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A 60.0 g limestone tablet loses mass during a 30-month field experiment. Its mass at the end is 57.3 g. Calculate the percentage loss **per year**, to 1 decimal place.",
    hints: ["Percentage loss = loss ÷ start × 100.", "30 months is 2.5 years."],
    value: lossPerYear, dp: 1, wrong: [4.5, 0.9],
    explanation: "Loss = 60.0 − 57.3 = 2.7 g. Percentage loss = 2.7 ÷ 60.0 × 100 = 4.5%. Over 2.5 years: 4.5 ÷ 2.5 = **1.8% per year**. The value 4.5% is the total loss, not the rate per year." });
  const rate25 = chk(3 * 2 ** ((25 - 5) / 10), 12);
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "units",
    stem: "A chemical weathering reaction has a relative rate of 3 units at 5 °C. Using the rule of thumb that the rate doubles for every 10 °C rise, estimate the rate at 25 °C, in units.",
    hints: ["How many 10 °C steps are there between 5 °C and 25 °C?"],
    value: rate25, wrong: [6, 24],
    explanation: "1. The temperature rises by 25 − 5 = 20 °C, which is two steps of 10 °C.\n2. The rate doubles twice: 3 × 2 × 2 = **12 units**.\n3. 6 units would allow for only one doubling." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how freeze-thaw weathering breaks rock.",
    hints: ["Start with water entering the rock."],
    points: [
      "Water enters joints and cracks in the rock.",
      "When the temperature falls below 0 °C the water freezes and expands by about 9%, putting pressure on the walls of the crack.",
      "When it thaws the pressure is released and the crack stays wider (and water can go deeper).",
      "Repeated freezing and thawing enlarges the cracks until angular pieces break off.",
    ],
    modelAnswer: "Water gets into cracks in the rock. At night, when the temperature falls below 0 °C, it freezes and expands by about 9%, pushing the crack wider. When it thaws, the crack stays open and more water can enter. After many cycles the rock breaks into angular fragments.",
    explanation: "Ice wedging enlarges cracks repeatedly." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how carbonation weathers limestone.",
    hints: ["Start with how rainwater becomes acidic."],
    points: [
      "Rainwater absorbs carbon dioxide (from the air and soil) to form weak carbonic acid.",
      "The acid reacts with calcium carbonate in the limestone to form calcium hydrogencarbonate.",
      "Calcium hydrogencarbonate is soluble, so it is carried away in solution, leaving the rock weakened or dissolved.",
    ],
    modelAnswer: "Rain absorbs carbon dioxide and becomes weak carbonic acid. This reacts with calcium carbonate in limestone to make calcium hydrogencarbonate, which is soluble and is washed away in solution.",
    explanation: "Carbonic acid dissolves calcium carbonate." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why chemical weathering is stronger in a tropical rainforest than in a hot desert.",
    hints: ["Both are hot; what differs?"],
    points: [
      "Both have high temperatures, which speed up chemical reactions.",
      "The rainforest has heavy rainfall, so water is always available to react with minerals.",
      "The desert is dry, so little water is available and weathering is slow; the rainforest's organic matter also adds acids.",
    ],
    modelAnswer: "Both climates are hot, which speeds up chemical reactions. The rainforest also has heavy rainfall and plenty of organic acids from vegetation, so water is always available to react with minerals. The desert has very little water, so chemical weathering is slow.",
    explanation: "Chemical weathering needs both heat and water." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain two ways in which relief (the shape of the land) affects weathering.",
    hints: ["Think about steep slopes and gentle slopes separately."],
    points: [
      "On steep slopes, weathered material is removed quickly (by mass movement and wash), so fresh rock is continually exposed.",
      "This means that the weathered layer stays thin, and weathering is slower once the surface layer has gone.",
      "On gentle slopes and flat ground, regolith builds up and holds water against the rock.",
      "So weathering continues beneath the cover, and deep regolith develops.",
    ],
    modelAnswer: "On steep slopes the weathered debris moves downslope quickly, so only a thin cover remains and fresh rock is exposed. On gentle slopes and plateaus the regolith stays in place and holds water against the rock, so weathering continues and a deep weathered layer develops.",
    explanation: "Relief controls removal and retention of weathered material." });

  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true,
    stem: `Three identical 45.0 g limestone tablets were buried at sites X, Y and Z for 24 months (illustrative data, invented for this exercise).\n\n${SITETAB}`,
    hints: ["Percentage loss per year = (loss ÷ start) × 100 ÷ 2.", "In (b) divide one rate by the other."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage loss per year at site X, to 1 decimal place.", value: xPerYear, dp: 1, unit: "%", wrong: [6.0, 2.7],
        explanation: "Loss = 45.0 − 42.3 = 2.7 g. 2.7 ÷ 45.0 × 100 = 6.0% over 24 months. Per year = 6.0 ÷ 2 = 3.0%." }),
      P.num({ label: "(b)", marks: 2, stem: "How many times greater is the rate of loss at site X than at site Z? Give the answer as a whole number.", value: ratioXZ, wrong: [8, 2.7],
        explanation: "Loss at Z = 45.0 − 44.7 = 0.3 g. Loss at X = 2.7 g. 2.7 ÷ 0.3 = 9 times." }),
      P.mcq({ label: "(c)", stem: "Which process best explains the large loss at site X?", options: [
        ["Carbonation, helped by damp soil rich in CO₂", "Correct: damp, organic-rich soil makes strong carbonic acid."],
        ["Freeze-thaw, caused by frequent frosts at night", "Freezing is not mentioned, and tablets that are buried are protected from frost."],
        ["Pressure release, caused by the removal of rock above", "Pressure release acts on large masses of rock, not on small tablets."],
        ["Salt crystallisation, caused by strong evaporation", "A shaded forest floor has low evaporation."],
      ], answer: "A", explanation: "Moist soil rich in CO₂ makes carbonation fast." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest reasons why the loss at site Z is so small.",
        points: [
          "The bare rock is dry, so little water is available for carbonation.",
          "Rain runs off the surface quickly, so little acid or time of contact.",
          "There is no soil or vegetation to supply carbon dioxide and organic acids.",
        ],
        modelAnswer: "Site Z is dry bare rock, so there is little water in contact with the tablet. Rain runs off quickly and there is no soil or vegetation to provide carbon dioxide and organic acids, so little carbonation takes place.",
        explanation: "Moisture and organic matter are lacking at site Z." }),
    ], explanation: "Calculate and compare rates and explain the differences." });

  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, applies: ZIM,
    stem: `A student plotted three stations on a Peltier diagram (illustrative values, invented for this exercise).\n\n${tbl(["Station", "Mean annual temperature", "Mean annual rainfall", "Frost?"], [["E: Eastern Highlands plateau", "16 °C", "1 400 mm", "Rare, light"], ["L: southern lowveld", "24 °C", "450 mm", "None"], ["M: high mountain", "2 °C", "1 000 mm", "Many freeze-thaw days"]])}`,
    hints: ["Link each station's temperature and rainfall to the weathering types.", "In (d) go beyond climate."],
    parts: [
      P.mcq({ label: "(a)", stem: "Which type of weathering is likely to dominate at station E?", options: [
        ["Chemical weathering such as hydrolysis", "Correct: it is warm and wet enough for strong chemical weathering."],
        ["Freeze-thaw, because the station has frequent frosts", "Frost is rare at E."],
        ["Salt crystallisation, because the air is very dry", "Rainfall is high, not low."],
        ["No weathering of any kind, because it is cool", "Weathering occurs everywhere, and the climate is warm and wet."],
      ], answer: "A", explanation: "Moderate temperature and high rainfall favour chemical weathering." }),
      P.mcq({ label: "(b)", stem: "Which type of weathering is likely to dominate at station M?", options: [
        ["Freeze-thaw", "Correct: low temperatures cross 0 °C often and there is plenty of water."],
        ["Hydrolysis of feldspar into clay minerals", "Low temperatures slow chemical reactions."],
        ["Oxidation of iron-bearing minerals", "Cold conditions slow oxidation."],
        ["Chelation by organic acids from roots", "Vegetation is sparse at this altitude."],
      ], answer: "A", explanation: "Cold, moist climates with frequent crossing of 0 °C favour freeze-thaw." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain why chemical weathering is slower at station L than at station E although L is warmer.",
        points: [
          "The temperature at L (24 °C) is higher, which would speed up chemical reactions.",
          "Rainfall at L (450 mm) is much lower than at E (1 400 mm), so little water is available.",
          "Weathering needs water to react with minerals, so lack of water limits the rate.",
          "Sparse vegetation at L adds less organic acid and less carbon dioxide than at E.",
        ],
        modelAnswer: "Although L is warmer, it receives only 450 mm of rain, compared with 1 400 mm at E. Chemical weathering needs water to react with the minerals, so lack of water limits it. The thinner vegetation at L also provides less organic acid and carbon dioxide.",
        explanation: "Moisture is the limiting factor at L." }),
      P.manual({ label: "(d)", marks: 6, stem: "Discuss non-climatic factors that could make weathering at E faster or slower than the climate alone suggests.",
        points: [
          "Rock type: granite with feldspar weathers by hydrolysis; resistant quartzite would weather more slowly.",
          "Rock structure: many joints and faults let water in and speed up weathering.",
          "Relief: gentle ground keeps regolith and moisture, speeding up weathering; steep slopes remove debris.",
          "Vegetation: dense forest provides organic acids and roots that speed up weathering.",
          "Human influence: clearing forest, ploughing and quarrying expose rock and soil.",
          "Judgement: for a given climate, rock type and structure often decide how fast weathering is.",
        ],
        modelAnswer: "At E, the rock type matters: granite rich in feldspar weathers quickly by hydrolysis, but quartzite resists. Many joints let water in, so weathering is faster. Gentle ground keeps regolith and moisture against the rock, while steep slopes remove it. Dense forest gives organic acids and roots, but clearing or ploughing exposes the soil. For a given climate, rock type and structure often decide how fast it weathers.",
        explanation: "Rock, structure, relief, vegetation and human action modify the climatic rate." }),
    ], explanation: "Use the Peltier idea to match climate to weathering and then go beyond climate." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess how far climate is the most important factor controlling the rate of weathering.",
    hints: ["Cover temperature and rainfall, then the other factors.", "Reach a judgement."],
    points: [
      "Temperature speeds up chemical reactions (roughly doubling per 10 °C), so warm climates have faster chemical weathering.",
      "Rainfall supplies water for chemical and physical processes; dry climates have slow chemical weathering.",
      "Frost frequency decides whether freeze-thaw weathering occurs.",
      "Climate also controls vegetation, which adds organic acids and carbon dioxide.",
      "Rock type matters: limestone and granite react to different processes, and quartzite resists.",
      "Rock structure (joints, bedding, faults) controls how water enters the rock.",
      "Relief controls removal of debris, and human activity can expose rock.",
      "Judgement: climate sets the broad pattern but rock type and structure often decide the rate locally.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Climate is a major control. Warm temperatures speed up chemical reactions, roughly doubling their rate for each 10 °C, and rainfall supplies the water, so chemical weathering is strongest in the humid tropics and slow in deserts. Frost determines whether freeze-thaw operates. Climate also controls vegetation, which adds organic acids. However, rock type also matters, as limestone dissolves by carbonation while quartzite resists, and joints let water in. Relief decides whether debris stays to hold moisture, and human activity may expose fresh rock. I conclude that climate sets the broad global pattern, but locally rock type and structure can matter just as much.",
    wordLimit: { max: 300 }, explanation: "Judge climate against rock, relief, vegetation and people." });

  b.card("DEFINITION", "Weathering", "The breakdown of rock in place (no transport) by physical, chemical or biological processes.");
  b.card("CONCEPT", "Physical weathering types", "Freeze-thaw (ice expands about 9%), pressure release (exfoliation), thermal expansion and contraction (moisture-assisted) and salt crystallisation.");
  b.card("CONCEPT", "Chemical weathering types", "Hydrolysis (feldspar to clay), carbonation (limestone dissolved by carbonic acid), oxidation (iron oxides) and solution.");
  b.card("FORMULA", "Carbonation", "CaCO₃ + H₂O + CO₂ → Ca(HCO₃)₂: calcium carbonate becomes soluble calcium hydrogencarbonate.");
  b.card("DEFINITION", "Chelation", "A biological/chemical process in which organic compounds bind metal ions (iron, aluminium) and remove them from minerals, weakening the rock.");
  b.card("CONCEPT", "Peltier diagram", "Graph of mean annual temperature against mean annual rainfall showing the dominant weathering: chemical in hot, wet climates; freeze-thaw in cold, moist climates; slow in dry ones.");
  b.card("FACT", "Temperature and chemical reaction rates", "Rule of thumb: the rate of a chemical reaction roughly doubles for every 10 °C rise in temperature (approximate).");
  b.card("CONCEPT", "Non-climatic factors", "Rock type and structure, relief, vegetation and human influence (quarrying, acid rain, clearing).");
  b.card("FORMULA", "Percentage mass loss", "Percentage loss = (start mass − final mass) ÷ start mass × 100; divide by the number of years for the rate per year.");
});
