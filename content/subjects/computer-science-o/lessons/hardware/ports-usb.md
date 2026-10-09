---
{
  "key": "hardware.ports-usb",
  "title": "Ports, connections and the USB interface",
  "summary": "How peripherals connect to a computer through ports and cables (USB, HDMI, audio and Ethernet), how a new device is set up and a faulty connection checked, and how the universal serial bus transmits data, with its benefits and drawbacks.",
  "concepts": ["comp.hardware.ports-usb"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

A new computer laboratory has opened at a school in Chinhoyi. Before lessons can start, the technician must connect keyboards, mice, monitors, speakers, printers and the network to every computer, and make sure each device works. All of these connections go through **ports**: the sockets on the computer's case.

The most common port of all is **USB**. Cambridge asks how USB transmits data and what its benefits and drawbacks are; ZIMSEC asks you to connect hardware devices to a computer and troubleshoot the connections. This lesson covers both.

## Key definitions

:::definition{term="Port"}
A socket on a computer through which a peripheral device or network is connected using a cable or plug.
:::

:::definition{term="Peripheral"}
A device outside the main processing unit that is connected to the computer, such as a keyboard, printer, monitor or external drive.
:::

:::definition{term="Universal serial bus (USB)"}
A standard interface for connecting peripherals to a computer, which sends data serially and can also supply power to the device.
:::

:::definition{term="Device driver"}
Software that lets the operating system communicate with a particular hardware device.
:::

:::definition{term="Plug and play"}
The ability of a computer to detect a newly connected device and set it up automatically, without the user installing anything by hand.
:::

## Common ports and what they connect

| Port | Typical devices | Notes |
|:--|:--|:--|
| USB | Keyboards, mice, printers, scanners, flash drives, external hard drives, phones, webcams | Data and power through one cable; several connector shapes (the smaller oval USB-C plug fits either way up) |
| HDMI | Monitors, televisions, projectors | Carries high-definition video **and** sound in one digital cable |
| Audio jacks | Headphones, speakers (output); microphones (input) | Small round sockets, often colour-coded |
| Ethernet (RJ45) | Network cable to a switch or router | Wired network connection; the plug clips in |

Older computers may also have a VGA port (an analogue video port for monitors and projectors).

## Connecting and setting up a device

1. **Choose the right cable and port.** Match the plug to the socket; do not force a plug in.
2. **Connect power** if the device needs its own supply (printers, monitors).
3. **Switch the device on.** For plug-and-play devices, the operating system detects it and installs or loads the driver automatically.
4. **Install a driver** from the manufacturer's disc or website if the device is not recognised automatically.
5. **Configure settings** where needed: the default printer, the screen resolution of a new monitor, or the audio output device.
6. **Test the device**: print a test page, type a sentence, play a sound.

### Troubleshooting a connection

When a device does not work, check the simple things first:

- Is the cable firmly plugged in at **both** ends? Is the device switched on and powered?
- Is the cable in the correct port (for example, the speaker in the output jack, not the microphone jack)?
- Try another port, or another cable, to find whether the port or the cable is faulty.
- Is the correct driver installed? Check the operating system's list of devices for warnings.
- Restart the computer and try again.

:::example
**A projector that shows nothing.** Mr Dube in a Gweru classroom connects a projector with an HDMI cable, but the screen stays blank. Following the checklist: the projector is on, the cable is firmly in both sockets, but the projector is set to its VGA input. Selecting the HDMI input on the projector fixes the problem. Working through simple causes first saves time.
:::

## How USB transmits data

1. A device is plugged into a USB port. The computer **detects** that a device has been connected.
2. The device tells the computer what kind of device it is, and the computer **identifies** it.
3. The operating system loads the correct **device driver**; if one is not already installed, it may find and install it automatically.
4. Data is then sent **serially**, one bit after another, along the cable's data wires. Earlier versions of USB send data in one direction at a time (half-duplex); newer versions have extra wires so data can travel both ways at once (full-duplex).
5. The USB cable can also carry **power** to the device, which is why flash drives, mice and phones need no separate power supply.

USB is serial because serial transmission works reliably over a cable length of a few metres with few wires, which keeps cables thin and cheap.

## Benefits and drawbacks of USB

| Benefits | Drawbacks |
|:--|:--|
| An industry standard: almost every computer has USB ports, and many kinds of device use them | Cable length is limited (a few metres) before the signal becomes unreliable |
| Devices are detected and their drivers loaded automatically (plug and play) | Older USB versions have much slower data transfer rates than newer ones |
| Supplies power to devices and can charge them | A newer device plugged into an older port only works at the older, slower speed |
| Connectors are designed so they cannot be inserted wrongly | There are several connector shapes, so adapters may be needed |
| Backward compatible: newer ports work with older devices | Power supplied is limited, so large devices may still need their own supply |

:::worked-solution[Choosing a connection for a scenario]
Nyasha needs to connect a printer that sits 2 metres from the office computer, and a projector on the classroom ceiling 12 metres away.

1. The printer is close, and USB is supported by almost every printer and computer, with automatic driver installation. **USB** is suitable.
2. The projector is 12 metres away, longer than a standard USB or ordinary HDMI cable reliably works, and it needs video and sound. A long **HDMI** cable designed for that distance (or a network connection if the projector supports one) is suitable; plain USB is not.
3. In each case the reason is linked to the scenario: distance, the type of data (video and sound) and compatibility.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC asks you to connect hardware devices to a computer and troubleshoot the connections. Cambridge 0478 asks how USB transmits data (serially) and its benefits and drawbacks; it does not examine other ports in detail.
:::

## Common mistakes

:::mistake{title="Calling USB a parallel connection"}
USB stands for universal **serial** bus: data travels one bit at a time.
:::

:::mistake{title="Saying USB has no drawbacks"}
Give real drawbacks: limited cable length, slower older versions, limited power, different connector shapes.
:::

:::mistake{title="Jumping to a new driver first"}
When troubleshooting, check power and cables first; most faults are loose or wrong connections.
:::

## Exam tips

:::exam-tip
For "**explain** how USB transmits data", include detection, identification, driver loading and serial transmission.
:::

:::exam-tip
For benefits, avoid vague answers such as "it is fast". Better: "it is a standard, so most devices can connect to any computer" or "it supplies power, so the device needs no separate power supply".
:::

## Summary

:::summary
- Ports connect peripherals: USB (many devices), HDMI (video and sound), audio jacks, Ethernet (network).
- Setting up: connect, power on, the driver is loaded (plug and play) or installed, configure and test.
- Troubleshoot simple causes first: cables, power, correct port, driver, restart.
- USB detects and identifies a device, loads its driver and sends data serially; it can also supply power.
- USB benefits: standard, automatic set-up, power supply, backward compatible. Drawbacks: short cables, older versions slower, limited power.
:::
