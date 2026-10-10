---
{
  "key": "dynamics.conservation-momentum",
  "title": "Conservation of momentum, collisions and explosions",
  "summary": "Apply the principle of conservation of momentum to collisions and explosions in one and two dimensions, distinguish elastic from inelastic interactions using kinetic energy and relative speeds, and calculate the kinetic energy transferred.",
  "concepts": ["aphys.dynamics.conservation-momentum"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When shunting wagons couple together in the Bulawayo railway yards, when a snooker ball strikes another, or when a rifle recoils as it fires, the objects push on each other with large, rapidly changing forces that are almost impossible to measure. Yet we can predict exactly how they move afterwards, because one quantity is never created or destroyed in these interactions: the **total momentum**.

This lesson states the principle of conservation of momentum, shows why it follows from Newton's laws, and applies it to collisions and explosions in a line and in two dimensions. You will also use kinetic energy to classify a collision as elastic or inelastic. You need momentum ($p = mv$), impulse and kinetic energy ($\tfrac{1}{2}mv^2$).

## Key definitions

:::definition{term="Principle of conservation of momentum"}
For a closed (isolated) system, in which no resultant external force acts, the total momentum in any direction remains constant.
:::

:::definition{term="Elastic collision"}
A collision in which the total kinetic energy of the objects is the same after the collision as before.
:::

:::definition{term="Inelastic collision"}
A collision in which some of the total kinetic energy is transferred to other forms (internal energy, sound, deformation). Momentum is still conserved. If the objects stick together it is sometimes called perfectly (or completely) inelastic.
:::

:::formula{name="Conservation of momentum (two bodies, one dimension)"}
$$
m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2
$$

$u_1, u_2$ = velocities before, $v_1, v_2$ = velocities after (with signs for direction), $m_1, m_2$ = masses.
:::

:::keyfact{title="Elastic collisions: relative speeds"}
In an elastic collision the relative speed of approach equals the relative speed of separation: $u_1 - u_2 = v_2 - v_1$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require conservation of momentum in one dimension and simple two-dimensional problems, elastic and inelastic collisions and explosions. The relative-speed rule for elastic collisions is used by Cambridge; the coefficient of restitution is not required by either.
:::

## Why momentum is conserved

When body A pushes on body B, B pushes back on A with an equal and opposite force for exactly the same time (Newton's third law). The impulses are equal and opposite, so the momentum gained by one body equals the momentum lost by the other. The total does not change, provided no **external** force (friction from the ground, an outside push) gives the system an impulse.

**Total energy is always conserved too**, but kinetic energy usually is not: it is the special case of elastic collisions.

## Collisions in one dimension

Choose a positive direction and give every velocity a sign.

:::worked-solution[Two trolleys stick together]
A $2.0\ \text{kg}$ trolley moving at $3.0\ \text{m s}^{-1}$ collides with a stationary $1.0\ \text{kg}$ trolley; they stick together.

1. Momentum before: $2.0 \times 3.0 + 1.0 \times 0 = 6.0\ \text{kg m s}^{-1}$.
2. After: $(2.0 + 1.0)v = 6.0$, so $v = 2.0\ \text{m s}^{-1}$.
3. Kinetic energy before: $\tfrac{1}{2}(2.0)(3.0)^2 = 9.0\ \text{J}$. After: $\tfrac{1}{2}(3.0)(2.0)^2 = 6.0\ \text{J}$.
4. $3.0\ \text{J}$ of kinetic energy has been transferred (mainly to internal energy and sound): the collision is inelastic.
:::

:::worked-solution[An elastic collision]
A $0.40\ \text{kg}$ ball at $5.0\ \text{m s}^{-1}$ hits a stationary $0.60\ \text{kg}$ ball head-on, elastically. Find both final velocities.

1. Momentum: $0.40 \times 5.0 = 0.40v_1 + 0.60v_2$, so $2.0 = 0.40v_1 + 0.60v_2$.
2. Elastic, so speed of approach $=$ speed of separation: $5.0 - 0 = v_2 - v_1$, so $v_2 = v_1 + 5.0$.
3. Substitute: $2.0 = 0.40v_1 + 0.60v_1 + 3.0$, so $v_1 = -1.0\ \text{m s}^{-1}$ (it bounces back) and $v_2 = 4.0\ \text{m s}^{-1}$.
4. Check the kinetic energy: before $\tfrac{1}{2}(0.40)(5.0)^2 = 5.0\ \text{J}$; after $\tfrac{1}{2}(0.40)(1.0)^2 + \tfrac{1}{2}(0.60)(4.0)^2 = 0.2 + 4.8 = 5.0\ \text{J}$. ✓
:::

Collisions between gas molecules are elastic; collisions between everyday objects are always at least slightly inelastic.

## Explosions

In an explosion the system starts at rest, so the total momentum is zero before **and after**: the pieces move off with equal and opposite momenta. Kinetic energy is created from chemical or elastic potential energy.

:::example{title="Recoil of a rifle"}
A $4.0\ \text{kg}$ rifle fires a $0.010\ \text{kg}$ bullet at $400\ \text{m s}^{-1}$. Momentum: $0 = 0.010 \times 400 + 4.0\,v$, so $v = -1.0\ \text{m s}^{-1}$ (the rifle recoils). The bullet has $\tfrac{1}{2}(0.010)(400)^2 = 800\ \text{J}$ of kinetic energy, the rifle only $\tfrac{1}{2}(4.0)(1.0)^2 = 2.0\ \text{J}$: equal momenta, very unequal kinetic energies, because $E_k = p^2/2m$.
:::

## Collisions in two dimensions

Momentum is a vector, so it is conserved **separately** in each of two perpendicular directions. Resolve every momentum along $x$ and $y$.

:::worked-solution[A glancing collision]
A snooker ball moving at $2.0\ \text{m s}^{-1}$ along $x$ strikes an identical stationary ball. Afterwards the first ball moves at $1.73\ \text{m s}^{-1}$ at $30^\circ$ to the $x$-direction, and the second at $1.0\ \text{m s}^{-1}$ at $60^\circ$ on the other side. Check that momentum is conserved (each ball has mass $m$).

1. $x$: before $2.0m$; after $m(1.73\cos 30^\circ + 1.0\cos 60^\circ) = m(1.50 + 0.50) = 2.0m$. ✓
2. $y$: before $0$; after $m(1.73\sin 30^\circ - 1.0\sin 60^\circ) = m(0.866 - 0.866) = 0$. ✓
3. Kinetic energy: before $\tfrac{1}{2}m(4.0)$; after $\tfrac{1}{2}m(3.0 + 1.0) = \tfrac{1}{2}m(4.0)$, so this collision is elastic. (For equal masses, an elastic glancing collision always sends the balls off at $90^\circ$ to each other.)
:::

## Common mistakes

:::mistake{title="Forgetting signs"}
Objects moving in opposite directions have momenta of opposite sign. Two equal masses approaching each other at the same speed have **zero** total momentum.
:::

:::mistake{title="Assuming kinetic energy is conserved"}
Only in elastic collisions. Use momentum first; use kinetic energy only when told the collision is elastic, or to test whether it is.
:::

:::mistake{title="Using momentum when an external force acts"}
Momentum is conserved for the whole closed system. A ball bouncing off the ground is not a closed system on its own (the Earth is involved); a car braking on a road is acted on by friction.
:::

:::mistake{title="Saying energy is lost"}
Energy is never lost: in an inelastic collision kinetic energy is **transferred** to internal energy, sound and work done in deforming the objects.
:::

## Exam tips

:::exam-tip{title="State the principle fully"}
"The total momentum of a system remains constant provided no resultant external force acts on it." Leaving out the condition loses the mark.
:::

:::exam-tip{title="Where it is tested"}
Cambridge Paper 1 tests one-dimensional collisions and elastic or inelastic classification; Paper 2 includes multi-step collision and explosion problems, sometimes in two dimensions. ZIMSEC Papers 1 and 2 test the same, including vehicle collisions.
:::

:::exam-tip{title="Show it is elastic"}
To show a collision is elastic, calculate the total kinetic energy before and after (or compare the relative speeds of approach and separation) and state that they are equal.
:::

## Summary

:::summary
- In a closed system the total momentum is constant; this follows from Newton's third law.
- Use $m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2$ with signs for direction.
- Elastic: kinetic energy conserved, and relative speed of approach $=$ relative speed of separation. Inelastic: some kinetic energy transferred to other forms.
- Explosions from rest: total momentum stays zero; pieces have equal and opposite momenta.
- In two dimensions, conserve momentum separately along two perpendicular directions.
:::
