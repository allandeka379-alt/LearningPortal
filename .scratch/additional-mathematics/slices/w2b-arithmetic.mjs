// W2b: amath.series.arithmetic
import { concept, P, t, chk, same, ap, quad, money } from "../lib.mjs";

concept("amath.series.arithmetic", { file: "series/arithmetic", keyPrefix: "series.arithmetic" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the common difference of the arithmetic progression $12, 9, 6, 3, \ldots$?`,
    options: [
      [t`$-3$`, t`Correct: $9 - 12 = -3$; each term is 3 less than the one before.`],
      [t`$3$`, t`This is $12 - 9$, earlier minus later. The difference is later minus earlier.`],
      [t`$\frac{3}{4}$`, t`This is the ratio $\frac{9}{12}$, which belongs to geometric progressions.`],
      [t`$-12$`, "This is the negative of the first term, not the step between terms."],
    ],
    answer: "A",
    explanation: t`$d = u_2 - u_1 = 9 - 12 = -3$, and the same for every pair of neighbouring terms.`,
  });

  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "Which of these sequences is an arithmetic progression?",
    options: [
      [t`$2, 5, 8, 11, \ldots$`, "Correct: each term is 3 more than the one before."],
      [t`$2, 4, 8, 16, \ldots$`, "Each term is doubled: a constant ratio, so this is geometric."],
      [t`$1, 4, 9, 16, \ldots$`, "The differences 3, 5, 7 are not constant (these are square numbers)."],
      [t`$3, -3, 3, -3, \ldots$`, "The differences alternate between −6 and 6, so they are not constant."],
    ],
    answer: "A",
    explanation: "An AP has a constant difference between consecutive terms; only 2, 5, 8, 11, … has one (d = 3).",
  });

  chk(ap.nth(4, 6, 15), 88);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the 15th term of the arithmetic progression $4, 10, 16, \ldots$`,
    value: 88, wrong: [94, 60],
    explanation: t`$a = 4$, $d = 6$: $u_{15} = 4 + 14 \times 6 = 88$. (Using $15d$ gives 94.)`,
  });

  chk(ap.sum(3, 2, 25), 675);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the sum of the first 25 terms of the arithmetic series $3 + 5 + 7 + \cdots$`,
    value: 675, wrong: [51, 1350],
    explanation: t`$S_{25} = \frac{25}{2}\{2(3) + 24(2)\} = \frac{25}{2} \times 54 = 675$. (51 is the 25th term, not the sum.)`,
  });

  chk(ap.nth(5, 7, 10) - ap.nth(5, 7, 4), 6 * 7);
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`In any arithmetic progression with common difference $d$, the 10th term minus the 4th term equals $6d$.`,
    answer: true,
    explanation: t`True. $(a + 9d) - (a + 3d) = 6d$: from the 4th to the 10th term there are 6 steps of $d$.`,
  });

  chk((15 / 2) * (8 + 92), 750);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`An arithmetic progression has first term 8, last term 92 and 15 terms. Find the sum of all its terms.`,
    value: 750, wrong: [1500, 700],
    explanation: t`$S_{15} = \frac{15}{2}(8 + 92) = 7.5 \times 100 = 750$.`,
  });

  // u3 = 11, u9 = 35 -> d = 4, a = 3
  chk(ap.nth(3, 4, 3), 11); chk(ap.nth(3, 4, 9), 35);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The 3rd term of an arithmetic progression is 11 and the 9th term is 35. Find the first term $a$ and the common difference $d$.`,
    template: "a = {{blank:a}}, d = {{blank:d}}",
    blanks: [
      { id: "a", input: "number", accepted: [3], wrong: "7" },
      { id: "d", input: "number", accepted: [4], wrong: "6" },
    ],
    explanation: t`$a + 2d = 11$ and $a + 8d = 35$. Subtracting: $6d = 24$, so $d = 4$ and $a = 11 - 8 = 3$.`,
    hints: [t`Write each term as $a + (n - 1)d$ and subtract the equations.`],
  });

  chk((201 - 6) / 5 + 1, 40); chk(ap.nth(6, 5, 40), 201);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`How many terms are there in the arithmetic progression $6, 11, 16, \ldots, 201$?`,
    value: 40, wrong: [39, 41],
    explanation: t`$201 = 6 + (n - 1) \times 5$ gives $n - 1 = 39$, so $n = 40$.`,
    hints: [t`Set the last term equal to $a + (n - 1)d$.`],
  });

  chk(Math.ceil(50 / 6) * 6, 54); chk(Math.floor(250 / 6) * 6, 246); chk((246 - 54) / 6 + 1, 33); chk(ap.sum(54, 6, 33), 4950);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Find the sum of all the multiples of 6 between 50 and 250.",
    value: 4950, wrong: [5000, 4800],
    explanation: t`The multiples run from $54$ to $246$: $n = \frac{246 - 54}{6} + 1 = 33$. Sum $= \frac{33}{2}(54 + 246) = 16.5 \times 300 = 4950$.`,
    hints: ["Find the first multiple above 50 and the last below 250.", "Count the terms before using the sum formula."],
  });

  chk(Math.ceil(200 / 9) * 9, 207); chk(Math.floor(500 / 9) * 9, 495); chk((495 - 207) / 9 + 1, 33);
  b.num({
    d: 3, skill: "APPLICATION", daily: false, calculator: false,
    stem: "How many multiples of 9 lie between 200 and 500?",
    value: 33, wrong: [32, 34],
    explanation: t`First multiple $9 \times 23 = 207$; last $9 \times 55 = 495$. Number $= 55 - 23 + 1 = 33$.`,
    hints: [t`$200 \div 9 = 22.2$ and $500 \div 9 = 55.6$.`],
  });

  same(quad.roots(3, 7, -2910), [-97 / 3, 30]);
  chk(ap.sum(5, 3, 30), 1455);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The sum of the first $n$ terms of the arithmetic series $5 + 8 + 11 + \cdots$ is 1455. Find $n$.`,
    value: 30, prefix: "n =", wrong: [97, 29],
    explanation: t`$S_n = \frac{n}{2}\{10 + 3(n - 1)\} = \frac{n(3n + 7)}{2} = 1455$, so $3n^2 + 7n - 2910 = 0$, which factorises as $(n - 30)(3n + 97) = 0$. As $n$ is a positive integer, $n = 30$.`,
    hints: [t`Form a quadratic in $n$ from $S_n = \frac{n}{2}\{2a + (n - 1)d\}$.`, "Reject the negative root."],
  });

  chk(ap.sum(2, 4, 22), 968); chk(ap.sum(2, 4, 23), 1058);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Find the least number of terms of $2 + 6 + 10 + \cdots$ whose sum is greater than 1000.`,
    value: 23, prefix: "n =", wrong: [22, 250],
    explanation: t`$S_n = \frac{n}{2}\{4 + 4(n - 1)\} = 2n^2$. $2n^2 > 1000$ gives $n^2 > 500$, $n > 22.36$, so $n = 23$. Check: $S_{22} = 968$, $S_{23} = 1058$.`,
    hints: [t`Simplify $S_n$ first: it is $2n^2$.`, "n must be a whole number above the root."],
  });

  // S_n = 3n^2 + 2n -> a = 5, d = 6
  const Sn = (n) => 3 * n * n + 2 * n;
  for (const n of [1, 2, 5, 11]) chk(Sn(n), ap.sum(5, 6, n));
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The sum of the first $n$ terms of an arithmetic progression is $S_n = 3n^2 + 2n$. Find the first term and the common difference.`,
    template: "a = {{blank:a}}, d = {{blank:d}}",
    blanks: [
      { id: "a", input: "number", accepted: [5], wrong: "3" },
      { id: "d", input: "number", accepted: [6], wrong: "11" },
    ],
    explanation: t`$a = S_1 = 3 + 2 = 5$. $S_2 = 12 + 4 = 16$, so $u_2 = S_2 - S_1 = 11$ and $d = 11 - 5 = 6$.`,
    hints: [t`$S_1$ is the first term.`, t`$u_2 = S_2 - S_1$.`],
  });

  chk(ap.nth(50, -3, 17), 2); chk(ap.nth(50, -3, 18), -1);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`An arithmetic progression has first term 50 and common difference $-3$. Which is the first negative term?`,
    options: [
      ["the 18th term", t`Correct: $50 - 3(n - 1) < 0$ gives $n > 17.7$; $u_{18} = -1$.`],
      ["the 17th term", t`$u_{17} = 50 - 48 = 2$, which is still positive.`],
      ["the 16th term", t`$u_{16} = 50 - 45 = 5$, which is positive.`],
      ["the 19th term", t`$u_{19} = -4$ is negative, but $u_{18} = -1$ comes first.`],
    ],
    answer: "A",
    explanation: t`$u_n = 53 - 3n < 0$ when $n > 17.67$, so the first negative term is $u_{18} = -1$.`,
    hints: [t`Solve $a + (n - 1)d < 0$.`],
  });

  chk(ap.sum(2, 0.5, 14), 73.5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Rudo trains for a race in Mutare. She runs 2 km on the first day and increases her distance by 0.5 km each day. Find the total distance she runs in the first 14 days.`,
    value: 73.5, unit: "km", wrong: [8.5, 147],
    explanation: t`$a = 2$, $d = 0.5$: $S_{14} = \frac{14}{2}\{4 + 13(0.5)\} = 7 \times 10.5 = 73.5$ km. (8.5 km is her distance on the 14th day only.)`,
    hints: ["The question asks for a total, so use the sum formula."],
  });

  same([1, 2, 3].map((n) => 35 - 4 * n), [31, 27, 23]);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find an expression for the $n$th term of the arithmetic progression $31, 27, 23, \ldots$ Type it, e.g. 20-3n.`,
    accepted: ["35-4n", "-4n+35", "31-4(n-1)", "31+(n-1)(-4)", "31-4n+4"],
    wrong: ["31-4n", "27+4n"],
    explanation: t`$a = 31$, $d = -4$: $u_n = 31 + (n - 1)(-4) = 35 - 4n$. Check: $n = 1$ gives 31.`,
    hints: [t`Use $u_n = a + (n - 1)d$ with a negative $d$.`],
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Prove that the sum of the first $n$ terms of an arithmetic progression with first term $a$ and common difference $d$ is $S_n = \dfrac{n}{2}\{2a + (n - 1)d\}$.`,
    points: [
      t`M1 writes $S_n$ forwards and backwards (in terms of $a$, $d$ and the last term $l = a + (n - 1)d$).`,
      t`M1 adds term by term: each of the $n$ pairs sums to $2a + (n - 1)d$, so $2S_n = n\{2a + (n - 1)d\}$.`,
      t`A1 divides by 2 to reach the result.`,
    ],
    modelAnswer: t`$$
S_n = a + (a + d) + (a + 2d) + \cdots + [a + (n - 1)d]
$$

$$
S_n = [a + (n - 1)d] + [a + (n - 2)d] + \cdots + a
$$

Adding, each of the $n$ columns gives $2a + (n - 1)d$:

$$
2S_n = n\{2a + (n - 1)d\}
$$

$$
S_n = \frac{n}{2}\{2a + (n - 1)d\}
$$`,
    explanation: "Reversing the series pairs the first term with the last, the second with the second-last, and so on; every pair has the same total.",
    hints: ["Write the sum in reverse order underneath and add the two lines."],
  });

  // Struct 1 (6): u4 = 23, S10 = 275 -> a = 14, d = 3
  chk(ap.nth(14, 3, 4), 23); chk(ap.sum(14, 3, 10), 275); chk(ap.nth(14, 3, 20), 71); chk(ap.sum(14, 3, 20), 850);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: "The 4th term of an arithmetic progression is 23 and the sum of the first 10 terms is 275.",
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Find the first term $a$ and the common difference $d$.`, template: "a = {{blank:a}}, d = {{blank:d}}",
        blanks: [{ id: "a", input: "number", accepted: [14], wrong: "11" }, { id: "d", input: "number", accepted: [3], wrong: "4" }],
        explanation: t`$a + 3d = 23$ and $5(2a + 9d) = 275$, that is $2a + 9d = 55$. Doubling the first: $2a + 6d = 46$. Subtracting: $3d = 9$, so $d = 3$ and $a = 14$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Find the 20th term.", value: 71, wrong: [74],
        explanation: t`$u_{20} = 14 + 19 \times 3 = 71$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the sum of the first 20 terms.", value: 850, wrong: [1700, 875],
        explanation: t`$S_{20} = \frac{20}{2}(14 + 71) = 10 \times 85 = 850$.` }),
    ],
    explanation: "Turn each fact into an equation in a and d, solve them simultaneously, then use the formulas.",
    hints: [t`$S_{10} = 5(2a + 9d)$.`, "Make the coefficients of a equal before subtracting."],
  });

  // Struct 2 (9): salaries
  const A = (n) => ap.sum(4000, 300, n);
  const B = (n) => ap.sum(4800, 150, n);
  chk(ap.nth(4000, 300, 10), 6700); chk(A(10), 53500); chk(B(10), 54750);
  chk(A(11) <= B(11) ? 1 : 0, 1); chk(A(12) > B(12) ? 1 : 0, 1);
  for (const n of [3, 10, 15]) chk(A(n) - B(n), (n / 2) * (150 * n - 1750));
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A company in Harare offers two salary options. Option A: ${money(4000)} in the first year, rising by ${money(300)} each year. Option B: ${money(4800)} in the first year, rising by ${money(150)} each year. Give money answers in US dollars.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the salary in the 10th year under option A.", value: 6700, wrong: [7000],
        explanation: t`$4000 + 9 \times 300 = 6700$, so ${money(6700)}.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the total earned in the first 10 years under option A.", value: 53500, wrong: [67000],
        explanation: t`$S_{10} = \frac{10}{2}(4000 + 6700) = 53\,500$, so ${money(53500)}.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the total earned in the first 10 years under option B.", value: 54750, wrong: [61500],
        explanation: t`Last term $4800 + 9 \times 150 = 6150$; $S_{10} = 5(4800 + 6150) = 54\,750$, so ${money(54750)}.` }),
      P.proof({ label: "(d)", marks: 2, stem: t`Show that, after $n$ years, the total under option A minus the total under option B is $\dfrac{n}{2}(150n - 1750)$.`,
        points: [t`M1 writes both totals with $S_n = \frac{n}{2}\{2a + (n - 1)d\}$: $\frac{n}{2}\{8000 + 300(n - 1)\}$ and $\frac{n}{2}\{9600 + 150(n - 1)\}$.`, t`A1 subtracts: $\frac{n}{2}\{-1600 + 150(n - 1)\} = \frac{n}{2}(150n - 1750)$.`],
        modelAnswer: t`$$
S_A - S_B = \frac{n}{2}\{8000 + 300(n - 1)\} - \frac{n}{2}\{9600 + 150(n - 1)\}
$$

$$
= \frac{n}{2}\{-1600 + 150(n - 1)\} = \frac{n}{2}(150n - 1750)
$$`,
        explanation: "Both sums share the factor n/2, so subtract the brackets." }),
      P.num({ label: "(e)", marks: 2, stem: "Hence find the least number of complete years after which the total under option A is greater than the total under option B.", value: 12, prefix: "n =", wrong: [11, 13],
        explanation: t`Option A is ahead when $150n - 1750 > 0$, that is $n > 11.67$, so after 12 complete years.` }),
    ],
    explanation: "Each salary scheme is an arithmetic progression; compare the totals with the sum formula.",
    hints: [t`Option A: $a = 4000$, $d = 300$. Option B: $a = 4800$, $d = 150$.`, t`$\frac{n}{2}(150n - 1750) > 0$ when $150n > 1750$.`],
  });

  for (const n of [1, 2, 9]) chk(ap.nth(5, 4, n), 4 * n + 1);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`An arithmetic progression has first term 5 and common difference 4. Which expression gives its $n$th term?`,
    options: [
      [t`$4n + 1$`, t`Correct: $5 + (n - 1)4 = 4n + 1$; check $n = 1$ gives 5.`],
      [t`$4n + 5$`, t`This uses $a + nd$; at $n = 1$ it gives 9, not 5.`],
      [t`$5n - 1$`, "The coefficient of n must be the common difference, 4."],
      [t`$n + 4$`, "This has difference 1; the terms of the AP go up by 4."],
    ],
    answer: "A",
    explanation: t`$u_n = a + (n - 1)d = 5 + 4n - 4 = 4n + 1$.`,
  });

  chk(ap.sum(3, 2, 10), 120); chk(ap.sum(3, 1.8, 10) === 120 ? 0 : 1, 1);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "The sum of the first 10 terms of an arithmetic progression is 120 and the first term is 3. Find the common difference.",
    options: [
      ["2", t`Correct: $5(6 + 9d) = 120$ gives $6 + 9d = 24$ and $d = 2$.`],
      ["1.8", t`This uses $10d$ instead of $9d$: the formula has $(n - 1)d$.`],
      [t`$\frac{2}{3}$`, t`This leaves out the $\frac{n}{2}$: $10(6 + 9d) = 120$.`],
      ["3", "3 is the first term, not the difference."],
    ],
    answer: "A",
    explanation: t`$S_{10} = \frac{10}{2}\{2(3) + 9d\} = 120$, so $30 + 45d = 120$ and $d = 2$.`,
    hints: [t`Use $S_n = \frac{n}{2}\{2a + (n - 1)d\}$.`],
  });

  // Cards
  b.card("DEFINITION", "Arithmetic progression", t`A sequence with a constant common difference $d = u_{n+1} - u_n$.`);
  b.card("FORMULA", "nth term of an AP", t`$u_n = a + (n - 1)d$`);
  b.card("FORMULA", "Sum of an AP using the last term", t`$S_n = \frac{n}{2}(a + l)$`);
  b.card("FORMULA", "Sum of an AP using d", t`$S_n = \frac{n}{2}\{2a + (n - 1)d\}$`, "In Cambridge's List of formulas.");
  b.card("CONCEPT", "Two terms of an AP given", t`Form $a + (p - 1)d = \ldots$ and $a + (q - 1)d = \ldots$ and subtract to find $d$.`);
  b.card("CONCEPT", "Multiples of k between two numbers", "Find the first and last multiples in the range, then n = (last − first)/k + 1.");
  b.card("CONCEPT", t`Finding $n$ from a sum`, "Form a quadratic in n, keep the positive root, and check the whole numbers either side for 'exceeds' questions.");
  b.card("FACT", t`A term from the sum formula`, t`$u_n = S_n - S_{n-1}$; in particular $u_1 = S_1$.`);
  b.card("CONCEPT", "Proof of the AP sum", "Write the series forwards and backwards and add: n pairs, each totalling a + l.");
});
