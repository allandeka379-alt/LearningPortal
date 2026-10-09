// Slice W1b: water conservation and rainwater harvesting (ZIMSEC only).
import { concept, P, field, waterVolume, round, check, table, agricultureLevels } from "../lib.mjs";

const harvest = (m2, mm, c) => waterVolume({ areaM2: m2, depthMm: mm }).litres * c;

// Daily: roof 8 m × 5 m, 25 mm, coefficient 0.9.
const dRoof = field(8, 5);
const dL = harvest(dRoof.m2, 25, 0.9);
check(Math.abs(dL - 900) < 1e-9, "daily roof");

// Calc: roof 12 m × 7 m, 90 mm, 0.8; how many 2,500 L tanks?
const cRoof = field(12, 7);
const cL = harvest(cRoof.m2, 90, 0.8);
check(Math.abs(cL - 6048) < 1e-9, "calc roof");
const cTanks = Math.ceil(cL / 2500 - 1e-9);
check(cTanks === 3, "tanks");

// Structured: monthly rainfall on a 50 m² roof, coefficient 0.85; garden needs 1,800 L per month in dry season.
const MONTHS = [["November", 80], ["December", 150], ["January", 180], ["February", 140], ["March", 60]];
const roofS = 50, coefS = 0.85;
const coll = MONTHS.map(([m, mm]) => [m, mm, harvest(roofS, mm, coefS)]);
const totalS = coll.reduce((s, r) => s + r[2], 0);
check(Math.abs(totalS - 25925) < 1e-6, "season total");
const R_TABLE = table(["Month", "Rainfall (mm)"], MONTHS);
const monthsSupply = Math.floor(totalS / 1800 + 1e-9);
check(monthsSupply === 14, "months");
const janL = coll[2][2];
check(Math.abs(janL - 7650) < 1e-9, "jan");

concept("agri.water.conservation-harvesting", { file: "water/conservation-harvesting", keyPrefix: "water.conservation-harvesting" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Ridges along the contour joined at intervals by small cross-ridges to form basins are called",
    options: [
      ["tied ridges", "Correct: the ties form basins that hold rain in the field."],
      ["storm drains", "Storm drains divert runoff away from fields."],
      ["grass waterways", "Waterways carry water downslope safely."],
      ["gabions", "Gabions are stone-filled wire baskets."],
    ],
    answer: "A",
    explanation: "Tied ridges trap rainwater where it falls so that it infiltrates.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does early weeding help to conserve soil water?",
    options: [
      ["Weeds take up and transpire soil water that the crop needs", "Correct: removing them leaves more water for the crop."],
      ["Weeds add water to the soil through their roots", "Weeds remove water; they do not add it."],
      ["Weeding compacts the soil surface so that water cannot escape from it", "Weeding does not seal the soil against evaporation."],
      ["Weeds shade the soil too much", "Shading would reduce evaporation; the problem is their water use."],
    ],
    answer: "A",
    explanation: "Weeds compete with the crop for water as well as nutrients and light; early weeding conserves water.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a **weir**?",
    options: [
      ["A low wall built across a river to raise the water level and hold water", "Correct: water ponds behind it and flows over the top."],
      ["A deep, narrow hole drilled by machine into an aquifer and fitted with a pump", "That is a borehole."],
      ["A tank fed by gutters from a roof", "That is a roof-water tank."],
      ["A channel that carries runoff away from a field", "That is a storm drain or waterway."],
    ],
    answer: "A",
    explanation: "A weir is a low barrier across a river that holds back water for pumping or livestock.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a first-flush diverter fitted to a roof-water harvesting system?",
    options: [
      ["To discard the first, dirty water that washes dust and droppings off the roof", "Correct: the cleaner water that follows goes into the tank."],
      ["To increase the volume of water collected", "It slightly reduces the volume collected."],
      ["To stop the tank overflowing and wasting water during the very heaviest storms", "An overflow pipe does that."],
      ["To add chlorine to the water", "A diverter does not treat water chemically."],
    ],
    answer: "A",
    explanation: "The first rain of each storm carries dirt from the roof; diverting it keeps the stored water cleaner.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which store of water loses the least water by evaporation for the same volume stored?",
    options: [
      ["A deep, covered tank", "Correct: a cover and small surface area cut evaporation."],
      ["A wide, shallow pond", "A large surface area exposed to sun and wind loses most."],
      ["A shallow pan in a sandy area", "Shallow open water evaporates fast and seeps away."],
      ["An open furrow leading to a garden", "Open channels lose water by evaporation and seepage."],
    ],
    answer: "A",
    hints: ["Evaporation happens from the exposed water surface."],
    explanation: "Evaporation depends on the area of water exposed to sun and wind; deep, narrow or covered stores lose least.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer in natural region IV wants to keep more of the rain in his maize field on a gentle slope. Which method is most suitable?",
    options: [
      ["Tied ridges with a mulch between them", "Correct: basins hold rain in the field and mulch reduces evaporation."],
      ["Ploughing up and down the slope", "This channels runoff out of the field."],
      ["Burning the crop residues before planting", "Burning leaves the soil bare, so more water runs off and evaporates."],
      ["Leaving weeds to grow between the rows", "Weeds use soil water."],
    ],
    answer: "A",
    hints: ["The aim is to stop runoff and reduce evaporation."],
    explanation: "Tied ridges trap rain so it infiltrates; mulch reduces evaporation and runoff.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A small earth dam on a communal farm loses much of its capacity within a few years. Which is the most likely cause, and its remedy?",
    options: [
      ["Siltation from an eroded catchment; protect the catchment with grass cover and conservation works", "Correct: eroded soil settles in the dam."],
      ["Evaporation from the water surface; plant tall trees around the dam to shade it", "Evaporation lowers the water level but does not reduce the volume the dam can hold."],
      ["Too much rain; build the wall lower", "Rain fills the dam; it does not reduce capacity."],
      ["Livestock drinking from the dam every day; fence off the dam and build troughs", "Drinking uses water but does not reduce the storage volume."],
    ],
    answer: "A",
    hints: ["Capacity is the volume the dam can hold. What fills it up permanently?"],
    explanation: "Silt from eroded land settles behind the wall, reducing capacity. The remedy is to control erosion in the catchment.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mulching reduces the loss of soil water by evaporation.",
    answer: true,
    explanation: "True. Mulch shades the soil, keeps it cool and slows the movement of moist air away from the surface.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Watering a garden in the middle of a hot day is the best way to conserve water.",
    answer: false,
    explanation: "False. Much of the water evaporates in the midday heat. Watering early in the morning or late in the afternoon wastes less.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each water source or store with its description.",
    pairs: [
      ["Borehole", "Narrow hole drilled by machine into an aquifer and cased"],
      ["Spring", "Groundwater flowing naturally out of the ground"],
      ["Small earth dam", "Earth wall across a valley storing runoff"],
      ["Rock catchment", "Low walls on a bare rock outcrop leading runoff to a tank"],
    ],
    explanation: "Groundwater sources (boreholes, springs) and surface-water stores (dams, rock catchments) differ in how water is collected.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Pits dug at intervals in the channel of a contour ridge so that runoff soaks into the soil are called {{blank:a}} pits. The fraction of rain on a roof that reaches the tank is called the runoff {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["infiltration"] },
      { id: "b", accepted: ["coefficient"] },
    ],
    explanation: "Infiltration pits hold runoff; the runoff coefficient allows for losses.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A storeroom roof measures 8 m × 5 m. A storm gives 25 mm of rain. Assume a runoff coefficient of 0.9. How many litres of water are collected?",
    value: dL, unit: "L", wrong: [dRoof.m2 * 25, round(dRoof.m2 * 25 / 0.9, 1)],
    explanation: `Area = 8 × 5 = ${dRoof.m2} m². Rain on roof = ${dRoof.m2} × 25 = ${dRoof.m2 * 25} L. Collected = ${dRoof.m2 * 25} × 0.9 = ${dL} L. Forgetting the coefficient gives ${dRoof.m2 * 25} L.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A farmhouse roof measures 12 m × 7 m. In one month 90 mm of rain falls. Assume a runoff coefficient of 0.8. The farmer stores the water in tanks that each hold 2,500 L. How many tanks are needed to store the whole month's collection? Round UP to whole tanks.",
    value: cTanks, unit: undefined, tol: 0, wrong: [Math.floor(cL / 2500), Math.ceil(cRoof.m2 * 90 / 2500)],
    hints: ["Find the litres collected first.", "Divide by the tank size and round up: a part-full tank still has to be bought."],
    explanation: `Roof area = 12 × 7 = ${cRoof.m2} m². Collected = ${cRoof.m2} × 90 × 0.8 = ${cL.toLocaleString("en-GB")} L. Tanks = ${cL.toLocaleString("en-GB")} ÷ 2,500 = ${round(cL / 2500, 2)}, so ${cTanks} tanks. Rounding down to ${Math.floor(cL / 2500)} would leave water with nowhere to go.`,
    workedSolution: `1. Roof area = 12 × 7 = ${cRoof.m2} m².\n2. Water collected = ${cRoof.m2} × 90 × 0.8 = ${cL.toLocaleString("en-GB")} L.\n3. Tanks = ${cL.toLocaleString("en-GB")} ÷ 2,500 = ${round(cL / 2500, 2)}.\n4. Round up: ${cTanks} tanks.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the device that leads water from the edge of a roof into a downpipe.",
    accepted: ["gutter", "gutters", "guttering", "roof gutter"],
    explanation: "**Gutters** collect water along the roof edge.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why water conservation is important for farmers in Zimbabwe.",
    hints: ["Think about the rainfall pattern and the demand for water."],
    points: [
      "Rainfall is seasonal / unreliable / low in many regions, with dry spells and droughts.",
      "So conserved or stored water carries crops through dry spells / allows dry-season production.",
      "Demand for water from crops, livestock and people is high and growing / groundwater is being over-used.",
      "So careful use prevents shortages and falling water tables (or: reducing runoff also reduces soil erosion).",
    ],
    modelAnswer: "Rain falls only in a few months and is unreliable, with dry spells, so water kept in the soil or stored in tanks and dams lets crops survive dry spells and allows gardens in the dry season. Demand for water is high, and over-use of groundwater lowers the water table, so careful use prevents wells and boreholes drying up.",
    explanation: "Give a reason and explain its consequence for each mark pair.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A rural day school near Gokwe plans to harvest water from a classroom roof of ${roofS} m². Assume a runoff coefficient of ${coefS}. The rainfall in a typical season is shown below.\n\n${R_TABLE}`,
    hints: ["Litres = roof area × rainfall × coefficient.", "Add the five months for the season total."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the water collected in January, in litres.",
        value: janL, unit: "L", wrong: [roofS * MONTHS[2][1]],
        explanation: `${roofS} × ${MONTHS[2][1]} × ${coefS} = ${janL.toLocaleString("en-GB")} L.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the total water collected over the five months, in litres.",
        value: totalS, unit: "L", wrong: [roofS * 610],
        explanation: `Total rainfall = 80 + 150 + 180 + 140 + 60 = 610 mm; ${roofS} × 610 × ${coefS} = ${totalS.toLocaleString("en-GB")} L.`,
      }),
      P.num({
        label: "(c)", stem: "The school garden needs 1,800 L per month in the dry season. For how many **whole** months could the season's harvest supply the garden, if it could all be stored?",
        value: monthsSupply, tol: 0, wrong: [round(totalS / 1800, 1)],
        explanation: `${totalS.toLocaleString("en-GB")} ÷ 1,800 = ${round(totalS / 1800, 2)}, so ${monthsSupply} whole months.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **two** reasons why the school will collect less than the calculated amount.",
        points: ["Tanks fill up and overflow in the wettest months (storage too small).", "Losses: leaking gutters, first-flush diversion, splashing, evaporation, or rainfall lower than typical."],
        explanation: "Real systems lose water and are limited by storage.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Describe **three** ways the school should look after the tank so the water stays clean.",
        points: ["Cover the tank / screen the inlet to keep out light, dirt and mosquitoes.", "Use a first-flush diverter and keep gutters clean.", "Fit the tap above the floor of the tank / clean out sediment regularly."],
        explanation: "Clean catchment, covered storage and good outlets keep water safe.",
      }),
    ],
    explanation: "Roof harvest = area × rainfall × coefficient; storage size and losses limit what is actually available.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "Chipo farms on sandy soil near Masvingo. The rainy season is short and dry spells of two to three weeks are common. Her maize often wilts in January, although heavy storms cause water to run off her field.",
    hints: ["She needs to keep storm water in the field and reduce losses from the soil."],
    parts: [
      P.short({
        label: "(a)", stem: "Name **one** crop more tolerant of dry spells that Chipo could grow instead of some of her maize.",
        accepted: ["sorghum", "pearl millet", "finger millet", "millet", "rapoko", "mhunga", "mapfunde", "cowpeas", "cowpea"],
        explanation: "Sorghum and millets tolerate dry spells better than maize.",
      }),
      P.manual({
        label: "(b)", marks: 5, stem: "Describe **five** methods Chipo could use to conserve water in her field, saying how each one helps.",
        points: [
          "Tied ridges / potholes: hold storm water in the field so it infiltrates.",
          "Mulching: reduces evaporation and runoff.",
          "Adding manure or compost: increases the water-holding capacity of the sandy soil.",
          "Early weeding: removes weeds that compete for soil water.",
          "Infiltration pits / contour cultivation / planting basins: slow runoff and let water soak in.",
        ],
        explanation: "Each method should be named and linked to how it saves water.",
      }),
    ],
    explanation: "Combine methods that trap water with methods that reduce losses.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A community in a dry area is choosing between building a small earth dam and fitting rainwater tanks to every household roof. Discuss the advantages and disadvantages of each option.",
    hints: ["Consider volume, cost, water quality, losses and who benefits.", "End with a justified recommendation."],
    points: [
      "Dam: stores large volumes, enough for livestock and some irrigation.",
      "Dam: loses much water to evaporation and silts up; needs a protected catchment, a spillway and maintenance; water may be polluted by animals.",
      "Tanks: give clean water close to each home for drinking and small gardens.",
      "Tanks: small volumes, limited by roof size; cost per litre stored can be high; not enough for livestock or field irrigation.",
      "Both depend on rainfall; a dam benefits the whole community, tanks benefit each household.",
      "Judgement with reason, e.g. tanks for domestic water plus a dam for livestock, or a choice justified by the main need.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "A small earth dam can store a large volume of runoff from the whole catchment, enough to water livestock and irrigate a community garden through the dry season. However, it loses a lot of water by evaporation, silts up if the catchment is eroded, needs a well-built spillway and regular maintenance, and its water is easily polluted by animals. Roof tanks give clean water close to each home with little evaporation, and each family controls its own supply, but the volume is limited by roof size and tank cost, and it is not enough for cattle or field crops. The best choice depends on the main need: for drinking water, tanks are better; for livestock, a dam is needed. Ideally the community would fit tanks for domestic use and build a dam with a protected catchment for livestock.",
    explanation: "Weigh volume, quality, losses and cost, then recommend.",
  });

  b.card("DEFINITION", "Water conservation", "Using water carefully and reducing losses by runoff, evaporation, seepage and waste.");
  b.card("DEFINITION", "Rainwater harvesting", "Collecting and storing rain running off roofs, rocks, roads or land, or trapping it where it falls.");
  b.card("FORMULA", "Water harvested from a roof", "Litres = roof area (m²) × rainfall (mm) × runoff coefficient.");
  b.card("DEFINITION", "Tied ridges", "Contour ridges joined by cross-ties to form basins that hold rain in the field.");
  b.card("CONCEPT", "Field methods of conserving water", "Mulch, tied ridges, potholes, infiltration pits, contour cultivation, weed control, organic matter, windbreaks.");
  b.card("DEFINITION", "Weir", "A low wall across a river that raises the water level and holds water behind it.");
  b.card("CONCEPT", "Reducing evaporation from stored water", "Use deep, narrow or covered stores; open, shallow ponds lose most.");
  b.card("FACT", "Ground-water sources", "Springs, wells and boreholes.");
  b.card("CONCEPT", "First-flush diverter", "Discards the first dirty water of each storm so cleaner water enters the tank.");
});
