---
{
  "key": "transmission.methods",
  "title": "Serial, parallel, simplex, half-duplex and full-duplex transmission",
  "summary": "How data moves from one device to another: serial and parallel transmission, the simplex, half-duplex and full-duplex modes, the advantages and disadvantages of each, and how to choose the best method for a scenario.",
  "concepts": ["comp.transmission.methods"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

A radio station in Gweru broadcasts music to thousands of listeners, none of whom can talk back through their radios. Two security guards at a mine near Hwange take turns speaking on their two-way radios, saying "over" when they finish. Tendai and his grandmother talk on a phone call, both able to speak and hear at the same moment. These are three different **transmission modes**.

Data can also be sent one bit at a time along a single wire, or several bits at once along several wires. These are **serial** and **parallel** transmission. Every data transmission is described by both ideas: for example, a USB cable sends data serially, and a phone call is full-duplex.

Examiners regularly give a scenario and ask you to choose and justify the most suitable method, so you need the reasons as well as the definitions.

## Key definitions

:::definition{term="Serial transmission"}
Data is sent one bit at a time, one after another, along a single wire or channel.
:::

:::definition{term="Parallel transmission"}
Several bits (for example 8 bits, one byte) are sent at the same time, each along its own wire.
:::

:::definition{term="Simplex"}
Data travels in one direction only.
:::

:::definition{term="Half-duplex"}
Data can travel in both directions, but only in one direction at a time.
:::

:::definition{term="Full-duplex"}
Data can travel in both directions at the same time.
:::

:::definition{term="Skew"}
The bits of one parallel transmission arriving at slightly different times because the wires differ slightly; the bits can then get out of step.
:::

## Serial and parallel transmission

In **serial** transmission a byte such as 01001011 is sent as eight bits one after another on one wire. In **parallel** transmission the same byte is sent on eight wires at once, one bit per wire.

| | Serial | Parallel |
|:--|:--|:--|
| Wires for the data | One (per direction) | Several (for example 8 or more) |
| Speed over a short distance | Slower: one bit at a time | Faster: several bits at once |
| Reliable distance | Long distances | Short distances only (bits become skewed) |
| Interference between wires | Little, because there are few wires | Signals on neighbouring wires can interfere (crosstalk) |
| Cost of cable | Cheaper: fewer wires | More expensive: more wires and larger connectors |
| Typical uses | USB connections, network cables, long-distance links | Inside the computer, for example the internal buses between the processor and memory, and over very short distances |

Over a long cable, small differences in the wires mean parallel bits **arrive at slightly different times** (skew), so the receiver may combine bits from different bytes. This is why long links are serial, and why modern serial links can be made very fast.

## Transmission modes: the direction of data

| Mode | Direction | Example |
|:--|:--|:--|
| Simplex | One direction only | A temperature sensor sending readings to a data logger; a radio or television broadcast |
| Half-duplex | Both directions, one at a time | Two-way radios (walkie-talkies), where users take turns |
| Full-duplex | Both directions at the same time | A phone call; a broadband internet connection that downloads and uploads at once |

Simplex is the simplest and cheapest but allows no reply, so the receiver cannot ask for lost data to be sent again. Half-duplex allows replies but data must wait while the other direction is in use. Full-duplex is the fastest for two-way communication but needs two channels (or a channel that can carry both directions at once), so it is more complex.

## Worked examples

:::example
**Choosing between serial and parallel.** A school in Masvingo connects a computer in the office to a printer in the staff room 40 metres away.

- Parallel transmission would need many wires over 40 m, and the bits would become skewed, so data could be corrupted.
- **Serial** transmission is the better choice: it is reliable over a long distance, has less interference between wires and needs cheaper cable.
:::

:::example
**Choosing a transmission mode.** A borehole controller on a farm near Kariba sends the water level to the farm office, and the office can send back an instruction to switch the pump on or off. Readings are sent every minute and instructions are rare.

- Simplex is unsuitable: the office must be able to send instructions back.
- **Half-duplex** is suitable: data must travel both ways, but never needs to travel both ways at the same instant, so taking turns is acceptable and simpler than full-duplex.
- If the office also needed live video while sending commands, **full-duplex** would be better.
:::

:::example
**Describing a transmission fully.** A video call between Harare and Bulawayo uses **serial**, **full-duplex** transmission: the data travels over long-distance network links one bit after another, and both people send and receive sound and video at the same time.
:::

## Combining the two ideas

Serial/parallel describes **how many bits travel at once**; simplex/half-duplex/full-duplex describes **which direction** they travel. One connection is always one of each, for example "serial simplex" (a sensor sending readings to a computer along a cable) or "parallel half-duplex" (an internal data bus that carries data to or from the processor, one direction at a time).

:::keyfact{title="ZIMSEC and Cambridge"}
The ZIMSEC syllabus names the simplex, half-duplex and full-duplex modes. Cambridge 0478 adds serial and parallel transmission and asks you to explain which method suits a given scenario, with advantages and disadvantages.
:::

## Common mistakes

:::mistake{title="Saying parallel is always faster"}
Parallel is faster only over short distances. Over long distances, skew and interference make it unreliable, and fast serial links are used instead.
:::

:::mistake{title="Confusing half-duplex with simplex"}
Half-duplex carries data **both ways**, just not at the same time. Simplex never carries data back.
:::

:::mistake{title="Giving only a definition when asked to justify"}
"Explain why serial is suitable" needs a reason linked to the scenario, such as "the cable is long, so parallel bits would arrive out of step".
:::

## Exam tips

:::exam-tip
For "**describe** serial transmission", give two points: one bit at a time, along a single wire. For parallel: several bits at once, each on its own wire.
:::

:::exam-tip
In scenario questions, name the method **and** give a reason tied to the scenario (distance, need for replies, need to send both ways at once, cost of cabling).
:::

:::exam-tip
When asked for an **example** of a mode, choose a clear one: broadcast radio (simplex), walkie-talkie (half-duplex), phone call (full-duplex).
:::

## Summary

:::summary
- Serial sends one bit at a time on one wire; parallel sends several bits at once on several wires.
- Parallel is fast over short distances but suffers skew and interference over long ones; serial is cheaper and reliable over long distances.
- Simplex: one direction only. Half-duplex: both directions, one at a time. Full-duplex: both directions at once.
- A connection is described by both ideas, for example serial full-duplex for a video call.
- Choose a method by its distance, direction and cost needs, and justify it from the scenario.
:::
