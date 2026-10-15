// W3a: coastal.depositional-landforms (Cambridge only, A Level Paper 3 option 8). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3a-_q.mjs";

const deg = (v, h) => (Math.atan(v / h) * 180) / Math.PI;
// Singles
const sandPct = chk((1.2 / 40) * 100, 3, 1e-9);
const shingleAngle = rnd(deg(3.0, 24), 1, 7.1, "shingleAngle");
const extRate = chk(((2.1 - 1.5) * 1000) / 25, 24, 1e-9);
const volMillion = chk((12000 * 150 * 4) / 1e6, 7.2, 1e-9);
// Struct 1: spit length
const SP = [[1990, 1.5], [2000, 1.92], [2010, 2.34], [2020, 2.52]];
const SPTAB = tbl(["Year", "Length of spit (km)"], SP.map((r) => [r[0], r[1].toFixed(2)]));
const spitRate = chk(((2.52 - 1.5) * 1000) / 30, 34, 1e-9);
// Struct 2: beach profiles
const angleB = rnd(deg(3.6, 24), 1, 8.5, "angleB");
const angleA = rnd(deg(1.8, 60), 1, 1.7, "angleA");
const PRO = tbl(["Beach", "Sediment", "Horizontal width (m)", "Height of back of beach above low tide (m)"], [["A", "Medium sand", 60, "1.8"], ["B", "Shingle", 24, "3.6"]]);

concept("ageo.coastal.depositional-landforms", { file: "coastal/depositional-landforms", keyPrefix: "coastal.depositional-landforms", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "Which description fits a spit?", [
    ["A ridge of sand or shingle attached to the land at one end", "Correct: the other end projects into open water."],
    ["A ridge of sand that links an island to the mainland coast", "That is a tombolo."],
    ["A ridge of shingle separated from the coast by a lagoon", "That describes a barrier island."],
    ["A flat area of rock cut by waves at the foot of a high cliff", "That is a shore platform."],
  ], "A spit is attached at **one end** and ends in open water.");
  mc(b, 2, "UNDERSTANDING", "Why are shingle beaches usually steeper than sandy beaches?", [
    ["The swash soaks into the shingle, so the backwash is weak", "Correct: little material is dragged back down the slope."],
    ["The sediment is finer, so it is carried up the beach more easily", "Shingle is coarser, not finer, than sand."],
    ["The waves that reach shingle beaches are always destructive", "Destructive waves flatten beaches."],
    ["The sea level is always higher on shingle beaches than elsewhere", "Sea level does not differ with the sediment size."],
  ], "Coarse sediment is **permeable**, so the backwash is weak and the beach steepens.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is a swash-aligned beach?", [
    ["A beach lying parallel to the crests of arriving waves", "Correct: there is little net movement along the beach."],
    ["A beach where longshore drift is the main process of change", "That describes a drift-aligned beach."],
    ["A beach built by waves from two opposing directions", "This is not what the term means."],
    ["A beach that is covered at every high tide by the sea", "This describes the tidal zone and not a type of plan."],
  ], "A swash-aligned beach faces the waves, which break **parallel to the shore**.");
  mc(b, 3, "ANALYSIS", "Why does the end of a spit often curve towards the land?", [
    ["Waves from a second direction and refraction bend the tip", "Correct: the hook forms where a secondary wave direction acts."],
    ["Longshore drift changes direction at the tip of the spit", "The main drift continues in its original direction."],
    ["The river at the estuary mouth pushes sediment to the side", "The river keeps the channel open; it does not form the hook."],
    ["Tides always flow towards the land at the end of a spit", "Tides flow both ways and do not make the hook alone."],
  ], "The recurved tip is caused by **refraction and secondary waves**.", { hints: ["The main drift builds the spit straight; what bends the end?"] });
  mc(b, 2, "UNDERSTANDING", "Where is a tombolo most likely to form?", [
    ["In the wave shadow behind an island close to the coast", "Correct: sediment is deposited in the calmer water."],
    ["On a steep cliff coast that faces the open ocean directly", "Strong waves there remove sediment."],
    ["In the mouth of a river that carries no sediment at all", "A tombolo needs a supply of sediment."],
    ["At the foot of a cliff where a notch has been cut by waves", "A notch is an erosional feature."],
  ], "A tombolo forms in the **sheltered water** behind an island.");
  mc(b, 3, "ANALYSIS", "What is meant by the rollover of a barrier island?", [
    ["Storm waves wash sediment from the front to the back", "Correct: the island migrates landward."],
    ["The island becomes larger when sea level falls and waves weaken", "Rollover involves landward movement during storms."],
    ["The lagoon behind the island is filled by sediment from a river", "That describes filling of a lagoon, not rollover."],
    ["The island turns through 90° during the highest spring tides", "Islands do not rotate."],
  ], "**Rollover** moves the island landward as overwash carries sediment to the back.", { hints: ["Think about what storm waves do when they overtop the ridge."] });
  mc(b, 3, "ANALYSIS", "Why is saltmarsh able to develop behind a spit?", [
    ["The water behind the spit is sheltered so mud settles", "Correct: plants colonise the mud and trap more."],
    ["The spit stops all salt water from reaching the area behind it", "Salt water still enters through the tides."],
    ["Waves are strongest behind a spit and bring sediment to it", "The area behind a spit is sheltered from waves."],
    ["The spit supplies fresh water from the sea to the plants there", "Saltmarsh plants tolerate salt water."],
  ], "The spit gives a **low-energy** environment where mud accumulates.", { hints: ["Which environment allows fine sediment to settle?"] });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A tombolo is a ridge of sand or shingle that links an island to the mainland.", answer: true,
    feedbackTrue: "Correct: it forms in the wave shadow of the island.", feedbackFalse: "Not so: this is the definition of a tombolo.",
    explanation: "A **tombolo** connects an island with the land." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each landform to its description.",
    pairs: [
      ["Spit", "Ridge attached at one end that extends into open water"],
      ["Tombolo", "Ridge that links an island to the mainland"],
      ["Barrier island", "Long ridge parallel to the coast with a lagoon behind"],
      ["Berm", "Ridge of sand or shingle at the top of the foreshore"],
      ["Drift-aligned beach", "Beach lying obliquely to the waves, with sediment moving along it"],
    ], explanation: "Each landform has a distinct shape and position." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A spit extends in the direction of {{blank:a}} drift. The curved end of a spit is described as {{blank:b}}. A ridge joining an island to the mainland is a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["longshore"], choices: ["longshore", "offshore", "onshore"] },
      { id: "b", accepted: ["recurved"], choices: ["recurved", "braided", "meandering"] },
      { id: "c", accepted: ["tombolo"], choices: ["tombolo", "geo", "stack"] },
    ], explanation: "Longshore drift builds the spit, which is recurved at the end; a tombolo joins an island to the land." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the landform formed when longshore drift deposits sediment beyond a bend in the coast to make a ridge attached at one end.",
    accepted: ["spit", "a spit", "sand spit"], explanation: "A **spit** extends from the land in the direction of the drift." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A sandy beach rises 1.2 m over a horizontal distance of 40 m (illustrative data). Calculate its gradient as a percentage.",
    hints: ["Gradient (%) = vertical ÷ horizontal × 100."],
    value: sandPct, wrong: [33.3, 0.03, 48],
    explanation: "1.2 ÷ 40 × 100 = **3%**. The value 33.3 divides the horizontal distance by the height (40 ÷ 1.2)." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "°",
    stem: "A shingle beach rises 3.0 m over a horizontal distance of 24 m (illustrative data). Calculate the angle of the beach, in degrees to one decimal place.",
    hints: ["Angle = tan⁻¹(vertical ÷ horizontal)."],
    value: shingleAngle, dp: 1, wrong: [12.5, 82.9, 0.1],
    explanation: "Gradient = 3.0 ÷ 24 = 0.125. Angle = tan⁻¹(0.125) = **7.1°**. The value 12.5 is the gradient as a percentage." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true,
    stem: "A spit was 1.5 km long in one year and 2.1 km long 25 years later (illustrative data). Calculate the mean rate of extension, in metres per year.",
    hints: ["Convert the extension from km to m first."],
    value: extRate, wrong: [0.024, 600],
    explanation: "Extension = 2.1 − 1.5 = 0.6 km = 600 m. Rate = 600 ÷ 25 = **24 m per year**. The value 0.024 is in km per year." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "million",
    stem: "A barrier beach is 12 km long, with a mean width of 150 m and a mean height of 4 m (illustrative data). Treat it as a rectangular block and calculate its volume, in millions of m³.",
    hints: ["Convert the length to metres.", "Volume = length × width × height."],
    value: volMillion, dp: 1, wrong: [7200, 0.0072],
    explanation: "1. Length = 12 km = 12 000 m.\n2. Volume = 12 000 × 150 × 4 = 7 200 000 m³.\n3. In millions of m³ this is **7.2**. The value 7 200 is in thousands of m³." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the main differences between a sandy beach and a shingle beach.",
    points: [
      "Sandy beaches are gentle (about 1–5°), whereas shingle beaches are steeper (often 5–15°).",
      "Sand is fine and compact, with low permeability, whereas shingle is coarse and permeable, so water drains through it.",
      "Sandy beaches often have ridges and runnels and dunes behind; shingle beaches have berms and storm ridges.",
    ],
    modelAnswer: "Sandy beaches are gentle, about 1–5°, whereas shingle beaches are steeper, often 5–15°. Sand is fine with low permeability, but shingle is coarse and permeable, so water drains through it. Sandy beaches often have ridges, runnels and dunes behind them, and shingle beaches have berms and storm ridges.",
    explanation: "Compare gradient, sediment and features." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a spit forms.",
    hints: ["Begin with the supply of sediment and the direction of the drift."],
    points: [
      "Longshore drift carries sand and shingle along the coast in the direction of the prevailing waves.",
      "At a change in the direction of the coast or at an estuary the drift continues straight on, and sediment is deposited in sheltered, shallow water beyond the bend.",
      "The ridge builds up and extends as more sediment arrives, while the river or tidal current keeps the estuary mouth open.",
      "Refraction and waves from a second direction curve the tip into a hook, and mud and saltmarsh form behind in the shelter.",
    ],
    modelAnswer: "Longshore drift carries sediment along the coast. At a bend in the coast or an estuary the drift continues straight on and deposits sediment in sheltered, shallow water beyond the bend. The ridge extends as more sediment arrives, while the river or tide keeps the estuary open. Refraction and waves from a second direction curve the tip into a hook, and saltmarsh forms behind it.",
    explanation: "Supply, change of direction, growth and recurving." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how a tombolo forms.",
    hints: ["Think of what an island does to waves."],
    points: [
      "An island close to the coast reduces the energy of waves behind it, and refraction around it creates a wave shadow.",
      "Sediment carried by longshore drift is deposited in the calmer water behind the island.",
      "The ridge builds up towards the island until it joins it to the mainland.",
    ],
    modelAnswer: "An island close to the coast reduces wave energy behind it, and refraction around the island creates a wave shadow. Sediment carried by longshore drift is deposited in the calmer water. The ridge builds up towards the island until it joins it to the mainland.",
    explanation: "A wave shadow allows deposition that links the island to the land." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Suggest why a spit may become shorter or be breached.",
    hints: ["Think of the sediment supply, storms and sea level."],
    points: [
      "The sediment supply from updrift may fall, for example because of coastal defences, dams or dredging, so the spit is eroded faster than it is replaced.",
      "Storm surges and large waves can overtop and cut through the narrowest part of the spit.",
      "Rising sea level and a change in wave direction can increase erosion and move the spit landwards.",
      "Strong currents from the river or tide can erode the tip.",
    ],
    modelAnswer: "The sediment supply from updrift may fall because of coastal defences, dams or dredging, so the spit is eroded faster than it is replaced. Storm surges and large waves can overtop and cut through the narrowest part of the spit. Rising sea level and a change in wave direction can increase erosion, and strong tidal or river currents can erode the tip.",
    explanation: "Reduced supply, storms, sea-level rise and currents." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table shows the length of a spit at the mouth of an estuary, measured from surveys (illustrative data, invented for this exercise).\n\n${SPTAB}`,
    hints: ["Extension = length in 2020 − length in 1990; convert km to m.", "Think about the sediment supply and what happens near the tip of the spit."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean rate of extension of the spit between 1990 and 2020, in metres per year.", value: spitRate, wrong: [1.02, 1020, 0.034],
        explanation: "Extension = 2.52 − 1.50 = 1.02 km = 1 020 m. Over 30 years: 1 020 ÷ 30 = 34 m per year. The value 1 020 is the total extension." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe how the rate of growth of the spit changed over the period.",
        points: [
          "The spit grew fastest between 1990 and 2010, by 0.42 km in each decade (about 42 m per year).",
          "Between 2010 and 2020 growth slowed sharply, to 0.18 km in the decade (about 18 m per year).",
          "The spit continued to lengthen throughout, from 1.50 km to 2.52 km, a total increase of 1.02 km.",
        ],
        modelAnswer: "The spit grew fastest between 1990 and 2010, by 0.42 km in each decade, about 42 m per year. Between 2010 and 2020 growth slowed sharply, to 0.18 km in the decade, about 18 m per year. It lengthened throughout, from 1.50 km to 2.52 km.",
        explanation: "Give rates for each period and the trend." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest reasons why the rate of growth slowed after 2010.",
        points: [
          "The supply of sediment from updrift may have fallen, for example because of coastal defences or a dam on a river.",
          "Deeper water at the tip or stronger tidal and river currents near the estuary mean that the spit cannot extend easily and sediment is carried away.",
          "Storms or a change in wave direction may have eroded the spit or moved sediment to other parts of the coast.",
        ],
        modelAnswer: "The sediment supply from updrift may have fallen, for example because of coastal defences or a dam on a river. The water at the tip may be deeper, or the tidal and river currents stronger, so that sediment is carried away. Storms or a change in wave direction may have eroded the spit.",
        explanation: "Less supply, deeper water and stronger currents, or storms." }),
    ], explanation: "Calculate a rate, describe change and suggest reasons." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table gives measurements of two beaches (illustrative data, invented for this exercise).\n\n${PRO}`,
    hints: ["Angle = tan⁻¹(height ÷ width).", "Think of how water behaves on sand and on shingle."],
    parts: [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the angle of Beach B, in degrees to one decimal place.", value: angleB, dp: 1, unit: "°", wrong: [15, 0.15, 81.5],
            explanation: "Gradient = 3.6 ÷ 24 = 0.15. Angle = tan⁻¹(0.15) = 8.5°. The value 15 is the gradient as a percentage." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "What is the angle of Beach A, to the nearest 0.1°?", options: [
            ["1.7°", "Correct: tan⁻¹(1.8 ÷ 60) = tan⁻¹(0.03) = 1.7°."],
            ["3.0°", "That is the gradient as a percentage (3%), not an angle."],
            ["17.0°", "This is the result of misplacing the decimal point."],
            ["33.3°", "This divides the width by the height."],
          ], answer: "A", explanation: "1.8 ÷ 60 = 0.03, and tan⁻¹(0.03) = 1.7°." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why Beach B is steeper than Beach A.",
        points: [
          "Shingle is coarse and permeable, so the swash soaks into the beach and the backwash is weak.",
          "Little sediment is dragged back down the beach, so the shingle accumulates in a steep ridge.",
          "Sand is fine and less permeable, so the backwash is stronger and moves sediment down, flattening the beach.",
        ],
        modelAnswer: "Shingle is coarse and permeable, so the swash soaks into the beach and the backwash is weak. Little sediment is dragged back down, so the shingle builds up in a steep ridge. Sand is fine and less permeable, so the backwash is stronger and moves sediment down, flattening the beach.",
        explanation: "Permeability and the strength of the backwash control the gradient." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe how a drift-aligned beach differs from a swash-aligned beach.",
        points: [
          "A swash-aligned beach lies parallel to the wave crests, and sediment moves up and down the beach.",
          "A drift-aligned beach lies obliquely to the waves, and sediment moves along the beach by longshore drift.",
          "Swash-aligned beaches are typically found in bays between headlands, and drift-aligned beaches along straight coasts, where they are the beginning of spits.",
        ],
        modelAnswer: "A swash-aligned beach lies parallel to the wave crests, and sediment moves up and down the beach. A drift-aligned beach lies obliquely to the waves, and sediment moves along it by longshore drift. Swash-aligned beaches are typical of bays between headlands, and drift-aligned beaches are found on straight coasts and may develop into spits.",
        explanation: "Compare orientation, sediment movement and setting." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest how a spit might develop from a drift-aligned beach at a bend in the coast.",
        points: [
          "Longshore drift carries sediment along the beach to the bend, where the coast turns away.",
          "Beyond the bend, the water is sheltered and deeper, so sediment is deposited and a ridge builds out from the end of the beach.",
          "The ridge extends and curves with refraction and waves from a second direction, and saltmarsh may form behind it.",
        ],
        modelAnswer: "Longshore drift carries sediment along the beach to the bend, where the coast turns away. Beyond the bend the water is sheltered, so sediment is deposited and a ridge builds out from the end of the beach. The ridge extends and its tip curves with refraction and waves from a second direction, and saltmarsh may form behind it.",
        explanation: "Drift, a change in the direction of the coast and deposition." }),
    ], explanation: "Calculate beach angles, explain beach gradient and describe the development of a spit." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the view that the supply of sediment is the most important factor in the formation of coastal depositional landforms.",
    hints: ["Give sediment supply and two other controls.", "Use landforms such as spits or barrier beaches as examples."],
    points: [
      "A supply of sediment (from cliffs, rivers, the sea floor and drift) is essential: without it nothing can be deposited.",
      "Examples: spits and beaches grow when inputs exceed outputs and shrink when supply falls, for example after dams or sea walls trap sediment.",
      "A low-energy environment is needed so that the waves lack the energy to carry the sediment away (sheltered bays, wave shadows behind islands, estuaries).",
      "The shape of the coast (a bend, an estuary or an island) controls where deposition occurs.",
      "Sea-level change affects the position of the landforms and their stability (for example barrier beaches migrating landwards).",
      "Storms and human activity (groynes, dredging) can remove or move the sediment.",
      "These factors interact: sediment supply is necessary but not sufficient, since the energy conditions and the coastal shape decide where it accumulates.",
      "Judgement: supply is the most basic requirement, but the landform that results depends on energy and coastal shape, so it is the most important single condition but not the only one.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Sediment supply is essential because no landform can build without material. Spits and beaches grow when inputs exceed outputs and shrink when supply falls, for example when dams or sea walls trap sediment. However, supply alone is not sufficient. A low-energy environment is needed so that waves do not carry the sediment away, as in sheltered bays, in the wave shadow of an island, or at an estuary. The shape of the coast, with a bend or an island, controls where deposition occurs, and sea-level change and storms alter the position and stability of the landforms. I conclude that supply is the most basic condition, but the landform that develops depends on energy and coastal shape, so it is the most important single factor but not the only one.",
    wordLimit: { max: 300 }, explanation: "Weigh sediment supply against energy, coastal shape and sea level." });

  b.card("DEFINITION", "Spit", "A long, narrow ridge of sand or shingle attached to the land at one end and extending into open water, formed by longshore drift at a change in the direction of the coast.");
  b.card("DEFINITION", "Tombolo", "A ridge of sand or shingle that links an island to the mainland, formed in the wave shadow of the island.");
  b.card("DEFINITION", "Barrier beach and barrier island", "A long ridge of sand or shingle parallel to the coast; a barrier island is separate from the mainland and has a lagoon behind it.");
  b.card("CONCEPT", "Swash-aligned beach", "A beach lying parallel to the crests of incoming waves, so that sediment moves up and down the beach with little net movement along it.");
  b.card("CONCEPT", "Drift-aligned beach", "A beach lying obliquely to the waves, where longshore drift moves sediment along it; the starting point of a spit.");
  b.card("CONCEPT", "Sand and shingle beaches", "Sandy beaches are gentle (about 1–5°); shingle beaches are steeper because their permeable sediment gives a weak backwash.");
  b.card("CONCEPT", "Why the end of a spit is recurved", "Wave refraction and waves from a second direction curve the tip of the spit towards the land.");
  b.card("CONCEPT", "Rollover", "Storm waves wash sediment from the front to the back of a barrier island, so that it migrates landwards.");
  b.card("FACT", "Examples of depositional landforms", "Spit: Spurn Head (England; breached in December 2013), Walvis Bay (Namibia). Tombolo: Monte Argentario (Italy). Barrier beach: Chesil Beach (England, about 29 km).");
});
