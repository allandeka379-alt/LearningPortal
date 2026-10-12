---
{
  "key": "sets.venn-diagrams",
  "title": "Venn diagrams",
  "summary": "Represent two or three sets in a Venn diagram, describe regions in set notation, and find numbers of elements, including forming and solving an equation for an unknown region.",
  "concepts": ["math.number.venn-diagrams"],
  "objectives": ["zimsec/o-level/mathematics:2.0.3", "cambridge/igcse/mathematics:1.2.2", "cambridge/igcse/mathematics:1.2.3"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A school in Bulawayo surveys its Form 3 learners about the sports they play. Some play football, some play netball, some play both and some play neither. A **Venn diagram** sorts all of this information into one picture, so that questions such as "how many play exactly one sport?" can be answered at a glance. Venn diagram questions are common on both ZIMSEC and Cambridge papers, often as structured questions worth several marks.

You should know the set notation $\mathscr{E}$, $A'$, $A \cup B$, $A \cap B$ and $n(A)$.

## Key definitions

:::definition{term="Venn diagram"}
A diagram in which a rectangle represents the universal set $\mathscr{E}$ and circles inside it represent sets. Overlapping circles show elements that belong to more than one set.
:::

:::definition{term="Region"}
One of the separate areas of a Venn diagram. Each element belongs to exactly one region.
:::

## Two sets

Two overlapping circles $A$ and $B$ inside the rectangle make **four regions**:

| Region | Description | Set notation |
| --- | --- | --- |
| R1 | in $A$ only | $A \cap B'$ |
| R2 | in both $A$ and $B$ (the overlap) | $A \cap B$ |
| R3 | in $B$ only | $A' \cap B$ |
| R4 | outside both circles | $(A \cup B)'$ |

Combinations of regions describe other sets: $A$ is R1 and R2; $A \cup B$ is R1, R2 and R3; $A'$ is R3 and R4; $(A \cap B)'$ is R1, R3 and R4.

:::formula{name="Number of elements in a union"}
$$
n(A \cup B) = n(A) + n(B) - n(A \cap B)
$$
:::

The overlap is subtracted once because it was counted in both $n(A)$ and $n(B)$.

:::worked-solution[Example 1: football and netball]
In a class of 40 learners, 25 play football, 18 play netball and 7 play both. How many play neither?
1. Fill the overlap first: $n(F \cap N) = 7$.
2. Football only: $25 - 7 = 18$. Netball only: $18 - 7 = 11$.
3. Total in the circles: $18 + 7 + 11 = 36$ (or $25 + 18 - 7 = 36$).
4. Neither: $40 - 36 = 4$.
:::

![Venn diagram for 40 learners: 18 play football only, 7 play both football and netball, 11 play netball only and 4 play neither; the football circle totals 25 and the netball circle totals 18.](media:diagrams/venn-football-netball.png "Figure: fill the overlap first, then the 'only' regions, then the outside")

:::worked-solution[Example 2: an unknown overlap]
In a group of 30 learners, 19 like Mathematics, 15 like Science, $x$ like both and 3 like neither. Find $x$.
1. Regions: Mathematics only $19 - x$; both $x$; Science only $15 - x$; neither $3$.
2. The regions add up to 30: $(19 - x) + x + (15 - x) + 3 = 30$.
3. Simplify: $37 - x = 30$, so $x = 7$.
4. Check: $12 + 7 + 8 + 3 = 30$.
:::

## Three sets (Cambridge Extended and ZIMSEC)

Three overlapping circles $A$, $B$ and $C$ make **eight regions**: the centre (in all three), three "two sets only" regions, three "one set only" regions, and the outside. Always fill a three-set diagram **from the centre outwards**:

1. the region in all three sets;
2. the three "two sets only" regions (pair total minus the centre);
3. the three "one set only" regions (set total minus everything else in that circle);
4. the region outside all three circles.

:::worked-solution[Example 3: a three-set survey with an unknown]
In a class of 40, 22 take History (H), 18 take Geography (G) and 15 take Shona (S). 7 take History and Geography, 6 take History and Shona, 5 take Geography and Shona, $x$ take all three and 2 take none of them. Find $x$.
1. Centre: $x$.
2. Two only: $H \cap G$ only $= 7 - x$; $H \cap S$ only $= 6 - x$; $G \cap S$ only $= 5 - x$.
3. History only $= 22 - (7 - x) - (6 - x) - x = 9 + x$.
4. Geography only $= 18 - (7 - x) - (5 - x) - x = 6 + x$; Shona only $= 15 - (6 - x) - (5 - x) - x = 4 + x$.
5. All eight regions add to 40: $(9 + x) + (6 + x) + (4 + x) + (7 - x) + (6 - x) + (5 - x) + x + 2 = 40$.
6. Simplify: $39 + x = 40$, so $x = 1$.
7. Check: $10 + 7 + 5 + 6 + 5 + 4 + 1 + 2 = 40$.
:::

In set notation, the region "in $A$ and $B$ but not $C$" is $A \cap B \cap C'$, and "in $A$ only" is $A \cap B' \cap C'$.

## Common mistakes

:::mistake{title="Putting the total of a set in its 'only' region"}
If 25 play football and 7 play both, the "football only" region is $25 - 7 = 18$, not 25.
:::

:::mistake{title="Forgetting the region outside the circles"}
People who belong to none of the sets still count towards $n(\mathscr{E})$. Include them in your equation.
:::

:::mistake{title="Filling a three-set diagram from the outside"}
Start with the centre, then the "two only" regions, then the "one only" regions. Working the other way round double-counts.
:::

:::mistake{title="Adding n(A) and n(B) for the union"}
$n(A \cup B) = n(A) + n(B)$ only when the sets do not overlap. Otherwise subtract $n(A \cap B)$.
:::

## Exam tips

:::exam-tip
"Show that $x = 7$" or "form an equation in $x$" needs the full equation written out with every region, then the simplification. Writing only "$x = 7$" earns little.
:::

:::exam-tip
Check that all the regions add up to $n(\mathscr{E})$ once you have found $x$, and that no region is negative.
:::

:::exam-tip
For a shading question, test each region: is it in the set you are describing? Shade only the regions that pass.
:::

## Summary

:::summary
- A Venn diagram of two sets has 4 regions; three sets give 8 regions.
- $n(A \cup B) = n(A) + n(B) - n(A \cap B)$.
- Fill the diagram from the overlap (or centre) outwards, subtracting to find each "only" region.
- With an unknown $x$, write every region in terms of $x$, add them to $n(\mathscr{E})$ and solve.
- Describe regions in notation, for example $A \cap B'$ is "in $A$ but not in $B$".
:::
