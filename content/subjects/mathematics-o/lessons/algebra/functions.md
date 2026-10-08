---
{
  "key": "algebra.functions",
  "title": "Function notation",
  "summary": "Use function notation f(x), evaluate functions for numbers and expressions, solve f(x) = k, draw mapping diagrams, and understand the domain and range of a function.",
  "concepts": ["math.algebra.functions"],
  "objectives": ["zimsec/o-level/mathematics:5.1.1", "cambridge/igcse/mathematics:2.13.1"],
  "estimatedMinutes": 30,
  "level": "extended"
}
---
## Introduction

A mobile network charges a fixed daily fee of 5 cents plus 2 cents for each megabyte used. Whatever the number of megabytes $x$, the cost in cents is found by the same rule: multiply by 2, then add 5. A rule like this, which turns every input into exactly one output, is called a **function**, and we can write it as

$$
f(x) = 2x + 5
$$

Function notation is a compact way of naming rules and asking questions about them: $f(15)$ is the cost for 15 MB, and solving $f(x) = 45$ tells you how many megabytes cost 45 cents. In this lesson you will use the notation, work with domains and ranges, and draw mapping diagrams. Function notation is in the ZIMSEC syllabus (with functional graphs) and is Cambridge Extended content.

You should be confident with substitution and solving linear equations.

## Key definitions

:::definition{term="Function"}
A rule that maps each input to exactly one output. $f(x) = 2x + 5$ is read “$f$ of $x$ equals $2x + 5$”.
:::

:::definition{term="Domain and range"}
The **domain** is the set of inputs the function is allowed to take. The **range** is the set of outputs it produces from that domain.
:::

:::keyfact{title="Reading f(a) = b"}
In $f(3) = 11$, the input is 3 and the output is 11. The function $f$ maps 3 to 11, written $3 \to 11$.
:::

## Evaluating functions

To find $f(a)$, replace every $x$ in the rule by $a$. Use brackets for negative numbers and fractions.

:::worked-solution[Example 1: $f(x) = x^2 - 7$; find $f(-2)$ and $f\left(\frac{1}{2}\right)$]
1. $f(-2) = (-2)^2 - 7 = 4 - 7 = -3$.
2. $f\left(\frac{1}{2}\right) = \left(\frac{1}{2}\right)^2 - 7 = \frac{1}{4} - 7 = -6\frac{3}{4}$.
:::

The input can be an expression. Replace $x$ by the **whole** expression, in brackets.

:::worked-solution[Example 2: $f(x) = x^2 - 3$; find $f(x + 1)$ and $f(3a)$]
1. $f(x + 1) = (x + 1)^2 - 3 = x^2 + 2x + 1 - 3 = x^2 + 2x - 2$.
2. $f(3a) = (3a)^2 - 3 = 9a^2 - 3$.
3. Note that $f(x + 1)$ is not $f(x) + 1 = x^2 - 2$.
:::

## Solving f(x) = k

To find the input that gives a particular output, set the rule equal to the output and solve.

:::worked-solution[Example 3: $f(x) = \dfrac{3x - 2}{4}$; solve $f(x) = 4$]
1. $\dfrac{3x - 2}{4} = 4$.
2. Multiply by 4: $3x - 2 = 16$.
3. $3x = 18$, so $x = 6$. Check: $f(6) = \frac{16}{4} = 4$. ✓
:::

## Functions in context and unknown constants

Function notation is a compact way to answer practical questions. For the data charge $f(x) = 2x + 5$ cents:

- the cost of 15 MB is $f(15) = 2(15) + 5 = 35$ cents;
- solving $f(x) = 45$ gives $2x + 5 = 45$, so $x = 20$: 45 cents buys 20 MB.

Sometimes the rule contains unknown constants, and you are given some inputs and outputs. Each fact gives an equation.

:::worked-solution[Example 4: $f(x) = ax + b$, with $f(1) = 5$ and $f(3) = 11$; find $a$ and $b$]
1. $f(1) = 5$ gives $a + b = 5$.
2. $f(3) = 11$ gives $3a + b = 11$.
3. Subtract: $2a = 6$, so $a = 3$, and then $b = 2$.
4. So $f(x) = 3x + 2$. Check: $f(1) = 5$ and $f(3) = 11$. ✓
:::

## Mapping diagrams, domain and range

A mapping diagram lists the domain on the left and the range on the right, with an arrow from each input to its output.

:::worked-solution[Example 5: $f(x) = x^2 + 1$ with domain $\{-2, -1, 0, 1, 2\}$]
1. Outputs: $-2 \to 5$, $-1 \to 2$, $0 \to 1$, $1 \to 2$, $2 \to 5$.
2. The range is $\{1, 2, 5\}$.
3. Two different inputs can share an output (this is a many-to-one mapping), but each input has only one output.
:::

When no domain is given, take all real numbers that the rule allows, and leave out any value that would mean:

- dividing by zero: $f(x) = \frac{3}{x + 1}$ cannot take $x = -1$;
- the square root of a negative number: $f(x) = \sqrt{x + 3}$ needs $x \geq -3$.

The range depends on the rule too: for $f(x) = x^2 + 1$ over all real numbers, $x^2$ is never negative, so the outputs are never below 1 and the range is $f(x) \geq 1$.

## Common mistakes

:::mistake{title="Confusing input and output"}
“Solve $g(x) = 1$” gives the **output** 1; you must find the input. Working out $g(1)$ instead is a common slip.
:::

:::mistake{title="Forgetting brackets"}
For $f(x) = x^2$, $f(-5) = (-5)^2 = 25$, not $-25$. For $f(x) = x^2 - 3$, $f(x + 1) = (x + 1)^2 - 3$, not $x^2 + 1^2 - 3$.
:::

:::mistake{title="Treating f like a number"}
$f(3a)$ is not $3f(a)$, and $f(2) + f(4)$ is not $f(6)$. Evaluate each one from the rule.
:::

## Exam tips

:::exam-tip
Show the substitution, such as $f(-2) = (-2)^2 - 7$, before the answer. It earns the method mark and makes sign errors easy to spot.
:::

:::exam-tip
When asked for a range, check the smallest and largest outputs, and remember that a square is never negative.
:::

:::exam-tip
For “find $f(x + 1)$”, simplify your answer fully: expand the brackets and collect like terms.
:::

## Summary

:::summary
- A function maps each input to exactly one output; $f(a)$ is the output for input $a$.
- Replace $x$ by the input in brackets, whether it is a number or an expression.
- To solve $f(x) = k$, set the rule equal to $k$ and solve.
- The domain is the set of inputs; the range is the set of outputs.
- Exclude inputs that make a denominator zero or a square root negative.
:::
