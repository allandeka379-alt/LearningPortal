// W2b: amath.trig.equations
import { concept, P, t, chk, same, solveTrig, rnd, sf, dpFor, halfUnit } from "../lib.mjs";

/** Number blank for an angle in degrees to 1 d.p. (accepts the rounded value and anything closer). */
const A1 = (id, x, wrong) => ({ id, input: "number", accepted: [String(rnd(x, 1))], tolerance: 0.05, wrong });
/** Number blank for a value to 3 s.f. */
const S3 = (id, x, wrong) => ({ id, input: "number", accepted: [String(sf(x, 3))], tolerance: halfUnit(dpFor(x, 3)), wrong });
const N = (id, x, wrong) => ({ id, input: "number", accepted: [x], wrong });

concept("amath.trig.equations", { file: "trig/equations", keyPrefix: "trig.equations" }, (b) => {
  same(solveTrig({ fn: "sin", k: 0.5, lo: 0, hi: 360 }), [30, 150]);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`One solution of $\sin x = \frac{1}{2}$ is $x = 30°$. What is the other solution in $0° \leq x \leq 360°$?`,
    options: [
      [t`$150°$`, t`Correct: for sine the partner is $180° - 30° = 150°$ (second quadrant, sine positive).`],
      [t`$330°$`, t`$360° - 30°$ is the partner rule for cosine. $\sin 330° = -\frac{1}{2}$.`],
      [t`$210°$`, t`$180° + 30°$ is the partner rule for tangent. $\sin 210° = -\frac{1}{2}$.`],
      [t`$390°$`, t`$30° + 360°$ is a solution, but it lies outside the interval.`],
    ],
    answer: "A",
    explanation: t`Sine is positive in the first and second quadrants, so $x = 30°$ or $x = 180° - 30° = 150°$.`,
  });

  same(solveTrig({ fn: "cos", k: -0.5, lo: 0, hi: 360 }), [120, 240]);
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Solve $\cos x = -\frac{1}{2}$ for $0° \leq x \leq 360°$.`,
    options: [
      [t`$x = 120°$ or $x = 240°$`, t`Correct: related angle $60°$, cosine negative in the second and third quadrants.`],
      [t`$x = 60°$ or $x = 300°$`, t`These solve $\cos x = +\frac{1}{2}$.`],
      [t`$x = 120°$ or $x = 60°$`, t`$\cos 60° = +\frac{1}{2}$. The partner of $120°$ for cosine is $360° - 120°$.`],
      [t`$x = 150°$ or $x = 210°$`, t`These come from a related angle of $30°$, which belongs to $\cos x = \pm\frac{\sqrt{3}}{2}$.`],
    ],
    answer: "A",
    explanation: t`$\cos^{-1}\left(-\frac{1}{2}\right) = 120°$, and the second solution is $360° - 120° = 240°$.`,
  });

  same(solveTrig({ fn: "tan", k: 1, lo: 0, hi: 360 }), [45, 225]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\tan x = 1$ for $0° \leq x \leq 360°$. Give the solutions in ascending order.`,
    template: "x = {{blank:a}}° or x = {{blank:b}}°",
    blanks: [N("a", 45, "135"), N("b", 225, "315")],
    explanation: t`Principal value $45°$; tangent repeats every $180°$, so the other solution is $45° + 180° = 225°$.`,
  });

  const r4 = solveTrig({ fn: "cos", k: 0.35, lo: 0, hi: 360 });
  b.fib({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: t`Solve $\cos x = 0.35$ for $0° \leq x \leq 360°$, giving your answers correct to 1 decimal place in ascending order.`,
    template: "x = {{blank:a}}° or x = {{blank:b}}°",
    blanks: [A1("a", r4[0], "20.5"), A1("b", r4[1], "110.5")],
    explanation: t`$\cos^{-1} 0.35 = 69.51°$. Cosine is also positive in the fourth quadrant: $360° - 69.51° = 290.49°$. So $x = 69.5°$ or $x = 290.5°$. ($180° - 69.5° = 110.5°$ would be the rule for sine.)`,
  });

  chk(solveTrig({ fn: "sin", k: 0.5, a: 3, lo: 0, hi: 360 }).length, 6);
  b.num({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`How many solutions does $\sin 3x = \frac{1}{2}$ have for $0° \leq x \leq 360°$?`,
    value: 6, wrong: [2, 3],
    explanation: t`With $u = 3x$, the interval becomes $0° \leq u \leq 1080°$: three full cycles of sine, each containing two solutions of $\sin u = \frac{1}{2}$. So there are 6 solutions ($x = 10°, 50°, 130°, 170°, 250°, 290°$).`,
  });

  same(solveTrig({ fn: "cos", k: -0.5, a: 2, lo: 0, hi: 180 }), [60, 120]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\cos 2x = -\frac{1}{2}$ for $0° \leq x \leq 180°$, in ascending order.`,
    template: "x = {{blank:a}}° or x = {{blank:b}}°",
    blanks: [N("a", 60, "120"), N("b", 120, "240")],
    explanation: t`Let $u = 2x$, $0° \leq u \leq 360°$: $\cos u = -\frac{1}{2}$ gives $u = 120°$ or $240°$. Halving: $x = 60°$ or $x = 120°$.`,
    hints: [t`Write the interval for $2x$ first.`, "Halve each value of 2x at the end."],
  });

  const r7 = solveTrig({ fn: "tan", k: 0.4, lo: 0, hi: 360 });
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $5\sin x = 2\cos x$ for $0° \leq x \leq 360°$, giving your answers correct to 1 decimal place in ascending order.`,
    template: "x = {{blank:a}}° or x = {{blank:b}}°",
    blanks: [A1("a", r7[0], "68.2"), A1("b", r7[1], "248.2")],
    explanation: t`Divide by $5\cos x$: $\tan x = \frac{2}{5} = 0.4$, so $x = 21.8°$ or $x = 21.8° + 180° = 201.8°$. (Inverting the fraction, $\tan x = 2.5$, gives $68.2°$ and $248.2°$.)`,
    hints: [t`Divide both sides by $\cos x$ to get an equation in $\tan x$.`],
  });

  same(solveTrig({ fn: "tan", k: -1, lo: 0, hi: 2 * Math.PI, unit: "rad" }).map((x) => Math.round((x / Math.PI) * 4)), [3, 7]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\tan x = -1$ for $0 \leq x \leq 2\pi$. The solutions can be written as $x = \frac{p\pi}{4}$; give the two values of $p$ in ascending order.`,
    template: "p = {{blank:a}} or p = {{blank:b}}",
    blanks: [N("a", 3, "5"), N("b", 7, "1")],
    explanation: t`Related angle $\frac{\pi}{4}$; tangent is negative in the second and fourth quadrants: $x = \pi - \frac{\pi}{4} = \frac{3\pi}{4}$ and $x = 2\pi - \frac{\pi}{4} = \frac{7\pi}{4}$.`,
    hints: [t`Tangent is negative in the second and fourth quadrants.`],
  });

  same(solveTrig({ fn: "cot", k: Math.sqrt(3), lo: 0, hi: 360 }), [30, 210]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\cot x = \sqrt{3}$ for $0° \leq x \leq 360°$, in ascending order.`,
    template: "x = {{blank:a}}° or x = {{blank:b}}°",
    blanks: [N("a", 30, "60"), N("b", 210, "240")],
    explanation: t`$\tan x = \frac{1}{\sqrt{3}}$, so $x = 30°$ or $x = 30° + 180° = 210°$. (Using $\tan x = \sqrt{3}$ by mistake gives $60°$ and $240°$.)`,
    hints: [t`$\cot x = \sqrt{3}$ means $\tan x = \frac{1}{\sqrt{3}}$.`],
  });

  same(solveTrig({ fn: "cos", k: 0.5, b: -20, lo: 0, hi: 360 }), [80, 320]);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\cos(x - 20°) = \frac{1}{2}$ for $0° \leq x \leq 360°$, in ascending order.`,
    template: "x = {{blank:a}}° or x = {{blank:b}}°",
    blanks: [N("a", 80, "40"), N("b", 320, "280")],
    explanation: t`Let $u = x - 20°$, so $-20° \leq u \leq 340°$. $\cos u = \frac{1}{2}$ gives $u = 60°$ or $u = 300°$ (and $-60°$ is outside the interval). Then $x = u + 20°$: $80°$ or $320°$.`,
    hints: [t`Subtract $20°$ from both ends of the interval to get the interval for $u = x - 20°$.`],
  });

  same(solveTrig({ fn: "tan", k: Math.sqrt(3), b: -Math.PI / 4, lo: 0, hi: 2 * Math.PI, unit: "rad" }).map((x) => Math.round((x / Math.PI) * 12)), [7, 19]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $\tan\left(x - \frac{\pi}{4}\right) = \sqrt{3}$ for $0 \leq x \leq 2\pi$. The solutions can be written as $x = \frac{q\pi}{12}$; give the values of $q$ in ascending order.`,
    template: "q = {{blank:a}} or q = {{blank:b}}",
    blanks: [N("a", 7, "4"), N("b", 19, "16")],
    explanation: t`Let $u = x - \frac{\pi}{4}$, with $-\frac{\pi}{4} \leq u \leq \frac{7\pi}{4}$. $\tan u = \sqrt{3}$ gives $u = \frac{\pi}{3}$ or $\frac{4\pi}{3}$. Then $x = \frac{\pi}{3} + \frac{\pi}{4} = \frac{7\pi}{12}$ or $x = \frac{4\pi}{3} + \frac{\pi}{4} = \frac{19\pi}{12}$.`,
    hints: [t`Shift the interval: $u$ runs from $-\frac{\pi}{4}$ to $2\pi - \frac{\pi}{4}$.`, t`$\frac{\pi}{3} + \frac{\pi}{4} = \frac{7\pi}{12}$.`],
  });

  same(solveTrig({ fn: "sin", k: 0, lo: 0, hi: 360 }), [0, 180, 360]);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Farai solves $2\sin x\cos x = \sin x$ for $0° \leq x \leq 360°$ by dividing both sides by $\sin x$. Which solutions does he lose?`,
    options: [
      [t`$0°$, $180°$ and $360°$`, t`Correct: these are the solutions of $\sin x = 0$, the factor he divided by.`],
      [t`$60°$ and $300°$`, t`These come from $\cos x = \frac{1}{2}$, which he still finds after dividing.`],
      [t`$90°$ and $270°$`, t`These solve $\cos x = 0$; they are not solutions of the original equation.`],
      [t`none, since dividing is allowed`, t`Dividing by $\sin x$ is only valid when $\sin x \neq 0$, so the cases with $\sin x = 0$ are lost.`],
    ],
    answer: "A",
    explanation: t`Factorise instead: $\sin x\,(2\cos x - 1) = 0$, so $\sin x = 0$ ($x = 0°, 180°, 360°$) or $\cos x = \frac{1}{2}$ ($x = 60°, 300°$).`,
    hints: ["Which values make the factor you divided by equal to zero?"],
  });

  const ta = solveTrig({ fn: "tan", k: 2, lo: 0, hi: 360 });
  const co = solveTrig({ fn: "cos", k: -0.5, lo: 0, hi: 360 });
  const all13 = [...ta, ...co].sort((p, q) => p - q);
  same(all13.map((x) => Math.round(x * 10) / 10), [63.4, 120, 240, 243.4]);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Solve $(\tan x - 2)(2\cos x + 1) = 0$ for $0° \leq x \leq 360°$. Give all the solutions in ascending order, correct to 1 decimal place where necessary.`,
    template: "x = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°, {{blank:d}}°",
    blanks: [A1("a", all13[0], "26.6"), N("b", 120, "60"), N("c", 240, "300"), A1("d", all13[3], "116.6")],
    explanation: t`$\tan x = 2$: $x = 63.4°$ or $63.4° + 180° = 243.4°$. $\cos x = -\frac{1}{2}$: $x = 120°$ or $240°$. In order: $63.4°, 120°, 240°, 243.4°$.`,
    hints: ["Set each factor equal to zero separately.", "Tangent repeats every 180°."],
  });

  const r14 = solveTrig({ fn: "cos", k: 1 / 3, lo: 0, hi: 2 * Math.PI, unit: "rad" });
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $3\cos x = 1$ for $0 \leq x \leq 2\pi$, giving your answers in radians correct to 3 significant figures, in ascending order.`,
    template: "x = {{blank:a}} or x = {{blank:b}}",
    blanks: [S3("a", r14[0], "70.5"), S3("b", r14[1], "1.91")],
    explanation: t`$\cos^{-1}\frac{1}{3} = 1.231$ (radian mode). Second solution $2\pi - 1.231 = 5.052$. So $x = 1.23$ or $x = 5.05$. (Degree mode gives $70.5$; using $\pi - 1.231$ gives $1.91$, the rule for sine.)`,
    hints: ["Set your calculator to radians.", t`For cosine the partner is $2\pi - \alpha$.`],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The equation $\sin x = 1.2$ has no solutions.`,
    answer: true,
    explanation: t`True. $-1 \leq \sin x \leq 1$ for every $x$, so $\sin x$ can never equal 1.2. Always check $|k| \leq 1$ for sine and cosine.`,
  });

  for (const k of [-7, -0.3, 0, 0.5, 12]) chk(solveTrig({ fn: "tan", k, lo: 0, hi: 359.999999 }).length, 2);
  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`For every real number $k$, the equation $\tan x = k$ has exactly two solutions in $0° \leq x < 360°$.`,
    answer: true,
    explanation: t`True. $\tan x$ takes every real value exactly once on each branch, and there are two branches in $0° \leq x < 360°$: the solutions are $\alpha$ and $\alpha + 180°$. (With $k = 0$ they are $0°$ and $180°$; $360°$ is excluded by the strict inequality.)`,
    hints: [t`Think of the graph of $y = \tan x$ and a horizontal line.`],
  });

  // Struct 1 (7): sin 2x = -0.6
  const r18 = solveTrig({ fn: "sin", k: -0.6, a: 2, lo: 0, hi: 360 });
  chk(solveTrig({ fn: "sin", k: -0.6, a: 2, lo: 0, hi: 720 }).length, 8);
  same(solveTrig({ fn: "sin", k: -1, a: 2, lo: 0, hi: 360 }), [135, 315]);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`This question is about the equation $\sin 2x = k$.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: t`For $k = -0.6$, solve the equation for $0° \leq x \leq 360°$, giving your answers to 1 decimal place in ascending order.`, template: "x = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°, {{blank:d}}°",
        blanks: [A1("a", r18[0], "-18.4"), A1("b", r18[1], "71.6"), A1("c", r18[2], "251.6"), A1("d", r18[3], "198.4")],
        explanation: t`$0° \leq 2x \leq 720°$. Related angle $\sin^{-1} 0.6 = 36.87°$; sine negative in the third and fourth quadrants: $2x = 216.87°, 323.13°, 576.87°, 683.13°$. Halving: $x = 108.4°, 161.6°, 288.4°, 341.6°$.` }),
      P.num({ label: "(b)", marks: 1, stem: t`State the number of solutions of $\sin 2x = -0.6$ for $0° \leq x \leq 720°$.`, value: 8, wrong: [4],
        explanation: "The interval is twice as long, so it contains twice as many solutions: 8." }),
      P.fib({ label: "(c)", marks: 2, stem: t`For $k = -1$, solve the equation for $0° \leq x \leq 360°$, in ascending order.`, template: "x = {{blank:a}}° or x = {{blank:b}}°",
        blanks: [N("a", 135, "270"), N("b", 315, "135")],
        explanation: t`$\sin 2x = -1$ gives $2x = 270°$ or $630°$, so $x = 135°$ or $315°$. Here each cycle meets the line only once (at the minimum), so there are only 2 solutions.` }),
    ],
    explanation: "Change the interval to one for 2x, find every value of 2x, then halve.",
    hints: [t`$0° \leq 2x \leq 720°$.`, "The minimum of sine is −1, reached once per cycle."],
  });

  // Struct 2 (9): f(x) = 2 sin(2x - π/3), 0 ≤ x ≤ π
  same(solveTrig({ fn: "sin", k: 0.5, a: 2, b: -Math.PI / 3, lo: 0, hi: Math.PI, unit: "rad" }).map((x) => Math.round((x / Math.PI) * 12)), [3, 7]);
  same(solveTrig({ fn: "sin", k: -Math.sqrt(3) / 2, a: 2, b: -Math.PI / 3, lo: 0, hi: Math.PI, unit: "rad" }).map((x) => Math.round((x / Math.PI) * 6)), [0, 5, 6]);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The function $f$ is defined by $f(x) = 2\sin\left(2x - \frac{\pi}{3}\right)$ for $0 \leq x \leq \pi$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: t`State the maximum value of $f(x)$.`, value: 2, wrong: [1],
        explanation: "The amplitude is 2 and there is no vertical shift, so the maximum is 2." }),
      P.fib({ label: "(b)", marks: 3, stem: t`Solve $f(x) = 1$. The solutions can be written as $x = \frac{r\pi}{12}$; give the values of $r$ in ascending order.`, template: "r = {{blank:a}} or r = {{blank:b}}",
        blanks: [N("a", 3, "1"), N("b", 7, "5")],
        explanation: t`$\sin u = \frac{1}{2}$ with $u = 2x - \frac{\pi}{3}$ and $-\frac{\pi}{3} \leq u \leq \frac{5\pi}{3}$: $u = \frac{\pi}{6}$ or $\frac{5\pi}{6}$. Then $2x = \frac{\pi}{2}$ or $\frac{7\pi}{6}$, so $x = \frac{\pi}{4} = \frac{3\pi}{12}$ or $x = \frac{7\pi}{12}$.` }),
      P.fib({ label: "(c)", marks: 3, stem: t`Solve $f(x) = -\sqrt{3}$. The solutions can be written as $x = \frac{s\pi}{6}$; give the three values of $s$ in ascending order.`, template: "s = {{blank:a}}, {{blank:b}}, {{blank:c}}",
        blanks: [N("a", 0, "4"), N("b", 5, "2"), N("c", 6, "5")],
        explanation: t`$\sin u = -\frac{\sqrt{3}}{2}$ with $-\frac{\pi}{3} \leq u \leq \frac{5\pi}{3}$: $u = -\frac{\pi}{3}, \frac{4\pi}{3}, \frac{5\pi}{3}$. Then $2x = u + \frac{\pi}{3} = 0, \frac{5\pi}{3}, 2\pi$, so $x = 0, \frac{5\pi}{6}, \pi$: $s = 0, 5, 6$.` }),
      P.manual({ label: "(d)", marks: 2, stem: t`Explain why the equation $f(x) = 3$ has no solutions.`,
        points: [t`States that $-1 \leq \sin\left(2x - \frac{\pi}{3}\right) \leq 1$, so $-2 \leq f(x) \leq 2$.`, "Concludes that 3 is greater than the maximum value 2, so no x gives f(x) = 3."],
        modelAnswer: t`Since $-1 \leq \sin\left(2x - \frac{\pi}{3}\right) \leq 1$, $f(x)$ lies between $-2$ and $2$. The value 3 is above the maximum, so $f(x) = 3$ has no solutions (it would need $\sin u = 1.5$).`,
        explanation: "The range of f is −2 ≤ f(x) ≤ 2." }),
    ],
    explanation: "For a compound angle, transform the interval for the whole bracket, include negative values of u, then convert back.",
    hints: [t`The interval for $u = 2x - \frac{\pi}{3}$ starts at a negative value.`, t`$\sin u = -\frac{\sqrt{3}}{2}$ has a solution at $u = -\frac{\pi}{3}$.`],
  });

  same(solveTrig({ fn: "sec", k: 2, lo: 0, hi: 360 }), [60, 300]);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\sec x = 2$ for $0° \leq x \leq 360°$.`,
    options: [
      [t`$x = 60°$ or $x = 300°$`, t`Correct: $\cos x = \frac{1}{2}$, and cosine is positive in the first and fourth quadrants.`],
      [t`$x = 30°$ or $x = 150°$`, t`These solve $\sin x = \frac{1}{2}$; secant is the reciprocal of cosine, not sine.`],
      [t`$x = 60°$ or $x = 120°$`, t`$180° - 60°$ is the sine partner; $\cos 120° = -\frac{1}{2}$.`],
      [t`$x = 120°$ or $x = 240°$`, t`These solve $\cos x = -\frac{1}{2}$.`],
    ],
    answer: "A",
    explanation: t`$\sec x = 2$ means $\cos x = \frac{1}{2}$: $x = 60°$ or $360° - 60° = 300°$.`,
  });

  chk(solveTrig({ fn: "tan", k: 1, a: 0.5, lo: 0, hi: 360 }).length, 1);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`How many solutions does $\tan\dfrac{x}{2} = 1$ have for $0° \leq x \leq 360°$?`,
    options: [
      ["1", t`Correct: $0° \leq \frac{x}{2} \leq 180°$, and $\tan u = 1$ only at $u = 45°$ there, so $x = 90°$.`],
      ["2", t`$u = 225°$ also solves $\tan u = 1$, but $\frac{x}{2}$ only goes up to $180°$.`],
      ["4", "Halving the angle halves the interval for u; it does not double the number of solutions."],
      ["0", t`$u = 45°$ lies in the interval, giving $x = 90°$.`],
    ],
    answer: "A",
    explanation: t`With $u = \frac{x}{2}$, the interval becomes $0° \leq u \leq 180°$: only $u = 45°$, so $x = 90°$ is the single solution.`,
    hints: [t`Halve both ends of the interval to get the interval for $\frac{x}{2}$.`],
  });

  // Cards
  b.card("FORMULA", t`Second solution of $\sin x = k$ in $0°$ to $360°$`, t`$180° - \alpha$ (in radians $\pi - \alpha$)`);
  b.card("FORMULA", t`Second solution of $\cos x = k$ in $0°$ to $360°$`, t`$360° - \alpha$ (in radians $2\pi - \alpha$)`);
  b.card("FORMULA", t`Second solution of $\tan x = k$ in $0°$ to $360°$`, t`$\alpha + 180°$ (in radians $\alpha + \pi$)`);
  b.card("DEFINITION", "Principal value", t`The calculator's value: $\sin^{-1}$ and $\tan^{-1}$ in $[-90°, 90°]$, $\cos^{-1}$ in $[0°, 180°]$.`);
  b.card("CONCEPT", "Multiple angle such as sin 2x", t`Let $u = 2x$, double the interval, solve for $u$, then halve each answer.`);
  b.card("CONCEPT", t`Compound angle such as $\cos(x - 20°)$`, "Let u be the whole bracket and shift the interval in the same way; check negative values of u.");
  b.card("CONCEPT", t`$a\sin x = b\cos x$`, t`Divide by $a\cos x$: $\tan x = \frac{b}{a}$.`);
  b.card("CONCEPT", "Common factor such as cos x", "Factorise and set each factor to zero; never divide by it, or solutions are lost.");
  b.card("FACT", t`$\sin x = k$ or $\cos x = k$ with $|k| > 1$`, "No solutions, since sine and cosine lie between −1 and 1.");
});
