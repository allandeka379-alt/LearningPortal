---
{
  "key": "network.addressing",
  "title": "MAC addresses and IP addresses",
  "summary": "The MAC address: assigned at manufacture, made of a manufacturer code and a serial number, written in hexadecimal, and used to identify a device on a network; the IP address: allocated by the network, static or dynamic; and IPv4 and IPv6 compared.",
  "concepts": ["comp.network.addressing"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

When a parcel is sent from Harare to a learner at a boarding school in Nyanga, it needs two kinds of information: the address of the school, so the courier knows which town and road to go to, and the learner's name, so the school knows exactly who should receive it. Data on a network works in a similar way. Every device has a **MAC address**, fixed in its hardware, and an **IP address**, given to it by the network it joins.

Cambridge 0478 (topic 3.4) asks you to explain the purpose and structure of a MAC address, the purpose of an IP address, and to compare static with dynamic addresses and IPv4 with IPv6. ZIMSEC meets the same ideas when designing and configuring a network in Form 4. Expect "state", "describe" and "explain the difference" questions, sometimes with a hexadecimal or binary conversion.

## Key definitions

:::definition{term="MAC address"}
Media access control address: a unique identifier given to a device's network interface card when it is manufactured, used to identify the device on a network.
:::

:::definition{term="IP address"}
Internet protocol address: an address allocated to a device by the network it connects to, used to identify the device and to route data to it across networks such as the internet.
:::

:::definition{term="Static IP address"}
An IP address that is permanently assigned to a device and does not change each time it connects.
:::

:::definition{term="Dynamic IP address"}
An IP address that is assigned by the network (for example by a router using DHCP) each time a device connects, and may be different on each connection.
:::

## The MAC address

A MAC address is **48 bits** long. It is usually written as **12 hexadecimal digits** in six pairs, separated by colons or hyphens, for example:

```
00:1B:44:3A:9C:E7
```

It has two parts:

| Part | Digits | Meaning |
|:--|:--|:--|
| Manufacturer code | First 6 hex digits (`00:1B:44`) | Identifies the company that made the NIC |
| Serial number | Last 6 hex digits (`3A:9C:E7`) | Identifies this particular card, unique for that manufacturer |

Because no two cards share both parts, every MAC address is unique. It is set when the NIC is manufactured and normally does not change. A switch uses MAC addresses to deliver data to the correct device inside a LAN.

:::worked-solution[Converting one pair of a MAC address]
Convert the second pair of the MAC address above, `1B`, into binary and denary.

1. Each hexadecimal digit is four bits: `1` = `0001`, `B` (11) = `1011`.
2. Together: `0001 1011`.
3. Denary: place each bit under its value.

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 1 | 1 | 0 | 1 | 1 |

4. 16 + 8 + 2 + 1 = 27.
5. Six pairs of 8 bits each give 6 × 8 = 48 bits, which is why a MAC address is 12 hex digits long.
:::

## The IP address

An IP address is allocated by the **network** (not by the manufacturer), so a laptop gets one address at school and a different one at home. Routers use IP addresses to send data to the right network and device anywhere on the internet.

### IPv4

- **32 bits**, written as four denary numbers from 0 to 255, separated by full stops: `192.168.10.25`.
- Each number represents 8 bits, so it cannot be more than 255.
- 32 bits give $2^{32}$ = 4 294 967 296 possible addresses (about 4.3 billion). This is not enough for every device in the world, which is the main reason IPv6 was introduced.

:::worked-solution[Writing an IPv4 address in binary]
Show the first number of `192.168.10.25` in binary, and then the whole address.

1. 192 = 128 + 64, so the first 8 bits are:

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |

2. 168 = 128 + 32 + 8 gives `10101000`; 10 = 8 + 2 gives `00001010`; 25 = 16 + 8 + 1 gives `00011001`.
3. The whole address is `11000000.10101000.00001010.00011001`: 4 × 8 = 32 bits.
:::

### IPv6

- **128 bits**, written as **eight groups of four hexadecimal digits**, separated by colons: `2001:0DB8:0000:0000:0000:0A0B:0000:0042`.
- To shorten it, leading zeros in a group may be left out, and one run of consecutive all-zero groups may be replaced by `::` (only once in an address): `2001:DB8::A0B:0:42`.
- It provides vastly more addresses than IPv4, enough for every device for the foreseeable future.

| Feature | IPv4 | IPv6 |
|:--|:--|:--|
| Length | 32 bits | 128 bits |
| Written as | 4 denary numbers (0-255) separated by `.` | 8 groups of 4 hex digits separated by `:` |
| Number of addresses | About 4.3 billion | Vastly more |
| Example | `192.168.10.25` | `2001:DB8::A0B:0:42` |

### Static and dynamic addresses

- A **dynamic** address is given out automatically by the network (usually by the router) each time a device connects. Addresses can be reused when devices leave, so fewer addresses are needed and no one has to set them up by hand. Most phones and laptops use dynamic addresses.
- A **static** address never changes. It suits devices that others must always find at the same address, such as a web server, a school's file server or a network printer. Static addresses must be set up and managed carefully so that two devices are not given the same one.

:::example
**MAC or IP?** Chipo takes her laptop from home to school.

- Its **MAC address** stays the same in both places, because it is fixed in the NIC.
- Its **IP address** changes: at home the home router gives it one dynamic address; at school the school router gives it another.
- The school's web server, which hosts the learning portal, keeps a **static** IP address so that learners' browsers can always find it.
:::

## Common mistakes

:::mistake{title="Saying the IP address is set by the manufacturer"}
The **MAC** address is set at manufacture. The IP address is allocated by the network the device joins.
:::

:::mistake{title="Writing an IPv4 number above 255"}
Each part of an IPv4 address is 8 bits, so `192.168.300.1` is not a valid address: 300 needs 9 bits.
:::

:::mistake{title="Using :: twice in an IPv6 address"}
`::` may replace only one run of zero groups; with two, nobody could tell how many zeros each one stands for.
:::

## Exam tips

:::exam-tip
"Describe the structure of a MAC address" earns marks for: 48 bits / 12 hex digits in six pairs, the first half is the manufacturer code, the second half is the serial number.
:::

:::exam-tip
For "compare IPv4 and IPv6", give matching facts for both: 32 bits and 128 bits; denary separated by full stops and hexadecimal separated by colons; fewer and far more addresses.
:::

## Summary

:::summary
- A MAC address is 48 bits (12 hex digits): manufacturer code then serial number, set at manufacture and unique.
- An IP address is allocated by the network and is used to route data to a device across networks.
- IPv4: 32 bits, four denary numbers 0-255 with full stops, about 4.3 billion addresses.
- IPv6: 128 bits, eight groups of four hex digits with colons, vastly more addresses.
- Static addresses never change (servers, printers); dynamic addresses are assigned each time a device connects.
:::
