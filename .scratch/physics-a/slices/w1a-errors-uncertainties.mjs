// W1a: measurement.errors-uncertainties — systematic and random errors, precision and accuracy, combining uncertainties.
import { concept, P, t as raw, chk, sfStr, dpStr, table, mean, halfRange, pctUnc, fracUnc, DATA } from "../lib.mjs";

// String.raw keeps "\n" literally: turn \n (not followed by a lower-case letter, so \nu and \neq survive) into a newline.
const t = (s, ...v) => raw(s, ...v).replace(/\\n(?![a-z])/g, "\n");

const K = "aphys.measurement.errors-uncertainties";

concept(K, { file: "measurement/errors-uncertainties", keyPrefix: "measurement.errors-uncertainties" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: t`A micrometer screw gauge reads $0.03\ \text{mm}$ when its jaws are closed. What kind of error is this, and how is it dealt with?`,
    options: [
      ["A systematic error, corrected by subtracting it from each reading.", "Correct: a zero error shifts every reading by the same amount."],
      ["A random error, reduced by averaging several readings.", "A zero error is the same every time, so averaging leaves it unchanged."],
      ["A random error, reduced by plotting a graph of the readings.", "A graph reveals a systematic error as an intercept but does not remove it; it is not random."],
      ["A systematic error, reduced by averaging several readings.", "Averaging only reduces random scatter; a systematic shift remains in the mean."],
    ],
    answer: "A",
    explanation: "A zero error is systematic: every reading is too large by 0.03 mm. Repeating does not help; subtract 0.03 mm from each reading (a negative zero error is added).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: t`Four students each measure the acceleration of free fall four times. The accepted value is $9.81\ \text{m s}^{-2}$. Whose readings, in $\text{m s}^{-2}$, are precise but **not** accurate?`,
    options: [
      ["9.52, 9.54, 9.53, 9.51", "Correct: the spread is tiny (precise) but the mean, 9.53, is well below 9.81 (not accurate)."],
      ["9.80, 9.83, 9.79, 9.82", "These are close together and centred on 9.81: precise and accurate."],
      ["9.3, 10.2, 9.6, 10.1", "These are widely scattered (not precise) although their mean, 9.8, is accurate."],
      ["8.7, 10.6, 9.1, 11.4", "These are widely scattered and their mean is off: neither precise nor accurate."],
    ],
    answer: "A",
    explanation: "Precision is about the spread of repeated readings; accuracy is about how close the mean is to the true value. A tight cluster away from the true value shows a systematic error.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: t`A length is found by subtracting two rule readings: $85.4 \pm 0.1\ \text{cm}$ and $62.0 \pm 0.1\ \text{cm}$. What is the result?`,
    options: [
      [t`$23.4 \pm 0.2\ \text{cm}$`, "Correct: for a difference the absolute uncertainties add."],
      [t`$23.4 \pm 0.0\ \text{cm}$`, "Uncertainties never cancel when quantities are subtracted; they add."],
      [t`$23.4 \pm 0.1\ \text{cm}$`, "Each reading contributes its own 0.1 cm, so the total is 0.2 cm."],
      [t`$23.4 \pm 0.4\ \text{cm}$`, "This doubles the sum; the rule is simply Δa + Δb."],
    ],
    answer: "A",
    explanation: t`$85.4 - 62.0 = 23.4\ \text{cm}$; for a sum or difference, $\Delta y = \Delta a + \Delta b = 0.1 + 0.1 = 0.2\ \text{cm}$.`,
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`The power dissipated in a resistor is found from $P = I^2R$. The current has a percentage uncertainty of 2 % and the resistance 3 %. What is the percentage uncertainty in $P$?`,
    options: [
      ["7 %", "Correct: 2 × 2 % (for I²) + 3 % = 7 %."],
      ["5 %", "This ignores the square on I: the percentage uncertainty in I must be doubled."],
      ["12 %", "Percentage uncertainties add for a product; they are not multiplied (2² × 3)."],
      ["1 %", "Uncertainties never subtract, whatever the form of the equation."],
    ],
    answer: "A",
    explanation: t`For a product, add percentage uncertainties; for a power, multiply by the power: $\%\,\Delta P = 2 \times 2\,\% + 3\,\% = 7\,\%$.`,
    hints: ["What happens to the percentage uncertainty when I is squared?"],
  });
  {
    const pL = pctUnc(0.001, 1.0);
    const pd2 = 2 * pctUnc(0.01, 0.4);
    const pR = pctUnc(0.1, 5.2);
    console.log("errors mcq5", pL, pd2, pR);
    b.mcq({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`The resistivity of a wire is found from $\rho = \dfrac{R\pi d^2}{4L}$ with $L = 1.000 \pm 0.001\ \text{m}$, $d = 0.40 \pm 0.01\ \text{mm}$ and $R = 5.2 \pm 0.1\ \Omega$. Which measurement contributes the largest percentage uncertainty to $\rho$?`,
      options: [
        ["the diameter", `Correct: 2.5 % in d becomes ${sfStr(pd2, 2)} % in d², the largest contribution.`],
        ["the length", `The length contributes only ${sfStr(pL, 1)} %.`],
        ["the resistance", `The resistance contributes ${sfStr(pR, 2)} %, less than the squared diameter.`],
        ["all three contribute equally", "The contributions are 0.1 %, 1.9 % and 5 %: very different."],
      ],
      answer: "A",
      explanation: t`$\%\,\Delta L = 0.1\,\%$, $\%\,\Delta R = ${sfStr(pR, 2)}\,\%$, $\%\,\Delta d = 2.5\,\%$ which doubles to $${sfStr(pd2, 2)}\,\%$ because $d$ is squared. The diameter dominates, so a more precise diameter measurement (several readings with a micrometer) would improve the result most.`,
      hints: ["Work out each percentage uncertainty.", "Remember the power on d."],
    });
  }
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`The kinetic energy of a trolley is calculated from $E_k = \tfrac{1}{2}mv^2$. The mass has a percentage uncertainty of 1 % and the speed 3 %. What is the percentage uncertainty in $E_k$?`,
    options: [
      ["7 %", "Correct: 1 % + 2 × 3 % = 7 %."],
      ["4 %", "The speed is squared, so its 3 % must be doubled."],
      ["3.5 %", "The factor ½ has no uncertainty and does not halve anything."],
      ["10 %", "This squares the 3 % and adds 1 %; powers multiply the percentage by the power."],
    ],
    answer: "A",
    explanation: t`$\%\,\Delta E_k = \%\,\Delta m + 2 \times \%\,\Delta v = 1 + 6 = 7\,\%$. Pure numbers such as $\tfrac{1}{2}$ add no uncertainty.`,
    hints: ["Constants such as ½ have no uncertainty."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`A student finds $g$ from $g = \dfrac{4\pi^2 l}{T^2}$. The percentage uncertainty in $l$ is 0.5 % and in $T$ is 1.0 %. What is the percentage uncertainty in $g$?`,
    options: [
      ["2.5 %", "Correct: 0.5 % + 2 × 1.0 % = 2.5 %."],
      ["1.5 %", "T is squared, so its percentage uncertainty doubles to 2.0 %."],
      ["0.5 %", "Dividing by T² does not subtract its uncertainty: uncertainties always add."],
      ["1.0 %", "Only the larger uncertainty has been kept; every contribution adds."],
    ],
    answer: "A",
    explanation: t`For a quotient the percentage uncertainties add, and the power 2 on $T$ doubles its contribution: $0.5 + 2 \times 1.0 = 2.5\,\%$. The constant $4\pi^2$ contributes nothing.`,
    hints: ["Division still adds uncertainties.", "Multiply the percentage uncertainty in T by its power."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: t`A student calculates $g = 9.812\ \text{m s}^{-2}$ with an absolute uncertainty of $0.236\ \text{m s}^{-2}$. How should the result be quoted?`,
    options: [
      [t`$(9.8 \pm 0.2)\ \text{m s}^{-2}$`, "Correct: uncertainty to one significant figure and the value rounded to the same decimal place."],
      [t`$(9.812 \pm 0.2)\ \text{m s}^{-2}$`, "The value has more decimal places than the uncertainty justifies."],
      [t`$(9.8 \pm 0.236)\ \text{m s}^{-2}$`, "The uncertainty itself is only known roughly; give it to one significant figure."],
      [t`$(9.81 \pm 0.2)\ \text{m s}^{-2}$`, "The value's last digit must be in the same decimal place as the uncertainty's."],
    ],
    answer: "A",
    explanation: "Round the uncertainty to one significant figure (0.2), then round the value to the same decimal place (9.8).",
  });

  // Numerical and calculation items
  {
    const p = pctUnc(0.05, 4.5);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A voltmeter reading is $4.50 \pm 0.05\ \text{V}$. Calculate its percentage uncertainty, to two significant figures.`,
      value: p, sf: 2, unit: "%", wrong: [0.05 / 4.5, 4.5 / 0.05],
      explanation: t`$\dfrac{0.05}{4.50} \times 100 = ${sfStr(p, 2)}\,\%$.`,
    });
  }
  {
    const R = 6.0 / 0.5;
    const pR = pctUnc(0.1, 6.0) + pctUnc(0.01, 0.5);
    const dR = (pR / 100) * R;
    chk(R, 12);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The p.d. across a resistor is $6.0 \pm 0.1\ \text{V}$ and the current through it is $0.50 \pm 0.01\ \text{A}$. Calculate the absolute uncertainty in its resistance, in $\Omega$, to one significant figure.`,
      value: dR, sf: 1, unit: "Ω", wrong: [0.1 / 0.01, 0.1 + 0.01],
      explanation: t`1. $R = 6.0/0.50 = 12\ \Omega$.\n2. $\%\,\Delta V = \dfrac{0.1}{6.0} \times 100 = ${sfStr(pctUnc(0.1, 6), 2)}\,\%$; $\%\,\Delta I = \dfrac{0.01}{0.50} \times 100 = 2.0\,\%$.\n3. Quotient, so add: ${sfStr(pR, 2)} %.\n4. $\Delta R = ${sfStr(pR / 100, 2)} \times 12 = ${sfStr(dR, 2)} \approx ${sfStr(dR, 1)}\ \Omega$, so $R = 12.0 \pm 0.4\ \Omega$.\n\nAdding the absolute uncertainties (0.11) mixes volts and amperes, which is meaningless.`,
      hints: ["Convert each uncertainty to a percentage.", "For a quotient, add the percentages, then convert back."],
    });
  }
  {
    const dcm = 2.5;
    const h = 7.5;
    const p = fracUnc([[dcm, 0.02, 2], [h, 0.1, 1]]) * 100;
    const p1 = fracUnc([[dcm, 0.02, 1], [h, 0.1, 1]]) * 100;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A cylinder has diameter $2.50 \pm 0.02\ \text{cm}$ and height $7.5 \pm 0.1\ \text{cm}$. Its volume is $V = \tfrac{1}{4}\pi d^2 h$. Calculate the percentage uncertainty in $V$, to two significant figures.`,
      value: p, sf: 2, unit: "%", wrong: [p1],
      explanation: t`1. $\%\,\Delta d = \dfrac{0.02}{2.50} \times 100 = 0.8\,\%$, so $d^2$ contributes $1.6\,\%$.\n2. $\%\,\Delta h = \dfrac{0.1}{7.5} \times 100 = ${sfStr(pctUnc(0.1, h), 3)}\,\%$.\n3. $\%\,\Delta V = 1.6 + ${sfStr(pctUnc(0.1, h), 3)} = ${sfStr(p, 2)}\,\%$ (the $\tfrac{1}{4}\pi$ adds nothing).\n\nForgetting the square gives ${sfStr(p1, 2)} %.`,
      hints: ["The diameter is squared.", "Constants have no uncertainty."],
    });
  }
  {
    const reading = 2.47;
    const zero = 0.03;
    const trueD = reading - zero;
    b.num({
      d: 3, skill: "APPLICATION",
      stem: t`A micrometer reads $+0.03\ \text{mm}$ with its jaws closed. With a wire between the jaws it reads $2.47\ \text{mm}$. What is the diameter of the wire, in mm?`,
      value: trueD, dp: 2, unit: "mm", wrong: [reading + zero, reading],
      explanation: t`The zero error of $+0.03\ \text{mm}$ is added to every reading, so subtract it: $2.47 - 0.03 = ${dpStr(trueD, 2)}\ \text{mm}$. Adding it (2.50) corrects in the wrong direction.`,
      hints: ["A positive zero error makes every reading too large."],
    });
  }
  {
    const side = 2.0;
    const mass = 62.5;
    const rho = mass / side ** 3;
    const p = fracUnc([[mass, 0.1, 1], [side, 0.01, 3]]) * 100;
    const abs = (p / 100) * rho * 1000;
    console.log("errors cube", rho, p, abs);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A metal cube has sides of $2.00 \pm 0.01\ \text{cm}$ and a mass of $62.5 \pm 0.1\ \text{g}$. Its density is $${dpStr(rho * 1000, 0)}\ \text{kg m}^{-3}$. Calculate the absolute uncertainty in the density, in $\text{kg m}^{-3}$, to two significant figures.`,
      value: abs, sf: 2, unit: "kg/m³", wrong: [(fracUnc([[mass, 0.1, 1], [side, 0.01, 1]]) * rho * 1000)],
      explanation: t`1. $\%\,\Delta m = \dfrac{0.1}{62.5} \times 100 = 0.16\,\%$.\n2. $\%\,\Delta l = \dfrac{0.01}{2.00} \times 100 = 0.5\,\%$; $V = l^3$, so $1.5\,\%$.\n3. Total $= ${sfStr(p, 3)}\,\%$.\n4. $\Delta\rho = ${sfStr(p / 100, 3)} \times ${dpStr(rho * 1000, 0)} = ${sfStr(abs, 2)}\ \text{kg m}^{-3}$, so $\rho = (7.8 \pm 0.1) \times 10^{3}\ \text{kg m}^{-3}$.\n\nForgetting to cube the side gives about 52.`,
      hints: ["Volume = l³, so triple the percentage uncertainty in l.", "Convert the total percentage back to an absolute value."],
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Repeating readings and taking the mean reduces the effect of a systematic error.",
    answer: false,
    explanation: "False. A systematic error shifts every reading the same way, so it is still in the mean. Averaging reduces random error only.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: t`For $y = \dfrac{a}{b}$, the percentage uncertainty in $y$ is the percentage uncertainty in $a$ **plus** the percentage uncertainty in $b$.`,
    answer: true,
    explanation: "True. For products and quotients, percentage (or fractional) uncertainties add; they never subtract.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its description.",
    pairs: [
      ["precision", "how close repeated readings are to each other"],
      ["accuracy", "how close a result is to the true value"],
      ["systematic error", "shifts every reading the same way by the same amount"],
      ["random error", "scatters readings unpredictably about the true value"],
    ],
    explanation: "Precision (spread) and accuracy (closeness to the true value) are different properties; systematic errors damage accuracy, random errors damage precision.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the rules for combining uncertainties.",
    template: "For a sum or a difference, add the {{blank:a}} uncertainties. For a product or a quotient, add the {{blank:b}} uncertainties.",
    blanks: [
      { id: "a", accepted: ["absolute"], choices: ["absolute", "percentage"] },
      { id: "b", accepted: ["percentage"], choices: ["absolute", "percentage"] },
    ],
    explanation: "Absolute uncertainties share the unit of the quantities being added or subtracted; for products and quotients only fractional or percentage uncertainties can be added.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "An ammeter shows $0.02\\ \\text{A}$ before it is connected to any circuit. What name is given to this kind of error?",
    accepted: ["zero error", "a zero error", "zero offset"],
    wrong: ["random error", "parallax"],
    explanation: "A **zero error**: the instrument does not read zero when it should. It is systematic and is corrected by subtracting it from every reading.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Distinguish between the precision and the accuracy of a set of measurements.",
    points: [
      "Precision: how close the repeated measurements are to each other (small spread / small random uncertainty)",
      "Accuracy: how close the measurements (their mean) are to the true value",
    ],
    modelAnswer: "Precision describes how close repeated measurements are to one another: a precise set has a small spread. Accuracy describes how close the measured value (the mean) is to the true value.",
    explanation: "Precision is about spread; accuracy is about closeness to the truth. A set can be precise but inaccurate because of a systematic error.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: t`Theory predicts that a graph of $y$ against $x$ is a straight line through the origin. Tatenda's best-fit line is straight but cuts the $y$-axis at a small positive value. Explain what this shows about his measurements and how he could correct his results.`,
    points: [
      "The non-zero intercept indicates a systematic error (e.g. a zero error) in the y-readings",
      "Every y-value is too large by about the value of the intercept (the gradient is unaffected)",
      "Correct by finding the cause (check the instrument zero) and subtracting the intercept/zero error from each reading, or use the gradient, which is unaffected",
    ],
    modelAnswer: "A straight line that misses the origin shows a systematic error: every y-value has been shifted up by the same amount, roughly the intercept, for example by a zero error on the instrument. Random errors would scatter points about the line instead. He should check the instrument's zero and subtract the error from each reading; quantities found from the gradient are unaffected by a constant offset.",
    explanation: "Random errors scatter points about the line; a systematic offset moves the whole line.",
    hints: ["What does a constant shift in every y-value do to a graph?"],
  });

  // Practice structured 1: g from a ball dropped through light gates.
  {
    const h = 1.2;
    const ts = [0.497, 0.501, 0.493, 0.501];
    const tm = mean(ts);
    const dt = halfRange(ts);
    const pt = pctUnc(dt, tm);
    const ph = pctUnc(0.002, h);
    const g = (2 * h) / tm ** 2;
    const pg = ph + 2 * pt;
    const dg = (pg / 100) * g;
    console.log("errors g", tm, dt, pt, ph, g, pg, dg);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true, examStyle: true,
      stem: t`Chipo measures $g$ by releasing a steel ball from an electromagnet; it falls through a height $h = 1.200 \pm 0.002\ \text{m}$ to a trapdoor, and an electronic timer records the time of fall $t$. Four repeats give:\n\n${table([t`$t\,/\,\text{s}$`, "", "", ""], [ts.map((x) => dpStr(x, 3))])}\n\nShe uses $g = \dfrac{2h}{t^2}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the mean time, in s.", value: tm, dp: 3, unit: "s", explanation: t`$(0.497 + 0.501 + 0.493 + 0.501)/4 = ${dpStr(tm, 3)}\ \text{s}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the absolute uncertainty in the time as half the range, in s.", value: dt, dp: 3, unit: "s", wrong: [2 * dt], explanation: t`$(0.501 - 0.493)/2 = ${dpStr(dt, 3)}\ \text{s}$. The whole range (0.008 s) is twice too large.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the percentage uncertainty in the mean time, to two significant figures.", value: pt, sf: 2, unit: "%", explanation: t`$\dfrac{${dpStr(dt, 3)}}{${dpStr(tm, 3)}} \times 100 = ${sfStr(pt, 2)}\,\%$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the percentage uncertainty in $g$, to two significant figures.", value: pg, sf: 2, unit: "%", wrong: [ph + pt], explanation: t`$\%\,\Delta h = \dfrac{0.002}{1.200} \times 100 = ${sfStr(ph, 2)}\,\%$. $t$ is squared, so $\%\,\Delta g = ${sfStr(ph, 2)} + 2 \times ${sfStr(pt, 2)} = ${sfStr(pg, 2)}\,\%$.` }),
        P.num({ label: "(e)", marks: 1, stem: t`Calculate $g$ in $\text{m s}^{-2}$, to three significant figures.`, value: g, sf: 3, unit: "m/s²", wrong: [h / tm ** 2, (2 * h) / tm], explanation: t`$g = \dfrac{2 \times 1.200}{${dpStr(tm, 3)}^2} = ${sfStr(g, 3)}\ \text{m s}^{-2}$.` }),
        P.num({ label: "(f)", marks: 1, stem: t`Calculate the absolute uncertainty in $g$, in $\text{m s}^{-2}$, to one significant figure.`, value: dg, sf: 1, unit: "m/s²", explanation: t`$\Delta g = ${sfStr(pg / 100, 2)} \times ${sfStr(g, 3)} = ${sfStr(dg, 2)} \approx ${sfStr(dg, 1)}\ \text{m s}^{-2}$.` }),
        P.mcq({ label: "(g)", stem: "Which is the correct way for Chipo to state her result?", options: [[t`$(9.7 \pm 0.2)\ \text{m s}^{-2}$`, "Correct: the uncertainty to one significant figure, the value to the same decimal place."], [t`$(9.68 \pm 0.2)\ \text{m s}^{-2}$`, "The value has one decimal place too many for an uncertainty of 0.2."], [t`$(9.677 \pm 0.17)\ \text{m s}^{-2}$`, "Too many figures in both the value and the uncertainty."], [t`$(10 \pm 0.2)\ \text{m s}^{-2}$`, "The value has been rounded more coarsely than its uncertainty."]], answer: "A", explanation: "Uncertainty to one significant figure (0.2); value rounded to the same decimal place (9.7)." }),
        P.manual({ label: "(h)", marks: 2, stem: "When the current to the electromagnet is switched off, the ball is released a short time after the timer starts, because the magnetism takes time to decay. Explain the effect of this on the value of $g$.", points: ["Each measured time is too long by the same delay: a systematic error", t`Since $g = 2h/t^2$, a larger $t$ gives a value of $g$ that is too small (repeating does not remove it)`], modelAnswer: t`The timer starts before the ball actually falls, so every time is too long by the same delay. This is a systematic error, which averaging cannot remove. Because $g = 2h/t^2$, the times being too large makes the calculated $g$ too small.` }),
        P.manual({ label: "(i)", marks: 2, stem: "Suggest how the experiment could be changed to remove the effect of this delay.", points: [t`Measure $t$ for several different heights and plot $\sqrt{h}$ against $t$ (or time the ball between two light gates placed below the release point)`, t`$\sqrt{h} = \sqrt{g/2}\,(t - \delta)$: the delay $\delta$ only shifts the line (intercept on the $t$-axis), and $g = 2 \times \text{gradient}^2$ is unaffected; with two gates the timing starts after release`], modelAnswer: t`Measure the time for several heights and plot $\sqrt{h}$ against $t$. Since $\sqrt{h} = \sqrt{g/2}\,(t - \delta)$, a constant delay $\delta$ appears as an intercept on the $t$-axis, while $g = 2 \times (\text{gradient})^2$ is unaffected. Alternatively, time the ball between two light gates placed below the release point, so the timing does not start until the ball is already moving.` }),
      ],
      explanation: t`Mean $t = ${dpStr(tm, 3)}\ \text{s}$ $\pm ${dpStr(dt, 3)}\ \text{s}$ (${sfStr(pt, 2)} %), so $g = ${sfStr(g, 3)}\ \text{m s}^{-2}$ with ${sfStr(pg, 2)} % uncertainty: $(9.7 \pm 0.2)\ \text{m s}^{-2}$. The release delay is a systematic error making $g$ too small.`,
      hints: ["Half the range gives Δt.", "t is squared in the formula.", "Does a delay make t too large or too small?"],
    });
  }

  // Practice structured 2: precision and accuracy of two sets of readings.
  {
    const A = [10.6, 10.5, 10.6, 10.7];
    const B = [9.7, 10.4, 9.9, 10.3];
    const mA = mean(A);
    const mB = mean(B);
    const pdA = ((mA - 10.0) / 10.0) * 100;
    console.log("errors AB", mA, mB, pdA);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true, examStyle: true,
      stem: t`Two students measure the resistance of the same standard resistor, whose true value is $10.0\ \Omega$, using different meters.\n\n${table(["Student", t`$R\,/\,\Omega$`, "", "", ""], [["Farai", ...A.map((x) => dpStr(x, 1))], ["Rudo", ...B.map((x) => dpStr(x, 1))]])}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the mean of Farai's readings, in $\Omega$.`, value: mA, dp: 1, unit: "Ω", explanation: t`$(10.6 + 10.5 + 10.6 + 10.7)/4 = ${dpStr(mA, 1)}\ \Omega$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Calculate the mean of Rudo's readings, in $\Omega$, to one decimal place.`, value: mB, dp: 1, unit: "Ω", explanation: t`$(9.7 + 10.4 + 9.9 + 10.3)/4 = ${mB} \approx ${dpStr(mB, 1)}\ \Omega$.` }),
        P.mcq({ label: "(c)", stem: "Which statement about the two sets is correct?", options: [["Farai's readings are more precise; Rudo's are more accurate.", "Correct: Farai's spread is 0.2 Ω but his mean is 0.6 Ω high; Rudo's spread is 0.7 Ω but his mean is close to 10.0 Ω."], ["Farai's readings are more precise and more accurate.", "Farai's mean is 0.6 Ω above the true value, so his set is less accurate."], ["Rudo's readings are more precise; Farai's are more accurate.", "Rudo's readings are spread over 0.7 Ω, so they are less precise."], ["Both sets are equally precise and equally accurate.", "The spreads (0.2 Ω and 0.7 Ω) and the means differ."]], answer: "A", explanation: "Precision compares spreads (0.2 Ω against 0.7 Ω); accuracy compares the means with 10.0 Ω (10.6 against 10.1)." }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the percentage by which Farai's mean differs from the true value.", value: pdA, sf: 2, unit: "%", explanation: t`$\dfrac{${dpStr(mA, 1)} - 10.0}{10.0} \times 100 = ${sfStr(pdA, 2)}\,\%$.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Suggest the type and a likely cause of the error in Farai's readings, and how he could check for it.", points: ["Systematic error (all readings shifted up by a similar amount)", "Likely cause: a zero error or calibration error in his meter (or resistance of the leads/contacts added to each reading)", "Check: read the meter with the probes shorted together (or measure a known standard) and subtract the offset"], modelAnswer: "All of Farai's readings are about 0.6 Ω too high with little scatter, so the error is systematic. It is probably a zero error or calibration fault in his meter, or the resistance of his leads. He could touch the probes together to see whether the meter reads zero, and subtract any reading obtained, or check the meter against a known standard resistor." }),
      ],
      explanation: t`Farai: mean $${dpStr(mA, 1)}\ \Omega$, small spread, ${sfStr(pdA, 2)} % high (precise, not accurate: systematic error). Rudo: mean $${dpStr(mB, 1)}\ \Omega$, large spread (accurate, less precise).`,
      hints: ["Compare the spreads for precision.", "Compare the means with 10.0 Ω for accuracy."],
    });
  }

  // Flashcards
  b.card("DEFINITION", "Systematic error", "An error that shifts every reading the same way by the same amount or fraction (e.g. a zero error); not reduced by averaging.");
  b.card("DEFINITION", "Random error", "An error that scatters readings unpredictably about the true value; reduced by repeating and averaging or by a graph.");
  b.card("DEFINITION", "Precision", "How close repeated measurements are to one another.");
  b.card("DEFINITION", "Accuracy", "How close a measurement (or the mean) is to the true value.");
  b.card("FORMULA", "Uncertainty in a sum or difference", t`$\Delta(a \pm b) = \Delta a + \Delta b$ (absolute uncertainties add)`);
  b.card("FORMULA", "Uncertainty in a product or quotient", t`$\dfrac{\Delta y}{y} = \dfrac{\Delta a}{a} + \dfrac{\Delta b}{b}$ (fractional or percentage uncertainties add)`);
  b.card("FORMULA", "Uncertainty in a power", t`$y = a^n$: $\dfrac{\Delta y}{y} = |n|\dfrac{\Delta a}{a}$`);
  b.card("FACT", "How is a final result quoted?", "Uncertainty to one significant figure; the value rounded to the same decimal place, e.g. (9.8 ± 0.2) m s⁻².");
  b.card("CONCEPT", "How does a systematic error show on a graph expected to pass through the origin?", "As a non-zero intercept: the line is shifted, but its gradient is unaffected.");
  b.card("FACT", "Zero error correction", "Subtract a positive zero error from every reading (add a negative one).");
  void DATA;
});
