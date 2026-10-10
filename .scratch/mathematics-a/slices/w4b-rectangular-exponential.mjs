// W4b: amaths.continuous.rectangular-exponential (ZIMSEC only: Statistics F5 rectangular, F6 exponential)
import { concept, P, t, chk, expo, integrate } from "../lib.mjs";
import { f3, f4, NB } from "../tables/w4b-kit.mjs";

const { exp, log, sqrt } = Math;

concept("amaths.continuous.rectangular-exponential", { file: "continuous/rectangular-exponential", keyPrefix: "continuous.rectangular-exponential" }, (b) => {
  // q01 pdf of U(2, 7)
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The random variable $X$ has a rectangular distribution on $[2, 7]$. What is the value of its pdf $f(x)$ for $2 \le x \le 7$?`,
    options: [
      [t`$\frac{1}{5}$`, t`Correct: $f(x) = \frac{1}{b - a} = \frac{1}{7 - 2}$, so the total area is $5 \times \frac{1}{5} = 1$.`],
      [t`$\frac{1}{7}$`, "This uses the upper limit alone; the width of the interval is 7 − 2 = 5."],
      [t`$\frac{1}{9}$`, "This divides by a + b; the height is one over the width b − a."],
      [t`$5$`, "This is the width of the interval; the height must make the area equal to 1."],
    ],
    answer: "A",
    explanation: t`A rectangle of width $7 - 2 = 5$ and area $1$ has height $\frac{1}{5}$.`,
  });

  // q02 P(4.2 < X < 9) for U(3, 11)
  const p2 = (9 - 4.2) / 8;
  chk(p2, 0.6, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`$X \sim \mathrm{U}(3, 11)$. Find $\mathrm{P}(4.2 < X < 9)$.`,
    value: p2, wrong: [(9 - 4.2) / 11, (9 - 4.2) / 14],
    explanation: t`Probability = length of the interval / total length $= \frac{9 - 4.2}{11 - 3} = \frac{4.8}{8} = 0.6$.`,
  });

  // q03 variance of U(−2, 10)
  const v3 = (10 - -2) ** 2 / 12;
  chk(v3, 12, 1e-12);
  chk(integrate((x) => (x * x) / 12, -2, 10) - 4 ** 2, v3, 1e-6);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`$X$ has a rectangular distribution on $[-2, 10]$. Find $\mathrm{Var}(X)$.`,
    value: v3, wrong: [1, f3(64 / 12)],
    explanation: t`$\mathrm{Var}(X) = \frac{(b - a)^2}{12} = \frac{12^2}{12} = 12$. ($1$ comes from $\frac{b - a}{12}$ without squaring; $\frac{64}{12}$ from using $b + a = 8$.)`,
  });

  // q04 tf exponential median vs mean
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "For an exponential distribution, the median is greater than the mean.",
    answer: false,
    explanation: t`The median is $\frac{\ln 2}{\lambda} \approx \frac{0.693}{\lambda}$, smaller than the mean $\frac{1}{\lambda}$. The long right tail pulls the mean up.`,
  });

  // q05 P(X > 4), λ = 0.2
  const p5 = expo.gt(0.2, 4);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`$X$ has an exponential distribution with parameter $\lambda = 0.2$. Find $\mathrm{P}(X > 4)$, correct to 3 significant figures.`,
    value: p5, wrong: [f3(1 - p5), f3(exp(-20))],
    explanation: t`$\mathrm{P}(X > x) = \mathrm{e}^{-\lambda x} = \mathrm{e}^{-0.8} = ${f3(p5)}$. ($${f3(1 - p5)}$ is $\mathrm{P}(X \le 4)$; $\mathrm{e}^{-20}$ uses $\frac{4}{0.2}$.)`,
  });

  // q06 λ from the mean
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "The time between calls to a clinic switchboard in Bulawayo has an exponential distribution with mean 5 minutes. What is the value of the parameter λ (per minute)?",
    options: [
      ["0.2", t`Correct: mean $= \frac{1}{\lambda} = 5$, so $\lambda = \frac{1}{5}$.`],
      ["5", "λ is the rate, not the mean: the mean is 1/λ."],
      ["25", "This squares the mean: 25 is the variance 1/λ², not the parameter."],
      ["0.04", "This is 1/25, which is λ², not λ."],
    ],
    answer: "A",
    explanation: t`For the exponential distribution, $\mathrm{E}(X) = \frac{1}{\lambda}$, so $\lambda = \frac{1}{5} = 0.2$ per minute.`,
  });

  // q07 P(3 < T < 8), λ = 0.15
  const p7 = expo.gt(0.15, 3) - expo.gt(0.15, 8);
  chk(p7, integrate((x) => expo.pdf(0.15, x), 3, 8), 1e-8);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The time $T$ hours that a Hwange coal truck waits at a weighbridge has an exponential distribution with $\lambda = 0.15$. Find $\mathrm{P}(3 < T < 8)$, correct to 3 significant figures.`,
    value: p7, wrong: [f3(expo.gt(0.15, 5)), f3(exp(-0.15 * 3) + exp(-0.15 * 8))],
    explanation: t`$\mathrm{P}(3 < T < 8) = \mathrm{e}^{-0.45} - \mathrm{e}^{-1.2} = ${f4(exp(-0.45))} - ${f4(exp(-1.2))} = ${f3(p7)}$. ($\mathrm{e}^{-0.75}$ treats it as $\mathrm{P}(T > 5)$, which ignores where the interval starts.)`,
    workedSolution: t`1. $\mathrm{P}(T > t) = \mathrm{e}^{-0.15t}$.
2. $\mathrm{P}(T > 3) = \mathrm{e}^{-0.45} = ${f4(exp(-0.45))}$; $\mathrm{P}(T > 8) = \mathrm{e}^{-1.2} = ${f4(exp(-1.2))}$.
3. $\mathrm{P}(3 < T < 8) = ${f4(exp(-0.45))} - ${f4(exp(-1.2))} = ${f3(p7)}$.`,
    hints: ["Subtract two survival probabilities e^(−λt)."],
  });

  // q08 median from the mean
  const m8 = 6 * log(2);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The lifetime of an LED bulb, in thousands of hours, has an exponential distribution with mean $6$. Find the median lifetime in thousands of hours, correct to 3 significant figures.`,
    value: m8, wrong: [6, f3(log(2) / 6)],
    explanation: t`$\lambda = \frac{1}{6}$. The median $m$ solves $\mathrm{e}^{-m/6} = \frac{1}{2}$, so $m = 6\ln 2 = ${f3(m8)}$. ($\frac{\ln 2}{6}$ uses $\lambda = 6$.)`,
    hints: [t`Solve $\mathrm{P}(X > m) = 0.5$.`],
  });

  // q09 rounding errors
  const v9 = 0.1 ** 2 / 12;
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Bags of maize meal are weighed and the masses recorded to the nearest 0.1 kg. The rounding error E kg is modelled by a rectangular distribution. Find the mean and the variance of E, giving the variance correct to 3 significant figures.",
    template: "mean = {{blank:m}} kg, variance = {{blank:v}} kg²",
    blanks: [NB("m", 0, 0.05), NB("v", v9, f3(0.1 / 12))],
    explanation: t`$E \sim \mathrm{U}(-0.05, 0.05)$: mean $0$; variance $\frac{0.1^2}{12} = ${f3(v9)}$ kg$^2$.`,
    hints: ["A value recorded to the nearest 0.1 can be up to 0.05 either side of the truth."],
  });

  // q10 λ from a probability
  const l10 = -log(0.3) / 5;
  chk(expo.gt(l10, 5), 0.3, 1e-12);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The waiting time $X$ minutes at a borehole in Masvingo has an exponential distribution, and $\mathrm{P}(X > 5) = 0.3$. Find $\lambda$, correct to 3 significant figures.`,
    value: l10, wrong: [f3(-log(0.7) / 5), f3(0.3 / 5)],
    explanation: t`$\mathrm{e}^{-5\lambda} = 0.3 \Rightarrow \lambda = -\frac{\ln 0.3}{5} = ${f3(l10)}$. ($${f3(-log(0.7) / 5)}$ uses $\mathrm{P}(X \le 5) = 0.3$.)`,
    hints: ["Take natural logs of e^(−5λ) = 0.3."],
  });

  // q11 memoryless
  const p11 = expo.gt(1 / 500, 150);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: t`The lifetime $T$ hours of a fuse has an exponential distribution with mean $500$ hours. A fuse has already lasted $250$ hours. What is the probability that it lasts at least another $150$ hours?`,
    options: [
      [t`$\mathrm{e}^{-0.3} \approx ${f3(p11)}$`, t`Correct: by the memoryless property, $\mathrm{P}(T > 400 \mid T > 250) = \mathrm{P}(T > 150) = \mathrm{e}^{-150/500}$.`],
      [t`$\mathrm{e}^{-0.8} \approx ${f3(exp(-0.8))}$`, "This is P(T > 400), which ignores the information that the fuse has already lasted 250 hours."],
      [t`$1 - \mathrm{e}^{-0.3} \approx ${f3(1 - p11)}$`, "This is the probability that it fails within the next 150 hours."],
      [t`$\mathrm{e}^{-0.5} \approx ${f3(exp(-0.5))}$`, "This is P(T > 250), the probability it has survived so far, not the further 150 hours."],
    ],
    answer: "A",
    explanation: t`$\mathrm{P}(T > 400 \mid T > 250) = \frac{\mathrm{e}^{-400/500}}{\mathrm{e}^{-250/500}} = \mathrm{e}^{-150/500} = ${f3(p11)}$.`,
    hints: ["Use the conditional probability formula with the survival function."],
  });

  // q12 a and b from mean and variance
  b.fib({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`$X \sim \mathrm{U}(a, b)$ has mean $6$ and variance $3$. Find $a$ and $b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [NB("a", 3, 4.5), NB("b", 9, 7.5)],
    explanation: t`$\frac{a + b}{2} = 6 \Rightarrow a + b = 12$; $\frac{(b - a)^2}{12} = 3 \Rightarrow b - a = 6$. So $b = 9$, $a = 3$. (The values $4.5$ and $7.5$ come from $b - a = 3$, forgetting to square.)`,
    hints: ["Write two equations, one for the mean and one for the variance."],
  });

  // q13 cdf as an expression
  b.expr({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`$X$ has an exponential distribution with $\lambda = 0.4$. Write down the cumulative distribution function $F(x)$ for $x \ge 0$. Type your answer like 1-e^(-2x).`,
    accepted: ["1-e^(-0.4x)", "1-e^-0.4x", "1-exp(-0.4x)", "1-e^(-2x/5)", "1-1/e^(0.4x)"],
    rejected: ["e^(-0.4x)", "1-e^(0.4x)", "0.4e^(-0.4x)"],
    wrong: ["e^(-0.4x)", "0.4e^(-0.4x)"],
    explanation: t`$F(x) = \int_0^x 0.4\mathrm{e}^{-0.4t}\,\mathrm{d}t = 1 - \mathrm{e}^{-0.4x}$. ($\mathrm{e}^{-0.4x}$ is $\mathrm{P}(X > x)$; $0.4\mathrm{e}^{-0.4x}$ is the pdf.)`,
  });

  // q14 match
  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`Match each quantity with its formula.`,
    pairs: [
      [t`Variance of $\mathrm{U}(a, b)$`, t`$\dfrac{(b - a)^2}{12}$`],
      [t`Mean of $\mathrm{U}(a, b)$`, t`$\dfrac{a + b}{2}$`],
      ["Median of the exponential distribution", t`$\dfrac{\ln 2}{\lambda}$`],
      ["Variance of the exponential distribution", t`$\dfrac{1}{\lambda^2}$`],
    ],
    explanation: "The rectangular results come from integrating a constant pdf; the exponential ones from integration by parts and solving e^(−λm) = ½.",
  });

  // q15 P(X > mean)
  const p15 = exp(-1);
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: true,
    stem: "For any exponential distribution, what is the probability that X exceeds its mean?",
    options: [
      [t`$\mathrm{e}^{-1} \approx ${f3(p15)}$`, t`Correct: $\mathrm{P}(X > \frac{1}{\lambda}) = \mathrm{e}^{-\lambda \times \frac{1}{\lambda}} = \mathrm{e}^{-1}$, whatever $\lambda$ is.`],
      ["0.5", "That is true for the median, not the mean; the exponential distribution is skewed."],
      [t`$1 - \mathrm{e}^{-1} \approx ${f3(1 - p15)}$`, "This is the probability that X is less than its mean."],
      ["It depends on the value of λ", "λ cancels: the answer is the same for every exponential distribution."],
    ],
    answer: "A",
    explanation: t`$\mathrm{P}(X > \frac{1}{\lambda}) = \mathrm{e}^{-1} \approx ${f3(p15)}$: only about 37% of values exceed the mean.`,
  });

  // q16 proof: rectangular variance
  b.proof({
    d: 3, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`$X \sim \mathrm{U}(a, b)$. Show by integration that $\mathrm{Var}(X) = \dfrac{(b - a)^2}{12}$. You may use $\mathrm{E}(X) = \dfrac{a + b}{2}$.`,
    points: [
      "M1 writes E(X²) = ∫ x²/(b − a) dx from a to b.",
      "A1 obtains (b³ − a³)/(3(b − a)) = (a² + ab + b²)/3.",
      "M1 uses Var(X) = E(X²) − [E(X)]² with E(X) = (a + b)/2.",
      "A1 simplifies to (b − a)²/12 with no errors.",
    ],
    modelAnswer: t`$$
\mathrm{E}(X^2) = \int_a^b \frac{x^2}{b - a}\,\mathrm{d}x = \frac{b^3 - a^3}{3(b - a)} = \frac{a^2 + ab + b^2}{3}
$$
$$
\mathrm{Var}(X) = \frac{a^2 + ab + b^2}{3} - \frac{(a + b)^2}{4} = \frac{4a^2 + 4ab + 4b^2 - 3a^2 - 6ab - 3b^2}{12}
$$
$$
= \frac{a^2 - 2ab + b^2}{12} = \frac{(b - a)^2}{12}
$$`,
    explanation: "Factorise b³ − a³ = (b − a)(a² + ab + b²), then use a common denominator of 12.",
    hints: ["b³ − a³ = (b − a)(a² + ab + b²)."],
  });

  // q17 proof: exponential mean
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`$X$ has pdf $f(x) = \lambda\mathrm{e}^{-\lambda x}$ for $x \ge 0$. Use integration by parts to show that $\mathrm{E}(X) = \dfrac{1}{\lambda}$.`,
    points: [
      "M1 writes E(X) = ∫ xλe^(−λx) dx from 0 to ∞ and chooses u = x, dv/dx = λe^(−λx).",
      "A1 obtains [−xe^(−λx)] + ∫ e^(−λx) dx.",
      "B1 states the boundary term is 0 (xe^(−λx) → 0 as x → ∞, and 0 at x = 0).",
      "A1 evaluates ∫ e^(−λx) dx from 0 to ∞ = 1/λ.",
    ],
    modelAnswer: t`$$
\mathrm{E}(X) = \int_0^\infty x\lambda\mathrm{e}^{-\lambda x}\,\mathrm{d}x = \left[-x\mathrm{e}^{-\lambda x}\right]_0^\infty + \int_0^\infty \mathrm{e}^{-\lambda x}\,\mathrm{d}x
$$
$$
= 0 + \left[-\frac{1}{\lambda}\mathrm{e}^{-\lambda x}\right]_0^\infty = 0 - \left(-\frac{1}{\lambda}\right) = \frac{1}{\lambda}
$$`,
    explanation: "The boundary term vanishes because the exponential decays faster than x grows.",
    hints: ["Take u = x so that du/dx = 1."],
  });

  // q18 struct 5: kombi waiting time
  const p18a = 6 / 15, sd18 = sqrt(225 / 12), p18c = (10 / 15) ** 2;
  chk(p18a, 0.4, 1e-12);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`Kombis leave a rank on the Harare–Bulawayo road every $15$ minutes. Rudo arrives at a random time, so her waiting time $W$ minutes is modelled by $W \sim \mathrm{U}(0, 15)$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find P(W < 6).", value: p18a, wrong: [6 / 9],
        explanation: t`$\frac{6}{15} = 0.4$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the standard deviation of W, correct to 3 significant figures.", value: sd18, unit: "min", wrong: [18.75, f3(sqrt(15 / 12))],
        explanation: t`$\mathrm{Var}(W) = \frac{15^2}{12} = 18.75$, so $\sigma = \sqrt{18.75} = ${f3(sd18)}$ minutes. ($18.75$ is the variance.)` }),
      P.num({ label: "(c)", marks: 2, stem: "Rudo makes the journey on two independent days. Find the probability that she waits more than 5 minutes on both days, correct to 3 significant figures.", value: p18c, wrong: [f3(2 / 3), f3(1 - p18c)],
        explanation: t`$\mathrm{P}(W > 5) = \frac{10}{15} = \frac{2}{3}$; both days: $\left(\frac{2}{3}\right)^2 = \frac{4}{9} = ${f3(p18c)}$.` }),
    ],
    explanation: "For a rectangular distribution, probabilities are proportions of the interval's length.",
    hints: ["P(W > 5) = (15 − 5)/15.", "Multiply for independent days."],
  });

  // q19 struct 13: component lifetimes
  const l19 = -log(0.65) / 2, mu19 = 1 / l19, med19 = log(2) / l19;
  chk(expo.gt(l19, 5) / expo.gt(l19, 3), 0.65, 1e-12);
  chk(integrate((x) => x * expo.pdf(l19, x), 0, 120, 60000), mu19, 1e-5);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The lifetime $T$ years of a ZESA prepaid meter has an exponential distribution with parameter $\lambda$. Sixty-five per cent of meters last longer than $2$ years.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find λ, correct to 3 significant figures.", value: l19, wrong: [f3(-log(0.35) / 2)],
        explanation: t`$\mathrm{e}^{-2\lambda} = 0.65 \Rightarrow \lambda = -\frac{\ln 0.65}{2} = ${f3(l19)}$. (Using $0.35$ treats $65\%$ as failures.)` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the mean lifetime, correct to 3 significant figures.", value: mu19, wrong: [f3(l19)],
        explanation: t`$\mathrm{E}(T) = \frac{1}{\lambda} = ${f3(mu19)}$ years.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the median lifetime in years, correct to 3 significant figures.", value: med19, wrong: [f3(mu19)],
        explanation: t`$m = \frac{\ln 2}{\lambda} = ${f3(med19)}$ years, less than the mean.` }),
      P.num({ label: "(d)", marks: 2, stem: "A meter has worked for 3 years. Find the probability that it works for at least 2 more years.", value: 0.65, wrong: [f3(expo.gt(l19, 5))],
        explanation: t`Memoryless: $\mathrm{P}(T > 5 \mid T > 3) = \frac{\mathrm{e}^{-5\lambda}}{\mathrm{e}^{-3\lambda}} = \mathrm{e}^{-2\lambda} = 0.65$.` }),
      P.proof({ label: "(e)", marks: 4, stem: t`Show that $\mathrm{E}(T^2) = \dfrac{2}{\lambda^2}$, given $\mathrm{E}(T) = \dfrac{1}{\lambda}$.`,
        points: ["M1 integrates t²λe^(−λt) by parts with u = t².", "A1 obtains [−t²e^(−λt)] + ∫ 2te^(−λt) dt.", "B1 boundary term is 0.", "A1 writes ∫ 2te^(−λt) dt = (2/λ)E(T) = 2/λ²."],
        modelAnswer: t`$$
\mathrm{E}(T^2) = \int_0^\infty t^2\lambda\mathrm{e}^{-\lambda t}\,\mathrm{d}t = \left[-t^2\mathrm{e}^{-\lambda t}\right]_0^\infty + \int_0^\infty 2t\mathrm{e}^{-\lambda t}\,\mathrm{d}t
$$
$$
= 0 + \frac{2}{\lambda}\int_0^\infty t\lambda\mathrm{e}^{-\lambda t}\,\mathrm{d}t = \frac{2}{\lambda}\cdot\frac{1}{\lambda} = \frac{2}{\lambda^2}
$$`,
        explanation: "Recognise the remaining integral as E(T)/λ multiplied by 2." }),
      P.num({ label: "(f)", marks: 1, stem: "Hence write down the standard deviation of T, correct to 3 significant figures.", value: mu19, wrong: [f3(mu19 ** 2)],
        explanation: t`$\mathrm{Var}(T) = \frac{2}{\lambda^2} - \frac{1}{\lambda^2} = \frac{1}{\lambda^2}$, so $\sigma = \frac{1}{\lambda} = ${f3(mu19)}$ years, equal to the mean.` }),
    ],
    explanation: "Find λ from the survival probability, then use the standard exponential results and the memoryless property.",
    hints: ["P(T > 2) = e^(−2λ).", "Conditional survival depends only on the extra time."],
  });

  // ---------------------------------------------------------------- cards
  b.card("DEFINITION", "Rectangular (continuous uniform) distribution U(a, b)", t`$f(x) = \dfrac{1}{b - a}$ for $a \le x \le b$, $0$ otherwise; every interval of the same length is equally likely.`);
  b.card("FORMULA", "Mean and variance of U(a, b)", t`$\mathrm{E}(X) = \dfrac{a + b}{2}$, $\mathrm{Var}(X) = \dfrac{(b - a)^2}{12}$`);
  b.card("DEFINITION", "Exponential distribution", t`$f(x) = \lambda\mathrm{e}^{-\lambda x}$ for $x \ge 0$; $\lambda > 0$ is the rate.`);
  b.card("FORMULA", "Exponential cdf and survival function", t`$F(x) = 1 - \mathrm{e}^{-\lambda x}$; $\mathrm{P}(X > x) = \mathrm{e}^{-\lambda x}$`);
  b.card("FORMULA", "Exponential mean, variance, median", t`Mean $\dfrac{1}{\lambda}$, variance $\dfrac{1}{\lambda^2}$, median $\dfrac{\ln 2}{\lambda}$.`);
  b.card("CONCEPT", "Memoryless property", t`$\mathrm{P}(X > s + t \mid X > s) = \mathrm{P}(X > t)$: an exponential lifetime that has survived is "as good as new".`);
  b.card("FACT", "Rounding errors", "A value recorded to the nearest unit has a rounding error that is rectangular on [−0.5, 0.5], with mean 0 and variance 1/12.");
  b.card("CONCEPT", "Deriving the exponential mean", "Integrate xλe^(−λx) by parts with u = x; the boundary term vanishes because e^(−λx) decays faster than x grows.");
});
