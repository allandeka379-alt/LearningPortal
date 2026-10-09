// Slice W1a: exam-format items. Theory structured (10 marks: ZIMSEC P2 Section A / Cambridge P1 Section A) and
// Cambridge P1 Section B (15 marks). Part splits are our convention; a reviewer must check them against past papers.
import { concept, P, ZIM, CAM, field, pct, mean, waterVolume, check, fmtNum, table, agricultureLevels } from "../lib.mjs";

// T1: land use in a fictional district.
const T1 = [["Crop land", 5250], ["Grazing land", 7350], ["Woodland on steep hills", 3150], ["Fish ponds and dams", 210], ["Settlement and roads", 1040]];
const t1Total = T1.reduce((s, [, a]) => s + a, 0);
const t1Wood = pct(3150, t1Total);
const t1People = 21000;
const t1PerPerson = 5250 / t1People;
check(t1Total === 17000, "T1 total");

// T2: a mixed farm.
const t2Field = field(450, 240);
const t2Graze = 18;
const t2Paddock = t2Graze / 3;

// T3: rainfall at a fictional highveld station.
const T3 = [["November", 92], ["December", 168], ["January", 214], ["February", 121], ["March", 55]];
const t3Total = T3.reduce((s, [, r]) => s + r, 0);
const t3Storm = { rain: 60, runoff: 21, evap: 3 };
const t3Eff = pct(t3Storm.rain - t3Storm.runoff - t3Storm.evap, t3Storm.rain);
check(t3Total === 650 && t3Eff === 60, "T3");

// T4: a farm in region IV.
const T4 = [560, 470, 640, 390, 590, 510];
const t4Mean = mean(T4);
const t4Basin = waterVolume({ areaM2: 1.8, depthMm: 50 }); // 2.4 m x 0.75 m
check(Math.abs(t4Mean - 526.67) < 0.01 && Math.abs(2.4 * 0.75 - 1.8) < 1e-9, "T4");

concept("agri.land.land-use", { file: "exam/w1a-theory", keyPrefix: "exam.w1a-theory" }, (b) => {
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, paper: "ZIMSEC P2 / Cambridge P1", secs: 720, calculator: true,
    concepts: ["agri.land.land-use", "agri.environment.climate-rainfall"],
    stem: `Table 1 shows how land is used in a fictional farming district.\n\n**Table 1**\n\n${table(["Land use", "Area (ha)"], T1.map(([u, a]) => [u, fmtNum(a)]))}`,
    hints: ["Add the areas to find the total.", "Land per person = crop land ÷ number of people."],
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which of the following is a **climatic** factor that limits land use?", options: [
        ["Low and unreliable rainfall", "Correct: rainfall is a climatic factor."],
        ["A steep, rocky hillside", "Slope is a topographical factor."],
        ["A shallow, stony soil", "Soil depth is a soil (edaphic) factor."],
        ["Distance from a main road", "Access is an economic factor."],
      ], answer: "A", explanation: "Climatic factors are rainfall, temperature, frost, wind and humidity." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage of the district covered by woodland on steep hills, to the nearest whole number.", value: t1Wood, tol: 0.5, answer: String(Math.round(t1Wood)), unit: "%", wrong: [Math.round(pct(3150, t1Total - 3150))], explanation: `Total = ${fmtNum(t1Total)} ha; 3,150 ÷ ${fmtNum(t1Total)} × 100 = ${Math.round(t1Wood)}% (${t1Wood.toFixed(2)}%).` }),
      P.short({ label: "(c)", marks: 1, stem: "Name the form of land use carried out in the fish ponds.", accepted: ["aquaculture", "fish farming", "fish culture", "pisciculture"], wrong: ["irrigation"], explanation: "Rearing fish in ponds is aquaculture." }),
      P.num({ label: "(d)", marks: 1, stem: `The district has ${fmtNum(t1People)} people. Calculate the crop land per person in ha.`, value: t1PerPerson, unit: "ha", wrong: [t1People / 5250], explanation: `5,250 ÷ ${fmtNum(t1People)} = ${t1PerPerson} ha per person.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the steep hills are best kept under woodland.", points: [
        "Steep slopes erode severely if cleared and cultivated / cannot be worked safely by machines.",
        "Tree roots and litter hold the soil and reduce runoff (and the trees supply poles and firewood).",
      ], explanation: "Topography limits land use: steep land is safest under permanent cover." }),
      P.manual({ label: "(f)", marks: 3, stem: "The population of the district is growing quickly. Suggest **three** likely effects on its land use.", points: [
        "Less crop land per person / fields divided into smaller plots (fragmentation).",
        "Woodland on the hills cleared for fields or firewood, causing erosion.",
        "More cattle on the grazing land, leading to overgrazing / fallows shortened, so fertility falls.",
      ], explanation: "Land pressure leads to fragmentation, clearing of marginal land and overgrazing." }),
    ],
    explanation: `The district covers ${fmtNum(t1Total)} ha; woodland on steep hills is about ${Math.round(t1Wood)}%, and each person has ${t1PerPerson} ha of crop land.`,
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, paper: "ZIMSEC P2 / Cambridge P1", secs: 720,
    concepts: ["agri.land.farming-systems", "agri.land.farm-planning"],
    stem: `Farai's farm has an arable field measuring 450 m by 240 m, where he grows maize with rows of beans between the maize rows. He also keeps 15 cattle, which are fed maize stover in the dry season, and 200 layers. He has ${t2Graze} ha of grazing that he plans to divide into three equal paddocks. The prevailing wind blows from the east.`,
    hints: ["1 ha = 10,000 m².", "Smells blow downwind."],
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the farming system that Farai follows.", accepted: ["mixed farming", "mixed", "mixed farming system", "crop-livestock farming"], wrong: ["monoculture"], explanation: "Crops and livestock on the same farm, supporting each other: mixed farming." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the area of the arable field in hectares.", value: t2Field.ha, unit: "ha", wrong: [t2Field.m2, t2Field.m2 / 1000], explanation: `450 × 240 = ${fmtNum(t2Field.m2)} m²; ÷ 10,000 = ${t2Field.ha} ha.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "Where should the layer house be sited?", options: [
        ["Near the homestead, on its western side", "Correct: close for supervision, and downwind of an east wind."],
        ["Near the homestead, on its eastern side", "Smells and flies would blow from there onto the house."],
        ["Inside the arable field", "This wastes arable land and is far from supervision."],
        ["On the far boundary of the grazing land", "Too far for daily feeding, egg collection and security."],
      ], answer: "A", explanation: "Poultry houses go near the homestead but downwind of it." }),
      P.num({ label: "(d)", marks: 1, stem: "Calculate the area of each paddock in hectares.", value: t2Paddock, unit: "ha", wrong: [t2Graze * 3], explanation: `${t2Graze} ÷ 3 = ${t2Paddock} ha.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain **one** advantage of growing beans between the maize rows.", points: [
        "Beans are legumes that fix nitrogen (or: two crops from the same land / better ground cover / less risk).",
        "This benefits the maize and the soil (or: higher total output / less erosion and weeds / income if one crop fails).",
      ], explanation: "An intercropping advantage with its reason." }),
      P.manual({ label: "(f)", marks: 3, stem: "Describe **three** ways in which Farai's crops and livestock support each other.", points: [
        "Maize stover feeds the cattle in the dry season.",
        "Cattle manure (and poultry manure) is returned to the field to keep it fertile.",
        "Cattle (oxen) provide draught power for ploughing and carting / poultry eat waste grain.",
      ], explanation: "These links are the main strength of mixed farming." }),
    ],
    explanation: `Mixed farming with intercropping; the field is ${t2Field.ha} ha and each paddock ${t2Paddock} ha.`,
  });

  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, paper: "ZIMSEC P2 / Cambridge P1", secs: 720, calculator: true,
    concepts: ["agri.environment.climate-rainfall"],
    stem: `Table 2 shows the rainfall at a fictional highveld station during one rainy season. In one January storm, ${t3Storm.rain} mm of rain fell in 40 minutes; ${t3Storm.runoff} mm ran off and ${t3Storm.evap} mm evaporated.\n\n**Table 2**\n\n${table(["Month", "Rainfall (mm)"], T3)}`,
    hints: ["Effective rain = rain − runoff − evaporation.", "Cold air sinks."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the total rainfall for the season in mm.", value: t3Total, unit: "mm", wrong: [t3Total - 55], explanation: `92 + 168 + 214 + 121 + 55 = ${t3Total} mm.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage of the storm's rain that entered the soil.", value: t3Eff, unit: "%", wrong: [65, 40], explanation: `Effective rain = ${t3Storm.rain} − ${t3Storm.runoff} − ${t3Storm.evap} = ${t3Storm.rain - t3Storm.runoff - t3Storm.evap} mm; ${t3Storm.rain - t3Storm.runoff - t3Storm.evap} ÷ ${t3Storm.rain} × 100 = ${t3Eff}%.` }),
      P.fib({ label: "(c)", marks: 1, stem: "Choose the correct term.", template: "The amount of rain falling in a given time, such as 60 mm in 40 minutes, is the rainfall {{blank:a}}.", blanks: [{ id: "a", accepted: ["intensity"], choices: ["intensity", "reliability", "distribution", "effectiveness"] }], explanation: "Intensity is the rate of rainfall." }),
      P.mcq({ label: "(d)", marks: 1, stem: "During a dry spell, a maize crop droops every afternoon but recovers by the next morning. What is this?", options: [
        ["Temporary wilting", "Correct: the plants recover when water loss falls."],
        ["Permanent wilting", "Permanently wilted plants do not recover without water."],
        ["Lodging", "Lodging is flattening by wind or rain."],
        ["Frost damage", "Frost does not occur on hot afternoons in the rainy season."],
      ], answer: "A", explanation: "Temporary wilting: water loss exceeds uptake in the heat of the day." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why frost damage in June is more common in valley bottoms than on slopes.", points: [
        "On clear, calm nights cold, dense air flows downhill.",
        "It collects in valley bottoms (frost pockets), where temperatures fall to 0 °C or below.",
      ], explanation: "Cold air drainage creates frost hollows." }),
      P.manual({ label: "(f)", marks: 3, stem: "Explain how the intensity of storms like the January storm affects farming.", points: [
        "Rain falls faster than the soil can absorb it (exceeds infiltration rate).",
        "Much water runs off, so less is available to crops (low effectiveness).",
        "Runoff causes soil erosion / gullies / loss of fertile topsoil and fertiliser.",
      ], explanation: "High intensity reduces effectiveness and increases erosion." }),
    ],
    explanation: `The season totalled ${t3Total} mm; only ${t3Eff}% of the intense storm entered the soil.`,
  });

  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, paper: "ZIMSEC Paper 2 Section A", secs: 720, applies: ZIM, calculator: true,
    concepts: ["agri.land.natural-regions", "agri.environment.adverse-conditions"],
    stem: `Chipo farms in a dry district of Matabeleland. Table 3 shows her rainfall records for six seasons.\n\n**Table 3**\n\n${table(["Season", "1", "2", "3", "4", "5", "6"], [["Rainfall (mm)", ...T4]])}\n\nShe plans to make tied ridges; each basin will measure 2.4 m by 0.75 m.`,
    hints: ["Mean = total ÷ 6.", "1 mm of water on 1 m² = 1 L."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean seasonal rainfall in mm, to the nearest whole number.", value: t4Mean, tol: 0.5, answer: String(Math.round(t4Mean)), unit: "mm", wrong: [T4.reduce((s, r) => s + r, 0)], explanation: `Total = ${fmtNum(T4.reduce((s, r) => s + r, 0))} mm; mean = ${fmtNum(T4.reduce((s, r) => s + r, 0))} ÷ 6 = ${t4Mean.toFixed(1)} ≈ ${Math.round(t4Mean)} mm.` }),
      P.short({ label: "(b)", marks: 1, stem: "Name the natural farming region that best fits these records.", accepted: ["IV", "4", "region IV", "region 4", "four", "region four", "natural region IV", "natural region 4"], wrong: ["II"], explanation: `About ${Math.round(t4Mean)} mm with dry seasons fits region IV.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which crop is best suited to Chipo's farm?", options: [
        ["Pearl millet", "Correct: drought-tolerant small grain suited to region IV."],
        ["Tea", "Tea needs the high rainfall of region I."],
        ["Rain-fed wheat", "Wheat is an irrigated winter crop."],
        ["Late-maturing maize", "Late maize is very vulnerable to drought."],
      ], answer: "A", explanation: "Small grains (sorghum, pearl millet, finger millet) suit region IV." }),
      P.num({ label: "(d)", marks: 1, stem: "Calculate the volume of water, in litres, held by one basin filled to a depth of 50 mm.", value: t4Basin.litres, unit: "L", wrong: [t4Basin.litres / 10], explanation: `Area = 2.4 × 0.75 = 1.8 m²; volume = 1.8 × 50 = ${t4Basin.litres} L.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain how tied ridges help Chipo's crops.", points: [
        "Cross-ties form basins that trap rainwater instead of letting it run off.",
        "The water soaks into the soil and supports the crop through dry spells.",
      ], explanation: "Tied ridges hold rain in the field." }),
      P.manual({ label: "(f)", marks: 3, stem: "Describe the farming system that suits Chipo's natural region.", points: [
        "Semi-extensive farming.",
        "Based mainly on livestock (cattle, goats) using veld grazing.",
        "With drought-tolerant crops such as sorghum and millets (and water harvesting).",
      ], explanation: "Region IV suits semi-extensive livestock farming with drought-tolerant crops." }),
    ],
    explanation: `Mean rainfall about ${Math.round(t4Mean)} mm: region IV, semi-extensive farming with water harvesting.`,
  });
});

concept("agri.land.modern-production", { file: "exam/w1a-cambridge", keyPrefix: "exam.w1a-cambridge", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, paper: "Cambridge Paper 1 Section B", secs: 945,
    concepts: ["agri.land.land-use", "agri.environment.climate-rainfall", "agri.land.farm-planning"],
    stem: "A government wants to increase food production in a country where the population is growing fast and much of the land is hilly or dry.",
    hints: ["For (a), think about slope, altitude and drainage.", "For (c), consider planning at farm and national level, and weigh up the options."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how topography limits the use of land for agriculture.", points: [
        "Steep slopes erode easily when cultivated.",
        "Steep slopes cannot be mechanised safely, so they suit forestry or permanent pasture.",
        "Low-lying valleys may be waterlogged or flooded.",
        "High altitude brings low temperatures and frost, limiting the crops grown.",
      ], explanation: "Slope, drainage position and altitude all limit land use." }),
      P.manual({ label: "(b)", marks: 5, stem: "Explain how rainfall and temperature affect the choice of crops and livestock in different areas.", points: [
        "High, reliable rainfall allows rain-fed field crops such as maize, or tea and forestry where it is cool and very wet.",
        "Low or unreliable rainfall favours drought-tolerant crops (sorghum, millets) and livestock or wildlife.",
        "Where rain is too low, crops are possible only with irrigation.",
        "High temperatures suit heat-loving crops (cotton, sugar cane) but increase evapotranspiration and heat stress in animals.",
        "Low temperatures and frost exclude tender crops / suit temperate crops such as apples or winter wheat.",
      ], explanation: "Credit links between climate and enterprise choice." }),
      P.manual({ label: "(c)", marks: 6, stem: "Discuss how population growth makes efficient land use and farm planning necessary.", points: [
        "Land is fixed, so land per person falls as population grows.",
        "Without planning, people cultivate slopes and wetlands and overgraze, causing erosion and degradation.",
        "Intensification (improved seed, fertiliser, irrigation) raises output per hectare on suitable land.",
        "Farm planning places crops on suitable soils, trees on steep land and conservation works where needed.",
        "Land-use planning protects catchments, forests and grazing, and keeps livestock within carrying capacity.",
        "Reasoned conclusion, e.g. food supply can keep up only if output per hectare rises without degrading land.",
      ], levels: agricultureLevels(6), explanation: "A discussion links population, land pressure, efficiency and planning." }),
    ],
    explanation: "Topography and climate limit what land can do; population growth makes efficient, planned use essential.",
  });

  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Cambridge Paper 1 Section B", secs: 945,
    concepts: ["agri.land.modern-production"],
    stem: "A grower near a city is choosing between hydroponic lettuce in a greenhouse, certified organic vegetables in the field, and genetically modified (GM) sweetcorn.",
    hints: ["For (a), describe the system and what the grower must control.", "For (c), give arguments on both sides and a conclusion."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how lettuce is grown hydroponically using the nutrient film technique.", points: [
        "Plants grow without soil, supported in channels or gullies.",
        "A thin film of nutrient solution flows past the roots down a slight slope.",
        "The solution is collected in a tank and pumped back (recirculated).",
        "The grower checks and adjusts the pH and nutrient concentration and keeps the roots supplied with oxygen.",
      ], explanation: "NFT: soil-free, flowing, recirculated, monitored solution." }),
      P.manual({ label: "(b)", marks: 5, stem: "Explain the arguments for and against organic vegetable production for this grower.", points: [
        "For: premium prices for certified organic produce.",
        "For: no synthetic pesticide residues; less pollution; healthier soil with more organic matter.",
        "Against: lower yields than conventional production.",
        "Against: more labour for weeding, composting and pest control; pests harder to control.",
        "Against: certification and a conversion period cost time and money / enough manure may be hard to obtain.",
      ], explanation: "Both sides needed for full marks." }),
      P.manual({ label: "(c)", marks: 6, stem: "Discuss whether the grower should plant GM sweetcorn.", points: [
        "For: insect resistance (e.g. Bt) reduces losses to caterpillars and the need to spray.",
        "For: higher, more reliable yields; safer for workers and natural enemies.",
        "Against: seed is costly and often patented; it must be bought every season.",
        "Against: pests may become resistant; pollen may carry genes to non-GM crops nearby.",
        "Against: some buyers, supermarkets or importing countries reject GM produce; local regulations may not allow it; it rules out organic certification.",
        "Reasoned conclusion matched to the grower's market (e.g. not advisable if the grower also sells organic produce or buyers reject GM).",
      ], levels: agricultureLevels(6), explanation: "Weigh benefits against costs and market risks and conclude." }),
    ],
    explanation: "Each modern system has benefits and drawbacks; the right choice depends on cost, skills, market and regulation.",
  });
});
