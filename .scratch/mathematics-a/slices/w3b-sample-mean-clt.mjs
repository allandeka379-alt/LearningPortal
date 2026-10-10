// W3b: amaths.sampling.sample-mean-clt (ZIMSEC Statistics F6 6.7.2; Cambridge P6 6.4)
import { concept, P, t, chk, sfStr, normalProb, invPhi, zCrit } from "../lib.mjs";

const { sqrt, ceil } = Math;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const s = (x) => sfStr(x, 4);

concept("amaths.sampling.sample-mean-clt", { file: "sampling/sample-mean-clt", keyPrefix: "sampling.sample-mean-clt" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$X \sim \mathrm{N}(50, 36)$ and $\bar{X}$ is the mean of a random sample of 9 observations of $X$. What is $\mathrm{Var}(\bar{X})$?`,
    options: [
      ["4", t`Correct: $\mathrm{Var}(\bar{X}) = \frac{\sigma^2}{n} = \frac{36}{9} = 4$.`],
      ["36", t`36 is the variance of a single observation; averaging reduces it.`],
      ["2", t`2 is the standard deviation of $\bar{X}$, $\sqrt{4}$, not its variance.`],
      ["324", t`$36 \times 9$ is $\mathrm{Var}(X_1 + \dots + X_9)$, the variance of the total, not the mean.`],
    ],
    answer: "A",
    explanation: t`For a random sample of size $n$, $\mathrm{E}(\bar{X}) = \mu$ and $\mathrm{Var}(\bar{X}) = \frac{\sigma^2}{n}$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A population has mean 80 and standard deviation 12. Find the standard deviation of the mean of a random sample of 16 observations.`,
    value: 3, wrong: [0.75, 9],
    explanation: t`The standard deviation of $\bar{X}$ (the standard error) is $\frac{\sigma}{\sqrt{n}} = \frac{12}{\sqrt{16}} = 3$. ($0.75 = \frac{12}{16}$ divides by $n$ instead of $\sqrt{n}$; $9 = \frac{144}{16}$ is the variance.)`,
  });

  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The random variable $X$ has mean 20 and variance 9. A random sample of 36 observations is taken. Write down the mean and the variance of the sample mean $\bar{X}$.`,
    template: "E(X̄) = {{blank:m}}, Var(X̄) = {{blank:v}}",
    blanks: [D("m", 20, 0.001, "0.556"), D("v", 0.25, 0.001, "0.5")],
    explanation: t`$\mathrm{E}(\bar{X}) = \mu = 20$ and $\mathrm{Var}(\bar{X}) = \frac{9}{36} = 0.25$. (0.5 is the standard deviation of $\bar{X}$.)`,
  });

  const r4 = normalProb(50, 8 / 5, 52, Infinity);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`$X \sim \mathrm{N}(50, 8^2)$. Find the probability that the mean of a random sample of 25 observations of $X$ is greater than 52. Give your answer correct to 3 significant figures.`,
    value: r4.exact, tol: r4.tol, wrong: [normalProb(50, 8, 52, Infinity).exact, normalProb(50, 8 / 25, 52, Infinity).exact],
    explanation: t`$\bar{X} \sim \mathrm{N}\left(50, \frac{64}{25}\right)$, standard deviation $1.6$. $z = \frac{52 - 50}{1.6} = 1.25$, so $\mathrm{P}(\bar{X} > 52) = 1 - \Phi(1.25) = ${s(r4.exact)}$, i.e. $${sfStr(r4.exact)}$. ($${sfStr(normalProb(50, 8, 52, Infinity).exact)}$ uses one observation's standard deviation 8.)`,
    hints: [t`Find the distribution of $\bar{X}$ first.`],
  });

  const se5 = 0.8 / sqrt(10);
  const r5 = normalProb(50.4, se5, -Infinity, 50);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The masses of bags of maize meal filled at a mill in Kwekwe are normally distributed with mean 50.4 kg and standard deviation 0.8 kg. An inspector weighs a random sample of 10 bags. Find the probability that the mean mass of the sample is less than 50 kg. Give your answer correct to 3 significant figures.`,
    value: r5.exact, tol: r5.tol, wrong: [normalProb(50.4, 0.8, -Infinity, 50).exact, 1 - r5.exact],
    explanation: t`$\bar{X} \sim \mathrm{N}\left(50.4, \frac{0.8^2}{10}\right)$ with standard deviation $${s(se5)}$. $z = \frac{50 - 50.4}{${s(se5)}} = ${s(-0.4 / se5)}$, so $\mathrm{P}(\bar{X} < 50) = ${s(r5.exact)}$, i.e. $${sfStr(r5.exact)}$. ($${sfStr(normalProb(50.4, 0.8, -Infinity, 50).exact)}$ is the probability for a single bag.)`,
    workedSolution: t`1. The population is normal, so $\bar{X}$ is exactly normal: $\bar{X} \sim \mathrm{N}(50.4, 0.064)$.
2. Standard deviation of $\bar{X}$: $\sqrt{0.064} = ${s(se5)}$.
3. $z = \frac{50 - 50.4}{${s(se5)}} = ${s(-0.4 / se5)}$.
4. $\mathrm{P}(\bar{X} < 50) = \Phi(${sfStr(-0.4 / se5, 3)}) = ${s(r5.exact)}$, so $${sfStr(r5.exact)}$.`,
    hints: ["The sample mean has a smaller standard deviation than one bag."],
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "The central limit theorem states that, for a large random sample, the sample mean is approximately normally distributed, whatever the distribution of the population (provided it has a finite variance).",
    answer: true,
    explanation: t`For large $n$ (a rule of thumb is $n \ge 30$), $\bar{X} \approx \mathrm{N}\left(\mu, \frac{\sigma^2}{n}\right)$ even when $X$ itself is skewed or discrete.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "The central limit theorem shows that, when a large sample is taken, the population itself becomes approximately normal.",
    answer: false,
    explanation: "The population distribution never changes. The theorem is about the distribution of the sample mean: it becomes approximately normal as n increases.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`In which situation does the sample mean $\bar{X}$ have an exactly normal distribution, whatever the sample size?`,
    options: [
      ["when the population is normally distributed", t`Correct: a mean of independent normal variables is itself normal, for any $n$.`],
      ["when the sample size is at least 30", "For n ≥ 30 the central limit theorem gives an approximately (not exactly) normal mean."],
      ["when the population has a Poisson distribution", t`A Poisson population gives an approximately normal $\bar{X}$ only for large $n$.`],
      ["when the population mean is known", "Knowing μ does not affect the shape of the distribution of the sample mean."],
    ],
    answer: "A",
    explanation: t`If $X \sim \mathrm{N}(\mu, \sigma^2)$ then $\bar{X} \sim \mathrm{N}\left(\mu, \frac{\sigma^2}{n}\right)$ exactly; otherwise the normal distribution is only an approximation for large $n$ (central limit theorem).`,
  });

  const varT = 12 * 0.36;
  const r9 = normalProb(600, sqrt(varT), 603, Infinity);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Bags of cement have masses that are normally distributed with mean 50 kg and standard deviation 0.6 kg. A truck carries 12 randomly chosen bags. Find the probability that the total mass of the 12 bags is more than 603 kg. Give your answer correct to 3 significant figures.`,
    value: r9.exact, tol: r9.tol, wrong: [normalProb(600, 12 * 0.6, 603, Infinity).exact, normalProb(600, 0.6, 603, Infinity).exact],
    explanation: t`The total $T \sim \mathrm{N}(12 \times 50, 12 \times 0.36) = \mathrm{N}(600, ${s(varT)})$. $z = \frac{3}{\sqrt{${s(varT)}}} = ${s(3 / sqrt(varT))}$, so $\mathrm{P}(T > 603) = ${s(r9.exact)}$, i.e. $${sfStr(r9.exact)}$. (Standard deviation $12 \times 0.6 = 7.2$ treats the total as $12X$, one bag scaled, giving $${sfStr(normalProb(600, 7.2, 603, Infinity).exact)}$.)`,
    hints: ["Equivalently, P(T > 603) = P(X̄ > 50.25).", "Variances add for independent bags."],
  });

  const n10 = ceil((1.96 * 4) ** 2);
  chk(n10, 62);
  chk(1.96 * 4 / sqrt(61) > 1 && 1.96 * 4 / sqrt(62) < 1 ? 1 : 0, 1);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A population is normally distributed with standard deviation 4. Find the smallest sample size $n$ for which the probability that the sample mean is within 1 of the population mean is at least 0.95.`,
    value: n10, wrong: [61, 16],
    explanation: t`We need $\mathrm{P}(|\bar{X} - \mu| < 1) \ge 0.95$, i.e. $\frac{1}{4/\sqrt{n}} \ge 1.96$, so $\sqrt{n} \ge 7.84$ and $n \ge 61.47$. The smallest integer is $n = 62$. (61 rounds down and fails the condition; 16 comes from $(4/1)^2$ without the 1.96.)`,
    hints: [t`Write the condition as $\frac{1}{\sigma/\sqrt{n}} \ge 1.96$.`, "Round up, not to the nearest integer."],
  });

  const r11 = normalProb(4, sqrt(4 / 50), 4.3, Infinity);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The number of customers who arrive at a Victoria Falls curio stall in a 10-minute period has the distribution $\mathrm{Po}(4)$. The numbers in 50 randomly chosen 10-minute periods are recorded. Use a suitable approximation to find the probability that the mean number per period is more than 4.3. Give your answer correct to 3 significant figures.`,
    value: r11.exact, tol: r11.tol, wrong: [normalProb(4, 2, 4.3, Infinity).exact, normalProb(4, 4 / 50, 4.3, Infinity).exact],
    explanation: t`$\mathrm{E}(X) = \mathrm{Var}(X) = 4$. By the central limit theorem ($n = 50$ is large), $\bar{X} \approx \mathrm{N}\left(4, \frac{4}{50}\right)$, standard deviation $${s(sqrt(0.08))}$. $z = \frac{0.3}{${s(sqrt(0.08))}} = ${s(0.3 / sqrt(0.08))}$, so the probability is $${s(r11.exact)}$, i.e. $${sfStr(r11.exact)}$.`,
    workedSolution: t`1. $X \sim \mathrm{Po}(4)$: $\mu = 4$, $\sigma^2 = 4$.
2. Central limit theorem: $\bar{X} \approx \mathrm{N}(4, 0.08)$.
3. $z = \frac{4.3 - 4}{\sqrt{0.08}} = ${s(0.3 / sqrt(0.08))}$.
4. $\mathrm{P}(\bar{X} > 4.3) = 1 - \Phi(${sfStr(0.3 / sqrt(0.08))}) = ${sfStr(r11.exact)}$.`,
    hints: ["The variance of a Poisson variable equals its mean.", "The sample is large: use the central limit theorem."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A population has mean $\mu$ and variance $\sigma^2$. $\bar{X}$ is the mean and $T$ the total of a random sample of size $n$. Match each quantity with its value.`,
    pairs: [
      [t`$\mathrm{E}(\bar{X})$`, t`$\mu$`],
      [t`$\mathrm{Var}(\bar{X})$`, t`$\frac{\sigma^2}{n}$`],
      [t`$\mathrm{E}(T)$`, t`$n\mu$`],
      [t`$\mathrm{Var}(T)$`, t`$n\sigma^2$`],
    ],
    explanation: t`$T = X_1 + \dots + X_n$ has mean $n\mu$ and variance $n\sigma^2$; $\bar{X} = \frac{T}{n}$ has mean $\mu$ and variance $\frac{n\sigma^2}{n^2} = \frac{\sigma^2}{n}$.`,
  });

  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: "The times that customers spend at a Harare bank's ATM are known to be strongly positively skewed. A random sample of 60 times is taken. Which statement about the sample mean is correct?",
    options: [
      ["It is approximately normal, by the central limit theorem.", "Correct: n = 60 is large, so the mean is approximately normal even though the times are skewed."],
      ["It cannot be normal because the times are skewed.", "The skew of the population does not prevent the mean of a large sample from being approximately normal."],
      ["It is exactly normal because the sample size exceeds 30.", "The central limit theorem gives an approximation, not an exact normal distribution."],
      ["It has the same variance as a single customer's time.", "The variance of the mean is σ²/60, much smaller than σ²."],
    ],
    answer: "A",
    explanation: "The central limit theorem is needed exactly when the population is not normal and the sample is large.",
    hints: ["Is the population normal? Is the sample large?"],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "The lengths of time that patients wait at a clinic in Chitungwiza are not normally distributed. Explain whether it would be valid to use a normal distribution to find the probability that the mean waiting time of (i) 5 patients, (ii) 80 patients exceeds 40 minutes.",
    points: [
      "(i) Not valid: the population is not normal and n = 5 is small, so the central limit theorem cannot be applied.",
      "(ii) Valid (approximately): n = 80 is large, so by the central limit theorem the sample mean is approximately normal.",
    ],
    modelAnswer: "For 5 patients the sample is small and the waiting times are not normal, so the mean need not be close to normal. For 80 patients the sample is large, so the central limit theorem says the mean is approximately normally distributed and a normal calculation is valid.",
    explanation: "The central limit theorem needs a large sample when the population is not normal.",
    hints: ["What does the central limit theorem need?"],
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "A sample of size n is replaced by a sample of size 4n from the same population. What happens to the standard deviation of the sample mean?",
    options: [
      ["It is halved.", t`Correct: $\frac{\sigma}{\sqrt{4n}} = \frac{1}{2} \times \frac{\sigma}{\sqrt{n}}$.`],
      ["It is divided by 4.", "That is what happens to the variance of the sample mean."],
      ["It doubles.", "A bigger sample makes the mean less variable, not more."],
      ["It does not change.", "The standard error depends on n."],
    ],
    answer: "A",
    explanation: t`The standard error is $\frac{\sigma}{\sqrt{n}}$: to halve it you must take four times as many observations.`,
    hints: ["How does the standard error depend on n?"],
  });

  const se16 = sqrt(35 / 12 / 40);
  const r16 = normalProb(3.5, se16, -Infinity, 3.2);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A fair six-sided die has scores with mean 3.5 and variance $\frac{35}{12}$. The die is thrown 40 times. Use the central limit theorem to find the probability that the mean score is less than 3.2. Give your answer correct to 3 significant figures.`,
    value: r16.exact, tol: r16.tol, wrong: [normalProb(3.5, sqrt(35 / 12), -Infinity, 3.2).exact, 1 - r16.exact],
    explanation: t`$\bar{X} \approx \mathrm{N}\left(3.5, \frac{35/12}{40}\right)$ with standard deviation $${s(se16)}$. $z = \frac{3.2 - 3.5}{${s(se16)}} = ${s(-0.3 / se16)}$, giving $${s(r16.exact)}$, i.e. $${sfStr(r16.exact)}$.`,
    hints: ["Find the variance of the mean of 40 throws."],
  });

  // ---------------------------------------------------------------- structured (5 marks)
  const se17 = 15 / sqrt(20);
  const r17 = normalProb(240, se17, 235, 245);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The volume of drink in bottles filled by a machine in Msasa is normally distributed with mean 240 ml and standard deviation 15 ml. A random sample of 20 bottles is taken.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`State the distribution of the sample mean volume $\bar{X}$, giving its mean and its variance.`, template: "mean = {{blank:m}} ml, variance = {{blank:v}}",
        blanks: [D("m", 240, 0.001, "12"), D("v", 11.25, 0.001, "225")],
        explanation: t`$\bar{X} \sim \mathrm{N}\left(240, \frac{225}{20}\right) = \mathrm{N}(240, 11.25)$, exactly normal because volumes are normal.` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the probability that the sample mean is between 235 ml and 245 ml. Give your answer correct to 3 significant figures.", value: r17.exact, tol: r17.tol, wrong: [normalProb(240, 15, 235, 245).exact],
        explanation: t`Standard deviation $\sqrt{11.25} = ${s(se17)}$; $z = \pm\frac{5}{${s(se17)}} = \pm${s(5 / se17)}$. Probability $= 2\Phi(${sfStr(5 / se17)}) - 1 = ${s(r17.exact)}$, i.e. $${sfStr(r17.exact)}$.` }),
    ],
    explanation: "The sample mean of a normal population is normal with variance σ²/n.",
    hints: ["Var(X̄) = σ²/n.", "Use symmetry for an interval centred on the mean."],
  });

  // ---------------------------------------------------------------- structured (13 marks)
  const se18 = 120 / sqrt(50);
  const r18b = normalProb(800, se18, 820, Infinity);
  const k18 = 800 + invPhi(0.95) * se18;
  const k18t = 800 + 1.645 * se18;
  const n18 = ceil((zCrit(95) * 120 / 25) ** 2);
  chk(zCrit(95) * 120 / sqrt(n18) < 25 && zCrit(95) * 120 / sqrt(n18 - 1) > 25 ? 1 : 0, 1);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The lifetimes of a type of LED bulb sold in Bulawayo have mean 800 hours and standard deviation 120 hours. The distribution of lifetimes is positively skewed.`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "A random sample of 50 bulbs is taken. State, with a reason, the approximate distribution of the sample mean lifetime, giving its parameters.",
        points: ["Approximately normal, because n = 50 is large (central limit theorem), even though lifetimes are skewed.", t`Mean 800 and variance $\frac{120^2}{50} = 288$ (standard deviation ${sfStr(se18)}).`],
        modelAnswer: t`By the central limit theorem, since $n = 50$ is large, $\bar{X} \approx \mathrm{N}(800, 288)$.`,
        explanation: "Name the theorem and the reason (large sample)." }),
      P.num({ label: "(b)", marks: 3, stem: "Find the probability that the mean lifetime of the 50 bulbs is more than 820 hours. Give your answer correct to 3 significant figures.", value: r18b.exact, tol: r18b.tol, wrong: [normalProb(800, 120, 820, Infinity).exact],
        explanation: t`$z = \frac{20}{${s(se18)}} = ${s(20 / se18)}$; $\mathrm{P}(\bar{X} > 820) = ${s(r18b.exact)}$, i.e. $${sfStr(r18b.exact)}$.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the value of k such that the probability that the sample mean is less than k hours is 0.95. Give your answer correct to 4 significant figures.", value: k18, tol: 0.06, answer: sfStr(k18, 4), wrong: [800 + 1.96 * se18],
        explanation: t`$\frac{k - 800}{${s(se18)}} = 1.645$, so $k = 800 + 1.645 \times ${s(se18)} = ${sfStr(k18t, 5)}$, i.e. $${sfStr(k18, 4)}$ hours. (1.96 is the two-tailed value.)` }),
      P.num({ label: "(d)", marks: 3, stem: "Find the smallest sample size for which the probability that the sample mean differs from 800 by less than 25 hours is at least 0.95.", value: n18, wrong: [n18 - 1, 23],
        explanation: t`$\frac{25}{120/\sqrt{n}} \ge 1.96 \Rightarrow \sqrt{n} \ge 9.408 \Rightarrow n \ge ${sfStr((1.96 * 120 / 25) ** 2, 5)}$, so $n = ${n18}$.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the method used in (b) would not be valid for a sample of 6 bulbs.",
        points: ["The lifetimes are not normally distributed (positively skewed).", "With n = 6 the sample is too small for the central limit theorem, so the sample mean need not be approximately normal."],
        modelAnswer: "The population of lifetimes is skewed, not normal, and a sample of 6 is too small for the central limit theorem to apply, so the sample mean cannot be assumed to be approximately normal.",
        explanation: "Both conditions matter: non-normal population and small n." }),
    ],
    explanation: "Use the central limit theorem for the mean of a large sample from a skewed population; solve for k or n with the standard normal values 1.645 and 1.96.",
    hints: ["Var(X̄) = σ²/n.", "In (d), round n up."],
  });
  chk(Math.abs(k18 - k18t) < 0.06 ? 1 : 0, 1);

  // ---------------------------------------------------------------- flashcards
  b.card("FORMULA", t`Distribution of the sample mean $\bar{X}$`, t`$\mathrm{E}(\bar{X}) = \mu$, $\mathrm{Var}(\bar{X}) = \frac{\sigma^2}{n}$`);
  b.card("DEFINITION", "Standard error of the mean", t`$\frac{\sigma}{\sqrt{n}}$, the standard deviation of $\bar{X}$.`);
  b.card("FACT", "Sample mean from a normal population", t`If $X \sim \mathrm{N}(\mu, \sigma^2)$, then $\bar{X} \sim \mathrm{N}\left(\mu, \frac{\sigma^2}{n}\right)$ exactly, for any $n$.`);
  b.card("DEFINITION", "Central limit theorem", t`For a large random sample from any population with mean $\mu$ and variance $\sigma^2$, $\bar{X} \approx \mathrm{N}\left(\mu, \frac{\sigma^2}{n}\right)$.`, "Rule of thumb: n ≥ 30.");
  b.card("CONCEPT", "When the CLT is needed", "Only when the population is not normal; then the sample must be large.");
  b.card("FORMULA", t`Total $T$ of $n$ independent observations`, t`$\mathrm{E}(T) = n\mu$, $\mathrm{Var}(T) = n\sigma^2$`, "Not n²σ²: that would be nX, one observation scaled.");
  b.card("CONCEPT", "Effect of sample size on the standard error", "Quadrupling n halves the standard error.");
  b.card("FACT", "Population vs sampling distribution", "The CLT changes nothing about the population; it describes the distribution of the sample mean.");
  b.card("CONCEPT", "Mean of a Poisson sample", t`If $X \sim \mathrm{Po}(\lambda)$ and $n$ is large, $\bar{X} \approx \mathrm{N}\left(\lambda, \frac{\lambda}{n}\right)$.`);
});
