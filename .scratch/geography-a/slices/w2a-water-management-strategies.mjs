// W2a: water.management-strategies (Cambridge only, AS). Numbers computed: tiered bills, scheme costs and energy,
// irrigation and roof-harvesting volumes (see tables/w2a-water-management-strategies.mjs).
import { concept, P, geographyLevels, chk, rnd, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w2a-_q.mjs";

// Struct 1: tiered tariff (illustrative)
const BLOCKS = [[0, 6, 0.5], [6, 15, 1.2], [15, Infinity, 2.5]];
const bill = (m3) => BLOCKS.reduce((s, [lo, hi, p]) => s + Math.max(0, Math.min(m3, hi) - lo) * p, 0);
const bill10 = chk(bill(10), 7.8, 1e-9);
const bill22 = chk(bill(22), 31.3, 1e-9);
const avg22 = rnd(bill(22) / 22, 2, 1.42, "avg22");
const TARIFF = tbl(["Monthly use (m³)", "Price (US\\$ per m³)"], [["First 6", "0.50"], ["Next 9 (7 to 15)", "1.20"], ["Above 15", "2.50"]]);
// Struct 2: three schemes (illustrative)
const SC = [["Transfer by tunnel and pipeline", 300, 0.8, 1.2], ["Desalination plant", 100, 1.5, 3.5], ["Rainwater harvesting (all schools)", 4, 0.4, 0.0]];
const SCT = tbl(["Scheme", "Water supplied (million m³ per year)", "Cost (US\\$ per m³)", "Energy (kWh per m³)"], SC.map((r) => [r[0], r[1], r[2].toFixed(2), r[3].toFixed(1)]));
const costTransfer = chk(300 * 0.8, 240, 1e-9); // US\\$ million
const energyDesal = chk((100e6 * 3.5) / 1e6, 350, 1e-9); // GWh
// Singles
const sav1 = chk((8000 - 5000) * 50, 150000);
const roof = chk(80 * 0.5 * 0.9, 36, 1e-9);
const pct30 = chk(((8000 - 5600) / 8000) * 100, 30, 1e-9);

concept("ageo.water.management-strategies", { file: "water/management-strategies", keyPrefix: "water.management-strategies", applies: CAM }, (b) => {
  mc(b, 2, "RECALL", "Which strategy is an example of **demand management**?", [
    ["Charging households by the volume they use", "Correct: pricing and metering reduce waste."],
    ["Building a new dam and reservoir", "A dam is a supply-side measure."],
    ["Piping water from a distant river", "Transfers are supply-side measures."],
    ["Building a desalination plant", "Desalination increases supply."],
  ], "Pricing, rationing, efficient technology and education manage **demand**.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is a **multipurpose** water scheme?", [
    ["A dam that serves several uses, such as supply, power and irrigation", "Correct: costs and benefits are shared between uses."],
    ["A pipeline that carries water across several countries to one large city", "That is a transboundary transfer, not a multipurpose dam."],
    ["A borehole that has several pumps", "A multipurpose scheme serves several purposes, not several pumps."],
    ["A tank that stores rain from several roofs", "That is rainwater harvesting."],
  ], "Multipurpose schemes such as Kariba combine **power, supply, fishing and more**.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is **saltwater intrusion**?", [
    ["Sea water entering a coastal aquifer when it is over-pumped", "Correct: wells become salty."],
    ["Salt being added to a river by evaporation in a dam", "That is salinisation of surface water, a different process."],
    ["Desalination plants releasing salt into the ocean", "That is brine disposal."],
    ["Floodwater carrying salt onto a river floodplain after heavy rainfall", "Saltwater intrusion involves sea water entering groundwater."],
  ], "Heavy abstraction lets **sea water** replace fresh groundwater.");
  mc(b, 3, "APPLICATION", "What is the main disadvantage of desalination for a poor coastal country?", [
    ["High energy and capital costs", "Correct: it is expensive to build and run."],
    ["It depends on seasonal rainfall", "Desalination uses sea water, so it does not depend on rainfall."],
    ["The water produced is always unsafe to drink", "Properly run plants produce safe water."],
    ["The water can only be used in industry", "Desalinated water is used for drinking too."],
  ], "Desalination needs **a lot of energy and money**.", { hints: ["What does it take to remove salt from sea water?"] });
  mc(b, 3, "ANALYSIS", "A river rises in country X and flows through country Y. Country X builds a large dam. Which is the most likely issue?", [
    ["Reduced flow and conflict over sharing the water in country Y", "Correct: this is a transboundary problem."],
    ["A rise in the flow of the river in country Y in the dry season only", "Dams may steady flow, but reduced volume is a more likely source of dispute."],
    ["No effect on country Y, because rivers are not shared", "Shared rivers link the countries."],
    ["A fall in rainfall in country Y caused by the dam", "A dam does not cause a fall in rainfall."],
  ], "Upstream use can reduce supply downstream; agreements are needed.", { hints: ["Who needs the water downstream?"] });
  mc(b, 3, "ANALYSIS", "Why is rainwater harvesting alone not enough to supply a large city?", [
    ["The volume collected is small and available only in the rainy season", "Correct: roofs collect small volumes, and storage is needed."],
    ["Rainwater is always polluted", "Rainwater is often clean; it needs storage and care."],
    ["It needs far more energy and money to collect than desalination needs", "It uses very little energy."],
    ["It is illegal in most countries", "It is widely permitted and promoted."],
  ], "Harvesting suits small, local needs, not whole cities.", { hints: ["How much does a roof collect?"] });
  mc(b, 2, "RECALL", "Which can happen when too much groundwater is pumped from some aquifers?", [
    ["Ground subsidence", "Correct: the sediments compact and the ground sinks."],
    ["Faster river flow", "Over-pumping lowers the water table and may reduce river flow."],
    ["A rising water table", "Pumping lowers the water table."],
    ["Fewer saltwater problems at the coast", "Pumping near the coast increases the problem."],
  ], "Over-abstraction can lower land levels (**subsidence**).");

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Dams can reduce flood peaks and store water for the dry season, but they also flood land and may displace people.", answer: true,
    feedbackTrue: "Correct: both benefits and costs apply.", feedbackFalse: "Not so: dams have both advantages and disadvantages.",
    explanation: "Always give **both sides** when evaluating a dam." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Charging more per cubic metre for heavy water use is a way of reducing demand.", answer: true,
    feedbackTrue: "Correct: a higher price encourages saving.", feedbackFalse: "Not so: price signals reduce waste.",
    explanation: "Tiered tariffs are demand-side measures." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each strategy to its main disadvantage.",
    pairs: [
      ["Large dam", "Floods land and displaces people"],
      ["Desalination", "High energy use and brine disposal"],
      ["Water transfer", "High cost and effects on the donor area"],
      ["Rainwater harvesting", "Small volumes, only in the rainy season"],
      ["Rationing", "Unpopular and hard to enforce"],
    ], explanation: "Each strategy has a typical cost or limit." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Measures that increase the amount of water available are {{blank:a}}-side. Using treated bath and wash water again is {{blank:b}} reuse. A river that forms or crosses a border is a {{blank:c}} river.",
    blanks: [
      { id: "a", accepted: ["supply"], choices: ["supply", "demand", "price"] },
      { id: "b", accepted: ["grey-water"], choices: ["grey-water", "desalinated", "rainwater"] },
      { id: "c", accepted: ["transboundary"], choices: ["transboundary", "ephemeral", "braided"] },
    ], explanation: "Supply-side measures increase supply; grey water is reused; transboundary rivers cross borders." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the process in which sea water is made fresh by reverse osmosis or distillation.",
    accepted: ["desalination", "desalinisation", "desalinization"], explanation: "**Desalination** removes salt from sea or brackish water." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A farm of 50 ha changes from irrigation using 8 000 m³ per hectare per year to drip irrigation using 5 000 m³ per hectare per year. Calculate the total saving, in m³ per year.",
    hints: ["Saving per hectare × area."],
    value: sav1, wrong: [3000, 400000],
    explanation: "Saving per hectare = 8 000 − 5 000 = 3 000 m³. Total = 3 000 × 50 = **150 000 m³ per year**. The value 3 000 is the saving per hectare." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "A roof of 80 m² receives 500 mm of rain in a year, and 90% of it is collected. Calculate the volume collected, in m³ per year.",
    hints: ["Convert 500 mm to metres.", "Volume = area × depth × 0.90."],
    value: roof, wrong: [40, 36000],
    explanation: "80 × 0.5 × 0.90 = **36 m³ per year**. The value 40 forgets that 10% is lost; 36 000 is the volume in litres." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "Water use on a farm falls from 8 000 m³ per hectare to 5 600 m³ per hectare after leaks are repaired. Calculate the percentage saving.",
    hints: ["Saving ÷ original × 100."],
    value: pct30, wrong: [43, 2400],
    explanation: "1. Saving = 8 000 − 5 600 = 2 400 m³.\n2. 2 400 ÷ 8 000 × 100 = **30%**. The value 43 divides by the new use (2 400 ÷ 5 600)." });

  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Evaluate the use of dams to increase water supply.",
    hints: ["Give advantages, disadvantages and a judgement."],
    points: [
      "Dams store wet-season flow, giving a reliable supply, flood control and often hydropower and irrigation (multipurpose).",
      "They are very costly and flood land, displacing people and changing river ecosystems.",
      "Reservoirs lose water by evaporation and trap silt, reducing capacity and reducing sediment below the dam.",
      "Judgement: valuable for large, reliable supply, but costs fall on those displaced; planning and sharing of benefits are needed.",
    ],
    modelAnswer: "Dams store wet-season flow and give a reliable supply, flood control and often power and irrigation. They are costly, flood land and displace people, and reservoirs lose water by evaporation and trap silt. A dam is valuable for a large reliable supply, but the costs must be weighed and the benefits shared.",
    explanation: "Weigh benefits and costs, then judge." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how pricing and metering can reduce the demand for water.",
    hints: ["Think about how households respond to a bill."],
    points: [
      "A meter measures the volume used, so each household pays for what it uses.",
      "A rising price per unit (tiered tariff) makes heavy use expensive.",
      "People repair leaks, stop wasteful uses such as watering gardens in the heat, and buy efficient appliances.",
      "A low price for a basic block protects the poor, so access is not reduced.",
    ],
    modelAnswer: "A meter measures use so that households pay for what they use. A tiered tariff, with higher prices for heavy use, makes waste expensive, so people repair leaks, cut garden watering and buy efficient appliances. A low price for a basic block protects the poor.",
    explanation: "Price signals change behaviour." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why countries that share a river may come into conflict over its water.",
    hints: ["Think about upstream and downstream positions."],
    points: [
      "An upstream country that builds dams or abstracts for irrigation reduces the flow reaching downstream countries.",
      "Pollution upstream affects water quality downstream.",
      "Population growth increases demand, and there may be no agreement or unequal power over how much each may take.",
    ],
    modelAnswer: "An upstream country may build dams or abstract water, reducing the flow downstream. Pollution upstream spoils water quality downstream. Rising demand and the lack of a sharing agreement increase disputes.",
    explanation: "Quantity, quality and unequal power cause conflict." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe low-technology ways of improving water access in a village.",
    points: [
      "Protecting a spring or digging a hand-dug well fitted with a cover and a bucket or hand pump.",
      "Drilling a borehole with a hand pump, or building a small earth or sand dam to store water.",
      "Harvesting rainwater from roofs into tanks.",
    ],
    modelAnswer: "A village can protect a spring or dig a covered well, drill a borehole with a hand pump or build a small sand dam to store water. It can also harvest rain from roofs into tanks.",
    explanation: "Local, cheap and easily maintained methods." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `A city charges households for water with a tiered tariff, shown below (illustrative data, invented for this exercise).\n\n${TARIFF}`,
    hints: ["Charge each block separately and add the blocks."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the monthly bill for a household that uses 10 m³, in US\\$.", value: bill10, dp: 2, unit: "US$", wrong: [12, 5],
        explanation: "First 6 m³: 6 × 0.50 = 3.00. Next 4 m³: 4 × 1.20 = 4.80. Total = US\\$7.80." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the monthly bill for a household that uses 22 m³, in US\\$.", value: bill22, dp: 2, unit: "US$", wrong: [55, 26.4],
        explanation: "First 6 m³: 3.00. Next 9 m³: 9 × 1.20 = 10.80. Remaining 7 m³: 7 × 2.50 = 17.50. Total = 3.00 + 10.80 + 17.50 = US\\$31.30. The value 55 charges all 22 m³ at the top rate." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the average price per m³ paid by the household using 22 m³, in US\\$ to 2 decimal places.", value: avg22, dp: 2, unit: "US$", wrong: [2.5, 0.70],
        explanation: "31.30 ÷ 22 = US\\$1.42 per m³." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how this tariff may reduce the demand for water.",
        points: [
          "The price per m³ rises with use, so heavy users pay much more and have a reason to cut waste.",
          "Households repair leaks, stop unnecessary uses such as garden watering and use efficient appliances.",
          "The low price of the first block keeps basic needs affordable for the poor.",
        ],
        modelAnswer: "The price per cubic metre rises with use, so heavy users pay much more and have a reason to repair leaks, cut garden watering and buy efficient appliances. The low price of the first block keeps basic needs affordable for poor households.",
        explanation: "Tiered pricing discourages heavy use and protects basic needs." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest two limitations of using a tariff to manage demand.",
        points: [
          "Wealthy households may be willing and able to pay for high use, so their demand falls little.",
          "Many poor households have no meters or piped connections, so the tariff does not reach them; and meters and billing cost money.",
          "Changing prices is politically difficult and unpopular, and illegal connections avoid paying.",
        ],
        modelAnswer: "Wealthy households may simply pay the higher price, so their demand falls little. Households without meters or piped connections are not reached, and meters and billing are costly. Price rises are unpopular and illegal connections avoid payment.",
        explanation: "Income, coverage and enforcement limit pricing." }),
    ], explanation: "Calculate a tiered bill and explain and evaluate the measure." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `A government compares three ways of increasing water supply (illustrative data, invented for this exercise).\n\n${SCT}`,
    hints: ["Total cost = volume × cost per m³ (million m³ × US\\$ per m³ = US\\$ million).", "Energy in kWh = volume in m³ × kWh per m³; 1 GWh = 1 000 000 kWh."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the annual cost of the transfer scheme, in US\\$ million.", value: costTransfer, unit: "US$ million", wrong: [0.0027, 300.8],
        explanation: "300 million m³ × US\\$0.80 = US\\$240 million." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the annual energy used by the desalination plant, in GWh.", value: energyDesal, unit: "GWh", wrong: [3.5, 350000],
        explanation: "100 million m³ × 3.5 kWh = 350 million kWh = 350 GWh." }),
      P.manual({ label: "(c)", marks: 4, stem: "Assess which scheme is likely to be the most suitable for a coastal city with little rainfall and an expanding population.",
        points: [
          "Desalination is independent of rainfall and can grow with demand, but costs US\\$1.50 per m³ and uses much energy.",
          "A transfer supplies much more water (300 million m³) at a lower cost (US\\$0.80 per m³) but needs a distant source and has impacts on the donor area.",
          "Rainwater harvesting is cheap and low in energy but supplies only 4 million m³, so it can contribute but not meet the main demand.",
          "Judgement: a combination, with a transfer for bulk supply, desalination as a reliable supplement and harvesting for local needs, is best (accept a reasoned single choice).",
        ],
        modelAnswer: "Desalination does not depend on rain and can expand with the city, but it costs US\\$1.50 per m³ and uses 3.5 kWh per m³. The transfer supplies 300 million m³ at US\\$0.80, but needs a distant source and affects the donor area. Harvesting is cheap but supplies only 4 million m³. A combination is best: the transfer for bulk supply, desalination as a reliable supplement and harvesting for local needs.",
        explanation: "Compare cost, volume, energy and risks, then judge." }),
    ], explanation: "Calculate cost and energy and assess the options." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "To what extent is managing demand a better way of solving water shortages than increasing supply?",
    hints: ["Give examples of each approach.", "Weigh cost, speed, effectiveness and sustainability."],
    points: [
      "Demand management (pricing, metering, repairs, efficient technology, education) is usually cheaper and quicker than new supply.",
      "Cape Town cut its use by about half in a severe drought through restrictions, tariffs and leak reduction.",
      "It is sustainable and reduces pressure on the environment.",
      "But it depends on public cooperation and enforcement, and savings may be limited, particularly where use is already low (poor households).",
      "Increasing supply (dams, transfers, desalination) is needed where population is growing and physical scarcity is severe.",
      "Supply schemes are costly, have social and environmental impacts and take years to build.",
      "Poor households in many countries need more access, not less use: supply is needed.",
      "Judgement: demand management should come first and is often better, but a combination is needed where growth or scarcity is high.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Demand management is usually cheaper and quicker than new supply and is more sustainable. Cape Town cut its use by about half during a severe drought through restrictions, higher tariffs and leak reduction. It depends on cooperation and enforcement, and in poor communities where use is already low there is little left to save. Increasing supply with dams, transfers or desalination is needed where the population is growing and scarcity is severe, but these schemes are costly, slow and have social and environmental costs. Demand management should come first, but most places need a combination.",
    wordLimit: { max: 300 }, explanation: "Weigh demand-side against supply-side measures and judge." });

  b.card("CONCEPT", "Supply-side strategies", "Dams and reservoirs, multipurpose schemes, water transfers, desalination, rainwater harvesting, grey-water reuse and low-technology supplies.");
  b.card("CONCEPT", "Demand-side strategies", "Pricing and metering, rationing and restrictions, efficient technology (leak repair, drip irrigation) and education.");
  b.card("DEFINITION", "Multipurpose scheme", "A dam or project serving several uses, such as water supply, hydropower, irrigation, flood control and fishing.");
  b.card("DEFINITION", "Saltwater intrusion", "Sea water entering a coastal aquifer when fresh groundwater is over-pumped.");
  b.card("CONCEPT", "Problems of water management", "Variable volume and quality, over-abstraction, saltwater intrusion, ground subsidence, conflicts over shared rivers and pollution.");
  b.card("FACT", "Lesotho Highlands Water Project", "Transfers water from Lesotho highlands to the Vaal and Gauteng; Katse Dam 1998, Mohale Dam 2004; benefits South Africa and Lesotho (royalties, power) but displaced communities.");
  b.card("FACT", "Cape Town 2015-2018 drought", "Restrictions, higher tariffs, leak reduction and public campaigns cut the city's water use by about half.");
  b.card("CONCEPT", "Judging a water scheme", "Cost, volume, who gains and loses, environmental effects, sustainability and the alternatives.");
  b.card("FACT", "Kariba as a multipurpose dam", "Zambezi dam of the 1950s: hydropower, fishing and tourism; Tonga people were resettled and low lake levels affect power.");
});
