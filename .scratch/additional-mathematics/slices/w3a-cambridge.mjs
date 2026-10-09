// W3a exam-format items, Cambridge 0606: 4 x Paper 1 (8 marks, no calculator) and 3 x Paper 2 (10 marks, calculator)
// on differentiation. Every value is computed and checked below.
import { concept, P, t, chk, checkDeriv, sfStr, CAM } from "../lib.mjs";

const Q = (k) => `amath.calculus.${k}`;
const PI = Math.PI;

concept(Q("product-quotient"), { file: "exam/w3a-cambridge", keyPrefix: "exam.w3a-cambridge", applies: CAM }, (b) => {
  // C1 (8, Paper 1): quotient rule and a normal
  {
    const f = (x) => (3 * x - 2) / (x * x + 2);
    const fp = (x) => (-3 * x * x + 4 * x + 6) / (x * x + 2) ** 2;
    checkDeriv(f, fp, [-1, 0.5, 2]);
    chk(f(0), -1); chk(fp(0), 1.5);
    // normal at (0, -1): gradient -2/3 -> 2x + 3y + 3 = 0 ; x-intercept -1.5
    chk(2 * 0 + 3 * -1 + 3, 0); chk(-3 / 2, -1.5);
    b.struct({
      d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
      concepts: [Q("product-quotient"), Q("tangents-normals")],
      stem: t`A curve has equation $y = \dfrac{3x - 2}{x^2 + 2}$.`,
      parts: [
        P.fib({ label: "(a)", marks: 3, stem: t`Find $\dfrac{dy}{dx}$ in the form $\dfrac{ax^2 + bx + c}{(x^2 + 2)^2}$.`, template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
          blanks: [{ id: "a", input: "number", accepted: [-3], wrong: "3" }, { id: "b", input: "number", accepted: [4], wrong: "-4" }, { id: "c", input: "number", accepted: [6], wrong: "-6" }],
          explanation: t`$\frac{(x^2 + 2)(3) - (3x - 2)(2x)}{(x^2 + 2)^2} = \frac{3x^2 + 6 - 6x^2 + 4x}{(x^2 + 2)^2} = \frac{-3x^2 + 4x + 6}{(x^2 + 2)^2}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Find the gradient of the curve where it crosses the y-axis.", value: 1.5, wrong: [-1],
          explanation: t`At $x = 0$: $\frac{6}{4} = \frac{3}{2}$.` }),
        P.fib({ label: "(c)", marks: 2, stem: t`Find the equation of the normal to the curve at the point where it crosses the $y$-axis, in the form $2x + ay + b = 0$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [3], wrong: "-3" }, { id: "b", input: "number", accepted: [3], wrong: "-3" }],
          explanation: t`The point is $(0, -1)$; normal gradient $-\frac{2}{3}$. $y + 1 = -\frac{2}{3}x$, so $3y + 3 = -2x$ and $2x + 3y + 3 = 0$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Find the x-coordinate of the point where this normal meets the x-axis.", value: -1.5, prefix: "x =", wrong: [1.5],
          explanation: t`$y = 0$: $2x + 3 = 0$, so $x = -\frac{3}{2}$.` }),
      ],
      explanation: "Quotient rule with the numerator simplified, then the normal at the y-intercept.",
      hints: [t`$u = 3x - 2$, $v = x^2 + 2$.`, "The normal's gradient is the negative reciprocal of 3/2."],
    });
  }

  // C2 (8, Paper 1): chain rule and small increments
  {
    const fp = (x) => -4 * (2 * x + 1) ** -1.5;
    checkDeriv((x) => 4 / Math.sqrt(2 * x + 1), fp, [0.5, 4]);
    chk(fp(4), -4 / 27);
    const dy = fp(4) * 0.27;
    chk(dy, -0.04);
    b.struct({
      d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
      concepts: [Q("chain-rule"), Q("small-increments")],
      stem: t`It is given that $y = \dfrac{4}{\sqrt{2x + 1}}$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find $\dfrac{dy}{dx}$ in the form $k(2x + 1)^n$.`, template: "k = {{blank:k}}, n = {{blank:n}}",
          blanks: [{ id: "k", input: "number", accepted: [-4], wrong: "-2" }, { id: "n", input: "number", accepted: [-1.5], wrong: "-0.5" }],
          explanation: t`$y = 4(2x + 1)^{-\frac{1}{2}}$; $\frac{dy}{dx} = 4 \times \left(-\frac{1}{2}\right)(2x + 1)^{-\frac{3}{2}} \times 2 = -4(2x + 1)^{-\frac{3}{2}}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the exact value of dy/dx when x = 4. You may type a fraction.", value: -4 / 27, wrong: [-2 / 27, 4 / 27],
          explanation: t`$(2(4) + 1)^{-\frac{3}{2}} = 9^{-\frac{3}{2}} = \frac{1}{27}$, so $\frac{dy}{dx} = -\frac{4}{27}$.` }),
        P.expr({ label: "(c)", marks: 2, stem: t`Find, in terms of $p$, the approximate change in $y$ as $x$ increases from 4 to $4 + p$, where $p$ is small. Type it, for example -2p/9.`, accepted: ["-4p/27", "-(4/27)p", "-4/27p", "-(4p)/27"],
          wrong: ["4p/27"], explanation: t`$\delta y \approx -\frac{4}{27}p$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Hence find the approximate change in y when x increases from 4 to 4.27.", value: dy, wrong: [0.04],
          explanation: t`$p = 0.27$: $\delta y \approx -\frac{4}{27} \times 0.27 = -0.04$.` }),
      ],
      explanation: "Rewrite the root as a power, use the chain rule, and multiply the gradient by the small change.",
      hints: [t`$9^{\frac{3}{2}} = 27$.`, t`$\delta y \approx \frac{dy}{dx}\,\delta x$.`],
    });
  }

  // C3 (8, Paper 1): practical maximum
  {
    const V = (x) => (75 * x - x ** 3) / 2;
    for (const x of [2, 4]) chk(x * x * ((150 - 2 * x * x) / (4 * x)), V(x));
    checkDeriv(V, (x) => (75 - 3 * x * x) / 2, [2, 6]);
    chk((75 - 3 * 25) / 2, 0); chk(V(5), 125); chk(-3 * 5, -15);
    b.struct({
      d: 4, marks: 8, secs: 90 * 8, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
      concepts: [Q("max-min-problems"), Q("stationary-points")],
      stem: t`A closed box is a cuboid with a square base of side $x$ cm and height $h$ cm. Its total surface area is 150 cm².`,
      parts: [
        P.proof({ label: "(a)", marks: 3, stem: t`Show that the volume of the box is $V = \dfrac{75x - x^3}{2}$.`,
          points: [t`M1 writes $2x^2 + 4xh = 150$.`, t`M1 rearranges: $h = \frac{150 - 2x^2}{4x}$.`, t`A1 substitutes into $V = x^2h$ to reach the given result.`],
          modelAnswer: t`$$
2x^2 + 4xh = 150 \Rightarrow h = \frac{150 - 2x^2}{4x}
$$

$$
V = x^2 h = \frac{x(150 - 2x^2)}{4} = \frac{150x - 2x^3}{4} = \frac{75x - x^3}{2}
$$`,
          explanation: "Two square faces and four rectangular faces." }),
        P.num({ label: "(b)", marks: 2, stem: "Find the value of x for which V is stationary.", value: 5, prefix: "x =", wrong: [25],
          explanation: t`$\frac{dV}{dx} = \frac{75 - 3x^2}{2} = 0$ gives $x^2 = 25$, $x = 5$ ($x > 0$).` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the value of $\dfrac{d^2V}{dx^2}$ at this value of $x$, and hence show that $V$ is a maximum.`, value: -15, wrong: [15],
          explanation: t`$\frac{d^2V}{dx^2} = -3x = -15 < 0$, so a maximum.` }),
        P.num({ label: "(d)", marks: 1, stem: "Find the maximum volume.", value: V(5), unit: "cm³", wrong: [5],
          explanation: t`$V = \frac{375 - 125}{2} = 125$ cm³ (the box is a cube of side 5 cm).` }),
      ],
      explanation: "Use the surface area to eliminate h, differentiate, and justify the maximum.",
      hints: [t`Surface area: $2x^2 + 4xh$.`, "Reject the negative root."],
    });
  }

  // C4 (8, Paper 1): stationary point of a trigonometric-exponential curve
  {
    const f = (x) => Math.exp(x) * Math.cos(x);
    const fp = (x) => Math.exp(x) * (Math.cos(x) - Math.sin(x));
    const f2 = (x) => -2 * Math.exp(x) * Math.sin(x);
    checkDeriv(f, fp, [0.3, 1.5, 2.5]); checkDeriv(fp, f2, [0.3, 1.5, 2.5]);
    chk(fp(PI / 4), 0, 1e-12); chk(fp(0), 1);
    chk(f2(PI / 4) < 0 ? 1 : 0, 1);
    b.struct({
      d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
      concepts: [Q("trig-exp-log"), Q("stationary-points"), Q("product-quotient")],
      stem: t`The curve $y = \mathrm{e}^x\cos x$ is defined for $0 \leq x \leq \pi$, with $x$ in radians.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find $\dfrac{dy}{dx}$ in the form $\mathrm{e}^x(a\cos x + b\sin x)$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [1], wrong: "-1" }, { id: "b", input: "number", accepted: [-1], wrong: "1" }],
          explanation: t`Product rule: $\mathrm{e}^x\cos x + \mathrm{e}^x(-\sin x) = \mathrm{e}^x(\cos x - \sin x)$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Find the gradient of the curve at the point where x = 0.", value: 1, wrong: [0],
          explanation: t`$\mathrm{e}^0(1 - 0) = 1$.` }),
        P.expr({ label: "(c)", marks: 2, stem: "Find the exact x-coordinate of the stationary point. Type it in terms of π, for example π/6.", accepted: ["π/4", "pi/4", "x=π/4", "x=pi/4", "0.25π", "(1/4)π"],
          wrong: ["3π/4"], explanation: t`$\mathrm{e}^x \neq 0$, so $\cos x = \sin x$, $\tan x = 1$ and $x = \frac{\pi}{4}$ in the interval.` }),
        P.fib({ label: "(d)", marks: 2, stem: t`Find $\dfrac{d^2y}{dx^2}$ in the form $k\mathrm{e}^x\sin x$.`, template: "k = {{blank:k}}",
          blanks: [{ id: "k", input: "number", accepted: [-2], wrong: "2" }],
          explanation: t`$\mathrm{e}^x(\cos x - \sin x) + \mathrm{e}^x(-\sin x - \cos x) = -2\mathrm{e}^x\sin x$.` }),
        P.mcq({ label: "(e)", marks: 1, stem: "What is the nature of the stationary point?",
          options: [
            [t`A maximum, as $-2\mathrm{e}^{\frac{\pi}{4}}\sin\frac{\pi}{4} < 0$`, "Correct: the second derivative is negative there."],
            [t`A minimum, as $-2\mathrm{e}^{\frac{\pi}{4}}\sin\frac{\pi}{4} < 0$`, "A negative second derivative means a maximum."],
            [t`A minimum, as $\mathrm{e}^{\frac{\pi}{4}}\cos\frac{\pi}{4} > 0$`, "The sign of y does not determine the nature."],
            [t`A maximum, as $\mathrm{e}^{\frac{\pi}{4}}\cos\frac{\pi}{4} > 0$`, "The conclusion is right but the reason is not: the sign of y is irrelevant."],
          ], answer: "A", explanation: t`$\frac{d^2y}{dx^2} = -2\mathrm{e}^{\frac{\pi}{4}} \cdot \frac{\sqrt{2}}{2} = -\sqrt{2}\mathrm{e}^{\frac{\pi}{4}} < 0$: a maximum.` }),
      ],
      explanation: "Product rule with exponential and trigonometric factors; e^x is never zero, so the stationary point comes from tan x = 1.",
      hints: [t`$\frac{d}{dx}\cos x = -\sin x$.`, t`$\tan\frac{\pi}{4} = 1$.`],
    });
  }

  // D1 (10, Paper 2): connected rates of change for a sphere
  {
    const drdt = 50 / (4 * PI * 64);
    chk(drdt, 50 / (256 * PI));
    const dSdt = 8 * PI * 8 * drdt;
    chk(dSdt, 12.5);
    for (const r of [3, 10]) chk(8 * PI * r * (50 / (4 * PI * r * r)), 100 / r);
    const tt = ((4 / 3) * PI * 512) / 50;
    b.struct({
      d: 4, marks: 10, secs: 90 * 10, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 2",
      concepts: [Q("rates-of-change")],
      stem: t`Air is pumped into a spherical balloon at a constant rate of 50 cm³/s. The balloon is empty at time $t = 0$. ($V = \frac{4}{3}\pi r^3$, $S = 4\pi r^2$.)`,
      parts: [
        P.num({ label: "(a)", marks: 3, stem: "Find the rate at which the radius is increasing when the radius is 8 cm.", value: drdt, unit: "cm/s", wrong: [sfStr(50 / (PI * 64))],
          explanation: t`$\frac{dV}{dr} = 4\pi r^2 = 256\pi$. $\frac{dr}{dt} = \frac{50}{256\pi} = ${sfStr(drdt)}$ cm/s.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find the rate at which the surface area is increasing at the same instant.", value: dSdt, unit: "cm²/s", wrong: [sfStr(4 * PI * 64 * drdt)],
          explanation: t`$\frac{dS}{dr} = 8\pi r = 64\pi$. $\frac{dS}{dt} = 64\pi \times \frac{50}{256\pi} = 12.5$ cm²/s.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the radius at the instant when the surface area is increasing at 4 cm²/s.", value: 25, unit: "cm", prefix: "r =", wrong: [12.5],
          explanation: t`In general $\frac{dS}{dt} = 8\pi r \times \frac{50}{4\pi r^2} = \frac{100}{r}$. $\frac{100}{r} = 4$ gives $r = 25$ cm.` }),
        P.num({ label: "(d)", marks: 2, stem: "Find the time taken for the radius to reach 8 cm.", value: tt, unit: "s", wrong: [sfStr((4 * PI * 64) / 50)],
          explanation: t`$V = \frac{4}{3}\pi(8)^3 = ${sfStr((4 / 3) * PI * 512, 4)}$ cm³; at 50 cm³/s this takes $${sfStr(tt)}$ s.` }),
      ],
      explanation: "Link each rate through the radius: dr/dt = (dV/dt) ÷ (dV/dr), then dS/dt = (dS/dr)(dr/dt).",
      hints: [t`$\frac{dV}{dr} = 4\pi r^2$, $\frac{dS}{dr} = 8\pi r$.`, "Write dS/dt in terms of r for part (c)."],
    });
  }

  // D2 (10, Paper 2): minimum surface area of an open cylinder
  {
    const S = (r) => PI * r * r + 2000 / r;
    const Sp = (r) => 2 * PI * r - 2000 / (r * r), Spp = (r) => 2 * PI + 4000 / r ** 3;
    checkDeriv(S, Sp, [3, 7]); checkDeriv(Sp, Spp, [3, 7]);
    const r = Math.cbrt(1000 / PI);
    chk(Sp(r), 0, 1e-9); chk(Spp(r), 6 * PI, 1e-9);
    const h = 1000 / (PI * r * r);
    chk(h, r, 1e-9);
    b.struct({
      d: 4, marks: 10, secs: 90 * 10, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
      concepts: [Q("max-min-problems"), Q("stationary-points")],
      stem: t`A cylindrical water container, open at the top, is to hold 1000 cm³. Its radius is $r$ cm and its height is $h$ cm.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that the area of material used is $S = \pi r^2 + \dfrac{2000}{r}$.`,
          points: [t`M1 uses $\pi r^2 h = 1000$ to write $h = \frac{1000}{\pi r^2}$.`, t`A1 substitutes into $S = \pi r^2 + 2\pi rh$ to reach the result.`],
          modelAnswer: t`$$
h = \frac{1000}{\pi r^2}, \qquad S = \pi r^2 + 2\pi r \cdot \frac{1000}{\pi r^2} = \pi r^2 + \frac{2000}{r}
$$`,
          explanation: "Base plus curved surface; no lid." }),
        P.num({ label: "(b)", marks: 3, stem: "Find the value of r for which S is stationary, correct to 3 significant figures.", value: r, unit: "cm", prefix: "r =", wrong: [sfStr(Math.cbrt(2000 / PI))],
          explanation: t`$\frac{dS}{dr} = 2\pi r - \frac{2000}{r^2} = 0$ gives $r^3 = \frac{1000}{\pi}$, so $r = ${sfStr(r)}$.` }),
        P.expr({ label: "(c)", marks: 2, stem: t`Find the exact value of $\dfrac{d^2S}{dr^2}$ at this value of $r$, in terms of π (for example 3π), and hence show that $S$ is a minimum.`, accepted: ["6π", "6pi", "d2S/dr2=6π"],
          wrong: ["2π"],
          explanation: t`$\frac{d^2S}{dr^2} = 2\pi + \frac{4000}{r^3}$, and $r^3 = \frac{1000}{\pi}$ gives $\frac{4000}{r^3} = 4\pi$. So $\frac{d^2S}{dr^2} = 6\pi > 0$: a minimum.` }),
        P.num({ label: "(d)", marks: 2, stem: "Find the least area of material, correct to 3 significant figures.", value: S(r), unit: "cm²", wrong: [sfStr(PI * r * r)],
          explanation: t`$S = \pi(${sfStr(r)})^2 + \frac{2000}{${sfStr(r)}} = ${sfStr(S(r))}$ cm².` }),
        P.num({ label: "(e)", marks: 1, stem: "Find the corresponding height h, correct to 3 significant figures.", value: h, unit: "cm", prefix: "h =", wrong: [sfStr(2 * h)],
          explanation: t`$h = \frac{1000}{\pi r^2} = ${sfStr(h)}$ cm, equal to the radius.` }),
      ],
      explanation: "Eliminate h with the volume, minimise S, justify with the second derivative, and give the dimensions.",
      hints: [t`$r^3 = \frac{1000}{\pi}$.`, "Keep the full calculator value of r for later parts."],
    });
  }

  // D3 (10, Paper 2): y = x ln x, stationary point, tangent and normal
  {
    const f = (x) => x * Math.log(x), fp = (x) => Math.log(x) + 1;
    checkDeriv(f, fp, [0.5, 2]);
    const xs = Math.exp(-1);
    chk(fp(xs), 0, 1e-12); chk(f(xs), -xs, 1e-12);
    chk(fp(Math.E), 2); chk(f(Math.E), Math.E);
    const xi = Math.E / 2, yi = 1.5 * Math.E;
    chk(2 * xi - Math.E, 0, 1e-12); chk(Math.E + 0.5 * Math.E, yi);
    b.struct({
      d: 4, marks: 10, secs: 90 * 10, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 2",
      concepts: [Q("tangents-normals"), Q("stationary-points"), Q("product-quotient"), Q("trig-exp-log")],
      stem: t`A curve has equation $y = x\ln x$ for $x > 0$.`,
      parts: [
        P.fib({ label: "(a)", marks: 1, stem: t`Find $\dfrac{dy}{dx}$ in the form $\ln x + k$.`, template: "k = {{blank:k}}",
          blanks: [{ id: "k", input: "number", accepted: [1], wrong: "0" }], explanation: t`$x \cdot \frac{1}{x} + \ln x = \ln x + 1$.` }),
        P.group({ label: "(b)", stem: "For the stationary point of the curve, find, correct to 3 significant figures,", parts: [
          P.num({ label: "(i)", marks: 2, stem: "its x-coordinate,", value: xs, wrong: [1],
            explanation: t`$\ln x = -1$, so $x = \mathrm{e}^{-1} = ${sfStr(xs)}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "its y-coordinate.", value: -xs, wrong: [sfStr(xs)],
            explanation: t`$y = \mathrm{e}^{-1}\ln \mathrm{e}^{-1} = -\mathrm{e}^{-1} = ${sfStr(-xs)}$.` }),
        ] }),
        P.mcq({ label: "(c)", marks: 1, stem: "What is the nature of the stationary point?",
          options: [
            [t`A minimum, since $\frac{d^2y}{dx^2} = \frac{1}{x} > 0$`, "Correct: 1/x is positive for every x > 0."],
            [t`A maximum, since $\frac{d^2y}{dx^2} = \frac{1}{x} > 0$`, "A positive second derivative means a minimum."],
            [t`A maximum, since $y < 0$ there`, "The sign of y does not decide the nature."],
            [t`A minimum, since $\frac{d^2y}{dx^2} = \ln x < 0$`, t`The derivative of $\ln x + 1$ is $\frac{1}{x}$, not $\ln x$.`],
          ], answer: "A", explanation: t`$\frac{d^2y}{dx^2} = \frac{1}{x} > 0$, so the point is a minimum.` }),
        P.num({ label: "(d)", marks: 3, stem: t`The tangent to the curve at the point where $x = \mathrm{e}$ meets the $x$-axis at $A$. Find the $x$-coordinate of $A$, correct to 3 significant figures.`, value: xi, wrong: [sfStr(Math.E)],
          explanation: t`At $x = \mathrm{e}$: $y = \mathrm{e}$ and $\frac{dy}{dx} = \ln \mathrm{e} + 1 = 2$. Tangent: $y - \mathrm{e} = 2(x - \mathrm{e})$, so $y = 2x - \mathrm{e}$; $y = 0$ gives $x = \frac{\mathrm{e}}{2} = ${sfStr(xi)}$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`The normal to the curve at the point where $x = \mathrm{e}$ meets the $y$-axis at $B$. Find the $y$-coordinate of $B$, correct to 3 significant figures.`, value: yi, wrong: [sfStr(-Math.E)],
          explanation: t`Normal gradient $-\frac{1}{2}$: $y - \mathrm{e} = -\frac{1}{2}(x - \mathrm{e})$. At $x = 0$: $y = \mathrm{e} + \frac{\mathrm{e}}{2} = \frac{3\mathrm{e}}{2} = ${sfStr(yi)}$.` }),
      ],
      explanation: "Product rule with ln x, the stationary point from ln x = −1, and the tangent and normal at (e, e).",
      hints: [t`$\ln x = -1 \Rightarrow x = \mathrm{e}^{-1}$.`, t`$\ln \mathrm{e} = 1$.`],
    });
  }
});
