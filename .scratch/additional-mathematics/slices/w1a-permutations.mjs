// W1a: amath.counting.permutations (Cambridge only) — factorials, nPr, arrangements with conditions.
import { concept, P, t, chk, fact, nPr } from "../lib.mjs";

/** Brute-force count of arrangements of `items` (all distinct) taken r at a time that satisfy pred. */
function countArr(items, r, pred = () => true) {
  let n = 0;
  const rec = (cur, rest) => {
    if (cur.length === r) { if (pred(cur)) n++; return; }
    rest.forEach((x, i) => rec([...cur, x], [...rest.slice(0, i), ...rest.slice(i + 1)]));
  };
  rec([], items);
  return n;
}
const adjacent = (arr, a, b) => Math.abs(arr.indexOf(a) - arr.indexOf(b)) === 1;

concept("amath.counting.permutations", { file: "counting/permutations", keyPrefix: "counting.permutations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the value of $0!$?`,
    options: [
      [t`$1$`, t`Correct: by definition $0! = 1$, which keeps $^{n}P_{n} = \frac{n!}{0!} = n!$ true.`],
      [t`$0$`, "0! is defined as 1, not 0."],
      [t`undefined`, "0! is defined, and its value is 1."],
      [t`$-1$`, "Factorials are never negative."],
    ],
    answer: "A",
    explanation: t`$0! = 1$ by definition. It makes formulas such as $^{n}P_{r} = \frac{n!}{(n - r)!}$ work when $r = n$.`,
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which expression gives the number of ways of arranging $r$ objects chosen from $n$ distinct objects in a line?`,
    options: [
      [t`$\dfrac{n!}{(n - r)!}$`, t`Correct: this is $^{n}P_{r}$.`],
      [t`$\dfrac{n!}{r!\,(n - r)!}$`, "This is the number of combinations: it ignores order."],
      [t`$n^{r}$`, "This allows the same object to be used more than once."],
      [t`$\dfrac{n!}{r!}$`, "Divide by (n − r)!, the arrangements of the objects left out."],
    ],
    answer: "A",
    explanation: t`Filling $r$ places gives $n(n - 1) \cdots (n - r + 1) = \dfrac{n!}{(n - r)!} = {}^{n}P_{r}$.`,
  });

  const v2 = fact(9) / fact(6);
  chk(v2, 504);
  b.num({
    d: 1, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate $\dfrac{9!}{6!}$ without a calculator.`,
    value: v2, wrong: [1.5, 3],
    explanation: t`$\dfrac{9!}{6!} = 9 \times 8 \times 7 = 504$, because the factors $6 \times 5 \times \cdots \times 1$ cancel.`,
  });

  chk(fact(7), countArr([1, 2, 3, 4, 5, 6, 7], 7));
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "In how many different orders can 7 different trophies be arranged in a row on a shelf?",
    value: fact(7), wrong: [49, 7],
    explanation: t`$7! = 7 \times 6 \times 5 \times 4 \times 3 \times 2 \times 1 = 5040$.`,
  });

  chk(nPr(9, 2), 72);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "A class of 9 debaters chooses a captain and a vice-captain. In how many ways can this be done?",
    value: nPr(9, 2), wrong: [36, 81],
    explanation: t`The roles are different, so order matters: $^{9}P_{2} = 9 \times 8 = 72$. (36 would be choosing two people without roles.)`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Which of these situations is counted by a permutation rather than a combination?",
    options: [
      ["Awarding first, second and third prizes to 3 of 10 entrants", "Correct: the prizes are different, so the order of selection matters."],
      ["Choosing 3 of 10 learners to clean the classroom", "The three cleaners do the same job; order does not matter."],
      ["Choosing 3 of 10 books to take on holiday", "Only which books are chosen matters, not their order."],
      ["Selecting a team of 3 from 10 players", "A team is a selection; order does not matter."],
    ],
    answer: "A",
    explanation: "Permutations count arrangements where order (or different roles) matters; combinations count selections where it does not.",
  });

  const M = ["M", "A", "S", "V", "I", "N", "G", "O"];
  const vowels = ["A", "I", "O"];
  const total = fact(8);
  const vEnds = nPr(3, 2) * fact(6);
  const together = 2 * fact(7);
  chk(total, 40320); chk(vEnds, 4320); chk(together, 10080);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "The eight letters of the word MASVINGO are arranged in a line. How many arrangements begin and end with a vowel?",
    value: vEnds, wrong: [6 * fact(6) / 2, fact(6)],
    explanation: t`The vowels are A, I, O. The first and last places take 2 of the 3 vowels in order: $^{3}P_{2} = 6$ ways. The other 6 letters fill the middle: $6! = 720$. Total $6 \times 720 = 4320$.`,
    hints: ["Fill the two end positions first.", "Then arrange the remaining 6 letters in the middle."],
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "The eight letters of MASVINGO are arranged in a line. In how many arrangements are the letters M and S next to each other?",
    value: together, wrong: [fact(7), fact(8) / 2],
    explanation: t`Treat MS as one block: 7 items, $7! = 5040$ arrangements; the block can be MS or SM, so $5040 \times 2 = 10\,080$.`,
    hints: ["Glue M and S into one block.", "Do not forget the two orders inside the block."],
  });

  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: "The eight letters of MASVINGO are arranged in a line. In how many arrangements are M and S NOT next to each other?",
    value: total - together, wrong: [together, total],
    explanation: t`Total $8! = 40\,320$; with M and S together $10\,080$. Not together: $40\,320 - 10\,080 = 30\,240$.`,
    hints: ["Not together = total − together."],
  });

  // check the MASVINGO counts by brute force on a smaller analogue: 5 letters, two together
  chk(countArr(["M", "A", "S", "V", "I"], 5, (a) => adjacent(a, "M", "S")), 2 * fact(4));
  chk(countArr(["M", "A", "S", "V", "I"], 5, (a) => vowels.includes(a[0]) && vowels.includes(a[4])), nPr(2, 2) * fact(3));

  const digits = [2, 3, 5, 7, 8];
  const odd3 = countArr(digits, 3, (a) => a[2] % 2 === 1);
  chk(odd3, 3 * nPr(4, 2));
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Three-digit numbers are formed from the digits 2, 3, 5, 7 and 8, with no digit used more than once. How many of these numbers are odd?",
    value: odd3, wrong: [nPr(5, 3), 3 * 4 * 4],
    explanation: t`The last digit must be 3, 5 or 7: 3 ways. The first two places use 2 of the remaining 4 digits: $^{4}P_{2} = 12$. Total $3 \times 12 = 36$.`,
    hints: ["Choose the last digit first."],
  });

  const less400 = countArr(digits, 3, (a) => a[0] * 100 + a[1] * 10 + a[2] < 400);
  chk(less400, 2 * nPr(4, 2));
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Three-digit numbers are formed from the digits 2, 3, 5, 7 and 8, with no digit repeated. How many of them are less than 400?",
    value: less400, wrong: [nPr(4, 2), 3 * nPr(4, 2)],
    explanation: t`The first digit must be 2 or 3: 2 ways. The other two places: $^{4}P_{2} = 12$. Total $2 \times 12 = 24$.`,
    hints: ["Which first digits give a number below 400?"],
  });

  const G = ["G1", "G2", "G3", "G4"], Bo = ["B1", "B2", "B3"];
  const alt = countArr([...G, ...Bo], 7, (a) => a.every((x, i) => (i % 2 === 0) === x.startsWith("G")));
  chk(alt, fact(4) * fact(3));
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "Four girls and three boys stand in a line for a photograph. In how many ways can they stand if girls and boys must alternate?",
    value: alt, wrong: [2 * fact(4) * fact(3), fact(7)],
    explanation: t`With 4 girls and 3 boys, the only alternating pattern is G B G B G B G. The girls fill their 4 places in $4! = 24$ ways and the boys their 3 places in $3! = 6$ ways: $24 \times 6 = 144$.`,
    hints: ["Write down the pattern of G and B first.", "Can the line start with a boy?"],
  });

  const ends = countArr(["R", "F", "x", "y", "z"], 5, (a) => (a[0] === "R" && a[4] === "F") || (a[0] === "F" && a[4] === "R"));
  chk(ends, 2 * fact(3));
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Rudo, Farai and three friends sit in a row of 5 seats. In how many ways can they sit if Rudo and Farai occupy the two end seats?",
    value: ends, wrong: [fact(3), fact(5)],
    explanation: t`Rudo and Farai fill the ends in $2! = 2$ ways (either can be on the left). The three friends fill the middle in $3! = 6$ ways. Total $12$.`,
    hints: ["Place Rudo and Farai first.", "Either of them can take the left end."],
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$^{n}P_{r} = \dfrac{n!}{(n - r)!}$`,
    answer: true,
    explanation: t`This is the formula for the number of ordered arrangements of $r$ objects from $n$ distinct objects.`,
  });

  chk(nPr(5, 5), nPr(5, 4));
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$^{5}P_{5} = {}^{5}P_{4}$`,
    answer: true,
    explanation: t`$^{5}P_{5} = \frac{5!}{0!} = 120$ and $^{5}P_{4} = \frac{5!}{1!} = 120$. Once four objects are placed, the fifth has only one place left.`,
  });

  chk(fact(5), 120); chk(nPr(6, 2), 30); chk(nPr(4, 4), 24); chk(fact(0), 1);
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each expression to its value.",
    pairs: [
      [t`$5!$`, t`$120$`],
      [t`$^{6}P_{2}$`, t`$30$`],
      [t`$^{4}P_{4}$`, t`$24$`],
      [t`$0!$`, t`$1$`],
    ],
    explanation: t`$5! = 120$; $^{6}P_{2} = 6 \times 5 = 30$; $^{4}P_{4} = 4! = 24$; $0! = 1$.`,
  });

  chk(nPr(10, 2), 90);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve the equation $^{n}P_{2} = 90$.`,
    value: 10, prefix: "n =", wrong: [9, -9],
    explanation: t`$^{n}P_{2} = n(n - 1) = 90$, so $n^{2} - n - 90 = 0$ and $(n - 10)(n + 9) = 0$. Since $n$ is a positive integer, $n = 10$.`,
    hints: [t`Write $^{n}P_{2}$ as $n(n - 1)$.`, "Reject the negative root."],
  });

  chk(nPr(6, 4), countArr([1, 2, 3, 4, 5, 6], 4));
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "In how many ways can 4 of 6 different books be arranged in a row on a shelf?",
    options: [
      [t`$360$`, t`Correct: $^{6}P_{4} = 6 \times 5 \times 4 \times 3 = 360$.`],
      [t`$15$`, t`That is $^{6}C_{4}$, which counts selections without order.`],
      [t`$1296$`, t`$6^{4}$ allows the same book to be used more than once.`],
      [t`$24$`, t`$4!$ arranges 4 particular books but ignores the choice of which 4.`],
    ],
    answer: "A",
    explanation: t`Four places to fill in order from 6 books: $6 \times 5 \times 4 \times 3 = {}^{6}P_{4} = 360$.`,
    hints: ["Does the order of the books on the shelf matter?"],
  });

  const shelf = countArr(["m1", "m2", "m3", "s1", "s2"], 5, (a) => { const idx = ["m1", "m2", "m3"].map((m) => a.indexOf(m)).sort((x, y) => x - y); return idx[2] - idx[0] === 2; });
  chk(shelf, fact(3) * fact(3));
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "Three different mathematics books and two different science books are arranged on a shelf. In how many arrangements are the three mathematics books together?",
    options: [
      [t`$36$`, t`Correct: the maths block and 2 science books give $3! = 6$ orders, and the block has $3! = 6$ internal orders.`],
      [t`$12$`, t`The three maths books inside the block can be ordered in $3!$ ways, not $2!$.`],
      [t`$6$`, "The arrangements inside the block have been forgotten."],
      [t`$120$`, t`$5!$ counts every arrangement, with or without the maths books together.`],
    ],
    answer: "A",
    explanation: t`Glue the maths books into one block: 3 items (block, S1, S2) give $3! = 6$ arrangements; inside the block $3! = 6$. Total $36$.`,
    hints: ["Treat the three maths books as one item."],
  });

  // Structured (7 marks): 7 people in a row
  const p7 = ["T", "R", "a", "b", "c", "d", "e"];
  const tog7 = 2 * fact(6);
  chk(countArr(["T", "R", "a", "b", "c"], 5, (a) => adjacent(a, "T", "R")), 2 * fact(4));
  chk(p7.length, 7);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: "Seven friends, including Tendai and Rudo, stand in a line at the Victoria Falls viewpoint for a photograph.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "In how many different orders can the seven friends stand?", value: fact(7), wrong: [49], explanation: t`$7! = 5040$.` }),
      P.num({ label: "(b)", marks: 2, stem: "In how many orders do Tendai and Rudo stand next to each other?", value: tog7, wrong: [fact(6)], explanation: t`Block TR: 6 items, $6! = 720$; times 2 for TR or RT: $1440$.` }),
      P.num({ label: "(c)", marks: 2, stem: "In how many orders are Tendai and Rudo NOT next to each other?", value: fact(7) - tog7, wrong: [tog7], explanation: t`$5040 - 1440 = 3600$.` }),
      P.num({ label: "(d)", marks: 2, stem: "In how many orders is Tendai at the left-hand end and Rudo at the right-hand end?", value: fact(5), wrong: [2 * fact(5)], explanation: t`Both ends are fixed; the other 5 friends fill the middle in $5! = 120$ ways.` }),
    ],
    explanation: t`Total $7! = 5040$. Together: block method $2 \times 6! = 1440$. Apart: $5040 - 1440 = 3600$. Fixed ends: $5! = 120$.`,
    hints: ["Use the block method for (b).", "Not together = total − together."],
  });

  // Structured (9 marks): 4-digit numbers from 1–7, no repetition
  const d7 = [1, 2, 3, 4, 5, 6, 7];
  const num4 = (a) => a[0] * 1000 + a[1] * 100 + a[2] * 10 + a[3];
  const all4 = countArr(d7, 4);
  const even4 = countArr(d7, 4, (a) => a[3] % 2 === 0);
  const big4 = countArr(d7, 4, (a) => num4(a) > 6000);
  const bigEven = countArr(d7, 4, (a) => num4(a) > 6000 && a[3] % 2 === 0);
  chk(all4, nPr(7, 4)); chk(even4, 3 * nPr(6, 3)); chk(big4, 2 * nPr(6, 3)); chk(bigEven, 2 * nPr(5, 2) + 3 * nPr(5, 2));
  chk(all4, 840); chk(even4, 360); chk(big4, 240); chk(bigEven, 100);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: "Four-digit numbers are formed using the digits 1, 2, 3, 4, 5, 6 and 7. No digit may be used more than once in a number.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many different four-digit numbers can be formed?", value: all4, wrong: [2401], explanation: t`$^{7}P_{4} = 7 \times 6 \times 5 \times 4 = 840$.` }),
      P.num({ label: "(b)", marks: 2, stem: "How many of these numbers are even?", value: even4, wrong: [420], explanation: t`Last digit 2, 4 or 6: 3 ways; the rest $^{6}P_{3} = 120$. Total $360$.` }),
      P.num({ label: "(c)", marks: 2, stem: "How many of these numbers are greater than 6000?", value: big4, wrong: [120], explanation: t`First digit 6 or 7: 2 ways; the rest $^{6}P_{3} = 120$. Total $240$.` }),
      P.num({ label: "(d)", marks: 3, stem: "How many of these numbers are even and greater than 6000?", value: bigEven, wrong: [90, 120], explanation: t`First digit 6: last digit 2 or 4 (2 ways), middle $^{5}P_{2} = 20$: 40. First digit 7: last digit 2, 4 or 6 (3 ways), middle 20: 60. Total $100$.` }),
      P.manual({
        label: "(e)", marks: 1, stem: "Explain why part (d) must be split into two cases.",
        points: ["Whether the first digit is even (6) or odd (7) changes how many even digits are left for the last place (2 or 3)"],
        modelAnswer: "If the first digit is 6, only 2 and 4 remain for the even last digit; if it is 7, all of 2, 4 and 6 remain. So the two cases give different counts.",
      }),
    ],
    explanation: t`$840$ numbers in all; $360$ even; $240$ over 6000; even and over 6000 needs cases by the first digit: $40 + 60 = 100$.`,
    hints: ["Fill the restricted positions first.", "In (d), consider first digit 6 and first digit 7 separately."],
  });

  b.card("DEFINITION", "Factorial n!", t`$n! = n(n - 1)(n - 2) \cdots 2 \times 1$, with $0! = 1$.`);
  b.card("DEFINITION", "Permutation", "An ordered arrangement of objects: changing the order gives a different permutation.");
  b.card("FORMULA", "Number of permutations of r from n", t`$^{n}P_{r} = \dfrac{n!}{(n - r)!} = n(n - 1)\cdots(n - r + 1)$ (not in the List of formulas).`);
  b.card("FACT", "Arranging n distinct objects in a line", t`$n!$ ways.`);
  b.card("CONCEPT", "Items that must be together", t`Treat them as one block; arrange the block with the rest, then multiply by the arrangements inside the block (e.g. $2!$).`);
  b.card("CONCEPT", "Items that must not be together", "Total arrangements minus the arrangements with them together.");
  b.card("CONCEPT", "Forming numbers with a condition", "Fill the restricted place first: last digit for odd/even, first digit for size. Use cases when one digit affects both.");
  b.card("FACT", "Permutation or combination?", "Permutation when order or different roles matter (prizes, captain/vice-captain); combination for plain selections (teams, committees).");
  b.card("FACT", "Topics excluded by Cambridge 0606", "Repeated objects, circular arrangements, and problems needing both permutations and combinations.");
});
