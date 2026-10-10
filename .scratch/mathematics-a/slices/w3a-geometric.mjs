// W3a: amaths.discrete.geometric (probabilities from geo.*, checked against direct sums)
import { concept, P, t, chk, geo, binom, sfStr, ZS } from "../lib.mjs";

const S3 = (x) => sfStr(x, 3);
const sumPmf = (p, a, b) => { let s = 0; for (let r = a; r <= b; r++) s += geo.pmf(p, r); return s; };

concept("amaths.discrete.geometric", { file: "discrete/geometric", keyPrefix: "discrete.geometric" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$X \sim \mathrm{Geo}(p)$. Which expression gives $\mathrm{P}(X = r)$?`,
    options: [
      [t`$(1 - p)^{r - 1}p$`, "Correct: r − 1 failures, then the first success."],
      [t`$(1 - p)^r p$`, "This has one failure too many: it is P(X = r + 1)."],
      [t`$p^{r - 1}(1 - p)$`, "Success and failure are swapped."],
      [t`${"$"}{}^rC_1(1 - p)^{r - 1}p$`, "The success must come last, so there is only one order: no coefficient."],
    ],
    answer: "A",
    explanation: t`The first success on trial $r$ needs failures on trials $1$ to $r - 1$: $(1 - p)^{r - 1}p$.`,
  });

  const v1 = geo.pmf(0.25, 5);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`$X \sim \mathrm{Geo}(0.25)$. Find $\mathrm{P}(X = 5)$, correct to 3 significant figures.`,
    value: v1, wrong: [Number(S3(geo.pmf(0.25, 6))), Number(S3(0.25 ** 4 * 0.75))],
    explanation: t`$\mathrm{P}(X = 5) = 0.75^4 \times 0.25 = 0.31640625 \times 0.25 = ${S3(v1)}$. ($${S3(geo.pmf(0.25, 6))}$ uses $0.75^5$, one failure too many.)`,
  });
  chk(v1, 0.75 ** 4 * 0.25);

  const v2 = geo.gt(1 / 6, 4);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "Sipho throws a fair six-sided die until he gets a six. Find the probability that he needs more than 4 throws, correct to 3 significant figures.",
    value: v2, wrong: [Number(S3(geo.gt(1 / 6, 3))), Number(S3(geo.pmf(1 / 6, 5)))],
    explanation: t`More than 4 throws means the first 4 throws are not sixes: $\left(\frac{5}{6}\right)^4 = ${S3(v2)}$. ($${S3(geo.gt(1 / 6, 3))}$ is $\left(\frac{5}{6}\right)^3$, which is P(more than 3).)`,
  });
  chk(v2, 1 - (sumPmf(1 / 6, 1, 4)), 1e-12);

  const v3 = geo.cdf(0.15, 6);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "A borehole pump near Masvingo starts at the first press of the switch with probability 0.15, independently each time. Find the probability that it starts within the first 6 presses, correct to 3 significant figures.",
    value: v3, wrong: [Number(S3(geo.gt(0.15, 6))), Number(S3(geo.cdf(0.15, 5)))],
    explanation: t`$\mathrm{P}(X \le 6) = 1 - 0.85^6 = 1 - ${S3(0.85 ** 6)} = ${S3(v3)}$. ($${S3(0.85 ** 6)}$ is $\mathrm{P}(X > 6)$.)`,
  });
  chk(v3, sumPmf(0.15, 1, 6), 1e-12);

  const v4 = geo.gt(0.2, 2) - geo.gt(0.2, 6);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`$X \sim \mathrm{Geo}(0.2)$. Find $\mathrm{P}(3 \le X \le 6)$, correct to 3 significant figures.`,
    value: v4, wrong: [Number(S3(geo.gt(0.2, 3) - geo.gt(0.2, 6))), Number(S3(geo.gt(0.2, 2) - geo.gt(0.2, 7)))],
    explanation: t`$\mathrm{P}(3 \le X \le 6) = \mathrm{P}(X > 2) - \mathrm{P}(X > 6) = 0.8^2 - 0.8^6 = 0.64 - 0.262144 = ${S3(v4)}$. ($${S3(geo.gt(0.2, 3) - geo.gt(0.2, 6))}$ uses $0.8^3$ and so leaves out $X = 3$.)`,
    hints: [t`$X \ge 3$ is the same as $X > 2$.`],
  });
  chk(v4, sumPmf(0.2, 3, 6), 1e-12);

  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "The probability that a call to a busy clinic in Harare is answered is 0.125 on each attempt, independently. Find the expected number of attempts needed to get through.",
    value: 8, wrong: [7, 0.125],
    explanation: t`$X \sim \mathrm{Geo}(0.125)$; $\mathrm{E}(X) = \frac{1}{0.125} = 8$ attempts.`,
  });
  chk(geo.mean(0.125), 8);

  b.fib({
    d: 3, skill: "APPLICATION", calculator: true, applies: ZS,
    stem: t`$X \sim \mathrm{Geo}(0.4)$. Find $\mathrm{Var}(X)$ and the standard deviation of $X$ (3 significant figures).`,
    template: "Var(X) = {{blank:v}}; sd = {{blank:s}}",
    blanks: [{ id: "v", input: "number", accepted: ["3.75"], tolerance: 0.0005, wrong: "1.5" }, { id: "s", input: "number", accepted: [S3(Math.sqrt(3.75))], tolerance: 0.005, wrong: "1.22" }],
    explanation: t`$\mathrm{Var}(X) = \frac{1 - p}{p^2} = \frac{0.6}{0.16} = 3.75$; sd $= \sqrt{3.75} = ${S3(Math.sqrt(3.75))}$. (1.5 is $\frac{0.6}{0.4}$, dividing by $p$ instead of $p^2$.)`,
    hints: ["ZIMSEC formula: Var(X) = (1 − p)/p²."],
  });
  chk(geo.variance(0.4), 3.75);

  // find p from P(X > 2)
  chk(0.7 ** 2, 0.49);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`$X \sim \mathrm{Geo}(p)$ and $\mathrm{P}(X > 2) = 0.49$. Find $p$ and hence $\mathrm{E}(X)$, correct to 3 significant figures. Give the value of $\mathrm{E}(X)$.`,
    value: 1 / 0.3, wrong: [1 / 0.7, 0.3],
    explanation: t`$(1 - p)^2 = 0.49$, so $1 - p = 0.7$ and $p = 0.3$. $\mathrm{E}(X) = \frac{1}{0.3} = 3.33$ (3 s.f.). ($\frac{1}{0.7} = 1.43$ uses $1 - p$ in place of $p$.)`,
    hints: [t`$\mathrm{P}(X > r) = (1 - p)^r$.`],
  });

  // least n
  let n0 = 1; while (geo.cdf(0.08, n0) <= 0.75) n0++;
  chk(n0, 17);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "8% of the scratch cards sold at a shop in Kadoma win a prize. Chipo buys cards one at a time until she wins. Find the least number n such that the probability that she wins on or before her nth card is greater than 0.75.",
    value: n0, wrong: [16, 13],
    explanation: t`$1 - 0.92^n > 0.75 \Rightarrow 0.92^n < 0.25 \Rightarrow n > \frac{\ln 0.25}{\ln 0.92} = ${S3(Math.log(0.25) / Math.log(0.92))}$. Check: $1 - 0.92^{16} = ${S3(geo.cdf(0.08, 16))}$, $1 - 0.92^{17} = ${S3(geo.cdf(0.08, 17))}$. So $n = 17$. (16 rounds down.)`,
    hints: ["P(X ≤ n) = 1 − 0.92ⁿ.", "ln 0.92 is negative: the inequality reverses."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "In each option X is the number of the items described. Which X is best modelled by a geometric distribution?",
    options: [
      ["seeds planted until the first one germinates", "Correct: independent trials until the first success."],
      ["seeds that germinate in a row of 20 seeds", "A fixed number of trials and a count of successes: binomial."],
      ["weeds counted in one square metre of a field", "Counts in an area suit a Poisson model."],
      ["the height of a maize plant after six weeks", "Height is continuous, not a count of trials."],
    ],
    answer: "A",
    explanation: "A geometric variable counts trials up to and including the first success.",
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`$X \sim \mathrm{Geo}(p)$. Which expression equals $\mathrm{P}(X \ge 5)$?`,
    options: [
      [t`$(1 - p)^4$`, "Correct: X ≥ 5 means the first 4 trials fail."],
      [t`$(1 - p)^5$`, "This is P(X > 5) = P(X ≥ 6)."],
      [t`$1 - (1 - p)^5$`, "This is P(X ≤ 5)."],
      [t`$1 - (1 - p)^4$`, "This is P(X ≤ 4), the complement of the required event."],
    ],
    answer: "A",
    explanation: t`$\mathrm{P}(X \ge 5) = \mathrm{P}(X > 4) = (1 - p)^4$.`,
    hints: ["Rewrite X ≥ 5 as X > 4."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For $X \sim \mathrm{Geo}(p)$, the most likely value of $X$ is always 1, whatever the value of $p$.`,
    answer: true,
    explanation: t`$\mathrm{P}(X = r + 1) = (1 - p)\,\mathrm{P}(X = r) < \mathrm{P}(X = r)$, so the probabilities decrease from $r = 1$: the mode is 1.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For $X \sim \mathrm{Geo}(p)$, $\mathrm{P}(X = 0) = p$.`,
    answer: false,
    explanation: "X counts trials up to and including the first success, so its smallest value is 1 and P(X = 0) = 0.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$X \sim \mathrm{Geo}(0.3)$. Match each probability with its value.`,
    pairs: [
      [t`$\mathrm{P}(X = 2)$`, t`$0.7 \times 0.3 = 0.21$`],
      [t`$\mathrm{P}(X > 2)$`, t`$0.7^2 = 0.49$`],
      [t`$\mathrm{P}(X \le 2)$`, t`$1 - 0.7^2 = 0.51$`],
      [t`$\mathrm{P}(X \ge 2)$`, t`$0.7^1 = 0.7$`],
    ],
    explanation: t`$\mathrm{P}(X = r) = 0.7^{r - 1}(0.3)$; $\mathrm{P}(X > r) = 0.7^r$; $\mathrm{P}(X \le r) = 1 - 0.7^r$; $X \ge 2$ is $X > 1$.`,
  });
  chk(geo.pmf(0.3, 2), 0.21); chk(geo.gt(0.3, 2), 0.49); chk(geo.cdf(0.3, 2), 0.51); chk(geo.gt(0.3, 1), 0.7);

  // geometric vs binomial
  const g = geo.pmf(1 / 6, 4), bb = binom.pmf(10, 1 / 6, 2);
  b.fib({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: "A fair die is thrown repeatedly. Find, to 3 significant figures, (i) the probability that the first six occurs on the 4th throw, and (ii) the probability that exactly two sixes occur in the first 10 throws.",
    template: "(i) {{blank:a}}; (ii) {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [S3(g)], tolerance: 0.0005, wrong: S3((1 / 6) ** 3 * (5 / 6)) }, { id: "b", input: "number", accepted: [S3(bb)], tolerance: 0.0005, wrong: S3((1 / 6) ** 2 * (5 / 6) ** 8) }],
    explanation: t`(i) Geometric: $\left(\frac{5}{6}\right)^3 \frac{1}{6} = ${S3(g)}$. (ii) Binomial $\mathrm{B}(10, \frac{1}{6})$: ${"$"}{}^{10}C_2\left(\frac{1}{6}\right)^2\left(\frac{5}{6}\right)^8 = ${S3(bb)}$.`,
    hints: ["The first part waits for a first success; the second fixes the number of throws."],
  });

  b.manualShort({
    d: 3, marks: 2, skill: "EVALUATION", calculator: false,
    stem: "Tendai keeps asking friends to lend him a calculator until one agrees, and models the number of friends asked by Geo(0.3). State two assumptions of this model and comment on whether they are realistic.",
    points: ["Each friend agrees with the same probability 0.3 — unrealistic if some friends are much more willing than others.", "Friends' answers are independent — may fail if friends talk to each other or he asks the most likely friend first."],
    modelAnswer: "The model assumes every friend agrees with the same probability, 0.3, and that the answers are independent. Both are doubtful: friends differ in willingness, and Tendai probably asks his closest friends first, so p is not constant.",
    explanation: "State the geometric conditions in context and judge them.",
    hints: ["Constant p and independence are the key assumptions."],
  });

  // structured practice (5 marks)
  const pS = 0.35;
  const a5 = geo.pmf(pS, 3), b5 = geo.gt(pS, 5);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: "In a game at a school fête in Gweru, a player throws a beanbag at a target until it lands in the target. The probability of landing in the target is 0.35 on each throw, independently.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the probability that the beanbag first lands in the target on the 3rd throw, correct to 3 significant figures.", value: a5, wrong: [Number(S3(0.65 ** 3 * 0.35))],
        explanation: t`$0.65^2 \times 0.35 = 0.4225 \times 0.35 = ${S3(a5)}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the probability that more than 5 throws are needed, correct to 3 significant figures.", value: b5, wrong: [Number(S3(0.65 ** 4))],
        explanation: t`$0.65^5 = ${S3(b5)}$: the first five throws all miss.` }),
      P.num({ label: "(c)", marks: 1, stem: "Find the expected number of throws, correct to 3 significant figures.", value: 1 / pS, wrong: [Number(S3(1 / 0.65))],
        explanation: t`$\frac{1}{0.35} = ${S3(1 / pS)}$.` }),
    ],
    explanation: "Geo(0.35): P(X = r) = 0.65^(r−1)(0.35), P(X > r) = 0.65^r, E(X) = 1/0.35.",
    hints: ["Define X ~ Geo(0.35)."],
  });

  // structured practice (12 marks): two players alternate
  // Rudo and Farai take turns to throw a die, Rudo first; first to throw a six wins.
  const q = 5 / 6;
  const rudoWins = (1 / 6) / (1 - q * q);
  chk(rudoWins, 6 / 11);
  let s = 0; for (let k = 0; k < 200; k++) s += q ** (2 * k) * (1 / 6); chk(s, 6 / 11, 1e-12);
  const pRudo3rd = q ** 4 * (1 / 6); // Rudo wins on his 3rd throw = overall throw 5
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "Rudo and Farai take turns to throw a fair six-sided die, with Rudo throwing first. The first person to throw a six wins. Let X be the number of the throw (counting both players' throws) on which the first six occurs.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "State the distribution of X.", options: [[t`$\mathrm{Geo}\left(\frac{1}{6}\right)$`, "Correct: independent throws until the first six."], [t`$\mathrm{B}\left(2, \frac{1}{6}\right)$`, "There is no fixed number of throws."], [t`$\mathrm{Geo}\left(\frac{5}{6}\right)$`, "p is the probability of success, a six: 1/6."], [t`$\mathrm{B}\left(6, \frac{1}{6}\right)$`, "There is no fixed number of throws."]], answer: "A",
        explanation: "Each throw is independent with P(six) = 1/6; X counts throws until the first six." }),
      P.num({ label: "(b)", marks: 2, stem: "Find the probability that Rudo wins on his third throw, correct to 3 significant figures.", value: pRudo3rd, wrong: [Number(S3(q ** 2 * (1 / 6)))],
        explanation: t`Rudo's third throw is throw number 5 overall: $\mathrm{P}(X = 5) = \left(\frac{5}{6}\right)^4 \frac{1}{6} = ${S3(pRudo3rd)}$. ($${S3(q ** 2 / 6)}$ forgets Farai's throws.)` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the probability that the game lasts more than 6 throws, correct to 3 significant figures.", value: q ** 6, wrong: [Number(S3(q ** 5))],
        explanation: t`$\mathrm{P}(X > 6) = \left(\frac{5}{6}\right)^6 = ${S3(q ** 6)}$.` }),
      P.proof({ label: "(d)", marks: 4, stem: t`Show that the probability that Rudo wins is $\frac{6}{11}$.`,
        points: ["M1 Rudo wins if X = 1, 3, 5, …", t`M1 writes $\frac{1}{6} + \left(\frac{5}{6}\right)^2\frac{1}{6} + \left(\frac{5}{6}\right)^4\frac{1}{6} + \cdots$`, t`M1 identifies a geometric series with first term $\frac{1}{6}$ and ratio $\frac{25}{36}$ and uses $\frac{a}{1 - r}$.`, t`A1 obtains $\frac{1/6}{11/36} = \frac{6}{11}$.`],
        modelAnswer: t`$$
\mathrm{P}(\text{Rudo wins}) = \frac{1}{6} + \left(\frac{5}{6}\right)^2\frac{1}{6} + \left(\frac{5}{6}\right)^4\frac{1}{6} + \cdots
$$
$$
= \frac{\frac{1}{6}}{1 - \frac{25}{36}} = \frac{1}{6} \times \frac{36}{11} = \frac{6}{11}
$$` }),
      P.num({ label: "(e)", marks: 3, stem: "Given that Rudo wins, find the probability that he wins on his first throw. Give your answer as a fraction or a decimal correct to 3 significant figures.", value: (1 / 6) / (6 / 11), wrong: [1 / 6],
        explanation: t`$\mathrm{P}(X = 1 \mid \text{Rudo wins}) = \frac{1/6}{6/11} = \frac{11}{36} \approx ${S3(11 / 36)}$.` }),
    ],
    explanation: "The game is one geometric sequence of throws; Rudo has the odd-numbered throws, which form a geometric series.",
    hints: ["Rudo throws on throws 1, 3, 5, …", "Sum to infinity: a/(1 − r)."],
  });

  b.card("DEFINITION", "Geometric conditions", "Independent trials, constant probability p of success, continued until the first success.");
  b.card("FORMULA", "Geometric probability", t`$\mathrm{P}(X = r) = (1 - p)^{r - 1}p$, $r = 1, 2, 3, \ldots$`, "In MF19.");
  b.card("FORMULA", "Geometric tail", t`$\mathrm{P}(X > r) = (1 - p)^r$; $\mathrm{P}(X \le r) = 1 - (1 - p)^r$`);
  b.card("FORMULA", "Geometric mean", t`$\mathrm{E}(X) = \dfrac{1}{p}$`, "In MF19.");
  b.card("FORMULA", "Geometric variance (ZIMSEC)", t`$\mathrm{Var}(X) = \dfrac{1 - p}{p^2}$`, "Cambridge requires the expectation only.", { applies: ZS });
  b.card("CONCEPT", "Between two values", t`$\mathrm{P}(a \le X \le b) = (1 - p)^{a - 1} - (1 - p)^b$`);
  b.card("FACT", "Mode", "The mode of every geometric distribution is 1.");
  b.card("CONCEPT", "Geometric vs binomial", "Binomial: fixed number of trials, count successes. Geometric: count trials until the first success.");
});
