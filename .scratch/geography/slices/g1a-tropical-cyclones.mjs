// Slice G1a: tropical cyclones (hurricanes, typhoons) and Cyclone Idai.
import { concept, P, geographyLevels, CAM } from "../lib.mjs";

const TR = "| Date (fictional storm) | Position | Central pressure (hPa) | Maximum sustained wind (km/h) |\n|---|---|---|---|\n| Day 1 | 14° S, 48° E | 1,002 | 55 |\n| Day 2 | 15° S, 45° E | 990 | 85 |\n| Day 3 | 17° S, 42° E | 965 | 150 |\n| Day 4 | 19° S, 38° E | 950 | 185 |\n| Day 5 (inland) | 19° S, 34° E | 990 | 75 |";

concept("geo.weather.tropical-cyclones", { file: "weather/tropical-cyclones", keyPrefix: "weather.tropical-cyclones" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a tropical cyclone called in the **Atlantic Ocean**?",
    options: [
      ["A hurricane", "Correct: the Atlantic and north-east Pacific use 'hurricane'."],
      ["A typhoon", "'Typhoon' is used in the north-west Pacific."],
      ["A tornado", "A tornado is a much smaller funnel of wind formed over land."],
      ["A depression", "A temperate depression is a different, frontal system."],
    ],
    answer: "A",
    explanation: "Same storm, different names: **hurricane** (Atlantic), typhoon (north-west Pacific), cyclone (Indian Ocean).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the minimum sea-surface temperature usually needed for a tropical cyclone to form?",
    options: [
      ["About 26.5 °C", "Correct: warm water supplies the heat and moisture."],
      ["About 15 °C", "This is far too cool to drive a cyclone."],
      ["About 5 °C", "Water this cold is found in polar seas."],
      ["About 40 °C", "Sea surfaces do not reach 40 °C; the threshold is much lower."],
    ],
    answer: "A",
    explanation: "Sea-surface temperatures of about **26.5 °C or more** are needed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do tropical cyclones **not** form within about 5° of the equator?",
    options: [
      ["The Coriolis effect is too weak to make the air spin", "Correct: the spin from the Earth's rotation is almost zero there."],
      ["The sea is too cold near the equator", "Equatorial seas are among the warmest."],
      ["There is not enough moisture in equatorial air", "Equatorial air is very moist."],
      ["The ITCZ never reaches the equator", "The ITCZ lies near the equator for much of the year."],
    ],
    answer: "A",
    explanation: "The **Coriolis effect** is needed to start the rotation and it is too weak close to the equator.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which part of a tropical cyclone has the **strongest winds and heaviest rain**?",
    options: [
      ["The eye wall", "Correct: a ring of towering cumulonimbus around the eye."],
      ["The eye", "The eye is calm, with sinking air."],
      ["The outer edge of the cirrus shield", "This is the thin, high outflow cloud at the edge."],
      ["The dry gaps between rain bands", "These gaps are relatively quiet."],
    ],
    answer: "A",
    explanation: "The **eye wall** has the most violent winds and rain.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What causes a **storm surge**?",
    options: [
      ["Onshore winds and low pressure raising the sea", "Correct: water piles up against the coast."],
      ["An earthquake beneath the ocean floor offshore", "That causes a tsunami, not a storm surge."],
      ["Torrential rain filling up the sea", "Rain adds very little to sea level; wind and pressure do."],
      ["Ice caps melting during the storm", "Ice caps do not melt in a single storm."],
    ],
    answer: "A",
    explanation: "Onshore winds push water towards the coast and very low pressure lets the sea surface rise: a **storm surge**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does a tropical cyclone **weaken** after landfall?",
    options: [
      ["It loses its warm-water energy and meets friction", "Correct: warm sea water is its energy source."],
      ["The eye fills with cold air from the mountains", "Weakening is about energy supply, not the eye filling with mountain air."],
      ["The Coriolis effect stops working over land", "The Coriolis effect acts over land and sea alike."],
      ["Rain stops falling once it reaches land", "Torrential rain often continues far inland."],
    ],
    answer: "A",
    explanation: "Over land there is no warm sea to supply heat and moisture, and **friction** with the rough surface slows the winds.",
    hints: ["Where does a cyclone get its energy?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Cyclone Idai (2019) caused deaths in Chimanimani, far from the coast. Which hazard caused most of the damage there?",
    options: [
      ["Flash floods and landslides from torrential rain", "Correct: steep, saturated slopes failed and rivers flooded."],
      ["A storm surge from the Indian Ocean", "Storm surges affect the coast, such as Beira, not inland mountains."],
      ["Winds of over 250 km/h around the eye wall of the storm", "The storm had weakened inland; rain was the main hazard."],
      ["Drought after the storm passed", "Idai brought too much water, not too little."],
    ],
    answer: "A",
    explanation: "Inland, torrential rain on steep slopes caused **flash floods, mudslides and rock falls**.",
    hints: ["What happens to cyclones over land?", "Which hazard needs steep slopes?"],
  });
  b.mcq({
    d: 3, skill: "EVALUATION", applies: CAM,
    stem: "Which measure is an example of **planning** (rather than prediction, preparation or protection) for tropical storms?",
    options: [
      ["Banning new houses on steep slopes", "Correct: long-term land-use decisions are planning."],
      ["Tracking the storm path by satellite", "Tracking is prediction."],
      ["Building a sea wall", "Structures that reduce damage are protection."],
      ["Packing an emergency kit at home", "Getting ready just before a storm is preparation."],
    ],
    answer: "A",
    explanation: "**Planning** is about long-term decisions, such as land-use zoning and building codes.",
    hints: ["Which option is a long-term decision about where people live?"],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `The table shows the track of a fictional cyclone.\n\n${TR}\n\nBy how many hPa did the central pressure fall between Day 1 and Day 4?`,
    value: 52, unit: "hPa",
    wrong: [12, 40],
    explanation: "1,002 − 950 = 52 hPa.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A cyclone's maximum sustained wind is 180 km/h. Convert this to metres per second.",
    value: 50, unit: "m/s",
    wrong: [648, 3],
    explanation: "180 km/h = 180,000 m ÷ 3,600 s = 50 m/s.",
    workedSolution: "1. 180 km = 180,000 m.\n2. 1 hour = 3,600 s.\n3. 180,000 ÷ 3,600 = 50 m/s.",
    hints: ["Change km to m and hours to seconds.", "Or divide km/h by 3.6."],
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A cyclone's centre is 540 km from the coast and moving towards it at 18 km/h. How many hours before landfall?",
    value: 30, unit: "h",
    wrong: [9720, 3],
    explanation: "540 ÷ 18 = 30 hours.",
    workedSolution: "1. Time = distance ÷ speed.\n2. 540 ÷ 18 = 30 hours.",
    hints: ["Time = distance ÷ speed."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "When rising air condenses it releases {{blank:a}} heat, which warms the air and makes it rise faster. In the southern hemisphere the storm spins {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["latent"], wrong: "solar" },
      { id: "b", accepted: ["clockwise"], choices: ["clockwise", "anticlockwise"] },
    ],
    explanation: "**Latent heat** of condensation powers the storm; southern hemisphere cyclones turn **clockwise**.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each of the four Ps with an example.",
    pairs: [
      ["Prediction", "Satellite tracking and computer models of the storm's path"],
      ["Preparation", "Evacuation drills and stockpiles of food and water"],
      ["Planning", "Zoning laws that keep homes off floodplains"],
      ["Protection", "Raised cyclone shelters and strengthened roofs"],
    ],
    explanation: "Prediction forecasts, preparation readies people, planning controls land use, protection builds defences.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The eye of a tropical cyclone is usually calm, with sinking air.",
    answer: true,
    explanation: "True. The eye is calm and often clear, surrounded by the violent eye wall.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Landlocked Zimbabwe cannot be affected by tropical cyclones.",
    answer: false,
    explanation: "False. Weakening cyclones can bring torrential rain far inland, as Cyclone Idai did in Chimanimani and Chipinge in 2019.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the city in Mozambique near which Cyclone Idai made landfall in March 2019.",
    accepted: ["Beira"],
    wrong: ["Maputo"],
    explanation: "Idai crossed the coast near **Beira**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the conditions needed for a tropical cyclone to form.",
    points: [
      "Sea-surface temperature of about 26.5 °C or more, with deep warm water.",
      "At least about 5° from the equator so the Coriolis effect can create spin.",
      "Moist, unstable air that rises to great heights.",
      "Low wind shear (winds similar at all heights) / an existing low-pressure disturbance.",
    ],
    modelAnswer: "The sea must be at least about 26.5 °C to a depth of tens of metres. The area must be at least 5° from the equator so the Coriolis effect can make the air spin. The air must be moist and unstable so it rises strongly, and winds must not change much with height, so the storm is not torn apart. A small area of low pressure is needed to start it.",
    explanation: "One mark per condition.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe **four** impacts of Cyclone Idai on people in eastern Zimbabwe.",
    points: [
      "Several hundred deaths, with many people missing, buried by mudslides and floods.",
      "Homes, schools and clinics destroyed; people made homeless.",
      "Roads and bridges washed away, cutting off communities in Chimanimani and Chipinge.",
      "Crops and livestock lost, leading to food shortages and loss of income / risk of water-borne disease.",
    ],
    modelAnswer: "Several hundred people died in Chimanimani and Chipinge, many buried by mudslides, and many were never found. Homes, schools and clinics were destroyed, leaving families homeless. Roads and bridges were washed away, cutting communities off for days. Crops and livestock were lost, causing food shortages and loss of income.",
    explanation: "Credit four different, specific impacts linked to Idai.",
    hints: ["Think of people, buildings, transport and farming."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "For a named tropical cyclone, evaluate how well prediction, preparation, planning and protection reduced its impacts.",
    points: [
      ["Named cyclone with date and places (e.g. Idai, March 2019, Beira, Chimanimani, Chipinge).", 1],
      ["Prediction: the storm was tracked and forecast before landfall; warnings were issued.", 1],
      ["Limits of prediction: warnings of rain-triggered landslides inland did not reach or were not acted on by remote communities.", 1],
      ["Preparation: limited evacuation and few supplies in place; poor communication in remote areas.", 1],
      ["Planning: settlements on steep slopes and river banks increased losses.", 1],
      ["Protection: few defences; bridges and roads not built for such floods; rescue and aid after the event.", 1],
      ["Judgement: e.g. prediction worked better than preparation and planning, so losses were high; lessons learned.", 1],
    ],
    levels: geographyLevels(7),
    modelAnswer: "Cyclone Idai made landfall near Beira in mid-March 2019 and then brought torrential rain to Chimanimani and Chipinge in eastern Zimbabwe. Prediction was reasonably good: the storm was tracked by satellite over the Mozambique Channel and its landfall was forecast. However, the forecasts did not translate into clear warnings that remote mountain communities understood; few people expected landslides so far inland.\n\nPreparation was weak. There were few evacuation plans or stockpiles, and when roads and phone networks failed, communities were cut off. Planning had allowed homes to be built on steep slopes and beside rivers, which is why mudslides and floods were so deadly. Protection was limited: bridges and roads were not designed for such flows, so rescue depended on helicopters and volunteers.\n\nOverall, prediction worked better than the other Ps, but weak preparation, planning and protection meant losses were very high. Lessons include community warning systems, evacuation routes and keeping new settlement off unstable slopes.",
    explanation: "Each of the four Ps needs evidence and a judgement of how well it worked for the named storm.",
    hints: ["Take each P in turn: what was done, and did it work?", "Finish with an overall judgement."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `The table shows the track of a fictional cyclone in the south-west Indian Ocean.\n\n${TR}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "On which day was the storm strongest?", accepted: ["Day 4", "4", "day four", "four"], wrong: ["Day 3"], explanation: "Day 4: lowest pressure (950 hPa) and strongest wind (185 km/h)." }),
      P.num({ label: "(b)", marks: 1, stem: "By how much did the maximum wind speed fall between Day 4 and Day 5?", value: 110, unit: "km/h", wrong: [75], explanation: "185 − 75 = 110 km/h." }),
      P.mcq({ label: "(c)", marks: 1, stem: "In which general direction did the storm move?", options: [
        ["Westwards, turning slightly south", "Correct: longitude falls from 48° E to 34° E and latitude increases from 14° S to 19° S."],
        ["Eastwards, turning sharply north", "Longitude decreases, so it moved west."],
        ["Due north, then turning east", "Latitude increases southwards, so it did not move north."],
        ["Due east", "Longitude decreases, so it moved west."],
      ], answer: "A", explanation: "Decreasing east longitude means westward; increasing south latitude means southward." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain the changes in the storm between Day 4 and Day 5.", points: [
        "The storm made landfall / moved over land.",
        "It lost its supply of heat and moisture from the warm sea.",
        "Friction over land slowed the winds, so pressure rose and the wind speed fell.",
      ], explanation: "Credit landfall, loss of energy supply and friction." }),
    ],
    hints: ["Which day has the lowest pressure?", "Compare the longitudes on each day."],
    explanation: "Practice in interpreting a cyclone track.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "Read the fictional account. \"The wind howled for hours, then suddenly stopped. The sky above us turned blue and the air was still. Some people went outside to look at the damage. Forty minutes later the wind came back even harder, from the opposite direction.\"",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which part of the cyclone passed over the town during the calm?", options: [
        ["The eye", "Correct: the calm, clear centre with sinking air."],
        ["The eye wall", "The eye wall has the strongest winds."],
        ["An outer rain band", "Rain bands bring storms and gusts."],
        ["The cirrus shield", "The cirrus shield is high cloud at the outer edge."],
      ], answer: "A", explanation: "Calm, clear sky inside the storm: the eye." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the sky was clear and the air still during the calm.", points: [
        "Air sinks in the eye.",
        "Sinking air warms and prevents cloud forming; there is little horizontal movement.",
      ], explanation: "Sinking air = clear skies." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why going outside during the calm was dangerous.", points: [
        "The other side of the eye wall arrives soon after, with winds as strong or stronger.",
        "The wind blows from the opposite direction, so damaged buildings and flying debris are a danger.",
      ], explanation: "The calm is temporary." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest **two** ways the town could prepare for future cyclones.", points: [
        "Public education and evacuation drills / warnings that explain the eye.",
        "Cyclone shelters, strengthened roofs, emergency supplies.",
      ], explanation: "Credit preparation and protection measures." }),
    ],
    hints: ["Which part of a cyclone is calm?", "What happens when the second half of the eye wall arrives?"],
    explanation: "Practice in understanding cyclone structure.",
  });
  b.card("DEFINITION", "Tropical cyclone", "An intense rotating low-pressure storm over warm tropical seas; hurricane (Atlantic), typhoon (NW Pacific), cyclone (Indian Ocean).");
  b.card("FACT", "Where cyclones form", "About 5° to 20-30° N and S, over seas of about 26.5 °C or more; not on the equator (Coriolis too weak).");
  b.card("CONCEPT", "How a cyclone grows", "Warm moist air rises → condensation releases latent heat → air rises faster → more air drawn in and spins.");
  b.card("CONCEPT", "Structure", "Eye (calm, sinking air), eye wall (strongest winds, heaviest rain), spiral rain bands, cirrus outflow.");
  b.card("DEFINITION", "Storm surge", "A rise in sea level above the normal tide caused by onshore winds and very low pressure.");
  b.card("CONCEPT", "Cyclone hazards", "Strong winds, storm surge, torrential rain, floods, landslides; then disease and food shortages.");
  b.card("CONCEPT", "The four Ps", "Prediction, preparation, planning, protection.");
  b.card("FACT", "Cyclone Idai", "March 2019: landfall near Beira; floods and landslides in Chimanimani and Chipinge; more than 1,000 deaths across three countries.");
  b.card("CONCEPT", "Why cyclones weaken over land", "No warm sea to supply heat and moisture; friction slows the winds.");
});
