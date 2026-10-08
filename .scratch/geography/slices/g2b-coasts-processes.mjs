// Slice G2b: coastal processes (waves, refraction, marine erosion, longshore drift, deposition, sub-aerial processes).
import { concept, P, geographyLevels } from "../lib.mjs";

const WAVES = "**Table 1: Wave observations on two fictional beaches on the same day**\n\n| Beach | Waves counted in 5 minutes | Wave height (m) | Beach gradient (°) | Main sediment |\n|---|---|---|---|---|\n| North Bay | 32 | 0.6 | 4 | Fine sand |\n| Storm Point | 64 | 2.1 | 15 | Shingle (pebbles) |";

const DRIFT = "**Table 2: Movement of a marked float along a fictional beach (prevailing wind from the south-west)**\n\n| Trial | Distance moved north-east (m) | Time (min) |\n|---|---|---|\n| 1 | 27 | 5 |\n| 2 | 33 | 5 |\n| 3 | 24 | 5 |";

concept("geo.coasts.processes", { file: "coasts/processes", keyPrefix: "coasts.processes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **fetch** of a wave?",
    options: [
      ["The distance of open water the wind blows over", "Correct: a longer fetch allows bigger waves."],
      ["The height from trough to crest of a wave", "That is wave height."],
      ["The time between two wave crests", "That is the wave period."],
      ["The water returning down the beach", "That is backwash."],
    ],
    answer: "A",
    explanation: "**Fetch** is the distance of open water over which the wind blows. With wind speed and duration it controls wave size.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which process of marine erosion is caused by air compressed in cracks by breaking waves?",
    options: [
      ["Hydraulic action", "Correct: compressed air expands violently and widens cracks."],
      ["Attrition", "Attrition wears down pebbles against each other."],
      ["Solution", "Solution is chemical dissolving of rock."],
      ["Longshore drift", "Longshore drift is transport along the coast."],
    ],
    answer: "A",
    explanation: "**Hydraulic action** includes the force of waves and the compression and expansion of air in cracks.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which feature describes a **constructive** wave?",
    options: [
      ["Strong swash and weak backwash", "Correct: material is pushed up and left on the beach."],
      ["Weak swash and strong backwash", "This describes destructive waves."],
      ["High, steep and very frequent", "These are destructive wave features."],
      ["Breaks vertically and plunges downwards", "Plunging breakers are destructive."],
    ],
    answer: "A",
    explanation: "Constructive waves are low and spill forward; the strong **swash** carries sediment up the beach and the weak backwash leaves it there.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In longshore drift, why does the **backwash** run straight down the beach?",
    options: [
      ["It flows down the steepest slope under gravity", "Correct: gravity pulls it at right angles to the shore."],
      ["The prevailing wind blows it straight out to sea", "The wind controls the swash angle, not the backwash."],
      ["Tides pull it directly towards the moon", "Tides do not control individual backwash paths."],
      ["Waves always approach the beach head-on", "In longshore drift waves approach at an angle."],
    ],
    answer: "A",
    explanation: "Swash follows the wave direction, but backwash flows down the steepest slope under **gravity**, at right angles to the shoreline. This gives the zigzag movement.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do waves break as they approach the shore?",
    options: [
      ["Friction with the sea bed slows the base of the wave", "Correct: the crest outruns the base and topples."],
      ["The wind stops blowing close to the land", "Waves break even when the wind keeps blowing."],
      ["Fresh water from rivers makes the waves heavier", "Salinity is not the cause of breaking."],
      ["The tide pushes the top of the wave forward", "Tides raise and lower sea level; they do not make waves break."],
    ],
    answer: "A",
    explanation: "In shallow water friction slows the base of the wave while the top keeps going, so the wave steepens and breaks.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Wave refraction around a headland means that:",
    options: [
      ["energy is concentrated on the headland and spread out in the bays", "Correct: waves bend to wrap round the headland."],
      ["energy is concentrated in the bays and spread out on the headland", "This is the wrong way round."],
      ["waves reach the headland and bays with equal energy", "Refraction redistributes energy unequally."],
      ["waves stop moving in the shallow water off the headland", "Waves slow down but keep moving and bend."],
    ],
    answer: "A",
    explanation: "Waves slow in shallow water off the headland and bend towards it, concentrating energy there; in bays the energy is spread over a longer shore.",
    hints: ["Where is the water shallowest?", "What happens to waves in shallow water?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A coast faces a 4,000 km stretch of open ocean in the direction of the prevailing wind. What is most likely?",
    options: [
      ["Powerful waves and rapid erosion of weak cliffs", "Correct: a long fetch allows large, energetic waves."],
      ["Very small waves because the ocean is deep", "Depth offshore does not limit wave growth like this."],
      ["Only constructive waves that build wide beaches", "Long-fetch coasts often receive powerful destructive storm waves."],
      ["No longshore drift because waves arrive too fast", "Wave speed does not prevent longshore drift."],
    ],
    answer: "A",
    explanation: "A long **fetch** lets waves grow large, so the coast receives high-energy waves capable of strong erosion.",
    hints: ["Which three factors control wave size?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A cliff of soft clay retreats much faster in wet winters than in dry ones, even when waves are similar. Which explanation is best?",
    options: [
      ["Saturated clay slumps, and the sea then removes the debris", "Correct: sub-aerial processes and marine erosion combine."],
      ["Rain increases hydraulic action at the base of the cliff", "Rain does not drive hydraulic action, which is caused by waves."],
      ["Wet clay is dissolved by seawater through solution", "Clay is not a soluble rock like limestone."],
      ["Wet winters bring constructive waves that undercut the cliff", "Constructive waves build beaches and do not undercut cliffs."],
    ],
    answer: "A",
    explanation: "Rain saturates the clay, making it heavier and weaker, so it slumps. Waves then remove the slumped material, exposing the cliff again.",
    hints: ["What do sub-aerial processes do to cliffs?", "How does water affect clay?"],
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A student counts 21 waves breaking in 3 minutes. How many waves per minute is this?",
    value: 7, wrong: [63, 24],
    explanation: "21 ÷ 3 = 7 waves per minute, a low frequency typical of constructive waves.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A float moves 63 m along a beach in 7 minutes. Calculate the rate of longshore drift in metres per second, to two decimal places.",
    value: 0.15, unit: "m/s", tol: 0.005, answer: "0.15",
    wrong: [9, 0.9],
    explanation: "63 ÷ 7 = 9 m per minute; 9 ÷ 60 = 0.15 m/s.",
    workedSolution: "1. Rate = 63 m ÷ 7 min = 9 m per minute.\n2. Convert to seconds: 9 ÷ 60 = 0.15 m/s.",
    hints: ["First find metres per minute.", "There are 60 seconds in a minute."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The rush of water up a beach after a wave breaks is the {{blank:a}}. Water flowing back down the beach is the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["swash"], wrong: "backwash" },
      { id: "b", accepted: ["backwash", "back-wash"], wrong: "swash" },
    ],
    explanation: "**Swash** goes up the beach; **backwash** returns under gravity.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each coastal process with its description.",
    pairs: [
      ["Abrasion", "Waves throw sand and pebbles against the cliff"],
      ["Attrition", "Pebbles collide and become smaller and rounder"],
      ["Solution", "Seawater dissolves limestone or chalk"],
      ["Slumping", "Saturated clay slides down a curved surface"],
      ["Longshore drift", "Sediment moves along the beach in a zigzag"],
    ],
    explanation: "Three marine erosion processes, one sub-aerial mass movement and one transport process.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Destructive waves usually have a stronger backwash than swash.",
    answer: true,
    explanation: "True. Their strong backwash drags material down the beach and out to sea.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Longshore drift moves sediment in the opposite direction to the prevailing wind.",
    answer: false,
    explanation: "False. Waves approach at the angle of the prevailing wind, so sediment moves along the coast **in the direction** of the prevailing wind.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the bending of waves as they approach an irregular coastline.",
    accepted: ["wave refraction", "refraction"],
    wrong: ["longshore drift"],
    explanation: "**Wave refraction** bends waves towards headlands.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how longshore drift moves sediment along a coast.",
    points: [
      "The prevailing wind makes waves approach the beach at an angle.",
      "Swash carries sediment up the beach at that angle.",
      "Backwash carries it straight back down the beach under gravity (at right angles to the shore).",
      "Repeated many times, sediment moves along the beach in a zigzag in the direction of the prevailing wind.",
    ],
    modelAnswer: "The prevailing wind blows at an angle to the coast, so waves approach the beach at an angle. The swash carries sand and pebbles up the beach at this angle, but the backwash returns straight down the beach under gravity. With each wave the sediment moves a little further along the beach in a zigzag path, in the direction of the prevailing wind.",
    explanation: "Four linked stages.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how sub-aerial processes contribute to cliff retreat.",
    points: [
      "Weathering weakens the cliff face (e.g. salt crystallisation, chemical weathering of limestone, roots).",
      "Mass movement (rockfall or slumping, especially after heavy rain) moves material down to the base.",
      "Waves remove the debris, exposing the cliff to further attack, so retreat continues.",
    ],
    modelAnswer: "Weathering, such as salt crystals growing in cracks or rainwater dissolving limestone, weakens the cliff face. Weakened rock falls, or saturated clay slumps, down to the foot of the cliff. Waves then remove this debris, leaving the cliff exposed again, so the combination makes the cliff retreat.",
    explanation: "Weathering, mass movement and removal by the sea.",
    hints: ["Think about what happens above the reach of the waves."],
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why some stretches of coast are eroded rapidly while others experience deposition.",
    points: [
      ["Wave energy: long fetch, strong winds and storms give powerful destructive waves that erode.", 1],
      ["Rock type and structure: weak or jointed rock (clay, chalk) erodes faster than resistant rock (granite).", 1],
      ["Wave refraction concentrates energy on headlands and spreads it in bays, where deposition occurs.", 1],
      ["Beaches absorb wave energy and protect cliffs; where there is no beach, erosion is faster.", 1],
      ["Deposition where constructive waves dominate, in sheltered areas, or where longshore drift meets a change in coastline direction.", 1],
      ["Sediment supply (rivers, longshore drift) and human structures (groynes) affect the balance; sub-aerial processes speed up erosion of soft cliffs.", 1],
    ],
    levels: geographyLevels(6),
    modelAnswer: "Whether a coast is eroded or built up depends on the balance between wave energy and the supply of sediment. Coasts facing a long fetch and frequent storms receive high, frequent destructive waves whose strong backwash removes material, so erosion is rapid, especially where the rock is weak, such as clay or chalk, or heavily jointed. Resistant rocks like granite erode slowly. Wave refraction concentrates energy on headlands, which are eroded, and spreads it in bays, where lower-energy waves deposit sand. A wide beach absorbs wave energy and protects the cliff behind it, so cliffs without beaches retreat faster. Deposition occurs where constructive waves dominate, in sheltered places, and where longshore drift carries sediment into calmer water at a change in the direction of the coast. Plentiful sediment from rivers also favours deposition, while groynes and dams can starve beaches further along the coast. Finally, sub-aerial processes such as slumping after heavy rain speed up the retreat of soft cliffs.",
    explanation: "Credit explanations of energy, geology, refraction, beaches and sediment supply.",
    hints: ["Consider wave energy, rock type and sediment supply."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 1.\n\n${WAVES}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the number of waves per minute at Storm Point.", value: 12.8, tol: 0.05, answer: "12.8", wrong: [64, 6.4], explanation: "64 ÷ 5 = 12.8 waves per minute." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the number of waves per minute at North Bay.", value: 6.4, tol: 0.05, answer: "6.4", wrong: [32], explanation: "32 ÷ 5 = 6.4 waves per minute." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which type of wave is most likely at North Bay?", options: [
        ["Constructive", "Correct: low, infrequent waves on a gentle sandy beach."],
        ["Destructive", "Destructive waves are high and frequent, as at Storm Point."],
        ["Tsunami", "Nothing suggests a tsunami; these are ordinary wind waves."],
        ["Plunging storm waves", "Plunging storm waves are high and steep, which these are not."],
      ], answer: "A", explanation: "Low height (0.6 m), low frequency (6.4 a minute) and a gentle sandy beach point to constructive waves." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the beach at Storm Point is steeper and made of shingle.", points: [
        "Destructive waves have a strong backwash that drags fine sand away offshore.",
        "Coarser shingle is too heavy to be removed, so it is left behind.",
        "Shingle is permeable, so swash soaks in and the backwash is weakened at the top, building a steep slope.",
      ], explanation: "Link wave type to sediment sorting and beach gradient." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest **two** reasons why waves are larger at Storm Point than at North Bay on the same day.", points: [
        "Storm Point is more exposed to the prevailing wind / has a longer fetch.",
        "North Bay is sheltered (e.g. in a bay where refraction spreads wave energy, or behind a headland).",
      ], explanation: "Exposure, fetch and refraction." }),
    ],
    hints: ["Divide the number of waves by the time.", "Which waves have a strong backwash?"],
    explanation: "Practice comparing constructive and destructive wave environments.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `Study Table 2.\n\n${DRIFT}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the mean distance moved in the three trials.", value: 28, unit: "m", wrong: [84, 27], explanation: "(27 + 33 + 24) ÷ 3 = 84 ÷ 3 = 28 m." }),
      P.num({ label: "(b)", marks: 2, stem: "Using the mean, calculate the rate of drift in metres per minute.", value: 5.6, tol: 0.05, answer: "5.6", wrong: [28, 140], explanation: "28 m ÷ 5 min = 5.6 m per minute." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the float moved towards the north-east.", points: [
        "The prevailing wind from the south-west drives waves onto the beach at an angle from the south-west.",
        "Swash moves the float north-east along the beach while backwash returns at right angles, so net movement is north-east.",
      ], explanation: "Link the wind direction to the drift direction." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest **two** ways to make the results more reliable.", points: [
        "Carry out more trials and calculate a mean / repeat at different times or tides.",
        "Keep conditions the same: same starting point, same float, same timing method.",
      ], explanation: "Repetition and controlled method." }),
    ],
    hints: ["Mean = total ÷ number of trials.", "Which way does the prevailing wind blow the waves?"],
    explanation: "Practice measuring longshore drift.",
  });
  b.card("DEFINITION", "Fetch", "Distance of open water over which wind blows; with wind speed and duration it controls wave size.");
  b.card("CONCEPT", "Constructive waves", "Low, long, infrequent (about 6-8 a minute); strong swash, weak backwash; build wide gentle beaches.");
  b.card("CONCEPT", "Destructive waves", "High, steep, frequent (about 10-14 a minute); weak swash, strong backwash; erode and steepen beaches.");
  b.card("DEFINITION", "Wave refraction", "Bending of waves round headlands: energy concentrated on headlands, spread out in bays.");
  b.card("CONCEPT", "Marine erosion processes", "Hydraulic action, abrasion (corrasion), attrition, solution (corrosion).");
  b.card("CONCEPT", "Longshore drift", "Swash up the beach at the angle of the waves; backwash straight down under gravity; sediment zigzags along the coast.");
  b.card("DEFINITION", "Sub-aerial processes", "Weathering and mass movement (rockfall, slumping) acting on cliffs above the waves.");
  b.card("CONCEPT", "Why waves break", "Friction with the sea bed slows the base; the crest outruns it, steepens and topples.");
  b.card("CONCEPT", "Where deposition happens", "Sheltered bays, constructive waves, changes in coastline direction, river mouths, behind reefs or groynes.");
});
