---
{
  "key": "waves.polarisation-malus",
  "title": "Polarisation and Malus's law",
  "summary": "Describe plane-polarised waves, polarising filters and the polarisation of microwaves by a metal grille, and use Malus's law I = I₀cos²θ for plane-polarised light passing through one or more polarising filters.",
  "concepts": ["aphys.waves.polarisation-malus"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Look at a bright reflection from the surface of Lake Chivero through polarising sunglasses, then tilt your head: the glare brightens and dims. The sunglasses contain a polarising filter, and light reflected from water is partly polarised. Photographers, engineers testing plastic parts for stress, and the makers of every LCD screen in a phone rely on the same physics. This lesson makes the qualitative idea of polarisation quantitative.

You should know that electromagnetic waves are transverse and that intensity is proportional to amplitude squared (lesson on progressive waves). The qualitative idea that only transverse waves can be polarised is in the lesson comparing transverse and longitudinal waves.

## Key definitions

:::definition{term="Plane-polarised wave"}
A transverse wave whose oscillations (for light, the oscillations of the electric field) take place in one plane only, the plane containing the direction of travel.
:::

:::definition{term="Unpolarised wave"}
A transverse wave whose oscillations occur in many planes containing the direction of travel, changing randomly; light from the Sun, a filament lamp or a candle is unpolarised.
:::

:::definition{term="Polarising filter"}
A sheet that transmits only the component of a transverse wave's oscillation parallel to its transmission axis and absorbs the perpendicular component.
:::

:::formula{name="Malus's law"}
$$
I = I_0\cos^2\theta
$$

$I_0$ is the intensity of plane-polarised light incident on a polarising filter, $I$ the transmitted intensity (same unit as $I_0$, e.g. $\text{W m}^{-2}$), and $\theta$ the angle between the plane of polarisation of the incident light and the transmission axis of the filter.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Malus's law is **Cambridge only** (AS 7.5). ZIMSEC requires only the qualitative idea that polarisation shows a wave is transverse. Cambridge does not ask for the drop in intensity when unpolarised light enters the first filter; every Malus's-law calculation starts with light that is already plane polarised.
:::

## Where Malus's law comes from

A polarising filter passes only the component of the oscillation along its transmission axis. If the incident wave's amplitude is $A_0$ and its plane of polarisation makes an angle $\theta$ with the axis, the transmitted amplitude is the component

$$
A = A_0\cos\theta.
$$

Intensity is proportional to amplitude squared, so

$$
\frac{I}{I_0} = \frac{A^2}{A_0^2} = \cos^2\theta \quad\Rightarrow\quad I = I_0\cos^2\theta.
$$

The transmitted light is polarised in the plane of the filter's transmission axis, whatever its original plane was.

## How the transmitted intensity varies with angle

| $\theta\,/\,^\circ$ | $I/I_0$ |
| --- | --- |
| 0 | 1.000 |
| 15 | 0.933 |
| 30 | 0.750 |
| 45 | 0.500 |
| 60 | 0.250 |
| 75 | 0.067 |
| 90 | 0.000 |

A graph of $I/I_0$ against $\theta$ falls from 1 at $0^\circ$ to 0 at $90^\circ$ along an S-shaped curve, passing through 0.5 at $45^\circ$. As the filter is turned through a full $360^\circ$ there are **two maxima** ($0^\circ$, $180^\circ$) and **two minima** ($90^\circ$, $270^\circ$). A graph of $I$ against $\cos^2\theta$ is a straight line through the origin with gradient $I_0$, which is the best way to test the law in the laboratory.

## Worked examples

:::worked-solution[One analyser]
Plane-polarised light of intensity $12\ \text{W m}^{-2}$ falls on a polarising filter whose transmission axis is at $30^\circ$ to the plane of polarisation. Find the transmitted intensity, and the intensity when the angle is $60^\circ$.

1. $I = I_0\cos^2\theta = 12 \times \cos^2 30^\circ = 12 \times 0.750 = 9.0\ \text{W m}^{-2}$.
2. At $60^\circ$: $I = 12 \times \cos^2 60^\circ = 12 \times 0.250 = 3.0\ \text{W m}^{-2}$.
3. Note that $\cos 30^\circ = 0.866$; forgetting to square gives $10.4\ \text{W m}^{-2}$, which is wrong.
:::

:::worked-solution[Two filters in series]
Plane-polarised light of intensity $I_0$ meets filter 1, whose axis is at $45^\circ$ to the plane of polarisation, then filter 2, whose axis is at $90^\circ$ to the original plane (so $45^\circ$ to filter 1).

1. After filter 1: $I_1 = I_0\cos^2 45^\circ = 0.500I_0$, now polarised along filter 1's axis.
2. After filter 2: the angle between filter 1's axis and filter 2's axis is $45^\circ$, so $I_2 = I_1\cos^2 45^\circ = 0.250I_0$.
3. Without filter 1, filter 2 alone (at $90^\circ$) would transmit nothing. Adding a filter **between** two crossed filters lets light through, because each filter re-defines the plane of polarisation.
:::

:::worked-solution[Finding an angle]
At what angle between the plane of polarisation and the filter axis is the intensity reduced to one quarter?

1. $\cos^2\theta = 0.25$, so $\cos\theta = 0.50$.
2. $\theta = 60^\circ$ (or $120^\circ$, $240^\circ$, $300^\circ$ in a full turn).
:::

## Polarising microwaves

A school microwave transmitter emits plane-polarised waves because its aerial is a short straight rod: the electric field oscillates parallel to the rod. A grille of parallel metal rods acts like a polarising filter, but the "wrong" way round compared with a light filter:

- rods **parallel** to the electric-field oscillation: electrons in the rods are driven along them, absorbing (and reflecting) the wave, so little is transmitted;
- rods **perpendicular** to the oscillation: electrons cannot move far across the thin rods, so the wave passes.

Rotating the receiver about the beam axis also shows polarisation: its signal is a maximum when its aerial is parallel to the transmitter's and almost zero when crossed. Malus's law applies to the intensity received at intermediate angles.

## Common mistakes

:::mistake{title="Forgetting to square the cosine"}
Amplitude goes as $\cos\theta$; intensity goes as $\cos^2\theta$.
:::

:::mistake{title="Measuring θ from the wrong line"}
$\theta$ is between the plane of polarisation of the light **arriving** at a filter and that filter's axis. For a second filter, the arriving light is polarised along the first filter's axis.
:::

:::mistake{title="Thinking a filter adds light"}
A middle filter between crossed filters increases the final intensity only from zero to a fraction of $I_0$; each filter can only reduce the intensity it receives.
:::

:::mistake{title="Applying Malus's law to unpolarised light"}
Malus's law needs plane-polarised incident light. The intensity loss at the first filter for unpolarised light is not examined by Cambridge.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Papers 1 and 2 (AS); a polarisation experiment can also appear on Paper 5 (planning: intensity through polarisers measured with a light sensor). Not examined by ZIMSEC.
:::

:::exam-tip{title="Command words"}
*Explain what is meant by plane polarised*: oscillations in one plane only, containing the direction of travel. *Calculate*: write $I = I_0\cos^2\theta$, show the angle and the square. *Sketch* the variation of $I$ with $\theta$: describe a $\cos^2$ curve with maxima at $0^\circ$ and $180^\circ$ and zeros at $90^\circ$ and $270^\circ$.
:::

## Summary

:::summary
- Plane-polarised light oscillates in one plane only; only transverse waves can be polarised.
- A polarising filter transmits the component of oscillation along its axis: $A = A_0\cos\theta$.
- Malus's law: $I = I_0\cos^2\theta$ for plane-polarised incident light.
- For filters in series, apply the law at each filter, using the angle between successive axes.
- Microwaves are polarised by a metal grille; rods parallel to the oscillation absorb the wave.
:::
