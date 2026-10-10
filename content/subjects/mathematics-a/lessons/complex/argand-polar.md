---
{
  "key": "complex.argand-polar",
  "title": "The Argand diagram, modulus–argument and polar form",
  "summary": "Plot complex numbers on an Argand diagram, find the modulus and principal argument, write numbers in the polar form r(cos θ + i sin θ) = re^(iθ), multiply and divide in polar form and describe the geometric effect of each operation.",
  "concepts": ["amaths.complex.argand-polar"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A complex number $x + \mathrm{i}y$ carries two pieces of information, so it fits naturally on a plane: the real part across and the imaginary part up. This picture, the **Argand diagram**, turns algebra into geometry. Adding complex numbers becomes adding vectors, and multiplying them becomes a rotation combined with an enlargement. Navigation and signal-processing software uses exactly this idea to rotate directions without trigonometric tables.

ZIMSEC introduces the Argand diagram in Form 5 and the polar form in Form 6 (topic 6.7). Cambridge examines everything in this lesson in Paper 3 (A Level only, topic 3.9), usually inside a longer complex-numbers question.

## Key definitions

:::definition{term="Argand diagram"}
A plane with a horizontal **real axis** and a vertical **imaginary axis**. The number $x + \mathrm{i}y$ is the point $(x, y)$, or the vector from the origin to that point.
:::

:::definition{term="Modulus"}
The distance of $z = x + \mathrm{i}y$ from the origin: $|z| = r = \sqrt{x^2 + y^2}$.
:::

:::definition{term="Argument"}
The angle $\theta$ between the positive real axis and the line from the origin to $z$, measured anticlockwise (positive) or clockwise (negative). The **principal argument** satisfies $-\pi < \theta \le \pi$. Arguments are given in radians.
:::

:::formula{name="Polar (modulus–argument) and exponential form"}
$$
z = r(\cos\theta + \mathrm{i}\sin\theta) = r\mathrm{e}^{\mathrm{i}\theta}, \qquad x = r\cos\theta, \quad y = r\sin\theta
$$
:::

MF19 does not list these; learn them. The exponential form is a compact way of writing the polar form, and Cambridge expects you to use both.

## Finding the argument safely

The calculator's $\tan^{-1}\left(\frac{y}{x}\right)$ only gives angles between $-\frac{\pi}{2}$ and $\frac{\pi}{2}$, so it is wrong for points in the second and third quadrants. The safe method is to **draw a sketch**, find the acute angle $\alpha = \tan^{-1}\left|\frac{y}{x}\right|$, and then adjust:

| Quadrant of $z$ | Principal argument |
| --- | --- |
| First ($x > 0, y > 0$) | $\alpha$ |
| Second ($x < 0, y > 0$) | $\pi - \alpha$ |
| Third ($x < 0, y < 0$) | $-(\pi - \alpha)$ |
| Fourth ($x > 0, y < 0$) | $-\alpha$ |

:::worked-solution[Example 1: find the modulus and principal argument of $-1 + \mathrm{i}\sqrt{3}$, of $-3 - 3\mathrm{i}$ and of $4 - 7\mathrm{i}$]
1. $|-1 + \mathrm{i}\sqrt{3}| = \sqrt{1 + 3} = 2$. The point is in the second quadrant; $\alpha = \tan^{-1}\sqrt{3} = \frac{\pi}{3}$, so $\arg = \pi - \frac{\pi}{3} = \frac{2\pi}{3}$.
2. $|-3 - 3\mathrm{i}| = \sqrt{18} = 3\sqrt{2}$. Third quadrant; $\alpha = \frac{\pi}{4}$, so $\arg = -\left(\pi - \frac{\pi}{4}\right) = -\frac{3\pi}{4}$.
3. $|4 - 7\mathrm{i}| = \sqrt{65} = 8.06$ (3 s.f.). Fourth quadrant; $\alpha = \tan^{-1}\frac{7}{4} = 1.0517$, so $\arg = -1.05$ radians (3 s.f.).
:::

## Multiplying and dividing in polar form

Expanding $r_1(\cos\theta_1 + \mathrm{i}\sin\theta_1) \times r_2(\cos\theta_2 + \mathrm{i}\sin\theta_2)$ and using the compound-angle formulae gives $r_1r_2(\cos(\theta_1 + \theta_2) + \mathrm{i}\sin(\theta_1 + \theta_2))$. With the exponential form this is just the laws of indices:

:::formula{name="Products and quotients"}
$$
|z_1z_2| = |z_1||z_2|, \quad \arg(z_1z_2) = \arg z_1 + \arg z_2; \qquad \left|\frac{z_1}{z_2}\right| = \frac{|z_1|}{|z_2|}, \quad \arg\frac{z_1}{z_2} = \arg z_1 - \arg z_2
$$
:::

The argument rules hold "up to a multiple of $2\pi$": if the sum falls outside $(-\pi, \pi]$, add or subtract $2\pi$ to give the principal value.

:::worked-solution[Example 2: given $z = 4\mathrm{e}^{\mathrm{i}\pi/3}$ and $w = 2\mathrm{e}^{-\mathrm{i}\pi/4}$, find $zw$ and $\dfrac{z}{w}$ in the form $r\mathrm{e}^{\mathrm{i}\theta}$]
1. $zw$: multiply the moduli, $4 \times 2 = 8$; add the arguments, $\frac{\pi}{3} - \frac{\pi}{4} = \frac{\pi}{12}$. So $zw = 8\mathrm{e}^{\mathrm{i}\pi/12}$.
2. $\frac{z}{w}$: divide the moduli, $\frac{4}{2} = 2$; subtract the arguments, $\frac{\pi}{3} + \frac{\pi}{4} = \frac{7\pi}{12}$. So $\frac{z}{w} = 2\mathrm{e}^{7\pi\mathrm{i}/12}$.
3. Both arguments already lie in $(-\pi, \pi]$, so no adjustment is needed.
:::

## Geometric effects

Each operation has a picture on the Argand diagram:

- **Conjugating** reflects $z$ in the real axis ($\arg z^{*} = -\arg z$, same modulus).
- **Adding** $w$ translates $z$ by the vector $w$ (the parallelogram rule); $z - w$ is the vector from $w$ to $z$, so $|z - w|$ is the distance between the two points.
- **Multiplying** by $w = r\mathrm{e}^{\mathrm{i}\alpha}$ enlarges by scale factor $r$ about the origin and rotates anticlockwise through $\alpha$. In particular, multiplying by $\mathrm{i}$ rotates through $\frac{\pi}{2}$: $\mathrm{i}(3 + \mathrm{i}) = -1 + 3\mathrm{i}$.
- **Dividing** by $w$ enlarges by $\frac{1}{r}$ and rotates clockwise through $\alpha$.

## A typical exam question

:::worked-solution[Example 3: $u = -2 + 2\mathrm{i}$ and $v = 1 + \mathrm{i}\sqrt{3}$. (a) Find the modulus and argument of $u$ and of $v$. (b) Hence find $\left|\frac{u}{v}\right|$ and $\arg\frac{u}{v}$. (c) Find the modulus and principal argument of $uv$.]
1. (a) $|u| = \sqrt{8} = 2\sqrt{2}$; second quadrant with $\alpha = \frac{\pi}{4}$, so $\arg u = \frac{3\pi}{4}$.
2. $|v| = \sqrt{1 + 3} = 2$; first quadrant, $\arg v = \tan^{-1}\sqrt{3} = \frac{\pi}{3}$.
3. (b) $\left|\frac{u}{v}\right| = \frac{2\sqrt{2}}{2} = \sqrt{2}$ and $\arg\frac{u}{v} = \frac{3\pi}{4} - \frac{\pi}{3} = \frac{5\pi}{12}$.
4. (c) $|uv| = 2\sqrt{2} \times 2 = 4\sqrt{2}$ and $\arg u + \arg v = \frac{3\pi}{4} + \frac{\pi}{3} = \frac{13\pi}{12}$.
5. $\frac{13\pi}{12} > \pi$, so subtract $2\pi$: the principal argument of $uv$ is $-\frac{11\pi}{12}$.
6. Check: $uv = (-2 + 2\mathrm{i})(1 + \mathrm{i}\sqrt{3}) = (-2 - 2\sqrt{3}) + (2 - 2\sqrt{3})\mathrm{i}$, which has both parts negative, so it is in the third quadrant, as $-\frac{11\pi}{12}$ says.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge (Paper 3) uses the principal argument $-\pi < \theta \le \pi$ and accepts either $r(\cos\theta + \mathrm{i}\sin\theta)$ or $r\mathrm{e}^{\mathrm{i}\theta}$. ZIMSEC introduces modulus, argument and the Argand diagram in Form 5 and polar form in Form 6; some ZIMSEC texts use $0 \le \theta < 2\pi$, so read the range given in the question.
:::

## Common mistakes

:::mistake{title="Trusting tan⁻¹(y/x) blindly"}
For $-3 - 3\mathrm{i}$, $\tan^{-1}\frac{-3}{-3} = \frac{\pi}{4}$, which is the argument of $3 + 3\mathrm{i}$, the opposite point. Always sketch.
:::

:::mistake{title="Using degrees"}
Arguments are in radians unless the question says otherwise.
:::

:::mistake{title="Forgetting to adjust the argument"}
Adding arguments can give a value outside $(-\pi, \pi]$; add or subtract $2\pi$ for the principal argument.
:::

:::mistake{title="Multiplying the arguments"}
For a product, **multiply moduli and add arguments**. Arguments behave like logarithms (indices), not like moduli.
:::

## Exam tips

:::exam-tip
Give exact arguments as multiples of $\pi$ where possible ($\frac{2\pi}{3}$, not $2.09$); otherwise give 3 significant figures in radians.
:::

:::exam-tip
A quick sketch of the Argand diagram earns nothing by itself, but it prevents the most common error in this topic: the wrong quadrant.
:::

:::exam-tip
"Hence" after finding moduli and arguments means use the product and quotient rules, not Cartesian multiplication.
:::

## Summary

:::summary
- The Argand diagram plots $x + \mathrm{i}y$ at $(x, y)$.
- $|z| = \sqrt{x^2 + y^2}$; the principal argument lies in $(-\pi, \pi]$ and is found from a sketch.
- $z = r(\cos\theta + \mathrm{i}\sin\theta) = r\mathrm{e}^{\mathrm{i}\theta}$.
- Products: multiply moduli, add arguments. Quotients: divide moduli, subtract arguments; then adjust by $2\pi$ if needed.
- Conjugate = reflection in the real axis; adding = translation; multiplying by $r\mathrm{e}^{\mathrm{i}\alpha}$ = enlargement $r$ and rotation $\alpha$.
:::
