// W4b exam-format items: ZIMSEC Paper 2 Section A (10 marks, statistics) x 5 and Section C (12 marks, probability and
// statistics) x 8. Every value is computed and checked.
import { concept, P, t, chk, same, binom, phiTable, invPhi, normalProb, ciMean, integrate, sfStr, dpStr, money, ZIM } from "../lib.mjs";

const Q = (k) => `amath.${k}`;
const N = (id, x, wrong, extra = {}) => ({ id, input: "number", accepted: [x], wrong, ...extra });
const I = (f, a, b) => integrate(f, a, b, 4000);
const NP = (mu, s, lo, hi) => normalProb(mu, s, lo ?? -Infinity, hi ?? Infinity);
const A10 = { d: 4, marks: 10, secs: 900, examStyle: true, paper: "Paper 2", applies: ZIM };
const C12 = { d: 4, marks: 12, secs: 1080, examStyle: true, paper: "Paper 2", applies: ZIM };

concept(Q("probability.set-language"), { file: "exam/w4b-zimsec", keyPrefix: "exam.w4b-zimsec", applies: ZIM }, (b) => {
  // ===================================================================================================================
  // Section A (10 marks)

  // A1: Venn diagram and relative frequency
  {
    const R = 58, T = 35, both = 21, total = 100;
    const rOnly = R - both, tOnly = T - both, neither = total - (rOnly + tOnly + both);
    same([rOnly, tOnly, neither], [37, 14, 28]);
    b.struct({
      ...A10, d: 3, skill: "APPLICATION", calculator: false,
      concepts: [Q("probability.set-language"), Q("probability.approaches")],
      stem: "In a survey of 100 households in Gokwe, 58 own a radio, 35 own a television and 21 own both.",
      parts: [
        P.fib({ label: "(a)", marks: 3, stem: "Complete the numbers in the regions of a Venn diagram.", template: "Radio only: {{blank:r}}; television only: {{blank:t}}; neither: {{blank:n}}",
          blanks: [N("r", rOnly, "58"), N("t", tOnly, "35"), N("n", neither, "7")],
          explanation: t`Radio only $58 - 21 = 37$; television only $35 - 21 = 14$; neither $100 - (37 + 14 + 21) = 28$.` }),
        P.num({ label: "(b)", marks: 2, stem: "A household is chosen at random. Find the probability that it owns exactly one of the two items.", value: (rOnly + tOnly) / total, wrong: [(R + T) / total],
          explanation: t`$\frac{37 + 14}{100} = 0.51$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Find the probability that it owns a radio or a television (or both).", value: (rOnly + tOnly + both) / total, wrong: [0.93],
          explanation: t`$\frac{37 + 14 + 21}{100} = 0.72$ (or $1 - 0.28$).` }),
        P.num({ label: "(d)", marks: 2, stem: "The district has 2500 households. Use the survey to estimate how many own neither item.", value: 2500 * neither / total, wrong: [28],
          explanation: t`$2500 \times 0.28 = 700$ households.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Name the approach to probability used in (d) and state one reason why the estimate might be unreliable.",
          points: ["Experimental (relative frequency) probability, estimated from survey results.", "Reason, e.g. the sample of 100 is small, or the surveyed households may not be representative of the whole district."],
          modelAnswer: "It is experimental probability: the relative frequency 28/100 from the survey is used as the probability. The estimate may be unreliable because 100 households is a small sample and they may not represent all 2500 households in the district.",
          explanation: "Relative frequencies estimate probabilities; their reliability depends on the sample." }),
      ],
      explanation: "Fill the Venn diagram from the overlap outwards, then use relative frequencies as probabilities and expected frequency = n × p.",
      hints: ["Start with the 21 households that own both.", "Expected number = 2500 × probability."],
    });
  }

  // A2: independent events and a conditional probability
  {
    const pc = 0.7, pf = 0.55;
    const both = pc * pf, one = pc * (1 - pf) + (1 - pc) * pf, atLeast = 1 - (1 - pc) * (1 - pf), cGivenOne = (pc * (1 - pf)) / one;
    chk(both, 0.385, 1e-12); chk(one, 0.48, 1e-12); chk(atLeast, 0.865, 1e-12); chk(cGivenOne, 0.65625, 1e-12);
    b.struct({
      ...A10, skill: "APPLICATION", calculator: false,
      concepts: [Q("probability.addition-product-rules"), Q("probability.conditional")],
      stem: "In a netball shooting practice, Chipo scores with probability 0.7 and Farai scores with probability 0.55. They each take one shot, independently.",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the probability that both of them score.", value: both, wrong: [1.25],
          explanation: t`Independent: $0.7 \times 0.55 = 0.385$.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find the probability that exactly one of them scores.", value: one, wrong: [0.315],
          explanation: t`$0.7 \times 0.45 + 0.3 \times 0.55 = 0.315 + 0.165 = 0.48$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the probability that at least one of them scores.", value: atLeast, wrong: [1.25 - 0.385 + 0.385, 0.135],
          explanation: t`$1 - P(\text{neither}) = 1 - 0.3 \times 0.45 = 1 - 0.135 = 0.865$.` }),
        P.num({ label: "(d)", marks: 3, stem: "Given that exactly one of them scores, find the probability that it was Chipo. Give your answer as a fraction or correct to 3 significant figures.", value: cGivenOne, wrong: [0.315, 0.7],
          explanation: t`$\frac{0.315}{0.48} = \frac{21}{32} \approx 0.656$.` }),
      ],
      explanation: "Multiply for independent events, add mutually exclusive cases, and divide by the given event for the conditional probability.",
      hints: ["Exactly one: Chipo scores and Farai misses, or Chipo misses and Farai scores.", "In (d) the given event is 'exactly one scores'."],
    });
  }

  // A3: binomial
  {
    const n = 12, p = 0.18;
    const p2 = binom.pmf(n, p, 2), le1 = binom.cdf(n, p, 1);
    b.struct({
      ...A10, skill: "APPLICATION", calculator: true,
      concepts: [Q("distributions.binomial")],
      stem: "On a farm near Mutoko, 18% of the mangoes picked are bruised. A box contains 12 mangoes picked at random. X is the number of bruised mangoes in the box.",
      parts: [
        P.num({ label: "(a)", marks: 3, stem: t`Find $P(X = 2)$, correct to 3 significant figures.`, value: p2, wrong: [0.18 ** 2 * 0.82 ** 10],
          explanation: t`$X \sim B(12, 0.18)$. $\binom{12}{2}(0.18)^2(0.82)^{10} = 66 \times 0.0324 \times ${(0.82 ** 10).toFixed(5)} = ${sfStr(p2, 3)}$.` }),
        P.num({ label: "(b)", marks: 3, stem: t`Find $P(X \leq 1)$, correct to 3 significant figures.`, value: le1, wrong: [binom.pmf(n, p, 1)],
          explanation: t`$0.82^{12} + 12(0.18)(0.82)^{11} = ${sfStr(binom.pmf(n, p, 0), 4)} + ${sfStr(binom.pmf(n, p, 1), 4)} = ${sfStr(le1, 3)}$.` }),
        P.fib({ label: "(c)", marks: 2, stem: "Find the mean and the variance of X.", template: "Mean = {{blank:m}}; variance = {{blank:v}}",
          blanks: [N("m", 2.16, "1.7712", { tolerance: 0.0005 }), N("v", 1.7712, "2.16", { tolerance: 0.005 })],
          explanation: t`$np = 12 \times 0.18 = 2.16$; $npq = 2.16 \times 0.82 = 1.7712$ (1.77 to 3 s.f.).` }),
        P.manual({ label: "(d)", marks: 2, stem: "State two assumptions needed for the binomial model to be valid, in context.",
          points: ["Each mango is bruised independently of the others.", "The probability that a mango is bruised is the same (0.18) for every mango in the box."],
          modelAnswer: "The mangoes are bruised independently of each other (e.g. one bruised mango does not damage its neighbours), and each mango has the same probability, 0.18, of being bruised.",
          explanation: "Independence and a constant probability are the conditions most likely to fail." }),
      ],
      explanation: "Identify X ~ B(12, 0.18), use the binomial formula, and np, npq for the mean and variance.",
      hints: [t`$P(X = r) = \binom{n}{r}p^r(1 - p)^{n - r}$.`],
    });
  }

  // A4: normal distribution
  {
    const mu = 1200, s = 150;
    const pa = NP(mu, s, 1400), pb = NP(mu, s, 1000, 1300), tt = mu + s * invPhi(0.05);
    chk(tt, 953.27, 0.01);
    b.struct({
      ...A10, skill: "APPLICATION", calculator: true,
      concepts: [Q("distributions.normal")],
      stem: t`The lifetimes of a brand of light bulb sold in Bulawayo are normally distributed with mean 1200 hours and standard deviation 150 hours.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the probability that a bulb lasts more than 1400 hours, correct to 3 significant figures.", value: pa.exact, tol: pa.tol, wrong: [1 - pa.exact],
          explanation: t`$z = \frac{1400 - 1200}{150} = 1.33$. $P = 1 - ${phiTable(1.33).toFixed(4)} = ${dpStr(1 - phiTable(1.33), 4)}$ (calculator ${sfStr(pa.exact, 3)}).` }),
        P.num({ label: "(b)", marks: 3, stem: "Find the probability that a bulb lasts between 1000 and 1300 hours, correct to 3 significant figures.", value: pb.exact, tol: pb.tol, wrong: [phiTable(0.67) - phiTable(1.33)],
          explanation: t`$z_1 = -1.33$, $z_2 = 0.67$. $P = ${phiTable(0.67).toFixed(4)} - (1 - ${phiTable(1.33).toFixed(4)}) = ${(phiTable(0.67) - 1 + phiTable(1.33)).toFixed(4)}$.` }),
        P.num({ label: "(c)", marks: 3, stem: "The manufacturer wants to state a time t such that only 5% of bulbs fail before t hours. Find t, correct to 3 significant figures.", value: tt, unit: "h", tol: 0.6, answer: sfStr(tt, 3), wrong: [mu + 1.645 * s, mu - 1.96 * s],
          explanation: t`$P(X < t) = 0.05$ gives $z = -1.645$, so $t = 1200 - 1.645 \times 150 = 953.25 \approx 953$ hours.` }),
        P.num({ label: "(d)", marks: 2, stem: "A hotel buys 400 of these bulbs. Estimate how many will last more than 1400 hours.", value: 400 * pa.exact, tol: 0.7, answer: String(Math.round(400 * pa.exact)), wrong: [400 * (1 - pa.exact)],
          explanation: t`$400 \times ${sfStr(pa.exact, 3)} \approx ${(400 * pa.exact).toFixed(1)}$, about 36 or 37 bulbs ($400 \times 0.0918 = 36.7$ with the table value).` }),
      ],
      explanation: "Standardise with σ = 150; use the tables forwards for probabilities and backwards for t; multiply by 400 for an expected number.",
      hints: ["Negative z for the lower 5% tail.", t`$\Phi(1.645) = 0.95$.`],
    });
  }

  // A5: point estimates and a confidence interval
  {
    const n = 40, sx = 1180, sx2 = 35400;
    const xb = sx / n, sxx = sx2 - sx * sx / n;
    chk(xb, 29.5); chk(sxx, 590, 1e-9);
    const sv = sxx / 39, c = ciMean(xb, Math.sqrt(sv), n, 95);
    b.struct({
      ...A10, skill: "APPLICATION", calculator: true,
      concepts: [Q("estimation.point"), Q("estimation.confidence-intervals")],
      stem: t`The lengths, $x$ cm, of a random sample of 40 tilapia from Lake Kariba give $\sum x = 1180$ and $\sum x^2 = 35\,400$.`,
      parts: [
        P.fib({ label: "(a)", marks: 3, stem: "Find unbiased estimates of the population mean and variance, the variance correct to 3 significant figures.", template: "Mean = {{blank:m}} cm; variance = {{blank:v}} cm²",
          blanks: [N("m", xb, "30.3", { tolerance: 0.0005 }), N("v", Number(sfStr(sv, 3)), "14.8", { tolerance: 0.006 })],
          explanation: t`$\bar{x} = \frac{1180}{40} = 29.5$. $35\,400 - \frac{1180^2}{40} = 35\,400 - 34\,810 = 590$; $s^2 = \frac{590}{39} = ${sfStr(sv, 3)}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Estimate the standard error of the mean, correct to 3 significant figures.", value: c.se, unit: "cm", wrong: [Math.sqrt(sv), sv / n],
          explanation: t`$\sqrt{\frac{${sfStr(sv, 4)}}{40}} = ${sfStr(c.se, 3)}$ cm.` }),
        P.fib({ label: "(c)", marks: 3, stem: "Find a 95% confidence interval for the population mean length, giving the end-points to 3 significant figures.", template: "({{blank:a}} cm, {{blank:b}} cm)",
          blanks: [N("a", Number(sfStr(c.lo, 3)), "28.9", { tolerance: 0.05 }), N("b", Number(sfStr(c.hi, 3)), "30.1", { tolerance: 0.05 })],
          explanation: t`$29.5 \pm 1.96 \times ${sfStr(c.se, 4)} = 29.5 \pm ${sfStr(1.96 * c.se, 3)}$, giving $(${sfStr(c.lo, 3)}, ${sfStr(c.hi, 3)})$ cm.` }),
        P.manual({ label: "(d)", marks: 2, stem: "The distribution of the lengths is not known. Explain why the method in (c) is still valid.",
          points: ["The sample is large (n = 40).", "So by the central limit theorem the sample mean is approximately normally distributed (and s is a good estimate of σ)."],
          modelAnswer: "Because n = 40 is large, the central limit theorem says the sample mean is approximately normal whatever the distribution of lengths, and s from such a large sample is a reliable estimate of σ.",
          explanation: "Large sample → central limit theorem." }),
      ],
      explanation: "Estimate μ and σ² from the summary statistics, then use x̄ ± 1.96 s/√n.",
      hints: ["Use n − 1 = 39 for s².", "Standard error = s/√n."],
    });
  }

  // ===================================================================================================================
  // Section C (12 marks)

  // C1: tree diagram with three branches and reverse probabilities
  {
    const pX = 0.5, pY = 0.3, pZ = 0.2, gX = 0.92, gY = 0.85, gZ = 0.75;
    const g = pX * gX + pY * gY + pZ * gZ;
    chk(g, 0.865, 1e-12);
    const zGivenNot = (pZ * (1 - gZ)) / (1 - g), yGivenG = (pY * gY) / g;
    b.struct({
      ...C12, skill: "ANALYSIS", calculator: true,
      concepts: [Q("probability.conditional"), Q("probability.addition-product-rules")],
      stem: "A seed merchant in Chinhoyi buys maize seed from three suppliers: 50% from supplier X, 30% from Y and 20% from Z. Seeds from X, Y and Z germinate with probabilities 0.92, 0.85 and 0.75 respectively. A seed is chosen at random from the merchant's stock.",
      parts: [
        P.num({ label: "(a)", marks: 3, stem: "Find the probability that the seed germinates.", value: g, wrong: [(0.9 + 0.85 + 0.7) / 3],
          explanation: t`$0.5 \times 0.92 + 0.3 \times 0.85 + 0.2 \times 0.75 = 0.46 + 0.255 + 0.15 = 0.865$.` }),
        P.num({ label: "(b)", marks: 3, stem: "Given that the seed does not germinate, find the probability that it came from supplier Z, correct to 3 significant figures.", value: zGivenNot, wrong: [0.3, 0.06],
          explanation: t`$P(Z \cap G') = 0.2 \times 0.25 = 0.05$ and $P(G') = 1 - 0.865 = 0.135$, so $P(Z \mid G') = \frac{0.05}{0.135} = ${sfStr(zGivenNot, 3)}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Given that the seed germinates, find the probability that it came from supplier Y, correct to 3 significant figures.", value: yGivenG, wrong: [0.255, 0.85],
          explanation: t`$\frac{0.3 \times 0.85}{0.865} = \frac{0.255}{0.865} = ${sfStr(yGivenG, 3)}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Two seeds are chosen at random, independently. Find the probability that both germinate, correct to 3 significant figures.", value: g * g, wrong: [2 * g],
          explanation: t`$0.865^2 = ${sfStr(g * g, 3)}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Are the events \"the seed comes from Z\" and \"the seed germinates\" independent? Justify your answer.",
          points: [t`Compares $P(G \mid Z) = 0.75$ with $P(G) = 0.865$.`, "Concludes: not independent, since the probabilities differ (seeds from Z are less likely to germinate)."],
          modelAnswer: t`No. $P(G \mid Z) = 0.75$ but $P(G) = 0.865$; knowing the seed came from Z changes the probability of germination, so the events are not independent.`,
          explanation: t`Independent would need $P(G \mid Z) = P(G)$.` }),
      ],
      explanation: "Draw a three-branch tree; total probability adds the paths; a reverse probability divides one path by the total for the given result.",
      hints: ["Add the three paths that end in 'germinates'.", "P(not germinate) = 1 − P(germinate)."],
    });
  }

  // C2: discrete random variable with two unknowns
  {
    const a = 0.25, bb = 0.2;
    const xs = [0, 1, 2, 3, 4], ps = [0.1, a, 0.3, bb, 0.15];
    chk(ps.reduce((s, x) => s + x), 1, 1e-12);
    const m = xs.reduce((s, x, i) => s + x * ps[i], 0), m2 = xs.reduce((s, x, i) => s + x * x * ps[i], 0);
    chk(m, 2.05, 1e-12); chk(m2, 5.65, 1e-12);
    const v = m2 - m * m;
    chk(v, 1.4475, 1e-12);
    const cond = 0.15 / (0.3 + bb + 0.15);
    b.struct({
      ...C12, skill: "ANALYSIS", calculator: false,
      concepts: [Q("distributions.discrete-random-variables")],
      stem: "The number of punctures, X, that a kombi on a rural route has in a month has the probability distribution below, and E(X) = 2.05.\n\n| $x$ | 0 | 1 | 2 | 3 | 4 |\n|---|---|---|---|---|---|\n| $P(X = x)$ | 0.1 | $a$ | 0.3 | $b$ | 0.15 |",
      parts: [
        P.fib({ label: "(a)", marks: 4, stem: t`Find $a$ and $b$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
          blanks: [N("a", a, "0.2", { tolerance: 0.0005, marks: 2 }), N("b", bb, "0.25", { tolerance: 0.0005, marks: 2 })],
          explanation: t`$\sum P = 1$: $a + b = 0.45$. $E(X) = a + 0.6 + 3b + 0.6 = 2.05$: $a + 3b = 0.85$. Subtracting: $2b = 0.4$, so $b = 0.2$ and $a = 0.25$.` }),
        P.num({ label: "(b)", marks: 3, stem: t`Find $\operatorname{Var}(X)$, correct to 3 significant figures.`, value: v, wrong: [m2 - m, m2],
          explanation: t`$E(X^2) = 0.25 + 4(0.3) + 9(0.2) + 16(0.15) = 0.25 + 1.2 + 1.8 + 2.4 = 5.65$. $\operatorname{Var}(X) = 5.65 - 2.05^2 = 1.4475 \approx 1.45$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find $P(X > E(X))$.`, value: bb + 0.15, wrong: [0.65],
          explanation: t`$E(X) = 2.05$, so $X > 2.05$ means $X = 3$ or $4$: $0.2 + 0.15 = 0.35$.` }),
        P.num({ label: "(d)", marks: 3, stem: t`Find $P(X = 4 \mid X \geq 2)$, correct to 3 significant figures.`, value: cond, wrong: [0.15],
          explanation: t`$P(X \geq 2) = 0.3 + 0.2 + 0.15 = 0.65$. $\frac{0.15}{0.65} = \frac{3}{13} \approx 0.231$.` }),
      ],
      explanation: "Use ΣP = 1 and E(X) for the unknowns; Var(X) = E(X²) − [E(X)]²; divide by the given event for the conditional probability.",
      hints: ["Two unknowns need two equations.", "X > 2.05 means X = 3 or 4."],
    });
  }

  // C3: binomial modelling and least n
  {
    const n = 10, p = 0.25;
    const p3 = binom.pmf(n, p, 3), ge3 = 1 - binom.cdf(n, p, 2);
    let nn = 1;
    while (0.75 ** nn >= 0.01) nn++;
    same(nn, 17);
    chk(0.75 ** 16, 0.01002, 1e-5);
    b.struct({
      ...C12, skill: "APPLICATION", calculator: true,
      concepts: [Q("distributions.binomial")],
      stem: "At a large rural secondary school, one learner in four walks more than 5 km to school. Learners are chosen at random.",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "For a random sample of 10 learners, find the probability that exactly 3 walk more than 5 km, correct to 3 significant figures.", value: p3, wrong: [0.25 ** 3 * 0.75 ** 7],
          explanation: t`$X \sim B(10, 0.25)$. $\binom{10}{3}(0.25)^3(0.75)^7 = 120 \times 0.015625 \times ${(0.75 ** 7).toFixed(5)} = ${sfStr(p3, 3)}$.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find the probability that at least 3 of the 10 walk more than 5 km, correct to 3 significant figures.", value: ge3, wrong: [1 - binom.cdf(n, p, 3), binom.cdf(n, p, 2)],
          explanation: t`$P(X \leq 2) = 0.75^{10} + 10(0.25)(0.75)^9 + 45(0.25)^2(0.75)^8 = ${sfStr(binom.pmf(n, p, 0), 4)} + ${sfStr(binom.pmf(n, p, 1), 4)} + ${sfStr(binom.pmf(n, p, 2), 4)} = ${sfStr(binom.cdf(n, p, 2), 4)}$, so $P(X \geq 3) = ${sfStr(ge3, 3)}$.` }),
        P.fib({ label: "(c)", marks: 2, stem: "Find the mean and the standard deviation of the number of such learners in a sample of 10, the standard deviation correct to 3 significant figures.", template: "Mean = {{blank:m}}; standard deviation = {{blank:s}}",
          blanks: [N("m", 2.5, "1.875", { tolerance: 0.0005 }), N("s", Number(sfStr(Math.sqrt(1.875), 3)), "1.875", { tolerance: 0.006 })],
          explanation: t`Mean $= 10 \times 0.25 = 2.5$; variance $= 2.5 \times 0.75 = 1.875$; standard deviation $= \sqrt{1.875} = ${sfStr(Math.sqrt(1.875), 3)}$.` }),
        P.num({ label: "(d)", marks: 3, stem: "Find the least number of learners that must be chosen for the probability that at least one of them walks more than 5 km to be greater than 0.99.", value: nn, wrong: [16, 4],
          explanation: t`$1 - 0.75^n > 0.99$, so $0.75^n < 0.01$. $0.75^{16} = 0.01002$ (too big), $0.75^{17} = 0.00752$. Least $n = 17$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Give one reason why the binomial model might not be suitable if the 10 learners were all chosen from the same village.",
          points: ["Learners from the same village walk similar distances, so whether one walks more than 5 km is not independent of the others.", "So the probability 0.25 would not apply separately to each learner (it would be nearly 0 or nearly 1 for that village)."],
          modelAnswer: "Learners from one village live at about the same distance from the school, so their outcomes are not independent: if one walks more than 5 km, the others very likely do too, and the probability for each is not 0.25.",
          explanation: "Independence and constant p fail for clustered samples." }),
      ],
      explanation: "Use X ~ B(n, 0.25): the binomial formula, the complement for 'at least', np and npq, and an inequality in n.",
      hints: ["At least 3 = 1 − P(X ≤ 2).", "Solve 0.75ⁿ < 0.01 by trial or logarithms."],
    });
  }

  // C4: continuous random variable
  {
    const k = 1 / I((x) => x * x + 1, 0, 3);
    chk(k, 1 / 12, 1e-12);
    const f = (x) => (x * x + 1) / 12;
    const p2 = I(f, 0, 2), m = I((x) => x * f(x), 0, 3), m2 = I((x) => x * x * f(x), 0, 3);
    chk(p2, 7 / 18, 1e-9); chk(m, 99 / 48, 1e-9); chk(m2, 4.8, 1e-9);
    const v = m2 - m * m;
    chk(v, 4.8 - 2.0625 ** 2, 1e-9);
    b.struct({
      ...C12, skill: "APPLICATION", calculator: false,
      concepts: [Q("distributions.continuous-random-variables")],
      stem: t`The time, $X$ hours, that a borehole pump runs before it needs attention has probability density function $f(x) = k(x^2 + 1)$ for $0 \leq x \leq 3$, and $f(x) = 0$ otherwise.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that $k = \dfrac{1}{12}$.`,
          points: [t`M1 $\int_0^3 k(x^2 + 1)\,dx = k\Big[\frac{x^3}{3} + x\Big]_0^3 = 1$.`, t`A1 $k(9 + 3) = 12k = 1$, so $k = \frac{1}{12}$.`],
          modelAnswer: t`$$
k\Big[\frac{x^3}{3} + x\Big]_0^3 = k(9 + 3) = 12k = 1 \Rightarrow k = \frac{1}{12}
$$`,
          explanation: "The total area under a pdf is 1." }),
        P.num({ label: "(b)", marks: 3, stem: t`Find $P(X < 2)$, as a fraction or correct to 3 significant figures.`, value: p2, wrong: [5 / 12, 2 / 3],
          explanation: t`$\frac{1}{12}\Big[\frac{x^3}{3} + x\Big]_0^2 = \frac{1}{12}\left(\frac{8}{3} + 2\right) = \frac{14}{36} = \frac{7}{18} \approx 0.389$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`Find $E(X)$, correct to 3 significant figures.`, value: m, wrong: [1.5, 1],
          explanation: t`$\frac{1}{12}\int_0^3 (x^3 + x)\,dx = \frac{1}{12}\left(\frac{81}{4} + \frac{9}{2}\right) = \frac{1}{12} \times \frac{99}{4} = \frac{33}{16} = 2.0625 \approx 2.06$ hours.` }),
        P.num({ label: "(d)", marks: 3, stem: t`Find $\operatorname{Var}(X)$, correct to 3 significant figures.`, value: v, wrong: [m2, m2 - m],
          explanation: t`$E(X^2) = \frac{1}{12}\int_0^3 (x^4 + x^2)\,dx = \frac{1}{12}\left(\frac{243}{5} + 9\right) = \frac{1}{12} \times \frac{288}{5} = 4.8$. $\operatorname{Var}(X) = 4.8 - 2.0625^2 = ${sfStr(v, 3)}$.` }),
        P.tf({ label: "(e)", marks: 1, stem: t`$P(X = 2) = f(2) = \frac{5}{12}$.`, answer: false,
          explanation: t`False: for a continuous random variable $P(X = 2) = 0$; $f(2)$ is a density.` }),
      ],
      explanation: "Total area 1 gives k; integrate f for probabilities, x f for E(X) and x² f for E(X²).",
      hints: [t`$\int (x^2 + 1)\,dx = \frac{x^3}{3} + x$.`, t`$\operatorname{Var}(X) = E(X^2) - [E(X)]^2$.`],
    });
  }

  // C5: normal distribution and changing a parameter
  {
    const mu = 15, s = 0.4;
    const pa = NP(mu, s, undefined, 14.5), pb = NP(mu, s, 14.8, 15.6);
    chk(1 - phiTable(1.25), 0.1056, 1e-9); chk(phiTable(1.5) - (1 - phiTable(0.5)), 0.6247, 1e-9);
    const z2 = invPhi(0.98);
    const newMu = 14.5 + z2 * s, newS = 0.5 / z2;
    b.struct({
      ...C12, skill: "ANALYSIS", calculator: true,
      concepts: [Q("distributions.normal"), Q("distributions.normal-parameters")],
      stem: "A machine at a farm in Nyanga fills pockets of potatoes. The masses are normally distributed with mean 15 kg and standard deviation 0.4 kg. Pockets are labelled \"14.5 kg\".",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the probability that a pocket weighs less than 14.5 kg, correct to 3 significant figures.", value: pa.exact, tol: pa.tol, wrong: [1 - pa.exact],
          explanation: t`$z = \frac{14.5 - 15}{0.4} = -1.25$, $P = 1 - 0.8944 = 0.1056$.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find the probability that a pocket weighs between 14.8 kg and 15.6 kg, correct to 3 significant figures.", value: pb.exact, tol: pb.tol, wrong: [0.9332 - 0.6915],
          explanation: t`$z_1 = -0.5$, $z_2 = 1.5$. $P = 0.9332 - (1 - 0.6915) = 0.9332 - 0.3085 = 0.6247$.` }),
        P.num({ label: "(c)", marks: 3, stem: "The standard deviation stays at 0.4 kg. Find the mean the machine should be set to so that only 2% of pockets weigh less than 14.5 kg, correct to 2 decimal places.", value: newMu, unit: "kg", dp: 2, wrong: [14.5 - z2 * s],
          explanation: t`$\Phi(2.054) = 0.98$, so $\frac{14.5 - \mu}{0.4} = -2.054$ and $\mu = 14.5 + 0.8216 = 15.32$ kg.` }),
        P.num({ label: "(d)", marks: 3, stem: "Instead, the mean stays at 15 kg and the machine is made more consistent. Find the standard deviation needed so that only 2% of pockets weigh less than 14.5 kg, correct to 3 significant figures.", value: newS, unit: "kg", tol: 0.001, answer: sfStr(newS, 3), wrong: [0.5 / 1.96],
          explanation: t`$\frac{14.5 - 15}{\sigma} = -2.054$, so $\sigma = \frac{0.5}{2.054} = ${sfStr(newS, 3)}$ kg.` }),
        P.manual({ label: "(e)", marks: 1, stem: "Give one reason why the farm might prefer the change in (d) to the change in (c).",
          points: ["Raising the mean gives away extra potatoes in every pocket (about 0.32 kg each on average), which costs money; reducing the spread keeps the mean at 15 kg."],
          modelAnswer: "Changing the mean to 15.32 kg puts about 0.32 kg more potatoes into every pocket on average, which costs the farm money; making the machine more consistent achieves the same 2% without extra potatoes.",
          explanation: "Compare the cost of each change." }),
      ],
      explanation: "Standardise for probabilities; for a required tail probability, use z from the tables and solve for μ or σ.",
      hints: [t`$\Phi(2.054) = 0.98$.`, "In (c) μ is unknown; in (d) σ is unknown."],
    });
  }

  // C6: both parameters from two tail probabilities
  {
    const z1 = invPhi(0.85), z2 = invPhi(0.2);
    const s = 35 / (z1 - z2), mu = 75 - z1 * s;
    chk(1 - phiTable((75 - mu) / s), 0.15, 0.002);
    const pass = NP(mu, s, 50);
    const passN = 300 * pass.exact;
    b.struct({
      ...C12, skill: "ANALYSIS", calculator: true,
      concepts: [Q("distributions.normal-parameters"), Q("distributions.normal")],
      stem: "The marks in a district mock examination are normally distributed. 15% of candidates scored more than 75 marks and 20% scored fewer than 40 marks.",
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that $\mu + 1.036\sigma = 75$ and $\mu - 0.842\sigma = 40$.`,
          points: [t`B1 $P(X < 75) = 0.85$, $\Phi(1.036) = 0.85$, so $\frac{75 - \mu}{\sigma} = 1.036$.`, t`B1 $\Phi(0.842) = 0.8$, so $\frac{40 - \mu}{\sigma} = -0.842$; both rearranged to the given forms.`],
          modelAnswer: t`$$
\frac{75 - \mu}{\sigma} = 1.036 \Rightarrow \mu + 1.036\sigma = 75
$$

$$
\frac{40 - \mu}{\sigma} = -0.842 \Rightarrow \mu - 0.842\sigma = 40
$$`,
          explanation: "Each tail probability gives one equation." }),
        P.num({ label: "(b)", marks: 3, stem: t`Find $\sigma$, correct to 3 significant figures.`, value: s, tol: 0.06, answer: sfStr(s, 3), wrong: [35 / (z1 + z2)],
          explanation: t`Subtract: $1.878\sigma = 35$, so $\sigma = ${sfStr(s, 3)}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find $\mu$, correct to 3 significant figures.`, value: mu, tol: 0.06, answer: sfStr(mu, 3), wrong: [57.5],
          explanation: t`$\mu = 75 - 1.036 \times ${sfStr(s, 4)} = ${sfStr(mu, 4)} \approx ${sfStr(mu, 3)}$.` }),
        P.num({ label: "(d)", marks: 3, stem: "The pass mark is 50. Find the probability that a candidate chosen at random passes (scores more than 50), correct to 3 significant figures.", value: pass.exact, tol: 0.003, wrong: [1 - pass.exact],
          explanation: t`$z = \frac{50 - ${sfStr(mu, 4)}}{${sfStr(s, 4)}} = ${((50 - mu) / s).toFixed(3)}$. $P(Z > ${((50 - mu) / s).toFixed(2)}) = \Phi(${(-(50 - mu) / s).toFixed(2)}) \approx ${sfStr(pass.exact, 3)}$.` }),
        P.num({ label: "(e)", marks: 2, stem: "300 candidates sat the examination. Estimate how many passed.", value: passN, tol: 1.5, answer: String(Math.round(passN)), wrong: [300 - passN],
          explanation: t`$300 \times ${sfStr(pass.exact, 3)} \approx ${Math.round(passN)}$ candidates.` }),
      ],
      explanation: "Form two equations x = μ + zσ, solve for σ and μ, then standardise the pass mark.",
      hints: [t`$\Phi(1.036) = 0.85$ and $\Phi(0.842) = 0.8$.`, "Subtract the equations to eliminate μ."],
    });
  }

  // C7: stratified sampling, sample mean and the central limit theorem
  {
    const alloc = [400, 320].map((x) => (x / 720) * 45);
    same(alloc, [25, 20]);
    const mu = 2.4, sd = 0.9, n = 45;
    const se = sd / Math.sqrt(n);
    const r = NP(mu, se, 2.6);
    const nNeed = Math.ceil((sd / 0.1) ** 2);
    same(nNeed, 81);
    b.struct({
      ...C12, skill: "APPLICATION", calculator: true,
      concepts: [Q("sampling.methods"), Q("sampling.sample-mean")],
      stem: `A school in Gweru has 720 learners in Forms 3 and 4: 400 in Form 3 and 320 in Form 4. Their daily spending at the tuckshop has mean ${money(2.4)} and standard deviation ${money(0.9)}; the distribution is skewed, because a few learners spend a lot.`,
      parts: [
        P.fib({ label: "(a)", marks: 3, stem: "A stratified sample of 45 learners is chosen, with the forms as strata. How many learners should come from each form?", template: "Form 3: {{blank:a}}; Form 4: {{blank:b}}",
          blanks: [N("a", 25, "22", { marks: 2 }), N("b", 20, "23", { marks: 1 })],
          explanation: t`$\frac{400}{720} \times 45 = 25$ and $\frac{320}{720} \times 45 = 20$.` }),
        P.manual({ label: "(b)", marks: 2, stem: "Give one advantage of a stratified sample over a simple random sample here, and describe how the 25 (or 20) learners in a form would be chosen.",
          points: ["Advantage: both forms are represented in proportion to their size (a simple random sample could, by chance, over-represent one form).", "Within each form: number the learners on the form register and choose the required number using random numbers (ignoring repeats)."],
          modelAnswer: "Stratification guarantees that Forms 3 and 4 appear in the correct proportions. Within each form, number the learners on the register and choose 25 (or 20) of them using random numbers, ignoring repeats and numbers out of range.",
          explanation: "Proportional representation; random selection within strata." }),
        P.manual({ label: "(c)", marks: 2, stem: t`For a random sample of 45 learners, state the approximate distribution of the sample mean daily spending $\bar{X}$, and justify it.`,
          points: [t`$\bar{X} \approx N\left(2.4, \frac{0.9^2}{45}\right) = N(2.4, 0.018)$.`, "Justification: n = 45 is large, so the central limit theorem applies although spending is skewed."],
          modelAnswer: t`$\bar{X} \approx N\left(2.4, \frac{0.81}{45}\right) = N(2.4, 0.018)$, by the central limit theorem, because the sample of 45 is large even though the population is skewed.`,
          explanation: "Mean μ, variance σ²/n, normal by the central limit theorem." }),
        P.num({ label: "(d)", marks: 3, stem: "Find the probability that the mean daily spending of the sample is more than 2.60 dollars, correct to 3 significant figures.", value: r.exact, tol: r.tol, wrong: [1 - phiTable(0.22)],
          explanation: t`Standard error $= \frac{0.9}{\sqrt{45}} = ${sfStr(se, 4)}$. $z = \frac{2.6 - 2.4}{${sfStr(se, 4)}} = ${((0.2) / se).toFixed(2)}$. $P = 1 - \Phi(${((0.2) / se).toFixed(2)}) = ${dpStr(1 - phiTable(0.2 / se), 4)}$ (calculator ${sfStr(r.exact, 3)}).` }),
        P.num({ label: "(e)", marks: 2, stem: "Find the smallest sample size for which the standard error of the mean would be at most 0.10 dollars.", value: nNeed, wrong: [9, 80],
          explanation: t`$\frac{0.9}{\sqrt{n}} \leq 0.1$ gives $\sqrt{n} \geq 9$, so $n \geq 81$.` }),
      ],
      explanation: "Proportional allocation for strata; the central limit theorem for the mean of a large sample; standard error σ/√n.",
      hints: ["Stratum share = stratum size ÷ 720 × 45.", "Standard error = 0.9/√45."],
    });
  }

  // C8: estimation, 99% confidence interval and sample size
  {
    const n = 50, sx = 8610, sx2 = 1494250;
    const xb = sx / n, sxx = sx2 - (sx * sx) / n;
    chk(xb, 172.2); chk(sxx, 11608, 1e-9);
    const sv = sxx / 49, s = Math.sqrt(sv);
    const c = ciMean(xb, s, n, 99);
    const nNeed = Math.ceil(((2 * 2.576 * s) / 5) ** 2);
    b.struct({
      ...C12, skill: "ANALYSIS", calculator: true,
      concepts: [Q("estimation.confidence-intervals"), Q("estimation.point")],
      stem: t`At an agricultural research station, the heights $x$ cm of a random sample of 50 sunflower plants of a new variety give $\sum x = 8610$ and $\sum x^2 = 1\,494\,250$.`,
      parts: [
        P.fib({ label: "(a)", marks: 3, stem: "Find unbiased estimates of the population mean and variance, the variance correct to 4 significant figures.", template: "Mean = {{blank:m}} cm; variance = {{blank:v}} cm²",
          blanks: [N("m", xb, "175.7", { tolerance: 0.0005 }), N("v", Number(sfStr(sv, 4)), "232.2", { tolerance: 0.06, marks: 2 })],
          explanation: t`$\bar{x} = \frac{8610}{50} = 172.2$. $1\,494\,250 - \frac{8610^2}{50} = 1\,494\,250 - 1\,482\,642 = 11\,608$; $s^2 = \frac{11\,608}{49} = ${sfStr(sv, 4)}$.` }),
        P.fib({ label: "(b)", marks: 3, stem: "Find a 99% confidence interval for the population mean height, giving the end-points to 4 significant figures.", template: "({{blank:a}} cm, {{blank:b}} cm)",
          blanks: [N("a", Number(sfStr(c.lo, 4)), "167.9", { tolerance: 0.06 }), N("b", Number(sfStr(c.hi, 4)), "176.5", { tolerance: 0.06 })],
          explanation: t`$s = ${sfStr(s, 4)}$, standard error $= \frac{${sfStr(s, 4)}}{\sqrt{50}} = ${sfStr(c.se, 4)}$, margin $= 2.576 \times ${sfStr(c.se, 4)} = ${sfStr(2.576 * c.se, 3)}$. Interval $(${sfStr(c.lo, 4)}, ${sfStr(c.hi, 4)})$ cm. (1.96 would give the 95% interval.)` }),
        P.manual({ label: "(c)", marks: 2, stem: "The usual variety has a mean height of 165 cm. Does the interval suggest that the new variety grows to a different mean height? Explain.",
          points: [`165 lies below the interval (${sfStr(c.lo, 4)}, ${sfStr(c.hi, 4)}).`, "So there is evidence (at the 1% level) that the new variety's mean height is different, in fact greater than 165 cm."],
          modelAnswer: `Yes. The whole 99% interval (${sfStr(c.lo, 4)}, ${sfStr(c.hi, 4)}) lies above 165 cm, so 165 is not a plausible value for the new variety's mean: the evidence suggests the new variety grows taller on average.`,
          explanation: "Compare the claimed value with the interval." }),
        P.num({ label: "(d)", marks: 3, stem: "Using your estimate of the standard deviation, find the smallest sample size for which a 99% confidence interval for the mean would have width at most 5 cm.", value: nNeed, wrong: [nNeed - 1, Math.ceil(((2 * 1.96 * s) / 5) ** 2)],
          explanation: t`$2 \times 2.576 \times \frac{${sfStr(s, 4)}}{\sqrt{n}} \leq 5$ gives $\sqrt{n} \geq ${((2 * 2.576 * s) / 5).toFixed(3)}$, so $n \geq ${(((2 * 2.576 * s) / 5) ** 2).toFixed(1)}$ and $n = ${nNeed}$.` }),
        P.tf({ label: "(e)", marks: 1, stem: "About 99% of the sunflower plants of the new variety have heights inside the interval found in (b).", answer: false,
          explanation: "False: the interval estimates the mean height; individual heights are spread much more widely (s ≈ 15.4 cm)." }),
      ],
      explanation: "Estimate μ and σ² from the summary statistics, use x̄ ± 2.576 s/√n, compare a claimed value with the interval, and solve 2zs/√n ≤ w for n.",
      hints: ["Use n − 1 = 49 for s².", "99% uses z = 2.576."],
    });
  }
});
