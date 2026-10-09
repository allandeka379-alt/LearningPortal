// W4b: Hazards, risks and disasters; disaster management (her.global.hazards-disasters).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.global.hazards-disasters", { file: "global/hazards-disasters", keyPrefix: "global.hazards-disasters" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which term means something that **could** cause harm to people, property or the environment?",
    options: [
      ["hazard", "Correct: a hazard is a possible source of harm."],
      ["disaster", "A disaster is serious harm that has actually happened."],
      ["recovery", "Recovery is rebuilding after a disaster."],
      ["relief", "Relief is help given during and after a disaster."],
    ],
    answer: "A",
    explanation: "A hazard is a potential source of harm; a disaster is what happens when it causes serious loss.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did Cyclone Idai strike eastern Zimbabwe?",
    options: [
      ["2019", "Correct: Cyclone Idai struck in March 2019."],
      ["2008", "2008 is remembered for a cholera outbreak."],
      ["1980", "1980 is the year of independence."],
      ["2013", "2013 is the year of the new Constitution."],
    ],
    answer: "A",
    explanation: "Cyclone Idai caused floods and landslides in Chimanimani and Chipinge in March 2019.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An outbreak of fall armyworm destroying maize crops is an example of which type of hazard?",
    options: [
      ["biological", "Correct: it is caused by a living pest."],
      ["mechanical", "Mechanical hazards come from machines and structures."],
      ["political", "This is not a hazard type in the topic."],
      ["climatic only", "Weather is not the direct cause; a pest is."],
    ],
    answer: "A",
    explanation: "Pests and diseases are biological hazards.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **man-made (mechanical)** hazard?",
    options: [
      ["the collapse of a mine shaft", "Correct: it involves a human-built structure."],
      ["a long dry spell in the growing season", "This is a natural hazard."],
      ["an outbreak of cholera", "This is a biological hazard."],
      ["lightning during a storm", "Lightning is a natural hazard."],
    ],
    answer: "A",
    explanation: "Mine collapses, road accidents, fires and building collapses are man-made hazards.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which body issues weather forecasts and warnings of heavy rain in Zimbabwe?",
    options: [
      ["the Meteorological Services Department", "Correct: it forecasts weather and issues warnings."],
      ["the Zimbabwe Electoral Commission", "ZEC runs elections."],
      ["the Zimbabwe Media Commission", "This commission regulates the media."],
      ["the Master of the High Court", "The Master deals with deceased estates."],
    ],
    answer: "A",
    explanation: "The Meteorological Services Department forecasts the weather and warns of storms and dry spells.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A village moves its homes away from a river bank that floods most rainy seasons. Which stage of disaster management is this?",
    options: [
      ["mitigation", "Correct: it reduces harm before the hazard strikes."],
      ["response", "Response happens during or just after a disaster."],
      ["recovery", "Recovery is rebuilding after a disaster."],
      ["relief distribution", "Relief is emergency help after a disaster."],
    ],
    answer: "A",
    hints: ["Has the flood happened yet?"],
    explanation: "Moving homes off the flood plain reduces future harm: mitigation.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "After floods, many people in a camp fall ill with diarrhoea. Which action would **best** reduce this?",
    options: [
      ["providing safe water and toilets in the camp", "Correct: clean water and sanitation stop water-borne disease."],
      ["handing out more blankets and plastic sheeting", "Blankets help with cold, not diarrhoea."],
      ["building a new road to the camp", "A road helps access but does not stop the disease directly."],
      ["issuing a new weather warning on the radio", "The flood has already happened."],
    ],
    answer: "A",
    hints: ["How do diarrhoeal diseases spread?"],
    explanation: "Diarrhoeal diseases such as cholera spread through dirty water and poor sanitation.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two families face the same heavy rain, but only one loses its home. Which statement **best** explains the difference?",
    options: [
      ["The families differed in vulnerability and preparedness", "Correct: location, housing and warnings change the risk."],
      ["Heavy rain affects only families who are poor", "Rain falls on everyone; harm depends on vulnerability."],
      ["The hazard was natural, so the damage was decided by chance alone", "Human factors such as housing and location matter."],
      ["Only one family experienced a hazard", "Both faced the same hazard."],
    ],
    answer: "A",
    hints: ["What makes a family easier or harder to harm?"],
    explanation: "The hazard was the same; the risk differed because of where and how each family lived and whether they were warned.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A drought is a long period of below-normal rainfall.",
    answer: true,
    explanation: "True. A drought leaves too little water for people, crops and animals.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Human activities such as deforestation and building on flood plains can make floods more damaging.",
    answer: true,
    explanation: "True. Deforestation increases run-off and building on flood plains puts people in the water's path.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each action with its stage of disaster management.",
    pairs: [
      ["school evacuation drills", "preparedness"],
      ["search and rescue after a flood", "response"],
      ["rebuilding bridges and clinics", "recovery"],
      ["planting trees on unstable slopes", "mitigation"],
    ],
    explanation: "Drills prepare; rescue is response; rebuilding is recovery; planting trees reduces future harm (mitigation).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Cyclone Idai hit {{blank:a}} and Chipinge districts. Disaster preparedness and response are coordinated by the Department of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Chimanimani"], choices: ["Chimanimani", "Hwange", "Lupane", "Kariba"] },
      { id: "b", accepted: ["Civil Protection"], choices: ["Civil Protection", "Social Welfare", "Mines", "Tourism"] },
    ],
    explanation: "Chimanimani and Chipinge in Manicaland were hardest hit; the Department of Civil Protection coordinates disaster management.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Distinguish between a hazard, a risk and a disaster.",
    points: [
      "Hazard: something that could cause harm (e.g. heavy rain)",
      "Risk: the chance that the hazard will cause harm, depending on exposure and vulnerability",
      "Disaster: the hazard actually causes serious loss that the community cannot cope with alone",
    ],
    modelAnswer: "A hazard is something that could cause harm, such as heavy rain. Risk is the chance that it will cause harm, which is greater for people living on a flood plain. A disaster happens when the hazard actually causes serious loss of life or property that the community cannot cope with on its own.",
    explanation: "One mark for each correct meaning.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** effects of drought on a rural community.",
    points: [
      "Identifies crop failure / hunger",
      "Develops: harvests fail, so families run short of food and may need food aid",
      "Identifies livestock deaths / loss of wealth",
      "Develops: cattle die for lack of water and grazing, so families lose savings and draught power",
      "Identifies water shortages / effects on school or health",
      "Develops: e.g. people walk far for water; children miss school to help, or malnutrition rises",
    ],
    modelAnswer: "Crops wilt and harvests fail, so families run short of food and may depend on food aid. Cattle die because water and grazing run out, so families lose their savings and the oxen they use to plough. Wells and rivers dry up, so women and children walk long distances for water and children may miss school.",
    hints: ["Think of food, livestock and water."],
    explanation: "One mark for each effect and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a fictional rural district council near Muzarabani could prepare for floods, and explain how each would help.",
    points: [
      "Suggests an early warning system (radio, phones, village heads, sirens) in local languages",
      "Explains that people get time to move to safety with their property",
      "Suggests evacuation plans / safe high ground / drills / relocating homes off the flood plain / stocking supplies",
      "Explains how it reduces deaths or losses",
    ],
    modelAnswer: "The council could set up an early warning system that passes Meteorological Services warnings to village heads by phone and radio in local languages, so families have time to move to safety. It could also mark safe high ground and hold evacuation drills, so people know where to go and fewer lives are lost.",
    hints: ["Warnings and plans."],
    explanation: "One mark for each suitable preparation and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true,
    stem: source("Source A", "a report in a fictional community newsletter, Manicaland, 2026",
      "Seven years after the cyclone, the new clinic in our ward stands on higher ground, well away from the river. A warning committee of six volunteers now receives weather alerts by phone and visits every homestead when heavy rain is forecast. Last month the school held its second evacuation drill. Some older people still say they will not leave their homes 'because the river has never come this far before'.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which action in the source is an example of **mitigation**?",
        options: [
          ["building the clinic on higher ground", "Correct: it reduces future harm from floods."],
          ["visiting homesteads when rain is forecast", "This is an early warning (preparedness)."],
          ["holding an evacuation drill", "A drill is preparedness."],
          ["refusing to leave homes", "This increases risk."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** ways in which the ward has prepared for future floods.",
        points: ["A warning committee receives alerts and visits homesteads", "Evacuation drills at the school"],
        modelAnswer: "A volunteer warning committee visits homesteads when heavy rain is forecast, and the school holds evacuation drills.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** problem the ward still faces and suggest how it could be solved.",
        points: [
          "Identifies the problem: some older people refuse to evacuate",
          "Explains the danger: past experience is not a safe guide; they could be trapped or killed",
          "Suggests a solution, e.g. respected elders, chiefs or church leaders explain the warnings; drills that include the elderly",
        ],
        modelAnswer: "Some older people refuse to leave because the river has never reached their homes before. This is dangerous because a stronger storm could flood areas that were safe in the past. The committee could ask chiefs, church leaders and respected elders to explain the warnings and include older people in the drills.",
      }),
    ],
    hints: ["In (c), look at the last sentence of the source."],
    explanation: "A source-based practice item on mitigation and preparedness after a disaster.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "This question is about disaster management in Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 6,
        stem: "Describe the roles of **three** different groups in responding to a disaster such as Cyclone Idai.",
        points: [
          "Group 1, e.g. the Department of Civil Protection / government",
          "Role: coordinates rescue, relief and rebuilding / Met Department warns / security forces rescue",
          "Group 2, e.g. NGOs and international bodies (Red Cross, UN agencies, churches)",
          "Role: provide food, shelter, clean water, medicines",
          "Group 3, e.g. local communities / individuals / businesses",
          "Role: first rescuers, collect and donate food and clothes, volunteer in clean-up",
        ],
        modelAnswer: "The Department of Civil Protection coordinates the response, while the security forces carry out search and rescue. Relief organisations such as the Zimbabwe Red Cross Society, United Nations agencies and churches provide food, tents, clean water and medicines. Local people are often the first rescuers, and individuals, schools and businesses across the country collect money, food and clothing for victims.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Disasters in Zimbabwe are better reduced by preparation than by relief after they happen.\" Discuss.",
        points: [
          ["Case for preparation/mitigation: warnings, safer siting, drills, grain reserves save lives and cost less", 2],
          ["Case for relief: some hazards cannot be fully prevented; victims need immediate food, shelter, medical care", 2],
          ["Limits of each: preparation needs money and trust in warnings; relief comes late where roads are cut", 2],
          ["Supported judgement (e.g. both needed but preparation reduces the need for relief)", 2],
        ],
        levels: levels(8),
        modelAnswer: "Preparation and mitigation save lives before a disaster happens. Early warnings in local languages, homes and clinics built away from rivers and unstable slopes, evacuation drills and grain reserves mean fewer people are harmed, and they usually cost less than rebuilding.\n\nRelief is still essential. Some hazards, such as a cyclone as strong as Idai, cannot be fully prevented, and survivors need food, shelter, clean water and medical care at once.\n\nBoth have limits. Preparation needs money, planning and people who trust the warnings; relief may arrive late when roads and bridges are destroyed, as happened in 2019.\n\nI largely agree. Relief will always be needed, but every dollar spent on preparation reduces the number of people who need relief at all.",
      }),
    ],
    hints: ["In (b), ask which approach saves more lives and money, and when relief is unavoidable."],
    explanation: "A practice evaluative item on disaster management.",
  });

  b.card("DEFINITION", "Hazard", "Something that could cause harm to people, property or the environment.");
  b.card("DEFINITION", "Risk", "The chance that a hazard will cause harm, depending on exposure and vulnerability.");
  b.card("DEFINITION", "Disaster", "A hazard event that causes serious loss beyond what the community can cope with alone.");
  b.card("DEFINITION", "Vulnerability", "How easily people or places are harmed by a hazard (e.g. poverty, poor housing, living on a flood plain).");
  b.card("FACT", "When and where did Cyclone Idai strike Zimbabwe?", "March 2019, mainly Chimanimani and Chipinge in Manicaland.");
  b.card("FACT", "Which body coordinates disaster management in Zimbabwe?", "The Department of Civil Protection.");
  b.card("CONCEPT", "Name the three types of hazard with an example of each.", "Natural (flood, drought), biological (cholera, fall armyworm), man-made (mine collapse, road accident).");
  b.card("CONCEPT", "Name the four stages of the disaster management cycle.", "Mitigation, preparedness, response, recovery.");
  b.card("CONCEPT", "Why do floods often lead to disease?", "Toilets and wells are flooded, so drinking water is contaminated and diseases such as cholera spread.");
});
