---
{
  "key": "counting.permutations",
  "title": "Permutations: arrangements in a line",
  "summary": "Use n! and nPr to count arrangements in a line, including arrangements with repeated items, items that must be together or apart, items fixed at the ends, numbers formed from digits, and people in two rows.",
  "concepts": ["amaths.counting.permutations"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

How many different ways can seven learners line up outside the tuck shop? How many number plates can be made from a set of letters and digits? Counting every possibility one by one quickly becomes impossible, so we use the counting principle and the notations $n!$ and ${}^nP_r$.

This lesson covers ZIMSEC Statistics (Form 5, permutations and combinations) and Cambridge 9709 Paper 5 (topic 5.2). Both boards examine arrangements in a line, with repeated items and with restrictions. Arrangements in a circle are not examined by Cambridge. Permutations are also the basis of many probability questions (next topics).

## Key definitions

:::definition{term="The counting principle"}
If one choice can be made in $m$ ways and, after it, a second choice in $n$ ways, the two choices together can be made in $m \times n$ ways.
:::

:::definition{term="Permutation"}
An arrangement of objects in which **order matters**: ABC and BCA are different permutations.
:::

:::formula{name="Factorials and permutations (not in MF19)"}
$$
n! = n(n - 1)(n - 2) \cdots 3 \times 2 \times 1, \qquad 0! = 1
$$

$$
{}^nP_r = \frac{n!}{(n - r)!}
$$
${}^nP_r$ is the number of ways of arranging $r$ objects chosen from $n$ different objects.
:::

:::formula{name="Arrangements with repeated objects"}
$n$ objects, of which $p$ are alike of one kind, $q$ alike of another, and so on, can be arranged in

$$
\frac{n!}{p!\,q!\,\cdots}
$$
ways.
:::

## Arranging all or some of the objects

The first place can be filled in $n$ ways, the second in $n - 1$ ways, and so on.

:::worked-solution[Example 1: books on a shelf and medals in a race]
1. Seven different books can be arranged on a shelf in $7! = 5040$ ways.
2. Eight runners compete for gold, silver and bronze. Gold can go to any of 8, silver to any of the remaining 7, bronze to any of 6: ${}^8P_3 = 8 \times 7 \times 6 = 336$ ways.
:::

## Repeated objects

When some objects are identical, swapping them does not give a new arrangement, so divide by the number of ways of arranging each group of identical objects.

:::worked-solution[Example 2: arrangements of the letters of CHINHOYI]
1. There are 8 letters: C, H, I, N, H, O, Y, I. H appears twice and I appears twice.
2. Number of arrangements $= \dfrac{8!}{2!\,2!} = \dfrac{40\,320}{4} = 10\,080$.
3. If the two H's must be next to each other, treat "HH" as one block. There are now 7 items (HH, C, I, N, O, Y, I), with I repeated: $\dfrac{7!}{2!} = 2520$.
:::

## Together and apart

- **Together**: glue the items into a block, arrange the block with the other items, then multiply by the number of ways of arranging inside the block.
- **Apart**: subtract "together" from the total. With several items that must all be separated, arrange the others first and place the separated items in the gaps.

:::worked-solution[Example 3: six people in a row, two of whom are Farai and Chipo]
1. Total arrangements: $6! = 720$.
2. Together: the block (Farai, Chipo) and 4 others make 5 items: $5! = 120$; inside the block, $2! = 2$. So $120 \times 2 = 240$.
3. Apart: $720 - 240 = 480$.
:::

The gap method: to arrange 4 boys and 3 girls in a row with no two girls next to each other, arrange the boys ($4!$ ways), which makes 5 gaps (including the ends), then put the 3 girls into 3 of these gaps in order: ${}^5P_3$ ways. Total $4! \times {}^5P_3 = 24 \times 60 = 1440$.

## Restrictions on positions

Fill the **restricted** positions first.

:::worked-solution[Example 4: four-digit numbers from the digits 1, 2, 3, 4, 5, 6, 7, no digit repeated]
1. Numbers greater than 5000: the first digit must be 5, 6 or 7 (3 ways); the other three places are filled from the remaining 6 digits in ${}^6P_3 = 120$ ways. Total $3 \times 120 = 360$.
2. Odd numbers greater than 5000: split by the first digit. If it is 5 or 7 (2 ways), the last digit is one of the 3 remaining odd digits, and the middle two are filled from 5 digits in ${}^5P_2 = 20$ ways: $2 \times 3 \times 20 = 120$.
3. If the first digit is 6, the last digit is any of the 4 odd digits: $1 \times 4 \times 20 = 80$.
4. Total odd numbers greater than 5000: $120 + 80 = 200$.
:::

Splitting into cases, as in steps 2 and 3, is needed whenever one restriction affects how many choices another has.

## People in two rows

Treat the seats as a line of positions: what matters is which person sits in which seat.

:::worked-solution[Example 5: 8 people sit in a front row of 3 seats and a back row of 5 seats; Tendai must sit in the front row]
1. Tendai chooses one of the 3 front seats: 3 ways.
2. The other 7 people fill the remaining 7 seats: $7! = 5040$ ways.
3. Total: $3 \times 5040 = 15\,120$ arrangements.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine $n!$, ${}^nP_r$ and arrangements in a line with repetition and restrictions (ZIMSEC 6.2, Cambridge 5.2). Cambridge states that questions on arrangements in a circle will not be set. Your calculator's $n!$ and nPr keys are allowed, but show the expression you evaluate.
:::

## Common mistakes

:::mistake{title="Forgetting to arrange inside a block"}
Two people glued together can stand as AB or BA: multiply by $2!$.
:::

:::mistake{title="Not dividing for repeated letters"}
The two H's of CHINHOYI are identical; swapping them gives the same word, so divide by $2!$ for each repeated pair.
:::

:::mistake{title="Filling unrestricted places first"}
Fill the first digit (or the end seats) first when they carry a condition; otherwise the number of choices left for them depends on earlier choices.
:::

:::mistake{title="Double counting overlapping cases"}
When splitting into cases, make sure the cases do not overlap and together cover everything.
:::

## Exam tips

:::exam-tip
Write the calculation as an expression ($\frac{8!}{2!\,2!}$, $3 \times {}^6P_3$) before the number, so method marks are available.
:::

:::exam-tip
Check "apart" answers by working "together" and subtracting from the total; the two methods should agree.
:::

:::exam-tip
Very large answers are normal: $10! = 3\,628\,800$. Give exact integers, not standard form, unless told otherwise.
:::

## Summary

:::summary
- Counting principle: multiply the numbers of choices at each stage.
- $n!$ arranges $n$ different objects; ${}^nP_r = \frac{n!}{(n - r)!}$ arranges $r$ of them.
- Repeated objects: divide by $p!\,q!\cdots$ for each group of identical objects.
- Together: glue into a block and multiply by the arrangements inside it. Apart: total minus together, or the gap method.
- Fill restricted positions first, and split into cases when one restriction depends on another.
:::
