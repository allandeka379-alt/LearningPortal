---
{
  "key": "algebra.changing-the-subject",
  "title": "Changing the subject of a formula",
  "summary": "Rearrange formulas by undoing operations in reverse order, including formulas with brackets and fractions, squares and square roots, and (Cambridge Extended) formulas in which the new subject appears twice.",
  "concepts": ["math.algebra.changing-the-subject"],
  "objectives": ["zimsec/o-level/mathematics:7.1.5", "cambridge/igcse/mathematics:2.5.7"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

The cost of hiring a tent for a family gathering in Bulawayo is $C = 30 + 12d$ dollars for $d$ days. The formula is perfect for working out a cost, but a family with US\$90 to spend wants the number of days. Rearranging the formula to $d = \frac{C - 30}{12}$ answers that question directly: they can hire it for 5 days. This is called **changing the subject**.

Scientists, engineers and accountants rearrange formulas all the time, and examiners test it on almost every paper. The skill is the same as solving an equation, except that the answer is a formula instead of a number.

Cambridge Core formulas have the new subject appearing once, not as a power or a root. ZIMSEC and Cambridge Extended also include squares, square roots and subjects that appear twice.

## Key definitions

:::definition{term="Subject of a formula"}
The single letter on its own on one side of the equals sign. In $v = u + at$ the subject is $v$.
:::

:::definition{term="Inverse operation"}
The operation that undoes another: add and subtract, multiply and divide, square and square root.
:::

:::keyfact{title="Undo in reverse order"}
Write down what happens to the new subject, in order. Then undo those operations one at a time in the **reverse** order, doing the same to both sides each time.
:::

## Subject appearing once

:::worked-solution[Example 1: make $a$ the subject of $v = u + at$]
1. What happens to $a$: multiply by $t$, then add $u$.
2. Undo “add $u$”: $v - u = at$.
3. Undo “multiply by $t$”: $a = \dfrac{v - u}{t}$.
:::

The order matters. Compare these two formulas:

| Formula | Operations on $x$ | Rearranged |
| --- | --- | --- |
| $y = 5x + 2$ | $\times 5$, then $+ 2$ | $x = \dfrac{y - 2}{5}$ |
| $y = 5(x + 2)$ | $+ 2$, then $\times 5$ | $x = \dfrac{y}{5} - 2$ |

:::worked-solution[Example 2: make $r$ the subject of $A = P(1 + rt)$]
1. Divide both sides by $P$: $\dfrac{A}{P} = 1 + rt$.
2. Subtract 1: $\dfrac{A}{P} - 1 = rt$.
3. Divide by $t$: $r = \dfrac{\frac{A}{P} - 1}{t}$, which simplifies to $r = \dfrac{A - P}{Pt}$.
4. Check: $P = 200$, $r = 0.05$, $t = 3$ give $A = 230$, and $\frac{230 - 200}{200 \times 3} = 0.05$. ✓
:::

## When the subject is in a denominator

If the new subject is on the bottom of a fraction, multiply both sides by it to bring it to the top, then carry on as usual.

:::worked-solution[Example 3: make $r$ the subject of $p = \dfrac{q}{r} + s$]
1. Subtract $s$ from both sides: $p - s = \dfrac{q}{r}$.
2. Multiply both sides by $r$: $r(p - s) = q$.
3. Divide by $(p - s)$: $r = \dfrac{q}{p - s}$.
4. Check with numbers: $q = 12$, $r = 3$, $s = 1$ give $p = 5$, and $\frac{12}{5 - 1} = 3$. ✓
:::

With reciprocals, combine the fractions first. For two resistors in parallel, $\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2}$ (Cambridge Extended). To make $R_2$ the subject, subtract $\frac{1}{R_1}$: $\frac{1}{R_2} = \frac{1}{R} - \frac{1}{R_1} = \frac{R_1 - R}{RR_1}$, then turn both sides upside down: $R_2 = \frac{RR_1}{R_1 - R}$. Reciprocals cannot be removed term by term: $R_2 = R - R_1$ is wrong.

## Squares and square roots (ZIMSEC, Cambridge Extended)

If the subject is squared, get the square on its own and then take the square root. If the subject is inside a square root, get the root on its own and then square both sides.

:::worked-solution[Example 4: make $r$ the subject of $A = 4\pi r^2$]
1. Divide by $4\pi$: $r^2 = \dfrac{A}{4\pi}$.
2. Square root: $r = \sqrt{\dfrac{A}{4\pi}}$ (a radius is positive).
:::

:::worked-solution[Example 5: make $g$ the subject of $T = 2\pi\sqrt{\dfrac{l}{g}}$]
1. Divide by $2\pi$: $\dfrac{T}{2\pi} = \sqrt{\dfrac{l}{g}}$.
2. Square both sides: $\dfrac{T^2}{4\pi^2} = \dfrac{l}{g}$.
3. Multiply by $g$: $\dfrac{gT^2}{4\pi^2} = l$.
4. Multiply by $4\pi^2$ and divide by $T^2$: $g = \dfrac{4\pi^2 l}{T^2}$.
:::

## Subject appearing twice (Cambridge Extended)

Collect every term containing the subject on one side, factorise the subject out, then divide by the bracket.

:::worked-solution[Example 6: make $x$ the subject of $y = \dfrac{2x - 1}{x + 4}$]
1. Multiply both sides by $(x + 4)$: $y(x + 4) = 2x - 1$.
2. Expand: $xy + 4y = 2x - 1$.
3. Collect the $x$ terms on the left: $xy - 2x = -1 - 4y$.
4. Factorise: $x(y - 2) = -(4y + 1)$.
5. Divide: $x = \dfrac{-(4y + 1)}{y - 2}$, which is neater as $x = \dfrac{4y + 1}{2 - y}$.
:::

## Common mistakes

:::mistake{title="Dividing only one term"}
From $v - u = at$, the answer is $a = \frac{v - u}{t}$, not $a = v - \frac{u}{t}$. Dividing a side by $t$ divides **all** of it.
:::

:::mistake{title="Undoing in the wrong order"}
For $y = 5(x + 2)$, subtracting 2 first gives $x = \frac{y - 2}{5}$, which is wrong. Divide by 5 first, then subtract 2.
:::

:::mistake{title="Taking a root term by term"}
From $x^2 = a^2 - b^2$, $x = \sqrt{a^2 - b^2}$. It is **not** $a - b$, because $\sqrt{a^2 - b^2} \neq a - b$ (try $a = 5$, $b = 4$).
:::

:::mistake{title="Leaving the subject on both sides"}
$x = \frac{3y + 2 + x}{y}$ is not an answer: the subject must appear only once, on its own. Collect the terms and factorise.
:::

## Exam tips

:::exam-tip
Write one step per line. Each line should be the previous one with a single operation done to both sides; examiners give method marks for correct steps.
:::

:::exam-tip
Check your rearrangement with numbers. In $v = u + at$, take $u = 2$, $a = 3$, $t = 4$, so $v = 14$. Your formula should give $a = \frac{14 - 2}{4} = 3$.
:::

:::exam-tip
If the question then says “find $d$ when $C = 90$”, use your rearranged formula, and show the substitution.
:::

## Summary

:::summary
- The subject is the letter on its own; to change it, undo operations in reverse order.
- Do the same to both sides, and divide or multiply the **whole** of a side.
- Isolate a square before square-rooting, and a square root before squaring.
- When the subject appears twice, collect, factorise and divide.
- Check by substituting simple numbers into the original and the new formula.
:::
