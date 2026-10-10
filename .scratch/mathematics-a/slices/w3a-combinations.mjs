// W3a: amaths.counting.combinations (counts checked by brute force)
import { concept, P, t, chk, fact, nCr, nPr } from "../lib.mjs";

function subsets(items, r) {
  if (r === 0) return [[]];
  if (items.length < r) return [];
  const [h, ...rest] = items;
  return [...subsets(rest, r - 1).map((s) => [h, ...s]), ...subsets(rest, r)];
}
const range = (p, n) => Array.from({ length: n }, (_, i) => `${p}${i + 1}`);
const count = (s, p) => s.filter((x) => x[0] === p).length;
const C = (n, r) => `${"$"}{}^{${n}}C_{${r}}$`;

concept("amaths.counting.combinations", { file: "counting/combinations", keyPrefix: "counting.combinations" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "In which situation should you count combinations rather than permutations?",
    options: [
      ["choosing 3 of a farmer's 9 fields to plant with tobacco", "Correct: only which fields are chosen matters, not the order."],
      ["awarding first, second and third prizes to 3 of 9 entries", "The prizes are different, so the order matters: a permutation."],
      ["forming 3-digit codes from 9 different digits", "Changing the order of the digits gives a different code: a permutation."],
      ["choosing a chairperson, secretary and treasurer from 9 people", "The posts are different, so order matters: a permutation."],
    ],
    answer: "A",
    explanation: "Ask whether swapping two chosen items gives a different outcome. For the fields it does not, so count combinations.",
  });

  chk(subsets(range("f", 9), 3).length, 84);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "A farmer in Karoi has 9 fields. In how many ways can he choose 3 of them to plant with tobacco this season?",
    value: 84, wrong: [504, 27],
    explanation: t`${C(9, 3).slice(0, -1)} = \frac{9 \times 8 \times 7}{3 \times 2 \times 1} = 84$. (504 is ${"$"}{}^9P_3$, which treats the order of choosing as important.)`,
  });

  chk(nCr(12, 7), 792);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "A netball coach in Masvingo picks a team of 7 from a squad of 12 players. How many different teams can she pick?",
    value: 792, wrong: [3991680, 84],
    explanation: t`${C(12, 7).slice(0, -1)} = ${"{}"}^{12}C_5 = \frac{12 \times 11 \times 10 \times 9 \times 8}{5!} = 792$.`,
  });

  const bg = subsets([...range("B", 8), ...range("G", 7)], 6);
  chk(bg.filter((s) => count(s, "B") === 4).length, 1470);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "A committee of 6 is chosen from 8 boys and 7 girls. In how many ways can it be chosen if it must contain exactly 4 boys?",
    value: 1470, wrong: [91, 5005],
    explanation: t`Choose the boys: ${C(8, 4)} = 70; choose the 2 girls: ${C(7, 2)} = 21. Multiply: $70 \times 21 = 1470$. (91 adds 70 and 21 instead of multiplying.)`,
    hints: ["Choose from each group separately, then multiply."],
  });

  const tg = subsets([...range("B", 6), ...range("G", 4)], 5);
  chk(tg.filter((s) => count(s, "G") >= 1).length, 246);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A team of 5 is chosen from 6 boys and 4 girls for a quiz in Bulawayo. In how many ways can the team be chosen if it must include at least one girl?",
    value: 246, wrong: [504, 252],
    explanation: t`Total ${C(10, 5)} = 252; teams with no girl (all boys) ${C(6, 5)} = 6. At least one girl: $252 - 6 = 246$. (504 is ${"$"}{}^4C_1 \times {}^9C_4$, which counts some teams more than once.)`,
    hints: ["Subtract the teams with no girls from the total."],
  });
  chk(nCr(4, 1) * nCr(9, 4), 504);

  const mb = subsets([...range("B", 6), ...range("G", 5)], 5);
  const atMost2 = mb.filter((s) => count(s, "B") <= 2).length;
  chk(atMost2, 181);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A committee of 5 is chosen from 6 boys and 5 girls. In how many ways can it be chosen if it contains at most 2 boys?",
    value: atMost2, wrong: [150, 180],
    explanation: t`Add the cases. 0 boys: ${C(5, 5)} = 1. 1 boy: $6 \times {}^5C_4 = 30$. 2 boys: ${C(6, 2).slice(0, -1)} \times {}^5C_3 = 15 \times 10 = 150$. Total $1 + 30 + 150 = 181$. (180 leaves out the all-girl committee.)`,
    hints: ["'At most 2 boys' means 0, 1 or 2 boys."],
  });

  const sq = range("P", 15);
  chk(subsets(sq, 6).filter((s) => s.includes("P1") && s.includes("P2") && !s.includes("P3")).length, 495);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A volleyball team of 6 is chosen from a squad of 15. The captain and vice-captain must both be chosen, and one player is injured and cannot be chosen. How many different teams are possible?",
    value: 495, wrong: [715, 1001],
    explanation: t`Put the captain and vice-captain in: 4 places remain. Remove the injured player: the pool is $15 - 2 - 1 = 12$. ${C(12, 4).slice(0, -1)} = 495$. (715 is ${"$"}{}^{13}C_4$, which forgets to remove the injured player.)`,
    hints: ["Put the two required players in first, and take the injured one out of the pool."],
  });

  const sel = nCr(5, 2) * nCr(4, 2) * fact(4);
  chk(sel, 1440);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Two different odd digits and two different even digits are chosen from the digits 1 to 9 and arranged to form a four-digit number. How many such numbers can be formed?",
    value: sel, wrong: [60, 3024],
    explanation: t`There are 5 odd digits (1, 3, 5, 7, 9) and 4 even (2, 4, 6, 8). Select: ${C(5, 2).slice(0, -1)} \times {}^4C_2 = 10 \times 6 = 60$. Arrange the 4 chosen digits: $4! = 24$. Total $60 \times 24 = 1440$. (60 forgets to arrange.)`,
    hints: ["Select first, then arrange the selected digits."],
  });

  const xy = subsets(range("p", 10), 4).filter((s) => !(s.includes("p1") && s.includes("p2"))).length;
  chk(xy, 182);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "A group of 4 is chosen from 10 people, two of whom, Farai and Chipo, refuse to be in the group together. How many different groups can be chosen?",
    value: xy, wrong: [70, 28],
    explanation: t`Total ${C(10, 4)} = 210. Groups containing both Farai and Chipo: choose the other 2 from 8, ${C(8, 2)} = 28. Allowed: $210 - 28 = 182$. (70 counts only the groups containing neither of them.)`,
    hints: ["Count the groups with both of them, and subtract."],
  });

  chk(nCr(10, 2), 45); chk(nCr(10, 3), 120);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that ${C("n", 2)} = 45, find $n$ and the value of ${C("n", 3)}.`,
    template: "n = {{blank:n}}, nC3 = {{blank:c}}",
    blanks: [{ id: "n", input: "number", accepted: ["10"], wrong: "9" }, { id: "c", input: "number", accepted: ["120"], wrong: "720" }],
    explanation: t`$\frac{n(n - 1)}{2} = 45 \Rightarrow n^2 - n - 90 = 0 \Rightarrow (n - 10)(n + 9) = 0$, so $n = 10$. Then ${"$"}{}^{10}C_3 = \frac{10 \times 9 \times 8}{6} = 120$. (720 is ${"$"}{}^{10}P_3$.)`,
    hints: [t`${C("n", 2).slice(0, -1)} = \frac{n(n - 1)}{2}$.`],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For whole numbers $0 \le r \le n$, ${C("n", "r")} = ${"$"}{}^{n}C_{n-r}$.`,
    answer: true,
    explanation: t`Choosing which $r$ objects to take is the same as choosing which $n - r$ objects to leave, and the formula $\frac{n!}{r!\,(n - r)!}$ is symmetric in $r$ and $n - r$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which statement correctly links ${"$"}{}^nP_r$ and ${C("n", "r")}?`,
    options: [
      [t`${"$"}{}^nP_r = {}^nC_r \times r!$`, "Correct: each selection of r objects can be arranged in r! orders."],
      [t`${"$"}{}^nC_r = {}^nP_r \times r!$`, "This has the factor on the wrong side: there are more arrangements than selections."],
      [t`${"$"}{}^nP_r = {}^nC_r \times (n - r)!$`, "The arrangements are of the r chosen objects, so the factor is r!."],
      [t`${"$"}{}^nP_r = {}^nC_r + r!$`, "Each selection gives r! arrangements: the factor multiplies, it is not added."],
    ],
    answer: "A",
    explanation: t`${"$"}{}^nP_r = \frac{n!}{(n - r)!} = \frac{n!}{r!\,(n - r)!} \times r! = {}^nC_r \times r!$.`,
  });

  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: t`A group of 4 is to be chosen from 5 teachers and 9 learners, with at least one teacher. Thandeka argues: "choose one teacher in 5 ways, then any 3 of the other 13 people in ${"$"}{}^{13}C_3$ ways, giving $5 \times 286 = 1430$." Why is her answer wrong?`,
    options: [
      ["Groups with two or more teachers are counted more than once.", "Correct: a group with teachers A and B is counted once with A chosen 'first' and again with B chosen first."],
      ["She should have added 5 and 286 instead of multiplying them.", "The two stages of a selection are multiplied; the real problem is double counting."],
      ["She should have used permutations because the teacher is chosen first.", "Order does not matter in a group; using permutations would make the over-counting worse."],
      ["Groups with exactly one teacher have been left out of her count.", "Groups with one teacher are counted exactly once; the error is in groups with more than one."],
    ],
    answer: "A",
    explanation: t`Correct count: total minus none $= {}^{14}C_4 - {}^9C_4 = 1001 - 126 = 875$. Her method gives 1430 because groups with several teachers are counted several times.`,
    hints: ["Take a group with two teachers. How many times is it counted?"],
  });
  chk(nCr(14, 4) - nCr(9, 4), 875); chk(5 * nCr(13, 3), 1430);

  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each situation with the expression that counts it.",
    pairs: [
      ["choosing 3 of 8 learners for a committee", C(8, 3)],
      ["choosing a head, deputy and secretary from 8 learners", t`${"$"}{}^8P_3$`],
      ["choosing 3 of 8 learners, one of whom must be Tendai", C(7, 2)],
      ["choosing 3 of 8 learners, not including Tendai", C(7, 3)],
    ],
    explanation: t`Committee: ${C(8, 3)}. Different posts: ${"$"}{}^8P_3$. Tendai in: choose the other 2 from 7. Tendai out: choose all 3 from the other 7.`,
  });

  chk(nCr(12, 2) - 12, 54);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "A regular polygon has 12 sides. How many diagonals does it have? (A diagonal joins two vertices that are not next to each other.)",
    value: 54, wrong: [66, 108],
    explanation: t`Any 2 of the 12 vertices give a line segment: ${C(12, 2)} = 66. Of these, 12 are sides. Diagonals: $66 - 12 = 54$. (108 counts each diagonal twice, once from each end.)`,
    hints: ["Each pair of vertices gives a side or a diagonal."],
  });

  chk(nCr(9, 4) * nCr(5, 3), 1260);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "Nine learners are to be split into three working groups: one of 4 (to clean the laboratory), one of 3 (to sort books) and one of 2 (to water the garden). In how many ways can this be done?",
    value: 1260, wrong: [362880, 288],
    explanation: t`Choose the 4 for the laboratory: ${C(9, 4)} = 126. From the other 5, choose 3 for the books: ${C(5, 3)} = 10. The last 2 water the garden. Total $126 \times 10 = 1260$. (288 is $4!\,3!\,2!$, which counts orders within the groups.)`,
    hints: ["Choose each group in turn from the learners who are left."],
  });

  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "Six friends are to be split into two groups of 3 to share two identical tents. In how many ways can this be done?",
    options: [
      ["10", t`Correct: ${C(6, 3)} = 20 counts each split twice (choosing a group or its partner), so divide by 2.`],
      ["20", "Each split is counted twice, because choosing {A, B, C} also determines {D, E, F}, and vice versa."],
      ["40", "This multiplies by 2 instead of dividing: the tents are identical."],
      ["720", "This is 6!, the number of orders in a line."],
    ],
    answer: "A",
    explanation: t`With two identical tents, the split {A, B, C} | {D, E, F} is the same as {D, E, F} | {A, B, C}. So the number is $\frac{20}{2} = 10$.`,
    hints: ["Does it matter which group is chosen first when the tents are identical?"],
  });

  // Struct 12: choir
  const choir = [...range("S", 8), ...range("A", 6), ...range("T", 5)];
  const six = subsets(choir, 6);
  const two2 = six.filter((s) => count(s, "S") === 2 && count(s, "A") === 2 && count(s, "T") === 2).length;
  const atLeast2T = six.filter((s) => count(s, "T") >= 2).length;
  const noSisters = six.filter((s) => !(s.includes("S1") && s.includes("S2"))).length;
  chk(two2, 4200); chk(atLeast2T, nCr(19, 6) - nCr(14, 6) - 5 * nCr(14, 5)); chk(noSisters, nCr(19, 6) - nCr(17, 4));
  const arrEnds = two2 * 2 * fact(4);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "A church choir in Mutare has 8 sopranos, 6 altos and 5 tenors. A group of 6 singers is chosen to sing at a wedding.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "In how many ways can the group be chosen if it contains exactly 2 singers of each type?", value: two2, wrong: [53, 27132],
        explanation: t`${C(8, 2).slice(0, -1)} \times {}^6C_2 \times {}^5C_2 = 28 \times 15 \times 10 = 4200$. (53 adds the three numbers.)` }),
      P.num({ label: "(b)", marks: 3, stem: "In how many ways can the group be chosen if it contains at least 2 tenors?", value: atLeast2T, wrong: [nCr(19, 6) - nCr(14, 6), 10 * nCr(17, 4)],
        explanation: t`Total ${C(19, 6)} = 27\,132. No tenor: ${C(14, 6)} = 3003. Exactly one tenor: $5 \times {}^{14}C_5 = 5 \times 2002 = 10\,010$. At least 2: $27\,132 - 3003 - 10\,010 = 14\,119$.` }),
      P.num({ label: "(c)", marks: 3, stem: "Two of the sopranos are sisters who will not sing in the same group. In how many ways can a group of 6 be chosen from the whole choir?", value: noSisters, wrong: [nCr(17, 6), nCr(17, 4)],
        explanation: t`Groups with both sisters: choose the other 4 from 17, ${C(17, 4)} = 2380. Allowed: $27\,132 - 2380 = 24\,752$. (12 376 is ${"$"}{}^{17}C_6$, the groups with neither sister only.)` }),
      P.num({ label: "(d)", marks: 4, stem: "A group with exactly 2 singers of each type stands in a row with the two tenors at the two ends. How many different line-ups are possible, counting both the choice of singers and their positions?", value: arrEnds, wrong: [two2 * fact(6), two2 * fact(4)],
        explanation: t`Choose the group: 4200 ways. The two tenors take the ends in $2! = 2$ ways; the other 4 singers fill the middle in $4! = 24$ ways. Total $4200 \times 2 \times 24 = 201\,600$.` }),
    ],
    explanation: "Multiply selections from separate groups; use 'total minus' for at-least and not-together conditions; then arrange.",
    hints: ["For (b), subtract the groups with 0 or 1 tenor from the total.", "For (d), place the tenors at the ends first."],
  });
  chk(atLeast2T, 14119); chk(noSisters, 24752); chk(arrEnds, 201600);

  // Struct 5: delegation
  const del = subsets([...range("F", 5), ...range("S", 7)], 4);
  const del2 = del.filter((s) => count(s, "F") >= 1 && count(s, "S") >= 1).length;
  chk(del.length, 495); chk(del2, 495 - nCr(5, 4) - nCr(7, 4));
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: "A delegation of 4 is chosen from 5 Form 5 learners and 7 Form 6 learners to attend a science fair in Harare.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many different delegations are possible?", value: 495, wrong: [11880, 35],
        explanation: t`${C(12, 4).slice(0, -1)} = 495$.` }),
      P.num({ label: "(b)", marks: 2, stem: "How many delegations include at least one learner from each form?", value: del2, wrong: [455, 490],
        explanation: t`Subtract the all-Form-5 delegations (${C(5, 4)} = 5) and the all-Form-6 delegations (${C(7, 4)} = 35): $495 - 5 - 35 = 455$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Once chosen, the 4 delegates are given four different tasks. How many ways are there of choosing the delegates and assigning the tasks?", value: 495 * 24, wrong: [495, 24],
        explanation: t`Each delegation can be assigned the 4 different tasks in $4! = 24$ ways: $495 \times 24 = 11\,880 = {}^{12}P_4$.` }),
    ],
    explanation: "Combinations for the choice; subtract unwanted cases; multiply by arrangements for different tasks.",
    hints: ["In (b), which delegations fail the condition?"],
  });
  chk(del2, 455); chk(nPr(12, 4), 11880);

  b.card("FORMULA", "Combinations nCr", t`${C("n", "r").slice(0, -1)} = \dfrac{n!}{r!\,(n - r)!}$: selections of $r$ from $n$ different objects (order does not matter).`);
  b.card("FACT", "Symmetry of nCr", t`${C("n", "r").slice(0, -1)} = {}^nC_{n-r}$; ${"$"}{}^nC_0 = {}^nC_n = 1$.`);
  b.card("FACT", "Permutations and combinations", t`${"$"}{}^nP_r = {}^nC_r \times r!$`);
  b.card("CONCEPT", "Several groups", "Choose from each group and MULTIPLY; for alternative cases, ADD.");
  b.card("CONCEPT", "At least one", "Total minus the selections with none. Never 'choose one first, then any others' (double counting).");
  b.card("CONCEPT", "Must include / must exclude", "Include: put the item in and choose the rest from the others. Exclude: remove it from the pool.");
  b.card("CONCEPT", "Not both together", "Total minus the selections that contain both.");
  b.card("CONCEPT", "Select then arrange", "Count the selections, then multiply by the number of arrangements of each selection.");
  b.card("DEFINITION", "Combination", "A selection in which order does not matter.");
});
