---
{
  "key": "hardware.embedded-control",
  "title": "Embedded systems, monitoring and control",
  "summary": "What an embedded system is, how monitoring and control systems differ, the sensors and actuators they use, how analogue readings reach the microprocessor through an ADC, and how feedback keeps a process in range.",
  "concepts": ["acs.hardware.embedded-control"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A farmer near Kariba has a solar-powered borehole pump. When the tank on the hill is nearly empty the pump starts by itself, and when the tank is full it stops. Nobody sits at a keyboard. A small circuit with a microprocessor measures the water level, decides, and switches the pump. The same idea is inside a washing machine, a car's engine, a smart meter and a burglar alarm.

These are **embedded systems**: computers built into a device to do one job. This lesson explains what makes them different from a general-purpose computer, the difference between **monitoring** and **control**, how **sensors** and **actuators** link the computer to the physical world, and how **feedback** keeps a process under control. Setting individual bits in a control register is a separate lesson on bit manipulation.

You should already know that a processor works on digital data, that the real world is analogue, and what an input device and an output device are.

## Key definitions

:::definition{term="Embedded system"}
A computer system, usually a microprocessor with memory and input and output circuits, built into a larger device to carry out one dedicated function.
:::

:::definition{term="Sensor"}
An input device that measures a physical quantity, such as temperature or light, and produces an electrical signal.
:::

:::definition{term="Actuator"}
An output device that converts a signal from the processor into a physical action, such as a movement or heat.
:::

:::definition{term="Feedback"}
Using the result of an output (for example the new temperature) as an input so that the system can correct itself.
:::

## Embedded systems

An embedded system is not used for general tasks. Its program is fixed in ROM or flash, and the user does not install other software. Typical examples: the controller of a washing machine, the engine management unit of a car, a smart meter, a burglar alarm, the control panel of a microwave oven.

| Benefits | Drawbacks |
|---|---|
| Small, cheap to produce in large numbers | Hard or impossible for the user to upgrade or add functions |
| Reliable, because the program is simple and fixed | Limited processing power and memory |
| Low power use, so it runs on a small battery or a solar panel | Hard to repair; the whole unit is often replaced |
| Fast response to a single task | If the device is connected to a network, it may be hard to patch security faults |

## Monitoring and control

{{table}}

A **monitoring** system only observes. A **control** system uses what it measures to change something in the real world.

## Sensors and actuators

| Sensor | Measures | Example use |
|---|---|---|
| Temperature | Heat (for example with a thermistor) | Oven, incubator, greenhouse |
| Pressure | Force on an area | Tyre monitor, weighing mat |
| Infra-red | Heat radiation or an interrupted beam | Security alarm, automatic door |
| Sound | Noise level | Baby monitor, alarm that listens for glass breaking |
| Light | Brightness | Street lights, phone screen brightness |
| Moisture | Water content | Irrigation, tank overflow warning |

| Actuator | Does | Example use |
|---|---|---|
| Motor | Turns something | Pump, fan, door opener |
| Heater | Produces heat | Incubator, greenhouse |
| Valve | Opens or closes a flow | Irrigation, washing machine inlet |
| Buzzer | Makes a sound | Alarm, reminder |

## From sensor to microprocessor

Most sensors give an **analogue** voltage that varies smoothly. The microprocessor needs numbers, so an **analogue-to-digital converter (ADC)** measures the voltage and gives a binary reading. An ADC with *n* bits can output 2^n different readings spread over its voltage range. The voltage represented by one step is the range divided by 2^n.

:::worked-solution{title="Reading a temperature sensor"}
A temperature sensor gives 10 mV (0.01 V) for each degree Celsius, and 0 V at 0 °C. It is connected to an 8-bit ADC that covers 0 V to 2.56 V.

1. Number of readings = 2^8 = 256.
2. Voltage per step = 2.56 ÷ 256 = {{stepMv}} mV, which is exactly one degree per step.
3. At 31 °C the sensor gives 0.31 V, so the ADC reading is 0.31 ÷ 0.01 = {{reading31}}, which is 00011111 in binary.
4. The processor can use the reading directly as the temperature.
:::

A higher resolution gives smaller steps. A 10-bit ADC over 0 V to 5 V has 1024 readings and a step of about {{step10}} mV. If an actuator needs an analogue signal, a **digital-to-analogue converter (DAC)** goes the other way.

## The control loop and feedback

A control system repeats a simple cycle. The microprocessor **reads** the sensor through the ADC, **compares** the value with the stored limits, **decides**, and **signals** an actuator. The action changes the physical quantity, which the sensor measures on the next cycle. This is **feedback**, and a system that uses it is a **closed loop**.

To avoid the heater switching on and off every second when the temperature is right at the limit, the program uses two limits: switch on below the lower one and off above the upper one. Between them, nothing changes.

```
CONSTANT LowLimit ← 24
CONSTANT HighLimit ← 26
DECLARE HeaterOn : BOOLEAN
DECLARE Reading : INTEGER
HeaterOn ← FALSE
FOR Sample ← 1 TO 8
    Reading ← ReadSensor()   // ADC reading, equal to the temperature in °C
    IF Reading < LowLimit THEN
        HeaterOn ← TRUE
    ELSE
        IF Reading > HighLimit THEN
            HeaterOn ← FALSE
        ENDIF
    ENDIF
    CALL SetHeater(HeaterOn)
NEXT Sample
```

:::worked-solution{title="Trace the greenhouse controller"}
The eight readings are 22, 23, 25, 27, 28, 27, 25 and 23.

{{trace}}

1. The heater switches on at sample 1 (22 is below 24) and stays on while the reading is between the limits.
2. It switches off at sample 4 (27 is above 26) and stays off at sample 7 even though 25 is back in range, because the program only changes state outside the limits.
3. After sample 8 the heater is on again. The heater is ON after {{onCount}} of the 8 samples.
:::

:::example{title="Borehole pump"}
A float switch (a level sensor) in a tank is read by a microcontroller. If the level is below the lower mark, the controller starts the pump motor. When the level reaches the upper mark, it stops the motor. The pump raises the level, which the sensor then reads: feedback. If the same device only logged the level on a display, it would be a monitoring system.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This is Cambridge AS content (topic 3). ZIMSEC candidates meet sensors and control mostly in the enterprising and systems topics; the ADC, the closed loop and the monitoring and control distinction are Cambridge detail.
:::

## Common mistakes

:::mistake{title="Saying a monitoring system controls the process"}
A monitoring system only measures and reports or records. It has no actuator that changes the process.
:::

:::mistake{title="Mixing up sensor and actuator"}
A sensor is an input device (it senses). An actuator is an output device (it acts).
:::

:::mistake{title="Forgetting the ADC"}
The processor cannot read a voltage. State that the analogue signal is converted to a digital value before processing.
:::

:::mistake{title="Describing an embedded system as 'a small computer you can install programs on'"}
An embedded system has one dedicated function and a fixed program.
:::

## Exam tips

:::exam-tip
In a "**describe** how the system works" question, write the cycle in order: sensor, ADC, microprocessor compares with a stored value, signal to the actuator, action, new reading. Name the real sensor and actuator from the scenario.
:::

:::exam-tip
For "**state** one benefit and one drawback of an embedded system", write a pair that fits the scenario (low power and fixed function against hard to upgrade). Do not answer with the benefit only.
:::

:::exam-tip
Paper 1 may ask for the ADC step or the reading for a voltage. Use voltage ÷ step. State the number of readings, 2^n, first.
:::

## Summary

:::summary
- An embedded system is a computer built into a device with one dedicated, fixed function.
- A monitoring system measures and reports; a control system compares values with limits and drives actuators.
- Sensors (temperature, pressure, infra-red, sound, light, moisture) are inputs; actuators (motors, heaters, valves, buzzers) are outputs.
- An ADC converts the analogue sensor signal to a binary reading; its step is the voltage range ÷ 2^n.
- Feedback means the effect of the action is measured on the next cycle, forming a closed loop.
- Two limits (hysteresis) stop the actuator switching on and off continuously.
:::
