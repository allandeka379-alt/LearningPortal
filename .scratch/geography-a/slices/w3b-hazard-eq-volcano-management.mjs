// W3b: hazard.eq-volcano-management (Cambridge only, A Level Paper 3 option 9). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3b-_q.mjs";

const VS = 3.5;
const warn1 = chk(112 / VS - 12, 20, 1e-9);
const bcr = chk((150 - 30) / 60, 2, 1e-9);
const evacPct = rnd((42000 / 56000) * 100, 0, 75, "evacPct");
// Struct A: monitoring data
const WK = [1, 2, 3, 4, 5, 6];
const EQ = [12, 18, 40, 95, 160, 210];
const SO2 = [300, 450, 1200, 3600, 5400, 7200];
const UP = [0, 4, 15, 38, 70, 110];
const so2Mult = chk(SO2[5] / SO2[0], 24, 1e-9);
const eqRate = chk((EQ[5] - EQ[0]) / 5, 39.6, 1e-9);
const MON = tbl(["Week", ...WK], [["Earthquakes per day", ...EQ], ["Sulfur dioxide (tonnes per day)", ...SO2.map((x) => String(x).replace(/^(\d)(\d{3})$/, "$1 $2"))], ["Ground uplift since week 1 (mm)", ...UP]]);
// Struct B: early warning, alert issued 20 s after the origin time
const ALERT = 20;
const CITIES = [["P", 56], ["Q", 105], ["R", 168]];
const sArr = CITIES.map(([, d]) => d / VS);
chk(sArr[0], 16, 1e-9);
const wQ = chk(sArr[1] - ALERT, 10, 1e-9);
const wR = chk(sArr[2] - ALERT, 28, 1e-9);
const CT = tbl(["City", "Distance from the epicentre (km)", "Arrival time of S waves (s after origin)"], CITIES.map(([n, d], i) => [n, d, sArr[i]]));

concept("ageo.hazard.eq-volcano-management", { file: "hazard/eq-volcano-management", keyPrefix: "hazard.eq-volcano-management", applies: CAM }, (b) => {
  mc(b, 2, "RECALL", "Which of these is a precursor that scientists monitor before a volcanic eruption?", [
    ["Swarms of small earthquakes and swelling of the ground", "Correct: both show magma moving upwards."],
    ["A fall in the number of tourists visiting the area", "This is a social effect and not a physical precursor."],
    ["A decrease in sulfur dioxide gas emitted from vents", "Gas emissions normally increase before an eruption."],
    ["A permanent cooling of the crater and surrounding rock", "Heat usually rises as magma approaches."],
  ], "Earthquake swarms, **ground deformation**, rising gas and heat are volcanic precursors.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "How does an earthquake early warning system give a few seconds' notice?", [
    ["It detects fast P waves and sends an alert before slower S waves arrive", "Correct: the alert travels faster than the damaging waves."],
    ["It detects the small foreshocks that always precede all great earthquakes", "Foreshocks are not reliable and not always present."],
    ["It measures the strain in rocks several years before the event", "That is long-term forecasting, not warning."],
    ["It measures changes in the behaviour of animals nearby", "Animal behaviour is not a reliable signal."],
  ], "Early warning uses the **speed difference** between P waves and the damaging S and surface waves.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "What is the main purpose of base isolators in an earthquake-resistant building?", [
    ["To decouple the building from ground movement so it sways less", "Correct: flexible bearings absorb part of the shaking."],
    ["To raise the building high above the ground on tall steel legs", "They do not raise the building; they allow it to move relative to the ground."],
    ["To prevent aftershocks from being felt in the basement", "Isolators reduce shaking but do not stop aftershocks."],
    ["To reinforce the roof against the weight of volcanic ash", "They are used against earthquake shaking, not ashfall."],
  ], "**Base isolators** are flexible bearings that reduce the shaking passed into the structure.", { hints: ["Think of the building floating on rubber and steel pads."] });
  mc(b, 3, "ANALYSIS", "Why can a false alarm before a volcanic eruption damage future management?", [
    ["People may lose trust and ignore the next warning", "Correct: reduced trust cuts compliance with later evacuations."],
    ["The volcano becomes more likely to erupt later", "A warning does not change the probability of an eruption."],
    ["Scientists stop monitoring the volcano permanently", "Monitoring continues."],
    ["Farmers are legally prevented from using the land", "A false alarm does not by itself change land rights."],
  ], "Trust is essential: after a **false alarm** people may not evacuate next time.", { hints: ["Think of people and their trust in authorities."] });
  mc(b, 3, "ANALYSIS", "Which statement best explains why some countries cope better with earthquakes than others?", [
    ["They enforce building codes and have trained emergency services", "Correct: resources and governance lower vulnerability."],
    ["They have fewer plate boundaries and so more frequent earthquakes", "Japan and Chile have many earthquakes and cope well."],
    ["They can predict the exact time of each earthquake", "Earthquakes cannot be predicted in this way."],
    ["Their earthquakes are always of low magnitude", "Chile and Japan have experienced great earthquakes."],
  ], "**Enforced codes, preparation and emergency services** reduce vulnerability.", { hints: ["Compare Chile with Haiti."] });
  mc(b, 3, "EVALUATION", "A hazard map shows a lahar channel. Which action would be the most effective land-use planning response?", [
    ["Ban new housing in the channel and move existing homes to high ground", "Correct: it removes exposure to the hazard."],
    ["Build houses in the channel but paint them in bright warning colours to show the danger", "Colours do not protect against a mud flow."],
    ["Allow building with a note on the deeds about the risk", "Information alone does not remove exposure."],
    ["Plant a few trees along the river bank near the homes", "A few trees do not stop a large lahar."],
  ], "Land-use planning works by **removing exposure** to the hazard.", { hints: ["Planning keeps people away from the hazard."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Scientists can currently predict the exact date, place and size of a large earthquake.", answer: false,
    feedbackTrue: "Not so: no method does this reliably.", feedbackFalse: "Correct: they can only give probabilities for a period, and early warning gives seconds.",
    explanation: "Earthquakes cannot be predicted. **Forecasts** give probabilities and **early warning** gives seconds." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each strategy to the hazard it mainly reduces.",
    pairs: [
      ["Base isolation", "Earthquake shaking"],
      ["Sediment dams in valleys", "Lahars"],
      ["Strong, steeply pitched roofs", "Ashfall"],
      ["Exclusion zone around the crater", "Pyroclastic flows"],
      ["Seawater spray on a lava front", "Lava flows"],
    ], explanation: "Each strategy is designed to reduce a particular hazard." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A {{blank:a}} gives the probability of an event over a period of time, whereas an {{blank:b}} sends an alert after an earthquake has started. Volcanic eruptions are more predictable because they show {{blank:c}} such as earthquake swarms.",
    blanks: [
      { id: "a", accepted: ["forecast"], choices: ["forecast", "prediction", "drill"] },
      { id: "b", accepted: ["early warning"], choices: ["early warning", "aftershock", "hazard map"] },
      { id: "c", accepted: ["precursors"], choices: ["precursors", "aftershocks", "tsunamis"] },
    ], explanation: "A forecast is a probability; early warning follows detection; precursors precede eruptions." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the term for a part of a fault that has not slipped for a long time and may be due a large earthquake.",
    accepted: ["seismic gap", "a seismic gap", "gap"],
    explanation: "A **seismic gap** is a locked section where strain has built up for longer than usual." });

  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "s",
    stem: "An earthquake occurs 112 km from a city. An early warning alert is issued 12 seconds after the earthquake begins. S waves travel at 3.5 km/s. Calculate the warning time before the S waves arrive, in seconds.",
    hints: ["Find the S wave arrival time first.", "Warning time = arrival time − time of the alert."],
    value: warn1, wrong: [32, 44, 12],
    explanation: "1. S wave arrival = 112 ÷ 3.5 = 32 s.\n2. Warning time = 32 − 12 = **20 s**. The value 32 is the arrival time." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "A government plans to retrofit buildings at a cost of US\\$ 60 million. It estimates that damage in a future earthquake would be US\\$ 150 million without the retrofit and US\\$ 30 million with it. Calculate the benefit-to-cost ratio (damage avoided ÷ cost).",
    hints: ["Damage avoided = 150 − 30."],
    value: bcr, wrong: [2.5, 0.5, 120],
    explanation: "Damage avoided = 150 − 30 = 120. Ratio = 120 ÷ 60 = **2.0**. The value 2.5 divides 150 by 60 and ignores the damage that still occurs." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "Before an eruption, 42 000 of the 56 000 people living in the danger zone are evacuated. What percentage of the people were evacuated?",
    hints: ["Percentage = part ÷ whole × 100."],
    value: evacPct, wrong: [25, 1.33, 133],
    explanation: "42 000 ÷ 56 000 × 100 = **75%**." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why volcanic eruptions can be forecast more successfully than earthquakes.",
    hints: ["Magma has to move upwards before an eruption."],
    points: [
      "Magma moving upwards produces precursors: swarms of small earthquakes, tremor and swelling of the ground.",
      "Gas emissions (sulfur dioxide) and heat flow increase as magma nears the surface.",
      "These changes can be measured with seismometers, tiltmeters, GPS, gas sensors and satellites over days to weeks.",
      "Earthquakes result from a sudden release of strain with no reliable warning signal, so only probabilities can be given.",
    ],
    modelAnswer: "Magma moving upwards produces precursors such as swarms of small earthquakes and swelling of the ground, and gas emissions and heat increase. These can be measured over days or weeks with seismometers, tiltmeters, GPS and gas sensors. Earthquakes result from a sudden release of strain with no reliable warning signal, so only probabilities can be given.",
    explanation: "Volcanoes give measurable precursors; earthquakes do not." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why building codes do not always reduce earthquake losses.",
    hints: ["Consider enforcement, cost and old buildings."],
    points: [
      "Codes apply mainly to new buildings, while older buildings remain vulnerable until they are retrofitted.",
      "Retrofitting is expensive, and poor households cannot afford to strengthen or rebuild.",
      "Codes need inspectors and honest enforcement; corruption or lack of staff allows weak construction.",
      "Informal housing is built outside the planning system and so is not covered by the code.",
    ],
    modelAnswer: "Codes apply mainly to new buildings, so older ones stay vulnerable unless retrofitted, which is expensive for poor households. Codes also need inspectors and honest enforcement, and informal housing is built outside the planning system, so many weak buildings remain.",
    explanation: "Coverage, cost, enforcement and informality limit codes." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest three reasons why some people refuse to evacuate when a volcano is erupting.",
    hints: ["Think of livelihoods, trust and fear."],
    points: [
      "Fear of losing homes, farms and livestock, or of theft while they are away.",
      "Distrust of the authorities after earlier false alarms, or a belief that the volcano will not erupt.",
      "Poor conditions in evacuation camps, or cultural and religious beliefs and family ties to the land.",
    ],
    modelAnswer: "They fear losing their homes, farms and livestock, or theft while they are away. They may distrust the authorities after earlier false alarms. Evacuation camps may be poor, and family ties or beliefs bind people to the land.",
    explanation: "Livelihoods, trust and living conditions affect evacuation." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe three actions that people should take in the first minutes of an earthquake.",
    points: [
      "Drop to the ground, take cover under a strong table or desk and hold on.",
      "Stay away from windows, heavy furniture and outside walls, and do not use lifts.",
      "If outdoors, move to an open area away from buildings, power lines and trees.",
    ],
    modelAnswer: "Drop down, take cover under a strong table and hold on. Stay away from windows and heavy furniture and do not use lifts. If outdoors, move to an open area away from buildings and power lines.",
    explanation: "Drop, cover and hold on; keep away from falling objects." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `A volcano is monitored for six weeks (illustrative data, invented for this exercise).\n\n${MON}`,
    hints: ["Multiple = week 6 value ÷ week 1 value.", "Mean rise per week = total increase ÷ number of weeks."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate how many times greater the sulfur dioxide emission was in week 6 than in week 1.", value: so2Mult, unit: "times", wrong: [6900, 7200, 0.04],
        explanation: "7 200 ÷ 300 = 24 times. The value 6 900 is the difference." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the mean weekly increase in the number of earthquakes per day between week 1 and week 6, to one decimal place.", value: eqRate, dp: 1, wrong: [198, 33, 35.0],
        explanation: "(210 − 12) ÷ 5 = 39.6 per week. Five intervals separate week 1 from week 6 (198 ÷ 6 gives 33.0)." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe the pattern shown by the ground uplift.",
        points: ["Uplift increases every week, from 0 to 110 mm.", "The rate speeds up: 4 mm in week 2 compared with 40 mm between weeks 5 and 6."],
        modelAnswer: "Ground uplift increases every week, from 0 to 110 mm in week 6. The rate speeds up, from 4 mm in the first week to 40 mm in the last week.",
        explanation: "Describe the trend and quote figures." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why scientists use more than one type of data to decide when to raise the alert level.",
        points: ["Each precursor can have other causes, so one signal alone could give a false alarm.", "When several independent signals rise together the confidence that magma is moving upward is greater."],
        modelAnswer: "Each precursor can have other causes, so one signal alone could cause a false alarm. When earthquakes, gas and uplift all rise together, confidence that magma is rising is greater.",
        explanation: "Combining evidence reduces false alarms." }),
    ], explanation: "Interpret monitoring data and explain why several precursors are combined." });

  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `An earthquake early warning system issues an alert 20 seconds after the earthquake begins. S waves travel at 3.5 km/s. The table shows three cities (illustrative data).\n\n${CT}`,
    hints: ["Warning time = S arrival time − 20 s.", "A negative or zero answer means no warning."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the warning time for city Q, in seconds.", value: wQ, unit: "s", wrong: [30, 20, 50],
        explanation: "S arrival at Q = 105 ÷ 3.5 = 30 s. Warning = 30 − 20 = 10 s." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which city receives no warning before the S waves arrive?", options: [
        ["City P", "Correct: the S waves arrive after 16 s, before the alert at 20 s (it is in the blind zone)."],
        ["City Q", "It has a warning of 10 s."],
        ["City R", "It has a warning of 28 s."],
        ["All three cities receive a warning", "City P is too close."],
      ], answer: "A", explanation: "City P is in the blind zone." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why places close to the epicentre often get no warning.",
        points: ["The system needs time to detect the P waves, process the data and issue the alert.", "S waves reach nearby places before this time has passed."],
        modelAnswer: "The system needs time to detect the P waves, process the data and send the alert. Places near the epicentre are reached by the S waves before then.",
        explanation: "The blind zone is caused by processing time and short distances." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe three actions that automatic systems or people can take with a warning of 28 seconds.",
        points: ["Trains and lifts stop at the nearest station or floor.", "Gas valves and industrial processes are shut automatically to avoid fires and explosions.", "People drop, cover and hold on, and surgeons stop operations."],
        modelAnswer: "Trains and lifts can stop at the nearest station or floor. Gas valves and industrial processes can be shut off to avoid fires and explosions. People can drop, cover and hold on.",
        explanation: "Even short warnings allow automatic and personal actions." }),
      P.manual({ label: "(e)", marks: 4, stem: "Assess how far early warning systems can reduce the losses from earthquakes.",
        points: ["They give seconds to tens of seconds of notice, enough for automatic shut-offs and for people to take cover.", "They are less useful near the epicentre, where the warning time is zero (the blind zone).", "They need dense instruments, communications and public education, and so cost money that poorer countries may not have.", "They do not prevent building collapse, so design, codes and planning remain more important to reduce deaths."],
        modelAnswer: "Early warning gives seconds to tens of seconds of notice, enough to shut off gas, stop trains and let people take cover. But places near the epicentre receive no warning, and the system needs dense instruments, communications and education, which poorer countries may not afford. Warnings do not stop buildings collapsing, so design, codes and planning remain more important.",
        explanation: "Weigh benefits against limits and judge." }),
    ], explanation: "Calculate warning times, explain the blind zone and assess early warning." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the success of monitoring and evacuation in reducing deaths from volcanic eruptions. Refer to an example.",
    hints: ["Use Pinatubo (1991) and a contrast such as Nevado del Ruiz (1985).", "Include limits."],
    points: [
      "Volcanoes show precursors (earthquake swarms, ground swelling, gas), so monitoring can identify a rising risk.",
      "Pinatubo, 1991: scientists raised the alert level in steps, mapped hazard zones and tens of thousands of people were evacuated before the main eruption.",
      "Deaths at Pinatubo were about 800, far fewer than if no evacuation had occurred; many deaths were from roof collapse under wet ash during a typhoon.",
      "Success depended on early monitoring, clear communication, trust and transport for evacuees.",
      "Limits: timing and size are uncertain, so there can be false alarms, which reduce trust and compliance.",
      "Nevado del Ruiz, 1985: a hazard map existed, but warnings were not acted on in time, and lahars killed about 23 000 people at Armero.",
      "Evacuation has costs: lost income, poor camps and disease, and recovery can be long.",
      "Judgement: monitoring and evacuation are the most effective ways of saving lives from eruptions, but only where there is a clear warning system, trust and the resources to act on it.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Monitoring and evacuation can be very successful because volcanoes show precursors such as earthquake swarms, swelling and gas emissions. At Pinatubo in 1991 scientists raised the alert level step by step and mapped hazard zones, and tens of thousands of people were evacuated, so deaths were about 800, many caused by wet ash collapsing roofs in a typhoon. By contrast, at Nevado del Ruiz in 1985 a hazard map existed but warnings were not acted on in time, and lahars killed about 23 000 people. Timing and size remain uncertain, false alarms reduce trust, and evacuation brings costs such as poor camps and lost income. I conclude that monitoring and evacuation are the most effective way of saving lives, but only where there is trust, communication and the resources to act.",
    wordLimit: { max: 300 }, explanation: "Contrast success and failure, then judge the conditions." });

  b.card("DEFINITION", "Forecast and early warning", "A forecast gives the probability of an event over a period. Early warning detects an event that has started and sends an alert before the damaging waves arrive.");
  b.card("CONCEPT", "Volcanic precursors", "Swarms of small earthquakes and tremor, ground swelling, rising sulfur dioxide and increased heat show that magma is moving up.");
  b.card("CONCEPT", "Why earthquakes cannot be predicted", "There is no reliable signal; scientists identify seismic gaps and give probabilities, and early warning gives only seconds.");
  b.card("CONCEPT", "Earthquake-resistant design", "Reinforced frames, cross-bracing, shear walls and base isolators let buildings sway without collapse; codes must be enforced and old buildings retrofitted.");
  b.card("CONCEPT", "Land-use planning for volcanoes", "Hazard maps and exclusion zones keep housing out of lahar channels and pyroclastic flow paths.");
  b.card("FACT", "Pinatubo evacuation, 1991", "Monitoring and staged alerts led to the evacuation of tens of thousands; about 800 people died, many from roof collapse under wet ash during a typhoon.");
  b.card("FORMULA", "Warning time", "Warning time = S wave arrival time (distance ÷ 3.5 km/s) − time of the alert.");
  b.card("DEFINITION", "Perception of risk", "How people judge a hazard, shaped by past experience, trust, education and the benefits of living there; it can differ from the real risk.");
  b.card("CONCEPT", "Recovery after earthquakes", "Search and rescue in the first days, then shelter, water, health care and rebuilding to safer standards; depends on wealth, insurance, aid and governance.");
});
