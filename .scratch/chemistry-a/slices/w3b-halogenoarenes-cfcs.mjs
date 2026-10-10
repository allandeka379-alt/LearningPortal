// W3b: achem.halogen.halogenoarenes-cfcs (both boards; ZIMSEC Form 6, Cambridge A Level only)
import { concept, P, t, Mr, AR, L, sfStr, dpStr, sciStr } from "../lib.mjs";

concept("achem.halogen.halogenoarenes-cfcs", { file: "halogen/halogenoarenes-cfcs", keyPrefix: "halogen.halogenoarenes-cfcs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which reagents convert benzene into chlorobenzene?",
    options: [
      ["chlorine with an aluminium chloride catalyst", "Correct: electrophilic substitution with a halogen carrier."],
      ["chlorine in ultraviolet light", "UV light gives free-radical reactions, mainly addition to benzene, not chlorobenzene."],
      ["hydrogen chloride gas at room temperature", "HCl does not substitute into the benzene ring."],
      ["aqueous sodium chloride with heating", "Chloride ions are nucleophiles and do not attack the ring."],
    ],
    answer: "A",
    explanation: "C₆H₆ + Cl₂ → C₆H₅Cl + HCl (AlCl₃ catalyst).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is chlorobenzene much less easily hydrolysed than chloroethane?",
    options: [
      ["A chlorine lone pair overlaps with the ring's π system, strengthening the C–Cl bond.", "Correct: partial double-bond character."],
      ["The C–Cl bond in chlorobenzene is more polar than in chloroethane.", "Greater polarity would make attack easier, not harder."],
      ["Chlorobenzene does not dissolve in water at all, so no reaction is possible.", "Insolubility alone is not the reason; it does not react even in ethanol solution."],
      ["Chlorine in chlorobenzene is present as a chloride ion, not covalently bonded.", "Chlorine is covalently bonded to the ring."],
    ],
    answer: "A",
    explanation: "Delocalisation of a Cl lone pair gives the C–Cl bond partial double-bond character.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which bond in dichlorodifluoromethane, CCl₂F₂, is broken by ultraviolet light in the stratosphere?",
    options: [
      ["C–Cl, because it is weaker than C–F", "Correct: the weakest bond breaks, releasing Cl•."],
      ["C–F, because it is the most polar bond", "C–F is stronger than C–Cl and survives."],
      ["Cl–Cl, because chlorine atoms are joined together", "There is no Cl–Cl bond in CCl₂F₂."],
      ["F–F, because fluorine is the most reactive halogen", "There is no F–F bond in CCl₂F₂."],
    ],
    answer: "A",
    explanation: "CCl₂F₂ → CClF₂• + Cl•.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Poly(tetrafluoroethene), PTFE, is used to coat non-stick pans. Which property makes it suitable?",
    options: [
      ["It is very unreactive and heat resistant, with a low-friction surface.", "Correct: strong C–F bonds make it inert."],
      ["It reacts with food fats to form a protective layer.", "PTFE does not react with food."],
      ["It conducts heat better than metals do.", "PTFE is a poor conductor; the metal pan conducts heat."],
      ["It dissolves slowly to release lubricating fluorine gas.", "PTFE is insoluble and releases no fluorine in normal use."],
    ],
    answer: "A",
    explanation: "Inertness and heat resistance from strong C–F bonds.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which equation shows the step in which the chlorine radical is regenerated during ozone depletion?",
    options: [
      [t`$\ce{ClO^. + O -> Cl^. + O2}$`, "Correct: Cl• is reformed, so it acts as a catalyst."],
      [t`$\ce{Cl^. + O3 -> ClO^. + O2}$`, "This step uses up Cl• and destroys ozone."],
      [t`$\ce{CCl2F2 -> CClF2^. + Cl^.}$`, "This is photodissociation, which first forms Cl•."],
      [t`$\ce{Cl^. + Cl^. -> Cl2}$`, "This termination step removes radicals."],
    ],
    answer: "A",
    hints: ["Which step has Cl• as a product?"],
    explanation: "Cl• + O₃ → ClO• + O₂ then ClO• + O → Cl• + O₂.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Chlorobenzene and (chloromethyl)benzene, C₆H₅CH₂Cl, are each warmed with ethanolic silver nitrate. What is observed?",
    options: [
      ["(chloromethyl)benzene gives a white precipitate; chlorobenzene gives none.", "Correct: the side-chain C–Cl is a normal halogenoalkane bond."],
      ["Both give a white precipitate at the same rate.", "The C–Cl bond on the ring is not hydrolysed."],
      ["Chlorobenzene gives a white precipitate; (chloromethyl)benzene gives none.", "This is the reverse of what happens."],
      ["Both give a yellow precipitate of silver chloride.", "Silver chloride is white, and only one compound reacts."],
    ],
    answer: "A",
    hints: ["Is the Cl attached to the ring or to the side chain?"],
    explanation: "C₆H₅CH₂Cl behaves as a halogenoalkane; C₆H₅Cl does not react.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the statements about CFCs are correct?\n\n1. They are non-flammable.\n2. They have low toxicity.\n3. They are rapidly broken down in the lower atmosphere.",
    options: [
      ["1 and 2 only", "Correct: their inertness lets them reach the stratosphere."],
      ["1, 2 and 3", "Statement 3 is false: CFCs persist for many years."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["Why do CFCs reach the stratosphere at all?"],
    explanation: "Inert, non-flammable, non-toxic, long-lived.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which of the statements about CFC replacements are correct?\n\n1. HFCs contain no chlorine, so they do not deplete ozone.\n2. HCFCs are broken down more in the lower atmosphere than CFCs.\n3. Some HFCs are powerful greenhouse gases.",
    options: [
      ["1, 2 and 3", "Correct: all three statements are true."],
      ["1 and 2 only", "Statement 3 is also true."],
      ["2 and 3 only", "Statement 1 is also true."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Think about C–H bonds and infrared absorption."],
    explanation: "No Cl → no ozone depletion; C–H bonds → broken down lower; many HFCs absorb infrared.",
  });
  b.mcq({
    d: 4, skill: "APPLICATION",
    stem: "Methylbenzene reacts with chlorine in the presence of aluminium chloride, in the dark. What are the main organic products?",
    options: [
      ["2-chloromethylbenzene and 4-chloromethylbenzene", "Correct: ring substitution directed by CH₃ to positions 2 and 4."],
      ["(chloromethyl)benzene, C₆H₅CH₂Cl, only", "That forms in UV light without a catalyst."],
      ["3-chloromethylbenzene as the only product", "–CH₃ is 2,4-directing."],
      ["chlorobenzene together with chloromethane", "The methyl group is not removed from the ring."],
    ],
    answer: "A",
    hints: ["Catalyst and dark → ring; which positions?"],
    explanation: "Electrophilic substitution at positions 2 and 4.",
  });
  {
    const p = ((2 * AR.Cl) / Mr("CF2Cl2")) * 100;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the percentage by mass of chlorine in dichlorodifluoromethane, CCl₂F₂, to one decimal place. Ar: C 12.0, F 19.0, Cl 35.5.",
      value: p, dp: 1, unit: "%",
      wrong: [(AR.Cl / Mr("CF2Cl2")) * 100],
      hints: ["There are two chlorine atoms."],
      explanation: `1. Mr = 12.0 + 2(19.0) + 2(35.5) = ${Mr("CF2Cl2").toFixed(1)}.\n2. %Cl = 71.0 ÷ ${Mr("CF2Cl2").toFixed(1)} × 100 = ${dpStr(p, 1)}%.\n3. Counting only one Cl gives ${dpStr((AR.Cl / Mr("CF2Cl2")) * 100, 1)}%.`,
    });
  }
  {
    const n = (5.0 / Mr("CF2Cl2")) * L;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "In the stratosphere each CCl₂F₂ molecule first releases one chlorine radical. Calculate the number of chlorine radicals released by 5.00 g of CCl₂F₂ (Mr = 121.0; L = 6.022 × 10²³ mol⁻¹).",
      value: n, sf: 3,
      wrong: [2 * n],
      hints: ["Moles of CCl₂F₂ first, then multiply by L."],
      explanation: `1. n(CCl₂F₂) = 5.00 ÷ ${Mr("CF2Cl2").toFixed(1)} = ${sfStr(5 / Mr("CF2Cl2"), 3)} mol.\n2. Number of molecules = ${sfStr(5 / Mr("CF2Cl2"), 3)} × 6.022 × 10²³ = ${sciStr(n, 3)}; one Cl• each, so ${sciStr(n, 3)} radicals.\n3. Doubling (two Cl per molecule) ignores the statement that one radical is released at first.`,
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "The overall equation for the catalysed destruction of ozone by chlorine radicals is O₃ + O → n O₂. What is n?",
    value: 2,
    wrong: [3],
    explanation: "O₃ + O → 2O₂ (three + one O atoms = four, two O₂).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The C–Cl bond in chlorobenzene is stronger than the C–Cl bond in chloroethane.",
    answer: true,
    explanation: "True: partial double-bond character from delocalisation of a chlorine lone pair.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Each chlorine radical can destroy only one ozone molecule.",
    answer: false,
    explanation: "False: Cl• is regenerated and acts as a catalyst, destroying many thousands.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each compound or material with a use based on its inertness.",
    pairs: [
      ["PTFE", "non-stick coating for pans"],
      [t`$\ce{CF3CHBrCl}$ (halothane)`, "general anaesthetic"],
      [t`$\ce{CH2FCF3}$ (an HFC)`, "refrigerant in fridges and air conditioners"],
      [t`$\ce{CBrF3}$ (a halon)`, "fire extinguisher (formerly)"],
    ],
    explanation: "Each use depends on low reactivity, low toxicity or non-flammability.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the equations for ozone depletion.",
    template: "When Cl• reacts with O₃ the products are O₂ and {{blank:a}}. This radical then reacts with {{blank:b}} to form O₂ and regenerate Cl•, so the chlorine radical acts as a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["ClO•"], choices: ["ClO•", "Cl₂O", "ClO₂"] },
      { id: "b", accepted: ["O"], choices: ["O", "O₂", "Cl•"] },
      { id: "c", accepted: ["catalyst"], choices: ["catalyst", "reactant", "product"] },
    ],
    hints: ["Balance the atoms in each step."],
    explanation: "ClO• forms then reacts with an O atom to regenerate Cl•.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "Give the formula of the radical formed when a chlorine radical reacts with an ozone molecule.",
    accepted: ["ClO", "ClO•", "ClO.", "OCl", "ClO radical"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["Cl2O"],
    hints: ["Cl• takes one oxygen atom from O₃."],
    explanation: "Cl• + O₃ → ClO• + O₂.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why chlorobenzene does not react with warm aqueous sodium hydroxide, although chloroethane does.",
    points: ["A lone pair on chlorine (in a p orbital) overlaps with / is delocalised into the ring's π system", "This gives the C–Cl bond partial double-bond character, so it is stronger (and shorter) than in chloroethane and harder to break", "The electron-rich π cloud also repels the OH⁻ nucleophile (and the carbon is less δ+)"],
    modelAnswer: "One of the chlorine's lone pairs overlaps with the delocalised π electrons of the ring, so the C–Cl bond has some double-bond character and is stronger than the C–Cl bond in chloroethane. The hydroxide ion is also repelled by the π electron cloud of the ring and cannot attack the carbon from behind, so no substitution occurs under these conditions.",
    hints: ["Lone pair, delocalisation, bond strength, repulsion."],
    explanation: "Stronger bond and repulsion of nucleophiles.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe, with equations, how CFCl₃ released at ground level leads to the destruction of ozone in the stratosphere.",
    points: ["CFCl₃ is inert, so it persists and diffuses up into the stratosphere", "UV light breaks the weakest bond, C–Cl, homolytically: CFCl₃ → CFCl₂• + Cl•", "Cl• + O₃ → ClO• + O₂", "ClO• + O → Cl• + O₂: Cl• regenerated, acting as a catalyst"],
    modelAnswer: "CFCl₃ is so unreactive that it is not destroyed in the lower atmosphere and slowly rises into the stratosphere. There, ultraviolet radiation breaks a C–Cl bond: CFCl₃ → CFCl₂• + Cl•. The chlorine radical reacts with ozone, Cl• + O₃ → ClO• + O₂, and the ClO• reacts with an oxygen atom, ClO• + O → Cl• + O₂. Cl• is regenerated, so it catalyses the destruction of many ozone molecules.",
    hints: ["Persistence, photodissociation, two propagation steps."],
    explanation: "One mark per stage.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 2,
    stem: "Suggest why hydrofluorocarbons (HFCs) are not a perfect replacement for CFCs.",
    points: ["Many HFCs are powerful greenhouse gases, contributing to global warming", "They are more expensive or less efficient in some uses, or some alternatives (hydrocarbons) are flammable"],
    modelAnswer: "Although HFCs contain no chlorine and do not damage ozone, many absorb infrared radiation strongly and are potent greenhouse gases. Some alternatives such as hydrocarbons are flammable, and replacements can be more costly.",
    hints: ["Ozone is not the only environmental issue."],
    explanation: "Any two valid points.",
  });
  {
    const m = Mr("C2F3Cl3");
    const p = ((3 * AR.Cl) / m) * 100;
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "1,1,2-trichloro-1,2,2-trifluoroethane, CCl₂FCClF₂, was once widely used as a cleaning solvent for electronic circuit boards.",
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate its relative molecular mass. Ar: C 12.0, F 19.0, Cl 35.5.", value: m, dp: 1, wrong: [Mr("CFCl3")], explanation: `2(12.0) + 3(19.0) + 3(35.5) = ${m.toFixed(1)}.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the percentage by mass of chlorine, to one decimal place.", value: p, dp: 1, unit: "%", wrong: [(AR.Cl / m) * 100], explanation: `106.5 ÷ ${m.toFixed(1)} × 100 = ${dpStr(p, 1)}%.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Suggest two properties that made it suitable as a cleaning solvent.", points: ["Unreactive (does not attack the components) and non-flammable", "Volatile (evaporates quickly, leaving no residue) or low toxicity or dissolves grease"], modelAnswer: "It is chemically inert and non-flammable, so it is safe on electrical parts, and it is volatile, so it evaporates without leaving a residue." }),
        P.manual({ label: "(d)", marks: 1, stem: "Write an equation for its photodissociation in the stratosphere.", points: ["CCl₂FCClF₂ → •CClFCClF₂ + Cl• (or loss of Cl• from either carbon)"], modelAnswer: "CCl₂FCClF₂ → CClFCClF₂• + Cl•" }),
        P.manual({ label: "(e)", marks: 2, stem: "Write two equations showing how the chlorine radical destroys ozone and is regenerated.", points: ["Cl• + O₃ → ClO• + O₂", "ClO• + O → Cl• + O₂"], modelAnswer: "Cl• + O₃ → ClO• + O₂; ClO• + O → Cl• + O₂" }),
        P.tf({ label: "(f)", marks: 1, stem: "The C–F bonds are broken in preference to the C–Cl bonds.", answer: false, explanation: "C–Cl is weaker and breaks first." }),
      ],
      hints: ["Which bond is weakest?"],
      explanation: `Mr ${m.toFixed(1)}; %Cl ${dpStr(p, 1)}; inert, volatile; C–Cl photodissociation; Cl• catalytic.`,
    });
  }
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true,
    stem: "A student warms three compounds separately with ethanolic silver nitrate in a water bath at 60 °C and records the time for a precipitate to appear.\n\n| Compound | Time for precipitate / s |\n|---|---|\n| 1-chlorobutane | 410 |\n| (chloromethyl)benzene, C₆H₅CH₂Cl | 95 |\n| chlorobenzene | no precipitate after 1800 |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the colour of the precipitate.", accepted: ["white"], wrong: ["cream"], explanation: "AgCl is white." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why chlorobenzene gives no precipitate.", points: ["The C–Cl bond has partial double-bond character (Cl lone pair delocalised into the ring), so it is stronger", "So it is not hydrolysed and no Cl⁻ is released to form AgCl"], modelAnswer: "A chlorine lone pair is delocalised into the ring, strengthening the C–Cl bond, so the bond does not break and no chloride ions form." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which statement best classifies (chloromethyl)benzene?", options: [
        ["It is a halogenoalkane, because Cl is on a side-chain carbon.", "Correct: the C–Cl carbon is sp³, not part of the ring."],
        ["It is a halogenoarene, because it contains a benzene ring.", "The Cl is not bonded directly to the ring."],
        ["It is an acyl chloride, because it contains C–Cl.", "Acyl chlorides contain –COCl."],
        ["It is an aryl ether, because it contains a phenyl group.", "There is no oxygen."],
      ], answer: "A", explanation: "Halogen on the side chain → halogenoalkane." }),
      P.manual({ label: "(d)", marks: 1, stem: "State one variable the student must control to make the comparison fair.", points: ["Temperature (same water bath), or volume/concentration of AgNO₃, or amount of each compound, or volume of ethanol"], modelAnswer: "The temperature, by using the same water bath for all three tubes." }),
      P.tf({ label: "(e)", marks: 1, stem: "These results show that the C–Cl bond in chlorobenzene is the strongest of the three.", answer: true, explanation: "It does not break at all under these conditions." }),
    ],
    hints: ["Where is the chlorine attached in each compound?"],
    explanation: "White AgCl; chlorobenzene unreactive (partial double bond); (chloromethyl)benzene is a halogenoalkane.",
  });

  b.card("FACT", "Making chlorobenzene", "Benzene + Cl₂ with AlCl₃ (or Fe), room temperature, dry: electrophilic substitution.");
  b.card("FACT", "Chlorination of methylbenzene in the ring", "Cl₂ + AlCl₃, dark → 2-chloromethylbenzene and 4-chloromethylbenzene.");
  b.card("CONCEPT", "Why chlorobenzene resists hydrolysis", "Cl lone pair delocalised into the ring: partial double-bond C–Cl (stronger); π cloud repels nucleophiles.");
  b.card("CONCEPT", "Why fluoroalkanes are useful", "Strong C–F bonds: inert, non-flammable, low toxicity (refrigerants, propellants, anaesthetics, PTFE).");
  b.card("FORMULA", "Photodissociation of a CFC", "CCl₂F₂ → CClF₂• + Cl• (UV breaks the weaker C–Cl bond).");
  b.card("FORMULA", "Ozone destruction by Cl•", "Cl• + O₃ → ClO• + O₂; ClO• + O → Cl• + O₂ (overall O₃ + O → 2O₂).");
  b.card("CONCEPT", "Why a little CFC does great damage", "Cl• is regenerated (a catalyst), so one radical destroys many thousands of O₃ molecules.");
  b.card("FACT", "CFC replacements", "HCFCs (broken down lower, still some harm) and HFCs (no Cl, no ozone depletion, but often greenhouse gases).");
  b.card("FACT", "Montreal Protocol", "International agreement (1987) to phase out CFCs and other ozone-depleting substances.");
});
