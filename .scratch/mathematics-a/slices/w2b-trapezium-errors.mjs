// W2b: amaths.numerical.trapezium-errors
import { concept, P, t, chk, trapezium, integrate, ZP } from "../lib.mjs";

const { exp, sqrt, cos, PI } = Math;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
/** 4 s.f. blank: accepted value and tolerance half a unit in the 4th s.f. */
const S4 = (id, x, wrong, marks) => {
  const dp = 3 - Math.floor(Math.log10(Math.abs(x)));
  return D(id, x.toFixed(dp), 0.5 * 10 ** -dp, wrong, marks);
};

concept("amaths.numerical.trapezium-errors", { file: "numerical/trapezium-errors", keyPrefix: "numerical.trapezium-errors" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The trapezium rule is used with ordinates at $x = 0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9$. How many strips are used?`,
    options: [
      ["6", "Correct: seven ordinates bound six strips of width 0.15."],
      ["7", "That is the number of ordinates; there is one fewer strip."],
      ["5", "Count the gaps between consecutive x values: there are six."],
      ["2", "Count the gaps between consecutive x values, not the length 0.9 of the interval."],
    ],
    answer: "A",
    explanation: t`$n$ strips need $n + 1$ ordinates; $h = \frac{0.9 - 0}{6} = 0.15$.`,
  });

  const t2 = trapezium((x) => x * x, 0, 2, 2).value;
  chk(t2, 3);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Use the trapezium rule with 2 strips to estimate $\displaystyle\int_0^2 x^2\,\mathrm{d}x$.`,
    value: t2, wrong: [8 / 3, 6],
    explanation: t`$h = 1$, ordinates $0, 1, 4$: $\frac{1}{2}(1)[0 + 2(1) + 4] = 3$. (The exact value is $\frac{8}{3}$; the estimate is too large because $y = x^2$ is convex. 6 forgets the $\frac{1}{2}$.)`,
  });

  const t3 = trapezium((x) => 1 / (1 + x), 0, 1, 2).value;
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Use the trapezium rule with 2 strips to estimate $\displaystyle\int_0^1 \frac{1}{1 + x}\,\mathrm{d}x$, correct to 3 significant figures.`,
    value: t3, wrong: [0.75, 0.625],
    explanation: t`$h = 0.5$; ordinates $1, \frac{2}{3}, 0.5$. Estimate $= \frac{1}{2}(0.5)\left[1 + 2\left(\frac{2}{3}\right) + 0.5\right] = 0.25 \times 2.8333 = 0.708$. (0.625 forgets to double the middle ordinate.)`,
  });
  chk(0.25 * (1 + 0.5 + 2 * 0.5), 0.625);

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The trapezium rule gives an over-estimate of $\displaystyle\int_0^1 \mathrm{e}^x\,\mathrm{d}x$.`,
    answer: true,
    explanation: t`$y = \mathrm{e}^x$ has $y'' = \mathrm{e}^x > 0$: the curve is convex, so the tops of the trapezia (chords) lie above it.`,
  });

  const t5 = trapezium((x) => exp(x * x), 0, 1, 4).value;
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Use the trapezium rule with 4 strips to estimate $\displaystyle\int_0^1 \mathrm{e}^{x^2}\,\mathrm{d}x$, correct to 3 significant figures.`,
    value: t5, wrong: [integrate((x) => exp(x * x), 0, 1), trapezium((x) => exp(x * x), 0, 1, 5).value],
    explanation: t`$h = 0.25$; ordinates $1, 1.0645, 1.2840, 1.7551, 2.7183$. Estimate $= 0.125[1 + 2(1.0645 + 1.2840 + 1.7551) + 2.7183] = 1.49$.`,
    hints: ["Four strips need five ordinates: x = 0, 0.25, 0.5, 0.75, 1."],
  });

  const t6 = trapezium((x) => 1 / cos(x), 0, PI / 3, 3).value;
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Use the trapezium rule with 3 strips to estimate $\displaystyle\int_0^{\pi/3} \sec x\,\mathrm{d}x$, correct to 3 significant figures.`,
    value: t6, wrong: [trapezium((x) => 1 / Math.cos((x * PI) / 180), 0, PI / 3, 3).value, Math.log(2 + sqrt(3))],
    explanation: t`$h = \frac{\pi}{9}$; ordinates at $0, \frac{\pi}{9}, \frac{2\pi}{9}, \frac{\pi}{3}$: $1, 1.0642, 1.3054, 2$. Estimate $= \frac{\pi}{18}[1 + 2(1.0642 + 1.3054) + 2] = 1.35$. (The calculator must be in radians.)`,
    hints: [t`$h = \frac{\pi/3}{3} = \frac{\pi}{9}$.`, "Use radians."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`The trapezium rule is used to estimate $\displaystyle\int_0^1 \sqrt{x}\,\mathrm{d}x$. Which statement is correct?`,
    options: [
      [t`It is an under-estimate, because the curve is concave`, t`Correct: $y'' = -\frac{1}{4}x^{-3/2} < 0$, so chords lie below the curve.`],
      [t`It is an over-estimate, because the curve is concave`, "For a concave curve the chords lie below it, so the trapezia miss area."],
      [t`It is an over-estimate, because the curve is increasing`, "Increasing or decreasing does not matter; the concavity decides."],
      [t`It is exact, because the curve passes through every ordinate`, "The ordinates are exact, but the straight tops of the trapezia are not the curve."],
    ],
    answer: "A",
    explanation: t`$y = \sqrt{x}$ bends downwards (concave), so each trapezium lies inside the region under the curve.`,
    hints: ["Find the sign of the second derivative."],
  });

  const depths = [0, 1.2, 2.6, 3.1, 2.4, 1.5, 0];
  const area8 = 2.5 * (depths[0] + depths[6] + 2 * depths.slice(1, 6).reduce((s, v) => s + v, 0));
  chk(area8, 54);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A survey team measures the depth of a channel of the Zambezi river every 5 m across its 30 m width. The depths, in metres, are $0, 1.2, 2.6, 3.1, 2.4, 1.5, 0$. Use the trapezium rule to estimate the area of the cross-section.`,
    value: area8, unit: "m²", wrong: [108, 49.5],
    explanation: t`$h = 5$: area $\approx \frac{1}{2}(5)[0 + 2(1.2 + 2.6 + 3.1 + 2.4 + 1.5) + 0] = 2.5 \times 21.6 = 54$ m². (108 forgets the $\frac{1}{2}$.)`,
    hints: ["Six strips of width 5 m."],
  });

  const lo9 = 0.5 * [0.5, 1, 1.5, 2].reduce((s, x) => s + exp(-x), 0);
  const up9 = 0.5 * [0, 0.5, 1, 1.5].reduce((s, x) => s + exp(-x), 0);
  chk(lo9 < 1 - exp(-2) && 1 - exp(-2) < up9 ? 1 : 0, 1);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: true, applies: ZP,
    stem: t`Use four rectangles of width 0.5 to find a lower bound and an upper bound for $\displaystyle\int_0^2 \mathrm{e}^{-x}\,\mathrm{d}x$, each correct to 3 significant figures.`,
    template: "lower bound {{blank:l}}, upper bound {{blank:u}}",
    blanks: [D("l", lo9.toFixed(3), 0.0005, "1.10"), D("u", up9.toFixed(2), 0.005, "0.666")],
    explanation: t`$\mathrm{e}^{-x}$ is decreasing, so right-hand heights give the lower bound: $0.5(\mathrm{e}^{-0.5} + \mathrm{e}^{-1} + \mathrm{e}^{-1.5} + \mathrm{e}^{-2}) = 0.666$; left-hand heights give the upper bound: $0.5(1 + \mathrm{e}^{-0.5} + \mathrm{e}^{-1} + \mathrm{e}^{-1.5}) = 1.10$. The exact value $1 - \mathrm{e}^{-2} = 0.865$ lies between them.`,
    hints: ["For a decreasing function, which end of each strip gives the shorter rectangle?"],
  });

  const r10 = Math.abs(3.14 - PI) / PI;
  b.num({
    d: 3, skill: "APPLICATION", calculator: true, applies: ZP,
    stem: t`The value $3.14$ is used as an approximation to $\pi$. Find the relative error, correct to 3 significant figures.`,
    value: r10, wrong: [Math.abs(3.14 - PI), Math.abs(3.14 - PI) / 3.14 * 100],
    explanation: t`Absolute error $= |3.14 - \pi| = 0.001593$. Relative error $= \frac{0.001593}{\pi} = 0.000507$ (about $0.05\%$). (0.00159 is the absolute error.)`,
    hints: ["Relative error = absolute error ÷ true value."],
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: true, applies: ZP,
    stem: t`The side of a square floor tile is measured as $8.3$ cm, correct to the nearest $0.1$ cm. Find the greatest possible area of the tile, correct to 3 significant figures.`,
    value: 8.35 ** 2, unit: "cm²", wrong: [8.3 ** 2, 8.4 ** 2],
    explanation: t`The side is less than $8.35$ cm, so the area is less than $8.35^2 = 69.7$ cm² (to 3 s.f.). Using $8.4$ cm overstates the maximum error: the bound is half a unit, $0.05$ cm.`,
    hints: ["The upper bound of a measurement to the nearest 0.1 is the value + 0.05."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, applies: ZP,
    stem: "A bag of maize is weighed as 4.7 kg, correct to the nearest 0.1 kg. What is the greatest possible absolute error in this measurement?",
    options: [
      ["0.05 kg", "Correct: the true mass lies between 4.65 kg and 4.75 kg."],
      ["0.1 kg", "0.1 kg is the unit of measurement; the error is at most half of it."],
      ["0.5 kg", "This is half of 1 kg, but the measurement is to the nearest 0.1 kg."],
      ["0.01 kg", "The scale reads to 0.1 kg, so errors up to 0.05 kg are possible."],
    ],
    answer: "A",
    explanation: "A value rounded to the nearest unit u is within u/2 of the true value.",
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false, applies: ZP,
    stem: "X is a true value and x an approximation to it. Match each term with its formula or value.",
    pairs: [
      ["Absolute error", t`$|x - X|$`],
      ["Relative error", t`$\dfrac{|x - X|}{|X|}$`],
      ["Percentage error", t`$\dfrac{|x - X|}{|X|} \times 100$`],
      ["Greatest error of a value given to 2 decimal places", t`$0.005$`],
    ],
    explanation: "Relative error compares the error with the size of the quantity; a value rounded to 2 d.p. is within 0.005 of the truth.",
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4, applies: ZP,
    stem: t`The interval $a \le x \le b$ is divided into $n$ strips of width $h$, with ordinates $y_0, y_1, \dots, y_n$. Derive the trapezium rule $\displaystyle\int_a^b y\,\mathrm{d}x \approx \frac{1}{2}h\left[y_0 + 2(y_1 + \dots + y_{n-1}) + y_n\right]$.`,
    points: [
      t`B1 $h = \frac{b - a}{n}$ and each strip is approximated by a trapezium.`,
      t`M1 area of the strip from $x_r$ to $x_{r+1}$ is $\frac{1}{2}h(y_r + y_{r+1})$.`,
      "M1 adds the n trapezium areas.",
      "A1 notes that each inner ordinate appears twice and the end ordinates once, giving the formula.",
    ],
    modelAnswer: t`Each strip has width $h = \frac{b - a}{n}$. Replace the curve over the strip $[x_r, x_{r+1}]$ by the chord, giving a trapezium of area $\frac{1}{2}h(y_r + y_{r+1})$.
$$
\text{Total} = \tfrac{1}{2}h(y_0 + y_1) + \tfrac{1}{2}h(y_1 + y_2) + \dots + \tfrac{1}{2}h(y_{n-1} + y_n)
$$
$$
= \tfrac{1}{2}h\left[y_0 + 2(y_1 + y_2 + \dots + y_{n-1}) + y_n\right]
$$
because $y_1, \dots, y_{n-1}$ each belong to two neighbouring trapezia.`,
    explanation: "Area of a trapezium = ½ × (sum of parallel sides) × width.",
    hints: ["Write down the area of one strip, then add."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Explain why increasing the number of strips usually makes a trapezium-rule estimate more accurate.",
    points: [
      "Narrower strips make each chord closer to the curve it replaces.",
      "So the gaps (or overlaps) between the trapezia and the curve shrink, and the total error decreases (roughly by a factor of 4 when n is doubled).",
    ],
    modelAnswer: "The error comes from the space between each chord and the curve. Over a narrower strip the curve is closer to a straight line, so the chord fits better and the error in every strip is much smaller; the total error falls.",
    explanation: "Halving h divides the error by about 4 for a smooth curve.",
    hints: ["Where does the error in the rule come from?"],
  });

  const t16 = trapezium((x) => x * x, 0, 2, 4).value;
  chk(t16, 2.75);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The trapezium rule with 4 strips is used to estimate $\displaystyle\int_0^2 x^2\,\mathrm{d}x$. Find the absolute error of the estimate, correct to 3 significant figures.`,
    value: t16 - 8 / 3, wrong: [3 - 8 / 3, (t16 - 8 / 3) / (8 / 3)],
    explanation: t`$h = 0.5$; ordinates $0, 0.25, 1, 2.25, 4$. Estimate $= 0.25[0 + 2(3.5) + 4] = 2.75$. Exact value $\frac{8}{3} = 2.6667$. Absolute error $= 2.75 - 2.6667 = 0.0833$ (exactly $\frac{1}{12}$). With 2 strips the error was $\frac{1}{3}$: doubling the strips divided it by 4.`,
    hints: [t`Find the exact value $\int_0^2 x^2\,\mathrm{d}x$ first.`],
  });

  // Struct 12: quarter circle ∫_0^2 √(4 − x²) dx = π
  const q = trapezium((x) => sqrt(4 - x * x), 0, 2, 4);
  chk(integrate((x) => sqrt(4 - x * x), 0, 2, 20000), PI, 1e-3);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The region under the curve $y = \sqrt{4 - x^2}$ for $0 \le x \le 2$ is a quarter of a circle of radius 2, so $\displaystyle\int_0^2 \sqrt{4 - x^2}\,\mathrm{d}x = \pi$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Complete the ordinates at x = 0.5, 1 and 1.5, each correct to 4 decimal places.", template: "y(0.5) = {{blank:a}}, y(1) = {{blank:b}}, y(1.5) = {{blank:c}}",
        blanks: [S4("a", q.ys[1], "1.9365"), D("b", "1.7321", 0.0001, "1.7320"), S4("c", q.ys[3], "1.3229")],
        explanation: t`$\sqrt{3.75} = 1.9365$, $\sqrt{3} = 1.7321$, $\sqrt{1.75} = 1.3229$.` }),
      P.num({ label: "(b)", marks: 3, stem: "Use the trapezium rule with 4 strips to estimate the integral, correct to 4 significant figures.", value: q.value, sf: 4, wrong: [2 * q.value, 2.4914],
        explanation: t`$\frac{1}{2}(0.5)[2 + 2(1.9365 + 1.7321 + 1.3229) + 0] = 0.25 \times 11.9829 = 2.996$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "State, with a reason, whether the estimate is an over-estimate or an under-estimate.", points: ["Under-estimate.", "The curve (a circular arc) is concave, so the chords forming the tops of the trapezia lie below it."],
        modelAnswer: "Under-estimate: the quarter circle bends downwards (concave), so every trapezium lies inside the region and misses a sliver of area.",
        explanation: "Concave curve ⇒ under-estimate." }),
      P.num({ label: "(d)", marks: 2, stem: "Find the relative error of the estimate in (b) as an approximation to π, correct to 3 significant figures.", value: Math.abs(q.value - PI) / PI, wrong: [Math.abs(q.value - PI), Math.abs(q.value - PI) / q.value * 100],
        explanation: t`$\frac{|2.9957 - \pi|}{\pi} = \frac{0.1459}{3.1416} = 0.0464$ (about $4.6\%$).` }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest how the estimate could be improved, and explain why the improvement is smaller near x = 2 than elsewhere for this curve.", points: ["Use more (narrower) strips.", "Near x = 2 the curve is very steep (vertical tangent), so chords there fit worst; the largest error comes from the last strip, which needs very narrow strips to fix."],
        modelAnswer: "Increase the number of strips. The arc becomes vertical at x = 2, so the last chord cuts off the most area; narrower strips help, but the error near x = 2 shrinks more slowly than elsewhere.",
        explanation: "Steep or rapidly bending parts of a curve dominate the error." }),
    ],
    explanation: "A trapezium-rule estimate of π, with the concavity argument and a relative error.",
    hints: ["Keep 4 decimal places in the ordinates.", "Relative error = |estimate − π| ÷ π."],
  });
  chk(Math.abs(q.ys[2] - 1.7321) < 0.0001 ? 1 : 0, 1);

  // Struct 13: ∫_0^2 e^{x/2} dx = 2(e − 1)
  const f = (x) => exp(x / 2);
  const L = 0.5 * [0, 0.5, 1, 1.5].reduce((s, x) => s + f(x), 0);
  const U = 0.5 * [0.5, 1, 1.5, 2].reduce((s, x) => s + f(x), 0);
  const T = trapezium(f, 0, 2, 4).value;
  const E = 2 * (Math.E - 1);
  chk(T, (L + U) / 2, 1e-12);
  chk(integrate(f, 0, 2), E, 1e-9);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true, applies: ZP,
    stem: t`This question is about $I = \displaystyle\int_0^2 \mathrm{e}^{x/2}\,\mathrm{d}x$. Use four strips of width 0.5 throughout, and give values to 4 significant figures unless stated.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: "Use rectangles to find a lower bound L and an upper bound U for I.", template: "L = {{blank:l}}, U = {{blank:u}}",
        blanks: [S4("l", L, "3.884", 2), S4("u", U, "3.025", 2)],
        explanation: t`$\mathrm{e}^{x/2}$ is increasing, so left-hand heights give $L = 0.5(1 + 1.2840 + 1.6487 + 2.1170) = 3.025$ and right-hand heights give $U = 0.5(1.2840 + 1.6487 + 2.1170 + 2.7183) = 3.884$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Use the trapezium rule to estimate I.", value: T, sf: 4, wrong: [U, L],
        explanation: t`$T = \frac{1}{2}(0.5)[1 + 2(1.2840 + 1.6487 + 2.1170) + 2.7183] = 3.454$, the mean of $L$ and $U$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the exact value of I and give it to 4 significant figures.", value: E, sf: 4, wrong: [Math.E - 1, 2 * Math.E],
        explanation: t`$I = \left[2\mathrm{e}^{x/2}\right]_0^2 = 2\mathrm{e} - 2 = 3.437$.` }),
      P.fib({ label: "(d)", marks: 3, stem: "Find the absolute error and the relative error of the trapezium estimate, each correct to 3 significant figures.", template: "absolute error {{blank:a}}, relative error {{blank:r}}",
        blanks: [D("a", (T - E).toPrecision(3), 0.00005, "0.00520", 2), D("r", ((T - E) / E).toPrecision(3), 0.000005, "0.0179", 1)],
        explanation: t`Absolute error $= 3.4544 - 3.4366 = 0.0179$. Relative error $= \frac{0.0179}{3.4366} = 0.00520$ (about $0.5\%$).` }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the trapezium rule over-estimates I.", points: [t`$\frac{\mathrm{d}^2}{\mathrm{d}x^2}\mathrm{e}^{x/2} = \frac{1}{4}\mathrm{e}^{x/2} > 0$: the curve is convex.`, "So each chord lies above the curve and every trapezium includes extra area."],
        modelAnswer: "The second derivative ¼e^(x/2) is positive, so the curve bends upwards. The straight tops of the trapezia lie above the curve, so the trapezia contain more area than the region: an over-estimate, as the positive error in (d) confirms.",
        explanation: "Convex ⇒ over-estimate." }),
    ],
    explanation: "Rectangles bound the integral; the trapezium rule is their average; the exact value measures the error.",
    hints: ["For an increasing function the left-hand rectangles lie under the curve.", "Relative error = absolute error ÷ exact value."],
  });

  b.card("FORMULA", "Trapezium rule", t`$\int_a^b y\,\mathrm{d}x \approx \frac{1}{2}h[y_0 + 2(y_1 + \dots + y_{n-1}) + y_n]$, $h = \frac{b - a}{n}$ (in MF19).`);
  b.card("FACT", "Strips and ordinates", "n strips need n + 1 ordinates; only the inner ordinates are doubled.");
  b.card("FACT", "Over- or under-estimate", t`Convex curve ($y'' > 0$): over-estimate. Concave curve ($y'' < 0$): under-estimate.`);
  b.card("CONCEPT", "Improving the estimate", "More, narrower strips; for a smooth curve doubling n divides the error by about 4.");
  b.card("CONCEPT", "Bounds with rectangles", "For a decreasing function, left-hand heights give an upper bound and right-hand heights a lower bound (swap for increasing).", undefined, { applies: ZP });
  b.card("DEFINITION", "Absolute error", t`$|x - X|$, where $X$ is the true value and $x$ the approximation.`, undefined, { applies: ZP });
  b.card("DEFINITION", "Relative error", t`$\dfrac{|x - X|}{|X|}$; multiply by 100 for a percentage error.`, undefined, { applies: ZP });
  b.card("FACT", "Error of a rounded measurement", "A value to the nearest u lies within u/2 of the true value.", undefined, { applies: ZP });
  b.card("CONCEPT", "Combining errors", "Adding or subtracting: absolute errors add. Multiplying or dividing: relative errors (approximately) add.", undefined, { applies: ZP });
});
