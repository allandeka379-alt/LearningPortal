---
{
  "key": "hardware.embedded-systems",
  "title": "Embedded systems",
  "summary": "What an embedded system is, its characteristics, where embedded systems are found (appliances, cars, security and lighting systems, vending machines) and how an embedded system differs from a general-purpose computer.",
  "concepts": ["comp.hardware.embedded-systems"],
  "estimatedMinutes": 25,
  "level": "core"
}
---
## Introduction

Count the computers in a typical home in Harare. You might say one laptop and two phones. In fact there are probably many more: inside the microwave oven, the washing machine, the television remote, the digital clock on the stove, the car's engine and the solar inverter that charges the batteries during load-shedding. Each one contains a small processor that does one job. These are **embedded systems**.

Cambridge 0478 asks you to describe the purpose and characteristics of an embedded system and to identify devices that use them. Exam questions often give a list of devices and ask which contain embedded systems, or ask you to explain why a device such as a security alarm uses one.

You should already know what a microprocessor is.

## Key definitions

:::definition{term="Embedded system"}
A combination of hardware and software, built around a microprocessor, that is part of a larger device and performs one dedicated function (or a small set of related functions).
:::

:::definition{term="General-purpose computer"}
A computer, such as a personal computer (PC) or laptop, that can run many different programs to carry out many different tasks.
:::

:::definition{term="Microcontroller"}
A single chip that contains a processor, memory and input/output connections, often used as the heart of an embedded system.
:::

:::definition{term="Firmware"}
The program stored permanently in the memory (usually ROM or flash memory) of an embedded system that controls it.
:::

## Characteristics of an embedded system

An embedded system usually:

- performs a **dedicated function**: a microwave controller only controls the microwave;
- is **part of a larger device** rather than a computer on its own;
- is built around a **microprocessor or microcontroller**;
- runs a fixed program (**firmware**) stored in ROM or flash memory, which the user cannot change (although some can be updated by the manufacturer);
- is **small**, uses **little power** and is **cheap** to make in large numbers;
- often works in **real time**, responding immediately to inputs such as sensor readings or key presses;
- has a **simple interface** (a few buttons, a keypad, a small display) or none at all;
- is often connected to **sensors** (inputs) and **actuators** (outputs).

## How an embedded system works

Most embedded systems follow the same pattern of **input, process, output**, repeated continuously while the device is on:

1. **Input**: readings arrive from sensors (temperature, light, motion) or from simple controls such as buttons and keypads.
2. **Process**: the microprocessor runs the firmware, compares each input with stored values or settings and decides what to do.
3. **Output**: it sends signals to actuators (motors, valves, heaters, relays) or to a small display, a buzzer or a light.

For example, the embedded system in a refrigerator reads the temperature sensor many times a minute. If the temperature has risen above the setting, it switches the compressor on; when the temperature falls low enough, it switches the compressor off again. The user only sets the temperature once.

## Where embedded systems are used

| Area | Examples | What the embedded system does |
|:--|:--|:--|
| Domestic appliances | Washing machine, microwave oven, refrigerator, air conditioner | Controls the programme, timer, temperature or motor |
| Cars | Engine management, anti-lock brakes, airbags, satellite navigation | Monitors sensors and controls fuel, braking or the airbag in real time |
| Security systems | Burglar alarm, electric gate, CCTV recorder | Checks sensors, sounds alarms, records video |
| Lighting systems | Street lights, automatic security lights | Switches lights on and off using light or motion sensors |
| Vending machines | Drinks and snacks machines, ticket machines | Accepts payment, checks stock, releases the item, gives change |

Many embedded systems are now connected to the internet so that they can be controlled from a phone app. They are still embedded systems because each one has a dedicated function.

## Embedded system or general-purpose computer?

| Embedded system | General-purpose computer |
|:--|:--|
| One dedicated function | Many different tasks |
| Part of a larger device | A complete computer in its own right |
| Fixed program (firmware) the user cannot replace | User installs and runs any software |
| Small, cheap, low power | Larger, more expensive, more power |
| Simple or no user interface | Full keyboard, mouse, screen |

:::example
**A drinks vending machine at a college in Gweru.** The machine contains an embedded system:

- Inputs: the keypad (choice of drink), a coin and note sensor, a card reader, sensors that detect whether each column still has stock.
- Processing: the microprocessor checks that enough money has been paid, that the chosen drink is in stock, and works out the change.
- Outputs: a motor (actuator) that turns to release the can, a small display showing the price and messages, the change dispenser.

It is an embedded system because it is part of the machine, performs one dedicated function (selling drinks), runs a fixed program and has a very simple interface. Nobody installs a word processor on a vending machine.
:::

:::example
**Which of these use embedded systems?** Sipho's list: a laptop, a digital camera, an automatic washing machine, a smartphone, a car's anti-lock braking system and a desktop PC.

1. The **washing machine** and the **anti-lock braking system** clearly contain embedded systems: each has one dedicated job inside a larger device.
2. The **digital camera** also contains an embedded system: its processor controls the sensor, focus and storage, and the user cannot install new programs.
3. The **laptop** and **desktop PC** are general-purpose computers.
4. A **smartphone** runs many apps that the user installs, so it is treated as a general-purpose device, although it contains several embedded systems (for example, the one controlling the camera module or the battery charging).
:::

## Benefits and drawbacks

**Benefits:** small enough to fit inside the device; cheap to mass-produce; low power consumption (important for battery-powered devices); fast, reliable response because the system does only one job; can be controlled remotely when connected to a network.

**Drawbacks:** difficult or impossible for the user to upgrade; if it fails the whole device may need repair or replacement; devices connected to the internet can be hacked if they are not kept secure.

## Common mistakes

:::mistake{title="Saying an embedded system is 'a small computer'"}
The key idea is the **dedicated function inside a larger device**, not the size.
:::

:::mistake{title="Listing a laptop or PC as an embedded system"}
Laptops and PCs are general-purpose computers: they run many different programs.
:::

:::mistake{title="Forgetting the sensors and actuators"}
When describing how an embedded system works in a scenario, say what it takes in (sensor or keypad), what it decides and what it controls (motor, light, display).
:::

## Exam tips

:::exam-tip
For "**describe** the characteristics of an embedded system", give separate points: dedicated function; part of a larger device; microprocessor-based; fixed firmware; small, low cost and low power; real-time response.
:::

:::exam-tip
For "**identify** devices that contain embedded systems", choose devices with one dedicated job: appliances, car systems, alarms, lighting, vending machines. Avoid PCs, laptops and servers.
:::

## Summary

:::summary
- An embedded system is a microprocessor-based system with a dedicated function inside a larger device.
- It runs fixed firmware, is small, cheap and low-power, and often responds in real time.
- Examples: domestic appliances, car systems, security systems, lighting systems and vending machines.
- A general-purpose computer (PC, laptop) runs many different programs; an embedded system does one job.
- Embedded systems often take input from sensors or keypads and control actuators.
:::
