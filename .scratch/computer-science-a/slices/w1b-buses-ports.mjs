// Slice w1b: buses and ports (acs.cpu.buses-ports, both boards).
import { concept, P, chk } from "../lib.mjs";
import { mc, pm } from "../tables/w1b-q.mjs";

concept("acs.cpu.buses-ports", { file: "cpu/buses-ports", keyPrefix: "cpu.buses-ports" }, (b) => {
  mc(b, 1, "RECALL", "In which direction do signals travel on the address bus?",
    ["One way, from the processor to memory", "Correct: addresses are only sent by the processor."],
    [["One way, from memory to the processor", "Memory never sends addresses to the processor on this bus."], ["Both ways, as for the data bus", "The data bus is two-way; the address bus is not."], ["Both ways, depending on the clock", "The clock does not change the direction of the address bus."]],
    "The address bus is one-way: the processor chooses the location.");
  mc(b, 2, "RECALL", "Which bus carries the memory read, memory write, clock and interrupt signals?",
    ["The control bus", "Correct: it carries signals that co-ordinate the components."],
    [["The address bus", "The address bus carries only the address of a location."], ["The data bus", "The data bus carries data and instructions."], ["The serial bus", "A serial bus is a different kind of connection, not one of the three internal buses."]],
    "Control bus: read, write, clock, interrupt request, reset and similar signals.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What happens to the number of memory locations that can be addressed when one more wire is added to the address bus?",
    ["It doubles", "Correct: each extra wire doubles the number of different addresses."],
    [["It increases by one location", "Each wire doubles the combinations, it does not add just one."], ["It stays the same because the data bus decides it", "The data bus width does not decide the number of locations."], ["It is halved because each address is longer", "A longer address allows more locations, not fewer."]],
    "With n wires there are 2^n addresses, so n + 1 wires give 2 × 2^n.");
  mc(b, 2, "RECALL", "Which port carries both digital video and digital audio in one cable?",
    ["HDMI", "Correct: High-Definition Multimedia Interface carries both."],
    [["VGA", "VGA carries analogue video only."], ["A serial port for a mouse", "This is not a video port."], ["An Ethernet port", "Ethernet is used for network cabling, not for sending video to a screen."]],
    "HDMI carries digital pictures and sound together.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "Why can a picture sent through a long VGA cable look less sharp than the same picture sent through HDMI?",
    ["VGA is an analogue signal, which picks up noise", "Correct: analogue signals vary continuously and are affected by interference."],
    [["VGA sends the picture in fewer colours than HDMI always does", "The number of colours is not what makes a long cable look soft."], ["VGA is a digital signal that is lost when the cable is long", "VGA is analogue, not digital."], ["VGA uses the address bus to send the picture", "The video cable is not part of the address bus."]],
    "A digital signal is either 0 or 1 and can be recovered; an analogue signal varies continuously and picks up noise along the cable.", { hints: ["Which of the two ports is digital end to end?"] });
  mc(b, 3, "APPLICATION", "A computer has a 16-bit address bus and each address refers to one byte. What is the greatest amount of memory it can address?",
    ["64 KiB", "Correct: 2^16 = 65 536 bytes."],
    [["16 KiB", "16 KiB would need 14 address lines."], ["256 KiB", "256 KiB needs 18 address lines."], ["16 MiB", "16 MiB needs 24 address lines."]],
    "2^16 = 65 536 locations = 64 KiB.", { hints: ["2^16 = 65 536."] });
  mc(b, 3, "ANALYSIS", "A new processor has a 128-bit data bus where the old one had a 64-bit data bus, with the same number of transfers per second. What is the effect?",
    ["Twice as many bits are moved in each second", "Correct: each transfer carries twice as much data."],
    [["Twice as many memory locations can be addressed", "The number of locations depends on the address bus."], ["The memory becomes non-volatile", "Volatility is a property of the memory type."], ["The control bus is no longer needed", "The control bus is still needed for signals."]],
    "Data rate = width × transfers per second, so doubling the width doubles the data moved.", { hints: ["Which bus decides how much data moves in a transfer?"] });
  mc(b, 4, "EVALUATION", "A technician says a classroom projector only has a VGA socket, but the teacher's laptop has HDMI only and sound must also reach the speakers. Which statement is correct?",
    ["An adapter is needed and sound needs its own cable", "Correct: VGA is analogue and carries no audio."],
    [["No adapter is needed because both carry the same signal", "HDMI is digital and VGA analogue, so an adapter is needed."], ["The sound will pass through the VGA socket as well", "VGA does not carry audio."], ["HDMI cannot be converted to any other type of signal", "Adapters that convert HDMI to VGA exist."]],
    "VGA carries analogue video only, so a converter and a separate audio connection are needed.", { hints: ["Which signal is digital and which carries sound?"] });
  b.tf({ d: 2, skill: "RECALL", stem: "The data bus is a one-way bus from memory to the processor.", answer: false,
    explanation: "False. The data bus is two-way: data goes to the processor on a read and from the processor to memory on a write." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A wider address bus allows a larger number of memory locations to be addressed.", answer: true,
    explanation: "True. n address lines give 2^n locations, so more lines mean more addressable locations." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each bus or port to what it carries.",
    pairs: [["Address bus", "The address of a memory location"], ["Data bus", "Data and instructions, in both directions"], ["Control bus", "Read, write, clock and interrupt signals"], ["USB", "Serial data and a small amount of power"], ["VGA", "Analogue video only"]],
    explanation: "Each bus or port has one main kind of signal." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the steps of a memory read.",
    template: "The address is placed on the {{blank:a}} bus and the {{blank:b}} line of the control bus is activated. The contents of the location travel back on the {{blank:c}} bus and arrive in the memory data register.",
    blanks: [
      { id: "a", accepted: ["address"], choices: ["address", "data", "control", "USB"] },
      { id: "b", accepted: ["read"], choices: ["read", "write", "reset", "interrupt"] },
      { id: "c", accepted: ["data"], choices: ["data", "address", "control", "VGA"] },
    ],
    explanation: "Address bus, read line, data bus." });
  chk(2 ** 12, 4096);
  b.num({ d: 2, skill: "APPLICATION", stem: "How many different addresses can be made with a 12-wire address bus?",
    value: 4096, wrong: [144, 1024], workedSolution: "1. n wires give 2^n addresses.\n2. 2^12 = 4096.", explanation: "2^12 = 4096 addresses." });
  chk(Math.ceil(Math.log2(6 * 1024)), 13);
  b.num({ d: 3, skill: "APPLICATION", hints: ["6 KiB = 6144 locations; find the smallest n with 2^n at least that big."],
    stem: "A small controller has 6 KiB of memory with one byte per location. What is the smallest number of address lines that can address every location?",
    value: 13, wrong: [12, 6144], workedSolution: "1. 6 KiB = 6 × 1024 = 6144 locations.\n2. 2^12 = 4096 is too small.\n3. 2^13 = 8192 is enough, so 13 lines are needed.", explanation: "2^12 = 4096 < 6144 ≤ 2^13 = 8192, so 13 lines." });
  chk(2 ** 28 / 2 ** 20, 256);
  b.num({ d: 3, skill: "APPLICATION", unit: "MiB", hints: ["2^28 bytes; 1 MiB = 2^20 bytes."],
    stem: "A processor has a 28-line address bus and each address refers to one byte. What is the maximum memory it can address, in MiB?",
    value: 256, wrong: [28, 2 ** 28], workedSolution: "1. Locations = 2^28 bytes.\n2. 1 MiB = 2^20 bytes.\n3. 2^28 ÷ 2^20 = 2^8 = 256 MiB.", explanation: "2^28 ÷ 2^20 = 2^8 = 256 MiB." });
  chk((128 * 8) / 32, 32);
  b.num({ d: 3, skill: "APPLICATION", hints: ["Bits to move = bytes × 8; divide by the width."],
    stem: "A processor with a 32-bit data bus copies a block of 128 bytes from memory. How many transfers on the data bus are needed?",
    value: 32, wrong: [4, 128], workedSolution: "1. 128 bytes = 128 × 8 = 1024 bits.\n2. Each transfer carries 32 bits.\n3. 1024 ÷ 32 = 32 transfers.", explanation: "1024 bits at 32 bits per transfer is 32 transfers." });
  chk(64 * 25, 1600);
  b.calc({ d: 3, skill: "APPLICATION", unit: "Mbit/s", hints: ["Data rate = width × transfers per second."],
    stem: "A 64-bit data bus makes 25 million transfers per second. Calculate the data rate in megabits per second (Mbit/s).",
    value: 1600, wrong: [89, 400], workedSolution: "1. Bits per second = 64 × 25 000 000.\n2. = 1 600 000 000 bit/s = 1600 Mbit/s.", explanation: "64 × 25 = 1600 Mbit/s." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Four steps: address, read signal, data back, MDR."],
    stem: "Describe how the processor reads an instruction from memory using the three buses. [4]",
    points: ["The address of the instruction is copied from the MAR onto the address bus", "A memory read signal is sent along the control bus", "The contents of the addressed location are placed on the data bus by the memory", "The instruction travels along the data bus into the MDR"],
    modelAnswer: "The address goes from the MAR onto the address bus. The control bus carries a read signal. The memory places the instruction on the data bus and it arrives in the MDR.",
    explanation: "Each bus is used once, in order." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3, hints: ["Compare signal type, sound and quality."],
    stem: "Compare an HDMI connection with a VGA connection for a school projector. [3]",
    points: ["HDMI carries a digital signal whereas VGA carries an analogue signal", "HDMI carries sound as well as video; VGA carries video only", "The HDMI picture is not degraded by noise on the cable / VGA can lose sharpness"],
    modelAnswer: "HDMI is digital and also carries sound, while VGA is analogue and carries only video. A digital picture is not affected by noise, so it stays sharp, but a VGA picture can lose sharpness.",
    explanation: "Digital against analogue, audio, quality." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 2, hints: ["Who chooses the address?"],
    stem: "Explain why the address bus only needs to carry signals in one direction. [2]",
    points: ["The processor always decides which location is to be read or written", "Memory and devices only respond to the address; they never send an address back"],
    modelAnswer: "The processor decides which location it wants, so the address always travels from the processor to the memory. Memory never needs to send an address to the processor.",
    explanation: "The processor always initiates the access." });
  chk(2 ** 21, 2097152);
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Locations = 2^(address lines).", "Bits to move ÷ bus width = transfers."],
    explanation: "An 18-line address bus gives 2^18 = 262 144 locations (256 KiB); an 8-bit data bus needs 4 transfers per 32-bit word; three more lines give 2^21 locations.",
    stem: "A microcontroller for a weather station in Kariba has an 18-line address bus and an 8-bit data bus. Each memory location holds 8 bits.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the number of memory locations that can be addressed.", value: 262144, wrong: [18, 2 ** 16],
        workedSolution: "1. Locations = 2^18.\n2. 2^18 = 262 144.", explanation: "2^18 = 262 144 locations." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the memory capacity in KiB.", value: 256, unit: "KiB", wrong: [262144, 32],
        workedSolution: "1. 8 bits = 1 byte per location.\n2. Bytes = 262 144.\n3. 262 144 ÷ 1024 = 256 KiB.", explanation: "262 144 bytes = 256 KiB." }),
      P.num({ label: "(c)", marks: 2, stem: "A 32-bit word is read from memory. How many transfers on the data bus are needed?", value: 4, wrong: [1, 32],
        workedSolution: "1. 32 bits ÷ 8 bits per transfer = 4 transfers.", explanation: "32 ÷ 8 = 4." }),
      P.manual({ label: "(d)", marks: 2, stem: "State the number of locations if three more address lines are added.", points: ["Each extra line doubles the number, so it is multiplied by 8", "It becomes 2^21 = 2 097 152 locations"], modelAnswer: "Each extra line doubles the number, so three lines multiply it by eight, to 2^21 = 2 097 152 locations.", explanation: "Three doublings." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Match each port to the signal it carries."],
    explanation: "HDMI digital video and audio; VGA analogue video; USB serial data and power, hot-pluggable.",
    stem: "A teacher at a school in Gweru connects a laptop to a projector, a printer and a flash drive.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which port can supply a small amount of power to a connected flash drive?", options: [["USB", "Correct."], ["VGA", "VGA only carries video."], ["The address bus", "This is inside the computer."], ["Audio out", "This outputs an analogue sound signal, not power for a device."]], answer: "A", explanation: "USB carries data and a small amount of power." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain what is meant by hot-plugging and why it is useful.", points: ["A device can be connected or disconnected while the computer is switched on", "The user need not shut down and restart the computer"], modelAnswer: "Hot-plugging means connecting a device while the computer is on. It saves the user from shutting down and restarting.", explanation: "Definition plus benefit." }),
      P.manual({ label: "(c)", marks: 3, stem: "The projector has an HDMI input. State three advantages of using HDMI rather than VGA for this connection.", points: ["Carries sound as well as video", "Digital signal, so the picture is not degraded by noise", "A single cable and connector is needed for sound and picture"], modelAnswer: "HDMI carries sound and vision, the digital signal gives a sharper picture, and only one cable is needed.", explanation: "Audio and digital quality." }),
    ] });
  b.card("DEFINITION", "Address bus", "One-way bus carrying the address from the processor to memory; width decides the number of locations (2^n).");
  b.card("DEFINITION", "Data bus", "Two-way bus carrying data and instructions; width decides the bits moved per transfer.");
  b.card("DEFINITION", "Control bus", "Carries signals such as memory read, memory write, clock, interrupt request and reset.");
  b.card("FORMULA", "Addressable locations", "Locations = 2^(address lines).");
  b.card("FORMULA", "Data rate", "Rate = bus width × transfers per second.");
  b.card("CONCEPT", "USB", "Serial, digital, hot-pluggable port that also supplies a small amount of power.");
  b.card("CONCEPT", "HDMI", "Digital video and audio in one cable.");
  b.card("CONCEPT", "VGA", "Analogue video only; no audio; can pick up noise.");
});
