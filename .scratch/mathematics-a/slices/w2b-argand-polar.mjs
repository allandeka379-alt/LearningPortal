// W2b: amaths.complex.argand-polar
import { concept, P, t, chk, same, cx, sf } from "../lib.mjs";

const { sqrt, PI, atan, cos } = Math;
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });
/** Blank for an angle written as k·π: checks theta/π = n/d and accepts the fraction and its decimals. */
const KPI = (id, theta, n, d, wrong, marks) => {
  chk(theta / PI, n / d, 1e-9, `${id} = ${n}/${d} π`);
  const v = n / d;
  return { id, input: "number", accepted: [`${n}/${d}`, v.toFixed(4), v.toFixed(3)], tolerance: 0.002, wrong, ...(marks ? { marks } : {}) };
};
/** Blank for a value to 3 s.f. (tolerance half a unit in the 3rd s.f.). */
const S3 = (id, x, wrong, marks, n = 3) => {
  const v = sf(x, n);
  const dp = Math.max(0, n - 1 - Math.floor(Math.log10(Math.abs(x))));
  return { id, input: "number", accepted: [String(v)], tolerance: 0.5 * 10 ** -dp, wrong, ...(marks ? { marks } : {}) };
};

/** Blank for an irrational value: accepted 4 s.f., tolerance chosen so every correct 3 s.f. answer also scores. */
const M = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [x.toPrecision(4)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });

concept("amaths.complex.argand-polar", { file: "complex/argand-polar", keyPrefix: "complex.argand-polar" }, (b) => {
  chk(cx.mod([5, -12]), 13);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Find $|5 - 12\mathrm{i}|$.`,
    options: [
      ["13", t`Correct: $\sqrt{5^2 + 12^2} = \sqrt{169} = 13$.`],
      ["17", "This adds 5 and 12; the modulus is a distance found by Pythagoras."],
      ["7", "This subtracts; the sign of the imaginary part does not matter once it is squared."],
      ["169", "This is the square of the modulus; take the square root."],
    ],
    answer: "A",
    explanation: t`$|x + \mathrm{i}y| = \sqrt{x^2 + y^2}$, the distance of the point $(5, -12)$ from the origin.`,
  });

  chk(cx.arg([-1, -1]), -3 * PI / 4);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`What is the principal argument of $-1 - \mathrm{i}$?`,
    options: [
      [t`$-\frac{3\pi}{4}$`, t`Correct: the point is in the third quadrant, $\frac{3\pi}{4}$ clockwise from the positive real axis.`],
      [t`$\frac{\pi}{4}$`, t`This is $\tan^{-1}\frac{-1}{-1}$, the argument of $1 + \mathrm{i}$ in the opposite quadrant.`],
      [t`$\frac{3\pi}{4}$`, t`This is the argument of $-1 + \mathrm{i}$, in the second quadrant.`],
      [t`$\frac{5\pi}{4}$`, t`This describes the right direction but is outside the principal range $-\pi < \theta \le \pi$; subtract $2\pi$.`],
    ],
    answer: "A",
    explanation: t`Sketch: $-1 - \mathrm{i}$ lies in the third quadrant with acute angle $\frac{\pi}{4}$ to the negative real axis, so $\arg = -\left(\pi - \frac{\pi}{4}\right) = -\frac{3\pi}{4}$.`,
  });

  const a3 = cx.arg([2, -5]);
  chk(a3, -atan(2.5));
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`Find the principal argument of $2 - 5\mathrm{i}$, in radians correct to 3 significant figures.`,
    value: a3, unit: "rad", wrong: [atan(2.5), -atan(0.4)],
    explanation: t`Fourth quadrant: $\alpha = \tan^{-1}\frac{5}{2} = 1.190$, so $\arg = -1.19$. (+1.19 is the argument of $2 + 5\mathrm{i}$; $-0.381$ uses $\tan^{-1}\frac{2}{5}$.)`,
  });

  const a4 = cx.arg([-4, 3]);
  chk(a4, PI - atan(0.75));
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Find the principal argument of $-4 + 3\mathrm{i}$, in radians correct to 3 significant figures.`,
    value: a4, unit: "rad", wrong: [-atan(0.75), PI - atan(4 / 3)],
    explanation: t`Second quadrant: $\alpha = \tan^{-1}\frac{3}{4} = 0.6435$, so $\arg = \pi - 0.6435 = 2.50$. (The calculator's $\tan^{-1}\left(\frac{3}{-4}\right) = -0.644$ is in the wrong quadrant.)`,
    hints: ["Sketch the point first.", "Use π − α in the second quadrant."],
  });

  const z5 = [-2 * sqrt(3), 2];
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Write $-2\sqrt{3} + 2\mathrm{i}$ in the form $r(\cos\theta + \mathrm{i}\sin\theta)$ with $r > 0$ and $-\pi < \theta \le \pi$. Give $\theta$ as a multiple of π: θ = kπ.`,
    template: "r = {{blank:r}}, k = {{blank:k}}",
    blanks: [N("r", chk(cx.mod(z5), 4), "8"), KPI("k", cx.arg(z5), 5, 6, "-1/6")],
    explanation: t`$r = \sqrt{12 + 4} = 4$. Second quadrant with $\alpha = \tan^{-1}\frac{2}{2\sqrt{3}} = \frac{\pi}{6}$, so $\theta = \pi - \frac{\pi}{6} = \frac{5\pi}{6}$.`,
  });

  const z6 = cx.polar(6, -PI / 6);
  chk(z6[0], 3 * sqrt(3)); chk(z6[1], -3);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Express $6\mathrm{e}^{-\mathrm{i}\pi/6}$ exactly in the form $x + \mathrm{i}y$. Type surds with √ or sqrt, e.g. 2√5 - 4i.`,
    accepted: ["3√3-3i", "-3i+3√3", "3√3+(-3)i", "3√3-3*i"],
    wrong: ["3-3√3i"],
    explanation: t`$x = 6\cos\left(-\frac{\pi}{6}\right) = 6 \cdot \frac{\sqrt{3}}{2} = 3\sqrt{3}$ and $y = 6\sin\left(-\frac{\pi}{6}\right) = -3$. So the number is $3\sqrt{3} - 3\mathrm{i}$.`,
    hints: [t`$x = r\cos\theta$, $y = r\sin\theta$.`],
  });

  const z7 = cx.polar(3, PI / 4), w7 = cx.polar(6, (2 * PI) / 3);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $z = 3\mathrm{e}^{\mathrm{i}\pi/4}$ and $w = 6\mathrm{e}^{2\pi\mathrm{i}/3}$, find $\left|\dfrac{z}{w}\right|$ and the principal argument of $\dfrac{z}{w}$ as kπ.`,
    template: "modulus {{blank:m}}, k = {{blank:k}}",
    blanks: [N("m", chk(cx.mod(cx.div(z7, w7)), 0.5), "2"), KPI("k", cx.arg(cx.div(z7, w7)), -5, 12, "11/12")],
    explanation: t`Divide the moduli: $\frac{3}{6} = \frac{1}{2}$. Subtract the arguments: $\frac{\pi}{4} - \frac{2\pi}{3} = -\frac{5\pi}{12}$, already in $(-\pi, \pi]$. ($\frac{11}{12}$ adds the arguments, which is the rule for a product.)`,
    hints: ["Quotient: divide moduli, subtract arguments."],
  });

  const z8 = cx.mul(cx.polar(2, (3 * PI) / 4), cx.polar(3, PI / 2));
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Given $z_1 = 2\left(\cos\frac{3\pi}{4} + \mathrm{i}\sin\frac{3\pi}{4}\right)$ and $z_2 = 3\left(\cos\frac{\pi}{2} + \mathrm{i}\sin\frac{\pi}{2}\right)$, find $|z_1z_2|$ and the principal argument of $z_1z_2$ as kπ.`,
    template: "modulus {{blank:m}}, k = {{blank:k}}",
    blanks: [N("m", chk(cx.mod(z8), 6), "5"), KPI("k", cx.arg(z8), -3, 4, "5/4")],
    explanation: t`$|z_1z_2| = 2 \times 3 = 6$. Arguments add: $\frac{3\pi}{4} + \frac{\pi}{2} = \frac{5\pi}{4}$, which is more than $\pi$, so subtract $2\pi$: $-\frac{3\pi}{4}$.`,
    hints: ["Multiply moduli and add arguments.", "Bring the argument into (−π, π]."],
  });

  same(cx.mod([3, -2]), cx.mod([3, 2]));
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For $z = 3 + 2\mathrm{i}$, $|z^{*}| = |z|$ and $\arg z^{*} = -\arg z$.`,
    answer: true,
    explanation: t`$z^{*} = 3 - 2\mathrm{i}$ is the reflection of $z$ in the real axis: the same distance from the origin and the same angle on the other side of the axis.`,
  });

  chk(cx.mod(cx.add([1, 0], [-1, 0])), 0);
  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`For all complex numbers $z$ and $w$, $|z + w| = |z| + |w|$.`,
    answer: false,
    explanation: t`$|z + w|$ is the length of the third side of a triangle, so $|z + w| \le |z| + |w|$ with equality only when $z$ and $w$ point the same way. Counter-example: $z = 1$, $w = -1$ gives $|z + w| = 0$ but $|z| + |w| = 2$.`,
    hints: ["Think of z and w as vectors.", "Try z = 1 and w = −1."],
  });

  same(cx.mul([0, 1], [2, 5]), [-5, 2]);
  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`On an Argand diagram, what single transformation maps the point representing $z$ to the point representing $\mathrm{i}z$? ($O$ is the origin.)`,
    options: [
      [t`A rotation through $\frac{\pi}{2}$ anticlockwise about $O$`, t`Correct: $\mathrm{i} = \mathrm{e}^{\mathrm{i}\pi/2}$ has modulus 1 and argument $\frac{\pi}{2}$; e.g. $\mathrm{i}(2 + 5\mathrm{i}) = -5 + 2\mathrm{i}$.`],
      ["A reflection in the real axis", t`That is the effect of taking the conjugate $z^{*}$.`],
      [t`A rotation through $\frac{\pi}{2}$ clockwise about $O$`, t`Clockwise is the effect of multiplying by $-\mathrm{i}$ (or dividing by $\mathrm{i}$).`],
      [t`A translation by one unit in the positive imaginary direction`, t`That is the effect of adding $\mathrm{i}$, not multiplying by it.`],
    ],
    answer: "A",
    explanation: t`Multiplying by $r\mathrm{e}^{\mathrm{i}\alpha}$ enlarges by $r$ and rotates anticlockwise by $\alpha$; for $\mathrm{i}$, $r = 1$ and $\alpha = \frac{\pi}{2}$.`,
    hints: ["Write i in polar form."],
  });

  chk(cx.mod([1, 1]), sqrt(2)); chk(cx.arg([1, 1]), PI / 4);
  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which transformation of the Argand diagram is the effect of multiplying every complex number by $1 + \mathrm{i}$?`,
    options: [
      [t`Enlargement scale factor $\sqrt{2}$ with rotation $\frac{\pi}{4}$ anticlockwise, both about $O$`, t`Correct: $1 + \mathrm{i} = \sqrt{2}\,\mathrm{e}^{\mathrm{i}\pi/4}$.`],
      [t`Enlargement scale factor $2$ with rotation $\frac{\pi}{4}$ anticlockwise, both about $O$`, t`The modulus of $1 + \mathrm{i}$ is $\sqrt{1 + 1} = \sqrt{2}$, not $1 + 1$.`],
      [t`Enlargement scale factor $\sqrt{2}$ with rotation $\frac{\pi}{2}$ anticlockwise, both about $O$`, t`The argument of $1 + \mathrm{i}$ is $\frac{\pi}{4}$; $\frac{\pi}{2}$ is the argument of $\mathrm{i}$.`],
      [t`Enlargement scale factor $\sqrt{2}$ with rotation $\frac{\pi}{4}$ clockwise, both about $O$`, t`A positive argument means an anticlockwise rotation.`],
    ],
    answer: "A",
    explanation: t`Multiplying by $w$ multiplies moduli by $|w|$ and adds $\arg w$ to every argument.`,
    hints: ["Find the modulus and argument of 1 + i."],
  });

  const d13 = cx.mod(cx.sub([2, 3], [-1, -1]));
  chk(d13, 5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The points $A$ and $B$ on an Argand diagram represent $2 + 3\mathrm{i}$ and $-1 - \mathrm{i}$. Find the distance $AB$.`,
    value: d13, wrong: [sqrt(5), 1],
    explanation: t`$AB = |(2 + 3\mathrm{i}) - (-1 - \mathrm{i})| = |3 + 4\mathrm{i}| = 5$. ($\sqrt{5}$ adds the numbers instead of subtracting them.)`,
    hints: ["The distance between z and w is |z − w|."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each operation on z with its effect on the Argand diagram.",
    pairs: [
      [t`$z \mapsto z^{*}$`, "Reflection in the real axis"],
      [t`$z \mapsto z + (2 - \mathrm{i})$`, "Translation by the vector (2, −1)"],
      [t`$z \mapsto 2z$`, "Enlargement, scale factor 2, centre O"],
      [t`$z \mapsto -z$`, "Rotation through π about O"],
    ],
    explanation: t`Conjugating reflects; adding translates; multiplying by a positive real enlarges; multiplying by $-1 = \mathrm{e}^{\mathrm{i}\pi}$ is a half-turn.`,
  });

  const z15 = [1, sqrt(3)];
  const z15p = cx.mul(cx.mul(z15, z15), cx.mul(z15, z15));
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Given $z = 1 + \mathrm{i}\sqrt{3}$, use the modulus and argument of $z$ to find $|z^4|$ and the principal argument of $z^4$ as kπ.`,
    template: "modulus {{blank:m}}, k = {{blank:k}}",
    blanks: [N("m", chk(cx.mod(z15p), 16), "8"), KPI("k", cx.arg(z15p), -2, 3, "4/3")],
    explanation: t`$|z| = 2$ and $\arg z = \frac{\pi}{3}$. Multiplying four copies: $|z^4| = 2^4 = 16$ and $\arg z^4 = \frac{4\pi}{3}$, which exceeds $\pi$; subtract $2\pi$ to get $-\frac{2\pi}{3}$.`,
    hints: ["Each multiplication by z multiplies the modulus by 2 and adds π/3 to the argument."],
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`Let $z_1 = r_1(\cos\theta_1 + \mathrm{i}\sin\theta_1)$ and $z_2 = r_2(\cos\theta_2 + \mathrm{i}\sin\theta_2)$. Prove that $z_1z_2 = r_1r_2\left(\cos(\theta_1 + \theta_2) + \mathrm{i}\sin(\theta_1 + \theta_2)\right)$, and state what this shows about $|z_1z_2|$ and $\arg(z_1z_2)$.`,
    points: [
      t`M1 expands the product, using $\mathrm{i}^2 = -1$.`,
      t`M1 groups real part $\cos\theta_1\cos\theta_2 - \sin\theta_1\sin\theta_2$ and imaginary part $\sin\theta_1\cos\theta_2 + \cos\theta_1\sin\theta_2$.`,
      t`A1 applies the compound-angle formulae to reach the result.`,
      t`B1 states $|z_1z_2| = r_1r_2$ and $\arg(z_1z_2) = \theta_1 + \theta_2$ (up to a multiple of $2\pi$).`,
    ],
    modelAnswer: t`$$
z_1z_2 = r_1r_2(\cos\theta_1 + \mathrm{i}\sin\theta_1)(\cos\theta_2 + \mathrm{i}\sin\theta_2)
$$
$$
= r_1r_2\left[(\cos\theta_1\cos\theta_2 - \sin\theta_1\sin\theta_2) + \mathrm{i}(\sin\theta_1\cos\theta_2 + \cos\theta_1\sin\theta_2)\right]
$$
$$
= r_1r_2\left[\cos(\theta_1 + \theta_2) + \mathrm{i}\sin(\theta_1 + \theta_2)\right]
$$
So the modulus of the product is $r_1r_2$ and its argument is $\theta_1 + \theta_2$, adjusted by $2\pi$ if needed.`,
    explanation: "The compound-angle formulae are exactly what make arguments add.",
    hints: ["Expand the brackets and collect real and imaginary parts."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`A student says that the argument of $-3 - 3\mathrm{i}$ is $\tan^{-1}\left(\frac{-3}{-3}\right) = \frac{\pi}{4}$. Explain the error and give the correct principal argument.`,
    points: [
      t`$\tan^{-1}$ only returns angles in $\left(-\frac{\pi}{2}, \frac{\pi}{2}\right)$; $\frac{\pi}{4}$ is the direction of $3 + 3\mathrm{i}$, in the first quadrant, but $-3 - 3\mathrm{i}$ is in the third quadrant.`,
      t`The correct principal argument is $-\frac{3\pi}{4}$.`,
    ],
    modelAnswer: "The point (−3, −3) is in the third quadrant, but tan⁻¹ gives a first-quadrant angle because (−3)/(−3) = 3/3. Measured from the positive real axis, the point is 3π/4 clockwise, so arg = −3π/4.",
    explanation: "Always locate the quadrant with a sketch before using tan⁻¹.",
    hints: ["Which quadrant is the point in?"],
  });

  // Struct 12: z = −1 + i, w = √3 + i
  const z = [-1, 1], w = [sqrt(3), 1];
  const zw = cx.mul(z, w), zq = cx.div(z, w);
  chk(zw[0], -1 - sqrt(3)); chk(zw[1], sqrt(3) - 1);
  chk(cos((11 * PI) / 12), -(sqrt(2) + sqrt(6)) / 4);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`The complex numbers $z$ and $w$ are $z = -1 + \mathrm{i}$ and $w = \sqrt{3} + \mathrm{i}$. Give arguments as multiples of π (θ = kπ) in the interval $-\pi < \theta \le \pi$, and moduli that are not integers to 3 significant figures.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the modulus and argument of z.", template: "|z| = {{blank:m}}, k = {{blank:k}}",
        blanks: [M("m", cx.mod(z), 0.005, "2"), KPI("k", cx.arg(z), 3, 4, "-1/4")],
        explanation: t`$|z| = \sqrt{2} = 1.41$; second quadrant, $\arg z = \pi - \frac{\pi}{4} = \frac{3\pi}{4}$.` }),
      P.fib({ label: "(b)", marks: 2, stem: "Find the modulus and argument of w.", template: "|w| = {{blank:m}}, k = {{blank:k}}",
        blanks: [N("m", chk(cx.mod(w), 2), "4"), KPI("k", cx.arg(w), 1, 6, "1/3")],
        explanation: t`$|w| = \sqrt{3 + 1} = 2$; $\arg w = \tan^{-1}\frac{1}{\sqrt{3}} = \frac{\pi}{6}$.` }),
      P.fib({ label: "(c)", marks: 2, stem: "Hence find the modulus and argument of zw.", template: "|zw| = {{blank:m}}, k = {{blank:k}}",
        blanks: [M("m", cx.mod(zw), 0.005, "3.41"), KPI("k", cx.arg(zw), 11, 12, "7/12")],
        explanation: t`$|zw| = 2\sqrt{2} = 2.83$; $\arg(zw) = \frac{3\pi}{4} + \frac{\pi}{6} = \frac{11\pi}{12}$.` }),
      P.fib({ label: "(d)", marks: 2, stem: "Find the modulus and argument of z/w.", template: "|z/w| = {{blank:m}}, k = {{blank:k}}",
        blanks: [M("m", cx.mod(zq), 0.0005, "2.83"), KPI("k", cx.arg(zq), 7, 12, "11/12")],
        explanation: t`$\left|\frac{z}{w}\right| = \frac{\sqrt{2}}{2} = 0.707$; $\arg = \frac{3\pi}{4} - \frac{\pi}{6} = \frac{7\pi}{12}$.` }),
      P.proof({ label: "(e)", marks: 4, stem: t`By finding $zw$ in the form $x + \mathrm{i}y$, show that $\cos\frac{11\pi}{12} = -\dfrac{\sqrt{2} + \sqrt{6}}{4}$.`,
        points: [t`M1 expands $zw = (-1 + \mathrm{i})(\sqrt{3} + \mathrm{i}) = (-1 - \sqrt{3}) + (\sqrt{3} - 1)\mathrm{i}$.`, t`M1 equates real parts: $2\sqrt{2}\cos\frac{11\pi}{12} = -1 - \sqrt{3}$.`, t`M1 rationalises: $\dfrac{-1 - \sqrt{3}}{2\sqrt{2}} \times \dfrac{\sqrt{2}}{\sqrt{2}}$.`, "A1 reaches the given result with no errors."],
        modelAnswer: t`$$
zw = -\sqrt{3} - \mathrm{i} + \sqrt{3}\,\mathrm{i} + \mathrm{i}^2 = (-1 - \sqrt{3}) + (\sqrt{3} - 1)\mathrm{i}
$$
$$
zw = 2\sqrt{2}\left(\cos\tfrac{11\pi}{12} + \mathrm{i}\sin\tfrac{11\pi}{12}\right) \Rightarrow 2\sqrt{2}\cos\tfrac{11\pi}{12} = -1 - \sqrt{3}
$$
$$
\cos\tfrac{11\pi}{12} = \frac{-1 - \sqrt{3}}{2\sqrt{2}} = \frac{-\sqrt{2} - \sqrt{6}}{4} = -\frac{\sqrt{2} + \sqrt{6}}{4}
$$`,
        explanation: "Comparing the Cartesian and polar forms of the same number gives exact trigonometric values." }),
    ],
    explanation: "Moduli multiply and arguments add; comparing two forms of zw gives an exact cosine.",
    hints: ["Sketch z to get its quadrant.", "Real part of r(cos θ + i sin θ) is r cos θ."],
  });

  // Struct 13: A = 3 + i, B = iA, C = A + B, D = 2e^{iπ/3} A
  const A = [3, 1];
  const B = same(cx.mul([0, 1], A), [-1, 3]);
  const C = same(cx.add(A, B), [2, 4]);
  same(cx.mul(A, [1, 1]), C);
  const D = cx.mul(cx.polar(2, PI / 3), A);
  chk(cx.arg(C) - cx.arg(A), PI / 4);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`On an Argand diagram, $O$ is the origin and the point $A$ represents $a = 3 + \mathrm{i}$. The point $B$ is the image of $A$ under a rotation through $\frac{\pi}{2}$ anticlockwise about $O$, and $OACB$ is a square.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the complex number b represented by B, in the form x + iy.", template: "x = {{blank:x}}, y = {{blank:y}}",
        blanks: [N("x", B[0], "1"), N("y", B[1], "-3")],
        explanation: t`$b = \mathrm{i}a = 3\mathrm{i} + \mathrm{i}^2 = -1 + 3\mathrm{i}$.` }),
      P.fib({ label: "(b)", marks: 1, stem: "Find the complex number c represented by C.", template: "x = {{blank:x}}, y = {{blank:y}}",
        blanks: [N("x", C[0], "4"), N("y", C[1], "2")],
        explanation: t`For a square (a parallelogram) $OACB$, $c = a + b = 2 + 4\mathrm{i}$.` }),
      P.fib({ label: "(c)", marks: 3, stem: "Find |c| and arg c, each correct to 3 significant figures (arg in radians).", template: "|c| = {{blank:m}}, arg c = {{blank:t}}",
        blanks: [S3("m", cx.mod(C), "20", 1), S3("t", cx.arg(C), "0.464", 2)],
        explanation: t`$|c| = \sqrt{4 + 16} = \sqrt{20} = 4.47$; first quadrant, $\arg c = \tan^{-1}2 = 1.11$.` }),
      P.proof({ label: "(d)", marks: 3, stem: t`Show that $c = (1 + \mathrm{i})a$ and hence explain why $\arg c - \arg a = \frac{\pi}{4}$.`,
        points: [t`M1 writes $c = a + \mathrm{i}a = (1 + \mathrm{i})a$.`, t`M1 uses $\arg(1 + \mathrm{i}) = \frac{\pi}{4}$ and the product rule for arguments.`, t`A1 concludes $\arg c = \arg a + \frac{\pi}{4}$.`],
        modelAnswer: t`$$
c = a + b = a + \mathrm{i}a = (1 + \mathrm{i})a
$$
$$
\arg c = \arg(1 + \mathrm{i}) + \arg a = \frac{\pi}{4} + \arg a
$$
(Both arguments are small and positive, so no $2\pi$ adjustment is needed.) Geometrically, the diagonal $OC$ of a square makes an angle of $\frac{\pi}{4}$ with the side $OA$.`,
        explanation: "Multiplying by 1 + i rotates by π/4 and enlarges by √2: exactly the relation between a side and the diagonal of a square." }),
      P.fib({ label: "(e)", marks: 4, stem: t`The point $D$ represents $d = 2\mathrm{e}^{\mathrm{i}\pi/3}a$. Find $|d|$ and $\arg d$, each correct to 3 significant figures.`, template: "|d| = {{blank:m}}, arg d = {{blank:t}}",
        blanks: [M("m", cx.mod(D), 0.005, "3.16", 2), S3("t", cx.arg(D), "0.322", 2)],
        explanation: t`$|d| = 2|a| = 2\sqrt{10} = 6.32$; $\arg d = \tan^{-1}\frac{1}{3} + \frac{\pi}{3} = 0.3218 + 1.0472 = 1.37$.` }),
    ],
    explanation: "Rotation by π/2 is multiplication by i; multiplying by re^(iα) scales by r and adds α to the argument.",
    hints: ["Rotation through π/2 anticlockwise about O is multiplication by i.", "Add π/3 to arg a."],
  });

  b.card("DEFINITION", "Argand diagram", t`A plane with real axis across and imaginary axis up; $x + \mathrm{i}y$ is the point $(x, y)$.`);
  b.card("FORMULA", "Modulus", t`$|x + \mathrm{i}y| = \sqrt{x^2 + y^2}$, the distance from the origin.`);
  b.card("DEFINITION", "Principal argument", t`The angle from the positive real axis to $z$, with $-\pi < \arg z \le \pi$ (radians).`);
  b.card("FORMULA", "Polar and exponential form", t`$z = r(\cos\theta + \mathrm{i}\sin\theta) = r\mathrm{e}^{\mathrm{i}\theta}$`);
  b.card("FORMULA", "Products and quotients", t`$|z_1z_2| = |z_1||z_2|$, $\arg(z_1z_2) = \arg z_1 + \arg z_2$; for $\frac{z_1}{z_2}$ divide moduli and subtract arguments.`);
  b.card("CONCEPT", "Argument in the wrong quadrant", t`Sketch first: second quadrant $\pi - \alpha$, third $-(\pi - \alpha)$, fourth $-\alpha$, where $\alpha = \tan^{-1}\left|\frac{y}{x}\right|$.`);
  b.card("FACT", "Multiplying by i", t`Rotates a point through $\frac{\pi}{2}$ anticlockwise about the origin.`);
  b.card("FACT", "Distance between z and w", t`$|z - w|$ is the distance between the points representing $z$ and $w$.`);
  b.card("CONCEPT", "Geometric effects", t`Conjugate: reflect in real axis. Add $w$: translate by $w$. Multiply by $r\mathrm{e}^{\mathrm{i}\alpha}$: enlarge by $r$, rotate by $\alpha$.`);
});
