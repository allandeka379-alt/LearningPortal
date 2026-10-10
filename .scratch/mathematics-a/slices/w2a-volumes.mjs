// W2a: amaths.integ.volumes (both boards).
import { concept, P, t, chk, integrate, checkAntideriv } from "../lib.mjs";

const { PI, exp, sqrt, abs, cbrt } = Math;
/** k such that V = kπ, from π∫ g, checked against the exact k. */
const K = (g, a, b, exact, label) => chk(integrate(g, a, b), exact, 1e-7 * Math.max(1, abs(exact)), label);

concept("amaths.integ.volumes", { file: "integ/volumes", keyPrefix: "integ.volumes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The region under $y = f(x)$ from $x = a$ to $x = b$ is rotated through $360^\circ$ about the $x$-axis. Which integral gives the volume?`,
    options: [
      [t`$\pi\displaystyle\int_{a}^{b} y^{2}\,dx$`, "Correct: each thin slice is a disc of radius y."],
      [t`$\displaystyle\int_{a}^{b} y\,dx$`, "This is the area of the region, not the volume of the solid."],
      [t`$2\pi\displaystyle\int_{a}^{b} y\,dx$`, "The disc's area πy² is needed, not the circumference 2πy."],
      [t`$\pi\displaystyle\int_{a}^{b} x^{2}\,dy$`, "This is the formula for rotation about the y-axis."],
    ],
    answer: "A",
    explanation: t`A slice of thickness $\delta x$ is a disc of volume $\pi y^{2}\delta x$; summing gives $V = \pi\int_{a}^{b} y^{2}\,dx$.`,
  });

  const k2 = K((x) => 9 * x * x, 0, 2, 24, "q2");
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`The region between $y = 3x$, the $x$-axis and the line $x = 2$ is rotated through $360^\circ$ about the $x$-axis. The volume is $k\pi$. Find $k$.`,
    value: k2, prefix: "k =", wrong: [6, 12],
    explanation: t`$V = \pi\int_{0}^{2} 9x^{2}\,dx = \pi\Big[3x^{3}\Big]_{0}^{2} = 24\pi$. (This solid is a cone of radius 6 and height 2: $\frac{1}{3}\pi \times 36 \times 2 = 24\pi$.)`,
  });

  const k3 = K((x) => x, 0, 4, 8, "q3");
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The region between $y = \sqrt{x}$, the $x$-axis and the line $x = 4$ is rotated through $360^\circ$ about the $x$-axis. The volume is $k\pi$. Find $k$.`,
    template: "k = {{blank:k}}",
    blanks: [{ id: "k", input: "number", accepted: [k3], wrong: 16 }],
    explanation: t`$y^{2} = x$, so $V = \pi\int_{0}^{4} x\,dx = \pi\Big[\tfrac{x^{2}}{2}\Big]_{0}^{4} = 8\pi$.`,
  });

  const k4 = K((x) => (x * x + 1) ** 2, 0, 1, 28 / 15, "q4");
  b.num({
    d: 3, skill: "APPLICATION", calculator: true, unit: "units³",
    stem: t`The region between $y = x^{2} + 1$, the axes and the line $x = 1$ is rotated through $360^\circ$ about the $x$-axis. Find the volume, correct to 3 significant figures.`,
    value: PI * k4, wrong: [4.19, 1.87],
    explanation: t`$y^{2} = x^{4} + 2x^{2} + 1$. $V = \pi\Big[\tfrac{x^{5}}{5} + \tfrac{2x^{3}}{3} + x\Big]_{0}^{1} = \pi\left(\tfrac{1}{5} + \tfrac{2}{3} + 1\right) = \tfrac{28\pi}{15} \approx 5.86$. (4.19 uses $x^{4} + 1$, a wrong square.)`,
    hints: ["Expand (x² + 1)² before integrating."],
  });

  b.mcq({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`A region between a curve, the $y$-axis and the lines $y = c$ and $y = d$ is rotated through $360^\circ$ about the $y$-axis. Which integral gives the volume?`,
    options: [
      [t`$\pi\displaystyle\int_{c}^{d} x^{2}\,dy$`, "Correct: the radius of each disc is the horizontal distance x."],
      [t`$\pi\displaystyle\int_{c}^{d} y^{2}\,dx$`, "This mixes the x-axis formula with y-limits."],
      [t`$\pi\displaystyle\int_{c}^{d} y^{2}\,dy$`, "The radius of each disc is x, not y."],
      [t`$\displaystyle\int_{c}^{d} x\,dy$`, "This is the area of the region against the y-axis, not the volume."],
    ],
    answer: "A",
    explanation: t`Slices perpendicular to the $y$-axis are discs of radius $x$ and thickness $\delta y$, so $V = \pi\int_{c}^{d} x^{2}\,dy$.`,
  });

  checkAntideriv((y) => 0.6 * cbrt(y) ** 5, (y) => cbrt(y) ** 2, 1, 8, "q6");
  const k6 = chk(0.6 * cbrt(8) ** 5, 96 / 5, 1e-12);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true, unit: "units³",
    stem: t`The region between $y = x^{3}$ ($x \geq 0$), the $y$-axis and the line $y = 8$ is rotated through $360^\circ$ about the $y$-axis. Find the volume, correct to 3 significant figures.`,
    value: PI * k6, wrong: [37.7, 19.2],
    explanation: t`$x = y^{\frac{1}{3}}$, so $x^{2} = y^{\frac{2}{3}}$. $V = \pi\int_{0}^{8} y^{\frac{2}{3}}\,dy = \pi\Big[\tfrac{3}{5}y^{\frac{5}{3}}\Big]_{0}^{8} = \tfrac{3}{5} \times 32\pi = \tfrac{96\pi}{5} \approx 60.3$.`,
    hints: ["Write x² in terms of y.", "8^(5/3) = 32."],
  });

  const k7 = K((x) => x * x - x ** 4, 0, 1, 2 / 15, "q7");
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true, unit: "units³",
    stem: t`The region enclosed between $y = x$ and $y = x^{2}$ is rotated through $360^\circ$ about the $x$-axis. Find the volume of the solid formed, correct to 3 significant figures.`,
    value: PI * k7, wrong: [0.105, 0.524],
    explanation: t`They meet at $x = 0$ and $x = 1$, with $y = x$ outside. $V = \pi\int_{0}^{1}(x^{2} - x^{4})\,dx = \pi\left(\tfrac{1}{3} - \tfrac{1}{5}\right) = \tfrac{2\pi}{15} \approx 0.419$. (0.105 uses $(x - x^{2})^{2}$.)`,
    hints: ["Outer radius x, inner radius x².", "Square each radius separately."],
  });
  chk(PI * integrate((x) => (x - x * x) ** 2, 0, 1), PI / 30, 1e-9, "q7 wrong");

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`When the region between $y_{1}$ (outer) and $y_{2}$ (inner) is rotated about the $x$-axis, the volume is $\pi\displaystyle\int_{a}^{b}(y_{1} - y_{2})^{2}\,dx$.`,
    answer: false,
    explanation: t`False. The solid is the outer solid minus the inner one: $V = \pi\int_{a}^{b}(y_{1}^{2} - y_{2}^{2})\,dx$. Squaring the difference gives a smaller, wrong volume.`,
    hints: ["Think of a washer: big disc minus small disc."],
  });

  const r9 = 3;
  chk(PI * integrate((x) => r9 * r9 - x * x, -r9, r9), (4 / 3) * PI * r9 ** 3, 1e-7, "q9");
  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`The upper half of the circle $x^{2} + y^{2} = r^{2}$ is rotated through $360^\circ$ about the $x$-axis to form a sphere. Which integral gives its volume?`,
    options: [
      [t`$\pi\displaystyle\int_{-r}^{r}(r^{2} - x^{2})\,dx$`, t`Correct: $y^{2} = r^{2} - x^{2}$, and it evaluates to $\frac{4}{3}\pi r^{3}$.`],
      [t`$\pi\displaystyle\int_{-r}^{r}\sqrt{r^{2} - x^{2}}\,dx$`, "The radius y must be squared."],
      [t`$\pi\displaystyle\int_{0}^{r}(r^{2} - x^{2})\,dx$`, "These limits give only a hemisphere."],
      [t`$\pi\displaystyle\int_{-r}^{r}(r - x)^{2}\,dx$`, t`$y^{2} = r^{2} - x^{2}$, which is not $(r - x)^{2}$.`],
    ],
    answer: "A",
    explanation: t`$\pi\int_{-r}^{r}(r^{2} - x^{2})\,dx = \pi\Big[r^{2}x - \tfrac{x^{3}}{3}\Big]_{-r}^{r} = \pi\left(\tfrac{2r^{3}}{3} + \tfrac{2r^{3}}{3}\right) = \tfrac{4}{3}\pi r^{3}$.`,
    hints: ["Square y from the circle's equation."],
  });

  const k10 = K((x) => 4 / (x * x), 1, 3, 8 / 3, "q10");
  chk(2 * PI * Math.log(3), 6.9, 0.005, "q10 wrong");
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true, unit: "units³",
    stem: t`The region between $y = \dfrac{2}{x}$, the $x$-axis and the lines $x = 1$ and $x = 3$ is rotated through $360^\circ$ about the $x$-axis. Find the volume, correct to 3 significant figures.`,
    value: PI * k10, wrong: [2.67, 6.90],
    explanation: t`$V = \pi\int_{1}^{3}\tfrac{4}{x^{2}}\,dx = \pi\Big[-\tfrac{4}{x}\Big]_{1}^{3} = \pi\left(-\tfrac{4}{3} + 4\right) = \tfrac{8\pi}{3} \approx 8.38$. (2.67 forgets the factor $\pi$; 6.90 uses $\pi\int y\,dx$ without squaring.)`,
    workedSolution: [
      t`1. $y^{2} = \dfrac{4}{x^{2}} = 4x^{-2}$.`,
      t`2. $V = \pi\displaystyle\int_{1}^{3} 4x^{-2}\,dx = \pi\Big[-4x^{-1}\Big]_{1}^{3}$.`,
      t`3. $= \pi\left(-\tfrac{4}{3} + 4\right) = \tfrac{8\pi}{3} \approx 8.38$.`,
    ].join("\n"),
    hints: ["Square 2/x before integrating."],
  });

  const k11 = K((x) => exp(2 * x), 0, 1, (exp(2) - 1) / 2, "q11");
  b.num({
    d: 4, skill: "APPLICATION", calculator: true, unit: "units³",
    stem: t`The region between $y = \mathrm{e}^{x}$, the axes and the line $x = 1$ is rotated through $360^\circ$ about the $x$-axis. Find the volume, correct to 3 significant figures.`,
    value: PI * k11, wrong: [5.40, 20.1],
    explanation: t`$y^{2} = \mathrm{e}^{2x}$. $V = \pi\Big[\tfrac{1}{2}\mathrm{e}^{2x}\Big]_{0}^{1} = \tfrac{\pi}{2}(\mathrm{e}^{2} - 1) \approx 10.0$. (5.40 uses $\pi\int \mathrm{e}^{x}\,dx$, forgetting to square.)`,
    hints: [t`$(\mathrm{e}^{x})^{2} = \mathrm{e}^{2x}$.`],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each description with the integral for its volume (rotation through 360°).",
    pairs: [
      [t`$y = x^{2}$, $0 \leq x \leq 1$, about the $x$-axis`, t`$\pi\displaystyle\int_{0}^{1} x^{4}\,dx$`],
      [t`$y = x^{2}$, $0 \leq y \leq 1$, about the $y$-axis`, t`$\pi\displaystyle\int_{0}^{1} y\,dy$`],
      [t`between $y = 2$ and $y = x^{2}$ ($x \geq 0$), $0 \leq x \leq 1$, about the $x$-axis`, t`$\pi\displaystyle\int_{0}^{1}(4 - x^{4})\,dx$`],
      [t`$y = 2x$, $0 \leq x \leq 1$, about the $x$-axis`, t`$\pi\displaystyle\int_{0}^{1} 4x^{2}\,dx$`],
    ],
    explanation: t`About the $x$-axis square $y$; about the $y$-axis square $x$ in terms of $y$; between two graphs subtract the squares.`,
  });

  const k13 = K((y) => 4 - y, 0, 4, 8, "q13");
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The region in the first quadrant bounded by $y = 4 - x^{2}$ and the axes is rotated through $360^\circ$ about the $y$-axis. The volume is $k\pi$. Find $k$.`,
    value: k13, prefix: "k =", wrong: [16, 17.1],
    explanation: t`$x^{2} = 4 - y$ for $0 \leq y \leq 4$. $V = \pi\int_{0}^{4}(4 - y)\,dy = \pi\Big[4y - \tfrac{y^{2}}{2}\Big]_{0}^{4} = 8\pi$. (17.1 is the value of $k$ for rotation about the $x$-axis, a different solid.)`,
    hints: ["Make x² the subject.", "Use y-limits from 0 to 4."],
  });

  for (const [r, hh] of [[2, 5], [3, 7]]) chk(PI * integrate((x) => ((r / hh) * x) ** 2, 0, hh), (PI * r * r * hh) / 3, 1e-8, "q14");
  b.proof({
    d: 4, skill: "ANALYSIS", marks: 4, calculator: false,
    stem: t`The line $y = \dfrac{r}{h}x$, for $0 \leq x \leq h$, is rotated through $360^\circ$ about the $x$-axis. Show that the solid formed is a cone of volume $\frac{1}{3}\pi r^{2}h$.`,
    points: [
      t`B1 notes the solid is a cone with vertex at the origin and base radius $r$ (at $x = h$, $y = r$)`,
      t`M1 writes $V = \pi\displaystyle\int_{0}^{h}\frac{r^{2}}{h^{2}}x^{2}\,dx$`,
      t`M1 integrates to $\pi\dfrac{r^{2}}{h^{2}}\Big[\tfrac{x^{3}}{3}\Big]_{0}^{h}$`,
      t`A1 simplifies to $\frac{1}{3}\pi r^{2}h$`,
    ],
    modelAnswer: ["At $x = h$, $y = r$, so the solid is a cone of height $h$ and base radius $r$.", "", "$$", t`V = \pi\int_{0}^{h}\frac{r^{2}}{h^{2}}x^{2}\,dx = \frac{\pi r^{2}}{h^{2}}\Big[\frac{x^{3}}{3}\Big]_{0}^{h} = \frac{\pi r^{2}}{h^{2}} \cdot \frac{h^{3}}{3} = \frac{1}{3}\pi r^{2}h`, "$$"].join("\n"),
    explanation: "r and h are constants: they come outside the integral.",
    hints: ["Square (r/h)x.", "Treat r and h as constants."],
  });

  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The region between $y = \sqrt{x}$, the $x$-axis and the line $x = a$ (where $a > 0$) is rotated through $360^\circ$ about the $x$-axis. The volume is $18\pi$. Find $a$.`,
    value: 6, prefix: "a =", wrong: [36, 3],
    explanation: t`$V = \pi\int_{0}^{a} x\,dx = \tfrac{\pi a^{2}}{2} = 18\pi$, so $a^{2} = 36$ and $a = 6$.`,
    hints: ["Find V in terms of a, then solve."],
  });
  K((x) => x, 0, 6, 18, "q15");

  // struct 5: between y = 5 − x² and y = 1, about the x-axis
  const k16 = K((x) => (5 - x * x) ** 2 - 1, -2, 2, 832 / 15, "q16");
  K((x) => 24 - 10 * x * x + x ** 4, -2, 2, 832 / 15, "q16 expanded");
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The region $R$ is enclosed by the curve $y = 5 - x^{2}$ and the line $y = 1$. $R$ is rotated through $360^\circ$ about the $x$-axis.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the x-coordinates of the points where the curve meets the line, smaller first.", template: "x = {{blank:a}} and x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-2], wrong: -1 }, { id: "b", input: "number", accepted: [2], wrong: 1 }],
        explanation: t`$5 - x^{2} = 1$ gives $x^{2} = 4$, $x = \pm 2$.` }),
      P.proof({ label: "(b)", marks: 1, stem: t`Show that the volume is $V = \pi\displaystyle\int_{-2}^{2}(24 - 10x^{2} + x^{4})\,dx$.`,
        points: [t`B1 uses $\pi\int\left[(5 - x^{2})^{2} - 1^{2}\right]dx$ and expands to $24 - 10x^{2} + x^{4}$`],
        modelAnswer: ["$$", t`V = \pi\int_{-2}^{2}\left[(5 - x^{2})^{2} - 1\right]dx = \pi\int_{-2}^{2}(25 - 10x^{2} + x^{4} - 1)\,dx = \pi\int_{-2}^{2}(24 - 10x^{2} + x^{4})\,dx`, "$$"].join("\n"),
        explanation: "Outer radius 5 − x², inner radius 1." }),
      P.num({ label: "(c)", marks: 2, stem: "Find the volume, correct to 3 significant figures.", unit: "units³", value: PI * k16, wrong: [55.5],
        explanation: t`$\pi\Big[24x - \tfrac{10x^{3}}{3} + \tfrac{x^{5}}{5}\Big]_{-2}^{2} = 2\pi\left(48 - \tfrac{80}{3} + \tfrac{32}{5}\right) = \tfrac{832\pi}{15} \approx 174$. (55.5 forgets the factor $\pi$.)` }),
    ],
    explanation: "A washer-shaped solid: outer radius minus inner radius, each squared.",
    hints: ["The line y = 1 is the inner radius.", "The integrand is even: double the integral from 0 to 2."],
  });

  // struct 5: y = 3/(x + 2), x from 0 to 1, then 0 to ∞
  const k17a = K((x) => 9 / (x + 2) ** 2, 0, 1, 1.5, "q17a");
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The curve $y = \dfrac{3}{x + 2}$ is defined for $x \geq 0$. Volumes below are of solids formed by rotation through $360^\circ$ about the $x$-axis, written as $k\pi$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "The region between the curve, the axes and the line x = 1 is rotated. Find k.", prefix: "k =", value: k17a, wrong: [0.5],
        explanation: t`$\pi\int_{0}^{1} 9(x + 2)^{-2}\,dx = 9\pi\Big[-\tfrac{1}{x + 2}\Big]_{0}^{1} = 9\pi\left(\tfrac{1}{2} - \tfrac{1}{3}\right) = \tfrac{3\pi}{2}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "The unbounded region between the curve, the x-axis and the y-axis (all x ≥ 0) is rotated. Find k.", prefix: "k =", value: 4.5, wrong: [3],
        explanation: t`$9\pi\Big[-\tfrac{1}{x + 2}\Big]_{0}^{N} = 9\pi\left(\tfrac{1}{2} - \tfrac{1}{N + 2}\right) \to \tfrac{9\pi}{2}$ as $N \to \infty$.` }),
      P.tf({ label: "(c)", marks: 1, stem: "The area of the unbounded region in (b) is also finite.", answer: false,
        explanation: t`False. $\int_{0}^{N}\frac{3}{x + 2}\,dx = 3\ln\frac{N + 2}{2} \to \infty$. The area is infinite, yet the volume is finite because squaring makes $y^{2}$ shrink faster.` }),
    ],
    explanation: t`$\int(x + 2)^{-2}\,dx = -(x + 2)^{-1}$; an infinite limit is handled as a limit.`,
    hints: ["Square y first: 9/(x + 2)².", "For (b) replace ∞ by N."],
  });

  const k18 = K((y) => y, 0, 9, 40.5, "q18");
  b.mcq({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`The region between $y = x^{2}$ ($x \geq 0$), the $y$-axis and the line $y = 9$ is rotated through $360^\circ$ about the $y$-axis. What is the volume?`,
    options: [
      [t`$\dfrac{81\pi}{2}$`, t`Correct: $\pi\int_{0}^{9} y\,dy = \frac{81\pi}{2}$.`],
      [t`$\dfrac{243\pi}{5}$`, t`This is $\pi\int_{0}^{3} x^{4}\,dx$, rotation about the $x$-axis of a different region.`],
      [t`$81\pi$`, t`The $\frac{1}{2}$ from integrating $y$ has been lost.`],
      [t`$18\pi$`, t`This is $\pi\int_{0}^{9} \sqrt{y}\,dy$; the integrand should be $x^{2} = y$.`],
    ],
    answer: "A",
    explanation: t`$x^{2} = y$, so $V = \pi\int_{0}^{9} y\,dy = \pi\Big[\tfrac{y^{2}}{2}\Big]_{0}^{9} = \tfrac{81\pi}{2}$.`,
    hints: ["About the y-axis: integrate x² with respect to y."],
  });
  chk(k18, 81 / 2);
  K((x) => x ** 4, 0, 3, 243 / 5, "q18 d1");
  checkAntideriv((y) => (2 / 3) * y ** 1.5, (y) => sqrt(y), 1, 9, "q18 d3"); chk((2 / 3) * 27, 18);

  b.card("FORMULA", "Volume about the x-axis", t`$V = \pi\displaystyle\int_{a}^{b} y^{2}\,dx$`);
  b.card("FORMULA", "Volume about the y-axis", t`$V = \pi\displaystyle\int_{c}^{d} x^{2}\,dy$`);
  b.card("FORMULA", "Volume between two graphs (washer)", t`$V = \pi\displaystyle\int_{a}^{b}\left(y_{\text{outer}}^{2} - y_{\text{inner}}^{2}\right)dx$`);
  b.card("CONCEPT", "Why π y²?", t`Each thin slice is a disc of radius $y$ and thickness $\delta x$: volume $\pi y^{2}\delta x$.`);
  b.card("FACT", "Rotation angle in A-Level questions", t`Always one full turn, $360^\circ$ (or $2\pi$ radians).`);
  b.card("CONCEPT", "Exact volume", t`Leave the answer in terms of $\pi$, e.g. $\frac{704\pi}{5}$.`);
  b.card("FACT", "Cone by integration", t`Rotating $y = \frac{r}{h}x$, $0 \leq x \leq h$, gives $\frac{1}{3}\pi r^{2}h$.`);
  b.card("CONCEPT", "Common error with washers", t`Never $\pi\int(y_{1} - y_{2})^{2}\,dx$: square each radius separately.`);
});
