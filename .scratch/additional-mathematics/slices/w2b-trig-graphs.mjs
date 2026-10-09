// W2b: amath.trig.graphs
import { concept, P, t, chk, same, rad, deg, solveTrig, root } from "../lib.mjs";

const S = (d) => Math.sin(rad(d));
const C = (d) => Math.cos(rad(d));
/** Number of intersections of f and g on [lo, hi] found on a fine grid (sign changes plus exact zeros). */
function countMeet(f, g, lo, hi, n = 200000) {
  let count = 0;
  let prev = f(lo) - g(lo);
  if (Math.abs(prev) < 1e-12) count++;
  for (let i = 1; i <= n; i++) {
    const x = lo + ((hi - lo) * i) / n;
    const cur = f(x) - g(x);
    if (Math.abs(cur) < 1e-12) count++;
    else if (prev * cur < 0 && Math.abs(prev) > 1e-12) count++;
    prev = cur;
  }
  return count;
}

concept("amath.trig.graphs", { file: "trig/graphs", keyPrefix: "trig.graphs" }, (b) => {
  chk(360 / 4, 90);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the period of $y = \sin 4x$, in degrees?`,
    options: [
      [t`$90°$`, t`Correct: period $= \frac{360°}{4} = 90°$; four complete waves fit in $360°$.`],
      [t`$1440°$`, t`This multiplies by 4. A larger $b$ squeezes the curve, so the period gets shorter.`],
      [t`$360°$`, t`That is the period of $\sin x$; the 4 changes it.`],
      [t`$45°$`, t`This uses $180°$, the period of tangent, divided by 4.`],
    ],
    answer: "A",
    explanation: t`For $y = \sin bx$ the period is $\frac{360°}{b}$, so $y = \sin 4x$ has period $90°$.`,
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the amplitude of $y = 5\cos 2x - 3$?`,
    options: [
      ["5", t`Correct: the curve goes 5 units above and below its centre line $y = -3$.`],
      ["2", t`2 is the value of $b$; it affects the period, not the amplitude.`],
      ["8", t`8 is $a - c = 5 - (-3)$. The constant $c$ moves the centre line but does not change the amplitude.`],
      ["2.5", t`This halves $a$. The amplitude is $a$ itself: half of $\max - \min = 10$.`],
    ],
    answer: "A",
    explanation: t`Maximum $-3 + 5 = 2$, minimum $-3 - 5 = -8$, amplitude $\frac{2 - (-8)}{2} = 5$, which is $a$.`,
  });

  chk(4 * 1 - 1, 3);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the maximum value of $y = 4\cos 3x - 1$.`,
    value: 3, wrong: [4, 5],
    explanation: t`$\cos 3x$ has maximum 1, so the maximum of $y$ is $4(1) - 1 = 3$ (at $x = 0°, 120°, \ldots$).`,
  });

  chk(180 / 0.5, 360);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the period, in degrees, of $y = 2\tan\dfrac{x}{2}$.`,
    value: 360, unit: "°", wrong: [90, 720],
    explanation: t`The period of $\tan bx$ is $\frac{180°}{b}$. With $b = \frac{1}{2}$: $\frac{180°}{1/2} = 360°$. (Using $360°$ for tangent would wrongly give $720°$.)`,
  });

  chk(2 + 5 * -1, -3);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the minimum value of $y = 2 + 5\sin\dfrac{x}{3}$.`,
    value: -3, wrong: [-5, 7],
    explanation: t`$\sin\frac{x}{3}$ has minimum $-1$, so the minimum of $y$ is $2 - 5 = -3$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The graph of $y = \tan x$ has a vertical asymptote at $x = 180°$.`,
    answer: false,
    explanation: t`False. $\tan 180° = 0$, so the graph crosses the $x$-axis there. The asymptotes are where $\cos x = 0$: $x = 90°$ and $x = 270°$ in $0°$ to $360°$.`,
  });

  chk(360 / 3, 120); chk(360 / 0.5, 720); chk(180 / 2, 90); chk(180 / (1 / 3), 540);
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each function with its period.",
    pairs: [
      [t`$y = \sin 3x$`, t`$120°$`],
      [t`$y = \cos\frac{x}{2}$`, t`$720°$`],
      [t`$y = \tan 2x$`, t`$90°$`],
      [t`$y = \tan\frac{x}{3}$`, t`$540°$`],
    ],
    explanation: t`Sine and cosine: period $\frac{360°}{b}$, giving $120°$ and $720°$. Tangent: period $\frac{180°}{b}$, giving $90°$ and $540°$.`,
  });

  const asym = [90, 270].map((u) => u / 2);
  same(asym, [45, 135]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`State the equations of the asymptotes of $y = \tan 2x$ for $0° < x < 180°$, in ascending order.`,
    template: "x = {{blank:a}}° and x = {{blank:b}}°",
    blanks: [
      { id: "a", input: "number", accepted: [45], wrong: "90" },
      { id: "b", input: "number", accepted: [135], wrong: "270" },
    ],
    explanation: t`Asymptotes where $2x = 90°$ or $2x = 270°$, so $x = 45°$ and $x = 135°$. (The period is $90°$, so they are $90°$ apart.)`,
    hints: [t`$\tan u$ is undefined when $u = 90°, 270°, \ldots$; here $u = 2x$.`],
  });

  // max 7, min 1, period 180 -> a = 3, b = 2, c = 4
  const f9 = (x) => 3 * S(2 * x) + 4;
  chk(f9(45), 7); chk(f9(135), 1); chk(f9(180), f9(0));
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The curve $y = a\sin bx + c$, where $a$ and $b$ are positive, has a maximum value of 7, a minimum value of 1 and a period of $180°$. Find $a$, $b$ and $c$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
    blanks: [
      { id: "a", input: "number", accepted: [3], wrong: "6" },
      { id: "b", input: "number", accepted: [2], wrong: "0.5" },
      { id: "c", input: "number", accepted: [4], wrong: "1" },
    ],
    explanation: t`$a = \frac{7 - 1}{2} = 3$, $c = \frac{7 + 1}{2} = 4$, and $b = \frac{360°}{180°} = 2$. So $y = 3\sin 2x + 4$.`,
    hints: [t`Amplitude $= \frac{\max - \min}{2}$; centre line $c = \frac{\max + \min}{2}$.`],
  });

  const g10 = (x) => 2 * C(x) + 1;
  chk(g10(0), 3); chk(g10(180), -1); chk(g10(360), 3);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`A curve has a maximum at $(0, 3)$, its next minimum is $-1$ at $x = 180°$, and it repeats every $360°$. Which equation could it have?`,
    options: [
      [t`$y = 2\cos x + 1$`, t`Correct: amplitude $\frac{3 - (-1)}{2} = 2$, centre $\frac{3 + (-1)}{2} = 1$, period $360°$, and cosine starts at its maximum.`],
      [t`$y = 2\sin x + 1$`, t`A sine curve starts on its centre line at $(0, 1)$, not at the maximum.`],
      [t`$y = 3\cos x$`, t`This has minimum $-3$, not $-1$.`],
      [t`$y = 2\cos 2x + 1$`, t`This has period $180°$, so it would be back at its maximum at $x = 180°$.`],
    ],
    answer: "A",
    explanation: t`$a = 2$, $c = 1$, $b = \frac{360°}{360°} = 1$; starting at a maximum means cosine: $y = 2\cos x + 1$.`,
    hints: ["Decide sine or cosine from the value at x = 0."],
  });

  chk(solveTrig({ fn: "cos", k: 0.5, a: 2, lo: 0, hi: 360 }).length, 4);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the number of solutions of $2\cos 2x = 1$ for $0° \leq x \leq 360°$.`,
    value: 4, wrong: [2, 1],
    explanation: t`$\cos 2x = \frac{1}{2}$. The curve $y = \cos 2x$ makes two complete waves in $0°$ to $360°$, and the line $y = \frac{1}{2}$ crosses each wave twice: 4 solutions ($x = 30°, 150°, 210°, 330°$).`,
    hints: [t`How many complete waves of $y = \cos 2x$ fit in the interval?`],
  });

  const n12 = countMeet((x) => Math.sin(x), (x) => 1 - x / Math.PI, 0, 2 * Math.PI);
  chk(n12, 3);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`By sketching $y = \sin x$ and the straight line $y = 1 - \dfrac{x}{\pi}$ on the same axes for $0 \leq x \leq 2\pi$, find the number of solutions of $\sin x = 1 - \dfrac{x}{\pi}$ in this interval.`,
    value: 3, wrong: [2, 1],
    explanation: t`The line falls from $(0, 1)$ through $(\pi, 0)$ to $(2\pi, -1)$. It crosses the rising sine curve once between $0$ and $\frac{\pi}{2}$, meets it at $(\pi, 0)$, and crosses it again between $\frac{3\pi}{2}$ and $2\pi$ (the curve comes back up to 0 while the line is still falling to $-1$): 3 solutions.`,
    hints: [t`Both graphs pass through $(\pi, 0)$.`, t`Compare the values at $x = \frac{3\pi}{2}$ and $x = 2\pi$.`],
  });

  chk(3 * C(0) - 5, -2);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the $y$-coordinate of the point where $y = 3\cos 2x - 5$ meets the $y$-axis.`,
    value: -2, wrong: [-5, -8],
    explanation: t`At $x = 0$: $y = 3\cos 0 - 5 = 3 - 5 = -2$.`,
  });

  same(solveTrig({ fn: "sin", k: -0.5, lo: 0, hi: 360 }), [210, 330]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the $x$-coordinates of the points where $y = 2\sin x + 1$ crosses the $x$-axis for $0° \leq x \leq 360°$, in ascending order.`,
    template: "x = {{blank:a}}° and x = {{blank:b}}°",
    blanks: [
      { id: "a", input: "number", accepted: [210], wrong: "30" },
      { id: "b", input: "number", accepted: [330], wrong: "150" },
    ],
    explanation: t`$2\sin x + 1 = 0$ gives $\sin x = -\frac{1}{2}$: related angle $30°$, sine negative in the third and fourth quadrants, so $x = 180° + 30° = 210°$ and $x = 360° - 30° = 330°$.`,
    hints: [t`Set $y = 0$ and solve for $\sin x$.`],
  });

  const g15 = (x) => 2 * C(x) - 1;
  chk(g15(0), 1); chk(g15(180), -3); chk(g15(360), 1);
  same(solveTrig({ fn: "cos", k: 0.5, lo: 0, hi: 360 }), [60, 300]);
  b.manualShort({
    d: 3, skill: "APPLICATION", calculator: false, marks: 4,
    stem: t`Describe the sketch you would draw of $y = 2\cos x - 1$ for $0° \leq x \leq 360°$, giving the coordinates of the key points.`,
    points: [
      t`A cosine-shaped wave, one complete cycle, starting and ending at a maximum.`,
      t`Maximum points $(0°, 1)$ and $(360°, 1)$.`,
      t`Minimum point $(180°, -3)$.`,
      t`Crosses the $x$-axis at $x = 60°$ and $x = 300°$.`,
    ],
    modelAnswer: t`One full cosine wave with centre line $y = -1$: it starts at the maximum $(0°, 1)$, falls through the $x$-axis at $x = 60°$ to the minimum $(180°, -3)$, rises through the $x$-axis at $x = 300°$ and ends at the maximum $(360°, 1)$.`,
    explanation: t`Amplitude 2 about the centre line $y = -1$ gives maximum 1 and minimum $-3$; the $x$-intercepts come from $\cos x = \frac{1}{2}$.`,
    hints: [t`Solve $2\cos x - 1 = 0$ for the intercepts.`],
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`What is the range of $y = 3\sin x + 2$ for all real $x$?`,
    options: [
      [t`$-1 \leq y \leq 5$`, t`Correct: $2 - 3 = -1$ and $2 + 3 = 5$.`],
      [t`$-3 \leq y \leq 3$`, t`This ignores the $+2$, which moves the whole curve up.`],
      [t`$-1 \leq y \leq 3$`, t`The maximum is $c + a = 2 + 3 = 5$.`],
      [t`$2 \leq y \leq 5$`, t`The curve goes 3 below its centre line $y = 2$ as well as 3 above.`],
    ],
    answer: "A",
    explanation: t`$-1 \leq \sin x \leq 1$, so $-3 \leq 3\sin x \leq 3$ and $-1 \leq 3\sin x + 2 \leq 5$.`,
  });

  // calculator: smallest positive root of 4cos2x + 1 = 0
  const r17 = solveTrig({ fn: "cos", k: -0.25, a: 2, lo: 0, hi: 180 });
  chk(r17[0], deg(Math.acos(-0.25)) / 2);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Find the smallest positive value of $x$, in degrees, at which the curve $y = 4\cos 2x + 1$ crosses the $x$-axis. Give your answer correct to 1 decimal place.`,
    value: r17[0], unit: "°", wrong: [deg(Math.acos(-0.25)), deg(Math.acos(0.25)) / 2],
    explanation: t`$\cos 2x = -\frac{1}{4}$, so $2x = \cos^{-1}(-0.25) = 104.48°$ and $x = 52.2°$. (Forgetting to halve gives $104.5°$; dropping the minus sign gives $37.8°$.)`,
    hints: [t`Solve for $2x$ first, then divide by 2.`],
  });

  // Struct 1 (6): f(x) = 4 sin 3x - 1 on 0..120
  const f18 = (x) => 4 * S(3 * x) - 1;
  chk(f18(30), 3); chk(f18(90), -5); chk(f18(0), -1); chk(f18(120), -1);
  chk(solveTrig({ fn: "sin", k: 0.75, a: 3, lo: 0, hi: 120 }).length, 2);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The function $f$ is defined by $f(x) = 4\sin 3x - 1$ for $0° \leq x \leq 120°$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`State the amplitude and the period of $f$.`, template: "amplitude {{blank:a}}, period {{blank:p}}°",
        blanks: [{ id: "a", input: "number", accepted: [4], wrong: "3" }, { id: "p", input: "number", accepted: [120], wrong: "1080" }],
        explanation: t`Amplitude $a = 4$; period $\frac{360°}{3} = 120°$, so the interval holds exactly one wave.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`Find the maximum value of $f(x)$ and the value of $x$ at which it occurs.`, template: "maximum {{blank:m}} at x = {{blank:x}}°",
        blanks: [{ id: "m", input: "number", accepted: [3], wrong: "4" }, { id: "x", input: "number", accepted: [30], wrong: "90" }],
        explanation: t`Maximum $4 - 1 = 3$ where $3x = 90°$, that is $x = 30°$.` }),
      P.num({ label: "(c)", marks: 1, stem: t`Find the minimum value of $f(x)$.`, value: -5, wrong: [-4, -3],
        explanation: t`Minimum $-4 - 1 = -5$, where $3x = 270°$, at $x = 90°$.` }),
      P.num({ label: "(d)", marks: 1, stem: t`Find the number of solutions of $f(x) = 2$ in the interval.`, value: 2, wrong: [1, 4],
        explanation: t`The line $y = 2$ lies between the minimum $-5$ and the maximum 3, so it crosses the single wave twice.` }),
    ],
    explanation: "Amplitude a, period 360°/b, maximum c + a, minimum c − a; count intersections with a horizontal line from the sketch.",
    hints: [t`$\sin 3x = 1$ when $3x = 90°$.`, "A horizontal line strictly between the minimum and maximum meets one full wave twice."],
  });

  // Struct 2 (7): y = a cos bx + c, max (0, 7), min 1 at π/2 -> 3 cos 2x + 4
  const f19 = (x) => 3 * Math.cos(2 * x) + 4;
  chk(f19(0), 7); chk(f19(Math.PI / 2), 1); chk(f19(Math.PI / 3), 2.5);
  chk(solveTrig({ fn: "cos", k: 1 / 3, a: 2, lo: 0, hi: 2 * Math.PI, unit: "rad" }).length, 4);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The curve $y = a\cos bx + c$, where $a > 0$ and $b > 0$, has a maximum point at $(0, 7)$. The next minimum point is at $\left(\frac{\pi}{2}, 1\right)$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Find $a$, $b$ and $c$.`, template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
        blanks: [{ id: "a", input: "number", accepted: [3], wrong: "6" }, { id: "b", input: "number", accepted: [2], wrong: "4" }, { id: "c", input: "number", accepted: [4], wrong: "1" }],
        explanation: t`$a = \frac{7 - 1}{2} = 3$, $c = \frac{7 + 1}{2} = 4$. From maximum to the next minimum is half a period, so the period is $\pi$ and $b = \frac{2\pi}{\pi} = 2$.` }),
      P.num({ label: "(b)", marks: 2, stem: t`Find the exact value of $y$ when $x = \dfrac{\pi}{3}$.`, value: 2.5, wrong: [5.5],
        explanation: t`$y = 3\cos\frac{2\pi}{3} + 4 = 3\left(-\frac{1}{2}\right) + 4 = \frac{5}{2}$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Find the number of solutions of $a\cos bx + c = 5$ for $0 \leq x \leq 2\pi$.`, value: 4, wrong: [2],
        explanation: t`$3\cos 2x + 4 = 5$ gives $\cos 2x = \frac{1}{3}$. There are two complete waves in $0$ to $2\pi$, and the line $y = 5$ (between 1 and 7) crosses each twice: 4 solutions.` }),
    ],
    explanation: "Read a and c from the maximum and minimum; maximum to the next minimum is half a period.",
    hints: ["Maximum to the next minimum is half of one period.", t`$\cos\frac{2\pi}{3} = -\frac{1}{2}$.`],
  });

  chk(360 / 3, 120); chk(180 / 3, 60);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Which function has period $120°$ and amplitude 2?`,
    options: [
      [t`$y = 2\sin 3x$`, t`Correct: amplitude 2 and period $\frac{360°}{3} = 120°$.`],
      [t`$y = 3\sin 2x$`, t`This has amplitude 3 and period $180°$: $a$ and $b$ are swapped.`],
      [t`$y = 2\sin\frac{x}{3}$`, t`Dividing by 3 stretches the curve: the period is $1080°$.`],
      [t`$y = 2\tan 3x$`, t`Tangent has no amplitude, and $\tan 3x$ has period $\frac{180°}{3} = 60°$.`],
    ],
    answer: "A",
    explanation: t`For $y = a\sin bx$, the amplitude is $a$ and the period is $\frac{360°}{b}$: $a = 2$ and $b = 3$.`,
  });

  // Cards
  b.card("FACT", t`Period of $\sin x$, $\cos x$, $\tan x$`, t`$360°$ ($2\pi$), $360°$ ($2\pi$), $180°$ ($\pi$)`);
  b.card("FORMULA", t`Period of $\sin bx$ or $\cos bx$`, t`$\frac{360°}{b} = \frac{2\pi}{b}$`);
  b.card("FORMULA", t`Period of $\tan bx$`, t`$\frac{180°}{b} = \frac{\pi}{b}$`);
  b.card("DEFINITION", "Amplitude", t`Half the distance between the maximum and minimum values: $\frac{\max - \min}{2}$.`);
  b.card("FACT", t`Maximum and minimum of $y = a\sin bx + c$ ($a > 0$)`, t`Maximum $c + a$, minimum $c - a$.`);
  b.card("FACT", t`Asymptotes of $y = \tan x$`, t`$x = 90°, 270°, \ldots$ (where $\cos x = 0$): $x = \frac{\pi}{2} + n\pi$.`);
  b.card("CONCEPT", "Finding a, b, c from a graph", t`$a = \frac{\max - \min}{2}$, $c = \frac{\max + \min}{2}$, $b = \frac{360°}{\text{period}}$; sine starts on the centre line, cosine at a maximum.`);
  b.card("CONCEPT", t`Number of solutions of $f(x) = g(x)$`, "Sketch both graphs on the same axes and count the intersections in the interval.");
  b.card("FACT", t`Shape of $y = \cos x$ on $0°$ to $360°$`, t`Starts at $(0, 1)$, crosses at $90°$, minimum $(180°, -1)$, crosses at $270°$, ends at $(360°, 1)$.`);
});
