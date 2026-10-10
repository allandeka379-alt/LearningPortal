---
{
  "key": "integ.recognition-substitution",
  "title": "Integration by recognition and by substitution",
  "summary": "Recognise integrands of the form k f′(x)/f(x) and k f′(x)[f(x)]ⁿ and integrate them directly, and use a given (Cambridge) or suitable (ZIMSEC) substitution to evaluate definite and indefinite integrals, changing the limits.",
  "concepts": ["amaths.integ.recognition-substitution"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

The chain rule makes differentiating composite functions routine. Integrating them is harder, because there is no "reverse chain rule" that always works. But two situations come up again and again: the integrand is a **derivative divided by its function**, or a **derivative times a power of its function**. Spotting these patterns, called integration by **recognition**, turns hard-looking integrals into one-line answers.

When the pattern is less obvious, a **substitution** changes the variable so that the integral becomes a standard one. It is the integration counterpart of the chain rule and one of the most powerful techniques you will learn.

ZIMSEC Pure Mathematics (Form 5) examines recognition and substitution (you may have to choose the substitution yourself). Cambridge 9709 examines them in Paper 3 only (topic 3.5), where the substitution is always given.

## Key definitions

:::formula{name="Recognition: the logarithm pattern"}
$$
\int \frac{f'(x)}{f(x)}\,dx = \ln|f(x)| + c
$$

In MF19 this appears through $\int \frac{1}{x}\,dx = \ln|x| + c$; the general form is not printed.
:::

:::formula{name="Recognition: the power pattern"}
$$
\int f'(x)\,[f(x)]^{n}\,dx = \frac{[f(x)]^{n + 1}}{n + 1} + c, \qquad n \neq -1
$$
:::

:::definition{term="Integration by substitution"}
Replace part of the integrand by a new variable $u = g(x)$, replace $dx$ by $\frac{dx}{du}\,du$ (equivalently $du = g'(x)\,dx$), and, for a definite integral, replace the $x$-limits by the corresponding $u$-limits.
:::

## Recognition

Look for a function whose derivative also appears, possibly up to a constant factor. Adjust the constant outside the integral.

:::worked-solution[Example 1: find $\displaystyle\int\frac{x}{x^{2} + 1}\,dx$]
1. The derivative of $x^{2} + 1$ is $2x$; the numerator is $x$, half of it.
2. Write $\displaystyle\int\frac{x}{x^{2} + 1}\,dx = \frac{1}{2}\int\frac{2x}{x^{2} + 1}\,dx$.
3. Recognition: $= \frac{1}{2}\ln(x^{2} + 1) + c$ (no modulus needed, since $x^{2} + 1 > 0$).
:::

:::worked-solution[Example 2: the integral of $\tan x$]
1. Write $\tan x = \dfrac{\sin x}{\cos x}$. The derivative of $\cos x$ is $-\sin x$.
2. So $\displaystyle\int\tan x\,dx = -\int\frac{-\sin x}{\cos x}\,dx = -\ln|\cos x| + c = \ln|\sec x| + c$.
3. For example, $\displaystyle\int_{0}^{\pi/3}\tan x\,dx = \Big[\ln|\sec x|\Big]_{0}^{\pi/3} = \ln 2 - \ln 1 = \ln 2$.
:::

The power pattern works the same way.

:::worked-solution[Example 3: find $\displaystyle\int x(x^{2} + 3)^{4}\,dx$]
1. $f(x) = x^{2} + 3$ has $f'(x) = 2x$, and $x = \frac{1}{2}f'(x)$.
2. So the integral is $\frac{1}{2}\displaystyle\int 2x(x^{2} + 3)^{4}\,dx = \frac{1}{2} \cdot \frac{(x^{2} + 3)^{5}}{5} + c$.
3. Answer: $\dfrac{(x^{2} + 3)^{5}}{10} + c$. Check by differentiating: $\frac{5(x^{2} + 3)^{4} \cdot 2x}{10} = x(x^{2} + 3)^{4}$.
:::

Recognition fails when the "derivative" factor is missing: $\int (x^{2} + 3)^{4}\,dx$ has no $x$ outside, so you must expand instead.

## Substitution

The method, for $\int F(x)\,dx$ with $u = g(x)$:

1. Differentiate: $\frac{du}{dx} = g'(x)$, so $dx = \frac{du}{g'(x)}$.
2. Replace every $x$ by an expression in $u$ (rearrange $u = g(x)$ if necessary).
3. For a definite integral, change the limits to $u$-values.
4. Integrate with respect to $u$, then (for an indefinite integral) substitute back.

:::worked-solution[Example 4: an exam-style question with $u = \sin x$]
Use the substitution $u = \sin x$ to show that $\displaystyle\int_{0}^{\pi/2}\sin^{2}2x\cos x\,dx = \frac{8}{15}$.

1. $\sin 2x = 2\sin x\cos x$, so $\sin^{2}2x = 4\sin^{2}x\cos^{2}x = 4\sin^{2}x(1 - \sin^{2}x)$.
2. $u = \sin x$ gives $du = \cos x\,dx$, so $\sin^{2}2x\cos x\,dx = 4u^{2}(1 - u^{2})\,du$.
3. Limits: $x = 0 \Rightarrow u = 0$; $x = \frac{\pi}{2} \Rightarrow u = 1$.
4. $\displaystyle\int_{0}^{1}(4u^{2} - 4u^{4})\,du = \Big[\tfrac{4u^{3}}{3} - \tfrac{4u^{5}}{5}\Big]_{0}^{1} = \tfrac{4}{3} - \tfrac{4}{5} = \tfrac{8}{15}$, as required.
:::

:::worked-solution[Example 5: $\displaystyle\int_{1}^{5}\frac{x}{\sqrt{2x - 1}}\,dx$ with $u = 2x - 1$]
1. $u = 2x - 1$, so $x = \frac{u + 1}{2}$ and $dx = \frac{1}{2}\,du$.
2. Limits: $x = 1 \Rightarrow u = 1$; $x = 5 \Rightarrow u = 9$.
3. The integral becomes $\displaystyle\int_{1}^{9}\frac{u + 1}{2}\,u^{-\frac{1}{2}} \cdot \frac{1}{2}\,du = \frac{1}{4}\int_{1}^{9}\left(u^{\frac{1}{2}} + u^{-\frac{1}{2}}\right)du$.
4. $= \frac{1}{4}\Big[\tfrac{2}{3}u^{\frac{3}{2}} + 2u^{\frac{1}{2}}\Big]_{1}^{9} = \frac{1}{4}\left[(18 + 6) - \left(\tfrac{2}{3} + 2\right)\right] = \frac{1}{4} \times \frac{64}{3} = \frac{16}{3}$.
:::

### Indefinite integrals by substitution

For an indefinite integral there are no limits to change; instead, you must **substitute back** at the end so the answer is in terms of $x$. For example, with $u = 1 + x^{2}$ we have $x\,dx = \frac{1}{2}\,du$, so

$$
\int x\sqrt{1 + x^{2}}\,dx = \frac{1}{2}\int u^{\frac{1}{2}}\,du = \frac{1}{3}u^{\frac{3}{2}} + c = \frac{1}{3}(1 + x^{2})^{\frac{3}{2}} + c.
$$

Leaving the answer as $\frac{1}{3}u^{\frac{3}{2}} + c$ loses the final mark. As always, differentiating the result is a quick check: the chain rule gives back $x\sqrt{1 + x^{2}}$. Notice that this particular integral could also be done by recognition, since $x$ is half the derivative of $1 + x^{2}$; substitution simply makes the bookkeeping explicit, which is safer when the constants are awkward.

### Choosing a substitution (ZIMSEC)

When no substitution is given, try $u$ = the "inside" function: the expression under a root, inside a bracket raised to a power, or in an exponent or denominator. If its derivative appears as a factor, the substitution will work cleanly; if not, rearrange $u = g(x)$ for $x$, as in Example 5.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge: Paper 3 only, and the substitution is always given ("use the substitution $u = \ldots$"). ZIMSEC (Form 5): you may be asked to choose a suitable substitution yourself.
:::

## Common mistakes

:::mistake{title="Forgetting to replace dx"}
Writing $\int 4u^{2}(1 - u^{2})\cos x\,dx$ mixes variables. $dx$ must become $\frac{du}{\cos x}$, and the $\cos x$ then cancels.
:::

:::mistake{title="Keeping the x-limits"}
After substituting, the limits must be $u$-values. Using $0$ and $\frac{\pi}{2}$ with $u$ gives the wrong answer.
:::

:::mistake{title="Wrong constant in recognition"}
$\int \frac{x}{x^{2} + 1}\,dx = \frac{1}{2}\ln(x^{2} + 1) + c$, not $\ln(x^{2} + 1) + c$. Differentiate to check.
:::

:::mistake{title="Recognising a pattern that is not there"}
$\int \frac{1}{x^{2} + 1}\,dx$ is not $\ln(x^{2} + 1)$: the numerator is not the derivative of the denominator. (It is $\tan^{-1}x$.)
:::

## Exam tips

:::exam-tip
In "use the substitution" questions, show the line where $dx$ is replaced and the new limits; these carry method marks even if the integration slips.
:::

:::exam-tip
A "show that" answer such as $\frac{8}{15}$ or $\ln 2$ is given, so present the working fully and do not jump to decimals.
:::

:::exam-tip
Before substituting, check for recognition: a one-line recognition answer is quicker and less error-prone.
:::

## Summary

:::summary
- $\int \frac{f'(x)}{f(x)}\,dx = \ln|f(x)| + c$; $\int f'(x)[f(x)]^{n}\,dx = \frac{[f(x)]^{n + 1}}{n + 1} + c$.
- Adjust constant factors outside the integral; check by differentiating.
- Substitution: replace $x$, replace $dx$, change the limits, integrate in $u$.
- $\int \tan x\,dx = \ln|\sec x| + c$.
- Cambridge gives the substitution (Paper 3); ZIMSEC may expect you to choose it.
:::
