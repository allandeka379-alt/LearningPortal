---
{
  "key": "trig.compound-double-angle",
  "title": "Compound-angle and double-angle formulae",
  "summary": "Use the formulae for sin(A ± B), cos(A ± B) and tan(A ± B) and the double-angle formulae for sin 2A, cos 2A (three forms) and tan 2A to find exact values, simplify expressions, prove identities and solve equations.",
  "concepts": ["amaths.trig.compound-double-angle"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Is $\sin(A + B)$ equal to $\sin A + \sin B$? Try $A = B = 30^\circ$: $\sin 60^\circ \approx 0.866$, but $\sin 30^\circ + \sin 30^\circ = 1$. The compound-angle formulae give the correct expansions, and from them come the double-angle formulae that you will use constantly in identities, equations, and later in integration (for example $\int \sin^2 x\,\mathrm{d}x$).

This topic is ZIMSEC Pure Mathematics (trigonometrical identities, Form 5) and Cambridge 9709 Paper 2 (AS) and Paper 3 (A Level), topics 2.3 and 3.3. Questions ask for exact values such as $\tan 15^\circ$, expansions like $\cos(x - 30^\circ)$, proofs ("show that $\sin 3\theta \equiv 3\sin\theta - 4\sin^3\theta$") and equations such as $\cos 2x + 3\sin x = 2$.

## Key definitions

:::formula{name="Compound-angle formulae (in MF19)"}
$$
\sin(A \pm B) \equiv \sin A\cos B \pm \cos A\sin B
$$

$$
\cos(A \pm B) \equiv \cos A\cos B \mp \sin A\sin B
$$

$$
\tan(A \pm B) \equiv \frac{\tan A \pm \tan B}{1 \mp \tan A\tan B}
$$
:::

:::formula{name="Double-angle formulae (put B = A; in MF19)"}
$$
\sin 2A \equiv 2\sin A\cos A \qquad \tan 2A \equiv \frac{2\tan A}{1 - \tan^2 A}
$$

$$
\cos 2A \equiv \cos^2 A - \sin^2 A \equiv 2\cos^2 A - 1 \equiv 1 - 2\sin^2 A
$$
:::

:::definition{term="Compound angle"}
An angle written as a sum or difference of two angles, such as $A + B$ or $x - 30^\circ$.
:::

Watch the signs in the cosine formula: $\cos(A + B)$ has a **minus** sign in the middle and $\cos(A - B)$ has a **plus**. Cambridge prints all of these formulae in MF19, but you still need to recognise them quickly and choose the right form. ZIMSEC prints no list, so ZIMSEC candidates must learn them (or derive the double-angle forms by putting $B = A$).

## Exact values

Split an angle into two angles with known exact values: $75^\circ = 45^\circ + 30^\circ$, $15^\circ = 45^\circ - 30^\circ$ (or $60^\circ - 45^\circ$), $105^\circ = 60^\circ + 45^\circ$.

:::worked-solution[Example 1: find the exact values of $\sin 75^\circ$ and $\tan 15^\circ$]
1. $\sin 75^\circ = \sin(45^\circ + 30^\circ) = \sin 45^\circ\cos 30^\circ + \cos 45^\circ\sin 30^\circ$.
2. $= \dfrac{\sqrt{2}}{2} \cdot \dfrac{\sqrt{3}}{2} + \dfrac{\sqrt{2}}{2} \cdot \dfrac{1}{2} = \dfrac{\sqrt{6} + \sqrt{2}}{4}$.
3. $\tan 15^\circ = \tan(45^\circ - 30^\circ) = \dfrac{1 - \frac{1}{\sqrt{3}}}{1 + \frac{1}{\sqrt{3}}} = \dfrac{\sqrt{3} - 1}{\sqrt{3} + 1}$.
4. Rationalise: $\dfrac{(\sqrt{3} - 1)^2}{3 - 1} = \dfrac{4 - 2\sqrt{3}}{2} = 2 - \sqrt{3}$.
:::

:::worked-solution[Example 2: $A$ and $B$ are acute, $\sin A = \frac{3}{5}$ and $\cos B = \frac{5}{13}$. Find the exact values of $\sin(A + B)$ and $\cos(A + B)$]
1. From 3-4-5 and 5-12-13 triangles: $\cos A = \frac{4}{5}$ and $\sin B = \frac{12}{13}$ (both positive as the angles are acute).
2. $\sin(A + B) = \frac{3}{5} \cdot \frac{5}{13} + \frac{4}{5} \cdot \frac{12}{13} = \frac{15 + 48}{65} = \frac{63}{65}$.
3. $\cos(A + B) = \frac{4}{5} \cdot \frac{5}{13} - \frac{3}{5} \cdot \frac{12}{13} = \frac{20 - 36}{65} = -\frac{16}{65}$.
4. The negative cosine tells you that $A + B$ is obtuse.
:::

## Expanding and simplifying

Expanding compound angles with exact values for one of the angles turns an expression into the form $a\cos x + b\sin x$. This is how equations with two different compound angles are solved.

:::worked-solution[Example 3: express $\cos(x - 30^\circ) - 3\sin(x - 60^\circ)$ in the form $a\cos x + b\sin x$ and hence solve $\cos(x - 30^\circ) = 3\sin(x - 60^\circ)$ for $0^\circ \le x \le 360^\circ$]
1. $\cos(x - 30^\circ) = \frac{\sqrt{3}}{2}\cos x + \frac{1}{2}\sin x$.
2. $\sin(x - 60^\circ) = \frac{1}{2}\sin x - \frac{\sqrt{3}}{2}\cos x$, so $-3\sin(x - 60^\circ) = \frac{3\sqrt{3}}{2}\cos x - \frac{3}{2}\sin x$.
3. Add: $2\sqrt{3}\cos x - \sin x$.
4. The equation is $2\sqrt{3}\cos x - \sin x = 0$, so $\tan x = 2\sqrt{3}$.
5. $x = 73.9^\circ$ or $73.9^\circ + 180^\circ = 253.9^\circ$.
:::

## Choosing the right form of cos 2A

The three forms of $\cos 2A$ let you remove whichever function you do not want:

- If the equation also contains $\sin x$, use $\cos 2x = 1 - 2\sin^2 x$ to get a quadratic in $\sin x$.
- If it contains $\cos x$, use $\cos 2x = 2\cos^2 x - 1$.
- Rearranged, $\sin^2 A = \frac{1}{2}(1 - \cos 2A)$ and $\cos^2 A = \frac{1}{2}(1 + \cos 2A)$; these are essential in integration.

:::worked-solution[Example 4: prove that $\dfrac{1 - \cos 2\theta}{\sin 2\theta} \equiv \tan\theta$]
1. Numerator: $1 - (1 - 2\sin^2\theta) = 2\sin^2\theta$.
2. Denominator: $\sin 2\theta = 2\sin\theta\cos\theta$.
3. $\text{LHS} = \dfrac{2\sin^2\theta}{2\sin\theta\cos\theta} = \dfrac{\sin\theta}{\cos\theta} = \tan\theta = \text{RHS}$.
:::

:::worked-solution[Example 5: solve $\cos 2x + 3\sin x = 2$ for $0^\circ \le x \le 360^\circ$]
1. Use $\cos 2x = 1 - 2\sin^2 x$: $1 - 2\sin^2 x + 3\sin x = 2$.
2. Rearrange: $2\sin^2 x - 3\sin x + 1 = 0$.
3. Factorise: $(2\sin x - 1)(\sin x - 1) = 0$.
4. $\sin x = \frac{1}{2}$: $x = 30^\circ, 150^\circ$. $\sin x = 1$: $x = 90^\circ$.
5. Solutions: $30^\circ, 90^\circ, 150^\circ$.
:::

:::worked-solution[Example 6: given that $\tan A = \frac{1}{3}$, find the exact value of $\tan 2A$]
1. $\tan 2A = \dfrac{2 \times \frac{1}{3}}{1 - \left(\frac{1}{3}\right)^2} = \dfrac{\frac{2}{3}}{\frac{8}{9}}$.
2. $= \dfrac{2}{3} \times \dfrac{9}{8} = \dfrac{3}{4}$.
:::

## Triple angles and other identities

Compound and double angles combine: $\sin 3\theta = \sin(2\theta + \theta) = \sin 2\theta\cos\theta + \cos 2\theta\sin\theta$. Substituting the double-angle forms and $\cos^2\theta = 1 - \sin^2\theta$ gives $\sin 3\theta \equiv 3\sin\theta - 4\sin^3\theta$, and similarly $\cos 3\theta \equiv 4\cos^3\theta - 3\cos\theta$. Questions build these step by step with "show that", then "hence solve".

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the compound- and double-angle formulae, exact values, proofs and equations. Cambridge prints the compound- and double-angle formulae (MF19) and examines them in Paper 2 (AS only) and Paper 3 (A Level only). ZIMSEC excludes the half-angle "$t = \tan\frac{1}{2}\theta$" formulae.
:::

## Common mistakes

:::mistake{title="Distributing a function over a sum"}
$\sin(A + B) \neq \sin A + \sin B$ and $\sin 2A \neq 2\sin A$.
:::

:::mistake{title="Sign errors in cos(A ± B)"}
$\cos(A + B) = \cos A\cos B - \sin A\sin B$: the sign is the opposite of the one in the bracket.
:::

:::mistake{title="Wrong form of cos 2x"}
Using $\cos^2 x - \sin^2 x$ in an equation with $\sin x$ leaves two functions; choose $1 - 2\sin^2 x$.
:::

:::mistake{title="Dividing by cos x in sin 2x = cos x"}
$2\sin x\cos x = \cos x$ must be factorised: $\cos x(2\sin x - 1) = 0$, keeping the solutions with $\cos x = 0$.
:::

## Exam tips

:::exam-tip
For exact values, show the split ($75^\circ = 45^\circ + 30^\circ$), the substituted exact values and the simplified surd.
:::

:::exam-tip
"Show that" a triple-angle identity: write $3\theta = 2\theta + \theta$ on the first line so the method is clear.
:::

:::exam-tip
In "hence solve" with $\cos 3\theta$ or $\sin 2\theta$, change the interval for the multiple angle before solving, then divide.
:::

## Summary

:::summary
- $\sin(A \pm B) = \sin A\cos B \pm \cos A\sin B$; $\cos(A \pm B) = \cos A\cos B \mp \sin A\sin B$; $\tan(A \pm B) = \frac{\tan A \pm \tan B}{1 \mp \tan A\tan B}$.
- $\sin 2A = 2\sin A\cos A$; $\cos 2A = \cos^2 A - \sin^2 A = 2\cos^2 A - 1 = 1 - 2\sin^2 A$; $\tan 2A = \frac{2\tan A}{1 - \tan^2 A}$.
- Split angles like $75^\circ$ and $15^\circ$ into $45^\circ \pm 30^\circ$ for exact values.
- Pick the form of $\cos 2x$ that leaves a single trigonometric function.
- Factorise, never divide by $\sin x$ or $\cos x$.
:::
