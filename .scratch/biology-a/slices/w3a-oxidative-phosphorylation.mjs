// W3a: oxidative phosphorylation and the mitochondrion.
import { concept, P, t, chk, sfStr, dpStr, table } from "../lib.mjs";

concept("abio.respiration.oxidative-phosphorylation", { file: "respiration/oxidative-phosphorylation", keyPrefix: "respiration.oxidative-phosphorylation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which molecule is the final electron acceptor in aerobic respiration?",
    options: [
      ["Oxygen", "Correct: oxygen accepts electrons and protons, forming water."],
      ["NAD", "NAD accepts hydrogen in the earlier stages, not at the end of the chain."],
      ["Pyruvate", "Pyruvate accepts hydrogen only in lactate fermentation."],
      ["Carbon dioxide", "CO₂ is a waste product of decarboxylation."],
    ],
    answer: "A",
    explanation: "**Oxygen** is the final electron acceptor, forming water.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Into which region of the mitochondrion are protons pumped by the electron transport chain?",
    options: [
      ["Intermembrane space", "Correct: a high proton concentration builds up here."],
      ["Matrix", "Protons are pumped out of the matrix and flow back into it through ATP synthase."],
      ["Cytoplasm outside the mitochondrion", "The outer membrane encloses the intermembrane space; the gradient is across the inner membrane."],
      ["Thylakoid space", "The thylakoid space receives protons in chloroplasts, not mitochondria."],
    ],
    answer: "A",
    explanation: "Protons go from the matrix into the **intermembrane space**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the advantage of the inner mitochondrial membrane being folded into cristae?",
    options: [
      ["A larger surface area for electron carriers and ATP synthase", "Correct: more sites for oxidative phosphorylation."],
      ["A larger volume of matrix to hold the enzymes of the Krebs cycle", "Folding the inner membrane does not enlarge the matrix volume."],
      ["A shorter diffusion distance for oxygen into the organelle", "Oxygen diffuses through the outer membrane; the folds are not for this."],
      ["Space for circular DNA and 70S ribosomes", "DNA and ribosomes lie in the matrix."],
    ],
    answer: "A",
    explanation: "Cristae increase the **surface area** of the inner membrane.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Cyanide is added to respiring liver cells. Which change happens in the mitochondria?",
    options: [
      ["Electron carriers stay reduced and oxygen uptake stops", "Correct: the last carrier cannot pass electrons to oxygen."],
      ["The proton concentration in the intermembrane space rises", "Pumping stops, so the gradient dissipates rather than rising."],
      ["Reduced NAD is oxidised faster than before", "NAD stays reduced because the chain is blocked."],
      ["ATP synthase reverses and pumps protons out of the matrix", "This is not the effect taught for cyanide."],
    ],
    answer: "A",
    explanation: "Cyanide blocks the final carrier, so the chain backs up, **carriers stay reduced** and oxygen is not used.",
    hints: ["What happens to electrons if they cannot be passed to oxygen?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does reduced FAD give less ATP than reduced NAD in oxidative phosphorylation?",
    options: [
      ["Its electrons enter the chain at a later point, so fewer protons are pumped", "Correct: fewer pumping steps are passed."],
      ["It carries only one hydrogen atom instead of two", "Reduced FAD carries two hydrogen atoms."],
      ["It is made in the cytoplasm and must be transported into the matrix", "Reduced FAD is made in the matrix by the Krebs cycle."],
      ["It passes its electrons directly to ATP synthase", "Electrons never pass through ATP synthase."],
    ],
    answer: "A",
    explanation: "Reduced FAD feeds the chain **further along**, so its electrons drive less proton pumping.",
    hints: ["Think of where on the chain each coenzyme delivers its hydrogen."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What makes protons move through ATP synthase into the matrix?",
    options: [
      ["Diffusion down their electrochemical gradient", "Correct: the movement is passive."],
      ["Active transport using ATP made in glycolysis", "This would waste the ATP being made."],
      ["Attraction to oxygen in the intermembrane space", "Oxygen is reduced on the matrix side; this is not the driving force."],
      ["Osmosis of water carrying protons with it", "Osmosis is the movement of water, not protons."],
    ],
    answer: "A",
    explanation: "Protons **diffuse** back through ATP synthase down the gradient.",
    hints: ["Does ATP synthase need energy to let protons through?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A substance makes the inner mitochondrial membrane permeable to protons. Which combination of effects is expected?",
    options: [
      ["Oxygen uptake continues, ATP synthesis falls and more heat is released", "Correct: electron flow continues but the gradient collapses."],
      ["Oxygen uptake stops, ATP synthesis stops and less heat is released", "That describes cyanide, which blocks electron flow."],
      ["Oxygen uptake continues, ATP synthesis rises and less heat is released", "Without a gradient ATP synthase cannot work."],
      ["Oxygen uptake stops, ATP synthesis continues and more heat is released", "Electron flow is not blocked by a leaky membrane."],
    ],
    answer: "A",
    explanation: "An **uncoupler** lets protons leak back, so electrons still reach oxygen but the energy is released as heat rather than used to make ATP.",
    hints: ["Separate electron flow from proton flow through ATP synthase."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Electron micrographs show that mitochondria in cardiac muscle cells have more densely packed cristae than mitochondria in skin cells. Which is the best explanation?",
    options: [
      ["Cardiac cells need more ATP, made on a larger inner membrane area", "Correct: more carriers and ATP synthase per mitochondrion."],
      ["Cardiac cells respire anaerobically and need more glycolytic enzymes", "Glycolysis is in the cytoplasm, and the heart respires mainly aerobically."],
      ["Skin cells use oxygen as the final acceptor but cardiac cells do not", "All aerobic cells use oxygen as the final acceptor."],
      ["Cardiac cells store more ATP in the cristae for later use", "ATP is not stored; it is made as needed."],
    ],
    answer: "A",
    explanation: "Continuous contraction needs a high rate of ATP synthesis, so a **larger cristae area** is advantageous.",
    hints: ["Which cell has the higher energy demand?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In oxidative phosphorylation, water is formed when oxygen combines with protons and electrons.",
    answer: true,
    explanation: "True. 4H⁺ + 4e⁻ + O₂ → 2H₂O.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The inner mitochondrial membrane is freely permeable to protons.",
    answer: false,
    explanation: "False. It is **impermeable** to protons except through ATP synthase; otherwise no gradient could form.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of the mitochondrion to its function.",
    pairs: [
      ["Matrix", "Contains enzymes of the link reaction and Krebs cycle"],
      ["Inner membrane", "Holds electron carriers and ATP synthase"],
      ["Intermembrane space", "Region where protons accumulate"],
      ["Outer membrane", "Separates the organelle from the cytoplasm"],
    ],
    explanation: "Each region has a distinct role in aerobic respiration.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Hydrogen atoms from reduced NAD split into protons and {{blank:a}}. Energy released along the chain is used to pump protons into the {{blank:b}}. Protons return through {{blank:c}}, which makes ATP.",
    blanks: [
      { id: "a", accepted: ["electrons"], choices: ["electrons", "neutrons", "phosphates"] },
      { id: "b", accepted: ["intermembrane space"], choices: ["intermembrane space", "matrix", "cytoplasm"] },
      { id: "c", accepted: ["ATP synthase"], choices: ["ATP synthase", "ATPase", "dehydrogenase"] },
    ],
    explanation: "Electrons release energy; protons are pumped and return through ATP synthase.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the folds of the inner mitochondrial membrane.",
    accepted: ["cristae", "crista", "the cristae"],
    wrong: ["thylakoids"],
    explanation: "**Cristae** (singular crista).",
  });

  // ATP yield with given values
  const nad = 10, fad = 2, sub = 4;
  const y = nad * 3 + fad * 2 + sub;
  chk(y, 38);
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "An older textbook assumes 3 ATP per reduced NAD and 2 ATP per reduced FAD. One glucose produces 10 reduced NAD, 2 reduced FAD and 4 ATP by substrate-linked phosphorylation. Calculate the total number of ATP per glucose on these assumptions.",
    value: y, wrong: [nad * 3 + fad * 2, 32],
    explanation: t`1. From reduced NAD: $10 \times 3 = 30$.
2. From reduced FAD: $2 \times 2 = 4$.
3. Add substrate-linked ATP: $30 + 4 + 4 = ${y}$.
4. Forgetting the 4 substrate-linked ATP gives 34; 32 uses the modern values of 2.5 and 1.5.`,
    hints: ["Add the ATP made directly to the ATP from each coenzyme."],
  });
  const before = [280, 172];
  const rate = (before[0] - before[1]) / 6;
  chk(rate, 18);
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "In an oxygen electrode, the oxygen concentration in a mitochondrial suspension fell from 280 to 172 µmol dm⁻³ in 6 minutes. Calculate the rate of oxygen uptake in µmol dm⁻³ per minute.",
    value: rate, wrong: [(280 - 172) * 6, sfStr(172 / 6, 3)],
    explanation: t`$(280 - 172) \div 6 = ${rate}$ µmol dm⁻³ per minute. Multiplying by 6, or dividing the final value by the time, are common slips.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe how ATP is made in oxidative phosphorylation.",
    points: [
      "Reduced NAD / FAD deliver hydrogen to carriers in the inner membrane; hydrogen splits into protons and electrons",
      "Electrons pass along the electron transport chain, releasing energy",
      "Energy used to pump protons from the matrix into the intermembrane space",
      "Proton gradient forms; protons diffuse back through ATP synthase, driving ADP + Pi → ATP (chemiosmosis)",
      "Oxygen is the final electron acceptor, combining with electrons and protons to form water",
    ],
    modelAnswer: "Reduced NAD and reduced FAD deliver hydrogen to carriers in the inner mitochondrial membrane, where each hydrogen atom splits into a proton and an electron. The electrons pass along the electron transport chain, releasing energy that is used to pump protons from the matrix into the intermembrane space. A proton gradient builds up, and protons diffuse back into the matrix through ATP synthase, which uses this flow to make ATP from ADP and phosphate. At the end of the chain, oxygen accepts the electrons and combines with protons to form water.",
    explanation: "Hydrogen → electrons and protons → pumping → gradient → ATP synthase → water.",
    hints: ["Follow the electrons and the protons separately."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why a lack of oxygen stops the Krebs cycle as well as oxidative phosphorylation.",
    points: [
      "No final electron acceptor, so electrons cannot leave the chain / carriers stay reduced",
      "Electron flow and proton pumping stop, so no ATP from chemiosmosis",
      "Reduced NAD and FAD cannot be oxidised (pass on their hydrogen), so no oxidised NAD / FAD returns to the matrix",
      "Dehydrogenation steps of the Krebs cycle (and link reaction) need oxidised NAD / FAD, so they stop",
    ],
    modelAnswer: "Without oxygen there is no final electron acceptor, so electrons cannot leave the chain and the carriers stay reduced. Electron flow and proton pumping stop, so no ATP is made by chemiosmosis. Reduced NAD and FAD cannot pass on their hydrogen, so no oxidised NAD or FAD is returned to the matrix. The dehydrogenation steps of the link reaction and the Krebs cycle need oxidised NAD and FAD, so they stop too.",
    explanation: "The coenzymes link the Krebs cycle to the chain.",
    hints: ["What do the Krebs cycle dehydrogenases need?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Suggest why cells of the proximal convoluted tubule of the kidney contain many mitochondria with many cristae.",
    points: [
      "Cells carry out a lot of active transport / cotransport (reabsorption of glucose, ions)",
      "Active transport needs a lot of ATP",
      "Many mitochondria with many cristae give a large inner membrane area for oxidative phosphorylation, so ATP is made fast",
    ],
    modelAnswer: "These cells reabsorb glucose and ions by active transport and cotransport, which needs a large supply of ATP. Many mitochondria with many cristae give a large area of inner membrane for electron carriers and ATP synthase, so ATP can be made quickly by oxidative phosphorylation.",
    explanation: "Structure linked to a high ATP demand.",
    hints: ["What process in these cells uses ATP?"],
  });

  // Practice structured: oxygen electrode with an inhibitor
  const tm = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const o2 = [240, 212, 184, 156, 128, 126, 125, 125, 125];
  const rateBefore = (o2[0] - o2[4]) / 4;
  const pcFall = ((o2[0] - o2[8]) / o2[0]) * 100;
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A suspension of mitochondria with pyruvate was placed in an oxygen electrode. A respiratory inhibitor was added at 4 minutes.\n\n${table(["Time / min", ...tm.map(String)], [["Oxygen concentration / µmol dm⁻³", ...o2.map(String)]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the rate of oxygen uptake between 0 and 4 minutes, in µmol dm⁻³ per minute.",
        value: rateBefore, wrong: [112],
        explanation: t`$(240 - 128) \div 4 = ${rateBefore}$.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the percentage decrease in oxygen concentration over the whole 8 minutes, to three significant figures.",
        value: pcFall, sf: 3, unit: "%", wrong: [sfStr((o2[0] - o2[8]) / o2[8] * 100, 3)],
        explanation: t`$\dfrac{240 - 125}{240} \times 100 = ${sfStr(pcFall, 3)}\%$. Dividing by 125 uses the wrong original value.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe the effect of the inhibitor on oxygen uptake.",
        points: ["Oxygen uptake almost stops after the inhibitor is added (falls by only 2 then 1 µmol dm⁻³)", "Oxygen concentration constant at 125 µmol dm⁻³ from 6 minutes, compared with a steady fall of 28 per minute before"],
        modelAnswer: "Before 4 minutes the oxygen concentration falls steadily by 28 µmol dm⁻³ per minute. After the inhibitor is added it falls by only 3 µmol dm⁻³ more and is constant at 125 µmol dm⁻³ from 6 minutes, so oxygen uptake has almost stopped.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "The inhibitor binds to the last carrier of the electron transport chain. Explain the effect on ATP production.",
        points: ["Electrons cannot be passed to oxygen, so electron flow along the chain stops", "Protons are no longer pumped into the intermembrane space, so the gradient is lost", "No proton flow through ATP synthase, so no ATP by oxidative phosphorylation"],
        modelAnswer: "With the last carrier blocked, electrons cannot be passed to oxygen and electron flow stops. Protons are no longer pumped into the intermembrane space, so the proton gradient is lost and no protons flow through ATP synthase; ATP is no longer made by oxidative phosphorylation.",
      }),
      P.mcq({
        label: "(e)", stem: "Why was pyruvate, not glucose, supplied to the mitochondria?",
        options: [["Mitochondria do not carry out glycolysis", "Correct: glucose cannot be used by isolated mitochondria."], ["Glucose cannot cross the oxygen electrode membrane", "The electrode membrane is irrelevant to the substrate."], ["Pyruvate contains more energy than glucose", "Glucose contains more energy than pyruvate."], ["Glucose would inhibit the electron transport chain", "Glucose is not an inhibitor."]],
        answer: "A", explanation: "Glycolysis enzymes are in the cytoplasm.",
      }),
    ],
    explanation: "Rate = change ÷ time; a blocked chain stops oxygen use and ATP synthesis.",
    hints: ["Rate = change in concentration ÷ time.", "Percentage change uses the starting value."],
  });

  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "An electron micrograph of a mitochondrion shows a smooth outer membrane, an inner membrane with many deep folds, a narrow space between the membranes and a granular central region containing small dense particles and thin strands.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the granular central region.", accepted: ["matrix", "mitochondrial matrix", "the matrix"], wrong: ["stroma"], explanation: "The **matrix**." }),
      P.short({ label: "(b)", marks: 1, stem: "The small dense particles in the central region are ribosomes. State their size, as a sedimentation value.", accepted: ["70S", "70 S", "70s"], rejected: ["80S"], wrong: ["80S"], explanation: "Mitochondrial ribosomes are **70S**, like those of prokaryotes." }),
      P.short({ label: "(c)", marks: 1, stem: "Suggest what the thin strands in the central region are.", accepted: ["DNA", "circular DNA", "mitochondrial DNA", "mtDNA", "loops of DNA"], wrong: ["chromosomes"], explanation: "Circular **DNA**." }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain how the inner membrane and the narrow space between the membranes are adapted for ATP synthesis.",
        points: ["Folds (cristae) give a large surface area for electron carriers and ATP synthase", "Inner membrane impermeable to protons except through ATP synthase, so a gradient is maintained", "Narrow intermembrane space: protons pumped into a small volume quickly build a high concentration / steep gradient"],
        modelAnswer: "The inner membrane is folded into cristae, giving a large surface area for electron carriers and ATP synthase. It is impermeable to protons except through ATP synthase, so the proton gradient is maintained. The intermembrane space is narrow, so protons pumped into it quickly reach a high concentration, giving a steep gradient.",
      }),
    ],
    explanation: "Relate each structure to its role in oxidative phosphorylation.",
    hints: ["Which structure holds the proton gradient?"],
  });

  b.card("DEFINITION", "Define **oxidative phosphorylation**.", "ATP synthesis using energy released as electrons from reduced NAD and FAD pass along the electron transport chain to oxygen, coupled by chemiosmosis.");
  b.card("CONCEPT", "Oxidative phosphorylation in five steps", "H from reduced NAD/FAD → split into H⁺ and e⁻ → e⁻ pass along carriers releasing energy → H⁺ pumped into intermembrane space → H⁺ flow back through ATP synthase making ATP.");
  b.card("FORMULA", "Formation of water at the end of the chain", "4H⁺ + 4e⁻ + O₂ → 2H₂O");
  b.card("FACT", "Role of oxygen in aerobic respiration", "Final electron acceptor; keeps electrons flowing so NAD and FAD are regenerated.");
  b.card("FACT", "Structure of a mitochondrion", "Outer membrane, intermembrane space, inner membrane folded into cristae, matrix with enzymes, circular DNA and 70S ribosomes.");
  b.card("CONCEPT", "Effect of cyanide", "Blocks the last carrier (cytochrome oxidase): electrons cannot reach oxygen, chain stops, no proton gradient, no ATP by oxidative phosphorylation.");
  b.card("FACT", "ATP per reduced coenzyme (common values)", "About 2.5 ATP per reduced NAD and 1.5 per reduced FAD (older books: 3 and 2).");
  b.card("CONCEPT", "Why does reduced FAD yield less ATP?", "Its electrons enter the chain later, so fewer protons are pumped.");
});
