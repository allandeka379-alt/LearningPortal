// W2b: achem.periodicity.physical-properties (both boards; ZIMSEC Form 5, Cambridge AS Level).
import { concept, P, t, chk, sfStr, dpStr } from "../lib.mjs";

concept("achem.periodicity.physical-properties", { file: "periodicity/physical-properties", keyPrefix: "periodicity.physical-properties" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Period 3 element has the highest melting point?",
    options: [
      ["silicon", "Correct: a giant covalent lattice; many strong covalent bonds must be broken."],
      ["aluminium", "Aluminium has strong metallic bonding but melts far below silicon."],
      ["sulfur", "Sulfur is simple molecular (S₈) with a low melting point."],
      ["magnesium", "Magnesium is metallic and melts at a lower temperature than aluminium."],
    ],
    answer: "A",
    explanation: "Silicon's giant covalent structure gives the peak of the Period 3 melting-point graph.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does atomic radius decrease from sodium to chlorine?",
    options: [
      ["Nuclear charge increases while shielding stays almost the same.", "Correct: outer electrons in the same shell are pulled in more strongly."],
      ["The number of electrons decreases, so there is less repulsion.", "The number of electrons increases across the period."],
      ["Each element has one more occupied electron shell than the one before.", "All these atoms have three occupied shells."],
      ["Shielding increases because more inner electrons are added.", "The extra electrons are added to the outer shell, so shielding hardly changes."],
    ],
    answer: "A",
    explanation: "Same shell, same inner shielding, more protons: a stronger pull on the outer electrons.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which type of structure does phosphorus (white phosphorus) have?",
    options: [
      ["simple molecular, with P₄ molecules", "Correct: weak forces between P₄ molecules give a low melting point."],
      ["giant covalent, like silicon", "Silicon is the only giant covalent element in Period 3."],
      ["giant metallic, with delocalised electrons", "Phosphorus is a non-metal and does not conduct."],
      ["simple molecular, with P₂ molecules", "Phosphorus exists as tetrahedral P₄ molecules, not diatomic P₂."],
    ],
    answer: "A",
    explanation: "White phosphorus consists of tetrahedral P₄ molecules held together by instantaneous dipole-induced dipole forces.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is the melting point of sulfur higher than that of phosphorus?",
    options: [
      ["S₈ molecules have more electrons than P₄ molecules, so the intermolecular forces are stronger.", "Correct: 128 electrons against 60 give larger instantaneous dipole-induced dipole forces."],
      ["The S–S covalent bonds are stronger than the P–P covalent bonds.", "Covalent bonds inside the molecules are not broken on melting."],
      ["Sulfur has a giant covalent structure but phosphorus is simple molecular.", "Both are simple molecular solids."],
      ["Sulfur atoms are larger than phosphorus atoms.", "Sulfur atoms are slightly smaller; molecule size matters here."],
    ],
    answer: "A",
    hints: ["What is overcome when a simple molecular solid melts?"],
    explanation: "Melting S₈ or P₄ separates molecules; the larger S₈ molecule has stronger instantaneous dipole-induced dipole forces.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the ions of Period 3 elements are correct?\n\n1. Na⁺, Mg²⁺ and Al³⁺ are isoelectronic.\n2. The radius of S²⁻ is greater than the atomic radius of sulfur.\n3. The radius of Al³⁺ is greater than the radius of Na⁺.",
    options: [
      ["1 and 2 only", "Correct: Al³⁺ has the highest nuclear charge of the three isoelectronic cations, so it is the smallest."],
      ["1, 2 and 3", "Statement 3 is false: Al³⁺ (13 protons) is smaller than Na⁺ (11 protons)."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: added electrons repel each other and the ion expands."],
    ],
    answer: "A",
    hints: ["Same number of electrons: which ion has the most protons?"],
    explanation: "Na⁺, Mg²⁺ and Al³⁺ all have 10 electrons; more protons means a smaller ion. Anions are larger than their atoms.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements explain why the first ionisation energy of aluminium is lower than that of magnesium?\n\n1. The electron removed from aluminium is in a 3p orbital, which is higher in energy than 3s.\n2. The 3p electron of aluminium is partly shielded by the 3s electrons.\n3. Aluminium has a smaller nuclear charge than magnesium.",
    options: [
      ["1 and 2 only", "Correct: aluminium has the larger nuclear charge, so statement 3 is false."],
      ["1, 2 and 3", "Aluminium has 13 protons and magnesium 12."],
      ["2 and 3 only", "Statement 3 is false, and statement 1 is a key reason."],
      ["1 only", "Statement 2 is also part of the explanation."],
    ],
    answer: "A",
    hints: ["Count the protons in each atom."],
    explanation: "The 3p electron is at higher energy and is shielded by 3s², outweighing the extra proton.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A Period 3 element melts at 922 K and conducts electricity well. Its first ionisation energy is higher than that of the element after it in the period. Which element is it?",
    options: [
      ["magnesium", "Correct: a metal, and its first IE is above aluminium's (the 3p dip)."],
      ["sodium", "Sodium melts much lower (about 371 K) and its IE is lower than magnesium's."],
      ["aluminium", "Aluminium's first IE is lower than silicon's, the element after it."],
      ["phosphorus", "Phosphorus melts at a low temperature and does not conduct."],
    ],
    answer: "A",
    hints: ["Where are the two dips in first ionisation energy?"],
    explanation: "Good conduction and a fairly high melting point mean a metal; only Mg has a higher first IE than the next element (Al).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "The electrical conductivity of an element in Period 3 increases when it is warmed from 20 °C to 80 °C. What is the element and why does its conductivity rise?",
    options: [
      ["silicon; more electrons gain enough energy to break free and carry charge", "Correct: silicon is a semiconductor, so warming increases the number of charge carriers."],
      ["aluminium; its delocalised electrons move faster when it is warmer", "A metal's conductivity falls slightly on warming as the vibrating ions scatter electrons."],
      ["sulfur; its S₈ molecules break into ions when it is warmed", "Sulfur is an insulator and does not form ions on gentle warming."],
      ["sodium; its metallic bonding becomes stronger at a higher temperature", "Bonding does not strengthen on warming, and metal conductivity falls."],
    ],
    answer: "A",
    hints: ["Metals and semiconductors respond to heating in opposite ways."],
    explanation: "In a semiconductor heating frees more electrons from covalent bonds; in a metal heating increases lattice vibrations and lowers conductivity.",
  });
  {
    const e = chk(16 * 8, 128);
    b.num({
      d: 1, skill: "RECALL",
      stem: "Sulfur (proton number 16) exists as S₈ molecules. How many electrons are in one S₈ molecule?",
      value: e,
      wrong: [16, 48],
      explanation: `8 × 16 = ${e} electrons. The number of electrons controls the size of the instantaneous dipole-induced dipole forces between molecules.`,
    });
  }
  {
    const pct = ((186 - 99) / 186) * 100;
    b.calc({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: "The atomic radius of sodium is 186 pm and that of chlorine is 99 pm. Calculate the percentage decrease in atomic radius from sodium to chlorine, to three significant figures.",
      value: pct, sf: 3, unit: "%",
      wrong: [sfStr(((186 - 99) / 99) * 100, 3)],
      hints: ["Percentage change is based on the starting value."],
      explanation: `1. Decrease = 186 − 99 = 87 pm.\n2. 87 ÷ 186 × 100 = ${sfStr(pct, 3)}%. Dividing by 99 instead of 186 gives ${sfStr(((186 - 99) / 99) * 100, 3)}%, which uses the wrong base.`,
    });
  }
  {
    const ratio = 181 / 99;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: "The radius of a chloride ion is 181 pm; the covalent radius of a chlorine atom is 99 pm. Calculate the ratio radius(Cl⁻) ÷ radius(Cl), to three significant figures.",
      value: ratio, sf: 3,
      wrong: [sfStr(99 / 181, 3)],
      explanation: `181 ÷ 99 = ${sfStr(ratio, 3)}. The ion is larger: the extra electron increases repulsion in the outer shell while the nuclear charge is unchanged.`,
    });
  }
  {
    const c = chk(1687 - 273, 1414);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: "Silicon melts at 1687 K. What is its melting point in °C? (0 °C = 273 K)",
      value: c, unit: "°C",
      wrong: [1687 + 273],
      explanation: `${1687} − 273 = ${c} °C. Adding 273 instead of subtracting gives ${1687 + 273}.`,
    });
  }
  {
    const kJ = 0.024 * 494;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "The first ionisation energy of sodium is 494 kJ mol⁻¹. Calculate the energy, in kJ, needed to convert 0.0240 mol of gaseous sodium atoms into gaseous Na⁺ ions, to three significant figures.",
      value: kJ, sf: 3, unit: "kJ",
      wrong: [sfStr(kJ * 1000, 3)],
      hints: ["Energy = amount × energy per mole."],
      explanation: `1. Energy = n × IE.\n2. 0.0240 × 494 = ${sfStr(kJ, 3)} kJ (${sfStr(kJ * 1000, 3)} J, which is the value obtained if the unit is not kept in kJ).`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Aluminium is a better electrical conductor than sodium because each aluminium atom contributes more electrons to the delocalised sea.",
    answer: true,
    explanation: "True. Aluminium contributes three electrons per atom and sodium one, so there are more mobile charge carriers.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: t`The first ionisation energies of the elements from magnesium to chlorine are shown (data, kJ mol⁻¹).

| Element | Mg | Al | Si | P | S | Cl |
|---|---|---|---|---|---|---|
| first IE / kJ mol⁻¹ | 736 | 577 | 786 | 1060 | 1000 | 1260 |`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Write an equation, with state symbols, for the first ionisation of silicon (type, e.g., A -> B + C).", accepted: ["Si(g) -> Si+(g) + e-", "Si(g) → Si+(g) + e-", "Si(g) -> Si+(g) + e−", "Si(g) → Si⁺(g) + e⁻", "Si(g) - e- -> Si+(g)"], normalise: ["trim", "collapse_whitespace"], wrong: ["Si(s) -> Si+(aq) + e-"], explanation: "Si(g) → Si⁺(g) + e⁻: gaseous atoms to gaseous 1+ ions." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain the general increase in first ionisation energy from aluminium to chlorine.", points: ["Nuclear charge increases while electrons are added to the same shell (similar shielding)", "Atomic radius decreases, so the outer electron is attracted more strongly and needs more energy to remove"], modelAnswer: "From aluminium to chlorine the nuclear charge rises by one each time, but the electrons are added to the same 3p sub-shell, so shielding hardly changes. The atoms get smaller and the outer electron is held more strongly." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the first ionisation energy of aluminium is lower than that of magnesium.", points: ["Al's outer electron is in a 3p orbital, which is higher in energy (further from the nucleus) than Mg's 3s", "and it is partly shielded by the filled 3s sub-shell, so it is easier to remove"], modelAnswer: "The electron removed from aluminium is a 3p electron, higher in energy than the 3s electron removed from magnesium, and it is partly shielded by the 3s² electrons." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the first ionisation energy of sulfur is lower than that of phosphorus.", points: ["In sulfur the electron is removed from a 3p orbital containing two electrons (paired)", "Repulsion between the paired electrons makes it easier to remove; in P the three 3p electrons are unpaired"], modelAnswer: "Sulfur has the configuration 3p⁴, so one 3p orbital holds a pair of electrons. Their mutual repulsion makes one easier to remove than any of phosphorus's three unpaired 3p electrons." }),
      P.mcq({ label: "(e)", stem: "Predict the first ionisation energy of argon.", options: [
        ["about 1500 kJ mol⁻¹", "Correct: the rise continues from chlorine (data value 1520 kJ mol⁻¹)."],
        ["about 1100 kJ mol⁻¹", "This would be lower than chlorine; argon has a larger nuclear charge."],
        ["about 500 kJ mol⁻¹", "This is typical of a Group 1 metal such as sodium or potassium."],
        ["about 2400 kJ mol⁻¹", "This is close to helium's value; argon's outer electrons are much further out."],
      ], answer: "A", explanation: "No dip is expected between Cl (3p⁵) and Ar (3p⁶), so the value is above 1260 kJ mol⁻¹." }),
    ],
    hints: ["Use nuclear charge, shielding and distance.", "Look at the sub-shell and pairing of the electron removed."],
    explanation: "General rise from nuclear charge; dips at Al (3p) and S (paired 3p).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each element with its structure in the solid.",
    pairs: [
      ["magnesium", "giant metallic lattice"],
      ["silicon", "giant covalent lattice"],
      ["chlorine", "simple molecules of two atoms"],
      ["argon", "single atoms"],
    ],
    extraRight: ["giant ionic lattice"],
    explanation: "No Period 3 element is ionic; ionic lattices form only in compounds such as NaCl.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the explanation of the first ionisation energies of phosphorus and sulfur.",
    template: "In sulfur the electron removed comes from a 3p orbital that already contains {{blank:a}} electrons. The {{blank:b}} between the paired electrons makes it {{blank:c}} to remove than an unpaired 3p electron in phosphorus.",
    blanks: [
      { id: "a", accepted: ["two"], choices: ["one", "two", "three"] },
      { id: "b", accepted: ["repulsion"], choices: ["repulsion", "attraction", "shielding"] },
      { id: "c", accepted: ["easier"], choices: ["easier", "harder"] },
    ],
    hints: ["Electrons in the same orbital repel each other."],
    explanation: "Spin-pair repulsion in sulfur's 3p⁴ configuration lowers its first ionisation energy below phosphorus's 3p³.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Period 3 element whose first ionisation energy is the highest.",
    accepted: ["argon", "Ar"],
    wrong: ["chlorine"],
    explanation: "Argon: the largest nuclear charge in the period with the same shielding and the smallest radius; it is a noble gas.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the melting point increases from sodium to aluminium.",
    points: [
      "All three have giant metallic lattices (cations in a sea of delocalised electrons)",
      "The number of delocalised electrons per atom increases (1, 2, 3) and the cation charge increases",
      "Cations get smaller, so the attraction between cations and delocalised electrons (metallic bonding) is stronger and more energy is needed",
    ],
    modelAnswer: "Sodium, magnesium and aluminium all have giant metallic structures. From Na to Al the cations change from 1+ to 3+ and each atom gives one, two, then three electrons to the delocalised sea. The cations also get smaller. The electrostatic attraction between the cations and the delocalised electrons therefore increases, so more energy is needed to melt the metal.",
    hints: ["Think about the charge and size of the cations and the number of delocalised electrons."],
    explanation: "Stronger metallic bonding from Na to Al.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the Period 3 cations Na⁺, Mg²⁺ and Al³⁺ are much smaller than the anions P³⁻, S²⁻ and Cl⁻.",
    points: [
      "The cations have lost their third-shell (outer) electrons, so they have only two occupied shells",
      "The anions have gained electrons into the third shell, so they have three occupied shells",
      "An extra occupied shell further from the nucleus makes the anions much larger (the anions also have more electron-electron repulsion)",
    ],
    modelAnswer: "Na⁺, Mg²⁺ and Al³⁺ have lost all their third-shell electrons and have the configuration 1s² 2s² 2p⁶ (two shells). P³⁻, S²⁻ and Cl⁻ have gained electrons and keep a full third shell, 1s² 2s² 2p⁶ 3s² 3p⁶. The extra occupied shell is much further from the nucleus, so the anions are much larger.",
    hints: ["Compare the number of occupied shells."],
    explanation: "Two isoelectronic series differing by one shell.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Describe how a sketch graph of melting point against proton number from sodium to argon would look, and explain the change in shape between silicon and phosphorus.",
    points: [
      "Rises from Na to Al, then rises to a maximum at Si",
      "Falls sharply to P, rises slightly to S, then falls to Cl and Ar (lowest)",
      "Silicon is giant covalent: many strong covalent bonds must be broken",
      "Phosphorus is simple molecular: only weak intermolecular (instantaneous dipole-induced dipole) forces between P₄ molecules are overcome",
    ],
    modelAnswer: "The graph rises from sodium through magnesium and aluminium to a sharp peak at silicon, falls steeply to phosphorus, rises a little at sulfur and falls again to chlorine and argon, which is the lowest. Silicon has a giant covalent structure, so melting it breaks many strong Si–Si bonds. Phosphorus is made of P₄ molecules; melting only overcomes weak instantaneous dipole-induced dipole forces between them, not the P–P bonds.",
    hints: ["The peak and the steep fall come from a change of structure type."],
    explanation: "Structure type, not atom size, controls the big changes in melting point.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`Tatenda found these data (in °C) for four Period 3 elements, labelled **J**, **K**, **L** and **M** (not in order):

| Element | melting point / °C | electrical conductivity of the solid |
|---|---|---|
| **J** | 660 | very good |
| **K** | −101 | none |
| **L** | 1414 | low, increases on warming |
| **M** | 98 | good |`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Identify element **L**.", accepted: ["silicon", "Si"], wrong: ["aluminium"], explanation: "Very high melting point and semiconducting: silicon." }),
      P.short({ label: "(b)", marks: 1, stem: "Identify element **K**, which is a gas at room temperature.", accepted: ["chlorine", "Cl", "Cl2", "Cl₂"], wrong: ["argon"], explanation: "Chlorine melts at −101 °C; argon melts lower (about −189 °C)." }),
      P.mcq({ label: "(c)", stem: "Elements **J** and **M** are metals. Which pair is correct?", options: [
        ["**J** aluminium, **M** sodium", "Correct: Al has the stronger metallic bonding and the higher melting point."],
        ["**J** sodium, **M** aluminium", "Reversed: sodium melts just below 100 °C."],
        ["**J** magnesium, **M** sodium", "Magnesium melts at about 650 °C and conducts less well than aluminium."],
        ["**J** aluminium, **M** magnesium", "Magnesium melts far above 98 °C."],
      ], answer: "A", explanation: "Sodium melts at 98 °C; aluminium at 660 °C." }),
      P.num({ label: "(d)", marks: 1, stem: "Convert the melting point of **K** to kelvin. (0 °C = 273 K)", value: -101 + 273, unit: "K", wrong: [-101 - 273], explanation: `−101 + 273 = ${-101 + 273} K.` }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain the difference in melting point between **L** and **K** in terms of structure and bonding.", points: ["L (Si) is giant covalent: each atom joined to four others by strong covalent bonds", "Melting L breaks many strong covalent bonds, needing a lot of energy", "K (Cl₂) is simple molecular: only weak instantaneous dipole-induced dipole forces between molecules are overcome"], modelAnswer: "Silicon has a giant covalent lattice in which each atom is bonded to four others; melting requires many strong covalent bonds to be broken. Chlorine consists of Cl₂ molecules; melting only overcomes the weak instantaneous dipole-induced dipole forces between molecules, so very little energy is needed." }),
      P.manual({ label: "(f)", marks: 1, stem: "Explain why **J** is a better conductor than **M**.", points: ["Aluminium contributes three delocalised electrons per atom, sodium only one, so there are more mobile charge carriers"], modelAnswer: "Each aluminium atom releases three electrons into the delocalised sea and each sodium atom only one, so aluminium has more mobile electrons to carry current." }),
    ],
    hints: ["High melting point plus poor conduction suggests a giant covalent element."],
    explanation: "L silicon, K chlorine, J aluminium, M sodium; melting points follow the type of structure.",
  });
  b.card("FACT", "Trend in atomic radius across Period 3", "Decreases Na → Cl: nuclear charge rises, shielding almost constant, outer electrons pulled closer.");
  b.card("CONCEPT", "Ionic radii in Period 3", "Na⁺, Mg²⁺, Al³⁺ (2 shells) small and decreasing; P³⁻, S²⁻, Cl⁻ (3 shells) large and decreasing.");
  b.card("FACT", "Dips in first IE across Period 3", "Al < Mg (3p electron, higher energy, shielded by 3s). S < P (paired 3p electron repels).");
  b.card("FACT", "Highest melting point in Period 3", "Silicon: giant covalent lattice, many strong Si–Si bonds broken on melting.");
  b.card("CONCEPT", "Melting points of P₄, S₈, Cl₂, Ar", "Order S₈ > P₄ > Cl₂ > Ar: more electrons per particle, stronger instantaneous dipole-induced dipole forces.");
  b.card("CONCEPT", "Metallic bonding Na → Al", "More delocalised electrons per atom, higher charge and smaller cations: stronger bonding, higher melting point and conductivity.");
  b.card("FACT", "Conductivity across Period 3", "Na, Mg, Al conduct (Al best); Si semiconductor (rises when warmed); P, S, Cl, Ar insulators.");
  b.card("DEFINITION", "Periodicity", "The repeating pattern of physical and chemical properties across successive periods.");
  b.card("FACT", "Structures of the Period 3 elements", "Na, Mg, Al giant metallic; Si giant covalent; P₄, S₈, Cl₂ simple molecular; Ar monatomic.");
});
