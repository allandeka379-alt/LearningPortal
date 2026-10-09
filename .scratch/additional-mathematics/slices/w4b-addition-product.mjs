// W4b: amath.probability.addition-product-rules (ZIMSEC only)
import { concept, P, t, chk, same, F, Fr } from "../lib.mjs";

const dice = [];
for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) dice.push([i, j]);
const count = (fn) => dice.filter(([a, c]) => fn(a, c)).length;

concept("amath.probability.addition-product-rules", { file: "probability/addition-product-rules", keyPrefix: "probability.addition-product-rules" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$A$ and $B$ are mutually exclusive events. Which statement is true?`,
    options: [
      [t`$P(A \cup B) = P(A) + P(B)$`, "Correct: they cannot happen together, so nothing is counted twice."],
      [t`$P(A \cap B) = P(A) \times P(B)$`, "This is the product rule for independent events."],
      [t`$P(A \cup B) = P(A) \times P(B)$`, "Probabilities of 'or' events are added, not multiplied."],
      [t`$P(A \cap B) = P(A) + P(B)$`, "For mutually exclusive events P(A ∩ B) = 0."],
    ],
    answer: "A",
    explanation: t`Mutually exclusive events have $P(A \cap B) = 0$, so the general rule $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ becomes $P(A) + P(B)$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Which pair of events is independent?",
    options: [
      ["A coin shows a head; a die, rolled at the same time, shows a six", "Correct: the coin cannot influence the die."],
      ["The first bead taken from a bag is red; the second bead, taken without replacement, is red", "Without replacement, the first draw changes the contents of the bag."],
      ["A die shows an even number; the same roll shows a two", "If the score is 2 it is certainly even, so one event affects the other."],
      ["It rains in Mutare today; the river near Mutare is in flood today", "Rain makes a flood more likely, so these are not independent."],
    ],
    answer: "A",
    explanation: "Independent events do not affect each other's probabilities. Separate coins and dice are the standard example; draws without replacement are not independent.",
  });

  {
    const v = 0.28 + 0.37;
    chk(v, 0.65);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: "At a clinic, the probability that the next patient is seen by Dr Moyo is 0.28 and the probability that the patient is seen by Dr Ncube is 0.37. A patient is seen by only one doctor. Find the probability that the next patient is seen by Dr Moyo or Dr Ncube.",
      value: v, wrong: [0.28 * 0.37, 0.35],
      explanation: t`The events are mutually exclusive (one doctor per patient), so add: $0.28 + 0.37 = 0.65$. Multiplying would be the rule for independent events happening together.`,
    });
  }

  {
    const v = 0.6 * 0.35;
    chk(v, 0.21);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`Events $A$ and $B$ are independent, with $P(A) = 0.6$ and $P(B) = 0.35$. Find $P(A \cap B)$.`,
      value: v, wrong: [0.95, 0.74],
      explanation: t`Product rule: $P(A \cap B) = 0.6 \times 0.35 = 0.21$. Adding gives 0.95, which is not even a valid "and" probability here.`,
    });
  }

  {
    const v = 0.42 + 0.38 - 0.16;
    chk(v, 0.64);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: t`$P(A) = 0.42$, $P(B) = 0.38$ and $P(A \cap B) = 0.16$. Find $P(A \cup B)$.`,
      value: v, wrong: [0.8, 0.96],
      explanation: t`General addition rule: $0.42 + 0.38 - 0.16 = 0.64$. The answer 0.8 forgets to subtract the overlap.`,
    });
  }

  {
    chk(0.65 * 0.4, 0.26);
    b.mcq({
      d: 3, skill: "ANALYSIS", calculator: false,
      stem: t`For events $A$ and $B$, $P(A) = 0.65$, $P(B) = 0.4$ and $P(A \cap B) = 0.26$. Which statement is correct?`,
      options: [
        [t`$A$ and $B$ are independent but not mutually exclusive.`, t`Correct: $0.65 \times 0.4 = 0.26 = P(A \cap B)$, and $P(A \cap B) \neq 0$.`],
        [t`$A$ and $B$ are mutually exclusive but not independent.`, t`Mutually exclusive events have $P(A \cap B) = 0$, not 0.26.`],
        [t`$A$ and $B$ are neither independent nor mutually exclusive.`, t`Check the product: $0.65 \times 0.4$ is exactly 0.26.`],
        [t`$A$ and $B$ are both independent and mutually exclusive.`, "Events with non-zero probabilities cannot be both."],
      ],
      answer: "A",
      explanation: t`Independence test: $P(A) \times P(B) = 0.65 \times 0.4 = 0.26$, which equals $P(A \cap B)$, so they are independent. As $P(A \cap B) = 0.26 \neq 0$, they are not mutually exclusive.`,
      hints: [t`Compare $P(A) \times P(B)$ with $P(A \cap B)$.`],
    });
  }

  {
    const k = count((a, c) => a * c === 12);
    same(k, 4);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: "Two fair dice are rolled and the two scores are multiplied. Find the probability that the product is 12. Give your answer as a fraction or a decimal.",
      value: k / 36, wrong: [2 / 36, 4 / 12],
      explanation: t`Product 12 comes from (2, 6), (3, 4), (4, 3) and (6, 2): 4 of the 36 equally likely outcomes, so $P = \frac{4}{36} = \frac{1}{9}$. Counting (2, 6) and (3, 4) only once each gives $\frac{2}{36}$.`,
    });
  }

  {
    const k = count((a, c) => Math.abs(a - c) === 2);
    same(k, 8);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "Two fair dice are rolled. Find the probability that the scores differ by exactly 2. Give your answer as a fraction or a decimal.",
      value: k / 36, wrong: [4 / 36, 8 / 6],
      explanation: t`Pairs: (1, 3), (2, 4), (3, 5), (4, 6) and the same four the other way round, 8 outcomes. $P = \frac{8}{36} = \frac{2}{9}$. Listing only one order gives $\frac{4}{36}$.`,
      hints: ["Draw the 6 × 6 outcome table of differences.", "(1, 3) and (3, 1) are different outcomes."],
    });
  }

  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Two events $A$ and $B$ with $P(A) > 0$ and $P(B) > 0$ can be both mutually exclusive and independent.`,
    answer: false,
    explanation: t`False. Mutually exclusive means $P(A \cap B) = 0$; independent means $P(A \cap B) = P(A)P(B) > 0$. Both cannot hold when the probabilities are non-zero.`,
    hints: [t`What is $P(A \cap B)$ under each condition?`],
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "On a tree diagram, the probabilities on the branches leaving any one point add up to 1.",
    answer: true,
    explanation: "True. The branches from a point show every possible outcome of that stage, so their probabilities add up to 1. This is a useful check.",
  });

  {
    const v = 2 * (3 / 8) * (5 / 8);
    same(Fr.mul(2, Fr.mul(F(3, 8), F(5, 8))).s, "15/32");
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "A bag contains 3 green and 5 yellow balls. A ball is taken at random, its colour noted and it is replaced; then a second ball is taken. Find the probability that one ball is green and the other is yellow. Give your answer as a fraction or a decimal.",
      value: v, wrong: [15 / 64, 30 / 56],
      explanation: t`With replacement the draws are independent. $P(GY) + P(YG) = \frac{3}{8} \times \frac{5}{8} + \frac{5}{8} \times \frac{3}{8} = \frac{30}{64} = \frac{15}{32}$. The answer $\frac{15}{64}$ counts only one order; $\frac{30}{56}$ treats the draws as without replacement.`,
      hints: ["There are two orders: green then yellow, and yellow then green."],
    });
  }

  {
    same(Fr.mul(F(7, 12), F(6, 11)).s, "7/22");
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "A committee of two is chosen at random from 5 boys and 7 girls (without replacement). Find the probability that both members are girls. Give your answer as a fraction or a decimal.",
      value: (7 / 12) * (6 / 11), wrong: [(7 / 12) ** 2, 7 / 12],
      explanation: t`$P(GG) = \frac{7}{12} \times \frac{6}{11} = \frac{42}{132} = \frac{7}{22}$. After a girl is chosen, 6 girls remain among 11 learners. Using $\frac{7}{12} \times \frac{7}{12}$ treats the choice as with replacement.`,
      hints: ["After the first girl is chosen, how many girls and how many learners remain?"],
    });
  }

  {
    const v = 1 - 0.85 ** 3;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "Each seed in a packet germinates with probability 0.85, independently of the others. Rudo plants three seeds. Find the probability that at least one of them fails to germinate, correct to 3 significant figures.",
      value: v, wrong: [0.15 ** 3, 3 * 0.15],
      explanation: t`At least one fails $= 1 - P(\text{all three germinate}) = 1 - 0.85^3 = 1 - 0.614125 = 0.385875 \approx 0.386$. The answer $0.15^3$ is "all three fail"; $3 \times 0.15$ adds probabilities that overlap.`,
      hints: ["Use 1 − P(none fail)."],
    });
  }

  {
    const v = Fr.mul(2, Fr.mul(F(4, 9), F(5, 8)));
    same(v.s, "5/9");
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "A tin holds 4 red and 5 blue sweets. Nyasha takes two sweets at random without replacement. What is the probability that she takes one of each colour?",
      options: [
        [t`$\frac{5}{9}$`, t`Correct: $2 \times \frac{4}{9} \times \frac{5}{8} = \frac{40}{72}$.`],
        [t`$\frac{5}{18}$`, "This counts only red-then-blue; blue-then-red is equally likely."],
        [t`$\frac{40}{81}$`, t`This uses $\frac{5}{9}$ for the second sweet, as if the first were replaced.`],
        [t`$\frac{20}{81}$`, "This is one order only and with replacement."],
      ],
      answer: "A",
      explanation: t`$P(RB) = \frac{4}{9} \times \frac{5}{8} = \frac{20}{72}$ and $P(BR) = \frac{5}{9} \times \frac{4}{8} = \frac{20}{72}$. Total $\frac{40}{72} = \frac{5}{9}$.`,
      hints: ["Draw the tree: the second-stage probabilities have denominator 8."],
    });
  }

  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A drawer holds 6 black and 4 white socks. Two socks are taken at random without replacement. On the tree diagram, the first sock is black. Give the probabilities on the two second-stage branches that follow, as fractions.",
    template: "P(second black | first black) = {{blank:b}}; P(second white | first black) = {{blank:w}}",
    blanks: [
      { id: "b", input: "number", accepted: ["5/9"], tolerance: 0.005, wrong: "6/10" },
      { id: "w", input: "number", accepted: ["4/9"], tolerance: 0.005, wrong: "4/10" },
    ],
    explanation: t`After one black sock is removed, 5 black and 4 white remain, 9 socks in all: $\frac{5}{9}$ and $\frac{4}{9}$, which add to 1.`,
    hints: ["How many socks of each colour are left after a black one is taken?"],
  });

  {
    same([count((a, c) => a + c === 2), count((a, c) => a + c === 4), count((a, c) => a + c === 6), count((a, c) => a + c === 7), count((a, c) => a + c === 11)], [1, 3, 5, 6, 2]);
    b.match({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: "Two fair dice are rolled and the scores are added. Match each total with its probability.",
      pairs: [
        ["Total 2", t`$\frac{1}{36}$`],
        ["Total 4", t`$\frac{1}{12}$`],
        ["Total 6", t`$\frac{5}{36}$`],
        ["Total 7", t`$\frac{1}{6}$`],
        ["Total 11", t`$\frac{1}{18}$`],
      ],
      explanation: t`From the outcome table: total 2 occurs once, 4 three times ($\frac{3}{36}$), 6 five times, 7 six times ($\frac{6}{36}$) and 11 twice ($\frac{2}{36}$).`,
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Explain why two draws from a bag are independent when the first object is replaced, but not independent when it is not replaced.",
    points: [
      "With replacement the bag is restored, so the probabilities for the second draw are the same whatever happened on the first draw: the first draw does not affect the second.",
      "Without replacement the bag has one object fewer and its make-up depends on the first draw, so the second-draw probabilities change: the events are dependent.",
    ],
    modelAnswer: "If the first object is replaced, the bag is the same for the second draw, so the second draw's probabilities do not depend on the first result (independent). If it is not replaced, the contents of the bag depend on what was taken first, so the second draw's probabilities change (dependent).",
    explanation: "Independence means one result does not change the probabilities of the other.",
    hints: ["Does the bag look the same before the second draw?"],
  });

  {
    const x = (0.64 - 0.4) / 0.6;
    chk(x, 0.4);
    chk(x + 0.4 - x * 0.4, 0.64);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`Events $A$ and $B$ are independent. $P(A) = x$, $P(B) = 0.4$ and $P(A \cup B) = 0.64$. Find $x$.`,
      value: x, wrong: [0.24, 0.6],
      explanation: t`$P(A \cup B) = P(A) + P(B) - P(A)P(B)$, so $0.64 = x + 0.4 - 0.4x = 0.6x + 0.4$. Then $0.6x = 0.24$ and $x = 0.4$. The answer 0.24 forgets the overlap term.`,
      hints: [t`For independent events $P(A \cap B) = P(A) \times P(B) = 0.4x$.`],
    });
  }

  {
    const both = Fr.mul(F(4, 12), F(3, 11)), one = Fr.mul(2, Fr.mul(F(4, 12), F(8, 11))), none = Fr.mul(F(8, 12), F(7, 11));
    same([both.s, one.s, Fr.sub(F(1), none).s], ["1/11", "16/33", "19/33"]);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: false, examStyle: true,
      stem: "A tray of 12 eggs from a poultry farm in Marondera contains 4 cracked eggs. Tendai takes two eggs at random without replacement.",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the probability that both eggs are cracked, as a fraction or a decimal.", value: both.v, wrong: [(4 / 12) ** 2],
          explanation: t`$\frac{4}{12} \times \frac{3}{11} = \frac{12}{132} = \frac{1}{11}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the probability that exactly one egg is cracked, as a fraction or a decimal.", value: one.v, wrong: [(4 / 12) * (8 / 11)],
          explanation: t`$\frac{4}{12} \times \frac{8}{11} + \frac{8}{12} \times \frac{4}{11} = \frac{64}{132} = \frac{16}{33}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the probability that at least one egg is cracked, as a fraction or a decimal.", value: 1 - none.v, wrong: [1 - (8 / 12) ** 2],
          explanation: t`$1 - \frac{8}{12} \times \frac{7}{11} = 1 - \frac{56}{132} = \frac{76}{132} = \frac{19}{33}$. (Check: $\frac{12}{132} + \frac{64}{132} = \frac{76}{132}$.)` }),
        P.tf({ label: "(d)", marks: 1, stem: "The events \"the first egg is cracked\" and \"the second egg is cracked\" are independent.", answer: false,
          explanation: "False: the eggs are taken without replacement, so the second probability depends on the first egg." }),
      ],
      explanation: "Draw a tree with second-stage denominators of 11, multiply along paths and add across them.",
      hints: ["After a cracked egg is taken, 3 cracked and 8 good eggs remain."],
    });
  }

  {
    const both = 0.7 + 0.6 - 0.88;
    chk(both, 0.42); chk(0.7 * 0.6, 0.42);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: false, examStyle: true,
      stem: "The probability that Thandeka passes Mathematics is 0.7, the probability that she passes Science is 0.6, and the probability that she passes at least one of them is 0.88.",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the probability that she passes both subjects.", value: both, wrong: [0.48, 1.3],
          explanation: t`$P(M \cap S) = 0.7 + 0.6 - 0.88 = 0.42$.` }),
        P.proof({ label: "(b)", marks: 2, stem: "Show that passing Mathematics and passing Science are independent events.",
          points: [t`M1 calculates $P(M) \times P(S) = 0.7 \times 0.6 = 0.42$.`, t`A1 compares with $P(M \cap S) = 0.42$ and concludes they are equal, so independent.`],
          modelAnswer: t`$$
P(M) \times P(S) = 0.7 \times 0.6 = 0.42 = P(M \cap S)
$$

so the events are independent.`,
          explanation: t`The independence test is $P(A \cap B) = P(A) \times P(B)$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the probability that she passes exactly one of the subjects.", value: 0.88 - both, wrong: [0.88, 0.58],
          explanation: t`Exactly one $= P(\text{at least one}) - P(\text{both}) = 0.88 - 0.42 = 0.46$.` }),
        P.num({ label: "(d)", marks: 1, stem: "Find the probability that she passes neither subject.", value: 1 - 0.88, wrong: [0.3 * 0.4 + 0.1],
          explanation: t`$1 - 0.88 = 0.12$, which also equals $0.3 \times 0.4$ (independence).` }),
        P.manual({ label: "(e)", marks: 2, stem: "Are the two events mutually exclusive? Give a reason.",
          points: ["No.", t`Because $P(M \cap S) = 0.42 \neq 0$: she can pass both.`],
          modelAnswer: t`No. Mutually exclusive events cannot happen together, but $P(M \cap S) = 0.42$, which is not 0.`,
          explanation: "Mutually exclusive means the intersection has probability 0." }),
      ],
      explanation: "Use the general addition rule, then test independence with the product rule.",
      hints: [t`$P(A \cup B) = P(A) + P(B) - P(A \cap B)$.`],
    });
  }

  // flashcards
  b.card("FORMULA", "Addition rule (mutually exclusive)", t`$P(A \cup B) = P(A) + P(B)$`, t`Only when $P(A \cap B) = 0$.`);
  b.card("FORMULA", "General addition rule", t`$P(A \cup B) = P(A) + P(B) - P(A \cap B)$`);
  b.card("FORMULA", "Product rule (independent events)", t`$P(A \cap B) = P(A) \times P(B)$`);
  b.card("CONCEPT", "Testing for independence", t`Compare $P(A \cap B)$ with $P(A) \times P(B)$: equal means independent.`);
  b.card("DEFINITION", "Independent events", "Events where one happening does not change the probability of the other.");
  b.card("CONCEPT", "Tree diagram rules", "Multiply along the branches of a path; add the probabilities of different paths. Branches from one point add to 1.");
  b.card("CONCEPT", "With and without replacement", "With replacement: the draws are independent and the probabilities repeat. Without replacement: the second-stage probabilities change.");
  b.card("FORMULA", "At least one", t`$P(\text{at least one}) = 1 - P(\text{none})$`);
  b.card("FACT", "Two dice", "There are 36 equally likely outcomes; a total of 7 is the most likely total, with probability 6/36 = 1/6.");
});
