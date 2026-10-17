---
{
  "key": "mammal-transport.heart",
  "title": "The mammalian heart and the cardiac cycle",
  "summary": "The external and internal structure of the heart and why its walls differ in thickness, the pressure changes in the atria, ventricles and aorta during the cardiac cycle and how they open and close the valves, heart rate and cardiac output calculations, and how the sinoatrial node, atrioventricular node, bundle of His and Purkyne tissue coordinate each beat.",
  "concepts": ["abio.mammal-transport.heart"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Put two fingers on the side of your neck and count: about 60 to 80 beats a minute at rest. Each of those beats is started by a small patch of tissue in the wall of your right atrium, without any instruction from the brain. Even a heart removed for transplant keeps beating for a while in a suitable solution. That self-starting property, and the precise timing that makes the atria contract before the ventricles, are what make the heart such an efficient double pump.

You should already know the double circulation and the main vessels, the structure of arteries and veins, and the idea that liquids flow from high to low pressure.

## Key definitions

:::definition{term="Cardiac cycle"}
The sequence of events in one heartbeat: contraction (systole) and relaxation (diastole) of the atria and ventricles, and the opening and closing of the valves.
:::

:::definition{term="Systole"}
The phase in which heart muscle contracts; atrial systole is followed by ventricular systole.
:::

:::definition{term="Diastole"}
The phase in which heart muscle relaxes and the chambers fill with blood.
:::

:::definition{term="Myogenic"}
Describes muscle that contracts rhythmically without needing a nerve impulse; cardiac muscle is myogenic.
:::

:::definition{term="Cardiac output"}
The volume of blood pumped by one ventricle per minute: stroke volume × heart rate.
:::

## Structure of the heart

**External features:** the heart sits in the thorax between the lungs, enclosed in a tough pericardium. The **coronary arteries** branch from the base of the aorta and run over the surface, supplying the heart muscle itself with oxygenated blood. The atria are at the top (broad end); the ventricles form the bulk below.

**Internal structure:**

![Internal structure of the heart: deoxygenated blood from the venae cavae enters the right atrium and passes through the tricuspid valve to the right ventricle and out by the pulmonary artery; oxygenated blood from the pulmonary veins enters the left atrium, passes through the bicuspid valve to the left ventricle, whose wall is two to three times thicker, and leaves by the aorta; a septum separates the two sides and tendinous cords hold the valve flaps.](media:diagrams/heart-internal-structure.png "Figure: the four chambers, valves and main vessels of the mammalian heart (diagrammatic)")

| Structure | Position and role |
|---|---|
| Right atrium | Receives deoxygenated blood from the venae cavae |
| Right ventricle | Pumps deoxygenated blood to the lungs through the pulmonary artery |
| Left atrium | Receives oxygenated blood from the pulmonary veins |
| Left ventricle | Pumps oxygenated blood to the body through the aorta |
| Septum | Wall of muscle separating left and right sides, so oxygenated and deoxygenated blood do not mix |
| Tricuspid valve | Atrioventricular valve on the right; stops backflow from right ventricle to right atrium |
| Bicuspid (mitral) valve | Atrioventricular valve on the left |
| Tendinous cords (chordae tendineae) | Attach AV valve flaps to papillary muscles; stop the valves turning inside out |
| Semilunar valves | At the bases of the aorta and pulmonary artery; stop backflow into the ventricles |

**Wall thickness:**

- **Atria have thin walls**: they pump blood only a short distance, into the ventricles below.
- **Ventricles have thick walls**: they pump blood out of the heart into the arteries.
- **The left ventricle wall is about two to three times thicker than the right**: it must generate a much higher pressure to push blood around the whole systemic circulation, whereas the right ventricle pumps only to the nearby lungs, where a high pressure would damage the capillaries.

## The cardiac cycle

At a rate of 75 beats per minute one cycle lasts $60 \div 75 = 0.8$ s.

1. **Atrial systole (about 0.1 s).** The atria contract, raising atrial pressure slightly, and push the last blood into the relaxed ventricles through the open atrioventricular (AV) valves. The semilunar valves are closed.
2. **Ventricular systole (about 0.3 s).** The ventricles contract from the apex (the bottom) upwards. Ventricular pressure rises above atrial pressure, so the **AV valves close** (the first heart sound). For a moment all valves are closed and pressure rises steeply. When ventricular pressure exceeds the pressure in the aorta and pulmonary artery, the **semilunar valves open** and blood is ejected.
3. **Diastole (about 0.4 s).** The ventricles relax. Ventricular pressure falls below arterial pressure, so the **semilunar valves close** (the second heart sound), seen as a small notch in the aortic pressure trace. When ventricular pressure falls below atrial pressure, the **AV valves open**, and blood flows from the veins through the atria into the ventricles.

![Pressure in the left atrium, left ventricle and aorta over one 0.8 s cardiac cycle: ventricular pressure jumps from 1.2 to 15.0 kPa between 0.1 and 0.2 s and peaks at 16.0 kPa at 0.3 s, above the aortic 14.5 to 15.5 kPa so the semilunar valve opens; by 0.4 s the ventricle (8.0) is below the aorta (13.2) and it shuts, while aortic pressure never falls below 10.7 kPa.](media:diagrams/cardiac-cycle-pressure-graph.png "Figure: pressure changes in the left side of the heart during one cycle (data from the worked solution)")

The rule is simple: **valves open when the pressure behind them is higher than the pressure in front, and close when it reverses.**

:::worked-solution[Reading valves from pressure data]
Pressures on the left side of a human heart during one cycle:

| Time / s | 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 |
|---|---|---|---|---|---|---|---|---|---|
| Left atrium / kPa | 1.0 | 1.5 | 0.6 | 0.7 | 0.9 | 1.0 | 0.9 | 0.9 | 1.0 |
| Left ventricle / kPa | 0.8 | 1.2 | 15.0 | 16.0 | 8.0 | 0.6 | 0.6 | 0.7 | 0.8 |
| Aorta / kPa | 11.0 | 10.7 | 14.5 | 15.5 | 13.2 | 12.6 | 12.0 | 11.5 | 11.0 |

1. At 0.1 s: atrium (1.5) > ventricle (1.2), so the bicuspid valve is **open**; aorta (10.7) > ventricle, so the semilunar valve is **closed**. This is atrial systole.
2. At 0.2 s and 0.3 s: ventricle > atrium, so the bicuspid valve is **closed**; ventricle (15.0, 16.0) > aorta (14.5, 15.5), so the semilunar valve is **open**: ejection.
3. At 0.4 s: ventricle (8.0) < aorta (13.2), so the semilunar valve has **closed**; ventricle > atrium, so the bicuspid valve is still **closed**. Both valves are shut while the ventricle relaxes.
4. At 0.5 s: ventricle (0.6) < atrium (1.0), so the bicuspid valve **opens** and the ventricle fills.
5. The aortic pressure never falls to zero (lowest 10.7 kPa) because the elastic wall recoils during diastole.
:::

## Heart rate and cardiac output

$$
\text{cardiac output} = \text{stroke volume} \times \text{heart rate}
$$

:::worked-solution[Calculating cardiac output]
At rest, Farai's stroke volume is 70 cm³ and his heart rate 72 beats per minute.
1. Cardiac output $= 70 \times 72 = 5040\ \text{cm}^3\ \text{min}^{-1}$.
2. In dm³: $5040 \div 1000 = 5.04\ \text{dm}^3\ \text{min}^{-1}$, roughly the whole blood volume every minute.
3. Heart rate from the length of one cycle: $\text{heart rate} = 60 \div \text{cycle time in seconds}$.
:::

## Control of the heartbeat

Cardiac muscle is **myogenic**: the beat starts within the heart.

1. The **sinoatrial node (SAN)**, a patch of specialised muscle in the wall of the right atrium, generates waves of electrical excitation at regular intervals: the **pacemaker**.
2. Excitation spreads across both **atria**, which contract (atrial systole).
3. A layer of **non-conducting tissue** between atria and ventricles prevents the wave passing straight to the ventricles.
4. The **atrioventricular node (AVN)**, in the septum near the AV valves, picks up the excitation and **delays** it for about 0.1 s. This gives the atria time to finish emptying before the ventricles contract.
5. The excitation passes down the **bundle of His** in the septum to the apex.
6. It spreads up the ventricle walls through the **Purkyne tissue** (Purkinje fibres), so the ventricles contract **from the apex upwards**, squeezing blood up towards the arteries.

The SAN sets the rhythm, but its rate is adjusted: the cardiovascular centre in the medulla of the brain sends impulses along sympathetic nerves (speeding up) and the vagus nerve (slowing down), and adrenaline from the adrenal glands increases the rate and force of contraction.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: external and internal structure, wall thickness, the cardiac cycle with pressure changes and valves, and the SAN, AVN, bundle of His and Purkyne tissue (ZIMSEC calls this "myogenic control" with the pacemaker). Nervous and hormonal control of heart rate is an outline extension for ZIMSEC only. Heart rate and cardiac output calculations suit both.
:::

## Common mistakes

:::mistake{title="Saying valves open because muscles pull them"}
Heart valves are **passive**: pressure differences open and close them. Tendinous cords only stop AV valves turning inside out.
:::

:::mistake{title="Saying the left ventricle pumps more blood than the right"}
Both ventricles pump the **same volume** per beat. The left generates a **higher pressure** because the systemic circulation is longer and has more resistance.
:::

:::mistake{title="Forgetting why the AVN delay matters"}
State the reason: the atria finish contracting and the ventricles fill **before** ventricular systole begins.
:::

:::mistake{title="Saying the brain starts the heartbeat"}
The **SAN** starts each beat (myogenic). The brain only adjusts the rate.
:::

## Exam tips

:::exam-tip
In ZIMSEC Paper 2 and Cambridge Paper 2, pressure data are often given as a table or described graph. Identify each valve by comparing the two pressures on either side of it, quote the times and pressures, and say "open" or "closed".
:::

:::exam-tip
For *explain* questions on coordination, give the sequence SAN → atria contract → AVN delay → bundle of His → Purkyne tissue → ventricles contract from the apex upwards, with the purpose of each step. Show working for cardiac output and heart rate (60 ÷ cycle time) with units.
:::

## Summary

:::summary
- Four chambers; septum separates the sides; AV valves (tricuspid, bicuspid) and semilunar valves prevent backflow; coronary arteries supply the heart muscle.
- Atria have thin walls; the left ventricle wall is thicker than the right because it pumps blood at higher pressure round the body.
- Cardiac cycle: atrial systole, ventricular systole, diastole; valves open and close passively with pressure differences.
- Cardiac output = stroke volume × heart rate; heart rate = 60 ÷ cycle time (s).
- SAN (pacemaker) → atria → AVN delay → bundle of His → Purkyne tissue → ventricles contract from the apex.
:::
