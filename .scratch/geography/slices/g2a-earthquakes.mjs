// Slice G2a: earthquakes — causes, characteristics and measurement (ZIMSEC and Cambridge).
import { concept, P, geographyLevels } from "../lib.mjs";

const TOWNS = "| Town (fictional) | Distance from epicentre (km) | Mercalli intensity | Ground | Main damage reported |\n|---|---|---|---|---|\n| Arin | 15 | IX | Rock | Many buildings collapsed |\n| Bodo | 40 | VIII | Soft, waterlogged sand | Buildings tilted and sank |\n| Celo | 60 | VI | Rock | Cracked plaster, fallen shelves |\n| Dara | 150 | IV | Rock | Felt indoors; windows rattled |";

concept("geo.tectonics.earthquakes", { file: "tectonics/earthquakes", keyPrefix: "tectonics.earthquakes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The point on the Earth's surface **directly above** where an earthquake starts is the:",
    options: [
      ["epicentre", "Correct: shaking is usually strongest here."],
      ["focus", "The focus is underground, where the rocks first break."],
      ["fault line", "A fault line is the crack along which rocks move, not a single point."],
      ["crater", "A crater is a feature of volcanoes."],
    ],
    answer: "A",
    explanation: "**Focus** (hypocentre): underground origin. **Epicentre**: surface point directly above.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which seismic waves arrive **first** at a recording station?",
    options: [
      ["P waves", "Correct: primary waves are the fastest."],
      ["S waves", "S waves are slower and arrive second."],
      ["Surface waves", "Surface waves are slowest and arrive last."],
      ["Tsunami waves", "A tsunami is a sea wave, much slower than seismic waves."],
    ],
    answer: "A",
    explanation: "Order of arrival: **P**, then S, then surface waves.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does the **Mercalli** scale measure?",
    options: [
      ["The effects of an earthquake at a particular place", "Correct: intensity, from I to XII."],
      ["The total energy released at the focus", "That is magnitude (Richter or moment magnitude)."],
      ["The depth of the focus below the Earth's surface in km", "Depth is measured in kilometres, not on the Mercalli scale."],
      ["The speed of the seismic waves", "Wave speed is not what the scale describes."],
    ],
    answer: "A",
    explanation: "The **Modified Mercalli** scale describes observed effects (intensity), which vary from place to place.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do shallow-focus earthquakes usually cause more damage than deep-focus ones of the same magnitude?",
    options: [
      ["The waves lose less energy before reaching the surface", "Correct: the energy has less rock to travel through."],
      ["Shallow earthquakes always have higher magnitudes", "The question compares earthquakes of the same magnitude."],
      ["Deep earthquakes produce no seismic waves", "Deep earthquakes do produce waves; they weaken on the way up."],
      ["Shallow earthquakes occur only in cities", "Earthquake depth has nothing to do with where cities are."],
    ],
    answer: "A",
    explanation: "Energy weakens as it travels; a shallow focus delivers more of it to the surface.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which secondary effect occurs when shaking makes waterlogged sand behave like a liquid?",
    options: [
      ["Liquefaction", "Correct: buildings tilt and sink, as in Christchurch in 2011."],
      ["Tsunami", "A tsunami is a sea wave from an undersea earthquake."],
      ["Lahar", "A lahar is a volcanic mudflow."],
      ["Landslide", "A landslide is a slope failure, not ground turning to liquid."],
    ],
    answer: "A",
    explanation: "**Liquefaction** affects soft, saturated ground.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which waves cause the **most damage** to buildings?",
    options: [
      ["Surface waves", "Correct: they arrive last but move the ground most."],
      ["P waves", "P waves arrive first but cause the least movement."],
      ["S waves", "S waves cause moderate shaking."],
      ["Sound waves", "Sound is not a type of seismic wave that damages buildings."],
    ],
    answer: "A",
    explanation: "**Surface waves** roll and sway the ground with the largest movements.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Earthquakes occurred in the Kariba area in the years after Lake Kariba filled. What is the most likely explanation?",
    options: [
      ["The water's weight and pressure triggered slip on faults", "Correct: reservoir-induced seismicity."],
      ["A new plate boundary formed under the lake", "No new plate boundary formed; Kariba lies inside the African plate."],
      ["Strong waves on the lake shook the ground and rocks below the water", "Lake waves are far too weak to cause earthquakes."],
      ["Volcanoes erupted beneath the lake", "There are no active volcanoes in Zimbabwe."],
    ],
    answer: "A",
    explanation: "A large reservoir adds weight and raises water pressure in faults, which can trigger slip on faults already under stress.",
    hints: ["What changed in the area?", "How might water affect existing faults?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Earthquake X has magnitude 7.4 and earthquake Y has magnitude 5.4. How many times greater is the ground movement (wave amplitude) in X?",
    options: [
      ["100 times", "Correct: two steps of ten: 10 × 10."],
      ["2 times", "The scale is logarithmic, not linear."],
      ["20 times", "Each step multiplies by ten; two steps is 10 × 10, not 10 + 10."],
      ["1,000 times", "That would be three steps."],
    ],
    answer: "A",
    explanation: "7.4 − 5.4 = 2 steps; 10² = **100** times the amplitude (and roughly 1,000 times the energy).",
    hints: ["Find the difference in magnitude.", "Each whole step multiplies amplitude by 10."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "P waves travel through the crust at about 6 km per second. How many seconds do they take to reach a station 540 km from the focus?",
    value: 90, unit: "s",
    wrong: [3240, 0.011],
    explanation: "Time = 540 ÷ 6 = 90 seconds.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "At a fictional station, S waves arrive 42 seconds after P waves. Using the rule that each second of delay represents about 8 km, how far is the station from the earthquake?",
    value: 336, unit: "km",
    wrong: [50, 5.25],
    explanation: "42 × 8 = 336 km.",
    workedSolution: "1. Delay = 42 s.\n2. Distance = 42 × 8 = 336 km.",
    hints: ["Multiply the delay by the distance per second.", "The longer the delay, the further away."],
  });
  b.calc({
    d: 4, skill: "ANALYSIS",
    stem: "Each whole step on the magnitude scale releases about 32 times more energy. About how many times more energy does a magnitude 8 earthquake release than a magnitude 6 earthquake?",
    value: 1024, tol: 30,
    wrong: [64, 100],
    explanation: "Two steps: 32 × 32 = 1,024, so about 1,000 times more energy.",
    workedSolution: "1. Difference = 8 − 6 = 2 steps.\n2. Energy ratio = 32 × 32 = 1,024.\n3. About 1,000 times more energy.",
    hints: ["Count the steps.", "Multiply, do not add."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the instrument that detects and records ground shaking.",
    accepted: ["seismometer", "a seismometer", "seismograph", "a seismograph"],
    wrong: ["barometer"],
    explanation: "A **seismometer** (seismograph); its record is a seismogram.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the explanation of the cause of earthquakes.",
    template: "Rocks on either side of a fault are locked together by {{blank:a}}. As the plates move, {{blank:b}} builds up. When it overcomes the friction the rocks suddenly {{blank:c}}, releasing energy as {{blank:d}} waves.",
    blanks: [
      { id: "a", accepted: ["friction"], wrong: "gravity" },
      { id: "b", accepted: ["stress", "pressure", "strain", "tension"], wrong: "magma" },
      { id: "c", accepted: ["slip", "move", "jerk", "break", "snap"], wrong: "melt" },
      { id: "d", accepted: ["seismic", "shock"], wrong: "sound" },
    ],
    explanation: "Friction → stress → sudden slip → seismic waves.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each secondary effect to how it happens.",
    pairs: [
      ["Tsunami", "Sea floor suddenly displaced, pushing up the water"],
      ["Liquefaction", "Saturated sand loses strength and flows"],
      ["Landslide", "Shaking loosens soil and rock on steep slopes"],
      ["Fire", "Broken gas pipes and power lines ignite"],
    ],
    explanation: "Secondary effects often cause more deaths than the shaking itself.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: one earthquake has a single magnitude but can have many different Mercalli intensities.",
    answer: true,
    feedbackTrue: "Correct: magnitude measures energy at the source; intensity varies with distance and ground conditions.",
    feedbackFalse: "Magnitude is one value per earthquake; intensity varies from place to place.",
    explanation: "Intensity is high near the epicentre and on soft ground, lower far away.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the differences between P waves, S waves and surface waves.",
    points: [
      "P waves are fastest and arrive first; push-pull movement; travel through solids and liquids",
      "S waves are slower; side-to-side movement; travel through solids only",
      "Surface waves are slowest, travel along the surface and cause the most damage",
    ],
    modelAnswer: "P waves are fastest, compress and stretch the rock and pass through solids and liquids. S waves are slower, shake the rock from side to side and pass only through solids. Surface waves arrive last, travel along the surface and cause the largest ground movements and most damage.",
    explanation: "One mark per wave type, with a clear difference.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how an undersea earthquake can cause a tsunami.",
    points: [
      "Earthquake at a subduction zone suddenly lifts (or drops) the sea floor",
      "The whole column of water above is displaced, forming a wave",
      "The wave travels very fast across deep ocean with low height",
      "In shallow coastal water it slows and grows much taller before flooding the land",
    ],
    modelAnswer: "When plates slip at a subduction zone, part of the sea floor is suddenly pushed up, lifting the whole column of water above. This creates a wave that crosses the deep ocean very fast but is low. As it reaches shallow water near the coast it slows and its height increases greatly, so it floods inland.",
    explanation: "Displacement, travel, growth near the coast.",
    hints: ["What happens to the sea floor?", "How does the wave change in shallow water?"],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "\"The magnitude of an earthquake is the best guide to the damage it will cause.\" To what extent do you agree?",
    points: [
      "Higher magnitude releases more energy, so shaking and damage can be greater (logarithmic scale)",
      "Depth of focus: shallow earthquakes cause more surface damage",
      "Distance from epicentre and ground type: soft, waterlogged ground amplifies shaking and causes liquefaction",
      "Secondary effects (tsunamis, landslides, fires) can cause more damage than shaking",
      "Population density, building quality and time of day affect losses",
      "Judgement: magnitude matters but other factors often decide the damage; intensity (Mercalli) describes damage better",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Magnitude matters: because the scale is logarithmic, a magnitude 8 earthquake releases about a thousand times more energy than a magnitude 6, so it can shake a far larger area. However, magnitude alone is a poor guide. A shallow focus delivers more energy to the surface than a deep one. Soft, waterlogged ground shakes more and can liquefy, as Christchurch showed in 2011. Secondary effects such as the 2004 Indian Ocean tsunami caused most of the deaths. Damage also depends on how many people live there, how well buildings are built and the time of day. I only partly agree: magnitude sets the energy available, but depth, ground, secondary effects and human factors decide the damage, which is why intensity on the Mercalli scale varies so much between places.",
    explanation: "Credit discussion of magnitude and at least three other factors, with a judgement.",
    hints: ["What else changes the shaking at a place?", "Think of human factors too."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Table 1 shows reports from four towns after a fictional earthquake of magnitude 6.8.\n\n${TOWNS}`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe the relationship between distance from the epicentre and intensity.", points: [
        "Intensity decreases as distance from the epicentre increases",
        "Uses data, e.g. IX at 15 km (Arin) and IV at 150 km (Dara)",
      ], modelAnswer: "Intensity falls with distance: IX at Arin, 15 km away, but only IV at Dara, 150 km away.", explanation: "Relationship plus data." }),
      P.short({ label: "(b)", marks: 1, stem: "Which town is an anomaly, with higher intensity than its distance suggests?", accepted: ["Bodo"], wrong: ["Celo"], explanation: "Bodo (VIII at 40 km) on soft sand." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which secondary effect explains the damage at Bodo?", options: [
        ["Liquefaction", "Correct: waterlogged sand lost strength, so buildings tilted and sank."],
        ["Tsunami", "No sea wave is mentioned."],
        ["Fire", "The damage described is tilting and sinking, not burning."],
        ["Landslide", "Landslides need slopes; this is waterlogged sand."],
      ], answer: "A", explanation: "Tilting and sinking on waterlogged sand: liquefaction." }),
      P.num({ label: "(d)", marks: 1, stem: "How much further from the epicentre is Dara than Celo?", value: 90, unit: "km", wrong: [210], explanation: "150 − 60 = 90 km." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why all four towns share the same magnitude but have different intensities.", points: [
        "Magnitude measures the energy released at the source: one value per earthquake",
        "Intensity measures effects at each place, which depend on distance and ground conditions",
      ], modelAnswer: "Magnitude is a single measure of energy released at the focus, so it is the same for every town. Intensity describes the effects felt at each town, which depend on distance from the epicentre and the type of ground.", explanation: "Magnitude vs intensity." }),
    ],
    hints: ["Look for the town that does not fit the pattern.", "What is different about its ground?"],
    explanation: "Practice in interpreting intensity data.",
  });
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "Three fictional seismic stations recorded the same earthquake. Scientists use the rule that each second of delay between P and S waves represents about 8 km.\n\n| Station | P-S delay (seconds) |\n|---|---|\n| North | 15 |\n| East | 22 |\n| South | 9 |",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the distance of the epicentre from North station.", value: 120, unit: "km", wrong: [23], explanation: "15 × 8 = 120 km." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the distance of the epicentre from East station.", value: 176, unit: "km", wrong: [30], explanation: "22 × 8 = 176 km." }),
      P.short({ label: "(c)", marks: 1, stem: "Which station is closest to the epicentre?", accepted: ["South", "south station", "the south station"], wrong: ["East"], explanation: "South: shortest delay (9 s, 72 km)." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how the three readings are used to locate the epicentre.", points: [
        "A circle is drawn around each station with radius equal to its distance from the epicentre",
        "Each circle shows all possible positions for that station",
        "The epicentre is where the three circles intersect",
      ], modelAnswer: "Around each station a circle is drawn with a radius equal to the calculated distance (120 km for North, 176 km for East, 72 km for South). The epicentre must lie on every circle, so it is where all three circles cross.", explanation: "Triangulation." }),
    ],
    hints: ["Multiply each delay by 8.", "One station gives a circle, three give a point."],
    explanation: "Practice in locating an epicentre.",
  });

  b.card("DEFINITION", "Earthquake", "A sudden shaking of the ground caused by the release of stress when rocks break or slip along a fault.");
  b.card("DEFINITION", "Focus (hypocentre)", "The point underground where an earthquake starts.");
  b.card("DEFINITION", "Epicentre", "The point on the surface directly above the focus; shaking is usually strongest here.");
  b.card("CONCEPT", "Seismic waves", "P waves (fastest, push-pull, solids and liquids), S waves (slower, side to side, solids only), surface waves (slowest, most damage).");
  b.card("CONCEPT", "Magnitude vs intensity", "Magnitude (Richter, moment magnitude): energy released, one value, logarithmic. Intensity (Mercalli I-XII): effects at a place, varies with distance.");
  b.card("FACT", "Logarithmic magnitude", "Each whole step is 10 times the ground movement and about 32 times the energy.");
  b.card("CONCEPT", "Secondary effects", "Tsunamis, liquefaction, landslides and fires; often deadlier than the shaking itself.");
  b.card("FACT", "Earthquakes in southern Africa", "Linked to the East African Rift (e.g. central Mozambique, 2006, magnitude about 7), faults, Lake Kariba (reservoir-induced) and deep mining in South Africa.");
  b.card("VOCABULARY", "Seismometer", "An instrument that detects and records ground movement; the record is a seismogram.");
});
