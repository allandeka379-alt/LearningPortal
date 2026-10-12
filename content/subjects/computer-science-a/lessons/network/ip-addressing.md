---
{
  "key": "network.ip-addressing",
  "title": "IP addresses: IPv4, IPv6, subnets, public and private, static and dynamic",
  "summary": "The format of IPv4 and IPv6 addresses, why IPv6 was introduced, how a subnet mask splits an address into network and host portions, how to find the network address, broadcast address and number of hosts, public against private addresses with NAT, and static against dynamic addressing with DHCP.",
  "concepts": ["acs.network.ip-addressing"],
  "estimatedMinutes": 55,
  "level": "core",
  "freePreview": true
}
---
## Introduction

Every phone, laptop and printer that uses the internet needs an address so that data can be delivered to it, in the same way that a letter needs a postal address. On the internet that address is the **IP address**. The system was designed when the internet was small, and the number of addresses it provided has run short. This is why most school and home networks use a second system of private addresses, and why a newer, much larger format called IPv6 has been introduced.

This lesson covers the format of IPv4 and IPv6 addresses, subnetting, public and private addresses, and static and dynamic addresses. You should be comfortable converting between denary and binary, because subnet calculations are done in binary. DNS and URLs are in the next lesson.

## Key definitions

:::definition{term="IP address"}
A logical address given to a device on a network that uses the Internet Protocol, used to identify the device and to route packets to it.
:::

:::definition{term="Subnet mask"}
A 32-bit pattern, written like an IPv4 address, whose 1s mark the network portion of an address and whose 0s mark the host portion.
:::

:::definition{term="Subnet"}
A smaller network made by dividing a larger network, using some of the host bits as extra network bits.
:::

:::definition{term="Private IP address"}
An address from a range reserved for use inside local networks. It is not routed across the internet and can be used again in every local network.
:::

:::definition{term="DHCP"}
Dynamic Host Configuration Protocol: a service that automatically gives a device an IP address (and other settings) for a period of time when it joins the network.
:::

## IPv4 and IPv6

An **IPv4** address has 32 bits, written as four **octets** (8-bit numbers from 0 to 255) separated by dots, such as `192.168.14.77`. In binary this is `11000000.10101000.00001110.01001101`. There are 2^32 = 4 294 967 296 possible addresses, which is fewer than the number of devices now connected.

An **IPv6** address has 128 bits, written as eight groups of four hexadecimal digits separated by colons, for example `2001:0db8:0000:0000:0000:ff00:0042:8329`. It gives 2^128 addresses, which is about 3.4 × 10^38, so there are enough for every device and for the growing number of sensors and appliances.

IPv6 addresses are shortened using two rules:
1. **Leading zeros** in a group can be dropped (`0042` becomes `42`).
2. **One run of consecutive all-zero groups** can be replaced by `::`, but only once in an address, otherwise the length would be ambiguous. If there are two runs the longest is replaced.

So `2001:0db8:0000:0000:0000:ff00:0042:8329` is written `2001:db8::ff00:42:8329`.

**Why IPv6 was introduced.** IPv4 addresses ran out. NAT and private addresses delayed the problem but make some services harder to set up, because many devices share one public address. IPv6 provides a vast address space and also makes configuration simpler.

## Network and host portions, and subnetting

An IPv4 address is split into a **network portion** (identifies the network) and a **host portion** (identifies the device on that network). The **subnet mask** shows where the split is. A mask with 26 ones followed by 6 zeros can be written `255.255.255.192` or as the prefix `/26`.

To find the network address, take the bitwise AND of the address and the mask. To find the broadcast address, set all host bits to 1. The usable host addresses lie between the two. The number of usable hosts is 2^h − 2, where h is the number of host bits (the network address and broadcast address cannot be given to a device).

| Prefix | Subnet mask | Addresses | Usable hosts |
|:-:|:-:|:-:|:-:|
| /24 | 255.255.255.0 | 256 | 254 |
| /25 | 255.255.255.128 | 128 | 126 |
| /26 | 255.255.255.192 | 64 | 62 |
| /27 | 255.255.255.224 | 32 | 30 |
| /28 | 255.255.255.240 | 16 | 14 |
| /29 | 255.255.255.248 | 8 | 6 |
| /30 | 255.255.255.252 | 4 | 2 |

:::worked-solution{title="Finding the network address, broadcast address and hosts"}
A device has the address `192.168.14.77` and the mask `255.255.255.192` (`/26`).

1. The address in binary is `11000000.10101000.00001110.01001101`.
2. The mask in binary is `11111111.11111111.11111111.11000000`.
3. AND of the two: `11000000.10101000.00001110.01000000`, which is the network address `192.168.14.64`.
4. There are 32 − 26 = 6 host bits. Set them all to 1: `...01111111`, so the broadcast address is `192.168.14.127`.
5. Usable hosts: `192.168.14.65` to `192.168.14.126`, which is 2^6 − 2 = 62 addresses.
:::

**Dividing a network.** A /24 network can be divided into four equal subnets by borrowing 2 host bits, giving /26.

| Subnet | Network address | First host | Last host | Broadcast |
|:-:|:-:|:-:|:-:|:-:|
| 1 | 192.168.14.0/26 | 192.168.14.1 | 192.168.14.62 | 192.168.14.63 |
| 2 | 192.168.14.64/26 | 192.168.14.65 | 192.168.14.126 | 192.168.14.127 |
| 3 | 192.168.14.128/26 | 192.168.14.129 | 192.168.14.190 | 192.168.14.191 |
| 4 | 192.168.14.192/26 | 192.168.14.193 | 192.168.14.254 | 192.168.14.255 |

Subnetting limits broadcast traffic, can keep departments apart (for example a school's administration and student networks) and makes it easier to apply security rules between them. Two devices on different subnets can only communicate through a router.

## Public and private addresses

A **public** address is unique on the internet and can be reached from outside. The ISP gives it to a customer. A **private** address belongs to a range set aside for local use:

| Range | Addresses |
|---|---|
| 10.0.0.0 to 10.255.255.255 | 16 777 216 |
| 172.16.0.0 to 172.31.255.255 | 1 048 576 |
| 192.168.0.0 to 192.168.255.255 | 65 536 |

Routers on the internet do not forward packets addressed to a private address. A home or school router uses **NAT** to replace the private source address of outgoing packets with its public address, so many devices share a single public address.

**Implications.** A device with a private address cannot be reached directly from the internet, which gives some protection because outside users cannot start a connection to it, but this is not a replacement for a firewall. It is also why hosting a server on a private address needs extra configuration. Private addresses can be reused by every network, which has helped to slow down the running out of IPv4 addresses.

## Static and dynamic addresses

A **static** address is set by hand and stays the same. It suits servers, printers and routers, which other devices must always find at the same address. A **dynamic** address is leased by a DHCP server for a time and may differ the next time the device connects. It suits laptops and phones, and spares the administrator from configuring every device and from clashes where two devices use the same address.

An IP address is not built into the device: it belongs to the network connection. A laptop moved from the school to home receives a different IP address, but its MAC address does not change.

:::worked-solution{title="Choosing static or dynamic"}
A clinic network has two PCs, a file server, a network printer and visitors' phones.

1. The server and printer must always be found at the same address, so give them static addresses.
2. The two PCs and the phones come and go. Let the DHCP server lease them addresses.
3. Keep the static addresses outside the range the DHCP server hands out, otherwise it could give one of them to a phone.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine IPv4 and IPv6 formats, subnetting, public and private addresses, and static and dynamic addresses. ZIMSEC asks for IP address and subnet calculations in Paper 2 section C (Networking). Cambridge asks for the format, the purpose of a subnet mask and the reasons for IPv6, usually without a calculator, so the numbers are friendly.
:::

## Common mistakes

:::mistake{title="Forgetting to subtract 2"}
The all-zeros host (network address) and all-ones host (broadcast) cannot be given to devices. Usable hosts = 2^h − 2.
:::

:::mistake{title="Using :: more than once in an IPv6 address"}
`::` can replace only one run of zero groups. Two would make the address ambiguous.
:::

:::mistake{title="Writing an octet above 255"}
An octet is 8 bits, so it ranges from 0 to 255. `192.168.300.1` is not a valid IPv4 address.
:::

:::mistake{title="Saying that NAT is a type of address"}
NAT is a process carried out by a router that translates addresses. It is not an address type.
:::

## Exam tips

:::exam-tip
"**Calculate**" questions (ZIMSEC Paper 2, Cambridge Paper 1 and 3): write the address and mask in binary, AND them, then set the host bits to 1 for the broadcast address. Show the line for the number of hosts as 2^h − 2.
:::

:::exam-tip
"**Explain why IPv6 was introduced**": IPv4 has only 2^32 addresses, which have run out as more devices connect; IPv6 has 2^128. Mention that NAT and private addresses were only a partial answer.
:::

:::exam-tip
For "**public and private**" give the key difference (unique on the internet against reusable inside a network), the role of NAT, and one implication (hidden from direct access, cannot be reached from outside without extra settings).
:::

## Summary

:::summary
- An IPv4 address is 32 bits in four octets (0-255); an IPv6 address is 128 bits in eight hexadecimal groups, shortened by dropping leading zeros and using `::` once.
- IPv6 was introduced because IPv4 addresses ran out.
- The subnet mask splits an address into network and host portions; network address = address AND mask, broadcast = host bits all 1, usable hosts = 2^h − 2.
- Private addresses (10.x.x.x, 172.16-31.x.x, 192.168.x.x) are used inside local networks and translated by NAT; public addresses are unique on the internet.
- Static addresses are set by hand for servers and printers; dynamic addresses are leased by DHCP to ordinary devices.
:::
