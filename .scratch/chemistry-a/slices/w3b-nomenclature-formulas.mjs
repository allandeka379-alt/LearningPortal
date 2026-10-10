// W3b: achem.organic.nomenclature-formulas (both boards; ZIMSEC Form 6, Cambridge AS Level)
import { concept, P, t, Mr, AR, empiricalFormula, same, chk, dpStr } from "../lib.mjs";

concept("achem.organic.nomenclature-formulas", { file: "organic/nomenclature-formulas", keyPrefix: "organic.nomenclature-formulas" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines a homologous series?",
    options: [
      [t`compounds with the same functional group and general formula, successive members differing by $\ce{CH2}$`, "Correct: same functional group, same general formula, successive members differ by CH₂."],
      ["compounds with the same molecular formula but with different structural formulae and different properties", "That is the definition of structural isomers."],
      ["compounds that contain only carbon and hydrogen atoms joined by single covalent bonds", "That describes the alkanes, which are only one homologous series."],
      ["compounds with the same empirical formula and therefore identical physical properties", "Physical properties change gradually along a series; empirical formulae usually differ."],
    ],
    answer: "A",
    explanation: "A homologous series has the same functional group and general formula; members differ by CH₂ and show a trend in physical properties.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`What is the systematic name of $\ce{CH3CH2CH(CH3)CH2CH2CH3}$?`,
    options: [
      ["3-methylhexane", "Correct: the longest chain has six carbons and the methyl group is on carbon 3."],
      ["4-methylhexane", "Numbering from the other end gives 3, the lower number."],
      ["1-ethyl-1-methylbutane", "Substituents on carbon 1 mean the chain was not the longest; it continues through them."],
      ["3-methylpentane", "Count the carbons in the main chain again: there are six."],
    ],
    answer: "A",
    explanation: "Six-carbon chain (hexane); the branch is on carbon 3 → 3-methylhexane.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which compound is a secondary alcohol?",
    options: [
      [t`$\ce{CH3CH2CH(OH)CH3}$`, "Correct: the C–OH carbon is bonded to two other carbons."],
      [t`$\ce{(CH3)2CHCH2OH}$`, "The C–OH carbon is bonded to one carbon (a CH₂OH group): primary, despite the branch."],
      [t`$\ce{(CH3)3COH}$`, "The C–OH carbon carries three methyl groups: tertiary."],
      [t`$\ce{CH3CH2CH2CH2OH}$`, "A CH₂OH group at the end of the chain: primary."],
    ],
    answer: "A",
    explanation: "Butan-2-ol has the OH on a carbon attached to two carbons: secondary.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: t`What is the name of the ester $\ce{CH3CH2CH2COOCH3}$?`,
    options: [
      ["methyl butanoate", "Correct: the methyl group comes from methanol; the four-carbon acid part (including the C=O carbon) is butanoate."],
      ["butyl methanoate", "That would be HCOOCH₂CH₂CH₂CH₃; the alkyl and acid parts are reversed."],
      ["methyl propanoate", "The carbon of the COO group belongs to the acid part, giving four carbons."],
      ["propyl ethanoate", "That would be CH₃COOCH₂CH₂CH₃, a different isomer."],
    ],
    answer: "A",
    explanation: "Alkyl group on the single-bonded O first (methyl), then the acid part with -oate (butanoate).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`What is the systematic name of $\ce{CH3CHBrCH(CH3)CH2Cl}$?`,
    options: [
      ["3-bromo-1-chloro-2-methylbutane", "Correct: numbering from the CH₂Cl end gives locants 1, 2, 3; prefixes in alphabetical order."],
      ["2-bromo-4-chloro-3-methylbutane", "Numbering from the CH₃CHBr end gives locants 2, 3, 4, which are higher than 1, 2, 3."],
      ["1-chloro-2-methyl-3-bromobutane", "Prefixes must be in alphabetical order: bromo, chloro, methyl."],
      ["3-bromo-1-chloro-2-methylpentane", "The longest chain has four carbons, not five."],
    ],
    answer: "A",
    hints: ["Compare the full sets of locants from each end.", "Then list the prefixes alphabetically."],
    explanation: "Chain: C1H₂Cl–C2H(CH₃)–C3HBr–C4H₃. Locants {1, 2, 3} beat {2, 3, 4}. Alphabetical: bromo, chloro, methyl → 3-bromo-1-chloro-2-methylbutane.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Consider the compound pent-2-ene. Which of the statements are correct?\n\n1. Its molecular formula is C₅H₁₀.\n2. Its empirical formula is CH₂.\n3. It has the same general formula as cyclopentane.",
    options: [
      ["1, 2 and 3", "Correct: C₅H₁₀, simplest ratio CH₂, and cycloalkanes also fit CₙH₂ₙ."],
      ["1 and 2 only", "Statement 3 is also true: closing a ring removes two hydrogens, so cycloalkanes are CₙH₂ₙ like alkenes."],
      ["2 and 3 only", "Statement 1 is true: CH₃CH=CHCH₂CH₃ has five carbons and ten hydrogens."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Divide 5 and 10 by their highest common factor.", "How many hydrogens does a ring of five CH₂ groups have?"],
    explanation: "Pent-2-ene CH₃CH=CHCH₂CH₃ = C₅H₁₀, empirical CH₂; cyclopentane C₅H₁₀ also fits CₙH₂ₙ.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A skeletal formula is described as a zigzag of five lines (six line ends and corners) with a double line between the second and third carbon atoms counted from the left end; nothing else is shown. Which of the statements are correct?\n\n1. The compound has six carbon atoms.\n2. The compound is hex-2-ene.\n3. The molecular formula is C₆H₁₀.",
    options: [
      ["1 and 2 only", "Correct: six carbons, C=C starting at carbon 2; the formula is C₆H₁₂, not C₆H₁₀."],
      ["1, 2 and 3", "One C=C gives CₙH₂ₙ = C₆H₁₂; C₆H₁₀ would need two double bonds or a ring."],
      ["2 and 3 only", "Statement 3 is wrong and statement 1 is right."],
      ["1 only", "Statement 2 is also correct: numbering from the left puts the double bond at carbon 2."],
    ],
    answer: "A",
    hints: ["Every end and corner of a skeletal formula is a carbon atom.", "Add hydrogens so each carbon has four bonds."],
    explanation: "Six carbons, one C=C between C2 and C3: CH₃CH=CHCH₂CH₂CH₃, hex-2-ene, C₆H₁₂.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which structural formula represents butanenitrile?",
    options: [
      [t`$\ce{CH3CH2CH2CN}$`, "Correct: four carbons including the carbon of –C≡N."],
      [t`$\ce{CH3CH2CH2CH2CN}$`, "This has five carbons: pentanenitrile."],
      [t`$\ce{CH3CH2CH2CH2NH2}$`, "This is an amine (butylamine), not a nitrile."],
      [t`$\ce{CH3CH2CN}$`, "This has three carbons: propanenitrile."],
    ],
    answer: "A",
    explanation: "The nitrile carbon is part of the chain, so butanenitrile is CH₃CH₂CH₂CN.",
  });
  {
    const nH = 16;
    same(Mr("C7H16"), 7 * AR.C + nH * AR.H, "C7H16");
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: "How many hydrogen atoms are there in one molecule of 2,2-dimethylpentane?",
      value: nH,
      wrong: [12],
      explanation: "2,2-dimethylpentane is CH₃C(CH₃)₂CH₂CH₂CH₃: seven carbons, an alkane, so C₇H₁₆ (CₙH₂ₙ₊₂).",
    });
  }
  {
    const pBr = (AR.Br / Mr("C4H9Br")) * 100;
    const pC = ((4 * AR.C) / Mr("C4H9Br")) * 100;
    b.calc({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: "Calculate the percentage by mass of bromine in 2-bromobutane, CH₃CHBrCH₂CH₃, to one decimal place. Data: Ar C = 12.0, H = 1.0, Br = 79.9.",
      value: pBr, dp: 1, unit: "%",
      wrong: [pC],
      explanation: `1. Molecular formula C₄H₉Br; Mr = 4(12.0) + 9(1.0) + 79.9 = ${dpStr(Mr("C4H9Br"), 1)}.\n2. %Br = 79.9 ÷ ${dpStr(Mr("C4H9Br"), 1)} × 100 = ${dpStr(pBr, 1)}%.\n3. ${dpStr(pC, 1)}% is the percentage of carbon, not bromine.`,
    });
  }
  {
    const e = empiricalFormula({ C: 62.1, H: 10.3, O: 27.6 });
    same(e.ratio, { C: 3, H: 6, O: 1 }, "C3H6O");
    b.short({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A compound contains 62.1% carbon, 10.3% hydrogen and 27.6% oxygen by mass. Data: Ar C = 12.0, H = 1.0, O = 16.0. Give its empirical formula (for example C2H4O).",
      accepted: ["C3H6O", "C3OH6", "C₃H₆O"],
      normalise: ["trim", "collapse_whitespace"],
      wrong: ["C2H4O"],
      hints: ["Divide each percentage by Ar, then by the smallest result."],
      explanation: `C 62.1/12.0 = ${(62.1 / 12).toFixed(3)}; H 10.3/1.0 = 10.3; O 27.6/16.0 = ${(27.6 / 16).toFixed(3)}. Dividing by ${(27.6 / 16).toFixed(3)} gives 3.00 : 5.97 : 1.00, so C₃H₆O (propanal and propanone both have this formula).`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: t`$\ce{(CH3)3COH}$ (2-methylpropan-2-ol) is a tertiary alcohol.`,
    answer: true,
    explanation: "True: the carbon carrying the OH is bonded to three carbon atoms.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Members of a homologous series have similar chemical properties but show a gradual change in physical properties such as boiling point.",
    answer: true,
    explanation: "True: the same functional group gives similar reactions; the growing chain increases the strength of the London (instantaneous dipole–induced dipole) forces, so boiling points rise.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each compound to its homologous series.",
    pairs: [
      [t`$\ce{CH3CH2CHO}$`, "aldehydes"],
      [t`$\ce{CH3COCH2CH3}$`, "ketones"],
      [t`$\ce{HCOOCH2CH3}$`, "esters"],
      [t`$\ce{CH3CH2CH2NH2}$`, "amines"],
      [t`$\ce{CH3CH2COOH}$`, "carboxylic acids"],
    ],
    explanation: "–CHO aldehyde; C=O inside the chain ketone; –COO– between two carbon groups ester; –NH₂ amine; –COOH carboxylic acid.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the general formulae.",
    template: "Alkanes: {{blank:a}}. Alkenes with one double bond: {{blank:b}}. Alcohols with one OH group: {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["CnH2n+2"], choices: ["CnH2n+2", "CnH2n", "CnH2n+1OH", "CnH2n−2"] },
      { id: "b", accepted: ["CnH2n"], choices: ["CnH2n+2", "CnH2n", "CnH2n+1OH", "CnH2n−2"] },
      { id: "c", accepted: ["CnH2n+1OH"], choices: ["CnH2n+2", "CnH2n", "CnH2n+1OH", "CnH2n−2"] },
    ],
    explanation: "Alkanes CₙH₂ₙ₊₂; one C=C removes two H: CₙH₂ₙ; alcohols CₙH₂ₙ₊₁OH.",
  });
  b.short({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`Give the systematic name of $\ce{CH3CH2CH2CHO}$.`,
    accepted: ["butanal", "butan-1-al"],
    wrong: ["propanal"],
    explanation: "Four carbons including the CHO carbon: butanal (the aldehyde carbon is always carbon 1, so no number is needed).",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: t`Give the systematic name of $\ce{(CH3)2CHCH2Br}$.`,
    accepted: ["1-bromo-2-methylpropane", "1 bromo 2 methylpropane"],
    wrong: ["2-methyl-1-bromopropane"],
    hints: ["Number from the end nearest the bromine; list the prefixes alphabetically."],
    explanation: "Three-carbon chain with Br on C1 and a methyl group on C2; bromo before methyl: 1-bromo-2-methylpropane.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why ethanol and propan-1-ol react in similar ways with sodium but have different boiling points.",
    points: ["Both contain the same functional group (–OH), which is responsible for the reaction, so their chemical reactions are similar", "Propan-1-ol has a longer chain (more electrons, larger surface), so stronger London (instantaneous dipole–induced dipole) forces and a higher boiling point"],
    modelAnswer: "They belong to the same homologous series, so both have the –OH group that reacts with sodium. Propan-1-ol has one more CH₂ group, so its molecules have more electrons and a larger contact area; the London forces between them are stronger and more energy is needed to separate them, so it boils at a higher temperature.",
    hints: ["Which part of the molecule reacts, and which part changes along the series?"],
    explanation: "Same functional group → similar reactions; longer chain → stronger London forces → higher boiling point.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe in words the displayed formula and the skeletal formula of propan-2-ol.",
    points: ["Displayed: three carbons in a chain with every bond drawn; the middle carbon bonded to an O which is bonded to an H (O–H drawn)", "Displayed: the end carbons each show three C–H bonds and the middle carbon one C–H bond (8 H in total)", "Skeletal: two lines forming a V (three carbon positions) with an OH attached to the middle corner; no C or H on carbon shown"],
    modelAnswer: "In the displayed formula every atom and bond is shown: C–C–C, the central carbon has one H and an –O–H group, and each terminal carbon has three H atoms. In the skeletal formula two lines meet at an angle (a V shape); the ends and the corner are carbon atoms, and OH is written on the corner.",
    hints: ["Displayed shows every bond; skeletal shows only the carbon framework and functional groups."],
    explanation: "Propan-2-ol is CH₃CH(OH)CH₃.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 2,
    stem: "A student names CH₃CH(C₂H₅)CH₂CH₃ as '2-ethylbutane'. Explain why this name is wrong and give the correct name.",
    points: ["The longest carbon chain was not chosen: the ethyl group continues the chain, giving five carbons", "Correct name: 3-methylpentane"],
    modelAnswer: "An ethyl group on carbon 2 means the longest chain runs through it: CH₃CH₂–CH(CH₃)–CH₂CH₃ has five carbons in the chain with a methyl on carbon 3, so the name is 3-methylpentane.",
    hints: ["Trace every possible chain through the branch."],
    explanation: "Always find the longest continuous chain first.",
  });
  {
    const e = empiricalFormula({ C: 64.9, H: 13.5, O: 21.6 });
    same(e.ratio, { C: 4, H: 10, O: 1 }, "C4H10O");
    chk(Mr("C4H10O"), 74, 1e-9, "Mr C4H10O");
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "Compound X contains 64.9% carbon, 13.5% hydrogen and 21.6% oxygen by mass. Its relative molecular mass is 74. X reacts with sodium to release hydrogen. Data: Ar C = 12.0, H = 1.0, O = 16.0.",
      parts: [
        P.short({ label: "(a)", marks: 2, stem: "Calculate the empirical formula of X (type it, for example C2H6O).", accepted: ["C4H10O", "C4H9OH", "C₄H₁₀O"], normalise: ["trim", "collapse_whitespace"], wrong: ["C2H5O"], explanation: `C 64.9/12.0 = ${(64.9 / 12).toFixed(2)}; H 13.5; O 21.6/16.0 = 1.35; ratio 4.01 : 10.0 : 1 → C₄H₁₀O.` }),
        P.num({ label: "(b)", marks: 1, stem: "The empirical formula mass is 74. By what whole number must the empirical formula be multiplied to give the molecular formula?", value: 1, wrong: [2], explanation: "74 ÷ 74 = 1: the molecular formula is C₄H₁₀O." }),
        P.manual({ label: "(c)", marks: 2, stem: "X is a primary alcohol. Give the structural formulae and names of the two primary alcohols with this molecular formula.", points: ["CH₃CH₂CH₂CH₂OH, butan-1-ol", "(CH₃)₂CHCH₂OH, 2-methylpropan-1-ol"], modelAnswer: "Butan-1-ol, CH₃CH₂CH₂CH₂OH, and 2-methylpropan-1-ol, (CH₃)₂CHCH₂OH." }),
        P.mcq({ label: "(d)", marks: 1, stem: "Which isomer of C₄H₁₀O is a tertiary alcohol?", options: [
          [t`$\ce{(CH3)3COH}$`, "Correct: the C–OH carbon is bonded to three carbons."],
          [t`$\ce{CH3CH2CH(OH)CH3}$`, "This is secondary (butan-2-ol)."],
          [t`$\ce{CH3CH2OCH2CH3}$`, "This is an ether, not an alcohol."],
          [t`$\ce{(CH3)2CHCH2OH}$`, "This is primary."],
        ], answer: "A", explanation: "2-methylpropan-2-ol is tertiary." }),
        P.short({ label: "(e)", marks: 1, stem: t`Name the secondary alcohol $\ce{CH3CH2CH(OH)CH3}$.`, accepted: ["butan-2-ol", "2-butanol", "butan 2 ol"], wrong: ["butan-3-ol"], explanation: "Number from the end nearer the OH: butan-2-ol." }),
        P.tf({ label: "(f)", marks: 1, stem: "All four alcohols with the formula C₄H₁₀O fit the general formula CₙH₂ₙ₊₁OH.", answer: true, explanation: "With n = 4: C₄H₉OH = C₄H₁₀O." }),
      ],
      hints: ["Divide by Ar, then by the smallest value.", "Count the carbons bonded to the C–OH carbon."],
      explanation: "C₄H₁₀O: primary butan-1-ol and 2-methylpropan-1-ol, secondary butan-2-ol, tertiary 2-methylpropan-2-ol.",
    });
  }
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "Give the systematic name of each compound.",
    parts: [
      P.short({ label: "(a)", stem: t`$\ce{CH3CH2CH(CH3)COOH}$`, accepted: ["2-methylbutanoic acid", "2 methylbutanoic acid"], wrong: ["3-methylbutanoic acid"], explanation: "Four carbons including COOH (C1); methyl on C2." }),
      P.short({ label: "(b)", stem: t`$\ce{CH3COCH2CH2CH3}$`, accepted: ["pentan-2-one", "2-pentanone", "pentan 2 one"], wrong: ["pentan-4-one"], explanation: "Five carbons; C=O at carbon 2 from the nearer end." }),
      P.short({ label: "(c)", stem: t`$\ce{CH3CH2CH2NH2}$`, accepted: ["propylamine", "propan-1-amine", "1-aminopropane", "propanamine", "n-propylamine"], wrong: ["propanamide"], explanation: "A three-carbon chain with –NH₂: propylamine (propan-1-amine)." }),
      P.short({ label: "(d)", stem: t`$\ce{CH2=C(CH3)CH3}$`, accepted: ["2-methylpropene", "methylpropene", "2-methylprop-1-ene"], wrong: ["butene"], explanation: "Three-carbon chain containing the C=C, methyl on C2: 2-methylpropene." }),
      P.short({ label: "(e)", stem: t`$\ce{CH3CH2COOCH2CH2CH3}$`, accepted: ["propyl propanoate", "n-propyl propanoate"], wrong: ["propanoyl propane"], explanation: "Propyl from propan-1-ol; propanoate from propanoic acid." }),
      P.short({ label: "(f)", stem: t`$\ce{BrCH2CH2Br}$`, accepted: ["1,2-dibromoethane", "1 2 dibromoethane", "12-dibromoethane"], wrong: ["dibromoethane"], explanation: "Two bromine atoms on carbons 1 and 2 of ethane." }),
    ],
    hints: ["Find the longest chain containing the functional group.", "Count the C of COOH and of C=O in the chain."],
    explanation: "2-methylbutanoic acid; pentan-2-one; propylamine; 2-methylpropene; propyl propanoate; 1,2-dibromoethane.",
  });

  b.card("DEFINITION", "Homologous series", "A family of compounds with the same functional group and general formula; successive members differ by CH₂, have similar chemical properties and a gradual trend in physical properties.");
  b.card("DEFINITION", "Functional group", "The atom or group of atoms responsible for the characteristic reactions of a compound.");
  b.card("DEFINITION", "Saturated and unsaturated", "Saturated: only C–C single bonds. Unsaturated: at least one C=C or C≡C multiple bond.");
  b.card("FORMULA", "General formulae: alkanes, alkenes, alcohols", "Alkanes CₙH₂ₙ₊₂; alkenes CₙH₂ₙ; alcohols CₙH₂ₙ₊₁OH.");
  b.card("CONCEPT", "How is an ester named?", "Alkyl group from the alcohol first, then the acid part with -oate: CH₃COOCH₂CH₃ is ethyl ethanoate.");
  b.card("FACT", "Which carbons count in -al, -oic acid and -nitrile names?", "The carbon of –CHO, –COOH and –C≡N is carbon 1 and counts in the stem: CH₃CH₂CN is propanenitrile.");
  b.card("CONCEPT", "Primary, secondary, tertiary alcohols", "Count the carbons bonded to the C–OH carbon: one (1°), two (2°), three (3°).");
  b.card("CONCEPT", "Reading a skeletal formula", "Each line end and corner is a carbon; hydrogens on carbon are not shown; every other atom (O, N, halogens) and H on them is written.");
  b.card("DEFINITION", "Empirical formula", "The simplest whole-number ratio of atoms of each element in a compound.");
  b.card("CONCEPT", "Naming rules in order", "Longest chain containing the functional group; lowest number for the functional group; prefixes alphabetical with locants; di-/tri- for repeats.");
});
