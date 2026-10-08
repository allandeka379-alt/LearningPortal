---
{
  "key": "trigonometry.pythagoras-theorem",
  "title": "Pythagoras' theorem",
  "summary": "Use Pythagoras' theorem to find the hypotenuse or a shorter side of a right-angled triangle, recognise Pythagorean triples, test whether a triangle is right-angled, and solve problems with ladders, plots and screens.",
  "concepts": ["math.trigonometry.pythagoras"],
  "objectives": ["zimsec/o-level/mathematics:10.1.1", "cambridge/igcse/mathematics:6.1.1"],
  "estimatedMinutes": 20,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

When builders in Zimbabwe peg out the foundations of a house, they often check a corner with a tape measure: 3 m along one wall, 4 m along the other, and if the diagonal between the marks is exactly 5 m, the corner is square. This trick works because of **Pythagoras' theorem**, one of the most useful results in mathematics.

The theorem connects the three sides of any right-angled triangle. With it you can find the length of a ladder, the diagonal of a field or a screen, or the distance between two points, without measuring it directly.

You should be able to square numbers and find square roots on a calculator, and round answers to 3 significant figures.

## Key definitions

:::definition{term="Hypotenuse"}
The longest side of a right-angled triangle. It is always **opposite the right angle**.
:::

:::definition{term="Pythagoras' theorem"}
In a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.
:::

:::formula{name="Pythagoras' theorem (c is the hypotenuse)"}
$$
a^2 + b^2 = c^2
$$
:::

:::definition{term="Pythagorean triple"}
Three whole numbers that fit $a^2 + b^2 = c^2$, such as $3, 4, 5$ or $5, 12, 13$.
:::

## Finding the hypotenuse

Square the two shorter sides, **add**, then take the square root.

:::worked-solution[Example 1: the hypotenuse of a triangle with sides 7 cm and 10 cm]
1. The hypotenuse $c$ is opposite the right angle.
2. $c^2 = 7^2 + 10^2 = 49 + 100 = 149$.
3. $c = \sqrt{149} = 12.206\ldots = 12.2$ cm (3 s.f.).
4. Check: $12.2$ cm is longer than both other sides, as a hypotenuse must be.
:::

## Finding a shorter side

Square the hypotenuse and the known side, **subtract**, then take the square root.

:::worked-solution[Example 2: a ladder against a wall]
A ladder 6.5 m long leans against a vertical wall. Its foot is 2.5 m from the wall on level ground. How high up the wall does it reach?
1. The wall and the ground meet at a right angle, so the ladder is the hypotenuse.
2. $h^2 + 2.5^2 = 6.5^2$, so $h^2 = 42.25 - 6.25 = 36$.
3. $h = \sqrt{36} = 6$ m.
:::

:::worked-solution[Example 3: the diagonal of a rectangular plot]
A rectangular plot is 40 m long and 25 m wide. Find the length of its diagonal.
1. The diagonal is the hypotenuse of a right-angled triangle with sides 40 m and 25 m.
2. $d^2 = 40^2 + 25^2 = 1600 + 625 = 2225$.
3. $d = \sqrt{2225} = 47.16\ldots = 47.2$ m (3 s.f.).
:::

## Pythagorean triples

These whole-number triples appear often in examinations, so recognising them saves time:

| Triple | Check |
| --- | --- |
| $3, 4, 5$ | $9 + 16 = 25$ |
| $5, 12, 13$ | $25 + 144 = 169$ |
| $8, 15, 17$ | $64 + 225 = 289$ |
| $7, 24, 25$ | $49 + 576 = 625$ |

Any whole-number multiple of a triple is also a triple: $6, 8, 10$ and $9, 12, 15$ both come from $3, 4, 5$. Scaling by a decimal still gives a right-angled triangle: sides of $1.5$ m, $2$ m and $2.5$ m fit $1.5^2 + 2^2 = 2.5^2$.

## Is the triangle right-angled? (the converse)

The theorem also works backwards. If the sides satisfy $a^2 + b^2 = c^2$, where $c$ is the longest side, then the triangle **is** right-angled, and the right angle is opposite $c$.

:::worked-solution[Example 4: testing a triangle with sides 20 cm, 21 cm and 29 cm]
1. The longest side is 29 cm.
2. $20^2 + 21^2 = 400 + 441 = 841$.
3. $29^2 = 841$.
4. The two results are equal, so the triangle is right-angled, with the right angle opposite the 29 cm side.
:::

If the two results are not equal, the triangle is not right-angled. The builders' 3-4-5 check uses exactly this idea.

## Spotting right angles in context

Many problems hide the right-angled triangle. Look for walls meeting level ground, the corners of rectangles, the height of an isosceles triangle (which cuts the base in half at $90^\circ$), and horizontal and vertical distances on a grid.

:::worked-solution[Example 5: the height of a roof]
Two equal rafters, each 4.1 m long, meet at the top of a roof that spans 8 m. How high is the top of the roof above the ends of the rafters?
1. The vertical line from the top to the middle of the span cuts the triangle into two right-angled triangles.
2. Each has hypotenuse 4.1 m (a rafter) and base $8 \div 2 = 4$ m.
3. $h^2 = 4.1^2 - 4^2 = 16.81 - 16 = 0.81$, so $h = \sqrt{0.81} = 0.9$ m.
:::

:::worked-solution[Example 6: the distance between two points]
Find the distance between $P(-3, 1)$ and $Q(2, 13)$.
1. Across: $2 - (-3) = 5$. Up: $13 - 1 = 12$.
2. $PQ^2 = 5^2 + 12^2 = 25 + 144 = 169$.
3. $PQ = 13$ units.
:::

:::note{title="Exact answers (Cambridge Extended)"}
On a non-calculator paper, leave the answer as a surd in its simplest form. For shorter sides of 3 cm and 3 cm, $c = \sqrt{18} = \sqrt{9 \times 2} = 3\sqrt{2}$ cm.
:::

## Common mistakes

:::mistake{title="Adding when you should subtract"}
To find a **shorter** side, subtract: $b^2 = c^2 - a^2$. Adding would give a length longer than the hypotenuse, which is impossible.
:::

:::mistake{title="Forgetting the square root"}
$c^2 = 149$ is not the answer; $c = \sqrt{149}$ is. Ask yourself whether the answer is a sensible length.
:::

:::mistake{title="Squaring the sum"}
$7^2 + 10^2 = 149$, but $(7 + 10)^2 = 289$. Square each side separately, then add.
:::

:::mistake{title="Using the wrong side as the hypotenuse"}
The hypotenuse is opposite the right angle, and it is always the longest side. Find it before you substitute.
:::

## Exam tips

:::exam-tip
Write the equation first, for example $h^2 + 2.5^2 = 6.5^2$. It earns the method mark even if the arithmetic slips.
:::

:::exam-tip
Give answers to 3 significant figures unless the question says otherwise, and keep the full calculator value if you use it in a later part.
:::

:::exam-tip
In a "show that the triangle is right-angled" question, compute both $a^2 + b^2$ and $c^2$, show they are equal, and write a conclusion.
:::

## Summary

:::summary
- In a right-angled triangle, $a^2 + b^2 = c^2$, where $c$ is the hypotenuse (opposite the right angle).
- Hypotenuse: add the squares, then square root. Shorter side: subtract the squares, then square root.
- Pythagorean triples such as $3, 4, 5$, $5, 12, 13$, $8, 15, 17$ and $7, 24, 25$ give whole-number answers.
- If $a^2 + b^2 = c^2$ for the sides of a triangle, it is right-angled.
- Look for hidden right angles: walls and ground, rectangles, heights of isosceles triangles.
:::
