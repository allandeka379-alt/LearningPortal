// W1a: amino acids and protein structure.
import { concept, P, t, chk } from "../lib.mjs";

concept("abio.molecules.protein-structure", { file: "molecules/protein-structure", keyPrefix: "molecules.protein-structure" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which part of an amino acid differs between the 20 amino acids found in proteins?",
    options: [
      ["The R group", "Correct: the R group (side chain) is the only variable part."],
      ["The amine group", "Every amino acid has the same –NH₂ group."],
      ["The carboxyl group", "Every amino acid has the same –COOH group."],
      ["The central carbon atom", "Every amino acid has the same central carbon bonded to H."],
    ],
    answer: "A",
    explanation: "Amino acids share an amine group, a carboxyl group and a hydrogen atom on a central carbon; the R group differs and gives each its properties.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which bonds hold the α-helix of a protein in shape?",
    options: [
      ["Hydrogen bonds between C=O and N–H groups of the backbone", "Correct: secondary structure is held by backbone hydrogen bonds."],
      ["Disulfide bonds between cysteine R groups", "Disulfide bonds help hold tertiary and quaternary structure."],
      ["Ionic bonds between charged R groups", "Ionic bonds between R groups are part of tertiary structure."],
      ["Peptide bonds between neighbouring amino acids", "Peptide bonds form the primary structure; they do not make the coil."],
    ],
    answer: "A",
    explanation: "α-helices and β-pleated sheets are held by hydrogen bonds between the –C=O of one peptide bond and the –N–H of another; R groups are not involved.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which level of protein structure is **not** changed when a protein is denatured by heat?",
    options: [
      ["Primary structure", "Correct: peptide bonds are not broken by denaturation, so the sequence remains."],
      ["Secondary structure", "Hydrogen bonds of helices and sheets are broken by heat."],
      ["Tertiary structure", "Hydrogen and ionic bonds between R groups break, so the 3D shape is lost."],
      ["Quaternary structure", "Bonds between chains break, so chains can separate."],
    ],
    answer: "A",
    explanation: "Denaturation breaks the weaker bonds of secondary, tertiary and quaternary structure. Peptide bonds survive, so the amino acid sequence is unchanged.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which amino acid R group can form disulfide bonds?",
    options: [
      ["Cysteine", "Correct: cysteine R groups contain sulfur, and two of them can form an S–S bond."],
      ["Glycine", "Glycine's R group is a hydrogen atom."],
      ["Alanine", "Alanine's R group is a methyl group, CH₃."],
      ["Valine", "Valine's R group is a non-polar hydrocarbon with no sulfur."],
    ],
    answer: "A",
    explanation: "Disulfide bonds are covalent bonds between the sulfur atoms of two cysteine R groups, in the same chain or in different chains.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a soluble globular protein, where are amino acids with non-polar (hydrophobic) R groups most likely to be found?",
    options: [
      ["Buried in the centre of the molecule, away from water", "Correct: hydrophobic R groups cluster inside; polar and charged R groups face the water."],
      ["On the outer surface of the molecule, facing the water", "Hydrophobic groups on the surface would make the protein less soluble."],
      ["Only at the two ends of the polypeptide chain", "Their position depends on folding, not on the ends of the chain."],
      ["Only in regions of β-pleated sheet", "Hydrophobic R groups occur in helices, sheets and other regions alike."],
    ],
    answer: "A",
    explanation: "Hydrophobic interactions drive non-polar R groups to the centre; hydrophilic R groups on the outside make globular proteins soluble.",
    hints: ["Think about which groups are attracted to water."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "An enzyme works well at pH 7 but loses activity at pH 3, even though no peptide bonds are broken. Which bonds are most likely to have been disrupted?",
    options: [
      ["Ionic and hydrogen bonds between R groups", "Correct: pH changes the charges on R groups, breaking ionic and hydrogen bonds."],
      ["Peptide bonds between amino acids", "The stem states that no peptide bonds were broken."],
      ["Glycosidic bonds within the enzyme", "Proteins do not contain glycosidic bonds in their polypeptide chains."],
      ["Ester bonds between the R groups", "Ester bonds are found in lipids, not in the folding of proteins."],
    ],
    answer: "A",
    explanation: "Extra H⁺ ions at low pH add positive charge to some R groups (such as –COO⁻ → –COOH), so ionic bonds and some hydrogen bonds break; the tertiary structure and active site change.",
    hints: ["What does a change in H⁺ concentration do to charged R groups?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A mutation changes one amino acid in an enzyme, far from the active site, from a charged R group to a non-polar R group. Activity is lost. Which is the best explanation?",
    options: [
      ["A lost ionic bond changes the folding, so the active site changes shape", "Correct: a change anywhere can alter folding and so the shape of the active site."],
      ["The new amino acid binds the substrate in place of the active site", "The change is far from the active site and does not create a new binding site."],
      ["The peptide bonds on either side of the new amino acid are much weaker", "Peptide bonds are the same whichever amino acids they join."],
      ["The enzyme now has a different quaternary structure from a single chain", "A single change in one chain does not create quaternary structure."],
    ],
    answer: "A",
    explanation: "Primary structure determines tertiary structure. Replacing a charged R group can remove an ionic bond that held part of the molecule in place, so the protein folds differently and the active site loses its complementary shape.",
    hints: ["How does primary structure affect tertiary structure?"],
  });
  const tri = 75 + 105 + 121 - 2 * 18;
  chk(tri, 265);
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Glycine (Mr 75), serine (Mr 105) and cysteine (Mr 121) are joined into a tripeptide. Calculate the Mr of the tripeptide (water Mr 18).",
    value: tri,
    wrong: ["301", "283"],
    explanation: "75 + 105 + 121 = 301; two peptide bonds remove 2 × 18 = 36; 301 − 36 = 265. Removing only one water gives 283.",
    hints: ["How many peptide bonds are in a tripeptide?"],
  });
  const bonds = 330 - 3;
  b.num({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "A protein has 330 amino acids in three separate polypeptide chains. How many peptide bonds does it contain?",
    value: bonds,
    wrong: ["329", "330"],
    explanation: "Each chain of n amino acids has n − 1 peptide bonds, so three chains have 330 − 3 = 327. Treating it as one chain gives 329.",
    hints: ["Each chain has one fewer bond than amino acids."],
  });
  const seqs = 20 ** 4;
  chk(seqs, 160000);
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Using all 20 amino acids, how many different sequences of four amino acids (tetrapeptides) are possible?",
    value: seqs,
    wrong: ["80", "8000"],
    explanation: "20 choices at each of 4 positions: 20⁴ = 160 000. Multiplying 20 × 4 gives 80.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A peptide bond is formed by a condensation reaction.",
    answer: true,
    explanation: "True. The carboxyl group of one amino acid and the amine group of another react, releasing a water molecule.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "All proteins have a quaternary structure.",
    answer: false,
    explanation: "False. Only proteins made of two or more polypeptide chains, such as haemoglobin, have quaternary structure; many enzymes are single chains.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each level of protein structure with its description.",
    pairs: [
      ["Primary", "Sequence of amino acids held by peptide bonds"],
      ["Secondary", "α-helix or β-pleated sheet held by backbone hydrogen bonds"],
      ["Tertiary", "Overall 3D folding held by bonds between R groups"],
      ["Quaternary", "Association of two or more polypeptide chains"],
    ],
    explanation: "Sequence → local folding → whole-chain folding → several chains.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about globular and fibrous proteins.",
    template: "Globular proteins are usually {{blank:a}} in water and have {{blank:b}} roles such as enzymes. Fibrous proteins such as keratin are usually {{blank:c}} and have {{blank:d}} roles.",
    blanks: [
      { id: "a", accepted: ["soluble"], choices: ["soluble", "insoluble"] },
      { id: "b", accepted: ["physiological"], choices: ["physiological", "structural"] },
      { id: "c", accepted: ["insoluble"], choices: ["soluble", "insoluble"] },
      { id: "d", accepted: ["structural"], choices: ["physiological", "structural"] },
    ],
    explanation: "Globular: compact, soluble, metabolic roles (enzymes, hormones, antibodies, transport). Fibrous: long, insoluble, structural (collagen, keratin).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the chemical group, written as –NH₂, found at one end of every amino acid.",
    accepted: ["amine group", "amine", "amino group", "amino"],
    wrong: ["carboxyl group"],
    explanation: "The **amine** (amino) group, –NH₂. The other end has the carboxyl group, –COOH.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the tertiary structure of a protein, naming **three** types of bond or interaction that hold it.",
    points: [
      "Further folding / coiling of the polypeptide (including its helices and sheets) into a specific 3D shape",
      "Hydrogen bonds between polar R groups",
      "Ionic bonds between oppositely charged R groups",
      "Disulfide bonds between cysteine R groups (or hydrophobic interactions between non-polar R groups)",
    ],
    modelAnswer: "Tertiary structure is the folding of the whole polypeptide, including its α-helices and β-sheets, into a precise three-dimensional shape. It is held by interactions between R groups: hydrogen bonds between polar R groups, ionic bonds between positively and negatively charged R groups, disulfide bonds between cysteine R groups and hydrophobic interactions between non-polar R groups clustered inside the molecule.",
    explanation: "One mark for the description and one for each correctly described bond (to a maximum of three).",
    hints: ["The bonds are between R groups."],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Explain why boiling an enzyme stops it working, although its primary structure is unchanged.",
    points: [
      "High temperature increases kinetic energy / vibration of the molecule",
      "Hydrogen bonds and ionic bonds (holding secondary / tertiary structure) break",
      "The enzyme unfolds / its tertiary structure changes, so the active site changes shape",
      "Substrate no longer complementary / cannot bind, so no enzyme-substrate complexes (enzyme denatured)",
    ],
    modelAnswer: "Boiling gives the enzyme molecule so much kinetic energy that it vibrates strongly and the hydrogen and ionic bonds holding its secondary and tertiary structure break. The chain unfolds and the active site loses its specific shape, so the substrate is no longer complementary and cannot bind; no enzyme-substrate complexes form. The peptide bonds are not broken, so the primary structure is unchanged.",
    explanation: "Cause (energy) → bonds broken → shape change → loss of function.",
    hints: ["Which bonds are broken, and which are not?"],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Compare the structure and properties of globular and fibrous proteins.",
    points: [
      "Globular compact / spherical; fibrous long strands",
      "Globular usually soluble (hydrophilic R groups outside); fibrous usually insoluble",
      "Globular irregular sequence and physiological roles (e.g. enzymes); fibrous repetitive sequence and structural roles (e.g. collagen)",
    ],
    modelAnswer: "Globular proteins are compact and roughly spherical, while fibrous proteins form long strands. Globular proteins are usually soluble because hydrophilic R groups face outwards, whereas fibrous proteins are insoluble. Globular proteins have irregular sequences and physiological roles such as enzymes, whereas fibrous proteins often have repetitive sequences and structural roles such as collagen.",
    explanation: "Each point compares both types.",
    hints: ["Shape, solubility, sequence, role."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "A short region of a polypeptide has the sequence:\n\nNH₂ – Cys – Lys – Val – Glu – Leu – Cys – Ala – COOH\n\nLysine (Lys) has a positively charged R group, glutamic acid (Glu) a negatively charged R group, valine (Val), leucine (Leu) and alanine (Ala) non-polar R groups, and cysteine (Cys) an R group containing sulfur.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many peptide bonds are in this region?", value: 6, wrong: ["7"], explanation: "Seven amino acids in a chain have six peptide bonds." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which two amino acids could form a covalent bond between their R groups when the chain folds?", options: [["The two cysteines", "Correct: their sulfur-containing R groups can form a disulfide bond."], ["Lysine and glutamic acid", "These form an ionic bond, which is not covalent."], ["Valine and leucine", "Non-polar R groups form hydrophobic interactions, not covalent bonds."], ["Alanine and lysine", "These cannot form a covalent bond between R groups."]], answer: "A", explanation: "Disulfide bonds are covalent S–S bonds between cysteines." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the type of bond that could form between the R groups of lysine and glutamic acid.", accepted: ["ionic bond", "ionic", "ionic bonds", "salt bridge"], explanation: "Opposite charges attract: an ionic bond." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest where valine and leucine are likely to be found in the folded protein, and explain why.", points: ["In the interior / centre of the protein (away from water)", "Non-polar / hydrophobic R groups cluster together, away from water (hydrophobic interactions)"], modelAnswer: "Inside the folded molecule, because their non-polar, hydrophobic R groups are repelled by water and cluster together through hydrophobic interactions." }),
      P.manual({ label: "(e)", marks: 3, stem: "A mutation replaces glutamic acid with valine. Explain how this might change the function of the protein.", points: ["Change in primary structure: charged R group replaced by non-polar R group", "Ionic bond with lysine can no longer form / hydrophobic group may change folding", "Tertiary structure / 3D shape changes, so function changes (e.g. active site or binding site altered, or solubility reduced)"], modelAnswer: "The primary structure changes: a negatively charged R group is replaced by a non-polar one, so the ionic bond with lysine cannot form and the region may fold differently. The tertiary structure, and so the shape of any active or binding site, changes, and the protein may lose its function or become less soluble." }),
    ],
    explanation: "Count bonds as n − 1; identify bond types from R group properties; changes to primary structure alter tertiary structure and function.",
    hints: ["Use the description of each R group."],
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Two amino acids, alanine and serine, react to form a dipeptide.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe how the peptide bond forms.", points: ["The carboxyl (–COOH) group of one amino acid reacts with the amine (–NH₂) group of the other", "Water is removed (condensation)", "C–N / –CO–NH– peptide bond forms"], modelAnswer: "The –OH of the carboxyl group of one amino acid and an H from the amine group of the other are removed as water in a condensation reaction, and a –CO–NH– peptide bond forms between the carbon and the nitrogen." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which type of reaction breaks the dipeptide into amino acids?", options: [["Hydrolysis", "Correct: water is added to break the peptide bond."], ["Condensation", "Condensation forms the bond."], ["Denaturation", "Denaturation changes 3D shape; it does not break peptide bonds."], ["Oxidation", "Peptide bonds are broken by adding water, not oxygen."]], answer: "A", explanation: "Hydrolysis, catalysed by peptidases or by heating with acid." }),
      P.manual({ label: "(c)", marks: 2, stem: "Two different dipeptides can be formed from one alanine and one serine. Explain why.", points: ["Either amino acid can provide the carboxyl group (or amine group)", "So Ala–Ser and Ser–Ala have different sequences (different N- and C-terminal ends)"], modelAnswer: "Either amino acid can provide the carboxyl group, so the dipeptide can be Ala–Ser (alanine at the amine end) or Ser–Ala; the two have different sequences and are different molecules." }),
    ],
    explanation: "Condensation forms peptide bonds; hydrolysis breaks them; order matters, so sequence gives variety.",
    hints: ["Which groups react?"],
  });

  b.card("FACT", "General structure of an amino acid?", "Central C with an amine group (–NH₂), carboxyl group (–COOH), H and a variable R group.");
  b.card("DEFINITION", "Define **primary structure**.", "The sequence of amino acids in a polypeptide, held by peptide bonds.");
  b.card("FACT", "Bonds in secondary structure?", "Hydrogen bonds between C=O and N–H of the backbone (α-helix, β-pleated sheet).");
  b.card("FACT", "Four interactions in tertiary structure?", "Hydrophobic interactions, hydrogen bonds, ionic bonds, disulfide bonds (all between R groups).");
  b.card("DEFINITION", "Define **quaternary structure**.", "Two or more polypeptide chains (sometimes with a prosthetic group) forming one functional protein.");
  b.card("DEFINITION", "Define **denaturation**.", "Loss of a protein's 3D shape when hydrogen, ionic (and other) bonds break; primary structure unchanged; function lost.");
  b.card("CONCEPT", "Globular v fibrous proteins?", "Globular: compact, soluble, physiological (enzymes). Fibrous: long, insoluble, structural (collagen).");
  b.card("FACT", "Which amino acid forms disulfide bonds?", "Cysteine (sulfur-containing R group); S–S bonds are covalent.");
  b.card("FORMULA", "Peptide bonds in a chain of n amino acids?", "n − 1 (one water released per bond).");
});
