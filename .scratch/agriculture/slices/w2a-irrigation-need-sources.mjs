// Slice W2a: the need for irrigation and sources of irrigation water.
import { concept, P, ZIM, waterVolume, field, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: daily water for 0.8 ha at 5 mm/day.
const d1 = waterVolume({ areaM2: 8000, depthMm: 5 });
check(d1.litres === 40000 && d1.m3 === 40, "d1");
// Calc: days a 20 m³ tank lasts for a 400 m² garden at 4 mm/day.
const gdn = field(25, 16);
const gDay = waterVolume({ areaM2: gdn.m2, depthMm: 4 });
const tankDays = 20000 / gDay.litres;
check(gdn.m2 === 400 && gDay.litres === 1600 && Math.abs(tankDays - 12.5) < 1e-9, "tank");
// Num: dissolved solids.
const tds = 0.6 / 0.5;
check(Math.abs(tds - 1.2) < 1e-9, "tds");

// Structured: three sources on a farm.
const SRC = [["Borehole", "All year", "8,000", "Clear; dissolved solids 0.4 g/L"], ["River", "November to June", "Large", "Muddy after storms; a mine upstream"], ["Hand-dug well", "All year, falls in October", "1,500", "Clear; dissolved solids 0.5 g/L"]];
const SRC_TABLE = table(["Source", "When water is available", "Safe daily supply (L)", "Quality notes"], SRC);
const plotS = field(40, 30);
const needS = waterVolume({ areaM2: plotS.m2, depthMm: 5 });
check(needS.litres === 6000, "needS");

concept("agri.water.irrigation-need-sources", { file: "water/irrigation-need-sources", keyPrefix: "water.irrigation-need-sources" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **irrigation**?",
    options: [
      ["The artificial application of water to crops when rainfall is not enough", "Correct."],
      ["The removal of excess water from waterlogged land by digging open drains", "That is drainage."],
      ["The collection of rainwater from roofs for drinking only", "That is rainwater harvesting for domestic use."],
      ["The natural movement of water up through the soil by capillarity", "Capillary rise is natural, not irrigation."],
    ],
    answer: "A",
    explanation: "Irrigation supplies water artificially to meet crop needs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is wheat in Zimbabwe normally grown under irrigation?",
    options: [
      ["It is a winter crop, grown in the dry season when there is almost no rain", "Correct."],
      ["Wheat roots cannot absorb rainwater", "Roots absorb any soil water."],
      ["Rain damages wheat leaves and heads, so the crop must be kept dry all season", "This is not the reason."],
      ["Irrigation water contains nutrients that wheat needs and rainwater lacks", "The reason is the timing of the rain."],
    ],
    answer: "A",
    explanation: "Wheat is grown from about May to September, in the dry winter, so it must be irrigated.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which source of irrigation water stores summer flood water for use in the dry season?",
    options: [
      ["A dam", "Correct: dams store runoff from the rains."],
      ["A spring", "A spring is a natural outflow of groundwater."],
      ["A seasonal river", "A seasonal river stops flowing in the dry season."],
      ["A shallow hand-dug well", "A well taps groundwater."],
    ],
    answer: "A",
    explanation: "Dams hold back river flow and floods from the rainy season for later use.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which instrument is used to estimate the dissolved salts in irrigation water?",
    options: [
      ["An electrical conductivity (EC) meter", "Correct: salty water conducts electricity better."],
      ["A rain gauge placed in the open field", "It measures rainfall."],
      ["A soil auger", "It is used to take soil samples."],
      ["A wet-and-dry bulb thermometer", "It measures humidity."],
    ],
    answer: "A",
    explanation: "Dissolved salts carry an electric current, so EC rises with salinity.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Silty river water is pumped into a drip irrigation system without treatment. What is the most likely problem?",
    options: [
      ["The drip emitters become blocked", "Correct: fine silt clogs the narrow emitters."],
      ["The crop absorbs the silt and is poisoned", "Silt is not absorbed by roots."],
      ["The soil becomes strongly acid at once", "Silt does not make soil acid."],
      ["The water evaporates faster from the pipes", "Silt does not change evaporation from closed pipes."],
    ],
    answer: "A",
    hints: ["Drip emitters have very small openings."],
    explanation: "Silt and suspended matter block emitters, sprinklers and pipes, so water must be settled and filtered.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why is untreated sewage water unsuitable for irrigating lettuce?",
    options: [
      ["It may carry pathogens onto leaves that are eaten raw", "Correct: a health risk to consumers."],
      ["It contains too little nitrogen for leafy vegetables", "Sewage is often rich in nutrients."],
      ["It is always too cold for the crop", "Temperature is not the main problem."],
      ["Lettuce cannot absorb any water that contains nutrients", "Nutrients in water are absorbed normally."],
    ],
    answer: "A",
    hints: ["Think about the people who eat the crop."],
    explanation: "Disease organisms in untreated waste water can contaminate crops eaten raw.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A farmer has irrigated with slightly salty borehole water for years in a hot, dry area, with light watering and no drainage. A white crust now forms on the soil. What has happened?",
    options: [
      ["Salts have built up in the topsoil as the water evaporated (salinisation)", "Correct."],
      ["Lime has been washed down from the subsoil", "Lime moves down, not up, and does not form this crust from irrigation."],
      ["The soil has become waterlogged with fresh rainwater", "Salinisation, not waterlogging by rain, forms a salt crust."],
      ["Fertiliser granules have dissolved and formed a protective layer that helps the crop", "The crust harms crops."],
    ],
    answer: "A",
    hints: ["What is left behind when water evaporates?"],
    explanation: "Evaporation leaves the salts behind; without enough water to leach them and good drainage, they accumulate as a crust.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Groundwater is reached by wells and boreholes.",
    answer: true,
    explanation: "True. Wells and boreholes tap water stored in aquifers underground.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Clear water is always safe for irrigation.",
    answer: false,
    explanation: "False. Clear water can be salty or carry dissolved chemicals and pathogens; it must be tested.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source of water with one disadvantage.",
    pairs: [
      ["Seasonal river", "Stops flowing in the dry season"],
      ["Borehole", "Costly to drill and pump"],
      ["Dam", "Loses water by evaporation and silts up"],
      ["Shallow well", "Small yield and easily polluted"],
    ],
    explanation: "Each source has its own limitation.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Water in rivers and dams is called {{blank:a}} water, while water stored in rocks underground is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["surface"] },
      { id: "b", accepted: ["groundwater", "ground water", "underground water"] },
    ],
    explanation: "Surface water and groundwater.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A crop on 0.8 ha uses 5 mm of water per day. How many litres does it use each day? (1 mm over 1 m² = 1 L.)",
    value: d1.litres, unit: "L", tol: 0, wrong: [0.8 * 5, 8000 * 5 / 1000],
    explanation: `0.8 ha = 8,000 m²; 8,000 × 5 = ${d1.litres.toLocaleString("en-GB")} L. Using 0.8 instead of 8,000 m² gives only 4 L.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A garden measures 25 m by 16 m. In hot weather the vegetables use 4 mm of water a day. For how many whole days will a full 20,000 L tank supply the garden?`,
    value: Math.floor(tankDays), unit: "days", tol: 0, wrong: [Math.ceil(tankDays), round(20 / 1.6 * 100, 0)],
    hints: ["Find the area, then litres per day.", "A part day of supply does not count as a whole day."],
    explanation: `Area = 25 × 16 = ${gdn.m2} m²; daily use = ${gdn.m2} × 4 = ${gDay.litres.toLocaleString("en-GB")} L; 20,000 ÷ ${gDay.litres.toLocaleString("en-GB")} = ${tankDays}, so ${Math.floor(tankDays)} whole days.`,
    workedSolution: `1. Area = 25 × 16 = ${gdn.m2} m².\n2. Daily use = ${gdn.m2} m² × 4 mm = ${gDay.litres.toLocaleString("en-GB")} L.\n3. Days = 20,000 ÷ ${gDay.litres.toLocaleString("en-GB")} = ${tankDays}.\n4. Whole days of full supply = ${Math.floor(tankDays)}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A 500 mL sample of well water is evaporated to dryness, leaving 0.6 g of salts. Calculate the dissolved solids in g/L.",
    value: tds, tol: 0.05, wrong: [0.6 * 0.5, 0.6 / 500],
    hints: ["Convert 500 mL to litres."],
    explanation: `500 mL = 0.5 L; 0.6 ÷ 0.5 = ${tds} g/L. Multiplying instead gives 0.3 g/L.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the build-up of salts in soil caused by irrigation with poor drainage in a hot, dry climate.",
    accepted: ["salinisation", "salinization", "salinity", "soil salinisation", "salinisation of the soil"],
    explanation: "**Salinisation**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why irrigation is important to farmers in natural regions IV and V.",
    applies: ZIM,
    hints: ["Think about the amount and reliability of rainfall."],
    points: [
      "Rainfall is low and unreliable, with frequent dry spells.",
      "Irrigation prevents crop failure / keeps yields reliable in drought years.",
      "The dry season is long, with no rain for most of the year.",
      "Irrigation allows crops (e.g. vegetables, sugar cane in the Lowveld) to be grown out of season / more than one crop per year.",
    ],
    modelAnswer: "In regions IV and V rainfall is low and unreliable, so a dry spell can destroy a rain-fed crop; irrigation keeps yields reliable. The dry season is also very long, so irrigation allows crops such as vegetables, and sugar cane in the Lowveld, to be grown when there is no rain at all.",
    explanation: "Link low, unreliable rain and a long dry season to the benefits.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Thandeka wants to irrigate a 40 m × 30 m vegetable plot near Marondera from June to October. In hot weather the crop needs about 5 mm of water a day. Her farm has three possible sources.\n\n${SRC_TABLE}`,
    hints: ["1 mm over 1 m² = 1 L.", "Check when each source has water and how much."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the volume of water the plot needs per day in hot weather, in litres.",
        value: needS.litres, unit: "L", tol: 0, wrong: [plotS.m2, plotS.m2 * 5 / 1000],
        explanation: `Area = 40 × 30 = ${plotS.m2.toLocaleString("en-GB")} m²; ${plotS.m2.toLocaleString("en-GB")} × 5 = ${needS.litres.toLocaleString("en-GB")} L.`,
      }),
      P.mcq({
        label: "(b)", stem: "Which source can supply the plot throughout June to October?",
        options: [
          ["The borehole", "Correct: available all year, 8,000 L a day."],
          ["The river", "It flows only until June."],
          ["The hand-dug well", "It gives only 1,500 L a day, far less than needed."],
          ["The river and the well together", "The river stops in June, so they cannot cover October."],
        ],
        answer: "A",
        explanation: "Only the borehole supplies more than the daily need all through the dry season.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Give **two** reasons why the river water may be unsuitable even when it is flowing.",
        points: ["It is muddy (silt), which blocks pipes and emitters and fills canals.", "The mine upstream may pollute it with toxic chemicals or metals."],
        explanation: "Silt and pollution.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Describe how Thandeka could check whether the borehole water is suitable for irrigation.",
        points: ["Measure dissolved salts with an EC meter (or evaporate a known volume and weigh the residue).", "Test the pH with a meter or indicator.", "Send a sample to a laboratory for sodium, toxic elements (e.g. boron) and bacteria."],
        explanation: "Salts, pH and laboratory analysis.",
      }),
    ],
    explanation: "Calculate the need, then match it to the reliability, volume and quality of each source.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A smallholder near Gokwe is deciding between drilling a borehole and building a small earth dam to irrigate 1 ha of winter crops. Discuss the advantages and disadvantages of each source.",
    hints: ["Compare cost, reliability, volume, losses and quality.", "Finish with a recommendation and its conditions."],
    points: [
      "Borehole: reliable, usually clean water close to the field; little evaporation loss.",
      "Borehole: costly to drill and pump (fuel/electricity); yield uncertain until drilled; water may be hard or salty; water table may fall.",
      "Dam: stores large volumes of summer runoff; may deliver by gravity, saving pumping.",
      "Dam: costly earthworks; needs a suitable site and catchment; loses water by evaporation and seepage; silts up; may need a permit.",
      "Dam water may carry silt and breed mosquitoes/bilharzia snails; borehole water is generally safer.",
      "Judgement: choice depends on cost, site, groundwater yield and water quality, supported by testing.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "A borehole gives reliable, usually clean groundwater close to the field and loses little to evaporation, but it is expensive to drill and to pump, its yield is not known until it is drilled, and the water can be hard or salty. A small dam can store a large volume of summer floods and may supply the field by gravity, but it needs a good site and catchment, costs a lot to build, loses water by evaporation and seepage, silts up and may need a permit; the open water can also breed mosquitoes and bilharzia snails. For 1 ha the borehole is attractive if a test shows good yield and quality; the dam is better where the site is good and groundwater is poor. The decision should follow a hydrological survey and water tests.",
    explanation: "Compare both sources on several criteria and reach a conditional judgement.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: `Tatenda tested water from two sources before buying a drip system for his vegetables near Gokwe.\n\n${table(["Source", "Appearance after standing for a day", "Residue left when 200 mL was evaporated (g)"], [["Dam", "Thick layer of silt at the bottom", "0.08"], ["Borehole", "Clear, no sediment", "0.3"]])}`,
    hints: ["Convert 200 mL to litres.", "Think about what silt and salts each do."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the dissolved solids in the borehole water, in g/L.",
        value: 0.3 / 0.2, tol: 0.05, answer: "1.5", wrong: [0.3 * 0.2, 0.3 / 200],
        explanation: "200 mL = 0.2 L; 0.3 ÷ 0.2 = 1.5 g/L.",
      }),
      P.mcq({
        label: "(b)", stem: "Which problem is the dam water most likely to cause in the drip system if it is not treated?",
        options: [
          ["Blocked emitters", "Correct: silt clogs the narrow emitter openings."],
          ["Salt crusts on the soil surface", "The dam water has very little dissolved salt."],
          ["Leaf scorch from wet leaves", "Drip does not wet the leaves."],
          ["Burst pipes from high pressure", "Silt does not raise the pressure."],
        ],
        answer: "A",
        explanation: "Suspended silt blocks emitters; it must be settled and filtered.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain how using water with a high salt content could reduce the yield of his vegetables over several seasons.",
        points: ["Salts build up in the soil as the water evaporates (salinisation).", "Roots find it harder to take up water (and some salts are toxic / scorch leaves), so plants are stressed and yields fall."],
        explanation: "Salinisation and water uptake.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest how Tatenda could make the dam water suitable for his drip system.",
        points: ["Let it stand in a settling tank so the silt sinks.", "Pass it through a screen, disc or sand filter before it enters the drip lines."],
        explanation: "Settle and filter.",
      }),
    ],
    explanation: "Judge each source by its silt and salt content, then treat or choose accordingly.",
  });

  b.card("DEFINITION", "Irrigation", "Artificial application of water to crops when rainfall is not enough.");
  b.card("CONCEPT", "Why irrigate in Zimbabwe?", "Seasonal (Nov-Mar) and unreliable rain, dry spells, winter crops (wheat), more crops per year, higher yields and quality.");
  b.card("FACT", "Sources of irrigation water", "Rivers, dams, boreholes, wells, springs, stored rainwater, treated waste water.");
  b.card("CONCEPT", "Borehole vs dam", "Borehole: reliable, clean, costly to drill and pump. Dam: stores floods, evaporation and silting losses.");
  b.card("FACT", "Water quality factors for irrigation", "Salts, sodium, silt, pH, pollution (pathogens, metals, chemicals), toxic elements such as boron.");
  b.card("CONCEPT", "Testing irrigation water", "EC meter or evaporation for salts; settling for silt; pH meter; laboratory for sodium, toxins and bacteria.");
  b.card("FORMULA", "Water volume from depth", "1 mm of water over 1 m² = 1 L; litres = area (m²) × depth (mm).");
  b.card("DEFINITION", "Salinisation", "Build-up of salts in soil when irrigation water evaporates without enough leaching and drainage.");
  b.card("FACT", "Risks of irrigation", "Waterlogging, salinisation, high costs, and canals breeding mosquitoes and bilharzia snails.");
});
