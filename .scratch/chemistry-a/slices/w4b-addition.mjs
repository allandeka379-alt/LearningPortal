// W4b: achem.polymers.addition (both boards; ZIMSEC Form 6, Cambridge AS Level)
import { concept, P, t, ce, Mr, moles, VM_RTP, sfStr, chk } from "../lib.mjs";

concept("achem.polymers.addition", { file: "polymers/addition", keyPrefix: "polymers.addition" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which feature must a molecule have to act as the monomer in addition polymerisation?",
    options: [
      ["a carbon–carbon double bond", "Correct: the π bond of C=C opens so that the monomers can link into a chain."],
      ["two different functional groups, one at each end", "That is needed for condensation polymerisation, such as an amino acid forming a polyamide."],
      ["a hydroxyl group that can lose water", "Losing water is a feature of condensation, not addition, polymerisation."],
      ["a chain of at least six carbon atoms", "Chain length is irrelevant: ethene, with two carbons, polymerises readily."],
    ],
    answer: "A",
    explanation: "Addition polymerisation needs an unsaturated monomer: the C=C double bond opens and the monomers join with no other product.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the repeat unit of poly(propene)?",
    options: [
      ["–CH₂–CH(CH₃)–", "Correct: the two C=C carbons form the backbone and the methyl group hangs off it."],
      ["–CH₂–CH₂–CH₂–", "This puts the methyl carbon into the chain; it is just poly(ethene) written in threes."],
      ["–CH₂=CH(CH₃)–", "A polymer chain is saturated; the double bond is used up in polymerisation."],
      ["–CH(CH₃)–CH(CH₃)–", "This repeat unit, with a methyl group on every backbone carbon, comes from but-2-ene."],
    ],
    answer: "A",
    explanation: "Propene is CH₂=CHCH₃. Opening the C=C gives –CH₂–CH(CH₃)–: a two-carbon backbone unit carrying a methyl side group.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A section of a polymer is –CH₂–CH(CN)–CH₂–CH(CN)–CH₂–CH(CN)–. What is the monomer?",
    options: [
      [t`$\ce{CH2=CHCN}$`, "Correct: split the carbon backbone into two-carbon units, –CH₂–CH(CN)–, and restore the C=C."],
      [t`$\ce{CH3CH2CN}$`, "Propanenitrile has no C=C, so it cannot undergo addition polymerisation."],
      [t`$\ce{CH2=C(CN)2}$`, "Each repeat unit carries only one CN group, not two on the same carbon."],
      [t`$\ce{CH(CN)=CH(CN)}$`, "That would put a CN group on every backbone carbon, which is not what the section shows."],
    ],
    answer: "A",
    explanation: "The repeat unit is –CH₂–CH(CN)–, so the monomer is propenenitrile, CH₂=CHCN.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which property of poly(ethene) is explained by its chains containing only C–C and C–H single bonds?",
    options: [
      ["It is not attacked by acids, alkalis or microorganisms.", "Correct: strong, non-polar bonds and no polar groups leave nothing for hydrolysis or enzymes to attack."],
      ["It conducts electricity when it is melted.", "Poly(ethene) has no ions or delocalised electrons, so it is an insulator, solid or molten."],
      ["It decolorises bromine water at room temperature.", "There is no C=C left in the polymer, so it does not react with bromine water."],
      ["It dissolves readily in water to form a neutral solution.", "A non-polar polymer is insoluble in water."],
    ],
    answer: "A",
    explanation: "The saturated, non-polar backbone makes poly(alkene)s chemically inert and non-biodegradable.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the addition polymerisation of chloroethene are correct?\n\n1. The empirical formula of the polymer is the same as that of the monomer.\n2. Hydrogen chloride is formed as a by-product.\n3. Every second carbon atom in the polymer chain carries a chlorine atom.",
    options: [
      ["1 and 3 only", "Correct: no atoms are lost, so the empirical formula is unchanged, and the Cl atoms alternate along the chain."],
      ["1, 2 and 3", "Statement 2 is false: addition polymerisation forms no by-product. HCl forms when PVC is burned."],
      ["2 and 3 only", "Statement 2 is false and statement 1 is true."],
      ["1 only", "Statement 3 is also true: the repeat unit –CH₂–CHCl– puts Cl on alternate carbons."],
    ],
    answer: "A",
    hints: ["Does addition polymerisation lose any atoms?"],
    explanation: "nCH₂=CHCl → (–CH₂–CHCl–)ₙ. Every atom of the monomer is kept; Cl sits on alternate backbone carbons.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements explain why high-density poly(ethene) is stiffer than low-density poly(ethene)?\n\n1. Its chains have fewer side branches.\n2. Its chains can pack more closely together.\n3. Its chains are joined by covalent cross-links.",
    options: [
      ["1 and 2 only", "Correct: fewer branches allow closer packing, so the intermolecular forces between chains are stronger."],
      ["1, 2 and 3", "Statement 3 is false: poly(ethene) chains are held together by intermolecular forces, not covalent cross-links."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true and is the direct reason for the stronger forces."],
    ],
    answer: "A",
    hints: ["Think about how well straight chains fit together."],
    explanation: "HDPE chains are nearly unbranched, pack closely and attract one another more strongly overall; there are no covalent cross-links in either form.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A polymer has the repeat unit –CF₂–CF₂–. Which statement about it is correct?",
    options: [
      ["It is made by addition polymerisation of tetrafluoroethene.", "Correct: CF₂=CF₂ opens its C=C to give PTFE."],
      ["It is made by condensation of a diol with a dicarboxylic acid.", "That gives a polyester, with ester links in the chain; PTFE has an all-carbon backbone."],
      ["It is easily hydrolysed by aqueous sodium hydroxide.", "PTFE has no polar linkage to hydrolyse; it is extremely unreactive."],
      ["Its monomer is 1,2-difluoroethane, CH₂F–CH₂F.", "That compound is saturated and cannot undergo addition polymerisation."],
    ],
    answer: "A",
    hints: ["Restore the C=C between the two carbons of the repeat unit."],
    explanation: "Repeat unit –CF₂–CF₂– → monomer CF₂=CF₂ (tetrafluoroethene); the polymer, PTFE, is very inert.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which monomer gives a polymer in which every carbon atom of the main chain carries a methyl group?",
    options: [
      ["but-2-ene, CH₃CH=CHCH₃", "Correct: both C=C carbons carry a CH₃, so the repeat unit is –CH(CH₃)–CH(CH₃)–."],
      ["propene, CH₂=CHCH₃", "Only one C=C carbon carries a methyl group, so methyls are on alternate carbons."],
      ["but-1-ene, CH₂=CHCH₂CH₃", "The side group is ethyl, on alternate carbons only."],
      ["2-methylpropene, CH₂=C(CH₃)₂", "Both methyl groups are on the same carbon, so alternate backbone carbons carry two methyls and the others none."],
    ],
    answer: "A",
    hints: ["Look at the groups on each of the two C=C carbons."],
    explanation: "Each C=C carbon becomes a backbone carbon with the same groups. Only but-2-ene puts one CH₃ on each of them.",
  });
  {
    const M = Mr("C3H6");
    const n = 8.4e4 / M;
    chk(n, 2000, 1e-6);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "A sample of poly(propene) has an average relative molecular mass of 84 000. Calculate the average number of propene units in a chain. Ar: H 1.0, C 12.0.",
      value: n,
      wrong: [8.4e4 / 14],
      explanation: `Mr(C₃H₆) = 3(12.0) + 6(1.0) = ${M.toFixed(1)}; number of units = 84 000 ÷ ${M.toFixed(1)} = ${n}. Dividing by 14 (the mass of one CH₂ group) counts CH₂ groups, not monomer units.`,
    });
  }
  {
    const M = Mr("C2F4");
    const pct = (4 * 19.0) / M * 100;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: "Calculate the percentage by mass of fluorine in poly(tetrafluoroethene), PTFE, to three significant figures. Ar: C 12.0, F 19.0.",
      value: pct, sf: 3, unit: "%",
      wrong: [19 / M * 100],
      explanation: `The polymer has the same empirical formula as CF₂=CF₂ (Mr ${M.toFixed(1)}): %F = 4 × 19.0 ÷ ${M.toFixed(1)} × 100 = ${sfStr(pct, 3)}%. Using one F atom instead of four gives ${sfStr(19 / M * 100, 3)}%.`,
    });
  }
  {
    const M = Mr("C2H3Cl");
    const n = moles(2.5, M);
    const v = n * VM_RTP * 1000;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "When PVC, (–CH₂–CHCl–)ₙ, is burned completely, all of its chlorine is released as hydrogen chloride. Calculate the volume of HCl, in cm³ at room conditions, formed from 2.50 g of PVC. Ar: H 1.0, C 12.0, Cl 35.5; molar gas volume 24.0 dm³ mol⁻¹.",
      value: v, sf: 3, unit: "cm³",
      wrong: [n * VM_RTP, moles(2.5, 35.5) * VM_RTP * 1000],
      hints: ["Each repeat unit, of Mr 62.5, contains one Cl atom."],
      explanation: `1. Mr of the repeat unit C₂H₃Cl = ${M.toFixed(1)}.\n2. Amount of repeat units = 2.50 ÷ ${M.toFixed(1)} = ${sfStr(n, 3)} mol, so ${sfStr(n, 3)} mol of HCl forms.\n3. Volume = ${sfStr(n, 3)} × 24 000 = ${sfStr(v, 3)} cm³.\n4. Leaving the answer in dm³ gives ${sfStr(n * VM_RTP, 3)}; dividing 2.50 g by Ar(Cl) treats the whole sample as chlorine.`,
    });
  }
  {
    const M = Mr("C8H8");
    const units = 3.12e5 / M;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Poly(phenylethene) (polystyrene) is made from phenylethene, C₆H₅CH=CH₂. A chain contains 3000 monomer units. Calculate the relative molecular mass of the chain. Ar: H 1.0, C 12.0.",
      value: units * M, sf: 3,
      wrong: [3000 * Mr("C6H5")],
      hints: ["No atoms are lost in addition polymerisation."],
      explanation: `Mr(C₈H₈) = ${M.toFixed(1)}; chain Mr = 3000 × ${M.toFixed(1)} = ${sfStr(units * M, 3)} (3.12 × 10⁵). Using only the C₆H₅ group misses the two backbone carbons.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A sample of poly(ethene) decolorises bromine water because it was made from ethene.",
    answer: false,
    explanation: "False. Polymerisation uses up every C=C, so the polymer is saturated and does not react with bromine water.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each monomer with its addition polymer.",
    pairs: [
      ["CH₂=CHCl", "poly(chloroethene), PVC"],
      ["CF₂=CF₂", "PTFE"],
      ["CH₂=CHC₆H₅", "polystyrene"],
      ["CH₂=CHCH₃", "poly(propene)"],
    ],
    explanation: "The polymer name is poly(monomer name): chloroethene → PVC, tetrafluoroethene → PTFE, phenylethene → polystyrene, propene → poly(propene).",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about the two forms of poly(ethene).",
    template: "Low-density poly(ethene) has many side {{blank:a}}, so its chains cannot pack closely. High-density poly(ethene) is made at {{blank:b}} pressure using a {{blank:c}} catalyst.",
    blanks: [
      { id: "a", accepted: ["branches"], choices: ["branches", "double bonds", "cross-links"] },
      { id: "b", accepted: ["low"], choices: ["low", "very high"] },
      { id: "c", accepted: ["Ziegler-Natta"], choices: ["Ziegler-Natta", "nickel", "phosphoric acid"] },
    ],
    explanation: "LDPE is branched (very high pressure, radical initiator); HDPE has few branches and is made at low pressure with a Ziegler-Natta catalyst.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Give the name of the monomer of the polymer with repeat unit –CH₂–C(CH₃)₂–.",
    accepted: ["2-methylpropene", "methylpropene", "2-methylprop-1-ene", "isobutene", "isobutylene"],
    wrong: ["butane"],
    explanation: "Restore the C=C between the two backbone carbons: CH₂=C(CH₃)₂, 2-methylpropene.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Name the acidic gas formed when PVC is burned that is not formed when poly(ethene) is burned.",
    accepted: ["hydrogen chloride", "HCl", "hydrochloric acid gas"],
    rejected: ["chlorine"],
    hints: ["Which element is in PVC but not in poly(ethene)?"],
    wrong: ["carbon dioxide"],
    explanation: "PVC contains chlorine; on combustion it is released as hydrogen chloride, HCl(g). Both polymers give CO₂.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "State two characteristics of addition polymerisation that distinguish it from condensation polymerisation.",
    points: ["The monomer has a C=C double bond (unsaturated) and the polymer backbone is saturated", "Only one product forms: no small molecule (such as water or HCl) is eliminated, so the polymer has the same empirical formula as the monomer"],
    modelAnswer: "Addition polymerisation uses unsaturated monomers whose C=C bonds open, giving a saturated chain, and the polymer is the only product: no small molecule is lost, so polymer and monomer share the same empirical formula.",
    explanation: "Contrast: condensation polymers need two functional groups per monomer and give off a small molecule.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why poly(alkene)s such as poly(ethene) persist in the environment for a very long time.",
    points: ["The chains contain only C–C and C–H bonds, which are strong", "These bonds are non-polar, and there are no polar groups (such as ester or amide links) that water, acids, alkalis or enzymes can attack", "So microorganisms cannot break them down: poly(alkene)s are non-biodegradable"],
    modelAnswer: "A poly(alkene) chain is made only of strong C–C and C–H bonds. They are essentially non-polar and the chain has no polar functional groups, such as the ester or amide links in condensation polymers, that could be hydrolysed. Enzymes from microorganisms therefore cannot attack the chain, so the polymer is non-biodegradable and lasts for a very long time.",
    hints: ["Compare with polyesters, which can be hydrolysed."],
    explanation: "Inertness comes from strong, non-polar bonds and the lack of hydrolysable groups.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "A town council is deciding how to deal with mixed plastic waste that includes PVC. Discuss two disposal methods, giving one advantage and one disadvantage of each.",
    points: ["Landfill: advantage, e.g. simple and cheap, no gases released immediately", "Landfill: disadvantage, poly(alkene)s are non-biodegradable, so they persist and use up land", "Incineration: advantage, e.g. reduces volume and the energy released can be used", "Incineration: disadvantage, CO₂ (greenhouse gas) and, from PVC, HCl and other toxic chlorinated products, so gases must be cleaned; or recycling as a method: saves resources, but sorting mixed plastics is difficult"],
    modelAnswer: "Landfill is simple and does not release combustion gases, but poly(alkene)s are non-biodegradable, so they stay for decades and use up land. Incineration greatly reduces the volume and the heat can generate electricity, but it releases carbon dioxide, and burning PVC releases hydrogen chloride and can form other toxic chlorinated compounds, so the flue gases must be neutralised and cleaned.",
    hints: ["Think about landfill, incineration and recycling."],
    explanation: "Balanced answers give an advantage and a disadvantage for each method; recycling may be one of the two methods.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "Nyasha was given a section of an unknown polymer, Q: –CH₂–CH(OCOCH₃)–CH₂–CH(OCOCH₃)–CH₂–CH(OCOCH₃)–. Ar: H 1.0, C 12.0, O 16.0.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "What type of polymerisation formed Q?", options: [
        ["addition, because the main chain contains only carbon atoms", "Correct: an all-carbon backbone comes from opening C=C bonds."],
        ["condensation, because the side groups each contain an ester link", "Ester groups in a side chain do not make it a condensation polymer; only links in the main chain would."],
        ["condensation, because water is lost from the side groups", "No water is lost in forming this polymer."],
        ["addition, because the chain contains C=C double bonds", "The backbone of Q is saturated."],
      ], answer: "A", explanation: "The backbone is –C–C–C–C–, so Q is an addition polymer." }),
      P.short({ label: "(b)", marks: 1, stem: "Give the structural formula of the monomer of Q.", accepted: ["CH2=CHOCOCH3", "CH₂=CHOCOCH₃", "CH2=CH(OCOCH3)", "CH3COOCH=CH2", "CH₃COOCH=CH₂", "CH2=CHOOCCH3"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3CH2OCOCH3"], explanation: "Repeat unit –CH₂–CH(OCOCH₃)– → monomer CH₂=CHOCOCH₃ (ethenyl ethanoate)." }),
      P.num({ label: "(c)", marks: 2, stem: "A sample of Q has an average relative molecular mass of 43 000. Calculate the average number of monomer units per chain, to two significant figures.", value: 43000 / Mr("C4H6O2"), sf: 2, wrong: [43000 / Mr("C2H3")], explanation: `Mr(C₄H₆O₂) = ${Mr("C4H6O2").toFixed(1)}; 43 000 ÷ ${Mr("C4H6O2").toFixed(1)} = ${sfStr(43000 / Mr("C4H6O2"), 2)}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Unlike poly(ethene), Q is slowly attacked by hot aqueous sodium hydroxide. Suggest why, and state whether the main chain is broken.", points: ["The ester groups in the side chains are hydrolysed by the alkali (to ethanoate ions and OH groups on the chain)", "The main chain is not broken, because it contains only C–C bonds"], modelAnswer: "The side groups are esters, which alkali hydrolyses, giving ethanoate ions and –OH groups on the chain. The backbone has only C–C bonds, which are not attacked, so the chains stay intact." }),
      P.manual({ label: "(e)", marks: 2, stem: "State the number of repeat units shown in the section, and explain why Q has no single exact Mr.", points: ["Three repeat units are shown", "Chains stop growing at random, so the sample is a mixture of chain lengths with an average Mr"], modelAnswer: "The section shows three repeat units. Polymer chains terminate at random, so a sample contains chains of many lengths and only an average Mr can be given." }),
    ],
    hints: ["Split the backbone into two-carbon units.", "Mr(monomer) = Mr(repeat unit)."],
    explanation: `Q is an addition polymer of CH₂=CHOCOCH₃; about ${sfStr(43000 / Mr("C4H6O2"), 2)} units per chain; alkali hydrolyses the side-chain esters but not the C–C backbone.`,
  });
  {
    const M = Mr("C2H3Cl");
    const n = moles(5000, M);
    const vHCl = n * VM_RTP;
    const mNaOH = (n * Mr("NaOH")) / 1000;
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "A waste incinerator in Harare burns a mixture of plastics. One batch includes 5.00 kg of PVC. Ar: H 1.0, C 12.0, O 16.0, Na 23.0, Cl 35.5; molar gas volume 24.0 dm³ mol⁻¹.",
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "Write the equation for the polymerisation of chloroethene.", points: ["nCH₂=CHCl → (–CH₂–CHCl–)ₙ, with n on both sides and a saturated repeat unit"], modelAnswer: "nCH₂=CHCl → (–CH₂–CHCl–)ₙ" }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the amount, in mol, of HCl formed if all the chlorine in 5.00 kg of PVC forms HCl.", value: n, unit: "mol", wrong: [n / 1000], explanation: `5.00 kg = 5000 g; 5000 ÷ ${M.toFixed(1)} = ${n} mol of repeat units, so ${n} mol HCl. Forgetting to convert kg to g gives ${n / 1000}.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the volume of this HCl, in dm³ at room conditions.", value: vHCl, unit: "dm³", explanation: `${n} × 24.0 = ${vHCl} dm³.` }),
        P.num({ label: "(d)", marks: 2, stem: "The flue gas is passed through sodium hydroxide solution. Calculate the mass of NaOH, in kg, needed to neutralise all of this HCl.", value: mNaOH, sf: 3, unit: "kg", wrong: [mNaOH * 1000], explanation: `NaOH + HCl → NaCl + H₂O (1 : 1); ${n} mol × 40.0 g mol⁻¹ = ${sfStr(mNaOH * 1000, 3)} g = ${sfStr(mNaOH, 3)} kg.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Give two reasons, other than HCl, why burning plastic waste at an open dumpsite is more harmful than burning it in a well-run incinerator.", points: ["Low temperature and limited air give incomplete combustion: carbon monoxide, soot / smoke", "No gas cleaning, so toxic chlorinated compounds (such as dioxins) and other pollutants escape; no energy is recovered"], modelAnswer: "Open burning is at a low temperature with poor air supply, so combustion is incomplete and gives carbon monoxide and soot, and toxic chlorinated organic compounds can form. There is also no scrubbing of the gases and no energy recovery." }),
      ],
      hints: ["Convert kg to g first.", "One HCl per repeat unit."],
      explanation: `${n} mol HCl (${vHCl} dm³), neutralised by ${sfStr(mNaOH, 3)} kg of NaOH.`,
    });
  }
  b.card("DEFINITION", "Addition polymerisation", "Many unsaturated monomers join by opening their C=C bonds to give one long saturated chain and no other product.");
  b.card("DEFINITION", "Repeat unit", "The smallest part of a polymer chain that repeats; for an addition polymer, the two former C=C carbons with their side groups and a continuation bond at each end.");
  b.card("FORMULA", "PVC", "nCH₂=CHCl → (–CH₂–CHCl–)ₙ, poly(chloroethene).");
  b.card("FORMULA", "Poly(propene)", "nCH₂=CHCH₃ → (–CH₂–CH(CH₃)–)ₙ; CH₃ is a side group, not part of the chain.");
  b.card("CONCEPT", "Monomer from a polymer section", "Split the all-carbon backbone into two-carbon units with the same side groups; put a C=C between the two carbons.");
  b.card("CONCEPT", "LDPE vs HDPE", "LDPE: branched chains, very high pressure, radical initiator; soft and flexible. HDPE: few branches, Ziegler-Natta catalyst, low pressure; chains pack closely, dense and rigid.");
  b.card("CONCEPT", "Why poly(alkene)s persist", "Strong, non-polar C–C and C–H bonds and no hydrolysable groups: non-biodegradable.");
  b.card("FACT", "Burning PVC", "Releases HCl (acidic, toxic) as well as CO₂; incomplete combustion can give toxic chlorinated compounds.");
  b.card("FACT", "Empirical formula", "An addition polymer has the same empirical formula (and percentage composition) as its monomer.");
});
