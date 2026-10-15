// W3b: hazard.tropical-cyclones (both boards: ZIMSEC Form 6; Cambridge A Level Paper 3 option 9). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, haversineKm, ZIM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3b-_q.mjs";
import { cat, TRACK } from "../tables/w3b-hazard-tropical-cyclones.mjs";

const leg = (i) => haversineKm(TRACK[i - 1].lat, TRACK[i - 1].lon, TRACK[i].lat, TRACK[i].lon);
const spd34 = rnd(leg(3) / 12, 1, 16.2, "spd34");
const spd01 = rnd(163.5 / 12, 1, 13.6, "spd01");
const spdQ = rnd(haversineKm(-20.1, 56.4, -21.0, 55.3) / 12, 1, 12.7, "spdQ");
chk(Math.round(haversineKm(-20.1, 56.4, -21.0, 55.3) * 10) / 10, 152.1, 1e-9);
chk(cat(215), 4);
chk(cat(175), 2);
chk(cat(130), 1);
chk(cat(95), 0);
const rain2 = rnd(200 * 1.07 ** 2, 0, 229, "rain2");
const rainPct = rnd((1.07 ** 2 - 1) * 100, 1, 14.5, "rainPct");
const TT = tbl(["Time (hours)", "Position", "Sustained wind (km/h)"], TRACK.map((p) => [p.t, `${Math.abs(p.lat).toFixed(1)}°S ${p.lon.toFixed(1)}°E`, p.w]));
// Shelters
const POP = 400000;
const SH = 120;
const CAP = 1500;
const capTot = chk(SH * CAP, 180000);
const capPct = chk((capTot / POP) * 100, 45, 1e-9);
const noSpace = chk(POP - capTot, 220000);

concept("ageo.hazard.tropical-cyclones", { file: "hazard/tropical-cyclones", keyPrefix: "hazard.tropical-cyclones" }, (b) => {
  mc(b, 2, "RECALL", "What is the minimum sea-surface temperature usually needed for a tropical cyclone to form?", [
    ["About 26.5 °C", "Correct: warm water supplies the heat and moisture for the storm."],
    ["About 10 °C", "Water this cool does not supply enough heat or evaporation."],
    ["About 45 °C or more", "Open sea does not reach this temperature, and it is not needed."],
    ["About 0 °C", "Cyclones do not form over water near freezing."],
  ], "A sea-surface temperature of at least about **26.5 °C**, to a depth of about 50 m, is needed.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why do tropical cyclones not form on the equator?", [
    ["The Coriolis effect is too weak to make the air rotate", "Correct: the spin needs a Coriolis effect, which is almost zero at the equator."],
    ["The sea there is always too cold", "Equatorial seas are warm."],
    ["There is too much vertical wind shear there", "Wind shear is not the main reason."],
    ["The Sun is too low in the sky throughout the whole year there", "The Sun is high at the equator."],
  ], "The **Coriolis effect** is too weak within about 5° of the equator to produce rotation.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which part of a tropical cyclone has the strongest winds and heaviest rain?", [
    ["The eyewall", "Correct: the ring of tall storm clouds around the eye."],
    ["The eye", "The eye is calm, with sinking air and clear skies."],
    ["The outer edge", "Winds and rain are lighter at the outer edge."],
    ["The area far behind the storm", "Conditions are usually improving behind the storm."],
  ], "The **eyewall** surrounds the calm eye.");
  mc(b, 3, "ANALYSIS", "A Category 1 cyclone killed many more people than a Category 4 cyclone in another country. Which is the best explanation?", [
    ["Storm surge and flooding affected a larger and more vulnerable population", "Correct: the scale measures wind only, and surge and floods cause most deaths."],
    ["The Saffir-Simpson scale measures damage and deaths directly", "The scale measures only the sustained wind speed."],
    ["Category 1 storms have stronger winds than Category 4 storms", "Category 4 has stronger winds."],
    ["Strong winds never cause any damage to buildings in coastal cities or towns", "Winds do cause damage; they are simply not the only hazard."],
  ], "The scale ranks **wind only**; surge, rain and vulnerability decide deaths.", { hints: ["What does the scale not measure?"] });
  mc(b, 3, "APPLICATION", "Why did Cyclone Idai (2019) cause landslides and floods in the Eastern Highlands of Zimbabwe, far from the coast?", [
    ["Heavy rain fell on steep, saturated slopes and in narrow valleys", "Correct: the storm still carried large amounts of moisture inland, and relief concentrated the runoff."],
    ["The storm kept its full wind speed for hundreds of kilometres inland", "The winds weakened over land; rain was the main inland hazard."],
    ["The storm surge travelled up the rivers to Chimanimani", "Chimanimani is far from the sea and high in the Eastern Highlands."],
    ["The cyclone formed over the highlands themselves", "Cyclones form only over warm tropical oceans."],
  ], "Inland, the hazard is **intense rain** on steep slopes, causing landslides and flash floods.", { hints: ["Winds weaken inland; rain does not stop at once."] });
  mc(b, 3, "ANALYSIS", "Which change is expected to be caused by climate change in tropical cyclones, according to current scientific assessments?", [
    ["Higher rainfall rates and a higher share of very intense storms", "Correct: a warmer, moister atmosphere and warmer seas favour both."],
    ["A clear increase in the total number of storms every single year", "There is no clear evidence yet of an increase in the total number."],
    ["Storms forming at the equator more often than before", "The Coriolis effect still prevents formation there."],
    ["Storm surges becoming lower as sea level rises", "Higher sea level raises the surge."],
  ], "Expect **heavier rain**, **higher surge** and a **larger share of Categories 4–5**; the total number has no clear trend.", { hints: ["Warm air holds more moisture."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A tropical cyclone weakens when it moves over land because it loses its supply of warm, moist air.", answer: true,
    feedbackTrue: "Correct: friction also slows the winds.", feedbackFalse: "Not so: the loss of the heat and moisture supply and the extra friction weaken the storm.",
    explanation: "Over land the storm loses its energy source (warm sea) and winds slow because of **friction**." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each term to its meaning.",
    pairs: [
      ["Eye", "Calm centre with sinking air"],
      ["Storm surge", "Rise in sea level caused by winds and low pressure"],
      ["Typhoon", "Tropical cyclone in the north-west Pacific"],
      ["Saffir-Simpson scale", "Categories 1 to 5 based on wind speed"],
      ["Latent heat", "Heat released when water vapour condenses"],
    ], explanation: "Each term is part of the description of a tropical cyclone." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Tropical cyclones form over warm seas between about 5° and 30° latitude where the {{blank:a}} effect makes the air spin. The heat released by {{blank:b}} of water vapour strengthens the storm, and the main cause of deaths on low coasts is often the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["Coriolis"], choices: ["Coriolis", "Foehn", "Greenhouse"] },
      { id: "b", accepted: ["condensation"], choices: ["condensation", "evaporation", "freezing"] },
      { id: "c", accepted: ["storm surge"], choices: ["storm surge", "lightning", "drought"] },
    ], explanation: "Coriolis effect, latent heat from condensation and storm surge." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the calm area of sinking air at the centre of a tropical cyclone.",
    accepted: ["eye", "the eye", "eye of the storm", "eye of the cyclone"],
    explanation: "The **eye** is the calm centre, surrounded by the eyewall." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "km/h",
    stem: "An illustrative cyclone (data invented for this exercise) moved a distance of 163.5 km in 12 hours. Calculate its speed of movement in km/h, to one decimal place.",
    hints: ["Speed = distance ÷ time."],
    value: spd01, dp: 1, wrong: [163.5, 1962, 7.3],
    explanation: "163.5 ÷ 12 = **13.6 km/h**. The value 163.5 is the distance." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "km/h",
    stem: "A cyclone is at 20.1°S 56.4°E at 6 hours and at 21.0°S 55.3°E at 18 hours. The great-circle distance between the two positions is 152.1 km. Calculate the speed of movement in km/h, to one decimal place.",
    hints: ["Time between the positions = 18 − 6 hours."],
    value: spdQ, dp: 1, wrong: [152.1, 5.1, 8.4],
    explanation: "1. Time = 18 − 6 = 12 h.\n2. Speed = 152.1 ÷ 12 = **12.7 km/h**. The value 152.1 is the distance." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "mm",
    stem: "A cyclone drops rain at 200 mm per day. Assume the rainfall rate rises by 7% for each 1 °C of warming (compounded). What is the rate after 2 °C of warming, to the nearest mm per day?",
    hints: ["Multiply by 1.07 for each degree."],
    value: rain2, dp: 0, wrong: [228, 214, 400],
    explanation: "200 × 1.07 × 1.07 = **229 mm per day**. The value 228 adds 7% twice to 200 instead of compounding (200 + 14 + 14)." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a tropical cyclone develops and strengthens over a warm ocean.",
    hints: ["Evaporation, rising air, latent heat, low pressure and rotation."],
    points: [
      "Warm sea water evaporates, and warm, moist air rises, producing low pressure at the surface.",
      "Air flows in towards the low pressure and, because of the Coriolis effect, begins to rotate.",
      "Rising air cools and condenses, releasing latent heat that warms the air and strengthens the updraught.",
      "Pressure falls further, winds increase and an eye with sinking air forms in the centre.",
    ],
    modelAnswer: "Warm sea water evaporates and the moist air rises, causing low pressure at the surface. Air flows in and begins to rotate because of the Coriolis effect. As the rising air condenses it releases latent heat, which strengthens the updraught, so pressure falls further and winds increase, and an eye forms.",
    explanation: "Evaporation, rising air, Coriolis spin and latent heat form a feedback loop." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how the intensity of the cyclone in the table changes with time. Illustrative data: 0 hours 110 km/h; 12 hours 150 km/h; 24 hours 190 km/h; 36 hours 230 km/h; 48 hours 160 km/h.",
    hints: ["Trend, peak and fall, with figures."],
    points: [
      "Sustained wind speed increases steadily from 110 km/h at 0 hours to a peak of 230 km/h at 36 hours.",
      "It strengthens from just below hurricane strength to Category 4 (209 to 251 km/h).",
      "It then weakens to 160 km/h (Category 2) at 48 hours.",
    ],
    modelAnswer: "Wind speed increases steadily from 110 km/h at the start to a peak of 230 km/h at 36 hours, which is Category 4. It then falls to 160 km/h (Category 2) at 48 hours.",
    explanation: "Quote the peak, the timing and the change." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why a landlocked country such as Zimbabwe can be badly affected by a cyclone that makes landfall in Mozambique.",
    hints: ["Think about the rain, the relief and the lack of warning."],
    points: [
      "The storm moves inland and still carries large amounts of moisture, which falls as heavy rain.",
      "The Eastern Highlands are steep, so the rain runs off quickly or triggers landslides and flash floods.",
      "Rivers rise and cut roads and bridges, isolating communities and delaying relief.",
      "Warnings often focus on the coast, and inland communities have little experience and few preparations.",
    ],
    modelAnswer: "The storm moves inland with large amounts of moisture, which falls as heavy rain. The Eastern Highlands are steep, so rain triggers landslides and flash floods. Rivers cut roads and bridges, which isolates communities and delays relief. Warnings often focus on the coast, and inland communities have little experience of cyclones.",
    explanation: "Rain, relief and limited preparation explain the inland impact.", applies: ZIM });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why a storm surge may kill more people than the wind in a tropical cyclone.",
    hints: ["Think about speed, depth, and low-lying coastal settlements."],
    points: [
      "Large areas of low-lying coast are flooded quickly by water that is several metres deep and moving fast.",
      "Many people live on such coasts and deltas, and the surge may arrive at night or with little warning.",
      "People may not understand the term or the danger and may not evacuate, as at Haiyan in 2013.",
    ],
    modelAnswer: "A surge floods large areas of low coast quickly under water that is several metres deep and moving fast. Many people live on such coasts and the surge may arrive at night or with little warning. People may not understand the danger and may not evacuate, as at Haiyan in 2013.",
    explanation: "Depth, speed, density of settlement and warning make surges deadly." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table shows an illustrative cyclone track.\n\n${TT}`,
    hints: ["Use the Saffir-Simpson boundaries: 119, 154, 178, 209 and 252 km/h.", "Speed = distance ÷ time."],
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "What was the category of the cyclone at 36 hours?", options: [
        ["Category 4", "Correct: 215 km/h lies between 209 and 251 km/h."],
        ["Category 3", "Category 3 is 178 to 208 km/h."],
        ["Category 5", "Category 5 is 252 km/h or more."],
        ["Category 2", "Category 2 is 154 to 177 km/h."],
      ], answer: "A", explanation: "215 km/h is Category 4." }),
      P.num({ label: "(b)", marks: 2, stem: "The cyclone moved 194.8 km between 24 and 36 hours. Calculate its speed of movement in km/h, to one decimal place.", value: spd34, dp: 1, unit: "km/h", wrong: [194.8, 5.4],
        explanation: "194.8 ÷ 12 = 16.2 km/h." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe the change in the cyclone's intensity between 24 and 48 hours.",
        points: ["Wind speed rose from 175 km/h (Category 2) to 215 km/h (Category 4) at 36 hours.", "It then fell sharply to 120 km/h at 48 hours."],
        modelAnswer: "Wind speed rose from 175 km/h (Category 2) to 215 km/h (Category 4) at 36 hours, then fell sharply to 120 km/h at 48 hours.",
        explanation: "Quote the figures and the direction of change." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest why the cyclone weakened between 36 and 48 hours.",
        points: ["It moved over land or into cooler water, away from its supply of warm moist air.", "Friction with the land slowed the winds.", "Wind shear or dry air in the area may have disrupted the storm."],
        modelAnswer: "The cyclone moved over land or cooler water, away from its supply of warm moist air. Friction with the land slowed the winds, and wind shear or dry air may have disrupted the storm.",
        explanation: "Loss of the energy source, friction and shear." }),
    ], explanation: "Classify intensity, calculate speed, describe change and explain weakening." });

  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `A coastal district has 400 000 people and 120 cyclone shelters, each able to hold 1 500 people (illustrative data, invented for this exercise).`,
    hints: ["Total capacity = number of shelters × capacity of each.", "Percentage = capacity ÷ population × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of the population that the shelters can hold.", value: capPct, unit: "%", wrong: [180000, 55, 0.45],
        explanation: "120 × 1 500 = 180 000 places. 180 000 ÷ 400 000 × 100 = 45%." }),
      P.num({ label: "(b)", marks: 1, stem: "How many people would have no place in a shelter?", value: noSpace, unit: "people", wrong: [180000, 400000],
        explanation: "400 000 − 180 000 = 220 000." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain how cyclone shelters reduce deaths.",
        points: ["They are built on raised ground or on strong platforms above the height of a storm surge.", "They are strong enough to resist high winds and are placed within walking distance of villages.", "Warning and evacuation plans direct people to them in time, and they can protect people from floods and wind."],
        modelAnswer: "Shelters are built above the height of a storm surge, are strong enough to resist the wind and are within walking distance of villages. Warnings and evacuation plans direct people to them in time, so they are protected from floods and wind.",
        explanation: "Design, location and warning make shelters effective." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two other measures that would protect the people without a shelter place.",
        points: ["Coastal defences, such as embankments and mangrove belts, to reduce the surge", "Strengthened homes, early warnings and plans for evacuation to higher ground or to safer inland areas"],
        modelAnswer: "Embankments and mangrove belts would reduce the surge. Strengthened homes, early warnings and plans for evacuation to higher ground would also protect them.",
        explanation: "Accept any two valid measures." }),
      P.manual({ label: "(e)", marks: 4, stem: "Assess how far shelters alone can protect the district from tropical cyclones.",
        points: ["Shelters save lives when people reach them in time, as in Bangladesh, where deaths fell sharply.", "But the shelters hold only 45% of the people, so many would need other places or evacuation.", "Shelters do not protect houses, crops, livestock or livelihoods, so recovery would still be slow.", "A full strategy needs warnings, defences, land-use planning and education, so shelters are important but not enough alone."],
        modelAnswer: "Shelters save lives when people reach them in time, as in Bangladesh. But here they hold only 45% of the people, and they do not protect houses, crops or livelihoods. A full strategy needs warnings, defences, planning and education, so shelters are important but not enough on their own.",
        explanation: "Weigh benefits against limits and judge." }),
    ], explanation: "Calculate shelter capacity and assess a single management strategy." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess how far the impacts of Cyclone Idai (2019) were the result of vulnerability rather than the strength of the storm.",
    hints: ["Use Mozambique and Zimbabwe, with both physical and human factors."],
    points: [
      "Idai made landfall near Beira in March 2019 with strong winds, a storm surge and very heavy rain, so the hazard was severe.",
      "Rain fell for days over river basins (Buzi and Pungwe) and the Eastern Highlands, causing floods and landslides far from the coast.",
      "Beira is low-lying and flat, so the flooding was widespread.",
      "Vulnerability: many homes were weakly built and in flood plains or on steep slopes (Chimanimani), and poverty limited the ability to prepare or recover.",
      "Warnings were issued but did not reach everyone or explain the flood risk clearly, and roads and bridges were destroyed, delaying rescue.",
      "More than a thousand deaths were recorded across Mozambique, Zimbabwe and Malawi, with large numbers displaced.",
      "A cholera outbreak followed the damage to water and sanitation, showing secondary effects of vulnerability.",
      "Judgement: the storm was powerful, but the size of the disaster also reflects vulnerability: location, poverty and weak warning and response, so both matter.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "The storm itself was severe: Idai made landfall near Beira in March 2019 with strong winds, a surge and days of very heavy rain, which caused floods in the Buzi and Pungwe basins and landslides in the Eastern Highlands. But the scale of the disaster also reflected vulnerability. Beira is low-lying and flat, many homes were weak and located on flood plains or steep slopes, and poverty limited preparation and recovery. Warnings did not reach everyone or explain the flood risk, and damaged roads and bridges delayed rescue. More than a thousand people died across three countries, and a cholera outbreak followed. I conclude that both the hazard and vulnerability mattered, but vulnerability explains why the impacts were so severe.",
    wordLimit: { max: 300 }, explanation: "Weigh physical and human factors with located evidence." });

  b.card("DEFINITION", "Tropical cyclone", "A rotating low-pressure storm that forms over warm tropical oceans with sustained winds of at least 119 km/h; hurricane (Atlantic), typhoon (north-west Pacific), cyclone (Indian Ocean and Australia).");
  b.card("CONCEPT", "Conditions for formation", "Sea at least about 26.5 °C to 50 m depth; latitude about 5° to 30° (Coriolis effect); low wind shear; moist air and a disturbance; late summer or autumn.");
  b.card("FACT", "Saffir-Simpson scale", "Category 1: 119–153 km/h; 2: 154–177; 3: 178–208; 4: 209–251; 5: 252 km/h or more. It measures wind only.");
  b.card("DEFINITION", "Storm surge", "A rise in sea level above the normal tide caused by winds and low pressure; the main cause of deaths on low-lying coasts.");
  b.card("CONCEPT", "Why cyclones weaken over land", "They lose the supply of warm moist air and heat, and friction slows the winds; heavy rain can continue and cause floods and landslides.");
  b.card("FACT", "Cyclone Idai, March 2019", "Landfall near Beira, Mozambique; flooding in the Buzi and Pungwe plains and landslides in Chimanimani, Zimbabwe; more than a thousand deaths in three countries (rounded).");
  b.card("FACT", "Bangladesh cyclone management", "Shelters, a trained volunteer programme, embankments and warnings: deaths fell from about 300 000 in 1970 to about 3 400 in Cyclone Sidr (2007).");
  b.card("CONCEPT", "Climate change and cyclones", "Expected: heavier rainfall (about 7% per °C), higher surge as sea level rises, and a larger share of the strongest storms; no clear increase in the total number.");
  b.card("CONCEPT", "Cyclone management strategies", "Forecasts and warnings, shelters and evacuation, defences (embankments and mangroves), building design and land use, education and drills, recovery plans.");
});
