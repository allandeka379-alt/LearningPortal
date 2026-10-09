// W2b exam-format items, ZIMSEC Commerce: Paper 2 Section A (7 marks) and Section B essays (20 marks).
// Mark splits of essay parts and of the 7-mark question are ours (the syllabus does not print them).
import { concept, P, COM, money } from "../lib.mjs";

const L8 = [
  [3, 6, 8, "Well-developed explanation of a range of relevant points, applied with examples."],
  [2, 3, 5, "Some explanation of relevant points; limited development or examples."],
  [1, 1, 2, "Points identified or listed with little or no explanation."],
];
const L10 = [
  [3, 8, 10, "A range of relevant points, each explained and illustrated with examples."],
  [2, 4, 7, "Relevant points with some explanation; development uneven."],
  [1, 1, 3, "Points listed or described with little explanation."],
];
const L12 = [
  [3, 9, 12, "Balanced discussion of both sides, developed with examples, and a justified conclusion."],
  [2, 5, 8, "Some discussion, mostly one-sided or not fully developed; weak or unsupported conclusion."],
  [1, 1, 4, "Simple points with little explanation and no judgement."],
];

// 7-mark: counterfeit polish.
const fakeTins = 2350, pricePerTin = 1.6;
const lostRevenue = Math.round(fakeTins * pricePerTin * 100) / 100; // 3760

concept("bus.enterprise.intellectual-property", { file: "exam/w2b-commerce", keyPrefix: "exam.w2b-commerce", applies: COM }, (b) => {
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 480, paper: "Paper 2", calculator: true,
    concepts: ["bus.enterprise.intellectual-property"],
    stem: `Rudo makes shoe polish in Gweru and sells it under the registered brand name "Shine-Rite" with a red lion logo. She has discovered that fake tins carrying the same name and logo are being sold in several markets. Rudo estimates that customers bought ${fakeTins.toLocaleString("en-GB")} fake tins last month instead of hers. Her selling price is ${money(pricePerTin)} a tin.`,
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "Name the type of intellectual property that protects the name \"Shine-Rite\" and the red lion logo.",
        accepted: ["trademark", "trade mark", "a trademark", "registered trademark", "trademarks"],
        wrong: ["copyright"],
      }),
      P.mcq({
        label: "(b)", stem: "What is the making and selling of the fake tins called?",
        options: [["Counterfeiting", "Correct: fake goods copy the brand and trademark."], ["Plagiarism", "Plagiarism is passing off written work as your own."], ["Piracy", "Piracy copies copyright work such as music or software."], ["Patenting", "A patent protects an invention; patenting is not an offence."]],
        answer: "A",
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the sales revenue Rudo lost last month because of the fake tins.",
        kind: "money", value: lostRevenue, wrong: [fakeTins + pricePerTin],
        explanation: `${fakeTins.toLocaleString("en-GB")} × ${money(pricePerTin)} = ${money(lostRevenue)}.`,
      }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Explain **one** remedy Rudo can use against the people making the fake tins.",
        points: [
          "Identifies a remedy: court action for damages / an injunction / report to police for seizure of the goods.",
          "Explains how it works (court orders the makers to stop and pay compensation / goods seized and destroyed).",
          `Applies: recovers lost revenue (about ${money(lostRevenue)} a month) or stops the fakes harming her reputation.`,
        ],
        modelAnswer: `Rudo can take the makers to court, because her trademark is registered. The court can grant an injunction ordering them to stop making the fake tins and order them to pay damages, which would compensate her for revenue lost, about ${money(lostRevenue)} last month, and protect her brand's reputation.`,
      }),
    ],
    hints: ["(c) Number of tins × selling price per tin.", "(d) Think about the courts and the police."],
    explanation: `(a) Trademark. (b) Counterfeiting. (c) ${fakeTins.toLocaleString("en-GB")} × ${money(pricePerTin)} = ${money(lostRevenue)}. (d) Damages and an injunction through the courts, or seizure of the fakes.`,
    workedSolution: `1. Lost revenue = number of fake tins × price per tin.\n2. ${fakeTins.toLocaleString("en-GB")} × ${pricePerTin.toFixed(2)} = ${lostRevenue.toLocaleString("en-GB")}.`,
  });

  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.enterprise.ethics"],
    stem: "Some traders believe that honesty is too expensive in business.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Describe **four** unethical practices of traders.",
        points: [
          ["Short weights and measures, with example (tampered scales, underfilled packets).", 2],
          ["False descriptions or misleading advertising, with example.", 2],
          ["Selling expired, unsafe or counterfeit goods, with example.", 2],
          ["Hoarding and overcharging during shortages / bribery / failing to give receipts to avoid tax, with example.", 2],
        ],
        levels: L8,
        modelAnswer: "Some traders give **short measures**, using tampered scales or selling a packet labelled 2 kg that holds less. Others use **false descriptions** and misleading adverts, such as calling a product \"pure\" when it is mixed with cheaper ingredients, or advertising a \"sale\" price that was never reduced. Some sell **expired or unsafe goods**, such as medicines past their expiry date or fake electrical goods that overheat. Finally, some traders **hoard goods** during a shortage so that they can raise prices sharply, which exploits consumers who have no other supplier.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 550 },
        stem: "Discuss whether traders who behave ethically can still make good profits.",
        points: [
          ["Ethical behaviour raises some costs (fair prices to suppliers, safe disposal, honest measures) and may reduce short-term profit.", 2],
          ["Dishonest rivals may undercut ethical traders in the short run.", 2],
          ["Ethical traders gain trust, repeat customers and goodwill, raising long-run sales.", 2],
          ["They avoid fines, prosecution, closure and boycotts by consumer bodies.", 2],
          ["Motivated staff and loyal suppliers; ethical claims can be used in promotion.", 2],
          ["Justified conclusion.", 2],
        ],
        levels: L12,
        modelAnswer: "Behaving ethically does carry costs. A trader who gives full measures, pays suppliers fairly and refuses to sell cheap counterfeit stock may earn less on each sale, and in the short run a dishonest rival can undercut him. However, customers quickly learn which traders they can trust. An honest trader gains repeat customers and recommendations, which raise sales over many years, while a cheat loses customers once they discover short measures or fake goods. Ethical traders also avoid fines, prosecution and closure, and are not targeted by consumer organisations. Their workers and suppliers are more loyal, and they can use their honesty in their advertising. Overall, ethical traders can make good profits, and usually more lasting profits than dishonest ones, although they may need to accept lower margins at first and compete on trust and service rather than on the lowest price.",
      }),
    ],
    hints: ["(a) Name each practice and give an example.", "(b) Consider short-term costs and long-term benefits, then judge."],
    explanation: "(a) Short measures, false descriptions, unsafe or expired goods, hoarding and overcharging. (b) Ethics raises some costs but brings trust, loyalty and fewer legal problems, so it can support lasting profit.",
  });

  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.communication.methods", "bus.communication.barriers"],
    stem: "Communication is an important aid to trade.",
    parts: [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 },
        stem: "Explain **five** factors a business should consider when choosing a method of communication.",
        points: [
          ["Speed / urgency, with an example (urgent order: telephone).", 2],
          ["Cost compared with the importance of the message, with example.", 2],
          ["Need for a written record (contracts, complaints: letter or email).", 2],
          ["Need for feedback / discussion, or confidentiality (private meeting).", 2],
          ["Distance and number of receivers, or the receiver's access to the medium, with example.", 2],
        ],
        levels: L10,
        modelAnswer: "**Speed**: an urgent message, such as a breakdown at a factory, needs a fast method like a telephone call rather than a letter. **Cost**: the method should be worth the cost; a short enquiry can be sent by text message rather than by a visit. **Need for a record**: contracts, orders and complaints should be written, by letter or email, so that there is evidence later. **Feedback and confidentiality**: if the receiver needs to ask questions, a meeting or phone call is better than a notice, and private matters such as a warning to an employee need a private meeting and letter. **Distance and number of receivers**: a supplier in another country can be reached cheaply by email, while a message for every employee is best sent as a notice or group message. The receiver must also have access to the medium: some rural customers may have a phone but no email.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 },
        stem: "Discuss the barriers to effective communication in a large business and how they can be overcome.",
        points: [
          ["Long chain of command delays and distorts messages; solution: direct communication / fewer levels.", 2],
          ["Jargon and technical language; solution: plain language suited to the receiver.", 2],
          ["Information overload; solution: short, relevant, clearly marked messages.", 2],
          ["Noise, faulty equipment or poor channels; solution: quiet places, back-up power, suitable medium.", 2],
          ["Attitudes / lack of feedback; solution: build trust, two-way methods, confirm understanding; judgement on which matters most.", 2],
        ],
        levels: L10,
        modelAnswer: "In a large business, messages often pass through many levels of management. This **long chain of command** delays instructions and each person may change them; communicating directly with the people affected, or reducing the number of levels, overcomes this. Specialists may use **jargon** that other staff do not understand, so messages should be written in plain language. Staff may receive so many emails that important ones are missed (**information overload**); messages should be short, relevant and clearly marked when urgent. In factories **noise**, and in many places **power cuts and network failures**, stop messages getting through; briefings in quiet rooms, written notices and back-up power help. Finally, employees who **distrust** management may ignore messages, and one-way methods give no chance to check understanding. Building trust and using two-way methods, with receivers asked to confirm key points, deals with both. In a large business the long chain of command is usually the most serious barrier, because it affects every message that passes down the organisation.",
      }),
    ],
    hints: ["(a) Each factor should be explained with an example.", "(b) Pair each barrier with a solution."],
    explanation: "(a) Speed, cost, record, feedback and confidentiality, distance and number of receivers. (b) Long chains, jargon, overload, noise and equipment, attitudes and lack of feedback, each with a solution.",
  });
});
