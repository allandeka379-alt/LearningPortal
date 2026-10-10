// W1b: amaths.trig.compound-double-angle
import { concept, P, t, chk, same, solveTrig, rnd, quad, rad } from "../lib.mjs";

const { sin, cos, tan, sqrt, atan, asin, acos } = Math;
const XS = [0.3, 0.9, 1.2, 2.0, 2.7, 4.0, 5.5];
const ident = (f, g, label) => XS.forEach((x) => chk(f(x), g(x), 1e-9, `${label} at ${x}`));
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
const A1 = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(rnd(x, 1))], tolerance: 0.05, wrong, ...(marks ? { marks } : {}) });
const S3 = (id, x, dp, wrong, marks) => ({ id, input: "number", accepted: [String(rnd(x, dp))], tolerance: 0.5 * 10 ** -dp, wrong, ...(marks ? { marks } : {}) });

concept("amaths.trig.compound-double-angle", { file: "trig/compound-double-angle", keyPrefix: "trig.compound-double-angle" }, (b) => {
  ident((x) => sin(x + 0.7), (x) => sin(x) * cos(0.7) + cos(x) * sin(0.7), "sin(A+B)");
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which is the correct expansion of $\cos(A + B)$?`,
    options: [
      [t`$\cos A\cos B - \sin A\sin B$`, "Correct: the sign in the middle is the opposite of the sign in the bracket."],
      [t`$\cos A\cos B + \sin A\sin B$`, t`This is $\cos(A - B)$.`],
      [t`$\cos A + \cos B$`, "Cosine cannot be distributed over a sum."],
      [t`$\sin A\cos B + \cos A\sin B$`, t`This is $\sin(A + B)$.`],
    ],
    answer: "A",
    explanation: t`$\cos(A \pm B) \equiv \cos A\cos B \mp \sin A\sin B$.`,
  });

  ident((x) => cos(2 * x), (x) => 1 - 2 * sin(x) ** 2, "cos2A");
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: t`Which of these is **not** identical to $\cos 2A$?`,
    options: [
      [t`$2\sin^2 A - 1$`, t`Correct: this is $-\cos 2A$. The right form is $1 - 2\sin^2 A$.`],
      [t`$\cos^2 A - \sin^2 A$`, t`This is the basic form from $\cos(A + A)$.`],
      [t`$2\cos^2 A - 1$`, t`This comes from replacing $\sin^2 A$ by $1 - \cos^2 A$.`],
      [t`$1 - 2\sin^2 A$`, t`This comes from replacing $\cos^2 A$ by $1 - \sin^2 A$.`],
    ],
    answer: "A",
    explanation: t`$\cos 2A \equiv \cos^2 A - \sin^2 A \equiv 2\cos^2 A - 1 \equiv 1 - 2\sin^2 A$. At $A = 0$: $2\sin^2 0 - 1 = -1 \neq 1 = \cos 0$.`,
  });

  chk(cos(rad(75)), (sqrt(6) - sqrt(2)) / 4);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the exact value of $\cos 75^\circ$, in the form $\frac{\sqrt{a} - \sqrt{b}}{c}$. Type √ as sqrt, e.g. (sqrt7-sqrt3)/5.`,
    accepted: ["(√6-√2)/4", "(-√2+√6)/4", "√6/4-√2/4", "(√2(√3-1))/4", "√2(√3-1)/4"],
    wrong: ["(√6+√2)/4", "(√2-√6)/4"],
    explanation: t`$\cos(45^\circ + 30^\circ) = \cos 45^\circ\cos 30^\circ - \sin 45^\circ\sin 30^\circ = \frac{\sqrt{2}}{2} \cdot \frac{\sqrt{3}}{2} - \frac{\sqrt{2}}{2} \cdot \frac{1}{2} = \frac{\sqrt{6} - \sqrt{2}}{4}$.`,
    hints: [t`$75^\circ = 45^\circ + 30^\circ$.`],
  });

  chk(tan(2 * atan(0.5)), 4 / 3);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Given that $\tan A = \frac{1}{2}$, find the exact value of $\tan 2A$. Give your answer as a fraction.`,
    value: 4 / 3, wrong: [1, 0.75],
    explanation: t`$\tan 2A = \frac{2 \times \frac{1}{2}}{1 - \frac{1}{4}} = \frac{1}{\frac{3}{4}} = \frac{4}{3}$. (Doubling $\tan A$ gives 1, which is wrong.)`,
  });

  const A5 = asin(4 / 5), B5 = acos(12 / 13);
  chk(sin(A5 - B5), 33 / 65);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Angles $A$ and $B$ are acute with $\sin A = \frac{4}{5}$ and $\cos B = \frac{12}{13}$. Find the exact value of $\sin(A - B)$. Give your answer as a fraction.`,
    value: 33 / 65, wrong: [63 / 65, 56 / 65],
    explanation: t`$\cos A = \frac{3}{5}$ and $\sin B = \frac{5}{13}$. $\sin(A - B) = \sin A\cos B - \cos A\sin B = \frac{4}{5} \cdot \frac{12}{13} - \frac{3}{5} \cdot \frac{5}{13} = \frac{48 - 15}{65} = \frac{33}{65}$. ($\frac{63}{65}$ uses a plus sign: that is $\sin(A + B)$.)`,
    hints: ["Use right-angled triangles to find cos A and sin B."],
  });

  ident((x) => cos(x + rad(60)), (x) => 0.5 * cos(x) - (sqrt(3) / 2) * sin(x), "cos(x+60)");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Express $\cos(x + 60^\circ)$ in the form $a\cos x + b\sin x$, giving $a$ and $b$ as decimals correct to 3 significant figures where necessary.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [N("a", 0.5, "0.866"), S3("b", -sqrt(3) / 2, 3, "0.866")],
    explanation: t`$\cos x\cos 60^\circ - \sin x\sin 60^\circ = \frac{1}{2}\cos x - \frac{\sqrt{3}}{2}\sin x$, so $a = 0.5$ and $b = -\frac{\sqrt{3}}{2} = -0.866$.`,
    hints: [t`Expand with $\cos(A + B) = \cos A\cos B - \sin A\sin B$.`],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\sin 2A \equiv 2\sin A$ for all angles $A$.`,
    answer: false,
    explanation: t`$\sin 2A \equiv 2\sin A\cos A$. For example, $A = 90^\circ$: $\sin 180^\circ = 0$ but $2\sin 90^\circ = 2$.`,
  });

  const th8 = Math.PI - asin(5 / 13);
  chk(sin(2 * th8), -120 / 169);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $\sin\theta = \frac{5}{13}$ and $\theta$ is obtuse, find the exact value of $\sin 2\theta$. Give your answer as a fraction.`,
    value: -120 / 169, wrong: [120 / 169, 10 / 13],
    explanation: t`$\theta$ obtuse, so $\cos\theta = -\frac{12}{13}$. $\sin 2\theta = 2 \times \frac{5}{13} \times \left(-\frac{12}{13}\right) = -\frac{120}{169}$.`,
    hints: ["Cosine is negative for an obtuse angle."],
  });

  // cos 2x = sin x → 2s² + s − 1 = 0 → s = ½, −1 → 30, 150, 270
  same(quad.roots(2, 1, -1), [-1, 0.5]);
  for (const x of [30, 150, 270]) chk(cos(rad(2 * x)), sin(rad(x)), 1e-12);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\cos 2x = \sin x$ for $0^\circ \le x \le 360^\circ$, in ascending order.`,
    template: "x = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°",
    blanks: [N("a", 30, "210"), N("b", 150, "330"), N("c", 270, "90")],
    explanation: t`$1 - 2\sin^2 x = \sin x \Rightarrow 2\sin^2 x + \sin x - 1 = 0 \Rightarrow (2\sin x - 1)(\sin x + 1) = 0$. $\sin x = \frac{1}{2}$: $30^\circ, 150^\circ$; $\sin x = -1$: $270^\circ$.`,
    hints: [t`Use $\cos 2x = 1 - 2\sin^2 x$.`],
  });

  for (const x of [30, 90, 150, 270]) chk(sin(rad(2 * x)), cos(rad(x)), 1e-12);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\sin 2x = \cos x$ for $0^\circ \le x \le 360^\circ$, in ascending order.`,
    template: "x = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°, {{blank:d}}°",
    blanks: [N("a", 30, "60"), N("b", 90, "120"), N("c", 150, "210"), N("d", 270, "330")],
    explanation: t`$2\sin x\cos x - \cos x = 0 \Rightarrow \cos x(2\sin x - 1) = 0$. $\cos x = 0$: $90^\circ, 270^\circ$; $\sin x = \frac{1}{2}$: $30^\circ, 150^\circ$. (Dividing by $\cos x$ would lose $90^\circ$ and $270^\circ$.)`,
    hints: ["Factorise out cos x; do not divide by it."],
  });

  ident((x) => sin(2 * x) / (1 + cos(2 * x)), (x) => tan(x), "sin2/(1+cos2)");
  b.proof({
    d: 3, skill: "APPLICATION", calculator: false, marks: 3,
    stem: t`Prove that $\dfrac{\sin 2\theta}{1 + \cos 2\theta} \equiv \tan\theta$.`,
    points: [t`M1 numerator $2\sin\theta\cos\theta$.`, t`M1 denominator $1 + (2\cos^2\theta - 1) = 2\cos^2\theta$.`, t`A1 cancels to $\frac{\sin\theta}{\cos\theta} = \tan\theta$.`],
    modelAnswer: t`$$
\frac{\sin 2\theta}{1 + \cos 2\theta} = \frac{2\sin\theta\cos\theta}{1 + 2\cos^2\theta - 1} = \frac{2\sin\theta\cos\theta}{2\cos^2\theta} = \frac{\sin\theta}{\cos\theta} = \tan\theta
$$`,
    explanation: t`Choose $\cos 2\theta = 2\cos^2\theta - 1$ so that the 1s cancel.`,
    hints: [t`Which form of $\cos 2\theta$ makes $1 + \cos 2\theta$ simplest?`],
  });

  ident((x) => cos(x) ** 4 - sin(x) ** 4, (x) => cos(2 * x), "cos4-sin4");
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Prove that $\cos^4\theta - \sin^4\theta \equiv \cos 2\theta$.`,
    points: [t`M1 difference of two squares: $(\cos^2\theta - \sin^2\theta)(\cos^2\theta + \sin^2\theta)$.`, t`M1 uses $\cos^2\theta + \sin^2\theta = 1$.`, t`A1 recognises $\cos^2\theta - \sin^2\theta = \cos 2\theta$.`],
    modelAnswer: t`$$
\cos^4\theta - \sin^4\theta = (\cos^2\theta - \sin^2\theta)(\cos^2\theta + \sin^2\theta) = (\cos^2\theta - \sin^2\theta) \times 1 = \cos 2\theta
$$`,
    explanation: "Factorise first; the second factor is 1.",
    hints: ["Treat it as a difference of two squares."],
  });

  ident((x) => sin(3 * x), (x) => 3 * sin(x) - 4 * sin(x) ** 3, "sin3");
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`By writing $3\theta = 2\theta + \theta$, show that $\sin 3\theta \equiv 3\sin\theta - 4\sin^3\theta$.`,
    points: [
      t`M1 $\sin(2\theta + \theta) = \sin 2\theta\cos\theta + \cos 2\theta\sin\theta$.`,
      t`M1 substitutes $\sin 2\theta = 2\sin\theta\cos\theta$ and $\cos 2\theta = 1 - 2\sin^2\theta$.`,
      t`M1 replaces $\cos^2\theta$ by $1 - \sin^2\theta$.`,
      t`A1 simplifies to $3\sin\theta - 4\sin^3\theta$.`,
    ],
    modelAnswer: t`$$
\sin 3\theta = \sin 2\theta\cos\theta + \cos 2\theta\sin\theta = 2\sin\theta\cos^2\theta + (1 - 2\sin^2\theta)\sin\theta
$$

$$
= 2\sin\theta(1 - \sin^2\theta) + \sin\theta - 2\sin^3\theta = 3\sin\theta - 4\sin^3\theta
$$`,
    explanation: "Use the compound-angle formula, then double-angle forms that keep only sin θ.",
    hints: [t`Use $\cos 2\theta = 1 - 2\sin^2\theta$ so only $\sin\theta$ remains.`],
  });

  const AB = atan(2) + atan(3);
  chk(AB * 180 / Math.PI, 135);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Acute angles $A$ and $B$ satisfy $\tan A = 2$ and $\tan B = 3$. Find $\tan(A + B)$ and hence the exact size of $A + B$ in degrees.`,
    value: 135, unit: "°", prefix: "A + B =", wrong: [45, -45],
    explanation: t`$\tan(A + B) = \frac{2 + 3}{1 - 6} = -1$. Both angles are acute, so $0^\circ < A + B < 180^\circ$, and the angle in that range with tangent $-1$ is $135^\circ$. ($45^\circ$ ignores the sign.)`,
    hints: [t`$\tan(A + B) = \frac{\tan A + \tan B}{1 - \tan A\tan B}$.`, "A + B lies between 0° and 180°."],
  });

  chk(2 * sin(rad(15)) * cos(rad(15)), 0.5);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`What is the exact value of $2\sin 15^\circ\cos 15^\circ$?`,
    options: [
      [t`$\frac{1}{2}$`, t`Correct: $2\sin 15^\circ\cos 15^\circ = \sin 30^\circ = \frac{1}{2}$.`],
      [t`$\frac{\sqrt{3}}{2}$`, t`This is $\cos 30^\circ$; the expression is $\sin 2A$, not $\cos 2A$.`],
      [t`$1$`, t`This treats the product as $\sin^2 + \cos^2$.`],
      [t`$\frac{1}{4}$`, t`This is $\sin 15^\circ\cos 15^\circ$ alone, without the factor 2.`],
    ],
    answer: "A",
    explanation: t`Recognise $\sin 2A = 2\sin A\cos A$ with $A = 15^\circ$.`,
    hints: ["Which double-angle formula has the form 2 sin A cos A?"],
  });

  chk(cos(rad(22.5)) ** 2 - sin(rad(22.5)) ** 2, sqrt(2) / 2);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`What is the exact value of $\cos^2 22.5^\circ - \sin^2 22.5^\circ$?`,
    options: [
      [t`$\frac{\sqrt{2}}{2}$`, t`Correct: it equals $\cos 45^\circ$.`],
      [t`$1$`, t`$\cos^2 + \sin^2 = 1$, but here the terms are subtracted.`],
      [t`$\frac{1}{2}$`, t`This is $\cos 60^\circ$; the double of $22.5^\circ$ is $45^\circ$.`],
      [t`$0$`, t`$\cos 22.5^\circ \neq \sin 22.5^\circ$, so the difference of squares is not zero.`],
    ],
    answer: "A",
    explanation: t`$\cos^2 A - \sin^2 A = \cos 2A$, so the value is $\cos 45^\circ = \frac{\sqrt{2}}{2}$.`,
    hints: [t`Compare with $\cos 2A = \cos^2 A - \sin^2 A$.`],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each expression with a single trigonometric term.",
    pairs: [
      [t`$2\sin x\cos x$`, t`$\sin 2x$`],
      [t`$\cos^2 x - \sin^2 x$`, t`$\cos 2x$`],
      [t`$\dfrac{2\tan x}{1 - \tan^2 x}$`, t`$\tan 2x$`],
      [t`$\sin x\cos y - \cos x\sin y$`, t`$\sin(x - y)$`],
    ],
    explanation: "These are the double-angle formulae and the compound-angle formula for sin(x − y), read backwards.",
  });

  // sin(x + 30°) = 2 cos x → tan x = √3 → 60, 240
  same(solveTrig({ fn: "tan", k: sqrt(3), lo: 0, hi: 360 }), [60, 240]);
  for (const x of [60, 240]) chk(sin(rad(x + 30)), 2 * cos(rad(x)), 1e-12);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\sin(x + 30^\circ) = 2\cos x$ for $0^\circ \le x \le 360^\circ$, in ascending order.`,
    template: "x = {{blank:a}}° or x = {{blank:b}}°",
    blanks: [N("a", 60, "30"), N("b", 240, "210")],
    explanation: t`$\frac{\sqrt{3}}{2}\sin x + \frac{1}{2}\cos x = 2\cos x \Rightarrow \frac{\sqrt{3}}{2}\sin x = \frac{3}{2}\cos x \Rightarrow \tan x = \sqrt{3}$. So $x = 60^\circ$ or $240^\circ$.`,
    hints: ["Expand sin(x + 30°), then collect sin x and cos x terms.", "Divide by cos x to reach tan x."],
  });

  chk(cos(acos(0.6) ), 0.6); chk(sqrt((1 + 7 / 25) / 2), 4 / 5);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $\cos 2A = \frac{7}{25}$ and $A$ is acute, find the exact value of $\cos A$.`,
    options: [
      [t`$\frac{4}{5}$`, t`Correct: $2\cos^2 A - 1 = \frac{7}{25}$ gives $\cos^2 A = \frac{16}{25}$, and $A$ acute gives $\cos A = \frac{4}{5}$.`],
      [t`$\frac{3}{5}$`, t`This is $\sin A$, from $1 - 2\sin^2 A = \frac{7}{25}$.`],
      [t`$\frac{16}{25}$`, t`This is $\cos^2 A$; take the square root.`],
      [t`$\frac{7}{50}$`, t`Halving $\cos 2A$ does not give $\cos A$.`],
    ],
    answer: "A",
    explanation: t`$\cos^2 A = \frac{1 + \cos 2A}{2} = \frac{1 + \frac{7}{25}}{2} = \frac{16}{25}$, so $\cos A = \frac{4}{5}$.`,
    hints: [t`Use $\cos 2A = 2\cos^2 A - 1$.`],
  });

  // Struct (12): cos 3θ ≡ 4cos³θ − 3cos θ; 4c³ − 3c = ½ → 20°, 100°, 140°; roots of 8x³ − 6x − 1 = 0
  ident((x) => cos(3 * x), (x) => 4 * cos(x) ** 3 - 3 * cos(x), "cos3");
  same(solveTrig({ fn: "cos", k: 0.5, a: 3, lo: 0, hi: 180 }), [20, 100, 140]);
  for (const x of [20, 100, 140]) chk(8 * cos(rad(x)) ** 3 - 6 * cos(rad(x)) - 1, 0, 1e-12);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`This question uses the identity for $\cos 3\theta$.`,
    parts: [
      P.proof({ label: "(a)", marks: 4, stem: t`By writing $3\theta = 2\theta + \theta$, show that $\cos 3\theta \equiv 4\cos^3\theta - 3\cos\theta$.`,
        points: [
          t`M1 $\cos(2\theta + \theta) = \cos 2\theta\cos\theta - \sin 2\theta\sin\theta$.`,
          t`M1 substitutes $\cos 2\theta = 2\cos^2\theta - 1$ and $\sin 2\theta = 2\sin\theta\cos\theta$.`,
          t`M1 replaces $\sin^2\theta$ by $1 - \cos^2\theta$.`,
          t`A1 simplifies to $4\cos^3\theta - 3\cos\theta$.`,
        ],
        modelAnswer: t`$$
\cos 3\theta = \cos 2\theta\cos\theta - \sin 2\theta\sin\theta = (2\cos^2\theta - 1)\cos\theta - 2\sin^2\theta\cos\theta
$$

$$
= 2\cos^3\theta - \cos\theta - 2(1 - \cos^2\theta)\cos\theta = 4\cos^3\theta - 3\cos\theta
$$`,
        explanation: "Compound angle, then double-angle forms in cos θ only." }),
      P.fib({ label: "(b)", marks: 3, stem: t`Hence solve $4\cos^3\theta - 3\cos\theta = \frac{1}{2}$ for $0^\circ \le \theta \le 180^\circ$, in ascending order.`, template: "θ = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°",
        blanks: [N("a", 20, "60"), N("b", 100, "300"), N("c", 140, "420")],
        explanation: t`$\cos 3\theta = \frac{1}{2}$ with $0^\circ \le 3\theta \le 540^\circ$: $3\theta = 60^\circ, 300^\circ, 420^\circ$, so $\theta = 20^\circ, 100^\circ, 140^\circ$.` }),
      P.proof({ label: "(c)", marks: 2, stem: t`Hence show that $x = \cos 20^\circ$ is a root of $8x^3 - 6x - 1 = 0$.`,
        points: [t`M1 doubles the equation in (b): $8\cos^3\theta - 6\cos\theta - 1 = 0$.`, t`A1 notes $\theta = 20^\circ$ satisfies it, so $x = \cos 20^\circ$ is a root.`],
        modelAnswer: t`Multiplying $4\cos^3\theta - 3\cos\theta = \frac{1}{2}$ by 2 gives $8\cos^3\theta - 6\cos\theta - 1 = 0$. Since $\theta = 20^\circ$ is a solution, $x = \cos 20^\circ$ satisfies $8x^3 - 6x - 1 = 0$.`,
        explanation: "Substitute x = cos θ into the cubic." }),
      P.fib({ label: "(d)", marks: 3, stem: "Write down the other two roots of 8x³ − 6x − 1 = 0, correct to 3 significant figures, the smaller first.", template: "x = {{blank:a}} and x = {{blank:b}}",
        blanks: [S3("a", cos(rad(140)), 3, "0.766", 1), S3("b", cos(rad(100)), 3, "0.174", 2)],
        explanation: t`The other solutions of (b) give $x = \cos 140^\circ = -0.766$ and $x = \cos 100^\circ = -0.174$. A cubic has at most three roots, so these are all.` }),
    ],
    explanation: "A triple-angle identity turns a cubic in cos θ into an equation in cos 3θ.",
    hints: [t`In (b), $3\theta$ runs from $0^\circ$ to $540^\circ$.`, "Each solution θ of (b) gives a root x = cos θ."],
  });

  // Struct (13): tan(x + 45°) = 6 tan x → 6t² − 5t + 1 = 0 → t = ½, ⅓
  ident((x) => tan(x + Math.PI / 4), (x) => (1 + tan(x)) / (1 - tan(x)), "tan(x+45)");
  same(quad.roots(6, -5, 1).map((v) => Number(v.toFixed(12))), [1 / 3, 1 / 2].map((v) => Number(v.toFixed(12))));
  const s20 = [...solveTrig({ fn: "tan", k: 1 / 3, lo: 0, hi: 360 }), ...solveTrig({ fn: "tan", k: 0.5, lo: 0, hi: 360 })].sort((a, c) => a - c);
  s20.forEach((x) => chk(tan(rad(x + 45)), 6 * tan(rad(x)), 1e-9));
  chk(tan(2 * atan(1 / 3)), 0.75); chk(tan(atan(1 / 3) + Math.PI / 4), 2);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`This question is about the equation $\tan(x + 45^\circ) = 6\tan x$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $\tan(x + 45^\circ) \equiv \dfrac{1 + \tan x}{1 - \tan x}$.`,
        points: [t`M1 uses $\tan(A + B)$ with $B = 45^\circ$.`, t`A1 uses $\tan 45^\circ = 1$ to reach the result.`],
        modelAnswer: t`$$
\tan(x + 45^\circ) = \frac{\tan x + \tan 45^\circ}{1 - \tan x\tan 45^\circ} = \frac{1 + \tan x}{1 - \tan x}
$$`,
        explanation: "tan 45° = 1." }),
      P.proof({ label: "(b)", marks: 3, stem: t`Hence show that the equation becomes $6t^2 - 5t + 1 = 0$, where $t = \tan x$.`,
        points: [t`M1 sets $\frac{1 + t}{1 - t} = 6t$ and multiplies by $1 - t$.`, t`M1 expands: $1 + t = 6t - 6t^2$.`, t`A1 rearranges to $6t^2 - 5t + 1 = 0$.`],
        modelAnswer: t`$$
\frac{1 + t}{1 - t} = 6t \Rightarrow 1 + t = 6t(1 - t) = 6t - 6t^2 \Rightarrow 6t^2 - 5t + 1 = 0
$$`,
        explanation: "Clear the fraction, then collect terms." }),
      P.fib({ label: "(c)", marks: 4, stem: t`Solve the equation $\tan(x + 45^\circ) = 6\tan x$ for $0^\circ \le x \le 360^\circ$, giving answers to 1 decimal place in ascending order.`, template: "x = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°, {{blank:d}}°",
        blanks: [A1("a", s20[0], "71.6"), A1("b", s20[1], "63.4"), A1("c", s20[2], "251.6"), A1("d", s20[3], "243.4")],
        explanation: t`$(2t - 1)(3t - 1) = 0$, so $\tan x = \frac{1}{2}$ or $\frac{1}{3}$. $\tan x = \frac{1}{3}$: $18.4^\circ, 198.4^\circ$. $\tan x = \frac{1}{2}$: $26.6^\circ, 206.6^\circ$.` }),
      P.num({ label: "(d)", marks: 2, stem: t`For the smallest solution $x$, find the exact value of $\tan 2x$, as a fraction.`, value: 0.75, wrong: [2 / 3, 4 / 3],
        explanation: t`$\tan x = \frac{1}{3}$: $\tan 2x = \frac{\frac{2}{3}}{1 - \frac{1}{9}} = \frac{3}{4}$.` }),
      P.num({ label: "(e)", marks: 2, stem: t`For the same $x$, find the exact value of $\tan(x + 45^\circ)$.`, value: 2, wrong: [4 / 3, 1],
        explanation: t`$\frac{1 + \frac{1}{3}}{1 - \frac{1}{3}} = \frac{\frac{4}{3}}{\frac{2}{3}} = 2$, which equals $6 \times \frac{1}{3}$ as it should.` }),
    ],
    explanation: "Expand tan(x + 45°), clear fractions to get a quadratic in tan x, then use tan 2x and check by substitution.",
    hints: ["tan 45° = 1.", "Tangent repeats every 180°."],
  });

  b.card("FORMULA", "sin(A ± B)", t`$\sin A\cos B \pm \cos A\sin B$`);
  b.card("FORMULA", "cos(A ± B)", t`$\cos A\cos B \mp \sin A\sin B$`, "Opposite sign to the bracket.");
  b.card("FORMULA", "tan(A ± B)", t`$\frac{\tan A \pm \tan B}{1 \mp \tan A\tan B}$`);
  b.card("FORMULA", "sin 2A and tan 2A", t`$\sin 2A = 2\sin A\cos A$; $\tan 2A = \frac{2\tan A}{1 - \tan^2 A}$`);
  b.card("FORMULA", "cos 2A (three forms)", t`$\cos^2 A - \sin^2 A = 2\cos^2 A - 1 = 1 - 2\sin^2 A$`);
  b.card("FORMULA", "sin² and cos² in terms of cos 2A", t`$\sin^2 A = \frac{1}{2}(1 - \cos 2A)$, $\cos^2 A = \frac{1}{2}(1 + \cos 2A)$`);
  b.card("FACT", "Exact values of 75° and 15°", t`$\sin 75^\circ = \cos 15^\circ = \frac{\sqrt{6} + \sqrt{2}}{4}$; $\tan 15^\circ = 2 - \sqrt{3}$`);
  b.card("FACT", "Triple angles", t`$\sin 3\theta = 3\sin\theta - 4\sin^3\theta$; $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$`);
  b.card("CONCEPT", "Choosing the cos 2x form", t`With $\sin x$ in the equation use $1 - 2\sin^2 x$; with $\cos x$ use $2\cos^2 x - 1$.`);
});
