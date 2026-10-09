// Slice W2b: translocation and food storage organs.
import { concept, P, pct, round, check, table, agricultureLevels } from "../lib.mjs";

// Fictional laboratory sample for a percentage item.
const TUBER_G = 250, STARCH_G = 45;
const starchPct = pct(STARCH_G, TUBER_G);
check(starchPct === 18, "starch pct");

// Ring-barking measurements (stem diameter, mm) for a structured item.
const RING = [
  ["Just above the ring", 24, 31],
  ["Just below the ring", 24, 24],
  ["Unringed branch (same height)", 24, 26],
];
const RING_TABLE = table(["Position", "Diameter at start (mm)", "Diameter after 8 weeks (mm)"], RING);
const aboveIncrease = 31 - 24;
const abovePct = pct(aboveIncrease, 24);
check(aboveIncrease === 7 && Math.abs(abovePct - 29.1667) < 1e-3, "ring");

concept("agri.plants.translocation-storage", { file: "plants/translocation-storage", keyPrefix: "plants.translocation-storage" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which tissue carries food made in the leaves to the roots and fruits?",
    options: [
      ["Phloem", "Correct: translocation takes place in the phloem."],
      ["Xylem", "Xylem carries water and mineral salts upwards."],
      ["Cortex", "The cortex stores food in some roots but does not transport it through the plant."],
      ["Epidermis", "The epidermis protects the organ; it does not transport food."],
    ],
    answer: "A",
    explanation: "Translocation is the movement of dissolved food in the phloem.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which form is most sugar carried in the phloem?",
    options: [
      ["Sucrose", "Correct: glucose is converted to sucrose for transport."],
      ["Starch", "Starch is insoluble and is a storage form, not a transport form."],
      ["Cellulose", "Cellulose forms cell walls and is not transported."],
      ["Oil", "Oils are made and stored in seeds; they are not the transport form."],
    ],
    answer: "A",
    explanation: "Sucrose (with amino acids) is the main substance translocated in the phloem.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which crop stores food in a **stem tuber**?",
    options: [
      ["Irish potato", "Correct: its eyes are buds on a swollen stem."],
      ["Sweet potato", "Sweet potato is a root tuber."],
      ["Carrot", "Carrot is a swollen tap root."],
      ["Onion", "Onion is a bulb of fleshy leaf bases."],
    ],
    answer: "A",
    explanation: "Irish potato and yam are stem tubers; sweet potato and cassava are root tubers.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the main food stored in groundnut kernels?",
    options: [
      ["Oil", "Correct: groundnuts are an oilseed (they also store protein)."],
      ["Starch only", "Groundnuts store little starch compared with cereals."],
      ["Sucrose", "Sucrose is the store of sugar cane."],
      ["Cellulose", "Cellulose is a structural material, not the main store."],
    ],
    explanation: "Groundnuts, soya beans and sunflower store oil and protein in the seed.",
    answer: "A",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A ring of bark is removed from the main trunk of a young tree. Why do its leaves **not** wilt during the following weeks?",
    options: [
      ["The xylem is left, so water still rises", "Correct: only the phloem in the bark is cut."],
      ["The phloem now carries water up to the leaves instead of food", "Phloem carries food, and it has been removed at the ring."],
      ["The leaves stop transpiring once the bark is cut", "Transpiration continues normally."],
      ["The roots store enough water for several weeks", "Water still travels from the soil in the xylem; root storage is not the reason."],
    ],
    answer: "A",
    hints: ["Which tissue lies in the bark and which in the wood?"],
    explanation: "Ring-barking removes the phloem but leaves the xylem, so water supply continues while the roots slowly starve.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A swollen underground organ has buds in shallow pits on its surface. What is it most likely to be?",
    options: [
      ["A stem tuber", "Correct: buds at nodes show that it is a stem."],
      ["A root tuber", "Root tubers have no buds at nodes."],
      ["A tap root", "A tap root has no buds on its surface."],
      ["A bulb", "A bulb has fleshy leaf bases around a central bud."],
    ],
    answer: "A",
    hints: ["Which plant organs carry buds?"],
    explanation: "Buds (eyes) mean a stem; this describes a stem tuber such as an Irish potato.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "When a seed potato sprouts in the soil, in which direction does food move in its phloem, and why?",
    options: [
      ["Up from the tuber (a source) to the shoots (a sink)", "Correct: a storage organ becomes a source when it feeds new growth."],
      ["Downwards from the shoots to the tuber, because leaves are always the source", "New shoots have little leaf area yet; they draw on the tuber."],
      ["Upwards in the xylem, because food always moves with water in a plant", "Food is translocated in the phloem, not the xylem."],
      ["It does not move, because food moves only in mature plants", "Food moves from the tuber to supply the sprouts."],
    ],
    answer: "A",
    hints: ["Which part is supplying food and which is using it?"],
    explanation: "Translocation runs from source to sink in either direction; a sprouting tuber is a source.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Sugar cane stores sucrose in its stem.",
    answer: true,
    explanation: "True. Sugar mills crush the cane stems to extract the sucrose.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Food in the phloem can only move downwards, from the leaves to the roots.",
    answer: false,
    explanation: "False. Phloem carries food up or down, from any source to any sink (for example up to developing fruits).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each crop with its storage organ.",
    pairs: [
      ["Onion", "Bulb"],
      ["Cassava", "Root tuber"],
      ["Carrot", "Tap root"],
      ["Taro (madumbe)", "Corm"],
      ["Ginger", "Rhizome"],
    ],
    explanation: "Onion bulb, cassava root tuber, carrot tap root, taro corm, ginger rhizome.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each crop with the main food it stores in the part harvested.",
    pairs: [
      ["Sugar cane stem", "Sucrose"],
      ["Cassava root", "Starch"],
      ["Soya bean seed", "Oil and protein"],
      ["Avocado fruit", "Oil"],
    ],
    explanation: "Stores are starch, sugars, oils or proteins depending on the crop.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "The movement of food in a plant is called {{blank:a}}. A part that supplies food, such as a leaf, is a {{blank:b}}, and a part that receives food, such as a growing fruit, is a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["translocation"] },
      { id: "b", accepted: ["source"] },
      { id: "c", accepted: ["sink"] },
    ],
    explanation: "Translocation moves food from sources to sinks.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the tissue that is removed when a ring of bark is cut from a tree trunk.",
    accepted: ["phloem", "the phloem", "phloem tissue"],
    rejected: ["xylem"],
    explanation: "The bark contains the **phloem**; the xylem (wood) is left.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `In a laboratory test, a ${TUBER_G} g sample of a tuber was found to contain ${STARCH_G} g of starch. Calculate the percentage of starch in the sample.`,
    value: starchPct, unit: "%", wrong: [round(pct(TUBER_G, STARCH_G), 0)],
    explanation: `${STARCH_G} ÷ ${TUBER_G} × 100 = ${starchPct}%. Dividing the tuber mass by the starch mass gives the fraction upside down.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the ring-barking experiment and state what it shows.",
    hints: ["What is removed, what is seen above and below the ring, and the conclusion."],
    points: [
      "A complete ring of bark is removed from a woody stem (removing the phloem, not the xylem).",
      "After some weeks the stem swells above the ring.",
      "Below the ring there is no swelling / the roots eventually starve and the plant dies, but leaves do not wilt at first.",
      "Conclusion: food moves down the stem in the phloem (bark).",
    ],
    modelAnswer: "A ring of bark, which contains the phloem, is cut from a woody stem, leaving the xylem. After some weeks the stem above the ring swells, because food from the leaves collects there, while below the ring there is no swelling and the roots slowly starve. The leaves do not wilt because water still rises in the xylem. This shows that food is carried down in the phloem.",
    explanation: "Method, observations and conclusion.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why plants store food as starch rather than as glucose.",
    hints: ["Think about solubility and osmosis."],
    points: [
      "Starch is insoluble.",
      "So it does not affect osmosis / water movement in the storage cells.",
      "Starch is compact / large molecules pack closely.",
      "So much food is stored in a small space (and it does not diffuse out of the cells).",
    ],
    modelAnswer: "Starch is insoluble, so it does not draw water into the storage cells by osmosis. It is also compact and cannot diffuse out of the cells, so a large amount of food is stored in little space.",
    explanation: "Two properties, each with a consequence.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Form 3 pupils removed a ring of bark from one branch of a guava tree and measured the branch diameter above and below the ring, and on an unringed branch.\n\n${RING_TABLE}`,
    hints: ["Increase = final − start.", "What does the bark contain?"],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the increase in diameter just above the ring, in mm.",
        value: aboveIncrease, unit: "mm", wrong: [31],
        explanation: `31 − 24 = ${aboveIncrease} mm.`,
      }),
      P.num({
        label: "(b)", stem: "Express this increase as a percentage of the starting diameter, to one decimal place.",
        value: abovePct, unit: "%", tol: 0.05, wrong: [round(pct(aboveIncrease, 31), 1)],
        explanation: `${aboveIncrease} ÷ 24 × 100 = ${round(abovePct, 1)}%.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the branch swelled above the ring but not below it.",
        points: ["Food (sugar) moving down in the phloem cannot pass the ring, where the phloem has been removed.", "Food collects above the ring and is used for extra growth there; none reaches the part below."],
        explanation: "Blocked translocation.",
      }),
      P.short({
        label: "(d)", stem: "State the purpose of measuring the unringed branch.",
        accepted: ["control", "as a control", "for comparison", "to act as a control", "comparison"],
        keywords: { any: ["control", "compar"] },
        explanation: "It is the control, showing normal growth.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Predict what would happen to the whole tree if the ring had been cut around the main trunk, and explain your prediction.",
        points: [
          "The roots would receive no food from the leaves.",
          "The roots would starve / stop respiring / die.",
          "So the roots would stop absorbing water and the whole tree would die (although the leaves would not wilt at first, as the xylem is intact).",
        ],
        explanation: "Ring-barking the trunk kills the tree slowly.",
      }),
    ],
    explanation: "Removing phloem stops food moving down: swelling above, starvation below.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "Sipho has three crops in his garden: Irish potatoes, sweet potatoes and onions. He wants to grow more of each next season from his own harvest.",
    hints: ["Stems carry buds; roots do not.", "Which part is used to plant each crop?"],
    parts: [
      P.short({ label: "(a)", stem: "Name the type of storage organ of the onion.", accepted: ["bulb", "a bulb"], explanation: "The onion is a bulb of fleshy leaf bases." }),
      P.short({ label: "(b)", stem: "Name the type of storage organ of the sweet potato.", accepted: ["root tuber", "a root tuber", "swollen root", "tuberous root", "root"], explanation: "Sweet potato is a root tuber." }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why Irish potatoes are planted as whole tubers but sweet potatoes are usually planted as vine cuttings.",
        points: ["The Irish potato tuber is a stem with buds (eyes) that sprout into new shoots.", "Sweet potato roots have no organised buds at nodes, so stem (vine) cuttings with nodes are used to grow new plants."],
        explanation: "Stems have nodes and buds; roots do not.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State **two** reasons why storage organs are useful to farmers.",
        points: ["They are the harvested food or cash product.", "They are used as planting material / they let the crop survive the dry season and regrow."],
        explanation: "Product and planting material.",
      }),
    ],
    explanation: "Identify storage organs and link their structure to propagation.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Goats on a smallholding near Masvingo have stripped a ring of bark from several young fruit trees. Discuss the likely effects on the trees and what the farmer should do.",
    hints: ["What happens to the roots?", "Consider immediate and long-term effects, then practical action."],
    points: [
      "The phloem is removed, so food from the leaves cannot reach the roots.",
      "Leaves stay green at first because the xylem still carries water.",
      "The roots slowly starve and die, then water uptake fails and the tree dies.",
      "Above the ring the bark may swell / fruits on the tree may enlarge temporarily.",
      "Action: protect trees with fencing or tree guards and keep goats out of the orchard; bridge-grafting or wrapping a fresh wound may save a valuable tree.",
      "Judgement: a complete ring will probably kill the trees, so prevention (fencing/tree guards) matters most; a partial ring may heal.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Stripping a complete ring of bark removes the phloem, so food made in the leaves can no longer travel down to the roots. At first the trees look healthy: the xylem is intact, so the leaves get water and stay green, and the bark above the wound may swell. Over the following weeks or months the roots starve, stop absorbing water and die, and then the whole tree dies. A tree with only a partial ring may survive as the phloem on the uncut side still carries food. The farmer should fence the orchard or fit tree guards and keep goats out; skilled bridge-grafting can sometimes save a valuable tree. Since a complete ring is usually fatal, prevention is the key.",
    explanation: "Apply ring-barking to a real farm problem and judge the remedy.",
  });

  b.card("DEFINITION", "Translocation", "Movement of dissolved food (sucrose, amino acids) in the phloem from sources to sinks.");
  b.card("CONCEPT", "Source and sink", "Source: supplies food (leaf, sprouting tuber). Sink: receives food (growing tip, fruit, seed, root, tuber).");
  b.card("CONCEPT", "Ring-barking results", "Bark (phloem) removed: swelling above the ring, roots starve, plant dies later; leaves do not wilt at first (xylem intact).");
  b.card("FACT", "Stem tubers", "Irish potato and yam (they have buds called eyes).");
  b.card("FACT", "Root tubers", "Sweet potato and cassava.");
  b.card("FACT", "Bulb and corm examples", "Bulb: onion, garlic. Corm: taro (madumbe).");
  b.card("FACT", "Which crops store mainly oil?", "Groundnut, soya bean, sunflower (seeds) and avocado (fruit).");
  b.card("CONCEPT", "Why store starch, not glucose?", "Starch is insoluble (no effect on osmosis) and compact.");
  b.card("FACT", "What does sugar cane store in its stem?", "Sucrose.");
});
