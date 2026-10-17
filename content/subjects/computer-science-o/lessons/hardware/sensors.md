---
{
  "key": "hardware.sensors",
  "title": "Sensors",
  "summary": "What a sensor is and what sensors are used for; the type of data captured by acoustic, accelerometer, flow, gas, humidity, infra-red, level, light, magnetic field, moisture, pH, pressure, proximity and temperature sensors; and how to choose the most suitable sensor for a context.",
  "concepts": ["comp.hardware.sensors"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

A tobacco farmer near Karoi cures leaves in a barn where the temperature and humidity must be kept within narrow limits. A water authority in Bulawayo monitors the level of water in its storage tanks. A smartphone turns its screen sideways when you rotate it and switches the screen off when you hold it to your ear. Each of these depends on **sensors**.

Cambridge 0478 lists fourteen sensors. You must know what data each one captures and choose the most suitable sensor for a given context, with a reason. How sensors fit into complete automated systems is covered in a later lesson. You should already know what an input device is.

## Key definitions

:::definition{term="Sensor"}
An input device that measures a physical property of its surroundings (such as temperature, light or pressure) and sends the reading to a computer or microprocessor.
:::

:::definition{term="Analogue data"}
Data that varies continuously, such as temperature, which can take any value within a range.
:::

:::definition{term="Monitoring system"}
A system that uses sensors to collect readings and checks or records them, warning a user when a reading is outside the expected range. It does not change the conditions itself.
:::

:::definition{term="Control system"}
A system that uses sensor readings to make decisions and sends signals to actuators to change the conditions, such as switching on a heater.
:::

## What sensors are used for

Sensors let a computer "know" what is happening in the physical world without a person entering readings by hand. They are used to:

- **monitor** conditions, for example a patient's temperature in hospital or air quality in a mine;
- **control** processes, for example switching irrigation on when the soil is dry;
- **detect events**, for example an intruder, a car reversing too close to a wall or a phone being rotated.

Sensors work continuously, day and night, and take readings more often and more accurately than a person could. Most sensors produce **analogue** readings, so an **analogue-to-digital converter (ADC)** converts them into digital data before the microprocessor processes them.

### Monitoring or control?

In a **monitoring** system, the microprocessor compares each reading with stored limits and, if a reading is outside them, warns a person, for example by sounding an alarm or showing a message; a person decides what to do. In a **control** system, the microprocessor also sends a signal to an **actuator** to change the conditions itself, for example by opening a vent or switching on a pump, and then keeps reading the sensor to check the effect. In both, the sensor's only job is to measure: it never makes the decision.

![Monitoring and control: a sensor's reading goes through an ADC to the microprocessor, which compares it with stored limits; in monitoring it only warns a person, in control it also signals an actuator whose effect on the conditions is read again by the sensor, forming a feedback loop](media:diagrams/sensor-control-feedback-loop.png "Figure: sensor, ADC, microprocessor and actuator in a control loop, with the monitoring branch")

## The fourteen sensors

| Sensor | Data it captures | Example uses |
|:--|:--|:--|
| Acoustic | Sound (noise levels, vibrations) | Detecting breaking glass in a burglar alarm; noise monitoring near an airport |
| Accelerometer | Acceleration, change in speed or direction, tilt | Rotating a phone's screen; deploying a car airbag in a crash; fitness trackers counting steps |
| Flow | Rate of flow of a liquid or gas | Water meters; fuel pumps; monitoring air flow in a ventilation system |
| Gas | Amount of a particular gas (e.g. carbon monoxide, methane, oxygen) | Gas leak alarms; mine safety; car exhaust monitoring |
| Humidity | Amount of water vapour in the air | Greenhouses; tobacco curing barns; museums; weather stations |
| Infra-red | Infra-red radiation (heat) or a broken infra-red beam | Burglar alarms detecting body heat; automatic doors; TV remote receivers |
| Level | The height of a liquid (or solid) in a container | Water tanks and reservoirs; fuel tanks; grain silos |
| Light | Light intensity (brightness) | Street lights switching on at dusk; automatic screen brightness |
| Magnetic field | Changes in a magnetic field | Phone compass apps; detecting whether a door or window is open; vehicle detection at traffic lights |
| Moisture | Water content of a material such as soil | Irrigation systems; damp detection in buildings |
| pH | Acidity or alkalinity of a liquid or soil | Fish ponds; water treatment; checking soil for crops |
| Pressure | Force or pressure applied, or air/fluid pressure | Weighing goods; detecting a car on a road; intruder pads under a mat; tyre pressure |
| Proximity | How close an object is (without touching) | Parking sensors on cars; switching a phone screen off near the ear |
| Temperature | How hot or cold something is | Ovens; incubators; air conditioning; engine monitoring |

:::keyfact{title="Humidity or moisture?"}
**Humidity** sensors measure water vapour in the **air**. **Moisture** sensors measure water in a **material**, such as soil. A question about watering crops needs a moisture sensor; a question about air in a greenhouse needs a humidity sensor.
:::

## Choosing the most suitable sensor

Read the context carefully and ask: **what physical quantity changes** when the event happens? Then choose the sensor that measures exactly that quantity.

:::example
**A greenhouse at a horticulture farm near Harare.** The farmer wants a system that keeps conditions right for tomato seedlings.

1. Keeping the air warm enough: a **temperature** sensor.
2. Keeping the air from becoming too dry or too damp: a **humidity** sensor.
3. Knowing when to water the soil: a **moisture** sensor.
4. Switching on lamps on cloudy days: a **light** sensor.
5. Checking the acidity of the nutrient solution: a **pH** sensor.

Each choice names the quantity that must be measured, not just "a sensor". A pressure sensor or a proximity sensor would not help, because nothing in the requirements depends on force or distance.
:::

:::example
**Which sensor detects a car?** At a toll gate on the Harare-Beitbridge road, the barrier must lift only when a car is in position.

- A **pressure** sensor in the road surface detects the weight of the car pressing on it.
- A **magnetic field** sensor in the road detects the large mass of metal changing the magnetic field.
- An **infra-red** beam across the lane is broken when a car drives into it.

All three are suitable. A good exam answer chooses one and says what it detects: "a pressure sensor, because the car's weight presses on the sensor when it is in position".
:::

:::example
**How often are readings taken?** A tank-level sensor in Bulawayo sends a reading every 10 minutes. In one hour it sends $60 \div 10 = 6$ readings, so in one day it sends $6 \times 24 = 144$ readings. A person reading a gauge by hand could not keep up with this, and readings at night would be missed.
:::

## Common mistakes

:::mistake{title="Writing 'heat sensor' or 'motion sensor'"}
Use the names in the syllabus: **temperature** sensor, **infra-red** sensor, **proximity** sensor, **accelerometer**.
:::

:::mistake{title="Saying a sensor makes decisions"}
A sensor only **measures** and sends readings. The microprocessor compares the readings with stored values and decides what to do.
:::

:::mistake{title="Confusing humidity and moisture"}
Humidity is water vapour in the air; moisture is water in soil or another material.
:::

:::mistake{title="Saying the sensor switches the device on"}
In a control system, the **actuator** (motor, valve, heater switch) makes the change, after the microprocessor sends a signal.
:::

## Exam tips

:::exam-tip
For "**identify** the most suitable sensor", give the sensor's syllabus name **and** the quantity it measures in that context, for example "a level sensor, to measure the height of water in the tank".
:::

:::exam-tip
If a question asks for two sensors for different purposes, do not give the same sensor twice, and make sure each matches a different requirement.
:::

## Summary

:::summary
- A sensor is an input device that measures a physical property and sends readings to a microprocessor.
- Sensors are used to monitor conditions, control processes and detect events, continuously and accurately.
- Most readings are analogue and are converted to digital by an ADC.
- Know the data each of the fourteen sensors captures, especially humidity (air) versus moisture (soil).
- Choose a sensor by asking what physical quantity changes in the context, and name it precisely.
:::
