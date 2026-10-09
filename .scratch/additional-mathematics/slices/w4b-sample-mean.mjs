// W4b: amath.sampling.sample-mean (ZIMSEC only)
import { concept, P, t, chk, same, phiTable, normalProb, sfStr, dpStr } from "../lib.mjs";

const NP = (mu, s, lo, hi) => normalProb(mu, s, lo ?? -Infinity, hi ?? Infinity);

concept("amath.sampling.sample-mean", { file: "sampling/sample-mean", keyPrefix: "sampling.sample-mean" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`A random sample of size $n$ is taken from a population with mean $\mu$ and variance $\sigma^2$. What is $\operatorname{Var}(\bar{X})$?`,
    options: [
      [t`$\dfrac{\sigma^2}{n}$`, "Correct: the variance of the mean falls in proportion to 1/n."],
      [t`$\sigma^2$`, "This is the variance of a single observation."],
      [t`$\dfrac{\sigma}{\sqrt{n}}$`, "This is the standard deviation of the mean (the standard error), not the variance."],
      [t`$\dfrac{\sigma^2}{\sqrt{n}}$`, t`The variance is divided by $n$, not by $\sqrt{n}$.`],
    ],
    answer: "A",
    explanation: t`$E(\bar{X}) = \mu$ and $\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}$; the standard error is $\frac{\sigma}{\sqrt{n}}$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Which statement is the central limit theorem?",
    options: [
      [t`For a large sample from any population, $\bar{X}$ is approximately $N\left(\mu, \frac{\sigma^2}{n}\right)$.`, "Correct: this holds whatever the shape of the population."],
      ["For a large random sample, the population itself becomes approximately normal in shape.", "The theorem is about the sample mean; the population keeps its shape."],
      [t`For any sample size, $\bar{X}$ is exactly normal, whatever the shape of the population.`, "Exact normality needs a normal population; otherwise n must be large."],
      ["For a large random sample, the sample mean equals the population mean exactly.", "The sample mean varies; it is only close to μ on average."],
    ],
    answer: "A",
    explanation: t`The central limit theorem (used without proof): for large $n$, $\bar{X} \approx N\left(\mu, \frac{\sigma^2}{n}\right)$ for any population with mean $\mu$ and variance $\sigma^2$.`,
  });

  {
    const se = Math.sqrt(36 / 9);
    chk(se, 2);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`$X \sim N(25, 36)$. A random sample of 9 observations is taken. Find the standard deviation of the sample mean $\bar{X}$ (the standard error).`,
      value: se, wrong: [4, 6],
      explanation: t`$\operatorname{Var}(\bar{X}) = \frac{36}{9} = 4$, so the standard error is $\sqrt{4} = 2$ (or $\frac{6}{\sqrt{9}} = 2$). 4 is the variance; 6 is $\sigma$ for one observation.`,
    });
  }

  {
    const v = 48 / 12;
    chk(v, 4);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`A population has variance 48. Find $\operatorname{Var}(\bar{X})$ for random samples of size 12.`,
      value: v, wrong: [2, 48 / Math.sqrt(12)],
      explanation: t`$\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n} = \frac{48}{12} = 4$. The answer 2 is the standard error.`,
    });
  }

  {
    const r = NP(80, 2, undefined, 77);
    chk(1 - phiTable(1.5), 0.0668, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`$X \sim N(80, 100)$. A random sample of 25 observations is taken. Find $P(\bar{X} < 77)$, correct to 3 significant figures.`,
      value: r.exact, tol: r.tol, wrong: [1 - phiTable(0.3), 0.9332],
      explanation: t`$\bar{X} \sim N\left(80, \frac{100}{25}\right) = N(80, 4)$, standard error 2. $z = \frac{77 - 80}{2} = -1.5$, $P = 1 - \Phi(1.5) = 0.0668$. Using $\sigma = 10$ gives $z = -0.3$ and 0.382, the answer for a single value.`,
      hints: ["Use the standard error σ/√n = 10/5."],
    });
  }

  {
    const r = NP(64, 12 / 6, 66);
    chk(1 - phiTable(1), 0.1587, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "The monthly phone bills of households in a town have mean 64 dollars and standard deviation 12 dollars; the distribution is skewed. A random sample of 36 households is taken. Find the probability that the sample mean bill is more than 66 dollars, correct to 3 significant figures.",
      value: r.exact, tol: r.tol, wrong: [1 - phiTable(0.17), 0.8413],
      explanation: t`$n = 36$ is large, so by the central limit theorem $\bar{X} \approx N\left(64, \frac{144}{36}\right)$, standard error 2. $z = \frac{66 - 64}{2} = 1$, $P = 1 - 0.8413 = 0.1587 \approx 0.159$.`,
      hints: ["The population is skewed, but the sample is large."],
    });
  }

  {
    const r = NP(500, 5, 495, 508);
    chk(phiTable(1.6) - (1 - phiTable(1)), 0.7865, 1e-9);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`The volume of liquid in bottles filled by a machine is $N(500, 400)$ ml. A random sample of 16 bottles is taken. Find the probability that the sample mean volume is between 495 ml and 508 ml, correct to 3 significant figures.`,
      value: r.exact, tol: r.tol, wrong: [phiTable(0.4) - (1 - phiTable(0.25))],
      explanation: t`Standard error $= \frac{20}{\sqrt{16}} = 5$. $z_1 = \frac{495 - 500}{5} = -1$, $z_2 = \frac{508 - 500}{5} = 1.6$. $P = \Phi(1.6) - [1 - \Phi(1)] = 0.9452 - 0.1587 = 0.7865 \approx 0.787$.`,
      hints: [t`$\sigma = \sqrt{400} = 20$; divide by $\sqrt{16}$.`],
    });
  }

  {
    const n = Math.ceil((1.96 * 8 / 2) ** 2);
    chk((1.96 * 8 / 2) ** 2, 61.4656, 1e-9);
    same(n, 62);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A population is normally distributed with standard deviation 8. Find the smallest sample size $n$ for which the probability that the sample mean is within 2 of the population mean is at least 0.95.`,
      value: n, wrong: [61, 16],
      explanation: t`$P(|\bar{X} - \mu| < 2) \geq 0.95$ needs $\frac{2}{8/\sqrt{n}} \geq 1.96$, so $\sqrt{n} \geq 7.84$ and $n \geq 61.47$. The smallest whole number is 62; 61 is too small (rounding down).`,
      hints: ["Within 2 either side with probability 0.95 uses z = 1.96.", "Round up."],
    });
  }

  b.tf({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`For random samples from any population with mean $\mu$, $E(\bar{X}) = \mu$.`,
    answer: true,
    explanation: t`True. On average the sample mean equals the population mean, whatever the sample size or the shape of the population.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "The central limit theorem says that a large population is always approximately normally distributed.",
    answer: false,
    explanation: "False. The theorem is about the distribution of the sample mean. A skewed population stays skewed, but the means of large samples from it are approximately normal.",
  });

  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "Doubling the sample size halves the standard error of the mean.",
    answer: false,
    explanation: t`False. The standard error is $\frac{\sigma}{\sqrt{n}}$. Doubling $n$ divides it by $\sqrt{2} \approx 1.41$; to halve it, the sample must be four times as large.`,
    hints: [t`Compare $\frac{\sigma}{\sqrt{n}}$ with $\frac{\sigma}{\sqrt{2n}}$.`],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`In which situation is the central limit theorem needed to say that $\bar{X}$ is approximately normal?`,
    options: [
      ["A sample of 40 waiting times from a population that is strongly skewed", "Correct: the population is not normal, so the large sample size is what makes X̄ approximately normal."],
      ["A sample of 10 heights from a population known to be normal", "From a normal population X̄ is exactly normal for any n; the theorem is not needed."],
      ["A sample of 5 values from a skewed population", "n = 5 is too small for the theorem to apply."],
      ["A single value from a normal population", "A single value is not a sample mean; it is normal because the population is."],
    ],
    answer: "A",
    explanation: "The central limit theorem is used when the population is not normal (or unknown) and the sample is large.",
    hints: ["When is X̄ exactly normal without the theorem?"],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`Samples of size $n$ are taken from a population with mean $\mu$ and standard deviation $\sigma$. Match each quantity with its expression.`,
    pairs: [
      [t`$E(\bar{X})$`, t`$\mu$`],
      [t`$\operatorname{Var}(\bar{X})$`, t`$\dfrac{\sigma^2}{n}$`],
      ["Standard error of the mean", t`$\dfrac{\sigma}{\sqrt{n}}$`],
      [t`$z$ for a sample mean $\bar{x}$`, t`$\dfrac{\bar{x} - \mu}{\sigma/\sqrt{n}}$`],
    ],
    explanation: "The sample mean is centred on μ with spread σ/√n; standardise with the standard error.",
  });

  {
    const v = 25 / 20;
    chk(v, 1.25);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`$X \sim N(30, 25)$. Random samples of 20 observations are taken. Complete the distribution of the sample mean: $\bar{X} \sim N(a, b)$.`,
      template: "a = {{blank:a}}, b = {{blank:b}}",
      blanks: [
        { id: "a", input: "number", accepted: [30], wrong: "1.5" },
        { id: "b", input: "number", accepted: [1.25], tolerance: 0.0005, wrong: "25" },
      ],
      explanation: t`$E(\bar{X}) = 30$ and $\operatorname{Var}(\bar{X}) = \frac{25}{20} = 1.25$, so $\bar{X} \sim N(30, 1.25)$. The second number is a variance.`,
      hints: ["The second parameter is the variance σ²/n."],
    });
  }

  {
    const pX = normalProb(60, 4, 61), pM = normalProb(60, 0.8, 61);
    chk(4 / Math.sqrt(25), 0.8);
    b.manualShort({
      d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
      stem: t`For $X \sim N(60, 16)$ and samples of size 25, $P(X > 61) \approx ${sfStr(pX.exact, 2)}$ but $P(\bar{X} > 61) \approx ${sfStr(pM.exact, 2)}$. Explain why the second probability is much smaller.`,
      points: [
        t`The sample mean has a smaller spread: its standard deviation is $\frac{4}{\sqrt{25}} = 0.8$ instead of 4.`,
        "In a sample, high and low values tend to cancel out, so a mean far from 60 is much less likely than a single value far from 60.",
      ],
      modelAnswer: t`Averaging 25 values smooths out the variation: high and low values cancel, so $\bar{X}$ has standard deviation 0.8 compared with 4 for one value. 61 is 1.25 standard errors above the mean for $\bar{X}$ but only 0.25 standard deviations for a single value.`,
      explanation: "The standard error shrinks with the square root of n.",
      hints: ["Compare the standard deviations of X and of X̄."],
    });
  }

  {
    const xs = [1, 2, 3, 4];
    const m = xs.reduce((a, c) => a + c, 0) / 4, v1 = xs.reduce((a, c) => a + c * c, 0) / 4 - m * m;
    chk(m, 2.5); chk(v1, 1.25); chk(v1 / 40, 1 / 32);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`A fair spinner scores 1, 2, 3 or 4, each equally likely, so one spin has mean 2.5 and variance 1.25. It is spun 40 times and $\bar{X}$ is the mean score. Which is the approximate distribution of $\bar{X}$?`,
      options: [
        [t`$N\left(2.5, \frac{1}{32}\right)$`, t`Correct: $\frac{1.25}{40} = \frac{1}{32}$, by the central limit theorem.`],
        [t`$N(2.5, 1.25)$`, "This is the variance of one spin, not of the mean of 40."],
        [t`$N\left(100, \frac{1}{32}\right)$`, "100 is the expected total, not the expected mean."],
        [t`$N\left(2.5, \frac{1.25}{\sqrt{40}}\right)$`, t`The variance is divided by $n$, not $\sqrt{n}$.`],
      ],
      answer: "A",
      explanation: t`By the central limit theorem with $n = 40$: $\bar{X} \approx N\left(2.5, \frac{1.25}{40}\right) = N\left(2.5, \frac{1}{32}\right)$, although one spin is uniformly (not normally) distributed.`,
      hints: [t`$\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}$.`],
    });
  }

  {
    const se = 14 / 7;
    const rA = NP(35, se, 38), rB = NP(35, se, 32, 37);
    chk(1 - phiTable(1.5), 0.0668, 1e-9); chk(phiTable(1) - (1 - phiTable(1.5)), 0.7745, 1e-9);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true, examStyle: true,
      stem: "The time learners in a rural district take to walk to school has mean 35 minutes and standard deviation 14 minutes; the distribution is skewed, with a few very long walks. A random sample of 49 learners is taken.",
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: t`State the approximate distribution of the sample mean $\bar{X}$, and justify your answer.`,
          points: [t`$\bar{X} \approx N\left(35, \frac{196}{49}\right) = N(35, 4)$.`, "Justification: the sample is large (n = 49), so the central limit theorem applies even though the population is skewed."],
          modelAnswer: t`By the central limit theorem, since $n = 49$ is large, $\bar{X} \approx N\left(35, \frac{14^2}{49}\right) = N(35, 4)$, even though the walking times themselves are skewed.`,
          explanation: "Mean μ, variance σ²/n, normal by the central limit theorem." }),
        P.num({ label: "(b)", marks: 1, stem: "Find the standard error of the mean.", value: se, unit: "min", wrong: [4, 14],
          explanation: t`$\frac{14}{\sqrt{49}} = 2$ minutes.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find $P(\bar{X} > 38)$, correct to 3 significant figures.`, value: rA.exact, tol: rA.tol, wrong: [0.9332],
          explanation: t`$z = \frac{38 - 35}{2} = 1.5$, $P = 1 - 0.9332 = 0.0668$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Find $P(32 < \bar{X} < 37)$, correct to 3 significant figures.`, value: rB.exact, tol: rB.tol, wrong: [0.8413 - 0.9332 + 1 - 0.0668 * 2],
          explanation: t`$z_1 = -1.5$, $z_2 = 1$. $P = 0.8413 - 0.0668 = 0.7745 \approx 0.775$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the same method cannot be used to find the probability that one learner chosen at random walks for more than 38 minutes.",
          points: ["The walking times of individual learners are skewed, not normal, so a normal model for a single learner would be wrong.", "The central limit theorem applies only to the mean of a large sample, not to a single value."],
          modelAnswer: "A single learner's time follows the skewed population distribution, which is not normal. The central limit theorem only says that the mean of a large sample is approximately normal, so it cannot be used for one learner.",
          explanation: "The theorem describes sample means, not individuals." }),
      ],
      explanation: "Use the central limit theorem for the mean of a large sample: N(μ, σ²/n).",
      hints: [t`Standard error $= \frac{\sigma}{\sqrt{n}}$.`],
    });
  }

  {
    const se = Math.sqrt(16 / 8);
    const r = NP(250, se, undefined, 248);
    const c = 250 - 2.326 * se;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`The masses of packets of tea from a factory in Chipinge are $N(250, 16)$ grams when the machine is working correctly. An inspector weighs random samples of 8 packets.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`State the distribution of the sample mean in the form $\bar{X} \sim N(a, b)$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [250], wrong: "31.25" }, { id: "b", input: "number", accepted: [2], tolerance: 0.0005, wrong: "16" }],
          explanation: t`$\bar{X} \sim N\left(250, \frac{16}{8}\right) = N(250, 2)$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Find $P(\bar{X} < 248)$, correct to 3 significant figures.`, value: r.exact, tol: r.tol, wrong: [1 - phiTable(0.5)],
          explanation: t`Standard error $= \sqrt{2} = 1.414$. $z = \frac{248 - 250}{1.414} = -1.41$. $P = 1 - \Phi(1.41) = ${dpStr(1 - phiTable(1.41), 4)}$ (calculator: ${sfStr(r.exact, 3)}).` }),
        P.num({ label: "(c)", marks: 3, stem: t`The inspector stops the machine if the sample mean is less than $c$ grams. Find $c$ so that a correctly working machine is stopped with probability 0.01. Give your answer correct to 4 significant figures.`, value: c, sf: 4, wrong: [250 - 2.326 * 4, 250 - 1.96 * se],
          explanation: t`$P(\bar{X} < c) = 0.01$ gives $\frac{c - 250}{\sqrt{2}} = -2.326$, so $c = 250 - 2.326 \times 1.414 = ${sfStr(c, 4)}$ g. Using $\sigma = 4$ instead of the standard error gives 240.7.` }),
      ],
      explanation: "Sample means from a normal population are normal with variance σ²/n; use the tables forwards and backwards.",
      hints: ["Var(X̄) = 16 ÷ 8.", t`$\Phi(2.326) = 0.99$.`],
    });
  }

  // flashcards
  b.card("CONCEPT", "The sample mean is a random variable", t`$\bar{X}$ changes from sample to sample; its distribution is the sampling distribution of the mean.`);
  b.card("FORMULA", "Mean and variance of the sample mean", t`$E(\bar{X}) = \mu$, $\operatorname{Var}(\bar{X}) = \dfrac{\sigma^2}{n}$`);
  b.card("DEFINITION", "Standard error of the mean", t`$\dfrac{\sigma}{\sqrt{n}}$, the standard deviation of $\bar{X}$.`);
  b.card("FACT", "Normal population", t`If $X \sim N(\mu, \sigma^2)$, then $\bar{X} \sim N\left(\mu, \frac{\sigma^2}{n}\right)$ exactly, for any $n$.`);
  b.card("DEFINITION", "Central limit theorem", t`For a large sample from any population, $\bar{X}$ is approximately $N\left(\mu, \frac{\sigma^2}{n}\right)$ (used without proof).`);
  b.card("FORMULA", "Standardising a sample mean", t`$z = \dfrac{\bar{x} - \mu}{\sigma/\sqrt{n}}$`);
  b.card("CONCEPT", "Halving the standard error", "Multiply the sample size by 4 (the standard error is proportional to 1/√n).");
  b.card("CONCEPT", "What the CLT does not say", "It does not make the population normal, and it does not apply to single values or small samples from non-normal populations.");
});
