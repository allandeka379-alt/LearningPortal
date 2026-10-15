// W3b: hazard.multi-hazard-case (Cambridge only, A Level Paper 3 option 9). The Philippines is the chosen detailed specific example (real, dated, rounded facts only);
// tables of events and budgets are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, sum, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3b-_q.mjs";

const REC = [["Earthquakes", 12, 1600], ["Volcanic eruptions", 8, 2000], ["Tropical cyclones", 20, 14400]];
const nEv = chk(sum(REC.map((r) => r[1])), 40);
const cycShare = chk((30 / 50) * 100, 60, 1e-9);
const meanCyc = chk(REC[2][2] / REC[2][1], 720, 1e-9);
const meanEq = rnd(REC[0][2] / REC[0][1], 0, 133, "meanEq");
const meanVol = chk(1500 / 5, 300, 1e-9);
const totDeaths = chk(sum(REC.map((r) => r[2])), 18000);
const cycDeathPct = chk((25500 / 30000) * 100, 85, 1e-9);
const RT = tbl(["Hazard", "Damaging events", "Deaths (all events)"], REC.map((r) => [r[0], r[1], String(r[2]).replace(/(\d)(\d{3})$/, "$1 $2")]));
const BUD = [["Typhoon shelters", 12], ["Earthquake-resistant schools", 8], ["Volcano monitoring", 6], ["Training and drills", 4]];
const budTot = chk(sum(BUD.map((r) => r[1])), 30);
const shelterPct = chk((12 / budTot) * 100, 40, 1e-9);
const monPct = chk((6 / budTot) * 100, 20, 1e-9);
const BT = tbl(["Item of spending", "US\\$ million"], BUD);

concept("ageo.hazard.multi-hazard-case", { file: "hazard/multi-hazard-case", keyPrefix: "hazard.multi-hazard-case", applies: CAM }, (b) => {
  mc(b, 2, "RECALL", "Why is the Philippines exposed to both earthquakes and volcanoes?", [
    ["It lies on subduction zones and faults of the Pacific Ring of Fire", "Correct: the Manila and Philippine Trenches and the Philippine Fault produce both hazards."],
    ["It lies in the middle of a stable continental plate", "The Philippines is a zone of small plates and active boundaries."],
    ["It is a hotspot island far from any plate boundary", "It lies at plate boundaries, not above a hotspot."],
    ["It has a very warm climate that heats the rocks far below the surface", "Climate does not cause earthquakes or volcanoes."],
  ], "The Philippine Mobile Belt has **subduction zones and active faults**.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which agency monitors volcanoes and earthquakes in the Philippines?", [
    ["PHIVOLCS", "Correct: the Philippine Institute of Volcanology and Seismology."],
    ["PAGASA", "PAGASA monitors weather and typhoons."],
    ["NASA", "NASA is a foreign space agency and not the national monitoring body."],
    ["The World Bank", "The World Bank provides finance, not monitoring."],
  ], "**PHIVOLCS** monitors earthquakes and volcanoes; PAGASA monitors weather.", { daily: true });
  mc(b, 3, "ANALYSIS", "How did Typhoon Yunya increase the impact of the Mount Pinatubo eruption in June 1991?", [
    ["Rain made the ash heavy enough to collapse roofs and started lahars", "Correct: this is an example of a compound hazard."],
    ["The wind removed the ash cloud, so no ash fell near the volcano at all", "Ash fell heavily near Pinatubo."],
    ["The typhoon prevented any evacuation from taking place", "Large evacuations took place before the main eruption."],
    ["The rain cooled the lava and stopped the eruption", "The eruption continued; the rain added water to the ash."],
  ], "Wet ash is much heavier than dry ash: **roof collapse** and **lahars**.", { hints: ["What happens when rain mixes with ash?"] });
  mc(b, 3, "ANALYSIS", "What was the main change introduced by the Philippine Disaster Risk Reduction and Management Act of 2010?", [
    ["A shift from relief after disasters to reducing risk before them", "Correct: it required plans, funds and councils at national and local levels."],
    ["A ban on all building within 50 km of the coast", "No such ban was introduced."],
    ["Transfer of all disaster responsibility to foreign aid agencies and donors", "It strengthened national and local responsibility."],
    ["Removal of local governments from disaster planning", "Local governments were required to plan and set aside funds."],
  ], "The law moved the focus from **relief** to **risk reduction**.", { hints: ["Think of prevention and preparation."] });
  mc(b, 3, "EVALUATION", "Which statement best evaluates management of hazards in the Philippines?", [
    ["Monitoring has worked better than making homes safer", "Correct: Pinatubo's evacuation saved lives, but poverty and weak enforcement keep housing vulnerable."],
    ["All hazards are managed equally well because of the 2010 law", "Haiyan and Bohol showed continuing weaknesses."],
    ["Management has failed completely, with no lives saved at all", "Evacuations have saved many lives."],
    ["Only typhoons are a danger, so no other management is needed", "Earthquakes and volcanoes cause great losses."],
  ], "Hazards that can be **monitored** are managed better than those that depend on housing and poverty.", { hints: ["Compare volcanoes with earthquakes."] });
  mc(b, 3, "ANALYSIS", "Why do large numbers of Filipinos continue to live in hazardous locations?", [
    ["Fertile soils, jobs, poverty and few alternatives", "Correct: benefits and lack of choice outweigh the perceived risk."],
    ["They are unaware that the country has any natural hazards", "Hazards are widely known; most people have experienced them."],
    ["The law forbids anyone from moving to a safer place", "There is no such law."],
    ["The hazards occur only once in a thousand years", "Typhoons occur every year."],
  ], "People weigh **benefits and constraints** against risk.", { hints: ["Think about livelihoods."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A cascading hazard is one in which a first hazard triggers a second, such as heavy rain on volcanic ash producing lahars.", answer: true,
    feedbackTrue: "Correct: one event triggers another.", feedbackFalse: "Not so: this describes a cascading hazard.",
    explanation: "Cascading hazards are linked in sequence: ash then rain then **lahars**." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each event to the hazard it illustrates.",
    pairs: [
      ["Mount Pinatubo, 1991", "Large explosive volcanic eruption"],
      ["Typhoon Haiyan, 2013", "Tropical cyclone with a major storm surge"],
      ["Bohol earthquake, 2013", "Magnitude 7.2 earthquake"],
      ["Luzon earthquake, 1990", "Magnitude 7.7 earthquake on the Philippine Fault"],
      ["Taal eruption, 2020", "Explosive eruption with an ash column to about 15 km"],
    ], explanation: "Each event is a dated example from the Philippines." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The Philippines lies in the Pacific {{blank:a}} of Fire. {{blank:b}} forecasts weather and typhoons, and PHIVOLCS uses an alert level scale from 0 to {{blank:c}} for volcanoes.",
    blanks: [
      { id: "a", accepted: ["Ring"], choices: ["Ring", "Belt", "Rift"] },
      { id: "b", accepted: ["PAGASA"], choices: ["PAGASA", "PHIVOLCS", "NDRRMC"] },
      { id: "c", accepted: ["5"], choices: ["5", "3", "10"] },
    ], explanation: "Ring of Fire, PAGASA and alert level 0 to 5." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the typhoon of November 2013 whose storm surge devastated Tacloban (it is called Yolanda in the Philippines).",
    accepted: ["Haiyan", "Typhoon Haiyan", "Super Typhoon Haiyan", "Yolanda", "Typhoon Yolanda"],
    explanation: "**Typhoon Haiyan (Yolanda)** struck in November 2013." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "An illustrative record (invented for this exercise) lists 50 damaging events in a country: 15 earthquakes, 5 volcanic eruptions and 30 tropical cyclones. Calculate the percentage of the events that were tropical cyclones.",
    hints: ["Cyclones ÷ total events × 100."],
    value: cycShare, wrong: [30, 15, 85],
    explanation: "30 ÷ 50 × 100 = **60%**. The value 30 is the number of cyclones, not the percentage." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "people",
    stem: "In another illustrative record, 5 volcanic eruptions caused a total of 1 500 deaths. Calculate the mean number of deaths per eruption.",
    hints: ["Deaths ÷ number of events."],
    value: meanVol, wrong: [1500, 5, 750],
    explanation: "1 500 ÷ 5 = **300** deaths per eruption. The value 1 500 is the total, not the mean." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "In a third illustrative record, the total number of deaths from earthquakes, eruptions and tropical cyclones was 30 000, and tropical cyclones caused 25 500 of them. Calculate the percentage of deaths caused by tropical cyclones.",
    hints: ["Cyclone deaths ÷ total deaths × 100."],
    value: cycDeathPct, wrong: [60, 25500, 15],
    explanation: "25 500 ÷ 30 000 × 100 = **85%**. The value 15 is the share of deaths from the other two hazards." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the Philippines has earthquakes, volcanoes and tropical cyclones.",
    hints: ["Plate boundaries for two hazards, warm ocean for the third."],
    points: [
      "It lies in the Philippine Mobile Belt on the Pacific Ring of Fire, where plates converge.",
      "Subduction at the Manila and Philippine Trenches and movement on the Philippine Fault cause earthquakes.",
      "Melting above the subducting plates feeds about two dozen active volcanoes.",
      "The warm western Pacific (above about 26.5 °C) and the Coriolis effect at 5°–20°N produce tropical cyclones.",
    ],
    modelAnswer: "The Philippines lies in a zone of plate convergence on the Pacific Ring of Fire. Subduction at the Manila and Philippine Trenches and movement on the Philippine Fault cause earthquakes, and melting above the subducting plates feeds active volcanoes. The warm western Pacific, above about 26.5 °C, and the Coriolis effect at these latitudes produce tropical cyclones.",
    explanation: "Plate tectonics explains two hazards, and the ocean climate explains the third." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how two different hazards in the Philippines can interact to increase the damage.",
    hints: ["Use Pinatubo and Typhoon Yunya, or earthquakes and typhoon rain."],
    points: [
      "Pinatubo erupted in June 1991 as Typhoon Yunya passed nearby.",
      "Rain mixed with the ash, making it much heavier, so roofs collapsed and many people died.",
      "The mixture of ash and rain formed lahars that buried villages for years afterwards.",
      "In the same way, earthquake damage and landslide-prone slopes make buildings and hillsides weaker when typhoon rain follows.",
    ],
    modelAnswer: "Pinatubo erupted in June 1991 as Typhoon Yunya passed nearby. Rain mixed with the ash and made it much heavier, so roofs collapsed and many people died. The wet ash also formed lahars that buried villages for years. Similarly, earthquake-weakened buildings and slopes are more likely to fail when typhoon rain follows.",
    explanation: "Compound and cascading hazards increase impacts." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why warnings before Typhoon Haiyan (2013) did not prevent a very high number of deaths.",
    hints: ["Think of understanding the warning, shelters and surge."],
    points: [
      "Many people did not understand what a storm surge was or how high the water would rise, and did not evacuate far enough.",
      "Shelters near the coast were also affected by the surge, and there were not enough safe buildings.",
      "The storm was extremely intense and weaker houses in low-lying coastal areas were destroyed.",
    ],
    modelAnswer: "Many people did not understand what a storm surge was or how high the water would rise, so they did not evacuate far enough. Some shelters near the coast were flooded and there were too few safe buildings. The storm was extremely intense, and weak houses in low coastal areas were destroyed.",
    explanation: "Warnings must be understood, and refuges must be safe." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 4,
    stem: "Assess the success of the Pinatubo evacuation of 1991.",
    hints: ["Give success and limits."],
    points: [
      "Monitoring and staged alert levels allowed tens of thousands of people to be moved before the main eruption on 15 June.",
      "About 800 deaths occurred, far fewer than in an eruption of this size with no warning.",
      "Many deaths and much damage were caused by the wet ash, because the typhoon was not part of the plan.",
      "Evacuees lived in camps for long periods, with disease and lost incomes, and lahars continued to cause damage for years.",
    ],
    modelAnswer: "Monitoring and staged alert levels allowed tens of thousands of people to move before the main eruption on 15 June 1991, and deaths were about 800, far fewer than if there had been no warning. However, wet ash from the typhoon caused roofs to collapse, evacuees lived in camps with disease and lost incomes, and lahars kept damaging villages for years.",
    explanation: "Weigh lives saved against the remaining losses." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table gives an illustrative record of damaging events (invented for this exercise).\n\n${RT}`,
    hints: ["Mean = deaths ÷ events.", "Compare frequency with deaths per event."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean number of deaths per tropical cyclone.", value: meanCyc, unit: "people", wrong: [14400, 20, 360],
        explanation: "14 400 ÷ 20 = 720." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the mean number of deaths per earthquake, to the nearest whole number.", value: meanEq, dp: 0, unit: "people", wrong: [1600, 12, 200],
        explanation: "1 600 ÷ 12 = 133.3, so 133." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two conclusions about the risks from the three hazards that can be drawn from the table.",
        points: ["Tropical cyclones are the most frequent and cause the most deaths in total (14 400 of 18 000).", "Volcanic eruptions kill the most per event among the hazards after cyclones, so each event is serious (250 per event)."],
        modelAnswer: "Tropical cyclones are the most frequent and cause the most deaths in total, 14 400 of 18 000. Volcanic eruptions average 250 deaths per event, more than earthquakes (133).",
        explanation: "Use frequency, totals and means." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why a table of deaths alone is not enough to decide how to share the funds for disaster management.",
        points: ["It ignores other losses such as homes, livelihoods, displacement and economic damage.", "Past events may not show future risk, such as a rare but very large earthquake, and the effects of climate change."],
        modelAnswer: "It ignores other losses such as homes, livelihoods and displacement. Past events may not show future risk, such as a rare but very large earthquake or the effects of climate change.",
        explanation: "Deaths are one measure of impact only." }),
    ], explanation: "Calculate means from a table and interpret the risks." });

  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `A province in a multi-hazard country has a disaster risk reduction budget (illustrative data, invented for this exercise).\n\n${BT}`,
    hints: ["Total first, then each percentage.", "Think about frequency and scale of each hazard."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of the budget spent on typhoon shelters.", value: shelterPct, unit: "%", wrong: [12, 30, 150],
        explanation: "Total = 30 million. 12 ÷ 30 × 100 = 40%." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage spent on volcano monitoring.", value: monPct, unit: "%", wrong: [6, 16.7, 25],
        explanation: "6 ÷ 30 × 100 = 20%." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why spending on training and drills (US\\$ 4 million) can reduce deaths from several hazards.",
        points: ["Knowing what to do (drop, cover and hold on; evacuate to high ground) is useful in many hazards.", "Drills show people the evacuation routes and shelters, and make responses quick.", "It is cheap compared with large infrastructure but needs repetition to be remembered."],
        modelAnswer: "People who know what to do, such as drop, cover and hold on, or evacuate to high ground, can respond to several hazards. Drills show people the routes and shelters and make their responses quicker. Training is cheap compared with infrastructure, but it needs repeating to be remembered.",
        explanation: "Training applies across hazards." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two reasons why the province might choose to spend more on typhoon shelters than on other items.",
        points: ["Typhoons are the most frequent hazard, with several each year.", "Many people live on the coast, where a surge can affect thousands at once, and shelters protect from both wind and floods."],
        modelAnswer: "Typhoons are the most frequent hazard, with several each year. Many people live on the coast, where a surge can affect thousands at once, and shelters protect from wind and floods.",
        explanation: "Frequency and exposure support the spending." }),
      P.manual({ label: "(e)", marks: 3, stem: "Assess the view that a province should spread its budget across all hazards rather than concentrate on the most frequent one.",
        points: ["A rare event such as a great earthquake or eruption can cause losses larger than many typhoons, so ignoring it would leave the province unprepared.", "But money is limited, and the most frequent hazard causes repeated losses, so more spending on it saves more lives and property in total.", "A balanced approach with shared measures such as training and warning, and extra funds for the most likely hazards, is likely to be best."],
        modelAnswer: "A rare great earthquake or eruption could cause larger losses than many typhoons, so ignoring it would leave the province unprepared. But money is limited and the most frequent hazard causes repeated losses, so more spending on it saves more in total. A balanced approach with shared measures such as training and warning, and extra funds for the most likely hazards, is best.",
        explanation: "Weigh frequency against scale and judge." }),
    ], explanation: "Calculate budget shares and assess the allocation of limited funds." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the extent to which the management of hazards in the Philippines has reduced vulnerability. Refer to named events.",
    hints: ["Use Pinatubo (1991), Haiyan (2013) and Bohol (2013).", "Judge by hazard type."],
    points: [
      "The country has strong institutions: PAGASA, PHIVOLCS and, since 2010, a disaster risk reduction law that requires national and local plans and funds.",
      "Pinatubo, 1991: monitoring and staged alerts allowed a large evacuation, with about 800 deaths.",
      "Drills, evacuation centres and pre-emptive evacuations before typhoons reduce risk each year.",
      "Haiyan, 2013: more than 6 000 deaths, mostly from a storm surge that people did not expect, showing gaps in communication, shelters and housing.",
      "Bohol, 2013: more than 200 deaths and tens of thousands of damaged homes, showing that earthquake risk depends on building quality and poverty.",
      "Building codes are weakly enforced and many informal homes are in hazard zones, so vulnerability remains high.",
      "Hazards recur, and recovery is slow, so people are exposed again before they recover; climate change may increase typhoon rainfall.",
      "Judgement: management has improved for hazards that can be monitored (volcanoes and typhoon tracks), but reducing vulnerability from housing and poverty has been slower, so the extent is partial.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Management has reduced vulnerability partially. The Philippines has strong institutions: PAGASA, PHIVOLCS and a 2010 law requiring plans and funds at national and local levels. At Pinatubo in 1991 monitoring and staged alerts led to a large evacuation, and deaths were about 800. Drills and pre-emptive evacuations help each year. However, Typhoon Haiyan in 2013 killed more than 6 000 people, mostly from a surge that people did not expect, and the Bohol earthquake of the same year caused more than 200 deaths and damaged tens of thousands of homes. Building codes are weakly enforced and many informal homes lie in hazard zones. I conclude that management has worked best for hazards that can be monitored, but reducing vulnerability from housing and poverty has been slower.",
    wordLimit: { max: 300 }, explanation: "Judge success by hazard, with dated evidence." });

  b.card("DEFINITION", "Multi-hazard environment", "A place exposed to two or more different hazards, which may interact or follow one another, so that risk and the demands on response and recovery are higher.");
  b.card("DEFINITION", "Cascading and compound hazards", "Cascading: one hazard triggers another (rain on ash makes lahars). Compound: hazards occur together and their effects combine (Pinatubo and Typhoon Yunya).");
  b.card("CONCEPT", "Why the Philippines is multi-hazard", "Plate convergence in the Philippine Mobile Belt (Manila and Philippine Trenches, Philippine Fault) causes earthquakes and volcanoes; the warm western Pacific produces typhoons.");
  b.card("FACT", "Philippine hazard events", "Luzon earthquake 1990 (magnitude 7.7, about 1 600 deaths); Pinatubo 1991 (about 800 deaths); Bohol 2013 (magnitude 7.2, over 200 deaths); Haiyan 2013 (over 6 000 deaths); Taal 2020.");
  b.card("FACT", "Philippine agencies and law", "PAGASA: weather and typhoons. PHIVOLCS: earthquakes and volcanoes. Republic Act 10121 (2010): shift from relief to risk reduction, with local plans and funds.");
  b.card("CONCEPT", "Strengths and limits of management", "Strengths: monitoring, warnings, drills and a strong law. Limits: informal housing in hazard zones, weak code enforcement, gaps in warnings (Haiyan) and repeated hazards.");
  b.card("CONCEPT", "Structure of a case-study answer", "Name the place and hazards; give causes; two dated events with rounded facts; strategies with named organisations; judge success and limits; end with a supported conclusion.");
  b.card("CONCEPT", "Why people stay in hazard zones", "Fertile soils, fishing, jobs, poverty and lack of alternatives, family ties, and underestimating rare events.");
});
