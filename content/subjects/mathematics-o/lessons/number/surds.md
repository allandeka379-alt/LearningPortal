---
{
  "key": "number.surds",
  "title": "Surds",
  "summary": "Simplify surds such as √72 = 6√2, add, subtract and multiply them, expand brackets containing surds and rationalise denominators such as 6/√3 and 4/(3 − √5).",
  "concepts": ["math.number.surds"],
  "objectives": ["cambridge/igcse/mathematics:1.18.1", "cambridge/igcse/mathematics:1.18.2"],
  "estimatedMinutes": 35,
  "level": "extended"
}
---
## Introduction

The diagonal of a square tile with sides of 1 metre is exactly $\sqrt{2}$ m long. A calculator says $1.414213\ldots$, but that decimal never ends, so any decimal value is only an approximation. Writing $\sqrt{2}$ keeps the answer **exact**. Roots left in this form are called **surds**, and on the Cambridge Extended non-calculator paper you are expected to simplify and calculate with them.

You should already know your square numbers to $15^2$, how to expand brackets such as $(x + 2)(x - 3)$, and the difference of two squares, $(a + b)(a - b) = a^2 - b^2$.

## Key definitions

:::definition{term="Surd"}
A root of a whole number that cannot be simplified to a whole number or a fraction, such as $\sqrt{2}$, $\sqrt{5}$ or $3\sqrt{7}$. Surds are irrational numbers.
:::

:::definition{term="Simplest form of a surd"}
A surd $k\sqrt{n}$ in which $n$ has no square factor other than 1. For example $\sqrt{20} = 2\sqrt{5}$ is in simplest form, but $\sqrt{20}$ is not.
:::

:::definition{term="Rationalising the denominator"}
Rewriting a fraction so that there is no surd in the denominator, for example $\frac{6}{\sqrt{3}} = 2\sqrt{3}$.
:::

:::formula{name="Rules for surds"}
$$
\sqrt{ab} = \sqrt{a} \times \sqrt{b} \qquad \sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}} \qquad \sqrt{a} \times \sqrt{a} = a
$$
:::

There is **no** rule for sums: $\sqrt{9} + \sqrt{16} = 3 + 4 = 7$, but $\sqrt{25} = 5$.

## Simplifying surds

Look for the **largest square factor** of the number under the root.

:::worked-solution[Example 1: simplify $\sqrt{72}$]
1. Square factors of 72 are 4, 9 and 36; the largest is 36.
2. $\sqrt{72} = \sqrt{36 \times 2} = \sqrt{36} \times \sqrt{2}$.
3. $= 6\sqrt{2}$.
:::

If you use a smaller square factor first, keep going: $\sqrt{72} = 2\sqrt{18} = 2 \times 3\sqrt{2} = 6\sqrt{2}$.

Fractions under a root work the same way: $\sqrt{\frac{50}{9}} = \frac{\sqrt{50}}{\sqrt{9}} = \frac{5\sqrt{2}}{3}$.

## Adding, subtracting and multiplying

Like surds (the same number under the root) can be added and subtracted just like like terms in algebra: $3\sqrt{2} + 5\sqrt{2} = 8\sqrt{2}$. Simplify first to find like surds.

:::worked-solution[Example 2: work out $\sqrt{12} + \sqrt{27}$ and $\sqrt{3} \times \sqrt{12}$]
1. $\sqrt{12} = \sqrt{4 \times 3} = 2\sqrt{3}$ and $\sqrt{27} = \sqrt{9 \times 3} = 3\sqrt{3}$.
2. $\sqrt{12} + \sqrt{27} = 2\sqrt{3} + 3\sqrt{3} = 5\sqrt{3}$.
3. $\sqrt{3} \times \sqrt{12} = \sqrt{36} = 6$.
:::

## Expanding brackets

Multiply every term in one bracket by every term in the other, then use $\sqrt{a} \times \sqrt{a} = a$ and collect like terms.

:::worked-solution[Example 3: expand $(2 + \sqrt{3})(4 - \sqrt{3})$ and $(\sqrt{5} + 1)^2$]
1. $(2 + \sqrt{3})(4 - \sqrt{3}) = 8 - 2\sqrt{3} + 4\sqrt{3} - \sqrt{3}\sqrt{3}$.
2. $= 8 + 2\sqrt{3} - 3 = 5 + 2\sqrt{3}$.
3. $(\sqrt{5} + 1)^2 = (\sqrt{5} + 1)(\sqrt{5} + 1) = 5 + \sqrt{5} + \sqrt{5} + 1$.
4. $= 6 + 2\sqrt{5}$.
:::

:::worked-solution[Example 4: a square with sides $(2 + \sqrt{3})$ cm]
Find the area of the square in the form $a + b\sqrt{3}$, and simplify $3\sqrt{8} - \sqrt{18} + \sqrt{50}$.
1. Area $= (2 + \sqrt{3})^2 = 4 + 2\sqrt{3} + 2\sqrt{3} + 3$.
2. $= 7 + 4\sqrt{3}\ \text{cm}^2$.
3. $3\sqrt{8} = 3 \times 2\sqrt{2} = 6\sqrt{2}$, $\sqrt{18} = 3\sqrt{2}$ and $\sqrt{50} = 5\sqrt{2}$.
4. $6\sqrt{2} - 3\sqrt{2} + 5\sqrt{2} = 8\sqrt{2}$.
:::

:::keyfact{title="Conjugate pairs"}
$(a + \sqrt{b})(a - \sqrt{b}) = a^2 - b$, which has no surd. For example $(3 + \sqrt{2})(3 - \sqrt{2}) = 9 - 2 = 7$.
:::

## Rationalising the denominator

- For $\dfrac{a}{\sqrt{b}}$: multiply the top and bottom by $\sqrt{b}$.
- For $\dfrac{a}{b + \sqrt{c}}$: multiply the top and bottom by the conjugate $b - \sqrt{c}$ (and for $b - \sqrt{c}$, use $b + \sqrt{c}$).

:::worked-solution[Example 5: rationalise $\dfrac{6}{\sqrt{3}}$]
1. Multiply the top and bottom by $\sqrt{3}$: $\dfrac{6\sqrt{3}}{\sqrt{3}\sqrt{3}} = \dfrac{6\sqrt{3}}{3}$.
2. Simplify: $2\sqrt{3}$.
:::

:::worked-solution[Example 6: rationalise $\dfrac{4}{3 - \sqrt{5}}$]
1. Multiply the top and bottom by $3 + \sqrt{5}$.
2. Denominator: $(3 - \sqrt{5})(3 + \sqrt{5}) = 9 - 5 = 4$.
3. Numerator: $4(3 + \sqrt{5})$.
4. $\dfrac{4(3 + \sqrt{5})}{4} = 3 + \sqrt{5}$.
:::

## Common mistakes

:::mistake{title="Adding the numbers under the roots"}
$\sqrt{9} + \sqrt{16} \neq \sqrt{25}$, and $\sqrt{2} + \sqrt{3} \neq \sqrt{5}$. Only like surds can be added.
:::

:::mistake{title="Taking out the wrong factor"}
$\sqrt{20} = \sqrt{4 \times 5} = 2\sqrt{5}$, not $4\sqrt{5}$. The number outside the root is the **square root** of the square factor.
:::

:::mistake{title="Forgetting the middle terms"}
$(\sqrt{5} + 1)^2 \neq 5 + 1$. Write out both brackets: the answer is $6 + 2\sqrt{5}$.
:::

:::mistake{title="Using the wrong multiplier to rationalise"}
For $\frac{4}{3 - \sqrt{5}}$, multiplying by $\sqrt{5}$ does not remove the surd. Use the conjugate $3 + \sqrt{5}$.
:::

## Exam tips

:::exam-tip
"Give your answer in the form $a + b\sqrt{c}$" means $a$ and $b$ are integers (or fractions) and $c$ is as small as possible. Check that the surd is fully simplified.
:::

:::exam-tip
Surd questions usually appear on the non-calculator paper, but when you practise at home you can check an expansion with a calculator: $(2 + \sqrt{3})(4 - \sqrt{3})$ and $5 + 2\sqrt{3}$ both come to about $8.46$.
:::

## Summary

:::summary
- $\sqrt{ab} = \sqrt{a}\sqrt{b}$ and $\sqrt{a} \times \sqrt{a} = a$, but there is no rule for $\sqrt{a + b}$.
- Simplify by taking out the largest square factor: $\sqrt{72} = 6\sqrt{2}$.
- Add and subtract only like surds, after simplifying.
- Expand brackets term by term; a conjugate pair $(a + \sqrt{b})(a - \sqrt{b}) = a^2 - b$.
- Rationalise $\frac{a}{\sqrt{b}}$ with $\sqrt{b}$, and $\frac{a}{b \pm \sqrt{c}}$ with the conjugate $b \mp \sqrt{c}$.
:::
