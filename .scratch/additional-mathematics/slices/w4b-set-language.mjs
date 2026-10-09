// W4b: amath.probability.set-language (ZIMSEC only)
import { concept, P, t, chk, same, F } from "../lib.mjs";

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

concept("amath.probability.set-language", { file: "probability/set-language", keyPrefix: "probability.set-language" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "In probability, what is the **sample space** of a trial?",
    options: [
      ["The set of all possible outcomes of the trial", "Correct: the sample space S lists every outcome that can happen."],
      ["The set of outcomes that make a chosen event happen", "That is an event, which is a subset of the sample space."],
      ["The number of times the trial is repeated", "Repeating a trial gives frequencies; the sample space is a set of outcomes."],
      ["The probability that the trial gives a particular result", "A probability is a number from 0 to 1, not a set of outcomes."],
    ],
    answer: "A",
    explanation: t`The sample space $S$ is the set of all possible outcomes. For a die, $S = \{1, 2, 3, 4, 5, 6\}$. An event is any subset of $S$.`,
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$A$ and $B$ are events. Which notation describes the event "$A$ and $B$ both happen"?`,
    options: [
      [t`$A \cap B$`, "Correct: the intersection contains the outcomes in both events."],
      [t`$A \cup B$`, "The union means A or B or both: it includes outcomes in only one event."],
      [t`$A' \cap B'$`, "This is the event that neither A nor B happens."],
      [t`$A \cap B'$`, "This is A happening without B (A only)."],
    ],
    answer: "A",
    explanation: t`Intersection $\cap$ is "and"; union $\cup$ is "or (or both)"; a dash $'$ is "not".`,
  });

  {
    const n = 2 * 6;
    b.mcq({
      d: 2, skill: "UNDERSTANDING", calculator: false,
      stem: "A coin is tossed and a fair six-sided die is rolled. How many outcomes are in the sample space?",
      options: [
        [String(n), "Correct: each of the 2 coin results pairs with each of the 6 die scores, 2 × 6 = 12."],
        ["8", "The outcomes must be multiplied, not added: 2 + 6 = 8 counts results, not pairs."],
        ["36", "36 is the number of outcomes for two dice, 6 × 6."],
        ["6", "This counts the die only; each score can come with a head or a tail."],
      ],
      answer: "A",
      explanation: t`The outcomes are pairs such as (H, 3) or (T, 5). There are $2 \times 6 = ${n}$ of them, all equally likely.`,
    });
  }

  {
    const S = range(1, 20);
    const A = S.filter((x) => x % 3 === 0 || x % 5 === 0);
    same(A.length, 9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false, daily: true,
      stem: "Twenty cards are numbered 1 to 20 and one card is chosen at random. Find the probability that its number is a multiple of 3 or a multiple of 5. Give your answer as a fraction or a decimal.",
      value: A.length / 20, wrong: [10 / 20, 6 / 20],
      explanation: t`Multiples of 3: 3, 6, 9, 12, 15, 18 (6 cards). Multiples of 5: 5, 10, 15, 20 (4 cards). 15 is in both, so $n(A \cup B) = 6 + 4 - 1 = 9$ and the probability is $\frac{9}{20} = 0.45$. The answer $\frac{10}{20}$ counts 15 twice.`,
      hints: ["List both sets and look for a number that is in both."],
    });
  }

  {
    const neither = 35 - (19 + 14 - 6);
    same(neither, 8);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: "In a class of 35 learners, 19 play netball, 14 play volleyball and 6 play both. A learner is chosen at random. Find the probability that the learner plays neither game. Give your answer as a fraction or a decimal.",
      value: neither / 35, wrong: [2 / 35, 21 / 35],
      explanation: t`Netball only $19 - 6 = 13$, volleyball only $14 - 6 = 8$, both 6, so $13 + 8 + 6 = 27$ play at least one game. Neither: $35 - 27 = 8$, probability $\frac{8}{35}$. Subtracting $19 + 14 = 33$ from 35 (giving $\frac{2}{35}$) counts the 6 learners twice.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`For any event $A$, $P(A') = 1 - P(A)$.`,
    answer: true,
    explanation: t`True. Every outcome is either in $A$ or in $A'$ and never in both, so $P(A) + P(A') = 1$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For any two events $A$ and $B$, $n(A \cup B) = n(A) + n(B)$.`,
    answer: false,
    explanation: t`False. Adding $n(A)$ and $n(B)$ counts the outcomes in $A \cap B$ twice, so $n(A \cup B) = n(A) + n(B) - n(A \cap B)$. The simple sum is correct only when $A$ and $B$ do not overlap (mutually exclusive events).`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each event, written in set notation, with its meaning.",
    pairs: [
      [t`$A \cup B$`, t`$A$ or $B$ or both happen`],
      [t`$A \cap B$`, t`$A$ and $B$ both happen`],
      [t`$A'$`, t`$A$ does not happen`],
      [t`$A \cap B'$`, t`$A$ happens but $B$ does not`],
      [t`$(A \cup B)'$`, t`neither $A$ nor $B$ happens`],
    ],
    explanation: t`$\cup$ is "or", $\cap$ is "and", and a dash means "not". $(A \cup B)'$ is everything outside both circles.`,
  });

  {
    const union = 50 - 9, both = 31 + 22 - union;
    same([union, both, 31 - both, 22 - both], [41, 12, 19, 10]);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "A tour group of 50 visitors at Victoria Falls was asked about two activities: 31 took the rainforest walk, 22 crossed the bridge and 9 did neither. Complete the numbers for the Venn diagram.",
      template: "Both activities: {{blank:b}}; rainforest walk only: {{blank:r}}; bridge only: {{blank:g}}",
      blanks: [
        { id: "b", input: "number", accepted: [both], wrong: "3" },
        { id: "r", input: "number", accepted: [31 - both], wrong: "31" },
        { id: "g", input: "number", accepted: [22 - both], wrong: "22" },
      ],
      explanation: t`At least one activity: $50 - 9 = 41$. Then $n(R \cap B) = 31 + 22 - 41 = 12$, walk only $31 - 12 = 19$, bridge only $22 - 12 = 10$. Check: $19 + 10 + 12 + 9 = 50$.`,
      hints: ["First find how many visitors did at least one activity."],
    });
  }

  {
    const both = 0.55 + 0.35 - 0.7;
    chk(both, 0.2);
    const exactlyOne = 0.7 - both;
    chk(exactlyOne, 0.5);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`For events $A$ and $B$, $P(A) = 0.55$, $P(B) = 0.35$ and $P(A \cup B) = 0.7$. Find the probability that exactly one of the events happens.`,
      value: exactlyOne, wrong: [0.7, 0.9],
      explanation: t`$P(A \cap B) = 0.55 + 0.35 - 0.7 = 0.2$. Exactly one is the union without the overlap: $0.7 - 0.2 = 0.5$. (Check: $A$ only $0.35$, $B$ only $0.15$, total $0.5$.)`,
      hints: [t`Find $P(A \cap B)$ first.`],
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`On a Venn diagram with two overlapping circles $A$ and $B$, the shaded region is the part of circle $B$ that lies outside circle $A$. Which event is shaded?`,
    options: [
      [t`$A' \cap B$`, "Correct: in B and not in A."],
      [t`$A \cap B'$`, "This is the part of A outside B."],
      [t`$(A \cap B)'$`, "This is everything except the overlap, including A only and the outside."],
      [t`$A' \cup B$`, "This union also contains the region outside both circles."],
    ],
    answer: "A",
    explanation: t`"In $B$" is $B$ and "outside $A$" is $A'$. Both conditions together: $A' \cap B$, often called "$B$ only".`,
  });

  {
    const S = range(1, 30);
    const A = S.filter((x) => x % 4 === 0), B = S.filter((x) => x % 6 === 0);
    const U = S.filter((x) => x % 4 === 0 || x % 6 === 0);
    same([A.length, B.length, U.length], [7, 5, 10]);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "A whole number from 1 to 30 inclusive is chosen at random. Find the probability that it is a multiple of 4 or a multiple of 6 (or both). Give your answer as a fraction or a decimal.",
      value: U.length / 30, wrong: [12 / 30, 2 / 30],
      explanation: t`Multiples of 4: 7 numbers. Multiples of 6: 5 numbers. Multiples of both are multiples of 12: 12 and 24. So $n = 7 + 5 - 2 = 10$ and the probability is $\frac{10}{30} = \frac{1}{3}$. The answer $\frac{12}{30}$ counts 12 and 24 twice; $\frac{2}{30}$ is the "both" event only.`,
      hints: ["A number that is a multiple of both 4 and 6 is a multiple of 12."],
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A fair die is rolled once. Which two events are mutually exclusive?",
    options: [
      ["The score is 1 and the score is even", "Correct: 1 is odd, so the events have no outcome in common."],
      ["The score is even and the score is more than 3", "4 and 6 are in both events, so they can happen together."],
      ["The score is odd and the score is a prime number", "3 and 5 are both odd and prime."],
      ["The score is less than 3 and the score is a factor of 6", "1 and 2 are less than 3 and are factors of 6."],
    ],
    answer: "A",
    explanation: t`Mutually exclusive events have $A \cap B = \varnothing$: they cannot happen together. Only "score is 1" and "score is even" share no outcome.`,
  });

  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`For any events $A$ and $B$, $(A \cup B)' = A' \cap B'$.`,
    answer: true,
    explanation: t`True. Outside the union means outside both circles, which is "not $A$ and not $B$". On a Venn diagram both sides are the region outside the two circles.`,
    hints: ["Shade each side on a Venn diagram."],
  });

  {
    // 45 workers: Shona 28, Ndebele 20, both 2x, neither x
    const x = 48 - 45;
    same(28 - 2 * x + 20 - 2 * x + 2 * x + x, 45);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`On a tobacco farm near Karoi there are 45 workers. 28 speak Shona and 20 speak Ndebele. The number who speak both languages is $2x$ and the number who speak neither is $x$. A worker is chosen at random. Find the probability that the worker speaks both languages. Give your answer as a fraction or a decimal.`,
      value: (2 * x) / 45, wrong: [x / 45, 6 / 48],
      explanation: t`Shona only $28 - 2x$, Ndebele only $20 - 2x$. Total: $(28 - 2x) + (20 - 2x) + 2x + x = 48 - x = 45$, so $x = 3$. Both: $2x = 6$, probability $\frac{6}{45} = \frac{2}{15}$. The answer $\frac{3}{45}$ uses $x$ instead of $2x$.`,
      hints: ["Write every region of the Venn diagram in terms of x and add them.", "The four regions add up to 45."],
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Events $A$ and $B$ are shown on a Venn diagram. Which event is "at least one of $A$ and $B$ happens"?`,
    options: [
      [t`$A \cup B$`, "Correct: the union contains A only, B only and both."],
      [t`$A \cap B$`, "This requires both events, not at least one."],
      [t`$(A \cap B)'$`, "This includes the region outside both circles, where neither happens."],
      [t`$(A' \cap B) \cup (A \cap B')$`, "This is exactly one of the events; it leaves out the overlap."],
    ],
    answer: "A",
    explanation: t`"At least one" means one or the other or both, which is the union $A \cup B$. Its complement is "neither".`,
  });

  b.manualShort({
    d: 3, skill: "APPLICATION", calculator: false, marks: 3,
    stem: "Of 30 learners in a Form 4 class, 17 own a bicycle, 12 own a radio and 5 own both. Describe the completed Venn diagram you would draw, giving the number in every region.",
    points: [
      "A rectangle labelled with 30 (the class) containing two overlapping circles labelled for bicycle and radio.",
      "Overlap 5; bicycle only 12; radio only 7.",
      "Outside both circles: 30 − (12 + 7 + 5) = 6.",
    ],
    modelAnswer: "Draw a rectangle for the 30 learners with two overlapping circles, B (bicycle) and R (radio). Write 5 in the overlap, 17 − 5 = 12 in B only, 12 − 5 = 7 in R only and 30 − 24 = 6 outside both circles.",
    explanation: "Fill a Venn diagram from the centre outwards: overlap, then each circle, then the outside.",
    hints: ["Start with the learners who own both."],
  });

  {
    const xAll = 78 - 72;
    same(xAll / 2, 3);
    const x = 3;
    const mOnly = 33 - x - 9 - 7, sOnly = 30 - x - 9 - 6, dOnly = 25 - x - 6 - 7;
    same([mOnly, sOnly, dOnly], [14, 12, 9]);
    same(mOnly + sOnly + dOnly + 9 + 6 + 7 + x + 12, 72);
    const two = 9 + 6 + 7;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: false, examStyle: true,
      stem: t`At a school in Mutare, 72 learners were asked about three clubs: Mathematics ($M$), Science ($S$) and Debate ($D$). 33 belong to $M$, 30 to $S$ and 25 to $D$. 9 belong to $M$ and $S$ only, 6 to $S$ and $D$ only and 7 to $M$ and $D$ only. $x$ learners belong to all three clubs and 12 belong to none.`,
      parts: [
        P.proof({
          label: "(a)", marks: 2,
          stem: t`Show that the number of learners in $M$ only is $17 - x$, and write similar expressions for $S$ only and $D$ only.`,
          points: [
            t`M1 subtracts the three overlapping regions of $M$: $33 - x - 9 - 7 = 17 - x$.`,
            t`A1 $S$ only $= 15 - x$ and $D$ only $= 12 - x$.`,
          ],
          modelAnswer: t`$$
M \text{ only} = 33 - 9 - 7 - x = 17 - x
$$

$$
S \text{ only} = 30 - 9 - 6 - x = 15 - x, \qquad D \text{ only} = 25 - 6 - 7 - x = 12 - x
$$`,
          explanation: "Each circle total is shared between its four regions.",
        }),
        P.num({ label: "(b)", marks: 2, stem: t`Find $x$.`, value: x, wrong: [6, 4],
          explanation: t`$(17 - x) + (15 - x) + (12 - x) + 9 + 6 + 7 + x + 12 = 78 - 2x = 72$, so $x = 3$. The answer 6 is $2x$.` }),
        P.num({ label: "(c)", marks: 1, stem: "A learner is chosen at random. Find the probability that the learner belongs to exactly two clubs, as a fraction or a decimal.", value: two / 72, wrong: [(two + x) / 72],
          explanation: t`Exactly two: $9 + 6 + 7 = 22$, so $\frac{22}{72}$. The centre region (all three) is not "exactly two".` }),
        P.num({ label: "(d)", marks: 2, stem: "Find the probability that the learner belongs to exactly one club, as a fraction or a decimal.", value: (mOnly + sOnly + dOnly) / 72, wrong: [(33 + 30 + 25) / 72],
          explanation: t`$14 + 12 + 9 = 35$, so $\frac{35}{72}$.` }),
      ],
      explanation: "Express every region in terms of x, add all eight regions to the total, then read off the probabilities.",
      hints: ["Eight regions: centre, three 'two only', three 'one only', outside.", "Their sum is 72."],
    });
  }

  {
    const x = 0.4 + 0.5 - (1 - 0.25);
    chk(x, 0.15);
    const aOnly = 0.4 - x, bOnly = 0.5 - x;
    chk(aOnly, 0.25); chk(bOnly, 0.35);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: false, examStyle: true,
      stem: t`For two events $A$ and $B$, $P(A) = 0.4$, $P(B) = 0.5$, $P(A \cap B) = x$ and $P(A' \cap B') = 0.25$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Find $x$.`, value: x, wrong: [0.35, 0.1],
          explanation: t`$P(A \cup B) = 1 - 0.25 = 0.75$, and $0.75 = 0.4 + 0.5 - x$, so $x = 0.15$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Find $P(A \cap B')$.`, value: aOnly, wrong: [0.4],
          explanation: t`$A$ only: $0.4 - 0.15 = 0.25$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Find the probability that exactly one of the events happens.", value: aOnly + bOnly, wrong: [0.75],
          explanation: t`$0.25 + 0.35 = 0.6$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Find $P(A \cup B')$.`, value: 1 - bOnly, wrong: [0.4 + 0.5, 0.25 + 0.25],
          explanation: t`$A \cup B'$ is everything except "$B$ only": $1 - 0.35 = 0.65$. (Or $A$ only $0.25$ + both $0.15$ + neither $0.25$.)` }),
      ],
      explanation: "Use the outside region to find P(A ∪ B), then fill the Venn diagram from the overlap outwards.",
      hints: [t`$P(A \cup B) = 1 - P(A' \cap B')$.`],
    });
  }

  // flashcards
  b.card("DEFINITION", "Sample space", t`The set $S$ of all possible outcomes of a trial. For one roll of a die, $S = \{1, 2, 3, 4, 5, 6\}$.`);
  b.card("DEFINITION", "Event", t`A set of outcomes (a subset of the sample space), e.g. "an even score" $= \{2, 4, 6\}$.`);
  b.card("FORMULA", "Probability with equally likely outcomes", t`$P(A) = \dfrac{n(A)}{n(S)}$`, "Only when every outcome is equally likely.");
  b.card("FORMULA", "Complement rule", t`$P(A') = 1 - P(A)$`);
  b.card("CONCEPT", t`$A \cup B$, $A \cap B$, $A'$`, t`$A \cup B$: $A$ or $B$ or both. $A \cap B$: both. $A'$: not $A$.`);
  b.card("FORMULA", "Counting a union", t`$n(A \cup B) = n(A) + n(B) - n(A \cap B)$`, "Subtract the overlap, which was counted twice.");
  b.card("DEFINITION", "Mutually exclusive events", t`Events that cannot happen together: $A \cap B = \varnothing$. Their circles on a Venn diagram do not overlap.`);
  b.card("FACT", "Regions of a Venn diagram", "Two events: 4 regions. Three events: 8 regions (including the outside).");
  b.card("CONCEPT", "Filling a Venn diagram", "Start in the centre (all events), then the 'two only' regions, then each 'one only' region, then the outside.");
});
