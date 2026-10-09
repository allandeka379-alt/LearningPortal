// W4b: amath.estimation.confidence-intervals (ZIMSEC only)
import { concept, P, t, chk, same, ciMean, sfStr, dpStr } from "../lib.mjs";

concept("amath.estimation.confidence-intervals", { file: "estimation/confidence-intervals", keyPrefix: "estimation.confidence-intervals" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which value of z is used in a 99% confidence interval for a population mean?",
    options: [
      ["2.576", t`Correct: $\Phi(2.576) = 0.995$, leaving 0.5% in each tail.`],
      ["1.96", "1.96 is used for 95% confidence."],
      ["2.326", t`$\Phi(2.326) = 0.99$ leaves 1% in one tail; a two-sided 99% interval needs 0.5% in each tail.`],
      ["0.99", "0.99 is the confidence level, not a z-value."],
    ],
    answer: "A",
    explanation: "A two-sided 99% interval leaves 0.5% in each tail, so z = 2.576; for 95%, z = 1.96.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A 95% confidence interval for the mean mass of oranges from an orchard is (148.2 g, 153.4 g). Which statement is the correct interpretation?",
    options: [
      ["About 95% of intervals made this way from repeated samples would contain the true mean.", "Correct: the confidence level describes the method over repeated samples."],
      ["95% of the oranges in the orchard weigh between 148.2 g and 153.4 g.", "The interval is about the mean, not about individual oranges."],
      ["The sample mean lies between 148.2 g and 153.4 g with probability 0.95.", "The sample mean is the centre of the interval; it certainly lies inside it."],
      ["The true mean mass changes, and lies in this interval 95% of the time.", "The true mean is fixed; it is the interval that varies from sample to sample."],
    ],
    answer: "A",
    explanation: "μ is fixed. A 95% confidence interval comes from a method that captures μ in about 95% of samples.",
  });

  {
    const m = 1.96 * 14 / Math.sqrt(49);
    chk(m, 3.92, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: "A population has standard deviation 14. A random sample of 49 is taken. Find the margin of error of a 95% confidence interval for the population mean.",
      value: m, wrong: [1.96 * 14 / 49, 2.576 * 2],
      explanation: t`Standard error $= \frac{14}{\sqrt{49}} = 2$. Margin $= 1.96 \times 2 = 3.92$. Dividing by 49 instead of 7 gives 0.56.`,
    });
  }

  {
    const c = ciMean(48.2, 4, 25, 95);
    chk(c.lo, 46.632, 1e-9); chk(c.hi, 49.768, 1e-9);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "The lengths of leaves on a type of tobacco plant are normally distributed with standard deviation 4 cm. A random sample of 25 leaves has mean length 48.2 cm. Find a 95% confidence interval for the population mean length, giving the end-points to 3 significant figures.",
      template: "({{blank:a}} cm, {{blank:b}} cm)",
      blanks: [
        { id: "a", input: "number", accepted: [Number(sfStr(c.lo, 3))], tolerance: 0.05, wrong: "40.4" },
        { id: "b", input: "number", accepted: [Number(sfStr(c.hi, 3))], tolerance: 0.05, wrong: "56.0" },
      ],
      explanation: t`Standard error $= \frac{4}{\sqrt{25}} = 0.8$. Margin $= 1.96 \times 0.8 = 1.568$. Interval: $48.2 \pm 1.568 = (46.6, 49.8)$ cm. Using $\sigma = 4$ instead of 0.8 gives the much wider (40.4, 56.0).`,
      hints: ["Use the standard error σ/√n."],
    });
  }

  {
    const c = ciMean(120, 15, 50, 99);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A normal population has standard deviation 15. A random sample of 50 has mean 120. Find a 99% confidence interval for the population mean, giving the end-points to 1 decimal place.",
      template: "({{blank:a}}, {{blank:b}})",
      blanks: [
        { id: "a", input: "number", accepted: [Number(dpStr(c.lo, 1))], tolerance: 0.05, wrong: "115.8" },
        { id: "b", input: "number", accepted: [Number(dpStr(c.hi, 1))], tolerance: 0.05, wrong: "124.2" },
      ],
      explanation: t`Standard error $= \frac{15}{\sqrt{50}} = 2.121$. Margin $= 2.576 \times 2.121 = ${dpStr(2.576 * c.se, 3)}$. Interval: $(${dpStr(c.lo, 1)}, ${dpStr(c.hi, 1)})$. Using 1.96 gives the 95% interval (115.8, 124.2).`,
      hints: ["99% confidence uses z = 2.576."],
    });
  }

  {
    const w = 2 * 2.576 * 10 / Math.sqrt(100);
    chk(w, 5.152, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "A population has standard deviation 10. Find the width of a 99% confidence interval for the mean based on a random sample of 100, correct to 3 significant figures.",
      value: w, wrong: [2.576, 3.92],
      explanation: t`Width $= 2 \times 2.576 \times \frac{10}{\sqrt{100}} = 5.152 \approx 5.15$. 2.576 is the margin of error (half the width); 3.92 is the width at 95%.`,
      hints: ["The width is twice the margin of error."],
    });
  }

  {
    const n = Math.ceil((1.96 * 8 / 1.5) ** 2);
    same(n, 110);
    chk((1.96 * 8 / 1.5) ** 2, 109.27, 0.01);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "The yields of maize plots have standard deviation 8 bags per hectare. Find the smallest sample size needed for the margin of error of a 95% confidence interval for the mean yield to be at most 1.5 bags per hectare.",
      value: n, wrong: [109, Math.ceil((1.96 * 8 / 0.75) ** 2)],
      explanation: t`$1.96 \times \frac{8}{\sqrt{n}} \leq 1.5$ gives $\sqrt{n} \geq 10.453$, so $n \geq 109.27$. The smallest sample size is 110 (round up); 109 is too small. Treating 1.5 as the full width instead of the margin gives 438.`,
      hints: ["Make √n the subject, square, then round up."],
    });
  }

  {
    const s = (1.92 * 10) / 1.96;
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "A 95% confidence interval for a population mean, based on a random sample of 100 from a population with known standard deviation, is (61.08, 64.92). Find the population standard deviation, correct to 3 significant figures.",
      value: s, wrong: [1.92 * 10 / 2.576, 1.92],
      explanation: t`The margin of error is half the width: $\frac{64.92 - 61.08}{2} = 1.92$. So $1.96 \times \frac{\sigma}{10} = 1.92$ and $\sigma = \frac{19.2}{1.96} = ${sfStr(s, 3)}$.`,
      hints: ["The centre is x̄ and half the width is the margin of error."],
    });
  }

  {
    const v = (23.4 + 27.0) / 2;
    chk(v, 25.2, 1e-9);
    b.num({
      d: 3, skill: "UNDERSTANDING", calculator: false,
      stem: "A confidence interval for a population mean is (23.4, 27.0). Find the sample mean from which it was calculated.",
      value: v, wrong: [3.6, 1.8],
      explanation: t`The interval is symmetrical about $\bar{x}$: $\bar{x} = \frac{23.4 + 27.0}{2} = 25.2$. (The margin of error is 1.8.)`,
      hints: ["The interval is x̄ ± margin."],
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "For the same sample, raising the confidence level makes the confidence interval for the mean wider.",
    answer: true,
    explanation: "True. More confidence needs a larger z (for example 2.576 instead of 1.96), so the interval is wider.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: "A 95% confidence interval for the mean contains about 95% of the values in the sample.",
    answer: false,
    explanation: "False. The interval is an estimate of the population mean, and it is usually much narrower than the spread of the data.",
  });

  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "Taking a sample four times as large halves the width of a confidence interval for the mean (other things being equal).",
    answer: true,
    explanation: t`True. The width is $2z\frac{\sigma}{\sqrt{n}}$; replacing $n$ by $4n$ doubles the denominator $\sqrt{n}$, so the width is halved.`,
    hints: [t`$\sqrt{4n} = 2\sqrt{n}$.`],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`For a confidence interval $\bar{x} \pm z\frac{\sigma}{\sqrt{n}}$, match each quantity with its expression.`,
    pairs: [
      ["Centre of the interval", t`$\bar{x}$`],
      ["Standard error of the mean", t`$\dfrac{\sigma}{\sqrt{n}}$`],
      ["Margin of error", t`$z\dfrac{\sigma}{\sqrt{n}}$`],
      ["Width of the interval", t`$2z\dfrac{\sigma}{\sqrt{n}}$`],
    ],
    explanation: "The interval is centred on the sample mean; the margin is z standard errors; the width is twice the margin.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "A health worker in Masvingo calculates a 95% confidence interval of (2.8 kg, 3.2 kg) for the mean birth mass of babies born at a district hospital. Interpret this interval in context.",
    points: [
      "We are 95% confident that the mean birth mass of all babies born at the hospital lies between 2.8 kg and 3.2 kg.",
      "Meaning: about 95% of intervals calculated in this way from random samples would contain the true mean (it does not say 95% of babies weigh between 2.8 and 3.2 kg).",
    ],
    modelAnswer: "We can be 95% confident that the population mean birth mass at the hospital is between 2.8 kg and 3.2 kg: the method used gives intervals that contain the true mean in about 95% of samples. It is a statement about the mean, not about individual babies.",
    explanation: "Interpret about the population mean, in context, with the confidence level.",
    hints: ["Is the interval about individual babies or about the mean?"],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "The amounts customers spend at a supermarket are strongly skewed. A random sample of 60 receipts is used to find a 95% confidence interval for the mean amount spent, using the normal distribution. Explain why this is justified, and what is used in place of the unknown population standard deviation.",
    points: [
      "The sample is large (n = 60), so by the central limit theorem the sample mean is approximately normally distributed even though the amounts are skewed.",
      "The unknown σ is replaced by s, the square root of the unbiased estimate of the variance from the sample (acceptable because n is large).",
    ],
    modelAnswer: "With n = 60 the central limit theorem says that the sample mean is approximately normal, whatever the shape of the population, so x̄ ± 1.96 s/√n can be used. Since σ is unknown, it is estimated by s from the sample, which is reasonable for a large sample.",
    explanation: "Large sample: central limit theorem, and s replaces σ.",
    hints: ["Which theorem makes x̄ approximately normal?"],
  });

  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: "A company claims that its batteries last 13.5 hours on average. A 95% confidence interval for the mean life, from a random sample, is (12.3, 13.1) hours. What should you conclude?",
    options: [
      ["The data cast doubt on the claim, because 13.5 lies outside the interval.", "Correct: the claimed mean is not among the plausible values."],
      ["The claim is proved true, because 13.5 is close to the interval.", "Being close is not enough; 13.5 is outside the interval."],
      ["The claim is proved false with certainty.", "A 95% interval gives evidence, not certainty."],
      ["No conclusion is possible without the sample size.", "The interval already includes the effect of the sample size."],
    ],
    answer: "A",
    explanation: "Values outside a 95% confidence interval are not supported by the data at the 5% level, so the claim of 13.5 hours is doubtful (the batteries seem to last less).",
    hints: ["Is 13.5 inside the interval?"],
  });

  {
    const n = 64, sx = 3232, sx2 = 163820;
    const xb = sx / n, sxx = sx2 - (sx * sx) / n;
    chk(xb, 50.5); chk(sxx, 604, 1e-9);
    const sv = sxx / 63, c = ciMean(xb, Math.sqrt(sv), n, 95);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`A random sample of 64 bags of maize from a grain depot near Chinhoyi gives masses $x$ kg with $\sum x = 3232$ and $\sum x^2 = 163\,820$. The bags are labelled "50 kg".`,
      parts: [
        P.fib({ label: "(a)", marks: 3, stem: "Find unbiased estimates of the population mean and variance, the variance correct to 3 significant figures.", template: "Mean = {{blank:m}} kg; variance = {{blank:v}} kg²",
          blanks: [{ id: "m", input: "number", accepted: [xb], tolerance: 0.0005, wrong: "51.3" }, { id: "v", input: "number", accepted: [Number(sfStr(sv, 3))], tolerance: 0.006, wrong: "9.44" }],
          explanation: t`$\bar{x} = \frac{3232}{64} = 50.5$. $163\,820 - \frac{3232^2}{64} = 163\,820 - 163\,216 = 604$; $s^2 = \frac{604}{63} = ${sfStr(sv, 3)}$.` }),
        P.fib({ label: "(b)", marks: 3, stem: "Find a 95% confidence interval for the population mean mass, giving the end-points to 4 significant figures.", template: "({{blank:a}} kg, {{blank:b}} kg)",
          blanks: [{ id: "a", input: "number", accepted: [Number(sfStr(c.lo, 4))], tolerance: 0.006, wrong: "44.4" }, { id: "b", input: "number", accepted: [Number(sfStr(c.hi, 4))], tolerance: 0.006, wrong: "56.6" }],
          explanation: t`$s = ${sfStr(Math.sqrt(sv), 4)}$, standard error $= \frac{${sfStr(Math.sqrt(sv), 4)}}{8} = ${sfStr(c.se, 4)}$, margin $= 1.96 \times ${sfStr(c.se, 4)} = ${sfStr(1.96 * c.se, 3)}$. Interval $(${sfStr(c.lo, 4)}, ${sfStr(c.hi, 4)})$ kg.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Comment on the label \"50 kg\".",
          points: ["50 lies inside the confidence interval.", "So the data are consistent with a mean of 50 kg (no evidence at the 5% level that the bags are wrongly labelled)."],
          modelAnswer: t`50 kg lies inside the interval $(${sfStr(c.lo, 4)}, ${sfStr(c.hi, 4)})$, so a population mean of 50 kg is plausible: the sample gives no evidence that the bags are wrongly labelled.`,
          explanation: "A claimed value inside the interval is consistent with the data." }),
        P.tf({ label: "(d)", marks: 1, stem: "The interval in (b) is valid only if the masses of the bags are exactly normally distributed.", answer: false,
          explanation: "False: n = 64 is large, so the central limit theorem makes x̄ approximately normal whatever the distribution of the masses." }),
      ],
      explanation: "Estimate μ and σ² from the summary statistics, then use x̄ ± 1.96 s/√n for a large sample.",
      hints: ["Use n − 1 = 63 for s².", "Standard error = s/√64."],
    });
  }

  {
    const c95 = ciMean(158.4, 6.5, 30, 95), c120 = ciMean(158.4, 6.5, 120, 95);
    const w120 = c120.hi - c120.lo, nNeed = Math.ceil(((2 * 1.96 * 6.5) / 3) ** 2);
    same(nNeed, 73);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: "The heights of Form 4 girls in a province are normally distributed with standard deviation 6.5 cm. A random sample of 30 girls has mean height 158.4 cm.",
      parts: [
        P.fib({ label: "(a)", marks: 3, stem: "Find a 95% confidence interval for the mean height of all Form 4 girls in the province, giving the end-points to 1 decimal place.", template: "({{blank:a}} cm, {{blank:b}} cm)",
          blanks: [{ id: "a", input: "number", accepted: [Number(dpStr(c95.lo, 1))], tolerance: 0.05, wrong: "145.7" }, { id: "b", input: "number", accepted: [Number(dpStr(c95.hi, 1))], tolerance: 0.05, wrong: "171.1" }],
          explanation: t`Standard error $= \frac{6.5}{\sqrt{30}} = ${sfStr(c95.se, 4)}$; margin $= 1.96 \times ${sfStr(c95.se, 4)} = ${sfStr(1.96 * c95.se, 4)}$. Interval $(${dpStr(c95.lo, 1)}, ${dpStr(c95.hi, 1)})$ cm.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the width the 95% confidence interval would have had if the sample had contained 120 girls (with the same standard deviation), correct to 3 significant figures.", value: w120, unit: "cm", wrong: [w120 / 2, (c95.hi - c95.lo) / 4],
          explanation: t`Width $= 2 \times 1.96 \times \frac{6.5}{\sqrt{120}} = ${sfStr(w120, 3)}$ cm, half the width for 30 girls (${sfStr(c95.hi - c95.lo, 3)} cm), because the sample is four times as large. Dividing by 4 instead of 2 gives 1.16.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the smallest sample size for which the width of a 95% confidence interval would be at most 3 cm.", value: nNeed, wrong: [72, 19],
          explanation: t`$2 \times 1.96 \times \frac{6.5}{\sqrt{n}} \leq 3$ gives $\sqrt{n} \geq 8.493$, $n \geq 72.1$, so $n = 73$.` }),
      ],
      explanation: "Interval x̄ ± zσ/√n; width 2zσ/√n; solve for n and round up.",
      hints: ["The width is 2 × 1.96 × σ/√n.", "Round the sample size up."],
    });
  }

  // flashcards
  b.card("FORMULA", "Confidence interval for a mean", t`$\bar{x} \pm z\dfrac{\sigma}{\sqrt{n}}$; use $s$ for $\sigma$ when $n$ is large and $\sigma$ is unknown.`);
  b.card("FACT", "z-values for confidence intervals", "95%: z = 1.96. 99%: z = 2.576.");
  b.card("DEFINITION", "Margin of error", t`$z\dfrac{\sigma}{\sqrt{n}}$: half the width of the interval.`);
  b.card("CONCEPT", "Interpreting a 95% interval", "About 95% of intervals made this way from random samples contain the true mean; it says nothing about individual values.");
  b.card("CONCEPT", "What affects the width", "Higher confidence → wider. Larger σ → wider. Larger n → narrower (∝ 1/√n).");
  b.card("FORMULA", "Sample size for a given width w", t`$n \geq \left(\dfrac{2z\sigma}{w}\right)^2$, rounded up.`);
  b.card("CONCEPT", "When the formula applies", "Normal population with known σ (any n), or any population with a large sample (central limit theorem).");
  b.card("CONCEPT", "Testing a claim with an interval", "A claimed mean outside a 95% interval is doubtful at the 5% level; one inside is consistent with the data.");
});
