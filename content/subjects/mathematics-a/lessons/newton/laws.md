---
{
  "key": "newton.laws",
  "title": "Newton's laws of motion: F = ma, weight and inclined planes",
  "summary": "State Newton's three laws, use F = ma for a particle under constant forces, relate mass and weight, and solve problems on lifts, rough horizontal surfaces and smooth or rough inclined planes.",
  "concepts": ["amaths.newton.laws"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

Statics asked why things stay still; dynamics asks why they speed up, slow down or turn. The answer, given by Newton more than three hundred years ago, is surprisingly short: a resultant force causes an acceleration in its own direction, proportional to the force. With that one law you can find how quickly a loaded truck at Hwange accelerates up a ramp, the reading of a bathroom scale in a moving lift, or how far a box slides along a rough floor.

This lesson combines the force diagrams of the statics lessons with the constant-acceleration formulae. ZIMSEC examines it in Mechanics Form 5 (topic 6.4); Cambridge in Paper 4 (topic 4.4), where almost every paper has a question on a particle on a slope.

## Newton's three laws

:::definition{term="Newton's first law"}
A body stays at rest, or moves with constant velocity, unless a resultant force acts on it.
:::

:::definition{term="Newton's second law"}
The resultant force on a body of constant mass is proportional to its acceleration: with force in newtons, mass in kilograms and acceleration in m s$^{-2}$, $F = ma$, and the acceleration is in the direction of the resultant force.
:::

:::definition{term="Newton's third law"}
If body $A$ exerts a force on body $B$, then $B$ exerts an equal and opposite force on $A$.
:::

:::definition{term="Mass and weight"}
Mass (kg) measures the amount of matter and does not change from place to place. Weight is the gravitational force on the body: $W = mg$ newtons, acting vertically downwards.
:::

:::formula{name="Newton's second law"}
$$
\text{resultant force in a direction} = m \times \text{acceleration in that direction}
$$
:::

Not printed on MF19 or by ZIMSEC: learn it.

## The method

1. Draw a force diagram and mark the direction of the acceleration with a separate double-headed arrow.
2. Resolve **along** the direction of acceleration: (forces in that direction) $-$ (forces against it) $= ma$.
3. Resolve **perpendicular** to the acceleration: these forces balance (often giving $R$).
4. Use $F = \mu R$ if a body is sliding on a rough surface.
5. Use the constant-acceleration formulae for distances, speeds and times.

## Lifts and vertical motion

In a lift, the only forces on a passenger are the weight $mg$ down and the normal reaction $R$ from the floor up. A bathroom scale reads $R$, not the weight.

:::worked-solution[Example 1: Chipo, of mass $70$ kg, stands in a lift. Take $g = 10$ m s$^{-2}$. Find the reaction from the floor when the lift (a) moves up with acceleration $1.2$ m s$^{-2}$, (b) moves down while slowing at $0.8$ m s$^{-2}$.]
1. (a) Acceleration is upwards: $R - 70g = 70 \times 1.2$, so $R = 700 + 84 = 784$ N.
2. (b) Moving down but slowing down means the acceleration is **upwards**, $0.8$ m s$^{-2}$.
3. So $R - 700 = 70 \times 0.8$, giving $R = 756$ N.
4. In both cases Chipo "feels heavier": the floor pushes harder than her weight. She would feel lighter when the lift accelerates downwards.
:::

## Rough horizontal surfaces

:::worked-solution[Example 2: a box of mass $15$ kg is pulled across rough horizontal ground by a rope with tension $80$ N inclined at $20°$ above the horizontal. The coefficient of friction is $0.3$ and $g = 10$ m s$^{-2}$. Find the acceleration.]
1. Vertically (no vertical acceleration): $R + 80\sin 20° = 150$, so $R = 122.6$ N.
2. The box slides, so friction is limiting: $F = 0.3 \times 122.6 = 36.8$ N.
3. Horizontally: $80\cos 20° - 36.8 = 15a$, so $75.2 - 36.8 = 15a$.
4. Hence $a = 2.56$ m s$^{-2}$.
:::

## Inclined planes

On a slope of angle $\alpha$ the weight has components $mg\sin\alpha$ down the slope and $mg\cos\alpha$ into it. On a smooth slope with no other forces, $a = g\sin\alpha$ down the slope, whatever the mass.

On a rough slope, friction always acts **against the motion**. So the acceleration going up differs from that coming down:

- moving up: deceleration $g(\sin\alpha + \mu\cos\alpha)$;
- moving down: acceleration $g(\sin\alpha - \mu\cos\alpha)$, but only if $\tan\alpha > \mu$; otherwise the particle stops and stays at rest.

:::worked-solution[Example 3 (exam style): a particle is projected up a line of greatest slope of a rough plane inclined at $25°$ with speed $12$ m s$^{-1}$; $\mu = 0.2$ and $g = 10$ m s$^{-2}$. (a) Find the distance it travels up the plane. (b) Show that it then slides back down, and find its speed when it returns to its starting point.]
1. (a) Perpendicular to the plane: $R = mg\cos 25°$, so $F = 0.2mg\cos 25°$.
2. Moving up, friction acts down the plane: $-mg\sin 25° - 0.2mg\cos 25° = ma$, so $a = -10(0.4226 + 0.1813) = -6.039$ m s$^{-2}$.
3. $v^2 = u^2 + 2as$: $0 = 144 - 2(6.039)s$, so $s = 11.9$ m.
4. (b) At rest, the weight component down the slope is $mg\sin 25° = 4.23m$, and the greatest friction is $0.2mg\cos 25° = 1.81m$. Since $4.23m > 1.81m$, the particle slides down.
5. Moving down, friction acts up the plane: $a = 10(0.4226 - 0.1813) = 2.414$ m s$^{-2}$.
6. $v^2 = 0 + 2(2.414)(11.92)$, so $v = 7.59$ m s$^{-1}$: much less than $12$ m s$^{-1}$, because friction has done work on both journeys.
:::

The mass cancelled throughout Example 3. That often happens with a single particle and no applied force, and you may be told to leave $m$ as a letter.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge Paper 4 uses $g = 10$ m s$^{-2}$ and deals with particles only. ZIMSEC states $g$ (often $9.8$ m s$^{-2}$), asks for statements of Newton's laws, and may write forces and accelerations as vectors, as in $\mathbf{F} = m\mathbf{a}$ with $\mathbf{F} = (6\mathbf{i} - 8\mathbf{j})$ N.
:::

## Common mistakes

:::mistake{title="Putting ma on the force diagram"}
$ma$ is not a force. Draw only real forces, and show the acceleration as a separate arrow.
:::

:::mistake{title="Using the weight instead of the mass"}
In $F = ma$, $m$ is in kilograms. A body of weight $50$ N has mass $5$ kg when $g = 10$.
:::

:::mistake{title="Friction in the wrong direction on the way down"}
When a particle slides back down a rough slope, friction reverses and acts up the slope.
:::

:::mistake{title="Assuming it slides back"}
A particle that stops on a rough slope stays at rest if $\tan\alpha \le \mu$. Check before using the downward acceleration.
:::

## Exam tips

:::exam-tip
Write "N2L along the plane:" or "Resolving vertically:" before each equation. Examiners give a method mark for an equation with the correct number of terms and the correct structure, even if a sign slips.
:::

:::exam-tip
Use exact values from the question in later parts rather than rounded intermediate answers; keep at least 4 significant figures in working.
:::

:::exam-tip
When a lift question says "decelerating", decide first whether the acceleration is up or down.
:::

## Summary

:::summary
- Newton's second law: resultant force $= ma$, in the direction of the acceleration.
- Weight $W = mg$; a scale or floor reading is the normal reaction, not the weight.
- Resolve along the acceleration for $ma$ and perpendicular to it for $R$; use $F = \mu R$ when sliding.
- On a rough slope the acceleration going up, $g(\sin\alpha + \mu\cos\alpha)$ against the motion, differs from that coming down, $g(\sin\alpha - \mu\cos\alpha)$.
- A particle that stops on a rough slope slides back only if $\tan\alpha > \mu$.
:::
