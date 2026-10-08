// Slice G1b: resources — conserving water, forests, fish and soil (ZIMSEC 7.4.2).
import { concept, P, geographyLevels } from "../lib.mjs";

const FISH =
  "Table 1: catches from a fictional lake fishery (fictional data).\n\n| Year | Total catch (tonnes) | Number of rigs |\n| --- | --- | --- |\n| Year A | 24,000 | 400 |\n| Year B | 21,000 | 500 |";

concept("geo.resources.conservation", { file: "resources/conservation", keyPrefix: "resources.conservation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **conservation** of a resource mean?",
    options: [
      ["Using it wisely so that it lasts into the future", "Correct: careful use, not no use."],
      ["Never using the resource at all", "That is preservation, not conservation."],
      ["Using as much as possible while prices are high", "This would exhaust the resource."],
      ["Selling the resource to other countries", "Exporting is not conservation."],
    ],
    answer: "A",
    explanation: "Conservation is careful management and wise use of resources, so that they are protected from waste and remain available.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which fish was introduced into Lake Kariba from Lake Tanganyika and now supports a large fishery?",
    options: [
      ["Kapenta", "Correct: introduced in the 1960s."],
      ["Tigerfish", "Tigerfish are native to the Zambezi and are a sport fish."],
      ["Trout", "Trout live in cool highland streams such as in Nyanga."],
      ["Catfish", "Catfish are native and are not the basis of the rig fishery."],
    ],
    answer: "A",
    explanation: "Kapenta were introduced from Lake Tanganyika in the 1960s and are caught at night from rigs using lights and lift nets.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does a **closed season** help to conserve fish?",
    options: [
      ["Fish can breed without being caught, so stocks are replaced", "Correct: it protects the breeding period."],
      ["It allows boats to fish without any limits for the rest of the year", "Limits still apply outside the closed season."],
      ["It raises the price of fish so fewer people buy it", "Price is not the purpose of a closed season."],
      ["It closes the lake to tourists so fish are not disturbed", "Closed seasons apply to fishing, not tourism."],
    ],
    answer: "A",
    explanation: "Banning fishing during the breeding season lets fish spawn and young fish survive, so the population is replaced.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do fishing rules set a **minimum mesh size** for nets?",
    options: [
      ["Young fish escape and can grow to breeding size", "Correct: only mature fish are caught."],
      ["Larger nets catch more fish of every size", "Mesh size is about the holes, not the net's overall size."],
      ["Small holes damage boats and engines", "Mesh size has nothing to do with boats."],
      ["It makes the nets cheaper to buy", "Cost is not the reason for the rule."],
    ],
    answer: "A",
    explanation: "Larger mesh holes let immature fish swim through, so they can grow and breed before they are caught.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which irrigation method wastes the **least** water through evaporation?",
    options: [
      ["Drip irrigation", "Correct: water goes straight to the roots."],
      ["Flood (furrow) irrigation", "Water spreads over the surface and much evaporates."],
      ["Overhead sprinklers at midday", "Spray in hot sun loses much water to evaporation and wind."],
      ["Watering with a hosepipe across the whole field", "This wets the whole surface, wasting water."],
    ],
    answer: "A",
    explanation: "Drip irrigation delivers small amounts of water directly to plant roots, so very little is lost to evaporation or runoff.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How do pine and eucalyptus plantations in the Eastern Highlands help conserve natural woodland?",
    options: [
      ["They supply timber, so less is cut from natural woodland", "Correct: plantations meet demand instead."],
      ["They support more native species than natural woodland", "Exotic plantations support fewer native species."],
      ["They stop all forest fires in the region", "Plantations can burn; fire is a risk to them."],
      ["They increase rainfall across the whole country", "Plantations do not change national rainfall."],
    ],
    answer: "A",
    hints: ["Think about where timber would come from without the plantations."],
    explanation: "Plantations provide timber, poles and pulp, reducing the need to cut natural forest and woodland.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A village has lost most of its nearby woodland to firewood cutting. Which measure would reduce demand for firewood **most** directly?",
    options: [
      ["Introducing fuel-efficient stoves and biogas digesters", "Correct: less wood is needed for cooking."],
      ["Building a new tarred road through to the village","A road would make cutting and transporting wood easier."],
      ["Holding a single tree-planting day", "Planting helps supply in the long term but does not cut demand."],
      ["Increasing the number of cattle kept in the village","More cattle would add to pressure on the land."],
    ],
    answer: "A",
    hints: ["The question asks about demand, not supply."],
    explanation: "Efficient stoves and biogas reduce the amount of wood needed; planting increases supply only years later.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Planting trees on land where forest has recently been cut is called reforestation.",
    answer: true,
    explanation: "True. Reforestation replants cut forest; afforestation plants trees on land not recently forested.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `${FISH}\n\nCalculate the catch per rig in Year B (in tonnes).`,
    value: 42, unit: "t",
    wrong: [60, 21000],
    explanation: "$21\\,000 \\div 500 = 42$ tonnes per rig.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: `${FISH}\n\nCalculate the percentage change in catch per rig from Year A to Year B.`,
    value: -30, unit: "%", answer: "-30",
    wrong: [30, -12.5],
    hints: ["Find the catch per rig in each year first.", "Change ÷ original × 100; a fall is negative."],
    workedSolution: "1. Year A: 24,000 ÷ 400 = 60 t per rig. Year B: 21,000 ÷ 500 = 42 t per rig.\n2. Change = 42 − 60 = −18 t.\n3. Percentage change = $\\dfrac{-18}{60} \\times 100 = -30\\%$ (a 30% fall).",
    explanation: "Catch per rig fell from 60 t to 42 t, a fall of 30%: a warning sign of over-fishing.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A school roof has an area of 120 m². The mean annual rainfall is 650 mm, and about 80% of the rain falling on the roof can be collected. How many litres of water can be harvested in a year? (1 m³ = 1,000 litres)",
    value: 62400,
    wrong: [78000, 62.4],
    hints: ["Convert 650 mm to metres.", "Volume = area × rainfall depth × 0.8."],
    explanation: "Volume = $120 \\times 0.65 \\times 0.8 = 62.4$ m³ = 62,400 litres.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each conservation method to the resource it mainly conserves.",
    pairs: [
      ["Quota on the catch", "fish"],
      ["Drip irrigation", "water"],
      ["Fuel-efficient stoves", "woodland"],
      ["Contour ridges", "soil"],
    ],
    explanation: "Quotas limit fish catches; drip irrigation saves water; efficient stoves reduce wood use; contour ridges slow runoff and hold soil.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A limit on the amount of fish that may be caught is a {{blank:a}}; raising fish in ponds or cages is called fish {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["quota"], wrong: "licence" },
      { id: "b", accepted: ["farming"], wrong: "hunting" },
    ],
    explanation: "Quotas cap the catch; fish farming (aquaculture) supplies fish without depleting wild stocks.",
  });
  b.manualShort({
    d: 2, skill: "APPLICATION", marks: 3,
    stem: "Describe **three** ways of conserving water in a town.",
    points: [
      "Repair leaking pipes and taps / reduce losses",
      "Recycle treated waste water for parks or industry / reuse grey water",
      "Meter and charge for water / water restrictions / harvest rainwater / protect catchment wetlands",
    ],
    modelAnswer: "The council can repair leaking pipes, recycle treated waste water to irrigate parks, and install meters so households pay for what they use.",
    explanation: "Each method must save, reuse or store water.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** problems that make it difficult to conserve fish stocks in a large lake.",
    points: [
      "Illegal fishing / poaching",
      "Hard to patrol a large area of water with few officers",
      "Many people depend on fishing for income and food",
      "So there is pressure to fish more / quotas and closed seasons are ignored",
    ],
    hints: ["Think about enforcement and livelihoods."],
    modelAnswer: "Illegal fishing is common because the lake is huge and there are few patrol boats. Many families rely on fishing for food and income, so they keep fishing even during closed seasons or with nets that are too fine.",
    explanation: "Enforcement and poverty are the main obstacles to fish conservation.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: FISH,
    parts: [
      P.num({
        label: "(a)",
        marks: 1,
        stem: "Calculate the catch per rig in Year A (in tonnes).",
        value: 60, unit: "t",
        explanation: "$24\\,000 \\div 400 = 60$ tonnes per rig.",
      }),
      P.manual({
        label: "(b)",
        marks: 2,
        stem: "Describe what happened to the total catch and the number of rigs between Year A and Year B.",
        points: [
          "The number of rigs increased from 400 to 500",
          "But the total catch fell from 24,000 to 21,000 tonnes",
        ],
        modelAnswer: "The number of rigs increased by 100 to 500, but the total catch fell by 3,000 tonnes to 21,000 tonnes.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "Suggest why these changes suggest over-fishing.",
        points: [
          "More fishing effort is catching fewer fish / catch per rig fell (60 t to 42 t)",
          "Fish are being removed faster than they can breed, so the stock is shrinking",
        ],
        modelAnswer: "More rigs are catching fewer fish, so each rig catches less (42 t instead of 60 t). This shows the stock is being caught faster than it can breed.",
      }),
      P.manual({
        label: "(d)",
        marks: 3,
        stem: "Suggest **three** measures the fishery authority could take.",
        points: [
          "Limit the number of rigs / fishing permits",
          "Set a quota on the total catch / closed season during breeding",
          "Enforce minimum mesh sizes / close breeding areas / encourage fish farming",
        ],
        modelAnswer: "Reduce the number of permits back to about 400 rigs, set a total catch quota with a closed season during breeding, and encourage cage farming of bream.",
      }),
    ],
    hints: ["Divide total catch by number of rigs."],
    explanation: "Falling catch per unit of effort is a classic sign of over-fishing; limiting effort and protecting breeding restore stocks.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 540,
    stem: "A Form 4 class compared two ways of watering identical vegetable beds for one week (fictional data).\n\n| Method | Water used (litres) | Yield of rape (kg) |\n| --- | --- | --- |\n| Flood irrigation | 8,000 | 52 |\n| Drip irrigation | 3,200 | 55 |",
    parts: [
      P.num({
        label: "(a)",
        marks: 1,
        stem: "Calculate the percentage of water saved by using drip irrigation instead of flood irrigation.",
        value: 60, unit: "%",
        explanation: "Saving = 8,000 − 3,200 = 4,800 litres; $4\\,800 \\div 8\\,000 \\times 100 = 60\\%$.",
      }),
      P.mcq({
        label: "(b)",
        stem: "What do the results show about drip irrigation?",
        options: [
          ["It used less water and gave a similar yield", "Correct: 3,200 litres for 55 kg against 8,000 litres for 52 kg."],
          ["It used more water and gave a lower yield", "Drip used less water and gave slightly more."],
          ["It used the same water and doubled the yield", "Water use and yield both differ from this."],
          ["It saved water but the crop failed", "The yield was 55 kg, slightly higher."],
        ],
        answer: "A",
        explanation: "Drip used 60% less water for a slightly higher yield.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "Explain why drip irrigation uses less water.",
        points: [
          "Water is delivered slowly and directly to the roots",
          "So less is lost to evaporation from the soil surface, runoff or deep drainage",
        ],
        modelAnswer: "Drip pipes release water slowly at the base of each plant, so little is lost to evaporation or runoff.",
      }),
      P.manual({
        label: "(d)",
        marks: 2,
        stem: "Suggest **two** reasons why many small-scale farmers do not use drip irrigation.",
        points: [
          "High cost of pipes and fittings / lack of capital",
          "Needs a pressured or clean water supply / pipes block or are damaged / lack of skills or spare parts",
        ],
        modelAnswer: "Drip kits are expensive to buy, and the narrow pipes block easily if the water is dirty.",
      }),
    ],
    hints: ["Saving ÷ original × 100."],
    explanation: "Drip irrigation conserves water, but cost and maintenance limit its use.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "With reference to Zimbabwe, evaluate the methods used to conserve **either** fish **or** forests.",
    points: [
      "Fish: quotas / permits limit effort (e.g. kapenta rigs on Lake Kariba); OR forests: plantations supply timber (e.g. Eastern Highlands)",
      "A second method explained, e.g. closed seasons and mesh sizes; OR controlled cutting with permits / woodlots",
      "A third method explained, e.g. fish farming (cage farming of bream); OR alternative fuels / efficient stoves",
      "Strength of the methods with evidence or example",
      "Limitation: enforcement is difficult / illegal fishing or cutting continues",
      "Limitation: poverty and dependence on the resource / cost of alternatives",
      "Judgement on overall effectiveness",
    ],
    levels: geographyLevels(7),
    hints: ["Choose one resource and use Zimbabwean examples."],
    wordLimit: { max: 400 },
    modelAnswer: "On Lake Kariba the kapenta fishery is conserved by controlling the number of fishing permits and rigs, so that fishing effort does not exceed what the stock can support. Closed seasons and minimum mesh sizes protect breeding fish and young fish in other fisheries, and cage farming of bream on the lake supplies fish without taking wild stocks. These measures have kept the fishery going for decades, and monitoring catch per rig gives early warning of over-fishing. However, the lake is huge and shared with Zambia, so illegal fishing is hard to police, and many people depend on fishing for their living, so there is pressure to fish more. Overall the methods are fairly effective where they are enforced and backed by alternatives such as fish farming, but they depend on cooperation and enforcement.",
    explanation: "A strong answer explains several methods with Zimbabwean examples, weighs strengths and limitations and reaches a judgement.",
  });
  b.card("DEFINITION", "What is **conservation**?", "The careful management and wise use of resources so they are protected from waste and remain available in future.");
  b.card("VOCABULARY", "Afforestation vs reforestation", "Afforestation: planting trees where there was no recent forest. Reforestation: replanting where forest was cut.");
  b.card("CONCEPT", "Ways to conserve water", "Dams, rainwater harvesting, drip irrigation, recycling and reuse, fixing leaks, metering, protecting catchments and wetlands, mulching.");
  b.card("CONCEPT", "Ways to conserve forests", "Plantations, controlled cutting by permit, woodlots, alternative fuels, efficient stoves, fire control, laws and education.");
  b.card("CONCEPT", "Ways to conserve fish", "Quotas and licences, closed seasons, minimum mesh sizes, restricted breeding areas, banning poison and explosives, fish farming, restocking.");
  b.card("FACT", "Lake Kariba kapenta fishery", "Kapenta introduced from Lake Tanganyika in the 1960s; caught at night from rigs with lights and lift nets; shared by Zimbabwe and Zambia.");
  b.card("FACT", "Forestry Commission plantations", "Pine, eucalyptus and wattle in the Eastern Highlands (e.g. Nyanga, Chimanimani) supply timber and reduce pressure on natural woodland.");
  b.card("CONCEPT", "Why is falling catch per rig a warning sign?", "More fishing effort is landing fewer fish, so the stock is being caught faster than it can breed.");
});
