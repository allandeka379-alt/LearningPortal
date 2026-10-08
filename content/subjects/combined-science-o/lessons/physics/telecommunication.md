---
{
  "key": "physics.telecommunication",
  "title": "Telecommunication: cell phones, email and transmission media",
  "summary": "How a message travels over a distance by cell phone and by email: transmitters and receivers, encoding and decoding, the energy conversions in a phone call, how cell phone networks pass calls between base stations, and the media that carry signals (twisted-pair cable, coaxial cable, optical fibre and Wi-Fi radio links) with their advantages and disadvantages.",
  "concepts": ["cs.physics.telecommunication"],
  "objectives": [
    "zimsec/o-level/combined-science:7.3.4.6.1",
    "zimsec/o-level/combined-science:7.3.4.6.2",
    "zimsec/o-level/combined-science:7.3.4.6.3"
  ],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A learner in Chinhoyi sends a voice note to her brother working in Johannesburg, and he hears it seconds later. A school in Lupane emails its examination entries to the district office. Neither message is carried by a person: each is turned into a **signal** that travels through cables, glass fibres and the air at enormous speed.

**Telecommunication** means communicating over a distance using electrical signals, light or radio waves. In this lesson you will learn how a cell phone call and an email reach the other person, what happens to the energy on the way, and which media carry the signals.

## Key definitions

:::definition{term="Signal"}
A changing electric current, pulse of light or radio wave that carries information from one place to another.
:::

:::definition{term="Transmitter"}
A device that changes information into a signal and sends it out, for example the circuit and aerial that send radio waves from a phone.
:::

:::definition{term="Receiver"}
A device that picks up a signal and changes it back into a form that people can use, for example sound or text.
:::

:::definition{term="Encoding and decoding"}
Encoding is changing a message into a code that can be sent, such as a pattern of 0s and 1s (a **digital** signal). Decoding is changing the code back into the original message at the receiving end.
:::

:::definition{term="Transmission medium"}
The material or path that carries a signal, such as a copper cable, an optical fibre or the air (for radio waves).
:::

## Every communication system has the same parts

| Stage | What happens | In a phone call |
| --- | --- | --- |
| Source | The message starts | The caller speaks |
| Transmitter (with encoder) | The message is changed into a signal and sent | Microphone, phone circuits and aerial |
| Medium (channel) | The signal travels | Air (radio waves), cables, optical fibres |
| Receiver (with decoder) | The signal is picked up and changed back | Aerial and circuits of the other phone, then the loudspeaker |
| Destination | The message is used | The listener hears the voice |

## How a cell phone call works

1. **Speaking.** Your voice makes the air vibrate. The **microphone** changes these sound waves into a varying electric current.
2. **Encoding.** The phone's circuits change this electrical signal into a **digital code** (a stream of 0s and 1s), compress it and add information such as which phone sent it.
3. **Transmitting.** The phone's **aerial** (antenna) sends the coded signal out as **radio waves** (microwaves), which travel at the speed of light, about $300\,000\ \text{km}$ per second.
4. **The base station.** The radio waves are picked up by the nearest **base station**, the mast with aerials that you see on hills and buildings. Each base station serves an area called a **cell**; that is why the phones are called cell phones.
5. **The network.** The base station passes the signal to the network's **switching centre**, which finds where the other phone is and routes the call there through cables, optical fibres or microwave links between masts.
6. **Receiving and decoding.** A base station near the other phone sends the signal to it by radio. Its aerial picks up the waves, and its circuits **decode** the digital signal back into a varying current.
7. **Hearing.** The **loudspeaker** (earpiece) changes the current into vibrations, which make sound waves that the listener hears.

A phone is a transmitter and a receiver at the same time, so both people can talk and listen together. When you travel, for example on a bus from Harare to Mutare, your phone moves from one cell to the next, and the network **hands the call over** from one base station to the next without cutting it.

:::keyfact{title="Energy conversions in a phone call"}
- Battery: chemical energy → electrical energy (powers the phone).
- Microphone: sound energy → electrical energy.
- Aerial of the sending phone: electrical energy → electromagnetic (radio wave) energy.
- Aerial of the receiving phone: electromagnetic energy → electrical energy.
- Loudspeaker: electrical energy → sound (kinetic energy of vibrations).
- Screen: electrical energy → light.

Some energy is also wasted as heat at every stage, which is why a phone warms up during a long call.
:::

### Why digital signals?

A digital signal has only two values, 0 and 1. As it travels it becomes weaker and picks up unwanted disturbances (**noise**). Because the receiver only has to decide "0 or 1?", the original code can be recovered and re-sent cleanly by repeaters and base stations. This is why digital calls stay clear over long distances.

## How email works

1. **Writing and sending.** You type a message on a phone or computer, add the receiver's **email address** (for example `name@school.ac.zw`) and press *send*. The device **encodes** the text, and any attached files, as digital data.
2. **Through the internet.** The data travel from your device through a router or the mobile network, then through cables, optical fibres and radio links of the **internet** to your email provider's **mail server**, a computer that handles email.
3. **Delivery to the inbox.** Your provider's server sends the message to the receiver's mail server, which stores it in the receiver's **inbox**.
4. **Reading.** When the receiver opens their email, their device downloads the message from the server and **decodes** it into text and pictures on the screen.

Because the message waits on the server, the receiver does not have to be online when it is sent, unlike a phone call. The same message can be sent to many people at once, and documents and pictures can be attached. Email needs an internet connection, a device and an email account, and messages can be lost to spam filters or wrong addresses.

## Transmission media

| Medium | What it is | How the signal travels | Advantages | Disadvantages |
| --- | --- | --- | --- | --- |
| **Twisted-pair cable** | Pairs of insulated copper wires twisted together inside a plastic sheath | As electrical signals along the copper | Cheap, flexible, easy to install; twisting reduces interference from nearby cables | Carries less information; signals weaken over long distances; affected by electrical interference |
| **Coaxial cable** | A central copper wire, an insulating layer, a woven copper or aluminium **screen**, and an outer plastic sheath | As electrical signals along the central wire; the screen keeps out interference | Carries more information than twisted pair; well shielded | Thicker, stiffer and dearer than twisted pair |
| **Optical fibre** | A very thin strand of glass (core) covered by glass of a different kind (cladding) and a protective coat | As pulses of **light**, kept inside the core by **total internal reflection** | Carries huge amounts of information; very little signal loss over long distances; no electrical interference; hard to tap; thin and light | Expensive; fragile; joining fibres needs special equipment and skill |
| **Wi-Fi (radio waves)** | No cable: a wireless router sends and receives radio waves (microwaves) through the air | As electromagnetic waves through air | No cables; devices can move about; easy to connect many devices | Short range (tens of metres); walls weaken the signal; interference; must be protected with a password |

Twisted-pair cables are used for landline telephones and computer network cables, and coaxial cables connect satellite dishes and TV aerials to decoders. Optical fibres carry most long-distance internet traffic, for example the fibre links between Zimbabwe's towns and to undersea cables off the coasts of Mozambique and South Africa. Wi-Fi connects phones and laptops in homes, schools and shops to the internet.

:::worked-solution[Example: choosing a medium]
A mining company must link its offices in Zvishavane to its head office 300 km away. Large amounts of data are sent all day, and the cable will run beside power lines.

1. Twisted pair: signals weaken over such a distance and power lines cause interference. Not suitable.
2. Wi-Fi: its range is only tens of metres. Not suitable.
3. Optical fibre: carries huge amounts of data over long distances with little loss, and light signals are not affected by electrical interference from the power lines.
4. Choice: optical fibre, despite its higher cost.
:::

## Common mistakes

:::mistake{title="Saying sound travels to the other phone"}
Sound only travels from your mouth to the microphone. From there the message travels as electrical signals, radio waves and light pulses, and it becomes sound again only at the other phone's loudspeaker.
:::

:::mistake{title="Saying light leaks out of an optical fibre at the bends"}
The light is kept in the core by total internal reflection, even when the fibre bends gently. Only very sharp bends let light escape.
:::

:::mistake{title="Mixing up transmitter and receiver"}
The transmitter sends: it changes the message into a signal. The receiver picks up the signal and changes it back. A phone contains both.
:::

## Exam tips

:::exam-tip
When asked to describe a phone call, go in order: microphone (sound → electrical), encoding, aerial sends radio waves, base station and network, receiving aerial, decoding, loudspeaker (electrical → sound).
:::

:::exam-tip
For a comparison of media, name the medium, state what carries the signal (electricity, light or radio waves) and give one advantage and one disadvantage linked to the situation in the question.
:::

## Summary

:::summary
- A communication system has a source, a transmitter (encoder), a medium, a receiver (decoder) and a destination.
- Cell phone call: microphone → encode to digital → aerial sends radio waves → base station and network → receiving aerial → decode → loudspeaker. Each base station serves a cell; calls are handed over as you move.
- Energy conversions: chemical → electrical (battery); sound → electrical (microphone); electrical → radio waves (aerial); radio waves → electrical; electrical → sound (loudspeaker).
- Email: text encoded as digital data, sent through the internet to mail servers, stored in the inbox until the receiver downloads and decodes it.
- Media: twisted pair (cheap, short distances), coaxial (screened, more information), optical fibre (light by total internal reflection; huge capacity, no electrical interference, costly), Wi-Fi (radio, no cables, short range).
:::
