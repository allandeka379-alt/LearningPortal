// Slice G3c: ZIMSEC Paper 2 Section B (economic geography): minerals and mining (2 × 25 marks).
import { concept, P, ZIM, geographyLevels } from "../lib.mjs";

concept("geo.mining.minerals-distribution", { file: "exam/zim-p2-b-mining", keyPrefix: "exam.zim-p2-b-mining", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.mining.minerals-distribution", "geo.mining.factors-methods", "geo.mining.processing-beneficiation"],
    stem: "Table 1 shows the value of mineral exports of a fictional southern African country in one year (US\\$ million, fictional data).\n\n| Mineral | Value (US\\$ million) |\n|---|---|\n| Gold | 2,400 |\n| Platinum group metals | 1,800 |\n| Ferrochrome | 600 |\n| Other minerals | 500 |\n| Diamonds | 450 |\n| Lithium concentrate | 250 |\n| **Total** | 6,000 |\n\nA geologist's note on two of the country's deposits: \"Deposit K is a thick coal seam 30 m below flat ground in a sedimentary basin. Deposit L is a gold reef that dips steeply and has been followed to 800 m below the surface.\"",
    hints: ["Percentage = part ÷ total × 100.", "Use depth to choose the mining method."],
    parts: [
      P.mcq({
        label: "(a)", stem: "In Zimbabwe, the platinum group metals in Table 1 are mined mainly from which geological formation?",
        options: [
          ["The Great Dyke", "Correct: the Great Dyke holds platinum group metals, chrome and nickel."],
          ["The Karoo basins", "The Karoo basins hold coal."],
          ["The Kalahari sands", "These sands of the west are not a source of platinum."],
          ["The Eastern Highlands", "The Eastern Highlands are not a platinum area."],
        ],
        answer: "A", explanation: "Platinum is mined along the Great Dyke, for example at Ngezi, Shurugwi and Zvishavane.",
      }),
      P.num({ label: "(b)", marks: 2, unit: "%", stem: "Calculate the percentage of the country's mineral export earnings that came from platinum group metals.", value: 30, tol: 0.05, wrong: [70, 3.33], explanation: "1,800 ÷ 6,000 × 100 = 30%." }),
      P.num({ label: "(c)", stem: "How many times greater was the value of gold exports than the value of lithium concentrate exports?", value: 9.6, tol: 0.01, wrong: [2150, 0.104], explanation: "2,400 ÷ 250 = 9.6 times." }),
      P.short({ label: "(d)", stem: "Name the mining method most suitable for deposit K.", accepted: ["open-cast", "open cast", "opencast", "open-cast mining", "open cast mining", "opencast mining", "open-pit", "open pit", "open-pit mining", "open pit mining", "strip mining", "strip"], wrong: ["shaft mining"], explanation: "A thick seam only 30 m below flat ground is mined from the surface (open-cast or strip mining)." }),
      P.short({ label: "(e)", stem: "Name the mining method most suitable for deposit L.", accepted: ["shaft", "shaft mining", "shaft mine", "underground shaft mining", "underground mining", "underground"], wrong: ["open-cast"], explanation: "Ore 800 m deep is reached by a vertical shaft with horizontal levels." }),
      P.manual({
        label: "(f)", marks: 4, stem: "Describe the distribution of gold, platinum and coal in Zimbabwe.",
        points: [
          "Gold is widespread on the greenstone belts of the central watershed, for example around Kwekwe, Kadoma, Gwanda or Bindura, and in river gravels.",
          "Platinum is confined to a narrow belt, the Great Dyke, running NNE–SSW through the centre of the country.",
          "Platinum examples: Ngezi, Shurugwi or Zvishavane.",
          "Coal is concentrated in Karoo basins, mainly at Hwange in the north-west (with deposits in the south-east).",
        ],
        modelAnswer: "Gold is found in many places on the greenstone belts of the central watershed, around Kwekwe, Kadoma, Gwanda and Bindura, and in river gravels. Platinum is limited to the narrow Great Dyke, which runs NNE to SSW through the middle of the country, with mines at Ngezi, Shurugwi and Zvishavane. Coal is concentrated in the Karoo basins, especially at Hwange in the north-west.",
        explanation: "Describe where each mineral is concentrated and name places.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Explain why deposit L can be mined at a profit even though it is deep.",
        points: [
          "Gold is very valuable per kilogram, so income can cover the high cost of a deep shaft.",
          "A rich reef (high grade) gives much gold from each tonne of rock.",
          "Gold is light, so transport costs are small compared with its value / modern technology makes deep mining possible.",
        ],
        modelAnswer: "Gold sells for a very high price per kilogram, so a rich reef earns enough to pay for sinking and running a deep shaft. Because gold is light and valuable, the cost of transporting it is tiny compared with its value.",
        explanation: "Value per tonne and grade can outweigh the cost of depth.",
      }),
      P.manual({
        label: "(h)", marks: 4, stem: "Describe how chromite ore is processed into ferrochrome, and explain **one** challenge faced by ferrochrome producers in Zimbabwe.",
        points: [
          "Chromite ore is mixed with coke (a reducing agent) and fluxes.",
          "It is smelted in electric arc furnaces to produce ferrochrome (an alloy of chrome and iron), for stainless steel.",
          "Challenge: smelting needs very large amounts of electricity, and power shortages occur.",
          "Development: power cuts reduce output and raise costs / other challenges such as capital or falling world prices with a reason.",
        ],
        modelAnswer: "Chromite ore from the Great Dyke is mixed with coke and fluxes and smelted in electric arc furnaces, for example at Kwekwe, giving ferrochrome for stainless steel. The furnaces use huge amounts of electricity, so power shortages cut output and raise costs.",
        explanation: "Describe the process, then explain a challenge with its effect.",
      }),
      P.manual({
        label: "(i)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "With reference to examples from Zimbabwe, explain the importance of minerals to the economy and evaluate the benefits of beneficiation.",
        points: [
          "Minerals earn most of the country's export income / foreign currency (gold, PGMs, diamonds, lithium).",
          "Jobs in large mines and in small-scale gold mining; spending supports local businesses.",
          "Royalties and taxes for government; raw materials for industry (Hwange coal for power, limestone for cement).",
          "Growth of towns and infrastructure, for example Hwange, Zvishavane, Bindura; linkages to transport and engineering.",
          "Beneficiation adds value: ferrochrome at Kwekwe, gold refined at Fidelity Gold Refinery, lithium concentrate after the 2022 ban on raw ore exports.",
          "It creates skilled jobs and linkages and lowers transport costs per unit of value.",
          "Limits: electricity shortages, capital, technology and skills, markets, pollution from smelting.",
          "Judgement: beneficiation could greatly raise the benefit Zimbabwe gets from minerals, but only if power and investment improve.",
        ],
        levels: geographyLevels(8),
        modelAnswer: "Minerals are central to Zimbabwe's economy. Gold, platinum group metals, diamonds and lithium earn most of the country's foreign currency, which pays for imports such as fuel. Large mines on the Great Dyke and in the gold belts employ thousands of workers, and small-scale gold mining supports hundreds of thousands more. Companies pay royalties and taxes, and minerals supply local industry, as Hwange coal does for the power station. Towns such as Hwange, Zvishavane and Bindura grew because of mining. Beneficiation increases these benefits. Smelting chromite into ferrochrome at Kwekwe earns far more than exporting ore, and refining gold at Fidelity Gold Refinery keeps the final stage at home. After raw lithium ore exports were banned in 2022, companies built concentrator plants in the country, creating jobs. However, smelters and refineries need large amounts of reliable electricity, which has often been short, and a platinum refinery needs huge investment and specialised skills. Beneficiation is therefore very valuable, but its benefits depend on solving the power and investment problems.",
        explanation: "Explain several kinds of importance with examples, then weigh the benefits of beneficiation against its limits.",
      }),
    ],
    explanation: "A ZIMSEC Paper 2 Section B mining question: geology and distribution, data handling, mining methods, processing and an extended evaluation of mining and beneficiation.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.mining.small-scale", "geo.mining.environment-sustainability"],
    stem: "A Form 4 class measured the depth of silt on the bed of a fictional river at five sites. Site A is upstream of a gold-panning area; Site B is at the panning area; Sites C to E are downstream (fictional data).\n\n| Site | A | B | C | D | E |\n|---|---|---|---|---|---|\n| Distance from the panning area (km) | 1 km upstream | 0 | 1 | 2 | 4 |\n| Depth of silt (cm) | 2 | 38 | 30 | 21 | 11 |\n\nThe class also noted open pits, felled trees and mercury bottles at Site B.",
    hints: ["Mean = total ÷ number of values.", "Compare Site A with the other sites."],
    parts: [
      P.num({ label: "(a)", marks: 2, unit: "cm", stem: "Calculate the mean depth of silt at Sites B, C, D and E.", value: 25, tol: 0.05, wrong: [20.4, 100], explanation: "(38 + 30 + 21 + 11) ÷ 4 = 100 ÷ 4 = 25 cm." }),
      P.mcq({
        label: "(b)", stem: "Which statement best describes the pattern in the table?",
        options: [
          ["Silt is deepest at the panning area and decreases downstream", "Correct: depth falls from 38 cm at B to 11 cm at E, and is only 2 cm upstream at A."],
          ["Silt increases steadily from upstream to downstream", "Depth is low at A, peaks at B and then falls."],
          ["Silt depth is about the same at every site", "Depths range from 2 cm to 38 cm."],
          ["Silt is deepest upstream of the panning area", "Site A has the least silt."],
        ],
        answer: "A", explanation: "The panning area is the source of the silt, which settles out with distance downstream.",
      }),
      P.fib({
        label: "(c)", stem: "Choose the correct word for each gap.",
        template: "Gold collects in river gravels because it has a very high {{blank:a}} and does not {{blank:b}}, so grains survive long journeys in water.",
        blanks: [
          { id: "a", accepted: ["density"], choices: ["density", "melting point", "hardness", "conductivity"] },
          { id: "b", accepted: ["rust or tarnish"], choices: ["rust or tarnish", "conduct heat", "reflect light", "bend easily"] },
        ],
        explanation: "Density and resistance to weathering let alluvial gold concentrate in rivers.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Describe how gold is separated from river gravel by panning.",
        points: [
          "Gravel and water are placed in a shallow pan and large stones and lumps are removed.",
          "The pan is swirled and tilted so the light sand and mud wash over the rim.",
          "The heavy gold remains at the bottom and is picked out (or collected with mercury).",
        ],
        modelAnswer: "The panner puts gravel and water in a pan, removes stones, then swirls and tilts the pan so light material washes out over the rim. The heavy gold stays at the bottom and is collected.",
        explanation: "Panning works because gold is much denser than sand.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Explain **two** environmental problems caused by the activities seen at Site B.",
        points: [
          "Open pits and dug river banks leave degraded land / loose soil is washed into the river (1).",
          "Causing siltation that fills channels and dams, as the table shows (1).",
          "Mercury used to collect gold enters the water (1).",
          "It poisons fish and people who use the water / felled trees cause erosion and habitat loss (1).",
        ],
        modelAnswer: "Digging pits and undercutting the banks loosens soil, which is washed into the river and settles as silt, filling the channel downstream. Mercury used to collect the gold spills into the water and poisons fish and the people who drink the water or eat the fish.",
        explanation: "Each problem needs a cause and an effect.",
      }),
      P.num({ label: "(f)", marks: 2, stem: "A proposed processing centre for small-scale miners has estimated benefits of US\\$9.6 million and costs of US\\$6.4 million (fictional figures). Calculate the benefit-cost ratio.", value: 1.5, tol: 0.005, wrong: [0.67, 3.2], explanation: "9.6 ÷ 6.4 = 1.5; above 1, so benefits exceed costs." }),
      P.manual({
        label: "(g)", marks: 3, stem: "Suggest **three** ways of making small-scale gold mining safer for the miners.",
        points: [
          "Support shafts and pits with timber or steel / backfill old pits.",
          "Provide protective equipment (helmets, boots, gloves, masks) and train miners in safe methods.",
          "Replace mercury with safer gravity methods or use retorts / inspect sites and register miners.",
        ],
        modelAnswer: "Shafts should be supported with timber, miners should be trained and given helmets and boots, and mercury should be replaced by gravity methods or used only in closed retorts.",
        explanation: "Each measure should tackle a real hazard.",
      }),
      P.manual({
        label: "(h)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "With reference to Zimbabwe, evaluate the measures that can be used to reduce the environmental impacts of mining.",
        points: [
          "Impacts in Zimbabwe: open pits and dumps (Hwange), siltation of rivers such as the Mazowe, mercury pollution in panning areas, dust and fumes near smelters.",
          "EIA and environmental management plans enforced by EMA: effective when monitored, but enforcement is hard at scattered small-scale sites.",
          "Rehabilitation (storing topsoil, backfilling, reshaping dumps, replanting) and rehabilitation bonds: restores land but costly and often neglected when mines close.",
          "Lined tailings dams, water treatment, dust suppression and scrubbers: reduce pollution at large mines but need investment.",
          "Formalising and training small-scale miners, mercury-free methods and processing centres: tackle the largest source of river damage but depend on miners' cooperation.",
          "Recycling and efficient extraction reduce the amount of new mining needed.",
          "Fines and policing: deter illegal mining but can push miners elsewhere.",
          "Judgement: a combination works best; measures succeed at large mines more easily than among small-scale miners, where training and incentives matter most.",
        ],
        levels: geographyLevels(8),
        modelAnswer: "Mining in Zimbabwe has left open pits and spoil heaps at Hwange, silted rivers such as the Mazowe and polluted water with mercury in gold-panning areas. An Environmental Impact Assessment before mining, with a management plan monitored by EMA, can prevent much damage at large mines, but it is hard to enforce at thousands of small, scattered sites. Rehabilitation, such as storing topsoil, reshaping dumps and replanting, restores land, and rehabilitation bonds make sure money is available, but old mines are often abandoned without it. Lined tailings dams, water treatment and dust sprays work well but need investment that small operators lack. For small-scale mining, registration, training in mercury-free methods and shared processing centres are probably the most effective, because they deal with the source of the siltation and mercury, though they need the miners' cooperation. Fines alone tend to move illegal mining elsewhere. Overall, legal controls work best for large mines, while support and incentives are needed for small-scale miners; a combination of both is required.",
        explanation: "Evaluate each measure's strengths and limits with Zimbabwean examples and conclude.",
      }),
    ],
    explanation: "A ZIMSEC Paper 2 Section B mining question: field data on siltation, properties of alluvial gold, panning, environmental and safety problems, cost-benefit analysis and an extended evaluation.",
  });
});
