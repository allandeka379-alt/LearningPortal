---
{
  "key": "medical.x-rays-ct",
  "title": "X-rays: production, imaging, attenuation and CT scanning",
  "summary": "Explain how X-rays are produced by bombarding a metal target with high-energy electrons, calculate the minimum wavelength from the accelerating p.d., explain how X-ray images show internal structures and how contrast is improved with contrast media, use I = I₀e^(−μx) and half-value thickness, and describe how computed tomography builds images of sections and then a three-dimensional image.",
  "concepts": ["aphys.medical.x-rays-ct"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A child who falls from a mango tree and is brought to a district hospital with a painful arm will almost certainly have an X-ray. Within minutes the doctor can see whether the bone is broken and how the pieces lie. For a suspected head injury after a road accident, a CT scanner goes further, producing detailed images of slices through the brain. Both rely on the same physics: X-ray photons are absorbed more strongly by some tissues than others.

This lesson explains how X-rays are produced, what limits their shortest wavelength, why bone shows up against soft tissue, how contrast media help, and how CT combines many X-ray measurements into images of sections and a three-dimensional picture.

You should already know thermionic emission, the electronvolt, photon energy $E = hc/\lambda$, and exponential decay.

## Key definitions

:::definition{term="X-rays"}
High-energy electromagnetic radiation with wavelengths of about $10^{-12}$ to $10^{-8}\ \text{m}$, produced when fast electrons decelerate in, or eject inner electrons from, a metal target.
:::

:::definition{term="Linear attenuation coefficient μ"}
The constant in $I = I_0e^{-\mu x}$ describing how strongly a material reduces the intensity of an X-ray beam per unit thickness; unit $\text{m}^{-1}$.
:::

:::definition{term="Half-value thickness"}
The thickness of a material that reduces the intensity of an X-ray beam to half its initial value: $x_{1/2} = \ln 2/\mu$.
:::

:::definition{term="Contrast"}
The difference in the degree of blackening between different areas of an image, which allows structures to be distinguished.
:::

:::definition{term="Computed tomography (CT)"}
An imaging technique in which X-ray images of a slice of the body are taken from many directions and combined by a computer to build an image of that section; repeating for successive slices gives a three-dimensional image.
:::

:::formula{name="Minimum wavelength"}
$$
eV = \frac{hc}{\lambda_{\text{min}}} \qquad \lambda_{\text{min}} = \frac{hc}{eV}
$$

$V$ accelerating p.d. in V. The most energetic photon takes all the kinetic energy $eV$ of one electron.
:::

:::formula{name="Attenuation of X-rays"}
$$
I = I_0e^{-\mu x}
$$
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge only (A Level topic 24, Paper 4). Medical X-ray imaging and CT are not in the ZIMSEC topic list.
:::

## Producing X-rays

An X-ray tube is evacuated and contains:

1. a heated **cathode** (filament), which releases electrons by thermionic emission;
2. a large p.d. (typically 30 to 150 kV) between cathode and **anode**, which accelerates the electrons;
3. a **target** of a metal with a high proton number and high melting point, usually tungsten, set into the anode.

When the electrons strike the target, most of their energy (about 99%) becomes thermal energy, so the anode is often made to rotate and is cooled by oil. Less than about 1% becomes X-rays:

- a **continuous spectrum** ("braking radiation") from electrons decelerating in the fields of the target nuclei, with every photon energy up to a maximum $eV$;
- sharp **characteristic lines**, when incoming electrons knock out inner-shell electrons of target atoms and outer electrons drop into the vacancies.

The **tube current** (set by the filament temperature) controls the number of X-ray photons per second, the intensity. The **accelerating p.d.** controls the maximum photon energy and so the penetrating power ("hardness") of the beam.

## Imaging and contrast

An X-ray image is a shadow: the beam passes through the patient onto a detector (photographic plate or digital sensor). Where tissue absorbs strongly, fewer X-rays reach the detector.

- Bone, which contains calcium (higher proton number) and is denser, has a much larger attenuation coefficient than soft tissue, so it stands out clearly.
- Different soft tissues have similar $\mu$, so they give poor contrast. A **contrast medium** with a high proton number is introduced: a barium sulfate "meal" for the stomach and intestines, or an iodine compound injected into blood vessels. It absorbs X-rays strongly, outlining the organ.
- Low-energy photons would be absorbed in the skin without reaching the detector, giving a dose but no image. An aluminium **filter** removes them, which is why half-value thickness in aluminium is used to describe beam quality.

## Attenuation and half-value thickness

For a beam with $\mu = 95\ \text{m}^{-1}$ in aluminium (a typical diagnostic value):

| $x\,/\,\text{mm}$ | 0 | 2 | 4 | 6 | 8 | 10 | 12 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $I/I_0$ | 1.000 | 0.827 | 0.684 | 0.566 | 0.468 | 0.387 | 0.320 |

The intensity falls exponentially: each extra 7.3 mm halves it (the half-value thickness, $\ln 2/95\ \text{m}^{-1}$). A graph of $\ln(I/I_0)$ against $x$ is a straight line of gradient $-\mu$.

## Computed tomography

In a CT scanner, an X-ray tube and an array of detectors rotate together around the patient.

1. For one thin **slice**, the beam passes through the body from many different angles. Each detector reading gives the total attenuation along one line.
2. A computer divides the slice into small units (voxels) and works out the attenuation coefficient of each one that is consistent with all the readings. The result is displayed as a two-dimensional image of the **section**, with each pixel's shade set by the attenuation in that voxel.
3. The patient is moved along the axis of rotation and the process repeated for successive slices; the computer combines the sections into a **three-dimensional image**, which can be viewed from any angle.

CT distinguishes soft tissues far better than a single X-ray image, and does not overlap structures in front of and behind each other. The price is a much larger radiation dose, so CT is used only when the extra information justifies it.

## Worked examples

:::worked-solution[Minimum wavelength]
An X-ray tube operates at $80\ \text{kV}$. Find the maximum photon energy and the minimum wavelength.

1. Maximum energy $= eV = 1.60 \times 10^{-19} \times 80 \times 10^{3} = 1.28 \times 10^{-14}\ \text{J}$ (80 keV).
2. $\lambda_{\text{min}} = \dfrac{hc}{eV} = \dfrac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{1.28 \times 10^{-14}}$.
3. $\lambda_{\text{min}} = 1.55 \times 10^{-11}\ \text{m}$.
:::

:::worked-solution[Bone against soft tissue]
At a certain X-ray energy, $\mu = 20\ \text{m}^{-1}$ for soft tissue and $100\ \text{m}^{-1}$ for bone. Compare the fractions transmitted by 3.0 cm of each.

1. Soft tissue: $e^{-20 \times 0.030} = e^{-0.60} = 0.549$.
2. Bone: $e^{-100 \times 0.030} = e^{-3.0} = 0.0498$.
3. About eleven times more X-ray intensity passes through the soft tissue, so the bone appears as a clear shadow.
:::

:::worked-solution[Half-value thickness]
Find the half-value thickness of aluminium for which $\mu = 95\ \text{m}^{-1}$.

1. $\tfrac{1}{2} = e^{-\mu x_{1/2}}$, so $x_{1/2} = \ln 2/\mu$.
2. $x_{1/2} = 0.693/95 = 7.30 \times 10^{-3}\ \text{m} = 7.30\ \text{mm}$.
:::

## Common mistakes

:::mistake{title="Current versus p.d."}
Increasing the tube **current** increases the intensity (more photons) but not the maximum photon energy. Increasing the **p.d.** increases the maximum photon energy and so shortens $\lambda_{\text{min}}$.
:::

:::mistake{title="Most energy becomes X-rays"}
About 99% becomes heat in the target; that is why tungsten (high melting point) and cooling are used.
:::

:::mistake{title="CT is a single X-ray"}
CT combines many measurements from different angles for each slice, and many slices for a 3D image; the computer reconstructs the attenuation of each small volume.
:::

:::mistake{title="Half-value thickness and half-life"}
The half-value thickness is a **distance** ($\ln 2/\mu$), not a time; the mathematics is the same as for half-life.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Paper 4 (A Level topic 24). Expect a description of X-ray production, $\lambda_{\text{min}}$ calculations, attenuation and half-value thickness calculations, contrast explanations and a description of CT.
:::

:::exam-tip{title="Command words"}
*Describe* production: thermionic emission, acceleration through a large p.d., deceleration in a high-$Z$ target. *Explain* contrast: different attenuation coefficients; contrast media have high proton numbers. *Describe* CT: images of one slice from many angles, combined by computer into an image of the section; repeated for many slices to build a 3D image. *Calculate*: $x$ in metres when $\mu$ is in $\text{m}^{-1}$.
:::

## Summary

:::summary
- X-rays are produced when electrons accelerated through a p.d. $V$ strike a high-$Z$ metal target; about 99% of the energy becomes heat.
- Minimum wavelength: $\lambda_{\text{min}} = hc/(eV)$; tube current controls intensity, p.d. controls penetration.
- Attenuation: $I = I_0e^{-\mu x}$; half-value thickness $= \ln 2/\mu$.
- Contrast comes from differences in $\mu$; high-$Z$ contrast media (barium, iodine) outline soft organs.
- CT: many X-ray measurements of a slice from different angles give an image of the section; many sections give a 3D image.
:::
