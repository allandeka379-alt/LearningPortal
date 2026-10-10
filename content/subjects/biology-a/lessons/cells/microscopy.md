---
{
  "key": "cells.microscopy",
  "title": "Microscopes, magnification and resolution",
  "summary": "Compare light, transmission electron and scanning electron microscopes; define magnification and resolution; convert between mm, µm and nm; calculate magnification, image size and actual size from micrographs and scale bars; and calibrate an eyepiece graticule.",
  "concepts": ["abio.cells.microscopy"],
  "estimatedMinutes": 35,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Almost everything in A-Level cell biology was discovered with a microscope. The light microscope showed that living things are made of cells; the electron microscope revealed the membranes, ribosomes and organelles inside them. When a technician at a hospital laboratory in Harare looks for *Plasmodium* in a blood smear, or a student in Gweru measures onion epidermal cells, they are using the same ideas you meet in this lesson.

Every paper uses this topic. Theory papers give you an electron micrograph and ask for an actual size; practical papers ask you to calibrate a graticule and measure a cell you have drawn. You should already know the basic parts of a light microscope and the formula magnification = image size ÷ actual size from O Level.

## Key definitions

:::definition{term="Magnification"}
How many times larger an image is than the real object: magnification = image size ÷ actual size. It has no units and is written with a times sign, for example ×400.
:::

:::definition{term="Resolution"}
The ability of a microscope to distinguish two points that are close together as separate points; the smaller the distance that can be resolved, the more detail is visible.
:::

:::definition{term="Eyepiece graticule"}
A transparent scale in the eyepiece with arbitrary divisions. It must be calibrated against a stage micrometer at each objective lens before it can measure anything.
:::

:::definition{term="Stage micrometer"}
A microscope slide with a scale of known length engraved on it, usually 1 mm divided into 100 divisions of 0.01 mm (10 µm).
:::

:::keyfact{title="Units of length"}
1 mm = 1000 µm and 1 µm = 1000 nm, so 1 mm = 1 000 000 nm. Cells are usually measured in µm and organelles or molecules in nm.
:::

## Magnification is not resolution

Magnification makes an image bigger; resolution decides whether the bigger image contains more detail. You can enlarge a light micrograph of a cell as much as you like, but two ribosomes 25 nm apart will still appear as one blur, because the light microscope cannot resolve them. Enlarging beyond the useful limit is called **empty magnification**.

Resolution is limited by the **wavelength** of the radiation used. Two objects closer together than about half the wavelength cannot be distinguished. Visible light has wavelengths of about 400–700 nm, so the light microscope resolves down to roughly 200 nm. A beam of electrons has a far shorter wavelength, so electron microscopes resolve much smaller distances: about 0.5 nm for a transmission electron microscope (textbooks quote slightly different figures).

:::keyfact{title="Approximate limits (learn the order of size, not exact values)"}
Light microscope: resolution about 200 nm, useful magnification up to about ×1500. Transmission electron microscope (TEM): resolution about 0.5 nm, magnification up to about ×500 000 or more. Scanning electron microscope (SEM): resolution about 3–10 nm.
:::

## The three microscopes compared

| Feature | Light microscope | Transmission electron microscope | Scanning electron microscope |
|---|---|---|---|
| Radiation | Visible light | Electrons passing through the specimen | Electrons reflected from the coated surface |
| Lenses | Glass | Electromagnets | Electromagnets |
| Specimen | Living or dead; thin sections or small whole mounts | Dead; ultra-thin section in a vacuum | Dead; whole specimen coated in metal, in a vacuum |
| Image | Colour (stains); 2D | Black and white (false colour can be added); 2D section | Black and white; 3D view of the surface |
| What you can see | Cells, nuclei, chloroplasts, large organelles | Internal ultrastructure: membranes, ribosomes, cristae | Surface shapes: pollen, insect mouthparts, cell surfaces |

A light microscope is cheap, portable and can show living processes such as cytoplasmic streaming or mitosis in a root tip. Electron microscopes need a vacuum (air molecules would scatter the electrons), so specimens must be dead and are dehydrated, fixed and stained with heavy-metal salts, which can produce **artefacts**: structures that were not present in the living cell.

## Calculating with magnification

The three quantities are linked by one equation:

$$
\text{magnification} = \frac{\text{image size}}{\text{actual size}}
$$

Before dividing, convert both lengths to the **same unit**. Measure image sizes on paper in mm with a ruler, then convert to µm by multiplying by 1000.

:::worked-solution[Actual size of a mitochondrion at $\times 24\,000$]
1. An electron micrograph at ×24 000 shows a mitochondrion 36 mm long.
2. Convert the image length to µm: $36\ \text{mm} \times 1000 = 36\,000\ \mu\text{m}$.
3. Actual size = image size ÷ magnification = $36\,000 \div 24\,000 = 1.5\ \mu\text{m}$.
4. Check that it is sensible: mitochondria are typically about 1–5 µm long, so 1.5 µm is reasonable.
:::

### Using a scale bar

Many micrographs give a **scale bar** instead of a magnification. Measure the bar, then treat it like any other object of known actual size.

:::worked-solution[Magnification from a scale bar, then an actual size]
1. A scale bar labelled 5 µm is 18 mm long on the page.
2. Magnification = image ÷ actual = $18\,000\ \mu\text{m} \div 5\ \mu\text{m} = \times 3600$.
3. A chloroplast in the same micrograph measures 27 mm, which is $27\,000\ \mu\text{m}$.
4. Actual length = $27\,000 \div 3600 = 7.5\ \mu\text{m}$.
:::

## Measuring cells with an eyepiece graticule

The graticule divisions have no fixed size: what one division covers depends on the objective lens. You calibrate it as follows.

1. Put the stage micrometer on the stage and focus on its scale with the chosen objective.
2. Rotate the eyepiece so the graticule scale lies alongside the micrometer scale.
3. Line up a zero mark on both scales and find a point further along where two marks line up exactly.
4. Count the eyepiece divisions and the stage divisions between the two points.
5. Calculate the length of one eyepiece division (epu): (stage divisions × length of one stage division) ÷ eyepiece divisions.
6. Replace the micrometer with the specimen and measure in eyepiece divisions; multiply by the calibration value.
7. Recalibrate whenever you change the objective lens.

:::worked-solution[Calibrating at high power and measuring a cell]
1. With the ×40 objective, 100 eyepiece divisions line up with 25 stage divisions; each stage division is 10 µm.
2. One eyepiece division = $(25 \times 10\ \mu\text{m}) \div 100 = 2.5\ \mu\text{m}$.
3. An onion epidermal cell is 34 eyepiece divisions wide, so its width is $34 \times 2.5 = 85\ \mu\text{m}$.
4. A student draws this cell 54 mm wide. Magnification of the drawing = $54\,000\ \mu\text{m} \div 85\ \mu\text{m} = 635.29\ldots$, so ×635 (three significant figures).
:::

:::example{title="Choosing the right microscope"}
Nyasha wants to know whether malaria parasites are present inside red blood cells in a stained smear, and Tatenda wants to see the folded inner membrane of a mitochondrion. Red blood cells are about 7–8 µm across and the parasites inside them are a few µm long, far above the 200 nm limit, so a light microscope with stain is right for Nyasha: it is cheap and quick. The cristae are membranes a few nanometres thick, below the light microscope's resolution, so Tatenda needs a TEM image of a thin section. A SEM would show only the outer surface of the mitochondrion.
:::

## Common mistakes

:::mistake{title="Confusing magnification and resolution"}
"An electron microscope shows more detail because it magnifies more" is incomplete. It shows more detail because its **resolution** is higher, as electrons have a much shorter wavelength than light.
:::

:::mistake{title="Mixing units"}
Dividing an image size in mm by an actual size in µm gives an answer 1000 times too small. Convert first, then divide.
:::

:::mistake{title="Inverting the formula"}
Magnification is image ÷ actual, never actual ÷ image. A magnification below 1 for a micrograph is a sign the formula has been inverted.
:::

:::mistake{title="Using one calibration for every objective"}
A graticule calibrated at ×10 gives values four times too large if used unchanged with the ×40 objective. Recalibrate at each objective.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1 and 2 and Cambridge Papers 1 and 2 test definitions, comparisons and calculations; ZIMSEC Paper 4 and Cambridge Paper 3 test graticule calibration and the magnification of your own drawing.
:::

:::exam-tip{title="Command words"}
*Calculate*: show the conversion and the formula, then give the unit (µm or nm) and a sensible number of significant figures. *Explain* why an electron microscope has higher resolution: link the shorter wavelength of electrons to the ability to separate points closer together. *Compare* microscopes in a table or with paired statements ("the TEM ... whereas the light microscope ...").
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need the comparison of light and electron microscopes, magnification and resolution, unit conversions and graticule calibration. Cambridge names the TEM and SEM separately; ZIMSEC questions usually just say "electron microscope", so learn both.
:::

## Summary

:::summary
- Magnification = image size ÷ actual size; resolution is the smallest distance between two points that can still be seen as separate.
- Resolution depends on wavelength: about 200 nm for light, about 0.5 nm for the TEM, so only electron microscopes show ultrastructure.
- The TEM passes electrons through thin sections (internal detail); the SEM scans the surface (3D view); both need dead specimens in a vacuum.
- Convert units first: 1 mm = 1000 µm, 1 µm = 1000 nm.
- Calibrate an eyepiece graticule against a stage micrometer for each objective lens before measuring.
:::
