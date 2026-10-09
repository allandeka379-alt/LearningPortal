// Slice G2a: living with tectonic hazards — why people stay and the impacts (ZIMSEC and Cambridge).
import { concept, P, geographyLevels, CAM } from "../lib.mjs";

const EVENTS = "| Earthquake (fictional) | Country income group | Magnitude | Depth (km) | Population within 50 km | Deaths |\n|---|---|---|---|---|---|\n| E1 | LIC | 6.6 | 12 | 1,800,000 | 9,400 |\n| E2 | HIC | 6.9 | 15 | 2,400,000 | 64 |\n| E3 | MIC | 7.3 | 35 | 600,000 | 1,150 |\n| E4 | HIC | 7.8 | 420 | 250,000 | 0 |";

concept("geo.tectonics.hazard-impacts", { file: "tectonics/hazard-impacts", keyPrefix: "tectonics.hazard-impacts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a **primary** impact of an earthquake?",
    options: [
      ["Buildings collapsing because of the shaking", "Correct: caused directly by the event."],
      ["Cholera spreading in emergency camps", "Disease is a secondary impact that follows later."],
      ["Fires started by broken gas pipes", "Fires are secondary: they result from damage."],
      ["People losing jobs when factories close", "Job losses are a secondary, economic impact."],
    ],
    answer: "A",
    explanation: "**Primary** impacts come directly from the shaking; **secondary** impacts follow from it.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why do many farmers live on the slopes of volcanoes?",
    options: [
      ["Weathered ash and lava make very fertile soils", "Correct: crops grow well."],
      ["The land is flat and easy to plough", "Volcano slopes are often steep."],
      ["Eruptions never affect the lower slopes of the volcano", "Lahars, ash and lava can reach lower slopes."],
      ["Rainfall is always low on volcanoes", "Low rainfall would not attract farmers."],
    ],
    answer: "A",
    explanation: "Volcanic soils are rich in minerals, so farmers accept the risk, e.g. coffee and bananas on Kilimanjaro.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which factor most increases the number of deaths in an earthquake?",
    options: [
      ["Poorly built, unreinforced buildings in a crowded city", "Correct: collapsing buildings cause most deaths."],
      ["A deep focus far below a rural area", "Deep earthquakes in rural areas usually cause fewer deaths."],
      ["Strict building codes and frequent drills", "These reduce deaths."],
      ["A long distance between the epicentre and the nearest towns", "Distance reduces the shaking felt in towns."],
    ],
    answer: "A",
    explanation: "Building quality and population density are key human factors.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **long-term economic** impact of a major earthquake?",
    options: [
      ["The high cost of rebuilding roads, ports and homes over many years", "Correct: economic and long term."],
      ["People trapped under rubble on the first day", "That is a short-term social impact."],
      ["Fires burning in the city on the night of the earthquake", "That is a short-term impact."],
      ["Landslides blocking rivers and roads in the hours after the main shaking", "That is a short-term environmental impact."],
    ],
    answer: "A",
    explanation: "Rebuilding, lost income and debt continue for years: long-term economic impacts.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "In 2010, earthquakes of similar magnitude struck Haiti (an LIC) and Canterbury in New Zealand (an HIC). Why were deaths so much higher in Haiti?",
    options: [
      ["Buildings were poorly built and emergency services were weak", "Correct: vulnerability, not magnitude, made the difference."],
      ["The Haiti earthquake had a much higher magnitude", "The magnitudes were similar: 7.0 and 7.1."],
      ["New Zealand had no buildings near the epicentre", "Christchurch was about 40 km away and suffered damage."],
      ["Haiti's earthquake was very deep below the surface, far from people", "It was shallow, which made shaking stronger."],
    ],
    answer: "A",
    explanation: "Haiti's weak buildings, dense informal housing and limited services made it highly vulnerable.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which reason for living near a volcano is an **economic** reason?",
    options: [
      ["Jobs in geothermal power stations and tourism", "Correct: income and employment."],
      ["Family graves and traditions on the land", "That is a social or cultural reason."],
      ["Belief that a large eruption will not happen soon", "That is a perception, not an economic reason."],
      ["Liking the view of the mountain", "That is a personal preference."],
    ],
    answer: "A",
    explanation: "Economic reasons include fertile farmland, geothermal energy, mining and tourism jobs.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "An earthquake of magnitude 7.6 occurred at a depth of 380 km beneath a sparsely populated region and caused no deaths. Which statement best explains this?",
    options: [
      ["Deep focus and few people meant weak shaking and little exposure", "Correct: depth reduced shaking and few people were exposed."],
      ["Magnitude 7.8 is too small to damage buildings", "A shallow 7.8 can be devastating."],
      ["Deep earthquakes do not produce any seismic waves", "They do, but the waves weaken before reaching the surface."],
      ["Every building in the region was fully earthquake-proof and built on bedrock", "Nothing in the description suggests this."],
    ],
    answer: "A",
    explanation: "Depth and population exposure are as important as magnitude.",
    hints: ["Look at the depth.", "How many people lived nearby?"],
  });
  b.mcq({
    d: 3, skill: "EVALUATION", applies: CAM,
    stem: "Why do HICs usually suffer **higher economic losses** but **fewer deaths** than LICs in similar earthquakes?",
    options: [
      ["Their property is worth more but is better built", "Correct: high-value property, strong codes and services."],
      ["Earthquakes in HICs are always much smaller", "Earthquake size has nothing to do with income level."],
      ["HICs do not count deaths in official statistics", "Deaths are recorded in all countries."],
      ["People in HICs live further from plate boundaries", "Many HIC cities, such as Tokyo, lie close to boundaries."],
    ],
    answer: "A",
    explanation: "Expensive infrastructure raises economic losses, while building codes, warnings and emergency services save lives.",
    hints: ["Think about the value of property.", "What protects lives in HICs?"],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "After a fictional earthquake, 84,000 of a town's 240,000 people were made homeless. What percentage of the population was made homeless?",
    value: 35, unit: "%",
    wrong: [2.86, 65],
    explanation: "84,000 ÷ 240,000 × 100 = 35 %.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A fictional country's annual GDP is US\\$15 billion. An earthquake causes damage of US\\$3.3 billion. Express the damage as a percentage of annual GDP.",
    value: 22, unit: "%",
    wrong: [4.55, 454.5],
    explanation: "3.3 ÷ 15 × 100 = 22 %. Losses on this scale can set a poor country's development back for years.",
    workedSolution: "1. Damage ÷ GDP = 3.3 ÷ 15 = 0.22.\n2. × 100 = 22 %.",
    hints: ["Divide the damage by the GDP.", "Multiply by 100."],
  });
  b.calc({
    d: 4, skill: "ANALYSIS",
    stem: "A fictional earthquake killed 2,750 people in a region where 1,250,000 people lived within 50 km of the epicentre. Calculate the number of deaths per 100,000 people living within 50 km.",
    value: 220,
    wrong: [2.2, 455],
    explanation: "2,750 ÷ 1,250,000 × 100,000 = 220 deaths per 100,000 people.",
    workedSolution: "1. Deaths ÷ population = 2,750 ÷ 1,250,000 = 0.0022.\n2. × 100,000 = 220.",
    hints: ["Divide deaths by the population.", "Multiply by 100,000."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of renewable energy that people in volcanic areas such as Iceland obtain from hot rocks.",
    accepted: ["geothermal", "geothermal energy", "geothermal power", "geothermal electricity"],
    wrong: ["solar"],
    explanation: "**Geothermal** energy.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "A natural event that could harm people is a {{blank:a}}. When it seriously disrupts a community that cannot cope alone, it becomes a {{blank:b}}. How likely people are to suffer harm is their {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["hazard", "natural hazard"], wrong: "disaster" },
      { id: "b", accepted: ["disaster"], wrong: "hazard" },
      { id: "c", accepted: ["vulnerability"], wrong: "magnitude" },
    ],
    explanation: "Hazard → disaster when vulnerable people are affected.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each impact to its type.",
    pairs: [
      ["Cholera outbreak in crowded camps", "Social, long term"],
      ["Collapse of the main port", "Economic, short term"],
      ["Rivers blocked by landslides", "Environmental, short term"],
      ["Tourists stay away for years", "Economic, long term"],
    ],
    explanation: "Classify impacts by type (social, economic, environmental) and time scale.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: eruptions can have positive long-term impacts as well as negative ones.",
    answer: true,
    feedbackTrue: "Correct: fertile soils, geothermal energy, new land and tourism can follow.",
    feedbackFalse: "Eruptions also bring long-term benefits such as fertile soils and tourism.",
    explanation: "Weathered ash enriches soils; volcanoes attract tourists.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why people continue to live near active volcanoes.",
    points: [
      "Fertile volcanic soils",
      "Developed: give high crop yields and income for farmers",
      "Another reason, e.g. geothermal energy / tourism / attachment to place / poverty / confidence in monitoring",
      "Developed: e.g. cheap electricity and jobs / cannot afford to move / trust warnings to give time to evacuate",
    ],
    modelAnswer: "Weathered ash makes soils very fertile, so farmers get high yields and good incomes. Many families are also too poor to buy land elsewhere and have lived there for generations, so they stay and rely on warnings to give them time to leave.",
    explanation: "Two reasons, each developed.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how **time of day** and **building quality** can affect the number of deaths in an earthquake.",
    points: [
      "Time of day: at night people are asleep indoors and may be trapped",
      "Or during working/school hours people crowd offices and schools, which may collapse",
      "Building quality: unreinforced concrete or heavy roofs collapse and crush people",
      "Reinforced, flexible buildings (or light materials) stay standing, so fewer deaths",
    ],
    modelAnswer: "If an earthquake strikes at night, people are asleep indoors; in weak houses they may be crushed before they can escape. During the day, crowded schools and offices can collapse. Unreinforced concrete buildings with heavy floors collapse easily, while reinforced buildings that flex with the shaking stay standing and protect the people inside.",
    explanation: "Each factor explained in two steps.",
    hints: ["Where are people at different times?", "Why do some buildings collapse?"],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7, applies: CAM,
    stem: "\"The level of development of a country is the most important factor affecting the impacts of an earthquake.\" To what extent do you agree? Refer to examples.",
    points: [
      "Development affects building codes and quality, e.g. Haiti 2010 versus Canterbury 2010",
      "Development affects emergency services, preparedness, warnings and ability to rebuild (insurance, money)",
      "HICs have higher economic losses but fewer deaths",
      "Physical factors: magnitude, depth and distance from towns",
      "Ground conditions and secondary hazards, e.g. tsunami in Japan 2011 affected even a very well-prepared HIC",
      "Population density and time of day",
      "Judgement: development usually decides death tolls, but very large events or secondary hazards can overwhelm even HICs",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Development is very important. In 2010 a magnitude 7.0 earthquake near Port-au-Prince, Haiti, an LIC, killed somewhere between about 100,000 and over 200,000 people, because poorly built concrete homes collapsed and the government, hospitals and port were themselves damaged. A magnitude 7.1 earthquake near Christchurch, New Zealand, an HIC, killed no one directly, thanks to strict building codes and strong emergency services. However, other factors matter. Shallow earthquakes close to cities do more damage than deep or remote ones. Secondary hazards can overwhelm even rich countries: in 2011 the tsunami that followed the magnitude 9 earthquake in Japan killed thousands of people despite excellent preparation and caused a nuclear accident at Fukushima. Population density and time of day also change death tolls. Overall I mostly agree: development explains most of the difference in deaths between similar earthquakes, but magnitude and secondary hazards set limits that even HICs cannot fully overcome.",
    explanation: "Credit comparison of named examples and weighing of physical and human factors.",
    hints: ["Use a comparison of an LIC and an HIC.", "Find an example where development was not enough."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Table 1 shows four fictional earthquakes.\n\n${EVENTS}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Which earthquake had the highest magnitude?", accepted: ["E4"], wrong: ["E1"], explanation: "E4, magnitude 7.8." }),
      P.num({ label: "(b)", marks: 1, stem: "How many more deaths were there in E1 than in E2?", value: 9336, wrong: [9464], explanation: "9,400 − 64 = 9,336." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest **three** reasons why E1 caused far more deaths than E2, although E2 was larger.", points: [
        "E1 was in an LIC: likely poorer building quality / weaker building codes",
        "E1 country likely had weaker emergency services and preparedness",
        "E1 was shallower (12 km), so shaking at the surface was stronger",
      ], modelAnswer: "E1 struck an LIC, where many buildings are probably poorly built and codes weakly enforced. Its emergency services and preparedness are likely weaker, so trapped people were not rescued quickly. It was also slightly shallower (12 km), giving stronger surface shaking.", explanation: "Human and physical factors." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why E4 caused no deaths.", points: [
        "Very deep focus (420 km), so shaking at the surface was weak",
        "Fewer people within 50 km (250,000) / an HIC with strong buildings",
      ], modelAnswer: "E4's focus was 420 km deep, so its waves weakened greatly before reaching the surface, and relatively few people lived nearby in an HIC with strong buildings.", explanation: "Depth and exposure." }),
    ],
    hints: ["Compare depth, income group and population.", "Magnitude is not everything."],
    explanation: "Practice in explaining differences in earthquake impacts.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Read the description of a fictional village on the lower slopes of an active volcano. 'About 4,000 people live here. Families grow coffee, bananas and vegetables on rich dark soils. A small geothermal plant 6 km away employs 80 people. Tourists hike to the crater. The last large eruption was 90 years ago, and older people remember ash covering the fields.'",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "What percentage of the village population is employed at the geothermal plant? Give your answer to one decimal place.", value: 2, tol: 0.05, unit: "%", answer: "2.0", wrong: [50], explanation: "80 ÷ 4,000 × 100 = 2.0 %." }),
      P.manual({ label: "(b)", marks: 3, stem: "Using the description, give **three** reasons why people live here.", points: [
        "Fertile soils for coffee, bananas and vegetables",
        "Jobs at the geothermal plant / tourism income from crater hikes",
        "The last large eruption was 90 years ago, so the risk seems low / family ties to the land",
      ], modelAnswer: "The dark volcanic soils are fertile for coffee, bananas and vegetables; the geothermal plant and crater tourism give jobs; and the last big eruption was 90 years ago, so most people feel safe.", explanation: "Three reasons from the resource." }),
      P.manual({ label: "(c)", marks: 4, stem: "Describe the likely social and economic impacts if a large eruption covered the village in ash.", points: [
        "Social: breathing problems / roofs collapse / evacuation and homelessness",
        "Social: schools and clinics close / water supplies polluted",
        "Economic: crops buried and lost; farmers lose income",
        "Economic: tourism stops / geothermal plant damaged or closed; jobs lost",
      ], modelAnswer: "Heavy ash could collapse roofs and cause breathing problems, forcing people to evacuate; schools and clinics would close and water would be polluted. Coffee and banana crops would be buried, destroying farm income, while hikers would stay away and the geothermal plant might shut, so jobs would be lost.", explanation: "Two social and two economic impacts." }),
    ],
    hints: ["Divide the workers by the population.", "Separate social impacts (people) from economic ones (money and jobs)."],
    explanation: "Practice in applying reasons and impacts to a described place.",
  });

  b.card("DEFINITION", "Natural hazard", "A natural event that could cause loss of life, injury or damage to property and the environment.");
  b.card("DEFINITION", "Disaster", "A hazard event that seriously disrupts a community, causing losses it cannot cope with using its own resources.");
  b.card("DEFINITION", "Vulnerability", "How likely people and places are to suffer harm from a hazard (poverty, building quality, preparedness, access to help).");
  b.card("CONCEPT", "Primary vs secondary impacts", "Primary: directly from the event (collapse, lava). Secondary: follow on (fires, disease, homelessness, job losses).");
  b.card("CONCEPT", "Why people live near hazards", "Fertile soils, geothermal energy, minerals, jobs in cities, tourism, attachment to place, poverty, confidence in protection.");
  b.card("CONCEPT", "Factors affecting damage", "Physical: magnitude, depth, distance, ground, secondary hazards. Human: population density, building quality, development, preparedness, time of day.");
  b.card("FACT", "Haiti and Canterbury, 2010", "Haiti (LIC): magnitude 7.0, deaths estimated from about 100,000 to over 200,000. Canterbury, New Zealand (HIC): magnitude 7.1, no deaths directly from the shaking.", undefined, { applies: CAM });
  b.card("FACT", "Montserrat, from 1995", "Soufrière Hills eruptions: 19 deaths in June 1997, capital Plymouth abandoned, southern exclusion zone, many people left the island.");
});
