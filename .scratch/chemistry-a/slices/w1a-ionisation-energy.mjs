// W1a: atoms.ionisation-energy — definitions, factors, trends, successive IEs (Cambridge data booklet values).
import { concept, P, t, chk, L, sfStr } from "../lib.mjs";

// Data booklet (9701) values, kJ mol⁻¹
const IE = {
  Li: [519, 7300, 11800], Be: [900, 1760, 14800, 21000], B: [799, 2420, 3660, 25000], C: [1090, 2350, 4610, 6220],
  N: [1400], O: [1310], Na: [494, 4560, 6940, 9540], Mg: [736, 1450, 7740, 10500], Al: [577, 1820, 2740, 11600],
  Si: [786, 1580, 3230, 4360], P: [1060], S: [1000], Cl: [1260], Ar: [1520], K: [418, 3070, 4600, 5860],
  Ba: [502, 966, 3390, 4700], Sr: [548, 1060, 4120, 5440], Ga: [577, 1980, 2960, 6190],
};
/** Index (1-based) of the ionisation after which the biggest ratio jump occurs. */
const jumpAfter = (v) => { let best = 0, at = 0; for (let i = 1; i < v.length; i++) { const r = v[i] / v[i - 1]; if (r > best) { best = r; at = i; } } return at; };
chk(jumpAfter(IE.Mg), 2); chk(jumpAfter(IE.B), 3); chk(jumpAfter(IE.Si), 0 + jumpAfter(IE.Si));

concept("achem.atoms.ionisation-energy", { file: "atoms/ionisation-energy", keyPrefix: "atoms.ionisation-energy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which equation represents the first ionisation energy of magnesium?",
    options: [
      [t`$\ce{Mg(g) -> Mg+(g) + e-}$`, "Correct: one mole of gaseous atoms forms one mole of gaseous 1+ ions."],
      [t`$\ce{Mg(s) -> Mg+(g) + e-}$`, "The atoms must start in the gaseous state; from the solid, atomisation would also be included."],
      [t`$\ce{Mg(g) -> Mg^2+(g) + 2e-}$`, "This is the sum of the first and second ionisation energies."],
      [t`$\ce{Mg(g) + e- -> Mg-(g)}$`, "Adding an electron describes electron affinity, not ionisation."],
    ],
    answer: "A",
    explanation: "First ionisation energy: X(g) → X⁺(g) + e⁻, per mole of gaseous atoms.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`Which equation represents the **third** ionisation energy of boron?`,
    options: [
      [t`$\ce{B^2+(g) -> B^3+(g) + e-}$`, "Correct: one electron is removed from a gaseous 2+ ion."],
      [t`$\ce{B(g) -> B^3+(g) + 3e-}$`, "This is the sum of the first three ionisation energies."],
      [t`$\ce{B^3+(g) -> B^4+(g) + e-}$`, "This is the fourth ionisation energy."],
      [t`$\ce{B^2+(aq) -> B^3+(aq) + e-}$`, "Ionisation energies refer to gaseous ions, not aqueous ones."],
    ],
    answer: "A",
    explanation: "The nth ionisation energy removes one electron from each (n − 1)+ gaseous ion: B²⁺(g) → B³⁺(g) + e⁻.",
  });
  {
    const v = IE.Ba;
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: `The first four ionisation energies of an element, in kJ mol⁻¹, are ${v.join(", ")}. In which group of the Periodic Table is the element?`,
      options: [["Group 2", `Correct: the biggest jump (${v[2]} ÷ ${v[1]} ≈ ${(v[2] / v[1]).toFixed(1)}) comes after the second electron.`], ["Group 1", "After the first electron the ratio is only about 1.9: the second electron comes from the same shell."], ["Group 3 (13)", "The third electron needs a much larger energy, so it is not in the outer shell."], ["Group 4 (14)", "A Group 14 element would show the jump after the fourth electron."]],
      answer: "A",
      explanation: `Ratios: ${(v[1] / v[0]).toFixed(2)}, ${(v[2] / v[1]).toFixed(2)}, ${(v[3] / v[2]).toFixed(2)}. The large jump after the 2nd ionisation shows two outer electrons: Group 2 (these are barium's values).`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does the first ionisation energy decrease down Group 1?",
    options: [
      ["The outer electron is further from the nucleus and more shielded by inner shells.", "Correct: extra shells increase distance and shielding, which outweigh the larger nuclear charge."],
      ["The nuclear charge decreases down the group.", "The nuclear charge increases down the group (more protons)."],
      ["The outer electron is paired, so spin-pair repulsion helps to remove it.", "Group 1 atoms have a single unpaired outer s electron."],
      ["The outer electron is in a p orbital of higher energy.", "Group 1 outer electrons are all in s orbitals."],
    ],
    answer: "A",
    explanation: "Down Group 1 the number of shells increases, so the outer s electron is further away and better shielded; the attraction it feels falls despite the extra protons.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which pair of adjacent Period 3 elements shows a **decrease** in first ionisation energy that is explained by spin-pair repulsion?",
    options: [
      ["phosphorus to sulfur", "Correct: sulfur's fourth 3p electron shares an orbital, and the repulsion makes it easier to remove."],
      ["magnesium to aluminium", "This dip is explained by aluminium's outer electron being in the higher-energy 3p sub-shell, shielded by 3s."],
      ["sulfur to chlorine", "First ionisation energy increases from S (1000) to Cl (1260 kJ mol⁻¹)."],
      ["argon to potassium", "This large fall is due to the new shell (4s), not pairing."],
    ],
    answer: "A",
    hints: ["Which element is the first in the period to have a paired p electron?"],
    explanation: "P (3p³) has three unpaired 3p electrons; S (3p⁴) has one pair. Repulsion within the pair lowers the first ionisation energy of S (1000) below that of P (1060 kJ mol⁻¹).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Use the data: second ionisation energies (kJ mol⁻¹) Na 4560, Mg 1450, Al 1820, Cl 2300, Ar 2660. Which Period 3 element has the largest second ionisation energy?",
    options: [
      ["sodium", "Correct: Na⁺ has the neon configuration, so its second electron comes from the full second shell, close to the nucleus and poorly shielded."],
      ["argon", "Argon has the largest first ionisation energy in the period, but its second electron still comes from the third shell."],
      ["chlorine", "Chlorine's second electron is a 3p electron, in the outer shell."],
      ["magnesium", "Magnesium has one of the lowest values: Mg⁺ still has a 3s electron to lose."],
    ],
    answer: "A",
    hints: ["Where does the second electron of sodium come from?"],
    explanation: "Na: 1s² 2s² 2p⁶ 3s¹. The first electron removed is 3s; the second must come from 2p, an inner shell, so the second ionisation energy of sodium (4560 kJ mol⁻¹) is by far the largest in Period 3.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Statements about successive ionisation energies of an element:\n\n1. Each successive ionisation energy is larger than the one before.\n2. A large jump shows that the next electron is removed from a shell closer to the nucleus.\n3. The second ionisation energy refers to removing two electrons from a gaseous atom.\n\nWhich of the statements are correct?",
    options: [
      ["1 and 2 only", "Correct: statement 3 describes the sum of the first and second ionisation energies."],
      ["1, 2 and 3", "Statement 3 is wrong: the second ionisation energy removes one electron from a 1+ ion."],
      ["2 and 3 only", "Statement 1 is correct and statement 3 is wrong."],
      ["1 only", "Statement 2 is also correct: big jumps mark a change of shell."],
    ],
    answer: "A",
    hints: ["Write the equation for the second ionisation energy."],
    explanation: "Successive values always rise (more positive ion, same nuclear charge); jumps show inner shells. The second ionisation energy is X⁺(g) → X²⁺(g) + e⁻.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Statements about the first ionisation energies of Period 2 elements:\n\n1. Boron's first ionisation energy is lower than beryllium's because boron's outer electron is in a 2p orbital.\n2. Both decreases are evidence that the second shell is divided into sub-shells and orbitals.\n3. Oxygen's first ionisation energy is lower than nitrogen's because oxygen has a smaller nuclear charge.\n\nWhich of the statements are correct?",
    options: [
      ["1 and 2 only", "Correct: statement 3 gives a wrong reason; oxygen has 8 protons, more than nitrogen's 7, and its dip is caused by spin-pair repulsion."],
      ["1, 2 and 3", "Statement 3 is wrong: oxygen has the larger nuclear charge."],
      ["2 and 3 only", "Statement 1 is correct and statement 3 is wrong."],
      ["1 only", "Statement 2 is also correct: the dips reveal the 2s/2p sub-shells and the pairing of 2p electrons."],
    ],
    answer: "A",
    hints: ["Check the reason in statement 3 carefully.", "Statement 2 is about what the dips show."],
    explanation: "Statement 1: correct (2p is higher in energy and shielded by 2s). Statement 2: correct, the two dips are evidence for sub-shells and orbitals. Statement 3: wrong reason; O has the larger nuclear charge, and the dip is due to the paired 2p electron.",
  });

  // ---- numerical
  {
    const v = IE.Mg;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: `Use the data (first and second ionisation energies of magnesium: ${v[0]} and ${v[1]} kJ mol⁻¹) to calculate the energy, in kJ mol⁻¹, needed to form one mole of gaseous Mg²⁺ ions from gaseous magnesium atoms.`,
      value: chk(v[0] + v[1], 2186), unit: "kJ/mol", wrong: [v[1], v[1] - v[0]],
      explanation: `Mg(g) → Mg²⁺(g) + 2e⁻ needs IE₁ + IE₂ = ${v[0]} + ${v[1]} = ${v[0] + v[1]} kJ mol⁻¹. Using IE₂ alone forgets that the first electron must be removed too.`,
    });
  }
  {
    const v = IE.B;
    b.num({
      d: 3, skill: "ANALYSIS",
      stem: `The first four ionisation energies of an element, in kJ mol⁻¹, are ${v.join(", ")}. How many electrons are in the outer shell of an atom of the element?`,
      value: chk(jumpAfter(v), 3), wrong: [1, 4],
      hints: ["Divide each value by the one before.", "Count the electrons removed before the biggest ratio."],
      explanation: `Ratios: ${(v[1] / v[0]).toFixed(2)}, ${(v[2] / v[1]).toFixed(2)}, ${(v[3] / v[2]).toFixed(2)}. The big jump after the third ionisation shows three outer electrons (boron, Group 13: 2s² 2p¹).`,
    });
  }
  {
    const perAtom = (IE.K[0] * 1000) / L;
    b.num({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`The first ionisation energy of potassium is ${IE.K[0]} kJ mol⁻¹. Calculate the energy, in joules, needed to ionise **one** potassium atom. Use $L = 6.022 \times 10^{23}\ \text{mol}^{-1}$. Give your answer to three significant figures.`,
      value: perAtom, unit: "J", wrong: [IE.K[0] / L],
      hints: ["Convert kJ to J first.", "Divide by the Avogadro constant."],
      explanation: `${IE.K[0]} kJ mol⁻¹ = ${IE.K[0] * 1000} J mol⁻¹; ÷ 6.022 × 10²³ = ${sfStr(perAtom * 1e19, 3)} × 10⁻¹⁹ J per atom. Forgetting to convert kJ to J gives an answer 1000 times too small.`,
    });
  }
  // ---- true/false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Argon has the highest first ionisation energy in Period 3.",
    answer: true,
    explanation: "True. Argon (1520 kJ mol⁻¹) has the largest nuclear charge in the period with its outer electrons in the same shell and similar shielding.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Ionisation energies can be either exothermic or endothermic, depending on the element.",
    answer: false,
    explanation: "False. Removing an electron always requires energy to overcome the attraction of the nucleus, so every ionisation energy is endothermic (positive).",
  });
  // ---- matching
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each observation with the main factor that explains it.",
    pairs: [
      ["First IE of K is lower than that of Na", "greater distance and shielding (extra shell)"],
      ["First IE of S is lower than that of P", "spin-pair repulsion"],
      ["First IE of Al is lower than that of Mg", "electron removed from a higher-energy p sub-shell"],
      ["First IE of Cl is higher than that of S", "greater nuclear charge, similar shielding"],
    ],
    hints: ["Two of these are the Period 3 dips; one is a group trend."],
    explanation: "Group trend: distance and shielding. Group 13 dip: 3p sub-shell. Group 16 dip: pairing. General rise across a period: nuclear charge.",
  });
  // ---- fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the explanation.",
    template: "Across Period 3 the first ionisation energy generally {{blank:a}} because the nuclear charge {{blank:b}} while the outer electrons are in the same shell, so {{blank:c}} stays about the same.",
    blanks: [
      { id: "a", accepted: ["increases"], choices: ["increases", "decreases", "stays the same"] },
      { id: "b", accepted: ["increases"], choices: ["increases", "decreases", "stays the same"] },
      { id: "c", accepted: ["shielding"], choices: ["shielding", "the nuclear charge", "the number of protons", "the mass"] },
    ],
    explanation: "More protons, same shell, similar shielding: outer electrons are held more strongly.",
  });
  // ---- short
  b.short({
    d: 2, skill: "APPLICATION",
    stem: t`Write the equation, with state symbols, for the second ionisation energy of calcium. Type it as, for example, X+(g) -> X2+(g) + e-`,
    accepted: ["Ca+(g) -> Ca2+(g) + e-", "Ca+(g) → Ca2+(g) + e-", "Ca+(g) -> Ca2+(g) + e", "Ca+ (g) -> Ca2+ (g) + e-", "Ca+(g) → Ca²⁺(g) + e⁻", "Ca+(g) -> Ca^2+(g) + e^-"],
    normalise: ["trim", "lowercase", "collapse_whitespace"],
    wrong: ["Ca(g) -> Ca2+(g) + 2e-"],
    explanation: "The second ionisation energy removes one electron from each gaseous Ca⁺ ion: Ca⁺(g) → Ca²⁺(g) + e⁻.",
  });
  // ---- self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the first ionisation energy of magnesium is greater than that of aluminium, even though aluminium has more protons.",
    points: [
      "Al's outer electron is in a 3p orbital whereas Mg's is in 3s",
      "3p is higher in energy / further from the nucleus than 3s",
      "The 3p electron is partly shielded by the 3s electrons, so less energy is needed (outweighing the extra proton)",
    ],
    modelAnswer: "Magnesium loses a 3s electron, but aluminium loses a 3p electron. The 3p sub-shell is higher in energy and slightly further from the nucleus, and the 3p electron is partly shielded by the filled 3s sub-shell, so it is removed more easily despite aluminium's extra proton.",
    hints: ["Compare the sub-shells the electrons come from."],
    explanation: "The Group 13 dip is a sub-shell effect.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: `The first four ionisation energies of silicon are ${IE.Si.join(", ")} kJ mol⁻¹ and the fifth is about 16 100 kJ mol⁻¹ (data). Explain what these values show about the electron arrangement of silicon.`,
    points: [
      "Values increase steadily for the first four: each electron removed from an increasingly positive ion",
      "Big jump between the 4th and 5th: the fifth electron is removed from an inner shell (n = 2)",
      "That shell is closer to the nucleus and less shielded",
      "So silicon has four outer electrons / is in Group 14 (3s² 3p²)",
    ],
    modelAnswer: "The first four values rise steadily because each electron is removed from a more positive ion with the same nuclear charge. There is then a very large jump to the fifth, because that electron comes from the second shell, much closer to the nucleus and with far less shielding. So silicon has four electrons in its outer shell (3s² 3p²) and is in Group 14.",
    hints: ["Find the biggest jump.", "Explain both the steady rise and the jump."],
    explanation: "Steady rise then a jump after the 4th electron: Group 14.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define the *first ionisation energy* of an element.",
    points: ["Energy required to remove one electron from each atom in one mole of atoms", "Gaseous atoms forming gaseous 1+ ions"],
    modelAnswer: "The energy needed to remove one electron from each atom in one mole of gaseous atoms to form one mole of gaseous 1+ ions.",
    explanation: "Both 'one mole' and 'gaseous' are needed.",
  });
  // ---- practice structured
  {
    const v = IE.Sr;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: `Tendai is given the first four ionisation energies of element M: ${v.join(", ")} kJ mol⁻¹. M is in Period 5.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the ratio of the third ionisation energy to the second, to two decimal places.", value: v[2] / v[1], dp: 2, wrong: [v[1] / v[0]], explanation: `${v[2]} ÷ ${v[1]} = ${(v[2] / v[1]).toFixed(2)}.` }),
        P.short({ label: "(b)", marks: 1, stem: "State the group of M.", accepted: ["2", "Group 2", "group II", "II"], wrong: ["3"], explanation: "The jump after the second electron shows two outer electrons." }),
        P.short({ label: "(c)", marks: 1, stem: "Name element M.", accepted: ["strontium", "Sr"], wrong: ["barium"], explanation: "The Group 2 element in Period 5 is strontium." }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the energy, in kJ mol⁻¹, for M(g) → M²⁺(g) + 2e⁻.", value: chk(v[0] + v[1], 1608), unit: "kJ/mol", wrong: [v[1]], explanation: `${v[0]} + ${v[1]} = ${v[0] + v[1]} kJ mol⁻¹.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Predict, with a reason, whether the first ionisation energy of barium (Period 6, same group) is higher or lower than that of M.", points: ["Lower", "Ba has an extra shell: outer electron further away and more shielded, outweighing the larger nuclear charge"], modelAnswer: "Lower: barium's outer electrons are in the sixth shell, further from the nucleus and more shielded, which outweighs its larger nuclear charge. (Data booklet: Ba 502 kJ mol⁻¹.)" }),
      ],
      hints: ["Divide successive values.", "Both outer electrons must be removed for the 2+ ion."],
      explanation: "Strontium: Group 2; IE₁ + IE₂ = 1608 kJ mol⁻¹; Ba is lower because of distance and shielding.",
    });
  }
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "First ionisation energies (kJ mol⁻¹) of the Period 2 elements: Li 519, Be 900, B 799, C 1090, N 1400, O 1310, F 1680, Ne 2080.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the element whose first ionisation energy is lower than that of the element before it because of spin-pair repulsion.", accepted: ["oxygen", "O"], wrong: ["boron"], explanation: "O (2p⁴) has the first paired 2p electron." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the first ionisation energy of boron is lower than that of beryllium.", points: ["B's outer electron is in 2p, Be's in 2s", "2p is higher in energy / shielded by the 2s electrons, so less energy is needed"], modelAnswer: "Boron loses a 2p electron, which is higher in energy than beryllium's 2s electron and partly shielded by the 2s pair, so it is easier to remove." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which element of Period 3 would you expect to have a lower first ionisation energy than the Period 2 element directly above it, for the reason that its outer electrons are further from the nucleus?", options: [["Every Period 3 element", "Correct: each has an extra shell compared with the element above it, so all are lower."], ["Only sodium", "Every pair in the same group shows the same effect, not only Group 1."], ["Only argon", "The extra shell lowers the value for every group."], ["None of the Period 3 elements", "Data booklet values confirm each Period 3 value is lower than the value above it (e.g. Mg 736 < Be 900)."]], answer: "A", explanation: "Down every group the first ionisation energy falls: more distance and shielding." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain the large decrease in first ionisation energy from neon to sodium.", points: ["Na's outer electron is in a new shell (3s)", "Further from the nucleus and shielded by two inner shells, so much less energy is needed despite one more proton"], modelAnswer: "Sodium's outer electron is in the third shell, further from the nucleus and shielded by the full first and second shells, so it is held much less strongly than neon's 2p electrons, even though sodium has one more proton." }),
    ],
    hints: ["Use the four factors: nuclear charge, distance, shielding, pairing."],
    explanation: "Dips: B (2p sub-shell) and O (pairing); fall to Na: new shell.",
  });

  // ---- flashcards
  b.card("DEFINITION", "Define **first ionisation energy**.", "The energy required to remove one electron from each atom in one mole of gaseous atoms to form one mole of gaseous 1+ ions.");
  b.card("FORMULA", "Equation for the second ionisation energy of an element X?", "X⁺(g) → X²⁺(g) + e⁻");
  b.card("CONCEPT", "Four factors affecting ionisation energy?", "Nuclear charge; distance of the electron from the nucleus (radius); shielding by inner electrons; spin-pair repulsion.");
  b.card("CONCEPT", "Why does first IE decrease down a group?", "Extra shell: outer electron further away and more shielded; this outweighs the increased nuclear charge.");
  b.card("CONCEPT", "Why is the first IE of Al lower than Mg?", "Al's outer electron is in 3p (higher energy, shielded by 3s) while Mg's is in 3s.");
  b.card("CONCEPT", "Why is the first IE of S lower than P?", "S has a paired 3p electron; spin-pair repulsion makes it easier to remove. P's three 3p electrons are unpaired.");
  b.card("CONCEPT", "What does a big jump in successive ionisation energies show?", "The next electron is removed from an inner shell (closer to the nucleus, less shielded). Electrons before the jump = outer-shell electrons = group.");
  b.card("FACT", "Why does each successive ionisation energy increase?", "Each electron is removed from a more positive ion: same nuclear charge, fewer electrons, less repulsion, smaller ion.");
});
