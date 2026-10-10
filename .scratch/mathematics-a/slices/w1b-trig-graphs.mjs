// W1b: amaths.trig.graphs-exact-values
import { concept, P, t, chk, same, solveTrig, rad, ZP } from "../lib.mjs";

const { sin, cos, tan, PI, sqrt, asin, acos, atan } = Math;

concept("amaths.trig.graphs-exact-values", { file: "trig/graphs-exact-values", keyPrefix: "trig.graphs-exact-values" }, (b) => {
  chk(sin(PI / 3), sqrt(3) / 2);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the exact value of $\sin\frac{\pi}{3}$?`,
    options: [
      [t`$\frac{\sqrt{3}}{2}$`, t`Correct: $\frac{\pi}{3} = 60^\circ$ and $\sin 60^\circ = \frac{\sqrt{3}}{2}$.`],
      [t`$\frac{1}{2}$`, t`This is $\sin\frac{\pi}{6}$ ($30^\circ$) or $\cos\frac{\pi}{3}$.`],
      [t`$\sqrt{3}$`, t`This is $\tan\frac{\pi}{3}$.`],
      [t`$\frac{\sqrt{2}}{2}$`, t`This is $\sin\frac{\pi}{4}$ ($45^\circ$).`],
    ],
    answer: "A",
    explanation: t`Half an equilateral triangle of side 2 has height $\sqrt{3}$: $\sin 60^\circ = \frac{\sqrt{3}}{2}$.`,
  });

  chk(tan(rad(150)), -1 / sqrt(3));
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`What is the exact value of $\tan 150^\circ$?`,
    options: [
      [t`$-\frac{1}{\sqrt{3}}$`, t`Correct: $150^\circ = 180^\circ - 30^\circ$ is in the second quadrant, where tangent is negative.`],
      [t`$\frac{1}{\sqrt{3}}$`, "The size is right, but tangent is negative in the second quadrant."],
      [t`$-\sqrt{3}$`, t`This is $\tan 120^\circ$; the related angle of $150^\circ$ is $30^\circ$, not $60^\circ$.`],
      [t`$-\frac{\sqrt{3}}{2}$`, t`This mixes in a sine or cosine value; $\tan 30^\circ = \frac{1}{\sqrt{3}}$.`],
    ],
    answer: "A",
    explanation: t`Related angle $30^\circ$, second quadrant (only sine positive): $\tan 150^\circ = -\tan 30^\circ = -\frac{1}{\sqrt{3}}$.`,
  });

  chk(cos(rad(315)), sqrt(2) / 2);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`What is the exact value of $\cos 315^\circ$?`,
    options: [
      [t`$\frac{\sqrt{2}}{2}$`, t`Correct: $315^\circ = 360^\circ - 45^\circ$, fourth quadrant, where cosine is positive.`],
      [t`$-\frac{\sqrt{2}}{2}$`, "Cosine is positive in the fourth quadrant (CAST)."],
      [t`$\frac{\sqrt{3}}{2}$`, t`This is $\cos 330^\circ$; the related angle here is $45^\circ$.`],
      [t`$-1$`, t`This is $\tan 315^\circ$.`],
    ],
    answer: "A",
    explanation: t`$\cos 315^\circ = \cos 45^\circ = \frac{\sqrt{2}}{2} = \frac{1}{\sqrt{2}}$.`,
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`State the amplitude and the period (in degrees) of the graph of $y = 5\cos 3x$.`,
    template: "amplitude = {{blank:a}}, period = {{blank:p}}°",
    blanks: [
      { id: "a", input: "number", accepted: [5], wrong: "10" },
      { id: "p", input: "number", accepted: [120], wrong: "1080" },
    ],
    explanation: t`Amplitude $|5| = 5$. Period $\frac{360^\circ}{3} = 120^\circ$: the factor 3 squeezes the graph horizontally.`,
  });

  chk(4 - 3 * sin(rad(270)), 7);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the maximum value of $y = 4 - 3\sin x$.`,
    value: 7, wrong: [4, 1],
    explanation: t`$\sin x$ ranges from $-1$ to $1$, so $-3\sin x$ ranges from $-3$ to $3$. Maximum $y = 4 + 3 = 7$ (when $\sin x = -1$). (1 is the minimum.)`,
  });

  chk(acos(-sqrt(3) / 2), (5 * PI) / 6);
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`What is the principal value of $\cos^{-1}\left(-\frac{\sqrt{3}}{2}\right)$?`,
    options: [
      [t`$\frac{5\pi}{6}$`, t`Correct: principal values of $\cos^{-1}$ lie in $[0, \pi]$, and $\cos\frac{5\pi}{6} = -\frac{\sqrt{3}}{2}$.`],
      [t`$-\frac{\pi}{6}$`, t`$\cos\left(-\frac{\pi}{6}\right) = +\frac{\sqrt{3}}{2}$, and negative angles are outside the range of $\cos^{-1}$.`],
      [t`$\frac{7\pi}{6}$`, t`$\cos\frac{7\pi}{6} = -\frac{\sqrt{3}}{2}$, but $\frac{7\pi}{6} > \pi$ is not a principal value.`],
      [t`$\frac{2\pi}{3}$`, t`$\cos\frac{2\pi}{3} = -\frac{1}{2}$; the related angle here is $\frac{\pi}{6}$.`],
    ],
    answer: "A",
    explanation: t`The related acute angle is $\frac{\pi}{6}$. Cosine is negative in the second quadrant, and the principal value is in $[0, \pi]$: $\pi - \frac{\pi}{6} = \frac{5\pi}{6}$.`,
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Find $\sin^{-1}(-0.7)$ in radians, correct to 3 significant figures.`,
    value: asin(-0.7), unit: "rad", wrong: [asin(0.7), -44.4],
    explanation: t`Radian mode: $\sin^{-1}(-0.7) = -0.775$. The principal value lies in $\left[-\frac{\pi}{2}, \frac{\pi}{2}\right]$, so it is negative. ($-44.4$ is the answer in degrees.)`,
    hints: ["Set the calculator to radian mode."],
  });

  chk(cos(asin(5 / 13)), 12 / 13);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the exact value of $\cos\left(\sin^{-1}\frac{5}{13}\right)$. Give your answer as a fraction.`,
    value: 12 / 13, wrong: [5 / 12, 13 / 12],
    explanation: t`Let $\alpha = \sin^{-1}\frac{5}{13}$, an acute angle with opposite 5 and hypotenuse 13. Adjacent $= \sqrt{169 - 25} = 12$, so $\cos\alpha = \frac{12}{13}$.`,
    hints: ["Draw a right-angled triangle with opposite 5 and hypotenuse 13."],
  });

  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The graph of $y = a + b\cos x$, where $b > 0$, has maximum value 9 and minimum value 1. Find $a$ and $b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [5], wrong: "4" },
      { id: "b", input: "number", accepted: [4], wrong: "8" },
    ],
    explanation: t`$a + b = 9$ and $a - b = 1$, so $a = 5$ and $b = 4$. The centre line is $y = 5$ and the amplitude is 4.`,
    hints: ["The maximum is a + b and the minimum is a − b."],
  });

  b.tf({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`The graph of $y = \tan x$ has period $360^\circ$.`,
    answer: false,
    explanation: t`$\tan x$ repeats every $180^\circ$ ($\pi$ radians): $\tan(x + 180^\circ) = \tan x$. Its asymptotes are $180^\circ$ apart.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each function (x in radians) with its period.",
    pairs: [
      [t`$y = \sin 2x$`, t`$\pi$`],
      [t`$y = \cos\frac{x}{2}$`, t`$4\pi$`],
      [t`$y = \tan 3x$`, t`$\frac{\pi}{3}$`],
      [t`$y = 3\sin x$`, t`$2\pi$`],
    ],
    explanation: t`$\sin kx$ and $\cos kx$ have period $\frac{2\pi}{k}$; $\tan kx$ has period $\frac{\pi}{k}$. A vertical stretch (the 3 in $3\sin x$) does not change the period.`,
  });

  // y = 3 sin 2x, 0..180°: max at 45°, min at 135°
  chk(3 * sin(rad(90)), 3); chk(3 * sin(rad(270)), -3);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`For $0^\circ \le x \le 180^\circ$, find the coordinates of the maximum and minimum points of $y = 3\sin 2x$.`,
    template: "maximum ({{blank:a}}°, {{blank:b}}), minimum ({{blank:c}}°, {{blank:d}})",
    blanks: [
      { id: "a", input: "number", accepted: [45], wrong: "90" },
      { id: "b", input: "number", accepted: [3], wrong: "1" },
      { id: "c", input: "number", accepted: [135], wrong: "270" },
      { id: "d", input: "number", accepted: [-3], wrong: "-1" },
    ],
    explanation: t`Maximum where $2x = 90^\circ$: $x = 45^\circ$, $y = 3$. Minimum where $2x = 270^\circ$: $x = 135^\circ$, $y = -3$.`,
    hints: [t`Find where $\sin 2x = 1$ and where $\sin 2x = -1$.`],
  });

  const nSol = solveTrig({ fn: "sin", k: 0.25, a: 2, lo: 0, hi: 360 }).length;
  chk(nSol, 4);
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`How many solutions does the equation $4\sin 2x = 1$ have for $0^\circ \le x \le 360^\circ$?`,
    value: nSol, wrong: [2, 8],
    explanation: t`$\sin 2x = \frac{1}{4}$. On $0^\circ \le x \le 360^\circ$, $y = \sin 2x$ completes two cycles, and the line $y = \frac{1}{4}$ crosses each cycle twice: 4 solutions.`,
    hints: ["How many cycles of sin 2x fit into 360°?"],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which transformation maps the graph of $y = \cos x$ onto the graph of $y = \cos\left(x - \frac{\pi}{4}\right) + 2$?`,
    options: [
      [t`translation by $\begin{pmatrix} \frac{\pi}{4} \\ 2 \end{pmatrix}$`, t`Correct: $x - \frac{\pi}{4}$ moves the graph right by $\frac{\pi}{4}$, and $+2$ moves it up by 2.`],
      [t`translation by $\begin{pmatrix} -\frac{\pi}{4} \\ 2 \end{pmatrix}$`, t`Replacing $x$ by $x - \frac{\pi}{4}$ moves the graph to the right, not the left.`],
      [t`translation by $\begin{pmatrix} 2 \\ \frac{\pi}{4} \end{pmatrix}$`, "The components are swapped: the horizontal shift comes from inside the bracket."],
      [t`translation by $\begin{pmatrix} \frac{\pi}{4} \\ -2 \end{pmatrix}$`, t`Adding 2 outside the function moves the graph up, not down.`],
    ],
    answer: "A",
    explanation: t`$y = f(x - p) + q$ is $y = f(x)$ translated by $\begin{pmatrix} p \\ q \end{pmatrix}$; here $p = \frac{\pi}{4}$, $q = 2$.`,
    hints: ["A change inside the bracket acts horizontally and the opposite way to its sign."],
  });

  chk(2 * cos(PI / 6), sqrt(3));
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Where does the graph of $y = 2\cos\left(x + \frac{\pi}{6}\right)$ cross the $y$-axis?`,
    options: [
      [t`$(0, \sqrt{3})$`, t`Correct: $2\cos\frac{\pi}{6} = 2 \times \frac{\sqrt{3}}{2} = \sqrt{3}$.`],
      [t`$(0, 1)$`, t`This uses $\cos\frac{\pi}{6} = \frac{1}{2}$; that is $\cos\frac{\pi}{3}$.`],
      [t`$(0, 2)$`, t`This ignores the translation: $y = 2$ only when $x + \frac{\pi}{6} = 0$.`],
      [t`$\left(0, \frac{\sqrt{3}}{2}\right)$`, "The factor 2 has been left out."],
    ],
    answer: "A",
    explanation: t`Put $x = 0$: $y = 2\cos\frac{\pi}{6} = \sqrt{3}$.`,
    hints: ["Substitute x = 0."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: t`Describe the sketch of $y = 1 - \cos 2x$ for $0 \le x \le 2\pi$: its range, period, and the coordinates of its maximum and minimum points.`,
    points: [
      t`Range $0 \le y \le 2$; period $\pi$.`,
      t`Minimum points $(0, 0)$, $(\pi, 0)$, $(2\pi, 0)$ (the graph touches the $x$-axis there).`,
      t`Maximum points $\left(\frac{\pi}{2}, 2\right)$ and $\left(\frac{3\pi}{2}, 2\right)$.`,
    ],
    modelAnswer: "The graph is y = cos 2x reflected in the x-axis and moved up 1: period π, between y = 0 and y = 2. It touches the x-axis at (0, 0), (π, 0) and (2π, 0) and has maxima at (π/2, 2) and (3π/2, 2).",
    explanation: t`$\cos 2x$ has period $\pi$; $-\cos 2x$ is reflected; adding 1 lifts the range from $[-1, 1]$ to $[0, 2]$.`,
    hints: [t`Start with $y = \cos 2x$, then reflect and translate.`],
  });

  // ZIMSEC: inverse graphs
  b.mcq({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`What is the range of the function $y = \cos^{-1}x$?`,
    options: [
      [t`$0 \le y \le \pi$`, t`Correct: the principal values of $\cos^{-1}$ run from $0$ (at $x = 1$) to $\pi$ (at $x = -1$).`],
      [t`$-\frac{\pi}{2} \le y \le \frac{\pi}{2}$`, t`This is the range of $\sin^{-1}x$.`],
      [t`$-1 \le y \le 1$`, t`This is the domain of $\cos^{-1}x$ (the range of $\cos x$).`],
      [t`$0 \le y \le 2\pi$`, t`One full turn would repeat values; the range is restricted to $[0, \pi]$.`],
    ],
    answer: "A",
    explanation: t`$\cos x$ restricted to $0 \le x \le \pi$ is one-to-one, so $\cos^{-1}x$ has domain $[-1, 1]$ and range $[0, \pi]$.`,
  });

  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false, applies: ZP,
    stem: t`The graph of $y = 2\sin^{-1}(x - 1)$ is sketched. State its domain and the greatest value of $y$, correct to 3 significant figures.`,
    template: "domain {{blank:a}} ≤ x ≤ {{blank:b}}; greatest value of y = {{blank:c}}",
    blanks: [
      { id: "a", input: "number", accepted: [0], wrong: "-1" },
      { id: "b", input: "number", accepted: [2], wrong: "1" },
      { id: "c", input: "number", accepted: ["3.14"], tolerance: 0.005, wrong: "1.57" },
    ],
    explanation: t`$\sin^{-1}u$ needs $-1 \le u \le 1$: $-1 \le x - 1 \le 1$ gives $0 \le x \le 2$. Its range $\left[-\frac{\pi}{2}, \frac{\pi}{2}\right]$ is doubled to $[-\pi, \pi]$, so the greatest value is $\pi = 3.14$.`,
    hints: [t`The graph of $y = \sin^{-1}x$ is translated 1 to the right and stretched by factor 2 vertically.`],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3, applies: ZP,
    stem: t`Describe the graph of $y = \tan^{-1}x$: its domain, range, asymptotes and shape.`,
    points: [
      "Domain: all real x; it passes through the origin.",
      t`Range $-\frac{\pi}{2} < y < \frac{\pi}{2}$, with horizontal asymptotes $y = \frac{\pi}{2}$ and $y = -\frac{\pi}{2}$.`,
      t`Increasing everywhere; it is the reflection of $y = \tan x$, $-\frac{\pi}{2} < x < \frac{\pi}{2}$, in the line $y = x$.`,
    ],
    modelAnswer: "y = tan⁻¹x is defined for every real x, passes through (0, 0), increases steadily and flattens out towards the horizontal asymptotes y = π/2 (as x → ∞) and y = −π/2 (as x → −∞). It is the mirror image of the central branch of y = tan x in y = x.",
    explanation: "The vertical asymptotes of tan x become horizontal asymptotes of tan⁻¹x after reflection in y = x.",
    hints: ["Reflect the central branch of y = tan x in the line y = x."],
  });

  // Struct (12): y = 2 cos 3x + 1, 0 ≤ x ≤ 120°
  chk(2 * cos(rad(180)) + 1, -1); chk(2 * cos(0) + 1, 3);
  const n12 = solveTrig({ fn: "cos", k: -0.25, a: 3, lo: 0, hi: 120 }).length;
  chk(n12, 2);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`The curve $y = 2\cos 3x + 1$ is drawn for $0^\circ \le x \le 120^\circ$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "State the amplitude and the period of the curve.", template: "amplitude = {{blank:a}}, period = {{blank:p}}°",
        blanks: [{ id: "a", input: "number", accepted: [2], wrong: "3" }, { id: "p", input: "number", accepted: [120], wrong: "1080" }],
        explanation: t`Amplitude 2; period $\frac{360^\circ}{3} = 120^\circ$.` }),
      P.fib({ label: "(b)", marks: 2, stem: "State the greatest and least values of y.", template: "greatest {{blank:g}}, least {{blank:l}}",
        blanks: [{ id: "g", input: "number", accepted: [3], wrong: "2" }, { id: "l", input: "number", accepted: [-1], wrong: "-2" }],
        explanation: t`$2\cos 3x$ lies between $-2$ and $2$; adding 1 gives $-1 \le y \le 3$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the x-coordinate of the minimum point.", value: 60, unit: "°", wrong: [180, 120],
        explanation: t`Minimum when $\cos 3x = -1$: $3x = 180^\circ$, $x = 60^\circ$.` }),
      P.num({ label: "(d)", marks: 1, stem: "Write down the y-intercept.", value: 3, wrong: [1],
        explanation: t`$x = 0$: $y = 2\cos 0 + 1 = 3$.` }),
      P.num({ label: "(e)", marks: 2, stem: t`State the number of solutions of $2\cos 3x + 1 = 0.5$ for $0^\circ \le x \le 120^\circ$.`, value: n12, wrong: [1, 6],
        explanation: t`$\cos 3x = -0.25$. One full cycle of the curve covers the interval, and the line $y = 0.5$ (between $-1$ and $3$) cuts it twice.` }),
      P.manual({ label: "(f)", marks: 3, stem: t`Describe a sequence of transformations that maps $y = \cos x$ onto $y = 2\cos 3x + 1$.`,
        points: ["A stretch parallel to the x-axis, scale factor 1/3.", "A stretch parallel to the y-axis, scale factor 2.", "A translation of 1 unit in the positive y-direction (after the y-stretch)."],
        modelAnswer: "Stretch parallel to the x-axis with factor 1/3 (giving cos 3x), then stretch parallel to the y-axis with factor 2 (giving 2 cos 3x), then translate by (0, 1) (giving 2 cos 3x + 1)." }),
    ],
    explanation: "Read amplitude, period and centre line from y = a cos kx + c, then use the graph to count solutions.",
    hints: ["The period of cos kx is 360° ÷ k.", "Do the y-stretch before the upward translation."],
  });

  // Struct (13): y = a − b cos kx with min (0, −1), max 5 at x = π/2, period π → y = 2 − 3 cos 2x
  chk(2 - 3 * cos(0), -1); chk(2 - 3 * cos(PI), 5);
  const roots2 = solveTrig({ fn: "cos", k: 0, a: 2, lo: 0, hi: 2 * PI, unit: "rad" }).map((x) => x / PI);
  roots2.forEach((v, i) => chk(v, [0.25, 0.75, 1.25, 1.75][i], 1e-8));
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The curve $y = a - b\cos kx$, where $a$, $b$ and $k$ are positive constants, is drawn for $0 \le x \le 2\pi$. It has a minimum point at $(0, -1)$, the next maximum point is at $\left(\frac{\pi}{2}, 5\right)$, and the curve has period $\pi$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find a, b and k.", template: "a = {{blank:a}}, b = {{blank:b}}, k = {{blank:k}}",
        blanks: [{ id: "a", input: "number", accepted: [2], wrong: "3" }, { id: "b", input: "number", accepted: [3], wrong: "6" }, { id: "k", input: "number", accepted: [2], wrong: "0.5" }],
        explanation: t`Period $\frac{2\pi}{k} = \pi$, so $k = 2$. Minimum $a - b = -1$ and maximum $a + b = 5$, so $a = 2$, $b = 3$: $y = 2 - 3\cos 2x$.` }),
      P.manual({ label: "(b)", marks: 4, stem: t`Describe the sketch of the curve for $0 \le x \le 2\pi$.`,
        points: [
          t`Minimum points $(0, -1)$, $(\pi, -1)$, $(2\pi, -1)$.`,
          t`Maximum points $\left(\frac{\pi}{2}, 5\right)$, $\left(\frac{3\pi}{2}, 5\right)$.`,
          t`Centre line $y = 2$, crossed at $x = \frac{\pi}{4}, \frac{3\pi}{4}, \frac{5\pi}{4}, \frac{7\pi}{4}$.`,
          "Smooth cosine-shaped curve (reflected cos 2x) covering two full cycles.",
        ],
        modelAnswer: "Two cycles of an upside-down cosine wave between y = −1 and y = 5: minima at x = 0, π, 2π; maxima at x = π/2, 3π/2; it crosses y = 2 at x = π/4, 3π/4, 5π/4, 7π/4 and the x-axis four times (where cos 2x = 2/3)." }),
      P.fib({ label: "(c)", marks: 4, stem: t`The curve meets the line $y = 2$ at four points. Their $x$-coordinates are $x = c\pi$. Find the four values of $c$ in ascending order, as decimals.`, template: "c = {{blank:c1}}, {{blank:c2}}, {{blank:c3}}, {{blank:c4}}",
        blanks: [
          { id: "c1", input: "number", accepted: [0.25], wrong: "0.5" },
          { id: "c2", input: "number", accepted: [0.75], wrong: "1" },
          { id: "c3", input: "number", accepted: [1.25], wrong: "1.5" },
          { id: "c4", input: "number", accepted: [1.75], wrong: "2" },
        ],
        explanation: t`$2 - 3\cos 2x = 2 \Rightarrow \cos 2x = 0 \Rightarrow 2x = \frac{\pi}{2}, \frac{3\pi}{2}, \frac{5\pi}{2}, \frac{7\pi}{2}$, so $x = \frac{\pi}{4}, \frac{3\pi}{4}, \frac{5\pi}{4}, \frac{7\pi}{4}$.` }),
      P.num({ label: "(d)", marks: 2, stem: t`Find the value of $p$ for which the line $y = p$ meets the curve, for $0 \le x \le 2\pi$, at exactly two points.`, prefix: "p =", value: 5, wrong: [-1, 2],
        explanation: t`A line $-1 < p < 5$ meets the curve 4 times; $p = -1$ meets it at 3 minima ($x = 0, \pi, 2\pi$); $p = 5$ meets it only at the 2 maxima. So $p = 5$.` }),
    ],
    explanation: "Use the period for k and the maximum/minimum for a and b; count intersections with horizontal lines from the shape.",
    hints: [t`The period of $\cos kx$ is $\frac{2\pi}{k}$.`, "Watch the end points of the interval when counting intersections."],
  });

  b.card("FACT", "Periods", t`$\sin x$, $\cos x$: $360^\circ$ ($2\pi$); $\tan x$: $180^\circ$ ($\pi$). $\sin kx$: $\frac{360^\circ}{k}$.`);
  b.card("FACT", "Exact values at 30°, 45°, 60°", t`$\sin$: $\frac{1}{2}, \frac{\sqrt{2}}{2}, \frac{\sqrt{3}}{2}$; $\cos$: $\frac{\sqrt{3}}{2}, \frac{\sqrt{2}}{2}, \frac{1}{2}$; $\tan$: $\frac{1}{\sqrt{3}}, 1, \sqrt{3}$.`);
  b.card("CONCEPT", "CAST", "Quadrant 1 all positive; 2 sine; 3 tangent; 4 cosine.");
  b.card("CONCEPT", "y = a sin(kx + b) + c", "Amplitude |a|, period 360°/k, centre line y = c, horizontal shift −b/k.");
  b.card("DEFINITION", "Principal values", t`$\sin^{-1}$: $\left[-\frac{\pi}{2}, \frac{\pi}{2}\right]$; $\cos^{-1}$: $[0, \pi]$; $\tan^{-1}$: $\left(-\frac{\pi}{2}, \frac{\pi}{2}\right)$.`);
  b.card("FACT", "Asymptotes of tan x", t`Vertical lines $x = 90^\circ + 180^\circ n$ ($x = \frac{\pi}{2} + n\pi$).`);
  b.card("CONCEPT", "Constants from max and min", t`For $y = a + b\sin x$: $a = \frac{\max + \min}{2}$, $|b| = \frac{\max - \min}{2}$.`);
  b.card("FACT", "Graph of tan⁻¹x (ZIMSEC)", t`Domain all real $x$; horizontal asymptotes $y = \pm\frac{\pi}{2}$; increasing through the origin.`, undefined, { applies: ZP });
  b.card("CONCEPT", "Counting solutions", "The number of solutions of f(x) = k is the number of times the line y = k crosses the graph of y = f(x) in the interval.");
});
