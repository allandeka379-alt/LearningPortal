---
{
  "key": "hardware.io-devices",
  "title": "Input and output devices and how they work",
  "summary": "How a laser printer, 3D printer, microphone, speaker, resistive and capacitive touchscreen and virtual reality headset work, and how to choose a device for a system such as a till, an ATM or a clinic.",
  "concepts": ["acs.hardware.io-devices"],
  "estimatedMinutes": 40,
  "level": "core",
  "freePreview": true
}
---
## Introduction

At a clinic in Gweru, a nurse taps a screen to open a patient's record, scans the barcode on the patient's card and prints a small label for the sample bottle. In the next room a teacher is recording a lesson with a microphone and playing it back through speakers. Every one of these actions depends on a device that turns something from the real world into data, or turns data back into something a person can see, hear or hold.

At AS level you are not only asked to name devices. You are asked to describe **how they work**, to say where each is used, and to **choose** a device for a task and justify it with benefits and drawbacks. This lesson covers the laser printer, the 3D printer, the microphone and speaker, the two common kinds of touchscreen and the virtual reality (VR) headset.

You should already know the difference between an input device (sends data into the computer) and an output device (presents results to the user), and that computers process digital data while the real world is analogue.

## Key definitions

:::definition{term="Input device"}
Hardware that converts something from the real world, such as a key press, a sound or a touch, into digital data that the processor can use.
:::

:::definition{term="Output device"}
Hardware that converts processed digital data into a form a person can see, hear, feel or hold.
:::

:::definition{term="Touchscreen"}
A display that is also an input device: it detects where it is touched and sends the position to the processor.
:::

:::definition{term="Additive manufacturing (3D printing)"}
Building a solid object by adding material one thin layer at a time, following a digital model, instead of cutting material away.
:::

:::definition{term="Virtual reality (VR)"}
A computer-generated environment shown on a headset so that the user feels present in it and can look around and interact.
:::

## The laser printer

A laser printer produces a whole page from a pattern of static electricity on a drum. The steps always run in this order:

1. The **drum** is given an even electrostatic charge.
2. A **laser beam**, steered by a rotating mirror, changes the charge on the parts of the drum that match the page image. The page is now an invisible electrostatic pattern on the drum.
3. **Toner** (a fine powder of plastic and pigment) is attracted to the pattern on the drum only.
4. The **paper** is given a charge and passes close to the drum, so the toner transfers onto it.
5. The paper then passes through the **fuser**, which uses heat and pressure to melt the toner into the fibres.
6. The drum is discharged and cleaned, ready for the next page.

A laser printer prints quickly and cheaply per page, which is why schools and offices use it for large jobs.

:::worked-solution{title="How long does a print job take?"}
A school office prints 300 pages on a laser printer rated at 24 pages per minute.

1. Time = number of pages ÷ pages per minute.
2. Time = 300 ÷ 24 = 12.5 minutes.
3. That is 12 minutes 30 seconds, ignoring warming up and paper refills.
:::

## The 3D printer

A 3D printer starts with a **digital model** made in computer-aided design (CAD) software. Slicing software cuts the model into very thin horizontal layers and produces the instructions for each layer. The printer then builds the object from the bottom up.

In the common **filament** type, a plastic thread is melted in a heated nozzle and laid down along the path of each layer, then cools and hardens before the next layer is added. Other types harden liquid resin with light or fuse a powder with a laser. Typical uses are prototypes, spare parts that are no longer sold, and custom parts.

## Microphone and speaker

A **microphone** is an input device for sound. Sound waves make a thin **diaphragm** vibrate. In a dynamic microphone the diaphragm moves a coil in a magnetic field; in a condenser microphone it changes the gap in a tiny capacitor. Either way the vibration becomes a small, varying **analogue** voltage. An **analogue-to-digital converter (ADC)** then samples that voltage so the computer can store it as numbers.

A **speaker** does the reverse. A **digital-to-analogue converter (DAC)** turns the stored numbers into a varying voltage, an amplifier strengthens it, and the current flows through a coil attached to a paper or plastic **cone**. The coil is an electromagnet inside the field of a permanent magnet, so it moves back and forth with the signal, pushing the cone and the air to recreate the sound.

## Touchscreens

:::keyfact{title="Resistive against capacitive"}
**Resistive**: two flexible, transparent, conducting layers separated by a small gap. Pressing pushes them together at one point. **Capacitive**: a glass layer with a grid of transparent electrodes that holds a weak electric field. A conducting fingertip changes the field at one point.
:::

In a **resistive** screen a voltage is applied across one layer, and the touch point acts like a slider on a resistor, so the voltage read at the contact point shows how far along the layer you touched. The controller does this once for the horizontal position and once for the vertical position.

:::worked-solution{title="Finding the touch position on a resistive screen"}
A 5 V supply is connected across the width of a layer that is 120 mm wide. The controller reads 2.0 V at the contact point.

1. The voltage is proportional to the distance from the supply edge: position = (reading ÷ supply) × width.
2. Position = (2.0 ÷ 5) × 120 = 48 mm from the edge.
3. The same method with the other layer gives the vertical position, and the two numbers give the touch point.
:::

A **capacitive** screen finds the grid point where the capacitance changed. It supports **multi-touch** (pinch to zoom), is bright and clear, and responds to a light touch, but it will not respond to an ordinary gloved finger or a plastic pen. A resistive screen works with gloves, a pen or a fingernail and costs less, but it is less clear, usually supports one touch at a time and wears with use.

## The virtual reality headset

A VR headset puts a small screen (or two) in front of the eyes behind lenses. The computer draws **two slightly different images**, one per eye, so that the brain sees depth. Motion sensors such as a **gyroscope** and an **accelerometer** detect head movement, and the processor redraws the scene to match. Hand controllers and headphones complete the effect.

Uses include safe training and design walk-throughs. Drawbacks include the powerful hardware needed, cost, and some users feeling unwell if the image lags behind the head movement.

:::worked-solution{title="How much data does a VR headset need?"}
Each eye shows a 1920 × 1080 image with 24 bits per pixel at 90 frames per second, with no compression.

1. Bytes per image = 1920 × 1080 × 3 = 6 220 800.
2. Two eyes: 12441600 bytes per pair of images.
3. Per second: 12 441 600 × 90 = 1119744000 bytes, which is about 1067.9 MiB per second.
4. This is why the headset needs a fast connection and a powerful graphics processor.
:::

## Choosing devices for a system

Use the same four questions each time: **what must it do**, **who uses it and where**, **how accurate or fast must it be**, and **what does it cost to buy and run**.

| System | Typical input devices | Typical output devices |
|---|---|---|
| Point of sale in a shop | Barcode scanner, card reader, touchscreen | Screen, receipt printer, speaker for the beep |
| Automated teller machine (ATM) | Card reader, keypad, touchscreen | Screen, cash dispenser, receipt printer |
| Mobile money agent kiosk | Touchscreen or keypad, fingerprint reader | Screen, receipt printer |
| Classroom | Microphone, interactive whiteboard, keyboard | Projector, speakers |
| Clinic | Barcode scanner, touchscreen | Label printer, screen |

:::example{title="A device for a dusty workshop"}
A hardware shop in Mutare wants a screen for taking orders at a dusty counter where staff often wear gloves. A **resistive** screen is the better choice: it responds to a gloved finger, it costs less, and multi-touch is not needed. A capacitive screen would be clearer but would not respond to gloves. The decision follows from the environment and the user.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This is Cambridge AS content (topic 3). The ZIMSEC A-Level syllabus does not list these devices as a separate topic, so ZIMSEC candidates meet them mainly in scenario questions about systems.
:::

## Common mistakes

:::mistake{title="Saying a laser printer sprays ink"}
A laser printer uses toner powder that is attracted to a charged drum and melted on by the fuser. Spraying liquid ink is an inkjet printer.
:::

:::mistake{title="Forgetting the ADC and DAC"}
Sound is analogue and the computer is digital. A microphone needs an ADC and a speaker needs a DAC; leaving them out loses marks in a "describe how it works" answer.
:::

:::mistake{title="Saying capacitive screens use pressure"}
Capacitive screens detect the change in an electric field caused by a conducting finger. Pressure is the resistive method.
:::

## Exam tips

:::exam-tip
Cambridge Paper 1 asks you to **describe** the operation of a device. Write numbered stages in the right order (for a laser printer: charge, laser, toner, transfer, fuse) and use the correct terms: drum, toner, fuser, diaphragm, ADC.
:::

:::exam-tip
For "**choose** a device and **justify** it", link the device to the scenario (gloves, dust, noise, number of users) and give one benefit and one drawback. Avoid answers that only say "it is better".
:::

:::exam-tip
For "**state**" questions, one precise term is enough: "capacitive", "gyroscope". Show the steps in any calculation.
:::

## Summary

:::summary
- A laser printer charges a drum, writes the image with a laser, attracts toner, transfers it to paper and fuses it with heat and pressure.
- A 3D printer builds an object layer by layer from a sliced digital model.
- A microphone turns sound into a varying voltage which an ADC samples; a speaker uses a DAC, an amplifier and an electromagnet that moves a cone.
- Resistive screens work by pressure on two conducting layers; capacitive screens detect a conducting finger and support multi-touch.
- A VR headset shows a different image to each eye and uses motion sensors to follow the head.
- Choose devices by purpose, user, environment, accuracy and cost, and give a benefit and a drawback.
:::
