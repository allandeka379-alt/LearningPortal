// W3a: energy and ATP.
import { concept, P, t, chk, sfStr, dpStr, table } from "../lib.mjs";

concept("abio.respiration.atp", { file: "respiration/atp", keyPrefix: "respiration.atp" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which three components make up one molecule of ATP?",
    options: [
      ["Adenine, ribose and three phosphate groups", "Correct: adenosine (adenine + ribose) plus three phosphates."],
      ["Adenine, deoxyribose and three phosphate groups", "Deoxyribose is the sugar of DNA nucleotides, not ATP."],
      ["Adenosine, ribose and two phosphate groups", "Adenosine already contains ribose, and two phosphates make ADP."],
      ["Adenine, glucose and three phosphate groups", "The sugar is a pentose (ribose), not a hexose."],
    ],
    answer: "A",
    explanation: "ATP = **adenine + ribose + three phosphate groups**; adenine and ribose together form adenosine.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which enzyme catalyses the hydrolysis of ATP to ADP and inorganic phosphate?",
    options: [
      ["ATPase", "Correct: ATPase (ATP hydrolase) hydrolyses ATP."],
      ["ATP synthase", "ATP synthase catalyses the reverse reaction, making ATP."],
      ["Adenylyl cyclase", "Adenylyl cyclase converts ATP into cyclic AMP in cell signalling."],
      ["Decarboxylase", "Decarboxylases remove carbon dioxide from substrates."],
    ],
    answer: "A",
    explanation: "**ATPase** hydrolyses ATP; **ATP synthase** makes it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement explains why ATP, rather than glucose, is used as the immediate source of energy for cell processes?",
    options: [
      ["Its hydrolysis releases a small amount of energy in a single step", "Correct: energy is released quickly and in usable amounts."],
      ["It stores more energy per molecule than glucose does", "Glucose releases far more energy per molecule than ATP."],
      ["It can cross cell surface membranes freely by diffusion", "ATP is charged and does not leave the cell; that keeps it in place."],
      ["It is broken down in many steps controlled by enzymes", "Glucose oxidation takes many steps; ATP hydrolysis is one reaction."],
    ],
    answer: "A",
    explanation: "ATP hydrolysis is **one quick reaction** releasing about 30 kJ per mole, matching the needs of a single step; glucose releases a large amount over many steps.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Where in a eukaryotic cell does substrate-linked phosphorylation take place?",
    options: [
      ["In the cytoplasm and in the mitochondrial matrix", "Correct: glycolysis and the Krebs cycle."],
      ["Only on the inner mitochondrial membrane", "The inner membrane is the site of chemiosmosis, not substrate-linked phosphorylation."],
      ["In the thylakoid membranes and in the stroma", "Thylakoids make ATP by chemiosmosis (photophosphorylation)."],
      ["Only in the intermembrane space of the mitochondrion", "The intermembrane space holds the proton reservoir; no ATP is made there."],
    ],
    answer: "A",
    explanation: "Substrate-linked phosphorylation happens in **glycolysis (cytoplasm)** and the **Krebs cycle (matrix)**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "During chemiosmosis in a mitochondrion, what directly drives the synthesis of ATP by ATP synthase?",
    options: [
      ["Protons diffusing down their gradient through the enzyme", "Correct: the flow of protons drives ATP synthase."],
      ["Electrons passing through the enzyme to oxygen", "Electrons pass along the carriers, not through ATP synthase."],
      ["Protons being actively pumped through the enzyme into the matrix", "Protons move through ATP synthase passively, down the gradient."],
      ["Phosphate transferred from a phosphorylated substrate", "That is substrate-linked phosphorylation."],
    ],
    answer: "A",
    explanation: "Energy from electrons sets up the proton gradient; **protons flowing back through ATP synthase** drive ATP synthesis.",
    hints: ["Which particle actually passes through ATP synthase?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A poison stops the regeneration of ATP from ADP in a muscle fibre. Which change would happen first?",
    options: [
      ["The ATP concentration in the fibre falls within seconds", "Correct: the ATP pool is small and constantly used."],
      ["Glycogen stores in the fibre are used up within seconds", "Glycogen would not be used faster if ATP cannot be made from it."],
      ["The ADP concentration in the fibre falls to zero", "ADP would accumulate as ATP is hydrolysed."],
      ["The fibre converts its lipids directly into ATP", "Lipids must be respired to make ATP; the poison blocks this."],
    ],
    answer: "A",
    explanation: "Cells hold only a **small amount of ATP**, recycled continuously; without regeneration it runs out very quickly.",
    hints: ["Is ATP a long-term store?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which process in a cell does NOT need energy from ATP?",
    options: [
      ["Diffusion of oxygen into a mitochondrion", "Correct: diffusion is passive."],
      ["Uptake of potassium ions by the sodium-potassium pump", "Active transport uses ATP."],
      ["Joining amino acids to make a polypeptide", "Protein synthesis is anabolic and uses ATP (and GTP)."],
      ["Movement of chromosomes during anaphase", "Spindle activity uses ATP."],
    ],
    answer: "A",
    explanation: "**Diffusion** is passive; the others are active transport, anabolism and movement.",
    hints: ["Which one moves substances down a concentration gradient?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Endotherms such as mammals have a much higher rate of ATP turnover at rest than ectotherms such as lizards of the same mass. Which is the best explanation?",
    options: [
      ["Endotherms respire faster, partly to release heat that keeps body temperature constant", "Correct: much respiratory energy is released as heat."],
      ["Endotherms make ATP that releases more energy per mole when hydrolysed", "ATP is the same molecule in all organisms."],
      ["Ectotherms make all their ATP by chemiosmosis in chloroplasts", "Lizards have no chloroplasts."],
      ["Ectotherms cannot hydrolyse ATP at low body temperatures", "Ectotherms hydrolyse ATP; their rate is simply lower."],
    ],
    answer: "A",
    explanation: "Mammals and birds keep a high body temperature using heat from respiration, so they respire, and turn over ATP, faster at rest.",
    hints: ["What happens to the energy not captured in ATP?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "ATP is a long-term energy store in liver and muscle cells.",
    answer: false,
    explanation: "False. ATP is an **immediate** energy source, present in small amounts and constantly recycled; glycogen and lipids are the stores.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "ATP is used to phosphorylate glucose at the start of glycolysis, making the glucose more reactive.",
    answer: true,
    explanation: "True. Two ATP are used to phosphorylate glucose (to fructose 1,6-bisphosphate), activating it.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each process to the way it uses energy from ATP.",
    pairs: [
      ["Sodium-potassium pump", "Active transport against a gradient"],
      ["Protein synthesis", "Anabolic reaction"],
      ["Myosin heads moving actin", "Muscle contraction"],
      ["Secretion of digestive enzymes", "Exocytosis (bulk transport)"],
    ],
    explanation: "ATP pays for active transport, anabolism, movement and bulk transport.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Most ATP is made by {{blank:a}}, in which protons diffuse through ATP synthase. A smaller amount is made by {{blank:b}}-linked phosphorylation, in which a phosphate group is transferred directly to {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["chemiosmosis"], choices: ["chemiosmosis", "glycolysis", "hydrolysis"] },
      { id: "b", accepted: ["substrate"], choices: ["substrate", "membrane", "light"] },
      { id: "c", accepted: ["ADP"], choices: ["ADP", "AMP", "ATP"] },
    ],
    explanation: "Chemiosmosis makes most ATP; substrate-linked phosphorylation adds phosphate directly to ADP.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the pentose sugar found in ATP.",
    accepted: ["ribose", "D-ribose"],
    rejected: ["deoxyribose"],
    wrong: ["deoxyribose"],
    explanation: "**Ribose**, the same sugar as in RNA nucleotides.",
  });

  // Efficiency: different values from the lesson (lesson: 32 ATP, 30.5 kJ, 2,870 kJ)
  const nAtp = 30, eAtp = 30.6, eGlu = 2880;
  const eff = ((nAtp * eAtp) / eGlu) * 100;
  chk(nAtp * eAtp, 918);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A textbook states that aerobic respiration of one mole of glucose yields 30 moles of ATP, that complete oxidation of one mole of glucose releases 2,880 kJ, and that hydrolysis of one mole of ATP releases 30.6 kJ. Calculate the percentage of the energy in glucose that is captured in ATP, to three significant figures.",
    value: eff, sf: 3, unit: "%", wrong: [sfStr((eGlu / (nAtp * eAtp)) * 100, 3), sfStr(100 - eff, 3)],
    explanation: t`1. Energy in ATP $= 30 \times 30.6 = 918\ \text{kJ}$.
2. Efficiency $= \dfrac{918}{2880} \times 100 = ${sfStr(eff, 3)}\%$.
3. Dividing 2,880 by 918 inverts the ratio; ${sfStr(100 - eff, 3)}% is the energy lost as heat, not captured.`,
    hints: ["Energy captured ÷ energy available × 100."],
  });
  const molAtp = 0.45;
  const kj = molAtp * 30.5;
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "During a 100 m sprint, Farai's leg muscles hydrolyse 0.45 mol of ATP. Hydrolysis of one mole of ATP releases 30.5 kJ. Calculate the energy released, in kJ, to three significant figures.",
    value: kj, sf: 3, unit: "kJ", wrong: [sfStr(30.5 / molAtp, 3)],
    explanation: t`$0.45 \times 30.5 = ${sfStr(kj, 3)}\ \text{kJ}$. Dividing 30.5 by 0.45 is a common slip.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain four features of ATP that make it suitable as the universal energy currency.",
    points: [
      "Hydrolysis releases energy in small, manageable amounts / little wasted as heat",
      "Hydrolysis is a single reaction catalysed by one enzyme, so energy is released quickly",
      "Small and water-soluble, so it moves easily within the cell to where it is needed",
      "Easily regenerated from ADP and Pi / recycled; or cannot leave the cell / used in all organisms",
    ],
    modelAnswer: "Hydrolysis of ATP releases energy in small amounts that match the needs of individual reactions, so little is wasted. Hydrolysis is a single reaction catalysed by ATPase, so the energy is available immediately. ATP is small and soluble, so it moves easily to wherever energy is needed. ATP is quickly regenerated from ADP and phosphate, so a small pool can supply a large demand.",
    explanation: "Each feature must be linked to its benefit.",
    hints: ["Think about size, solubility, the amount of energy and how quickly it is remade."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how ATP is synthesised by chemiosmosis.",
    points: [
      "Electrons pass along an electron transport chain (carriers) in a membrane, releasing energy",
      "Energy used to pump protons across the membrane (into the intermembrane or thylakoid space)",
      "A proton concentration gradient builds up across the membrane",
      "Protons diffuse back through ATP synthase, which phosphorylates ADP to ATP",
    ],
    modelAnswer: "Electrons pass along a chain of carriers in a membrane and release energy as they go. This energy is used to pump protons across the membrane, so a high concentration of protons builds up on one side. The protons then diffuse back down their gradient through channels in ATP synthase, and this flow drives the phosphorylation of ADP to ATP.",
    explanation: "Electrons → proton pumping → gradient → ATP synthase.",
    hints: ["Start with the electrons and end with ADP + Pi."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A student writes: \"ATP releases energy because breaking its high-energy phosphate bonds gives out energy.\" Suggest why this statement is misleading and rewrite it correctly.",
    points: [
      "Breaking any chemical bond requires (takes in) energy",
      "Energy is released overall because the products (ADP and Pi) are more stable / new bonds formed release more energy than is used",
      "Correct version: hydrolysis of ATP to ADP and Pi releases energy",
    ],
    modelAnswer: "Breaking a bond always takes in energy, so the bond itself does not give out energy. Energy is released overall because the products of hydrolysis, ADP and phosphate, are more stable than ATP and water. A correct statement is: the hydrolysis of ATP to ADP and inorganic phosphate releases energy.",
    explanation: "The energy comes from the whole hydrolysis reaction, not from a bond breaking.",
    hints: ["Does breaking a bond take in or give out energy?"],
  });

  // Practice structured: ATP and ADP in a muscle during and after exercise
  const times = [0, 10, 20, 30, 60, 120];
  const atp = [5.0, 4.4, 4.1, 4.0, 4.6, 5.0];
  const pc = (atp[3] - atp[0]) / atp[0] * 100;
  chk(pc, -20);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `The ATP concentration in a leg muscle was measured during 30 s of intense exercise (from 0 s to 30 s) and during recovery.\n\n${table(["Time / s", ...times.map(String)], [["ATP / mmol per kg muscle", ...atp.map((x) => x.toFixed(1))]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the percentage change in ATP concentration between 0 s and 30 s. Include the sign.",
        value: pc, unit: "%", wrong: [20, -25],
        explanation: t`$\dfrac{4.0 - 5.0}{5.0} \times 100 = ${dpStr(pc, 0)}\%$.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe the changes in ATP concentration shown in the table.",
        points: ["Falls during exercise, quickly at first, then levelling off (5.0 to 4.0 mmol per kg by 30 s)", "Rises again during recovery, back to 5.0 mmol per kg by 120 s"],
        modelAnswer: "The ATP concentration falls during exercise, quickly in the first 10 s and then more slowly, from 5.0 to 4.0 mmol per kg at 30 s. During recovery it rises again, returning to 5.0 mmol per kg by 120 s.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why the ATP concentration does not fall to zero even though the muscle hydrolyses ATP very rapidly during exercise.",
        points: ["ATP is regenerated from ADP and Pi as fast as possible / continuously", "By respiration (aerobic and anaerobic), with substrate-linked phosphorylation in glycolysis", "Rate of hydrolysis is only slightly greater than the rate of resynthesis, so the level falls only a little / small pool recycled many times"],
        modelAnswer: "ATP is constantly regenerated from ADP and phosphate by respiration, including substrate-linked phosphorylation in glycolysis, which can run without oxygen. During exercise hydrolysis is only slightly faster than resynthesis, so the small pool is recycled many times and its concentration falls only a little.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest why the ATP concentration is restored after exercise.",
        points: ["Demand falls when contraction stops", "Aerobic respiration continues (oxygen available), so ATP synthesis exceeds hydrolysis"],
        modelAnswer: "When contraction stops, the demand for ATP falls, while aerobic respiration continues with plenty of oxygen, so ATP is made faster than it is used and the concentration rises.",
      }),
    ],
    explanation: "ATP is a small pool, constantly recycled; its level reflects the balance of hydrolysis and synthesis.",
    hints: ["Percentage change = (new − original) ÷ original × 100.", "Think of ATP as a pool with an inflow and an outflow."],
  });

  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "ATP is made in two ways: substrate-linked phosphorylation and chemiosmosis.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which of these makes ATP by chemiosmosis?",
        options: [["The thylakoid membranes of a chloroplast", "Correct: photophosphorylation."], ["The cytoplasm during glycolysis", "Glycolysis uses substrate-linked phosphorylation."], ["The mitochondrial matrix during the Krebs cycle", "One ATP per turn by substrate-linked phosphorylation."], ["The ribosomes during translation", "Ribosomes use energy; they do not make ATP."]],
        answer: "A", explanation: "Thylakoids make ATP by chemiosmosis.",
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Name the enzyme through which protons flow during chemiosmosis.",
        accepted: ["ATP synthase", "ATP synthetase", "ATPsynthase"], rejected: ["ATPase"], wrong: ["ATPase"],
        explanation: "**ATP synthase.**",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Compare chemiosmosis in mitochondria and chloroplasts.",
        points: [
          "Similarity: both use an electron transport chain, a proton gradient and ATP synthase",
          "Mitochondria: inner membrane / cristae; chloroplasts: thylakoid membranes",
          "Mitochondria pump protons into the intermembrane space; chloroplasts into the thylakoid space",
          "Mitochondria: energy from oxidation of reduced NAD / FAD; chloroplasts: energy from light (excited electrons from chlorophyll)",
        ],
        modelAnswer: "In both, electrons pass along a transport chain, protons are pumped across a membrane and diffuse back through ATP synthase. In mitochondria this happens across the inner membrane, protons are pumped into the intermembrane space and the electrons come from reduced NAD and FAD. In chloroplasts it happens across the thylakoid membranes, protons are pumped into the thylakoid space and the electrons are excited by light absorbed by chlorophyll.",
      }),
    ],
    explanation: "Same principle, different membranes and energy sources.",
    hints: ["Give a similarity first, then differences in pairs."],
  });

  b.card("DEFINITION", "Define **ATP**.", "Adenosine triphosphate: a phosphorylated nucleotide (adenine, ribose, three phosphates); its hydrolysis releases energy for cell processes.");
  b.card("FORMULA", "Hydrolysis of ATP", "ATP + H₂O → ADP + Pi, about 30 kJ per mole released; catalysed by ATPase.");
  b.card("CONCEPT", "Why is ATP a good energy currency?", "Small energy packets; one-step hydrolysis; small and soluble; easily regenerated; stays in the cell; used by all organisms.");
  b.card("DEFINITION", "Define **substrate-linked phosphorylation**.", "ATP made by direct transfer of phosphate from a phosphorylated substrate to ADP (glycolysis, Krebs cycle).");
  b.card("DEFINITION", "Define **chemiosmosis**.", "ATP synthesis driven by protons diffusing down their gradient through ATP synthase in a membrane.");
  b.card("FACT", "Uses of energy in organisms", "Anabolic reactions, active transport, movement, bulk transport, body temperature in mammals and birds, activating molecules.");
  b.card("CONCEPT", "Is ATP an energy store?", "No: small amounts, recycled constantly. Stores are glycogen, starch and lipids.");
  b.card("FACT", "Where is ATP made by chemiosmosis?", "Inner mitochondrial membrane (oxidative phosphorylation) and thylakoid membranes (photophosphorylation).");
});
