// Slice G2b: river opportunities, flood causes, impacts and management.
import { concept, P, ZIM, CAM, geographyLevels } from "../lib.mjs";

const FLOODS = "**Table 1: Largest annual floods at a fictional gauging station (29 years of records)**\n\n| Rank | Year | Peak discharge (m³/s) |\n|---|---|---|\n| 1 | 2021 | 2,480 |\n| 2 | 2001 | 2,150 |\n| 3 | 2013 | 1,720 |\n| 4 | 1996 | 1,390 |\n| 5 | 2008 | 1,210 |";

const OPTIONS = "**Table 2: Flood management options proposed for a fictional district on a river floodplain**\n\n| Option | Estimated cost (US\\$ million) | Notes |\n|---|---|---|\n| A: Earth levées along 12 km of river | 18 | Protects 2 villages and 1,500 ha of irrigated land |\n| B: Community early warning (rain gauges, radios, sirens) | 0.6 | Covers 40 villages; volunteers trained |\n| C: Replanting 3,000 ha of the steep upper catchment | 4.5 | Benefits after 5-10 years; reduces silting of a small dam |\n| D: Moving 300 households to higher ground | 7.5 | Families keep their floodplain fields for dry-season farming |";

concept("geo.rivers.flooding", { file: "rivers/flooding", keyPrefix: "rivers.flooding" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **soft engineering** method of flood management?",
    options: [
      ["Floodplain zoning", "Correct: it controls land use rather than the river."],
      ["Building a dam", "A dam is a hard engineering structure."],
      ["Raising levées", "Levées are built structures: hard engineering."],
      ["Concrete channelisation", "Lining a channel with concrete is hard engineering."],
    ],
    answer: "A",
    explanation: "Soft engineering works with natural processes or manages people's use of land, e.g. **zoning**, afforestation and warnings.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an **opportunity** of living on a river floodplain?",
    options: [
      ["Fertile alluvial soils for farming", "Correct: floods leave fresh silt."],
      ["Frequent water-borne disease", "This is a hazard, not an opportunity."],
      ["Damage to roads and bridges", "This is a hazard of floods."],
      ["Steep slopes for terraces", "Floodplains are flat, not steep."],
    ],
    answer: "A",
    explanation: "Floodplains offer fertile alluvium, flat land and water, which is why so many people live there despite the risk.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does **deforestation** in a drainage basin increase flood risk?",
    options: [
      ["Less interception and infiltration, so more rapid run-off", "Correct: water reaches the river faster and in greater volume."],
      ["Trees normally add water to rivers, so floods become larger", "Trees take up water and release it by transpiration; removing them does not add water."],
      ["Cleared land raises the water table to the surface everywhere", "This is not the main mechanism; run-off is."],
      ["Deforestation increases rainfall over the basin", "Removing trees does not increase local rainfall."],
    ],
    answer: "A",
    explanation: "Without trees, less rain is caught by leaves and less soaks in, so more overland flow reaches the river quickly, shortening lag time and raising the peak.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can **channelisation** increase flooding further downstream?",
    options: [
      ["Water passes through faster and arrives downstream sooner", "Correct: the problem is moved, not removed."],
      ["Concrete channels absorb water and release it later", "Concrete is impermeable; it absorbs nothing."],
      ["It adds sediment that blocks the channel downstream", "Channelisation usually reduces sediment supply from banks."],
      ["It increases rainfall in the lower basin", "Engineering does not change rainfall."],
    ],
    answer: "A",
    explanation: "Straightened, smooth channels speed up the water. Upstream places drain faster, but the flood peak reaches downstream areas sooner and higher.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which disease risk usually **increases** after a flood?",
    options: [
      ["Cholera", "Correct: sewage contaminates drinking water."],
      ["Lung cancer", "This is not linked to floods."],
      ["Diabetes", "This is not linked to floods."],
      ["Measles only", "Measles spreads person to person; cholera is the classic flood disease."],
    ],
    answer: "A",
    explanation: "Floods spread sewage into wells and rivers, so water-borne diseases such as **cholera** and diarrhoea rise; standing water also breeds mosquitoes (malaria).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: "In the Limpopo floods of 2000, why was southern Mozambique so badly affected?",
    options: [
      ["It is low, flat land downstream of several countries", "Correct: floodwater from the whole shared basin arrived there."],
      ["It had the steepest slopes of anywhere in the Limpopo basin", "The lower Limpopo is flat floodplain, not steep land."],
      ["No rain fell in the upper basin that year", "Heavy rain fell across southern Africa, including the upper basin."],
      ["Its rivers flow north, away from the sea", "The Limpopo flows east into the Indian Ocean."],
    ],
    answer: "A",
    explanation: "Weeks of heavy rain and then Cyclone Eline fell across the basin shared by South Africa, Botswana, Zimbabwe and Mozambique. All that water reached the flat, low-lying lower valley in Mozambique.",
    hints: ["Think about Mozambique's position in the basin.", "What is the relief of a lower-course floodplain?"],
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is the strongest argument for early warning systems in a low-income rural district?",
    options: [
      ["They are cheap and save lives, though property is still damaged", "Correct: a balanced judgement of a low-cost method."],
      ["They stop rivers from overflowing their banks", "Warnings do not change the river's flow."],
      ["They remove the need for any other flood measures", "Warnings reduce deaths but not damage; other measures still help."],
      ["They work even when no one hears or acts on the warning", "Warnings only work if people receive and act on them."],
    ],
    answer: "A",
    explanation: "Warnings are low-cost and very effective at saving lives, but they do not reduce damage to crops and homes and depend on communication and trust.",
    hints: ["What can a warning do, and what can it not do?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A town builds high levées along its river. Twenty years later a much larger flood breaches them. Why can the damage be **worse** than if there had been no levées?",
    options: [
      ["People built on land thought safe, and held-back water escapes suddenly", "Correct: a false sense of security plus sudden release."],
      ["Levées force the river to carry less water during large floods", "Levées hold more water in the channel, not less."],
      ["Levées make rainfall heavier over the town", "Engineering does not affect rainfall."],
      ["Levées lower the river bed, so the river runs dry", "Deposition behind levées often raises the bed rather than lowering it."],
    ],
    answer: "A",
    explanation: "Protected land attracts more building. When a levée fails, water held at a high level rushes out quickly, often flooding deeper than before.",
    hints: ["How do people behave once they feel protected?", "What happens when water held high is released suddenly?"],
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A gauging station has 49 years of records. A flood ranked 5th largest is being studied. Calculate its recurrence interval using (n + 1) ÷ m.",
    value: 10, unit: "years",
    wrong: [9.8, 245],
    explanation: "(49 + 1) ÷ 5 = 50 ÷ 5 = 10 years.",
    workedSolution: "1. n = 49 years of record; m = rank 5.\n2. n + 1 = 50.\n3. Recurrence interval = 50 ÷ 5 = 10 years.",
    hints: ["n is the number of years of record; m is the rank."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Methods that build structures to control a river are called {{blank:a}} engineering. Methods that work with natural processes are called {{blank:b}} engineering.",
    blanks: [
      { id: "a", accepted: ["hard"], choices: ["hard", "soft"] },
      { id: "b", accepted: ["soft"], choices: ["hard", "soft"] },
    ],
    explanation: "**Hard** engineering builds structures (dams, levées); **soft** engineering manages land and people (zoning, afforestation, warnings).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each flood management method with how it works.",
    pairs: [
      ["Dam and reservoir", "Stores floodwater and releases it slowly"],
      ["Levée", "Raises the banks so the channel holds more water"],
      ["Afforestation", "Increases interception and infiltration in the catchment"],
      ["Floodplain zoning", "Keeps homes off the highest-risk land"],
      ["Early warning", "Gives people time to move to safety"],
    ],
    explanation: "The first two are hard engineering; the last three are soft.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Floods can bring benefits as well as hazards.",
    answer: true,
    explanation: "True. Floods deposit fertile silt on floodplains and recharge groundwater and wetlands.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A '1-in-20-year flood' cannot happen two years in a row.",
    answer: false,
    explanation: "False. The recurrence interval is an average; such a flood has about a 5 % chance in any year, so two in a row is possible.",
  });
  b.short({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Name the tropical cyclone that caused flash floods and landslides in Chimanimani and Chipinge districts in March 2019.",
    accepted: ["Idai", "Cyclone Idai", "Tropical Cyclone Idai"],
    wrong: ["Eline"],
    explanation: "**Cyclone Idai** (March 2019) brought extreme rain to eastern Zimbabwe.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** natural causes of river flooding.",
    points: [
      "Cause 1 named (e.g. intense or prolonged rainfall / a tropical cyclone).",
      "Explanation 1 (e.g. rain falls faster than it can infiltrate, so overland flow rises quickly).",
      "Cause 2 named (e.g. saturated soils / steep slopes / impermeable rock).",
      "Explanation 2 (e.g. saturated soil cannot absorb more water, so all further rain runs off to the river).",
    ],
    modelAnswer: "Intense rainfall, such as from a tropical cyclone, falls faster than the soil can absorb it, so most of it runs over the surface straight into rivers and they overflow. Saturated soils after weeks of rain cannot hold any more water, so further rain runs off rapidly, shortening the lag time and raising the peak discharge.",
    explanation: "Two causes, each with an explanation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4, applies: ZIM,
    stem: "Describe the measures that communities and the government in Zimbabwe can take to reduce the effects of floods in low-lying areas such as Muzarabani.",
    points: [
      "Early warning: monitoring rainfall and river levels and passing warnings by radio, phone or community committees.",
      "Evacuation plans and safe sites on higher ground; relocation of the most exposed households.",
      "Building houses and stores on raised ground or plinths; keeping food and seed above flood level.",
      "Catchment conservation (tree planting, contour ridges) / small dams and maintenance of drains and bridges.",
    ],
    modelAnswer: "Rain and river levels can be monitored so that warnings reach villages by radio, mobile phone and local civil protection committees. Families can follow evacuation plans to safe places on higher ground, and the most exposed households can be resettled. Houses, granaries and clinics can be built on raised ground, and seed kept above flood level. In the catchment, tree planting and contour ridges reduce run-off and silting.",
    explanation: "Credit four distinct, practical measures.",
    hints: ["Think before, during and after a flood."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "'Soft engineering is a more sustainable way of managing river floods than hard engineering.' To what extent do you agree? Refer to examples.",
    points: [
      ["Hard engineering described (dams, levées, channelisation) with how it reduces floods.", 1],
      ["Advantages of hard engineering (protects towns and farmland; dams give water/HEP, e.g. Kariba).", 1],
      ["Disadvantages: cost, displacement (e.g. Tokwe-Mukosi evacuation 2014), sediment trapping, failure risk, moving the flood downstream.", 1],
      ["Soft engineering described (zoning, afforestation, wetlands, early warning).", 1],
      ["Advantages: cheap, works with nature, long-lasting, other benefits (less soil erosion).", 1],
      ["Limitations: slow to work, does not stop large floods, hard to enforce zoning, damage still happens.", 1],
      ["Judgement: e.g. soft is usually more sustainable, but a combination is best where large towns need protection.", 1],
    ],
    levels: geographyLevels(7),
    modelAnswer: "Hard engineering such as dams, levées and channelisation controls the river directly. Large dams like Kariba store floodwater and also provide hydro-electric power and water. However, they are very expensive, flood large areas and displace people, as when thousands of families were evacuated from the Tokwe-Mukosi basin in 2014. They trap sediment, starving deltas downstream, and if they fail or must release water the floods can be severe. Levées and channelisation protect one place but often move the problem downstream and give a false sense of security.\n\nSoft engineering includes floodplain zoning, afforestation, wetland restoration and early warning. These are cheaper, work with natural processes and bring other benefits: replanting slopes reduces soil erosion and silting of dams, and warnings, as developed along the Limpopo in Mozambique after the 2000 floods, save lives at low cost. They are more sustainable because they need little maintenance and do not damage ecosystems. However, they work slowly, cannot prevent very large floods, and zoning is hard to enforce where people depend on fertile floodplain land.\n\nI largely agree: soft engineering is usually more sustainable, especially in LICs where money for maintenance is scarce. But where cities or major infrastructure are at risk, a combination of some hard protection with soft measures is the most effective approach.",
    explanation: "Level 3 answers weigh both approaches with examples and give a supported conclusion.",
    hints: ["Define sustainable: long-lasting, affordable, not harming the environment or people.", "Use one example for each approach."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 1.\n\n${FLOODS}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the recurrence interval of the 2001 flood using (n + 1) ÷ m.", value: 15, unit: "years", wrong: [14.5, 30], explanation: "(29 + 1) ÷ 2 = 15 years." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the recurrence interval of the 2021 flood.", value: 30, unit: "years", wrong: [29], explanation: "(29 + 1) ÷ 1 = 30 years." }),
      P.num({ label: "(c)", marks: 1, stem: "By how much was the 2021 peak greater than the 2008 peak?", value: 1270, unit: "m³/s", wrong: [3690], explanation: "2,480 − 1,210 = 1,270 m³/s." }),
      P.manual({ label: "(d)", marks: 3, stem: "Three of the five largest floods occurred after 2005. Suggest reasons why large floods may be becoming more frequent in this basin.", points: [
        "Human change in the catchment (deforestation, overgrazing or urban growth) increases run-off and shortens lag time.",
        "Silting of the channel or dams reduces their capacity.",
        "Climate change may be making intense rainfall events (e.g. cyclones) more frequent or stronger.",
      ], explanation: "Credit three distinct, developed reasons." }),
    ],
    hints: ["n = 29 years; m = rank.", "Think about land use and climate."],
    explanation: "Practice with flood frequency data.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: `Study Table 2.\n\n${OPTIONS}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the cost of option D per household.", value: 25000, unit: "", wrong: [2500, 40], explanation: "US\\$7.5 million ÷ 300 = US\\$25,000 per household." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the cost of option B per village.", value: 15000, unit: "", wrong: [1500, 24], explanation: "US\\$0.6 million ÷ 40 = US\\$15,000 per village." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which option is soft engineering that reduces flood peaks at their source in the catchment?", options: [
        ["Option C", "Correct: replanting increases interception and infiltration."],
        ["Option A", "Levées are hard engineering along the river."],
        ["Option B", "Warnings reduce harm but do not change flood peaks."],
        ["Option D", "Moving households reduces exposure but not the flood itself."],
      ], answer: "A", explanation: "Replanting the upper catchment slows run-off, so it reduces flood peaks." }),
      P.manual({ label: "(d)", marks: 3, stem: "Give **one** advantage and **two** disadvantages of option A.", points: [
        "Advantage: protects the villages and irrigated land from most floods.",
        "Disadvantage: most expensive option (US\\$18 million) and needs maintenance.",
        "Disadvantage: may be overtopped or breached in large floods / moves floodwater downstream / false sense of security.",
      ], explanation: "One advantage and two disadvantages." }),
      P.manual({ label: "(e)", marks: 4, stem: "Recommend the best **combination** of two options for the district. Justify your choice.", points: [
        "Two options chosen.",
        "Justification using cost from the table (e.g. B is very cheap per village).",
        "Justification using effectiveness or time (e.g. B saves lives now; C reduces floods and silting in the long term).",
        "Sustainability or fairness considered (e.g. D lets families keep fields but needs consent; A protects few for high cost).",
      ], explanation: "Credit a reasoned choice using the data." }),
    ],
    hints: ["Divide the cost by the number of households or villages.", "Compare cost, speed and sustainability."],
    explanation: "Practice in evaluating flood management options.",
  });
  b.card("DEFINITION", "Flood", "River discharge exceeds channel capacity, so water overflows onto normally dry land.");
  b.card("CONCEPT", "Natural causes of floods", "Intense or prolonged rain (cyclones), saturated soil, steep slopes, impermeable rock, flat low-lying land.");
  b.card("CONCEPT", "Human causes of floods", "Deforestation, overgrazing, urbanisation, silting of channels and dams, floodplain settlement, dam releases.");
  b.card("CONCEPT", "Hard engineering", "Dams, levées, channelisation, relief channels. Effective locally but costly; may move the problem downstream.");
  b.card("CONCEPT", "Soft engineering", "Afforestation, floodplain zoning, wetland restoration, early warning, preparation. Cheaper and more sustainable.");
  b.card("DEFINITION", "Recurrence interval", "(n + 1) ÷ m: n = years of record, m = rank. Average time between floods of that size.");
  b.card("FACT", "Limpopo floods 2000", "Mozambique: weeks of rain then Cyclone Eline; Chokwe and Xai-Xai flooded; about 700 deaths (estimate); helicopter rescues.");
  b.card("FACT", "Tokwe-Mukosi 2014", "Heavy rain filled the basin behind the unfinished dam (Masvingo Province); thousands of families evacuated, many to Chingwizi.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Evaluating flood management", "Deaths prevented, damage reduced, cost, who gains and loses, moves the problem?, sustainable?");
});
