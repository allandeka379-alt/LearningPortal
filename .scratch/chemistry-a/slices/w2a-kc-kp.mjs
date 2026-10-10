// W2a: achem.equilibria.kc-kp (both boards; ZIMSEC Form 5, Cambridge AS Level)
import { concept, P, t, ce, ice, kEq, partialPressures, sfStr, dpStr, sciStr, chk, titre } from "../lib.mjs";

concept("achem.equilibria.kc-kp", { file: "equilibria/kc-kp", keyPrefix: "equilibria.kc-kp" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: t`Which is the correct expression for $K_\text{c}$ for $\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$?`,
    options: [
      [t`$\dfrac{[\ce{SO3}]^2}{[\ce{SO2}]^2[\ce{O2}]}$`, "Correct: products over reactants, each raised to the power of its coefficient."],
      [t`$\dfrac{[\ce{SO2}]^2[\ce{O2}]}{[\ce{SO3}]^2}$`, "This is upside down: it is the constant for the reverse reaction."],
      [t`$\dfrac{2[\ce{SO3}]}{2[\ce{SO2}][\ce{O2}]}$`, "Coefficients are powers, not multipliers."],
      [t`$\dfrac{[\ce{SO3}]^2}{[\ce{SO2}]^2 + [\ce{O2}]}$`, "Concentration terms are multiplied, never added."],
    ],
    answer: "A",
    explanation: "Kc = [SO₃]² / ([SO₂]²[O₂]): products on top, reactants below, coefficients as powers.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`What are the units of $K_\text{c}$ for $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$?`,
    options: [
      [t`$\text{dm}^6\,\text{mol}^{-2}$`, "Correct: (mol dm⁻³)² ÷ (mol dm⁻³)⁴ = (mol dm⁻³)⁻² = dm⁶ mol⁻²."],
      [t`$\text{mol}^2\,\text{dm}^{-6}$`, "This is the inverse: the reactant terms are on the bottom."],
      [t`$\text{dm}^3\,\text{mol}^{-1}$`, "That would be the unit if there were one more concentration term below than above; here there are two more."],
      ["no units", "The units cancel only when the powers on top and bottom add up to the same number."],
    ],
    answer: "A",
    explanation: "Top: (mol dm⁻³)²; bottom: (mol dm⁻³)¹ × (mol dm⁻³)³ = (mol dm⁻³)⁴. Overall (mol dm⁻³)⁻² = dm⁶ mol⁻².",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "At 298 K, the equilibrium constant for a reaction is 4.5 × 10¹⁵. What does this value show?",
    options: [
      ["The equilibrium lies far to the right, so the mixture is mostly products.", "Correct: a very large K means product concentrations far exceed reactant concentrations."],
      ["The reaction reaches equilibrium very quickly at 298 K.", "K says nothing about rate; that depends on the activation energy."],
      ["The equilibrium lies far to the left, so the mixture is mostly reactants.", "That would need K much smaller than 1."],
      ["The forward reaction must be strongly exothermic at all temperatures.", "The sign of ΔH cannot be deduced from one value of K."],
    ],
    answer: "A",
    explanation: "K ≫ 1 means the equilibrium position lies well to the right. It gives no information about how fast equilibrium is reached.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: t`For $\ce{H2(g) + I2(g) <=> 2HI(g)}$, $K_\text{c}$ = 49.0 at a certain temperature. What is the value of $K_\text{c}$ for $\ce{HI(g) <=> 1/2H2(g) + 1/2I2(g)}$ at the same temperature?`,
    options: [
      [`${sfStr(1 / Math.sqrt(49), 3)}`, "Correct: reversing gives 1/49.0; halving the coefficients takes the square root: 1/7.00 = 0.143."],
      [`${sfStr(1 / 49, 3)}`, "This reverses the equation but forgets that the coefficients were halved."],
      [`${sfStr(Math.sqrt(49), 3)}`, "This halves the coefficients but forgets that the equation was reversed."],
      [`${sfStr(49 / 2, 3)}`, "Halving coefficients changes K by a power, not by dividing by 2."],
    ],
    answer: "A",
    hints: ["Reversing an equation inverts K; halving all coefficients takes the square root."],
    explanation: `New K = (1/49.0)^½ = ${sfStr(1 / Math.sqrt(49), 3)}.`,
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A gas mixture at equilibrium contains 2.0 mol of nitrogen, 6.0 mol of hydrogen and 2.0 mol of ammonia. Which statements are correct?\n\n1. The mole fraction of ammonia is 0.20.\n2. The partial pressure of hydrogen is 60% of the total pressure.\n3. The sum of the mole fractions is 1.",
    options: [
      ["1, 2 and 3", "Correct: x(NH₃) = 2.0/10.0 = 0.20; x(H₂) = 0.60, so p(H₂) = 0.60 × total; mole fractions always add up to 1."],
      ["1 and 2 only", "Statement 3 is also true: the mole fractions of all components add up to 1."],
      ["2 and 3 only", "Statement 1 is also true: 2.0 ÷ 10.0 = 0.20."],
      ["1 only", "Statements 2 and 3 are true as well."],
    ],
    answer: "A",
    hints: ["Total amount of gas = 10.0 mol."],
    explanation: "Total = 10.0 mol. x(NH₃) = 0.20, x(H₂) = 0.60, x(N₂) = 0.20 (sum 1). Partial pressure = mole fraction × total pressure.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: t`For the exothermic equilibrium $\ce{2NO2(g) <=> N2O4(g)}$, which statements are correct?\n\n1. Increasing the temperature decreases the value of $K_\text{p}$.\n2. Increasing the total pressure increases the value of $K_\text{p}$.\n3. $K_\text{p}$ has units of kPa⁻¹ when pressures are measured in kPa.`,
    options: [
      ["1 and 3 only", "Correct: K falls with temperature for an exothermic reaction; pressure does not change K; units kPa ÷ kPa² = kPa⁻¹."],
      ["1, 2 and 3", "Statement 2 is false: pressure moves the position, but K stays the same at constant temperature."],
      ["2 and 3 only", "Statement 2 is false and statement 1 is true."],
      ["1 only", "Statement 3 is also true: p(N₂O₄)/p(NO₂)² has units kPa⁻¹."],
    ],
    answer: "A",
    hints: ["Which variable is the only one that changes K?"],
    explanation: "Kp = p(N₂O₄)/p(NO₂)², units kPa⁻¹. Only temperature changes K, and for an exothermic forward reaction K decreases as temperature rises.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`Ethanoic acid and ethanol react: $\ce{CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O}$. Starting with 1.0 mol of each, the equilibrium mixture contains $\tfrac{2}{3}$ mol of ethyl ethanoate. More ethanol is then added at the same temperature. Which statement is correct when equilibrium is re-established?`,
    options: [
      ["The amount of ester increases and Kc is unchanged.", "Correct: adding a reactant moves the position right; K depends only on temperature."],
      ["The amount of ester increases and Kc increases.", "The position moves, but the value of Kc is fixed at constant temperature."],
      ["The amount of ester is unchanged because Kc is constant.", "The concentrations change so that the ratio returns to the same Kc; the ester amount rises."],
      ["The amount of ester decreases and Kc decreases.", "Adding a reactant cannot move the position to the left."],
    ],
    answer: "A",
    hints: ["What happens to the ratio [products]/[reactants] immediately after adding ethanol?"],
    explanation: "Immediately after adding ethanol the ratio is smaller than Kc, so the forward reaction proceeds until the ratio again equals Kc: more ester, same Kc.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`For $\ce{A(g) + B(g) <=> 2C(g)}$ the equilibrium concentrations are $[\ce{A}]$ = 0.20, $[\ce{B}]$ = 0.40 and $[\ce{C}]$ = 0.80 mol dm⁻³. What is the value of $K_\text{c}$?`,
    options: [
      ["8.0", "Correct: 0.80² ÷ (0.20 × 0.40) = 0.64 ÷ 0.080 = 8.0."],
      ["10", "This forgets to square [C]: 0.80 ÷ 0.080."],
      ["32", "This uses (2 × 0.80)²: the coefficient is a power, not a multiplier."],
      ["0.125", "This is the expression upside down (reactants over products)."],
    ],
    answer: "A",
    hints: ["Kc = [C]²/([A][B])."],
    explanation: "Kc = [C]²/([A][B]) = 0.64/0.080 = 8.0, with no units (two terms above, two below).",
  });
  {
    const H2 = 0.0021, I2 = 0.0035, HI = 0.019;
    const K = kEq([[2, HI]], [[1, H2], [1, I2]]);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`At 700 K the equilibrium concentrations for $\ce{H2(g) + I2(g) <=> 2HI(g)}$ are: $[\ce{H2}]$ = 0.00210, $[\ce{I2}]$ = 0.00350 and $[\ce{HI}]$ = 0.0190 mol dm⁻³. Calculate $K_\text{c}$ to three significant figures.`,
      value: K, sf: 3,
      wrong: [sfStr(HI / (H2 * I2), 3)],
      explanation: `Kc = [HI]²/([H₂][I₂]) = 0.0190² ÷ (0.00210 × 0.00350) = ${sfStr(K, 3)} (no units). Forgetting to square [HI] gives ${sfStr(HI / (H2 * I2), 3)}.`,
    });
  }
  {
    const eq = ice({ acid: 1.0, alc: 1.5, ester: 0, water: 0 }, { acid: -1, alc: -1, ester: 1, water: 1 }, "ester", 0.78);
    const K = kEq([[1, eq.ester], [1, eq.water]], [[1, eq.acid], [1, eq.alc]]);
    const wrongK = kEq([[1, 0.78], [1, 0.78]], [[1, 1.0], [1, 1.5]]);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`1.00 mol of ethanoic acid and 1.50 mol of ethanol were mixed with a little acid catalyst and left at constant temperature. At equilibrium the mixture contained 0.780 mol of ethyl ethanoate. Calculate $K_\text{c}$ for $\ce{CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O}$ to three significant figures.`,
      value: K, sf: 3,
      wrong: [sfStr(wrongK, 3)],
      hints: ["Use an initial–change–equilibrium table.", "The volume cancels."],
      explanation: `1. Equilibrium amounts: acid ${dpStr(eq.acid, 3)} mol, ethanol ${dpStr(eq.alc, 3)} mol, ester 0.780 mol, water 0.780 mol.\n2. The volume cancels (two terms above and two below).\n3. Kc = (0.780 × 0.780) ÷ (${dpStr(eq.acid, 3)} × ${dpStr(eq.alc, 3)}) = ${sfStr(K, 3)}.\n4. Using the initial amounts of acid and ethanol in the denominator gives ${sfStr(wrongK, 3)}, which is wrong.`,
    });
  }
  {
    const n = ice({ SO2: 0.4, O2: 0.3, SO3: 0 }, { SO2: -2, O2: -1, SO3: 2 }, "SO3", 0.3);
    const c = Object.fromEntries(Object.entries(n).map(([k, v]) => [k, v / 2]));
    const K = kEq([[2, c.SO3]], [[2, c.SO2], [1, c.O2]]);
    const Kmol = kEq([[2, n.SO3]], [[2, n.SO2], [1, n.O2]]);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`0.400 mol of sulfur dioxide and 0.300 mol of oxygen were sealed in a 2.00 dm³ vessel and heated: $\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$. At equilibrium the vessel contained 0.300 mol of sulfur trioxide. Calculate $K_\text{c}$, in dm³ mol⁻¹, to three significant figures.`,
      value: K, sf: 3, unit: "dm³/mol",
      wrong: [sfStr(Kmol, 3)],
      hints: ["Use the 2 : 1 : 2 mole ratio for the change.", "Divide every amount by 2.00 dm³."],
      explanation: `1. SO₃ formed = 0.300 mol, so SO₂ used = 0.300 mol and O₂ used = 0.150 mol.\n2. Equilibrium: SO₂ ${dpStr(n.SO2, 3)} mol, O₂ ${dpStr(n.O2, 3)} mol, SO₃ ${dpStr(n.SO3, 3)} mol.\n3. Concentrations (÷ 2.00 dm³): [SO₂] = ${dpStr(c.SO2, 4)}, [O₂] = ${dpStr(c.O2, 4)}, [SO₃] = ${dpStr(c.SO3, 4)} mol dm⁻³.\n4. Kc = ${dpStr(c.SO3, 4)}² ÷ (${dpStr(c.SO2, 4)}² × ${dpStr(c.O2, 4)}) = ${sfStr(K, 3)} dm³ mol⁻¹.\n5. Using amounts instead of concentrations gives ${sfStr(Kmol, 3)}: the volume does not cancel here.`,
    });
  }
  {
    const x = 1.8 / 7.5;
    const p = x * 250;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: "A mixture of gases at a total pressure of 250 kPa contains 1.80 mol of carbon dioxide in a total of 7.50 mol of gas. Calculate the partial pressure of carbon dioxide, in kPa, to three significant figures.",
      value: p, sf: 3, unit: "kPa",
      wrong: [sfStr(250 / 1.8, 3)],
      explanation: `Mole fraction = 1.80 ÷ 7.50 = ${sfStr(x, 3)}; partial pressure = ${sfStr(x, 3)} × 250 = ${sfStr(p, 3)} kPa.`,
    });
  }
  {
    const pp = partialPressures({ N2: 0.6, H2: 1.8, NH3: 0.4 }, 2.0e4);
    const Kp = kEq([[2, pp.NH3.p]], [[1, pp.N2.p], [3, pp.H2.p]]);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`An equilibrium mixture for $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$ contains 0.600 mol of nitrogen, 1.80 mol of hydrogen and 0.400 mol of ammonia at a total pressure of 2.00 × 10⁴ kPa. Calculate $K_\text{p}$, in kPa⁻², to three significant figures.`,
      value: Kp, sf: 3, unit: "kPa⁻²",
      wrong: [sfStr(kEq([[2, pp.NH3.x]], [[1, pp.N2.x], [3, pp.H2.x]]), 3)],
      hints: ["Find the total amount of gas, then each mole fraction.", "Partial pressure = mole fraction × total pressure."],
      explanation: `1. Total amount = 0.600 + 1.80 + 0.400 = 2.80 mol.\n2. Mole fractions: N₂ ${sfStr(pp.N2.x, 3)}, H₂ ${sfStr(pp.H2.x, 3)}, NH₃ ${sfStr(pp.NH3.x, 3)}.\n3. Partial pressures: N₂ ${sfStr(pp.N2.p, 3)} kPa, H₂ ${sfStr(pp.H2.p, 3)} kPa, NH₃ ${sfStr(pp.NH3.p, 3)} kPa.\n4. Kp = p(NH₃)² ÷ (p(N₂) × p(H₂)³) = ${sciStr(Kp, 3)} kPa⁻².\n5. Substituting mole fractions instead of partial pressures gives a value without the factor of pressure, which is wrong.`,
    });
  }
  {
    const K = 46.0, H2 = 0.004, I2 = 0.004;
    const HI = Math.sqrt(K * H2 * I2);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`At a certain temperature $K_\text{c}$ = 46.0 for $\ce{H2(g) + I2(g) <=> 2HI(g)}$. An equilibrium mixture contains hydrogen and iodine each at 0.00400 mol dm⁻³. Calculate the equilibrium concentration of hydrogen iodide, in mol dm⁻³, to three significant figures.`,
      value: HI, sf: 3, unit: "mol/dm³",
      wrong: [sfStr(K * H2 * I2, 3)],
      hints: ["Rearrange Kc = [HI]²/([H₂][I₂]) for [HI]."],
      explanation: `1. [HI]² = Kc × [H₂] × [I₂] = 46.0 × 0.00400 × 0.00400 = ${sfStr(K * H2 * I2, 3)}.\n2. [HI] = √${sfStr(K * H2 * I2, 3)} = ${sfStr(HI, 3)} mol dm⁻³.\n3. Forgetting the square root leaves ${sfStr(K * H2 * I2, 3)}, the value of [HI]².`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Adding more of a reactant to an equilibrium mixture at constant temperature increases the value of Kc.",
    answer: false,
    explanation: "False. The position moves to the right, but Kc stays the same; only temperature changes it.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: t`Give the units of $K_\text{c}$ for $\ce{PCl3(g) + Cl2(g) <=> PCl5(g)}$.`,
    accepted: ["dm3 mol-1", "dm³ mol⁻¹", "dm^3 mol^-1", "dm3/mol", "dm³/mol", "mol-1 dm3", "mol⁻¹ dm³", "mol^-1 dm^3", "(mol dm-3)-1", "dm3mol-1"],
    normalise: ["trim", "lowercase", "collapse_whitespace"],
    wrong: ["mol dm-3"],
    hints: ["One concentration term on top, two below."],
    explanation: "Kc = [PCl₅]/([PCl₃][Cl₂]); units (mol dm⁻³) ÷ (mol dm⁻³)² = dm³ mol⁻¹.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each equilibrium with the units of its Kc.",
    pairs: [
      [t`$\ce{2NO2(g) <=> N2O4(g)}$`, "dm³ mol⁻¹"],
      [t`$\ce{N2O4(g) <=> 2NO2(g)}$`, "mol dm⁻³"],
      [t`$\ce{H2(g) + Br2(g) <=> 2HBr(g)}$`, "no units"],
      [t`$\ce{CO(g) + 2H2(g) <=> CH3OH(g)}$`, "dm⁶ mol⁻²"],
    ],
    hints: ["Count the powers above and below the line."],
    explanation: "Units = (mol dm⁻³)^(Δn), where Δn = sum of product powers − sum of reactant powers: −1, +1, 0 and −2.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: t`Explain why the volume of the container is not needed to calculate $K_\text{c}$ for $\ce{H2(g) + I2(g) <=> 2HI(g)}$ but is needed for $\ce{PCl5(g) <=> PCl3(g) + Cl2(g)}$.`,
    points: ["For the HI equilibrium the powers above and below add to the same number (2 and 2), so V cancels", "For the PCl₅ equilibrium there are two terms above and one below, so one factor of 1/V remains"],
    modelAnswer: "Each concentration is n/V. In Kc = [HI]²/([H₂][I₂]) there is V² above and below, so it cancels and amounts can be used. In Kc = [PCl₃][Cl₂]/[PCl₅] there is V² below the line and V above, so 1/V remains and the volume must be used.",
    hints: ["Write each concentration as n/V."],
    explanation: "Volume cancels only when the total powers above and below are equal.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`For $\ce{N2(g) + O2(g) <=> 2NO(g)}$, ΔH = +181 kJ mol⁻¹. Kc is very small at 298 K but much larger at 2000 K, inside a hot car engine. Explain this change.`,
    points: ["The forward reaction is endothermic", "Raising the temperature moves the position of equilibrium in the endothermic direction, to the right", "so the ratio [NO]²/([N₂][O₂]) at equilibrium is larger: Kc increases"],
    modelAnswer: "The forward reaction is endothermic. At a higher temperature the position of equilibrium moves in the endothermic direction, towards nitrogen monoxide, so the equilibrium concentration of NO is larger compared with N₂ and O₂ and the value of Kc increases.",
    hints: ["Link the sign of ΔH to the direction favoured by heating."],
    explanation: "For an endothermic forward reaction K increases with temperature.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 2,
    stem: "A student says: \"Kc for a reaction is 1.0 × 10⁻³⁰ at 298 K, so the reaction will never be useful for making the product.\" Discuss whether this is justified.",
    points: ["At 298 K the equilibrium lies far to the left, so almost no product is present at equilibrium", "but K depends on temperature (and the product could be removed continuously), so the process might work under other conditions; the statement is not fully justified"],
    modelAnswer: "At 298 K so little product exists at equilibrium that the reaction is useless at that temperature. But K changes with temperature, and removing the product as it forms keeps pulling the position to the right, so the reaction might still be useful under different conditions. The statement is too absolute.",
    hints: ["What can change K, and what can move the position?"],
    explanation: "K applies to one temperature; conditions and product removal matter.",
  });
  // Structured: esterification equilibrium found by titration
  {
    const cat = titre(0.0, 2.5);
    const total = titre(1.5, 47.5);
    const nAcid = ((total - cat) * 2.0) / 1000;
    chk(nAcid, 0.087, 1e-12, "acid eq");
    const eq = ice({ acid: 0.2, alc: 0.15, ester: 0, water: 0 }, { acid: -1, alc: -1, ester: 1, water: 1 }, "acid", nAcid - 0.2);
    const K = kEq([[1, eq.ester], [1, eq.water]], [[1, eq.acid], [1, eq.alc]]);
    const nAcidWrong = (total * 2.0) / 1000;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`Rudo mixed 0.200 mol of ethanoic acid with 0.150 mol of ethanol and added a few drops of concentrated sulfuric acid as a catalyst (the water this adds can be ignored). The sealed flask was kept at 25 °C for a week:

$\ce{CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O}$

The whole mixture was then poured into ice-cold water and titrated at once with 2.00 mol dm⁻³ sodium hydroxide. The burette readings were 1.50 cm³ (initial) and 47.50 cm³ (final). In a separate titration the same number of drops of sulfuric acid needed 2.50 cm³ of the sodium hydroxide.`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "Write an expression for Kc for this equilibrium.", points: ["Kc = [CH₃COOC₂H₅][H₂O] / ([CH₃COOH][C₂H₅OH])"], modelAnswer: "Kc = [CH₃COOC₂H₅][H₂O] / ([CH₃COOH][C₂H₅OH])" }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the amount, in mol, of ethanoic acid present at equilibrium.", value: nAcid, sf: 3, unit: "mol", wrong: [sfStr(nAcidWrong, 3)], explanation: `Titre for ethanoic acid = (47.50 − 1.50) − 2.50 = ${dpStr(total - cat, 2)} cm³; n = ${dpStr(total - cat, 2)}/1000 × 2.00 = ${sfStr(nAcid, 3)} mol (1 : 1 with NaOH). Ignoring the catalyst gives ${sfStr(nAcidWrong, 3)} mol.` }),
        P.group({ label: "(c)", stem: "Deduce the equilibrium amounts, in mol, of:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "ethyl ethanoate;", value: eq.ester, sf: 3, unit: "mol", explanation: `0.200 − ${sfStr(nAcid, 3)} = ${sfStr(eq.ester, 3)} mol of acid reacted, forming the same amount of ester.` }),
          P.num({ label: "(ii)", marks: 1, stem: "ethanol.", value: eq.alc, sf: 3, unit: "mol", wrong: [0.15], explanation: `0.150 − ${sfStr(eq.ester, 3)} = ${sfStr(eq.alc, 3)} mol.` }),
        ] }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate Kc, to three significant figures.", value: K, sf: 3, wrong: [sfStr(kEq([[1, eq.ester], [1, eq.water]], [[1, 0.2], [1, 0.15]]), 3)], explanation: `Kc = (${sfStr(eq.ester, 3)} × ${sfStr(eq.water, 3)}) ÷ (${sfStr(eq.acid, 3)} × ${sfStr(eq.alc, 3)}) = ${sfStr(K, 3)}.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why Kc has no units for this equilibrium.", points: ["Two concentration terms above and two below the line", "so the units (and the volume) cancel"], modelAnswer: "There are two concentration terms in the numerator and two in the denominator, so the mol dm⁻³ units cancel (and so does the volume)." }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest why the mixture was poured into ice-cold water and titrated at once.", points: ["Removing ethanoic acid with NaOH disturbs the equilibrium, so ester would hydrolyse to replace the acid (position moves left)", "Cooling and dilution slow this reaction so the titre measures the equilibrium amount"], modelAnswer: "As the alkali removes ethanoic acid, the equilibrium would move to the left and ester would be hydrolysed, giving more acid and too large a titre. Cooling and diluting slow the reaction almost to a stop, so the titration measures the acid present at equilibrium." }),
        P.mcq({ label: "(g)", marks: 1, stem: "The experiment is repeated with 0.300 mol of ethanol instead of 0.150 mol, at the same temperature. Which statement is correct?", options: [
          ["More ester forms and Kc is unchanged.", "Correct: the position moves right; Kc depends only on temperature."],
          ["More ester forms and Kc increases.", "Kc does not depend on the starting amounts."],
          ["The same amount of ester forms and Kc is unchanged.", "Adding more reactant moves the position to the right."],
          ["Less ester forms and Kc decreases.", "Extra reactant cannot reduce the amount of product."],
        ], answer: "A", explanation: "Same temperature, same Kc; more ethanol, more ester." }),
      ],
      hints: ["Subtract the catalyst titre before finding the amount of ethanoic acid.", "Use the 1 : 1 : 1 : 1 ratio for the change."],
      explanation: `n(acid) at equilibrium = ${sfStr(nAcid, 3)} mol; ester = water = ${sfStr(eq.ester, 3)} mol; ethanol = ${sfStr(eq.alc, 3)} mol; Kc = ${sfStr(K, 3)}.`,
    });
  }
  // Structured: Kp for the Contact equilibrium
  {
    const n = ice({ SO2: 2.0, O2: 1.0, SO3: 0 }, { SO2: -2, O2: -1, SO3: 2 }, "SO3", 1.8);
    const pp = partialPressures(n, 250);
    const tot = n.SO2 + n.O2 + n.SO3;
    const Kp = kEq([[2, pp.SO3.p]], [[2, pp.SO2.p], [1, pp.O2.p]]);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`2.00 mol of sulfur dioxide and 1.00 mol of oxygen were allowed to reach equilibrium at a total pressure of 250 kPa and constant temperature:

$\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$ ΔH = −197 kJ mol⁻¹

At equilibrium the mixture contained 1.80 mol of sulfur trioxide.`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "Write an expression for Kp.", points: ["Kp = p(SO₃)² / (p(SO₂)² × p(O₂))"], modelAnswer: "Kp = p(SO₃)² / (p(SO₂)² p(O₂))" }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the amount, in mol, of oxygen at equilibrium.", value: n.O2, sf: 3, unit: "mol", wrong: [sfStr(1 - 1.8, 3)], explanation: `O₂ used = 1.80/2 = 0.900 mol, so ${sfStr(n.O2, 3)} mol remains.` }),
        P.group({ label: "(c)", stem: "For the equilibrium mixture:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "calculate the total amount of gas, in mol;", value: tot, sf: 3, unit: "mol", wrong: [3], explanation: `${sfStr(n.SO2, 3)} + ${sfStr(n.O2, 3)} + ${sfStr(n.SO3, 3)} = ${sfStr(tot, 3)} mol.` }),
          P.num({ label: "(ii)", marks: 2, stem: "calculate the partial pressure of sulfur trioxide, in kPa, to three significant figures.", value: pp.SO3.p, sf: 3, unit: "kPa", wrong: [sfStr((1.8 / 3) * 250, 3)], explanation: `x(SO₃) = 1.80/${sfStr(tot, 3)} = ${sfStr(pp.SO3.x, 3)}; p = ${sfStr(pp.SO3.x, 3)} × 250 = ${sfStr(pp.SO3.p, 3)} kPa. Dividing by the initial 3.00 mol gives ${sfStr((1.8 / 3) * 250, 3)} kPa.` }),
        ] }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate Kp to three significant figures.", value: Kp, sf: 3, unit: "kPa⁻¹", explanation: `p(SO₂) = ${sfStr(pp.SO2.p, 3)} kPa, p(O₂) = ${sfStr(pp.O2.p, 3)} kPa. Kp = ${sfStr(pp.SO3.p, 4)}² ÷ (${sfStr(pp.SO2.p, 4)}² × ${sfStr(pp.O2.p, 4)}) = ${sfStr(Kp, 3)} kPa⁻¹.` }),
        P.short({ label: "(e)", marks: 1, stem: "Give the units of Kp.", accepted: ["kPa-1", "kPa⁻¹", "kPa^-1", "1/kPa", "per kPa"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["kPa"], explanation: "kPa² ÷ (kPa² × kPa) = kPa⁻¹." }),
        P.manual({ label: "(f)", marks: 3, stem: "State and explain the effect of raising the temperature on the value of Kp and on the equilibrium amount of sulfur trioxide.", points: ["Kp decreases", "The forward reaction is exothermic, so a higher temperature moves the position in the endothermic direction (to the left)", "so the equilibrium amount of SO₃ decreases"], modelAnswer: "Kp decreases. The forward reaction is exothermic, so raising the temperature moves the position of equilibrium in the endothermic direction, to the left; less sulfur trioxide is present at equilibrium." }),
        P.mcq({ label: "(g)", marks: 1, stem: "The total pressure is increased to 500 kPa at the same temperature. What happens?", options: [
          ["Kp is unchanged; more SO₃ forms at equilibrium.", "Correct: pressure moves the position to the side with fewer moles of gas but does not change Kp."],
          ["Kp increases; more SO₃ forms at equilibrium.", "Kp changes only with temperature."],
          ["Kp is unchanged; the amount of SO₃ is unchanged.", "3 mol of gas become 2 mol, so higher pressure moves the position right."],
          ["Kp decreases; less SO₃ forms at equilibrium.", "Higher pressure favours the side with fewer gas molecules: the products."],
        ], answer: "A", explanation: "Same temperature, same Kp; more SO₃." }),
      ],
      hints: ["Use the 2 : 1 : 2 ratio for the change.", "Use the equilibrium total amount of gas for the mole fractions."],
      explanation: `Equilibrium: SO₂ ${sfStr(n.SO2, 3)} mol, O₂ ${sfStr(n.O2, 3)} mol, SO₃ 1.80 mol (total ${sfStr(tot, 3)} mol); p(SO₃) = ${sfStr(pp.SO3.p, 3)} kPa; Kp = ${sfStr(Kp, 3)} kPa⁻¹; Kp falls as temperature rises.`,
    });
  }
  b.card("FORMULA", "Kc for aA + bB ⇌ cC + dD", "Kc = [C]^c[D]^d / ([A]^a[B]^b), with equilibrium concentrations in mol dm⁻³.");
  b.card("FORMULA", "Partial pressure", "p(A) = mole fraction of A × total pressure; mole fraction = n(A)/n(total).");
  b.card("FORMULA", "Kp for aA + bB ⇌ cC + dD (gases)", "Kp = p(C)^c p(D)^d / (p(A)^a p(B)^b), using equilibrium partial pressures.");
  b.card("CONCEPT", "Units of Kc", "Substitute mol dm⁻³ for each term and cancel; e.g. N₂ + 3H₂ ⇌ 2NH₃ gives dm⁶ mol⁻²; equal powers give no units.");
  b.card("CONCEPT", "Size of K", "K ≫ 1: equilibrium lies to the right (mostly products); K ≪ 1: lies to the left.");
  b.card("FACT", "What changes K?", "Only temperature. Exothermic forward reaction: K falls as T rises; endothermic: K rises.");
  b.card("CONCEPT", "Reversing or scaling an equation", "Reversed: K becomes 1/K. All coefficients doubled: K is squared; halved: square root.");
  b.card("CONCEPT", "Equilibrium table method", "Initial amounts → change (from the mole ratio) → equilibrium amounts → concentrations (÷ V) or partial pressures → K.");
  b.card("FACT", "Which species appear in Kp?", "Only gases; solids and pure liquids are left out.");
});
