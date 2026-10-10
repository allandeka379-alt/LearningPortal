// W4b: achem.polymers.condensation (both boards; ZIMSEC Form 6, Cambridge A Level only)
import { concept, P, t, ce, Mr, moles, VM_RTP, sfStr, chk } from "../lib.mjs";

concept("achem.polymers.condensation", { file: "polymers/condensation", keyPrefix: "polymers.condensation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which pair of compounds can react together to form a polyamide?",
    options: [
      ["hexane-1,6-diamine and hexanedioic acid", "Correct: NH₂ groups react with COOH groups at both ends, forming amide links and water."],
      ["ethane-1,2-diol and hexanedioyl dichloride", "A diol and a dioyl dichloride give ester links: a polyester."],
      ["hexane-1,6-diamine and ethane-1,2-diol", "Amines and alcohols do not form a link with each other under these conditions."],
      ["ethene and chloroethene", "These alkenes would form an addition copolymer, with no amide links."],
    ],
    answer: "A",
    explanation: "A polyamide needs amine groups and carboxylic acid (or acyl chloride) groups, each monomer carrying two of them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Ethane-1,2-diol reacts with benzene-1,4-dicarbonyl dichloride, ClOC–C₆H₄–COCl, to form a polyester. Which small molecule is eliminated?",
    options: [
      ["hydrogen chloride", "Correct: Cl from the acyl chloride and H from the OH group leave as HCl."],
      ["water vapour", "Water is lost when the dicarboxylic acid is used, not its dichloride."],
      ["chlorine gas, Cl₂", "Cl₂ is not formed: each Cl leaves with an H atom."],
      ["ammonia", "No amine groups are present, so no ammonia can form."],
    ],
    answer: "A",
    explanation: "R–COCl + HO–R′ → R–CO–O–R′ + HCl. Using the dichloride gives the same polyester as the diacid but releases HCl.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which is the repeat unit of the polymer formed from 6-aminohexanoic acid, H₂N(CH₂)₅COOH?",
    options: [
      ["–NH(CH₂)₅CO–", "Correct: the amine of one molecule links to the acid of the next, losing water."],
      ["–NH(CH₂)₅COO–", "The extra O would mean an ester link; the –OH of the acid is lost as part of water."],
      ["–NH₂(CH₂)₅COOH–", "The repeat unit has no complete NH₂ or COOH groups; they have reacted."],
      ["–NH(CH₂)₆NH–CO(CH₂)₄CO–", "That is nylon-6,6, made from a diamine and a diacid."],
    ],
    answer: "A",
    explanation: "Each molecule loses H from NH₂ and OH from COOH, leaving –NH(CH₂)₅CO–, the repeat unit of nylon-6.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which monomer could form a polyester on its own, without a second monomer?",
    options: [
      [t`$\ce{HOCH2CH2CH2COOH}$`, "Correct: one OH and one COOH in the same molecule, so molecules link head to tail by ester bonds."],
      [t`$\ce{HOCH2CH2CH2CH2OH}$`, "A diol needs a diacid partner; two OH groups cannot form an ester link with each other."],
      [t`$\ce{HOOCCH2CH2COOH}$`, "A diacid needs a diol partner to form ester links."],
      [t`$\ce{H2NCH2CH2COOH}$`, "This aminocarboxylic acid forms a polyamide, not a polyester."],
    ],
    answer: "A",
    explanation: "A hydroxycarboxylic acid carries both groups needed for an ester link, like lactic acid giving poly(lactic acid).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A section of a polymer is –O–CH₂–CO–O–CH₂–CO–O–CH₂–CO–. Which statements are correct?\n\n1. It is a polyester.\n2. It can be made from a single monomer, HOCH₂COOH.\n3. It is formed by addition polymerisation.",
    options: [
      ["1 and 2 only", "Correct: –CO–O– links in the backbone; the repeat unit –O–CH₂–CO– comes from hydroxyethanoic acid."],
      ["1, 2 and 3", "Statement 3 is false: ester links in the backbone mean condensation, with loss of water."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: one molecule carries both OH and COOH."],
    ],
    answer: "A",
    hints: ["Find the links in the main chain."],
    explanation: "The repeat unit –O–CH₂–CO– is a hydroxyacid residue. Ester links in the main chain show condensation polymerisation.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements explain why nylon-6,6 has a higher melting point than poly(ethene) of similar chain length?\n\n1. Hydrogen bonds form between N–H groups on one chain and C=O groups on another.\n2. Nylon chains contain C=C double bonds.\n3. Nylon chains are covalently cross-linked through the amide groups.",
    options: [
      ["1 only", "Correct: inter-chain hydrogen bonds are stronger than the instantaneous dipole forces in poly(ethene)."],
      ["1 and 2 only", "Statement 2 is false: nylon's backbone has amide links and C–C single bonds, no C=C."],
      ["2 and 3 only", "Both are false: no C=C, and no covalent cross-links between nylon chains."],
      ["1, 2 and 3", "Only statement 1 is true."],
    ],
    answer: "A",
    hints: ["What intermolecular forces can an amide group make?"],
    explanation: "N–H···O=C hydrogen bonds between chains need more energy to overcome than the instantaneous dipole–induced dipole forces between poly(ethene) chains.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which monomer or pair of monomers would form an addition polymer rather than a condensation polymer?",
    options: [
      ["propenoic acid, CH₂=CHCOOH, with a radical initiator", "Correct: the C=C opens; COOH stays as a side group on an all-carbon backbone."],
      ["2-aminopropanoic acid, H₂NCH(CH₃)COOH", "An amino acid forms peptide (amide) links with loss of water."],
      ["propane-1,3-diol and propanedioyl dichloride", "OH and COCl groups form ester links, eliminating HCl."],
      ["benzene-1,4-diamine and benzene-1,4-dicarbonyl dichloride", "Amine and acyl chloride groups form amide links (Kevlar), eliminating HCl."],
    ],
    answer: "A",
    hints: ["Which option has a C=C that can open under radical conditions?"],
    explanation: "Only propenoic acid has a C=C; with a radical initiator it gives poly(propenoic acid) by addition.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Kevlar is far stronger than nylon-6,6 for the same mass. Which explanation is best?",
    options: [
      ["Rigid, straight aromatic chains align and form many inter-chain hydrogen bonds.", "Correct: the flat, rigid aromatic chains align closely and are hydrogen bonded along their length."],
      ["Its chains are joined by many covalent cross-links formed from the benzene rings.", "Kevlar chains are not covalently cross-linked; the strength comes from alignment and hydrogen bonding."],
      ["It contains ester links, which are stronger than the amide links in nylon.", "Kevlar is a polyamide, not a polyester."],
      ["Its chains are much shorter, so there is less tangling between molecules.", "Chain length is not the reason; the rigid aromatic units and alignment are."],
    ],
    answer: "A",
    hints: ["Compare the shape of the chains."],
    explanation: "Benzene rings make Kevlar chains rigid and linear; they pack in ordered sheets held by N–H···O=C hydrogen bonds.",
  });
  {
    const M = Mr("C10H8O4");
    const n = 3.84e4 / M;
    chk(n, 200, 1e-6);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "The repeat unit of PET is –O–CH₂CH₂–O–CO–C₆H₄–CO– (formula C₁₀H₈O₄). A PET chain has an average relative molecular mass of 38 400. Calculate the average number of repeat units in the chain. Ar: H 1.0, C 12.0, O 16.0.",
      value: n,
      wrong: [3.84e4 / (Mr("C10H8O4") + 36)],
      explanation: `Mr(C₁₀H₈O₄) = ${M}; 38 400 ÷ ${M} = ${n}. Adding the two water molecules back (using the monomer masses) gives the wrong divisor.`,
    });
  }
  {
    const Mrep = Mr("H2N(CH2)5COOH") - Mr("H2O");
    chk(Mrep, Mr("C6H11NO"), 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: "6-aminohexanoic acid, H₂N(CH₂)₅COOH, has Mr = 131. Calculate the relative mass of the repeat unit of the polymer it forms. Mr(H₂O) = 18.0.",
      value: Mrep,
      wrong: [131 - 36],
      explanation: `One water is lost per amide link, and one link forms per monomer unit: 131 − 18.0 = ${Mrep}. Subtracting two waters (as for a diamine + diacid unit) gives ${131 - 36}.`,
    });
  }
  {
    const nLac = moles(1800, Mr("CH3CH(OH)COOH"));
    const mW = nLac * Mr("H2O");
    const mPoly = 1800 - mW;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "1.80 kg of 2-hydroxypropanoic acid (lactic acid), CH₃CH(OH)COOH, is polymerised completely to poly(lactic acid). Treat the chain as long enough to ignore its end groups. Calculate the mass of polymer formed, in g. Ar: H 1.0, C 12.0, O 16.0.",
      value: mPoly,
      wrong: [1800, 1800 - 2 * mW],
      hints: ["One water molecule is lost for each monomer unit added."],
      explanation: `1. Mr(lactic acid) = ${Mr("CH3CH(OH)COOH")}; amount = 1800 ÷ ${Mr("CH3CH(OH)COOH")} = ${nLac} mol.\n2. One H₂O is lost per unit: ${nLac} × 18.0 = ${mW} g of water.\n3. Mass of polymer = 1800 − ${mW} = ${mPoly} g (equivalently ${nLac} × 72.0).\n4. Answering 1800 g forgets the water lost (that is true only for addition polymers); subtracting two waters per unit treats it like a diol + diacid.`,
    });
  }
  {
    const nRep = moles(45.2, Mr("C12H22N2O2"));
    const vHCl = 2 * nRep * VM_RTP;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "Nylon-6,6, repeat unit –NH(CH₂)₆NH–CO(CH₂)₄CO– (Mr 226), is made from hexane-1,6-diamine and hexanedioyl dichloride, ClOC(CH₂)₄COCl. Calculate the volume of hydrogen chloride, in dm³ at room conditions, released when 45.2 g of nylon-6,6 forms. Molar gas volume 24.0 dm³ mol⁻¹.",
      value: vHCl, sf: 3, unit: "dm³",
      wrong: [nRep * VM_RTP],
      hints: ["How many amide links are in one repeat unit?"],
      explanation: `1. Amount of repeat units = 45.2 ÷ 226 = ${sfStr(nRep, 3)} mol.\n2. Each repeat unit contains two amide links, each releasing one HCl: ${sfStr(2 * nRep, 3)} mol HCl.\n3. Volume = ${sfStr(2 * nRep, 3)} × 24.0 = ${sfStr(vHCl, 3)} dm³. Using one HCl per repeat unit gives half this value.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A protein is a polyamide in which the monomer residues are joined by peptide links, –CO–NH–.",
    answer: true,
    explanation: "True. Amino acids join by condensation; the amide link between them is called a peptide link.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Ethane-1,2-diol can form a condensation polymer on its own, by losing water between its OH groups.",
    answer: false,
    explanation: "False. A polyester needs carboxylic acid (or acyl chloride) groups as well as OH groups. A diol must react with a diacid or dioyl dichloride.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each monomer or pair of monomers with the polymer formed.",
    pairs: [
      ["benzene-1,4-diamine + benzene-1,4-dicarbonyl dichloride", "Kevlar"],
      ["ethane-1,2-diol + benzene-1,4-dicarboxylic acid", "PET (Terylene)"],
      ["hexane-1,6-diamine + hexanedioic acid", "nylon-6,6"],
      ["2-hydroxypropanoic acid", "poly(lactic acid)"],
    ],
    hints: ["Amines give polyamides; diols and hydroxy acids give polyesters."],
    explanation: "Kevlar and nylon-6,6 are polyamides; PET and poly(lactic acid) are polyesters.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about nylon-6,6.",
    template: "Nylon-6,6 is a {{blank:a}} formed from a diamine and a dicarboxylic acid. Each repeat unit contains {{blank:b}} amide links, so {{blank:c}} molecules of water are eliminated per repeat unit.",
    blanks: [
      { id: "a", accepted: ["polyamide"], choices: ["polyamide", "polyester", "poly(alkene)"] },
      { id: "b", accepted: ["two"], choices: ["one", "two", "four"] },
      { id: "c", accepted: ["two"], choices: ["one", "two", "four"] },
    ],
    explanation: "A diamine + diacid repeat unit is joined into the chain by two amide links, each formed with loss of one water molecule.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "A polymer section is –NH–(CH₂)₄–NH–CO–(CH₂)₈–CO–. Name the dicarboxylic acid used to make it.",
    accepted: ["decanedioic acid", "decane-1,10-dioic acid", "sebacic acid"],
    rejected: ["octanedioic acid"],
    hints: ["Count all the carbon atoms between and including the two C=O groups."],
    wrong: ["octanedioic acid"],
    explanation: "The acid residue –CO–(CH₂)₈–CO– has 10 carbon atoms (8 + 2 carbonyl carbons): HOOC(CH₂)₈COOH, decanedioic acid. The diamine is butane-1,4-diamine.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3,
    stem: "Describe how you would identify the monomers of a condensation polymer from a section of its chain, using a polyester as the example.",
    points: ["Locate the ester links –CO–O– in the main chain", "Break the C–O single bond of each link (between the carbonyl carbon and the oxygen)", "Add OH to the carbonyl carbon to give COOH (or Cl for a dioyl dichloride) and H to the oxygen to give OH; this gives the diol and diacid (or a hydroxy acid)"],
    modelAnswer: "Find each ester link, –CO–O–, in the backbone. Break the bond between the carbonyl carbon and the oxygen. Restore the groups lost as water: add –OH to each carbonyl carbon, giving –COOH, and –H to each oxygen, giving –OH. The pieces are the diol and the dicarboxylic acid (or a hydroxycarboxylic acid if one piece has both groups).",
    hints: ["Reverse the condensation reaction."],
    explanation: "Monomers are found by reversing condensation: hydrolysing each link on paper.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how hydrogen bonding arises between neighbouring chains of nylon-6,6 and why it makes nylon a strong fibre.",
    points: ["N–H is polar: the H is δ+ (N is more electronegative); the O of C=O is δ− with lone pairs", "The δ+ H of an N–H on one chain is attracted to a lone pair on the C=O oxygen of a neighbouring chain", "Many such hydrogen bonds along the chains hold them together strongly, so more force is needed to pull chains apart (stronger than the instantaneous dipole forces in poly(alkene)s)"],
    modelAnswer: "In each amide group the N–H bond is polar, with a δ+ hydrogen, and the carbonyl oxygen is δ− with lone pairs. When chains lie alongside each other, an N–H hydrogen on one chain forms a hydrogen bond to a lone pair on a C=O oxygen of the next chain. Because there are hydrogen bonds at every amide group along the chains, the chains are held together strongly and the fibre resists being pulled apart.",
    hints: ["Which atoms carry δ+ and δ− charges?"],
    explanation: "Name the groups involved, the partial charges and lone pair, and why many bonds give strength.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "Polymer R is used in surgical stitches that dissolve in the body. A section of R is –O–CH(CH₃)–CO–O–CH₂–CO–O–CH(CH₃)–CO–O–CH₂–CO–. Ar: H 1.0, C 12.0, O 16.0.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the type of link joining the residues in R.", accepted: ["ester", "ester link", "ester linkage", "ester group"], wrong: ["amide"], explanation: "–CO–O– is an ester link: R is a polyester." }),
      P.group({ label: "(b)", stem: "R is made from two different hydroxycarboxylic acids. Give the structural formula of", parts: [
        P.short({ label: "(i)", marks: 1, stem: "the monomer with two carbon atoms;", accepted: ["HOCH2COOH", "HOCH₂COOH", "CH2(OH)COOH", "HOOCCH2OH"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3COOH"], explanation: "–O–CH₂–CO– → HOCH₂COOH, hydroxyethanoic acid." }),
        P.short({ label: "(ii)", marks: 1, stem: "the monomer with three carbon atoms.", accepted: ["CH3CH(OH)COOH", "CH₃CH(OH)COOH", "HOCH(CH3)COOH", "CH3CHOHCOOH"], normalise: ["trim", "collapse_whitespace"], wrong: ["HOCH2CH2COOH"], explanation: "–O–CH(CH₃)–CO– → CH₃CH(OH)COOH, 2-hydroxypropanoic acid." }),
      ] }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the relative mass of the section shown, treating it as four residues with continuation bonds at each end.", value: 2 * Mr("C3H4O2") + 2 * Mr("C2H2O2"), wrong: [2 * Mr("CH3CH(OH)COOH") + 2 * Mr("HOCH2COOH")], explanation: `Residues: –OCH(CH₃)CO– = C₃H₄O₂ = ${Mr("C3H4O2")}; –OCH₂CO– = C₂H₂O₂ = ${Mr("C2H2O2")}. Section = 2 × ${Mr("C3H4O2")} + 2 × ${Mr("C2H2O2")} = ${2 * Mr("C3H4O2") + 2 * Mr("C2H2O2")}. Using the monomer masses forgets the water lost.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why R is suitable for stitches that dissolve inside the body, whereas nylon stitches must be removed.", points: ["The ester links in R are slowly hydrolysed by water in the body (body fluids / enzymes) into small molecules", "The hydroxy acids formed are small, soluble and can be removed or metabolised by the body; nylon's amide links are hydrolysed far more slowly"], modelAnswer: "R's ester links are hydrolysed slowly by water and enzymes in body fluids, breaking the polymer into small hydroxy acids that dissolve and are metabolised. Nylon's amide links hydrolyse much more slowly under these conditions, so nylon stitches last and must be removed." }),
      P.mcq({ label: "(e)", marks: 1, stem: "Which compound could replace hydroxyethanoic acid to give a polyamide-type link at the same positions?", options: [
        ["aminoethanoic acid, H₂NCH₂COOH", "Correct: its NH₂ group would form –CO–NH– links in place of –CO–O–."],
        ["ethanoic acid, CH₃COOH", "With only one reactive group it would stop chain growth."],
        ["propane-1,3-diol, HOCH₂CH₂CH₂OH", "A diol forms ester links, not amide links."],
        ["ethanamide, CH₃CONH₂", "The amide is already formed and has no free acid group to link further."],
      ], answer: "A", explanation: "Replacing OH by NH₂ in the bifunctional monomer gives amide links." }),
    ],
    hints: ["Break each –CO–O– link and add H and OH."],
    explanation: "R is a polyester of hydroxyethanoic acid and 2-hydroxypropanoic acid; its ester links hydrolyse slowly in the body.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "Tatenda compares two ways of making the same polyester, S, from propane-1,3-diol, HO(CH₂)₃OH. Method 1 uses butanedioic acid, HOOC(CH₂)₂COOH, heated with an acid catalyst. Method 2 uses butanedioyl dichloride, ClOC(CH₂)₂COCl, at room temperature. Ar: H 1.0, C 12.0, O 16.0, Cl 35.5.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Give the repeat unit of S.", accepted: ["-O(CH2)3O-CO(CH2)2CO-", "–O(CH₂)₃O–CO(CH₂)₂CO–", "-O(CH2)3OCO(CH2)2CO-", "-OCH2CH2CH2OCOCH2CH2CO-", "–OCH₂CH₂CH₂OCOCH₂CH₂CO–", "-CO(CH2)2CO-O(CH2)3O-", "-CO(CH2)2COO(CH2)3O-"], normalise: ["trim", "collapse_whitespace"], wrong: ["-O(CH2)3OCO(CH2)2COOH"], explanation: "Diol residue –O(CH₂)₃O– joined to the acid residue –CO(CH₂)₂CO–." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the relative mass of the repeat unit of S.", value: Mr("HO(CH2)3OH") + Mr("HOOC(CH2)2COOH") - 2 * Mr("H2O"), wrong: [Mr("HO(CH2)3OH") + Mr("HOOC(CH2)2COOH") - Mr("H2O")], explanation: `Mr(diol) = ${Mr("HO(CH2)3OH")}; Mr(diacid) = ${Mr("HOOC(CH2)2COOH")}; repeat unit = ${Mr("HO(CH2)3OH")} + ${Mr("HOOC(CH2)2COOH")} − 2 × 18.0 = ${Mr("HO(CH2)3OH") + Mr("HOOC(CH2)2COOH") - 2 * Mr("H2O")} (C₇H₁₀O₄).` }),
      P.short({ label: "(c)", marks: 1, stem: "Name the small molecule eliminated in method 2.", accepted: ["hydrogen chloride", "HCl"], wrong: ["water"], explanation: "Acyl chloride + alcohol → ester + HCl." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why method 2 is faster and needs no heating or catalyst.", points: ["The acyl chloride carbon is more δ+ (attached to both O and Cl), so it is attacked more readily by the OH group (lone pair on O)", "Cl⁻ is a good leaving group, so the reaction is fast and not reversible, whereas esterification with the acid is slow and reversible"], modelAnswer: "In an acyl chloride the carbonyl carbon is bonded to two electronegative atoms, so it is strongly δ+ and readily attacked by the lone pair on the alcohol oxygen; chloride is a good leaving group and HCl escapes, so the reaction is fast and goes to completion. The carboxylic acid reacts slowly and reversibly and needs heat and an acid catalyst." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest one disadvantage of method 2 and one safety precaution needed with it.", points: ["Disadvantage: acyl chlorides are more expensive / react with moisture in air (hydrolysed) / HCl gas must be dealt with", "Precaution: work in a fume cupboard (HCl and the acyl chloride are corrosive, fumes) and wear gloves and eye protection"], modelAnswer: "Butanedioyl dichloride is more expensive and is hydrolysed by moisture, and the reaction releases corrosive HCl gas. It must be handled in a fume cupboard with gloves and eye protection." }),
      P.mcq({ label: "(f)", marks: 1, stem: "How many molecules of the small molecule are eliminated for each repeat unit of S formed?", options: [
        ["two", "Correct: each repeat unit is linked into the chain by two ester bonds."],
        ["one", "That is true for a single hydroxy acid monomer, not a diol + diacid unit."],
        ["three", "Only two links belong to each repeat unit."],
        ["four", "There are four O atoms in the repeat unit, but only two links are formed per unit."],
      ], answer: "A", explanation: "Two ester links per diol + diacid repeat unit, so two H₂O (method 1) or two HCl (method 2)." }),
      P.manual({ label: "(g)", marks: 3, stem: "Propane-1,3-diol can be replaced by 3-hydroxypropanoic acid, HOCH₂CH₂COOH. Describe how the polymer formed from this single monomer differs from S.", points: ["It is still a polyester (ester links, water eliminated)", "Its repeat unit is –O–CH₂CH₂–CO– (one residue per repeat unit)", "Only one water molecule is lost per repeat unit / no second monomer is needed"], modelAnswer: "The hydroxy acid has both OH and COOH, so it polymerises on its own to a polyester. The repeat unit is –O–CH₂CH₂–CO–, a single residue, and one water molecule is eliminated for each unit added, whereas S has a two-residue repeat unit with two waters lost per unit." }),
    ],
    hints: ["Diol residue + diacid residue = repeat unit.", "Acyl chlorides are more reactive than acids."],
    explanation: `S: repeat unit –O(CH₂)₃O–CO(CH₂)₂CO– of relative mass ${Mr("HO(CH2)3OH") + Mr("HOOC(CH2)2COOH") - 2 * Mr("H2O")}; method 2 eliminates HCl and is faster.`,
  });
  b.card("DEFINITION", "Condensation polymerisation", "Monomers with two reactive groups join, eliminating a small molecule (H₂O or HCl) at each new link.");
  b.card("FORMULA", "Nylon-6,6", "nH₂N(CH₂)₆NH₂ + nHOOC(CH₂)₄COOH → (–NH(CH₂)₆NH–CO(CH₂)₄CO–)ₙ + 2nH₂O");
  b.card("FORMULA", "PET", "Ethane-1,2-diol + benzene-1,4-dicarboxylic acid → (–OCH₂CH₂O–CO–C₆H₄–CO–)ₙ + 2nH₂O");
  b.card("FACT", "Dioyl dichloride instead of diacid", "Gives the same polymer but eliminates HCl; fast at room temperature, no catalyst.");
  b.card("CONCEPT", "Monomers from a condensation polymer", "Break each ester or amide link in the main chain; add OH to the C=O carbon and H to the O or N.");
  b.card("CONCEPT", "Addition or condensation?", "All-carbon backbone and C=C monomer: addition. Ester or amide links in the backbone, small molecule lost: condensation.");
  b.card("FACT", "Poly(lactic acid)", "Polyester from 2-hydroxypropanoic acid; repeat unit –O–CH(CH₃)–CO–; can be made from plant sugars.");
  b.card("CONCEPT", "Kevlar's strength", "Rigid, straight aromatic polyamide chains align side by side, held by many N–H···O=C hydrogen bonds.");
  b.card("FACT", "Water lost per repeat unit", "Diol + diacid or diamine + diacid: two. Hydroxy acid, amino acid or aminocarboxylic acid: one.");
});
