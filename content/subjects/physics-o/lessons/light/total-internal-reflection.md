---
{
  "key": "light.total-internal-reflection",
  "title": "Critical angle and total internal reflection",
  "summary": "Explain the critical angle and total internal reflection, use n = 1/sin c, and describe uses in optical fibres and prisms.",
  "concepts": ["phys.light.total-internal-reflection"],
  "objectives": ["cambridge/igcse/physics:3.2.2.4", "cambridge/igcse/physics:3.2.2.5", "cambridge/igcse/physics:3.2.2.8", "cambridge/igcse/physics:3.2.2.9", "zimsec/o-level/physics:10.2.4", "zimsec/o-level/physics:10.2.5"],
  "estimatedMinutes": 24
}
---
## Introduction

Fibre-optic cables carry internet data under city streets and across oceans as flashes of light trapped inside thin glass threads. Doctors look inside a patient's stomach through a flexible bundle of fibres. Diamonds sparkle. All of these depend on **total internal reflection**.

## Key definitions

:::definition{term="Critical angle, c"}
The angle of incidence, inside the denser medium, for which the angle of refraction is $90^\circ$.
:::

:::definition{term="Total internal reflection"}
The complete reflection of light back into a denser medium when it meets the boundary with a less dense medium at an angle of incidence greater than the critical angle.
:::

## What happens as the angle increases

Consider light inside a glass block travelling towards the boundary with air:

1. At small angles of incidence, most light **refracts out** into the air, bending away from the normal, and a little is reflected inside.
2. As the angle of incidence increases, the refracted ray bends further from the normal. At the **critical angle**, the refracted ray skims along the surface (angle of refraction $90^\circ$).
3. Above the critical angle, **no light** refracts out: all of it is reflected back into the glass. This is total internal reflection.

Two conditions are needed:

- the light must be travelling **from a denser into a less dense** medium (glass to air, water to air);
- the angle of incidence must be **greater than the critical angle**.

## Calculating the critical angle (Cambridge Supplement)

:::formula{name="Critical angle"}
$$
n = \frac{1}{\sin c}
$$
:::

:::worked-solution[The critical angle of glass]
Glass has a refractive index of $1.50$.

1. $\sin c = \dfrac{1}{n} = \dfrac{1}{1.50} = 0.667$.
2. $c = \sin^{-1}(0.667) = 41.8^\circ$.
3. Any ray inside this glass meeting an air boundary at more than $41.8^\circ$ is totally internally reflected.
:::

Diamond has a very high refractive index (about 2.4), so its critical angle is small (about $24^\circ$). Light entering a cut diamond is reflected many times inside before escaping, which makes it sparkle.

## Uses of total internal reflection

### Optical fibres

An optical fibre is a very thin, flexible strand of glass. Light entering one end hits the side at angles larger than the critical angle and is totally internally reflected again and again along the fibre, even round bends, with very little loss. Uses:

- **telecommunications**: fibres carry telephone, TV and internet signals as pulses of light or infrared, with huge amounts of data and little loss over long distances;
- **medicine**: an **endoscope** uses a bundle of fibres to carry light into the body and an image back out.

### Prisms

A right-angled glass prism with $45^\circ$ angles reflects light through $90^\circ$ (or $180^\circ$) by total internal reflection, because $45^\circ$ is greater than the critical angle of glass. Prisms are used instead of mirrors in **periscopes** and **binoculars**, because they reflect all the light and give a single, sharp image.

### Mirages (ZIMSEC)

On a hot day, air just above a tarred road is hotter and less dense than the air above it. Light from the sky curving down through these layers is eventually totally reflected upwards, so the road appears to have a pool of water on it: a **mirage**.

## Common mistakes

:::mistake{title="TIR from air into glass"}
Total internal reflection only happens when light goes from the denser medium towards the less dense one, for example from glass towards air.
:::

:::mistake{title="Exactly at the critical angle"}
At exactly the critical angle the ray refracts along the surface. Total internal reflection needs angles **greater** than the critical angle.
:::

## Exam tips

:::exam-tip
State both conditions for total internal reflection; examiners often give one mark for each.
:::

:::exam-tip
When drawing a ray in a fibre, make the reflections obey the law of reflection (equal angles), with each angle of incidence clearly greater than the critical angle.
:::

## Summary

:::summary
- The critical angle is the angle of incidence (in the denser medium) that gives an angle of refraction of 90°.
- Total internal reflection: light going from denser to less dense medium, at an angle greater than the critical angle.
- $n = \dfrac{1}{\sin c}$; glass with $n = 1.5$ has $c \approx 42^\circ$.
- Optical fibres carry light by repeated total internal reflection: telecommunications and endoscopes.
- 45° prisms in periscopes and binoculars use total internal reflection.
:::
