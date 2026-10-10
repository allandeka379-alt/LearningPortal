// W1b: amaths.series.binomial-rational
import { concept, P, t, chk, same } from "../lib.mjs";

/** Generalised binomial coefficient for rational n. */
const co = (n, k) => { let c = 1; for (let i = 0; i < k; i++) c *= (n - i) / (i + 1); return c; };
/** Coefficients of (1 + bx)^n up to x^(terms − 1). */
const series = (n, b, terms) => Array.from({ length: terms }, (_, k) => co(n, k) * b ** k);
const near = (a, e) => a.forEach((v, i) => chk(v, e[i], 1e-12));
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
/** Number blank accepting a fraction or its decimal. */
const FR = (id, list, wrong, tol = 0.0005, marks) => ({ id, input: "number", accepted: list, tolerance: tol, wrong, ...(marks ? { marks } : {}) });

concept("amaths.series.binomial-rational", { file: "series/binomial-rational", keyPrefix: "series.binomial-rational" }, (b) => {
  near(series(-1, 1, 4), [1, -1, 1, -1]);
  b.mcq({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`Which is the expansion of $(1 + x)^{-1}$ for $|x| < 1$?`,
    options: [
      [t`$1 - x + x^2 - x^3 + \cdots$`, t`Correct: with $n = -1$ the coefficients are $1, -1, \frac{(-1)(-2)}{2} = 1, \frac{(-1)(-2)(-3)}{6} = -1, \ldots$`],
      [t`$1 + x + x^2 + x^3 + \cdots$`, t`This is $(1 - x)^{-1}$.`],
      [t`$1 - x$`, t`For a negative index the series does not stop.`],
      [t`$1 - x + 2x^2 - 6x^3 + \cdots$`, t`The coefficients are divided by $2!$ and $3!$: $\frac{(-1)(-2)}{2!} = 1$.`],
    ],
    answer: "A",
    explanation: t`$(1 + x)^{-1} = 1 - x + x^2 - x^3 + \cdots$, a geometric series with ratio $-x$, valid for $|x| < 1$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: t`For which values of $x$ is the expansion of $(1 - 3x)^{\frac{1}{2}}$ in ascending powers of $x$ valid?`,
    options: [
      [t`$|x| < \frac{1}{3}$`, t`Correct: the series for $(1 + u)^n$ needs $|u| < 1$, and here $u = -3x$.`],
      [t`$|x| < 3$`, t`$|3x| < 1$ means $|x| < \frac{1}{3}$, not 3.`],
      [t`$|x| < 1$`, t`That is the range for $(1 + x)^n$; with $3x$ in the bracket the range shrinks.`],
      [t`$x < \frac{1}{3}$`, t`Large negative $x$ (e.g. $x = -1$) also makes $|3x| > 1$, so a lower limit is needed too.`],
    ],
    answer: "A",
    explanation: t`Valid for $|-3x| < 1$, i.e. $-\frac{1}{3} < x < \frac{1}{3}$.`,
  });

  near(series(0.5, 1, 3), [1, 0.5, -0.125]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the first three terms in the expansion of $(1 + x)^{\frac{1}{2}}$ in ascending powers of $x$. Give coefficients as fractions or decimals.`,
    template: "1 + {{blank:a}}x + {{blank:b}}x²",
    blanks: [FR("a", ["1/2", "0.5"], "1"), FR("b", ["-1/8", "-0.125"], "-0.25")],
    explanation: t`$1 + \frac{1}{2}x + \frac{\frac{1}{2}\left(-\frac{1}{2}\right)}{2}x^2 = 1 + \frac{1}{2}x - \frac{1}{8}x^2$.`,
    hints: [t`The $x^2$ coefficient is $\frac{n(n - 1)}{2!}$.`],
  });

  near(series(-3, -2, 3), [1, 6, 24]);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the coefficient of $x^2$ in the expansion of $(1 - 2x)^{-3}$.`,
    value: 24, wrong: [-24, 6],
    explanation: t`$\frac{(-3)(-4)}{2}(-2x)^2 = 6 \times 4x^2 = 24x^2$.`,
    hints: [t`Square the whole term $(-2x)$.`],
  });

  near(series(-0.5, 4, 3), [1, -2, 6]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the first three terms of the expansion of $(1 + 4x)^{-\frac{1}{2}}$ in ascending powers of $x$.`,
    template: "1 + ({{blank:a}})x + ({{blank:b}})x²",
    blanks: [N("a", -2, "2"), N("b", 6, "1.5")],
    explanation: t`$1 + \left(-\frac{1}{2}\right)(4x) + \frac{\left(-\frac{1}{2}\right)\left(-\frac{3}{2}\right)}{2}(4x)^2 = 1 - 2x + \frac{3}{8} \times 16x^2 = 1 - 2x + 6x^2$.`,
    hints: [t`$(4x)^2 = 16x^2$.`],
  });

  const c6 = series(-2, 0.5, 4).map((c) => c / 4);
  chk(c6[3], -0.125);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the coefficient of $x^3$ in the expansion of $(2 + x)^{-2}$. Give your answer as a fraction or decimal.`,
    value: -0.125, wrong: [-4, -0.5],
    explanation: t`$(2 + x)^{-2} = \frac{1}{4}\left(1 + \frac{x}{2}\right)^{-2}$. The $x^3$ coefficient of $(1 + u)^{-2}$ is $\frac{(-2)(-3)(-4)}{6} = -4$; with $u = \frac{x}{2}$ it becomes $-4 \times \frac{1}{8} = -\frac{1}{2}$, and multiplying by $\frac{1}{4}$ gives $-\frac{1}{8}$.`,
    hints: [t`Take out $2^{-2} = \frac{1}{4}$ first.`],
  });

  const c7 = series(1 / 3, 1 / 8, 3).map((c) => 2 * c);
  near(c7, [2, 1 / 12, -1 / 288]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the first three terms of the expansion of $(8 + x)^{\frac{1}{3}}$ in ascending powers of $x$, and state the range of validity. Give coefficients as fractions.`,
    template: "Expansion: ({{blank:a}}) + {{blank:b}}x + ({{blank:c}})x², valid for |x| < {{blank:d}}",
    blanks: [N("a", 2, "8"), FR("b", ["1/12", "0.08333"], "1/24", 0.00005), FR("c", ["-1/288", "-0.003472"], "-1/576", 0.000005), N("d", 8, "1")],
    explanation: t`$(8 + x)^{\frac{1}{3}} = 2\left(1 + \frac{x}{8}\right)^{\frac{1}{3}} = 2\left(1 + \frac{1}{3} \cdot \frac{x}{8} + \frac{\frac{1}{3}\left(-\frac{2}{3}\right)}{2}\cdot\frac{x^2}{64}\right) = 2 + \frac{x}{12} - \frac{x^2}{288}$. Valid for $\left|\frac{x}{8}\right| < 1$, i.e. $|x| < 8$.`,
    hints: [t`$8^{\frac{1}{3}} = 2$.`, t`$\frac{\frac{1}{3}\left(-\frac{2}{3}\right)}{2} = -\frac{1}{9}$.`],
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`For which values of $x$ is the expansion of $(3 - 2x)^{-1}$ in ascending powers of $x$ valid?`,
    options: [
      [t`$|x| < \frac{3}{2}$`, t`Correct: $(3 - 2x)^{-1} = \frac{1}{3}\left(1 - \frac{2x}{3}\right)^{-1}$, valid for $\left|\frac{2x}{3}\right| < 1$.`],
      [t`$|x| < \frac{2}{3}$`, t`The fraction is upside down: $\left|\frac{2x}{3}\right| < 1$ gives $|x| < \frac{3}{2}$.`],
      [t`$|x| < 3$`, t`The coefficient 2 of $x$ has been ignored.`],
      [t`$|x| < \frac{1}{2}$`, t`The constant 3 must be taken out first; it changes the range.`],
    ],
    answer: "A",
    explanation: t`$(a + bx)^n$ is valid for $|x| < \left|\frac{a}{b}\right| = \frac{3}{2}$.`,
    hints: ["Take the constant 3 out of the bracket first."],
  });

  const est9 = 1 + 0.5 * 0.02 - 0.125 * 0.02 ** 2;
  chk(est9, 1.00995, 1e-12);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Use the first three terms of the expansion of $(1 + x)^{\frac{1}{2}}$ with $x = 0.02$ to estimate $\sqrt{1.02}$. Give the value of your estimate to 5 decimal places.`,
    value: est9, dp: 5, wrong: [1.01, 1.0102],
    explanation: t`$1 + \frac{1}{2}(0.02) - \frac{1}{8}(0.02)^2 = 1 + 0.01 - 0.00005 = 1.00995$. (Calculator: $1.009950$.)`,
    hints: [t`$(1 + x)^{\frac{1}{2}} \approx 1 + \frac{1}{2}x - \frac{1}{8}x^2$.`],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Substituting $x = 2$ into the series $1 - x + x^2 - x^3 + \cdots$ gives the value of $(1 + x)^{-1} = \frac{1}{3}$.`,
    answer: false,
    explanation: t`The series is valid only for $|x| < 1$. With $x = 2$ it becomes $1 - 2 + 4 - 8 + \cdots$, which does not converge.`,
  });

  near(series(-2, -3, 3), [1, 6, 27]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The expansion of $(1 + ax)^n$ in ascending powers of $x$ begins $1 + 6x + 27x^2$. Find $n$ and $a$.`,
    template: "n = {{blank:n}}, a = {{blank:a}}",
    blanks: [N("n", -2, "2"), N("a", -3, "3")],
    explanation: t`$na = 6$ and $\frac{n(n - 1)}{2}a^2 = 27$. Then $\frac{6(n - 1)a}{2} = 27$, so $(n - 1)a = 9$, i.e. $na - a = 9$: $6 - a = 9$, $a = -3$, $n = -2$. Check: $(1 - 3x)^{-2} = 1 + 6x + 27x^2 + \cdots$`,
    hints: [t`Replace $na$ by 6 in the second equation.`],
  });

  const s12 = series(-2, -2, 3);
  chk(s12[2] + s12[1], 16);
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Find the coefficient of $x^2$ in the expansion of $\dfrac{1 + x}{(1 - 2x)^2}$ in ascending powers of $x$.`,
    value: 16, wrong: [12, 20],
    explanation: t`$(1 - 2x)^{-2} = 1 + 4x + 12x^2 + \cdots$. Multiplying by $(1 + x)$: $x^2$ coefficient $= 12 + 4 = 16$.`,
    hints: [t`Write $\frac{1}{(1 - 2x)^2}$ as $(1 - 2x)^{-2}$ and expand.`],
  });

  for (const x of [0.01, 0.02]) chk(Math.sqrt((1 + x) / (1 - x)), 1 + x + 0.5 * x * x, 2 * x ** 3);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`Show that, for small $x$, $\sqrt{\dfrac{1 + x}{1 - x}} \approx 1 + x + \frac{1}{2}x^2$.`,
    points: [
      t`M1 writes the expression as $(1 + x)^{\frac{1}{2}}(1 - x)^{-\frac{1}{2}}$.`,
      t`A1 $(1 + x)^{\frac{1}{2}} \approx 1 + \frac{1}{2}x - \frac{1}{8}x^2$.`,
      t`A1 $(1 - x)^{-\frac{1}{2}} \approx 1 + \frac{1}{2}x + \frac{3}{8}x^2$.`,
      t`A1 multiplies, collecting $x^2$: $\frac{3}{8} + \frac{1}{4} - \frac{1}{8} = \frac{1}{2}$, giving $1 + x + \frac{1}{2}x^2$.`,
    ],
    modelAnswer: t`$$
\sqrt{\frac{1 + x}{1 - x}} = (1 + x)^{\frac{1}{2}}(1 - x)^{-\frac{1}{2}}
$$

$$
(1 + x)^{\frac{1}{2}} = 1 + \frac{1}{2}x - \frac{1}{8}x^2 + \cdots \qquad (1 - x)^{-\frac{1}{2}} = 1 + \frac{1}{2}x + \frac{3}{8}x^2 + \cdots
$$

$$
\left(1 + \frac{1}{2}x - \frac{1}{8}x^2\right)\left(1 + \frac{1}{2}x + \frac{3}{8}x^2\right) = 1 + x + \left(\frac{3}{8} + \frac{1}{4} - \frac{1}{8}\right)x^2 + \cdots = 1 + x + \frac{1}{2}x^2 + \cdots
$$`,
    explanation: "Split the square root into two binomial expansions and multiply, ignoring powers above x².",
    hints: [t`$\frac{\left(-\frac{1}{2}\right)\left(-\frac{3}{2}\right)}{2} = \frac{3}{8}$.`],
  });

  near(series(-1, -0.5, 3).map((c) => c / 2), [0.5, 0.25, 0.125]);
  b.expr({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Expand $(2 - x)^{-1}$ in ascending powers of $x$ up to and including the term in $x^2$. Type fractions with /, e.g. 1/3+x/9+x^2/27.`,
    accepted: ["1/2+x/4+x^2/8", "1/2+1/4x+1/8x^2", "0.5+0.25x+0.125x^2", "1/2+(1/4)x+(1/8)x^2", "1/2+x/4+(x^2)/8"],
    wrong: ["1/2-x/4+x^2/8", "1+x/2+x^2/4"],
    explanation: t`$(2 - x)^{-1} = \frac{1}{2}\left(1 - \frac{x}{2}\right)^{-1} = \frac{1}{2}\left(1 + \frac{x}{2} + \frac{x^2}{4}\right) = \frac{1}{2} + \frac{x}{4} + \frac{x^2}{8}$, valid for $|x| < 2$.`,
    hints: [t`Take out $2^{-1}$ first.`],
  });

  b.match({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Match each expression with the range of x for which its binomial expansion is valid.",
    pairs: [
      [t`$(1 + 2x)^{-1}$`, t`$|x| < \frac{1}{2}$`],
      [t`$\left(1 - \frac{x}{3}\right)^{\frac{1}{2}}$`, t`$|x| < 3$`],
      [t`$(4 + x)^{-2}$`, t`$|x| < 4$`],
      [t`$(1 - 5x)^{\frac{1}{3}}$`, t`$|x| < \frac{1}{5}$`],
    ],
    explanation: t`$(1 + bx)^n$ is valid for $|x| < \frac{1}{|b|}$; $(4 + x)^{-2} = \frac{1}{16}\left(1 + \frac{x}{4}\right)^{-2}$, valid for $|x| < 4$.`,
    hints: ["Make the constant in the bracket 1 first."],
  });

  const c16 = series(-1, 1, 3).map((c, k) => 2 * c - series(-1, -3, 3)[k]);
  near(c16, [1, -5, -7]);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Given that $f(x) = \dfrac{2}{1 + x} - \dfrac{1}{1 - 3x}$, what is the coefficient of $x^2$ in the expansion of $f(x)$ in ascending powers of $x$?`,
    options: [
      ["−7", t`Correct: $\frac{2}{1 + x}$ gives $2x^2$ and $\frac{1}{1 - 3x}$ gives $9x^2$; $2 - 9 = -7$.`],
      ["11", t`This adds $9$ instead of subtracting the second fraction.`],
      ["−1", t`This uses $3x^2$ instead of $(3x)^2 = 9x^2$ in the second expansion.`],
      ["−5", t`$-5$ is the coefficient of $x$: $-2 - 3$.`],
    ],
    answer: "A",
    explanation: t`$\frac{2}{1 + x} = 2 - 2x + 2x^2 - \cdots$ and $\frac{1}{1 - 3x} = 1 + 3x + 9x^2 + \cdots$. So $f(x) = 1 - 5x - 7x^2 + \cdots$, valid for $|x| < \frac{1}{3}$.`,
    hints: ["Expand each fraction separately, then subtract."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Explain why $(2 + x)^{-1}$ must be rewritten before using the series for $(1 + x)^n$, and state the range of validity of its expansion.`,
    points: [t`The series is for $(1 + x)^n$; the bracket must start with 1, so write $(2 + x)^{-1} = \frac{1}{2}\left(1 + \frac{x}{2}\right)^{-1}$.`, t`Valid for $\left|\frac{x}{2}\right| < 1$, i.e. $|x| < 2$.`],
    modelAnswer: "The binomial series applies to (1 + u)ⁿ, so take 2 out: (2 + x)⁻¹ = 2⁻¹(1 + x/2)⁻¹. The series in u = x/2 converges for |u| < 1, so the expansion is valid for −2 < x < 2.",
    explanation: "Take the constant out as aⁿ, then the range comes from |bx/a| < 1.",
    hints: ["What must the first term inside the bracket be?"],
  });

  // Struct (12): f(x) = (8 − x)/((2 − x)(1 + x)) = 2/(2 − x) + 3/(1 + x) = 4 − 5x/2 + 13x²/4
  for (const x of [0.1, -0.3, 0.5]) chk((8 - x) / ((2 - x) * (1 + x)), 2 / (2 - x) + 3 / (1 + x), 1e-12);
  const e18 = series(-1, -0.5, 3).map((c, k) => c + 3 * series(-1, 1, 3)[k]);
  near(e18, [4, -2.5, 3.25]);
  const approx18 = 4 - 2.5 * 0.1 + 3.25 * 0.01;
  chk(approx18, 3.7825, 1e-12);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`Let $f(x) = \dfrac{8 - x}{(2 - x)(1 + x)}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Express $f(x)$ in the form $\dfrac{A}{2 - x} + \dfrac{B}{1 + x}$.`, template: "A = {{blank:A}}, B = {{blank:B}}",
        blanks: [N("A", 2, "3", 1), N("B", 3, "2", 2)],
        explanation: t`$8 - x = A(1 + x) + B(2 - x)$. $x = 2$: $6 = 3A$, $A = 2$. $x = -1$: $9 = 3B$, $B = 3$.` }),
      P.fib({ label: "(b)", marks: 4, stem: "Hence expand f(x) in ascending powers of x, up to and including the term in x². Give coefficients as decimals or fractions.", template: "f(x) ≈ ({{blank:a}}) + ({{blank:b}})x + ({{blank:c}})x²",
        blanks: [N("a", 4, "5", 1), FR("b", ["-2.5", "-5/2"], "3.5", 0.0005, 1), FR("c", ["3.25", "13/4"], "3.5", 0.0005, 2)],
        explanation: t`$\frac{2}{2 - x} = \left(1 - \frac{x}{2}\right)^{-1} = 1 + \frac{x}{2} + \frac{x^2}{4}$; $\frac{3}{1 + x} = 3 - 3x + 3x^2$. Sum: $4 - \frac{5}{2}x + \frac{13}{4}x^2$.` }),
      P.fib({ label: "(c)", marks: 2, stem: "State the set of values of x for which the expansion is valid.", template: "|x| < {{blank:k}}",
        blanks: [N("k", 1, "2", 2)],
        explanation: t`$\frac{2}{2 - x}$ needs $|x| < 2$ and $\frac{3}{1 + x}$ needs $|x| < 1$; both hold for $|x| < 1$.` }),
      P.num({ label: "(d)", marks: 3, stem: "Use your expansion to estimate f(0.1), giving the value of the estimate to 4 decimal places.", value: approx18, dp: 4, wrong: [3.75, 3.7799],
        explanation: t`$4 - 0.25 + 0.0325 = 3.7825$. (The exact value $\frac{7.9}{1.9 \times 1.1} = 3.7799$; the difference comes from the neglected $x^3$ and higher terms.)` }),
    ],
    explanation: "Split into partial fractions, expand each with the binomial series, add, and take the narrower range of validity.",
    hints: [t`$\frac{2}{2 - x} = \left(1 - \frac{x}{2}\right)^{-1}$.`, "The combined expansion is valid where both parts are valid."],
  });
  chk(Math.round((7.9 / (1.9 * 1.1)) * 1e4) / 1e4, 3.7799);

  // Struct (13): √(1 − 8x) = 1 − 4x − 8x² − 32x³; √23 = 5√0.92 with x = 1/100
  near(series(0.5, -8, 4), [1, -4, -8, -32]);
  chk(25 * 0.92, 23);
  const est19 = 5 * (1 - 4 * 0.01 - 8 * 0.0001 - 32 * 1e-6);
  chk(est19, 4.79584, 1e-12);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`This question is about the expansion of $\sqrt{1 - 8x}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: "Expand √(1 − 8x) in ascending powers of x, up to and including the term in x³.", template: "1 + ({{blank:a}})x + ({{blank:b}})x² + ({{blank:c}})x³",
        blanks: [N("a", -4, "4", 1), N("b", -8, "8", 1), N("c", -32, "32", 2)],
        explanation: t`$1 + \frac{1}{2}(-8x) + \frac{\frac{1}{2}\left(-\frac{1}{2}\right)}{2}(64x^2) + \frac{\frac{1}{2}\left(-\frac{1}{2}\right)\left(-\frac{3}{2}\right)}{6}(-512x^3) = 1 - 4x - 8x^2 - 32x^3$.` }),
      P.fib({ label: "(b)", marks: 1, stem: "State the range of values of x for which the expansion is valid.", template: "|x| < {{blank:k}}",
        blanks: [FR("k", ["1/8", "0.125"], "8", 0.0005, 1)],
        explanation: t`$|8x| < 1$, i.e. $|x| < \frac{1}{8}$.` }),
      P.proof({ label: "(c)", marks: 3, stem: t`Show that substituting $x = \frac{1}{100}$ gives $\sqrt{0.92}$, and that $\sqrt{23} = 5\sqrt{0.92}$.`,
        points: [t`B1 $1 - 8 \times \frac{1}{100} = 0.92$.`, t`M1 $0.92 = \frac{92}{100} = \frac{4 \times 23}{100}$, so $\sqrt{0.92} = \frac{2\sqrt{23}}{10} = \frac{\sqrt{23}}{5}$.`, t`A1 hence $\sqrt{23} = 5\sqrt{0.92}$.`],
        modelAnswer: t`$$
1 - 8\left(\frac{1}{100}\right) = 0.92 \qquad \sqrt{0.92} = \sqrt{\frac{92}{100}} = \frac{\sqrt{4 \times 23}}{10} = \frac{2\sqrt{23}}{10} = \frac{\sqrt{23}}{5}
$$

So $\sqrt{23} = 5\sqrt{0.92}$.`,
        explanation: "92 = 4 × 23, so the square root of 4 comes out." }),
      P.num({ label: "(d)", marks: 3, stem: "Hence estimate √23, giving the value of your estimate to 5 decimal places.", value: est19, dp: 5, wrong: [4.8, 4.79583],
        explanation: t`$\sqrt{0.92} \approx 1 - 0.04 - 0.0008 - 0.000032 = 0.959168$, so $\sqrt{23} \approx 5 \times 0.959168 = 4.79584$. (Calculator: $4.795832$.)` }),
      P.manual({ label: "(e)", marks: 2, stem: t`Explain why $x = \frac{1}{100}$ is a suitable value to use, and why $x = \frac{1}{10}$ could not be used to estimate $\sqrt{0.2}$ in the same way.`,
        points: [t`$\frac{1}{100}$ is well inside $|x| < \frac{1}{8}$, so the terms shrink quickly and four terms are accurate.`, t`$x = \frac{1}{10}$ is close to the edge ($\frac{1}{10} < \frac{1}{8}$ but only just), so the terms shrink slowly ($8x = 0.8$) and four terms give a poor estimate.`],
        modelAnswer: "With x = 1/100, 8x = 0.08, so each term is under a tenth of the one before and the neglected terms are tiny. With x = 1/10, 8x = 0.8: the series still converges, but very slowly, so four terms (1 − 0.4 − 0.08 − 0.032 = 0.488) are far from √0.2 = 0.447." }),
    ],
    explanation: "Expand with u = −8x, choose x so that 1 − 8x is a convenient number, and keep x well inside the range of validity.",
    hints: [t`Every power of $(-8x)$ must be bracketed.`, "92 = 4 × 23."],
  });
  chk(1 - 0.4 - 0.08 - 0.032, 0.488, 1e-12);

  b.card("FORMULA", "Binomial series, rational n", t`$(1 + x)^n = 1 + nx + \frac{n(n - 1)}{2!}x^2 + \frac{n(n - 1)(n - 2)}{3!}x^3 + \cdots$, $|x| < 1$`, "In MF19.");
  b.card("FACT", "Validity of (1 + bx)ⁿ", t`$|bx| < 1$, i.e. $|x| < \frac{1}{|b|}$`);
  b.card("CONCEPT", "Expanding (a + bx)ⁿ", t`Take out $a^n$: $(a + bx)^n = a^n\left(1 + \frac{b}{a}x\right)^n$, valid for $|x| < \left|\frac{a}{b}\right|$.`);
  b.card("FACT", "(1 − x)⁻¹ and (1 + x)⁻¹", t`$1 + x + x^2 + \cdots$ and $1 - x + x^2 - \cdots$ for $|x| < 1$`);
  b.card("FACT", "(1 + x)^½ to x²", t`$1 + \frac{1}{2}x - \frac{1}{8}x^2$`);
  b.card("CONCEPT", "Rational functions", "Split into partial fractions, expand each part, add; the narrower range of validity applies.");
  b.card("CONCEPT", "Finite or infinite?", "The series stops only when n is a positive integer; otherwise it is infinite.");
  b.card("CONCEPT", "Approximations", "Choose x well inside the range of validity so that the neglected terms are small.");
  b.card("CONCEPT", "Unknown a and n", t`From $1 + px + qx^2$: $na = p$ and $\frac{n(n - 1)}{2}a^2 = q$; substitute $na = p$ into the second.`);
});
