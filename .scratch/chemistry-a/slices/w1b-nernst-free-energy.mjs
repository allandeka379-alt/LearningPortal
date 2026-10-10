// W1b: achem.electrochem.nernst-free-energy (Cambridge A Level only)
import { concept, P, t, ce, nernst, gibbsFromE, ecell, F, linearFit, sfStr, dpStr, chk, round } from "../lib.mjs";

const v3 = (x) => (x < 0 ? `−${dpStr(-x, 3)}` : `+${dpStr(x, 3)}`);

concept("achem.electrochem.nernst-free-energy", { file: "electrochem/nernst-free-energy", keyPrefix: "electrochem.nernst-free-energy" }, (b) => {
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: t`The concentration of $\ce{Ag+(aq)}$ in a silver half-cell is reduced from 1.00 to 0.10 mol dm⁻³. How does the electrode potential change, and why?`,
    options: [
      ["It becomes less positive, because the equilibrium Ag⁺ + e⁻ ⇌ Ag shifts left, releasing electrons.", "Correct: fewer Ag⁺ ions to accept electrons, so the electrode becomes more negative relative to before."],
      ["It becomes more positive, because the equilibrium Ag⁺ + e⁻ ⇌ Ag shifts left.", "A shift to the left releases electrons, making the potential less positive."],
      ["It does not change, because silver is a solid.", "The solid's amount does not matter, but the ion concentration does."],
      ["It becomes more positive, because dilute solutions conduct better.", "Conductivity is not what sets the electrode potential."],
    ],
    answer: "A",
    explanation: "Lower [oxidised form] → equilibrium shifts to the left → electrons released onto the electrode → E less positive. Nernst: E = 0.80 + 0.059 log(0.10) = 0.74 V.",
  });
  {
    const e = nernst(0.80, 1, 0.0010);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`Calculate the electrode potential of silver in 0.0010 mol dm⁻³ $\ce{Ag+(aq)}$. (E⦵(Ag⁺/Ag) = +0.80 V.)`,
      options: [
        [`${v3(e)} V`, "Correct: 0.80 + 0.059 × log(0.0010) = 0.80 − 0.177."],
        [`${v3(nernst(0.80, 2, 0.0010))} V`, "This divides 0.059 by 2, but z = 1 for Ag⁺ + e⁻ ⇌ Ag."],
        [`${v3(0.80 + 0.177)} V`, "Diluting the oxidised form lowers E: the log of 0.0010 is negative."],
        [`${v3(0.80 + 0.059 * Math.log(0.0010))} V`, "This uses the natural logarithm; the 0.059 form uses log₁₀."],
      ],
      answer: "A",
      explanation: `E = 0.80 + (0.059/1) log₁₀(0.0010) = 0.80 + 0.059 × (−3) = ${v3(e)} V.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: t`A cell is made from $\ce{Zn|Zn^2+}$ and $\ce{Cu^2+|Cu}$ half-cells. Which change would increase the cell potential?`,
    options: [
      [t`decreasing $[\ce{Zn^2+}]$`, "Correct: the zinc electrode becomes more negative, increasing the difference."],
      [t`decreasing $[\ce{Cu^2+}]$`, "This makes the positive copper electrode less positive, lowering E_cell."],
      [t`increasing $[\ce{Zn^2+}]$`, "This makes the zinc electrode less negative, lowering E_cell."],
      ["using a larger zinc electrode", "The amount of solid metal does not appear in the Nernst equation."],
    ],
    answer: "A",
    hints: ["E_cell = E(Cu) − E(Zn).", "Which change makes E(Zn) more negative or E(Cu) more positive?"],
    explanation: "E_cell = E(Cu) − E(Zn). Lowering [Zn²⁺] shifts Zn²⁺ + 2e⁻ ⇌ Zn to the left, making E(Zn) more negative, so E_cell increases. Raising [Cu²⁺] would also work.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about ΔG⦵ = −nE⦵cellF are correct?\n\n1. A positive E⦵cell gives a negative ΔG⦵.\n2. n is the number of electrons in the reduction half-equation before the two half-equations are balanced.\n3. With F in C mol⁻¹ and E in V, ΔG⦵ is obtained in kJ mol⁻¹ without conversion.",
    options: [
      ["1 and 2 only", "Statement 2 is false: n is the number of electrons transferred in the balanced overall equation."],
      ["1 only", "Correct: n comes from the balanced overall equation, and V × C mol⁻¹ gives J mol⁻¹."],
      ["2 and 3 only", "Both are false; only statement 1 is correct."],
      ["1, 2 and 3", "Statements 2 and 3 are false."],
    ],
    answer: "B",
    hints: ["1 V × 1 C = 1 J."],
    explanation: "Volts × coulombs = joules, so −nEF is in J mol⁻¹. The minus sign means a positive cell potential gives a negative ΔG (feasible). n is the number of moles of electrons transferred in the balanced overall equation (for example 5 for MnO₄⁻ with 5Fe²⁺), not the number in one unbalanced half-equation.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`A platinum electrode dips into a solution in which $[\ce{Fe^3+}] = [\ce{Fe^2+}] = 0.10$ mol dm⁻³. What is its electrode potential? (E⦵(Fe³⁺/Fe²⁺) = +0.77 V.)`,
    options: [
      ["+0.77 V", "Correct: the ratio [Fe³⁺]/[Fe²⁺] = 1 and log 1 = 0, so E = E⦵."],
      ["+0.71 V", "This uses log(0.10) for one ion only; for an ion/ion couple the ratio is used."],
      ["+0.83 V", "This adds 0.059 V, as if the ratio were 10."],
      ["+0.65 V", "This subtracts 0.059 twice; the ratio of equal concentrations is 1."],
    ],
    answer: "A",
    hints: ["What is the ratio of the two concentrations?"],
    explanation: "E = 0.77 + 0.059 log(0.10/0.10) = 0.77 + 0 = +0.77 V. Only the ratio matters for a couple of two ions.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`For a series of $\ce{Cu^2+/Cu}$ half-cells, E is plotted against $\log_{10}[\ce{Cu^2+}]$. What is the gradient of the straight line?`,
    options: [
      ["+0.0295 V", "Correct: E = E⦵ + (0.059/2) log[Cu²⁺], so the gradient is 0.059 ÷ 2."],
      ["+0.059 V", "This would be the gradient for a one-electron couple such as Ag⁺/Ag."],
      ["−0.0295 V", "E increases as [Cu²⁺] increases, so the gradient is positive."],
      ["+0.34 V", "0.34 V is the intercept (E⦵, where log[Cu²⁺] = 0), not the gradient."],
    ],
    answer: "A",
    hints: ["Compare E = E⦵ + (0.059/z) log[Cu²⁺] with y = c + mx."],
    explanation: "y = E, x = log[Cu²⁺], m = 0.059/z = 0.0295 V, c = E⦵ = +0.34 V.",
  });
  {
    const e = nernst(-0.76, 2, 0.25);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`Calculate the electrode potential, in V, of a zinc electrode in 0.25 mol dm⁻³ $\ce{Zn^2+(aq)}$, to three decimal places. (E⦵(Zn²⁺/Zn) = −0.76 V.)`,
      value: e, dp: 3, unit: "V",
      wrong: [dpStr(nernst(-0.76, 1, 0.25), 3)],
      hints: ["z = 2 for Zn²⁺ + 2e⁻ ⇌ Zn.", "log₁₀(0.25) is negative."],
      explanation: `E = −0.76 + (0.059/2) log₁₀(0.25) = −0.76 + 0.0295 × (${dpStr(Math.log10(0.25), 3)}) = ${v3(e)} V. More dilute Zn²⁺ makes the electrode slightly more negative.`,
    });
  }
  {
    const e = nernst(0.77, 1, 0.020, 0.20);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A solution contains 0.020 mol dm⁻³ $\ce{Fe^3+}$ and 0.20 mol dm⁻³ $\ce{Fe^2+}$. Calculate the potential of a platinum electrode in it, in V, to three decimal places. (E⦵(Fe³⁺/Fe²⁺) = +0.77 V.)`,
      value: e, dp: 3, unit: "V",
      wrong: [dpStr(nernst(0.77, 1, 0.20, 0.020), 3)],
      hints: ["Use the ratio [oxidised]/[reduced] = [Fe³⁺]/[Fe²⁺]."],
      explanation: `E = 0.77 + 0.059 log₁₀(0.020/0.20) = 0.77 + 0.059 × (−1) = ${v3(e)} V. Inverting the ratio gives ${v3(nernst(0.77, 1, 0.20, 0.020))} V.`,
    });
  }
  {
    const E = ecell(1.52, 0.77);
    const G = gibbsFromE(5, E);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`For $\ce{MnO4- + 8H+ + 5Fe^2+ -> Mn^2+ + 5Fe^3+ + 4H2O}$, E⦵cell = +0.75 V. Calculate ΔG⦵, in kJ mol⁻¹, to three significant figures. (F = 9.65 × 10⁴ C mol⁻¹.)`,
      value: G, sf: 3, unit: "kJ/mol",
      wrong: [sfStr(gibbsFromE(1, E), 3), sfStr(-G, 3)],
      hints: ["Five electrons are transferred in the equation as written.", "−nEF gives J mol⁻¹."],
      explanation: `1. n = 5 (MnO₄⁻ gains 5 e⁻; five Fe²⁺ each lose one).\n2. ΔG⦵ = −5 × ${dpStr(E, 2)} × 9.65 × 10⁴ = ${sfStr(G * 1000, 4)} J mol⁻¹.\n3. ΔG⦵ = ${sfStr(G, 3)} kJ mol⁻¹, negative, so feasible. Using n = 1 gives ${sfStr(gibbsFromE(1, E), 3)}.`,
    });
  }
  {
    const E = 525000 / (2 * F);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`For $\ce{Mg(s) + Cu^2+(aq) -> Mg^2+(aq) + Cu(s)}$, ΔG⦵ = −525 kJ mol⁻¹. Calculate E⦵cell, in V, to three significant figures. (F = 9.65 × 10⁴ C mol⁻¹.)`,
      value: E, sf: 3, unit: "V",
      wrong: [sfStr(525 / (2 * F), 3), sfStr(525000 / F, 3)],
      hints: ["Rearrange: E = −ΔG/(nF) with ΔG in J mol⁻¹.", "n = 2."],
      explanation: `E⦵cell = −ΔG⦵/(nF) = 525 000 ÷ (2 × 9.65 × 10⁴) = ${sfStr(E, 3)} V. Forgetting to convert kJ to J gives a tiny value; using n = 1 doubles the answer.`,
    });
  }
  {
    const eCu = nernst(0.34, 2, 0.0020);
    const E = ecell(0.80, eCu);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A cell is made from a standard $\ce{Ag+/Ag}$ half-cell (E⦵ = +0.80 V) and a copper electrode in 0.0020 mol dm⁻³ $\ce{Cu^2+(aq)}$ (E⦵(Cu²⁺/Cu) = +0.34 V). Calculate the cell potential, in V, to three significant figures.`,
      value: E, sf: 3, unit: "V",
      wrong: [sfStr(ecell(0.80, 0.34), 3), sfStr(ecell(0.80, nernst(0.34, 1, 0.0020)), 3)],
      hints: ["Find E for the copper half-cell first.", "Silver is still the positive electrode."],
      explanation: `1. E(Cu) = 0.34 + 0.0295 × log₁₀(0.0020) = 0.34 + 0.0295 × (${dpStr(Math.log10(0.002), 3)}) = ${v3(eCu)} V.\n2. E_cell = 0.80 − ${dpStr(eCu, 3)} = ${sfStr(E, 3)} V. Diluting the copper(II) ions makes the negative electrode more negative, so E_cell is larger than the standard value (0.46 V).`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Diluting the copper(II) sulfate in a Cu²⁺/Cu half-cell makes its electrode potential less positive.",
    answer: true,
    explanation: "True. Lower [Cu²⁺] shifts Cu²⁺ + 2e⁻ ⇌ Cu to the left, releasing electrons, so E falls (Nernst: E = 0.34 + 0.0295 log[Cu²⁺]).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In ΔG⦵ = −nE⦵cellF, n is the number of electrons in the reduction half-equation before the half-equations are balanced against each other.",
    answer: false,
    explanation: "False. n is the number of moles of electrons transferred in the overall balanced equation as written (5 for MnO₄⁻ with 5Fe²⁺, not 1).",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about the Nernst equation (standard temperature).",
    template: "Increasing the concentration of the oxidised form makes E more {{blank:a}}. A tenfold change in concentration changes E by 0.059 V divided by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["positive"], choices: ["positive", "negative"] },
      { id: "b", accepted: ["the number of electrons in the half-equation"], choices: ["the number of electrons in the half-equation", "the charge on the anion", "the temperature in kelvin"] },
    ],
    explanation: "E = E⦵ + (0.059/z) log([ox]/[red]): more oxidised form → larger log term → more positive E; log 10 = 1, so a tenfold change shifts E by 0.059/z.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "State the value of the Faraday constant used in Cambridge calculations, with its unit.",
    accepted: ["9.65 × 10^4 C mol^-1", "9.65 x 10^4 C mol-1", "96500 C/mol", "96500 C mol-1", "9.65e4 C/mol", "96500", "9.65 × 10⁴ C mol⁻¹", "96 500 C mol⁻¹"],
    normalise: ["trim", "lowercase", "remove_whitespace"],
    wrong: ["6.02 × 10^23"],
    explanation: "F = 9.65 × 10⁴ C mol⁻¹, the charge on one mole of electrons (F = Le).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: t`Explain how increasing the concentration of $\ce{Fe^2+}$ (with $[\ce{Fe^3+}]$ unchanged) affects the electrode potential of the $\ce{Fe^3+/Fe^2+}$ half-cell.`,
    points: ["The equilibrium Fe³⁺ + e⁻ ⇌ Fe²⁺ shifts to the left (to remove Fe²⁺), releasing electrons onto the electrode.", "So E becomes less positive (the ratio [Fe³⁺]/[Fe²⁺] decreases)."],
    modelAnswer: "Adding Fe²⁺ shifts Fe³⁺ + e⁻ ⇌ Fe²⁺ to the left, which releases electrons to the electrode, so its potential becomes less positive; in Nernst terms the ratio [Fe³⁺]/[Fe²⁺] falls.",
    hints: ["Which side of the half-equation is Fe²⁺ on?"],
    explanation: "Link the shift in the equilibrium to electrons gained or released by the electrode.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: t`For $\ce{Ag+(aq) + Fe^2+(aq) <=> Ag(s) + Fe^3+(aq)}$, E⦵cell = +0.03 V. Explain why the direction of this reaction can easily be reversed by changing concentrations, and state one change that would make the reverse reaction feasible.`,
    points: ["E⦵cell is very small (close to zero), so modest concentration changes can change its sign.", "The Nernst log term (0.059/z per tenfold change) is comparable in size to 0.03 V.", "For example increase [Fe³⁺] (or decrease [Ag⁺] or [Fe²⁺]): E(Fe³⁺/Fe²⁺) becomes more positive than E(Ag⁺/Ag), so silver is oxidised by Fe³⁺."],
    modelAnswer: "The cell potential is only +0.03 V, while a tenfold change in one concentration moves an electrode potential by 0.059 V. So raising [Fe³⁺] (or lowering [Ag⁺] or [Fe²⁺]) makes E(Fe³⁺/Fe²⁺) larger than E(Ag⁺/Ag), E_cell becomes negative for the forward reaction, and Fe³⁺ oxidises silver.",
    hints: ["How large is a Nernst correction for a tenfold change?"],
    explanation: "Small E⦵cell values (< about 0.3 V) can be reversed by realistic concentration changes; large ones cannot.",
  });
  {
    const eAg = nernst(0.80, 1, 0.050);
    const E = ecell(eAg, -0.76);
    const G = gibbsFromE(2, E);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`A cell is made from a standard $\ce{Zn^2+/Zn}$ half-cell (E⦵ = −0.76 V) and a silver electrode in 0.050 mol dm⁻³ $\ce{Ag+(aq)}$ (E⦵(Ag⁺/Ag) = +0.80 V). F = 9.65 × 10⁴ C mol⁻¹.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the electrode potential of the silver half-cell, in V, to three decimal places.", value: eAg, dp: 3, unit: "V", wrong: [dpStr(nernst(0.80, 2, 0.050), 3)], explanation: `E = 0.80 + 0.059 log₁₀(0.050) = ${v3(eAg)} V.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the cell potential, in V, to three decimal places.", value: E, dp: 3, unit: "V", explanation: `E_cell = ${dpStr(eAg, 3)} − (−0.76) = ${dpStr(E, 3)} V.` }),
        P.mcq({ label: "(c)", stem: "Which is the balanced cell reaction?", options: [[t`$\ce{Zn + 2Ag+ -> Zn^2+ + 2Ag}$`, "Correct: zinc loses 2 e⁻; two Ag⁺ each gain one."], [t`$\ce{Zn + Ag+ -> Zn^2+ + Ag}$`, "Charge does not balance: +1 on the left, +2 on the right."], [t`$\ce{Zn^2+ + 2Ag -> Zn + 2Ag+}$`, "This is the reverse, non-feasible reaction."], [t`$\ce{2Zn + Ag+ -> 2Zn^2+ + Ag}$`, "Four electrons lost but only one gained."]], answer: "A", explanation: "Two silver ions per zinc atom: n = 2." }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate ΔG for the cell reaction under these conditions, in kJ mol⁻¹, to three significant figures.", value: G, sf: 3, unit: "kJ/mol", wrong: [sfStr(gibbsFromE(1, E), 3)], explanation: `ΔG = −2 × ${dpStr(E, 3)} × 9.65 × 10⁴ = ${sfStr(G * 1000, 4)} J mol⁻¹ = ${sfStr(G, 3)} kJ mol⁻¹.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain whether the cell potential would rise or fall if the silver nitrate solution were made more concentrated.", points: ["It would rise.", "Higher [Ag⁺] shifts Ag⁺ + e⁻ ⇌ Ag to the right, so the positive (silver) electrode becomes more positive and the difference from zinc increases."], modelAnswer: "Rise: more Ag⁺ pushes Ag⁺ + e⁻ ⇌ Ag to the right, removing electrons from the silver electrode and making it more positive, so E_cell = E(Ag) − E(Zn) increases." }),
      ],
      hints: ["z = 1 for the silver half-cell.", "n = 2 in the balanced cell equation."],
      explanation: `E(Ag) = ${v3(eAg)} V; E_cell = ${dpStr(E, 3)} V; ΔG = ${sfStr(G, 3)} kJ mol⁻¹.`,
    });
  }
  {
    const concs = [0.0020, 0.0050, 0.020, 0.050, 0.20];
    const pts = concs.map((c) => [Math.log10(c), round(nernst(0.34, 2, c), 3)]);
    const fit = linearFit(pts);
    const z = 0.059 / fit.m;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `A student measured the electrode potential of copper in solutions of different Cu²⁺ concentrations (against a standard hydrogen electrode).\n\n| [Cu²⁺] / mol dm⁻³ | ${concs.map((c) => String(c)).join(" | ")} |\n|---|---|---|---|---|---|\n| log₁₀[Cu²⁺] | ${pts.map(([x]) => dpStr(x, 2)).join(" | ")} |\n| E / V | ${pts.map(([, y]) => dpStr(y, 3)).join(" | ")} |`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "A graph of E against log₁₀[Cu²⁺] is a straight line. Calculate its gradient, in V, to two significant figures.", value: fit.m, sf: 2, unit: "V", explanation: `Using the end points: (${dpStr(pts[4][1], 3)} − ${dpStr(pts[0][1], 3)}) ÷ (${dpStr(pts[4][0], 2)} − (${dpStr(pts[0][0], 2)})) = ${sfStr((pts[4][1] - pts[0][1]) / (pts[4][0] - pts[0][0]), 3)} V; the best-fit gradient is ${sfStr(fit.m, 3)} V.` }),
        P.num({ label: "(b)", marks: 2, stem: "Use the gradient and the Nernst equation (gradient = 0.059/z) to find z, the number of electrons in the half-equation, to the nearest whole number.", value: Math.round(z), unit: undefined, explanation: `z = 0.059 ÷ ${sfStr(fit.m, 2)} = ${sfStr(z, 3)}, so z = 2 (Cu²⁺ + 2e⁻ ⇌ Cu).` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the value of E when log₁₀[Cu²⁺] = 0 (the intercept), in V, to two decimal places. What does it represent?", value: fit.c, dp: 2, unit: "V", explanation: `Extrapolating to log[Cu²⁺] = 0 ([Cu²⁺] = 1.00 mol dm⁻³) gives ${dpStr(fit.c, 2)} V: the standard electrode potential E⦵(Cu²⁺/Cu).` }),
      ],
      hints: ["Compare E = E⦵ + (0.059/z) log[Cu²⁺] with y = mx + c."],
      explanation: `Gradient ${sfStr(fit.m, 2)} V gives z = 2; the intercept ${dpStr(fit.c, 2)} V is E⦵(Cu²⁺/Cu).`,
    });
  }
  b.card("FORMULA", "Nernst equation (298 K)", "E = E⦵ + (0.059/z) log₁₀([oxidised]/[reduced]); for a metal/ion couple only [ion] appears.");
  b.card("CONCEPT", "Effect of [oxidised form] on E", "Increasing the oxidised form (e.g. Cu²⁺) shifts the half-equilibrium right and makes E more positive.");
  b.card("FORMULA", "Free energy and cell potential", "ΔG⦵ = −nE⦵cellF (J mol⁻¹); n = moles of electrons in the balanced equation.");
  b.card("CONCEPT", "Sign link between E and ΔG", "Positive E⦵cell ⇔ negative ΔG⦵ ⇔ feasible.");
  b.card("FACT", "Size of a Nernst correction", "A tenfold change in concentration shifts E by 0.059/z V (0.059 V for z = 1, 0.0295 V for z = 2).");
  b.card("FACT", "Faraday constant", "F = 9.65 × 10⁴ C mol⁻¹, the charge on one mole of electrons.");
  b.card("CONCEPT", "When concentration can reverse a reaction", "When E⦵cell is small (a few tenths of a volt or less), realistic concentration changes can change its sign.");
  b.card("CONCEPT", "Plot of E against log[ion]", "Straight line: gradient 0.059/z, intercept E⦵.");
});
