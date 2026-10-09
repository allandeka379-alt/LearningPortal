// Slice w2b: computers in banking, education, social networks and research (comp.applications.banking-education-social, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const ATM = ["The card is inserted and the card reader reads the account details", "The PIN is entered and checked", "The bank's computer checks the balance and daily limit", "The account is debited and the cash is dispensed"];

concept("comp.applications.banking-education-social", { file: "applications/banking-education-social", keyPrefix: "applications.banking-education-social" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **EFT** stand for in banking?",
    options: [
      ["Electronic funds transfer", "Correct: money moved between accounts electronically."],
      ["Electronic file transmission", "Not a banking term."],
      ["Easy finance terminal", "Not a banking term."],
      ["External fraud tracking", "Not what EFT stands for."],
    ],
    answer: "A",
    explanation: "Electronic funds transfer moves money from one account to another electronically.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which banking service lets a person send money and pay traders using a basic mobile phone, even without a bank account?",
    options: [
      ["Mobile money", "Correct: a phone-based account authorised by a PIN."],
      ["Cheque clearing", "Cheques need a bank account and paper."],
      ["Internet banking on a laptop", "This needs a bank account and internet access."],
      ["Magnetic ink character recognition", "This is used to read cheques."],
    ],
    answer: "A",
    explanation: "Mobile money works through a phone account and reaches people far from bank branches.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When a customer withdraws cash from an ATM, where is the account balance checked?",
    options: [
      ["On the bank's central computer", "Correct: the ATM sends a request and receives approval."],
      ["On the chip of the bank card", "The card identifies the account; it does not hold the balance."],
      ["Inside the ATM's cash dispenser", "The dispenser only releases notes."],
      ["On the printed receipt", "The receipt shows the result after the transaction."],
    ],
    answer: "A",
    explanation: "The ATM is a terminal connected to the bank's computer, which holds the balance.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **drawback** of internet banking?",
    options: [
      ["Customers may be tricked by phishing emails into revealing login details", "Correct: online fraud is a major risk."],
      ["Customers can view their statements at any time of the day or night", "This is a benefit."],
      ["Customers do not need to travel to a branch to pay their bills", "This is a benefit."],
      ["Bills can be paid from home", "This is a benefit."],
    ],
    answer: "A",
    explanation: "Internet banking is convenient but exposes customers to phishing, hacking and the need for internet access.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which task is carried out by a **school administration system**?",
    options: [
      ["Recording attendance and producing learners' reports", "Correct: it manages records, fees, timetables and reports."],
      ["Teaching a typing course with instant feedback", "That is computer-assisted learning."],
      ["Sharing holiday photos with friends", "That is a social network."],
      ["Transferring salaries between banks", "That is EFT."],
    ],
    answer: "A",
    explanation: "School administration systems store learner records, attendance, marks, fees and timetables, and produce reports.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which drawback matters most where devices and data are expensive?"],
    stem: "A rural school is considering e-learning. Which drawback is most relevant?",
    options: [
      ["Learners without devices or data at home may be left behind", "Correct: the digital divide affects rural learners most."],
      ["Learners can replay recorded lessons as often as they like at home", "This is a benefit."],
      ["Quizzes are marked automatically", "This is a benefit."],
      ["Lessons can be shared with other schools", "This is a benefit."],
    ],
    answer: "A",
    explanation: "Cost of devices and data, unreliable power and connectivity create a digital divide.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which use avoids a costly or dangerous real experiment?"],
    stem: "How might engineers use computers in research and development of a new bridge over the Save River?",
    options: [
      ["Run a simulation to test how the design behaves under heavy loads and floods", "Correct: modelling tests designs safely and cheaply."],
      ["Use ATMs and EFT to pay the construction workers every week", "This is banking, not research and development."],
      ["Post photographs of the river and the building site on a social network for public comments", "This is not research."],
      ["Use a school administration system to record the workers", "This is unrelated."],
    ],
    answer: "A",
    explanation: "Simulations and models let researchers test designs before building them.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Which risk is specific to social networks spreading information quickly?"],
    stem: "During a cholera outbreak, a false message about a 'cure' spreads quickly on social networks. Which drawback of social networks does this show?",
    options: [
      ["Misinformation can spread rapidly to many people", "Correct: speed and reach work for false information too."],
      ["Social networks are expensive to join", "Most are free to join."],
      ["Social networks cannot carry text messages", "They carry text, images and video."],
      ["Social networks only work on desktop computers", "They work on phones too."],
    ],
    answer: "A",
    explanation: "The speed that helps share genuine health information also spreads false information.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An ATM can usually be used 24 hours a day, so customers do not have to wait for the bank to open.",
    answer: true,
    explanation: "True. 24-hour access is a key benefit of ATMs.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Mobile money needs a smartphone with an internet connection.",
    answer: false,
    explanation: "False. Mobile money services usually work on basic phones through short-code menus.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each system to its use.",
    pairs: [
      ["ATM", "Withdrawing cash using a card and PIN"],
      ["EFT", "Paying salaries directly into workers' bank accounts"],
      ["E-learning platform", "Watching video lessons and taking online quizzes"],
      ["Social network", "Sharing messages and photos with friends and family"],
      ["Simulation software", "Testing a design before it is built"],
    ],
    explanation: "Banking, education, social networks and research each use different systems.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    hints: ["The PIN is checked before the balance."],
    stem: "Put the steps of an ATM cash withdrawal in order by choosing the correct step for each position.",
    template: ATM.map((_, i) => `Step ${i + 1}: {{blank:s${i + 1}}}`).join("\n\n"),
    blanks: ATM.map((s, i) => ({ id: `s${i + 1}`, accepted: [s], choices: ATM })),
    explanation: ATM.map((s, i) => `${i + 1}. ${s}.`).join(" "),
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the abbreviation for the self-service terminal used to withdraw cash with a bank card.",
    accepted: ["ATM", "automated teller machine", "automatic teller machine"],
    wrong: ["EFT", "POS"],
    explanation: "ATM: automated teller machine.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Think about time, travel and safety."],
    stem: "Give **two** benefits of mobile money for a vendor at a market. [2]",
    points: [
      "Customers can pay without cash / no need to carry or give change / safer than holding cash",
      "Payments are instant and recorded / can pay suppliers or bills from the phone / works without a bank account",
    ],
    modelAnswer: "She does not have to carry large amounts of cash or find change, and payments arrive instantly and are recorded on her phone.",
    explanation: "Any two specific benefits.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    hints: ["Two benefits and two drawbacks, linked to learners."],
    stem: "Discuss the benefits and drawbacks of social networks for secondary school learners. [4]",
    points: [
      "Benefit: keep in touch with friends and family cheaply / instantly",
      "Benefit: share learning resources / study groups / information",
      "Drawback: cyberbullying / contact with strangers / privacy risks",
      "Drawback: addiction / time-wasting / false information",
    ],
    modelAnswer: "Learners can keep in touch cheaply and form study groups to share notes. However, they may face cyberbullying or contact from strangers, and they may waste study time or believe false information.",
    explanation: "Two benefits and two drawbacks.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["EFT moves money between accounts without cash.", "Security: PIN, passwords, phishing."],
    stem: "Masvingo Agro Supplies (fictional) pays its 40 workers by EFT and lets customers pay by internet banking and mobile money.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe how EFT is used to pay the workers.", points: ["The company's bank computer debits / takes the wages from the company account", "And credits / puts the money into each worker's account electronically, with no cash handled"], modelAnswer: "The bank's computer takes each worker's wages from the company account and puts it straight into the worker's account, without any cash." }),
      P.manual({ label: "(b)", marks: 2, stem: "Give **two** benefits of EFT for the company.", points: ["No cash to collect, count or guard / reduced risk of theft", "Fast / on time / automatic record of each payment"], modelAnswer: "No cash has to be collected and guarded, and each payment is quick and recorded automatically." }),
      P.mcq({ label: "(c)", stem: "Which is a security risk when customers use internet banking?", options: [["Phishing emails that steal login details", "Correct."], ["The bank's branches close at weekends", "Internet banking works at weekends."], ["Receipts for payments can be printed", "Not a risk."], ["Statements are always up to date", "A benefit."]], answer: "A", explanation: "Phishing." }),
      P.tf({ label: "(d)", stem: "True or false: a mobile money payment is authorised with a PIN.", answer: true, explanation: "True." }),
    ],
    explanation: "EFT debits one account and credits another; phishing is a risk; PINs authorise mobile money.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    hints: ["Administration systems manage records; e-learning delivers lessons.", "Relate drawbacks to a school in a rural area."],
    stem: "Kwekwe High School (fictional) is introducing a school administration system and an e-learning platform.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe **three** tasks the school administration system could carry out.", points: ["Store learner records / personal details", "Record attendance / marks and produce reports", "Manage fees / timetables / produce statistics"], modelAnswer: "It could store learners' records, record attendance and marks to produce reports for parents, and track fee payments." }),
      P.manual({ label: "(b)", marks: 3, stem: "Evaluate the e-learning platform for the school's learners.", points: ["Benefit: learn at own pace / replay lessons / instant feedback from quizzes", "Drawback: learners without devices or data are left behind / power cuts", "Drawback: less face-to-face contact / distractions / teachers need training"], modelAnswer: "Learners can study at their own pace and get instant feedback. However, those without devices or data at home will be left behind, and power cuts and online distractions may reduce its value." }),
    ],
    explanation: "Records, attendance and fees; flexible learning versus the digital divide.",
  });

  b.card("DEFINITION", "ATM", "Automated teller machine: self-service terminal to withdraw cash, check balances or pay bills using a card and PIN.");
  b.card("DEFINITION", "Electronic funds transfer (EFT)", "Moving money from one account to another electronically, e.g. salaries and bill payments, without cash.");
  b.card("DEFINITION", "Mobile money", "Storing, sending and receiving money and paying for goods from a phone account, authorised by a PIN; works on basic phones.");
  b.card("CONCEPT", "Benefits and drawbacks of internet banking", "+ bank anywhere, any time; no travel; up-to-date statements. − phishing and hacking; needs internet and skills.");
  b.card("DEFINITION", "E-learning", "Learning delivered electronically: online courses, video lessons, quizzes, virtual classrooms.");
  b.card("CONCEPT", "School administration system", "Stores learner records, attendance, marks, fees and timetables; produces reports and statistics.");
  b.card("CONCEPT", "Drawbacks of social networks", "Cyberbullying, misinformation, privacy and data misuse, scams, addiction and time-wasting.");
  b.card("CONCEPT", "Computers in research and development", "Analysing large data sets, simulations and models, searching journals, sharing results, data logging in laboratories.");
});
