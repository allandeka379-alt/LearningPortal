// W4a: achem.carboxylic.acidity-further-reactions (both boards; ZIMSEC Form 6, Cambridge A Level only)
import { concept, P, t, Mr, moles, kaFromPKa, pHWeakAcid, pKa, molesFromSolution, sfStr, dpStr, sciStr } from "../lib.mjs";

concept("achem.carboxylic.acidity-further-reactions", { file: "carboxylic/acidity-further-reactions", keyPrefix: "carboxylic.acidity-further-reactions" }, (b) => {
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which acid is the strongest?",
    options: [
      ["trichloroethanoic acid, CCl₃COOH", "Correct: three electron-withdrawing Cl atoms stabilise the anion most."],
      ["chloroethanoic acid, CH₂ClCOOH", "One Cl atom has a smaller effect than three."],
      ["ethanoic acid, CH₃COOH", "With no Cl atoms, the anion is least stabilised of the chloro series."],
      ["propanoic acid, CH₃CH₂COOH", "The extra alkyl group donates electron density, so it is weaker than ethanoic acid."],
    ],
    answer: "A",
    explanation: "pKa (data): CCl₃COOH 0.65 < CH₂ClCOOH 2.86 < CH₃COOH 4.76 < CH₃CH₂COOH 4.87.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which reagent converts ethanoic acid into ethanoyl chloride, with only gaseous by-products?",
    options: [
      ["thionyl chloride, SOCl₂", "Correct: the by-products SO₂ and HCl are both gases."],
      ["phosphorus(V) chloride, PCl₅", "This works, but POCl₃ is a liquid by-product."],
      ["phosphorus(III) chloride, PCl₃", "This works on heating, but H₃PO₃ remains as a by-product."],
      ["concentrated hydrochloric acid", "HCl does not convert carboxylic acids into acyl chlorides."],
    ],
    answer: "A",
    explanation: "CH₃COOH + SOCl₂ → CH₃COCl + SO₂ + HCl.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which reagent and conditions convert methylbenzene into benzoic acid?",
    options: [
      ["hot alkaline KMnO₄ under reflux, then acidify", "Correct: the side chain is oxidised to –COO⁻; acid then gives benzoic acid."],
      ["Cl₂ in ultraviolet light, then NaOH(aq)", "This chlorinates the side chain; it does not form COOH directly."],
      ["concentrated HNO₃ and H₂SO₄ at 50 °C", "This nitrates the ring."],
      ["cold dilute acidified KMnO₄", "Cold dilute manganate(VII) does not oxidise the side chain of an arene."],
    ],
    answer: "A",
    explanation: "C₆H₅CH₃ + 3[O] → C₆H₅COOH + H₂O.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is ethanoic acid a stronger acid than phenol?",
    options: [
      ["The ethanoate charge is delocalised over two electronegative oxygen atoms.", "Correct: this stabilises the anion more than delocalisation into a ring."],
      ["Ethanoic acid has a stronger O–H bond than phenol has.", "A stronger O–H bond would make an acid weaker, not stronger."],
      ["The methyl group of ethanoic acid withdraws electrons from the COOH group.", "Methyl groups donate electron density; they make ethanoic acid slightly weaker."],
      ["The phenoxide ion has its charge delocalised over two oxygen atoms.", "Phenoxide has only one oxygen; its charge spreads into ring carbons."],
    ],
    answer: "A",
    hints: ["Compare where the charge goes in each anion."],
    explanation: "Carboxylate: two equivalent O atoms share the charge; phenoxide: one O and less electronegative ring carbons.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the statements explain why chloroethanoic acid is stronger than ethanoic acid?\n\n1. Chlorine withdraws electron density from the carboxylate group.\n2. The negative charge on the anion is spread out, stabilising it.\n3. Chlorine donates a lone pair to the carboxylate group.",
    options: [
      ["1 and 2 only", "Correct: the inductive effect of Cl stabilises the anion."],
      ["1, 2 and 3", "Statement 3 is wrong: Cl acts by withdrawing electrons through σ bonds."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: it is the consequence of statement 1."],
    ],
    answer: "A",
    hints: ["Is chlorine electron-withdrawing or electron-donating here?"],
    explanation: "Electron withdrawal by Cl spreads the charge and stabilises ClCH₂COO⁻.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which reagents give a positive result with methanoic acid but not with ethanoic acid?\n\n1. Tollens' reagent, warm\n2. acidified potassium manganate(VII), warm\n3. sodium carbonate solution",
    options: [
      ["1 and 2 only", "Correct: methanoic acid is oxidised to CO₂; both acids react with carbonates."],
      ["1, 2 and 3", "Both acids fizz with sodium carbonate, so it does not distinguish them."],
      ["2 and 3 only", "Tollens' does distinguish them; carbonate does not."],
      ["1 only", "Acidified manganate(VII) is also decolorised by methanoic acid only."],
    ],
    answer: "A",
    hints: ["Which acid contains an H–C=O unit?"],
    explanation: "HCOOH + [O] → CO₂ + H₂O; ethanoic acid resists oxidation.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which list puts the acids in order of increasing pKa (strongest first)?",
    options: [
      ["2-chloropropanoic acid < 3-chloropropanoic acid < propanoic acid", "Correct: the nearer the Cl to COOH, the stronger the acid."],
      ["3-chloropropanoic acid < 2-chloropropanoic acid < propanoic acid", "The inductive effect falls with distance, so 2-chloro is stronger."],
      ["propanoic acid < 3-chloropropanoic acid < 2-chloropropanoic acid", "This order is reversed: it puts the weakest acid, with the largest pKa, first."],
      ["2-chloropropanoic acid < propanoic acid < 3-chloropropanoic acid", "Any Cl substituent strengthens the acid relative to propanoic acid."],
    ],
    answer: "A",
    hints: ["Smaller pKa = stronger acid. How does the inductive effect change with distance?"],
    explanation: "Inductive effects weaken along the chain; a Cl on C2 has more effect than on C3.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "What is observed when methylbenzene is heated under reflux with alkaline potassium manganate(VII)?",
    options: [
      ["The purple colour fades and a brown precipitate forms.", "Correct: MnO₄⁻ is reduced to MnO₂ in alkaline conditions."],
      ["The purple solution becomes colourless with no precipitate.", "That happens in acidic conditions (Mn²⁺), not alkaline."],
      ["The solution turns from orange to green.", "That is the dichromate(VI) colour change."],
      ["A silver mirror forms on the flask.", "That is the Tollens' test for aldehydes."],
    ],
    answer: "A",
    hints: ["What is manganate(VII) reduced to in alkali?"],
    explanation: "Alkaline MnO₄⁻ → MnO₂ (brown solid).",
  });
  {
    const pk = 3.98, c = 0.05;
    const Ka = kaFromPKa(pk);
    const p = pHWeakAcid(Ka, c);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the pH of 0.0500 mol dm⁻³ 3-chloropropanoic acid, to two decimal places. Data: pKa = 3.98. Use [H⁺] = √(Ka c).",
      value: p, dp: 2,
      wrong: [dpStr(-Math.log10(c), 2)],
      hints: ["Ka = 10⁻ᵖᴷᵃ."],
      explanation: `Ka = 10⁻³·⁹⁸ = ${sciStr(Ka, 3)} mol dm⁻³; [H⁺] = √(${sciStr(Ka, 3)} × 0.0500) = ${sciStr(Math.sqrt(Ka * c), 3)} mol dm⁻³; pH = ${dpStr(p, 2)}. Treating it as a strong acid gives ${dpStr(-Math.log10(c), 2)}.`,
    });
  }
  {
    const ratio = kaFromPKa(2.83) / kaFromPKa(4.87);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, daily: true,
      stem: "pKa values (data): propanoic acid 4.87, 2-chloropropanoic acid 2.83. By what factor is Ka of 2-chloropropanoic acid larger than Ka of propanoic acid? Give your answer to two significant figures.",
      value: ratio, sf: 2,
      wrong: [4.87 / 2.83],
      hints: ["Ka ratio = 10^(difference in pKa)."],
      explanation: `Ratio = 10^(4.87 − 2.83) = 10^2.04 = ${sfStr(ratio, 2)}. Dividing the pKa values (${sfStr(4.87 / 2.83, 2)}) is wrong because pKa is a logarithm.`,
    });
  }
  {
    const nMn = molesFromSolution(21.3, 0.015);
    const nOx = (nMn * 5) / 2;
    const c = nOx / 0.02;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "20.0 cm³ of an ethanedioic acid solution is acidified and warmed to 60 °C. It reacts with 21.30 cm³ of 0.0150 mol dm⁻³ potassium manganate(VII). Calculate the concentration of ethanedioic acid in mol dm⁻³, to three significant figures. (5H₂C₂O₄ + 2MnO₄⁻ + 6H⁺ → 10CO₂ + 2Mn²⁺ + 8H₂O)",
      value: c, sf: 3, unit: "mol/dm³",
      wrong: [(nMn * 2) / 5 / 0.02, nMn / 0.02],
      hints: ["Use the 5 : 2 ratio."],
      explanation: `1. n(MnO₄⁻) = 0.02130 × 0.0150 = ${sciStr(nMn, 3)} mol.\n2. n(H₂C₂O₄) = ${sciStr(nMn, 3)} × 5/2 = ${sciStr(nOx, 3)} mol.\n3. c = ${sciStr(nOx, 3)} ÷ 0.0200 = ${sfStr(c, 3)} mol dm⁻³.\n4. Inverting the ratio (× 2/5) gives ${sfStr((nMn * 2) / 5 / 0.02, 3)}; ignoring it gives ${sfStr(nMn / 0.02, 3)}.`,
    });
  }
  {
    const nAcid = moles(3.66, Mr("C6H5COOH"));
    const nTol = nAcid / 0.75;
    const mTol = nTol * Mr("C6H5CH3");
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "A student needs 3.66 g of benzoic acid, C₆H₅COOH. The oxidation of methylbenzene, C₆H₅CH₃, followed by acidification gives a 75.0% yield. Calculate the mass of methylbenzene needed, in g, to three significant figures. Ar: H 1, C 12, O 16.",
      value: mTol, sf: 3, unit: "g",
      wrong: [nAcid * 0.75 * Mr("C6H5CH3")],
      hints: ["Divide by the fractional yield to find the moles needed at the start."],
      explanation: `1. Mr(C₆H₅COOH) = 122; n = 3.66 ÷ 122 = ${sfStr(nAcid, 3)} mol.\n2. n(methylbenzene) = ${sfStr(nAcid, 3)} ÷ 0.750 = ${sfStr(nTol, 3)} mol.\n3. Mr(C₆H₅CH₃) = 92; mass = ${sfStr(nTol, 3)} × 92 = ${sfStr(mTol, 3)} g.\n4. Multiplying by 0.750 instead gives ${sfStr(nAcid * 0.75 * Mr("C6H5CH3"), 3)} g, which would make too little product.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Methanoic acid gives a red-brown precipitate when warmed with Fehling's solution, but ethanoic acid does not.",
    answer: true,
    explanation: "True: methanoic acid contains an H–C=O unit and is oxidised to CO₂ and water.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "In the ethanoate ion the two carbon-oxygen bonds have different lengths, one single and one double.",
    answer: false,
    hints: ["Think about delocalisation in the COO⁻ group."],
    explanation: "False: the charge and π electrons are delocalised over both O atoms, so both C–O bonds are the same length, between single and double.",
  });
  b.match({
    d: 3, skill: "RECALL",
    stem: "Match each reagent with the by-products formed when it reacts with ethanoic acid to make ethanoyl chloride.",
    pairs: [
      ["PCl₅", "POCl₃ and HCl"],
      ["PCl₃", "H₃PO₃"],
      ["SOCl₂", "SO₂ and HCl"],
    ],
    extraRight: ["H₂O and Cl₂"],
    hints: ["Each reagent supplies Cl and keeps the phosphorus or sulfur in a by-product."],
    explanation: "CH₃COOH + PCl₅ → CH₃COCl + POCl₃ + HCl; 3CH₃COOH + PCl₃ → 3CH₃COCl + H₃PO₃; CH₃COOH + SOCl₂ → CH₃COCl + SO₂ + HCl.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the explanation.",
    template: "Chlorine is more {{blank:a}} than carbon, so in ClCH₂COO⁻ it {{blank:b}} electron density from the COO⁻ group. The negative charge is spread out, the anion is more {{blank:c}}, and the acid has a {{blank:d}} pKa than ethanoic acid.",
    blanks: [
      { id: "a", accepted: ["electronegative"], choices: ["electronegative", "electropositive", "reactive"] },
      { id: "b", accepted: ["withdraws"], choices: ["withdraws", "donates", "delocalises"] },
      { id: "c", accepted: ["stable"], choices: ["stable", "reactive", "basic"] },
      { id: "d", accepted: ["smaller"], choices: ["smaller", "larger", "similar"] },
    ],
    hints: ["Stronger acid = larger Ka = smaller pKa."],
    explanation: "Electron withdrawal stabilises the anion; a stronger acid has a smaller pKa.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Give the formula of the gas produced when methanoic acid is oxidised by acidified potassium dichromate(VI).",
    accepted: ["CO2", "CO₂", "carbon dioxide"],
    wrong: ["CO"],
    explanation: "HCOOH + [O] → CO₂ + H₂O.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the order of acid strength: ethanol < water < phenol < ethanoic acid.",
    points: ["Acid strength depends on the stability of the anion (conjugate base)", "Ethoxide is least stable: charge on one O, intensified by the electron-donating ethyl group (less stable than OH⁻)", "Phenoxide: charge partly delocalised into the benzene ring", "Ethanoate: charge delocalised over two electronegative O atoms, most stable"],
    modelAnswer: "The more stable the anion formed, the stronger the acid. Ethoxide holds its charge on one oxygen and the ethyl group pushes more electron density onto it, so it is less stable than hydroxide and ethanol is the weakest acid. In phenoxide the charge is partly delocalised into the ring. In ethanoate the charge is spread equally over two electronegative oxygen atoms, giving the most stable anion and the strongest acid.",
    hints: ["Compare the four anions."],
    explanation: "Anion stability explains the order.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe how benzoic acid is prepared from methylbenzene, including the observations and how the acid is obtained from the reaction mixture.",
    points: ["Heat under reflux with alkaline KMnO₄ (KMnO₄ + NaOH/Na₂CO₃)", "Purple colour fades and a brown precipitate (MnO₂) forms; filter it off", "Acidify the filtrate (dilute HCl/H₂SO₄): white benzoic acid precipitates; filter (recrystallise from hot water)"],
    modelAnswer: "Heat methylbenzene under reflux with potassium manganate(VII) and sodium carbonate solution. The purple colour fades and brown manganese(IV) oxide forms; filter it off. Acidify the filtrate with dilute hydrochloric acid: white crystals of benzoic acid form, which are filtered and recrystallised from hot water.",
    hints: ["The product in alkali is the benzoate ion."],
    explanation: "Oxidation in alkali then acidification.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "Write balanced equations for the conversion of propanoic acid into propanoyl chloride using (i) PCl₅ and (ii) PCl₃.",
    points: ["CH₃CH₂COOH + PCl₅ → CH₃CH₂COCl + POCl₃ + HCl", "3CH₃CH₂COOH + PCl₃ → 3CH₃CH₂COCl + H₃PO₃"],
    modelAnswer: "(i) CH₃CH₂COOH + PCl₅ → CH₃CH₂COCl + POCl₃ + HCl. (ii) 3CH₃CH₂COOH + PCl₃ → 3CH₃CH₂COCl + H₃PO₃.",
    hints: ["PCl₃ reacts with three molecules of acid."],
    explanation: "Each –OH is replaced by –Cl.",
  });
  {
    const c = 0.2;
    const KaI = kaFromPKa(3.18);
    const pHBr = pHWeakAcid(kaFromPKa(2.90), c);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "pKa values of four halogen-substituted ethanoic acids at 298 K (data):\n\n| Acid | Formula | pKa |\n|---|---|---|\n| fluoroethanoic acid | CH₂FCOOH | 2.59 |\n| chloroethanoic acid | CH₂ClCOOH | 2.86 |\n| bromoethanoic acid | CH₂BrCOOH | 2.90 |\n| iodoethanoic acid | CH₂ICOOH | 3.18 |",
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate Ka of iodoethanoic acid, in mol dm⁻³, to three significant figures.", value: KaI, sf: 3, unit: "mol/dm³", explanation: `Ka = 10⁻³·¹⁸ = ${sciStr(KaI, 3)} mol dm⁻³.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the pH of 0.200 mol dm⁻³ bromoethanoic acid, to two decimal places, using [H⁺] = √(Ka c).", value: pHBr, dp: 2, wrong: [dpStr(-Math.log10(c), 2)], explanation: `Ka = 10⁻²·⁹⁰ = ${sciStr(kaFromPKa(2.9), 3)}; [H⁺] = √(${sciStr(kaFromPKa(2.9), 3)} × 0.200) = ${sciStr(Math.sqrt(kaFromPKa(2.9) * c), 3)}; pH = ${dpStr(pHBr, 2)}.` }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain the trend in pKa values from fluoroethanoic acid to iodoethanoic acid.", points: ["pKa increases (the acids become weaker) from F to I", "Electronegativity decreases from F to I, so the halogen withdraws less electron density through the σ bonds (weaker inductive effect)", "so the negative charge of the carboxylate ion is spread less and the anion is less stabilised"], modelAnswer: "The pKa rises from the fluoro to the iodo acid, so the acids get weaker. Fluorine is the most electronegative halogen and withdraws most electron density from the COO⁻ group, spreading its charge and stabilising the anion; down the group electronegativity falls, the electron-withdrawing effect weakens, the anion is less stabilised and the acid dissociates less." }),
        P.mcq({ label: "(d)", marks: 1, stem: "Predict the pKa of difluoroethanoic acid, CHF₂COOH.", options: [
          ["about 1.3", "Correct: two F atoms withdraw more strongly than one (data value about 1.2-1.3)."],
          ["about 2.6", "That is the value for one F atom; a second F lowers the pKa further."],
          ["about 3.5", "This would make it weaker than the monofluoro acid, against the trend."],
          ["about 4.8", "That is ethanoic acid, with no halogen at all."],
        ], answer: "A", explanation: "More electronegative substituents → lower pKa." }),
        P.manual({ label: "(e)", marks: 1, stem: "Suggest how the pKa of 3-chloropropanoic acid compares with that of 2-chloropropanoic acid, giving a reason.", points: ["3-chloro has the higher pKa (weaker acid) because the Cl is further from the COOH group and the inductive effect decreases with distance"], modelAnswer: "3-chloropropanoic acid has the higher pKa: its chlorine is further from the carboxyl group, so its electron-withdrawing effect on the anion is weaker." }),
      ],
      hints: ["Ka = 10⁻ᵖᴷᵃ.", "Compare the electronegativities of the halogens."],
      explanation: `Ka(CH₂ICOOH) = ${sciStr(KaI, 3)}; pH(0.200 M bromoethanoic) = ${dpStr(pHBr, 2)}; electronegativity F > Cl > Br > I explains the trend; CHF₂COOH about 1.3.`,
    });
  }

  {
    const nAcid = molesFromSolution(15, 0.08);
    const v = ((nAcid * 2) / 5 / 0.025) * 1000;
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "Methanoic acid, HCOOH, differs from other carboxylic acids because it can be oxidised. With acidified manganate(VII):\n\n2MnO₄⁻ + 5HCOOH + 6H⁺ → 2Mn²⁺ + 5CO₂ + 8H₂O",
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "Write a simplified equation for the oxidation of methanoic acid using [O].", points: ["HCOOH + [O] → CO₂ + H₂O"], modelAnswer: "HCOOH + [O] → CO₂ + H₂O" }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which reagent distinguishes methanoic acid from ethanoic acid?", options: [
          ["Fehling's solution, warm", "Correct: only methanoic acid gives a red-brown precipitate."],
          ["sodium carbonate solution", "Both acids give carbon dioxide."],
          ["magnesium ribbon, cold", "Both acids give hydrogen."],
          ["blue litmus paper, damp", "Both acids turn it red."],
        ], answer: "A", explanation: "Methanoic acid has an H–C=O unit and is a reducing agent." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the volume, in cm³, of 0.0250 mol dm⁻³ KMnO₄ that reacts with 15.0 cm³ of 0.0800 mol dm⁻³ methanoic acid.", value: v, sf: 3, unit: "cm³", wrong: [((nAcid * 5) / 2 / 0.025) * 1000], explanation: `n(HCOOH) = 0.0150 × 0.0800 = ${sciStr(nAcid, 3)} mol; n(MnO₄⁻) = ${sciStr(nAcid, 3)} × 2/5 = ${sciStr((nAcid * 2) / 5, 3)} mol; V = ${sciStr((nAcid * 2) / 5, 3)} ÷ 0.0250 = ${sfStr(v / 1000, 3)} dm³ = ${sfStr(v, 3)} cm³.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Methanoic acid is a stronger acid than ethanoic acid. Explain why.", points: ["Ethanoic acid has an electron-donating methyl group (positive inductive effect); methanoic acid has only H", "so the ethanoate ion's charge is more concentrated (less stable) than methanoate's, and ethanoic acid dissociates less"], modelAnswer: "The methyl group of ethanoic acid pushes electron density onto the carboxylate group, concentrating the negative charge and destabilising the anion. Methanoate has no alkyl group, so its anion is more stable and methanoic acid is stronger." }),
      ],
      hints: ["Use the 2 : 5 ratio from the equation."],
      explanation: `HCOOH + [O] → CO₂ + H₂O; Fehling's distinguishes; ${sfStr(v, 3)} cm³ of KMnO₄; methyl group weakens ethanoic acid.`,
    });
  }
  b.card("CONCEPT", "Why carboxylic acids are stronger than phenols", "The carboxylate charge is delocalised over two electronegative O atoms, more stabilising than spreading into a ring.");
  b.card("FACT", "Order of acid strength", "ethanol < water < phenol < ethanoic acid < chloroethanoic acids.");
  b.card("CONCEPT", "Effect of Cl on ethanoic acid", "Electron-withdrawing (inductive) Cl spreads the anion's charge: more Cl, nearer COOH → stronger acid, lower pKa.");
  b.card("FACT", "pKa values of chloroethanoic acids (data)", "CH₃COOH 4.76; CH₂ClCOOH 2.86; CHCl₂COOH 1.29; CCl₃COOH 0.65.");
  b.card("FACT", "Benzoic acid from methylbenzene", "Hot alkaline KMnO₄ under reflux (brown MnO₂ forms), then acidify.");
  b.card("FACT", "Making acyl chlorides", "PCl₅ (room temperature), PCl₃ (heat) or SOCl₂ (gaseous SO₂ + HCl by-products).");
  b.card("FACT", "Oxidation of methanoic acid", "HCOOH + [O] → CO₂ + H₂O; positive with Tollens', Fehling's, MnO₄⁻/H⁺, Cr₂O₇²⁻/H⁺.");
  b.card("FORMULA", "Ethanedioic acid with manganate(VII)", "5H₂C₂O₄ + 2MnO₄⁻ + 6H⁺ → 10CO₂ + 2Mn²⁺ + 8H₂O (warm, about 60 °C).");
  b.card("CONCEPT", "Effect of alkyl groups on acid strength", "Alkyl groups donate electron density, destabilising the carboxylate: propanoic acid is weaker than ethanoic acid.");
});
