// Slice w1b: ZIMSEC Paper 2 exam-format items (STRUCTURED, 10 marks, ANALYSIS, ZIMSEC only).
import { concept, P, L, ZIM, truthRows } from "../lib.mjs";

const ABC = ["A", "B", "C"];
const col = (f) => truthRows(ABC, f).map((r) => r.out).join("");
const C = (k) => `comp.${k}`;
const fx = (a, b, c) => L.nand(L.or(a, b), c); // (A OR B) NAND C

concept(C("logic.gates"), { file: "exam/w1b-zimsec", keyPrefix: "exam.w1b-zimsec", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900,
    concepts: [C("logic.gates"), C("logic.truth-tables"), C("logic.circuits-expressions")],
    hints: ["NAND gives 0 only when both of its inputs are 1.", "Turn \"and\", \"or\", \"not\" in the statement into operators, keeping the grouping."],
    stem: "This question is about logic gates and truth tables.",
    parts: [
      P.short({ label: "(a)", stem: "A logic gate symbol is a triangle with a small circle at its point. Name the gate.", accepted: ["NOT", "NOT gate", "inverter"], wrong: ["NAND"], explanation: "Triangle with a bubble: NOT (inverter)." }),
      P.mcq({ label: "(b)", stem: "Which statement describes a NOR gate?", options: [["The output is 1 only when both inputs are 0", "Correct."], ["The output is 0 only when both inputs are 1", "That is NAND."], ["The output is 1 when the inputs differ", "That is XOR."], ["The output is 1 when at least one input is 1", "That is OR."]], answer: "A", explanation: "NOR = NOT OR." }),
      P.truth({ label: "(c)", marks: 4, stem: "A circuit is described as follows: inputs A and B go into an OR gate; the output of the OR gate and input C go into a NAND gate, whose output is X. Complete the truth table.", inputs: ABC, fn: fx, explanation: `A OR B: ${col((a, bb) => L.or(a, bb))}; X = (A OR B) NAND C: ${col(fx)}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "A borehole pump P must run when the tank is not full (T = 0) and there is water in the borehole (W = 1). Write the logic expression for P.", points: ["`NOT T` used for \"tank not full\"", "Joined to `W` with AND: `P = (NOT T) AND W`"], modelAnswer: "P = (NOT T) AND W" }),
      P.manual({ label: "(e)", marks: 2, stem: "Describe the logic circuit for `X = (A AND B) XOR C`, naming each gate and its inputs.", points: ["A and B go into an AND gate", "The output of the AND gate and C go into an XOR gate whose output is X"], modelAnswer: "Inputs A and B go into an AND gate; its output and input C go into an XOR gate, whose output is X." }),
    ],
    explanation: `(c) X = ${col(fx)}. (d) P = (NOT T) AND W.`,
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900,
    concepts: [C("transmission.methods"), C("hardware.ports-usb")],
    hints: ["Direction: simplex, half-duplex, full-duplex.", "Number of bits at once: serial or parallel."],
    stem: "A secondary school in Kwekwe is improving its communication systems.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which term describes data travelling in both directions, but only one direction at a time?", options: [["Half-duplex", "Correct."], ["Simplex", "One direction only."], ["Full-duplex", "Both directions at once."], ["Serial", "Serial describes bits sent one at a time."]], answer: "A", explanation: "Half-duplex." }),
      P.match({ label: "(b)", stem: "Match each school system to its transmission mode.", pairs: ["The public-address system plays announcements from the office to classrooms", "Teachers on duty use two-way radios and take turns to speak", "The head holds a video call with the district office"], right: ["Simplex", "Half-duplex", "Full-duplex"], rightIndex: [0, 1, 2], explanation: "One way: simplex; taking turns: half-duplex; both at once: full-duplex." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe the difference between serial and parallel transmission.", points: ["Serial: bits are sent one at a time along a single wire", "Parallel: several bits are sent at the same time along several wires"], modelAnswer: "Serial sends one bit at a time on a single wire; parallel sends several bits at once, each on its own wire." }),
      P.manual({ label: "(d)", marks: 2, stem: "The school connects a computer to a printer 30 m away. Explain why serial transmission is used.", points: ["Over a long distance parallel bits arrive out of step (skew) / suffer interference", "Serial needs fewer wires, so the cable is cheaper (and more reliable)"], modelAnswer: "Over 30 m parallel bits would get out of step, causing errors; serial uses fewer wires, so it is reliable and cheaper." }),
      P.manual({ label: "(e)", marks: 2, stem: "The printer is connected by USB but does not print. State **two** checks a technician should make.", points: ["The cable is firmly connected at both ends / try another port or cable", "The printer is powered on and its driver is installed / it is selected as the default printer"], modelAnswer: "Check the USB cable is firmly connected (or try another port), and check the printer is on and its driver is installed." }),
    ],
    explanation: "Half-duplex; PA simplex, radios half-duplex, video call full-duplex; serial for long distances.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900,
    concepts: [C("internet.web-browsing"), C("internet.cookies")],
    hints: ["The DNS gives an IP address; the web server sends the page.", "Session cookies end when the browser closes."],
    stem: "Tatenda uses a web browser to visit `https://www.hararehardware.co.zw/tools/drills.html` (a fictional shop).",
    parts: [
      P.mcq({ label: "(a)", stem: "Which statement about the internet and the world wide web is correct?", options: [["The web is the pages accessed using the internet", "Correct."], ["The internet is a collection of web pages", "The internet is the infrastructure."], ["The web is the cables between networks", "That is the internet."], ["They are the same thing", "They are different."]], answer: "A", explanation: "Internet = infrastructure; web = pages." }),
      P.short({ label: "(b)", stem: "State the domain name in the URL.", accepted: ["www.hararehardware.co.zw", "hararehardware.co.zw"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["https"], explanation: "The domain name runs from after :// to the first single /." }),
      P.short({ label: "(c)", stem: "State the protocol in the URL.", accepted: ["https", "hypertext transfer protocol secure"], wrong: ["http"], explanation: "The protocol is before ://." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe how the web page is found and displayed.", points: ["The domain name is sent to a DNS server, which returns the IP address", "The browser sends a request to the web server at that IP address", "The web server sends the HTML, which the browser renders and displays"], modelAnswer: "The browser asks a DNS server for the IP address of www.hararehardware.co.zw. It sends an HTTPS request to the web server at that address, which returns the HTML of drills.html; the browser renders it." }),
      P.mcq({ label: "(e)", stem: "Tatenda adds a drill to his basket. Which kind of cookie keeps it there while he browses other pages?", options: [["Session cookie", "Correct."], ["Persistent cookie", "Needed only during this visit."], ["Third-party cookie", "Set by other domains such as advertisers."], ["Tracking cookie", "Tracking is for adverts."]], answer: "A", explanation: "Session cookie." }),
      P.manual({ label: "(f)", marks: 2, stem: "State **two** other uses of cookies on the shop's website.", points: ["Saving personal details / storing login details", "Remembering preferences (e.g. currency) / tracking browsing for adverts"], modelAnswer: "Storing his login details and remembering his preferred currency." }),
      P.manual({ label: "(g)", marks: 1, stem: "State **one** privacy concern about cookies.", points: ["Browsing can be tracked and a profile built / another user of a shared computer could access the account"], modelAnswer: "His browsing can be tracked to build a profile for adverts." }),
    ],
    explanation: "Web = pages; DNS → IP → web server → HTML; session cookie for the basket.",
  });
});
