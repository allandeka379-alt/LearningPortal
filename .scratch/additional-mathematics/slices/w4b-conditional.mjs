// W4b: amath.probability.conditional (ZIMSEC only)
import { concept, P, t, chk, same, F, Fr } from "../lib.mjs";

concept("amath.probability.conditional", { file: "probability/conditional", keyPrefix: "probability.conditional" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which formula gives the conditional probability $P(A \mid B)$?`,
    options: [
      [t`$\dfrac{P(A \cap B)}{P(B)}$`, "Correct: divide by the probability of the given event B."],
      [t`$\dfrac{P(A \cap B)}{P(A)}$`, "This is P(B | A): the given event is in the denominator."],
      [t`$P(A) \times P(B)$`, "This is P(A ∩ B) for independent events, not a conditional probability."],
      [t`$\dfrac{P(A)}{P(B)}$`, "The numerator must be the overlap P(A ∩ B), not P(A)."],
    ],
    answer: "A",
    explanation: t`Given $B$, the sample space shrinks to $B$, and the outcomes in $A$ are those in $A \cap B$: $P(A \mid B) = \frac{P(A \cap B)}{P(B)}$.`,
  });

  {
    same(F(14, 40).s, "7/20");
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: "A company in Kwekwe has 90 employees: 40 men, of whom 14 cycle to work, and 50 women, of whom 9 cycle to work. An employee is chosen at random. Find the probability that the employee cycles to work, given that the employee is a man.",
      options: [
        [t`$\frac{14}{40}$`, "Correct: given 'man', the sample space is the 40 men."],
        [t`$\frac{14}{23}$`, "This is P(man | cycles): the 23 cyclists are the wrong sample space."],
        [t`$\frac{14}{90}$`, "This is P(man and cycles), out of all 90 employees."],
        [t`$\frac{23}{90}$`, "This is the probability that any employee cycles."],
      ],
      answer: "A",
      explanation: t`$P(\text{cycles} \mid \text{man}) = \frac{n(\text{cycling men})}{n(\text{men})} = \frac{14}{40} = \frac{7}{20}$.`,
    });
  }

  {
    const v = 0.18 / 0.45;
    chk(v, 0.4);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`$P(A \cap B) = 0.18$ and $P(B) = 0.45$. Find $P(A \mid B)$.`,
      value: v, wrong: [0.081, 0.27],
      explanation: t`$P(A \mid B) = \frac{0.18}{0.45} = 0.4$. Multiplying ($0.081$) or subtracting ($0.27$) are not the conditional probability rule.`,
    });
  }

  {
    const v = 0.6 * 0.35;
    chk(v, 0.21);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`$P(B) = 0.6$ and $P(A \mid B) = 0.35$. Find $P(A \cap B)$.`,
      value: v, wrong: [0.35 / 0.6, 0.95],
      explanation: t`Rearrange the definition: $P(A \cap B) = P(B) \times P(A \mid B) = 0.6 \times 0.35 = 0.21$.`,
    });
  }

  {
    const v = 9 / 22;
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "In a club of 64 learners, 30 play chess, 22 play draughts and 9 play both. A learner is chosen at random. Given that the learner plays draughts, find the probability that the learner also plays chess. Give your answer as a fraction or correct to 3 significant figures.",
      value: v, wrong: [9 / 30, 9 / 64],
      explanation: t`Given "draughts", the sample space is the 22 draughts players, 9 of whom also play chess: $P = \frac{9}{22} \approx 0.409$. $\frac{9}{30}$ is P(draughts | chess).`,
      hints: ["The given event is 'plays draughts': how many learners is that?"],
    });
  }

  {
    const both = 0.55 + 0.35 - 0.75;
    chk(both, 0.15);
    const v = both / 0.55;
    same(F(15, 55).s, "3/11");
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`$P(A) = 0.55$, $P(B) = 0.35$ and $P(A \cup B) = 0.75$. Find $P(B \mid A)$, as a fraction or correct to 3 significant figures.`,
      value: v, wrong: [both / 0.35, 0.35],
      explanation: t`$P(A \cap B) = 0.55 + 0.35 - 0.75 = 0.15$. Then $P(B \mid A) = \frac{0.15}{0.55} = \frac{3}{11} \approx 0.273$. The answer 0.429 is $P(A \mid B) = \frac{0.15}{0.35}$.`,
      hints: ["Find P(A ∩ B) with the addition rule first."],
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For any events $A$ and $B$, $P(A \mid B) = P(B \mid A)$.`,
    answer: false,
    explanation: t`False. Both have numerator $P(A \cap B)$, but the denominators are $P(B)$ and $P(A)$, which are usually different. They are equal only when $P(A) = P(B)$.`,
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $P(A \mid B) = P(A)$, then $A$ and $B$ are independent.`,
    answer: true,
    explanation: t`True. Knowing that $B$ happened does not change the probability of $A$. Multiplying by $P(B)$ gives $P(A \cap B) = P(A)P(B)$, the product-rule form of independence.`,
    hints: [t`Multiply both sides by $P(B)$.`],
  });

  {
    const pD = 0.6 * 0.05 + 0.4 * 0.02;
    chk(pD, 0.038);
    same(Fr.div(F(30, 1000), F(38, 1000)).s, "15/19");
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "Machine X makes 60% of a factory's bolts and machine Y makes the rest. 5% of X's bolts and 2% of Y's bolts are faulty. A bolt is chosen at random and found to be faulty. What is the probability that it was made by machine X?",
      options: [
        [t`$\frac{15}{19}$`, t`Correct: $\frac{0.6 \times 0.05}{0.6 \times 0.05 + 0.4 \times 0.02} = \frac{0.03}{0.038}$.`],
        ["0.03", "This is P(X and faulty), the numerator only; divide by P(faulty)."],
        ["0.05", "This is P(faulty | X), the probability in the wrong direction."],
        ["0.6", "This ignores the information that the bolt is faulty."],
      ],
      answer: "A",
      explanation: t`$P(F) = 0.03 + 0.008 = 0.038$, so $P(X \mid F) = \frac{0.03}{0.038} = \frac{15}{19} \approx 0.789$.`,
      hints: ["Draw the tree: machine first, then faulty or not."],
    });
  }

  {
    const pPos = 0.1 * 0.95 + 0.9 * 0.08;
    chk(pPos, 0.167);
    const v = 0.095 / pPos;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "In a district, 10% of people have a certain illness. A test gives a positive result for 95% of people with the illness and, wrongly, for 8% of people without it. A person chosen at random tests positive. Find the probability that the person has the illness, correct to 3 significant figures.",
      value: v, wrong: [0.95, 0.095],
      explanation: t`$P(+) = 0.1 \times 0.95 + 0.9 \times 0.08 = 0.095 + 0.072 = 0.167$. $P(\text{ill} \mid +) = \frac{0.095}{0.167} \approx 0.569$. Although the test is good, many positives come from the large healthy group. 0.95 is $P(+ \mid \text{ill})$, the reverse probability.`,
      hints: ["Find the total probability of a positive test from both branches.", "Divide the 'ill and positive' path by that total."],
    });
  }

  {
    const total8 = [[2, 6], [3, 5], [4, 4], [5, 3], [6, 2]];
    const with3 = total8.filter(([a, c]) => a === 3 || c === 3).length;
    same(with3, 2);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "Two fair dice are rolled. Given that the total score is 8, find the probability that one of the dice shows a 3. Give your answer as a fraction or a decimal.",
      value: with3 / total8.length, wrong: [2 / 36, 11 / 36],
      explanation: t`Given total 8, the outcomes are (2, 6), (3, 5), (4, 4), (5, 3), (6, 2): 5 equally likely outcomes. Two contain a 3, so $P = \frac{2}{5} = 0.4$. $\frac{2}{36}$ forgets to shrink the sample space.`,
      hints: ["List only the outcomes with total 8."],
    });
  }

  {
    const gg = Fr.mul(F(6, 10), F(5, 9)), yy = Fr.mul(F(4, 10), F(3, 9));
    const v = Fr.div(gg, Fr.add(gg, yy));
    same(v.s, "5/7");
    b.num({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: "A box holds 6 green and 4 yellow pegs. Two pegs are taken at random without replacement. Given that the two pegs are the same colour, find the probability that both are green. Give your answer as a fraction or correct to 3 significant figures.",
      value: v.v, wrong: [gg.v, 0.6],
      explanation: t`$P(GG) = \frac{6}{10} \times \frac{5}{9} = \frac{30}{90}$ and $P(YY) = \frac{4}{10} \times \frac{3}{9} = \frac{12}{90}$. $P(GG \mid \text{same}) = \frac{30/90}{42/90} = \frac{30}{42} = \frac{5}{7} \approx 0.714$. $\frac{1}{3}$ is $P(GG)$ without the condition.`,
      hints: ["'Same colour' is GG or YY.", "Divide P(GG) by P(same colour)."],
    });
  }

  {
    chk(0.12 / 0.32, 0.375); chk(0.12 / 0.48, 0.25);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`For events $A$ and $B$, $P(A) = 0.48$, $P(B) = 0.32$ and $P(A \cap B) = 0.12$.`,
      template: "P(A | B) = {{blank:ab}} and P(B | A) = {{blank:ba}}",
      blanks: [
        { id: "ab", input: "number", accepted: [0.375], tolerance: 0.0005, wrong: "0.25" },
        { id: "ba", input: "number", accepted: [0.25], tolerance: 0.0005, wrong: "0.375" },
      ],
      explanation: t`$P(A \mid B) = \frac{0.12}{0.32} = 0.375$ and $P(B \mid A) = \frac{0.12}{0.48} = 0.25$. The given event goes in the denominator each time.`,
      hints: ["Which event is 'given' in each case?"],
    });
  }

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each probability with an expression equal to it.",
    pairs: [
      [t`$P(A \mid B)$`, t`$\dfrac{P(A \cap B)}{P(B)}$`],
      [t`$P(B \mid A)$`, t`$\dfrac{P(A \cap B)}{P(A)}$`],
      [t`$P(A \cap B)$ when $A$ and $B$ are independent`, t`$P(A) \times P(B)$`],
      [t`$P(A \cap B)$ in general`, t`$P(B) \times P(A \mid B)$`],
      [t`$P(A')$`, t`$1 - P(A)$`],
    ],
    explanation: "The conditional formula divides by the given event; rearranged it gives the multiplication rule, which simplifies to the product rule for independent events.",
  });

  {
    const hh = 1, atLeast = 3;
    same(F(hh, atLeast).s, "1/3");
    b.mcq({
      d: 3, skill: "ANALYSIS", calculator: false,
      stem: "Two fair coins are tossed. Given that at least one coin shows a head, what is the probability that both coins show heads?",
      options: [
        [t`$\frac{1}{3}$`, "Correct: the outcomes HH, HT and TH remain, and only HH has two heads."],
        [t`$\frac{1}{2}$`, "This treats 'the other coin' as a fresh toss, but the condition does not say which coin shows the head."],
        [t`$\frac{1}{4}$`, "This is P(HH) before the condition is used."],
        [t`$\frac{3}{4}$`, "This is P(at least one head), the given event itself."],
      ],
      answer: "A",
      explanation: t`Sample space $\{HH, HT, TH, TT\}$. "At least one head" leaves $\{HH, HT, TH\}$, so $P(HH \mid \text{at least one H}) = \frac{1/4}{3/4} = \frac{1}{3}$.`,
      hints: ["List the four outcomes and cross out the ones the condition rules out."],
    });
  }

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`$A$ and $B$ are events with non-zero probabilities. Show that if $P(A \mid B) = P(A)$, then $P(B \mid A) = P(B)$.`,
    points: [
      t`M1 uses the definition: $\frac{P(A \cap B)}{P(B)} = P(A)$, so $P(A \cap B) = P(A)P(B)$.`,
      t`M1 writes $P(B \mid A) = \frac{P(A \cap B)}{P(A)}$.`,
      t`A1 substitutes to get $\frac{P(A)P(B)}{P(A)} = P(B)$.`,
    ],
    modelAnswer: t`$$
P(A \mid B) = P(A) \Rightarrow \frac{P(A \cap B)}{P(B)} = P(A) \Rightarrow P(A \cap B) = P(A)P(B)
$$

$$
P(B \mid A) = \frac{P(A \cap B)}{P(A)} = \frac{P(A)P(B)}{P(A)} = P(B)
$$`,
    explanation: "Independence works both ways: if B gives no information about A, then A gives no information about B.",
    hints: ["Turn the given statement into one about P(A ∩ B)."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`For a town, $P(\text{rain in the afternoon} \mid \text{cloudy morning}) = 0.7$. Explain what this means in words, and explain why it does not tell you $P(\text{cloudy morning} \mid \text{rain in the afternoon})$.`,
    points: [
      "Meaning: on days when the morning is cloudy, it rains in the afternoon on about 70% of them.",
      "The reverse probability has a different given event (rainy afternoons) and so a different denominator; it also depends on how often mornings are cloudy, which is not given.",
    ],
    modelAnswer: "Of the days with a cloudy morning, about 70% have afternoon rain. The reverse probability is about days with afternoon rain, a different set of days, so it needs P(rain) and P(cloudy and rain); 0.7 alone does not give it.",
    explanation: "P(A | B) and P(B | A) have the same numerator but different denominators.",
    hints: ["Which days does each probability talk about?"],
  });

  {
    const late = 0.6 * 0.15 + 0.4 * 0.25;
    chk(late, 0.19);
    const kLate = 0.09 / late, wOnTime = (0.4 * 0.75) / (1 - late);
    same(F(9, 19).s, "9/19"); same(F(30, 81).s, "10/27");
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: false, examStyle: true,
      stem: "Each morning Tatenda either takes a kombi to school, with probability 0.6, or walks. When she takes a kombi, the probability that she is late is 0.15; when she walks, it is 0.25.",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the probability that she is late on a given morning.", value: late, wrong: [0.4, 0.09],
          explanation: t`$0.6 \times 0.15 + 0.4 \times 0.25 = 0.09 + 0.1 = 0.19$.` }),
        P.num({ label: "(b)", marks: 3, stem: "Given that she is late, find the probability that she took a kombi. Give your answer as a fraction or correct to 3 significant figures.", value: kLate, wrong: [0.15, 0.09],
          explanation: t`$P(K \mid L) = \frac{0.09}{0.19} = \frac{9}{19} \approx 0.474$.` }),
        P.num({ label: "(c)", marks: 3, stem: "Given that she is not late, find the probability that she walked. Give your answer as a fraction or correct to 3 significant figures.", value: wOnTime, wrong: [0.75, 0.3],
          explanation: t`$P(W \cap L') = 0.4 \times 0.75 = 0.3$ and $P(L') = 1 - 0.19 = 0.81$. $P(W \mid L') = \frac{0.3}{0.81} = \frac{10}{27} \approx 0.370$.` }),
        P.tf({ label: "(d)", marks: 1, stem: "Taking a kombi and being late are independent events.", answer: false,
          explanation: t`False: $P(L \mid K) = 0.15$ but $P(L) = 0.19$, which are different.` }),
      ],
      explanation: "Multiply along the tree, add the paths for the total, and divide the wanted path by that total for a reverse probability.",
      hints: ["Draw the tree: kombi or walk, then late or not late.", "In (c) the given event is 'not late', with probability 1 − 0.19."],
    });
  }

  {
    const pS = (27 + 42) / 150, sB = 27 / 45, bS = 27 / 69;
    chk(pS, 0.46); chk(sB, 0.6); same(F(27, 69).s, "9/23");
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: false, examStyle: true,
      stem: "In a survey of 150 households in Kariba, 45 own a fishing boat, and 27 of these have a solar panel. Of the households without a boat, 42 have a solar panel. A household is chosen at random.",
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Find the probability that it has a solar panel.", value: pS, wrong: [27 / 150],
          explanation: t`$\frac{27 + 42}{150} = \frac{69}{150} = 0.46$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the probability that it has a solar panel, given that it owns a boat.", value: sB, wrong: [27 / 150, bS],
          explanation: t`$\frac{27}{45} = 0.6$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the probability that it owns a boat, given that it has a solar panel. Give your answer as a fraction or correct to 3 significant figures.", value: bS, wrong: [sB],
          explanation: t`$\frac{27}{69} = \frac{9}{23} \approx 0.391$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Are owning a boat and having a solar panel independent? Give a reason using your answers.",
          points: [t`Compares $P(S \mid B) = 0.6$ with $P(S) = 0.46$.`, "Concludes they are not independent, because the probabilities differ (boat owners are more likely to have a panel)."],
          modelAnswer: t`No. $P(S \mid B) = 0.6$ but $P(S) = 0.46$; knowing that a household owns a boat changes the probability that it has a solar panel, so the events are not independent.`,
          explanation: t`Independent means $P(S \mid B) = P(S)$.` }),
      ],
      explanation: "Make a two-way table; for a conditional probability, divide by the total of the given group.",
      hints: ["Households with a solar panel: 27 + 42.", "Given 'owns a boat', the sample space is 45 households."],
    });
  }

  // flashcards
  b.card("FORMULA", "Conditional probability", t`$P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}$`, "Divide by the probability of the given event.");
  b.card("FORMULA", "Multiplication rule", t`$P(A \cap B) = P(B) \times P(A \mid B)$`);
  b.card("CONCEPT", "Given that…", "The given event becomes the new sample space: count only the outcomes in it.");
  b.card("CONCEPT", "Independence (conditional form)", t`$A$ and $B$ are independent when $P(A \mid B) = P(A)$.`);
  b.card("CONCEPT", "Reverse probability from a tree", "The wanted path divided by the sum of all the paths that give the known result.");
  b.card("FACT", "Tree diagram branches", "Second-stage branch probabilities are conditional probabilities, e.g. P(germinates | supplier A).");
  b.card("CONCEPT", "P(A | B) and P(B | A)", t`Same numerator $P(A \cap B)$, different denominators; they are usually not equal.`);
  b.card("FORMULA", "Conditional probability from a table", t`$P(A \mid B) = \dfrac{n(A \cap B)}{n(B)}$`);
});
