// W2b: aphys.capacitance.discharge — exponential discharge, τ = RC, x = x₀e^(−t/RC), half-time, ln graphs, charging curves.
import { concept, P, t, ZIM, chk, sfStr, dpStr, sciTex, pctUnc, linFit, ln, table, capDischarge } from "../lib.mjs";

const u = 1e-6;

concept("aphys.capacitance.discharge", { file: "capacitance/discharge", keyPrefix: "capacitance.discharge" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A capacitor discharges through a resistor. What fraction of its initial charge remains after one time constant?",
    options: [
      [t`$1/e$, about 37%`, "Correct: Q = Q₀e⁻¹ at t = RC."],
      ["One half, 50%", "That is after the half-time, 0.693RC."],
      [t`$1 - 1/e$, about 63%`, "63% is the fraction lost (or the fraction reached when charging)."],
      ["None: it is fully discharged", "An exponential never reaches zero; after 5RC less than 1% remains."],
    ],
    answer: "A",
    explanation: "At t = RC, Q = Q₀e⁻¹ ≈ 0.37Q₀.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which correctly shows that the product RC has the unit of time?",
    options: [
      [t`$\Omega\,\text{F} = (\text{V A}^{-1})(\text{C V}^{-1}) = \text{C A}^{-1} = \text{s}$`, "Correct: a coulomb per ampere is a second."],
      [t`$\Omega\,\text{F} = (\text{V A})(\text{C V}) = \text{C A V}^2$`, "Ω = V A⁻¹ and F = C V⁻¹, not V A and C V."],
      [t`$\Omega\,\text{F} = (\text{A V}^{-1})(\text{V C}^{-1}) = \text{A C}^{-1} = \text{s}^{-1}$`, "These are the reciprocals of the ohm and the farad."],
      [t`$\Omega\,\text{F} = (\text{J C}^{-1})(\text{C V}^{-1}) = \text{J V}^{-1} = \text{s}$`, "J C⁻¹ is the volt, not the ohm, and J V⁻¹ is a coulomb, not a second."],
    ],
    answer: "A",
    explanation: "Ω = V/A and F = C/V, so Ω F = C/A = (A s)/A = s.",
  });
  {
    const R = 10e3, C = 220 * u;
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`What is the time constant of a $220\ \mu\text{F}$ capacitor discharging through a $10\ \text{k}\Omega$ resistor?`,
      options: [
        [`${sfStr(R * C, 2)} s`, "Correct: RC = 10 × 10³ × 220 × 10⁻⁶."],
        ["2200 s", "This multiplies 10 × 220 without the powers of ten."],
        [`${sfStr(0.693 * R * C, 2)} s`, "This is the half-time, 0.693RC."],
        [`${sfStr((R * C) / 1000, 2)} s`, "This loses a factor of 1000 in the prefixes."],
      ],
      answer: "A",
      explanation: t`$\tau = RC = 10 \times 10^{3} \times 220 \times 10^{-6} = ${sfStr(R * C, 2)}\ \text{s}$.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "During the discharge of a capacitor through a fixed resistor, which statement about the current is correct?",
    options: [
      ["It decays exponentially with the same time constant as the p.d.", "Correct: I = V/R, so I is proportional to V."],
      ["It stays constant until the capacitor is empty, then falls to zero.", "The current falls as the p.d. falls; it is never constant."],
      ["It decreases linearly to zero in a time RC.", "The decrease is exponential, not linear."],
      ["It increases as the capacitor discharges.", "A smaller p.d. drives a smaller current through R."],
    ],
    answer: "A",
    explanation: "I = V/R at every instant, and V decays exponentially, so I decays exponentially with the same τ = RC.",
  });
  {
    const V0 = 12, tt = 3.0, RC = 2.0;
    const V = capDischarge(V0, RC, 1, tt);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A capacitor charged to $12\ \text{V}$ discharges through a resistor with $RC = 2.0\ \text{s}$. What is the p.d. after $3.0\ \text{s}$?`,
      options: [
        [`${sfStr(V, 2)} V`, "Correct: 12e^(−1.5)."],
        [`${sfStr(V0 * Math.exp(-RC / tt), 2)} V`, "This uses e^(−RC/t), with the ratio inverted."],
        [`${sfStr(V0 * (1 - Math.exp(-tt / RC)), 2)} V`, "This is the charging formula: the p.d. rises, not falls."],
        [`${sfStr(V0 * 10 ** (-tt / RC), 2)} V`, "This uses 10 as the base instead of e."],
      ],
      answer: "A",
      explanation: t`$V = 12\,e^{-3.0/2.0} = 12 \times ${dpStr(Math.exp(-1.5), 3)} = ${sfStr(V, 2)}\ \text{V}$.`,
      hints: ["V = V₀e^(−t/RC)."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A graph of ln(V/V) against t is plotted for a discharging capacitor. Which describes it?",
    options: [
      ["A straight line with negative gradient −1/RC and intercept ln V₀", "Correct: ln V = ln V₀ − t/RC."],
      ["A straight line through the origin with gradient RC", "The line does not pass through the origin, and the gradient is −1/RC."],
      ["A curve that approaches zero asymptotically", "That is the V-t graph; taking logs makes it straight."],
      ["A straight line with negative gradient −RC and intercept V₀", "The gradient is −1/RC and the intercept is ln V₀, not V₀."],
    ],
    answer: "A",
    explanation: "Taking ln of V = V₀e^(−t/RC) gives ln V = ln V₀ − (1/RC)t: y = c + mx with m = −1/RC.",
    hints: ["Take natural logarithms of both sides."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A capacitor discharges through resistor R. The experiment is repeated with the same capacitor, same initial p.d. and a resistor of 2R. Which statement is correct?",
    options: [
      ["The initial current halves and the time constant doubles.", "Correct: I₀ = V₀/R and τ = RC."],
      ["The initial current doubles and the time constant halves.", "A larger resistance gives a smaller current and a slower discharge."],
      ["The initial current halves and the time constant is unchanged.", "τ = RC depends on R."],
      ["The initial current is unchanged and the time constant doubles.", "I₀ = V₀/R depends on R."],
    ],
    answer: "A",
    explanation: "I₀ = V₀/(2R) is halved; τ = 2RC is doubled. The total charge that flows (the area under I-t) is unchanged, CV₀.",
    hints: ["Use I₀ = V₀/R and τ = RC."],
  });
  {
    const R = 33e3, C = 1000 * u;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Calculate the time for the p.d. across a $1000\ \mu\text{F}$ capacitor discharging through a $33\ \text{k}\Omega$ resistor to halve, in s, to three significant figures.`,
      value: Math.LN2 * R * C, unit: "s", wrong: [R * C, (R * C) / 2],
      explanation: t`$t_{1/2} = RC\ln 2 = 33 \times 10^{3} \times 1000 \times 10^{-6} \times 0.693 = ${sfStr(Math.LN2 * R * C, 3)}\ \text{s}$. $RC$ alone is the time to fall to 37%.`,
    });
  }
  {
    const C = 680 * u, R = 15e3, V0 = 6.0, V = 1.5;
    const tt = R * C * Math.log(V0 / V);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $680\ \mu\text{F}$ capacitor charged to $6.0\ \text{V}$ discharges through a $15\ \text{k}\Omega$ resistor. Calculate the time for the p.d. to fall to $1.5\ \text{V}$, in s, to three significant figures.`,
      value: tt, unit: "s", wrong: [R * C * Math.log10(V0 / V), R * C * (V0 / V)],
      explanation: t`1. $RC = 15 \times 10^{3} \times 680 \times 10^{-6} = ${sfStr(R * C, 3)}\ \text{s}$.
2. $t = RC\ln\dfrac{V_0}{V} = ${sfStr(R * C, 3)} \times \ln 4.0 = ${sfStr(tt, 3)}\ \text{s}$ (two half-times).
3. Using lg instead of ln gives a value 2.30 times too small.`,
      hints: ["Rearrange V = V₀e^(−t/RC) using ln."],
    });
  }
  {
    const C = 2200 * u, R = 4.7e3, V0 = 10, tt = 5.0;
    const I = (V0 / R) * Math.exp(-tt / (R * C));
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A $2200\ \mu\text{F}$ capacitor charged to $10\ \text{V}$ discharges through a $4.7\ \text{k}\Omega$ resistor. Calculate the current after $5.0\ \text{s}$, in mA, to three significant figures.`,
      value: I * 1000, unit: "mA", wrong: [(V0 / R) * 1000, (V0 / R) * Math.exp(-tt / (R * C)) ],
      explanation: t`1. $I_0 = \dfrac{V_0}{R} = \dfrac{10}{4700} = ${sciTex(V0 / R)}\ \text{A}$.
2. $RC = 4700 \times 2200 \times 10^{-6} = ${sfStr(R * C, 4)}\ \text{s}$.
3. $I = I_0e^{-t/RC} = ${sciTex(V0 / R)} \times e^{-5.0/${sfStr(R * C, 4)}} = ${sciTex(I)}\ \text{A} = ${sfStr(I * 1000, 3)}\ \text{mA}$.`,
      hints: ["Find I₀ = V₀/R first."],
    });
  }
  {
    // find C from half-time measurement
    const R = 47e3, th = 16.3;
    const C = th / (Math.LN2 * R);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A capacitor discharging through a $47\ \text{k}\Omega$ resistor takes $16.3\ \text{s}$ for its p.d. to halve. Calculate its capacitance, in µF, to three significant figures.`,
      value: (C / u), unit: "µF", wrong: [(th / R) / u, (th * Math.LN2) / R / u],
      explanation: t`$t_{1/2} = 0.693RC$, so $C = \dfrac{16.3}{0.693 \times 47 \times 10^{3}} = ${sciTex(C)}\ \text{F} = ${sfStr(C / u, 3)}\ \mu\text{F}$. Forgetting $\ln 2$ treats the half-time as the time constant.`,
      hints: ["t½ = RC ln 2."],
    });
  }
  {
    const C = 100 * u, R = 27e3, E = 6.0, tt = 4.0;
    const V = E * (1 - Math.exp(-tt / (R * C)));
    b.num({
      d: 4, skill: "APPLICATION", calculator: true, applies: ZIM,
      stem: t`An uncharged $100\ \mu\text{F}$ capacitor is charged through a $27\ \text{k}\Omega$ resistor from a $6.0\ \text{V}$ supply of negligible internal resistance. Calculate the p.d. across the capacitor after $4.0\ \text{s}$, in V, to three significant figures.`,
      value: V, unit: "V", wrong: [E * Math.exp(-tt / (R * C))],
      explanation: t`$RC = 2.7\ \text{s}$. $V = E(1 - e^{-t/RC}) = 6.0(1 - e^{-4.0/2.7}) = ${sfStr(V, 3)}\ \text{V}$. The discharge formula would give the p.d. still to be gained, $${sfStr(E - V, 3)}\ \text{V}$.`,
      hints: ["When charging, V rises towards E: V = E(1 − e^(−t/RC))."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In each time interval equal to the half-time, a discharging capacitor loses the same fraction of its remaining charge.",
    answer: true,
    explanation: "True. Exponential decay removes a constant fraction (here one half) in each equal interval, not a constant amount.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "For a capacitor discharging through a resistor, match each graph feature with what it represents.",
    pairs: [
      ["gradient of the charge-time graph at a point", "minus the current at that instant"],
      ["area under the current-time graph", "charge that has flowed off the capacitor"],
      ["gradient of the ln V against t graph", "−1/RC"],
      ["time for V to fall to 37% of V₀", "the time constant RC"],
    ],
    explanation: "I = −dQ/dt; Q = ∫I dt; ln V = ln V₀ − t/RC; e⁻¹ ≈ 0.37.",
    hints: ["Current is the rate of flow of charge."],
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the explanation of the shape of the discharge curve.",
    template: "As charge flows off, the p.d. across the capacitor {{blank:a}}, so the current through the resistor {{blank:b}}, and charge is lost more {{blank:c}}. The rate of loss is proportional to the charge remaining.",
    blanks: [
      { id: "a", accepted: ["falls"], choices: ["falls", "rises", "stays constant"] },
      { id: "b", accepted: ["falls"], choices: ["falls", "rises", "stays constant"] },
      { id: "c", accepted: ["slowly"], choices: ["slowly", "quickly"] },
    ],
    explanation: "dQ/dt = −Q/RC: smaller Q means a smaller rate of loss, so the curve flattens.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "What name is given to the product RC for a capacitor discharging through a resistor?",
    accepted: ["time constant", "the time constant", "tau"],
    explanation: "The **time constant** τ = RC, measured in seconds.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the graph of p.d. against time for a capacitor discharging through a resistor, as you would sketch it, marking two key points.",
    points: [
      "Starts at V₀ on the p.d. axis at t = 0.",
      "Falls with the steepest gradient at t = 0; the gradient decreases continuously (curve concave upwards).",
      "Approaches zero asymptotically (never reaches zero).",
      "Marked points: 0.37V₀ at t = RC (and/or 0.5V₀ at 0.693RC).",
    ],
    modelAnswer: "The curve starts at V₀ at t = 0 and falls, steeply at first and then more and more gently, approaching the time axis without reaching it. At t = RC the p.d. is 0.37V₀, and at t = 0.693RC it is 0.5V₀.",
    explanation: "Exponential decay curve.",
    hints: ["Where is the gradient steepest?"],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Explain why the discharge of a capacitor through a resistor is exponential.",
    points: [
      "The current is I = V/R = Q/(RC), proportional to the charge remaining.",
      "The current is the rate of loss of charge: dQ/dt = −Q/RC.",
      "A rate of decrease proportional to the quantity itself gives exponential decay, Q = Q₀e^(−t/RC).",
    ],
    modelAnswer: "At any instant the current is I = V/R = Q/(RC), and this current is the rate at which charge leaves the capacitor, so dQ/dt = −Q/RC. A quantity whose rate of decrease is proportional to its own value decays exponentially: Q = Q₀e^(−t/RC).",
    explanation: "Rate of loss ∝ amount remaining.",
    hints: ["Write the current in terms of Q."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how the current, the p.d. across the capacitor and the charge change while an uncharged capacitor is charged through a resistor from a d.c. supply.",
    points: [
      "Current starts at its maximum E/R and decays exponentially to zero (time constant RC).",
      "The p.d. across the capacitor rises from zero towards E, quickly at first then levelling off.",
      "The charge rises in the same way towards CE (63% after one time constant).",
    ],
    modelAnswer: "At the instant of connection the capacitor has no p.d., so the current is E/R; as charge builds up the capacitor's p.d. opposes the supply, so the current decays exponentially with time constant RC. The p.d. and charge rise from zero towards E and CE along a curve that is steep at first and then levels off, reaching 63% after RC.",
    explanation: "Charging: current decays; V and Q rise to their final values.",
    hints: ["What opposes the supply as the capacitor charges?"],
  });

  // Practice structured: discharge data and a ln graph (14 marks)
  {
    const C = 470 * u, R = 68e3, V0 = 9.0;
    const RC = R * C;
    const ts = [0, 10, 20, 30, 40, 50, 60];
    const nz = [0, 0.03, -0.02, 0.02, -0.01, 0.01, -0.01];
    const Vs = ts.map((x, i) => Math.round((V0 * Math.exp(-x / RC) + nz[i]) * 100) / 100);
    const fit = linFit(ts, Vs.map(ln));
    const RCfit = -1 / fit.m;
    const row = 3;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Tendai charges a capacitor to $9.0\ \text{V}$ and lets it discharge through a $68\ \text{k}\Omega$ resistor, reading the p.d. with a data logger:

${table([t`$t\,/\,\text{s}$`, t`$V\,/\,\text{V}$`, t`$\ln(V/\text{V})$`], ts.map((x, i) => [String(x), dpStr(Vs[i], 2), i === row ? "" : dpStr(ln(Vs[i]), 3)]))}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the missing value of $\ln(V/\text{V})$ for $t = 30\ \text{s}$, to three decimal places.`, value: ln(Vs[row]), dp: 3, wrong: [Math.log10(Vs[row])], explanation: t`$\ln ${dpStr(Vs[row], 2)} = ${dpStr(ln(Vs[row]), 3)}$.` }),
        P.manual({ label: "(b)", marks: 2, stem: t`Show that a graph of $\ln(V/\text{V})$ against $t$ should be a straight line, and state its gradient.`, points: ["V = V₀e^(−t/RC) → ln V = ln V₀ − t/RC.", "This is y = c + mx with gradient −1/RC (intercept ln V₀)."], modelAnswer: "Taking ln of V = V₀e^(−t/RC) gives ln V = ln V₀ − t/RC, a straight line of ln V against t with gradient −1/RC and intercept ln V₀." }),
        P.num({ label: "(c)", marks: 3, stem: t`Plot the graph and determine its gradient, in $\text{s}^{-1}$.`, value: fit.m, tol: 0.0012, wrong: [-fit.m], explanation: t`Best-fit gradient $\approx ${sfStr(fit.m, 3)}\ \text{s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Determine the time constant RC, in s.", value: RCfit, tol: 1.2, unit: "s", wrong: [-fit.m], explanation: t`$RC = -1/\text{gradient} \approx ${sfStr(RCfit, 3)}\ \text{s}$.` }),
        P.num({ label: "(e)", marks: 2, stem: "Hence determine the capacitance, in µF.", value: (RCfit / R) / u, tol: 18, unit: "µF", wrong: [RCfit * R], explanation: t`$C = \dfrac{RC}{R} \approx \dfrac{${sfStr(RCfit, 3)}}{68 \times 10^{3}} = ${sfStr(RCfit / R / u, 3)}\ \mu\text{F}$.` }),
        P.num({ label: "(f)", marks: 2, stem: "Use your time constant to predict the p.d. after 90 s, in V, to two significant figures.", value: V0 * Math.exp(-90 / RCfit), tol: 0.06, unit: "V", wrong: [V0 * Math.exp(-RCfit / 90)], explanation: t`$V = 9.0\,e^{-90/${sfStr(RCfit, 3)}} \approx ${sfStr(V0 * Math.exp(-90 / RCfit), 2)}\ \text{V}$.` }),
        P.manual({ label: "(g)", marks: 2, stem: "Suggest why a data logger is better than a voltmeter and stop-watch here, and one reason why the voltmeter or logger must have a very high resistance.", points: ["The logger records V at exact times with no reaction-time error (and can sample rapidly).", "A meter of low resistance would be in parallel with R, reducing the effective resistance and making the capacitor discharge faster (RC too small)."], modelAnswer: "A data logger samples at precise times, removing reaction-time errors. Its input resistance must be very high, because any meter across the capacitor acts in parallel with R and would speed up the discharge, giving too small a time constant." }),
      ],
      explanation: "ln V against t is a straight line of gradient −1/RC; C = RC/R.",
      hints: ["Use natural logarithms.", "RC = −1/gradient."],
    });
    chk(Math.abs(RCfit - RC) < 2 ? 1 : 0, 1);
  }
  // Practice structured: a timing circuit for an irrigation valve (8 marks)
  {
    const C = 1000 * u, V0 = 12, Voff = 4.0, tNeed = 60;
    const R = tNeed / (C * Math.log(V0 / Voff));
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A timer holds an irrigation valve open while the p.d. across a discharging $1000\ \mu\text{F}$ capacitor is above $4.0\ \text{V}$. The capacitor is charged to $12\ \text{V}$ and then discharges through a resistor R. The valve must stay open for $60\ \text{s}$.`,
      parts: [
        P.num({ label: "(a)", marks: 3, stem: "Calculate the resistance R needed, in kΩ, to three significant figures.", value: R / 1000, unit: "kΩ", wrong: [tNeed / C / 1000, tNeed / (C * Math.log10(V0 / Voff)) / 1000], explanation: t`$4.0 = 12e^{-60/RC}$, so $\dfrac{60}{RC} = \ln 3.0$ and $R = \dfrac{60}{1000 \times 10^{-6} \times \ln 3.0} = ${sfStr(R / 1000, 3)}\ \text{k}\Omega$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the energy stored in the capacitor at the start, in J, to two significant figures.", value: 0.5 * C * V0 * V0, sf: 2, unit: "J", wrong: [C * V0 * V0], explanation: t`$\tfrac{1}{2} \times 1000 \times 10^{-6} \times 12^2 = ${sfStr(0.5 * C * V0 * V0, 2)}\ \text{J}$.` }),
        P.manual({ label: "(c)", marks: 1, stem: "State how the open time would change if R were doubled.", points: ["It would double (time ∝ RC)."], modelAnswer: "The time would double, because t = RC ln 3 is proportional to R." }),
        P.manual({ label: "(d)", marks: 2, stem: "Electrolytic capacitors have a tolerance of about ±20%. Explain the effect on the timer and suggest how the timer could be adjusted.", points: ["The actual time could differ by up to about 20% from 60 s (t ∝ C).", "Use a variable resistor for R and calibrate the time with a stop-watch."], modelAnswer: "Since t is proportional to C, the open time could be up to about 20% longer or shorter than 60 s. Using a variable resistor for R lets the timer be calibrated against a stop-watch." }),
      ],
      explanation: "t = RC ln(V₀/V) for the time to fall from V₀ to V.",
      hints: ["Rearrange V = V₀e^(−t/RC) for R."],
    });
  }

  b.card("DEFINITION", "**Time constant**", "τ = RC: the time for the charge, p.d. or current of a discharging capacitor to fall to 1/e (37%) of its initial value.");
  b.card("FORMULA", "Capacitor discharge", t`$x = x_0e^{-t/RC}$ for $Q$, $V$ or $I$`);
  b.card("FORMULA", "Time to halve", t`$t_{1/2} = RC\ln 2 \approx 0.693RC$`);
  b.card("FORMULA", "Straight-line form", t`$\ln V = \ln V_0 - \dfrac{t}{RC}$: gradient $-1/RC$`);
  b.card("CONCEPT", "Why discharge is exponential", "I = Q/RC, so the rate of loss of charge is proportional to the charge remaining.");
  b.card("CONCEPT", "Discharge graphs", "Q, V and I all start at their maxima and decay exponentially with the same RC; gradient of Q-t = −I; area under I-t = charge.");
  b.card("FACT", "Fraction left after n time constants", "e⁻¹ ≈ 37%, e⁻² ≈ 13.5%, e⁻⁵ < 1%.");
  b.card("CONCEPT", "Charging through a resistor", "Current decays as I₀e^(−t/RC); V and Q rise towards E and CE (63% after RC).");
  b.card("FORMULA", "Charging p.d. (ZIMSEC detail)", t`$V = E\left(1 - e^{-t/RC}\right)$`, undefined, { applies: ZIM });
});
