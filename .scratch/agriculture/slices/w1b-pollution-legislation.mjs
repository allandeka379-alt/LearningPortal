// Slice W1b: water pollution and water legislation (ZIMSEC only).
import { concept, P, pct, pctChange, round, check, table, agricultureLevels } from "../lib.mjs";

// Daily: nitrate change.
const dUp = 1.5, dDown = 6.0;
const dInc = pctChange(dUp, dDown);
check(dInc === 300, "daily increase");

// Calc: dam capacity 250,000 -> 205,000 m³.
const damBefore = 250000, damAfter = 205000;
const damLoss = pct(damBefore - damAfter, damBefore);
check(damLoss === 18, "dam loss");

// Structured: river sites.
const SITES = [
  ["A: above the farms", 1.2, 0.05, 7.8],
  ["B: below the vegetable gardens", 7.4, 0.62, 4.1],
  ["C: below the sewage works outfall", 9.6, 1.85, 1.3],
];
const S_TABLE = table(["Site", "Nitrate (mg/L)", "Phosphate (mg/L)", "Dissolved oxygen (mg/L)"], SITES.map(([s, n, p, o]) => [s, n.toFixed(1), p.toFixed(2), o.toFixed(1)]));
const doFallAC = pct(SITES[0][3] - SITES[2][3], SITES[0][3]);
check(Math.abs(doFallAC - 83.3333) < 1e-3, "DO fall");
const nIncAB = SITES[1][1] - SITES[0][1];
check(Math.abs(nIncAB - 6.2) < 1e-9, "N inc");

concept("agri.water.pollution-legislation", { file: "water/pollution-legislation", keyPrefix: "water.pollution-legislation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which two nutrients, washed into water, are the main causes of eutrophication?",
    options: [
      ["Nitrates and phosphates", "Correct: they feed algal blooms."],
      ["Calcium and magnesium", "These are not the main causes of algal blooms."],
      ["Sodium and chloride", "Salt affects salinity, not eutrophication."],
      ["Iron and copper", "These metals are not the main cause."],
    ],
    answer: "A",
    explanation: "Nitrates and phosphates from fertilisers, manure and sewage cause eutrophication.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "During eutrophication, why do fish die?",
    options: [
      ["Bacteria decomposing dead algae use up the dissolved oxygen", "Correct: the fish suffocate."],
      ["The fertiliser in the water poisons the fish directly through their gills", "The nutrients are not the direct poison."],
      ["Algae eat the fish eggs", "Algae do not eat fish eggs."],
      ["The water becomes too cold for fish", "Temperature is not the cause."],
    ],
    answer: "A",
    explanation: "Nutrients → algal bloom → algae and plants die → bacteria decompose them, using oxygen → fish die from lack of oxygen.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which organisation is mainly responsible for controlling the discharge of effluents and protecting the environment in Zimbabwe?",
    options: [
      ["EMA (the Environmental Management Agency)", "Correct: EMA licenses discharges and enforces environmental rules."],
      ["ZINWA (the Zimbabwe National Water Authority)", "ZINWA manages and supplies water resources."],
      ["The Grain Marketing Board", "The GMB buys and stores grain."],
      ["AGRITEX", "AGRITEX provides agricultural extension advice."],
    ],
    answer: "A",
    explanation: "EMA controls pollution and environmental damage; ZINWA manages water; catchment councils allocate water locally.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under Zimbabwe's water law, who owns the water in rivers and underground?",
    options: [
      ["The State", "Correct: users are given permits, not ownership."],
      ["The farmer whose land the river crosses", "Landowners do not own the water."],
      ["The catchment council", "Councils plan and allocate water; they do not own it."],
      ["The first person to use it", "The old priority-of-rights idea was replaced by permits."],
    ],
    answer: "A",
    explanation: "Water is vested in the State; permits allow its use for commercial purposes such as irrigation.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Gold panning in a riverbed upstream of a farm dam is most likely to affect the farm by",
    options: [
      ["siltation of the dam and possible mercury contamination", "Correct: panning loosens sediment and may use mercury."],
      ["raising the dissolved oxygen in the water", "Silt and chemicals do not raise oxygen."],
      ["adding large amounts of phosphate fertiliser to the dam water", "Panning does not add fertiliser."],
      ["increasing the dam's storage capacity", "Silt reduces capacity."],
    ],
    answer: "A",
    hints: ["What does digging a riverbed release, and what chemical is used to collect gold?"],
    explanation: "Alluvial panning stirs up huge amounts of sediment that settles in dams; mercury used to collect gold is highly toxic.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which practice best reduces pollution of a river by fertiliser from a riverside vegetable garden?",
    options: [
      ["Leaving a strip of natural vegetation between the garden and the river", "Correct: a buffer strip traps silt and absorbs nutrients."],
      ["Applying all of the season's fertiliser to the garden in one large dose", "One large dose increases runoff and leaching."],
      ["Cultivating right up to the water's edge", "Stream-bank cultivation increases erosion and pollution."],
      ["Applying fertiliser just before a heavy storm", "Rain will wash it into the river."],
    ],
    answer: "A",
    hints: ["Something must catch the runoff before it reaches the river."],
    explanation: "Riverbank buffers, correct rates, split doses and good timing all keep fertiliser out of water.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Cattle drink and stand in a river every day at the same crossing. Downstream, a farmer's vegetables irrigated from the river cause stomach illness in customers. Which explanation and remedy are best?",
    options: [
      ["Dung contaminates the water with disease organisms; provide troughs away from the river", "Correct: keeping animals out of the river protects the water."],
      ["Cattle drink so much that the river dries up; reduce the herd", "Drinking does not cause illness in vegetable buyers."],
      ["Hooves add fertiliser that burns the vegetables; spray the vegetables", "The problem is disease organisms, not burning."],
      ["The river is too cold for irrigation; heat the water", "Temperature is not the cause of illness."],
    ],
    answer: "A",
    hints: ["What do animals add to water besides trampled soil?"],
    explanation: "Animal dung carries bacteria that contaminate vegetables irrigated with the water. Troughs supplied by a pipe keep animals and dung out of the river.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "ZINWA stands for the Zimbabwe National Water Authority.",
    answer: true,
    explanation: "True. ZINWA manages and develops water resources, including many large dams.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A farmer needs a water permit to draw water for drinking and cooking at home.",
    answer: false,
    explanation: "False. Primary (household) use does not need a permit; commercial uses such as irrigation do.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each pollutant with its usual source.",
    pairs: [
      ["Nitrates and phosphates", "Fertiliser runoff and sewage"],
      ["Mercury", "Small-scale gold processing"],
      ["Silt", "Eroded fields and gold panning in riverbeds"],
      ["Disease-causing bacteria", "Untreated sewage and animal dung"],
    ],
    explanation: "Each pollutant comes mainly from particular activities.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Water use in each river basin is planned by a {{blank:a}} council. Permission to use water for irrigation is given by a water {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["catchment"] },
      { id: "b", accepted: ["permit"] },
    ],
    explanation: "Catchment councils plan water use; permits authorise commercial abstraction.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `Nitrate in a stream is ${dUp} mg/L above a farm and ${dDown} mg/L below it. Calculate the percentage increase in nitrate.`,
    value: dInc, unit: "%", wrong: [dDown - dUp, round(pct(dDown, dUp), 1)],
    explanation: `Increase = ${dDown} − ${dUp} = ${dDown - dUp} mg/L. Percentage increase = ${dDown - dUp} ÷ ${dUp} × 100 = ${dInc}%.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A farm dam held ${damBefore.toLocaleString("en-GB")} m³ when it was built. Silt has reduced its capacity to ${damAfter.toLocaleString("en-GB")} m³. Calculate the percentage of capacity lost.`,
    value: damLoss, unit: "%", wrong: [round(pct(damAfter, damBefore), 1), round(pct(damBefore - damAfter, damAfter), 1)],
    hints: ["Find the capacity lost, then divide by the ORIGINAL capacity."],
    explanation: `Lost = ${damBefore.toLocaleString("en-GB")} − ${damAfter.toLocaleString("en-GB")} = ${(damBefore - damAfter).toLocaleString("en-GB")} m³. Percentage = ${(damBefore - damAfter).toLocaleString("en-GB")} ÷ ${damBefore.toLocaleString("en-GB")} × 100 = ${damLoss}%. Dividing by the new capacity gives the wrong base.`,
    workedSolution: `1. Capacity lost = ${damBefore.toLocaleString("en-GB")} − ${damAfter.toLocaleString("en-GB")} = ${(damBefore - damAfter).toLocaleString("en-GB")} m³.\n2. Percentage lost = ${(damBefore - damAfter).toLocaleString("en-GB")} ÷ ${damBefore.toLocaleString("en-GB")} × 100 = ${damLoss}%.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the floating water weed that has spread over some polluted lakes and dams in Zimbabwe.",
    accepted: ["water hyacinth", "hyacinth", "Eichhornia"],
    keywords: { any: ["hyacinth"] },
    explanation: "**Water hyacinth** grows rapidly in nutrient-rich water.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which water pollution reduces agricultural production.",
    hints: ["Think about livestock, irrigation and crops."],
    points: [
      "Polluted drinking water causes disease or poisoning in livestock.",
      "So animals grow poorly / die / production of milk and meat falls.",
      "Water weeds, algae and silt block pumps and canals / fill dams.",
      "So less irrigation water is available and crop yields fall (or: polluted irrigation water contaminates vegetables / kills fish in fish ponds).",
    ],
    modelAnswer: "Livestock drinking polluted water may catch diseases from sewage or be poisoned by chemicals, so they grow poorly or die. Silt and water weeds block pumps and canals and fill dams, so less water is available for irrigation and crop yields fall.",
    explanation: "State the effect and explain how it lowers production.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Water samples were taken at three sites along a river near a town.\n\n${S_TABLE}`,
    hints: ["Compare each site with site A.", "Low dissolved oxygen follows high nutrients."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the increase in nitrate between site A and site B, in mg/L.",
        value: nIncAB, tol: 0.05, wrong: [SITES[1][1]],
        explanation: `${SITES[1][1]} − ${SITES[0][1]} = ${round(nIncAB, 1)} mg/L.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the percentage fall in dissolved oxygen from site A to site C, to one decimal place.",
        value: doFallAC, unit: "%", tol: 0.05, wrong: [round(SITES[0][3] - SITES[2][3], 1), round(pct(SITES[2][3], SITES[0][3]), 1)],
        explanation: `(${SITES[0][3]} − ${SITES[2][3]}) ÷ ${SITES[0][3]} × 100 = ${round(doFallAC, 1)}%.`,
      }),
      P.short({
        label: "(c)", stem: "Name the process shown by the high nutrients and low oxygen at site C.",
        accepted: ["eutrophication", "eutrophy"],
        explanation: "Nutrient enrichment followed by oxygen depletion is eutrophication.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest the source of the nutrients at site B and at site C.",
        points: ["Site B: fertiliser (and manure) washed from the vegetable gardens.", "Site C: sewage from the sewage works outfall."],
        explanation: "Match each rise to the activity just upstream.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Explain why dissolved oxygen is lowest at site C.",
        points: [
          "High nitrate and phosphate cause rapid growth of algae and water plants.",
          "When they die, bacteria decompose them (and the organic matter in sewage).",
          "Decomposing bacteria use up the dissolved oxygen.",
        ],
        explanation: "Decomposition, not the nutrients themselves, removes oxygen.",
      }),
    ],
    explanation: "Nutrients rise below each source; oxygen falls where decomposition is greatest.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "Farai wants to pump water from a river to irrigate 3 ha of wheat in winter. His neighbour downstream complains that the river already runs low in the dry season.",
    hints: ["Who allocates water in a river basin?"],
    parts: [
      P.short({
        label: "(a)", stem: "Name the document Farai needs before he may abstract water for irrigation.",
        accepted: ["water permit", "permit", "a water permit"],
        keywords: { any: ["permit"] },
        explanation: "A water permit from the catchment council system.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "State the roles of the catchment council in this situation.",
        points: ["Considers Farai's application and decides how much water he may take (issues the permit).", "Plans and shares water among all users in the catchment so downstream users also get water / settles disputes."],
        explanation: "Catchment councils allocate water fairly within a basin.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest **three** things Farai could do to use less river water or to avoid polluting the river.",
        points: ["Use efficient irrigation (drip or well-managed sprinklers) and irrigate only when needed.", "Store water in the wet season (a small dam or tank) for winter use.", "Avoid fertiliser and pesticide runoff: correct rates, split doses, buffer strip by the river, no washing sprayers in the river."],
        explanation: "Efficiency, storage and careful chemical use.",
      }),
    ],
    explanation: "Permits and catchment councils share water; good practice reduces demand and pollution.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Discuss how farmers and the authorities can share responsibility for reducing water pollution in a river basin used for irrigation.",
    hints: ["Give actions by farmers and by bodies such as EMA, ZINWA and catchment councils.", "Judge whether either can succeed alone."],
    points: [
      "Farmers: correct fertiliser use (rate, timing, split doses) and safe pesticide handling and disposal.",
      "Farmers: soil conservation and riverbank buffer strips to reduce silt; troughs to keep livestock out of rivers.",
      "EMA: licenses and monitors effluent discharges, enforces rules against stream-bank cultivation and pollution.",
      "ZINWA and catchment councils: monitor water quality, plan water use and involve users in decisions.",
      "Towns, mines and industry must treat sewage and effluent; authorities enforce this.",
      "Judgement: both are needed; laws work only with farmers' cooperation, and farmers' efforts fail if towns and mines pollute.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Farmers can reduce pollution at its source: applying the correct amounts of fertiliser at the right time and in split doses, never washing sprayers in the river, keeping vegetation along the banks to trap silt and nutrients, conserving soil and watering cattle at troughs instead of in the river. The authorities have powers farmers do not: EMA licenses and monitors discharges from towns, mines and factories and enforces laws against stream-bank cultivation, while ZINWA and the catchment councils monitor water quality, plan use and bring all users together. Neither can succeed alone. Laws are hard to enforce without farmers' cooperation, and careful farmers still suffer if a town's sewage or a mine's effluent enters the river, so responsibility must be shared.",
    explanation: "Assign actions to each group and judge how they depend on each other.",
  });

  b.card("DEFINITION", "Eutrophication", "Nutrient enrichment of water causing algal blooms; decomposition of dead algae then uses up oxygen.");
  b.card("CONCEPT", "Stages of eutrophication", "Nutrients in → algae and weeds grow → plants below die → bacteria decompose them using oxygen → fish die.");
  b.card("FACT", "Agricultural sources of water pollution", "Fertilisers, pesticides, livestock wastes, dip chemicals and silt from erosion.");
  b.card("FACT", "Pollution from mining", "Silt from panning, mercury from small-scale gold processing, acid drainage and tailings.");
  b.card("CONCEPT", "Who owns water in Zimbabwe?", "The State; water is used under permits, except primary (household) use.");
  b.card("CONCEPT", "Role of ZINWA", "Manages and develops water resources, runs many dams, supplies raw water and monitors rivers and groundwater.");
  b.card("CONCEPT", "Role of EMA", "Protects the environment: controls effluent discharges, licenses polluters, enforces environmental rules.");
  b.card("CONCEPT", "Role of catchment councils", "Plan water use in a river basin and deal with water permits, with sub-catchment councils below them.");
  b.card("CONCEPT", "Riverbank buffer strip", "Natural vegetation beside a river that traps silt and absorbs nutrients from runoff.");
});
