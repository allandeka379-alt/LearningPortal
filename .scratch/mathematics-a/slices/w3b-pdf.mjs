// W3b: amaths.continuous.pdf (ZIMSEC Statistics F5 6.5.1; Cambridge P6 6.3)
import { concept, P, t, chk, sfStr, integrate, root, ZS } from "../lib.mjs";

const { sqrt } = Math;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const s = (x) => sfStr(x, 4);
const area = (f, a, b) => integrate(f, a, b, 20000);

concept("amaths.continuous.pdf", { file: "continuous/pdf", keyPrefix: "continuous.pdf" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which statement is true for every probability density function $f$ of a continuous random variable $X$?`,
    options: [
      [t`$f(x) \ge 0$ for all $x$, and the total area under the graph of $f$ is 1.`, "Correct: these are the two defining properties of a pdf."],
      [t`$0 \le f(x) \le 1$ for all $x$, since $f(x)$ is a probability.`, t`$f(x)$ is a density, not a probability; it can exceed 1 (for example $f(x) = 2x$ near $x = 1$).`],
      [t`$f(x) = \mathrm{P}(X = x)$ for every value $x$ in the range of $X$.`, t`For a continuous variable $\mathrm{P}(X = x) = 0$; probabilities are areas.`],
      [t`The sum of the values of $f(x)$ over the range of $X$ equals 1.`, "Values of a continuous density cannot be summed; the integral (area) equals 1."],
    ],
    answer: "A",
    explanation: t`A pdf is non-negative and $\int f(x)\,\mathrm{d}x = 1$ over all values. Probabilities are areas: $\mathrm{P}(a < X < b) = \int_a^b f(x)\,\mathrm{d}x$.`,
  });

  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "The value of a probability density function at a point can be greater than 1.",
    answer: true,
    explanation: t`A density measures probability per unit of $x$. For example $f(x) = 4x$ on $0 \le x \le \frac{1}{\sqrt{2}}$ is a valid pdf with $f$ up to about 2.83.`,
  });

  chk(area((x) => x / 8, 0, 4), 1, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The random variable $X$ has pdf $f(x) = kx$ for $0 \le x \le 4$ and $f(x) = 0$ otherwise. Find the value of $k$.`,
    value: 0.125, wrong: [0.25, 0.0625, 8],
    explanation: t`$\int_0^4 kx\,\mathrm{d}x = k\left[\frac{x^2}{2}\right]_0^4 = 8k = 1$, so $k = \frac{1}{8} = 0.125$. (0.25 uses the width of the interval; 8 inverts the wrong way.)`,
  });

  const v4 = area((x) => x / 18, 2, 4);
  chk(v4, 1 / 3, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`$X$ has pdf $f(x) = \frac{x}{18}$ for $0 \le x \le 6$ and $0$ otherwise. Find $\mathrm{P}(2 < X < 4)$, giving your answer as a fraction or correct to 3 significant figures.`,
    value: 1 / 3, wrong: [4 / 18 - 2 / 18, 4 / 36],
    explanation: t`$\int_2^4 \frac{x}{18}\,\mathrm{d}x = \left[\frac{x^2}{36}\right]_2^4 = \frac{16 - 4}{36} = \frac{1}{3}$. (Subtracting $f(4) - f(2) = \frac{1}{9}$ uses heights, not areas.)`,
  });

  chk(area((x) => (1 + x * x) / 12, 0, 3), 1, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`$X$ has pdf $f(x) = k(1 + x^2)$ for $0 \le x \le 3$ and $0$ otherwise. Find the exact value of $k$, as a fraction.`,
    value: 1 / 12, wrong: [1 / 10, 1 / 3],
    explanation: t`$\int_0^3 k(1 + x^2)\,\mathrm{d}x = k\left[x + \frac{x^3}{3}\right]_0^3 = k(3 + 9) = 12k = 1$, so $k = \frac{1}{12}$. ($\frac{1}{10}$ comes from $f$-values $1 + 9$ rather than integrating.)`,
    hints: ["Set the total area equal to 1.", "Integrate 1 + x² term by term."],
  });

  const f6 = (x) => (3 / 8) * x * x;
  const e6 = area((x) => x * f6(x), 0, 2);
  const v6 = area((x) => x * x * f6(x), 0, 2) - e6 ** 2;
  chk(e6, 1.5, 1e-9); chk(v6, 0.15, 1e-9);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`$X$ has pdf $f(x) = \frac{3}{8}x^2$ for $0 \le x \le 2$ and $0$ otherwise. Find $\mathrm{E}(X)$ and $\mathrm{Var}(X)$.`,
    template: "E(X) = {{blank:e}}, Var(X) = {{blank:v}}",
    blanks: [D("e", 1.5, 0.001, "1"), D("v", 0.15, 0.001, "2.4")],
    explanation: t`$\mathrm{E}(X) = \int_0^2 \frac{3}{8}x^3\,\mathrm{d}x = \frac{3}{8} \times 4 = 1.5$. $\mathrm{E}(X^2) = \int_0^2 \frac{3}{8}x^4\,\mathrm{d}x = \frac{3}{8} \times \frac{32}{5} = 2.4$, so $\mathrm{Var}(X) = 2.4 - 1.5^2 = 0.15$. (2.4 is $\mathrm{E}(X^2)$, not the variance.)`,
    hints: [t`Multiply $f(x)$ by $x$, then by $x^2$, and integrate.`, t`Subtract $[\mathrm{E}(X)]^2$.`],
  });

  const m7 = 2 * sqrt(2);
  chk(area((x) => x / 8, 0, m7), 0.5, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The time, in minutes, between buses at a stop in Chitungwiza has pdf $f(x) = \frac{x}{8}$ for $0 \le x \le 4$ and $0$ otherwise. Find the median time, correct to 3 significant figures.`,
    value: m7, unit: "min", wrong: [2, 8 / 3],
    explanation: t`$\int_0^m \frac{x}{8}\,\mathrm{d}x = \frac{m^2}{16} = 0.5$, so $m^2 = 8$ and $m = 2\sqrt{2} = ${s(m7)}$, i.e. $${sfStr(m7)}$ minutes. (2 is the midpoint of the range, which is the median only for a symmetrical pdf; $\frac{8}{3}$ is the mean.)`,
    hints: ["Area from 0 to m equals 0.5."],
  });

  // k/x^3 for x ≥ 2: k = 8
  chk(8 / (2 * 4), 1, 1e-12);
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`$X$ has pdf $f(x) = \dfrac{k}{x^3}$ for $x \ge 2$ and $0$ otherwise. Find $k$ by integration, and hence find $\mathrm{P}(X > 5)$ (enter this probability).`,
    value: 0.16, wrong: [0.064, 0.84],
    explanation: t`$\int_2^\infty kx^{-3}\,\mathrm{d}x = \left[-\frac{k}{2x^2}\right]_2^\infty = \frac{k}{8} = 1$, so $k = 8$. $\mathrm{P}(X > 5) = \int_5^\infty 8x^{-3}\,\mathrm{d}x = \frac{8}{2 \times 25} = 0.16$. (0.064 is $f(5)$; 0.84 is $\mathrm{P}(X < 5)$.)`,
    hints: [t`$\int x^{-3}\,\mathrm{d}x = -\frac{1}{2}x^{-2}$.`, "As x → ∞ the term tends to 0."],
  });

  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`$X$ has pdf $f(x) = \dfrac{8}{x^3}$ for $x \ge 2$ and $0$ otherwise. Find $\mathrm{E}(X)$.`,
    value: 4, wrong: [2, 8],
    explanation: t`$\mathrm{E}(X) = \int_2^\infty x \cdot \frac{8}{x^3}\,\mathrm{d}x = \int_2^\infty 8x^{-2}\,\mathrm{d}x = \left[-\frac{8}{x}\right]_2^\infty = 0 + 4 = 4$.`,
    hints: [t`$x f(x) = 8x^{-2}$.`],
  });

  // mode of k x²(3 − x) on [0, 3]
  const g = (x) => x * x * (3 - x);
  chk(6 * 2 - 3 * 4, 0);
  chk(g(2) > g(1.9) && g(2) > g(2.1) ? 1 : 0, 1);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false, applies: ZS,
    stem: t`$X$ has pdf $f(x) = \frac{4}{27}x^2(3 - x)$ for $0 \le x \le 3$ and $0$ otherwise. What is the mode of $X$?`,
    options: [
      ["2", t`Correct: $f'(x) = \frac{4}{27}(6x - 3x^2) = 0$ at $x = 2$ (in the interval), where $f$ has a maximum, $f(2) = \frac{16}{27}$.`],
      ["1.5", "1.5 is the midpoint of the range, which is not where this skewed pdf is highest."],
      ["3", t`$f(3) = 0$; the density is zero at the right-hand end.`],
      ["0", t`$f(0) = 0$; the density is lowest there, not highest.`],
    ],
    answer: "A",
    explanation: t`The mode is where $f(x)$ is greatest. Differentiate, set $f'(x) = 0$ and check the value lies in $[0, 3]$.`,
    hints: ["Differentiate f(x) and solve f′(x) = 0."],
  });
  chk(area((x) => (4 / 27) * g(x), 0, 3), 1, 1e-9);

  // valid pdf on [0, 2]
  chk(area((x) => (3 / 8) * x * x, 0, 2), 1, 1e-9); chk(area((x) => x / 4, 0, 2), 0.5, 1e-9); chk(area((x) => x - 0.5, 0, 2), 1, 1e-9); chk(area((x) => 2 - x, 0, 2), 2, 1e-9);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Each function below is defined for $0 \le x \le 2$ and is zero elsewhere. Which one is a valid probability density function?`,
    options: [
      [t`$f(x) = \frac{3}{8}x^2$`, t`Correct: it is never negative and $\int_0^2 \frac{3}{8}x^2\,\mathrm{d}x = 1$.`],
      [t`$f(x) = \frac{1}{4}x$`, t`Non-negative, but the total area is $\frac{1}{2}$, not 1.`],
      [t`$f(x) = x - \frac{1}{2}$`, t`The area is 1, but $f(x) < 0$ for $0 \le x < \frac{1}{2}$, which is not allowed.`],
      [t`$f(x) = 2 - x$`, "Non-negative on the interval, but the area is 2."],
    ],
    answer: "A",
    explanation: "Check both conditions: non-negative everywhere, and total area exactly 1.",
    hints: ["Find each area, and check for negative values."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For a continuous random variable $X$ with pdf $f$, $\mathrm{P}(X = 2) = f(2)$.`,
    answer: false,
    explanation: t`For a continuous random variable the probability of any single value is 0 (an area of zero width). $f(2)$ is the density there, not a probability. Hence $\mathrm{P}(X \le 2) = \mathrm{P}(X < 2)$.`,
  });

  b.match({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`$X$ has pdf $f(x)$ for $0 \le x \le 3$ (and 0 elsewhere). Match each quantity with the integral or equation used to find it.`,
    pairs: [
      [t`$\mathrm{E}(X)$`, t`$\int_0^3 x f(x)\,\mathrm{d}x$`],
      [t`$\mathrm{E}(X^2)$`, t`$\int_0^3 x^2 f(x)\,\mathrm{d}x$`],
      ["the median m", t`$\int_0^m f(x)\,\mathrm{d}x = 0.5$`],
      [t`$\mathrm{P}(X > 1)$`, t`$\int_1^3 f(x)\,\mathrm{d}x$`],
    ],
    explanation: t`Means multiply by $x$ (or $x^2$) before integrating over the whole range; the median and probabilities use areas between limits.`,
    hints: ["Which quantities need an extra factor of x?"],
  });

  const uq = sqrt(2);
  chk(1 - uq ** -4, 0.75, 1e-12);
  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`$X$ has pdf $f(x) = \dfrac{4}{x^5}$ for $x \ge 1$ and $0$ otherwise. Find the upper quartile of $X$, correct to 3 significant figures.`,
    value: uq, wrong: [4 ** (1 / 5), (4 / 3) ** 0.25],
    explanation: t`$\int_1^q 4x^{-5}\,\mathrm{d}x = 1 - q^{-4} = 0.75$, so $q^{-4} = 0.25$, $q^4 = 4$ and $q = \sqrt{2} = ${sfStr(uq)}$. ($${sfStr((4 / 3) ** 0.25)}$ is the lower quartile, from $1 - q^{-4} = 0.25$.)`,
    hints: ["Integrate from 1 (the lowest value) to q.", "Set the area equal to 0.75."],
  });

  const f15 = (x) => (4 - x) / 8;
  const e15 = area((x) => x * f15(x), 0, 4);
  const var15 = area((x) => x * x * f15(x), 0, 4) - e15 ** 2;
  chk(e15, 4 / 3, 1e-9); chk(var15, 8 / 9, 1e-9);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`$X$ has pdf $f(x) = \frac{1}{8}(4 - x)$ for $0 \le x \le 4$ and $0$ otherwise. Find $\mathrm{Var}(X)$, as a fraction or correct to 3 significant figures.`,
    value: var15, wrong: [8 / 3, 8 / 3 - 4 / 3],
    explanation: t`$\mathrm{E}(X) = \frac{1}{8}\int_0^4 (4x - x^2)\,\mathrm{d}x = \frac{1}{8}\left(32 - \frac{64}{3}\right) = \frac{4}{3}$. $\mathrm{E}(X^2) = \frac{1}{8}\int_0^4 (4x^2 - x^3)\,\mathrm{d}x = \frac{1}{8}\left(\frac{256}{3} - 64\right) = \frac{8}{3}$. $\mathrm{Var}(X) = \frac{8}{3} - \frac{16}{9} = \frac{8}{9} = ${sfStr(var15)}$.`,
    workedSolution: t`1. $\mathrm{E}(X) = \frac{1}{8}\left[2x^2 - \frac{x^3}{3}\right]_0^4 = \frac{4}{3}$.
2. $\mathrm{E}(X^2) = \frac{1}{8}\left[\frac{4x^3}{3} - \frac{x^4}{4}\right]_0^4 = \frac{8}{3}$.
3. $\mathrm{Var}(X) = \frac{8}{3} - \left(\frac{4}{3}\right)^2 = \frac{8}{9}$.`,
    hints: ["Find E(X) and E(X²) separately.", "Var(X) = E(X²) − [E(X)]²."],
  });

  const m16 = 4 - 2 * sqrt(2);
  chk(area(f15, 0, m16), 0.5, 1e-9);
  b.proof({
    d: 3, skill: "APPLICATION", calculator: false, marks: 3,
    stem: t`$X$ has pdf $f(x) = \frac{1}{8}(4 - x)$ for $0 \le x \le 4$ and $0$ otherwise. Show that the median $m$ satisfies $m^2 - 8m + 8 = 0$, and hence find $m$ exactly.`,
    points: [
      t`M1 sets up $\int_0^m \frac{1}{8}(4 - x)\,\mathrm{d}x = \frac{1}{2}$.`,
      t`A1 integrates to $\frac{1}{8}\left(4m - \frac{m^2}{2}\right) = \frac{1}{2}$ and rearranges to $m^2 - 8m + 8 = 0$.`,
      t`A1 solves to $m = 4 - 2\sqrt{2}$, rejecting $4 + 2\sqrt{2}$ because it is outside $[0, 4]$.`,
    ],
    modelAnswer: t`$$
\int_0^m \tfrac{1}{8}(4 - x)\,\mathrm{d}x = \tfrac{1}{8}\left[4x - \tfrac{x^2}{2}\right]_0^m = \tfrac{1}{8}\left(4m - \tfrac{m^2}{2}\right) = \tfrac{1}{2}
$$
$$
4m - \tfrac{m^2}{2} = 4 \;\Rightarrow\; 8m - m^2 = 8 \;\Rightarrow\; m^2 - 8m + 8 = 0
$$
$$
m = \frac{8 \pm \sqrt{64 - 32}}{2} = 4 \pm 2\sqrt{2}
$$
Since $0 \le m \le 4$, $m = 4 - 2\sqrt{2} \approx 1.17$.`,
    explanation: "Set the area up to m equal to one half; a quadratic gives two roots, only one inside the range.",
    hints: ["Integrate from 0 to m and set equal to 1/2."],
  });

  b.manualShort({
    d: 3, skill: "ANALYSIS", calculator: false, marks: 2,
    stem: t`For the continuous random variable $X$ in a model of daily rainfall (in mm) at a station in Masvingo, the mean is 7.4 and the median is 4.1. Describe the shape of the pdf and explain what this means in context.`,
    points: [
      "States that the distribution is positively skewed (mean greater than median, long tail to the right).",
      "Interprets: most days have small amounts of rain, but a few days have very heavy rain, which pulls the mean up.",
    ],
    modelAnswer: "The mean (7.4 mm) is well above the median (4.1 mm), so the pdf is positively skewed with a long right-hand tail: on most days rainfall is light, but occasional very wet days raise the mean.",
    explanation: "A mean larger than the median indicates positive skew.",
    hints: ["Which way does a long tail pull the mean?"],
  });

  // ------------------------------------------------------------ structured (5 marks)
  const f18 = (x) => (x + 1) / 4;
  chk(area(f18, 0, 2), 1, 1e-9);
  const p18 = area(f18, 1, 2);
  const e18 = area((x) => x * f18(x), 0, 2);
  chk(p18, 0.625, 1e-9); chk(e18, 7 / 6, 1e-9);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`The random variable $X$ has pdf $f(x) = k(x + 1)$ for $0 \le x \le 2$ and $f(x) = 0$ otherwise.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the value of k.", value: 0.25, wrong: [1 / 3, 0.5],
        explanation: t`$k\left[\frac{x^2}{2} + x\right]_0^2 = 4k = 1$, so $k = \frac{1}{4}$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Find P(X > 1).", value: p18, wrong: [0.375],
        explanation: t`$\frac{1}{4}\left[\frac{x^2}{2} + x\right]_1^2 = \frac{1}{4}(4 - 1.5) = 0.625$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find E(X), as a fraction or correct to 3 significant figures.", value: e18, wrong: [1, 4 / 3],
        explanation: t`$\frac{1}{4}\int_0^2 (x^2 + x)\,\mathrm{d}x = \frac{1}{4}\left(\frac{8}{3} + 2\right) = \frac{7}{6} = ${sfStr(e18)}$.` }),
    ],
    explanation: "Total area 1 gives k; probabilities and the mean are integrals.",
    hints: ["Integrate x + 1 from 0 to 2.", "E(X) = ∫ x f(x) dx."],
  });

  // ------------------------------------------------------------ structured (14 marks): triangular pdf
  const f19 = (x) => (x <= 2 ? x / 6 : (6 - x) / 12);
  chk(area((x) => x / 6, 0, 2) + area((x) => (6 - x) / 12, 2, 6), 1, 1e-9);
  const p19 = area((x) => x / 6, 0, 2) + area((x) => (6 - x) / 12, 2, 3);
  chk(p19, 0.625, 1e-9);
  const e19 = area((x) => (x * x) / 6, 0, 2) + area((x) => (x * (6 - x)) / 12, 2, 6);
  chk(e19, 8 / 3, 1e-9);
  const m19 = 6 - 2 * sqrt(3);
  chk(area((x) => x / 6, 0, 2) + area((x) => (6 - x) / 12, 2, m19), 0.5, 1e-9);
  chk(root((m) => area((x) => x / 6, 0, 2) + area((x) => (6 - x) / 12, 2, m, 2000) - 0.5, 2, 6), m19, 1e-6);
  void f19;
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The time $X$ hours that a technician takes to repair a borehole pump is modelled by the pdf
$$
f(x) = \begin{cases} kx & 0 \le x \le 2, \\ \frac{1}{2}k(6 - x) & 2 < x \le 6, \\ 0 & \text{otherwise.} \end{cases}
$$`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $k = \frac{1}{6}$.`,
        points: [t`M1 adds the two areas: $\int_0^2 kx\,\mathrm{d}x + \int_2^6 \frac{1}{2}k(6 - x)\,\mathrm{d}x = 2k + 4k$ (or uses the triangle of base 6 and height $2k$).`, t`A1 sets $6k = 1$ and concludes $k = \frac{1}{6}$.`],
        modelAnswer: t`$$
\int_0^2 kx\,\mathrm{d}x = 2k, \qquad \int_2^6 \tfrac{1}{2}k(6 - x)\,\mathrm{d}x = \tfrac{1}{2}k\left[6x - \tfrac{x^2}{2}\right]_2^6 = \tfrac{1}{2}k(18 - 10) = 4k
$$
$$
2k + 4k = 1 \;\Rightarrow\; k = \tfrac{1}{6}
$$`,
        explanation: "The graph is a triangle with base 6 and height 2k, so its area 6k must be 1." }),
      P.num({ label: "(b)", marks: 2, stem: "Find the probability that a repair takes less than 3 hours.", value: p19, wrong: [area((x) => (6 - x) / 12, 2, 3), 0.5],
        explanation: t`$\mathrm{P}(X < 3) = \frac{1}{3} + \int_2^3 \frac{6 - x}{12}\,\mathrm{d}x = \frac{1}{3} + \frac{1}{12}\left[6x - \frac{x^2}{2}\right]_2^3 = \frac{1}{3} + \frac{3.5}{12} = 0.625$.` }),
      P.num({ label: "(c)", marks: 1, stem: "State the value of x at which f(x) is greatest.", value: 2, unit: "h", wrong: [3],
        explanation: "f increases on [0, 2] and decreases on [2, 6]: the peak of the triangle is at x = 2." }),
      P.num({ label: "(d)", marks: 3, stem: "Find the mean repair time, as a fraction or correct to 3 significant figures.", value: e19, unit: "h", wrong: [3, 2],
        explanation: t`$\int_0^2 \frac{x^2}{6}\,\mathrm{d}x + \int_2^6 \frac{x(6 - x)}{12}\,\mathrm{d}x = \frac{4}{9} + \frac{1}{12}\left[3x^2 - \frac{x^3}{3}\right]_2^6 = \frac{4}{9} + \frac{1}{12}\left(36 - \frac{28}{3}\right) = \frac{8}{3}$ hours.` }),
      P.num({ label: "(e)", marks: 4, stem: "Find the median repair time, correct to 3 significant figures.", value: m19, unit: "h", wrong: [6 + 2 * sqrt(3), sqrt(6)],
        explanation: t`The area up to 2 is $\frac{1}{3} < \frac{1}{2}$, so the median is in $(2, 6]$. The area to the right of $m$ is the triangle $\frac{(6 - m)^2}{24}$, so $\frac{(6 - m)^2}{24} = \frac{1}{2}$, $(6 - m)^2 = 12$, $m = 6 - 2\sqrt{3} = ${sfStr(m19)}$ hours. ($\sqrt{6}$ comes from wrongly using the first piece.)` }),
      P.manual({ label: "(f)", marks: 2, stem: "Compare the mode, median and mean, and describe the skewness of the distribution in context.",
        points: [t`Mode $2 <$ median $${sfStr(m19)} <$ mean $${sfStr(e19)}$, so the distribution is positively skewed.`, "Interprets: most repairs are fairly quick, but a few take much longer (up to 6 hours), pulling the mean up."],
        modelAnswer: `mode (2 h) < median (${sfStr(m19)} h) < mean (${sfStr(e19)} h): positive skew. Most repairs take around 2 hours, but occasional long repairs stretch the right-hand tail.`,
        explanation: "Mode < median < mean indicates positive skew." }),
    ],
    explanation: "A triangular pdf: the area condition gives k; probabilities, the mean and the median use the correct piece.",
    hints: ["Sketch the pdf: it is a triangle.", "First find the area up to x = 2 to decide which piece contains the median."],
  });

  // ------------------------------------------------------------ flashcards
  b.card("DEFINITION", "Probability density function (pdf)", t`A function with $f(x) \ge 0$ and total area 1; $\mathrm{P}(a < X < b) = \int_a^b f(x)\,\mathrm{d}x$.`);
  b.card("FORMULA", t`$\mathrm{E}(X)$ for a continuous random variable`, t`$\int x f(x)\,\mathrm{d}x$ over the range of $X$`);
  b.card("FORMULA", t`$\mathrm{Var}(X)$ for a continuous random variable`, t`$\int x^2 f(x)\,\mathrm{d}x - [\mathrm{E}(X)]^2$`);
  b.card("FORMULA", "Median m of a continuous random variable", t`$\int_{\text{lowest}}^{m} f(x)\,\mathrm{d}x = 0.5$`, "Use 0.25 and 0.75 for the quartiles.");
  b.card("FACT", t`$\mathrm{P}(X = c)$ for a continuous random variable`, "0, so P(X < c) = P(X ≤ c).");
  b.card("CONCEPT", "Mode of a continuous distribution (ZIMSEC)", t`The $x$ where $f(x)$ is greatest: solve $f'(x) = 0$ or take an end point if $f$ is monotonic.`, undefined, { applies: ZS });
  b.card("CONCEPT", "Mean greater than median for a pdf", "The distribution is positively skewed (long right-hand tail).");
  b.card("FACT", "Can f(x) exceed 1?", "Yes: f(x) is a density, not a probability. Only areas must be at most 1.");
  b.card("CONCEPT", "Finding an unknown constant k in a pdf", t`Set $\int f(x)\,\mathrm{d}x = 1$ over the whole range and solve for $k$.`);
});
