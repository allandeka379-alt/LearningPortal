---
{
  "key": "vectors.magnitude-of-a-vector",
  "title": "Magnitude of a vector",
  "summary": "Calculate the magnitude (length) of a column vector using Pythagoras' theorem, use the modulus notation |a| and |AB|, and solve problems involving magnitudes of combined vectors and unknown components.",
  "concepts": ["math.vectors.magnitude"],
  "objectives": ["zimsec/o-level/mathematics:11.0.2", "cambridge/igcse/mathematics:7.3.1"],
  "estimatedMinutes": 25,
  "level": "extended"
}
---
## Introduction

The ranger in Gonarezhou walked 3 km east and then 4 km north. Her displacement is $\begin{pmatrix} 3 \\ 4 \end{pmatrix}$ km. How far is she from camp in a straight line? The two parts of the walk form the shorter sides of a right-angled triangle, so by Pythagoras she is $\sqrt{3^2 + 4^2} = 5$ km away.

That straight-line length is the **magnitude** of the vector. It is a scalar: a size without a direction. In context it might be a distance, a speed or the size of a force.

You should already know Pythagoras' theorem, how to simplify surds such as $\sqrt{20} = 2\sqrt{5}$, and how to add and multiply column vectors.

## Key definitions

:::definition{term="Magnitude (modulus)"}
The length of a vector. The magnitude of $\mathbf{a}$ is written $|\mathbf{a}|$, and the magnitude of $\overrightarrow{AB}$ is written $|\overrightarrow{AB}|$ or simply $AB$.
:::

:::formula{name="Magnitude of a column vector"}
$$
\left| \begin{pmatrix} x \\ y \end{pmatrix} \right| = \sqrt{x^2 + y^2}
$$
:::

:::keyfact{title="Magnitude is never negative"}
Squaring removes negative signs, so $|\mathbf{a}| \geq 0$, and a vector and its negative have the same magnitude: $|-\mathbf{a}| = |\mathbf{a}|$.
:::

## Calculating magnitudes

:::worked-solution[Example 1: three magnitudes]
1. $\left| \begin{pmatrix} -5 \\ 12 \end{pmatrix} \right| = \sqrt{25 + 144} = \sqrt{169} = 13$.
2. $\left| \begin{pmatrix} 2 \\ -7 \end{pmatrix} \right| = \sqrt{4 + 49} = \sqrt{53} = 7.28$ (3 s.f.).
3. $\left| \begin{pmatrix} 4 \\ -2 \end{pmatrix} \right| = \sqrt{16 + 4} = \sqrt{20} = 2\sqrt{5}$ exactly.
:::

### From two points

:::worked-solution[Example 2: the magnitude of $\overrightarrow{AB}$ for $A(-1, 3)$ and $B(5, -5)$]
1. $\overrightarrow{AB} = \begin{pmatrix} 5 - (-1) \\ -5 - 3 \end{pmatrix} = \begin{pmatrix} 6 \\ -8 \end{pmatrix}$.
2. $|\overrightarrow{AB}| = \sqrt{36 + 64} = \sqrt{100} = 10$.
3. This is the same as the length of the line segment $AB$.
:::

### Combined vectors

Always work out the combined vector **first**, then its magnitude.

:::worked-solution[Example 3: $|\mathbf{a} + 2\mathbf{b}|$ for $\mathbf{a} = \begin{pmatrix} 3 \\ -1 \end{pmatrix}$, $\mathbf{b} = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$]
1. $2\mathbf{b} = \begin{pmatrix} 2 \\ 4 \end{pmatrix}$.
2. $\mathbf{a} + 2\mathbf{b} = \begin{pmatrix} 5 \\ 3 \end{pmatrix}$.
3. $|\mathbf{a} + 2\mathbf{b}| = \sqrt{25 + 9} = \sqrt{34} = 5.83$ (3 s.f.).
:::

In general $|\mathbf{a} + \mathbf{b}|$ is **not** $|\mathbf{a}| + |\mathbf{b}|$. Here $|\mathbf{a}| = \sqrt{10}$ and $|2\mathbf{b}| = 2\sqrt{5}$, which add to about $7.63$, not $5.83$. The two lengths only add up when the vectors point in the same direction.

For a scalar multiple, though, the magnitude simply scales: $|k\mathbf{a}| = |k| \times |\mathbf{a}|$. If $|\mathbf{a}| = 6$, then $|-2\mathbf{a}| = 12$.

## Unknown components

:::worked-solution[Example 4: find $k$ if $\left| \begin{pmatrix} k \\ 6 \end{pmatrix} \right| = 10$]
1. $k^2 + 6^2 = 10^2$.
2. $k^2 + 36 = 100$, so $k^2 = 64$.
3. $k = 8$ or $k = -8$. Both vectors have length 10.
:::

:::worked-solution[Example 5: find $t$ if $\left| \begin{pmatrix} t \\ 2t \end{pmatrix} \right| = 10$ and $t > 0$]
1. $t^2 + (2t)^2 = 100$. Take care: $(2t)^2 = 4t^2$, not $2t^2$.
2. $5t^2 = 100$, so $t^2 = 20$.
3. $t = \sqrt{20} = 2\sqrt{5} = 4.47$ (3 s.f.), taking the positive root because $t > 0$.
:::

## Magnitudes in context

The magnitude of a displacement is a **distance**, the magnitude of a velocity is a **speed**, and the magnitude of a force is its **size** in newtons. In each case the column vector carries the direction, and the magnitude tells you "how much".

:::example{title="Speed from a velocity vector"}
A ferry on Lake Kariba has velocity $\begin{pmatrix} 12 \\ 9 \end{pmatrix}$ km/h. Its speed is the magnitude: $\sqrt{12^2 + 9^2} = \sqrt{144 + 81} = \sqrt{225} = 15$ km/h.
:::

![The ranger's walk from camp O: first (3, 4) km, a distance of 5 km to P, then (−5, 2) km, 5.39 km to Q; her total displacement is (−2, 6) km, so she is √40 = 6.32 km from camp although she walked 10.4 km.](media:diagrams/vector-magnitude-ranger-walk.png "Figure: the magnitude of the total displacement is shorter than the distance walked")

:::worked-solution[Example 6: how far from camp?]
The ranger walks $\begin{pmatrix} 3 \\ 4 \end{pmatrix}$ km and then $\begin{pmatrix} -5 \\ 2 \end{pmatrix}$ km. How far is she from camp, and how far has she walked?
1. Her total displacement is $\begin{pmatrix} 3 + (-5) \\ 4 + 2 \end{pmatrix} = \begin{pmatrix} -2 \\ 6 \end{pmatrix}$ km.
2. Distance from camp $= \sqrt{(-2)^2 + 6^2} = \sqrt{40} = 6.32$ km (3 s.f.).
3. Distance walked $= \sqrt{3^2 + 4^2} + \sqrt{(-5)^2 + 2^2} = 5 + \sqrt{29} = 5 + 5.39 = 10.4$ km (3 s.f.).
4. The straight-line distance from camp is much less than the distance walked, because the second leg turned back towards the west.
:::

### Comparing distances from the origin

The magnitude of a position vector $\overrightarrow{OP}$ is the distance of $P$ from the origin. For example, $P(5, 12)$ and $Q(12, -5)$ are both $\sqrt{169} = 13$ units from $O$, so they lie on the same circle centred at the origin, even though they are in different quadrants.

## Common mistakes

:::mistake{title="Not squaring negative components properly"}
$(-7)^2 = 49$, not $-49$. Use brackets on the calculator, or square the number without its sign.
:::

:::mistake{title="Forgetting the square root"}
$4^2 + 3^2 = 25$ is the magnitude **squared**. The magnitude is $\sqrt{25} = 5$.
:::

:::mistake{title="Adding magnitudes of different vectors"}
$|\mathbf{a} + \mathbf{b}| \neq |\mathbf{a}| + |\mathbf{b}|$ unless $\mathbf{a}$ and $\mathbf{b}$ point the same way. Combine the vectors first.
:::

:::mistake{title="Giving a negative magnitude"}
A length cannot be negative: $|-2\mathbf{a}| = 2|\mathbf{a}|$, not $-2|\mathbf{a}|$.
:::

## Exam tips

:::exam-tip
Unless the question asks for an exact value, give magnitudes correct to 3 significant figures, as in $\sqrt{53} = 7.28$. For "exact" answers, simplify the surd: $\sqrt{20} = 2\sqrt{5}$.
:::

:::exam-tip
Write the magnitude as a number (a scalar), not as a column vector. "$|\mathbf{a}| = 5$" is correct; "$|\mathbf{a}| = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$" is not.
:::

:::exam-tip
When an unknown component is squared, remember both signs: $k^2 = 64$ gives $k = \pm 8$. Use any extra information in the question to choose.
:::

## Summary

:::summary
- The magnitude of $\begin{pmatrix} x \\ y \end{pmatrix}$ is $\sqrt{x^2 + y^2}$, by Pythagoras.
- $|\mathbf{a}|$ and $|\overrightarrow{AB}|$ are scalars and never negative.
- Combine vectors first, then find the magnitude; $|\mathbf{a} + \mathbf{b}|$ is usually less than $|\mathbf{a}| + |\mathbf{b}|$.
- $|k\mathbf{a}| = |k||\mathbf{a}|$.
- Give exact surds when asked, otherwise 3 significant figures.
:::
