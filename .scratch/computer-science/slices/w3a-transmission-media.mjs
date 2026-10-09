// Slice w3a: transmission media (comp.network.transmission-media, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const fileMb = 1500; // megabits
const slow = 50;
const fast = 500;
const tSlow = fileMb / slow;
const tFast = fileMb / fast;

concept("comp.network.transmission-media", { file: "network/transmission-media", keyPrefix: "network.transmission-media" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How does a fibre-optic cable carry data?",
    options: [
      ["As pulses of light", "Correct: light travels along glass or plastic fibres."],
      ["As electrical signals in copper", "That is how twisted pair and coaxial cables work."],
      ["As radio waves through the air", "That is wireless transmission."],
      ["As magnetic patterns on a tape", "That describes magnetic storage, not transmission."],
    ],
    answer: "A",
    explanation: "Fibre-optic cable carries data as pulses of light through thin strands of glass or plastic.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is fibre-optic cable not affected by electrical interference from nearby machinery?",
    options: [
      ["It carries light, which electromagnetic noise does not disturb", "Correct: there is no electrical signal to corrupt."],
      ["It has a thick braided copper shield around it", "That describes coaxial cable."],
      ["Its wires are twisted together to cancel the noise", "That describes twisted pair."],
      ["It sends data more slowly than copper, so errors are very rare", "Fibre is the fastest cable medium."],
    ],
    answer: "A",
    explanation: "Fibre carries light pulses, so electrical noise from motors or power lines cannot corrupt the data.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the purpose of twisting the pairs of wires in a twisted pair cable?",
    options: [
      ["To reduce interference from outside and between the pairs", "Correct: twisting cancels much of the noise."],
      ["To make the cable carry light more efficiently", "Twisted pair carries electrical signals, not light."],
      ["To make the cable stiffer so it lies flat", "Twisting makes no difference to stiffness for that purpose."],
      ["To allow the cable to carry power to the computer", "Twisting is about interference, not power."],
    ],
    answer: "A",
    explanation: "Twisting the pairs reduces crosstalk between pairs and interference from outside sources.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which cable is commonly used to connect a satellite dish to a decoder, and has a single copper core surrounded by a braided metal shield?",
    options: [
      ["Coaxial cable", "Correct: one central core, insulation, a braided shield and a sheath."],
      ["Unshielded twisted pair", "UTP has pairs of twisted wires with no shield."],
      ["Fibre-optic cable", "Fibre has glass strands, not a copper core."],
      ["Shielded twisted pair", "STP has several twisted pairs, not one core."],
    ],
    answer: "A",
    explanation: "Coaxial cable has a single copper core, insulation, a braided shield and an outer sheath.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which medium can carry data furthest without the signal fading?"],
    stem: "An internet provider is laying a link between Gweru and Kwekwe, about 60 km apart, that must carry data for thousands of customers. Which medium is most suitable?",
    options: [
      ["Fibre-optic cable", "Correct: highest bandwidth and least attenuation over long distances."],
      ["Unshielded twisted pair", "Twisted pair is limited to short runs of about 100 m."],
      ["Coaxial cable", "Better than twisted pair, but its bandwidth and range are far below fibre."],
      ["Infra-red", "Infra-red needs line of sight and works over only a few metres."],
    ],
    answer: "A",
    explanation: "Long-distance, high-capacity links use fibre: it has the highest bandwidth and very low attenuation.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Think about cost and ease of handling for short runs."],
    stem: "Why is unshielded twisted pair still the most common cable for connecting desktop computers to switches in an office?",
    options: [
      ["It is cheap, flexible and fast enough over short distances", "Correct: for runs under about 100 m it is the sensible choice."],
      ["It has a higher bandwidth than fibre-optic cable", "Fibre has a far higher bandwidth."],
      ["It is completely immune to electrical noise", "UTP has the lowest noise immunity of the cables."],
      ["It can carry data much further than coaxial cable", "Coaxial carries data further than UTP."],
    ],
    answer: "A",
    explanation: "UTP is cheap, thin and easy to install; within an office its limited range and noise immunity do not matter.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What can anyone within range of a wireless signal do?"],
    stem: "Which is a **disadvantage** of wireless media compared with cables?",
    options: [
      ["Anyone in range can receive the signal, so it is less secure", "Correct: wireless data should be encrypted."],
      ["New users always need a new cable run to their desk", "That is a drawback of cables, not wireless."],
      ["The signal travels as light inside glass", "That describes fibre-optic cable."],
      ["It cannot be used by portable devices", "Wireless suits portable devices best."],
    ],
    answer: "A",
    explanation: "Wireless signals spread through the air, so they can be intercepted; they are also affected by walls, distance and interference.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["The workshop has heavy electrical machines.", "Weigh noise immunity against cost."],
    stem: "A factory in Bulawayo needs a cable run of 70 m beside large electric motors. The budget is tight. Which choice is the best compromise?",
    options: [
      ["Shielded twisted pair", "Correct: the shield reduces noise, the run is within range, and it costs less than fibre."],
      ["Unshielded twisted pair", "Cheap, but the motors' interference would corrupt data."],
      ["Fibre-optic cable", "Immune to noise, but the most expensive option when the budget is tight."],
      ["Infra-red link", "Infra-red needs a clear line of sight and works over only a few metres."],
    ],
    answer: "A",
    explanation: "STP's shield protects against the motors' noise over a 70 m run at lower cost than fibre.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Coaxial cable has better noise immunity than unshielded twisted pair cable.",
    answer: true,
    explanation: "True. Coaxial cable's braided metal shield protects its core from much of the outside interference.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Fibre-optic cable is the cheapest and easiest cable to join and install.",
    answer: false,
    explanation: "False. Fibre is the most expensive to install; its fragile fibres need special equipment and skills to join.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each medium to the statement that describes it.",
    pairs: [
      ["Twisted pair", "Cheap, flexible copper wires, limited to about 100 m"],
      ["Coaxial", "A single copper core with a braided shield"],
      ["Fibre-optic", "Light pulses in glass; highest bandwidth"],
      ["Wireless", "No cables; signals can be received by anyone in range"],
    ],
    explanation: "Twisted pair: cheap copper. Coaxial: shielded core. Fibre: light, highest bandwidth. Wireless: no cables, less secure.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["Look for distance, noise, cost and mobility in each situation."],
    stem: "Match each situation to the most suitable medium.",
    pairs: [
      ["Linking two towns 40 km apart at high speed", "Fibre-optic cable"],
      ["Connecting desktops to a switch in a quiet office", "Unshielded twisted pair"],
      ["Letting customers' phones go online in a café", "Wireless (Wi-Fi)"],
    ],
    explanation: "Long distance and high bandwidth: fibre. Short, cheap runs: UTP. Mobile devices: wireless.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false, unit: "s",
    hints: ["Time = data ÷ bandwidth.", "Both values are already in megabits."],
    stem: `A school uploads a ${fileMb}-megabit video lesson over a ${slow} Mbit/s link. Calculate how many seconds the upload takes (ignore any delays).`,
    value: tSlow,
    wrong: [fileMb * slow],
    explanation: `Time = ${fileMb} ÷ ${slow} = ${tSlow} s.`,
    workedSolution: `1. Time = amount of data ÷ bandwidth.\n2. ${fileMb} megabits ÷ ${slow} Mbit/s = ${tSlow} s.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false, unit: "s",
    hints: ["Use the same file and divide by the new bandwidth."],
    stem: `The school upgrades to a ${fast} Mbit/s fibre link. How many seconds does the same ${fileMb}-megabit upload now take?`,
    value: tFast,
    wrong: [tSlow],
    explanation: `${fileMb} ÷ ${fast} = ${tFast} s: ten times the bandwidth gives one tenth of the time.`,
    workedSolution: `1. Time = data ÷ bandwidth.\n2. ${fileMb} ÷ ${fast} = ${tFast} s.`,
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The amount of data a medium can carry each second is its {{blank:a}}. The weakening of a signal as it travels along a cable is called {{blank:b}}. Unwanted signals that corrupt data are called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["bandwidth"], choices: ["bandwidth", "attenuation", "noise", "latency"] },
      { id: "b", accepted: ["attenuation"], choices: ["bandwidth", "attenuation", "noise", "latency"] },
      { id: "c", accepted: ["noise"], choices: ["bandwidth", "attenuation", "noise", "latency"] },
    ],
    explanation: "Bandwidth: data per second. Attenuation: signal weakening. Noise (interference): unwanted signals.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["One point about distance, one about interference or bandwidth."],
    stem: "Give **two** reasons why fibre-optic cable is used for links between towns instead of twisted pair.",
    points: [
      "Fibre carries data over long distances with little attenuation (twisted pair is limited to short runs)",
      "Fibre has a much higher bandwidth / is immune to electrical interference",
    ],
    explanation: "Fibre's low attenuation, high bandwidth and immunity to electrical noise suit long links.",
    modelAnswer: "Fibre carries light many kilometres without the signal fading, whereas twisted pair only works up to about 100 m, and fibre has a far higher bandwidth for thousands of users.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    hints: ["Think about cost, mobility, speed and security."],
    stem: "A secondary school in Masvingo is equipping a new library with 15 desktop computers and wants learners to use their tablets there too. Recommend media for the library and justify your answer.",
    points: [
      "Twisted pair (UTP) cable for the desktops",
      "because the desktops stay in one place, and cable is cheap, faster and more secure over short distances",
      "Wireless (Wi-Fi) for the tablets, because they move about and have no network port",
    ],
    explanation: "Fixed devices suit cheap, fast cable; mobile devices need wireless.",
    modelAnswer: "Connect the 15 desktops with twisted pair to a switch, because they never move and cable is cheap, fast and harder to intercept over these short runs. Add a Wi-Fi access point for the tablets, because they are carried around and cannot plug in.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Match each medium to distance, noise and cost.", "Time = data ÷ bandwidth."],
    stem: "A sugar estate near Chiredzi has a head office and a mill 2 km apart. The mill has large electric motors. The estate also wants internet access for workers' phones in the canteen.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which medium should link the head office to the mill?",
        options: [
          ["Fibre-optic cable", "Correct: long distance, high bandwidth, immune to the motors' noise."],
          ["Unshielded twisted pair", "Too short a range and poor noise immunity."],
          ["Bluetooth", "Bluetooth reaches only about 10 m."],
          ["Infra-red", "Infra-red works only over a few metres in line of sight."],
        ],
        answer: "A", explanation: "Fibre: long range, high bandwidth, no electrical interference.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain why the motors at the mill make unshielded twisted pair unsuitable there.",
        points: [
          "The motors produce electrical noise/interference",
          "which corrupts the electrical signals in unshielded copper wires (causing errors and retransmissions)",
        ],
        modelAnswer: "Large motors give off electromagnetic interference, and unshielded copper picks it up, so the data would be corrupted.",
      }),
      P.num({
        label: "(c)", stem: "A 900-megabit backup file is sent from the mill to head office over a 300 Mbit/s link. How many seconds does it take?",
        value: 900 / 300, unit: "s", wrong: [900 * 300],
        explanation: `900 ÷ 300 = ${900 / 300} s.`,
        workedSolution: `1. Time = data ÷ bandwidth.\n2. 900 ÷ 300 = ${900 / 300} s.`,
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Describe **one** advantage and **one** disadvantage of using wireless media in the canteen.",
        points: [
          "Advantage: workers' phones connect without cables / many users can join easily",
          "Disadvantage: lower security (signals can be intercepted) / bandwidth shared between users / affected by walls and interference",
        ],
        modelAnswer: "Phones can connect without any cables, but the signal can be picked up by anyone in range, so it must be encrypted.",
      }),
    ],
    explanation: "(a) fibre-optic (c) 3 s.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    hints: ["Compare the cables on at least two features.", "Coaxial is between twisted pair and fibre on most features."],
    stem: "Nyasha is advising a small internet café in Mutare that is replacing its old coaxial cabling.",
    parts: [
      P.tf({
        label: "(a)", stem: "Coaxial cable is thinner and more flexible than twisted pair cable.",
        answer: false, explanation: "False. Coaxial is thicker and stiffer than twisted pair.",
      }),
      P.match({
        label: "(b)", stem: "Match each feature to the medium that has it.",
        pairs: [
          ["Lowest cost per metre", "Twisted pair"],
          ["Immune to electrical interference", "Fibre-optic"],
          ["Copper core inside a braided shield", "Coaxial"],
        ],
        explanation: "Twisted pair is cheapest; fibre is immune to electrical noise; coaxial has a shielded core.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Compare twisted pair and fibre-optic cable for the café's 20 computers, which are all within 30 m of the switch. Recommend one.",
        points: [
          "Twisted pair is much cheaper and easier to install/join",
          "Fibre has higher bandwidth / is immune to interference / carries data further",
          "Within 30 m, twisted pair's range and bandwidth are enough",
          "Recommends twisted pair for the café (or fibre with a justified reason)",
        ],
        modelAnswer: "Twisted pair costs far less and is easy to cut and fit, while fibre gives more bandwidth, longer range and immunity to interference. All the computers are within 30 m, well inside twisted pair's range, and a café does not need fibre's speed to each desk, so twisted pair is the sensible choice.",
      }),
    ],
    explanation: "(a) false (b) twisted pair, fibre-optic, coaxial.",
  });

  b.card("DEFINITION", "What is a **transmission medium**?", "The cable or wireless signal that carries data between devices on a network.");
  b.card("DEFINITION", "What is **bandwidth**?", "The amount of data a medium can carry per second, measured in bits per second.");
  b.card("DEFINITION", "What is **attenuation**?", "The weakening of a signal as it travels along a medium; it limits the distance data can be sent.");
  b.card("CONCEPT", "Twisted pair cable: one advantage, one disadvantage?", "Cheap, thin and flexible; but short range (about 100 m) and the lowest noise immunity.");
  b.card("CONCEPT", "Coaxial cable: structure and main benefit?", "A copper core, insulation, braided metal shield and sheath; the shield gives better noise immunity than twisted pair.");
  b.card("CONCEPT", "Fibre-optic cable: three advantages?", "Highest bandwidth, longest distance with little attenuation, immune to electrical interference (and hard to tap).", "Disadvantages: most expensive; fragile; needs skilled joining.");
  b.card("CONCEPT", "Wireless media: one advantage, one disadvantage?", "No cables, so easy for mobile users and easy to expand; but less secure, shared bandwidth and affected by walls and interference.");
  b.card("FORMULA", "Transfer time from bandwidth?", "Time (s) = amount of data (bits) ÷ bandwidth (bits per second).", "Use the same units: megabits with Mbit/s.");
  b.card("FACT", "Why does fibre ignore electrical noise?", "It carries light, not electricity, so electromagnetic interference cannot corrupt the signal.");
});
