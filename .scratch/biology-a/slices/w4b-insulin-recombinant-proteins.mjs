// W4b: producing human insulin and other recombinant proteins (both boards; factor VIII and ADA Cambridge detail).
import { concept, P, t, chk, table, sfStr, CAM } from "../lib.mjs";

concept("abio.genetech.insulin-recombinant-proteins", { file: "genetech/insulin-recombinant-proteins", keyPrefix: "genetech.insulin-recombinant-proteins" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "From which cells is mRNA for insulin extracted when making cDNA?",
    options: [
      ["β cells of the islets of Langerhans", "Correct: they make insulin, so contain much of its mRNA."],
      ["α cells of the islets of Langerhans", "α cells make glucagon."],
      ["Hepatocytes in the liver", "Liver cells respond to insulin but do not make it."],
      ["Red blood cells", "Mature red cells have no nucleus and no insulin mRNA."],
    ],
    answer: "A",
    explanation: "Pancreatic **β cells** secrete insulin, so they are rich in insulin mRNA.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an advantage of recombinant human insulin over insulin extracted from pigs?",
    options: [
      ["Its amino acid sequence matches human insulin", "Correct: fewer immune reactions."],
      ["It can be taken by mouth instead of injected", "Insulin is a protein and is still injected."],
      ["It permanently cures type 1 diabetes in most patients", "It treats, but does not cure, diabetes."],
      ["It is made without using any enzymes at all", "Enzymes are used throughout the process."],
    ],
    answer: "A",
    explanation: "Recombinant human insulin is identical to human insulin, so the immune system is less likely to react to it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are selected bacteria grown in a large fermenter?",
    options: [
      ["To grow many cells and so make much insulin", "Correct."],
      ["To remove the introns from the insulin gene", "The cDNA already lacks introns."],
      ["To join the insulin gene into the plasmid", "That is done earlier with ligase."],
      ["To kill the bacteria that did not take up the plasmid", "Selection uses the marker gene."],
    ],
    answer: "A",
    explanation: "Under controlled conditions, the bacteria multiply rapidly and each expresses the gene.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why must the fermenter and its nutrient medium be sterilised before the transformed bacteria are added?",
    options: [
      ["Other microorganisms would compete and contaminate it", "Correct."],
      ["Heat is needed to activate the insulin gene in the bacteria", "Sterilising is not to activate genes."],
      ["Sterilising adds the oxygen needed by the bacteria", "Aeration supplies oxygen."],
      ["It breaks the bacterial cells open to release the insulin", "Cells are added after sterilising."],
    ],
    answer: "A",
    explanation: "Contaminants would compete for nutrients, lower the yield and could contaminate a medical product.",
    hints: ["What else might grow in a warm nutrient broth?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which step in producing insulin uses DNA polymerase?",
    options: [
      ["Making the second strand of the cDNA", "Correct."],
      ["Making cDNA from the insulin mRNA template", "That uses reverse transcriptase."],
      ["Cutting the plasmid open at one site", "That uses a restriction enzyme."],
      ["Sealing the gene into the opened plasmid", "That uses DNA ligase."],
    ],
    answer: "A",
    explanation: "Reverse transcriptase makes the first cDNA strand; DNA polymerase synthesises the complementary second strand.",
    hints: ["Reverse transcriptase makes only one strand."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Some people prefer recombinant human insulin to pig insulin for religious reasons. Which feature of recombinant insulin explains this?",
    options: [
      ["It is not obtained from animal tissue", "Correct."],
      ["It is more stable at room temperature", "Stability is not a religious reason."],
      ["It is made in human pancreatic cells", "It is made by microorganisms."],
      ["It contains no amino acids", "Insulin is a protein made of amino acids."],
    ],
    answer: "A",
    explanation: "Recombinant insulin is made by microorganisms, so it avoids products from pigs or cattle.",
    hints: ["Where does pig insulin come from?"],
  });
  b.mcq({
    d: 4, skill: "UNDERSTANDING", applies: CAM,
    stem: "Why is recombinant factor VIII made in cultured mammalian cells rather than in bacteria?",
    options: [
      ["Bacteria cannot add the carbohydrate groups that it needs", "Correct: no Golgi body or ER."],
      ["Bacteria cannot transcribe genes that come from human cells", "The genetic code and transcription work across species with a suitable promoter."],
      ["Factor VIII would digest the bacterial cell walls", "Factor VIII is a clotting protein, not an enzyme acting on cell walls."],
      ["Mammalian cells divide much faster than bacteria", "Bacteria divide faster."],
    ],
    answer: "A",
    explanation: "Factor VIII is a large glycoprotein; post-translational modification in the ER and Golgi is needed for activity.",
    hints: ["Which organelles do bacteria lack?"],
  });
  b.mcq({
    d: 4, skill: "APPLICATION", applies: CAM,
    stem: "Why can recombinant adenosine deaminase help a child with ADA deficiency?",
    options: [
      ["It replaces the missing enzyme, so lymphocytes are not killed", "Correct: enzyme replacement therapy."],
      ["It replaces the faulty allele in the child's bone marrow stem cells", "That would be gene therapy, not a recombinant protein."],
      ["It acts as an antibody that destroys the pathogens causing infection", "ADA is an enzyme, not an antibody."],
      ["It stimulates the pancreas to produce more of the hormone insulin", "ADA is unrelated to insulin."],
    ],
    answer: "A",
    explanation: "Without ADA, toxic products accumulate and kill developing T and B lymphocytes; injected recombinant ADA breaks them down.",
    hints: ["What does the missing enzyme normally do?"],
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Insulin from pigs differs from human insulin by one amino acid.",
    answer: true,
    explanation: "True. Cattle insulin differs by three.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The cDNA used to make insulin in bacteria contains the introns of the human insulin gene.",
    answer: false,
    explanation: "False. cDNA is copied from spliced mRNA, so it contains no introns.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each step in insulin production with what happens.",
    pairs: [
      ["Reverse transcription", "Insulin mRNA is copied into cDNA"],
      ["Ligation", "The gene is sealed into the opened plasmid"],
      ["Transformation", "Bacteria take up the recombinant plasmid"],
      ["Selection", "A marker gene identifies cells with the plasmid"],
      ["Downstream processing", "Insulin is extracted and purified"],
    ],
    explanation: "The steps in order: reverse transcription, ligation, transformation, selection, fermentation, downstream processing.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Human insulin has two polypeptide chains, A and B, held together by {{blank:a}} bonds. In the pancreas it is first made as one chain called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["disulfide"], choices: ["disulfide", "glycosidic", "peptide"] },
      { id: "b", accepted: ["proinsulin"], choices: ["proinsulin", "glucagon", "insulin analogue"] },
    ],
    explanation: "Disulfide bonds link the chains; proinsulin is cut to form insulin.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the clotting protein, made as a recombinant protein, that people with haemophilia A lack.",
    accepted: ["factor VIII", "factor 8", "factor eight", "clotting factor VIII", "F8"],
    wrong: ["fibrinogen"],
    explanation: "**Factor VIII**.",
    applies: CAM,
  });

  // Numerical: doubling (new data)
  const n0 = 500, g = 30, hours = 5;
  const divs = (hours * 60) / g;
  const N = n0 * 2 ** divs;
  chk(divs, 10);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A culture contains ${n0} transformed bacteria, which divide every ${g} minutes. Assuming ideal conditions, calculate the number of bacteria after ${hours} hours.`,
    value: N, wrong: [n0 * 2 * divs, n0 * 2 ** hours],
    explanation: `${hours} × 60 ÷ ${g} = ${divs} divisions; ${n0} × 2^${divs} = ${N}. Multiplying by 2 × ${divs} instead of 2^${divs}, or using hours as the number of divisions, are common errors.`,
    hints: ["Work out the number of divisions first."],
  });
  // Calculation: yield
  const vol = 8000, conc = 0.09, vial = 55;
  const mg = chk(Math.round(vol * conc * 1000), 720000);
  const vials = Math.floor(mg / vial);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `In an illustrative process, a ${vol} dm³ fermenter batch yields ${conc} g of purified insulin per dm³. Calculate how many vials containing ${vial} mg each can be completely filled.`,
    value: vials, wrong: [Math.floor((vol * conc) / vial)],
    explanation: t`1. Total insulin $= ${vol} \times ${conc} = ${sfStr(vol * conc, 3)}$ g $= ${mg}$ mg.
2. Number of vials $= ${mg} \div ${vial} = ${sfStr(mg / vial, 6)}$.
3. ${vials} complete vials. Forgetting to convert grams to milligrams gives ${Math.floor((vol * conc) / vial)}.`,
    hints: ["Convert grams to milligrams before dividing."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Outline the steps in producing human insulin using bacteria.",
    points: [
      "Extract insulin mRNA from pancreatic β cells",
      "Reverse transcriptase makes cDNA; DNA polymerase makes it double-stranded (or synthesise the gene)",
      "Cut plasmid with the same restriction enzyme to give complementary sticky ends; add promoter",
      "Insert gene into plasmid with DNA ligase",
      "Transform bacteria (calcium ions / heat shock) and select those with the plasmid using a marker gene",
      "Culture in fermenters; extract and purify the insulin",
    ],
    modelAnswer: "mRNA for insulin is extracted from pancreatic β cells. Reverse transcriptase makes a cDNA copy, which DNA polymerase makes double-stranded. A plasmid is cut with the same restriction enzyme so that it has complementary sticky ends, and the gene, with a bacterial promoter, is inserted and sealed with DNA ligase. Bacteria take up the recombinant plasmid after calcium ion and heat shock treatment, and transformed bacteria are selected using a marker gene. They are grown in large fermenters, and the insulin is extracted and purified.",
    explanation: "One point per step.",
    hints: ["Start with the mRNA."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain four advantages of treating diabetes with recombinant human insulin rather than insulin from cattle.",
    points: [
      "Identical to human insulin, so fewer immune / allergic reactions (cattle insulin differs by three amino acids)",
      "Supply can be increased to meet demand, not limited by animals slaughtered",
      "Pure and consistent between batches / no risk of animal pathogens",
      "Acceptable to people who object to animal products for ethical or religious reasons",
    ],
    modelAnswer: "Recombinant human insulin has exactly the human amino acid sequence, whereas cattle insulin differs by three amino acids, so it causes fewer immune and allergic reactions. Production in fermenters can be scaled up to meet growing demand. It is highly pure and consistent, without the risk of animal proteins or pathogens. It is also acceptable to vegetarians and to people whose religion forbids products from certain animals.",
    explanation: "Feature + consequence for each.",
    hints: ["Think about immunity, supply, purity and ethics."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3, applies: CAM,
    stem: "Explain why recombinant factor VIII is safer for people with haemophilia than factor VIII extracted from donated blood.",
    points: [
      "Extracted factor VIII comes from the plasma of many donors",
      "Risk of transmitting blood-borne viruses such as HIV or hepatitis",
      "Recombinant factor VIII is made in cell culture, not from human blood, so this risk is avoided (and supply is not limited by donations)",
    ],
    modelAnswer: "Factor VIII extracted from blood is pooled from the plasma of many donors, so it carried a risk of transmitting blood-borne viruses such as HIV and hepatitis. Recombinant factor VIII is made by cultured cells, not from human blood, so this risk is removed and supply does not depend on donations.",
    explanation: "Source, risk, avoided.",
    hints: ["Where did factor VIII come from before?"],
  });

  // Practice structured: fermenter data
  const tH = [0, 4, 8, 12, 16, 20, 24];
  const od = [0.05, 0.2, 0.8, 1.9, 2.4, 2.5, 2.5];
  const ins = [0, 2, 9, 28, 47, 55, 56];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Bacteria containing a plasmid with the gene for proinsulin were grown in a fermenter. The cell density (measured as absorbance) and the concentration of proinsulin in the culture were recorded.\n\n${table(["Time / h", ...tH.map(String)], [["Absorbance (cell density)", ...od.map((x) => x.toFixed(2))], ["Proinsulin / mg dm⁻³", ...ins.map(String)]])}`,
    parts: [
      P.manual({
        label: "(a)", marks: 3, stem: "Describe the change in cell density.",
        points: ["Slow increase at first (0.05 to 0.20 in 4 h)", "Rapid / exponential increase from 4 h to 12 h (0.20 to 1.90)", "Levels off at 2.5 from about 20 h (stationary phase)"],
        modelAnswer: "Cell density rises slowly at first, from 0.05 to 0.20 in the first 4 hours, then rapidly to 1.90 at 12 hours, before levelling off at 2.50 from 20 hours.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Suggest why the cell density levels off.",
        points: ["Nutrients (e.g. glucose) become limiting", "Toxic wastes accumulate / oxygen becomes limiting, so death rate equals division rate"],
        modelAnswer: "Nutrients such as glucose run short and wastes accumulate, so the rate of cell division falls until it equals the death rate.",
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Calculate the mean rate of proinsulin production between 8 h and 16 h, in mg dm⁻³ per hour.",
        value: (ins[4] - ins[2]) / 8, wrong: [ins[4] / 16],
        explanation: `(${ins[4]} − ${ins[2]}) ÷ 8 = ${(ins[4] - ins[2]) / 8} mg dm⁻³ per hour.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain what must be done to the proinsulin after it has been extracted and purified.",
        points: ["Proinsulin is inactive; it must be cut by (protease) enzymes", "To remove the connecting section, leaving the A and B chains linked by disulfide bonds (active insulin)"],
        modelAnswer: "Proinsulin is not active. It is treated with protease enzymes that remove the connecting section of the chain, leaving the A and B chains held together by disulfide bonds as active insulin.",
      }),
    ],
    explanation: "Growth curve, limiting factors and processing of proinsulin.",
    hints: ["Compare growth in each time interval."],
    calculator: true,
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha is writing a flow chart for the production of human insulin by *E. coli*. Her first box says: \"Cut the insulin gene out of a human chromosome with a restriction enzyme.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why this first step would not produce working insulin in *E. coli*.",
        points: ["Genomic gene contains introns", "Bacteria cannot splice / remove introns, so the protein would be wrong"],
        modelAnswer: "The gene on the chromosome contains introns, and bacteria do not splice RNA, so the introns would be translated and the protein would be wrong.",
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Name the enzyme that should be used to make the gene from insulin mRNA instead.",
        accepted: ["reverse transcriptase"], wrong: ["DNA polymerase"],
        explanation: "Reverse transcriptase.",
      }),
      P.mcq({
        label: "(c)", stem: "What is added next to the gene so that *E. coli* transcribes it?",
        options: [
          ["A bacterial promoter", "Correct."],
          ["A human promoter", "Bacterial RNA polymerase does not recognise human promoters."],
          ["A ribosome binding intron", "Bacteria do not use introns."],
          ["A restriction enzyme", "This cuts DNA; it does not start transcription."],
        ],
        answer: "A",
        explanation: "A promoter recognised by bacterial RNA polymerase.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Give two conditions controlled inside the fermenter, with a reason for each.",
        points: ["Temperature kept near the optimum for bacterial enzymes (about 37 °C) / cooling because respiration releases heat", "pH kept constant for enzymes / oxygen supplied by aeration for aerobic respiration / stirring to mix nutrients"],
        modelAnswer: "Temperature is kept near 37 °C, the optimum for the bacteria's enzymes, using a cooling jacket because respiration releases heat. Sterile air is bubbled in to provide oxygen for aerobic respiration, and pH is kept constant for enzyme activity.",
      }),
    ],
    explanation: "Use cDNA and a bacterial promoter; control fermenter conditions.",
    hints: ["Can bacteria remove introns?"],
  });

  b.card("CONCEPT", "Steps in making human insulin", "mRNA → cDNA (reverse transcriptase) → into plasmid (restriction enzyme, ligase) → transform E. coli → select → ferment → purify.");
  b.card("FACT", "Why use cDNA rather than genomic DNA?", "cDNA has no introns; bacteria cannot splice RNA.");
  b.card("CONCEPT", "Advantages of recombinant human insulin", "Identical to human (fewer immune reactions), plentiful supply, pure and consistent, ethically and religiously acceptable.");
  b.card("FACT", "How does animal insulin differ from human insulin?", "Pig: one amino acid different; cattle: three.");
  b.card("DEFINITION", "Define **recombinant protein**.", "A protein made by an organism from a gene transferred into it by genetic engineering.");
  b.card("FACT", "Recombinant factor VIII", "Clotting protein for haemophilia A, made in mammalian cell culture; avoids viruses from donated blood.", undefined, { applies: CAM });
  b.card("FACT", "Recombinant adenosine deaminase", "Enzyme replacement for ADA deficiency (a form of SCID), where toxic products kill lymphocytes.", undefined, { applies: CAM });
  b.card("CONCEPT", "Why use mammalian or yeast cells for some proteins?", "Eukaryotic cells have ER and Golgi to add carbohydrate groups and fold proteins correctly.");
  b.card("DEFINITION", "Define **downstream processing**.", "Extraction and purification of a product from a culture after fermentation.");
});
