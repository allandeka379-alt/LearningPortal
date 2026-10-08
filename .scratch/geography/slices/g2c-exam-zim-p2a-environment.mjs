// Slice G2c: ZIMSEC Paper 2 Section A (physical environment), environmental management (1 × 25 marks).
import { concept, P, ZIM, geographyLevels } from "../lib.mjs";

const RES = "**Table 1: Changes in a fictional communal ward in southern Zimbabwe (fictional data)**\n\n| Year | Woodland cover (% of ward) | Number of cattle | Number of active gullies |\n|---|---|---|---|\n| 1990 | 62 | 1,800 | 4 |\n| 2000 | 48 | 2,600 | 9 |\n| 2010 | 35 | 3,400 | 15 |\n| 2020 | 24 | 4,100 | 22 |\n\n**Additional information (fictional):** a small irrigation dam downstream of the ward was built with a capacity of 3,000,000 m³. A survey in 2020 found that it could hold only 2,250,000 m³. Villagers report that veld fires now sweep through the ward almost every September.";

concept("geo.environment.land-degradation", { file: "exam/zim-p2-a-environment", keyPrefix: "exam.zim-p2-a-environment", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.environment.land-degradation", "geo.environment.pollution-waste", "geo.environment.management-laws"],
    stem: `Study Table 1 and the additional information.\n\n${RES}`,
    hints: ["Quote years and figures from the table.", "For the last part, choose a real town and give specific detail."],
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "In which ten-year period did woodland cover fall by the largest amount?", options: [
        ["1990 to 2000", "Correct: a fall of 14 percentage points (62 to 48)."],
        ["2000 to 2010", "A fall of 13 percentage points (48 to 35)."],
        ["2010 to 2020", "A fall of 11 percentage points (35 to 24)."],
        ["The fall was the same in every period", "The falls were 14, 13 and 11 percentage points."],
      ], answer: "A", explanation: "62 − 48 = 14; 48 − 35 = 13; 35 − 24 = 11. The largest fall was 1990 to 2000." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage increase in the number of cattle between 1990 and 2020. Give your answer to one decimal place.", value: 127.8, unit: "%", tol: 0.1, answer: "127.8", wrong: [56.1, 2300], explanation: "Increase = 4,100 − 1,800 = 2,300; 2,300 ÷ 1,800 × 100 = 127.8 %." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe the relationship between the number of cattle and the number of active gullies.", points: [
        "As the number of cattle increases, the number of gullies increases (a positive relationship).",
        "Uses data, e.g. 1,800 cattle and 4 gullies in 1990 rising to 4,100 cattle and 22 gullies in 2020.",
        "Notes that gullies rose more than fivefold while cattle only a little more than doubled / the increase is steady each decade.",
      ], explanation: "State the relationship, support it with figures and add a further observation." }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain how the changes shown in Table 1 and the veld fires could have led to the increase in gullies.", points: [
        "Overgrazing by more cattle removes grass cover, leaving soil bare.",
        "Cattle tracks running downhill concentrate runoff, which deepens into rills and gullies.",
        "Loss of woodland removes roots that bind the soil and leaves that intercept rain.",
        "Fires in September leave the ground bare when the first heavy storms of the rainy season arrive.",
      ], explanation: "Four linked explanations, each tied to the resource." }),
      P.num({ label: "(e)", marks: 2, stem: "Calculate the percentage of the dam's original capacity that has been lost.", value: 25, unit: "%", tol: 0.1, wrong: [75, 33.3], explanation: "Lost = 3,000,000 − 2,250,000 = 750,000 m³; 750,000 ÷ 3,000,000 × 100 = 25 %." }),
      P.short({ label: "(f)", marks: 1, stem: "Name the Zimbabwean agency that can fine people for starting veld fires.", accepted: ["Environmental Management Agency", "EMA", "the Environmental Management Agency", "Environment Management Agency"], wrong: ["ZINWA"], explanation: "The **Environmental Management Agency (EMA)** enforces the Environmental Management Act, including rules on veld fires." }),
      P.manual({ label: "(g)", marks: 3, stem: "Outline **three** measures that could reduce soil erosion in the ward.", points: [
        "Controlled or rotational grazing / reducing herd sizes so that grass recovers.",
        "Gully reclamation with stone or brushwood check dams, gabions and grass planting.",
        "Fireguards, woodlots or afforestation, or contour ridges / conservation agriculture.",
      ], explanation: "Three distinct measures, each matched to the problem." }),
      P.manual({
        label: "(h)", marks: 9, type: "EXTENDED_RESPONSE",
        stem: "With reference to a named urban area in Zimbabwe, explain the causes and effects of pollution and poor waste management, and evaluate the measures taken to reduce them.",
        points: [
          ["Named urban area with located detail (e.g. Harare: Pomona dumpsite, Mukuvisi or Marimba rivers, Lake Chivero; Chitungwiza; Bulawayo).", 1],
          ["Cause explained: rapid urban growth outpacing refuse collection and sewage treatment.", 1],
          ["Further cause explained (e.g. shortage of trucks and fuel; industrial effluent; burst sewers; illegal dumping and burning).", 1],
          ["Social effect (e.g. cholera outbreak of 2008-2009, typhoid, respiratory illness).", 1],
          ["Economic effect (e.g. higher water-treatment costs, health costs, lost working days).", 1],
          ["Physical effect (e.g. eutrophication and water hyacinth in Lake Chivero, blocked drains and flooding, contaminated soils).", 1],
          ["Measure 1 described and evaluated (e.g. EMA licences and fines; council clean-ups and by-laws).", 1],
          ["Measure 2 described and evaluated (e.g. recycling by waste pickers; 2017 ban on polystyrene containers; national clean-up day).", 1],
          ["Overall judgement on how effective the measures have been.", 1],
        ],
        levels: geographyLevels(9),
        modelAnswer: "Harare's population has grown much faster than its water, sewage and refuse services. Sewage works are often overloaded or broken, so partly treated sewage and industrial effluent flow into rivers such as the Mukuvisi and Marimba, which drain towards Lake Chivero, the city's main water source. The council lacks enough refuse trucks and fuel, so in many high-density suburbs refuse is collected irregularly and residents dump or burn it. Collected waste goes to Pomona, an open dump rather than a sanitary landfill.\n\nThe effects are serious. In 2008-2009 cholera spread through Harare and Chitungwiza, helped by burst sewers, broken water supplies and uncollected refuse, and typhoid outbreaks have followed. Smoke from burning refuse causes respiratory illness. Economically, the city spends heavily on chemicals to treat polluted water from Lake Chivero, and illness means lost working days. Physically, nutrients in the lake cause algal blooms and water hyacinth, litter blocks drains and causes flash flooding, and leachate from dumps contaminates soil and groundwater.\n\nSeveral measures have been used. EMA licenses effluent discharges and can fine polluters, but it has limited staff, and fines are often lower than the cost of treatment, so pollution continues. The 2017 ban on expanded polystyrene food containers reduced one common type of litter, and the national clean-up day encourages community action, but clean-ups remove waste without stopping it being produced. Informal waste pickers recycle plastics and metals, which reduces waste and provides incomes, though only a small share is recycled.\n\nOverall, the measures have had limited success because they treat symptoms. Lasting improvement needs investment in sewage works and refuse collection, separation and composting of waste at source, and consistent enforcement of the law.",
        explanation: "Level 3 answers explain causes and effects with specific detail for a named area and evaluate at least two measures before reaching a judgement.",
      }),
    ],
    explanation: "ZIMSEC Paper 2 Section A style question on land degradation, pollution and environmental management.",
  });
});
