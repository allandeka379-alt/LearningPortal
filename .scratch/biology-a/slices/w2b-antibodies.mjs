// W2b: antibodies and monoclonal antibodies.
import { concept, P, t, chk, table, dpStr, CAM } from "../lib.mjs";

concept("abio.immunity.antibodies", { file: "immunity/antibodies", keyPrefix: "immunity.antibodies" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many polypeptide chains make up one antibody molecule?",
    options: [
      ["Four", "Correct: two heavy and two light chains."],
      ["Two", "There are two heavy chains and two light chains."],
      ["Three", "There is no single third chain; there are two of each type."],
      ["One, folded into a Y shape", "An antibody has quaternary structure: more than one chain."],
    ],
    answer: "A",
    explanation: "An antibody has **four** polypeptide chains: two heavy and two light, held by disulfide bonds.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which part of an antibody forms the antigen-binding site?",
    options: [
      ["The variable regions of the heavy and light chains", "Correct: their sequence differs between antibodies."],
      ["The constant regions of the heavy chains in the stem of the Y", "The constant region binds phagocytes, not antigens."],
      ["The hinge region", "The hinge gives flexibility."],
      ["The disulfide bonds", "Disulfide bonds hold the chains together."],
    ],
    answer: "A",
    explanation: "The **variable regions** at the tips of the arms form binding sites complementary to one antigen.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can antibodies cause bacteria to clump together (agglutinate)?",
    options: [
      ["Each antibody molecule has two antigen-binding sites", "Correct: one antibody can bind two bacteria."],
      ["Antibodies are sticky lipids that coat the bacteria", "Antibodies are proteins that bind specific antigens."],
      ["Antibodies kill the bacteria, and dead bacteria stick together", "Agglutination is caused by cross-linking, not death."],
      ["Each antibody has one binding site and a hinge that wraps around bacteria", "An antibody has two binding sites."],
    ],
    answer: "A",
    explanation: "With **two binding sites**, antibodies cross-link pathogens into clumps that phagocytes engulf easily.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the function of the hinge region of an antibody?",
    options: [
      ["It lets the arms move, so both sites can bind antigens at different distances", "Correct: the arms can move apart."],
      ["It forms the site that binds to the antigen", "This is the role of the variable region."],
      ["It joins the antibody to the plasma cell after secretion", "Antibodies are released from plasma cells."],
      ["It contains all of the carbohydrate chains that make the antibody a glycoprotein", "Carbohydrate is attached to heavy chains; the hinge gives flexibility."],
    ],
    answer: "A",
    explanation: "The **hinge** lets the arms move, so one antibody can bind two antigens at different separations.",
    hints: ["Think of what a hinge does."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In the hybridoma method, why are B-cells fused with myeloma cells?",
    options: [
      ["Myeloma cells divide indefinitely, so the hybrid makes one antibody in bulk", "Correct: the hybrid combines antibody production with continuous division."],
      ["Myeloma cells make the antibody and B-cells provide the energy for division", "The B-cell provides the antibody gene; the myeloma cell provides indefinite division."],
      ["Myeloma cells destroy any antigen remaining from the mouse", "This is not the reason for fusion."],
      ["Fusion makes the antibody humanised", "Humanisation is done by genetic engineering, not fusion."],
    ],
    answer: "A",
    explanation: "Plasma cells make one antibody but do not divide; **myeloma** cells divide indefinitely. A hybridoma does both.",
    hints: ["What can each cell do that the other cannot?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a pregnancy test, why does a coloured line appear at the control line even when the woman is not pregnant?",
    options: [
      ["Fixed antibodies there bind the mobile coloured antibodies", "Correct: this shows the liquid has flowed and the antibodies work."],
      ["Immobilised antibodies there bind hCG from the urine of every woman", "Non-pregnant women have little or no hCG; the control line does not detect hCG."],
      ["The control line changes colour when it gets wet", "The line is formed by antibody binding, not water."],
      ["The control line detects a hormone produced by the ovary each month", "The control line detects the mobile antibodies."],
    ],
    answer: "A",
    explanation: "The control line holds antibodies that bind the **mobile antibodies**, so it appears whenever the test runs properly.",
    hints: ["What reaches the control line in every test?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Monoclonal antibodies used as medicines are injected rather than swallowed. Why?",
    options: [
      ["They are proteins, so they would be digested by proteases in the gut", "Correct: they would be hydrolysed to amino acids."],
      ["They are too large to fit through the oesophagus", "Molecular size is not the issue for swallowing."],
      ["Stomach acid would make them bind to food antigens", "The problem is digestion, not binding to food."],
      ["They only work if they are placed directly into a tumour", "They travel in the blood to their target."],
    ],
    answer: "A",
    explanation: "Antibodies are **proteins**; proteases in the stomach and small intestine would hydrolyse them.",
    hints: ["What kind of molecule is an antibody?"],
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "From which organ of an immunised mouse are the antibody-producing cells taken in the hybridoma method?",
    options: [
      ["Spleen", "Correct: the spleen contains many activated B-cells."],
      ["Liver", "The liver is not used as the source."],
      ["Thymus", "The thymus is where T-cells mature."],
      ["Bone marrow, where B-cells first form and mature", "Activated antibody-producing cells are collected from the spleen."],
    ],
    answer: "A",
    explanation: "Activated B-cells (plasma cells) are taken from the **spleen**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Disulfide bonds hold the heavy and light chains of an antibody together.",
    answer: true,
    explanation: "True. Disulfide bonds form between cysteine R groups.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a lateral flow pregnancy test, a test line with no control line means the woman is pregnant.",
    answer: false,
    explanation: "False. Without a control line the test is invalid and must be repeated.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each function of antibodies with its description.",
    pairs: [
      ["Agglutination", "Cross-linking pathogens into clumps"],
      ["Neutralisation", "Binding toxins or viral attachment sites to block them"],
      ["Opsonisation", "Coating pathogens so phagocytes bind them more easily"],
      ["Lysis", "Activating blood proteins that burst bacterial cells"],
    ],
    explanation: "Antibodies mark pathogens and toxins in four main ways.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "To make monoclonal antibodies, B-cells from an immunised mouse are fused with {{blank:a}} cells to form {{blank:b}} cells. Each clone produces antibodies that bind to the {{blank:c}} antigen.",
    blanks: [
      { id: "a", accepted: ["myeloma"], choices: ["myeloma", "red blood", "phagocyte"] },
      { id: "b", accepted: ["hybridoma"], choices: ["hybridoma", "plasma", "memory"] },
      { id: "c", accepted: ["same"], choices: ["same", "different", "self"] },
    ],
    explanation: "Myeloma, hybridoma, the same antigen (monoclonal).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the hormone detected by monoclonal antibodies in a pregnancy test.",
    accepted: ["hCG", "human chorionic gonadotrophin", "human chorionic gonadotropin", "chorionic gonadotrophin"],
    wrong: ["progesterone", "oestrogen"],
    explanation: "**hCG** (human chorionic gonadotrophin), made by the embryo after implantation.",
  });

  const inf = 320, pos = 301;
  const sens = (pos / inf) * 100;
  chk(Number(sens.toFixed(2)), 94.06);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "A new malaria rapid diagnostic test was used on 320 people known (by microscopy) to have malaria. 301 tested positive. Calculate the percentage of infected people that the test detected, to one decimal place.",
    value: sens, dp: 1, unit: "%",
    wrong: [Number(((inf - pos) / inf * 100).toFixed(1))],
    explanation: t`$\dfrac{301}{320} \times 100 = ${dpStr(sens, 2)}\% \approx ${dpStr(sens, 1)}\%$. The ${inf - pos} people missed are false negatives.`,
  });

  const uninf = 500, falsePos = 18;
  const spec = ((uninf - falsePos) / uninf) * 100;
  chk(spec, 96.4);
  calc({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: "The same test was used on 500 people without malaria, and 18 of them tested positive. Calculate the percentage of uninfected people who correctly tested negative, and suggest why a false positive result could cause harm.",
    value: spec, unit: "%",
    wrong: [Number((falsePos / uninf * 100).toFixed(1))],
    explanation: t`1. Correct negatives $= 500 - 18 = 482$.
2. Percentage $= \dfrac{482}{500} \times 100 = ${spec}\%$.
3. ${dpStr(falsePos / uninf * 100, 1)}% is the false positive percentage, not the answer.
4. A false positive could lead to unnecessary antimalarial drugs, while the true cause of the fever (for example pneumonia) is missed.`,
    hints: ["Subtract the false positives first."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the structure of an antibody molecule is related to its function.",
    points: [
      "Variable regions form antigen-binding sites with a shape complementary to one antigen (specific)",
      "Two binding sites allow one antibody to bind two antigens / agglutination",
      "Hinge region gives flexibility so the arms can bind antigens different distances apart",
      "Constant region binds receptors on phagocytes (opsonisation) / disulfide bonds stabilise the four chains",
    ],
    modelAnswer: "Each antibody has two identical antigen-binding sites formed by the variable regions of a heavy and a light chain; their shape is complementary to one antigen, so binding is specific. Having two sites lets one antibody link two pathogens, causing agglutination. A flexible hinge lets the arms move so both sites can bind. The constant region binds receptors on phagocytes, helping them engulf coated pathogens, and disulfide bonds hold the four polypeptides together.",
    explanation: "Pair each feature with its role.",
    hints: ["Work from the tips of the arms to the stem."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 5,
    stem: "Outline how monoclonal antibodies against a particular antigen are produced.",
    points: [
      "Mouse injected with the antigen (immunised); B-cells producing the antibody undergo clonal expansion",
      "Plasma cells / B-cells removed from the spleen",
      "Fused with myeloma (cancer) cells to form hybridomas (using polyethylene glycol / electric pulse)",
      "Hybridomas selected and each cloned and screened for the required antibody",
      "Chosen clone cultured in large volumes; antibody collected and purified",
    ],
    modelAnswer: "A mouse is injected with the antigen, so B-cells that recognise it multiply. Plasma cells are taken from its spleen and fused with myeloma cells using polyethylene glycol, forming hybridoma cells that make antibody and divide indefinitely. Hybridomas are selected, separated and grown as clones, and each is screened to find one making the required antibody. This clone is cultured in large fermenters and the antibody is collected and purified.",
    explanation: "Immunise → spleen → fuse → select and screen → culture.",
    hints: ["Why are myeloma cells needed?"],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Explain how a lateral flow pregnancy test gives a positive result.",
    points: [
      "Urine moves along the strip; hCG binds mobile monoclonal antibodies attached to coloured particles",
      "At the test line, immobilised antibodies bind (a different part of) the hCG",
      "So the hCG-antibody-coloured particle complexes are trapped, forming a coloured line",
      "Excess mobile antibodies bind immobilised antibodies at the control line, showing the test has worked",
    ],
    modelAnswer: "Urine soaks along the strip. Any hCG binds to mobile monoclonal antibodies carrying coloured particles. At the test line, immobilised antibodies bind another part of the hCG molecule, trapping the complexes so a coloured line appears. Mobile antibodies that pass on are trapped at the control line by antibodies that bind them, so a second line shows the test is valid.",
    explanation: "Mobile antibody binds hCG → trapped at test line → control line confirms.",
    hints: ["Which antibodies move and which are fixed?"],
  });

  // Practice structured: antibody structure described
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "An electron micrograph of an antibody molecule, described in words: a Y-shaped molecule. Two long chains (X) run the full length of the Y, joined to each other near the fork. Two shorter chains (Y) lie alongside the upper part of each arm. The tips of both arms (region Z) differ in sequence between antibodies made by different plasma cells; the rest of the molecule (region W) is the same. A flexible section joins the arms to the stem.",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the chains labelled X.",
        accepted: ["heavy chains", "heavy chain", "heavy polypeptide chains", "heavy"],
        wrong: ["light chains"],
        explanation: "The long chains are the **heavy chains**.",
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Name region Z.",
        accepted: ["variable region", "variable regions", "variable", "antigen-binding site", "antigen binding site"],
        wrong: ["constant region"],
        explanation: "Region Z is the **variable region**, forming the antigen-binding site.",
      }),
      P.short({
        label: "(c)", marks: 1, stem: "Name the type of bond that joins the chains together.",
        accepted: ["disulfide", "disulfide bonds", "disulphide", "disulphide bonds", "disulfide bridges", "disulphide bridges"],
        wrong: ["peptide bonds"],
        explanation: "**Disulfide** bonds between cysteine R groups.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why region Z differs between antibodies from different plasma cells.",
        points: ["Different amino acid sequences give different tertiary structures / shapes of binding site", "Each shape is complementary to a different antigen, so each antibody is specific"],
        modelAnswer: "Each plasma cell clone makes a variable region with a different amino acid sequence, which folds into a different shape of binding site. Each shape is complementary to a different antigen.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Name region W and suggest why it is the same in all antibodies of this class.",
        points: ["Constant region", "It binds the same receptors on phagocytes / performs the same functions whatever the antigen"],
        modelAnswer: "The constant region interacts with the same receptors on phagocytes and other defences for every antibody.",
      }),
      P.tf({
        label: "(f)", stem: "True or false: this antibody can bind two different antigens, such as a measles antigen on one arm and a polio antigen on the other.",
        answer: false,
        explanation: "False. Both binding sites are identical, so they bind the same antigen.",
      }),
    ],
    explanation: "Heavy and light chains, variable and constant regions, disulfide bonds.",
    hints: ["The tips of the arms vary; the rest is constant."],
  });

  const lines = [["Test 1", "Yes", "Yes"], ["Test 2", "Yes", "No"], ["Test 3", "No", "Yes"]];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `A nurse at a clinic in Masvingo uses malaria rapid diagnostic tests that detect a *Plasmodium falciparum* antigen in blood. The results of three tests were:\n\n${table(["Test", "Control line visible", "Test line visible"], lines)}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "Which test shows a positive result?",
        options: [
          ["Test 1", "Correct: both lines present, so the test is valid and the antigen was detected."],
          ["Test 2", "Control line only: valid and negative."],
          ["Test 3", "No control line, so the test is invalid."],
          ["All three tests, because each shows at least one line", "A positive result needs both a control line and a test line."],
        ],
        answer: "A",
        explanation: "A valid positive needs both lines.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain what the nurse should conclude from Test 3.",
        points: ["No control line, so the test is invalid / did not work (e.g. blood or buffer did not flow)", "The result cannot be used and the test must be repeated"],
        modelAnswer: "With no control line the test did not run properly, so the test line cannot be trusted; it must be repeated with a new test.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how monoclonal antibodies in the test produce a coloured test line when the patient has *P. falciparum* malaria.",
        points: [
          "Parasite antigen in the blood binds mobile monoclonal antibodies carrying a coloured label",
          "Immobilised monoclonal antibodies at the test line bind the antigen (at a different site)",
          "Complexes are trapped, so the coloured label builds up as a line",
        ],
        modelAnswer: "The parasite antigen binds mobile, coloured monoclonal antibodies. As the mixture flows to the test line, fixed antibodies bind another part of the antigen, trapping the coloured complexes so a line forms.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest two advantages of rapid diagnostic tests over microscopy at a rural clinic.",
        points: ["Quick result (about 15 minutes) / treatment can start at once", "No microscope, electricity or highly trained laboratory staff needed / cheap and portable"],
        modelAnswer: "They give a result in minutes, so treatment can begin immediately, and they need no microscope, electricity or trained microscopist.",
      }),
    ],
    explanation: "Both lines = positive; control only = negative; no control = invalid.",
    hints: ["What does the control line show?"],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3, applies: CAM,
    stem: "Explain how a monoclonal antibody such as trastuzumab can be used to treat some breast cancers.",
    points: [
      "The antibody binds specifically to a receptor protein (HER2) present in large numbers on the cancer cells",
      "This blocks growth signals, slowing division of the cancer cells",
      "It marks the cells for destruction by the immune system (e.g. phagocytes / killer cells), with less harm to normal cells",
    ],
    modelAnswer: "Trastuzumab is a monoclonal antibody complementary to HER2, a receptor present in large numbers on some breast cancer cells. Binding blocks the receptor so the cells receive fewer signals to divide, and the bound antibody marks the cells for destruction by the immune system. Because it is specific, healthy cells are affected less.",
    explanation: "Specific binding → blocked signal → immune destruction.",
    hints: ["What does the antibody bind to?"],
  });

  b.card("FACT", "Structure of an antibody", "Four polypeptides: two heavy, two light; disulfide bonds; variable and constant regions; hinge.");
  b.card("CONCEPT", "Why is an antibody specific?", "Its variable regions form a binding site complementary to one antigen.");
  b.card("CONCEPT", "Why can antibodies agglutinate pathogens?", "Each antibody has two binding sites, so it cross-links pathogens.");
  b.card("DEFINITION", "**Opsonisation**", "Coating a pathogen with antibodies so phagocytes bind and engulf it more easily.");
  b.card("DEFINITION", "**Neutralisation**", "Antibodies (antitoxins) bind toxins or viral attachment sites, blocking their action.");
  b.card("DEFINITION", "What is a **hybridoma**?", "A plasma cell fused with a myeloma cell: makes one antibody and divides indefinitely.");
  b.card("FACT", "Steps to make monoclonal antibodies", "Immunise mouse → spleen cells → fuse with myeloma → select → clone and screen → culture.");
  b.card("CONCEPT", "Pregnancy test lines", "Test line: immobilised antibodies trap hCG-coloured antibody complexes. Control line: binds mobile antibodies; shows test worked.");
  b.card("FACT", "Example of a monoclonal antibody treatment", "Trastuzumab binds HER2 on some breast cancer cells.", null, { applies: CAM });
});
