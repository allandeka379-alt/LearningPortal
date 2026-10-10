// W3a: amaths.probability.conditional (trees checked by exact fractions or enumeration)
import { concept, P, t, chk, same, F, nCr, sfStr, table } from "../lib.mjs";

function subsets(items, r) {
  if (r === 0) return [[]];
  if (items.length < r) return [];
  const [h, ...rest] = items;
  return [...subsets(rest, r - 1).map((s) => [h, ...s]), ...subsets(rest, r)];
}
const range = (p, n) => Array.from({ length: n }, (_, i) => `${p}${i + 1}`);
const cnt = (s, p) => s.filter((x) => x[0] === p).length;
/** Ordered draws of k items without replacement: all sequences (equally likely). */
function draws(items, k) {
  if (k === 0) return [[]];
  const out = [];
  items.forEach((x, i) => { for (const r of draws([...items.slice(0, i), ...items.slice(i + 1)], k - 1)) out.push([x, ...r]); });
  return out;
}
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });

concept("amaths.probability.conditional", { file: "probability/conditional", keyPrefix: "probability.conditional" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which formula gives $\mathrm{P}(A \mid B)$?`,
    options: [
      [t`$\dfrac{\mathrm{P}(A \cap B)}{\mathrm{P}(B)}$`, "Correct: the given event B becomes the new whole."],
      [t`$\dfrac{\mathrm{P}(A \cap B)}{\mathrm{P}(A)}$`, t`This is $\mathrm{P}(B \mid A)$: it divides by the wrong event.`],
      [t`$\mathrm{P}(A)\,\mathrm{P}(B)$`, "This is P(A ∩ B) only when A and B are independent."],
      [t`$\dfrac{\mathrm{P}(A)}{\mathrm{P}(B)}$`, t`The numerator must be the overlap $\mathrm{P}(A \cap B)$.`],
    ],
    answer: "A",
    explanation: t`Given $B$, only outcomes in $B$ remain possible, and of those the ones in $A$ form $A \cap B$: $\mathrm{P}(A \mid B) = \frac{\mathrm{P}(A \cap B)}{\mathrm{P}(B)}$.`,
  });

  chk(0.18 / 0.45, 0.4);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`For events $A$ and $B$, $\mathrm{P}(B) = 0.45$ and $\mathrm{P}(A \cap B) = 0.18$. Find $\mathrm{P}(A \mid B)$.`,
    value: 0.18 / 0.45, wrong: [0.081, 2.5],
    explanation: t`$\mathrm{P}(A \mid B) = \frac{0.18}{0.45} = 0.4$. (0.081 multiplies instead of dividing.)`,
  });

  // two picks without replacement: 5 red, 3 white beads
  const bag = [...range("R", 5), ...range("W", 3)];
  const seq = draws(bag, 2);
  const pBothR = seq.filter((s) => cnt(s, "R") === 2).length / seq.length;
  same(F(5 * 4, 8 * 7).s, "5/14"); chk(pBothR, 5 / 14);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "A box holds 5 red and 3 white beads. Two beads are taken at random without replacement. Find the probability that both are red. Give your answer as a fraction or a decimal correct to 3 significant figures.",
    value: pBothR, wrong: [25 / 64, 5 / 8],
    explanation: t`$\mathrm{P}(RR) = \frac{5}{8} \times \frac{4}{7} = \frac{20}{56} = \frac{5}{14} \approx ${sfStr(5 / 14, 3)}$. ($\frac{25}{64}$ assumes the first bead is put back.)`,
  });

  const pDiff = seq.filter((s) => cnt(s, "R") === 1).length / seq.length;
  same(F(2 * 5 * 3, 56).s, "15/28"); chk(pDiff, 15 / 28);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "From the same box (5 red and 3 white beads), two beads are taken at random without replacement. Find the probability that they are different colours. Give your answer as a fraction or a decimal correct to 3 significant figures.",
    value: pDiff, wrong: [15 / 56, 30 / 64],
    explanation: t`$\mathrm{P}(RW) + \mathrm{P}(WR) = \frac{5}{8} \times \frac{3}{7} + \frac{3}{8} \times \frac{5}{7} = \frac{30}{56} = \frac{15}{28} \approx ${sfStr(15 / 28, 3)}$. ($\frac{15}{56}$ counts only one of the two orders.)`,
    hints: ["There are two paths: red then white, and white then red."],
  });

  const p2W_given_same = (3 * 2) / (5 * 4 + 3 * 2);
  chk(p2W_given_same, seq.filter((s) => cnt(s, "W") === 2).length / seq.filter((s) => s[0][0] === s[1][0]).length);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "From the same box (5 red and 3 white beads), two beads are taken at random without replacement. Given that the two beads are the same colour, find the probability that they are both white. Give your answer as a fraction or a decimal correct to 3 significant figures.",
    value: p2W_given_same, wrong: [6 / 56, 3 / 8],
    explanation: t`$\mathrm{P}(\text{same}) = \frac{20}{56} + \frac{6}{56} = \frac{26}{56}$. $\mathrm{P}(WW \mid \text{same}) = \frac{6/56}{26/56} = \frac{6}{26} = \frac{3}{13} \approx ${sfStr(3 / 13, 3)}$. ($\frac{6}{56}$ is $\mathrm{P}(WW)$ without the condition.)`,
    hints: ["Find P(same colour) first: it is the denominator."],
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "A tin holds 3 red and 2 green pens. Tendai takes a pen at random, notes its colour and puts it back, then takes a pen at random again. What is the probability that both pens are red?",
    options: [
      [t`$\frac{9}{25}$`, t`Correct: with replacement the picks are independent, $\frac{3}{5} \times \frac{3}{5}$.`],
      [t`$\frac{3}{10}$`, t`This is $\frac{3}{5} \times \frac{2}{4}$, the answer without replacement.`],
      [t`$\frac{6}{25}$`, t`This is $\frac{3}{5} \times \frac{2}{5}$, red then green.`],
      [t`$\frac{6}{5}$`, "Adding the two probabilities gives a value above 1, which is impossible."],
    ],
    answer: "A",
    explanation: t`The pen is replaced, so the second pick has the same probabilities: $\left(\frac{3}{5}\right)^2 = \frac{9}{25}$.`,
  });
  chk((3 / 5) ** 2, 9 / 25);

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`$\mathrm{P}(A) = 0.7$ and $\mathrm{P}(B \mid A) = 0.2$. Find $\mathrm{P}(A \cap B')$.`,
    options: [
      ["0.56", t`Correct: $0.7 \times (1 - 0.2) = 0.56$.`],
      ["0.14", t`This is $\mathrm{P}(A \cap B) = 0.7 \times 0.2$.`],
      ["0.24", t`This is $0.3 \times 0.8$, which uses $\mathrm{P}(A')$ instead of $\mathrm{P}(A)$.`],
      ["0.06", t`This is $0.3 \times 0.2$, the wrong branch at both stages.`],
    ],
    answer: "A",
    explanation: t`On the tree, the path "$A$ then not $B$" has probability $0.7 \times 0.8 = 0.56$.`,
  });
  chk(0.7 * 0.8, 0.56);

  // independence numeric
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\mathrm{P}(A) = 0.3$, $\mathrm{P}(B) = 0.5$ and $\mathrm{P}(A \cup B) = 0.65$. Which statement is correct?`,
    options: [
      [t`$A$ and $B$ are independent, since $\mathrm{P}(A \cap B) = 0.15$`, t`Correct: $0.3 + 0.5 - 0.65 = 0.15 = 0.3 \times 0.5$.`],
      [t`$A$ and $B$ are exclusive, since $\mathrm{P}(A \cap B) = 0$`, t`$\mathrm{P}(A) + \mathrm{P}(B) = 0.8 \ne 0.65$, so the overlap is not 0.`],
      [t`$A$ and $B$ are not independent, since $0.3 + 0.5 \ne 0.65$`, "That compares the union with the sum; it tests exclusivity, not independence."],
      [t`$A$ and $B$ are not independent, since $\mathrm{P}(A \cap B) = 0.35$`, t`$0.35$ is $\mathrm{P}(A \cup B) - \mathrm{P}(A)$, not the overlap.`],
    ],
    answer: "A",
    explanation: t`$\mathrm{P}(A \cap B) = \mathrm{P}(A) + \mathrm{P}(B) - \mathrm{P}(A \cup B) = 0.15$, and $\mathrm{P}(A)\,\mathrm{P}(B) = 0.15$, so they are independent.`,
    hints: ["Find P(A ∩ B) from the addition rule first."],
  });
  chk(0.3 + 0.5 - 0.65, 0.15); chk(0.3 * 0.5, 0.15);

  // independent: find P(A ∪ B)
  chk(0.4 + 0.25 - 0.4 * 0.25, 0.55);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Events $A$ and $B$ are independent, with $\mathrm{P}(A) = 0.4$ and $\mathrm{P}(B) = 0.25$. Find $\mathrm{P}(A \cup B)$.`,
    value: 0.55, wrong: [0.65, 0.1],
    explanation: t`$\mathrm{P}(A \cap B) = 0.4 \times 0.25 = 0.1$, so $\mathrm{P}(A \cup B) = 0.4 + 0.25 - 0.1 = 0.55$. (0.65 treats the events as exclusive.)`,
  });

  // independence with unknown
  // P(A)=0.6, P(B)=x, P(A∪B)=0.8, independent: 0.6 + x - 0.6x = 0.8 -> 0.4x = 0.2 -> x = 0.5
  chk(0.2 + 0.5 - 0.2 * 0.5, 0.6);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Events $A$ and $B$ are independent. $\mathrm{P}(A) = 0.2$ and $\mathrm{P}(A \cup B) = 0.6$. Find $\mathrm{P}(B)$.`,
    value: 0.5, wrong: [0.4, 0.8],
    explanation: t`Let $\mathrm{P}(B) = x$. Then $0.6 = 0.2 + x - 0.2x$, so $0.8x = 0.4$ and $x = 0.5$. (0.4 treats the events as exclusive.)`,
    hints: [t`Use $\mathrm{P}(A \cap B) = 0.2x$ in the addition rule.`],
  });

  // kombi tree-like: Harare-Bulawayo bus
  const pRain = 0.3, pLateR = 0.45, pLateD = 0.15;
  const pLate = pRain * pLateR + (1 - pRain) * pLateD;
  chk(pLate, 0.24);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "On a given day the probability of rain on the Harare–Bulawayo road is 0.3. If it rains, a bus arrives late with probability 0.45; if it does not rain, it arrives late with probability 0.15. Find the probability that the bus is late, and the probability that it rained given that the bus was late (to 3 significant figures).",
    template: "P(late) = {{blank:l}}; P(rain | late) = {{blank:r}}",
    blanks: [{ ...N("l", pLate, "0.6"), tolerance: 0.0005 }, { id: "r", input: "number", accepted: [sfStr(pRain * pLateR / pLate, 3)], tolerance: 0.0005, wrong: "0.135" }],
    explanation: t`$\mathrm{P}(L) = 0.3 \times 0.45 + 0.7 \times 0.15 = 0.135 + 0.105 = 0.24$. $\mathrm{P}(R \mid L) = \frac{0.135}{0.24} = 0.5625 \approx ${sfStr(0.135 / 0.24, 3)}$. (0.135 is $\mathrm{P}(R \cap L)$, not the conditional probability.)`,
    hints: ["Draw a tree: rain or not, then late or not.", "Divide the 'rain and late' path by the total probability of late."],
  });

  // two-way table
  chk(60 + 36 + 48 + 96, 240);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A survey of 240 adults in Gweru asked whether they drink tea at breakfast.

${table(["", "Tea", "No tea", "Total"], [["Men", 60, 36, 96], ["Women", 48, 96, 144], ["Total", 108, 132, 240]])}

One adult is chosen at random. Given that the adult drinks tea, find the probability that the adult is a man. Give your answer as a fraction or a decimal correct to 3 significant figures.`,
    value: 60 / 108, wrong: [0.625, 0.25],
    explanation: t`Restrict to the tea column: 108 adults, of whom 60 are men. $\mathrm{P}(M \mid T) = \frac{60}{108} = \frac{5}{9} \approx ${sfStr(60 / 108, 3)}$. (0.625 is $\mathrm{P}(T \mid M) = \frac{60}{96}$, the reverse condition.)`,
    hints: ["The condition 'drinks tea' picks out one column of the table."],
  });

  chk((120 / 300) * (90 / 300), 0.12); chk(30 / 300, 0.1); chk(30 / 120, 0.25);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "A school in Kwekwe has 300 learners: 120 boys, of whom 30 sing in the choir, and 180 girls, of whom 60 sing in the choir. Are the events 'is a boy' and 'sings in the choir' independent?",
    options: [
      [t`No: $\mathrm{P}(B \cap C) = 0.1$ but $\mathrm{P}(B)\,\mathrm{P}(C) = 0.12$`, t`Correct: $\frac{30}{300} = 0.1$ and $0.4 \times 0.3 = 0.12$ differ.`],
      [t`Yes: $\mathrm{P}(B \cap C) = 0.1 = \mathrm{P}(B)\,\mathrm{P}(C)$`, t`$\mathrm{P}(B)\,\mathrm{P}(C) = 0.4 \times 0.3 = 0.12$, not 0.1.`],
      [t`No: $\mathrm{P}(B \cap C) \ne 0$`, "A non-zero overlap shows the events are not exclusive; it says nothing about independence."],
      [t`Yes: $\mathrm{P}(C \mid B) = 0.25 < \mathrm{P}(B)$`, t`Independence compares $\mathrm{P}(C \mid B)$ with $\mathrm{P}(C) = 0.3$, not with $\mathrm{P}(B)$.`],
    ],
    answer: "A",
    explanation: t`$\mathrm{P}(B) = 0.4$, $\mathrm{P}(C) = 0.3$, $\mathrm{P}(B \cap C) = 0.1 \ne 0.12$. Equivalently $\mathrm{P}(C \mid B) = 0.25 \ne 0.3$: boys are less likely to sing in the choir, so the events are not independent.`,
    hints: ["Compute P(B), P(C) and P(B ∩ C) from the counts."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $A$ and $B$ are mutually exclusive and $\mathrm{P}(A) > 0$ and $\mathrm{P}(B) > 0$, then $A$ and $B$ cannot be independent.`,
    answer: true,
    explanation: t`Exclusive gives $\mathrm{P}(A \cap B) = 0$, but $\mathrm{P}(A)\,\mathrm{P}(B) > 0$, so the independence condition fails. If $A$ happens, $B$ becomes impossible, which changes its probability.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For any events with $\mathrm{P}(A) > 0$ and $\mathrm{P}(B) > 0$, $\mathrm{P}(A \mid B) = \mathrm{P}(B \mid A)$.`,
    answer: false,
    explanation: t`Both have numerator $\mathrm{P}(A \cap B)$ but the denominators are $\mathrm{P}(B)$ and $\mathrm{P}(A)$. They are equal only when $\mathrm{P}(A) = \mathrm{P}(B)$. In the Gweru tea survey, $\mathrm{P}(T \mid M) = 0.625$ but $\mathrm{P}(M \mid T) \approx 0.556$.`,
  });

  // counting conditional
  const team = subsets([...range("B", 6), ...range("G", 5)], 4);
  const cond = team.filter((s) => cnt(s, "G") >= 2);
  const p = cond.filter((s) => cnt(s, "G") === 2).length / cond.length;
  chk(cond.length, nCr(11, 4) - nCr(6, 4) - nCr(5, 1) * nCr(6, 3)); chk(cond.length, 215);
  same(F(nCr(5, 2) * nCr(6, 2), 215).s, "30/43"); chk(p, 30 / 43);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "A group of 4 is chosen at random from 6 boys and 5 girls to represent a school in Masvingo. Given that the group contains at least two girls, find the probability that it contains exactly two girls. Give your answer as a fraction or a decimal correct to 3 significant figures.",
    value: p, wrong: [150 / 330, 150 / 315],
    explanation: t`All groups: ${"$"}{}^{11}C_4 = 330$. Fewer than two girls: no girl ${"$"}{}^6C_4 = 15$; one girl ${"$"}{}^5C_1 \times {}^6C_3 = 100$. At least two girls: $330 - 115 = 215$. Exactly two girls: ${"$"}{}^5C_2 \times {}^6C_2 = 150$. $\mathrm{P} = \frac{150}{215} = \frac{30}{43} \approx ${sfStr(30 / 43, 3)}$. ($\frac{150}{330}$ ignores the condition.)`,
    hints: ["The denominator is the number of groups with at least two girls.", "Count the complement: groups with 0 or 1 girl."],
  });

  // Find P(A ∩ B') etc
  // P(A)=0.5, P(B|A)=0.3, P(B|A')=0.6 -> P(B)=0.45, P(A|B') = 0.35/0.55
  const pB = 0.5 * 0.1 + 0.5 * 0.6;
  chk(pB, 0.35);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`$\mathrm{P}(A) = 0.5$, $\mathrm{P}(B \mid A) = 0.1$ and $\mathrm{P}(B \mid A') = 0.6$. Find $\mathrm{P}(A \mid B')$, correct to 3 significant figures.`,
    value: (0.5 * 0.9) / (1 - pB), wrong: [0.45, 0.9],
    explanation: t`$\mathrm{P}(A \cap B') = 0.5 \times 0.9 = 0.45$; $\mathrm{P}(B') = 0.5 \times 0.9 + 0.5 \times 0.4 = 0.65$. $\mathrm{P}(A \mid B') = \frac{0.45}{0.65} = \frac{9}{13} \approx ${sfStr(9 / 13, 3)}$. (0.45 is the joint probability $\mathrm{P}(A \cap B')$.)`,
    hints: ["Draw a tree with A first and B second.", "P(B′ | A) = 1 − 0.1."],
  });
  chk(0.45 / 0.65, 9 / 13);

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Match each statement about events $A$ and $B$ with what it tells you.`,
    pairs: [
      [t`$\mathrm{P}(A \cap B) = 0$`, "A and B are mutually exclusive"],
      [t`$\mathrm{P}(A \cap B) = \mathrm{P}(A)\,\mathrm{P}(B)$`, "A and B are independent"],
      [t`$\mathrm{P}(A \cup B) = 1$`, "A and B are exhaustive"],
      [t`$\mathrm{P}(A \mid B) = 1$`, "whenever B happens, A happens too"],
    ],
    explanation: t`Exclusive: no overlap. Independent: the product rule holds. Exhaustive: together they cover everything. $\mathrm{P}(A \mid B) = 1$ means $\mathrm{P}(A \cap B) = \mathrm{P}(B)$, so $B$ lies inside $A$.`,
  });

  b.manualShort({
    d: 3, marks: 2, skill: "EVALUATION", calculator: false,
    stem: "A tree diagram for taking two counters from a bag WITH replacement has the same probabilities on the second-stage branches whatever happened first. Explain what this tells you about the two picks, and how the tree changes if the counters are taken WITHOUT replacement.",
    points: ["With replacement the second pick is independent of the first (its probabilities do not depend on the first outcome).", "Without replacement the bag has one fewer counter (and one fewer of the colour taken), so the second-stage probabilities differ between branches: they are conditional probabilities."],
    modelAnswer: "With replacement the bag is the same for the second pick, so P(second | first) = P(second): the picks are independent. Without replacement the total falls by one and the colour already taken has one fewer counter, so the second-stage branches carry different conditional probabilities, e.g. 4/7 after a red and 5/7 after a white from 5 red and 3 white.",
    explanation: "Equal second-stage branches are the picture of independence.",
    hints: ["Compare the second-stage branches after each first outcome."],
  });

  // structured 1 (practice, 5 marks)
  // Chipo plays two netball matches. P(win first) = 0.6. If wins, P(win second) = 0.75; if not, 0.3.
  const w1 = 0.6, ww = 0.75, lw = 0.3;
  const pWin2 = w1 * ww + (1 - w1) * lw; chk(pWin2, 0.57);
  const pExactly1 = w1 * (1 - ww) + (1 - w1) * lw; chk(pExactly1, 0.27);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: "Chipo's netball team plays two matches. The probability that it wins the first match is 0.6. If it wins the first match, the probability that it wins the second is 0.75; if it does not win the first, the probability that it wins the second is 0.3.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the probability that the team wins the second match.", value: pWin2, wrong: [0.45],
        explanation: t`$0.6 \times 0.75 + 0.4 \times 0.3 = 0.45 + 0.12 = 0.57$. (0.45 is only the path "win, win".)` }),
      P.num({ label: "(b)", marks: 3, stem: "Given that the team wins exactly one of the two matches, find the probability that it won the first match. Give your answer correct to 3 significant figures.", value: (w1 * (1 - ww)) / pExactly1, wrong: [0.15],
        explanation: t`Exactly one win: $\mathrm{P}(WL) + \mathrm{P}(LW) = 0.6 \times 0.25 + 0.4 \times 0.3 = 0.15 + 0.12 = 0.27$. $\mathrm{P}(W_1 \mid \text{exactly one}) = \frac{0.15}{0.27} = \frac{5}{9} \approx ${sfStr(5 / 9, 3)}$.` }),
    ],
    explanation: "Multiply along paths; divide one path by the total of the paths in the condition.",
    hints: ["Draw a two-stage tree.", "Which two paths give exactly one win?"],
  });
  chk(0.15 / 0.27, 5 / 9);

  // structured 2 (practice, 13 marks): three picks without replacement + independence
  const bag3 = [...range("B", 4), ...range("Y", 6)];
  const s3 = draws(bag3, 3);
  const pAllY = s3.filter((s) => cnt(s, "Y") === 3).length / s3.length;
  same(F(6 * 5 * 4, 10 * 9 * 8).s, "1/6"); chk(pAllY, 1 / 6);
  const pExact1B = s3.filter((s) => cnt(s, "B") === 1).length / s3.length;
  same(F(3 * 4 * 6 * 5, 720).s, "1/2"); chk(pExact1B, 1 / 2);
  const pThirdB = s3.filter((s) => s[2][0] === "B").length / s3.length; chk(pThirdB, 0.4);
  const condThird = s3.filter((s) => s[2][0] === "B" && cnt(s, "B") === 1).length / s3.filter((s) => cnt(s, "B") === 1).length;
  chk(condThird, 1 / 3);
  // events: E = first is blue, Fv = third is blue -> P(E ∩ F) = 4/10*3/9 = 2/15 vs 0.16
  const pEF = s3.filter((s) => s[0][0] === "B" && s[2][0] === "B").length / s3.length;
  same(F(4 * 3, 90).s, "2/15"); chk(pEF, 2 / 15);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: "A bag contains 4 blue and 6 yellow discs. Sipho takes three discs from the bag, one at a time, at random and without replacement.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the probability that all three discs are yellow. Give your answer as a fraction or a decimal correct to 3 significant figures.", value: pAllY, wrong: [0.216],
        explanation: t`$\frac{6}{10} \times \frac{5}{9} \times \frac{4}{8} = \frac{120}{720} = \frac{1}{6}$. (0.216 is $0.6^3$, with replacement.)` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the probability that exactly one of the three discs is blue. Give your answer as a fraction or a decimal.", value: pExact1B, wrong: [1 / 6],
        explanation: t`One order: $\frac{4}{10} \times \frac{6}{9} \times \frac{5}{8} = \frac{120}{720} = \frac{1}{6}$. The blue disc can be first, second or third, and each order has the same probability, so $3 \times \frac{1}{6} = \frac{1}{2}$.` }),
      P.num({ label: "(c)", marks: 3, stem: "Given that exactly one of the three discs is blue, find the probability that the third disc is the blue one. Give your answer as a fraction or a decimal correct to 3 significant figures.", value: condThird, wrong: [1 / 6],
        explanation: t`$\mathrm{P}(YYB) = \frac{6}{10} \times \frac{5}{9} \times \frac{4}{8} = \frac{1}{6}$. $\mathrm{P}(YYB \mid \text{exactly one blue}) = \frac{1/6}{1/2} = \frac{1}{3}$.` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the probability that the first and third discs are both blue. Give your answer as a fraction or a decimal correct to 3 significant figures.", value: pEF, wrong: [0.16],
        explanation: t`Paths $B\,B\,B$ and $B\,Y\,B$: $\frac{4}{10} \cdot \frac{3}{9} \cdot \frac{2}{8} + \frac{4}{10} \cdot \frac{6}{9} \cdot \frac{3}{8} = \frac{24 + 72}{720} = \frac{96}{720} = \frac{2}{15}$.` }),
      P.manual({ label: "(e)", marks: 3, stem: "Determine whether the events 'the first disc is blue' and 'the third disc is blue' are independent. Show your working.",
        points: [t`M1 finds $\mathrm{P}(\text{third blue}) = 0.4$ (by symmetry or by adding the four paths).`, t`M1 compares $\mathrm{P}(\text{both}) = \frac{2}{15} \approx 0.133$ with $0.4 \times 0.4 = 0.16$.`, "A1 concludes they are not independent, because the values differ."],
        modelAnswer: "P(first blue) = 0.4. P(third blue) = 0.4 (each disc is equally likely to be in any position, or add BBB, BYB, YBB, YYB = 288/720). P(first blue and third blue) = 2/15 ≈ 0.133, but 0.4 × 0.4 = 0.16 ≠ 2/15, so the events are not independent." }),
    ],
    explanation: "Without replacement, later picks depend on earlier ones; a symmetry argument shows each single pick is still blue with probability 0.4.",
    hints: ["Multiply three fractions along each path; the denominators are 10, 9, 8.", "For (b), count the positions the single blue disc can take."],
  });

  // structured 3 (practice, 4 marks): independence two-way with unknown
  // 150 learners: P(maths club)=..., table with x
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`Of 150 learners at a school in Chinhoyi, 60 are in Form 5 and the rest are in Form 6. Altogether 50 learners belong to the debate club, and $x$ of the debate club members are in Form 5.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Given that 'is in Form 5' and 'belongs to the debate club' are independent events, find x.", value: 20, wrong: [25],
        explanation: t`Independence: $\frac{x}{150} = \frac{60}{150} \times \frac{50}{150}$, so $x = \frac{60 \times 50}{150} = 20$.` }),
      P.num({ label: "(b)", marks: 2, stem: "With this value of x, find the probability that a learner chosen at random from Form 6 belongs to the debate club. Give your answer as a fraction or a decimal correct to 3 significant figures.", value: 30 / 90, wrong: [0.2],
        explanation: t`Form 6 has $90$ learners, of whom $50 - 20 = 30$ are in the club: $\frac{30}{90} = \frac{1}{3}$, the same as $\mathrm{P}(\text{club}) = \frac{50}{150}$, as independence requires.` }),
    ],
    explanation: "Independence makes the conditional proportion in each row equal to the overall proportion.",
    hints: ["Use P(A ∩ B) = P(A) P(B) with counts out of 150."],
  });
  chk((60 * 50) / 150, 20); chk(30 / 90, 50 / 150);

  b.card("FORMULA", "Conditional probability", t`$\mathrm{P}(A \mid B) = \dfrac{\mathrm{P}(A \cap B)}{\mathrm{P}(B)}$`, "Not in MF19.");
  b.card("FORMULA", "Multiplication rule", t`$\mathrm{P}(A \cap B) = \mathrm{P}(A)\,\mathrm{P}(B \mid A)$`);
  b.card("DEFINITION", "Independent events", t`$\mathrm{P}(A \cap B) = \mathrm{P}(A)\,\mathrm{P}(B)$, equivalently $\mathrm{P}(A \mid B) = \mathrm{P}(A)$.`);
  b.card("CONCEPT", "Tree diagrams", "Multiply along a path; add the probabilities of different paths. Branches from one point add up to 1.");
  b.card("CONCEPT", "Without replacement", "After each pick the total falls by one and the colour taken falls by one: later branches are conditional probabilities.");
  b.card("CONCEPT", "Reversing a tree", t`$\mathrm{P}(\text{first} \mid \text{second}) = \dfrac{\text{the one path}}{\text{all paths giving the second outcome}}$`);
  b.card("FACT", "Exclusive vs independent", "Exclusive events with non-zero probabilities are never independent.");
  b.card("CONCEPT", "Two-way tables", "A condition picks out one row or column; divide by that row or column total.");
  b.card("CONCEPT", "Testing independence", t`Calculate $\mathrm{P}(A)\,\mathrm{P}(B)$ and $\mathrm{P}(A \cap B)$, compare, and state the conclusion.`);
});
