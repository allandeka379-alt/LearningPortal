// W1b: hazard.weather-climatic (ZIMSEC only; items tagged to ZIMSEC automatically). All data are illustrative.
// Computed: 450/720 = 62.5%; recurrence (40 + 1)/2 = 20.5 and 1/20.5 = 4.9%; heatwave days above 29 °C (run of 4 + run of 3) = 7;
// struct 8: (40 + 1)/1 = 41 and 41/3 = 13.7; struct 12: mean 65.2, fall 44 points = 51.8% of 85.
import { concept, P, geographyLevels, chk, rnd, mean, recurrenceInterval } from "../lib.mjs";
import { mc, tbl } from "../tables/w1b-_q.mjs";

const pct12 = chk((450 / 720) * 100, 62.5);
const ri14 = chk(recurrenceInterval(40, 2), 20.5);
const prob15 = rnd((1 / 20.5) * 100, 1, 4.9, "prob15");
const TEMPS = [26, 27, 29, 30, 31, 32, 31, 29, 27, 30, 30, 31];
const hotDays = TEMPS.filter((t) => t > 29).length;
chk(hotDays, 7);
const TEMPTAB = tbl(["Day", ...TEMPS.map((_, i) => String(i + 1))], [["Maximum temperature (°C)", ...TEMPS]]);
const ri1 = chk(recurrenceInterval(40, 1), 41);
const ri3 = rnd(recurrenceInterval(40, 3), 1, 13.7, "ri3");
const LEV = [92, 85, 41, 38, 70];
const mLev = rnd(mean(LEV), 1, 65.2, "mLev");
const fallPts = chk(85 - 41, 44);
const fallPct = rnd((44 / 85) * 100, 1, 51.8, "fallPct");

concept("ageo.hazard.weather-climatic", { file: "hazard/weather-climatic", keyPrefix: "hazard.weather-climatic" }, (b) => {
  mc(b, 1, "RECALL", "What is an **agricultural drought**?", [
    ["A soil moisture shortage that damages crops", "Correct: the rainfall deficit is serious enough to harm crop growth."],
    ["Low water levels in rivers and in the dams", "That is a hydrological drought."],
    ["Below-normal rainfall of any size at all", "That is a meteorological drought."],
    ["A shortage of food in the local markets", "That is a socio-economic effect of drought."],
  ], "**Agricultural drought** = soil moisture deficit that harms crops.");
  mc(b, 1, "RECALL", "Which climate event is most often linked to drought in southern Africa?", [
    ["El Niño", "Correct: El Niño seasons tend to be hotter and drier."],
    ["La Niña", "La Niña seasons tend to be wetter."],
    ["A strong sea breeze", "A sea breeze is a local coastal wind."],
    ["The Benguela upwelling", "This is a feature of the west coast, not a cause of drought in Zimbabwe."],
  ], "**El Niño** tends to bring drought to southern Africa.");
  mc(b, 2, "UNDERSTANDING", "Why does deforestation of a catchment increase flood risk?", [
    ["Less interception and infiltration give more runoff", "Correct: water reaches the river faster and in greater amounts."],
    ["Trees add more water to the river by transpiration", "Trees take water from the soil; they do not add to the river."],
    ["Bare soil always absorbs more rainfall than a forest", "Bare soil is compacted and absorbs less."],
    ["Deforestation reduces the amount of rainfall to zero", "Rainfall is not removed."],
  ], "Without trees there is less **interception and infiltration**, so more water runs off quickly into rivers.");
  mc(b, 2, "UNDERSTANDING", "Which statement about tornadoes in Zimbabwe is most accurate?", [
    ["They are rare; hail storms are more common", "Correct: damaging winds and hail are the main local storm hazards."],
    ["They are more frequent here than anywhere else on Earth", "The United States has far more tornadoes."],
    ["They only occur in the cold, dry season of the year", "Tornadoes need strong instability, found in the hot, wet season."],
    ["They are rated on the Richter scale of strength", "The Enhanced Fujita scale rates tornadoes."],
  ], "Tornadoes are **rare** in Zimbabwe; thunderstorms with hail and damaging winds are more common.");
  mc(b, 2, "APPLICATION", "Which of these is a **community-level** measure to reduce flood impacts?", [
    ["A ward disaster committee that relays warnings", "Correct: local people organise and respond."],
    ["A national forecasting system run by the state", "This is a national measure."],
    ["A household raising its house on a platform", "This is a household measure."],
    ["An international loan to build a large dam", "This is a national or international measure."],
  ], "Community measures rely on local organisation, such as **ward committees and shared warning systems**.");
  mc(b, 2, "UNDERSTANDING", "Why do heatwaves often develop under a persistent anticyclone?", [
    ["Sinking air warms and skies stay clear", "Correct: compression heats the air and clear skies allow strong heating."],
    ["Rising air brings cool air from the ocean", "Anticyclones have sinking, not rising, air."],
    ["Heavy cloud traps the Sun's rays near the ground", "Anticyclones have few clouds."],
    ["Strong winds mix cool air from above", "Winds in anticyclones are light."],
  ], "Under an **anticyclone** air sinks and warms, skies are clear and there is little wind, so heat builds up.");
  mc(b, 3, "APPLICATION", "A river has a '1-in-20-year' flood. What does this mean?", [
    ["A 5% chance of such a flood each year", "Correct: probability = 1 ÷ 20 = 0.05."],
    ["Such a flood happens exactly every 20 years", "It is an average; two such floods can happen close together."],
    ["Such a flood can happen only once in 20 years", "It can occur in successive years."],
    ["There is a 20% chance in any single year", "That would be a 1-in-5-year flood."],
  ], "A **recurrence interval** of 20 years means a probability of **1 ÷ 20 = 5%** each year.", { hints: ["Probability = 1 ÷ recurrence interval."] });
  b.tf({ d: 2, skill: "RECALL", stem: "Hurricanes, typhoons and cyclones are the same type of storm in different parts of the world.", answer: true, daily: true,
    feedbackTrue: "Correct: they are all tropical cyclones; the name depends on the ocean basin.",
    feedbackFalse: "Not so: the names refer to the same type of storm.",
    explanation: "A **tropical cyclone** is called a hurricane, typhoon or cyclone depending on where it forms." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The scale used to rate tornado intensity is the Enhanced {{blank:a}} scale. A drought that causes a shortage of soil moisture for crops is an {{blank:b}} drought. A flood expected on average once every 50 years has a {{blank:c}} interval of 50 years.",
    blanks: [
      { id: "a", accepted: ["Fujita"], choices: ["Fujita", "Richter", "Beaufort"] },
      { id: "b", accepted: ["agricultural"], choices: ["agricultural", "hydrological", "meteorological"] },
      { id: "c", accepted: ["recurrence"], choices: ["recurrence", "lag", "return-flow"] },
    ], explanation: "Enhanced Fujita; agricultural; recurrence interval." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each hazard to a suitable measure.",
    pairs: [
      ["Drought", "Drought-tolerant crops and water harvesting"],
      ["River flood", "Early warning and no building on the floodplain"],
      ["Heatwave", "Heat warnings and shade, trees and cooling spaces"],
      ["Severe thunderstorm", "Warnings and strongly fixed roofs"],
      ["Landslide after cyclone rain", "Tree cover and avoiding steep slopes for housing"],
    ], explanation: "Each hazard needs measures matched to its cause and effects." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "%", dp: 1,
    stem: "The long-term mean seasonal rainfall at a station is 720 mm. In a drought season 450 mm falls. Calculate the season's rainfall as a percentage of the mean, to 1 decimal place.",
    value: pct12, wrong: [37.5, 270],
    explanation: "450 ÷ 720 × 100 = **62.5%**. The value 37.5% is the shortfall." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "years",
    stem: "A river has 40 years of annual peak flow records. Flood peaks are ranked from the largest (rank 1). Calculate the recurrence interval of the second-largest flood using (n + 1) ÷ rank, in years.",
    hints: ["n is the number of years of record.", "Divide (n + 1) by the rank."],
    value: ri14, wrong: [20, 41],
    explanation: "(40 + 1) ÷ 2 = **20.5 years**. Using 40 ÷ 2 gives 20, which leaves out the +1." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, unit: "%", dp: 1,
    stem: "The recurrence interval of a flood is 20.5 years. Calculate the probability of a flood of that size or greater in any one year, as a percentage to 1 decimal place.",
    hints: ["Probability = 1 ÷ recurrence interval."],
    value: prob15, wrong: [20.5, 0.049],
    explanation: "1 ÷ 20.5 = 0.0488. As a percentage this is **4.9%**." });
  b.num({ d: 4, skill: "ANALYSIS", calculator: true, unit: "days",
    stem: `Illustrative daily maximum temperatures (°C) during a hot spell:\n\n${TEMPTAB}\n\nA heatwave is defined here as at least 3 consecutive days with a maximum above 29 °C. How many days of the 12 are part of a heatwave?`,
    hints: ["Mark the days above 34 °C.", "Count only runs of three or more days."],
    value: hotDays, wrong: [9, 4],
    explanation: "Days 4–7 (30, 31, 32, 31 °C) are a run of 4 days. Days 8 and 9 (29 and 27 °C) are not above 29 °C. Days 10–12 (30, 30, 31 °C) are a run of 3 days. Total = 4 + 3 = **7 days**." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the scale used to rate the intensity of tornadoes.",
    accepted: ["Enhanced Fujita", "Enhanced Fujita scale", "Fujita scale", "Fujita", "EF scale"], wrong: ["Richter scale"],
    explanation: "The **Enhanced Fujita (EF) scale**." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how deforestation of a river catchment increases the risk of flooding.",
    hints: ["Think about interception, infiltration and the speed of runoff."],
    points: [
      "Fewer trees means less interception of rainfall, so more rain reaches the ground directly.",
      "Bare, compacted soil absorbs less water (less infiltration), so more runs off over the surface.",
      "Water reaches rivers more quickly and in greater amounts, and eroded soil silts up channels, so rivers overflow sooner.",
    ],
    modelAnswer: "Fewer trees mean less interception, so more rain hits the ground. Bare, compacted soil absorbs less water, so more runs over the surface to the river quickly. Silt from erosion also fills channels, so the river overflows sooner.",
    explanation: "Less interception and infiltration give more and faster runoff." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the effects of a severe drought on a smallholder household in a communal area.",
    hints: ["Think about food, income, water and health."],
    points: [
      "Crops fail or yields are very low, so the household has less food and may need food aid.",
      "Livestock lose weight or die from lack of pasture and water, so the household loses assets and income.",
      "Water points dry up, so women and children walk further for water.",
      "Hunger, malnutrition, debt, school drop-out or migration of family members to find work may result.",
    ],
    modelAnswer: "The household harvests little or nothing, so food runs short and food aid may be needed. Cattle lose condition or die, reducing wealth and income. Boreholes and wells dry up and water must be fetched from further away. Malnutrition, debt and migration of family members to look for work can follow.",
    explanation: "Effects on food, assets, water and wellbeing." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain why a national early-warning system for floods may not protect people in remote communities.",
    hints: ["Think about the message, the time and the ability to act."],
    points: [
      "Warnings may not reach remote places in time because of poor roads, no mobile coverage or no electricity.",
      "People may not trust or understand the warning, or may not know what to do.",
      "Evacuation may be difficult without transport, safe shelters or higher ground nearby.",
      "Lack of funding or equipment (rain gauges, river gauges) can make forecasts less accurate.",
    ],
    modelAnswer: "A warning may not reach a remote village in time because there is no network coverage or electricity. If it arrives, people may not understand or trust it, and may have no transport or safe place to go. Poor equipment and funding can also make the forecast itself less reliable.",
    explanation: "Warning systems need communication, trust, preparedness and resources to work." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "Illustrative record of the four largest annual flood peaks on a river in 40 years:\n\n" + tbl(["Rank", "1", "2", "3", "4"], [["Peak discharge (m³/s)", 1820, 1540, 1330, 1190]]),
    hints: ["Recurrence interval = (n + 1) ÷ rank, with n = 40."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the recurrence interval of the rank 1 flood, in years.", value: ri1, unit: "years", wrong: [40, 1],
        explanation: "(40 + 1) ÷ 1 = 41 years." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the recurrence interval of the rank 3 flood, in years to 1 decimal place.", value: ri3, dp: 1, unit: "years", wrong: [13.3, 10],
        explanation: "(40 + 1) ÷ 3 = 13.7 years." }),
      P.mcq({ label: "(c)", stem: "What is the best interpretation of the result for the rank 1 flood?", options: [
        ["About a 2.4% chance of this flood in any year", "Correct: 1 ÷ 41 = 0.024."],
        ["This flood will happen exactly once in 41 years", "It is an average, not a schedule."],
        ["Such a flood cannot happen again for 41 years", "It could occur next year, although with low probability."],
        ["The flood was 41 times as large as the rank 4 flood", "The recurrence interval does not measure relative size."],
      ], answer: "A", explanation: "Probability = 1 ÷ recurrence interval." }),
      P.manual({ label: "(d)", marks: 3, stem: "Give three reasons why recurrence intervals calculated from a short record may be unreliable.",
        points: [
          "A 40-year record may not include the very largest floods, so the estimate for rare floods is uncertain.",
          "Land use and climate change, such as deforestation and more intense rain, change flood size over time.",
          "Gauge errors, gaps in the record or changes in the river channel affect the figures.",
        ],
        modelAnswer: "A 40-year record may miss rare large floods, so estimates for them are uncertain. Changes in land use and climate alter flood size over time, and errors or gaps in gauge data reduce accuracy.",
        explanation: "Short records, changing conditions and data errors reduce reliability." }),
    ], explanation: "Use the formula, then interpret and evaluate the result." });

  b.struct({ d: 4, skill: "EVALUATION",
    stem: "Illustrative water storage in a reservoir that supplies a hydropower station and a town, measured as a percentage of full capacity at the end of the rainy season:\n\n" + tbl(["Year", "1", "2", "3", "4", "5"], [["Storage (% of capacity)", ...LEV]]),
    hints: ["For a mean, add the values and divide by the number of years.", "A percentage fall is the fall divided by the starting value."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean storage over the five years, in % to 1 decimal place.", value: mLev, dp: 1, unit: "%", wrong: [326, 41],
        explanation: "(92 + 85 + 41 + 38 + 70) ÷ 5 = 326 ÷ 5 = 65.2%." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the fall in storage between Year 2 and Year 3, in percentage points.", value: fallPts, wrong: [51.8, 3],
        explanation: "85 − 41 = 44 percentage points." }),
      P.num({ label: "(c)", marks: 2, stem: "Express this fall as a percentage of the Year 2 storage, to 1 decimal place.", value: fallPct, dp: 1, unit: "%", wrong: [44, 107.3],
        explanation: "44 ÷ 85 × 100 = 51.8%." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how the low storage in Years 3 and 4 could affect the town and the economy.",
        points: [
          "Less water is available for households, so the town needs rationing and some people use unsafe sources.",
          "Reduced water level cuts hydropower output, causing load shedding that affects businesses, hospitals and homes.",
          "Farmers and industries that depend on irrigation or electricity lose output and income.",
        ],
        modelAnswer: "With low storage the town has less water and rations supplies, and some people turn to unsafe sources. The lower water level reduces hydropower generation, leading to load shedding that affects businesses and hospitals, and irrigated farms and industries lose output.",
        explanation: "Water supply, electricity and economic activity are all affected." }),
      P.manual({ label: "(e)", marks: 3, stem: "Assess one measure that could reduce the impact of drought on the town's water supply.",
        points: [
          "Name a measure (such as water demand management, leak repair, borehole supplement or rainwater harvesting).",
          "Give its benefit (saves water quickly, cheap or reduces dependence on the dam).",
          "Give a limit (needs public cooperation or funding, cannot supply the town if the drought is severe) and a judgement.",
        ],
        modelAnswer: "Fixing leaks and managing demand can save water quickly and cheaply, but it depends on funding and public cooperation and cannot supply the town in a severe, long drought. It is useful as a first step, but boreholes and rainwater harvesting are also needed.",
        explanation: "Name, benefit, limit and judgement." }),
    ], explanation: "Calculate changes in storage and explain the effects and responses." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the effectiveness of measures to reduce the impact of floods in Zimbabwe.",
    hints: ["Use household, community and national levels.", "Include an example such as Cyclone Idai (2019) or Tokwe-Mukosi (2014)."],
    points: [
      "Early warning and evacuation save lives if warnings reach people in time, as in organised evacuations before storms.",
      "Warnings may fail in remote areas with poor communication (limit), as shown in Chimanimani in 2019.",
      "Community committees and local knowledge give fast response and ownership but have little money and equipment.",
      "Household measures (raising houses, storing food) are cheap but limited for poor families and large floods.",
      "National structures: dams, embankments and drainage reduce flooding downstream but are costly and need maintenance (dams can also flood areas).",
      "Planning controls on floodplains and relocating people (Tokwe-Mukosi) reduce long-term risk but are slow and can disrupt livelihoods.",
      "Catchment management (trees and soil conservation) reduces runoff but works slowly.",
      "Judgement: measures work best in combination, and early warning with community preparedness is the most cost-effective; no single measure is sufficient for extreme events.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Early warning and evacuation can save many lives if the message reaches people and they know what to do, but in remote places such as Chimanimani in 2019 communications were poor. Community committees respond quickly and know local risks but have little equipment. Households can raise houses and store food, but poor families cannot protect against a large flood. National measures such as dams, drainage and floodplain planning give more protection but are costly, need maintenance and take time, and relocation, as after the Tokwe-Mukosi flooding in 2014, is disruptive. Tree cover and soil conservation reduce runoff over the long term. I conclude that measures are most effective when combined, with early warning and community preparedness the most cost-effective, but no single measure is enough for an extreme event.",
    wordLimit: { max: 300 }, explanation: "Judge each level of measure and reach an overall conclusion." });

  b.card("DEFINITION", "Types of drought", "Meteorological (low rainfall), agricultural (soil moisture deficit harming crops), hydrological (low river, dam and groundwater levels), socio-economic.");
  b.card("CONCEPT", "Causes of floods", "Intense rainfall, cyclone rain, saturated soil, deforested catchments, urban surfaces and poor drainage, silted channels, dam overflow.");
  b.card("FORMULA", "Recurrence interval", "Recurrence interval = (n + 1) ÷ rank, with n = years of record; probability in any year = 1 ÷ recurrence interval.");
  b.card("FACT", "Tornadoes in Zimbabwe", "Rare and small; severe thunderstorms with hail and damaging winds are more common. Tornado intensity is rated on the Enhanced Fujita scale (EF0-EF5).");
  b.card("FACT", "Tropical cyclone names", "Hurricane (Atlantic, east Pacific), typhoon (north-west Pacific), cyclone (Indian Ocean, south Pacific): the same type of storm.");
  b.card("CONCEPT", "Causes of heatwaves", "Persistent anticyclone with sinking air, clear skies and light winds; dry soils; urban heat island; climate change makes them more frequent.");
  b.card("CONCEPT", "Levels of hazard management", "Household (cheap, local), community (organised, local knowledge), national (forecasting, dams, Civil Protection Department): most effective in combination.");
  b.card("FACT", "Named events", "Tokwe-Mukosi flooding (Masvingo, 2014); Cyclone Idai (March 2019, Chimanimani and Chipinge); El Niño droughts of 1991-92 and 2015-16.");
});
