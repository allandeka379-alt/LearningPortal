// W3a: amaths.probability.bayes (ZIMSEC only; every posterior computed from the tree)
import { concept, P, t, chk, sfStr, F, same } from "../lib.mjs";

/** Posterior probabilities for priors pr[] and likelihoods lk[]. */
function bayes(pr, lk) {
  chk(pr.reduce((a, c) => a + c, 0), 1, 1e-12, "priors sum to 1");
  const joint = pr.map((p, i) => p * lk[i]);
  const tot = joint.reduce((a, c) => a + c, 0);
  return { joint, tot, post: joint.map((j) => j / tot) };
}
const S3 = (x) => sfStr(x, 3);

concept("amaths.probability.bayes", { file: "probability/bayes", keyPrefix: "probability.bayes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Bayes' theorem uses events $A_1, A_2, \ldots, A_n$ that form a partition of the sample space. What does this mean?`,
    options: [
      ["They are mutually exclusive and exhaustive.", "Correct: exactly one of them must happen."],
      ["They are independent of each other.", "Partition events are exclusive, so (with non-zero probabilities) they are not independent."],
      ["They all have the same probability.", "The probabilities can be anything that adds to 1."],
      ["They are exclusive but need not be exhaustive.", "Without exhaustiveness the law of total probability fails."],
    ],
    answer: "A",
    explanation: t`A partition splits $S$ into non-overlapping pieces that cover it, so $\sum \mathrm{P}(A_i) = 1$ and $\mathrm{P}(B) = \sum \mathrm{P}(A_i)\,\mathrm{P}(B \mid A_i)$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which expression equals $\mathrm{P}(A \mid B)$, where $A'$ is the complement of $A$?`,
    options: [
      [t`$\dfrac{\mathrm{P}(A)\mathrm{P}(B \mid A)}{\mathrm{P}(A)\mathrm{P}(B \mid A) + \mathrm{P}(A')\mathrm{P}(B \mid A')}$`, "Correct: one path over all the paths that end in B."],
      [t`$\dfrac{\mathrm{P}(A)\mathrm{P}(B \mid A)}{\mathrm{P}(A)\mathrm{P}(B \mid A) + \mathrm{P}(A)\mathrm{P}(B' \mid A)}$`, t`The denominator is $\mathrm{P}(A)$, not $\mathrm{P}(B)$: it uses the wrong paths.`],
      [t`$\dfrac{\mathrm{P}(A)\mathrm{P}(B \mid A)}{\mathrm{P}(A')\mathrm{P}(B \mid A')}$`, t`The denominator must be all of $\mathrm{P}(B)$, including the path through $A$.`],
      [t`$\dfrac{\mathrm{P}(B \mid A)}{\mathrm{P}(B \mid A) + \mathrm{P}(B \mid A')}$`, t`The prior probabilities $\mathrm{P}(A)$ and $\mathrm{P}(A')$ are missing.`],
    ],
    answer: "A",
    explanation: t`Numerator $\mathrm{P}(A \cap B) = \mathrm{P}(A)\,\mathrm{P}(B \mid A)$; denominator $\mathrm{P}(B)$ by the law of total probability.`,
  });

  // two-machine factory: Gweru bakery ovens
  const r1 = bayes([0.65, 0.35], [0.04, 0.09]);
  chk(r1.tot, 0.0575);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "A bakery in Gweru bakes 65% of its loaves in oven P and the rest in oven Q. 4% of loaves from oven P and 9% of loaves from oven Q are burnt. Find the probability that a loaf chosen at random is burnt.",
    value: r1.tot, wrong: [0.13, 0.065],
    explanation: t`$\mathrm{P}(\text{burnt}) = 0.65 \times 0.04 + 0.35 \times 0.09 = 0.026 + 0.0315 = 0.0575$. (0.13 adds the two percentages.)`,
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: false, daily: true,
    stem: "For the Gweru bakery (65% of loaves from oven P with 4% burnt, 35% from oven Q with 9% burnt), a loaf chosen at random is burnt. Find the probability that it came from oven Q, correct to 3 significant figures.",
    value: r1.post[1], wrong: [0.0315, 0.09],
    explanation: t`$\mathrm{P}(Q \mid \text{burnt}) = \frac{0.35 \times 0.09}{0.0575} = \frac{0.0315}{0.0575} = ${S3(r1.post[1])}$. (0.0315 is the joint probability, not the conditional one.)`,
    hints: ["Find P(burnt) first: it is the denominator."],
  });

  // three suppliers of fertiliser
  const r2 = bayes([0.45, 0.35, 0.2], [0.03, 0.06, 0.1]);
  chk(r2.tot, 0.0545);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A co-operative in Mashonaland buys bags of fertiliser from three suppliers: 45% from X, 35% from Y and 20% from Z. The proportions of underweight bags are 3% from X, 6% from Y and 10% from Z. A bag is found to be underweight. Find the probability that it came from each supplier, correct to 3 significant figures.",
    template: "P(X | underweight) = {{blank:x}}; P(Y | underweight) = {{blank:y}}; P(Z | underweight) = {{blank:z}}",
    blanks: r2.post.map((p, i) => ({ id: ["x", "y", "z"][i], input: "number", accepted: [S3(p)], tolerance: 0.0005, wrong: ["0.45", "0.35", "0.2"][i] })),
    explanation: t`Paths: $0.45 \times 0.03 = 0.0135$, $0.35 \times 0.06 = 0.021$, $0.2 \times 0.1 = 0.02$; total $\mathrm{P}(U) = 0.0545$. Posteriors: $\frac{0.0135}{0.0545} = ${S3(r2.post[0])}$, $\frac{0.021}{0.0545} = ${S3(r2.post[1])}$, $\frac{0.02}{0.0545} = ${S3(r2.post[2])}$ (they add to 1).`,
    hints: ["Work out the three joint probabilities, then divide each by their total."],
  });

  // medical test
  const r3 = bayes([0.02, 0.98], [0.9, 0.05]);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "2% of a population have a certain condition. A screening test gives a positive result for 90% of people with the condition and for 5% of people without it. Find the probability that a person who tests positive has the condition, correct to 3 significant figures.",
    value: r3.post[0], wrong: [0.9, 0.018],
    explanation: t`$\mathrm{P}(+) = 0.02 \times 0.9 + 0.98 \times 0.05 = 0.018 + 0.049 = 0.067$. $\mathrm{P}(C \mid +) = \frac{0.018}{0.067} = ${S3(r3.post[0])}$. (0.9 is $\mathrm{P}(+ \mid C)$, the reverse conditional.)`,
    hints: ["Healthy people are 49 times as numerous: include their false positives."],
  });
  chk(r3.tot, 0.067);

  const negC = (0.02 * 0.1) / (1 - r3.tot);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "For the same screening test (2% have the condition; positive for 90% of those with it and 5% of those without), find the probability that a person who tests negative has the condition. Give your answer correct to 3 significant figures.",
    value: negC, wrong: [0.002, 0.1],
    explanation: t`$\mathrm{P}(C \cap -) = 0.02 \times 0.1 = 0.002$ and $\mathrm{P}(-) = 1 - 0.067 = 0.933$. $\mathrm{P}(C \mid -) = \frac{0.002}{0.933} = ${S3(negC)}$. (0.002 is the joint probability.)`,
    hints: ["P(negative) = 1 − P(positive)."],
  });

  const r8 = bayes([0.25, 0.75], [0.6, 0.2]);
  chk(r8.tot, 0.3); chk(r8.post[0], 0.5);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`$\mathrm{P}(A) = 0.25$, $\mathrm{P}(B \mid A) = 0.6$ and $\mathrm{P}(B \mid A') = 0.2$. Find $\mathrm{P}(A \mid B)$.`,
    options: [
      ["0.5", t`Correct: $\frac{0.15}{0.15 + 0.15} = 0.5$.`],
      ["0.15", t`This is $\mathrm{P}(A \cap B)$, the numerator only.`],
      ["0.75", t`This is $\frac{0.6}{0.6 + 0.2}$, which leaves out the priors.`],
      ["0.3", t`This is $\mathrm{P}(B)$, the denominator only.`],
    ],
    answer: "A",
    explanation: t`$\mathrm{P}(A \cap B) = 0.25 \times 0.6 = 0.15$; $\mathrm{P}(B) = 0.15 + 0.75 \times 0.2 = 0.3$; $\mathrm{P}(A \mid B) = \frac{0.15}{0.3} = 0.5$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "If a test detects a disease in 99% of people who have it, then a person who tests positive has the disease with probability 0.99.",
    answer: false,
    explanation: t`0.99 is $\mathrm{P}(+ \mid D)$. $\mathrm{P}(D \mid +)$ also depends on how common the disease is and on the false-positive rate; for a rare disease it can be much smaller than 0.99.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $A_1, A_2, A_3$ form a partition and $\mathrm{P}(B) > 0$, then $\mathrm{P}(A_1 \mid B) + \mathrm{P}(A_2 \mid B) + \mathrm{P}(A_3 \mid B) = 1$.`,
    answer: true,
    explanation: t`The three joint probabilities $\mathrm{P}(A_i \cap B)$ add to $\mathrm{P}(B)$, so the three posteriors add to $\frac{\mathrm{P}(B)}{\mathrm{P}(B)} = 1$. This is a good check on your answers.`,
  });

  // weather: Nyasha's forecasts
  const r4 = bayes([0.4, 0.6], [0.7, 0.2]);
  chk(r4.tot, 0.4);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "In Chimanimani 40% of days in March are misty. A weather app predicts mist on 70% of the misty days and on 20% of the clear days. On a day when the app predicts mist, what is the probability that it is misty?",
    options: [
      ["0.7", t`Correct: $\frac{0.4 \times 0.7}{0.4 \times 0.7 + 0.6 \times 0.2} = \frac{0.28}{0.4}$.`],
      ["0.28", "This is the joint probability of a misty day with a mist prediction."],
      ["0.4", "This is the prior; the prediction is evidence that changes it."],
      ["0.778", t`This is $\frac{0.7}{0.7 + 0.2}$, which leaves out the prior probabilities.`],
    ],
    answer: "A",
    explanation: t`$\mathrm{P}(\text{predict}) = 0.28 + 0.12 = 0.4$; $\mathrm{P}(M \mid \text{predict}) = \frac{0.28}{0.4} = 0.7$. That it equals $\mathrm{P}(\text{predict} \mid M)$ here is a coincidence of these numbers.`,
    hints: ["Draw a tree: misty or clear, then prediction or not."],
  });
  chk(r4.post[0], 0.7); chk(0.7 / 0.9, 0.7777777777777778);

  // find unknown prior
  // P(A)=p, P(B|A)=0.5, P(B|A')=0.2, P(A|B)=0.625 -> 0.5p/(0.5p+0.2(1-p)) = 0.625 -> 0.5p = 0.625(0.3p+0.2) -> 0.5p - 0.1875p = 0.125 -> p = 0.4
  chk((0.5 * 0.4) / (0.5 * 0.4 + 0.2 * 0.6), 0.625);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`$\mathrm{P}(B \mid A) = 0.5$, $\mathrm{P}(B \mid A') = 0.2$ and $\mathrm{P}(A \mid B) = 0.625$. Find $\mathrm{P}(A)$.`,
    value: 0.4, wrong: [0.625, 0.25],
    explanation: t`Let $\mathrm{P}(A) = p$. Bayes: $\frac{0.5p}{0.5p + 0.2(1 - p)} = 0.625$. So $0.5p = 0.625(0.3p + 0.2) = 0.1875p + 0.125$, giving $0.3125p = 0.125$ and $p = 0.4$.`,
    hints: ["Write Bayes' theorem with P(A) = p and solve the linear equation."],
  });

  // two tests in sequence
  const prior = 0.1;
  const afterOne = bayes([prior, 1 - prior], [0.8, 0.1]).post[0];
  const afterTwo = bayes([afterOne, 1 - afterOne], [0.8, 0.1]).post[0];
  chk(afterOne, 0.08 / 0.17); chk(afterTwo, (0.1 * 0.64) / (0.1 * 0.64 + 0.9 * 0.01));
  b.num({
    d: 5, skill: "ANALYSIS", calculator: false,
    stem: "10% of the cattle in a herd near Gokwe carry a parasite. A blood test is positive for 80% of carriers and 10% of non-carriers, and repeated tests on the same animal are independent given its status. An animal tests positive twice. Find the probability that it is a carrier, correct to 3 significant figures.",
    value: afterTwo, wrong: [Number(S3(afterOne)), 0.64],
    explanation: t`Given carrier, $\mathrm{P}(++) = 0.8^2 = 0.64$; given non-carrier, $0.1^2 = 0.01$. $\mathrm{P}(\text{carrier} \mid ++) = \frac{0.1 \times 0.64}{0.1 \times 0.64 + 0.9 \times 0.01} = \frac{0.064}{0.073} = ${S3(afterTwo)}$. (After one positive test it is only $${S3(afterOne)}$.)`,
    hints: ["Find P(two positives | carrier) and P(two positives | non-carrier).", "Or update the prior after the first test and use the posterior as the new prior."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A clinic tests people for a disease D. Match each phrase with its probability notation.",
    pairs: [
      ["the proportion of people who have the disease", t`$\mathrm{P}(D)$`],
      ["the chance that a person with the disease tests positive", t`$\mathrm{P}(+ \mid D)$`],
      ["the chance that a person who tests positive has the disease", t`$\mathrm{P}(D \mid +)$`],
      ["the chance that a healthy person tests positive", t`$\mathrm{P}(+ \mid D')$`],
    ],
    explanation: t`The prior is $\mathrm{P}(D)$; the test's sensitivity is $\mathrm{P}(+ \mid D)$ and its false-positive rate $\mathrm{P}(+ \mid D')$; Bayes' theorem gives the posterior $\mathrm{P}(D \mid +)$.`,
  });

  b.proof({
    d: 3, marks: 4, skill: "UNDERSTANDING", calculator: false,
    stem: t`Events $A_1, A_2, \ldots, A_n$ are mutually exclusive and exhaustive, and $\mathrm{P}(B) > 0$. Starting from the definition of conditional probability, prove Bayes' theorem: $\mathrm{P}(A_j \mid B) = \dfrac{\mathrm{P}(A_j)\,\mathrm{P}(B \mid A_j)}{\sum_{i=1}^{n} \mathrm{P}(A_i)\,\mathrm{P}(B \mid A_i)}$.`,
    points: [t`M1 writes $\mathrm{P}(A_j \cap B) = \mathrm{P}(B)\,\mathrm{P}(A_j \mid B)$ and $= \mathrm{P}(A_j)\,\mathrm{P}(B \mid A_j)$.`, t`A1 obtains $\mathrm{P}(A_j \mid B) = \frac{\mathrm{P}(A_j)\,\mathrm{P}(B \mid A_j)}{\mathrm{P}(B)}$.`, t`M1 uses the partition: $B$ is the union of the exclusive events $A_i \cap B$, so $\mathrm{P}(B) = \sum \mathrm{P}(A_i \cap B)$.`, "A1 substitutes the law of total probability to reach the given result."],
    modelAnswer: t`$$
\mathrm{P}(A_j \cap B) = \mathrm{P}(B)\,\mathrm{P}(A_j \mid B) = \mathrm{P}(A_j)\,\mathrm{P}(B \mid A_j)
$$
$$
\mathrm{P}(A_j \mid B) = \frac{\mathrm{P}(A_j)\,\mathrm{P}(B \mid A_j)}{\mathrm{P}(B)}
$$
Since the $A_i$ are exclusive and exhaustive, $B = (A_1 \cap B) \cup \cdots \cup (A_n \cap B)$ with the pieces exclusive, so
$$
\mathrm{P}(B) = \sum_{i=1}^{n} \mathrm{P}(A_i \cap B) = \sum_{i=1}^{n} \mathrm{P}(A_i)\,\mathrm{P}(B \mid A_i)
$$
$$
\mathrm{P}(A_j \mid B) = \frac{\mathrm{P}(A_j)\,\mathrm{P}(B \mid A_j)}{\sum_{i=1}^{n} \mathrm{P}(A_i)\,\mathrm{P}(B \mid A_i)}
$$`,
    explanation: "Write the joint probability two ways, then expand P(B) over the partition.",
    hints: [t`Write $\mathrm{P}(A_j \cap B)$ in two ways using the definition.`],
  });

  b.manualShort({
    d: 3, marks: 2, skill: "EVALUATION", calculator: false,
    stem: "A test for a rare disease is positive for 98% of people who have it and for 3% of people who do not. Explain why most people who test positive in a large random screening may still be healthy.",
    points: ["Because the disease is rare, healthy people far outnumber those with the disease.", "So the false positives (3% of a very large group) can outnumber the true positives (98% of a small group), making P(disease | positive) small."],
    modelAnswer: "If, say, 1 in 1000 people has the disease, then in 100 000 people about 98 true positives occur but about 3% of 99 900 ≈ 2997 false positives. So only about 98/3095 ≈ 3% of positives have the disease: the low prior probability dominates.",
    explanation: "Bayes' theorem weights each likelihood by its prior probability.",
    hints: ["Imagine 100 000 people and count the two kinds of positive result."],
  });

  // structured 1 (practice, 5 marks)
  const r5 = bayes([0.6, 0.4], [0.1, 0.25]);
  chk(r5.tot, 0.16);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: "Of the learners at a college in Harare, 60% travel by kombi and the rest walk. 10% of those who travel by kombi and 25% of those who walk arrive late on a rainy day.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the probability that a learner chosen at random arrives late on a rainy day.", value: r5.tot, wrong: [0.35],
        explanation: t`$0.6 \times 0.1 + 0.4 \times 0.25 = 0.06 + 0.1 = 0.16$. (0.35 adds the two percentages.)` }),
      P.num({ label: "(b)", marks: 3, stem: "A learner arrives late on a rainy day. Find the probability that the learner travelled by kombi, correct to 3 significant figures.", value: r5.post[0], wrong: [0.06],
        explanation: t`$\mathrm{P}(K \mid L) = \frac{0.06}{0.16} = ${S3(r5.post[0])}$.` }),
    ],
    explanation: "Law of total probability, then Bayes' theorem.",
    hints: ["Draw a tree with the travel method first."],
  });

  // structured 2 (practice, 13 marks): three boxes, ball drawn
  // Box 1: 3 red 2 white; Box 2: 1 red 4 white; Box 3: 4 red 4 white. Die: box 1 if 1,2,3; box2 if 4,5; box3 if 6.
  const pri = [1 / 2, 1 / 3, 1 / 6], lk = [3 / 5, 1 / 5, 1 / 2];
  const r6 = bayes(pri, lk);
  chk(r6.tot, 3 / 10 + 1 / 15 + 1 / 12);
  same(F(18 + 4 + 5, 60).s, "9/20"); chk(r6.tot, 27 / 60);
  chk(r6.post[0], 2 / 3); chk(r6.post[1], 4 / 27); chk(r6.post[2], 5 / 27);
  // two balls without replacement from chosen box, both red
  const lk2 = [(3 / 5) * (2 / 4), 0, (4 / 8) * (3 / 7)];
  const r7 = bayes(pri, lk2);
  chk(r7.tot, 0.15 + (1 / 6) * (3 / 14));
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: "Tatenda throws a fair die. If it shows 1, 2 or 3 she takes a ball at random from box 1 (3 red, 2 white); if it shows 4 or 5 she uses box 2 (1 red, 4 white); if it shows 6 she uses box 3 (4 red, 4 white).",
    parts: [
      P.num({ label: "(a)", marks: 3, stem: "Find the probability that the ball is red. Give your answer as a fraction or a decimal.", value: r6.tot, wrong: [(3 / 5 + 1 / 5 + 1 / 2) / 3],
        explanation: t`$\frac{1}{2} \times \frac{3}{5} + \frac{1}{3} \times \frac{1}{5} + \frac{1}{6} \times \frac{1}{2} = \frac{18}{60} + \frac{4}{60} + \frac{5}{60} = \frac{27}{60} = \frac{9}{20} = 0.45$. (Averaging the three proportions ignores the unequal box probabilities.)` }),
      P.num({ label: "(b)", marks: 3, stem: "Given that the ball is red, find the probability that it came from box 3. Give your answer as a fraction or a decimal correct to 3 significant figures.", value: r6.post[2], wrong: [1 / 6],
        explanation: t`$\mathrm{P}(\text{box }3 \mid R) = \frac{5/60}{27/60} = \frac{5}{27} \approx ${S3(5 / 27)}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Given that the ball is red, find the probability that it came from box 1. Give your answer as a fraction or a decimal correct to 3 significant figures.", value: r6.post[0], wrong: [0.3],
        explanation: t`$\frac{18/60}{27/60} = \frac{2}{3}$. (Check: $\frac{2}{3} + \frac{4}{27} + \frac{5}{27} = 1$.)` }),
      P.group({ label: "(d)", stem: "Instead, Tatenda throws the die and takes two balls at random, without replacement, from the box chosen. Both balls are red.", parts: [
        P.num({ label: "(i)", marks: 3, stem: "Find the probability that both balls are red. Give your answer correct to 3 significant figures.", value: r7.tot, wrong: [0.2025],
          explanation: t`Box 1: $\frac{3}{5} \times \frac{2}{4} = \frac{3}{10}$; box 2: impossible (only 1 red); box 3: $\frac{4}{8} \times \frac{3}{7} = \frac{3}{14}$. $\mathrm{P}(RR) = \frac{1}{2} \times \frac{3}{10} + \frac{1}{6} \times \frac{3}{14} = \frac{3}{20} + \frac{1}{28} = ${S3(r7.tot)}$. (0.2025 is $0.45^2$.)` }),
        P.num({ label: "(ii)", marks: 2, stem: "Hence find the probability that the balls came from box 1, correct to 3 significant figures.", value: r7.post[0], wrong: [Number(S3(2 / 3))],
          explanation: t`$\frac{3/20}{3/20 + 1/28} = \frac{0.15}{${S3(r7.tot)}} = ${S3(r7.post[0])}$.` }),
      ] }),
    ],
    explanation: "Priors come from the die; likelihoods from the box contents. Two red balls rule out box 2 completely.",
    hints: ["The priors are 1/2, 1/3 and 1/6.", "Box 2 has only one red ball."],
  });
  chk(r7.post[0], 0.15 / (0.15 + 1 / 28));

  b.card("FORMULA", "Bayes' theorem (two events)", t`$\mathrm{P}(A \mid B) = \dfrac{\mathrm{P}(A)\mathrm{P}(B \mid A)}{\mathrm{P}(A)\mathrm{P}(B \mid A) + \mathrm{P}(A')\mathrm{P}(B \mid A')}$`);
  b.card("FORMULA", "Bayes' theorem (partition)", t`$\mathrm{P}(A_j \mid B) = \dfrac{\mathrm{P}(A_j)\mathrm{P}(B \mid A_j)}{\sum_i \mathrm{P}(A_i)\mathrm{P}(B \mid A_i)}$`, "The A_i are mutually exclusive and exhaustive.");
  b.card("FORMULA", "Law of total probability", t`$\mathrm{P}(B) = \sum_i \mathrm{P}(A_i)\,\mathrm{P}(B \mid A_i)$`);
  b.card("DEFINITION", "Partition", "Events that are mutually exclusive and exhaustive: exactly one of them happens.");
  b.card("DEFINITION", "Prior and posterior", t`Prior $\mathrm{P}(A)$: before the evidence. Posterior $\mathrm{P}(A \mid B)$: after learning $B$.`);
  b.card("CONCEPT", "Bayes on a tree", "One path ending in B, divided by the sum of all paths ending in B.");
  b.card("CONCEPT", "Justification", t`$\mathrm{P}(A \cap B) = \mathrm{P}(B)\mathrm{P}(A \mid B) = \mathrm{P}(A)\mathrm{P}(B \mid A)$; divide by $\mathrm{P}(B)$.`);
  b.card("FACT", "Rare conditions", "For a rare condition, even an accurate test gives P(condition | positive) much smaller than P(positive | condition).");
  b.card("FACT", "Check", "The posteriors over a whole partition add up to 1.");
});
