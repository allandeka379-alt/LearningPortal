// W2b: amaths.complex.de-moivre (ZIMSEC only)
import { concept, P, t, chk, same, cx, rnd, sf } from "../lib.mjs";

const { sqrt, PI, cos, sin } = Math;
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const FR = (id, list, wrong, marks) => ({ id, input: "number", accepted: list, tolerance: 0.002, wrong, ...(marks ? { marks } : {}) });
const KPI = (id, theta, n, d, wrong, marks) => {
  chk(theta / PI, n / d, 1e-9, `${id} = ${n}/${d} π`);
  const v = n / d;
  return { id, input: "number", accepted: [`${n}/${d}`, v.toFixed(4), v.toFixed(3)], tolerance: 0.002, wrong, ...(marks ? { marks } : {}) };
};
const TH = [0.2, 0.7, 1.3, 2.2, 3.0];
const ident = (f, g, l) => TH.forEach((x) => chk(f(x), g(x), 1e-9, `${l} at ${x}`));
const near0 = (z, w, l) => { chk(z[0], w[0], 1e-9, `${l} re`); chk(z[1], w[1], 1e-9, `${l} im`); };

concept("amaths.complex.de-moivre", { file: "complex/de-moivre", keyPrefix: "complex.de-moivre" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`By de Moivre's theorem, $(\cos\theta + \mathrm{i}\sin\theta)^5$ equals`,
    options: [
      [t`$\cos 5\theta + \mathrm{i}\sin 5\theta$`, "Correct: the power multiplies the angle."],
      [t`$\cos^5\theta + \mathrm{i}\sin^5\theta$`, "The theorem multiplies the angle by 5; it does not raise cos and sin to the fifth power."],
      [t`$5\cos\theta + 5\mathrm{i}\sin\theta$`, "This multiplies by 5 instead of raising to the power 5."],
      [t`$\cos 5\theta - \mathrm{i}\sin 5\theta$`, t`This is the result for the power $-5$.`],
    ],
    answer: "A",
    explanation: t`$(\cos\theta + \mathrm{i}\sin\theta)^n = \cos n\theta + \mathrm{i}\sin n\theta$; in exponential form, $(\mathrm{e}^{\mathrm{i}\theta})^5 = \mathrm{e}^{5\mathrm{i}\theta}$.`,
  });

  near0(cx.pow([1, 1], 8), [16, 0], "q2");
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Use de Moivre's theorem to evaluate $(1 + \mathrm{i})^8$.`,
    value: 16, wrong: [256, 2],
    explanation: t`$1 + \mathrm{i} = \sqrt{2}\,\mathrm{e}^{\mathrm{i}\pi/4}$, so $(1 + \mathrm{i})^8 = (\sqrt{2})^8\mathrm{e}^{2\pi\mathrm{i}} = 16 \times 1 = 16$. (256 uses modulus 2 instead of $\sqrt{2}$.)`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: t`Which expression equals $(\cos\theta + \mathrm{i}\sin\theta)^{-1}$?`,
    options: [
      [t`$\cos\theta - \mathrm{i}\sin\theta$`, t`Correct: $\cos(-\theta) + \mathrm{i}\sin(-\theta) = \cos\theta - \mathrm{i}\sin\theta$.`],
      [t`$-\cos\theta - \mathrm{i}\sin\theta$`, t`This is $-(\cos\theta + \mathrm{i}\sin\theta)$, the negative, not the reciprocal.`],
      [t`$\dfrac{1}{\cos\theta} + \dfrac{\mathrm{i}}{\sin\theta}$`, "The reciprocal of a sum is not the sum of the reciprocals."],
      [t`$\sin\theta + \mathrm{i}\cos\theta$`, t`This swaps the parts; it equals $\mathrm{i}\mathrm{e}^{-\mathrm{i}\theta}$, not $\mathrm{e}^{-\mathrm{i}\theta}$.`],
    ],
    answer: "A",
    explanation: t`De Moivre with $n = -1$: the argument becomes $-\theta$, and cosine is even while sine is odd.`,
  });

  near0(cx.pow([sqrt(3), -1], 6), [-64, 0], "q4");
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate $(\sqrt{3} - \mathrm{i})^6$.`,
    value: -64, wrong: [64, 8],
    explanation: t`$\sqrt{3} - \mathrm{i} = 2\mathrm{e}^{-\mathrm{i}\pi/6}$. So $(\sqrt{3} - \mathrm{i})^6 = 64\mathrm{e}^{-\mathrm{i}\pi} = 64(\cos\pi - \mathrm{i}\sin\pi) = -64$.`,
    hints: ["Write the number in polar form first."],
  });

  const p5 = cx.pow([1, -1], 10);
  near0(p5, [0, -32], "q5");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Express $(1 - \mathrm{i})^{10}$ in the form $x + \mathrm{i}y$.`,
    template: "x = {{blank:x}}, y = {{blank:y}}",
    blanks: [N("x", 0, "32"), N("y", -32, "32")],
    explanation: t`$1 - \mathrm{i} = \sqrt{2}\,\mathrm{e}^{-\mathrm{i}\pi/4}$. Then $(1 - \mathrm{i})^{10} = 2^5\mathrm{e}^{-10\mathrm{i}\pi/4} = 32\mathrm{e}^{-5\pi\mathrm{i}/2} = 32\mathrm{e}^{-\mathrm{i}\pi/2} = -32\mathrm{i}$.`,
    hints: [t`$-\frac{5\pi}{2}$ and $-\frac{\pi}{2}$ differ by $2\pi$.`],
  });

  const q6 = cx.div(cx.pow(cx.polar(1, PI / 9), 6), cx.pow(cx.polar(1, -PI / 18), 3));
  chk(cx.arg(q6), (5 * PI) / 6);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Find the real part of $\dfrac{\left(\cos\frac{\pi}{9} + \mathrm{i}\sin\frac{\pi}{9}\right)^6}{\left(\cos\frac{\pi}{18} - \mathrm{i}\sin\frac{\pi}{18}\right)^3}$, correct to 3 significant figures.`,
    value: q6[0], wrong: [cos(PI / 2), 0.866],
    explanation: t`Numerator $\mathrm{e}^{6\mathrm{i}\pi/9} = \mathrm{e}^{2\pi\mathrm{i}/3}$. Denominator $\left(\mathrm{e}^{-\mathrm{i}\pi/18}\right)^3 = \mathrm{e}^{-\mathrm{i}\pi/6}$. Quotient $\mathrm{e}^{\mathrm{i}(2\pi/3 + \pi/6)} = \mathrm{e}^{5\pi\mathrm{i}/6}$, with real part $\cos\frac{5\pi}{6} = -\frac{\sqrt{3}}{2} = -0.866$. (0 comes from subtracting $\frac{\pi}{6}$ instead of adding it.)`,
    hints: [t`$\cos\alpha - \mathrm{i}\sin\alpha = \mathrm{e}^{-\mathrm{i}\alpha}$.`],
  });

  const r5 = cx.roots([1, 0], 5);
  near0(r5.reduce((a, z) => cx.add(a, z), [0, 0]), [0, 0], "q7");
  b.fib({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`How many distinct roots does $z^5 = 1$ have, and what is their sum?`,
    template: "number of roots {{blank:n}}, sum {{blank:s}}",
    blanks: [N("n", r5.length, "1"), N("s", 0, "1")],
    explanation: t`The fifth roots of unity are $\mathrm{e}^{2k\pi\mathrm{i}/5}$, $k = 0, \dots, 4$: five vertices of a regular pentagon centred at $O$. Their sum is 0 (it is minus the coefficient of $z^4$ in $z^5 - 1$).`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For every integer $n \ge 2$, the $n$ roots of $z^n = 1$ add up to 0.`,
    answer: true,
    explanation: t`If $\omega = \mathrm{e}^{2\pi\mathrm{i}/n}$, the roots are $1, \omega, \dots, \omega^{n-1}$, a geometric series with sum $\frac{\omega^n - 1}{\omega - 1} = 0$ because $\omega^n = 1$ and $\omega \ne 1$.`,
  });

  const r9 = cx.roots([0, 27], 3);
  const first = r9.find((z) => z[0] > 0 && z[1] > 0);
  chk(first[0], (3 * sqrt(3)) / 2); chk(first[1], 1.5);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $z^3 = 27\mathrm{i}$. Give the root that lies in the first quadrant in the form $x + \mathrm{i}y$, with $x$ correct to 3 significant figures.`,
    template: "x = {{blank:x}}, y = {{blank:y}}",
    blanks: [D("x", rnd(first[0], 3), 0.005, "1.5"), D("y", 1.5, 0.001, "2.598")],
    explanation: t`$27\mathrm{i} = 27\mathrm{e}^{\mathrm{i}\pi/2}$, so $|z| = 3$ and $\arg z = \frac{\pi}{6}, \frac{5\pi}{6}, -\frac{\pi}{2}$. The first-quadrant root is $3\mathrm{e}^{\mathrm{i}\pi/6} = \frac{3\sqrt{3}}{2} + \frac{3}{2}\mathrm{i} = 2.60 + 1.5\mathrm{i}$.`,
    hints: [t`Add $2k\pi$ to $\frac{\pi}{2}$ before dividing by 3.`],
  });

  const r10 = cx.roots([-16, 0], 4);
  r10.forEach((z, i) => { chk(Math.abs(z[0]), sqrt(2), 1e-9, `q10 ${i}`); chk(Math.abs(z[1]), sqrt(2), 1e-9, `q10 ${i}`); });
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The four roots of $z^4 = -16$ are $\pm a \pm a\mathrm{i}$ (all four sign combinations). Find $a$, correct to 3 significant figures, and the principal argument of the root in the second quadrant as kπ.`,
    template: "a = {{blank:a}}, k = {{blank:k}}",
    blanks: [D("a", rnd(sqrt(2), 4), 0.005, "2"), KPI("k", cx.arg(r10.find((z) => z[0] < 0 && z[1] > 0)), 3, 4, "1/4")],
    explanation: t`$-16 = 16\mathrm{e}^{\mathrm{i}\pi}$, so $|z| = 2$ and $\arg z = \frac{\pi + 2k\pi}{4} = \pm\frac{\pi}{4}, \pm\frac{3\pi}{4}$. Each root is $2\left(\pm\frac{\sqrt{2}}{2} \pm \frac{\sqrt{2}}{2}\mathrm{i}\right)$, so $a = \sqrt{2} = 1.41$; the second-quadrant root has argument $\frac{3\pi}{4}$.`,
    hints: [t`$-16$ has modulus 16 and argument $\pi$.`],
  });

  ident((x) => cos(3 * x), (x) => 4 * cos(x) ** 3 - 3 * cos(x), "cos3");
  b.mcq({
    d: 3, skill: "RECALL", calculator: false,
    stem: t`Which expression equals $\cos 3\theta$?`,
    options: [
      [t`$4\cos^3\theta - 3\cos\theta$`, t`Correct: the real part of $(c + \mathrm{i}s)^3$ is $c^3 - 3cs^2 = 4c^3 - 3c$.`],
      [t`$3\cos\theta - 4\cos^3\theta$`, t`This has the signs of $\sin 3\theta = 3\sin\theta - 4\sin^3\theta$; for cosine they are reversed.`],
      [t`$4\cos^3\theta + 3\cos\theta$`, t`$-3cs^2$ becomes $-3c(1 - c^2) = -3c + 3c^3$, so the $c$ term is negative.`],
      [t`$2\cos^2\theta - 1$`, t`This is $\cos 2\theta$.`],
    ],
    answer: "A",
    explanation: t`Equate real parts in $\cos 3\theta + \mathrm{i}\sin 3\theta = (\cos\theta + \mathrm{i}\sin\theta)^3$, then use $\sin^2\theta = 1 - \cos^2\theta$.`,
    hints: ["Expand (c + is)³ and take the real part."],
  });

  ident((x) => sin(5 * x), (x) => 16 * sin(x) ** 5 - 20 * sin(x) ** 3 + 5 * sin(x), "sin5");
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Use de Moivre's theorem to express $\sin 5\theta$ in the form $a\sin^5\theta + b\sin^3\theta + c\sin\theta$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
    blanks: [N("a", 16, "1"), N("b", -20, "-10"), N("c", 5, "1")],
    explanation: t`The imaginary part of $(c + \mathrm{i}s)^5$ is $5c^4s - 10c^2s^3 + s^5$. With $c^2 = 1 - s^2$: $5(1 - s^2)^2s - 10(1 - s^2)s^3 + s^5 = 5s - 10s^3 + 5s^5 - 10s^3 + 10s^5 + s^5 = 16s^5 - 20s^3 + 5s$.`,
    hints: ["Take the imaginary part of the binomial expansion.", "Replace cos²θ by 1 − sin²θ."],
  });

  ident((x) => sin(x) ** 4, (x) => cos(4 * x) / 8 - cos(2 * x) / 2 + 3 / 8, "sin4");
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`By considering $\left(z - \frac{1}{z}\right)^4$ with $z = \cos\theta + \mathrm{i}\sin\theta$, express $\sin^4\theta$ in the form $p\cos 4\theta + q\cos 2\theta + r$. Fractions are allowed.`,
    template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}",
    blanks: [FR("p", ["1/8", "0.125"], "1/16"), FR("q", ["-1/2", "-0.5"], "1/2"), FR("r", ["3/8", "0.375"], "3/16")],
    explanation: t`$\left(z - \frac{1}{z}\right)^4 = (2\mathrm{i}\sin\theta)^4 = 16\sin^4\theta$. Also $= z^4 - 4z^2 + 6 - \frac{4}{z^2} + \frac{1}{z^4} = 2\cos 4\theta - 8\cos 2\theta + 6$. So $\sin^4\theta = \frac{1}{8}\cos 4\theta - \frac{1}{2}\cos 2\theta + \frac{3}{8}$.`,
    hints: [t`$z - \frac{1}{z} = 2\mathrm{i}\sin\theta$ and $(2\mathrm{i})^4 = 16$.`, t`$z^n + z^{-n} = 2\cos n\theta$.`],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`With $z = \cos\theta + \mathrm{i}\sin\theta$, match each expression with its value.`,
    pairs: [
      [t`$z + \frac{1}{z}$`, t`$2\cos\theta$`],
      [t`$z - \frac{1}{z}$`, t`$2\mathrm{i}\sin\theta$`],
      [t`$z^n + \frac{1}{z^n}$`, t`$2\cos n\theta$`],
      [t`$z^n - \frac{1}{z^n}$`, t`$2\mathrm{i}\sin n\theta$`],
    ],
    explanation: t`$z^n = \cos n\theta + \mathrm{i}\sin n\theta$ and $z^{-n} = \cos n\theta - \mathrm{i}\sin n\theta$; add or subtract.`,
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 5,
    stem: t`Prove by mathematical induction that $(\cos\theta + \mathrm{i}\sin\theta)^n = \cos n\theta + \mathrm{i}\sin n\theta$ for every positive integer $n$.`,
    points: [
      t`B1 basis: $n = 1$ gives $\cos\theta + \mathrm{i}\sin\theta$ on both sides.`,
      t`M1 assumes the result for $n = k$ and writes $(\cos\theta + \mathrm{i}\sin\theta)^{k+1} = (\cos k\theta + \mathrm{i}\sin k\theta)(\cos\theta + \mathrm{i}\sin\theta)$.`,
      t`M1 expands and collects real and imaginary parts, using $\mathrm{i}^2 = -1$.`,
      t`A1 uses the compound-angle formulae to reach $\cos(k + 1)\theta + \mathrm{i}\sin(k + 1)\theta$.`,
      "A1 concludes: true for n = 1, and true for k implies true for k + 1, so true for all positive integers n.",
    ],
    modelAnswer: t`**Basis.** For $n = 1$: LHS $= \cos\theta + \mathrm{i}\sin\theta =$ RHS.

**Assumption.** Suppose $(\cos\theta + \mathrm{i}\sin\theta)^k = \cos k\theta + \mathrm{i}\sin k\theta$ for some positive integer $k$.

**Step.**
$$
(\cos\theta + \mathrm{i}\sin\theta)^{k+1} = (\cos k\theta + \mathrm{i}\sin k\theta)(\cos\theta + \mathrm{i}\sin\theta)
$$
$$
= (\cos k\theta\cos\theta - \sin k\theta\sin\theta) + \mathrm{i}(\sin k\theta\cos\theta + \cos k\theta\sin\theta)
$$
$$
= \cos(k + 1)\theta + \mathrm{i}\sin(k + 1)\theta
$$

**Conclusion.** The result is true for $n = 1$, and if it is true for $n = k$ it is true for $n = k + 1$. Hence it is true for every positive integer $n$.`,
    explanation: "The compound-angle formulae do the work in the inductive step.",
    hints: ["Multiply the n = k result by one more factor (cos θ + i sin θ)."],
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Given that de Moivre's theorem holds for positive integers, prove that it also holds when $n = -m$, where $m$ is a positive integer.`,
    points: [
      t`M1 writes $(\cos\theta + \mathrm{i}\sin\theta)^{-m} = \dfrac{1}{\cos m\theta + \mathrm{i}\sin m\theta}$.`,
      t`M1 multiplies by the conjugate: denominator $\cos^2 m\theta + \sin^2 m\theta = 1$.`,
      t`A1 obtains $\cos m\theta - \mathrm{i}\sin m\theta = \cos(-m\theta) + \mathrm{i}\sin(-m\theta) = \cos n\theta + \mathrm{i}\sin n\theta$.`,
    ],
    modelAnswer: t`$$
(\cos\theta + \mathrm{i}\sin\theta)^{-m} = \frac{1}{(\cos\theta + \mathrm{i}\sin\theta)^m} = \frac{1}{\cos m\theta + \mathrm{i}\sin m\theta}
$$
$$
= \frac{\cos m\theta - \mathrm{i}\sin m\theta}{\cos^2 m\theta + \sin^2 m\theta} = \cos m\theta - \mathrm{i}\sin m\theta
$$
$$
= \cos(-m\theta) + \mathrm{i}\sin(-m\theta) = \cos n\theta + \mathrm{i}\sin n\theta
$$`,
    explanation: "Use the positive-integer result, then the conjugate, then cos(−x) = cos x and sin(−x) = −sin x.",
    hints: ["Write the negative power as a reciprocal."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Describe the positions of the six roots of $z^6 = 1$ on an Argand diagram.`,
    points: [
      "They lie on the unit circle (modulus 1), equally spaced at angles of π/3 (60°).",
      "They are the vertices of a regular hexagon centred at the origin, with one vertex at 1 (and one at −1).",
    ],
    modelAnswer: "The roots are e^(kπi/3) for k = 0, …, 5: all on the circle |z| = 1, π/3 apart, forming a regular hexagon centred at O with vertices at 1, −1 and ½ ± (√3/2)i, −½ ± (√3/2)i.",
    explanation: "nth roots of unity are equally spaced on the unit circle.",
    hints: ["What are the modulus and the arguments of the roots?"],
  });

  // Struct 12: cos 5θ = 16c⁵ − 20c³ + 5c; c² = (5 ± √5)/8
  ident((x) => cos(5 * x), (x) => 16 * cos(x) ** 5 - 20 * cos(x) ** 3 + 5 * cos(x), "cos5");
  const big = (5 + sqrt(5)) / 8, small = (5 - sqrt(5)) / 8;
  chk(cos(PI / 10) ** 2, big); chk(cos((3 * PI) / 10) ** 2, small);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`This question uses de Moivre's theorem to find exact values of $\cos\frac{\pi}{10}$ and $\cos\frac{3\pi}{10}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 5, stem: t`Show that $\cos 5\theta = 16\cos^5\theta - 20\cos^3\theta + 5\cos\theta$.`,
        points: [t`M1 writes $\cos 5\theta + \mathrm{i}\sin 5\theta = (c + \mathrm{i}s)^5$.`, "M1 expands with binomial coefficients 1, 5, 10, 10, 5, 1.", t`A1 real part $c^5 - 10c^3s^2 + 5cs^4$.`, t`M1 substitutes $s^2 = 1 - c^2$.`, "A1 simplifies to the given result."],
        modelAnswer: t`$$
\cos 5\theta = \mathrm{Re}(c + \mathrm{i}s)^5 = c^5 - 10c^3s^2 + 5cs^4
$$
$$
= c^5 - 10c^3(1 - c^2) + 5c(1 - c^2)^2
$$
$$
= c^5 - 10c^3 + 10c^5 + 5c - 10c^3 + 5c^5 = 16c^5 - 20c^3 + 5c
$$`,
        explanation: "Only the even powers of is contribute to the real part." }),
      P.fib({ label: "(b)", marks: 3, stem: t`By considering $\cos 5\theta = 0$ with $\theta = \frac{\pi}{10}$, show that $c = \cos\frac{\pi}{10}$ satisfies $16c^4 - 20c^2 + 5 = 0$, and find the two values of $c^2$ given by this equation, correct to 4 decimal places (larger first).`, template: "c² = {{blank:a}} or c² = {{blank:b}}",
        blanks: [D("a", rnd(big, 4), 0.00005, "0.3455"), D("b", rnd(small, 4), 0.00005, "0.9045")],
        explanation: t`$\cos\frac{\pi}{2} = 0$ and $c \ne 0$, so $16c^4 - 20c^2 + 5 = 0$. Then $c^2 = \dfrac{20 \pm \sqrt{400 - 320}}{32} = \dfrac{5 \pm \sqrt{5}}{8}$: $0.9045$ or $0.3455$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Deduce the value of $\cos\frac{\pi}{10}$, correct to 4 decimal places.`, value: cos(PI / 10), dp: 4, wrong: [rnd(sqrt(small), 4), rnd(big, 4)],
        explanation: t`$\frac{\pi}{10}$ is small, so $\cos\frac{\pi}{10}$ is the larger positive root: $\sqrt{\frac{5 + \sqrt{5}}{8}} = 0.9511$.` }),
      P.num({ label: "(d)", marks: 2, stem: t`Hence find the value of $\cos^2\frac{3\pi}{10}$, correct to 4 decimal places.`, value: small, dp: 4, wrong: [rnd(big, 4)],
        explanation: t`$\theta = \frac{3\pi}{10}$ also gives $\cos 5\theta = \cos\frac{3\pi}{2} = 0$, and $\cos^2\frac{3\pi}{10} < \cos^2\frac{\pi}{10}$, so it is $\frac{5 - \sqrt{5}}{8} = 0.3455$.` }),
    ],
    explanation: "A multiple-angle formula turns cos 5θ = 0 into a polynomial equation whose roots are exact cosines.",
    hints: ["Binomial coefficients for the fifth power: 1, 5, 10, 10, 5, 1.", "Solve the quartic as a quadratic in c²."],
  });

  // Struct 13: w = −4 + 4√3 i; z³ = w
  const w = [-4, 4 * sqrt(3)];
  chk(cx.mod(w), 8); chk(cx.arg(w), (2 * PI) / 3);
  const roots = cx.roots(w, 3);
  [-4 / 9, 2 / 9, 8 / 9].forEach((k, i) => chk(cx.arg(roots[i]) / PI, k));
  const side = cx.mod(cx.sub(roots[1], roots[2]));
  chk(side, 2 * sqrt(3));
  const area = (sqrt(3) / 4) * side * side;
  chk(area, 3 * sqrt(3));
  near0(roots.reduce((a, z) => cx.add(a, z), [0, 0]), [0, 0], "sum");
  const top = roots[1];
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The complex number $w$ is $-4 + 4\sqrt{3}\,\mathrm{i}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the modulus of w and its argument as kπ, where −1 < k ≤ 1.", template: "|w| = {{blank:m}}, k = {{blank:k}}",
        blanks: [N("m", 8, "64"), KPI("k", cx.arg(w), 2, 3, "-1/3")],
        explanation: t`$|w| = \sqrt{16 + 48} = 8$; second quadrant with $\alpha = \tan^{-1}\sqrt{3} = \frac{\pi}{3}$, so $\arg w = \frac{2\pi}{3}$.` }),
      P.fib({ label: "(b)", marks: 3, stem: t`Solve $z^3 = w$. Each root is $2\mathrm{e}^{k\pi\mathrm{i}}$; give the three values of $k$ in ascending order, with $-1 < k \le 1$.`, template: "k = {{blank:a}}, {{blank:b}}, {{blank:c}}",
        blanks: [KPI("a", cx.arg(roots[0]), -4, 9, "-2/9"), KPI("b", cx.arg(roots[1]), 2, 9, "2/3"), KPI("c", cx.arg(roots[2]), 8, 9, "4/9")],
        explanation: t`$|z| = 8^{1/3} = 2$. Arguments $\frac{1}{3}\left(\frac{2\pi}{3} + 2k\pi\right) = \frac{2\pi}{9}, \frac{8\pi}{9}, \frac{14\pi}{9}$; the last is $-\frac{4\pi}{9}$ as a principal value.` }),
      P.num({ label: "(c)", marks: 3, stem: "The roots are the vertices of a triangle. Find its area, correct to 3 significant figures.", value: area, wrong: [sqrt(3), 12],
        explanation: t`The vertices are equally spaced on the circle of radius 2, so the triangle is equilateral with side $2 \times 2\sin\frac{\pi}{3} = 2\sqrt{3}$. Area $= \frac{\sqrt{3}}{4}(2\sqrt{3})^2 = 3\sqrt{3} = 5.20$.`,
        hints: ["The angle at the centre between neighbouring roots is 2π/3."] }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the sum of the three roots is zero.",
        points: ["The roots of z³ − w = 0 have sum equal to minus the coefficient of z², which is 0.", "Equivalently, the roots are equally spaced vectors from O (an equilateral triangle centred at O), so their vector sum is zero."],
        modelAnswer: "z³ − w = (z − z₁)(z − z₂)(z − z₃); comparing the z² coefficients gives z₁ + z₂ + z₃ = 0. Geometrically the centroid of the equilateral triangle is the origin.",
        explanation: "Sum of roots = −(coefficient of z²)/(coefficient of z³)." }),
      P.fib({ label: "(e)", marks: 3, stem: "Find the root with the greatest real part in the form x + iy, with x and y correct to 3 significant figures.", template: "x = {{blank:x}}, y = {{blank:y}}",
        blanks: [D("x", top[0].toPrecision(4), 0.005, "1.29", 1), D("y", top[1].toPrecision(4), 0.005, "1.53", 2)],
        explanation: t`The root with greatest real part has argument $\frac{2\pi}{9}$ (40°): $2\cos\frac{2\pi}{9} = 1.53$ and $2\sin\frac{2\pi}{9} = 1.29$.` }),
    ],
    explanation: "Write w in polar form, add 2kπ before dividing the argument by 3, and use the symmetry of the roots.",
    hints: ["Each root has modulus 8^(1/3).", "Neighbouring roots are 2π/3 apart."],
  });
  chk(sf(top[0], 3), 1.53);

  b.card("FORMULA", "De Moivre's theorem", t`$(\cos\theta + \mathrm{i}\sin\theta)^n = \cos n\theta + \mathrm{i}\sin n\theta$ for every integer $n$.`);
  b.card("FORMULA", "Power of a polar number", t`$(r\mathrm{e}^{\mathrm{i}\theta})^n = r^n\mathrm{e}^{\mathrm{i}n\theta}$`);
  b.card("CONCEPT", "Inductive step for de Moivre", t`Multiply $\cos k\theta + \mathrm{i}\sin k\theta$ by $\cos\theta + \mathrm{i}\sin\theta$ and use the compound-angle formulae.`);
  b.card("FORMULA", "z + 1/z identities", t`With $z = \mathrm{e}^{\mathrm{i}\theta}$: $z^n + z^{-n} = 2\cos n\theta$, $z^n - z^{-n} = 2\mathrm{i}\sin n\theta$.`);
  b.card("FORMULA", "Triple angles", t`$\cos 3\theta = 4\cos^3\theta - 3\cos\theta$; $\sin 3\theta = 3\sin\theta - 4\sin^3\theta$.`);
  b.card("FORMULA", "Roots of zⁿ = Re^(iφ)", t`$z = R^{1/n}\mathrm{e}^{\mathrm{i}(\phi + 2k\pi)/n}$, $k = 0, 1, \dots, n - 1$.`);
  b.card("FACT", "nth roots of unity", "They form a regular n-gon on the unit circle with a vertex at 1; for n ≥ 2 they sum to 0.");
  b.card("FACT", "Cube roots of unity", t`$1, \omega, \omega^2$ with $\omega = \mathrm{e}^{2\pi\mathrm{i}/3}$ and $1 + \omega + \omega^2 = 0$.`);
  b.card("CONCEPT", "cos nθ in powers of cos θ", t`Expand $(c + \mathrm{i}s)^n$ binomially, take the real part, replace $s^2$ by $1 - c^2$.`);
});
