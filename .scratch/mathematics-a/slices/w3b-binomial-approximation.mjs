// W3b: amaths.normal.binomial-approximation (ZIMSEC Statistics F5 6.5.3; Cambridge P5 5.5)
import { concept, P, t, chk, sfStr, binom, normalProb, Phi, invPhi, ZS } from "../lib.mjs";

const { sqrt } = Math;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const s = (x) => sfStr(x, 4);
/** Normal approximation to B(n, p) on (lo, hi) (continuity-corrected boundaries passed in). */
const NA = (n, p, lo, hi) => normalProb(n * p, sqrt(n * p * (1 - p)), lo, hi);
const zz = (x, n, p) => (x - n * p) / sqrt(n * p * (1 - p));

concept("amaths.normal.binomial-approximation", { file: "normal/binomial-approximation", keyPrefix: "normal.binomial-approximation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$X \sim \mathrm{B}(n, p)$ and $q = 1 - p$. Under which conditions is the normal approximation to the distribution of $X$ usually used?`,
    options: [
      [t`$np > 5$ and $nq > 5$`, "Correct: the mean must be far enough from both 0 and n for the distribution to be roughly symmetrical."],
      [t`$n > 50$ and $np < 5$`, "These are the conditions for a Poisson approximation, not a normal one."],
      [t`$np > 5$ only`, t`If $nq$ is small the distribution is skewed towards $n$; both conditions are needed.`],
      [t`$p = 0.5$ exactly`, t`$p$ need not be $\frac12$; it only needs $n$ large enough that $np$ and $nq$ exceed 5.`],
    ],
    answer: "A",
    explanation: t`With $np > 5$ and $nq > 5$ the binomial histogram is close enough to a bell shape for $\mathrm{N}(np, npq)$ to give good probabilities.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "For which of these distributions is the normal approximation suitable?",
    options: [
      [t`$\mathrm{B}(50, 0.3)$`, t`Correct: $np = 15 > 5$ and $nq = 35 > 5$.`],
      [t`$\mathrm{B}(20, 0.1)$`, t`$np = 2$, which is less than 5.`],
      [t`$\mathrm{B}(200, 0.01)$`, t`$np = 2$ is too small (a Poisson approximation would suit this one).`],
      [t`$\mathrm{B}(30, 0.9)$`, t`$np = 27$ is fine, but $nq = 3$ is less than 5.`],
    ],
    answer: "A",
    explanation: "Work out np and nq for each and check that both exceed 5.",
  });

  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`$X \sim \mathrm{B}(150, 0.2)$ is approximated by $\mathrm{N}(\mu, \sigma^2)$. Find $\mu$ and $\sigma^2$.`,
    template: "μ = {{blank:m}}, σ² = {{blank:v}}",
    blanks: [D("m", 30, 0.001, "24"), D("v", 24, 0.001, "30")],
    explanation: t`$\mu = np = 150 \times 0.2 = 30$ and $\sigma^2 = npq = 150 \times 0.2 \times 0.8 = 24$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: t`$X \sim \mathrm{B}(60, 0.5)$ is approximated by $Y \sim \mathrm{N}(30, 15)$. Which probability should be calculated for $\mathrm{P}(X < 18)$?`,
    options: [
      [t`$\mathrm{P}(Y < 17.5)$`, "Correct: X < 18 means X ≤ 17, and the bar for 17 ends at 17.5."],
      [t`$\mathrm{P}(Y < 18.5)$`, "This includes the bar for 18, so it represents X ≤ 18."],
      [t`$\mathrm{P}(Y < 18)$`, "This has no continuity correction."],
      [t`$\mathrm{P}(Y > 17.5)$`, "This is the complement, X ≥ 18."],
    ],
    answer: "A",
    explanation: "Write the event with ≤ or ≥ in whole numbers first: X < 18 is X ≤ 17, giving the boundary 17.5.",
  });

  const r5 = NA(50, 0.5, -Infinity, 20.5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`A fair coin is tossed 50 times. Use a normal approximation to find the probability of at most 20 heads. Give your answer correct to 3 significant figures.`,
    value: r5.exact, tol: r5.tol, wrong: [NA(50, 0.5, -Infinity, 20).exact, NA(50, 0.5, -Infinity, 19.5).exact],
    explanation: t`$X \sim \mathrm{B}(50, 0.5)$, $np = nq = 25$: $Y \sim \mathrm{N}(25, 12.5)$. $\mathrm{P}(X \le 20) \approx \mathrm{P}(Y < 20.5)$, $z = \frac{20.5 - 25}{\sqrt{12.5}} = ${sfStr(zz(20.5, 50, 0.5), 4)}$, so the probability is $${s(r5.exact)}$, i.e. $${sfStr(r5.exact)}$. (19.5 would represent $X \le 19$.)`,
    hints: ["Variance npq = 12.5.", "'At most 20' includes 20, so use 20.5."],
  });

  const r6 = NA(120, 0.25, 35.5, Infinity);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`25% of the learners at a large school in Gweru walk more than 3 km to school. A random sample of 120 learners is taken. Use a suitable approximation to find the probability that more than 35 of them walk more than 3 km. Give your answer correct to 3 significant figures.`,
    value: r6.exact, tol: r6.tol, wrong: [NA(120, 0.25, 34.5, Infinity).exact, NA(120, 0.25, 35, Infinity).exact],
    explanation: t`$X \sim \mathrm{B}(120, 0.25)$: $np = 30$, $nq = 90$, both $> 5$, so $Y \sim \mathrm{N}(30, 22.5)$. "More than 35" is $X \ge 36$: $\mathrm{P}(Y > 35.5)$, $z = \frac{5.5}{\sqrt{22.5}} = ${sfStr(zz(35.5, 120, 0.25), 4)}$, giving $${s(r6.exact)}$, i.e. $${sfStr(r6.exact)}$.`,
    hints: ["Check np and nq.", "'More than 35' starts at 36."],
  });

  const r7 = NA(90, 0.6, 49.5, 60.5);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`$X \sim \mathrm{B}(90, 0.6)$. Use a normal approximation to find $\mathrm{P}(50 \le X \le 60)$. Give your answer correct to 3 significant figures.`,
    value: r7.exact, tol: r7.tol, wrong: [NA(90, 0.6, 50.5, 59.5).exact, NA(90, 0.6, 50, 60).exact],
    explanation: t`$Y \sim \mathrm{N}(54, 21.6)$. Both ends are included: $\mathrm{P}(49.5 < Y < 60.5)$. $z_1 = ${sfStr(zz(49.5, 90, 0.6), 4)}$, $z_2 = ${sfStr(zz(60.5, 90, 0.6), 4)}$; probability $${s(r7.exact)}$, i.e. $${sfStr(r7.exact)}$.`,
    workedSolution: t`1. $np = 54$, $nq = 36$; $\sigma^2 = 90 \times 0.6 \times 0.4 = 21.6$.
2. $\mathrm{P}(50 \le X \le 60) \approx \mathrm{P}(49.5 < Y < 60.5)$.
3. $z_1 = \dfrac{49.5 - 54}{\sqrt{21.6}} = ${sfStr(zz(49.5, 90, 0.6), 4)}$, $z_2 = \dfrac{60.5 - 54}{\sqrt{21.6}} = ${sfStr(zz(60.5, 90, 0.6), 4)}$.
4. $\Phi(z_2) - \Phi(z_1) = ${s(Phi(zz(60.5, 90, 0.6)))} - ${s(Phi(zz(49.5, 90, 0.6)))} = ${s(r7.exact)}$.
5. Answer $${sfStr(r7.exact)}$.`,
    hints: ["Both 50 and 60 are included: widen the interval by 0.5 at each end."],
  });

  const r8 = NA(80, 0.3, 24.5, 25.5);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`$X \sim \mathrm{B}(80, 0.3)$. Use a normal approximation to estimate $\mathrm{P}(X = 25)$. Give your answer correct to 2 significant figures.`,
    value: r8.exact, sf: 2, wrong: [0, NA(80, 0.3, 25, 25.5).exact],
    explanation: t`$Y \sim \mathrm{N}(24, 16.8)$. A single value is the bar from 24.5 to 25.5: $z_1 = \frac{0.5}{\sqrt{16.8}} = ${sfStr(zz(24.5, 80, 0.3), 3)}$, $z_2 = \frac{1.5}{\sqrt{16.8}} = ${sfStr(zz(25.5, 80, 0.3), 3)}$. Probability $${s(r8.exact)}$, i.e. $${sfStr(r8.exact, 2)}$ (exact binomial value $${s(binom.pmf(80, 0.3, 25))}$). For a continuous variable $\mathrm{P}(Y = 25) = 0$, which is why the interval is needed.`,
    workedSolution: t`1. $\mu = 24$, $\sigma^2 = 16.8$.
2. $\mathrm{P}(X = 25) \approx \mathrm{P}(24.5 < Y < 25.5)$.
3. $z$-values $${sfStr(zz(24.5, 80, 0.3), 3)}$ and $${sfStr(zz(25.5, 80, 0.3), 3)}$.
4. $\Phi(${sfStr(zz(25.5, 80, 0.3), 3)}) - \Phi(${sfStr(zz(24.5, 80, 0.3), 3)}) = ${s(r8.exact)}$, so $${sfStr(r8.exact, 2)}$.`,
    hints: ["One whole number corresponds to an interval of width 1."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`When $\mathrm{B}(n, p)$ is approximated by a normal distribution, the standard deviation used is $npq$.`,
    answer: false,
    explanation: t`$npq$ is the **variance**; the standard deviation is $\sqrt{npq}$. Dividing by $npq$ when standardising is a common error.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The normal approximation is suitable for $\mathrm{B}(40, 0.1)$.`,
    answer: false,
    explanation: t`$np = 4 < 5$, so the distribution is too skewed for a normal approximation.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A binomial variable $X$ is approximated by a normal variable $Y$. Match each binomial event with the normal event used.`,
    pairs: [
      [t`$X \ge 12$`, t`$Y > 11.5$`],
      [t`$X > 12$`, t`$Y > 12.5$`],
      [t`$X \le 12$`, t`$Y < 12.5$`],
      [t`$X < 12$`, t`$Y < 11.5$`],
    ],
    explanation: "Include the half-bar of every whole number in the event and exclude the others: X ≥ 12 includes 12 (11.5); X > 12 starts at 13 (12.5); X ≤ 12 includes 12 (12.5); X < 12 stops at 11 (11.5).",
  });

  const r12 = NA(400, 0.35, 149.5, Infinity);
  b.num({
    d: 4, skill: "APPLICATION", calculator: true, applies: ZS,
    stem: t`In a large ward in Masvingo, 35% of voters support a proposal to build a new clinic. A random sample of 400 voters is taken. Use a suitable approximation to find the probability that at least 150 of them support the proposal. Give your answer correct to 4 decimal places.`,
    value: r12.exact, dp: 4, tol: r12.tol, wrong: [NA(400, 0.35, 150.5, Infinity).exact, NA(400, 0.35, 150, Infinity).exact],
    explanation: t`$X \sim \mathrm{B}(400, 0.35)$, $np = 140$, $npq = 91$: $Y \sim \mathrm{N}(140, 91)$. $\mathrm{P}(X \ge 150) \approx \mathrm{P}(Y > 149.5)$, $z = \frac{9.5}{\sqrt{91}} = ${sfStr(zz(149.5, 400, 0.35), 4)}$. From tables, $\Phi(1.00) = 0.8413$, so the probability is about $0.1587$ (calculator: $${dpStrOf(r12.exact)}$).`,
    hints: ["np = 140 and npq = 91.", "'At least 150' includes 150."],
  });

  const sd13 = sqrt(200 * 0.45 * 0.55);
  const k13 = Math.ceil(90 + 0.5 + 2.326 * sd13);
  chk(k13, 107);
  chk(NA(200, 0.45, 106.5, Infinity).exact < 0.01 && NA(200, 0.45, 105.5, Infinity).exact > 0.01 ? 1 : 0, 1);
  b.num({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: t`$X \sim \mathrm{B}(200, 0.45)$. Using a normal approximation, find the smallest integer $k$ such that $\mathrm{P}(X \ge k) < 0.01$.`,
    value: k13, wrong: [106, 108],
    explanation: t`$Y \sim \mathrm{N}(90, 49.5)$. $\mathrm{P}(X \ge k) \approx \mathrm{P}(Y > k - 0.5) < 0.01$ needs $\frac{k - 0.5 - 90}{\sqrt{49.5}} > 2.326$, so $k > 90.5 + 2.326\sqrt{49.5} = ${sfStr(90.5 + 2.326 * sd13, 5)}$ and $k = 107$. Check: $\mathrm{P}(Y > 106.5) = ${sfStr(NA(200, 0.45, 106.5, Infinity).exact)}$ and $\mathrm{P}(Y > 105.5) = ${sfStr(NA(200, 0.45, 105.5, Infinity).exact)}$. (108 forgets the continuity correction in the other direction; 106 rounds down.)`,
    hints: ["Write P(X ≥ k) as P(Y > k − 0.5).", "Φ(2.326) = 0.99."],
  });

  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: "For which of these variables would a normal distribution be the least suitable model?",
    options: [
      ["the waiting time at a clinic, with mean 4 minutes and standard deviation 5 minutes", "Correct: a normal model would give a large probability to negative times (z = −0.8 at 0 minutes), and waiting times are skewed."],
      ["the heights of adult women in Bulawayo, with mean 162 cm and standard deviation 6 cm", "Heights are roughly symmetrical and bell-shaped; zero is 27 standard deviations below the mean."],
      ["the masses of 2 kg bags of sugar from a machine, mean 2.01 kg, sd 0.02 kg", "Machine-filled masses vary symmetrically about the target: a classic normal model."],
      ["the marks in a large national examination, with mean 55 and standard deviation 12", "Large-scale marks are often roughly bell-shaped, and 0 and 100 are over 3 standard deviations away."],
    ],
    answer: "A",
    explanation: "A normal model suits variables that are roughly symmetrical and not bounded close to the mean. Waiting times cannot be negative, and with a standard deviation larger than the mean the distribution must be strongly skewed.",
    hints: ["How many standard deviations below the mean is zero in each case?"],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Explain why a continuity correction is needed when a binomial distribution is approximated by a normal distribution.",
    points: [
      "The binomial variable is discrete (whole numbers only) but the normal variable is continuous.",
      "Each whole number k is represented by the interval from k − 0.5 to k + 0.5 (the bar of the histogram), so boundaries are moved by 0.5.",
    ],
    modelAnswer: "X can only take whole-number values, while the normal distribution is continuous and gives probability zero to any single value. Each value k corresponds to the histogram bar from k − 0.5 to k + 0.5, so the boundaries of an event are moved by half a unit.",
    explanation: "The correction matches the area under the curve to the area of the histogram bars.",
    hints: ["Think about the histogram of the binomial distribution."],
  });

  const r16 = NA(50, 0.25, 19.5, Infinity);
  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`A test has 50 multiple-choice questions, each with 4 options, one of them correct. Chipo guesses every answer at random. The pass mark is 20. Use a suitable approximation to find the probability that Chipo passes. Give your answer correct to 2 significant figures.`,
    value: r16.exact, sf: 2, wrong: [NA(50, 0.25, 20.5, Infinity).exact, NA(50, 0.25, 20, Infinity).exact],
    explanation: t`$X \sim \mathrm{B}(50, 0.25)$: $np = 12.5$, $nq = 37.5$, so $Y \sim \mathrm{N}(12.5, 9.375)$. Passing is $X \ge 20$: $\mathrm{P}(Y > 19.5)$, $z = \frac{7}{\sqrt{9.375}} = ${sfStr(zz(19.5, 50, 0.25), 4)}$, so the probability is $${s(r16.exact)}$, i.e. $${sfStr(r16.exact, 2)}$.`,
    hints: ["p = 1/4 for a guess.", "Passing means 20 or more."],
  });

  // ------------------------------------------------------------ structured (5 marks)
  const s5 = NA(150, 0.6, -Infinity, 84.5);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`A biased coin shows heads with probability 0.6. It is tossed 150 times and $X$ is the number of heads.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`$X$ is approximated by $\mathrm{N}(\mu, \sigma^2)$. State the values of $\mu$ and $\sigma^2$.`, template: "μ = {{blank:m}}, σ² = {{blank:v}}",
        blanks: [D("m", 90, 0.001, "60"), D("v", 36, 0.001, "6")],
        explanation: t`$\mu = 150 \times 0.6 = 90$, $\sigma^2 = 150 \times 0.6 \times 0.4 = 36$.` }),
      P.num({ label: "(b)", marks: 3, stem: "Use the approximation to find the probability of at most 84 heads, correct to 3 significant figures.", value: s5.exact, tol: s5.tol, wrong: [NA(150, 0.6, -Infinity, 84).exact, NA(150, 0.6, -Infinity, 83.5).exact],
        explanation: t`$\mathrm{P}(Y < 84.5)$, $z = \frac{84.5 - 90}{6} = ${sfStr(zz(84.5, 150, 0.6), 4)}$, probability $${s(s5.exact)}$.` }),
    ],
    explanation: "State the approximating distribution, apply the continuity correction, standardise.",
    hints: ["σ = 6.", "'At most 84' includes 84."],
  });

  // ------------------------------------------------------------ structured (14 marks)
  const pUnder = Phi(-1.6);
  chk((49.8 - 50.2) / 0.25, -1.6, 1e-12);
  const rB = NA(200, pUnder, 15.5, Infinity);
  const mu14 = 49.8 + 2.054 * 0.25;
  chk(Math.abs(49.8 + invPhi(0.98) * 0.25 - mu14) < 0.0005 ? 1 : 0, 1);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The masses of bags of cement filled by a machine at a factory in Bulawayo are normally distributed with mean 50.2 kg and standard deviation 0.25 kg. A bag is **underweight** if its mass is less than 49.8 kg.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the probability that a randomly chosen bag is underweight, correct to 3 significant figures.", value: pUnder, tol: 0.00015, wrong: [1 - pUnder],
        explanation: t`$z = \frac{49.8 - 50.2}{0.25} = -1.6$; $\Phi(-1.6) = 1 - 0.9452 = 0.0548$.` }),
      P.num({ label: "(b)", marks: 5, stem: "A lorry carries 200 bags. Use a suitable approximation to find the probability that more than 15 of the bags are underweight, correct to 3 significant figures.", value: rB.exact, tol: rB.tol, wrong: [NA(200, pUnder, 14.5, Infinity).exact, NA(200, pUnder, 15, Infinity).exact],
        explanation: t`$X \sim \mathrm{B}(200, 0.0548)$; $np = 10.96$, $nq = 189.04$, both $> 5$, so $Y \sim \mathrm{N}(10.96, 10.36)$. $\mathrm{P}(X > 15) \approx \mathrm{P}(Y > 15.5)$, $z = \frac{4.54}{\sqrt{10.36}} = ${sfStr(zz(15.5, 200, pUnder), 4)}$, probability $${s(rB.exact)}$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Justify the approximation used in (b), and state an assumption about the bags that is needed.",
        points: [t`Quotes $np = 10.96 > 5$ and $nq = 189.04 > 5$ (so the normal approximation to the binomial is valid).`, "States that the bags on the lorry are independent of each other (a random selection), each with the same probability 0.0548 of being underweight."],
        modelAnswer: "np = 10.96 and nq = 189.04 are both greater than 5. We assume the 200 bags behave like a random sample: independent, each underweight with probability 0.0548.",
        explanation: "Justify with numbers; the binomial model needs independence and a constant probability." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give two reasons why a normal distribution is a sensible model for the masses of the bags.",
        points: ["The mass is a continuous variable that varies symmetrically about the target set on the machine.", "Masses are not bounded close to the mean: the minimum possible (0 kg) is about 200 standard deviations below the mean, so negative masses have negligible probability."],
        modelAnswer: "Mass is continuous and machine filling gives small random variations either side of the set mean, so a symmetrical bell shape is expected; 0 kg is so many standard deviations below 50.2 kg that impossible values have essentially no probability.",
        explanation: "A normal model needs a continuous, roughly symmetrical variable that is not bounded near the mean." }),
      P.num({ label: "(e)", marks: 3, stem: "The factory adjusts the mean, keeping the standard deviation 0.25 kg, so that only 2% of bags are underweight. Find the new mean, correct to 2 decimal places.", value: mu14, dp: 2, unit: "kg", wrong: [49.8 - 2.054 * 0.25, 50.2 + 2.054 * 0.25],
        explanation: t`$\mathrm{P}(M < 49.8) = 0.02 \Rightarrow \frac{49.8 - \mu}{0.25} = -2.054 \Rightarrow \mu = 49.8 + 2.054 \times 0.25 = ${s(mu14)}$, so $${mu14.toFixed(2)}$ kg.` }),
    ],
    explanation: "A normal probability gives p; the count of underweight bags is binomial and is approximated by a normal distribution; the inverse normal finds a new mean.",
    hints: ["In (b), find np and npq with p from (a).", "'More than 15' starts at 16.", "In (e), Φ(z) = 0.02 gives z = −2.054."],
  });

  // ------------------------------------------------------------ flashcards
  b.card("FACT", "Conditions for N(np, npq) to approximate B(n, p)", t`$np > 5$ and $nq > 5$, where $q = 1 - p$.`);
  b.card("FORMULA", t`Parameters of the normal approximation to $\mathrm{B}(n, p)$`, t`$\mu = np$, $\sigma^2 = npq$, $\sigma = \sqrt{npq}$`);
  b.card("DEFINITION", "Continuity correction", t`Treating the whole number $k$ as the interval $k - 0.5$ to $k + 0.5$ when a discrete distribution is approximated by a continuous one.`);
  b.card("FORMULA", t`$\mathrm{P}(X \ge 30)$ under the normal approximation`, t`$\mathrm{P}(Y > 29.5)$`);
  b.card("FORMULA", t`$\mathrm{P}(X < 40)$ under the normal approximation`, t`$\mathrm{P}(Y < 39.5)$, since $X < 40$ means $X \le 39$.`);
  b.card("FORMULA", t`$\mathrm{P}(X = 25)$ under the normal approximation`, t`$\mathrm{P}(24.5 < Y < 25.5)$`);
  b.card("CONCEPT", "When is a normal model unsuitable?", "When the data are strongly skewed or bounded close to the mean, e.g. a mean of 4 and a standard deviation of 5 for a quantity that cannot be negative.");
  b.card("CONCEPT", "Why np > 5 and nq > 5?", "They keep the mean far enough from 0 and from n for the binomial histogram to be roughly symmetrical and bell-shaped.");
});

function dpStrOf(x) {
  return x.toFixed(4);
}
