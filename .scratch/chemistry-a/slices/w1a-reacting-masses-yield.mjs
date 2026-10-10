// W1a: stoich.reacting-masses-yield — reacting masses, gas volumes, limiting reagent, yield, purity (ZIMSEC), ratios.
import { concept, P, t, chk, Mr, moles, massOf, percentYield, percentPurity, VM_RTP, VM_STP, sfStr, ZIM } from "../lib.mjs";

concept("achem.stoich.reacting-masses-yield", { file: "stoich/reacting-masses-yield", keyPrefix: "stoich.reacting-masses-yield" }, (b) => {
  // ---- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What volume does one mole of any gas occupy at room conditions?",
    options: [["24.0 dm³", "Correct: the molar volume at room conditions."], ["22.4 dm³", "This is the molar volume at s.t.p. (273 K, 101 kPa)."], ["24.0 cm³", "The volume is 24.0 dm³, which is 24 000 cm³."], ["1.00 dm³", "One mole of gas occupies far more than 1 dm³."]],
    answer: "A",
    explanation: "Vm = 24.0 dm³ mol⁻¹ at room conditions and 22.4 dm³ mol⁻¹ at s.t.p.",
  });
  {
    const n = moles(0.243, 24.3);
    const v = n * VM_RTP * 1000;
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`What volume of hydrogen, measured at room conditions, is produced when 0.243 g of magnesium reacts with excess dilute hydrochloric acid? (Ar: Mg 24.3)

$\ce{Mg(s) + 2HCl(aq) -> MgCl2(aq) + H2(g)}$`,
      options: [[`${chk(v, 240)} cm³`, "Correct: 0.0100 mol Mg gives 0.0100 mol H₂; × 24 000 cm³."], ["120 cm³", "The ratio Mg : H₂ is 1 : 1, not 2 : 1."], ["480 cm³", "The 2 in front of HCl does not double the hydrogen."], ["224 cm³", "This uses the s.t.p. molar volume, but the gas is at room conditions."]],
      answer: "A",
      explanation: "n(Mg) = 0.243 ÷ 24.3 = 0.0100 mol = n(H₂). V = 0.0100 × 24 000 = 240 cm³.",
    });
  }
  {
    const nN2 = 0.10, nH2 = 0.20;
    const nNH3 = (nH2 * 2) / 3;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A mixture of 0.10 mol of nitrogen and 0.20 mol of hydrogen reacts completely: $\ce{N2 + 3H2 -> 2NH3}$. What is the maximum amount of ammonia formed?`,
      options: [[`${sfStr(nNH3, 2)} mol, with hydrogen limiting`, "Correct: 0.20 mol H₂ needs only 0.067 mol N₂; NH₃ = 0.20 × 2/3."], ["0.20 mol, with nitrogen limiting", "Nitrogen is in excess: 0.10 mol N₂ would need 0.30 mol H₂."], ["0.40 mol, with hydrogen limiting", "The ratio H₂ : NH₃ is 3 : 2, not 1 : 2."], ["0.30 mol, with neither in excess", "The reactants are not in the 1 : 3 ratio, so one is in excess."]],
      answer: "A",
      hints: ["Divide each amount by its coefficient: the smaller result is limiting."],
      explanation: `N₂: 0.10 ÷ 1 = 0.10; H₂: 0.20 ÷ 3 = 0.067. Hydrogen is limiting; n(NH₃) = 0.20 × 2/3 = ${sfStr(nNH3, 2)} mol.`,
    });
  }
  {
    const vCH4 = 50, vO2 = 200;
    const left = vO2 - 2 * vCH4 + vCH4; // O2 remaining + CO2
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: t`50 cm³ of methane is exploded with 200 cm³ of oxygen. What is the total volume of gas after cooling to room temperature? All volumes are measured at room temperature and pressure.

$\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)}$`,
      options: [[`${chk(left, 150)} cm³`, "Correct: 100 cm³ O₂ remains plus 50 cm³ CO₂; water is a liquid."], ["250 cm³", "Gas volumes change during the reaction; this is the starting volume."], ["100 cm³", "This is only the unreacted oxygen; the carbon dioxide is still a gas."], ["50 cm³", "This is only the carbon dioxide; the unreacted oxygen is still present."]],
      answer: "A",
      hints: ["Oxygen used = 2 × 50 cm³.", "Water is liquid at room temperature."],
      explanation: "O₂ used = 100 cm³, so 100 cm³ O₂ remains; CO₂ formed = 50 cm³; water condenses. Total gas = 150 cm³.",
    });
  }
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: t`What volume of oxygen is needed to burn 30 cm³ of ethane completely? All volumes are measured at the same temperature and pressure.

$\ce{2C2H6(g) + 7O2(g) -> 4CO2(g) + 6H2O(l)}$`,
    options: [[`${chk((30 * 7) / 2, 105)} cm³`, "Correct: ratio C₂H₆ : O₂ = 2 : 7."], ["210 cm³", "This uses a 1 : 7 ratio; the equation has 2C₂H₆."], ["60 cm³", "This is the volume of CO₂ formed, not the oxygen needed."], ["90 cm³", "This is the volume of water vapour that would form if it stayed a gas."]],
    answer: "A",
    explanation: "Volume ratios equal mole ratios for gases: 30 × 7/2 = 105 cm³ of O₂.",
  });
  {
    const nM = 0.0300, nHCl = 0.0900;
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: "In an experiment, 0.0300 mol of a metal M reacts exactly with 0.0900 mol of hydrochloric acid, producing hydrogen. What is the formula of the chloride formed?",
      options: [[t`$\ce{MCl3}$`, `Correct: M : HCl = 1 : ${nHCl / nM}, so each M atom uses three Cl.`], [t`$\ce{MCl2}$`, "This would need a 1 : 2 ratio."], [t`$\ce{M3Cl}$`, "The ratio is the other way round: more HCl than metal."], [t`$\ce{MCl}$`, "This would need a 1 : 1 ratio."]],
      answer: "A",
      hints: ["Divide the larger amount by the smaller."],
      explanation: "0.0900 ÷ 0.0300 = 3: 2M + 6HCl → 2MCl₃ + 3H₂ (as for aluminium).",
    });
    chk(nHCl / nM, 3, 1e-9);
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Statements about a reaction with a percentage yield of 75%:\n\n1. The reaction may be reversible, so it does not go to completion.\n2. Some product may have been lost during filtration or transfer.\n3. Side reactions may have formed other products.\n\nWhich of the statements could explain the yield?",
    options: [["1, 2 and 3", "Correct: all three are standard reasons for a yield below 100%."], ["1 and 2 only", "Side reactions (3) also reduce the yield of the wanted product."], ["2 and 3 only", "A reversible reaction (1) also limits the yield."], ["1 only", "Losses during handling (2) and side reactions (3) also apply."]],
    answer: "A",
    explanation: "Yield falls below 100% because of incomplete or reversible reactions, side reactions and mechanical losses.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Statements about gases at the same temperature and pressure:\n\n1. Equal volumes of hydrogen and carbon dioxide contain equal numbers of molecules.\n2. One mole of nitrogen occupies 22.4 dm³ at 273 K and 101 kPa.\n3. Equal volumes of hydrogen and carbon dioxide have equal masses.\n\nWhich of the statements are correct?",
    options: [["1 only", "Statement 2 is also correct: 22.4 dm³ mol⁻¹ at s.t.p."], ["1, 2 and 3", "Statement 3 is wrong: CO₂ molecules are 22 times heavier than H₂ molecules."], ["2 and 3 only", "Statement 3 is wrong; statement 1 is correct."], ["1 and 2 only", "Correct: equal volumes contain equal numbers of molecules, but their masses depend on Mr."]],
    answer: "D",
    hints: ["Equal numbers of molecules does not mean equal mass."],
    explanation: "Avogadro's law: equal volumes, equal numbers of molecules (1). Vm at s.t.p. = 22.4 dm³ mol⁻¹ (2). Masses differ because Mr differs (3 is wrong).",
  });

  // ---- numerical / calculation
  {
    const nFe2O3 = moles(80.0, Mr("Fe2O3"));
    const m = massOf(nFe2O3 * 2, 55.8);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Iron is extracted from haematite in a blast furnace: $\ce{Fe2O3(s) + 3CO(g) -> 2Fe(l) + 3CO2(g)}$. Calculate the maximum mass, in g, of iron obtained from 80.0 g of iron(III) oxide. (Ar: O 16.0, Fe 55.8) Give your answer to three significant figures.`,
      value: m, unit: "g", wrong: [m / 2],
      hints: ["One mole of Fe₂O₃ gives two moles of Fe."],
      explanation: `1. Mr(Fe₂O₃) = 2(55.8) + 3(16.0) = ${Mr("Fe2O3")}.\n2. n(Fe₂O₃) = 80.0 ÷ ${Mr("Fe2O3")} = ${sfStr(nFe2O3, 4)} mol.\n3. n(Fe) = 2 × ${sfStr(nFe2O3, 4)} = ${sfStr(2 * nFe2O3, 4)} mol.\n4. Mass = ${sfStr(2 * nFe2O3, 4)} × 55.8 = ${sfStr(m, 3)} g. (Forgetting the 1 : 2 ratio gives ${sfStr(m / 2, 3)} g.)`,
    });
  }
  {
    const theo = massOf(moles(6.00, Mr("CH3COOH")), Mr("CH3COOC2H5"));
    const y = percentYield(6.30, theo);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Farai heats 6.00 g of ethanoic acid with excess ethanol and an acid catalyst and obtains 6.30 g of ethyl ethanoate. Calculate the percentage yield. (Mr: $\ce{CH3COOH}$ 60.0, $\ce{CH3COOC2H5}$ 88.0)

$\ce{CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O}$`,
      value: y, unit: "%", wrong: [(6.30 / 6.00) * 100],
      hints: ["Find the theoretical mass of ester from the acid first."],
      explanation: `1. n(acid) = 6.00 ÷ 60.0 = 0.100 mol.\n2. Ratio 1 : 1, so maximum ester = 0.100 mol × 88.0 = ${sfStr(theo, 3)} g.\n3. Yield = 6.30 ÷ ${sfStr(theo, 3)} × 100 = ${sfStr(y, 3)}%. (Dividing the ester mass by the acid mass, ${sfStr((6.3 / 6) * 100, 3)}%, ignores the different molar masses.)`,
    });
  }
  {
    const nNH3 = 0.672 / VM_RTP;
    const mPure = massOf(nNH3 / 2, Mr("(NH4)2SO4"));
    const purity = percentPurity(mPure, 2.00);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true, applies: ZIM,
      stem: t`A 2.00 g sample of ammonium sulfate fertiliser is warmed with excess aqueous sodium hydroxide. All the ammonia given off is collected: 0.672 dm³ at room conditions. Calculate the percentage purity of the fertiliser. (Mr of $\ce{(NH4)2SO4}$ = 132.1; molar volume 24.0 dm³ mol⁻¹)

$\ce{(NH4)2SO4 + 2NaOH -> Na2SO4 + 2NH3 + 2H2O}$`,
      value: purity, unit: "%", wrong: [percentPurity(massOf(nNH3, Mr("(NH4)2SO4")), 2.00)],
      hints: ["Two moles of NH₃ come from one mole of ammonium sulfate."],
      explanation: `1. n(NH₃) = 0.672 ÷ 24.0 = ${sfStr(nNH3, 3)} mol.\n2. n((NH₄)₂SO₄) = ${sfStr(nNH3, 3)} ÷ 2 = ${sfStr(nNH3 / 2, 3)} mol.\n3. Mass = ${sfStr(nNH3 / 2, 3)} × 132.1 = ${sfStr(mPure, 4)} g.\n4. Purity = ${sfStr(mPure, 4)} ÷ 2.00 × 100 = ${sfStr(purity, 3)}%. (Ignoring the 1 : 2 ratio gives a value above 100%, which is impossible.)`,
    });
  }
  {
    const nKClO3 = moles(3.06, Mr("KClO3"));
    const v = nKClO3 * 1.5 * VM_STP;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Potassium chlorate(V) decomposes on heating with a catalyst: $\ce{2KClO3(s) -> 2KCl(s) + 3O2(g)}$. Calculate the volume of oxygen, in dm³ **at s.t.p.**, from 3.06 g of $\ce{KClO3}$. (Mr of $\ce{KClO3}$ = 122.6; molar volume at s.t.p. 22.4 dm³ mol⁻¹)`,
      value: v, unit: "dm³", wrong: [nKClO3 * 1.5 * VM_RTP, nKClO3 * VM_STP],
      hints: ["Ratio KClO₃ : O₂ = 2 : 3."],
      explanation: `n(KClO₃) = 3.06 ÷ 122.6 = ${sfStr(nKClO3, 3)} mol; n(O₂) = × 3/2 = ${sfStr(nKClO3 * 1.5, 3)} mol; V = × 22.4 = ${sfStr(v, 3)} dm³. Using 24.0 dm³ mol⁻¹ (room conditions) gives ${sfStr(nKClO3 * 1.5 * VM_RTP, 3)} dm³.`,
    });
  }
  {
    const nH2 = moles(2.00, Mr("H2")), nO2 = moles(8.00, Mr("O2"));
    const mW = massOf(Math.min(nH2 / 2, nO2) * 2, Mr("H2O"));
    b.num({
      d: 3, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`2.00 g of hydrogen is ignited with 8.00 g of oxygen: $\ce{2H2(g) + O2(g) -> 2H2O(l)}$. What mass of water, in g, forms? (Ar: H 1.0, O 16.0)`,
      value: chk(mW, 9.0, 1e-9), unit: "g", wrong: [18.0, 10.0],
      hints: ["Find the limiting reagent first."],
      explanation: "n(H₂) = 1.00 mol needs 0.500 mol O₂, but only 0.250 mol O₂ is present: oxygen is limiting. n(H₂O) = 2 × 0.250 = 0.500 mol = 9.00 g. (18.0 g assumes hydrogen limits; 10.0 g just adds the masses.)",
    });
  }
  // ---- true/false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The amount of product formed in a reaction is decided by the reactant that is present in the larger number of moles.",
    answer: false,
    explanation: "False. The limiting reagent decides the amount of product, after taking the mole ratio into account; it may be the reactant present in the smaller amount or not, depending on the coefficients.",
  });
  // ---- matching
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each quantity of gas at room conditions (Vm = 24.0 dm³ mol⁻¹) with its amount.",
    pairs: [["48.0 dm³", `${chk(48 / 24, 2)}.00 mol`], ["600 cm³", `${chk(0.6 / 24, 0.025)}0 mol`], ["6.00 dm³", `${chk(6 / 24, 0.25)}0 mol`], ["120 cm³", `${chk(0.12 / 24, 0.005)}00 mol`]],
    explanation: "n = V ÷ 24.0 with V in dm³: 48.0 → 2.00; 0.600 → 0.0250; 6.00 → 0.250; 0.120 → 0.00500 mol.",
  });
  // ---- fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about a gas-volume experiment.",
    template: "When a hydrocarbon is exploded with excess oxygen and cooled to room temperature, the water formed is a {{blank:a}}. Passing the remaining gas through aqueous sodium hydroxide removes the {{blank:b}}, and the gas left is unreacted {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["liquid"], choices: ["liquid", "gas", "solid"] },
      { id: "b", accepted: ["carbon dioxide"], choices: ["carbon dioxide", "oxygen", "water vapour", "hydrogen"] },
      { id: "c", accepted: ["oxygen"], choices: ["oxygen", "carbon dioxide", "hydrocarbon", "nitrogen"] },
    ],
    explanation: "Water condenses; NaOH(aq) absorbs the acidic CO₂; the excess oxygen remains.",
  });
  // ---- short
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the reactant that is completely used up in a reaction and so limits the amount of product.",
    accepted: ["limiting reagent", "limiting reactant", "the limiting reagent", "the limiting reactant"],
    wrong: ["excess reagent"],
    explanation: "The limiting reagent (reactant) is used up first.",
  });
  // ---- self-marked
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Tatenda calculates a percentage yield of 108% for a crystalline salt she prepared. Suggest three reasons why her value is above 100%.",
    points: ["The crystals were still wet / not fully dried (water adds mass)", "Impurities (e.g. unreacted starting material or another salt) remained in the product", "An error in weighing or in the calculation, e.g. using the anhydrous Mr for a hydrated salt"],
    modelAnswer: "The crystals may not have been dried properly, so water added to their mass; they may contain impurities such as unreacted reagent; or she may have used the wrong Mr, for example the anhydrous formula for a hydrated salt, giving too small a theoretical yield.",
    hints: ["What could add extra mass to the product?"],
    explanation: "A yield above 100% means extra mass or a wrong theoretical value.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why, in an excess-oxygen explosion experiment, measuring the contraction on adding aqueous sodium hydroxide gives the volume of carbon dioxide formed.",
    points: ["Sodium hydroxide is an alkali that absorbs / reacts with acidic CO₂ (2NaOH + CO₂ → Na₂CO₃ + H₂O)", "Oxygen does not react with it, so the decrease in volume equals the CO₂ volume"],
    modelAnswer: "Carbon dioxide is acidic and reacts with aqueous sodium hydroxide, forming sodium carbonate, so it is removed from the gas. Oxygen does not react, so the fall in volume is the volume of carbon dioxide.",
    hints: ["Which of the gases is acidic?"],
    explanation: "Only CO₂ is absorbed.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2, applies: ZIM,
    stem: "Define *percentage purity* and state one reason why it matters to a company buying limestone to make lime.",
    points: ["Mass of pure substance ÷ total mass of sample × 100", "Impurities reduce the amount of product per tonne / affect quality or cost of the product"],
    modelAnswer: "Percentage purity = (mass of pure calcium carbonate in the sample ÷ mass of sample) × 100. Impure limestone gives less lime per tonne and may contaminate the product, so the buyer pays for material that does not react.",
    explanation: "Definition plus one valid reason.",
  });
  // ---- practice structured
  {
    const vH = 10, vO2 = 80, after = 65, afterKOH = 25;
    const vCO2 = after - afterKOH, used = vO2 - afterKOH;
    const x = vCO2 / vH, y = 4 * (used / vH - x);
    chk(x, 4); chk(y, 6);
    b.struct({
      d: 4, skill: "ANALYSIS",
      stem: `10 cm³ of a gaseous hydrocarbon CₓHᵧ is exploded with ${vO2} cm³ of oxygen (an excess). After cooling to room temperature the volume of gas is ${after} cm³. This decreases to ${afterKOH} cm³ when the gas is shaken with aqueous potassium hydroxide. All volumes are measured at room temperature and pressure.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "What volume of carbon dioxide, in cm³, was formed?", value: vCO2, unit: "cm³", wrong: [after], explanation: `${after} − ${afterKOH} = ${vCO2} cm³ absorbed by KOH.` }),
        P.num({ label: "(b)", marks: 1, stem: "What volume of oxygen, in cm³, reacted?", value: used, unit: "cm³", wrong: [afterKOH], explanation: `${vO2} − ${afterKOH} = ${used} cm³.` }),
        P.num({ label: "(c)", marks: 1, stem: "Deduce x.", value: x, wrong: [x * 10], explanation: `${vCO2} ÷ ${vH} = ${x}.` }),
        P.num({ label: "(d)", marks: 2, stem: "Deduce y, using x + y/4 = (volume of O₂ reacted) ÷ (volume of hydrocarbon).", value: y, wrong: [y / 2], explanation: `${used} ÷ ${vH} = 5.5 = ${x} + y/4, so y/4 = 1.5 and y = ${y}.` }),
        P.manual({ label: "(e)", marks: 1, stem: "Write the balanced equation for the complete combustion of the hydrocarbon.", points: ["2C₄H₆ + 11O₂ → 8CO₂ + 6H₂O (or C₄H₆ + 5½O₂ → 4CO₂ + 3H₂O)"], modelAnswer: "2C₄H₆ + 11O₂ → 8CO₂ + 6H₂O" }),
      ],
      hints: ["KOH absorbs CO₂; the gas left is excess O₂.", "Volume ratios = mole ratios."],
      explanation: `CO₂ ${vCO2} cm³ → x = ${x}; O₂ used ${used} cm³ → y = ${y}; the hydrocarbon is C₄H₆.`,
      calculator: true,
    });
  }
  {
    const nMg = moles(0.486, 24.3);
    const theo = massOf(nMg, Mr("MgO"));
    const y = percentYield(0.742, theo);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "Rudo heats 0.486 g of magnesium ribbon in a crucible with a lid, lifting the lid from time to time. She obtains 0.742 g of magnesium oxide. (Ar: O 16.0, Mg 24.3)",
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "Write the balanced equation, with state symbols, for the reaction.", points: ["2Mg(s) + O₂(g) → 2MgO(s)"], modelAnswer: "2Mg(s) + O₂(g) → 2MgO(s)" }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the amount, in mol, of magnesium used.", value: nMg, unit: "mol", wrong: [0.486 * 24.3], explanation: `0.486 ÷ 24.3 = ${sfStr(nMg, 3)} mol.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the maximum mass, in g, of magnesium oxide that could form.", value: theo, unit: "g", wrong: [nMg * 16.0], explanation: `n(MgO) = n(Mg) = ${sfStr(nMg, 3)} mol; × 40.3 = ${sfStr(theo, 3)} g.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the percentage yield.", value: y, unit: "%", wrong: [(0.486 / 0.742) * 100], explanation: `0.742 ÷ ${sfStr(theo, 3)} × 100 = ${sfStr(y, 3)}%.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest two reasons why the yield is less than 100%.", points: ["Some magnesium oxide smoke escaped when the lid was lifted", "Not all the magnesium reacted / some magnesium reacted with nitrogen to form magnesium nitride"], modelAnswer: "White magnesium oxide smoke escaped when the lid was lifted, and some magnesium may not have burned completely or may have formed magnesium nitride with nitrogen from the air." }),
        P.manual({ label: "(f)", marks: 1, stem: "Explain why the lid must be lifted from time to time.", points: ["To let in air / oxygen so that the magnesium can keep burning"], modelAnswer: "To let oxygen in so the magnesium can continue to react." }),
      ],
      hints: ["Ratio Mg : MgO = 1 : 1."],
      explanation: `Theoretical ${sfStr(theo, 3)} g; yield ${sfStr(y, 3)}%.`,
    });
  }

  // ---- flashcards
  b.card("FORMULA", "Moles of gas from volume?", "n = V ÷ Vm; Vm = 24.0 dm³ mol⁻¹ (room conditions) or 22.4 dm³ mol⁻¹ (s.t.p., 273 K, 101 kPa).");
  b.card("DEFINITION", "Define **limiting reagent**.", "The reactant completely used up first; it determines the maximum amount of product.");
  b.card("FORMULA", "Percentage yield?", "(actual mass of product ÷ theoretical maximum mass) × 100");
  b.card("FORMULA", "Percentage purity?", "(mass of pure substance ÷ total mass of sample) × 100", undefined, { applies: ZIM });
  b.card("CONCEPT", "Avogadro's law?", "Equal volumes of gases at the same temperature and pressure contain equal numbers of molecules, so gas volume ratios = mole ratios.");
  b.card("CONCEPT", "In an explosion experiment, what does aqueous NaOH or KOH absorb?", "Carbon dioxide (an acidic gas). The contraction equals the volume of CO₂.");
  b.card("CONCEPT", "Why is a percentage yield below 100%?", "Reversible or incomplete reaction, side reactions, losses during transfer, filtration or purification.");
  b.card("FORMULA", "Combustion of CₓHᵧ?", "CₓHᵧ + (x + y/4)O₂ → xCO₂ + (y/2)H₂O");
});
