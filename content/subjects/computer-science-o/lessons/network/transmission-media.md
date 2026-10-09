---
{
  "key": "network.transmission-media",
  "title": "Transmission media: cables and wireless",
  "summary": "Twisted pair, coaxial and fibre-optic cables and wireless media; how to compare them on cost, bandwidth, noise immunity, distance, size and scalability; and how to choose a suitable medium for a situation.",
  "concepts": ["comp.network.transmission-media"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Every network needs something to carry its signals from one device to another. In a Harare office the computers may be joined by blue cables running along the walls; between towns, telecommunication companies lay thin glass fibres underground; on a farm near Chinhoyi the farmhouse may reach the internet by a radio link to a tower several kilometres away. The cable or wireless link that carries the signal is the **transmission medium** (plural: media).

ZIMSEC Form 2 asks you to explain the characteristics of twisted pair, coaxial, fibre-optic and wireless media, comparing their cost, noise immunity, size and scalability. Paper 2 questions often describe a situation and ask you to choose a medium and justify the choice.

## Key definitions

:::definition{term="Transmission medium"}
The physical path, such as a cable, or the wireless signal, that carries data from one device to another in a network.
:::

:::definition{term="Bandwidth"}
The amount of data a medium can carry per second, measured in bits per second (bit/s), for example megabits per second (Mbit/s).
:::

:::definition{term="Noise (interference)"}
Unwanted electrical or electromagnetic signals, for example from motors, power cables or fluorescent lights, that can corrupt data travelling along a medium.
:::

:::definition{term="Attenuation"}
The gradual weakening of a signal as it travels along a medium; it limits how far data can be sent before the signal must be boosted.
:::

## Guided (cable) media

### Twisted pair cable

Pairs of insulated copper wires are twisted round each other inside a plastic sheath. The twisting reduces interference between the pairs and from outside. **Unshielded** twisted pair (UTP) is the ordinary network cable used in most LANs; **shielded** twisted pair (STP) has a foil or braided screen for noisy places such as factories.

- Cheap, thin, flexible and easy to install and extend.
- Lowest noise immunity of the cables; suitable for short runs (about 100 m) inside buildings.

### Coaxial cable

A single copper core is surrounded by insulation, a braided metal shield and an outer sheath. The shield gives it better noise immunity than unshielded twisted pair. It is familiar as the cable between a satellite dish and a decoder, and was used in older bus networks.

- Better noise immunity and longer distances than twisted pair.
- Thicker, stiffer and more expensive than twisted pair; harder to bend round corners.

### Fibre-optic cable

Thin strands of glass or plastic carry data as **pulses of light**. Light is reflected along the fibre, so the signal travels long distances with little attenuation.

- Very high bandwidth and very long distances, which is why fibre carries the internet between towns and countries.
- Immune to electrical interference, because light is not affected by electromagnetic noise; also hard to tap, so more secure.
- The most expensive to buy and install; fibres are fragile, and joining them needs special equipment and skills.

## Unguided (wireless) media

Wireless media send data through the air using **radio waves**, **microwaves** or **infra-red**. Examples are Wi-Fi inside a building, microwave links between towers on hilltops, and satellite links.

- No cables to lay, so it suits places where cabling is difficult or users move about.
- Scalable: new users join without new cables.
- Affected by walls, distance, weather and interference from other devices; lower security, because anyone in range can receive the signal, so data must be encrypted.

## Comparing the media

| Feature | Twisted pair | Coaxial | Fibre-optic | Wireless |
|:--|:--|:--|:--|:--|
| Cost | Lowest | Medium | Highest | No cabling; equipment varies |
| Bandwidth | Medium | Medium | Highest | Lower, shared between users |
| Noise immunity | Lowest (better if shielded) | Good | Immune to electrical noise | Affected by interference and obstacles |
| Distance | Short (about 100 m) | Medium | Very long | Depends on technology |
| Size and handling | Thin, flexible | Thicker, stiff | Very thin but fragile | No cables |
| Scalability | Easy within a building | Harder | Needs skilled joining | Easiest |

:::worked-solution[How bandwidth affects transfer time]
A video clip of 800 megabits is sent across a link. How long does it take on a 100 Mbit/s twisted pair link and on a 1000 Mbit/s fibre link?

1. Time = amount of data ÷ bandwidth.
2. Twisted pair: 800 ÷ 100 = 8 seconds.
3. Fibre: 800 ÷ 1000 = 0.8 seconds.
4. The fibre link is ten times faster because its bandwidth is ten times higher.
:::

:::example
**Choosing a medium for a mine.** A mining company near Zvishavane needs to join two offices 3 km apart and also connect computers inside its workshop, where heavy electric motors run all day.

- **Between the offices**: fibre-optic cable. Twisted pair cannot carry data 3 km without the signal fading, while fibre carries light over long distances with little attenuation and at high bandwidth. (A microwave link between two towers would be a wireless alternative if trenching is too costly.)
- **In the workshop**: fibre-optic or shielded twisted pair. The motors create electrical noise that would corrupt data on unshielded copper; fibre is immune to it, and shielded twisted pair is a cheaper compromise.
- **In the offices**: unshielded twisted pair to each desk is cheap, flexible and fast enough over short distances, with Wi-Fi for visitors' laptops and phones.
:::

## Common mistakes

:::mistake{title="Saying fibre-optic cable carries electricity"}
Fibre carries **light** pulses, not electrical signals. That is exactly why it is immune to electrical interference.
:::

:::mistake{title="Calling wireless always the best choice"}
Wireless saves cabling, but it is slower when shared, affected by walls and interference, and less secure. A fixed desktop that stays in one place is usually better on a cable.
:::

:::mistake{title="Vague comparisons"}
"Fibre is better" earns nothing. Name the feature: "fibre has a higher bandwidth", "fibre can carry data further without the signal weakening", "fibre is not affected by electrical interference".
:::

## Exam tips

:::exam-tip
When asked to justify a medium, link one feature of the medium to one fact in the scenario: distance ("3 km apart"), noise ("next to heavy machinery"), cost ("small budget") or mobility ("staff move between rooms").
:::

:::exam-tip
Learn one advantage and one disadvantage of each medium. A comparison question needs both sides: say what one medium does better **and** what the other does better.
:::

## Summary

:::summary
- A transmission medium is the cable or wireless signal that carries data between devices.
- Twisted pair: cheap, thin and flexible, but short range and least noise immunity.
- Coaxial: shielded copper with better noise immunity, but thicker and dearer than twisted pair.
- Fibre-optic: light pulses, highest bandwidth, longest distance, immune to electrical noise, but most expensive and fragile.
- Wireless: no cables and easy to expand, but shared bandwidth, interference and lower security.
:::
