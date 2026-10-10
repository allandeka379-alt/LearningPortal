---
{
  "key": "quantum.wave-particle-duality",
  "title": "Wave-particle duality and electron diffraction",
  "summary": "Explain the evidence that electromagnetic radiation behaves as both waves and particles, describe electron diffraction through graphite as evidence for the wave nature of particles, use the de Broglie relation λ = h/p and p = √(2meV) for accelerated electrons, and compare de Broglie wavelengths with atomic spacings.",
  "concepts": ["aphys.quantum.wave-particle-duality"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Light spreads out and interferes like a wave, yet in the photoelectric effect it behaves like a hail of particles. In 1924 Louis de Broglie turned the puzzle round: if waves can behave as particles, perhaps particles can behave as waves. Three years later, electrons fired at crystals produced diffraction patterns exactly as waves would. Today electron microscopes, including those used in research laboratories in Zimbabwe to study minerals and plant cells, rely on the short wavelength of fast electrons to see detail far finer than any light microscope can.

This lesson collects the evidence for both behaviours, introduces the de Broglie wavelength, and shows how to calculate it for electrons accelerated through a potential difference.

You should already know photon energy and momentum, the photoelectric effect, diffraction (significant when the gap is comparable with the wavelength) and $eV = \tfrac{1}{2}mv^2$.

## Key definitions

:::definition{term="Wave-particle duality"}
The idea that both electromagnetic radiation and matter show wave properties in some situations (diffraction, interference) and particle properties in others (photoelectric emission, collisions).
:::

:::definition{term="de Broglie wavelength"}
The wavelength associated with a moving particle, equal to the Planck constant divided by the particle's momentum.
:::

:::formula{name="de Broglie relation"}
$$
\lambda = \frac{h}{p} = \frac{h}{mv}
$$

$\lambda$ in m; $h = 6.63 \times 10^{-34}\ \text{J s}$; $p$ momentum in $\text{kg m s}^{-1}$ (non-relativistic: $p = mv$).
:::

:::formula{name="Electron accelerated through a p.d. V"}
$$
\tfrac{1}{2}mv^2 = eV \quad\Rightarrow\quad p = \sqrt{2meV} \quad\Rightarrow\quad \lambda = \frac{h}{\sqrt{2meV}}
$$

Valid while the speed is well below $c$ (accelerating p.d.s up to a few tens of kV).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 (quantum physics) and Cambridge A Level topic 22 (Paper 4). The electron diffraction pattern is interpreted qualitatively; calculations use $\lambda = h/p$.
:::

## The evidence

| Behaviour | Evidence for light | Evidence for matter (electrons) |
| --- | --- | --- |
| wave | diffraction, interference (two-slit, gratings), polarisation | electron diffraction by graphite and metal crystals |
| particle | photoelectric effect (threshold frequency, instant emission), photon momentum | deflection by fields, tracks in detectors, $e/m$ and charge measurements |

Neither model alone describes everything. Light and electrons travel and spread out as waves but are emitted, absorbed or detected at single points, as particles.

## Electron diffraction

A beam of electrons is accelerated through a p.d. of a few kilovolts in an evacuated tube and passed through a very thin film of polycrystalline graphite. A fluorescent screen at the end of the tube glows where electrons arrive.

- The screen shows a bright central spot surrounded by **concentric rings**.
- Rings are what waves produce when diffracted by a regular lattice of atoms: graphite's carbon atoms are spaced about $0.1$ to $0.2\ \text{nm}$ apart, comparable with the electrons' de Broglie wavelength, so diffraction is strong.
- The film contains many tiny crystals at random orientations, so each set of atomic planes diffracts at a fixed angle in **all** directions round the beam, giving a ring rather than a spot.
- Increasing the accelerating p.d. increases the momentum, decreases the wavelength and makes the rings **smaller** (the diffraction angle depends on $\lambda/d$).
- A magnet brought near the tube moves the whole pattern, showing that it is made by charged particles, not by light or X-rays from the tube.

### How the wavelength depends on the p.d.

| $V\,/\,\text{kV}$ | $\lambda\,/\,\text{pm}$ |
| --- | --- |
| 1.0 | 38.8 |
| 2.0 | 27.5 |
| 3.0 | 22.4 |
| 4.0 | 19.4 |
| 5.0 | 17.4 |
| 6.0 | 15.9 |

The wavelength falls as $V$ rises, but more and more slowly: $\lambda \propto 1/\sqrt{V}$. A graph of $\lambda$ against $V^{-1/2}$ is a straight line through the origin with gradient $h/\sqrt{2m_ee}$. Since the ring radius is roughly proportional to $\lambda$, quadrupling the p.d. halves the ring radius.

## Why we do not see everyday objects diffract

A moving everyday object has an enormous momentum compared with an electron, so its de Broglie wavelength is unimaginably small: far smaller than any gap it could pass through. Diffraction is noticeable only when the wavelength is comparable with the size of the gap or obstacle, which for matter happens with electrons, neutrons and small atoms passing through crystal lattices.

## Worked examples

:::worked-solution[Wavelength of a fast electron]
Electrons are accelerated from rest through $5.0\ \text{kV}$. Find their de Broglie wavelength.

1. $p = \sqrt{2m_eeV} = \sqrt{2 \times 9.11 \times 10^{-31} \times 1.60 \times 10^{-19} \times 5000} = 3.82 \times 10^{-23}\ \text{kg m s}^{-1}$.
2. $\lambda = h/p = 6.63 \times 10^{-34}/3.82 \times 10^{-23}$.
3. $\lambda = 1.74 \times 10^{-11}\ \text{m}$ (17.4 pm): smaller than the atomic spacing, so the electrons are diffracted through small angles.
:::

:::worked-solution[A cricket ball]
Find the de Broglie wavelength of a $0.16\ \text{kg}$ cricket ball bowled at $35\ \text{m s}^{-1}$.

1. $p = mv = 0.16 \times 35 = 5.6\ \text{kg m s}^{-1}$.
2. $\lambda = h/p = 6.63 \times 10^{-34}/5.6 = 1.18 \times 10^{-34}\ \text{m}$.
3. This is about $10^{-19}$ times the size of a nucleus: no diffraction could ever be observed.
:::

:::worked-solution[Matching an atomic spacing]
What accelerating p.d. gives electrons a wavelength of $0.21\ \text{nm}$, similar to an atomic spacing in graphite?

1. $p = h/\lambda = 6.63 \times 10^{-34}/0.21 \times 10^{-9} = 3.16 \times 10^{-24}\ \text{kg m s}^{-1}$.
2. $V = \dfrac{p^2}{2m_ee} = \dfrac{(3.16 \times 10^{-24})^2}{2 \times 9.11 \times 10^{-31} \times 1.60 \times 10^{-19}}$.
3. $V = 34.2\ \text{V}$: even slow electrons have wavelengths on the atomic scale.
:::

## Common mistakes

:::mistake{title="Using E = hc/λ for electrons"}
$E = hc/\lambda$ applies to photons only. For an electron use $\lambda = h/p$ with $p = mv$ or $p = \sqrt{2meV}$.
:::

:::mistake{title="Forgetting the square root"}
$\lambda \propto 1/\sqrt{V}$, not $1/V$. Doubling the p.d. reduces the wavelength by a factor of $\sqrt{2}$, not 2.
:::

:::mistake{title="Rings get bigger at higher p.d."}
Faster electrons have **shorter** wavelengths and are diffracted through **smaller** angles: the rings shrink.
:::

:::mistake{title="Electron diffraction shows electrons are not particles"}
It shows they have wave properties too. Each electron still arrives at one point on the screen.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Paper 4 (A Level topic 22) and ZIMSEC Papers 1-3 (Form 6). Typical items: describe electron diffraction and what it shows, explain why the rings shrink as the p.d. rises, and calculate $\lambda$ from a p.d.
:::

:::exam-tip{title="Command words"}
*Describe* the evidence for wave behaviour of electrons: graphite film, rings on the screen, diffraction because $\lambda$ is comparable with atomic spacing. *Explain* the effect of increasing the p.d.: greater momentum, shorter $\lambda$, smaller diffraction angles. *State* the de Broglie relation in words: "wavelength equals the Planck constant divided by momentum".
:::

## Summary

:::summary
- Light: waves (diffraction, interference) and particles (photoelectric effect). Electrons: particles (deflection, charge) and waves (diffraction).
- de Broglie: $\lambda = h/p = h/(mv)$.
- Accelerated electrons: $p = \sqrt{2meV}$, so $\lambda = h/\sqrt{2meV} \propto 1/\sqrt{V}$.
- Electron diffraction through graphite gives rings because $\lambda$ is comparable with the atomic spacing; higher p.d. gives smaller rings.
- Everyday objects have wavelengths far too small for diffraction to be observed.
:::
