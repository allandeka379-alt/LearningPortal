// W3a: the Calvin cycle and C4 plants (C4 = ZIMSEC detail).
import { concept, P, t, chk, table, ZIM } from "../lib.mjs";

concept("abio.photosynthesis.calvin-c4", { file: "photosynthesis/calvin-c4", keyPrefix: "photosynthesis.calvin-c4" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which enzyme catalyses the fixation of carbon dioxide in the Calvin cycle?",
    options: [
      ["Rubisco", "Correct: ribulose bisphosphate carboxylase/oxygenase."],
      ["ATP synthase", "ATP synthase makes ATP on the thylakoid membrane."],
      ["NADP reductase", "This reduces NADP in the light-dependent stage."],
      ["Carbonic anhydrase", "This converts CO₂ and water to hydrogencarbonate, mainly in red blood cells."],
    ],
    answer: "A",
    explanation: "**Rubisco** fixes CO₂ with RuBP.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What is formed when one molecule of carbon dioxide combines with one molecule of RuBP?",
    options: [
      ["Two molecules of glycerate 3-phosphate", "Correct: the unstable 6C compound splits into two GP."],
      ["One molecule of triose phosphate", "TP is formed later, by reduction of GP."],
      ["Two molecules of pyruvate", "Pyruvate is the end product of glycolysis."],
      ["One molecule of a six-carbon sugar such as glucose", "A hexose needs six turns of the cycle."],
    ],
    answer: "A",
    explanation: "RuBP (5C) + CO₂ → **2 GP** (3C).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which products of the light-dependent stage are used to reduce GP to triose phosphate?",
    options: [
      ["ATP and reduced NADP", "Correct: energy and hydrogen."],
      ["ATP and oxygen", "Oxygen is a waste product, not used in the Calvin cycle."],
      ["Reduced NAD and ATP", "NAD is the respiratory coenzyme; photosynthesis uses NADP."],
      ["Oxygen and reduced NADP", "Oxygen is not used to reduce GP."],
    ],
    answer: "A",
    explanation: "GP → TP uses **ATP** and **reduced NADP**.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A plant in bright light is suddenly placed in the dark. What happens to the concentrations of GP and RuBP in its chloroplasts during the next minute?",
    options: [
      ["GP rises and RuBP falls", "Correct: GP is not reduced and RuBP is not regenerated."],
      ["GP falls and RuBP rises", "This is the effect of lowering CO₂."],
      ["Both rise", "RuBP is still used in fixation but not replaced."],
      ["Both fall", "GP is still made from RuBP but no longer used."],
    ],
    answer: "A",
    explanation: "No ATP or reduced NADP: **GP accumulates**, **RuBP is used up**.",
    hints: ["Which step needs the products of the light-dependent stage?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The carbon dioxide concentration around an illuminated leaf is lowered sharply. Which change follows in the chloroplasts?",
    options: [
      ["RuBP rises and GP falls", "Correct: less fixation, regeneration continues."],
      ["RuBP falls and GP rises", "This is the effect of darkness."],
      ["Both RuBP and GP rise", "GP is still reduced to TP but made more slowly."],
      ["ATP and reduced NADP fall", "They accumulate because they are used less."],
    ],
    answer: "A",
    explanation: "Less CO₂ → less RuBP used and less GP made; **RuBP rises, GP falls**.",
    hints: ["Which reaction uses CO₂?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does most of the triose phosphate made in the Calvin cycle not leave the cycle?",
    options: [
      ["It is needed to regenerate RuBP so that fixation can continue", "Correct: five of every six TP are recycled."],
      ["It is unstable and breaks down into carbon dioxide", "TP is stable enough to be used."],
      ["It cannot cross the chloroplast envelope", "TP is exported to the cytoplasm to make sucrose."],
      ["It is converted into GP to make amino acids", "GP comes from fixation, not from TP."],
    ],
    answer: "A",
    explanation: "Without RuBP regeneration the cycle would stop.",
    hints: ["Where does the CO₂ acceptor come from?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "In a C4 plant such as maize, which enzyme first fixes carbon dioxide in the mesophyll cells?",
    options: [
      ["PEP carboxylase", "Correct: it fixes CO₂ with PEP to form oxaloacetate."],
      ["Rubisco", "In C4 plants rubisco is in the bundle sheath cells."],
      ["Pyruvate decarboxylase", "This is an enzyme of ethanol fermentation."],
      ["Malate dehydrogenase", "Malate is formed after the first fixation step."],
    ],
    answer: "A",
    explanation: "**PEP carboxylase** in the mesophyll forms oxaloacetate (4C).",
    hints: ["C4 plants are named after a 4C first product."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: "Why does photorespiration in maize stay low even in hot, bright conditions?",
    options: [
      ["Malate supplies rubisco with a high CO₂ concentration", "Correct: rubisco rarely meets oxygen."],
      ["Maize rubisco cannot bind oxygen under any conditions", "Rubisco can still bind oxygen; it is protected by high CO₂."],
      ["The stomata of maize stay fully open at high temperatures", "Stomata may partly close; C4 fixation compensates."],
      ["PEP carboxylase converts oxygen into carbon dioxide", "PEP carboxylase does not react with oxygen at all."],
    ],
    answer: "A",
    explanation: "C4 plants **concentrate CO₂** around rubisco in bundle sheath cells.",
    hints: ["Where is rubisco in a C4 leaf?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The direct product of the Calvin cycle used to make sugars is triose phosphate, not glucose.",
    answer: true,
    explanation: "True. Two TP are combined to make a hexose.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The Calvin cycle normally runs only in the dark.",
    answer: false,
    explanation: "False. It is light-independent but runs in the light, using ATP and reduced NADP made in the light.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each compound to its description.",
    pairs: [
      ["RuBP", "5C acceptor of CO₂ in the Calvin cycle"],
      ["GP", "3C product of carbon fixation"],
      ["Triose phosphate", "3C product of reduction, used to make hexoses"],
      ["Sucrose", "Disaccharide made from hexoses for transport in phloem"],
    ],
    explanation: "RuBP → GP → TP → sugars.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In the Calvin cycle, GP is {{blank:a}} to triose phosphate. Five of every six triose phosphates are used to {{blank:b}} RuBP, which uses {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["reduced"], choices: ["reduced", "oxidised", "hydrolysed"] },
      { id: "b", accepted: ["regenerate"], choices: ["regenerate", "fix", "decarboxylate"] },
      { id: "c", accepted: ["ATP"], choices: ["ATP", "reduced NADP", "oxygen"] },
    ],
    explanation: "Reduction of GP; regeneration of RuBP uses ATP.",
  });
  b.short({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Name the ring of cells around each vascular bundle in which the Calvin cycle takes place in a maize leaf.",
    accepted: ["bundle sheath cells", "bundle sheath", "bundle-sheath cells", "the bundle sheath"],
    wrong: ["mesophyll cells"],
    explanation: "The **bundle sheath** cells (Kranz anatomy).",
  });

  const nCO2 = 9;
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "How many molecules of GP are formed when 9 molecules of carbon dioxide are fixed in the Calvin cycle?",
    value: nCO2 * 2, wrong: [nCO2, nCO2 * 3],
    explanation: t`Each CO₂ + RuBP gives 2 GP: $9 \times 2 = ${nCO2 * 2}$.`,
    hints: ["Count the GP per CO₂."],
  });
  const hex = 3;
  const atp = hex * 18, nadph = hex * 12;
  chk(atp, 54);
  b.num({
    d: 4, skill: "APPLICATION",
    stem: "Making one hexose in the Calvin cycle needs 18 ATP and 12 reduced NADP. How many molecules of ATP are needed to make three hexose molecules?",
    value: atp, wrong: [nadph, 18],
    explanation: t`$3 \times 18 = ${atp}$ ATP (and $3 \times 12 = ${nadph}$ reduced NADP).`,
    hints: ["Per hexose: 6 turns, each using 3 ATP."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe the Calvin cycle.",
    points: [
      "In the stroma, CO₂ combines with RuBP (5C), catalysed by rubisco",
      "Forming an unstable 6C compound that splits into two GP (3C)",
      "GP reduced to triose phosphate using ATP and reduced NADP (from the light-dependent stage)",
      "Most TP (five out of six) used to regenerate RuBP, using ATP",
      "Remaining TP used to make hexoses / sucrose / starch / lipids / amino acids",
    ],
    modelAnswer: "In the stroma, carbon dioxide combines with ribulose bisphosphate, a 5C compound, in a reaction catalysed by rubisco. The unstable 6C product splits into two molecules of glycerate 3-phosphate. GP is reduced to triose phosphate using ATP and reduced NADP from the light-dependent stage. Five out of every six triose phosphates are used to regenerate RuBP, using more ATP, and the rest are used to make hexoses, sucrose, starch, lipids and amino acids.",
    explanation: "Fixation, reduction, regeneration, product.",
    hints: ["Three main steps plus the use of the product."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5, applies: ZIM,
    stem: "Explain how maize is adapted to photosynthesise efficiently at high temperatures and light intensities.",
    points: [
      "At high temperatures rubisco combines with oxygen (photorespiration), wasting RuBP / fixed carbon / ATP",
      "Maize fixes CO₂ in mesophyll cells with PEP carboxylase, which does not react with oxygen",
      "Forming oxaloacetate / malate (4C), which passes to bundle sheath cells",
      "Malate decarboxylated in bundle sheath cells, giving a high CO₂ concentration around rubisco",
      "Kranz anatomy: bundle sheath cells tightly packed around vascular bundles / away from air spaces, few grana so little O₂; photorespiration almost eliminated",
    ],
    modelAnswer: "At high temperatures and light intensities rubisco combines RuBP with oxygen in photorespiration, which wastes RuBP, fixed carbon and ATP. Maize first fixes carbon dioxide in its mesophyll cells using PEP carboxylase, which does not react with oxygen, forming oxaloacetate and then malate. Malate passes into the bundle sheath cells, where it is decarboxylated, releasing carbon dioxide at a high concentration around rubisco. The bundle sheath cells are tightly packed around the vascular bundles, away from the air spaces, and their chloroplasts have few grana and produce little oxygen, so photorespiration is almost eliminated.",
    explanation: "C4 plants separate initial fixation from the Calvin cycle.",
    hints: ["Start with the problem: photorespiration."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain why the Calvin cycle stops soon after a plant is placed in darkness, even though it does not use light directly.",
    points: [
      "Light-dependent stage stops, so no ATP or reduced NADP is made",
      "GP cannot be reduced to TP",
      "RuBP cannot be regenerated (no TP or ATP), so CO₂ fixation stops",
    ],
    modelAnswer: "In darkness the light-dependent stage stops, so no more ATP or reduced NADP is made. GP can no longer be reduced to triose phosphate, and RuBP cannot be regenerated, so once the existing RuBP has been used, CO₂ fixation stops.",
    explanation: "The cycle depends on the products of the light-dependent stage.",
    hints: ["Which inputs come from the thylakoids?"],
  });

  // Practice structured: light switched off
  const time = [0, 15, 30, 45, 60, 75, 90];
  const gpv = [1.2, 1.2, 1.2, 2.0, 2.6, 2.8, 2.8];
  const rubp = [0.9, 0.9, 0.9, 0.5, 0.3, 0.15, 0.15];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `*Chlorella* cells were kept in bright light with plenty of carbon dioxide. The light was switched off at 30 s, and the concentrations of GP and RuBP were measured.\n\n${table(["Time / s", ...time.map(String)], [["GP / arbitrary units", ...gpv.map((x) => x.toFixed(1))], ["RuBP / arbitrary units", ...rubp.map((x) => x.toFixed(2))]])}`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Describe the changes in GP and RuBP after the light was switched off.",
        points: ["GP rises from 1.2 to 2.8 units, levelling off by 75 s", "RuBP falls from 0.90 to 0.15 units, levelling off by 75 s"],
        modelAnswer: "After 30 s, GP rises from 1.2 to 2.8 arbitrary units and RuBP falls from 0.90 to 0.15 units; both level off by about 75 s.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain these changes.",
        points: ["No light, so no ATP / reduced NADP from the light-dependent stage", "GP still made from RuBP + CO₂ but cannot be reduced to TP, so GP accumulates", "RuBP used in fixation but not regenerated (no TP / ATP), so RuBP falls"],
        modelAnswer: "In the dark no ATP or reduced NADP is made. RuBP still combines with CO₂ to form GP, but GP cannot be reduced to TP, so GP accumulates. RuBP is used up but cannot be regenerated without TP and ATP, so its concentration falls.",
      }),
      P.mcq({
        label: "(c)", stem: "Suggest why GP levels off at about 2.8 units.",
        options: [["The RuBP has almost all been used up", "Correct: fixation stops when RuBP runs out."], ["GP is converted back to RuBP in the dark", "This needs ATP, which is not available."], ["Rubisco is denatured in the dark", "Rubisco is not denatured by darkness."], ["Carbon dioxide has run out", "CO₂ was plentiful."]],
        answer: "A", explanation: "Fixation stops once RuBP is used up.",
      }),
      P.short({
        label: "(d)", marks: 1, stem: "Name the enzyme that catalyses the reaction between RuBP and carbon dioxide.",
        accepted: ["rubisco", "RuBisCO", "ribulose bisphosphate carboxylase", "ribulose bisphosphate carboxylase oxygenase", "ribulose bisphosphate carboxylase/oxygenase"], wrong: ["PEP carboxylase"],
        explanation: "**Rubisco.**",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Predict what would happen to the concentration of RuBP if, instead of switching off the light, the carbon dioxide supply had been reduced.",
        points: ["RuBP would rise (still regenerated but used more slowly in fixation)"],
        modelAnswer: "RuBP would rise, because it would still be regenerated but less would be used to fix CO₂.",
      }),
    ],
    explanation: "Identify the step that stops; the compound before it accumulates and the one after it falls.",
    hints: ["Which step needs ATP and reduced NADP?"],
  });

  b.struct({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: "A transverse section of a maize leaf, viewed with a microscope, shows each vascular bundle surrounded by a ring of large, tightly packed cells with many chloroplasts. Outside this ring are smaller, loosely arranged cells, also with chloroplasts. Radioactive ¹⁴CO₂ supplied to the leaf for a few seconds appears first in a 4-carbon compound in the outer cells.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the type of leaf anatomy described.", accepted: ["Kranz anatomy", "Kranz", "kranz anatomy"], wrong: ["C3 anatomy"], explanation: "**Kranz anatomy** (German *Kranz*, wreath)." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the 4-carbon compound that carries fixed carbon from the outer cells into the ring of cells.", accepted: ["malate", "malic acid"], wrong: ["oxaloacetate"], explanation: "**Malate.**" }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how this arrangement reduces photorespiration.",
        points: ["Rubisco located only in the bundle sheath cells, away from air spaces / oxygen", "Malate decarboxylated there, giving a high CO₂ concentration", "High CO₂ : O₂ ratio, so rubisco fixes CO₂ rather than combining with oxygen"],
        modelAnswer: "Rubisco is found only in the bundle sheath cells, away from the air spaces. Malate is decarboxylated there, raising the CO₂ concentration around rubisco, so the ratio of CO₂ to oxygen is high and rubisco fixes CO₂ instead of combining with oxygen.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Suggest one disadvantage of the C4 pathway.",
        points: ["Extra ATP needed to regenerate PEP from pyruvate, so it is less efficient in cool / dim conditions"],
        modelAnswer: "It uses extra ATP to regenerate PEP, so in cool or dim conditions, where photorespiration is low anyway, C4 plants have no advantage.",
      }),
    ],
    explanation: "Kranz anatomy separates initial fixation from the Calvin cycle.",
    hints: ["Which cells hold rubisco in maize?"],
  });

  b.card("CONCEPT", "Calvin cycle in three steps", "Fixation: RuBP + CO₂ → 2 GP (rubisco). Reduction: GP → TP (ATP + reduced NADP). Regeneration: 5 TP → 3 RuBP (ATP).");
  b.card("FACT", "Cost of one hexose", "6 turns: 18 ATP and 12 reduced NADP; 2 TP leave the cycle.");
  b.card("FACT", "Uses of GP and TP", "GP: some amino acids. TP: hexoses, sucrose, starch, cellulose, glycerol, fatty acids, amino acids.");
  b.card("CONCEPT", "Light switched off", "GP rises (not reduced), RuBP falls (not regenerated).");
  b.card("CONCEPT", "CO₂ lowered in light", "RuBP rises (used less), GP falls (made less).");
  b.card("DEFINITION", "Define **photorespiration**.", "Rubisco combining RuBP with oxygen instead of CO₂; wastes carbon and ATP; increases at high temperature and low CO₂.");
  b.card("CONCEPT", "C4 pathway", "Mesophyll: PEP + CO₂ → oxaloacetate → malate (PEP carboxylase). Bundle sheath: malate → CO₂ + pyruvate; CO₂ to rubisco.", undefined, { applies: ZIM });
  b.card("FACT", "Examples of C4 plants", "Maize, sorghum, sugar cane.", undefined, { applies: ZIM });
});
