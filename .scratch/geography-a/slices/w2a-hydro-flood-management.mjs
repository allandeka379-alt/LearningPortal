// W2a: hydro.flood-management (both boards; hypothesis testing on floods is ZIMSEC detail, the recent flood Cambridge detail).
// Numbers computed: recurrence interval, probability, chance over a period, share of houses, benefit-cost ratio
// (see tables/w2a-hydro-flood-management.mjs).
import { concept, P, geographyLevels, chk, rnd, recurrenceInterval } from "../lib.mjs";
import { mc, tbl } from "../tables/w2a-_q.mjs";

// Struct 1: ranked annual maxima, n = 24 (illustrative)
const N = 24;
const PEAKS = [[1, 612], [2, 574], [3, 531], [4, 497], [5, 462]];
const T = PEAKS.map(([m]) => recurrenceInterval(N, m));
const t1 = chk(T[0], 25, 1e-9);
const t3 = rnd(T[2], 2, 8.33, "t3");
const prob2 = chk(100 / T[1], 8, 1e-9);
// Struct 2: hazard zones
const ZONES = [["In the 1-in-10-year flood zone", 340, 1, 2], ["Between the 1-in-10 and 1-in-100-year zones", 560, 1, 3], ["Outside the 1-in-100-year zone", 2100, 3, 9]];
const totalHouses = chk(340 + 560 + 2100, 3000);
const pctRisk = chk(((340 + 560) / totalHouses) * 100, 30, 1e-9);
const ZT = tbl(["Zone", "Houses", "Clinics", "Schools"], ZONES);
// Singles
const t4 = rnd(recurrenceInterval(24, 4), 2, 6.25, "t4");
const prob40 = chk(100 / 40, 2.5, 1e-9);
const ch10 = rnd((1 - (1 - 1 / 20) ** 10) * 100, 1, 40.1, "ch10");

concept("ageo.hydro.flood-management", { file: "hydro/flood-management", keyPrefix: "hydro.flood-management" }, (b) => {
  mc(b, 2, "RECALL", "Which of these is an example of **soft engineering** for river floods?", [
    ["Planting trees across the catchment", "Correct: it works with natural processes to slow runoff."],
    ["Building a dam across the river", "A dam is a hard-engineering structure."],
    ["Straightening a meandering channel", "Channelisation is hard engineering."],
    ["Raising the banks with artificial levees", "Embankments are hard engineering."],
  ], "**Afforestation, wetlands, zoning and warnings** are soft engineering.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What does a **1-in-50-year flood** mean?", [
    ["A flood with a 2% chance of being equalled or exceeded in any year", "Correct: 1 ÷ 50 = 0.02."],
    ["A flood that happens at regular intervals, exactly once every 50 years", "It is an average, not a timetable."],
    ["A flood that cannot happen again for 50 years", "A second one may occur next year."],
    ["A flood that lasts for 50 days", "The recurrence interval says nothing about duration."],
  ], "The annual probability is **1 ÷ T**.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the main purpose of a flood hazard map?", [
    ["To show which areas are at risk so that planning and evacuation can be organised", "Correct: it supports land-use planning and emergency plans."],
    ["To record the daily rainfall and river height at every gauging station in the basin", "That is a monitoring record, not a map of risk zones."],
    ["To show the best places for new dams only", "Hazard maps show risk zones, not only dam sites."],
    ["To predict the exact hour of every future flood", "They show risk zones, not exact timing."],
  ], "Hazard maps show **where and how likely** flooding is.");
  mc(b, 3, "APPLICATION", "A town builds high embankments along its river. What is a likely disadvantage?", [
    ["Water levels may rise downstream, and a breach could be disastrous", "Correct: the river is confined and the flood is pushed on."],
    ["The river will carry less sediment than before", "That is not a typical disadvantage."],
    ["Trees will be planted that slow down the water", "Trees are soft engineering."],
    ["Flood warnings will no longer be possible because the river is confined", "Warnings are still possible: embankments do not stop forecasting."],
  ], "Embankments can **increase risk downstream** and give a false sense of safety.", { hints: ["What happens to the water that can no longer spread out?"] });
  mc(b, 3, "ANALYSIS", "Which is the main reason why dams are not a complete solution to flooding?", [
    ["A full reservoir cannot store more water, and the cost and loss of land are high", "Correct: protection is limited by capacity and by cost and displacement."],
    ["Dams increase the speed of the river below", "Dams usually lower the peak."],
    ["Dams cannot be used to store water for supply or to generate electricity in a valley", "Many dams store water for supply and generate power."],
    ["Dams are always built on floodplains", "Dams are built in valleys, usually upstream."],
  ], "Dams are costly, flood land, trap sediment and give no protection once full.", { hints: ["Think about capacity and cost."] });
  mc(b, 3, "APPLICATION", "Which change makes a flood warning more useful?", [
    ["Sending it early, by several channels, with clear advice and a safe place to go", "Correct: people need time, understanding and somewhere to go."],
    ["Sending it only after the peak has passed", "A late warning cannot save lives or property."],
    ["Issuing it only in a technical form that few people at risk can understand or act on", "A warning must be understood by the people at risk."],
    ["Sending it only to national government offices", "It must reach people at risk."],
  ], "Timeliness, clarity and a plan make warnings effective.", { hints: ["What does a person at risk need?"] });
  mc(b, 2, "RECALL", "Which instrument records the height of water in a river at a gauging station?", [
    ["A stage recorder or staff gauge", "Correct: height (stage) is converted to discharge with a rating curve."],
    ["A standard tipping-bucket rain gauge", "A rain gauge measures rainfall, not river height."],
    ["An anemometer", "An anemometer measures wind speed."],
    ["A seismograph", "A seismograph records earthquakes."],
  ], "River **stage** is recorded at gauging stations.");

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A 1-in-100-year flood cannot happen twice in two successive years.", answer: false,
    feedbackFalse: "Correct: the probability each year is 1%, regardless of the last flood.", feedbackTrue: "Not so: it is a probability, not a timetable.",
    explanation: "Each year has a **1% chance**; two years in a row is unlikely but possible." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Floodplain zoning reduces flood damage by keeping buildings away from the areas most at risk.", answer: true,
    feedbackTrue: "Correct: it reduces exposure.", feedbackFalse: "Not so: reducing exposure reduces damage.",
    explanation: "Zoning is a soft-engineering measure that lowers exposure." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each management strategy to how it reduces flood risk.",
    pairs: [
      ["Dam and reservoir", "Stores floodwater and releases it slowly"],
      ["Afforestation", "Increases interception and infiltration"],
      ["Floodplain zoning", "Keeps buildings out of flood-prone land"],
      ["Diversion spillway", "Carries excess water around a town"],
      ["Flood warning", "Gives people time to move to safety"],
    ], explanation: "Each strategy reduces the peak flow, the exposure or the vulnerability." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A raised bank built to keep water in the channel is an {{blank:a}}. A short, straightened channel carries water {{blank:b}} than a meandering one. Actions taken before a hazard to reduce impacts are {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["embankment"], choices: ["embankment", "bluff", "spillway"] },
      { id: "b", accepted: ["faster"], choices: ["faster", "slower", "more slowly"] },
      { id: "c", accepted: ["mitigation"], choices: ["mitigation", "recovery", "response"] },
    ], explanation: "Embankments confine the river; channelisation speeds the flow; mitigation comes before the hazard." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the formula used for the recurrence interval T from n years of record and rank m (give it in words or symbols).",
    accepted: ["(n+1)/m", "(n + 1) / m", "(n+1) ÷ m", "(n + 1) ÷ m", "t = (n+1)/m", "weibull", "n+1 divided by m", "(n+1)/rank"], explanation: "$T = (n + 1) \\div m$ (the Weibull formula)." });

  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "years", daily: true,
    stem: "A river has 24 years of annual maximum discharges. A flow of 497 m³/s is the 4th largest. Calculate its recurrence interval, in years to 2 decimal places.",
    hints: ["T = (n + 1) ÷ m."],
    value: t4, dp: 2, wrong: [6, 4.8],
    explanation: "T = (24 + 1) ÷ 4 = **6.25 years**. The value 6 uses n instead of n + 1." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A flood has a recurrence interval of 40 years. What is the chance of it being equalled or exceeded in any one year, as a percentage?",
    hints: ["Probability = 1 ÷ T."],
    value: prob40, wrong: [40, 0.025],
    explanation: "1 ÷ 40 = 0.025 = **2.5%**. The value 0.025 is the proportion, not the percentage." });
  b.calc({ d: 4, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A 1-in-20-year flood has a 5% chance in any year. Calculate the chance of at least one such flood in a 10-year period, as a percentage to 1 decimal place.",
    hints: ["Chance of none in one year = 0.95.", "None in 10 years = 0.95¹⁰."],
    value: (1 - 0.95 ** 10) * 100, dp: 1, wrong: [50, 59.9],
    explanation: "1. Chance of no flood in a year = 1 − 0.05 = 0.95.\n2. Chance of none in 10 years = 0.95¹⁰ = 0.599.\n3. Chance of at least one = 1 − 0.599 = 0.401, so **40.1%**. The value 50 adds 5% ten times; 59.9 is the chance of no flood." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a flood warning system reduces the harm caused by a flood.",
    hints: ["Think about rainfall data, travel time and what people can do with the time."],
    points: [
      "Rain gauges and gauging stations upstream provide data on rainfall and river height.",
      "The lag time and rate of rise are used to forecast when and how high the peak will arrive downstream.",
      "Warnings by radio, SMS or sirens give people time to move to safe ground, taking livestock and valuables.",
      "Authorities can prepare the evacuation of people and the closing of roads, and emergency services can be positioned, so fewer lives are lost.",
    ],
    modelAnswer: "Gauging stations and rain gauges upstream measure rainfall and river height. Using the lag time, forecasters estimate when and how high the peak will reach a town downstream. Warnings by radio, SMS or sirens give people time to move to safe ground with livestock and valuables, and the authorities can organise evacuation and rescue, so fewer lives are lost.",
    explanation: "Data, forecast, warning and response link together." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Evaluate the use of afforestation as a way to reduce river floods.",
    hints: ["Give strengths, a limitation and a judgement."],
    points: [
      "Trees increase interception and infiltration, so runoff falls and the lag time lengthens.",
      "It is cheap, sustainable and has other benefits such as timber, habitats and soil protection.",
      "It takes years to take effect and has little effect on very large, prolonged storms with saturated soils.",
      "Judgement: effective as part of a basin-wide plan, but not enough alone for a large flood.",
    ],
    modelAnswer: "Trees intercept rain and increase infiltration, so runoff falls and the lag time lengthens. It is cheap and sustainable and also protects soils and habitats. However, it takes years to work and has limited effect in a very large storm when soils are saturated. It is therefore useful as part of a basin-wide plan but not enough on its own.",
    explanation: "Weigh strengths against limitations and reach a judgement." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why a flood-prevention scheme that works for a small flood may fail in a very large one.",
    hints: ["Think about design standards."],
    points: [
      "Structures are designed for a stated size of flood (a return period); a larger flood overtops or overwhelms them.",
      "A full reservoir cannot store more, and embankments may be overtopped or breached.",
      "People may feel safe and build behind the defences, so more property is exposed when they fail.",
    ],
    modelAnswer: "Embankments and dams are designed for a flood of a certain size. A larger flood overtops the embankment or fills the reservoir. People may have built behind the defences because they felt safe, so the damage is greater when the structure fails.",
    explanation: "Defences have a design limit and may encourage development." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a community may recover after a flood.",
    points: [
      "Repair or rebuild homes, roads, bridges, power and water supply, preferably to a safer standard or on higher ground.",
      "Provide food, health care and clean water and support livelihoods through grants, seeds or work programmes.",
      "Review the response and improve warnings, planning and preparation for the next flood.",
    ],
    modelAnswer: "Infrastructure such as homes, roads, bridges and water supplies is repaired or rebuilt, preferably to a safer standard. Food, health care and support for livelihoods are provided, and the community reviews the response and improves its warnings and planning.",
    explanation: "Recovery covers infrastructure, livelihoods and learning." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Annual maximum discharges were recorded for ${N} years on a river in Zimbabwe. The five largest are shown (illustrative data, invented for this exercise). The recurrence interval is calculated with T = (n + 1) ÷ m.\n\n${tbl(["Rank (m)", "Annual maximum discharge (m³/s)"], PEAKS)}`,
    hints: ["n = 24 years of record.", "Probability = 1 ÷ T."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the recurrence interval of the largest flow, in years.", value: t1, unit: "years", wrong: [24, 1],
        explanation: "T = (24 + 1) ÷ 1 = 25 years." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the recurrence interval of the 3rd largest flow (531 m³/s), in years to 2 decimal places.", value: t3, dp: 2, unit: "years", wrong: [8, 7.67],
        explanation: "T = 25 ÷ 3 = 8.33 years. The value 8 uses n instead of n + 1 and is rounded down." }),
      P.num({ label: "(c)", marks: 1, stem: "The 2nd largest flow (574 m³/s) has a recurrence interval of 12.5 years. What is the chance of it being equalled or exceeded in any one year, as a percentage?", value: prob2, unit: "%", wrong: [12.5, 0.08],
        explanation: "1 ÷ 12.5 = 0.08 = 8%." }),
      P.mcq({ label: "(d)", marks: 1, stem: "Which statement about the 25-year recurrence interval is correct?", options: [
        ["A flow of 612 m³/s or more has a 4% chance of occurring in any year", "Correct: 1 ÷ 25 = 0.04."],
        ["A flow of 612 m³/s will occur exactly every 25 years", "It is an average, not a timetable."],
        ["A flow of 612 m³/s will not occur again for 25 years", "It could occur in the next year."],
        ["Every year has a flow of at least 612 m³/s", "612 m³/s is the largest value recorded."],
      ], answer: "A", explanation: "The annual probability is 4%." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest why a record of 24 years is not enough to be sure about the size of a 1-in-100-year flood.",
        points: [
          "The record is much shorter than 100 years, so the largest event may not be in it.",
          "The flood is estimated by extrapolating from the data, which is uncertain.",
          "Climate and land use change over time, so the past record may not represent the future.",
        ],
        modelAnswer: "A 24-year record is much shorter than 100 years, so a flood of that size may not be in it, and its size must be estimated by extrapolation, which is uncertain. Changes in climate and land use also mean that past records may not describe the future.",
        explanation: "Short records and change reduce reliability." }),
      P.manual({ label: "(f)", marks: 4, stem: "Assess the value of a flood warning system for a town on this river.",
        points: [
          "Warnings can be issued from upstream gauging stations using the lag time, giving time to evacuate people and livestock.",
          "They are cheap compared with a dam or embankment and reduce loss of life.",
          "They cannot protect buildings and land, and depend on communication, trust and a safe place to go.",
          "Judgement: valuable and cost-effective, but best combined with planning and defences.",
        ],
        modelAnswer: "Upstream gauging stations and the lag time allow warnings that give people time to move themselves and their livestock, and the system costs far less than a dam. It cannot protect buildings or fields, and it depends on warnings being received, understood and trusted. It is valuable but best combined with zoning and some defences.",
        explanation: "Weigh benefits and limits, then give a judgement." }),
    ], explanation: "Calculate recurrence intervals and probabilities and judge a warning system." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `A flood hazard map of a river town shows three zones (illustrative data, invented for this exercise).\n\n${ZT}`,
    hints: ["Add the houses in the two flood zones first.", "Then divide by the total number of houses."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of all the houses that are inside the 1-in-100-year flood zone (including the 1-in-10-year zone).", value: pctRisk, unit: "%", wrong: [11.3, 18.7],
        explanation: "340 + 560 = 900 houses; total 3 000; 900 ÷ 3 000 × 100 = 30%. The value 11.3 counts only the inner zone." }),
      P.manual({ label: "(b)", marks: 2, stem: "Suggest two ways in which the council could use the map to reduce flood risk.",
        points: [
          "Refuse permission for new houses, schools and clinics in the flood zones (zoning).",
          "Plan evacuation routes and shelters, and put warnings and flood-proofing where the risk is highest.",
        ],
        modelAnswer: "The council could refuse permission for new houses and clinics in the flood zones, and it could plan evacuation routes, shelters and warnings for the areas shown to be at highest risk.",
        explanation: "Zoning and emergency planning use the map." }),
      P.manual({ label: "(c)", marks: 4, stem: "Compare the use of an embankment (hard engineering) with floodplain zoning (soft engineering) for this town.",
        points: [
          "An embankment protects the existing houses at once and by design, but it is costly and may be overtopped or breached.",
          "An embankment can raise levels downstream and give a false sense of safety.",
          "Zoning is cheap and permanent for new development, but does not protect the 900 houses already in the zones.",
          "Both together are best: the embankment for existing property and zoning to stop risk increasing.",
        ],
        modelAnswer: "An embankment protects the existing houses at once, but it is expensive, can be overtopped or breached and may raise water levels downstream. Zoning is cheap and keeps new building out of the zones, but it does not protect the 900 houses already there. Using both is best.",
        explanation: "Compare strengths and limits and conclude." }),
    ], explanation: "Use a hazard map to calculate exposure and compare strategies." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "To what extent is hard engineering the best way to manage river floods?",
    hints: ["Give the strengths and limits of hard engineering.", "Compare it with soft engineering and warnings, then give a judgement."],
    points: [
      "Dams and reservoirs store floodwater, reduce the peak downstream and may supply water and power.",
      "Embankments and spillways protect towns directly, up to their design size.",
      "Hard engineering is costly, can move the flood downstream, may fail or be overtopped and can harm habitats and displace people.",
      "Soft engineering (afforestation, wetlands, zoning, restoration) is cheaper and sustainable, and reduces exposure.",
      "Soft measures are slower and less effective for very large floods or in dense existing settlements.",
      "Warnings and preparation save lives at low cost but do not protect property.",
      "The best strategy depends on the place: the value of property, the size of the basin and the money available.",
      "Judgement: hard engineering is best for protecting dense, high-value areas, but not alone; the most effective approach combines hard and soft measures.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Hard engineering gives direct protection: reservoirs reduce the peak downstream and embankments keep water out of a town up to their design level. It is, however, expensive, may move the flood downstream, and can fail or be overtopped by an extreme flood. Soft measures such as afforestation, wetlands and zoning cost less, are sustainable and reduce exposure, but are slower and cannot protect existing dense settlements from a very large flood. Warnings save lives cheaply. Hard engineering is best where property is dense and valuable, but the most effective approach in most places combines hard and soft measures and warnings.",
    wordLimit: { max: 300 }, explanation: "Weigh hard against soft measures for a place and reach a judgement." });

  b.card("FORMULA", "Recurrence interval", "T = (n + 1) ÷ m for n years of record and rank m (1 = largest); annual probability = 1 ÷ T.");
  b.card("CONCEPT", "1-in-100-year flood", "A flood with a 1% chance of being equalled or exceeded in any year; not a timetable.");
  b.card("CONCEPT", "Hard engineering", "Dams and reservoirs, channel straightening, embankments and artificial levees, diversion spillways.");
  b.card("CONCEPT", "Soft engineering", "Afforestation, wetland and bank conservation, floodplain zoning, river restoration, warnings and preparedness.");
  b.card("CONCEPT", "Flood forecasting", "Rainfall and gauging-station data plus the lag time give the time and height of the peak downstream for warnings.");
  b.card("DEFINITION", "Mitigation of floods", "Actions before and during a flood to reduce its impacts, such as defences, planning, warnings and preparedness.");
  b.card("CONCEPT", "Judging a flood strategy", "Cost, effectiveness, who benefits and who loses, sustainability, and what happens in a flood larger than the design.");
  b.card("FORMULA", "Benefit-cost ratio", "Value of damage avoided ÷ cost of the scheme; above 1 means benefits exceed costs.");
  b.card("FACT", "Hazard map", "A map of flood zones at stated return periods showing homes, schools, clinics and roads, used for planning and evacuation.");
});
