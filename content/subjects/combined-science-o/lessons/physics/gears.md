---
{
  "key": "physics.gears",
  "title": "Gears",
  "summary": "How gears pass on turning from a driver gear to a driven gear, how to find the velocity ratio from the numbers of teeth, how gears change speed, turning force and direction, how to calculate mechanical advantage and efficiency, and where gears are used, from bicycles to hand drills.",
  "concepts": ["cs.physics.gears"],
  "objectives": [
    "zimsec/o-level/combined-science:7.3.3.4.2",
    "zimsec/o-level/combined-science:7.3.3.4.3",
    "zimsec/o-level/combined-science:7.3.3.4.4"
  ],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

A cyclist riding from Mutare up Christmas Pass changes gear as the road gets steeper: the pedals become easier to push, but the bicycle moves more slowly for each turn of the pedals. A carpenter turns the large handle of a hand drill slowly, and the drill bit spins quickly. In both cases **gears** are changing the speed and turning force of a rotation.

Gears are simple machines, like levers, pulleys and inclined planes. In this lesson you will learn how they work, how to calculate their velocity ratio, mechanical advantage and efficiency, and where they are used.

## Key definitions

:::definition{term="Gear"}
A wheel with teeth around its edge. When two gears **mesh** (their teeth interlock), turning one turns the other.
:::

:::definition{term="Driver gear"}
The gear that is turned by the effort, for example by a motor, a handle or the pedals.
:::

:::definition{term="Driven gear"}
The gear that is turned by the driver gear and turns the load.
:::

:::definition{term="Gear train"}
Two or more gears meshed together to pass on turning from one shaft to another.
:::

:::formula{name="Velocity ratio of a pair of gears"}
$$
\text{VR} = \frac{\text{number of teeth on the driven gear}}{\text{number of teeth on the driver gear}} = \frac{\text{turns made by the driver gear}}{\text{turns made by the driven gear}}
$$
:::

## How gears change speed and turning force

When the driver gear makes one complete turn, every one of its teeth passes the point where the gears meet, and it pushes the same number of teeth of the driven gear past that point. A driver with 12 teeth therefore moves a 36-tooth driven gear on by 12 teeth, which is only $\dfrac{12}{36} = \dfrac{1}{3}$ of a turn. The driver must make 3 turns for each turn of the driven gear, so the velocity ratio is 3.

- **Driven gear larger than the driver** (VR greater than 1): the driven gear turns **more slowly**, but with a **larger turning effect** (moment). The gears multiply force. This is a "low gear", used for starting off and climbing hills.
- **Driven gear smaller than the driver** (VR less than 1): the driven gear turns **faster**, with a smaller turning effect. The gears multiply speed, as in a hand drill or an egg beater.
- **Gears of equal size**: same speed, same turning effect; only the direction changes.

### Direction of turning

- Two meshing gears turn in **opposite directions**.
- An **idler gear** placed between them makes the driven gear turn in the **same direction** as the driver. The idler does not change the velocity ratio.
- Gears joined by a **chain**, like the front and back sprockets of a bicycle, turn in the **same direction**.
- **Bevel gears**, with teeth cut at an angle, turn the rotation through a right angle, as in a hand drill.

:::worked-solution[Speed and direction]
A driver gear with 16 teeth turns at 90 turns per minute and meshes with a driven gear of 48 teeth.

1. $\text{VR} = \dfrac{48}{16} = 3$.
2. The driven gear makes one turn for every 3 turns of the driver: $\dfrac{90}{3} = 30$ turns per minute.
3. The driven gear turns in the opposite direction to the driver. An idler gear between them would make it turn the same way, still at 30 turns per minute.
:::

## Mechanical advantage and efficiency

As for every machine:

$$
\text{MA} = \frac{\text{load}}{\text{effort}} \qquad \text{efficiency} = \frac{\text{MA}}{\text{VR}} \times 100\%
$$

For a gear system the load and the effort are compared as forces applied at the same distance from their axles, for example on equal-sized drums or handles. In a perfect gear system the MA would equal the VR. In a real one, some of the work put in is wasted against **friction between the teeth** and **in the bearings**, so the MA is less than the VR and the efficiency is less than $100\%$.

:::worked-solution[Efficiency of a gear system]
In the gears above (VR = 3), an effort of $40\ \text{N}$ on the driver's handle turns a drum of the same radius on the driven shaft, which lifts a load of $105\ \text{N}$.

1. $\text{MA} = \dfrac{105}{40} = 2.625$.
2. $\text{efficiency} = \dfrac{2.625}{3} \times 100\% = 87.5\%$.
3. About $12.5\%$ of the work input is wasted, mainly as heat from friction between the teeth and in the bearings.
:::

**Improving the efficiency of gears**: lubricate the teeth, chains and bearings with oil or grease; use ball bearings; keep chains and teeth clean and free of grit.

## Gear trains with more than two gears

Two gears fixed to the same shaft turn together, at the same speed. In such a **compound gear train** the overall velocity ratio is found by multiplying the velocity ratios of each pair.

:::example{title="Example: a compound gear train"}
A 10-tooth driver meshes with a 30-tooth gear. A 12-tooth gear on the same shaft as the 30-tooth gear meshes with a 48-tooth output gear.

- First pair: $\text{VR} = \dfrac{30}{10} = 3$.
- Second pair: $\text{VR} = \dfrac{48}{12} = 4$.
- Overall: $\text{VR} = 3 \times 4 = 12$. The driver must turn 12 times for one turn of the output gear, which turns with a much larger turning effect.
:::

## The bicycle

On a bicycle the pedals turn the front **chainring** (the driver). A **chain** carries the motion to a **sprocket** on the back wheel (the driven gear). Both turn in the same direction.

$$
\text{turns of the back wheel for one turn of the pedals} = \frac{\text{teeth on the chainring}}{\text{teeth on the back sprocket}}
$$

- A chainring of 42 teeth and a back sprocket of 14 teeth: the wheel turns $\dfrac{42}{14} = 3$ times per turn of the pedals. The bicycle goes fast on a flat road, but each push on the pedals must be large.
- Changing to a back sprocket of 28 teeth: the wheel turns only $\dfrac{42}{28} = 1.5$ times per turn of the pedals. The bicycle goes more slowly, but the pedals are easier to push, which helps on a hill.

## Uses of gears

| Machine | What the gears do |
| --- | --- |
| Bicycle | Chainring and sprockets let the rider choose between speed and an easier push |
| Vehicle gearbox | Low gears give a large turning force to start and climb; high gears give speed on the open road |
| Hand drill | A large gear turned by the handle drives a small gear on the drill bit, so the bit spins fast; bevel gears turn the motion through a right angle |
| Egg beater (hand whisk) | A large handle gear drives small gears, so the beaters spin quickly |
| Clocks and watches | Gear trains make the hands turn at the correct, different speeds |

## Common mistakes

:::mistake{title="Dividing the teeth the wrong way round"}
VR = teeth on the **driven** gear ÷ teeth on the **driver** gear. A large driven gear gives a VR greater than 1 and turns slowly.
:::

:::mistake{title="Thinking an idler gear changes the speed"}
An idler gear changes only the direction of the driven gear. The speed of the output depends only on the first and last gears.
:::

:::mistake{title="Gears that turn faster also turn harder"}
A gear system cannot increase speed and turning force at the same time. What is gained in one is lost in the other, and friction wastes a little more.
:::

## Exam tips

:::exam-tip
Always say which gear is the driver. Then VR = driven teeth ÷ driver teeth, and output speed = input speed ÷ VR.
:::

:::exam-tip
For the direction of turning in a gear train, mark the direction on each gear in turn: each pair of meshing gears turns in opposite directions.
:::

## Summary

:::summary
- Gears are toothed wheels; the driver gear is turned by the effort and turns the driven gear.
- VR = teeth on driven gear ÷ teeth on driver gear = turns of driver ÷ turns of driven.
- A larger driven gear turns more slowly with a larger turning effect; a smaller driven gear turns faster with a smaller turning effect.
- Meshing gears turn in opposite directions; an idler gear makes them turn the same way; chain-linked sprockets turn the same way.
- MA = load ÷ effort; efficiency = MA ÷ VR × 100%; friction between teeth and in bearings makes it less than 100%; lubrication improves it.
- Compound gear trains: multiply the VRs of each pair. Uses: bicycles, gearboxes, hand drills, egg beaters, clocks.
:::
