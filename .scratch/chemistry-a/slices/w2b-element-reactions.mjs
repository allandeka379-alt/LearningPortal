// W2b: achem.periodicity.element-reactions (both boards; ZIMSEC Form 5, Cambridge AS Level).
import { concept, P, t, Mr, AR, VM_RTP, sfStr } from "../lib.mjs";

concept("achem.periodicity.element-reactions", { file: "periodicity/element-reactions", keyPrefix: "periodicity.element-reactions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is seen when sulfur burns in air?",
    options: [
      ["a blue flame and a colourless, choking gas", "Correct: sulfur dioxide is formed."],
      ["a brilliant white flame and a white powder", "This describes magnesium burning."],
      ["a yellow-orange flame and a white solid", "This describes sodium burning."],
      ["dense white smoke and a yellow-white flame", "This describes white phosphorus burning to P₄O₁₀."],
    ],
    answer: "A",
    explanation: "S(s) + O₂(g) → SO₂(g): a blue flame and a pungent colourless gas.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which equation shows the reaction of magnesium with steam?",
    options: [
      [t`$\ce{Mg + H2O -> MgO + H2}$`, "Correct: steam gives the oxide and hydrogen."],
      [t`$\ce{Mg + 2H2O -> Mg(OH)2 + H2}$`, "This is the very slow reaction with cold water."],
      [t`$\ce{2Mg + H2O -> Mg2O + H2}$`, "Mg₂O does not exist; magnesium forms Mg²⁺."],
      [t`$\ce{Mg + H2O -> MgH2 + O}$`, "Oxygen atoms are not released and no hydride forms."],
    ],
    answer: "A",
    explanation: "Heated magnesium glows in steam: Mg(s) + H₂O(g) → MgO(s) + H₂(g).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the oxidation number of the Period 3 element in each of the chlorides NaCl, MgCl₂, AlCl₃, SiCl₄ and PCl₅?",
    options: [
      ["+1, +2, +3, +4, +5", "Correct: each equals the number of outer-shell electrons."],
      ["+1, +2, +3, −4, −3", "The Period 3 element is less electronegative than chlorine, so it is positive."],
      ["+1, +1, +1, +1, +1", "The oxidation number rises with the number of chlorine atoms bonded."],
      ["−1, −2, −3, −4, −5", "Chlorine is −1; the Period 3 element is positive."],
    ],
    answer: "A",
    explanation: "Chlorine is −1, so the Period 3 element's oxidation number equals the number of Cl atoms per atom of it.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the product when white phosphorus burns in excess oxygen?",
    options: [
      [t`$\ce{P4O10}$`, "Correct: phosphorus(V) oxide."],
      [t`$\ce{P4O6}$`, "This forms when oxygen is limited."],
      [t`$\ce{PO2}$`, "This is not a stable oxide of phosphorus."],
      [t`$\ce{H3PO4}$`, "This acid forms when P₄O₁₀ reacts with water."],
    ],
    answer: "A",
    explanation: "P₄ + 5O₂ → P₄O₁₀, seen as dense white smoke.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the reactions of sodium and magnesium with water are correct?\n\n1. Sodium reacts vigorously with cold water to give a strongly alkaline solution.\n2. Magnesium reacts very slowly with cold water to give a weakly alkaline solution.\n3. Both metals give the metal oxide and hydrogen with cold water.",
    options: [
      ["1 and 2 only", "Correct: cold water gives hydroxides, not oxides."],
      ["1, 2 and 3", "Statement 3 is false: NaOH and Mg(OH)₂ form with cold water."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: Mg(OH)₂ is only slightly soluble."],
    ],
    answer: "A",
    hints: ["Which product forms with steam and which with cold water?"],
    explanation: "Cold water gives hydroxides (NaOH strongly alkaline, Mg(OH)₂ weakly); only steam gives MgO.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements explain why the highest oxidation number of the elements increases from sodium to sulfur?\n\n1. The number of outer-shell electrons increases by one at each step.\n2. In the highest oxides all the outer-shell electrons are used in bonding to oxygen.\n3. Oxygen is less electronegative than each of these elements.",
    options: [
      ["1 and 2 only", "Correct: oxygen is more electronegative than all of them, so statement 3 is false."],
      ["1, 2 and 3", "Statement 3 is false: oxygen takes the bonding electrons, giving the element a positive oxidation number."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also needed to explain why all outer electrons count."],
    ],
    answer: "A",
    hints: ["Which atom is assigned the bonding electrons?"],
    explanation: "Na₂O +1 up to SO₃ +6: every outer electron is counted as given to the more electronegative oxygen.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A Period 3 element forms a chloride that is a colourless liquid at room temperature and an oxide with a very high melting point that is insoluble in water. Which element is it?",
    options: [
      ["silicon", "Correct: SiCl₄ is a volatile liquid and SiO₂ is giant covalent."],
      ["phosphorus", "PCl₅ is a solid and P₄O₁₀ reacts with water."],
      ["aluminium", "Aluminium chloride is a solid that sublimes."],
      ["sulfur", "Sulfur dioxide is a gas, not a high-melting solid."],
    ],
    answer: "A",
    hints: ["Which Period 3 oxide is a giant covalent solid?"],
    explanation: "A liquid chloride means simple covalent molecules (SiCl₄); a high-melting insoluble oxide is giant covalent SiO₂.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Selenium is below sulfur in Group 16. Using periodicity, which is the most likely formula of selenium's oxide in its highest oxidation state, and the nature of that oxide?",
    options: [
      [t`$\ce{SeO3}$, an acidic oxide`, "Correct: six outer electrons give +6, like SO₃, and non-metal oxides are acidic."],
      [t`$\ce{SeO3}$, a basic oxide`, "The formula fits, but non-metal oxides such as SO₃ are acidic."],
      [t`$\ce{Se2O3}$, an amphoteric oxide`, "This would be +3, not the highest state for a Group 16 element."],
      [t`$\ce{SeO}$, a basic oxide`, "This is +2, and selenium is a non-metal."],
    ],
    answer: "A",
    hints: ["Use the number of outer-shell electrons of a Group 16 element."],
    explanation: "Group 16 elements have six outer electrons; the highest oxide is XO₃, and like SO₃ it is acidic.",
  });
  {
    const nAl = 2.7 / AR.Al;
    const m = (nAl / 2) * Mr("Al2O3");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Aluminium powder burns in oxygen: 4Al + 3O₂ → 2Al₂O₃. Calculate the mass, in g, of aluminium oxide formed from 2.70 g of aluminium, to three significant figures. (Ar: Al 27.0, O 16.0)",
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(nAl * Mr("Al2O3"), 3)],
      hints: ["Two moles of Al make one mole of Al₂O₃."],
      explanation: `1. n(Al) = 2.70 ÷ 27.0 = ${sfStr(nAl, 3)} mol.\n2. n(Al₂O₃) = ${sfStr(nAl, 3)} ÷ 2 = ${sfStr(nAl / 2, 3)} mol.\n3. Mr(Al₂O₃) = ${Mr("Al2O3")}; mass = ${sfStr(nAl / 2, 3)} × ${Mr("Al2O3")} = ${sfStr(m, 3)} g. Ignoring the 2 : 1 ratio gives ${sfStr(nAl * Mr("Al2O3"), 3)} g.`,
    });
  }
  {
    const nSi = 0.562 / AR.Si;
    const v = nSi * 2 * VM_RTP;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the volume of chlorine, in dm³ at room conditions, needed to convert 0.562 g of silicon completely into silicon tetrachloride, to three significant figures. (Ar Si 28.1; molar gas volume 24.0 dm³ mol⁻¹)",
      value: v, sf: 3, unit: "dm³",
      wrong: [sfStr(v / 2, 3), sfStr(v * 2, 3)],
      hints: ["Write the balanced equation first."],
      explanation: `1. Si + 2Cl₂ → SiCl₄.\n2. n(Si) = 0.562 ÷ 28.1 = ${sfStr(nSi, 3)} mol, so n(Cl₂) = ${sfStr(nSi * 2, 3)} mol.\n3. V = ${sfStr(nSi * 2, 3)} × 24.0 = ${sfStr(v, 3)} dm³. Using a 1 : 1 ratio gives ${sfStr(v / 2, 3)} dm³; counting Cl atoms instead of Cl₂ molecules gives ${sfStr(v * 2, 3)} dm³.`,
    });
  }
  {
    const nMg = 0.486 / AR.Mg;
    const v = nMg * VM_RTP * 1000;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "0.486 g of magnesium reacts completely with steam. Calculate the volume of hydrogen formed, in cm³ at room conditions, to three significant figures. (Ar Mg 24.3; molar gas volume 24.0 dm³ mol⁻¹)",
      value: v, sf: 3, unit: "cm³",
      wrong: [sfStr(v / 2, 3)],
      explanation: `Mg + H₂O → MgO + H₂ (1 : 1). n = 0.486 ÷ 24.3 = ${sfStr(nMg, 3)} mol; V = ${sfStr(nMg, 3)} × 24 000 = ${sfStr(v, 3)} cm³.`,
    });
  }
  {
    const nP4 = 1.24 / Mr("P4");
    const m = nP4 * 4 * Mr("PCl5");
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "White phosphorus, P₄, reacts with excess chlorine to form phosphorus pentachloride. Calculate the maximum mass, in g, of PCl₅ that can be made from 1.24 g of P₄, to three significant figures. (Ar: P 31.0, Cl 35.5)",
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(nP4 * Mr("PCl5"), 3)],
      hints: ["Balance P₄ + Cl₂ → PCl₅ first."],
      explanation: `1. P₄ + 10Cl₂ → 4PCl₅.\n2. n(P₄) = 1.24 ÷ ${Mr("P4")} = ${sfStr(nP4, 3)} mol; n(PCl₅) = 4 × ${sfStr(nP4, 3)} = ${sfStr(nP4 * 4, 3)} mol.\n3. Mr(PCl₅) = ${Mr("PCl5")}; mass = ${sfStr(nP4 * 4, 3)} × ${Mr("PCl5")} = ${sfStr(m, 3)} g. Forgetting that each P₄ gives four PCl₅ gives ${sfStr(nP4 * Mr("PCl5"), 3)} g.`,
    });
  }
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "What is the oxidation number of sulfur in sulfur trioxide, SO₃? (Give the number with its sign, e.g. +2.)",
    value: 6,
    wrong: [4, -6],
    explanation: "3 × (−2) = −6 for oxygen, so sulfur is +6, using all six of its outer-shell electrons. (In SO₂ it is +4.)",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An aluminium saucepan does not burn when heated on a stove because aluminium is less reactive than magnesium.",
    answer: false,
    explanation: "False. Aluminium is quite reactive, but a thin, unreactive layer of aluminium oxide protects the surface. Fine powder burns readily.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each element with the product of heating it in chlorine (excess chlorine).",
    pairs: [
      ["sodium", t`$\ce{NaCl}$, white solid`],
      ["aluminium", t`$\ce{AlCl3}$, solid that sublimes`],
      ["silicon", t`$\ce{SiCl4}$, colourless liquid`],
      ["phosphorus", t`$\ce{PCl5}$, pale yellow solid`],
    ],
    extraRight: [t`$\ce{SCl6}$, colourless gas`],
    explanation: "SCl₆ does not exist: six chlorine atoms will not fit around sulfur.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the description of sodium reacting with cold water.",
    template: "Sodium {{blank:a}} on the water, melts into a ball because the reaction is {{blank:b}}, and gives off {{blank:c}} gas. The solution formed has a pH of about {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["floats"], choices: ["floats", "sinks"] },
      { id: "b", accepted: ["exothermic"], choices: ["exothermic", "endothermic"] },
      { id: "c", accepted: ["hydrogen"], choices: ["hydrogen", "oxygen", "steam"] },
      { id: "d", accepted: ["13"], choices: ["7", "9", "13", "3"] },
    ],
    hints: ["Sodium hydroxide is a strong alkali."],
    explanation: "2Na + 2H₂O → 2NaOH + H₂; the NaOH solution is strongly alkaline (pH about 13-14).",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Write the balanced equation for sodium burning in oxygen to form sodium oxide (type, e.g., 2A + B -> 2C).",
    accepted: ["4Na + O2 -> 2Na2O", "4Na + O2 → 2Na2O", "4Na(s) + O2(g) -> 2Na2O(s)", "4Na(s) + O2(g) → 2Na2O(s)", "2Na + 1/2O2 -> Na2O", "2Na + ½O2 -> Na2O"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["2Na + O2 -> Na2O"],
    explanation: "4Na + O₂ → 2Na₂O.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Magnesium reacts much more slowly with cold water than sodium does. Give three reasons.",
    points: [
      "Magnesium must lose two electrons per atom (total of first and second ionisation energies is large), sodium only one",
      "Magnesium is coated with a protective layer of magnesium oxide",
      "The magnesium hydroxide formed is only slightly soluble and can coat the metal (or: sodium melts and its fresh surface keeps reacting)",
    ],
    modelAnswer: "Sodium needs to lose only one electron per atom, whereas magnesium must lose two, which needs much more energy. Magnesium is also covered by a thin oxide layer that protects it. Finally, the magnesium hydroxide formed is only slightly soluble and coats the surface, while sodium melts and keeps exposing a fresh surface.",
    hints: ["Think about ionisation energies and the surface of the metal."],
    explanation: "Energetic and surface reasons both slow magnesium down.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why sulfur shows an oxidation number of +6 in SO₃ but does not form a chloride in which it is +6.",
    points: [
      "Sulfur has six outer-shell electrons, all of which are used in bonding to oxygen in SO₃",
      "Chlorine atoms are too large for six to fit around a sulfur atom (SF₆ exists with the smaller fluorine)",
    ],
    modelAnswer: "In SO₃ all six of sulfur's outer-shell electrons are involved in bonding to oxygen, giving +6. Six chlorine atoms are too large to fit around one sulfur atom, so SCl₆ does not form, although SF₆ does with the smaller fluorine atoms.",
    hints: ["Compare the sizes of chlorine and fluorine atoms."],
    explanation: "Oxidation number is limited by outer electrons and by space for the surrounding atoms.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Element **W** is in Period 3. It ignites in air at room temperature, forming dense white smoke of an oxide that dissolves in water to give an acidic solution. With excess chlorine it forms a solid chloride. Identify **W**, write equations for its reactions with oxygen and chlorine, and state its oxidation number in both products.",
    points: [
      "W is phosphorus (white phosphorus, P₄)",
      "P₄ + 5O₂ → P₄O₁₀",
      "P₄ + 10Cl₂ → 4PCl₅",
      "Oxidation number +5 in both products",
    ],
    modelAnswer: "W is phosphorus: white phosphorus ignites spontaneously in air. P₄ + 5O₂ → P₄O₁₀ (white smoke, acidic oxide giving phosphoric acid). With excess chlorine, P₄ + 10Cl₂ → 4PCl₅, a pale yellow solid. Phosphorus is +5 in both.",
    hints: ["Which Period 3 element ignites spontaneously in air?"],
    explanation: "Spontaneous ignition and an acidic oxide identify phosphorus.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Nyasha heated small samples of four Period 3 elements, **A** to **D**, in chlorine and recorded the products.\n\n| Element | Observation | Product at room temperature |\n|---|---|---|\n| **A** | burns with a bright yellow flame | white crystalline solid, melting point 801 °C |\n| **B** | glows; product collects as a solid on the cold parts of the tube | white solid that sublimes at about 180 °C |\n| **C** | reacts only on strong heating | colourless liquid, boiling point 58 °C |\n| **D** | burns with a brilliant white flame | white solid, melting point 714 °C |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Identify element **C**.", accepted: ["silicon", "Si"], wrong: ["phosphorus"], explanation: "SiCl₄ is a colourless volatile liquid." }),
      P.short({ label: "(b)", marks: 1, stem: "Give the formula of the chloride formed by **B**.", accepted: ["AlCl3", "AlCl₃", "Al2Cl6", "Al₂Cl₆"], normalise: ["trim", "collapse_whitespace"], wrong: ["MgCl2"], explanation: "Aluminium chloride sublimes at about 180 °C." }),
      P.mcq({ label: "(c)", stem: "Which pair identifies **A** and **D**?", options: [
        ["**A** sodium, **D** magnesium", "Correct: sodium's yellow flame and magnesium's white flame."],
        ["**A** magnesium, **D** sodium", "The flame colours are reversed."],
        ["**A** sodium, **D** aluminium", "Aluminium chloride sublimes; it is element **B**."],
        ["**A** aluminium, **D** magnesium", "Aluminium does not burn with a yellow flame."],
      ], answer: "A", explanation: "Na: yellow flame, NaCl; Mg: white flame, MgCl₂." }),
      P.short({ label: "(d)", marks: 1, stem: "Write the equation for the reaction of element **D** with chlorine (type, e.g., A + B -> C).", accepted: ["Mg + Cl2 -> MgCl2", "Mg + Cl2 → MgCl2", "Mg(s) + Cl2(g) -> MgCl2(s)", "Mg(s) + Cl2(g) → MgCl2(s)"], normalise: ["trim", "collapse_whitespace"], wrong: ["Mg + Cl -> MgCl"], explanation: "Mg + Cl₂ → MgCl₂." }),
      P.manual({ label: "(e)", marks: 2, stem: "Use the melting and boiling points to suggest the type of bonding in the chlorides of **A** and **C**.", points: ["A's chloride (NaCl): high melting point, so ionic (giant ionic lattice)", "C's chloride (SiCl₄): low boiling point, so simple covalent molecules with weak intermolecular forces"], modelAnswer: "Sodium chloride melts at 801 °C, which suggests a giant ionic lattice. Silicon tetrachloride boils at 58 °C, so it consists of simple covalent molecules with weak forces between them." }),
      P.num({ label: "(f)", marks: 1, stem: "State the oxidation number of element **C** in its chloride.", value: 4, wrong: [-4], explanation: "SiCl₄: Si is +4." }),
      P.tf({ label: "(g)", stem: "The chloride of element **A** conducts electricity when molten.", answer: true, explanation: "True: molten NaCl contains mobile ions." }),
    ],
    hints: ["Flame colours identify the metals.", "A low-boiling chloride is covalent."],
    explanation: "A sodium, B aluminium, C silicon, D magnesium; bonding changes from ionic to covalent across the period.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "Chipo burned 0.360 g of magnesium ribbon in a crucible with a lid, lifting the lid occasionally, and heated to constant mass. (Ar: Mg 24.3, O 16.0)",
    parts: (() => {
      const n = 0.36 / AR.Mg;
      const m = n * Mr("MgO");
      return [
        P.short({ label: "(a)", marks: 1, stem: "Write the equation for the reaction (type, e.g., 2A + B -> 2C).", accepted: ["2Mg + O2 -> 2MgO", "2Mg + O2 → 2MgO", "2Mg(s) + O2(g) -> 2MgO(s)", "2Mg(s) + O2(g) → 2MgO(s)", "Mg + 1/2O2 -> MgO", "Mg + ½O2 -> MgO"], normalise: ["trim", "collapse_whitespace"], wrong: ["Mg + O2 -> MgO2"], explanation: "2Mg + O₂ → 2MgO." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the expected mass, in g, of magnesium oxide, to three significant figures.", value: m, sf: 3, unit: "g", wrong: [sfStr(n * 16, 3)], explanation: `n(Mg) = 0.360 ÷ 24.3 = ${sfStr(n, 3)} mol = n(MgO); mass = ${sfStr(n, 3)} × 40.3 = ${sfStr(m, 3)} g. (${sfStr(n * 16, 3)} g is only the oxygen gained.)` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why the lid is lifted only occasionally and why the crucible is heated to constant mass.", points: ["Lifting the lid lets in air (oxygen) while keeping white MgO smoke from escaping", "Heating to constant mass makes sure all the magnesium has reacted"], modelAnswer: "The lid is lifted briefly to let oxygen in, but kept on most of the time so that magnesium oxide smoke does not escape. Heating until the mass stops changing shows that all the magnesium has been oxidised." }),
        P.manual({ label: "(d)", marks: 2, stem: "Chipo's product weighed less than expected. Suggest two reasons.", points: ["Some magnesium oxide smoke escaped when the lid was lifted", "Not all the magnesium reacted, or some reacted with nitrogen to form magnesium nitride (Mg₃N₂, lighter per Mg)"], modelAnswer: "Some white MgO escaped as smoke when the lid was lifted, and some magnesium may not have reacted (or formed magnesium nitride, which adds less mass per mole of Mg than the oxide)." }),
        P.manual({ label: "(e)", marks: 1, stem: "Give one safety precaution for this experiment.", points: ["Do not look directly at the burning magnesium (bright light) / wear eye protection / use tongs on the hot crucible"], modelAnswer: "Do not look directly at the burning magnesium, and handle the hot crucible with tongs." }),
      ];
    })(),
    hints: ["n(MgO) = n(Mg).", "Think about what can escape or fail to react."],
    explanation: "2Mg + O₂ → 2MgO; expected mass from moles of Mg; low results from escaping smoke or incomplete reaction.",
  });
  b.card("FACT", "Na, Mg, Al, P, S with oxygen", "Na₂O, MgO, Al₂O₃ (white solids); P₄O₁₀ (white smoke); SO₂ (gas, blue flame).");
  b.card("FACT", "Na, Mg, Al, Si, P with chlorine", "NaCl, MgCl₂ (white solids); AlCl₃ (sublimes, Al₂Cl₆ vapour); SiCl₄ (liquid); PCl₅ (solid, excess Cl₂).");
  b.card("FORMULA", "Sodium and cold water", "2Na + 2H₂O → 2NaOH + H₂: floats, melts, fizzes; pH about 13-14.");
  b.card("FORMULA", "Magnesium with cold water and with steam", "Cold: Mg + 2H₂O → Mg(OH)₂ + H₂ (very slow). Steam: Mg + H₂O → MgO + H₂ (bright glow).");
  b.card("CONCEPT", "Highest oxidation numbers in Period 3", "+1 (Na) to +6 (S in SO₃): equal to the number of outer-shell electrons, all used in bonding to O or Cl.");
  b.card("FACT", "Burning sulfur", "Blue flame, SO₂. SO₃ needs a V₂O₅ catalyst (Contact process).");
  b.card("FACT", "Why aluminium objects do not burn", "A thin, tough Al₂O₃ layer protects the metal; powder burns readily.");
  b.card("CONCEPT", "Predicting from periodicity", "Same group: same formula type (Se like S: SeO₂, SeO₃). Down a group metals react more vigorously.");
  b.card("FACT", "Phosphorus with chlorine", "Excess Cl₂: P₄ + 10Cl₂ → 4PCl₅ (solid). Limited Cl₂: PCl₃ (liquid).");
});
