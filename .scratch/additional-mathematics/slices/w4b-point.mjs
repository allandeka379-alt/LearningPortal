// W4b: amath.estimation.point (ZIMSEC only)
import { concept, P, t, chk, same, mean, s2, variance, sfStr } from "../lib.mjs";

const Sxx = (n, sx, sx2) => sx2 - (sx * sx) / n;

concept("amath.estimation.point", { file: "estimation/point", keyPrefix: "estimation.point" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which formula gives an unbiased estimate of the population variance from a sample $x_1, \ldots, x_n$ with mean $\bar{x}$?`,
    options: [
      [t`$\dfrac{\sum (x - \bar{x})^2}{n - 1}$`, "Correct: the divisor n − 1 makes the estimate unbiased."],
      [t`$\dfrac{\sum (x - \bar{x})^2}{n}$`, "This is the sample variance, which underestimates σ² on average."],
      [t`$\dfrac{\sum (x - \bar{x})}{n - 1}$`, "The deviations must be squared; their plain sum is always 0."],
      [t`$\dfrac{\sum x^2}{n - 1}$`, t`The square of the mean must be removed: use $\sum x^2 - \frac{(\sum x)^2}{n}$.`],
    ],
    answer: "A",
    explanation: t`$s^2 = \frac{\sum (x - \bar{x})^2}{n - 1}$ is the unbiased estimate of $\sigma^2$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A researcher takes a random sample of 50 maize cobs from a large harvest. Which of these is a parameter rather than a statistic?",
    options: [
      ["The mean mass of all the cobs in the harvest", "Correct: it describes the whole population and is usually unknown."],
      ["The mean mass of the 50 cobs in the sample", "This is calculated from the sample, so it is a statistic."],
      ["The largest mass in the sample", "This comes from the sample: a statistic."],
      ["The unbiased variance estimate from the sample", "An estimate is calculated from the sample: a statistic."],
    ],
    answer: "A",
    explanation: "Parameters describe populations (μ, σ²); statistics are calculated from samples and are used to estimate parameters.",
  });

  {
    const v = 1835 / 25;
    chk(v, 73.4);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`A random sample of 25 learners' test marks gives $\sum x = 1835$. Find an unbiased estimate of the population mean mark.`,
      value: v, wrong: [1835 / 24, 1835],
      explanation: t`$\bar{x} = \frac{1835}{25} = 73.4$. The divisor $n - 1$ is used only for the variance, not the mean.`,
    });
  }

  {
    const v = (10 / 9) * 18;
    chk(v, 20);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: "A random sample of 10 values has variance 18, calculated with divisor 10. Find an unbiased estimate of the population variance.",
      value: v, wrong: [16.2, 18],
      explanation: t`$s^2 = \frac{n}{n - 1} \times 18 = \frac{10}{9} \times 18 = 20$. Multiplying by $\frac{9}{10}$ instead gives 16.2.`,
    });
  }

  {
    const sxx = Sxx(12, 246, 5300);
    chk(sxx, 257, 1e-9);
    const v = sxx / 11;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`For a random sample of 12 observations, $\sum x = 246$ and $\sum x^2 = 5300$. Find an unbiased estimate of the population variance, correct to 3 significant figures.`,
      value: v, wrong: [sxx / 12, 5300 / 11],
      explanation: t`$\sum x^2 - \frac{(\sum x)^2}{n} = 5300 - \frac{246^2}{12} = 5300 - 5043 = 257$. $s^2 = \frac{257}{11} = ${sfStr(v, 3)}$. Dividing by 12 gives 21.4.`,
      hints: [t`Find $\sum x^2 - \frac{(\sum x)^2}{n}$ first.`],
    });
  }

  {
    const d = [12, 15, 9, 14, 10];
    chk(mean(d), 12); chk(s2(d), 6.5, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "The numbers of eggs laid in a week by a random sample of 5 hens are 12, 15, 9, 14 and 10. Find an unbiased estimate of the population variance.",
      value: 6.5, wrong: [5.2, 26],
      explanation: t`$\bar{x} = \frac{60}{5} = 12$. Deviations $0, 3, -3, 2, -2$; squares sum to $0 + 9 + 9 + 4 + 4 = 26$. $s^2 = \frac{26}{4} = 6.5$. Dividing by 5 gives 5.2.`,
      hints: ["Find the mean, then the squared deviations."],
    });
  }

  {
    const v = 9 / Math.sqrt(36);
    chk(v, 1.5);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: "A population has standard deviation 9. Find the standard error of the mean for random samples of size 36.",
      value: v, wrong: [0.25, 2.25],
      explanation: t`Standard error $= \frac{\sigma}{\sqrt{n}} = \frac{9}{6} = 1.5$. Dividing by 36 gives 0.25; $\frac{81}{36} = 2.25$ is the variance of the mean.`,
    });
  }

  {
    const sxx = Sxx(50, 2600, 140000);
    chk(sxx, 4800, 1e-9);
    const s2v = sxx / 49, se = Math.sqrt(s2v / 50);
    b.num({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A random sample of 50 bags of fertiliser gives masses (kg) with $\sum x = 2600$ and $\sum x^2 = 140\,000$. Estimate the standard error of the mean, correct to 3 significant figures.`,
      value: se, wrong: [Math.sqrt(s2v), Math.sqrt(sxx / 50) / Math.sqrt(50)],
      explanation: t`$\bar{x} = 52$. $\sum x^2 - \frac{(\sum x)^2}{n} = 140\,000 - 135\,200 = 4800$, so $s^2 = \frac{4800}{49} = 97.96$. Standard error $\approx \sqrt{\frac{97.96}{50}} = ${sfStr(se, 3)}$ kg. $s = 9.90$ is the standard deviation of single bags.`,
      hints: ["Find s² first, then divide by n and take the square root."],
    });
  }

  {
    const sxx = Sxx(20, 316, 5120);
    chk(sxx, 127.2, 1e-9);
    const sv = sxx / 19;
    b.fib({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`For a random sample of 20 fish from Lake Chivero, the lengths $x$ cm give $\sum x = 316$ and $\sum x^2 = 5120$. Find unbiased estimates of the population mean and variance, the variance correct to 3 significant figures.`,
      template: "Mean = {{blank:m}} cm; variance = {{blank:v}} cm²",
      blanks: [
        { id: "m", input: "number", accepted: [15.8], tolerance: 0.0005, wrong: "16.6" },
        { id: "v", input: "number", accepted: [Number(sfStr(sv, 3))], tolerance: 0.006, wrong: "6.36" },
      ],
      explanation: t`$\bar{x} = \frac{316}{20} = 15.8$. $\sum x^2 - \frac{316^2}{20} = 5120 - 4992.8 = 127.2$, so $s^2 = \frac{127.2}{19} = ${sfStr(sv, 3)}$. Dividing by 20 gives 6.36.`,
      hints: ["Use n − 1 = 19 for the variance only."],
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For the same sample, the unbiased estimate $s^2$ is always larger than the sample variance calculated with divisor $n$ (unless all the values are equal).`,
    answer: true,
    explanation: t`True. $s^2 = \frac{n}{n - 1} \times$ (sample variance), and $\frac{n}{n - 1} > 1$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Every random sample from a population gives the same estimate $\bar{x}$ of the population mean.`,
    answer: false,
    explanation: t`False. $\bar{x}$ varies from sample to sample; the estimator is unbiased because these estimates are correct **on average**, not because each one equals $\mu$.`,
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each term with its meaning.",
    pairs: [
      ["Parameter", t`A number describing the population, such as $\mu$`],
      ["Statistic", t`A number calculated from a sample, such as $\bar{x}$`],
      ["Estimator", "A rule or formula for estimating a parameter from a sample"],
      ["Unbiased estimator", "An estimator whose expected value equals the parameter"],
      ["Standard error of the mean", t`The standard deviation of $\bar{X}$, $\frac{\sigma}{\sqrt{n}}$`],
    ],
    explanation: "Parameters are fixed but unknown; statistics vary from sample to sample and estimate them.",
  });

  {
    chk(84 / 7, 12);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`For a random sample of 8 values, $\sum (x - \bar{x})^2 = 84$. What is the unbiased estimate of the population variance?`,
      options: [
        ["12", t`Correct: $\frac{84}{8 - 1} = 12$.`],
        ["10.5", "This divides by n = 8, giving the biased sample variance."],
        ["3.46", "This is the square root of 12, an estimate of the standard deviation."],
        ["9.17", "This is √84; the sum of squares must be divided by n − 1 = 7, not square-rooted."],
      ],
      answer: "A",
      explanation: t`$s^2 = \frac{\sum (x - \bar{x})^2}{n - 1} = \frac{84}{7} = 12$.`,
      hints: ["What is n − 1?"],
    });
  }

  {
    const n = 25;
    chk((n / (n - 1)) * 24, 25);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`A sample has variance 24 when calculated with divisor $n$, and the unbiased estimate of the population variance is 25. Find the sample size $n$.`,
      value: n, wrong: [24, 1],
      explanation: t`$\frac{n}{n - 1} \times 24 = 25$, so $24n = 25n - 25$ and $n = 25$.`,
      hints: [t`$s^2 = \frac{n}{n - 1} \times$ sample variance.`],
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Explain why the variance of a sample, calculated with divisor $n$, tends to underestimate the population variance, and how $s^2$ corrects this.`,
    points: [
      t`The deviations are measured from the sample mean $\bar{x}$, which is calculated from the same data and is the value that makes $\sum (x - \bar{x})^2$ as small as possible; so the spread about $\bar{x}$ is on average smaller than about $\mu$.`,
      t`Dividing by $n - 1$ instead of $n$ enlarges the estimate by the factor $\frac{n}{n - 1}$, which makes it correct on average (unbiased).`,
    ],
    modelAnswer: t`The data are always as close as possible to their own mean $\bar{x}$, so $\sum (x - \bar{x})^2$ is on average smaller than $\sum (x - \mu)^2$, and dividing by $n$ underestimates $\sigma^2$. Using the divisor $n - 1$ multiplies the result by $\frac{n}{n - 1}$, and this exactly removes the bias on average.`,
    explanation: "The sample mean is fitted to the data, which shrinks the deviations.",
    hints: ["Deviations are measured from x̄, not μ."],
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Explain the difference between an estimator and an estimate, using the population mean as an example.",
    points: [
      t`An estimator is a rule (a random quantity before sampling), e.g. $\bar{X} = \frac{\sum X}{n}$: "add the sample values and divide by $n$".`,
      t`An estimate is the number the rule gives for one particular sample, e.g. $\bar{x} = 73.4$.`,
    ],
    modelAnswer: "The estimator is the formula 'add the values in the sample and divide by n', which can be applied to any sample. The estimate is the value it produces for the sample actually taken, such as 73.4 marks.",
    explanation: "Estimator = rule; estimate = the number for one sample.",
  });

  {
    const n = 10, sx = 263, sx2 = 7031;
    const sxx = Sxx(n, sx, sx2);
    chk(sxx, 114.1, 1e-9);
    const sv = sxx / 9, se = Math.sqrt(sv / n);
    const nNeed = Math.ceil(sv / 0.25);
    same(nNeed, 51);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`The times, $x$ minutes, taken by a random sample of 10 runners to complete a 5 km fun run in Gweru give $\sum x = 263$ and $\sum x^2 = 7031$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Find an unbiased estimate of the population mean time.", value: sx / n, unit: "min", wrong: [263 / 9],
          explanation: t`$\bar{x} = \frac{263}{10} = 26.3$ minutes.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find an unbiased estimate of the population variance, correct to 3 significant figures.", value: sv, wrong: [sxx / 10, 7031 / 9],
          explanation: t`$7031 - \frac{263^2}{10} = 7031 - 6916.9 = 114.1$, so $s^2 = \frac{114.1}{9} = ${sfStr(sv, 3)}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Estimate the standard error of the mean, correct to 3 significant figures.", value: se, unit: "min", wrong: [Math.sqrt(sv), sv / 10],
          explanation: t`$\sqrt{\frac{${sfStr(sv, 4)}}{10}} = ${sfStr(se, 3)}$ minutes.` }),
        P.num({ label: "(d)", marks: 3, stem: "Using your estimate of the variance, find the smallest sample size for which the standard error of the mean would be at most 0.5 minutes.", value: nNeed, wrong: [50, 26],
          explanation: t`$\frac{s}{\sqrt{n}} \leq 0.5$ gives $n \geq \frac{s^2}{0.25} = \frac{${sfStr(sv, 4)}}{0.25} = ${(sv / 0.25).toFixed(1)}$, so $n = 51$ (round up).` }),
      ],
      explanation: "Use x̄ = Σx/n, s² = (Σx² − (Σx)²/n)/(n − 1) and standard error s/√n.",
      hints: ["Use n − 1 = 9 in (b).", "In (d), square both sides of s/√n ≤ 0.5."],
    });
  }

  {
    const d = [31.2, 28.5, 33.0, 29.8, 30.6, 31.5];
    const m = mean(d), sv = s2(d), vn = variance(d);
    chk(m, 30.766666666666666, 1e-9);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: "The lengths, in cm, of a random sample of 6 bream caught at Lake Mutirikwi are 31.2, 28.5, 33.0, 29.8, 30.6 and 31.5.",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find an unbiased estimate of the population mean length, correct to 3 significant figures.", value: m, unit: "cm", wrong: [184.6 / 5],
          explanation: t`$\sum x = 184.6$, so $\bar{x} = \frac{184.6}{6} = ${sfStr(m, 4)} \approx ${sfStr(m, 3)}$ cm.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find an unbiased estimate of the population variance, correct to 3 significant figures.", value: sv, wrong: [vn],
          explanation: t`$\sum x^2 = ${d.reduce((a, x) => a + x * x, 0).toFixed(2)}$; $\sum x^2 - \frac{184.6^2}{6} = ${(d.reduce((a, x) => a + x * x, 0) - (184.6 ** 2) / 6).toFixed(4)}$; $s^2 = \frac{${(d.reduce((a, x) => a + x * x, 0) - (184.6 ** 2) / 6).toFixed(4)}}{5} = ${sfStr(sv, 3)}$ cm². Dividing by 6 gives ${sfStr(vn, 3)}.` }),
        P.tf({ label: "(c)", marks: 1, stem: "If the variance were calculated with divisor 6, the answer to (b) would be larger.", answer: false,
          explanation: "False: dividing by 6 instead of 5 gives a smaller value." }),
      ],
      explanation: "Mean with divisor n; unbiased variance with divisor n − 1.",
      hints: ["Use a calculator's statistics mode, but record Σx and Σx²."],
    });
    chk(d.reduce((a, x) => a + x, 0), 184.6, 1e-9);
  }

  // flashcards
  b.card("DEFINITION", "Point estimate", "A single value, calculated from a sample, used as an estimate of a population parameter.");
  b.card("DEFINITION", "Unbiased estimator", "An estimator whose expected value equals the parameter it estimates: right on average.");
  b.card("FORMULA", "Unbiased estimate of the mean", t`$\bar{x} = \dfrac{\sum x}{n}$`);
  b.card("FORMULA", "Unbiased estimate of the variance", t`$s^2 = \dfrac{1}{n - 1}\left(\sum x^2 - \dfrac{(\sum x)^2}{n}\right)$`);
  b.card("FORMULA", "From the sample variance to s²", t`$s^2 = \dfrac{n}{n - 1} \times (\text{variance with divisor } n)$`);
  b.card("FORMULA", "Standard error of the mean", t`$\dfrac{\sigma}{\sqrt{n}}$, estimated by $\dfrac{s}{\sqrt{n}}$`);
  b.card("CONCEPT", "Parameter or statistic?", "Parameters (μ, σ²) describe the population; statistics (x̄, s²) are calculated from a sample.");
  b.card("CONCEPT", "Why n − 1?", "Deviations from x̄ are on average smaller than from μ; dividing by n − 1 removes this bias.");
});
