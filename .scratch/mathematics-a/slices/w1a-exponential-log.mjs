// W1a: amaths.functions.exponential-log — e^x, ln x, graphs, growth and decay (ZIMSEC Pure F5; Cambridge P2/P3).
import { concept, P, t, chk } from "../lib.mjs";

concept("amaths.functions.exponential-log", { file: "functions/exponential-log", keyPrefix: "functions.exponential-log" }, (b) => {
  chk(Math.log(Math.exp(3)), 3, 1e-12);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the value of $\ln\left(\mathrm{e}^{3}\right)$?`,
    options: [
      [t`$3$`, t`Correct: $\ln$ and $\mathrm{e}^{x}$ are inverse functions.`],
      [t`$\mathrm{e}^{3}$`, "The logarithm undoes the exponential, leaving the index."],
      [t`$3\mathrm{e}$`, t`$\ln\left(\mathrm{e}^{3}\right) = 3\ln \mathrm{e} = 3 \times 1$.`],
      [t`$1$`, t`$\ln \mathrm{e} = 1$, but here the index is 3.`],
    ],
    answer: "A",
    explanation: t`$\ln\left(\mathrm{e}^{x}\right) = x$ for every real $x$, so $\ln\left(\mathrm{e}^{3}\right) = 3$.`,
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the largest possible domain of $f(x) = \ln(x - 2)$?`,
    options: [
      [t`$x > 2$`, "Correct: the logarithm needs a positive argument."],
      [t`$x \geq 2$`, t`$\ln 0$ is undefined, so $x = 2$ is excluded.`],
      [t`$x > 0$`, "The argument is x − 2, not x."],
      [t`$x > 3$`, "f(3) = ln 1 = 0 is defined; the condition is x − 2 > 0."],
    ],
    answer: "A",
    explanation: t`$\ln u$ is defined only for $u > 0$, so $x - 2 > 0$, i.e. $x > 2$.`,
  });

  const x3 = Math.log(15);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`Solve $\mathrm{e}^{x} = 15$, giving your answer to 3 significant figures.`,
    value: x3, prefix: "x =", wrong: [1.18, 3269017],
    explanation: t`$x = \ln 15 = 2.7080\ldots \approx 2.71$. (Using $\log_{10}$ gives 1.18.)`,
  });

  const x4 = Math.exp(1.5);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`Solve $\ln x = 1.5$, giving your answer to 3 significant figures.`,
    value: x4, prefix: "x =", wrong: [0.405, 31.6],
    explanation: t`$x = \mathrm{e}^{1.5} = 4.4817\ldots \approx 4.48$. (Using $10^{1.5}$ gives 31.6.)`,
  });

  const x5 = 0.5 * Math.log(20 / 3);
  chk(3 * Math.exp(2 * x5), 20, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $3\mathrm{e}^{2x} = 20$, giving your answer to 3 significant figures.`,
    value: x5, prefix: "x =", wrong: [1.90, 0.856],
    explanation: t`$\mathrm{e}^{2x} = \frac{20}{3}$, so $2x = \ln\frac{20}{3} = 1.8971\ldots$ and $x = 0.94856\ldots \approx 0.949$. (Forgetting to halve gives 1.90.)`,
    hints: ["Divide by 3 before taking logarithms."],
  });

  const x6 = (Math.exp(3) - 5) / 2;
  chk(Math.log(2 * x6 + 5), 3, 1e-12);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $\ln(2x + 5) = 3$, giving your answer to 3 significant figures.`,
    value: x6, prefix: "x =", wrong: [-1, 12.5],
    explanation: t`$2x + 5 = \mathrm{e}^{3} = 20.0855\ldots$, so $x = \frac{\mathrm{e}^{3} - 5}{2} = 7.5428\ldots \approx 7.54$.`,
    hints: ["Raise e to the power of both sides."],
  });

  for (const x of [Math.log(3), Math.log(4)]) chk(Math.exp(2 * x) - 7 * Math.exp(x) + 12, 0, 1e-9);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Solve $\mathrm{e}^{2x} - 7\mathrm{e}^{x} + 12 = 0$, giving each answer to 3 significant figures.`,
    template: "x = {{blank:a}} or x = {{blank:b}} (smaller first)",
    blanks: [
      { id: "a", input: "number", accepted: [Math.log(3)], tolerance: 0.005, wrong: 3 },
      { id: "b", input: "number", accepted: [Math.log(4)], tolerance: 0.005, wrong: 4 },
    ],
    explanation: t`Let $u = \mathrm{e}^{x}$: $u^{2} - 7u + 12 = 0$, so $(u - 3)(u - 4) = 0$. Then $x = \ln 3 = 1.10$ or $x = \ln 4 = 1.39$ (3 s.f.). The values 3 and 4 are $\mathrm{e}^{x}$, not $x$.`,
    hints: [t`$\mathrm{e}^{2x} = \left(\mathrm{e}^{x}\right)^{2}$.`, "Take ln of each value of u."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which statement describes the graph of $y = \mathrm{e}^{x} + 2$?`,
    options: [
      [t`It crosses the $y$-axis at $(0, 3)$ and has asymptote $y = 2$.`, t`Correct: $\mathrm{e}^{0} + 2 = 3$, and $\mathrm{e}^{x} \to 0$ as $x \to -\infty$.`],
      [t`It crosses the $y$-axis at $(0, 2)$ and has asymptote $y = 0$.`, "Adding 2 moves both the intercept and the asymptote up 2."],
      [t`It crosses the $y$-axis at $(0, 3)$ and has asymptote $x = 2$.`, "The asymptote is horizontal."],
      [t`It crosses the $x$-axis at $(-2, 0)$.`, t`$\mathrm{e}^{x} + 2 > 2$, so it never meets the $x$-axis.`],
    ],
    answer: "A",
    explanation: t`$y = \mathrm{e}^{x}$ passes through $(0, 1)$ with asymptote $y = 0$; adding 2 translates it to pass through $(0, 3)$ with asymptote $y = 2$.`,
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which statement describes the graph of $y = \ln(x + 3)$?`,
    options: [
      [t`Vertical asymptote $x = -3$; crosses the $x$-axis at $(-2, 0)$.`, t`Correct: $x + 3 > 0$, and $\ln(x + 3) = 0$ when $x + 3 = 1$.`],
      [t`Vertical asymptote $x = 3$; crosses the $x$-axis at $(4, 0)$.`, "x + 3 moves the graph left, not right."],
      [t`Vertical asymptote $x = -3$; crosses the $x$-axis at $(-3, 0)$.`, "The graph never reaches its asymptote."],
      [t`Horizontal asymptote $y = -3$; crosses the $y$-axis at $(0, 1)$.`, t`The asymptote of a log graph is vertical, and $\ln 3 \approx 1.10$, not 1.`],
    ],
    answer: "A",
    explanation: t`$y = \ln(x + 3)$ is $y = \ln x$ translated 3 units left: asymptote $x = -3$, $x$-intercept $(-2, 0)$, $y$-intercept $(0, \ln 3)$.`,
    hints: ["Where is x + 3 = 0, and where is x + 3 = 1?"],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\ln(a + b) = \ln a + \ln b$ for all positive numbers $a$ and $b$.`,
    answer: false,
    explanation: t`False. The law is $\ln(ab) = \ln a + \ln b$. For example $\ln(1 + 1) = \ln 2 \approx 0.693$, but $\ln 1 + \ln 1 = 0$.`,
  });

  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`The function $y = \mathrm{e}^{-x}$ is decreasing for all real $x$.`,
    answer: true,
    explanation: t`True. $\mathrm{e}^{-x} = \frac{1}{\mathrm{e}^{x}}$; as $x$ increases, $\mathrm{e}^{x}$ increases, so its reciprocal decreases. The graph is the reflection of $y = \mathrm{e}^{x}$ in the $y$-axis.`,
  });

  const v12 = 18000 * Math.exp(-0.6);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The value of a tractor bought by a farmer in Mazowe is modelled by $V = 18\,000\,\mathrm{e}^{-0.15t}$ US dollars, $t$ years after purchase. Find its value after 4 years, to 3 significant figures.`,
    value: v12, wrong: [7200, 32798],
    explanation: t`$V = 18\,000\,\mathrm{e}^{-0.6} = 18\,000 \times 0.54881\ldots = 9878.6\ldots \approx$ US\$9880.`,
    hints: ["Substitute t = 4."],
  });

  const t14 = Math.log(3) / 0.14;
  chk(4500 * Math.exp(-0.14 * t14), 1500, 1e-6);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The value of a motorcycle used for deliveries in Gweru is modelled by $V = 4500\mathrm{e}^{-0.14t}$ US dollars, $t$ years after purchase. Find after how many years its value first falls to one third of its purchase price. Give your answer to 3 significant figures.`,
    value: t14, wrong: [3.41, 2.38],
    explanation: t`$\mathrm{e}^{-0.14t} = \frac{1}{3}$, so $0.14t = \ln 3 = 1.0986\ldots$ and $t = 7.8472\ldots \approx 7.85$ years. (The purchase price does not affect the answer; using $\log_{10}$ instead of $\ln$ gives 3.41.)`,
    workedSolution: [
      t`1. $4500\mathrm{e}^{-0.14t} = 1500 \Rightarrow \mathrm{e}^{-0.14t} = \frac{1}{3}$.`,
      t`2. $-0.14t = \ln\frac{1}{3} = -1.09861\ldots$`,
      t`3. $t = \frac{1.09861\ldots}{0.14} = 7.8472\ldots \approx 7.85$ years.`,
    ].join("\n"),
    hints: ["Isolate the exponential, then take ln."],
  });

  const k13 = Math.log(2) / 6;
  const t13 = Math.log(80 / 5) / k13;
  chk(t13, 24, 1e-9);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The mass $m$ grams of a radioactive sample is modelled by $m = 80\mathrm{e}^{-kt}$, where $t$ is in days. The mass halves every 6 days. Find how many days it takes for the mass to fall to 5 grams.`,
    value: t13, wrong: [12, 96],
    explanation: t`Halving every 6 days: $\mathrm{e}^{-6k} = \frac{1}{2}$, so $k = \frac{\ln 2}{6}$. Then $\mathrm{e}^{-kt} = \frac{5}{80} = \frac{1}{16}$, so $kt = \ln 16 = 4\ln 2$ and $t = \frac{4\ln 2}{\ln 2 / 6} = 24$ days. (80 → 40 → 20 → 10 → 5 is four halvings.)`,
    hints: ["Use the halving information to find k.", "5 g is 1/16 of 80 g."],
  });

  chk(Math.exp(Math.log(Math.E)), Math.E, 1e-12);
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each equation with its exact solution.",
    pairs: [
      [t`$\ln x = 1$`, t`$x = \mathrm{e}$`],
      [t`$\mathrm{e}^{x} = 1$`, t`$x = 0$`],
      [t`$\ln x = -1$`, t`$x = \frac{1}{\mathrm{e}}$`],
      [t`$\mathrm{e}^{x} = \mathrm{e}^{2}$`, t`$x = 2$`],
    ],
    explanation: t`$\ln x = c \iff x = \mathrm{e}^{c}$, and $\mathrm{e}^{x} = c \iff x = \ln c$. So $\mathrm{e}^{1} = \mathrm{e}$, $\ln 1 = 0$, $\mathrm{e}^{-1} = \frac{1}{\mathrm{e}}$, $\ln \mathrm{e}^{2} = 2$.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2, calculator: false,
    stem: t`The temperature of water in a kettle switched off at time $t = 0$ is modelled by $\theta = 15 + 70\mathrm{e}^{-0.05t}$ °C, $t$ in minutes. Interpret the numbers 15 and 85 in this context, where 85 is the value of $\theta$ at $t = 0$.`,
    points: ["15 °C is the long-term temperature the water approaches (room temperature), since the exponential term tends to 0", "85 °C is the temperature of the water when the kettle is switched off (t = 0: 15 + 70)"],
    modelAnswer: "As t increases, e^(−0.05t) → 0, so θ → 15: the water cools towards a room temperature of 15 °C. At t = 0, θ = 15 + 70 = 85, the starting temperature of the water.",
    explanation: "In A + Be^(−kt), A is the long-term value and A + B the initial value.",
    hints: ["What happens to e^(−0.05t) as t becomes large?"],
  });

  const k17 = Math.log(2.4) / 3;
  const t17 = Math.log(20) / k17;
  chk(500 * Math.exp(3 * k17), 1200, 1e-9);
  b.struct({
    examStyle: true, d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The number $N$ of bacteria in a laboratory culture at a Harare hospital is modelled by $N = A\mathrm{e}^{kt}$, where $t$ is the time in hours. Initially there are 500 bacteria; after 3 hours there are 1200.`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "State the value of A.",
        value: 500, prefix: "A =", wrong: [1200],
        explanation: t`At $t = 0$, $N = A\mathrm{e}^{0} = A = 500$.`,
      }),
      P.proof({
        label: "(b)", marks: 1, stem: t`Show that $k = \frac{1}{3}\ln 2.4$.`,
        points: [t`B1 $1200 = 500\mathrm{e}^{3k} \Rightarrow \mathrm{e}^{3k} = 2.4 \Rightarrow 3k = \ln 2.4$`],
        modelAnswer: t`$1200 = 500\mathrm{e}^{3k}$, so $\mathrm{e}^{3k} = 2.4$, $3k = \ln 2.4$ and $k = \frac{1}{3}\ln 2.4$.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Find k to 3 significant figures.",
        value: k17, prefix: "k =", wrong: [0.127],
        explanation: t`$k = \frac{0.87546\ldots}{3} = 0.29182\ldots \approx 0.292$.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Find the time taken for the number of bacteria to reach 10 000, to 3 significant figures.",
        value: t17, unit: "h", wrong: [4.47],
        explanation: t`$\mathrm{e}^{kt} = 20$, so $t = \frac{\ln 20}{k} = \frac{2.99573\ldots}{0.29182\ldots} = 10.27 \approx 10.3$ hours.`,
      }),
    ],
    explanation: t`$A = 500$; $\mathrm{e}^{3k} = 2.4$ gives $k = \frac{1}{3}\ln 2.4 \approx 0.292$; then $\mathrm{e}^{kt} = 20$ gives $t \approx 10.3$ hours.`,
    hints: ["Put t = 0 to find A.", "Isolate the exponential, then take ln; keep k unrounded."],
  });

  const x18 = -2 * Math.log(3);
  chk(3 - Math.exp(-x18 / 2), 0, 1e-12);
  const finv = (x) => -2 * Math.log(3 - x);
  for (const x of [-1, 0, 2.5]) chk(finv(3 - Math.exp(-x / 2)), x, 1e-9);
  b.struct({
    examStyle: true, d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The function $f$ is defined by $f(x) = 3 - \mathrm{e}^{-\frac{1}{2}x}$ for $x \in \mathbb{R}$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: t`State the $y$-intercept of the graph of $y = f(x)$ and the equation of its horizontal asymptote.`,
        template: "y-intercept y = {{blank:a}}; asymptote y = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [2], wrong: 3 }, { id: "b", input: "number", accepted: [3], wrong: 0 }],
        explanation: t`$f(0) = 3 - 1 = 2$. As $x \to \infty$, $\mathrm{e}^{-\frac{1}{2}x} \to 0$, so $y \to 3$.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Find the x-coordinate where the graph crosses the x-axis, to 3 significant figures.",
        value: x18, prefix: "x =", wrong: [2.2],
        explanation: t`$\mathrm{e}^{-\frac{1}{2}x} = 3 \Rightarrow -\frac{1}{2}x = \ln 3 \Rightarrow x = -2\ln 3 = -2.197\ldots \approx -2.20$.`,
      }),
      P.expr({
        label: "(c)", marks: 2, stem: "Find an expression for f⁻¹(x). Write ln( ) with brackets, for example -2ln(5-x).",
        accepted: ["-2ln(3-x)", "-2*ln(3-x)", "2ln(1/(3-x))", "ln(1/(3-x)^2)", "-ln((3-x)^2)"],
        wrong: ["2ln(3-x)", "-2ln(x-3)"],
        explanation: t`$y = 3 - \mathrm{e}^{-\frac{1}{2}x} \Rightarrow \mathrm{e}^{-\frac{1}{2}x} = 3 - y \Rightarrow x = -2\ln(3 - y)$. So $f^{-1}(x) = -2\ln(3 - x)$ for $x < 3$.`,
      }),
    ],
    explanation: t`The graph rises from below towards the asymptote $y = 3$, crossing the axes at $(0, 2)$ and $(-2\ln 3, 0)$. Its inverse is $f^{-1}(x) = -2\ln(3 - x)$, defined for $x < 3$ (the range of $f$).`,
    hints: ["As x grows, e^(−x/2) tends to 0.", "For the inverse, isolate the exponential first."],
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Which transformation maps the graph of $y = \mathrm{e}^{x}$ onto the graph of $y = \mathrm{e}^{2x}$?`,
    options: [
      [t`Stretch, scale factor $\frac{1}{2}$, parallel to the $x$-axis`, t`Correct: $\mathrm{e}^{2x} = f(2x)$ with $f(x) = \mathrm{e}^{x}$.`],
      ["Stretch, scale factor 2, parallel to the y-axis", t`That gives $2\mathrm{e}^{x}$, which is not $\mathrm{e}^{2x}$.`],
      ["Stretch, scale factor 2, parallel to the x-axis", t`That gives $\mathrm{e}^{\frac{1}{2}x}$.`],
      [t`Translation by $\begin{pmatrix} 0 \\ 2 \end{pmatrix}$`, t`That gives $\mathrm{e}^{x} + 2$.`],
    ],
    answer: "A",
    explanation: t`Replacing $x$ by $2x$ squashes the graph towards the $y$-axis by factor $\frac{1}{2}$. (It can also be seen as $\left(\mathrm{e}^{x}\right)^{2}$, squaring each $y$-value, but that is not one of the standard transformations.)`,
    hints: ["Is the 2 inside or outside the function?"],
  });

  b.card("DEFINITION", "Natural logarithm", t`$\ln x = \log_{\mathrm{e}} x$, for $x > 0$; the inverse of $\mathrm{e}^{x}$: $y = \mathrm{e}^{x} \iff x = \ln y$.`);
  b.card("FACT", t`Key values of $\ln$ and $\mathrm{e}$`, t`$\ln 1 = 0$, $\ln \mathrm{e} = 1$, $\mathrm{e}^{0} = 1$, $\mathrm{e}^{\ln x} = x$, $\ln\left(\mathrm{e}^{x}\right) = x$.`);
  b.card("FACT", t`Graph of $y = \mathrm{e}^{x}$`, t`Through $(0, 1)$, always positive, increasing, asymptote $y = 0$ as $x \to -\infty$.`);
  b.card("FACT", t`Graph of $y = \ln x$`, t`Through $(1, 0)$, domain $x > 0$, increasing, vertical asymptote $x = 0$.`);
  b.card("CONCEPT", t`Growth or decay in $y = A\mathrm{e}^{kt}$`, t`$k > 0$: growth; $k < 0$: decay; $A$ is the value at $t = 0$.`);
  b.card("CONCEPT", t`How do you find $k$ in $y = A\mathrm{e}^{kt}$?`, t`Substitute a data point, isolate $\mathrm{e}^{kt}$, take $\ln$ of both sides; keep $k$ unrounded.`);
  b.card("FACT", t`Long-term value of $\theta = A + B\mathrm{e}^{-kt}$ ($k > 0$)`, t`$\theta \to A$ as $t \to \infty$; the initial value is $A + B$.`);
  b.card("CONCEPT", t`Solving $\mathrm{e}^{2x} - 5\mathrm{e}^{x} + 6 = 0$`, t`Let $u = \mathrm{e}^{x}$; solve $u^{2} - 5u + 6 = 0$; then $x = \ln u$, rejecting $u \leq 0$.`);
});
