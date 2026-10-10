// W4b: aphys.electronics.op-amp-properties (ZIMSEC only) — ideal and real op-amp properties, V_out = A0(V+ − V−),
// saturation, the comparator with sensors and LED/relay outputs.
import { concept, P, t, chk, sfStr, dpStr, sciTex, table, linFit, halfRange, mean } from "../lib.mjs";

const thermR = (c, R25, B) => R25 * Math.exp(B * (1 / (c + 273.15) - 1 / 298.15));

concept("aphys.electronics.op-amp-properties", { file: "electronics/op-amp-properties", keyPrefix: "electronics.op-amp-properties" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which pair of values describes the input resistance and the output resistance of an ideal operational amplifier?",
    options: [
      ["Input resistance infinite; output resistance zero", "Correct: it draws no input current and its output voltage does not depend on the load."],
      ["Input resistance zero; output resistance infinite", "This is the reverse: a zero input resistance would short-circuit the source."],
      ["Input resistance infinite; output resistance infinite", "An infinite output resistance would mean the output voltage collapses whenever a load draws current."],
      ["Input resistance zero; output resistance zero", "A zero input resistance would draw a large current from a sensor and change its voltage."],
    ],
    answer: "A",
    explanation: "Ideal op-amp: infinite open-loop gain, infinite input resistance, zero output resistance, infinite bandwidth and slew rate.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "An op-amp input is connected to the junction of a thermistor and a fixed resistor. Which property of the op-amp ensures that connecting it does not change the voltage at the junction?",
    options: [
      ["Its very high input resistance", "Correct: it draws almost no current from the divider, so the divider is not loaded."],
      ["Its very high open-loop gain", "The gain decides how the output responds; it does not stop current being drawn from the divider."],
      ["Its very low output resistance", "This concerns the output and the load, not the input side."],
      ["Its very high slew rate", "Slew rate is how fast the output can change; it has nothing to do with loading the input."],
    ],
    answer: "A",
    explanation: "A very high input resistance means negligible input current, so the potential divider's output is unchanged.",
  });
  {
    const A0 = 5.0e4, Vp = 3.0, Vm = 3.3, Vs = 15;
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`An op-amp with open-loop gain $5.0 \times 10^{4}$ runs from a $\pm 15\ \text{V}$ supply and saturates at the supply voltages. $V^{+} = 3.0\ \text{V}$ and $V^{-} = 3.3\ \text{V}$. What is the output voltage?`,
      options: [
        [t`$-15\ \text{V}$`, "Correct: V⁻ > V⁺, and 0.3 V × 5.0 × 10⁴ is far beyond the supply, so the output saturates negatively."],
        [t`$+15\ \text{V}$`, "The output is positive only when the non-inverting input is higher."],
        [t`$-1.5 \times 10^{4}\ \text{V}$`, "A₀(V⁺ − V⁻) is impossible here: the output cannot exceed the supply voltage."],
        [t`$-0.3\ \text{V}$`, "This is just the input difference; the op-amp multiplies it by the open-loop gain until it saturates."],
      ],
      answer: "A",
      explanation: t`$A_0(V^{+} - V^{-}) = ${sciTex(A0 * (Vp - Vm), 2)}\ \text{V}$, far beyond the supply, so the output saturates at $-${Vs}\ \text{V}$ (negative because $V^{-} > V^{+}$).`,
    });
  }
  {
    const A0 = 4.0e5, Vsat = 14;
    const dmax = Vsat / A0;
    chk(dmax * 1e6, 35);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An op-amp has an open-loop gain of $4.0 \times 10^{5}$ and its output saturates at $\pm 14\ \text{V}$. What is the largest input difference $|V^{+} - V^{-}|$ for which the output is not saturated?`,
      options: [
        [t`$35\ \mu\text{V}$`, "Correct: 14 / (4.0 × 10⁵) = 3.5 × 10⁻⁵ V."],
        [t`$70\ \mu\text{V}$`, "This uses the full swing of 28 V; saturation is reached at 14 V on either side of zero."],
        [t`$5.6 \times 10^{6}\ \text{V}$`, "This multiplies by the gain instead of dividing."],
        [t`$14\ \text{V}$`, "This is the output at saturation, not the input difference that causes it."],
      ],
      answer: "A",
      explanation: t`$|V^{+} - V^{-}|_{\max} = \dfrac{V_{\text{sat}}}{A_0} = \dfrac{14}{4.0 \times 10^{5}} = 3.5 \times 10^{-5}\ \text{V} = 35\ \mu\text{V}$.`,
      hints: ["Divide the saturation voltage by the open-loop gain."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: t`Which description fits the graph of $V_{\text{out}}$ against $(V^{+} - V^{-})$ for an op-amp used without feedback?`,
    options: [
      ["A steep line through the origin over a few microvolts, flat at the two saturation voltages outside it", "Correct: linear with gradient A₀ only for tiny differences, then saturated."],
      ["A straight line through the origin with gradient A₀ for every input difference", "The output cannot go beyond the supply voltages, so the line must level off."],
      ["A horizontal line at zero until the inputs differ by about 1 V, then a step to saturation", "Any difference above a few tens of microvolts already saturates the output."],
      ["A curve that rises steeply at first and then levels off gradually towards one supply voltage", "The characteristic is linear and then abruptly flat, and it is symmetrical about the origin."],
    ],
    answer: "A",
    explanation: "With A₀ ≈ 10⁵, the linear region is only tens of microvolts wide; outside it the output is at ±V_sat.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: t`In a dusk switch, an LDR is connected between $+9\ \text{V}$ and the inverting input, and a fixed resistor between the inverting input and 0 V. The non-inverting input is held at a fixed $4.5\ \text{V}$. What happens to the output as it gets dark?`,
    options: [
      [t`It switches from $-9\ \text{V}$ to $+9\ \text{V}$.`, "Correct: in the dark the LDR resistance rises, V⁻ falls below 4.5 V and the output goes positive."],
      [t`It switches from $+9\ \text{V}$ to $-9\ \text{V}$.`, "This would happen if V⁻ rose in the dark; the LDR is at the top of the divider, so V⁻ falls."],
      ["It falls gradually in proportion to the light level.", "Without feedback the op-amp is a comparator: it switches between saturation levels."],
      ["It stays constant because the reference voltage is fixed.", "The output depends on the difference V⁺ − V⁻, and V⁻ changes with the light."],
    ],
    answer: "A",
    explanation: "Darker → LDR resistance up → smaller share of 9 V across the fixed resistor → V⁻ < V⁺ → output +9 V.",
    hints: ["Work out which way V⁻ moves when the LDR resistance increases."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a diode connected in reverse across the coil of a relay driven by an op-amp?",
    options: [
      ["To protect the op-amp from the e.m.f. induced when the coil current is switched off", "Correct: the diode conducts the induced current and clamps the voltage."],
      ["To let the relay operate on both positive and negative op-amp output voltages", "A reverse diode across the coil does not conduct from the supply at all; it acts only on the induced e.m.f."],
      ["To limit the current through the relay coil during normal operation", "Reverse-biased, it carries no current in normal operation; a series resistor would limit current."],
      ["To make the relay switch on more quickly", "It slightly slows the release of the relay; its purpose is protection."],
    ],
    answer: "A",
    explanation: "Switching off the coil current causes a rapidly falling flux and a large back e.m.f.; the diode provides a path for this current and protects the op-amp.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: t`A real op-amp with a slew rate of $0.5\ \text{V}\,\mu\text{s}^{-1}$ is used as a comparator with a square-wave input of rising frequency. What happens to the output at high frequency?`,
    options: [
      ["Its edges slope instead of being vertical, so it becomes trapezoidal and then triangular.", "Correct: the output can change only at the slew rate, so fast switching cannot be followed."],
      ["Its amplitude doubles because the gain rises with frequency.", "The gain of a real op-amp falls with frequency; it never rises."],
      ["It becomes a sine wave of the same amplitude.", "The limited slew rate gives straight sloping edges, not a sinusoid."],
      ["Nothing changes, because a comparator output is always at saturation.", "A real op-amp needs time to move between the saturation levels."],
    ],
    answer: "A",
    explanation: "Finite slew rate: the output takes a time ΔV/(slew rate) to switch, which becomes a large fraction of each half-cycle at high frequency.",
    hints: ["How long does the output take to swing between the saturation levels?"],
  });
  {
    const A0 = 1.0e5, d = 80e-6;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`An op-amp with open-loop gain $1.0 \times 10^{5}$ saturates at $\pm 15\ \text{V}$. Calculate the output voltage, in V, when $V^{+} - V^{-} = 80\ \mu\text{V}$.`,
      value: A0 * d, unit: "V", wrong: [A0 * d / 10, 15],
      explanation: t`$V_{\text{out}} = A_0(V^{+} - V^{-}) = 1.0 \times 10^{5} \times 80 \times 10^{-6} = ${A0 * d}\ \text{V}$, which is below 15 V, so the op-amp is not saturated.`,
    });
  }
  {
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The same op-amp (gain $1.0 \times 10^{5}$, saturation $\pm 15\ \text{V}$) has $V^{+} - V^{-} = -0.25\ \text{mV}$. State the output voltage, in V.`,
      value: -15, unit: "V", wrong: [-25, 15],
      explanation: t`$A_0(V^{+} - V^{-}) = 1.0 \times 10^{5} \times (-2.5 \times 10^{-4}) = -25\ \text{V}$, which is beyond the supply, so the output saturates at $-15\ \text{V}$.`,
      hints: ["Compare A₀(V⁺ − V⁻) with the saturation voltage."],
    });
  }
  {
    const swing = 26, slew = 0.5;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An op-amp comparator switches its output from $-13\ \text{V}$ to $+13\ \text{V}$. Its slew rate is $0.50\ \text{V}\,\mu\text{s}^{-1}$. Calculate the time taken for the output to change, in µs.`,
      value: swing / slew, unit: "µs", wrong: [13 / slew, swing * slew],
      explanation: t`1. Change in output $= 13 - (-13) = 26\ \text{V}$.
2. Time $= \dfrac{\Delta V}{\text{slew rate}} = \dfrac{26}{0.50} = ${swing / slew}\ \mu\text{s}$. Using 13 V instead of the full 26 V swing gives half this.`,
      hints: ["The output changes by 26 V, not 13 V."],
    });
  }
  {
    const Rt = 12, Rb = 6.8, Rfix = 4.7;
    const Rsw = (Rfix * Rb) / Rt;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`In a comparator powered from $+12\ \text{V}$, $0$ and $-12\ \text{V}$, the inverting input is connected to the junction of a $12\ \text{k}\Omega$ resistor (to $+12\ \text{V}$) and a $6.8\ \text{k}\Omega$ resistor (to 0 V). The non-inverting input is connected to the junction of a $4.7\ \text{k}\Omega$ resistor (to $+12\ \text{V}$) and an LDR (to 0 V). Calculate the resistance of the LDR, in kΩ, at which the output switches, to three significant figures.`,
      value: Rsw, unit: "kΩ", wrong: [(Rfix * Rt) / Rb],
      explanation: t`1. Reference: $V^{-} = 12 \times \dfrac{6.8}{12 + 6.8} = ${sfStr((12 * Rb) / (Rt + Rb), 3)}\ \text{V}$.
2. Switching when $V^{+} = V^{-}$: $\dfrac{R_{\text{LDR}}}{4.7 + R_{\text{LDR}}} = \dfrac{6.8}{18.8}$, which means $\dfrac{R_{\text{LDR}}}{4.7} = \dfrac{6.8}{12}$.
3. $R_{\text{LDR}} = 4.7 \times \dfrac{6.8}{12} = ${sfStr(Rsw, 3)}\ \text{k}\Omega$. Inverting the ratio gives $${sfStr((Rfix * Rt) / Rb, 3)}\ \text{k}\Omega$, the wrong way round.`,
      hints: ["The two dividers give equal voltages when their resistance ratios are equal."],
    });
  }
  {
    const temps = [37.5, 38.5, 38.0, 37.0, 38.5];
    const hr = halfRange(temps);
    chk(hr, 0.75);
    b.num({
      d: 3, skill: "EVALUATION", calculator: false,
      stem: t`Nyasha calibrates a comparator alarm by heating the thermistor slowly in a water bath and noting the temperature at which the LED lights. Five trials give $37.5$, $38.5$, $38.0$, $37.0$ and $38.5\ ^\circ\text{C}$. State the absolute uncertainty in the switching temperature, in °C, as half the range.`,
      value: hr, sf: 2, unit: "°C", wrong: [hr * 2, 0.5],
      explanation: t`Range $= 38.5 - 37.0 = 1.5\ ^\circ\text{C}$; uncertainty $= \tfrac{1}{2} \times 1.5 = ${dpStr(hr, 2)}\ ^\circ\text{C}$, so the switching temperature is $${dpStr(mean(temps), 1)} \pm 0.8\ ^\circ\text{C}$. Heating slowly and stirring keeps the thermistor at the thermometer's temperature.`,
      hints: ["Half of (largest − smallest)."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The output of an op-amp used as a comparator is proportional to the difference between its input voltages.",
    answer: false,
    explanation: "False. Without feedback the op-amp is almost always saturated: the output is +V_sat or −V_sat depending only on which input is higher.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each property of an ideal op-amp with its value.",
    pairs: [
      ["Open-loop voltage gain", "Infinite"],
      ["Output resistance", "Zero"],
      ["Current drawn by each input", "Zero (infinite input resistance)"],
      ["Time for the output to change", "Zero (infinite slew rate)"],
    ],
    explanation: "Ideal op-amp: infinite gain, input resistance, bandwidth and slew rate; zero output resistance and zero input current.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the description of a comparator.",
    template: "When the voltage at the non-inverting input is greater than the voltage at the inverting input, the output saturates at the {{blank:a}} supply voltage. A rise in the voltage at the {{blank:b}} input makes the output fall.",
    blanks: [
      { id: "a", accepted: ["positive"], choices: ["positive", "negative", "zero"] },
      { id: "b", accepted: ["inverting"], choices: ["inverting", "non-inverting"] },
    ],
    explanation: "V_out = A₀(V⁺ − V⁻): positive when V⁺ > V⁻; increasing V⁻ lowers the output.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "What name is given to the op-amp input marked with a minus sign (−)?",
    accepted: ["inverting input", "inverting", "the inverting input"],
    explanation: "The − input is the inverting input: raising its voltage lowers the output.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why an op-amp used without feedback is almost always saturated.",
    points: [
      "The open-loop gain is very large (about 10⁵ or more).",
      "The output cannot exceed (about) the supply voltage, so the linear range of input difference is only V_sat/A₀, tens of microvolts.",
      "Almost any real input difference (or noise/offset) is larger than this, so the output is driven to +V_sat or −V_sat.",
    ],
    modelAnswer: "The open-loop gain is about 10⁵, but the output cannot go beyond about the supply voltage. The input difference that keeps the output in range is therefore only about V_sat/A₀, tens of microvolts. Practically any real difference between the inputs, even noise or offset, is bigger than that, so the output sits at one of the saturation levels.",
    explanation: "Huge gain + limited output → microvolt linear range.",
    hints: ["Divide the supply voltage by the gain."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A greenhouse fan is controlled by a comparator. An NTC thermistor is connected between +12 V and the non-inverting input, with a fixed resistor from that input to 0 V; the inverting input is held at a fixed reference voltage. The output drives the fan through a relay. Explain how the circuit switches the fan on when the greenhouse becomes too hot.",
    points: [
      "As the temperature rises the thermistor's resistance falls.",
      "So a larger share of the 12 V is across the fixed resistor: V⁺ rises.",
      "When V⁺ becomes greater than the reference V⁻, the output switches to positive saturation.",
      "The relay coil is energised and its contacts close the separate (high-current) fan circuit.",
    ],
    modelAnswer: "When the temperature rises, the NTC thermistor's resistance falls, so a larger fraction of the 12 V appears across the fixed resistor and V⁺ rises. When V⁺ passes the fixed reference voltage at the inverting input, the output switches from negative to positive saturation. Current then flows in the relay coil, which closes its contacts and switches on the fan's own high-current circuit.",
    explanation: "Chain: temperature → thermistor resistance → V⁺ → comparison with reference → output state → relay → fan.",
    hints: ["Start with what happens to the thermistor's resistance."],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a low output resistance is desirable for an op-amp that drives a load such as a relay coil.",
    points: [
      "Little p.d. is lost across the output resistance when the load draws current.",
      "So the output voltage stays (almost) the same whatever load is connected.",
    ],
    modelAnswer: "With a very low output resistance, hardly any voltage is lost inside the op-amp when the load draws current, so the voltage delivered to the load stays almost the same whatever is connected.",
    explanation: "Zero output resistance: the output behaves like an ideal voltage source.",
  });

  // Practice structured: an overheat alarm for a maize-mill motor (12 marks)
  {
    const R25 = 10, B = 3950;
    const temps = [30, 40, 50, 60, 70];
    const Rs = temps.map((c) => Number(sfStr(thermR(c, R25, B), 3)));
    const Vref = (12 * 10) / (15 + 10);
    const Vp50 = (12 * 2.2) / (Rs[2] + 2.2);
    const Rsw = (12 * 2.2) / Vref - 2.2;
    const Tsw = 1 / (1 / 298.15 + Math.log(Rsw / R25) / B) - 273.15;
    const Rled = (12 - 2.0) / 0.015;
    chk(Rsw, 3.3, 1e-9);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`An overheat alarm for a maize-mill motor uses an op-amp powered from $+12\ \text{V}$, $0$ and $-12\ \text{V}$, saturating at $\pm 12\ \text{V}$. The inverting input is connected to the junction of a $15\ \text{k}\Omega$ resistor (to $+12\ \text{V}$) and a $10\ \text{k}\Omega$ resistor (to 0 V). The non-inverting input is connected to the junction of an NTC thermistor (to $+12\ \text{V}$) and a $2.2\ \text{k}\Omega$ resistor (to 0 V). A red LED in series with a resistor is connected from the output to 0 V. The thermistor's resistance is:

${table([t`$\theta\,/\,^\circ\text{C}$`, ...temps.map(String)], [[t`$R\,/\,\text{k}\Omega$`, ...Rs.map((r) => sfStr(r, 3))]])}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the voltage at the inverting input, in V.", value: Vref, unit: "V", wrong: [(12 * 15) / 25], explanation: t`$V^{-} = 12 \times \dfrac{10}{15 + 10} = ${sfStr(Vref, 3)}\ \text{V}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the voltage at the non-inverting input at 50 °C, in V, to three significant figures.", value: Vp50, unit: "V", wrong: [(12 * Rs[2]) / (Rs[2] + 2.2)], explanation: t`$V^{+} = 12 \times \dfrac{2.2}{${sfStr(Rs[2], 3)} + 2.2} = ${sfStr(Vp50, 3)}\ \text{V}$.` }),
        P.mcq({ label: "(c)", marks: 1, stem: "State the output voltage and the state of the LED at 50 °C.", options: [
          [t`$-12\ \text{V}$; LED off`, "Correct: V⁺ < V⁻, negative saturation, and the LED is reverse-biased."],
          [t`$+12\ \text{V}$; LED on`, "This needs V⁺ > V⁻; at 50 °C V⁺ is still below the reference."],
          [t`$0\ \text{V}$; LED off`, "A comparator output is at one of the saturation levels, not zero."],
          [t`$-12\ \text{V}$; LED on`, "With the output negative the LED is reverse-biased and does not light."],
        ], answer: "A", explanation: t`$${sfStr(Vp50, 3)}\ \text{V} < ${sfStr(Vref, 3)}\ \text{V}$, so the output is at $-12\ \text{V}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the thermistor resistance at which the output switches, in kΩ.", value: Rsw, unit: "kΩ", wrong: [(12 * 2.2) / Vref], explanation: t`$12 \times \dfrac{2.2}{R + 2.2} = ${sfStr(Vref, 3)}$, so $R + 2.2 = ${sfStr((12 * 2.2) / Vref, 3)}$ and $R = ${sfStr(Rsw, 3)}\ \text{k}\Omega$.` }),
        P.num({ label: "(e)", marks: 2, stem: "Use the table to estimate the temperature at which the alarm sounds, in °C.", value: Tsw, tol: 2.5, unit: "°C", wrong: [40], explanation: t`$3.30\ \text{k}\Omega$ lies between $${sfStr(Rs[2], 3)}\ \text{k}\Omega$ (50 °C) and $${sfStr(Rs[3], 3)}\ \text{k}\Omega$ (60 °C), about a quarter of the way along, so about $52\ ^\circ\text{C}$ (the resistance falls non-linearly, so a value from 51 to 54 °C is reasonable).` }),
        P.num({ label: "(f)", marks: 2, stem: "The LED needs 15 mA and has 2.0 V across it when lit. Calculate the resistance of its series resistor, in Ω, to three significant figures.", value: Rled, unit: "Ω", wrong: [12 / 0.015], explanation: t`$R = \dfrac{12 - 2.0}{0.015} = ${sfStr(Rled, 3)}\ \Omega$.` }),
        P.manual({ label: "(g)", marks: 2, stem: "Suggest how the circuit could be changed so that the switching temperature can be adjusted, and explain why the op-amp's high input resistance matters here.", points: [
          "Replace the 15 kΩ or 10 kΩ reference resistor (or the 2.2 kΩ resistor) with a variable resistor, which changes the switching point.",
          "The inputs draw (almost) no current, so the divider voltages are not altered by connecting the op-amp.",
        ], modelAnswer: "Replace one of the reference resistors with a variable resistor so that the reference voltage, and therefore the switching temperature, can be set. Because the op-amp inputs draw almost no current, connecting them does not change the voltages of either divider." }),
      ],
      explanation: "Comparator: compare V⁺ (sensor) with V⁻ (reference); switching when the divider ratios are equal.",
      hints: ["Find the reference voltage first.", "Switching happens when V⁺ = V⁻."],
    });
  }
  // Practice structured: measured characteristic (8 marks)
  {
    const xs = [-100, -60, -40, -20, 0, 20, 40, 60, 100];
    const vout = [-13.4, -10.9, -7.1, -3.6, 0.1, 3.5, 7.3, 10.7, 13.4];
    const lin = xs.map((x, i) => [x, vout[i]]).filter(([x]) => Math.abs(x) <= 60);
    const fit = linFit(lin.map(([x]) => x * 1e-6), lin.map(([, y]) => y));
    const A0 = fit.m;
    const dmax = 13.4 / A0;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Farai measures the output of an op-amp, used without feedback and powered from a $\pm 15\ \text{V}$ supply, for small input differences produced by a potential divider:

${table([t`$(V^{+} - V^{-})\,/\,\mu\text{V}$`, t`$V_{\text{out}}\,/\,\text{V}$`], xs.map((x, i) => [String(x), dpStr(vout[i], 1)]))}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Use the linear part of the data to determine the open-loop gain $A_0$.`, value: A0, tol: 0.08e5, wrong: [A0 / 1e6], explanation: t`Gradient of the straight section (−60 to +60 µV): about $\dfrac{10.7 - (-10.9)}{120 \times 10^{-6}} \approx ${sciTex(A0, 2)}$. Convert microvolts to volts.` }),
        P.num({ label: "(b)", marks: 1, stem: "State the positive saturation voltage, in V.", value: 13.4, unit: "V", wrong: [15], explanation: "The output stops rising at +13.4 V." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why the saturation voltage is less than 15 V, and why the output for an input difference of +100 µV would also be obtained for +1 V.", points: [
          "The output transistors need a small p.d. across them, so the output cannot reach the supply rail (about 1-2 V less).",
          "Once saturated, the output is fixed at V_sat whatever the size of the difference, so +100 µV and +1 V both give +13.4 V.",
        ], modelAnswer: "The output stage inside the op-amp needs a volt or two across it, so the output can only get to about 13.4 V with a 15 V supply. Beyond about 75 µV the op-amp is saturated, so any larger difference, whether 100 µV or 1 V, gives the same 13.4 V." }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the largest input difference for which the output is not saturated, in µV, to two significant figures.", value: dmax * 1e6, tol: 4, wrong: [(15 / A0) * 1e6], explanation: t`$\dfrac{13.4}{${sciTex(A0, 2)}} = ${sfStr(dmax * 1e6, 2)}\ \mu\text{V}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest how input differences of a few microvolts can be produced from a 1.5 V cell, and one reason why the measured values near zero are unreliable.", points: [
          "Use a potential divider with a very large ratio (e.g. 1 MΩ and 10 Ω) across the cell, feeding one input, with the other input at 0 V.",
          "Input offset voltage / noise / pick-up of the same size (microvolts) as the signal makes readings near zero unreliable.",
        ], modelAnswer: "Connect a 1 MΩ resistor and a 10 Ω resistor in series across the cell and take the small voltage across the 10 Ω resistor (about 15 µV) to one input, with the other input at 0 V; a variable resistor adjusts it. Near zero, the op-amp's own offset voltage and electrical noise are of the same microvolt size as the signal, so those readings are unreliable." }),
      ],
      explanation: "Open-loop gain from the gradient of the linear region; saturation just inside the supply.",
      hints: ["Use only the straight section for the gradient.", "Convert µV to V."],
    });
  }

  b.card("DEFINITION", "**Operational amplifier**", "A high-gain voltage amplifier with an inverting (−) and a non-inverting (+) input whose output depends on the difference between the input voltages.");
  b.card("FORMULA", "Op-amp output without feedback", t`$V_{\text{out}} = A_0(V^{+} - V^{-})$, limited to $\pm V_{\text{sat}}$ (about the supply voltages)`);
  b.card("FACT", "Ideal op-amp properties", "Infinite open-loop gain, input resistance, bandwidth and slew rate; zero output resistance.");
  b.card("FACT", "Typical real op-amp (741)", t`$A_0 \approx 2 \times 10^{5}$; input resistance $\approx 2\ \text{M}\Omega$; output resistance $\approx 75\ \Omega$; slew rate $\approx 0.5\ \text{V}\,\mu\text{s}^{-1}$.`);
  b.card("DEFINITION", "**Saturation**", "The output has reached (nearly) a supply voltage and cannot rise further, whatever the input difference.");
  b.card("DEFINITION", "**Slew rate**", "The maximum rate of change of the output voltage of an op-amp (V µs⁻¹).");
  b.card("CONCEPT", "Comparator", "No feedback: output +V_sat when V⁺ > V⁻ and −V_sat when V⁺ < V⁻. A sensor divider on one input and a reference divider on the other set the switching point.");
  b.card("CONCEPT", "Why high input resistance?", "The op-amp draws no current from a sensor divider, so it does not change the voltage it is measuring.");
  b.card("CONCEPT", "Relay protection diode", "A diode across the relay coil carries the current from the large e.m.f. induced when the coil is switched off, protecting the op-amp.");
});
