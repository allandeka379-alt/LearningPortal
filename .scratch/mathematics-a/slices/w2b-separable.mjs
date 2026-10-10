// W2b: amaths.de.separable
import { concept, P, t, chk, deriv, ZP } from "../lib.mjs";

const { exp, log, sqrt, cos, tan } = Math;
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });
const FR = (id, list, wrong, marks) => ({ id, input: "number", accepted: list, tolerance: 0.001, wrong, ...(marks ? { marks } : {}) });
/** Checks that y(x) satisfies dy/dx = rhs(x, y) at sample points. */
const solves = (y, rhs, xs, l) => xs.forEach((x) => chk(deriv(y, x), rhs(x, y(x)), 1e-5 * Math.max(1, Math.abs(rhs(x, y(x)))), `${l} at ${x}`));

concept("amaths.de.separable", { file: "de/separable", keyPrefix: "de.separable" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "Which differential equation has separable variables?",
    options: [
      [t`$\dfrac{\mathrm{d}y}{\mathrm{d}x} = y\cos x$`, t`Correct: $y\cos x$ is a function of $y$ times a function of $x$.`],
      [t`$\dfrac{\mathrm{d}y}{\mathrm{d}x} = x + y$`, "A sum cannot be written as f(x) × g(y)."],
      [t`$\dfrac{\mathrm{d}y}{\mathrm{d}x} = \sin(xy)$`, t`$\sin(xy)$ does not factorise into a function of $x$ times a function of $y$.`],
      [t`$\dfrac{\mathrm{d}y}{\mathrm{d}x} = x^2 + y^2$`, "A sum of squares does not split into a product."],
    ],
    answer: "A",
    explanation: t`Separable means $\frac{\mathrm{d}y}{\mathrm{d}x} = f(x)g(y)$. Then $\int \frac{1}{y}\,\mathrm{d}y = \int \cos x\,\mathrm{d}x$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: t`The mass $m$ grams of a radioactive sample decreases at a rate proportional to $m$. Which differential equation models this ($k > 0$, $t$ in days)?`,
    options: [
      [t`$\dfrac{\mathrm{d}m}{\mathrm{d}t} = -km$`, "Correct: a decrease means a negative rate, proportional to m."],
      [t`$\dfrac{\mathrm{d}m}{\mathrm{d}t} = km$`, "With k > 0 this describes growth, not decay."],
      [t`$\dfrac{\mathrm{d}m}{\mathrm{d}t} = -kt$`, "The rate is proportional to the mass m, not to the time t."],
      [t`$\dfrac{\mathrm{d}t}{\mathrm{d}m} = -km$`, t`The rate of change of $m$ is $\frac{\mathrm{d}m}{\mathrm{d}t}$, not $\frac{\mathrm{d}t}{\mathrm{d}m}$.`],
    ],
    answer: "A",
    explanation: t`"Rate of change of $m$" is $\frac{\mathrm{d}m}{\mathrm{d}t}$; "decreases" gives the minus sign; "proportional to $m$" gives $km$.`,
  });

  const A3 = 1.7;
  solves((x) => A3 * exp(3 * x), (x, y) => 3 * y, [0.1, 0.5, 1], "q3");
  b.tf({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The general solution of $\dfrac{\mathrm{d}y}{\mathrm{d}x} = 3y$ is $y = A\mathrm{e}^{3x}$, where $A$ is an arbitrary constant.`,
    answer: true,
    explanation: t`$\int \frac{1}{y}\,\mathrm{d}y = \int 3\,\mathrm{d}x$ gives $\ln|y| = 3x + c$, so $y = A\mathrm{e}^{3x}$ with $A = \pm\mathrm{e}^{c}$ (and $y = 0$ is included with $A = 0$).`,
  });

  solves((x) => sqrt(4 * x ** 3 + 7), (x, y) => (6 * x * x) / y, [0.5, 1, 2], "q4");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the general solution of $\dfrac{\mathrm{d}y}{\mathrm{d}x} = \dfrac{6x^2}{y}$ in the form $y^2 = f(x)$, using c for the arbitrary constant (e.g. y^2=5x^2+c).`,
    accepted: ["y^2=4x^3+c", "y^2=c+4x^3", "y²=4x³+c", "y^2=4x^3+2c", "y^2=4x^3+k", "y^2=4x^3+a", "y^2=4x^3+C"],
    wrong: ["y^2=2x^3+c"],
    explanation: t`$\int y\,\mathrm{d}y = \int 6x^2\,\mathrm{d}x \Rightarrow \frac{1}{2}y^2 = 2x^3 + c_1 \Rightarrow y^2 = 4x^3 + c$ (with $c = 2c_1$). (Forgetting to double gives $2x^3$.)`,
    hints: ["Multiply both sides by y, then integrate."],
  });

  const y5 = (x) => 3 * exp(2 * x);
  solves(y5, (x, y) => 2 * y, [0.2, 0.9], "q5");
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Given that $\dfrac{\mathrm{d}y}{\mathrm{d}x} = 2y$ and $y = 3$ when $x = 0$, find the value of $y$ when $x = 1$, correct to 3 significant figures.`,
    value: y5(1), wrong: [3 + exp(2), exp(2)],
    explanation: t`$\ln y = 2x + c$, so $y = A\mathrm{e}^{2x}$; $A = 3$. At $x = 1$: $y = 3\mathrm{e}^2 = 22.2$. ($3 + \mathrm{e}^2$ adds the constant after exponentiating.)`,
    hints: [t`Write the solution as $y = A\mathrm{e}^{2x}$.`],
  });

  const y6 = (x) => sqrt(x * x + 4);
  solves(y6, (x, y) => x / y, [0.5, 1.5, 2.5], "q6");
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $\dfrac{\mathrm{d}y}{\mathrm{d}x} = \dfrac{x}{y}$, given that $y = 2$ when $x = 0$ (with $y > 0$), and find $y$ when $x = 2$, correct to 3 significant figures.`,
    value: y6(2), wrong: [4, sqrt(6)],
    explanation: t`$\int y\,\mathrm{d}y = \int x\,\mathrm{d}x \Rightarrow y^2 = x^2 + c$; $c = 4$. At $x = 2$: $y = \sqrt{8} = 2.83$.`,
    hints: ["Separate and integrate both sides; double to clear the halves."],
  });

  const y7 = (x) => log(exp(x) + Math.E - 1);
  solves(y7, (x, y) => exp(x - y), [0.2, 0.7, 1.2], "q7");
  chk(y7(0), 1);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $\dfrac{\mathrm{d}y}{\mathrm{d}x} = \mathrm{e}^{x - y}$, given that $y = 1$ when $x = 0$. Find $y$ when $x = 1$, correct to 3 significant figures.`,
    value: y7(1), wrong: [2, log(2 * Math.E)],
    explanation: t`$\mathrm{e}^{x - y} = \mathrm{e}^x\mathrm{e}^{-y}$, so $\int \mathrm{e}^y\,\mathrm{d}y = \int \mathrm{e}^x\,\mathrm{d}x$: $\mathrm{e}^y = \mathrm{e}^x + c$. At $(0, 1)$: $c = \mathrm{e} - 1$. At $x = 1$: $\mathrm{e}^y = 2\mathrm{e} - 1$, $y = \ln(2\mathrm{e} - 1) = 1.49$.`,
    hints: [t`Split $\mathrm{e}^{x - y}$ as $\mathrm{e}^x \times \mathrm{e}^{-y}$.`],
  });

  const td = log(2) / 0.2;
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The number of bacteria $N$ in a sample of borehole water satisfies $\dfrac{\mathrm{d}N}{\mathrm{d}t} = 0.2N$, where $t$ is in hours, and $N = 500$ when $t = 0$. Find the time taken for the number to double, correct to 3 significant figures.`,
    value: td, unit: "h", wrong: [5, 0.2 * log(2)],
    explanation: t`$N = 500\mathrm{e}^{0.2t}$. Doubling: $1000 = 500\mathrm{e}^{0.2t}$, so $\mathrm{e}^{0.2t} = 2$ and $t = \frac{\ln 2}{0.2} = 3.47$ hours (independent of the starting number).`,
    hints: ["Set N = 1000 and take natural logarithms."],
  });
  solves((x) => 500 * exp(0.2 * x), (x, y) => 0.2 * y, [1, 3], "q8");

  // dx/dt = −k x², x(0) = 4, x(2) = 1 → 1/x = kt + 1/4, k = 0.375
  const k9 = (1 - 0.25) / 2;
  const x9 = (tt) => 1 / (k9 * tt + 0.25);
  solves(x9, (tt, x) => -k9 * x * x, [0.5, 1.5, 4], "q9");
  chk(x9(2), 1); chk(x9(6), 0.4);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The concentration $x$ of a pollutant in a dam satisfies $\dfrac{\mathrm{d}x}{\mathrm{d}t} = -kx^2$, where $k$ is a constant and $t$ is in weeks. Initially $x = 4$, and when $t = 2$, $x = 1$. Find $x$ when $t = 6$.`,
    value: x9(6), wrong: [0.25, 1 / 3],
    explanation: t`$\int x^{-2}\,\mathrm{d}x = \int -k\,\mathrm{d}t \Rightarrow -\frac{1}{x} = -kt + c$, i.e. $\frac{1}{x} = kt + \frac{1}{4}$. At $t = 2$: $1 = 2k + 0.25$, $k = 0.375$. At $t = 6$: $\frac{1}{x} = 2.25 + 0.25 = 2.5$, so $x = 0.4$.`,
    hints: [t`$\int x^{-2}\,\mathrm{d}x = -x^{-1}$.`, "Find the constant of integration first, then k."],
  });

  // (x² − 1) dy/dx = 2y → y = A(x − 1)/(x + 1), y(2) = 1 → A = 3
  const y10 = (x) => (3 * (x - 1)) / (x + 1);
  solves(y10, (x, y) => (2 * y) / (x * x - 1), [1.5, 3, 6], "q10");
  chk(y10(2), 1);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Given that $(x^2 - 1)\dfrac{\mathrm{d}y}{\mathrm{d}x} = 2y$ for $x > 1$, and $y = 1$ when $x = 2$, find $y$ when $x = 5$.`,
    value: y10(5), wrong: [4 / 6, 3],
    explanation: t`$\int \frac{1}{y}\,\mathrm{d}y = \int \frac{2}{x^2 - 1}\,\mathrm{d}x = \int \left(\frac{1}{x - 1} - \frac{1}{x + 1}\right)\mathrm{d}x$. So $\ln y = \ln\frac{x - 1}{x + 1} + \ln A$, $y = A\frac{x - 1}{x + 1}$. At $x = 2$: $1 = \frac{A}{3}$, $A = 3$. At $x = 5$: $y = 3 \times \frac{4}{6} = 2$.`,
    hints: [t`Use partial fractions: $\frac{2}{x^2 - 1} = \frac{1}{x - 1} - \frac{1}{x + 1}$.`],
  });

  // y dy/dx = x e^x → y² = 2(x − 1)e^x + 6
  const y11 = (x) => sqrt(2 * (x - 1) * exp(x) + 6);
  solves(y11, (x, y) => (x * exp(x)) / y, [0.3, 1, 1.6], "q11");
  chk(y11(0), 2);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Solve $y\dfrac{\mathrm{d}y}{\mathrm{d}x} = x\mathrm{e}^x$, given that $y = 2$ when $x = 0$ (with $y > 0$). Find $y$ when $x = 1$, correct to 3 significant figures.`,
    value: y11(1), wrong: [sqrt(2 * Math.E + 4), 2],
    explanation: t`$\int y\,\mathrm{d}y = \int x\mathrm{e}^x\,\mathrm{d}x$. By parts, $\int x\mathrm{e}^x\,\mathrm{d}x = (x - 1)\mathrm{e}^x$. So $\frac{1}{2}y^2 = (x - 1)\mathrm{e}^x + c$; at $(0, 2)$: $2 = -1 + c$, $c = 3$. Then $y^2 = 2(x - 1)\mathrm{e}^x + 6$, and at $x = 1$, $y = \sqrt{6} = 2.45$.`,
    hints: ["Integrate x e^x by parts.", "Do not forget the −1 from (x − 1)eˣ at x = 0."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`A model for the temperature $T$ °C of a bread loaf cooling in a Harare bakery is $T = 25 + 60\mathrm{e}^{-0.05t}$, where $t$ is in minutes. What does the model predict in the long run?`,
    options: [
      ["It approaches 25 °C, the room temperature", t`Correct: $\mathrm{e}^{-0.05t} \to 0$ as $t \to \infty$.`],
      ["It keeps falling until it reaches 0 °C", t`The exponential term tends to 0, leaving $T = 25$, not 0.`],
      ["It settles at its starting value of 85 °C", "85 °C is the starting temperature (t = 0)."],
      ["It drops below 25 °C after about 20 minutes", t`$60\mathrm{e}^{-0.05t}$ is always positive, so $T > 25$ for all $t$.`],
    ],
    answer: "A",
    explanation: "Interpret the limit in context: the loaf cools towards the temperature of its surroundings.",
    hints: ["What happens to e^(−0.05t) as t grows?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each statement (k > 0) with its differential equation.",
    pairs: [
      ["P grows at a rate proportional to P", t`$\frac{\mathrm{d}P}{\mathrm{d}t} = kP$`],
      ["V decreases at a rate proportional to V", t`$\frac{\mathrm{d}V}{\mathrm{d}t} = -kV$`],
      ["h decreases at a rate proportional to √h", t`$\frac{\mathrm{d}h}{\mathrm{d}t} = -k\sqrt{h}$`],
      ["θ falls at a rate proportional to its excess over 20", t`$\frac{\mathrm{d}\theta}{\mathrm{d}t} = -k(\theta - 20)$`],
    ],
    explanation: "Rate of change → derivative with respect to t; decrease → minus sign; proportional → k times the stated quantity.",
  });

  solves((x) => 2 / cos(x), (x, y) => y * tan(x), [0.2, 0.6, 1.1], "q14");
  b.proof({
    d: 3, skill: "APPLICATION", calculator: false, marks: 4,
    stem: t`Show that the solution of $\dfrac{\mathrm{d}y}{\mathrm{d}x} = y\tan x$, for $-\frac{\pi}{2} < x < \frac{\pi}{2}$, with $y = 2$ when $x = 0$, is $y = 2\sec x$.`,
    points: [
      t`M1 separates: $\int \frac{1}{y}\,\mathrm{d}y = \int \tan x\,\mathrm{d}x$.`,
      t`A1 integrates: $\ln y = -\ln\cos x + c = \ln\sec x + c$.`,
      t`M1 uses $y = 2$ at $x = 0$ to get $c = \ln 2$.`,
      t`A1 combines logarithms to reach $y = 2\sec x$.`,
    ],
    modelAnswer: t`$$
\int \frac{1}{y}\,\mathrm{d}y = \int \tan x\,\mathrm{d}x \Rightarrow \ln y = \ln\sec x + c
$$
$$
x = 0, y = 2: \ln 2 = \ln 1 + c \Rightarrow c = \ln 2
$$
$$
\ln y = \ln(2\sec x) \Rightarrow y = 2\sec x
$$`,
    explanation: t`$\int \tan x\,\mathrm{d}x = \ln|\sec x| + c$ is in MF19.`,
    hints: [t`$\int \tan x\,\mathrm{d}x = \ln|\sec x|$.`],
  });

  b.manualShort({
    d: 3, skill: "APPLICATION", calculator: false, marks: 3, applies: ZP,
    stem: t`Find the general solution of $\dfrac{\mathrm{d}y}{\mathrm{d}x} = \dfrac{y}{x}$ (for $x > 0$) and describe how you would sketch three typical members of the family of solution curves.`,
    points: [
      t`Separates and integrates: $\ln y = \ln x + \ln A$, so $y = Ax$.`,
      "The family is the set of straight lines through the origin (gradient A).",
      "Sketch, for example, A = 1, A = 2 and A = −1 as lines through O for x > 0, labelled with their equations.",
    ],
    modelAnswer: "∫ dy/y = ∫ dx/x gives ln|y| = ln x + c, so y = Ax. Every solution curve is a half-line through the origin; draw y = x, y = 2x and y = −x for x > 0 and label each.",
    explanation: "The arbitrary constant labels the members of the family.",
    hints: [t`Write the constant as $\ln A$.`],
  });

  // dy/dx = 2y/x → y = Ax²; through (2, 12) → A = 3
  solves((x) => 3 * x * x, (x, y) => (2 * y) / x, [1, 2.5], "q16");
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false, applies: ZP,
    stem: t`The family of solution curves of $\dfrac{\mathrm{d}y}{\mathrm{d}x} = \dfrac{2y}{x}$ has equations $y = Ax^n$. Find $n$, and the value of $A$ for the member of the family that passes through $(2, 12)$.`,
    template: "n = {{blank:n}}, A = {{blank:a}}",
    blanks: [N("n", 2, "1"), N("a", 3, "6")],
    explanation: t`$\int \frac{1}{y}\,\mathrm{d}y = \int \frac{2}{x}\,\mathrm{d}x \Rightarrow \ln y = 2\ln x + \ln A \Rightarrow y = Ax^2$. Through $(2, 12)$: $12 = 4A$, $A = 3$. The family is the set of parabolas $y = Ax^2$ with vertex at the origin.`,
    hints: [t`$2\ln x = \ln x^2$.`],
  });

  // Struct 12: dN/dt = kN, N(0) = 1200, N(5) = 1800
  const k17 = log(1.5) / 5;
  const N17 = (tt) => 1200 * exp(k17 * tt);
  chk(N17(5), 1800, 1e-9); chk(N17(10), 2700, 1e-9);
  const t17 = log(5000 / 1200) / k17;
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The number of fish, $N$, in a dam in Masvingo is modelled by $\dfrac{\mathrm{d}N}{\mathrm{d}t} = kN$, where $t$ is the time in years and $k$ is a constant. When the dam is first stocked, $N = 1200$; five years later, $N = 1800$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $N = 1200\mathrm{e}^{kt}$.`,
        points: [t`M1 separates: $\int \frac{1}{N}\,\mathrm{d}N = \int k\,\mathrm{d}t$.`, t`A1 $\ln N = kt + c$.`, t`A1 uses $N = 1200$ at $t = 0$ to obtain $N = 1200\mathrm{e}^{kt}$.`],
        modelAnswer: t`$$
\int \frac{1}{N}\,\mathrm{d}N = \int k\,\mathrm{d}t \Rightarrow \ln N = kt + c
$$
$$
t = 0, N = 1200: c = \ln 1200 \Rightarrow N = \mathrm{e}^{kt + \ln 1200} = 1200\mathrm{e}^{kt}
$$`,
        explanation: "Separate, integrate, then apply the initial condition." }),
      P.num({ label: "(b)", marks: 2, stem: "Find the value of k, correct to 3 significant figures.", value: k17, wrong: [log(1800 / 1200), 1.5 / 5],
        explanation: t`$1800 = 1200\mathrm{e}^{5k} \Rightarrow \mathrm{e}^{5k} = 1.5 \Rightarrow k = \frac{1}{5}\ln 1.5 = 0.0811$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the number of fish predicted after 10 years.", value: N17(10), wrong: [2400, 3600],
        explanation: t`$N(10) = 1200\mathrm{e}^{10k} = 1200(\mathrm{e}^{5k})^2 = 1200 \times 1.5^2 = 2700$.` }),
      P.num({ label: "(d)", marks: 3, stem: "Find the time when the model predicts 5000 fish, correct to 3 significant figures.", value: t17, wrong: [5000 / 1200, log(5000) / k17],
        explanation: t`$5000 = 1200\mathrm{e}^{kt} \Rightarrow t = \frac{1}{k}\ln\frac{25}{6} = \frac{\ln(25/6)}{0.08109} = 17.6$ years.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Give one reason why this model is unlikely to be accurate for large values of t.", points: ["The model predicts unlimited exponential growth (N → ∞).", "A real dam has limited food and space (and fishing/predators), so growth must slow down."],
        modelAnswer: "N = 1200e^(kt) grows without limit, but the dam can only support a limited number of fish because food and space run out (and people fish it), so the growth rate will fall.",
        explanation: "Exponential growth models break down when resources are limited." }),
    ],
    explanation: "Growth proportional to size gives an exponential model; two data points fix the constants.",
    hints: ["Use the two given values of N to find the constant of integration and k.", t`$\mathrm{e}^{10k} = (\mathrm{e}^{5k})^2$.`],
  });

  // Struct 13: dx/dt = x(2 − x), x(0) = 1 → x = 2/(1 + e^{−2t})
  const x18 = (tt) => 2 / (1 + exp(-2 * tt));
  solves(x18, (tt, x) => x * (2 - x), [0.2, 0.8, 1.5], "q18");
  chk(x18(0), 1);
  const t18 = log(3) / 2;
  chk(x18(t18), 1.5);
  [0.3, 0.7, 1.4].forEach((x) => chk(1 / (x * (2 - x)), 0.5 / x + 0.5 / (2 - x)));
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The proportion of farmers in a district who have adopted a new maize variety is modelled by $x$ (in hundreds of farmers), where $\dfrac{\mathrm{d}x}{\mathrm{d}t} = x(2 - x)$, $t$ is the time in years, and $x = 1$ when $t = 0$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Express $\dfrac{1}{x(2 - x)}$ in partial fractions $\dfrac{A}{x} + \dfrac{B}{2 - x}$.`, template: "A = {{blank:a}}, B = {{blank:b}}",
        blanks: [FR("a", ["1/2", "0.5"], "1"), FR("b", ["1/2", "0.5"], "-1/2")],
        explanation: t`$1 = A(2 - x) + Bx$. At $x = 0$: $A = \frac{1}{2}$. At $x = 2$: $B = \frac{1}{2}$.` }),
      P.proof({ label: "(b)", marks: 4, stem: t`Hence show that $\ln\left(\dfrac{x}{2 - x}\right) = 2t$.`,
        points: [t`M1 separates: $\int \frac{1}{x(2 - x)}\,\mathrm{d}x = \int 1\,\mathrm{d}t$.`, t`A1 integrates: $\frac{1}{2}\ln x - \frac{1}{2}\ln(2 - x) = t + c$.`, t`M1 uses $x = 1$, $t = 0$: $c = 0$.`, "A1 combines the logarithms and doubles to reach the given result."],
        modelAnswer: t`$$
\int \left(\frac{1}{2x} + \frac{1}{2(2 - x)}\right)\mathrm{d}x = \int \mathrm{d}t
$$
$$
\tfrac{1}{2}\ln x - \tfrac{1}{2}\ln(2 - x) = t + c
$$
$$
t = 0, x = 1: \; 0 - 0 = c \Rightarrow c = 0
$$
$$
\ln\left(\frac{x}{2 - x}\right) = 2t
$$`,
        explanation: t`$\int \frac{1}{2 - x}\,\mathrm{d}x = -\ln(2 - x)$: watch the sign.` }),
      P.expr({ label: "(c)", marks: 3, stem: "Express x in terms of t. Type your answer, e.g. x=3/(1+e^(-t)).",
        accepted: ["x=2/(1+e^(-2t))", "x=2/(1+e^-2t)", "x=2e^(2t)/(1+e^(2t))", "x=2e^(2t)/(e^(2t)+1)", "x=2/(e^(-2t)+1)", "2/(1+e^(-2t))", "2e^(2t)/(1+e^(2t))", "x=(2e^(2t))/(1+e^(2t))"],
        wrong: ["x=2e^(2t)"],
        explanation: t`$\frac{x}{2 - x} = \mathrm{e}^{2t} \Rightarrow x = 2\mathrm{e}^{2t} - x\mathrm{e}^{2t} \Rightarrow x(1 + \mathrm{e}^{2t}) = 2\mathrm{e}^{2t} \Rightarrow x = \dfrac{2\mathrm{e}^{2t}}{1 + \mathrm{e}^{2t}} = \dfrac{2}{1 + \mathrm{e}^{-2t}}$.` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the time at which x = 1.5, correct to 3 significant figures.", value: t18, wrong: [log(3), log(1.5) / 2],
        explanation: t`$\ln\frac{1.5}{0.5} = 2t \Rightarrow t = \frac{1}{2}\ln 3 = 0.549$ years.` }),
      P.num({ label: "(e)", marks: 2, stem: "State the value that x approaches as t becomes large.", value: 2, wrong: [1, 0],
        explanation: t`As $t \to \infty$, $\mathrm{e}^{-2t} \to 0$, so $x \to 2$: in the long run about 200 farmers adopt the variety.` }),
    ],
    explanation: "Partial fractions make the separated integral possible; the solution is a logistic curve levelling off at x = 2.",
    hints: ["Separate, then use the partial fractions from (a).", t`Rearrange $\frac{x}{2 - x} = \mathrm{e}^{2t}$ for $x$.`],
  });

  b.card("DEFINITION", "Separable differential equation", t`$\frac{\mathrm{d}y}{\mathrm{d}x} = f(x)g(y)$: a function of $x$ times a function of $y$.`);
  b.card("FORMULA", "Separating the variables", t`$\int \frac{1}{g(y)}\,\mathrm{d}y = \int f(x)\,\mathrm{d}x + c$`);
  b.card("CONCEPT", "General and particular solutions", "The general solution has an arbitrary constant (a family of curves); an initial condition fixes it (a particular solution).");
  b.card("CONCEPT", "Forming a differential equation", t`"Rate of change of $y$" → $\frac{\mathrm{d}y}{\mathrm{d}t}$; "proportional to" → $k \times$; "decreasing" → minus sign.`);
  b.card("FORMULA", "Exponential growth and decay", t`$\frac{\mathrm{d}N}{\mathrm{d}t} = kN \Rightarrow N = N_0\mathrm{e}^{kt}$`);
  b.card("CONCEPT", "Using ln A for the constant", t`Write $c$ as $\ln A$ so that $\ln y = \ln x + \ln A$ gives $y = Ax$ at once.`);
  b.card("FACT", "Constant in the right place", t`Add $+c$ when you integrate, before exponentiating: $y = A\mathrm{e}^{x^2}$, not $\mathrm{e}^{x^2} + c$.`);
  b.card("CONCEPT", "Interpreting a model", "Look at the limit as t → ∞ and describe it in context (e.g. temperature approaches room temperature).");
  b.card("CONCEPT", "Family of solution curves", t`Draw the general solution for several values of the constant, e.g. $y = Ax^2$ for $A = 1, 2, -1$.`, undefined, { applies: ZP });
});
