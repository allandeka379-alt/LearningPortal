---
{
  "key": "electronics.thermionic-emission",
  "title": "Thermionic emission and electron beams",
  "summary": "Explain how a hot filament emits electrons, how they are formed into a beam in an electron gun, how electric and magnetic fields deflect the beam, and how a cathode-ray oscilloscope uses it.",
  "concepts": ["phys.electronics.thermionic-emission"],
  "objectives": ["zimsec/o-level/physics:14.1.1", "zimsec/o-level/physics:14.1.2", "zimsec/o-level/physics:14.1.3"],
  "estimatedMinutes": 28,
  "applies": ["zimsec"],
  "freePreview": true
}
---
## Introduction

Before flat screens, every television set and computer monitor was built around a **cathode-ray tube**: a glass tube in which a beam of electrons, steered by electric and magnetic fields, painted the picture on a glowing screen. Laboratories still use the same idea in the **cathode-ray oscilloscope (CRO)** to display electrical signals.

## Key definitions

:::definition{term="Thermionic emission"}
The release of electrons from the surface of a heated metal.
:::

:::definition{term="Cathode and anode"}
The **cathode** is the negative electrode that emits electrons; the **anode** is the positive electrode that attracts and accelerates them.
:::

:::definition{term="Cathode rays"}
A stream of electrons travelling through a vacuum.
:::

## Thermionic emission

The free electrons in a metal are held in by attraction to the positive ions. When the metal is heated strongly, some electrons gain enough kinetic energy to **escape** from the surface. A tungsten filament heated by a current to a dull red or white heat is a good emitter.

## The electron gun

1. A low-voltage supply heats a **filament**, which heats the **cathode**, and electrons are emitted.
2. An **anode**, held at a high positive p.d. (thousands of volts) relative to the cathode, **attracts and accelerates** the electrons.
3. Electrons pass through a small **hole in the anode**, forming a narrow **beam**. Extra electrodes focus the beam.
4. The whole tube is a **vacuum**, so the electrons do not collide with gas molecules and lose energy or scatter.

When the beam hits a screen coated with a **fluorescent** material, the screen glows at that spot.

## Deflecting the beam

### By an electric field

Between two parallel metal plates with a p.d. across them, the negatively charged electrons are attracted towards the **positive plate**. The beam bends towards that plate along a **curved** (parabolic) path, then travels straight once it leaves the plates. A larger p.d. gives a bigger deflection; reversing the p.d. reverses the deflection.

### By a magnetic field

A magnetic field at right angles to the beam pushes the electrons sideways, at right angles to both the field and their motion. Use **Fleming's left-hand rule**, remembering that the conventional current is **opposite** to the direction the electrons travel. Inside the field the beam follows a **circular arc**.

:::example{title="Which way does the beam bend?"}
A beam of electrons travels horizontally to the right between two horizontal plates. The top plate is positive and the bottom plate negative. The electrons are attracted to the positive plate, so the beam curves **upwards**. If a magnetic field directed into the page is used instead, the conventional current points to the left; with the first finger into the page and the second finger to the left, the thumb points **down**, so the beam curves downwards.
:::

## The cathode-ray oscilloscope (CRO)

A CRO has an electron gun, two pairs of deflecting plates and a fluorescent screen marked with a grid of centimetre squares (**divisions**).

- The **Y-plates** move the spot up and down in proportion to the input p.d. The **Y-gain** control sets how many volts make the spot move one division (for example $2\ \text{V/div}$).
- The **X-plates**, driven by the **time-base**, sweep the spot steadily across the screen and then flick it back. The time-base setting gives the time for the spot to cross one division (for example $5\ \text{ms/div}$).
- With the time-base on, an a.c. input appears as a **wave**; a steady d.c. input moves the line up or down.

:::worked-solution[Reading a CRO trace]
An a.c. signal is displayed with the Y-gain at $2\ \text{V/div}$ and the time-base at $5\ \text{ms/div}$. The peaks are $3.0$ divisions above the centre line, and one complete wave spans $4.0$ divisions.

1. Peak p.d. $= 3.0 \times 2 = 6.0\ \text{V}$.
2. Period $= 4.0 \times 5 = 20\ \text{ms} = 0.020\ \text{s}$.
3. Frequency $= \dfrac{1}{T} = \dfrac{1}{0.020} = 50\ \text{Hz}$.
:::

Uses of the CRO include measuring p.d.s, displaying the waveforms of sounds picked up by a microphone, and measuring time intervals and frequencies.

## Common mistakes

:::mistake{title="Electrons need air"}
The tube must be a vacuum; air molecules would stop and scatter the beam.
:::

:::mistake{title="Bending towards the negative plate"}
Electrons are negative, so they are attracted towards the **positive** plate.
:::

## Exam tips

:::exam-tip
Describe the electron gun in order: heated cathode emits electrons → positive anode accelerates them → hole in the anode forms a beam → vacuum.
:::

:::exam-tip
In CRO calculations, multiply divisions by the setting (V/div or ms/div) and convert ms to s before finding a frequency.
:::

## Summary

:::summary
- A heated metal emits electrons (thermionic emission).
- In an electron gun, a hot cathode emits electrons and a positive anode accelerates them into a beam in a vacuum.
- An electric field bends the beam towards the positive plate; a magnetic field deflects it at right angles (left-hand rule, current opposite to the electrons).
- A fluorescent screen glows where the beam hits it.
- A CRO uses Y-gain (V/div) and time-base (s/div) settings to measure p.d.s, periods and frequencies.
:::
