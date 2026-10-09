// Slice w3a: mobile and wireless technologies (comp.network.wireless-mobile, ZIMSEC only).
import { concept, P } from "../lib.mjs";

concept("comp.network.wireless-mobile", { file: "network/wireless-mobile", keyPrefix: "network.wireless-mobile" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which wireless technology is most often used to link a phone to wireless earphones?",
    options: [
      ["Bluetooth", "Correct: low-power, short-range links between nearby devices."],
      ["WiMAX", "WiMAX is wireless broadband over kilometres."],
      ["Microwave", "Microwave links join towers or satellites."],
      ["Satellite", "Satellites relay signals over very long distances."],
    ],
    answer: "A",
    explanation: "Bluetooth is designed for short-range, low-power connections such as earphones, keyboards and car kits.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does a TV remote control that uses infra-red stop working when someone stands between it and the television?",
    options: [
      ["Infra-red needs a clear line of sight", "Correct: the person blocks the infra-red beam."],
      ["Infra-red signals pass through people but not furniture", "Infra-red is blocked by any solid object."],
      ["The remote and TV must be paired again", "Pairing is a Bluetooth feature."],
      ["Infra-red only works over several kilometres", "Infra-red works over only a few metres."],
    ],
    answer: "A",
    explanation: "Infra-red travels in straight lines and is blocked by solid objects, so the sender must 'see' the receiver.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main difference between Wi-Fi and WiMAX?",
    options: [
      ["WiMAX covers kilometres; Wi-Fi covers tens of metres", "Correct: WiMAX is wide-area wireless broadband."],
      ["Wi-Fi uses cables; WiMAX is wireless", "Both are wireless."],
      ["WiMAX is only for TV remote controls", "That is infra-red."],
      ["Wi-Fi needs a line of sight; WiMAX does not", "Wi-Fi does not need a line of sight."],
    ],
    answer: "A",
    explanation: "Wi-Fi provides a wireless LAN within a building; WiMAX provides wireless broadband over a much larger area.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How does a GPS receiver in a phone work out its position?",
    options: [
      ["From signals received from several satellites", "Correct: it uses timing signals from navigation satellites."],
      ["By asking the nearest Wi-Fi access point for a map", "GPS uses satellites, not Wi-Fi."],
      ["From an infra-red beam sent by a tower", "Infra-red works only over a few metres."],
      ["By pairing with other phones nearby using Bluetooth", "Bluetooth does not provide location."],
    ],
    answer: "A",
    explanation: "A GPS receiver calculates its position from the signals of several navigation satellites.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["The link must cover a long distance between two fixed points that can see each other."],
    stem: "A telecoms company joins two masts on hilltops 30 km apart with dishes pointing at each other. Which technology is it using?",
    options: [
      ["Microwave", "Correct: point-to-point microwave links need line of sight between dishes."],
      ["Bluetooth", "Bluetooth reaches about 10 m."],
      ["Infra-red", "Infra-red reaches only a few metres."],
      ["Wi-Fi", "Wi-Fi covers tens of metres from an access point."],
    ],
    answer: "A",
    explanation: "Microwave links carry data between towers tens of kilometres apart, as long as the dishes have a line of sight.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Which waves pass through walls and spread out from one transmitter?"],
    stem: "Why are radio waves used for broadcasting to thousands of listeners?",
    options: [
      ["They spread out over long distances and pass through walls", "Correct: one transmitter reaches many receivers."],
      ["They need a direct line of sight to each radio", "That is true of infra-red and microwave, not broadcast radio."],
      ["They can only travel a few metres, so they are private", "Radio waves travel long distances."],
      ["Each radio must be paired with the transmitter first", "Pairing is a Bluetooth feature."],
    ],
    answer: "A",
    explanation: "Radio waves travel far and pass through buildings, so one transmitter can serve a whole region.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Think about distance travelled by the signal."],
    stem: "Which is a **disadvantage** of satellite internet for a remote school?",
    options: [
      ["A delay, because signals travel a very long way to the satellite and back", "Correct: the long path causes noticeable delay."],
      ["It can only be used within a few metres of the satellite", "Satellites cover huge areas."],
      ["It needs a cable laid all the way from the school to the nearest town", "Satellite links need no cable to town."],
      ["It works only with infra-red devices", "Satellite equipment uses microwaves."],
    ],
    answer: "A",
    explanation: "Satellite links reach remote places but are costly, add delay and can be disrupted by heavy storms.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["The village is several kilometres from the provider and has no cables.", "Compare range."],
    stem: "An internet provider wants to give broadband to 200 homes in a village 5 km from its nearest tower, without laying cables. Which technology is most suitable?",
    options: [
      ["WiMAX", "Correct: wide-area wireless broadband over several kilometres."],
      ["Wi-Fi from one access point", "One Wi-Fi access point covers only tens of metres."],
      ["Bluetooth", "Bluetooth reaches about 10 m."],
      ["Infra-red", "Infra-red needs line of sight and reaches a few metres."],
    ],
    answer: "A",
    explanation: "WiMAX base stations serve homes kilometres away, so it suits wireless broadband to a village.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Two Bluetooth devices must usually be paired before they can exchange data.",
    answer: true,
    explanation: "True. Pairing links the two devices so that only they exchange data.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Infra-red signals can pass through walls, so a remote control works from another room.",
    answer: false,
    explanation: "False. Infra-red is blocked by walls and needs a line of sight.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each use to the most suitable wireless technology.",
    pairs: [
      ["Connecting laptops to the internet in a school library", "Wi-Fi"],
      ["A hands-free kit linking a phone to a car's speakers", "Bluetooth"],
      ["Changing channels on a television", "Infra-red"],
      ["Broadcasting a national news programme", "Radio waves"],
    ],
    explanation: "Library: Wi-Fi. Car kit: Bluetooth. Remote control: infra-red. Broadcasting: radio waves.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each mobile technology to a role it plays in communication.",
    pairs: [
      ["Smartphone", "Voice calls, messaging and mobile money from almost anywhere"],
      ["Tablet", "Larger touch screen for e-learning and video calls"],
      ["PDA", "Handheld organiser or data-collection device"],
      ["Communication satellite", "Relays television and internet to remote areas"],
    ],
    explanation: "Each device's role follows from its size and connections; satellites relay signals over long distances.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Bluetooth has a range of about {{blank:a}}. Wi-Fi devices connect to a wireless {{blank:b}} point. Microwave and infra-red links both need a clear line of {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["10 m"], choices: ["10 m", "100 m", "5 km", "50 km"] },
      { id: "b", accepted: ["access"], choices: ["access", "satellite", "pairing", "base"] },
      { id: "c", accepted: ["sight"], choices: ["sight", "code", "cable", "power"] },
    ],
    explanation: "Bluetooth: about 10 m. Wi-Fi: wireless access point. Microwave and infra-red: line of sight.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the wireless technology used by most television remote controls.",
    accepted: ["infra-red", "infrared", "infra red", "IR"],
    wrong: ["Bluetooth"],
    explanation: "Most remote controls send infra-red pulses to the television.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Think of banking and of reaching people in rural areas."],
    stem: "Describe **two** ways in which mobile phones have improved communication for people in rural Zimbabwe.",
    points: [
      "People can call or message family, clinics or buyers without travelling / from almost anywhere with coverage",
      "Mobile money and mobile data give access to banking, market prices, weather or e-learning without visiting a town",
    ],
    explanation: "Mobile phones bring calls, messaging, banking and information to places without landlines or banks.",
    modelAnswer: "A farmer can phone a buyer or a vet instead of travelling to town, and can use mobile money to pay suppliers and receive payments without a bank branch nearby.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    hints: ["Consider coverage, cost and delay."],
    stem: "A conservation team works in a remote part of Gonarezhou with no mobile signal. Explain why it might use satellite communication, and give **one** drawback.",
    points: [
      "Satellites cover remote areas where there are no masts or cables",
      "so the team can make calls / send data / use GPS from anywhere in the park",
      "Drawback: expensive equipment and airtime / signal delay / disrupted by storms or blocked by thick trees",
    ],
    explanation: "Satellites reach anywhere under their coverage, at a cost in money and delay.",
    modelAnswer: "A satellite phone works anywhere under the satellite's coverage, with no need for a mast, so rangers can report sightings and emergencies from deep in the park. However, satellite equipment and calls are expensive.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Match range to the distance in each situation.", "Pairing and low power are Bluetooth features."],
    stem: "Thandeka runs a guest house in Kariba. She wants guests to use the internet in their rooms, a wireless speaker in the lounge and a link to the internet provider's tower 8 km away.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which technology should give guests internet access in their rooms?",
        options: [
          ["Wi-Fi", "Correct: a wireless LAN covering the building."],
          ["Infra-red", "Needs line of sight and reaches a few metres."],
          ["Bluetooth", "Too short a range for a whole guest house."],
          ["Satellite TV", "Satellite TV broadcasts television; it is not the guest house's local network."],
        ],
        answer: "A", explanation: "Wi-Fi provides wireless access within a building.",
      }),
      P.short({
        label: "(b)", stem: "Name a wireless technology that could link the guest house to the provider's tower 8 km away.",
        accepted: ["WiMAX", "Wi-MAX", "microwave", "microwaves", "a microwave link", "microwave link", "microwave links"],
        wrong: ["Bluetooth"],
        explanation: "WiMAX or a microwave link both cover several kilometres.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain why Bluetooth is suitable for the wireless speaker in the lounge.",
        points: [
          "The speaker is close to the phone/device, within Bluetooth's short range (about 10 m)",
          "Bluetooth uses little power / devices pair easily without a network",
        ],
        modelAnswer: "The guest's phone is only a few metres from the speaker, within Bluetooth's range, and Bluetooth uses little power and pairs directly without needing the Wi-Fi network.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Guests in the far rooms complain that Wi-Fi is slow. Suggest **two** reasons.",
        points: [
          "The signal weakens with distance and thick walls",
          "The bandwidth is shared between many users / interference from other devices",
        ],
        modelAnswer: "The far rooms are a long way from the access point and the signal passes through thick walls, and many guests are sharing the same bandwidth at once.",
      }),
    ],
    explanation: "(a) Wi-Fi (b) WiMAX or microwave.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    hints: ["Mobile networks use masts serving cells.", "Weigh benefits against limits such as battery and coverage."],
    stem: "An agricultural extension service in Masvingo province gives its field officers tablets with mobile data.",
    parts: [
      P.tf({
        label: "(a)", stem: "A tablet with mobile data connects to the internet through the mobile network's masts (base stations).",
        answer: true, explanation: "True. Mobile data uses the masts of the mobile network.",
      }),
      P.match({
        label: "(b)", stem: "Match each task the officers do to the technology that supports it.",
        pairs: [
          ["Recording the exact location of a field", "GPS (satellite)"],
          ["Sending a report to head office from a farm", "Mobile data"],
          ["Printing at the district office without cables", "Wi-Fi"],
        ],
        explanation: "GPS gives location, mobile data works in the field, Wi-Fi serves the office LAN.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Discuss the benefits and drawbacks of giving the officers tablets instead of paper forms.",
        points: [
          "Benefit: data is sent to head office immediately, so advice and decisions are faster",
          "Benefit: photos, GPS location and video lessons can be shared with farmers",
          "Drawback: no coverage in some rural areas / cost of data",
          "Drawback: limited battery life / tablets can be lost, stolen or damaged with personal data on them",
        ],
        modelAnswer: "Reports and photos reach head office the moment they are taken, and officers can show farmers training videos and record field locations by GPS. However, some farms have no coverage, data costs money, batteries run down on long trips, and a lost tablet could expose farmers' details.",
      }),
    ],
    explanation: "(a) true (b) GPS, mobile data, Wi-Fi.",
  });

  b.card("DEFINITION", "What is a **mobile device**?", "A portable, battery-powered computing device that communicates without cables, such as a smartphone, tablet or PDA.");
  b.card("FACT", "Infra-red: range and key limitation?", "A few metres; needs a clear line of sight. Used in TV remote controls.");
  b.card("FACT", "Bluetooth: range and typical uses?", "About 10 m, low power, devices are paired. Earphones, keyboards, car hands-free kits (a PAN).");
  b.card("CONCEPT", "Wi-Fi compared with WiMAX?", "Wi-Fi: wireless LAN within tens of metres of an access point. WiMAX: wireless broadband over several kilometres.");
  b.card("FACT", "Microwave links: how are they used?", "Point-to-point links between dishes on towers (line of sight needed) and links to satellites.");
  b.card("FACT", "Why are radio waves used for broadcasting?", "They travel long distances and pass through walls, so one transmitter reaches many receivers.");
  b.card("CONCEPT", "Satellite communication: one benefit, two drawbacks?", "Reaches remote areas with no cables or masts; but expensive and the long path causes delay (also storms).");
  b.card("DEFINITION", "What does **GPS** do?", "Works out a receiver's position from signals sent by several navigation satellites.");
  b.card("CONCEPT", "Drawbacks of mobile devices?", "Small screens, limited battery life, data costs, coverage gaps, and loss or theft exposing personal data.");
});
