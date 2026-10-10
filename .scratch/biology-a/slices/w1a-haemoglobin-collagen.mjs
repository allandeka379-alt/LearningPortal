// W1a: haemoglobin and collagen.
import { concept, P, t, chk } from "../lib.mjs";

concept("abio.molecules.haemoglobin-collagen", { file: "molecules/haemoglobin-collagen", keyPrefix: "molecules.haemoglobin-collagen" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the structure of one haemoglobin molecule?",
    options: [
      ["Two α-globin chains and two β-globin chains, each with a haem group", "Correct: four polypeptides and four haem groups."],
      ["Three polypeptide chains wound into a triple helix", "This describes collagen."],
      ["One polypeptide chain with four haem groups along it", "Each of the four chains carries one haem group."],
      ["Four α-globin chains sharing one central haem group", "There are two α and two β chains, and four haem groups."],
    ],
    answer: "A",
    explanation: "Haemoglobin has quaternary structure: 2 α + 2 β chains, each with its own haem group containing iron(II).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "To which part of haemoglobin does oxygen bind?",
    options: [
      ["The iron(II) ion in each haem group", "Correct: each Fe²⁺ binds one O₂ reversibly."],
      ["The hydrophilic R groups on the surface", "Surface R groups make haemoglobin soluble; they do not carry oxygen."],
      ["The peptide bonds of the β chains", "Peptide bonds join amino acids; oxygen binds to iron in haem."],
      ["The disulfide bonds between chains", "Oxygen binds to the iron of the haem groups, not to bonds between chains."],
    ],
    answer: "A",
    explanation: "Each haem group holds an iron(II) ion that binds one oxygen molecule, so one haemoglobin carries up to four O₂.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does glycine occur at every third position in a collagen chain?",
    options: [
      ["Its small R group fits in the centre of the triple helix, letting chains pack closely", "Correct: only glycine's single H atom fits in the crowded middle."],
      ["Its sulfur-containing R group forms disulfide bonds between the chains", "Glycine has no sulfur; its R group is a hydrogen atom."],
      ["Its charged R group forms ionic bonds with the water in the tissue", "Glycine's R group is uncharged; collagen is insoluble."],
      ["Its large hydrophobic R group repels water and makes collagen insoluble", "Glycine has the smallest R group of all amino acids."],
    ],
    answer: "A",
    explanation: "Every third amino acid faces the centre of the triple helix, where there is room only for glycine's hydrogen atom; this lets the three chains wind tightly together.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature of haemoglobin makes it soluble in the cytoplasm of red blood cells?",
    options: [
      ["Hydrophilic R groups on the outside of the molecule", "Correct: polar and charged surface groups interact with water."],
      ["Hydrophobic R groups on the outside of the molecule", "Hydrophobic groups on the surface would reduce solubility (as in sickle-cell haemoglobin)."],
      ["Covalent cross-links between neighbouring molecules", "Cross-links are a feature of collagen and make it insoluble."],
      ["A repeating sequence of glycine, proline and hydroxyproline", "This is collagen's sequence."],
    ],
    answer: "A",
    explanation: "Like other globular proteins, haemoglobin folds with hydrophobic R groups inside and hydrophilic R groups outside, so it dissolves.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which feature of collagen gives it the greatest resistance to being pulled apart along a tendon?",
    options: [
      ["Covalent cross-links between staggered molecules in the fibrils", "Correct: cross-links and staggering prevent molecules sliding apart or weak points lining up."],
      ["Hydrophilic R groups on the outside of each molecule", "This is a feature that makes globular proteins soluble."],
      ["Haem groups that bind iron along each chain", "Collagen has no haem groups."],
      ["Irregular folding of each polypeptide chain into a compact globular shape", "Collagen is fibrous, with long, regular chains."],
    ],
    answer: "A",
    explanation: "Hydrogen bonds hold each triple helix together, but covalent cross-links between molecules, and the staggered ends, give fibrils and fibres their high tensile strength.",
    hints: ["Which bonds are strongest and link separate molecules?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In sickle-cell haemoglobin, the sixth amino acid of the β chain is valine instead of glutamic acid. Why do the molecules stick together at low oxygen concentration?",
    options: [
      ["Valine's non-polar R group on the surface binds hydrophobic regions of other molecules", "Correct: a hydrophobic patch on the outside makes molecules link into fibres."],
      ["Valine forms disulfide bonds with neighbouring haemoglobin molecules", "Valine contains no sulfur and cannot form disulfide bonds."],
      ["Valine removes the iron(II) ions from the haem groups", "The haem groups are unaffected; the change is on the protein surface."],
      ["Valine breaks the peptide bonds of the β chains at low oxygen", "Peptide bonds are not broken; the change is in surface interactions."],
    ],
    answer: "A",
    explanation: "Glutamic acid is charged and hydrophilic; valine is hydrophobic. On the surface of deoxygenated HbS the valine binds to a hydrophobic pocket on another molecule, forming long fibres that distort red cells.",
    hints: ["Compare the R groups of glutamic acid and valine."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Collagen in artery walls must resist the pressure of blood. Which combination of collagen features best explains why it is suited to this role?",
    options: [
      ["Insoluble, high tensile strength and stable for long periods", "Correct: it stays in place in the wall, resists stretching and does not break down quickly."],
      ["Soluble, flexible and able to bind oxygen reversibly", "Collagen is insoluble and does not bind oxygen."],
      ["Globular, compact and quickly replaced by new molecules", "Collagen is fibrous, and its stability is an advantage."],
      ["Elastic recoil, so it stretches and then returns to its original shape", "Recoil is the role of elastic fibres (elastin); collagen resists stretching."],
    ],
    answer: "A",
    explanation: "Collagen does not dissolve in tissue fluid or blood, its cross-linked fibres resist the pulling forces of high pressure, and it is chemically stable. Elastic fibres provide the stretch and recoil of artery walls.",
    hints: ["Separate the roles of collagen and elastic fibres."],
  });
  const o2 = 4 * 250;
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "What is the maximum number of oxygen molecules that 250 haemoglobin molecules can carry?",
    value: o2,
    wrong: ["250", "500"],
    explanation: "Each haemoglobin has four haem groups, each binding one O₂: 250 × 4 = 1000.",
  });
  const bonds = 3 * 1020 - 3;
  chk(bonds, 3057);
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A collagen molecule consists of three polypeptide chains, each of 1020 amino acids. How many peptide bonds does the molecule contain?",
    value: bonds,
    wrong: ["3059", "3060"],
    explanation: "Each chain has 1020 − 1 = 1019 peptide bonds; 3 × 1019 = 3057. Treating it as one chain gives 3059.",
    hints: ["Each chain has one fewer peptide bond than amino acids."],
  });
  const gly = (3 * 1020) / 3;
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "In the same collagen molecule (three chains of 1020 amino acids), glycine is at every third position. How many glycine residues does the molecule contain?",
    value: gly,
    wrong: ["340", "3060"],
    explanation: "Each chain has 1020 ÷ 3 = 340 glycines; three chains have 1020. Giving 340 counts only one chain.",
    hints: ["Find the number in one chain first."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Collagen is a globular protein.",
    answer: false,
    explanation: "False. Collagen is a fibrous, insoluble, structural protein. Haemoglobin is globular.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The haem group of haemoglobin is a prosthetic group.",
    answer: true,
    explanation: "True. Haem is a non-protein group permanently bound to each globin chain and essential for oxygen binding.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature with the protein it describes.",
    pairs: ["Triple helix", "Haem group with iron(II)", "Glycine at every third position", "Two α and two β chains", "Covalent cross-links between molecules", "Soluble in water"],
    right: ["Haemoglobin", "Collagen"],
    rightIndex: [1, 0, 1, 0, 1, 0],
    explanation: "Collagen: triple helix, glycine every third, cross-links. Haemoglobin: haem with Fe²⁺, 2 α + 2 β, soluble.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description.",
    template: "Each collagen molecule is made of {{blank:a}} polypeptide chains. Molecules are joined by covalent cross-links and lie in a {{blank:b}} arrangement to form {{blank:c}}, which are bundled into fibres.",
    blanks: [
      { id: "a", accepted: ["three"], choices: ["two", "three", "four", "six"] },
      { id: "b", accepted: ["staggered"], choices: ["staggered", "branched", "globular", "random"] },
      { id: "c", accepted: ["fibrils"], choices: ["fibrils", "microvilli", "grana", "cristae"] },
    ],
    explanation: "Three chains per molecule; staggered, cross-linked molecules form fibrils; fibrils bundle into fibres.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the metal ion at the centre of each haem group.",
    accepted: ["iron(II)", "iron", "Fe2+", "Fe²⁺", "iron(II) ion", "iron 2+", "ferrous iron", "iron ion"],
    rejected: [{ value: "iron(III)", feedback: "Haem contains iron(II), Fe²⁺; iron(III) cannot bind oxygen." }],
    wrong: ["magnesium"],
    explanation: "**Iron(II)**, Fe²⁺. (Magnesium is at the centre of chlorophyll.)",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Explain how the structure of haemoglobin is related to its function in transporting oxygen.",
    points: [
      "Four haem groups each with iron(II), so up to four oxygen molecules per haemoglobin",
      "Oxygen binds reversibly, so loaded in the lungs and released in respiring tissues",
      "Hydrophilic R groups on the outside make it soluble, so high concentrations are held in red blood cells",
      "Quaternary structure: binding of one oxygen changes shape, making it easier for others to bind (cooperative binding)",
    ],
    modelAnswer: "Each of the four chains has a haem group with an iron(II) ion, so one haemoglobin carries four oxygen molecules. Oxygen binds reversibly, loading where oxygen is plentiful in the lungs and unloading in respiring tissues. Hydrophilic R groups on the surface make haemoglobin soluble, so red cells can hold a high concentration of it. Because the four chains interact, binding of the first oxygen changes the molecule's shape so the next ones bind more easily.",
    explanation: "Each structural feature linked to its benefit.",
    hints: ["Think about haem, solubility and the four chains."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe the structure of collagen, from its primary structure to a collagen fibre.",
    points: [
      "Primary structure: repeating sequence with glycine at every third position (often Gly–Pro–Hyp)",
      "Each chain forms a (left-handed) helix; three chains wind together into a triple helix",
      "Hydrogen bonds between the chains hold the triple helix",
      "Covalent cross-links between neighbouring molecules",
      "Molecules staggered to form fibrils; fibrils bundled into fibres",
    ],
    modelAnswer: "Each polypeptide has a repeating sequence with glycine at every third position, often with proline or hydroxyproline. Each chain coils into a helix, and three chains wind round one another to form a triple helix held by hydrogen bonds. Neighbouring collagen molecules are joined by covalent cross-links and lie staggered, so their ends do not line up, forming fibrils. Many fibrils are bundled into fibres.",
    explanation: "Levels: sequence → chain helix → triple helix → cross-linked staggered fibrils → fibres.",
    hints: ["Work up from the sequence."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Compare the structures of haemoglobin and collagen.",
    points: [
      "Haemoglobin globular / compact; collagen fibrous / long",
      "Haemoglobin four chains (2 α, 2 β); collagen three chains in a triple helix",
      "Haemoglobin has haem prosthetic groups; collagen has none",
      "Haemoglobin irregular sequence / mainly α-helices; collagen repeating sequence with glycine every third (or haemoglobin soluble, collagen insoluble with cross-links)",
    ],
    modelAnswer: "Haemoglobin is a compact globular protein whereas collagen is long and fibrous. Haemoglobin has four polypeptides, two α and two β, while collagen has three chains wound into a triple helix. Haemoglobin has four haem prosthetic groups; collagen has none. Haemoglobin's chains have irregular sequences with many α-helices, whereas collagen's chains have a repeating sequence with glycine at every third position.",
    explanation: "Each comparison names both proteins.",
    hints: ["Shape, number of chains, prosthetic group, sequence."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "Part of the amino acid sequence near the start of the β chain of normal haemoglobin ($Hb^A$) and of sickle-cell haemoglobin ($Hb^S$) is shown.\n\n| Position | 3 | 4 | 5 | 6 | 7 | 8 |\n|---|---|---|---|---|---|---|\n| $Hb^A$ | Leu | Thr | Pro | Glu | Glu | Lys |\n| $Hb^S$ | Leu | Thr | Pro | Val | Glu | Lys |\n\nGlu (glutamic acid) has a negatively charged R group; Val (valine) has a non-polar R group.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the position at which the sequences differ.", accepted: ["6", "six", "position 6", "6th", "sixth"], explanation: "Position 6: Glu in HbA, Val in HbS." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which level of structure has been changed directly by the mutation?", options: [["Primary structure", "Correct: the amino acid sequence differs."], ["Secondary structure only", "Secondary structure may be affected indirectly, but the direct change is in sequence."], ["The haem groups", "Haem is not made of amino acids and is unchanged."], ["Quaternary structure only", "The number of chains (four) is unchanged."]], answer: "A", explanation: "A change of amino acid is a change in primary structure." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain how this single change leads to red blood cells becoming sickle-shaped when oxygen concentration is low.", points: ["Charged / hydrophilic glutamic acid replaced by non-polar / hydrophobic valine on the surface", "At low oxygen, deoxygenated HbS molecules bind to each other via the hydrophobic valine", "Molecules form long fibres / chains (polymerise) and become less soluble", "Fibres distort the red blood cell into a sickle shape"], modelAnswer: "The charged, hydrophilic glutamic acid on the surface is replaced by non-polar valine. When oxygen is low, the valine on one deoxygenated HbS molecule binds to a hydrophobic region of another, so the molecules link into long fibres and come out of solution. These fibres distort the red blood cell into a sickle shape." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest **two** consequences of sickling for the person.", points: ["Less oxygen carried / delivered to tissues (anaemia, tiredness)", "Sickled cells block capillaries (pain, organ damage) or are fragile and destroyed quickly"], modelAnswer: "Less oxygen reaches the tissues, causing anaemia and tiredness, and rigid sickled cells can block small capillaries, causing pain and damage to organs." }),
    ],
    explanation: "One amino acid change in primary structure alters surface R group properties, leading to aggregation of haemoglobin and sickling.",
    hints: ["Compare the properties of the two R groups."],
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A description of a haemoglobin molecule states: 'four polypeptide chains, each folded around a pocket containing a flat ring with an iron(II) ion at its centre; the surface of the molecule is covered with polar and charged R groups.'",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "What is the maximum number of oxygen molecules carried by 750 haemoglobin molecules?", value: 750 * 4, wrong: ["750"], explanation: "Four haem groups per molecule: 750 × 4 = 3000." }),
      P.mcq({ label: "(b)", marks: 1, stem: "The flat ring with an iron(II) ion is best described as:", options: [["a prosthetic group", "Correct: haem is a non-protein group bound to each chain."], ["an active site", "Haemoglobin is not an enzyme."], ["a peptide bond", "Peptide bonds join amino acids."], ["a disulfide bridge", "Disulfide bonds join cysteine R groups."]], answer: "A", explanation: "The haem group is a prosthetic group." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the polar and charged R groups on the surface are important for the function of haemoglobin.", points: ["They interact with water, making haemoglobin soluble", "So a high concentration can be held in the cytoplasm of red blood cells, carrying much oxygen"], modelAnswer: "Polar and charged surface R groups interact with water, so haemoglobin dissolves and red blood cells can carry a very high concentration of it." }),
      P.manual({ label: "(d)", marks: 2, stem: "State **two** ways in which the structure of collagen differs from this description.", points: ["Collagen has three chains (in a triple helix), not four globular chains", "Collagen has no haem / prosthetic group, or is insoluble (no hydrophilic surface), or has glycine every third residue"], modelAnswer: "Collagen has three polypeptide chains wound into a triple helix rather than four globular chains, and it has no prosthetic group." }),
    ],
    explanation: "Four haem groups carry four O₂; hydrophilic surface groups make haemoglobin soluble; collagen is a three-chain fibrous protein without haem.",
    hints: ["One oxygen molecule per haem group."],
  });

  b.card("FACT", "Structure of haemoglobin?", "Globular; 2 α + 2 β globin chains; 4 haem groups each with Fe²⁺; carries up to 4 O₂.");
  b.card("CONCEPT", "Why is haemoglobin soluble?", "Hydrophilic R groups on the outside of the molecule.");
  b.card("DEFINITION", "What is a prosthetic group?", "A non-protein group permanently bound to a protein and needed for its function (e.g. haem).");
  b.card("FACT", "Collagen primary structure feature?", "Glycine at every third position (Gly–X–Y, often with proline and hydroxyproline).");
  b.card("CONCEPT", "Why glycine in collagen?", "Its tiny R group (H) fits in the centre of the triple helix so chains pack tightly.");
  b.card("CONCEPT", "What gives collagen its tensile strength?", "Triple helix with hydrogen bonds; covalent cross-links between molecules; staggered fibrils bundled into fibres.");
  b.card("FACT", "Where is collagen found?", "Tendons, skin, bone, cartilage, artery walls, cornea.");
  b.card("FACT", "Change in sickle-cell haemoglobin?", "Valine replaces glutamic acid at position 6 of the β chain.");
  b.card("CONCEPT", "Haemoglobin v collagen in one line?", "Haemoglobin: globular, soluble, 4 chains + haem, transport. Collagen: fibrous, insoluble, 3-chain triple helix, strength.");
});
