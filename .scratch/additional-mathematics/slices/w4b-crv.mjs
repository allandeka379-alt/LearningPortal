// W4b: amath.distributions.continuous-random-variables (ZIMSEC only)
import { concept, P, t, chk, integrate, F } from "../lib.mjs";

const I = (f, a, b) => integrate(f, a, b, 4000);

concept("amath.distributions.continuous-random-variables", { file: "distributions/continuous-random-variables", keyPrefix: "distributions.continuous-random-variables" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which pair of conditions must a probability density function $f(x)$ satisfy?`,
    options: [
      [t`$f(x) \geq 0$ for all $x$, and the total area under the graph is 1`, "Correct: densities are never negative and the total probability is 1."],
      [t`$0 \leq f(x) \leq 1$ for all $x$, and $f$ is increasing`, "A density can exceed 1 at some points, and it need not increase."],
      [t`$f(x) > 0$ for all $x$, and $f(0) = 1$`, "f(x) is 0 outside the range of X, and f(0) can be any non-negative value."],
      [t`The values of $f(x)$ add up to 1`, "For a continuous variable the area (an integral), not a sum of values, equals 1."],
    ],
    answer: "A",
    explanation: t`A pdf satisfies $f(x) \geq 0$ and $\int f(x)\,dx = 1$ over the range of $X$. Probabilities are areas under its graph.`,
  });

  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`For a continuous random variable $X$ with pdf $f$, $P(X = 2) = f(2)$.`,
    answer: false,
    explanation: t`False. For a continuous variable every single value has probability 0: $P(X = 2) = \int_2^2 f(x)\,dx = 0$. $f(2)$ is a density, the height of the graph.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For a continuous random variable, $P(X < 3) = P(X \leq 3)$.`,
    answer: true,
    explanation: t`True. They differ by $P(X = 3)$, which is 0 for a continuous random variable.`,
  });

  {
    const k = 1 / I((x) => x, 0, 5);
    chk(k, 0.08, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`$X$ has pdf $f(x) = kx$ for $0 \leq x \leq 5$, and $f(x) = 0$ otherwise. Find $k$, as a fraction or a decimal.`,
      value: 0.08, wrong: [0.2, 0.04],
      explanation: t`$\int_0^5 kx\,dx = k\Big[\frac{x^2}{2}\Big]_0^5 = 12.5k = 1$, so $k = \frac{2}{25} = 0.08$. The answer 0.04 forgets to divide $x^2$ by 2.`,
    });
  }

  {
    const v = I((x) => x / 2, 0, 1);
    chk(v, 0.25, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`$X$ has pdf $f(x) = \dfrac{x}{2}$ for $0 \leq x \leq 2$, and $f(x) = 0$ otherwise. Find $P(X < 1)$.`,
      value: 0.25, wrong: [0.5, 0.75],
      explanation: t`$P(X < 1) = \int_0^1 \frac{x}{2}\,dx = \Big[\frac{x^2}{4}\Big]_0^1 = \frac{1}{4}$. Although 1 is half-way, less than half the probability lies below it because the density increases.`,
    });
  }

  {
    const v = I((x) => (3 * x * x) / 64, 2, 4);
    chk(v, 0.875, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`$X$ has pdf $f(x) = \dfrac{3x^2}{64}$ for $0 \leq x \leq 4$. Find $P(X > 2)$, as a fraction or a decimal.`,
      value: v, wrong: [0.125, 0.5],
      explanation: t`$P(X > 2) = \Big[\frac{x^3}{64}\Big]_2^4 = \frac{64 - 8}{64} = \frac{7}{8} = 0.875$. 0.125 is $P(X < 2)$.`,
      hints: [t`$\int \frac{3x^2}{64}\,dx = \frac{x^3}{64}$.`],
    });
  }

  {
    const v = I((x) => x * 2 * x, 0, 1);
    chk(v, 2 / 3, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`$X$ has pdf $f(x) = 2x$ for $0 \leq x \leq 1$. Find $E(X)$, as a fraction or correct to 3 significant figures.`,
      value: v, wrong: [0.5, 1],
      explanation: t`$E(X) = \int_0^1 x \cdot 2x\,dx = \Big[\frac{2x^3}{3}\Big]_0^1 = \frac{2}{3}$. The answer 1 is $\int_0^1 2x\,dx$, the total area, which forgets the factor $x$.`,
      hints: [t`Integrate $x f(x)$, not $f(x)$.`],
    });
  }

  {
    const v = I((x) => (x + 1) / 4, 0, 1);
    chk(v, 0.375, 1e-9);
    chk(I((x) => (x + 1) / 4, 0, 2), 1, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The pdf of $X$ is $f(x) = \dfrac{x + 1}{4}$ for $0 \leq x \leq 2$. Find $P(X < 1)$, as a fraction or a decimal.`,
      value: v, wrong: [0.5, 0.25],
      explanation: t`$\int_0^1 \frac{x + 1}{4}\,dx = \frac{1}{4}\Big[\frac{x^2}{2} + x\Big]_0^1 = \frac{1}{4} \times \frac{3}{2} = \frac{3}{8}$.`,
      hints: ["Integrate from 0 to 1."],
    });
  }

  {
    const m = 2 / 3, m2 = I((x) => x * x * 2 * x, 0, 1), v = m2 - m * m;
    chk(m2, 0.5, 1e-9); chk(v, 1 / 18, 1e-9);
    b.num({
      d: 4, skill: "APPLICATION", calculator: false,
      stem: t`$X$ has pdf $f(x) = 2x$ for $0 \leq x \leq 1$, and $E(X) = \frac{2}{3}$. Find $\operatorname{Var}(X)$, as a fraction or correct to 3 significant figures.`,
      value: v, wrong: [0.5, 0.5 - 2 / 3],
      explanation: t`$E(X^2) = \int_0^1 2x^3\,dx = \Big[\frac{x^4}{2}\Big]_0^1 = \frac{1}{2}$. $\operatorname{Var}(X) = \frac{1}{2} - \frac{4}{9} = \frac{1}{18} \approx 0.0556$. Subtracting $\frac{2}{3}$ without squaring gives a negative number, which a variance can never be.`,
      hints: [t`$E(X^2) = \int x^2 f(x)\,dx$.`],
    });
  }

  {
    const k = 1 / I((x) => 9 - x * x, 0, 3);
    chk(k, 1 / 18, 1e-9);
    const m = I((x) => (x * (9 - x * x)) / 18, 0, 3);
    chk(m, 1.125, 1e-9);
    b.fib({
      d: 4, skill: "APPLICATION", calculator: false,
      stem: t`$X$ has pdf $f(x) = k(9 - x^2)$ for $0 \leq x \leq 3$, and $f(x) = 0$ otherwise. Find $k$ (as a fraction) and $E(X)$.`,
      template: "k = {{blank:k}}; E(X) = {{blank:m}}",
      blanks: [
        { id: "k", input: "number", accepted: ["1/18"], tolerance: 0.0005, wrong: "1/27" },
        { id: "m", input: "number", accepted: [1.125], tolerance: 0.0005, wrong: "1.5" },
      ],
      explanation: t`$\int_0^3 (9 - x^2)\,dx = 27 - 9 = 18$, so $k = \frac{1}{18}$. $E(X) = \frac{1}{18}\int_0^3 (9x - x^3)\,dx = \frac{1}{18}\left(\frac{81}{2} - \frac{81}{4}\right) = \frac{1}{18} \times \frac{81}{4} = \frac{9}{8} = 1.125$. The mean is below 1.5 because the density decreases.`,
      hints: ["Total area = 1 gives k.", t`$E(X) = \int_0^3 x f(x)\,dx$.`],
    });
  }

  {
    const k = 1 / I((x) => x ** 3, 0, 2);
    chk(k, 0.25, 1e-9);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`$X$ has pdf $f(x) = kx^3$ for $0 \leq x \leq 2$, and $f(x) = 0$ otherwise. Find $k$.`,
      options: [
        [t`$\frac{1}{4}$`, t`Correct: $k\Big[\frac{x^4}{4}\Big]_0^2 = 4k = 1$.`],
        [t`$\frac{1}{8}$`, t`This sets $k \times 2^3 = 1$, using $f(2)$ instead of the area.`],
        [t`$\frac{1}{16}$`, t`This uses $x^4$ without dividing by 4.`],
        ["4", "This is 1/k: the area is 4k, so k is its reciprocal."],
      ],
      answer: "A",
      explanation: t`$\int_0^2 kx^3\,dx = k \times \frac{16}{4} = 4k = 1$, so $k = \frac{1}{4}$.`,
      hints: ["Set the total area equal to 1."],
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The pdf of $X$ is non-zero only for $1 \leq x \leq 5$, and its graph is symmetrical about the line $x = 3$. What is $E(X)$?`,
    options: [
      ["3", "Correct: for a symmetrical pdf the mean is on the line of symmetry."],
      ["2.5", "This is the mean of 0 and 5; the interval starts at 1."],
      ["4", "4 is the length of the interval, not its centre."],
      ["It cannot be found without the formula for f(x)", "Symmetry alone fixes the mean at the centre."],
    ],
    answer: "A",
    explanation: "When f is symmetrical about x = c, values above and below c balance, so E(X) = c = 3.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$X$ has pdf $f(x)$ for $0 \leq x \leq 4$. Match each quantity with the integral that gives it.`,
    pairs: [
      [t`$P(1 < X < 2)$`, t`$\displaystyle\int_1^2 f(x)\,dx$`],
      [t`$E(X)$`, t`$\displaystyle\int_0^4 x f(x)\,dx$`],
      [t`$E(X^2)$`, t`$\displaystyle\int_0^4 x^2 f(x)\,dx$`],
      ["The total probability, 1", t`$\displaystyle\int_0^4 f(x)\,dx$`],
    ],
    explanation: "Probabilities integrate f over an interval; E(X) and E(X²) multiply f by x and x² and integrate over the whole range.",
  });

  {
    chk(I((x) => x * (2 - x), 0, 2), 4 / 3, 1e-9);
    b.proof({
      d: 3, skill: "APPLICATION", calculator: false, marks: 3,
      stem: t`$X$ has pdf $f(x) = kx(2 - x)$ for $0 \leq x \leq 2$, and $f(x) = 0$ otherwise. Show that $k = \dfrac{3}{4}$.`,
      points: [
        t`M1 sets $\int_0^2 k(2x - x^2)\,dx = 1$.`,
        t`M1 integrates correctly: $k\Big[x^2 - \frac{x^3}{3}\Big]_0^2$.`,
        t`A1 obtains $\frac{4}{3}k = 1$, so $k = \frac{3}{4}$.`,
      ],
      modelAnswer: t`$$
\int_0^2 k(2x - x^2)\,dx = k\Big[x^2 - \frac{x^3}{3}\Big]_0^2 = k\left(4 - \frac{8}{3}\right) = \frac{4}{3}k
$$

$$
\frac{4}{3}k = 1 \Rightarrow k = \frac{3}{4}
$$`,
      explanation: "The total area under a pdf is 1.",
      hints: ["Expand x(2 − x) before integrating."],
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: t`$X$ has pdf $f(x) = \dfrac{3x^2}{8}$ for $0 \leq x \leq 2$, and $f(x) = 0$ otherwise. Describe the sketch of $y = f(x)$ that you would draw.`,
    points: [
      t`A curve (part of a parabola) starting at the origin $(0, 0)$, touching the $x$-axis there.`,
      t`Increasing to the point $(2, 1.5)$ at the right-hand end of the interval.`,
      t`$f(x) = 0$ (along the $x$-axis) for $x < 0$ and $x > 2$, so the graph drops vertically to 0 at $x = 2$.`,
    ],
    modelAnswer: t`For $0 \leq x \leq 2$ the graph is the right half of a U-shaped parabola, starting at $(0, 0)$ and rising to $(2, 1.5)$. Outside this interval the graph lies along the $x$-axis, so it drops from $(2, 1.5)$ to $(2, 0)$. The area under the curve is 1.`,
    explanation: t`At $x = 2$, $f(2) = \frac{3 \times 4}{8} = 1.5$; the density can be above 1 because only the area must equal 1.`,
    hints: [t`Work out $f(0)$ and $f(2)$.`],
  });

  {
    const m = I((x) => x * 3 * x * x, 0, 1);
    chk(m, 0.75, 1e-9);
    const v = I((x) => 3 * x * x, 0.75, 1);
    chk(v, 37 / 64, 1e-9);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`$X$ has pdf $f(x) = 3x^2$ for $0 \leq x \leq 1$. Find $E(X)$, and hence find $P(X > E(X))$. Give the probability as a fraction or correct to 3 significant figures.`,
      value: v, wrong: [27 / 64, 0.5],
      explanation: t`$E(X) = \int_0^1 3x^3\,dx = \frac{3}{4}$. $P\left(X > \frac{3}{4}\right) = \Big[x^3\Big]_{3/4}^{1} = 1 - \frac{27}{64} = \frac{37}{64} \approx 0.578$. It is not 0.5: the mean is not the "half-way" value of the probability unless the pdf is symmetrical.`,
      hints: ["Find E(X) first.", t`Then integrate $f$ from $E(X)$ to 1.`],
    });
  }

  {
    const k = 1 / I((x) => 3 * x - x * x, 0, 3);
    chk(k, 2 / 9, 1e-9);
    const f = (x) => k * (3 * x - x * x);
    const p1 = I(f, 0, 1), m = I((x) => x * f(x), 0, 3), m2 = I((x) => x * x * f(x), 0, 3);
    chk(p1, 7 / 27, 1e-9); chk(m, 1.5, 1e-9); chk(m2, 2.7, 1e-9);
    const v = m2 - m * m;
    chk(v, 0.45, 1e-9);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: false, examStyle: true,
      stem: t`The random variable $X$ has pdf $f(x) = kx(3 - x)$ for $0 \leq x \leq 3$, and $f(x) = 0$ otherwise.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that $k = \dfrac{2}{9}$.`,
          points: [t`M1 $\int_0^3 k(3x - x^2)\,dx = k\Big[\frac{3x^2}{2} - \frac{x^3}{3}\Big]_0^3 = 1$.`, t`A1 $k(13.5 - 9) = 4.5k = 1$, so $k = \frac{2}{9}$.`],
          modelAnswer: t`$$
k\Big[\frac{3x^2}{2} - \frac{x^3}{3}\Big]_0^3 = k\left(\frac{27}{2} - 9\right) = \frac{9}{2}k = 1 \Rightarrow k = \frac{2}{9}
$$`,
          explanation: "Total area = 1." }),
        P.num({ label: "(b)", marks: 2, stem: t`Find $P(X < 1)$, as a fraction or correct to 3 significant figures.`, value: p1, wrong: [1 / 3, 7 / 6],
          explanation: t`$\frac{2}{9}\Big[\frac{3x^2}{2} - \frac{x^3}{3}\Big]_0^1 = \frac{2}{9} \times \frac{7}{6} = \frac{7}{27} \approx 0.259$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Write down $E(X)$.`, value: m, wrong: [3],
          explanation: t`The graph of $f$ is symmetrical about $x = 1.5$, so $E(X) = 1.5$.` }),
        P.num({ label: "(d)", marks: 3, stem: t`Find $\operatorname{Var}(X)$.`, value: v, wrong: [2.7, 2.7 - 1.5],
          explanation: t`$E(X^2) = \frac{2}{9}\int_0^3 (3x^3 - x^4)\,dx = \frac{2}{9}\left(\frac{243}{4} - \frac{243}{5}\right) = \frac{2}{9} \times \frac{243}{20} = 2.7$. $\operatorname{Var}(X) = 2.7 - 1.5^2 = 0.45$.` }),
        P.num({ label: "(e)", marks: 1, stem: t`Use symmetry to find $P(X < 2)$, as a fraction or correct to 3 significant figures.`, value: 1 - p1, wrong: [1 - 2 * p1, 2 * p1],
          explanation: t`By symmetry about $x = 1.5$, $P(X > 2) = P(X < 1) = \frac{7}{27}$, so $P(X < 2) = 1 - \frac{7}{27} = \frac{20}{27} \approx 0.741$.` }),
      ],
      explanation: "Use total area 1 for k, integrate for probabilities and E(X²), and use the symmetry of the parabola for E(X).",
      hints: ["The graph is an upside-down parabola with roots 0 and 3.", t`$\operatorname{Var}(X) = E(X^2) - [E(X)]^2$.`],
    });
  }

  {
    const f = (x) => x / 18;
    chk(I(f, 0, 6), 1, 1e-9);
    const p4 = I(f, 4, 6), m = I((x) => x * f(x), 0, 6), m2 = I((x) => x * x * f(x), 0, 6);
    chk(p4, 5 / 9, 1e-9); chk(m, 4, 1e-9); chk(m2, 18, 1e-9);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: false, examStyle: true,
      stem: t`The time, $X$ minutes, that Rudo waits for a kombi in Harare has pdf $f(x) = \dfrac{x}{18}$ for $0 \leq x \leq 6$, and $f(x) = 0$ otherwise.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the probability that she waits more than 4 minutes, as a fraction or correct to 3 significant figures.", value: p4, wrong: [4 / 9, 1 / 3],
          explanation: t`$\Big[\frac{x^2}{36}\Big]_4^6 = \frac{36 - 16}{36} = \frac{5}{9} \approx 0.556$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the mean waiting time.", value: m, unit: "min", wrong: [3, 1],
          explanation: t`$E(X) = \int_0^6 \frac{x^2}{18}\,dx = \Big[\frac{x^3}{54}\Big]_0^6 = \frac{216}{54} = 4$ minutes. 3 is the middle of the interval, which ignores the shape of $f$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find $\operatorname{Var}(X)$.`, value: m2 - m * m, wrong: [18, 14],
          explanation: t`$E(X^2) = \int_0^6 \frac{x^3}{18}\,dx = \frac{1296}{72} = 18$, so $\operatorname{Var}(X) = 18 - 16 = 2$.` }),
        P.tf({ label: "(d)", marks: 1, stem: "Waiting times close to 0 minutes are more likely than waiting times close to 6 minutes.", answer: false,
          explanation: t`False: $f(x) = \frac{x}{18}$ increases, so longer waits near 6 minutes have the higher density.` }),
      ],
      explanation: "Integrate f for probabilities, x f for the mean and x² f for E(X²).",
      hints: [t`$\int \frac{x}{18}\,dx = \frac{x^2}{36}$.`],
    });
  }

  // flashcards
  b.card("DEFINITION", "Continuous random variable", "A random variable that can take any value in an interval, e.g. a waiting time or a mass.");
  b.card("DEFINITION", "Probability density function", t`A function with $f(x) \geq 0$ and total area 1 under its graph; probabilities are areas.`);
  b.card("FORMULA", "Probability from a pdf", t`$P(a < X < b) = \displaystyle\int_a^b f(x)\,dx$`);
  b.card("FORMULA", "Mean of a continuous random variable", t`$E(X) = \displaystyle\int x f(x)\,dx$`);
  b.card("FORMULA", "Variance of a continuous random variable", t`$\operatorname{Var}(X) = \displaystyle\int x^2 f(x)\,dx - [E(X)]^2$`);
  b.card("FACT", "Single values", t`For a continuous variable $P(X = a) = 0$, so $P(X < a) = P(X \leq a)$.`);
  b.card("CONCEPT", "Finding k in a pdf", t`Integrate $f(x)$ over its whole range and set the result equal to 1.`);
  b.card("CONCEPT", "Symmetry and the mean", t`If the pdf is symmetrical about $x = c$, then $E(X) = c$.`);
  b.card("FACT", "Density above 1", t`$f(x)$ can be greater than 1 at some points (e.g. $\frac{3x^2}{8}$ at $x = 2$ is 1.5); only the total area must be 1.`);
});
