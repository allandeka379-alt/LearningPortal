---
{
  "key": "solids.hookes-law",
  "title": "Load, extension and Hooke's law",
  "summary": "Describe tensile and compressive deformation, state Hooke's law and the limit of proportionality, find the spring constant from data, compare force-extension graphs of springs, wires, rubber and polythene, and combine springs in series and parallel.",
  "concepts": ["aphys.solids.hookes-law"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

The suspension springs of a kombi, the steel cables of a mine hoist, the rubber straps that hold a load on a scotch cart and the bathroom scale all stretch or squash when a force acts on them. How much they deform, and whether they return to their original shape, decides whether they are safe to use. This lesson describes how a solid responds to a load in one dimension, starting with Hooke's law.

You should know that a force can change the shape of an object and that weight $= mg$. Stress, strain and the Young modulus follow in the next lesson, and the energy stored in a stretched material in the lesson after that.

## Key definitions

:::definition{term="Tensile force and compressive force"}
A tensile force is a pair of equal and opposite forces that stretch an object; a compressive force is a pair that squash it.
:::

:::definition{term="Extension"}
The increase in length of an object from its original (unloaded) length when a tensile load acts on it. Compression is the decrease in length under a compressive load.
:::

:::definition{term="Hooke's law"}
The extension of an object is directly proportional to the load applied, provided the limit of proportionality is not exceeded.
:::

:::definition{term="Limit of proportionality"}
The point beyond which the extension is no longer proportional to the load.
:::

:::definition{term="Spring constant"}
The force per unit extension of a spring or wire obeying Hooke's law: $k = F/x$, in $\text{N m}^{-1}$.
:::

:::formula{name="Hooke's law"}
$$
F = kx
$$

$F$ is the load (tension) in N, $x$ the extension in m, $k$ the spring constant in $\text{N m}^{-1}$. A stiffer object has a larger $k$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require Hooke's law, the spring constant and force-extension graphs (Cambridge AS 6.1; ZIMSEC Form 6). Springs in series and in parallel are given here for ZIMSEC (detail to be confirmed with the current syllabus); Cambridge does not require them.
:::

## Measuring load and extension

A spring (or wire) hangs from a clamp, with a metre rule clamped vertically beside it and a pointer fixed to the lower end. Measure the original length, then add masses in equal steps and record the length each time. The extension is always measured from the **original** length, not from the previous reading. Read the pointer at eye level to avoid parallax, and wear goggles in case the spring snaps or flies off.

:::worked-solution[Finding a spring constant from data]
Masses are added to a spring of original length $15.0\ \text{cm}$.

| Load $F\,/\,\text{N}$ | Length $/\,\text{cm}$ | Extension $x\,/\,\text{cm}$ |
| --- | --- | --- |
| 0.0 | 15.0 | 0.0 |
| 1.0 | 17.6 | 2.6 |
| 2.0 | 20.0 | 5.0 |
| 3.0 | 22.4 | 7.4 |
| 4.0 | 25.1 | 10.1 |
| 5.0 | 27.5 | 12.5 |
| 6.0 | 31.2 | 16.2 |

1. Plot load $F$ (y-axis) against extension $x$ (x-axis). The first six points lie close to a straight line through the origin; the last point lies well off it, so the limit of proportionality has been passed between 5.0 N and 6.0 N.
2. Gradient of the best-fit line, using the origin and the point $(0.125\ \text{m},\ 5.0\ \text{N})$ on the line: $k = \dfrac{5.0}{0.125} = 40\ \text{N m}^{-1}$.
3. Hooke's law is obeyed up to 5.0 N with $k = 40\ \text{N m}^{-1}$: the extension doubles when the load doubles.
:::

If you plot extension against load instead, the gradient is $1/k$. Either is acceptable; say which you plotted.

## Force-extension graphs for different materials

| Material | Shape of the force-extension graph | What it shows |
| --- | --- | --- |
| Steel spring | Straight line through the origin up to the limit of proportionality, then curving | Obeys Hooke's law over a large extension because the coils bend and twist |
| Metal wire (e.g. copper) | Straight and very steep at first, then a limit of proportionality, then a large extension for little extra force before breaking | Small extensions; ductile metals flow plastically after the elastic limit |
| Rubber band | Curved from the start: easy to stretch at first, then much stiffer; unloading curve lies below loading curve | Does not obey Hooke's law; long molecules uncoil, then the bonds themselves are stretched |
| Polythene strip | Small linear region, then extends a great deal under nearly constant force | Plastic deformation; it does not return to its original length |

Compressions follow the same law for springs, with $x$ the compression, until the coils touch.

## Springs in series and in parallel

Two identical springs, each of constant $k$, can be joined in two ways.

- **In series** (one below the other): each spring carries the full load $F$, so each extends $F/k$. Total extension $2F/k$, so the combined constant is $k/2$. In general $\dfrac{1}{k_{\text{total}}} = \dfrac{1}{k_1} + \dfrac{1}{k_2}$.
- **In parallel** (side by side, sharing the load equally): each spring carries $F/2$ and extends $F/(2k)$. The combined constant is $2k$. In general $k_{\text{total}} = k_1 + k_2$.

:::worked-solution[Two springs carrying a load]
Two springs, each with $k = 60\ \text{N m}^{-1}$, support a load of $4.5\ \text{N}$.

1. In series: $k_{\text{total}} = \dfrac{60}{2} = 30\ \text{N m}^{-1}$; extension $= \dfrac{4.5}{30} = 0.15\ \text{m}$.
2. In parallel: $k_{\text{total}} = 60 + 60 = 120\ \text{N m}^{-1}$; extension $= \dfrac{4.5}{120} = 0.0375\ \text{m} = 3.75\ \text{cm}$.
3. The parallel arrangement is four times stiffer than the series arrangement, which is why vehicle suspensions often use several leaves or springs side by side.
:::

Note that the rules for combining spring constants are the **reverse** of those for resistors.

## Common mistakes

:::mistake{title="Using length instead of extension"}
$F = kx$ uses the **extension** (new length − original length). Using the total length gives a wrong, non-proportional result.
:::

:::mistake{title="Saying Hooke's law always applies"}
It applies only up to the limit of proportionality. Rubber does not obey it at all.
:::

:::mistake{title="Confusing the limit of proportionality and the elastic limit"}
The limit of proportionality is where the graph stops being straight; the elastic limit is where permanent deformation begins. They are close for metals but not the same point.
:::

:::mistake{title="Units of k"}
If the extension is in cm, convert to m before quoting $k$ in $\text{N m}^{-1}$: 5.0 N for 12.5 cm is $40\ \text{N m}^{-1}$, not $0.40$.
:::

## Exam tips

:::exam-tip{title="State Hooke's law fully"}
Include "directly proportional" **and** "provided the limit of proportionality is not exceeded". The second phrase is often the mark that is missed.
:::

:::exam-tip{title="Graph questions"}
*Determine the spring constant*: use the gradient of the straight part of $F$ against $x$, from a large triangle, with the unit. *Describe the graph you would sketch*: name the axes, the straight region through the origin, the limit of proportionality and the curve beyond it.
:::

:::exam-tip{title="Which papers"}
Hooke's law appears in Cambridge Papers 1, 2 and 3 (a spring extension experiment is a common practical) and in ZIMSEC Papers 1, 2 and 4.
:::

## Summary

:::summary
- Tensile forces stretch; compressive forces squash. Extension is measured from the original length.
- Hooke's law: extension ∝ load up to the limit of proportionality; $F = kx$.
- The spring constant $k$ is the gradient of a load-extension graph, in $\text{N m}^{-1}$.
- Springs obey Hooke's law over a wide range; metal wires over small extensions; rubber not at all; polythene deforms plastically.
- Series: $1/k = 1/k_1 + 1/k_2$; parallel: $k = k_1 + k_2$.
:::
