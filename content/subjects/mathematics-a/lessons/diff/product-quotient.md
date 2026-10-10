---
{
  "key": "diff.product-quotient",
  "title": "The product and quotient rules",
  "summary": "Differentiate products such as x² ln x and x e^(1 − x²) and quotients such as (2x − 4)/(3x + 2), simplify the result, and use it for gradients, tangents, normals and stationary points.",
  "concepts": ["amaths.diff.product-quotient"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

The chain rule handles a function **of** a function. Many functions are instead a function **times** a function, such as $x^{2}\ln x$, or one function **divided by** another, such as $\dfrac{2x - 4}{3x + 2}$. You cannot differentiate these by differentiating each piece separately: the derivative of a product is not the product of the derivatives. This lesson gives the two rules that do the job.

Products and quotients appear in models everywhere: a drug concentration $t\mathrm{e}^{-t}$ that rises and then decays, or the average cost per bag of fertiliser, total cost divided by the number of bags. ZIMSEC Pure Mathematics (Form 5) examines both rules; Cambridge 9709 examines them in Papers 2 and 3 (topics 2.4 and 3.4).

You need the derivatives of powers, $\mathrm{e}^{x}$, $\ln x$ and the trigonometric functions, and the chain rule.

## Key definitions

:::formula{name="The product rule"}
If $y = uv$, where $u$ and $v$ are functions of $x$,

$$
\frac{dy}{dx} = u\frac{dv}{dx} + v\frac{du}{dx}.
$$
:::

:::formula{name="The quotient rule"}
If $y = \dfrac{u}{v}$,

$$
\frac{dy}{dx} = \frac{v\dfrac{du}{dx} - u\dfrac{dv}{dx}}{v^{2}}.
$$

Both rules are printed in Cambridge's formula list MF19 (as $\frac{d}{dx}(uv)$ and $\frac{d}{dx}\left(\frac{u}{v}\right)$). Notice the **minus** sign and the order in the quotient rule: the bottom function comes first in the numerator.
:::

:::definition{term="Choosing u and v"}
Name the two factors (product) or the numerator $u$ and denominator $v$ (quotient). Write down $u$, $v$, $u'$ and $v'$ in a small table before substituting; it prevents most errors.
:::

## The product rule

:::worked-solution[Example 1: differentiate $y = x^{2}\ln x$ and find its stationary point]
1. $u = x^{2}$, $u' = 2x$; $v = \ln x$, $v' = \dfrac{1}{x}$.
2. $\dfrac{dy}{dx} = x^{2} \cdot \dfrac{1}{x} + \ln x \cdot 2x = x + 2x\ln x$.
3. Factorise: $\dfrac{dy}{dx} = x(1 + 2\ln x)$.
4. For $x > 0$, $\dfrac{dy}{dx} = 0$ when $\ln x = -\frac{1}{2}$, so $x = \mathrm{e}^{-\frac{1}{2}} \approx 0.607$.
5. Then $y = \mathrm{e}^{-1} \times (-\frac{1}{2}) = -\dfrac{1}{2\mathrm{e}} \approx -0.184$.
:::

Products often contain a chain-rule factor. Differentiate that factor with the chain rule inside the product rule, then **factorise** the result: common factors such as $\mathrm{e}^{1 - x^{2}}$ always come out.

:::worked-solution[Example 2: differentiate $y = x\mathrm{e}^{1 - x^{2}}$]
1. $u = x$, $u' = 1$; $v = \mathrm{e}^{1 - x^{2}}$, $v' = -2x\mathrm{e}^{1 - x^{2}}$ (chain rule).
2. $\dfrac{dy}{dx} = x \cdot (-2x\mathrm{e}^{1 - x^{2}}) + \mathrm{e}^{1 - x^{2}} \cdot 1$.
3. Factorise: $\dfrac{dy}{dx} = \mathrm{e}^{1 - x^{2}}(1 - 2x^{2})$.
4. Since an exponential is never zero, the stationary points are where $1 - 2x^{2} = 0$, at $x = \pm\dfrac{1}{\sqrt{2}}$.
:::

## The quotient rule

:::worked-solution[Example 3: differentiate $y = \dfrac{2x - 4}{3x + 2}$]
1. $u = 2x - 4$, $u' = 2$; $v = 3x + 2$, $v' = 3$.
2. $\dfrac{dy}{dx} = \dfrac{(3x + 2)(2) - (2x - 4)(3)}{(3x + 2)^{2}}$.
3. Numerator: $6x + 4 - 6x + 12 = 16$.
4. $\dfrac{dy}{dx} = \dfrac{16}{(3x + 2)^{2}}$. This is positive for every $x \neq -\frac{2}{3}$, so the function is increasing on each side of its asymptote.
:::

The quotient rule also proves standard results. Writing $\tan x = \dfrac{\sin x}{\cos x}$:

$$
\frac{d}{dx}\tan x = \frac{\cos x \cdot \cos x - \sin x \cdot (-\sin x)}{\cos^{2}x} = \frac{\cos^{2}x + \sin^{2}x}{\cos^{2}x} = \frac{1}{\cos^{2}x} = \sec^{2}x.
$$

### Product or quotient?

A quotient can always be rewritten as a product: $\dfrac{u}{v} = uv^{-1}$. Either rule then gives the same answer, so use whichever leads to simpler algebra. When the denominator is a single power of $x$, such as $\dfrac{x^{2} + 3}{x}$, it is quickest to divide first and use neither rule.

:::worked-solution[Example 4: an exam-style "show that"]
Given $y = (x + 1)\sqrt{2x + 3}$, show that $\dfrac{dy}{dx} = \dfrac{3x + 4}{\sqrt{2x + 3}}$, and find the equation of the tangent at the point where $x = 3$.

1. $u = x + 1$, $u' = 1$; $v = (2x + 3)^{\frac{1}{2}}$, $v' = (2x + 3)^{-\frac{1}{2}}$.
2. $\dfrac{dy}{dx} = (x + 1)(2x + 3)^{-\frac{1}{2}} + (2x + 3)^{\frac{1}{2}}$.
3. Common denominator $\sqrt{2x + 3}$: $\dfrac{(x + 1) + (2x + 3)}{\sqrt{2x + 3}} = \dfrac{3x + 4}{\sqrt{2x + 3}}$, as required.
4. At $x = 3$: $y = 4\sqrt{9} = 12$ and $\dfrac{dy}{dx} = \dfrac{13}{3}$.
5. Tangent: $y - 12 = \frac{13}{3}(x - 3)$, i.e. $3y = 13x - 3$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the product and quotient rules at the same depth (ZIMSEC Form 5; Cambridge Papers 2 and 3), with the functions $x^{n}$, $\mathrm{e}^{x}$, $\ln x$ and the trigonometric functions. Cambridge prints both rules in MF19; ZIMSEC prints no formula list.
:::

## Common mistakes

:::mistake{title="Multiplying the derivatives"}
$\frac{d}{dx}(x^{2}\ln x)$ is not $2x \times \frac{1}{x} = 2$. The product rule has two terms.
:::

:::mistake{title="Reversing the quotient-rule numerator"}
$\dfrac{u'v - uv'}{v^{2}}$ and $\dfrac{uv' - u'v}{v^{2}}$ differ by a sign. Remember: "bottom times derivative of top, minus top times derivative of bottom".
:::

:::mistake{title="Forgetting to square the denominator"}
The denominator of the quotient rule is $v^{2}$, not $v$.
:::

:::mistake{title="Not simplifying"}
Leaving $x \cdot (-2x\mathrm{e}^{1 - x^{2}}) + \mathrm{e}^{1 - x^{2}}$ unfactorised makes $\frac{dy}{dx} = 0$ hard to solve. Take out common factors.
:::

## Exam tips

:::exam-tip
In "show that" questions the target tells you how to simplify; work towards it step by step and show the common denominator line.
:::

:::exam-tip
When solving $\frac{dy}{dx} = 0$, state that $\mathrm{e}^{\text{anything}} > 0$ or that the denominator is never zero, so only the other factor can vanish.
:::

:::exam-tip
Expand the numerator of a quotient-rule answer carefully: many marks are lost to sign errors in $-(2x - 4)(3)$.
:::

## Summary

:::summary
- Product rule: $(uv)' = uv' + vu'$.
- Quotient rule: $\left(\frac{u}{v}\right)' = \frac{vu' - uv'}{v^{2}}$; mind the order and the minus sign.
- Write $u$, $v$, $u'$, $v'$ first; use the chain rule for any composite factor.
- Factorise and simplify before solving $\frac{dy}{dx} = 0$ or substituting.
- Divide out single-term denominators instead of using the quotient rule.
:::
