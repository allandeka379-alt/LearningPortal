---
{
  "key": "quadratics.solving-by-factorising",
  "title": "Solving quadratic equations by factorising",
  "summary": "Rearrange a quadratic equation so that one side is zero, factorise it, and use the zero-product rule to find both solutions.",
  "concepts": ["math.algebra.quadratic-equations.factorising"],
  "objectives": ["zimsec/o-level/mathematics:7.2.3", "cambridge/igcse/mathematics:2.5.5"],
  "estimatedMinutes": 25,
  "freePreview": true,
  "level": "extended"
}
---
## Introduction

Tendai is building a rectangular chicken run behind her family's home in Murehwa. She wants it to be 3 metres longer than it is wide and to enclose exactly 40 square metres. If the width is $w$ metres, the length is $w + 3$ metres, so

$$
w(w + 3) = 40
$$

Expanding the bracket gives $w^2 + 3w = 40$. The unknown is squared, so this is a **quadratic equation**. A linear equation such as $3w = 40$ has one solution, but a quadratic equation can have two. In this lesson you will learn the quickest exact method for solving many quadratic equations: **factorising**. At the end we will come back to Tendai's chicken run.

You should already be able to expand brackets such as $(x + 2)(x - 5)$ and to factorise expressions such as $x^2 + 7x + 10$. If those feel shaky, revise them first: solving by factorising is built on them.

## Key definitions

:::definition{term="Quadratic equation"}
An equation that can be written in the form $ax^2 + bx + c = 0$, where $a$, $b$ and $c$ are numbers and $a \neq 0$. The highest power of the unknown is 2.
:::

:::definition{term="Root (solution)"}
A value of the unknown that makes the equation true. A quadratic equation has at most two real roots.
:::

:::keyfact{title="The zero-product rule"}
If the product of two numbers is zero, then at least one of them is zero:

$$
pq = 0 \implies p = 0 \text{ or } q = 0
$$

This rule only works when one side of the equation is **zero**. There is no similar rule for $pq = 6$.
:::

## The method

To solve a quadratic equation by factorising:

1. Rearrange the equation so that all the terms are on one side and the other side is $0$.
2. Factorise the quadratic expression completely.
3. Set each factor equal to zero.
4. Solve the two simple linear equations.
5. Check each answer by substituting it into the original equation.

## Worked examples

:::worked-solution[Example 1: solve $x^2 - 5x + 6 = 0$]
1. The equation already has $0$ on the right-hand side.
2. Find two numbers that multiply to $+6$ and add to $-5$: they are $-2$ and $-3$. So $x^2 - 5x + 6 = (x - 2)(x - 3)$.
3. $(x - 2)(x - 3) = 0$, so $x - 2 = 0$ or $x - 3 = 0$.
4. $x = 2$ or $x = 3$.
5. Check $x = 2$: $4 - 10 + 6 = 0$. Check $x = 3$: $9 - 15 + 6 = 0$. Both are correct.
:::

![Graph of y = x² − 5x + 6 = (x − 2)(x − 3): the curve crosses the x-axis at x = 2 and x = 3, which are the solutions of x² − 5x + 6 = 0, and meets the y-axis at (0, 6).](media:diagrams/quadratic-roots-factorised-graph.png "Figure: the solutions of x² − 5x + 6 = 0 are where the curve crosses the x-axis")

:::worked-solution[Example 2: solve $x^2 + 4x = 21$]
1. Subtract 21 from both sides: $x^2 + 4x - 21 = 0$.
2. Two numbers that multiply to $-21$ and add to $+4$ are $+7$ and $-3$, so $(x + 7)(x - 3) = 0$.
3. $x + 7 = 0$ or $x - 3 = 0$.
4. $x = -7$ or $x = 3$.
5. Check $x = -7$: $49 - 28 = 21$. Check $x = 3$: $9 + 12 = 21$.
:::

When the coefficient of $x^2$ is not 1, look for two brackets whose first terms multiply to give $ax^2$.

:::worked-solution[Example 3: solve $2x^2 - 7x + 3 = 0$]
1. The right-hand side is already $0$.
2. Try $(2x - 1)(x - 3)$. Expanding: $2x^2 - 6x - x + 3 = 2x^2 - 7x + 3$. This is correct.
3. $2x - 1 = 0$ or $x - 3 = 0$.
4. $x = \frac{1}{2}$ or $x = 3$.
5. Check $x = \frac{1}{2}$: $2 \times \frac{1}{4} - \frac{7}{2} + 3 = \frac{1}{2} - \frac{7}{2} + 3 = 0$.
:::

Two special cases appear in almost every examination.

:::example{title="No constant term: take out the common factor"}
Solve $x^2 = 6x$.

Rearrange: $x^2 - 6x = 0$. Factorise: $x(x - 6) = 0$. So $x = 0$ or $x = 6$.

Never divide both sides by $x$: that throws away the solution $x = 0$.
:::

:::example{title="Difference of two squares"}
Solve $x^2 - 49 = 0$.

Since $x^2 - 49 = (x - 7)(x + 7)$, we get $x = 7$ or $x = -7$, which is often written $x = \pm 7$.
:::

Now we can return to the chicken run.

:::worked-solution[Example 4: Tendai's chicken run]
1. From $w(w + 3) = 40$: $w^2 + 3w - 40 = 0$.
2. Two numbers that multiply to $-40$ and add to $+3$ are $+8$ and $-5$, so $(w + 8)(w - 5) = 0$.
3. $w = -8$ or $w = 5$.
4. A width cannot be negative, so reject $w = -8$. The width is 5 m and the length is $5 + 3 = 8$ m.
5. Check: $5 \times 8 = 40$ square metres.
:::

## Common mistakes

:::mistake{title="Using the zero-product rule when the right-hand side is not zero"}
Given $(x - 3)(x + 2) = 6$, some students write $x - 3 = 6$ or $x + 2 = 6$. That is wrong: $x = 9$ gives $6 \times 11 = 66$. First expand and rearrange: $x^2 - x - 6 = 6$, so $x^2 - x - 12 = 0$, which gives $(x - 4)(x + 3) = 0$ and $x = 4$ or $x = -3$.
:::

:::mistake{title="Sign errors in the brackets"}
$x^2 - x - 12$ factorises to $(x - 4)(x + 3)$, not $(x + 4)(x - 3)$. The numbers must **add** to the coefficient of $x$, which is $-1$. Expand your brackets to check before you solve.
:::

:::mistake{title="Dividing by the unknown"}
Dividing $x^2 = 6x$ by $x$ gives only $x = 6$ and loses $x = 0$. Always rearrange to $0$ and factorise instead.
:::

:::mistake{title="Keeping impossible answers"}
In a problem about lengths, areas, ages or numbers of people, a negative solution usually has no meaning. Say clearly which solution you reject and why.
:::

## Exam tips

:::exam-tip
Write the factorised equation, for example $(x + 7)(x - 3) = 0$, before the answers. Examiners usually give a method mark for correct factors even if a later step goes wrong.
:::

:::exam-tip
If a question says "**hence** solve", use the factorisation from the previous part; a different method may not earn the marks.
:::

:::exam-tip
Give both solutions as a pair, for example "$x = -7$ or $x = 3$". If the question has a context, finish with a sentence that answers it, such as "The run is 5 m wide and 8 m long."
:::

## Summary

:::summary
- A quadratic equation can be written as $ax^2 + bx + c = 0$ and has at most two real solutions.
- Rearrange so that one side is $0$, factorise, then set each factor equal to zero.
- Take out a common factor when there is no constant term, and never divide by the unknown.
- Use $a^2 - b^2 = (a - b)(a + b)$ for a difference of two squares.
- Check your answers by substitution and reject solutions that are impossible in the context.
:::
