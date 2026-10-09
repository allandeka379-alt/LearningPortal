// W3b exam-format items: ZIMSEC Paper 1 (Section A 13 marks, Section B 12 marks) on integration, areas and volumes;
// Cambridge 0606 Paper 1 (8 marks, no calculator) and Paper 2 (10 marks) on integration, areas, kinematics and vectors.
// Every value is computed and checked.
import { concept, P, t, chk, same, quad, integrate, checkAntideriv, checkDeriv, vec, deg, sf, ZIM, CAM } from "../lib.mjs";

const Q = (k) => `amath.${k}`;
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
const NF = (id, n, d, wrong, marks) => ({ id, input: "number", accepted: [`${n}/${d}`], tolerance: 0.005, wrong, ...(marks ? { marks } : {}) });
const I = (f, a, b) => integrate(f, a, b, 4000);
const { exp, log, sin, cos, tan, PI, sqrt, atan, abs } = Math;
const secant = (x) => 1 / cos(x);

// =====================================================================================================================
concept(Q("calculus.integration-basics"), { file: "exam/w3b-zimsec", keyPrefix: "exam.w3b-zimsec", applies: ZIM }, (b) => {
  // Z1 (13, P1 Section A): indefinite integrals and the equation of a curve
  checkAntideriv((x) => x ** 4 + 6 / x + 5 * x, (x) => 4 * x ** 3 - 6 / (x * x) + 5, 0.5, 3);
  checkAntideriv((x) => (4 * x + 1) ** 4 / 16, (x) => (4 * x + 1) ** 3, 0, 1);
  checkAntideriv((x) => exp(3 * x) / 3 + 2 * cos(2 * x), (x) => exp(3 * x) - 4 * sin(2 * x), 0, 1);
  const y1 = (x) => 2 * x ** 3 - x * x + 3;
  checkDeriv(y1, (x) => 6 * x * x - 2 * x, [0, 1, 2]);
  chk(y1(1), 4);
  b.struct({
    d: 4, marks: 13, secs: 90 * 13, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("calculus.integration-basics"), Q("calculus.integration-functions")],
    stem: "This question is about indefinite integrals.",
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Find $\displaystyle\int \left(4x^3 - \frac{6}{x^2} + 5\right)dx$ in the form $px^4 + \dfrac{q}{x} + rx + c$.`, template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}",
        blanks: [N("p", 1, "4"), N("q", 6, "-6"), N("r", 5, "0")],
        explanation: t`$\int 4x^3\,dx = x^4$; $\int -6x^{-2}\,dx = \frac{-6x^{-1}}{-1} = \frac{6}{x}$; $\int 5\,dx = 5x$.` }),
      P.num({ label: "(b)", marks: 2, stem: t`$\displaystyle\int (4x + 1)^3\,dx = \frac{(4x + 1)^4}{k} + c$. Find $k$.`, value: 16, wrong: [4, 12],
        explanation: t`Divide by the new power 4 and by the coefficient of $x$, 4: $k = 16$.` }),
      P.fib({ label: "(c)", marks: 3, stem: t`Find $\displaystyle\int \left(e^{3x} - 4\sin 2x\right)dx$ in the form $ae^{3x} + b\cos 2x + c$. Type $a$ as a fraction.`, template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [NF("a", 1, 3, "3", 1), N("b", 2, "-2", 2)],
        explanation: t`$\int e^{3x}\,dx = \frac{1}{3}e^{3x}$ and $\int -4\sin 2x\,dx = -4 \times \left(-\frac{1}{2}\cos 2x\right) = 2\cos 2x$.` }),
      P.fib({ label: "(d)", marks: 3, stem: t`A curve has gradient function $\dfrac{dy}{dx} = 6x^2 - 2x$ and passes through the point $(1, 4)$. Find its equation in the form $y = px^3 + qx^2 + r$.`, template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}",
        blanks: [N("p", 2, "6"), N("q", -1, "-2"), N("r", 3, "4")],
        explanation: t`$y = 2x^3 - x^2 + c$; at $(1, 4)$: $4 = 2 - 1 + c$, so $c = 3$.` }),
      P.num({ label: "(e)", marks: 2, stem: t`Find the value of $y$ on this curve when $x = 2$.`, value: y1(2), wrong: [12, 20],
        explanation: t`$y = 16 - 4 + 3 = 15$.` }),
    ],
    explanation: "Rewrite as powers, add one to each power and divide; for linear composites divide by the coefficient of x; use the point to find c.",
    hints: [t`$\frac{6}{x^2} = 6x^{-2}$.`, t`$\int \sin 2x\,dx = -\frac{1}{2}\cos 2x$.`],
  });

  // Z2 (13, P1 Section A): definite integral, area and volume for y = 2x − x²
  chk(I((x) => 6 * x * x - 4 / x ** 3, 1, 2), 12.5, 1e-9);
  same(quad.roots(-1, 2, 0), [0, 2]);
  const area2 = I((x) => 2 * x - x * x, 0, 2);
  chk(area2, 4 / 3, 1e-9);
  const vol2 = PI * I((x) => (2 * x - x * x) ** 2, 0, 2);
  chk(vol2 / PI, 16 / 15, 1e-9);
  b.struct({
    d: 4, marks: 13, secs: 90 * 13, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("calculus.definite-integrals-area"), Q("calculus.volumes-of-revolution"), Q("calculus.integration-basics")],
    stem: "This question is about definite integrals, an area and a volume.",
    parts: [
      P.num({ label: "(a)", marks: 3, stem: t`Evaluate $\displaystyle\int_1^2 \left(6x^2 - \frac{4}{x^3}\right)dx$.`, value: 12.5, wrong: [16.5, 9.5],
        explanation: t`$\Big[2x^3 + 2x^{-2}\Big]_1^2 = \left(16 + \frac{1}{2}\right) - (2 + 2) = 12.5$.` }),
      P.fib({ label: "(b)", marks: 1, stem: t`The curve $y = 2x - x^2$ meets the $x$-axis at $O$ and at $A$. Find the $x$-coordinate of $A$.`, template: "x = {{blank:a}}",
        blanks: [N("a", 2, "-2")],
        explanation: t`$x(2 - x) = 0$ gives $x = 0$ or $x = 2$.` }),
      P.num({ label: "(c)", marks: 3, stem: t`Find the area of the region $R$ enclosed by the curve and the $x$-axis, as a fraction or correct to 3 significant figures.`, value: area2, wrong: [4, 8 / 3],
        explanation: t`$\Big[x^2 - \frac{x^3}{3}\Big]_0^2 = 4 - \frac{8}{3} = \frac{4}{3}$ square units.` }),
      P.num({ label: "(d)", marks: 4, stem: t`$R$ is rotated through $360°$ about the $x$-axis. The volume of the solid formed is $k\pi$ cubic units. Find $k$, as a fraction or correct to 3 significant figures.`, value: vol2 / PI, wrong: [4 / 3, 16 / 9],
        explanation: t`$y^2 = 4x^2 - 4x^3 + x^4$. $\pi\Big[\frac{4x^3}{3} - x^4 + \frac{x^5}{5}\Big]_0^2 = \pi\left(\frac{32}{3} - 16 + \frac{32}{5}\right) = \frac{160 - 240 + 96}{15}\pi = \frac{16}{15}\pi$.` }),
      P.manual({ label: "(e)", marks: 2, stem: t`Explain why the volume in (d) is found with $\pi\displaystyle\int y^2\,dx$ and not $\pi\displaystyle\int y\,dx$.`,
        points: [t`Each thin slice of the solid is a disc of radius $y$ (and thickness $\delta x$).`, t`A disc's volume is $\pi y^2\,\delta x$, so the sum of slices gives $\pi\int y^2\,dx$; $\pi\int y\,dx$ is just $\pi$ times the area.`],
        modelAnswer: t`Slicing the solid at right angles to the $x$-axis gives thin discs of radius $y$ and thickness $\delta x$, each of volume $\pi y^2\,\delta x$. Adding them and letting $\delta x \to 0$ gives $\pi\int y^2\,dx$. The integral $\pi\int y\,dx$ is only $\pi$ times the area of $R$.`,
        explanation: "The radius of each disc is y, so its area is πy²." }),
    ],
    explanation: "Integrate powers carefully, find the roots for the limits, and square y (fully expanded) for the volume.",
    hints: [t`$\int -4x^{-3}\,dx = 2x^{-2}$.`, t`$(2x - x^2)^2 = 4x^2 - 4x^3 + x^4$.`],
  });

  // Z3 (12, P1 Section B): line y = x + 4 and curve y = x² + 2
  same(quad.roots(1, -1, -2), [-1, 2]);
  const area3 = I((x) => x + 4 - (x * x + 2), -1, 2);
  chk(area3, 4.5, 1e-9);
  const vol3 = PI * I((x) => (x * x + 2) ** 2, 0, 2);
  chk(vol3 / PI, 376 / 15, 1e-9);
  b.struct({
    d: 4, marks: 12, secs: 90 * 12, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("calculus.definite-integrals-area"), Q("calculus.volumes-of-revolution")],
    stem: t`The line $y = x + 4$ meets the curve $y = x^2 + 2$ at the points $A$ and $B$, where $A$ is to the left of $B$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Find the coordinates of $A$ and $B$.`, template: "A = ({{blank:ax}}, {{blank:ay}}), B = ({{blank:bx}}, {{blank:by}})",
        blanks: [N("ax", -1, "1"), N("ay", 3, "5"), N("bx", 2, "-2"), N("by", 6, "2")],
        explanation: t`$x^2 + 2 = x + 4$ gives $x^2 - x - 2 = (x - 2)(x + 1) = 0$. $A(-1, 3)$ and $B(2, 6)$.` }),
      P.proof({ label: "(b)", marks: 1, stem: t`Show that the area of the region enclosed by the line and the curve is $\displaystyle\int_{-1}^{2} (2 + x - x^2)\,dx$.`,
        points: [t`States that the line is above the curve between $A$ and $B$ (e.g. at $x = 0$: $4 > 2$) and forms $(x + 4) - (x^2 + 2) = 2 + x - x^2$.`],
        modelAnswer: t`Between $x = -1$ and $x = 2$ the line is above the curve (at $x = 0$ the line gives 4 and the curve 2), so the area is $\int_{-1}^{2} \left[(x + 4) - (x^2 + 2)\right]dx = \int_{-1}^{2} (2 + x - x^2)\,dx$.`,
        explanation: "Area between two graphs = ∫ (upper − lower) dx." }),
      P.num({ label: "(c)", marks: 4, stem: "Find this area.", value: area3, wrong: [-4.5, 10 / 3],
        explanation: t`$\Big[2x + \frac{x^2}{2} - \frac{x^3}{3}\Big]_{-1}^{2} = \left(4 + 2 - \frac{8}{3}\right) - \left(-2 + \frac{1}{2} + \frac{1}{3}\right) = \frac{10}{3} + \frac{7}{6} = \frac{9}{2}$ square units.` }),
      P.num({ label: "(d)", marks: 4, stem: t`The region under the curve $y = x^2 + 2$ from $x = 0$ to $x = 2$ is rotated through $360°$ about the $x$-axis. The volume is $k\pi$ cubic units. Find $k$, as a fraction or correct to 3 significant figures.`, value: vol3 / PI, wrong: [32 / 5 + 4 * 2, 20 / 3],
        explanation: t`$y^2 = x^4 + 4x^2 + 4$. $\pi\Big[\frac{x^5}{5} + \frac{4x^3}{3} + 4x\Big]_0^2 = \pi\left(\frac{32}{5} + \frac{32}{3} + 8\right) = \frac{96 + 160 + 120}{15}\pi = \frac{376}{15}\pi$. Leaving out the middle term $4x^2$ gives $14.4$.` }),
    ],
    explanation: "Solve simultaneously for the limits, integrate upper minus lower, and expand y² before integrating the volume.",
    hints: [t`At $x = -1$: $-2 + \frac{1}{2} + \frac{1}{3} = -\frac{7}{6}$.`, t`$(x^2 + 2)^2 = x^4 + 4x^2 + 4$.`],
  });

  // Z4 (12, P1 Section B): curve y = x³ − 12x + 16 = (x − 2)²(x + 4)
  const y4 = (x) => x ** 3 - 12 * x + 16;
  checkDeriv(y4, (x) => 3 * x * x - 12, [-2, 0, 2]);
  chk(y4(0), 16); chk(y4(2), 0); chk(y4(-2), 32); chk(y4(-4), 0);
  const area4 = I(y4, -4, 2);
  chk(area4, 108, 1e-9);
  b.struct({
    d: 5, marks: 12, secs: 90 * 12, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("calculus.integration-basics"), Q("calculus.definite-integrals-area")],
    stem: t`A curve has gradient function $\dfrac{dy}{dx} = 3x^2 - 12$ and crosses the $y$-axis at $(0, 16)$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Find the equation of the curve in the form $y = x^3 + px + q$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [N("p", -12, "-6"), N("q", 16, "0")],
        explanation: t`$y = x^3 - 12x + c$, and $y = 16$ when $x = 0$ gives $c = 16$.` }),
      P.fib({ label: "(b)", marks: 3, stem: t`Find the coordinates of the stationary points, the one with the smaller $x$-coordinate first.`, template: "({{blank:x1}}, {{blank:y1}}) and ({{blank:x2}}, {{blank:y2}})",
        blanks: [N("x1", -2, "2"), N("y1", 32, "0"), N("x2", 2, "-2"), N("y2", 0, "32")],
        explanation: t`$3x^2 - 12 = 0$ gives $x = \pm 2$; $y(-2) = -8 + 24 + 16 = 32$ and $y(2) = 8 - 24 + 16 = 0$.` }),
      P.proof({ label: "(c)", marks: 3, stem: t`Show that $y = (x - 2)^2(x + 4)$, and hence explain why the curve touches the $x$-axis at $(2, 0)$ and crosses it at $(-4, 0)$.`,
        points: [
          t`M1 expands $(x - 2)^2(x + 4) = (x^2 - 4x + 4)(x + 4)$.`,
          t`A1 reaches $x^3 - 12x + 16$.`,
          t`B1 explains: the repeated factor $(x - 2)^2$ gives a root where the curve touches the axis (it is the stationary point found in (b)); the single factor $(x + 4)$ gives a crossing.`,
        ],
        modelAnswer: t`$$
(x - 2)^2(x + 4) = (x^2 - 4x + 4)(x + 4) = x^3 + 4x^2 - 4x^2 - 16x + 4x + 16 = x^3 - 12x + 16
$$

The factor $(x - 2)$ is repeated, so $y$ does not change sign at $x = 2$: the curve touches the axis at the minimum point $(2, 0)$. The single factor $(x + 4)$ makes $y$ change sign at $x = -4$, so the curve crosses the axis at $(-4, 0)$.`,
        explanation: "A squared factor means the curve touches the axis; a single factor means it crosses." }),
      P.num({ label: "(d)", marks: 4, stem: t`Find the area of the region enclosed by the curve and the $x$-axis.`, value: area4, wrong: [12, 96],
        explanation: t`The curve is on or above the axis for $-4 \leq x \leq 2$. $\Big[\frac{x^4}{4} - 6x^2 + 16x\Big]_{-4}^{2} = (4 - 24 + 32) - (64 - 96 - 64) = 12 - (-96) = 108$ square units.` }),
    ],
    explanation: "Integrate the gradient function, use the y-intercept for c, locate the stationary points, factorise, then integrate between the roots.",
    hints: [t`Stationary points: $\frac{dy}{dx} = 0$.`, t`At $x = -4$: $\frac{256}{4} - 96 - 64 = -96$.`],
  });

  // Z5 (12, P1 Section B): trigonometric and exponential definite integrals, volume with e^x + e^-x
  chk(I((x) => 2 * cos(x) + sin(2 * x), 0, PI / 2), 3, 1e-9);
  chk(I((x) => exp(2 * x), 0, log(3)), 4, 1e-9);
  const vol5 = PI * I((x) => (exp(x) + exp(-x)) ** 2, 0, 1);
  chk(vol5, PI * (exp(2) / 2 - exp(-2) / 2 + 2), 1e-9);
  b.struct({
    d: 5, marks: 12, secs: 90 * 12, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("calculus.integration-functions"), Q("calculus.definite-integrals-area"), Q("calculus.volumes-of-revolution")],
    stem: "This question is about definite integrals of exponential and trigonometric functions.",
    parts: [
      P.num({ label: "(a)", marks: 3, stem: t`Find the exact value of $\displaystyle\int_0^{\frac{\pi}{2}} (2\cos x + \sin 2x)\,dx$.`, value: 3, wrong: [2, 1],
        explanation: t`$\Big[2\sin x - \frac{1}{2}\cos 2x\Big]_0^{\frac{\pi}{2}} = \left(2 + \frac{1}{2}\right) - \left(0 - \frac{1}{2}\right) = 3$.` }),
      P.num({ label: "(b)", marks: 3, stem: t`Find the exact value of $\displaystyle\int_0^{\ln 3} e^{2x}\,dx$.`, value: 4, wrong: [4.5, 8],
        explanation: t`$\Big[\frac{1}{2}e^{2x}\Big]_0^{\ln 3} = \frac{1}{2}e^{2\ln 3} - \frac{1}{2} = \frac{9}{2} - \frac{1}{2} = 4$, since $e^{2\ln 3} = e^{\ln 9} = 9$.` }),
      P.fib({ label: "(c)", marks: 2, stem: t`For $y = e^{x} + e^{-x}$, write $y^2$ in the form $e^{2x} + k + e^{-2x}$.`, template: "k = {{blank:k}}",
        blanks: [N("k", 2, "0")],
        explanation: t`$(e^{x} + e^{-x})^2 = e^{2x} + 2e^{x}e^{-x} + e^{-2x} = e^{2x} + 2 + e^{-2x}$.` }),
      P.num({ label: "(d)", marks: 4, stem: t`The region under $y = e^{x} + e^{-x}$ from $x = 0$ to $x = 1$ is rotated through $360°$ about the $x$-axis. Find the volume of the solid, correct to 3 significant figures.`, value: vol5, unit: "units³", wrong: [PI * (exp(2) / 2 - exp(-2) / 2), PI * (exp(2) / 2 + exp(-2) / 2 + 2)],
        explanation: t`$V = \pi\Big[\frac{1}{2}e^{2x} + 2x - \frac{1}{2}e^{-2x}\Big]_0^1 = \pi\left(\frac{1}{2}e^2 + 2 - \frac{1}{2}e^{-2}\right) - \pi(0) \approx 17.7$. Note that the lower limit gives $\frac{1}{2} - \frac{1}{2} = 0$.` }),
    ],
    explanation: "Use the standard integrals with the factor 1/a, the law e^{ln a} = a, and expand y² for the volume.",
    hints: [t`$\int \sin 2x\,dx = -\frac{1}{2}\cos 2x$.`, t`$\int e^{-2x}\,dx = -\frac{1}{2}e^{-2x}$.`],
  });
});

// =====================================================================================================================
concept(Q("calculus.integration-functions"), { file: "exam/w3b-cambridge", keyPrefix: "exam.w3b-cambridge", applies: CAM }, (b) => {
  // C1 (8, P1): standard integrals and exact definite integrals
  checkAntideriv((x) => exp(2 * x) / 2 + 2 * log(2 * x + 1), (x) => exp(2 * x) + 4 / (2 * x + 1), 0, 1);
  chk(I((x) => exp(2 * x) + 4 / (2 * x + 1), 0, 1), exp(2) / 2 - 0.5 + 2 * log(3), 1e-9);
  chk(I((x) => secant(3 * x) ** 2, 0, PI / 12), 1 / 3, 1e-9);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("calculus.integration-functions"), Q("calculus.definite-integrals-area")],
    stem: "Do not use a calculator in this question.",
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Find $\displaystyle\int \left(e^{2x} + \frac{4}{2x + 1}\right)dx$ in the form $ae^{2x} + b\ln(2x + 1) + c$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [NF("a", 1, 2, "2"), N("b", 2, "4")],
        explanation: t`$\int e^{2x}\,dx = \frac{1}{2}e^{2x}$ and $\int \frac{4}{2x + 1}\,dx = 4 \times \frac{1}{2}\ln(2x + 1) = 2\ln(2x + 1)$.` }),
      P.fib({ label: "(b)", marks: 3, stem: t`Hence find the exact value of $\displaystyle\int_0^1 \left(e^{2x} + \frac{4}{2x + 1}\right)dx$ in the form $pe^2 + q + r\ln 3$.`, template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}",
        blanks: [NF("p", 1, 2, "2"), NF("q", -1, 2, "0"), N("r", 2, "4")],
        explanation: t`$\left(\frac{1}{2}e^2 + 2\ln 3\right) - \left(\frac{1}{2}e^0 + 2\ln 1\right) = \frac{1}{2}e^2 - \frac{1}{2} + 2\ln 3$.` }),
      P.num({ label: "(c)", marks: 3, stem: t`Find the exact value of $\displaystyle\int_0^{\frac{\pi}{12}} \sec^2 3x\,dx$.`, value: 1 / 3, wrong: [3, 1],
        explanation: t`$\Big[\frac{1}{3}\tan 3x\Big]_0^{\frac{\pi}{12}} = \frac{1}{3}\tan\frac{\pi}{4} - 0 = \frac{1}{3}$.` }),
    ],
    explanation: "Divide by the coefficient of x in each standard integral, then substitute exact values: e⁰ = 1, ln 1 = 0, tan(π/4) = 1.",
    hints: [t`$e^0 = 1$, not 0.`, t`$\tan\frac{\pi}{4} = 1$.`],
  });

  // C2 (8, P1): area between y = x² − 2x + 3 and y = x + 3
  same(quad.roots(1, -3, 0), [0, 3]);
  const area2 = I((x) => x + 3 - (x * x - 2 * x + 3), 0, 3);
  chk(area2, 4.5, 1e-9);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("calculus.definite-integrals-area")],
    stem: t`Do not use a calculator in this question. The line $y = x + 3$ meets the curve $y = x^2 - 2x + 3$ at the points $P$ and $Q$, where $P$ is on the $y$-axis.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Find the coordinates of $Q$.`, template: "Q = ({{blank:x}}, {{blank:y}})",
        blanks: [N("x", 3, "-3"), N("y", 6, "0")],
        explanation: t`$x^2 - 2x + 3 = x + 3$ gives $x^2 - 3x = x(x - 3) = 0$. $P$ is $(0, 3)$ and $Q$ is $(3, 6)$.` }),
      P.proof({ label: "(b)", marks: 2, stem: t`Show that the area of the region enclosed by the line and the curve is $\displaystyle\int_0^3 (3x - x^2)\,dx$.`,
        points: [t`M1 identifies the line as the upper boundary for $0 < x < 3$ (e.g. at $x = 1$: $4 > 2$).`, t`A1 forms $(x + 3) - (x^2 - 2x + 3) = 3x - x^2$ with limits 0 and 3.`],
        modelAnswer: t`For $0 < x < 3$ the line is above the curve (at $x = 1$ the line gives 4 and the curve 2). Area $= \int_0^3 \left[(x + 3) - (x^2 - 2x + 3)\right]dx = \int_0^3 (3x - x^2)\,dx$.`,
        explanation: "Upper minus lower between the intersection points." }),
      P.num({ label: "(c)", marks: 4, stem: "Find the exact area of this region.", value: area2, wrong: [13.5, 9],
        explanation: t`$\Big[\frac{3x^2}{2} - \frac{x^3}{3}\Big]_0^3 = \frac{27}{2} - 9 = \frac{9}{2}$ square units.` }),
    ],
    explanation: "Find the intersections, decide which graph is on top, and integrate the difference.",
    hints: ["Substitute x = 1 into both equations to see which is on top."],
  });


  // C3 (8, P1): v = 3t² − 8t + 4 = (3t − 2)(t − 2)
  same(quad.roots(3, -8, 4), [2 / 3, 2]);
  const s3 = (x) => x ** 3 - 4 * x * x + 4 * x;
  checkDeriv(s3, (x) => 3 * x * x - 8 * x + 4, [0, 1, 2]);
  chk(s3(2), 0); chk(s3(2 / 3), 32 / 27, 1e-12);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("calculus.kinematics")],
    stem: t`Do not use a calculator in this question. A particle starts from a fixed point $O$ and moves in a straight line. Its velocity $t$ seconds later is $v = 3t^2 - 8t + 4$ m s$^{-1}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the times when the particle is instantaneously at rest, in ascending order. Type fractions where needed.", template: "t = {{blank:a}} s and t = {{blank:b}} s",
        blanks: [NF("a", 2, 3, "3/2"), N("b", 2, "-2")],
        explanation: t`$3t^2 - 8t + 4 = (3t - 2)(t - 2) = 0$, so $t = \frac{2}{3}$ or $t = 2$.` }),
      P.num({ label: "(b)", marks: 1, stem: t`Find the acceleration of the particle when $t = 2$.`, value: 4, unit: "m/s²", wrong: [0],
        explanation: t`$a = 6t - 8 = 4$ m s$^{-2}$.` }),
      P.proof({ label: "(c)", marks: 2, stem: t`Show that the particle is back at $O$ when $t = 2$.`,
        points: [t`M1 integrates to $s = t^3 - 4t^2 + 4t$ (constant 0 because $s = 0$ at $t = 0$).`, t`A1 shows $s(2) = 8 - 16 + 8 = 0$.`],
        modelAnswer: t`$$
s = \int (3t^2 - 8t + 4)\,dt = t^3 - 4t^2 + 4t + c, \quad s(0) = 0 \Rightarrow c = 0
$$

$$
s(2) = 8 - 16 + 8 = 0
$$

so the particle is at $O$ when $t = 2$.`,
        explanation: "Integrate v, use s = 0 at t = 0, and substitute t = 2." }),
      P.num({ label: "(d)", marks: 3, stem: t`Find the total distance travelled in the first 2 seconds, as an exact fraction.`, value: 64 / 27, unit: "m", wrong: [0, 32 / 27],
        explanation: t`$s\left(\frac{2}{3}\right) = \frac{8}{27} - \frac{16}{9} + \frac{8}{3} = \frac{8 - 48 + 72}{27} = \frac{32}{27}$. It goes out $\frac{32}{27}$ m and back again: distance $\frac{64}{27}$ m, although the displacement is 0.` }),
    ],
    explanation: "Rest is v = 0; integrate for s; the distance adds the outward and return stages.",
    hints: [t`$s = t(t - 2)^2$.`, "Find s at the first time of rest."],
  });

  // C5 (10, P2): v = 8e^{−0.5t} − 2
  const v5 = (x) => 8 * exp(-0.5 * x) - 2;
  const s5 = (x) => -16 * exp(-0.5 * x) - 2 * x + 16;
  checkDeriv(s5, v5, [0, 1, 3]);
  chk(s5(0), 0);
  const tr = 2 * log(4);
  chk(v5(tr), 0, 1e-12);
  const d5 = 2 * s5(tr) - s5(5);
  chk(I((x) => abs(v5(x)), 0, 5) , d5, 1e-5);
  b.struct({
    d: 5, marks: 10, secs: 90 * 10, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("calculus.kinematics"), Q("calculus.integration-functions")],
    stem: t`A particle moves in a straight line, starting from a fixed point $O$. Its velocity $t$ seconds after leaving $O$ is $v = 8e^{-0.5t} - 2$ m s$^{-1}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the initial velocity of the particle.", value: 6, unit: "m/s", wrong: [8],
        explanation: t`$v(0) = 8 - 2 = 6$ m s$^{-1}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the time when the particle comes to instantaneous rest, correct to 3 significant figures.", value: tr, unit: "s", wrong: [0.5 * log(4), log(4)],
        explanation: t`$8e^{-0.5t} = 2$ gives $e^{-0.5t} = \frac{1}{4}$, so $-0.5t = \ln\frac{1}{4}$ and $t = 2\ln 4 = 2.77$ s.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Find the acceleration of the particle when $t = 1$, correct to 3 significant figures.`, value: -4 * exp(-0.5), unit: "m/s²", wrong: [4 * exp(-0.5), -8 * exp(-0.5)],
        explanation: t`$a = \frac{dv}{dt} = -4e^{-0.5t}$; at $t = 1$: $-4e^{-0.5} = -2.43$ m s$^{-2}$ (the particle is slowing down).` }),
      P.fib({ label: "(d)", marks: 2, stem: t`Find the displacement $s$ in the form $s = pe^{-0.5t} - 2t + q$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [N("p", -16, "-4"), N("q", 16, "0")],
        explanation: t`$\int 8e^{-0.5t}\,dt = \frac{8}{-0.5}e^{-0.5t} = -16e^{-0.5t}$. $s = -16e^{-0.5t} - 2t + c$, and $s(0) = 0$ gives $c = 16$.` }),
      P.num({ label: "(e)", marks: 3, stem: "Find the total distance travelled in the first 5 seconds, correct to 3 significant figures.", value: d5, unit: "m", wrong: [s5(5), s5(tr)],
        explanation: t`It moves forwards until $t = 2\ln 4$, reaching $s = -4 - 4\ln 4 + 16 = 6.455$ m, then back to $s(5) = -16e^{-2.5} + 6 = 4.687$ m. Distance $= 6.455 + (6.455 - 4.687) = 8.22$ m. The displacement 4.69 m is not the distance.` }),
    ],
    explanation: "Differentiate for a, integrate (dividing by −0.5) for s, and split the distance at the time of rest.",
    hints: [t`Take natural logarithms to solve $e^{-0.5t} = \frac{1}{4}$.`, "The constant of integration is not zero."],
  });

  // C4 (8, P1): OA = a, OB = b; P on AB with AP:PB = 2:1; Q midpoint of OA; OP and BQ meet at X: λ = 3/4, μ = 1/2
  const lam = 3 / 4, mu = 1 / 2;
  const viaOP = vec.scale(lam, [1 / 3, 2 / 3]);
  const viaBQ = vec.add([0, 1], vec.scale(mu, [0.5, -1]));
  chk(viaOP[0], viaBQ[0], 1e-12); chk(viaOP[1], viaBQ[1], 1e-12);
  chk(viaOP[0], 0.25, 1e-12); chk(viaOP[1], 0.5, 1e-12);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("vectors.geometry"), Q("vectors.notation-magnitude")],
    stem: t`Do not use a calculator in this question. In triangle $OAB$, $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OB} = \mathbf{b}$, where $\mathbf{a}$ and $\mathbf{b}$ are not parallel. The point $P$ lies on $AB$ with $AP : PB = 2 : 1$, and $Q$ is the midpoint of $OA$. The lines $OP$ and $BQ$ meet at $X$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Write $\overrightarrow{OP}$ in the form $p\mathbf{a} + q\mathbf{b}$. Type fractions.`, template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [NF("p", 1, 3, "2/3"), NF("q", 2, 3, "1/3")],
        explanation: t`$\overrightarrow{OP} = \mathbf{a} + \frac{2}{3}(\mathbf{b} - \mathbf{a}) = \frac{1}{3}\mathbf{a} + \frac{2}{3}\mathbf{b}$.` }),
      P.fib({ label: "(b)", marks: 1, stem: t`Write $\overrightarrow{BQ}$ in the form $r\mathbf{a} + s\mathbf{b}$.`, template: "r = {{blank:r}}, s = {{blank:s}}",
        blanks: [N("r", 0.5, "-0.5"), N("s", -1, "1")],
        explanation: t`$\overrightarrow{BQ} = -\mathbf{b} + \frac{1}{2}\mathbf{a}$.` }),
      P.fib({ label: "(c)", marks: 3, stem: t`Given that $\overrightarrow{OX} = \lambda\overrightarrow{OP}$ and $\overrightarrow{BX} = \mu\overrightarrow{BQ}$, find $\lambda$ and $\mu$. Type fractions.`, template: "λ = {{blank:l}}, μ = {{blank:m}}",
        blanks: [NF("l", 3, 4, "1/2", 2), NF("m", 1, 2, "3/4", 1)],
        explanation: t`$\frac{\lambda}{3}\mathbf{a} + \frac{2\lambda}{3}\mathbf{b} = \frac{\mu}{2}\mathbf{a} + (1 - \mu)\mathbf{b}$. So $\frac{\lambda}{3} = \frac{\mu}{2}$ and $\frac{2\lambda}{3} = 1 - \mu$. From the first, $\mu = \frac{2\lambda}{3}$; then $\frac{4\lambda}{3} = 1$, $\lambda = \frac{3}{4}$ and $\mu = \frac{1}{2}$.` }),
      P.manual({ label: "(d)", marks: 1, stem: "State why it is valid to equate the coefficients of a and of b in part (c).",
        points: [t`Because $\mathbf{a}$ and $\mathbf{b}$ are non-zero and not parallel, a multiple of one cannot equal a multiple of the other unless both are zero.`],
        modelAnswer: t`$\mathbf{a}$ and $\mathbf{b}$ are not parallel, so $(p - r)\mathbf{a} = (s - q)\mathbf{b}$ can only hold if both coefficients are zero.`,
        explanation: "Non-parallel vectors are independent." }),
      P.fib({ label: "(e)", marks: 1, stem: t`Hence write $\overrightarrow{OX}$ in the form $h\mathbf{a} + k\mathbf{b}$.`, template: "h = {{blank:h}}, k = {{blank:k}}",
        blanks: [N("h", 0.25, "0.5"), N("k", 0.5, "0.25")],
        explanation: t`$\overrightarrow{OX} = \frac{3}{4}\left(\frac{1}{3}\mathbf{a} + \frac{2}{3}\mathbf{b}\right) = \frac{1}{4}\mathbf{a} + \frac{1}{2}\mathbf{b}$.` }),
    ],
    explanation: "Route-find each vector, write OX along both lines with different scalars, and equate coefficients.",
    hints: [t`$\overrightarrow{OX} = \overrightarrow{OB} + \mu\overrightarrow{BQ}$.`],
  });

  // C6 (10, P2): P r = (i + 9j) + t(5i + j), Q r = (13i + 2j) + t(2i + 5j)
  const rP = (x) => vec.add([1, 9], vec.scale(x, [5, 1]));
  const rQ = (x) => vec.add([13, 2], vec.scale(x, [2, 5]));
  const PQ = (x) => vec.sub(rQ(x), rP(x));
  same(PQ(0), [12, -7]); same(PQ(1), [9, -3]);
  for (const x of [0.5, 2, 3]) chk(vec.mag(PQ(x)) ** 2, 25 * x * x - 128 * x + 193, 1e-9);
  same(PQ(4), [0, 9]);
  const roots = quad.roots(25, -128, 193 - 225);
  chk(roots.length, 2);
  chk(roots[0] < 0 ? 1 : 0, 1);
  const tq = roots[1];
  chk(vec.mag(PQ(tq)), 15, 1e-9);
  chk(sf(tq, 3), 5.36);
  const bearingQ = deg(atan(2 / 5));
  b.struct({
    d: 5, marks: 10, secs: 90 * 10, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("vectors.velocity"), Q("vectors.notation-magnitude")],
    stem: t`In this question $\mathbf{i}$ is a unit vector due east and $\mathbf{j}$ a unit vector due north; distances are in kilometres and time $t$ in hours. At time $t$, boat $P$ has position vector $(\mathbf{i} + 9\mathbf{j}) + t(5\mathbf{i} + \mathbf{j})$ and boat $Q$ has position vector $(13\mathbf{i} + 2\mathbf{j}) + t(2\mathbf{i} + 5\mathbf{j})$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the speed of P, correct to 3 significant figures.", value: sqrt(26), unit: "km/h", wrong: [6],
        explanation: t`$|5\mathbf{i} + \mathbf{j}| = \sqrt{26} = 5.10$ km/h. Adding the components gives 6.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the bearing on which Q is moving, correct to 1 decimal place.", value: bearingQ, unit: "°", wrong: [90 - bearingQ],
        explanation: t`The angle east of north satisfies $\tan\theta = \frac{2}{5}$, so $\theta = 21.8°$: bearing $021.8°$. The answer $68.2°$ is measured from east, not north.` }),
      P.fib({ label: "(c)", marks: 2, stem: t`Find $\overrightarrow{PQ}$ in the form $(a + bt)\mathbf{i} + (c + dt)\mathbf{j}$.`, template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}, d = {{blank:d}}",
        blanks: [N("a", 12, "-12"), N("b", -3, "3"), N("c", -7, "7"), N("d", 4, "-4")],
        explanation: t`$\mathbf{r}_Q - \mathbf{r}_P = (13 - 1 + 2t - 5t)\mathbf{i} + (2 - 9 + 5t - t)\mathbf{j} = (12 - 3t)\mathbf{i} + (-7 + 4t)\mathbf{j}$.` }),
      P.proof({ label: "(d)", marks: 2, stem: "Show that the boats do not collide.",
        points: [t`M1 sets the $\mathbf{i}$ component of $\overrightarrow{PQ}$ to zero: $12 - 3t = 0$, $t = 4$.`, t`A1 shows the $\mathbf{j}$ component at $t = 4$ is $-7 + 16 = 9 \neq 0$, so the boats are never at the same place at the same time.`],
        modelAnswer: t`A collision needs $\overrightarrow{PQ} = \mathbf{0}$. The $\mathbf{i}$ component is zero only when $12 - 3t = 0$, i.e. $t = 4$. At $t = 4$ the $\mathbf{j}$ component is $-7 + 4(4) = 9 \neq 0$. So $\overrightarrow{PQ}$ is never zero and the boats do not collide (at $t = 4$, $Q$ is 9 km due north of $P$).`,
        explanation: "Both components of PQ must vanish at the same time." }),
      P.num({ label: "(e)", marks: 3, stem: "Find the time when the boats are 15 km apart, correct to 3 significant figures.", value: tq, unit: "h", wrong: [roots[0], 4],
        explanation: t`$|\overrightarrow{PQ}|^2 = (12 - 3t)^2 + (4t - 7)^2 = 25t^2 - 128t + 193 = 225$, so $25t^2 - 128t - 32 = 0$ and $t = \frac{128 \pm \sqrt{19584}}{50}$. The negative root is rejected (before the start), leaving $t = 5.36$ h.` }),
    ],
    explanation: "Speed is a magnitude, bearings are measured from north, PQ = r_Q − r_P, and distances come from |PQ|².",
    hints: [t`Bearing: $\tan\theta = \frac{\text{east}}{\text{north}}$.`, "Reject a negative time."],
  });

  // C7 (10, P2): d/dx(x sin x); hence ∫ x cos x dx; areas
  checkDeriv((x) => x * sin(x), (x) => sin(x) + x * cos(x), [0.3, 1, 2]);
  checkAntideriv((x) => x * sin(x) + cos(x), (x) => x * cos(x), 0, 3);
  const A1 = I((x) => x * cos(x), 0, PI / 2);
  const A2 = I((x) => x * cos(x), PI / 2, PI);
  chk(A1, PI / 2 - 1, 1e-9);
  chk(A2, -1 - PI / 2, 1e-9);
  chk(A1 - A2, PI, 1e-9);
  b.struct({
    d: 5, marks: 10, secs: 90 * 10, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("calculus.integration-functions"), Q("calculus.definite-integrals-area")],
    stem: t`This question is about the curve $y = x\cos x$ for $0 \leq x \leq \pi$, which meets the $x$-axis at $x = 0$, $x = \frac{\pi}{2}$ and $x = \pi$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $\dfrac{d}{dx}(x\sin x) = \sin x + x\cos x$.`,
        points: [t`M1 uses the product rule with $u = x$, $v = \sin x$.`, t`A1 obtains $\sin x + x\cos x$.`],
        modelAnswer: t`$$
\frac{d}{dx}(x\sin x) = 1 \times \sin x + x \times \cos x = \sin x + x\cos x
$$`,
        explanation: "Product rule." }),
      P.expr({ label: "(b)", marks: 2, stem: t`Hence find $\displaystyle\int x\cos x\,dx$. Use $c$ for the constant, for example 2xsinx - cosx + c.`,
        accepted: ["xsinx+cosx+c", "xsin(x)+cos(x)+c", "cosx+xsinx+c", "cos(x)+xsin(x)+c", "c+xsinx+cosx"],
        wrong: ["xsinx-cosx+c", "x^2sinx/2+c"],
        explanation: t`Integrating (a): $x\sin x = \int \sin x\,dx + \int x\cos x\,dx = -\cos x + \int x\cos x\,dx$. So $\int x\cos x\,dx = x\sin x + \cos x + c$.` }),
      P.num({ label: "(c)", marks: 3, stem: t`Find the area of the region between the curve and the $x$-axis from $x = 0$ to $x = \frac{\pi}{2}$, correct to 3 significant figures.`, value: A1, unit: "units²", wrong: [PI / 2 + 1, PI / 2],
        explanation: t`$\Big[x\sin x + \cos x\Big]_0^{\frac{\pi}{2}} = \left(\frac{\pi}{2} + 0\right) - (0 + 1) = \frac{\pi}{2} - 1 = 0.571$.` }),
      P.num({ label: "(d)", marks: 3, stem: t`Find the total area enclosed by the curve and the $x$-axis for $0 \leq x \leq \pi$, correct to 3 significant figures.`, value: A1 - A2, unit: "units²", wrong: [A1 + A2, -A2],
        explanation: t`From $\frac{\pi}{2}$ to $\pi$: $(\pi\sin\pi + \cos\pi) - \frac{\pi}{2} = -1 - \frac{\pi}{2}$ (below the axis). Total area $= \left(\frac{\pi}{2} - 1\right) + \left(1 + \frac{\pi}{2}\right) = \pi = 3.14$. A single integral from 0 to $\pi$ gives $-2$.` }),
    ],
    explanation: "Read the product rule backwards to integrate x cos x, then split the area at the root x = π/2.",
    hints: [t`$\int \sin x\,dx = -\cos x$, so it moves across with a sign change.`, "The part from π/2 to π is below the axis."],
  });
});
