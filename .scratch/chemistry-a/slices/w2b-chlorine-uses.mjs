// W2b: achem.group17.chlorine-uses (both boards; ZIMSEC Form 5, Cambridge AS Level). Industrial importance and
// environmental significance of halogen compounds: ZIMSEC detail.
import { concept, P, t, Mr, VM_RTP, molesFromSolution, sfStr, chk, ZIM } from "../lib.mjs";

concept("achem.group17.chlorine-uses", { file: "group17/chlorine-uses", keyPrefix: "group17.chlorine-uses" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which products form when chlorine reacts with cold, dilute aqueous sodium hydroxide?",
    options: [
      ["sodium chloride, sodium chlorate(I) and water", "Correct: Cl₂ + 2NaOH → NaCl + NaClO + H₂O."],
      ["sodium chloride, sodium chlorate(V) and water", "Chlorate(V) forms with hot, concentrated NaOH."],
      ["sodium chlorate(I) and hydrogen", "No hydrogen is formed; water is."],
      ["sodium chloride and oxygen", "Oxygen is not a product."],
    ],
    answer: "A",
    explanation: "Cold, dilute alkali gives chloride and chlorate(I): household bleach.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is the reaction Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O described as disproportionation?",
    options: [
      ["Chlorine is both oxidised (to +1) and reduced (to −1).", "Correct: one element changes in both directions."],
      ["Chlorine is reduced and hydroxide ions are oxidised.", "Oxygen and hydrogen keep their oxidation numbers."],
      ["Chlorine reacts with an alkali to form a salt and water.", "That describes neutralisation, not disproportionation."],
      ["Two different products contain chlorine.", "Having two products is not enough; the oxidation numbers must go up and down."],
    ],
    answer: "A",
    explanation: "Cl₂ (0) → Cl⁻ (−1) and ClO⁻ (+1).",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which species formed when chlorine dissolves in water are responsible for killing bacteria?",
    options: [
      [t`$\ce{HOCl}$ and $\ce{ClO-}$`, "Correct: chloric(I) acid and the chlorate(I) ion are the active oxidising agents."],
      [t`$\ce{HCl}$ and $\ce{Cl-}$`, "Hydrochloric acid and chloride ions do not disinfect water."],
      [t`$\ce{Cl2}$ and $\ce{Cl-}$`, "Chloride ions are not oxidising agents."],
      [t`$\ce{H+}$ and $\ce{OH-}$`, "These are not the disinfecting species."],
    ],
    answer: "A",
    explanation: "Cl₂ + H₂O ⇌ HCl + HOCl; HOCl ⇌ H⁺ + ClO⁻.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the reaction of chlorine with hot, concentrated sodium hydroxide are correct?\n\n1. The products include sodium chlorate(V).\n2. Chloride ions and chlorate(V) ions form in the ratio 5 : 1.\n3. Chlorine is only reduced in this reaction.",
    options: [
      ["1 and 2 only", "Correct: chlorine is both reduced (to −1) and oxidised (to +5)."],
      ["1, 2 and 3", "Statement 3 is false: this is disproportionation."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true: 3Cl₂ + 6OH⁻ → 5Cl⁻ + ClO₃⁻ + 3H₂O."],
    ],
    answer: "A",
    hints: ["Balance the electrons: one Cl goes up by 5."],
    explanation: "Five Cl atoms each gain one electron; one Cl atom loses five electrons.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which equation shows the reaction of chlorine with water?",
    options: [
      [t`$\ce{Cl2 + H2O <=> HCl + HOCl}$`, "Correct: a reversible disproportionation."],
      [t`$\ce{Cl2 + H2O -> 2HCl + O}$`, "Free oxygen atoms are not formed."],
      [t`$\ce{Cl2 + 2H2O -> 2HCl + H2O2}$`, "Hydrogen peroxide is not a product."],
      [t`$\ce{Cl2 + H2O <=> 2HOCl}$`, "This does not balance: count hydrogen and chlorine."],
    ],
    answer: "A",
    hints: ["Chlorine ends up in two different oxidation states."],
    explanation: "Cl₂ + H₂O ⇌ HCl + HOCl: Cl goes to −1 in HCl and +1 in HOCl.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "Why is it dangerous to mix bleach (containing ClO⁻ and Cl⁻ ions) with an acidic toilet cleaner?",
    options: [
      ["Toxic chlorine gas is released: ClO⁻ + Cl⁻ + 2H⁺ → Cl₂ + H₂O.", "Correct: the reverse of the disproportionation happens in acid."],
      ["The mixture becomes strongly alkaline and corrosive.", "Adding acid makes it less alkaline."],
      ["Hydrogen gas is released, which may explode.", "No hydrogen forms."],
      ["The bleach is neutralised and becomes poisonous sodium chloride.", "Sodium chloride is not poisonous at these amounts; chlorine is."],
    ],
    answer: "A",
    hints: ["What do chlorate(I) and chloride form together in acid?"],
    explanation: "In acid, ClO⁻ (+1) and Cl⁻ (−1) recombine to Cl₂ (0): toxic gas.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Bromine reacts with cold aqueous sodium hydroxide in the same way as chlorine. What is the oxidation number of bromine in the bromine-containing anion other than bromide that forms?",
    options: [
      ["+1", "Correct: BrO⁻, bromate(I), like ClO⁻."],
      ["+5", "+5 (BrO₃⁻) is the product with hot alkali."],
      ["−1", "−1 is bromide, the other product."],
      ["+7", "+7 is not formed in this reaction."],
    ],
    answer: "A",
    hints: ["Br₂ + 2OH⁻ → Br⁻ + BrO⁻ + H₂O."],
    explanation: "Same disproportionation as chlorine: Br 0 → −1 and +1.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Why is a small amount of fluoride added to toothpaste?",
    options: [
      ["It helps make tooth enamel harder and more resistant to acid.", "Correct: fluoride reduces tooth decay."],
      ["It bleaches the teeth white by oxidation.", "Fluoride is not a bleach."],
      ["It kills all bacteria in the mouth as chlorine does in water.", "That is not the main role of fluoride."],
      ["It neutralises stomach acid.", "That is the job of an antacid."],
    ],
    answer: "A",
    explanation: "Fluoride ions are incorporated into enamel, making it more acid-resistant.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "What is the oxidation number of chlorine in sodium chlorate(V), NaClO₃? (Give the sign, e.g. +3.)",
    value: chk(1 * -1 + 3 * 2, 5),
    wrong: [-1, 3],
    explanation: "Na +1, O −2 × 3 = −6, so Cl = +5. The (V) in the name shows this.",
  });
  {
    const n = 0.96 / VM_RTP;
    const m = n * Mr("NaClO");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "0.960 dm³ of chlorine (room conditions) is passed into excess cold, dilute sodium hydroxide. Calculate the mass of sodium chlorate(I), NaClO, formed, in g, to three significant figures. (Mr NaClO 74.5; molar gas volume 24.0 dm³ mol⁻¹)",
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(m * 2, 3)],
      hints: ["Cl₂ + 2NaOH → NaCl + NaClO + H₂O."],
      explanation: `1. n(Cl₂) = 0.960 ÷ 24.0 = ${sfStr(n, 3)} mol.\n2. n(NaClO) = n(Cl₂) = ${sfStr(n, 3)} mol.\n3. Mass = ${sfStr(n, 3)} × 74.5 = ${sfStr(m, 3)} g. Assuming both chlorine atoms become ClO⁻ gives ${sfStr(m * 2, 3)} g.`,
    });
  }
  {
    const n = 14.2 / Mr("Cl2");
    const m = (n / 3) * Mr("NaClO3");
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "14.2 g of chlorine reacts completely with hot, concentrated sodium hydroxide. Calculate the mass of sodium chlorate(V) formed, in g, to three significant figures. (Mr: Cl₂ 71.0, NaClO₃ 106.5)",
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(n * Mr("NaClO3"), 3)],
      hints: ["3Cl₂ + 6NaOH → 5NaCl + NaClO₃ + 3H₂O."],
      explanation: `1. n(Cl₂) = 14.2 ÷ 71.0 = ${sfStr(n, 3)} mol.\n2. n(NaClO₃) = ${sfStr(n, 3)} ÷ 3 = ${sfStr(n / 3, 3)} mol.\n3. Mass = ${sfStr(n / 3, 3)} × 106.5 = ${sfStr(m, 3)} g. Using a 1 : 1 ratio gives ${sfStr(n * Mr("NaClO3"), 3)} g.`,
    });
  }
  {
    const mg = 800 * 1.5;
    const n = mg / 1000 / Mr("Cl2");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A school's 800 dm³ water tank in Masvingo is treated with chlorine at 1.5 mg per dm³. Calculate the amount of chlorine needed, in mol, to three significant figures. (Mr Cl₂ 71.0)",
      value: n, sf: 3, unit: "mol",
      wrong: [sfStr(mg / Mr("Cl2"), 3)],
      hints: ["Convert mg to g before dividing by Mr."],
      explanation: `1. Mass = 800 × 1.5 = ${mg} mg = ${mg / 1000} g.\n2. n = ${mg / 1000} ÷ 71.0 = ${sfStr(n, 3)} mol. Leaving the mass in mg gives ${sfStr(mg / Mr("Cl2"), 3)}, a thousand times too large.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Household bleach should be stored in a cool place because warming converts chlorate(I) ions into chloride and chlorate(V) ions.",
    answer: true,
    explanation: "True. 3ClO⁻ → 2Cl⁻ + ClO₃⁻ on warming; chlorate(V) is not an effective bleach, so the bleach loses strength.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each chlorine species with the oxidation number of chlorine.",
    pairs: [
      [t`$\ce{Cl2}$`, "0"],
      [t`$\ce{Cl-}$`, "−1"],
      [t`$\ce{ClO-}$`, "+1"],
      [t`$\ce{ClO3-}$`, "+5"],
    ],
    extraRight: ["+3"],
    explanation: "+3 would be chlorate(III), ClO₂⁻, which does not form in these reactions.",
  });
  b.match({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "Match each halogen compound with its use or former use.",
    pairs: [
      ["sodium chlorate(I)", "household bleach"],
      ["poly(chloroethene)", "water pipes and cable insulation"],
      ["chlorofluorocarbons", "former refrigerants and aerosol propellants"],
      ["sodium fluoride", "toothpaste"],
    ],
    extraRight: ["fuel for vehicles"],
    hints: ["PVC is poly(chloroethene)."],
    explanation: "Bleach, PVC, CFCs and fluoride; halogen compounds are not used as vehicle fuels.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the description of chlorine in water treatment.",
    template: "Chlorine reacts with water to form hydrochloric acid and {{blank:a}} acid, HOCl. This acid partly ionises to give H⁺ and {{blank:b}} ions. In this reaction chlorine is both {{blank:c}} and reduced, so it is a {{blank:d}} reaction.",
    blanks: [
      { id: "a", accepted: ["chloric(I)"], choices: ["chloric(I)", "chloric(V)", "hydrochloric"] },
      { id: "b", accepted: ["ClO⁻"], choices: ["ClO⁻", "Cl⁻", "ClO₃⁻"] },
      { id: "c", accepted: ["oxidised"], choices: ["oxidised", "neutralised", "hydrolysed"] },
      { id: "d", accepted: ["disproportionation"], choices: ["disproportionation", "displacement", "neutralisation"] },
    ],
    hints: ["Find the oxidation numbers of Cl in HCl and HOCl."],
    explanation: "Cl₂ + H₂O ⇌ HCl + HOCl; HOCl ⇌ H⁺ + ClO⁻.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Write the ionic equation for the reaction of chlorine with hot, concentrated aqueous hydroxide ions (type, e.g., 3A + 6B -> 5C + D + 3E).",
    accepted: ["3Cl2 + 6OH- -> 5Cl- + ClO3- + 3H2O", "3Cl2 + 6OH- → 5Cl- + ClO3- + 3H2O", "3Cl₂ + 6OH⁻ → 5Cl⁻ + ClO₃⁻ + 3H₂O"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["Cl2 + 2OH- -> Cl- + ClO- + H2O"],
    hints: ["The chlorine-containing anion has Cl in the +5 state."],
    explanation: "3Cl₂ + 6OH⁻ → 5Cl⁻ + ClO₃⁻ + 3H₂O.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain, with equations, how chlorine makes drinking water safe.",
    points: [
      "Cl₂ + H₂O ⇌ HCl + HOCl",
      "HOCl ⇌ H⁺ + ClO⁻",
      "HOCl and ClO⁻ are oxidising agents that kill bacteria (micro-organisms); a small residual amount keeps water safe in the pipes",
    ],
    modelAnswer: "Chlorine reacts reversibly with water: Cl₂ + H₂O ⇌ HCl + HOCl. Chloric(I) acid partly ionises: HOCl ⇌ H⁺ + ClO⁻. HOCl and ClO⁻ are oxidising agents that kill bacteria; a small residual concentration stays in the water so it remains safe on the way to the tap.",
    hints: ["Two equations and the name of the killing species."],
    explanation: "HOCl and ClO⁻ disinfect.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Use oxidation numbers to show that the reaction of chlorine with cold aqueous sodium hydroxide is a disproportionation, and explain why Cl⁻ and ClO⁻ form in equal amounts.",
    points: [
      "Cl₂ (0) → Cl⁻ (−1): reduction",
      "Cl₂ (0) → ClO⁻ (+1): oxidation; the same element is oxidised and reduced, so disproportionation",
      "Each Cl reduced gains one electron and each Cl oxidised loses one, so they must be formed 1 : 1 to balance electrons",
    ],
    modelAnswer: "In Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O, chlorine goes from 0 to −1 in Cl⁻ (reduction) and from 0 to +1 in ClO⁻ (oxidation), so chlorine is both oxidised and reduced: disproportionation. Each reduction gains one electron and each oxidation loses one, so equal numbers of Cl⁻ and ClO⁻ form.",
    hints: ["Electrons lost must equal electrons gained."],
    explanation: "Electron balance fixes the product ratio.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4, applies: ZIM,
    stem: "Discuss the benefits and environmental problems of using halogenated hydrocarbons as solvents, refrigerants and aerosol propellants.",
    points: [
      "Benefits: unreactive / stable, non-flammable, good solvents for grease, suitable boiling points for refrigeration",
      "Problems: some are toxic (e.g. liver damage from CCl₄) and persistent in the environment",
      "CFCs rise to the stratosphere and release chlorine atoms that destroy ozone, increasing harmful UV reaching the ground",
      "So their use is restricted (Montreal Protocol) and they are replaced by less harmful alternatives (e.g. HFCs or hydrocarbons), handled and disposed of carefully",
    ],
    modelAnswer: "Halogenated hydrocarbons are useful because they are stable, non-flammable, good at dissolving grease, and have suitable boiling points for refrigerators and aerosols. But the same stability lets them persist. Some are toxic, and CFCs reach the stratosphere, where ultraviolet light releases chlorine atoms that break down ozone, letting more harmful UV reach the Earth's surface. Their use is therefore controlled internationally, and safer alternatives such as hydrofluorocarbons or hydrocarbons are used, with careful disposal of old equipment.",
    hints: ["Balance useful properties against persistence and toxicity."],
    explanation: "Stability is both the benefit and the problem.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, applies: ZIM,
    stem: "Tendai analysed a bottle of household bleach. 10.0 cm³ of bleach was diluted to 250 cm³ with distilled water. 25.0 cm³ of the diluted solution was added to excess potassium iodide and dilute sulfuric acid, and the iodine released was titrated with 0.100 mol dm⁻³ sodium thiosulfate; the mean titre was 18.20 cm³.\n\nClO⁻ + 2I⁻ + 2H⁺ → Cl⁻ + I₂ + H₂O; I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻",
    parts: (() => {
      const nS = molesFromSolution(18.2, 0.1);
      const nI2 = nS / 2;
      const nClO250 = nI2 * 10;
      const c = nClO250 / 0.01;
      const gdm3 = c * Mr("NaClO");
      return [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the amount, in mol, of thiosulfate used, to three significant figures.", value: nS, sf: 3, unit: "mol", explanation: `18.20 ÷ 1000 × 0.100 = ${sfStr(nS, 3)} mol.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the amount, in mol, of ClO⁻ in 25.0 cm³ of diluted solution, to three significant figures.", value: nI2, sf: 3, unit: "mol", wrong: [sfStr(nS, 3)], explanation: `n(I₂) = ${sfStr(nS, 3)} ÷ 2 = ${sfStr(nI2, 3)} mol = n(ClO⁻).` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the concentration of NaClO in the original bleach, in mol dm⁻³, to three significant figures.", value: c, sf: 3, unit: "mol/dm³", wrong: [sfStr(nI2 / 0.025, 3)], explanation: `In 250 cm³: ${sfStr(nI2, 3)} × 10 = ${sfStr(nClO250, 3)} mol, all from 10.0 cm³ of bleach; c = ${sfStr(nClO250, 3)} ÷ 0.0100 = ${sfStr(c, 3)} mol dm⁻³. Forgetting the dilution gives ${sfStr(nI2 / 0.025, 3)}.` }),
        P.num({ label: "(d)", marks: 1, stem: "Convert this to g dm⁻³ of NaClO, to three significant figures. (Mr NaClO 74.5)", value: gdm3, sf: 3, unit: "g/dm³", explanation: `${sfStr(c, 3)} × 74.5 = ${sfStr(gdm3, 3)} g dm⁻³.` }),
        P.mcq({ label: "(e)", stem: "Which indicator is added near the end point, and what is the colour change at the end point?", options: [
          ["starch; blue-black to colourless", "Correct: starch gives a blue-black colour with iodine, which disappears at the end point."],
          ["starch; colourless to blue-black", "The blue-black colour disappears as the last iodine reacts."],
          ["methyl orange; red to yellow", "This is an acid-base indicator."],
          ["phenolphthalein; colourless to pink", "This is an acid-base indicator."],
        ], answer: "A", explanation: "Starch is added when the iodine colour is pale straw, then the blue-black colour disappears at the end point." }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why the bleach must be stored cool and why it should not be mixed with acidic cleaners.", points: ["Warming makes ClO⁻ disproportionate to Cl⁻ and ClO₃⁻, so the bleach loses strength", "In acid, ClO⁻ and Cl⁻ react to release toxic chlorine gas"], modelAnswer: "Warm bleach slowly disproportionates (3ClO⁻ → 2Cl⁻ + ClO₃⁻), losing its bleaching power. With acid, ClO⁻ + Cl⁻ + 2H⁺ → Cl₂ + H₂O releases poisonous chlorine." }),
      ];
    })(),
    hints: ["Moles of ClO⁻ = moles of I₂ = half the moles of thiosulfate.", "Scale up for the dilution."],
    explanation: "Iodine-thiosulfate titration gives the chlorate(I) content of bleach.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Chlorine is bubbled through aqueous sodium hydroxide in two experiments: experiment 1 with cold, dilute NaOH; experiment 2 with hot, concentrated NaOH.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Give the formula of the chlorine-containing anion, other than Cl⁻, formed in experiment 1.", accepted: ["ClO-", "ClO⁻", "OCl-", "OCl⁻"], normalise: ["trim", "collapse_whitespace"], wrong: ["ClO3-"], explanation: "Chlorate(I), ClO⁻." }),
      P.short({ label: "(b)", marks: 1, stem: "Give the formula of the chlorine-containing anion, other than Cl⁻, formed in experiment 2.", accepted: ["ClO3-", "ClO₃⁻", "ClO3⁻"], normalise: ["trim", "collapse_whitespace"], wrong: ["ClO-"], explanation: "Chlorate(V), ClO₃⁻." }),
      P.manual({ label: "(c)", marks: 2, stem: "Write the full (molecular) equation for experiment 2.", points: ["3Cl₂ + 6NaOH → 5NaCl + NaClO₃ + 3H₂O", "correct balancing (5 : 1 ratio of NaCl to NaClO₃)"], modelAnswer: "3Cl₂ + 6NaOH → 5NaCl + NaClO₃ + 3H₂O." }),
      P.num({ label: "(d)", marks: 1, stem: "By how much does the oxidation number of chlorine change when ClO₃⁻ forms from Cl₂?", value: 5, wrong: [1], explanation: "0 → +5: a change of 5." }),
      P.tf({ label: "(e)", stem: "Experiment 1 is used to make household bleach.", answer: true, explanation: "True: the NaClO solution is bleach." }),
      P.manual({ label: "(f)", marks: 2, stem: "State the type of reaction in both experiments and explain the term.", points: ["Disproportionation", "The same element (chlorine) is simultaneously oxidised and reduced (0 → −1 and 0 → +1 or +5)"], modelAnswer: "Both are disproportionation reactions: chlorine, oxidation number 0, is reduced to Cl⁻ (−1) and at the same time oxidised to ClO⁻ (+1) or ClO₃⁻ (+5)." }),
    ],
    hints: ["Temperature decides whether chlorate(I) or chlorate(V) forms."],
    explanation: "Cold: Cl⁻ + ClO⁻; hot: 5Cl⁻ + ClO₃⁻. Both are disproportionation.",
  });
  b.card("FORMULA", "Chlorine with cold dilute NaOH", "Cl₂ + 2NaOH → NaCl + NaClO + H₂O (Cl 0 → −1 and +1): bleach.");
  b.card("FORMULA", "Chlorine with hot concentrated NaOH", "3Cl₂ + 6NaOH → 5NaCl + NaClO₃ + 3H₂O (Cl 0 → −1 and +5).");
  b.card("DEFINITION", "Disproportionation", "Redox reaction in which the same element is simultaneously oxidised and reduced.");
  b.card("FORMULA", "Chlorine in water", "Cl₂ + H₂O ⇌ HCl + HOCl; HOCl ⇌ H⁺ + ClO⁻. HOCl and ClO⁻ kill bacteria.");
  b.card("FACT", "Bleach safety", "Mixing bleach with acid releases toxic Cl₂: ClO⁻ + Cl⁻ + 2H⁺ → Cl₂ + H₂O. Store bleach cool.");
  b.card("FACT", "Uses of halogen compounds (ZIMSEC)", "NaClO bleach; PVC pipes; halogenated solvents; CFCs (former refrigerants, propellants); fluoride toothpaste.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Environmental issues of halogen compounds (ZIMSEC)", "Toxicity, persistence (PVC, solvents), ozone depletion by CFCs; use controlled and alternatives found.", undefined, { applies: ZIM });
  b.card("FACT", "Names and oxidation numbers", "Cl⁻ chloride (−1); ClO⁻ chlorate(I) (+1); ClO₃⁻ chlorate(V) (+5).");
});
