// W2b exam-format items: ZIMSEC Paper 1 (Section A 13 marks, Section B 12 marks) and Cambridge 0606 Paper 1 (8 marks,
// no calculator) and Paper 2 (10 marks), on trigonometry, sequences and series. Every value is computed and checked.
import { concept, P, t, chk, same, solveTrig, gp, ap, nCr, binomialCoeffs, quad, rnd, sf, dpFor, halfUnit, sec, cosec, cot, money, ZIM, CAM } from "../lib.mjs";

const Q = (k) => `amath.${k}`;
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
const A1 = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(rnd(x, 1))], tolerance: 0.05, wrong, ...(marks ? { marks } : {}) });
const XS = [0.3, 0.9, 1.2, 2.0, 2.7, 4.0, 5.5];
const ident = (f, g, label) => XS.forEach((x) => chk(f(x), g(x), 1e-9, `${label} at ${x}`));
const { sin, cos, tan } = Math;

// =====================================================================================================================
concept(Q("trig.six-ratios"), { file: "exam/w2b-zimsec", keyPrefix: "exam.w2b-zimsec", applies: ZIM }, (b) => {
  // Z1 (13, P1 Section A): tan θ = -7/24, fourth quadrant
  const th = 2 * Math.PI - Math.atan(7 / 24);
  chk(tan(th), -7 / 24); chk(sin(th), -7 / 25); chk(cos(th), 24 / 25);
  chk(sec(th) + cosec(th), -425 / 168);
  ident((x) => (sin(x) + cos(x)) ** 2 + (sin(x) - cos(x)) ** 2, () => 2, "Z1c");
  same(solveTrig({ fn: "sin", k: 0.5, lo: 0, hi: 360 }), [30, 150]); same(solveTrig({ fn: "sin", k: -1, lo: 0, hi: 360 }), [270]);
  for (const x of [30, 150, 270]) chk(2 * Math.cos((x * Math.PI) / 180) ** 2 - Math.sin((x * Math.PI) / 180) - 1, 0, 1e-12);
  chk(solveTrig({ fn: "sin", k: 0.5, lo: 0, hi: 720 }).length + solveTrig({ fn: "sin", k: -1, lo: 0, hi: 720 }).length, 6);
  b.struct({
    d: 4, marks: 13, secs: 90 * 13, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("trig.six-ratios"), Q("trig.identities"), Q("trig.equations-identities"), Q("trig.equations")],
    stem: t`This question is about trigonometric ratios, an identity and an equation.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Given that $\tan\theta = -\dfrac{7}{24}$ and $270° < \theta < 360°$, find the exact values of $\sin\theta$ and $\cos\theta$. Type fractions, e.g. -3/5.`, template: "sin θ = {{blank:s}}, cos θ = {{blank:c}}",
        blanks: [N("s", "-7/25", "7/25"), N("c", "24/25", "-24/25")],
        explanation: t`Triangle with sides 7 and 24 has hypotenuse $\sqrt{49 + 576} = 25$. In the fourth quadrant sine is negative and cosine positive: $\sin\theta = -\frac{7}{25}$, $\cos\theta = \frac{24}{25}$.` }),
      P.num({ label: "(b)", marks: 2, stem: t`Hence find the exact value of $\sec\theta + \operatorname{cosec}\theta$, as a fraction.`, value: -425 / 168, wrong: [425 / 168, 25 / 24 + 25 / 7],
        explanation: t`$\sec\theta = \frac{25}{24}$, $\operatorname{cosec}\theta = -\frac{25}{7}$: $\frac{25}{24} - \frac{25}{7} = \frac{175 - 600}{168} = -\frac{425}{168}$.` }),
      P.proof({ label: "(c)", marks: 3, stem: t`Prove that $(\sin x + \cos x)^2 + (\sin x - \cos x)^2 \equiv 2$.`,
        points: [t`M1 expands both squares: $\sin^2 x + 2\sin x\cos x + \cos^2 x$ and $\sin^2 x - 2\sin x\cos x + \cos^2 x$.`, t`M1 adds so the $2\sin x\cos x$ terms cancel: $2\sin^2 x + 2\cos^2 x$.`, t`A1 uses $\sin^2 x + \cos^2 x = 1$ to reach 2.`],
        modelAnswer: t`$$
\text{LHS} = (\sin^2 x + 2\sin x\cos x + \cos^2 x) + (\sin^2 x - 2\sin x\cos x + \cos^2 x)
$$

$$
= 2\sin^2 x + 2\cos^2 x = 2(\sin^2 x + \cos^2 x) = 2 = \text{RHS}
$$`,
        explanation: "The cross terms cancel; the rest is twice the basic identity." }),
      P.fib({ label: "(d)", marks: 4, stem: t`Solve $2\cos^2 x - \sin x - 1 = 0$ for $0° \leq x \leq 360°$, giving the solutions in ascending order.`, template: "x = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°",
        blanks: [N("a", 30, "210", 1), N("b", 150, "330", 1), N("c", 270, "90", 2)],
        explanation: t`$2(1 - \sin^2 x) - \sin x - 1 = 0$ gives $2\sin^2 x + \sin x - 1 = 0$, so $(2\sin x - 1)(\sin x + 1) = 0$. $\sin x = \frac{1}{2}$: $30°, 150°$. $\sin x = -1$: $270°$.` }),
      P.num({ label: "(e)", marks: 2, stem: t`State the number of solutions of $2\cos^2 x - \sin x - 1 = 0$ for $0° \leq x \leq 720°$.`, value: 6, wrong: [3, 5],
        explanation: "The interval covers two full cycles, and each cycle contains three solutions: 6." }),
    ],
    explanation: "Use the related-angle triangle with CAST signs, the Pythagorean identity, and a quadratic in sin x.",
    hints: ["Fourth quadrant: only cos and sec are positive.", t`Replace $\cos^2 x$ by $1 - \sin^2 x$ in (d).`],
  });

  // Z2 (13, P1 Section A): sigma, AP, GP, recurrence
  let s12 = 0;
  for (let r = 1; r <= 12; r++) s12 += 5 * r - 2;
  chk(s12, 366);
  chk(ap.nth(7, 4, 2), 11); chk(ap.sum(7, 4, 8), 168);
  chk(1 - 48 / 64, 0.25); chk(gp.sum(48, 0.25, 4), 63.75);
  const rec = [48];
  for (let i = 0; i < 60; i++) rec.push(0.25 * rec[i] + 48);
  chk(rec[60], 64, 1e-9);
  b.struct({
    d: 4, marks: 13, secs: 90 * 13, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("series.sigma-notation"), Q("series.arithmetic"), Q("series.sum-to-infinity"), Q("series.geometric"), Q("sequences.behaviour")],
    stem: "This question is about sequences and series.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: t`Evaluate $\displaystyle\sum_{r=1}^{12} (5r - 2)$.`, value: 366, wrong: [388, 58],
        explanation: t`$5 \times \frac{12 \times 13}{2} - 2 \times 12 = 390 - 24 = 366$.` }),
      P.fib({ label: "(b)", marks: 3, stem: "An arithmetic progression has second term 11, and the sum of its first 8 terms is 168. Find the first term and the common difference.", template: "a = {{blank:a}}, d = {{blank:d}}",
        blanks: [N("a", 7, "11"), N("d", 4, "3")],
        explanation: t`$a + d = 11$ and $4(2a + 7d) = 168$, so $2a + 7d = 42$. With $2a + 2d = 22$: $5d = 20$, $d = 4$, $a = 7$.` }),
      P.num({ label: "(c)", marks: 2, stem: "A geometric progression has first term 48 and sum to infinity 64. Find its common ratio.", value: 0.25, wrong: [0.75, 4],
        explanation: t`$\frac{48}{1 - r} = 64$ gives $1 - r = 0.75$, so $r = 0.25$.` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the sum of the first 4 terms of this geometric progression.", value: 63.75, dp: 2, wrong: [64, 63],
        explanation: t`$48 + 12 + 3 + 0.75 = 63.75$ (or $64\left(1 - 0.25^4\right) = 63.75$).` }),
      P.num({ label: "(e)", marks: 2, stem: t`A sequence is defined by $u_1 = 48$ and $u_{n+1} = 0.25u_n + 48$. Given that it converges, find its limit.`, value: 64, wrong: [48, 192],
        explanation: t`$L = 0.25L + 48$ gives $0.75L = 48$ and $L = 64$.` }),
      P.manual({ label: "(f)", marks: 2, stem: "Describe the behaviour of the sequence in part (e), giving a reason.",
        points: [t`States that it is increasing: $48, 60, 63, 63.75, \ldots$ (each term larger than the one before).`, "States that it converges to 64 (the gaps shrink by a factor of 0.25)."],
        modelAnswer: t`The terms are $48, 60, 63, 63.75, \ldots$: the sequence is increasing and convergent, approaching the limit 64 because each gap is a quarter of the previous one.`,
        explanation: "Work out a few terms to see the behaviour." }),
    ],
    explanation: "Each part uses one standard result: Σr = n(n + 1)/2, the AP sum, S∞ = a/(1 − r), the GP sum and L = f(L).",
    hints: [t`$\sum_{r=1}^{12} r = 78$.`, t`For (b), $S_8 = 4(2a + 7d)$.`, t`For (e), put $u_{n+1} = u_n = L$.`],
  });

  // Z3 (12, P1 Section B): f(x) = 3cos2x + 1, 0..180
  const f3 = (x) => 3 * Math.cos((2 * x * Math.PI) / 180) + 1;
  chk(f3(0), 4); chk(f3(90), -2); chk(f3(180), 4);
  const z3 = solveTrig({ fn: "cos", k: -1 / 3, a: 2, lo: 0, hi: 180 });
  chk(solveTrig({ fn: "cos", k: 2 / 3, a: 2, lo: 0, hi: 180 }).length, 2);
  b.struct({
    d: 4, marks: 12, secs: 90 * 12, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("trig.graphs"), Q("trig.equations")],
    stem: t`The function $f$ is defined by $f(x) = 3\cos 2x + 1$ for $0° \leq x \leq 180°$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`State the amplitude and the period of $f$.`, template: "amplitude {{blank:a}}, period {{blank:p}}°",
        blanks: [N("a", 3, "4"), N("p", 180, "720")],
        explanation: t`Amplitude 3; period $\frac{360°}{2} = 180°$.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`State the maximum and minimum values of $f(x)$.`, template: "maximum {{blank:mx}}, minimum {{blank:mn}}",
        blanks: [N("mx", 4, "3"), N("mn", -2, "-3")],
        explanation: t`Maximum $1 + 3 = 4$; minimum $1 - 3 = -2$.` }),
      P.manual({ label: "(c)", marks: 3, stem: t`Describe the sketch of $y = f(x)$ for $0° \leq x \leq 180°$, giving the coordinates of the end points and of the minimum point.`,
        points: [t`One complete cosine wave starting and ending at maxima $(0°, 4)$ and $(180°, 4)$.`, t`Minimum point at $(90°, -2)$.`, "Crosses the x-axis twice, once either side of the minimum (between 45° and 90°, and between 90° and 135°)."],
        modelAnswer: t`A single cosine wave: it starts at the maximum $(0°, 4)$, falls through the $x$-axis near $x = 55°$ to the minimum $(90°, -2)$, rises through the $x$-axis near $x = 125°$ and ends at the maximum $(180°, 4)$.`,
        explanation: "The interval is exactly one period." }),
      P.fib({ label: "(d)", marks: 3, stem: t`Hence solve $3\cos 2x + 1 = 0$ for $0° \leq x \leq 180°$, giving your answers correct to 1 decimal place in ascending order.`, template: "x = {{blank:a}}° or x = {{blank:b}}°",
        blanks: [A1("a", z3[0], "109.5", 1), A1("b", z3[1], "35.3", 2)],
        explanation: t`$\cos 2x = -\frac{1}{3}$: $2x = 109.47°$ or $360° - 109.47° = 250.53°$. So $x = 54.7°$ or $x = 125.3°$.` }),
      P.num({ label: "(e)", marks: 2, stem: t`State the number of solutions of $f(x) = 3$ for $0° \leq x \leq 180°$.`, value: 2, wrong: [1, 4],
        explanation: "The line y = 3 lies between −2 and 4, so it meets the single wave twice." }),
    ],
    explanation: "Read amplitude, period, maximum and minimum from a, b and c; use the sketch to count solutions.",
    hints: [t`Let $u = 2x$ with $0° \leq u \leq 360°$ in (d).`, "A horizontal line between the minimum and maximum meets one full wave twice."],
  });

  // Z4 (12, P1 Section B): identity and equation via cot
  ident((x) => (1 + tan(x) ** 2) / (1 + cot(x) ** 2), (x) => tan(x) ** 2, "Z4a");
  ident((x) => cosec(x) ** 2 - 3 * cot(x) + 1, (x) => cot(x) ** 2 - 3 * cot(x) + 2, "Z4b");
  same(quad.roots(1, -3, 2), [1, 2]);
  const z4 = [...solveTrig({ fn: "cot", k: 1, lo: 0, hi: 360 }), ...solveTrig({ fn: "cot", k: 2, lo: 0, hi: 360 })].sort((p, q) => p - q);
  same(z4.map((x) => Math.round(x * 10) / 10), [26.6, 45, 206.6, 225]);
  chk(Math.tan(Math.PI / 3) ** 2, 3, 1e-12);
  b.struct({
    d: 5, marks: 12, secs: 90 * 12, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("trig.identities"), Q("trig.equations-identities")],
    stem: "This question is about identities involving the reciprocal functions.",
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Prove that $\dfrac{1 + \tan^2\theta}{1 + \cot^2\theta} \equiv \tan^2\theta$.`,
        points: [t`M1 uses $1 + \tan^2\theta = \sec^2\theta$ and $1 + \cot^2\theta = \operatorname{cosec}^2\theta$.`, t`M1 writes $\frac{\sec^2\theta}{\operatorname{cosec}^2\theta} = \frac{\sin^2\theta}{\cos^2\theta}$.`, t`A1 concludes $= \tan^2\theta$.`],
        modelAnswer: t`$$
\frac{1 + \tan^2\theta}{1 + \cot^2\theta} = \frac{\sec^2\theta}{\operatorname{cosec}^2\theta} = \frac{1/\cos^2\theta}{1/\sin^2\theta}
$$

$$
= \frac{\sin^2\theta}{\cos^2\theta} = \tan^2\theta
$$`,
        explanation: "Both brackets are Pythagorean identities." }),
      P.num({ label: "(b)", marks: 1, stem: t`Hence write down the value of $\dfrac{1 + \tan^2\theta}{1 + \cot^2\theta}$ when $\theta = \dfrac{\pi}{3}$.`, value: 3, wrong: [Math.sqrt(3), 1 / 3],
        explanation: t`$\tan^2\frac{\pi}{3} = (\sqrt{3})^2 = 3$.` }),
      P.proof({ label: "(c)", marks: 2, stem: t`Show that the equation $\operatorname{cosec}^2\theta = 3\cot\theta - 1$ can be written as $\cot^2\theta - 3\cot\theta + 2 = 0$.`,
        points: [t`M1 replaces $\operatorname{cosec}^2\theta$ by $1 + \cot^2\theta$.`, "A1 rearranges to the given quadratic."],
        modelAnswer: t`$$
1 + \cot^2\theta = 3\cot\theta - 1 \Rightarrow \cot^2\theta - 3\cot\theta + 2 = 0
$$`,
        explanation: "cot θ appears unsquared, so replace cosec² θ." }),
      P.fib({ label: "(d)", marks: 2, stem: t`Find the two values of $\cot\theta$, in ascending order.`, template: "cot θ = {{blank:a}} or cot θ = {{blank:b}}",
        blanks: [N("a", 1, "-1"), N("b", 2, "-2")],
        explanation: t`$(\cot\theta - 1)(\cot\theta - 2) = 0$.` }),
      P.fib({ label: "(e)", marks: 4, stem: t`Hence solve $\operatorname{cosec}^2\theta = 3\cot\theta - 1$ for $0° < \theta < 360°$, giving your answers in ascending order, to 1 decimal place where necessary.`, template: "θ = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°, {{blank:d}}°",
        blanks: [A1("a", z4[0], "63.4"), N("b", 45, "135"), A1("c", z4[2], "243.4"), N("d", 225, "315")],
        explanation: t`$\cot\theta = 1$: $\tan\theta = 1$, $\theta = 45°, 225°$. $\cot\theta = 2$: $\tan\theta = \frac{1}{2}$, $\theta = 26.6°, 206.6°$.` }),
    ],
    explanation: "Replace squared reciprocal functions with the Pythagorean identities, then solve a quadratic in cot θ and convert to tan θ.",
    hints: [t`$1 + \cot^2\theta = \operatorname{cosec}^2\theta$.`, t`$\cot\theta = 2$ means $\tan\theta = \frac{1}{2}$.`],
  });

  // Z5 (12, P1 Section B): borehole costs, AP versus GP
  chk(ap.nth(50, 4, 20), 126); chk(ap.sum(50, 4, 20), 1760);
  chk(ap.sum(50, 4, 39), 4914); chk(ap.sum(50, 4, 40), 5120);
  const g20 = gp.sum(80, 1.03, 20);
  const diff30 = gp.sum(80, 1.03, 30) - ap.sum(50, 4, 30);
  chk(ap.sum(50, 4, 30), 3240);
  b.struct({
    d: 5, marks: 12, secs: 90 * 12, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("series.arithmetic"), Q("series.geometric")],
    stem: t`Company A drills boreholes near Chivhu. It charges ${money(50)} for the first metre, and each further metre costs ${money(4)} more than the one before. Company B charges ${money(80)} for the first metre, and each further metre costs 3% more than the one before. Give money answers in US dollars.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find Company A's charge for the 20th metre.", value: 126, wrong: [130],
        explanation: t`$50 + 19 \times 4 = 126$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find Company A's total charge for a borehole 20 metres deep.", value: 1760, wrong: [2520],
        explanation: t`$S_{20} = \frac{20}{2}(50 + 126) = 1760$.` }),
      P.num({ label: "(c)", marks: 3, stem: t`A farmer has ${money(5000)}. Find the greatest whole number of metres Company A can drill for this amount.`, value: 39, wrong: [40, 62],
        explanation: t`$\frac{n}{2}\{100 + 4(n - 1)\} \leq 5000$ gives $n^2 + 24n - 2500 \leq 0$, so $n \leq 39.4$. Check: $S_{39} = 4914$, $S_{40} = 5120$. So 39 metres.` }),
      P.num({ label: "(d)", marks: 2, stem: "Find Company B's total charge for a borehole 20 metres deep, correct to the nearest dollar.", value: g20, dp: 0, wrong: [80 * 1.03 ** 19, 1600],
        explanation: t`$S_{20} = \frac{80(1.03^{20} - 1)}{0.03} = 2149.63$, so about ${money(2150)}.` }),
      P.num({ label: "(e)", marks: 2, stem: "For a borehole 30 metres deep, find how much more Company B charges than Company A, correct to the nearest dollar.", value: diff30, dp: 0, wrong: [3806, 3240],
        explanation: t`A: $15(100 + 116) = 3240$. B: $\frac{80(1.03^{30} - 1)}{0.03} = 3806.03$. Difference about ${money(566)}.` }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why, for very deep boreholes, the cost per metre with Company B eventually becomes far greater than with Company A.",
        points: ["States that A's charge per metre grows by a fixed amount (arithmetic, linear growth).", "States that B's charge per metre is multiplied by 1.03 each time (geometric, exponential growth), which eventually exceeds any linear growth."],
        modelAnswer: t`Company A adds ${money(4)} per metre, so its charges grow linearly. Company B multiplies by 1.03 each metre, so its charges grow geometrically; however small the percentage, geometric growth eventually overtakes and leaves behind any fixed increase.`,
        explanation: "Compare adding a constant with multiplying by a constant." }),
    ],
    explanation: "Company A's charges form an arithmetic progression and Company B's a geometric progression; use the appropriate nth-term and sum formulas.",
    hints: [t`Company A: $a = 50$, $d = 4$. Company B: $a = 80$, $r = 1.03$.`, "In (c), solve the quadratic inequality and check the whole numbers either side."],
  });
});

// =====================================================================================================================
concept(Q("trig.six-ratios"), { file: "exam/w2b-cambridge", keyPrefix: "exam.w2b-cambridge", applies: CAM }, (b) => {
  // C1 (8, P1): sin θ = -√7/4, third quadrant
  const th = Math.PI + Math.asin(Math.sqrt(7) / 4);
  chk(sin(th), -Math.sqrt(7) / 4); chk(cos(th), -0.75); chk(tan(th), Math.sqrt(7) / 3);
  ident((x) => cosec(x) - sin(x), (x) => cos(x) * cot(x), "C1c");
  chk(cosec(th) - sin(th), (-9 * Math.sqrt(7)) / 28);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("trig.six-ratios"), Q("trig.identities")],
    stem: t`It is given that $\sin\theta = -\dfrac{\sqrt{7}}{4}$ and $180° < \theta < 270°$. Do not use a calculator.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: t`Find the exact value of $\cos\theta$.`, value: -0.75, wrong: [0.75],
        explanation: t`Third side $\sqrt{16 - 7} = 3$; cosine is negative in the third quadrant: $\cos\theta = -\frac{3}{4}$.` }),
      P.expr({ label: "(b)", marks: 2, stem: t`Find the exact value of $\tan\theta$. Type a surd, e.g. √5/2.`, accepted: ["√7/3", "(√7)/3", "(1/3)√7", "√7÷3"], wrong: ["-√7/3", "3/√7"],
        explanation: t`$\tan\theta = \frac{\sin\theta}{\cos\theta} = \frac{-\sqrt{7}/4}{-3/4} = \frac{\sqrt{7}}{3}$, positive in the third quadrant.` }),
      P.proof({ label: "(c)", marks: 3, stem: t`Prove that $\operatorname{cosec} x - \sin x \equiv \cos x\cot x$.`,
        points: [t`M1 writes $\frac{1}{\sin x} - \sin x = \frac{1 - \sin^2 x}{\sin x}$.`, t`M1 uses $1 - \sin^2 x = \cos^2 x$.`, t`A1 splits $\frac{\cos^2 x}{\sin x} = \cos x \cdot \frac{\cos x}{\sin x} = \cos x\cot x$.`],
        modelAnswer: t`$$
\operatorname{cosec} x - \sin x = \frac{1}{\sin x} - \sin x = \frac{1 - \sin^2 x}{\sin x}
$$

$$
= \frac{\cos^2 x}{\sin x} = \cos x \cdot \frac{\cos x}{\sin x} = \cos x\cot x
$$`,
        explanation: "Combine into one fraction and use the Pythagorean identity." }),
      P.expr({ label: "(d)", marks: 2, stem: t`Hence find the exact value of $\operatorname{cosec}\theta - \sin\theta$, in the form $\dfrac{a\sqrt{7}}{b}$. Type it, e.g. -5√7/14.`, accepted: ["-9√7/28", "-(9√7)/28", "-9/(4√7)", "-(9/28)√7", "-9√7÷28"], wrong: ["9√7/28", "-23√7/28"],
        explanation: t`$\cos\theta\cot\theta = \left(-\frac{3}{4}\right)\left(\frac{3}{\sqrt{7}}\right) = -\frac{9}{4\sqrt{7}} = -\frac{9\sqrt{7}}{28}$.` }),
    ],
    explanation: "Draw the related-angle triangle, attach the third-quadrant signs, then use the identity to evaluate.",
    hints: ["In the third quadrant only tan and cot are positive.", t`$\cot\theta = \frac{1}{\tan\theta} = \frac{3}{\sqrt{7}}$.`],
  });

  // C2 (8, P1): binomial
  same(binomialCoeffs(2, -0.25, 8).slice(0, 3), [256, -256, 112]);
  chk(3 * 112 + 2 * -256, -176);
  chk(nCr(6, 2) * 2 ** 2, 60);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("series.binomial-expansion"), Q("series.binomial-terms")],
    stem: "This question is about binomial expansions. Do not use a calculator.",
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Find the first three terms, in ascending powers of $x$, of $\left(2 - \dfrac{x}{4}\right)^8$, in the form $p + qx + rx^2$.`, template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}",
        blanks: [N("p", 256, "2"), N("q", -256, "256"), N("r", 112, "448")],
        explanation: t`$2^8 = 256$; $\binom{8}{1}2^7\left(-\frac{x}{4}\right) = -256x$; $\binom{8}{2}2^6\left(\frac{x^2}{16}\right) = 28 \times 4x^2 = 112x^2$.` }),
      P.num({ label: "(b)", marks: 2, stem: t`Hence find the coefficient of $x^2$ in the expansion of $(3 + 2x)\left(2 - \dfrac{x}{4}\right)^8$.`, value: -176, wrong: [336, 848],
        explanation: t`$3 \times 112 + 2 \times (-256) = 336 - 512 = -176$.` }),
      P.num({ label: "(c)", marks: 3, stem: t`Find the term independent of $x$ in the expansion of $\left(x + \dfrac{2}{x^2}\right)^6$.`, value: 60, wrong: [15, 240],
        explanation: t`$T_{r+1} = \binom{6}{r}x^{6-r}\left(\frac{2}{x^2}\right)^r = \binom{6}{r}2^r x^{6-3r}$. $r = 2$: $15 \times 4 = 60$.` }),
    ],
    explanation: "Bracket each term of the binomial carefully; for the constant term, set the power of x in the general term to 0.",
    hints: [t`$\left(-\frac{x}{4}\right)^2 = \frac{x^2}{16}$.`, t`$\left(\frac{2}{x^2}\right)^r = 2^r x^{-2r}$.`],
  });

  // C3 (8, P1): GP k, k + 4, k + 16 -> k = 2; AP
  chk((2 + 4) ** 2, 2 * (2 + 16));
  chk(gp.sum(2, 3, 6), 728);
  chk(ap.nth(2, 4, 5), 18); chk(ap.sum(2, 4, 10), 200);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("series.geometric"), Q("series.arithmetic")],
    stem: t`The first three terms of a geometric progression are $k$, $k + 4$ and $k + 16$, where $k$ is a positive constant.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $k = 2$.`,
        points: [t`M1 uses $(k + 4)^2 = k(k + 16)$.`, t`A1 expands to $k^2 + 8k + 16 = k^2 + 16k$, so $8k = 16$ and $k = 2$.`],
        modelAnswer: t`$$
\frac{k + 4}{k} = \frac{k + 16}{k + 4} \Rightarrow (k + 4)^2 = k(k + 16)
$$

$$
k^2 + 8k + 16 = k^2 + 16k \Rightarrow 8k = 16 \Rightarrow k = 2
$$`,
        explanation: "Equal ratios of consecutive terms." }),
      P.num({ label: "(b)", marks: 1, stem: "Find the common ratio.", value: 3, wrong: [4],
        explanation: t`The terms are $2, 6, 18$, so $r = 3$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the sum of the first 6 terms of the geometric progression.", value: 728, wrong: [486, 1456],
        explanation: t`$S_6 = \frac{2(3^6 - 1)}{3 - 1} = 728$.` }),
      P.num({ label: "(d)", marks: 1, stem: "An arithmetic progression has the same first term as the geometric progression, and its 5th term equals the 3rd term of the geometric progression. Find its common difference.", value: 4, wrong: [16 / 5],
        explanation: t`$2 + 4d = 18$, so $d = 4$.` }),
      P.num({ label: "(e)", marks: 2, stem: "Find the sum of the first 10 terms of this arithmetic progression.", value: 200, wrong: [400, 38],
        explanation: t`$S_{10} = 5(4 + 36) = 200$.` }),
    ],
    explanation: "Use equal ratios to find k, then the GP and AP formulas.",
    hints: [t`For a GP, (middle)$^2$ = first × third.`, t`The AP has $a = 2$ and $a + 4d = 18$.`],
  });

  // C4 (8, P1): exact trig equations
  same(solveTrig({ fn: "cos", k: -Math.sqrt(3) / 2, b: 30, lo: 0, hi: 360 }), [120, 180]);
  const c4 = solveTrig({ fn: "sin", k: 0.5, lo: 0, hi: Math.PI, unit: "rad" }).map((x) => Math.round((x / Math.PI) * 6));
  same(c4, [1, 5]);
  for (const y of [Math.PI / 6, (5 * Math.PI) / 6]) chk(4 * cos(y) ** 2 + 4 * sin(y) - 5, 0, 1e-12);
  chk(solveTrig({ fn: "sin", k: 0.5, lo: 0, hi: 4 * Math.PI, unit: "rad" }).length, 4);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("trig.equations"), Q("trig.equations-identities")],
    stem: "Solve these equations without using a calculator.",
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Solve $2\cos(x + 30°) = -\sqrt{3}$ for $0° \leq x \leq 360°$, in ascending order.`, template: "x = {{blank:a}}° or x = {{blank:b}}°",
        blanks: [N("a", 120, "150", 1), N("b", 180, "210", 2)],
        explanation: t`$\cos u = -\frac{\sqrt{3}}{2}$ with $u = x + 30°$ and $30° \leq u \leq 390°$: $u = 150°$ or $210°$, so $x = 120°$ or $180°$.` }),
      P.fib({ label: "(b)", marks: 3, stem: t`Solve $4\cos^2 y + 4\sin y - 5 = 0$ for $0 \leq y \leq \pi$. The solutions can be written as $y = \frac{k\pi}{6}$; give the values of $k$ in ascending order.`, template: "k = {{blank:a}} or k = {{blank:b}}",
        blanks: [N("a", 1, "2"), N("b", 5, "4")],
        explanation: t`$4(1 - \sin^2 y) + 4\sin y - 5 = 0$ gives $4\sin^2 y - 4\sin y + 1 = 0$, i.e. $(2\sin y - 1)^2 = 0$. So $\sin y = \frac{1}{2}$: $y = \frac{\pi}{6}$ or $\frac{5\pi}{6}$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`State the number of solutions of $4\cos^2 y + 4\sin y - 5 = 0$ for $0 \leq y \leq 4\pi$.`, value: 4, wrong: [2, 8],
        explanation: t`$\sin y = \frac{1}{2}$ has two solutions in each interval of length $2\pi$, so 4 in $0$ to $4\pi$.` }),
    ],
    explanation: "Transform the interval for compound angles; use cos² y = 1 − sin² y to get a quadratic in sin y.",
    hints: [t`In (a) the interval for $u = x + 30°$ runs from $30°$ to $390°$.`, t`In (b) the quadratic is a perfect square.`],
  });

  // C5 (10, P2): f(x) = 2 + 5 sin 3x, 0..120
  const f5 = (x) => 2 + 5 * Math.sin((3 * x * Math.PI) / 180);
  chk(f5(30), 7); chk(f5(90), -3); chk(f5(0), 2); chk(f5(120), 2, 1e-12);
  const c5 = solveTrig({ fn: "sin", k: 0.4, a: 3, lo: 0, hi: 120 });
  chk(c5.length, 2);
  b.struct({
    d: 4, marks: 10, secs: 90 * 10, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("trig.graphs"), Q("trig.equations")],
    stem: t`The function $f$ is defined by $f(x) = 2 + 5\sin 3x$ for $0° \leq x \leq 120°$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`State the amplitude and the period of $f$.`, template: "amplitude {{blank:a}}, period {{blank:p}}°",
        blanks: [N("a", 5, "2"), N("p", 120, "1080")],
        explanation: t`Amplitude 5; period $\frac{360°}{3} = 120°$.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`State the maximum and minimum values of $f(x)$.`, template: "maximum {{blank:mx}}, minimum {{blank:mn}}",
        blanks: [N("mx", 7, "5"), N("mn", -3, "-5")],
        explanation: t`$2 + 5 = 7$ and $2 - 5 = -3$.` }),
      P.fib({ label: "(c)", marks: 3, stem: t`Solve $f(x) = 4$, giving your answers correct to 1 decimal place in ascending order.`, template: "x = {{blank:a}}° or x = {{blank:b}}°",
        blanks: [A1("a", c5[0], "23.6", 1), A1("b", c5[1], "37.9", 2)],
        explanation: t`$\sin 3x = 0.4$ with $0° \leq 3x \leq 360°$: $3x = 23.58°$ or $156.42°$, so $x = 7.9°$ or $x = 52.1°$.` }),
      P.manual({ label: "(d)", marks: 3, stem: t`Describe the graph of $y = f(x)$, stating the coordinates of its maximum and minimum points and of its end points.`,
        points: [t`One complete sine wave, starting at $(0°, 2)$ and ending at $(120°, 2)$.`, t`Maximum point $(30°, 7)$.`, t`Minimum point $(90°, -3)$, with the curve crossing $y = 2$ again at $x = 60°$.`],
        modelAnswer: t`A single sine wave about the centre line $y = 2$: it starts at $(0°, 2)$, rises to the maximum $(30°, 7)$, falls through $(60°, 2)$ to the minimum $(90°, -3)$, and rises to end at $(120°, 2)$.`,
        explanation: "The interval is exactly one period." }),
    ],
    explanation: "Amplitude a, period 360°/b, maximum c + a, minimum c − a; for the equation, transform the interval for 3x.",
    hints: [t`Let $u = 3x$, so $0° \leq u \leq 360°$.`, "Sine starts on its centre line, going up."],
  });

  // C6 (10, P2): GP 120, 0.8
  chk(gp.sumInf(120, 0.8), 600, 1e-9);
  const s10 = gp.sum(120, 0.8, 10);
  const nC6 = (() => { for (let n = 1; n < 100; n++) if (gp.sum(120, 0.8, n) > 590) return n; })();
  chk(nC6, 19);
  for (const n of [1, 5, 12]) chk(gp.sumInf(120, 0.8) - gp.sum(120, 0.8, n), 600 * 0.8 ** n, 1e-9);
  b.struct({
    d: 4, marks: 10, secs: 90 * 10, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("series.sum-to-infinity"), Q("series.geometric")],
    stem: "A mine extracts 120 tonnes of ore in its first month. In each later month it extracts 80% of the amount extracted in the month before.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the total amount the mine could ever extract, according to this model.", value: 600, wrong: [150, 96],
        explanation: t`$S_\infty = \frac{120}{1 - 0.8} = 600$ tonnes.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the total extracted in the first 10 months, in tonnes correct to 3 significant figures.", value: s10, wrong: [600 * 0.8 ** 10, 1200],
        explanation: t`$S_{10} = \frac{120(1 - 0.8^{10})}{0.2} = 600(1 - 0.107) = 535.6$, about 536 tonnes.` }),
      P.proof({ label: "(c)", marks: 2, stem: t`Show that the amount still to be extracted after $n$ months is $600 \times 0.8^n$ tonnes.`,
        points: [t`M1 writes $S_\infty - S_n = 600 - 600(1 - 0.8^n)$ using $S_n = \frac{120(1 - 0.8^n)}{0.2}$.`, t`A1 simplifies to $600 \times 0.8^n$.`],
        modelAnswer: t`$$
S_n = \frac{120(1 - 0.8^n)}{1 - 0.8} = 600(1 - 0.8^n)
$$

$$
S_\infty - S_n = 600 - 600(1 - 0.8^n) = 600 \times 0.8^n
$$`,
        explanation: "The remainder is the sum to infinity minus the partial sum." }),
      P.num({ label: "(d)", marks: 3, stem: "Find the least number of months after which the total extracted exceeds 590 tonnes.", value: nC6, wrong: [18, 20],
        explanation: t`$600 \times 0.8^n < 10$ gives $0.8^n < \frac{1}{60}$, so $n > \frac{\ln 60}{\ln 1.25} = 18.3$. Least $n = 19$ months.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why, according to the model, the total extracted never reaches 600 tonnes.",
        points: [t`States that the amount remaining is $600 \times 0.8^n$, which is positive for every $n$.`, "Concludes that the partial sums approach 600 but are always less than it."],
        modelAnswer: t`After $n$ months the amount still in the ground is $600 \times 0.8^n$, which is never zero (a positive number times a positive power). So the total extracted, $600 - 600 \times 0.8^n$, approaches 600 but never reaches it.`,
        explanation: "A convergent series approaches its sum to infinity without reaching it." }),
    ],
    explanation: "The monthly amounts form a geometric progression with r = 0.8; |r| < 1, so the totals converge to the sum to infinity.",
    hints: [t`$S_\infty = \frac{a}{1 - r}$.`, "Dividing by ln 0.8 (negative) reverses an inequality."],
  });

  // C7 (10, P2): (1 + kx)^n with coefficients 20 and 150 -> n = 4, k = 5
  chk(4 * 5, 20); chk(nCr(4, 2) * 25, 150);
  chk(nCr(4, 3) * 125, 500); chk(2 * 150 - 20, 280);
  const est = 1 + 20 * 0.01 + 150 * 0.0001;
  chk(est, 1.215);
  b.struct({
    d: 5, marks: 10, secs: 90 * 10, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("series.binomial-terms"), Q("series.binomial-expansion")],
    stem: t`In the expansion of $(1 + kx)^n$, where $n$ is a positive integer and $k$ is a constant, the coefficient of $x$ is 20 and the coefficient of $x^2$ is 150.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $n = 4$.`,
        points: [t`M1 writes $nk = 20$ and $\frac{n(n - 1)}{2}k^2 = 150$.`, t`M1 eliminates $k$, e.g. $\frac{(nk)^2(n - 1)}{2n} = 150$, so $\frac{400(n - 1)}{2n} = 150$.`, t`A1 solves $200(n - 1) = 150n$ to get $n = 4$.`],
        modelAnswer: t`$$
nk = 20, \qquad \frac{n(n - 1)}{2}k^2 = 150
$$

$$
\frac{(nk)^2(n - 1)}{2n} = 150 \Rightarrow \frac{400(n - 1)}{2n} = 150
$$

$$
200(n - 1) = 150n \Rightarrow 50n = 200 \Rightarrow n = 4
$$`,
        explanation: "Square the first equation to eliminate k." }),
      P.num({ label: "(b)", marks: 1, stem: t`Find $k$.`, value: 5, prefix: "k =", wrong: [80],
        explanation: t`$4k = 20$, so $k = 5$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Find the coefficient of $x^3$.`, value: 500, wrong: [125, 750],
        explanation: t`$\binom{4}{3}(5)^3 = 4 \times 125 = 500$.` }),
      P.num({ label: "(d)", marks: 2, stem: t`Find the coefficient of $x^2$ in the expansion of $(2 - x)(1 + kx)^n$.`, value: 280, wrong: [300, 320],
        explanation: t`$2 \times 150 + (-1) \times 20 = 280$.` }),
      P.num({ label: "(e)", marks: 2, stem: t`Use the first three terms of the expansion of $(1 + kx)^n$ with a suitable value of $x$ to estimate $1.05^4$, giving your answer to 3 decimal places.`, value: est, dp: 3, wrong: [1.2, 1.216],
        explanation: t`$1 + 5x = 1.05$ when $x = 0.01$: $1 + 20(0.01) + 150(0.0001) = 1.215$. (The true value is $1.2155\ldots$)` }),
    ],
    explanation: "Two coefficients give two equations in n and k; eliminate k by squaring nk = 20.",
    hints: [t`$\binom{n}{2} = \frac{n(n - 1)}{2}$.`, t`$(nk)^2 = 400$.`],
  });
});
