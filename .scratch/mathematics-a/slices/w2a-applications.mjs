// W2a: amaths.diff.applications (tangents, normals, increasing/decreasing, rates and connected rates; both boards).
import { concept, P, t, chk, same, checkDeriv, quad } from "../lib.mjs";

const XS = [0.6, 1.5, 2.8];
const { PI, sqrt } = Math;

concept("amaths.diff.applications", { file: "diff/applications", keyPrefix: "diff.applications" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "At a point P on a curve the gradient of the tangent is 4. What is the gradient of the normal at P?",
    options: [
      [t`$-\tfrac{1}{4}$`, "Correct: perpendicular gradients multiply to −1, so the normal gradient is −1 ÷ 4."],
      [t`$-4$`, "Only the sign has been changed; the normal gradient is the negative reciprocal."],
      [t`$\tfrac{1}{4}$`, "The reciprocal is right but the sign must change too: 4 × 1/4 = 1, not −1."],
      [t`$4$`, "That is the tangent's gradient; the normal is perpendicular to the tangent."],
    ],
    answer: "A",
    explanation: t`The normal is perpendicular to the tangent, so $m_{\text{normal}} = -\dfrac{1}{m_{\text{tangent}}} = -\dfrac{1}{4}$.`,
  });

  // y = x² − 5x + 3 at x = 4: y = −1, m = 3; tangent y = 3x − 13
  const f2 = (x) => x * x - 5 * x + 3;
  const m2 = 2 * 4 - 5;
  const c2 = f2(4) - m2 * 4;
  chk(c2, -13);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`The tangent to the curve $y = x^{2} - 5x + 3$ at the point where $x = 4$ meets the $y$-axis at $(0, c)$. Find $c$.`,
    value: c2, prefix: "c =", wrong: [-1, 15],
    explanation: t`At $x = 4$: $y = 16 - 20 + 3 = -1$ and $\frac{dy}{dx} = 2x - 5 = 3$. Tangent: $y + 1 = 3(x - 4)$, i.e. $y = 3x - 13$, so $c = -13$.`,
  });

  // normal to y = 2/x at (1, 2): slope −2, normal slope 1/2: 2y = x + 3
  checkDeriv((x) => 2 / x, (x) => -2 / (x * x), XS, "q3");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the equation of the normal to the curve $y = \dfrac{2}{x}$ at the point $(1, 2)$. Give it in the form ax + by + c = 0 with integers a, b, c.`,
    accepted: ["x-2y+3=0", "-x+2y-3=0", "2y-x-3=0", "x-2y=-3", "2y=x+3", "y=0.5x+1.5", "y=x/2+3/2", "y=1/2x+3/2", "y=(x+3)/2"],
    wrong: ["2x+y-4=0"],
    explanation: t`$\dfrac{dy}{dx} = -\dfrac{2}{x^{2}} = -2$ at $x = 1$, so the normal gradient is $\frac{1}{2}$. Normal: $y - 2 = \frac{1}{2}(x - 1)$, i.e. $2y - 4 = x - 1$, so $x - 2y + 3 = 0$. (2x + y − 4 = 0 is the tangent.)`,
    hints: ["Find the tangent gradient first.", "The normal gradient is the negative reciprocal."],
  });

  // y = x³ − 12x: gradient 15 at x = ±3
  same(quad.roots(3, 0, -27), [-3, 3]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the $x$-coordinates of the two points on $y = x^{3} - 12x$ at which the gradient is 15. Give the smaller value first.`,
    template: "x = {{blank:a}} and x = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [-3], wrong: 3 },
      { id: "b", input: "number", accepted: [3], wrong: 9 },
    ],
    explanation: t`$\dfrac{dy}{dx} = 3x^{2} - 12 = 15$ gives $x^{2} = 9$, so $x = -3$ or $x = 3$.`,
    hints: ["Set dy/dx equal to 15 and solve."],
  });

  // f = 5 − 2x − x²: increasing for x < −1
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`For which values of $x$ is $f(x) = 5 - 2x - x^{2}$ an increasing function?`,
    options: [
      [t`$x < -1$`, t`Correct: $f'(x) = -2 - 2x > 0$ when $x < -1$.`],
      [t`$x > -1$`, t`This is where $f'(x) < 0$, so $f$ is decreasing there.`],
      [t`$x < 1$`, t`Sign slip solving $-2 - 2x > 0$: it gives $-2x > 2$, so $x < -1$.`],
      [t`$-1 - \sqrt{6} < x < -1 + \sqrt{6}$`, t`These are where $f(x) > 0$, not where $f'(x) > 0$.`],
    ],
    answer: "A",
    explanation: t`$f'(x) = -2 - 2x$. $f'(x) > 0 \iff -2x > 2 \iff x < -1$ (dividing by $-2$ reverses the inequality). The graph is an inverted parabola with vertex at $x = -1$.`,
  });

  // f = 2x³ − 3x² − 36x + 1: f' = 6(x − 3)(x + 2) < 0 for −2 < x < 3
  checkDeriv((x) => 2 * x ** 3 - 3 * x * x - 36 * x + 1, (x) => 6 * (x - 3) * (x + 2), XS, "q6");
  same(quad.roots(6, -6, -36), [-2, 3]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The function $f(x) = 2x^{3} - 3x^{2} - 36x + 1$ is decreasing for $p < x < q$. Find $p$ and $q$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [
      { id: "p", input: "number", accepted: [-2], wrong: -3 },
      { id: "q", input: "number", accepted: [3], wrong: 2 },
    ],
    explanation: t`$f'(x) = 6x^{2} - 6x - 36 = 6(x - 3)(x + 2)$. This U-shaped quadratic is negative between its roots, so $f$ decreases for $-2 < x < 3$.`,
    hints: ["Factorise f′(x) after taking out 6.", "A positive quadratic is negative between its roots."],
  });

  checkDeriv((x) => x ** 3 + 3 * x * x + 5 * x, (x) => 3 * (x + 1) ** 2 + 2, XS, "q7");
  b.proof({
    d: 3, skill: "APPLICATION", marks: 3, calculator: false,
    stem: t`Show that $f(x) = x^{3} + 3x^{2} + 5x - 4$ is an increasing function for all real $x$.`,
    points: [
      t`B1 differentiates: $f'(x) = 3x^{2} + 6x + 5$`,
      t`M1 completes the square: $f'(x) = 3(x + 1)^{2} + 2$`,
      t`A1 concludes $f'(x) \geq 2 > 0$ for all $x$, so $f$ is increasing`,
    ],
    modelAnswer: ["$$", t`f'(x) = 3x^{2} + 6x + 5 = 3(x^{2} + 2x) + 5 = 3(x + 1)^{2} - 3 + 5 = 3(x + 1)^{2} + 2`, "$$", "", t`Since $(x + 1)^{2} \geq 0$ for all $x$, $f'(x) \geq 2 > 0$, so $f$ is an increasing function.`].join("\n"),
    explanation: t`A completed square (or a negative discriminant, $36 - 60 < 0$, with a positive leading coefficient) shows $f'(x)$ is never zero or negative.`,
    hints: ["Complete the square on f′(x)."],
  });

  // circle r = 6, dr/dt = 0.2 -> dA/dt = 2.4π
  const a8 = 2 * PI * 6 * 0.2;
  b.num({
    d: 3, skill: "APPLICATION", calculator: true, unit: "cm²/s",
    stem: t`The radius of a circular ink stain increases at $0.2$ cm s$^{-1}$. Find the rate at which its area is increasing when the radius is 6 cm. Give your answer correct to 3 significant figures.`,
    value: a8, wrong: [1.2, 22.6],
    explanation: t`$A = \pi r^{2}$, so $\dfrac{dA}{dt} = 2\pi r \times \dfrac{dr}{dt} = 2\pi(6)(0.2) = 2.4\pi \approx 7.54$ cm$^2$ s$^{-1}$. (22.6 uses $\pi r^{2} \times 0.2$, the area instead of $\frac{dA}{dr}$.)`,
    hints: ["dA/dt = dA/dr × dr/dt."],
  });

  // sphere dV/dt = 20, r = 4 -> dr/dt = 20/(64π)
  const r9 = 20 / (4 * PI * 16);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true, unit: "cm/s",
    stem: t`The volume of a spherical soap bubble increases at a constant rate of 20 cm$^3$ s$^{-1}$. Find the rate of increase of its radius when the radius is 4 cm, correct to 3 significant figures. ($V = \frac{4}{3}\pi r^{3}$.)`,
    value: r9, wrong: [0.298, 0.398],
    explanation: t`$\dfrac{dV}{dr} = 4\pi r^{2} = 64\pi$ at $r = 4$. $\dfrac{dr}{dt} = \dfrac{dV/dt}{dV/dr} = \dfrac{20}{64\pi} \approx 0.0995$ cm s$^{-1}$.`,
    workedSolution: [
      t`1. $V = \frac{4}{3}\pi r^{3}$, so $\dfrac{dV}{dr} = 4\pi r^{2}$.`,
      t`2. At $r = 4$: $\dfrac{dV}{dr} = 64\pi$.`,
      t`3. $\dfrac{dr}{dt} = 20 \div 64\pi = 0.0995$ cm s$^{-1}$ (3 s.f.).`,
    ].join("\n"),
    hints: ["Differentiate the volume formula with respect to r.", "Divide the given rate by dV/dr."],
  });

  // cube: dA/dt = 6, x = 5 -> dx/dt = 6/60 = 0.1, dV/dt = 75 × 0.1 = 7.5
  const dx10 = 6 / (12 * 5);
  const dv10 = 3 * 25 * dx10;
  chk(dv10, 7.5, 1e-12);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: false, unit: "cm³/s",
    stem: t`The total surface area of a cube is increasing at 6 cm$^2$ s$^{-1}$. Find the rate at which the volume of the cube is increasing at the instant when the edge length is 5 cm.`,
    value: dv10, wrong: [450, 0.1],
    explanation: t`With edge $x$: $A = 6x^{2}$ and $V = x^{3}$. $\dfrac{dx}{dt} = \dfrac{6}{12x} = 0.1$ at $x = 5$; then $\dfrac{dV}{dt} = 3x^{2} \times 0.1 = 75 \times 0.1 = 7.5$ cm$^3$ s$^{-1}$.`,
    workedSolution: [
      t`1. $A = 6x^{2}$, so $\dfrac{dA}{dx} = 12x = 60$ at $x = 5$.`,
      t`2. $\dfrac{dx}{dt} = \dfrac{6}{60} = 0.1$ cm s$^{-1}$.`,
      t`3. $V = x^{3}$, so $\dfrac{dV}{dx} = 3x^{2} = 75$.`,
      t`4. $\dfrac{dV}{dt} = 75 \times 0.1 = 7.5$ cm$^3$ s$^{-1}$.`,
    ].join("\n"),
    hints: ["Use the edge length x as the link between A and V.", "First find dx/dt from the area, then dV/dt."],
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The variables $x$ and $y$ are connected by $y = x^{3}$, and $x$ increases at $0.5$ units per second. How fast is $y$ increasing when $x = 2$?`,
    options: [
      [t`$6$ units per second`, t`Correct: $\frac{dy}{dt} = 3x^{2} \times 0.5 = 12 \times 0.5$.`],
      [t`$24$ units per second`, "This divides by the rate 0.5 instead of multiplying by it."],
      [t`$1.5$ units per second`, t`This uses $3x \times 0.5$; the derivative of $x^{3}$ is $3x^{2}$.`],
      [t`$4$ units per second`, t`This is $y \times 0.5$, the value of $y$ instead of its derivative.`],
    ],
    answer: "A",
    explanation: t`$\dfrac{dy}{dt} = \dfrac{dy}{dx} \times \dfrac{dx}{dt} = 3x^{2} \times 0.5$. At $x = 2$: $12 \times 0.5 = 6$.`,
    hints: ["dy/dt = dy/dx × dx/dt."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "At a point where the tangent to a curve is horizontal, the normal is a vertical line.",
    answer: true,
    explanation: t`True. The normal is perpendicular to the tangent, so a horizontal tangent ($m = 0$) has a vertical normal $x = x_{1}$. Its gradient $-\frac{1}{0}$ is undefined, so write the equation directly.`,
  });

  checkDeriv((x) => x ** 3, (x) => 3 * x * x, XS, "q13");
  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`If $f'(2) = 0$, then $f$ cannot be an increasing function on an interval containing $x = 2$.`,
    answer: false,
    explanation: t`False. $f(x) = (x - 2)^{3}$ has $f'(2) = 0$, yet it increases on every interval: $f'(x) = 3(x - 2)^{2} \geq 0$ with equality only at the single point $x = 2$.`,
    hints: ["Think of a cubic with a horizontal point of inflexion."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each phrase with its mathematical meaning.",
    pairs: [
      ["the area is decreasing", t`$\dfrac{dA}{dt} < 0$`],
      ["f is increasing", t`$f'(x) > 0$`],
      ["the tangent at the point is horizontal", t`$\dfrac{dy}{dx} = 0$ there`],
      ["the radius grows at a steady rate", t`$\dfrac{dr}{dt}$ is constant`],
    ],
    explanation: "A rate of change with time is a derivative with respect to t; its sign tells you whether the quantity is growing or shrinking.",
  });

  // tangent to y = x² + 3 at (p, p² + 3) through origin: p² = 3
  const p15 = sqrt(3);
  chk(-(p15 * p15 + 3), 2 * p15 * (0 - p15), 1e-12, "q15");
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The tangent to the curve $y = x^{2} + 3$ at the point $P(p, p^{2} + 3)$, where $p > 0$, passes through the origin. Find $p$, correct to 3 significant figures.`,
    value: p15, prefix: "p =", wrong: [3, 1.5],
    explanation: t`The tangent at $P$ has gradient $2p$: $y - (p^{2} + 3) = 2p(x - p)$. It passes through $(0, 0)$: $-(p^{2} + 3) = -2p^{2}$, so $p^{2} = 3$ and $p = \sqrt{3} \approx 1.73$.`,
    hints: ["Write the tangent at a general point P in terms of p.", "Substitute x = 0, y = 0."],
  });

  // cone r = h/2, V = πh³/12, dV/dt = −3, h = 6 -> dh/dt = −3/(9π)
  const dh16 = -3 / ((PI * 36) / 4);
  checkDeriv((h) => (PI * h ** 3) / 12, (h) => (PI * h * h) / 4, XS, "q16");
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true, unit: "cm/s",
    stem: t`Water drains from an inverted conical funnel at 3 cm$^3$ s$^{-1}$. When the depth of water is $h$ cm, the radius of the water surface is $\frac{1}{2}h$ cm, so the volume is $V = \frac{1}{12}\pi h^{3}$. Find the rate at which the depth is decreasing when $h = 6$, correct to 3 significant figures.`,
    value: -dh16, wrong: [0.0265, 0.333],
    explanation: t`$\dfrac{dV}{dh} = \frac{1}{4}\pi h^{2} = 9\pi$ at $h = 6$. $\dfrac{dh}{dt} = \dfrac{-3}{9\pi} = -0.106$, so the depth is decreasing at $0.106$ cm s$^{-1}$.`,
    workedSolution: [
      t`1. $V = \frac{1}{12}\pi h^{3}$, so $\dfrac{dV}{dh} = \frac{1}{4}\pi h^{2}$.`,
      t`2. At $h = 6$: $\dfrac{dV}{dh} = 9\pi$.`,
      t`3. $\dfrac{dV}{dt} = -3$, so $\dfrac{dh}{dt} = \dfrac{-3}{9\pi} = -0.106$ cm s$^{-1}$.`,
      "4. The depth is decreasing at 0.106 cm per second.",
    ].join("\n"),
    hints: ["The volume is falling, so dV/dt = −3.", "Divide dV/dt by dV/dh."],
  });

  // normal to y = x² at (1, 1) meets curve again at (−1.5, 2.25)
  same(quad.roots(2, 1, -3), [-1.5, 1]);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The normal to the curve $y = x^{2}$ at the point $(1, 1)$ meets the curve again at the point $Q$. Find the coordinates of $Q$.`,
    options: [
      [t`$(-1.5,\ 2.25)$`, t`Correct: the normal $y = -\frac{1}{2}x + \frac{3}{2}$ meets $y = x^{2}$ where $2x^{2} + x - 3 = 0$.`],
      [t`$(-1,\ 1)$`, "This is the reflection of the point in the y-axis; it does not lie on the normal."],
      [t`$(1.5,\ 2.25)$`, t`Sign error: the other root of $2x^{2} + x - 3 = 0$ is $x = -\frac{3}{2}$.`],
      [t`$(-0.5,\ 0.25)$`, t`This uses the tangent $y = 2x - 1$ or another slip; the tangent meets $y = x^{2}$ only at $(1, 1)$.`],
    ],
    answer: "A",
    explanation: t`Gradient of the curve at $x = 1$: 2, so the normal gradient is $-\frac{1}{2}$: $y = -\frac{1}{2}x + \frac{3}{2}$. Then $x^{2} = -\frac{1}{2}x + \frac{3}{2}$ gives $2x^{2} + x - 3 = (2x + 3)(x - 1) = 0$, so $x = -1.5$, $y = 2.25$.`,
    hints: ["Find the normal's equation.", "Solve it simultaneously with y = x²; you already know one root."],
  });

  // struct 5: y = x³ − 4x + 1 at P(2, 1): tangent y = 8x − 15, normal x + 8y = 10
  const f18 = (x) => x ** 3 - 4 * x + 1;
  const m18 = 3 * 4 - 4;
  chk(f18(2), 1); chk(m18, 8); chk(f18(2) - m18 * 2, -15); chk(2 + 8 * f18(2), 10);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`The point $P(2, 1)$ lies on the curve $y = x^{3} - 4x + 1$.`,
    parts: [
      P.expr({ label: "(a)", marks: 2, stem: "Find the equation of the tangent at P, in the form y = mx + c.",
        accepted: ["y=8x-15", "y=-15+8x", "8x-y-15=0", "8x-y=15"], wrong: ["y=8x+1"],
        explanation: t`$\frac{dy}{dx} = 3x^{2} - 4 = 8$ at $x = 2$. Tangent: $y - 1 = 8(x - 2)$, so $y = 8x - 15$.` }),
      P.expr({ label: "(b)", marks: 2, stem: "Find the equation of the normal at P, in the form ax + by = c with integers a, b, c.",
        accepted: ["x+8y=10", "8y+x=10", "x+8y-10=0", "y=-x/8+5/4", "y=-1/8x+5/4", "y=-0.125x+1.25", "-x-8y=-10"], wrong: ["x+8y=2"],
        explanation: t`Normal gradient $-\frac{1}{8}$: $y - 1 = -\frac{1}{8}(x - 2)$, so $8y - 8 = -x + 2$, i.e. $x + 8y = 10$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Find the x-coordinate of the point where the tangent crosses the x-axis, as an exact decimal.", prefix: "x =", value: 15 / 8, dp: 3, wrong: [-15 / 8],
        explanation: t`$0 = 8x - 15$ gives $x = \frac{15}{8} = 1.875$.` }),
    ],
    explanation: "Point, gradient, line: the same three steps for the tangent and the normal, with the negative reciprocal gradient for the normal.",
    hints: ["Evaluate dy/dx at x = 2.", "The normal gradient is −1/8."],
  });

  // struct 5: oil patch dA/dt = 12, r = 4
  const dr19 = 15 / (2 * PI * 4);
  const dc19 = 2 * PI * dr19;
  chk(dc19, 3.75, 1e-12);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`Oil leaking from a truck at a Hwange depot forms a circular patch. The area of the patch increases at a constant rate of 15 cm$^2$ s$^{-1}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the rate at which the radius is increasing when the radius is 4 cm, correct to 3 significant figures.", unit: "cm/s", value: dr19, wrong: [1.875],
        explanation: t`$\dfrac{dA}{dr} = 2\pi r = 8\pi$, so $\dfrac{dr}{dt} = \dfrac{15}{8\pi} \approx 0.597$ cm s$^{-1}$. (1.875 divides by $2r$ instead of $2\pi r$.)` }),
      P.num({ label: "(b)", marks: 1, stem: "Find the rate at which the circumference is increasing at the same instant.", unit: "cm/s", value: dc19, wrong: [0.597],
        explanation: t`$C = 2\pi r$, so $\dfrac{dC}{dt} = 2\pi\dfrac{dr}{dt} = 2\pi \times \dfrac{15}{8\pi} = \dfrac{15}{4} = 3.75$ cm s$^{-1}$.` }),
      P.proof({ label: "(c)", marks: 2, stem: t`Show that $\dfrac{dr}{dt}$ is inversely proportional to $r$, and explain what this means as the patch grows.`,
        points: [t`M1 obtains $\dfrac{dr}{dt} = \dfrac{15}{2\pi r}$, i.e. $\dfrac{k}{r}$ with $k = \dfrac{15}{2\pi}$`, "A1 states that the radius grows more and more slowly as the patch gets bigger"],
        modelAnswer: ["$$", t`\frac{dr}{dt} = \frac{dA/dt}{dA/dr} = \frac{15}{2\pi r}`, "$$", "", "This is a constant divided by r, so the rate is inversely proportional to r: the larger the patch, the more slowly its radius increases."].join("\n"),
        explanation: "A constant area rate spread around a longer and longer edge means the edge moves outwards more slowly." }),
    ],
    explanation: t`Connected rates: $\dfrac{dA}{dt} = \dfrac{dA}{dr}\dfrac{dr}{dt}$ links the given area rate to the radius rate.`,
    hints: ["Use A = πr².", "dr/dt = (dA/dt) ÷ (dA/dr)."],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 2, calculator: false,
    stem: t`The volume $V$ m$^3$ of water in a Masvingo reservoir satisfies $\dfrac{dV}{dt} = -40$ at noon, with $t$ in hours. Farai says "the reservoir holds $-40$ m$^3$ at noon". Explain his error and what the value means.`,
    points: ["States that −40 is a rate of change, not an amount of water", "Interprets it: at noon the volume is decreasing at 40 m³ per hour"],
    modelAnswer: "dV/dt is the rate of change of the volume, not the volume itself. The value −40 means that at noon the amount of water is falling at 40 cubic metres per hour.",
    explanation: "A derivative with respect to time is a rate; its sign shows whether the quantity is increasing or decreasing.",
    hints: ["What does dV/dt measure?"],
  });

  b.card("FORMULA", "Tangent at (x₁, y₁)", t`$y - y_{1} = m(x - x_{1})$ with $m = \dfrac{dy}{dx}$ evaluated at $x_{1}$`);
  b.card("FORMULA", "Normal at (x₁, y₁)", t`$y - y_{1} = -\dfrac{1}{m}(x - x_{1})$`, "Negative reciprocal of the tangent gradient.");
  b.card("DEFINITION", "Increasing function", t`$f'(x) > 0$ on the interval: the graph rises from left to right.`);
  b.card("DEFINITION", "Decreasing function", t`$f'(x) < 0$ on the interval: the graph falls from left to right.`);
  b.card("FORMULA", "Connected rates of change", t`$\dfrac{dA}{dt} = \dfrac{dA}{dr} \times \dfrac{dr}{dt}$`);
  b.card("CONCEPT", "Method for connected rates", "Write the given rate, the required rate and a formula linking the variables; differentiate the formula; combine with the chain rule; substitute last.");
  b.card("FACT", "Normal where the tangent is horizontal", t`It is the vertical line $x = x_{1}$.`);
  b.card("CONCEPT", "Showing f is increasing for all x", t`Show $f'(x) > 0$ for every $x$, e.g. by completing the square: $3(x + 1)^{2} + 2 > 0$.`);
});
