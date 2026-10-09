// W3a exam-format items, ZIMSEC Paper 1 (pure): 2 x Section A (13 marks) and 3 x Section B (12 marks) on differentiation.
// Every value is computed and checked below.
import { concept, P, t, chk, same, checkDeriv, quad, sfStr, ZIM } from "../lib.mjs";

const Q = (k) => `amath.calculus.${k}`;
const PI = Math.PI;

concept(Q("differentiating-powers"), { file: "exam/w3a-zimsec", keyPrefix: "exam.w3a-zimsec", applies: ZIM }, (b) => {
  // Z1 (13, Section A): first principles and the rules of differentiation
  {
    const f = (x) => 3 * x * x - x;
    for (const x of [-1, 2]) for (const h of [0.3, 0.001]) chk((f(x + h) - f(x)) / h, 6 * x + 3 * h - 1, 1e-9);
    checkDeriv((x) => (2 * x - 3) ** 5, (x) => 10 * (2 * x - 3) ** 4, [1, 2.5]);
    checkDeriv((x) => Math.exp(3 * x) / x, (x) => (Math.exp(3 * x) * (3 * x - 1)) / (x * x), [0.5, 1.2]);
    checkDeriv((x) => 4 * Math.sin(2 * x), (x) => 8 * Math.cos(2 * x), [0.3, 1]);
    chk(8 * Math.cos(PI / 3), 4);
    const f2 = (x) => 6 * x - 10;
    checkDeriv((x) => x ** 3 - 5 * x * x, (x) => 3 * x * x - 10 * x, [1, 3]);
    checkDeriv((x) => 3 * x * x - 10 * x, f2, [1, 3]);
    b.struct({
      d: 4, marks: 13, secs: 90 * 13, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
      concepts: [Q("derivative-idea"), Q("chain-rule"), Q("product-quotient"), Q("trig-exp-log"), Q("differentiating-powers")],
      stem: "Answer all parts of this question.",
      parts: [
        P.proof({ label: "(a)", marks: 3, stem: t`Find, from first principles, the derivative of $y = 3x^2 - x$.`,
          points: [t`M1 writes $f(x + h) - f(x) = 3(x + h)^2 - (x + h) - (3x^2 - x) = 6xh + 3h^2 - h$.`, t`M1 divides by $h$: $6x + 3h - 1$.`, t`A1 lets $h \to 0$: $\frac{dy}{dx} = 6x - 1$.`],
          modelAnswer: t`$$
f(x + h) - f(x) = 3x^2 + 6xh + 3h^2 - x - h - 3x^2 + x = 6xh + 3h^2 - h
$$

$$
\frac{f(x + h) - f(x)}{h} = 6x + 3h - 1 \to 6x - 1 \text{ as } h \to 0
$$`,
          explanation: "Expand, subtract, divide by h, then let h tend to 0." }),
        P.group({ label: "(b)", stem: "Differentiate with respect to x:", parts: [
          P.fib({ label: "(i)", marks: 2, stem: t`$(2x - 3)^5$, giving the answer in the form $k(2x - 3)^n$,`, template: "k = {{blank:k}}, n = {{blank:n}}",
            blanks: [{ id: "k", input: "number", accepted: [10], wrong: "5" }, { id: "n", input: "number", accepted: [4], wrong: "5" }],
            explanation: t`$5(2x - 3)^4 \times 2 = 10(2x - 3)^4$.` }),
          P.fib({ label: "(ii)", marks: 3, stem: t`$\dfrac{\mathrm{e}^{3x}}{x}$, giving the answer in the form $\dfrac{\mathrm{e}^{3x}(ax + b)}{x^2}$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
            blanks: [{ id: "a", input: "number", accepted: [3], marks: 2, wrong: "1" }, { id: "b", input: "number", accepted: [-1], wrong: "1" }],
            explanation: t`Quotient rule: $\frac{x \cdot 3\mathrm{e}^{3x} - \mathrm{e}^{3x} \cdot 1}{x^2} = \frac{\mathrm{e}^{3x}(3x - 1)}{x^2}$.` }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the gradient of the curve $y = 4\sin 2x$ at the point where $x = \dfrac{\pi}{6}$.`, value: 4, wrong: [2],
          explanation: t`$\frac{dy}{dx} = 8\cos 2x = 8\cos\frac{\pi}{3} = 4$.` }),
        P.num({ label: "(d)", marks: 3, stem: t`Given $y = x^3 - 5x^2$, find the value of $\dfrac{d^2y}{dx^2}$ when $x = 2$.`, value: f2(2), wrong: [-8, -12],
          explanation: t`$\frac{dy}{dx} = 3x^2 - 10x$, $\frac{d^2y}{dx^2} = 6x - 10 = 2$ at $x = 2$. The value $-8$ is $\frac{dy}{dx}$ at $x = 2$.` }),
      ],
      explanation: "First principles, the chain and quotient rules, trigonometric derivatives in radians and second derivatives.",
      hints: [t`$(x + h)^2 = x^2 + 2xh + h^2$.`, t`$\frac{d}{dx}\mathrm{e}^{3x} = 3\mathrm{e}^{3x}$.`, t`$\cos\frac{\pi}{3} = \frac{1}{2}$.`],
    });
  }

  // Z2 (13, Section A): tangent, normal, area and small increments
  {
    const f = (x) => x ** 3 - 3 * x + 4, fp = (x) => 3 * x * x - 3;
    checkDeriv(f, fp, [1, 2]);
    chk(f(2), 6); chk(fp(2), 9);
    // tangent y = 9x - 12 ; normal x + 9y = 56
    chk(9 * 2 - 12, 6); chk(2 + 9 * 6, 56);
    const A = 12 / 9, B = 56;
    const area = 0.5 * (B - A) * 6;
    chk(area, 164);
    same(quad.roots(3, 0, -12), [-2, 2]); chk(f(-2), 2);
    chk(9 * 0.05, 0.45);
    b.struct({
      d: 4, marks: 13, secs: 90 * 13, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
      concepts: [Q("tangents-normals"), Q("small-increments"), Q("differentiating-powers")],
      stem: t`The point $P(2, 6)$ lies on the curve $y = x^3 - 3x + 4$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Find the gradient of the curve at $P$.`, value: 9, wrong: [6], explanation: t`$\frac{dy}{dx} = 3x^2 - 3 = 9$ at $x = 2$.` }),
        P.fib({ label: "(b)", marks: 2, stem: t`Find the equation of the tangent at $P$ in the form $y = mx + c$.`, template: "m = {{blank:m}}, c = {{blank:c}}",
          blanks: [{ id: "m", input: "number", accepted: [9], wrong: "6" }, { id: "c", input: "number", accepted: [-12], wrong: "6" }],
          explanation: t`$y - 6 = 9(x - 2)$, so $y = 9x - 12$.` }),
        P.fib({ label: "(c)", marks: 3, stem: t`Find the equation of the normal at $P$ in the form $x + ay = b$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [9], marks: 1, wrong: "-9" }, { id: "b", input: "number", accepted: [56], marks: 2, wrong: "52" }],
          explanation: t`Normal gradient $-\frac{1}{9}$: $y - 6 = -\frac{1}{9}(x - 2)$, so $9y - 54 = -x + 2$ and $x + 9y = 56$.` }),
        P.num({ label: "(d)", marks: 3, stem: t`The tangent and the normal at $P$ meet the $x$-axis at $A$ and $B$. Find the area of triangle $APB$.`, value: area, unit: "units²", wrong: [328, 162],
          explanation: t`$A = \left(\frac{4}{3}, 0\right)$ from $9x - 12 = 0$; $B = (56, 0)$. $AB = 56 - \frac{4}{3} = \frac{164}{3}$, height 6. Area $= \frac{1}{2} \times \frac{164}{3} \times 6 = 164$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`Use calculus to estimate the change in $y$ when $x$ increases from 2 to 2.05.`, value: 0.45, wrong: [6.45],
          explanation: t`$\delta y \approx 9 \times 0.05 = 0.45$.` }),
        P.fib({ label: "(f)", marks: 2, stem: t`Find the coordinates of the other point on the curve at which the tangent is parallel to the tangent at $P$.`, template: "({{blank:x}}, {{blank:y}})",
          blanks: [{ id: "x", input: "number", accepted: [-2], wrong: "2" }, { id: "y", input: "number", accepted: [2], wrong: "6" }],
          explanation: t`$3x^2 - 3 = 9$ gives $x = \pm 2$; at $x = -2$, $y = -8 + 6 + 4 = 2$.` }),
      ],
      explanation: "The gradient at P gives the tangent; its negative reciprocal gives the normal; the x-intercepts give the base of the triangle, and the same gradient gives the small-increment estimate.",
      hints: ["Normal gradient = −1 ÷ 9.", "The height of the triangle is the y-coordinate of P.", t`$\delta y \approx \frac{dy}{dx}\,\delta x$.`],
    });
  }

  // Z3 (12, Section B): stationary points of a cubic
  {
    const f = (x) => 2 * x ** 3 - 3 * x * x - 12 * x + 7, fp = (x) => 6 * x * x - 6 * x - 12, f2 = (x) => 12 * x - 6;
    checkDeriv(f, fp, [0.5, 3]); checkDeriv(fp, f2, [0.5, 3]);
    same(quad.roots(6, -6, -12), [-1, 2]);
    same([f(-1), f(2), f2(-1), f2(2)], [14, -13, -18, 18]);
    b.struct({
      d: 4, marks: 12, secs: 90 * 12, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
      concepts: [Q("stationary-points"), Q("differentiating-powers")],
      stem: t`A curve has equation $y = 2x^3 - 3x^2 - 12x + 7$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find $\dfrac{dy}{dx}$ in the form $ax^2 + bx + c$.`, template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
          blanks: [{ id: "a", input: "number", accepted: [6], wrong: "2" }, { id: "b", input: "number", accepted: [-6], wrong: "-3" }, { id: "c", input: "number", accepted: [-12], wrong: "7" }],
          explanation: t`$\frac{dy}{dx} = 6x^2 - 6x - 12$.` }),
        P.fib({ label: "(b)", marks: 2, stem: "Find the x-coordinates of the stationary points, in ascending order.", template: "x = {{blank:a}} and x = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [-1], wrong: "1" }, { id: "b", input: "number", accepted: [2], wrong: "-2" }],
          explanation: t`$6(x^2 - x - 2) = 6(x - 2)(x + 1) = 0$.` }),
        P.fib({ label: "(c)", marks: 2, stem: "Find the corresponding y-coordinates.", template: "at x = −1: y = {{blank:a}}; at x = 2: y = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [14], wrong: "0" }, { id: "b", input: "number", accepted: [-13], wrong: "0" }],
          explanation: t`$y(-1) = -2 - 3 + 12 + 7 = 14$; $y(2) = 16 - 12 - 24 + 7 = -13$.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Determine the nature of each stationary point, showing your reasoning.",
          points: [t`Finds $\frac{d^2y}{dx^2} = 12x - 6$.`, t`At $x = -1$: $-18 < 0$, so $(-1, 14)$ is a maximum.`, t`At $x = 2$: $18 > 0$, so $(2, -13)$ is a minimum.`],
          modelAnswer: "d²y/dx² = 12x − 6. At x = −1 it equals −18 < 0, so (−1, 14) is a maximum. At x = 2 it equals 18 > 0, so (2, −13) is a minimum.",
          explanation: "Second-derivative test with reasons." }),
        P.fib({ label: "(e)", marks: 2, stem: "Hence state the set of values of x for which y is decreasing, in the form p < x < q.", template: "{{blank:p}} < x < {{blank:q}}",
          blanks: [{ id: "p", input: "number", accepted: [-1], wrong: "-13" }, { id: "q", input: "number", accepted: [2], wrong: "14" }],
          explanation: "Between the maximum at x = −1 and the minimum at x = 2 the gradient is negative." }),
        P.num({ label: "(f)", marks: 1, stem: t`Hence state the number of real roots of $2x^3 - 3x^2 - 12x + 7 = 0$.`, value: 3, wrong: [2],
          explanation: "The maximum (y = 14) is above the x-axis and the minimum (y = −13) below it, so the curve crosses the axis three times." }),
      ],
      explanation: "Differentiate, solve dy/dx = 0, classify with the second derivative, and use the shape of the cubic.",
      hints: ["Take out the common factor 6.", "y decreases between a maximum and the following minimum."],
    });
  }

  // Z4 (12, Section B): connected rates of change in a conical tank
  {
    // radius 3 m, height 4 m, vertex down: r = 3h/4, V = 3 pi h^3 / 16
    for (const h of [1, 2.5]) chk((1 / 3) * PI * ((3 * h) / 4) ** 2 * h, (3 * PI * h ** 3) / 16);
    const dVdh = (h) => (9 * PI * h * h) / 16;
    checkDeriv((h) => (3 * PI * h ** 3) / 16, dVdh, [1, 2]);
    chk(dVdh(2), (9 * PI) / 4);
    const dhdt = 0.5 / dVdh(2);
    chk(dhdt, 2 / (9 * PI));
    const dAdh = (h) => (9 * PI * h) / 8;
    checkDeriv((h) => (9 * PI * h * h) / 16, dAdh, [1, 2]);
    const dAdt = dAdh(2) * dhdt;
    chk(dAdt, 0.5);
    const dV = dVdh(2) * 0.04;
    chk(dV, 0.09 * PI);
    b.struct({
      d: 5, marks: 12, secs: 90 * 12, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 1",
      concepts: [Q("rates-of-change"), Q("small-increments")],
      stem: t`A water tank in Masvingo is an inverted right circular cone with base radius 3 m and height 4 m, vertex at the bottom. Water is pumped in at a constant rate of 0.5 m³ per minute. When the depth of water is $h$ m, the radius of the water surface is $r$ m.`,
      parts: [
        P.proof({ label: "(a)", marks: 3, stem: t`Show that the volume of water is $V = \dfrac{3\pi h^3}{16}$.`,
          points: [t`M1 uses similar triangles: $\frac{r}{h} = \frac{3}{4}$.`, t`M1 substitutes $r = \frac{3h}{4}$ into $V = \frac{1}{3}\pi r^2 h$.`, t`A1 simplifies to $\frac{3\pi h^3}{16}$.`],
          modelAnswer: t`$$
\frac{r}{h} = \frac{3}{4} \Rightarrow r = \frac{3h}{4}
$$

$$
V = \frac{1}{3}\pi\left(\frac{3h}{4}\right)^2 h = \frac{1}{3}\pi \cdot \frac{9h^2}{16} \cdot h = \frac{3\pi h^3}{16}
$$`,
          explanation: "Similar triangles, then the cone formula." }),
        P.expr({ label: "(b)", marks: 2, stem: t`Find the exact value of $\dfrac{dV}{dh}$ when $h = 2$. Type it in terms of π, for example 5π/3.`, accepted: ["9π/4", "9pi/4", "2.25π", "2.25pi", "(9/4)π"],
          wrong: ["3π/2"], explanation: t`$\frac{dV}{dh} = \frac{9\pi h^2}{16} = \frac{36\pi}{16} = \frac{9\pi}{4}$.` }),
        P.num({ label: "(c)", marks: 3, stem: "Find the rate at which the depth is increasing when h = 2, correct to 3 significant figures.", value: dhdt, wrong: [sfStr(0.5 * dVdh(2))],
          explanation: t`$\frac{dh}{dt} = \frac{0.5}{9\pi/4} = \frac{2}{9\pi} = ${sfStr(dhdt)}$ m per minute.` }),
        P.num({ label: "(d)", marks: 3, stem: "Find the rate at which the area of the water surface is increasing at the same instant, in m² per minute.", value: dAdt, wrong: [sfStr(dAdh(2))],
          explanation: t`$A = \pi r^2 = \frac{9\pi h^2}{16}$, $\frac{dA}{dh} = \frac{9\pi h}{8} = \frac{9\pi}{4}$ at $h = 2$. $\frac{dA}{dt} = \frac{9\pi}{4} \times \frac{2}{9\pi} = 0.5$ m² per minute.` }),
        P.num({ label: "(e)", marks: 1, stem: "Use calculus to estimate the increase in volume when the depth increases from 2 m to 2.04 m, correct to 3 significant figures.", value: dV, unit: "m³", wrong: [0.09],
          explanation: t`$\delta V \approx \frac{9\pi}{4} \times 0.04 = 0.09\pi = ${sfStr(dV)}$ m³.` }),
      ],
      explanation: "Similar triangles give V and A in terms of h; the chain rule links each rate to dh/dt.",
      hints: [t`$\frac{dh}{dt} = \frac{dV/dt}{dV/dh}$.`, t`$\frac{dA}{dt} = \frac{dA}{dh} \times \frac{dh}{dt}$.`],
    });
  }

  // Z5 (12, Section B): product rule with an exponential, stationary point and tangent
  {
    const f = (x) => (x - 1) * Math.exp(2 * x), fp = (x) => (2 * x - 1) * Math.exp(2 * x), f2 = (x) => 4 * x * Math.exp(2 * x);
    checkDeriv(f, fp, [0.2, 1]); checkDeriv(fp, f2, [0.2, 1]);
    chk(f(0.5), -Math.E / 2); chk(f2(0.5), 2 * Math.E);
    chk(f(0), -1); chk(fp(0), -1);
    b.struct({
      d: 4, marks: 12, secs: 90 * 12, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
      concepts: [Q("product-quotient"), Q("trig-exp-log"), Q("stationary-points"), Q("tangents-normals")],
      stem: t`The function $f$ is defined by $f(x) = (x - 1)\mathrm{e}^{2x}$.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that $f'(x) = (2x - 1)\mathrm{e}^{2x}$.`,
          points: [t`M1 uses the product rule: $(x - 1) \cdot 2\mathrm{e}^{2x} + \mathrm{e}^{2x} \cdot 1$.`, t`A1 factorises to $(2x - 1)\mathrm{e}^{2x}$.`],
          modelAnswer: t`$$
f'(x) = (x - 1) \cdot 2\mathrm{e}^{2x} + \mathrm{e}^{2x} = \mathrm{e}^{2x}(2x - 2 + 1) = (2x - 1)\mathrm{e}^{2x}
$$`,
          explanation: "Product rule, then factorise." }),
        P.num({ label: "(b)", marks: 2, stem: "Find the x-coordinate of the stationary point of the curve y = f(x).", value: 0.5, prefix: "x =", wrong: [1],
          explanation: t`$\mathrm{e}^{2x} > 0$, so $2x - 1 = 0$ and $x = \frac{1}{2}$.` }),
        P.expr({ label: "(c)", marks: 2, stem: "Find the exact y-coordinate of the stationary point. Type it in terms of e, for example -e/3.", accepted: ["-e/2", "-0.5e", "-(1/2)e", "-1/2e", "y=-e/2"],
          wrong: ["e/2"], explanation: t`$f\left(\frac{1}{2}\right) = -\frac{1}{2}\mathrm{e}^{1} = -\frac{\mathrm{e}}{2}$.` }),
        P.fib({ label: "(d)", marks: 2, stem: t`Find $f''(x)$ in the form $kx\mathrm{e}^{2x}$.`, template: "k = {{blank:k}}",
          blanks: [{ id: "k", input: "number", accepted: [4], wrong: "2" }],
          explanation: t`$f''(x) = 2\mathrm{e}^{2x} + (2x - 1)2\mathrm{e}^{2x} = 4x\mathrm{e}^{2x}$.` }),
        P.mcq({ label: "(e)", marks: 1, stem: "What is the nature of the stationary point?",
          options: [
            [t`A minimum, as $f''\left(\frac{1}{2}\right) = 2\mathrm{e} > 0$`, t`Correct: $4 \times \frac{1}{2} \times \mathrm{e} = 2\mathrm{e}$.`],
            [t`A maximum, as $f''\left(\frac{1}{2}\right) = 2\mathrm{e} > 0$`, "A positive second derivative means a minimum."],
            [t`A maximum, as $f''\left(\frac{1}{2}\right) = -2\mathrm{e} < 0$`, t`$4x\mathrm{e}^{2x}$ is positive at $x = \frac{1}{2}$.`],
            [t`A minimum, as $f\left(\frac{1}{2}\right) = -\frac{\mathrm{e}}{2} < 0$`, "The sign of y does not determine the nature."],
          ], answer: "A", explanation: t`$f''\left(\frac{1}{2}\right) = 2\mathrm{e} > 0$: minimum.` }),
        P.fib({ label: "(f)", marks: 3, stem: t`Find the equation of the tangent to $y = f(x)$ at the point where it crosses the $y$-axis, in the form $y = mx + c$.`, template: "m = {{blank:m}}, c = {{blank:c}}",
          blanks: [{ id: "m", input: "number", accepted: [-1], marks: 2, wrong: "1" }, { id: "c", input: "number", accepted: [-1], wrong: "0" }],
          explanation: t`At $x = 0$: $f(0) = -1$ and $f'(0) = (0 - 1)\mathrm{e}^0 = -1$. Tangent: $y + 1 = -1(x - 0)$, so $y = -x - 1$.` }),
      ],
      explanation: "Product rule with an exponential factor, which is never zero; then the second derivative and a tangent.",
      hints: [t`$\frac{d}{dx}\mathrm{e}^{2x} = 2\mathrm{e}^{2x}$.`, t`$\mathrm{e}^{2x}$ is never zero.`],
    });
  }
});
