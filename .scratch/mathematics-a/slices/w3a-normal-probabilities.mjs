// W3a: amaths.normal.probabilities (every probability from normalProb: exact value + tolerance covering 4-figure tables)
import { concept, P, t, chk, normalProb, phiTable, Phi, binom, sfStr } from "../lib.mjs";

const S3 = (x) => sfStr(x, 3);
const T4 = (z) => phiTable(z).toFixed(4);

concept("amaths.normal.probabilities", { file: "normal/probabilities", keyPrefix: "normal.probabilities" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$X \sim \mathrm{N}(40, 25)$. What is the standard deviation of $X$?`,
    options: [
      ["5", t`Correct: the second parameter is the variance, $\sigma^2 = 25$.`],
      ["25", "25 is the variance, not the standard deviation."],
      ["40", "40 is the mean."],
      ["625", "This squares the variance."],
    ],
    answer: "A",
    explanation: t`$\mathrm{N}(\mu, \sigma^2)$: $\sigma^2 = 25$, so $\sigma = 5$.`,
  });

  const r1 = normalProb(60, 5, -Infinity, 68);
  chk((68 - 60) / 5, 1.6);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`$X \sim \mathrm{N}(60, 5^2)$. Find $\mathrm{P}(X < 68)$, correct to 3 significant figures.`,
    value: r1.exact, tol: r1.tol, wrong: [Number(S3(1 - r1.exact)), Number(S3(Phi(8 / 25)))],
    explanation: t`$\mathrm{P}(X < 68) = \mathrm{P}\left(Z < \frac{68 - 60}{5}\right) = \Phi(1.6) = ${T4(1.6)}$, or $${S3(r1.exact)}$ to 3 s.f. ($${S3(Phi(8 / 25))}$ divides by the variance 25.)`,
  });

  const r2 = normalProb(72, 6, 81, Infinity);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "The masses of oranges from an orchard in Mazowe are normally distributed with mean 72 g and standard deviation 6 g. Find the probability that an orange chosen at random has a mass greater than 81 g, correct to 3 significant figures.",
    value: r2.exact, tol: r2.tol, wrong: [Number(S3(1 - r2.exact)), 0.5],
    explanation: t`$z = \frac{81 - 72}{6} = 1.5$. $\mathrm{P}(X > 81) = 1 - \Phi(1.5) = 1 - ${T4(1.5)} = ${(1 - phiTable(1.5)).toFixed(4)}$, or $${S3(r2.exact)}$ to 3 s.f. ($${S3(1 - r2.exact)}$ is $\Phi(1.5)$, the wrong side.)`,
  });

  const r3 = normalProb(72, 6, -Infinity, 63.6);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "For the Mazowe oranges (mean 72 g, standard deviation 6 g), find the probability that an orange has a mass less than 63.6 g, correct to 3 significant figures.",
    value: r3.exact, tol: r3.tol, wrong: [Number(S3(1 - r3.exact))],
    explanation: t`$z = \frac{63.6 - 72}{6} = -1.4$. $\mathrm{P}(Z < -1.4) = 1 - \Phi(1.4) = 1 - ${T4(1.4)} = ${(1 - phiTable(1.4)).toFixed(4)}$, or $${S3(r3.exact)}$. ($${S3(1 - r3.exact)}$ forgets the symmetry step.)`,
  });
  chk((63.6 - 72) / 6, -1.4);

  const r4 = normalProb(150, 20, 130, 185);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`$X \sim \mathrm{N}(150, 400)$. Find $\mathrm{P}(130 < X < 185)$, correct to 3 significant figures.`,
    value: r4.exact, tol: r4.tol, wrong: [Number(S3(Phi(1.75) - Phi(1))), Number(S3(Phi(1.75) + Phi(-1) - 1 + 0.5))],
    explanation: t`$\sigma = 20$. $z_1 = \frac{130 - 150}{20} = -1$, $z_2 = \frac{185 - 150}{20} = 1.75$. $\mathrm{P} = \Phi(1.75) - (1 - \Phi(1)) = ${T4(1.75)} - ${(1 - phiTable(1)).toFixed(4)} = ${(phiTable(1.75) - 1 + phiTable(1)).toFixed(4)}$, or $${S3(r4.exact)}$. ($${S3(Phi(1.75) - Phi(1))}$ treats $-1$ as $+1$.)`,
    hints: ["Sketch: the region straddles the mean.", "Φ(−1) = 1 − Φ(1)."],
  });

  const r5 = normalProb(90, 12, 96, 105);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`$X \sim \mathrm{N}(90, 144)$. Find $\mathrm{P}(96 \le X \le 105)$, correct to 3 significant figures.`,
    value: r5.exact, tol: r5.tol, wrong: [Number(S3(Phi(1.25) + Phi(0.5) - 1))],
    explanation: t`$z = 0.5$ and $1.25$, both above the mean: $\Phi(1.25) - \Phi(0.5) = ${T4(1.25)} - ${T4(0.5)} = ${(phiTable(1.25) - phiTable(0.5)).toFixed(4)}$, or $${S3(r5.exact)}$. ($\le$ or $<$ makes no difference for a continuous variable.)`,
    hints: ["Both values are above the mean: subtract two Φ values."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$Z \sim \mathrm{N}(0, 1)$. Which expression equals $\mathrm{P}(Z > -0.8)$?`,
    options: [
      [t`$\Phi(0.8)$`, "Correct: by symmetry the area above −0.8 equals the area below 0.8."],
      [t`$1 - \Phi(0.8)$`, "This is P(Z > 0.8), the small upper tail."],
      [t`$\Phi(-0.8)$`, "This is P(Z < −0.8), the opposite side."],
      [t`$2\Phi(0.8) - 1$`, "This is P(−0.8 < Z < 0.8)."],
    ],
    answer: "A",
    explanation: t`Reflect in $z = 0$: $\mathrm{P}(Z > -0.8) = \mathrm{P}(Z < 0.8) = \Phi(0.8)$.`,
    hints: ["Sketch and shade the region."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$X \sim \mathrm{N}(\mu, \sigma^2)$. Approximately what proportion of values lie between $\mu - 2\sigma$ and $\mu + 2\sigma$?`,
    options: [
      ["95%", t`Correct: $2\Phi(2) - 1 = 0.9545$.`],
      ["68%", "That is the proportion within one standard deviation."],
      ["99.7%", "That is the proportion within three standard deviations."],
      ["50%", "Half the values lie below the mean; this is not a ±2σ interval."],
    ],
    answer: "A",
    explanation: t`$\mathrm{P}(-2 < Z < 2) = 2\Phi(2) - 1 = 2(${T4(2)}) - 1 = ${(2 * phiTable(2) - 1).toFixed(4)}$, about 95%.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $X \sim \mathrm{N}(\mu, \sigma^2)$, then $\mathrm{P}(X < a) = \mathrm{P}(X \le a)$ for any value $a$.`,
    answer: true,
    explanation: t`$X$ is continuous, so $\mathrm{P}(X = a) = 0$: including or excluding the end point changes nothing.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For a normal variable, $\mathrm{P}(X > \mu) = 0.5$.`,
    answer: true,
    explanation: t`The curve is symmetrical about $\mu$, so half the area lies above the mean.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$Z \sim \mathrm{N}(0, 1)$ and $a > 0$. Match each probability with the expression in terms of $\Phi(a)$.`,
    pairs: [
      [t`$\mathrm{P}(Z < a)$`, t`$\Phi(a)$`],
      [t`$\mathrm{P}(Z > a)$`, t`$1 - \Phi(a)$`],
      [t`$\mathrm{P}(-a < Z < a)$`, t`$2\Phi(a) - 1$`],
      [t`$\mathrm{P}(|Z| > a)$`, t`$2 - 2\Phi(a)$`],
    ],
    explanation: t`The two tails beyond $\pm a$ each have area $1 - \Phi(a)$, so $\mathrm{P}(|Z| > a) = 2(1 - \Phi(a))$ and the middle is $2\Phi(a) - 1$.`,
  });

  // expected number
  const r6 = normalProb(42, 3.5, 47, Infinity);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "The times taken by a kombi to travel from Harare to Chitungwiza are normally distributed with mean 42 minutes and standard deviation 3.5 minutes. In a month the kombi makes 200 such trips. Find the expected number of trips that take more than 47 minutes, giving your answer to the nearest whole number.",
    value: Math.round(200 * r6.exact), wrong: [Math.round(200 * (1 - r6.exact))],
    explanation: t`$z = \frac{47 - 42}{3.5} = ${(5 / 3.5).toFixed(3)}$; $\mathrm{P}(X > 47) = 1 - \Phi(1.43) = ${(1 - phiTable(5 / 3.5)).toFixed(4)}$ (calculator ${S3(r6.exact)}). Expected number $= 200 \times ${S3(r6.exact)} = ${(200 * r6.exact).toFixed(1)}$, about ${Math.round(200 * r6.exact)} trips.`,
    hints: ["Find the probability for one trip, then multiply by 200."],
  });
  chk(Math.round(200 * r6.exact), Math.round(200 * r6.table));

  // combined with binomial
  const p7 = normalProb(500, 8, -Infinity, 490).exact;
  const pb7 = 1 - binom.cdf(6, p7, 0);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Bags of sugar are labelled 500 g. The actual masses are normally distributed with mean 500 g and standard deviation 8 g. Six bags are chosen at random. Find the probability that at least one of them has a mass less than 490 g, correct to 3 significant figures.",
    value: pb7, tol: Math.abs(pb7 - (1 - (1 - (1 - phiTable(1.25))) ** 6)) + 0.0005, wrong: [Number(S3(p7)), Number(S3(6 * p7))],
    explanation: t`One bag: $\mathrm{P}(X < 490) = \mathrm{P}(Z < -1.25) = 1 - ${T4(1.25)} = ${(1 - phiTable(1.25)).toFixed(4)}$. At least one of six: $1 - (1 - ${(1 - phiTable(1.25)).toFixed(4)})^6 = 1 - ${T4(1.25)}^6 = ${S3(pb7)}$.`,
    hints: ["Find p = P(one bag < 490 g).", "At least one = 1 − P(none)."],
  });

  // find P(|X - mu| > k)
  const r8 = normalProb(25, 2.4, 22, 28);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "The diameters of bolts made at a factory in Bulawayo are normally distributed with mean 25 mm and standard deviation 2.4 mm. A bolt is rejected if its diameter differs from 25 mm by more than 3 mm. Find the proportion of bolts rejected, correct to 3 significant figures.",
    value: 1 - r8.exact, tol: r8.tol, wrong: [Number(S3((1 - r8.exact) / 2)), Number(S3(r8.exact))],
    explanation: t`$z = \pm\frac{3}{2.4} = \pm 1.25$. Rejected: $2(1 - \Phi(1.25)) = 2(1 - ${T4(1.25)}) = ${(2 * (1 - phiTable(1.25))).toFixed(4)}$, or $${S3(1 - r8.exact)}$. ($${S3((1 - r8.exact) / 2)}$ counts only one tail.)`,
    hints: ["Both tails are rejected: too large and too small."],
  });

  b.manualShort({
    d: 3, marks: 2, skill: "EVALUATION", calculator: false,
    stem: "The times taken by learners to complete a short quiz have mean 6 minutes and standard deviation 4 minutes. Explain why a normal distribution is unlikely to be a good model for these times.",
    points: ["Under a normal model, μ − 1.5σ = 0 so about 7% of times would be negative.", "Times cannot be negative, so the distribution is probably positively skewed rather than symmetrical."],
    modelAnswer: "Zero is only 1.5 standard deviations below the mean, so N(6, 16) gives P(T < 0) = 1 − Φ(1.5) ≈ 0.067: about 7% of learners would take a negative time, which is impossible. The real distribution is likely to be skewed to the right.",
    explanation: "Check where zero lies relative to the mean in standard deviations.",
    hints: ["How many standard deviations below the mean is 0?"],
  });
  chk(1 - phiTable(1.5), 0.0668);

  // structured practice (5 marks)
  const ra = normalProb(1.2, 0.15, 1.5, Infinity), rb = normalProb(1.2, 0.15, 1.0, 1.35);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: "The daily rainfall on wet days at a station near Chimanimani in March is modelled by a normal distribution with mean 1.2 cm and standard deviation 0.15 cm.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the probability that on a wet day the rainfall is more than 1.5 cm, correct to 3 significant figures.", value: ra.exact, tol: ra.tol, wrong: [Number(S3(1 - ra.exact))],
        explanation: t`$z = \frac{1.5 - 1.2}{0.15} = 2$; $1 - \Phi(2) = 1 - ${T4(2)} = ${(1 - phiTable(2)).toFixed(4)}$.` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the probability that on a wet day the rainfall is between 1.0 cm and 1.35 cm, correct to 3 significant figures.", value: rb.exact, tol: rb.tol, wrong: [Number(S3(Phi(1) - Phi(4 / 3)))],
        explanation: t`$z_1 = \frac{1.0 - 1.2}{0.15} = -1.333$, $z_2 = \frac{1.35 - 1.2}{0.15} = 1$. $\Phi(1) - (1 - \Phi(1.333)) = ${T4(1)} - ${(1 - phiTable(4 / 3)).toFixed(4)} = ${(phiTable(1) - 1 + phiTable(4 / 3)).toFixed(4)}$ (calculator ${S3(rb.exact)}).` }),
    ],
    explanation: "Standardise each value; sketch to choose Φ or 1 − Φ.",
    hints: ["σ = 0.15, so 1.5 cm is two standard deviations above the mean."],
  });

  // structured practice (13 marks)
  const mu = 32, s = 4.5;
  const pA = normalProb(mu, s, 38, Infinity), pB = normalProb(mu, s, 25, 35), pC = normalProb(mu, s, -Infinity, 28);
  const k3 = pA.exact;
  const atMost1 = binom.cdf(8, k3, 1);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "The lengths of maize cobs harvested on a farm near Chinhoyi are normally distributed with mean 32 cm and standard deviation 4.5 cm. Cobs longer than 38 cm are graded 'large'; cobs shorter than 28 cm are graded 'small'.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the proportion of cobs graded 'large', correct to 3 significant figures.", value: pA.exact, tol: pA.tol, wrong: [Number(S3(1 - pA.exact))],
        explanation: t`$z = \frac{38 - 32}{4.5} = 1.333$; $1 - \Phi(1.333) = ${(1 - phiTable(6 / 4.5)).toFixed(4)}$ (tables) or ${S3(pA.exact)}.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the proportion of cobs graded 'small', correct to 3 significant figures.", value: pC.exact, tol: pC.tol, wrong: [Number(S3(1 - pC.exact))],
        explanation: t`$z = \frac{28 - 32}{4.5} = -0.889$; $1 - \Phi(0.889) = ${(1 - phiTable(4 / 4.5)).toFixed(4)}$ (tables) or ${S3(pC.exact)}.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the probability that a cob is between 25 cm and 35 cm long, correct to 3 significant figures.", value: pB.exact, tol: pB.tol, wrong: [Number(S3(Phi(3 / 4.5) - Phi(7 / 4.5)))],
        explanation: t`$z_1 = \frac{25 - 32}{4.5} = -1.556$, $z_2 = \frac{35 - 32}{4.5} = 0.667$. $\Phi(0.667) - (1 - \Phi(1.556)) = ${(phiTable(3 / 4.5) - 1 + phiTable(7 / 4.5)).toFixed(4)}$ (tables) or ${S3(pB.exact)}.` }),
      P.num({ label: "(d)", marks: 4, stem: "Eight cobs are chosen at random. Find the probability that at most one of them is graded 'large', correct to 3 significant figures.", value: atMost1, tol: Math.abs(atMost1 - binom.cdf(8, pA.table, 1)) + 0.0005, wrong: [Number(S3(binom.pmf(8, k3, 1)))],
        explanation: t`The number of large cobs is $\mathrm{B}(8, p)$ with $p = ${S3(k3)}$. $\mathrm{P}(\le 1) = (1 - p)^8 + 8p(1 - p)^7 = ${S3(atMost1)}$.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Sketch the distribution of cob lengths, showing the regions for 'small' and 'large' cobs.",
        points: ["Symmetrical bell curve with the peak at 32 cm marked on the length axis.", "Shaded left tail below 28 cm ('small') and a smaller shaded right tail above 38 cm ('large'), since 38 is further from the mean."],
        modelAnswer: "A bell-shaped curve centred on 32 cm. The region to the left of 28 cm is shaded as 'small' (about 19% of the area) and the region to the right of 38 cm as 'large' (about 9%); the right tail is thinner because 38 cm is 1.33 standard deviations from the mean, while 28 cm is only 0.89." }),
    ],
    explanation: "Standardise each boundary; then treat 'large' as a success in a binomial model for (d).",
    hints: ["Use σ = 4.5 in every z.", "In (d) the number of large cobs among 8 is binomial."],
  });

  b.card("DEFINITION", "Normal distribution", t`$X \sim \mathrm{N}(\mu, \sigma^2)$: symmetrical bell curve, mean $\mu$, variance $\sigma^2$.`);
  b.card("FORMULA", "Standardising", t`$Z = \dfrac{X - \mu}{\sigma} \sim \mathrm{N}(0, 1)$`);
  b.card("FORMULA", "Symmetry of Φ", t`$\Phi(-z) = 1 - \Phi(z)$`);
  b.card("FORMULA", "Probability between values", t`$\mathrm{P}(a < Z < b) = \Phi(b) - \Phi(a)$`);
  b.card("FACT", "68–95–99.7", "About 68%, 95% and 99.7% of values lie within 1, 2 and 3 standard deviations of the mean.");
  b.card("FACT", "Continuous variable", t`$\mathrm{P}(X = a) = 0$, so $<$ and $\le$ give the same probability.`);
  b.card("CONCEPT", "Always sketch", "Shade the required area on a bell curve before choosing Φ(z) or 1 − Φ(z).");
  b.card("CONCEPT", "Expected number", "Multiply the probability for one item by the number of items.");
  b.card("CONCEPT", "Model check", "A normal model for a positive quantity is poor if 0 is within about 2–3 standard deviations of the mean.");
});
