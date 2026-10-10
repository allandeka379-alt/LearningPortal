// W2a: achem.acids.ph-kw (both boards; ZIMSEC Form 5, Cambridge A Level only; pOH is ZIMSEC detail)
import { concept, P, t, ce, ZIM, pH, hFromPH, pOH, pHStrongBase, molesFromSolution, KW, sfStr, dpStr, sciStr, chk } from "../lib.mjs";

concept("achem.acids.ph-kw", { file: "acids/ph-kw", keyPrefix: "acids.ph-kw" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which expression defines the ionic product of water, Kw?",
    options: [
      [t`$[\ce{H+}][\ce{OH-}]$`, "Correct: Kw = [H⁺(aq)][OH⁻(aq)], 1.00 × 10⁻¹⁴ mol² dm⁻⁶ at 298 K."],
      [t`$[\ce{H+}][\ce{OH-}]/[\ce{H2O}]^2$`, "[H₂O] is effectively constant and is absorbed into Kw; it does not appear."],
      [t`$[\ce{H+}] + [\ce{OH-}]$`, "Kw is a product, not a sum."],
      [t`$-\log([\ce{H+}][\ce{OH-}])$`, "That is pKw, not Kw."],
    ],
    answer: "A",
    explanation: "Kw = [H⁺][OH⁻]. Its negative logarithm is pKw (14.00 at 298 K).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A solution of hydrochloric acid has pH 2.0. It is diluted by adding water until its volume is 100 times the original volume. What is the new pH?",
    options: [
      ["4.0", "Correct: [H⁺] falls by a factor of 100 = 10², so the pH rises by 2."],
      ["2.02", "pH is logarithmic: a hundredfold dilution changes pH by 2 whole units."],
      ["200", "pH values do not multiply with dilution; they change by log(dilution factor)."],
      ["0.0", "Dilution lowers [H⁺], so the pH must rise, not fall."],
    ],
    answer: "A",
    explanation: "Each tenfold dilution of a strong acid raises the pH by 1; a hundredfold dilution raises it by 2.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "What is the concentration of hydroxide ions in a solution of pH 11.0 at 298 K?",
    options: [
      ["1.0 × 10⁻³ mol dm⁻³", "Correct: [H⁺] = 10⁻¹¹, so [OH⁻] = 10⁻¹⁴/10⁻¹¹ = 10⁻³ mol dm⁻³."],
      ["1.0 × 10⁻¹¹ mol dm⁻³", "This is [H⁺], not [OH⁻]."],
      ["11.0 mol dm⁻³", "pH is a logarithm, not a concentration."],
      ["1.0 × 10⁻¹⁴ mol dm⁻³", "This is Kw itself."],
    ],
    answer: "A",
    explanation: "pOH = 14.0 − 11.0 = 3.0, so [OH⁻] = 1.0 × 10⁻³ mol dm⁻³.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "The ionisation of water is endothermic. Which statements about pure water are correct?\n\n1. Kw is larger at 333 K than at 298 K.\n2. The pH of pure water at 333 K is less than 7.\n3. Pure water at 333 K is acidic because its pH is below 7.",
    options: [
      ["1 and 2 only", "Correct: Kw rises with temperature, so [H⁺] and the pH change, but [H⁺] still equals [OH⁻]."],
      ["1, 2 and 3", "Statement 3 is false: pure water is always neutral because [H⁺] = [OH⁻]."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 also follows: larger Kw means larger [H⁺] in pure water."],
    ],
    answer: "A",
    hints: ["What does 'neutral' mean in terms of [H⁺] and [OH⁻]?"],
    explanation: "Heating moves H₂O ⇌ H⁺ + OH⁻ to the right, increasing Kw and [H⁺], so the pH falls below 7; [H⁺] = [OH⁻], so the water is neutral.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statements are correct at 298 K?\n\n1. A solution of pH 3 has 100 times the hydrogen ion concentration of a solution of pH 5.\n2. 0.10 mol dm⁻³ sulfuric acid has a lower pH than 0.10 mol dm⁻³ hydrochloric acid.\n3. Hydrochloric acid of concentration 1.0 × 10⁻⁸ mol dm⁻³ has a pH of 8.",
    options: [
      ["1 and 2 only", "Correct: statement 3 ignores the H⁺ from water itself; the solution is very slightly acidic, pH just below 7."],
      ["1, 2 and 3", "Statement 3 is false: diluting an acid can never make it alkaline."],
      ["2 and 3 only", "Statement 1 is true (10² difference) and statement 3 is false."],
      ["1 only", "Statement 2 is also true: sulfuric acid is dibasic, giving more H⁺."],
    ],
    answer: "A",
    hints: ["Can a very dilute acid have pH above 7?"],
    explanation: "Two pH units = 100-fold in [H⁺]. H₂SO₄ gives about twice the [H⁺]. At 10⁻⁸ mol dm⁻³ the acid's H⁺ is less than water's own 10⁻⁷, so pH stays just under 7.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Data: Kw = 4.02 × 10⁻¹⁴ mol² dm⁻⁶ at 318 K. What is the pH of pure water at 318 K?",
    options: [
      [`${dpStr(pH(Math.sqrt(4.02e-14)), 2)}`, "Correct: [H⁺] = √Kw, about 2.0 × 10⁻⁷ mol dm⁻³."],
      ["7.00", "pH 7.00 is neutral only at 298 K, where Kw = 1.00 × 10⁻¹⁴."],
      [`${dpStr(pH(4.02e-14), 2)}`, "This is pKw; the pH is half of it for pure water."],
      [`${dpStr(14 - pH(Math.sqrt(4.02e-14)), 2)}`, "This uses pH + pOH = 14, which only holds at 298 K."],
    ],
    answer: "A",
    hints: ["In pure water [H⁺] = [OH⁻], so [H⁺]² = Kw."],
    explanation: `[H⁺] = √(4.02 × 10⁻¹⁴) = ${sciStr(Math.sqrt(4.02e-14), 3)} mol dm⁻³; pH = ${dpStr(pH(Math.sqrt(4.02e-14)), 2)}.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "Calculate the pH of 0.00500 mol dm⁻³ hydrochloric acid, to two decimal places.",
    value: pH(0.005), dp: 2,
    wrong: [dpStr(-Math.log(0.005), 2)],
    explanation: `HCl is fully dissociated: [H⁺] = 0.00500 mol dm⁻³; pH = −log(0.00500) = ${dpStr(pH(0.005), 2)}. Using ln instead of log₁₀ gives ${dpStr(-Math.log(0.005), 2)}.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "Calculate the pH of 0.0200 mol dm⁻³ sulfuric acid, assuming both protons are fully donated, to two decimal places.",
    value: pH(0.04), dp: 2,
    wrong: [dpStr(pH(0.02), 2)],
    explanation: `[H⁺] = 2 × 0.0200 = 0.0400 mol dm⁻³; pH = −log(0.0400) = ${dpStr(pH(0.04), 2)}. Forgetting the factor of 2 gives ${dpStr(pH(0.02), 2)}.`,
  });
  {
    const v = pHStrongBase(0.035);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the pH of 0.0350 mol dm⁻³ potassium hydroxide at 298 K (Kw = 1.00 × 10⁻¹⁴ mol² dm⁻⁶), to two decimal places.",
      value: v, dp: 2,
      wrong: [dpStr(pOH(0.035), 2)],
      hints: ["Find [OH⁻] first, then use Kw to find [H⁺]."],
      explanation: `1. [OH⁻] = 0.0350 mol dm⁻³ (full dissociation).\n2. [H⁺] = Kw/[OH⁻] = 1.00 × 10⁻¹⁴ ÷ 0.0350 = ${sciStr(KW / 0.035, 3)} mol dm⁻³.\n3. pH = ${dpStr(v, 2)}. Stopping at −log[OH⁻] gives ${dpStr(pOH(0.035), 2)}, which is the pOH.`,
    });
  }
  {
    const v = pHStrongBase(0.005);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Calculate the pH of 0.00250 mol dm⁻³ barium hydroxide, $\ce{Ba(OH)2}$, at 298 K, to two decimal places.`,
      value: v, dp: 2,
      wrong: [dpStr(pHStrongBase(0.0025), 2)],
      hints: ["Each formula unit releases two OH⁻ ions."],
      explanation: `[OH⁻] = 2 × 0.00250 = 0.00500 mol dm⁻³; [H⁺] = 1.00 × 10⁻¹⁴ ÷ 0.00500 = ${sciStr(KW / 0.005, 3)}; pH = ${dpStr(v, 2)}. Forgetting the factor of 2 gives ${dpStr(pHStrongBase(0.0025), 2)}.`,
    });
  }
  {
    const nH = molesFromSolution(30, 0.15), nOH = molesFromSolution(25, 0.12);
    const c = (nH - nOH) / 0.055;
    const v = pH(c);
    const wrongV = pH((nH - nOH) / 0.03);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "30.0 cm³ of 0.150 mol dm⁻³ nitric acid is mixed with 25.0 cm³ of 0.120 mol dm⁻³ sodium hydroxide. Calculate the pH of the mixture, to two decimal places.",
      value: v, dp: 2,
      wrong: [dpStr(wrongV, 2)],
      hints: ["Find the amount of H⁺ left over.", "Divide by the total volume."],
      explanation: `1. n(H⁺) = 0.0300 × 0.150 = ${sciStr(nH, 3)} mol; n(OH⁻) = 0.0250 × 0.120 = ${sciStr(nOH, 3)} mol.\n2. Excess H⁺ = ${sciStr(nH - nOH, 3)} mol.\n3. Total volume = 55.0 cm³, so [H⁺] = ${sciStr(nH - nOH, 3)} ÷ 0.0550 = ${sfStr(c, 3)} mol dm⁻³.\n4. pH = ${dpStr(v, 2)}. Dividing by the acid volume only (30.0 cm³) gives ${dpStr(wrongV, 2)}.`,
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, applies: ZIM,
    stem: "A solution has pH 9.30 at 298 K. Calculate its pOH, to two decimal places.",
    value: 14 - 9.3, dp: 2,
    wrong: ["9.30"],
    explanation: "pH + pOH = 14.00 at 298 K, so pOH = 14.00 − 9.30 = 4.70.",
  });
  {
    const v = pH(Math.sqrt(2.93e-15));
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Data: Kw = 2.93 × 10⁻¹⁵ mol² dm⁻⁶ at 283 K. Calculate the pH of pure water at 283 K, to two decimal places.",
      value: v, dp: 2,
      wrong: ["7.00", dpStr(pH(2.93e-15), 2)],
      hints: ["In pure water, [H⁺] = [OH⁻] = √Kw."],
      explanation: `[H⁺] = √(2.93 × 10⁻¹⁵) = ${sciStr(Math.sqrt(2.93e-15), 3)} mol dm⁻³; pH = ${dpStr(v, 2)}. The water is still neutral; pH is above 7 because Kw is smaller at the lower temperature. 7.00 applies only at 298 K.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Adding a strong acid to water lowers [OH⁻(aq)], because [H⁺][OH⁻] must stay equal to Kw.",
    answer: true,
    explanation: "True. At constant temperature, a rise in [H⁺] is matched by a fall in [OH⁻] so that the product stays equal to Kw.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "The relationship pH + pOH = 14.00 holds at all temperatures.",
    answer: false,
    explanation: "False. pH + pOH = pKw, which equals 14.00 only at 298 K; Kw changes with temperature.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each solution at 298 K with its pH.",
    pairs: [
      ["0.100 mol dm⁻³ HCl", "1.00"],
      ["0.00500 mol dm⁻³ H₂SO₄", "2.00"],
      ["0.00100 mol dm⁻³ HNO₃", "3.00"],
      ["0.0100 mol dm⁻³ NaOH", "12.00"],
    ],
    extraRight: ["2.30"],
    hints: ["Remember the dibasic acid and use Kw for the alkali."],
    explanation: "HCl: [H⁺] 0.100, pH 1.00. H₂SO₄: [H⁺] = 2 × 0.00500 = 0.0100, pH 2.00 (2.30 forgets the factor of 2). HNO₃: pH 3.00. NaOH: [H⁺] = 10⁻¹², pH 12.00.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "pH is defined as minus the {{blank:a}} of the hydrogen ion concentration. Diluting a strong acid ten times {{blank:b}} its pH by one unit.",
    blanks: [
      { id: "a", accepted: ["logarithm to base 10"], choices: ["logarithm to base 10", "square root", "reciprocal"] },
      { id: "b", accepted: ["raises"], choices: ["raises", "lowers", "does not change"] },
    ],
    explanation: "pH = −log₁₀[H⁺]; ten times less H⁺ means pH one unit higher.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the pH of pure water decreases as the temperature rises, and why the water is still neutral.",
    points: ["The ionisation H₂O ⇌ H⁺ + OH⁻ is endothermic", "so raising the temperature moves the position right, increasing Kw and [H⁺], so pH falls", "The water stays neutral because [H⁺] still equals [OH⁻]"],
    modelAnswer: "The ionisation of water is endothermic, so at a higher temperature the equilibrium H₂O ⇌ H⁺ + OH⁻ moves to the right. Kw and [H⁺] increase, so the pH falls below 7. Because every H⁺ formed is accompanied by an OH⁻, [H⁺] = [OH⁻] and the water remains neutral.",
    hints: ["Use Le Chatelier and the definition of neutral."],
    explanation: "Neutral means [H⁺] = [OH⁻], not pH 7.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define pH and state the value of Kw at 298 K, with its units.",
    points: ["pH = −log₁₀[H⁺(aq)] (concentration in mol dm⁻³)", "Kw = 1.00 × 10⁻¹⁴ mol² dm⁻⁶ at 298 K"],
    modelAnswer: "pH = −log₁₀[H⁺(aq)]; Kw = [H⁺][OH⁻] = 1.00 × 10⁻¹⁴ mol² dm⁻⁶ at 298 K.",
    explanation: "Both are standard definitions.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 2,
    stem: "A student calculates the pH of 1.0 × 10⁻⁹ mol dm⁻³ hydrochloric acid as 9.0. Explain why this is wrong and state the approximate pH.",
    points: ["The H⁺ from the ionisation of water (1.0 × 10⁻⁷ mol dm⁻³) is much larger than that from the acid, so it cannot be ignored", "The pH is very slightly below 7 (about 7.0); an acid cannot be alkaline"],
    modelAnswer: "At this concentration the acid adds far fewer H⁺ ions than water itself provides (10⁻⁷ mol dm⁻³), so −log of the acid concentration is meaningless. The solution is essentially water with a trace of acid: its pH is just below 7.",
    hints: ["Compare the acid's [H⁺] with water's own [H⁺]."],
    explanation: "The simple method fails for extremely dilute acids.",
  });
  // Structured: titration of HCl with NaOH, point by point
  {
    const vAcid = 20.0, cAcid = 0.08, cBase = 0.1;
    const nAcid = molesFromSolution(vAcid, cAcid);
    const pH0 = pH(cAcid);
    const vEq = (nAcid / cBase) * 1000;
    const v10 = 10.0, v25 = 20.0;
    const pH10 = pH((nAcid - molesFromSolution(v10, cBase)) / ((vAcid + v10) / 1000));
    const pH25 = pHStrongBase((molesFromSolution(v25, cBase) - nAcid) / ((vAcid + v25) / 1000));
    const pH25w = pHStrongBase((molesFromSolution(v25, cBase) - nAcid) / (v25 / 1000));
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "Chipo adds 0.100 mol dm⁻³ sodium hydroxide from a burette to 20.0 cm³ of 0.0800 mol dm⁻³ hydrochloric acid at 298 K, measuring the pH with a meter. (Kw = 1.00 × 10⁻¹⁴ mol² dm⁻⁶)",
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the pH of the acid before any alkali is added, to two decimal places.", value: pH0, dp: 2, explanation: `[H⁺] = 0.0800 mol dm⁻³; pH = ${dpStr(pH0, 2)}.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the volume of sodium hydroxide, in cm³, needed to reach the equivalence point, to three significant figures.", value: vEq, sf: 3, unit: "cm³", wrong: [20], explanation: `n(HCl) = ${sciStr(nAcid, 3)} mol; V = ${sciStr(nAcid, 3)} ÷ 0.100 × 1000 = ${sfStr(vEq, 3)} cm³.` }),
        P.num({ label: "(c)", marks: 3, stem: "Calculate the pH after 10.0 cm³ of sodium hydroxide has been added, to two decimal places.", value: pH10, dp: 2, wrong: [dpStr(pH((nAcid - molesFromSolution(v10, cBase)) / (vAcid / 1000)), 2)], explanation: `Excess H⁺ = ${sciStr(nAcid, 3)} − ${sciStr(molesFromSolution(v10, cBase), 3)} = ${sciStr(nAcid - molesFromSolution(v10, cBase), 3)} mol in 30.0 cm³; [H⁺] = ${sfStr((nAcid - molesFromSolution(v10, cBase)) / 0.03, 3)} mol dm⁻³; pH = ${dpStr(pH10, 2)}. Dividing by 20.0 cm³ only gives ${dpStr(pH((nAcid - molesFromSolution(v10, cBase)) / (vAcid / 1000)), 2)}.` }),
        P.num({ label: "(d)", marks: 3, stem: "Calculate the pH after 20.0 cm³ of sodium hydroxide has been added, to two decimal places.", value: pH25, dp: 2, wrong: [dpStr(pH25w, 2)], explanation: `Excess OH⁻ = ${sciStr(molesFromSolution(v25, cBase), 3)} − ${sciStr(nAcid, 3)} = ${sciStr(molesFromSolution(v25, cBase) - nAcid, 3)} mol in 40.0 cm³; [OH⁻] = ${sfStr((molesFromSolution(v25, cBase) - nAcid) / 0.04, 3)} mol dm⁻³; [H⁺] = Kw/[OH⁻]; pH = ${dpStr(pH25, 2)}. Using 20.0 cm³ instead of the total 40.0 cm³ gives ${dpStr(pH25w, 2)}.` }),
        P.mcq({ label: "(e)", marks: 1, stem: "What is the pH at the equivalence point?", options: [
          ["7.00", "Correct: NaCl solution is neutral at 298 K (strong acid + strong base)."],
          ["above 7, because sodium hydroxide is a strong base", "A strong acid and a strong base are both completely used up; the salt does not hydrolyse."],
          ["below 7, because hydrochloric acid is a strong acid", "At equivalence neither is in excess."],
          [`${dpStr(pH0, 2)}, because no H⁺ has been removed`, "At equivalence all the H⁺ has been neutralised."],
        ], answer: "A", explanation: "Strong acid–strong base: pH 7.00 at equivalence at 298 K." }),
        P.manual({ label: "(f)", marks: 2, stem: "Describe how the pH changes as alkali is added close to the equivalence point, and explain why.", points: ["The pH rises very steeply (by several units) for a very small volume (about one drop) of alkali", "because near equivalence the remaining H⁺ (or excess OH⁻) is tiny, so a small addition changes [H⁺] by a large factor (pH is logarithmic)"], modelAnswer: "Near the equivalence point the pH jumps sharply, from about 3 to about 11, as one or two drops are added. So little H⁺ is left that a tiny volume of alkali changes [H⁺] by a factor of thousands, and pH is a logarithmic scale." }),
      ],
      hints: ["Find the excess amount and divide by the total volume each time."],
      explanation: `pH ${dpStr(pH0, 2)} at the start; equivalence at ${sfStr(vEq, 3)} cm³; pH ${dpStr(pH10, 2)} after 10.0 cm³ and ${dpStr(pH25, 2)} after 20.0 cm³; pH 7.00 at equivalence with a steep rise around it.`,
    });
  }
  // Structured: Kw and temperature
  {
    const data = [[283, 2.93e-15], [298, 1.0e-14], [313, 2.92e-14], [333, 9.55e-14]];
    const pH313 = pH(Math.sqrt(2.92e-14));
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: `The table gives values of Kw at different temperatures (data).

| Temperature / K | ${data.map(([T]) => T).join(" | ")} |
|---|---|---|---|---|
| Kw / mol² dm⁻⁶ | ${data.map(([, k]) => sciStr(k, 3)).join(" | ")} |`,
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Use the data to state whether the ionisation of water is exothermic or endothermic.", accepted: ["endothermic", "it is endothermic"], wrong: ["exothermic"], explanation: "Kw increases with temperature." }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain your answer to (a).", points: ["Kw increases as the temperature increases, so the position of H₂O ⇌ H⁺ + OH⁻ moves right on heating", "A rise in temperature favours the endothermic direction, so ionisation is endothermic"], modelAnswer: "Kw rises with temperature, so heating moves the ionisation equilibrium to the right. By Le Chatelier, heating favours the endothermic direction, so the forward reaction (ionisation) is endothermic." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the pH of pure water at 313 K, to two decimal places.", value: pH313, dp: 2, wrong: ["7.00"], explanation: `[H⁺] = √(2.92 × 10⁻¹⁴) = ${sciStr(Math.sqrt(2.92e-14), 3)} mol dm⁻³; pH = ${dpStr(pH313, 2)}.` }),
        P.manual({ label: "(d)", marks: 2, stem: "A student says that pure water at 313 K is acidic. Explain why this is incorrect.", points: ["In pure water [H⁺] = [OH⁻] at every temperature", "Neutral means [H⁺] = [OH⁻]; pH 7 is the neutral value only at 298 K"], modelAnswer: "Each water molecule that ionises gives one H⁺ and one OH⁻, so [H⁺] = [OH⁻] and the water is neutral. pH 7 is the neutral point only at 298 K; at 313 K the neutral pH is lower." }),
        P.mcq({ label: "(e)", marks: 1, stem: "What is the pOH of pure water at 313 K?", options: [
          [`${dpStr(pH313, 2)}`, "Correct: [OH⁻] = [H⁺], so pOH = pH in pure water."],
          [`${dpStr(14 - pH313, 2)}`, "pH + pOH = 14 only at 298 K."],
          ["7.00", "This is the value at 298 K only."],
          [`${dpStr(-Math.log10(2.92e-14), 2)}`, "This is pKw, the sum of pH and pOH."],
        ], answer: "A", explanation: "In pure water pOH = pH = ½pKw." }),
      ],
      hints: ["How does Kw change as the temperature rises?"],
      explanation: `Kw rises with temperature, so ionisation is endothermic; at 313 K pure water has pH ${dpStr(pH313, 2)} and is still neutral.`,
    });
  }
  b.card("DEFINITION", "pH", "pH = −log₁₀[H⁺(aq)]; [H⁺] = 10⁻ᵖᴴ (mol dm⁻³).");
  b.card("DEFINITION", "Ionic product of water, Kw", "Kw = [H⁺][OH⁻] = 1.00 × 10⁻¹⁴ mol² dm⁻⁶ at 298 K.");
  b.card("FORMULA", "pH, pOH and pKw", "pH + pOH = pKw = 14.00 at 298 K (pOH = −log[OH⁻]).");
  b.card("FORMULA", "pH of a strong alkali", "[H⁺] = Kw/[OH⁻], then pH = −log[H⁺] (or pH = 14.00 − pOH at 298 K).");
  b.card("CONCEPT", "pH after mixing", "Find moles of H⁺ and OH⁻, subtract, divide the excess by the TOTAL volume, then find pH.");
  b.card("FACT", "Sulfuric acid and barium hydroxide", "Dibasic acid and di-hydroxide base: [H⁺] = 2c for H₂SO₄; [OH⁻] = 2c for Ba(OH)₂.");
  b.card("CONCEPT", "Kw and temperature", "Ionisation of water is endothermic: Kw rises with T, so neutral pH falls below 7, but water stays neutral.");
  b.card("CONCEPT", "One pH unit", "A change of 1 pH unit = a tenfold change in [H⁺].");
  b.card("CONCEPT", "Very dilute acids", "Below about 10⁻⁶ mol dm⁻³, H⁺ from water matters; an acid never has pH above 7.");
});
