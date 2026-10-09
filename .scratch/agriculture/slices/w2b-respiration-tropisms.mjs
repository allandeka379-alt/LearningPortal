// Slice W2b: respiration and tropisms (ZIMSEC only).
import { concept, P, t, pct, round, check, table, agricultureLevels } from "../lib.mjs";

// Vacuum flask data (numbers differ from the lesson).
const FLASK = [
  [0, 21.0, 21.0],
  [1, 23.0, 21.0],
  [2, 25.5, 21.5],
  [3, 28.0, 21.0],
  [4, 30.0, 21.0],
];
const FLASK_TABLE = table(["Day", "Flask P: soaked live maize grain (°C)", "Flask Q: boiled maize grain (°C)"], FLASK.map(([d, a, q]) => [d, a.toFixed(1), q.toFixed(1)]));
const riseP = round(FLASK[4][1] - FLASK[0][1], 1);
const perDay = riseP / 4;
check(riseP === 9 && perDay === 2.25, "flask rise");

// Stored grain mass loss.
const STORE0 = 500, STORE1 = 488;
const lossPct = pct(STORE0 - STORE1, STORE0);
check(lossPct === 2.4, "loss pct");

concept("agri.plants.respiration-tropisms", { file: "plants/respiration-tropisms", keyPrefix: "plants.respiration-tropisms" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What are the products of aerobic respiration?",
    options: [
      ["Carbon dioxide, water and energy", "Correct: glucose is broken down completely."],
      ["Glucose and oxygen", "These are the products of photosynthesis."],
      ["Ethanol, carbon dioxide and a little energy", "These are the products of anaerobic respiration in plants."],
      ["Starch and water", "Starch is a storage product, not a product of respiration."],
    ],
    answer: "A",
    explanation: "Glucose + oxygen → carbon dioxide + water + energy.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "In which part of a cell does aerobic respiration mainly take place?",
    options: [
      ["Mitochondria", "Correct: mitochondria release energy from glucose using oxygen."],
      ["Chloroplasts", "Chloroplasts carry out photosynthesis."],
      ["Vacuole", "The vacuole stores cell sap."],
      ["Cell wall", "The cell wall gives support; it is not a site of reactions."],
    ],
    answer: "A",
    explanation: "Aerobic respiration takes place in the mitochondria of all living cells.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does anaerobic respiration in maize roots in waterlogged soil produce?",
    options: [
      ["Ethanol and carbon dioxide", "Correct: plant cells make ethanol when oxygen is lacking."],
      ["Lactic acid only, as in the muscles of animals", "Lactic acid is made in animal muscle, not in plant cells."],
      ["Oxygen and glucose", "These are products of photosynthesis."],
      ["Carbon dioxide and water", "These are the products of aerobic respiration."],
    ],
    answer: "A",
    explanation: "Glucose → ethanol + carbon dioxide + a little energy; ethanol is toxic to the roots.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement correctly compares respiration with photosynthesis?",
    options: [
      ["Respiration goes on day and night; photosynthesis only in light", "Correct: respiration never stops in living cells."],
      ["Respiration needs chlorophyll; photosynthesis does not", "It is photosynthesis that needs chlorophyll."],
      ["Respiration builds up glucose; photosynthesis breaks it down", "This is the wrong way round."],
      ["Respiration happens only in the leaves, while photosynthesis happens in all living cells", "Respiration happens in all living cells; photosynthesis only in green cells."],
    ],
    answer: "A",
    explanation: "Respiration occurs continuously in every living cell; photosynthesis only in green cells in light.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "The shoot of a seedling lit from one side bends towards the light. What is this response called?",
    options: [
      ["Positive phototropism", "Correct: growth towards light."],
      ["Negative phototropism", "Negative means growth away from the stimulus."],
      ["Positive geotropism", "Geotropism is a response to gravity."],
      ["Positive hydrotropism", "Hydrotropism is a response to water."],
    ],
    answer: "A",
    explanation: "Shoots are positively phototropic: they grow towards light.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why should maize grain be dried before it is stored in bags?",
    options: [
      ["Damp grain respires faster, heats up and goes mouldy", "Correct: drying slows respiration and spoilage."],
      ["Dry grain photosynthesises more slowly, so it keeps its starch", "Stored grain does not photosynthesise."],
      ["Drying kills all the embryos, so the grain cannot germinate at all", "Proper drying does not kill the embryo; seed grain is dried too."],
      ["Damp grain is heavier, so the farmer is paid less for each bag that he sells", "Mass is not the biological reason for drying."],
    ],
    answer: "A",
    hints: ["Stored grain is alive. What process continues in it?"],
    explanation: "Respiration in damp grain uses stored food and releases heat and water, so moulds and insects thrive.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a klinostat experiment, germinating beans are pinned with their radicles horizontal. On the rotating klinostat the radicles keep growing horizontally. Why?",
    options: [
      ["Gravity acts equally on all sides of the root", "Correct: the rotation cancels the effect of gravity."],
      ["Rotation kills the root tips, so they cannot respond", "The roots keep growing, so the tips are alive."],
      ["Light reaching the roots from all sides stops them from growing downwards", "Roots respond to gravity here; light is not the factor tested."],
      ["The roots are too young to respond to any stimulus", "The stationary control shows the same roots respond."],
    ],
    answer: "A",
    hints: ["A tropism needs a stimulus from one direction."],
    explanation: "The rotating klinostat is the control showing that the downward curvature in the stationary set-up is caused by gravity.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A farmer's bean seed planted 15 cm deep in wet, compacted soil rots instead of germinating. Which explanation is best?",
    options: [
      ["Too little oxygen reached it for aerobic respiration", "Correct: deep wet compacted soil is short of oxygen."],
      ["Too much light reached the seed, so it photosynthesised instead of germinating", "There is no light at that depth, and seeds do not need it to germinate."],
      ["The seed respired too fast in the cold soil and used up all its oxygen within a day", "Cold slows respiration rather than speeding it up."],
      ["Germination needs ethanol, which cannot form in wet soil", "Ethanol is a toxic product of anaerobic respiration, not a need."],
    ],
    answer: "A",
    hints: ["What does a germinating seed need besides water and warmth?"],
    explanation: "Germinating seeds respire fast and need oxygen; in waterlogged, compacted soil they respire anaerobically, release little energy and rot.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Plant roots grow downwards because they are positively geotropic.",
    answer: true,
    explanation: "True. Roots grow towards gravity; shoots grow away from it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Plants stop respiring during the day because they are photosynthesising.",
    answer: false,
    explanation: "False. Respiration continues day and night; in daylight photosynthesis is usually faster, which hides it.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each tropism with its stimulus.",
    pairs: [
      ["Phototropism", "Light from one side"],
      ["Geotropism", "Gravity"],
      ["Hydrotropism", "Water"],
      ["Thigmotropism", "Touch or contact"],
    ],
    explanation: "Each tropism is named after its stimulus.",
  });
  b.fib({
    d: 2,
    stem: "Complete the balanced equation for aerobic respiration.",
    template: t`C₆H₁₂O₆ + {{blank:a}} O₂ → {{blank:b}} CO₂ + 6 H₂O + energy`,
    blanks: [
      { id: "a", accepted: ["6", "six"] },
      { id: "b", accepted: ["6", "six"] },
    ],
    explanation: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the apparatus that rotates seedlings slowly so that a stimulus acts equally on all sides.",
    accepted: ["klinostat", "clinostat", "a klinostat", "a clinostat"],
    explanation: "A **klinostat** is used as the control in tropism experiments.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `A bag of damp maize weighed ${STORE0} kg when stored and ${STORE1} kg some months later, with no grain removed. Calculate the loss as a percentage of the original mass.`,
    value: lossPct, unit: "%", tol: 0.05, wrong: [STORE0 - STORE1],
    explanation: `Loss = ${STORE0} − ${STORE1} = ${STORE0 - STORE1} kg. Percentage = ${STORE0 - STORE1} ÷ ${STORE0} × 100 = ${lossPct}%. Some of this is dry matter used in respiration and some is water lost by drying.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "State **four** differences between aerobic and anaerobic respiration in plants.",
    hints: ["Think of oxygen, products, energy and where it happens."],
    points: [
      "Aerobic uses oxygen; anaerobic does not.",
      "Aerobic produces carbon dioxide and water; anaerobic produces ethanol and carbon dioxide.",
      "Aerobic releases much energy; anaerobic releases little.",
      "Aerobic breaks glucose down completely (mainly in mitochondria); anaerobic incompletely (in the cytoplasm).",
    ],
    modelAnswer: "Aerobic respiration needs oxygen, gives carbon dioxide and water, releases a lot of energy and breaks glucose down completely in the mitochondria. Anaerobic respiration needs no oxygen, gives ethanol and carbon dioxide, releases little energy and is incomplete, in the cytoplasm.",
    explanation: "Each difference needs both sides.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe an experiment to show that roots are positively hydrotropic.",
    hints: ["Use moist material and gravity acting in a different direction."],
    points: [
      "Plant soaked seeds in moist sawdust in a sieve (wire mesh) hung at an angle.",
      "The radicles grow down through the mesh (gravity) into the dry air.",
      "They then curve back towards the moist sawdust, showing growth towards water.",
    ],
    modelAnswer: "Fill a sieve with moist sawdust, plant soaked seeds in it and hang it at an angle. The roots grow down through the mesh, then curve back up towards the moist sawdust, showing that they grow towards water.",
    explanation: "Set-up, observation and conclusion.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Thandeka put soaked live maize grain in vacuum flask P and boiled maize grain in flask Q. Both lots were rinsed in a weak disinfectant. She recorded the temperatures daily.\n\n${FLASK_TABLE}`,
    hints: ["Rise = final − starting temperature.", "What process releases heat in living cells?"],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the rise in temperature in flask P over the four days, in °C.",
        value: riseP, unit: "°C", tol: 0.05, wrong: [FLASK[4][1]],
        explanation: `${FLASK[4][1].toFixed(1)} − ${FLASK[0][1].toFixed(1)} = ${riseP.toFixed(1)} °C.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the mean rise per day in flask P, to two decimal places.",
        value: perDay, unit: "°C", tol: 0.005, wrong: [round(riseP / 5, 2)],
        explanation: `${riseP.toFixed(1)} ÷ 4 = ${perDay.toFixed(2)} °C per day (4 days, not 5 readings).`,
      }),
      P.short({
        label: "(c)", stem: "Name the process in the grain that caused the rise in temperature.",
        accepted: ["respiration", "aerobic respiration", "respiring"],
        explanation: "Respiration releases energy, some as heat.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why flask Q was set up.",
        points: ["It is a control.", "To show that the heat came from living (respiring) grain, not from the surroundings."],
        explanation: "Boiled grain cannot respire.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Explain why the grain was rinsed in disinfectant.",
        points: ["To kill bacteria / fungi, so that heat from their respiration is not measured."],
        explanation: "Microbes also respire.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Use this result to explain why farmers dry grain before storing it.",
        points: ["Damp grain respires (faster), producing heat (and moisture).", "Heat and moisture encourage moulds / insects and the grain loses dry matter and quality."],
        explanation: "Drying slows respiration in store.",
      }),
    ],
    explanation: "Living grain releases heat by respiration; the control and disinfectant make the test fair.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "Nyasha placed one tray of bean seedlings in a box with a narrow slit on one side facing a window, and a second tray in an identical box with an open top, lit evenly from above. After four days the seedlings in the first box had bent towards the slit.",
    hints: ["Which tray is the control?", "Think about how the response helps the crop."],
    parts: [
      P.short({ label: "(a)", stem: "Name the response shown by the seedlings in the first box.", accepted: ["phototropism", "positive phototropism"], explanation: "Growth towards light is positive phototropism." }),
      P.short({
        label: "(b)", stem: "State the purpose of the second tray.",
        accepted: ["control", "as a control", "for comparison"],
        keywords: { any: ["control", "compar"] },
        explanation: "The evenly lit tray is the control.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain how the shoots bend towards the light.",
        points: ["A growth substance (auxin) collects on the shaded side of the shoot.", "Cells on the shaded side grow longer than those on the lit side, so the shoot bends towards the light."],
        explanation: "Unequal growth causes bending.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain **two** ways in which tropisms help a crop to establish in the field.",
        points: ["Roots grow down (positive geotropism) whatever the position of the seed, anchoring the plant and reaching water.", "Shoots grow up / towards light (negative geotropism, positive phototropism), so leaves reach light for photosynthesis."],
        explanation: "Link each tropism to a benefit.",
      }),
    ],
    explanation: "Phototropism is shown with a one-sided light and a control; tropisms help crops establish.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Compare photosynthesis and respiration in a maize crop, and explain why a crop only grows when photosynthesis is greater than respiration.",
    hints: ["Give matching pairs of differences.", "Think about dry mass gained and lost over 24 hours."],
    points: [
      "Photosynthesis builds up glucose and stores energy; respiration breaks down glucose and releases energy.",
      "Photosynthesis uses carbon dioxide and water and releases oxygen; respiration uses oxygen and releases carbon dioxide and water.",
      "Photosynthesis needs light and chlorophyll and occurs only in green cells; respiration occurs in all living cells.",
      "Photosynthesis occurs only in light; respiration occurs day and night.",
      "Photosynthesis increases dry mass; respiration decreases it.",
      "Growth (gain in dry mass) needs more glucose made by day than used by respiration over the whole day and night; shading, drought or pests that cut photosynthesis can stop growth.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Photosynthesis builds glucose from carbon dioxide and water, using light absorbed by chlorophyll, and gives out oxygen; it happens only in green cells in the light and increases the dry mass of the crop. Respiration breaks glucose down with oxygen to carbon dioxide and water, releasing energy; it happens in every living cell, day and night, and reduces dry mass. The maize plant gains mass only if, over 24 hours, it makes more glucose by photosynthesis than it uses in respiration. If the crop is shaded by weeds, short of water so its stomata close, or losing leaves to pests, photosynthesis may fall close to the rate of respiration and growth stops.",
    explanation: "Matched comparisons plus the balance between the two processes.",
  });

  b.card("FORMULA", "Aerobic respiration equation", t`$\ce{C6H12O6 + 6O2 -> 6CO2 + 6H2O}$ + energy`);
  b.card("CONCEPT", "Anaerobic respiration in plants", "Glucose → ethanol + carbon dioxide + a little energy (waterlogged roots, damp stores).");
  b.card("FACT", "Where does aerobic respiration happen?", "In the mitochondria of every living cell.");
  b.card("CONCEPT", "Respiration vs photosynthesis", "Respiration: breaks down glucose, uses O₂, all cells, day and night. Photosynthesis: makes glucose, uses CO₂, green cells, light only.");
  b.card("CONCEPT", "Why dry grain before storage?", "Damp grain respires faster, loses dry matter and heats up, encouraging moulds and insects.");
  b.card("DEFINITION", "Tropism", "A growth response of a plant part to a stimulus from one direction; towards = positive, away = negative.");
  b.card("CONCEPT", "Shoot and root responses", "Shoots: positive phototropism, negative geotropism. Roots: positive geotropism, positive hydrotropism.");
  b.card("FACT", "What is a klinostat used for?", "Rotating seedlings so a stimulus (gravity or light) acts equally on all sides: the control in tropism experiments.");
  b.card("FACT", "Which tropism do tendrils show?", "Thigmotropism (response to touch).");
});
