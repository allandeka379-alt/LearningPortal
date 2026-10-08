// Slice G2a: weathering, mass wasting and resulting landforms (ZIMSEC-only concept).
import { concept, P, geographyLevels } from "../lib.mjs";

const TEMPS = "| Time | 06:00 | 10:00 | 14:00 | 18:00 | 22:00 | 02:00 |\n|---|---|---|---|---|---|---|\n| Rock surface temperature (°C) | 9 | 31 | 47 | 33 | 18 | 11 |";

concept("geo.landforms.weathering-mass-wasting", { file: "landforms/weathering-mass-wasting", keyPrefix: "landforms.weathering-mass-wasting" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **weathering**?",
    options: [
      ["The breakdown of rock in its original place", "Correct: no transport is involved."],
      ["The removal of rock by rivers, wind or waves", "That is erosion, which needs a moving agent."],
      ["The movement of soil downhill under gravity", "That is mass wasting."],
      ["The laying down of sediment in layers", "That is deposition."],
    ],
    answer: "A",
    explanation: "**Weathering** breaks rock down in situ; erosion and mass wasting then move the material.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which process is a type of **chemical** weathering?",
    options: [
      ["Hydrolysis", "Correct: water reacts with feldspar and turns it into clay."],
      ["Exfoliation", "Exfoliation is physical: layers peel off through expansion and contraction."],
      ["Frost action", "Frost action is physical: freezing water widens cracks."],
      ["Granular disintegration", "Granular disintegration is physical: grains loosen as minerals expand unequally."],
    ],
    answer: "A",
    explanation: "Chemical weathering changes minerals: **hydrolysis**, oxidation, carbonation and solution.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Exfoliation is most active where:",
    options: [
      ["there is a large difference between day and night temperatures", "Correct: repeated heating and cooling stresses the outer layers."],
      ["it is cold and water freezes in cracks every night", "That describes frost action."],
      ["it is hot and wet all year with thick vegetation", "Such places favour chemical weathering."],
      ["limestone is attacked by rainwater containing carbon dioxide", "That describes carbonation."],
    ],
    answer: "A",
    explanation: "**Exfoliation** (onion-skin weathering) is typical of deserts and semi-arid areas with a big daily temperature range; pressure release also helps it on granite domes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which landform is a large, bare, smooth dome of granite with very few joints?",
    options: [
      ["A dwala", "Correct: also called a bornhardt, e.g. Domboshava."],
      ["A castle kopje", "A castle kopje is a pile of rectangular blocks along crossing joints."],
      ["A stalagmite", "A stalagmite is a karst feature in a cave."],
      ["A sinkhole", "A sinkhole is a hollow in limestone country."],
    ],
    answer: "A",
    explanation: "Few joints mean little water enters, so the granite survives as a large smooth **dwala** that sheds curved layers.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "A column of calcium carbonate **hanging from the roof** of a limestone cave is a:",
    options: [
      ["stalactite", "Correct: it hangs from the top."],
      ["stalagmite", "A stalagmite grows up from the floor."],
      ["pillar", "A pillar runs from floor to roof where the two join."],
      ["sinkhole", "A sinkhole is a hollow at the surface."],
    ],
    answer: "A",
    explanation: "Dripping water loses carbon dioxide and deposits calcite, building a **stalactite** down from the roof.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which evidence suggests **soil creep** on a hillside?",
    options: [
      ["Fence posts and tree trunks tilted downhill", "Correct: slow movement of the soil tilts objects rooted in it."],
      ["A fresh scar where a slope collapsed suddenly", "That is evidence of a landslide."],
      ["A fan of boulders at the foot of a cliff", "Scree at a cliff foot is evidence of rockfalls."],
      ["A layer of mud covering fields after a storm", "That suggests a mudflow or flood."],
    ],
    answer: "A",
    explanation: "**Soil creep** is very slow; you see it in tilted posts, bent trees, cracked walls and terracettes.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is chemical weathering of granite faster in the wet season in Zimbabwe than in the dry season?",
    options: [
      ["Water and high temperatures speed up reactions such as hydrolysis", "Correct: hydrolysis needs water, and warmth speeds up the reaction."],
      ["Frost is more common in the wet season", "Frost occurs in the cool dry season, and it is physical weathering anyway."],
      ["The daily temperature range is largest in the wet season", "Cloud reduces the daily range in the wet season; the range is largest in the dry season."],
      ["Wind blows more sand against the rock in the wet season", "Wind abrasion is erosion, not chemical weathering."],
    ],
    answer: "A",
    explanation: "Hot, wet conditions in the summer rains favour **hydrolysis** and oxidation; in the dry season there is little water for the reactions.",
    hints: ["What does hydrolysis need?", "How do warmth and moisture change in the two seasons?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A school is planned at the foot of a steep, deforested slope in a high-rainfall district. Which measure would **most directly** reduce the risk of a landslide reaching it?",
    options: [
      ["Replanting trees and digging drains on the slope", "Correct: roots bind the soil and drains remove the water that triggers failure."],
      ["Building the school with a stronger roof", "A roof does not stop a slope from sliding."],
      ["Planting maize on the slope in the wet season", "Annual crops give little root protection and leave soil bare after harvest."],
      ["Cutting a road across the bottom of the slope", "Road cuttings undercut slopes and make them less stable."],
    ],
    answer: "A",
    explanation: "Landslides are triggered by saturated, unvegetated, steep slopes; vegetation and drainage tackle the cause. Better still: hazard mapping to build elsewhere.",
    hints: ["What triggers landslides?", "Which option removes a trigger?"],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "On a fictional desert day, a rock surface reached a maximum of 52 °C at 14:00 and fell to a minimum of 6 °C just before dawn. Calculate the daily temperature range of the rock surface.",
    value: 46, unit: "°C",
    wrong: [58, 29],
    explanation: "Range = maximum − minimum = 52 − 6 = 46 °C. Such large ranges favour exfoliation.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "Water expands by about 9 % when it freezes. A crack in a rock holds 250 cm³ of water. What volume (in cm³) will the ice occupy?",
    value: 272.5, tol: 0.05,
    wrong: [22.5, 259],
    explanation: "9 % of 250 = 22.5 cm³; 250 + 22.5 = 272.5 cm³.",
    workedSolution: "1. Increase = 250 × 9 ÷ 100 = 22.5 cm³.\n2. Volume of ice = 250 + 22.5 = 272.5 cm³.",
    hints: ["Find 9 % of the volume.", "Add the increase to the original volume."],
  });
  b.calc({
    d: 4, skill: "APPLICATION",
    stem: "A stalagmite in a fictional cave is 45 cm tall. If it grew at an average of 0.15 mm per year, how many years did it take to form?",
    value: 3000, unit: "years",
    wrong: [300, 6.75],
    explanation: "45 cm = 450 mm; 450 ÷ 0.15 = 3,000 years.",
    workedSolution: "1. Convert: 45 cm = 450 mm.\n2. Time = 450 ÷ 0.15 = 3,000 years.",
    hints: ["Use millimetres for both values.", "Time = height ÷ growth rate."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the granite landform made of rounded boulders piled on a solid rock base, formed when loose weathered material is removed from around corestones.",
    accepted: ["kopje", "a kopje", "kopjes", "koppie", "a koppie", "koppies", "tor", "a tor", "tors"],
    wrong: ["dwala"],
    explanation: "A **kopje** (koppie, or tor).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about chemical weathering.",
    template: "In {{blank:a}}, feldspar in granite reacts with water and turns into clay. In {{blank:b}}, iron in minerals reacts with oxygen, giving red colours. In {{blank:c}}, rainwater with dissolved carbon dioxide dissolves limestone.",
    blanks: [
      { id: "a", accepted: ["hydrolysis"], wrong: "oxidation" },
      { id: "b", accepted: ["oxidation"], wrong: "solution" },
      { id: "c", accepted: ["carbonation", "carbonation-solution", "carbonation solution"], wrong: "hydrolysis" },
    ],
    explanation: "Hydrolysis (feldspar → clay), oxidation (iron → iron oxide), carbonation (limestone dissolved by carbonic acid).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of mass wasting to its description.",
    pairs: [
      ["Soil creep", "Very slow downhill movement shown by tilted posts"],
      ["Landslide", "A mass of rock and soil slides quickly along a slip plane"],
      ["Mudflow", "Saturated fine soil flows like a liquid"],
      ["Rockfall", "Rocks break off a cliff and fall freely, forming scree"],
    ],
    explanation: "Mass wasting types differ in speed and in how much water is involved.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: kopjes form mainly by wind erosion carving the granite into rounded boulders.",
    answer: false,
    feedbackFalse: "Correct: kopjes form by deep chemical weathering along joints, then removal of the loose regolith.",
    feedbackTrue: "Wind is not the main agent. Joints guide chemical weathering underground; the regolith is later washed away, exposing corestones.",
    explanation: "Kopjes are weathering landforms: joints, hydrolysis, corestones, stripping.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the formation of a kopje.",
    points: [
      "Granite has joints, some close together and some widely spaced",
      "Water seeps down joints and chemical weathering (hydrolysis) rots the granite underground",
      "Where joints are widely spaced, unweathered corestones remain within the regolith",
      "The regolith is washed away (stripped), leaving the corestones exposed as a pile of boulders",
    ],
    modelAnswer: "Granite is cut by joints. Water moves down them and hydrolysis rots the rock below the surface, forming a thick regolith. Where the joints are far apart, solid rounded corestones survive. Over a long time rain and rivers wash the loose regolith away, so the corestones are left standing as a kopje.",
    explanation: "Four stages in order.",
    hints: ["Start with the joints.", "Weathering happens underground first; what removes the loose material?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Explain **two** ways in which human activities can trigger landslides.",
    points: [
      "Deforestation / clearing vegetation",
      "Removes roots that bind the soil and increases water entering the slope",
      "Cutting roads or mines into the base of a slope (or building on slopes)",
      "Undercuts / steepens the slope or adds weight, so it becomes unstable",
    ],
    modelAnswer: "Clearing trees for fields or firewood removes roots that bind the soil and lets more rain soak in, so the slope becomes saturated and heavy. Cutting a road into the foot of a slope removes its support and steepens it, so the material above can slide.",
    explanation: "Each activity with how it reduces slope stability.",
    hints: ["Think about vegetation and about digging into slopes.", "Explain how each makes the slope less stable."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "With reference to a named area of Zimbabwe, explain the causes of a mass wasting disaster and evaluate methods of disaster risk management.",
    points: [
      "Named area and event, e.g. Chimanimani / Chipinge, Cyclone Idai, March 2019",
      "Physical cause: very heavy, prolonged rain saturated the soil, adding weight and reducing friction",
      "Physical cause: steep slopes and deep weathered regolith",
      "Human factors: settlements on steep slopes and in stream channels; clearing of vegetation",
      "Method: hazard mapping and land-use zoning / relocation, with a strength or limitation",
      "Method: afforestation, terracing, drainage, retaining walls or gabions, with a strength or limitation",
      "Method: early warning and education, with a strength or limitation",
      "Judgement on the most effective combination",
    ],
    levels: geographyLevels(8),
    modelAnswer: "In March 2019 Cyclone Idai brought extreme rain to Chimanimani and Chipinge in the Eastern Highlands. The steep slopes were covered by deep weathered regolith; once saturated, it became heavy and lost strength, so slopes failed in landslides and debris flows that swept boulders and mud through settlements. Homes built on steep slopes and along stream channels were most exposed, and clearing of vegetation had weakened some slopes. Hazard mapping and zoning keep new homes off unstable slopes and out of channels; this is the most effective long-term method but relocating people is costly and unpopular. Replanting trees, terracing, drains and gabions stabilise slopes but take time and money and may fail in extreme rain. Early warning linked to rainfall forecasts, with community education, can save lives cheaply, but only if people receive the warning and have somewhere safe to go. The best approach combines planning to reduce exposure with early warning for extreme events.",
    explanation: "Credit a named area, linked causes and an evaluation of several methods.",
    hints: ["Cyclone Idai is the best-known example.", "For each method, give a strength and a limitation."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Table 1 shows the temperature of a granite surface over 24 hours in a semi-arid area (fictional data).\n\n${TEMPS}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "By how much did the rock surface temperature rise between 06:00 and 14:00?", value: 38, unit: "°C", wrong: [56], explanation: "47 − 9 = 38 °C." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the mean of the six readings, to one decimal place.", value: 24.8, unit: "°C", tol: 0.05, answer: "24.8", wrong: [29.75], explanation: "(9 + 31 + 47 + 33 + 18 + 11) ÷ 6 = 149 ÷ 6 = 24.8 °C." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which weathering process do these figures most favour?", options: [
        ["Exfoliation", "Correct: a large daily range stresses the outer layers of rock."],
        ["Carbonation", "Carbonation attacks limestone with rainwater; temperature range is not the key."],
        ["Frost action", "The rock never falls below 0 °C."],
        ["Oxidation", "Oxidation needs water and oxygen, not a big temperature range."],
      ], answer: "A", explanation: "A daily range of 38 °C favours exfoliation." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how the temperature changes shown could cause the rock to break down.", points: [
        "By day the outer layer heats and expands more than the cooler rock beneath",
        "At night it cools and contracts",
        "Repeated stress makes curved outer layers crack and peel off (exfoliation)",
      ], modelAnswer: "By day the outer few centimetres heat to 47 °C and expand, while the rock inside stays cooler; at night the surface cools to about 9 °C and contracts. Repeated every day, this stress cracks the outer layers, which peel off in curved sheets.", explanation: "Expansion, contraction, repeated stress, peeling." }),
    ],
    hints: ["Find the maximum and minimum.", "Think about what heating and cooling do to rock."],
    explanation: "Practice in linking temperature data to physical weathering.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A Form 3 class measured the tilt of fence posts on a grassy slope at three sites (fictional data).\n\n| Site | Slope angle (°) | Mean tilt of posts downhill (°) | Vegetation |\n|---|---|---|---|\n| P | 6 | 2 | Thick grass |\n| Q | 13 | 7 | Patchy grass |\n| R | 21 | 15 | Mostly bare |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the type of mass wasting the tilted posts show.", accepted: ["soil creep", "creep"], wrong: ["landslide"], explanation: "Slow downhill movement tilts posts: soil creep." }),
      P.num({ label: "(b)", marks: 1, stem: "How many times greater is the tilt at R than at P?", value: 7.5, tol: 0.05, wrong: [13], explanation: "15 ÷ 2 = 7.5 times." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe the relationship between slope angle and tilt.", points: [
        "The steeper the slope, the greater the tilt (positive relationship)",
        "Uses figures, e.g. 6° slope with 2° tilt at P; 21° slope with 15° tilt at R",
      ], modelAnswer: "Tilt increases with slope angle: from 2° on the 6° slope at P to 15° on the 21° slope at R.", explanation: "Relationship plus data." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest how vegetation cover may also explain the results.", points: [
        "Thick grass at P binds the soil with roots, reducing movement",
        "Bare ground at R lets soil wet, dry and move more freely, so creep is faster",
      ], modelAnswer: "At P thick grass roots hold the soil together, so it creeps slowly; at R the ground is mostly bare, so wetting and drying move particles downhill more easily.", explanation: "Roots bind soil." }),
    ],
    hints: ["Which mass movement is very slow?", "Divide the larger tilt by the smaller."],
    explanation: "Practice in interpreting fieldwork data on soil creep.",
  });

  b.card("DEFINITION", "Weathering", "The breakdown of rock in its original place by physical, chemical or biological processes, without transport.");
  b.card("DEFINITION", "Mass wasting", "The downslope movement of soil and rock under gravity, e.g. soil creep, landslides, mudflows, rockfalls.");
  b.card("CONCEPT", "Exfoliation", "Outer layers of rock expand by day and contract at night (and are released from pressure), so curved sheets peel off. Common with a large daily temperature range.");
  b.card("CONCEPT", "Hydrolysis", "Chemical weathering in which water reacts with feldspar in granite to form clay, so the rock rots; quartz remains as sand.");
  b.card("CONCEPT", "Carbonation", "Rainwater absorbs carbon dioxide to form weak carbonic acid, which dissolves limestone and dolomite.");
  b.card("CONCEPT", "Formation of a kopje", "Joints guide deep chemical weathering underground; corestones survive where joints are wide apart; the regolith is stripped away, exposing a pile of boulders.");
  b.card("VOCABULARY", "Dwala (bornhardt)", "A large, bare, smooth granite dome with few joints, e.g. Domboshava.");
  b.card("VOCABULARY", "Stalactite and stalagmite", "Stalactite: calcite column hanging from a cave roof. Stalagmite: column growing up from the floor. Joined: a pillar.");
  b.card("FACT", "Mass wasting disaster in Zimbabwe", "Cyclone Idai (March 2019): heavy rain triggered landslides and debris flows in Chimanimani and Chipinge districts.");
  b.card("CONCEPT", "Reducing landslide risk", "Hazard mapping and zoning, replanting vegetation, drainage, terraces, retaining walls and gabions, early warning and education.");
});
