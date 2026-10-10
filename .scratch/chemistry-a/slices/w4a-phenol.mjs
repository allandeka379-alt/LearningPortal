// W4a: achem.hydroxy.phenol (both boards; ZIMSEC Form 6, Cambridge A Level only)
import { concept, P, t, Mr, moles, pHWeakAcid, kaFromPH, molesFromSolution, sfStr, dpStr, sciStr } from "../lib.mjs";

concept("achem.hydroxy.phenol", { file: "hydroxy/phenol", keyPrefix: "hydroxy.phenol" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is observed when bromine water is added to aqueous phenol at room temperature?",
    options: [
      ["The orange colour disappears and a white precipitate forms.", "Correct: 2,4,6-tribromophenol precipitates."],
      ["The orange colour remains until iron(III) bromide is added.", "That is the behaviour of benzene; phenol needs no catalyst."],
      ["A pale yellow precipitate with an antiseptic smell forms.", "That describes tri-iodomethane from the iodoform test."],
      ["The solution turns from orange to green as phenol is oxidised.", "Orange to green is the dichromate(VI) change, not bromine."],
    ],
    answer: "A",
    explanation: "C₆H₅OH + 3Br₂ → C₆H₂Br₃OH(s) + 3HBr.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which list shows the compounds in order of increasing acid strength?",
    options: [
      ["ethanol < water < phenol < ethanoic acid", "Correct: pKa about 16, 15.7, 9.9 and 4.76."],
      ["water < ethanol < phenol < ethanoic acid", "Ethanol is a weaker acid than water: the ethyl group destabilises ethoxide."],
      ["ethanol < water < ethanoic acid < phenol", "Phenol is weaker than ethanoic acid; carboxylate charge is spread over two O atoms."],
      ["phenol < ethanol < water < ethanoic acid", "Phenol is far more acidic than water and ethanol."],
    ],
    answer: "A",
    explanation: "The more stable the anion, the stronger the acid: ethoxide < hydroxide < phenoxide < ethanoate.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which conditions convert phenylamine into benzenediazonium chloride?",
    options: [
      ["NaNO₂ and dilute HCl, below 10 °C", "Correct: nitrous acid is made in situ; the salt decomposes if warm."],
      ["NaNO₂ and dilute HCl, heated under reflux", "Heating decomposes the diazonium salt to phenol and N₂."],
      ["concentrated HNO₃ and concentrated H₂SO₄, 50 °C", "This is the nitrating mixture for benzene."],
      ["tin and concentrated HCl, heated under reflux", "Sn/HCl reduces nitrobenzene to phenylamine."],
    ],
    answer: "A",
    explanation: "C₆H₅NH₂ + HNO₂ + HCl → C₆H₅N₂⁺Cl⁻ + 2H₂O, kept in ice.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does phenol react with bromine water without a catalyst while benzene does not?",
    options: [
      ["A lone pair on oxygen is delocalised into the ring, raising its electron density.", "Correct: the ring becomes a better nucleophile and polarises Br₂."],
      ["The O–H bond in phenol is polar, so the bromine attacks the hydrogen atom.", "Substitution happens on the ring carbons, not at the O–H hydrogen."],
      ["Phenol has fewer delocalised electrons, so its ring is less stable than benzene's.", "The ring gains electron density from O; delocalisation is extended, not reduced."],
      ["The –OH group withdraws electrons from the ring, making it attract bromide ions.", "–OH donates electron density into the ring; the electrophile is the δ+ bromine."],
    ],
    answer: "A",
    hints: ["Does the –OH group increase or decrease the electron density in the ring?"],
    explanation: "Higher electron density, especially at C2, C4 and C6, lets phenol polarise Br₂ and react rapidly.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the statements about phenol are correct?\n\n1. It dissolves in aqueous sodium hydroxide.\n2. It reacts with sodium metal to give hydrogen.\n3. It reacts with sodium carbonate solution to give carbon dioxide.",
    options: [
      ["1 and 2 only", "Correct: phenol is too weak an acid to react with carbonates."],
      ["1, 2 and 3", "Statement 3 is false: no CO₂ is released."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: 2C₆H₅OH + 2Na → 2C₆H₅ONa + H₂."],
    ],
    answer: "A",
    hints: ["Compare phenol's pKa with that of carbonic acid (about 6.4)."],
    explanation: "Phenol forms sodium phenoxide with NaOH and Na; it does not release CO₂ from carbonates.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Phenol is treated with dilute nitric acid at room temperature. What are the main organic products?",
    options: [
      ["2-nitrophenol and 4-nitrophenol", "Correct: –OH directs to the 2- and 4-positions; mild conditions give mononitration."],
      ["3-nitrophenol only", "–OH is 2,4-directing, not 3-directing."],
      ["nitrobenzene and water", "The –OH group is not replaced; substitution occurs on the ring."],
      ["2,4,6-trinitrophenol only", "Trinitration needs concentrated acids; dilute acid gives mononitration."],
    ],
    answer: "A",
    hints: ["Which ring positions does –OH activate?"],
    explanation: "C₆H₅OH + HNO₃ → C₆H₄(OH)NO₂ + H₂O, as a mixture of 2- and 4-isomers.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "2-methylphenol, CH₃C₆H₄OH (CH₃ next to –OH), reacts with excess bromine water. What is the organic product?",
    options: [
      ["4,6-dibromo-2-methylphenol", "Correct: the free activated positions relative to –OH are 4 and 6."],
      ["2,4,6-tribromo-3-methylphenol", "Position 2 is already occupied by the methyl group, so only two Br atoms enter."],
      ["3,5-dibromo-2-methylphenol", "–OH directs to 2, 4 and 6, not to 3 and 5."],
      ["4-bromo-2-methylphenol", "With excess bromine water both free activated positions are substituted."],
    ],
    answer: "A",
    hints: ["Position 2 is taken; which activated positions remain?"],
    explanation: "CH₃C₆H₄OH + 2Br₂ → CH₃C₆H₂Br₂OH + 2HBr, Br at C4 and C6.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which of the statements about the coupling of benzenediazonium chloride with phenol are correct?\n\n1. The phenol is dissolved in aqueous sodium hydroxide.\n2. The diazonium ion acts as an electrophile.\n3. The product is coloured because of extended delocalisation.",
    options: [
      ["1, 2 and 3", "Correct: all three statements describe azo coupling."],
      ["1 and 2 only", "Statement 3 is also true: the –N=N– bridge links two delocalised rings."],
      ["2 and 3 only", "Statement 1 is also true: the reaction is done in alkali, with phenoxide."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Consider the reagent, the mechanism and the product's colour."],
    explanation: "In alkali, the electron-rich phenoxide is attacked at C4 by the weakly electrophilic C₆H₅N₂⁺, giving yellow-orange 4-hydroxyazobenzene.",
  });
  {
    const c = 0.2, Ka = 1.3e-10;
    const p = pHWeakAcid(Ka, c);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the pH of 0.200 mol dm⁻³ aqueous phenol, to two decimal places. Data: Ka(phenol) = 1.3 × 10⁻¹⁰ mol dm⁻³. Assume [H⁺] = √(Ka c).",
      value: p, dp: 2,
      wrong: [-Math.log10(Ka * c)],
      hints: ["[H⁺] = √(Ka × c)."],
      explanation: `[H⁺] = √(1.3 × 10⁻¹⁰ × 0.200) = ${sciStr(Math.sqrt(Ka * c), 3)} mol dm⁻³; pH = ${dpStr(p, 2)}. Forgetting the square root gives ${dpStr(-Math.log10(Ka * c), 2)}.`,
    });
  }
  {
    const c = 0.0400, pHv = 5.60;
    const Ka = kaFromPH(pHv, c);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "A 0.0400 mol dm⁻³ solution of a substituted phenol has pH 5.60. Calculate Ka of the phenol, in mol dm⁻³, to two significant figures, assuming [H⁺] = [ArO⁻] and that dissociation is negligible.",
      value: Ka, sf: 2, unit: "mol/dm³",
      wrong: [10 ** -pHv / c],
      hints: ["Ka = [H⁺]² ÷ c."],
      explanation: `1. [H⁺] = 10⁻⁵·⁶⁰ = ${sciStr(10 ** -pHv, 3)} mol dm⁻³.\n2. Ka = [H⁺]² ÷ [phenol] = (${sciStr(10 ** -pHv, 3)})² ÷ 0.0400 = ${sciStr(Ka, 2)} mol dm⁻³.\n3. Not squaring [H⁺] gives ${sciStr(10 ** -pHv / c, 2)}, which ignores that [ArO⁻] = [H⁺].`,
    });
  }
  {
    const m = 1.88;
    const n = moles(m, Mr("C6H5OH"));
    const mp = n * Mr("C6H2Br3OH");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "1.88 g of phenol reacts completely with excess bromine water. Calculate the mass of 2,4,6-tribromophenol, C₆H₂Br₃OH, formed, in g, to three significant figures. Ar: H 1, C 12, O 16, Br 79.9.",
      value: mp, sf: 3, unit: "g",
      wrong: [n * Mr("C6H4BrOH")],
      hints: ["1 mol phenol gives 1 mol tribromophenol."],
      explanation: `1. n(phenol) = 1.88 ÷ 94.0 = ${sfStr(n, 3)} mol.\n2. Mr(C₆H₂Br₃OH) = ${Mr("C6H2Br3OH").toFixed(1)}.\n3. Mass = ${sfStr(n, 3)} × ${Mr("C6H2Br3OH").toFixed(1)} = ${sfStr(mp, 3)} g.\n4. Assuming monobromination (as for benzene) gives ${sfStr(n * Mr("C6H4BrOH"), 3)} g.`,
    });
  }
  {
    const n = moles(2.35, Mr("C6H5OH"));
    const v = (n / 0.5) * 1000;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "What volume, in cm³, of 0.500 mol dm⁻³ sodium hydroxide reacts exactly with 2.35 g of phenol? Ar: H 1, C 12, O 16.",
      value: v, sf: 3, unit: "cm³",
      wrong: [n / 0.5],
      explanation: `n(phenol) = 2.35 ÷ 94.0 = ${sfStr(n, 3)} mol = n(NaOH) (1 : 1); V = ${sfStr(n, 3)} ÷ 0.500 = ${sfStr(n / 0.5, 3)} dm³ = ${sfStr(v, 3)} cm³.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Phenol is a stronger acid than ethanol because the negative charge of the phenoxide ion is delocalised into the benzene ring.",
    answer: true,
    explanation: "True: delocalisation stabilises the phenoxide ion; ethoxide's charge is concentrated on O.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "When aqueous benzenediazonium chloride is warmed, nitrogen gas is given off and phenol is formed.",
    answer: true,
    hints: ["What happens to a diazonium salt above 10 °C?"],
    explanation: "True: C₆H₅N₂⁺Cl⁻ + H₂O → C₆H₅OH + N₂ + HCl.",
  });
  b.match({
    d: 3, skill: "RECALL",
    stem: "Match each reagent and conditions with the product formed from phenol.",
    pairs: [
      ["bromine water, room temperature", "2,4,6-tribromophenol"],
      ["dilute HNO₃, room temperature", "2-nitrophenol and 4-nitrophenol"],
      ["NaOH(aq)", "sodium phenoxide and water"],
      ["sodium metal", "sodium phenoxide and hydrogen"],
      ["benzenediazonium chloride in NaOH(aq), cold", "4-hydroxyazobenzene (an azo dye)"],
    ],
    hints: ["Two reactions are electrophilic substitutions, two are acid reactions and one is coupling."],
    explanation: "Bromination, nitration, neutralisation, reaction with Na and azo coupling.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about phenol.",
    template: "The –OH group of phenol directs incoming electrophiles to the 2-, 4- and {{blank:a}}-positions. Phenol is made by {{blank:b}} an aqueous solution of benzenediazonium chloride, which releases {{blank:c}} gas.",
    blanks: [
      { id: "a", accepted: ["6"], choices: ["3", "5", "6"] },
      { id: "b", accepted: ["warming"], choices: ["warming", "freezing", "electrolysing"] },
      { id: "c", accepted: ["nitrogen"], choices: ["nitrogen", "hydrogen", "ammonia"] },
    ],
    explanation: "–OH is 2,4,6-directing; warming the diazonium salt gives phenol + N₂ + HCl.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Give the name of the white precipitate formed when phenol reacts with bromine water.",
    accepted: ["2,4,6-tribromophenol", "2 4 6-tribromophenol", "tribromophenol", "2,4,6 tribromophenol"],
    wrong: ["bromophenol"],
    hints: ["Three bromine atoms enter the ring."],
    explanation: "2,4,6-tribromophenol, C₆H₂Br₃OH.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why phenol is a stronger acid than ethanol but a weaker acid than ethanoic acid.",
    points: ["Acid strength depends on the stability of the anion formed", "Phenoxide: negative charge partly delocalised into the benzene ring, so more stable than ethoxide", "Ethoxide: charge on O is not delocalised and the ethyl group donates electron density, destabilising it", "Ethanoate: charge delocalised equally over two electronegative O atoms, more stable than phenoxide (where the charge spreads onto less electronegative carbons)"],
    modelAnswer: "The stronger the acid, the more stable its conjugate base. In phenoxide a lone pair on O overlaps with the ring π system, spreading the negative charge, so phenoxide is more stable than ethoxide, where the charge stays on O and is intensified by the electron-donating ethyl group. In ethanoate the charge is delocalised equally over two oxygen atoms, which are more electronegative than carbon, so ethanoate is even more stable than phenoxide, and ethanoic acid is the strongest of the three.",
    hints: ["Compare where the negative charge is in each anion."],
    explanation: "Compare the three anions.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Outline how phenol is made from phenylamine in the laboratory, giving reagents, conditions and equations.",
    points: ["Phenylamine with NaNO₂ and dilute HCl (nitrous acid) below 10 °C (ice bath)", "C₆H₅NH₂ + HNO₂ + HCl → C₆H₅N₂⁺Cl⁻ + 2H₂O", "Warm the diazonium solution: C₆H₅N₂⁺Cl⁻ + H₂O → C₆H₅OH + N₂ + HCl"],
    modelAnswer: "Dissolve phenylamine in dilute hydrochloric acid, cool in ice to below 10 °C and add cold sodium nitrite solution: C₆H₅NH₂ + HNO₂ + HCl → C₆H₅N₂⁺Cl⁻ + 2H₂O. Then warm the solution: nitrogen is evolved and phenol forms, C₆H₅N₂⁺Cl⁻ + H₂O → C₆H₅OH + N₂ + HCl.",
    hints: ["Two stages: diazotisation, then hydrolysis."],
    explanation: "Diazotisation in the cold then warming.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3,
    stem: "2-naphthol (naphthalen-2-ol) is a phenol. Predict, with reasons, what is seen when it is (i) shaken with NaOH(aq) and (ii) added in alkali to cold benzenediazonium chloride.",
    points: ["(i) It dissolves, forming the sodium naphthoxide salt (it is acidic like phenol)", "(ii) An intensely coloured (orange-red) precipitate forms", "(ii) Azo coupling: the diazonium ion substitutes into the activated ring of the naphthoxide ion, giving an azo dye with extended delocalisation"],
    modelAnswer: "(i) 2-naphthol, like phenol, is a weak acid and dissolves in sodium hydroxide to form its sodium salt. (ii) An orange-red precipitate forms: the diazonium ion couples with the electron-rich naphthoxide ring, producing an azo compound whose extended delocalised system absorbs visible light.",
    hints: ["Treat the –OH exactly as in phenol."],
    explanation: "Apply phenol chemistry to naphthol.",
  });
  {
    const c = 0.12, Ka = 1.3e-10;
    const p = pHWeakAcid(Ka, c);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "Phenol is used as a starting material for dyes. Data: Ka(phenol) = 1.3 × 10⁻¹⁰ mol dm⁻³; Ar: H 1, C 12, O 16.",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the pH of 0.120 mol dm⁻³ phenol, to two decimal places.", value: p, dp: 2, wrong: [dpStr(-Math.log10(Ka * c), 2)], explanation: `[H⁺] = √(1.3 × 10⁻¹⁰ × 0.120) = ${sciStr(Math.sqrt(Ka * c), 3)}; pH = ${dpStr(p, 2)}.` }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain why the ring in phenol is more reactive towards electrophiles than benzene.", points: ["A lone pair on the O atom is delocalised into the ring π system", "increasing electron density in the ring (especially at 2, 4, 6), so electrophiles are attracted/polarised more strongly"], modelAnswer: "One lone pair on the oxygen overlaps with the ring's delocalised π electrons, increasing the electron density of the ring, particularly at positions 2, 4 and 6, so electrophiles are attracted more strongly." }),
        P.short({ label: "(c)", marks: 1, stem: "Give the molecular formula of the product of phenol with excess bromine water (for example C6H5Br).", accepted: ["C6H3Br3O", "C6H2Br3OH", "C₆H₂Br₃OH", "C₆H₃Br₃O"], normalise: ["trim", "collapse_whitespace"], wrong: ["C6H5BrO"], explanation: "2,4,6-tribromophenol, C₆H₂Br₃OH." }),
        P.mcq({ label: "(d)", marks: 1, stem: "Which reagent would distinguish phenol from ethanoic acid?", options: [
          ["sodium carbonate solution", "Correct: only ethanoic acid gives effervescence of CO₂."],
          ["sodium metal", "Both give hydrogen."],
          ["sodium hydroxide solution", "Both react, with no visible difference in a clear solution."],
          ["blue litmus paper", "Both are acidic enough to turn moist blue litmus red."],
        ], answer: "A", explanation: "Phenol is too weak an acid to react with carbonates." }),
        P.manual({ label: "(e)", marks: 2, stem: "Phenol in NaOH(aq) is added to cold benzenediazonium chloride. State what is seen and give the structural formula of the organic product.", points: ["A yellow-orange precipitate forms", "C₆H₅N=NC₆H₄OH (4-hydroxyazobenzene, –OH para to the N=N)"], modelAnswer: "A yellow-orange precipitate of 4-hydroxyazobenzene, C₆H₅N=NC₆H₄OH, forms." }),
      ],
      hints: ["[H⁺] = √(Ka c).", "Carbonates react only with acids stronger than carbonic acid."],
      explanation: `pH = ${dpStr(p, 2)}; activated ring; C₆H₂Br₃OH; Na₂CO₃ distinguishes; yellow-orange azo dye.`,
    });
  }

  {
    const n = moles(4.65, Mr("C6H5NH2"));
    const mP = n * 0.6 * Mr("C6H5OH");
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "Nyasha makes phenol from phenylamine and then investigates its reactions.\n\n| Step | Reactant | Reagent and conditions | Product |\n|---|---|---|---|\n| 1 | phenylamine | reagents A, temperature B | benzenediazonium chloride |\n| 2 | benzenediazonium chloride | warm with water | phenol |\n| 3 | phenol | dilute HNO₃, room temperature | C |",
      parts: [
        P.fib({ label: "(a)", stem: "Identify A and B.", template: "A: {{blank:a}} and dilute hydrochloric acid. B: {{blank:b}}.", blanks: [
          { id: "a", accepted: ["sodium nitrite"], choices: ["sodium nitrite", "sodium nitrate", "tin"] },
          { id: "b", accepted: ["below 10 °C"], choices: ["below 10 °C", "about 60 °C", "about 100 °C"] },
        ], explanation: "NaNO₂ + dilute HCl (nitrous acid) below 10 °C." }),
        P.manual({ label: "(b)", marks: 1, stem: "Write an equation for step 2.", points: ["C₆H₅N₂⁺Cl⁻ + H₂O → C₆H₅OH + N₂ + HCl"], modelAnswer: "C₆H₅N₂⁺Cl⁻ + H₂O → C₆H₅OH + N₂ + HCl" }),
        P.mcq({ label: "(c)", marks: 1, stem: "What is C?", options: [
          ["a mixture of 2-nitrophenol and 4-nitrophenol", "Correct: –OH directs to 2 and 4; dilute acid gives mononitration."],
          ["3-nitrophenol only, from substitution at position 3", "–OH does not direct to position 3."],
          ["2,4,6-trinitrophenol only, from complete nitration", "Trinitration needs concentrated acids."],
          ["nitrobenzene, by replacement of the –OH group", "The –OH group is not replaced."],
        ], answer: "A", explanation: "Mononitration at the 2- and 4-positions." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why phenol can be nitrated with dilute nitric acid at room temperature, while benzene needs a mixture of concentrated nitric and sulfuric acids.", points: ["A lone pair on the O of –OH is delocalised into the ring, increasing its electron density (activating it)", "so even the low concentration of electrophile in dilute HNO₃ reacts; benzene needs concentrated H₂SO₄ to generate enough NO₂⁺"], modelAnswer: "The oxygen lone pair of –OH is partly delocalised into the ring, making the ring much more electron-rich, so it reacts with the small amount of electrophile in dilute nitric acid. Benzene is less reactive and needs concentrated sulfuric acid to generate a high concentration of NO₂⁺." }),
        P.num({ label: "(e)", marks: 2, stem: "Nyasha starts with 4.65 g of phenylamine (Mr 93). The overall yield of phenol (Mr 94) is 60.0%. Calculate the mass of phenol obtained, in g.", value: mP, sf: 3, unit: "g", wrong: [n * Mr("C6H5OH")], explanation: `n(phenylamine) = 4.65 ÷ 93 = ${sfStr(n, 3)} mol; phenol = ${sfStr(n, 3)} × 0.600 × 94 = ${sfStr(mP, 3)} g.` }),
      ],
      hints: ["The diazonium salt must be kept cold.", "–OH activates the ring."],
      explanation: `A NaNO₂, B below 10 °C; warming gives phenol + N₂; C is 2- and 4-nitrophenol; phenol ${sfStr(mP, 3)} g.`,
    });
  }
  b.card("DEFINITION", "Phenol", "A compound with –OH bonded directly to a benzene ring carbon; C₆H₅OH.");
  b.card("CONCEPT", "Why phenol is acidic", "The phenoxide ion is stabilised by delocalisation of its negative charge into the ring.");
  b.card("FACT", "Order of acidity", "ethanol < water < phenol < carboxylic acids.");
  b.card("FACT", "Phenol with bromine water", "Room temperature, no catalyst: white precipitate of 2,4,6-tribromophenol; orange colour removed.");
  b.card("FACT", "Nitration of phenol", "Dilute HNO₃, room temperature → 2-nitrophenol + 4-nitrophenol.");
  b.card("FACT", "Phenol from phenylamine", "NaNO₂ + dilute HCl below 10 °C → diazonium salt; warm → phenol + N₂ + HCl.");
  b.card("FACT", "Phenol and carbonates", "No reaction: phenol is too weak an acid to release CO₂ (distinguishes it from carboxylic acids).");
  b.card("CONCEPT", "Directing effect of –OH", "Activates the ring and directs to positions 2, 4 and 6 (lone pair on O delocalised into the ring).");
  b.card("FACT", "Azo coupling with phenol", "Cold diazonium salt + phenol in NaOH(aq) → yellow-orange 4-hydroxyazobenzene.");
});
