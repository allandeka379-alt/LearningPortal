// W1b: amaths.series.maclaurin-taylor (ZIMSEC only)
import { concept, P, t, chk, rnd, checkDeriv, integrate } from "../lib.mjs";

const { exp, sin, cos, log, sqrt, tan, PI } = Math;
const SMALL = [0.001, -0.002, 0.003];
/** Asserts that a truncated series matches f for small x (error of order x^(k+1)). */
const series = (f, s, k, label) => SMALL.forEach((x) => chk(f(x), s(x), 50 * Math.abs(x) ** (k + 1), label));
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
const FR = (id, list, wrong, tol = 0.0005, marks) => ({ id, input: "number", accepted: list, tolerance: tol, wrong, ...(marks ? { marks } : {}) });

concept("amaths.series.maclaurin-taylor", { file: "series/maclaurin-taylor", keyPrefix: "series.maclaurin-taylor" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which is the coefficient of $x^3$ in the Maclaurin series of $f(x)$?`,
    options: [
      [t`$\dfrac{f'''(0)}{3!}$`, t`Correct: the coefficient of $x^r$ is $\frac{f^{(r)}(0)}{r!}$.`],
      [t`$f'''(0)$`, "The factorial is missing."],
      [t`$\dfrac{f'''(0)}{3}$`, t`Divide by $3! = 6$, not by 3.`],
      [t`$\dfrac{f(0)}{3!}$`, "The third derivative is needed, not f itself."],
    ],
    answer: "A",
    explanation: t`$f(x) = f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \cdots$`,
  });

  series(sin, (x) => x - x ** 3 / 6, 4, "sin");
  b.mcq({
    d: 2, skill: "RECALL", calculator: false, daily: true,
    stem: t`What are the first two non-zero terms of the Maclaurin series of $\sin x$?`,
    options: [
      [t`$x - \dfrac{x^3}{6}$`, t`Correct: $\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots$`],
      [t`$1 - \dfrac{x^2}{2}$`, t`These are the first terms of $\cos x$.`],
      [t`$x + \dfrac{x^3}{6}$`, t`The signs alternate: the $x^3$ term is negative.`],
      [t`$x - \dfrac{x^3}{3}$`, t`The denominator is $3! = 6$, not 3.`],
    ],
    answer: "A",
    explanation: t`Derivatives of $\sin x$ at 0 cycle $0, 1, 0, -1, \ldots$, giving $x - \frac{x^3}{6} + \cdots$`,
  });

  series((x) => exp(3 * x), (x) => 1 + 3 * x + 4.5 * x * x, 2, "e3x");
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the coefficient of $x^2$ in the Maclaurin series of $\mathrm{e}^{3x}$.`,
    value: 4.5, wrong: [1.5, 9],
    explanation: t`$\mathrm{e}^{3x} = 1 + 3x + \frac{(3x)^2}{2!} + \cdots = 1 + 3x + \frac{9}{2}x^2 + \cdots$, so the coefficient is $4.5$. (1.5 forgets to square the 3.)`,
  });

  series((x) => log(1 + 2 * x), (x) => 2 * x - 2 * x * x + (8 / 3) * x ** 3, 3, "ln(1+2x)");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the Maclaurin series of $\ln(1 + 2x)$ up to and including the term in $x^3$. Give coefficients as fractions or decimals.`,
    template: "ln(1 + 2x) ≈ ({{blank:a}})x + ({{blank:b}})x² + ({{blank:c}})x³",
    blanks: [N("a", 2, "1"), N("b", -2, "-1"), FR("c", ["8/3", "2.667", "2.6667"], "2/3")],
    explanation: t`Replace $x$ by $2x$ in $x - \frac{x^2}{2} + \frac{x^3}{3}$: $2x - \frac{4x^2}{2} + \frac{8x^3}{3} = 2x - 2x^2 + \frac{8}{3}x^3$.`,
    hints: [t`$(2x)^2 = 4x^2$ and $(2x)^3 = 8x^3$.`],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`For which values of $x$ is the Maclaurin series of $\ln(1 - x)$ valid?`,
    options: [
      [t`$-1 \le x < 1$`, t`Correct: replace $x$ by $-x$ in $-1 < x \le 1$: $-1 < -x \le 1$, i.e. $-1 \le x < 1$.`],
      [t`$-1 < x \le 1$`, t`This is the range for $\ln(1 + x)$; the sign change flips which end is included.`],
      [t`$-1 < x < 1$`, t`At $x = -1$ the series $-1 + \frac{1}{2} - \frac{1}{3} + \cdots$ converges to $\ln 2$, so that end is included.`],
      ["all real x", t`$\ln(1 - x)$ is not even defined for $x \ge 1$.`],
    ],
    answer: "A",
    explanation: t`$\ln(1 - x) = -x - \frac{x^2}{2} - \frac{x^3}{3} - \cdots$, valid for $-1 \le x < 1$.`,
    hints: [t`Substitute $-x$ into the condition $-1 < x \le 1$.`],
  });

  series((x) => cos(2 * x), (x) => 1 - 2 * x * x + (2 / 3) * x ** 4, 5, "cos2x");
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the coefficient of $x^4$ in the Maclaurin series of $\cos 2x$. Give your answer as a fraction or to 3 significant figures.`,
    value: 2 / 3, wrong: [1 / 12, 16],
    explanation: t`$\frac{(2x)^4}{4!} = \frac{16x^4}{24} = \frac{2}{3}x^4$. (Using $\frac{x^4}{4!}$ alone gives $\frac{1}{24}$; forgetting the factorial gives 16.)`,
    hints: [t`The $x^4$ term of $\cos u$ is $\frac{u^4}{4!}$.`],
  });

  series((x) => exp(x) * sin(x), (x) => x + x * x + x ** 3 / 3, 3, "e^x sin x");
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the Maclaurin series of $\mathrm{e}^x\sin x$ up to and including the term in $x^3$.`,
    template: "e^x sin x ≈ ({{blank:a}})x + ({{blank:b}})x² + ({{blank:c}})x³",
    blanks: [N("a", 1, "0"), N("b", 1, "0.5"), FR("c", ["1/3", "0.333", "0.3333"], "-1/6")],
    explanation: t`$(1 + x + \frac{x^2}{2})(x - \frac{x^3}{6}) = x + x^2 + \frac{x^3}{2} - \frac{x^3}{6} + \cdots = x + x^2 + \frac{1}{3}x^3$.`,
    hints: ["Multiply the two series, keeping powers up to x³ only."],
  });

  const est8 = 1 + 0.2 + 0.02 + 0.008 / 6;
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Use the first four terms of the Maclaurin series of $\mathrm{e}^x$ to estimate $\mathrm{e}^{0.2}$. Give the value of your estimate to 4 decimal places.`,
    value: est8, dp: 4, wrong: [1.22, 1.2214],
    explanation: t`$1 + 0.2 + \frac{0.04}{2} + \frac{0.008}{6} = 1.2213$ (to 4 d.p.). The calculator gives $1.2214$; the next term $\frac{0.2^4}{24} = 0.00007$ accounts for the difference.`,
    hints: [t`Four terms: $1 + x + \frac{x^2}{2} + \frac{x^3}{6}$.`],
  });
  chk(rnd(est8, 4), 1.2213);

  b.tf({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`The Maclaurin series of $\mathrm{e}^x$ is valid for all real values of $x$.`,
    answer: true,
    explanation: t`The factorials in the denominators grow faster than any power, so $\sum \frac{x^r}{r!}$ converges for every real $x$.`,
  });

  series((x) => (exp(x) - 1 - x) / (x * x), () => 0.5, 0, "limit");
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Use series to find $\displaystyle\lim_{x \to 0}\frac{\mathrm{e}^x - 1 - x}{x^2}$. Give your answer as a decimal.`,
    value: 0.5, wrong: [1, 0],
    explanation: t`$\mathrm{e}^x - 1 - x = \frac{x^2}{2} + \frac{x^3}{6} + \cdots$, so the fraction is $\frac{1}{2} + \frac{x}{6} + \cdots \to \frac{1}{2}$.`,
    hints: [t`Expand $\mathrm{e}^x$; the first two terms cancel.`],
  });

  SMALL.forEach((h) => chk(log(1 + h), h - (h * h) / 2, 3 * Math.abs(h) ** 3));
  b.expr({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Find the Taylor series of $\ln x$ about $x = 1$, up to and including the term in $(x - 1)^2$. Type it like (x-1)-(x-1)^2/5.`,
    accepted: ["(x-1)-(x-1)^2/2", "x-1-(x-1)^2/2", "(x-1)-1/2(x-1)^2", "(x-1)-(1/2)(x-1)^2", "-(x-1)^2/2+(x-1)", "(x-1)-0.5(x-1)^2"],
    wrong: ["(x-1)+(x-1)^2/2", "x-x^2/2"],
    explanation: t`$f(1) = 0$, $f'(x) = \frac{1}{x} \Rightarrow f'(1) = 1$, $f''(x) = -\frac{1}{x^2} \Rightarrow f''(1) = -1$. So $\ln x \approx (x - 1) - \frac{(x - 1)^2}{2}$.`,
    hints: ["Evaluate f, f′ and f″ at x = 1."],
  });

  const est12 = 2 + 0.1 / 4 - 0.01 / 64;
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Using the Taylor series $\sqrt{x} \approx 2 + \frac{1}{4}(x - 4) - \frac{1}{64}(x - 4)^2$, estimate $\sqrt{4.08}$. Give the value of your estimate to 5 decimal places.`,
    value: 2 + 0.08 / 4 - 0.0064 / 64, dp: 5, wrong: [2.02, 2.0201],
    explanation: t`$x - 4 = 0.08$: $2 + 0.02 - \frac{0.0064}{64} = 2 + 0.02 - 0.0001 = 2.01990$. (Calculator: $2.019901$.)`,
    hints: ["Substitute x − 4 = 0.08."],
  });
  chk(est12, 2.02484375); chk(2 + 0.08 / 4 - 0.0064 / 64, 2.0199);

  b.proof({
    d: 4, skill: "APPLICATION", calculator: false, marks: 4,
    stem: t`By repeated differentiation, show that the Maclaurin series of $\ln(1 + x)$ begins $x - \dfrac{x^2}{2} + \dfrac{x^3}{3}$.`,
    points: [
      t`M1 $f(x) = \ln(1 + x)$, $f(0) = 0$; $f'(x) = (1 + x)^{-1}$, $f'(0) = 1$.`,
      t`M1 $f''(x) = -(1 + x)^{-2}$, $f''(0) = -1$; $f'''(x) = 2(1 + x)^{-3}$, $f'''(0) = 2$.`,
      t`M1 substitutes into $f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3$.`,
      t`A1 obtains $x - \frac{x^2}{2} + \frac{x^3}{3}$.`,
    ],
    modelAnswer: t`$$
f(x) = \ln(1 + x), \quad f'(x) = \frac{1}{1 + x}, \quad f''(x) = -\frac{1}{(1 + x)^2}, \quad f'''(x) = \frac{2}{(1 + x)^3}
$$

At $x = 0$: $f = 0$, $f' = 1$, $f'' = -1$, $f''' = 2$.

$$
\ln(1 + x) = 0 + x - \frac{1}{2!}x^2 + \frac{2}{3!}x^3 + \cdots = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots
$$`,
    explanation: "Each differentiation brings down another power, producing the alternating pattern.",
    hints: ["Write 1/(1 + x) as (1 + x)⁻¹ before differentiating again."],
  });
  checkDeriv((x) => -1 / (1 + x) ** 2, (x) => 2 / (1 + x) ** 3, [0.1, 0.5, 2]);

  checkDeriv((x) => 2 * tan(x) / cos(x) ** 2, (x) => 2 / cos(x) ** 4 + 4 * tan(x) ** 2 / cos(x) ** 2, [0.1, 0.4, 0.9]);
  b.proof({
    d: 5, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`Show that the Maclaurin series of $\tan x$ begins $x + \dfrac{x^3}{3}$.`,
    points: [
      t`M1 $f'(x) = \sec^2 x$, $f'(0) = 1$.`,
      t`M1 $f''(x) = 2\sec^2 x\tan x$, $f''(0) = 0$.`,
      t`M1 $f'''(x) = 2\sec^4 x + 4\sec^2 x\tan^2 x$ (product rule), $f'''(0) = 2$.`,
      t`A1 $\tan x = x + \frac{2}{6}x^3 = x + \frac{x^3}{3}$.`,
    ],
    modelAnswer: t`$$
f(x) = \tan x, \quad f'(x) = \sec^2 x, \quad f''(x) = 2\sec^2 x\tan x
$$

$$
f'''(x) = 2\sec^2 x \cdot \sec^2 x + \tan x \cdot 4\sec^2 x\tan x = 2\sec^4 x + 4\sec^2 x\tan^2 x
$$

At 0: $f = 0$, $f' = 1$, $f'' = 0$, $f''' = 2$, so $\tan x = x + \frac{2}{3!}x^3 + \cdots = x + \frac{x^3}{3} + \cdots$`,
    explanation: t`$\frac{\mathrm{d}}{\mathrm{d}x}\sec^2 x = 2\sec^2 x\tan x$ by the chain rule.`,
    hints: [t`$\frac{\mathrm{d}}{\mathrm{d}x}(\sec^2 x) = 2\sec x \cdot \sec x\tan x$.`],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each function with the start of its Maclaurin series.",
    pairs: [
      [t`$\mathrm{e}^x$`, t`$1 + x + \frac{x^2}{2} + \cdots$`],
      [t`$\sin x$`, t`$x - \frac{x^3}{6} + \cdots$`],
      [t`$\cos x$`, t`$1 - \frac{x^2}{2} + \cdots$`],
      [t`$\ln(1 + x)$`, t`$x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots$`],
    ],
    explanation: "These four standard series, with the binomial series, are the building blocks for products and composites.",
  });

  series((x) => exp(-x * x), (x) => 1 - x * x + x ** 4 / 2, 5, "e^-x2");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`What is the Maclaurin series of $\mathrm{e}^{-x^2}$ up to the term in $x^4$?`,
    options: [
      [t`$1 - x^2 + \dfrac{x^4}{2}$`, t`Correct: replace $x$ by $-x^2$ in $1 + x + \frac{x^2}{2}$.`],
      [t`$1 - x^2 - \dfrac{x^4}{2}$`, t`$(-x^2)^2 = +x^4$, so the $x^4$ term is positive.`],
      [t`$1 - x + \dfrac{x^2}{2}$`, t`This is $\mathrm{e}^{-x}$; the exponent is $-x^2$.`],
      [t`$1 - x^2 + \dfrac{x^4}{24}$`, t`The $x^4$ term comes from $\frac{u^2}{2!}$ with $u = -x^2$, not from $\frac{u^4}{4!}$.`],
    ],
    answer: "A",
    explanation: t`$\mathrm{e}^u = 1 + u + \frac{u^2}{2} + \cdots$ with $u = -x^2$: $1 - x^2 + \frac{x^4}{2} - \cdots$`,
    hints: [t`Substitute $u = -x^2$ into the series for $\mathrm{e}^u$.`],
  });

  b.num({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`The Maclaurin series of a function begins $f(x) = 3 + 2x - 5x^2 + \cdots$. Find $f''(0)$.`,
    value: -10, wrong: [-5, -2.5],
    explanation: t`The coefficient of $x^2$ is $\frac{f''(0)}{2!}$, so $f''(0) = 2 \times (-5) = -10$.`,
    hints: [t`Coefficient of $x^2$ = $\frac{f''(0)}{2}$.`],
  });

  // Struct (12): f(x) = ln(1 + sin x)
  const f18 = (x) => log(1 + sin(x));
  checkDeriv(f18, (x) => cos(x) / (1 + sin(x)), [0.1, 0.5, 1]);
  checkDeriv((x) => cos(x) / (1 + sin(x)), (x) => -1 / (1 + sin(x)), [0.1, 0.5, 1]);
  checkDeriv((x) => -1 / (1 + sin(x)), (x) => cos(x) / (1 + sin(x)) ** 2, [0.1, 0.5, 1]);
  series(f18, (x) => x - x * x / 2 + x ** 3 / 6, 3, "ln(1+sinx)");
  const est18 = 0.1 - 0.005 + 0.001 / 6;
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`Let $f(x) = \ln(1 + \sin x)$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $f'(x) = \dfrac{\cos x}{1 + \sin x}$ and $f''(x) = -\dfrac{1}{1 + \sin x}$.`,
        points: [t`M1 chain rule: $f'(x) = \frac{\cos x}{1 + \sin x}$.`, t`M1 quotient rule: $f''(x) = \frac{-\sin x(1 + \sin x) - \cos^2 x}{(1 + \sin x)^2}$.`, t`A1 uses $\sin^2 x + \cos^2 x = 1$: numerator $-(1 + \sin x)$, so $f''(x) = -\frac{1}{1 + \sin x}$.`],
        modelAnswer: t`$$
f'(x) = \frac{\cos x}{1 + \sin x}
$$

$$
f''(x) = \frac{-\sin x(1 + \sin x) - \cos x \cdot \cos x}{(1 + \sin x)^2} = \frac{-\sin x - (\sin^2 x + \cos^2 x)}{(1 + \sin x)^2} = \frac{-(1 + \sin x)}{(1 + \sin x)^2} = -\frac{1}{1 + \sin x}
$$`,
        explanation: "Chain rule, then quotient rule and the Pythagorean identity." }),
      P.num({ label: "(b)", marks: 2, stem: t`Find $f'''(0)$.`, value: 1, wrong: [-1, 0],
        explanation: t`$f'''(x) = \frac{\cos x}{(1 + \sin x)^2}$, so $f'''(0) = 1$.` }),
      P.fib({ label: "(c)", marks: 3, stem: "Hence find the Maclaurin series of f(x) up to and including the term in x³.", template: "f(x) ≈ ({{blank:a}})x + ({{blank:b}})x² + ({{blank:c}})x³",
        blanks: [N("a", 1, "0", 1), FR("b", ["-1/2", "-0.5"], "-1", 0.0005, 1), FR("c", ["1/6", "0.1667", "0.167"], "1", 0.0005, 1)],
        explanation: t`$f(0) = 0$, $f'(0) = 1$, $f''(0) = -1$, $f'''(0) = 1$: $f(x) = x - \frac{x^2}{2} + \frac{x^3}{6} + \cdots$` }),
      P.num({ label: "(d)", marks: 2, stem: t`Use your series to estimate $\ln(1 + \sin 0.1)$, giving the value of the estimate to 5 decimal places.`, value: est18, dp: 5, wrong: [0.095, 0.09516],
        explanation: t`$0.1 - 0.005 + 0.000167 = 0.09517$.` }),
      P.manual({ label: "(e)", marks: 2, stem: "The calculator value is 0.095159 (6 d.p.). Explain why the estimate is close, and how it could be improved.",
        points: ["x = 0.1 is small, so the omitted x⁴ and higher terms are very small (about 10⁻⁵).", "Including the next non-zero term (x⁴) of the series would improve the estimate."],
        modelAnswer: "The error is about 0.000008, which is the size of the next term (−x⁴/12 = −0.0000083 at x = 0.1). Taking that term too gives 0.095158, closer still." }),
    ],
    explanation: "Differentiate repeatedly, evaluate at 0, build the series, and use it for a small x.",
    hints: ["Use the quotient rule for f″.", "Coefficient of xʳ is f⁽ʳ⁾(0)/r!."],
  });
  chk(rnd(est18, 5), 0.09517);
  series(f18, (x) => x - x * x / 2 + x ** 3 / 6 - x ** 4 / 12, 4, "x^4 term");
  chk(rnd(est18 - 0.0001 / 12, 6), 0.095158);

  // Struct (13): e^x cos x = 1 + x − x³/3; ∫₀^0.2; Taylor of sin about π/6; sin 31°
  series((x) => exp(x) * cos(x), (x) => 1 + x - x ** 3 / 3, 3, "e^x cos x");
  const int19 = 0.2 + 0.02 - 0.0016 / 12;
  chk(integrate((x) => 1 + x - x ** 3 / 3, 0, 0.2), int19, 1e-12);
  const h = PI / 180;
  const est19 = 0.5 + (sqrt(3) / 2) * h - 0.25 * h * h;
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "This question uses series to approximate an integral and a trigonometric value.",
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Using standard series, find the Maclaurin series of $\mathrm{e}^x\cos x$ up to and including the term in $x^3$.`, template: "e^x cos x ≈ 1 + ({{blank:a}})x + ({{blank:b}})x² + ({{blank:c}})x³",
        blanks: [N("a", 1, "0", 1), N("b", 0, "1", 1), FR("c", ["-1/3", "-0.333", "-0.3333"], "1/6", 0.0005, 1)],
        explanation: t`$(1 + x + \frac{x^2}{2} + \frac{x^3}{6})(1 - \frac{x^2}{2}) = 1 + x + \left(\frac{1}{2} - \frac{1}{2}\right)x^2 + \left(\frac{1}{6} - \frac{1}{2}\right)x^3 = 1 + x - \frac{x^3}{3}$.` }),
      P.num({ label: "(b)", marks: 3, stem: t`Hence estimate $\displaystyle\int_0^{0.2}\mathrm{e}^x\cos x\,\mathrm{d}x$, giving your answer to 4 decimal places.`, value: int19, dp: 4, wrong: [0.22, 0.2],
        explanation: t`$\int_0^{0.2}\left(1 + x - \frac{x^3}{3}\right)\mathrm{d}x = \left[x + \frac{x^2}{2} - \frac{x^4}{12}\right]_0^{0.2} = 0.2 + 0.02 - 0.000133 = 0.2199$.` }),
      P.fib({ label: "(c)", marks: 3, stem: t`Find the Taylor series of $\sin x$ about $x = \frac{\pi}{6}$, up to and including the term in $\left(x - \frac{\pi}{6}\right)^2$. Give the coefficients to 3 decimal places where they are not exact.`, template: "sin x ≈ ({{blank:a}}) + ({{blank:b}})(x − π/6) + ({{blank:c}})(x − π/6)²",
        blanks: [FR("a", ["0.5", "1/2"], "0.866", 0.0005, 1), FR("b", ["0.866"], "0.5", 0.0005, 1), FR("c", ["-0.25", "-1/4"], "-0.5", 0.0005, 1)],
        explanation: t`$f\left(\frac{\pi}{6}\right) = \frac{1}{2}$, $f'\left(\frac{\pi}{6}\right) = \cos\frac{\pi}{6} = \frac{\sqrt{3}}{2} = 0.866$, $\frac{f''\left(\frac{\pi}{6}\right)}{2!} = \frac{-\frac{1}{2}}{2} = -\frac{1}{4}$.` }),
      P.num({ label: "(d)", marks: 2, stem: t`Use your answer to (c) to estimate $\sin 31^\circ$, giving your answer to 4 decimal places.`, value: est19, dp: 4, wrong: [1.366, 0.5],
        explanation: t`$31^\circ = \frac{\pi}{6} + \frac{\pi}{180}$, so $x - \frac{\pi}{6} = 0.017453$: $0.5 + 0.866025 \times 0.017453 - 0.25 \times 0.000305 = 0.5150$.` }),
      P.manual({ label: "(e)", marks: 2, stem: t`Explain why the value substituted for $x - \frac{\pi}{6}$ in (d) is $\frac{\pi}{180}$ and not 1.`,
        points: ["The series for sin x is in radians (derivatives of sin need radians).", "1° = π/180 radians, so the step from 30° to 31° is π/180."],
        modelAnswer: "Calculus results such as d/dx(sin x) = cos x hold only in radians, so the Taylor series is in radians. The extra 1° must be converted: 1° = π/180 ≈ 0.01745 rad. Substituting 1 would mean 1 radian (about 57°)." }),
    ],
    explanation: "Multiply standard series and integrate term by term; build a Taylor series at a point with exact values; work in radians.",
    hints: [t`$\cos x = 1 - \frac{x^2}{2} + \cdots$; you need only up to $x^3$ in the product.`, t`Use $a = \frac{\pi}{6}$, where $\sin a$ and $\cos a$ are exact.`],
  });
  chk(rnd(est19, 4), 0.515); chk(rnd(int19, 4), 0.2199);

  b.card("FORMULA", "Maclaurin series", t`$f(x) = f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \cdots$`);
  b.card("FORMULA", "Taylor series about a", t`$f(x) = f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x - a)^2 + \cdots$`);
  b.card("FORMULA", "Series for eˣ", t`$1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$, all $x$`);
  b.card("FORMULA", "Series for sin x and cos x", t`$\sin x = x - \frac{x^3}{3!} + \cdots$; $\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots$, all $x$ (radians)`);
  b.card("FORMULA", "Series for ln(1 + x)", t`$x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots$, valid for $-1 < x \le 1$`);
  b.card("CONCEPT", "Composite series", t`Substitute the inner expression in brackets, e.g. $\mathrm{e}^{-x^2} = 1 - x^2 + \frac{x^4}{2} - \cdots$`);
  b.card("CONCEPT", "Products of series", "Multiply and keep only the products that give powers up to the one required.");
  b.card("CONCEPT", "Limits with series", "Expand numerator and denominator, cancel the lowest power of x, then let x → 0.");
  b.card("FACT", "Series of tan x", t`$\tan x = x + \frac{x^3}{3} + \cdots$`);
});
