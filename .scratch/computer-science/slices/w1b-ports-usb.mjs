// Slice w1b: ports, connections and USB (comp.hardware.ports-usb).
import { concept, P, ZIM, CAM } from "../lib.mjs";

concept("comp.hardware.ports-usb", { file: "hardware/ports-usb", keyPrefix: "hardware.ports-usb" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the \"S\" in USB stand for?",
    options: [["Serial", "Correct: universal serial bus."], ["System", "USB is the universal serial bus."], ["Standard", "USB is a standard, but the S stands for serial."], ["Storage", "USB connects many devices besides storage."]],
    answer: "A",
    explanation: "USB = universal serial bus: data is sent serially, one bit at a time.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which port is designed to carry high-definition video **and** sound to a monitor or television through one cable?",
    options: [["HDMI", "Correct: HDMI carries digital video and audio together."], ["Ethernet", "Ethernet connects a computer to a network."], ["Audio jack", "An audio jack carries sound only."], ["VGA", "VGA is an older analogue port for video only."]],
    answer: "A",
    explanation: "HDMI carries high-definition video and sound in one digital cable.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What happens first when a new device is plugged into a USB port?",
    options: [["The computer detects that a device is connected", "Correct: detection comes first, then identification and the driver."], ["The user must restart the computer", "USB devices can be connected while the computer is on."], ["The data is sent in parallel", "USB sends data serially."], ["The device's battery is charged fully before anything else", "Charging can happen, but detection comes first."]],
    answer: "A",
    explanation: "Sequence: device detected → device identified → driver loaded or installed → data transmitted serially.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does a USB flash drive not need its own power supply?",
    options: [["The USB cable or port supplies power to it", "Correct: USB carries power as well as data."], ["It stores enough charge to last for years", "Flash drives have no battery; they take power from the port."], ["Flash memory needs no power to read or write", "Reading and writing need electrical power."], ["The driver provides the power it needs", "A driver is software and cannot supply power."]],
    answer: "A",
    explanation: "USB supplies power to connected devices, which is one of its benefits.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **drawback** of USB?",
    options: [["The maximum cable length is only a few metres", "Correct: longer cables make the signal unreliable."], ["Devices are detected and set up automatically when plugged in", "That is a benefit (plug and play)."], ["It can supply power to devices", "That is a benefit."], ["Most computers have USB ports", "That is a benefit: it is an industry standard."]],
    answer: "A",
    explanation: "USB drawbacks: limited cable length, slower older versions, limited power, several connector types.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "A pupil plugs headphones into a computer, but no sound comes out. The volume is turned up and not muted. What should be checked next?",
    options: [["That the plug is in the audio output jack, not the microphone jack", "Correct: a plug in the wrong jack is a common simple fault."], ["That the computer's processor is fast enough", "Processor speed does not stop sound playing."], ["That the headphones are plugged into the Ethernet port on the back panel", "Audio plugs do not fit an Ethernet port."], ["That the printer is switched on", "The printer has nothing to do with sound."]],
    answer: "A",
    hints: ["Troubleshooting starts with the simplest causes: cables and ports."],
    explanation: "Check the simple things first: the correct port, a firm connection, power, then the driver and settings.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    stem: "A new USB 3 external drive is plugged into an older USB 2 port. What is the most likely result?",
    options: [["It works at the slower USB 2 speed", "Correct: USB is backward compatible, at the older speed."], ["It is not recognised and does not work", "USB is backward compatible, so it still works."], ["It works at the full USB 3 transfer speed", "The older port limits the speed."], ["It damages the older USB port", "Backward compatibility is designed in."]],
    answer: "A",
    hints: ["Think about backward compatibility and which part limits the speed."],
    explanation: "USB is backward compatible, so the drive works, but data moves at the speed of the older port.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "USB sends data one bit at a time along its data wires.",
    answer: true,
    explanation: "True. USB is a serial interface.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A device driver is a cable that connects a peripheral to the computer.",
    answer: false,
    explanation: "False. A device driver is software that lets the operating system communicate with a particular device.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each device to the port it is most likely to use.",
    pairs: [["Projector showing a video with sound", "HDMI"], ["Network cable to a switch", "Ethernet (RJ45)"], ["Headphones", "Audio jack"], ["Flash drive", "USB"]],
    explanation: "HDMI for video and sound; Ethernet for wired networks; audio jacks for headphones and speakers; USB for flash drives and many other peripherals.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the description of how a USB device is set up.",
    template: "When a device is plugged in, the computer {{blank:a}} it and identifies the type of device. The operating system then loads the correct device {{blank:b}}. Data is sent {{blank:c}}, one bit at a time.",
    blanks: [
      { id: "a", accepted: ["detects"], choices: ["detects", "formats", "encrypts", "charges"] },
      { id: "b", accepted: ["driver"], choices: ["driver", "port", "cable", "packet"] },
      { id: "c", accepted: ["serially"], choices: ["serially", "in parallel"] },
    ],
    explanation: "Detect → identify → load driver → transmit serially.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for a computer detecting a newly connected device and setting it up automatically.",
    accepted: ["plug and play", "plug-and-play", "plug n play"],
    wrong: ["device driver"],
    explanation: "Plug and play: the device is detected and its driver loaded without manual installation.",
  });
  b.calc({
    d: 2, skill: "APPLICATION", applies: ZIM,
    stem: "A technician must connect 30 computers in a laboratory. Each computer needs a keyboard, a mouse and a webcam, all connected by USB. How many USB ports are needed in total?",
    value: 30 * 3,
    wrong: [30],
    explanation: `$30 \\times 3 = ${30 * 3}$ ports.`,
    workedSolution: `1. Each computer uses 3 USB ports.\n2. $30 \\times 3 = ${30 * 3}$.`,
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4, applies: CAM,
    hints: ["Start from the moment the device is plugged in.", "Mention the driver and how bits are sent."],
    stem: "Explain how the USB interface is used to transmit data from a newly connected device to a computer. [4]",
    points: ["The computer detects that a device has been connected", "The device is identified (it tells the computer what type of device it is)", "The appropriate device driver is loaded / installed automatically", "Data is transmitted serially (one bit at a time)"],
    modelAnswer: "When the device is plugged in, the computer detects it and the device identifies itself. The operating system loads or installs the correct driver. Data is then sent serially, one bit at a time, along the USB cable.",
    explanation: "Detect, identify, driver, serial transmission.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4, applies: ZIM,
    hints: ["Begin with the simplest causes."],
    stem: "A printer connected by USB to an office computer in Masvingo will not print. Describe **four** checks the technician should make. [4]",
    points: ["Check the printer is switched on and has power (and paper/ink)", "Check the USB cable is firmly connected at both ends", "Try a different USB port or a different cable", "Check the printer driver is installed / the correct printer is selected as default (or restart the computer)"],
    modelAnswer: "Check the printer is on and has paper; check the cable is firmly plugged in at both ends; try another port or cable; check the driver is installed and the printer is selected, then restart if needed.",
    explanation: "Power, cable, port, driver/settings: simplest causes first.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, applies: CAM,
    hints: ["Benefits: standard, automatic, power.", "Drawbacks: length, speed of older versions."],
    stem: "A school in Bulawayo is buying keyboards, mice and external drives for its new computer laboratory. The supplier recommends USB devices.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which type of transmission does USB use?", options: [["Serial", "Correct."], ["Parallel", "USB is serial."], ["Simplex only", "USB can send both ways."], ["Analogue", "USB is digital."]], answer: "A", explanation: "Serial." }),
      P.manual({ label: "(b)", marks: 3, stem: "Give **three** benefits of using USB devices in the laboratory.", points: ["Industry standard: the devices fit almost any computer", "Plug and play: detected and drivers installed automatically", "Supplies power, so keyboards, mice and drives need no separate power supply (or backward compatible)"], modelAnswer: "USB is a standard, so devices work in any computer; devices are detected and set up automatically; the port supplies power, so no extra power supplies are needed." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **two** drawbacks of USB.", points: ["Maximum cable length is only a few metres", "Older versions are slow / limited power for large devices / several connector types needing adapters"], modelAnswer: "Cables can only be a few metres long, and older USB versions transfer data slowly." }),
    ],
    explanation: "USB: serial; standard, plug and play, power; short cables and slower older versions.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, applies: ZIM,
    hints: ["Match each device to the port designed for its type of data."],
    stem: "Tendai is setting up a computer for a church office in Harare. He has a monitor, speakers, a printer, a network cable and a flash drive.",
    parts: [
      P.match({ label: "(a)", stem: "Match each device to the most suitable port.", pairs: [["Monitor", "HDMI"], ["Speakers", "Audio jack"], ["Network cable", "Ethernet (RJ45)"], ["Flash drive", "USB"]], explanation: "HDMI video, audio jack sound, Ethernet network, USB storage." }),
      P.manual({ label: "(b)", marks: 4, stem: "Describe the steps Tendai should follow to set up the new printer.", points: ["Connect the printer to the computer with the correct (USB) cable and connect its power", "Switch it on so the computer detects it", "Install the driver if it is not installed automatically (from the manufacturer's disc or website)", "Set it as the default printer and print a test page"], modelAnswer: "Connect the printer's USB cable and power, switch it on, let the computer detect it and install the driver (from the manufacturer if needed), then set it as default and print a test page." }),
    ],
    explanation: "Choose the right port; connect, power, driver, configure, test.",
  });

  b.card("DEFINITION", "**Port**", "A socket on a computer for connecting a peripheral device or a network.");
  b.card("DEFINITION", "**USB**", "Universal serial bus: a standard interface that sends data serially and can supply power.");
  b.card("DEFINITION", "**Device driver**", "Software that lets the operating system communicate with a particular hardware device.");
  b.card("DEFINITION", "**Plug and play**", "The computer detects a new device and sets it up automatically.");
  b.card("CONCEPT", "How USB transmits data", "Device detected → identified → driver loaded → data sent serially (one bit at a time).");
  b.card("FACT", "Three benefits of USB", "Industry standard; plug and play (automatic drivers); supplies power. Also backward compatible.");
  b.card("FACT", "Three drawbacks of USB", "Cables only a few metres long; older versions slower; limited power (and several connector shapes).");
  b.card("FACT", "HDMI carries…", "High-definition video and sound together in one digital cable.");
  b.card("CONCEPT", "Order of troubleshooting a connection", "Power → cable at both ends → correct port → try another port/cable → driver/settings → restart.", undefined, { applies: ZIM });
});
