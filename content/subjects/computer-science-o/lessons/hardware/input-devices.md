---
{
  "key": "hardware.input-devices",
  "title": "Input devices",
  "summary": "What an input device is and why a computer needs one; how keyboards, optical mice, microphones, digital cameras, barcode and QR code scanners, resistive, capacitive and infra-red touch screens, and 2D and 3D scanners work; and how to choose a device for a scenario.",
  "concepts": ["comp.hardware.input-devices"],
  "estimatedMinutes": 35,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A pharmacy in Masvingo scans the barcode on a box of tablets, a bank customer taps a touch screen to withdraw cash, a teacher scans a page of notes to share with her class and a farmer photographs a diseased maize leaf to send to an extension officer. Each of these actions starts with an **input device** turning something from the real world into data a computer can process.

Both ZIMSEC and Cambridge ask you to explain how input devices work and to choose a suitable device for a situation, giving reasons. This lesson covers the devices named in both syllabuses.

## Key definitions

:::definition{term="Input device"}
A hardware device that captures data or instructions from the user or the environment and converts them into a digital form that the computer can process.
:::

:::definition{term="Analogue-to-digital converter (ADC)"}
A circuit that converts a continuously varying (analogue) signal, such as the signal from a microphone, into digital values.
:::

:::definition{term="Touch screen"}
A screen that is both an output device (it displays images) and an input device (it detects where it is touched).
:::

## Why input devices are needed

A computer can only process **digital data** (binary). People and the environment produce key presses, movements, sounds, light and printed documents. An input device is needed to **capture** this data and **convert** it into binary so that the CPU can process it. Without input devices a computer would have nothing to work on.

## How common input devices work

### Keyboard

Under each key is a switch. Pressing a key **completes a circuit** in a grid of wires (the key matrix). A small processor inside the keyboard detects which circuit was completed, works out which key it is and sends a code for that key to the computer, where it is converted to the character (for example, using ASCII or Unicode). Keyboards are reliable and good for entering text, but slow for large amounts of data and can cause strain injuries with long use.

### Optical mouse

An LED in the base shines light onto the surface beneath the mouse. A tiny camera (a light sensor) takes **hundreds of images a second** of the surface. A processor in the mouse compares each image with the previous one to work out the **direction and distance** moved, and sends this to the computer, which moves the pointer. Buttons and the scroll wheel send their own signals. With no moving ball, an optical mouse does not collect dirt, but it works poorly on glass or very shiny surfaces.

### Microphone

Sound waves make a thin **diaphragm** vibrate. The vibrations move a coil near a magnet (or change the gap in a capacitor), creating a varying **electrical current** that matches the sound. This analogue signal is converted by an **ADC** into digital values that the computer can store and process. Uses: voice calls, voice recognition, recording lessons.

### Digital camera

Light passes through the lens onto an **image sensor** made of millions of tiny light-sensitive cells (one for each pixel). Each cell turns the light that falls on it into an electrical signal. The camera's processor converts these signals into a digital value for the colour of each pixel and stores the image on a memory card. More pixels on the sensor means a higher resolution image.

### Barcode scanner

The scanner shines **red light or a laser** across the barcode. The **white** spaces **reflect** the light; the **black** bars **absorb** it. A sensor detects the pattern of reflected light, and this is converted into the digital number the barcode represents. The computer then uses the number, for example to look up the product's name and price in a database.

### QR code scanner

A QR code is a square, two-dimensional pattern of black and white squares, with three large squares in the corners for alignment. A **camera** (often a phone camera with an app) captures an image of the code. Software finds the three corner squares, works out the code's position and angle, and **decodes** the pattern of small squares into the stored data, such as a website address or payment details. A QR code holds much more data than a barcode and can be read at any angle.

### Touch screens

| Type | How it works | Benefits | Drawbacks |
|:--|:--|:--|:--|
| Resistive | Two flexible layers with conductive coatings are separated by a tiny gap. Pressing pushes the top layer onto the bottom one, completing a circuit; the point of contact is calculated from the change in voltage. | Cheap; works with a gloved finger or any stylus; not affected by water | Needs pressure; less clear image; top layer can be scratched or damaged; usually no multi-touch |
| Capacitive | Glass is coated with a conductive layer that holds an electrical charge (an electrostatic field). A finger conducts electricity, so touching changes the charge at that point; sensors detect the change and the location is calculated. | Very clear image; durable glass; supports multi-touch; responds to a light touch | Does not work with ordinary gloves or a non-conductive stylus; more expensive than resistive |
| Infra-red | Infra-red LEDs and sensors around the edges of the screen form an invisible grid of beams. A touch **breaks** horizontal and vertical beams; the position is worked out from which beams are broken. | Works with any object (gloves, stylus); good for very large screens; multi-touch | Can be triggered accidentally by dust, insects or a sleeve; expensive |

### 2D and 3D scanners

A **2D scanner** copies flat documents and photographs. The document lies on a glass plate; a bright light shines on it and the reflected light is captured by a row of sensors that moves across the page. The readings are converted into a digital image. Optical character recognition (OCR) software can then turn scanned text into editable text.

A **3D scanner** captures the **shape** of a solid object. It shines lasers or light patterns onto the object (or uses X-rays, as in medical CT scanners) and measures the distance to many points on its surface from different angles. These points are combined into a digital 3D model, which can be edited or sent to a 3D printer.

## Choosing an input device

When an exam question gives a scenario, link your choice to the **situation**: the type of data, the environment, the users, speed and accuracy.

:::example
**A self-service ticket machine at a bus terminus in Harare.** It is used outdoors by many people, some wearing gloves in winter, and it must survive rough use.

- A **resistive** touch screen works with gloved fingers and is cheap, but its soft top layer may be damaged by heavy use.
- A **capacitive** screen is tough glass and clear, but does not work with ordinary gloves.
- An **infra-red** screen works with gloves and has no layer to scratch, but dust or insects could trigger it outdoors and it costs more.

A good answer chooses one and justifies it: for example, an infra-red screen inside a protective glass panel, because it works with gloves and has no soft surface to wear out; or a capacitive screen if the operator accepts that gloves must be removed.
:::

:::example
**Recording books at a school library in Gweru.** The librarian needs to record each book borrowed quickly and without typing errors. Each book has a barcode, and pupils have barcoded library cards. A **barcode scanner** reads the book and card numbers in a fraction of a second and avoids typing mistakes. A keyboard is still needed for adding new pupils' names. A QR code on a poster could link pupils to the online catalogue, read with a phone camera.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect you to explain how input devices work. Cambridge names exactly the devices in this lesson, including the three types of touch screen and 2D and 3D scanners. ZIMSEC also asks how input devices are used in point-of-sale terminals, ATMs and data-capture systems (covered in a later lesson).
:::

## Common mistakes

:::mistake{title="Saying barcode bars reflect light"}
The **white** spaces reflect light; the **black** bars absorb it.
:::

:::mistake{title="Mixing up capacitive and resistive screens"}
Resistive screens need **pressure** (layers touching). Capacitive screens detect a **change in charge** from a conductive finger.
:::

:::mistake{title="Forgetting the conversion step"}
A full description ends with the data being **converted to digital** form, for example by an ADC in a microphone.
:::

:::mistake{title="Giving a device without a reason"}
"A touch screen" earns little on its own. Say why it suits the scenario.
:::

## Exam tips

:::exam-tip
For "**explain** how a barcode scanner works", give the sequence: light shone on the code; white reflects, black absorbs; sensor detects the reflected pattern; converted into a digital number; number used to look up the product.
:::

:::exam-tip
For touch screens, learn one benefit and one drawback of each type. Questions often describe a situation (gloves, outdoors, large display) and ask which type is most suitable.
:::

## Summary

:::summary
- An input device captures data from users or the environment and converts it into digital form for the CPU.
- Keyboards complete circuits; optical mice compare images of the surface; microphones turn vibrations into a signal converted by an ADC.
- Digital cameras use an image sensor of light-sensitive pixels; barcode scanners detect reflected light; QR scanners decode a camera image.
- Resistive screens need pressure, capacitive screens detect a change in charge, infra-red screens detect broken beams.
- 2D scanners copy flat documents; 3D scanners measure the shape of solid objects to build a 3D model.
:::
