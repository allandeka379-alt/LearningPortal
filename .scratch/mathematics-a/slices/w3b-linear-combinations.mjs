// W3b: amaths.rv.linear-combinations (ZIMSEC Statistics F6 6.6; Cambridge P6 6.2)
import { concept, P, t, chk, sfStr, poisson, normalProb, Phi } from "../lib.mjs";

const { sqrt, ceil } = Math;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const s = (x) => sfStr(x, 4);
const pm = poisson.pmf;
const cdf = poisson.cdf;

concept("amaths.rv.linear-combinations", { file: "rv/linear-combinations", keyPrefix: "rv.linear-combinations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`For constants $a$ and $b$, which expression equals $\mathrm{Var}(aX + b)$?`,
    options: [
      [t`$a^2\,\mathrm{Var}(X)$`, "Correct: adding b does not change the spread, and multiplying by a multiplies the variance by a²."],
      [t`$a\,\mathrm{Var}(X) + b$`, "This treats the variance like the mean."],
      [t`$a^2\,\mathrm{Var}(X) + b$`, "A constant shift has no effect on the variance."],
      [t`$a^2\,\mathrm{Var}(X) + b^2$`, "The constant b contributes nothing to the variance."],
    ],
    answer: "A",
    explanation: t`$\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)$, while $\mathrm{E}(aX + b) = a\,\mathrm{E}(X) + b$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`$\mathrm{E}(X) = 8$ and $\mathrm{Var}(X) = 3$. Find $\mathrm{Var}(5 - 2X)$.`,
    value: 12, wrong: [-12, 6, 17],
    explanation: t`$\mathrm{Var}(5 - 2X) = (-2)^2 \times 3 = 12$. The 5 has no effect and the square removes the minus sign. ($-12$ forgets to square $-2$; $6$ forgets to square at all.)`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The random variable $X$ has mean 6.5. Find $\mathrm{E}(4X - 7)$.`,
    value: 19, wrong: [26, -0.5],
    explanation: t`$\mathrm{E}(4X - 7) = 4 \times 6.5 - 7 = 19$.`,
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`$X$ and $Y$ are independent with $\mathrm{Var}(X) = 10$ and $\mathrm{Var}(Y) = 6$. What is $\mathrm{Var}(X - Y)$?`,
    options: [
      ["16", "Correct: variances add for a difference of independent variables, 10 + 6 = 16."],
      ["4", "Subtracting variances is the classic error: a difference is more variable, not less."],
      ["136", "This squares each variance; the coefficients ±1 are squared, not the variances."],
      ["√16 = 4", "Taking a square root gives a standard deviation, and 4 is also the result of subtracting."],
    ],
    answer: "A",
    explanation: t`$\mathrm{Var}(X - Y) = \mathrm{Var}(X) + (-1)^2\mathrm{Var}(Y) = 10 + 6 = 16$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $X_1$ and $X_2$ are independent observations of $X$, then $\mathrm{Var}(X_1 + X_2) = \mathrm{Var}(2X)$.`,
    answer: false,
    explanation: t`$\mathrm{Var}(X_1 + X_2) = 2\,\mathrm{Var}(X)$ but $\mathrm{Var}(2X) = 4\,\mathrm{Var}(X)$. The means are equal ($2\mu$), the variances are not.`,
  });

  b.tf({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`If $X \sim \mathrm{Po}(2.5)$ and $Y \sim \mathrm{Po}(1.5)$ are independent, then $X + Y \sim \mathrm{Po}(4)$.`,
    answer: true,
    explanation: "The sum of independent Poisson variables is Poisson, with the parameters added: 2.5 + 1.5 = 4.",
  });

  b.match({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`$\mathrm{Var}(X) = \sigma^2$, and $X_1, X_2, X_3$ are independent observations of $X$. Match each variable with its variance.`,
    pairs: [
      [t`$3X$`, t`$9\sigma^2$`],
      [t`$X_1 + X_2 + X_3$`, t`$3\sigma^2$`],
      [t`$X + 3$`, t`$\sigma^2$`],
      [t`$\frac{1}{2}X$`, t`$\frac{1}{4}\sigma^2$`],
    ],
    explanation: t`One value scaled by $a$: variance $a^2\sigma^2$ (so $9\sigma^2$ and $\frac14\sigma^2$). Three separate values: $3\sigma^2$. Adding a constant: unchanged.`,
    hints: ["Is it one observation multiplied, or several observations added?"],
  });

  const r8 = normalProb(960, sqrt(20 * 2.25), 970, Infinity);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The masses of bags of coal from a depot in Hwange are normally distributed with mean 48 kg and standard deviation 1.5 kg. A cart carries 20 randomly chosen bags. Find the probability that the total mass of the bags is more than 970 kg. Give your answer correct to 3 significant figures.`,
    value: r8.exact, tol: r8.tol, wrong: [normalProb(960, 30, 970, Infinity).exact, normalProb(960, sqrt(45), -Infinity, 970).exact],
    explanation: t`$T = X_1 + \dots + X_{20} \sim \mathrm{N}(960, 20 \times 2.25) = \mathrm{N}(960, 45)$. $z = \frac{970 - 960}{\sqrt{45}} = ${sfStr(10 / sqrt(45), 4)}$, so $\mathrm{P}(T > 970) = ${s(r8.exact)}$, i.e. $${sfStr(r8.exact)}$. (Treating $T$ as $20X$, with standard deviation $30$, gives $${sfStr(normalProb(960, 30, 970, Infinity).exact)}$.)`,
    hints: ["20 separate bags: add 20 variances.", "Variance of one bag = 1.5²."],
  });

  const r9 = Phi(-0.5);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The scores of two independent players in a round of a game are $A \sim \mathrm{N}(52, 6^2)$ and $B \sim \mathrm{N}(47, 8^2)$. Find $\mathrm{P}(A < B)$, correct to 3 significant figures.`,
    value: r9, tol: 0.0006, wrong: [Phi(-5 / sqrt(28)), 1 - r9],
    explanation: t`Let $D = A - B \sim \mathrm{N}(5, 36 + 64) = \mathrm{N}(5, 100)$. $\mathrm{P}(A < B) = \mathrm{P}(D < 0) = \Phi\left(\frac{0 - 5}{10}\right) = \Phi(-0.5) = 1 - 0.6915 = 0.3085$, so $0.309$. (Subtracting variances, $64 - 36 = 28$, gives the wrong standard deviation.)`,
    workedSolution: t`1. $D = A - B$: $\mathrm{E}(D) = 52 - 47 = 5$.
2. $\mathrm{Var}(D) = 6^2 + 8^2 = 100$, so $D \sim \mathrm{N}(5, 100)$.
3. $\mathrm{P}(D < 0) = \Phi(-0.5) = 0.3085$.
4. Answer $0.309$.`,
    hints: ["Use D = A − B and find P(D < 0).", "Variances add."],
  });

  const v10 = pm(4.5, 3);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The numbers of patients arriving at two independent clinics in a district have distributions $\mathrm{Po}(1.8)$ and $\mathrm{Po}(2.7)$ per hour. Find the probability that exactly 3 patients arrive at the two clinics altogether in an hour. Give your answer correct to 3 significant figures.`,
    value: v10, wrong: [pm(1.8, 3) + pm(2.7, 3), cdf(4.5, 3)],
    explanation: t`The total is $\mathrm{Po}(1.8 + 2.7) = \mathrm{Po}(4.5)$: $\mathrm{e}^{-4.5}\dfrac{4.5^3}{3!} = ${s(v10)}$, i.e. $${sfStr(v10)}$.`,
    hints: ["Add the Poisson parameters."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`$X \sim \mathrm{Po}(3)$ and $Y = 2X$. Which statement is true?`,
    options: [
      [t`$Y$ is not Poisson, because its mean is 6 but its variance is 12.`, t`Correct: $\mathrm{E}(2X) = 6$ and $\mathrm{Var}(2X) = 4 \times 3 = 12$; a Poisson variable has equal mean and variance (and $Y$ takes even values only).`],
      [t`$Y \sim \mathrm{Po}(6)$, because a multiple of a Poisson variable is Poisson.`, "Only sums of independent Poisson variables are Poisson; 2X is one value doubled."],
      [t`$Y \sim \mathrm{Po}(3)$, because doubling does not change the distribution.`, "Doubling changes the mean to 6, so the distribution certainly changes."],
      [t`$Y$ has mean 6 and variance 6, the same as $X_1 + X_2$.`, t`$X_1 + X_2$ has variance 6, but $2X$ has variance $4 \times 3 = 12$.`],
    ],
    answer: "A",
    explanation: t`Compare $2X$ (one value doubled) with $X_1 + X_2$ (two independent values added): $X_1 + X_2 \sim \mathrm{Po}(6)$, but $2X$ has variance 12 and only even values.`,
    hints: ["Work out E(2X) and Var(2X)."],
  });

  const v12 = 1 - cdf(4.4, 2);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Faults on two independent machines occur at random, at average rates of 0.9 per hour on machine A and 1.3 per hour on machine B. Find the probability that at least 3 faults occur altogether in a 2-hour period. Give your answer correct to 3 significant figures.`,
    value: v12, wrong: [1 - cdf(2.2, 2), 1 - cdf(4.4, 3)],
    explanation: t`Total rate $0.9 + 1.3 = 2.2$ per hour, so in 2 hours $T \sim \mathrm{Po}(4.4)$. $\mathrm{P}(T \ge 3) = 1 - \mathrm{e}^{-4.4}\left(1 + 4.4 + \frac{4.4^2}{2}\right) = ${s(v12)}$, i.e. $${sfStr(v12)}$. ($${sfStr(1 - cdf(2.2, 2))}$ forgets to scale to 2 hours.)`,
    workedSolution: t`1. Sum of independent Poisson variables: rate $2.2$ per hour.
2. In 2 hours: $T \sim \mathrm{Po}(4.4)$.
3. $\mathrm{P}(T \ge 3) = 1 - \mathrm{e}^{-4.4}(1 + 4.4 + 9.68) = ${s(v12)}$.
4. Answer $${sfStr(v12)}$.`,
    hints: ["Add the rates, then scale to 2 hours.", "Use 1 − P(T ≤ 2)."],
  });

  const r13 = normalProb(360, 18, 380, Infinity);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A cook measures one cup of flour, whose mass $X$ g is distributed as $\mathrm{N}(120, 6^2)$, and uses **three times** that mass in a recipe. Find the probability that the recipe uses more than 380 g of flour. Give your answer correct to 3 significant figures.`,
    value: r13.exact, tol: r13.tol, wrong: [normalProb(360, sqrt(108), 380, Infinity).exact, normalProb(360, 6, 380, Infinity).exact],
    explanation: t`The mass used is $3X$ (one cup tripled), so $3X \sim \mathrm{N}(360, 9 \times 36) = \mathrm{N}(360, 324)$, standard deviation 18. $z = \frac{20}{18} = ${sfStr(20 / 18, 4)}$ and $\mathrm{P}(3X > 380) = ${s(r13.exact)}$, i.e. $${sfStr(r13.exact)}$. (Three separate cups would have variance $3 \times 36 = 108$ and give $${sfStr(normalProb(360, sqrt(108), 380, Infinity).exact)}$.)`,
    workedSolution: t`1. One cup tripled: $\mathrm{E}(3X) = 360$, $\mathrm{Var}(3X) = 9 \times 36 = 324$.
2. $3X \sim \mathrm{N}(360, 18^2)$.
3. $z = \dfrac{380 - 360}{18} = 1.111$; $1 - \Phi(1.111) = ${s(r13.exact)}$.
4. Answer $${sfStr(r13.exact)}$.`,
    hints: ["Is this one cup multiplied by 3, or three different cups?"],
  });

  // Y = 1.5X + 2 (cost in US$ of a job lasting X hours)
  const r14 = normalProb(6.5, 1.5 * 0.4, 7, Infinity);
  chk(1.5 * 3 + 2, 6.5);
  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The time, $X$ hours, that a technician spends on a repair is distributed as $\mathrm{N}(3, 0.4^2)$. The charge for a repair is $C = 1.5X + 2$ (in US dollars). Find the probability that a repair costs more than US\$7. Give your answer correct to 3 significant figures.`,
    value: r14.exact, tol: r14.tol, wrong: [normalProb(6.5, 0.4, 7, Infinity).exact, normalProb(6.5, 1.5 * 1.5 * 0.4, 7, Infinity).exact],
    explanation: t`$\mathrm{E}(C) = 1.5 \times 3 + 2 = 6.5$ and $\mathrm{SD}(C) = 1.5 \times 0.4 = 0.6$, so $C \sim \mathrm{N}(6.5, 0.6^2)$. $z = \frac{7 - 6.5}{0.6} = 0.8333$, so $\mathrm{P}(C > 7) = ${s(r14.exact)}$, i.e. $${sfStr(r14.exact)}$. (Equivalently, $X > 3.333$.)`,
    hints: ["Multiply the standard deviation by 1.5 (the variance by 2.25)."],
  });

  const n15 = ceil((1.645 / 0.125) ** 2);
  chk(n15, 174);
  chk(Phi(-0.125 * sqrt(173)) > 0.05 && Phi(-0.125 * sqrt(174)) < 0.05 ? 1 : 0, 1);
  b.num({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: t`Bags of fertiliser have masses distributed as $\mathrm{N}(25, 0.8^2)$ kg, independently. A farmer orders $n$ bags. Find the smallest $n$ for which the probability that the total mass of the $n$ bags is less than $24.9n$ kg is below 0.05.`,
    value: n15, wrong: [173, 14],
    explanation: t`$T \sim \mathrm{N}(25n, 0.64n)$. $\mathrm{P}(T < 24.9n) = \Phi\left(\frac{-0.1n}{0.8\sqrt{n}}\right) = \Phi(-0.125\sqrt{n}) < 0.05$ needs $0.125\sqrt{n} > 1.645$, so $\sqrt{n} > 13.16$ and $n > ${sfStr((1.645 / 0.125) ** 2, 5)}$. The smallest whole number is $n = 174$. (14 is the bound on $\sqrt{n}$, not on $n$.)`,
    hints: ["Write the mean and variance of the total in terms of n.", "The z-value simplifies to −0.125√n."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Rudo says: "If $X$ and $Y$ are independent, then $\mathrm{Var}(X - Y) = \mathrm{Var}(X) - \mathrm{Var}(Y)$." Explain why she is wrong, and give one situation in which her formula would give an impossible answer.`,
    points: [
      t`States that $\mathrm{Var}(X - Y) = \mathrm{Var}(X) + (-1)^2\mathrm{Var}(Y) = \mathrm{Var}(X) + \mathrm{Var}(Y)$: the uncertainty in $Y$ adds to the uncertainty of the difference.`,
      t`Gives an impossible case, e.g. $\mathrm{Var}(Y) > \mathrm{Var}(X)$ would make her variance negative (or $X - X'$ of two identical distributions would have variance 0, i.e. no variation).`,
    ],
    modelAnswer: "The coefficient of Y is −1 and it is squared, so Var(X − Y) = Var(X) + Var(Y). A difference of two random quantities is more variable than either. If Var(X) = 4 and Var(Y) = 9, her formula gives −5, but a variance can never be negative.",
    explanation: "Variances of independent variables always add, whether the variables are added or subtracted.",
    hints: ["What happens to the coefficient −1 in the formula?"],
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`$X_1$ and $X_2$ are independent, each with distribution $\mathrm{N}(10, 4)$. What is the distribution of $X_1 - 2X_2$?`,
    options: [
      [t`$\mathrm{N}(-10, 20)$`, t`Correct: mean $10 - 20 = -10$; variance $4 + (-2)^2 \times 4 = 20$.`],
      [t`$\mathrm{N}(-10, 12)$`, t`This uses $4 + 2 \times 4$: the coefficient $-2$ must be squared.`],
      [t`$\mathrm{N}(-10, -4)$`, "A variance cannot be negative: the variances are added, not subtracted."],
      [t`$\mathrm{N}(10, 20)$`, t`The mean is $10 - 2 \times 10 = -10$, not $+10$.`],
    ],
    answer: "A",
    explanation: t`$\mathrm{E}(X_1 - 2X_2) = 10 - 2(10) = -10$; $\mathrm{Var} = 1^2(4) + (-2)^2(4) = 20$; a combination of independent normals is normal.`,
    hints: ["Square each coefficient."],
  });

  // ------------------------------------------------------------ structured (5 marks)
  const a5 = pm(2.1, 3);
  const b5 = cdf(1.6, 1) * cdf(2.6, 1);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`A shop in Kwekwe sells solar lamps at random at an average rate of 0.8 per day and, independently, solar panels at an average rate of 1.3 per day. Give answers correct to 3 significant figures.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the probability that exactly 3 items (lamps and panels together) are sold on a particular day.", value: a5, wrong: [pm(0.8, 3) + pm(1.3, 3)],
        explanation: t`Total $\sim \mathrm{Po}(0.8 + 1.3) = \mathrm{Po}(2.1)$: $\mathrm{e}^{-2.1}\dfrac{2.1^3}{6} = ${s(a5)}$.` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the probability that, in a 2-day period, at most 1 lamp is sold and at most 1 panel is sold.", value: b5, wrong: [cdf(4.2, 2), cdf(2.1, 1) ** 2],
        explanation: t`In 2 days, lamps $L \sim \mathrm{Po}(1.6)$ and panels $Q \sim \mathrm{Po}(2.6)$. By independence $\mathrm{P}(L \le 1)\mathrm{P}(Q \le 1) = (2.6\mathrm{e}^{-1.6})(3.6\mathrm{e}^{-2.6}) = ${s(cdf(1.6, 1))} \times ${s(cdf(2.6, 1))} = ${s(b5)}$. (This is not $\mathrm{P}(L + Q \le 2)$, which allows 2 lamps and 0 panels.)` }),
    ],
    explanation: "Add Poisson rates for a total; scale each rate to the period; multiply probabilities of independent events.",
    hints: ["For a total, add the rates.", "In (b) the two conditions are separate: multiply."],
  });

  // ------------------------------------------------------------ structured (13 marks)
  const muT = 400 + 12 * 260;
  const varT = 20 ** 2 + 12 * 25 ** 2;
  chk(muT, 3520); chk(varT, 7900);
  const rT = normalProb(muT, sqrt(varT), 3650, Infinity);
  const rD = 2 * (1 - Phi(40 / sqrt(1250)));
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`Mangoes from a farm near Mutoko have masses $M \sim \mathrm{N}(260, 25^2)$ grams. Empty packing boxes have masses $B \sim \mathrm{N}(400, 20^2)$ grams. A full box holds 12 mangoes. All masses are independent.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the mean and the variance of the total mass T, in grams, of a full box (the box and its 12 mangoes).", template: "mean = {{blank:m}} g, variance = {{blank:v}} g²",
        blanks: [D("m", muT, 0.01, "3520", 1), D("v", varT, 0.01, "90400", 2)],
        wrong: [["3120", "90400"]],
        explanation: t`$\mathrm{E}(T) = 400 + 12 \times 260 = 3520$; $\mathrm{Var}(T) = 20^2 + 12 \times 25^2 = 400 + 7500 = 7900$. ($90\,400 = 400 + 144 \times 625$ wrongly uses $12M$.)` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the probability that a full box has a total mass of more than 3650 g. Give your answer correct to 3 significant figures.", value: rT.exact, tol: rT.tol, wrong: [normalProb(muT, sqrt(90400), 3650, Infinity).exact],
        explanation: t`$T \sim \mathrm{N}(3520, 7900)$: $z = \frac{130}{\sqrt{7900}} = ${sfStr(130 / sqrt(7900), 4)}$, $\mathrm{P}(T > 3650) = ${s(rT.exact)}$.` }),
      P.num({ label: "(c)", marks: 4, stem: "Two mangoes are chosen at random. Find the probability that their masses differ by more than 40 g. Give your answer correct to 3 significant figures.", value: rD, tol: 0.0015, wrong: [rD / 2, 2 * (1 - Phi(40 / 50))],
        explanation: t`$D = M_1 - M_2 \sim \mathrm{N}(0, 625 + 625) = \mathrm{N}(0, 1250)$. $\mathrm{P}(|D| > 40) = 2\left(1 - \Phi\left(\frac{40}{\sqrt{1250}}\right)\right) = 2(1 - \Phi(${sfStr(40 / sqrt(1250), 4)})) = ${s(rD)}$. (Giving $${sfStr(rD / 2)}$ counts only one mango being heavier.)` }),
      P.manual({ label: "(d)", marks: 1, stem: "State an assumption needed for your answer to (b) that is not given in the question.",
        points: ["States that the 12 mangoes in a box are a random selection (their masses independent of each other and of the box), e.g. the packer does not choose mangoes of similar size."],
        modelAnswer: "The mangoes put in a box are chosen at random, so their masses are independent of each other and of the box's mass.", explanation: "Independence is the key assumption for adding variances." }),
      P.manual({ label: "(e)", marks: 2, stem: t`A trader estimates the variance of the mass of the 12 mangoes as $\mathrm{Var}(12M) = 144 \times 625$. Explain why this is not correct.`,
        points: [t`$12M$ is one mango's mass multiplied by 12, but the box holds 12 different mangoes, $M_1 + \dots + M_{12}$.`, t`For independent mangoes the variance is $12 \times 625 = 7500$, smaller than $144 \times 625$ because the variations partly cancel.`],
        modelAnswer: "Var(12M) treats the box as 12 copies of one mango, so one mango's deviation is multiplied by 12. The 12 mangoes are different and independent, so the correct variance is Var(M₁ + … + M₁₂) = 12 × 625 = 7500; heavy and light mangoes partly cancel.",
        explanation: "The difference between nX and X₁ + … + Xₙ." }),
    ],
    explanation: "Totals add means and variances; differences add variances too; independence is essential.",
    hints: ["T = B + M₁ + … + M₁₂.", "In (c), 'differ by more than 40' covers both directions."],
  });

  // ------------------------------------------------------------ flashcards
  b.card("FORMULA", t`$\mathrm{E}(aX + b)$ and $\mathrm{Var}(aX + b)$`, t`$a\,\mathrm{E}(X) + b$ and $a^2\,\mathrm{Var}(X)$`);
  b.card("FORMULA", t`$\mathrm{Var}(aX + bY)$ for independent $X$, $Y$`, t`$a^2\,\mathrm{Var}(X) + b^2\,\mathrm{Var}(Y)$`);
  b.card("FACT", t`$\mathrm{Var}(X - Y)$ for independent $X$, $Y$`, t`$\mathrm{Var}(X) + \mathrm{Var}(Y)$: variances add even for a difference.`);
  b.card("CONCEPT", t`$2X$ versus $X_1 + X_2$`, t`Both have mean $2\mu$; $\mathrm{Var}(2X) = 4\sigma^2$ but $\mathrm{Var}(X_1 + X_2) = 2\sigma^2$.`);
  b.card("FACT", "Linear combinations of independent normal variables", t`They are normal: $aX + bY \sim \mathrm{N}(a\mu_X + b\mu_Y,\ a^2\sigma_X^2 + b^2\sigma_Y^2)$.`);
  b.card("FACT", "Sum of independent Poisson variables", t`$\mathrm{Po}(\lambda) + \mathrm{Po}(\mu) = \mathrm{Po}(\lambda + \mu)$`, "Only sums: 2X and X − Y are not Poisson.");
  b.card("CONCEPT", t`How to find $\mathrm{P}(A > B)$`, t`Let $D = A - B$, find its distribution, then $\mathrm{P}(D > 0)$.`);
  b.card("FACT", "Effect of adding a constant on the variance", t`None: $\mathrm{Var}(X + c) = \mathrm{Var}(X)$.`);
  b.card("CONCEPT", "Standard deviations of sums", "Never add standard deviations; add variances, then take the square root.");
});
