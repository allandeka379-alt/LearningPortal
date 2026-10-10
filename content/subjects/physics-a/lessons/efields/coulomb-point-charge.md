---
{
  "key": "efields.coulomb-point-charge",
  "title": "Coulomb's law and the field of a point charge",
  "summary": "State and use Coulomb's law for point charges in free space, treat a charged conducting sphere as a point charge, use E = Q/(4πε₀r²), add fields and forces from two charges along a line or at right angles, and compare electric and gravitational forces.",
  "concepts": ["aphys.efields.coulomb-point-charge"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Every atom is held together by electric forces: the electrons are bound to the nucleus by attraction between opposite charges, and the same forces, acting between atoms, make a steel cable of a mine hoist strong and a drop of water stick to a leaf. Charles Coulomb measured these forces in the 1780s with a delicate torsion balance and found a law with exactly the same shape as Newton's law of gravitation, an inverse-square law, but with charge in place of mass and a far larger constant.

This lesson states Coulomb's law, finds the field around a point charge, shows how to combine the fields of two charges, and compares the electric and gravitational forces between particles. You should know the definition of electric field strength ($E = F/q$), field lines, Newton's law of gravitation, and how to add vectors at right angles.

## Key definitions

:::definition{term="Coulomb's law"}
Two point charges exert forces on each other that are directly proportional to the product of the charges and inversely proportional to the square of their separation; like charges repel and unlike charges attract.
:::

:::formula{name="Coulomb's law in free space"}
$$
F = \frac{Q_1Q_2}{4\pi\varepsilon_0 r^2}
$$

$F$ force on each charge in N (positive: repulsion; negative: attraction); $Q_1$, $Q_2$ the charges in C; $r$ separation of their centres in m; $\varepsilon_0 = 8.85 \times 10^{-12}\ \text{F m}^{-1}$, the permittivity of free space, so $\dfrac{1}{4\pi\varepsilon_0} = 8.99 \times 10^{9}\ \text{m F}^{-1}$. Air behaves almost exactly like free space.
:::

:::formula{name="Field strength of a point charge"}
$$
E = \frac{Q}{4\pi\varepsilon_0 r^2}
$$

$E$ electric field strength in $\text{N C}^{-1}$ at a distance $r$ in m from a point charge $Q$ in C; directed away from a positive charge and towards a negative one.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 5 and Cambridge A Level (18.3, Paper 4). Cambridge states that a uniform charged conducting sphere acts as a point charge at its centre for points outside it; both boards use the free-space form with $\varepsilon_0$.
:::

## Spheres as point charges

On a charged conducting sphere the charge spreads evenly over the outer surface. For any point **outside** the sphere, its field and the force it exerts are the same as those of a point charge equal to the total charge, placed at the centre. So, as with planets in gravitation, $r$ is always measured from the **centre**. (Inside a conducting sphere the field is zero; that is beyond what you are asked to calculate.)

## Deriving the field of a point charge

1. Place a small positive test charge $q$ at distance $r$ from a point charge $Q$.
2. Coulomb's law gives the force on it: $F = \dfrac{Qq}{4\pi\varepsilon_0 r^2}$.
3. Field strength is force per unit positive charge: $E = \dfrac{F}{q} = \dfrac{Q}{4\pi\varepsilon_0 r^2}$.

Like $g$, $E$ follows an inverse-square law. For a $10\ \text{nC}$ charge:

| $r\,/\,\text{m}$ | $E\,/\,\text{N C}^{-1}$ |
| --- | --- |
| 0.05 | 36 000 |
| 0.10 | 8990 |
| 0.20 | 2250 |
| 0.40 | 562 |

Each doubling of $r$ divides $E$ by four. The field lines are radial: outwards from a positive charge, inwards to a negative one, spreading apart as the field weakens.

## Combining fields and forces

Fields and forces are vectors, so the contributions of two charges are added as vectors.

- **Along a line:** decide the direction of each field at the point (away from positive, towards negative), then add with signs. Between two **like** charges the fields oppose, so somewhere between them there is a **neutral point** where $E = 0$; it lies closer to the smaller charge. Between two **unlike** charges the fields add, so there is no neutral point between them.
- **At right angles:** find each field's magnitude, then use Pythagoras for the resultant, $E = \sqrt{E_1^2 + E_2^2}$, and trigonometry for its direction.

For example, with $+2.0\ \text{nC}$ at $x = 0$ and $+8.0\ \text{nC}$ at $x = 0.30\ \text{m}$, the neutral point satisfies $\dfrac{2.0}{x^2} = \dfrac{8.0}{(0.30 - x)^2}$, so $\dfrac{0.30 - x}{x} = 2$ and $x = 0.10\ \text{m}$.

## Electric versus gravitational forces

Both forces follow inverse-square laws, so their **ratio** for two particles does not depend on the separation. For two protons:

$$
\frac{F_E}{F_G} = \frac{e^2/4\pi\varepsilon_0}{Gm_p^2} = \frac{8.99 \times 10^{9} \times (1.60 \times 10^{-19})^2}{6.67 \times 10^{-11} \times (1.67 \times 10^{-27})^2} = 1.24 \times 10^{36}
$$

Gravity is utterly negligible between charged particles. It dominates on the scale of planets only because large bodies are almost exactly neutral, while mass is always positive and adds up. Two further differences: gravitational forces are always attractive, whereas electric forces may attract or repel; and the electric force depends on the medium between the charges (through its permittivity), the gravitational force does not.

## Worked examples

:::worked-solution[Force between two charged spheres]
Two small charged spheres carry $+4.0 \times 10^{-8}\ \text{C}$ and $-2.5 \times 10^{-8}\ \text{C}$. Their centres are $0.12\ \text{m}$ apart in air. Find the force between them.

1. $F = \dfrac{Q_1Q_2}{4\pi\varepsilon_0r^2} = \dfrac{8.99 \times 10^{9} \times 4.0 \times 10^{-8} \times 2.5 \times 10^{-8}}{0.12^2}$ (magnitudes only).
2. $F = 6.24 \times 10^{-4}\ \text{N}$.
3. The charges are unlike, so the force is attractive: each sphere is pulled towards the other.
:::

:::worked-solution[Resultant field from two charges at right angles]
Point P is $0.040\ \text{m}$ directly above a $+2.0\ \text{nC}$ charge and $0.030\ \text{m}$ directly to the right of a $+1.0\ \text{nC}$ charge. Find the resultant field at P.

1. From the $2.0\ \text{nC}$ charge: $E_1 = \dfrac{8.99 \times 10^{9} \times 2.0 \times 10^{-9}}{0.040^2} = 1.12 \times 10^{4}\ \text{N C}^{-1}$, vertically upwards (away from the charge).
2. From the $1.0\ \text{nC}$ charge: $E_2 = \dfrac{8.99 \times 10^{9} \times 1.0 \times 10^{-9}}{0.030^2} = 9.99 \times 10^{3}\ \text{N C}^{-1}$, horizontally to the right.
3. Resultant: $E = \sqrt{E_1^2 + E_2^2} = 1.50 \times 10^{4}\ \text{N C}^{-1}$.
4. Direction: $\tan\theta = E_1/E_2$, so $\theta = 48.4^\circ$ above the horizontal, pointing up and to the right.
:::

## Common mistakes

:::mistake{title="Forgetting to square r"}
Both $F$ and $E$ vary as $1/r^2$. Halving the distance makes them four times larger.
:::

:::mistake{title="Adding fields as numbers"}
Fields are vectors. Two fields at right angles of $3$ and $4\ \text{N C}^{-1}$ give $5\ \text{N C}^{-1}$, not $7$. Always state directions.
:::

:::mistake{title="Neutral point between unlike charges"}
Between a positive and a negative charge both fields point the same way (towards the negative charge), so they cannot cancel there.
:::

:::mistake{title="Surface instead of centre"}
For a charged sphere, measure $r$ from its centre, not from its surface.
:::

:::mistake{title="Prefixes"}
$1\ \text{nC} = 10^{-9}\ \text{C}$ and $1\ \mu\text{C} = 10^{-6}\ \text{C}$. Convert before substituting.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Form 5) and Cambridge Paper 4. Expect a statement of Coulomb's law, a two-charge field calculation, and a comparison with gravity.
:::

:::exam-tip{title="Command words"}
*State* Coulomb's law: "point charges", "product of the charges", "inverse square of separation". *Show that* $E = Q/4\pi\varepsilon_0r^2$: divide Coulomb's force by the test charge. *Calculate* a resultant field: draw a quick sketch, label each field's direction, then combine. *Compare* electric and gravitational forces: both inverse-square; electric can repel, depends on the medium, and is about $10^{36}$ times stronger for two protons.
:::

## Summary

:::summary
- Coulomb's law: $F = Q_1Q_2/4\pi\varepsilon_0r^2$ for point charges; like charges repel, unlike attract.
- A charged conducting sphere acts as a point charge at its centre for outside points.
- Point-charge field: $E = Q/4\pi\varepsilon_0r^2$, radial, away from $+Q$ and towards $-Q$.
- Fields and forces from several charges add as vectors; like charges have a neutral point between them.
- Electric forces between particles dwarf gravitational ones (ratio about $10^{36}$ for protons).
:::
