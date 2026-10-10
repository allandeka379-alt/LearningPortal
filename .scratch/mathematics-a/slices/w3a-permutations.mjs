// W3a: amaths.counting.permutations (every count checked by brute force where practical)
import { concept, P, t, chk, fact, nPr } from "../lib.mjs";

function perms(a) {
  if (a.length <= 1) return [a];
  const out = [];
  a.forEach((x, i) => { for (const p of perms([...a.slice(0, i), ...a.slice(i + 1)])) out.push([x, ...p]); });
  return out;
}
const words = (w) => [...new Set(perms([...w]).map((p) => p.join("")))];
/** r-permutations of a list of distinct items. */
function arr(items, r) {
  if (r === 0) return [[]];
  const out = [];
  items.forEach((x, i) => { for (const p of arr([...items.slice(0, i), ...items.slice(i + 1)], r - 1)) out.push([x, ...p]); });
  return out;
}

concept("amaths.counting.permutations", { file: "counting/permutations", keyPrefix: "counting.permutations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "In how many ways can 4 of 10 different trophies be arranged in a row on a shelf?",
    options: [
      [t`$\dfrac{10!}{6!}$`, t`Correct: ${"$"}{}^{10}P_4 = \frac{10!}{(10 - 4)!} = 10 \times 9 \times 8 \times 7$.`],
      [t`$\dfrac{10!}{4!}$`, t`This divides by the wrong factorial: it should be $(10 - 4)!$.`],
      [t`$\dfrac{10!}{4!\,6!}$`, t`This is ${"$"}{}^{10}C_4$, the number of selections; order matters on a shelf.`],
      [t`$10^4$`, "This allows the same trophy to be used more than once."],
    ],
    answer: "A",
    explanation: t`The first place can be filled in 10 ways, the next in 9, then 8, then 7: $10 \times 9 \times 8 \times 7 = \frac{10!}{6!} = 5040$.`,
  });

  chk(words("HARARE").length, 180); chk(fact(6) / (2 * 2), 180);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "Find the number of different arrangements of the letters of the word HARARE.",
    value: 180, wrong: [720, 360],
    explanation: t`6 letters with A twice and R twice: $\frac{6!}{2!\,2!} = \frac{720}{4} = 180$. (360 divides by only one $2!$.)`,
  });

  chk(nPr(9, 4), 3024); chk(arr([1, 2, 3, 4, 5, 6, 7, 8, 9], 4).length, 3024);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "A committee of 9 people must choose a chairperson, a secretary, a treasurer and a publicity officer, all different people. In how many ways can the four posts be filled?",
    value: 3024, wrong: [126, 6561],
    explanation: t`Order matters (the posts are different): ${"$"}{}^9P_4 = 9 \times 8 \times 7 \times 6 = 3024$. (126 is ${"$"}{}^9C_4$, which ignores which post each person holds.)`,
  });

  chk(words("KARIBA").length, 360);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Find the number of different arrangements of the letters of the word KARIBA.",
    value: 360, wrong: [720, 180],
    explanation: t`6 letters with A repeated twice: $\frac{6!}{2!} = 360$.`,
  });

  const masv = words("MASVINGO");
  const vowEnds = masv.filter((w) => "AIO".includes(w[0]) && "AIO".includes(w[7])).length;
  chk(vowEnds, 4320); chk(nPr(3, 2) * fact(6), 4320);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "How many arrangements of the letters of the word MASVINGO begin and end with a vowel?",
    value: 4320, wrong: [720, 15120],
    explanation: t`The vowels are A, I and O. Fill the ends first: ${"$"}{}^3P_2 = 6$ ways. The other 6 letters fill the middle in $6! = 720$ ways. Total $6 \times 720 = 4320$. (15 120 counts arrangements that only begin with a vowel: $3 \times 7!$.)`,
    hints: ["Fill the first and last letters before the others."],
  });

  const ny = words("NYANGA");
  chk(ny.length, 180); chk(ny.filter((w) => w.includes("NN")).length, 60);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Find the number of arrangements of the letters of the word NYANGA in which the two N's are next to each other.",
    value: 60, wrong: [120, 30],
    explanation: t`Treat NN as one block. The items NN, Y, A, G, A can be arranged in $\frac{5!}{2!} = 60$ ways (A is repeated). The two N's are identical, so there is only one way inside the block. (120 multiplies by $2!$ for the block, but swapping identical letters gives nothing new.)`,
    hints: ["Glue the N's together into one item.", "Is there a repeated letter among the remaining items?"],
  });

  chk(fact(5) * fact(4), 2880);
  const alt = perms(["B1", "B2", "B3", "B4", "B5", "G1", "G2", "G3", "G4"].slice(0, 9));
  chk(alt.filter((p) => p.every((x, i) => (i % 2 === 0 ? x[0] === "B" : x[0] === "G"))).length, 2880);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Five boys and four girls stand in a line for a photograph. In how many ways can they stand if boys and girls must alternate?",
    value: 2880, wrong: [5760, 362880],
    explanation: t`With 5 boys and 4 girls, the line must be B G B G B G B G B. The boys fill their places in $5!$ ways and the girls in $4!$ ways: $120 \times 24 = 2880$. (5760 also counts G B G B …, which needs 5 girls.)`,
    hints: ["Which pattern of boys and girls is possible with 5 boys and 4 girls?"],
  });

  const gapCount = fact(5) * nPr(6, 3);
  chk(gapCount, 14400);
  const people = ["M1", "M2", "M3", "M4", "M5", "W1", "W2", "W3"];
  chk(perms(people).filter((p) => !p.some((x, i) => i > 0 && x[0] === "W" && p[i - 1][0] === "W")).length, 14400);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "Five men and three women are to sit in a row of 8 chairs at a meeting in Gweru. In how many ways can they sit if no two women sit next to each other?",
    value: gapCount, wrong: [36000, 4320],
    explanation: t`Seat the men first: $5! = 120$ ways. This makes 6 gaps (4 between the men and 2 at the ends). The three women go into 3 different gaps, in order: ${"$"}{}^6P_3 = 120$ ways. Total $120 \times 120 = 14\,400$. (36 000 is $8! - 3! \times 6!$, which only removes arrangements with all three women together.)`,
    hints: ["Arrange the men, then place the women in the gaps between and around them."],
  });
  chk(fact(8) - fact(3) * fact(6), 36000);

  const ev = arr([2, 3, 5, 6, 8, 9], 3).filter((p) => p[2] % 2 === 0).length;
  chk(ev, 60);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Three-digit numbers are formed from the digits 2, 3, 5, 6, 8 and 9, with no digit used more than once. How many of these numbers are even?",
    value: ev, wrong: [120, 30],
    explanation: t`The last digit must be 2, 6 or 8: 3 ways. The first two places are filled from the remaining 5 digits in ${"$"}{}^5P_2 = 20$ ways. Total $3 \times 20 = 60$. (120 is the total of all three-digit numbers.)`,
    hints: ["Fill the units digit first."],
  });

  const between = arr([1, 2, 3, 4, 5, 6, 7, 8], 3).map((p) => p[0] * 100 + p[1] * 10 + p[2]).filter((n) => n > 300 && n < 700 && n % 2 === 1).length;
  chk(between, 2 * 3 * 6 + 2 * 4 * 6);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "Three-digit numbers are formed from the digits 1, 2, 3, 4, 5, 6, 7 and 8, with no digit repeated. How many of them are odd and lie between 300 and 700?",
    value: between, wrong: [96, 144],
    explanation: t`The first digit is 3, 4, 5 or 6. If it is 3 or 5 (odd), the last digit is one of the 3 remaining odd digits: $2 \times 3 \times 6 = 36$ (6 choices for the middle digit). If it is 4 or 6, the last digit is any of the 4 odd digits: $2 \times 4 \times 6 = 48$. Total $36 + 48 = 84$. (96 assumes 4 odd choices in every case.)`,
    hints: ["Split into cases: is the first digit odd or even?"],
  });

  const acc = fact(10) / 16;
  chk(acc, 226800);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Find the number of different arrangements of the letters of the word ACCOUNTANT.",
    value: acc, wrong: [3628800, 907200],
    explanation: t`10 letters: A, C, N and T each appear twice; O and U once. $\frac{10!}{2!\,2!\,2!\,2!} = \frac{3\,628\,800}{16} = 226\,800$. (907 200 divides by only two of the $2!$ terms.)`,
    hints: ["Count how many times each letter appears."],
  });
  chk(fact(10) / 4, 907200);

  chk(words("BANANA").length, 60);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Which calculation gives the number of different arrangements of the letters of the word BANANA?",
    options: [
      [t`$\dfrac{6!}{3!\,2!}$`, "Correct: A appears three times and N twice, so divide by 3! and by 2!."],
      [t`$\dfrac{6!}{3!}$`, "This allows for the repeated A's but not for the two N's."],
      [t`$\dfrac{6!}{3! + 2!}$`, "The factorials of the repeats are multiplied in the denominator, not added."],
      [t`$\dfrac{6!}{2!}$`, "This allows for the two N's but not for the three A's."],
    ],
    answer: "A",
    explanation: t`$\frac{6!}{3!\,2!} = \frac{720}{12} = 60$ arrangements.`,
  });

  const shelf = perms(["M1", "M2", "E1", "E2", "E3", "E4"]).filter((p) => p[0][0] === "M" && p[5][0] === "M").length;
  chk(shelf, 48);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Nyasha arranges 6 different books in a row on a shelf. Two of them are mathematics books, and these must be at the two ends of the row. In how many ways can she arrange the books?",
    options: [
      ["48", t`Correct: the mathematics books take the ends in $2! = 2$ ways and the other 4 books fill the middle in $4! = 24$ ways.`],
      ["24", "This arranges the middle four books but forgets that the two mathematics books can swap ends."],
      ["720", "This is 6!, with no restriction."],
      ["240", t`This is $2 \times 5!$, the number with the two mathematics books next to each other.`],
    ],
    answer: "A",
    explanation: t`Fill the restricted positions first: $2! \times 4! = 48$.`,
    hints: ["Place the two mathematics books first."],
  });
  chk(2 * fact(5), 240);

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "By definition, 0! = 1.",
    answer: true,
    explanation: t`$0! = 1$, so that ${"$"}{}^nP_n = \frac{n!}{0!} = n!$ and other formulas work when nothing is left over.`,
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Seven people are to sit in two rows: 3 in the front row and 4 in the back row. Rudo and Sipho must both sit in the back row. In how many ways can the seven people be seated?",
    options: [
      ["1440", t`Correct: Rudo and Sipho take 2 of the 4 back seats in ${"$"}{}^4P_2 = 12$ ways; the other 5 fill the remaining 5 seats in $5! = 120$ ways.`],
      ["5040", "This is 7!, with no restriction."],
      ["288", t`This is $3! \times 4! \times 2$, which does not count the ways of placing the others correctly.`],
      ["720", "This is 6!, which treats Rudo and Sipho as one person."],
    ],
    answer: "A",
    explanation: t`${"$"}{}^4P_2 \times 5! = 12 \times 120 = 1440$.`,
    hints: ["Seat Rudo and Sipho first, in the back row."],
  });
  chk(nPr(4, 2) * fact(5), 1440);

  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each expression with its value.",
    pairs: [
      [t`$5!$`, "120"],
      [t`${"$"}{}^6P_2$`, "30"],
      [t`$\dfrac{7!}{5!}$`, "42"],
      [t`$\dfrac{4!}{2!\,2!}$`, "6"],
    ],
    explanation: t`$5! = 120$; ${"$"}{}^6P_2 = 6 \times 5 = 30$; $\frac{7!}{5!} = 7 \times 6 = 42$; $\frac{4!}{2!\,2!} = \frac{24}{4} = 6$.`,
  });

  chk(12 * 11, 132);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that ${"$"}{}^nP_2 = 132$, find $n$.`,
    value: 12, prefix: "n =", wrong: [11, 66],
    explanation: t`${"$"}{}^nP_2 = n(n - 1) = 132 \Rightarrow n^2 - n - 132 = 0 \Rightarrow (n - 12)(n + 11) = 0$, so $n = 12$ ($n$ must be positive).`,
    hints: [t`${"$"}{}^nP_2 = n(n - 1)$.`],
  });

  const dep = perms([..."DEPOSIT"]);
  const vowFirst = dep.filter((p) => p.slice(0, 3).every((c) => "EOI".includes(c))).length;
  const vowTog = dep.filter((p) => { const idx = p.map((c, i) => ("EOI".includes(c) ? i : -1)).filter((i) => i >= 0); return idx[2] - idx[0] === 2; }).length;
  chk(vowFirst, 144); chk(vowTog, 720);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "In how many arrangements of the letters of the word DEPOSIT are the three vowels the first three letters?",
    options: [
      ["144", t`Correct: the vowels E, O, I fill the first three places in $3!$ ways and the consonants the last four in $4!$ ways: $6 \times 24 = 144$.`],
      ["720", t`This is the number with the vowels together anywhere: $5! \times 3!$.`],
      ["5040", "This is 7!, every arrangement."],
      ["24", "This arranges only the consonants and forgets the vowels."],
    ],
    answer: "A",
    explanation: t`Positions 1–3 hold the vowels ($3! = 6$ ways) and positions 4–7 the consonants D, P, S, T ($4! = 24$ ways): $144$.`,
    hints: ["Which letters go in the first three places, and in how many orders?"],
  });

  b.proof({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: t`Explain why the number of ways of arranging $r$ objects chosen from $n$ different objects is ${"$"}{}^nP_r = \dfrac{n!}{(n - r)!}$.`,
    points: [
      t`M1 the first position can be filled in $n$ ways, the second in $n - 1$, …, the $r$th in $n - r + 1$ ways.`,
      t`M1 by the counting principle the total is $n(n - 1)\cdots(n - r + 1)$.`,
      t`A1 multiplying and dividing by $(n - r)!$ gives $\frac{n!}{(n - r)!}$.`,
    ],
    modelAnswer: t`$$
{}^nP_r = n(n - 1)(n - 2)\cdots(n - r + 1)
$$

$$
= \frac{n(n - 1)\cdots(n - r + 1) \times (n - r)(n - r - 1)\cdots 1}{(n - r)(n - r - 1)\cdots 1} = \frac{n!}{(n - r)!}
$$`,
    explanation: "Each position uses up one object, so the number of choices falls by one each time.",
    hints: ["Count the choices for each position in turn."],
  });

  // Struct 12: TOBACCO
  const tob = words("TOBACCO");
  const sT = tob.length, sStartT = tob.filter((w) => w[0] === "T").length, sCC = tob.filter((w) => w.includes("CC")).length;
  const sVow = tob.filter((w) => { const idx = [...w].map((c, i) => ("OA".includes(c) ? i : -1)).filter((i) => i >= 0); return idx[2] - idx[0] === 2; }).length;
  chk(sT, 1260); chk(sStartT, 180); chk(sCC, 360); chk(sVow, 180);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: "This question is about arrangements of the 7 letters of the word TOBACCO.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the number of different arrangements of the letters.", value: sT, wrong: [5040, 2520],
        explanation: t`O and C each appear twice: $\frac{7!}{2!\,2!} = \frac{5040}{4} = 1260$.` }),
      P.num({ label: "(b)", marks: 2, stem: "How many arrangements begin with T?", value: sStartT, wrong: [720, 1260],
        explanation: t`Fix T first; arrange O, B, A, C, C, O: $\frac{6!}{2!\,2!} = 180$.` }),
      P.num({ label: "(c)", marks: 3, stem: "How many arrangements have the two C's next to each other?", value: sCC, wrong: [720, 180],
        explanation: t`Treat CC as one block: items CC, T, O, B, A, O, with O repeated: $\frac{6!}{2!} = 360$.` }),
      P.num({ label: "(d)", marks: 2, stem: "How many arrangements have the two C's not next to each other?", value: sT - sCC, wrong: [1080, 360],
        explanation: t`Total minus together: $1260 - 360 = 900$.` }),
      P.num({ label: "(e)", marks: 3, stem: "How many arrangements have all three vowels (O, A, O) next to each other?", value: sVow, wrong: [360, 60],
        explanation: t`The vowel block can be ordered in $\frac{3!}{2!} = 3$ ways (OAO, OOA, AOO). The block with T, B, C, C makes 5 items with C repeated: $\frac{5!}{2!} = 60$. Total $3 \times 60 = 180$. (60 forgets to arrange the vowels inside the block.)` }),
    ],
    explanation: "Divide by the factorials of repeated letters; glue letters that must be together into a block.",
    hints: ["TOBACCO has two O's and two C's.", "For 'not together', subtract 'together' from the total."],
  });

  // Struct 5: digits with zero
  const d6 = [0, 1, 2, 3, 4, 5];
  const four = arr(d6, 4).filter((p) => p[0] !== 0);
  const fourEven = four.filter((p) => p[3] % 2 === 0).length;
  chk(four.length, 300); chk(fourEven, 156);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: "Four-digit numbers are formed from the digits 0, 1, 2, 3, 4 and 5. No digit may be used more than once, and a number cannot begin with 0.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "How many such numbers are there?", value: 300, wrong: [360, 240],
        explanation: t`First digit: 5 choices (not 0). The remaining three places are filled from the other 5 digits: ${"$"}{}^5P_3 = 60$. Total $5 \times 60 = 300$. (360 is ${"$"}{}^6P_4$, which includes numbers starting with 0.)` }),
      P.num({ label: "(b)", marks: 3, stem: "How many of these numbers are even?", value: fourEven, wrong: [180, 150],
        explanation: t`Last digit 0: the other three places from 5 digits, ${"$"}{}^5P_3 = 60$. Last digit 2 or 4: first digit has 4 choices (not 0, not the last digit), middle two ${"$"}{}^4P_2 = 12$: $2 \times 4 \times 12 = 96$. Total $60 + 96 = 156$. (180 treats all three even last digits like 0.)` }),
    ],
    explanation: "Zero cannot go first, so split the even case by whether the last digit is 0.",
    hints: ["Treat 'last digit 0' as a separate case."],
  });

  b.card("FORMULA", "n factorial", t`$n! = n(n - 1)\cdots 2 \times 1$, and $0! = 1$.`);
  b.card("FORMULA", "Permutations nPr", t`${"$"}{}^nP_r = \dfrac{n!}{(n - r)!}$: arrangements of $r$ objects from $n$ different objects.`);
  b.card("FORMULA", "Repeated objects", t`$\dfrac{n!}{p!\,q!\cdots}$ when $p$ are alike, $q$ are alike, …`);
  b.card("CONCEPT", "Items together", "Glue them into one block, arrange the block with the other items, then multiply by the arrangements inside the block.");
  b.card("CONCEPT", "Items apart", "Total minus together; or arrange the other items and place the separated ones in the gaps (gap method).");
  b.card("CONCEPT", "Restricted positions", "Fill the restricted places (first digit, ends) first; split into cases when choices depend on each other.");
  b.card("FACT", "Circular arrangements", "Not examined by Cambridge 9709; arrangements are in a line or in rows.");
  b.card("DEFINITION", "Permutation", "An arrangement in which order matters (ABC ≠ BAC).");
});
