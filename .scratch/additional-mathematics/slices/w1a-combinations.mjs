// W1a: amath.counting.combinations (Cambridge only) — nCr, selections with conditions.
// Note: inside t`...` never write a dollar sign followed by "{" (template interpolation); use $^{n}C_{r}$ at the start of maths.
import { concept, P, t, chk, nCr, nPr, fact } from "../lib.mjs";

/** Brute-force count of r-subsets of `items` satisfying pred. */
function countSel(items, r, pred = () => true) {
  let n = 0;
  const rec = (start, cur) => {
    if (cur.length === r) { if (pred(cur)) n++; return; }
    for (let i = start; i < items.length; i++) rec(i + 1, [...cur, items[i]]);
  };
  rec(0, []);
  return n;
}
const group = (prefix, k) => Array.from({ length: k }, (_, i) => `${prefix}${i + 1}`);
const cnt = (sel, prefix) => sel.filter((x) => x.startsWith(prefix)).length;

concept("amath.counting.combinations", { file: "counting/combinations", keyPrefix: "counting.combinations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which expression gives the number of ways of choosing $r$ objects from $n$ distinct objects when order does not matter?`,
    options: [
      [t`$\dfrac{n!}{r!\,(n - r)!}$`, t`Correct: this is $^{n}C_{r}$.`],
      [t`$\dfrac{n!}{(n - r)!}$`, t`This is $^{n}P_{r}$, which counts ordered arrangements.`],
      [t`$\dfrac{n!}{r!}$`, "The (n − r)! for the objects left out is missing."],
      [t`$r!\,(n - r)!$`, "The n! in the numerator is missing; this is the denominator only."],
    ],
    answer: "A",
    explanation: t`Each selection of $r$ objects appears $r!$ times among the $^{n}P_{r}$ arrangements, so $^{n}C_{r} = \dfrac{^{n}P_{r}}{r!} = \dfrac{n!}{r!\,(n - r)!}$.`,
  });

  chk(nCr(8, 3), 56);
  b.num({
    d: 1, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate $^{8}C_{3}$ without a calculator.`,
    value: nCr(8, 3), wrong: [336, 24],
    explanation: t`$^{8}C_{3} = \dfrac{8 \times 7 \times 6}{3 \times 2 \times 1} = \dfrac{336}{6} = 56$.`,
  });

  chk(nCr(12, 3), countSel(group("x", 12), 3));
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "In how many ways can 3 learners be chosen from a class of 12 to represent the class at a meeting?",
    value: nCr(12, 3), wrong: [nPr(12, 3), 36],
    explanation: t`Order does not matter: $^{12}C_{3} = \dfrac{12 \times 11 \times 10}{6} = 220$.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$^{n}C_{r} = {}^{n}C_{n-r}$ for $0 \leq r \leq n$.`,
    answer: true,
    explanation: "Choosing the r objects to take is the same as choosing the n − r objects to leave behind.",
  });

  chk(nCr(10, 3), nCr(10, 7));
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`$^{10}C_{3}$ is greater than $^{10}C_{7}$.`,
    answer: false,
    explanation: t`They are equal: $^{10}C_{3} = {}^{10}C_{7} = 120$, because choosing 3 to take is the same as choosing 7 to leave.`,
  });

  chk(nCr(15, 11), 1365);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "A coach chooses a cricket team of 11 from a squad of 15. Which calculation gives the number of possible teams?",
    options: [
      [t`$^{15}C_{4}$`, t`Correct: $^{15}C_{11} = {}^{15}C_{4}$; choosing the 4 to leave out is quicker. Both equal 1365.`],
      [t`$^{15}P_{11}$`, "This counts ordered line-ups, but a team is a selection."],
      [t`$15 \times 11$`, "This does not count selections of 11 people."],
      [t`$^{11}C_{4}$`, "The players are chosen from 15, not from 11."],
    ],
    answer: "A",
    explanation: t`A team is a selection, so use combinations: $^{15}C_{11} = {}^{15}C_{4} = \dfrac{15 \times 14 \times 13 \times 12}{24} = 1365$.`,
  });

  const T5 = group("T", 5), L7 = group("L", 7);
  const ex2 = countSel([...T5, ...L7], 4, (s) => cnt(s, "T") === 2);
  chk(ex2, nCr(5, 2) * nCr(7, 2));
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A committee of 4 is chosen from 5 teachers and 7 learners. How many different committees contain exactly 2 teachers?",
    value: ex2, wrong: [nCr(5, 2) + nCr(7, 2), nCr(12, 4)],
    explanation: t`2 teachers from 5 and 2 learners from 7: $^{5}C_{2} \times {}^{7}C_{2} = 10 \times 21 = 210$.`,
    hints: ["Choose the teachers and the learners separately.", "Multiply, because both choices are made."],
  });

  const atl1 = countSel([...T5, ...L7], 4, (s) => cnt(s, "T") >= 1);
  chk(atl1, nCr(12, 4) - nCr(7, 4));
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A committee of 4 is chosen from 5 teachers and 7 learners. How many committees contain at least one teacher?",
    value: atl1, wrong: [5 * nCr(11, 3), nCr(12, 4)],
    explanation: t`Total $^{12}C_{4} = 495$. With no teachers: $^{7}C_{4} = 35$. At least one teacher: $495 - 35 = 460$.`,
    hints: ["At least one = total − none."],
  });

  const T6 = group("T", 6);
  const atm1 = countSel([...T6, ...L7], 4, (s) => cnt(s, "T") <= 1);
  chk(atm1, nCr(7, 4) + 6 * nCr(7, 3));
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "A group of 4 is chosen from 6 teachers and 7 learners. How many groups contain at most one teacher?",
    value: atm1, wrong: [6 * nCr(7, 3), nCr(7, 4)],
    explanation: t`No teachers: $^{7}C_{4} = 35$. One teacher: $^{6}C_{1} \times {}^{7}C_{3} = 6 \times 35 = 210$. Total $35 + 210 = 245$.`,
    hints: ["At most one means 0 teachers or 1 teacher.", "Work out each case, then add."],
  });

  const people = ["Chipo", "Sipho", ...group("p", 11)];
  const inc = countSel(people, 4, (s) => s.includes("Chipo") && !s.includes("Sipho"));
  chk(inc, nCr(11, 3));
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A group of 4 is chosen from 13 people, including Chipo and Sipho. How many groups include Chipo but not Sipho?",
    value: inc, wrong: [nCr(12, 3), nCr(11, 4)],
    explanation: t`Put Chipo in and leave Sipho out. The other 3 members come from the remaining 11 people: $^{11}C_{3} = 165$.`,
    hints: ["Remove Chipo and Sipho from the pool first."],
  });

  chk(nCr(13, 2), 78);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $^{n}C_{2} = 78$.`,
    value: 13, prefix: "n =", wrong: [12, 39],
    explanation: t`$\dfrac{n(n - 1)}{2} = 78$, so $n^{2} - n - 156 = 0$ and $(n - 13)(n + 12) = 0$. Since $n$ is a positive integer, $n = 13$.`,
    hints: [t`$^{n}C_{2} = \frac{n(n - 1)}{2}$.`],
  });

  chk(nCr(14, 3), 4 * nCr(14, 2));
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the value of $n$ for which $^{n}C_{3} = 4 \times {}^{n}C_{2}$.`,
    value: 14, prefix: "n =", wrong: [12, 10],
    explanation: t`$\dfrac{n(n - 1)(n - 2)}{6} = 4 \times \dfrac{n(n - 1)}{2}$. Divide both sides by $n(n - 1)$ (non-zero): $\dfrac{n - 2}{6} = 2$, so $n = 14$.`,
    hints: ["Write both sides as products and cancel n(n − 1)."],
  });

  for (const [r, v] of [[0, 1], [1, 6], [2, 15], [3, 20]]) chk(nCr(6, r), v);
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each expression to its value.",
    pairs: [
      [t`$^{6}C_{0}$`, t`$1$`],
      [t`$^{6}C_{1}$`, t`$6$`],
      [t`$^{6}C_{2}$`, t`$15$`],
      [t`$^{6}C_{3}$`, t`$20$`],
    ],
    explanation: t`$^{6}C_{0} = 1$, $^{6}C_{1} = 6$, $^{6}C_{2} = \frac{6 \times 5}{2} = 15$, $^{6}C_{3} = \frac{6 \times 5 \times 4}{6} = 20$.`,
  });

  chk(nCr(9, 2), 36);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "At a meeting, each of 9 people shakes hands once with every other person. How many handshakes take place?",
    options: [
      [t`$36$`, t`Correct: each handshake is a pair of people, $^{9}C_{2} = 36$.`],
      [t`$72$`, t`$9 \times 8$ counts every handshake twice (A with B and B with A).`],
      [t`$81$`, t`$9^{2}$ includes people shaking hands with themselves and counts pairs twice.`],
      [t`$18$`, "Each person shakes 8 hands, not 2."],
    ],
    answer: "A",
    explanation: t`A handshake is an unordered pair: $^{9}C_{2} = \dfrac{9 \times 8}{2} = 36$.`,
    hints: ["Does the order of the two people in a handshake matter?"],
  });

  chk(nCr(5, 2) * nCr(4, 2), 60);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "Farai chooses 2 of 5 different maths revision books and 2 of 4 different science revision books. In how many ways can he choose his four books?",
    options: [
      [t`$60$`, t`Correct: $^{5}C_{2} \times {}^{4}C_{2} = 10 \times 6 = 60$.`],
      [t`$16$`, "The choices have been added; both choices are made, so multiply."],
      [t`$126$`, t`$^{9}C_{4}$ ignores the condition of 2 from each subject.`],
      [t`$240$`, t`This uses $^{5}P_{2} \times {}^{4}P_{2}$, but the order of choosing books does not matter.`],
    ],
    answer: "A",
    explanation: "Choose from each group separately and multiply: 10 ways for the maths books, 6 for the science books.",
    hints: ["Choose the maths books, then the science books."],
  });

  chk(nCr(8, 3) * nCr(5, 2), 560);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A farmer near Chinhoyi will plant 3 of 8 maize varieties and 2 of 5 bean varieties in a trial plot. How many different choices of varieties are possible?",
    value: nCr(8, 3) * nCr(5, 2), wrong: [nCr(8, 3) + nCr(5, 2), nCr(13, 5)],
    explanation: t`$^{8}C_{3} \times {}^{5}C_{2} = 56 \times 10 = 560$.`,
    hints: ["Both choices are made, so multiply."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "What is the most reliable way to count selections that contain at least one item from a group?",
    options: [
      ["Count all selections, then subtract those with none from the group.", "Correct: every selection either has none or at least one, so the complement is quick and avoids double counting."],
      ["Choose one item from the group first, then choose the rest from everything left.", "This counts some selections more than once (once for each group member they contain)."],
      ["Multiply the size of the group by the total number of selections.", "This has no counting meaning here."],
      ["Count the selections with exactly one item from the group.", "That misses the selections with two or more."],
    ],
    answer: "A",
    explanation: "At least one = total − none. The direct method of choosing one first double counts.",
    hints: ["What is the opposite of at least one?"],
  });

  chk(nCr(7, 2), nCr(7, 5));
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which of these is equal to $^{7}C_{2}$?`,
    options: [
      [t`$^{7}C_{5}$`, "Correct: choosing 2 to take is the same as choosing 5 to leave."],
      [t`$^{7}P_{2}$`, t`$^{7}P_{2} = 42$, twice $^{7}C_{2} = 21$.`],
      [t`$^{5}C_{2}$`, t`$^{5}C_{2} = 10$, not 21.`],
      [t`$^{7}C_{3}$`, t`$^{7}C_{3} = 35$; the matching value is $^{7}C_{7-2}$.`],
    ],
    answer: "A",
    explanation: t`$^{n}C_{r} = {}^{n}C_{n-r}$, so $^{7}C_{2} = {}^{7}C_{5} = 21$.`,
  });

  // Structured (7 marks): squad of 7 from 5 seniors and 6 juniors
  const S5 = group("S", 5), J6 = group("J", 6);
  const all7 = countSel([...S5, ...J6], 7);
  const ex4 = countSel([...S5, ...J6], 7, (s) => cnt(s, "S") === 4);
  const atl4 = countSel([...S5, ...J6], 7, (s) => cnt(s, "S") >= 4);
  const withS1 = countSel([...S5, ...J6], 7, (s) => s.includes("S1"));
  chk(all7, 330); chk(ex4, 100); chk(atl4, 115); chk(withS1, 210);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: "A netball squad of 7 is chosen from 5 senior players and 6 junior players.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many different squads are possible?", value: all7, wrong: [nPr(11, 7)], explanation: t`$^{11}C_{7} = {}^{11}C_{4} = 330$.` }),
      P.num({ label: "(b)", marks: 2, stem: "How many squads contain exactly 4 seniors?", value: ex4, wrong: [25], explanation: t`$^{5}C_{4} \times {}^{6}C_{3} = 5 \times 20 = 100$.` }),
      P.num({ label: "(c)", marks: 2, stem: "How many squads contain at least 4 seniors?", value: atl4, wrong: [100], explanation: t`4 seniors: 100. 5 seniors: $^{5}C_{5} \times {}^{6}C_{2} = 15$. Total $115$.` }),
      P.num({ label: "(d)", marks: 2, stem: "Rudo is one of the seniors. How many squads include Rudo?", value: withS1, wrong: [nCr(10, 7)], explanation: t`Rudo is in; the other 6 come from the remaining 10: $^{10}C_{6} = 210$.` }),
    ],
    explanation: t`All squads $^{11}C_{7} = 330$; exactly 4 seniors $100$; at least 4 seniors $100 + 15 = 115$; with Rudo $^{10}C_{6} = 210$.`,
    hints: ["Choose seniors and juniors separately and multiply.", "At least 4 seniors: 4 or 5 seniors."],
  });

  // Structured (9 marks): committee of 5 from 7 men and 6 women
  const M7 = group("M", 7), W6 = group("W", 6);
  const pool = [...M7, ...W6];
  const tot = countSel(pool, 5);
  const atl3w = countSel(pool, 5, (s) => cnt(s, "W") >= 3);
  const notBoth = countSel(pool, 5, (s) => !(s.includes("M1") && s.includes("W1")));
  chk(tot, nCr(13, 5)); chk(atl3w, nCr(6, 3) * nCr(7, 2) + nCr(6, 4) * 7 + nCr(6, 5)); chk(notBoth, nCr(13, 5) - nCr(11, 3));
  chk(tot, 1287); chk(atl3w, 531); chk(notBoth, 1122);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: "A committee of 5 is to be chosen from 7 men and 6 women. Tendai is one of the men and Thandeka is one of the women.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many different committees can be chosen?", value: tot, wrong: [nPr(13, 5)], explanation: t`$^{13}C_{5} = 1287$.` }),
      P.num({ label: "(b)", marks: 3, stem: "How many committees contain at least 3 women?", value: atl3w, wrong: [nCr(6, 3) * nCr(7, 2)], explanation: t`3W 2M: $20 \times 21 = 420$. 4W 1M: $15 \times 7 = 105$. 5W: $6$. Total $531$.` }),
      P.num({ label: "(c)", marks: 3, stem: "Tendai and Thandeka refuse to serve on the committee together. How many committees are possible?", value: notBoth, wrong: [nCr(11, 5), nCr(11, 3)], explanation: t`Committees with both: the other 3 from 11, $^{11}C_{3} = 165$. So $1287 - 165 = 1122$.` }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why the answer to (c) is found by subtraction.",
        points: ["Every committee either contains both Tendai and Thandeka or does not (the two kinds do not overlap and cover everything)", "Committees with both are easy to count (fix both, choose 3 from the other 11), so subtract them from the total"],
        modelAnswer: "Each committee either has both of them or not both. Counting those with both is simple (choose the other 3 from 11 people: 165), so the committees allowed are 1287 − 165.",
      }),
    ],
    explanation: t`Total $^{13}C_{5} = 1287$; at least 3 women: $420 + 105 + 6 = 531$; not together: $1287 - {}^{11}C_{3} = 1122$.`,
    hints: ["List the cases 3, 4 and 5 women.", "Count the committees that contain both, then subtract."],
  });

  b.card("DEFINITION", "Combination", "A selection of objects in which order does not matter (a team, committee or set of questions).");
  b.card("FORMULA", "Number of combinations of r from n", t`$^{n}C_{r} = \dbinom{n}{r} = \dfrac{n!}{r!\,(n - r)!}$`);
  b.card("FACT", "Symmetry of combinations", t`$^{n}C_{r} = {}^{n}C_{n-r}$, e.g. $^{11}C_{7} = {}^{11}C_{4}$.`);
  b.card("FACT", "Special values", t`$^{n}C_{0} = {}^{n}C_{n} = 1$ and $^{n}C_{1} = n$.`);
  b.card("CONCEPT", "Link between nPr and nCr", t`$^{n}C_{r} = \dfrac{^{n}P_{r}}{r!}$: each selection can be arranged in $r!$ orders.`);
  b.card("CONCEPT", "Selecting from two groups", "Multiply the choices within a case (2 women AND 3 men); add separate cases (0 women OR 1 woman).");
  b.card("CONCEPT", "At least one", "Total selections minus the selections with none.");
  b.card("CONCEPT", "A particular person included or excluded", "Included: choose the other r − 1 from n − 1. Excluded: choose all r from n − 1.");
  b.card("FACT", "Handshakes or pairs among n people", t`$^{n}C_{2} = \dfrac{n(n - 1)}{2}$`);
});
