---
{
  "key": "medical.pet",
  "title": "Positron emission tomography (PET)",
  "summary": "Explain how a β⁺-emitting radioactive tracer absorbed by tissue is used in PET scanning, describe positron-electron annihilation with conservation of mass-energy and momentum, calculate the energy, wavelength and momentum of each of the two gamma photons, and explain how the arrival of photon pairs at a ring of detectors locates the tracer and builds an image.",
  "concepts": ["aphys.medical.pet"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

X-rays and CT scans show **structure**: where bone and soft tissue are. Many questions in medicine are about **function**: which parts of the brain are working hardest, or whether a lump is made of rapidly dividing cancer cells that use glucose faster than healthy tissue. Positron emission tomography (PET) answers such questions by tracking a small amount of radioactive material that the body takes up, and it does so by detecting the two gamma photons produced when matter meets antimatter inside the patient.

You should already know β⁺ decay and the positron as the antiparticle of the electron, $E = mc^2$, the photon energy $E = hf = hc/\lambda$, conservation of momentum, and the decay law.

## Key definitions

:::definition{term="Radioactive tracer"}
A compound containing radioactive nuclei that is introduced into the body, is absorbed by the tissue being studied, and whose emissions are detected from outside the body to show where it has collected.
:::

:::definition{term="Positron"}
The antiparticle of the electron: same mass, charge $+e$; it is emitted from a nucleus in β⁺ decay.
:::

:::definition{term="Annihilation"}
The process in which a particle and its antiparticle meet and their total mass is converted into energy in the form of photons, with mass-energy, momentum and charge conserved.
:::

:::formula{name="Energy of each annihilation photon"}
$$
E_{\gamma} = m_e c^2
$$

$E_{\gamma}$ = energy of each photon (J), $m_e$ = rest mass of an electron (or positron) $= 9.11 \times 10^{-31}\ \text{kg}$, $c = 3.00 \times 10^{8}\ \text{m s}^{-1}$. This assumes the electron and positron have negligible kinetic energy when they annihilate.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
PET is Cambridge A Level only (topic 24.3, Paper 4). It is not in the ZIMSEC topic list. β⁺ decay itself is covered in the nuclear physics lessons.
:::

## The tracer

The tracer is a biologically useful molecule in which one atom has been replaced by a **β⁺-emitting isotope**. The commonest is fluorine-18 attached to a glucose-like molecule (fluorodeoxyglucose, FDG). Cells that use a lot of glucose, such as active brain regions or many tumours, absorb more FDG, so the tracer concentrates there. Fluorine-18 has a half-life of about 110 minutes: long enough to make the tracer, inject it and scan, but short enough that the patient's dose falls quickly. Because of the short half-life, tracers are made in a cyclotron close to the hospital.

In the nucleus, a proton changes into a neutron, emitting a positron and a neutrino:

$$
{}^{18}_{9}\text{F} \rightarrow {}^{18}_{8}\text{O} + {}^{0}_{+1}\text{e} + \nu
$$

## Annihilation

The positron travels only about a millimetre through tissue, losing its kinetic energy, before it meets an electron. The two **annihilate**: their mass is converted into energy carried by gamma photons.

- **Mass-energy**: total energy released $= 2m_ec^2$ (plus any small kinetic energy).
- **Momentum**: the positron and electron are almost at rest, so their total momentum is about zero. A single photon would carry momentum $E/c$, so one photon alone is impossible. The simplest outcome is **two photons of equal energy travelling in exactly opposite directions**, whose momenta cancel.
- **Charge**: $+e + (-e) = 0$, and photons are uncharged.

:::worked-solution[The annihilation photons]
A positron and an electron, both at rest, annihilate. Find the energy, wavelength and momentum of each photon.

1. Energy of each photon $= m_ec^2 = 9.11 \times 10^{-31} \times (3.00 \times 10^{8})^2 = 8.20 \times 10^{-14}\ \text{J}$.
2. In electronvolts: $\dfrac{8.20 \times 10^{-14}}{1.60 \times 10^{-19}} = 5.12 \times 10^{5}\ \text{eV} \approx 0.51\ \text{MeV}$ (0.511 MeV with more precise constants).
3. Wavelength: $\lambda = \dfrac{hc}{E} = \dfrac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{8.20 \times 10^{-14}} = 2.43 \times 10^{-12}\ \text{m}$, a gamma ray.
4. Momentum: $p = \dfrac{E}{c} = 2.73 \times 10^{-22}\ \text{N s}$, equal and opposite for the two photons, so the total is zero.
:::

These photons are energetic enough to pass out of the body with little absorption, which is why they can be detected outside.

## Detecting the photons and building the image

The patient lies inside a **ring of detectors**. Each detector is a scintillation crystal, which gives a flash of light when a gamma photon is absorbed, coupled to a photomultiplier that turns the flash into an electrical pulse.

1. **Coincidence detection.** Two photons from one annihilation reach two detectors on opposite sides of the ring at almost the same moment. The electronics accept only pairs arriving within a few nanoseconds of each other; single photons and unrelated pairs are rejected.
2. **Line of response.** The annihilation must have happened somewhere on the straight line joining the two detectors.
3. **Position along the line.** If the annihilation is not at the midpoint, one photon has further to travel and arrives later. If it is a distance $x$ from the midpoint, the path difference is $2x$, so the difference in arrival times is $\Delta t = 2x/c$, giving $x = \dfrac{c\,\Delta t}{2}$, towards the detector that fired first.
4. **Image.** Millions of events are recorded. A computer works out where the lines (and arrival times) cross most often, building a three-dimensional map of the tracer concentration. Regions with high uptake ("hot spots") are shown brightly, and the map is often combined with a CT image to show where in the anatomy they lie.

:::worked-solution[Locating an annihilation]
Two detectors on opposite sides of the ring record photons from one annihilation. One arrives $0.40\ \text{ns}$ before the other. How far from the midpoint of the line did the annihilation occur?

1. $x = \dfrac{c\,\Delta t}{2} = \dfrac{3.00 \times 10^{8} \times 0.40 \times 10^{-9}}{2}$.
2. $x = 0.060\ \text{m} = 6.0\ \text{cm}$ from the midpoint, on the side of the detector that recorded its photon first.
:::

Real detectors measure arrival times only to a few hundred picoseconds, so the time difference alone locates the annihilation to within several centimetres; the crossing of many lines of response gives the much finer resolution of the final image (a few millimetres).

**Safety.** The patient receives a dose from the tracer, so the smallest effective activity is used and the short half-life limits exposure. The patient is also briefly a gamma source, so contact with pregnant women and young children is limited for some hours after the scan.

## Common mistakes

:::mistake{title="Saying one photon is produced"}
A single photon cannot conserve momentum when the pair starts at rest. Two photons travel in **opposite** directions.
:::

:::mistake{title="Using 2m_e c² for each photon"}
$2m_ec^2$ is the **total** energy released; each photon carries $m_ec^2$.
:::

:::mistake{title="Saying PET detects positrons"}
Positrons annihilate within about a millimetre of where they are emitted; it is the gamma photons that leave the body and are detected.
:::

:::mistake{title="Forgetting the factor of 2 in locating"}
The path difference is $2x$, so $x = c\Delta t/2$, not $c\Delta t$.
:::

## Exam tips

:::exam-tip{title="Cambridge Paper 4"}
Expect to *explain* what a tracer is and why a β⁺ emitter is used, *explain* why two photons travel in opposite directions (name conservation of momentum), *calculate* the photon energy in J or MeV and its wavelength, and *explain* how the detectors and the arrival times locate the tracer. Quote the data-sheet values: they give $8.20 \times 10^{-14}\ \text{J}$, about 0.51 MeV.
:::

## Summary

:::summary
- A tracer containing a β⁺ emitter (for example fluorine-18 in FDG) is absorbed by the tissue being studied, concentrating where the tissue is most active.
- An emitted positron annihilates with an electron within about a millimetre; mass-energy, momentum and charge are conserved.
- Two gamma photons, each of energy $m_ec^2 \approx 0.51\ \text{MeV}$ ($8.20 \times 10^{-14}\ \text{J}$), travel in opposite directions.
- A ring of detectors records coincident pairs; each pair defines a line, and the arrival-time difference gives the position along it ($x = c\Delta t/2$).
- A computer combines millions of events into a 3D image of tracer concentration.
:::
