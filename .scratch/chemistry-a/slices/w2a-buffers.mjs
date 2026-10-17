// W2a: achem.acids.buffers (both boards; ZIMSEC Form 6, Cambridge A Level only; soil and basic-buffer pOH are ZIMSEC detail)
import { concept, P, t, ce, ZIM, bufferPH, pKa, kaFromPKa, pH, Mr, molesFromSolution, sfStr, dpStr, sciStr } from "../lib.mjs";

const KA_E = 1.74e-5; // ethanoic acid (data)

concept("achem.acids.buffers", { file: "acids/buffers", keyPrefix: "acids.buffers" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which mixture forms an acidic buffer solution?",
    options: [
      ["ethanoic acid and sodium ethanoate", "Correct: a weak acid with its conjugate base (as its salt)."],
      ["hydrochloric acid and sodium chloride", "HCl is a strong acid; Cl⁻ is too weak a base to remove added H⁺."],
      ["sodium hydroxide and sodium chloride", "A strong base and a neutral salt cannot buffer."],
      ["ethanoic acid and hydrochloric acid", "There is no reservoir of conjugate base to remove added H⁺."],
    ],
    answer: "A",
    explanation: "An acidic buffer contains a weak acid and a salt of that acid, giving large amounts of HA and A⁻.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In an ethanoic acid–sodium ethanoate buffer, which species removes most of a small amount of added hydrochloric acid?",
    options: [
      ["ethanoate ions", "Correct: CH₃COO⁻ + H⁺ → CH₃COOH."],
      ["ethanoic acid molecules", "Ethanoic acid removes added OH⁻, not H⁺."],
      ["sodium ions", "Na⁺ is a spectator ion and does not react with H⁺."],
      ["water molecules", "Water is not the main reservoir that keeps the pH steady."],
    ],
    answer: "A",
    explanation: "The large reservoir of conjugate base (ethanoate) mops up added H⁺; the weak acid reservoir neutralises added OH⁻.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A buffer contains equal concentrations of a weak acid HA (pKa 4.20) and its sodium salt. What is its pH?",
    options: [
      ["4.20", "Correct: when [HA] = [A⁻], [H⁺] = Ka, so pH = pKa."],
      ["7.00", "Only a strong acid–strong base mixture at equivalence is neutral; this buffer is acidic."],
      ["2.10", "Halving the pKa has no meaning here."],
      ["8.40", "Doubling the pKa has no meaning here."],
    ],
    answer: "A",
    explanation: "[H⁺] = Ka[HA]/[A⁻] = Ka, so pH = pKa = 4.20.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which pair of species is mainly responsible for buffering blood plasma at about pH 7.4?",
    options: [
      [t`$\ce{H2CO3}$ and $\ce{HCO3-}$`, "Correct: carbonic acid and hydrogencarbonate ions."],
      [t`$\ce{HCl}$ and $\ce{Cl-}$`, "HCl is a strong acid; this pair cannot buffer."],
      [t`$\ce{NH3}$ and $\ce{NH4+}$`, "This is a basic buffer pair, but it is not the main blood buffer."],
      [t`$\ce{CH3COOH}$ and $\ce{CH3COO-}$`, "This is a laboratory buffer pair, not the blood system."],
    ],
    answer: "A",
    explanation: "CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ is the main buffer system in blood.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about a buffer made from 0.10 mol of ethanoic acid and 0.10 mol of sodium ethanoate in 1.0 dm³ of solution are correct?\n\n1. Diluting it to 2.0 dm³ hardly changes its pH.\n2. Adding 0.20 mol of sodium hydroxide would change its pH greatly.\n3. Its pH would stay exactly constant if a small amount of acid were added.",
    options: [
      ["1 and 2 only", "Correct: dilution keeps the ratio [HA]/[A⁻]; 0.20 mol of OH⁻ exceeds the 0.10 mol of acid, so buffer capacity is exceeded."],
      ["1, 2 and 3", "Statement 3 is false: the pH changes slightly; buffers resist change, they do not prevent it."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true: the buffer's acid reservoir is used up."],
    ],
    answer: "A",
    hints: ["What happens to the ratio [HA]/[A⁻] on dilution?"],
    explanation: "pH depends on the ratio [HA]/[A⁻], which dilution does not change. A buffer only copes with small additions and the pH always changes a little.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which of these mixtures, once mixed, is a buffer solution?\n\n1. 50 cm³ of 0.1 mol dm⁻³ ethanoic acid + 25 cm³ of 0.1 mol dm⁻³ sodium hydroxide\n2. 50 cm³ of 0.1 mol dm⁻³ aqueous ammonia + 25 cm³ of 0.1 mol dm⁻³ hydrochloric acid\n3. 50 cm³ of 0.1 mol dm⁻³ hydrochloric acid + 25 cm³ of 0.1 mol dm⁻³ sodium hydroxide",
    options: [
      ["1 and 2 only", "Correct: 1 leaves ethanoic acid + ethanoate; 2 leaves ammonia + ammonium; 3 leaves only strong acid and NaCl."],
      ["1, 2 and 3", "Mixture 3 contains excess strong acid and a neutral salt: not a buffer."],
      ["2 and 3 only", "Mixture 1 is a buffer made by partial neutralisation; mixture 3 is not."],
      ["1 only", "Mixture 2 is also a buffer: a weak base partly neutralised forms its conjugate acid."],
    ],
    answer: "A",
    hints: ["Which mixtures leave a weak acid (or base) together with its conjugate?"],
    explanation: "Partly neutralising a weak acid with a strong base, or a weak base with a strong acid, gives a buffer. Partly neutralising a strong acid does not.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Ethanoic acid has pKa 4.76. What ratio [CH₃COO⁻] : [CH₃COOH] is needed for a buffer of pH 5.76?",
    options: [
      ["10 : 1", "Correct: pH − pKa = 1, so [A⁻]/[HA] = 10¹ = 10."],
      ["1 : 10", "This ratio gives pH 3.76: there must be more salt than acid for pH above pKa."],
      ["1 : 1", "Equal amounts give pH = pKa = 4.76."],
      ["2 : 1", "A 2 : 1 ratio raises the pH by only log 2 = 0.30."],
    ],
    answer: "A",
    hints: ["pH = pKa + log([A⁻]/[HA])."],
    explanation: "log([A⁻]/[HA]) = 5.76 − 4.76 = 1.00, so the ratio is 10 : 1.",
  });
  {
    const v = bufferPH(1.78e-4, 0.25, 0.4);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Calculate the pH of a buffer containing 0.250 mol dm⁻³ methanoic acid and 0.400 mol dm⁻³ sodium methanoate, to two decimal places. (data: Ka = 1.78 × 10⁻⁴ mol dm⁻³)",
      value: v, dp: 2,
      wrong: [dpStr(bufferPH(1.78e-4, 0.4, 0.25), 2)],
      explanation: `[H⁺] = Ka × [acid]/[salt] = 1.78 × 10⁻⁴ × 0.250/0.400 = ${sciStr(1.78e-4 * 0.25 / 0.4, 3)} mol dm⁻³; pH = ${dpStr(v, 2)}. Inverting the ratio gives ${dpStr(bufferPH(1.78e-4, 0.4, 0.25), 2)}.`,
    });
  }
  {
    const nA = molesFromSolution(40, 0.25), nB = molesFromSolution(30, 0.1);
    const v = bufferPH(KA_E, nA - nB, nB);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "30.0 cm³ of 0.100 mol dm⁻³ sodium hydroxide is added to 40.0 cm³ of 0.250 mol dm⁻³ ethanoic acid. Calculate the pH of the resulting buffer, to two decimal places. (data: Ka = 1.74 × 10⁻⁵ mol dm⁻³)",
      value: v, dp: 2,
      wrong: [dpStr(bufferPH(KA_E, nA, nB), 2)],
      hints: ["Find the amounts of acid left and ethanoate formed.", "Both are in the same volume, so use amounts."],
      explanation: `1. n(CH₃COOH) = 0.0400 × 0.250 = ${sciStr(nA, 3)} mol; n(OH⁻) = 0.0300 × 0.100 = ${sciStr(nB, 3)} mol.\n2. Acid left = ${sciStr(nA - nB, 3)} mol; ethanoate formed = ${sciStr(nB, 3)} mol.\n3. [H⁺] = 1.74 × 10⁻⁵ × ${sciStr(nA - nB, 3)}/${sciStr(nB, 3)} = ${sciStr(KA_E * (nA - nB) / nB, 3)} mol dm⁻³; pH = ${dpStr(v, 2)}.\n4. Forgetting to subtract the acid used gives ${dpStr(bufferPH(KA_E, nA, nB), 2)}.`,
    });
  }
  {
    const salt = (KA_E * 0.2) / 10 ** -4.5;
    const n = salt * 0.25;
    const m = n * Mr("CH3COONa");
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "Calculate the mass of sodium ethanoate, CH₃COONa, in g, that must be dissolved in 250 cm³ of 0.200 mol dm⁻³ ethanoic acid to make a buffer of pH 4.50 (assume no volume change), to three significant figures. (data: Ka = 1.74 × 10⁻⁵ mol dm⁻³; Mr CH₃COONa = 82.0)",
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(salt * Mr("CH3COONa"), 3)],
      hints: ["Find [H⁺] from the pH, then rearrange Ka for [CH₃COO⁻].", "Convert concentration to amount in 250 cm³."],
      explanation: `1. [H⁺] = 10⁻⁴·⁵⁰ = ${sciStr(10 ** -4.5, 3)} mol dm⁻³.\n2. [CH₃COO⁻] = Ka[CH₃COOH]/[H⁺] = 1.74 × 10⁻⁵ × 0.200 ÷ ${sciStr(10 ** -4.5, 3)} = ${sfStr(salt, 3)} mol dm⁻³.\n3. n = ${sfStr(salt, 3)} × 0.250 = ${sfStr(n, 3)} mol; mass = ${sfStr(n, 3)} × 82.0 = ${sfStr(m, 3)} g.\n4. Forgetting that only 250 cm³ is used gives ${sfStr(salt * Mr("CH3COONa"), 3)} g.`,
    });
  }
  {
    const before = bufferPH(KA_E, 0.02, 0.015);
    const after = bufferPH(KA_E, 0.0175, 0.0175);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "A buffer contains 0.0200 mol of ethanoic acid and 0.0150 mol of sodium ethanoate in 100 cm³. 0.00250 mol of solid sodium hydroxide is dissolved in it. Calculate the new pH, to two decimal places. (data: Ka = 1.74 × 10⁻⁵ mol dm⁻³)",
      value: after, dp: 2,
      wrong: [dpStr(before, 2), dpStr(bufferPH(KA_E, 0.0225, 0.0125), 2)],
      hints: ["OH⁻ reacts with the acid: acid down, ethanoate up by the same amount."],
      explanation: `1. CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O: acid 0.0200 − 0.00250 = 0.0175 mol; ethanoate 0.0150 + 0.00250 = 0.0175 mol.\n2. [H⁺] = 1.74 × 10⁻⁵ × 0.0175/0.0175 = ${sciStr(KA_E, 3)} mol dm⁻³, so pH = pKa = ${dpStr(after, 2)} (it was ${dpStr(before, 2)} before).\n3. Changing the amounts the wrong way round gives ${dpStr(bufferPH(KA_E, 0.0225, 0.0125), 2)}.`,
    });
  }
  {
    const pOHv = -Math.log10(1.8e-5) + Math.log10(0.25 / 0.15);
    const v = 14 - pOHv;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true, applies: ZIM,
      stem: "A basic buffer contains 0.150 mol dm⁻³ ammonia and 0.250 mol dm⁻³ ammonium chloride. Calculate its pOH and hence its pH at 298 K, giving the pH to two decimal places. (data: Kb = 1.8 × 10⁻⁵ mol dm⁻³; pKw = 14.00)",
      value: v, dp: 2,
      wrong: [dpStr(pOHv, 2)],
      hints: ["pOH = pKb + log([NH₄⁺]/[NH₃])."],
      explanation: `1. pKb = −log(1.8 × 10⁻⁵) = ${dpStr(-Math.log10(1.8e-5), 2)}.\n2. pOH = ${dpStr(-Math.log10(1.8e-5), 2)} + log(0.250/0.150) = ${dpStr(pOHv, 2)}.\n3. pH = 14.00 − ${dpStr(pOHv, 2)} = ${dpStr(v, 2)}. Quoting the pOH as the pH is a common slip.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A solution of ethanoic acid on its own is a good buffer.",
    answer: false,
    explanation: "False. It contains plenty of HA but very little CH₃COO⁻, so it cannot remove added H⁺; a salt must be added.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Diluting an acidic buffer with an equal volume of water leaves its pH almost unchanged.",
    answer: true,
    hints: ["Which quantity sets the pH of a buffer?"],
    explanation: "True. The pH depends on the ratio [HA]/[A⁻], and dilution changes both concentrations by the same factor.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each change to an ethanoic acid–ethanoate buffer with what happens.",
    pairs: [
      ["a little HCl(aq) added", "CH₃COO⁻ + H⁺ → CH₃COOH"],
      ["a little NaOH(aq) added", "CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O"],
      ["more sodium ethanoate dissolved", "pH rises (ratio of salt to acid larger)"],
      ["diluted with water", "pH almost unchanged"],
    ],
    hints: ["Think about which reservoir reacts, and the ratio [HA]/[A⁻]."],
    explanation: "Added acid is taken up by the conjugate base and added alkali by the weak acid; pH depends on the ratio [A⁻]/[HA].",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the description of a basic buffer.",
    template: "A basic buffer can be made from aqueous ammonia and {{blank:a}}. Added H⁺ ions react with {{blank:b}}, and added OH⁻ ions react with ammonium ions.",
    blanks: [
      { id: "a", accepted: ["ammonium chloride"], choices: ["ammonium chloride", "sodium chloride", "sodium hydroxide"] },
      { id: "b", accepted: ["ammonia"], choices: ["ammonia", "chloride ions", "water"] },
    ],
    explanation: "NH₃ + H⁺ → NH₄⁺; NH₄⁺ + OH⁻ → NH₃ + H₂O.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain, with equations, how a solution of ethanoic acid and sodium ethanoate keeps its pH almost constant when small amounts of acid or alkali are added.",
    points: [
      "The solution contains large amounts (reservoirs) of both CH₃COOH and CH₃COO⁻, linked by CH₃COOH ⇌ CH₃COO⁻ + H⁺",
      "Added H⁺ reacts with ethanoate: CH₃COO⁻ + H⁺ → CH₃COOH",
      "Added OH⁻ reacts with ethanoic acid: CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O",
      "The ratio [CH₃COOH]/[CH₃COO⁻] changes only slightly, so [H⁺] and pH change very little",
    ],
    modelAnswer: "The buffer contains large amounts of ethanoic acid and of ethanoate ions: CH₃COOH ⇌ CH₃COO⁻ + H⁺. Added H⁺ ions are removed by ethanoate ions, CH₃COO⁻ + H⁺ → CH₃COOH. Added OH⁻ ions are removed by ethanoic acid, CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O. Because both reservoirs are large compared with the amount added, the ratio [CH₃COOH]/[CH₃COO⁻] hardly changes, so [H⁺] = Ka[CH₃COOH]/[CH₃COO⁻] and the pH stay almost constant.",
    hints: ["Give one equation for added acid and one for added alkali."],
    explanation: "Full marks need both reservoirs, both equations and the ratio idea.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define a buffer solution and give the composition of one acidic buffer.",
    points: ["A solution that resists changes in pH when small amounts of acid or alkali are added", "e.g. a weak acid and its salt such as ethanoic acid and sodium ethanoate (any correct pair)"],
    modelAnswer: "A buffer solution resists changes in pH when small amounts of acid or alkali are added. Example: ethanoic acid with sodium ethanoate.",
    explanation: "Definition plus a correct weak acid–salt pair.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3, applies: ZIM,
    stem: "Explain how soils resist changes in pH, and why farmers still add lime to some fields.",
    points: ["Soils contain weak acids (from humus) and clay or carbonate particles that take up or release H⁺, so they act as buffers", "Added acid (from fertilisers or acid rain) is absorbed with little change in pH while this capacity lasts", "Once the buffering capacity is used up the soil becomes acidic, so lime (CaCO₃ or CaO) is added to neutralise the acid"],
    modelAnswer: "Soil contains weak organic acids from humus, and clay and carbonate particles that can take up or give out H⁺ ions, so it behaves like a buffer and its pH changes only slowly when acids are added. Long use of acidic fertilisers or acid rain eventually uses up this capacity and the soil becomes too acidic for crops such as maize, so farmers add lime, a base, to neutralise the excess acid.",
    hints: ["Buffer capacity is limited."],
    explanation: "Soil buffering is a ZIMSEC example of buffer capacity in action.",
  });
  // Structured: a buffer made by partial neutralisation
  {
    const Ka = 1.35e-5;
    const nA = molesFromSolution(60, 0.15), nB = molesFromSolution(30, 0.1);
    const pH1 = bufferPH(Ka, nA - nB, nB);
    const nH = molesFromSolution(1.0, 0.4);
    const pH2 = bufferPH(Ka, nA - nB + nH, nB - nH);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`Nyasha prepares a buffer by adding 30.0 cm³ of 0.100 mol dm⁻³ sodium hydroxide to 60.0 cm³ of 0.150 mol dm⁻³ propanoic acid, $\ce{CH3CH2COOH}$. (data: Ka of propanoic acid = 1.35 × 10⁻⁵ mol dm⁻³)`,
      parts: [
        P.group({ label: "(a)", stem: "Calculate the amount, in mol, present in the buffer of:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "propanoic acid;", value: nA - nB, sf: 3, unit: "mol", wrong: [nA], explanation: `${sciStr(nA, 3)} − ${sciStr(nB, 3)} = ${sciStr(nA - nB, 3)} mol.` }),
          P.num({ label: "(ii)", marks: 1, stem: "propanoate ions.", value: nB, sf: 3, unit: "mol", explanation: `Equal to the NaOH added: ${sciStr(nB, 3)} mol.` }),
        ] }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the pH of the buffer, to two decimal places.", value: pH1, dp: 2, wrong: [dpStr(bufferPH(Ka, nB, nA - nB), 2)], explanation: `[H⁺] = 1.35 × 10⁻⁵ × ${sciStr(nA - nB, 3)}/${sciStr(nB, 3)} = ${sciStr(Ka * (nA - nB) / nB, 3)} mol dm⁻³; pH = ${dpStr(pH1, 2)}.` }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain, with equations, how this buffer resists changes in pH.", points: ["Contains large amounts of both CH₃CH₂COOH and CH₃CH₂COO⁻", "Added H⁺: CH₃CH₂COO⁻ + H⁺ → CH₃CH₂COOH", "Added OH⁻: CH₃CH₂COOH + OH⁻ → CH₃CH₂COO⁻ + H₂O; the ratio [acid]/[salt] changes little"], modelAnswer: "The buffer holds large amounts of propanoic acid and propanoate ions. Added H⁺ reacts with propanoate (CH₃CH₂COO⁻ + H⁺ → CH₃CH₂COOH) and added OH⁻ reacts with the acid (CH₃CH₂COOH + OH⁻ → CH₃CH₂COO⁻ + H₂O), so the ratio of acid to salt, and therefore the pH, hardly changes." }),
        P.num({ label: "(d)", marks: 2, stem: "1.00 cm³ of 0.400 mol dm⁻³ hydrochloric acid is added to the buffer. Calculate the new pH, to two decimal places.", value: pH2, dp: 2, wrong: [dpStr(bufferPH(Ka, nA - nB - nH, nB + nH), 2)], explanation: `H⁺ added = ${sciStr(nH, 3)} mol: acid ${sciStr(nA - nB + nH, 3)} mol, propanoate ${sciStr(nB - nH, 3)} mol; pH = ${dpStr(pH2, 2)}, a fall of only ${dpStr(pH1 - pH2, 2)}.` }),
        P.mcq({ label: "(e)", marks: 1, stem: "What volume of the 0.100 mol dm⁻³ sodium hydroxide should Nyasha have added to 60.0 cm³ of the acid to make a buffer with pH equal to the pKa of propanoic acid?", options: [
          ["45.0 cm³", "Correct: half of the 0.00900 mol of acid is converted, so [HA] = [A⁻]."],
          ["90.0 cm³", "This neutralises all the acid: no HA left, so it is not a buffer."],
          ["22.5 cm³", "This converts only a quarter of the acid, giving pH below pKa."],
          ["30.0 cm³", "This is the volume actually used: a third of the acid is converted, so pH is below pKa."],
        ], answer: "A", explanation: "Half-neutralisation gives equal amounts of acid and salt." }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why the pH would change greatly if 20 cm³ of 0.500 mol dm⁻³ hydrochloric acid were added instead.", points: ["20 cm³ of 0.500 mol dm⁻³ HCl contains 0.0100 mol H⁺, more than the 0.00300 mol of propanoate available", "so the conjugate base is used up and excess strong acid remains: the buffer capacity is exceeded"], modelAnswer: "That much acid supplies 0.0100 mol of H⁺, but there is only 0.00300 mol of propanoate to remove it. Once the propanoate is used up the excess H⁺ stays in solution, so the buffering capacity is exceeded and the pH falls sharply." }),
      ],
      hints: ["Subtract the NaOH from the acid to find what is left.", "Use amounts in the Ka expression."],
      explanation: `Acid ${sciStr(nA - nB, 3)} mol, propanoate ${sciStr(nB, 3)} mol; pH ${dpStr(pH1, 2)}; after adding HCl, pH ${dpStr(pH2, 2)}; 45.0 cm³ of NaOH would give pH = pKa.`,
    });
  }
  // Structured: blood buffer
  {
    const ratio = 10 ** (7.35 - 6.1);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`Human blood is buffered mainly by carbonic acid and hydrogencarbonate ions:

$\ce{CO2(aq) + H2O(l) <=> H2CO3(aq) <=> H+(aq) + HCO3-(aq)}$

Take pKa for $\ce{H2CO3}$ in blood as 6.10 (data).`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "State which species acts as the weak acid and which as its conjugate base in this buffer.", points: ["Weak acid H₂CO₃ (carbonic acid); conjugate base HCO₃⁻ (hydrogencarbonate)"], modelAnswer: "H₂CO₃ is the weak acid; HCO₃⁻ is its conjugate base." }),
        P.manual({ label: "(b)", marks: 2, stem: "During hard exercise, lactic acid enters the blood. Explain how the buffer limits the change in pH.", points: ["The extra H⁺ reacts with HCO₃⁻ to form H₂CO₃ (H⁺ + HCO₃⁻ → H₂CO₃)", "H₂CO₃ breaks down to CO₂ and water and the CO₂ is breathed out, so [H⁺] changes very little"], modelAnswer: "H⁺ ions from lactic acid combine with hydrogencarbonate ions to form carbonic acid, which decomposes into carbon dioxide and water; the carbon dioxide is exhaled. The added H⁺ is removed, so the pH falls only slightly." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the ratio [HCO₃⁻] : [H₂CO₃] in blood of pH 7.35, to three significant figures (give the value of [HCO₃⁻]/[H₂CO₃]).", value: ratio, sf: 3, wrong: [sfStr(1 / ratio, 3)], explanation: `pH = pKa + log([HCO₃⁻]/[H₂CO₃]); log ratio = 7.35 − 6.10 = 1.25; ratio = 10¹·²⁵ = ${sfStr(ratio, 3)}.` }),
        P.mcq({ label: "(d)", marks: 1, stem: "A person breathes very fast and deep, removing carbon dioxide from the blood faster than normal. What happens to the pH of the blood?", options: [
          ["It rises.", "Correct: removing CO₂ moves the equilibria to the left, lowering [H⁺]."],
          ["It falls.", "Losing CO₂ removes acid from the system; the pH rises."],
          ["It stays exactly the same.", "Buffers reduce changes but cannot stop them completely."],
          ["It falls to below 7.", "Removing CO₂ makes the blood more alkaline, not acidic."],
        ], answer: "A", explanation: "CO₂ removal pulls H⁺ + HCO₃⁻ → H₂CO₃ → CO₂ + H₂O, lowering [H⁺]." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain how the buffer responds if a small amount of a base enters the blood.", points: ["OH⁻ reacts with H₂CO₃ (or with H⁺): H₂CO₃ + OH⁻ → HCO₃⁻ + H₂O", "More CO₂ dissolves/H₂CO₃ dissociates to replace the H⁺ removed, so the pH rises very little"], modelAnswer: "Added OH⁻ ions react with carbonic acid, H₂CO₃ + OH⁻ → HCO₃⁻ + H₂O. Dissolved carbon dioxide forms more carbonic acid to replace it, so [H⁺] and the pH change very little." }),
      ],
      hints: ["Use pH = pKa + log([HCO₃⁻]/[H₂CO₃]) for (c)."],
      explanation: `H₂CO₃/HCO₃⁻ buffer: added acid is removed by HCO₃⁻ (CO₂ exhaled), added base by H₂CO₃; the ratio [HCO₃⁻]/[H₂CO₃] at pH 7.35 is ${sfStr(ratio, 3)}.`,
    });
  }
  b.card("DEFINITION", "Buffer solution", "A solution that resists changes in pH when small amounts of acid or alkali are added.");
  b.card("FACT", "Making an acidic buffer", "Weak acid + its salt (e.g. CH₃COOH + CH₃COONa), or partly neutralise a weak acid with a strong base.");
  b.card("CONCEPT", "How an acidic buffer works", "Added H⁺: A⁻ + H⁺ → HA. Added OH⁻: HA + OH⁻ → A⁻ + H₂O. The ratio [HA]/[A⁻] changes little.");
  b.card("FORMULA", "pH of an acidic buffer", "[H⁺] = Ka × [HA]/[A⁻]; pH = pKa + log([A⁻]/[HA]). Amounts may replace concentrations.");
  b.card("FACT", "Buffer with [HA] = [A⁻]", "pH = pKa; a buffer works best within about 1 pH unit of its pKa.");
  b.card("FACT", "Blood buffer", "H₂CO₃ ⇌ H⁺ + HCO₃⁻ keeps blood at about pH 7.4; excess CO₂ is breathed out.");
  b.card("FORMULA", "Basic buffer pOH", "pOH = pKb + log([NH₄⁺]/[NH₃]); pH = 14.00 − pOH at 298 K.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Buffer capacity", "Buffers cope only with small additions; once one reservoir is used up, the pH changes sharply.");
  b.card("FACT", "Soil buffering", "Humus acids, clay and carbonates buffer soil pH; lime is added when soils become too acidic.", undefined, { applies: ZIM });
});
