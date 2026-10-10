// W1a: skills.tables-graphs — recording results, tables and graphs.
import { concept, P, t as raw, chk, sfStr, dpStr, table, linFit, gradient, interceptThrough, pctUnc, DATA } from "../lib.mjs";

// String.raw keeps "\n" literally: turn \n (not followed by a lower-case letter, so \nu and \neq survive) into a newline.
const t = (s, ...v) => raw(s, ...v).replace(/\\n(?![a-z])/g, "\n");

const K = "aphys.skills.tables-graphs";

concept(K, { file: "skills/tables-graphs", keyPrefix: "skills.tables-graphs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A student records currents measured in milliamperes. Which column heading follows the convention used in A-Level practical papers?",
    options: [
      [t`$I\,/\,\text{mA}$`, "Correct: quantity, solidus, unit. Each number in the column is then the current divided by 1 mA."],
      ["Current", "There is no unit, so the numbers in the column have no meaning; this heading loses the mark."],
      [t`$\text{mA}\,/\,I$`, "This is upside down: it would mean each entry is 1 mA divided by the current."],
      [t`$I \times \text{mA}$`, "Multiplying the quantity by the unit is not a convention; the entries would not be pure numbers."],
    ],
    answer: "A",
    explanation: t`A heading is written quantity / unit, such as $I\,/\,\text{mA}$ or $T^2\,/\,\text{s}^2$, and the unit is then left out of every row. Cambridge also accepts $I\ (\text{mA})$.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Three lengths are measured with a metre rule graduated in millimetres. Which column of readings, headed $l\\,/\\,\\text{m}$, is recorded correctly?",
    options: [
      ["0.452, 0.460, 0.500", "Correct: every reading is to the nearest millimetre (three decimal places of a metre), including the trailing zeros."],
      ["0.452, 0.46, 0.5", "The trailing zeros are dropped, so the readings appear less precise than the rule allows; raw data must share one precision."],
      ["0.4520, 0.4600, 0.5000", "Four decimal places of a metre claims a precision of 0.1 mm, which a millimetre rule cannot give."],
      ["45.2, 46.0, 50.0", "These numbers are in centimetres, but the heading says metres."],
    ],
    answer: "A",
    explanation: "Raw readings from one instrument are all recorded to the resolution of that instrument: a millimetre scale read in metres gives three decimal places, so 0.460 and 0.500, not 0.46 and 0.5.",
  });
  {
    const l = 0.8;
    const T = 1.79;
    const g = (4 * Math.PI ** 2 * l) / T ** 2;
    chk(Number(sfStr(g, 3)), 9.86);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A pendulum of length $l = 0.800\ \text{m}$ has a period $T = 1.79\ \text{s}$. A student calculates $g = 4\pi^2 l/T^2$. Which value of $g$, in $\text{m s}^{-2}$, is given to an acceptable number of significant figures?`,
      options: [
        [sfStr(g, 3), "Correct: both data values have three significant figures, so three (or four) significant figures are appropriate."],
        [g.toFixed(4), "Six significant figures claims far more precision than the data support."],
        [sfStr(g, 2), "Two significant figures is fewer than the least precise data value (three), so information is thrown away."],
        ["10", "One significant figure discards almost all the information in the readings."],
      ],
      answer: "A",
      explanation: t`$g = 4\pi^2 \times 0.800 / 1.79^2 = ${sfStr(g, 3)}\ \text{m s}^{-2}$. A calculated value has the same number of significant figures as the least precise data used, or one more: here 3 or 4.`,
    });
  }
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`A trolley accelerates uniformly from speed $u$. Its speed $v$ is measured after it has travelled different distances $s$, and $v^2 = u^2 + 2as$. Which graph gives a straight line, and what is its gradient?`,
    options: [
      [t`$v^2$ against $s$; gradient $2a$`, "Correct: compare with y = mx + c: y = v², x = s, m = 2a and c = u²."],
      [t`$v$ against $s$; gradient $2a$`, "v is not proportional to s; only v² is linear in s."],
      [t`$v^2$ against $s$; gradient $a$`, "The coefficient of s is 2a, so the gradient is 2a, not a."],
      [t`$v^2$ against $s$; gradient $u^2$`, "u² is the constant term, so it is the intercept on the v² axis, not the gradient."],
    ],
    answer: "A",
    explanation: t`Match $v^2 = 2a\,s + u^2$ with $y = mx + c$: plot $v^2$ on the $y$-axis and $s$ on the $x$-axis; gradient $= 2a$, intercept $= u^2$.`,
    hints: ["Write the equation in the form y = mx + c.", "Whatever multiplies the x-quantity is the gradient."],
  });
  {
    const p1 = [2.0, 5.6];
    const p2 = [8.0, 9.2];
    const m = gradient(p1, p2);
    const c = interceptThrough(m, p1);
    chk(m, 0.6, 1e-12);
    chk(c, 4.4, 1e-12);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: "A best-fit line passes through the points (2.0, 5.6) and (8.0, 9.2). The $x$-axis of the grid starts at $x = 2.0$. What is the $y$-intercept of the line?",
      options: [
        [dpStr(c, 1), "Correct: gradient = (9.2 − 5.6)/(8.0 − 2.0) = 0.60, then c = y − mx = 5.6 − 0.60 × 2.0 = 4.4."],
        ["5.6", "5.6 is where the line meets the left edge of the grid, at x = 2.0, not at x = 0: a false origin."],
        [dpStr(5.6 - 2.0 / m, 1), "This divides x by the gradient instead of multiplying: c = y − mx."],
        [dpStr(5.6 + m * 2.0, 1), "The term mx must be subtracted from y, not added."],
      ],
      answer: "A",
      explanation: t`With a false origin the intercept is calculated: $m = \dfrac{9.2 - 5.6}{8.0 - 2.0} = 0.60$ and $c = y - mx = 5.6 - 0.60 \times 2.0 = ${dpStr(c, 1)}$.`,
      hints: ["The axis does not start at zero, so the intercept cannot be read off.", "Find the gradient first, then use c = y − mx with one point."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about a straight best-fit line through experimental points is correct?",
    options: [
      ["The points are balanced on either side of it along its whole length.", "Correct: a best-fit line follows the trend, with scatter shared above and below."],
      ["It must pass through the origin because the theory predicts proportionality.", "The line is drawn from the data; whether it passes through the origin is a result, not a rule."],
      ["It must pass through the first and the last plotted points.", "End points are no more reliable than the others; forcing the line through them can bias the gradient."],
      ["It joins each point to the next with a ruled segment.", "Joining the dots copies the random scatter; a best-fit line averages it out."],
    ],
    answer: "A",
    explanation: "A best-fit line is one thin line with roughly equal scatter of points above and below it, all along its length. It is not forced through the origin or through particular points; an anomalous point is circled and ignored.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`A graph has $T^2\,/\,\text{s}^2$ on the $y$-axis and $m\,/\,\text{kg}$ on the $x$-axis. What is the unit of its gradient?`,
    options: [
      [t`$\text{s}^2\ \text{kg}^{-1}$`, "Correct: gradient = Δy/Δx, so its unit is s² divided by kg."],
      [t`$\text{kg s}^{-2}$`, "This is the unit of Δx/Δy, the inverse of the gradient."],
      [t`$\text{s kg}^{-1}$`, "The y-quantity is T², so the unit of y is s², not s."],
      ["no unit", "A gradient has the unit of y divided by the unit of x unless they cancel; here they do not."],
    ],
    answer: "A",
    explanation: t`The unit of a gradient is (unit of $y$)/(unit of $x$) $= \text{s}^2/\text{kg} = \text{s}^2\ \text{kg}^{-1}$. Its inverse, $\text{kg s}^{-2}$, is the same as $\text{N m}^{-1}$, the unit of a spring constant.`,
    hints: ["Gradient = Δy / Δx.", "Carry the units of each axis into the division."],
  });

  // Numerical and calculation items
  {
    const pA = [0.05, 0.68];
    const pB = [0.45, 5.48];
    const R = gradient(pA, pB);
    chk(R, 12, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`A graph of p.d. $V\,/\,\text{V}$ (vertical) against current $I\,/\,\text{A}$ (horizontal) for a resistor is a straight line through $(0.050,\ 0.68)$ and $(0.450,\ 5.48)$. Calculate the gradient, which is the resistance, in $\Omega$.`,
      value: R, unit: "Ω", wrong: [1 / R, 5.48 / 0.45],
      explanation: t`Gradient $= \dfrac{5.48 - 0.68}{0.450 - 0.050} = \dfrac{4.80}{0.400} = 12\ \Omega$. Using $\Delta I/\Delta V$ gives the inverse (0.0833); using one point only ($5.48/0.450 = 12.2$) is wrong unless the line passes exactly through the origin.`,
    });
  }
  {
    const pA = [2.0, 0.164];
    const pB = [10.0, 0.244];
    const m = gradient(pA, pB);
    const k = 1 / m;
    const L0 = interceptThrough(m, pA);
    chk(k, 100, 1e-6);
    chk(L0, 0.144, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Tatenda plots the length $L$ of a spring (vertical, in m) against the load $F$ (horizontal, in N). Theory: $L = L_0 + F/k$. Her best-fit line passes through $(2.0\ \text{N},\ 0.164\ \text{m})$ and $(10.0\ \text{N},\ 0.244\ \text{m})$. Calculate the spring constant $k$ in $\text{N m}^{-1}$.`,
      value: k, unit: "N/m", wrong: [m, 10.0 / 0.244],
      explanation: t`1. Gradient $= \dfrac{0.244 - 0.164}{10.0 - 2.0} = \dfrac{0.080}{8.0} = 0.0100\ \text{m N}^{-1}$.\n2. Comparing $L = \dfrac{1}{k}F + L_0$ with $y = mx + c$: gradient $= 1/k$.\n3. $k = \dfrac{1}{0.0100} = 100\ \text{N m}^{-1}$.\n\nGiving the gradient itself (0.0100) forgets that it is $1/k$; $10.0/0.244$ uses the total length instead of the change in length.`,
      hints: ["Find the gradient from the two points.", "In L = L₀ + F/k, the gradient is 1/k."],
    });
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`For the same line, the $F$-axis of Tatenda's grid starts at $2.0\ \text{N}$. Calculate the natural length $L_0$ of the spring, the intercept at $F = 0$, in m.`,
      value: L0, unit: "m", wrong: [0.164, 0.164 + m * 2.0],
      explanation: t`1. Gradient $m = 0.0100\ \text{m N}^{-1}$.\n2. $L_0 = c = y - mx = 0.164 - 0.0100 \times 2.0 = 0.144\ \text{m}$.\n\n$0.164\ \text{m}$ is the value at the edge of the grid ($F = 2.0\ \text{N}$), a false-origin trap.`,
      hints: ["The axis starts at 2.0 N, so the intercept cannot be read off.", "Use c = y − mx with one point on the line."],
    });
  }
  {
    const t20 = 28.4;
    const T = t20 / 20;
    const T2 = T * T;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`The time for 20 oscillations of a pendulum is $28.4\ \text{s}$. Calculate $T^2$ for the table, in $\text{s}^2$, to three significant figures.`,
      value: T2, sf: 3, wrong: [T, t20 * t20],
      explanation: t`$T = 28.4/20 = ${sfStr(T, 3)}\ \text{s}$ and $T^2 = ${sfStr(T, 3)}^2 = ${sfStr(T2, 3)}\ \text{s}^2$ (three significant figures, like the raw time). Writing $T$ itself or squaring the time for 20 oscillations are the common slips.`,
    });
  }
  {
    const tTotal = 16.4;
    const pct = pctUnc(0.2, tTotal);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Farai times 20 oscillations of a mass on a spring and records $16.4\ \text{s}$. He estimates the uncertainty of each timing (mainly reaction time) as $\pm 0.2\ \text{s}$. Calculate the percentage uncertainty in the period, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(0.2, tTotal / 20), pctUnc(0.2 / 20, tTotal / 20) * 20],
      explanation: t`The period $T = 16.4/20 = 0.82\ \text{s}$ has uncertainty $0.2/20 = 0.01\ \text{s}$, so the percentage uncertainty is $\dfrac{0.2}{16.4} \times 100 = ${sfStr(pct, 2)}\,\%$ either way. Dividing $0.2\ \text{s}$ by one period ($0.82\ \text{s}$) gives 24 %, the value for timing a single oscillation, which is why many oscillations are timed.`,
      hints: ["The same absolute uncertainty is shared over 20 oscillations.", "Percentage uncertainty = (absolute uncertainty / value) × 100."],
    });
  }
  {
    // E.m.f. from 1/I against R
    const grad = 0.658; // A^-1 Ω^-1, i.e. V^-1
    const E = 1 / grad;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A cell of e.m.f. $E$ and internal resistance $r$ drives a current $I$ through a variable resistor $R$, so that $\dfrac{1}{I} = \dfrac{1}{E}R + \dfrac{r}{E}$. Rudo plots $\dfrac{1}{I}\,/\,\text{A}^{-1}$ against $R\,/\,\Omega$ and finds a gradient of $0.658\ \text{A}^{-1}\ \Omega^{-1}$. Calculate $E$ in V, to three significant figures.`,
      value: E, sf: 3, unit: "V", wrong: [grad],
      explanation: t`1. Compare with $y = mx + c$: $y = 1/I$, $x = R$, gradient $m = 1/E$.\n2. $E = \dfrac{1}{0.658} = ${sfStr(E, 3)}\ \text{V}$.\n3. Unit check: $\text{A}^{-1}\ \Omega^{-1} = (\text{A}\ \Omega)^{-1} = \text{V}^{-1}$, so $1/\text{gradient}$ is in volts.\n\nQuoting the gradient itself (0.658) forgets that it is $1/E$.`,
      hints: ["Match the equation to y = mx + c term by term.", "The gradient is 1/E."],
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: t`On a grid whose horizontal axis starts at $\theta = 20\ ^\circ\text{C}$, the value where the line meets the left-hand edge of the grid is the $y$-intercept.`,
    answer: false,
    explanation: t`False. The $y$-intercept is the value of $y$ at $x = 0$. With a false origin the edge of the grid is at $\theta = 20\ ^\circ\text{C}$, so the intercept must be calculated from $c = y - mx$.`,
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Each equation is tested by a straight-line graph. Match each equation with the graph to plot ($u$, $a$, $g$, $k$, $l$ are constants unless plotted).",
    pairs: [
      [t`$v = u + at$`, t`$v$ against $t$`],
      [t`$s = \tfrac{1}{2}at^2$ (from rest)`, t`$s$ against $t^2$`],
      [t`$T = 2\pi\sqrt{l/g}$`, t`$T^2$ against $l$`],
      [t`$v^2 = u^2 + 2as$`, t`$v^2$ against $s$`],
    ],
    explanation: t`In each case the plotted quantities are the variables and the constants end up in the gradient: $a$; $\tfrac{1}{2}a$; $4\pi^2/g$; $2a$ (with intercept $u$ for the first and $u^2$ for the last).`,
    hints: ["Square both sides of the pendulum equation."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the rule for finding a gradient.",
    template: "Use a triangle whose hypotenuse is at least {{blank:a}} the length of the line, with vertices read from the {{blank:b}}, not from the results table.",
    blanks: [
      { id: "a", accepted: ["half"], choices: ["half", "a tenth of", "twice"] },
      { id: "b", accepted: ["best-fit line"], choices: ["best-fit line", "first data point", "origin"] },
    ],
    explanation: "A large triangle (more than half the line) keeps the reading uncertainty small compared with Δx and Δy, and its corners are points on the drawn line.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the starting point of a graph axis that is not zero, used to spread the plotted points over the grid?",
    accepted: ["false origin", "a false origin", "offset origin"],
    wrong: ["origin", "intercept"],
    explanation: "A **false origin** lets the points fill the grid. The intercept must then be calculated from the gradient and a point on the line.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why, when measuring the period of a pendulum with a hand-held stop-watch, a student times 20 oscillations rather than one.",
    points: [
      "The main uncertainty is reaction time in starting and stopping the watch (about 0.2–0.3 s), which is roughly the same however many oscillations are timed",
      "Over 20 oscillations this uncertainty is shared out, so the uncertainty in one period is 20 times smaller",
      "The percentage uncertainty in T is therefore much smaller (the total time is much larger than the reaction-time error)",
    ],
    modelAnswer: "Starting and stopping the stop-watch by hand introduces an uncertainty of about 0.2–0.3 s due to reaction time, and this is about the same for 1 or 20 oscillations. Dividing the total time by 20 divides this uncertainty by 20 as well, so the percentage uncertainty in the period is much smaller than if a single oscillation (under 2 s) were timed.",
    explanation: "Reaction-time uncertainty is fixed per timing, so timing many oscillations makes it a much smaller fraction of the measured time and of the period.",
    hints: ["Which source of uncertainty does not depend on how long you time for?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "A student is asked to plot a graph of $T^2$ against $m$ from six readings. Describe four features that a well-plotted graph should have (axes, scales, points and line).",
    points: [
      "Axes labelled with quantity and unit, T² / s² on the vertical axis and m / kg on the horizontal",
      "Sensible scales (1, 2 or 5 units per large square, not 3) with the points occupying at least half the grid in each direction",
      "All six points plotted accurately (to half a small square) as small crosses or dots in circles",
      "A single thin ruled best-fit line with points balanced either side (not joined dot to dot; anomalies circled)",
    ],
    modelAnswer: "Label the vertical axis T² / s² and the horizontal axis m / kg. Choose simple scales (such as 0.1 kg per 2 cm) so the points fill more than half the grid both ways. Plot each of the six points accurately as a small cross. Draw one thin straight best-fit line with the points balanced above and below it.",
    explanation: "Examiners award separate marks for labelled axes, sensible scales, accurate plotting and a single best-fit line.",
    hints: ["Think of the four things an examiner ticks: axes, scales, plotting, line."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: t`The period of a mass $m$ on a spring of spring constant $k$ is $T = 2\pi\sqrt{\dfrac{m}{k}}$. Show that a graph of $T^2$ against $m$ is a straight line through the origin, and state an expression for its gradient.`,
    points: [
      t`Square both sides: $T^2 = 4\pi^2 \dfrac{m}{k}$`,
      t`Write as $T^2 = \left(\dfrac{4\pi^2}{k}\right)m + 0$ and compare with $y = mx + c$: $y = T^2$, $x = m$, $c = 0$ so the line passes through the origin`,
      t`Gradient $= \dfrac{4\pi^2}{k}$ (a constant, so the graph is straight)`,
    ],
    modelAnswer: t`Squaring gives $T^2 = \dfrac{4\pi^2}{k}m$. This has the form $y = mx + c$ with $y = T^2$, $x = m$ and $c = 0$. Since $4\pi^2/k$ is constant, the graph is a straight line through the origin with gradient $4\pi^2/k$.`,
    explanation: "A 'show that' needs each step: square, rearrange into y = mx + c, identify the intercept as zero and the gradient as 4π²/k.",
    hints: ["Get rid of the square root first.", "Compare with y = mx + c and identify c."],
  });

  // Practice structured: ball rolling off a bench (projectile range against launch speed).
  {
    const card = 0.05; // m
    const tms = [62.5, 45.5, 35.7, 29.4, 25.0, 21.7];
    const v = tms.map((x) => card / (x / 1000));
    const R = [0.346, 0.468, 0.603, 0.725, 0.861, 0.982];
    const vR = v.map((x) => Number(sfStr(x, 3)));
    const fit = linFit(vR, R);
    const h = (DATA.g * fit.m ** 2) / 2;
    console.log("tables-graphs struct: grad", fit.m, "c", fit.c, "h", h);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true, examStyle: true,
      stem: t`Sipho rolls a ball bearing along a horizontal bench top. It passes through a light gate (a card of width $0.0500\ \text{m}$ on a cradle interrupts the beam) and then leaves the edge of the bench, landing a horizontal distance $R$ from the edge. He changes the launch speed $v$ by releasing the ball from different points on a short ramp.\n\nTheory: $R = v\sqrt{\dfrac{2h}{g}}$, where $h$ is the height of the bench.\n\n${table([t`$t\,/\,\text{ms}$`, t`$v\,/\,\text{m s}^{-1}$`, t`$R\,/\,\text{m}$`], tms.map((x, i) => [dpStr(x, 1), i === 0 ? "?" : sfStr(v[i], 3), dpStr(R[i], 3)]))}\n\n$t$ is the time for which the card blocks the light gate.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the missing value of $v$ (first row), in $\text{m s}^{-1}$.`, value: v[0], unit: "m/s", wrong: [card / tms[0]], explanation: t`$v = \dfrac{0.0500\ \text{m}}{62.5 \times 10^{-3}\ \text{s}} = ${sfStr(v[0], 3)}\ \text{m s}^{-1}$. Forgetting to convert milliseconds gives 0.000800.` }),
        P.manual({ label: "(b)", marks: 2, stem: t`Explain why a graph of $R$ against $v$ should be a straight line through the origin, and state what its gradient represents.`, points: [t`$R = \left(\sqrt{2h/g}\right) v$ has the form $y = mx$ with $c = 0$, and $\sqrt{2h/g}$ is constant for a fixed bench height`, t`Gradient $= \sqrt{2h/g}$, which is the time of flight of the ball`], modelAnswer: t`Comparing $R = \sqrt{2h/g}\,v$ with $y = mx + c$ gives $c = 0$ and a constant gradient $\sqrt{2h/g}$, so the line is straight through the origin. The gradient $\sqrt{2h/g}$ is the time the ball takes to fall the height $h$ (its time of flight).` }),
        P.num({ label: "(c)", marks: 2, stem: t`Sipho plots the graph and draws the best-fit line. Determine its gradient, in s, to three significant figures.`, value: fit.m, tol: 0.01, unit: "s", wrong: [1 / fit.m], explanation: t`Using two points on the line far apart, for example near $v = 0.90$ and $v = 2.20\ \text{m s}^{-1}$, the gradient is about $${sfStr(fit.m, 3)}\ \text{s}$ (any value from a good line within about $\pm 0.01\ \text{s}$ is accepted). $\Delta v/\Delta R$ is the inverse (about $${sfStr(1 / fit.m, 3)}\ \text{s}^{-1}$).` }),
        P.num({ label: "(d)", marks: 2, stem: t`Use your gradient to determine the height $h$ of the bench, in m. Take $g = 9.81\ \text{m s}^{-2}$.`, value: h, tol: 0.03, unit: "m", wrong: [fit.m * fit.m * DATA.g, (DATA.g * fit.m) / 2], explanation: t`gradient $= \sqrt{2h/g}$, so $h = \dfrac{g \times \text{gradient}^2}{2} = \dfrac{9.81 \times ${sfStr(fit.m, 3)}^2}{2} = ${sfStr(h, 3)}\ \text{m}$. Forgetting the factor 2 gives twice this; forgetting to square the gradient gives about 2.1 m.` }),
        P.mcq({ label: "(e)", stem: t`Sipho's value of $h$ is calculated from the gradient (three significant figures) and $g$. To how many significant figures should he quote $h$?`, options: [["three", "Correct: the same as the least precise data (the R and v values have three), or at most one more."], ["one", "One significant figure throws away most of the information in the data."], ["five", "Five significant figures claims more precision than the readings support."], ["as many as the calculator shows", "Calculator digits beyond the precision of the data are meaningless."]], answer: "A", explanation: "Calculated values are given to the same number of significant figures as the least precise data (or one more): three here." }),
        P.manual({ label: "(f)", marks: 2, stem: t`Sipho's line does not pass exactly through the origin: it has a small positive intercept on the $R$ axis. Suggest a cause and how it would show in his measurements.`, points: ["A systematic error, for example R measured from a point behind the bench edge (or a zero error on the rule), adds the same length to every R", "So every R is too large by a constant amount: the line is shifted up but its gradient is unchanged"], modelAnswer: "A systematic error such as measuring R from a mark slightly behind the edge of the bench (or a zero error on the rule) adds the same amount to every value of R. The whole line is shifted upwards by that amount, giving a positive intercept, but the gradient (and hence h) is not affected." }),
        P.manual({ label: "(g)", marks: 2, stem: "Suggest one improvement to the way the landing position is found, and explain why it helps.", points: ["Land the ball on carbon paper over white paper (or a tray of sand) to mark the exact landing point", "Removes the need to judge the landing point by eye, reducing the uncertainty in R (repeat each launch and average)"], modelAnswer: "Place carbon paper on white paper on the floor so that the ball leaves a mark where it lands. The landing point is then recorded exactly rather than judged by eye as the ball bounces, which reduces the uncertainty in R; repeating each launch and taking a mean reduces it further." }),
      ],
      explanation: t`$v = 0.0500/t$; a graph of $R$ against $v$ is straight through the origin with gradient $\sqrt{2h/g}$ (the time of flight, about $${sfStr(fit.m, 3)}\ \text{s}$), so $h = g \times \text{gradient}^2/2 \approx ${sfStr(h, 2)}\ \text{m}$.`,
      hints: ["Convert ms to s before dividing.", "Compare R = v√(2h/g) with y = mx + c.", "Square the gradient, multiply by g and halve it."],
    });
  }

  // Practice structured: critiquing a results table.
  {
    const d = [0.1, 0.2, 0.3, 0.4, 0.5];
    const tt = [0.143, 0.202, 0.247, 0.286, 0.319];
    const t2 = tt.map((x) => x * x);
    const fit = linFit(t2, d);
    const g = 2 * fit.m;
    console.log("table critique: grad", fit.m, "g", g);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Thandeka drops a steel ball from rest through a distance $d$ between an electromagnet and a trapdoor switch; an electronic timer records the time of fall $t$. Her results table is shown.\n\n| distance | time | $t^2$ |\n| --- | --- | --- |\n| 0.1 m | 0.143 s | 0.020449 |\n| 0.20 m | 0.202 s | 0.040804 |\n| 0.3 m | 0.247 s | 0.061009 |\n| 0.40 m | 0.286 s | 0.081796 |\n| 0.5 m | 0.319 s | 0.101761 |`,
      parts: [
        P.manual({ label: "(a)", marks: 4, stem: "State four ways in which the table or the readings do not follow the conventions for recording results.", points: ["Headings have no quantity/unit form (should be d / m, t / s, t² / s²); units are written in the rows instead", "Raw distances are not all to the same precision (0.1 and 0.20); all should be 0.100 m etc.", t`The $t^2$ values have too many significant figures (six instead of three or four) and no unit`, "There are no repeat readings of t (each time should be measured at least twice and the mean recorded)"], modelAnswer: t`The headings should be $d\,/\,\text{m}$, $t\,/\,\text{s}$ and $t^2\,/\,\text{s}^2$, with no units in the body. The distances are recorded inconsistently (0.1 m and 0.20 m) and should all be to the precision of the rule, e.g. 0.100 m. The $t^2$ column has six significant figures and no unit; it should be three (or four) significant figures, e.g. 0.0204. There are no repeat readings: each time should be repeated and the mean recorded.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Calculate $t^2$ for $d = 0.4$ m to the correct number of significant figures, in $\text{s}^2$.`, value: t2[3], sf: 3, explanation: t`$0.286^2 = 0.0818\ \text{s}^2$ (three significant figures, like $t$).` }),
        P.mcq({ label: "(c)", stem: t`Theory: $d = \tfrac{1}{2}g t^2$. Which graph should Thandeka plot to find $g$ from the gradient?`, options: [[t`$d$ against $t^2$; gradient $= g/2$`, "Correct: y = d, x = t², m = g/2, c = 0."], [t`$d$ against $t$; gradient $= g/2$`, "d is not proportional to t; the graph would curve."], [t`$t^2$ against $d$; gradient $= g/2$`, "This graph is straight, but its gradient is 2/g, not g/2."], [t`$d$ against $t^2$; gradient $= 2g$`, "The coefficient of t² is ½g."]], answer: "A", explanation: t`$d = (\tfrac{1}{2}g)\,t^2$ matches $y = mx$ with $y = d$ and $x = t^2$, so gradient $= g/2$ and $g = 2 \times$ gradient.` }),
        P.num({ label: "(d)", marks: 2, stem: t`The best-fit line of $d$ against $t^2$ has a gradient of $${sfStr(fit.m, 3)}\ \text{m s}^{-2}$. Calculate $g$, in $\text{m s}^{-2}$.`, value: 2 * Number(sfStr(fit.m, 3)), sf: 3, unit: "m/s²", wrong: [Number(sfStr(fit.m, 3)), Number(sfStr(fit.m, 3)) / 2], explanation: t`$g = 2 \times \text{gradient} = 2 \times ${sfStr(fit.m, 3)} = ${sfStr(2 * Number(sfStr(fit.m, 3)), 3)}\ \text{m s}^{-2}$. Quoting the gradient itself forgets the factor $\tfrac{1}{2}$.` }),
      ],
      explanation: t`Headings must be quantity / unit, raw data consistent in precision, calculated values to sensible significant figures. Plotting $d$ against $t^2$ gives gradient $g/2$, so $g = 2 \times ${sfStr(fit.m, 3)} \approx ${sfStr(g, 3)}\ \text{m s}^{-2}$.`,
      hints: ["Look at the headings, the precision of each column and the number of figures.", "d = ½gt² has the form y = mx."],
    });
  }

  // Flashcards
  b.card("FACT", "How is a column heading written in a results table?", t`Quantity / unit, e.g. $l\,/\,\text{m}$ or $T^2\,/\,\text{s}^2$; units do not appear in the body of the table.`);
  b.card("FACT", "To what precision are raw readings recorded?", "To the resolution of the instrument, with every reading in a column to the same number of decimal places (e.g. 0.460 m, not 0.46 m, from a millimetre rule).");
  b.card("FACT", "How many significant figures should a calculated value have?", "The same as the least precise raw data used, or one more.");
  b.card("CONCEPT", "How many readings and what range for a straight-line graph?", "At least six sets, spread evenly over as wide a range as the apparatus allows, each repeated (all values recorded).");
  b.card("FORMULA", "Gradient of a straight line", t`$\dfrac{\Delta y}{\Delta x} = \dfrac{y_2 - y_1}{x_2 - x_1}$ from two points on the line more than half its length apart; unit = unit of $y$ / unit of $x$.`);
  b.card("CONCEPT", "How do you find the intercept when the x-axis has a false origin?", t`Calculate it: $c = y - mx$, using the gradient and one point on the line.`);
  b.card("CONCEPT", "What should graph scales do?", "Use simple steps (1, 2 or 5 per large square) and make the points cover at least half the grid in each direction.");
  b.card("DEFINITION", "Best-fit line", "One thin line (or smooth curve) with the points balanced on either side along its length; not forced through the origin or any point.");
  b.card("CONCEPT", "Why time 20 oscillations rather than one?", "The reaction-time uncertainty (about 0.2–0.3 s) is shared over 20 cycles, so the percentage uncertainty in the period is much smaller.");
  b.card("CONCEPT", "What to plot for T = 2π√(l/g)?", t`$T^2$ against $l$: a straight line through the origin with gradient $4\pi^2/g$.`);
});
