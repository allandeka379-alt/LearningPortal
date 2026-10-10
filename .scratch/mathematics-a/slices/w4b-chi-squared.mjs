// W4b: amaths.inference.chi-squared (ZIMSEC only: Statistics F6)
import { concept, P, t, chk, chi2Stat, chi2Table, expectedTable, poisson, binom, table } from "../lib.mjs";
import { f3, f4, NB } from "../tables/w4b-kit.mjs";

const C = (nu, a) => chi2Table(nu, a).toFixed(3);

concept("amaths.inference.chi-squared", { file: "inference/chi-squared", keyPrefix: "inference.chi-squared" }, (b) => {
  // q01 dof of a 3 × 4 table
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "A contingency table with 3 rows and 4 columns is used to test whether two classifications are independent. How many degrees of freedom does the test have?",
    options: [
      ["6", "Correct: ν = (3 − 1)(4 − 1) = 2 × 3."],
      ["12", "This is the number of cells; the row and column totals impose constraints."],
      ["11", "This is the number of cells minus 1, the rule for a goodness-of-fit test with nothing estimated."],
      ["5", "This adds (3 − 1) + (4 − 1); the degrees of freedom are the product."],
    ],
    answer: "A",
    explanation: t`$\nu = (r - 1)(c - 1) = 2 \times 3 = 6$.`,
  });

  // q02 tf upper tail
  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "A χ² goodness-of-fit test rejects the null hypothesis when the test statistic is larger than the upper critical value.",
    answer: true,
    explanation: t`A large $X^2 = \sum \frac{(O - E)^2}{E}$ means the observed and expected frequencies are far apart, so the test is upper-tailed.`,
  });

  // q03 expected frequency
  chk((60 * 45) / 150, 18, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "In a contingency table with grand total 150, one cell is in a row with total 60 and a column with total 45. Find the expected frequency for this cell if the classifications are independent.",
    value: 18, wrong: [f3(60 * 45 / 100), 27],
    explanation: t`$E = \frac{\text{row total} \times \text{column total}}{\text{grand total}} = \frac{60 \times 45}{150} = 18$.`,
  });

  // q04 X² for given O and E
  const x4 = chi2Stat([18, 22, 20, 40], [25, 25, 25, 25]);
  chk(x4, 12.32, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Observed frequencies $18, 22, 20, 40$ are compared with expected frequencies of $25$ in each class. Calculate $X^2 = \sum \frac{(O - E)^2}{E}$.`,
    value: x4, wrong: [f3((49 + 9 + 25 + 225) / 100), 308],
    explanation: t`$X^2 = \frac{7^2 + 3^2 + 5^2 + 15^2}{25} = \frac{308}{25} = 12.32$. ($308$ forgets to divide by $E$.)`,
  });

  // q05 dof Poisson estimated
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A Poisson model is fitted to a frequency distribution, with λ estimated from the sample mean. After combining classes with expected frequencies below 5, there are 6 classes. How many degrees of freedom does the χ² test have?",
    options: [
      ["4", "Correct: ν = 6 − 1 − 1: one for the total and one for the estimated λ."],
      ["5", "This forgets that λ was estimated from the data."],
      ["6", "The total frequency is always a constraint, so subtract at least 1."],
      ["3", "Only one parameter (λ) is estimated for a Poisson model."],
    ],
    answer: "A",
    explanation: t`$\nu = k - 1 - m = 6 - 1 - 1 = 4$.`,
  });

  // q06 critical value
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "State the upper 5% critical value of the χ² distribution with 3 degrees of freedom, correct to 3 decimal places.",
    value: chi2Table(3, 0.05), dp: 3, wrong: [C(3, 0.01), C(4, 0.05)],
    explanation: t`$\chi^2_3(5\%) = ${C(3, 0.05)}$. ($${C(3, 0.01)}$ is the 1% point; $${C(4, 0.05)}$ uses $\nu = 4$.)`,
  });

  // q07 genetic ratio
  const x7 = chi2Stat([97, 28, 25, 10], [90, 30, 30, 10]);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A theory predicts that four types of bean plant occur in the ratio $9 : 3 : 3 : 1$. In a sample of $160$ plants from a Chinhoyi research station the numbers were $97$, $28$, $25$ and $10$. Calculate the $\chi^2$ test statistic for testing the theory, correct to 3 significant figures.`,
    value: x7, wrong: [f3(chi2Stat([97, 28, 25, 10], [40, 40, 40, 40]))],
    explanation: t`Expected: $\frac{9}{16} \times 160 = 90$, $30$, $30$, $10$. $X^2 = \frac{7^2}{90} + \frac{2^2}{30} + \frac{5^2}{30} + 0 = ${f3(x7)}$. (Using $40$ in each class ignores the ratio.)`,
    workedSolution: t`1. Expected frequencies: $90, 30, 30, 10$.
2. Contributions: $\frac{49}{90} = ${f4(49 / 90)}$, $\frac{4}{30} = ${f4(4 / 30)}$, $\frac{25}{30} = ${f4(25 / 30)}$, $0$.
3. $X^2 = ${f3(x7)}$.`,
    hints: ["Share 160 in the ratio 9 : 3 : 3 : 1 first."],
  });

  // q08 Poisson expected frequencies
  const e8 = [0, 1].map((r) => 100 * poisson.pmf(1.4, r));
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The number of breakdowns per day of the Harare–Mutare commuter train is to be tested against the model $\mathrm{Po}(1.4)$ using records for $100$ days. Find the expected numbers of days with $0$ breakdowns and with $1$ breakdown, correct to 3 significant figures.`,
    template: "0 breakdowns: {{blank:a}} days, 1 breakdown: {{blank:b}} days",
    blanks: [NB("a", e8[0], f3(poisson.pmf(1.4, 0))), NB("b", e8[1], 140)],
    explanation: t`$E = 100\,\mathrm{P}(X = r)$: $100\mathrm{e}^{-1.4} = ${f3(e8[0])}$ and $100 \times 1.4\mathrm{e}^{-1.4} = ${f3(e8[1])}$. ($140$ forgets the factor $\mathrm{e}^{-1.4}$.)`,
    hints: ["Multiply each Poisson probability by the number of days."],
  });

  // q09 combining classes
  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "In a goodness-of-fit test, the last class has expected frequency 2.6. What should be done?",
    options: [
      ["Combine it with a neighbouring class, adding both O and E", "Correct: this keeps every E at least 5, and the degrees of freedom use the classes after combining."],
      ["Leave it out of the calculation", "Dropping a class throws away data and makes the totals of O and E disagree."],
      ["Combine only the expected frequencies, not the observed ones", "O and E must be combined in the same way, so each class has one O and one E."],
      ["Round the expected frequency up to 5", "Expected frequencies come from the model; they cannot be changed."],
    ],
    answer: "A",
    explanation: "The χ² approximation needs every expected frequency to be at least 5, so merge small classes with a neighbour (O with O, E with E) and count the merged classes when finding ν.",
    hints: ["What must stay true about O and E in each class?"],
  });

  // q10 2 × 2 table
  const t10 = [[41, 19], [14, 26]];
  const e10 = expectedTable(t10);
  const x10 = chi2Stat(t10.flat(), e10.flat());
  chk(e10[0][0], 33, 1e-9);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A survey of $100$ farmers in Gokwe records whether they use irrigation and whether their cotton yield was above average:

${table(["", "Above average", "Not above average"], [["Irrigation", 41, 19], ["No irrigation", 14, 26]])}

Calculate the $\chi^2$ statistic for testing independence, correct to 3 significant figures.`,
    value: x10, wrong: [f3(chi2Stat(t10.flat(), [25, 25, 25, 25]))],
    explanation: t`Row totals $60, 40$; column totals $55, 45$. Expected: $33, 27, 22, 18$. $X^2 = \frac{8^2}{33} + \frac{8^2}{27} + \frac{8^2}{22} + \frac{8^2}{18} = ${f3(x10)}$.`,
    workedSolution: t`1. $E_{11} = \frac{60 \times 55}{100} = 33$; then $27$, $22$, $18$ from the totals.
2. Every $|O - E| = 8$.
3. $X^2 = 64\left(\frac{1}{33} + \frac{1}{27} + \frac{1}{22} + \frac{1}{18}\right) = ${f3(x10)}$.`,
    hints: ["E = row total × column total / 100."],
  });

  // q11 decision
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`A goodness-of-fit test with $3$ degrees of freedom gives $X^2 = 5.2$. The critical value at the 5% level is $${C(3, 0.05)}$. What is the conclusion?`,
    options: [
      ["Do not reject H₀: the data are consistent with the model", t`Correct: $5.2 < ${C(3, 0.05)}$, so the statistic is not in the upper critical region.`],
      ["Reject H₀: the model does not fit", "Rejection needs X² greater than the critical value."],
      ["Reject H₀, because 5.2 is greater than the number of degrees of freedom", "The comparison is with the critical value, not with ν."],
      ["The model is proved correct", "Not rejecting H₀ shows only that there is insufficient evidence against the model."],
    ],
    answer: "A",
    explanation: t`$5.2 < ${C(3, 0.05)}$: do not reject $H_0$ at the 5% level.`,
    hints: ["Is X² above the critical value?"],
  });

  // q12 match dof
  b.match({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Match each test with its number of degrees of freedom (classes counted after any combining).",
    pairs: [
      ["Uniform model, 6 classes", "5"],
      ["Binomial model with p estimated, 5 classes", "3"],
      ["Independence in a 3 × 3 table", "4"],
      ["Poisson model with λ given, 7 classes", "6"],
    ],
    explanation: t`Goodness of fit: $\nu = k - 1 - m$ ($6 - 1$; $5 - 1 - 1$; $7 - 1$ with nothing estimated). Contingency: $(3 - 1)(3 - 1) = 4$.`,
    hints: ["Subtract one for the total and one for each estimated parameter."],
  });

  // q13 why combine
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Explain why classes with small expected frequencies are combined before a χ² test is carried out.",
    points: ["The statistic Σ(O − E)²/E only approximately follows a χ² distribution, and the approximation is poor when expected frequencies are small (below 5).", "A small E in the denominator can make one class's contribution very large, distorting the test."],
    modelAnswer: "The χ² distribution is only an approximation to the distribution of X², valid when every expected frequency is at least 5. With a small E, a small difference O − E gives a huge contribution, so the test becomes unreliable.",
    explanation: "Rule of 5: every E ≥ 5.",
  });

  // q14 tf estimating a parameter
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Estimating a parameter of the model from the data increases the number of degrees of freedom by one.",
    answer: false,
    explanation: "Each estimated parameter is an extra constraint on the expected frequencies, so it REDUCES the degrees of freedom by one.",
  });

  // q15 estimate p for a binomial fit
  const f15 = [6, 19, 17, 8];
  const p15 = (0 * 6 + 1 * 19 + 2 * 17 + 3 * 8) / 150;
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Chipo throws $3$ maize seeds into each of $50$ planting holes and records how many germinate: $0$ in $6$ holes, $1$ in $19$, $2$ in $17$ and $3$ in $8$. To fit a model $\mathrm{B}(3, p)$, estimate $p$, correct to 3 significant figures.`,
    value: p15, wrong: [f3(77 / 50), f3(77 / 200)],
    explanation: t`Seeds germinated: $0(6) + 1(19) + 2(17) + 3(8) = 77$ out of $3 \times 50 = 150$ seeds, so $\hat{p} = \frac{77}{150} = ${f3(p15)}$. ($1.54$ is the mean number per hole, which is $3\hat{p}$.)`,
    hints: ["Mean number per hole = 3p."],
  });

  // q16 comment on contributions
  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: t`In a test for independence between school type (boarding, day) and choice of A-Level stream (sciences, commercials, arts), $H_0$ is rejected. The largest contribution to $X^2$ comes from boarding schools and sciences, where $O = 48$ and $E = 35.2$. Comment on what this shows.`,
    points: ["More boarding-school learners choose sciences than would be expected if the classifications were independent (48 against 35.2).", "So the association is mainly that boarding schools have a higher proportion of science learners; this is association, not proof of cause."],
    modelAnswer: "Boarding-school learners are more likely to take sciences than independence would predict (48 observed vs 35.2 expected). This cell drives the association, but the test does not show that boarding causes the choice.",
    explanation: "Interpret the sign of O − E in the largest cells.",
    hints: ["Compare O with E: more or fewer than expected?"],
  });

  // q17 struct 5: uniform fit
  const x17 = chi2Stat([27, 31, 19, 23], [25, 25, 25, 25]);
  chk(x17, 3.2, 1e-9);
  if (!(x17 < chi2Table(3, 0.05))) throw new Error("q17 conclusion");
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: "A Victoria Falls curio stall records 100 sales, classified by the part of the day: early morning 27, late morning 31, early afternoon 19, late afternoon 23. Tendai tests at the 5% level whether sales are equally likely in each slot.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the test statistic X².", value: x17, wrong: [80],
        explanation: t`$E = 25$ each. $X^2 = \frac{4 + 36 + 36 + 4}{25} = 3.2$. ($80$ forgets to divide by $E$.)` }),
      P.num({ label: "(b)", marks: 1, stem: "State the number of degrees of freedom.", value: 3, wrong: [4],
        explanation: t`$\nu = 4 - 1 = 3$; nothing is estimated.` }),
      P.mcq({ label: "(c)", marks: 2, stem: "What is the conclusion?",
        options: [
          ["Do not reject H₀: no significant evidence that sales depend on the time slot", t`Correct: $3.2 < ${C(3, 0.05)}$.`],
          ["Reject H₀: sales are not uniform", t`$3.2$ is below the critical value $${C(3, 0.05)}$.`],
          ["Reject H₀ because the morning slot has the most sales", "A single large class does not decide the test; the total X² does."],
          ["The test is invalid because the expected frequencies are too small", "Each expected frequency is 25, well above 5."],
        ],
        answer: "A", explanation: t`$\chi^2_3(5\%) = ${C(3, 0.05)}$ and $3.2 < ${C(3, 0.05)}$, so do not reject $H_0$.` }),
    ],
    explanation: "Uniform model: equal expected frequencies, ν = k − 1.",
    hints: ["E = 100/4."],
  });

  // q18 struct 15: Poisson fit with λ estimated
  const o18 = [57, 53, 45, 27, 12, 6];
  const N = 200;
  const lam = o18.reduce((s, f, r) => s + f * r, 0) / N;
  chk(lam, 1.51, 1e-12);
  const E18 = [0, 1, 2, 3].map((r) => N * poisson.pmf(lam, r));
  const E4p = N - E18.reduce((a, c) => a + c, 0);
  const E5p = E4p - N * poisson.pmf(lam, 4);
  const oc = [57, 53, 45, 27, 18], ec = [...E18, E4p];
  const x18 = chi2Stat(oc, ec);
  if (!(E5p < 5 && E4p >= 5)) throw new Error("q18 combining");
  if (!(x18 > chi2Table(3, 0.05) && x18 < chi2Table(3, 0.01))) throw new Error("q18 conclusion");
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The number of text messages received per minute by a Bulawayo radio phone-in line was recorded for $200$ minutes. No minute had more than $5$ messages.

${table(["Messages", "0", "1", "2", "3", "4", "5"], [["Minutes", ...o18]])}`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean number of messages per minute.", value: lam, wrong: [f3(302 / 6)],
        explanation: t`$\frac{0(57) + 1(53) + 2(45) + 3(27) + 4(12) + 5(6)}{200} = \frac{302}{200} = 1.51$.` }),
      P.fib({ label: "(b)", marks: 3, stem: "A Poisson distribution with this mean is fitted. Find the expected frequencies for 0, 1 and 2 messages, correct to 3 significant figures.", template: "0: {{blank:a}}, 1: {{blank:b}}, 2: {{blank:c}}",
        blanks: [NB("a", E18[0], f3(poisson.pmf(lam, 0))), NB("b", E18[1]), NB("c", E18[2])],
        explanation: t`$200\,\mathrm{P}(X = r)$ with $\lambda = 1.51$: $${f3(E18[0])}$, $${f3(E18[1])}$, $${f3(E18[2])}$. Also $E_3 = ${f3(E18[3])}$ and $E(\ge 4) = ${f3(E4p)}$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the classes '4' and '5' must be combined (as '4 or more'), and state the expected frequency of the combined class.",
        points: [t`The class "5 or more" has expected frequency $${f3(E5p)} < 5$, so the $\chi^2$ approximation would be unreliable.`, t`Combined class "4 or more": $E = 200 - \text{(sum of the others)} = ${f3(E4p)}$, with $O = 18$.`],
        modelAnswer: t`$E(\ge 5) = ${f3(E5p)}$ is below 5, so it is merged with "4" to give "4 or more" with $O = 12 + 6 = 18$ and $E = ${f3(E4p)}$ (making the expected total 200).`,
        explanation: "The last class must be 'r or more' so the expected frequencies add to 200." }),
      P.num({ label: "(d)", marks: 4, stem: "Calculate the test statistic X², correct to 3 significant figures.", value: x18, wrong: [f3(chi2Stat([57, 53, 45, 27, 12], [...E18, N * poisson.pmf(lam, 4)]))],
        explanation: t`Contributions: ${oc.map((o, i) => f3((o - ec[i]) ** 2 / ec[i])).join(", ")}; $X^2 = ${f3(x18)}$.` }),
      P.num({ label: "(e)", marks: 2, stem: "State the number of degrees of freedom.", value: 3, wrong: [4],
        explanation: t`5 classes after combining, minus 1 for the total, minus 1 for estimating $\lambda$: $\nu = 3$.` }),
      P.manual({ label: "(f)", marks: 2, stem: "Test at the 5% significance level whether a Poisson distribution is a suitable model, and comment on whether the conclusion would be the same at the 1% level.",
        points: [t`$${f3(x18)} > \chi^2_3(5\%) = ${C(3, 0.05)}$: reject $H_0$; the Poisson model is not a good fit at the 5% level.`, t`At 1%, $\chi^2_3(1\%) = ${C(3, 0.01)} > ${f3(x18)}$, so $H_0$ would not be rejected: the evidence against the model is not strong.`],
        modelAnswer: t`$X^2 = ${f3(x18)} > ${C(3, 0.05)}$, so at 5% there is evidence that the messages do not follow a Poisson distribution (there are more minutes with 0 messages than the model predicts). At 1% the critical value is $${C(3, 0.01)}$, so the conclusion would change.`,
        explanation: "Upper-tailed test; compare with both critical values." }),
    ],
    explanation: "Estimate λ, compute expected frequencies, merge small classes, then ν = classes − 1 − 1.",
    hints: ["The last class must be '4 or more'.", "λ was estimated: subtract an extra degree of freedom."],
  });

  // ---------------------------------------------------------------- cards
  b.card("FORMULA", "The χ² test statistic", t`$X^2 = \sum \dfrac{(O - E)^2}{E}$, approximately $\chi^2_\nu$ under $H_0$ when every $E \ge 5$.`);
  b.card("FORMULA", "Degrees of freedom: goodness of fit", t`$\nu = k - 1 - m$: $k$ classes after combining, $m$ parameters estimated from the data.`);
  b.card("FORMULA", "Contingency tables", t`$E = \dfrac{\text{row total} \times \text{column total}}{\text{grand total}}$; $\nu = (r - 1)(c - 1)$.`);
  b.card("FACT", "Shape of the χ² distribution", "Non-negative, positively skewed, mean ν; more symmetrical as ν increases. Tests are upper-tailed.");
  b.card("CONCEPT", "Rule of 5", "Combine any class with E < 5 with a neighbour (O with O, E with E) before calculating X²; count classes after combining.");
  b.card("CONCEPT", "Fitting a binomial or Poisson model", "Estimate p from total successes / total trials, or λ from the sample mean; each estimate costs one degree of freedom.");
  b.card("FACT", "Critical values to know", t`$\chi^2_1(5\%) = 3.841$, $\chi^2_2(5\%) = 5.991$, $\chi^2_3(5\%) = 7.815$, $\chi^2_4(5\%) = 9.488$.`);
  b.card("CONCEPT", "Commenting on a significant result", "Point to the cells with the largest (O − E)²/E and say whether O is above or below E; association is not causation.");
});
