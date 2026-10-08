---
{
  "key": "algebra.linear-equations",
  "title": "Linear equations",
  "summary": "Solve linear equations with brackets, unknowns on both sides and fractions (including Cambridge Extended algebraic denominators), and form equations from practical situations.",
  "concepts": ["math.algebra.linear-equations"],
  "objectives": ["zimsec/o-level/mathematics:7.2.1", "zimsec/o-level/mathematics:7.2.5", "cambridge/igcse/mathematics:2.5.1", "cambridge/igcse/mathematics:2.5.2", "cambridge/igcse/mathematics:2.5.8"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Tendai, Rudo and Farai share US\$95 from selling vegetables at Mbare market. Rudo gets US\$11 more than Tendai, and Farai gets twice as much as Tendai. How much does each receive? If Tendai’s share is $x$ dollars, the information becomes one short statement:

$$
x + (x + 11) + 2x = 95
$$

This is a **linear equation**: the unknown appears only to the first power. Solving it answers the question. In this lesson you will solve linear equations of increasing difficulty and learn to turn word problems into equations.

You should be confident with expanding brackets, collecting like terms and working with negative numbers.

## Key definitions

:::definition{term="Equation"}
A statement that two expressions are equal, such as $2x + 9 = 23$. To **solve** it means to find the value of the unknown that makes it true.
:::

:::definition{term="Linear equation"}
An equation in which the unknown appears only to the power 1, with no $x^2$, $\frac{1}{x}$ or $\sqrt{x}$ terms once it has been simplified.
:::

:::keyfact{title="The balance principle"}
An equation is like a balanced scale: whatever you do to one side you must do to the other side. Add, subtract, multiply or divide both sides (never by zero) until the unknown is on its own.
:::

## Building up the method

1. Clear any fractions by multiplying every term by the LCM of the denominators.
2. Expand any brackets.
3. Collect the unknown terms on one side and the numbers on the other.
4. Divide by the coefficient of the unknown.
5. Check by substituting into the original equation.

:::worked-solution[Example 1: solve $5(x - 2) = 3(x + 4)$]
1. Expand: $5x - 10 = 3x + 12$.
2. Subtract $3x$ from both sides: $2x - 10 = 12$.
3. Add 10: $2x = 22$.
4. Divide by 2: $x = 11$.
5. Check: $5(9) = 45$ and $3(15) = 45$. ✓
:::

When the unknown is on both sides, collect it on the side with more of it, so its coefficient stays positive. If you do end up with a negative coefficient, divide by it, sign included: from $9 - 4x = 21$, subtract 9 to get $-4x = 12$, then divide by $-4$: $x = -3$.

## Equations with fractions

Multiply **every** term by the LCM of the denominators, and keep each numerator in a bracket.

:::worked-solution[Example 2: solve $\dfrac{x + 3}{4} - \dfrac{x - 1}{3} = 1$]
1. The LCM of 4 and 3 is 12. Multiply every term by 12: $3(x + 3) - 4(x - 1) = 12$.
2. Expand: $3x + 9 - 4x + 4 = 12$.
3. Simplify: $13 - x = 12$.
4. So $x = 1$. Check: $\frac{4}{4} - \frac{0}{3} = 1$. ✓
:::

### Algebraic denominators (Cambridge Extended)

When the unknown is in a denominator, multiply both sides by every denominator. For two single fractions this is “cross-multiplying”.

:::worked-solution[Example 3: solve $\dfrac{4}{x - 3} = \dfrac{7}{x + 3}$]
1. Multiply both sides by $(x - 3)(x + 3)$: $4(x + 3) = 7(x - 3)$.
2. Expand: $4x + 12 = 7x - 21$.
3. $33 = 3x$, so $x = 11$.
4. Check: $\frac{4}{8} = \frac{1}{2}$ and $\frac{7}{14} = \frac{1}{2}$. ✓
:::

## Forming equations from words

1. Choose a letter for one unknown quantity and say what it stands for, with units.
2. Write every other quantity in terms of that letter.
3. Use the fact in the question (a total, a perimeter, an angle sum, a time) to write an equation.
4. Solve, and answer the question in words.

:::worked-solution[Example 4: sharing US\$95]
1. Let Tendai’s share be $x$ dollars. Then Rudo has $x + 11$ and Farai has $2x$.
2. Total: $x + x + 11 + 2x = 95$, so $4x + 11 = 95$.
3. $4x = 84$, so $x = 21$.
4. Tendai gets US\$21, Rudo US\$32 and Farai US\$42. Check: $21 + 32 + 42 = 95$. ✓
:::

:::worked-solution[Example 5: a journey]
Nyasha drives to a farm at 90 km/h and back along the same road at 60 km/h. The driving takes 5 hours in total. How far away is the farm?

1. Let the distance be $x$ km. Time = distance ÷ speed, so the times are $\frac{x}{90}$ h and $\frac{x}{60}$ h.
2. Equation: $\frac{x}{90} + \frac{x}{60} = 5$.
3. Multiply by 180: $2x + 3x = 900$, so $5x = 900$ and $x = 180$.
4. The farm is 180 km away. (Check: 2 h there and 3 h back.)
:::

## Common mistakes

:::mistake{title="Not multiplying every term"}
Multiplying $\frac{x}{5} + 2 = 6$ by 5 gives $x + 10 = 30$, not $x + 2 = 30$. Every term on both sides is multiplied, so $x = 20$.
:::

:::mistake{title="Sign errors after a minus sign"}
$-4(x - 1) = -4x + 4$. In Example 2, writing $-4x - 4$ gives $5 - x = 12$ and the wrong answer $x = -7$.
:::

:::mistake{title="Dividing by a negative number"}
$-3x = 12$ gives $x = -4$, not $x = 4$. Keep the sign when you divide.
:::

:::mistake{title="Cross-multiplying the wrong way"}
For $\frac{4}{x - 3} = \frac{7}{x + 3}$, each numerator multiplies the **other** denominator: $4(x + 3) = 7(x - 3)$.
:::

## Exam tips

:::exam-tip
In a **form an equation** question, write the equation clearly before solving it. The equation usually earns a mark on its own, even if you then make an arithmetic slip.
:::

:::exam-tip
Finish word problems with a sentence and units, such as “The farm is 180 km away.” Check that the answer is sensible: a negative length or a fraction of a person means something has gone wrong.
:::

:::exam-tip
Substitute your answer into the **original** equation. It takes half a minute and catches most sign errors.
:::

## Summary

:::summary
- Use the balance principle: do the same to both sides.
- Clear fractions first, then expand brackets, collect terms and divide.
- With algebraic denominators, multiply by every denominator (cross-multiply for two fractions).
- To form an equation, define the unknown, express everything in terms of it and use the given fact.
- Always check in the original equation and answer in context.
:::
