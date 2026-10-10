// W3a exam-format items for Cambridge 9709 Paper 5: C5s ×4 (6 marks), C5l ×5 (8 marks). Every value is computed here.
import { concept, P, t, chk, same, F, sfStr, nCr, fact, binom, geo, grouped, normalProb, invPhi, Phi, phiTable, round, table, CAM } from "../lib.mjs";

const Q = (k) => `amaths.${k}`;
const S3 = (x) => sfStr(x, 3);
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const base = (marks) => ({ marks, secs: 90 * marks, examStyle: true, calculator: true, paper: "Paper 5" });
function perms(a) {
  if (a.length <= 1) return [a];
  const out = [];
  a.forEach((x, i) => { for (const p of perms([...a.slice(0, i), ...a.slice(i + 1)])) out.push([x, ...p]); });
  return out;
}
const ev = (d) => d.reduce((s, [x, p]) => s + x * p, 0);
const vr = (d) => d.reduce((s, [x, p]) => s + x * x * p, 0) - ev(d) ** 2;

concept(Q("data.mean-sd"), { file: "exam/w3a-cambridge", keyPrefix: "exam.w3a-cambridge", applies: CAM }, (b) => {
  // ---------------------------------------------------------------- C5s-1 (6): coded data, combined mean and sd
  // Group A: 20 learners, Σ(x − 50) = 64, Σ(x − 50)² = 1004. Group B: 30 learners, mean 52.5, sd 4.
  const nA = 20, sA = 64, ssA = 1004;
  const mA = 50 + sA / nA, vA = ssA / nA - (sA / nA) ** 2;
  chk(mA, 53.2); chk(vA, 39.96);
  const nB = 30, mB = 52.5, sdB = 4;
  const sumA = nA * mA, sumxxA = nA * (vA + mA * mA), sumB = nB * mB, sumxxB = nB * (sdB ** 2 + mB ** 2);
  const mAll = (sumA + sumB) / 50, vAll = (sumxxA + sumxxB) / 50 - mAll ** 2;
  chk(mAll, 52.78);
  b.struct({
    d: 3, ...base(6), skill: "APPLICATION",
    concepts: [Q("data.mean-sd")],
    stem: t`The times, $x$ minutes, taken by 20 learners in group A at a school in Kwekwe to complete a puzzle are summarised by $\sum (x - 50) = 64$ and $\sum (x - 50)^2 = 1004$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the mean and the standard deviation of the times for group A (standard deviation to 3 significant figures).", template: "mean {{blank:m}} minutes; standard deviation {{blank:s}} minutes",
        blanks: [D("m", 53.2, 0.005, "3.2", 1), D("s", S3(Math.sqrt(vA)), 0.005, S3(Math.sqrt(ssA / nA)), 2)],
        explanation: t`$\bar{x} = 50 + \frac{64}{20} = 53.2$. $\sigma^2 = \frac{1004}{20} - 3.2^2 = 50.2 - 10.24 = 39.96$, so $\sigma = ${S3(Math.sqrt(vA))}$. ($${S3(Math.sqrt(ssA / nA))}$ forgets to subtract $3.2^2$.)` }),
      P.num({ label: "(b)", marks: 1, stem: "The 30 learners in group B have mean time 52.5 minutes and standard deviation 4 minutes. Find the mean time of all 50 learners, correct to 3 significant figures.", value: mAll, wrong: [(mA + mB) / 2],
        explanation: t`$\sum x = 20 \times 53.2 + 30 \times 52.5 = 1064 + 1575 = 2639$; mean $= \frac{2639}{50} = 52.78$. ($${(mA + mB) / 2}$ averages the two means without weighting.)` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the standard deviation of the times of all 50 learners, correct to 3 significant figures.", value: Math.sqrt(vAll), wrong: [Number(S3((Math.sqrt(vA) + 4) / 2))],
        explanation: t`$\sum x^2$: group A $20(39.96 + 53.2^2) = ${round(sumxxA, 4)}$; group B $30(16 + 52.5^2) = ${round(sumxxB, 4)}$. Total ${round(sumxxA + sumxxB, 4)}. $\sigma^2 = \frac{${round(sumxxA + sumxxB, 4)}}{50} - 52.78^2 = ${sfStr(vAll, 4)}$, $\sigma = ${S3(Math.sqrt(vAll))}$.` }),
    ],
    explanation: "Decode the summary for group A, then rebuild Σx and Σx² for each group and combine.",
    hints: ["x̄ = 50 + Σ(x − 50)/n.", "Σx² = n(σ² + x̄²) for each group."],
  });

  // ---------------------------------------------------------------- C5s-2 (6): arrangements and selections
  const word = [..."BULAWAYO"];
  const arr = [...new Set(perms(word).map((p) => p.join("")))];
  chk(arr.length, fact(8) / 2);
  const vowTog = arr.filter((w) => { const idx = [...w].map((c, i) => ("UAO".includes(c) ? i : -1)).filter((i) => i >= 0); return idx[3] - idx[0] === 3; }).length;
  chk(vowTog, fact(5) * (fact(4) / 2));
  const team = nCr(4, 2) * nCr(6, 3) + nCr(4, 3) * nCr(6, 2) + nCr(4, 4) * nCr(6, 1);
  chk(team, 186); chk(team, nCr(10, 5) - nCr(6, 5) - nCr(4, 1) * nCr(6, 4));
  b.struct({
    d: 3, ...base(6), calculator: false, skill: "APPLICATION",
    concepts: [Q("counting.permutations"), Q("counting.combinations")],
    stem: "This question is about arrangements and selections.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the number of different arrangements of the 8 letters of the word BULAWAYO.", value: arr.length, wrong: [fact(8)],
        explanation: t`A appears twice: $\frac{8!}{2!} = 20\,160$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the number of these arrangements in which the four vowels U, A, A, O are all together.", value: vowTog, wrong: [fact(5) * fact(4)],
        explanation: t`Treat the vowels as one block: the block with B, L, W, Y gives $5! = 120$ arrangements; inside the block U, A, A, O give $\frac{4!}{2!} = 12$. Total $120 \times 12 = 1440$.` }),
      P.num({ label: "(c)", marks: 3, stem: "A team of 5 is chosen from 6 men and 4 women. Find the number of different teams that contain at least 2 women.", value: team, wrong: [nCr(4, 2) * nCr(8, 3)],
        explanation: t`2 women and 3 men: $6 \times 20 = 120$; 3 women and 2 men: $4 \times 15 = 60$; 4 women and 1 man: $1 \times 6 = 6$. Total $186$. ($${nCr(4, 2) * nCr(8, 3)}$ chooses 2 women then any 3 others, which counts some teams more than once.)` }),
    ],
    explanation: "Divide by 2! for the repeated A; treat letters that must be together as a block; split 'at least' into cases.",
    hints: ["Count the vowels in BULAWAYO.", "List the cases with 2, 3 and 4 women."],
  });

  // ---------------------------------------------------------------- C5s-3 (6): discrete distribution with unknowns
  // x: 1 2 3 4 ; P: 0.2 p q 0.25 ; E = 2.6 -> p + q = 0.55; 0.2 + 2p + 3q + 1 = 2.6 -> 2p + 3q = 1.4 -> q = 0.3, p = 0.25
  const d3 = [[1, 0.2], [2, 0.25], [3, 0.3], [4, 0.25]];
  chk(d3.reduce((s, [, p]) => s + p, 0), 1); chk(ev(d3), 2.6); chk(vr(d3), 1.14);
  b.struct({
    d: 3, ...base(6), calculator: false, skill: "APPLICATION",
    concepts: [Q("discrete.random-variables")],
    stem: t`The discrete random variable $X$ has the probability distribution below, and $\mathrm{E}(X) = 2.6$.

${table(["x", 1, 2, 3, 4], [["P(X = x)", 0.2, "p", "q", 0.25]])}`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the values of p and q.", template: "p = {{blank:p}}; q = {{blank:q}}",
        blanks: [D("p", 0.25, 0.0005, "0.3", 1), D("q", 0.3, 0.0005, "0.25", 2)],
        explanation: t`$0.2 + p + q + 0.25 = 1$ gives $p + q = 0.55$. $\mathrm{E}(X) = 0.2 + 2p + 3q + 1 = 2.6$ gives $2p + 3q = 1.4$. Then $q = 1.4 - 2(0.55) = 0.3$ and $p = 0.25$.` }),
      P.num({ label: "(b)", marks: 3, stem: "Find Var(X).", value: vr(d3), wrong: [7.9],
        explanation: t`$\mathrm{E}(X^2) = 0.2 + 4(0.25) + 9(0.3) + 16(0.25) = 0.2 + 1 + 2.7 + 4 = 7.9$. $\mathrm{Var}(X) = 7.9 - 2.6^2 = 1.14$.` }),
    ],
    explanation: "Two equations from ΣP = 1 and E(X), then E(X²) − [E(X)]².",
    hints: ["Form simultaneous equations in p and q."],
  });

  // ---------------------------------------------------------------- C5s-4 (6): geometric and binomial
  const pD = 0.15;
  const a4 = geo.pmf(pD, 5), b4 = geo.gt(pD, 7), c4 = binom.pmf(10, pD, 2);
  b.struct({
    d: 3, ...base(6), skill: "APPLICATION",
    concepts: [Q("discrete.geometric"), Q("discrete.binomial")],
    stem: "Tendai throws darts at a board. The probability that a dart hits the bull's-eye is 0.15, independently for each throw. Give probabilities correct to 3 significant figures.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the probability that Tendai first hits the bull's-eye with his 5th throw.", value: a4, wrong: [Number(S3(0.85 ** 5 * 0.15))],
        explanation: t`$\mathrm{Geo}(0.15)$: $0.85^4 \times 0.15 = ${S3(a4)}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the probability that he needs more than 7 throws to hit the bull's-eye for the first time.", value: b4, wrong: [Number(S3(0.85 ** 6))],
        explanation: t`The first 7 throws all miss: $0.85^7 = ${S3(b4)}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the probability that he hits the bull's-eye exactly twice in 10 throws.", value: c4, wrong: [Number(S3(0.15 ** 2 * 0.85 ** 8))],
        explanation: t`$\mathrm{B}(10, 0.15)$: ${"$"}{}^{10}C_2(0.15)^2(0.85)^8 = 45 \times 0.0225 \times ${sfStr(0.85 ** 8, 4)} = ${S3(c4)}$.` }),
    ],
    explanation: "Waiting for the first hit is geometric; the number of hits in a fixed number of throws is binomial.",
    hints: ["(a) and (b): Geo(0.15). (c): B(10, 0.15)."],
  });

  // ---------------------------------------------------------------- C5l-1 (8): histogram and grouped estimates
  const cls = [[0, 10, 12], [10, 20, 28], [20, 30, 24], [30, 50, 20], [50, 90, 16]];
  const g1 = grouped(cls);
  chk(g1.n, 100);
  same(g1.fd.map((x) => round(x, 4)), [1.2, 2.8, 2.4, 1, 0.4]);
  b.struct({
    d: 3, ...base(8), skill: "APPLICATION",
    concepts: [Q("data.histograms-cumulative"), Q("data.location-spread"), Q("data.mean-sd")],
    stem: t`The times, $t$ minutes, that 100 customers waited at a bank in Harare are summarised below.

${table(["Time t (minutes)", "0 ≤ t < 10", "10 ≤ t < 20", "20 ≤ t < 30", "30 ≤ t < 50", "50 ≤ t < 90"], [["Frequency", 12, 28, 24, 20, 16]])}`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "A histogram is drawn. Find the frequency densities of the classes 30 ≤ t < 50 and 50 ≤ t < 90.", template: "30 to 50: {{blank:a}}; 50 to 90: {{blank:b}}",
        blanks: [D("a", 1, 0.0005, "20"), D("b", 0.4, 0.0005, "16")],
        explanation: t`Frequency density = frequency ÷ class width: $\frac{20}{20} = 1$ and $\frac{16}{40} = 0.4$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate an estimate of the mean waiting time, correct to 3 significant figures.", value: g1.mean, wrong: [Number(S3((5 * 12 + 15 * 28 + 25 * 24 + 40 * 20 + 70 * 16) / 5))],
        explanation: t`Mid-points 5, 15, 25, 40, 70: $\sum ft = 60 + 420 + 600 + 800 + 1120 = 3000$; mean $\approx \frac{3000}{100} = 30$ minutes.` }),
      P.num({ label: "(c)", marks: 2, stem: "Estimate the median waiting time by linear interpolation, correct to 3 significant figures.", value: g1.median, wrong: [25],
        explanation: t`The 50th customer is in $20 \le t < 30$ (cumulative frequency 40 before it): median $\approx 20 + \frac{50 - 40}{24} \times 10 = ${S3(g1.median)}$ minutes.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Compare the mean and the median and say what this tells you about the shape of the distribution.",
        points: ["Mean (30) is greater than the median (about 24.2).", "So the distribution is positively skewed: a few long waits pull the mean up."],
        modelAnswer: "The mean, 30 minutes, is larger than the median, about 24.2 minutes, so the distribution has a long right tail (positive skew): a few customers waited a long time." }),
    ],
    explanation: "Densities for the histogram; mid-points for the mean; interpolation for the median.",
    hints: ["Class widths are not all equal.", "Find the class containing the 50th value."],
  });
  chk(g1.mean, 30); chk(g1.median, 20 + (10 / 24) * 10);

  // ---------------------------------------------------------------- C5l-2 (8): tree, conditional, independence
  // Bag: 6 green, 4 white. Two counters without replacement.
  const pGG = (6 / 10) * (5 / 9), pWW = (4 / 10) * (3 / 9);
  const same2 = pGG + pWW;
  same(F(30 + 12, 90).s, "7/15"); chk(same2, 7 / 15);
  const p2W = (6 / 10) * (4 / 9) + (4 / 10) * (3 / 9); chk(p2W, 0.4);
  const condWW = pWW / same2; chk(condWW, 2 / 7);
  b.struct({
    d: 4, ...base(8), calculator: false, skill: "ANALYSIS",
    concepts: [Q("probability.conditional"), Q("probability.events-rules")],
    stem: "A bag contains 6 green and 4 white counters. Farai takes two counters at random from the bag, one after the other, without replacement.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the probability that the two counters are the same colour. Give your answer as a fraction or a decimal correct to 3 significant figures.", value: same2, wrong: [0.52],
        explanation: t`$\frac{6}{10} \times \frac{5}{9} + \frac{4}{10} \times \frac{3}{9} = \frac{30 + 12}{90} = \frac{7}{15}$. (0.52 is $0.6^2 + 0.4^2$, with replacement.)` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the probability that the second counter is white.", value: p2W, wrong: [1 / 3],
        explanation: t`$\frac{6}{10} \times \frac{4}{9} + \frac{4}{10} \times \frac{3}{9} = \frac{24 + 12}{90} = 0.4$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Given that the two counters are the same colour, find the probability that they are both white. Give your answer as a fraction or a decimal correct to 3 significant figures.", value: condWW, wrong: [12 / 90],
        explanation: t`$\frac{12/90}{42/90} = \frac{12}{42} = \frac{2}{7}$.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Event A is 'the first counter is white' and event B is 'the second counter is white'. Determine, with a reason, whether A and B are independent.",
        points: [t`Finds $\mathrm{P}(A \cap B) = \frac{12}{90} = \frac{2}{15}$ and $\mathrm{P}(A)\,\mathrm{P}(B) = 0.4 \times 0.4 = 0.16$.`, "Concludes not independent, since the values differ."],
        modelAnswer: "P(A) = 0.4 and P(B) = 0.4 from (b), so P(A)P(B) = 0.16. P(A ∩ B) = 4/10 × 3/9 = 2/15 ≈ 0.133 ≠ 0.16, so A and B are not independent." }),
    ],
    explanation: "Multiply along branches; divide one path by the total of the paths in the condition; compare P(A ∩ B) with P(A)P(B).",
    hints: ["Draw the tree: denominators 10 then 9.", "P(B) = 0.4 from (b)."],
  });
  chk(pWW, 2 / 15);

  // ---------------------------------------------------------------- C5l-3 (8): binomial
  const n5 = 12, p5 = 0.35;
  const a5 = binom.pmf(n5, p5, 4), b5 = 1 - binom.cdf(n5, p5, 2);
  let nL = 1; while (1 - 0.65 ** nL <= 0.99) nL++;
  chk(nL, 11);
  b.struct({
    d: 3, ...base(8), skill: "APPLICATION",
    concepts: [Q("discrete.binomial")],
    stem: "35% of the households in a district of Bulawayo use solar water heaters. A random sample of 12 households is chosen. Give probabilities correct to 3 significant figures.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the probability that exactly 4 of the households use solar water heaters.", value: a5, wrong: [Number(S3(0.35 ** 4 * 0.65 ** 8))],
        explanation: t`$X \sim \mathrm{B}(12, 0.35)$: ${"$"}{}^{12}C_4(0.35)^4(0.65)^8 = 495 \times 0.01500625 \times ${sfStr(0.65 ** 8, 4)} = ${S3(a5)}$.` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the probability that at least 3 of the households use solar water heaters.", value: b5, wrong: [Number(S3(1 - binom.cdf(n5, p5, 3)))],
        explanation: t`$1 - [\mathrm{P}(0) + \mathrm{P}(1) + \mathrm{P}(2)] = 1 - (${sfStr(binom.pmf(12, 0.35, 0), 4)} + ${sfStr(binom.pmf(12, 0.35, 1), 4)} + ${sfStr(binom.pmf(12, 0.35, 2), 4)}) = ${S3(b5)}$.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the least number of households that must be chosen so that the probability that at least one of them uses a solar water heater is greater than 0.99.", value: nL, wrong: [10],
        explanation: t`$1 - 0.65^n > 0.99 \Rightarrow 0.65^n < 0.01 \Rightarrow n > \frac{\ln 0.01}{\ln 0.65} = ${S3(Math.log(0.01) / Math.log(0.65))}$. Check: $1 - 0.65^{10} = ${sfStr(1 - 0.65 ** 10, 4)}$, $1 - 0.65^{11} = ${sfStr(1 - 0.65 ** 11, 4)}$. So 11.` }),
    ],
    explanation: "B(12, 0.35) for (a) and (b); for (c) use the complement and logarithms.",
    hints: ["At least 3 = 1 − P(at most 2).", "P(none) = 0.65ⁿ."],
  });

  // ---------------------------------------------------------------- C5l-4 (8): normal, two unknown parameters
  const z1 = invPhi(0.9), z2 = invPhi(0.8);
  const sg = (480 - 420) / (z1 + z2), mu = 420 + z1 * sg; // P(X<420)=0.1, P(X>480)=0.2
  const z1t = round(z1, 3), z2t = round(z2, 3);
  const sgT = 60 / (z1t + z2t), muT = 420 + z1t * sgT;
  chk(Phi((420 - mu) / sg), 0.1, 1e-9); chk(1 - Phi((480 - mu) / sg), 0.2, 1e-9);
  const pMid = normalProb(mu, sg, 440, 470);
  const exp200 = 200 * normalProb(mu, sg, 500, Infinity).exact;
  b.struct({
    d: 4, ...base(8), skill: "ANALYSIS",
    concepts: [Q("normal.inverse-parameters"), Q("normal.probabilities")],
    stem: "The volumes, X ml, of milk in cartons filled at a dairy in Marondera are normally distributed with mean μ ml and standard deviation σ ml. 10% of the cartons contain less than 420 ml and 20% contain more than 480 ml.",
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: "Find μ and σ, each correct to 3 significant figures.", template: "μ = {{blank:m}}; σ = {{blank:s}}",
        blanks: [D("m", S3(mu), Math.abs(mu - muT) + 0.5, "450", 2), D("s", S3(sg), Math.abs(sg - sgT) + 0.05, S3(60 / (z1 - z2)), 2)],
        explanation: t`$\frac{420 - \mu}{\sigma} = -${z1t}$ and $\frac{480 - \mu}{\sigma} = ${z2t}$. Subtracting $\mu - ${z1t}\sigma = 420$ from $\mu + ${z2t}\sigma = 480$: $${(z1t + z2t).toFixed(3)}\sigma = 60$, $\sigma = ${S3(sg)}$; $\mu = 420 + ${z1t} \times ${sfStr(sg, 4)} = ${S3(mu)}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the probability that a carton contains between 440 ml and 470 ml, correct to 3 significant figures.", value: pMid.exact, tol: 0.003, wrong: [Number(S3(Phi((470 - mu) / sg)))],
        explanation: t`$z = \frac{440 - ${sfStr(mu, 4)}}{${sfStr(sg, 4)}} = ${((440 - mu) / sg).toFixed(3)}$ and $\frac{470 - ${sfStr(mu, 4)}}{${sfStr(sg, 4)}} = ${((470 - mu) / sg).toFixed(3)}$; $\Phi(${((470 - mu) / sg).toFixed(2)}) - \Phi(${((440 - mu) / sg).toFixed(2)}) = ${S3(pMid.exact)}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "200 cartons are chosen at random. Find the expected number that contain more than 500 ml, to the nearest whole number.", value: Math.round(exp200), wrong: [Math.round(200 * 0.2)],
        explanation: t`$\mathrm{P}(X > 500) = 1 - \Phi\left(\frac{500 - ${sfStr(mu, 4)}}{${sfStr(sg, 4)}}\right) = ${S3(exp200 / 200)}$; $200 \times ${S3(exp200 / 200)} = ${exp200.toFixed(1)}$, about ${Math.round(exp200)} cartons.` }),
    ],
    explanation: "Two percentages give two equations; then use the fitted model forwards.",
    hints: ["420 is below the mean: its z value is negative.", "Subtract the equations to eliminate μ."],
  });
  chk(Math.round(exp200), Math.round(200 * (1 - phiTable((500 - muT) / sgT))));

  // ---------------------------------------------------------------- C5l-5 (8): distribution from two spinners
  // Spinner A: 1, 2, 3, 4 (fair); spinner B: 1, 2, 3 (fair). X = |a − b|.
  const outs = []; for (let a = 1; a <= 4; a++) for (let c = 1; c <= 3; c++) outs.push(Math.abs(a - c));
  const dist = [0, 1, 2, 3].map((x) => [x, outs.filter((v) => v === x).length / 12]);
  same(dist.map(([, p]) => F(Math.round(p * 12), 12).s), ["1/4", "5/12", "1/4", "1/12"]);
  chk(ev(dist), 7 / 6); chk(vr(dist), 29 / 36);
  b.struct({
    d: 3, ...base(8), calculator: false, skill: "APPLICATION",
    concepts: [Q("discrete.random-variables"), Q("probability.events-rules")],
    stem: "A fair spinner A is numbered 1, 2, 3, 4 and a fair spinner B is numbered 1, 2, 3. Both are spun once and X is the positive difference between the two scores (X = 0 if they are equal).",
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: "Draw up the probability distribution of X, giving each probability as a fraction.", template: "P(X = 0) = {{blank:a}}; P(X = 1) = {{blank:b}}; P(X = 2) = {{blank:c}}; P(X = 3) = {{blank:d}}",
        blanks: [D("a", "1/4", 0.0005, "1/3"), D("b", "5/12", 0.0005, "1/2"), D("c", "1/4", 0.0005, "1/6"), D("d", "1/12", 0.0005, "0")],
        explanation: t`12 equally likely pairs. Difference 0: (1,1), (2,2), (3,3): 3. Difference 1: (1,2), (2,1), (2,3), (3,2), (4,3): 5. Difference 2: (1,3), (3,1), (4,2): 3. Difference 3: (4,1): 1. So $\frac{3}{12}, \frac{5}{12}, \frac{3}{12}, \frac{1}{12}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find E(X). Give your answer as a fraction or a decimal correct to 3 significant figures.", value: ev(dist), wrong: [1.5],
        explanation: t`$\mathrm{E}(X) = \frac{0 + 5 + 6 + 3}{12} = \frac{14}{12} = \frac{7}{6}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find Var(X). Give your answer as a fraction or a decimal correct to 3 significant figures.", value: vr(dist), wrong: [Number(S3(25 / 12))],
        explanation: t`$\mathrm{E}(X^2) = \frac{0 + 5 + 12 + 9}{12} = \frac{26}{12}$. $\mathrm{Var}(X) = \frac{26}{12} - \left(\frac{7}{6}\right)^2 = \frac{78 - 49}{36} = \frac{29}{36} \approx ${S3(29 / 36)}$.` }),
    ],
    explanation: "List the 12 outcomes in a table of differences, then use the moment formulas.",
    hints: ["Draw a 4 by 3 table of differences."],
  });
});
