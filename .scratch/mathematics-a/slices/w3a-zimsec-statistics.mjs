// W3a exam-format items for ZIMSEC Statistics: ZS1 ×7 (10 marks, Paper 1), ZS2A ×2 (8, Paper 2 Section A),
// ZS2B ×3 (16, Paper 2 Section B). Every value is computed and checked here.
import { concept, P, t, chk, same, F, sfStr, nCr, fact, binom, geo, grouped, normalProb, invPhi, Phi, phiTable, round, table, ZS } from "../lib.mjs";

const Q = (k) => `amaths.${k}`;
const S3 = (x) => sfStr(x, 3);
const S4 = (x) => sfStr(x, 4);
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const base = (marks, paper) => ({ marks, secs: 90 * marks, examStyle: true, calculator: true, paper });
function perms(a) {
  if (a.length <= 1) return [a];
  const out = [];
  a.forEach((x, i) => { for (const p of perms([...a.slice(0, i), ...a.slice(i + 1)])) out.push([x, ...p]); });
  return out;
}
const ev = (d) => d.reduce((s, [x, p]) => s + x * p, 0);
const ex2 = (d) => d.reduce((s, [x, p]) => s + x * x * p, 0);
const vr = (d) => ex2(d) - ev(d) ** 2;
const ok = (d) => chk(d.reduce((s, [, p]) => s + p, 0), 1, 1e-12);

concept(Q("probability.bayes"), { file: "exam/w3a-zimsec-statistics", keyPrefix: "exam.w3a-zimsec-statistics", applies: ZS }, (b) => {
  // ================================================================ ZS1-1 (10): Bayes' theorem
  const pri = [0.45, 0.35, 0.2], lk = [0.02, 0.05, 0.04];
  const joint = pri.map((p, i) => p * lk[i]);
  const pD = joint.reduce((a, c) => a + c, 0);
  chk(pD, 0.0345);
  const postY = joint[1] / pD;
  const postXnotD = (0.45 * 0.98) / (1 - pD);
  const oneDef = 2 * pD * (1 - pD);
  b.struct({
    d: 4, ...base(10, "Paper 1"), skill: "ANALYSIS",
    concepts: [Q("probability.bayes"), Q("probability.conditional")],
    stem: "A factory in Gweru makes plastic chairs on three machines. Machine X makes 45% of the chairs, machine Y makes 35% and machine Z makes 20%. The percentages of faulty chairs are 2% for X, 5% for Y and 4% for Z.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: t`State Bayes' theorem for events $A_1, A_2, A_3$ and an event $B$, giving the condition on $A_1, A_2, A_3$.`,
        points: [t`$\mathrm{P}(A_j \mid B) = \dfrac{\mathrm{P}(A_j)\,\mathrm{P}(B \mid A_j)}{\sum_{i=1}^{3} \mathrm{P}(A_i)\,\mathrm{P}(B \mid A_i)}$`, t`$A_1, A_2, A_3$ are mutually exclusive and exhaustive (a partition).`],
        modelAnswer: "If A1, A2, A3 are mutually exclusive and exhaustive, then P(Aj | B) = P(Aj)P(B | Aj) / [P(A1)P(B | A1) + P(A2)P(B | A2) + P(A3)P(B | A3)]." }),
      P.num({ label: "(b)", marks: 2, stem: "Find the probability that a chair chosen at random is faulty.", value: pD, wrong: [0.11 / 3],
        explanation: t`$0.45(0.02) + 0.35(0.05) + 0.2(0.04) = 0.009 + 0.0175 + 0.008 = 0.0345$.` }),
      P.num({ label: "(c)", marks: 2, stem: "A chair is found to be faulty. Find the probability that it was made by machine Y, correct to 3 significant figures.", value: postY, wrong: [0.0175],
        explanation: t`$\mathrm{P}(Y \mid F) = \frac{0.0175}{0.0345} = ${S3(postY)}$.` }),
      P.num({ label: "(d)", marks: 2, stem: "A chair is found NOT to be faulty. Find the probability that it was made by machine X, correct to 3 significant figures.", value: postXnotD, wrong: [0.441],
        explanation: t`$\mathrm{P}(X \cap F') = 0.45 \times 0.98 = 0.441$; $\mathrm{P}(F') = 1 - 0.0345 = 0.9655$. $\mathrm{P}(X \mid F') = \frac{0.441}{0.9655} = ${S3(postXnotD)}$.` }),
      P.num({ label: "(e)", marks: 2, stem: "Two chairs are chosen at random. Find the probability that exactly one of them is faulty, correct to 3 significant figures.", value: oneDef, wrong: [Number(S3(pD * (1 - pD)))],
        explanation: t`$2 \times 0.0345 \times 0.9655 = ${S3(oneDef)}$ (either the first or the second is the faulty one).` }),
    ],
    explanation: "Law of total probability for P(faulty), then Bayes' theorem to reverse the conditioning.",
    hints: ["Draw a tree: machine first, then faulty or not.", "The denominator in Bayes' theorem is P(faulty) or P(not faulty)."],
  });

  // ================================================================ ZS1-2 (10): grouped data
  const cls = [[41, 49, 19], [49, 54, 43], [54, 59, 58], [59, 67, 47], [67, 83, 33]];
  const g = grouped(cls);
  chk(g.n, 200);
  const mids = cls.map(([a, c]) => (a + c) / 2);
  const fm = cls.map(([a, c, f]) => ((a + c) / 2) * f);
  const pearson = (3 * (g.mean - g.median)) / g.sd;
  b.struct({
    d: 4, ...base(10, "Paper 1"), skill: "ANALYSIS",
    concepts: [Q("data.mean-sd"), Q("data.location-spread")],
    stem: t`The masses, $m$ grams, of 200 eggs from a poultry project in Marondera are recorded.

${table(["Mass m (g)", "41 ≤ m < 49", "49 ≤ m < 54", "54 ≤ m < 59", "59 ≤ m < 67", "67 ≤ m < 83"], [["Number of eggs", 19, 43, 58, 47, 33]])}`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate an estimate of the mean mass, correct to 3 significant figures.", value: g.mean, wrong: [Number(S3(mids.reduce((a, c) => a + c, 0) / 5))],
        explanation: t`Mid-points ${mids.join(", ")}: $\sum fm = ${fm.join(" + ")} = ${g.sumfx}$; mean $= \frac{${g.sumfx}}{200} = ${S4(g.mean)}$ g. (${S3(mids.reduce((a, c) => a + c, 0) / 5)} averages the mid-points without the frequencies.)` }),
      P.num({ label: "(b)", marks: 3, stem: "Calculate an estimate of the standard deviation of the masses, correct to 3 significant figures.", value: g.sd, wrong: [Number(S3(g.variance))],
        explanation: t`$\sum fm^2 = ${g.sumfx2}$; $\sigma^2 = \frac{${g.sumfx2}}{200} - ${S4(g.mean)}^2 = ${S4(g.variance)}$; $\sigma = ${S3(g.sd)}$ g.` }),
      P.fib({ label: "(c)", marks: 3, stem: "Use linear interpolation to estimate the median and the quartiles (each to 3 significant figures).", template: "lower quartile {{blank:a}} g; median {{blank:b}} g; upper quartile {{blank:c}} g",
        blanks: [D("a", S3(g.q1), 0.05, "51.5", 1), D("b", S3(g.median), 0.05, "56.5", 1), D("c", S3(g.q3), 0.05, "63", 1)],
        explanation: t`Cumulative frequencies ${g.cf.join(", ")}. $Q_1$ (50th) lies in $49 \le m < 54$: $49 + \frac{50 - ${g.cf[0]}}{${cls[1][2]}} \times 5 = ${S3(g.q1)}$. Median (100th): $54 + \frac{100 - ${g.cf[1]}}{${cls[2][2]}} \times 5 = ${S3(g.median)}$. $Q_3$ (150th): $59 + \frac{150 - ${g.cf[2]}}{${cls[3][2]}} \times 8 = ${S3(g.q3)}$.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Calculate Pearson's coefficient of skewness, 3(mean − median)/standard deviation, and interpret it.",
        points: [`Coefficient = 3(${S4(g.mean)} − ${S4(g.median)}) / ${S3(g.sd)} ≈ ${pearson.toFixed(2)}.`, "Positive, so the distribution is positively skewed (a tail of heavy eggs)."],
        modelAnswer: `3(${S4(g.mean)} − ${S4(g.median)}) / ${S4(g.sd)} ≈ ${pearson.toFixed(2)}. It is positive, so the masses are positively skewed: the mean is pulled up by the long upper class of heavy eggs.` }),
    ],
    explanation: "Use class mid-points for the mean and standard deviation, and interpolation on cumulative frequencies for the median and quartiles.",
    hints: ["Class widths differ: use the true mid-points.", "Find the class containing the 50th, 100th and 150th eggs."],
  });
  chk(pearson > 0 ? 1 : 0, 1);

  // ================================================================ ZS1-3 (10): discrete uniform and a distribution with k
  const nU = 10;
  const uni = Array.from({ length: nU }, (_, i) => [i + 1, 1 / nU]);
  chk(ev(uni), 5.5); chk(vr(uni), 8.25);
  const thr = 5.5 + Math.sqrt(8.25);
  const pAbove = uni.filter(([x]) => x > thr).length / nU;
  chk(pAbove, 0.2);
  const dk = [0, 1, 2, 3].map((y) => [y, (y + 1) / 10]); ok(dk);
  chk(ev(dk), 2); chk(vr(dk), 1);
  b.struct({
    d: 3, ...base(10, "Paper 1"), skill: "APPLICATION",
    concepts: [Q("discrete.random-variables")],
    stem: t`A fair spinner has equal sectors numbered $1, 2, \ldots, n$, and $X$ is the score. $\mathrm{E}(X) = 5.5$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find n.", value: nU, wrong: [11],
        explanation: t`$\frac{n + 1}{2} = 5.5$, so $n = 10$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find Var(X).", value: 8.25, wrong: [99],
        explanation: t`$\frac{n^2 - 1}{12} = \frac{99}{12} = 8.25$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the probability that X is more than one standard deviation above the mean.", value: pAbove, wrong: [0.3],
        explanation: t`$5.5 + \sqrt{8.25} = 5.5 + 2.87 = 8.37$, so $X = 9$ or $10$: $\frac{2}{10} = 0.2$.` }),
      P.group({ label: "(d)", stem: t`A second random variable $Y$ has $\mathrm{P}(Y = y) = k(y + 1)$ for $y = 0, 1, 2, 3$.`, parts: [
        P.num({ label: "(i)", marks: 1, stem: "Find k.", value: 0.1, wrong: [1 / 6],
          explanation: t`$k(1 + 2 + 3 + 4) = 1$, so $k = \frac{1}{10}$.` }),
        P.num({ label: "(ii)", marks: 2, stem: "Find E(Y).", value: 2, wrong: [1.5],
          explanation: t`$\mathrm{E}(Y) = \frac{0 + 2 + 6 + 12}{10} = 2$.` }),
        P.num({ label: "(iii)", marks: 2, stem: "Find Var(Y).", value: 1, wrong: [5],
          explanation: t`$\mathrm{E}(Y^2) = \frac{0 + 2 + 12 + 36}{10} = 5$; $\mathrm{Var}(Y) = 5 - 4 = 1$.` }),
      ] }),
    ],
    explanation: "Discrete uniform formulas for X; ΣP = 1 for k, then the moment formulas for Y.",
    hints: ["Mean of the discrete uniform distribution: (n + 1)/2.", "Variance: (n² − 1)/12."],
  });

  // ================================================================ ZS1-4 (10): geometric with variance
  const pg = 0.2;
  const a4 = geo.pmf(pg, 3), b4 = geo.gt(pg, 4);
  const m4 = 1 / pg, v4 = geo.variance(pg), s4 = Math.sqrt(v4);
  chk(m4, 5); chk(v4, 20);
  const lo4 = Math.ceil(m4 - s4), hi4 = Math.floor(m4 + s4); // 1 .. 9
  chk(lo4, 1); chk(hi4, 9);
  const within = geo.cdf(pg, hi4) - geo.cdf(pg, lo4 - 1);
  b.struct({
    d: 4, ...base(10, "Paper 1"), skill: "ANALYSIS",
    concepts: [Q("discrete.geometric")],
    stem: "A borehole pump in a village near Masvingo often fails to start. Each attempt to start it succeeds with probability 0.2, independently. X is the number of attempts up to and including the first success.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find P(X = 3).", value: a4, wrong: [Number((0.8 ** 3 * 0.2).toFixed(4))],
        explanation: t`$0.8^2 \times 0.2 = 0.128$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the probability that more than 4 attempts are needed, correct to 4 decimal places.", value: b4, dp: 4, wrong: [0.512],
        explanation: t`$\mathrm{P}(X > 4) = 0.8^4 = 0.4096$.` }),
      P.fib({ label: "(c)", marks: 3, stem: "Find the mean and the variance of X.", template: "mean {{blank:m}}; variance {{blank:v}}",
        blanks: [D("m", 5, 0, "4", 1), D("v", 20, 0, "4", 2)],
        explanation: t`$\mathrm{E}(X) = \frac{1}{0.2} = 5$; $\mathrm{Var}(X) = \frac{1 - p}{p^2} = \frac{0.8}{0.04} = 20$.` }),
      P.num({ label: "(d)", marks: 3, stem: "Find the probability that X lies within one standard deviation of the mean, correct to 4 decimal places.", value: within, dp: 4, wrong: [Number((geo.cdf(pg, 9) - geo.cdf(pg, 1)).toFixed(4))],
        explanation: t`$\sigma = \sqrt{20} = 4.47$, so $5 - 4.47 < X < 5 + 4.47$ means $1 \le X \le 9$. $\mathrm{P}(X \le 9) = 1 - 0.8^9 = ${within.toFixed(4)}$.` }),
    ],
    explanation: "Geo(0.2): P(X = r) = 0.8^(r−1)(0.2), P(X > r) = 0.8^r, mean 1/p, variance (1 − p)/p².",
    hints: ["The smallest possible value of X is 1.", "Find the integer values between 0.53 and 9.47."],
  });
  chk(a4, 0.128); chk(b4, 0.4096);

  // ================================================================ ZS1-5 (10): binomial and Bernoulli
  const nb = 9, pb = 0.3;
  const b5a = binom.pmf(nb, pb, 2), b5b = binom.cdf(nb, pb, 3);
  b.struct({
    d: 3, ...base(10, "Paper 1"), skill: "APPLICATION",
    concepts: [Q("discrete.binomial")],
    stem: "At a clinic in Chinhoyi, 30% of patients arrive by bicycle. On a particular morning 9 patients arrive, independently of each other. X is the number who arrive by bicycle.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State two conditions needed for X to have a binomial distribution, in the context of the question.",
        points: ["A fixed number of patients (9), each either arriving by bicycle or not.", "Patients choose independently, each with the same probability 0.3 of arriving by bicycle."],
        modelAnswer: "There is a fixed number, 9, of patients, each of whom either arrives by bicycle or does not; and each patient arrives by bicycle independently of the others with the same probability, 0.3." }),
      P.num({ label: "(b)", marks: 2, stem: "Find P(X = 2), correct to 4 decimal places.", value: b5a, dp: 4, wrong: [Number((0.3 ** 2 * 0.7 ** 7).toFixed(4))],
        explanation: t`${"$"}{}^9C_2(0.3)^2(0.7)^7 = 36 \times 0.09 \times ${S4(0.7 ** 7)} = ${b5a.toFixed(4)}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find P(X ≤ 3), correct to 4 decimal places.", value: b5b, dp: 4, wrong: [Number(binom.cdf(nb, pb, 2).toFixed(4))],
        explanation: t`$\mathrm{P}(0) + \mathrm{P}(1) + \mathrm{P}(2) + \mathrm{P}(3) = ${[0, 1, 2, 3].map((r) => binom.pmf(nb, pb, r).toFixed(4)).join(" + ")} = ${b5b.toFixed(4)}$.` }),
      P.fib({ label: "(d)", marks: 2, stem: "Find the mean and the variance of X.", template: "mean {{blank:m}}; variance {{blank:v}}",
        blanks: [D("m", 2.7, 0.0005, "3", 1), D("v", 1.89, 0.0005, "0.81", 1)],
        explanation: t`$np = 9 \times 0.3 = 2.7$; $np(1 - p) = 2.7 \times 0.7 = 1.89$.` }),
      P.fib({ label: "(e)", marks: 2, stem: "Y = 1 if the next patient arrives by bicycle and Y = 0 otherwise. State the distribution of Y and find its variance.", template: "distribution {{blank:d}}; variance {{blank:v}}",
        blanks: [{ id: "d", accepted: ["Bernoulli", "Bernoulli(0.3)", "B(1,0.3)", "Bernoulli distribution"], wrong: "Poisson", marks: 1 }, D("v", 0.21, 0.0005, "0.09", 1)],
        explanation: t`$Y$ is Bernoulli with $p = 0.3$ (that is, $\mathrm{B}(1, 0.3)$); its variance is $p(1 - p) = 0.21$.` }),
    ],
    explanation: "Binomial probabilities from the formula; mean np and variance np(1 − p); one trial is a Bernoulli variable.",
    hints: ["X ~ B(9, 0.3).", "A Bernoulli variable is a binomial with n = 1."],
  });
  chk(binom.mean(9, 0.3), 2.7); chk(binom.variance(9, 0.3), 1.89);

  // ================================================================ ZS1-6 (10): normal forwards and backwards
  const mu6 = 68, sd6 = 9;
  const a6 = normalProb(mu6, sd6, 80, Infinity), b6 = normalProb(mu6, sd6, 56, 74);
  const c6 = mu6 + sd6 * invPhi(0.95), c6t = mu6 + sd6 * 1.645;
  b.struct({
    d: 3, ...base(10, "Paper 1"), skill: "APPLICATION",
    concepts: [Q("normal.probabilities"), Q("normal.inverse-parameters")],
    stem: "The times taken by a kombi to travel from Mbare to Chitungwiza are normally distributed with mean 68 minutes and standard deviation 9 minutes.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the probability that a journey takes more than 80 minutes, correct to 4 decimal places.", value: a6.exact, tol: a6.tol, wrong: [Number((1 - a6.exact).toFixed(4))],
        explanation: t`$z = \frac{80 - 68}{9} = 1.333$; $1 - \Phi(1.333) = 1 - ${phiTable(4 / 3).toFixed(4)} = ${(1 - phiTable(4 / 3)).toFixed(4)}$ (calculator ${S4(a6.exact)}).` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the probability that a journey takes between 56 and 74 minutes, correct to 4 decimal places.", value: b6.exact, tol: b6.tol, wrong: [Number((Phi(2 / 3) - Phi(4 / 3)).toFixed(4))],
        explanation: t`$z_1 = \frac{56 - 68}{9} = -1.333$, $z_2 = \frac{74 - 68}{9} = 0.667$. $\Phi(0.667) - (1 - \Phi(1.333)) = ${phiTable(2 / 3).toFixed(4)} - ${(1 - phiTable(4 / 3)).toFixed(4)} = ${(phiTable(2 / 3) - 1 + phiTable(4 / 3)).toFixed(4)}$.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the time exceeded by only 5% of journeys, correct to 3 significant figures.", value: c6, tol: Math.abs(c6 - c6t) + 0.05, unit: "min", wrong: [Number(S3(mu6 - sd6 * 1.645))],
        explanation: t`$\frac{t - 68}{9} = 1.645$, so $t = 68 + 9 \times 1.645 = ${S3(c6)}$ minutes.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Sketch the distribution of journey times, marking the mean and the region found in (c).",
        points: ["Symmetrical bell-shaped curve with its peak at 68 minutes marked on the time axis.", `Upper tail beyond about ${S3(c6)} minutes shaded and labelled 5%.`],
        modelAnswer: `A bell curve centred at 68 minutes, symmetrical, approaching the axis at both ends; the region to the right of ${S3(c6)} minutes is shaded and labelled 0.05.` }),
    ],
    explanation: "Standardise for probabilities; use the inverse value 1.645 for the top 5%.",
    hints: ["σ = 9.", "Φ(1.645) = 0.95."],
  });

  // ================================================================ ZS1-7 (10): addition rule, conditional, independence
  const pA = 0.45, pB7 = 0.4, pU = 0.67;
  const pAB = pA + pB7 - pU;
  chk(pAB, 0.18); chk(pA * pB7, 0.18);
  b.struct({
    d: 3, ...base(10, "Paper 1"), calculator: false, skill: "APPLICATION",
    concepts: [Q("probability.events-rules"), Q("probability.conditional")],
    stem: t`At a school in Kadoma, a learner is chosen at random. Event $A$ is "the learner plays chess" and event $B$ is "the learner sings in the choir". $\mathrm{P}(A) = 0.45$, $\mathrm{P}(B) = 0.4$ and $\mathrm{P}(A \cup B) = 0.67$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: t`Find $\mathrm{P}(A \cap B)$.`, value: pAB, wrong: [0.22],
        explanation: t`$\mathrm{P}(A \cap B) = 0.45 + 0.4 - 0.67 = 0.18$.` }),
      P.num({ label: "(b)", marks: 2, stem: t`Find $\mathrm{P}(A \mid B)$.`, value: pAB / pB7, wrong: [0.4],
        explanation: t`$\frac{0.18}{0.4} = 0.45$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Determine whether A and B are independent, giving a reason.",
        points: [t`Compares $\mathrm{P}(A)\,\mathrm{P}(B) = 0.45 \times 0.4 = 0.18$ with $\mathrm{P}(A \cap B) = 0.18$ (or $\mathrm{P}(A \mid B) = 0.45 = \mathrm{P}(A)$).`, "Concludes A and B are independent."],
        modelAnswer: "P(A)P(B) = 0.45 × 0.4 = 0.18 = P(A ∩ B), so A and B are independent (equivalently P(A | B) = 0.45 = P(A))." }),
      P.num({ label: "(d)", marks: 2, stem: t`Find $\mathrm{P}(A' \cap B)$, the probability that the learner sings in the choir but does not play chess.`, value: pB7 - pAB, wrong: [0.4 * 0.45],
        explanation: t`$\mathrm{P}(B) - \mathrm{P}(A \cap B) = 0.4 - 0.18 = 0.22$.` }),
      P.num({ label: "(e)", marks: 2, stem: "Find the probability that the learner does exactly one of the two activities.", value: pU - pAB, wrong: [0.67],
        explanation: t`$\mathrm{P}(A \cup B) - \mathrm{P}(A \cap B) = 0.67 - 0.18 = 0.49$.` }),
    ],
    explanation: "Use the general addition rule to find the overlap; everything else follows from a Venn diagram.",
    hints: ["Draw a Venn diagram once you know P(A ∩ B).", "Regions: A only 0.27, both 0.18, B only 0.22, neither 0.33."],
  });
  chk(pA - pAB + (pB7 - pAB), 0.49); chk(1 - pU, 0.33);

  // ================================================================ ZS2A-1 (8): arrangements of CHINHOYI
  const w = [..."CHINHOYI"];
  const arr = [...new Set(perms(w).map((p) => p.join("")))];
  chk(arr.length, fact(8) / 4);
  const startEnd = arr.filter((s) => s[0] === "H" && s[7] === "I").length;
  chk(startEnd, fact(6));
  const hApart = arr.filter((s) => !s.includes("HH")).length;
  chk(hApart, fact(8) / 4 - fact(7) / 2);
  const pHApart = hApart / arr.length;
  b.struct({
    d: 3, ...base(8, "Paper 2"), calculator: false, skill: "APPLICATION",
    concepts: [Q("counting.permutations"), Q("probability.events-rules")],
    stem: "The eight letters of the word CHINHOYI are to be arranged in a line.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the number of different arrangements.", value: arr.length, wrong: [fact(8) / 2],
        explanation: t`H and I each appear twice: $\frac{8!}{2!\,2!} = \frac{40\,320}{4} = 10\,080$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the number of arrangements that begin with H and end with I.", value: startEnd, wrong: [fact(6) / 4],
        explanation: t`With one H at the start and one I at the end, the middle six letters C, I, N, H, O, Y are all different: $6! = 720$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the number of arrangements in which the two H's are not next to each other.", value: hApart, wrong: [fact(7) / 2],
        explanation: t`H's together: treat HH as one item: $\frac{7!}{2!} = 2520$ (I is still repeated). Not together: $10\,080 - 2520 = 7560$.` }),
      P.num({ label: "(d)", marks: 2, stem: "An arrangement is chosen at random. Find the probability that the two H's are not next to each other.", value: pHApart, wrong: [0.25],
        explanation: t`$\frac{7560}{10\,080} = \frac{3}{4}$.` }),
    ],
    explanation: "Divide by the factorial of each repeated letter; count 'not together' as total minus 'together'.",
    hints: ["Two letters are repeated.", "Not together = total − together."],
  });
  chk(pHApart, 0.75);

  // ================================================================ ZS2A-2 (8): cumulative frequency and box plot
  const cf = [[20, 0], [30, 16], [40, 46], [50, 98], [60, 139], [75, 160]];
  // ages of 100 visitors to Great Zimbabwe ruins on one day (boundaries); interpolate on cumulative frequency
  const interp = (pos) => { for (let i = 1; i < cf.length; i++) if (cf[i][1] >= pos) { const [x0, c0] = cf[i - 1], [x1, c1] = cf[i]; return x0 + ((pos - c0) / (c1 - c0)) * (x1 - x0); } return NaN; };
  const med = interp(80), q1 = interp(40), q3 = interp(120), iqr = q3 - q1;
  const under33 = 16 + ((34 - 30) / 10) * 30;
  chk(under33, 28);
  b.struct({
    d: 3, ...base(8, "Paper 2"), skill: "APPLICATION",
    concepts: [Q("data.histograms-cumulative"), Q("data.location-spread")],
    stem: t`The ages, in years, of 160 adult visitors to the Great Zimbabwe monument on one day are summarised in the cumulative frequency table.

${table(["Age less than (years)", 20, 30, 40, 50, 60, 75], [["Cumulative frequency", 0, 16, 46, 98, 139, 160]])}`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Estimate the median and the quartiles by linear interpolation (each to 3 significant figures).", template: "lower quartile {{blank:a}}; median {{blank:b}}; upper quartile {{blank:c}}",
        blanks: [D("a", S3(q1), 0.05, "40", 1), D("b", S3(med), 0.05, "80", 1), D("c", S3(q3), 0.05, "120", 1)],
        explanation: t`$Q_1$ (40th): $30 + \frac{40 - 16}{30} \times 10 = ${S3(q1)}$. Median (80th): $40 + \frac{80 - 46}{52} \times 10 = ${S3(med)}$. $Q_3$ (120th): $50 + \frac{120 - 98}{41} \times 10 = ${S3(q3)}$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Find the interquartile range, correct to 3 significant figures.", value: iqr, wrong: [Number(S3(q3 - med))],
        explanation: t`$${S4(q3)} - ${S4(q1)} = ${S3(iqr)}$ years.` }),
      P.num({ label: "(c)", marks: 2, stem: "Estimate the number of visitors aged under 34.", value: under33, wrong: [132],
        explanation: t`Cumulative frequency at 34: $16 + \frac{4}{10} \times 30 = 28$, so about 28 visitors. (132 is the number aged 34 or over.)` }),
      P.manual({ label: "(d)", marks: 2, stem: "The youngest visitor was 25 and the oldest 74. Describe a box plot of the ages, and say whether the oldest visitor is an outlier using the rule 'more than 1.5 × IQR above the upper quartile'.",
        points: [`Box plot: whiskers from 25 to 74, box from about ${S3(q1)} to ${S3(q3)} with the median line at about ${S3(med)}.`, `Upper fence ${S3(q3)} + 1.5 × ${S3(iqr)} ≈ ${S3(q3 + 1.5 * iqr)} > 74, so 74 is not an outlier.`],
        modelAnswer: `The box runs from Q1 ≈ ${S3(q1)} to Q3 ≈ ${S3(q3)} with the median at ≈ ${S3(med)}; the whiskers reach 25 and 74. Q3 + 1.5 × IQR ≈ ${S3(q3)} + ${S3(1.5 * iqr)} = ${S3(q3 + 1.5 * iqr)}, which is above 74, so the oldest visitor is not an outlier.` }),
    ],
    explanation: "Interpolate within the class that contains each required position on the cumulative frequency scale.",
    hints: ["The 40th, 80th and 120th visitors give Q1, the median and Q3."],
  });

  // ================================================================ ZS2B-1 (16): screening test, Bayes and hence
  const prev = 0.06, sens = 0.92, fpos = 0.07;
  const pPos = prev * sens + (1 - prev) * fpos;
  const ppv = (prev * sens) / pPos;
  const npv = ((1 - prev) * (1 - fpos)) / (1 - pPos);
  // second independent test after a positive
  const pPos2 = ppv * sens + (1 - ppv) * fpos;
  const ppv2 = (ppv * sens) / pPos2;
  chk(ppv2, (prev * sens * sens) / (prev * sens * sens + (1 - prev) * fpos * fpos), 1e-12);
  b.struct({
    d: 5, ...base(16, "Paper 2"), skill: "ANALYSIS",
    concepts: [Q("probability.bayes"), Q("probability.conditional")],
    stem: "In a district of Matabeleland South, 6% of cattle carry a certain disease. A blood test gives a positive result for 92% of cattle that carry the disease and for 7% of cattle that do not. Repeated tests on the same animal are independent given whether it carries the disease. Give answers correct to 4 decimal places.",
    parts: [
      P.num({ label: "(a)", marks: 3, stem: "Find the probability that a randomly chosen animal tests positive.", value: pPos, dp: 4, wrong: [0.0552],
        explanation: t`$0.06 \times 0.92 + 0.94 \times 0.07 = 0.0552 + 0.0658 = 0.121$.` }),
      P.num({ label: "(b)", marks: 3, stem: "An animal tests positive. Find the probability that it carries the disease.", value: ppv, dp: 4, wrong: [0.92],
        explanation: t`$\frac{0.0552}{0.121} = ${ppv.toFixed(4)}$.` }),
      P.num({ label: "(c)", marks: 3, stem: "An animal tests negative. Find the probability that it does not carry the disease.", value: npv, dp: 4, wrong: [0.93],
        explanation: t`$\mathrm{P}(D' \cap -) = 0.94 \times 0.93 = 0.8742$; $\mathrm{P}(-) = 1 - 0.121 = 0.879$. $\frac{0.8742}{0.879} = ${npv.toFixed(4)}$.` }),
      P.num({ label: "(d)", marks: 4, stem: "An animal that tested positive is tested a second time and again tests positive. Hence, using your answer to (b) as the new prior probability, find the probability that it carries the disease.", value: ppv2, dp: 4, wrong: [Number(ppv.toFixed(4))],
        explanation: t`Prior $${ppv.toFixed(4)}$: $\mathrm{P}(+) = ${ppv.toFixed(4)} \times 0.92 + ${(1 - ppv).toFixed(4)} \times 0.07 = ${pPos2.toFixed(4)}$; posterior $= \frac{${(ppv * sens).toFixed(4)}}{${pPos2.toFixed(4)}} = ${ppv2.toFixed(4)}$. (The same as $\frac{0.06 \times 0.92^2}{0.06 \times 0.92^2 + 0.94 \times 0.07^2}$.)` }),
      P.manual({ label: "(e)", marks: 3, stem: "Comment on the usefulness of a single positive test, and explain why the second test changes the conclusion so much.",
        points: [`After one positive test the probability of disease is only about ${ppv.toFixed(2)}, so many positives are false.`, "This is because the disease is uncommon, so false positives from the 94% healthy cattle are numerous.", `A second independent positive multiplies the evidence: the probability rises to about ${ppv2.toFixed(2)}, so a confirmatory test is sensible.`],
        modelAnswer: `A single positive test only raises the probability of disease from 0.06 to about ${ppv.toFixed(2)}: more than half the positives come from healthy cattle, because healthy animals are so numerous that their 7% false-positive rate outweighs the true positives. A second positive is much less likely for a healthy animal (0.07² ≈ 0.005) than for a diseased one (0.92² ≈ 0.85), so the probability rises to about ${ppv2.toFixed(2)}.` }),
    ],
    explanation: "Law of total probability, Bayes' theorem, then Bayes again with the updated prior.",
    hints: ["Draw a tree: disease or not, then positive or negative.", "For (d), replace 0.06 by your answer to (b)."],
  });
  chk(pPos, 0.121);

  // ================================================================ ZS2B-2 (16): normal, find sigma, hence binomial
  const mu8 = 500;
  const sg8 = 12 / invPhi(0.97); // P(X < 488) = 0.03
  const sg8t = 12 / round(invPhi(0.97), 3);
  const pOver = normalProb(mu8, sg8, 515, Infinity);
  const pOverT = 1 - phiTable(15 / sg8t);
  const pAtLeast2 = 1 - binom.cdf(10, pOver.exact, 1);
  const pAtLeast2T = 1 - binom.cdf(10, pOverT, 1);
  const newMu = 488 + sg8 * invPhi(0.995);
  b.struct({
    d: 5, ...base(16, "Paper 2"), skill: "ANALYSIS",
    concepts: [Q("normal.inverse-parameters"), Q("normal.probabilities"), Q("discrete.binomial")],
    stem: "A machine at a mill in Gweru fills packets of mealie-meal. The masses of the contents are normally distributed with mean 500 g and standard deviation σ g. 3% of packets contain less than 488 g.",
    parts: [
      P.num({ label: "(a)", marks: 3, stem: "Find σ, correct to 3 significant figures.", value: sg8, tol: Math.abs(sg8 - sg8t) + 0.005, wrong: [Number(S3(12 / 0.97))],
        explanation: t`$\frac{488 - 500}{\sigma} = -${round(invPhi(0.97), 3)}$, so $\sigma = \frac{12}{${round(invPhi(0.97), 3)}} = ${S3(sg8)}$.` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the probability that a packet contains more than 515 g, correct to 4 decimal places.", value: pOver.exact, tol: Math.abs(pOver.exact - pOverT) + 0.0005, wrong: [Number((1 - pOver.exact).toFixed(4))],
        explanation: t`$z = \frac{515 - 500}{${S3(sg8)}} = ${(15 / sg8).toFixed(3)}$; $1 - \Phi(${(15 / sg8).toFixed(2)}) = ${pOverT.toFixed(4)}$ (calculator ${pOver.exact.toFixed(4)}).` }),
      P.num({ label: "(c)", marks: 4, stem: "Hence find the probability that, in a random sample of 10 packets, at least 2 contain more than 515 g. Give your answer correct to 4 decimal places.", value: pAtLeast2, tol: Math.abs(pAtLeast2 - pAtLeast2T) + 0.0005, wrong: [Number(binom.pmf(10, pOver.exact, 2).toFixed(4))],
        explanation: t`$Y \sim \mathrm{B}(10, p)$ with $p = ${pOver.exact.toFixed(4)}$. $\mathrm{P}(Y \ge 2) = 1 - (1 - p)^{10} - 10p(1 - p)^9 = ${pAtLeast2.toFixed(4)}$.` }),
      P.num({ label: "(d)", marks: 4, stem: "The mean is now adjusted, with σ unchanged, so that only 0.5% of packets contain less than 488 g. Find the new mean, correct to 4 significant figures.", value: newMu, answer: sfStr(newMu, 4), tol: Math.abs(newMu - (488 + sg8t * 2.576)) + 0.05, wrong: [Number(sfStr(488 - sg8 * invPhi(0.995), 4))],
        explanation: t`$\frac{488 - \mu}{${S3(sg8)}} = -2.576$, so $\mu = 488 + 2.576 \times ${S4(sg8)} = ${sfStr(newMu, 4)}$ g.` }),
      P.manual({ label: "(e)", marks: 2, stem: "State one assumption needed for the binomial model in (c).",
        points: ["The masses of different packets are independent (and each packet has the same probability of exceeding 515 g).", "The assumption is stated in the context of packets."],
        modelAnswer: "Whether one packet contains more than 515 g is independent of the others, and the probability is the same (≈ " + pOver.exact.toFixed(3) + ") for every packet." }),
    ],
    explanation: "Find σ from the given percentage, use the normal model to get p, then a binomial model for the sample; finally adjust μ with σ fixed.",
    hints: ["488 is below the mean: z is negative.", "In (c) each packet is a trial with success probability from (b)."],
  });

  // ================================================================ ZS2B-3 (16): a game: distribution, mean, variance, hence profit
  // A player throws a fair die up to 3 times, stopping when a six appears. Pays US$1. Wins US$4 if six on throw 1, US$2 on throw 2, US$1 on throw 3, nothing otherwise.
  const q6 = 5 / 6, p6 = 1 / 6;
  const probs = [p6, q6 * p6, q6 * q6 * p6, q6 ** 3];
  ok(probs.map((p) => [0, p]));
  same(probs.map((p) => F(Math.round(p * 216), 216).s), ["1/6", "5/36", "25/216", "125/216"]);
  const gain = [[3, probs[0]], [1, probs[1]], [0, probs[2]], [-1, probs[3]]];
  const eG = ev(gain), vG = vr(gain);
  chk(eG, (108 + 30 + 0 - 125) / 216);
  // number of throws T: 1, 2, 3
  const thrT = [[1, p6], [2, q6 * p6], [3, q6 * q6]]; ok(thrT);
  const eT = ev(thrT);
  chk(eT, 1 + q6 + q6 * q6);
  b.struct({
    d: 4, ...base(16, "Paper 2"), skill: "ANALYSIS",
    concepts: [Q("discrete.random-variables"), Q("discrete.geometric")],
    stem: t`At a school fête in Harare, a player pays US\$1 to play a game. The player throws a fair die up to three times, stopping as soon as a six appears. The prize is US\$4 for a six on the first throw, US\$2 for a six on the second throw, US\$1 for a six on the third throw, and nothing if no six appears. G is the player's gain in dollars (prize minus the US\$1 paid).`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: "Complete the probability distribution of G, giving each probability as a fraction.", template: "P(G = 3) = {{blank:a}}; P(G = 1) = {{blank:b}}; P(G = 0) = {{blank:c}}; P(G = −1) = {{blank:d}}",
        blanks: [D("a", "1/6", 0.0005, "1/4"), D("b", "5/36", 0.0005, "1/6"), D("c", "25/216", 0.0005, "1/6"), D("d", "125/216", 0.0005, "1/2")],
        explanation: t`Six first: $\frac{1}{6}$. Six on the 2nd throw: $\frac{5}{6} \times \frac{1}{6} = \frac{5}{36}$. On the 3rd: $\left(\frac{5}{6}\right)^2 \frac{1}{6} = \frac{25}{216}$. No six: $\left(\frac{5}{6}\right)^3 = \frac{125}{216}$. Gains: $4 - 1 = 3$, $2 - 1 = 1$, $1 - 1 = 0$, $-1$.` }),
      P.num({ label: "(b)", marks: 3, stem: "Find E(G) in dollars, correct to 3 significant figures.", value: eG, wrong: [Number(S3(eG + 1))],
        explanation: t`$\mathrm{E}(G) = 3 \times \frac{36}{216} + 1 \times \frac{30}{216} + 0 - 1 \times \frac{125}{216} = \frac{108 + 30 - 125}{216} = \frac{13}{216} \approx ${S3(eG)}$. It is positive, so on average the player gains about 6 cents per game: the game slightly favours the player.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find Var(G), correct to 3 significant figures.", value: vG, wrong: [Number(S3(ex2(gain)))],
        explanation: t`$\mathrm{E}(G^2) = 9 \times \frac{36}{216} + 1 \times \frac{30}{216} + 0 + 1 \times \frac{125}{216} = \frac{324 + 30 + 125}{216} = \frac{479}{216}$. $\mathrm{Var}(G) = \frac{479}{216} - \left(\frac{13}{216}\right)^2 = ${S3(vG)}$.` }),
      P.num({ label: "(d)", marks: 3, stem: "Find the expected number of throws made in one game, correct to 3 significant figures.", value: eT, wrong: [6],
        explanation: t`$T = 1, 2, 3$ with probabilities $\frac{1}{6}$, $\frac{5}{36}$ and $\left(\frac{5}{6}\right)^2 = \frac{25}{36}$ (the third throw is made whether or not it is a six). $\mathrm{E}(T) = \frac{6 + 10 + 75}{36} = \frac{91}{36} \approx ${S3(eT)}$. (6 is the mean of $\mathrm{Geo}(\frac{1}{6})$, which ignores the limit of three throws.)` }),
      P.num({ label: "(e)", marks: 3, stem: "The fête organisers expect 432 games to be played. Hence find the expected total profit (or loss) for the organisers, in dollars.", value: -432 * eG, wrong: [432 * eG],
        explanation: t`The organisers gain $-G$ per game: $432 \times \left(-\frac{13}{216}\right) = -26$, an expected loss of US\$26. They should lower the prizes.` }),
    ],
    explanation: "Build the distribution from the stopping rule; the expected gain per game, times the number of games, gives the organisers' expected result.",
    hints: ["The game stops at the first six, so the probabilities follow the geometric pattern.", "Gain = prize − 1."],
  });
  chk(-432 * eG, -26);
});
