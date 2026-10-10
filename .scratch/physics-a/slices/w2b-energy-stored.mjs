// W2b: aphys.capacitance.energy-stored — W = ½QV = ½CV² = Q²/2C, area under V-Q graph, applications, half the energy lost.
import { concept, P, t, chk, sfStr, dpStr, sciTex, pctUnc, seriesC, parallelC } from "../lib.mjs";

const u = 1e-6;
const Wc = (C, V) => 0.5 * C * V * V;

concept("aphys.capacitance.energy-stored", { file: "capacitance/energy-stored", keyPrefix: "capacitance.energy-stored" }, (b) => {
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The energy stored in a charged capacitor is represented by which area?",
    options: [
      ["The area under a graph of p.d. (y-axis) against charge (x-axis)", "Correct: ΔW = VΔQ for each small charge added."],
      ["The area under a graph of charge (y-axis) against time (x-axis)", "This area has units C s, which is not an energy."],
      ["The gradient of a graph of charge against p.d.", "That gradient is the capacitance."],
      ["The area under a graph of current against time", "That area is the charge that has flowed."],
    ],
    answer: "A",
    explanation: "Work to add charge ΔQ at p.d. V is VΔQ, so the energy is the area under the V-Q graph: a triangle, ½QV.",
  });
  {
    const C = 100 * u, V = 50;
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`What energy is stored in a $100\ \mu\text{F}$ capacitor charged to $50\ \text{V}$?`,
      options: [
        [`${sfStr(Wc(C, V), 3)} J`, "Correct: ½CV² = ½ × 100 × 10⁻⁶ × 2500."],
        [`${sfStr(C * V * V, 3)} J`, "This forgets the ½."],
        [`${sfStr(0.5 * C * V, 3)} J`, "This forgets to square V."],
        [`${sfStr(0.5 * 100 * V * V, 3)} J`,"This leaves C in µF instead of F."],
      ],
      answer: "A",
      explanation: t`$W = \tfrac{1}{2}CV^2 = \tfrac{1}{2} \times 100 \times 10^{-6} \times 50^2 = ${sfStr(Wc(C, V), 3)}\ \text{J}$.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The p.d. across a capacitor is tripled. By what factor does the energy stored change?",
    options: [
      ["9", "Correct: W ∝ V²."],
      ["3", "The charge triples, but the energy depends on V²."],
      ["6", "There is no reason for a factor 2 × 3."],
      ["1.5", "This halves the factor of 3 by misusing the ½ in ½CV²."],
    ],
    answer: "A",
    explanation: "W = ½CV², so tripling V multiplies W by 3² = 9.",
  });
  {
    const Q = 3.0e-3, C = 47 * u;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A $47\ \mu\text{F}$ capacitor holds a charge of $3.0\ \text{mC}$. What energy does it store?`,
      options: [
        [t`$${sciTex((Q * Q) / (2 * C), 2)}\ \text{J}$`, "Correct: Q²/2C."],
        [t`$${sciTex((Q * Q) / C, 2)}\ \text{J}$`, "This forgets the factor 2 in the denominator."],
        [t`$${sciTex(0.5 * Q * C, 2)}\ \text{J}$`, "This multiplies Q by C instead of using V = Q/C."],
        [t`$${sciTex(Q / (2 * C), 2)}\ \text{J}$`, "This is V/2, a p.d., not an energy: Q is not squared."],
      ],
      answer: "A",
      explanation: t`$W = \dfrac{Q^2}{2C} = \dfrac{(3.0 \times 10^{-3})^2}{2 \times 47 \times 10^{-6}} = ${sciTex((Q * Q) / (2 * C), 2)}\ \text{J}$.`,
      hints: ["Use the form with Q and C."],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A battery of e.m.f. E charges an uncharged capacitor fully through a resistor. Which statement about the energy is correct?",
    options: [
      ["The battery supplies QE; half is stored and half is dissipated in the resistor, whatever its resistance.", "Correct: the loss is ½QE independent of R."],
      ["The battery supplies ½QE, all of which is stored in the capacitor.", "The battery moves all the charge through its full e.m.f., supplying QE."],
      ["A smaller resistor reduces the energy dissipated, so more than half is stored.", "A smaller R gives a bigger current for a shorter time; the loss is still ½QE."],
      ["The battery supplies QE and all of it is stored, because the capacitor has no resistance.", "Only ½QE is stored; the rest heats the circuit resistance."],
    ],
    answer: "A",
    explanation: "Energy supplied = QE; stored = ½QE; the other ½QE is dissipated in the resistance (and radiated), independent of R.",
    hints: ["Charge Q passes through the whole e.m.f. of the battery."],
  });
  {
    // capacitor charged; plates' p.d. halved by discharging: fraction of energy remaining
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: "A capacitor in a clock's backup supply discharges until its p.d. has fallen to half its initial value. What fraction of the initial stored energy has been delivered?",
      options: [
        ["3/4", "Correct: W ∝ V², so ¼ remains and ¾ has been delivered."],
        ["1/2", "Energy is not proportional to V."],
        ["1/4", "This is the fraction remaining, not the fraction delivered."],
        ["1/8", "Energy depends on V², not V³."],
      ],
      answer: "A",
      explanation: "W ∝ V². At half the p.d., (½)² = ¼ of the energy remains, so ¾ has been delivered.",
      hints: ["Compare W at V and at V/2."],
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`Calculate the energy stored in a $4700\ \mu\text{F}$ capacitor charged to $9.0\ \text{V}$, in J, to three significant figures.`,
    value: Wc(4700 * u, 9), unit: "J", wrong: [4700 * u * 81, 0.5 * 4700 * u * 9],
    explanation: t`$W = \tfrac{1}{2} \times 4700 \times 10^{-6} \times 9.0^2 = ${sfStr(Wc(4700 * u, 9), 3)}\ \text{J}$.`,
  });
  {
    const W = 150, C = 25 * u;
    const V = Math.sqrt((2 * W) / C);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A defibrillator's $25\ \mu\text{F}$ capacitor must store $150\ \text{J}$. Calculate the p.d. to which it must be charged, in V, to three significant figures.`,
      value: V, unit: "V", wrong: [W / C, Math.sqrt(W / C)],
      explanation: t`1. $W = \tfrac{1}{2}CV^2$, so $V = \sqrt{\dfrac{2W}{C}}$.
2. $V = \sqrt{\dfrac{2 \times 150}{25 \times 10^{-6}}} = ${sciTex(V)}\ \text{V}$.
3. Forgetting the 2 gives a value about 30% too small.`,
      hints: ["Rearrange W = ½CV² for V."],
    });
  }
  {
    const C = 1000 * u, V = 200, tt = 2.0e-3;
    const W = Wc(C, V);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $1000\ \mu\text{F}$ capacitor charged to $200\ \text{V}$ is discharged through a spot-welding electrode in $2.0\ \text{ms}$. Calculate the average power delivered, in W, to two significant figures.`,
      value: W / tt, sf: 2, unit: "W", wrong: [(C * V * V) / tt, W],
      explanation: t`1. $W = \tfrac{1}{2} \times 1000 \times 10^{-6} \times 200^2 = ${W}\ \text{J}$.
2. $P = \dfrac{W}{t} = \dfrac{${W}}{2.0 \times 10^{-3}} = ${sciTex(W / tt, 2)}\ \text{W}$.`,
      hints: ["Find the energy, then divide by the time."],
    });
  }
  {
    const C1 = 10 * u, V1 = 12, C2 = 30 * u;
    const Vf = (C1 * V1) / (C1 + C2);
    const lost = Wc(C1, V1) - Wc(C1 + C2, Vf);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A $10\ \mu\text{F}$ capacitor charged to $12\ \text{V}$ is connected across an uncharged $30\ \mu\text{F}$ capacitor. Calculate the energy dissipated during the sharing of charge, in J, to two significant figures.`,
      value: lost, sf: 2, unit: "J", wrong: [Wc(C1, V1) / 2, Wc(C1 + C2, Vf)],
      explanation: t`1. Before: $W_1 = \tfrac{1}{2} \times 10 \times 10^{-6} \times 12^2 = ${sciTex(Wc(C1, V1), 2)}\ \text{J}$.
2. Common p.d. $= \dfrac{120\ \mu\text{C}}{40\ \mu\text{F}} = ${Vf}\ \text{V}$.
3. After: $W_2 = \tfrac{1}{2} \times 40 \times 10^{-6} \times ${Vf}^2 = ${sciTex(Wc(C1 + C2, Vf), 2)}\ \text{J}$.
4. Dissipated $= ${sciTex(lost, 2)}\ \text{J}$ (three quarters of the original energy here). Half is lost only when the capacitors are equal.`,
      hints: ["Charge is conserved, energy is not.", "Find the common p.d. first."],
    });
  }
  {
    const C = 2200 * u, Vmax = 5.0, Vmin = 3.0, P = 0.020;
    const Wuse = Wc(C, Vmax) - Wc(C, Vmin);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A memory chip draws an average power of $20\ \text{mW}$ from a $2200\ \mu\text{F}$ backup capacitor charged to $5.0\ \text{V}$. The chip stops working when the p.d. falls below $3.0\ \text{V}$. Estimate how long the backup lasts, in s, to two significant figures.`,
      value: Wuse / P, sf: 2, unit: "s", wrong: [Wc(C, Vmax) / P, Wc(C, Vmax - Vmin) / P],
      explanation: t`Usable energy $= \tfrac{1}{2}C(5.0^2 - 3.0^2) = \tfrac{1}{2} \times 2200 \times 10^{-6} \times 16 = ${sfStr(Wuse, 3)}\ \text{J}$. Time $= \dfrac{${sfStr(Wuse, 3)}}{0.020} = ${sfStr(Wuse / P, 2)}\ \text{s}$. Using $\tfrac{1}{2}C(5.0 - 3.0)^2$ is wrong: subtract energies, not p.d.s.`,
      hints: ["Energy available = energy at 5.0 V − energy at 3.0 V."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When a capacitor is charged from a battery through a resistor, using a resistor of smaller resistance reduces the energy wasted.",
    answer: false,
    explanation: "False. A smaller resistance gives a larger current for a shorter time; the energy dissipated is always ½QE, half of that supplied.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each pair of known quantities with the most direct formula for the energy stored.",
    pairs: [
      ["C and V", t`$\tfrac{1}{2}CV^2$`],
      ["Q and V", t`$\tfrac{1}{2}QV$`],
      ["Q and C", t`$\dfrac{Q^2}{2C}$`],
    ],
    explanation: "All three are equivalent via Q = CV; pick the form that uses the given data.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the explanation of the factor ½.",
    template: "As the capacitor charges, the p.d. rises {{blank:a}} from zero to V, so the average p.d. through which the charge is moved is {{blank:b}}. The energy stored is therefore Q × V/2.",
    blanks: [
      { id: "a", accepted: ["linearly"], choices: ["linearly", "exponentially", "instantly"] },
      { id: "b", accepted: ["V/2"], choices: ["V/2", "V", "2V"] },
    ],
    explanation: "V ∝ Q, so the average p.d. is V/2 and W = ½QV.",
  });
  b.short({
    d: 2, skill: "UNDERSTANDING",
    stem: "What fraction of the energy supplied by a battery is stored in a capacitor that it charges fully through a resistor?",
    accepted: ["half", "1/2", "one half", "0.5", "50%", "a half"],
    explanation: "**Half**: the battery supplies QE and ½QE is stored.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Show that the energy stored in a capacitor of capacitance C charged to p.d. V is ½CV².",
    points: [
      "Work done to add charge ΔQ at p.d. V is VΔQ, so energy = area under the V-Q graph.",
      "V ∝ Q (V = Q/C), so the graph is a straight line through the origin and the area is ½QV.",
      "Substituting Q = CV gives W = ½CV².",
    ],
    modelAnswer: "Adding charge ΔQ at p.d. V needs work VΔQ, so the energy stored is the area under the graph of V against Q. Since V = Q/C, this is a straight line through the origin, and the area is a triangle, ½QV. With Q = CV, W = ½CV².",
    explanation: "Area under a straight-line V-Q graph.",
    hints: ["What does the area under a V-Q graph represent?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a camera flash uses a capacitor rather than connecting the flash tube directly to its battery.",
    points: [
      "The flash needs a very large power for a very short time (about a millisecond).",
      "A battery cannot deliver such a large current/power (its internal resistance limits it).",
      "The battery charges the capacitor slowly; the capacitor then releases its stored energy very quickly through the low-resistance tube, giving the large power.",
    ],
    modelAnswer: "The flash needs thousands of watts for about a millisecond. A small battery's internal resistance limits it to a few watts, so it charges the capacitor slowly over a second or so; the capacitor can then deliver its stored energy through the flash tube in a very short time, giving the required large power.",
    explanation: "Slow charge, fast release, so a large power.",
    hints: ["Compare the power the battery can supply with the power the flash needs."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Explain where the 'missing' half of the energy goes when a battery charges a capacitor, and why the amount lost does not depend on the resistance of the circuit.",
    points: [
      "It is dissipated as thermal energy in the resistance of the circuit (wires, internal resistance), with a little radiated.",
      "With a smaller resistance the current is larger but flows for a shorter time (time constant RC is shorter).",
      "These effects cancel: the total energy dissipated (∫I²R dt) is always ½QE.",
    ],
    modelAnswer: "The energy is converted to thermal energy in the resistance of the circuit, including the battery's internal resistance, with a small amount radiated. Reducing the resistance makes the current larger but shortens the charging time (RC is smaller), and the two effects exactly balance, so the energy dissipated is always ½QE.",
    explanation: "Energy dissipated is independent of R.",
    hints: ["What happens to the current and the charging time when R is made smaller?"],
  });

  // Practice structured: a defibrillator (12 marks)
  {
    const C = 40 * u, V = 3.0e3, tt = 5.0e-3, eff = 0.75;
    const W = Wc(C, V);
    const Q = C * V;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A defibrillator contains a $40\ \mu\text{F}$ capacitor charged to $3.0\ \text{kV}$. It is discharged through the patient's chest in about $5.0\ \text{ms}$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the charge stored, in C.", value: Q, unit: "C", wrong: [40 * 3000], explanation: t`$Q = CV = 40 \times 10^{-6} \times 3.0 \times 10^{3} = ${Q}\ \text{C}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the energy stored, in J.", value: W, unit: "J", wrong: [Q * V], explanation: t`$W = \tfrac{1}{2}QV = \tfrac{1}{2} \times ${Q} \times 3.0 \times 10^{3} = ${W}\ \text{J}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the average power delivered during the discharge, in W, to two significant figures.", value: W / tt, sf: 2, unit: "W", wrong: [W * tt], explanation: t`$P = ${W}/(5.0 \times 10^{-3}) = ${sciTex(W / tt, 2)}\ \text{W}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "The charging circuit is 75% efficient. Calculate the energy taken from the supply to charge the capacitor, in J.", value: W / eff, unit: "J", wrong: [W * eff], explanation: t`$${W}/0.75 = ${W / eff}\ \text{J}$.` }),
        P.num({ label: "(e)", marks: 2, stem: "A second shock needs 200 J. Calculate the p.d. needed, in kV, to three significant figures.", value: Math.sqrt((2 * 200) / C) / 1000, unit: "kV", wrong: [(200 / W) * 3.0], explanation: t`$V = \sqrt{2W/C} = \sqrt{400/(40 \times 10^{-6})} = ${sciTex(Math.sqrt((2 * 200) / C))}\ \text{V} = ${sfStr(Math.sqrt((2 * 200) / C) / 1000, 3)}\ \text{kV}$. Energy ∝ V², so V does not scale linearly with W.` }),
        P.manual({ label: "(f)", marks: 2, stem: "State two safety precautions for staff using or servicing a defibrillator.", points: ["Nobody touches the patient (or the bed) during the shock: 'stand clear'.", "Discharge the capacitor safely through a resistor before servicing; the kilovolt p.d. can remain after switch-off."], modelAnswer: "Everyone stands clear of the patient and bed when the shock is delivered, and before servicing the capacitor is discharged through a suitable resistor, because it can hold a lethal charge after the unit is switched off." }),
      ],
      explanation: "Q = CV, W = ½QV = ½CV²; power = energy/time.",
      hints: ["kV means × 10³ V.", "W = ½CV²."],
    });
  }
  // Practice structured: energy from a V-Q graph with uncertainty (8 marks)
  {
    const C = 680 * u, dC = 0.1, V = 10.0, dV = 0.1;
    const W = Wc(C, V);
    const pct = dC * 100 + 2 * pctUnc(dV, V);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Chipo charges a $680\ \mu\text{F}$ capacitor (tolerance $\pm 10\%$) to $(10.0 \pm 0.1)\ \text{V}$.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Describe the graph of p.d. against charge for the charging capacitor and state what its area represents.", points: ["A straight line through the origin with gradient 1/C, ending at (Q, V).", "The area under it (a triangle, ½QV) is the energy stored."], modelAnswer: "p.d. against charge is a straight line through the origin with gradient 1/C, ending at Q = CV; the triangular area under it, ½QV, is the energy stored." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the energy stored, in J, to two significant figures.", value: W, sf: 2, unit: "J", wrong: [C * V * V], explanation: t`$\tfrac{1}{2} \times 680 \times 10^{-6} \times 10.0^2 = ${sfStr(W, 3)}\ \text{J}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the percentage uncertainty in the energy, to two significant figures.", value: pct, sf: 2, unit: "%", wrong: [dC * 100 + pctUnc(dV, V)], explanation: t`$10\% + 2 \times \dfrac{0.1}{10.0} \times 100\% = 10 + 2 = ${sfStr(pct, 2)}\%$ (V is squared).` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain which uncertainty dominates and how the energy could be determined more accurately.", points: ["The 10% tolerance of the capacitance dominates.", "Measure C directly (e.g. from a discharge time constant or a coulombmeter) before using it, rather than relying on the marked value."], modelAnswer: "The ±10% tolerance in C dominates the ±2% from the p.d. The energy would be more accurate if C were measured first, for example from the time constant of a discharge through a known resistor, rather than taken from the marking." }),
      ],
      explanation: "W = ½CV²; percentage uncertainties add, with V's doubled.",
      hints: ["For V², double the percentage uncertainty."],
    });
  }

  b.card("FORMULA", "Energy stored in a capacitor", t`$W = \tfrac{1}{2}QV = \tfrac{1}{2}CV^2 = \dfrac{Q^2}{2C}$`);
  b.card("CONCEPT", "Energy from a graph", "Energy stored = area under the p.d.-charge graph (a triangle, ½QV).");
  b.card("CONCEPT", "Why the factor ½", "The p.d. rises linearly from 0 to V while charging, so the average p.d. is V/2.");
  b.card("CONCEPT", "Energy and p.d.", "W ∝ V²: doubling V quadruples the energy; halving V leaves a quarter.");
  b.card("FACT", "Charging from a battery", "Battery supplies QE; half is stored; half is dissipated in the circuit resistance, whatever its value.");
  b.card("CONCEPT", "Charge sharing between capacitors", "Charge is conserved but energy is lost (as heat and radiation in the connections).");
  b.card("CONCEPT", "Camera flash principle", "Battery charges the capacitor slowly; it discharges in ~1 ms, giving a very large power.");
  b.card("FORMULA", "Usable energy between two p.d.s", t`$\Delta W = \tfrac{1}{2}C(V_1^2 - V_2^2)$`);
});
