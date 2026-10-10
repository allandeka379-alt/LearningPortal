// W1a: states.lattice-structures — liquids and solids, lattice types, properties, deducing structure.
import { concept, P, t, chk, ZIM } from "../lib.mjs";

concept("achem.states.lattice-structures", { file: "states/lattice-structures", keyPrefix: "states.lattice-structures" }, (b) => {
  // ---- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which substance has a simple molecular lattice?",
    options: [["iodine", "Correct: I₂ molecules held by weak intermolecular forces."], ["diamond", "Diamond is a giant covalent lattice."], ["sodium chloride", "NaCl is a giant ionic lattice."], ["copper", "Copper is a giant metallic lattice."]],
    answer: "A",
    explanation: "Iodine crystals consist of separate I₂ molecules; this is why iodine sublimes on gentle warming.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does graphite conduct electricity?",
    options: [["Each carbon atom has one delocalised electron that can move along the layers.", "Correct: three electrons are used in σ bonds; the fourth is delocalised."], ["Graphite contains ions that are free to move between the layers.", "Graphite is made of carbon atoms, not ions."], ["The layers slide over each other and carry charge.", "Sliding layers explain softness, not conduction."], ["Graphite is a metal with a sea of electrons.", "Graphite is a non-metal with a giant covalent layered structure."]],
    answer: "A",
    explanation: "Each carbon forms three covalent bonds within its layer; the fourth outer electron is delocalised over the layer and carries charge.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Silicon(IV) oxide has a very high melting point because:",
    options: [["many strong covalent bonds must be broken throughout its giant lattice.", "Correct: SiO₂ is giant covalent; melting breaks Si–O bonds."], ["strong intermolecular forces hold its SiO₂ molecules together.", "There are no separate SiO₂ molecules."], ["its ions are held by strong electrostatic attraction.", "SiO₂ is covalent, not ionic."], ["it has delocalised electrons that bind the atoms tightly.", "SiO₂ has no delocalised electrons; it is an insulator."]],
    answer: "A",
    explanation: "Each Si is bonded to four O and each O to two Si in a continuous network; melting requires breaking many strong covalent bonds.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Substance Z melts at 801 °C, does not conduct electricity as a solid but conducts when molten or dissolved in water. What is its structure?",
    options: [["giant ionic", "Correct: mobile ions only in the molten or aqueous state."], ["giant metallic", "A metal conducts as a solid too."], ["giant covalent", "Giant covalent substances (except graphite) do not conduct when molten, and do not dissolve."], ["simple molecular", "Simple molecular substances have low melting points and do not conduct when molten."]],
    answer: "A",
    hints: ["Use the conductivity in each state."],
    explanation: "High melting point plus conduction only when the ions can move: giant ionic (these are the data for sodium chloride).",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: t`Which statement about buckminsterfullerene, $\ce{C60}$, is correct?`,
    options: [["It consists of separate molecules held by weak forces.", "Correct: separate C₆₀ molecules are held by weak intermolecular forces."], ["It is a giant covalent network structure like diamond.", "C₆₀ consists of discrete molecules, not a continuous network."], ["Each carbon atom is bonded to four others.", "Each carbon in C₆₀ is bonded to three others."], ["It is an ionic compound of carbon and another element.", "C₆₀ is an element (a form of carbon), not a compound."]],
    answer: "A",
    explanation: "C₆₀ molecules are closed cages of 60 carbon atoms in hexagons and pentagons; the lattice is simple molecular.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Statements about diamond and graphite:\n\n1. Both have high melting points because covalent bonds must be broken.\n2. Graphite is soft because weak forces between its layers allow them to slide.\n3. In both, each carbon atom forms four covalent bonds.\n\nWhich of the statements are correct?",
    options: [["1 and 2 only", "Correct: in graphite each carbon forms only three covalent bonds."], ["1, 2 and 3", "Statement 3 is wrong: carbon forms three covalent bonds in graphite."], ["2 and 3 only", "Statement 3 is wrong and statement 1 is correct."], ["1 only", "Statement 2 is also correct."]],
    answer: "A",
    hints: ["How many bonds does each carbon form in a graphite layer?"],
    explanation: "Both are giant covalent with very high melting points. Graphite's layers are held by weak forces and slide. Diamond: four bonds per C; graphite: three bonds per C plus one delocalised electron.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Statements about changes of state:\n\n1. The temperature of a pure substance stays constant while it melts.\n2. Energy is released when a vapour condenses.\n3. A liquid boils when its vapour pressure equals the external pressure.\n\nWhich of the statements are correct?",
    options: [["1, 2 and 3", "Correct: all three are true."], ["1 and 2 only", "Statement 3 is also true: this defines the boiling point."], ["2 and 3 only", "Statement 1 is also true: energy separates particles rather than raising temperature."], ["1 only", "Statements 2 and 3 are also true."]],
    answer: "A",
    explanation: "During melting, energy overcomes forces at constant temperature; condensation releases energy as forces re-form; boiling occurs when vapour pressure = external pressure.",
    applies: ZIM,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which substance is most likely to dissolve in water but not in hexane?",
    options: [["potassium bromide", "Correct: an ionic solid; polar water molecules hydrate its ions."], ["iodine", "Non-polar I₂ dissolves better in hexane than in water."], ["silicon", "Giant covalent: insoluble in both."], ["poly(ethene)", "A non-polar polymer, insoluble in water."]],
    answer: "A",
    hints: ["Water is polar; hexane is non-polar."],
    explanation: "Ionic compounds dissolve in polar water (ions are surrounded by water molecules) but not in non-polar hexane.",
  });

  // ---- numerical
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "How many chloride ions surround each sodium ion in the sodium chloride lattice?",
    value: 6, wrong: [4, 8],
    explanation: "In NaCl each ion has six nearest neighbours of the opposite charge (6 : 6 coordination).",
  });
  b.num({
    d: 2, skill: "RECALL",
    stem: "In diamond, how many other carbon atoms is each carbon atom covalently bonded to?",
    value: 4, wrong: [3],
    explanation: "Each carbon is sp³ and bonded tetrahedrally to four others.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "In silicon(IV) oxide, how many silicon atoms is each oxygen atom bonded to?",
    value: chk(2, 2), wrong: [4, 1],
    hints: ["The formula SiO₂ shows the ratio of atoms."],
    explanation: "Each Si bonds to four O and each O bridges two Si, giving the 1 : 2 ratio of SiO₂.",
  });
  // ---- true/false
  b.tf({
    d: 1, skill: "RECALL",
    stem: "When ice melts, hydrogen bonds between water molecules are partly broken but the O–H covalent bonds remain.",
    answer: true,
    explanation: "True. Melting a molecular solid overcomes intermolecular forces only.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Molten silicon(IV) oxide conducts electricity well.",
    answer: false,
    explanation: "False. SiO₂ is covalent: even when molten it has no mobile ions or delocalised electrons.",
  });
  // ---- matching
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each substance with its type of lattice.",
    pairs: [["magnesium oxide", "giant ionic"], ["ice", "hydrogen-bonded molecular"], ["silicon", "giant molecular (covalent)"], ["copper", "giant metallic"], ["buckminsterfullerene", "simple molecular"]],
    explanation: "MgO ionic; ice hydrogen-bonded molecules; Si diamond-like network; Cu metallic; C₆₀ discrete molecules.",
  });
  // ---- fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about graphite.",
    template: "In graphite each carbon atom is covalently bonded to {{blank:a}} other carbon atoms in flat layers. The layers are held together by weak {{blank:b}} forces, so graphite is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["three"], choices: ["two", "three", "four"] },
      { id: "b", accepted: ["intermolecular"], choices: ["intermolecular", "covalent", "ionic", "metallic"] },
      { id: "c", accepted: ["soft"], choices: ["soft", "hard", "brittle"] },
    ],
    explanation: "Three σ bonds per carbon in hexagonal layers; weak forces between layers let them slide.",
  });
  // ---- short
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the process in which a solid changes directly into a gas, as iodine does on gentle warming.",
    accepted: ["sublimation", "subliming", "sublime"],
    wrong: ["evaporation", "melting"],
    explanation: "Sublimation: solid → gas without becoming a liquid.",
  });
  // ---- self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why magnesium oxide melts at a very high temperature while iodine sublimes on gentle warming.",
    points: ["MgO is a giant ionic lattice", "with strong electrostatic attractions between Mg²⁺ and O²⁻ ions in all directions, needing much energy to overcome", "Iodine is simple molecular", "only weak instantaneous dipole-induced dipole forces between I₂ molecules are overcome (the I–I bonds do not break)"],
    modelAnswer: "Magnesium oxide is a giant ionic lattice of Mg²⁺ and O²⁻ ions held by strong electrostatic attractions in every direction, so a great deal of energy is needed to separate the ions. Iodine is a simple molecular solid: the I₂ molecules are held only by weak instantaneous dipole-induced dipole forces, which little energy overcomes; the covalent I–I bonds stay intact.",
    hints: ["Compare what must be overcome in each."],
    explanation: "Giant ionic vs simple molecular.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the structure of diamond and use it to explain why diamond is very hard and does not conduct electricity.",
    points: ["Each carbon is covalently bonded to four others in a tetrahedral giant lattice", "Many strong covalent bonds throughout the lattice must be broken to scratch or deform it: very hard", "All outer electrons are in localised bonds: no delocalised electrons or ions to carry charge"],
    modelAnswer: "Diamond is a giant covalent lattice in which each carbon atom is bonded tetrahedrally to four others. Scratching or deforming it would mean breaking many strong covalent bonds, so it is very hard. All four outer electrons of each atom are used in localised bonds, so there are no mobile electrons and it does not conduct.",
    hints: ["Link each property to the bonding."],
    explanation: "Tetrahedral giant covalent network.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2, applies: ZIM,
    stem: "Use the kinetic-molecular model to describe the differences between the arrangement and motion of particles in a solid and in a liquid.",
    points: ["Solid: particles closely packed in a regular arrangement, vibrating about fixed positions", "Liquid: particles still close together but irregular, able to move past one another (so liquids flow)"],
    modelAnswer: "In a solid, particles are closely packed in a regular lattice and only vibrate about fixed positions. In a liquid they are still close together but disordered, and they move past one another, so the liquid can flow.",
    explanation: "Arrangement and motion.",
  });
  // ---- practice structured
  {
    const data = [["A", "1083", "yes", "yes", "insoluble"], ["B", "−95", "no", "no", "insoluble (mixes with hexane)"], ["C", "about 3700 (sublimes)", "yes", "—", "insoluble"], ["D", "772", "no", "yes", "soluble"], ["E", "1410", "poorly (semiconductor)", "—", "insoluble"]];
    b.struct({
      d: 4, skill: "ANALYSIS",
      stem: `The table gives data (approximate) for five solids, A to E.

| Solid | Melting point / °C | Conducts as solid | Conducts as liquid | Solubility in water |
|---|---|---|---|---|
${data.map((r) => `| ${r.join(" | ")} |`).join("\n")}`,
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Which solid has a giant metallic structure? Give its letter.", accepted: ["A"], wrong: ["C"], explanation: "Conducts as solid and liquid, high melting point, insoluble: metal (copper)." }),
        P.short({ label: "(b)", marks: 1, stem: "Which solid has a giant ionic structure? Give its letter.", accepted: ["D"], wrong: ["A"], explanation: "Conducts only when molten, soluble: ionic (calcium chloride)." }),
        P.short({ label: "(c)", marks: 1, stem: "Which solid has a simple molecular structure? Give its letter.", accepted: ["B"], wrong: ["E"], explanation: "Very low melting point, non-conductor, dissolves in hexane." }),
        P.mcq({ label: "(d)", marks: 1, stem: "Solid C is a form of carbon. Which is it?", options: [["graphite", "Correct: a giant covalent element that conducts as a solid."], ["diamond", "Diamond does not conduct."], ["buckminsterfullerene", "C₆₀ is simple molecular, with a much lower sublimation temperature, and does not conduct."], ["charcoal powder", "Not a defined crystalline structure in the syllabus."]], answer: "A", explanation: "Very high sublimation temperature + conducts: graphite." }),
        P.manual({ label: "(e)", marks: 2, stem: "Solid E is an element from Group 14 (Group IV). Identify E and describe its structure.", points: ["Silicon", "Giant covalent (diamond-like) lattice: each Si atom bonded tetrahedrally to four others"], modelAnswer: "E is silicon, which has a giant covalent lattice like diamond, each atom bonded tetrahedrally to four others." }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why D conducts electricity when molten but not when solid.", points: ["In the solid the ions are held in fixed positions in the lattice", "In the melt the ions are free to move and carry charge"], modelAnswer: "In solid D the ions are fixed in the lattice; when molten they become free to move and carry the current." }),
      ],
      hints: ["Use melting point, conductivity in both states and solubility together."],
      explanation: "A copper (metallic); B simple molecular; C graphite; D ionic; E silicon (giant covalent).",
    });
  }
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Carbon exists as diamond, graphite and buckminsterfullerene (C₆₀).",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many carbon atoms is each carbon atom bonded to in graphite?", value: 3, wrong: [4], explanation: "Three, in hexagonal layers." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why graphite is used as a lubricant and in pencil leads.", points: ["Layers held by weak intermolecular forces", "Layers slide over each other easily (rub off onto paper)"], modelAnswer: "The layers of graphite are held together only by weak intermolecular forces, so they slide over one another easily; this makes graphite slippery and lets layers rub off onto paper." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why C₆₀ has a much lower sublimation temperature than graphite.", points: ["C₆₀ is simple molecular: only weak intermolecular forces between molecules are overcome", "Graphite is giant covalent: strong covalent bonds must be broken"], modelAnswer: "C₆₀ is made of separate molecules held by weak intermolecular forces, which need little energy to overcome. Graphite is a giant covalent structure, and turning it to vapour means breaking many strong covalent bonds." }),
      P.short({ label: "(d)", marks: 1, stem: "Name the form of carbon that is the hardest.", accepted: ["diamond"], wrong: ["graphite"], explanation: "Diamond: a rigid tetrahedral network of strong bonds." }),
    ],
    hints: ["Separate molecules or a continuous network?"],
    explanation: "Graphite: layers, three bonds per C, weak forces between layers; C₆₀: discrete molecules.",
  });

  // ---- flashcards
  b.card("FACT", "Five lattice types and examples?", "Giant ionic (NaCl, MgO); simple molecular (I₂, C₆₀); hydrogen-bonded (ice); giant molecular (diamond, graphite, SiO₂, Si); giant metallic (Cu).");
  b.card("CONCEPT", "Why do simple molecular solids have low melting points?", "Only weak intermolecular forces between molecules are overcome; covalent bonds within molecules do not break.");
  b.card("CONCEPT", "Why is diamond hard and non-conducting?", "Each C bonded tetrahedrally to four others in a giant network; all electrons in localised bonds.");
  b.card("CONCEPT", "Why is graphite soft but conducting?", "Layers held by weak forces slide; one delocalised electron per C moves along the layers.");
  b.card("FACT", "Structure of silicon(IV) oxide?", "Giant covalent: each Si bonded to four O, each O to two Si (tetrahedral network).");
  b.card("CONCEPT", "What is needed for electrical conduction?", "Mobile charged particles: delocalised electrons (metals, graphite) or free ions (molten / aqueous ionic compounds).");
  b.card("CONCEPT", "Why do ionic compounds often dissolve in water?", "Polar water molecules are attracted to the ions and surround them (hydration).");
  b.card("DEFINITION", "Define **sublimation**.", "The direct change of a solid into a gas (e.g. iodine, solid CO₂).");
});
