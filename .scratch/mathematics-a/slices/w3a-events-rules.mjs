// W3a: amaths.probability.events-rules (every probability counted by enumeration or checked with F)
import { concept, P, t, chk, same, F, nCr, fact, ZS, sfStr, table } from "../lib.mjs";

const dice = [];
for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) dice.push([a, b]);
const pr = (xs, f) => xs.filter(f).length / xs.length;
function perms(a) {
  if (a.length <= 1) return [a];
  const out = [];
  a.forEach((x, i) => { for (const p of perms([...a.slice(0, i), ...a.slice(i + 1)])) out.push([x, ...p]); });
  return out;
}
function subsets(items, r) {
  if (r === 0) return [[]];
  if (items.length < r) return [];
  const [h, ...rest] = items;
  return [...subsets(rest, r - 1).map((s) => [h, ...s]), ...subsets(rest, r)];
}
const range = (p, n) => Array.from({ length: n }, (_, i) => `${p}${i + 1}`);
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });

concept("amaths.probability.events-rules", { file: "probability/events-rules", keyPrefix: "probability.events-rules" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Events $A$ and $B$ are mutually exclusive. Which statement must be true?`,
    options: [
      [t`$\mathrm{P}(A \cap B) = 0$`, "Correct: mutually exclusive events cannot happen together."],
      [t`$\mathrm{P}(A) + \mathrm{P}(B) = 1$`, "That describes exclusive events that are also exhaustive, which is not given."],
      [t`$\mathrm{P}(A \cap B) = \mathrm{P}(A)\,\mathrm{P}(B)$`, "That is the condition for independence, a different idea."],
      [t`$\mathrm{P}(A) = \mathrm{P}(B)$`, "Exclusive events can have any probabilities."],
    ],
    answer: "A",
    explanation: t`Mutually exclusive means no outcome is in both events, so $\mathrm{P}(A \cap B) = 0$ and $\mathrm{P}(A \cup B) = \mathrm{P}(A) + \mathrm{P}(B)$.`,
  });

  const p9 = pr(dice, ([a, c]) => a + c === 9);
  same(F(4, 36).s, "1/9"); chk(p9, 1 / 9);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "Two fair six-sided dice are thrown. Find the probability that the total score is 9. Give your answer as a fraction or a decimal correct to 3 significant figures.",
    value: p9, wrong: [1 / 11, 1 / 12],
    explanation: t`A total of 9 comes from $(3, 6), (4, 5), (5, 4), (6, 3)$: 4 of the 36 equally likely outcomes, so $\mathrm{P} = \frac{4}{36} = \frac{1}{9}$. ($\frac{1}{11}$ wrongly treats the 11 totals 2 to 12 as equally likely.)`,
  });

  const pDiff = pr(dice, ([a, c]) => Math.abs(a - c) >= 3);
  same(F(dice.filter(([a, c]) => Math.abs(a - c) >= 3).length, 36).s, "1/3");
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Two fair six-sided dice are thrown and the (positive) difference between the scores is recorded. Find the probability that the difference is at least 3. Give your answer as a fraction or a decimal correct to 3 significant figures.",
    value: pDiff, wrong: [1 / 6, 1 / 2],
    explanation: t`Difference 3: 6 outcomes; 4: 4 outcomes; 5: 2 outcomes. That is $12$ of $36$, so $\mathrm{P} = \frac{12}{36} = \frac{1}{3}$. (A difference table, 6 by 6, makes the count easy.)`,
  });

  // general addition rule
  const pa = 0.45, pb = 0.3, pab = 0.12;
  chk(pa + pb - pab, 0.63);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, applies: ZS, daily: true,
    stem: t`For events $A$ and $B$, $\mathrm{P}(A) = 0.45$, $\mathrm{P}(B) = 0.3$ and $\mathrm{P}(A \cap B) = 0.12$. Find $\mathrm{P}(A \cup B)$.`,
    value: pa + pb - pab, wrong: [0.75, 0.87],
    explanation: t`$\mathrm{P}(A \cup B) = \mathrm{P}(A) + \mathrm{P}(B) - \mathrm{P}(A \cap B) = 0.45 + 0.3 - 0.12 = 0.63$. (0.75 forgets to subtract the overlap, which has been counted twice.)`,
  });

  // Venn 40 learners: football 22, athletics 15, both 7
  const neither = 40 - (22 + 15 - 7);
  chk(neither, 10);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "In a group of 40 learners at a school in Mutare, 22 play football, 15 do athletics and 7 do both. Fill in the numbers for the regions of a Venn diagram.",
    template: "football only {{blank:a}}; athletics only {{blank:b}}; both {{blank:c}}; neither {{blank:d}}",
    blanks: [N("a", 15, "22"), N("b", 8, "15"), N("c", 7, "0"), N("d", neither, "3")],
    explanation: t`Start with the intersection, 7. Football only $22 - 7 = 15$; athletics only $15 - 7 = 8$; neither $40 - (15 + 7 + 8) = 10$. (3 for "neither" comes from $40 - 22 - 15$, which subtracts the 7 twice.)`,
  });

  chk(F(10, 40).s === "1/4" ? 1 : 0, 1);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Using the group of 40 learners above (22 play football, 15 do athletics, 7 do both), one learner is chosen at random. Find the probability that the learner does exactly one of the two sports. Give your answer as a fraction or a decimal.",
    value: (15 + 8) / 40, wrong: [30 / 40, 37 / 40],
    explanation: t`Exactly one sport: football only (15) plus athletics only (8) $= 23$. $\mathrm{P} = \frac{23}{40} = 0.575$. ($\frac{30}{40}$ includes the 7 who do both.)`,
    hints: ["Draw the Venn diagram first: start with the 7 in the overlap."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A fair six-sided die is thrown once. Which pair of events is mutually exclusive but NOT exhaustive?",
    options: [
      ["'a score of 1' and 'a score of 6'", "Correct: they cannot both happen, but a score of 2 to 5 is neither."],
      ["'an odd score' and 'an even score'", "These are exclusive and also exhaustive: every score is odd or even."],
      ["'a score below 4' and 'a score above 2'", "A score of 3 is in both, so they are not exclusive."],
      ["'a prime score' and 'an even score'", "A score of 2 is prime and even, so they are not exclusive."],
    ],
    answer: "A",
    explanation: "Exclusive: no common outcome. Exhaustive: together they include every outcome.",
  });

  // spinner product
  const sp = []; for (let a = 1; a <= 5; a++) for (let c = 1; c <= 4; c++) sp.push(a * c);
  const pOdd = sp.filter((x) => x % 2 === 1).length / 20;
  same(F(sp.filter((x) => x % 2 === 1).length, 20).s, "3/10");
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "A fair spinner numbered 1 to 5 and a fair spinner numbered 1 to 4 are spun, and the two scores are multiplied. Find the probability that the product is odd. Give your answer as a fraction or a decimal.",
    value: pOdd, wrong: [0.5, 0.25],
    explanation: t`The product is odd only when both scores are odd: 3 odd scores on the first spinner and 2 on the second give $3 \times 2 = 6$ of the $5 \times 4 = 20$ outcomes. $\mathrm{P} = \frac{6}{20} = 0.3$.`,
  });

  // counting: bag of 6 green 4 yellow, 4 drawn, exactly 2 green
  const bag = [...range("G", 6), ...range("Y", 4)];
  const sel = subsets(bag, 4);
  const p2g = sel.filter((s) => s.filter((x) => x[0] === "G").length === 2).length / sel.length;
  same(F(nCr(6, 2) * nCr(4, 2), nCr(10, 4)).s, "3/7"); chk(p2g, 3 / 7);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A bag contains 6 green and 4 yellow counters. Four counters are taken at random, without replacement. Find the probability that exactly two of them are green. Give your answer as a fraction or a decimal correct to 3 significant figures.",
    value: p2g, wrong: [0.3456, 0.4],
    explanation: t`$\mathrm{P} = \dfrac{{}^6C_2 \times {}^4C_2}{{}^{10}C_4} = \dfrac{15 \times 6}{210} = \dfrac{90}{210} = \dfrac{3}{7} \approx 0.429$. (0.3456 is the with-replacement binomial answer $6 \times 0.6^2 \times 0.4^2$.)`,
    hints: ["Count the selections with exactly two green, then divide by all selections of 4 from 10."],
  });

  const atLeast1Y = 1 - nCr(6, 4) / nCr(10, 4);
  chk(atLeast1Y, 1 - sel.filter((s) => s.every((x) => x[0] === "G")).length / sel.length);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "From the same bag (6 green and 4 yellow counters), four counters are taken at random without replacement. Find the probability that at least one of them is yellow. Give your answer as a fraction or a decimal correct to 3 significant figures.",
    value: atLeast1Y, wrong: [0.4, 1 - 0.6 ** 4],
    explanation: t`$\mathrm{P}(\text{no yellow}) = \frac{{}^6C_4}{{}^{10}C_4} = \frac{15}{210} = \frac{1}{14}$, so $\mathrm{P}(\text{at least one yellow}) = 1 - \frac{1}{14} = \frac{13}{14} \approx ${sfStr(atLeast1Y, 3)}$. (${sfStr(1 - 0.6 ** 4, 3)} assumes replacement.)`,
    hints: ["Use the complement: at least one yellow = 1 − P(no yellow)."],
  });

  // arrangement probability: letters of MUTARE random, vowels together
  const lets = [..."MUTARE"];
  const ar = perms(lets);
  const vowelsTogether = ar.filter((p) => { const idx = p.map((c, i) => ("UAE".includes(c) ? i : -1)).filter((i) => i >= 0); return idx[2] - idx[0] === 2; }).length / ar.length;
  chk(vowelsTogether, (fact(4) * fact(3)) / fact(6));
  same(F(fact(4) * fact(3), fact(6)).s, "1/5");
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: "The letters of the word MUTARE are arranged in a random order. Find the probability that the three vowels are all next to each other. Give your answer as a fraction or a decimal.",
    value: vowelsTogether, wrong: [1 / 30, 1 / 20],
    explanation: t`Treat U, A, E as one block: the block and M, T, R give $4!$ arrangements, and the vowels can be ordered inside the block in $3!$ ways. $\mathrm{P} = \frac{4! \times 3!}{6!} = \frac{144}{720} = \frac{1}{5}$. ($\frac{1}{30}$ forgets the $3!$ inside the block.)`,
    hints: ["Glue the vowels together and count arrangements of 4 items.", "Remember the vowels can be arranged inside their block."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "When two fair dice are thrown, each of the totals 2, 3, 4, …, 12 is equally likely.",
    answer: false,
    explanation: t`The 36 ordered pairs are equally likely, not the 11 totals: a total of 7 can happen in 6 ways but a total of 2 in only 1 way, so $\mathrm{P}(7) = \frac{6}{36}$ and $\mathrm{P}(2) = \frac{1}{36}$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, applies: ZS,
    stem: t`If $\mathrm{P}(A) = 0.6$ and $\mathrm{P}(B) = 0.7$, then $A$ and $B$ cannot be mutually exclusive.`,
    answer: true,
    explanation: t`If they were exclusive, $\mathrm{P}(A \cup B) = 0.6 + 0.7 = 1.3 > 1$, which is impossible. In fact $\mathrm{P}(A \cap B) \ge 0.6 + 0.7 - 1 = 0.3$.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each term with its meaning.",
    pairs: [
      ["sample space", "the set of all possible outcomes of an experiment"],
      ["event", "a set of outcomes, such as 'an even score'"],
      ["complement of A", "all the outcomes that are not in A"],
      ["exhaustive events", "events that together include every possible outcome"],
    ],
    explanation: t`The sample space $S$ lists all outcomes; an event is a subset of $S$; $A'$ is everything in $S$ outside $A$; exhaustive events cover $S$.`,
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false, applies: ZS,
    stem: t`For two events, $\mathrm{P}(A) = 0.5$, $\mathrm{P}(B) = 0.4$ and $\mathrm{P}(A \cup B) = 0.7$. Find $\mathrm{P}(A' \cap B')$.`,
    options: [
      ["0.3", t`Correct: neither $A$ nor $B$ is the complement of $A \cup B$: $1 - 0.7$.`],
      ["0.2", t`$0.2$ is $\mathrm{P}(A \cap B) = 0.5 + 0.4 - 0.7$, the overlap, not the outside region.`],
      ["0.1", t`This subtracts $\mathrm{P}(A) + \mathrm{P}(B)$ from 1 and adds nothing back: $1 - 0.9$.`],
      ["0.6", t`$0.6$ is $\mathrm{P}(A')$ plus $\mathrm{P}(B')$ halved; it is not a region of the diagram.`],
    ],
    answer: "A",
    explanation: t`$A' \cap B'$ is "neither", the region outside both circles: $1 - \mathrm{P}(A \cup B) = 1 - 0.7 = 0.3$.`,
    hints: ["Which region of the Venn diagram is 'not A and not B'?"],
  });
  chk(1 - 0.7, 0.3); chk(0.5 + 0.4 - 0.7, 0.2);

  // committee probability
  const ppl = [...range("M", 5), ...range("W", 4)];
  const com = subsets(ppl, 4);
  const pMoreW = com.filter((s) => s.filter((x) => x[0] === "W").length > 2).length / com.length;
  same(F(nCr(4, 3) * nCr(5, 1) + nCr(4, 4), nCr(9, 4)).s, "1/6"); chk(pMoreW, 1 / 6);
  b.mcq({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: "A committee of 4 is chosen at random from 5 men and 4 women. What is the probability that there are more women than men on the committee?",
    options: [
      [t`$\frac{1}{6}$`, t`Correct: $\frac{{}^4C_3\,{}^5C_1 + {}^4C_4}{{}^9C_4} = \frac{20 + 1}{126}$.`],
      [t`$\frac{10}{63}$`, "This counts 3 women and 1 man but forgets the committee of 4 women."],
      [t`$\frac{1}{126}$`, "This is the probability of 4 women only."],
      [t`$\frac{4}{9}$`, "This is the probability that one person chosen at random is a woman."],
    ],
    answer: "A",
    explanation: t`More women than men means 3 women and 1 man ($4 \times 5 = 20$ ways) or 4 women (1 way). Total committees ${"$"}{}^9C_4 = 126$. $\mathrm{P} = \frac{21}{126} = \frac{1}{6}$.`,
    hints: ["List the cases: 3 women and 1 man, or 4 women."],
  });
  same(F(20, 126).s, "10/63");

  b.manualShort({
    d: 2, marks: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Tatenda says: 'Tomorrow it will either rain in Harare or it will not, so the probability that it rains is 1/2.' Explain what is wrong with his reasoning.",
    points: ["States that the formula n(A)/n(S) needs equally likely outcomes.", "Notes that 'rain' and 'no rain' are not equally likely, so the probability must be estimated another way (for example from past records)."],
    modelAnswer: "Dividing the number of favourable outcomes by the number of outcomes only works when the outcomes are equally likely. Rain and no rain are two outcomes but they are not equally likely (it depends on the season), so the probability should be estimated from data such as the relative frequency of rainy days in past years.",
    explanation: "Equally likely outcomes are an assumption that must be justified, for example by symmetry (a fair die).",
  });

  // structured 1 (practice, 5 marks): dice table
  const sumGt8 = pr(dice, ([a, c]) => a + c > 8), dbl = pr(dice, ([a, c]) => a === c), both = pr(dice, ([a, c]) => a + c > 8 && a === c);
  same([F(10, 36).s, F(2, 36).s], ["5/18", "1/18"]);
  chk(sumGt8, 10 / 36); chk(dbl, 1 / 6); chk(both, 2 / 36);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false, applies: ZS,
    stem: t`Two fair six-sided dice, one red and one blue, are thrown. Event $A$ is "the total score is more than 8" and event $B$ is "the two scores are equal (a double)".`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: t`Find $\mathrm{P}(A)$ as a fraction or a decimal correct to 3 significant figures.`, value: sumGt8, wrong: [0.25],
        explanation: t`Totals 9, 10, 11, 12 occur in $4 + 3 + 2 + 1 = 10$ ways: $\mathrm{P}(A) = \frac{10}{36} = \frac{5}{18}$.` }),
      P.num({ label: "(b)", marks: 1, stem: t`Find $\mathrm{P}(A \cap B)$ as a fraction or a decimal correct to 3 significant figures.`, value: both, wrong: [0.0463],
        explanation: t`Doubles with total more than 8: $(5, 5)$ and $(6, 6)$, so $\mathrm{P}(A \cap B) = \frac{2}{36} = \frac{1}{18}$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Find $\mathrm{P}(A \cup B)$ as a fraction or a decimal correct to 3 significant figures.`, value: sumGt8 + dbl - both, wrong: [sumGt8 + dbl],
        explanation: t`$\mathrm{P}(A \cup B) = \frac{10}{36} + \frac{6}{36} - \frac{2}{36} = \frac{14}{36} = \frac{7}{18} \approx ${sfStr(14 / 36, 3)}$.` }),
      P.mcq({ label: "(d)", marks: 1, stem: t`Are $A$ and $B$ mutually exclusive?`,
        options: [[t`No, because $\mathrm{P}(A \cap B) \ne 0$`, "Correct: (5, 5) and (6, 6) are in both events."], [t`Yes, because $\mathrm{P}(A) \ne \mathrm{P}(B)$`, "Unequal probabilities say nothing about exclusivity."], [t`Yes, because $\mathrm{P}(A) + \mathrm{P}(B) < 1$`, "A sum below 1 does not make events exclusive."], [t`No, because $\mathrm{P}(A) + \mathrm{P}(B) < 1$`, "The reason is wrong: exclusivity is about the overlap."]],
        answer: "A", explanation: t`The events share outcomes, so they are not mutually exclusive.` }),
    ],
    explanation: "Count outcomes in the 36-cell table; use the general addition rule for the union.",
    hints: ["Draw a 6 by 6 table of totals.", "Subtract the overlap once when you add P(A) and P(B)."],
  });
  same(F(14, 36).s, "7/18");

  // structured 2 (practice, 12 marks): arrangements and selections
  const word = [..."KADOMA"];
  const arrW = [...new Set(perms(word).map((p) => p.join("")))];
  chk(arrW.length, 360);
  const aTog = arrW.filter((w) => w.includes("AA")).length;
  chk(aTog, 120);
  const startK = arrW.filter((w) => w[0] === "K").length;
  chk(startK, 60);
  const kmEnds = arrW.filter((w) => (w[0] === "K" && w[5] === "M") || (w[0] === "M" && w[5] === "K")).length;
  chk(kmEnds, 24);
  const aSep = arrW.filter((w) => !w.includes("AA")).length / arrW.length;
  chk(aSep, 2 / 3);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: "The six letters of the word KADOMA are written on six cards. The cards are shuffled and laid out in a row in a random order.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "How many different arrangements of the six letters are there?", value: 360, wrong: [720],
        explanation: t`A is repeated: $\frac{6!}{2!} = 360$. (720 ignores the repeated A.)` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the probability that the two A's are next to each other. Give your answer as a fraction or a decimal correct to 3 significant figures.", value: aTog / arrW.length, wrong: [240 / 360],
        explanation: t`Treat AA as one item: K, AA, D, O, M give $5! = 120$ arrangements. $\mathrm{P} = \frac{120}{360} = \frac{1}{3}$.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the probability that the arrangement begins with K and ends with M, or begins with M and ends with K. Give your answer as a fraction or a decimal correct to 3 significant figures.", value: kmEnds / arrW.length, wrong: [12 / 360],
        explanation: t`Fix the ends (2 ways: K…M or M…K). The middle four letters A, D, O, A give $\frac{4!}{2!} = 12$ arrangements. Favourable $2 \times 12 = 24$; $\mathrm{P} = \frac{24}{360} = \frac{1}{15} \approx 0.0667$.` }),
      P.group({ label: "(d)", stem: "Three of the six cards are now chosen at random (the order does not matter).", parts: [
        P.num({ label: "(i)", marks: 2, stem: "Find the probability that both A cards are chosen. Give your answer as a fraction or a decimal.", value: nCr(4, 1) / nCr(6, 3), wrong: [1 / 15],
          explanation: t`Treat the two A cards as different cards. Both A's and one of the other 4 cards: ${"$"}{}^4C_1 = 4$ selections out of ${"$"}{}^6C_3 = 20$. $\mathrm{P} = \frac{4}{20} = \frac{1}{5}$.` }),
        P.num({ label: "(ii)", marks: 2, stem: "Find the probability that at least one A card is chosen. Give your answer as a fraction or a decimal.", value: 1 - nCr(4, 3) / nCr(6, 3), wrong: [0.5],
          explanation: t`No A: ${"$"}{}^4C_3 = 4$ of 20 selections, so $\mathrm{P}(\text{at least one A}) = 1 - \frac{4}{20} = \frac{4}{5}$.` }),
      ] }),
    ],
    explanation: "Divide by the factorial of each repeat when counting arrangements; block letters that must be together; use the complement for 'at least one'.",
    hints: ["Repeated letters: divide by 2! for the two A's.", "For the selection, label the two A cards A₁ and A₂ so all 20 selections are equally likely."],
  });
  const cards6 = ["K", "A1", "D", "O", "M", "A2"];
  const s3 = subsets(cards6, 3);
  chk(s3.filter((s) => s.includes("A1") && s.includes("A2")).length / s3.length, 1 / 5);
  chk(s3.filter((s) => s.includes("A1") || s.includes("A2")).length / s3.length, 4 / 5);

  // structured 3 (practice, 13 marks): Venn three sets
  // 60 farmers in Mashonaland: maize M, tobacco T, soya S.
  const v = { all: 4, MT: 9, MS: 6, TS: 3, M: 18, T: 8, S: 5 };
  const nM = v.M + v.MT + v.MS + v.all, nT = v.T + v.MT + v.TS + v.all, nS = v.S + v.MS + v.TS + v.all;
  const none = 60 - Object.values(v).reduce((a, c) => a + c, 0);
  chk(nM, 37); chk(nT, 24); chk(nS, 18); chk(none, 7);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false, applies: ZS,
    stem: t`A survey of 60 farmers in Mashonaland records which of maize ($M$), tobacco ($T$) and soya ($S$) they grow. 37 grow maize, 24 grow tobacco and 18 grow soya. 13 grow maize and tobacco, 10 grow maize and soya, 7 grow tobacco and soya, and 4 grow all three crops.`,
    parts: [
      P.fib({ label: "(a)", marks: 5, stem: "Complete the regions of a Venn diagram for the three crops.", template: "M only {{blank:m}}; T only {{blank:t}}; S only {{blank:s}}; M and T only {{blank:mt}}; none of the three {{blank:n}}",
        blanks: [N("m", v.M, "24"), N("t", v.T, "11"), N("s", v.S, "1"), N("mt", v.MT, "13"), N("n", none, "3")],
        explanation: t`Centre 4. Two-crop-only regions: $13 - 4 = 9$ (M and T), $10 - 4 = 6$ (M and S), $7 - 4 = 3$ (T and S). One-crop regions: $M$ only $37 - 9 - 6 - 4 = 18$, $T$ only $24 - 9 - 3 - 4 = 8$, $S$ only $18 - 6 - 3 - 4 = 5$. Total inside $= 4 + 9 + 6 + 3 + 18 + 8 + 5 = 53$, so none $= 7$.` }),
      P.num({ label: "(b)", marks: 2, stem: "A farmer is chosen at random. Find the probability that the farmer grows exactly one of the three crops. Give your answer as a fraction or a decimal correct to 3 significant figures.", value: (v.M + v.T + v.S) / 60, wrong: [37 / 60],
        explanation: t`Exactly one crop: $18 + 8 + 5 = 31$, so $\mathrm{P} = \frac{31}{60} \approx ${sfStr(31 / 60, 3)}$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Find $\mathrm{P}(T \cup S)$ as a fraction or a decimal correct to 3 significant figures.`, value: (nT + nS - 7) / 60, wrong: [42 / 60],
        explanation: t`$\mathrm{P}(T \cup S) = \frac{24}{60} + \frac{18}{60} - \frac{7}{60} = \frac{35}{60} = \frac{7}{12} \approx ${sfStr(35 / 60, 3)}$.` }),
      P.num({ label: "(d)", marks: 2, stem: t`Find $\mathrm{P}(M' \cap T')$, the probability that a farmer chosen at random grows neither maize nor tobacco. Give your answer as a fraction or a decimal correct to 3 significant figures.`, value: (v.S + none) / 60, wrong: [7 / 60],
        explanation: t`Outside both $M$ and $T$: soya only (5) and none (7), so $\frac{12}{60} = \frac{1}{5}$.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the events 'grows tobacco' and 'grows soya' are not mutually exclusive, and name a pair of events from this survey that are.",
        points: ["7 farmers grow both tobacco and soya, so the events can happen together.", "A valid exclusive pair, e.g. 'grows none of the crops' and 'grows maize' (or 'maize only' and 'tobacco only')."],
        modelAnswer: "7 farmers grow both tobacco and soya, so P(T ∩ S) = 7/60 ≠ 0 and the events are not exclusive. 'Grows maize only' and 'grows tobacco only' are mutually exclusive: no farmer can be in both regions." }),
    ],
    explanation: "Fill a three-set Venn diagram from the centre outwards, then read probabilities from regions.",
    hints: ["Start with the 4 in the centre.", "Subtract the centre from each two-crop total before using the one-crop totals."],
  });
  chk((nT + nS - 7) / 60, 35 / 60);

  b.card("DEFINITION", "Sample space", t`The set $S$ of all possible outcomes of an experiment; an event is a subset of $S$.`);
  b.card("FORMULA", "Equally likely outcomes", t`$\mathrm{P}(A) = \dfrac{n(A)}{n(S)}$`, "Only when every outcome is equally likely.");
  b.card("FORMULA", "Complement", t`$\mathrm{P}(A') = 1 - \mathrm{P}(A)$`, "Use it for 'at least one'.");
  b.card("DEFINITION", "Mutually exclusive", t`$A$ and $B$ cannot both happen: $\mathrm{P}(A \cap B) = 0$, so $\mathrm{P}(A \cup B) = \mathrm{P}(A) + \mathrm{P}(B)$.`);
  b.card("DEFINITION", "Exhaustive events", "Events that between them include every outcome of the sample space; at least one must happen.");
  b.card("FORMULA", "General addition rule", t`$\mathrm{P}(A \cup B) = \mathrm{P}(A) + \mathrm{P}(B) - \mathrm{P}(A \cap B)$`, "ZIMSEC uses it explicitly; not in MF19.");
  b.card("CONCEPT", "Filling a Venn diagram", "Start with the intersection (the centre for three sets), then the 'only' regions, then the region outside all sets.");
  b.card("FACT", "Two dice", "36 equally likely ordered pairs; a total of 7 is the most likely (6 ways).");
  b.card("CONCEPT", "Probability by counting", t`$\mathrm{P} = \dfrac{\text{favourable selections}}{\text{all selections}}$, e.g. $\dfrac{{}^6C_2 \times {}^4C_2}{{}^{10}C_4}$.`);
});
