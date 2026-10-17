---
{
  "key": "structures.trusses",
  "title": "Trusses",
  "summary": "Explain why trusses are built from triangles, identify struts and ties, and describe how a roof truss carries its load.",
  "concepts": ["phys.structures.trusses"],
  "objectives": ["zimsec/o-level/physics:5.2.1", "zimsec/o-level/physics:5.2.2", "zimsec/o-level/physics:5.2.3", "zimsec/o-level/physics:5.2.4", "zimsec/o-level/physics:5.2.5"],
  "estimatedMinutes": 22,
  "applies": ["zimsec"]
}
---
## Introduction

The roof of a house, the frame of an electricity pylon carrying power from Kariba, and the steel framework of many bridges are made of thin members joined together in triangles. These frameworks are **trusses**. They are strong, rigid and use far less material than a solid beam of the same size. This lesson covers ZIMSEC topic 5.2.

## Key definitions

:::definition{term="Truss"}
A framework of straight members joined at their ends so that they form triangles.
:::

:::definition{term="Strut"}
A member of a framework that is in compression (being pushed).
:::

:::definition{term="Tie"}
A member of a framework that is in tension (being pulled).
:::

## Why triangles?

A square frame of four sticks pinned at the corners is not rigid: push one corner and it folds into a parallelogram, because its angles can change without any stick changing length. A **triangle** cannot change shape unless one of its sides changes length. Adding a diagonal to the square divides it into two triangles and makes it rigid. This is called **triangulation**, and every truss is made of triangles for this reason.

![A square frame pinned at its corners folds into a parallelogram when pushed, but a triangle cannot change shape unless one of its sides changes length, which is why trusses are built from triangles.](media:diagrams/truss-triangle-rigid.png "Figure: a pinned square folds, a triangle stays rigid")

## Advantages of trusses over solid beams

- **Strength-to-mass ratio**: a truss can carry a large load with little material, because each member is either pulled or pushed along its length, which is how materials are strongest.
- **Economy**: less material means lower cost and less weight for the supports to carry.
- **Longer spans**: trusses can bridge gaps that would need impossibly heavy solid beams.

:::example{title="Comparing a beam and a truss"}
In a classroom test, a solid wooden-splint beam and a truss made from the same mass of splints span the same gap. The truss carries a much larger load before failing: same mass, greater strength.
:::

## Struts and ties

The load on a truss is passed from joint to joint along the members to the supports. Some members are pushed and some are pulled:

- **Struts** are in compression. They must be thick or stiff enough not to **buckle**.
- **Ties** are in tension. They can be thin: even a steel cable or a rope can act as a tie, because a pull does not make a member buckle.

A simple way to identify them on a model is to replace a member with string: if the frame still holds its shape, that member was a tie (in tension); if the string goes slack, it was a strut.

## The roof truss

In a typical triangular roof truss:

![Roof truss: the two sloping rafters are struts in compression, the horizontal tie beam is in tension and stops the rafters pushing the walls outwards, and the king post and braces divide the large triangle into smaller triangles; the roof load passes down to the supports at each end.](media:diagrams/roof-truss-struts-ties.png "Figure: a roof truss, rafters in compression and the tie beam in tension")

- the two sloping **rafters** carry the weight of the roof sheets or tiles and are mainly in **compression** (struts);
- the horizontal **tie beam** at the bottom is in **tension**: it stops the rafters from pushing the tops of the walls outwards;
- extra internal members (such as a king post and diagonal braces) split the large triangle into smaller triangles, so each member carries a smaller force and the rafters do not sag.

The load passes down the rafters to the joints at the ends of the tie beam, and from there straight down into the walls.

## Common mistakes

:::mistake{title="Struts and ties mixed up"}
Strut = compression (pushed). Tie = tension (pulled). A rope or cable can only be a tie.
:::

:::mistake{title="Any shape of frame is rigid"}
Only triangles keep their shape when the joints can turn. Rectangles need diagonal braces.
:::

## Exam tips

:::exam-tip
"Explain the use of triangles" earns marks for: a triangle cannot change shape without a side changing length, so the framework is rigid and stable.
:::

:::exam-tip
When asked whether a member is a strut or a tie, say what would happen if it were removed: if the joints would be pulled apart, it is a tie; if they would move together, it is a strut.
:::

## Summary

:::summary
- A truss is a framework of members forming triangles; triangles make it rigid.
- Trusses have a high strength-to-mass ratio, save material and span long gaps.
- Struts are in compression and must resist buckling; ties are in tension and can be thin.
- In a roof truss the rafters are mainly struts and the tie beam is a tie that stops the walls being pushed apart.
- The load is passed through the joints and members to the supports.
:::
