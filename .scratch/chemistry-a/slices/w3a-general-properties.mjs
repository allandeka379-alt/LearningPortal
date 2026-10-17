// W3a: achem.transition.general-properties (both boards; ZIMSEC Form 6, Cambridge A Level). Contrast with calcium and
// paramagnetism: ZIMSEC detail (applies ZIM).
import { concept, P, t, chk, AR, sfStr, ZIM } from "../lib.mjs";

// Cambridge 9701 data section ionisation energies (kJ mol⁻¹).
const IE = { K: [418, 3070, 4600, 5860], Ca: [590, 1150, 4940, 6480], Mn: [716, 1510, 3250, 5190], Sc: [632, 1240, 2390, 7110], Ti: [661, 1310, 2720, 4170], V: [648, 1370, 2870, 4600], Cr: [653, 1590, 2990, 4770], Fe: [762, 1560, 2960, 5400], Cu: [745, 1960, 3350, 5690], Zn: [908, 1730, 3828, 5980] };
const sumIE = (el, n) => IE[el].slice(0, n).reduce((a, b) => a + b, 0);

concept("achem.transition.general-properties", { file: "transition/general-properties", keyPrefix: "transition.general-properties" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which element in the first row of the d block is NOT a transition element?",
    options: [
      ["zinc", "Correct: its only ion, Zn²⁺, has a full 3d¹⁰ sub-shell."],
      ["titanium", "Ti³⁺ is [Ar] 3d¹, an incomplete d sub-shell, so titanium is a transition element."],
      ["copper", "Cu²⁺ is [Ar] 3d⁹, so copper is a transition element even though the atom is 3d¹⁰ 4s¹."],
      ["nickel", "Ni²⁺ is [Ar] 3d⁸, an incomplete d sub-shell."],
    ],
    answer: "A",
    explanation: "A transition element forms at least one stable ion with an incomplete d sub-shell. Scandium (Sc³⁺, 3d⁰) and zinc (Zn²⁺, 3d¹⁰) do not.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "What is the electron configuration of the Cr³⁺ ion?",
    options: [
      ["[Ar] 3d³", "Correct: Cr is [Ar] 3d⁵ 4s¹; the 4s electron and two 3d electrons are removed."],
      ["[Ar] 3d¹ 4s²", "The 4s electrons are lost before the 3d electrons, not kept."],
      ["[Ar] 3d² 4s¹", "This keeps a 4s electron; ions lose all their 4s electrons first."],
      ["[Ar] 3d⁵", "This has lost only the 4s electron: it is the configuration of Cr⁺."],
    ],
    answer: "A",
    explanation: "Cr: [Ar] 3d⁵ 4s¹. Remove the 4s electron, then two 3d electrons: Cr³⁺ is [Ar] 3d³.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which gaseous ion has the greatest number of unpaired electrons?",
    options: [
      [t`$\ce{Fe^3+}$`, "Correct: 3d⁵, one electron in each of the five d orbitals, so five unpaired."],
      [t`$\ce{Cu^2+}$`, "3d⁹ has only one unpaired electron."],
      [t`$\ce{Ni^2+}$`, "3d⁸ has two unpaired electrons."],
      [t`$\ce{Cr^3+}$`, "3d³ has three unpaired electrons."],
    ],
    answer: "A",
    explanation: "Electrons occupy d orbitals singly before pairing (Hund's rule): d⁵ gives the maximum of five unpaired electrons.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the statements help to explain why the first-row transition elements show variable oxidation states?\n\n1. The 3d and 4s electrons have similar energies.\n2. Successive ionisation energies rise gradually while 3d and 4s electrons are removed.\n3. The atoms of every transition element have a full 3d sub-shell.",
    options: [
      ["1 and 2 only", "Correct: similar energies mean no sudden large jump in ionisation energy until the 3d and 4s electrons are used up."],
      ["1, 2 and 3", "Statement 3 is false: only copper among Ti-Cu has a full 3d sub-shell in the atom."],
      ["2 and 3 only", "Statement 1 is true, and statement 3 is false."],
      ["1 only", "Statement 2 is also true; it is the ionisation-energy evidence for statement 1."],
    ],
    answer: "A",
    hints: ["Check statement 3 against the configuration of titanium."],
    explanation: "Because 3d and 4s are close in energy, different numbers of electrons can be lost or used in bonding; the ionisation energies show no huge jump until the core is reached.",
  });
  b.mcq({
    d: 3, skill: "RECALL",
    stem: "Which description fits the 3dz² orbital?",
    options: [
      ["two lobes along the z axis and a ring of density in the xy plane", "Correct: the dz² orbital is unique in having a ring (doughnut) around its middle."],
      ["four lobes lying in the xy plane, pointing between the x and y axes", "This describes the 3dxy orbital."],
      ["four lobes lying in the xy plane, pointing along the x and y axes", "This describes the 3dx²−y² orbital."],
      ["a single sphere of density centred on the nucleus, larger than 3s", "A sphere describes an s orbital, not a d orbital."],
    ],
    answer: "A",
    hints: ["Only one d orbital has a ring."],
    explanation: "3dz²: two lobes on the z axis plus a torus in the xy plane. 3dxy: four lobes between the x and y axes.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does the atomic radius change very little from titanium to copper?",
    options: [
      ["Extra 3d electrons shield the 4s electrons, roughly balancing the rising nuclear charge.", "Correct: each added electron enters an inner sub-shell, so the outer 4s electrons feel a nearly constant pull."],
      ["The nuclear charge stays the same across the series, so the pull on the electrons is the same.", "The nuclear charge rises by one with each element."],
      ["Each extra electron enters the 4s sub-shell, which is already full in every atom.", "The extra electrons go into 3d, not 4s."],
      ["The metallic bonding gets weaker, so the atoms move further apart.", "Bonding strength does not explain the size of isolated atoms."],
    ],
    answer: "A",
    hints: ["Which sub-shell receives the extra electron each time?"],
    explanation: "Across Ti-Cu each step adds a proton and a 3d electron. The 3d electron shields the 4s electrons fairly effectively, so the effective nuclear charge on them and the radius hardly change.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: `The first four ionisation energies of a Period 4 element **Q** are ${IE.Ti.join(", ")} kJ mol⁻¹. Data for three other Period 4 elements (kJ mol⁻¹):\n\n| element | IE₁ | IE₂ | IE₃ | IE₄ |\n|---|---|---|---|---|\n| potassium | ${IE.K.join(" | ")} |\n| scandium | ${IE.Sc.join(" | ")} |\n| zinc | ${IE.Zn.join(" | ")} |\n\nWhich element is **Q**?`,
    options: [
      ["titanium", "Correct: no large jump up to IE₄, so four electrons (3d² 4s²) can be removed before the argon core."],
      ["potassium", "Potassium's big jump is at IE₂: it has only one outer electron."],
      ["scandium", "Scandium's data show a big jump at IE₄ (three outer electrons)."],
      ["zinc", "Zinc's IE₁ (908) is far higher than Q's (661)."],
    ],
    answer: "A",
    hints: ["Look for where each element's large jump comes.", "Q has no large jump among its first four values."],
    explanation: "Q loses four electrons without breaking into the core, so it has four 3d and 4s electrons: titanium, [Ar] 3d² 4s², which shows a highest oxidation state of +4.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Which statements correctly compare iron with calcium?\n\n1. Iron has the higher melting point.\n2. Iron has the higher density.\n3. Iron has the larger atomic radius.",
    options: [
      ["1 and 2 only", "Correct: iron atoms are smaller, so statement 3 is false."],
      ["1, 2 and 3", "Statement 3 is false: iron's metallic radius is much smaller than calcium's."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: iron is about five times as dense as calcium."],
    ],
    answer: "A",
    hints: ["Iron has a larger nuclear charge and poorly shielding 3d electrons."],
    explanation: "Iron: stronger metallic bonding (3d and 4s electrons delocalised) gives a higher melting point; heavier, smaller atoms give a higher density; a larger effective nuclear charge gives a smaller radius.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Which of these ions is NOT paramagnetic?",
    options: [
      [t`$\ce{Sc^3+}$`, "Correct: [Ar] 3d⁰ has no unpaired electrons."],
      [t`$\ce{Ti^3+}$`, "3d¹ has one unpaired electron, so it is paramagnetic."],
      [t`$\ce{V^3+}$`, "3d² has two unpaired electrons, so it is paramagnetic."],
      [t`$\ce{Cu^2+}$`, "3d⁹ has one unpaired electron, so it is paramagnetic."],
    ],
    answer: "A",
    explanation: "Paramagnetism needs unpaired electrons. Sc³⁺ (3d⁰) and Zn²⁺ (3d¹⁰) have none.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "How many unpaired electrons are there in a gaseous Co²⁺ ion?",
    value: 3,
    wrong: [1],
    explanation: "Co is [Ar] 3d⁷ 4s²; Co²⁺ is [Ar] 3d⁷. Five d orbitals: five electrons singly, then two pair up, leaving 3 unpaired.",
  });
  {
    const e = sumIE("V", 3);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `The first three ionisation energies of vanadium are ${IE.V.slice(0, 3).join(", ")} kJ mol⁻¹. Calculate the energy, in kJ mol⁻¹, needed to convert one mole of gaseous vanadium atoms into gaseous V³⁺ ions.`,
      value: e, unit: "kJ/mol",
      wrong: [IE.V[2]],
      hints: ["Three electrons are removed one after another."],
      explanation: `1. V(g) → V³⁺(g) + 3e⁻ needs IE₁ + IE₂ + IE₃.\n2. ${IE.V.slice(0, 3).join(" + ")} = ${e} kJ mol⁻¹.\n3. Using IE₃ alone (${IE.V[2]}) gives only the energy for V²⁺ → V³⁺.`,
    });
  }
  {
    const perMol = sumIE("Mn", 2);
    const kJ = (2.0 / AR.Mn) * perMol;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: `The first two ionisation energies of manganese are ${IE.Mn[0]} and ${IE.Mn[1]} kJ mol⁻¹. Calculate the energy, in kJ, needed to convert 2.00 g of gaseous manganese atoms into gaseous Mn²⁺ ions, to three significant figures. (Ar: Mn 54.9)`,
      value: kJ, sf: 3, unit: "kJ",
      wrong: [sfStr(2 * IE.Mn[1] / AR.Mn, 3), sfStr(perMol, 3)],
      hints: ["First find the energy per mole, then the amount in 1.00 g."],
      explanation: `1. Energy per mole for Mn(g) → Mn²⁺(g) = ${IE.Mn[0]} + ${IE.Mn[1]} = ${perMol} kJ mol⁻¹.\n2. n(Mn) = 2.00 ÷ 54.9 = ${sfStr(2 / AR.Mn, 3)} mol.\n3. Energy = ${sfStr(2 / AR.Mn, 3)} × ${perMol} = ${sfStr(kJ, 3)} kJ. Using IE₂ alone gives ${sfStr(2 * IE.Mn[1] / AR.Mn, 3)} kJ; forgetting to convert to moles gives ${perMol} kJ.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Copper is a transition element even though a copper atom has a full 3d sub-shell.",
    answer: true,
    explanation: "True. The definition is about ions: Cu²⁺ is [Ar] 3d⁹, an incomplete d sub-shell.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each characteristic property of transition elements with an example of it.",
    pairs: [
      ["variable oxidation states", "manganese in MnO₄⁻ and in Mn²⁺"],
      ["catalytic activity", "iron in the Haber process"],
      ["complex formation", "[Cu(NH₃)₄(H₂O)₂]²⁺ in excess ammonia"],
      ["coloured compounds", "pink [Co(H₂O)₆]²⁺ ions"],
    ],
    extraRight: ["white calcium oxide"],
    explanation: "Calcium oxide is white: calcium (an s-block metal) shows none of the four properties.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Complete the electron configurations of nickel and of the Ni²⁺ ion.",
    template: "Ni atom: [Ar] {{blank:a}}. Ni²⁺ ion: [Ar] {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["3d⁸ 4s²"], choices: ["3d⁸ 4s²", "3d¹⁰", "3d⁸", "3d⁶ 4s²"] },
      { id: "b", accepted: ["3d⁸"], choices: ["3d⁸ 4s²", "3d¹⁰", "3d⁸", "3d⁶ 4s²"] },
    ],
    explanation: "Ni (Z = 28): [Ar] 3d⁸ 4s². The ion loses the two 4s electrons: [Ar] 3d⁸.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "Name the element of the first d-block row that forms only a 3+ ion, with an empty d sub-shell.",
    accepted: ["scandium", "Sc"],
    wrong: ["zinc"],
    hints: ["It is the first element of the row."],
    explanation: "Scandium forms only Sc³⁺, [Ar] 3d⁰, so it is a d-block element but not a transition element.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Scandium and zinc are d-block elements. Explain why neither is classed as a transition element.",
    points: [
      "Definition: a transition element forms at least one stable ion with an incomplete d sub-shell",
      "Scandium forms only Sc³⁺, [Ar] 3d⁰ (empty d sub-shell)",
      "Zinc forms only Zn²⁺, [Ar] 3d¹⁰ (full d sub-shell)",
    ],
    modelAnswer: "A transition element must form at least one stable ion with a partly filled d sub-shell. Scandium's only ion is Sc³⁺, [Ar] 3d⁰, with an empty d sub-shell, and zinc's only ion is Zn²⁺, [Ar] 3d¹⁰, with a full one, so neither qualifies.",
    hints: ["Write the configuration of the only ion each element forms."],
    explanation: "The test is the ion, not the atom.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: "The first ionisation energy rises steeply across Period 3 (Na to Ar) but changes little across the transition elements (Ti to Cu). Explain the difference.",
    points: [
      "Across Period 3 each added electron enters the same outer shell, which gives little extra shielding, so the effective nuclear charge rises and electrons are held more tightly",
      "Across Ti-Cu each added electron enters the inner 3d sub-shell",
      "The 3d electrons shield the outer 4s electrons, roughly cancelling the extra proton, so the attraction for the 4s electron hardly changes",
    ],
    modelAnswer: "In Period 3 the extra electron goes into the same outer shell as the others, so it shields poorly; the rising nuclear charge pulls the outer electrons in more strongly and IE₁ rises. From titanium to copper the extra electron goes into the inner 3d sub-shell, where it shields the 4s electrons that are removed first. The increase in nuclear charge is almost balanced by this shielding, so IE₁ changes little.",
    hints: ["Which electron is removed first in a transition metal atom?"],
    explanation: "Inner 3d electrons shield the outer 4s electrons.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4, applies: ZIM,
    stem: "Explain why iron has a much higher melting point and a much higher density than calcium.",
    points: [
      "Iron can delocalise both 3d and 4s electrons (more delocalised electrons per atom than calcium's two 4s electrons)",
      "So the metallic bonding in iron is stronger and more energy is needed to melt it",
      "Iron atoms are smaller than calcium atoms (larger nuclear charge, poor shielding by 3d), so they pack more closely",
      "Iron atoms are also heavier (Ar 55.8 against 40.1), so more mass is packed into each unit volume",
    ],
    modelAnswer: "In iron both the 4s and some 3d electrons are delocalised, so there are more delocalised electrons attracting the cations than in calcium, which has only its two 4s electrons. The metallic bonding is stronger and the melting point higher. Iron atoms are both heavier and smaller than calcium atoms, so more mass is packed into each cubic centimetre and the density is higher.",
    hints: ["Melting point: bonding. Density: mass and size of the atoms."],
    explanation: "Melting point depends on the strength of the metallic bonding; density on atomic mass and atomic size.",
  });
  {
    const e = sumIE("Cr", 3);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: `The first four ionisation energies of a Period 4 element **X** are ${IE.Cr.join(", ")} kJ mol⁻¹. **X** forms a yellow anion XO₄²⁻ and a green aqueous ion X³⁺. Its atoms have a half-filled 3d sub-shell.`,
      parts: [
        P.fib({ label: "(a)", stem: "Complete the electron configuration of an atom of **X**.", template: "[Ar] {{blank:a}}", blanks: [{ id: "a", accepted: ["3d⁵ 4s¹"], choices: ["3d⁵ 4s¹", "3d⁴ 4s²", "3d⁵ 4s²", "3d⁶"] }], explanation: "X is chromium: [Ar] 3d⁵ 4s¹ (half-filled 3d with one 4s electron is the lower-energy arrangement)." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the energy, in kJ mol⁻¹, needed to form one mole of gaseous X³⁺ ions from gaseous X atoms.", value: e, unit: "kJ/mol", wrong: [IE.Cr[2]], explanation: `${IE.Cr.slice(0, 3).join(" + ")} = ${e} kJ mol⁻¹.` }),
        P.short({ label: "(c)", stem: "Give the electron configuration of the X³⁺ ion, in the form [Ar] 3dⁿ (type it as, for example, [Ar] 3d4).", accepted: ["[Ar] 3d3", "[Ar]3d3", "[Ar] 3d³", "[Ar]3d³", "1s2 2s2 2p6 3s2 3p6 3d3"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["[Ar] 3d1 4s2"], explanation: "Remove 4s¹ then two 3d electrons: [Ar] 3d³." }),
        P.num({ label: "(d)", stem: "How many unpaired electrons does an X³⁺ ion have?", value: 3, wrong: [1], explanation: "3d³: three electrons in three different d orbitals." }),
        P.manual({ label: "(e)", marks: 2, stem: "In XO₄²⁻ the oxidation state of X is +6. Explain why X can reach this oxidation state but calcium cannot exceed +2.", points: ["X has six 3d and 4s electrons of similar energy, all of which can be used in bonding (to oxygen)", "Calcium has only two electrons outside a noble-gas core; removing a third (from 3p) needs far too much energy"], modelAnswer: "Chromium has six electrons in the 3d and 4s sub-shells, which are close in energy, so all six can be involved in bonding to oxygen in CrO₄²⁻. Calcium has only two electrons outside its argon core; a third would have to come from the 3p sub-shell, which needs a very large ionisation energy." }),
        P.mcq({ label: "(f)", stem: "Which property of the X³⁺ ion depends on its partly filled d sub-shell?", options: [
          ["its green colour in aqueous solution", "Correct: d-d electron transitions absorb visible light."],
          ["its 3+ charge", "The charge depends on how many electrons are lost, not on the d sub-shell being partly filled."],
          ["its solubility as a sulfate in water", "Many s-block ions form soluble sulfates too."],
          ["its reaction with hydroxide ions", "Hydroxide precipitates form with ions of all kinds of metals."],
        ], answer: "A", explanation: "Colour arises from electrons moving between split d orbitals, which needs a partly filled d sub-shell." }),
      ],
      hints: ["A half-filled 3d sub-shell with one 4s electron identifies X.", "Ions lose 4s electrons first."],
      explanation: `X is chromium. Cr³⁺ is [Ar] 3d³ with three unpaired electrons; forming it from Cr(g) needs ${e} kJ mol⁻¹.`,
    });
  }
  {
    const e = sumIE("Cu", 2);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, applies: ZIM,
      stem: "Data (textbook values) for potassium, an s-block metal, and copper, a transition metal, both in Period 4:\n\n| property | potassium | copper |\n|---|---|---|\n| melting point / °C | 63 | 1085 |\n| density / g cm⁻³ | 0.86 | 8.96 |\n| colour of the sulfate | white | white when anhydrous, blue when hydrated |",
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why copper has the higher melting point.", points: ["Copper has more delocalised electrons per atom (3d as well as 4s electrons, against one 4s electron for potassium) and smaller, more highly charged cations", "So its metallic bonding is stronger and needs more energy to break"], modelAnswer: "Copper uses 3d as well as 4s electrons in metallic bonding and its cations are smaller and more highly charged, so the attraction between the cations and the delocalised electrons is much stronger than in potassium, which delocalises only one electron per atom." }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain why copper has the higher density.", points: ["Copper atoms are heavier (Ar 63.5 against 39.1)", "Copper atoms are much smaller, so they pack more closely"], modelAnswer: "Copper atoms have a larger mass and a much smaller radius than potassium atoms, so more mass is packed into each unit volume." }),
        P.fib({ label: "(c)", stem: "Complete the electron configurations.", template: "Cu: [Ar] {{blank:a}}; Cu²⁺: [Ar] {{blank:b}}", blanks: [
          { id: "a", accepted: ["3d¹⁰ 4s¹"], choices: ["3d¹⁰ 4s¹", "3d⁹ 4s²", "3d⁹", "3d⁸ 4s¹"] },
          { id: "b", accepted: ["3d⁹"], choices: ["3d¹⁰ 4s¹", "3d⁹ 4s²", "3d⁹", "3d⁸ 4s¹"] },
        ], explanation: "Cu: [Ar] 3d¹⁰ 4s¹ (full 3d is more stable); Cu²⁺ loses 4s¹ and one 3d electron: 3d⁹." }),
        P.num({ label: "(d)", stem: "The first two ionisation energies of copper are 745 and 1960 kJ mol⁻¹. Calculate the energy, in kJ mol⁻¹, needed to form Cu²⁺(g) from Cu(g).", value: e, unit: "kJ/mol", wrong: [1960], explanation: `745 + 1960 = ${e} kJ mol⁻¹.` }),
        P.tf({ label: "(e)", stem: "Copper(II) sulfate is paramagnetic, but potassium sulfate is not.", answer: true, explanation: "True: Cu²⁺ (3d⁹) has one unpaired electron; K⁺ has none." }),
        P.manual({ label: "(f)", marks: 4, stem: "Hydrated copper(II) sulfate is blue, but potassium sulfate and copper(I) compounds such as copper(I) iodide are white. Use electron configurations to explain the difference.", points: ["K⁺ has the argon configuration with no d electrons, so no d-d transition is possible (white)", "Cu²⁺ is 3d⁹: a partly filled d sub-shell", "In hydrated copper(II) sulfate the water ligands split the d orbitals, so an electron can absorb visible light and move to a higher d orbital: the compound is coloured", "Cu⁺ is 3d¹⁰: the d sub-shell is full, so no d-d transition is possible and no visible light is absorbed (white)"], modelAnswer: "K⁺ has no d electrons, so potassium sulfate cannot absorb visible light by a d-d transition and is white. Cu²⁺ is [Ar] 3d⁹. Water ligands split its d orbitals, and an electron can absorb visible light to move into the higher, partly empty level, so the compound is coloured. Cu⁺ is [Ar] 3d¹⁰; every d orbital is full, so there is no d-d transition and copper(I) iodide is white." }),
      ],
      hints: ["Think about bonding for melting point and about mass and size for density.", "Colour needs a partly filled d sub-shell."],
      explanation: "Copper: stronger metallic bonding, heavier and smaller atoms; Cu²⁺ (3d⁹) is coloured and paramagnetic, Cu⁺ (3d¹⁰) is colourless.",
    });
  }
  b.card("DEFINITION", "Transition element", "A d-block element that forms one or more stable ions with an incomplete d sub-shell.");
  b.card("FACT", "Why Sc and Zn are not transition elements", "Sc forms only Sc³⁺ (3d⁰) and Zn forms only Zn²⁺ (3d¹⁰): neither ion has a partly filled d sub-shell.");
  b.card("FACT", "Configurations of Cr and Cu atoms", "Cr: [Ar] 3d⁵ 4s¹. Cu: [Ar] 3d¹⁰ 4s¹ (half-filled or full 3d is lower in energy).");
  b.card("CONCEPT", "Which electrons do transition metal atoms lose first?", "The 4s electrons, then 3d. Fe²⁺ is [Ar] 3d⁶; Fe³⁺ is [Ar] 3d⁵.");
  b.card("FACT", "The four characteristic properties", "Variable oxidation states, catalytic activity, complex formation, coloured compounds.");
  b.card("CONCEPT", "Why variable oxidation states?", "3d and 4s electrons have similar energies, so different numbers can be lost or shared without a large jump in ionisation energy.");
  b.card("FACT", "Shapes of 3dxy and 3dz²", "3dxy: four lobes in the xy plane between the axes. 3dz²: two lobes along z plus a ring in the xy plane.");
  b.card("CONCEPT", "Why radius and IE₁ change little from Ti to Cu", "Extra electrons enter the inner 3d sub-shell and shield the 4s electrons, roughly cancelling the extra nuclear charge.");
  b.card("FACT", "Transition metal compared with calcium", "Higher melting point and density, smaller atoms, higher IE₁, several oxidation states, coloured and often paramagnetic compounds.", undefined, { applies: ZIM });
});
