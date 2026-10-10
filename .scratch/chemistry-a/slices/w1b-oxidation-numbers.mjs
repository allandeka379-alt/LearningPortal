// W1b: achem.electrochem.oxidation-numbers
import { concept, P, t, ce } from "../lib.mjs";

concept("achem.electrochem.oxidation-numbers", { file: "electrochem/oxidation-numbers", keyPrefix: "electrochem.oxidation-numbers" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: t`What is the oxidation number of chlorine in the chlorate(V) ion, $\ce{ClO3-}$?`,
    options: [
      ["+5", "Correct: x + 3(−2) = −1, so x = +5, matching the (V) in the name."],
      ["−1", "Chlorine is −1 only in chlorides; here it is bonded to the more electronegative oxygen."],
      ["+6", "This ignores the 1− charge of the ion: the sum must be −1, not 0."],
      ["+7", "+7 is chlorine in the chlorate(VII) (perchlorate) ion, ClO₄⁻."],
    ],
    answer: "A",
    explanation: "Sum of oxidation numbers = charge of the ion: x + 3(−2) = −1, x = +5.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`What is the oxidation number of sulfur in the tetrathionate ion, $\ce{S4O6^2-}$?`,
    options: [
      ["+2.5", "Correct: 4x + 6(−2) = −2 gives x = +2.5, an average over the four sulfur atoms."],
      ["+2", "+2 is sulfur in thiosulfate, S₂O₃²⁻."],
      ["+3", "This uses an ion charge of 0 instead of 2−: 4x = 12 gives +3."],
      ["+10", "This is the total for four sulfur atoms, not the value per atom."],
    ],
    answer: "A",
    explanation: "4x − 12 = −2, so x = +2.5. A fractional value is an average: the sulfur atoms in tetrathionate are not all in the same environment. It is formed when thiosulfate reduces iodine.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: t`In the reaction $\ce{Cl2(aq) + 2Br-(aq) -> 2Cl-(aq) + Br2(aq)}$, which species is the oxidising agent?`,
    options: [
      [t`$\ce{Cl2}$`, "Correct: chlorine accepts electrons (0 → −1), so it is reduced and acts as the oxidising agent."],
      [t`$\ce{Br-}$`, "Bromide ions lose electrons: they are the reducing agent."],
      [t`$\ce{Cl-}$`, "Chloride is a product: the reduced form of the oxidising agent."],
      [t`$\ce{Br2}$`, "Bromine is a product: the oxidised form of the reducing agent."],
    ],
    answer: "A",
    explanation: "The oxidising agent is the reactant that is reduced. Chlorine's oxidation number falls from 0 to −1, while bromine's rises from −1 to 0.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`Which is the correctly balanced half-equation for the reduction of dichromate(VI) ions in acid solution?`,
    options: [
      [t`$\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}$`, "Correct: Cr, O, H and charge (+6 on each side) all balance."],
      [t`$\ce{Cr2O7^2- + 14H+ + 3e- -> 2Cr^3+ + 7H2O}$`, "Each Cr gains three electrons (+6 → +3), so two Cr need six electrons."],
      [t`$\ce{Cr2O7^2- + 7H+ + 6e- -> 2Cr^3+ + 7H2O}$`, "Seven water molecules contain 14 hydrogen atoms, so 14 H⁺ are needed."],
      [t`$\ce{Cr2O7^2- + 14H+ -> 2Cr^3+ + 7H2O + 6e-}$`, "Reduction is electron gain: the electrons belong on the left."],
    ],
    answer: "A",
    hints: ["Each chromium goes from +6 to +3.", "Check the charge on each side."],
    explanation: "Balance Cr (2), then O with 7H₂O, then H with 14H⁺, then charge: left −2 + 14 = +12, right +6, so 6e⁻ on the left.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: t`Which reactions are disproportionation reactions?

1. $\ce{3Cl2 + 6OH- -> 5Cl- + ClO3- + 3H2O}$
2. $\ce{2H2O2 -> 2H2O + O2}$
3. $\ce{Cu + 2Ag+ -> Cu^2+ + 2Ag}$`,
    options: [
      ["1 and 2 only", "Correct: in 1 chlorine goes 0 → −1 and +5; in 2 oxygen goes −1 → −2 and 0."],
      ["1, 2 and 3", "Reaction 3 is redox, but two different elements change oxidation number."],
      ["2 and 3 only", "Reaction 1 is disproportionation and reaction 3 is not."],
      ["1 only", "Reaction 2 is also disproportionation: oxygen in the peroxide is both oxidised and reduced."],
    ],
    answer: "A",
    hints: ["Find an element that both increases and decreases in oxidation number."],
    explanation: "Disproportionation needs one element in one species to be oxidised and reduced at once. Reaction 3 is an ordinary displacement: copper is oxidised and silver ions are reduced.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: t`Which statements about hydrogen peroxide, $\ce{H2O2}$, are correct?

1. The oxidation number of oxygen in it is −1.
2. It can act as an oxidising agent, forming water.
3. It can act as a reducing agent, forming oxygen.`,
    options: [
      ["1, 2 and 3", "Correct: oxygen at −1 can go down to −2 (in H₂O) or up to 0 (in O₂)."],
      ["1 and 2 only", "Statement 3 is also true: strong oxidising agents such as manganate(VII) oxidise H₂O₂ to O₂."],
      ["2 and 3 only", "Statement 1 is also true: in a peroxide oxygen is −1."],
      ["1 only", "Statements 2 and 3 are true as well."],
    ],
    answer: "A",
    hints: ["Oxygen in a peroxide has an intermediate oxidation number."],
    explanation: "Because O is −1 in H₂O₂, it can be reduced to −2 (H₂O₂ + 2H⁺ + 2e⁻ → 2H₂O) or oxidised to 0 (H₂O₂ → O₂ + 2H⁺ + 2e⁻).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`Iodate(V) ions react with iodide ions in acid: $\ce{IO3- + aI- + bH+ -> cI2 + dH2O}$. What are the values of a and c?`,
    options: [
      ["a = 5, c = 3", "Correct: iodine falls by 5 in IO₃⁻ (+5 → 0) and rises by 1 in each I⁻, so 5 I⁻ react; 6 I atoms give 3 I₂."],
      ["a = 1, c = 1", "This ignores the electron balance: one IO₃⁻ gains five electrons."],
      ["a = 5, c = 6", "Six iodine atoms make three I₂ molecules, not six."],
      ["a = 6, c = 3", "Six I⁻ would give seven iodine atoms in total; only five I⁻ are needed."],
    ],
    answer: "A",
    hints: ["Find the change in oxidation number of iodine in IO₃⁻ and in I⁻.", "Make the total increase equal the total decrease."],
    explanation: "IO₃⁻: I +5 → 0 (gains 5e⁻). I⁻: −1 → 0 (loses 1e⁻ each). So 5I⁻ per IO₃⁻: IO₃⁻ + 5I⁻ + 6H⁺ → 3I₂ + 3H₂O. (Iodine from two oxidation numbers ending at one is the reverse of disproportionation.)",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: t`State the oxidation number of vanadium in the $\ce{VO2+}$ ion (dioxovanadium(V)). Include the sign if it is negative.`,
    value: 5,
    wrong: ["4", "3"],
    explanation: "x + 2(−2) = +1, so x = +5. (The VO²⁺ ion contains vanadium(IV): x − 2 = +2.)",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: t`Nitrate ions are reduced to ammonium ions in acid solution. How many electrons appear in the balanced half-equation $\ce{NO3- + 10H+ + ne- -> NH4+ + 3H2O}$?`,
    value: 8,
    wrong: ["5", "10"],
    hints: ["Nitrogen goes from +5 to −3.", "Or balance the charge: left −1 + 10 − n = right +1."],
    explanation: "Nitrogen changes from +5 to −3, a gain of 8 electrons. Charge check: −1 + 10 − 8 = +1 on the left, +1 on the right.",
  });
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Acidified manganate(VII) ions oxidise ethanedioate ions: $\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$ and $\ce{C2O4^2- -> 2CO2 + 2e-}$. How many moles of $\ce{MnO4-}$ react with exactly 1.00 mol of $\ce{C2O4^2-}$?`,
    value: 0.4, dp: 2, unit: "mol",
    wrong: ["2.5", "0.2"],
    hints: ["1.00 mol of ethanedioate releases 2.00 mol of electrons.", "Each MnO₄⁻ accepts 5 electrons."],
    explanation: "Electrons from 1.00 mol C₂O₄²⁻ = 2.00 mol. MnO₄⁻ needed = 2.00 ÷ 5 = 0.40 mol (the ratio is 2 MnO₄⁻ : 5 C₂O₄²⁻). The answer 2.5 is the reciprocal.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: t`In $\ce{2Na + Cl2 -> 2NaCl}$, sodium is the reducing agent.`,
    answer: true,
    explanation: "True. Sodium loses electrons (0 → +1), so it is oxidised and reduces the chlorine.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: t`The oxidation number of hydrogen in calcium hydride, $\ce{CaH2}$, is +1.`,
    answer: false,
    explanation: "False. In metal hydrides hydrogen is −1: Ca is +2, so 2x = −2 and x = −1.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each named atom with its oxidation number in the species given.",
    pairs: [
      [t`Mn in $\ce{K2MnO4}$`, "+6"],
      [t`Fe in $\ce{[Fe(CN)6]^3-}$`, "+3"],
      [t`N in $\ce{N2H4}$`, "−2"],
      [t`P in $\ce{H3PO4}$`, "+5"],
    ],
    extraRight: ["+7"],
    hints: ["Cyanide ions are CN⁻ (−1 each)."],
    explanation: "K₂MnO₄: 2 + x − 8 = 0, x = +6 (manganate(VI)). [Fe(CN)₆]³⁻: x − 6 = −3, x = +3. N₂H₄: 2x + 4 = 0, x = −2. H₃PO₄: 3 + x − 8 = 0, x = +5.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Complete the half-equation for the oxidation of hydrogen peroxide.",
    template: "H₂O₂ → O₂ + {{blank:a}} H⁺ + {{blank:b}} e⁻",
    blanks: [
      { id: "a", accepted: ["2"], input: "number", wrong: "1" },
      { id: "b", accepted: ["2"], input: "number", wrong: "4" },
    ],
    explanation: "Two hydrogen atoms leave as 2H⁺; the charge on the right must be zero, so 2e⁻. Each oxygen goes from −1 to 0.",
  });
  b.short({
    d: 2, skill: "UNDERSTANDING",
    stem: t`Give the systematic name of $\ce{NaClO3}$, including the oxidation number of chlorine.`,
    accepted: ["sodium chlorate(V)", "sodium chlorate (V)", "sodium chlorate 5", "sodium chlorate(5)"],
    normalise: ["trim", "lowercase", "remove_whitespace"],
    wrong: ["sodium chlorate(I)", "sodium chloride"],
    explanation: "Chlorine is +5 (1 + x − 6 = 0), so the name is sodium chlorate(V). NaClO is sodium chlorate(I).",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: t`State the oxidation number of chromium in the chromate(VI) ion, $\ce{CrO4^2-}$, with its sign.`,
    accepted: ["+6", "6", "+VI", "VI"],
    normalise: ["trim", "lowercase", "remove_whitespace"],
    wrong: ["+8", "-2"],
    explanation: "x + 4(−2) = −2, so x = +6, as the name chromate(VI) says.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Use oxidation numbers to explain why $\ce{2Fe^3+ + 2I- -> 2Fe^2+ + I2}$ is a redox reaction, and identify the oxidising agent.`,
    points: ["Iron changes from +3 to +2: reduced.", "Iodine changes from −1 to 0: oxidised.", "Fe³⁺ is the oxidising agent (it is reduced, accepting electrons from I⁻)."],
    modelAnswer: "The oxidation number of iron falls from +3 to +2, so Fe³⁺ is reduced; that of iodine rises from −1 to 0, so I⁻ is oxidised. Since both happen, it is redox; Fe³⁺ accepts the electrons, so it is the oxidising agent.",
    hints: ["Assign oxidation numbers on both sides."],
    explanation: "Show both changes, then name the oxidising agent as the species that is reduced.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3,
    stem: t`Acidified potassium dichromate(VI) oxidises iodide ions to iodine. Construct the two half-equations and the overall ionic equation. (Write them as text, e.g. "Cr2O7^2- + ... -> ...".)`,
    points: ["Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O", "2I⁻ → I₂ + 2e⁻", "Cr₂O₇²⁻ + 14H⁺ + 6I⁻ → 2Cr³⁺ + 3I₂ + 7H₂O"],
    modelAnswer: "Reduction: Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O. Oxidation: 2I⁻ → I₂ + 2e⁻ (multiply by 3). Overall: Cr₂O₇²⁻ + 14H⁺ + 6I⁻ → 2Cr³⁺ + 3I₂ + 7H₂O.",
    hints: ["Multiply the iodide half-equation by 3 so that six electrons cancel."],
    explanation: "Each half-equation must balance atoms and charge; then scale them so the electrons cancel.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 2,
    stem: t`When chlorine dissolves in water, $\ce{Cl2 + H2O -> HCl + HClO}$. Explain why this is described as disproportionation.`,
    points: ["Chlorine starts at 0 and ends at −1 in HCl (reduced).", "and at +1 in HClO (oxidised): the same element is oxidised and reduced at the same time."],
    modelAnswer: "Chlorine (0) becomes −1 in HCl and +1 in HClO, so one element is both reduced and oxidised in the same reaction.",
    hints: ["Work out the oxidation number of chlorine in each product."],
    explanation: "Give both oxidation numbers of chlorine in the products and the starting value.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: t`Sulfur dioxide decolourises acidified potassium manganate(VII). The half-equations are:

$\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$
$\ce{SO2 + 2H2O -> SO4^2- + 4H+ + 2e-}$`,
    parts: [
      P.fib({ label: "(a)", stem: "Give the oxidation number of sulfur before and after the reaction.", template: "Sulfur in SO₂: {{blank:a}}; sulfur in SO₄²⁻: {{blank:b}}", blanks: [{ id: "a", accepted: ["+4", "4"], wrong: "+2" }, { id: "b", accepted: ["+6", "6"], wrong: "+8" }], explanation: "SO₂: x − 4 = 0, x = +4. SO₄²⁻: x − 8 = −2, x = +6." }),
      P.mcq({ label: "(b)", stem: "Which overall equation is correct?", options: [[t`$\ce{2MnO4- + 5SO2 + 2H2O -> 2Mn^2+ + 5SO4^2- + 4H+}$`, "Correct: 10 electrons cancel, and the H⁺ and H₂O have been cancelled down."], [t`$\ce{MnO4- + SO2 + 2H2O -> Mn^2+ + SO4^2- + 4H+}$`, "The electrons do not balance: 5 gained but only 2 lost."], [t`$\ce{2MnO4- + 5SO2 + 16H+ -> 2Mn^2+ + 5SO4^2- + 8H2O}$`, "This forgets to cancel: oxygen and charge do not balance."], [t`$\ce{5MnO4- + 2SO2 + 2H2O -> 5Mn^2+ + 2SO4^2- + 4H+}$`, "The multipliers are the wrong way round."]], answer: "A", explanation: "×2 for manganate and ×5 for SO₂ gives 10e⁻; then 16H⁺ on the left cancels with 20H⁺ on the right (4H⁺ left on the right) and 10H₂O cancels with 8H₂O (2H₂O left on the left)." }),
      P.fib({ label: "(c)", stem: "State the colour change.", template: "The solution changes from {{blank:a}} to {{blank:b}}.", blanks: [{ id: "a", accepted: ["purple"], choices: ["purple", "orange", "green", "colourless"] }, { id: "b", accepted: ["colourless"], choices: ["colourless", "purple", "green", "brown"] }], explanation: "MnO₄⁻ is purple; Mn²⁺ is very pale pink, essentially colourless in dilute solution." }),
      P.manual({ label: "(d)", marks: 3, stem: "Identify the reducing agent and the oxidising agent, and explain your answer in terms of electrons.", points: ["SO₂ is the reducing agent.", "It donates (loses) electrons to MnO₄⁻, and is itself oxidised (S from +4 to +6).", "MnO₄⁻ is the oxidising agent: it accepts electrons and is reduced (Mn from +7 to +2)."], modelAnswer: "Sulfur dioxide is the reducing agent: it loses two electrons per molecule to the manganate(VII) ions, being oxidised from +4 to +6. Manganate(VII) is the oxidising agent: it gains five electrons per ion and is reduced from +7 to +2." }),
    ],
    hints: ["Make the electrons in the two half-equations equal.", "The reducing agent is oxidised."],
    explanation: "S: +4 → +6 (oxidised, SO₂ is the reducing agent); Mn: +7 → +2 (reduced). Overall: 2MnO₄⁻ + 5SO₂ + 2H₂O → 2Mn²⁺ + 5SO₄²⁻ + 4H⁺.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: t`Chlorine reacts with sodium hydroxide solution in two ways:

- cold dilute NaOH: $\ce{Cl2 + 2NaOH -> NaCl + NaClO + H2O}$
- hot concentrated NaOH: $\ce{3Cl2 + 6NaOH -> 5NaCl + NaClO3 + 3H2O}$`,
    parts: [
      P.fib({ label: "(a)", stem: "Give the oxidation number of chlorine in each product.", template: "In NaClO: {{blank:a}}; in NaClO₃: {{blank:b}}", blanks: [{ id: "a", accepted: ["+1", "1"], wrong: "-1" }, { id: "b", accepted: ["+5", "5"], wrong: "+3" }], explanation: "NaClO: 1 + x − 2 = 0, x = +1. NaClO₃: 1 + x − 6 = 0, x = +5." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why both reactions are disproportionation.", points: ["In each, chlorine (0) is reduced to −1 in NaCl.", "and oxidised to a positive oxidation number (+1 or +5) in the other product: the same element is both oxidised and reduced."], modelAnswer: "Chlorine starts at 0. Some is reduced to −1 (NaCl) and some oxidised to +1 (NaClO, cold) or +5 (NaClO₃, hot), so one element is simultaneously oxidised and reduced." }),
      P.manual({ label: "(c)", marks: 2, stem: "In the hot reaction, use oxidation-number changes to show why five chloride ions form for every chlorate(V) ion.", points: ["Each Cl going to ClO₃⁻ increases by 5 (0 → +5); each Cl going to Cl⁻ decreases by 1 (0 → −1).", "Total increase must equal total decrease, so 5 Cl⁻ form for each ClO₃⁻."], modelAnswer: "Forming one ClO₃⁻ raises one chlorine atom by 5; each Cl⁻ lowers one chlorine atom by 1. To balance, five chlorine atoms must become Cl⁻ for every one that becomes ClO₃⁻." }),
    ],
    hints: ["Total increase in oxidation number = total decrease."],
    explanation: "Both are disproportionation of chlorine: 0 → −1 and 0 → +1 (cold) or +5 (hot). The 5 : 1 ratio comes from balancing the oxidation-number changes.",
  });
  b.card("DEFINITION", "Oxidation (two ways)", "Loss of electrons; increase in oxidation number.");
  b.card("DEFINITION", "Reduction (two ways)", "Gain of electrons; decrease in oxidation number.");
  b.card("DEFINITION", "Oxidising agent", "Accepts electrons from another species; it is itself reduced.");
  b.card("DEFINITION", "Disproportionation", "One element in one species is simultaneously oxidised and reduced, e.g. Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O.");
  b.card("FACT", "Oxygen exceptions", "O is −2 except in peroxides (−1, e.g. H₂O₂) and OF₂ (+2).");
  b.card("FACT", "Hydrogen exception", "H is +1 except in metal hydrides such as NaH and CaH₂ (−1).");
  b.card("FORMULA", "Manganate(VII) half-equation", "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O");
  b.card("FORMULA", "Dichromate(VI) half-equation", "Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O");
  b.card("CONCEPT", "Balancing a half-equation in acid", "Balance the element, then O with H₂O, H with H⁺, charge with electrons; check atoms and charge.");
});
