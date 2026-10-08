// Slice G3c: factors influencing mining and mining methods (ZIMSEC 7.7.2).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.mining.factors-methods", { file: "mining/factors-methods", keyPrefix: "mining.factors-methods" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which mining method uses a **vertical** opening sunk from the surface down to a deep ore body?",
    options: [
      ["Shaft mining", "Correct: a shaft is a vertical opening; ore is hoisted up it."],
      ["Adit mining", "An adit is a horizontal tunnel into a hillside."],
      ["Strip mining", "Strip mining removes shallow overburden in long strips at the surface."],
      ["Alluvial mining", "Alluvial mining separates minerals from river sand and gravel."],
    ],
    answer: "A",
    explanation: "Shafts are vertical; adits are horizontal; drifts slope.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **overburden**?",
    options: [
      ["Soil and rock lying on top of a mineral deposit", "Correct: it must be removed before surface mining can reach the mineral."],
      ["Waste left after ore has been crushed and processed", "This describes tailings."],
      ["Rock left as pillars to support a mine roof", "These are support pillars, left in underground mines."],
      ["Water that floods the bottom of a mine", "Flood water is pumped out; it is not overburden."],
    ],
    answer: "A",
    explanation: "Overburden is the material above the deposit. The deeper the deposit, the more overburden, and the dearer surface mining becomes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which method is most suitable for a **thick coal seam lying 20 m below a flat surface**?",
    options: [
      ["Open-cast mining", "Correct: the seam is shallow, so removing the overburden and digging a pit is cheapest."],
      ["Shaft mining", "Sinking a shaft is expensive and unnecessary for such a shallow seam."],
      ["Dredging", "Dredging works in river beds and lakes, not on dry land coal seams."],
      ["Panning", "Panning separates small amounts of heavy minerals such as gold from gravel."],
    ],
    answer: "A",
    explanation: "Shallow, thick deposits are mined by open-cast methods, as at Hwange today.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an **economic** factor that influences whether a mineral is mined?",
    options: [
      ["The world market price of the mineral", "Correct: price determines the income and so the profit from mining."],
      ["The depth of the deposit below the surface", "Depth is a physical factor."],
      ["The grade of the ore in the deposit", "Grade is a physical factor (a property of the deposit)."],
      ["A government ban on exporting raw ore", "This is a political factor."],
    ],
    answer: "A",
    explanation: "Economic factors include prices, markets, capital, transport, power, labour and technology.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is **rail** transport especially important for a chrome or coal mine?",
    options: [
      ["The minerals are bulky and low in value per tonne", "Correct: only cheap bulk transport such as rail lets them reach markets profitably."],
      ["The minerals are perishable and must arrive quickly", "Minerals do not spoil; speed is not the issue."],
      ["The minerals are too valuable to send by road", "They are low in value per tonne, not high."],
      ["Rail is the only mode that can cross borders", "Road also crosses borders; the reason is cost for bulky goods."],
    ],
    answer: "A",
    explanation: "Gold and diamonds can be flown out; coal and chrome need railways because transport is a large share of their cost.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an **advantage of underground mining** compared with open-cast mining?",
    options: [
      ["It causes less damage to the land surface", "Correct: most of the work is below ground, so the scar at the surface is smaller."],
      ["It is cheaper to start and to operate", "Underground mining is usually more expensive (shafts, ventilation, pumping)."],
      ["It is safer for the miners who work there", "Underground work is more dangerous (rock falls, gases, flooding)."],
      ["It removes almost all of the ore in the deposit", "Pillars of ore are often left to hold up the roof."],
    ],
    answer: "A",
    explanation: "Underground mining reaches deep ore with less surface disturbance, but it is more costly and dangerous.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A gold deposit has a high grade but lies 900 m below the surface. Which method is most likely to be used?",
    options: [
      ["Shaft mining with horizontal levels", "Correct: at 900 m only underground mining from a shaft is practical."],
      ["Open-cast mining with benched sides", "Removing 900 m of overburden would be far too costly."],
      ["Strip mining along the surface", "Strip mining suits flat, shallow seams."],
      ["Dredging from a floating platform", "Dredging works on river beds, not deep ore bodies."],
    ],
    answer: "A",
    hints: ["Consider how much overburden would have to be removed.", "Which method reaches deep ore?"],
    explanation: "High grade justifies the cost of a deep shaft; depth rules out surface methods.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A seam of coal is exposed in the side of a steep valley and runs horizontally into the hill. Which method is most suitable?",
    options: [
      ["An adit driven into the hillside", "Correct: a horizontal tunnel follows the seam from the valley side, and water drains out naturally."],
      ["A vertical shaft from the hilltop", "A shaft is possible but needlessly costly when the seam can be reached from the side."],
      ["Dredging the valley floor", "Dredging removes river-bed sediment; it cannot reach a seam in the hill."],
      ["Panning in the stream below", "Panning recovers small amounts of heavy minerals, not coal seams."],
    ],
    answer: "A",
    hints: ["Where is the seam exposed?", "Which tunnel is horizontal?"],
    explanation: "Adits suit seams exposed on valley sides; drainage and haulage are easy.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Quarrying is used to obtain building stone and limestone.",
    answer: true,
    explanation: "True. Quarries cut or blast rock from an open face, for example granite for building and limestone for cement.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A low-grade deposit is always too poor to mine.",
    answer: false,
    explanation: "False. A large low-grade deposit near the surface, with good transport and high prices, can be mined profitably by large-scale open-cast methods.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each mining method with its description.",
    pairs: [
      ["Adit", "A horizontal tunnel into a hillside"],
      ["Drift", "A sloping tunnel from the surface to the seam"],
      ["Dredging", "Scooping sediment from a river bed with a floating machine"],
      ["Strip mining", "Removing overburden in long strips to expose a shallow seam"],
    ],
    explanation: "Adit = horizontal; drift = sloping; shaft = vertical. Dredging and strip mining are surface methods.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "The depth and grade of a deposit are {{blank:a}} factors. Capital and market prices are {{blank:b}} factors. Licences and taxes set by the state are {{blank:c}} factors.",
    blanks: [
      { id: "a", accepted: ["physical"], choices: ["physical", "economic", "political", "social"] },
      { id: "b", accepted: ["economic"], choices: ["physical", "economic", "political", "social"] },
      { id: "c", accepted: ["political"], choices: ["physical", "economic", "political", "social"] },
    ],
    explanation: "Group mining factors into physical (the deposit), economic (money, transport, markets) and political (government).",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A deposit contains 400,000 tonnes of ore at a grade of 5 g/t of gold (fictional figures). How many kilograms of gold does it contain?",
    value: 2000,
    wrong: [2000000, 80],
    explanation: "400,000 × 5 = 2,000,000 g; ÷ 1,000 = 2,000 kg.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A mine processes 250,000 tonnes of ore at 4 g/t of gold and recovers 92% of the gold (fictional figures). Calculate the mass of gold recovered, in kilograms.",
    value: 920,
    wrong: [1000, 80, 920000],
    hints: ["Work out the gold in the ore first, in grams.", "Convert to kilograms and take 92% of it."],
    workedSolution: "1. Gold in ore = 250,000 × 4 = 1,000,000 g = 1,000 kg.\n2. Recovered = 1,000 × 0.92 = 920 kg.",
    explanation: "Tonnes × grade gives grams; divide by 1,000 for kg; multiply by the recovery rate.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a mineral is extracted by **open-cast** mining.",
    points: [
      "Vegetation and topsoil are cleared (topsoil may be stored for later rehabilitation).",
      "The overburden is blasted and removed by excavators and trucks to waste dumps.",
      "The exposed ore is drilled, blasted and dug out, forming a pit with stepped sides (benches).",
      "The ore is loaded onto trucks or conveyors and taken to the processing plant.",
    ],
    modelAnswer: "First the vegetation and topsoil are removed. The overburden is blasted and carried away by trucks to dumps. The ore is then drilled, blasted and dug out in steps, forming a large pit with benched sides, and loaded onto trucks to go to the processing plant.",
    explanation: "Describe the stages in order.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Think about hazards underground.", "Each point should name a danger and say why it happens."],
    stem: "Explain why underground mining is more dangerous than surface mining.",
    points: [
      "Roofs and walls can collapse (rock falls) because rock is removed from beneath the surface.",
      "Explosive or poisonous gases (methane in coal mines) and dust build up in enclosed spaces, so ventilation is essential.",
      "Workings can flood, and escape is difficult because there are few exits / deep shafts.",
    ],
    modelAnswer: "Removing rock underground leaves unsupported roofs that can collapse. Gases such as methane and dust collect in the tunnels and can explode or harm the lungs, and workings may flood, with only a few routes out to the surface.",
    explanation: "Name the hazard and explain its cause.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 660,
    stem: "Table 1 describes three fictional mineral deposits.\n\n| Deposit | Mineral | Depth to top of ore (m) | Ore (tonnes) | Grade | Nearest railway (km) |\n|---|---|---|---|---|---|\n| P | Gold | 600 | 300,000 | 8 g/t | 40 |\n| Q | Coal | 25 | 50,000,000 | — | 5 |\n| R | Chrome | 15 | 200,000 | Low | 180 |",
    hints: ["Think about depth for the method, and about value per tonne for transport."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mass of gold in deposit P, in kilograms.", value: 2400, wrong: [2400000, 37.5], explanation: "300,000 × 8 = 2,400,000 g = 2,400 kg." }),
      P.mcq({
        label: "(b)", stem: "Which method is most suitable for deposit Q?",
        options: [
          ["Open-cast mining", "Correct: the coal is only 25 m deep and very large, so a pit is cheapest."],
          ["Shaft mining", "A shaft is unnecessary for such a shallow deposit."],
          ["Dredging", "Dredging works in river beds."],
          ["Adit mining", "An adit needs a seam exposed on a hillside; the table gives no such seam."],
        ],
        answer: "A", explanation: "Shallow, large deposits suit open-cast mining.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why deposit R may not be mined, even though it is shallow.",
        points: ["Chrome is bulky and low in value per tonne, and the deposit is 180 km from a railway, so transport costs are high.", "The deposit is small and low grade, so it would not repay the cost of building roads and plant."],
        modelAnswer: "Low-grade chrome is worth little per tonne, and the nearest railway is 180 km away, so carrying it by road would cost too much. The deposit is also small, so it would not repay the investment.",
        explanation: "Shallow depth helps, but grade, size and transport decide profit.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why deposit P can be mined profitably even though it is deep.",
        points: ["The high grade (8 g/t) means a lot of gold from each tonne of rock.", "Gold is so valuable per kilogram that it can pay for shafts, and transport cost is small compared with its value."],
        modelAnswer: "The ore is rich, at 8 g/t, and gold is extremely valuable, so the income easily covers the cost of a deep shaft, and transport adds little to the cost of such a light, valuable product.",
        explanation: "High grade and high value per tonne overcome the cost of depth.",
      }),
    ],
    explanation: "This item practises choosing methods by depth and judging profitability from grade, size, value and transport.",
  });
  b.struct({
    d: 2, skill: "UNDERSTANDING", secs: 480,
    stem: "A student's notes on a visit to a fictional mining area (fictional data):\n\n\"Site 1: a deep pit with stepped sides; huge trucks carry rock to a dump. Site 2: a tower with a winding wheel above a vertical opening; miners go down in a cage. Site 3: people in a river bed shake gravel and water in metal dishes.\"",
    parts: [
      P.short({ label: "(a)", stem: "Name the mining method at Site 1.", accepted: ["open-cast", "open cast", "opencast", "open-cast mining", "open cast mining", "opencast mining", "open-pit", "open pit", "open-pit mining", "open pit mining"], wrong: ["shaft"], explanation: "A pit with stepped (benched) sides is open-cast (open-pit) mining." }),
      P.short({ label: "(b)", stem: "Name the mining method at Site 2.", accepted: ["shaft", "shaft mining", "shaft mine"], wrong: ["adit"], explanation: "A headgear with a winding wheel above a vertical opening marks a shaft mine." }),
      P.short({ label: "(c)", stem: "Name the method at Site 3.", accepted: ["panning", "gold panning", "alluvial", "alluvial mining", "alluvial panning"], wrong: ["dredging"], explanation: "Shaking gravel and water in a pan is panning, a form of alluvial mining." }),
      P.manual({
        label: "(d)", marks: 3, stem: "Give **one** advantage and **two** disadvantages of the method at Site 1.",
        points: ["Advantage: cheaper / safer / removes large tonnages / nearly all the ore is recovered.", "Disadvantage: leaves a large scar and waste dumps / destroys vegetation and farmland.", "Disadvantage: dust, noise and blasting affect nearby people / only works for shallow deposits."],
        modelAnswer: "Open-cast mining is cheap and safe for workers, but it leaves a huge pit and waste dumps and creates dust and noise from blasting.",
        explanation: "Balance advantages and disadvantages.",
      }),
    ],
    explanation: "Recognise methods from descriptions and weigh up open-cast mining.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "\"Physical factors are more important than economic and political factors in deciding whether a mineral deposit is mined.\" Discuss this view with reference to Zimbabwe.",
    hints: ["Give the physical factors and an example.", "Then show how prices, transport and policy can override them."],
    points: [
      "Physical: size, grade and depth decide the amount of mineral and the cost of extraction.",
      "Example: shallow, large coal deposits at Hwange are worked by open-cast mining.",
      "Economic: world prices and markets decide profit; for example asbestos mines closed when demand collapsed, and lithium mining grew when prices rose.",
      "Economic: transport, power and capital are needed; bulky chrome or coal needs rail and reliable electricity.",
      "Political: licences, taxes, ownership rules, export bans and stability affect investment.",
      "Judgement: physical factors set what is possible, but economic and political factors usually decide whether and when mining happens.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Physical factors come first, because a deposit must be large and rich enough, and shallow enough, to be extracted. Hwange's thick, shallow coal is mined cheaply by open-cast methods. However, economic factors often decide the outcome. Asbestos at Zvishavane and Mashava was mined for decades, but production largely stopped when world demand collapsed, although the rock was still there. Lithium mining at Bikita and Arcadia grew rapidly when prices rose. Bulky minerals also need rail, power and capital. Political factors such as licences, royalties and rules about processing before export can attract or discourage investors. So physical factors set the limits, but economic and political factors decide whether a deposit is actually mined.",
    explanation: "Weigh each group of factors with examples and conclude.",
  });

  b.card("DEFINITION", "**Grade**", "The concentration of a mineral in ore, e.g. grams of gold per tonne (g/t).", undefined);
  b.card("DEFINITION", "**Overburden**", "Soil and rock above a deposit that must be removed for surface mining.", undefined);
  b.card("CONCEPT", "Factors influencing mining", "Physical (size, grade, depth, water, access), economic (capital, transport, power, prices, technology), political (policy, stability).", undefined);
  b.card("VOCABULARY", "**Shaft**", "A vertical opening sunk to reach deep ore.", undefined);
  b.card("VOCABULARY", "**Adit**", "A horizontal tunnel driven into a hillside to reach a seam.", undefined);
  b.card("VOCABULARY", "**Drift**", "A sloping tunnel from the surface down to or along a seam.", undefined);
  b.card("CONCEPT", "Surface mining: pros and cons", "Cheap, safe, large tonnages; but scars land, creates dumps, dust and noise, and only suits shallow deposits.", undefined);
  b.card("CONCEPT", "Underground mining: pros and cons", "Reaches deep, rich ore with little surface damage; but costly and dangerous (rock falls, gases, flooding).", undefined);
  b.card("FACT", "Hwange coal mining", "Once underground (a 1972 explosion killed more than 400 miners); now largely open-cast.", undefined);
});
