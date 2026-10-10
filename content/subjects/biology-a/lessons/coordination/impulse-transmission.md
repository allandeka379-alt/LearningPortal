---
{
  "key": "coordination.impulse-transmission",
  "title": "Transmission of nerve impulses along axons",
  "summary": "How local circuits propagate an action potential along an axon; saltatory conduction in myelinated axons; how myelination, axon diameter and temperature affect conduction speed, with speeds calculated from data; and why the refractory period makes transmission one-way and impulses discrete.",
  "concepts": ["abio.coordination.impulse-transmission"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

A cheetah sprinting across the plains of Hwange needs signals from its brain to reach the muscles of its legs, more than a metre away, almost instantly. A single action potential lasts only a couple of milliseconds and affects only a small patch of membrane, so how does the message travel the full length of an axon, and how does it travel so fast? The answer lies in **local circuits** of current, in the **myelin sheath** and in the **refractory period**.

You should already know the ion movements in the resting potential and the action potential, and the structure of a myelinated neurone (Schwann cells, myelin, nodes of Ranvier).

## Key definitions

:::definition{term="Nerve impulse"}
A wave of action potentials travelling along the membrane of a neurone, each region depolarising the next.
:::

:::definition{term="Local circuit"}
The movement of ions (a small current) between a depolarised region of an axon membrane and the neighbouring resting region, on both the inside and the outside of the membrane, which depolarises the neighbouring region.
:::

:::definition{term="Saltatory conduction"}
Conduction in a myelinated axon in which action potentials occur only at the nodes of Ranvier, so that the impulse effectively jumps from node to node.
:::

:::definition{term="Conduction velocity"}
The speed at which an impulse travels along an axon, calculated as distance travelled divided by time taken; usually given in m s⁻¹.
:::

:::keyfact{title="Typical speeds (approximate)"}
- Thin unmyelinated axons in mammals: about 0.5-2 m s⁻¹.
- Large myelinated mammalian axons: up to about 100-120 m s⁻¹.
- The giant unmyelinated axon of a squid (about 0.5-1 mm across): about 20-25 m s⁻¹.
- Units: 1 m s⁻¹ = 1 mm ms⁻¹.
:::

## Propagation along an unmyelinated axon

An action potential at one point of the axon starts the next one beside it. The stages are:

1. At the site of an action potential the inside of the membrane is positive (about +30 mV) and the outside negative, because Na⁺ has entered.
2. Just ahead, the membrane is still at rest: inside negative, outside positive.
3. Sodium ions that have entered **diffuse sideways** inside the axon towards the neighbouring negative region. On the outside, positive ions move the other way, towards the depolarised region. These movements form **local circuits**.
4. The local current makes the neighbouring membrane less negative. When it reaches the **threshold**, voltage-gated sodium channels there open, and a new action potential is generated.
5. Meanwhile, the region behind is repolarising and is in its **refractory period**, so it cannot be re-excited.

In this way the action potential travels as a wave along the axon without getting smaller: each region produces its own full-sized, all-or-nothing action potential. Because every small patch of membrane must depolarise in turn, conduction in an unmyelinated axon is relatively slow.

## Saltatory conduction in myelinated axons

In many vertebrate neurones, Schwann cells wrap layers of membrane around the axon to form the **myelin sheath**. Myelin is mainly lipid and is an electrical insulator: ions cannot flow across the membrane where it is covered. The sheath is broken every 1-3 mm by a **node of Ranvier**, where the axon membrane is exposed and voltage-gated channels are concentrated.

1. An action potential occurs at one node.
2. Local circuits extend along the inside of the axon, under the myelin, to the next node.
3. The next node is depolarised to threshold, and an action potential is produced there.
4. The impulse therefore **jumps** from node to node. This is saltatory conduction (from the Latin *saltare*, to jump).

Saltatory conduction is much faster than continuous conduction, because depolarisation happens only at the nodes instead of along every part of the membrane. It is also more economical: fewer ions cross the membrane, so the sodium-potassium pump uses less ATP restoring the gradients.

## Factors affecting the speed of conduction

| Factor | Effect on speed | Explanation |
|---|---|---|
| Myelination | Much faster in myelinated axons | Saltatory conduction: depolarisation only at the nodes, so local circuits span longer distances |
| Axon diameter | Faster in wider axons | Less resistance to the flow of ions in the cytoplasm, so local currents spread further and depolarise the next region sooner; also less ion leakage relative to volume |
| Temperature | Faster at higher temperature, up to about 40 °C | Ions diffuse faster; above this proteins such as channels and pumps begin to denature |

Invertebrates such as squid lack myelin but have some very wide (giant) axons, which conduct fast enough for escape responses. Myelinated mammalian axons achieve high speeds while staying thin, so many can be packed into one nerve.

:::worked-solution[Calculating conduction velocity]
Two recording electrodes are placed 60 mm apart on a nerve. An action potential reaches the second electrode 1.2 ms after the first.
1. Convert to SI units: distance $= 60\ \text{mm} = 0.060\ \text{m}$; time $= 1.2\ \text{ms} = 0.0012\ \text{s}$.
2. Speed $= \dfrac{\text{distance}}{\text{time}} = \dfrac{0.060}{0.0012} = 50\ \text{m s}^{-1}$.
3. Check with the shortcut 1 mm ms⁻¹ = 1 m s⁻¹: $60 \div 1.2 = 50$ mm ms⁻¹ $= 50$ m s⁻¹.
4. A speed of 50 m s⁻¹ suggests a myelinated axon.
:::

:::worked-solution[Time for an impulse to travel a nerve]
A myelinated motor neurone 0.9 m long conducts at 90 m s⁻¹.
1. Time $= \dfrac{\text{distance}}{\text{speed}} = \dfrac{0.9}{90} = 0.01\ \text{s}$.
2. In milliseconds: $0.01 \times 1000 = 10$ ms.
3. An unmyelinated fibre of the same length conducting at 1 m s⁻¹ would take $0.9 \div 1 = 0.9$ s, 90 times longer.
:::

:::example{title="Interpreting speed data"}
A student is given these results:

| Axon | Diameter / µm | Myelinated? | Speed / m s⁻¹ |
|---|---|---|---|
| P | 1 | No | 1 |
| Q | 500 | No | 25 |
| R | 10 | Yes | 60 |

**Describe and explain:** the wider unmyelinated axon Q conducts 25 times faster than P because a larger diameter lowers the resistance to local currents. R is only one-fiftieth as wide as Q but conducts more than twice as fast, because myelin allows saltatory conduction. Myelination has a much greater effect on speed than diameter.
:::

## The refractory period and transmission

The refractory period has three important consequences.

1. **One-way transmission.** The region just behind an action potential is refractory, because its sodium channels are inactivated. Local currents can therefore depolarise only the resting membrane ahead, so impulses travel in one direction along the axon.
2. **Discrete impulses.** A new action potential cannot be generated straight away at the same place, so action potentials are separated from each other and do not merge.
3. **A maximum frequency.** The length of the refractory period limits how many impulses can pass a point each second.

### How stimulus strength is coded

Because every action potential is the same size, a neurone signals a stronger stimulus by sending action potentials **more frequently**. A strong stimulus also tends to stimulate **more** neurones (more receptors reach their threshold). The brain interprets the frequency and the number of neurones firing as the intensity of the stimulus.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect local circuits, saltatory conduction, the factors affecting speed and the importance of the refractory period. Calculating speeds from data is common in Cambridge Paper 4 and in ZIMSEC Paper 2.
:::

## Common mistakes

:::mistake{title="Saying the impulse jumps along the myelin"}
The action potential occurs only at the nodes of Ranvier. Local circuits flow under the myelin; the myelin itself does not conduct.
:::

:::mistake{title="Saying the action potential gets weaker along the axon"}
Each region produces its own full-sized action potential, so the impulse does not fade.
:::

:::mistake{title="Forgetting to convert units"}
Speeds are usually in m s⁻¹. Convert mm to m and ms to s, or use 1 mm ms⁻¹ = 1 m s⁻¹.
:::

## Exam tips

:::exam-tip
To *explain* how an impulse is propagated, use the words local circuits, depolarisation of the next region to threshold, voltage-gated sodium channels and refractory region behind.
:::

:::exam-tip
In *calculate* questions write speed = distance ÷ time, convert units first, and give the unit (m s⁻¹). Cambridge Paper 4 and ZIMSEC Paper 2 often follow with *suggest* whether the axon is myelinated.
:::

:::exam-tip
When asked to *compare* speeds from data, quote figures from both axons and link each difference to one factor (myelin or diameter).
:::

## Summary

:::summary
- Local circuits of ions depolarise the next region of membrane to threshold, so the action potential travels as a wave without fading.
- In myelinated axons, action potentials occur only at nodes of Ranvier: saltatory conduction is faster and uses less ATP.
- Conduction speed increases with myelination, axon diameter and temperature (up to about 40 °C).
- Speed = distance ÷ time; 1 mm ms⁻¹ = 1 m s⁻¹.
- The refractory period makes transmission one-way, keeps impulses discrete and limits their frequency; stimulus strength is coded by frequency.
:::
