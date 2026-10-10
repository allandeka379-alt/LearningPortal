// W3b: aphys.ac.characteristics-rms — period, frequency, peak, x = x₀ sin ωt, r.m.s. values, mean power, CRO readings.
import { concept, P, t, chk, sfStr, dpStr, sciTex, pctUnc } from "../lib.mjs";

const r2 = Math.SQRT2;

concept("aphys.ac.characteristics-rms", { file: "ac/characteristics-rms", keyPrefix: "ac.characteristics-rms" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines the root-mean-square value of an alternating current?",
    options: [
      ["The steady direct current giving the same mean power in a resistor", "Correct: equal mean heating effect."],
      ["The average value of the current over one complete cycle", "That average is zero for a sinusoidal current."],
      ["The maximum value of the current in either direction", "That is the peak value."],
      ["Half the difference between the largest and smallest values of current", "That is the peak value again (half the peak-to-peak value)."],
    ],
    answer: "A",
    explanation: "The r.m.s. current is the d.c. current giving the same mean power in a resistor.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A sinusoidal alternating voltage has a peak value of 17 V. What is its r.m.s. value?",
    options: [
      [`${sfStr(17 / r2, 3)} V`, "Correct: 17/√2."],
      ["8.50 V", "This divides by 2; the r.m.s. value is V₀/√2."],
      [`${sfStr(17 * r2, 3)} V`, "This multiplies by √2: that converts r.m.s. to peak."],
      ["34.0 V", "This is the peak-to-peak value."],
    ],
    answer: "A",
    explanation: t`$V_{\text{r.m.s.}} = \dfrac{17}{\sqrt{2}} = ${sfStr(17 / r2, 3)}\ \text{V}$.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A sinusoidal alternating current passes through a resistor. How does the mean power compare with the peak power?",
    options: [
      ["It is one half of the peak power.", "Correct: the mean of sin²ωt over a cycle is ½."],
      [t`It is $1/\sqrt{2}$ of the peak power.`, "The factor 1/√2 applies to current and voltage, not power."],
      ["It is zero, because the current reverses.", "Power I²R is never negative, so its mean is not zero."],
      ["It equals the peak power.", "The power varies between zero and its peak."],
    ],
    answer: "A",
    explanation: "P = I₀²R sin²ωt; mean of sin² = ½, so ⟨P⟩ = ½P₀.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The current in a resistor is I = I₀ sin ωt. At what frequency does the power in the resistor vary?",
    options: [
      ["Twice the frequency of the current", "Correct: sin²ωt = ½(1 − cos 2ωt)."],
      ["The same frequency as the current", "Power peaks for both positive and negative current peaks."],
      ["Half the frequency of the current", "Power reaches a maximum twice per cycle, not once every two cycles."],
      ["It does not vary: the power is constant", "With a.c. the power varies between 0 and its peak."],
    ],
    answer: "A",
    explanation: "Power maxima occur at both the positive and negative current peaks: two per cycle.",
  });
  {
    const yg = 0.50, h = 5.6, tb = 0.2e-3, cyc = 3, len = 7.5;
    const V0 = (h / 2) * yg, T = (len / cyc) * tb;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An oscilloscope shows a sine wave with a peak-to-peak height of $5.6$ divisions at a Y-gain of $0.50\ \text{V div}^{-1}$. Three complete cycles occupy $7.5$ divisions at a time-base of $0.20\ \text{ms div}^{-1}$. Which pair of values is correct?`,
      options: [
        [`peak ${sfStr(V0, 2)} V, frequency ${sfStr(1 / T, 2)} Hz`, "Correct: half the peak-to-peak height; T = (7.5/3) × 0.20 ms."],
        [`peak ${sfStr(h * yg, 2)} V, frequency ${sfStr(1 / T, 2)} Hz`, "This uses the peak-to-peak height as the peak."],
        [`peak ${sfStr(V0, 2)} V, frequency ${sfStr(1 / (len * tb), 2)} Hz`, "This treats all 7.5 divisions as one period instead of three."],
        [`peak ${sfStr(V0 / r2, 2)} V, frequency ${sfStr(1 / T, 2)} Hz`, "This is the r.m.s. value, not the peak."],
      ],
      answer: "A",
      explanation: t`$V_0 = \dfrac{5.6}{2} \times 0.50 = ${sfStr(V0, 2)}\ \text{V}$; $T = \dfrac{7.5}{3} \times 0.20 = 0.50\ \text{ms}$, $f = ${sfStr(1 / T, 2)}\ \text{Hz}$.`,
      hints: ["Use all three cycles to find one period."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A square-wave voltage switches between +12 V and −12 V, spending equal times at each. What is its r.m.s. value?",
    options: [
      ["12 V", "Correct: V² is always 144 V², so the r.m.s. value is 12 V."],
      [`${sfStr(12 / r2, 3)} V`, "The factor 1/√2 applies only to sinusoidal waveforms."],
      ["0 V", "That is the mean, not the root-mean-square."],
      ["6.0 V", "The square of the voltage is constant at 144 V², not varying."],
    ],
    answer: "A",
    explanation: "The square of the voltage is 144 V² at every instant, so mean square = 144 and r.m.s. = 12 V.",
    hints: ["Square, take the mean, then the square root."],
  });
  {
    const Vr = 230;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`A $230\ \text{V}$ r.m.s. supply is connected across a $46\ \Omega$ heater. Calculate the peak current, in A, to three significant figures.`,
      value: (Vr / 46) * r2, unit: "A", wrong: [Vr / 46, (Vr / 46) / r2],
      explanation: t`$I_{\text{r.m.s.}} = \dfrac{230}{46} = 5.00\ \text{A}$; $I_0 = \sqrt{2} \times 5.00 = ${sfStr((Vr / 46) * r2, 3)}\ \text{A}$.`,
    });
  }
  {
    const V0 = 24, R = 15;
    const Pm = (V0 * V0) / (2 * R);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A sinusoidal voltage of peak value $24\ \text{V}$ is applied to a $15\ \Omega$ resistor. Calculate the mean power dissipated, in W, to three significant figures.`,
      value: Pm, unit: "W", wrong: [(V0 * V0) / R, (V0 / r2) / R],
      explanation: t`$\langle P\rangle = \dfrac{V_{\text{r.m.s.}}^2}{R} = \dfrac{(24/\sqrt{2})^2}{15} = \dfrac{288}{15} = ${sfStr(Pm, 3)}\ \text{W}$. Using the peak voltage gives twice this.`,
    });
  }
  {
    const V0 = 325, f = 50, tt = 3.0e-3;
    const v = V0 * Math.sin(2 * Math.PI * f * tt);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The mains voltage is $V = 325\sin(2\pi \times 50\,t)$ volts. Calculate the voltage at $t = 3.0\ \text{ms}$ after it passes through zero going positive, in V, to three significant figures.`,
      value: v, unit: "V", wrong: [V0 * Math.sin((2 * Math.PI * f * tt * Math.PI) / 180)],
      explanation: t`1. $\omega t = 2\pi \times 50 \times 3.0 \times 10^{-3} = ${dpStr(2 * Math.PI * f * tt, 4)}\ \text{rad}$.
2. $V = 325\sin(${dpStr(2 * Math.PI * f * tt, 4)}) = ${sfStr(v, 3)}\ \text{V}$.
3. With the calculator in degrees the answer would be about $${sfStr(V0 * Math.sin((2 * Math.PI * f * tt * Math.PI) / 180), 2)}\ \text{V}$: always use radians for $\omega t$.`,
      hints: ["ωt must be in radians."],
    });
  }
  {
    // time after zero for v to reach a value
    const V0 = 12, f = 60, v = 9.0;
    const tt = Math.asin(v / V0) / (2 * Math.PI * f);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`An alternating voltage $V = 12\sin(2\pi \times 60\,t)$ volts rises from zero. Calculate the time at which it first reaches $9.0\ \text{V}$, in ms, to three significant figures.`,
      value: tt * 1000, unit: "ms", wrong: [((Math.asin(v / V0) * 180) / Math.PI) / (2 * Math.PI * f) * 1000],
      explanation: t`1. $\sin(\omega t) = \dfrac{9.0}{12} = 0.75$, so $\omega t = \sin^{-1}0.75 = ${dpStr(Math.asin(0.75), 4)}\ \text{rad}$.
2. $t = \dfrac{${dpStr(Math.asin(0.75), 4)}}{2\pi \times 60} = ${sciTex(tt)}\ \text{s} = ${sfStr(tt * 1000, 3)}\ \text{ms}$.`,
      hints: ["Rearrange for sin ωt, then use inverse sine in radians."],
    });
  }
  {
    // a lamp rated d.c. compared with a.c.
    const P0 = 60, Vr = 12;
    const R = (Vr * Vr) / P0;
    const V0 = Vr * r2;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A lamp is rated $12\ \text{V}$, $60\ \text{W}$. It is run from a sinusoidal supply so that it is exactly as bright as on $12\ \text{V}$ d.c. Calculate the peak current in the lamp, in A, to three significant figures, assuming its resistance is the same in both cases.`,
      value: V0 / R, unit: "A", wrong: [Vr / R, P0 / V0],
      explanation: t`1. Same brightness means same mean power, so $V_{\text{r.m.s.}} = 12\ \text{V}$ and $I_{\text{r.m.s.}} = \dfrac{60}{12} = 5.0\ \text{A}$.
2. $I_0 = \sqrt{2} \times 5.0 = ${sfStr(V0 / R, 3)}\ \text{A}$.`,
      hints: ["Same brightness means the same r.m.s. values as the d.c. values."],
    });
  }
  {
    // uncertainty in reading from CRO
    const h = 4.2, dh = 0.1;
    const pct = pctUnc(dh, h);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`On an oscilloscope, the peak-to-peak height of a trace is read as $4.2 \pm 0.1$ divisions. The Y-gain calibration is accurate to $\pm 3\%$. Calculate the percentage uncertainty in the r.m.s. voltage found from this trace, to two significant figures.`,
      value: pct + 3, sf: 2, unit: "%", wrong: [pct, (pct + 3) / r2],
      explanation: t`$V_{\text{r.m.s.}} = \dfrac{h \times \text{Y-gain}}{2\sqrt{2}}$; the constants add no uncertainty, so the percentage uncertainty is $\dfrac{0.1}{4.2} \times 100 + 3 = ${sfStr(pct, 2)} + 3 = ${sfStr(pct + 3, 2)}\%$. Dividing by $\sqrt{2}$ does not change a percentage uncertainty.`,
      hints: ["Exact numbers such as 2√2 carry no uncertainty."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A sinusoidal supply quoted as 120 V has a peak voltage of about 170 V.",
    answer: true,
    explanation: "True. Supply voltages are quoted as r.m.s. values; V₀ = √2 × 120 ≈ 170 V.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "For the Zimbabwean mains supply (230 V r.m.s., 50 Hz), match each quantity with its value.",
    pairs: [
      ["Period", "20 ms"],
      ["Angular frequency", "314 rad s⁻¹"],
      ["Peak voltage", "325 V"],
      ["Peak-to-peak voltage", "651 V"],
    ],
    extraRight: ["163 V"],
    explanation: "T = 1/f; ω = 2πf; V₀ = √2 × 230; peak-to-peak = 2V₀.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the relationships for sinusoidal a.c.",
    template: "The r.m.s. voltage equals the peak voltage divided by {{blank:a}}. The mean power in a resistor equals the peak power divided by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["√2"], choices: ["√2", "2", "π"] },
      { id: "b", accepted: ["2"], choices: ["2", "√2", "4"] },
    ],
    explanation: "V_rms = V₀/√2; ⟨P⟩ = P₀/2.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Show that, for a sinusoidal alternating current in a resistor, the r.m.s. current is I₀/√2.",
    points: [
      "Instantaneous power P = I²R = I₀²R sin²ωt.",
      "The mean value of sin²ωt over a cycle is ½ (sin²ωt = ½(1 − cos 2ωt), and cos averages to zero).",
      "So mean power = ½I₀²R.",
      "Setting I_rms²R = ½I₀²R gives I_rms = I₀/√2.",
    ],
    modelAnswer: "The instantaneous power is P = I²R = I₀²R sin²ωt. Since sin²ωt = ½(1 − cos 2ωt) and the cosine averages to zero over a cycle, the mean of sin²ωt is ½, so the mean power is ½I₀²R. The r.m.s. current is the steady current giving the same mean power: I_rms²R = ½I₀²R, so I_rms = I₀/√2.",
    explanation: "Mean of sin² is one half.",
    hints: ["Write the instantaneous power first."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the graph of power against time for a resistor connected to a sinusoidal a.c. supply, over two cycles of the supply, as you would sketch it.",
    points: [
      "Power is always positive (≥ 0), varying between 0 and the peak power P₀ = I₀V₀.",
      "It follows a sin² shape and completes four cycles in two supply cycles (twice the supply frequency).",
      "The mean value is P₀/2 (a horizontal line half-way up).",
    ],
    modelAnswer: "The graph is a sin² curve lying entirely above the time axis, rising from zero to the peak power I₀V₀ and back to zero twice in every cycle of the supply, so four humps over two cycles. Its mean, a horizontal line at P₀/2, is the mean power.",
    explanation: "Always positive, double frequency, mean half the peak.",
    hints: ["What happens to P = I²R when I is negative?"],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the mean value of a sinusoidal alternating current is not useful for describing its heating effect.",
    points: [
      "The current is positive for half the cycle and negative for the other half, so its mean over a cycle is zero.",
      "Heating depends on I² (P = I²R), which is never negative, so a quantity based on the mean of I² (the r.m.s. value) is needed.",
    ],
    modelAnswer: "Over a full cycle the positive and negative halves cancel, so the mean current is zero, yet the resistor still heats up. Heating depends on I², which is always positive, so the r.m.s. value, based on the mean of I², describes the heating effect.",
    explanation: "Mean zero; heating ∝ I².",
  });

  // Practice structured: CRO and a heater (12 marks)
  {
    const yg = 4.0, h = 9.0, tb = 2.5e-3, len = 8.4;
    const V0 = (h / 2) * yg, T = (len / 2) * tb;
    const R = 24;
    const Vr = V0 / r2;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Nyasha connects an oscilloscope across a $24\ \Omega$ resistor fed from a low-voltage a.c. supply. The Y-gain is $4.0\ \text{V div}^{-1}$ and the time-base $2.5\ \text{ms div}^{-1}$. The trace is a sine wave with a peak-to-peak height of $9.0$ divisions, and two complete cycles occupy $8.4$ divisions.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the peak voltage, in V.", value: V0, unit: "V", wrong: [h * yg], explanation: t`$V_0 = \dfrac{9.0}{2} \times 4.0 = ${V0}\ \text{V}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the frequency, in Hz.", value: 1 / T, unit: "Hz", wrong: [1 / (len * tb)], explanation: t`$T = \dfrac{8.4}{2} \times 2.5\ \text{ms} = 10.5\ \text{ms}$, so $f = ${sfStr(1 / T, 3)}\ \text{Hz}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the r.m.s. current in the resistor, in A, to three significant figures.", value: Vr / R, unit: "A", wrong: [V0 / R], explanation: t`$V_{\text{r.m.s.}} = \dfrac{18}{\sqrt{2}} = ${sfStr(Vr, 3)}\ \text{V}$; $I_{\text{r.m.s.}} = \dfrac{${sfStr(Vr, 3)}}{24} = ${sfStr(Vr / R, 3)}\ \text{A}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the mean power dissipated in the resistor, in W, to three significant figures.", value: (Vr * Vr) / R, unit: "W", wrong: [(V0 * V0) / R], explanation: t`$\langle P\rangle = \dfrac{V_{\text{r.m.s.}}^2}{R} = \dfrac{${sfStr(Vr, 3)}^2}{24} = ${sfStr((Vr * Vr) / R, 3)}\ \text{W}$.` }),
        P.num({ label: "(e)", marks: 2, stem: "Write down the equation for the voltage in the form V = V₀ sin ωt, giving ω in rad s⁻¹ to three significant figures.", value: (2 * Math.PI) / T, unit: "rad/s", wrong: [1 / T], explanation: t`$\omega = 2\pi f = 2\pi \times ${sfStr(1 / T, 3)} = ${sfStr((2 * Math.PI) / T, 3)}\ \text{rad s}^{-1}$, so $V = 18\sin(${sfStr((2 * Math.PI) / T, 3)}\,t)$.` }),
        P.manual({ label: "(f)", marks: 3, stem: "The time-base is changed to 5.0 ms div⁻¹ and the Y-gain to 10 V div⁻¹. Describe the new trace and explain why the original settings gave more precise readings.", points: ["Trace now 3.6 divisions peak-to-peak and one cycle 2.1 divisions long (nearly five cycles across a 10-division screen).", "The trace is smaller, so the same reading uncertainty (about ±0.1 div) is a larger fraction of each length.", "Larger traces (filling the screen vertically, fewer cycles) give smaller percentage uncertainties."], modelAnswer: "The trace would be 3.6 divisions from peak to peak and each cycle would be only 2.1 divisions long, so more cycles crowd onto the screen. Each length is then smaller, so the reading uncertainty of about 0.1 division is a larger percentage. The original settings made the trace as large as possible, giving more precise readings." }),
      ],
      explanation: "Peak = half the peak-to-peak height × Y-gain; period from the time-base; r.m.s. = peak/√2.",
      hints: ["Halve the peak-to-peak height.", "Two cycles occupy 8.4 divisions."],
    });
    chk(V0, 18, 1e-9);
  }
  // Practice structured: comparing d.c. and a.c. heating (8 marks)
  {
    const R = 40, Vdc = 120, V0 = 150;
    const Pdc = (Vdc * Vdc) / R, Pac = (V0 * V0) / (2 * R);
    b.struct({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`A $40\ \Omega$ heating element is used first on a $120\ \text{V}$ d.c. supply and then on a sinusoidal a.c. supply of peak voltage $150\ \text{V}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the power on the d.c. supply, in W.", value: Pdc, unit: "W", wrong: [Vdc / R], explanation: t`$P = \dfrac{V^2}{R} = \dfrac{120^2}{40} = ${Pdc}\ \text{W}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the mean power on the a.c. supply, in W, to three significant figures.", value: Pac, unit: "W", wrong: [(V0 * V0) / R], explanation: t`$\langle P\rangle = \dfrac{V_0^2}{2R} = \dfrac{150^2}{80} = ${sfStr(Pac, 3)}\ \text{W}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the peak voltage of an a.c. supply that would give the same mean power as the 120 V d.c. supply, in V, to three significant figures.", value: Vdc * r2, unit: "V", wrong: [Vdc / r2], explanation: t`$V_{\text{r.m.s.}} = 120\ \text{V}$, so $V_0 = 120\sqrt{2} = ${sfStr(Vdc * r2, 3)}\ \text{V}$.` }),
        P.manual({ label: "(d)", marks: 3, stem: "On the a.c. supply, describe how the power varies during one cycle, and explain why the element's temperature stays nearly constant.", points: ["Power varies from 0 to V₀²/R (562.5 W) twice per cycle, i.e. 100 times per second at 50 Hz.", "The element's heat capacity is large compared with the energy delivered in one cycle (it takes many seconds to heat or cool).", "So its temperature cannot follow the 100 Hz fluctuation and depends only on the mean power."], modelAnswer: "During each cycle the power rises from zero to V₀²/R and falls back twice, so on a 50 Hz supply it fluctuates 100 times a second. The element has a large heat capacity and takes many seconds to warm up or cool down, so its temperature cannot follow such rapid changes; it settles at a value set by the mean power." }),
      ],
      explanation: "Mean a.c. power = V_rms²/R = V₀²/(2R).",
      hints: ["Use r.m.s. values for mean power."],
    });
  }

  b.card("DEFINITION", "**r.m.s. value**", "The steady direct current (or p.d.) that would dissipate energy at the same average rate in a resistor.");
  b.card("FORMULA", "Sinusoidal a.c.", t`$x = x_0\sin\omega t$, $\omega = 2\pi f$, $T = 1/f$`);
  b.card("FORMULA", "r.m.s. and peak", t`$I_{\text{r.m.s.}} = \dfrac{I_0}{\sqrt{2}}$, $V_{\text{r.m.s.}} = \dfrac{V_0}{\sqrt{2}}$ (sinusoids only)`);
  b.card("FORMULA", "Mean power in a resistor", t`$\langle P\rangle = I_{\text{r.m.s.}}V_{\text{r.m.s.}} = \tfrac{1}{2}I_0V_0$`);
  b.card("CONCEPT", "Why r.m.s.", "Mean current over a cycle is zero, but heating ∝ I², whose mean is I₀²/2.");
  b.card("FACT", "Zimbabwe mains", "230 V r.m.s., 50 Hz: peak 325 V, period 20 ms, ω = 314 rad s⁻¹.");
  b.card("CONCEPT", "Reading a CRO", "Peak = (peak-to-peak height ÷ 2) × Y-gain; period = (length of n cycles ÷ n) × time-base.");
  b.card("CONCEPT", "Power-time graph", "Always positive, sin² shape, twice the supply frequency, mean = half the peak.");
  b.card("FACT", "Square wave", "A square wave between ±V₀ has r.m.s. value V₀: the √2 factor is for sinusoids only.");
});
