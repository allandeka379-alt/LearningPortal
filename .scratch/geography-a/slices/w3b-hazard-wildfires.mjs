// W3b: hazard.wildfires (Cambridge only, A Level Paper 3 option 9). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, sum, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3b-_q.mjs";

const burnHa = rnd(Math.PI * 2 ** 2 * 100, 0, 1257, "burnHa");
const FIRES = [[2019, 310, 41200, 232], [2020, 280, 25400, 196], [2021, 350, 62300, 259], [2022, 290, 33100, 203]];
const sizeYr = chk(75600 / 420, 180, 1e-9);
const humanPct21 = chk((259 / 350) * 100, 74, 1e-9);
const totArea = chk(sum(FIRES.map((f) => f[2])), 162000);
const meanArea = chk(totArea / 4, 40500, 1e-9);
const FT = tbl(["Year", "Number of fires", "Area burned (ha)", "Fires started by people"], FIRES.map((f) => [f[0], f[1], String(f[2]).replace(/(\d)(\d{3})$/, "$1 $2"), f[3]]));
const t1 = chk(15 / 3, 5, 1e-9);
// Struct B: trials
const TR = [["1", "Level, light wind", 0, 10, 1.5], ["2", "Level, strong wind", 0, 40, 6.0], ["3", "Uphill, light wind", 10, 10, 3.0]];
const ratio = chk(6.0 / 1.5, 4, 1e-9);
const time3 = chk(12 / 3.0, 4, 1e-9);
const time2 = chk(12 / 6.0, 2, 1e-9);
const TRT = tbl(["Trial", "Conditions", "Slope (°)", "Wind speed (km/h)", "Rate of spread (km/h)"], TR.map((r) => [r[0], r[1], r[2], r[3], r[4].toFixed(1)]));

concept("ageo.hazard.wildfires", { file: "hazard/wildfires", keyPrefix: "hazard.wildfires", applies: CAM }, (b) => {
  mc(b, 2, "RECALL", "Which three things make up the fire triangle?", [
    ["Fuel, heat and oxygen", "Correct: removing any one of them puts out the fire."],
    ["Wind, slope and fuel", "These affect spread, but are not the three requirements for burning."],
    ["Lightning, drought and wind", "These are causes and conditions, not the three requirements."],
    ["Smoke, ash and heat", "Smoke and ash are products of a fire, not requirements."],
  ], "A fire needs **fuel, heat and oxygen**.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why are Mediterranean-climate regions such as California and south-west Australia prone to wildfires?", [
    ["Wet winters grow vegetation that dries in the hot, dry summers", "Correct: the dry season turns the plant growth into fuel."],
    ["They have rain throughout the year, so plants grow all the time", "Rain in every season would keep fuel moist."],
    ["They lie on the equator, where lightning is most frequent", "These regions are in the mid-latitudes."],
    ["They have no vegetation and so the soil burns", "These regions have a lot of vegetation."],
  ], "The pattern of a **wet growing season and a dry hot summer** produces dry fuel.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is meant by 'spotting' in the spread of a wildfire?", [
    ["Burning embers carried by wind start new fires ahead of the front", "Correct: this makes fires hard to contain."],
    ["The use of satellites to detect hot spots on the ground", "That is monitoring, not spotting."],
    ["The practice of lighting small fires to remove fuel", "That is prescribed burning."],
    ["The pattern of burnt and unburnt patches left in a forest after a fire", "That describes the burn mosaic after a fire."],
  ], "**Spotting** = embers carried ahead of the fire front.");
  mc(b, 3, "APPLICATION", "Why does a fire usually travel faster uphill than on level ground?", [
    ["Flames are closer to the fuel above and preheat it", "Correct: the fuel dries and ignites more quickly."],
    ["Gravity pulls the burning material up the slope towards the top", "Gravity does not pull material upward."],
    ["There is less oxygen at the top of a slope", "Less oxygen would slow the fire."],
    ["Vegetation on slopes is always wetter", "Wetter fuel would slow the fire."],
  ], "Uphill, flames **preheat the fuel above** and are carried up by convection.", { hints: ["Think of where the flames are relative to the fuel."] });
  mc(b, 3, "ANALYSIS", "Which of these is the best reason for using prescribed burning?", [
    ["It reduces the fuel load, so later fires are less intense", "Correct: less fuel means lower intensity and slower spread."],
    ["It removes all risk of wildfire in the following ten years", "Fuel regrows and the risk is reduced, not removed."],
    ["It cools the climate by removing the carbon in the vegetation", "Burning releases carbon dioxide."],
    ["It stops lightning from igniting the vegetation", "Lightning can still ignite remaining vegetation."],
  ], "**Fuel reduction** lowers the intensity and speed of later fires.", { hints: ["Which side of the fire triangle can people change?"] });
  mc(b, 3, "ANALYSIS", "Why are wildfires a growing hazard in many regions, according to current evidence?", [
    ["Hotter, drier seasons and more homes near vegetation", "Correct: climate and land use both increase risk."],
    ["Lightning has become the only cause of ignition", "Most fires are still started by people."],
    ["Vegetation has stopped growing in fire-prone regions", "Vegetation grows and provides fuel."],
    ["Satellites now cause fires through the heat of their sensors", "Satellites only detect fires."],
  ], "**Climate** (longer, hotter, drier seasons) and **exposure** (more homes at the wildland–urban interface) both raise risk.", { hints: ["Think of both the hazard and the exposure."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In many regions most wildfires are started by people, whether by accident or on purpose.", answer: true,
    feedbackTrue: "Correct: examples are campfires, power lines, arson and land clearing.", feedbackFalse: "Not so: in many regions human ignition is the main cause.",
    explanation: "Lightning is the main natural cause, but **people** start most fires in many regions." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each term to its meaning.",
    pairs: [
      ["Crown fire", "Fire spreading from tree top to tree top"],
      ["Firebreak", "A strip cleared of fuel to stop or slow a fire"],
      ["Wildland–urban interface", "Zone where buildings meet natural vegetation"],
      ["Prescribed burning", "Planned, controlled fire to reduce the fuel load"],
      ["Surface fire", "Fire burning grass, litter and shrubs"],
    ], explanation: "Each term relates to the type, spread or management of a fire." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A fire needs fuel, heat and {{blank:a}}. Burning embers carried ahead of the fire front are called {{blank:b}}, and a strip cleared of fuel is called a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["oxygen"], choices: ["oxygen", "nitrogen", "carbon dioxide"] },
      { id: "b", accepted: ["spotting"], choices: ["spotting", "lofting", "quenching"] },
      { id: "c", accepted: ["firebreak"], choices: ["firebreak", "hot spot", "fire front"] },
    ], explanation: "Oxygen, spotting and firebreak." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the type of wildfire that spreads from the top of one tree to the next and is usually the fastest and most intense.",
    accepted: ["crown fire", "a crown fire", "crown", "canopy fire"],
    explanation: "A **crown fire** burns in the tree canopy." });

  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "ha",
    stem: "A fire spreads 2 km in all directions from its starting point. Assuming the burned area is a circle, calculate its area in hectares (1 km² = 100 ha), to the nearest hectare.",
    hints: ["Area = π × r² in km², then multiply by 100."],
    value: burnHa, dp: 0, wrong: [12.57, 400, 628],
    explanation: "1. Area = π × 2² = 12.57 km².\n2. Hectares = 12.57 × 100 = **1 257 ha**.\n3. The value 12.57 is in km²; 628 uses the circumference formula 2πr × 100." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "h",
    stem: "A town lies 15 km from a fire. The fire front spreads at 3 km/h across level ground. How many hours before the fire reaches the town?",
    hints: ["Time = distance ÷ speed."],
    value: t1, wrong: [45, 0.2, 12],
    explanation: "15 ÷ 3 = **5 hours**. Multiplying 15 × 3 gives 45." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "ha",
    stem: "In 2023 an illustrative region (invented for this exercise) recorded 420 wildfires that burned a total of 75 600 ha. Calculate the mean area burned per fire, in hectares.",
    hints: ["Area burned ÷ number of fires."],
    value: sizeYr, wrong: [75600, 1.8, 420],
    explanation: "75 600 ÷ 420 = **180 ha** per fire." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why savanna grasslands in Africa burn almost every year.",
    hints: ["Think of the wet season growth, the dry season and ignition."],
    points: [
      "The wet season produces a large amount of tall grass.",
      "In the long dry season the grass dries out and becomes continuous, fine fuel.",
      "Ignition is frequent from lightning at the start of the rains and from people clearing land, hunting or managing grazing.",
      "Strong dry-season winds spread the fire quickly, and the grass regrows when the rains return, so fuel builds up again each year.",
    ],
    modelAnswer: "The wet season produces a large amount of tall grass, and in the long dry season it dries out and forms continuous fine fuel. Fires are started frequently by lightning and by people clearing land, hunting or managing grazing, and dry winds spread them quickly. The grass regrows in the rains, so fuel builds up again each year.",
    explanation: "A seasonal climate produces fuel, and ignition is common." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the wildland–urban interface is the area of greatest wildfire risk to people.",
    hints: ["Think of fuel, buildings and escape."],
    points: [
      "Houses are built beside or among vegetation, which supplies fuel close to the buildings.",
      "Embers carried by the wind can ignite roofs, gutters and wooden structures.",
      "Narrow roads and many people mean evacuation can be slow and routes can be blocked.",
      "Many residents have little experience of fire or have not prepared, so there is little defensible space or plan.",
    ],
    modelAnswer: "Houses beside vegetation have fuel close to them, and embers carried by wind can ignite roofs and wooden structures. Narrow roads and large numbers of people make evacuation slow, and many residents have not prepared a defensible space or an escape plan.",
    explanation: "Fuel, ignition by embers, evacuation and preparation." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how satellites and weather data are used to monitor and predict wildfires.",
    points: [
      "Satellites detect hot spots and active fires, usually within hours, and map burned areas.",
      "Temperature, humidity, wind speed and fuel dryness are combined in fire danger ratings.",
      "Warnings of a high or catastrophic fire danger lead to restrictions, readiness and public alerts.",
    ],
    modelAnswer: "Satellites detect hot spots and active fires within hours and map the burned area. Temperature, humidity, wind and the dryness of fuel are combined in a fire danger rating, and a high rating triggers restrictions, readiness and public warnings.",
    hints: ["Detection, rating and warning."],
    explanation: "Monitoring detects fires; danger ratings predict risk." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why prescribed burning is difficult to carry out in some regions.",
    hints: ["Think of safety, weather and public attitudes."],
    points: [
      "Few days have the right weather (not too dry or windy), and the burn can escape and become a wildfire.",
      "Smoke affects the health of nearby communities and public opposition can be strong.",
      "It needs trained crews and funding, and climate change reduces the number of safe burning days.",
    ],
    modelAnswer: "There are few days with the right weather and the burn can escape and become a wildfire. Smoke affects health and the public may oppose it. It needs trained crews and money, and climate change reduces the number of safe burning days.",
    explanation: "Safety, health, cost and climate limit prescribed burning." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table gives an illustrative record of wildfires in a region over four years (data invented for this exercise).\n\n${FT}`,
    hints: ["Mean = total ÷ number of years.", "Percentage = part ÷ whole × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean area burned per year, in hectares.", value: meanArea, unit: "ha", wrong: [162000, 8100, 33100],
        explanation: "Total = 41 200 + 25 400 + 62 300 + 33 100 = 162 000 ha. 162 000 ÷ 4 = 40 500 ha." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage of the fires in 2021 that were started by people.", value: humanPct21, unit: "%", wrong: [259, 26, 7.4],
        explanation: "259 ÷ 350 × 100 = 74%." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe the pattern of the area burned between 2019 and 2022.",
        points: ["The area burned varies from year to year and is not a steady trend, with a minimum of 25 400 ha in 2020.", "It peaks at 62 300 ha in 2021, about 2.5 times the 2020 value."],
        modelAnswer: "The area burned varies from year to year. It was lowest in 2020 (25 400 ha) and peaked in 2021 (62 300 ha), about 2.5 times the 2020 value.",
        explanation: "Quote the minimum, maximum and the change." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two reasons why 2021 had the largest area burned although it did not have the most fires.",
        points: ["A hotter, drier or windier fire season dried the fuel and spread fires faster.", "Larger fuel loads, fires in remote places, or delayed detection and response allowed the fires to grow."],
        modelAnswer: "A hotter, drier or windier season dried the fuel and spread the fires faster. Larger fuel loads, remote locations or delayed detection allowed the fires to grow larger.",
        explanation: "Weather, fuel and response affect size." }),
    ], explanation: "Calculate a mean and a percentage, describe a pattern and explain a peak." });

  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `Fire behaviour was measured in three trials (illustrative data, invented for this exercise).\n\n${TRT}`,
    hints: ["Time = distance ÷ rate of spread.", "Compare trials with only one change."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "How many times faster was the rate of spread in trial 2 than in trial 1?", value: ratio, unit: "times", wrong: [4.5, 6, 0.25],
        explanation: "6.0 ÷ 1.5 = 4 times." }),
      P.num({ label: "(b)", marks: 2, stem: "A settlement lies 12 km from the fire. How many hours would the fire take to reach it under the conditions of trial 3?", value: time3, unit: "h", wrong: [2, 36, 0.25],
        explanation: "12 ÷ 3.0 = 4 hours. Using trial 2 would give 2 hours." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which comparison best shows the effect of slope on the rate of spread?", options: [
        ["Trial 1 and trial 3", "Correct: wind speed is the same (10 km/h), and only the slope differs."],
        ["Trial 1 and trial 2", "These differ in wind speed, not slope."],
        ["Trial 2 and trial 3", "These differ in both wind and slope."],
        ["Trial 3 on its own", "A comparison needs two trials."],
      ], answer: "A", explanation: "A fair test changes only one variable." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why a fire spreads faster uphill than on level ground.",
        points: ["Flames lean towards the slope and are closer to the unburned fuel above.", "Heat from radiation and convection preheats and dries the fuel before the flame arrives.", "Rising hot air carries flames and embers up the slope."],
        modelAnswer: "Flames lean towards the slope and are close to the fuel above. Radiation and convection preheat and dry the fuel before the flames arrive, and rising hot air carries flames and embers up the slope.",
        explanation: "Preheating and convection speed uphill spread." }),
      P.manual({ label: "(e)", marks: 4, stem: "Assess how the results can be used to plan safer evacuation of the settlement.",
        points: ["Under strong winds the fire could arrive in 2 hours (trial 2), so evacuation must start before this time.", "Slopes and wind increase the speed, so the plan must use the worst case, not the average.", "Real fires are less steady, and spotting can start fires ahead of the front, so the trials may underestimate the speed.", "Warnings should be based on fire danger and the forecast wind, and routes must be clear, so the results help but cannot be the only basis."],
        modelAnswer: "In strong wind the fire could reach the settlement in 2 hours, so evacuation must begin before then and use the worst case. Real fires are less steady and spotting starts fires ahead of the front, so the trials may underestimate the speed. Warnings should use the fire danger rating and the forecast wind, so the results help but are not enough alone.",
        explanation: "Use the data for planning and judge their limits." }),
    ], explanation: "Compare fire spread rates, calculate arrival time and assess planning." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the effectiveness of strategies to reduce the risk of wildfire to people and property.",
    hints: ["Separate fuel management, building design, warning and education.", "Use an example."],
    points: [
      "Fuel reduction (prescribed burning, thinning, firebreaks) lowers the intensity and spread of fires but can escape and must be repeated as fuel regrows.",
      "Defensible space and fire-resistant buildings protect individual homes, but retrofitting is costly and benefits those who can pay.",
      "Planning controls at the wildland–urban interface reduce exposure but are hard to enforce where land is scarce.",
      "Danger ratings, satellite detection and public warnings give time to leave, but only if people trust and understand them (Black Saturday, 2009).",
      "Firefighting suppresses most fires, but cannot stop fires in extreme weather, when most damage happens.",
      "Education and law reduce human ignitions, which are the main cause in many regions.",
      "Climate change is making fire weather more extreme, so strategies lose effectiveness unless adapted.",
      "Judgement: a combination of prevention, planning and warning is most effective, with fuel management and preparation more reliable than suppression in extreme conditions.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "No single strategy is enough. Fuel reduction by prescribed burning and firebreaks lowers the intensity of fires, but burns can escape and fuel regrows. Fire-resistant buildings and cleared space protect homes, though they are costly for poor households. Planning controls cut exposure, but are hard to enforce. Danger ratings, satellite detection and warnings give time to leave, but on Black Saturday in 2009, in extreme conditions, many people had little time. Firefighters can control most fires but not those in extreme weather. Education and law reduce human ignitions. I conclude that a combination of prevention, planning and warning is most effective, and that preparation matters more than suppression in extreme conditions.",
    wordLimit: { max: 300 }, explanation: "Weigh each strategy, with limits, and reach a judgement." });

  b.card("DEFINITION", "Fire triangle", "Fuel, heat and oxygen: the three requirements for a fire. Removing one puts out the fire.");
  b.card("CONCEPT", "Fire-prone regions", "Mediterranean-climate regions (California, Mediterranean basin, south-west Australia, Chile, the Western Cape), boreal forests, savannas and cleared tropical forests and peatlands.");
  b.card("CONCEPT", "Causes of wildfires", "Physical: lightning, sparks from falling rocks. Human: accidents (cigarettes, campfires, power lines, escaped burning) and arson or land-clearing fires.");
  b.card("CONCEPT", "Controls on spread", "Fuel (dry and continuous), wind (and spotting by embers), topography (faster uphill), and weather (hot, dry air).");
  b.card("DEFINITION", "Wildland–urban interface", "The zone where buildings meet or mix with natural vegetation: the area of greatest risk to people and property.");
  b.card("CONCEPT", "Wildfire management", "Danger ratings and satellite monitoring, prescribed burning and firebreaks, defensible space, planning, education and law, firefighting and evacuation, recovery.");
  b.card("FACT", "Black Saturday, 7 February 2009", "Victoria, Australia: extreme heat and wind; 173 deaths and about 2 000 homes destroyed.");
  b.card("FACT", "Camp Fire, November 2018", "California: 85 deaths and about 18 000 buildings destroyed; investigators linked the ignition to electrical equipment.");
  b.card("CONCEPT", "Climate change and wildfire", "Longer, hotter, drier fire seasons and more extreme fire weather raise the risk and severity; a fire still needs an ignition source.");
});
