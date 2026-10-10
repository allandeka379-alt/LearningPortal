// W2a: six THEORY10 items (ZIMSEC Paper 2; Cambridge Paper 2 for AS concepts, Paper 4 for A Level concepts) on
// equilibria, acids and bases, and kinetics. Items T1-T3 are on Cambridge AS concepts; T4-T6 on Cambridge A Level concepts.
import { concept, P, t, ce, EXAM, checkExam, ice, kEq, partialPressures, molesFromSolution, VM_RTP, AR, pH, pHWeakAcid, bufferPH, pHStrongBase, kspFromSolubility, solubilityCommonIon, orderFrom, rateConstant, rateFrom, sfStr, dpStr, sciStr, chk } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const TH = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true };
const AS = { ...TH, paper: "Paper 2" };
const AL = { ...TH, paper: "Paper 4 (CIE), Paper 2 (ZIMSEC)" };

concept(A("equilibria.kc-kp"), { file: "exam/w2a-theory", keyPrefix: "exam.w2a-theory" }, (b) => {
  // ---------------------------------------------------------------- T1 (AS): methanol equilibrium, Kc and Le Chatelier
  {
    const n = ice({ CO: 1.0, H2: 2.0, M: 0 }, { CO: -1, H2: -2, M: 1 }, "M", 0.4);
    const V = 5.0;
    const c = { CO: n.CO / V, H2: n.H2 / V, M: n.M / V };
    const K = kEq([[1, c.M]], [[1, c.CO], [2, c.H2]]);
    b.struct({
      ...AS, d: 3, calculator: true,
      concepts: [A("equilibria.kc-kp"), A("equilibria.dynamic-le-chatelier")],
      stem: t`Methanol is made from carbon monoxide and hydrogen: $\ce{CO(g) + 2H2(g) <=> CH3OH(g)}$, ΔH = −91 kJ mol⁻¹. In an experiment, 1.00 mol of CO and 2.00 mol of H₂ were sealed in a 5.00 dm³ vessel and allowed to reach equilibrium at a constant temperature. The equilibrium mixture contained 0.400 mol of methanol.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "Write an expression for Kc for this equilibrium.", points: ["Kc = [CH₃OH] / ([CO][H₂]²)"], modelAnswer: "Kc = [CH₃OH]/([CO][H₂]²)" }),
        P.group({ label: "(b)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "the amount, in mol, of hydrogen at equilibrium;", value: n.H2, sf: 3, unit: "mol", wrong: [1.6], explanation: `H₂ used = 2 × 0.400 = 0.800 mol; ${sfStr(n.H2, 3)} mol remains.` }),
          P.num({ label: "(ii)", marks: 1, stem: "the equilibrium concentration of carbon monoxide, in mol dm⁻³.", value: c.CO, sf: 3, unit: "mol/dm³", wrong: [n.CO], explanation: `${sfStr(n.CO, 3)} mol ÷ 5.00 dm³ = ${sfStr(c.CO, 3)} mol dm⁻³.` }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate Kc, to three significant figures.", value: K, sf: 3, unit: "dm⁶/mol²", wrong: [kEq([[1, n.M]], [[1, n.CO], [2, n.H2]])], explanation: `[CO] = ${sfStr(c.CO, 3)}, [H₂] = ${sfStr(c.H2, 3)}, [CH₃OH] = ${sfStr(c.M, 3)} mol dm⁻³; Kc = ${sfStr(c.M, 3)} ÷ (${sfStr(c.CO, 3)} × ${sfStr(c.H2, 3)}²) = ${sfStr(K, 3)} dm⁶ mol⁻². Using amounts instead of concentrations gives ${sfStr(kEq([[1, n.M]], [[1, n.CO], [2, n.H2]]), 3)}.` }),
        P.short({ label: "(d)", marks: 1, stem: "Give the units of Kc.", accepted: ["dm6 mol-2", "dm⁶ mol⁻²", "dm^6 mol^-2", "mol-2 dm6", "dm6/mol2"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["mol2 dm-6"], explanation: "(mol dm⁻³) ÷ (mol dm⁻³)³ = dm⁶ mol⁻²." }),
        P.manual({ label: "(e)", marks: 2, stem: "State and explain the effect of increasing the total pressure on the equilibrium yield of methanol.", points: ["The yield increases (position moves right)", "There are fewer moles of gas on the right (1 mol against 3 mol), so the position moves to oppose the pressure increase"], modelAnswer: "The yield of methanol increases: the system opposes the increase in pressure by moving to the side with fewer gas molecules, which is the right (1 mol against 3 mol)." }),
        P.manual({ label: "(f)", marks: 2, stem: "State and explain how the value of Kc changes if the temperature is increased.", points: ["Kc decreases", "The forward reaction is exothermic, so a higher temperature moves the position in the endothermic direction (to the left)"], modelAnswer: "Kc decreases. The forward reaction is exothermic, so raising the temperature moves the position of equilibrium in the endothermic direction, to the left, lowering the ratio of products to reactants." }),
      ]),
      hints: ["Use the 1 : 2 : 1 ratio for the change.", "Divide each amount by 5.00 dm³."],
      explanation: `Equilibrium: CO ${sfStr(n.CO, 3)}, H₂ ${sfStr(n.H2, 3)}, CH₃OH 0.400 mol; Kc = ${sfStr(K, 3)} dm⁶ mol⁻²; higher pressure increases the yield; higher temperature lowers Kc.`,
    });
  }

  // ---------------------------------------------------------------- T2 (AS): Contact process and Kp
  {
    const pp = partialPressures({ SO2: 0.05, O2: 0.45, SO3: 1.95, N2: 0 }, 150);
    const tot = 0.05 + 0.45 + 1.95;
    const Kp = kEq([[2, pp.SO3.p]], [[2, pp.SO2.p], [1, pp.O2.p]]);
    b.struct({
      ...AS, d: 4, calculator: true,
      concepts: [A("equilibria.haber-contact"), A("equilibria.kc-kp")],
      stem: t`In the Contact process sulfur dioxide is oxidised: $\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$, ΔH = −197 kJ mol⁻¹. A sample of an equilibrium mixture contained 0.0500 mol of $\ce{SO2}$, 0.450 mol of $\ce{O2}$ and 1.95 mol of $\ce{SO3}$ at a total pressure of 150 kPa.`,
      parts: checkExam(EXAM.THEORY10, [
        P.short({ label: "(a)", marks: 1, stem: "Name the catalyst used in this step of the Contact process.", accepted: ["vanadium(V) oxide", "vanadium pentoxide", "V2O5", "vanadium(v) oxide", "vanadium 5 oxide", "V₂O₅"], wrong: ["iron"], explanation: "Vanadium(V) oxide, V₂O₅." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the mole fraction of SO₃ in the mixture, to three significant figures.", value: pp.SO3.x, sf: 3, wrong: [1.95 / 2.0], explanation: `Total = ${sfStr(tot, 3)} mol; x(SO₃) = 1.95 ÷ ${sfStr(tot, 3)} = ${sfStr(pp.SO3.x, 3)}.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the partial pressure of SO₂, in kPa, to three significant figures.", value: pp.SO2.p, sf: 3, unit: "kPa", wrong: [0.05 * 150], explanation: `x(SO₂) = 0.0500 ÷ ${sfStr(tot, 3)} = ${sfStr(pp.SO2.x, 3)}; p = ${sfStr(pp.SO2.x, 3)} × 150 = ${sfStr(pp.SO2.p, 3)} kPa.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate Kp, in kPa⁻¹, to three significant figures.", value: Kp, sf: 3, unit: "kPa⁻¹", explanation: `p(O₂) = ${sfStr(pp.O2.p, 3)}, p(SO₃) = ${sfStr(pp.SO3.p, 3)} kPa; Kp = ${sfStr(pp.SO3.p, 4)}² ÷ (${sfStr(pp.SO2.p, 4)}² × ${sfStr(pp.O2.p, 4)}) = ${sfStr(Kp, 3)} kPa⁻¹.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why a pressure of only about 1–2 atm is used in the Contact process.", points: ["The position of equilibrium already lies far to the right (high conversion) at low pressure", "so the small gain in yield from high pressure would not justify the cost of compressors and stronger plant"], modelAnswer: "Even at about 1–2 atm the equilibrium lies far to the right and the conversion is very high, so the slight extra yield from high pressure would not repay the cost of compressing the gases and building stronger plant." }),
        P.manual({ label: "(f)", marks: 2, stem: "Describe how sulfur trioxide is converted into sulfuric acid, with equations.", points: ["SO₃ is absorbed in concentrated sulfuric acid to form oleum: SO₃ + H₂SO₄ → H₂S₂O₇", "Oleum is diluted with water: H₂S₂O₇ + H₂O → 2H₂SO₄ (not dissolved directly in water, which forms an acid mist)"], modelAnswer: "SO₃ is absorbed in concentrated sulfuric acid, SO₃ + H₂SO₄ → H₂S₂O₇ (oleum), which is then diluted: H₂S₂O₇ + H₂O → 2H₂SO₄. SO₃ is not added directly to water because that forms an acid mist." }),
      ]),
      hints: ["Find the total amount first.", "Partial pressure = mole fraction × total pressure."],
      explanation: `x(SO₃) = ${sfStr(pp.SO3.x, 3)}; p(SO₂) = ${sfStr(pp.SO2.p, 3)} kPa; Kp = ${sfStr(Kp, 3)} kPa⁻¹; low pressure suffices because conversion is already high.`,
    });
  }

  // ---------------------------------------------------------------- T3 (AS): acid strength and rates
  {
    const n = molesFromSolution(40, 0.5);
    const v = (n / 2) * VM_RTP * 1000;
    const avg = 96 / 60;
    b.struct({
      ...AS, d: 3, calculator: true,
      concepts: [A("kinetics.collisions-boltzmann"), A("acids.bronsted-lowry")],
      stem: "Farai added excess magnesium ribbon to 40.0 cm³ of 0.500 mol dm⁻³ hydrochloric acid and collected the hydrogen. After 60 s, 96 cm³ of gas had been collected. He repeated the experiment with 40.0 cm³ of 0.500 mol dm⁻³ ethanoic acid.",
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "Define the term *activation energy*.", points: ["The minimum energy that colliding particles must have for a reaction to occur (an effective collision)"], modelAnswer: "The minimum energy colliding particles need for the collision to result in reaction." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the average rate of hydrogen production over the first 60 s with hydrochloric acid, in cm³ s⁻¹.", value: avg, sf: 3, unit: "cm³/s", explanation: `96 ÷ 60 = ${sfStr(avg, 3)} cm³ s⁻¹.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the total volume of hydrogen, in cm³ at room conditions, produced by the hydrochloric acid. (molar gas volume 24.0 dm³ mol⁻¹)", value: v, sf: 3, unit: "cm³", wrong: [v * 2], explanation: `n(HCl) = ${sciStr(n, 3)} mol; Mg + 2HCl → MgCl₂ + H₂, so n(H₂) = ${sciStr(n / 2, 3)} mol; V = ${sfStr(v, 3)} cm³.` }),
        P.mcq({ label: "(d)", marks: 1, stem: "How do the initial rate and the total volume of hydrogen from the ethanoic acid compare with those from the hydrochloric acid?", options: [
          ["slower initial rate; the same total volume", "Correct: lower [H⁺], same amount of monobasic acid."],
          ["slower initial rate; a smaller total volume", "The equilibrium moves right as H⁺ is used, so all the acid eventually reacts."],
          ["the same initial rate; the same total volume", "[H⁺] is much lower in the weak acid, so the rate is slower."],
          ["faster initial rate; a smaller total volume", "A weak acid gives a lower [H⁺], so it cannot react faster."],
        ], answer: "A", explanation: "Weak acid: lower [H⁺], slower; same total amount of H⁺ available." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the initial rate is different for the two acids.", points: ["Ethanoic acid is a weak acid, only partially dissociated; HCl is fully dissociated", "so [H⁺] is lower in ethanoic acid and collisions of H⁺ with Mg are less frequent"], modelAnswer: "Hydrochloric acid is fully dissociated, but ethanoic acid is weak and only partially dissociated, so at the same concentration it has a much lower [H⁺]. There are fewer collisions between H⁺ ions and the magnesium per second, so the reaction is slower." }),
        P.manual({ label: "(f)", marks: 3, stem: "The hydrochloric acid experiment is repeated at a higher temperature. Use the Boltzmann distribution to explain why the rate increases.", points: ["At higher temperature the distribution is flatter and shifted to higher energies (peak lower and to the right; same area)", "A greater proportion of particles have energy ≥ Ea", "so the frequency of effective collisions increases (collisions also slightly more frequent)"], modelAnswer: "At the higher temperature the Boltzmann distribution is broader with its peak at a higher energy. A much greater proportion of the H⁺ ions colliding with the magnesium have energy at least equal to the activation energy, so effective collisions are more frequent and the rate increases." }),
      ]),
      hints: ["Use Mg + 2HCl → MgCl₂ + H₂.", "Weak means partially dissociated."],
      explanation: `Average rate ${sfStr(avg, 3)} cm³ s⁻¹; ${sfStr(v, 3)} cm³ of H₂ from each acid; ethanoic acid reacts more slowly because [H⁺] is lower; higher temperature gives more particles with E ≥ Ea.`,
    });
  }

  // ---------------------------------------------------------------- T4 (A Level): pH and buffers
  {
    const KaV = 1.38e-4;
    const pHs = pH(0.025);
    const pHw = pHWeakAcid(KaV, 0.05);
    const nA = molesFromSolution(50, 0.05), nB = molesFromSolution(15, 0.05);
    const pHb = bufferPH(KaV, nA - nB, nB);
    const nB2 = molesFromSolution(20, 0.05);
    const pHb2 = bufferPH(KaV, nA - nB2, nB2);
    b.struct({
      ...AL, d: 4, calculator: true,
      concepts: [A("acids.ph-kw"), A("acids.weak-acids-bases"), A("acids.buffers")],
      stem: "Lactic acid, CH₃CH(OH)COOH, is a weak monobasic acid (data: Ka = 1.38 × 10⁻⁴ mol dm⁻³ at 298 K). Hydrochloric acid is a strong acid.",
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the pH of 0.0250 mol dm⁻³ hydrochloric acid, to two decimal places.", value: pHs, dp: 2, explanation: `pH = −log 0.0250 = ${dpStr(pHs, 2)}.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the pH of 0.0500 mol dm⁻³ lactic acid, to two decimal places.", value: pHw, dp: 2, wrong: [dpStr(pH(0.05), 2)], explanation: `[H⁺] = √(1.38 × 10⁻⁴ × 0.0500) = ${sciStr(Math.sqrt(KaV * 0.05), 3)} mol dm⁻³; pH = ${dpStr(pHw, 2)}.` }),
        P.num({ label: "(c)", marks: 2, stem: "15.0 cm³ of 0.0500 mol dm⁻³ sodium hydroxide is added to 50.0 cm³ of 0.0500 mol dm⁻³ lactic acid. Calculate the pH of the buffer formed, to two decimal places.", value: pHb, dp: 2, wrong: [dpStr(bufferPH(KaV, nA, nB), 2)], explanation: `Acid left = ${sciStr(nA, 3)} − ${sciStr(nB, 3)} = ${sciStr(nA - nB, 3)} mol; lactate = ${sciStr(nB, 3)} mol; [H⁺] = 1.38 × 10⁻⁴ × ${sciStr(nA - nB, 3)}/${sciStr(nB, 3)}; pH = ${dpStr(pHb, 2)}.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain, with equations, how this mixture acts as a buffer. Use HA for lactic acid.", points: ["The mixture contains large amounts of both HA and A⁻ (lactate)", "Added H⁺ is removed: A⁻ + H⁺ → HA", "Added OH⁻ is removed: HA + OH⁻ → A⁻ + H₂O, so the ratio [HA]/[A⁻] and the pH change little"], modelAnswer: "The solution contains large reservoirs of lactic acid (HA) and lactate ions (A⁻). Added H⁺ is removed by A⁻ + H⁺ → HA, and added OH⁻ by HA + OH⁻ → A⁻ + H₂O. Because both reservoirs are large, the ratio [HA]/[A⁻] hardly changes, so the pH stays almost constant." }),
        P.num({ label: "(e)", marks: 2, stem: "A further 5.0 cm³ of the 0.0500 mol dm⁻³ sodium hydroxide is added to the buffer. Calculate the new pH, to two decimal places.", value: pHb2, dp: 2, wrong: [dpStr(pHb, 2)], explanation: `Total OH⁻ added = ${sciStr(nB2, 3)} mol: acid ${sciStr(nA - nB2, 3)} mol, lactate ${sciStr(nB2, 3)} mol; pH = ${dpStr(pHb2, 2)}, a small rise.` }),
      ]),
      hints: ["Strong acid: [H⁺] = c. Weak acid: [H⁺] = √(Ka c). Buffer: [H⁺] = Ka[HA]/[A⁻]."],
      explanation: `pH: HCl ${dpStr(pHs, 2)}; lactic acid ${dpStr(pHw, 2)}; buffer ${dpStr(pHb, 2)}, rising only to ${dpStr(pHb2, 2)} after more alkali.`,
    });
  }

  // ---------------------------------------------------------------- T5 (A Level): solubility product
  {
    const s = 1.6e-2;
    const ksp = kspFromSolubility(s, 1, 2);
    const sCommon = solubilityCommonIon(ksp, 0.1, { x: 1, y: 2, commonIon: "anion" });
    const ip = 0.02 * 0.02 ** 2;
    b.struct({
      ...AL, d: 4, calculator: true,
      concepts: [A("acids.solubility-product")],
      stem: t`In an experiment, the solubility of lead(II) chloride, $\ce{PbCl2}$, in water at 298 K was found to be 1.60 × 10⁻² mol dm⁻³.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "Write an expression for Ksp of lead(II) chloride.", points: ["Ksp = [Pb²⁺][Cl⁻]²"], modelAnswer: "Ksp = [Pb²⁺][Cl⁻]²" }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate Ksp, in mol³ dm⁻⁹, to three significant figures.", value: ksp, sf: 3, unit: "mol³/dm⁹", wrong: [s * s * s, s * s], explanation: `[Pb²⁺] = s = ${sciStr(s, 3)}, [Cl⁻] = 2s = ${sciStr(2 * s, 3)}; Ksp = ${sciStr(s, 3)} × (${sciStr(2 * s, 3)})² = ${sciStr(ksp, 3)} mol³ dm⁻⁹.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the solubility of lead(II) chloride, in mol dm⁻³, in 0.100 mol dm⁻³ sodium chloride solution, to three significant figures.", value: sCommon, sf: 3, unit: "mol/dm³", wrong: [ksp / 0.1], explanation: `[Pb²⁺] = Ksp/[Cl⁻]² = ${sciStr(ksp, 3)} ÷ (0.100)² = ${sciStr(sCommon, 3)} mol dm⁻³. Forgetting to square [Cl⁻] gives ${sciStr(ksp / 0.1, 3)}.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why lead(II) chloride is less soluble in sodium chloride solution than in water.", points: ["Chloride is a common ion: it moves PbCl₂(s) ⇌ Pb²⁺ + 2Cl⁻ to the left", "so less solid dissolves (Ksp is unchanged)"], modelAnswer: "The chloride ions from sodium chloride are a common ion, so the equilibrium PbCl₂(s) ⇌ Pb²⁺(aq) + 2Cl⁻(aq) moves to the left; with Ksp constant, [Pb²⁺] must be lower, so less lead(II) chloride dissolves." }),
        P.num({ label: "(e)", marks: 2, stem: "Equal volumes of 0.0400 mol dm⁻³ lead(II) nitrate and 0.0400 mol dm⁻³ sodium chloride are mixed. Calculate the ionic product [Pb²⁺][Cl⁻]² immediately after mixing, in mol³ dm⁻⁹.", value: ip, sf: 3, unit: "mol³/dm⁹", wrong: [0.04 ** 3], explanation: `After mixing each concentration halves to 0.0200 mol dm⁻³; ionic product = 0.0200 × 0.0200² = ${sciStr(ip, 3)} mol³ dm⁻⁹.` }),
        P.mcq({ label: "(f)", marks: 1, stem: "Does a precipitate form in (e)?", options: [
          ["No, because the ionic product is less than Ksp.", `Correct: ${sciStr(ip, 3)} < ${sciStr(ksp, 3)}.`],
          ["Yes, because the ionic product is greater than Ksp.", "Compare again: the ionic product is the smaller number."],
          ["Yes, because lead(II) chloride is insoluble in water.", "It is sparingly soluble; the comparison with Ksp decides."],
          ["No, because sodium chloride is very soluble in water.", "The solubility of NaCl is not the deciding factor."],
        ], answer: "A", explanation: "Ionic product < Ksp: the solution is not saturated, so no precipitate." }),
      ]),
      hints: ["For PbCl₂, [Cl⁻] = 2s.", "Halve concentrations when equal volumes are mixed."],
      explanation: `Ksp = ${sciStr(ksp, 3)} mol³ dm⁻⁹; solubility in 0.100 mol dm⁻³ NaCl = ${sciStr(sCommon, 3)} mol dm⁻³; ionic product ${sciStr(ip, 3)} is below Ksp, so no precipitate forms.`,
    });
  }

  // ---------------------------------------------------------------- T6 (A Level): rate equation and mechanism
  {
    const k = 0.042;
    const ex = [[0.010, 0.010], [0.020, 0.010], [0.010, 0.030]];
    const r = ex.map(([a, bb]) => rateFrom(k, [[a, 2], [bb, 0]]));
    const oA = orderFrom(r[0], r[1], 0.01, 0.02), oB = orderFrom(r[0], r[2], 0.01, 0.03);
    const kc = rateConstant(r[0], [[0.01, oA]]);
    chk(kc, k, 1e-12, "k T6");
    b.struct({
      ...AL, d: 4, calculator: true,
      concepts: [A("kinetics.rate-equations"), A("kinetics.mechanisms-rds")],
      stem: t`The gas-phase reaction $\ce{2X(g) + Y(g) -> X2Y(g)}$ was studied at constant temperature.

| Experiment | [X] / mol dm⁻³ | [Y] / mol dm⁻³ | Initial rate / mol dm⁻³ s⁻¹ |
|---|---|---|---|
${ex.map(([a, bb], j) => `| ${j + 1} | ${sfStr(a, 2)} | ${sfStr(bb, 2)} | ${sciStr(r[j], 3)} |`).join("\n")}`,
      parts: checkExam(EXAM.THEORY10, [
        P.group({ label: "(a)", stem: "Deduce the order of reaction with respect to:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "X;", value: oA, wrong: [1], explanation: "Exp. 1 → 2: [X] × 2, rate × 4: second order." }),
          P.num({ label: "(ii)", marks: 1, stem: "Y.", value: oB, wrong: [1], explanation: "Exp. 1 → 3: [Y] × 3, rate unchanged: zero order." }),
        ] }),
        P.num({ label: "(b)", marks: 2, stem: "Using your answers to (a), calculate the rate constant k from experiment 1.", value: kc, sf: 2, unit: "dm³/mol/s", wrong: [rateConstant(r[0], [[0.01, 2], [0.01, 1]])], explanation: `Rate = k[X]²; k = ${sciStr(r[0], 3)} ÷ (0.010)² = ${sfStr(kc, 2)} dm³ mol⁻¹ s⁻¹.` }),
        P.short({ label: "(c)", marks: 1, stem: "Give the units of k.", accepted: ["dm3 mol-1 s-1", "dm³ mol⁻¹ s⁻¹", "dm^3 mol^-1 s^-1", "dm3/mol/s", "mol-1 dm3 s-1"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["s-1"], explanation: "Second order overall: dm³ mol⁻¹ s⁻¹." }),
        P.manual({ label: "(d)", marks: 3, stem: "Suggest a two-step mechanism for the reaction that is consistent with the rate equation. Identify the rate-determining step and any intermediate.", points: ["Slow (rate-determining) step: X + X → X₂", "Fast step: X₂ + Y → X₂Y", "X₂ is an intermediate; Y reacts after the slow step so it is zero order"], modelAnswer: "Step 1 (slow, rate-determining): 2X → X₂. Step 2 (fast): X₂ + Y → X₂Y. Two X particles are in the slow step, giving rate = k[X]²; Y reacts only in the fast step, so it is zero order; X₂ is an intermediate and the steps add to 2X + Y → X₂Y." }),
        P.mcq({ label: "(e)", marks: 1, stem: "The experiment is repeated at a higher temperature. Which statement is correct?", options: [
          ["k increases and the rate equation is unchanged.", "Correct: temperature changes k, not the orders."],
          ["k is unchanged and Y becomes first order.", "Orders come from the mechanism, which is unchanged."],
          ["k decreases because more molecules have energy above Ea.", "More molecules with E ≥ Ea means a larger k."],
          ["k and the rate both decrease.", "Higher temperature increases k and the rate."],
        ], answer: "A", explanation: "Higher temperature: larger k, same rate equation." }),
        P.tf({ label: "(f)", marks: 1, stem: "Doubling [X] and doubling [Y] together makes the rate eight times faster.", answer: false, explanation: "False: 2² × 2⁰ = 4 times faster." }),
      ]),
      hints: ["Change one concentration at a time.", "Put the species in the rate equation into the slow step."],
      explanation: `Rate = k[X]², k = ${sfStr(kc, 2)} dm³ mol⁻¹ s⁻¹; slow step 2X → X₂, fast X₂ + Y → X₂Y.`,
    });
  }
});
