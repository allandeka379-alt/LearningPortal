// W3b: control of gene expression (Cambridge only, A Level).
import { concept, P, t, chk, table, rnd } from "../lib.mjs";

concept("abio.inheritance.gene-control", { file: "inheritance/gene-control", keyPrefix: "inheritance.gene-control" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In the lac operon, where does the repressor protein bind?",
    options: [
      ["The operator", "Correct."],
      ["The promoter", "RNA polymerase binds to the promoter."],
      ["The lacZ gene", "lacZ is a structural gene coding for β-galactosidase."],
      ["The ribosome", "The repressor acts on DNA, not on ribosomes."],
    ],
    answer: "A",
    explanation: "The repressor binds to the **operator**, blocking transcription.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which enzyme is coded for by the lacZ gene?",
    options: [
      ["β-galactosidase", "Correct: it hydrolyses lactose."],
      ["Lactose permease", "This is coded by lacY."],
      ["Transacetylase", "This is coded by lacA."],
      ["RNA polymerase", "RNA polymerase is not coded by the lac operon."],
    ],
    answer: "A",
    explanation: "lacZ → β-galactosidase; lacY → permease; lacA → transacetylase.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does lactose switch on transcription of the lac operon?",
    options: [
      ["It binds to the repressor, changing its shape so it leaves the operator", "Correct."],
      ["It binds to the operator and attracts RNA polymerase", "Lactose does not bind to DNA."],
      ["It binds to the promoter and unwinds the DNA", "Lactose acts on the repressor protein."],
      ["It activates the transcription of the regulatory gene lacI, making more repressor", "lacI is transcribed all the time."],
    ],
    answer: "A",
    explanation: "Lactose (the inducer) binds the repressor, which changes shape and can no longer bind the operator.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement describes an inducible enzyme?",
    options: [
      ["It is synthesised only when its substrate is present", "Correct."],
      ["It is synthesised all the time at a constant rate", "That is a constitutive enzyme."],
      ["Its synthesis stops when its end product accumulates", "That describes a repressible enzyme."],
      ["It is activated only by a rise in temperature", "Induction is by a molecule, not temperature."],
    ],
    answer: "A",
    explanation: "Inducible enzymes, such as β-galactosidase, are made when the substrate (inducer) is present.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A mutant *E. coli* makes a repressor that cannot bind to the operator. What happens?",
    options: [
      ["The structural genes are transcribed whether or not lactose is present", "Correct: nothing blocks RNA polymerase."],
      ["The structural genes are never transcribed, even with lactose", "That would happen if the repressor could not bind lactose."],
      ["Transcription occurs only when glucose is present", "Without a working repressor, transcription is continuous."],
      ["The bacteria make the repressor only when lactose is present", "The repressor is made constantly; it just cannot bind."],
    ],
    answer: "A",
    explanation: "No repressor on the operator: RNA polymerase transcribes continuously.",
    hints: ["What normally stops transcription?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A mutant repressor can bind to the operator but cannot bind lactose. What is the effect when lactose is present?",
    options: [
      ["The enzymes are never made", "Correct: the repressor stays on the operator."],
      ["The enzymes are made all the time", "The repressor still blocks transcription."],
      ["The enzymes are made only in the presence of glucose", "Glucose does not remove this repressor."],
      ["Only lacY is transcribed and lacZ is not", "The genes are transcribed together or not at all."],
    ],
    answer: "A",
    explanation: "Lactose cannot change the repressor's shape, so it never leaves the operator.",
    hints: ["Can the inducer remove this repressor?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How does gibberellin allow the gene for amylase to be transcribed in barley aleurone cells?",
    options: [
      ["It causes DELLA proteins to be broken down, freeing a transcription factor", "Correct."],
      ["It binds directly to the promoter of the amylase gene in the nucleus", "Gibberellin does not bind DNA."],
      ["It acts as RNA polymerase and transcribes the gene", "Gibberellin is a hormone, not an enzyme."],
      ["It hydrolyses starch in the endosperm, which releases the amylase gene", "Starch is not involved in gene control."],
    ],
    answer: "A",
    explanation: "Gibberellin + receptor → DELLA broken down → transcription factor released → amylase gene transcribed.",
    hints: ["What normally inhibits the transcription factor?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Dwarf plants of a mutant line have a DELLA protein that cannot be broken down, even with gibberellin. Spraying gibberellin on these plants would most likely",
    options: [
      ["have no effect on height, as transcription factors stay inhibited", "Correct."],
      ["make them grow tall, as gibberellin bypasses DELLA", "Gibberellin acts only by removing DELLA."],
      ["make them shorter, as gibberellin stabilises DELLA further", "Gibberellin promotes DELLA breakdown, but here it cannot."],
      ["cause them to make extra DELLA protein in their stems", "No evidence for extra synthesis."],
    ],
    answer: "A",
    explanation: "If DELLA cannot be removed, the transcription factor stays bound and growth genes stay off; the plants remain dwarf.",
    hints: ["What is gibberellin's only route to switching genes on?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the lac operon, the regulatory gene lacI is transcribed only when lactose is present.",
    answer: false,
    explanation: "False. lacI is transcribed all the time, so the repressor is always available.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A transcription factor can either increase or decrease the transcription of a gene.",
    answer: true,
    explanation: "True. Some help RNA polymerase bind to the promoter; others block it.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each part of the lac operon system with its role.",
    pairs: [
      ["Promoter", "Binding site for RNA polymerase"],
      ["Operator", "Binding site for the repressor"],
      ["lacY", "Codes for lactose permease"],
      ["lacI", "Codes for the repressor protein"],
    ],
    explanation: "Promoter: RNA polymerase; operator: repressor; lacY: permease; lacI: repressor gene.",
  });
  b.fib({
    d: 3,
    stem: "Choose the correct words.",
    template: "In the absence of lactose, the {{blank:a}} protein binds to the operator, so {{blank:b}} cannot transcribe the structural genes. β-galactosidase is therefore described as an {{blank:c}} enzyme.",
    blanks: [
      { id: "a", accepted: ["repressor"], choices: ["repressor", "DELLA", "permease"] },
      { id: "b", accepted: ["RNA polymerase"], choices: ["RNA polymerase", "DNA polymerase", "ligase"] },
      { id: "c", accepted: ["inducible"], choices: ["inducible", "repressible", "allosteric"] },
    ],
    explanation: "Repressor blocks RNA polymerase; β-galactosidase is inducible.",
    hints: ["Which enzyme carries out transcription?"],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of protein that binds to DNA near a eukaryotic gene's promoter and controls the rate of its transcription.",
    accepted: ["transcription factor", "transcription factors", "a transcription factor"],
    wrong: ["repressor"],
    explanation: "A **transcription factor**.",
  });

  // Numerical: rate of increase in enzyme activity
  const times = [0, 15, 30, 45, 60, 75];
  const act = [3, 3, 3, 22, 61, 99];
  const rate = (act[5] - act[2]) / (times[5] - times[2]);
  chk(rate, 96 / 45);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Lactose was added to a culture of *E. coli* at 30 minutes. β-galactosidase activity was measured.\n\n${table(["Time / min", ...times.map(String)], [["Activity / arbitrary units", ...act.map(String)]])}\n\nCalculate the mean rate of increase in activity between 30 and 75 minutes, in arbitrary units per minute. Give your answer to three significant figures.`,
    value: rate, sf: 3, unit: "per min", wrong: [rnd(act[5] / times[5], 2)],
    explanation: t`1. Increase $= ${act[5]} - ${act[2]} = ${act[5] - act[2]}$ units.
2. Time $= ${times[5]} - ${times[2]} = ${times[5] - times[2]}$ min.
3. Rate $= \dfrac{${act[5] - act[2]}}{${times[5] - times[2]}} = ${rnd(rate, 2)}$ units per minute (3 s.f.).
Dividing the final activity by the total time (1.32) ignores the lag before lactose was added.`,
    hints: ["Use only the period after lactose was added."],
  });
  b.num({
    d: 2, skill: "RECALL",
    stem: "How many structural genes are transcribed together in the lac operon?",
    value: 3, wrong: [4, 1],
    explanation: "lacZ, lacY and lacA: **3** (lacI is a regulatory gene outside the operon).",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain how the lac operon in *E. coli* is switched on when lactose is present and switched off when it is absent.",
    points: [
      "Regulatory gene (lacI) codes for a repressor protein, made all the time",
      "Without lactose, the repressor binds to the operator",
      "This prevents RNA polymerase binding to the promoter / transcribing the structural genes",
      "With lactose, lactose binds to the repressor, changing its shape",
      "Repressor can no longer bind to / leaves the operator",
      "RNA polymerase transcribes lacZ, lacY, lacA: β-galactosidase and permease are made",
    ],
    modelAnswer: "The regulatory gene lacI is transcribed all the time and codes for a repressor protein. When lactose is absent, the repressor binds to the operator, preventing RNA polymerase from binding to the promoter and transcribing the structural genes. When lactose is present, it binds to the repressor and changes its shape, so the repressor can no longer bind to the operator. RNA polymerase then binds to the promoter and transcribes lacZ, lacY and lacA, so β-galactosidase and lactose permease are made.",
    explanation: "Six linked points: repressor, operator, RNA polymerase, lactose, shape change, transcription.",
    hints: ["Describe both states."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how gibberellin causes genes for stem elongation to be expressed.",
    points: [
      "DELLA proteins normally bind to / inhibit a transcription factor",
      "Gibberellin binds to a receptor protein",
      "The gibberellin-receptor complex causes DELLA to be broken down",
      "The transcription factor is released, binds to the promoter and transcription of growth genes occurs",
    ],
    modelAnswer: "DELLA proteins normally bind to a transcription factor and stop it activating transcription. Gibberellin binds to its receptor, and the complex causes the DELLA protein to be tagged and broken down. The released transcription factor binds to the promoters of growth genes, which are then transcribed, so the stem elongates.",
    explanation: "Remove the inhibitor of the transcription factor.",
    hints: ["What do DELLA proteins normally do?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest why it is an advantage to *E. coli* for the lac genes to be switched off when lactose is absent.",
    points: [
      "Making proteins uses ATP / energy",
      "And amino acids / resources",
      "Which would be wasted if the enzymes have no substrate; resources can be used for growth / other proteins",
    ],
    modelAnswer: "Transcription and translation use ATP and amino acids. If lactose is absent the enzymes would have nothing to act on, so switching the genes off saves energy and materials for growth and making other proteins.",
    explanation: "Saving energy and materials.",
    hints: ["What does protein synthesis cost?"],
  });

  // Practice structured: mutant strains
  const strains = [
    ["Wild type", "Low", "High"],
    ["Mutant 1", "High", "High"],
    ["Mutant 2", "Low", "Low"],
    ["Mutant 3", "High", "High"],
  ];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `β-galactosidase activity was measured in four strains of *E. coli* grown without glucose.\n\n${table(["Strain", "Activity without lactose", "Activity with lactose"], strains)}\n\nMutant 1 has a mutation in the lacI gene. Mutant 3 has a mutation in the operator.`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain the results for the wild type.",
        points: [
          "Without lactose, the repressor binds to the operator, so little transcription / low activity",
          "With lactose, lactose binds the repressor, which leaves the operator; lacZ is transcribed / high activity",
        ],
        modelAnswer: "Without lactose the repressor binds to the operator and blocks transcription, so activity is low. With lactose, lactose binds to the repressor, which changes shape and leaves the operator, so lacZ is transcribed and activity is high.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Suggest how the mutation in lacI causes the results for mutant 1.",
        points: [
          "The repressor is not made / is non-functional / cannot bind to the operator",
          "So the structural genes are transcribed all the time, even without lactose",
        ],
        modelAnswer: "The mutation means the repressor is not made, or has a changed shape so that it cannot bind to the operator. RNA polymerase can transcribe the structural genes all the time, so activity is high even without lactose.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain the results for mutant 3.",
        points: [
          "The changed operator sequence is not complementary to / cannot be bound by the repressor",
          "So RNA polymerase is never blocked and the genes are always transcribed",
        ],
        modelAnswer: "The mutation changes the base sequence of the operator so that the repressor can no longer bind to it. RNA polymerase is never blocked, so the genes are transcribed with or without lactose.",
      }),
      P.mcq({
        label: "(d)", stem: "Which mutation best explains mutant 2?",
        options: [
          ["A repressor that binds the operator but cannot bind lactose", "Correct: the repressor is never removed."],
          ["A repressor that cannot bind the operator at all", "That gives high activity all the time (like mutant 1)."],
          ["An operator that the repressor cannot recognise", "That gives high activity all the time (like mutant 3)."],
          ["An extra copy of the lacZ gene on a plasmid", "Extra lacZ would raise activity, not keep it low."],
        ],
        answer: "A",
        explanation: "If lactose cannot inactivate the repressor, the operon stays switched off.",
      }),
    ],
    explanation: "Predict operon behaviour from where the mutation is.",
    hints: ["Ask: can the repressor bind the operator, and can lactose remove it?"],
  });

  const conc = [0, 0.01, 0.1, 1, 10];
  const amyl = [4, 12, 35, 70, 74];
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Barley aleurone layers (with the embryo removed) were incubated with different concentrations of gibberellin, and amylase secreted after 24 hours was measured.\n\n${table(["Gibberellin concentration / µmol dm⁻³", ...conc.map(String)], [["Amylase secreted / arbitrary units", ...amyl.map(String)]])}`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Describe the effect of gibberellin concentration on amylase secretion.",
        points: [
          "Amylase increases as gibberellin concentration increases, from 4 to 70 units between 0 and 1 µmol dm⁻³",
          "Then levels off: only 74 units at 10 µmol dm⁻³",
        ],
        modelAnswer: "As gibberellin concentration rises, amylase secretion increases from 4 units with none to 70 units at 1 µmol dm⁻³, then levels off, reaching only 74 units at 10 µmol dm⁻³.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain how gibberellin increases amylase secretion.",
        points: [
          "Gibberellin binds to its receptor, causing DELLA protein breakdown",
          "A transcription factor is released and binds to the promoter of the amylase gene",
          "The amylase gene is transcribed and translated, and amylase is secreted",
        ],
        modelAnswer: "Gibberellin binds to its receptor in aleurone cells, which causes DELLA proteins to be broken down. This releases a transcription factor that binds to the promoter of the amylase gene, so the gene is transcribed and translated and amylase is secreted.",
      }),
      P.manual({
        label: "(c)", marks: 1, stem: "Suggest why secretion levels off at high gibberellin concentrations.",
        points: ["All the receptors are occupied / all DELLA is already removed / the rate of transcription or synthesis is at its maximum"],
        modelAnswer: "All the gibberellin receptors are occupied and DELLA proteins already removed, so the amylase gene is transcribed at its maximum rate.",
      }),
    ],
    explanation: "Gibberellin removes DELLA to switch on the amylase gene.",
    hints: ["Describe the trend, then the levelling off."],
  });

  b.card("DEFINITION", "Define **structural gene** and **regulatory gene**.", "Structural: codes for a functional protein (e.g. enzyme). Regulatory: codes for a protein controlling other genes (e.g. repressor).");
  b.card("DEFINITION", "Inducible vs repressible enzyme", "Inducible: made when substrate present (β-galactosidase). Repressible: switched off when product accumulates.");
  b.card("FACT", "Order of the lac operon", "Promoter, operator, lacZ, lacY, lacA (regulatory gene lacI separate, with its own promoter).");
  b.card("FACT", "Products of lacZ, lacY, lacA", "β-galactosidase, lactose permease, transacetylase.");
  b.card("CONCEPT", "Lac operon without lactose", "Repressor binds operator; RNA polymerase blocked; no transcription.");
  b.card("CONCEPT", "Lac operon with lactose", "Lactose binds repressor; shape changes; it leaves the operator; structural genes transcribed.");
  b.card("DEFINITION", "Define **transcription factor**.", "A protein that binds DNA near a promoter to increase or decrease transcription of a gene.");
  b.card("CONCEPT", "Gibberellin and DELLA", "Gibberellin + receptor → DELLA broken down → transcription factor freed → growth or amylase genes transcribed.");
});
