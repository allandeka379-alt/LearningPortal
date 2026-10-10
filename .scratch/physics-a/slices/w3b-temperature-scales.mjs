// W3b: aphys.thermal.temperature-scales — thermal equilibrium, thermometric properties, fixed points, thermodynamic
// scale and absolute zero, T/K = θ/°C + 273.15, comparison of thermometers.
import { concept, P, t, chk, sfStr, dpStr, toK, table, pctUnc } from "../lib.mjs";

const scale = (x, x0, x100) => ((x - x0) / (x100 - x0)) * 100;

concept("aphys.thermal.temperature-scales", { file: "thermal/temperature-scales", keyPrefix: "thermal.temperature-scales" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Two bodies are in thermal equilibrium. Which statement must be true?",
    options: [
      ["They are at the same temperature.", "Correct: no net energy flows between bodies at the same temperature."],
      ["They contain the same amount of internal energy.", "Internal energy depends on mass and material as well as temperature."],
      ["No energy passes between them in either direction.", "Energy passes both ways; only the net flow is zero."],
      ["They have the same specific heat capacity.", "Equilibrium says nothing about the materials."],
    ],
    answer: "A",
    explanation: "Thermal equilibrium: no net flow of thermal energy, which means equal temperatures.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The temperature of a liquid rises from 18 °C to 63 °C. What is the rise in temperature in kelvin?",
    options: [
      ["45 K", "Correct: a temperature difference has the same size in K and °C."],
      ["318 K", "This adds 273 to the difference; only temperatures, not differences, are shifted."],
      ["336 K", "This is 63 °C converted to kelvin, not the rise."],
      ["291 K", "This is 18 °C converted to kelvin, not the rise."],
    ],
    answer: "A",
    explanation: "336 K − 291 K = 45 K: the same as 63 − 18 = 45 °C.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the thermodynamic scale preferred to an empirical scale based on the expansion of mercury?",
    options: [
      ["It does not depend on the properties of any particular substance.", "Correct: it is defined theoretically, with absolute zero and the triple point of water."],
      ["Mercury expands non-linearly, so a mercury scale has no fixed points.", "A mercury scale does have fixed points; it is non-linear between them."],
      ["It gives larger numbers, so readings are more precise.", "Adding 273.15 does not change precision."],
      ["It uses the boiling point of water as its single fixed point.", "Its fixed point is the triple point of water, 273.16 K."],
    ],
    answer: "A",
    explanation: "Empirical scales depend on how one property varies; the thermodynamic scale is substance-independent.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A resistance thermometer and a liquid-in-glass thermometer are both calibrated at the ice point and the steam point. They are placed in the same beaker of warm water. Which statement is correct?",
    options: [
      ["They may differ: the two properties vary in different non-linear ways.", "Correct: each scale assumes its own property is linear between the fixed points."],
      ["They must agree: they share the same fixed points.", "Agreement is guaranteed only at the fixed points themselves."],
      ["They differ only if the water is not in equilibrium with both.", "Even in equilibrium, the empirical scales can differ between the fixed points."],
      ["The resistance one must read the thermodynamic temperature.", "A linear resistance scale is still an empirical scale."],
    ],
    answer: "A",
    explanation: "Different thermometric properties are non-linear in different ways, so the empirical scales coincide only at the fixed points.",
    hints: ["What is assumed when the interval between fixed points is divided into 100 equal parts?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which thermometer is most suitable for measuring the rapidly changing temperature at a point inside a car engine's exhaust?",
    options: [
      ["A thermocouple", "Correct: tiny junction, fast response, wide range, remote reading."],
      ["A mercury-in-glass thermometer", "Too slow and fragile, and its range is too small for hot exhaust gas."],
      ["An alcohol-in-glass thermometer", "Alcohol boils at about 78 °C, far below exhaust temperatures."],
      ["A constant-volume gas thermometer", "Accurate but bulky and slow; used for calibration, not for a point measurement."],
    ],
    answer: "A",
    explanation: "A thermocouple's small junction has a small heat capacity (fast response) and it works to well over 1000 °C.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement about absolute zero is correct?",
    options: [
      ["It is the temperature at which a system has minimum internal energy.", "Correct: on the thermodynamic scale this is 0 K."],
      ["It is the temperature at which every substance would become liquid.", "Matter near 0 K is solid (helium is an exception that stays liquid under its own vapour pressure)."],
      ["It is the temperature at which water freezes on the kelvin scale.", "Water freezes at 273.15 K."],
      ["It is the temperature at which the volume of every real gas becomes zero.", "Real gases liquefy long before; the zero volume is an extrapolation for an ideal gas."],
    ],
    answer: "A",
    explanation: "0 K = −273.15 °C: minimum internal energy; molecular kinetic energy is a minimum.",
    hints: ["Think about internal energy, not about any particular substance."],
  });
  {
    const x0 = 3.86, x100 = 5.43, x = 4.71;
    const th = scale(x, x0, x100);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`The resistance of a coil is $3.86\ \Omega$ at the ice point and $5.43\ \Omega$ at the steam point. In a liquid its resistance is $4.71\ \Omega$. Calculate the temperature of the liquid on the resistance scale, in °C, to three significant figures.`,
      value: th, unit: "°C", wrong: [(x / x100) * 100, ((x - x0) / x100) * 100],
      explanation: t`$\theta = \dfrac{4.71 - 3.86}{5.43 - 3.86} \times 100 = \dfrac{0.85}{1.57} \times 100 = ${sfStr(th, 3)}\ ^\circ\text{C}$.`,
    });
  }
  {
    const th = -195.8;
    b.num({
      d: 1, skill: "RECALL",
      stem: t`Liquid nitrogen boils at $-195.8\ ^\circ\text{C}$ at atmospheric pressure. Express this temperature in kelvin, to two decimal places.`,
      value: toK(th), dp: 2, unit: "K", wrong: [273.15 + 195.8, -195.8 - 273.15],
      explanation: t`$T = -195.8 + 273.15 = ${dpStr(toK(th), 2)}\ \text{K}$. Adding 195.8 instead of subtracting it gives 468.95 K.`,
    });
  }
  {
    // constant-volume gas thermometer referenced to the triple point
    const ptr = 82.4, p = 109.6;
    const T = 273.16 * (p / ptr);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A constant-volume gas thermometer, which follows the thermodynamic scale, has a pressure of $82.4\ \text{kPa}$ at the triple point of water ($273.16\ \text{K}$). In a hot liquid the pressure is $109.6\ \text{kPa}$. Calculate the temperature of the liquid, in °C, to three significant figures.`,
      value: T - 273.15, unit: "°C", wrong: [T, 273.16 * (ptr / p) - 273.15],
      explanation: t`1. For an ideal gas at constant volume, $p \propto T$: $T = 273.16 \times \dfrac{109.6}{82.4} = ${sfStr(T, 4)}\ \text{K}$.
2. $\theta = T - 273.15 = ${sfStr(T - 273.15, 3)}\ ^\circ\text{C}$.`,
      hints: ["p is proportional to T in kelvin."],
    });
  }
  {
    // disagreement between two scales: thermistor log-type property
    const R0 = 5800, R100 = 340, Rx = 1240;
    const thLin = scale(Rx, R0, R100);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`An NTC thermistor has resistance $5800\ \Omega$ at $0\ ^\circ\text{C}$ and $340\ \Omega$ at $100\ ^\circ\text{C}$. Rudo uses it as a thermometer, assuming its resistance varies linearly with temperature. In water whose true temperature is $50\ ^\circ\text{C}$, the resistance is $1240\ \Omega$. Calculate the temperature her thermistor scale gives, in °C, to three significant figures.`,
      value: thLin, unit: "°C", wrong: [scale(Rx, R100, R0)],
      explanation: t`1. $\theta = \dfrac{R - R_0}{R_{100} - R_0} \times 100 = \dfrac{1240 - 5800}{340 - 5800} \times 100$.
2. $\theta = \dfrac{-4560}{-5460} \times 100 = ${sfStr(thLin, 3)}\ ^\circ\text{C}$.
3. The reading is far from the true $50\ ^\circ\text{C}$: a thermistor's resistance falls roughly exponentially, so a linear scale is a poor assumption.`,
      hints: ["Use the fixed-point formula exactly as for any property; the minus signs cancel."],
    });
    chk(thLin > 75 ? 1 : 0, 1);
  }
  {
    // uncertainty from fixed points
    const l0 = 22.0, l100 = 172.0, l = 104.0, dl = 0.5;
    const th = scale(l, l0, l100);
    const pct = pctUnc(2 * dl, l - l0) + pctUnc(2 * dl, l100 - l0);
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`A liquid thread is $22.0\ \text{mm}$ at the ice point, $172.0\ \text{mm}$ at the steam point and $104.0\ \text{mm}$ in a liquid. Each length is read to $\pm 0.5\ \text{mm}$. Using $\theta = \dfrac{l - l_0}{l_{100} - l_0} \times 100$, calculate the percentage uncertainty in $\theta$, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(dl, l - l0) + pctUnc(dl, l100 - l0), pctUnc(dl, l)],
      explanation: t`1. $\theta = \dfrac{82.0}{150.0} \times 100 = ${sfStr(th, 3)}\ ^\circ\text{C}$.
2. Each difference has uncertainty $0.5 + 0.5 = 1.0\ \text{mm}$.
3. $\dfrac{1.0}{82.0} \times 100 + \dfrac{1.0}{150.0} \times 100 = ${sfStr(pctUnc(1, 82), 2)} + ${sfStr(pctUnc(1, 150), 2)} = ${sfStr(pct, 2)}\%$.`,
      hints: ["Uncertainties add for a difference; percentage uncertainties add for a quotient."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The triple point of water is the fixed point that defines the thermodynamic temperature scale, at exactly 273.16 K.",
    answer: true,
    explanation: "True. Together with absolute zero, the triple point (0.01 °C) fixes the size of the kelvin.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each thermometer with its thermometric property.",
    pairs: [
      ["Liquid-in-glass thermometer", "Length of a liquid column in a capillary"],
      ["Platinum resistance thermometer", "Electrical resistance of a metal wire"],
      ["Thermocouple", "E.m.f. between two junctions of different metals"],
      ["Constant-pressure gas thermometer", "Volume of a fixed mass of gas"],
    ],
    explanation: "Each thermometer measures a property that changes reproducibly with temperature.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about practical thermometers.",
    template: "A thermocouple has a very {{blank:a}} response because its junction has a small heat capacity. A liquid-in-glass thermometer cannot be read {{blank:b}}. A thermistor is very sensitive but its resistance varies {{blank:c}} with temperature.",
    blanks: [
      { id: "a", accepted: ["fast"], choices: ["fast", "slow"] },
      { id: "b", accepted: ["remotely"], choices: ["remotely", "directly"] },
      { id: "c", accepted: ["non-linearly"], choices: ["non-linearly", "linearly"] },
    ],
    explanation: "Thermocouples respond quickly; electrical thermometers can be read remotely; thermistors are very non-linear.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "What is the temperature of absolute zero in degrees Celsius? (Give the value with its sign.)",
    accepted: ["-273.15", "−273.15", "-273.15 °C", "−273.15 °C", "-273", "−273", "-273 °C", "−273 °C"],
    normalise: ["trim", "lowercase", "collapse_whitespace"],
    explanation: "Absolute zero is $0\\ \\text{K} = -273.15\\ ^\\circ\\text{C}$.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how an empirical temperature scale is set up using a thermometric property.",
    points: [
      "Choose a property that varies continuously and reproducibly with temperature (e.g. length of a liquid thread).",
      "Measure its values at two fixed points: ice point (0 °C) and steam point (100 °C) at standard pressure.",
      "Assume the property varies linearly between them: θ = (X − X₀)/(X₁₀₀ − X₀) × 100 °C.",
    ],
    modelAnswer: "Choose a thermometric property, such as the length of a liquid thread, that changes continuously and reproducibly with temperature. Measure it at two fixed points, the ice point (0 °C) and the steam point (100 °C) at standard pressure. Assume it varies linearly in between, so that θ = (X − X₀)/(X₁₀₀ − X₀) × 100 °C.",
    explanation: "Property, two fixed points, linear interpolation.",
    hints: ["Which two temperatures are used, and what is assumed between them?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Compare a thermocouple and a liquid-in-glass thermometer for use in a school laboratory and in an industrial furnace, giving four points of comparison.",
    points: [
      "Range: thermocouple works to very high temperatures (over 1000 °C); liquid-in-glass limited (mercury below about 350 °C).",
      "Response time: thermocouple fast (small junction, small heat capacity); liquid-in-glass slow.",
      "Remote/automatic reading: thermocouple gives an electrical output that can be logged; liquid-in-glass must be read by eye.",
      "Direct reading and cost: liquid-in-glass is cheap, simple and read directly; thermocouple needs a meter and calibration (non-linear).",
    ],
    modelAnswer: "A thermocouple can measure very high temperatures, as in a furnace, while a liquid-in-glass thermometer is limited to a few hundred degrees. A thermocouple's small junction responds quickly, while the glass bulb is slow. A thermocouple gives an electrical signal that can be read remotely or logged; the liquid thermometer must be read by eye. But the liquid-in-glass thermometer is cheap, simple and reads directly, whereas a thermocouple needs a voltmeter and a calibration because its e.m.f. is non-linear. So liquid-in-glass suits the school laboratory and a thermocouple suits the furnace.",
    explanation: "Range, response, remote reading, simplicity.",
    hints: ["Think about range, speed of response, and how each is read."],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain what is meant by thermal equilibrium and why it is needed for a thermometer to read correctly.",
    points: [
      "Thermal equilibrium: no net flow of thermal energy between bodies in contact, so they are at the same temperature.",
      "A thermometer measures its own temperature, so it must be left until it is in equilibrium with the object (reading steady).",
    ],
    modelAnswer: "Bodies in thermal equilibrium exchange no net thermal energy, so they are at the same temperature. A thermometer actually measures its own temperature, so the reading equals the object's temperature only once the two are in equilibrium, when the reading has become steady.",
    explanation: "A thermometer reads its own temperature.",
  });

  // Practice structured: calibrating a thermocouple (14 marks)
  {
    const th = [0, 20, 40, 60, 80, 100];
    const a = 0.0405, bq = 0.000045; // mV per °C and mV per °C^2 (type-K-like, illustrative)
    const nz = [0, 0.004, -0.003, 0.002, -0.004, 0];
    const E = th.map((x, i) => Math.round((a * x + bq * x * x + nz[i]) * 1000) / 1000);
    const Ex = 2.10;
    // linear interpolation using fixed points
    const lin = ((Ex - E[0]) / (E[5] - E[0])) * 100;
    // find temperature from calibration (solve quadratic)
    const thTrue = (-a + Math.sqrt(a * a + 4 * bq * Ex)) / (2 * bq);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Tatenda calibrates a thermocouple with one junction in melting ice and the other in a water bath whose temperature $\theta$ is measured with a reference thermometer. The e.m.f. $E$ is read with a millivoltmeter:

${table([t`$\theta\,/\,^\circ\text{C}$`, t`$E\,/\,\text{mV}$`], th.map((x, i) => [String(x), dpStr(E[i], 3)]))}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Describe the graph of E against θ and state what it shows about the thermocouple.", points: ["E increases with θ along a gentle curve (gradient increasing slightly), passing through the origin.", "So the e.m.f. is not exactly proportional to temperature: the thermocouple is non-linear and needs a calibration graph."], modelAnswer: "The e.m.f. rises from zero with temperature along a gentle curve whose gradient increases slightly. The thermocouple is therefore non-linear, so readings must be converted using the calibration graph." }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the mean sensitivity between $0$ and $100\ ^\circ\text{C}$, in $\text{mV}$ per kelvin, to three significant figures.`, value: (E[5] - E[0]) / 100, wrong: [E[5]], explanation: t`$\dfrac{${dpStr(E[5], 3)} - 0}{100} = ${sfStr((E[5] - E[0]) / 100, 3)}\ \text{mV K}^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`The bath is changed and the e.m.f. is $2.100\ \text{mV}$. Using a linear scale between $0$ and $100\ ^\circ\text{C}$, calculate the temperature, in °C, to three significant figures.`, value: lin, unit: "°C", wrong: [(Ex / E[3]) * 60], explanation: t`$\theta = \dfrac{2.100}{${dpStr(E[5], 3)}} \times 100 = ${sfStr(lin, 3)}\ ^\circ\text{C}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`The calibration curve is $E = (0.0405\,\theta + 4.5 \times 10^{-5}\,\theta^2)$ mV with θ in °C. Calculate the temperature that gives $2.100\ \text{mV}$, in °C, to three significant figures.`, value: thTrue, unit: "°C", wrong: [Ex / a], explanation: t`$4.5 \times 10^{-5}\theta^2 + 0.0405\theta - 2.100 = 0$; $\theta = \dfrac{-0.0405 + \sqrt{0.0405^2 + 4 \times 4.5 \times 10^{-5} \times 2.100}}{2 \times 4.5 \times 10^{-5}} = ${sfStr(thTrue, 3)}\ ^\circ\text{C}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why your answers to (c) and (d) differ, and which is closer to the thermodynamic temperature.", points: ["The linear scale assumes E ∝ θ between the fixed points, but E is not linear in θ.", "(d), from the calibration against the reference thermometer, is closer (the curve accounts for the non-linearity)."], modelAnswer: "The linear scale assumes the e.m.f. varies in proportion to temperature between the fixed points, but it does not; the calibration curve allows for the curvature, so (d) is closer to the true temperature." }),
        P.manual({ label: "(f)", marks: 2, stem: "Give two advantages of a thermocouple over a mercury-in-glass thermometer for measuring the temperature of a small soldered joint as it cools.", points: ["Small junction, small heat capacity: fast response to a changing temperature and does not cool the joint significantly.", "Electrical output can be recorded continuously with a data logger (remote reading)."], modelAnswer: "The tiny junction has a small heat capacity, so it follows the falling temperature quickly without drawing much energy from the joint; and its electrical output can be logged continuously." }),
        P.manual({ label: "(g)", marks: 2, stem: "State one safety precaution and one way of improving the reliability of the calibration.", points: ["Safety: take care with hot water near 100 °C (tongs, heat-resistant mat, stable stand) to avoid scalds.", "Reliability: stir the bath and wait for steady readings before recording / repeat readings on heating and cooling and average / keep the reference junction in melting ice throughout."], modelAnswer: "Handle the near-boiling bath with care, on a stable stand, to avoid scalds. Stir the bath and wait for steady readings before recording each value, and repeat the calibration on cooling, averaging the results." }),
      ],
      explanation: "A thermocouple's e.m.f. is non-linear in θ, so a calibration curve, not a linear scale, gives the best temperature.",
      hints: ["Solve the quadratic for θ in (d).", "Sensitivity = change in E ÷ change in θ."],
    });
    chk(Math.abs(lin - thTrue) > 2 ? 1 : 0, 1);
  }
  // Practice structured: comparing two scales (8 marks)
  {
    const R0 = 25.0, R100 = 34.8, Rx = 29.6;
    const p0 = 100.0, p100 = 136.6, px = 117.8;
    const thR = scale(Rx, R0, R100), thP = scale(px, p0, p100);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A resistance thermometer and a constant-volume gas thermometer are placed together in a liquid.

${table(["", "Ice point", "Steam point", "In the liquid"], [[t`Resistance $/\ \Omega$`, "25.0", "34.8", "29.6"], [t`Gas pressure $/\ \text{kPa}$`, "100.0", "136.6", "117.8"]])}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the temperature of the liquid on the resistance scale, in °C, to three significant figures.", value: thR, unit: "°C", wrong: [(Rx / R100) * 100], explanation: t`$\dfrac{29.6 - 25.0}{34.8 - 25.0} \times 100 = ${sfStr(thR, 3)}\ ^\circ\text{C}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the temperature of the liquid on the gas scale, in °C, to three significant figures.", value: thP, unit: "°C", wrong: [(px / p100) * 100], explanation: t`$\dfrac{117.8 - 100.0}{136.6 - 100.0} \times 100 = ${sfStr(thP, 3)}\ ^\circ\text{C}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why the two values differ, given that both thermometers are in thermal equilibrium with the liquid.", points: ["Both are at the same (true) temperature, but each scale assumes its own property is linear in temperature between the fixed points.", "Resistance and gas pressure vary with temperature in different (non-identical) ways, so the scales agree only at the fixed points."], modelAnswer: "Both thermometers are at the liquid's temperature, but each empirical scale assumes its own property varies linearly between 0 °C and 100 °C. Resistance and pressure do not vary in exactly the same way, so the two scales agree only at the fixed points." }),
        P.manual({ label: "(d)", marks: 2, stem: "State which value is closer to the thermodynamic temperature, and explain why.", points: ["The gas thermometer value.", "At low pressure a gas behaves almost ideally, and p ∝ T for an ideal gas at constant volume, which is how the thermodynamic scale is realised."], modelAnswer: "The gas-thermometer value, because a gas at low pressure is nearly ideal and its pressure at constant volume is proportional to thermodynamic temperature." }),
      ],
      explanation: "Empirical scales coincide only at the fixed points; the ideal-gas scale matches the thermodynamic scale.",
      hints: ["Use θ = (X − X₀)/(X₁₀₀ − X₀) × 100 for each."],
    });
  }

  b.card("DEFINITION", "**Thermal equilibrium**", "No net flow of thermal energy between bodies in thermal contact: they are at the same temperature.");
  b.card("DEFINITION", "**Thermometric property**", "A property that varies continuously and reproducibly with temperature: liquid length, gas volume or pressure, resistance, thermocouple e.m.f.");
  b.card("FORMULA", "Empirical scale from fixed points", t`$\theta = \dfrac{X_\theta - X_0}{X_{100} - X_0} \times 100\ ^\circ\text{C}$`);
  b.card("FORMULA", "Kelvin and Celsius", t`$T/\text{K} = \theta/^\circ\text{C} + 273.15$; differences are equal in K and °C`);
  b.card("DEFINITION", "**Absolute zero**", "0 K (−273.15 °C): the temperature of minimum internal energy of a system.");
  b.card("FACT", "Thermodynamic scale fixed point", "Triple point of water: exactly 273.16 K (0.01 °C). The scale does not depend on any substance.");
  b.card("CONCEPT", "Why thermometers disagree", "Each empirical scale assumes its property is linear between the fixed points; properties differ, so scales agree only at the fixed points.");
  b.card("CONCEPT", "Thermocouple", "Wide range, fast response (small junction), remote reading; low and non-linear e.m.f. needs calibration.");
  b.card("CONCEPT", "Platinum resistance v. liquid-in-glass", "Platinum: precise, wide range, remote reading, slower. Liquid-in-glass: cheap, direct reading, slow, limited range.");
});
