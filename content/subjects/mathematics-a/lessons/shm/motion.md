---
{
  "key": "shm.motion",
  "title": "Simple harmonic motion",
  "summary": "Define simple harmonic motion by the equation ẍ = −ω²x, use the standard results for displacement, velocity, period, amplitude, maximum speed and acceleration, and form and solve the equation of motion for particles on springs and elastic strings and for a simple pendulum.",
  "concepts": ["amaths.shm.motion"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A load bouncing on a spring, a child on a swing, the needle of a sewing machine and the piston of a borehole pump all move to and fro about a centre. Many such oscillations share one mathematical pattern: the acceleration is always directed towards a fixed point and is proportional to the distance from it. This is **simple harmonic motion** (SHM), and its equation has a neat sine-wave solution.

ZIMSEC Mechanics examines SHM in Form 6 (topic 6.12): the definition, the standard formulae, and forming and solving the differential equation for particles on springs and strings and for the simple pendulum. Cambridge 9709 does not include SHM, so this lesson is for ZIMSEC candidates. You need Hooke's law, $a = v\frac{\mathrm{d}v}{\mathrm{d}x}$ and the trigonometric functions in radians.

## Key definitions

:::definition{term="Simple harmonic motion"}
A particle moves with SHM about a centre $O$ if its acceleration is always directed towards $O$ and proportional to its displacement $x$ from $O$:
$$
\ddot{x} = -\omega^2 x,
$$
where $\omega$ is a positive constant.
:::

:::definition{term="Amplitude and period"}
The **amplitude** $a$ is the greatest displacement from the centre. The **period** is the time for one complete oscillation.
:::

:::formula{name="Standard results for SHM"}
$$
x = a\sin(\omega t + \varepsilon), \qquad v^2 = \omega^2\left(a^2 - x^2\right), \qquad T = \frac{2\pi}{\omega}
$$
$$
v_{\max} = a\omega \text{ (at the centre)}, \qquad |\ddot{x}|_{\max} = a\omega^2 \text{ (at the ends)}
$$
:::

If the particle starts at the centre, $x = a\sin\omega t$; if it starts from rest at an end, $x = a\cos\omega t$. ZIMSEC prints no formula list, and questions often ask you to derive the velocity result.

## Where the results come from

**Velocity–displacement.** Write $\ddot{x} = v\frac{\mathrm{d}v}{\mathrm{d}x} = -\omega^2 x$ and integrate: $\tfrac{1}{2}v^2 = -\tfrac{1}{2}\omega^2x^2 + c$. At an end, $x = a$ and $v = 0$, so $c = \tfrac{1}{2}\omega^2a^2$ and
$$
v^2 = \omega^2\left(a^2 - x^2\right).
$$

**Displacement–time.** Check that $x = a\sin(\omega t + \varepsilon)$ works: $\dot{x} = a\omega\cos(\omega t + \varepsilon)$ and $\ddot{x} = -a\omega^2\sin(\omega t + \varepsilon) = -\omega^2 x$. The motion repeats when $\omega t$ increases by $2\pi$, so the period is $\frac{2\pi}{\omega}$, **independent of the amplitude**.

:::worked-solution[Example 1: A particle moves with SHM about $O$ with amplitude 0.5 m and period 4 s. Find (a) its greatest speed, (b) its speed when 0.3 m from $O$, (c) the time it takes to move from $O$ directly to a point 0.3 m from $O$.]
1. $\omega = \dfrac{2\pi}{4} = \dfrac{\pi}{2}$ rad s$^{-1}$.
2. (a) $v_{\max} = a\omega = 0.5 \times \dfrac{\pi}{2} = 0.785$ m s$^{-1}$.
3. (b) $v^2 = \left(\dfrac{\pi}{2}\right)^2\left(0.5^2 - 0.3^2\right) = 2.4674 \times 0.16$, so $v = \dfrac{\pi}{2} \times 0.4 = 0.628$ m s$^{-1}$.
4. (c) Starting at $O$: $x = 0.5\sin\left(\dfrac{\pi t}{2}\right)$. Set $x = 0.3$: $\sin\left(\dfrac{\pi t}{2}\right) = 0.6$.
5. $\dfrac{\pi t}{2} = 0.6435$, so $t = 0.410$ s.
:::

:::worked-solution[Example 2: A particle moving with SHM has speed 6 m s$^{-1}$ when 1 m from the centre and speed 4 m s$^{-1}$ when 2 m from the centre. Find the amplitude and the period.]
1. $36 = \omega^2(a^2 - 1)$ and $16 = \omega^2(a^2 - 4)$.
2. Subtract: $20 = 3\omega^2$, so $\omega^2 = \dfrac{20}{3}$ and $\omega = 2.582$ rad s$^{-1}$.
3. Then $a^2 - 1 = \dfrac{36}{20/3} = 5.4$, so $a^2 = 6.4$ and $a = 2.53$ m.
4. Period $= \dfrac{2\pi}{2.582} = 2.43$ s.
:::

## Forming the equation of motion

To **prove** that a motion is simple harmonic, take the displacement $x$ from the equilibrium position, write Newton's second law, and reach $\ddot{x} = -\omega^2x$. Then read off $\omega$, and so the period.

:::worked-solution[Example 3: A particle of mass 0.4 kg lies on a smooth horizontal table, attached to one end of a light spring of natural length 0.5 m and modulus 20 N whose other end is fixed. The particle is pulled 0.08 m from its equilibrium position and released. Show that it moves with SHM, and find the period and the greatest speed.]
1. When the extension is $x$, the tension is $\dfrac{20x}{0.5} = 40x$, pulling back towards the equilibrium position.
2. Newton's second law: $0.4\ddot{x} = -40x$, so $\ddot{x} = -100x$.
3. This is SHM with $\omega^2 = 100$, $\omega = 10$ rad s$^{-1}$, centre at the equilibrium position.
4. Period $= \dfrac{2\pi}{10} = 0.628$ s.
5. Released from rest at $x = 0.08$, so $a = 0.08$ m and $v_{\max} = a\omega = 0.8$ m s$^{-1}$.
:::

**Vertical springs and strings.** For a particle hanging on a spring or string, measure $x$ from the **equilibrium** position, where $\frac{\lambda e}{l} = mg$. At displacement $x$ below it, the tension is $\frac{\lambda(e + x)}{l}$, so
$$
m\ddot{x} = mg - \frac{\lambda(e + x)}{l} = -\frac{\lambda x}{l},
$$
because $mg$ and $\frac{\lambda e}{l}$ cancel. Hence $\omega^2 = \frac{\lambda}{ml}$, exactly as for the horizontal spring. For example, a 0.5 kg particle on a string of natural length 1 m and modulus 49 N has $e = 0.1$ m and $\omega^2 = 98$, period $0.635$ s. An elastic **string** gives SHM only while it stays taut, i.e. while the amplitude is no more than $e$.

## The simple pendulum

A particle of mass $m$ on a light string of length $l$ swings through a small angle $\theta$. Along the arc, $ml\ddot{\theta} = -mg\sin\theta$. For small angles (in radians) $\sin\theta \approx \theta$, so
$$
\ddot{\theta} = -\frac{g}{l}\theta, \qquad T = 2\pi\sqrt{\frac{l}{g}}.
$$
A pendulum of length 0.9 m has period $2\pi\sqrt{\frac{0.9}{9.8}} = 1.90$ s, whatever the mass, as long as the swing is small.

## Common mistakes

:::mistake{title="Measuring x from the wrong point"}
For a hanging particle, $x$ is measured from the equilibrium position, not from the natural length; otherwise $\ddot{x} = -\omega^2x$ will not appear.
:::

:::mistake{title="Using degrees"}
$\omega t$ is in radians. Set your calculator to radians for $\sin^{-1}$ and $\cos^{-1}$.
:::

:::mistake{title="Taking the period to depend on the amplitude"}
For SHM the period $\frac{2\pi}{\omega}$ is the same for every amplitude; a bigger amplitude means a bigger maximum speed.
:::

:::mistake{title="Forgetting that a string can go slack"}
If the amplitude exceeds the equilibrium extension, the string goes slack near the top and the motion is no longer SHM throughout.
:::

## Exam tips

:::exam-tip
"Show that the motion is simple harmonic" needs: a diagram with $x$ from the centre, Newton's second law in terms of $x$, the form $\ddot{x} = -\omega^2x$, and a statement naming $\omega$ and the centre.
:::

:::exam-tip
Choose sine or cosine to match the start: $x = a\sin\omega t$ from the centre, $x = a\cos\omega t$ from an end. Give times to 3 significant figures.
:::

## Summary

:::summary
- SHM: $\ddot{x} = -\omega^2 x$, acceleration towards the centre and proportional to displacement.
- $x = a\sin(\omega t + \varepsilon)$; $v^2 = \omega^2(a^2 - x^2)$; period $\frac{2\pi}{\omega}$; $v_{\max} = a\omega$; $|\ddot{x}|_{\max} = a\omega^2$.
- Spring or string (horizontal or vertical, $x$ from equilibrium): $\omega^2 = \frac{\lambda}{ml}$.
- Simple pendulum, small oscillations: $T = 2\pi\sqrt{\frac{l}{g}}$.
:::
