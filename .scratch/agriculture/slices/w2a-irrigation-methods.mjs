// Slice W2a: irrigation methods and choosing a system.
import { concept, P, waterVolume, field, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: 30 mm over 0.3 ha.
const v1 = waterVolume({ areaM2: 3000, depthMm: 30 });
check(v1.litres === 90000, "v1");
// Calc: sprinkler at 75% efficiency, 20 mm net on 1,500 m².
const net2 = waterVolume({ areaM2: 1500, depthMm: 20 }).litres;
const gross2 = net2 / 0.75;
check(net2 === 30000 && Math.abs(gross2 - 40000) < 1e-9, "gross2");
// Num: cans for a nursery bed.
const bed3 = field(6, 1.5);
const l3 = waterVolume({ areaM2: bed3.m2, depthMm: 8 }).litres;
const cans3 = Math.ceil(l3 / 15 - 1e-9);
check(Math.abs(l3 - 72) < 1e-9 && cans3 === 5, "cans");
// Num: hours to pump.
const hours4 = v1.litres / 12000;
check(hours4 === 7.5, "hours");

// Structured: method trial for tomatoes, 1,000 m² each.
const TR = [["Furrow", 520, 4160], ["Sprinkler", 400, 4400], ["Drip", 320, 4800]];
const TR_TABLE = table(["Method", "Water supplied (m³)", "Marketable yield (kg)"], TR.map(([m, w, y]) => [m, w, y.toLocaleString("en-GB")]));
const wue = TR.map(([, w, y]) => y / w);
check(wue[0] === 8 && wue[1] === 11 && wue[2] === 15, "wue");
const depthFurrow = (TR[0][1] * 1000) / 1000; // litres ÷ m² = mm
check(depthFurrow === 520, "depth");

concept("agri.water.irrigation-methods", { file: "water/irrigation-methods", keyPrefix: "water.irrigation-methods" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which irrigation method does water run along channels between ridges on which the crop grows?",
    options: [
      ["Furrow irrigation", "Correct."],
      ["Basin irrigation", "Basins are level plots surrounded by bunds."],
      ["Drip irrigation", "Drip delivers water through emitters at each plant."],
      ["Centre pivot irrigation", "A pivot sprays water from a rotating pipe."],
    ],
    answer: "A",
    explanation: "Furrow irrigation suits row crops such as maize, sugar cane and vegetables.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is drip irrigation the most water-efficient method?",
    options: [
      ["Water goes only to the root zone, so little is lost", "Correct."],
      ["It uses water at very high pressure, which forces it deep into the soil", "Drip works at low pressure."],
      ["It wets the leaves so that they absorb water", "Drip keeps leaves dry; leaves do not absorb much water."],
      ["It floods the whole field at once", "That is flood irrigation, which wastes water."],
    ],
    answer: "A",
    explanation: "Delivering water slowly to each plant's roots avoids wetting the whole surface, cutting evaporation, runoff and deep drainage.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a disadvantage of sprinkler irrigation?",
    options: [
      ["Wind blows the spray, giving uneven watering", "Correct."],
      ["It can only be used on perfectly level land with clay soil", "Sprinklers suit uneven land."],
      ["It cannot be used on sandy soils", "Sprinklers suit sandy soils well."],
      ["It needs no pump or pressure at all, so it cannot be controlled", "Sprinklers need pressure."],
    ],
    answer: "A",
    explanation: "Wind distorts the spray pattern; evaporation and wet leaves are other drawbacks.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which method is most suitable for watering seedlings in a small nursery?",
    options: [
      ["A watering can with a fine rose", "Correct: gentle, precise and cheap for small areas."],
      ["A centre pivot turning over the nursery", "Far too large and costly."],
      ["Flood irrigation of the whole nursery", "Flooding would wash out seedlings."],
      ["Furrow irrigation from a canal", "Unsuited to nursery beds and pots."],
    ],
    answer: "A",
    explanation: "Hand watering with a fine rose does not damage seedlings or wash soil away.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer with a sandy soil on uneven land wants to irrigate wheat. Which system is most suitable?",
    options: [
      ["Sprinkler irrigation", "Correct: suits sandy soil and uneven land, and close-spaced wheat."],
      ["Furrow irrigation", "Water would drain away quickly in sandy soil, and slopes cause erosion."],
      ["Basin irrigation", "Basins need level land."],
      ["Drip lines along every wheat row", "Wheat rows are too close together for drip to be economic."],
    ],
    answer: "A",
    hints: ["Which method copes with slopes and soils that drain fast?"],
    explanation: "Surface methods lose water in sandy soils and need level land; sprinklers wet the surface evenly.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tomatoes under overhead sprinklers watered every evening develop more leaf diseases than tomatoes under drip. Why?",
    options: [
      ["The leaves stay wet overnight, which favours fungal diseases", "Correct."],
      ["Drip water contains a fungicide", "Drip water does not contain fungicide unless added."],
      ["Sprinklers supply too little water for the plants to fight off the fungi", "Water quantity is not the cause."],
      ["Sprinkler water is always polluted", "Pollution is not the reason."],
    ],
    hints: ["Fungal spores germinate on wet surfaces."],
    answer: "A",
    explanation: "Wet leaves for long periods let fungal spores germinate and infect; drip keeps foliage dry.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How is water usually moved from a supply canal into individual furrows?",
    options: [
      ["By siphons or gated pipes", "Correct."],
      ["By drip emitters fixed along each ridge", "Emitters are part of drip systems."],
      ["By sprinkler risers set in the canal bank", "Risers carry sprinklers."],
      ["By a centre pivot tower", "Pivot towers carry a spray pipe."],
    ],
    hints: ["Think of curved tubes or pipes with small gates."],
    answer: "A",
    explanation: "Siphon tubes or gated pipes let a controlled flow into each furrow.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A grower's drip system is giving uneven watering; some plants wilt while others are wet. The water comes from a muddy dam. What is the most likely cause and remedy?",
    options: [
      ["Blocked emitters; settle and filter the water and flush the lines", "Correct: silt clogs emitters."],
      ["Too much pressure in the lines; remove the filter so the water flows more freely", "Removing the filter would make blocking worse."],
      ["Too few plants; plant more", "Plant number does not cause uneven delivery."],
      ["Leaves absorbing water; spray the leaves", "Drip does not depend on leaves."],
    ],
    hints: ["What does mud do to very small openings?"],
    answer: "A",
    explanation: "Silt and algae block emitters; filters, settling and regular flushing prevent it.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Surface irrigation methods need level or gently sloping land.",
    answer: true,
    explanation: "True. Water flows over the surface by gravity, so slopes must be gentle and even.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Drip irrigation is cheap to buy but uses a lot of labour.",
    answer: false,
    explanation: "False. Drip is costly to buy but saves labour and water.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each irrigation method with a crop situation it suits.",
    pairs: [
      ["Basin", "Fruit trees on flat land"],
      ["Furrow", "Sugar cane on a level clay loam"],
      ["Centre pivot", "Large circular field of wheat"],
      ["Drip", "High-value tomatoes with a small water supply"],
      ["Hand watering", "Seedlings in a nursery"],
    ],
    explanation: "Each method suits particular crops, land and water supplies.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Applying 1 mm of water over 1 m² requires {{blank:a}} litre(s) of water, so 1 mm over 1 ha requires {{blank:b}} litres.",
    blanks: [
      { id: "a", accepted: ["1", "one"] },
      { id: "b", accepted: ["10000", "10,000", "10 000"] },
    ],
    explanation: "1 mm × 1 m² = 1 L; 1 ha = 10,000 m², so 10,000 L.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "How many litres of water are needed to apply 30 mm of water to 0.3 ha?",
    value: v1.litres, unit: "L", tol: 0, wrong: [0.3 * 30, 3000 * 30 / 1000],
    explanation: `0.3 ha = 3,000 m²; 3,000 × 30 = ${v1.litres.toLocaleString("en-GB")} L.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A crop on 1,500 m² needs 20 mm of water stored in the root zone. Assume the sprinkler system is 75% efficient. Calculate the volume of water that must be pumped, in litres.",
    value: gross2, unit: "L", tol: 0, wrong: [net2 * 0.75, net2],
    hints: ["Find the water the crop needs, then divide by the efficiency as a decimal."],
    explanation: `Net = 1,500 × 20 = ${net2.toLocaleString("en-GB")} L; gross = ${net2.toLocaleString("en-GB")} ÷ 0.75 = ${gross2.toLocaleString("en-GB")} L. Multiplying by 0.75 (${(net2 * 0.75).toLocaleString("en-GB")} L) would give less water than the crop needs.`,
    workedSolution: `1. Water needed in the root zone = 1,500 × 20 = ${net2.toLocaleString("en-GB")} L.\n2. Only 75% of the pumped water reaches the root zone.\n3. Water to pump = ${net2.toLocaleString("en-GB")} ÷ 0.75 = ${gross2.toLocaleString("en-GB")} L.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A nursery bed measures 6 m by 1.5 m. It is to receive 8 mm of water from a 15 L watering can. How many full cans are needed? Round UP to whole cans.",
    value: cans3, tol: 0, wrong: [Math.floor(l3 / 15), l3],
    explanation: `Area = 6 × 1.5 = ${bed3.m2} m²; water = ${bed3.m2} × 8 = ${l3} L; ${l3} ÷ 15 = ${round(l3 / 15, 1)}, so ${cans3} cans.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A pump delivers 12,000 L per hour. How many hours will it take to apply 30 mm of water to 0.3 ha, ignoring losses?",
    value: hours4, unit: "h", tol: 0.05, wrong: [12000 / 90000, 90],
    hints: ["First find the litres needed."],
    explanation: `Water = 3,000 m² × 30 mm = 90,000 L; 90,000 ÷ 12,000 = ${hours4} h.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the overhead system in which a long pipe on wheeled towers rotates around a fixed point.",
    accepted: ["centre pivot", "center pivot", "centre-pivot", "pivot", "centre pivot irrigation"],
    explanation: "**Centre pivot**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages of furrow irrigation compared with sprinkler irrigation.",
    hints: ["Think of cost, energy and the crop's leaves."],
    points: [
      "Cheaper to install and run / needs little equipment.",
      "Water may flow by gravity, so little or no pumping energy is needed.",
      "Leaves stay dry, so fewer leaf diseases (and sprays are not washed off).",
      "Not affected by wind (no drift or uneven spray).",
    ],
    modelAnswer: "Furrow irrigation is cheaper to set up and run, because water can flow from a canal by gravity with little equipment and no pumping. It also keeps the leaves dry, so leaf diseases are less common than under sprinklers, and it is not upset by wind.",
    explanation: "Two advantages, each with a reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A trial near Mutare grew tomatoes on three 1,000 m² plots, each irrigated by a different method, for one season.\n\n${TR_TABLE}`,
    hints: ["Water productivity = yield ÷ water supplied.", "1 m³ over 1,000 m² is 1 mm."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the yield per cubic metre of water supplied for the drip plot, in kg/m³.",
        value: wue[2], tol: 0, wrong: [round(TR[2][1] / TR[2][2], 3), TR[2][2] - TR[2][1]],
        explanation: `${TR[2][2].toLocaleString("en-GB")} ÷ ${TR[2][1]} = ${wue[2]} kg/m³.`,
      }),
      P.num({
        label: "(b)", stem: "The furrow plot received 520 m³ over 1,000 m². Calculate the depth of water applied, in mm.",
        value: depthFurrow, unit: "mm", tol: 0, wrong: [0.52, 5.2],
        explanation: "520 m³ = 520,000 L; 520,000 ÷ 1,000 m² = 520 mm.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the drip plot used the least water.",
        points: ["Water was delivered only to the root zone of each plant.", "So less was lost by evaporation from the surface, runoff and deep drainage."],
        explanation: "Targeted application.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** reasons why the drip plot also gave the highest marketable yield.",
        points: ["Even, regular moisture reduced stress, cracking and blossom-end rot.", "Dry leaves meant fewer fungal leaf diseases.", "Fertigation fed the roots directly / clean fruit with no soil splash / fewer weeds between rows."],
        explanation: "Even water, healthy leaves and targeted nutrients.",
      }),
    ],
    explanation: "Drip gives the most produce per cubic metre because it wets only the root zone and keeps the crop healthy.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A cooperative near Masvingo plans to irrigate 4 ha of vegetables from a small dam on gently sloping land with sandy loam soil. Discuss whether furrow or drip irrigation would be the better choice.",
    hints: ["Use the soil, slope, water supply, crop and cost.", "Reach a judgement with conditions."],
    points: [
      "Furrow: cheap to install and run, gravity flow from the dam, simple to maintain.",
      "Furrow: sandy loam loses water by deep drainage; needs levelling; lower efficiency (about 50-70%); more labour.",
      "Drip: high efficiency (about 90%) stretches the limited dam water; suits slopes; dry leaves, fewer diseases; fertigation.",
      "Drip: high capital cost; needs filters because dam water carries silt; skills and maintenance.",
      "Vegetables are high-value, which helps repay drip's cost.",
      "Judgement: drip is better if the cooperative can afford it and maintain filters; otherwise furrow with good levelling and careful water management.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Furrow irrigation would be cheaper: water could run from the dam by gravity, the equipment is simple and members already understand it. But sandy loam drains quickly, so much furrow water would be lost below the roots, the land would need levelling, efficiency is low and managing the flow takes much labour. Drip would make the dam water go much further, because only the root zone is wetted; it works on gentle slopes, keeps leaves dry and allows fertigation, giving even, high-quality vegetables. Its drawbacks are the high capital cost and the need to filter silty dam water and maintain the lines. Because vegetables are high-value and the water is limited, drip is the better long-term choice if the cooperative can raise the money and train members; otherwise furrows on well-levelled land are a workable start.",
    explanation: "Weigh both systems against the given conditions and conclude.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, calculator: true,
    stem: "A commercial farm near Chinhoyi grows wheat in winter on a 40 ha circular field. A long pipe carried on wheeled towers turns slowly around a fixed point in the centre of the field, spraying water from nozzles along its length.",
    hints: ["1 mm over 1 m² = 1 L; 1 m³ = 1,000 L.", "Think about wind and sun."],
    parts: [
      P.short({
        label: "(a)", stem: "Name this irrigation system.",
        accepted: ["centre pivot", "center pivot", "centre-pivot", "pivot", "centre pivot irrigation"],
        keywords: { any: ["pivot"] },
        explanation: "A centre pivot.",
      }),
      P.num({
        label: "(b)", stem: "Calculate the volume of water, in m³, needed to apply 15 mm over the 40 ha.",
        value: waterVolume({ areaM2: 400000, depthMm: 15 }).m3, unit: "m³", tol: 0, wrong: [40 * 15, waterVolume({ areaM2: 400000, depthMm: 15 }).litres],
        explanation: "40 ha = 400,000 m²; 400,000 × 15 = 6,000,000 L = 6,000 m³.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State **two** advantages of this system for a large wheat farm.",
        points: ["Needs little labour once running / can be automated.", "Even application over a large area / suits uneven land and sandy soils / little land lost to canals."],
        explanation: "Advantages of centre pivots.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why running the system at midday on a windy day wastes water.",
        points: ["Hot sun and dry air increase evaporation from the spray and wet surfaces.", "Wind blows the spray off target, giving uneven watering and drift losses."],
        explanation: "Evaporation and wind drift.",
      }),
    ],
    explanation: "Identify the system, calculate water volume and explain its strengths and losses.",
  });

  b.card("DEFINITION", "Surface irrigation", "Water flows over the soil by gravity: flood, basin, border and furrow.");
  b.card("DEFINITION", "Drip (trickle) irrigation", "Water delivered slowly through emitters to each plant's root zone; about 90% efficient.");
  b.card("CONCEPT", "Sprinklers: pros and cons", "Suit sandy soils and uneven land, even watering; but costly, affected by wind, wet leaves favour disease.");
  b.card("CONCEPT", "Drip: pros and cons", "Saves water and labour, dry leaves, fertigation, slopes; but costly, emitters block, need filters.");
  b.card("CONCEPT", "Furrow: pros and cons", "Cheap, gravity-fed, dry leaves; but needs level land, wastes water on sandy soils, more labour.");
  b.card("FORMULA", "Water for irrigation", "Litres = area (m²) × depth (mm). Water to supply = water needed ÷ efficiency (as a decimal).");
  b.card("FACT", "Typical efficiencies (approximate)", "Surface about 50-70%; sprinkler about 70-80%; drip about 90%.");
  b.card("CONCEPT", "Factors in choosing a system", "Water supply and quality, soil, slope, crop, cost and energy, labour and skills, wind and climate.");
  b.card("FACT", "How is water fed into furrows?", "By siphons from a canal or by gated pipes.");
});
