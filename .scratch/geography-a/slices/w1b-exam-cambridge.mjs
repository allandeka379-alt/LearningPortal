// W1b exam rows (Cambridge): topic 2 (Paper 1): CAM_SECTION_A x 1 and CAM_ESSAY15 x 1; topic 11 (Paper 4): CAM_STRUCT10 x 2 and
// CAM_ESSAY20 x 2. Resource data are invented for this exercise (labelled in the stems); every number is computed in code.
import { concept, P, chk, rnd, checkExam, EXAM, geographyLevels, CAM } from "../lib.mjs";
import { tbl } from "../tables/w1b-_q.mjs";

const sgn = (v) => (v > 0 ? `+${v}` : `−${Math.abs(v)}`);

// ---- Section A (topic 2)
const NET = [["0°–15°", 54], ["15°–30°", 40], ["30°–45°", -4], ["45°–60°", -56], ["60°–75°", -86], ["75°–90°", -104]];
const NETTAB = tbl(["Latitude band", "Net radiation (W/m²)"], NET.map(([l, v]) => [l, sgn(v)]));
const range158 = chk(54 - -104, 158);

// ---- Struct 10 #1 (11.1)
const sA = rnd(4.7 - 1.6, 1, 3.1, "sA");
const slr = rnd(((0.82 - 0.42) / 0.42) * 100, 1, 95.2, "slr");
// ---- Struct 10 #2 (11.2/11.3)
const ratioQP = rnd(9.6 / 1.5, 1, 6.4, "ratioQP");
const exposedP = Math.round(0.4 * 0.7 * 1000);
chk(exposedP, 280);

concept("ageo.atmos.energy-budget", { file: "exam/w1b-cambridge", keyPrefix: "exam.w1b-cambridge", applies: CAM }, (b) => {
  // ============================================================ CAM_SECTION_A: topic 2
  b.struct({
    d: 4, skill: EXAM.CAM_SECTION_A.skill, secs: EXAM.CAM_SECTION_A.secs, examStyle: true, paper: "Paper 1", applies: EXAM.CAM_SECTION_A.applies,
    concepts: ["ageo.atmos.energy-budget", "ageo.atmos.global-transfers"],
    hints: ["In (a)(i) subtract the largest deficit (a negative number).", "In (c) use the table to show where insolation alone is not enough."],
    stem: "Insert, Table 1 shows the net radiation at the top of the atmosphere by latitude band in one hemisphere (data invented for this exercise; a positive value is a surplus and a negative value a deficit).\n\n" + NETTAB,
    parts: checkExam(EXAM.CAM_SECTION_A, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the difference between the largest surplus and the largest deficit, in W/m².", value: range158, wrong: [50, 54],
            explanation: "54 − (−104) = 158 W/m²." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "In which latitude band does net radiation change from surplus to deficit?", options: [
            ["30°–45°", "Correct: +40 in the band before and −4 in this band."],
            ["15°–30°", "This band still has a surplus of +40 W/m²."],
            ["45°–60°", "This band is already well into deficit."],
            ["60°–75°", "This band is deep in deficit."],
          ], answer: "A", explanation: "The sign changes between 15°–30° (+40) and 30°–45° (−4)." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain how energy is transferred between the latitudes in Table 1.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which atmospheric cell carries energy from the equator towards about 30° latitude?", options: [
            ["The Hadley cell", "Correct: air rises at the ITCZ and sinks near 30°."],
            ["The Ferrel cell", "The Ferrel cell lies between about 30° and 60°."],
            ["The polar cell", "The polar cell lies poleward of about 60°."],
            ["The Walker cell", "The Walker cell is an east–west circulation over the tropical Pacific."],
          ], answer: "A", explanation: "The Hadley cell transfers energy poleward in the tropics." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which is the main reason for the deficit at the highest latitudes?", options: [
            ["Low sun angle and high albedo reduce absorbed radiation", "Correct: insolation is spread over a large area and snow and ice reflect much of it."],
            ["The Sun is overhead for most of the year", "The Sun is never overhead at high latitudes."],
            ["Greenhouse gases are absent at the poles", "Greenhouse gases are present everywhere."],
            ["Ocean currents bring extra heat to the poles", "Heat transfers reduce the imbalance but are not the cause of the deficit."],
          ], answer: "A", explanation: "Weak insolation and high albedo cause the polar deficit." }),
          P.manual({ label: "(iii)", marks: 2, stem: "Explain how ocean currents help to reduce the difference between low and high latitudes.",
            points: [
              "Warm currents on the western sides of the oceans carry warm water poleward, releasing heat to the air and to higher latitudes.",
              "Cold currents return cool water towards the equator, and deep ocean circulation moves heat slowly, reducing the temperature contrast.",
            ],
            modelAnswer: "Warm currents such as the North Atlantic Drift carry large amounts of heat poleward because water has a high heat capacity. Cold currents bring cool water back towards the equator, which reduces the imbalance between latitudes.",
            explanation: "Ocean currents transfer heat poleward (warm) and equatorward (cold)." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Using Table 1 and your own knowledge, to what extent can differences in insolation alone explain the pattern of net radiation?",
        points: [
          "Insolation falls from the equator to the poles because the sun angle falls and radiation spreads over a larger area (the largest surplus is at 0°–15°, +54 W/m²).",
          "At high latitudes, radiation passes through a thicker atmosphere, so more is absorbed or scattered before reaching the surface.",
          "Albedo is high over snow and ice, so much of the insolation is reflected, increasing the deficit (−104 W/m² at 75°–90°).",
          "Cloud cover reflects insolation but also traps longwave radiation; its effect varies with latitude.",
          "Longwave loss varies less with latitude than insolation, so the net balance is positive in low latitudes and negative in high latitudes.",
          "Greenhouse gases and water vapour reduce longwave loss, especially in the humid tropics.",
          "Seasonal change in insolation (tilt of the Earth) alters the pattern during the year, though the annual pattern remains.",
          "Judgement: insolation is the main control of the pattern, but albedo, cloud and the atmosphere also matter, so it cannot explain it alone.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Insolation is the main reason for the pattern. Near the equator the Sun is high, so energy is concentrated, giving the largest surplus (+54 W/m²), while at high latitudes the same energy is spread over a larger area and passes through more atmosphere. However, insolation alone does not explain the size of the deficit at the poles (−104 W/m²). Snow and ice have a high albedo and reflect much of the radiation received, cloud cover reflects sunlight but also traps longwave radiation, and longwave loss varies much less with latitude than insolation does. The presence of water vapour and greenhouse gases in the tropical atmosphere also reduces heat loss. I conclude that differences in insolation are the main control, but albedo, cloud and the atmosphere modify the pattern, so insolation alone cannot fully explain it.",
        explanation: "Weigh insolation against albedo, cloud, longwave loss and greenhouse gases, and judge." }),
    ]),
    explanation: "Interpret a table of net radiation, explain energy transfers and evaluate the cause of the pattern.",
  });

  // ============================================================ CAM_ESSAY15: topic 2
  b.ext({
    d: 4, marks: 15, skill: "EVALUATION", examStyle: true, secs: EXAM.CAM_ESSAY15.secs, paper: "Paper 1", applies: EXAM.CAM_ESSAY15.applies,
    concepts: ["ageo.atmos.climate-evidence-causes"],
    hints: ["Cover proxy and instrumental evidence, give strengths and limitations, and reach a conclusion about reliability."],
    stem: "To what extent is the evidence for global warming reliable?",
    points: [
      "Proxy records (ice cores, tree rings, pollen, sediments, corals) give evidence for times before instruments.",
      "Ice cores: trapped air shows past CO2 and isotopes show temperature over about 800 000 years; they are detailed but polar and limited to certain sites.",
      "Tree rings give annual resolution but are affected by rainfall, pests and soil as well as temperature and cover only some regions and a few thousand years.",
      "Pollen, sediments and fossils show broad changes in vegetation or sea temperature but are indirect and dating is uncertain.",
      "Instrumental temperature records since about 1850 are direct measurements and show about 1.1 °C of warming by the 2010s.",
      "Limitations: early records had few stations, especially over oceans and the southern hemisphere, and methods changed (ships, buoys, satellites).",
      "Corrections for the urban heat island and station moves are applied, and independent datasets give the same trend.",
      "Satellite records since 1979 give global coverage of temperature, sea ice and sea level, but the record is short.",
      "The Mauna Loa record shows CO2 rising directly from about 315 ppm (1958) to over 420 ppm, matching ice-core evidence of earlier levels.",
      "Sea-level rise of about 20 cm between 1901 and 2018 is shown by tide gauges and satellites and is consistent with warming and melting.",
      "Retreat of glaciers, loss of Arctic sea ice and loss of ice-sheet mass add independent evidence.",
      "The agreement of many independent lines of evidence makes the overall evidence more reliable than any single record.",
      "Natural variability (El Niño, volcanic eruptions, solar cycles) can mislead over short periods, so trends are judged over decades.",
      "Uncertainty remains about the exact size of change in the past and about regional detail, and attributing the cause to human activity relies on models.",
      "Judgement: the evidence for warming is very reliable because it is consistent across many independent records, but individual records and regional details are less certain.",
    ],
    levels: geographyLevels(15), wordLimit: { min: 400, max: 600 },
    modelAnswer: "The evidence for global warming is highly reliable overall because many independent sources agree, although individual records have limitations and some kinds of evidence are stronger than others.\n\nProxy records extend our knowledge beyond the period of instruments. Ice cores from Antarctica trap bubbles of ancient air and record oxygen isotopes that show temperature, so past carbon dioxide and temperature can be compared over about 800 000 years. They are very detailed, but they come from polar sites and are less useful for tropical regions. Tree rings give an annual record, because the width and density of each ring respond to the growing conditions of that year, but they are also affected by rainfall, pests and soil, and they cover only a few thousand years in particular areas. Pollen and sediment cores, corals and fossils show broad changes in vegetation, sea temperature and sea level, but they are indirect and their dating is uncertain. Proxy evidence is therefore best at showing long-term context and less reliable for exact values.\n\nInstrumental records are direct measurements. Thermometer records since about 1850 show roughly 1.1 °C of warming by the 2010s. Early records had few stations, especially over the oceans and in the southern hemisphere, and the methods changed from ships to buoys and satellites. However, corrections have been made for station moves and the urban heat island, and independent research groups using different methods find the same trend. Satellites since 1979 add global coverage of temperature, sea ice and sea level, although the record is relatively short. At Mauna Loa, direct measurements show carbon dioxide rising from about 315 ppm in 1958 to more than 420 ppm, which fits the ice-core estimate of earlier concentrations of about 280 ppm.\n\nOther evidence supports the same conclusion. Sea level rose about 20 cm between 1901 and 2018, as shown by tide gauges and satellites, glaciers are retreating almost everywhere, Arctic sea ice has declined and the Greenland and Antarctic ice sheets are losing mass. The agreement of so many independent lines of evidence makes the overall conclusion much stronger than any single record could.\n\nSome caution is needed. Natural variability from El Niño, volcanic eruptions and the solar cycle can mislead over short periods, so trends must be judged over decades. Uncertainty remains about the exact size of change in the distant past and about regional detail, and linking the warming to human causes relies partly on climate models, although the pattern of warming fits the rise in greenhouse gases.\n\nIn conclusion, the evidence that the planet is warming is very reliable because it is consistent across many independent records, while the reliability of individual records, past values and regional details is lower.",
    explanation: "Evaluate each type of evidence, show how they support each other and judge reliability.",
  });

  const BASE = (plan) => ({ d: 4, skill: plan.skill, secs: plan.secs, examStyle: true, paper: "Paper 4", applies: plan.applies });

  // ============================================================ CAM_STRUCT10 #1: projections and tipping points
  b.struct({
    ...BASE(EXAM.CAM_STRUCT10),
    concepts: ["ageo.climate.projections-environments", "ageo.climate.tipping-points"],
    hints: ["Percentage higher = (very high − very low) ÷ very low × 100.", "In (c) think about feedbacks from the ice sheets."],
    stem: "Insert, Table 1 shows illustrative projections for three of the five categories of future climate change (data invented for this exercise).\n\n" +
      tbl(["Category", "Very low", "Intermediate", "Very high"], [["Warming by 2100 (°C)", 1.6, 2.9, 4.7], ["Year emissions peak", "2025", "2045", "None before 2100"], ["Year of net zero", "2060", "None before 2100", "None before 2100"], ["Sea-level rise by 2100 (m)", 0.42, 0.60, 0.82]]),
    parts: checkExam(EXAM.CAM_STRUCT10, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "Calculate the difference in projected warming between the very high and very low categories, in °C.", value: sA, dp: 1, unit: "°C", wrong: [6.3, 1.3],
            explanation: "4.7 − 1.6 = 3.1 °C." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate by what percentage the sea-level rise in the very high category exceeds that in the very low category.", value: slr, dp: 1, unit: "%", wrong: [48.8, 0.4],
            explanation: "(0.82 − 0.42) ÷ 0.42 × 100 = 95.2%." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain why sea level continues to rise after 2100.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which factor is one reason?", options: [
            ["Greenhouse gases remain in the atmosphere for a long time", "Correct: they keep the climate warm after emissions fall."],
            ["The Moon's orbit changes in 2100", "Tides do not explain the long-term rise."],
            ["Rainfall stops after 2100", "Rainfall continues."],
            ["Net zero is always reached before 2100", "Table 1 shows that net zero is not reached in two categories."],
          ], answer: "A", explanation: "Long-lived greenhouse gases keep warming going." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Give two further reasons why sea level continues to rise after 2100.",
            points: [
              "The deep ocean takes centuries to warm, so thermal expansion continues.",
              "Ice sheets and glaciers respond slowly and continue to melt for centuries after temperatures stabilise.",
            ],
            modelAnswer: "The deep ocean takes centuries to absorb heat, so water continues to expand. Ice sheets and glaciers respond slowly, so melting continues after temperatures stop rising.",
            explanation: "Slow response of the ocean and ice." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, stem: "Suggest how a tipping point in the Greenland ice sheet could make the sea-level rise greater than shown in Table 1.",
        points: [
          "As the surface of the ice sheet melts and lowers, it lies in warmer air, so melting speeds up (a positive feedback).",
          "Once a threshold is passed, loss continues even if warming stops, so the committed rise could exceed projections that assume a steady response.",
          "Meltwater and darker, bare surfaces lower albedo and absorb more radiation, increasing melt further.",
          "Fast discharge of ice into the sea or collapse of ice shelves could add more water than models assume.",
        ],
        modelAnswer: "If the surface lowers as it melts it enters warmer air, so melting accelerates, and past the threshold the loss continues even if warming stops. Meltwater and darker surfaces absorb more radiation, and faster ice discharge into the sea could add more water than models assume, so the rise could be greater than in Table 1.",
        explanation: "Positive feedbacks and thresholds can make the response larger than projected." }),
    ]),
    explanation: "Interpret a projections table, explain continuing sea-level rise and suggest the effect of a tipping point.",
  });

  // ============================================================ CAM_STRUCT10 #2: vulnerability and governance
  b.struct({
    ...BASE(EXAM.CAM_STRUCT10),
    concepts: ["ageo.climate.impacts-vulnerability", "ageo.climate.mitigation-adaptation-governance"],
    hints: ["In (a)(ii) convert millions to thousands (× 1 000).", "In (c) link the help to the specific problems of Country P."],
    stem: "Insert, Table 1 compares two countries (data invented for this exercise).\n\n" +
      tbl(["", "Country P (small island state)", "Country Q (high income)"], [["Population (millions)", 0.4, 38], ["CO2 emissions per person (tonnes a year)", 1.5, 9.6], ["Population living less than 5 m above sea level (%)", 70, 5]]),
    parts: checkExam(EXAM.CAM_STRUCT10, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "Calculate how many times greater the emissions per person are in Country Q than in Country P.", value: ratioQP, dp: 1, wrong: [8.1, 0.16],
            explanation: "9.6 ÷ 1.5 = 6.4 times." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the number of people in Country P living less than 5 m above sea level, in thousands.", value: exposedP, wrong: [28, 2800],
            explanation: "0.4 million × 70% = 0.28 million = 280 thousand." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain why Country P is more vulnerable to climate change than Country Q.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which factor makes Country P more exposed?", options: [
            ["Most of its people live on low-lying coasts", "Correct: sea-level rise and storm surges threaten them directly."],
            ["It emits more carbon dioxide per person", "Its emissions per person are lower."],
            ["It has a larger population", "Its population is smaller."],
            ["It is less dependent on the sea", "Small island states are usually highly dependent on the sea."],
          ], answer: "A", explanation: "70% of the population live less than 5 m above sea level." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain one other reason for the greater vulnerability of Country P.",
            points: [
              "A small economy dependent on sensitive sectors such as tourism, fishing and reefs, which climate change damages (high sensitivity).",
              "Limited money, technology and land for protection or relocation, so it has low adaptive capacity.",
            ],
            modelAnswer: "A small economy that depends on tourism and fishing is sensitive to damage to reefs and coasts, and with limited money and little land to retreat to, the country has low capacity to protect or relocate people.",
            explanation: "Sensitivity and low adaptive capacity." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, stem: "Suggest how international climate governance could help Country P.",
        points: [
          "The Paris Agreement provides a forum where small island states can press for strong global emission cuts and the 1.5 °C aim.",
          "Climate finance promised to developing countries (and the loss and damage fund agreed in 2022) can pay for sea defences, relocation and recovery.",
          "Technology transfer and capacity building under the agreements help it to build early warning, resilient housing and renewable energy.",
          "Country P could use its NDC to attract funding for adaptation priorities and cooperate with other small island states to increase its influence.",
        ],
        modelAnswer: "Under the Paris Agreement, small island states can press for deep global emission cuts and the 1.5 °C aim. Climate finance and the loss and damage fund can pay for sea defences, relocation and recovery. Technology transfer and training help build early warning and resilient housing, and Country P can attract funding with its national plan and by working with other small island states.",
        explanation: "Finance, technology and political influence through the agreements." }),
    ]),
    explanation: "Use a table to compare two countries, explain vulnerability and suggest governance support.",
  });

  // ============================================================ CAM_ESSAY20 #1: tipping points
  b.ext({
    ...BASE(EXAM.CAM_ESSAY20), marks: 20, skill: "EVALUATION",
    concepts: ["ageo.climate.tipping-points", "ageo.climate.projections-environments"],
    hints: ["Plan around cold environments, marine environments and their interaction, then compare with gradual change.", "Include detailed specific examples and end with a judgement."],
    stem: "Assess the extent to which tipping points will make the impacts of climate change on cold and marine environments more severe.",
    points: [
      "Defines a tipping point: a threshold beyond which change is self-sustaining, often abrupt, and hard to reverse on a human timescale.",
      "Greenland ice sheet: the melt-elevation and albedo feedbacks could make loss self-sustaining over centuries; it holds about 7 m of sea-level equivalent.",
      "West Antarctic ice sheet: much of it rests on bedrock below sea level, so warm water can undercut it and cause unstoppable retreat; about 3 m of sea-level equivalent.",
      "Arctic sea ice: summer loss lowers albedo, so the ocean absorbs more radiation, adding to Arctic warming which is at least twice the global rate.",
      "Permafrost: thaw releases CO2 and methane, a positive feedback, and causes subsidence that damages buildings, roads and pipelines for communities in Siberia, Alaska and Canada.",
      "Sea-level rise: acceleration from ice-sheet tipping increases coastal flooding and storm surge impacts on low-lying deltas and small islands.",
      "Ocean circulation: meltwater may weaken the North Atlantic overturning, changing heat transport, shifting tropical rain belts and raising sea level on the north-west Atlantic coast.",
      "Marine ecosystems: warm-water coral reefs pass thresholds when marine heatwaves cause repeated bleaching, as on the Great Barrier Reef in 2016, 2017, 2020 and 2022.",
      "Ocean acidification adds to the stress on shell-forming organisms and reefs, and may interact with warming to cause ecosystem shifts.",
      "Interactions: ice melt freshens the ocean, which affects circulation; permafrost thaw adds greenhouse gases to the atmosphere, causing further melt; sea ice loss warms the ocean.",
      "Speed: some tipping points could act within decades (reef die-off, circulation changes), while others are slow but committed (ice sheets over centuries to millennia).",
      "Non-linear change: past the threshold, a small extra warming gives a large response, making impacts less predictable and larger than a linear projection.",
      "Irreversibility: sea-level commitment and loss of reefs or ice sheets cannot be undone on human timescales, so impacts persist even if emissions fall.",
      "Uncertainty: the thresholds are poorly known (some estimates near 1.5–2 °C), models differ, and an abrupt collapse of ocean circulation before 2100 is judged unlikely.",
      "Without tipping points, gradual warming would still cause serious impacts: thermal expansion, glacier retreat, loss of snow, coral bleaching and acidification.",
      "Most ice-sheet effects would mainly occur after 2100, so near-term severity depends mainly on gradual change and on emissions.",
      "Impacts are unequal: Arctic communities, small island states and low-lying deltas suffer most, which raises questions of justice.",
      "Mitigation reduces the chance of crossing thresholds; adaptation cannot cope with some tipping point impacts such as loss of land.",
      "Evaluation of significance by location: effects on cold environments (loss of ice and permafrost) are more certain than effects on circulation.",
      "Judgement: tipping points could greatly increase the severity, permanence and unpredictability of impacts, particularly for ice sheets and reefs, but gradual change already causes major impacts, so the extent depends on the pathway and on the specific system.",
    ],
    levels: geographyLevels(20), wordLimit: { min: 600, max: 800 },
    modelAnswer: "A tipping point is a threshold beyond which change becomes self-sustaining and hard to reverse on a human timescale. Tipping points could make the impacts of climate change on cold and marine environments much more severe because they add speed, size and permanence to gradual change, although the extent varies from system to system.\n\nIn cold environments the most important are the ice sheets, sea ice and permafrost. The Greenland ice sheet holds about 7 m of sea-level equivalent. As its surface melts it lowers into warmer air and melts faster, and darker meltwater and bare ice absorb more radiation, so loss may continue for centuries even if warming stops. The West Antarctic ice sheet, which holds about 3 m, rests largely on bedrock below sea level, so warm ocean water can undercut it and cause a retreat that cannot be halted. Loss of Arctic summer sea ice lowers the albedo, so the ocean absorbs more radiation and the Arctic warms at least twice as fast as the world as a whole. Thawing permafrost releases carbon dioxide and methane, a positive feedback, and causes the ground to subside, damaging roads, buildings and pipelines in Siberia, Alaska and Canada and affecting the people who live there.\n\nIn marine environments an accelerated loss of ice sheets would increase sea-level rise and the flooding of low-lying deltas and small islands, especially when combined with storm surges. Fresh meltwater may weaken the North Atlantic overturning circulation, changing heat transport, shifting the tropical rain belts and raising sea level on the north-west Atlantic coast. Warm-water coral reefs may pass thresholds when marine heatwaves cause repeated bleaching, as happened on the Great Barrier Reef in 2016, 2017, 2020 and 2022, and ocean acidification adds to the stress on reef-building organisms.\n\nThe environments interact, which strengthens the effect of each tipping point. Ice melt freshens the ocean and affects circulation, permafrost thaw adds greenhouse gases to the atmosphere and causes further melt, and sea ice loss warms the ocean, which can then melt ice from below. Some tipping points could act within decades, such as reef die-off and changes in circulation, while ice sheets act more slowly but are committed over centuries. Because change is non-linear, a small extra warming can produce a large response, and because it is irreversible the impacts persist even if emissions later fall. This makes projections more uncertain and means that the severity of impacts could be greater than a steady, gradual change would suggest. The thresholds are not well known, however, with some estimates close to 1.5 to 2 °C, models differ, and an abrupt collapse of the ocean circulation before 2100 is judged unlikely.\n\nIt is also true that gradual warming already causes serious impacts without any tipping point: thermal expansion of seawater, retreat of mountain glaciers, thinning of sea ice, coral bleaching and acidification. Many of the effects of ice-sheet tipping points would occur mostly after 2100, so the severity in the coming decades depends mainly on gradual change and on how quickly emissions are cut. The impacts are also unequal, falling most heavily on Arctic communities, small island states and low-lying deltas, which have limited capacity to adapt to the loss of land.\n\nEvidence from the present supports the concern. The Arctic has already lost much of its summer sea ice, mountain glaciers are retreating on every continent, and repeated mass bleaching has damaged large areas of the Great Barrier Reef, showing that the systems most at risk are already under stress. Adaptation can reduce some of the harm to people, for example through coastal defences or relocation, but it cannot restore a lost ice sheet or reef, which is another reason why crossing a threshold matters.\n\nIn conclusion, tipping points could greatly increase the severity, permanence and unpredictability of impacts, especially for ice sheets, permafrost and coral reefs, so to a large extent they would make the impacts worse in the long term. However, near-term severity depends mainly on gradual change, and strong mitigation reduces the chance that the thresholds are crossed.",
    explanation: "Evaluate how thresholds, feedbacks and interactions change severity, with specific examples, and judge.",
  });

  // ============================================================ CAM_ESSAY20 #2: contrasting countries
  b.ext({
    ...BASE(EXAM.CAM_ESSAY20), marks: 20, skill: "EVALUATION",
    concepts: ["ageo.climate.mitigation-adaptation-governance", "ageo.climate.impacts-vulnerability"],
    hints: ["Use two named countries with dated facts, compare their strategies and explain the factors behind them.", "Include justice and implementation challenges, and reach a judgement."],
    stem: "Using detailed specific examples of two countries, assess the extent to which the choice of climate change management strategies depends on a country's level of development.",
    points: [
      "Defines the strategies: mitigation (cutting or removing emissions) and adaptation (adjusting to effects), and states the two countries chosen (for example the United Kingdom and Bangladesh).",
      "United Kingdom (high income): the Climate Change Act 2008 set legally binding carbon budgets, and the target of net zero by 2050 was legislated in 2019.",
      "UK mitigation: rapid growth of offshore wind and the closure of the last coal-fired power station in 2024 show a mitigation-led strategy made possible by wealth, technology and finance.",
      "UK adaptation: the Thames Barrier (opened 1982) and the Thames Estuary 2100 plan protect London against flooding, showing that wealthy countries can fund engineered protection.",
      "UK challenges: the high cost of the transition, emissions from heating, transport and aviation, public acceptance and the need to upgrade the grid.",
      "Bangladesh (lower-middle income): very low emissions per person (less than 1 tonne), so its mitigation contribution to global emissions is small.",
      "Bangladesh exposure: a low-lying delta with frequent cyclones, floods and salt-water intrusion, so adaptation is the priority.",
      "Bangladesh adaptation: the Cyclone Preparedness Programme, early warning and thousands of cyclone shelters have reduced deaths to thousands in cyclones such as Sidr (2007) compared with hundreds of thousands in Bhola (1970).",
      "Bangladesh adaptation: embankments, salt-tolerant and flood-tolerant rice, and the Bangladesh Delta Plan 2100 (adopted 2018) show a long-term planned strategy using low-cost, community-based methods.",
      "Bangladesh mitigation: solar home systems and other renewable energy are expanding, but larger targets depend on international finance.",
      "Development determines resources: the UK can fund large-scale infrastructure, research and subsidies, whereas Bangladesh relies on low-cost methods and external finance.",
      "Development also affects priorities: Bangladesh must balance emissions with the need for energy access and growth, while the UK can aim for net zero.",
      "Exposure and risk matter independently of income: Bangladesh's high exposure drives its adaptation emphasis, whereas the UK's lower exposure allows more emphasis on mitigation.",
      "Responsibility and justice: the UK has high historical emissions and so faces pressure to cut emissions and support others, while Bangladesh contributes little but suffers heavily and seeks loss and damage and adaptation finance.",
      "Political and institutional factors also matter: the UK has legislation and an independent Climate Change Committee, while Bangladesh has the Climate Change Strategy and Action Plan (2009) and strong community networks.",
      "Public attitudes and economic structure: the UK's service-based economy has moved away from coal, whereas Bangladesh depends on rural livelihoods and garment exports that need energy and are exposed to climate hazards.",
      "Implementation challenges: UK costs and acceptance; Bangladesh funding, density of population, land loss and salinity.",
      "International agreements recognise differing capabilities: the Paris Agreement lets countries set their own NDCs, which reflect development level, though conditional targets depend on finance.",
      "Strategies change as development proceeds: Bangladesh is adding mitigation as its income rises, and the UK is adding adaptation as risks increase, showing a link but not a fixed pattern.",
      "Judgement: development level is a major influence through resources and responsibility, but exposure, politics, justice and international support also shape strategies, so it is an important but not the only factor.",
    ],
    levels: geographyLevels(20), wordLimit: { min: 600, max: 800 },
    modelAnswer: "Development strongly influences the choice of climate change strategy, but not completely. I compare the United Kingdom, a high-income country, and Bangladesh, a lower-middle income country. Mitigation means cutting or removing greenhouse gas emissions, and adaptation means adjusting to the effects.\n\nThe UK has emphasised mitigation. Its Climate Change Act (2008) set legally binding carbon budgets, and in 2019 the target of net zero by 2050 was written into law. Wealth, technology and strong financial markets have allowed rapid growth of offshore wind, and the last coal-fired power station closed in 2024. It also adapts using engineering, as with the Thames Barrier (opened 1982) and the Thames Estuary 2100 plan to protect London from tidal flooding. Its challenges include the high cost of the transition, emissions from home heating, transport and aviation, public acceptance of change and the need to upgrade the electricity grid.\n\nBangladesh has very low emissions per person, less than one tonne a year, so its contribution to global emissions is small, but it is highly exposed. Its low-lying delta suffers cyclones, floods and salt-water intrusion, so its priority is adaptation. The Cyclone Preparedness Programme, with early warning and thousands of cyclone shelters, has helped to cut deaths to a few thousand in Cyclone Sidr (2007), compared with hundreds of thousands in Cyclone Bhola (1970). Embankments, salt-tolerant and flood-tolerant rice, and the Bangladesh Delta Plan 2100, adopted in 2018, form a long-term plan based mainly on low-cost and community methods. The country is also expanding solar home systems in rural areas, but larger mitigation targets depend on international finance.\n\nThese differences show the effect of development. The UK has the money, technology and institutions to fund large infrastructure and subsidies for energy change. Bangladesh has limited resources and must balance emissions against the need for energy access and growth, so it relies on low-cost measures and on external finance. Responsibility and justice also differ: the UK has high historical emissions and faces pressure to cut them and to support others, while Bangladesh contributes little but suffers heavily and seeks adaptation finance and support for loss and damage.\n\nHowever, development is not the only influence. Exposure drives strategy: Bangladesh's extreme exposure makes adaptation essential, whereas the UK's lower exposure allows greater emphasis on mitigation. Politics and institutions matter too. The UK has legislation and an independent Climate Change Committee, while Bangladesh has its Climate Change Strategy and Action Plan (2009) and strong community networks and volunteers. Economic structures differ, as the UK has moved away from coal in a service-based economy, whereas Bangladesh's rural livelihoods and garment industry depend on energy and are exposed to hazards. Both face implementation challenges: the UK has costs and public acceptance, and Bangladesh has funding, a dense population, land loss and salinity.\n\nInternational agreements also recognise differences in capability: the Paris Agreement lets each country set its own national contribution, which reflects its circumstances, though Bangladesh's more ambitious targets are conditional on finance. Strategies also change over time, with Bangladesh adding mitigation as its income grows and the UK adding adaptation as risks increase, so the link with development is not fixed.\n\nBoth strategies have limits. The UK still has emissions from heating, transport and aviation, and the cost of insulating homes and upgrading the grid falls on households and taxpayers. In Bangladesh, even well-designed embankments and shelters cannot prevent the loss of land and farmland to salt water and erosion, and rapid population growth in the delta increases the number of people exposed. Both countries therefore need continued investment, and international support is essential for countries with low incomes.\n\nIn conclusion, the level of development is a major influence because it determines resources and responsibility, but exposure, politics, justice and international support also shape strategies. It is therefore an important but not the only factor.",
    explanation: "Compare two real countries, explain the factors behind each strategy and judge the role of development.",
  });
});
