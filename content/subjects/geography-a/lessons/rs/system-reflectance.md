---
{
  "key": "rs.system-reflectance",
  "title": "The remote sensing system, reflectance and sensors",
  "summary": "Describe the parts of the remote sensing system, the bands of the electromagnetic spectrum, the spectral signatures of vegetation, soil, water and built surfaces, NDVI, and the difference between passive and active sensors.",
  "concepts": [
    "ageo.rs.system-reflectance"
  ],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Satellites and aircraft photograph the Earth, but what they record is not a photograph in the ordinary sense: it is a measurement of the energy that surfaces send back to a sensor. By learning how energy travels from the Sun to the ground and back, and how different surfaces reflect it, geographers can map crops, water, burned land and cities from space. In ZIMSEC Form 6 you need the parts of the remote sensing system, the electromagnetic spectrum, typical **spectral signatures** and the difference between sensor types.

You should know the Sun is the Earth's main energy source and that light is a wave, which is introduced in physical geography.

## Key definitions

:::definition{term="Remote sensing"}
Collecting information about an object or area without touching it, usually from satellites, aircraft or drones, by measuring electromagnetic radiation.
:::

:::definition{term="Electromagnetic spectrum"}
The full range of radiation arranged by wavelength: gamma rays, X-rays, ultraviolet, visible light, infrared, microwaves and radio waves.
:::

:::definition{term="Reflectance"}
The fraction of the incoming radiation in a given wavelength band that a surface reflects, usually shown as a value from 0 to 1 or as a percentage.
:::

:::definition{term="Spectral signature"}
The characteristic pattern of reflectance of a surface across different wavelengths; it can be used to identify the surface.
:::

:::definition{term="Passive and active sensors"}
A passive sensor records energy from an outside source (the Sun) that is reflected or emitted by the target. An active sensor sends out its own energy (radar, lidar) and records what returns.
:::

## The remote sensing system

1. **Energy source:** the Sun (passive systems) or the sensor itself (active systems).
2. **Atmosphere:** the energy passes through it twice; gases and particles scatter and absorb some wavelengths.
3. **Target:** the surface reflects, absorbs, transmits or emits radiation depending on its type and condition.
4. **Sensor:** a satellite or aircraft instrument detects the radiation and records it as numbers.
5. **Transmission and processing:** data are sent to a ground station, corrected and stored.
6. **Image and interpretation:** the digital data are displayed as an image and interpreted to produce maps or measurements.

## The electromagnetic spectrum

Wavelength and frequency are linked by $c = f\lambda$, where $c$ is the speed of light ($3 \times 10^{8}$ m/s). The bands most used in Earth observation are:

| Region | Approximate wavelength | Use |
|---|---|---|
| Visible (blue, green, red) | 0.4 to 0.7 µm | Water depth, vegetation, natural-colour images |
| Near infrared (NIR) | 0.7 to 1.3 µm | Vegetation health, water boundaries |
| Shortwave infrared (SWIR) | 1.3 to 3 µm | Soil and vegetation moisture, burn scars |
| Thermal infrared | 8 to 14 µm | Surface temperature, fires |
| Microwave (radar) | 1 mm to 1 m | Mapping through cloud, floods, surface roughness |

The atmosphere absorbs some wavelengths strongly. Sensors use the **atmospheric windows**, ranges of wavelength where transmission is high. Scattering by gas molecules is stronger for short wavelengths, which is why the sky is blue and why blue light is often corrected in images.

## Spectral signatures

- **Healthy vegetation:** low reflectance in blue and red (chlorophyll absorbs them), a small peak in green, then a sharp rise in near infrared (leaf structure reflects strongly), and lower values in the shortwave infrared where leaf water absorbs.
- **Bare soil:** reflectance rises fairly steadily from the visible to the shortwave infrared; wet or dark soil is lower overall.
- **Water:** low reflectance everywhere, highest in blue-green, and almost zero in near infrared, so the NIR band separates water clearly.
- **Built surfaces:** variable and usually fairly flat across wavelengths; dark tar is low, concrete is higher.

A simple index uses the contrast between red and near infrared, the **Normalised Difference Vegetation Index**:

$$
NDVI = \frac{NIR - Red}{NIR + Red}
$$

Values near +1 mean dense healthy vegetation, around 0.1 to 0.2 bare soil, and negative values water.

## Sensors and image space

Multispectral scanners record several bands at once (for example blue, green, red and NIR). **Passive** optical sensors (Landsat, Sentinel-2) need daylight and clear skies; **active** radar sensors (such as Sentinel-1) work at night and through cloud, which is valuable during the rainy season. Each pixel has a place in **image space** (its row and column) and a set of values in **feature space** (a point plotted on axes for two bands, such as red against NIR). Pixels of the same cover type group together in feature space, even if they are far apart in the image.

## Worked examples

:::worked-solution[NDVI from reflectance values]
Illustrative reflectance (0 to 1) for four surfaces in four bands:

| Surface | Blue | Green | Red | NIR | NDVI |
|---|---|---|---|---|---|
| Healthy maize leaves | 0.04 | 0.09 | 0.05 | 0.52 | 0.82 |
| Dry bare soil | 0.12 | 0.16 | 0.22 | 0.28 | 0.12 |
| Clear water | 0.08 | 0.06 | 0.04 | 0.02 | -0.33 |
| Tarred road | 0.10 | 0.11 | 0.12 | 0.13 | 0.04 |

1. NDVI for healthy maize $= (0.52 - 0.05) \div (0.52 + 0.05) = 0.82$.
2. Dry bare soil: $(0.28 - 0.22) \div (0.28 + 0.22) = 0.12$; clear water: $(0.02 - 0.04) \div (0.02 + 0.04) = -0.33$.
3. Interpretation: only the maize has a high NDVI, because it reflects strongly in the NIR and absorbs red; water is negative because it absorbs NIR more than red.
4. A field with NDVI falling from 0.7 to 0.4 over a month suggests crop stress such as drought, which can trigger an early warning.
:::

:::worked-solution[Wavelength and frequency]
Red light has a wavelength of 0.65 µm $= 0.65 \times 10^{-6}$ m.

1. Rearrange $c = f\lambda$ to $f = c \div \lambda$.
2. $f = 3 \times 10^{8} \div (0.65 \times 10^{-6}) = 4.62 \times 10^{14}$ Hz.
3. Shorter wavelengths have higher frequencies, so blue light (0.45 µm) has a higher frequency than red.
:::

:::example{title="Monitoring water hyacinth on a dam (illustrative)"}
An analyst wants to map floating water hyacinth on a reservoir. In the visible bands the plants and the water are both dark, but in the NIR the plants are bright (high reflectance) and the water is almost black. Using the NIR band, or an NDVI image, shows the mat clearly, and repeated images show whether the cover is spreading.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
The remote sensing system, spectrum, signatures and sensor types are ZIMSEC Form 6 content. Cambridge expects only a general understanding that satellite images are used to monitor environments.
:::

## Common mistakes

:::mistake{title="Saying vegetation is bright in the red band"}
Healthy vegetation absorbs red light strongly for photosynthesis. Its high reflectance is in the near infrared, not the visible red.
:::

:::mistake{title="Confusing reflectance with temperature"}
Reflectance is reflected sunlight in the optical bands. Temperature is measured in the thermal infrared, from emitted radiation.
:::

:::mistake{title="Forgetting that the atmosphere is part of the system"}
Energy passes through the atmosphere twice, and scattering and absorption change what the sensor records. Corrections are needed before comparing images.
:::

## Exam tips

:::exam-tip
Draw or list the system in order (source, atmosphere, target, sensor, transmission, image). For signatures, quote the band and describe high or low reflectance and give a reason (chlorophyll absorbs red; leaf structure reflects NIR; water absorbs NIR). In calculations show NDVI with substitution and a sign. *Compare* active and passive sensors with one advantage and one limitation of each.
:::

## Summary

:::summary
- The system runs from energy source through the atmosphere, target and sensor to processing and interpretation.
- Bands used include visible, near infrared, shortwave infrared, thermal and microwave.
- Vegetation reflects strongly in NIR and weakly in red; water is dark in NIR; soil rises steadily with wavelength.
- NDVI = (NIR − Red) ÷ (NIR + Red) separates vegetation (high) from soil (low) and water (negative).
- Passive sensors need sunlight; active sensors (radar) work at night and through cloud.
:::
