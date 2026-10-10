// W3b: amaths.continuous.cdf (ZIMSEC only: Statistics F5 6.5.1)
import { concept, P, t, chk, sfStr, integrate, root, checkDeriv } from "../lib.mjs";

const { sqrt } = Math;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const s = (x) => sfStr(x, 4);
const area = (f, a, b) => integrate(f, a, b, 20000);

concept("amaths.continuous.cdf", { file: "continuous/cdf", keyPrefix: "continuous.cdf" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$X$ is a continuous random variable with cumulative distribution function $F$. What does $F(x)$ represent?`,
    options: [
      [t`$\mathrm{P}(X \le x)$, the probability that $X$ takes a value of at most $x$`, "Correct: the cdf accumulates probability from the lowest value up to x."],
      [t`$\mathrm{P}(X = x)$, the probability that $X$ takes exactly the value $x$`, t`For a continuous variable $\mathrm{P}(X = x) = 0$ for every $x$.`],
      [t`the height of the probability density curve at the point $x$`, t`That is the pdf $f(x)$, which is the derivative of $F(x)$.`],
      [t`$\mathrm{P}(X > x)$, the probability that $X$ is greater than $x$`, t`That is $1 - F(x)$, the complement of the cdf.`],
    ],
    answer: "A",
    explanation: t`By definition $F(x) = \mathrm{P}(X \le x) = \int_{-\infty}^{x} f(t)\,\mathrm{d}t$, the area under the pdf to the left of $x$.`,
  });

  // F(x) = x²/9 on [0, 3] → f(x) = 2x/9
  checkDeriv((x) => (x * x) / 9, (x) => (2 * x) / 9, [0.5, 1.5, 2.5]);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The continuous random variable $X$ has cdf $F(x) = \frac{x^2}{9}$ for $0 \le x \le 3$, with $F(x) = 0$ for $x < 0$ and $F(x) = 1$ for $x > 3$. Which is the pdf of $X$ for $0 \le x \le 3$?`,
    options: [
      [t`$f(x) = \frac{2x}{9}$`, t`Correct: $f(x) = F'(x) = \frac{2x}{9}$.`],
      [t`$f(x) = \frac{x^3}{27}$`, "This integrates F instead of differentiating it."],
      [t`$f(x) = \frac{x^2}{9}$`, "This repeats the cdf; the pdf is its derivative."],
      [t`$f(x) = 2x$`, t`The factor $\frac{1}{9}$ has been dropped; $\int_0^3 2x\,\mathrm{d}x = 9 \ne 1$.`],
    ],
    answer: "A",
    explanation: t`The pdf is the derivative of the cdf: $f(x) = \frac{\mathrm{d}}{\mathrm{d}x}\left(\frac{x^2}{9}\right) = \frac{2x}{9}$ on $[0, 3]$ and 0 elsewhere. Check: $\int_0^3 \frac{2x}{9}\,\mathrm{d}x = 1$.`,
  });

  const v3 = (9 - 1) / 16;
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The continuous random variable $X$ has cdf $F(x) = \frac{x^2}{16}$ for $0 \le x \le 4$ (with $F = 0$ below 0 and $F = 1$ above 4). Find $\mathrm{P}(1 < X < 3)$.`,
    value: v3, wrong: [9 / 16, 3 / 8],
    explanation: t`$\mathrm{P}(1 < X < 3) = F(3) - F(1) = \frac{9}{16} - \frac{1}{16} = \frac{1}{2} = 0.5$. ($\frac{9}{16}$ is $\mathrm{P}(X < 3)$ alone.)`,
  });

  const m4 = Math.cbrt(13.5);
  chk((m4 ** 3) / 27, 0.5, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`The continuous random variable $X$ has cdf $F(x) = \frac{x^3}{27}$ for $0 \le x \le 3$ (with $F = 0$ below 0 and $F = 1$ above 3). Find the median of $X$, correct to 3 significant figures.`,
    value: m4, wrong: [1.5, Math.cbrt(27 * 0.25)],
    explanation: t`The median $m$ satisfies $F(m) = 0.5$: $\frac{m^3}{27} = 0.5$, so $m^3 = 13.5$ and $m = ${s(m4)}$, i.e. $${sfStr(m4)}$. (1.5 is the midpoint of the range, which is the median only for a symmetrical distribution; $${sfStr(Math.cbrt(6.75))}$ is the lower quartile.)`,
  });

  // f(x) = 3x²/8 on [0, 2] → F(x) = x³/8
  chk(area((x) => (3 * x * x) / 8, 0, 1.3), 1.3 ** 3 / 8, 1e-9);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The continuous random variable $X$ has pdf $f(x) = \frac{3x^2}{8}$ for $0 \le x \le 2$ and $f(x) = 0$ otherwise. For $0 \le x \le 2$ its cdf has the form $F(x) = \frac{x^a}{b}$. Find $a$ and $b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [D("a", 3, 0, "2"), D("b", 8, 0, "24")],
    explanation: t`$F(x) = \displaystyle\int_0^x \frac{3t^2}{8}\,\mathrm{d}t = \left[\frac{t^3}{8}\right]_0^x = \frac{x^3}{8}$, so $a = 3$ and $b = 8$. Check: $F(2) = 1$.`,
  });

  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "The cumulative distribution function of a continuous random variable never decreases as x increases.",
    answer: true,
    explanation: t`$F'(x) = f(x) \ge 0$, so $F$ is non-decreasing; it rises from 0 to 1 and is flat where the pdf is zero.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $F(2) = 0.6$ for a continuous random variable $X$, then $\mathrm{P}(X \ge 2) = 0.4$.`,
    answer: true,
    explanation: t`$\mathrm{P}(X \ge 2) = 1 - \mathrm{P}(X < 2) = 1 - F(2) = 0.4$. For a continuous variable $\mathrm{P}(X = 2) = 0$, so $<$ and $\le$ give the same probability.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$X$ is a continuous random variable with cdf $F$. Match each quantity with the expression or equation that gives it.`,
    pairs: [
      [t`$\mathrm{P}(X > 2)$`, t`$1 - F(2)$`],
      [t`$\mathrm{P}(1 < X < 2)$`, t`$F(2) - F(1)$`],
      ["the median m", t`the solution of $F(m) = 0.5$`],
      ["the upper quartile q", t`the solution of $F(q) = 0.75$`],
    ],
    explanation: t`Probabilities are differences of $F$ values; percentiles solve $F(x) = \frac{p}{100}$.`,
  });

  // Piecewise pdf: f = x/3 on [0, 2], 2(3 − x)/3 on (2, 3]
  const f9 = (x) => (x <= 2 ? x / 3 : (2 * (3 - x)) / 3);
  const F9 = (x) => (x <= 2 ? (x * x) / 6 : 2 * x - (x * x) / 3 - 2);
  chk(area(f9, 0, 3), 1, 1e-6);
  for (const x of [0.7, 1.9, 2.4, 2.9]) chk(F9(x), area(f9, 0, x), 1e-6);
  const v9 = 1 - F9(2.5);
  chk(v9, 1 / 12, 1e-12);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The continuous random variable $X$ has pdf $f(x) = \frac{x}{3}$ for $0 \le x \le 2$, $f(x) = \frac{2}{3}(3 - x)$ for $2 < x \le 3$, and $f(x) = 0$ otherwise. Find $\mathrm{P}(X > 2.5)$, giving your answer correct to 3 significant figures.`,
    value: v9, wrong: [1 - (2 * 2.5 - 2.5 ** 2 / 3 - 2 - 2 / 3), f9(2.5)],
    explanation: t`For $2 < x \le 3$: $F(x) = F(2) + \int_2^x \frac{2}{3}(3 - t)\,\mathrm{d}t = \frac{2}{3} + \frac{2}{3}\left(3x - \frac{x^2}{2} - 4\right) = 2x - \frac{x^2}{3} - 2$. So $F(2.5) = 5 - \frac{6.25}{3} - 2 = \frac{11}{12}$ and $\mathrm{P}(X > 2.5) = \frac{1}{12} = ${s(v9)}$, i.e. $${sfStr(v9)}$. (Forgetting to carry $F(2) = \frac{2}{3}$ into the second piece gives a wrong cdf with $F(3) \ne 1$.)`,
    workedSolution: t`1. $F(2) = \int_0^2 \frac{t}{3}\,\mathrm{d}t = \frac{4}{6} = \frac{2}{3}$.
2. For $2 < x \le 3$: $F(x) = \frac{2}{3} + \frac{2}{3}\left[3t - \frac{t^2}{2}\right]_2^x = 2x - \frac{x^2}{3} - 2$; check $F(3) = 1$.
3. $F(2.5) = 5 - 2.0833 - 2 = 0.9167$.
4. $\mathrm{P}(X > 2.5) = 1 - 0.9167 = ${sfStr(v9)}$ (exactly $\frac{1}{12}$).`,
    hints: ["Find F(2) first.", "On the second piece, add the area from 2 to x to F(2)."],
  });

  const uq = 3 - sqrt(0.75);
  chk(F9(uq), 0.75, 1e-12);
  chk(F9(sqrt(3)), 0.5, 1e-12);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`For the random variable in the previous question (pdf $\frac{x}{3}$ on $[0, 2]$ and $\frac{2}{3}(3 - x)$ on $(2, 3]$), the cdf on $(2, 3]$ is $F(x) = 2x - \frac{x^2}{3} - 2$. Find the upper quartile of $X$, correct to 3 significant figures.`,
    value: uq, wrong: [sqrt(4.5), 3 + sqrt(0.75)],
    explanation: t`$F(2) = \frac{2}{3} < 0.75$, so the upper quartile lies in $(2, 3]$. Solve $2q - \frac{q^2}{3} - 2 = 0.75$: $q^2 - 6q + 8.25 = 0$, $q = 3 \pm \sqrt{0.75}$. Only $3 - \sqrt{0.75} = ${s(uq)}$ lies in the interval, so $q = ${sfStr(uq)}$. ($${sfStr(sqrt(4.5))}$ uses the first piece $\frac{q^2}{6} = 0.75$, outside $[0, 2]$; $${sfStr(3 + sqrt(0.75))}$ is the rejected root.)`,
    hints: ["Evaluate F at the join, x = 2, to decide which piece contains the quartile.", "Reject the root outside the piece."],
  });

  // F(x) = (x² + 2x)/8 → f = (x + 1)/4
  checkDeriv((x) => (x * x + 2 * x) / 8, (x) => (x + 1) / 4, [0.3, 1, 1.7]);
  chk((4 + 4) / 8, 1);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The continuous random variable $X$ has cdf $F(x) = \frac{x^2 + 2x}{8}$ for $0 \le x \le 2$, with $F(x) = 0$ for $x < 0$ and $F(x) = 1$ for $x > 2$. Find the pdf $f(x)$ for $0 \le x \le 2$. Type it as a fraction, e.g. (x+3)/5.`,
    accepted: ["(x+1)/4", "(1+x)/4", "x/4+1/4", "1/4+x/4", "0.25x+0.25", "0.25(x+1)", "(1/4)(x+1)", "1/4(x+1)", "(2x+2)/8"],
    rejected: ["(x^2+2x)/8", "(x+2)/8"],
    wrong: ["(2x+2)/16", "x/4"],
    explanation: t`$f(x) = F'(x) = \frac{2x + 2}{8} = \frac{x + 1}{4}$ for $0 \le x \le 2$, and 0 otherwise. Check: $\int_0^2 \frac{x + 1}{4}\,\mathrm{d}x = \frac{1}{4}(2 + 2) = 1$.`,
    hints: ["Differentiate F term by term."],
  });

  // F(x) = k(x³ + x) on [0, 2]; F(2) = 1 → k = 1/10; median x³ + x = 5
  const k12 = 1 / 10;
  const m12 = root((x) => x ** 3 + x - 5, 1, 2);
  chk(k12 * (8 + 2), 1, 1e-12);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The continuous random variable $X$ has cdf $F(x) = k(x^3 + x)$ for $0 \le x \le 2$, with $F(x) = 0$ for $x < 0$ and $F(x) = 1$ for $x > 2$. Find the value of $k$, and the median of $X$ correct to 3 significant figures.`,
    template: "k = {{blank:k}}, median = {{blank:m}}",
    blanks: [D("k", 0.1, 0.0005, "0.125"), D("m", m12.toFixed(2), 0.005, "1")],
    explanation: t`$F(2) = 1$: $k(8 + 2) = 1$, so $k = \frac{1}{10}$. The median solves $\frac{m^3 + m}{10} = 0.5$, i.e. $m^3 + m - 5 = 0$, giving $m = ${s(m12)}$, so $${sfStr(m12)}$. (Using $F(2) = 1$ with $x^3$ only gives $k = 0.125$.)`,
    hints: ["A cdf reaches 1 at the top of the range.", "Solve F(m) = 0.5 numerically."],
  });

  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: t`Each function below is proposed as the cdf $F(x)$ of a continuous random variable for $0 \le x \le 2$, with $F(x) = 0$ for $x < 0$ and $F(x) = 1$ for $x > 2$. Which one is a valid cdf?`,
    options: [
      [t`$F(x) = \frac{x^2}{4}$`, t`Correct: $F(0) = 0$, $F(2) = 1$, and $F'(x) = \frac{x}{2} \ge 0$ on $[0, 2]$.`],
      [t`$F(x) = \frac{x}{4}$`, t`$F(2) = \frac{1}{2}$, so $F$ would jump from 0.5 to 1 at $x = 2$; it must reach 1 continuously.`],
      [t`$F(x) = \frac{x^3 - x}{6}$`, t`$F(2) = 1$, but $F'(x) = \frac{3x^2 - 1}{6} < 0$ for small $x$, so $F$ decreases (it is negative near 0).`],
      [t`$F(x) = \frac{2x - x^2}{2}$`, t`$F(2) = 0$, not 1; this function rises and then falls back.`],
    ],
    answer: "A",
    explanation: t`A valid cdf is continuous, non-decreasing, and runs from $F = 0$ at the bottom of the range to $F = 1$ at the top.`,
    hints: ["Check F(0), F(2) and the sign of F'(x)."],
  });

  // Infinite range: F(x) = 1 − 16/x⁴ for x ≥ 2
  const v14 = 16 / 81;
  const lq14 = (16 / 0.75) ** 0.25;
  const uq14 = (16 / 0.25) ** 0.25;
  chk(1 - 16 / lq14 ** 4, 0.25, 1e-12);
  chk(1 - 16 / uq14 ** 4, 0.75, 1e-12);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The lifetime $X$, in years, of a borehole pump in Masvingo has cdf $F(x) = 1 - \frac{16}{x^4}$ for $x \ge 2$, and $F(x) = 0$ for $x < 2$. Find $\mathrm{P}(X > 3)$ and the interquartile range of $X$, both correct to 3 significant figures.`,
    template: "P(X > 3) = {{blank:p}}, interquartile range = {{blank:iqr}} years",
    blanks: [D("p", v14.toFixed(3), 0.0005, "0.802"), D("iqr", (uq14 - lq14).toFixed(3), 0.0005, "1.15")],
    explanation: t`$\mathrm{P}(X > 3) = 1 - F(3) = \frac{16}{81} = ${s(v14)}$, so $${sfStr(v14)}$. Lower quartile: $1 - \frac{16}{q^4} = 0.25 \Rightarrow q^4 = \frac{64}{3}$, $q_1 = ${s(lq14)}$. Upper quartile: $\frac{16}{q^4} = 0.25 \Rightarrow q^4 = 64$, $q_3 = ${s(uq14)}$. IQR $= ${s(uq14 - lq14)}$, i.e. $${sfStr(uq14 - lq14)}$ years.`,
    hints: ["P(X > 3) = 1 − F(3).", "Quartiles solve F(q) = 0.25 and F(q) = 0.75."],
  });

  const F15 = (x) => (x ** 3 + x) / 10;
  chk(F15(1.5) < 0.5 && F15(1.55) > 0.5 ? 1 : 0, 1);
  b.proof({
    d: 3, skill: "ANALYSIS", calculator: true, marks: 3,
    stem: t`The continuous random variable $X$ has cdf $F(x) = \frac{x^3 + x}{10}$ for $0 \le x \le 2$. Show that the median of $X$ lies between 1.5 and 1.55.`,
    points: [
      "M1 states that the median m satisfies F(m) = 0.5 (or m³ + m − 5 = 0).",
      `M1 evaluates F(1.5) = ${F15(1.5).toFixed(4)} and F(1.55) = ${F15(1.55).toFixed(4)} (or the values of m³ + m − 5).`,
      "A1 states that F is continuous and increasing and 0.5 lies between the two values, so 1.5 < m < 1.55.",
    ],
    modelAnswer: t`The median satisfies $F(m) = 0.5$.
$$
F(1.5) = \frac{3.375 + 1.5}{10} = ${F15(1.5).toFixed(4)} < 0.5
$$
$$
F(1.55) = \frac{3.723875 + 1.55}{10} = ${F15(1.55).toFixed(4)} > 0.5
$$
$F$ is continuous and increasing on $[0, 2]$, so $F(m) = 0.5$ for some $m$ with $1.5 < m < 1.55$.`,
    explanation: "A 'show that the median lies between' question needs F at both ends, a comparison with 0.5, and a conclusion.",
    hints: ["Evaluate F at 1.5 and at 1.55 and compare each with 0.5."],
  });
  chk(F15(1.55), 0.5273875, 1e-12);

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For a continuous random variable $X$ with cdf $F$, what is $\mathrm{P}(X = 1.5)$?`,
    options: [
      ["0", t`Correct: $\mathrm{P}(X = 1.5) = F(1.5) - F(1.5) = 0$; a single point has no area under the pdf.`],
      [t`$F(1.5)$`, t`$F(1.5)$ is $\mathrm{P}(X \le 1.5)$, the probability of all values up to 1.5.`],
      [t`the value of the pdf at 1.5`, "The pdf value is a density (a height), not a probability."],
      [t`$1 - F(1.5)$`, t`This is $\mathrm{P}(X > 1.5)$.`],
    ],
    answer: "A",
    explanation: "For a continuous variable, probabilities are areas over intervals, and any single value has probability 0.",
  });

  // --------------------------------------------------------------- structured (5 marks)
  const f16 = (x) => (x <= 1 ? 0.5 : 0.25 * (3 - x));
  const F16 = (x) => (x <= 1 ? x / 2 : 0.5 + 0.75 * (x - 1) - (x * x - 1) / 8);
  chk(area(f16, 0, 3), 1, 1e-6);
  for (const x of [0.5, 1.4, 2.2, 2.9]) chk(F16(x), area(f16, 0, x), 1e-6);
  chk(F16(3), 1, 1e-12);
  // simplified: F = (6x − x² − 1)/8 on (1, 3]
  for (const x of [1.2, 2, 2.8]) chk(F16(x), (6 * x - x * x - 1) / 8, 1e-12);
  const q16 = 3 - sqrt(2);
  chk(F16(q16), 0.75, 1e-12);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The continuous random variable $X$ has pdf $f(x) = \frac{1}{2}$ for $0 \le x \le 1$, $f(x) = \frac{1}{4}(3 - x)$ for $1 < x \le 3$, and $f(x) = 0$ otherwise.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Show that for $1 < x \le 3$ the cdf is $F(x) = \frac{ax - x^2 - b}{8}$, and state the integers $a$ and $b$. Also state $F(1)$.`,
        template: "a = {{blank:a}}, b = {{blank:b}}, F(1) = {{blank:f}}",
        blanks: [D("a", 6, 0, "3"), D("b", 1, 0, "5"), D("f", 0.5, 0.001, "1")],
        explanation: t`$F(1) = \frac{1}{2}$. For $1 < x \le 3$: $F(x) = \frac{1}{2} + \int_1^x \frac{3 - t}{4}\,\mathrm{d}t = \frac{1}{2} + \frac{1}{4}\left[3t - \frac{t^2}{2}\right]_1^x = \frac{1}{2} + \frac{3x}{4} - \frac{x^2}{8} - \frac{5}{8} = \frac{6x - x^2 - 1}{8}$. Check $F(3) = \frac{18 - 9 - 1}{8} = 1$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the upper quartile of X, correct to 3 significant figures.", value: q16, wrong: [3 + sqrt(2), 1.5],
        explanation: t`$F(1) = 0.5 < 0.75$, so solve $\frac{6q - q^2 - 1}{8} = 0.75$: $q^2 - 6q + 7 = 0$, $q = 3 \pm \sqrt{2}$. Only $3 - \sqrt{2} = ${s(q16)}$ is in $(1, 3]$, so $${sfStr(q16)}$.` }),
    ],
    explanation: "Carry F(1) into the second piece, check F(3) = 1, then solve F(q) = 0.75 in the correct piece.",
    hints: ["F(1) is the area of the rectangle from 0 to 1.", "Decide which piece contains the upper quartile."],
  });

  // --------------------------------------------------------------- structured (12 marks)
  // F(x) = ax + bx² on [0, 2]; F(2) = 1, F(1) = 0.3 → a = 0.1, b = 0.2
  const a17 = 0.1, b17 = 0.2;
  chk(2 * a17 + 4 * b17, 1, 1e-12);
  chk(a17 + b17, 0.3, 1e-12);
  const F17 = (x) => a17 * x + b17 * x * x;
  const f17 = (x) => a17 + 2 * b17 * x;
  checkDeriv(F17, f17, [0.4, 1.1, 1.8]);
  const med17 = (-1 + sqrt(41)) / 4;
  chk(F17(med17), 0.5, 1e-12);
  const mean17 = area((x) => x * f17(x), 0, 2);
  chk(mean17, 0.2 + 3.2 / 3, 1e-9);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The time, $X$ hours, that a kombi waits at a rank in Harare before it is full is modelled by the cdf $F(x) = ax + bx^2$ for $0 \le x \le 2$, with $F(x) = 0$ for $x < 0$ and $F(x) = 1$ for $x > 2$. It is known that $\mathrm{P}(X \le 1) = 0.3$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the values of the constants a and b.", template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [D("a", 0.1, 0.0005, "0.2", 1), D("b", 0.2, 0.0005, "0.1", 2)],
        explanation: t`$F(2) = 1$: $2a + 4b = 1$. $F(1) = 0.3$: $a + b = 0.3$. Subtracting twice the second from the first: $2b = 0.4$, so $b = 0.2$ and $a = 0.1$.` }),
      P.expr({ label: "(b)", marks: 2, stem: "Find the pdf f(x) for 0 ≤ x ≤ 2. Type it in the form p + qx, e.g. 0.3+0.5x.",
        accepted: ["0.1+0.4x", "0.4x+0.1", "(1+4x)/10", "(4x+1)/10", "1/10+2x/5", "1/10+0.4x"], wrong: ["0.1x+0.2x^2"],
        explanation: t`$f(x) = F'(x) = 0.1 + 0.4x$ for $0 \le x \le 2$ (0 otherwise).` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the median waiting time, correct to 3 significant figures.", value: med17, unit: "h", wrong: [1, sqrt(2.5)],
        explanation: t`$0.1m + 0.2m^2 = 0.5 \Rightarrow 2m^2 + m - 5 = 0 \Rightarrow m = \frac{-1 + \sqrt{41}}{4} = ${s(med17)}$, so $${sfStr(med17)}$ hours.` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the mean waiting time E(X), correct to 3 significant figures.", value: mean17, unit: "h", wrong: [1, med17],
        explanation: t`$\mathrm{E}(X) = \int_0^2 x(0.1 + 0.4x)\,\mathrm{d}x = \left[0.05x^2 + \frac{0.4x^3}{3}\right]_0^2 = 0.2 + \frac{3.2}{3} = ${s(mean17)}$, so $${sfStr(mean17)}$ hours.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Compare the mean and the median and state, with a reason, the skewness of the distribution.",
        points: [`States mean (${sfStr(mean17)}) < median (${sfStr(med17)}).`, "Concludes negative skew, e.g. the pdf increases so long waits are more common and the tail is to the left (short waits)."],
        modelAnswer: `The mean ${sfStr(mean17)} h is less than the median ${sfStr(med17)} h, so the distribution is negatively skewed: the pdf increases with x, with a longer tail towards short waiting times.`,
        explanation: "Mean < median indicates negative skew; mean > median positive skew." }),
    ],
    explanation: "Use F(2) = 1 and the given probability for two equations, differentiate for the pdf, solve F(m) = 0.5, and integrate x f(x) for the mean.",
    hints: ["F(2) = 1 gives one equation; F(1) = 0.3 gives the other.", "E(X) needs the pdf, not the cdf."],
  });

  // --------------------------------------------------------------- flashcards
  b.card("DEFINITION", "Cumulative distribution function (cdf)", t`$F(x) = \mathrm{P}(X \le x) = \displaystyle\int_{-\infty}^{x} f(t)\,\mathrm{d}t$`);
  b.card("FORMULA", "Pdf from cdf", t`$f(x) = F'(x)$ (differentiate each piece)`);
  b.card("FORMULA", t`$\mathrm{P}(a < X \le b)$ from the cdf`, t`$F(b) - F(a)$`);
  b.card("CONCEPT", "Median and percentiles from a cdf", t`Median: solve $F(m) = 0.5$. Quartiles: $F(q) = 0.25, 0.75$. $p$th percentile: $F(x) = \frac{p}{100}$.`, "Decide which piece first; reject roots outside it.");
  b.card("CONCEPT", "Cdf of a piecewise pdf", t`On the second piece, $F(x) = F(\text{join}) + \int_{\text{join}}^{x} f(t)\,\mathrm{d}t$: carry forward the area already accumulated.`);
  b.card("FACT", "Properties of a cdf", "Continuous, non-decreasing, 0 below the range and 1 above it.");
  b.card("FACT", t`$\mathrm{P}(X = c)$ for a continuous variable`, "0 for every single value c, so < and ≤ give the same probabilities.");
  b.card("CONCEPT", "Complete answer for a cdf", t`State all pieces with intervals: $F(x) = 0$ for $x < a$, the formula on $[a, b]$, and $F(x) = 1$ for $x > b$.`);
  b.card("CONCEPT", "Skewness from mean and median", "Mean < median: negative skew. Mean > median: positive skew. Equal: symmetrical (often).");
});
