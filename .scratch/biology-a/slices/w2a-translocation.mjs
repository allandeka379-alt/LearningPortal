// W2a: translocation in the phloem.
import { concept, P, t, chk, table, dpStr, sfStr, rnd, mean } from "../lib.mjs";

concept("abio.plant-transport.translocation", { file: "plant-transport/translocation", keyPrefix: "plant-transport.translocation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which substance is the main sugar transported in the phloem?",
    options: [
      ["Sucrose", "Correct: a non-reducing disaccharide, little used on the way."],
      ["Glucose", "Glucose is made in photosynthesis but converted to sucrose for transport."],
      ["Starch", "Starch is insoluble and is a storage product, not transported."],
      ["Cellulose", "Cellulose is a structural polysaccharide in cell walls."],
    ],
    answer: "A",
    explanation: "**Sucrose** is soluble, non-reducing and relatively unreactive, so it is the main transported sugar.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In early spring, a sprouting potato tuber supplies sucrose to new shoots. What is the tuber acting as?",
    options: [
      ["A source", "Correct: it releases assimilates into the phloem."],
      ["A sink", "It was a sink when it was filling with starch, not when sprouting."],
      ["A companion cell", "A tuber is an organ, not a single cell type."],
      ["A xylem vessel", "Sucrose moves in the phloem; the tuber is not a vessel."],
    ],
    answer: "A",
    explanation: "A sprouting tuber breaks down starch to sucrose and releases it: a **source**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How does sucrose enter companion cells against its concentration gradient?",
    options: [
      ["By cotransport with hydrogen ions moving down their gradient", "Correct: proton pumps set up the H⁺ gradient using ATP."],
      ["By direct hydrolysis of ATP by a sucrose pump", "ATP powers the proton pump, not a sucrose pump."],
      ["By osmosis through the cell surface membrane", "Osmosis moves water, not sucrose."],
      ["By simple diffusion through the phospholipid bilayer", "Sucrose is too large and polar, and it moves against its gradient."],
    ],
    answer: "A",
    explanation: "Proton pumps move H⁺ out using ATP; H⁺ diffuses back through **sucrose-proton cotransporters**, carrying sucrose in.",
    hints: ["Which ion is pumped out using ATP?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "What causes the high hydrostatic pressure in sieve tubes near a source?",
    options: [
      ["Water entering by osmosis after sucrose is loaded", "Correct: loading lowers water potential, water follows, pressure rises."],
      ["Transpiration pulling water up the sieve tubes", "Transpiration creates tension in the xylem, not pressure in the phloem."],
      ["Contraction of the walls of the sieve tube elements", "Plant cells cannot contract their walls."],
      ["Root pressure pushing sap into the leaves", "Root pressure acts in the xylem and is small."],
    ],
    answer: "A",
    explanation: "Sucrose loading lowers ψ; water enters from the xylem by **osmosis**, raising hydrostatic pressure.",
    hints: ["Water potential, then osmosis."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A ring of bark was removed from a tree trunk, leaving the xylem intact. Which result would be expected after some weeks?",
    options: [
      ["Swelling above the ring, as sugars accumulate there", "Correct: phloem is removed, so assimilates moving down collect above the ring."],
      ["Wilting of the leaves above the ring", "The xylem is intact, so water still reaches the leaves."],
      ["Swelling below the ring, as water accumulates there", "Water is not blocked; sugars are blocked above the ring."],
      ["No change, because sugars travel in the xylem", "Sugars travel in the phloem, which is in the bark."],
    ],
    answer: "A",
    explanation: "Ringing removes the **phloem**; sucrose moving down from the leaves collects above the ring.",
    hints: ["Which tissue is in the bark?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Sap continues to flow from a cut aphid stylet inserted into a sieve tube for many hours. What does this show most directly?",
    options: [
      ["Phloem sap is under positive pressure", "Correct: sap is forced out without the aphid sucking."],
      ["Phloem sap is under tension", "Sap under tension would draw air in, not flow out."],
      ["Aphids actively pump sap from the sieve tubes", "The aphid's body has been removed; it cannot pump."],
      ["Sucrose diffuses rapidly out of sieve tubes", "Diffusion would not give a sustained flow of sap."],
    ],
    answer: "A",
    explanation: "Continued exudation shows the sap is under **positive hydrostatic pressure**, supporting mass flow.",
    hints: ["What forces the sap out when nothing sucks?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement correctly compares transport in xylem and phloem?",
    options: [
      ["Phloem can move substances up or down; xylem moves water upwards only", "Correct."],
      ["Xylem uses ATP to load water; phloem is passive", "The reverse: xylem transport is passive and phloem loading uses ATP."],
      ["Both move sap under positive pressure from transpiration", "Xylem sap is mainly under tension; phloem pressure comes from loading."],
      ["Xylem carries sucrose; phloem carries mineral ions", "Xylem carries water and ions; phloem carries assimilates."],
    ],
    answer: "A",
    explanation: "Phloem moves sap from **source to sink** in either direction; xylem moves water **upwards**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A developing seed is an example of a sink.",
    answer: true,
    explanation: "True. It takes assimilates from the phloem to store and grow.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the mass flow hypothesis, sucrose is removed from sieve tubes at the sink, so water leaves by osmosis and the hydrostatic pressure falls there.",
    answer: true,
    explanation: "True. This keeps a pressure gradient from source to sink.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Translocation is a passive process that uses no energy from the plant.",
    answer: false,
    explanation: "False. Companion cells use ATP to load sucrose; translocation is active.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each piece of evidence to what it shows.",
    pairs: [
      ["Sap flows from a cut aphid stylet", "Phloem sap is under pressure"],
      ["Swelling above a ring of removed bark", "Assimilates move in the phloem"],
      ["¹⁴C appears in sieve tubes after ¹⁴CO₂ is supplied to a leaf", "Products of photosynthesis are carried in the phloem"],
      ["Metabolic inhibitors stop translocation", "Loading needs ATP"],
    ],
    explanation: "Each technique tests a different part of the hypothesis.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Proton pumps use {{blank:a}} to move H⁺ out of companion cells. H⁺ returns through {{blank:b}} proteins, bringing sucrose in. Sucrose then passes into the sieve tube through {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["ATP"], choices: ["ATP", "light", "sucrose", "water"] },
      { id: "b", accepted: ["cotransporter"], choices: ["cotransporter", "channel", "receptor", "aquaporin"] },
      { id: "c", accepted: ["plasmodesmata"], choices: ["plasmodesmata", "pits", "stomata", "sieve plates"] },
    ],
    explanation: "ATP → H⁺ gradient → cotransport → plasmodesmata.",
    hints: ["Which proteins carry two substances together?"],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of cell, next to a sieve tube element, that loads sucrose into it.",
    accepted: ["companion cell", "companion cells", "the companion cell"],
    wrong: ["guard cell", "transfer cell only"],
    explanation: "**Companion cells** load sucrose using ATP.",
  });

  // Rate of translocation (different numbers from the lesson)
  const dist = 450, time = 36;
  const rate = dist / time;
  chk(rate, 12.5);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "¹⁴CO₂ was supplied to a leaf. Radioactivity was detected in the stem 450 mm away 36 minutes later. Calculate the rate of translocation in mm/min.",
    value: rate, unit: "mm/min", wrong: [rnd(time / dist, 2), 16200],
    explanation: t`Rate $= 450 \div 36 = 12.5$ mm/min. Dividing time by distance gives 0.08.`,
  });
  const d2 = 1.2; // m
  const tt = 90; // min
  const ms = (d2 * 1000) / (tt * 60);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "In a tracer experiment on a sugar cane stalk, labelled sucrose travelled 1.2 m in 90 minutes. Calculate the mean rate in mm/s, to three significant figures.",
    value: ms, unit: "mm/s", sf: 3, wrong: [sfStr(1.2 / 90, 3), sfStr(1200 / 90, 3)],
    explanation: t`1. Distance $= 1.2\ \text{m} = 1200$ mm.
2. Time $= 90 \times 60 = 5400$ s.
3. Rate $= 1200 \div 5400 = ${sfStr(ms, 3)}$ mm/s.
4. Forgetting to convert minutes to seconds gives ${sfStr(1200 / 90, 3)} (mm/min).`,
    hints: ["Convert metres to millimetres and minutes to seconds."],
  });

  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain how sucrose is moved from a photosynthesising leaf to a root by the mass flow hypothesis.",
    points: [
      "Companion cells pump H⁺ out using ATP (proton pumps)",
      "H⁺ diffuses back in with sucrose through cotransporter proteins (sucrose against its gradient)",
      "Sucrose passes into sieve tube elements through plasmodesmata",
      "Water potential of sieve tube falls; water enters from xylem by osmosis",
      "High hydrostatic pressure at source; at the sink (root) sucrose removed, water leaves, pressure lower",
      "Sap moves by mass flow down the hydrostatic pressure gradient from source to sink",
    ],
    modelAnswer: "In the leaf, companion cells use ATP to pump hydrogen ions out. The ions diffuse back in through cotransporter proteins, carrying sucrose with them against its concentration gradient. Sucrose then passes into the sieve tube elements through plasmodesmata. This lowers the water potential of the sieve tube sap, so water enters from the xylem by osmosis, raising the hydrostatic pressure. In the root, sucrose is removed for respiration or storage, so water leaves and the pressure is lower. Sap flows by mass flow down this pressure gradient from the leaf to the root.",
    explanation: "Loading, osmosis, pressure at source, unloading at sink, mass flow.",
    hints: ["Begin with ATP in the companion cell."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest three observations that are difficult to explain by the mass flow hypothesis alone.",
    points: [
      "Different solutes reported moving at different speeds",
      "Movement reported in opposite directions in the same region (vascular bundle) at the same time",
      "Sieve plates / phloem proteins would be expected to resist flow; their role not explained / rate faster than the pressure gradient predicts",
    ],
    modelAnswer: "Different solutes have been reported moving at different speeds, which mass flow would not predict; flow has been reported in opposite directions in the same bundle; and the sieve plates seem to offer resistance that the hypothesis does not explain.",
    explanation: "Mass flow predicts all solutes move together, in one direction, in a tube.",
    hints: ["What would mass flow predict about every solute in one tube?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why sucrose rather than glucose is the main sugar transported in the phloem.",
    points: [
      "Sucrose is non-reducing / less reactive, so it is not used or metabolised on the way",
      "It is soluble, so it can be carried in solution",
      "As a disaccharide it carries more energy per molecule / has less effect on water potential per unit of sugar carried",
    ],
    modelAnswer: "Sucrose is a soluble, non-reducing sugar, so it is carried in solution without being used up or reacting on the way, and as a disaccharide it carries more energy per molecule and has a smaller effect on water potential for the amount of sugar carried.",
    explanation: "Soluble, unreactive, efficient.",
    hints: ["Think about reactivity and solubility."],
  });

  // Practice structured: aphid stylet exudation
  const pos = [10, 30, 50, 70, 90];
  const vol = [[3.1, 2.9, 3.0], [2.4, 2.6, 2.5], [2.0, 1.9, 2.1], [1.4, 1.5, 1.3], [0.9, 1.1, 1.0]];
  const means = vol.map(mean);
  chk(rnd(means[0], 1), 3.0);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Aphid stylets were cut at different distances below a mature leaf on a bean stem, and the volume of sap exuded from each stylet in one hour was measured (three stylets at each distance).\n\n${table(["Distance below leaf / cm", "Stylet 1 / mm³", "Stylet 2 / mm³", "Stylet 3 / mm³"], pos.map((p, i) => [p, ...vol[i].map((x) => x.toFixed(1))]))}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the mean volume at 50 cm, in mm³, to one decimal place.", value: means[2], dp: 1, unit: "mm³", wrong: [6.0], explanation: t`$(2.0 + 1.9 + 2.1) \div 3 = 2.0\ \text{mm}^3$.` }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe the relationship between distance from the leaf and the volume of sap exuded.",
        points: ["Volume decreases as distance from the leaf increases", "Quote figures: mean about 3.0 mm³ at 10 cm falling to 1.0 mm³ at 90 cm"],
        modelAnswer: "The further from the leaf, the less sap is exuded: the mean falls from 3.0 mm³ at 10 cm to 1.0 mm³ at 90 cm, decreasing steadily.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how these results support the mass flow hypothesis.",
        points: ["Sap exudes because it is under (positive hydrostatic) pressure", "Pressure / rate of exudation is highest near the source (leaf)", "So there is a pressure gradient from source to sink, as mass flow requires"],
        modelAnswer: "Sap exudes without the aphid sucking, so it is under pressure. More sap exudes near the leaf, so the pressure is highest at the source and falls with distance, giving the pressure gradient from source to sink that mass flow needs.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest why aphid stylets are useful for sampling phloem sap.",
        points: ["Stylet enters a single sieve tube element", "Without damaging / blocking it (no callose seal), so sap flows naturally and is uncontaminated by other cells"],
        modelAnswer: "The stylet enters a single sieve tube element without damaging it enough to cause sealing, so pure phloem sap flows out naturally, uncontaminated by the contents of other cells.",
      }),
    ],
    explanation: "Exudation falls with distance from the source: a pressure gradient as mass flow predicts.",
    hints: ["Higher exudation means higher pressure."],
    calculator: true,
  });

  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "Rudo compared transport in the xylem and phloem of a groundnut plant.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which tissue transports amino acids from leaves to developing pods?",
        options: [["Phloem", "Correct: amino acids are assimilates."], ["Xylem", "Xylem carries water and mineral ions up from the roots."], ["Cortex", "The cortex is not a long-distance transport tissue."], ["Epidermis", "The epidermis protects; it does not transport."]],
        answer: "A", explanation: "Assimilates such as amino acids travel in the **phloem**.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Give four differences between transport in the xylem and transport in the phloem.",
        points: [
          "Xylem: water and mineral ions; phloem: sucrose and amino acids (assimilates)",
          "Xylem: upwards only; phloem: up or down (source to sink)",
          "Xylem: passive (transpiration pull, tension); phloem: active loading using ATP (positive pressure)",
          "Xylem: dead vessel elements; phloem: living sieve tube elements with companion cells",
        ],
        modelAnswer: "Xylem carries water and mineral ions, whereas phloem carries sucrose and amino acids. Xylem moves water upwards only; phloem moves sap from source to sink, up or down. Xylem transport is passive, driven by tension, while phloem transport needs ATP for loading and works under positive pressure. Xylem uses dead vessel elements; phloem uses living sieve tube elements supported by companion cells.",
      }),
      P.manual({
        label: "(c)", marks: 1, stem: "Explain why developing pods act as sinks.",
        points: ["They use or store sucrose/amino acids (respiration, growth, storage of oil/protein/starch), keeping their concentration low"],
        modelAnswer: "Developing seeds in the pods use sucrose and amino acids for growth and convert them to stored oil, protein and starch, so they keep removing assimilates from the phloem.",
      }),
    ],
    explanation: "Phloem carries assimilates from sources to sinks; xylem carries water and ions upwards.",
    hints: ["Compare substances, direction, mechanism and cells."],
  });

  b.card("DEFINITION", "Define **translocation**.", "Movement of assimilates (e.g. sucrose, amino acids) in the phloem from sources to sinks, using energy.");
  b.card("DEFINITION", "Source and sink", "Source: releases assimilates into phloem (e.g. a leaf). Sink: removes them for use or storage (e.g. root, fruit, growing bud).");
  b.card("CONCEPT", "Loading sucrose", "Proton pumps (ATP) move H⁺ out; H⁺ returns via sucrose-proton cotransporters, bringing sucrose in; sucrose passes to sieve tube via plasmodesmata.");
  b.card("CONCEPT", "Mass flow hypothesis", "Loading lowers ψ → water enters by osmosis → high pressure at source; unloading at sink lowers pressure → sap flows down the pressure gradient.");
  b.card("FACT", "Aphid stylet evidence", "Sap flows from a cut stylet: phloem sap is under positive pressure.");
  b.card("FACT", "Ringing evidence", "Removing a ring of bark (phloem) makes sugars accumulate above the ring: assimilates move in phloem.");
  b.card("FACT", "Why sucrose is transported", "Soluble, non-reducing (unreactive), carries more energy per molecule.");
  b.card("CONCEPT", "Xylem vs phloem: driving force", "Xylem: tension from transpiration (passive). Phloem: hydrostatic pressure from active loading.");
  b.card("FACT", "Evidence against simple mass flow", "Different solutes at different speeds; flow in opposite directions; sieve plates resist flow.");
});
