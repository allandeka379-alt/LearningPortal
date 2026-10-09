---
{
  "key": "hardware.output-devices",
  "title": "Output devices",
  "summary": "What an output device is and why it is needed; how LCD and LED screens, DLP and LCD projectors, inkjet, laser and 3D printers, speakers and actuators work; and how to choose an output device for a scenario.",
  "concepts": ["comp.hardware.output-devices"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A school in Mutare prints 600 end-of-term reports, projects a revision video onto a wall for a Form 4 class, plays a recorded announcement in the corridor and, in the science laboratory, opens a valve to water seedlings when the soil is dry. Every one of these is an **output**: the computer turning its digital results into something people can see, hear or use, or into a physical action.

Both ZIMSEC and Cambridge ask how output devices work and which device suits a given situation. Cambridge names a precise list: actuators, DLP and LCD projectors, inkjet, laser and 3D printers, LED and LCD screens, and speakers. You should already know what an input device is.

## Key definitions

:::definition{term="Output device"}
A hardware device that converts the results of processing from digital data into a form that people can understand or use, such as images, printed pages, sound or movement.
:::

:::definition{term="Actuator"}
An output device that converts an electrical signal into physical movement or action, such as a motor, a solenoid, a valve or a pump.
:::

:::definition{term="Digital-to-analogue converter (DAC)"}
A circuit that converts digital data into a continuously varying (analogue) electrical signal, for example to drive a speaker.
:::

:::definition{term="Additive manufacturing"}
Making a solid object by building it up layer by layer from a digital design, as a 3D printer does.
:::

## Why output devices are needed

The CPU produces results as binary data, which humans cannot read directly and which cannot move anything in the physical world. Output devices are needed to **convert** this data into a useful form: an image on a screen, a printed page, sound or a physical action.

## Screens

**LCD screen.** The screen is made of many pixels, each containing **liquid crystals** with red, green and blue filters. A **backlight** (today usually made of LEDs) shines from behind. When a voltage is applied, the crystals twist to let more or less light through each filter, which produces the colour of each pixel. The crystals do not give out light themselves; they only control the backlight.

**LED screen.** In a true LED screen each pixel is made of tiny red, green and blue **light-emitting diodes** that give out their own light, so no separate backlight is needed. Large outdoor advertising boards and scoreboards are LED screens. Many televisions sold as "LED" are actually LCD screens with an LED backlight.

Compared with older backlights, LED backlighting and LED screens are thinner, brighter, use less power and last longer.

## Projectors

**DLP (digital light processing) projector.** A chip holds **millions of microscopic mirrors**, one for each pixel. Each mirror tilts thousands of times a second, either towards the lens (on) or away from it (off); the proportion of time it is on gives shades of grey. Light from a bright lamp passes through a spinning **colour wheel** of red, green and blue, so the mirrors produce coloured images, which the lens projects onto a screen.

**LCD projector.** Light from a bright lamp is split into red, green and blue beams. Each beam passes through its own small **LCD panel**, where each pixel lets light through or blocks it. The three images are combined by a prism and projected through the lens.

| | DLP projector | LCD projector |
|:--|:--|:--|
| Benefits | High contrast (deep blacks); smooth moving images; small and light | Bright, well-saturated colours; images sharp in well-lit rooms; usually cheaper |
| Drawbacks | Some viewers see a "rainbow" flicker from the colour wheel; colours less saturated | Lower contrast; visible pixel grid at large sizes; panels can fade over time |

## Printers

### Inkjet printer

1. The paper is fed in and the **print head** moves from side to side across it.
2. Tiny droplets of ink are fired through **nozzles** in the print head. In a **thermal** printer a heater forms a bubble that pushes the droplet out; in a **piezoelectric** printer a crystal vibrates to push the ink out.
3. The paper moves forward a line at a time until the page is complete.

Inkjet printers are cheap to buy and print high-quality colour photographs, but the ink costs a lot per page, printing is slow and wet ink can smudge.

### Laser printer

1. A rotating **drum** is given an electrostatic charge.
2. A **laser beam** scans across the drum, changing the charge on the areas that match the text and images of the page, so an electrostatic image of the whole page is formed.
3. Charged **toner** (fine powder) is attracted to these areas of the drum only.
4. A sheet of **paper**, given a charge that attracts the toner, rolls past the drum and the toner transfers to it.
5. The **fuser** uses heat and pressure to melt the toner onto the paper; the drum's charge is removed ready for the next page.

Laser printers are fast, quiet and cheap per page for large volumes, so they suit offices and schools. They cost more to buy, colour laser printers are expensive, and toner powder and ozone can be harmful in a poorly ventilated room.

### 3D printer

A 3D printer makes a **solid object** from a digital design (for example, from CAD software or a 3D scanner). It builds the object **layer by layer**: plastic filament is melted and squeezed through a moving nozzle, or liquid resin is hardened by light, or metal powder is fused. Uses include prototypes, spare parts, prosthetic limbs and models. Printing can take hours, and objects are limited by the printer's size and materials.

## Speakers

1. Digital sound data is converted into an analogue electrical signal by a **DAC** and made stronger by an **amplifier**.
2. The varying current flows through a **coil** attached to a paper or plastic **cone**. The coil sits in the field of a permanent **magnet**.
3. As the current changes, the coil is pushed and pulled, so the cone **vibrates**.
4. The vibrating cone moves the air, creating **sound waves**.

## Actuators

An actuator turns a signal from a computer into **movement**. Examples: an electric motor that opens a greenhouse window, a solenoid that unlocks a door, a valve that opens an irrigation pipe, a pump in a borehole. Actuators are the output devices of control systems: the computer reads **sensors**, decides, then switches an actuator.

:::example
**Choosing printers for a school in Masvingo.** The office prints about 2 000 pages of reports, letters and tests each week, mostly black text. The art department occasionally prints colour photographs of pupils' work.

- Office: a **laser printer**, because it is fast and cheap per page for high volumes of text, and the toner does not smudge.
- Art department: an **inkjet printer**, because it is cheap to buy and gives high-quality colour photographs, and the small number of prints keeps the high ink cost acceptable.
:::

:::example
**A projector for a large lecture hall.** A college in Bulawayo shows videos in a hall that cannot be fully darkened. A bright **LCD projector** gives well-saturated colours in a lit room. If the hall were dark and the content were mostly fast-moving films, a **DLP projector** would give higher contrast and smoother movement. The answer depends on the conditions, so state them.
:::

## Common mistakes

:::mistake{title="Saying LCD crystals give out light"}
Liquid crystals only control light from the **backlight**. In a true LED screen the LEDs give out light themselves.
:::

:::mistake{title="Saying a laser printer burns the image onto paper"}
The laser changes the **charge** on the drum; the toner is fixed to the paper by the **fuser** using heat and pressure.
:::

:::mistake{title="Forgetting that actuators are output devices"}
An actuator receives a signal from the computer and produces movement, so it is an output device, not an input or a sensor.
:::

## Exam tips

:::exam-tip
For "**describe** how a laser printer works", give the steps in order: drum charged; laser changes the charge to form the image; toner attracted to the charged areas; toner transferred to the paper; fuser melts it.
:::

:::exam-tip
For choice questions, compare speed, cost per page, quality, volume and the environment, and **justify** the device using the scenario.
:::

## Summary

:::summary
- Output devices convert digital results into images, printed pages, sound or movement.
- LCD screens use liquid crystals to control a backlight; LED screens use LEDs that give out their own light.
- DLP projectors use millions of tilting micro-mirrors and a colour wheel; LCD projectors pass light through three LCD panels.
- Inkjet: droplets fired from a moving print head. Laser: charged drum, toner, fuser. 3D: object built layer by layer.
- Speakers use a DAC, an amplifier, a coil, a magnet and a vibrating cone.
- Actuators turn signals into movement (motors, valves, solenoids) in control systems.
:::
