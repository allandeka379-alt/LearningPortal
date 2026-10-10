// W2b: amaths.numerical.locating-roots
import { concept, P, t, chk, same, iterate, root, ZP } from "../lib.mjs";

const { cbrt, log, sqrt, exp, cos, sin } = Math;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });
const last = (xs) => xs[xs.length - 1];

concept("amaths.numerical.locating-roots", { file: "numerical/locating-roots", keyPrefix: "numerical.locating-roots" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which condition guarantees that the equation $f(x) = 0$ has a root between $a$ and $b$?`,
    options: [
      [t`$f$ is continuous on $[a, b]$ and $f(a)f(b) < 0$`, "Correct: a continuous function that changes sign must cross zero."],
      [t`$f$ is continuous on $[a, b]$ and $f(a)f(b) > 0$`, "A positive product means no change of sign, which proves nothing either way."],
      [t`$f(a)$ and $f(b)$ have opposite signs (continuity not needed)`, t`Without continuity a sign change can come from an asymptote, e.g. $\frac{1}{x - 1}$ on $[0, 2]$.`],
      [t`$f$ is continuous on $[a, b]$ and $f(a) = f(b)$`, "Equal end values say nothing about a root in between."],
    ],
    answer: "A",
    explanation: "Change of sign + continuity ⇒ at least one root in the interval.",
  });

  const f2 = (x) => x ** 3 + x - 3;
  chk(f2(1), -1); chk(f2(2), 7);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The equation $x^3 + x - 3 = 0$ has exactly one real root. Between which pair of consecutive integers does it lie?`,
    options: [
      ["1 and 2", t`Correct: $f(1) = -1 < 0$ and $f(2) = 7 > 0$.`],
      ["0 and 1", t`$f(0) = -3$ and $f(1) = -1$ are both negative: no change of sign.`],
      ["2 and 3", t`$f(2) = 7$ and $f(3) = 27$ are both positive.`],
      ["−1 and 0", t`$f(-1) = -5$ and $f(0) = -3$ are both negative.`],
    ],
    answer: "A",
    explanation: t`Let $f(x) = x^3 + x - 3$ (continuous). The sign changes between $x = 1$ and $x = 2$.`,
  });
  chk(f2(0), -3); chk(f2(-1), -5); chk(f2(3), 27);

  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`The iteration $x_{n+1} = \sqrt[3]{x_n + 5}$ is used with $x_1 = 2$. Find $x_2$, correct to 3 significant figures.`,
    value: cbrt(7), wrong: [sqrt(7), 7],
    explanation: t`$x_2 = \sqrt[3]{2 + 5} = \sqrt[3]{7} = 1.91$. (2.65 is the square root, not the cube root.)`,
  });

  chk((1.2 - 1.3) ** 2 - 0.01, 0, 1e-12); chk((1.4 - 1.3) ** 2 - 0.01, 0, 1e-12);
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $f(a)$ and $f(b)$ have the same sign, then the equation $f(x) = 0$ has no root between $a$ and $b$.`,
    answer: false,
    explanation: t`There may be an even number of roots. For example $f(x) = (x - 1.3)^2 - 0.01$ has $f(1) > 0$ and $f(2) > 0$, yet roots at $1.2$ and $1.4$.`,
  });

  const xs5 = iterate((x) => log(x + 4), 1.5);
  const r5 = root((x) => x - log(x + 4), 0, 3);
  chk(last(xs5), r5, 1e-10);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Use the iteration $x_{n+1} = \ln(x_n + 4)$ with $x_1 = 1.5$ to find the root of $x = \ln(x + 4)$ correct to 3 decimal places. Show each iterate to 5 decimal places in your working.`,
    value: r5, dp: 3, wrong: [1.748, 1.705],
    explanation: t`$x_2 = 1.70475$, $x_3 = 1.74130$, $x_4 = 1.74769$, $x_5 = 1.74880$, $x_6 = 1.74899$, $x_7 = 1.74902$. The iterates settle at $1.749$ (3 d.p.). Stopping at $x_4$ gives $1.748$, which is not yet correct.`,
    hints: ["Use the ANS key: ln(ANS + 4).", "Keep going until two iterates agree to 3 d.p."],
  });

  const F6 = (x) => sqrt(10 / x + 1);
  const r7 = root((x) => x ** 3 - x - 10, 2, 3);
  chk(F6(r7), r7, 1e-9);
  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`The iteration $x_{n+1} = \sqrt{\dfrac{10}{x_n} + 1}$ converges to a root of which equation?`,
    options: [
      [t`$x^3 - x - 10 = 0$`, t`Correct: $x^2 = \frac{10}{x} + 1 \Rightarrow x^3 = 10 + x$.`],
      [t`$x^3 + x - 10 = 0$`, t`Multiplying $x^2 = \frac{10}{x} + 1$ by $x$ gives $x^3 = 10 + x$, so the $x$ term is negative when moved over.`],
      [t`$x^2 - x - 10 = 0$`, t`Squaring removes the root but you must also multiply by $x$ to clear $\frac{10}{x}$.`],
      [t`$x^3 - 10x - 1 = 0$`, t`This multiplies the 1 by $x$ but not the 10: $x \cdot \frac{10}{x} = 10$.`],
    ],
    answer: "A",
    explanation: t`At the limit $\alpha = \sqrt{\frac{10}{\alpha} + 1}$; square and multiply by $\alpha$: $\alpha^3 - \alpha - 10 = 0$.`,
    hints: ["Replace x_{n+1} and x_n by x and rearrange."],
  });

  const xs7 = iterate(F6, 2);
  chk(last(xs7), r7, 1e-10);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Use the iteration $x_{n+1} = \sqrt{\dfrac{10}{x_n} + 1}$ with $x_1 = 2$ to find the root of $x^3 - x - 10 = 0$ correct to 2 decimal places.`,
    value: r7, dp: 2, wrong: [2.30, 2.33],
    explanation: t`$x_2 = 2.4495$, $x_3 = 2.2544$, $x_4 = 2.3315$, $x_5 = 2.2998$, $x_6 = 2.3126$, $x_7 = 2.3074$, $x_8 = 2.3095$, $x_9 = 2.3087$. The iterates oscillate either side of the root and settle at $2.31$. Check: $f(2.305) < 0 < f(2.315)$ for $f(x) = x^3 - x - 10$.`,
    hints: ["The iterates jump above and below the root; keep going until they agree to 2 d.p."],
  });
  chk(Math.sign(2.305 ** 3 - 2.305 - 10), -1); chk(Math.sign(2.315 ** 3 - 2.315 - 10), 1);

  // e^x = 4 − x² has two roots
  const g8 = (x) => exp(x) - 4 + x * x;
  root(g8, -2, 0); root(g8, 0, 2);
  b.num({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`By sketching $y = \mathrm{e}^x$ and $y = 4 - x^2$ on the same axes, state the number of real roots of the equation $\mathrm{e}^x = 4 - x^2$.`,
    value: 2, wrong: [1, 0],
    explanation: t`The parabola $y = 4 - x^2$ has its vertex at $(0, 4)$ and cuts the $x$-axis at $\pm 2$. The curve $y = \mathrm{e}^x$ passes through $(0, 1)$, below the vertex, and is above the parabola at $x = \pm 2$. So the curves cross once for $-2 < x < 0$ and once for $0 < x < 2$: two roots.`,
  });

  const f9 = (x) => x - 2 - exp(-x);
  chk(Math.sign(f9(2)), -1); chk(Math.sign(f9(3)), 1);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The equation $\mathrm{e}^{-x} = x - 2$ has one real root $\alpha$. Find the integer $n$ such that $n < \alpha < n + 1$.`,
    prefix: "n =", value: 2, wrong: [3, 1],
    explanation: t`Let $f(x) = x - 2 - \mathrm{e}^{-x}$ (continuous). $f(2) = -\mathrm{e}^{-2} = -0.135 < 0$ and $f(3) = 1 - \mathrm{e}^{-3} = 0.950 > 0$, so $2 < \alpha < 3$.`,
    hints: ["Try x = 2 and x = 3."],
  });

  // x² − 5x + 3 = 0, x = (x² + 3)/5: F'(x) = 2x/5
  const lo = (5 - sqrt(13)) / 2, hi = (5 + sqrt(13)) / 2;
  chk(last(iterate((x) => (x * x + 3) / 5, 1)), lo, 1e-9);
  chk((2 * hi) / 5 > 1 ? 1 : 0, 1);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: true, applies: ZP,
    stem: t`The equation $x^2 - 5x + 3 = 0$ has roots $0.697$ and $4.30$ (3 s.f.). The iteration $x_{n+1} = \dfrac{x_n^2 + 3}{5}$ is used. Which statement is true?`,
    options: [
      ["It can converge to 0.697 but not to 4.30", t`Correct: $F'(x) = \frac{2x}{5}$ is $0.28$ at $0.697$ (less than 1) but $1.72$ at $4.30$ (greater than 1).`],
      ["It can converge to 4.30 but not to 0.697", t`The gradient of $F$ at $4.30$ is $1.72 > 1$, so iterates move away from that root.`],
      ["It converges to either root, depending on the starting value", t`Near $4.30$, $|F'| > 1$: even a start very close to $4.30$ drifts away.`],
      ["It cannot converge to either root", t`At $0.697$, $|F'| = 0.28 < 1$, so iterates starting nearby converge.`],
    ],
    answer: "A",
    explanation: t`Convergence to a root $\alpha$ needs $|F'(\alpha)| < 1$. With $F(x) = \frac{x^2 + 3}{5}$, $F'(x) = \frac{2x}{5}$.`,
    hints: ["Differentiate F and evaluate at each root."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each rearrangement x = F(x) with the equation it comes from.",
    pairs: [
      [t`$x = \sqrt[3]{5 - 2x}$`, t`$x^3 + 2x - 5 = 0$`],
      [t`$x = \sqrt{6 - x}$`, t`$x^2 + x - 6 = 0$`],
      [t`$x = \ln(8 - x)$`, t`$\mathrm{e}^x + x - 8 = 0$`],
      [t`$x = 2 + \frac{1}{x}$`, t`$x^2 - 2x - 1 = 0$`],
    ],
    explanation: t`Undo each rearrangement: cube, square, exponentiate, or multiply by $x$, then collect terms on one side.`,
  });

  const r13 = root((x) => x - cos(x), 0, 1);
  chk(last(iterate(cos, 1)), r13, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Use the iteration $x_{n+1} = \cos x_n$ with $x_1 = 1$ to find the root of $x = \cos x$ correct to 3 decimal places. (Angles are in radians.)`,
    value: r13, dp: 3, wrong: [0.99984, 0.74],
    explanation: t`$x_2 = 0.5403$, $x_3 = 0.8576$, $x_4 = 0.6543$, … the iterates oscillate and settle at $0.739$ (3 d.p.). A calculator in degree mode gives $0.9998$, which is wrong.`,
    hints: ["Set the calculator to radians.", "The iterates converge slowly; be patient."],
  });

  // x_{n+1} = (2x + 9/x²)/3 → α³ = 9
  const r14 = last(iterate((x) => (2 * x + 9 / (x * x)) / 3, 2));
  chk(r14, cbrt(9), 1e-12);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The sequence defined by $x_{n+1} = \dfrac{1}{3}\left(2x_n + \dfrac{9}{x_n^2}\right)$, $x_1 = 2$, converges to $\alpha$. By forming an equation for $\alpha$, show that $\alpha^3 = k$ for an integer $k$, and give $\alpha$ correct to 3 decimal places.`,
    template: "k = {{blank:k}}, α = {{blank:a}}",
    blanks: [N("k", 9, "3"), D("a", 2.080, 0.0005, "2.08")],
    explanation: t`At the limit, $3\alpha = 2\alpha + \frac{9}{\alpha^2}$, so $\alpha = \frac{9}{\alpha^2}$ and $\alpha^3 = 9$. Then $\alpha = \sqrt[3]{9} = 2.080$ (3 d.p.; the zero is significant).`,
    hints: [t`Replace both $x_n$ and $x_{n+1}$ by $\alpha$.`],
  });
  chk(Math.round(cbrt(9) * 1000) / 1000, 2.08);

  const f15 = (x) => log(x) - 2 + x;
  chk(f15(1), -1); chk(Math.sign(f15(2)), 1);
  b.proof({
    d: 3, skill: "APPLICATION", calculator: true, marks: 3,
    stem: t`Show that the equation $\ln x = 2 - x$ has a root between $x = 1$ and $x = 2$.`,
    points: [
      t`M1 defines $f(x) = \ln x - 2 + x$ (or equivalent) and evaluates $f(1)$ and $f(2)$.`,
      t`A1 obtains $f(1) = -1$ and $f(2) = \ln 2 = 0.693$ (or equivalent values of correct sign).`,
      "A1 concludes: f is continuous on [1, 2] and changes sign, so there is a root between 1 and 2.",
    ],
    modelAnswer: t`Let $f(x) = \ln x + x - 2$, which is continuous for $x > 0$.
$$
f(1) = 0 + 1 - 2 = -1 < 0
$$
$$
f(2) = \ln 2 + 2 - 2 = 0.693 > 0
$$
There is a change of sign between $x = 1$ and $x = 2$ and $f$ is continuous, so $\ln x = 2 - x$ has a root in this interval.`,
    explanation: "Values, signs, continuity and a conclusion: all four are expected.",
    hints: ["Bring everything to one side first."],
  });

  b.manualShort({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 2,
    stem: t`A student evaluates $f(x) = (x - 1.3)^2 - 0.01$ at $x = 1$ and $x = 2$, finds both values positive, and concludes that $f(x) = 0$ has no root between 1 and 2. Explain the error.`,
    points: [
      "Equal signs at the ends do not rule out roots: there may be an even number of sign changes inside the interval.",
      "Here f(1.2) = f(1.4) = 0: the curve dips below the axis between 1.2 and 1.4, giving two roots in [1, 2].",
    ],
    modelAnswer: "The change-of-sign test only proves a root exists when the sign changes; with no change there may still be two (or any even number of) roots. f(x) = 0 when x − 1.3 = ±0.1, i.e. at 1.2 and 1.4, both between 1 and 2.",
    explanation: "Narrow intervals, or a sketch, avoid missing pairs of roots.",
    hints: ["Solve f(x) = 0 exactly."],
  });

  // Struct 12: x = 1 + sin x
  const g = (x) => x - 1 - sin(x);
  const a17 = root(g, 1.5, 2.5);
  const xs17 = iterate((x) => 1 + sin(x), 2);
  chk(last(xs17), a17, 1e-10);
  chk(Math.sign(g(1.5)), -1); chk(Math.sign(g(2.5)), 1);
  chk(Math.sign(g(1.9345)), -1); chk(Math.sign(g(1.9355)), 1);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The equation $x = 1 + \sin x$, where $x$ is in radians, has one root $\alpha$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show by calculation that $\alpha$ lies between $1.5$ and $2.5$.`,
        points: [t`M1 evaluates $g(x) = x - 1 - \sin x$ at both ends: $g(1.5) = -0.497$, $g(2.5) = 0.902$.`, "A1 notes the change of sign (g continuous) and concludes."],
        modelAnswer: t`$$
g(1.5) = 1.5 - 1 - \sin 1.5 = -0.497 < 0, \qquad g(2.5) = 2.5 - 1 - \sin 2.5 = 0.902 > 0
$$
$g$ is continuous and changes sign, so $1.5 < \alpha < 2.5$.`,
        explanation: "Radians throughout." }),
      P.fib({ label: "(b)", marks: 2, stem: t`Use the iteration $x_{n+1} = 1 + \sin x_n$ with $x_1 = 2$ to find $x_2$ and $x_3$, each correct to 4 decimal places.`, template: "x₂ = {{blank:a}}, x₃ = {{blank:b}}",
        blanks: [D("a", xs17[1].toFixed(4), 0.00005, "1.0349"), D("b", xs17[2].toFixed(4), 0.00005, "1.8596")],
        explanation: t`$x_2 = 1 + \sin 2 = 1.9093$; $x_3 = 1 + \sin 1.9093 = 1.9433$.` }),
      P.num({ label: "(c)", marks: 3, stem: t`Continue the iteration to find $\alpha$ correct to 3 decimal places.`, value: a17, dp: 3, wrong: [1.934, 1.943],
        explanation: t`$x_4 = 1.9314$, $x_5 = 1.9357$, $x_6 = 1.9342$, $x_7 = 1.9347$, $x_8 = 1.9345$, $x_9 = 1.9346$: $\alpha = 1.935$ (3 d.p.).` }),
      P.proof({ label: "(d)", marks: 3, stem: t`Use a change of sign to confirm that $\alpha = 1.935$ correct to 3 decimal places.`,
        points: [t`M1 evaluates $g$ at $1.9345$ and $1.9355$.`, t`A1 obtains $g(1.9345) = -0.00009 < 0$ and $g(1.9355) = 0.0013 > 0$.`, "A1 concludes that 1.9345 < α < 1.9355, so α = 1.935 to 3 d.p."],
        modelAnswer: t`$$
g(1.9345) = -0.0000857 < 0, \qquad g(1.9355) = 0.00127 > 0
$$
$g$ is continuous, so $1.9345 < \alpha < 1.9355$ and $\alpha = 1.935$ correct to 3 decimal places.`,
        explanation: "Bracket the answer by half a unit in the last decimal place." }),
      P.manual({ label: "(e)", marks: 2, stem: "The iterates in (c) lie alternately above and below α. Explain why.", points: [t`$F(x) = 1 + \sin x$ has $F'(x) = \cos x$, and $\cos\alpha \approx -0.36$, which is negative.`, t`A negative gradient with $|F'(\alpha)| < 1$ makes the iterates spiral (cobweb) in, alternating sides of the root while converging.`],
        modelAnswer: "Near the root, the error is multiplied by about F′(α) = cos α ≈ −0.36 at each step. The negative factor flips the sign of the error each time (a cobweb diagram), and its size below 1 makes the errors shrink.",
        explanation: "Positive F′ gives a staircase; negative F′ gives a cobweb." }),
    ],
    explanation: "Sign change to locate, iteration to refine, and a final sign change to confirm the accuracy.",
    hints: ["Make sure the calculator is in radians.", "For 3 d.p., test 1.9345 and 1.9355."],
  });
  chk(cos(a17), -0.3558, 1e-4);

  // Struct 13: x e^x = 5
  const h = (x) => x * exp(x) - 5;
  const a18 = root(h, 1, 1.5);
  const good = iterate((x) => (x + 5 * exp(-x)) / 2, 1.3);
  chk(last(good), a18, 1e-10);
  const bad = iterate((x) => 5 * exp(-x), 1.3, { maxN: 3 });
  chk(Math.sign(h(1)), -1); chk(Math.sign(h(1.5)), 1);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The equation $x\mathrm{e}^{x} = 5$ has one positive root $\alpha$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $\alpha$ lies between 1 and 1.5.`,
        points: [t`M1 evaluates $h(x) = x\mathrm{e}^x - 5$ at 1 and 1.5: $-2.28$ and $1.72$.`, "A1 states the sign change with continuity and concludes."],
        modelAnswer: t`$$
h(1) = \mathrm{e} - 5 = -2.28 < 0, \qquad h(1.5) = 1.5\mathrm{e}^{1.5} - 5 = 1.72 > 0
$$
$h$ is continuous, so $1 < \alpha < 1.5$.`,
        explanation: "Sign change on a continuous function." }),
      P.proof({ label: "(b)", marks: 2, stem: t`Show that $\alpha$ satisfies the equation $x = \frac{1}{2}\left(x + 5\mathrm{e}^{-x}\right)$.`,
        points: [t`M1 from $x\mathrm{e}^x = 5$ obtains $x = 5\mathrm{e}^{-x}$.`, t`A1 adds $x$ to both sides and halves: $2x = x + 5\mathrm{e}^{-x}$, giving the result.`],
        modelAnswer: t`$$
x\mathrm{e}^x = 5 \Rightarrow x = 5\mathrm{e}^{-x} \Rightarrow 2x = x + 5\mathrm{e}^{-x} \Rightarrow x = \tfrac{1}{2}\left(x + 5\mathrm{e}^{-x}\right)
$$`,
        explanation: "Averaging x with 5e^(−x) keeps the root but changes how the iteration behaves." }),
      P.num({ label: "(c)", marks: 3, stem: t`Use the iteration $x_{n+1} = \frac{1}{2}\left(x_n + 5\mathrm{e}^{-x_n}\right)$ with $x_1 = 1.3$ to find $\alpha$ correct to 3 decimal places.`, value: a18, dp: 3, wrong: [1.331, 1.326],
        explanation: t`$x_2 = 1.33133$, $x_3 = 1.32598$, $x_4 = 1.32685$, $x_5 = 1.32670$, $x_6 = 1.32673$: $\alpha = 1.327$.` }),
      P.fib({ label: "(d)", marks: 2, stem: t`A student instead uses $x_{n+1} = 5\mathrm{e}^{-x_n}$ with $x_1 = 1.3$. Find $x_2$ and $x_3$, correct to 4 decimal places.`, template: "x₂ = {{blank:a}}, x₃ = {{blank:b}}",
        blanks: [D("a", bad[1].toFixed(4), 0.00005, "1.3313"), D("b", bad[2].toFixed(4), 0.00005, "1.3260")],
        explanation: t`$x_2 = 5\mathrm{e}^{-1.3} = 1.3627$, $x_3 = 5\mathrm{e}^{-1.3627} = 1.2799$: the iterates move further from $\alpha$ each time.` }),
      P.num({ label: "(e)", marks: 2, stem: t`For $F(x) = 5\mathrm{e}^{-x}$, find $F'(\alpha)$ correct to 3 significant figures.`, value: -5 * exp(-a18), wrong: [5 * exp(-a18), -0.163],
        explanation: t`$F'(x) = -5\mathrm{e}^{-x}$. At the root, $5\mathrm{e}^{-\alpha} = \alpha$, so $F'(\alpha) = -\alpha = -1.33$.` }),
      P.manual({ label: "(f)", marks: 2, stem: "Use your answer to (e) to explain the behaviour of the student's iteration.", points: [t`$|F'(\alpha)| = 1.33 > 1$, so the error grows at each step: the iteration diverges.`, "F′(α) is negative, so the iterates jump from side to side of α (an outward cobweb)."],
        modelAnswer: "Each step multiplies the error by about −1.33: its size grows (divergence) and its sign alternates, so the iterates oscillate about α while moving away from it.",
        explanation: "Compare with (c): the averaged iteration has F′(α) = (1 − α)/2 ≈ −0.16." }),
    ],
    explanation: "Two rearrangements of the same equation: one converges quickly, one diverges, as |F′(α)| predicts.",
    hints: [t`At the root, $\alpha\mathrm{e}^{\alpha} = 5$, so $5\mathrm{e}^{-\alpha} = \alpha$.`, "Iteration converges when |F′(α)| < 1."],
  });
  chk(-5 * exp(-a18), -a18, 1e-9);
  same(good.length > 3, true);

  b.card("FACT", "Change of sign", t`If $f$ is continuous on $[a, b]$ and $f(a)f(b) < 0$, then $f(x) = 0$ has a root in $(a, b)$.`);
  b.card("CONCEPT", "Limits of the sign-change test", "No sign change does not mean no root (even numbers of roots, touching the axis); a sign change at an asymptote is not a root.");
  b.card("CONCEPT", "Locating roots graphically", t`Write the equation as $g(x) = h(x)$ and sketch both curves: intersections are roots.`);
  b.card("FORMULA", "Fixed-point iteration", t`$x_{n+1} = F(x_n)$; if it converges to $\alpha$, then $\alpha = F(\alpha)$.`);
  b.card("CONCEPT", "Proving accuracy", "To show α = 1.935 to 3 d.p., show a sign change between 1.9345 and 1.9355.");
  b.card("FACT", "Convergence condition", t`Iteration converges near $\alpha$ if $|F'(\alpha)| < 1$ and diverges if $|F'(\alpha)| > 1$.`, undefined, { applies: ZP });
  b.card("FACT", "Staircase and cobweb", t`$0 < F'(\alpha) < 1$: iterates approach from one side (staircase). $-1 < F'(\alpha) < 0$: they alternate sides (cobweb).`);
  b.card("CONCEPT", "Iteration on a calculator", "Enter x₁, then F(ANS) and press = repeatedly; keep full accuracy and use radians for trigonometric functions.");
  b.card("CONCEPT", "Finding the equation from an iteration", t`Replace $x_{n+1}$ and $x_n$ by $x$, then rearrange into $f(x) = 0$.`);
});
