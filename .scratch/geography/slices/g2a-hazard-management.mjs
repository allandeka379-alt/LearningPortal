// Slice G2a: managing tectonic hazards (ZIMSEC and Cambridge).
import { concept, P, geographyLevels, CAM } from "../lib.mjs";

const MONITOR = "| Week | Small earthquakes per day (mean) | Ground uplift since week 1 (mm) | Sulphur dioxide (tonnes per day) |\n|---|---|---|---|\n| 1 | 4 | 0 | 150 |\n| 2 | 6 | 12 | 180 |\n| 3 | 15 | 35 | 420 |\n| 4 | 38 | 81 | 1,260 |";

concept("geo.tectonics.hazard-management", { file: "tectonics/hazard-management", keyPrefix: "tectonics.hazard-management" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a **primary** (immediate) response to an earthquake?",
    options: [
      ["Searching collapsed buildings for survivors", "Correct: done in the first hours and days."],
      ["Rebuilding schools to a new building code", "That is a secondary, long-term response."],
      ["Introducing land-use zoning laws", "Zoning is long-term planning."],
      ["Repairing the main port over two years", "That is a long-term recovery task."],
    ],
    answer: "A",
    explanation: "**Primary responses** save lives immediately: search and rescue, first aid, shelter, food and water.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which instrument measures the **swelling** of the ground as magma collects beneath a volcano?",
    options: [
      ["Tiltmeter", "Correct: it measures changes in the slope of the ground."],
      ["Barometer", "A barometer measures air pressure."],
      ["Rain gauge", "A rain gauge measures rainfall."],
      ["Anemometer", "An anemometer measures wind speed."],
    ],
    answer: "A",
    explanation: "**Tiltmeters** (and GPS) detect ground deformation as magma rises.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the purpose of **base isolators** in an earthquake-resistant building?",
    options: [
      ["To absorb shaking so less movement reaches the building", "Correct: rubber or spring pads separate the building from the ground."],
      ["To stop the building from swaying at all", "Earthquake-resistant buildings are designed to sway safely."],
      ["To make the foundations shallower and cheaper", "Foundations are usually made deeper, not shallower."],
      ["To cut off the gas supply automatically", "That is done by automatic shut-off valves."],
    ],
    answer: "A",
    explanation: "Base isolators reduce how much ground shaking is passed up into the structure.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can volcanic eruptions often be forecast while earthquakes cannot?",
    options: [
      ["Rising magma gives warning signs such as small earthquakes, swelling and gas", "Correct: these signs build up over days to months."],
      ["Volcanoes erupt at regular, fixed intervals", "Eruptions are not regular."],
      ["Earthquakes happen only at night, when instruments are switched off", "Earthquakes happen at any time; instruments run continuously."],
      ["Scientists have no instruments for measuring earthquakes", "Seismometers record earthquakes very accurately."],
    ],
    answer: "A",
    explanation: "Magma movement produces measurable signs; stress on faults builds without clear warning of the exact moment of failure.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does **land-use zoning** do to reduce hazard risk?",
    options: [
      ["Keeps homes and key buildings out of the most dangerous areas", "Correct: reduces exposure."],
      ["Strengthens existing buildings with steel braces", "That is retrofitting."],
      ["Detects P waves and sends automatic alerts", "That is an early-warning system."],
      ["Provides tents and food after a disaster", "That is a primary response."],
    ],
    answer: "A",
    explanation: "Zoning uses hazard maps to restrict building in high-risk areas, e.g. lahar paths.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: CAM,
    stem: "On which type of plate boundary did the 2015 Nepal earthquake occur?",
    options: [
      ["Collision", "Correct: the Indo-Australian plate pushes into the Eurasian plate."],
      ["Constructive", "Constructive boundaries are where plates move apart."],
      ["Conservative", "Conservative boundaries are where plates slide past each other."],
      ["Hot spot", "A hot spot is not a plate boundary."],
    ],
    answer: "A",
    explanation: "Nepal lies on the **collision** zone that is building the Himalayas.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION", applies: CAM,
    stem: "Which strategy is likely to save most lives for the lowest cost in a low-income, earthquake-prone country?",
    options: [
      ["Community education, drills and simple strengthening of homes", "Correct: low-cost measures reach many people."],
      ["Fitting base isolators to every house", "Base isolators are expensive and suited to large buildings."],
      ["A nationwide network of high-tech early-warning sensors", "Effective but expensive, and gives only seconds of warning."],
      ["Moving the whole population away from the fault zone", "Usually impossible: land, jobs and homes are there."],
    ],
    answer: "A",
    explanation: "In LICs, low-cost preparedness and simple building improvements reach most people; expensive technology helps, but less per dollar.",
    hints: ["Think about cost and how many people benefit.", "What can communities do themselves?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    stem: "Mount Pinatubo (1991) is often described as a success of hazard management. Why?",
    options: [
      ["Monitoring allowed a timely mass evacuation", "Correct: many thousands of lives are thought to have been saved."],
      ["No one died at all during or after the eruption", "About 800-900 people died, many from roof collapses."],
      ["Lava barriers stopped all the lava flows", "Pinatubo's main hazards were ash, pyroclastic flows and lahars, not lava."],
      ["Scientists prevented the eruption from happening", "Eruptions cannot be prevented."],
    ],
    answer: "A",
    explanation: "Monitoring and alert levels allowed evacuation before the 15 June eruption; deaths were far fewer than they could have been.",
    hints: ["What did scientists do in the weeks before?", "Were there still deaths?"],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "An early-warning system detects an earthquake's P waves. The damaging S waves will reach a city 140 km away travelling at 3.5 km per second. How many seconds after the earthquake will they arrive?",
    value: 40, unit: "s",
    wrong: [490, 0.025],
    explanation: "Time = 140 ÷ 3.5 = 40 seconds.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A fictional town has 64 schools. After an earthquake-safety programme, 48 schools have been retrofitted. What percentage still need retrofitting?",
    value: 25, unit: "%",
    wrong: [75, 16],
    explanation: "64 − 48 = 16 schools; 16 ÷ 64 × 100 = 25 %.",
    workedSolution: "1. Schools not retrofitted = 64 − 48 = 16.\n2. 16 ÷ 64 × 100 = 25 %.",
    hints: ["Find how many are left.", "Divide by the total."],
  });
  b.calc({
    d: 4, skill: "ANALYSIS",
    stem: "At a fictional volcano, sulphur dioxide output rose from 240 to 1,560 tonnes per day over six weeks. Calculate the percentage increase.",
    value: 550, unit: "%",
    wrong: [650, 6.5],
    explanation: "Increase = 1,560 − 240 = 1,320; 1,320 ÷ 240 × 100 = 550 %.",
    workedSolution: "1. Increase = 1,560 − 240 = 1,320 tonnes per day.\n2. 1,320 ÷ 240 = 5.5.\n3. × 100 = 550 %.",
    hints: ["Percentage increase = increase ÷ original × 100.", "The original value is week 1."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the process of adding strengthening features to existing buildings so they can withstand earthquakes.",
    accepted: ["retrofitting", "retrofit", "retro-fitting"],
    wrong: ["zoning"],
    explanation: "**Retrofitting**.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the disaster risk management cycle.",
    template: "Before an event: {{blank:a}} (reduce the risk) and {{blank:b}} (plans, drills, warnings). After an event: {{blank:c}} (rescue and relief) and {{blank:d}} (rebuilding).",
    blanks: [
      { id: "a", accepted: ["mitigation"], wrong: "response" },
      { id: "b", accepted: ["preparedness", "preparation"], wrong: "recovery" },
      { id: "c", accepted: ["response"], wrong: "mitigation" },
      { id: "d", accepted: ["recovery", "reconstruction"], wrong: "preparedness" },
    ],
    explanation: "Mitigation → preparedness → response → recovery.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each strategy to its category.",
    pairs: [
      ["Gas sampling at a crater", "Monitoring"],
      ["Cross-bracing in a steel frame", "Protection"],
      ["Hazard map used to restrict building", "Planning"],
      ["Rescue teams with sniffer dogs", "Primary response"],
    ],
    explanation: "Monitoring, protection, planning and response are different stages of management.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: scientists can predict the exact day and time of a large earthquake weeks in advance.",
    answer: false,
    feedbackFalse: "Correct: they can forecast probabilities and give seconds of warning, but not exact times.",
    feedbackTrue: "Earthquakes cannot be predicted to an exact time; only probabilities and seconds of early warning are possible.",
    explanation: "Prediction of exact time and place is not yet possible.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** features of an earthquake-resistant building.",
    points: [
      "Deep foundations anchored in solid rock",
      "Base isolators (rubber or springs) to absorb shaking",
      "Steel or reinforced frame with cross-bracing that allows sway",
      "Another feature, e.g. counterweight damper / shatterproof glass / automatic gas shut-off / open space around",
    ],
    modelAnswer: "It has deep foundations in solid rock, rubber base isolators that absorb shaking, a reinforced steel frame with cross-bracing so it can sway without breaking, and shatterproof glass so windows do not shower people with fragments.",
    explanation: "One mark per feature.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how scientists monitor a volcano to forecast an eruption.",
    points: [
      "Seismometers detect increasing numbers of small earthquakes as magma rises",
      "Tiltmeters / GPS / satellites detect swelling of the ground",
      "Gas sampling detects rising sulphur dioxide or carbon dioxide",
      "Changes are compared with past patterns to set alert levels and order evacuations",
    ],
    modelAnswer: "Seismometers record swarms of small earthquakes as magma forces its way up. Tiltmeters, GPS and satellites show the ground bulging as magma collects. Gas samples show more sulphur dioxide escaping. When these signs increase together, scientists raise the alert level and authorities can evacuate people.",
    explanation: "Three methods and how they are used.",
    hints: ["Think about earthquakes, ground shape and gases.", "How are the readings used?"],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7, applies: CAM,
    stem: "For a named earthquake you have studied, describe its causes and impacts and evaluate the responses.",
    points: [
      "Named earthquake with date and place, e.g. Nepal, 25 April 2015",
      "Cause linked to plate boundary, e.g. Indo-Australian plate colliding with the Eurasian plate; magnitude 7.8, shallow",
      "Social impacts with figures, e.g. about 9,000 deaths; hundreds of thousands of homes destroyed",
      "Economic / environmental impacts, e.g. landslides blocked roads; tourism fell; heritage sites damaged",
      "Primary responses, e.g. search and rescue, helicopters, international aid",
      "Secondary responses, e.g. reconstruction programme, rebuilding with safer designs",
      "Evaluation: strengths and weaknesses (e.g. slow rebuilding, remote access) and a judgement",
    ],
    levels: geographyLevels(7),
    modelAnswer: "On 25 April 2015 a magnitude 7.8 earthquake struck Nepal, with its epicentre in Gorkha district between Kathmandu and Pokhara. It was caused by stress released on a fault where the Indo-Australian plate is colliding with the Eurasian plate. About 9,000 people died and hundreds of thousands of homes were destroyed, many of them heavy stone and brick buildings in villages. Landslides blocked mountain roads, an avalanche struck Everest base camp, historic temples in Kathmandu collapsed and tourism fell. The primary response included search and rescue by the army and international teams, and helicopters taking aid to cut-off villages; this saved lives but many remote places waited days for help. In the long term a reconstruction programme gave grants for rebuilding with earthquake-resistant designs, but progress was slow because of the steep terrain, cost and organisational problems. Overall the immediate response was reasonably effective given Nepal's poverty and relief, but slow recovery left people vulnerable, showing that preparation and safer building beforehand are more effective than relief afterwards.",
    explanation: "Credit a detailed specific example with figures, and a balanced evaluation of responses.",
    hints: ["Give place, date, magnitude and the plates.", "Separate immediate and long-term responses, then judge them."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Table 1 shows monitoring data at a fictional volcano.\n\n${MONITOR}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "By how many millimetres did the ground rise between weeks 3 and 4?", value: 46, unit: "mm", wrong: [81], explanation: "81 − 35 = 46 mm." }),
      P.num({ label: "(b)", marks: 1, stem: "How many times more small earthquakes per day were there in week 4 than in week 1?", value: 9.5, tol: 0.05, wrong: [34], explanation: "38 ÷ 4 = 9.5 times." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe the changes shown and suggest what they indicate.", points: [
        "All three readings increase, slowly at first and rapidly after week 2",
        "Uses data, e.g. earthquakes from 4 to 38 per day; uplift to 81 mm; sulphur dioxide from 150 to 1,260 tonnes per day",
        "Magma is rising and collecting beneath the volcano, so an eruption may be close",
      ], modelAnswer: "All three readings rise, slowly at first and then rapidly: small earthquakes from 4 to 38 a day, uplift to 81 mm and sulphur dioxide from 150 to 1,260 tonnes a day. This suggests magma is rising and collecting, so an eruption may be near.", explanation: "Trend, data and interpretation." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest **three** actions the authorities should take at week 4.", points: [
        "Raise the alert level and warn people",
        "Evacuate people from the danger zones identified on hazard maps",
        "Prepare shelters, transport and supplies / close roads and airspace",
      ], modelAnswer: "Raise the alert level and broadcast warnings, evacuate villages in the danger zones on the hazard map, and set up shelters with food and water while closing roads and airspace near the volcano.", explanation: "Three linked actions." }),
    ],
    hints: ["Compare week 4 with earlier weeks.", "Why do these readings rise before an eruption?"],
    explanation: "Practice in interpreting volcanic monitoring data.",
  });
  b.struct({
    d: 3, skill: "EVALUATION",
    stem: "A fictional city council in an earthquake zone has US\\$20 million to spend. It is considering three options:\n\n| Option | Cost (US\\$ million) | Description |\n|---|---|---|\n| A | 18 | Retrofit the city's 12 hospitals and 40 largest schools |\n| B | 6 | Public education campaign, school drills and emergency kits for poor households, every year for 3 years |\n| C | 14 | Earthquake early-warning sensors and alert system |",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "What is the total cost of options B and C together, in US\\$ million?", value: 20, wrong: [24], explanation: "6 + 14 = 20." }),
      P.num({ label: "(b)", marks: 1, stem: "Option B is shared equally over its 3 years. How much is spent each year, in US\\$ million?", value: 2, wrong: [18], explanation: "6 ÷ 3 = 2." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **one** strength and **one** limitation of option C.", points: [
        "Strength: seconds of warning to stop trains, open fire-station doors, let people take cover",
        "Limitation: very little warning near the epicentre / does not strengthen buildings / expensive",
      ], modelAnswer: "It can give seconds of warning so trains stop and people take cover, but people near the epicentre get almost no warning and buildings remain weak.", explanation: "One of each." }),
      P.manual({ label: "(d)", marks: 4, stem: "Which option or combination would you recommend? Justify your choice.", points: [
        "Clear recommendation (e.g. A alone, or B + C)",
        "Justification of the main choice with a reason (e.g. hospitals and schools must stay standing to treat and shelter people)",
        "Comparison with an alternative and its weakness",
        "Reference to cost / budget of US\\$20 million",
      ], modelAnswer: "I recommend option A. Hospitals and schools must survive an earthquake: hospitals treat the injured and schools hold many children and can become shelters. Options B and C together also cost US\\$20 million, and education is cheap and reaches everyone, but early warning gives only seconds and does not stop buildings collapsing. A uses US\\$18 million, leaving US\\$2 million for one year of drills from option B.", explanation: "Credit a justified recommendation within the budget." }),
    ],
    hints: ["Add the costs.", "Which option protects the most important buildings?"],
    explanation: "Practice in evaluating hazard management options.",
  });

  b.card("DEFINITION", "Primary responses", "Immediate actions after a hazard event: search and rescue, first aid, shelter, food and water.");
  b.card("DEFINITION", "Secondary responses", "Long-term actions: rebuilding homes and infrastructure, restoring jobs and services, improving building codes.");
  b.card("CONCEPT", "Disaster risk management cycle", "Mitigation → preparedness → response → recovery.");
  b.card("CONCEPT", "Monitoring volcanoes", "Seismometers (small earthquakes), tiltmeters and GPS (ground swelling), gas sampling (SO₂, CO₂), satellites (movement, heat).");
  b.card("CONCEPT", "Earthquake-resistant buildings", "Deep foundations, base isolators, cross-braced steel frames, counterweight dampers, shatterproof glass, automatic gas shut-off.");
  b.card("CONCEPT", "Planning for hazards", "Hazard mapping, land-use zoning, evacuation plans, drills and education, emergency kits.");
  b.card("FACT", "Nepal earthquake, 2015", "25 April 2015, magnitude 7.8, collision boundary (Indo-Australian and Eurasian plates); about 9,000 deaths; landslides and slow rebuilding in remote areas.", undefined, { applies: CAM });
  b.card("FACT", "Mount Pinatubo, 1991", "Philippines, destructive boundary; monitoring led to evacuation of tens of thousands; about 800-900 deaths, many from ash-laden roofs collapsing; lahars for years; global cooling of about 0.5 °C.", undefined, { applies: CAM });
  b.card("VOCABULARY", "Retrofitting", "Adding strengthening features to existing buildings so they withstand earthquakes.");
});
