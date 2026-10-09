// Slice w3a: cyber attacks and computer crime (comp.security.cyber-attacks). Spoofing and online fraud items are ZIMSEC only.
import { concept, P, ZIM } from "../lib.mjs";

const pinDigits = 6;
const pinSpace = 10 ** pinDigits;
const codeDigits = 3;
const codeSpace = 10 ** codeDigits;

concept("comp.security.cyber-attacks", { file: "security/cyber-attacks", keyPrefix: "security.cyber-attacks" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **brute-force attack**?",
    options: [
      ["Trying many passwords by trial and error until one works", "Correct: software tries combinations until it succeeds."],
      ["Flooding a web server with requests", "That is a denial of service attack."],
      ["Sending fake emails that ask people to reply with their bank details", "That is phishing."],
      ["Physically breaking into a server room", "Brute force here means guessing passwords."],
    ],
    answer: "A",
    explanation: "A brute-force attack guesses passwords by trial and error, often starting with common passwords.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Thousands of infected computers send requests to a bank's website at the same moment, and customers cannot log in. What attack is this?",
    options: [
      ["Distributed denial of service (DDoS)", "Correct: a botnet floods the server."],
      ["Pharming through a corrupted DNS server", "Pharming redirects users to a fake site."],
      ["Brute-force attack", "Brute force guesses passwords."],
      ["Social engineering", "Social engineering manipulates people."],
    ],
    answer: "A",
    explanation: "In a DDoS attack, a botnet floods a server with requests so that genuine users cannot reach it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which attack relies on the victim clicking a link in a fake email?",
    options: [
      ["Phishing", "Correct: the link leads to a fake website."],
      ["Pharming", "Pharming redirects the user even when the correct address is typed."],
      ["Data interception", "Interception captures data in transit."],
      ["Denial of service", "DoS floods a server."],
    ],
    answer: "A",
    explanation: "Phishing emails contain links to fake websites; the attack works only if the user clicks and enters details.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["She did not click any link."],
    stem: "Rudo types the correct address of her bank's website, but a copy of the site appears and steals her login. What caused this?",
    options: [
      ["Pharming", "Correct: malicious code or a corrupted DNS server redirected her."],
      ["Phishing", "Phishing needs her to click a link in a message."],
      ["A brute-force attack", "Nobody guessed her password."],
      ["A DDoS attack", "DDoS stops access; it does not show a fake site."],
    ],
    answer: "A",
    explanation: "Pharming redirects the user to a fake site even though the genuine address was typed.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What does an attacker gain by capturing packets?"],
    stem: "What is the aim of **data interception** using a packet sniffer?",
    options: [
      ["To capture and read data, such as passwords, as it travels across a network", "Correct: the data is stolen in transit."],
      ["To stop the network carrying any data at all", "That is the aim of a denial of service attack."],
      ["To encrypt the data on the network so that nobody else can read it", "That describes ransomware or encryption, not sniffing."],
      ["To redirect users to a different website", "That is pharming."],
    ],
    answer: "A",
    explanation: "Interception captures data in transit to steal information; encryption makes intercepted data unreadable.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["The attacker used a person, not a program."],
    stem: "A caller claiming to be from the school's IT department asks a teacher for her password \"to fix her account\". What type of attack is this?",
    options: [
      ["Social engineering", "Correct: it manipulates a person into revealing information."],
      ["Hacking with a packet sniffer", "No data is being captured from the network."],
      ["Brute-force attack", "The caller is not guessing passwords."],
      ["Adware", "Adware is software that shows adverts."],
    ],
    answer: "A",
    explanation: "Social engineering tricks people, using trust or urgency, into giving away confidential information.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    hints: ["The message is disguised as coming from someone trusted."],
    stem: "An email appears to come from a school head's address, but it was actually sent by a criminal who forged the sender details. What is this called?",
    options: [
      ["Spoofing", "Correct: disguising a message as coming from a trusted source."],
      ["Sniffing", "Sniffing captures data in transit."],
      ["Pharming", "Pharming redirects web browsers."],
      ["Denial of service", "DoS floods a server."],
    ],
    answer: "A",
    explanation: "Spoofing disguises an email, caller ID or IP address so that it appears to come from a trusted source.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Which attack causes damage without stealing anything?"],
    stem: "An online shop's website is down for two days during a busy holiday, but no customer data is stolen. Which attack is most likely, and what was its effect?",
    options: [
      ["A DDoS attack; lost sales and damage to the shop's reputation", "Correct: the aim was disruption, not theft."],
      ["Phishing; customers' card details sold to criminals", "No data was stolen."],
      ["A brute-force attack; the shop's prices were changed", "Nothing suggests passwords were guessed or data changed."],
      ["Spyware; staff keystrokes recorded", "Spyware steals data; it does not take a website offline."],
    ],
    answer: "A",
    explanation: "A DDoS attack makes a website unavailable; the effect is lost business and reputation rather than stolen data.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Encrypting data prevents it from being intercepted.",
    answer: false,
    explanation: "False. Encrypted data can still be intercepted, but it cannot be understood without the key.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A botnet is a group of computers infected with malware and controlled by an attacker.",
    answer: true,
    explanation: "True. Botnets are used, for example, to carry out DDoS attacks.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each attack to how it is carried out.",
    pairs: [
      ["Brute-force attack", "Guessing passwords by trial and error"],
      ["Data interception", "Capturing packets as they travel across a network"],
      ["DDoS attack", "Flooding a server with requests from a botnet"],
      ["Phishing", "Fake emails with links to fake websites"],
      ["Social engineering", "Tricking people into giving away information"],
    ],
    explanation: "Each attack has its own method: guessing, capturing, flooding, fake messages or manipulation of people.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Each digit has 10 possible values."],
    stem: `A banking app uses a ${pinDigits}-digit PIN, where each digit can be 0 to 9. How many different PINs are possible?`,
    value: pinSpace,
    wrong: [10 * pinDigits],
    explanation: `10 choices for each of ${pinDigits} digits: 10 to the power ${pinDigits} = ${pinSpace.toLocaleString("en-GB")}.`,
    workedSolution: `1. Each digit has 10 choices.\n2. ${pinDigits} digits: ${Array(pinDigits).fill(10).join(" × ")} = ${pinSpace}.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    hints: ["Multiply the number of choices for each digit."],
    stem: `A padlock on a server cabinet has a ${codeDigits}-digit code (0 to 9 on each wheel). How many codes would a brute-force attacker have to try at most?`,
    value: codeSpace,
    wrong: [10 * codeDigits],
    explanation: `10 × 10 × 10 = ${codeSpace} codes.`,
    workedSolution: `1. Each wheel has 10 choices.\n2. 10 × 10 × 10 = ${codeSpace}.`,
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Which attack does not need a suspicious link?"],
    stem: "Complete the sentences.",
    template: "In {{blank:a}}, the user clicks a link in a fake message. In {{blank:b}}, malicious code or a corrupted {{blank:c}} server sends the user to a fake site even when the correct address is typed.",
    blanks: [
      { id: "a", accepted: ["phishing"], choices: ["phishing", "pharming", "sniffing", "hacking"] },
      { id: "b", accepted: ["pharming"], choices: ["phishing", "pharming", "sniffing", "hacking"] },
      { id: "c", accepted: ["DNS"], choices: ["DNS", "email", "print", "file"] },
    ],
    explanation: "Phishing: a link in a fake message. Pharming: redirection by malicious code or a corrupted DNS server.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of software a hacker uses to capture data packets travelling across a network.",
    accepted: ["packet sniffer", "a packet sniffer", "sniffer", "packet sniffing software", "packet analyser", "packet analyzer"],
    wrong: ["firewall"],
    explanation: "A packet sniffer captures packets for data interception.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Describe the botnet, the flood and the result."],
    stem: "Describe how a distributed denial of service (DDoS) attack is carried out and what it aims to do.",
    points: [
      "The attacker infects many computers with malware to create a botnet",
      "The botnet sends a flood of requests to a web server at the same time",
      "The server is overwhelmed, slows or crashes, so genuine users cannot access the service (aim: disruption)",
    ],
    explanation: "DDoS uses many machines to overload one server; the aim is to deny the service to genuine users.",
    modelAnswer: "The attacker uses malware to take control of thousands of computers, forming a botnet. On command they all send requests to the target web server at once. The server cannot handle them, slows down or crashes, and genuine customers cannot use the website.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    hints: ["Cover individuals and the organisation, with money, data and reputation."],
    stem: "A hacker gains unauthorised access to a medical aid society's database and copies members' personal details. Describe the possible effects on the members and on the society.",
    points: [
      "Members: identity theft / fraud using their personal details",
      "Members: distress, embarrassment or targeted phishing because private medical details are exposed",
      "Society: loss of members' trust and damage to its reputation",
      "Society: financial cost of investigating and repairing systems / legal penalties under data protection law",
    ],
    explanation: "Effects fall on the people whose data is stolen and on the organisation that failed to protect it.",
    modelAnswer: "Members could suffer identity theft or be targeted by convincing phishing emails, and could be distressed that private medical details are known. The society would lose members' trust and may lose members, would pay to investigate and secure its systems, and could face penalties for failing to protect personal data.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Look for the clue words in each incident.", "Count the combinations."],
    stem: "A security officer at a Harare company records three incidents in one month.",
    parts: [
      P.match({
        label: "(a)", stem: "Match each incident to the attack.",
        pairs: [
          ["Software tried thousands of passwords on the manager's account overnight", "Brute-force attack"],
          ["Staff received emails \"from the bank\" asking them to confirm their PIN on a website", "Phishing"],
          ["The company website could not be reached because of a flood of requests", "DDoS attack"],
        ],
        extraRight: ["Pharming"],
        explanation: "Trial and error: brute force. Fake email with a link: phishing. Flood of requests: DDoS.",
      }),
      P.num({
        label: "(b)", stem: "The door to the server room has a keypad with a 5-digit code (0 to 9). How many codes are possible?",
        value: 10 ** 5, wrong: [50],
        explanation: `10 × 10 × 10 × 10 × 10 = ${10 ** 5}.`,
        workedSolution: `1. Each digit has 10 choices.\n2. 10 × 10 × 10 × 10 × 10 = ${10 ** 5}.`,
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Describe **two** aims an attacker might have when carrying out the brute-force attack.",
        points: [
          "To gain unauthorised access to the manager's account / the company system",
          "To steal, change or delete data / install malware / use the account to commit fraud",
        ],
        modelAnswer: "To get into the manager's account without permission, and then to steal confidential company data or use the account to send fraudulent payments.",
      }),
    ],
    explanation: "(a) brute force, phishing, DDoS (b) 100000.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    hints: ["Who or what is being tricked in each case?", "Shoulder surfing and baiting are forms of social engineering."],
    stem: "Thandeka is preparing a cyber security talk for her school's parents' evening.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which example is social engineering?",
        options: [
          ["Watching over someone's shoulder as they type a PIN", "Correct: shoulder surfing tricks or exploits a person."],
          ["Sending a flood of requests to a school's web server", "That is DoS."],
          ["Capturing packets on public Wi-Fi", "That is data interception."],
          ["Guessing passwords with software", "That is brute force."],
        ],
        answer: "A", explanation: "Shoulder surfing exploits people rather than technology.",
      }),
      P.tf({
        label: "(b)", stem: "In pharming, the user is redirected to a fake website even if they type the correct web address.",
        answer: true, explanation: "True. That is what distinguishes pharming from phishing.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain the difference between phishing and pharming, including how each is carried out.",
        points: [
          "Phishing: the criminal sends a fake email/message that appears to be from a trusted organisation",
          "Phishing: the user must click a link that takes them to a fake website, where they enter details",
          "Pharming: malicious code is installed on the user's computer or a DNS server is corrupted",
          "Pharming: the user is redirected to the fake site even when typing the genuine address, with no link clicked",
        ],
        modelAnswer: "In phishing, the criminal sends an email that looks like it is from a bank, and the victim has to click its link to reach a fake site and type their details. In pharming, malicious code on the victim's computer, or a corrupted DNS server, sends the victim to the fake site even when they type the bank's real address, so no link needs to be clicked.",
      }),
    ],
    explanation: "(a) shoulder surfing (b) true.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2, applies: ZIM,
    hints: ["Give a fraud and say how it deceives people."],
    stem: "Describe **one** example of online fraud and its effect on the victim.",
    points: [
      "A valid example, e.g. a fake online shop / an advance-fee scam / a fake investment offer / use of stolen card details",
      "Effect: the victim loses money (and may never get the goods or the money back)",
    ],
    explanation: "Online fraud uses the internet to deceive people for financial gain.",
    modelAnswer: "A fake online shop advertises cheap phones; buyers pay with mobile money, receive nothing and cannot get their money back.",
  });

  b.card("DEFINITION", "What is a **brute-force attack**?", "Finding a password by trial and error, trying common passwords and then every combination.");
  b.card("DEFINITION", "What is **data interception**?", "Capturing data as it travels across a network, e.g. with a packet sniffer or by eavesdropping on Wi-Fi.");
  b.card("DEFINITION", "What is a **DDoS attack**?", "A botnet floods a server with requests so genuine users cannot access the service.");
  b.card("DEFINITION", "What is **hacking**?", "Gaining unauthorised access to a computer system, usually by exploiting a security weakness.");
  b.card("CONCEPT", "Phishing compared with pharming?", "Phishing: user clicks a link in a fake message. Pharming: malicious code or a corrupted DNS server redirects the user even when the correct address is typed.");
  b.card("DEFINITION", "What is **social engineering**?", "Manipulating people (trust, fear, curiosity) into giving away information or access, e.g. fake IT calls, baiting, shoulder surfing.");
  b.card("DEFINITION", "What is **spoofing**?", "Disguising an email, caller ID or IP address so it appears to come from a trusted source.", undefined, { applies: ZIM });
  b.card("FACT", "How many 4-digit PINs are there?", "10 × 10 × 10 × 10 = 10 000, which is why devices limit wrong attempts.");
  b.card("CONCEPT", "Effects of cyber attacks on organisations?", "Financial loss, lost reputation and trust, downtime, repair costs and legal penalties for failing to protect data.");
});
