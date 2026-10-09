---
{
  "key": "calculus.product-quotient",
  "title": "The product and quotient rules",
  "summary": "Differentiate products uv and quotients u/v of polynomials, powers, exponential, logarithmic and trigonometric functions, simplify the result by factorising, and use it to find gradients.",
  "concepts": ["amath.calculus.product-quotient"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Some functions are two simpler functions multiplied or divided: $x^2(3x - 1)^4$, $x^2 \ln x$, $\dfrac{2x + 3}{x - 1}$, $\dfrac{\sin x}{x}$. Expanding is either very long or impossible, and the derivative of a product is **not** the product of the derivatives. The product and quotient rules handle these functions directly.

These two rules, together with the chain rule, let you differentiate almost every function in the syllabus. Cambridge lists "differentiate products and quotients of functions" as a separate learning outcome and examines it in most papers, often with an instruction to give the answer in a simplified or factorised form. ZIMSEC (Form 3) names the product and quotient rules explicitly in its differentiation topic.

The examples use a few standard derivatives that are studied fully in the lesson on trigonometric, exponential and logarithmic functions: $\dfrac{d}{dx}(\mathrm{e}^x) = \mathrm{e}^x$, $\dfrac{d}{dx}(\ln x) = \dfrac{1}{x}$, $\dfrac{d}{dx}(\sin x) = \cos x$ and $\dfrac{d}{dx}(\cos x) = -\sin x$, with $x$ in radians.

## Key definitions

:::definition{term="Product and quotient"}
A product $uv$ is two functions of $x$ multiplied, such as $x^2 \ln x$ ($u = x^2$, $v = \ln x$). A quotient $\dfrac{u}{v}$ is one function of $x$ divided by another, such as $\dfrac{2x + 3}{x - 1}$ ($u = 2x + 3$, $v = x - 1$).
:::

:::formula{name="Product rule (not in Cambridge's List of formulas)"}
If $y = uv$, where $u$ and $v$ are functions of $x$, then

$$
\frac{dy}{dx} = u\frac{dv}{dx} + v\frac{du}{dx}
$$
:::

:::formula{name="Quotient rule (not in Cambridge's List of formulas)"}
If $y = \dfrac{u}{v}$, then

$$
\frac{dy}{dx} = \frac{v\dfrac{du}{dx} - u\dfrac{dv}{dx}}{v^2}
$$
:::

A way to remember the order in the quotient rule: the numerator starts with the **bottom** function $v$, and there is a minus sign, so the order matters. In the product rule the two terms are added, so their order does not matter.

## The product rule

Set out four pieces before you substitute: $u$, $v$, $\frac{du}{dx}$ and $\frac{dv}{dx}$.

:::worked-solution[Example 1: differentiate $y = x^2(3x - 1)^4$ and factorise the result]
1. $u = x^2$, so $\dfrac{du}{dx} = 2x$.
2. $v = (3x - 1)^4$, so by the chain rule $\dfrac{dv}{dx} = 4(3x - 1)^3 \times 3 = 12(3x - 1)^3$.
3. $\dfrac{dy}{dx} = u\dfrac{dv}{dx} + v\dfrac{du}{dx} = 12x^2(3x - 1)^3 + 2x(3x - 1)^4$.
4. Take out the common factor $2x(3x - 1)^3$: $\dfrac{dy}{dx} = 2x(3x - 1)^3\left[6x + (3x - 1)\right]$.
5. $\dfrac{dy}{dx} = 2x(3x - 1)^3(9x - 1)$.
:::

Factorising is not decoration. It turns the derivative into a product that is easy to set equal to zero: here the gradient is zero when $x = 0$, $x = \frac{1}{3}$ or $x = \frac{1}{9}$. Take out the **lowest** power of each repeated bracket.

:::worked-solution[Example 2: differentiate $y = x^2 \ln x$ for $x > 0$]
1. $u = x^2$, $\dfrac{du}{dx} = 2x$; $v = \ln x$, $\dfrac{dv}{dx} = \dfrac{1}{x}$.
2. $\dfrac{dy}{dx} = x^2 \times \dfrac{1}{x} + \ln x \times 2x = x + 2x\ln x$.
3. Factorised: $\dfrac{dy}{dx} = x(1 + 2\ln x)$.
:::

## The quotient rule

:::worked-solution[Example 3: differentiate $y = \dfrac{2x + 3}{x - 1}$]
1. $u = 2x + 3$, $\dfrac{du}{dx} = 2$; $v = x - 1$, $\dfrac{dv}{dx} = 1$.
2. $\dfrac{dy}{dx} = \dfrac{(x - 1)(2) - (2x + 3)(1)}{(x - 1)^2}$.
3. Numerator: $2x - 2 - 2x - 3 = -5$.
4. $\dfrac{dy}{dx} = \dfrac{-5}{(x - 1)^2}$.
5. Since $(x - 1)^2 > 0$, the gradient is negative for every $x \neq 1$: the curve decreases on each side of $x = 1$.
:::

Expand and simplify the numerator only. Leave the denominator $v^2$ as a squared bracket; expanding it gains nothing and hides the factor you may need later.

:::worked-solution[Example 4: given $y = \dfrac{x}{\sqrt{x + 4}}$, show that $\dfrac{dy}{dx} = \dfrac{x + 8}{2(x + 4)^{\frac{3}{2}}}$, and find the gradient at the origin]
1. $u = x$, $\dfrac{du}{dx} = 1$; $v = (x + 4)^{\frac{1}{2}}$, $\dfrac{dv}{dx} = \frac{1}{2}(x + 4)^{-\frac{1}{2}}$; $v^2 = x + 4$.
2. $\dfrac{dy}{dx} = \dfrac{(x + 4)^{\frac{1}{2}} - \frac{1}{2}x(x + 4)^{-\frac{1}{2}}}{x + 4}$.
3. Multiply numerator and denominator by $2(x + 4)^{\frac{1}{2}}$: numerator $2(x + 4) - x = x + 8$; denominator $2(x + 4)^{\frac{3}{2}}$.
4. So $\dfrac{dy}{dx} = \dfrac{x + 8}{2(x + 4)^{\frac{3}{2}}}$, as required.
5. At the origin, $x = 0$: $\dfrac{8}{2 \times 4^{\frac{3}{2}}} = \dfrac{8}{16} = \dfrac{1}{2}$.
:::

Step 3 is the standard trick for clearing a fraction inside a fraction: multiply top and bottom by whatever removes the negative power.

:::worked-solution[Example 5: find the exact gradient of $y = \dfrac{\sin x}{x}$ at $x = \dfrac{\pi}{2}$]
1. $u = \sin x$, $\dfrac{du}{dx} = \cos x$; $v = x$, $\dfrac{dv}{dx} = 1$.
2. $\dfrac{dy}{dx} = \dfrac{x\cos x - \sin x}{x^2}$.
3. At $x = \frac{\pi}{2}$: $\cos \frac{\pi}{2} = 0$ and $\sin \frac{\pi}{2} = 1$.
4. Gradient $= \dfrac{0 - 1}{\left(\frac{\pi}{2}\right)^2} = -\dfrac{4}{\pi^2}$.
:::

## Choosing a method

| Function | Best method |
| --- | --- |
| $x^3(x + 2)$ | expand: $x^4 + 2x^3$ |
| $\dfrac{x^2 + 1}{x}$ | split: $x + x^{-1}$ |
| $x^3(2x + 5)^6$ | product rule |
| $\dfrac{x^2}{3x - 2}$ | quotient rule |
| $\dfrac{5}{(x + 1)^3}$ | chain rule on $5(x + 1)^{-3}$ |

A quotient with a **constant numerator** needs only the chain rule. A quotient can also be treated as the product $u \times v^{-1}$; the answer is the same, so use whichever you find more reliable.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the two rules in the forms above, and neither prints them on a formula sheet. Cambridge Paper 1 questions frequently ask for the answer "in the form $\dfrac{ax + b}{(x + c)^n}$" or similar; ZIMSEC questions more often ask for the gradient at a point. In both cases, simplify the numerator fully.
:::

## Common mistakes

:::mistake{title="Multiplying the derivatives"}
$\dfrac{d}{dx}(uv) \neq \dfrac{du}{dx} \times \dfrac{dv}{dx}$. For $x^2 \ln x$ that would give $2x \times \frac{1}{x} = 2$, which is wrong.
:::

:::mistake{title="Reversing the quotient rule numerator"}
$u\frac{dv}{dx} - v\frac{du}{dx}$ gives the correct size but the wrong sign. Start with $v$: "bottom times derivative of top, minus top times derivative of bottom".
:::

:::mistake{title="Forgetting to square the denominator"}
The denominator is $v^2$, not $v$.
:::

:::mistake{title="Losing brackets in the numerator"}
In $(x - 1)(2) - (2x + 3)(1)$ the minus sign applies to **both** terms of $2x + 3$. Write the brackets before expanding.
:::

## Exam tips

:::exam-tip
Write $u$, $v$, $\frac{du}{dx}$ and $\frac{dv}{dx}$ on one line before using the rule. A correct rule with clearly stated parts earns the method mark even if later algebra slips.
:::

:::exam-tip
When the answer is given ("show that …"), work towards it by factorising common brackets with the lowest power. Check the final form against the question letter by letter.
:::

:::exam-tip
For trigonometric functions, $x$ must be in radians. Use exact values such as $\sin \frac{\pi}{6} = \frac{1}{2}$ on the non-calculator paper.
:::

## Summary

:::summary
- Product rule: $\dfrac{d}{dx}(uv) = u\dfrac{dv}{dx} + v\dfrac{du}{dx}$.
- Quotient rule: $\dfrac{d}{dx}\left(\dfrac{u}{v}\right) = \dfrac{v\frac{du}{dx} - u\frac{dv}{dx}}{v^2}$; the order of the numerator matters.
- Use the chain rule inside either rule when $u$ or $v$ is composite.
- Simplify the numerator and factorise using the lowest powers of repeated brackets.
- Expand, split or use the chain rule instead when that is simpler.
:::
