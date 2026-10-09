---
{
  "key": "emerging.robotics",
  "title": "Robotics",
  "summary": "What robotics is; the characteristics of a robot (mechanical structure, sensors, microprocessors and actuators, programmable); robots in industry, transport, agriculture, medicine, the home and entertainment, and the advantages and disadvantages of their use.",
  "concepts": ["comp.emerging.robotics"],
  "estimatedMinutes": 35,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

In a vehicle assembly plant, a row of robot arms welds car bodies with sparks flying, hour after hour, never missing a seam. On a farm, a small drone flies along rows of crops, photographing each plant. In a hospital, a surgeon sits at a console and guides tiny robotic instruments through a cut smaller than a fingernail. In a house in Harare, a disc-shaped vacuum cleaner finds its own way around the furniture. All of these are robots, and designing, building and programming them is the work of **robotics**.

Robotics is examined by both boards: Cambridge 0478 topic 6.2 and ZIMSEC topic 6.2 (Application of Computer Science, Form 2). Expect to define robotics, describe the characteristics of a robot, decide whether a device is a robot, and discuss the advantages and disadvantages of using robots in a given setting.

## Key definitions

:::definition{term="Robotics"}
The branch of computer science (together with engineering) that deals with the design, construction and operation of robots.
:::

:::definition{term="Robot"}
A programmable machine with a mechanical structure, sensors, a microprocessor and actuators, which can carry out a series of actions automatically, sometimes on its own and sometimes guided by a person.
:::

:::definition{term="Drone"}
An unmanned aircraft that is controlled remotely or flies on its own using its programming, sensors and GPS.
:::

:::definition{term="End effector"}
The tool at the end of a robot arm that does the work, such as a gripper, a welding torch, a spray gun or a drill.
:::

## Characteristics of a robot

A device counts as a robot when it has all three characteristics:

1. **A mechanical structure or framework.** The physical body: arms, joints, wheels, legs, propellers, grippers. The shape is designed for the task; a welding arm and a delivery drone look very different.
2. **Electrical components.** **Sensors** gather information about the surroundings (cameras, proximity, touch, light, infrared, pressure, GPS). A **microprocessor** processes the sensor data and decides what to do. **Actuators** (electric motors, pneumatic or hydraulic cylinders) move the mechanical parts.
3. **Programmability.** A robot is controlled by a program and can be **reprogrammed** to carry out different tasks. Industrial arms can be programmed by writing code, by a person moving the arm through the actions so the robot records and repeats them, or with a hand-held control pad.

Some robots are **independent** (autonomous): they make decisions from sensor data with no person controlling them. Others are **dependent**: a person controls or guides them, as in robotic surgery or a remotely flown drone.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards ask for the meaning of robotics and the uses of robots. Cambridge names the three characteristics (mechanical structure, electrical components, programmable) and the areas listed below; ZIMSEC places robotics with the other applications of computers (Form 2), so link examples to Zimbabwean settings such as mining, manufacturing and agriculture.
:::

## Where robots are used

| Area | Examples | What the robot does |
|:--|:--|:--|
| Industry | Welding, spray painting, assembling, packing, warehouse robots | Repetitive, precise or dangerous work on production lines; moving stock around warehouses |
| Transport | Driverless cars and trains, automated forklifts, delivery drones | Moving people or goods using sensors, cameras and GPS |
| Agriculture | Harvesting robots, weeding robots, crop-spraying drones, milking robots | Picking, weeding, spraying only where needed, milking on demand |
| Medicine | Surgical robots, pharmacy dispensing robots, rehabilitation robots | Precise, steady movements; counting and packing medicines |
| Domestic | Robot vacuum cleaners, lawn mowers, pool cleaners | Household chores carried out automatically |
| Entertainment | Robotic toys, animatronic characters in theme parks, camera robots filming sport | Movement and interaction for fun, film and broadcasting |
| Hazardous places | Bomb disposal, mine inspection, deep-sea and space exploration | Work where people would be in danger |

## Advantages and disadvantages

**Advantages of using robots**

- They can work in dangerous or unpleasant conditions (heat, fumes, underground, radiation), keeping people safe.
- They can work 24 hours a day without breaks, so productivity rises.
- They are consistent and accurate: every weld or every dose is the same, so quality improves and waste falls.
- They do not get bored or tired with repetitive work.
- Over time, running costs can be lower than paying many workers.

**Disadvantages of using robots**

- High initial cost to buy, install and program them, and continuing maintenance costs.
- They can replace workers, causing unemployment, especially for unskilled jobs.
- They only do what they are programmed to do and cannot cope well with unexpected situations.
- Faults or programming errors can cause damage or injury, and production stops while a robot is repaired.
- Staff need new skills to program, operate and maintain them.

:::example
**Is it a robot?** Nyasha is given four devices and asked which are robots: an automatic washing machine, a robot vacuum cleaner, a crop-spraying drone flown on its own along a programmed route, and a television remote control.

1. **Robot vacuum cleaner:** a mechanical body with wheels and brushes; bump, cliff and infrared sensors; a microprocessor that plans its route; motors as actuators; it can be programmed with schedules and areas. It is a robot.
2. **Crop-spraying drone:** frame and propellers; GPS, camera and height sensors; a microprocessor; motors and a spray pump; programmed route that can be changed. It is a robot.
3. **Washing machine:** it contains an embedded system with sensors and motors, but it does not move about or manipulate objects and runs fixed programmes, so it is usually treated as an automated appliance, not a robot.
4. **Remote control:** no mechanical structure that moves, no actuators. Not a robot.
:::

:::example
**Robots in a Zimbabwean setting.** A platinum mine on the Great Dyke is considering an inspection robot that drives into old tunnels to check for rock falls and gas.

1. **Characteristics:** a tracked, rugged body (mechanical structure); a camera, gas sensors, lidar or proximity sensors (sensors); a microprocessor that controls it and records data; electric motors driving the tracks (actuators); programmed to follow a route or be guided by an operator.
2. **Advantages for the mine:** inspectors are not sent into unsafe tunnels; the robot can work continuously and record accurate readings.
3. **Disadvantages for the mine:** expensive to buy and repair if damaged by a rock fall; trained staff are needed to operate it; it may not cope with an obstacle it was not designed for.
:::

## Common mistakes

:::mistake{title="Calling every automatic device a robot"}
A device is a robot only if it has a mechanical structure, electrical components (sensors, microprocessor, actuators) **and** is programmable. A thermostat or a remote control is not.
:::

:::mistake{title="Saying robots 'think for themselves'"}
Robots follow programs. Some use artificial intelligence to adapt, but they still act on their programming and their sensor data.
:::

:::mistake{title="One-sided answers"}
When asked to "discuss" robots, give **both** advantages and disadvantages, each linked to the setting in the question.
:::

## Exam tips

:::exam-tip
"**Describe** the characteristics of a robot" usually has three marks: mechanical structure or framework; electrical components (sensors, microprocessor, actuators); programmable. Give a short example of each from the device in the question.
:::

:::exam-tip
Advantages and disadvantages must be **specific to the scenario**: "the robot can weld in the toxic fumes of the paint shop" beats "robots are safer".
:::

## Summary

:::summary
- Robotics is the branch of computer science dealing with the design, construction and operation of robots.
- A robot has a mechanical structure, electrical components (sensors, microprocessor, actuators) and is programmable.
- Robots are used in industry, transport, agriculture, medicine, the home and entertainment, and in hazardous places.
- Advantages: safety, continuous work, accuracy and consistency, lower long-term costs. Disadvantages: high cost, job losses, inflexibility, faults, need for skilled staff.
:::
