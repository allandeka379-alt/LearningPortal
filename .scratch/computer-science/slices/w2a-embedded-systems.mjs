// Slice w2a: embedded systems (comp.hardware.embedded-systems, Cambridge only).
import { concept, P } from "../lib.mjs";

concept("comp.hardware.embedded-systems", { file: "hardware/embedded-systems", keyPrefix: "hardware.embedded-systems" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement best describes an **embedded system**?",
    options: [
      ["A microprocessor-based system with a dedicated function inside a larger device", "Correct: the dedicated function inside a larger device is the key idea."],
      ["A computer that can run any program the user chooses to install on it", "That describes a general-purpose computer such as a PC or laptop."],
      ["A program that is copied into RAM when the computer starts up", "An embedded system is hardware plus software, not just a program."],
      ["A very large computer that serves many users over a network at once", "That describes a server or mainframe."],
    ],
    answer: "A",
    explanation: "An embedded system is built around a microprocessor and performs a dedicated function as part of a larger device.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which device is a **general-purpose** computer rather than an embedded system?",
    options: [
      ["A laptop", "Correct: a laptop runs many different programs for many tasks."],
      ["The controller in a microwave oven", "It only controls the microwave: an embedded system."],
      ["An anti-lock braking system in a car", "It has one dedicated job: an embedded system."],
      ["The controller of an electric gate", "It only opens and closes the gate: an embedded system."],
    ],
    answer: "A",
    explanation: "PCs and laptops are general-purpose; appliances, car systems and gate controllers contain embedded systems.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Where is the program that controls a washing machine's embedded system usually stored?",
    options: [
      ["In ROM or flash memory, as firmware", "Correct: the fixed program must be kept when the power is off."],
      ["In RAM, loaded from a hard disk each time", "Washing machines have no hard disk; RAM is volatile."],
      ["On a DVD inserted by the user", "The user does not load the program."],
      ["In cloud storage, downloaded for every wash", "The machine must work without an internet connection."],
    ],
    answer: "A",
    explanation: "Embedded systems run firmware held in non-volatile memory (ROM or flash), so it is there every time the device is switched on.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **characteristic** of most embedded systems?",
    options: [
      ["Low power consumption", "Correct: many run on batteries or are switched on all the time."],
      ["A full keyboard and a large screen", "Most have a simple interface or none at all."],
      ["The user can install any application", "The firmware is fixed by the manufacturer."],
      ["Large size and high cost", "They are small and cheap to mass-produce."],
    ],
    answer: "A",
    explanation: "Embedded systems are small, cheap, low-power and have a dedicated function.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which part of a car is **most likely** to be controlled by an embedded system?",
    options: [
      ["The airbag system", "Correct: it monitors sensors and fires the airbag in real time."],
      ["The seat fabric", "Fabric has no electronics."],
      ["The fuel tank", "The tank itself stores fuel; it does not process data."],
      ["The windscreen glass", "Glass has no processor."],
    ],
    answer: "A",
    explanation: "Car embedded systems include engine management, anti-lock brakes, airbags and navigation.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Think about what an airbag or a brake system must do the moment something happens."],
    stem: "Why must the embedded system that controls a car's anti-lock brakes respond in **real time**?",
    options: [
      ["It must react to wheel sensor readings immediately, or the car could skid", "Correct: a delayed response would be dangerous."],
      ["It must save every reading to secondary storage before acting on it", "Saving first would delay the response."],
      ["It must wait for the driver to confirm each action on a screen", "The system acts automatically, without the driver."],
      ["It must download new firmware before every journey", "Firmware is fixed; it is not downloaded each journey."],
    ],
    answer: "A",
    explanation: "Real-time systems respond to inputs immediately; for brakes and airbags any delay could cause an accident.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which is a drawback, not a benefit?"],
    stem: "Which is a **drawback** of an embedded system that is connected to the internet so it can be controlled by a phone app?",
    options: [
      ["It could be hacked and controlled by an unauthorised person", "Correct: connected devices need to be kept secure."],
      ["It can be switched on remotely before the owner arrives home", "That is a benefit of remote control."],
      ["It uses very little electrical power", "Low power is a benefit."],
      ["It is cheap to manufacture in large numbers", "Low cost is a benefit."],
    ],
    answer: "A",
    explanation: "Remote control is convenient, but an insecure connected device can be hacked.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Ask whether the device has one dedicated function and whether the user can install other programs."],
    stem: "Thandeka says a smart television with a fixed set of built-in features is an embedded system, but her desktop PC is not. Which reason supports her view?",
    options: [
      ["The television's processor performs dedicated functions within a larger device", "Correct: the dedicated function within a larger device is what makes it embedded."],
      ["The television has a larger screen and better speakers than the desktop PC", "Screen size does not decide whether a system is embedded."],
      ["The television uses electricity, but the PC uses a battery", "Both use mains electricity; power source is not the test."],
      ["The PC has no microprocessor, so it cannot be embedded", "A PC does have a microprocessor; it is general-purpose."],
    ],
    answer: "A",
    explanation: "An embedded system performs dedicated functions inside a larger device; a desktop PC runs any software the user installs.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An automatic street light that switches on at dusk is controlled by an embedded system.",
    answer: true,
    explanation: "True. It has one dedicated function: reading a light sensor and switching the lamp.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The owner of a microwave oven can normally install a new word-processing program on its embedded system.",
    answer: false,
    explanation: "False. Embedded systems run fixed firmware; the user cannot install general applications.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each embedded system to its dedicated function.",
    pairs: [
      ["Burglar alarm", "Checks motion sensors and sounds a siren"],
      ["Vending machine", "Accepts payment and releases the chosen item"],
      ["Engine management system", "Controls fuel and ignition from sensor readings"],
      ["Refrigerator controller", "Keeps the inside at a set temperature"],
    ],
    explanation: "Each embedded system has one dedicated function inside a larger device.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "An embedded system performs a {{blank:a}} function as part of a larger device. Its program, called {{blank:b}}, is stored in non-volatile memory. A PC or laptop is a {{blank:c}} computer because it runs many different programs.",
    blanks: [
      { id: "a", accepted: ["dedicated"], choices: ["dedicated", "general", "random", "temporary"] },
      { id: "b", accepted: ["firmware"], choices: ["firmware", "malware", "freeware", "shareware"] },
      { id: "c", accepted: ["general-purpose"], choices: ["general-purpose", "embedded", "dedicated", "real-time"] },
    ],
    explanation: "Dedicated function, firmware, general-purpose computer.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Give the term for a computer, such as a PC or laptop, that can perform many different tasks by running different programs.",
    accepted: ["general-purpose computer", "general purpose computer", "general-purpose", "general purpose"],
    wrong: ["embedded system"],
    explanation: "A general-purpose computer runs many different programs; an embedded system has a dedicated function.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Give three different features, not three examples."],
    stem: "State **three** characteristics of an embedded system. [3]",
    points: [
      "Performs a dedicated function / is part of a larger device",
      "Small / cheap to mass-produce / low power consumption",
      "Fixed program (firmware) in ROM or flash / responds in real time / simple or no user interface",
    ],
    modelAnswer: "It has a dedicated function within a larger device; it is small and uses little power; it runs fixed firmware stored in ROM.",
    explanation: "Credit one point from each line.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    hints: ["Two benefits and two drawbacks.", "Link each point to the alarm."],
    stem: "A security company in Bulawayo fits houses with alarms controlled by embedded systems that the owner can arm from a phone app. Give **two** benefits and **two** drawbacks of using an internet-connected embedded system in the alarm. [4]",
    points: [
      "Benefit: owner can arm/disarm or check the alarm remotely (from anywhere)",
      "Benefit: small, low power, reliable, responds immediately to sensors / low cost",
      "Drawback: could be hacked so a criminal could disarm it",
      "Drawback: needs an internet connection to be controlled remotely / difficult to upgrade / whole unit replaced if it fails",
    ],
    modelAnswer: "The owner can arm it from anywhere, and the embedded system uses little power and responds at once to the sensors. However, a hacker could take control and disarm it, and remote control fails if the internet connection is lost.",
    explanation: "Balance remote control and reliability against security and dependence on the connection.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Inputs, processing, outputs.", "Compare with a PC: one job versus many."],
    stem: "A bakery in Mutare buys an oven controlled by an embedded system. The baker chooses a programme on a keypad; the oven heats to the right temperature and switches off when the time is up.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which component would the embedded system use to measure the oven's temperature?", options: [["A temperature sensor", "Correct: it sends readings to the processor."], ["An actuator", "An actuator causes movement or switches something; it does not measure."], ["A speaker", "A speaker outputs sound."], ["A barcode scanner", "It reads barcodes, not temperature."]], answer: "A", explanation: "The sensor measures; the processor decides; the heater (or a relay) is switched." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe how the embedded system keeps the oven at the chosen temperature.", points: ["The temperature sensor sends readings to the microprocessor", "The microprocessor compares each reading with the stored/chosen temperature", "If it is too low the heater is switched on, if too high it is switched off; this repeats continuously"], modelAnswer: "The sensor sends the temperature to the microprocessor, which compares it with the chosen value. If it is too low the heater is switched on, and if it is too high it is switched off; this repeats continuously until the time is up." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the oven uses an embedded system rather than a general-purpose computer.", points: ["It only needs to perform one dedicated function (controlling the oven)", "An embedded system is smaller / cheaper / uses less power / more reliable than a PC"], modelAnswer: "The oven only has one dedicated job, so a small, cheap, low-power embedded system is enough; a PC would cost more and use more power for no benefit." }),
    ],
    explanation: "Sensor → microprocessor compares → heater switched; embedded because of the dedicated function, size and cost.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    hints: ["Dedicated function inside a larger device = embedded."],
    stem: "Tendai lists some devices in his home: a desktop computer, a digital alarm clock, an air conditioner, a laptop, a tablet computer and an electric gate opener.",
    parts: [
      P.mcq({ label: "(a)", multiple: true, marks: 2, stem: "Select the **three** devices that contain embedded systems.", options: [["Digital alarm clock", "Correct: dedicated function."], ["Air conditioner", "Correct: controls temperature and the fan."], ["Electric gate opener", "Correct: opens and closes the gate."], ["Desktop computer", "General-purpose."], ["Laptop", "General-purpose."], ["Tablet computer", "General-purpose: the user installs and runs many apps."]], answer: ["A", "B", "C"], explanation: "The clock, air conditioner and gate opener each have a dedicated function." }),
      P.manual({ label: "(b)", marks: 2, stem: "Give **two** differences between an embedded system and a general-purpose computer.", points: ["Embedded: one dedicated function; general-purpose: many tasks / runs many programs", "Embedded: fixed firmware the user cannot change / simple interface / smaller, cheaper, lower power"], modelAnswer: "An embedded system does one dedicated job, while a PC runs many programs. The embedded system's firmware is fixed, but a PC user can install new software." }),
    ],
    explanation: "Clock, air conditioner and gate opener are embedded; the desktop and laptop are general-purpose.",
  });

  b.card("DEFINITION", "**Embedded system**", "A microprocessor-based system with a dedicated function, built into a larger device.");
  b.card("DEFINITION", "**General-purpose computer**", "A computer (PC, laptop) that runs many different programs for many tasks.");
  b.card("DEFINITION", "**Firmware**", "The fixed program stored in ROM or flash memory that controls an embedded system.");
  b.card("FACT", "Five areas that use embedded systems", "Domestic appliances, cars, security systems, lighting systems, vending machines.");
  b.card("FACT", "Characteristics of embedded systems", "Dedicated function; part of a larger device; small, cheap, low power; fixed firmware; often real time; simple interface.");
  b.card("CONCEPT", "Embedded vs general-purpose", "Embedded: one job, fixed firmware, simple interface. General-purpose: many tasks, user installs software, full interface.");
  b.card("CONCEPT", "Drawbacks of embedded systems", "Hard to upgrade; whole unit may need replacing if it fails; internet-connected ones can be hacked.");
  b.card("CONCEPT", "Why real time matters in a car", "Airbags and anti-lock brakes must respond to sensor readings immediately; any delay could cause an accident.");
  b.card("DEFINITION", "**Microcontroller**", "A single chip with a processor, memory and input/output connections, used in many embedded systems.");
});
