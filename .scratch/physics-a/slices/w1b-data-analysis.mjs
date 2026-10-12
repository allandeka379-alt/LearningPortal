// W1b: aphys.skills.data-analysis — linearising, logarithms, error bars, worst lines, constants with uncertainties.
import { concept, P, t, chk, lg, ln, linFit, worstLines, dpStr, sfStr, table, pctUnc, fracUnc } from "../lib.mjs";

concept("aphys.skills.data-analysis", { file: "skills/data-analysis", keyPrefix: "skills.data-analysis" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: t`A quantity $y$ is thought to be related to $x$ by $y = ax^{n}$, where $a$ and $n$ are unknown constants. Which graph should be plotted to give a straight line?`,
    options: [
      [t`$\lg y$ against $\lg x$`, t`Correct: $\lg y = n\lg x + \lg a$, a straight line of gradient $n$ and intercept $\lg a$.`],
      [t`$\ln y$ against $x$`, t`This linearises an exponential $y = ae^{kx}$, not a power law.`],
      [t`$y$ against $x^{n}$`, t`This needs $n$ to be known already; here $n$ is one of the unknowns.`],
      [t`$\lg y$ against $x$`, t`This is a straight line only for an exponential relationship.`],
    ],
    answer: "A",
    explanation: t`Taking logarithms of $y = ax^n$ gives $\lg y = n \lg x + \lg a$: compare with $Y = mX + c$ where $Y = \lg y$ and $X = \lg x$. The gradient is $n$ and the intercept is $\lg a$.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: t`A quantity decays as $y = y_0 e^{-kx}$. A graph of $\ln y$ against $x$ is plotted. Which statement is correct?`,
    options: [
      [t`The gradient is $-k$ and the $y$-intercept is $\ln y_0$.`, "Correct: ln y = −kx + ln y₀."],
      [t`The gradient is $-k$ and the $y$-intercept is $y_0$.`, t`The intercept is a value of $\ln y$, so it equals $\ln y_0$, not $y_0$.`],
      [t`The gradient is $\ln k$ and the $y$-intercept is $y_0$.`, "This confuses the exponential with a power law."],
      [t`The gradient is $e^{-k}$ and the $y$-intercept is $\ln y_0$.`, "The exponent becomes the gradient directly once natural logarithms are taken."],
    ],
    answer: "A",
    explanation: t`$\ln y = \ln y_0 + \ln e^{-kx} = -kx + \ln y_0$. Gradient $-k$; intercept $\ln y_0$, so $y_0 = e^{\text{intercept}}$.`,
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which column heading is written in the form examiners expect for a table of logarithms of a mass m measured in kilograms?",
    options: [
      [t`$\lg(m/\text{kg})$`, "Correct: the unit goes inside the bracket; the logarithm itself has no unit."],
      [t`$\lg m\,/\,\text{kg}$`, "This gives the logarithm a unit, which it cannot have."],
      [t`$\lg m\ (\text{kg})$`, "Units in brackets after a quantity are not the quantity/unit convention, and lg m has no unit."],
      [t`$\lg(m)\,/\,\lg(\text{kg})$`, "The logarithm of a unit is meaningless; divide by the unit before taking the logarithm."],
    ],
    answer: "A",
    explanation: t`You can only take the logarithm of a pure number, so divide the quantity by its unit first: $\lg(m/\text{kg})$. The result has no unit.`,
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`The period $T$ of a mass $m$ on a spring of stiffness $k$ is $T = 2\pi\sqrt{m/k}$. A student plots $T^2$ on the $y$-axis against $m$ on the $x$-axis. What is the gradient?`,
    options: [
      [t`$\dfrac{4\pi^2}{k}$`, t`Correct: $T^2 = \dfrac{4\pi^2}{k}\, m$.`],
      [t`$\dfrac{2\pi}{\sqrt{k}}$`, t`This is the gradient of $T$ against $\sqrt{m}$, not of $T^2$ against $m$.`],
      [t`$\dfrac{k}{4\pi^2}$`, t`This is the gradient of $m$ against $T^2$ (axes swapped).`],
      [t`$4\pi^2 k$`, t`Squaring $\sqrt{m/k}$ gives $m/k$, so $k$ is in the denominator.`],
    ],
    answer: "A",
    explanation: t`Square both sides: $T^2 = 4\pi^2 m / k = \left(\dfrac{4\pi^2}{k}\right) m$. This is $y = mx$ with gradient $4\pi^2/k$ and zero intercept, so $k = 4\pi^2/\text{gradient}$.`,
    hints: ["Square both sides first.", "Compare with y = (gradient) × x."],
  });
  {
    const v = 0.0367;
    const L = lg(v);
    chk(Number(dpStr(L, 3).replace("−", "-")), -1.435);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A time of $0.0367\ \text{s}$ (three significant figures) is recorded. How should $\lg(t/\text{s})$ be entered in the results table?`,
      options: [
        ["−1.435", "Correct: lg 0.0367 = −1.4353…; three significant figures in the reading give three decimal places in the logarithm."],
        ["−1.44", "Two decimal places loses precision: the logarithm should have as many decimal places as the reading has significant figures."],
        ["−3.305", "This is ln 0.0367, not lg 0.0367."],
        ["1.435", "The logarithm of a number less than 1 is negative."],
      ],
      answer: "A",
      explanation: t`$\lg 0.0367 = ${dpStr(L, 4)}$. The rule for logarithms is decimal places, not significant figures: a reading to 3 s.f. gives its logarithm to 3 (or 4) d.p., so $-1.435$.`,
      hints: ["The number is less than 1.", "Count decimal places for a logarithm."],
    });
    chk(Number(dpStr(ln(v), 3).replace("−", "-")), -3.305);
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: t`The height of water in a draining tank obeys $h = h_0 e^{-kt}$, with $t$ in seconds. What is the unit of $k$?`,
    options: [
      [t`$\text{s}^{-1}$`, "Correct: kt must be a pure number, so k has the unit of 1/t."],
      [t`$\text{s}$`, "Then kt would have the unit s², but an exponent must have no unit."],
      [t`$\text{m s}^{-1}$`, "h₀ carries the unit of h; k only has to cancel the unit of t."],
      ["no unit", "k must cancel the second in t, so it cannot be unitless."],
    ],
    answer: "A",
    explanation: t`An exponent (like the argument of a logarithm) must be dimensionless. $kt$ has no unit only if $k$ is in $\text{s}^{-1}$. The gradient of $\ln(h/\text{m})$ against $t/\text{s}$ is $-k$ in $\text{s}^{-1}$.`,
    hints: ["What unit must an exponent have?"],
  });
  {
    const x = 25.0, dx = 0.5;
    const dl = (ln(x + dx) - ln(x - dx)) / 2;
    chk(Number(dl.toFixed(3)), 0.02);
    b.mcq({
      d: 4, skill: "APPLICATION",
      stem: t`A length is measured as $(25.0 \pm 0.5)\ \text{cm}$. What is the absolute uncertainty in $\ln(L/\text{cm})$?`,
      options: [
        ["0.02", "Correct: Δ(ln L) ≈ ΔL / L = 0.5 / 25.0 = 0.020."],
        ["0.5", "The uncertainty in L is not carried unchanged into ln L."],
        ["0.009", "This is the uncertainty in lg L (0.434 × 0.020), not in ln L."],
        ["0.04", "This is the full spread ln 25.5 − ln 24.5; the uncertainty is half of it."],
      ],
      answer: "A",
      explanation: t`$\ln 25.5 - \ln 24.5 = ${dpStr(2 * dl, 4)}$; half of this is $${dpStr(dl, 4)} \approx 0.02$. The quick rule is $\Delta(\ln L) = \Delta L / L$. For $\lg$ multiply by 0.434.`,
      hints: ["Work out ln(25.5) and ln(24.5).", "The uncertainty is half the spread."],
    });
  }
  {
    const p1 = [0.200, 1.520], p2 = [0.950, 2.645];
    const n = (p2[1] - p1[1]) / (p2[0] - p1[0]);
    chk(n, 1.5, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`For a relationship $y = ax^{n}$, a graph of $\lg y$ against $\lg x$ is a straight line passing through $(0.200,\ 1.520)$ and $(0.950,\ 2.645)$. Determine $n$, to three significant figures.`,
      value: n, wrong: [10 ** n, 2.645 / 0.95],
      explanation: t`$n = \dfrac{2.645 - 1.520}{0.950 - 0.200} = \dfrac{1.125}{0.750} = 1.50$. The gradient of a lg–lg graph is the power and has no unit.`,
      hints: ["The power is the gradient.", "Use the change in y over the change in x."],
    });
  }
  {
    const m = 1.5, pt = [0.400, 1.250];
    const c = pt[1] - m * pt[0];
    const a = 10 ** c;
    chk(c, 0.65, 1e-9);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A graph of $\lg(y/\text{N})$ against $\lg(x/\text{m})$ has a false origin; its best-fit line has gradient $1.50$ and passes through the point $(0.400,\ 1.250)$. The relationship is $y = ax^{1.5}$. Calculate $a$, in $\text{N m}^{-1.5}$, to three significant figures.`,
      value: a, wrong: [c, 1.25 / 0.4],
      explanation: t`1. $\lg y = 1.50 \lg x + \lg a$, so $\lg a = c = y - mx$.
2. $\lg a = 1.250 - 1.50 \times 0.400 = 0.650$.
3. $a = 10^{0.650} = ${sfStr(a, 3)}\ \text{N m}^{-1.5}$.
4. Giving $0.650$ is the intercept, not $a$; dividing $1.250$ by $0.400$ ignores the logarithms.`,
      hints: ["The intercept is lg a.", "Use c = y − mx with the given point, then undo the lg."],
    });
  }
  {
    const best = 2.46, worst = 2.58;
    const pct = pctUnc(worst - best, best);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The best-fit line on a graph has gradient $2.46\ \text{V A}^{-1}$ and the worst acceptable line has gradient $2.58\ \text{V A}^{-1}$. Calculate the percentage uncertainty in the gradient, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(worst - best, worst), (worst - best) * 100],
      explanation: t`Absolute uncertainty $= 2.58 - 2.46 = 0.12\ \text{V A}^{-1}$. Percentage $= \dfrac{0.12}{2.46} \times 100 = ${sfStr(pct, 2)}\%$. Divide by the best value, not the worst.`,
      hints: ["Absolute uncertainty = |best − worst|."],
    });
  }
  {
    const y = 48, dy = 2;
    const d = (lg(y + dy) - lg(y - dy)) / 2;
    b.num({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A force is measured as $(48 \pm 2)\ \text{N}$. Calculate the absolute uncertainty in $\lg(F/\text{N})$, to three decimal places.`,
      value: d, dp: 3, wrong: [dy / y, 2],
      explanation: t`$\lg 50 = ${dpStr(lg(50), 4)}$ and $\lg 46 = ${dpStr(lg(46), 4)}$; half the difference is $${dpStr(d, 3)}$. (The rule $0.434\,\Delta F/F = ${dpStr((0.434 * dy) / y, 3)}$ gives the same.) $\Delta F/F = 0.042$ is the uncertainty in $\ln F$, not $\lg F$.`,
      hints: ["Find lg(48 + 2) and lg(48 − 2).", "The uncertainty is half the spread."],
    });
  }
  {
    const grad = 4.02, dgrad = 0.08; // T^2 against L, s^2 m^-1
    const g = (4 * Math.PI ** 2) / grad;
    const dg = g * (dgrad / grad);
    chk(Number(dg.toPrecision(1)), 0.2);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`For a simple pendulum, $T^2 = \dfrac{4\pi^2}{g} L$. A graph of $T^2$ against $L$ has gradient $(4.02 \pm 0.08)\ \text{s}^2\ \text{m}^{-1}$. Calculate the absolute uncertainty in the value of $g$ found from this gradient, in $\text{m s}^{-2}$, to one significant figure.`,
      value: dg, sf: 1, unit: "m/s²", wrong: [0.08, g],
      explanation: t`1. $g = \dfrac{4\pi^2}{\text{gradient}} = \dfrac{4\pi^2}{4.02} = ${sfStr(g, 3)}\ \text{m s}^{-2}$.
2. Percentage uncertainty in $g$ = percentage uncertainty in the gradient $= \dfrac{0.08}{4.02} \times 100 = ${sfStr(pctUnc(dgrad, grad), 2)}\%$ ($4\pi^2$ is exact).
3. $\Delta g = ${sfStr(pctUnc(dgrad, grad), 2)}\% \times ${sfStr(g, 3)} = ${sfStr(dg, 2)} \approx 0.2\ \text{m s}^{-2}$, so $g = (9.8 \pm 0.2)\ \text{m s}^{-2}$.
4. The uncertainty in $g$ is not the same number as the uncertainty in the gradient (0.08): the percentages are equal, not the absolute values.`,
      hints: ["Percentage uncertainty is unchanged by dividing into a constant.", "Convert the percentage back to an absolute uncertainty in g."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A worst acceptable line must pass through every error bar of the plotted points.",
    answer: true,
    explanation: "True. The worst acceptable line is the steepest (or shallowest) straight line that is still consistent with every point, so it must pass through all the error bars. Its gradient minus the best gradient gives the uncertainty.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: t`For $y = ax^{n}$, a graph of $\ln y$ against $x$ is a straight line.`,
    answer: false,
    explanation: t`False. $\ln y = n\ln x + \ln a$, so $\ln y$ must be plotted against $\ln x$ (or $\lg y$ against $\lg x$). $\ln y$ against $x$ is straight only for an exponential $y = ae^{kx}$.`,
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each relationship with the graph that gives a straight line from which the unknown constants can be found.",
    pairs: [
      [t`$y = ax^{n}$, with $a$ and $n$ unknown`, t`$\lg y$ against $\lg x$`],
      [t`$y = ae^{kx}$`, t`$\ln y$ against $x$`],
      [t`$T = 2\pi\sqrt{L/g}$`, t`$T^2$ against $L$`],
      [t`$V = E - Ir$`, t`$V$ against $I$`],
    ],
    explanation: t`Power law: log both variables. Exponential: log only $y$. A known power ($T^2 \propto L$): plot the power directly. A linear relationship ($V = E - Ir$): plot directly; the gradient is $-r$ and the intercept $E$.`,
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about a graph of lg y against lg x for y = axⁿ.",
    template: "The gradient of the line is equal to {{blank:a}}, and the y-intercept is equal to {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["n"], choices: ["n", "a", "lg a", "lg n"] },
      { id: "b", accepted: ["lg a"], choices: ["lg a", "a", "n", "ln a"] },
    ],
    explanation: t`$\lg y = n \lg x + \lg a$: gradient $n$, intercept $\lg a$, so $a = 10^{\text{intercept}}$.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the steepest or shallowest straight line that still passes through every error bar on a graph?",
    accepted: ["worst acceptable line", "worst line", "worst fit line", "worst-fit line", "worst acceptable straight line", "line of worst fit"],
    wrong: ["best fit line"],
    explanation: "The **worst acceptable line**. Its gradient (or intercept) is compared with the best-fit line to give the absolute uncertainty.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Each height $h$ in an experiment is read to $\pm 0.5\ \text{cm}$. Explain why the error bars on a graph of $\ln(h/\text{cm})$ against time become longer as $h$ decreases.`,
    points: [
      t`The uncertainty in $\ln h$ is approximately $\Delta h / h$ (the fractional uncertainty).`,
      t`$\Delta h$ is the same ($0.5\ \text{cm}$) for every reading.`,
      t`So as $h$ gets smaller, $\Delta h / h$ becomes larger and the error bars get longer.`,
    ],
    modelAnswer: t`The uncertainty in $\ln h$ is about $\Delta h/h$, the fractional uncertainty in $h$. The absolute uncertainty $\Delta h = 0.5\ \text{cm}$ is the same for every reading, so as $h$ falls the fraction $\Delta h/h$ rises and the error bars lengthen.`,
    explanation: "The error bar on a logarithm depends on the fractional uncertainty, not the absolute one: a fixed ±0.5 cm matters more for a small height.",
    hints: ["What is the uncertainty in ln h in terms of h and Δh?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how you would determine the absolute uncertainty in the y-intercept of a straight-line graph whose x-axis starts at a false origin.",
    points: [
      "Draw the worst acceptable line (steepest or shallowest line through all the error bars).",
      "Find its gradient from a large triangle using points read from the line.",
      "Calculate its intercept from c = y − mx using a point on that line (cannot be read from the false origin).",
      "Uncertainty = |intercept of best-fit line − intercept of worst line|.",
    ],
    modelAnswer: "Draw the worst acceptable straight line through all the error bars and find its gradient from a large triangle read off the line. Because the axis has a false origin, calculate its intercept with c = y − mx using a point on the worst line. The absolute uncertainty in the intercept is the difference between this intercept and the best-fit intercept.",
    explanation: "The intercept uncertainty comes from comparing the best-fit and worst-line intercepts; with a false origin both intercepts must be calculated from c = y − mx.",
    hints: ["You cannot read the intercept straight off the graph."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: t`The intensity $I$ of light from a lamp is thought to depend on distance $d$ as $I = kd^{\,n}$. Show that a graph of $\lg I$ against $\lg d$ should be a straight line, and state how $n$ and $k$ are found from it.`,
    points: [
      t`Take lg of both sides: $\lg I = \lg k + \lg d^{\,n}$.`,
      t`$\lg d^{\,n} = n\lg d$, so $\lg I = n\lg d + \lg k$, which has the form $y = mx + c$ (a straight line).`,
      t`$n$ = gradient; $k = 10^{\text{intercept}}$ (intercept calculated as $c = y - mx$ if there is a false origin).`,
    ],
    modelAnswer: t`$\lg I = \lg(kd^{\,n}) = \lg k + n\lg d$. Writing $y = \lg I$ and $x = \lg d$ gives $y = nx + \lg k$, a straight line. The gradient is $n$ and the intercept is $\lg k$, so $k = 10^{\text{intercept}}$.`,
    explanation: "The laws of logarithms turn a product into a sum and a power into a multiplier, giving a straight-line form.",
    hints: ["Use lg(ab) = lg a + lg b and lg(xⁿ) = n lg x."],
  });

  // Structured 1: Poiseuille-type power law Q = k r^n (12 marks)
  {
    const r = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
    const Q = [0.167, 0.327, 0.637, 1.04, 1.72, 2.57];
    const X = r.map(lg), Y = Q.map(lg);
    const fit = linFit(X, Y);
    const k = 10 ** fit.c;
    const rows = r.map((x, i) => [x.toFixed(2), String(Q[i]), i === 2 ? "" : dpStr(X[i], 3), i === 2 ? "" : dpStr(Y[i], 3)]);
    const tab = table([t`$r\,/\,\text{mm}$`, t`$Q\,/\,\text{cm}^3\,\text{s}^{-1}$`, t`$\lg(r/\text{mm})$`, t`$\lg(Q/\text{cm}^3\,\text{s}^{-1})$`], rows);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Farai measures the volume flow rate $Q$ of water through narrow tubes of the same length but different internal radius $r$, with the same pressure difference across each. He suggests that $Q = kr^{\,n}$.

${tab}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why a graph of lg Q against lg r is suitable for testing the suggestion, and state what the gradient and intercept represent.",
          points: [t`$\lg Q = n\lg r + \lg k$, of the form $y = mx + c$, so the graph is a straight line if the suggestion is correct.`, t`Gradient $= n$; $y$-intercept $= \lg k$.`],
          modelAnswer: t`Taking logs, $\lg Q = n\lg r + \lg k$, which is $y = mx + c$: a straight line if the relationship holds, with gradient $n$ and intercept $\lg k$.` }),
        P.group({ label: "(b)", stem: "Complete the missing row for r = 0.70 mm, to three decimal places.", parts: [
          P.num({ label: "(i)", stem: t`$\lg(r/\text{mm})$`, value: X[2], dp: 3, wrong: [ln(0.7)], explanation: t`$\lg 0.70 = ${dpStr(X[2], 3)}$.` }),
          P.num({ label: "(ii)", stem: t`$\lg(Q/\text{cm}^3\,\text{s}^{-1})$`, value: Y[2], dp: 3, wrong: [ln(0.637)], explanation: t`$\lg 0.637 = ${dpStr(Y[2], 3)}$.` }),
        ] }),
        P.num({ label: "(c)", marks: 3, stem: "Plot the graph in your working, draw the best-fit line and determine its gradient (to two significant figures or more).", value: fit.m, tol: 0.15, wrong: [1], explanation: t`A good best-fit line has gradient about $${sfStr(fit.m, 3)}$ (any value from about 3.8 to 4.1 from a careful line). Use a triangle covering most of the line.` }),
        P.num({ label: "(d)", marks: 1, stem: "Hence state the value of n to the nearest whole number.", value: 4, wrong: [2], explanation: t`The gradient is close to 4, so $Q \propto r^4$ (as Poiseuille's equation predicts for laminar flow).` }),
        P.num({ label: "(e)", marks: 2, stem: t`The line crosses $\lg(r/\text{mm}) = 0$ (that is, $r = 1.00\ \text{mm}$) inside the plotted range. Use your line to determine $k$, in $\text{cm}^3\,\text{s}^{-1}\,\text{mm}^{-4}$, to two significant figures.`, value: k, sf: 2, tol: 0.08, unit: undefined, wrong: [fit.c], explanation: t`At $\lg r = 0$ the line gives $\lg Q = \lg k \approx ${dpStr(fit.c, 2)}$, so $k = 10^{${dpStr(fit.c, 2)}} \approx ${sfStr(k, 2)}\ \text{cm}^3\,\text{s}^{-1}\,\text{mm}^{-4}$. The intercept itself (about 0.41) is $\lg k$, not $k$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Each radius was measured to ±0.02 mm. Explain which reading has the largest percentage uncertainty and why this matters most in this experiment.",
          points: [t`$r = 0.50\ \text{mm}$: $0.02/0.50 = 4\%$, the largest because it is the smallest radius.`, t`$Q \propto r^4$, so the percentage uncertainty in $r$ is multiplied by 4 (16%) in its effect on $Q$.`],
          modelAnswer: t`The smallest radius, 0.50 mm, has the largest percentage uncertainty (4%). Because $Q$ depends on $r^4$, this becomes about 16% in the predicted flow, so radius is the critical measurement.` }),
      ],
      explanation: t`Logarithms of both variables turn $Q = kr^n$ into a straight line. The gradient (≈ 4) gives $n$ and the value at $\lg r = 0$ gives $\lg k$.`,
      hints: ["Take logs of both sides.", "With r in mm, lg r = 0 at r = 1 mm, so the line there gives lg k."],
    });
  }
  // Structured 2: exponential absorption (8 marks)
  {
    const x = [0, 1, 2, 3, 4, 5, 6];
    const I = [250, 207, 161, 134, 107, 89.2, 69.5];
    const L = I.map(ln);
    const fit = linFit(x, L);
    const mu = -fit.m;
    const tab = table([t`$x\,/\,\text{mm}$`, t`$I\,/\,\text{lux}$`, t`$\ln(I/\text{lux})$`], x.map((v, i) => [String(v), String(I[i]), i === 4 ? "" : dpStr(L[i], 3)]));
    const worst = 0.226;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Chipo places layers of grey plastic between a lamp and a light meter. The total thickness is $x$ and the meter reading is $I$. The relationship is thought to be $I = I_0 e^{-\mu x}$.

${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate $\ln(I/\text{lux})$ for $x = 4\ \text{mm}$, to three decimal places.`, value: L[4], dp: 3, wrong: [lg(107)], explanation: t`$\ln 107 = ${dpStr(L[4], 3)}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`A graph of $\ln(I/\text{lux})$ against $x$ is a straight line. Determine its gradient, in $\text{mm}^{-1}$.`, value: fit.m, tol: 0.008, wrong: [-fit.m], explanation: t`From a best-fit line, gradient $\approx ${dpStr(fit.m, 3)}\ \text{mm}^{-1}$ (any value from about $-0.204$ to $-0.220$).` }),
        P.num({ label: "(c)", marks: 1, stem: t`Hence state $\mu$, in $\text{mm}^{-1}$, to two significant figures.`, value: mu, sf: 2, tol: 0.008, wrong: [fit.m], explanation: t`$\mu = -\text{gradient} \approx ${sfStr(mu, 2)}\ \text{mm}^{-1}$; it is positive because the intensity decreases.` }),
        P.num({ label: "(d)", marks: 2, stem: t`The worst acceptable line gives $\mu = ${worst}\ \text{mm}^{-1}$. Taking the best value as $0.212\ \text{mm}^{-1}$, calculate the percentage uncertainty in $\mu$, to two significant figures.`, value: pctUnc(worst - 0.212, 0.212), sf: 2, unit: "%", wrong: [pctUnc(worst - 0.212, worst)], explanation: t`$\dfrac{${worst} - 0.212}{0.212} \times 100 = ${sfStr(pctUnc(worst - 0.212, 0.212), 2)}\%$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest two precautions that would make the readings more reliable.",
          points: ["Darken the room (or shield the meter) / subtract the background reading with the lamp off.", "Keep the lamp-meter distance fixed and the layers perpendicular to the beam; repeat each reading and average (or check layers are clean and the same type)."],
          modelAnswer: "Do the experiment in a darkened room and subtract the background reading taken with the lamp off. Keep the distance between lamp and meter fixed, with the layers perpendicular to the light, and repeat each reading and average." }),
      ],
      explanation: t`$\ln I = -\mu x + \ln I_0$: the gradient of $\ln I$ against $x$ is $-\mu$, so $\mu \approx ${sfStr(mu, 2)}\ \text{mm}^{-1}$.`,
      hints: ["Take natural logs of both sides.", "μ is minus the gradient."],
    });
  }

  b.card("DEFINITION", "What is an **error bar**?", "A line through a plotted point extending one absolute uncertainty either side of it, showing the range in which the true value lies.");
  b.card("DEFINITION", "What is the **worst acceptable line**?", "The steepest or shallowest straight line that still passes through every error bar.", "Uncertainty in gradient = |best gradient − worst gradient|.");
  b.card("FORMULA", t`Linearise $y = ax^{n}$.`, t`$\lg y = n\lg x + \lg a$: plot $\lg y$ against $\lg x$; gradient $n$, intercept $\lg a$.`);
  b.card("FORMULA", t`Linearise $y = ae^{kx}$.`, t`$\ln y = kx + \ln a$: plot $\ln y$ against $x$; gradient $k$, intercept $\ln a$.`);
  b.card("FORMULA", t`Uncertainty in $\ln y$ and in $\lg y$?`, t`$\Delta(\ln y) \approx \Delta y / y$; $\Delta(\lg y) \approx 0.434\,\Delta y / y$ (or half of $\lg(y+\Delta y) - \lg(y-\Delta y)$).`);
  b.card("FACT", "How many decimal places for a logarithm in a table?", "As many decimal places as the raw reading has significant figures (or one more).");
  b.card("FACT", "How should a column of logarithms be headed?", t`With the unit inside the bracket, e.g. $\lg(d/\text{mm})$ or $\ln(V/\text{V})$; a logarithm has no unit.`);
  b.card("CONCEPT", "How do you find the y-intercept when the graph has a false origin?", t`Calculate it: $c = y - mx$, using a point on the line and the gradient.`);
  b.card("CONCEPT", "How is a constant found from a gradient quoted?", t`As value ± absolute uncertainty with a unit, e.g. $k = (1.00 \pm 0.04) \times 10^{-2}\ \text{s}^{-1}$; percentage uncertainties of quantities multiplied together add.`);
});
