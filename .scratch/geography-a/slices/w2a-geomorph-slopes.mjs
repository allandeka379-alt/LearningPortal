// W2a: geomorph.slopes (ZIMSEC only). Numbers computed: L sin(theta), L cos(theta), mean gradient and angle, scarp retreat
// (see tables/w2a-geomorph-slopes.mjs for the lesson example).
import { concept, P, geographyLevels, chk, rnd, gradient } from "../lib.mjs";
import { mc, tbl } from "../tables/w2a-_q.mjs";

const rad = (d) => (d * Math.PI) / 180;
const vert = (L, deg) => L * Math.sin(rad(deg));
const horiz = (L, deg) => L * Math.cos(rad(deg));

// Struct 1: survey with 12 m sections
const ANG = [2, 9, 18, 18, 10, 5];
const SURVEY = tbl(["Section", "Angle (°)"], ANG.map((a, i) => [i + 1, a]));
const v3 = rnd(vert(12, 18), 2, 3.71, "v3");
const h3 = rnd(horiz(12, 18), 2, 11.41, "h3");
// Struct 2: models
const MODELTAB = tbl(["Site", "Time (million years)", "Maximum slope angle (°)", "Pediment width (km)"],
  [["P", 0, 38, 0.5], ["P", 5, 38, 1.4], ["P", 10, 37, 2.6], ["P", 15, 38, 3.9],
   ["Q", 0, 38, 0], ["Q", 5, 30, 0], ["Q", 10, 22, 0], ["Q", 15, 14, 0]]);

concept("ageo.geomorph.slopes", { file: "geomorph/slopes", keyPrefix: "geomorph.slopes" }, (b) => {
  mc(b, 1, "RECALL", "Which slope element is **convex**?", [
    ["Waxing slope", "Correct: the angle increases downslope, so the profile bulges outwards."],
    ["Waning slope", "A waning slope is concave: the angle decreases downslope."],
    ["Constant slope", "A constant slope is straight (rectilinear)."],
    ["Free face", "A free face is a steep cliff or bare rock face."],
  ], "The **waxing slope** is convex; the waning slope is concave.");
  mc(b, 2, "UNDERSTANDING", "What happens to the slope angle along a **waning** (concave) slope in the downslope direction?", [
    ["It decreases, so the profile becomes gentler", "Correct: concave slopes flatten towards the valley floor."],
    ["It increases, so the profile becomes steeper", "That describes a waxing slope."],
    ["It stays the same along the entire length", "That describes the constant slope."],
    ["It increases at first and then falls to zero suddenly", "That describes neither element."],
  ], "On a **waning slope** the angle decreases downslope; the lower part of the profile is concave.", { daily: true });
  mc(b, 2, "RECALL", "Which model of slope development states that a slope keeps the same angle while it retreats?", [
    ["Parallel retreat", "Correct: the model of King, with a pediment growing at the foot."],
    ["Slope decline", "In slope decline the whole slope becomes gentler."],
    ["Slope replacement", "In replacement a gentler lower slope grows at the expense of a steeper upper slope."],
    ["Peneplanation", "Peneplanation is the downwearing of land to a low plain."],
  ], "In **parallel retreat** the slope keeps its angle and moves back, leaving a pediment.");
  mc(b, 2, "RECALL", "What name is given to an isolated residual hill that stands above a pediplain, such as a dwala?", [
    ["An inselberg", "Correct: residual hills survive when the surrounding land is worn down."],
    ["A peneplain", "A peneplain is the low plain, not the hill."],
    ["A pediment", "A pediment is the gently sloping rock surface at a mountain foot."],
    ["A free face", "A free face is only the cliff element of a slope."],
  ], "An **inselberg** (island mountain) is a residual hill left by planation.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "How does a fall in base level affect the slopes beside a river?", [
    ["The river cuts down and the lower slope steepens", "Correct: renewed incision steepens the valley sides."],
    ["The river deposits material and the lower slope flattens", "Deposition follows a rise in base level."],
    ["The river stops flowing and the slopes are protected", "A change in base level does not stop the river."],
    ["The slopes become convex along their entire length", "Convexity is caused by creep, not by base level directly."],
  ], "A **fall in base level** lets the river cut down (incise), which steepens the lower slope and encourages mass movement.", { hints: ["A river erodes downwards towards its base level."] });
  mc(b, 3, "UNDERSTANDING", "Which sequence describes etchplanation?", [
    ["Deep chemical weathering, then stripping of the regolith", "Correct: the weathering front becomes the new surface."],
    ["Retreat of cliffs, then growth of a pediment at their foot", "That describes pediplanation."],
    ["Downwearing of all slopes to a low, nearly flat plain", "That describes peneplanation."],
    ["Uplift of a plateau, then deposition of thick alluvium", "That is not a model of planation."],
  ], "**Etchplanation**: deep weathering in the humid tropics, then removal of the weathered layer to expose the weathering front.", { hints: ["Remember 'etching' as weathering beneath the surface."] });
  mc(b, 4, "ANALYSIS", "A scarp keeps a maximum angle of about 36° over 12 million years while the pediment at its foot widens from 0.8 km to 4.1 km. Which model does this best support?", [
    ["Parallel retreat", "Correct: the angle is unchanged and the pediment grows, as King's model predicts."],
    ["Slope decline", "Decline would show the maximum angle falling over time."],
    ["Slope replacement", "Replacement would show a steep upper section shrinking as a gentler slope grows."],
    ["Peneplanation by downwearing", "Downwearing lowers and flattens all slopes, with no growth of a pediment."],
  ], "A constant angle plus a growing pediment is the signature of **parallel retreat**.", { hints: ["Does the maximum angle change?"] });

  b.tf({ d: 1, skill: "RECALL", stem: "A free face is a steep cliff or bare rock face on a slope.", answer: true,
    feedbackTrue: "Correct.", feedbackFalse: "Not so: a free face is the near-vertical element of a slope.",
    explanation: "A **free face** is a steep to vertical rock face, from which rock falls." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "In the model of slope decline, the maximum slope angle stays the same as time passes.", answer: false, hints: ["Think about what 'decline' means."],
    feedbackFalse: "Correct: in decline the whole slope becomes gentler, so the maximum angle falls.", feedbackTrue: "Not so: that is parallel retreat.",
    explanation: "In slope decline the maximum angle falls; in parallel retreat it stays constant." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [
      ["Slope decline", "The whole slope becomes gentler with time"],
      ["Parallel retreat", "A slope keeps its angle as it moves back"],
      ["Slope replacement", "A gentler lower slope grows at the expense of a steeper upper slope"],
      ["Pediplanation", "Scarp retreat and growth of pediments to form a pediplain"],
      ["Etchplanation", "Deep weathering followed by stripping of the weathered layer"],
    ], explanation: "These are the main ideas about how slopes and plains develop." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A convex slope element is the {{blank:a}} slope. Soil creep is the main process on the {{blank:b}} part of a slope, and the foot of a slope is usually {{blank:c}} in shape.",
    blanks: [
      { id: "a", accepted: ["waxing"], choices: ["waxing", "waning", "constant"] },
      { id: "b", accepted: ["convex upper"], choices: ["convex upper", "concave lower", "vertical"] },
      { id: "c", accepted: ["concave"], choices: ["concave", "convex", "vertical"] },
    ], explanation: "The waxing (convex) slope is the upper part, shaped by creep; the foot is concave, shaped by wash and deposition." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the instrument used to measure the angle of a slope in the field.",
    accepted: ["clinometer", "Abney level", "Abney clinometer", "abney"], explanation: "A **clinometer** (such as an Abney level) measures slope angle." });

  const vRise = chk(vert(8, 30), 4, 1e-9);
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "m", daily: true,
    stem: "A section of slope measured along the ground is 8 m long, and its angle is 30°. Calculate the vertical height gained along the section, in metres. (Vertical = length × sin θ.)",
    value: vRise, wrong: [6.93, 240],
    explanation: "Vertical = 8 × sin 30° = 8 × 0.5 = **4 m**. The value 6.93 uses cos θ (the horizontal distance)." });
  const meanAngle = rnd(gradient(18, 60).angleDeg, 1, 16.7, "meanAngle");
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "°",
    stem: "A surveyed profile has a total vertical height of 18 m and a total horizontal distance of 60 m. Calculate the mean angle of the slope, in degrees to 1 decimal place.",
    hints: ["Gradient = vertical ÷ horizontal.", "Angle = tan⁻¹(gradient)."],
    value: meanAngle, dp: 1, wrong: [30, 73.3],
    explanation: "1. Gradient = 18 ÷ 60 = 0.30.\n2. Angle = tan⁻¹(0.30) = **16.7°**.\n3. The value 30 is the gradient as a percentage; 73.3° is tan⁻¹(60 ÷ 18)." });
  const retreat = chk((0.9 * 30e6) / 1e6, 27);
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "km",
    stem: "An escarpment retreats at 0.9 mm per year (illustrative). Calculate how far it retreats in 30 million years, in km. (1 mm per year = 1 km per million years.)",
    hints: ["1 mm per year equals 1 km per million years."],
    value: retreat, wrong: [27000, 2.7],
    explanation: "0.9 km per million years × 30 million years = **27 km**. The value 27 000 forgets to convert from metres." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the lower part of many slopes is concave.",
    hints: ["Think about water volume and the deposition of fine material."],
    points: [
      "Water flowing downslope increases in volume and flows more, and is concentrated in thin sheets.",
      "Wash carries fine material from the upper slope and moves it downslope.",
      "As the gradient falls, the water loses energy and deposits fine material at the foot.",
      "Deposition builds up the foot and creates a gentle, concave profile (waning slope).",
    ],
    modelAnswer: "Water running downslope increases in volume and carries fine sediment from higher up. At the base of the slope, where the angle is low, the water slows and deposits its load. The build-up of fine material at the foot produces a gentle, concave profile.",
    explanation: "Wash and deposition build a concave waning slope." });
  b.manualShort({ d: 2, skill: "APPLICATION", marks: 3,
    stem: "Describe how you would measure the slope profile of a hillside in the field.",
    points: [
      "Mark a line from crest to foot with a tape and place ranging poles of equal height at breaks of slope or at regular intervals.",
      "Use a clinometer to read the angle between poles (of equal height) and measure the length of each section.",
      "Calculate vertical (L sin θ) and horizontal (L cos θ) distances and plot the profile.",
    ],
    modelAnswer: "Run a tape from the crest to the foot and set up ranging poles of the same height at breaks of slope. Use a clinometer to read the angle between each pair of poles and measure the length of each section. Calculate vertical and horizontal distances with sine and cosine and plot the profile.",
    explanation: "A field method needs equal-height poles, angle readings and calculations." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how pediplanation can produce a plain with isolated residual hills.",
    hints: ["Start with the retreat of the scarp."],
    points: [
      "Steep scarps retreat parallel to themselves by weathering and removal of debris.",
      "A gently sloping pediment develops and grows at the foot of the scarp as it retreats.",
      "Neighbouring pediments join to form a wide pediplain.",
      "Resistant remnants of the scarp are left standing as inselbergs (for example dwalas).",
    ],
    modelAnswer: "In pediplanation, steep scarps retreat parallel to themselves as weathering and wash remove material. A gentle pediment grows at the foot of each scarp, and neighbouring pediments join to form a pediplain. Resistant remnants of the old upland are left standing as inselbergs.",
    explanation: "Scarp retreat widens pediments and leaves inselbergs." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how etchplanation can expose an inselberg.",
    hints: ["Think about what is left when the weathered rock is removed."],
    points: [
      "Deep chemical weathering in the humid tropics rots the rock along joints, producing a thick regolith with unweathered cores.",
      "The regolith is later stripped away (for example by uplift and erosion or a change to a drier climate).",
      "The resistant, unweathered rock core is left standing above the new surface, as an inselberg.",
    ],
    modelAnswer: "Deep chemical weathering rots the rock along joints and leaves unweathered cores within thick regolith. When the regolith is stripped away by erosion after uplift or a climate change, the resistant cores stand out as inselbergs.",
    explanation: "Differential weathering, then stripping, exposes the cores." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain two ways in which rock type affects the form of a slope.",
    hints: ["Think about strong rocks and weak rocks, and about joints."],
    points: [
      "Resistant rocks (for example quartzite or massive granite) form steep slopes or cliffs because they are strong and weather slowly.",
      "Weak rocks (such as shale or deeply weathered rock) form gentle slopes because they crumble and are easily moved.",
      "Rocks with many joints let water in and weather faster, producing a thick regolith and more rounded slopes.",
      "Bedding that dips downslope encourages sliding and steep, straight slopes.",
    ],
    modelAnswer: "Resistant rocks such as massive granite or quartzite weather slowly and form steep slopes or cliffs, while weak rocks crumble and form gentle slopes. In addition, rocks with many joints let water in and weather quickly, so they have a thick regolith and rounder slopes.",
    explanation: "Rock strength and structure control slope steepness." });

  b.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: `A group surveyed a hillside in six sections, each 12 m long measured along the ground (illustrative data, invented for this exercise).\n\n${SURVEY}`,
    hints: ["Vertical = L sin θ; horizontal = L cos θ.", "A concave element is one where the angle decreases downslope."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the vertical height gained along section 3, in metres to 2 decimal places.", value: v3, dp: 2, unit: "m", wrong: [11.41, 216],
        explanation: "12 × sin 18° = 12 × 0.3090 = 3.71 m. The value 11.41 m uses the cosine." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the horizontal distance covered by section 3, in metres to 2 decimal places.", value: h3, dp: 2, unit: "m", wrong: [3.71, 216],
        explanation: "12 × cos 18° = 12 × 0.9511 = 11.41 m." }),
      P.mcq({ label: "(c)", stem: "Which slope elements are shown by sections 1 to 3?", options: [
        ["A waxing (convex) slope, steepening downslope", "Correct: the angles increase from 2° to 18°."],
        ["A waning (concave) slope, flattening downslope", "The angles increase, not decrease."],
        ["A free face, near vertical along its length", "The angles are far below vertical."],
        ["A constant slope, straight along its length", "The angle changes in each section."],
      ], answer: "A", explanation: "Angles of 2°, 9° and 18° increase downslope: convex." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the angle decreases over sections 5 and 6.",
        points: [
          "The slope is a waning (concave) element at the foot of the hill.",
          "Wash and slopewash deposit fine material there, because the gradient and the energy fall.",
          "Material accumulates and builds up a gentle profile towards the valley floor.",
        ],
        modelAnswer: "Sections 5 and 6 form the concave foot of the slope. Water carrying fine material slows as the gradient falls and deposits it there, so the material builds up and gives a gentle profile.",
        explanation: "Deposition makes the foot of a slope concave." }),
    ], explanation: "Calculate vertical and horizontal distances and interpret slope elements." });

  b.struct({ d: 5, skill: "EVALUATION", examStyle: true,
    stem: `A researcher monitored two escarpments in a semi-arid area over 15 million years, using dated surfaces (illustrative data, invented for this exercise).\n\n${MODELTAB}`,
    hints: ["Compare the maximum angle over time at each site.", "In (d) give evidence and a limitation for each model."],
    parts: [
      P.mcq({ label: "(a)", stem: "Which model of slope development best fits site P?", options: [
        ["Parallel retreat", "Correct: constant angle and a growing pediment."],
        ["Slope decline", "The angle does not fall at site P."],
        ["Slope replacement", "There is no sign of a gentler slope replacing a steeper one."],
        ["Etchplanation", "This is a model of deep weathering followed by stripping, not of angle change."],
      ], answer: "A", explanation: "At P the angle stays at about 38° and the pediment widens from 0.5 to 3.9 km." }),
      P.mcq({ label: "(b)", stem: "Which model best fits site Q?", options: [
        ["Slope decline", "Correct: the angle falls steadily from 38° to 14°."],
        ["Parallel retreat", "The angle does not remain constant at Q."],
        ["Pediplanation", "No pediment forms at Q."],
        ["Slope replacement", "There is no sign of a lower slope growing in a different shape."],
      ], answer: "A", explanation: "The maximum angle declines by about 8° every 5 million years." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain how parallel retreat produces a growing pediment.",
        points: [
          "Weathering and wash break down the face of the scarp, which retreats while keeping its angle.",
          "The debris is moved downslope over a gently sloping rock surface.",
          "The rock surface left behind by the retreating scarp is a gentle pediment.",
          "As the scarp continues to retreat, the pediment widens.",
        ],
        modelAnswer: "The scarp face is broken down by weathering and the debris is carried away over the gentle rock surface at its foot. Because the scarp retreats while keeping its angle, the surface left behind is a pediment, and it widens as the scarp retreats.",
        explanation: "Retreat of the scarp leaves a widening pediment." }),
      P.manual({ label: "(d)", marks: 6, stem: "Evaluate the usefulness of models of slope development in explaining the landscape of southern Africa.",
        points: [
          "Parallel retreat and pediplanation fit the widespread plateau surfaces and inselbergs in semi-arid and savanna areas.",
          "Etchplanation explains how deep weathering in the humid tropics could create inselbergs and the weathering front.",
          "Decline and peneplanation were developed in humid temperate lands and may fit rounded slopes in wetter areas.",
          "Models rely on long timescales, so they are difficult to test directly.",
          "Real landscapes record changes in climate, uplift and base level and show features of more than one model.",
          "Judgement: models are useful frameworks but need supporting evidence for each place.",
        ],
        modelAnswer: "Parallel retreat and pediplanation match the wide plateau surfaces and isolated hills (inselbergs) that are found across southern Africa, and etchplanation helps to explain how deeply weathered rock was stripped to expose dwalas. Decline and peneplanation were developed in humid temperate regions, so they fit rounded slopes in wetter areas better. All models are difficult to test because the timescales are so long, and real landscapes show the effects of changing climate and uplift. I conclude that the models are useful frameworks but each needs local evidence.",
        type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        explanation: "Match each model to its landscape and judge its limits." }),
    ], explanation: "Match data to models and evaluate them." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the relative importance of rock type, climate and base level in explaining the form of slopes.",
    hints: ["Say how each controls form, then compare.", "Reach a judgement."],
    points: [
      "Rock type controls strength: resistant rock forms steep slopes or cliffs, weak rock gentle slopes.",
      "Rock structure (joints, dip) influences weathering and the stability of slopes.",
      "Climate controls the processes: humid climates favour weathering and creep (convex, rounded slopes); drier ones favour wash and retreat (angular slopes).",
      "Vegetation, controlled by climate, protects slopes from wash.",
      "Base level controls how fast rivers cut down: a fall steepens the lower slope.",
      "Time and tectonic uplift also matter because slopes adjust slowly.",
      "Human activity can quickly change slopes, for example by cutting or clearing.",
      "Judgement: rock type often sets the maximum angle, climate sets the processes, and base level sets the rate of change, so none is sufficient alone.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Rock type is very important because resistant rock such as quartzite stands in steep slopes or cliffs, whereas weak rock forms gentle slopes, and joints decide how fast weathering happens. Climate controls the balance of processes: in humid areas weathering and creep produce rounded convex slopes, but in semi-arid areas wash and scarp retreat are more important. Base level controls how rapidly rivers cut down and therefore how quickly lower slopes steepen. Time and uplift also matter, and people can change slopes quickly. I conclude that rock type often sets the maximum angle, while climate and base level decide the processes and the rate of change, so all three must be considered together.",
    wordLimit: { max: 300 }, explanation: "Judge three controls on slope form." });

  b.card("DEFINITION", "Slope elements", "Waxing slope (convex), free face (cliff), constant slope (straight) and waning slope (concave).");
  b.card("CONCEPT", "Processes by slope element", "Creep on convex upper slopes; falls on free faces; mass movement and wash on straight slopes; wash and deposition on concave lower slopes.");
  b.card("FORMULA", "Slope survey calculations", "Vertical = L sin θ; horizontal = L cos θ; gradient = vertical ÷ horizontal; angle = tan⁻¹(gradient).");
  b.card("CONCEPT", "Slope decline (Davis)", "The whole slope becomes gentler as time passes; the maximum angle falls.");
  b.card("CONCEPT", "Parallel retreat (King)", "Slopes keep the same angle as they retreat; a pediment grows at the foot (pediplanation).");
  b.card("CONCEPT", "Slope replacement (Penck)", "A gentler lower slope grows at the expense of a steeper upper slope.");
  b.card("DEFINITION", "Pediplanation", "Scarp retreat and the growth of pediments until they join to form a pediplain, leaving residual inselbergs.");
  b.card("DEFINITION", "Etchplanation", "Deep chemical weathering in the humid tropics followed by stripping of the regolith, which exposes the weathering front as an etchplain.");
  b.card("DEFINITION", "Base level", "The lowest level to which a river can erode (normally sea level); a fall makes rivers cut down and steepens slopes.");
});
