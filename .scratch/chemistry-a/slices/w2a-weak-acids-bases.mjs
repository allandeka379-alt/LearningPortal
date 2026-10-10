// W2a: achem.acids.weak-acids-bases (both boards; ZIMSEC Form 5, Cambridge A Level only; Kb and pKb ZIMSEC only)
import { concept, P, t, ce, ZIM, pH, hFromPH, pKa, kaFromPH, pHWeakAcid, KW, sfStr, dpStr, sciStr, rnd } from "../lib.mjs";

concept("achem.acids.weak-acids-bases", { file: "acids/weak-acids-bases", keyPrefix: "acids.weak-acids-bases" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: t`Which is the correct expression for the acid dissociation constant of ethanoic acid?`,
    options: [
      [t`$\dfrac{[\ce{CH3COO-}][\ce{H+}]}{[\ce{CH3COOH}]}$`, "Correct: products over the undissociated acid; water is not included."],
      [t`$\dfrac{[\ce{CH3COOH}]}{[\ce{CH3COO-}][\ce{H+}]}$`, "This is upside down."],
      [t`$\dfrac{[\ce{CH3COO-}][\ce{H3O+}]}{[\ce{CH3COOH}][\ce{H2O}]}$`, "Water is the solvent; its constant concentration is absorbed into Ka."],
      [t`$[\ce{CH3COO-}][\ce{H+}]$`, "The concentration of undissociated acid must appear in the denominator."],
    ],
    answer: "A",
    explanation: "Ka = [CH₃COO⁻][H⁺]/[CH₃COOH], with units mol dm⁻³.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which acid is the strongest? (data: pKa values)",
    options: [
      ["chloroethanoic acid, pKa 2.86", "Correct: the smallest pKa means the largest Ka, the strongest acid."],
      ["ethanoic acid, pKa 4.76", "A larger pKa means a weaker acid."],
      ["benzoic acid, pKa 4.20", "Its pKa is larger than 2.86, so it is weaker."],
      ["phenol, pKa 9.89", "The largest pKa: the weakest acid of the four."],
    ],
    answer: "A",
    explanation: "pKa = −log Ka, so the smaller the pKa, the larger Ka and the stronger the acid.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A solution of a weak acid is diluted tenfold with water at constant temperature. Which statement is correct?",
    options: [
      ["Its percentage dissociation increases and its pH increases.", "Correct: dilution favours the side with more particles, yet [H⁺] still falls overall."],
      ["Its percentage dissociation decreases and its pH increases.", "Dilution moves HA ⇌ H⁺ + A⁻ to the right, increasing the fraction dissociated."],
      ["Its percentage dissociation increases and its pH decreases.", "[H⁺] falls on dilution, so the pH rises."],
      ["Its Ka increases and its pH decreases.", "Ka depends only on temperature."],
    ],
    answer: "A",
    hints: ["Le Chatelier: which side has more dissolved particles?"],
    explanation: "On dilution the equilibrium moves right (more ions), so the percentage dissociation rises, but [H⁺] is still lower, so pH rises (by 0.5 for a tenfold dilution).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements are approximations used when calculating the pH of a weak acid HA from Ka and its concentration c?\n\n1. [H⁺] = [A⁻], because ionisation of water is negligible.\n2. The equilibrium concentration of HA is approximately equal to c.\n3. The acid is fully dissociated.",
    options: [
      ["1 and 2 only", "Correct: the third statement would make it a strong acid."],
      ["1, 2 and 3", "Statement 3 contradicts the idea of a weak acid."],
      ["2 and 3 only", "Statement 1 is used; statement 3 is not."],
      ["1 only", "Statement 2 is also assumed: dissociation is so slight that [HA] ≈ c."],
    ],
    answer: "A",
    hints: ["What would 'fully dissociated' make the acid?"],
    explanation: "With [H⁺] = [A⁻] and [HA] ≈ c, Ka = [H⁺]²/c, so [H⁺] = √(Ka c).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "Which statements about the weak base ammonia and its conjugate acid are correct at 298 K?\n\n1. Kb(NH₃) × Ka(NH₄⁺) = Kw\n2. pKa(NH₄⁺) + pKb(NH₃) = 14.00\n3. A larger Kb for a base means a stronger conjugate acid.",
    options: [
      ["1 and 2 only", "Correct: Ka × Kb = Kw, so a stronger base has a weaker conjugate acid."],
      ["1, 2 and 3", "Statement 3 is false: Ka = Kw/Kb, so a larger Kb gives a smaller Ka."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 also holds: take −log of statement 1."],
    ],
    answer: "A",
    hints: ["Write Ka = Kw/Kb."],
    explanation: "For a conjugate pair Ka × Kb = Kw (1.00 × 10⁻¹⁴ at 298 K) and pKa + pKb = 14.00. A stronger base has a weaker conjugate acid.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Solutions of hydrochloric acid and ethanoic acid have the same pH. Which statement is correct?",
    options: [
      ["The ethanoic acid solution is much more concentrated.", "Correct: a weak acid needs a far higher concentration to give the same [H⁺]."],
      ["The two solutions have the same concentration.", "At equal concentration the weak acid has the higher pH."],
      ["The hydrochloric acid solution is much more concentrated.", "The strong acid releases all its H⁺, so it needs the lower concentration."],
      ["Both acids are fully dissociated in these solutions.", "Ethanoic acid is only partially dissociated at any normal concentration."],
    ],
    answer: "A",
    hints: ["Same pH means same [H⁺]."],
    explanation: "Same pH = same [H⁺]. Only a small fraction of ethanoic acid dissociates, so its concentration must be much larger.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "The pH of 0.100 mol dm⁻³ ethanoic acid is 2.88. What is the pH of 0.00100 mol dm⁻³ ethanoic acid, using the usual approximation?",
    options: [
      ["3.88", "Correct: [H⁺] ∝ √c, so a hundredfold dilution divides [H⁺] by 10 and raises the pH by 1."],
      ["4.88", "This treats the acid as strong (pH rising by 2 for a hundredfold dilution)."],
      ["2.88", "Dilution must lower [H⁺] and raise the pH."],
      ["3.38", "This is the change for a tenfold dilution (0.5), not a hundredfold one."],
    ],
    answer: "A",
    hints: ["[H⁺] = √(Ka c): how does [H⁺] change when c falls by 100?"],
    explanation: "√(1/100) = 1/10, so [H⁺] falls tenfold and the pH rises by exactly 1: 2.88 → 3.88.",
  });
  {
    const v = pHWeakAcid(1.74e-5, 0.2);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Calculate the pH of 0.200 mol dm⁻³ ethanoic acid, to two decimal places. (data: Ka = 1.74 × 10⁻⁵ mol dm⁻³)",
      value: v, dp: 2,
      wrong: [dpStr(pH(0.2), 2), dpStr(pH(1.74e-5 * 0.2), 2)],
      hints: ["[H⁺] = √(Ka × c)."],
      explanation: `[H⁺] = √(1.74 × 10⁻⁵ × 0.200) = ${sciStr(Math.sqrt(1.74e-5 * 0.2), 3)} mol dm⁻³; pH = ${dpStr(v, 2)}. Treating the acid as strong gives ${dpStr(pH(0.2), 2)}; forgetting the square root gives ${dpStr(pH(1.74e-5 * 0.2), 2)}.`,
    });
  }
  {
    const Ka = kaFromPH(3.06, 0.05);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A student measured the pH of 0.0500 mol dm⁻³ propanoic acid, $\ce{CH3CH2COOH}$, as 3.06. Calculate Ka for propanoic acid, in mol dm⁻³, to three significant figures.`,
      value: Ka, sf: 3, unit: "mol/dm³",
      wrong: [hFromPH(3.06) / 0.05],
      hints: ["Find [H⁺] from the pH first.", "Assume [H⁺] = [CH₃CH₂COO⁻] and [acid] ≈ 0.0500."],
      explanation: `1. [H⁺] = 10⁻³·⁰⁶ = ${sciStr(hFromPH(3.06), 3)} mol dm⁻³ = [CH₃CH₂COO⁻].\n2. Ka = [H⁺]²/c = (${sciStr(hFromPH(3.06), 3)})² ÷ 0.0500 = ${sciStr(Ka, 3)} mol dm⁻³.\n3. Forgetting to square [H⁺] gives ${sciStr(hFromPH(3.06) / 0.05, 3)}.`,
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "Lactic acid, found in sour milk, has Ka = 1.38 × 10⁻⁴ mol dm⁻³ (data). Calculate its pKa, to two decimal places.",
    value: pKa(1.38e-4), dp: 2,
    wrong: [dpStr(-Math.log(1.38e-4), 2)],
    explanation: `pKa = −log(1.38 × 10⁻⁴) = ${dpStr(pKa(1.38e-4), 2)}. Using ln gives ${dpStr(-Math.log(1.38e-4), 2)}.`,
  });
  {
    const h = Math.sqrt(1.78e-4 * 0.1);
    const pct = (h / 0.1) * 100;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the percentage dissociation of methanoic acid in a 0.100 mol dm⁻³ solution, to three significant figures. (data: Ka = 1.78 × 10⁻⁴ mol dm⁻³)",
      value: pct, sf: 3, unit: "%",
      wrong: [sfStr((1.78e-4 * 0.1) / 0.1 * 100, 3)],
      hints: ["Find [H⁺] first, then compare it with the initial concentration."],
      explanation: `1. [H⁺] = √(1.78 × 10⁻⁴ × 0.100) = ${sciStr(h, 3)} mol dm⁻³.\n2. % dissociation = ${sciStr(h, 3)} ÷ 0.100 × 100 = ${sfStr(pct, 3)}%.\n3. The value is small, which supports the approximation [HCOOH] ≈ 0.100 mol dm⁻³.`,
    });
  }
  {
    const v = pHWeakAcid(1.3e-10, 0.1);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Calculate the pH of a 0.100 mol dm⁻³ solution of phenol, $\ce{C6H5OH}$, to two decimal places. (data: Ka = 1.30 × 10⁻¹⁰ mol dm⁻³)`,
      value: v, dp: 2,
      wrong: [dpStr(pH(1.3e-11), 2)],
      hints: ["Use [H⁺] = √(Ka c)."],
      explanation: `[H⁺] = √(1.30 × 10⁻¹⁰ × 0.100) = ${sciStr(Math.sqrt(1.3e-11), 3)} mol dm⁻³; pH = ${dpStr(v, 2)}. Phenol is a very weak acid. Forgetting the square root gives ${dpStr(pH(1.3e-11), 2)}.`,
    });
  }
  {
    const oh = Math.sqrt(1.8e-5 * 0.05);
    const v = 14 + Math.log10(oh);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true, applies: ZIM,
      stem: "Calculate the pH of 0.0500 mol dm⁻³ aqueous ammonia at 298 K, to two decimal places. (data: Kb = 1.8 × 10⁻⁵ mol dm⁻³; pKw = 14.00)",
      value: v, dp: 2,
      wrong: [dpStr(-Math.log10(oh), 2)],
      hints: ["[OH⁻] = √(Kb c); then find pOH."],
      explanation: `1. [OH⁻] = √(1.8 × 10⁻⁵ × 0.0500) = ${sciStr(oh, 3)} mol dm⁻³.\n2. pOH = −log(${sciStr(oh, 3)}) = ${dpStr(-Math.log10(oh), 2)}.\n3. pH = 14.00 − ${dpStr(-Math.log10(oh), 2)} = ${dpStr(v, 2)}. Stopping at the pOH gives ${dpStr(-Math.log10(oh), 2)}.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Acid A has pKa 3.2 and acid B has pKa 4.8. At the same concentration, a solution of acid A has the lower pH.",
    answer: true,
    explanation: "True. Smaller pKa means larger Ka, a stronger acid, more H⁺ and a lower pH.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Diluting a solution of a weak acid changes the value of its Ka.",
    answer: false,
    explanation: "False. Ka depends only on temperature; dilution changes the percentage dissociation and the pH, not Ka.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the units of Ka.",
    accepted: ["mol dm-3", "mol dm⁻³", "mol/dm3", "mol/dm³", "mol dm^-3", "moldm-3", "M"],
    normalise: ["trim", "lowercase", "collapse_whitespace"],
    wrong: ["mol2 dm-6"],
    explanation: "Ka = [H⁺][A⁻]/[HA]: (mol dm⁻³)² ÷ mol dm⁻³ = mol dm⁻³.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each quantity with its definition or relationship.",
    pairs: [
      ["Ka", "[H⁺][A⁻]/[HA]"],
      ["pKa", "−log₁₀ Ka"],
      ["[H⁺] of a weak acid", "√(Ka × c)"],
      ["percentage dissociation", "[H⁺] ÷ c × 100"],
    ],
    extraRight: ["Ka ÷ c"],
    hints: ["Which expression has a square root?"],
    explanation: "Ka is the equilibrium expression; pKa its negative log; [H⁺] = √(Ka c) with the usual assumptions; percentage dissociation compares [H⁺] with the initial concentration.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "State the two assumptions made when [H⁺] of a weak acid HA is calculated as √(Ka × c).",
    points: ["[H⁺] = [A⁻]: all the H⁺ comes from the acid (ionisation of water is negligible)", "[HA] at equilibrium ≈ initial concentration c, because the acid dissociates only slightly"],
    modelAnswer: "The H⁺ from the ionisation of water is negligible, so [H⁺] = [A⁻]; and so little of the acid dissociates that the equilibrium concentration of HA equals its initial concentration.",
    hints: ["One assumption is about where H⁺ comes from; the other about how much HA is left."],
    explanation: "Both assumptions are needed to reduce Ka to [H⁺]²/c.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why diluting a weak acid increases its percentage dissociation.",
    points: ["Dilution lowers the concentrations of all species in HA ⇌ H⁺ + A⁻", "The position moves to the right, the side with more dissolved particles, to oppose the change (Ka constant)"],
    modelAnswer: "Adding water lowers the total concentration of dissolved particles. By Le Chatelier the equilibrium HA ⇌ H⁺ + A⁻ moves to the side with more particles, the right, so a larger fraction of HA dissociates (Ka stays constant).",
    hints: ["Count particles on each side."],
    explanation: "Equivalently, Ka = α²c/(1 − α), so smaller c needs larger α.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 2,
    stem: "The approximation [HA] ≈ c is used to calculate the pH of 0.00100 mol dm⁻³ chloroethanoic acid (data: Ka = 1.38 × 10⁻³ mol dm⁻³). Explain why the answer will be unreliable.",
    points: ["Ka is close to (larger than) c, so a large fraction of the acid dissociates (√(Ka/c) > 100% by the formula)", "so [HA] is much less than c and the approximation [HA] ≈ c is invalid"],
    modelAnswer: "The approximation assumes only a small fraction of the acid dissociates. Here Ka is larger than c, so the formula predicts more H⁺ than there is acid: a large fraction dissociates, [HA] is much smaller than c, and the simple method fails.",
    hints: ["Compare Ka with c."],
    explanation: "The square-root method works only when the percentage dissociation is small.",
  });
  // Structured: Ka from pH of several dilutions
  {
    const KaTrue = 3.2e-5;
    const cs = [0.1, 0.04, 0.01];
    const pHs = cs.map((c) => rnd(pHWeakAcid(KaTrue, c), 2));
    const Ka = kaFromPH(pHs[0], 0.1);
    const pk = pKa(Ka);
    const pct1 = (hFromPH(pHs[0]) / 0.1) * 100;
    const pct3 = (hFromPH(pHs[2]) / 0.01) * 100;
    const pred = pHWeakAcid(Ka, 0.05);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Sipho measured the pH of three solutions of a weak monobasic acid, HX, at 298 K.

| [HX] / mol dm⁻³ | ${cs.map((c) => sfStr(c, 3)).join(" | ")} |
|---|---|---|---|
| pH | ${pHs.map((p) => dpStr(p, 2)).join(" | ")} |`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Use the result for 0.100 mol dm⁻³ to calculate Ka for HX, in mol dm⁻³, to three significant figures.", value: Ka, sf: 3, unit: "mol/dm³", wrong: [hFromPH(pHs[0]) / 0.1], explanation: `[H⁺] = 10^−${dpStr(pHs[0], 2)} = ${sciStr(hFromPH(pHs[0]), 3)}; Ka = [H⁺]²/0.100 = ${sciStr(Ka, 3)} mol dm⁻³.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate pKa for HX, to two decimal places.", value: pk, dp: 2, explanation: `pKa = −log(${sciStr(Ka, 3)}) = ${dpStr(pk, 2)}.` }),
        P.group({ label: "(c)", stem: "Calculate the percentage dissociation of HX, to three significant figures:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "in 0.100 mol dm⁻³ HX;", value: pct1, sf: 3, unit: "%", explanation: `${sciStr(hFromPH(pHs[0]), 3)} ÷ 0.100 × 100 = ${sfStr(pct1, 3)}%.` }),
          P.num({ label: "(ii)", marks: 1, stem: "in 0.0100 mol dm⁻³ HX.", value: pct3, sf: 3, unit: "%", explanation: `[H⁺] = 10^−${dpStr(pHs[2], 2)} = ${sciStr(hFromPH(pHs[2]), 3)}; ÷ 0.0100 × 100 = ${sfStr(pct3, 3)}%.` }),
        ] }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain the trend in percentage dissociation shown by your answers to (c).", points: ["Percentage dissociation increases as the acid is diluted", "Dilution moves HX ⇌ H⁺ + X⁻ to the right (more particles), while Ka stays the same"], modelAnswer: "The more dilute solution is more dissociated. Diluting lowers the concentration of every species, so the equilibrium HX ⇌ H⁺ + X⁻ moves towards the side with more particles, the right, keeping Ka constant." }),
        P.mcq({ label: "(e)", marks: 1, stem: "Ethanoic acid has pKa 4.76 (data). How does HX compare with ethanoic acid?", options: [
          ["HX is a stronger acid.", `Correct: pKa(HX) = ${dpStr(pk, 2)} is smaller than 4.76.`],
          ["HX is a weaker acid.", "A smaller pKa means a stronger acid."],
          ["They have the same strength.", "The pKa values differ."],
          ["They cannot be compared without concentrations.", "Ka and pKa compare strengths directly."],
        ], answer: "A", explanation: "Smaller pKa, larger Ka, stronger acid." }),
        P.manual({ label: "(f)", marks: 2, stem: "State two assumptions you made in (a).", points: ["[H⁺] = [X⁻] (H⁺ from water negligible)", "[HX] at equilibrium ≈ 0.100 mol dm⁻³ (slight dissociation)"], modelAnswer: "All the H⁺ comes from HX, so [H⁺] = [X⁻]; and the dissociation is so slight that [HX] at equilibrium is still 0.100 mol dm⁻³." }),
        P.num({ label: "(g)", marks: 2, stem: "Use your value of Ka to predict the pH of 0.0500 mol dm⁻³ HX, to two decimal places.", value: pred, dp: 2, wrong: [dpStr(pH(0.05), 2)], explanation: `[H⁺] = √(${sciStr(Ka, 3)} × 0.0500) = ${sciStr(Math.sqrt(Ka * 0.05), 3)}; pH = ${dpStr(pred, 2)}.` }),
      ],
      hints: ["[H⁺] = 10⁻ᵖᴴ; Ka = [H⁺]²/c."],
      explanation: `Ka = ${sciStr(Ka, 3)} mol dm⁻³, pKa = ${dpStr(pk, 2)}; dissociation rises from ${sfStr(pct1, 3)}% to ${sfStr(pct3, 3)}% on dilution; predicted pH at 0.0500 mol dm⁻³ = ${dpStr(pred, 2)}.`,
    });
  }
  {
    const v = pHWeakAcid(6.3e-5, 0.02);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`Benzoic acid, $\ce{C6H5COOH}$, is used as a food preservative in fruit juices and sauces. It is a weak acid with Ka = 6.30 × 10⁻⁵ mol dm⁻³ (data).`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "Write an expression for Ka for benzoic acid.", points: ["Ka = [C₆H₅COO⁻][H⁺] / [C₆H₅COOH]"], modelAnswer: "Ka = [C₆H₅COO⁻][H⁺]/[C₆H₅COOH]" }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the pH of 0.0200 mol dm⁻³ benzoic acid, to two decimal places.", value: v, dp: 2, wrong: [dpStr(pH(0.02), 2)], explanation: `[H⁺] = √(6.30 × 10⁻⁵ × 0.0200) = ${sciStr(Math.sqrt(6.3e-5 * 0.02), 3)}; pH = ${dpStr(v, 2)}. Treating it as a strong acid gives ${dpStr(pH(0.02), 2)}.` }),
        P.short({ label: "(c)", marks: 1, stem: "Give the formula of the conjugate base of benzoic acid.", accepted: ["C6H5COO-", "C₆H₅COO⁻", "C6H5CO2-", "C6H5COO⁻", "C₆H₅COO-"], normalise: ["trim", "collapse_whitespace"], wrong: ["C6H5COOH2+"], explanation: "Benzoate ion, C₆H₅COO⁻." }),
        P.mcq({ label: "(d)", marks: 1, stem: "Ethanoic acid has Ka = 1.74 × 10⁻⁵ mol dm⁻³. Which is correct for 0.0200 mol dm⁻³ solutions of the two acids?", options: [
          ["Benzoic acid has the lower pH.", "Correct: its larger Ka gives a larger [H⁺]."],
          ["Ethanoic acid has the lower pH.", "Ethanoic acid has the smaller Ka, so it is the weaker acid."],
          ["Both have the same pH.", "Different Ka values give different [H⁺] at the same concentration."],
          ["Both have pH 1.70.", "That would be true only for a strong monobasic acid."],
        ], answer: "A", explanation: "Larger Ka → stronger acid → lower pH at equal concentration." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why 0.0200 mol dm⁻³ benzoic acid has a higher pH than 0.0200 mol dm⁻³ hydrochloric acid.", points: ["Benzoic acid is only partially dissociated (weak), HCl is fully dissociated", "so [H⁺] is much lower in benzoic acid and the pH is higher"], modelAnswer: "Hydrochloric acid is fully dissociated, so [H⁺] = 0.0200 mol dm⁻³. Benzoic acid is weak: only a small fraction dissociates, so its [H⁺] is much lower and its pH higher." }),
        P.tf({ label: "(f)", marks: 1, stem: "Adding sodium benzoate to the benzoic acid solution would lower its pH.", answer: false, explanation: "False: extra C₆H₅COO⁻ moves the dissociation equilibrium left, lowering [H⁺] and raising the pH (this mixture is a buffer)." }),
      ],
      hints: ["Use [H⁺] = √(Ka c)."],
      explanation: `pH of 0.0200 mol dm⁻³ benzoic acid = ${dpStr(v, 2)}; it is weaker than HCl but stronger than ethanoic acid.`,
    });
  }
  b.card("DEFINITION", "Ka", "Ka = [H⁺][A⁻]/[HA] for HA ⇌ H⁺ + A⁻; units mol dm⁻³; larger Ka = stronger acid.");
  b.card("DEFINITION", "pKa", "pKa = −log₁₀ Ka; smaller pKa = stronger acid.");
  b.card("FORMULA", "pH of a weak acid", "[H⁺] = √(Ka × c), assuming [H⁺] = [A⁻] and [HA] ≈ c.");
  b.card("FORMULA", "Ka from pH", "[H⁺] = 10⁻ᵖᴴ; Ka = [H⁺]²/c.");
  b.card("FORMULA", "Percentage dissociation", "[H⁺] ÷ c × 100; increases on dilution.");
  b.card("FORMULA", "Kb and pKb (ZIMSEC)", "Kb = [BH⁺][OH⁻]/[B]; [OH⁻] = √(Kb c); pKb = −log Kb.", undefined, { applies: ZIM });
  b.card("FORMULA", "Conjugate pair relation (ZIMSEC)", "Ka × Kb = Kw; pKa + pKb = 14.00 at 298 K.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Dilution of a weak acid", "Tenfold dilution raises pH by 0.5 ([H⁺] ∝ √c); % dissociation increases; Ka unchanged.");
  b.card("FACT", "Ka of ethanoic acid", "About 1.74 × 10⁻⁵ mol dm⁻³ (pKa 4.76) at 298 K.");
});
