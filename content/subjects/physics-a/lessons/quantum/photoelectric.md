---
{
  "key": "quantum.photoelectric",
  "title": "The photoelectric effect",
  "summary": "Describe photoelectric emission, define threshold frequency, threshold wavelength and work function, use Einstein's equation hf = Φ + ½mv²max and stopping potential, explain why the maximum kinetic energy is independent of intensity while the photocurrent is proportional to it, explain why the wave model fails, and interpret graphs of maximum kinetic energy against frequency.",
  "concepts": ["aphys.quantum.photoelectric"],
  "estimatedMinutes": 50,
  "level": "core",
  "freePreview": true
}
---
## Introduction

Shine ultraviolet light on a clean zinc plate standing on a negatively charged electroscope and the gold leaf falls at once: electrons are knocked out of the zinc. Shine a far brighter red or even ordinary white light on it and nothing happens, however long you wait. That simple observation broke nineteenth-century physics. A wave spreads its energy evenly and should eventually deliver enough to free an electron; the experiment says otherwise.

Einstein's explanation (1905), that light arrives as photons each of energy $hf$, earned him the Nobel Prize and is the basis of light sensors, the image sensors in phone cameras and the photomultiplier tubes used in medical scanners. The solar panels on homes from Harare to Hwange use a related effect inside a semiconductor.

You should already know photon energy $E = hf = hc/\lambda$, the electronvolt, and kinetic energy $\tfrac{1}{2}mv^2$.

## Key definitions

:::definition{term="Photoelectric effect"}
The emission of electrons from the surface of a metal when electromagnetic radiation of high enough frequency falls on it. The emitted electrons are called photoelectrons.
:::

:::definition{term="Work function Φ"}
The minimum energy needed to remove an electron from the surface of a metal.
:::

:::definition{term="Threshold frequency f₀"}
The minimum frequency of electromagnetic radiation that can cause photoelectric emission from a given metal surface: $hf_0 = \Phi$.
:::

:::definition{term="Threshold wavelength λ₀"}
The maximum wavelength of electromagnetic radiation that can cause photoelectric emission from a given metal: $\lambda_0 = hc/\Phi$.
:::

:::definition{term="Stopping potential"}
The minimum potential difference needed to stop the most energetic photoelectrons reaching the collector, so that the photocurrent falls to zero: $eV_s = \tfrac{1}{2}mv^2_{\text{max}}$.
:::

:::formula{name="Einstein's photoelectric equation"}
$$
hf = \Phi + \tfrac{1}{2}mv^2_{\text{max}}
$$

$hf$ photon energy; $\Phi$ work function; $\tfrac{1}{2}mv^2_{\text{max}}$ maximum kinetic energy of the photoelectrons. All in J (or all in eV).
:::

:::keyfact{title="Typical work functions"}
Caesium about 2.1 eV; sodium about 2.3 eV; zinc about 4.3 eV; copper about 4.7 eV. Visible photons (1.8 to 3.1 eV) can free electrons from the alkali metals but not from zinc or copper.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 (quantum physics) and Cambridge A Level topic 22 (Paper 4). Both need Einstein's equation, threshold frequency and wavelength, work function and the intensity arguments; stopping potential is used as an application.
:::

## The photon explanation

1. Each photon interacts with **one** electron and gives it **all** its energy $hf$ at once; a photon is absorbed completely or not at all.
2. The electron uses at least $\Phi$ to escape from the surface. Electrons deeper in the metal lose extra energy on the way out, so $\Phi$ gives the **maximum** kinetic energy: $\tfrac{1}{2}mv^2_{\text{max}} = hf - \Phi$. Most photoelectrons have less than this.
3. If $hf < \Phi$, no electron can escape, whatever the intensity: there is a **threshold frequency** $f_0 = \Phi/h$.
4. Emission starts **immediately** when the light is switched on, because a single photon delivers its energy in one event.

### Intensity and frequency

| Change (above threshold) | Photons per second | Energy per photon | Maximum $E_k$ | Photocurrent |
| --- | --- | --- | --- | --- |
| Double the intensity, same $f$ | doubles | same | same | doubles |
| Increase $f$, same intensity | decreases | increases | increases | decreases slightly |

The **maximum kinetic energy depends only on frequency** (and the metal), because it is set by the energy of one photon. The **photoelectric current is proportional to intensity**, because the number of electrons emitted per second is proportional to the number of photons arriving per second.

## Why the wave model fails

A classical wave delivers energy continuously, spread over the whole surface, at a rate proportional to its intensity. It predicts that:

- any frequency would cause emission if the light were intense enough, or if we waited long enough (but below $f_0$ there is never emission);
- a more intense wave would give electrons more kinetic energy (but $E_{k\,\text{max}}$ is independent of intensity);
- with dim light there would be a measurable delay while an electron gathered enough energy (but emission is instantaneous).

Each prediction is contradicted by experiment; the photon model explains all three.

## Stopping potential

In a photocell, a collector is made negative relative to the emitting metal. As the reverse p.d. is increased, slower electrons are turned back first. At the **stopping potential** $V_s$ even the fastest electrons are stopped:

$$
eV_s = \tfrac{1}{2}mv^2_{\text{max}} = hf - \Phi
$$

A stopping potential of 1.5 V means the most energetic photoelectrons had 1.5 eV of kinetic energy.

## Graph: maximum kinetic energy against frequency

For a metal of work function $2.28\ \text{eV}$:

| $f\,/\,10^{14}\ \text{Hz}$ | $E_{k\,\text{max}}\,/\,\text{eV}$ |
| --- | --- |
| 5.0 | no emission |
| 6.0 | 0.21 |
| 7.0 | 0.62 |
| 8.0 | 1.04 |
| 9.0 | 1.45 |

The graph of $E_{k\,\text{max}}$ against $f$ is a **straight line** with:

- **gradient $h$** (in $\text{J s}$ when $E_k$ is in J, or $h/e$ when it is in eV); the same for every metal, so lines for different metals are parallel;
- **intercept on the frequency axis $f_0$** ($5.50 \times 10^{14}\ \text{Hz}$ here);
- **intercept on the energy axis $-\Phi$** when the line is extended back to $f = 0$.

![Maximum kinetic energy of photoelectrons against frequency for a metal of work function 2.28 eV: a straight line with gradient h/e (about 4.1 × 10⁻¹⁵ V s), crossing the frequency axis at the threshold frequency 5.51 × 10¹⁴ Hz and the energy axis at −2.28 eV; no electrons are emitted below the threshold.](media:diagrams/photoelectric-ek-frequency-graph.png "Figure: Einstein's equation as a straight line: gradient h/e, intercepts f₀ and −Φ")

## Worked examples

:::worked-solution[Threshold frequency and wavelength]
Zinc has a work function of $4.3\ \text{eV}$. Find its threshold frequency and threshold wavelength.

1. $\Phi = 4.3 \times 1.60 \times 10^{-19} = 6.88 \times 10^{-19}\ \text{J}$.
2. $f_0 = \Phi/h = 6.88 \times 10^{-19}/6.63 \times 10^{-34} = 1.04 \times 10^{15}\ \text{Hz}$.
3. $\lambda_0 = c/f_0 = 2.89 \times 10^{-7}\ \text{m} = 289\ \text{nm}$: ultraviolet, which is why visible light does not discharge a zinc plate.
:::

:::worked-solution[Maximum kinetic energy, speed and stopping potential]
Ultraviolet of wavelength $200\ \text{nm}$ falls on zinc ($\Phi = 4.3\ \text{eV}$). Find the maximum kinetic energy, the maximum speed and the stopping potential.

1. Photon energy: $hc/\lambda = 9.94 \times 10^{-19}\ \text{J} = 6.22\ \text{eV}$.
2. $E_{k\,\text{max}} = 6.22 - 4.3 = 1.92\ \text{eV} = 3.07 \times 10^{-19}\ \text{J}$.
3. $v_{\text{max}} = \sqrt{2E_k/m_e} = \sqrt{2 \times 3.07 \times 10^{-19}/9.11 \times 10^{-31}} = 8.20 \times 10^{5}\ \text{m s}^{-1}$.
4. $V_s = E_{k\,\text{max}}/e = 1.92\ \text{V}$.
:::

:::worked-solution[The Planck constant and work function from a graph]
Use the points $(6.0 \times 10^{14}\ \text{Hz}, 0.21\ \text{eV})$ and $(9.0 \times 10^{14}\ \text{Hz}, 1.45\ \text{eV})$ on the line above.

1. Gradient $= (1.45 - 0.21)/(3.0 \times 10^{14}) = 4.13 \times 10^{-15}\ \text{eV s}$.
2. $h = 4.13 \times 10^{-15} \times 1.60 \times 10^{-19} = 6.61 \times 10^{-34}\ \text{J s}$.
3. Intercept: $0.21 - 4.13 \times 10^{-15} \times 6.0 \times 10^{14} = -2.27\ \text{eV}$, so $\Phi = 2.27\ \text{eV}$ (the data were calculated with 2.28 eV; the difference is rounding).
:::

## Common mistakes

:::mistake{title="Brighter light, faster electrons"}
Intensity changes the number of photoelectrons per second, not their maximum kinetic energy.
:::

:::mistake{title="Mixing eV and J"}
Put every term of $hf = \Phi + E_{k\,\text{max}}$ in the same unit before subtracting.
:::

:::mistake{title="All photoelectrons have the maximum energy"}
$hf - \Phi$ is the **maximum**: electrons from below the surface lose extra energy escaping.
:::

:::mistake{title="Threshold wavelength the wrong way"}
Emission needs $f \ge f_0$, which means $\lambda \le \lambda_0$. Longer wavelengths than the threshold cause no emission.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Paper 4 (A Level topic 22) and ZIMSEC Papers 1-3 (Form 6). Expect definitions, Einstein's equation calculations, the intensity argument and the $E_{k\,\text{max}}$-$f$ graph; it is a favourite for long structured questions.
:::

:::exam-tip{title="Command words"}
*Define* work function: "minimum energy to remove an electron from the surface". *Explain* why $E_{k\,\text{max}}$ does not depend on intensity: one photon gives all its energy to one electron, and photon energy depends only on frequency. *Explain* why the wave theory fails: give the observation and the contradicting wave prediction. *Determine* $h$ from a graph: gradient, with units, converting eV to J.
:::

## Summary

:::summary
- Photoelectrons are emitted only if $f \ge f_0$ (that is, $\lambda \le \lambda_0$); $hf_0 = \Phi$.
- Einstein: $hf = \Phi + \tfrac{1}{2}mv^2_{\text{max}}$; one photon gives all its energy to one electron.
- Stopping potential: $eV_s = \tfrac{1}{2}mv^2_{\text{max}}$.
- $E_{k\,\text{max}}$ depends on frequency, not intensity; photocurrent is proportional to intensity.
- $E_{k\,\text{max}}$ against $f$: straight line, gradient $h$, $f$-intercept $f_0$, $E$-intercept $-\Phi$. The wave model cannot explain the threshold, the intensity independence or the instant emission.
:::
