// W1a: bonding.intermolecular-forces — polarity, van der Waals' forces, hydrogen bonding, water, boiling points.
import { concept, P, t, chk, ZIM } from "../lib.mjs";

concept("achem.bonding.intermolecular-forces", { file: "bonding/intermolecular-forces", keyPrefix: "bonding.intermolecular-forces" }, (b) => {
  // ---- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which intermolecular forces exist between molecules of iodine, I₂?",
    options: [["instantaneous dipole-induced dipole forces only", "Correct: I₂ is non-polar, so only temporary dipoles act (strong because I₂ has many electrons)."], ["permanent dipole-permanent dipole forces", "The I–I bond is non-polar, so there is no permanent dipole."], ["hydrogen bonds", "There is no hydrogen in I₂."], ["ionic bonds", "Iodine is a simple molecular element; it has no ions."]],
    answer: "A",
    explanation: "Non-polar molecules attract only through instantaneous dipole-induced dipole forces.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which substance forms hydrogen bonds between its molecules?",
    options: [[t`methanol, $\ce{CH3OH}$`, "Correct: it has an O–H group and lone pairs on oxygen."], [t`methane, $\ce{CH4}$`, "C–H hydrogens are not δ+ enough, and carbon has no lone pair."], [t`hydrogen sulfide, $\ce{H2S}$`, "Sulfur is not electronegative enough for hydrogen bonding."], [t`methoxymethane, $\ce{CH3OCH3}$`, "Its oxygen has lone pairs, but it has no H attached to O, so it cannot hydrogen-bond to itself."]],
    answer: "A",
    explanation: "Hydrogen bonding needs an H on N, O or F and a lone pair on N, O or F: methanol has both.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which molecule is polar?",
    options: [[t`$\ce{CH2Cl2}$`, "Correct: the C–Cl and C–H dipoles do not cancel in this unsymmetrical tetrahedron."], [t`$\ce{CCl4}$`, "Four identical C–Cl dipoles in a regular tetrahedron cancel."], [t`$\ce{CO2}$`, "The two C=O dipoles point in opposite directions and cancel."], [t`$\ce{BF3}$`, "Three B–F dipoles at 120° in a plane cancel."]],
    answer: "A",
    explanation: "A molecule is polar if it has polar bonds arranged unsymmetrically. Dichloromethane has two Cl and two H around carbon, so the dipoles do not cancel.",
  });
  {
    const bp = { F2: -188, Cl2: -34, Br2: 59, I2: 184 };
    b.mcq({
      d: 2, skill: "UNDERSTANDING",
      stem: `Boiling points (data, °C): F₂ ${bp.F2}, Cl₂ ${bp.Cl2}, Br₂ ${bp.Br2}, I₂ ${bp.I2}. What explains this trend?`,
      options: [["More electrons give stronger instantaneous dipole-induced dipole forces.", "Correct: larger electron clouds are more easily polarised."], ["The halogen-halogen covalent bond gets stronger down the group.", "Boiling overcomes intermolecular forces, not covalent bonds (which in fact weaken from Cl₂ to I₂)."], ["Hydrogen bonding increases down the group.", "Halogen molecules contain no hydrogen."], ["Permanent dipoles get larger down the group.", "Halogen molecules are non-polar: both atoms are identical."]],
      answer: "A",
      explanation: "The only intermolecular forces are instantaneous dipole-induced dipole forces, which increase with the number of electrons.",
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Methylamine, CH₃NH₂ (Mr 31), boils at −6 °C and ethane, C₂H₆ (Mr 30), at −89 °C (data). What is the main reason for the difference?",
    options: [["Methylamine molecules form hydrogen bonds; ethane molecules cannot.", "Correct: the N–H groups allow hydrogen bonding; ethane has only instantaneous dipole forces."], ["Methylamine has a larger Mr, so its instantaneous dipole forces are much stronger.", "The Mr values differ by only 1; that cannot explain an 83 °C difference."], ["The covalent bonds in methylamine are stronger than those in ethane.", "Boiling does not break covalent bonds."], ["Ethane molecules are polar, so they repel each other.", "Ethane is non-polar; polar molecules attract, not repel."]],
    answer: "A",
    hints: ["Look for O–H, N–H or H–F groups."],
    explanation: "Similar numbers of electrons (18 each), so the difference comes from hydrogen bonding between methylamine molecules through N–H···N.",
  });
  {
    const bp = { hexane: 69, "2-methylpentane": 60, "2,2-dimethylbutane": 50 };
    b.mcq({
      d: 3, skill: "UNDERSTANDING",
      stem: `Three isomers of C₆H₁₄ boil at (data, °C): hexane ${bp.hexane}, 2-methylpentane ${bp["2-methylpentane"]}, 2,2-dimethylbutane ${bp["2,2-dimethylbutane"]}. Why does boiling point fall with branching?`,
      options: [["Less surface contact gives weaker instantaneous dipole forces.", "Correct: same number of electrons, but more compact molecules touch less."], ["Branched molecules have fewer electrons in total.", "All three are C₆H₁₄ with the same number of electrons."], ["Branched molecules have weaker C–C covalent bonds.", "Boiling does not break C–C bonds."], ["Unbranched molecules form hydrogen bonds between chains.", "Alkanes do not hydrogen-bond."]],
      answer: "A",
      hints: ["The isomers have the same Mr; think about shape."],
      explanation: "More branching → more spherical → smaller area of contact → weaker temporary-dipole forces → lower boiling point.",
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Statements about ice and liquid water:\n\n1. In ice each water molecule forms four hydrogen bonds in an open lattice.\n2. Ice is less dense than liquid water at 0 °C.\n3. When ice melts, the O–H covalent bonds break.\n\nWhich of the statements are correct?",
    options: [["1 and 2 only", "Correct: melting breaks some hydrogen bonds, not O–H covalent bonds."], ["1, 2 and 3", "Statement 3 is wrong: the molecules stay as H₂O."], ["2 and 3 only", "Statement 1 is correct and statement 3 is wrong."], ["1 only", "Statement 2 is also correct: the open lattice makes ice less dense."]],
    answer: "A",
    hints: ["What is overcome when a simple molecular solid melts?"],
    explanation: "Ice: tetrahedral hydrogen-bonded open lattice, less dense than water. Melting partly breaks the hydrogen bonds; covalent O–H bonds are unchanged.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Statements about intermolecular forces:\n\n1. Instantaneous dipole-induced dipole forces exist between all molecules.\n2. Hydrogen bonds are stronger than permanent dipole-permanent dipole forces.\n3. Intermolecular forces are weaker than covalent bonds.\n\nWhich of the statements are correct?",
    options: [["1, 2 and 3", "Correct: all three are true."], ["1 and 2 only", "Statement 3 is also true: tens versus hundreds of kJ mol⁻¹."], ["2 and 3 only", "Statement 1 is also true, even for polar molecules."], ["1 only", "Statements 2 and 3 are also true."]],
    answer: "A",
    explanation: "Temporary dipoles act between all molecules; hydrogen bonds are the strongest intermolecular force; all are much weaker than covalent bonds.",
  });

  // ---- numerical
  {
    const bp = { HF: 20, HI: -35 };
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `The boiling points of hydrogen fluoride and hydrogen iodide are ${bp.HF} °C and ${bp.HI} °C (data). By how many degrees is the boiling point of hydrogen fluoride higher?`,
      value: chk(bp.HF - bp.HI, 55), unit: "°C", wrong: [-15],
      explanation: `${bp.HF} − (${bp.HI}) = ${bp.HF - bp.HI} °C. HF forms hydrogen bonds; HI does not, even though it has far more electrons.`,
    });
  }
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "What is the maximum number of hydrogen bonds one water molecule can form with neighbouring molecules?",
    value: 4, wrong: [2, 3],
    hints: ["Count the δ+ hydrogen atoms and the lone pairs on oxygen."],
    explanation: "Two δ+ H atoms (each to a lone pair on another molecule) + two lone pairs on O (each accepting an H from another molecule) = 4.",
  });
  b.num({
    d: 3, skill: "ANALYSIS",
    stem: "How many of these molecules can form hydrogen bonds between their own molecules: CH₃NH₂, CH₃F, HCOOH, CH₃CHO, NH₃, CH₃OCH₃?",
    value: chk(3, 3), wrong: [5, 4],
    hints: ["Each must have H directly bonded to N, O or F."],
    explanation: "CH₃NH₂ (N–H), HCOOH (O–H) and NH₃ (N–H): 3. CH₃F, CH₃CHO and CH₃OCH₃ have no H on N, O or F, although they can accept hydrogen bonds from water.",
  });
  // ---- true/false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Carbon dioxide molecules are non-polar even though each C=O bond is polar.",
    answer: true,
    explanation: "True. CO₂ is linear, so the two bond dipoles point in opposite directions and cancel.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "A thin stream of hexane from a burette is strongly deflected by a charged polythene rod.",
    answer: false,
    explanation: "False. Hexane is non-polar, so its molecules have no permanent dipoles to align with the rod; a stream of water, which is polar, is deflected.",
  });
  // ---- matching
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each substance with the strongest type of intermolecular force between its molecules.",
    pairs: [["hydrogen fluoride, HF", "hydrogen bonding"], ["hydrogen bromide, HBr", "permanent dipole-permanent dipole forces"], ["argon, Ar", "instantaneous dipole-induced dipole forces (only)"], ["methylamine, CH₃NH₂", "hydrogen bonding (via N–H)"]],
    hints: ["Look for H on N, O or F first, then for a permanent dipole."],
    explanation: "HF and CH₃NH₂ hydrogen-bond; HBr is polar but Br is not electronegative enough for hydrogen bonding; argon atoms are non-polar.",
  });
  // ---- fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "A hydrogen bond forms between a δ+ hydrogen atom bonded to N, O or F and a {{blank:a}} on an N, O or F atom of another molecule. The bond angle at the hydrogen is close to {{blank:b}}. Hydrogen bonds are {{blank:c}} than covalent bonds.",
    blanks: [
      { id: "a", accepted: ["lone pair"], choices: ["lone pair", "bonding pair", "proton", "positive charge"] },
      { id: "b", accepted: ["180°"], choices: ["180°", "120°", "109.5°", "90°"] },
      { id: "c", accepted: ["weaker"], choices: ["weaker", "stronger", "longer-lived"] },
    ],
    explanation: "X–H···:Y is roughly linear; hydrogen bonds are roughly a tenth of the strength of a covalent bond.",
  });
  // ---- short
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the general name for instantaneous dipole-induced dipole forces and permanent dipole-permanent dipole forces together.",
    accepted: ["van der Waals' forces", "van der Waals forces", "van der waals", "vdw", "van der Waals' forces of attraction"],
    wrong: ["hydrogen bonding"],
    explanation: "van der Waals' forces is the generic term for these weak intermolecular attractions.",
  });
  // ---- self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how instantaneous dipole-induced dipole forces arise between two neighbouring argon atoms.",
    points: ["Electrons move randomly, so at an instant the electron distribution in one atom is uneven, giving an instantaneous (temporary) dipole", "This dipole distorts the electron cloud of a neighbouring atom, inducing a dipole in it", "The δ+ end of one attracts the δ− end of the other; the dipoles keep changing but there is a net attraction"],
    modelAnswer: "The electrons in an argon atom are constantly moving, so at any instant they may be unevenly spread, giving a temporary dipole. This instantaneous dipole distorts the electron cloud of a neighbouring atom and induces an opposite dipole in it. The δ+ and δ− regions attract; the dipoles constantly change, but overall there is a weak attraction.",
    hints: ["Start with moving electrons."],
    explanation: "Temporary dipole → induced dipole → attraction.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "The boiling points of the Group 16 hydrides are (data, °C): H₂O 100, H₂S −60, H₂Se −41, H₂Te −2. Explain the trend from H₂S to H₂Te and why water does not fit it.",
    points: ["From H₂S to H₂Te the number of electrons increases", "So instantaneous dipole-induced dipole forces get stronger and boiling point rises", "Water forms hydrogen bonds (O is small and very electronegative; H on O; lone pairs on O)", "Hydrogen bonds are much stronger than the forces between the other hydride molecules, so much more energy is needed to separate water molecules"],
    modelAnswer: "From H₂S to H₂Te the molecules have more electrons, so the instantaneous dipole-induced dipole forces between them increase and so does the boiling point. Water is anomalous: oxygen is small and highly electronegative, so the O–H hydrogens are strongly δ+ and form hydrogen bonds with lone pairs on neighbouring oxygen atoms. These are much stronger than the forces between H₂S molecules, so water boils far higher than the trend predicts.",
    hints: ["Two different types of force are involved."],
    explanation: "Trend: more electrons; anomaly: hydrogen bonding.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why ice floats on water.",
    points: ["In ice each molecule forms four hydrogen bonds", "giving an open (tetrahedral) lattice in which molecules are held further apart than in the liquid", "So ice is less dense than liquid water"],
    modelAnswer: "In ice every water molecule is hydrogen-bonded to four others in a rigid, open tetrahedral lattice that holds the molecules further apart than in liquid water, where some hydrogen bonds are broken and molecules pack more closely. Ice is therefore less dense and floats.",
    hints: ["Think about the arrangement of hydrogen bonds in the solid."],
    explanation: "Open hydrogen-bonded lattice → lower density.",
  });
  // ---- practice structured
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "Boiling points (data, °C): propane C₃H₈ −42; ethanal CH₃CHO 20; ethanol C₂H₅OH 78. All three have Mr between 44 and 46.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the strongest intermolecular force between propane molecules.", accepted: ["instantaneous dipole-induced dipole", "instantaneous dipole-induced dipole forces", "london forces", "london dispersion forces", "dispersion forces", "temporary dipole-induced dipole", "id-id", "van der waals"], wrong: ["hydrogen bonding"], explanation: "Propane is essentially non-polar." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the strongest intermolecular force between ethanal molecules.", accepted: ["permanent dipole-permanent dipole", "permanent dipole-permanent dipole forces", "permanent dipole", "dipole-dipole", "pd-pd"], wrong: ["hydrogen bonding"], explanation: "The C=O group is polar; ethanal has no O–H." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the strongest intermolecular force between ethanol molecules.", accepted: ["hydrogen bonding", "hydrogen bonds", "hydrogen bond"], wrong: ["permanent dipole"], explanation: "Ethanol has an O–H group." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain the order of boiling points.", points: ["Similar Mr / numbers of electrons, so instantaneous dipole forces are similar in all three", "Ethanal also has permanent dipole-permanent dipole forces, so it boils higher than propane", "Ethanol forms hydrogen bonds, the strongest, so most energy is needed and its boiling point is highest"], modelAnswer: "The three have similar numbers of electrons, so their instantaneous dipole-induced dipole forces are similar. Ethanal is polar, so permanent dipole-permanent dipole forces add to these and it boils higher than propane. Ethanol forms hydrogen bonds through its O–H group, which are stronger still, so the most energy is needed to separate its molecules." }),
      P.manual({ label: "(e)", marks: 2, stem: "Describe, with a labelled sketch in words, a hydrogen bond between two ethanol molecules.", points: ["δ+ H of the O–H group of one molecule and δ− O of the other molecule", "Hydrogen bond (dashed line) from the H to a lone pair on the oxygen of the other molecule, O–H···O roughly linear"], modelAnswer: "The O–H hydrogen of one molecule (δ+) lines up with a lone pair on the oxygen (δ−) of a second molecule; the hydrogen bond is shown as a dashed line from H to that lone pair, with O–H···O roughly in a straight line." }),
    ],
    hints: ["Compare forces, not masses: the masses are almost equal."],
    explanation: "Propane id-id; ethanal + pd-pd; ethanol hydrogen bonds: −42 < 20 < 78 °C.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "Farai runs a thin stream of a liquid from a burette and brings a charged plastic ruler close to it. He repeats this with three liquids: water, hexane and trichloromethane (CHCl₃).",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe and explain what happens to the stream of water.", points: ["The stream is deflected towards the ruler (whichever sign of charge)", "Water molecules are polar; they turn so that the end with the opposite charge faces the rod and are attracted"], modelAnswer: "The water bends towards the ruler. Water molecules are polar, so they rotate to point their oppositely charged end towards the rod and are attracted to it." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which liquid's stream is NOT deflected?", options: [["hexane", "Correct: hexane is non-polar."], ["water", "Water is strongly polar."], ["trichloromethane", "CHCl₃ is polar: its dipoles do not cancel."], ["all three are deflected", "A non-polar liquid is not deflected."]], answer: "A", explanation: "Only polar liquids are deflected." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why trichloromethane is polar but tetrachloromethane, CCl₄, is not.", points: ["CCl₄ is a symmetrical tetrahedron: four identical C–Cl dipoles cancel", "In CHCl₃ one Cl is replaced by H, so the dipoles do not cancel and there is a net dipole"], modelAnswer: "In CCl₄ the four C–Cl dipoles are identical and arranged symmetrically, so they cancel. In CHCl₃ one chlorine is replaced by hydrogen, the arrangement is no longer symmetrical, and the dipoles add to give an overall dipole." }),
      P.manual({ label: "(d)", marks: 1, stem: "State one safety precaution for this experiment.", points: ["No naked flames (hexane is flammable) / wear eye protection / work in a fume cupboard or ventilated room (trichloromethane vapour is harmful)"], modelAnswer: "Keep naked flames away because hexane is highly flammable." }),
    ],
    hints: ["Which liquids have molecules with overall dipoles?"],
    explanation: "Polar liquids (water, CHCl₃) are deflected; non-polar hexane is not.",
  });

  // ---- flashcards
  b.card("DEFINITION", "Define **hydrogen bond**.", "Attraction between a δ+ H atom bonded to N, O or F and a lone pair on an N, O or F atom of another molecule.");
  b.card("CONCEPT", "How do instantaneous dipole-induced dipole forces arise?", "Moving electrons create a temporary dipole in one molecule, which induces a dipole in a neighbour; the two attract.");
  b.card("CONCEPT", "What increases instantaneous dipole-induced dipole forces?", "More electrons (larger Mr) and greater surface contact (unbranched chains).");
  b.card("DEFINITION", "What are **van der Waals' forces**?", "The general name for instantaneous dipole-induced dipole and permanent dipole-permanent dipole forces.");
  b.card("CONCEPT", "Why is ice less dense than water?", "Each molecule forms four hydrogen bonds in an open tetrahedral lattice, holding molecules further apart than in the liquid.");
  b.card("FACT", "Anomalous properties of water?", "High melting and boiling points, high surface tension, ice less dense than liquid water: all due to hydrogen bonding.");
  b.card("CONCEPT", "What is overcome when a simple molecular substance boils?", "Only the intermolecular forces; covalent bonds within molecules are unchanged.");
  b.card("CONCEPT", "Effect of branching on alkane boiling points?", "More branching → less surface contact → weaker instantaneous dipole forces → lower boiling point.");
  b.card("FACT", "What happens to a jet of water near a charged rod?", "It bends towards the rod (either charge): polar molecules align their opposite end to the rod.", undefined, { applies: ZIM });
});
