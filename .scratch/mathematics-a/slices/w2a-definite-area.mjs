// W2a: amaths.integ.definite-area (definite and simple improper integrals, areas; both boards).
import { concept, P, t, chk, same, integrate, quad, checkAntideriv } from "../lib.mjs";

const { sqrt, abs } = Math;
const I = (f, a, b, label, exact) => chk(integrate(f, a, b), exact, 1e-7 * Math.max(1, abs(exact)), label);

concept("amaths.integ.definite-area", { file: "integ/definite-area", keyPrefix: "integ.definite-area" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`If $F'(x) = f(x)$, which expression equals $\displaystyle\int_{a}^{b} f(x)\,dx$?`,
    options: [
      [t`$F(b) - F(a)$`, "Correct: upper limit minus lower limit."],
      [t`$F(a) - F(b)$`, "This is the negative of the definite integral."],
      [t`$F(b) + F(a)$`, "The value at the lower limit is subtracted, not added."],
      [t`$F(b) - F(a) + c$`, "The constant cancels in the subtraction, so a definite integral has no + c."],
    ],
    answer: "A",
    explanation: t`$\int_{a}^{b} f(x)\,dx = \Big[F(x)\Big]_{a}^{b} = F(b) - F(a)$.`,
  });

  const v2 = I((x) => 3 * x * x + 1, 0, 2, "q2", 10);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Evaluate $\displaystyle\int_{0}^{2}(3x^{2} + 1)\,dx$.`,
    value: v2, wrong: [8, 13],
    explanation: t`$\Big[x^{3} + x\Big]_{0}^{2} = (8 + 2) - 0 = 10$.`,
  });

  const v3 = I(sqrt, 1, 9, "q3", 52 / 3);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate $\displaystyle\int_{1}^{9}\sqrt{x}\,dx$, correct to 3 significant figures.`,
    value: v3, wrong: [18, 26],
    explanation: t`$\Big[\tfrac{2}{3}x^{\frac{3}{2}}\Big]_{1}^{9} = \tfrac{2}{3}(27 - 1) = \tfrac{52}{3} \approx 17.3$. (18 forgets to subtract the lower limit.)`,
  });

  const v4 = I((x) => (2 * x - 1) ** 3, 1, 2, "q4", 10);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate $\displaystyle\int_{1}^{2}(2x - 1)^{3}\,dx$.`,
    value: v4, wrong: [20, 40],
    explanation: t`$\Big[\tfrac{(2x - 1)^{4}}{8}\Big]_{1}^{2} = \tfrac{81 - 1}{8} = 10$. (20 divides by 4 only, forgetting the factor 2.)`,
    hints: ["Divide by the new power 4 and by the coefficient 2."],
  });

  I((x) => x ** 3, -1, 1, "q5", 0);
  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\displaystyle\int_{-1}^{1} x^{3}\,dx = 0$. What does this tell you about the region between $y = x^{3}$ and the $x$-axis from $x = -1$ to $x = 1$?`,
    options: [
      ["The parts above and below the axis have equal areas, which cancel", "Correct: each part has area 1/4, with opposite signs."],
      ["The region has zero area", "The region has total area 1/2; the integral counts the part below the axis as negative."],
      ["The curve lies entirely on the x-axis", "y = x³ is zero only at the origin."],
      ["The integral cannot be evaluated across x = 0, where x³ changes sign", "x³ is continuous everywhere, so the integral is fine; it just equals 0."],
    ],
    answer: "A",
    explanation: t`$\int_{0}^{1} x^{3}\,dx = \frac{1}{4}$ and $\int_{-1}^{0} x^{3}\,dx = -\frac{1}{4}$. They cancel in one integral, but the total area is $\frac{1}{2}$.`,
    hints: ["Where is x³ negative?"],
  });

  const v6 = I((x) => 3 * x - x * x, 0, 3, "q6", 4.5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the area of the region enclosed by the curve $y = 3x - x^{2}$ and the $x$-axis.`,
    value: v6, unit: "units²", wrong: [13.5, 9],
    explanation: t`The curve meets the axis at $x = 0$ and $x = 3$. Area $= \Big[\tfrac{3x^{2}}{2} - \tfrac{x^{3}}{3}\Big]_{0}^{3} = 13.5 - 9 = 4.5$.`,
    hints: ["Find the limits from where y = 0."],
  });

  same(quad.roots(1, -2, -3), [-1, 3]);
  const v7 = I((x) => x * x - 2 * x - 3, -1, 3, "q7", -32 / 3);
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`The region $R$ is bounded by the curve $y = x^{2} - 2x - 3$ and the $x$-axis. Find the area of $R$, correct to 3 significant figures.`,
    value: -v7, unit: "units²", wrong: [-10.7, 9],
    explanation: t`Roots $x = -1$ and $x = 3$; the curve is below the axis between them. $\int_{-1}^{3}(x^{2} - 2x - 3)\,dx = \Big[\tfrac{x^{3}}{3} - x^{2} - 3x\Big]_{-1}^{3} = -9 - \tfrac{5}{3} = -\tfrac{32}{3}$. Area $= \tfrac{32}{3} \approx 10.7$.`,
    hints: ["Factorise to find the limits.", "An area is positive even when the integral is negative."],
  });

  same(quad.roots(1, -1, -6), [-2, 3]);
  const v8 = I((x) => x + 6 - x * x, -2, 3, "q8", 125 / 6);
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Find the area of the region enclosed by the curve $y = x^{2}$ and the line $y = x + 6$, correct to 3 significant figures.`,
    value: v8, unit: "units²", wrong: [-20.8, 31.7],
    explanation: t`$x^{2} = x + 6$ at $x = -2$ and $x = 3$; the line is above. Area $= \Big[\tfrac{x^{2}}{2} + 6x - \tfrac{x^{3}}{3}\Big]_{-2}^{3} = 13.5 - (-\tfrac{22}{3}) = \tfrac{125}{6} \approx 20.8$.`,
    hints: ["Integrate (line − curve) between the intersections."],
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate the improper integral $\displaystyle\int_{1}^{\infty}\frac{6}{x^{4}}\,dx$.`,
    value: 2, wrong: [-2, 1.5],
    explanation: t`$\int_{1}^{N} 6x^{-4}\,dx = \Big[-2x^{-3}\Big]_{1}^{N} = 2 - \tfrac{2}{N^{3}} \to 2$ as $N \to \infty$.`,
    hints: ["Replace ∞ by N, then let N → ∞."],
  });
  chk(integrate((x) => 6 / x ** 4, 1, 1000, 400000), 2 - 2 / 1e9, 1e-6, "q9");

  checkAntideriv((x) => 3 * Math.cbrt(x), (x) => x ** (-2 / 3), 1, 8, "q10");
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate $\displaystyle\int_{0}^{8} x^{-\frac{2}{3}}\,dx$.`,
    value: 6, wrong: [2, 0.6],
    explanation: t`$x^{-\frac{2}{3}}$ is unbounded at 0, but $\int_{\varepsilon}^{8} x^{-\frac{2}{3}}\,dx = \Big[3x^{\frac{1}{3}}\Big]_{\varepsilon}^{8} = 6 - 3\varepsilon^{\frac{1}{3}} \to 6$.`,
    hints: [t`Integrate: $x^{1/3} \div \frac{1}{3}$.`],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\displaystyle\int_{1}^{\infty}\frac{1}{x}\,dx$ has a finite value.`,
    answer: false,
    explanation: t`False. $\int_{1}^{N}\frac{1}{x}\,dx = \ln N$, which increases without limit as $N \to \infty$. By contrast $\int_{1}^{\infty}\frac{1}{x^{2}}\,dx = 1$.`,
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $f(x) < 0$ for all $x$ between $a$ and $b$ (with $a < b$), then $\displaystyle\int_{a}^{b} f(x)\,dx$ is negative.`,
    answer: true,
    explanation: t`True. The heights are negative throughout, so the integral is negative; the area of the region is its absolute value.`,
    hints: ["Think of the integral as a signed area."],
  });

  I((x) => 2 * x, 0, 3, "q13a", 9);
  I((x) => 1 / (x * x), 1, 2, "q13b", 0.5);
  I((x) => x * x - 1, 0, 3, "q13c", 6);
  I((x) => 4 * x ** 3, -1, 1, "q13d", 0);
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each definite integral with its value.",
    pairs: [
      [t`$\displaystyle\int_{0}^{3} 2x\,dx$`, "9"],
      [t`$\displaystyle\int_{1}^{2}\frac{1}{x^{2}}\,dx$`, t`$\frac{1}{2}$`],
      [t`$\displaystyle\int_{0}^{3}(x^{2} - 1)\,dx$`, "6"],
      [t`$\displaystyle\int_{-1}^{1} 4x^{3}\,dx$`, "0"],
    ],
    explanation: t`$[x^{2}]_{0}^{3} = 9$; $[-\frac{1}{x}]_{1}^{2} = \frac{1}{2}$; $[\frac{x^{3}}{3} - x]_{0}^{3} = 6$; $[x^{4}]_{-1}^{1} = 0$.`,
  });

  const v14 = I((y) => Math.cbrt(y), 1, 8, "q14", 11.25);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: false, unit: "units²",
    stem: t`Find the area of the region bounded by the curve $y = x^{3}$, the $y$-axis and the lines $y = 1$ and $y = 8$, as an exact decimal.`,
    value: v14, dp: 2, wrong: [3.75, 15],
    explanation: t`Integrate with respect to $y$: $x = y^{\frac{1}{3}}$. Area $= \int_{1}^{8} y^{\frac{1}{3}}\,dy = \Big[\tfrac{3}{4}y^{\frac{4}{3}}\Big]_{1}^{8} = \tfrac{3}{4}(16 - 1) = 11.25$.`,
    workedSolution: [
      t`1. The region is against the $y$-axis, so area $= \int x\,dy$ with $x = y^{\frac{1}{3}}$.`,
      t`2. $\int_{1}^{8} y^{\frac{1}{3}}\,dy = \Big[\tfrac{3}{4}y^{\frac{4}{3}}\Big]_{1}^{8}$.`,
      t`3. $8^{\frac{4}{3}} = 16$ and $1^{\frac{4}{3}} = 1$, so the area is $\tfrac{3}{4} \times 15 = 11.25$.`,
    ].join("\n"),
    hints: ["Write x in terms of y.", "8^(4/3) = 16."],
  });

  const half = I((x) => x * (x - 1) * (x - 2), 0, 1, "q15", 0.25);
  I((x) => x * (x - 1) * (x - 2), 0, 2, "q15 total", 0);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the total area enclosed between the curve $y = x(x - 1)(x - 2)$ and the $x$-axis for $0 \leq x \leq 2$.`,
    options: [
      [t`$\tfrac{1}{2}$`, "Correct: 1/4 above the axis on [0, 1] and 1/4 below on [1, 2]."],
      [t`$0$`, "This is the single integral from 0 to 2, where the two parts cancel."],
      [t`$\tfrac{1}{4}$`, "This is only the part between x = 0 and x = 1."],
      [t`$1$`, t`Each part has area $\frac{1}{4}$, so the total is $\frac{1}{2}$, not 1.`],
    ],
    answer: "A",
    explanation: t`$y = x^{3} - 3x^{2} + 2x$. $\int_{0}^{1} y\,dx = \Big[\tfrac{x^{4}}{4} - x^{3} + x^{2}\Big]_{0}^{1} = \tfrac{1}{4}$ and, by symmetry, $\int_{1}^{2} y\,dx = -\tfrac{1}{4}$. Total area $= \tfrac{1}{4} + \tfrac{1}{4} = \tfrac{1}{2}$.`,
    hints: ["The curve crosses the axis at x = 1: split there."],
  });
  chk(2 * half, 0.5, 1e-12);

  same(quad.roots(1, 1, -20), [-5, 4]);
  I((x) => 2 * x + 1, 1, 4, "q16", 18);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Given that $\displaystyle\int_{1}^{k}(2x + 1)\,dx = 18$, where $k > 1$, find $k$.`,
    value: 4, prefix: "k =", wrong: [-5, 3],
    explanation: t`$\Big[x^{2} + x\Big]_{1}^{k} = k^{2} + k - 2 = 18$, so $k^{2} + k - 20 = (k + 5)(k - 4) = 0$. Since $k > 1$, $k = 4$.`,
    hints: ["Form a quadratic in k.", "Reject the root that does not satisfy k > 1."],
  });

  I((x) => (x - 1) / sqrt(x), 1, 4, "q17", 8 / 3);
  b.proof({
    d: 3, skill: "APPLICATION", marks: 3, calculator: false,
    stem: t`Show that $\displaystyle\int_{1}^{4}\frac{x - 1}{\sqrt{x}}\,dx = \frac{8}{3}$.`,
    points: [
      t`M1 writes the integrand as $x^{\frac{1}{2}} - x^{-\frac{1}{2}}$`,
      t`A1 integrates to $\Big[\tfrac{2}{3}x^{\frac{3}{2}} - 2x^{\frac{1}{2}}\Big]$`,
      t`A1 substitutes the limits correctly to obtain $\tfrac{8}{3}$`,
    ],
    modelAnswer: ["$$", t`\int_{1}^{4}\left(x^{\frac{1}{2}} - x^{-\frac{1}{2}}\right)dx = \Big[\tfrac{2}{3}x^{\frac{3}{2}} - 2x^{\frac{1}{2}}\Big]_{1}^{4}`, "$$", "", "$$", t`= \left(\tfrac{16}{3} - 4\right) - \left(\tfrac{2}{3} - 2\right) = \tfrac{4}{3} + \tfrac{4}{3} = \tfrac{8}{3}`, "$$"].join("\n"),
    explanation: "Divide each term of the numerator by √x before integrating.",
    hints: ["Split the fraction into two powers of x."],
  });

  // struct 5: y = 4 − x², y = x + 2: x = −2, 1; area 4.5
  same(quad.roots(1, 1, -2), [-2, 1]);
  const v18 = I((x) => 2 - x - x * x, -2, 1, "q18", 4.5);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`The curve $y = 4 - x^{2}$ and the line $y = x + 2$ intersect at two points.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the x-coordinates of the points of intersection, smaller first.", template: "x = {{blank:a}} and x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-2], wrong: 2 }, { id: "b", input: "number", accepted: [1], wrong: -1 }],
        explanation: t`$4 - x^{2} = x + 2$ gives $x^{2} + x - 2 = (x + 2)(x - 1) = 0$.` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the area of the region enclosed by the curve and the line, as an exact decimal.", unit: "units²", value: v18, wrong: [-4.5, 7.5],
        explanation: t`Area $= \int_{-2}^{1}(4 - x^{2} - x - 2)\,dx = \Big[2x - \tfrac{x^{2}}{2} - \tfrac{x^{3}}{3}\Big]_{-2}^{1} = \tfrac{7}{6} - (-\tfrac{10}{3}) = 4.5$.` }),
    ],
    explanation: "Intersections give the limits; integrate the upper graph minus the lower graph.",
    hints: ["Set the two expressions equal.", "Check which graph is on top at x = 0."],
  });

  // struct 5: y = 8/x², x from 1 to 4: area 6; split at a = 1.6; tail area 2
  const v19 = I((x) => 8 / (x * x), 1, 4, "q19", 6);
  I((x) => 8 / (x * x), 1, 1.6, "q19 half", 3);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The region $R$ is bounded by the curve $y = \dfrac{8}{x^{2}}$, the $x$-axis and the lines $x = 1$ and $x = 4$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the area of R.", unit: "units²", value: v19, wrong: [10],
        explanation: t`$\Big[-\tfrac{8}{x}\Big]_{1}^{4} = -2 + 8 = 6$.` }),
      P.num({ label: "(b)", marks: 2, stem: "The line x = a divides R into two regions of equal area. Find a, as an exact decimal.", prefix: "a =", value: 1.6, dp: 1, wrong: [2.5],
        explanation: t`$\int_{1}^{a}\frac{8}{x^{2}}\,dx = 8 - \frac{8}{a} = 3$, so $\frac{8}{a} = 5$ and $a = 1.6$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Find the area of the unbounded region between the curve, the x-axis and the line x = 4 (to the right of x = 4).", unit: "units²", value: 2, wrong: [0],
        explanation: t`$\int_{4}^{\infty}\frac{8}{x^{2}}\,dx = \lim_{N \to \infty}\left(\tfrac{8}{4} - \tfrac{8}{N}\right) = 2$.` }),
    ],
    explanation: "A definite integral, an equation in an unknown limit, and an improper integral with an infinite limit.",
    hints: ["Integrate 8x⁻² to −8x⁻¹.", "For (b), set the integral from 1 to a equal to half of (a)."],
  });

  b.card("FORMULA", "Definite integral", t`$\displaystyle\int_{a}^{b} f(x)\,dx = F(b) - F(a)$, where $F' = f$`);
  b.card("CONCEPT", "Region below the x-axis", "The integral is negative; the area is its absolute value. Split at the roots for regions on both sides.");
  b.card("FORMULA", "Area between two graphs", t`$\displaystyle\int_{a}^{b}(y_{\text{upper}} - y_{\text{lower}})\,dx$ between the intersections`);
  b.card("FORMULA", "Area against the y-axis", t`$\displaystyle\int_{c}^{d} x\,dy$, with $x$ written in terms of $y$`);
  b.card("DEFINITION", "Improper integral", "An integral with an infinite limit, or an integrand unbounded at a limit; evaluate it as a limit.");
  b.card("FACT", t`$\displaystyle\int_{1}^{\infty} x^{-2}\,dx$`, t`$= 1$, but $\displaystyle\int_{1}^{\infty} x^{-1}\,dx$ has no finite value.`);
  b.card("FACT", t`$\displaystyle\int_{0}^{1} x^{-\frac{1}{2}}\,dx$`, t`$= \Big[2\sqrt{x}\Big]_{0}^{1} = 2$, although the integrand is unbounded at 0.`);
  b.card("CONCEPT", "First step for any area question", "Sketch the curve and find where it meets the axis or the other graph.");
});
