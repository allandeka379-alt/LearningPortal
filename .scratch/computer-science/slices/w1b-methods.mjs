// Slice w1b: methods of data transmission (comp.transmission.methods).
import { concept, P } from "../lib.mjs";

concept("comp.transmission.methods", { file: "transmission/methods", keyPrefix: "transmission.methods" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which transmission mode allows data to travel in both directions, but only in one direction at a time?",
    options: [["Half-duplex", "Correct: both ways, taking turns."], ["Simplex", "Simplex allows one direction only."], ["Full-duplex", "Full-duplex allows both directions at the same time."], ["Parallel", "Parallel describes how many bits travel at once, not the direction."]],
    answer: "A",
    explanation: "Simplex: one way. Half-duplex: both ways, one at a time. Full-duplex: both ways at once.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **serial** transmission?",
    options: [["Bits are sent one at a time along a single wire", "Correct."], ["Several bits are sent at once on separate wires", "That is parallel transmission."], ["Data is sent in one direction only", "That is simplex, a transmission mode."], ["Data is sent in both directions at once", "That is full-duplex."]],
    answer: "A",
    explanation: "Serial: one bit after another on one wire. Parallel: several bits simultaneously on several wires.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which is the best example of **full-duplex** transmission?",
    options: [["A telephone call between two people", "Correct: both people can speak and hear at the same time."], ["A television broadcast to many homes", "Viewers cannot send data back: simplex."], ["Two security guards using walkie-talkies", "Users take turns to speak: half-duplex."], ["A sensor sending readings to a data logger", "Readings travel one way only: simplex."]],
    answer: "A",
    explanation: "Full-duplex means both directions at the same time, as in a phone call.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which is the best example of **simplex** transmission?",
    options: [["A radio station broadcasting to listeners", "Correct: data travels from the station to the radios only."], ["A video call between two branches", "Both sides send and receive at once: full-duplex."], ["Two pilots taking turns on a radio channel", "Both directions, one at a time: half-duplex."], ["Browsing the web on a phone", "Requests go up and pages come down, so not simplex."]],
    answer: "A",
    explanation: "Simplex is one direction only, such as a broadcast.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is parallel transmission unsuitable over long distances?",
    options: [["The bits can arrive at slightly different times (skew)", "Correct: over long wires, bits sent together get out of step."], ["Parallel transmission can only send data one way", "Parallel describes the number of wires, not the direction."], ["Parallel cables carry only one bit at a time", "Parallel carries several bits at once."], ["Parallel signals cannot be sent through copper wire", "Parallel links do use copper wires."]],
    answer: "A",
    explanation: "Over long cables, small differences between wires cause skew; neighbouring wires can also interfere (crosstalk). Parallel also needs more expensive cable.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Inside a computer, data moves between the processor and memory over a distance of a few centimetres, and speed matters most. Which method is most suitable?",
    options: [["Parallel", "Correct: over a very short distance, sending several bits at once is fast and skew is not a problem."], ["Serial", "Serial sends one bit at a time; over a few centimetres parallel is faster."], ["Simplex", "Data must travel both to and from memory, and simplex is a direction, not the number of wires."], ["Echo check", "An echo check is an error-detection method, not a transmission method."]],
    answer: "A",
    hints: ["Think about distance and the number of bits sent at once."],
    explanation: "Parallel transmission is suited to very short distances where its speed is an advantage and skew does not arise; this is why internal buses are parallel.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Rudo says: \"Serial transmission is always slower than parallel transmission.\" Which response is best?",
    options: [["Not always: over long distances fast serial links are more reliable and can be faster", "Correct: parallel loses its advantage over distance because of skew and crosstalk."], ["Yes: serial can never be faster, because it sends only one bit at a time down a single wire", "Modern serial links are very fast; over distance they beat parallel."], ["No: serial sends several bits at once, so it is always faster", "Serial sends one bit at a time."], ["Yes: serial transmission works in one direction only", "Serial can be simplex, half- or full-duplex."]],
    answer: "A",
    hints: ["What limits parallel transmission over long cables?"],
    explanation: "Over short distances parallel is faster, but over long distances skew and interference limit it, so high-speed serial is used (for example USB and network links).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In half-duplex transmission, data can never be sent back to the device that sent the first message.",
    answer: false, daily: true,
    explanation: "False. Half-duplex allows data in both directions; the directions just take turns. One-direction-only is simplex.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A serial cable is usually cheaper than a parallel cable of the same length.",
    answer: true,
    explanation: "True. Serial needs fewer wires and smaller connectors, so the cable costs less.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each situation to its transmission mode.",
    pairs: [["A sensor sends temperatures to a data logger; nothing is sent back", "Simplex"], ["Two field rangers at Hwange talk on radios and say \"over\" when they finish", "Half-duplex"], ["A broadband connection downloads a video while uploading photos", "Full-duplex"]],
    explanation: "One way only: simplex. Both ways, taking turns: half-duplex. Both ways at once: full-duplex.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each statement to serial or parallel transmission.",
    pairs: ["Sends one bit at a time on one wire", "Sends several bits at once on several wires", "Bits can become skewed over long cables", "Used by USB connections and long network links", "Used by internal buses inside the computer"],
    right: ["Serial", "Parallel"],
    rightIndex: [0, 1, 1, 0, 1],
    explanation: "Serial: one bit at a time, used over long distances (USB, network links). Parallel: several bits at once, fast over very short distances (internal buses) but skewed over long cables.",
  });
  b.calc({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "A device sends 5 bytes of data using **serial** transmission. How many bits must travel along the single data wire, one after another?",
    value: 5 * 8, unit: "bits",
    wrong: [5],
    explanation: `Each byte is 8 bits: $5 \\times 8 = ${5 * 8}$ bits, sent one at a time.`,
    workedSolution: `1. 1 byte = 8 bits.\n2. $5 \\times 8 = ${5 * 8}$ bits.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A parallel link has 8 data wires and sends one bit on each wire at a time. How many separate sends (one bit per wire each time) are needed to transfer 6 bytes?",
    value: (6 * 8) / 8,
    wrong: [48],
    hints: ["Each send carries 8 bits, one on each wire."],
    explanation: `6 bytes = ${6 * 8} bits; ${6 * 8} ÷ 8 wires = ${(6 * 8) / 8} sends (one byte each time).`,
    workedSolution: `1. Total bits: $6 \\times 8 = ${6 * 8}$.\n2. Bits per send: 8.\n3. Sends: $${6 * 8} \\div 8 = ${(6 * 8) / 8}$.`,
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Over long distances, {{blank:a}} transmission is used because the bits in {{blank:b}} transmission can arrive out of step. A phone call is an example of {{blank:c}} transmission.",
    blanks: [
      { id: "a", accepted: ["serial"], choices: ["serial", "parallel"] },
      { id: "b", accepted: ["parallel"], choices: ["serial", "parallel"] },
      { id: "c", accepted: ["full-duplex"], choices: ["simplex", "half-duplex", "full-duplex"] },
    ],
    explanation: "Serial for long distances (no skew); a phone call is full-duplex.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    hints: ["Consider distance, interference and cost."],
    stem: "A shop in Mutare connects a till to a computer in the back office using a 25 m cable. Explain why serial transmission is more suitable than parallel. [3]",
    points: ["The distance is long, and parallel bits would skew / arrive out of step", "Serial has less interference (crosstalk) because there are fewer wires", "Serial cable is cheaper (fewer wires)"],
    modelAnswer: "Over 25 m the bits of a parallel transmission would arrive at slightly different times (skew), corrupting the data. Serial uses fewer wires, so there is less crosstalk, and the cable is cheaper.",
    explanation: "Distance, interference and cost all favour serial.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 2,
    hints: ["Does the data need to go both ways? At the same time?"],
    stem: "A car-park barrier at a shopping centre in Harare sends \"car waiting\" signals to a control computer, which sends back \"open\" commands. The two never need to be sent at the same moment. Suggest a suitable transmission mode and justify your choice. [2]",
    points: ["Half-duplex", "Data must travel both ways, but not at the same time (so the simpler half-duplex is sufficient)"],
    modelAnswer: "Half-duplex, because signals must go both ways (requests and commands) but never at the same time.",
    explanation: "Both directions, taking turns: half-duplex. Full-duplex would also work but is not needed.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["For each method, link your reason to distance or direction."],
    stem: "A secondary school in Gweru has a weather station on its roof. Sensors send readings along a 60 m cable to a computer in the geography room. The computer never sends data back to the sensors. Students also use the computer for video lessons with a school in Bulawayo.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which mode describes the link from the sensors to the computer?", options: [["Simplex", "Correct: one direction only."], ["Half-duplex", "Nothing is sent back to the sensors."], ["Full-duplex", "Nothing is sent back at all."], ["Parallel", "Parallel is not a direction mode."]], answer: "A", explanation: "Data goes one way only." }),
      P.mcq({ label: "(b)", stem: "Which mode is needed for the video lessons?", options: [["Full-duplex", "Correct: both schools send and receive at once."], ["Simplex", "The schools must talk to each other."], ["Half-duplex", "Taking turns would make a live conversation awkward."], ["Serial", "Serial is not a direction mode."]], answer: "A", explanation: "Both directions at the same time." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why serial rather than parallel transmission should be used on the 60 m cable.", points: ["Over a long distance parallel bits suffer skew / arrive out of step", "Serial uses fewer wires: less interference and cheaper cable"], modelAnswer: "Parallel bits would arrive out of step over 60 m, and serial cable has fewer wires, so it is cheaper and suffers less crosstalk." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give **one** advantage and **one** disadvantage of parallel transmission.", points: ["Advantage: faster over short distances (several bits at once)", "Disadvantage: skew / crosstalk over long distances, or more expensive cabling"], modelAnswer: "It is faster over short distances because several bits travel at once, but over long cables the bits get out of step and the cable is expensive." }),
    ],
    explanation: "Sensors to computer: serial simplex. Video lesson: full-duplex.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    hints: ["Define each mode before choosing one."],
    stem: "A mining company near Zvishavane uses radio handsets underground. At the moment each handset can either transmit or receive, and the user presses a button to talk.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which transmission mode do the handsets use now?", options: [["Half-duplex", "Correct: both ways, one at a time."], ["Simplex", "Users can reply, so it is not one-way."], ["Full-duplex", "Users cannot talk and listen at the same time."], ["Serial", "Serial is not a mode of direction."]], answer: "A", explanation: "Press to talk: half-duplex." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe the difference between half-duplex and full-duplex transmission.", points: ["Half-duplex: data both directions but only one direction at a time", "Full-duplex: data both directions simultaneously"], modelAnswer: "Half-duplex sends data both ways, but only one way at a time; full-duplex sends both ways at the same time." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain **one** benefit to the miners of changing to full-duplex handsets.", points: ["Both people can speak and listen at the same time", "so an urgent warning can interrupt immediately / no waiting for the channel, which matters for safety"], modelAnswer: "Both people can talk at once, so a warning can be given immediately without waiting for the other person to finish, which is safer underground." }),
    ],
    explanation: "Press-to-talk radios are half-duplex; full-duplex allows simultaneous two-way speech.",
  });

  b.card("DEFINITION", "**Serial** transmission", "Bits are sent one at a time, one after another, along a single wire.");
  b.card("DEFINITION", "**Parallel** transmission", "Several bits are sent at the same time, each on its own wire.");
  b.card("DEFINITION", "**Simplex**", "Data travels in one direction only (e.g. broadcast radio, sensor to data logger).");
  b.card("DEFINITION", "**Half-duplex**", "Data travels in both directions, but only one direction at a time (e.g. walkie-talkies).");
  b.card("DEFINITION", "**Full-duplex**", "Data travels in both directions at the same time (e.g. a phone call).");
  b.card("DEFINITION", "What is **skew**?", "Bits of one parallel transmission arriving at slightly different times, getting out of step over long cables.");
  b.card("CONCEPT", "Why use serial over long distances?", "No skew, less crosstalk and cheaper cable with fewer wires.");
  b.card("CONCEPT", "Where is parallel transmission used?", "Over very short distances where speed matters, such as internal buses inside a computer.");
  b.card("CONCEPT", "Two ideas describe every connection", "How many bits at once (serial or parallel) and direction (simplex, half-duplex, full-duplex).");
});
