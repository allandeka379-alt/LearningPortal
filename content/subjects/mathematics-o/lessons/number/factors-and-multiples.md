---
{
  "key": "number.factors-and-multiples",
  "title": "Factors, multiples, HCF and LCM",
  "summary": "Write a number as a product of prime factors in index form, find the highest common factor and lowest common multiple, and use them to solve problems.",
  "concepts": ["math.number.factors-and-multiples"],
  "objectives": ["zimsec/o-level/mathematics:1.1.2", "cambridge/igcse/mathematics:1.1.2"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

At Mbare Musika, kombis on one route leave every 12 minutes and kombis on another route leave every 18 minutes. One of each leaves at 06:00. When do kombis on the two routes next leave at the same time? A builder in Gweru wants to cover a floor with the largest square tiles that fit exactly. A shopkeeper wants to pack 60 oranges and 75 bananas into identical bags. All three problems are solved with the same two tools: the **highest common factor** (HCF) and the **lowest common multiple** (LCM).

You should already know your multiplication tables and what a prime number is (a number with exactly two factors).

## Key definitions

:::definition{term="Factor"}
A whole number that divides exactly into another whole number. The factors of $12$ are $1, 2, 3, 4, 6$ and $12$.
:::

:::definition{term="Multiple"}
The result of multiplying a number by a whole number. The multiples of $12$ are $12, 24, 36, 48, \ldots$
:::

:::definition{term="Prime factor"}
A factor that is a prime number. The prime factors of $12$ are $2$ and $3$.
:::

:::definition{term="Highest common factor (HCF)"}
The largest number that is a factor of each of the given numbers.
:::

:::definition{term="Lowest common multiple (LCM)"}
The smallest number that is a multiple of each of the given numbers.
:::

## Prime factorisation

Every whole number greater than 1 can be written as a product of primes in exactly one way (apart from the order). Find it with a factor tree or by repeated division by primes, starting with the smallest.

:::worked-solution[Example 1: write $360$ as a product of prime factors in index form]
1. $360 \div 2 = 180$
2. $180 \div 2 = 90$
3. $90 \div 2 = 45$
4. $45 \div 3 = 15$
5. $15 \div 3 = 5$, and $5$ is prime.
6. So $360 = 2 \times 2 \times 2 \times 3 \times 3 \times 5 = 2^3 \times 3^2 \times 5$.
7. Check: $8 \times 9 \times 5 = 360$.
:::

Index form means repeated primes are written as powers: $2 \times 2 \times 2 = 2^3$.

## HCF and LCM from prime factors

:::keyfact{title="The prime-factor method"}
- **HCF**: multiply the primes that are common to all the numbers, each to the **lowest** power that appears.
- **LCM**: multiply every prime that appears in any of the numbers, each to the **highest** power that appears.
:::

:::worked-solution[Example 2: find the HCF and LCM of $84$ and $120$]
1. $84 = 2^2 \times 3 \times 7$ and $120 = 2^3 \times 3 \times 5$.
2. Common primes: $2$ (lowest power $2^2$) and $3$ (power $3^1$).
3. HCF $= 2^2 \times 3 = 12$.
4. All primes: $2, 3, 5, 7$, with highest powers $2^3$, $3$, $5$, $7$.
5. LCM $= 2^3 \times 3 \times 5 \times 7 = 840$.
6. Check: HCF $\times$ LCM $= 12 \times 840 = 10\,080$ and $84 \times 120 = 10\,080$. For two numbers these products are always equal.
:::

You can also show the prime factors in a Venn diagram. For 84 and 120, the overlap holds the shared factors $2, 2, 3$; the "84 only" region holds $7$; the "120 only" region holds $2$ and $5$. The HCF is the product of the overlap, $2 \times 2 \times 3 = 12$, and the LCM is the product of everything in the diagram, $7 \times 2 \times 2 \times 3 \times 2 \times 5 = 840$.

For small numbers, listing works well too: multiples of 8 are $8, 16, 24, \ldots$ and multiples of 12 are $12, 24, \ldots$, so LCM$(8, 12) = 24$.

## Solving problems

Ask yourself: is the answer **smaller** than the numbers given (sharing or cutting into equal pieces: HCF) or **larger** (waiting until events repeat together: LCM)?

:::worked-solution[Example 3: the kombis at Mbare Musika]
1. Kombis leave together again after a whole number of 12-minute intervals **and** a whole number of 18-minute intervals: this is a common multiple.
2. $12 = 2^2 \times 3$ and $18 = 2 \times 3^2$, so LCM $= 2^2 \times 3^2 = 36$.
3. They next leave together 36 minutes after 06:00, at **06:36**.
:::

:::worked-solution[Example 4: tiling a floor in Gweru]
A floor is 4.2 m long and 3.0 m wide. It is to be covered with identical square tiles without cutting any. Find the largest possible tile and the number of tiles needed.
1. Work in centimetres: $420$ cm by $300$ cm.
2. The tile side must divide both lengths exactly: it is a common factor. The largest is the HCF.
3. $420 = 2^2 \times 3 \times 5 \times 7$ and $300 = 2^2 \times 3 \times 5^2$, so HCF $= 2^2 \times 3 \times 5 = 60$.
4. The largest tile is $60$ cm by $60$ cm.
5. Number of tiles: $\frac{420}{60} \times \frac{300}{60} = 7 \times 5 = 35$.
:::

## Common mistakes

:::mistake{title="Mixing up HCF and LCM"}
The HCF of two numbers can never be bigger than the smaller number; the LCM can never be smaller than the larger number. Use this to check your answer.
:::

:::mistake{title="Including 1 in a prime factorisation"}
1 is not prime, so it never appears in a product of prime factors. $30 = 2 \times 3 \times 5$, not $1 \times 2 \times 3 \times 5$.
:::

:::mistake{title="Stopping before every factor is prime"}
$48 = 6 \times 8$ is a factorisation but not a **prime** factorisation. Keep going: $48 = 2^4 \times 3$.
:::

:::mistake{title="Multiplying the numbers to get the LCM"}
$8 \times 12 = 96$ is a common multiple of 8 and 12, but not the lowest: the LCM is 24. The product is the LCM only when the numbers have no common factor other than 1.
:::

## Exam tips

:::exam-tip
"Write as a product of prime factors" usually wants **index form**. Write the final line clearly, for example $2^3 \times 3^2$, not just a factor tree.
:::

:::exam-tip
For HCF and LCM questions worth 2 marks, a correct prime factorisation usually earns a method mark even if the final answer slips. Show it.
:::

:::exam-tip
In a context question, finish with the answer to the actual question: a time ("06:36"), a number of bags or tiles, or a length with its unit.
:::

## Summary

:::summary
- Every whole number greater than 1 has one prime factorisation, written in index form such as $360 = 2^3 \times 3^2 \times 5$.
- HCF: common primes to their lowest powers. LCM: all primes to their highest powers.
- For two numbers, HCF $\times$ LCM $=$ the product of the numbers.
- Sharing into equal groups or the largest equal pieces uses the HCF; events repeating together use the LCM.
- Check: the HCF is no bigger than the smallest number and the LCM no smaller than the largest.
:::
