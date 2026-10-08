---
{
  "key": "mensuration.prisms-and-cylinders",
  "title": "Surface area and volume of prisms and cylinders",
  "summary": "Calculate the volume and surface area of cuboids, prisms of any uniform cross-section and cylinders, including capacity in litres and open or closed containers such as water tanks.",
  "concepts": ["math.mensuration.prisms-and-cylinders"],
  "objectives": ["zimsec/o-level/mathematics:4.2.3", "cambridge/igcse/mathematics:5.4.1"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

On a farm near Gweru, rainwater from the roof runs into a cylindrical metal tank. How many litres can it hold? How much metal sheet was needed to make it? A drainage channel, a ridge tent and a concrete beam all have the same shape all along their length. These are **prisms**, and a cylinder is a prism with a circular cross-section.

In this lesson you will calculate the **volume** (space inside) and the **surface area** (total area of the outside) of these solids. You should already know the area formulas for rectangles, triangles, trapezia and circles, and that $1\ \text{m}^3 = 1000$ litres.

## Key definitions

:::definition{term="Prism"}
A solid with the same cross-section all the way along its length. It is named after its cross-section: triangular prism, hexagonal prism, and so on. A cuboid is a rectangular prism.
:::

:::definition{term="Cross-section"}
The shape you see when you cut a solid straight across, at right angles to its length.
:::

:::definition{term="Surface area"}
The total area of all the faces (and curved surfaces) of a solid. It is found by adding the areas of the faces, often using a **net** (the solid opened out flat).
:::

:::formula{name="Volumes"}
$$
\text{volume of a prism} = \text{area of cross-section} \times \text{length}
$$

$$
\text{cuboid: } V = lwh \qquad \text{cylinder: } V = \pi r^2 h
$$
:::

:::formula{name="Surface areas"}
$$
\text{cuboid: } A = 2(lw + lh + wh)
$$

$$
\text{cylinder: curved surface} = 2\pi rh \qquad \text{closed cylinder: } A = 2\pi rh + 2\pi r^2
$$
:::

The curved surface of a cylinder unrolls into a rectangle whose length is the circumference $2\pi r$ and whose width is the height $h$. That is why its area is $2\pi rh$.

## Cuboids and prisms

:::worked-solution[Example 1: a cuboid box 8 cm by 5 cm by 3 cm]
1. Volume $= 8 \times 5 \times 3 = 120\ \text{cm}^3$.
2. The faces come in three pairs: $8 \times 5 = 40$, $8 \times 3 = 24$ and $5 \times 3 = 15$.
3. Surface area $= 2(40 + 24 + 15) = 2 \times 79 = 158\ \text{cm}^2$.
:::

:::worked-solution[Example 2: a ridge tent]
A tent is a triangular prism 3 m long. Its cross-section is a triangle with base 2.4 m and height 1.6 m.

1. Area of the cross-section $= \frac{1}{2} \times 2.4 \times 1.6 = 1.92\ \text{m}^2$.
2. Volume $= 1.92 \times 3 = 5.76\ \text{m}^3$.
:::

## Cylinders

:::worked-solution[Example 3: a farm water tank]
A cylindrical tank near Gweru has radius 1.2 m and height 2 m. It has a base but no lid.

1. Volume $= \pi \times 1.2^2 \times 2 = 2.88\pi = 9.047\ldots\ \text{m}^3$.
2. Capacity $= 9.047\ldots \times 1000 \approx 9048$ litres.
3. Curved surface $= 2\pi \times 1.2 \times 2 = 15.07\ldots\ \text{m}^2$.
4. Base $= \pi \times 1.2^2 = 4.52\ldots\ \text{m}^2$.
5. Metal sheet needed (open top) $= 15.07\ldots + 4.52\ldots = 19.6\ \text{m}^2$ (3 s.f.).
:::

For an **open** container leave out the lid: $2\pi rh + \pi r^2$. For a **closed** cylinder include both circles: $2\pi rh + 2\pi r^2$. For a pipe or a label, only the curved surface $2\pi rh$ is needed.

:::worked-solution[Example 4: a closed tin, in terms of $\pi$]
A closed cylindrical tin has radius 3.5 cm and height 10 cm. Find its total surface area.

1. Curved surface $= 2\pi \times 3.5 \times 10 = 70\pi$.
2. Two ends $= 2 \times \pi \times 3.5^2 = 24.5\pi$.
3. Total $= 70\pi + 24.5\pi = 94.5\pi \approx 297\ \text{cm}^2$ (3 s.f.).
:::

### Working backwards

:::worked-solution[Example 5: how high does the water rise?]
30 litres of water are poured into an empty cylindrical drum of radius 25 cm. How deep is the water?

1. $30$ litres $= 30\,000\ \text{cm}^3$.
2. $\pi \times 25^2 \times h = 30\,000$, so $625\pi h = 30\,000$.
3. $h = \dfrac{30\,000}{625\pi} = 15.27\ldots \approx 15.3$ cm.
:::

## Common mistakes

:::mistake{title="Using the diameter as the radius"}
A tank 2.4 m across has radius 1.2 m. Using 2.4 in $\pi r^2 h$ gives a volume four times too big.
:::

:::mistake{title="Counting the wrong faces"}
Read whether the container is open or closed. An open tank has no lid, so do not include the top circle.
:::

:::mistake{title="Mixing units"}
A tank of radius 60 cm and height 1.5 m must be worked in one unit: $r = 0.6$ m and $h = 1.5$ m, or $r = 60$ cm and $h = 150$ cm.
:::

:::mistake{title="Confusing volume and surface area units"}
Volume is in cubic units ($\text{m}^3$, $\text{cm}^3$, litres); surface area is in square units ($\text{m}^2$, $\text{cm}^2$).
:::

## Exam tips

:::exam-tip
Cambridge papers give the formula for the curved surface area of a cylinder and the volumes of a prism and a cylinder. You must still decide which faces to add, so sketch the net.
:::

:::exam-tip
For capacity, convert at the end: $\text{cm}^3 \div 1000 =$ litres, and $\text{m}^3 \times 1000 =$ litres.
:::

:::exam-tip
When a question says "give your answer in terms of $\pi$", keep $\pi$ as a symbol, for example $250\pi\ \text{cm}^3$.
:::

## Summary

:::summary
- Volume of any prism $=$ area of cross-section $\times$ length; cuboid $V = lwh$; cylinder $V = \pi r^2 h$.
- Surface area is the total area of all faces; a cuboid has $A = 2(lw + lh + wh)$.
- Cylinder: curved surface $2\pi rh$; closed $2\pi rh + 2\pi r^2$; open $2\pi rh + \pi r^2$.
- Use one unit throughout; $1000\ \text{cm}^3 = 1$ litre and $1\ \text{m}^3 = 1000$ litres.
- To find a missing length, substitute the known values and solve.
:::
