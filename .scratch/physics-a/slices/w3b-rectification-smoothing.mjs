// W3b: aphys.ac.rectification-smoothing — half-wave and bridge rectification, output graphs, capacitor smoothing,
// effect of C and R on ripple (RC compared with the time between peaks), the d.c. power supply.
import { concept, P, t, chk, sfStr, dpStr, sciTex, pctUnc, table } from "../lib.mjs";

const r2 = Math.SQRT2;
const ripple = (V0, tt, R, C) => V0 * (1 - Math.exp(-tt / (R * C)));

concept("aphys.ac.rectification-smoothing", { file: "ac/rectification-smoothing", keyPrefix: "ac.rectification-smoothing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many diodes are used in a bridge rectifier?",
    options: [
      ["Four", "Correct: arranged in a diamond, two conducting in each half-cycle."],
      ["One", "One diode gives half-wave rectification."],
      ["Two", "Two diodes can give full-wave rectification only with a centre-tapped transformer, not a bridge."],
      ["Three", "A bridge is symmetrical: four diodes."],
    ],
    answer: "A",
    explanation: "A bridge rectifier has four diodes; two conduct during each half-cycle.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A 50 Hz supply is full-wave rectified. How many peaks per second does the output voltage have?",
    options: [
      ["100", "Correct: both half-cycles give a positive hump."],
      ["50", "That is for half-wave rectification."],
      ["25", "Rectification never reduces the number of humps below the supply frequency."],
      ["200", "Each cycle has two halves, giving two humps, not four."],
    ],
    answer: "A",
    explanation: "Two humps per cycle × 50 cycles per second = 100 per second.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where is the smoothing capacitor connected in a rectifier circuit?",
    options: [
      ["In parallel with the load resistor", "Correct: it supplies the load between peaks."],
      ["In series with the load resistor", "In series it would block the direct current."],
      ["In series with the a.c. supply, before the diodes", "It would then pass a.c. and not smooth the output."],
      ["Across one of the diodes in the bridge", "That would short out the diode for a.c. and disturb rectification."],
    ],
    answer: "A",
    explanation: "The capacitor is in parallel with the load, charging at each peak and discharging through the load between peaks.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A smoothed rectifier supplies a load. Which change would reduce the ripple?",
    options: [
      ["Increasing the load resistance", "Correct: larger RC, so less discharge between peaks."],
      ["Reducing the smoothing capacitance", "A smaller C gives a smaller RC and more ripple."],
      ["Changing from full-wave to half-wave rectification", "Half-wave doubles the time between peaks, increasing the ripple."],
      ["Connecting a second load in parallel with the first", "This lowers the total load resistance, so RC falls and ripple grows."],
    ],
    answer: "A",
    explanation: "Ripple is small when RC ≫ time between peaks; a larger R (smaller load current) increases RC.",
    hints: ["Compare RC with the time between peaks."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In a smoothed half-wave rectifier, what is happening to the diode while the capacitor is supplying the load between peaks?",
    options: [
      ["It is reverse-biased, because the capacitor p.d. is higher than the supply p.d.", "Correct: no current flows from the supply until the next peak."],
      ["It is forward-biased and the capacitor discharges back through it.", "A diode does not conduct in the reverse direction."],
      ["It is conducting and recharging the capacitor continuously.", "Recharging happens only for a short time near each peak."],
      ["It is short-circuited by the capacitor.", "The capacitor is across the load, not across the diode."],
    ],
    answer: "A",
    explanation: "After the peak the supply falls below the capacitor p.d., so the diode is reverse-biased until the next rising hump exceeds it.",
    hints: ["Compare the supply p.d. with the capacitor p.d. after the peak."],
  });
  {
    const Vr = 9.0;
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A $9.0\ \text{V}$ r.m.s. supply is full-wave rectified with ideal diodes. What is the peak output voltage?`,
      options: [
        [t`$${sfStr(Vr * r2, 3)}\ \text{V}$`, "Correct: √2 × 9.0."],
        [t`$${sfStr(Vr / r2, 3)}\ \text{V}$`, "This divides by √2: the peak is larger than the r.m.s. value."],
        [t`$${sfStr(2 * Vr * r2, 3)}\ \text{V}$`, "Full-wave rectification does not double the peak."],
        [t`$${sfStr(Vr, 3)}\ \text{V}$`, "9.0 V is the r.m.s. value of the supply, not its peak."],
      ],
      answer: "A",
      explanation: t`$V_0 = \sqrt{2} \times 9.0 = ${sfStr(Vr * r2, 3)}\ \text{V}$.`,
    });
  }
  {
    const R = 680, C = 470e-6;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`A $470\ \mu\text{F}$ smoothing capacitor is connected across a $680\ \Omega$ load. Calculate the time constant, in s, to three significant figures.`,
      value: R * C, unit: "s", wrong: [R * 470],
      explanation: t`$RC = 680 \times 470 \times 10^{-6} = ${sfStr(R * C, 3)}\ \text{s}$, much longer than the $10\ \text{ms}$ between peaks of a full-wave rectified 50 Hz supply.`,
    });
  }
  {
    const Vr = 15, d = 0.7;
    const V0 = Vr * r2 - 2 * d;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $15\ \text{V}$ r.m.s. supply feeds a bridge rectifier made of silicon diodes, each with a forward voltage of $0.70\ \text{V}$. Calculate the peak voltage across the load, in V, to three significant figures.`,
      value: V0, unit: "V", wrong: [Vr * r2 - d, Vr * r2 - 4 * d],
      explanation: t`$\sqrt{2} \times 15 = ${sfStr(Vr * r2, 3)}\ \text{V}$; two diodes conduct at a time, so subtract $1.40\ \text{V}$: $${sfStr(V0, 3)}\ \text{V}$.`,
      hints: ["How many diodes are in the current path at any instant?"],
    });
  }
  {
    const V0 = 12.0, R = 330, C = 1000e-6, f = 50;
    const dv = ripple(V0, 1 / (2 * f), R, C);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A full-wave rectified $50\ \text{Hz}$ supply has a peak of $12.0\ \text{V}$. It is smoothed by a $1000\ \mu\text{F}$ capacitor and feeds a $330\ \Omega$ load. Using $\Delta V = V_0\left(1 - e^{-t/RC}\right)$, where $t$ is the time between peaks, estimate the ripple voltage, in V, to two significant figures.`,
      value: dv, sf: 2, unit: "V", wrong: [ripple(V0, 1 / f, R, C), V0 * Math.exp(-1 / (2 * f) / (R * C))],
      explanation: t`1. $RC = 330 \times 1000 \times 10^{-6} = 0.330\ \text{s}$.
2. Full-wave: $t = \dfrac{1}{2 \times 50} = 0.010\ \text{s}$.
3. $\Delta V = 12.0\left(1 - e^{-0.010/0.330}\right) = ${sfStr(dv, 2)}\ \text{V}$. Using $t = 0.020\ \text{s}$ (half-wave) would double it.`,
      hints: ["Time between peaks is half the period for full-wave."],
    });
  }
  {
    // choose C for a ripple limit
    const V0 = 18, R = 250, dvMax = 0.50, tt = 0.010;
    const C = tt / (R * -Math.log(1 - dvMax / V0));
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A designer needs the ripple on a full-wave rectified $50\ \text{Hz}$ supply (peak $18\ \text{V}$) feeding a $250\ \Omega$ load to be no more than $0.50\ \text{V}$. Using $\Delta V \approx \dfrac{V_0t}{RC}$ with $t$ the time between peaks, calculate the minimum smoothing capacitance, in µF, to two significant figures.`,
      value: ((V0 * tt) / (R * dvMax)) * 1e6, sf: 2, unit: "µF", wrong: [((V0 * 0.020) / (R * dvMax)) * 1e6, ((V0 * tt) / (R * dvMax))],
      explanation: t`1. $C = \dfrac{V_0t}{R\,\Delta V} = \dfrac{18 \times 0.010}{250 \times 0.50}$.
2. $C = ${sciTex((V0 * tt) / (R * dvMax), 2)}\ \text{F} = ${sfStr(((V0 * tt) / (R * dvMax)) * 1e6, 2)}\ \mu\text{F}$; a standard $1500\ \mu\text{F}$ or larger capacitor would be chosen. (The exponential form gives ${sfStr(C * 1e6, 2)} µF.)`,
      hints: ["Rearrange ΔV ≈ V₀t/(RC) for C.", "t = 10 ms for full-wave at 50 Hz."],
    });
  }
  {
    // energy/current: mean load current approx V0/R; charge lost per interval
    const V0 = 12.0, R = 120, C = 2700e-6, tt = 0.010;
    const I = V0 / R, Q = I * tt;
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A smoothed full-wave supply holds a $120\ \Omega$ load at about $12.0\ \text{V}$ using a $2700\ \mu\text{F}$ capacitor (50 Hz mains). Treating the load current as constant between peaks, calculate the charge the capacitor loses between peaks and hence the ripple, in V, to two significant figures.`,
      value: Q / C, sf: 2, unit: "V", wrong: [Q, (I * 0.020) / C],
      explanation: t`$I \approx \dfrac{12.0}{120} = 0.100\ \text{A}$; $\Delta Q = It = 0.100 \times 0.010 = ${sciTex(Q, 2)}\ \text{C}$; $\Delta V = \dfrac{\Delta Q}{C} = \dfrac{${sciTex(Q, 2)}}{2700 \times 10^{-6}} = ${sfStr(NaN, 2)}\ \text{V}$.`,
      hints: ["ΔQ = IΔt and ΔV = ΔQ/C."],
    });
  }
  {
    // uncertainty: ripple measured on CRO
    const h = 1.7, dh = 0.2;
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`On an oscilloscope set to $0.20\ \text{V div}^{-1}$ (with the d.c. level removed), the ripple appears $1.7 \pm 0.2$ divisions high. Calculate the percentage uncertainty in the ripple, and suggest whether a more sensitive Y-gain should be used.`,
      value: pctUnc(dh, h), sf: 2, unit: "%", wrong: [pctUnc(dh, h * 0.2)],
      explanation: t`$\dfrac{0.2}{1.7} \times 100 = ${sfStr(pctUnc(dh, h), 2)}\%$. This is large: using $0.10\ \text{V div}^{-1}$ would double the trace height (3.4 divisions) and halve the percentage uncertainty.`,
      hints: ["Percentage uncertainty = absolute ÷ value × 100."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a bridge rectifier, the current through the load is in the same direction during both halves of each a.c. cycle.",
    answer: true,
    explanation: "True. Different pairs of diodes conduct in each half-cycle, but both pairs send current through the load in the same direction.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each output (described in words) with the circuit that produces it.",
    pairs: [
      ["Positive half-sine humps separated by gaps of zero p.d.", "One diode in series with the load"],
      ["Positive half-sine humps with no gaps", "Bridge of four diodes"],
      ["Nearly steady p.d. with a small sawtooth ripple", "Bridge rectifier with a capacitor across the load"],
      ["Sine wave alternating above and below zero", "Supply connected directly to the load"],
    ],
    explanation: "Diodes remove or reverse the negative halves; the capacitor fills the gaps between peaks.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the explanation of smoothing.",
    template: "The capacitor charges to the {{blank:a}} voltage. Between peaks it {{blank:b}} through the load. The ripple is small if the time constant RC is much {{blank:c}} than the time between peaks.",
    blanks: [
      { id: "a", accepted: ["peak"], choices: ["peak", "r.m.s.", "mean"] },
      { id: "b", accepted: ["discharges"], choices: ["discharges", "charges"] },
      { id: "c", accepted: ["longer"], choices: ["longer", "shorter"] },
    ],
    explanation: "A long time constant means the capacitor loses little charge between peaks.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "What name is given to converting alternating current into current in one direction only?",
    accepted: ["rectification", "rectifying"],
    explanation: "**Rectification**, done with diodes.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a bridge of four diodes produces full-wave rectification. You may label the diodes D1 to D4.",
    points: [
      "Supply connected across one diagonal of the bridge; load across the other.",
      "In one half-cycle, two diodes on opposite sides (e.g. D1 and D3) are forward-biased and conduct; the other two are reverse-biased.",
      "In the next half-cycle, the other pair (D2 and D4) conducts.",
      "Both pairs direct current through the load in the same direction, so the load p.d. has the same polarity throughout (humps with no gaps).",
    ],
    modelAnswer: "The a.c. supply is connected across one diagonal of the diamond of diodes and the load across the other. In the first half-cycle D1 and D3 are forward-biased and conduct, while D2 and D4 are reverse-biased. In the second half-cycle the supply reverses, so D2 and D4 conduct instead. Both routes take the current through the load in the same direction, so the output is a series of positive half-sine humps with no gaps.",
    explanation: "Two diodes conduct per half-cycle; load current always in one direction.",
    hints: ["Which diodes conduct when the top supply terminal is positive?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the graph of output voltage against time for a full-wave rectifier with a smoothing capacitor, as you would sketch it, and explain its shape.",
    points: [
      "Voltage stays close to the peak value V₀ (never falls to zero).",
      "Between peaks: a gentle (exponential) fall as the capacitor discharges through the load.",
      "Near each peak (every half-cycle): a short, steep rise as the next hump recharges the capacitor, giving a small sawtooth ripple.",
    ],
    modelAnswer: "The output stays close to the peak voltage. After each peak it falls slowly and almost linearly (part of an exponential decay) as the capacitor discharges through the load; then, as the next rectified hump rises above the capacitor p.d., it rises steeply back to the peak. This gives a small sawtooth ripple with two cycles per supply cycle.",
    explanation: "Slow discharge, fast recharge: sawtooth ripple near V₀.",
    hints: ["What happens between peaks, and what happens at each peak?"],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State two advantages of full-wave rectification over half-wave rectification.",
    points: [
      "Both halves of each cycle are used, so more power is delivered (higher mean output) / energy is not wasted.",
      "Twice as many peaks, so the time between peaks is halved and the ripple after smoothing is smaller (smaller capacitor needed).",
    ],
    modelAnswer: "Full-wave rectification uses both halves of every cycle, so the mean output and power delivered are greater; and because there are twice as many peaks, the capacitor discharges for only half as long between them, giving less ripple for the same capacitor.",
    explanation: "More power; less ripple.",
  });

  // Practice structured: designing a phone charger stage (14 marks)
  {
    const Vr = 7.5, d = 0.7, R = 50, C = 3300e-6, f = 50;
    const V0 = Vr * r2 - 2 * d;
    const RC = R * C;
    const dv = ripple(V0, 1 / (2 * f), R, C);
    const dvH = ripple(V0 + d, 1 / f, R, C);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A charger uses a transformer that gives $7.5\ \text{V}$ r.m.s. at $50\ \text{Hz}$, a bridge of silicon diodes (forward voltage $0.70\ \text{V}$ each), a $3300\ \mu\text{F}$ smoothing capacitor and a load that behaves as a $50\ \Omega$ resistor.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the peak voltage across the load, in V, to three significant figures.", value: V0, unit: "V", wrong: [Vr * r2, Vr * r2 - d], explanation: t`$\sqrt{2} \times 7.5 - 2 \times 0.70 = ${sfStr(Vr * r2, 3)} - 1.40 = ${sfStr(V0, 3)}\ \text{V}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the time constant of the capacitor and load, in s, to three significant figures.", value: RC, unit: "s", wrong: [R * 3300], explanation: t`$RC = 50 \times 3300 \times 10^{-6} = ${sfStr(RC, 3)}\ \text{s}$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`Estimate the ripple voltage using $\Delta V = V_0(1 - e^{-t/RC})$, in V, to two significant figures.`, value: dv, sf: 2, unit: "V", wrong: [ripple(V0, 1 / f, R, C)], explanation: t`$t = 10\ \text{ms}$ (full-wave). $\Delta V = ${sfStr(V0, 3)}\left(1 - e^{-0.010/${sfStr(RC, 3)}}\right) = ${sfStr(dv, 2)}\ \text{V}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Estimate the mean power delivered to the load, taking the output as steady at the peak value minus half the ripple, in W, to two significant figures.", value: (V0 - dv / 2) ** 2 / R, sf: 2, unit: "W", wrong: [(Vr * Vr) / R], explanation: t`$V \approx ${sfStr(V0, 3)} - ${sfStr(dv / 2, 2)} = ${sfStr(V0 - dv / 2, 3)}\ \text{V}$; $P = \dfrac{V^2}{R} = ${sfStr((V0 - dv / 2) ** 2 / R, 2)}\ \text{W}$.` }),
        P.num({ label: "(e)", marks: 2, stem: "If one diode of the bridge failed open-circuit, the circuit would act as a half-wave rectifier with only one diode drop. Estimate the new ripple, in V, to two significant figures.", value: dvH, sf: 2, unit: "V", wrong: [dv], explanation: t`Now $t = 20\ \text{ms}$ and $V_0 \approx ${sfStr(V0 + d, 3)}\ \text{V}$: $\Delta V = ${sfStr(V0 + d, 3)}\left(1 - e^{-0.020/${sfStr(RC, 3)}}\right) = ${sfStr(dvH, 2)}\ \text{V}$, about twice as large.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why the ripple increases when the phone draws more current.", points: ["A larger current means a smaller effective load resistance R.", "So RC is smaller and the capacitor discharges more between peaks: larger ripple."], modelAnswer: "Drawing more current is equivalent to a smaller load resistance, so the time constant RC falls and the capacitor loses more of its charge between peaks, increasing the ripple." }),
        P.manual({ label: "(g)", marks: 2, stem: "Suggest two ways of making the output steadier.", points: ["Use a larger smoothing capacitance (larger RC).", "Add a voltage regulator (e.g. Zener diode or regulator IC) after the capacitor / add a second filter stage."], modelAnswer: "Use a larger capacitor so that RC is longer, and follow it with a voltage regulator that holds the output constant despite the remaining ripple." }),
      ],
      explanation: "Peak = √2 × V_rms − diode drops; ripple ≈ V₀(1 − e^(−t/RC)), t = time between peaks.",
      hints: ["Two diodes conduct at a time in a bridge.", "Full-wave: 10 ms between peaks at 50 Hz."],
    });
    chk(dvH > 1.5 * dv ? 1 : 0, 1);
  }
  // Practice structured: ripple against capacitance data (8 marks)
  {
    const V0 = 10.0, R = 200, tt = 0.010;
    const Cs = [150, 330, 680, 1500];
    const nz = [0.03, -0.02, 0.01, -0.005];
    const dvs = Cs.map((c, i) => Math.round((ripple(V0, tt, R, c * 1e-6) + nz[i]) * 100) / 100);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Thandeka measures the ripple $\Delta V$ on a full-wave rectified 50 Hz supply (peak $10.0\ \text{V}$) feeding a $200\ \Omega$ load, for different smoothing capacitors $C$:

${table([t`$C\,/\,\mu\text{F}$`, t`$\Delta V\,/\,\text{V}$`], Cs.map((c, i) => [String(c), dpStr(dvs[i], 2)]))}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate $\Delta V \times C$ for the $330\ \mu\text{F}$ capacitor, in V µF, to three significant figures.`, value: dvs[1] * 330, sf: 3, wrong: [dvs[1] / 330], explanation: t`$${dpStr(dvs[1], 2)} \times 330 = ${sfStr(dvs[1] * 330, 3)}\ \text{V}\ \mu\text{F}$.` }),
        P.manual({ label: "(b)", marks: 2, stem: "Use the data to state and test the relationship between ΔV and C for the larger capacitors.", points: ["ΔV is approximately inversely proportional to C (ΔV × C roughly constant, about V₀t/R = 500 V µF).", "Shown by calculating ΔV × C for 330, 680 and 1500 µF: nearly equal values."], modelAnswer: "For the larger capacitors ΔV × C is nearly constant (about 460-490 V µF), so ΔV is approximately inversely proportional to C, as expected from ΔV ≈ V₀t/(RC)." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why the relationship is less accurate for the 150 µF capacitor.", points: ["RC = 0.030 s is not much larger than the 10 ms between peaks.", "So the discharge is not approximately linear: the exponential curve flattens and ΔV is less than V₀t/(RC)."], modelAnswer: "With 150 µF, RC = 0.030 s, only three times the time between peaks, so the capacitor's exponential discharge cannot be treated as linear; the ripple is noticeably less than V₀t/(RC)." }),
        P.manual({ label: "(d)", marks: 2, stem: "State the graph you would plot to test ΔV ∝ 1/C and what it would show if the relationship held.", points: ["Plot ΔV against 1/C.", "A straight line through the origin (gradient V₀t/R)."], modelAnswer: "Plot ΔV against 1/C; if ΔV ∝ 1/C the points lie on a straight line through the origin, with gradient V₀t/R." }),
      ],
      explanation: "ΔV ≈ V₀t/(RC) when RC ≫ t, so ΔV ∝ 1/C.",
      hints: ["Compare RC with 10 ms for each capacitor."],
    });
  }

  b.card("DEFINITION", "**Rectification**", "Converting a.c. into a current in one direction only.");
  b.card("CONCEPT", "Half-wave rectifier", "One diode in series with the load: one half-cycle passes, the other is blocked; output has gaps.");
  b.card("CONCEPT", "Bridge rectifier", "Four diodes; two opposite diodes conduct in each half-cycle; load current always in the same direction; no gaps.");
  b.card("CONCEPT", "Smoothing capacitor", "In parallel with the load: charges to the peak, discharges through the load between peaks.");
  b.card("CONCEPT", "Reducing ripple", "Make RC ≫ time between peaks: larger C, larger load resistance, or full-wave rectification.");
  b.card("FORMULA", "Ripple estimate", t`$\Delta V \approx \dfrac{V_0t}{RC}$, $t = T$ (half-wave) or $T/2$ (full-wave)`);
  b.card("FACT", "Peaks per second from a 50 Hz supply", "Half-wave: 50 (20 ms apart). Full-wave: 100 (10 ms apart).");
  b.card("CONCEPT", "d.c. power supply stages", "Step-down transformer → bridge rectifier → smoothing capacitor → regulator.");
  b.card("FACT", "Real diodes", "Each silicon diode drops about 0.7 V; a bridge loses about 1.4 V from the peak.");
});
