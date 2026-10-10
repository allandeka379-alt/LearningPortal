---
{
  "key": "membranes.surface-area-volume",
  "title": "Surface area to volume ratio and diffusion",
  "summary": "Calculating the surface area, volume and SA:V ratio of cubes, cuboids and cylinders, why SA:V falls as size increases, what this means for diffusion and the need for exchange surfaces and transport systems, and the agar block investigation.",
  "concepts": ["abio.membranes.surface-area-volume"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

An amoeba in a pond near Masvingo gets all the oxygen it needs by diffusion across its surface. An elephant in Hwange cannot: oxygen diffusing in through its skin would reach only a thin outer layer of cells. The difference is not just size but the **ratio of surface area to volume**. This lesson shows how to calculate that ratio, why it falls as organisms get bigger, and how this explains the evolution of lungs, gills, leaves and circulatory systems.

You should already know the factors that affect the rate of diffusion and how to calculate the area of a rectangle and a circle.

## Key definitions

:::definition{term="Surface area to volume ratio (SA:V)"}
The surface area of an object divided by its volume, in the same length unit; it tells you how much surface is available for exchange per unit volume that must be supplied.
:::

:::definition{term="Exchange surface"}
A specialised surface, such as the alveoli, gill filaments or villi, with a large surface area, a short diffusion distance and (usually) a means of maintaining a steep concentration gradient.
:::

:::formula{name="Cube of side l"}
$$
\text{SA} = 6l^2 \qquad V = l^3 \qquad \frac{\text{SA}}{V} = \frac{6}{l}
$$
:::

:::formula{name="Cuboid l × w × h and cylinder of radius r, height h"}
$$
\text{SA}_{\text{cuboid}} = 2(lw + lh + wh) \qquad V_{\text{cuboid}} = lwh
$$

$$
\text{SA}_{\text{cylinder}} = 2\pi r^2 + 2\pi r h \qquad V_{\text{cylinder}} = \pi r^2 h
$$
:::

## How SA:V changes with size

When an object doubles in length, its surface area increases four times (length squared), but its volume increases eight times (length cubed). Volume grows faster than surface, so **SA:V falls as size increases**.

| Side / cm | Surface area / cm² | Volume / cm³ | SA:V |
|---|---|---|---|
| 1 | 6 | 1 | 6.0 : 1 |
| 2 | 24 | 8 | 3.0 : 1 |
| 3 | 54 | 27 | 2.0 : 1 |
| 4 | 96 | 64 | 1.5 : 1 |
| 5 | 150 | 125 | 1.2 : 1 |

Shape also matters. A long, thin or flattened object has a larger SA:V than a cube of the same volume. Flatworms, leaves and the thin flattened cells of the alveolar wall all exploit this.

:::worked-solution[SA:V of a cuboid of $4\ \text{cm} \times 2\ \text{cm} \times 1\ \text{cm}$]
1. Surface area $= 2\big((4 \times 2) + (4 \times 1) + (2 \times 1)\big) = 2(8 + 4 + 2) = 28\ \text{cm}^2$.
2. Volume $= 4 \times 2 \times 1 = 8\ \text{cm}^3$.
3. SA:V $= 28 \div 8 = 3.5$, written $3.5 : 1$.
4. A cube with the same volume (side 2 cm) has SA:V $3.0 : 1$, so the flatter cuboid has more surface per unit volume.
:::

:::worked-solution[SA:V of a cylinder of radius $0.5\ \text{cm}$ and height $4\ \text{cm}$]
1. Area of the two ends $= 2\pi r^2 = 2\pi(0.5)^2 = 1.571\ \text{cm}^2$.
2. Curved surface $= 2\pi r h = 2\pi(0.5)(4) = 12.566\ \text{cm}^2$.
3. Total surface area $= 14.137 \approx 14.1\ \text{cm}^2$.
4. Volume $= \pi r^2 h = \pi(0.5)^2(4) = 3.14\ \text{cm}^3$.
5. SA:V $= 14.137 \div 3.142 = 4.50 : 1$. Keep unrounded values until the last step.
:::

## Consequences for living organisms

Every cell in an organism needs oxygen and nutrients and must lose CO₂ and other wastes. The **demand** depends on volume (the amount of respiring tissue); the **supply** by diffusion depends on surface area and on the distance to the centre.

1. **Small organisms** (bacteria, amoeba, about 1-500 µm) have a large SA:V and short diffusion distances. Diffusion across the body surface is enough.
2. **Larger organisms** have a small SA:V. Their surface is too small for their volume, and the distance from the surface to the inner cells is too great; diffusion is very slow over distances of more than about a millimetre.
3. So larger organisms have evolved **specialised exchange surfaces** that increase surface area (alveoli, gill lamellae, villi and microvilli, root hairs, the spongy mesophyll of leaves).
4. They also need **mass transport systems** (blood and a heart; xylem and phloem) to carry substances quickly between the exchange surfaces and the cells, and to keep concentration gradients steep at the exchange surfaces.
5. Metabolic rate matters too: active animals such as mammals and birds need more oxygen per unit volume than a worm of similar size.

Cell size is limited for the same reason. A cell that grows too large has too little membrane for its volume, which is one reason cells divide rather than grow indefinitely.

## The agar block investigation

Agar containing an indicator models a cell. For example, agar made with dilute sodium hydroxide and phenolphthalein is pink; when blocks are put in dilute hydrochloric acid, the acid diffuses in and the pink colour disappears from the outside inwards.

Method in outline:

1. Cut agar blocks into cubes of different sizes (for example 0.5, 1 and 2 cm sides) with a scalpel on a tile; measure each side with a ruler.
2. Place the blocks in the same volume of acid at the same concentration and temperature; start a stopwatch.
3. Record the time for each block to become completely colourless, or remove the blocks after a fixed time, cut them in half and measure the depth of the colourless region.
4. Repeat with three blocks of each size and calculate means.

Safety: eye protection; hydrochloric acid and sodium hydroxide are irritants at the concentrations used; scalpels cut away from the body. Risk: low to medium.

:::example{title="Predicting the percentage of each block that has changed colour"}
After 5 minutes the acid has diffused 0.25 cm in from every face of every block.

| Side of cube / cm | SA:V | Side of uncoloured core / cm | Block decolourised / % |
|---|---|---|---|
| 0.5 | 12 : 1 | 0 | 100 |
| 1.0 | 6 : 1 | 0.5 | 87.5 |
| 2.0 | 3 : 1 | 1.5 | 57.8 |

For the 2 cm cube: core volume $= 1.5^3 = 3.375\ \text{cm}^3$, total $= 8\ \text{cm}^3$, so decolourised fraction $= 1 - 3.375/8 = 0.578$, or 57.8%.

**Conclusion:** although acid penetrated the same depth in every block, the smallest block (highest SA:V) was fully decolourised and the largest only about 58%. The centre of a large organism would likewise be poorly supplied by diffusion alone.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This concept is **Cambridge only** (AS Level, learning outcomes in topic 4.2). ZIMSEC candidates meet the idea through gas exchange and transport, but SA:V calculations and the agar practical are not named in their syllabus.
:::

## Common mistakes

:::mistake{title="Thinking larger organisms have less surface area"}
Larger organisms have **more** surface area in total but **less surface per unit volume**. Always talk about the ratio.
:::

:::mistake{title="Rounding too early"}
For cylinders, keep π and intermediate values on the calculator; round only the final ratio.
:::

:::mistake{title="Measuring the time for a colour to appear rather than disappear"}
Know your indicator: with phenolphthalein in alkaline agar the blocks go from pink to colourless as acid enters.
:::

## Exam tips

:::exam-tip
Cambridge Paper 1 and 2 questions ask you to *calculate* SA:V (give it as a ratio $x : 1$) and to *explain* why large organisms need exchange surfaces: mention SA:V, diffusion distance and metabolic demand.
:::

:::exam-tip
In Paper 3 the agar block practical tests variables (independent: block size or SA:V; dependent: time to decolourise or % decolourised; standardised: acid concentration, volume, temperature), replicates and the use of means.
:::

## Summary

:::summary
- SA:V = surface area ÷ volume; for a cube it equals $6/l$, so it halves when the side doubles.
- As organisms get larger, SA:V falls and diffusion distances increase.
- Small organisms exchange by diffusion across the body surface; large ones need exchange surfaces and mass transport systems.
- Flattened or elongated shapes increase SA:V.
- Agar blocks with an indicator show that smaller blocks (larger SA:V) are penetrated faster and more completely.
:::
