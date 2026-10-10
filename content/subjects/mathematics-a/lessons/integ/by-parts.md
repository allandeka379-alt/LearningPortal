---
{
  "key": "integ.by-parts",
  "title": "Integration by parts",
  "summary": "Recognise when an integrand is usefully a product and integrate it by parts (x sin 2x, x²e⁻ˣ, ln x, x tan⁻¹x), including repeated use and definite integrals.",
  "concepts": ["amaths.integ.by-parts"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Some products can be integrated by recognition: $2x\mathrm{e}^{x^{2}}$ is the derivative of $\mathrm{e}^{x^{2}}$. But what about $x\mathrm{e}^{2x}$, or $x\sin 2x$? Neither factor is the derivative of something inside the other. **Integration by parts** handles such products. It is the product rule for differentiation, run backwards.

The method also integrates functions that do not look like products at all, such as $\ln x$ and $\tan^{-1}x$, by treating them as "$1 \times$ the function". In statistics it finds the mean of an exponential distribution (ZIMSEC Statistics), and in engineering it handles damped oscillations.

ZIMSEC Pure Mathematics (Form 5) examines integration by parts; Cambridge 9709 examines it in Paper 3 only (topic 3.5).

## Key definitions

:::formula{name="Integration by parts"}
$$
\int u\frac{dv}{dx}\,dx = uv - \int v\frac{du}{dx}\,dx
$$

For definite integrals: $\displaystyle\int_{a}^{b} u\frac{dv}{dx}\,dx = \Big[uv\Big]_{a}^{b} - \int_{a}^{b} v\frac{du}{dx}\,dx$. This formula is printed in MF19.
:::

:::definition{term="Choosing u and dv/dx"}
Choose $u$ to be the factor that becomes **simpler when differentiated** (a power of $x$ drops to a constant), and $\frac{dv}{dx}$ to be a factor you **can integrate**. A common priority order for $u$ is: logarithms, then inverse trigonometric functions, then powers of $x$, then exponentials and trigonometric functions.
:::

## Where the formula comes from

The product rule says $\frac{d}{dx}(uv) = u\frac{dv}{dx} + v\frac{du}{dx}$. Integrating both sides with respect to $x$ gives $uv = \int u\frac{dv}{dx}\,dx + \int v\frac{du}{dx}\,dx$, and rearranging gives the formula. So integration by parts trades one integral for another, and it helps only if the new integral is **easier** than the old one.

## The basic method

1. Choose $u$ and $\frac{dv}{dx}$.
2. Find $\frac{du}{dx}$ and $v$ (no constant needed at this stage).
3. Substitute into $uv - \int v\frac{du}{dx}\,dx$.
4. Do the remaining integral and add $+ c$.

:::worked-solution[Example 1: find $\displaystyle\int x\sin 2x\,dx$]
1. $u = x$, so $\dfrac{du}{dx} = 1$. $\dfrac{dv}{dx} = \sin 2x$, so $v = -\tfrac{1}{2}\cos 2x$.
2. $\displaystyle\int x\sin 2x\,dx = -\tfrac{x}{2}\cos 2x - \int\left(-\tfrac{1}{2}\cos 2x\right)dx$.
3. $= -\tfrac{x}{2}\cos 2x + \tfrac{1}{2}\int\cos 2x\,dx = -\tfrac{x}{2}\cos 2x + \tfrac{1}{4}\sin 2x + c$.
:::

Had we chosen $u = \sin 2x$ and $\frac{dv}{dx} = x$, the new integral would contain $x^{2}\cos 2x$, which is harder. If a choice makes things worse, swap.

## Integrating ln x

There is no standard integral for $\ln x$, but writing it as $1 \times \ln x$ and taking $u = \ln x$ works, because $\frac{d}{dx}\ln x = \frac{1}{x}$ is simple.

:::worked-solution[Example 2: find $\displaystyle\int\ln x\,dx$ and $\displaystyle\int_{1}^{\mathrm{e}}\ln x\,dx$]
1. $u = \ln x$, $\dfrac{du}{dx} = \dfrac{1}{x}$; $\dfrac{dv}{dx} = 1$, $v = x$.
2. $\displaystyle\int\ln x\,dx = x\ln x - \int x \cdot \frac{1}{x}\,dx = x\ln x - x + c$.
3. $\displaystyle\int_{1}^{\mathrm{e}}\ln x\,dx = \Big[x\ln x - x\Big]_{1}^{\mathrm{e}} = (\mathrm{e} - \mathrm{e}) - (0 - 1) = 1$.
:::

## Repeated integration by parts

When $u = x^{2}$, one application reduces the power to $x$; a second application removes it.

:::worked-solution[Example 3: find $\displaystyle\int x^{2}\mathrm{e}^{-x}\,dx$]
1. $u = x^{2}$, $\dfrac{dv}{dx} = \mathrm{e}^{-x}$, $v = -\mathrm{e}^{-x}$: $\displaystyle\int x^{2}\mathrm{e}^{-x}\,dx = -x^{2}\mathrm{e}^{-x} + \int 2x\mathrm{e}^{-x}\,dx$.
2. Again, $u = 2x$, $v = -\mathrm{e}^{-x}$: $\displaystyle\int 2x\mathrm{e}^{-x}\,dx = -2x\mathrm{e}^{-x} + \int 2\mathrm{e}^{-x}\,dx = -2x\mathrm{e}^{-x} - 2\mathrm{e}^{-x}$.
3. Together: $-\mathrm{e}^{-x}(x^{2} + 2x + 2) + c$.
:::

## Inverse tangent (Cambridge Paper 3)

:::worked-solution[Example 4: find $\displaystyle\int x\tan^{-1}x\,dx$]
1. $u = \tan^{-1}x$, $\dfrac{du}{dx} = \dfrac{1}{1 + x^{2}}$; $\dfrac{dv}{dx} = x$, $v = \dfrac{x^{2}}{2}$.
2. $\displaystyle\int x\tan^{-1}x\,dx = \frac{x^{2}}{2}\tan^{-1}x - \frac{1}{2}\int\frac{x^{2}}{1 + x^{2}}\,dx$.
3. $\dfrac{x^{2}}{1 + x^{2}} = 1 - \dfrac{1}{1 + x^{2}}$, which integrates to $x - \tan^{-1}x$.
4. Answer: $\dfrac{x^{2}}{2}\tan^{-1}x - \dfrac{1}{2}x + \dfrac{1}{2}\tan^{-1}x + c = \dfrac{1}{2}(x^{2} + 1)\tan^{-1}x - \dfrac{x}{2} + c$.
:::

## Definite integrals

:::worked-solution[Example 5: an exam-style "show that"]
Show that $\displaystyle\int_{0}^{1} x\mathrm{e}^{2x}\,dx = \frac{\mathrm{e}^{2} + 1}{4}$.

1. $u = x$, $\dfrac{dv}{dx} = \mathrm{e}^{2x}$, $v = \tfrac{1}{2}\mathrm{e}^{2x}$.
2. $\displaystyle\int_{0}^{1} x\mathrm{e}^{2x}\,dx = \Big[\tfrac{x}{2}\mathrm{e}^{2x}\Big]_{0}^{1} - \tfrac{1}{2}\int_{0}^{1}\mathrm{e}^{2x}\,dx$.
3. $= \tfrac{1}{2}\mathrm{e}^{2} - \tfrac{1}{4}\Big[\mathrm{e}^{2x}\Big]_{0}^{1} = \tfrac{1}{2}\mathrm{e}^{2} - \tfrac{1}{4}(\mathrm{e}^{2} - 1)$.
4. $= \tfrac{1}{4}\mathrm{e}^{2} + \tfrac{1}{4} = \dfrac{\mathrm{e}^{2} + 1}{4}$, as required.
:::

## When the integral comes back

For $\int \mathrm{e}^{x}\sin x\,dx$, neither factor simplifies on differentiation: exponentials and sines just cycle. Integrating by parts twice, with the same type of choice for $u$ each time, brings back the original integral with the opposite sign. Call it $I$; you then have an equation such as $I = \mathrm{e}^{x}\sin x - \mathrm{e}^{x}\cos x - I$, which you solve for $I$:

$$
\int \mathrm{e}^{x}\sin x\,dx = \frac{1}{2}\mathrm{e}^{x}(\sin x - \cos x) + c.
$$

If you switch the choice between the two applications (exponential as $u$ the first time, trigonometric function the second), you simply undo the first step and get the useless identity $I = I$.

## Integration by parts in statistics

The mean of a continuous random variable with density $f(x)$ is $\int x f(x)\,dx$. For the exponential distribution, $f(x) = \lambda\mathrm{e}^{-\lambda x}$ for $x \geq 0$, so the mean is $\int_{0}^{\infty}\lambda x\mathrm{e}^{-\lambda x}\,dx$, an improper integral done by parts with $u = x$. It equals $\frac{1}{\lambda}$, a result ZIMSEC Statistics candidates use often.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge: Paper 3 only (topic 3.5), including repeated use and integrands with $\ln x$ and $\tan^{-1}x$. ZIMSEC: Form 5 Pure Mathematics, and the same technique is used in ZIMSEC Statistics for the mean and variance of the exponential distribution.
:::

## Common mistakes

:::mistake{title="Choosing u badly"}
For $\int x\ln x\,dx$, $u = x$ needs $\int \ln x\,dx$ for $v$, which is circular. Choose $u = \ln x$.
:::

:::mistake{title="Sign errors in the second term"}
The formula has a **minus**: $uv - \int v\frac{du}{dx}\,dx$. With $v = -\frac{1}{2}\cos 2x$ the minus signs combine to a plus; write the brackets in.
:::

:::mistake{title="Forgetting the limits on uv"}
In a definite integral both $\big[uv\big]_{a}^{b}$ and the remaining integral need the limits.
:::

:::mistake{title="Stopping too soon"}
After one application to $x^{2}\mathrm{e}^{-x}$ the integral still contains $x\mathrm{e}^{-x}$; apply the method again.
:::

## Exam tips

:::exam-tip
Write $u$, $\frac{du}{dx}$, $\frac{dv}{dx}$ and $v$ on one line before substituting; examiners award the method mark for a correct first application.
:::

:::exam-tip
Check an indefinite answer by differentiating it with the product rule.
:::

:::exam-tip
Exact answers often involve $\mathrm{e}$, $\ln$ and $\pi$ together; simplify carefully and keep fractions exact.
:::

## Summary

:::summary
- $\int u\frac{dv}{dx}\,dx = uv - \int v\frac{du}{dx}\,dx$ (MF19).
- Choose $u$ to simplify on differentiation: $\ln x$, then $\tan^{-1}x$, then powers of $x$.
- $\int\ln x\,dx = x\ln x - x + c$, using $\ln x = 1 \times \ln x$.
- Repeat the method for $x^{2}$ times an exponential or trigonometric function.
- In definite integrals apply the limits to $uv$ as well.
:::
