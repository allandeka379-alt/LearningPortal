// Slice G1a: weather hazards (floods, lightning, drought, hail, heatwaves, frost) and human influence on local weather.
import { concept, P, geographyLevels } from "../lib.mjs";

const RF = "| Season (fictional district) | Rainfall (mm) |\n|---|---|\n| Long-term mean | 620 |\n| 2019-20 | 540 |\n| 2020-21 | 710 |\n| 2021-22 | 455 |\n| 2022-23 | 655 |\n| 2023-24 | 310 |";

concept("geo.weather.hazards", { file: "weather/hazards", keyPrefix: "weather.hazards" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **drought**?",
    options: [
      ["A long period with rainfall well below normal", "Correct: it is defined against what is normal for the place."],
      ["Any month in which no rain falls", "A rainless month is normal in Zimbabwe's dry season."],
      ["A season of very high temperatures", "That describes a heatwave, not a drought."],
      ["A sudden fall in the level of a river", "River levels can fall for many reasons; drought is about rainfall."],
    ],
    answer: "A",
    explanation: "A **drought** is a long period of much less rain than normal, so water supplies, crops and pasture suffer.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which cloud type produces lightning?",
    options: [
      ["Cumulonimbus", "Correct: tall storm clouds build up electrical charge."],
      ["Cirrus", "Cirrus is thin, high ice cloud that does not produce storms."],
      ["Stratus", "Stratus is a low grey layer that brings drizzle at most."],
      ["Altostratus", "This mid-level layer cloud does not usually produce lightning."],
    ],
    answer: "A",
    explanation: "Lightning comes from **cumulonimbus**, where colliding ice and water particles separate electrical charges.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the **safest** place to shelter when a thunderstorm approaches a group of herd boys in open grassland?",
    options: [
      ["Inside a solid building or a closed vehicle", "Correct: these protect people from a direct strike."],
      ["Under the tallest tree nearby", "Isolated tall trees attract lightning."],
      ["On top of a nearby kopje for a better view", "High, exposed points are the most likely to be struck."],
      ["Lying flat in the middle of the grassland", "Lying flat increases contact with the ground and the risk from ground current."],
    ],
    answer: "A",
    explanation: "Shelter in a **solid building or closed car**. Avoid trees, hilltops, water and metal fences.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do low-lying places such as Muzarabani flood in many wet seasons?",
    options: [
      ["Flat land beside rivers that overflow after heavy rain", "Correct: water spreads out and drains slowly from flat valley floors."],
      ["They receive the highest rainfall in Zimbabwe", "The wettest areas are the Eastern Highlands, not the Zambezi valley."],
      ["Their soils are always frozen in winter", "Zimbabwe's soils do not freeze; floods come in the wet season."],
      ["Tropical cyclones reach them every year", "Cyclones affect Zimbabwe only in some years."],
    ],
    answer: "A",
    explanation: "Flat valley floors next to large rivers flood when heavy rain upstream makes rivers overflow, and water drains away slowly.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which ocean-atmosphere event is often linked to **below-normal** rainfall in Zimbabwe?",
    options: [
      ["El Niño", "Correct: El Niño years such as 1991-92 and 2015-16 brought drought."],
      ["La Niña", "La Niña is more often linked to normal or above-normal rains in southern Africa."],
      ["The south-east trades", "These are a normal air stream, not a drought-causing event."],
      ["The urban heat island", "This is a local effect of towns, not a cause of national drought."],
    ],
    answer: "A",
    explanation: "**El Niño**, a warming of the eastern Pacific, is often associated with drought over southern Africa.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer's tomatoes in a valley bottom are damaged on a July morning, while those on the slope above survive. What is the **best** explanation?",
    options: [
      ["Cold air sinks into the valley at night, causing frost", "Correct: valley bottoms are frost hollows."],
      ["The slope receives more July rain, which protects plants", "July is in the dry season, and rain does not prevent frost."],
      ["The valley floor gets scorched by stronger midday sun", "The slope and valley get similar sun; the damage came at night, not midday."],
      ["Hail falls only on low ground, never on slopes", "Hail is a summer storm hazard and falls on any ground."],
    ],
    answer: "A",
    explanation: "On clear, calm winter nights cold air sinks into hollows and valley floors, so frost is worst there.",
    hints: ["Which hazard happens on winter mornings?", "Is cold air heavier or lighter than warm air?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why are towns often warmer than the surrounding countryside?",
    options: [
      ["Buildings and tarmac store heat; traffic adds more", "Correct: this creates an urban heat island."],
      ["Towns are always built at much lower altitudes", "Harare and Bulawayo stand on the plateau like the farms around them."],
      ["Towns receive many more hours of sunshine", "Pollution can actually reduce sunshine in towns."],
      ["Towns have more trees that trap the heat", "Trees cool the air by shade and transpiration."],
    ],
    answer: "A",
    explanation: "Concrete, brick and tarmac absorb heat by day and release it at night, and traffic and industry add heat: the **urban heat island**.",
    hints: ["Think about what towns are made of.", "Which human activities give off heat?"],
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Sound travels at about 340 m per second. A student counts 9 seconds between a lightning flash and the thunder. How far away was the strike, in kilometres? Give your answer to one decimal place.",
    value: 3.06, unit: "km", tol: 0.06, answer: "3.1",
    wrong: [9, 37.8],
    explanation: "Distance = 340 × 9 = 3,060 m = 3.06 km, about 3.1 km.",
    hints: ["Distance = speed × time.", "Convert metres to kilometres by dividing by 1,000."],
  });
  b.calc({
    d: 2, skill: "APPLICATION",
    stem: `The table shows rainfall in a fictional district.\n\n${RF}\n\nThe 2023-24 rainfall was what percentage of the long-term mean? Give your answer to the nearest whole number.`,
    value: 50, unit: "%", tol: 0.5,
    wrong: [200, 310],
    explanation: "310 ÷ 620 × 100 = 50 %.",
    workedSolution: "1. 2023-24 rainfall = 310 mm; long-term mean = 620 mm.\n2. 310 ÷ 620 × 100 = 50 %.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `The table shows rainfall in a fictional district.\n\n${RF}\n\nBy how many millimetres was the 2021-22 season below the long-term mean?`,
    value: 165, unit: "mm",
    wrong: [455, 255],
    explanation: "620 − 455 = 165 mm below the mean.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Tall buildings, schools and clinics can be protected from lightning by fitting a lightning {{blank:a}}, which carries the electric current safely to the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["conductor", "rod", "conductor rod"], wrong: "bulb" },
      { id: "b", accepted: ["ground", "earth"], wrong: "roof" },
    ],
    explanation: "A **lightning conductor** carries the current safely to the **ground (earth)**.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each hazard with a measure that reduces its impact.",
    pairs: [
      ["Drought", "Growing sorghum and millet and harvesting rainwater"],
      ["Flood", "Early warnings and moving people to higher ground"],
      ["Lightning", "Fitting conductors and sheltering in solid buildings"],
      ["Frost", "Planting sensitive crops on slopes rather than valley floors"],
    ],
    explanation: "Each measure targets the cause or effect of its hazard.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Deforestation can make the local climate drier because there is less transpiration from plants.",
    answer: true,
    explanation: "True. Trees return water vapour to the air by transpiration; removing them reduces humidity and can reduce local rainfall.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Hailstorms in Zimbabwe mainly occur in the cool dry season.",
    answer: false,
    explanation: "False. Hail falls from cumulonimbus storms in the hot wet season.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the warmer area of air that forms over a town because buildings and traffic add and store heat.",
    accepted: ["urban heat island", "heat island", "an urban heat island"],
    wrong: ["rain shadow"],
    explanation: "This is the **urban heat island**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** effects of a severe drought on people in rural Zimbabwe.",
    points: [
      "Crops fail, causing food shortages and hunger (need for food aid).",
      "Cattle and goats die from lack of water and pasture, losing wealth and draught power.",
      "Wells, boreholes and rivers dry up, so people walk further for water and diseases spread.",
      "Loss of income, so children may leave school and people migrate to towns.",
    ],
    modelAnswer: "Maize and other crops wilt and fail, so families face hunger and depend on food aid. Cattle die because grazing and water run out, so farmers lose wealth and draught power. Wells and rivers dry up, so women and children walk long distances for water, which may be unsafe. Incomes fall, so school fees cannot be paid and some people move to towns to look for work.",
    explanation: "Credit four different effects, each linked to people.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Suggest **three** ways in which human activities can change the weather around a large dam such as Kariba.",
    points: [
      "The large water surface adds water vapour (higher humidity) to the air nearby.",
      "Water heats and cools more slowly than land, so temperatures near the shore are moderated.",
      "Extra moisture may lead to more cloud, mist or local showers near the lake.",
    ],
    modelAnswer: "The lake surface evaporates large amounts of water, so the air nearby is more humid. Because water warms and cools slowly, nights near the shore are a little milder and days a little cooler. The extra moisture can lead to more local cloud, mist or showers.",
    explanation: "Credit humidity, moderated temperatures and possible extra cloud or rain.",
    hints: ["What happens to water on a large lake in hot weather?", "Compare how quickly land and water heat up."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "\"Drought is a greater hazard than floods in Zimbabwe.\" To what extent do you agree? Refer to named areas or events.",
    points: [
      ["Drought affects large areas (regions IV and V especially) and most rural households at once.", 1],
      ["Named drought example (e.g. 1991-92 or 2015-16, El Niño years) with effects on crops, cattle and water.", 1],
      ["Drought effects last long (food shortages for a year or more; low Kariba levels reduce HEP).", 1],
      ["Floods are more local (e.g. Muzarabani, Tsholotsho) but sudden.", 1],
      ["Floods cause deaths, destroy infrastructure and spread water-borne disease (e.g. after Cyclone Idai 2019).", 1],
      ["Some areas face both hazards, sometimes in the same season.", 1],
      ["A reasoned judgement (e.g. drought affects more people overall; floods cause more sudden loss of life locally).", 1],
    ],
    levels: geographyLevels(7),
    modelAnswer: "To a large extent I agree. Drought affects most of the country at once, especially natural regions IV and V where rainfall is already low and unreliable. In El Niño years such as 1991-92 and 2015-16 crops failed over wide areas, cattle died and many families needed food aid. The effects last long: a failed season means hunger until the next harvest, and low water in Kariba reduces hydro-electric power for industry and homes.\n\nFloods are more local but sudden and deadly. Low-lying areas such as Muzarabani and Tsholotsho flood often, and the floods after Cyclone Idai in 2019 killed many people in Chimanimani and Chipinge, destroyed roads, bridges and homes, and spread water-borne disease.\n\nOverall, drought is the greater hazard because it affects more people for longer, but floods cause more sudden loss of life in particular places, and some communities suffer both.",
    explanation: "A balanced answer weighs scale, duration and suddenness with named examples, then reaches a judgement.",
    hints: ["Compare how many people, how large an area and how long each hazard lasts.", "Use a named drought year and a named flood area."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `The table shows rainfall in a fictional district in natural region IV.\n\n${RF}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the season with the lowest rainfall.", accepted: ["2023-24", "2023 24", "2023/24", "2023-2024", "202324"], wrong: ["2021-22"], explanation: "2023-24, with 310 mm." }),
      P.num({ label: "(b)", marks: 1, stem: "How many of the five seasons were below the long-term mean?", value: 3, wrong: [2], explanation: "2019-20 (540), 2021-22 (455) and 2023-24 (310): 3 seasons." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the mean rainfall of the five seasons.", value: 534, unit: "mm", wrong: [620, 2670], explanation: "540 + 710 + 455 + 655 + 310 = 2,670; 2,670 ÷ 5 = 534 mm." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest **two** reasons why a district like this suffers from drought.", points: [
        "Low and unreliable rainfall in region IV (mid-season dry spells, late onset of rains).",
        "El Niño years / persistent high pressure bring below-normal rainfall.",
      ], explanation: "Credit unreliability, dry spells, El Niño or high pressure." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest **two** ways farmers in this district could reduce the impact of drought.", points: [
        "Grow drought-tolerant small grains (sorghum, millet) or early-maturing varieties.",
        "Conserve water: mulching, planting basins, rainwater harvesting or small-scale irrigation.",
      ], explanation: "Credit any two practical, local measures." }),
    ],
    hints: ["Compare each season with 620 mm.", "Mean = total ÷ number of seasons."],
    explanation: "Practice in analysing rainfall variability and suggesting responses.",
  });
  b.struct({
    d: 2, skill: "UNDERSTANDING",
    stem: "A newspaper report (fictional) describes a February storm in a rural ward: hailstones the size of marbles fell for 15 minutes, flattening tobacco and maize fields. Lightning struck a hut and killed three cattle sheltering under a tree. A small river burst its banks and washed away a footbridge used by schoolchildren.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which type of rainfall most likely produced this storm?", options: [
        ["Convectional", "Correct: hot-season storms with hail and lightning come from cumulonimbus."],
        ["Frontal", "Frontal rain is uncommon in Zimbabwe in February."],
        ["Relief", "Nothing in the report links the storm to high ground facing the wind."],
        ["Drizzle", "Drizzle is not a type of rainfall and does not bring hail."],
      ], answer: "A", explanation: "Hail and lightning in February point to convectional cumulonimbus storms." }),
      P.manual({ label: "(b)", marks: 3, stem: "Identify **three** hazards described in the report and one effect of each.", points: [
        "Hail: crops (tobacco and maize) flattened, loss of income or food.",
        "Lightning: hut struck and cattle killed.",
        "Flash flood: footbridge washed away, children cut off from school.",
      ], explanation: "One mark per hazard with its effect." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest **two** measures the community could take to reduce losses in future storms.", points: [
        "Lightning conductors on buildings / keeping people and cattle away from isolated trees in storms.",
        "Stronger, raised footbridge or crop insurance / hail nets for high-value crops.",
      ], explanation: "Credit practical measures matched to the hazards." }),
    ],
    hints: ["Find the three different hazards in the report.", "Match each measure to a hazard."],
    explanation: "Practice in identifying weather hazards and their effects.",
  });
  b.card("DEFINITION", "Weather hazard", "A weather event that can cause loss of life, injury, damage to property or disruption to economic activity.");
  b.card("DEFINITION", "Drought", "A long period with rainfall well below normal, so water, crops and pasture suffer.");
  b.card("CONCEPT", "Causes of drought in Zimbabwe", "Late onset or early end of rains, mid-season dry spells, El Niño years, persistent high pressure.");
  b.card("FACT", "El Niño droughts", "1991-92 and 2015-16 were El Niño years with severe drought in southern Africa.");
  b.card("CONCEPT", "Causes of floods", "Heavy or prolonged rain, saturated or bare ground, flat low-lying land beside rivers, deforestation in catchments.");
  b.card("FACT", "Flood-prone areas", "Low-lying Muzarabani (Zambezi valley) and Tsholotsho (Matabeleland North).");
  b.card("CONCEPT", "Lightning safety", "Shelter in a solid building or closed car; avoid isolated trees, hilltops, water and fences; fit lightning conductors.");
  b.card("CONCEPT", "Frost hollow", "Cold, dense air drains downhill on clear, calm nights and collects in valley bottoms, where frost is worst.");
  b.card("DEFINITION", "Urban heat island", "A town warmer than the surrounding countryside because buildings store heat and traffic and industry release it.");
  b.card("CONCEPT", "People change local weather", "Towns (heat island), deforestation (drier), dams (more humid, milder), industry (smog, acid rain), cloud seeding.");
});
