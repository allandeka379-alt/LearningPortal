---
{
  "key": "geometry.congruent-triangles",
  "title": "Congruent triangles",
  "summary": "Recognise congruent figures, use the conditions SSS, SAS, ASA (or AAS) and RHS to prove that two triangles are congruent, and use congruence to find lengths and angles and to prove geometric facts.",
  "concepts": ["math.geometry.congruence"],
  "objectives": ["zimsec/o-level/mathematics:8.4.1"],
  "estimatedMinutes": 20,
  "level": "core"
}
---
## Introduction

A factory in Msasa cuts hundreds of identical triangular brackets for roof trusses. Each must be exactly the same shape and size as the template, or the roof will not fit together. Shapes that match exactly are **congruent**.

Congruent triangles are also a powerful tool for **proof**: once two triangles are known to be congruent, every pair of matching sides and angles is equal. Many properties you already use, such as "the diagonals of a parallelogram bisect each other", can be proved this way.

:::note{title="ZIMSEC only"}
The congruence conditions are in the ZIMSEC O-Level syllabus. Cambridge IGCSE (0580) uses the word "congruent" but no longer examines the conditions.
:::

## Key definitions

:::definition{term="Congruent"}
Exactly the same shape and size. One figure can be placed exactly on top of the other (turning it over if necessary). The symbol is $\equiv$.
:::

:::definition{term="Corresponding parts"}
The sides and angles that match when one congruent figure is placed on the other. They are equal.
:::

:::definition{term="Included angle"}
The angle **between** two given sides. In triangle $ABC$, the angle included between $AB$ and $BC$ is angle $ABC$.
:::

## Naming congruent triangles

The order of the letters matters. $\triangle ABC \equiv \triangle PQR$ means $A$ matches $P$, $B$ matches $Q$ and $C$ matches $R$. So $AB = PQ$, $BC = QR$, $AC = PR$, and angle $A$ = angle $P$, and so on.

## The four conditions

:::keyfact{title="Two triangles are congruent if"}
- **SSS**: all three pairs of corresponding sides are equal.
- **SAS**: two pairs of sides are equal **and** the angles included between them are equal.
- **ASA** (or **AAS**): two pairs of angles are equal and a pair of **corresponding** sides are equal.
- **RHS**: both triangles have a right angle, their hypotenuses are equal, and one other pair of sides are equal.
:::

Two situations are **not** enough:

- **AAA**: three equal angles only prove the triangles are similar; one may be larger.
- **SSA**: two sides and an angle that is **not** between them can give two different triangles.

:::example{title="Why SSA fails"}
Try to draw a triangle $ABC$ with $AB = 7$ cm, angle $ABC = 35^\circ$ and $AC = 5$ cm. Draw $AB$ and the $35^\circ$ arm from $B$, then an arc of radius 5 cm centred on $A$. The arc cuts the arm **twice**, about 2.8 cm and 8.7 cm from $B$. Both triangles fit the three facts, yet they are clearly different, so these facts cannot prove congruence.
:::

The RHS condition is the exception that works: when the given angle is a right angle, the arc meets the other arm only once on the correct side, so the triangle is fixed.

![Why SSA does not prove congruence: with AB = 7 cm, angle B = 35° and AC = 5 cm, an arc of radius 5 cm centred on A cuts the line from B twice, giving two different triangles with BC = 2.8 cm and BC = 8.7 cm.](media:diagrams/congruent-ssa-two-triangles.png "Figure: two different triangles fit the same two sides and a non-included angle")

:::worked-solution[Example 1: deciding which condition applies]
In triangle $ABC$, $AB = 5$ cm, $BC = 7$ cm and angle $ABC = 40^\circ$. In triangle $PQR$, $PQ = 5$ cm, $QR = 7$ cm and angle $PQR = 40^\circ$.
1. Two pairs of sides are equal: $AB = PQ$ and $BC = QR$.
2. The $40^\circ$ angles are at $B$ and $Q$, which lie **between** those sides: they are the included angles.
3. So $\triangle ABC \equiv \triangle PQR$ (SAS), and therefore $AC = PR$ and the remaining angles match.
:::

## Proving with congruent triangles

A congruence proof has three statements, each with a reason, followed by the condition.

:::worked-solution[Example 2: the diagonal of a kite]
$ABCD$ is a kite with $AB = AD$ and $CB = CD$. Prove that the diagonal $AC$ bisects angle $BAD$.
1. $AB = AD$ (given).
2. $CB = CD$ (given).
3. $AC$ is common to both triangles.
4. So $\triangle ABC \equiv \triangle ADC$ (SSS).
5. Hence angle $BAC$ = angle $DAC$ (corresponding angles of congruent triangles), so $AC$ bisects angle $BAD$.
:::

:::worked-solution[Example 3: the diagonals of a parallelogram]
$ABCD$ is a parallelogram whose diagonals $AC$ and $BD$ meet at $M$. Prove that $AM = MC$.
1. Angle $MAB$ = angle $MCD$ (alternate angles, $AB \parallel DC$).
2. Angle $MBA$ = angle $MDC$ (alternate angles, $AB \parallel DC$).
3. $AB = CD$ (opposite sides of a parallelogram are equal).
4. So $\triangle ABM \equiv \triangle CDM$ (ASA).
5. Hence $AM = CM$ (and $BM = DM$): the diagonals bisect each other.
:::

## Finding lengths and angles

:::worked-solution[Example 4: an isosceles triangle]
Triangle $ABC$ has $AB = AC = 13$ cm and $BC = 10$ cm. The perpendicular from $A$ meets $BC$ at $D$. Find $BD$ and $AD$.
1. In triangles $ABD$ and $ACD$: both have a right angle at $D$; the hypotenuses $AB$ and $AC$ are equal; $AD$ is common.
2. So $\triangle ABD \equiv \triangle ACD$ (RHS), and $BD = CD = 10 \div 2 = 5$ cm.
3. By Pythagoras' theorem, $AD = \sqrt{13^2 - 5^2} = \sqrt{144} = 12$ cm.
:::

## Common mistakes

:::mistake{title="Using an angle that is not included"}
"Two sides and an angle" proves congruence only when the angle is **between** the two sides (SAS). Otherwise it is SSA, which is not a valid condition.
:::

:::mistake{title="Equal angles only"}
Three equal angles (AAA) show that triangles are similar, not congruent. A small and a large equilateral triangle have the same angles.
:::

:::mistake{title="Letters in the wrong order"}
If $A$ matches $P$, $B$ matches $Q$ and $C$ matches $R$, writing $\triangle ABC \equiv \triangle QPR$ suggests false statements such as $BC = PR$ or angle $A$ = angle $Q$. Write corresponding vertices in the same order: $\triangle ABC \equiv \triangle PQR$.
:::

:::mistake{title="Using what you are trying to prove"}
In a proof, every statement must come from what is given or from known facts. You cannot use "$AM = CM$" to prove the triangles congruent and then conclude that $AM = CM$.
:::

## Exam tips

:::exam-tip
Lay out a proof as three numbered statements with reasons ("given", "common", "alternate angles", "vertically opposite angles"), then state the condition in brackets, for example (SAS).
:::

:::exam-tip
After proving congruence, a "hence" part usually wants a consequence: quote it with the reason "corresponding sides (or angles) of congruent triangles".
:::

:::exam-tip
Look for a **common side** shared by both triangles and for **vertically opposite** angles where lines cross: they are often the facts that complete a proof.
:::

## Summary

:::summary
- Congruent figures have the same shape and size; corresponding sides and angles are equal.
- Conditions: SSS, SAS (included angle), ASA or AAS (corresponding side), RHS.
- AAA and SSA do **not** prove congruence.
- Name triangles with corresponding vertices in the same order.
- Use congruence to prove facts (kites, parallelograms, isosceles triangles) and to find lengths and angles.
:::
