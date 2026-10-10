---
{
  "key": "quantum.photons",
  "title": "Photons: energy, momentum and the electronvolt",
  "summary": "Describe electromagnetic radiation as a stream of photons, calculate photon energy from E = hf = hc/λ in joules and electronvolts, convert between eV and J, find photon momentum from p = E/c, and calculate the number of photons emitted per second by a source of known power.",
  "concepts": ["aphys.quantum.photons"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A solar panel on a roof in Masvingo and the retina of your eye both respond to light in a way the wave model cannot explain: light delivers its energy in separate packets. A dim violet lamp can trigger effects that a bright red one cannot, because what matters is the energy of each packet, not the total power. These packets are **photons**.

This lesson introduces the photon model of electromagnetic radiation, the Planck relation $E = hf$, the electronvolt as a convenient energy unit, the momentum carried by photons, and how to count the photons emitted by a lamp or laser. The photoelectric effect, which is the main evidence for photons, follows in the next lesson.

You should already know the electromagnetic spectrum, the wave equation $c = f\lambda$, and that a charge $Q$ moving through a p.d. $V$ transfers energy $QV$.

## Key definitions

:::definition{term="Photon"}
A quantum (discrete packet) of electromagnetic energy. A photon of radiation of frequency $f$ has energy $hf$.
:::

:::definition{term="The Planck constant h"}
The constant of proportionality between the energy of a photon and the frequency of the radiation: $h = 6.63 \times 10^{-34}\ \text{J s}$.
:::

:::definition{term="Electronvolt (eV)"}
The energy transferred when an electron moves through a potential difference of one volt: $1\ \text{eV} = 1.60 \times 10^{-19}\ \text{J}$.
:::

:::formula{name="Photon energy"}
$$
E = hf = \frac{hc}{\lambda}
$$

$E$ photon energy in J; $h = 6.63 \times 10^{-34}\ \text{J s}$; $f$ frequency in Hz; $c = 3.00 \times 10^{8}\ \text{m s}^{-1}$; $\lambda$ wavelength in m.
:::

:::formula{name="Photon momentum"}
$$
p = \frac{E}{c} = \frac{h}{\lambda}
$$

$p$ in $\text{N s}$ (or $\text{kg m s}^{-1}$).
:::

:::formula{name="Photons per second"}
$$
N = \frac{P}{hf} = \frac{P\lambda}{hc}
$$

$N$ number of photons emitted per second; $P$ power of the radiation in W.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 (quantum physics) and Cambridge A Level topic 22 (Paper 4). Use the data-sheet values $h = 6.63 \times 10^{-34}\ \text{J s}$, $c = 3.00 \times 10^{8}\ \text{m s}^{-1}$ and $e = 1.60 \times 10^{-19}\ \text{C}$.
:::

## The particulate nature of electromagnetic radiation

Interference and diffraction show that light behaves as a wave. But when light is **emitted or absorbed**, energy is transferred in whole photons: an atom absorbs one photon or none. The energy of each photon depends only on the frequency; the intensity of a beam depends on how many photons arrive per second per unit area.

- Doubling the **intensity** at the same frequency doubles the number of photons per second; each photon has the same energy.
- Doubling the **frequency** doubles the energy of every photon.

A photon has no rest mass and always travels at $c$ in a vacuum.

## Photon energies across the spectrum

| radiation | $\lambda\,/\,\text{m}$ | $f\,/\,\text{Hz}$ | $E\,/\,\text{J}$ | $E\,/\,\text{eV}$ |
| --- | --- | --- | --- | --- |
| FM radio | $3.0$ | $1.0 \times 10^{8}$ | $6.6 \times 10^{-26}$ | $4.1 \times 10^{-7}$ |
| microwave | $0.12$ | $2.5 \times 10^{9}$ | $1.7 \times 10^{-24}$ | $1.0 \times 10^{-5}$ |
| infrared | $1.0 \times 10^{-5}$ | $3.0 \times 10^{13}$ | $2.0 \times 10^{-20}$ | $0.12$ |
| red light | $7.0 \times 10^{-7}$ | $4.3 \times 10^{14}$ | $2.8 \times 10^{-19}$ | $1.8$ |
| violet light | $4.0 \times 10^{-7}$ | $7.5 \times 10^{14}$ | $5.0 \times 10^{-19}$ | $3.1$ |
| ultraviolet | $1.0 \times 10^{-7}$ | $3.0 \times 10^{15}$ | $2.0 \times 10^{-18}$ | $12$ |
| X-ray | $1.0 \times 10^{-10}$ | $3.0 \times 10^{18}$ | $2.0 \times 10^{-15}$ | $1.2 \times 10^{4}$ |
| gamma | $1.0 \times 10^{-12}$ | $3.0 \times 10^{20}$ | $2.0 \times 10^{-13}$ | $1.2 \times 10^{6}$ |

A graph of $E$ against $f$ is a straight line through the origin with gradient $h$. A graph of $E$ against $\lambda$ is a curve ($E \propto 1/\lambda$); plotting $E$ against $1/\lambda$ gives a straight line of gradient $hc$. Visible photons carry roughly 2 to 3 eV, comparable with the energies of chemical bonds and electron energy levels; this is why visible and ultraviolet light drive photosynthesis, vision and sunburn, while radio photons are far too weak to break bonds.

## The electronvolt

Photon and atomic energies are tiny in joules, so the electronvolt is used.

- J to eV: divide by $1.60 \times 10^{-19}$.
- eV to J: multiply by $1.60 \times 10^{-19}$.

A useful shortcut: $hc = 6.63 \times 10^{-34} \times 3.00 \times 10^{8} = 1.99 \times 10^{-25}\ \text{J m}$, so a photon of wavelength $\lambda$ in nanometres has energy of about $1240/\lambda$ eV.

## Photon momentum

Photons carry momentum $p = E/c = h/\lambda$ even though they have no rest mass. When light is absorbed by a surface, its momentum is transferred, so light exerts a small force. A beam of power $P$ delivers momentum $P/c$ per second when absorbed (a force $F = P/c$), and twice this when perfectly reflected, because the momentum of each photon reverses.

## Worked examples

:::worked-solution[Energy of a photon in J and eV]
Find the energy of a photon of yellow sodium light of wavelength $589\ \text{nm}$.

1. $E = \dfrac{hc}{\lambda} = \dfrac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{589 \times 10^{-9}}$.
2. $E = 3.38 \times 10^{-19}\ \text{J}$.
3. In eV: $3.38 \times 10^{-19}/1.60 \times 10^{-19} = 2.11\ \text{eV}$.
:::

:::worked-solution[Photons per second from a laser]
A laser emits $5.0\ \text{mW}$ of light of wavelength $633\ \text{nm}$. How many photons does it emit per second?

1. Energy per photon: $E = hc/\lambda = 3.14 \times 10^{-19}\ \text{J}$.
2. $N = P/E = 5.0 \times 10^{-3}/3.14 \times 10^{-19}$.
3. $N = 1.59 \times 10^{16}$ photons per second.
:::

:::worked-solution[Photon momentum and radiation force]
Find the momentum of a photon of wavelength $450\ \text{nm}$, and the force exerted by a $2.0\ \text{kW}$ beam completely absorbed by a surface.

1. $p = h/\lambda = 6.63 \times 10^{-34}/450 \times 10^{-9} = 1.47 \times 10^{-27}\ \text{N s}$.
2. Force = momentum delivered per second $= P/c = 2.0 \times 10^{3}/3.00 \times 10^{8}$.
3. $F = 6.67 \times 10^{-6}\ \text{N}$: tiny, which is why we do not feel sunlight pushing us.
:::

## Common mistakes

:::mistake{title="Nanometres not converted"}
$\lambda$ must be in metres: $589\ \text{nm} = 589 \times 10^{-9}\ \text{m}$. Leaving it in nm gives energies $10^9$ times too small.
:::

:::mistake{title="Brighter means more energetic photons"}
Intensity changes the **number** of photons per second, not the energy of each one. Only frequency sets the photon energy.
:::

:::mistake{title="eV conversion the wrong way"}
To go from J to eV, **divide** by $1.60 \times 10^{-19}$. A visible photon is a few eV, never $10^{-38}$ eV.
:::

:::mistake{title="Mass of a photon"}
A photon has no rest mass, but it does have momentum $E/c$. Do not use $p = mv$ for a photon.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Paper 4 (A Level topic 22) and ZIMSEC Papers 1-3 (Form 6). Photon energy and eV conversions appear inside almost every quantum question; photon counting from power is a favourite multi-step calculation.
:::

:::exam-tip{title="Command words"}
*State* what is meant by a photon: "a quantum of electromagnetic energy" (energy $hf$). *Calculate*: write $E = hc/\lambda$ with SI units substituted, then convert. *Show that*: give the answer to one more significant figure than the stated value. *Explain* why a brighter source emits more photons per second at the same frequency.
:::

## Summary

:::summary
- Electromagnetic radiation is emitted and absorbed in photons, each of energy $E = hf = hc/\lambda$.
- $1\ \text{eV} = 1.60 \times 10^{-19}\ \text{J}$; visible photons carry about 1.8 to 3.1 eV.
- Photon momentum $p = E/c = h/\lambda$; an absorbed beam of power $P$ exerts a force $P/c$.
- Photons emitted per second $N = P/(hf)$.
- Intensity sets the number of photons; frequency sets the energy of each.
:::
