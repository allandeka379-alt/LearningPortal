// W1b: achem.electrochem.faraday
import { concept, P, t, ce, charge, molesElectrons, massLiberated, gasLiberatedRTP, avogadroFromElectrolysis, F, L, E_CHARGE, sfStr, dpStr, chk, sciStr } from "../lib.mjs";

/** "1.20e24"-style string (3 s.f.) for a wrong response. */
const eStr = (x) => {
  const e = Math.floor(Math.log10(Math.abs(x)));
  return `${(x / 10 ** e).toFixed(2)}e${e}`;
};

concept("achem.electrochem.faraday", { file: "electrochem/faraday", keyPrefix: "electrochem.faraday" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the unit of the Faraday constant?",
    options: [
      ["C mol⁻¹", "Correct: F is the charge (coulombs) on one mole of electrons."],
      ["mol⁻¹", "This is the unit of the Avogadro constant, a number per mole."],
      ["C", "A coulomb is a charge; F is a charge per mole."],
      ["A s⁻¹", "Amperes per second is not a unit of charge."],
    ],
    answer: "A",
    explanation: "F = 9.65 × 10⁴ C mol⁻¹: the charge carried by one mole of electrons.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The same charge is passed through separate cells depositing each of these metals. Which metal is deposited in the smallest number of moles?",
    options: [
      [t`aluminium, from $\ce{Al^3+}$`, "Correct: each Al³⁺ needs three electrons, so the fewest moles form."],
      [t`copper, from $\ce{Cu^2+}$`, "Two electrons per atom: more moles than aluminium."],
      [t`silver, from $\ce{Ag+}$`, "One electron per atom: the most moles of all."],
      [t`zinc, from $\ce{Zn^2+}$`, "Two electrons per atom, like copper."],
    ],
    answer: "A",
    explanation: "Moles of metal = moles of electrons ÷ z. The largest z (3, for Al³⁺) gives the fewest moles.",
  });
  {
    const ag = 2.16;
    const ne = ag / 107.9;
    const cu = (ne / 2) * 58.7;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Two cells, one containing silver nitrate solution and one containing nickel(II) sulfate solution, are connected in series. When 2.16 g of silver is deposited in the first cell, what mass of nickel is deposited in the second? (Ar: Ag 107.9, Ni 58.7)",
      options: [
        [`${sfStr(cu, 3)} g`, "Correct: the same charge flows through both; two electrons per Ni but one per Ag."],
        [`${sfStr(2 * cu, 3)} g`, "This treats nickel ions as Ni⁺, needing one electron each."],
        [`${sfStr(cu / 2, 3)} g`, "This halves the amount twice."],
        ["2.16 g", "The masses are not equal: the metals have different molar masses and charges."],
      ],
      answer: "A",
      hints: ["In series, the same charge (moles of electrons) passes through both cells."],
      explanation: `n(e⁻) = n(Ag) = 2.16 ÷ 107.9 = ${sfStr(ne, 3)} mol; n(Ni) = ${sfStr(ne, 3)} ÷ 2 = ${sfStr(ne / 2, 3)} mol; mass = ${sfStr(ne / 2, 3)} × 58.7 = ${sfStr(cu, 3)} g.`,
    });
  }
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which statements about determining the Avogadro constant by electrolysing copper(II) sulfate with copper electrodes are correct?\n\n1. The current should be kept constant using a variable resistor.\n2. The electrodes must be dry when they are weighed.\n3. A very large current gives the most accurate result.",
    options: [
      ["1 and 2 only", "Correct: a very large current makes copper deposit loosely, so some falls off."],
      ["1, 2 and 3", "Statement 3 is false: high current density gives a powdery deposit that can fall off the cathode."],
      ["2 and 3 only", "Statement 1 is true (Q = It needs a steady current) and statement 3 is false."],
      ["1 only", "Statement 2 is also true: water on the electrode adds to its mass."],
    ],
    answer: "A",
    hints: ["What happens to the copper deposit at a high current?"],
    explanation: "A constant current lets Q = It be used; dry electrodes give true masses. Too high a current gives a loose deposit that drops off, so moderate currents and longer times are better.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which equation links the Faraday constant F, the Avogadro constant L and the charge on an electron e?",
    options: [
      ["F = Le", "Correct: one mole of electrons carries L × e coulombs."],
      ["F = L ÷ e", "Dividing gives a meaningless quantity; the charges add up, so multiply."],
      ["L = Fe", "Rearranged correctly it would be L = F ÷ e."],
      ["e = FL", "e = F ÷ L, not F × L."],
    ],
    answer: "A",
    explanation: "F = Le: 6.022 × 10²³ mol⁻¹ × 1.60 × 10⁻¹⁹ C ≈ 9.64 × 10⁴ C mol⁻¹.",
  });
  {
    const Q = charge(2.50, 8.00 * 60);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: "A current of 2.50 A flows for 8.00 minutes. Calculate the charge passed, in C.",
      value: Q, unit: "C",
      wrong: [String(2.5 * 8)],
      explanation: `Q = It = 2.50 × (8.00 × 60) = ${Q} C. Using minutes instead of seconds gives 20 C.`,
    });
  }
  {
    const Q = charge(0.250, 1.25 * 3600);
    const m = massLiberated(Q, 107.9, 1);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the mass of silver, in g, deposited when a current of 0.250 A passes through silver nitrate solution for 1.25 hours. Give your answer to three significant figures. (Ar: Ag 107.9; F = 9.65 × 10⁴ C mol⁻¹)",
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(massLiberated(charge(0.25, 1.25 * 60), 107.9, 1), 3), sfStr(massLiberated(Q, 107.9, 2), 3)],
      hints: ["Convert hours to seconds.", "Ag⁺ + e⁻ → Ag."],
      explanation: `1. t = 1.25 × 3600 = 4500 s; Q = 0.250 × 4500 = ${Q} C.\n2. n(e⁻) = ${Q} ÷ 9.65 × 10⁴ = ${sfStr(molesElectrons(Q), 3)} mol = n(Ag).\n3. Mass = ${sfStr(molesElectrons(Q), 3)} × 107.9 = ${sfStr(m, 3)} g.`,
    });
  }
  {
    const Q = charge(3.00, 25.0 * 60);
    const v = gasLiberatedRTP(Q, 2);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Concentrated sodium chloride solution is electrolysed with a current of 3.00 A for 25.0 minutes. Calculate the volume of chlorine, in dm³ at room conditions, produced at the anode, to three significant figures. (F = 9.65 × 10⁴ C mol⁻¹; molar volume 24.0 dm³ mol⁻¹)",
      value: v, sf: 3, unit: "dm³",
      wrong: [sfStr(gasLiberatedRTP(Q, 1), 3), sfStr(gasLiberatedRTP(Q, 4), 3)],
      hints: ["2Cl⁻ → Cl₂ + 2e⁻: two electrons per Cl₂ molecule."],
      explanation: `1. Q = 3.00 × 1500 = ${Q} C; n(e⁻) = ${sfStr(molesElectrons(Q), 3)} mol.\n2. n(Cl₂) = ${sfStr(molesElectrons(Q), 3)} ÷ 2 = ${sfStr(molesElectrons(Q) / 2, 3)} mol.\n3. V = ${sfStr(molesElectrons(Q) / 2, 3)} × 24.0 = ${sfStr(v, 3)} dm³.`,
    });
  }
  {
    const n = 2.00 / 58.7;
    const Q = n * 2 * F;
    const tmin = Q / 1.20 / 60;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "How long, in minutes, must a current of 1.20 A flow to deposit 2.00 g of nickel from nickel(II) sulfate solution? Give your answer to three significant figures. (Ar: Ni 58.7; F = 9.65 × 10⁴ C mol⁻¹)",
      value: tmin, sf: 3, unit: "min",
      wrong: [sfStr(Q / 1.2, 3), sfStr(tmin / 2, 3)],
      hints: ["Moles of Ni → moles of electrons (×2) → Q → t = Q/I.", "Convert seconds to minutes at the end."],
      explanation: `1. n(Ni) = 2.00 ÷ 58.7 = ${sfStr(n, 3)} mol; n(e⁻) = 2 × ${sfStr(n, 3)} = ${sfStr(2 * n, 3)} mol.\n2. Q = ${sfStr(2 * n, 3)} × 9.65 × 10⁴ = ${sfStr(Q, 4)} C.\n3. t = ${sfStr(Q, 4)} ÷ 1.20 = ${sfStr(Q / 1.2, 4)} s = ${sfStr(tmin, 3)} min.`,
    });
  }
  {
    const Q = charge(0.600, 60.0 * 60);
    const ne = molesElectrons(Q);
    const nM = 0.388 / 52.0;
    const z = ne / nM;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "A current of 0.600 A passed for 60.0 minutes through a solution of a chromium salt deposits 0.388 g of chromium (Ar = 52.0). Calculate the charge on the chromium ions, n in Crⁿ⁺. (F = 9.65 × 10⁴ C mol⁻¹)",
      value: Math.round(z), unit: undefined,
      wrong: ["2", "6"],
      hints: ["Find moles of electrons and moles of chromium.", "n = moles of electrons ÷ moles of chromium."],
      explanation: `1. Q = 0.600 × 3600 = ${Q} C; n(e⁻) = ${sfStr(ne, 3)} mol.\n2. n(Cr) = 0.388 ÷ 52.0 = ${sfStr(nM, 3)} mol.\n3. Ratio = ${sfStr(ne, 3)} ÷ ${sfStr(nM, 3)} = ${sfStr(z, 3)} ≈ 3, so the ions are Cr³⁺.`,
    });
  }
  {
    const Q = charge(0.200, 75.0 * 60);
    const Lv = avogadroFromElectrolysis(Q, 1.01, 107.9, 1);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "In a determination of the Avogadro constant, a current of 0.200 A passed for 75.0 minutes between silver electrodes in silver nitrate solution. The cathode gained 1.01 g. Calculate a value for the Avogadro constant, in mol⁻¹, to three significant figures. (Ar: Ag 107.9; charge on an electron 1.60 × 10⁻¹⁹ C)",
      value: Lv, sf: 3, unit: "mol⁻¹",
      wrong: [eStr(avogadroFromElectrolysis(Q, 1.01, 107.9, 2))],
      hints: ["Number of electrons = Q ÷ e.", "Ag⁺ + e⁻ → Ag: moles of electrons = moles of silver."],
      explanation: `1. Q = 0.200 × 4500 = ${Q} C; number of electrons = ${Q} ÷ 1.60 × 10⁻¹⁹ = ${sciStr(Q / E_CHARGE, 3)}.\n2. n(Ag) = 1.01 ÷ 107.9 = ${sfStr(1.01 / 107.9, 3)} mol = n(e⁻).\n3. L = ${sciStr(Q / E_CHARGE, 3)} ÷ ${sfStr(1.01 / 107.9, 3)} = ${sciStr(Lv, 3)} mol⁻¹.`,
    });
  }
  {
    const I = (0.100 * 2 * F) / 3600;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "What constant current, in A, is needed to produce 0.100 mol of hydrogen gas at the cathode in exactly one hour? Give your answer to three significant figures. (F = 9.65 × 10⁴ C mol⁻¹)",
      value: I, sf: 3, unit: "A",
      wrong: [sfStr(I / 2, 3), sfStr(I * 60, 3)],
      hints: ["2H⁺ + 2e⁻ → H₂: two moles of electrons per mole of H₂."],
      explanation: `1. n(e⁻) = 2 × 0.100 = 0.200 mol; Q = 0.200 × 9.65 × 10⁴ = ${sfStr(0.2 * F, 4)} C.\n2. I = Q ÷ t = ${sfStr(0.2 * F, 4)} ÷ 3600 = ${sfStr(I, 3)} A.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In brine electrolysis, the same charge produces equal numbers of moles of hydrogen at the cathode and chlorine at the anode.",
    answer: true,
    explanation: "True. Each H₂ and each Cl₂ needs two electrons, and the same number of electrons flows through both electrodes.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In Q = It, the time must be in minutes.",
    answer: false,
    explanation: "False. With I in amperes, t must be in seconds to give Q in coulombs.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each product of electrolysis with the number of moles of electrons needed to form one mole of it.",
    pairs: [["silver", "1"], ["copper", "2"], ["aluminium", "3"], ["oxygen gas", "4"]],
    explanation: "Ag⁺ + e⁻ → Ag; Cu²⁺ + 2e⁻ → Cu; Al³⁺ + 3e⁻ → Al; 2H₂O → O₂ + 4H⁺ + 4e⁻.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "The charge on one mole of electrons is called the {{blank:a}} constant. It equals the Avogadro constant multiplied by the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Faraday"], choices: ["Faraday", "Avogadro", "Boltzmann"] },
      { id: "b", accepted: ["charge on one electron"], choices: ["charge on one electron", "mass of one electron", "molar volume"] },
    ],
    explanation: "F = L × e = 6.022 × 10²³ × 1.60 × 10⁻¹⁹ ≈ 9.65 × 10⁴ C mol⁻¹.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the unit of electric charge.",
    accepted: ["coulomb", "coulombs", "C"],
    wrong: ["ampere"],
    explanation: "Charge is measured in coulombs (C); 1 C = 1 A × 1 s.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how you would use copper electrodes and copper(II) sulfate solution to determine the Avogadro constant. Include the measurements you would make.",
    points: ["Clean, dry and weigh the copper cathode (and anode) before the experiment.", "Pass a constant current (measured with an ammeter, kept steady with a variable resistor) for a measured time.", "Wash, dry (e.g. with propanone) and reweigh the electrode to find the mass change.", "Calculate Q = It, moles of Cu = mass ÷ 63.5, moles of electrons = 2 × moles of Cu, and L = Q ÷ (e × moles of electrons)."],
    modelAnswer: "Weigh clean, dry copper electrodes. Set up the cell with a d.c. supply, ammeter and variable resistor in series, and pass a steady current (say 0.30 A) for a timed 40-60 minutes. Wash the cathode with water and propanone, dry and reweigh. Then Q = It; n(Cu) = mass gained ÷ 63.5; n(e⁻) = 2n(Cu); number of electrons = Q ÷ 1.60 × 10⁻¹⁹; L = number of electrons ÷ n(e⁻).",
    hints: ["What three quantities must you measure?"],
    explanation: "Credit the weighing, the constant current and time, the reweighing and the calculation.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A student's value for the Avogadro constant from a copper electrolysis experiment was 6.5 × 10²³ mol⁻¹. Suggest three possible errors and say how each would affect the result.",
    points: ["Some copper fell off the cathode (or was rubbed off when drying), so the mass gain was too small, giving L too large.", "The current fell during the run while the initial value was used, so Q was overestimated, giving L too large.", "The cathode was weighed while still wet before the run (or a small mass change measured on a 2-place balance), making the measured mass change too small or imprecise."],
    modelAnswer: "A too-small mass gain makes L too large: copper may have flaked off the cathode or been wiped off while drying, or the electrode was wet at the first weighing. A drifting current that was recorded only at the start overestimates Q, also giving L too large. Measuring a small mass change on a two-place balance adds a large percentage uncertainty.",
    hints: ["L = Q ÷ (e × n(e⁻)): which errors make Q too big or n too small?"],
    explanation: "Each point needs the error and its effect on the measured quantity.",
  });
  {
    const Q = charge(0.800, 37.0 * 60);
    const ne = molesElectrons(Q);
    const mAg = ne * 107.9;
    const mCu = (ne / 2) * 63.5;
    const vO2 = gasLiberatedRTP(Q, 4) * 1000;
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "Two electrolysis cells are connected in series and a current of 0.800 A is passed for 37.0 minutes. Cell 1 contains silver nitrate solution with silver electrodes; cell 2 contains copper(II) sulfate solution with platinum electrodes. (Ar: Ag 107.9, Cu 63.5; F = 96 500 C mol⁻¹; molar gas volume 24.0 dm³ mol⁻¹)",
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the charge passed, in C.", value: Q, unit: "C", explanation: `Q = 0.800 × 2220 = ${Q} C.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the mass of silver deposited in cell 1, in g, to three significant figures.", value: mAg, sf: 3, unit: "g", explanation: `n(e⁻) = ${Q} ÷ 96 500 = ${sfStr(ne, 3)} mol = n(Ag); mass = ${sfStr(mAg, 3)} g.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the mass of copper deposited in cell 2, in g, to three significant figures.", value: mCu, sf: 3, unit: "g", wrong: [sfStr(ne * 63.5, 3)], explanation: `n(Cu) = ${sfStr(ne, 3)} ÷ 2 = ${sfStr(ne / 2, 3)} mol; mass = ${sfStr(mCu, 3)} g.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the volume of oxygen, in cm³ at room conditions, released at the anode of cell 2, to three significant figures.", value: vO2, sf: 3, unit: "cm³", wrong: [sfStr(vO2 * 2, 3)], explanation: `n(O₂) = ${sfStr(ne, 3)} ÷ 4 = ${sfStr(ne / 4, 3)} mol; V = ${sfStr(ne / 4, 3)} × 24 000 = ${sfStr(vO2, 3)} cm³.` }),
        P.manual({ label: "(e)", marks: 1, stem: "State what happens to the silver anode in cell 1.", points: ["It dissolves (Ag → Ag⁺ + e⁻), losing the same mass as the cathode gains."], modelAnswer: "The silver anode dissolves, Ag → Ag⁺ + e⁻, losing the same mass that is deposited on the cathode." }),
      ],
      hints: ["In series, the same charge passes through both cells.", "Ag needs 1 e⁻, Cu 2 e⁻, O₂ 4 e⁻."],
      explanation: `Q = ${Q} C; Ag ${sfStr(mAg, 3)} g; Cu ${sfStr(mCu, 3)} g; O₂ ${sfStr(vO2, 3)} cm³.`,
    });
  }
  {
    const I = 0.350, tmin = 50.0, m0 = 41.62, m1 = 41.97;
    const dm = m1 - m0;
    const Q = charge(I, tmin * 60);
    const Lv = avogadroFromElectrolysis(Q, dm, 63.5, 2);
    const pctBal = (0.01 / dm) * 100;
    b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, calculator: true,
      stem: `Chipo passed a current of 0.350 A for 50.0 minutes through copper(II) sulfate solution with copper electrodes. The cathode weighed ${m0.toFixed(2)} g before and ${m1.toFixed(2)} g after. (Ar: Cu 63.5; e = 1.60 × 10⁻¹⁹ C)`,
      parts: [
        P.num({ label: "(a)", marks: 3, stem: "Calculate a value for the Avogadro constant from these results, in mol⁻¹, to three significant figures.", value: Lv, sf: 3, unit: "mol⁻¹", explanation: `Q = 0.350 × 3000 = ${Q} C; electrons = ${sciStr(Q / E_CHARGE, 3)}; n(Cu) = ${dpStr(dm, 2)} ÷ 63.5 = ${sfStr(dm / 63.5, 3)} mol; n(e⁻) = ${sfStr((2 * dm) / 63.5, 3)} mol; L = ${sciStr(Lv, 3)} mol⁻¹.` }),
        P.num({ label: "(b)", marks: 1, stem: "The balance reads to ±0.005 g, so the mass change is uncertain by ±0.01 g. Calculate the percentage uncertainty in the mass change, to two significant figures.", value: pctBal, sf: 2, unit: "%", explanation: `0.01 ÷ ${dpStr(dm, 2)} × 100 = ${sfStr(pctBal, 2)}%.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Suggest two changes to the method that would reduce the percentage uncertainty in the result.", points: ["Pass the current for longer (or use a larger, steady current within limits) so the mass change is larger.", "Use a more precise balance (three or four decimal places)."], modelAnswer: "Run the electrolysis for longer so that more copper is deposited (a larger mass change), and weigh on a three- or four-place balance." }),
      ],
      hints: ["Find Q, then moles of electrons from the mass of copper."],
      explanation: `L ≈ ${sciStr(Lv, 3)} mol⁻¹, close to 6.02 × 10²³; the mass change carries the largest uncertainty (${sfStr(pctBal, 2)}%).`,
    });
  }
  b.card("FORMULA", "Charge", "Q = It (Q in C, I in A, t in s).");
  b.card("FACT", "Faraday constant", "F = 9.65 × 10⁴ C mol⁻¹, the charge on one mole of electrons.");
  b.card("FORMULA", "F, L and e", "F = L × e (e = 1.60 × 10⁻¹⁹ C).");
  b.card("CONCEPT", "Electrolysis calculation route", "Q = It → n(e⁻) = Q/F → ÷ electrons per particle → mass (×M) or gas volume (×24.0 dm³).");
  b.card("FACT", "Electrons per mole of product", "Ag 1, H₂ 2, Cl₂ 2, Cu 2, Al 3, O₂ 4.");
  b.card("CONCEPT", "Charge on an ion from data", "z = moles of electrons passed ÷ moles of metal deposited.");
  b.card("CONCEPT", "Avogadro constant by electrolysis", "L = (Q ÷ e) ÷ n(e⁻), with n(e⁻) = 2 × mass change of copper electrode ÷ 63.5.");
  b.card("CONCEPT", "Main errors in the Avogadro experiment", "Current not constant; copper falling off the cathode; wet electrodes; small mass change on an imprecise balance.");
});
