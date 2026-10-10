// W1a: bonding.ionic-metallic — electronegativity, predicting bond type, ionic bonding, metallic bonding.
import { concept, P, t, chk, ZIM } from "../lib.mjs";

// Pauling values from the Cambridge 9701 data booklet
const EN = { H: 2.1, Li: 1.0, Be: 1.6, B: 2.0, C: 2.5, N: 3.0, O: 3.5, F: 4.0, Na: 0.9, Mg: 1.3, Al: 1.5, Si: 1.9, P: 2.2, S: 2.6, Cl: 3.0, K: 0.8, Ca: 1.0 };
const dEN = (a, b2) => Math.round(Math.abs(EN[a] - EN[b2]) * 10) / 10;

concept("achem.bonding.ionic-metallic", { file: "bonding/ionic-metallic", keyPrefix: "bonding.ionic-metallic" }, (b) => {
  // ---- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines electronegativity?",
    options: [
      ["The power of an atom to attract the pair of electrons in a covalent bond towards itself.", "Correct: electronegativity refers to the bonding pair in a covalent bond."],
      ["The energy released when each atom in a mole of gaseous atoms gains an electron to form negative ions.", "This describes electron affinity."],
      ["The energy needed to remove an electron from a gaseous atom to form a positive ion.", "This describes ionisation energy."],
      ["The number of electrons an atom gains when it forms a negative ion in a compound.", "This relates to ionic charge, not electronegativity."],
    ],
    answer: "A",
    explanation: "Electronegativity is the power of an atom to attract the bonding pair of electrons in a covalent bond.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does electronegativity change across Period 3 from sodium to chlorine, and why?",
    options: [
      ["It increases: nuclear charge rises and atomic radius falls, with similar shielding.", "Correct: the bonding pair is held more strongly by a larger, closer nuclear charge."],
      ["It decreases: the atoms gain more electrons, which repel the bonding pair.", "Electronegativity increases across a period."],
      ["It increases: each element has one more electron shell than the one before.", "Across a period no shells are added; electrons enter the same shell."],
      ["It stays the same: all the elements have three occupied shells.", "Same number of shells, but nuclear charge rises, so electronegativity increases (0.9 to 3.0)."],
    ],
    answer: "A",
    explanation: "Across a period nuclear charge increases while shielding is about the same and radius decreases, so the attraction for a bonding pair increases: Na 0.9 → Cl 3.0.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: `Use the electronegativity values (Na ${EN.Na}, Mg ${EN.Mg}, Si ${EN.Si}, P ${EN.P}, O ${EN.O}, S ${EN.S}, Cl ${EN.Cl}). Which compound is most likely to be ionic?`,
    options: [[t`$\ce{Na2O}$`, `Correct: difference ${dEN("Na", "O")}, the largest, between a metal and a non-metal.`], [t`$\ce{MgS}$`, `Difference ${dEN("Mg", "S")}: much smaller than Na–O.`], [t`$\ce{SiO2}$`, `Difference ${dEN("Si", "O")}: polar covalent (silicon dioxide is a giant covalent structure).`], [t`$\ce{PCl3}$`, `Difference ${dEN("P", "Cl")}: polar covalent.`]],
    answer: "A",
    explanation: `The bigger the electronegativity difference, the more ionic the bond: Na–O ${dEN("Na", "O")}, Si–O ${dEN("Si", "O")}, Mg–S ${dEN("Mg", "S")}, P–Cl ${dEN("P", "Cl")}.`,
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which description of metallic bonding is correct?",
    options: [
      ["Electrostatic attraction between a lattice of positive ions and delocalised electrons.", "Correct: this is the standard description."],
      ["Electrostatic attraction between positive and negative ions in a lattice.", "This describes ionic bonding."],
      ["A shared pair of electrons between two metal atoms.", "This describes a covalent bond."],
      ["Attraction between neutral metal atoms caused by temporary dipoles.", "This describes instantaneous dipole-induced dipole forces."],
    ],
    answer: "A",
    explanation: "Metallic bonding: positive ions in a lattice attracted to a sea of delocalised electrons.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can a metal be hammered into a new shape without breaking?",
    options: [
      ["Layers of ions slide but stay attracted to the delocalised electrons.", "Correct: the bonding is non-directional and is maintained after the layers move."],
      ["The delocalised electrons repel the positive ions and push the layers apart.", "The electrons attract the ions; this is what holds the lattice together."],
      ["The positive ions move freely through the sea of electrons.", "The ions stay in a lattice; only layers slide."],
      ["Hammering breaks the metallic bonds, which re-form when the metal cools.", "The bonding is not broken when the layers slide."],
    ],
    answer: "A",
    explanation: "Malleability: layers of ions slide; the delocalised electrons move with them, so attractions are not lost and the metal does not shatter.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which metal has the highest melting point?",
    options: [["aluminium", "Correct: three delocalised electrons per atom and a small 3+ ion give the strongest metallic bonding of the four."], ["magnesium", "Two delocalised electrons per atom: stronger than sodium but weaker than aluminium."], ["sodium", "Only one delocalised electron per atom and a large 1+ ion: weak metallic bonding."], ["potassium", "One delocalised electron and an even larger ion than sodium: the weakest of the four."]],
    answer: "A",
    hints: ["Count the delocalised electrons per atom and consider the size and charge of the ion."],
    explanation: "Metallic bond strength increases with the number of delocalised electrons per atom and the charge density of the ion: K < Na < Mg < Al.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Statements about the dot-and-cross diagram of calcium fluoride, CaF₂:\n\n1. The calcium ion is shown with a 2+ charge.\n2. Each fluoride ion has eight outer electrons.\n3. One fluoride ion has a 2− charge.\n\nWhich of the statements are correct?",
    options: [["1 and 2 only", "Correct: Ca²⁺ and two separate F⁻ ions, each with a full outer shell."], ["1, 2 and 3", "Statement 3 is wrong: each fluorine atom gains one electron, so both ions are F⁻."], ["2 and 3 only", "Statement 1 is correct and statement 3 is wrong."], ["1 only", "Statement 2 is also correct: seven electrons of its own plus one from calcium."]],
    answer: "A",
    hints: ["Calcium loses two electrons, one to each fluorine atom."],
    explanation: "Ca loses two electrons, one to each F atom: [Ca]²⁺ and 2[F]⁻, each fluoride with an octet (seven dots and one cross).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Statements about electronegativity:\n\n1. It decreases down Group 17 because the atoms become larger with more shielding.\n2. A C–H bond (C 2.5, H 2.1) is less polar than a C–O bond (O 3.5).\n3. Two atoms with equal electronegativities form a non-polar bond.\n\nWhich of the statements are correct?",
    options: [["1, 2 and 3", "Correct: all three are true."], ["1 and 2 only", "Statement 3 is also true: equal sharing means no bond dipole."], ["2 and 3 only", "Statement 1 is also true: F 4.0, Cl 3.0."], ["1 only", "Statements 2 and 3 are also true."]],
    answer: "A",
    hints: ["Calculate the two differences in statement 2."],
    explanation: `Down a group: larger atoms, more shielding, lower electronegativity. C–H difference ${dEN("C", "H")} < C–O ${dEN("C", "O")}. Equal electronegativity → electrons shared equally → non-polar.`,
  });

  // ---- numerical
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `Calculate the electronegativity difference in a Ca–O bond (Ca ${EN.Ca}, O ${EN.O}).`,
    value: chk(dEN("Ca", "O"), 2.5), wrong: [4.5],
    explanation: `${EN.O} − ${EN.Ca} = ${dEN("Ca", "O")}: a large difference, so calcium oxide is ionic.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", applies: ZIM,
    stem: "In forming aluminium oxide, Al₂O₃, from its atoms, how many electrons are transferred in total per formula unit?",
    value: chk(2 * 3, 6), wrong: [3, 2],
    explanation: "Two Al atoms each lose three electrons (6 in total); three O atoms each gain two (6 in total).",
  });
  b.num({
    d: 3, skill: "ANALYSIS",
    stem: `Use the values Mg ${EN.Mg}, Al ${EN.Al}, S ${EN.S}, F ${EN.F} and O ${EN.O}. What is the **largest** electronegativity difference between any metal and any non-metal in this list?`,
    value: chk(dEN("Mg", "F"), 2.7), wrong: [dEN("Mg", "O")],
    hints: ["Pair the least electronegative metal with the most electronegative non-metal."],
    explanation: `Least electronegative metal: Mg (${EN.Mg}); most electronegative non-metal: F (${EN.F}); difference ${dEN("Mg", "F")}.`,
  });
  // ---- true/false
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Solid sodium chloride conducts electricity because its ions are charged.",
    answer: false,
    explanation: "False. In the solid the ions are fixed in the lattice and cannot move. Sodium chloride conducts only when molten or dissolved, when the ions are free to move.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Magnesium oxide has a higher melting point than sodium chloride because its ions carry larger charges.",
    answer: true,
    explanation: "True. Mg²⁺ and O²⁻ (charges 2+ and 2−, smaller ions) attract much more strongly than Na⁺ and Cl⁻, so more energy is needed to break the lattice.",
  });
  // ---- matching
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each property of copper with its explanation.",
    pairs: [
      ["conducts electricity as a solid", "delocalised electrons move through the lattice"],
      ["can be drawn into wires", "layers of ions slide while still attracted to the electrons"],
      ["high melting point", "strong attraction between ions and delocalised electrons"],
      ["good conductor of heat", "mobile electrons transfer kinetic energy quickly"],
    ],
    explanation: "Each metallic property follows from the lattice of positive ions in a sea of delocalised electrons.",
  });
  // ---- fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "An ionic bond is the electrostatic {{blank:a}} between oppositely charged ions. In magnesium oxide, each magnesium atom {{blank:b}} two electrons and each oxygen atom {{blank:c}} two electrons.",
    blanks: [
      { id: "a", accepted: ["attraction"], choices: ["attraction", "repulsion", "sharing", "transfer"] },
      { id: "b", accepted: ["loses"], choices: ["loses", "gains", "shares"] },
      { id: "c", accepted: ["gains"], choices: ["loses", "gains", "shares"] },
    ],
    explanation: "Electron transfer makes Mg²⁺ and O²⁻; the bond is the attraction between them.",
  });
  // ---- short
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the most electronegative element.",
    accepted: ["fluorine", "F"],
    wrong: ["oxygen", "chlorine"],
    explanation: "Fluorine (4.0 on the Pauling scale): small atom, little shielding and a high nuclear charge for its size.",
  });
  // ---- self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why electronegativity decreases down Group 17 from fluorine to iodine.",
    points: ["Atomic radius increases / the bonding pair is further from the nucleus", "More inner shells, so more shielding", "These outweigh the increase in nuclear charge, so attraction for the bonding pair decreases"],
    modelAnswer: "Down the group the atoms get larger, so the bonding pair is further from the nucleus, and there are more inner shells shielding it. These effects outweigh the larger nuclear charge, so the attraction for the bonding electrons, and hence the electronegativity, decreases.",
    hints: ["Use radius, shielding and nuclear charge."],
    explanation: "Distance and shielding win over nuclear charge.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3, applies: ZIM,
    stem: "Describe the dot-and-cross diagram for aluminium oxide, Al₂O₃ (outer electrons only).",
    points: ["Two aluminium ions shown as [Al]³⁺ (no outer electrons / empty outer shell)", "Three oxide ions shown as [O]²⁻, each in square brackets", "Each oxide ion has eight outer electrons: six of its own (dots) and two transferred from aluminium (crosses)"],
    modelAnswer: "The diagram shows two [Al]³⁺ ions, each having lost its three outer electrons, and three [O]²⁻ ions in square brackets. Each oxide ion has eight outer electrons: six dots of its own and two crosses gained from the aluminium atoms.",
    hints: ["Six electrons are transferred altogether."],
    explanation: "2 × 3 electrons lost = 3 × 2 electrons gained.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Sodium melts at 98 °C and magnesium at 650 °C (data). Explain the difference in terms of metallic bonding.",
    points: ["Magnesium releases two delocalised electrons per atom, sodium one", "Mg²⁺ ions have a higher charge than Na⁺", "Mg²⁺ ions are smaller than Na⁺ (higher charge density)", "So the attraction between ions and delocalised electrons is stronger in magnesium; more energy is needed to overcome it"],
    modelAnswer: "Each magnesium atom contributes two electrons to the delocalised sea, compared with one from sodium, and the Mg²⁺ ions are smaller and more highly charged than Na⁺ ions. The electrostatic attraction between the ions and the delocalised electrons is therefore stronger in magnesium, so more energy is needed to overcome it and the melting point is higher.",
    hints: ["Compare number of delocalised electrons and ion size and charge."],
    explanation: "More delocalised electrons and smaller, more charged ions → stronger metallic bonding.",
  });
  // ---- practice structured
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Electronegativity values: Li ${EN.Li}, Be ${EN.Be}, B ${EN.B}, C ${EN.C}, N ${EN.N}, O ${EN.O}, F ${EN.F}.`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe and explain the trend in electronegativity from lithium to fluorine.", points: ["Electronegativity increases from Li to F", "Nuclear charge increases and atoms get smaller with similar shielding, so the bonding pair is attracted more strongly"], modelAnswer: "It increases steadily from 1.0 to 4.0, because the nuclear charge increases and the atomic radius decreases while shielding stays about the same, so the bonding pair is attracted more strongly." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the electronegativity difference in the Li–F bond.", value: chk(dEN("Li", "F"), 3), wrong: [5], explanation: `${EN.F} − ${EN.Li} = 3.0.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which bond is the least polar?", options: [["C–N", `Correct: difference ${dEN("C", "N")}.`], ["B–N", `Difference ${dEN("B", "N")}.`], ["C–O", `Difference ${dEN("C", "O")}.`], ["Be–O", `Difference ${dEN("Be", "O")}.`]], answer: "A", explanation: "The smaller the electronegativity difference, the less polar the bond." }),
      P.short({ label: "(d)", marks: 1, stem: "Predict the type of bonding in lithium fluoride.", accepted: ["ionic", "ionic bonding", "ionic bond"], wrong: ["covalent"], explanation: "A difference of 3.0 between a metal and a non-metal: ionic." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why lithium fluoride has a high melting point.", points: ["Giant ionic lattice with strong electrostatic attractions between Li⁺ and F⁻ ions in all directions", "Much energy is needed to overcome these attractions"], modelAnswer: "Lithium fluoride is a giant lattice of Li⁺ and F⁻ ions held by strong electrostatic attractions in all directions, so a large amount of energy is needed to overcome them." }),
      P.manual({ label: "(f)", marks: 1, stem: "State and explain whether solid lithium fluoride conducts electricity.", points: ["No: the ions are held in fixed positions in the lattice and cannot move"], modelAnswer: "It does not conduct, because its ions are fixed in the lattice and cannot move to carry charge." }),
    ],
    hints: ["Use the size of the electronegativity difference to judge polarity."],
    explanation: "Electronegativity rises across Period 2; Li–F (3.0) is ionic; LiF has a giant ionic lattice.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Substance X is a white solid compound of a Group 1 metal and a Group 17 element. It conducts electricity when molten but not when solid. Substance Y is a shiny solid element that conducts electricity both as a solid and when molten.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the type of bonding in X.", accepted: ["ionic", "ionic bonding"], wrong: ["metallic"], explanation: "A Group 1 / Group 17 compound is ionic." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the type of bonding in Y.", accepted: ["metallic", "metallic bonding"], wrong: ["ionic"], explanation: "A shiny element that conducts as a solid is a metal." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why X conducts when molten but not when solid.", points: ["In the solid the ions are fixed in the lattice", "When molten the ions are free to move and carry charge"], modelAnswer: "In solid X the ions are held in fixed positions and cannot move; when X melts the ions become mobile and can carry the current." }),
      P.manual({ label: "(d)", marks: 1, stem: "Explain why Y conducts as a solid.", points: ["Delocalised electrons are free to move through the lattice and carry charge"], modelAnswer: "Y has delocalised electrons that move through the lattice of positive ions and carry the charge." }),
      P.manual({ label: "(e)", marks: 1, stem: "X is potassium chloride. Describe its dot-and-cross diagram (outer electrons only).", points: ["[K]⁺ with no outer electrons shown and [Cl]⁻ with eight outer electrons (seven dots and one cross), both in square brackets with charges"], modelAnswer: "[K]⁺ and [Cl]⁻ in square brackets; the chloride ion has seven dots and one cross." }),
    ],
    hints: ["Which particles move in each case?"],
    explanation: "Ionic compounds conduct when their ions can move; metals conduct through delocalised electrons.",
  });

  // ---- flashcards
  b.card("DEFINITION", "Define **electronegativity**.", "The power of an atom to attract the pair of electrons in a covalent bond towards itself.");
  b.card("DEFINITION", "Define **ionic bonding**.", "Electrostatic attraction between oppositely charged ions.");
  b.card("DEFINITION", "Define **metallic bonding**.", "Electrostatic attraction between a lattice of positive ions and delocalised electrons.");
  b.card("FACT", "Trends in electronegativity?", "Increases across a period (higher nuclear charge, smaller radius); decreases down a group (larger radius, more shielding). F is highest (4.0).");
  b.card("CONCEPT", "Using electronegativity difference to predict bonding?", "0 → non-polar covalent; moderate → polar covalent; large (about 2 or more, metal + non-metal) → mainly ionic.");
  b.card("CONCEPT", "Why do metals conduct electricity?", "Delocalised electrons are free to move through the lattice and carry charge.");
  b.card("CONCEPT", "Why are metals malleable and ductile?", "Layers of positive ions slide over each other; the delocalised electrons keep attracting them, so the lattice does not break.");
  b.card("CONCEPT", "What makes metallic bonding stronger?", "More delocalised electrons per atom and smaller, more highly charged ions (Na < Mg < Al).");
  b.card("FACT", "Describe the dot-and-cross diagram of MgO.", "[Mg]²⁺ and [O]²⁻ in square brackets; the oxide ion has 8 outer electrons: 6 dots + 2 crosses.");
});
