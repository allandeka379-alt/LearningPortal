// Slice w2a: hardware and software maintenance and troubleshooting (comp.hardware.maintenance, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const pcs = 36;
const minsEach = 15;
const hours = (pcs * minsEach) / 60;
if (!Number.isInteger(hours)) throw new Error("hours");

concept("comp.hardware.maintenance", { file: "hardware/maintenance", keyPrefix: "hardware.maintenance" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What should a technician do **first** before opening a computer's case?",
    options: [
      ["Switch off and unplug the computer", "Correct: never work inside a computer that is connected to the mains."],
      ["Remove the RAM modules", "The computer must be switched off and unplugged before touching any component."],
      ["Run a disk-checking utility", "That is a software check, not a safety step."],
      ["Open the power supply unit to check the fuse", "The PSU must never be opened."],
    ],
    answer: "A",
    explanation: "Safety first: switch off, unplug, discharge static, then open the case.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the purpose of an **anti-static wrist strap**?",
    options: [
      ["To stop static electricity from damaging components", "Correct: it safely discharges static from the technician."],
      ["To protect the technician from mains electric shocks", "The computer must be unplugged; the strap does not protect against mains voltage."],
      ["To hold small screws while working", "It is not a tool holder."],
      ["To measure the temperature of the CPU", "It does not measure anything."],
    ],
    answer: "A",
    explanation: "Electrostatic discharge can destroy chips; the strap keeps the technician at the same potential as the case.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which part converts mains electricity into the low voltages used by a computer's components?",
    options: [
      ["Power supply unit (PSU)", "Correct."],
      ["Motherboard", "The motherboard connects the components; it receives power from the PSU."],
      ["Heat sink", "A heat sink removes heat from the CPU."],
      ["Graphics card", "A graphics card produces the display image."],
    ],
    answer: "A",
    explanation: "The PSU converts mains AC into the low DC voltages the components need.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A wireless mouse's pointer has stopped moving. The receiver is plugged in. What should be checked first?",
    options: [
      ["The batteries in the mouse", "Correct: flat batteries are the most common, simplest cause."],
      ["The amount of RAM installed", "RAM does not affect whether a mouse moves the pointer."],
      ["Whether the hard drive is clicking", "A hard drive fault would not stop only the mouse."],
      ["The fan on the CPU heat sink", "The CPU fan does not affect the mouse."],
    ],
    answer: "A",
    explanation: "Check the simplest causes first: batteries, connection, surface, then drivers.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which component is checked by the POST beeps and causes random crashes when faulty?"],
    stem: "A computer beeps several times at start-up and sometimes crashes with a blue error screen. Which component is the most likely cause?",
    options: [
      ["A faulty or loose RAM module", "Correct: memory faults give POST beeps and random crashes."],
      ["A dirty mouse sensor", "This would only affect the pointer."],
      ["A keyboard with a sticky key", "This would only affect typing."],
      ["An out-of-date web browser", "This would not cause POST beeps."],
    ],
    answer: "A",
    explanation: "Beep codes at POST and random crashes point to memory: reseat, test and if necessary replace the module.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["What could be lost if the drive fails completely?"],
    stem: "An office computer's hard drive is making a clicking noise and some files will not open. What should be done **first**?",
    options: [
      ["Back up the important files immediately", "Correct: the drive may fail completely at any time."],
      ["Defragment the hard drive", "Heavy disk activity could make a failing drive fail sooner."],
      ["Install a new keyboard", "The keyboard is not involved."],
      ["Increase the screen brightness", "The display is not involved."],
    ],
    answer: "A",
    explanation: "Clicking and corrupted files are signs of a failing drive: back up first, then check and replace.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which task is an example of **preventive** maintenance?",
    options: [
      ["Cleaning dust from fans and vents every term", "Correct: it stops overheating before it causes a fault."],
      ["Replacing a keyboard after coffee is spilled on it", "That is repairing a fault after it happens."],
      ["Reinstalling a program that keeps crashing", "That fixes an existing fault."],
      ["Replacing a hard drive that has failed", "That repairs a fault."],
    ],
    answer: "A",
    explanation: "Preventive maintenance stops faults happening: cleaning, updates, backups, surge protection.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["If several things are changed at once, how will you know what fixed the fault?"],
    stem: "Why should a technician test only **one** possible cause at a time when troubleshooting?",
    options: [
      ["So that it is clear which change fixed the fault", "Correct: changing several things at once hides the real cause."],
      ["Because the computer can only be opened once a day", "There is no such limit."],
      ["Because testing two things at once always damages the motherboard", "Testing does not damage the motherboard."],
      ["So that the fault log does not need to be completed", "The fault should still be recorded."],
    ],
    answer: "A",
    explanation: "One change at a time identifies the true cause, which helps fix similar faults in future.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "It is safe to open a computer's power supply unit once the computer has been unplugged.",
    answer: false,
    explanation: "False. The PSU (and monitors) can hold dangerous charges even when unplugged; they should never be opened.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Components such as RAM modules should be held by their edges, not by their gold contacts.",
    answer: true,
    explanation: "True. Touching the contacts or chips can leave dirt or cause static damage.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    hints: ["Link each symptom to the component involved, then the fix."],
    stem: "Match each symptom to the most suitable first action.",
    pairs: [
      ["Pointer jumps about on a glass desk", "Use a mouse mat and clean the sensor"],
      ["A program has frozen and will not respond", "Close it using Task Manager and restart it"],
      ["\"No boot device\" message after the computer was moved", "Check the drive's data and power cables"],
      ["Typed characters appear as different symbols", "Check the keyboard language/layout setting"],
    ],
    explanation: "Match the symptom to its most likely cause and try the simplest fix first.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each part of a PC to its purpose.",
    pairs: [
      ["Motherboard", "Main circuit board connecting all components"],
      ["Heat sink and fan", "Stops the CPU from overheating"],
      ["RAM module", "Holds programs and data currently in use"],
      ["Case", "Holds and protects the components"],
    ],
    explanation: "Know the main parts of a PC and their purposes.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Begin by finding out what happened; end by recording it."],
    stem: "Complete the troubleshooting process.",
    template: "First identify the problem by asking the user. Next check the {{blank:a}} causes, and test one possible cause at a time. When the fault is fixed, {{blank:b}} that the whole system works. Finally, {{blank:c}} the fault and the solution in a log.",
    blanks: [
      { id: "a", accepted: ["simplest"], choices: ["simplest", "most expensive", "rarest", "newest"] },
      { id: "b", accepted: ["test"], choices: ["test", "format", "assume", "delete"] },
      { id: "c", accepted: ["record"], choices: ["record", "hide", "delete", "encrypt"] },
    ],
    explanation: "Identify → simple causes → one change at a time → fix → test → record.",
  });
  b.calc({
    d: 2, skill: "APPLICATION",
    stem: `A technician cleans the ${pcs} computers in a laboratory during the holidays. Each takes ${minsEach} minutes. How many hours does the job take? Give your answer in hours.`,
    value: hours,
    wrong: [pcs * minsEach],
    explanation: `${pcs} × ${minsEach} = ${pcs * minsEach} minutes = ${hours} hours.`,
    workedSolution: `1. ${pcs} × ${minsEach} = ${pcs * minsEach} minutes.\n2. ${pcs * minsEach} ÷ 60 = ${hours} hours.`,
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Give the abbreviation for the device that keeps a computer running for a short time during a power cut, so work can be saved.",
    accepted: ["UPS", "uninterruptible power supply", "uninterruptable power supply"],
    wrong: ["PSU"],
    explanation: "An uninterruptible power supply (UPS) has a battery that takes over during a power cut.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Think about dust, power, software and data."],
    stem: "Describe **four** preventive maintenance tasks for a school computer laboratory. [4]",
    points: [
      "Clean dust from fans, vents, keyboards and mice regularly (prevents overheating/faults)",
      "Use surge protectors / a UPS to protect against power surges and cuts",
      "Install operating system/software updates and keep antivirus up to date",
      "Make regular backups / run disk clean-up or defragment HDDs / keep the room cool and dry",
    ],
    modelAnswer: "Clean dust from fans and keyboards each term; connect the computers through surge protectors and a UPS; install updates and keep antivirus up to date; back up the shared files every week.",
    explanation: "Any four distinct preventive tasks.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    hints: ["Safety precautions first, then the steps to replace the part.", "Reseat before replacing."],
    stem: "A computer in a school library in Kwekwe beeps at start-up and will not load the operating system. The technician suspects the RAM.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "State **three** safety precautions the technician should take before working inside the computer.", points: ["Switch off and unplug the computer", "Wear an anti-static wrist strap / touch the metal case to discharge static", "Hold components by their edges / keep new parts in anti-static bags / never open the PSU"], modelAnswer: "Switch off and unplug the computer; wear an anti-static wrist strap; hold the RAM module by its edges." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe how the technician should find and fix the fault.", points: ["Remove the RAM module and reseat it firmly until the clips lock, then test", "If the fault remains, test the module in another slot / test with a known working module (or run a memory diagnostic)", "Replace the faulty module (or report a faulty slot), then test and record the fix"], modelAnswer: "Reseat the RAM firmly and restart. If it still beeps, try the module in another slot or swap in a module known to work, to find whether the module or slot is faulty. Replace the faulty module, test the computer and record the repair in the log." }),
    ],
    explanation: "Unplug, prevent static, handle by edges; reseat, test one change at a time, replace, record.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Assemble from the motherboard outwards, then the case, PSU and drives."],
    stem: "Form 4 pupils at a school in Chinhoyi are assembling a PC from new parts.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which part should be fitted onto the CPU straight after it is placed in its socket?", options: [["The heat sink and fan (with thermal paste)", "Correct: the CPU must be cooled."], ["The keyboard and mouse cables", "Peripherals are connected last."], ["The monitor and its HDMI or VGA video cable", "Peripherals are connected last."], ["The side panel of the case", "The case is closed at the end."]], answer: "A", explanation: "Thermal paste, then the heat sink and fan." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the remaining steps to complete the assembly after the CPU and its cooler are fitted.", points: ["Fit the RAM into its slots and fix the motherboard into the case", "Install the PSU, storage drive(s) and any expansion cards", "Connect power, data and front-panel cables, close the case, connect peripherals and test (POST)"], modelAnswer: "Push the RAM into its slots, then screw the motherboard into the case. Fit the PSU, the drive and any expansion cards, connect the power, data and front-panel cables, close the case, plug in the monitor, keyboard and mouse and switch on to check the POST." }),
      P.manual({ label: "(c)", marks: 2, stem: "When switched on, the PC shows \"no boot device\". Give **two** possible causes.", points: ["The storage drive's data or power cable is loose / not connected", "No operating system has been installed yet / the drive is faulty or not detected"], modelAnswer: "The drive's data or power cable may not be connected, or no operating system has been installed on the new drive." }),
    ],
    explanation: "Cooler after the CPU; RAM, motherboard, PSU, drives, cables, test; a no-boot-device message points to cables or a missing OS.",
  });

  b.card("DEFINITION", "**Troubleshooting**", "A systematic process of finding and fixing the cause of a fault, simplest causes first.");
  b.card("DEFINITION", "**Preventive maintenance**", "Regular tasks that stop faults happening: cleaning, updates, antivirus, backups, surge protection.");
  b.card("DEFINITION", "**Electrostatic discharge (ESD)**", "Static electricity jumping to a component and damaging it; prevented by an anti-static wrist strap.");
  b.card("FACT", "Safety before opening a PC", "Switch off and unplug; anti-static strap; hold parts by the edges; never open the PSU or monitor.");
  b.card("CONCEPT", "Troubleshooting steps", "Identify → check simple causes → test one change at a time → fix → test → record.");
  b.card("FACT", "RAM fault symptoms and fix", "Beeps at start-up, no boot, random crashes → reseat, test in another slot or with a known good module, replace.");
  b.card("FACT", "Failing hard drive", "Clicking, slow, corrupted files → back up immediately, run a disk check, replace and restore.");
  b.card("FACT", "Keyboard and mouse faults", "Check cable/batteries, clean, check layout setting or surface, try another port, replace.");
  b.card("CONCEPT", "Assembly order (outline)", "CPU → cooler → RAM → motherboard into case → PSU → drives → expansion cards → cables → close → test.");
});
