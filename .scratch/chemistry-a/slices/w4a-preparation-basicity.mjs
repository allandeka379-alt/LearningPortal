// W4a: achem.amines.preparation-basicity (both boards; ZIMSEC Form 6, Cambridge A Level only)
import { concept, P, t, ZIM, Mr, moles, kaFromPKa, pOH, sfStr, dpStr, sciStr } from "../lib.mjs";

concept("achem.amines.preparation-basicity", { file: "amines/preparation-basicity", keyPrefix: "amines.preparation-basicity" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which compound is a secondary amine?",
    options: [
      [t`$\ce{(CH3)2NH}$`, "Correct: the nitrogen is bonded to two carbon groups."],
      [t`$\ce{CH3CH(NH2)CH3}$`, "Nitrogen carries only one carbon group: a primary amine."],
      [t`$\ce{(CH3)3N}$`, "Three carbon groups on N: a tertiary amine."],
      [t`$\ce{CH3CONH2}$`, "This is an amide, not an amine."],
    ],
    answer: "A",
    explanation: "Count carbon groups on nitrogen: (CH₃)₂NH has two.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which reagent and conditions convert bromoethane mainly into ethylamine?",
    options: [
      ["excess ammonia in ethanol, heated in a sealed tube", "Correct: excess NH₃ limits further substitution; the sealed tube keeps NH₃ in."],
      ["aqueous sodium hydroxide, heated under reflux", "This gives ethanol by substitution."],
      ["KCN in ethanol, heated under reflux", "This gives propanenitrile."],
      ["a little ammonia gas at room temperature", "Too little ammonia gives a mixture of amines, and the reaction needs heat."],
    ],
    answer: "A",
    explanation: "CH₃CH₂Br + 2NH₃ → CH₃CH₂NH₂ + NH₄Br.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which list shows the bases in order of increasing strength?",
    options: [
      ["phenylamine < ammonia < ethylamine", "Correct: lone pair least available in phenylamine, most in ethylamine."],
      ["ammonia < phenylamine < ethylamine", "Phenylamine is weaker than ammonia: its lone pair is delocalised."],
      ["ethylamine < ammonia < phenylamine", "This is the reverse order."],
      ["phenylamine < ethylamine < ammonia", "The ethyl group makes ethylamine stronger than ammonia."],
    ],
    answer: "A",
    explanation: "pKb (data): phenylamine 9.38, ammonia 4.75, ethylamine 3.27.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is ethylamine a stronger base than ammonia?",
    options: [
      ["The ethyl group donates electron density to N, making its lone pair more available.", "Correct: positive inductive effect."],
      ["Ethylamine has two lone pairs on nitrogen, ammonia only one.", "Both have one lone pair on N."],
      ["The ethyl group withdraws electrons from N, making the N–H bonds much more polar.", "Alkyl groups donate electron density; they do not withdraw it."],
      ["Ethylamine is more soluble in water, so it releases more OH⁻.", "Base strength depends on the lone pair, not on solubility."],
    ],
    answer: "A",
    hints: ["Do alkyl groups push or pull electron density?"],
    explanation: "Higher electron density on N and a stabilised cation make ethylamine the stronger base.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the reactions can produce ethylamine?\n\n1. reduction of ethanenitrile with LiAlH₄\n2. reduction of ethanamide with LiAlH₄\n3. bromoethane with excess ammonia in ethanol, heated under pressure",
    options: [
      ["1, 2 and 3", "Correct: all three give CH₃CH₂NH₂."],
      ["1 and 2 only", "The halogenoalkane route also gives ethylamine."],
      ["2 and 3 only", "CH₃CN + 4[H] → CH₃CH₂NH₂ also works."],
      ["1 only", "Statements 2 and 3 also describe routes to ethylamine."],
    ],
    answer: "A",
    hints: ["Count the carbons in each product."],
    explanation: "Nitrile and amide reductions keep two carbons; the halogenoalkane route also does.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the statements about the reaction of 1-bromopropane with ammonia are correct?\n\n1. Ammonia acts as a nucleophile.\n2. The amine formed can react with more 1-bromopropane.\n3. Using excess ammonia increases the proportion of the primary amine.",
    options: [
      ["1, 2 and 3", "Correct: the primary amine is also a nucleophile, so excess NH₃ is used."],
      ["1 and 2 only", "Statement 3 is also true."],
      ["2 and 3 only", "Statement 1 is also true: NH₃ attacks using its lone pair."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Does propylamine still have a lone pair?"],
    explanation: "Further substitution gives secondary and tertiary amines unless ammonia is in excess.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which reagents convert chloroethane into propylamine, CH₃CH₂CH₂NH₂?",
    options: [
      ["KCN in ethanol, heat; then LiAlH₄ in dry ether", "Correct: chloroethane → propanenitrile → propylamine."],
      ["excess NH₃ in ethanol, heat in a sealed tube", "This gives ethylamine: no carbon is added."],
      ["KCN in ethanol, heat; then dilute HCl, reflux", "Hydrolysis gives propanoic acid, not the amine."],
      ["NaOH(aq), heat; then NH₃", "This makes ethanol, which does not react with NH₃ to give an amine."],
    ],
    answer: "A",
    hints: ["The product has one more carbon than the starting material."],
    explanation: "CH₃CH₂Cl + CN⁻ → CH₃CH₂CN; CH₃CH₂CN + 4[H] → CH₃CH₂CH₂NH₂.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "What is formed when ethylamine is mixed with hydrochloric acid?",
    options: [
      ["ethylammonium chloride, CH₃CH₂NH₃⁺Cl⁻", "Correct: the amine accepts a proton, forming a salt."],
      ["chloroethane and ammonia", "The C–N bond does not break."],
      ["ethanamide and hydrogen", "No amide forms from HCl."],
      ["ethanol and ammonium chloride", "Hydrolysis of the amine does not occur."],
    ],
    answer: "A",
    hints: ["The lone pair on N accepts H⁺."],
    explanation: "CH₃CH₂NH₂ + HCl → CH₃CH₂NH₃⁺Cl⁻.",
  });
  {
    const n = moles(3.27, Mr("C2H5Br"));
    const mAm = n * Mr("C2H5NH2");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "3.27 g of bromoethane is heated with excess ethanolic ammonia in a sealed tube. Assuming that only ethylamine forms, calculate its maximum mass, in g, to three significant figures. Ar: H 1, C 12, N 14, Br 79.9.",
      value: mAm, sf: 3, unit: "g",
      wrong: [n * Mr("NH3")],
      hints: ["The ratio bromoethane : ethylamine is 1 : 1."],
      explanation: `1. Mr(C₂H₅Br) = ${Mr("C2H5Br").toFixed(1)}; n = 3.27 ÷ ${Mr("C2H5Br").toFixed(1)} = ${sfStr(n, 3)} mol.\n2. n(ethylamine) = ${sfStr(n, 3)} mol; Mr = 45.\n3. Mass = ${sfStr(n, 3)} × 45 = ${sfStr(mAm, 3)} g.`,
    });
  }
  {
    const n = moles(2.76, Mr("C2H5CN"));
    const mAm = n * Mr("C3H7NH2");
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "2.76 g of propanenitrile, CH₃CH₂CN (Mr 55), is completely reduced with hydrogen and a nickel catalyst. What mass of propylamine, CH₃CH₂CH₂NH₂ (Mr 59), forms? Give your answer in g to three significant figures.",
      value: mAm, sf: 3, unit: "g",
      wrong: [2.76],
      explanation: `n = 2.76 ÷ 55 = ${sfStr(n, 3)} mol; CH₃CH₂CN + 2H₂ → CH₃CH₂CH₂NH₂ (1 : 1); mass = ${sfStr(n, 3)} × 59 = ${sfStr(mAm, 3)} g.`,
    });
  }
  {
    const pKb = 3.36, c = 0.08;
    const Kb = kaFromPKa(pKb);
    const oh = Math.sqrt(Kb * c);
    const pHv = 14 - pOH(oh);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true, applies: ZIM,
      stem: "Calculate the pH of 0.0800 mol dm⁻³ aqueous methylamine, to two decimal places. Data: pKb(methylamine) = 3.36; pKw = 14.00. Assume [OH⁻] = √(Kb c).",
      value: pHv, dp: 2,
      wrong: [dpStr(pOH(oh), 2)],
      hints: ["Find [OH⁻], then pOH, then pH = 14.00 − pOH."],
      explanation: `1. Kb = 10⁻³·³⁶ = ${sciStr(Kb, 3)} mol dm⁻³.\n2. [OH⁻] = √(${sciStr(Kb, 3)} × 0.0800) = ${sciStr(oh, 3)} mol dm⁻³.\n3. pOH = ${dpStr(pOH(oh), 2)}; pH = 14.00 − ${dpStr(pOH(oh), 2)} = ${dpStr(pHv, 2)}.\n4. Stopping at pOH (${dpStr(pOH(oh), 2)}) gives an acidic value for an alkaline solution.`,
    });
  }
  {
    const Kb = kaFromPKa(9.38);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, applies: ZIM,
      stem: "pKb of phenylamine is 9.38 (data). Calculate Kb, in mol dm⁻³, to three significant figures.",
      value: Kb, sf: 3, unit: "mol/dm³",
      wrong: [Kb * 10],
      hints: ["Kb = 10⁻ᵖᴷᵇ."],
      explanation: `Kb = 10⁻⁹·³⁸ = ${sciStr(Kb, 3)} mol dm⁻³, about 10⁵ times smaller than Kb for ammonia.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Propan-2-amine, CH₃CH(NH₂)CH₃, is a secondary amine.",
    answer: false,
    explanation: "False: the nitrogen is bonded to only one carbon group, so it is a primary amine.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Adding sodium hydroxide solution to ethylammonium chloride releases ethylamine.",
    answer: true,
    explanation: "True: CH₃CH₂NH₃⁺ + OH⁻ → CH₃CH₂NH₂ + H₂O; the stronger base displaces the weaker one.",
  });
  b.match({
    d: 3, skill: "RECALL",
    stem: "Match each starting compound with the reagent that converts it into an amine.",
    pairs: [
      ["bromoethane", "excess NH₃ in ethanol, heat in a sealed tube"],
      ["ethanenitrile", "H₂ with a nickel catalyst"],
      ["ethanamide", "LiAlH₄ in dry ether"],
      ["ethylammonium chloride", "NaOH(aq), warm"],
    ],
    extraRight: ["NaBH₄ in water"],
    hints: ["NaBH₄ is too weak to reduce nitriles or amides."],
    explanation: "Substitution, reduction (two ways) and liberation of the free amine from its salt.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the explanation for phenylamine.",
    template: "In phenylamine the lone pair on nitrogen overlaps with the {{blank:a}} electrons of the benzene ring, so it is {{blank:b}} available to accept a proton. Phenylamine is therefore a {{blank:c}} base than ammonia.",
    blanks: [
      { id: "a", accepted: ["delocalised π"], choices: ["delocalised π", "σ bonding", "inner-shell"] },
      { id: "b", accepted: ["less"], choices: ["less", "more", "equally"] },
      { id: "c", accepted: ["weaker"], choices: ["weaker", "stronger"] },
    ],
    hints: ["Delocalisation spreads the lone pair."],
    explanation: "Delocalisation into the ring lowers the availability of the lone pair.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Give the structural formula of the secondary amine formed when bromoethane is heated with ethylamine in a sealed tube (for example CH3NHCH3).",
    accepted: ["(CH3CH2)2NH", "CH3CH2NHCH2CH3", "(C2H5)2NH", "C2H5NHC2H5", "(CH₃CH₂)₂NH", "CH₃CH₂NHCH₂CH₃"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["CH3CH2NH2"],
    hints: ["The ethylamine nitrogen gains a second ethyl group."],
    explanation: "Diethylamine, (CH₃CH₂)₂NH.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the order of basicity: phenylamine < ammonia < ethylamine.",
    points: ["Basicity depends on the availability of the lone pair on N to accept a proton", "Ethylamine: the ethyl group is electron-donating (positive inductive effect), increasing electron density on N", "Phenylamine: the N lone pair is partly delocalised into the ring's π system", "so it is less available; ammonia has neither effect and lies between"],
    modelAnswer: "A base accepts a proton with the lone pair on nitrogen, so the more available the lone pair, the stronger the base. In ethylamine the ethyl group pushes electron density onto nitrogen, making its lone pair more available than in ammonia. In phenylamine the lone pair overlaps with the delocalised π system of the ring and is partly drawn into it, so it is much less available. Ammonia, with neither effect, is intermediate.",
    hints: ["Lone-pair availability is the key."],
    explanation: "Inductive effect versus delocalisation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why heating 1-bromobutane with ammonia gives a mixture of products, and how the yield of butylamine can be increased.",
    points: ["Butylamine still has a lone pair on N, so it is also a nucleophile", "It reacts with more 1-bromobutane, giving secondary and tertiary amines (and a quaternary ammonium salt)", "Using a large excess of ammonia makes reaction with ammonia more likely, increasing the proportion of butylamine"],
    modelAnswer: "The butylamine formed has a lone pair on nitrogen and is a better nucleophile than ammonia, so it attacks more 1-bromobutane, forming dibutylamine, tributylamine and a quaternary salt. A large excess of ammonia makes collisions of the halogenoalkane with ammonia far more likely, so butylamine is the main product.",
    hints: ["Is the product still a nucleophile?"],
    explanation: "Successive substitution.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "pKa values of the conjugate acids of three bases at 298 K (data). The larger the pKa of the conjugate acid, the stronger the base.\n\n| Base | Conjugate acid | pKa of conjugate acid |\n|---|---|---|\n| ammonia, NH₃ | NH₄⁺ | 9.25 |\n| methylamine, CH₃NH₂ | CH₃NH₃⁺ | 10.64 |\n| phenylamine, C₆H₅NH₂ | C₆H₅NH₃⁺ | 4.62 |",
    parts: [
      P.manual({ label: "(a)", marks: 1, stem: "Write an equation showing methylamine acting as a base in water.", points: ["CH₃NH₂ + H₂O ⇌ CH₃NH₃⁺ + OH⁻"], modelAnswer: "CH₃NH₂ + H₂O ⇌ CH₃NH₃⁺ + OH⁻" }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which base is the weakest?", options: [
        ["phenylamine", "Correct: its conjugate acid has the smallest pKa, so it gives up H⁺ most easily."],
        ["methylamine", "Its conjugate acid has the largest pKa: methylamine is the strongest base."],
        ["ammonia", "Ammonia lies between the other two."],
        ["they are all equal", "The pKb values are very different."],
      ], answer: "A", explanation: "Smaller pKa of the conjugate acid = weaker base." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain the relative basicities of methylamine and phenylamine compared with ammonia.", points: ["Basic strength depends on availability of the N lone pair to accept H⁺", "Methyl group donates electron density to N (inductive effect): lone pair more available, stronger base than NH₃", "In phenylamine the lone pair is delocalised into the ring: less available, weaker base than NH₃"], modelAnswer: "The nitrogen lone pair accepts a proton. The methyl group pushes electron density onto the nitrogen, so methylamine's lone pair is more available and it is a stronger base than ammonia. In phenylamine the lone pair is delocalised into the benzene ring, so it is less available and phenylamine is a much weaker base." }),
      P.short({ label: "(d)", marks: 1, stem: "Name the salt formed when methylamine reacts with hydrochloric acid.", accepted: ["methylammonium chloride", "methylamine hydrochloride"], wrong: ["chloromethane"], explanation: "CH₃NH₃⁺Cl⁻." }),
      P.manual({ label: "(e)", marks: 2, stem: "Give the reagents and conditions for making methylamine from chloromethane, and write the equation.", points: ["Excess ammonia in ethanol, heated in a sealed tube (under pressure)", "CH₃Cl + 2NH₃ → CH₃NH₂ + NH₄Cl"], modelAnswer: "Heat chloromethane with excess ethanolic ammonia in a sealed tube: CH₃Cl + 2NH₃ → CH₃NH₂ + NH₄Cl." }),
    ],
    hints: ["A strong base holds on to H⁺ tightly, so its conjugate acid has a large pKa."],
    explanation: "Methylamine > ammonia > phenylamine; inductive effect versus delocalisation; methylammonium chloride; excess ethanolic NH₃.",
  });

  {
    const n = moles(1.18, 59);
    const m = n * 95.5;
    b.struct({
      d: 3, skill: "EVALUATION", examStyle: true, calculator: true,
      stem: "Propylamine, CH₃CH₂CH₂NH₂ (Mr 59), can be made by route 1 (1-bromopropane with ammonia) or route 2 (reduction of propanenitrile).",
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Give the reagents and conditions for each route.", points: ["Route 1: excess NH₃ in ethanol, heat in a sealed tube (under pressure)", "Route 2: LiAlH₄ in dry ether, or H₂ with a nickel catalyst"], modelAnswer: "Route 1: heat 1-bromopropane with excess ethanolic ammonia in a sealed tube. Route 2: reduce propanenitrile with LiAlH₄ in dry ether (or hydrogen over nickel)." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which route can give dipropylamine as a by-product?", options: [
          ["route 1", "Correct: propylamine can attack more 1-bromopropane."],
          ["route 2", "Nitrile reduction gives only the primary amine."],
          ["both routes", "Only the halogenoalkane route allows further substitution."],
          ["neither route", "Route 1 gives a mixture unless ammonia is in large excess."],
        ], answer: "A", explanation: "Further substitution in route 1." }),
        P.num({ label: "(c)", marks: 2, stem: "1.18 g of propylamine reacts with excess hydrochloric acid. Calculate the mass of propylammonium chloride (Mr 95.5) formed, in g.", value: m, sf: 3, unit: "g", wrong: [1.18], explanation: `n = 1.18 ÷ 59 = ${sfStr(n, 3)} mol; mass = ${sfStr(n, 3)} × 95.5 = ${sfStr(m, 3)} g.` }),
        P.manual({ label: "(d)", marks: 1, stem: "Describe how the free amine could be recovered from the salt.", points: ["Warm the salt with NaOH(aq) (a stronger base) and distil off/collect the propylamine"], modelAnswer: "Warm the salt with sodium hydroxide solution, which releases propylamine; distil it off." }),
      ],
      hints: ["Is the product of route 1 still a nucleophile?"],
      explanation: `Route 1 sealed tube with excess NH₃; route 2 LiAlH₄; route 1 can over-alkylate; ${sfStr(m, 3)} g salt; NaOH releases the amine.`,
    });
  }
  b.manualShort({
    d: 2, skill: "APPLICATION", marks: 2,
    stem: "Describe a simple test showing that aqueous ethylamine is alkaline, and write an equation explaining the result.",
    points: ["Damp red litmus turns blue (or universal indicator turns blue/purple; pH above 7)", "CH₃CH₂NH₂ + H₂O ⇌ CH₃CH₂NH₃⁺ + OH⁻"],
    modelAnswer: "Damp red litmus paper turns blue, because CH₃CH₂NH₂ + H₂O ⇌ CH₃CH₂NH₃⁺ + OH⁻ produces hydroxide ions.",
    explanation: "Amines accept protons from water, releasing OH⁻.",
  });
  b.card("DEFINITION", "Primary, secondary, tertiary amine", "N bonded to one, two or three carbon groups: RNH₂, R₂NH, R₃N.");
  b.card("FACT", "Amine from a halogenoalkane", "Excess NH₃ in ethanol, heat in a sealed tube: RX + 2NH₃ → RNH₂ + NH₄X.");
  b.card("FACT", "Amine from a nitrile", "LiAlH₄ in dry ether, or H₂ with Ni: RCN + 4[H] → RCH₂NH₂.");
  b.card("FACT", "Amine from an amide", "LiAlH₄ in dry ether: RCONH₂ + 4[H] → RCH₂NH₂ + H₂O.");
  b.card("CONCEPT", "Why the halogenoalkane route gives a mixture", "The amine product is also a nucleophile, giving secondary and tertiary amines and quaternary salts.");
  b.card("FACT", "Order of base strength", "phenylamine < ammonia < ethylamine.");
  b.card("CONCEPT", "Why ethylamine is a stronger base than ammonia", "The ethyl group donates electron density to N, making the lone pair more available.");
  b.card("CONCEPT", "Why phenylamine is a weaker base than ammonia", "The N lone pair is delocalised into the benzene ring, so it is less available.");
  b.card("FORMULA", "pH of an amine solution", "[OH⁻] = √(Kb c); pOH = −log[OH⁻]; pH = 14.00 − pOH.", undefined, { applies: ZIM });
});
