---
{
  "key": "emerging.automated-systems",
  "title": "Automated systems: sensors, microprocessors and actuators",
  "summary": "How sensors, a microprocessor and actuators work together in an automated system (read, compare with stored values, act, repeat), with scenarios from industry, transport, agriculture, weather, gaming, lighting and science, and the advantages and disadvantages of automation in a given scenario.",
  "concepts": ["comp.emerging.automated-systems"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

On a commercial farm near Chegutu, tunnels of tomatoes must be kept between 18 °C and 27 °C and the soil must never dry out. Nobody stands in the tunnels all night checking thermometers. Instead, sensors measure the temperature and soil moisture every few seconds, a microprocessor compares the readings with the values the farmer has set, and motors open vents or switch on pumps as soon as they are needed. This is an **automated system**: it monitors and controls a process with no person needed in the loop.

Cambridge 0478 (topic 6.1) expects you to describe how sensors, microprocessors and actuators work together in a given scenario, and to discuss the advantages and disadvantages of automation in that scenario. Questions usually carry four to six marks, and examiners reward a clear, step-by-step description that uses the right component names.

## Key definitions

:::definition{term="Automated system"}
A combination of software and hardware that is designed to carry out a task or control a process automatically, with little or no human involvement.
:::

:::definition{term="Sensor"}
An input device that measures a physical quantity, such as temperature, light, moisture, pressure or motion, and sends the reading as data.
:::

:::definition{term="Actuator"}
An output device that causes physical movement or an action, such as a motor, a pump, a valve or a relay switching on a heater.
:::

:::definition{term="Microprocessor"}
The processor in the automated system: it receives data from the sensors, compares it with stored values and sends signals to the actuators.
:::

:::definition{term="Analogue-to-digital converter (ADC)"}
A device that converts the analogue signal from a sensor into digital data that the microprocessor can process.
:::

## How the parts work together

Every automated system follows the same cycle, and your exam answers should follow it too:

1. **Sensors** take readings of the physical quantity (for example the temperature in a greenhouse).
2. If the sensor's signal is analogue, an **ADC** converts it to digital.
3. The **microprocessor** compares the reading with **stored (pre-set) values**, such as a minimum and maximum temperature.
4. If the reading is outside the range, the microprocessor sends a **signal to an actuator** (through a digital-to-analogue converter if the actuator needs an analogue signal), for example to switch on a heater or open a vent.
5. If the reading is within the range, no action is taken.
6. The process **repeats continuously**, so the system responds as conditions change.

The decision in step 3 is just a comparison, which can be written in pseudocode. In this sketch, `ReadSensor` and `Signal` stand for routines supplied with the hardware:

```
CONSTANT MinTemp ← 18
CONSTANT MaxTemp ← 27
DECLARE Temperature : REAL
REPEAT
    Temperature ← ReadSensor("Temperature")
    IF Temperature < MinTemp
        THEN
            CALL Signal("Heater", "On")
        ELSE
            CALL Signal("Heater", "Off")
    ENDIF
    IF Temperature > MaxTemp
        THEN
            CALL Signal("VentMotor", "Open")
        ELSE
            CALL Signal("VentMotor", "Close")
    ENDIF
UNTIL FALSE
```

Notice that the microprocessor never "feels" the temperature: it only compares a number with stored values and sends signals.

## Scenarios

| Area | Example | Sensors | Actuators and actions |
|:--|:--|:--|:--|
| Industry | Bottling plant | Light (bottle present), pressure, level | Motor moves the conveyor; valve fills the bottle; arm caps it |
| Transport | Automatic level crossing or driverless train | Infrared or pressure (train approaching), proximity | Motor lowers the barrier; lights flash; brakes applied |
| Agriculture | Irrigation of a field | Moisture, temperature | Pump or valve switched on and off |
| Weather | Automatic weather station | Temperature, humidity, pressure, rainfall, wind speed | Readings stored and transmitted at set intervals; a warning is sent when a value is exceeded |
| Gaming | Motion-controlled game | Accelerometer, gyroscope, infrared camera | Character moves on screen; controller vibrates (motor) |
| Lighting | Street or security lights | Light, infrared motion | Relay switches the lamps on or off |
| Science | Laboratory experiment | pH, temperature, light | Readings logged at fixed intervals; heater or stirrer controlled |

:::keyfact{title="ZIMSEC and Cambridge"}
This lesson follows Cambridge 0478 topic 6.1. ZIMSEC covers similar control systems through its applications topics (agriculture, mining, ambient systems) and through robotics.
:::

## Advantages and disadvantages

**Advantages** (choose the ones that fit the scenario):

- Faster reactions than a person, so the process stays within safe limits.
- Works 24 hours a day without breaks, tiredness or loss of concentration.
- More accurate and consistent: the same action every time.
- Safer: people do not have to work in dangerous places, such as near hot furnaces or busy railway lines.
- Can reduce running costs, such as wages, wasted water or electricity.

**Disadvantages:**

- Expensive to buy, install and maintain.
- A sensor or software fault can cause wrong actions, so systems need regular checks.
- Fewer jobs for unskilled workers; staff need training to maintain the system.
- Can be vulnerable to hacking if connected to a network.
- Cannot handle situations it was not programmed for; a power cut may stop it unless there is a backup supply.

:::example
**Describing an automated irrigation system.** A question asks: "Describe how sensors, a microprocessor and actuators control the watering of Tendai's maize field near Kadoma." A full answer:

1. Moisture sensors in the soil take readings continuously.
2. The analogue readings are converted to digital by an ADC and sent to the microprocessor.
3. The microprocessor compares each reading with a stored minimum moisture value.
4. If the reading is below the stored value, the microprocessor sends a signal to an actuator that opens the valve / switches on the pump, and the field is watered.
5. If the reading is at or above the stored value, the microprocessor sends a signal to close the valve (or keeps it closed).
6. The cycle repeats, so watering stops as soon as the soil is moist enough.
:::

:::example
**Advantages and disadvantages for a given scenario.** Should a bottling plant in Harare automate its filling line?

1. **Advantages in this scenario:** every bottle is filled to the same level (consistency); the line runs on all three shifts without breaks; fewer bottles are wasted, reducing costs; workers are not exposed to the repetitive strain of capping thousands of bottles.
2. **Disadvantages in this scenario:** high cost of the machines and installation; maintenance engineers must be trained or hired; some line workers may lose their jobs; a faulty level sensor could under-fill thousands of bottles before anyone notices.
3. A balanced conclusion links back to the scenario: for a high-volume plant, the savings and consistency usually outweigh the cost.
:::

## Common mistakes

:::mistake{title="Saying the sensor decides"}
Sensors only measure. The **microprocessor** compares the reading and decides; the **actuator** acts.
:::

:::mistake{title="Forgetting the stored values"}
"The microprocessor checks the temperature" earns less than "the microprocessor **compares** the reading with the **stored** minimum and maximum values".
:::

:::mistake{title="Leaving out the loop"}
Always finish with "the process repeats continuously". Control is a cycle, not a single check.
:::

## Exam tips

:::exam-tip
For "**describe** how the system works", name the sensor type, the comparison with stored values, the actuator and the action, then say that it repeats. Each of these is usually a marking point.
:::

:::exam-tip
For advantages and disadvantages, refer to the **given scenario**: "the barrier is lowered faster than a person could react, so the crossing is safer" beats "automated systems are fast".
:::

## Summary

:::summary
- An automated system controls a process with little or no human input.
- Sensors measure; an ADC converts analogue readings; the microprocessor compares them with stored values; actuators act; the cycle repeats.
- Scenarios include industry, transport, agriculture, weather, gaming, lighting and science.
- Advantages: fast, continuous, accurate, safe, cheaper to run. Disadvantages: costly to set up and maintain, fault-prone sensors, job losses, hacking, inflexible.
:::
