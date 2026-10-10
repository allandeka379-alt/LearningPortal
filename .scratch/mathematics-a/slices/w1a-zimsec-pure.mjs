// W1a: ZIMSEC Pure Mathematics exam-format items (in the style of; never official).
// ZP1 × 4 (Paper 1, 10 marks), ZP2A × 1 (Paper 2 Section A, 8 marks), ZP2B × 2 (Paper 2 Section B, 16 marks).
import { concept, P, t, chk, same, quad, poly, ZP } from "../lib.mjs";

const A = (k) => `amaths.${k}`;
const nb = (id, v, w, tolerance) => (tolerance === undefined ? { id, input: "number", accepted: [v], wrong: w } : { id, input: "number", accepted: [v], wrong: w, tolerance });
const ident = (f, g, label) => {
  for (const x of [0.37, 2.9, -4.3, 5.6, 7.1]) chk(f(x), g(x), 1e-9, label);
};
function scan(pred, lo = -30, hi = 30, step = 0.0005) {
  const out = [];
  let s = null;
  for (let i = 0; ; i++) {
    const x = lo + i * step;
    if (x > hi) break;
    const ok = pred(x);
    if (ok && s === null) s = x;
    if (!ok && s !== null) {
      out.push([s, x - step]);
      s = null;
    }
  }
  if (s !== null) out.push([s, hi]);
  return out.map((iv) => iv.map((v) => Math.round(v * 100) / 100));
}
function countRoots(g, k, lo = -30, hi = 30, n = 600000) {
  let c = 0;
  let prev = g(lo) - k;
  for (let i = 1; i <= n; i++) {
    const v = g(lo + ((hi - lo) * i) / n) - k;
    if (v === 0 || prev * v < 0) c++;
    prev = v;
  }
  return c;
}
const L = Math.log;

concept(A("algebra.indices-variation"), { file: "exam/w1a-zimsec-pure", keyPrefix: "exam.w1a-zimsec-pure", applies: ZP }, (b) => {
  // ---------------------------------------------------------------- ZP1 (10): indices and variation
  same(quad.roots(3, -10, 3), [1 / 3, 3]);
  for (const x of [-1, 1]) chk(3 ** (2 * x + 1) - 10 * 3 ** x + 3, 0, 1e-9);
  chk((16 ** 0.75 * 8 ** (-2 / 3)) / 4 ** -0.5, 4, 1e-12);
  const k1 = (6 * 0.5 ** 2) / 50;
  chk(k1, 0.03, 1e-12);
  const R1 = (k1 * 60) / 0.3 ** 2;
  chk(R1, 20, 1e-9);
  const pct1 = (1 - 1.2 / 1.2 ** 2) * 100;
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true, secs: 900,
    concepts: [A("algebra.indices-variation")],
    stem: "Answer the whole of this question.",
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: t`Using the substitution $y = 3^{x}$, solve $3^{2x + 1} - 10\left(3^{x}\right) + 3 = 0$.`,
        template: "x = {{blank:a}} or x = {{blank:b}} (smaller first)",
        blanks: [nb("a", -1, 0.333), nb("b", 1, 3)],
        explanation: t`$3^{2x+1} = 3y^{2}$, so $3y^{2} - 10y + 3 = 0$, $(3y - 1)(y - 3) = 0$, $y = \frac{1}{3}$ or $3$, giving $x = -1$ or $x = 1$.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: t`Without using a calculator, evaluate $\dfrac{16^{\frac{3}{4}} \times 8^{-\frac{2}{3}}}{4^{-\frac{1}{2}}}$.`,
        value: 4, wrong: [1, 16],
        explanation: t`$16^{\frac{3}{4}} = 8$, $8^{-\frac{2}{3}} = \frac{1}{4}$, $4^{-\frac{1}{2}} = \frac{1}{2}$: $\dfrac{8 \times \frac{1}{4}}{\frac{1}{2}} = 4$. In powers of 2: $2^{3 - 2 + 1} = 2^{2}$.`,
      }),
      P.group({
        label: "(c)", stem: t`The resistance $R$ ohms of a copper wire varies directly as its length $L$ m and inversely as the square of its diameter $d$ mm. A wire 50 m long and 0.5 mm in diameter has resistance 6 ohms.`,
        parts: [
          P.num({
            label: "(i)", marks: 2, stem: "Find the resistance of a wire 60 m long and 0.3 mm in diameter.",
            value: R1, wrong: [12, 6],
            explanation: t`$R = \frac{kL}{d^{2}}$: $6 = \frac{50k}{0.25}$, so $k = 0.03$. Then $R = \frac{0.03 \times 60}{0.09} = 20$ ohms.`,
          }),
          P.num({
            label: "(ii)", marks: 2, stem: "The length and the diameter are both increased by 20%. Find the percentage decrease in the resistance, to 3 significant figures.",
            value: pct1, unit: "%", wrong: [20, 30.6],
            explanation: t`New $R$ is $\frac{1.2}{1.2^{2}} = \frac{1}{1.2} = 0.8333$ times the old, a decrease of $16.7\%$.`,
          }),
          P.mcq({
            label: "(iii)", marks: 1, stem: "State the effect on R of doubling both the length and the diameter.",
            options: [
              ["R is halved.", "Correct: 2 ÷ 2² = 1/2."],
              ["R is unchanged.", "The diameter is squared, so the two changes do not cancel."],
              ["R is doubled.", "Doubling L doubles R, but doubling d divides it by 4."],
              ["R is multiplied by 4.", "The square on d acts in the denominator."],
            ],
            answer: "A",
            explanation: t`$R \propto \frac{L}{d^{2}}$: factor $\frac{2}{2^{2}} = \frac{1}{2}$.`,
          }),
        ],
      }),
    ],
    explanation: t`(a) $x = -1$ or $1$. (b) $4$. (c) $R = \frac{0.03L}{d^{2}}$: $R = 20$ ohms; increasing both by 20% multiplies $R$ by $\frac{1}{1.2}$ (a 16.7% decrease); doubling both halves $R$.`,
    hints: [t`$3^{2x+1} = 3\left(3^{x}\right)^{2}$.`, "Write the variation as R = kL/d² and find k first."],
  });

  // ---------------------------------------------------------------- ZP1 (10): improper partial fractions and the factor theorem
  const num2 = [2, -1, -1, -1];
  same(poly.div(num2, [1, -1, -2]), { q: [2, 1], r: [4, 1] });
  ident((x) => poly.eval(num2, x) / ((x - 2) * (x + 1)), (x) => 2 * x + 1 + 3 / (x - 2) + 1 / (x + 1), "ZP1-2");
  chk(poly.eval(num2, 3) / ((3 - 2) * (3 + 1)), 10.25, 1e-12);
  chk(poly.eval(num2, 1), -1);
  chk(poly.eval([2, -1, -1, -10], 2), 0);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false, secs: 900,
    concepts: [A("algebra.partial-fractions"), A("algebra.polynomials")],
    stem: t`Let $f(x) = \dfrac{2x^{3} - x^{2} - x - 1}{(x - 2)(x + 1)}$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: t`Divide $2x^{3} - x^{2} - x - 1$ by $x^{2} - x - 2$.`,
        template: "Quotient: {{blank:a}} x + {{blank:b}}; remainder: {{blank:p}} x + {{blank:q}}",
        blanks: [nb("a", 2, 2), nb("b", 1, -1), nb("p", 4, 2), nb("q", 1, -3)],
        explanation: t`$2x(x^{2} - x - 2) = 2x^{3} - 2x^{2} - 4x$ leaves $x^{2} + 3x - 1$; $1 \times (x^{2} - x - 2)$ leaves $4x + 1$. Quotient $2x + 1$, remainder $4x + 1$.`,
      }),
      P.fib({
        label: "(b)", marks: 3, stem: t`Hence express $f(x)$ in the form $2x + 1 + \dfrac{A}{x - 2} + \dfrac{B}{x + 1}$.`,
        template: "A = {{blank:A}}, B = {{blank:B}}",
        blanks: [nb("A", 3, 9), nb("B", 1, -3)],
        explanation: t`$4x + 1 \equiv A(x + 1) + B(x - 2)$. $x = 2$: $9 = 3A$, $A = 3$. $x = -1$: $-3 = -3B$, $B = 1$.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Use your answer to (b) to find f(3), giving an exact decimal.",
        value: 10.25, dp: 2, wrong: [10, 41],
        explanation: t`$7 + \frac{3}{1} + \frac{1}{4} = 10.25$. (Directly: $\frac{54 - 9 - 3 - 1}{1 \times 4} = \frac{41}{4}$.)`,
      }),
      P.num({
        label: "(d)", marks: 1, stem: t`Find the remainder when $2x^{3} - x^{2} - x - 1$ is divided by $x - 1$.`,
        value: -1, wrong: [1, 3],
        explanation: t`By the remainder theorem: $2 - 1 - 1 - 1 = -1$.`,
      }),
      P.num({
        label: "(e)", marks: 2, stem: t`Find the value of the constant $k$ for which $(x - 2)$ is a factor of $2x^{3} - x^{2} - x + k$.`,
        value: -10, prefix: "k =", wrong: [10, -9],
        explanation: t`$16 - 4 - 2 + k = 0$, so $k = -10$.`,
      }),
    ],
    explanation: t`$f(x) = 2x + 1 + \dfrac{3}{x - 2} + \dfrac{1}{x + 1}$ (improper, so divide first). Remainder theorem: $-1$; factor theorem: $k = -10$.`,
    hints: ["Degree 3 over degree 2: divide first.", "Remainder on division by (x − a) is f(a)."],
  });

  // ---------------------------------------------------------------- ZP1 (10): rational and cubic inequalities, discriminant
  same(scan((x) => x !== 3 && (x + 1) / (x - 3) >= 2), [[3, 7]]);
  same(scan((x) => x ** 3 - x * x - 6 * x > 0), [[-2, 0], [3, 30]]);
  for (const k of [-3, 0.2, 1 / 3]) chk(4 * (k + 1) ** 2 - 4 * k * (k + 5), 4 - 12 * k, 1e-9);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false, secs: 900,
    concepts: [A("quadratics.equations-inequalities"), A("quadratics.completing-square-discriminant")],
    stem: "Answer the whole of this question.",
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: t`Solve the inequality $\dfrac{x + 1}{x - 3} \geq 2$.`,
        template: "{{blank:a}} < x ≤ {{blank:b}}",
        blanks: [nb("a", 3, 7), nb("b", 7, 3)],
        explanation: t`$\dfrac{x + 1}{x - 3} - 2 = \dfrac{7 - x}{x - 3} \geq 0$. Critical values 3 (excluded) and 7 (included); the fraction is non-negative for $3 < x \leq 7$.`,
      }),
      P.fib({
        label: "(b)", marks: 3, stem: t`Solve the inequality $x^{3} - x^{2} - 6x > 0$.`,
        template: "{{blank:a}} < x < {{blank:b}} or x > {{blank:c}}",
        blanks: [nb("a", -2, 0), nb("b", 0, 3), nb("c", 3, -2)],
        explanation: t`$x(x - 3)(x + 2) > 0$. Sign table with critical values $-2, 0, 3$: positive for $-2 < x < 0$ and $x > 3$.`,
      }),
      P.fib({
        label: "(c)", marks: 3, stem: t`Find the set of values of the non-zero constant $k$ for which $kx^{2} + 2(k + 1)x + k + 5 = 0$ has real roots. Give the boundary to 3 decimal places.`,
        template: "k ≤ {{blank:a}} (k ≠ 0)",
        blanks: [nb("a", 1 / 3, 3, 0.0005)],
        explanation: t`$4(k + 1)^{2} - 4k(k + 5) \geq 0 \Rightarrow k^{2} + 2k + 1 - k^{2} - 5k \geq 0 \Rightarrow 1 - 3k \geq 0 \Rightarrow k \leq \frac{1}{3}$, with $k \neq 0$.`,
      }),
      P.proof({
        label: "(d)", marks: 1, stem: t`Explain why $k = 0$ must be treated separately in (c).`,
        points: ["B1 when k = 0 the equation is not quadratic (it becomes 2x + 5 = 0), so the discriminant does not apply"],
        modelAnswer: t`If $k = 0$ the $x^{2}$ term vanishes and the equation is linear, $2x + 5 = 0$, with the single root $x = -\frac{5}{2}$; the discriminant condition is only for quadratics.`,
      }),
    ],
    explanation: t`(a) $3 < x \leq 7$; (b) $-2 < x < 0$ or $x > 3$; (c) $k \leq \frac{1}{3}$, $k \neq 0$.`,
    hints: ["Never multiply an inequality by x − 3; rearrange to a single fraction.", "Real roots: b² − 4ac ≥ 0."],
  });

  // ---------------------------------------------------------------- ZP1 (10): relations, inverse, |f(x)|
  same(quad.completeSquare(1, -6, 5), { a: 1, p: -3, q: -4, vertex: [3, -4] });
  for (const x of [3, 5, 9]) chk(3 + Math.sqrt(x * x - 6 * x + 5 + 4), x, 1e-12);
  chk(countRoots((x) => Math.abs(x * x - 6 * x + 5), 3), 4);
  chk(countRoots((x) => Math.abs(x * x - 6 * x + 5), 4.5), 2);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false, secs: 900,
    concepts: [A("functions.domain-range"), A("functions.composite-inverse"), A("functions.transformations")],
    stem: t`The function $f : \mathbb{R} \to \mathbb{R}$ is defined by $f(x) = x^{2} - 6x + 5$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: t`Express $f(x)$ in the form $(x - a)^{2} + b$.`,
        template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [nb("a", 3, -3), nb("b", -4, 5)],
        explanation: t`$(x - 3)^{2} - 9 + 5 = (x - 3)^{2} - 4$.`,
      }),
      P.mcq({
        label: "(b)", marks: 1, stem: "Which statement about f : ℝ → ℝ is true?",
        options: [
          ["f is neither injective nor surjective.", "Correct: f(1) = f(5) = 0, and values below −4 are never outputs."],
          ["f is injective but not surjective.", "f(1) = f(5), so it is not injective."],
          ["f is surjective but not injective.", "The range is f(x) ≥ −4, not all of ℝ."],
          ["f is bijective.", "It fails both conditions."],
        ],
        answer: "A",
        explanation: t`Not injective ($f(1) = f(5)$) and not surjective (range $f(x) \geq -4 \neq \mathbb{R}$).`,
      }),
      P.fib({
        label: "(c)", marks: 2, stem: t`The domain is restricted to $x \geq p$ and the co-domain to $y \geq q$ so that $f$ becomes bijective, with $p$ as small as possible. State $p$ and $q$.`,
        template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [nb("p", 3, -3), nb("q", -4, 5)],
        explanation: t`One-one to the right of the vertex, $x \geq 3$; onto when the co-domain equals the range, $y \geq -4$.`,
      }),
      P.expr({
        label: "(d)", marks: 2, stem: "For this bijection, find f⁻¹(x). Use sqrt( ), for example 2+sqrt(x+1).",
        accepted: ["3+√(x+4)", "√(x+4)+3"], wrong: ["3-sqrt(x+4)", "3+sqrt(x-4)"],
        explanation: t`$y = (x - 3)^{2} - 4 \Rightarrow x = 3 + \sqrt{y + 4}$ (as $x \geq 3$), so $f^{-1}(x) = 3 + \sqrt{x + 4}$, $x \geq -4$.`,
      }),
      P.group({
        label: "(e)", stem: t`Now consider the graph of $y = |f(x)|$ for $x \in \mathbb{R}$.`,
        parts: [
          P.num({
            label: "(i)", marks: 1, stem: "State the y-coordinate of the local maximum point of the graph.",
            value: 4, wrong: [-4],
            explanation: t`The minimum $(3, -4)$ of $y = f(x)$ is reflected to $(3, 4)$.`,
          }),
          P.num({
            label: "(ii)", marks: 1, stem: t`State the number of real solutions of $|f(x)| = 3$.`,
            value: 4, wrong: [2],
            explanation: t`$0 < 3 < 4$, so the line $y = 3$ cuts the reflected arch twice and the outer arms twice.`,
          }),
          P.num({
            label: "(iii)", marks: 1, stem: t`State the value of $c$ for which $|f(x)| = c$ has exactly three real solutions.`,
            value: 4, prefix: "c =", wrong: [0],
            explanation: t`At $c = 4$ the line touches the local maximum, giving 3 solutions.`,
          }),
        ],
      }),
    ],
    explanation: t`$f(x) = (x - 3)^{2} - 4$: neither injective nor surjective on $\mathbb{R}$; bijective from $x \geq 3$ onto $y \geq -4$ with inverse $3 + \sqrt{x + 4}$. $y = |f(x)|$ has a local maximum $(3, 4)$.`,
    hints: ["Use the completed-square form throughout.", "Reflect the part of y = f(x) below the x-axis."],
  });

  // ---------------------------------------------------------------- ZP2A (8): straight lines and perpendicular distance
  chk((10 - 2) / (7 - 1), 4 / 3, 1e-12);
  chk(Math.hypot(6, 8), 10);
  chk(4 * 1 - 3 * 2 + 2, 0);
  chk(4 * 7 - 3 * 10 + 2, 0);
  const d5 = Math.abs(4 * 8 - 3 * 1 + 2) / 5;
  chk(d5, 6.2, 1e-12);
  chk(0.5 * 10 * d5, 31, 1e-9);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false, secs: 720,
    concepts: [A("coordinate.straight-lines")],
    stem: t`The points $A(1, 2)$, $B(7, 10)$ and $C(8, 1)$ are the corners of a triangular plot on a surveyor's plan.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "Find the gradient of AB (as a decimal to 3 d.p.) and the length AB.",
        template: "gradient {{blank:m}}, length {{blank:l}}",
        blanks: [nb("m", 4 / 3, 0.75, 0.0005), nb("l", 10, 14)],
        explanation: t`Gradient $\frac{8}{6} = \frac{4}{3} \approx 1.333$; length $\sqrt{6^{2} + 8^{2}} = 10$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: t`Find the equation of the line $AB$ in the form $4x + by + c = 0$.`,
        template: "b = {{blank:b}}, c = {{blank:c}}",
        blanks: [nb("b", -3, 3), nb("c", 2, -2)],
        explanation: t`$y - 2 = \frac{4}{3}(x - 1) \Rightarrow 3y - 6 = 4x - 4 \Rightarrow 4x - 3y + 2 = 0$.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Find the perpendicular distance from C to the line AB.",
        value: d5, wrong: [31, 5.8],
        explanation: t`$\dfrac{|4(8) - 3(1) + 2|}{\sqrt{16 + 9}} = \dfrac{31}{5} = 6.2$.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Hence find the area of triangle ABC.",
        value: 31, wrong: [62],
        explanation: t`Area $= \frac{1}{2} \times AB \times d = \frac{1}{2} \times 10 \times 6.2 = 31$ square units.`,
      }),
    ],
    explanation: t`$AB$: gradient $\frac{4}{3}$, length 10, equation $4x - 3y + 2 = 0$. Distance from $C$ is $\frac{31}{5}$, so the area is $\frac{1}{2} \times 10 \times 6.2 = 31$.`,
    hints: [t`Perpendicular distance $\frac{|ax_{1} + by_{1} + c|}{\sqrt{a^{2} + b^{2}}}$.`, "Use AB as the base of the triangle."],
  });

  // ---------------------------------------------------------------- ZP2B (16): exponential model from data, linear law
  const Nd = [800, 1017, 1293, 1644, 2089];
  [0, 2, 4, 6, 8].forEach((tt, i) => chk(Nd[i], 800 * Math.exp(0.12 * tt), 0.5));
  const l0 = Math.round(L(800) * 1000) / 1000;
  const l8 = Math.round(L(2089) * 1000) / 1000;
  chk(l0, 6.685, 1e-12);
  chk(l8, 7.644, 1e-12);
  const g6 = (l8 - l0) / 8;
  const n10 = 800 * Math.exp(1.2);
  const t5000 = L(6.25) / 0.12;
  const tEq = L(4.375) / 0.17;
  chk(800 * Math.exp(0.12 * tEq), 3500 * Math.exp(-0.05 * tEq), 1e-6);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true, secs: 1440,
    concepts: [A("functions.linear-law"), A("functions.exponential-log"), A("functions.logarithms")],
    stem: [
      t`A fisheries officer at Lake Kariba records the number $N$ of a fish species in a protected bay, $t$ years after the bay was closed to fishing. It is suggested that $N = A\mathrm{e}^{kt}$.`,
      "",
      "| t | 0 | 2 | 4 | 6 | 8 |",
      "| :--- | :--- | :--- | :--- | :--- | :--- |",
      "| N | 800 | 1017 | 1293 | 1644 | 2089 |",
    ].join("\n"),
    parts: [
      P.proof({
        label: "(a)", marks: 1, stem: t`Show that the model gives a straight line when $\ln N$ is plotted against $t$.`,
        points: [t`B1 $\ln N = \ln A + kt$, linear in $t$ with gradient $k$ and intercept $\ln A$`],
        modelAnswer: t`Taking natural logarithms: $\ln N = \ln A + kt$, of the form $Y = mX + c$ with $Y = \ln N$, $X = t$, gradient $k$, intercept $\ln A$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: "Calculate ln N for t = 0 and t = 8, to 3 decimal places.",
        template: "t = 0: {{blank:a}}; t = 8: {{blank:b}}",
        blanks: [nb("a", l0, 2.903, 0.0005), nb("b", l8, 3.320, 0.0005)],
        explanation: t`$\ln 800 = 6.685$ and $\ln 2089 = 7.644$. (Using $\lg$ gives 2.903 and 3.320.)`,
      }),
      P.fib({
        label: "(c)", marks: 3, stem: "Using these two points, estimate k (to 3 significant figures) and A (to the nearest whole number).",
        template: "k = {{blank:k}}, A = {{blank:A}}",
        blanks: [nb("k", g6, 0.959, 0.0006), nb("A", 800, 6.685, 3)],
        explanation: t`Gradient $k = \dfrac{7.644 - 6.685}{8} = 0.120$; intercept $\ln A = 6.685$, so $A = \mathrm{e}^{6.685} \approx 800$.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: t`Take $A = 800$ and $k = 0.12$ for the rest of the question. Predict $N$ when $t = 10$, to 3 significant figures.`,
        value: n10, wrong: [960, 2400],
        explanation: t`$800\mathrm{e}^{1.2} = 800 \times 3.3201 = 2656 \approx 2660$.`,
      }),
      P.num({
        label: "(e)", marks: 2, stem: "Find the time when the model predicts 5000 fish, to 3 significant figures.",
        value: t5000, wrong: [6.63],
        explanation: t`$\mathrm{e}^{0.12t} = 6.25 \Rightarrow t = \dfrac{\ln 6.25}{0.12} = 15.3$ years.`,
      }),
      P.num({
        label: "(f)", marks: 3, stem: t`In a nearby bay that is still fished, the number of the same species is modelled by $M = 3500\mathrm{e}^{-0.05t}$. Find the value of $t$ for which $N = M$, to 3 significant figures.`,
        value: tEq, wrong: [21.1],
        explanation: t`$800\mathrm{e}^{0.12t} = 3500\mathrm{e}^{-0.05t} \Rightarrow \mathrm{e}^{0.17t} = 4.375 \Rightarrow t = \dfrac{\ln 4.375}{0.17} = 8.68$ years. (Subtracting the rates instead of adding them gives 21.1.)`,
      }),
      P.mcq({
        label: "(g)", marks: 1, stem: "What does the model for M predict in the long term?",
        options: [
          ["M decreases towards 0 but never reaches it.", "Correct: exponential decay with a negative index."],
          ["M reaches 0 after about 60 years.", "An exponential never equals zero."],
          ["M levels off at 3500.", "3500 is the initial value, not a long-term value."],
          ["M decreases towards 0.05.", "0.05 is the rate constant, not a limit."],
        ],
        answer: "A",
        explanation: t`$\mathrm{e}^{-0.05t} \to 0$ as $t \to \infty$, so $M \to 0$.`,
      }),
      P.manual({
        label: "(h)", marks: 2, stem: "Comment on the reliability of using the model for N to predict the number of fish after 40 years.",
        points: ["Extrapolation far beyond the data (t ≤ 8) is unreliable", "Unlimited exponential growth is unrealistic: food and space limit the population, so growth must slow"],
        modelAnswer: "The data cover only 8 years, so 40 years is a long extrapolation. The model predicts 800e^4.8 ≈ 97 000 fish, but a real population is limited by food, space and predators, so growth will slow; the prediction is unreliable.",
      }),
    ],
    explanation: t`$\ln N$ against $t$ is linear with gradient about 0.12 and intercept $\ln 800$, so $N \approx 800\mathrm{e}^{0.12t}$. Then $N(10) \approx 2660$, $N = 5000$ at $t \approx 15.3$, and $N = M$ at $t = \frac{\ln 4.375}{0.17} \approx 8.68$.`,
    hints: ["Take ln of N = Ae^(kt).", "Isolate the exponential, then take ln."],
  });

  // ---------------------------------------------------------------- ZP2B (16): cubic, sketch, inequality, hence an exponential equation
  const f7 = [2, 1, -13, 6];
  chk(poly.eval(f7, 2), 0);
  same(poly.rationalRoots(f7), [-3, 0.5, 2]);
  same(scan((x) => poly.eval(f7, x) <= 0), [[-30, -3], [0.5, 2]]);
  chk(poly.eval(f7, -0.5), 12.5);
  for (const y of [-1, 1]) chk(poly.eval(f7, 2 ** y), 0, 1e-12);
  const r7 = quad.roots(2, 1, -13);
  chk(r7[0] + r7[1], -0.5, 1e-12);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false, secs: 1440,
    concepts: [A("algebra.polynomials"), A("graphs.curve-sketching"), A("quadratics.equations-inequalities"), A("algebra.indices-variation")],
    stem: t`Let $f(x) = 2x^{3} + x^{2} - 13x + 6$.`,
    parts: [
      P.proof({
        label: "(a)", marks: 1, stem: t`Show that $(x - 2)$ is a factor of $f(x)$.`,
        points: [t`B1 $f(2) = 16 + 4 - 26 + 6 = 0$, so $(x - 2)$ is a factor by the factor theorem`],
        modelAnswer: t`$f(2) = 2(8) + 4 - 26 + 6 = 0$, so by the factor theorem $(x - 2)$ is a factor.`,
      }),
      P.fib({
        label: "(b)", marks: 3, stem: t`Hence find all the roots of $f(x) = 0$.`,
        template: "In ascending order: {{blank:a}}, {{blank:b}}, {{blank:c}}",
        blanks: [nb("a", -3, 3), nb("b", 0.5, -0.5), nb("c", 2, -2)],
        explanation: t`$f(x) = (x - 2)(2x^{2} + 5x - 3) = (x - 2)(2x - 1)(x + 3)$.`,
      }),
      P.fib({
        label: "(c)", marks: 1, stem: t`State the $y$-intercept of $y = f(x)$.`,
        template: "(0, {{blank:a}})",
        blanks: [nb("a", 6, -6)],
        explanation: t`$f(0) = 6$.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: t`Describe a sketch of $y = f(x)$.`,
        points: ["Positive cubic shape: from bottom-left to top-right", "Crosses the x-axis at −3, 1/2 and 2 and the y-axis at 6, with a maximum between −3 and 1/2 and a minimum between 1/2 and 2"],
        modelAnswer: "The curve rises from the bottom left, crosses the x-axis at (−3, 0), reaches a maximum, comes down through (0, 6) and crosses at (0.5, 0), dips to a minimum between 0.5 and 2, then rises through (2, 0) to the top right.",
      }),
      P.fib({
        label: "(e)", marks: 2, stem: t`Hence solve $f(x) \leq 0$.`,
        template: "x ≤ {{blank:a}} or {{blank:b}} ≤ x ≤ {{blank:c}}",
        blanks: [nb("a", -3, 3), nb("b", 0.5, -3), nb("c", 2, 0.5)],
        explanation: t`The curve is on or below the axis for $x \leq -3$ and for $\frac{1}{2} \leq x \leq 2$.`,
      }),
      P.num({
        label: "(f)", marks: 1, stem: t`Find the remainder when $f(x)$ is divided by $(2x + 1)$.`,
        value: 12.5, wrong: [-12.5, 18],
        explanation: t`$f\left(-\frac{1}{2}\right) = -\frac{1}{4} + \frac{1}{4} + \frac{13}{2} + 6 = 12.5$.`,
      }),
      P.fib({
        label: "(g)", marks: 3, stem: t`Using your answer to (b), solve $2\left(8^{y}\right) + 4^{y} - 13\left(2^{y}\right) + 6 = 0$.`,
        template: "y = {{blank:a}} or y = {{blank:b}} (smaller first)",
        blanks: [nb("a", -1, 0.5), nb("b", 1, 2)],
        explanation: t`With $x = 2^{y}$: $8^{y} = x^{3}$ and $4^{y} = x^{2}$, so the equation is $f(x) = 0$. $2^{y} = \frac{1}{2}$ gives $y = -1$; $2^{y} = 2$ gives $y = 1$; $2^{y} = -3$ is impossible.`,
      }),
      P.mcq({
        label: "(h)", marks: 1, stem: t`How many real solutions does $f(x) = 6$ have?`,
        options: [
          ["Three", t`Correct: $x(2x^{2} + x - 13) = 0$ and $1 + 104 > 0$.`],
          ["One", "x = 0 is one solution, but the quadratic factor gives two more."],
          ["Two", "The quadratic 2x² + x − 13 has two distinct roots, neither 0."],
          ["None", "x = 0 is a solution, since f(0) = 6."],
        ],
        answer: "A",
        explanation: t`$f(x) = 6 \Rightarrow 2x^{3} + x^{2} - 13x = 0 \Rightarrow x(2x^{2} + x - 13) = 0$; the quadratic has discriminant 105, so there are three solutions.`,
      }),
      P.num({
        label: "(i)", marks: 2, stem: t`Find the sum of the solutions of $f(x) = 6$.`,
        value: -0.5, wrong: [0.5, -6.5],
        explanation: t`The solutions are $0$ and the roots of $2x^{2} + x - 13 = 0$, whose sum is $-\frac{1}{2}$. Total $-\frac{1}{2}$.`,
      }),
    ],
    explanation: t`$f(x) = (x - 2)(2x - 1)(x + 3)$: a positive cubic through $(-3, 0)$, $(0.5, 0)$, $(2, 0)$, $(0, 6)$. $f(x) \leq 0$ for $x \leq -3$ or $\frac{1}{2} \leq x \leq 2$. With $x = 2^{y}$ the exponential equation gives $y = \pm 1$.`,
    hints: ["Divide by (x − 2) to get the quadratic factor.", "In (g), write 8ʸ and 4ʸ as powers of 2ʸ."],
  });
});
