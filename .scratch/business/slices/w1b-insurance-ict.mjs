// W1b: ICT in insurance and assurance (e-insurance).
import { concept, P } from "../lib.mjs";

concept("bus.insurance.ict", { file: "insurance/ict", keyPrefix: "insurance.ict" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is e-insurance?",
    options: [
      ["Buying and managing insurance electronically", "Correct: through websites, apps, phone menus, email and electronic payments."],
      ["Insurance that covers only electrical goods", "E-insurance is about how insurance is sold and managed, not what it covers."],
      ["Insurance paid for in cash at a branch", "That is the traditional method."],
      ["A policy that never needs a premium", "E-insurance policies still need premiums."],
    ],
    answer: "A",
    explanation: "**E-insurance** uses ICT to sell, pay for and manage insurance: online quotations and proposals, e-policies, electronic premiums and online claims.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an advantage of e-insurance to clients?",
    options: [
      ["They can get quotations and cover at any time without travelling", "Correct: convenience and speed are key benefits."],
      ["They no longer need to disclose material facts to the insurer", "Utmost good faith still applies to online proposals."],
      ["Their premiums are always zero", "Premiums are still payable."],
      ["Their claims are always paid in full", "Claims are still assessed under indemnity."],
    ],
    answer: "A",
    explanation: "Clients gain convenience, speed, easy comparison and access from remote areas.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a disadvantage of ICT in insurance for clients?",
    options: [
      ["Risk of fraud through fake insurance websites and messages", "Correct: cyber fraud is a real danger online."],
      ["Policies can be bought at any time of the day or night", "That is an advantage, not a disadvantage."],
      ["Premiums can be paid conveniently by mobile money", "That is a convenience."],
      ["Policy documents are stored safely online", "That is an advantage."],
    ],
    answer: "A",
    explanation: "Disadvantages for clients: cyber fraud, the need for a phone, data and electronic money, little personal advice, and network failures.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A motorist pays her premium each month automatically from her bank account. This method of payment is a:",
    options: [
      ["debit order", "Correct: an instruction for regular automatic payments from a bank account."],
      ["cover note", "A cover note is temporary proof of insurance."],
      ["claim form", "A claim form is used after a loss."],
      ["proposal form", "A proposal form is the application for cover."],
    ],
    answer: "A",
    explanation: "A **debit order** (like a stop order) pays premiums automatically, reducing missed payments and lapsed policies.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How does ICT help insurers to set more accurate premiums?",
    options: [
      ["Computers analyse large amounts of data on past losses", "Correct: actuaries use software to find patterns and probabilities."],
      ["ICT lets insurers ignore statistics on past losses", "Statistics are more important, not less, with ICT."],
      ["ICT makes every client's risk the same", "Risks still differ between clients."],
      ["ICT removes the need for actuaries and underwriters", "Actuaries use ICT; they are still needed."],
    ],
    answer: "A",
    hints: ["Premiums depend on statistics."],
    explanation: "Databases and analysis software let actuaries study far more data, so premiums reflect each risk more accurately.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which business would gain **most** from selling funeral policies through a mobile phone menu?",
    options: [
      ["An insurer targeting rural clients far from its branches", "Correct: phone menus reach people without travel or internet."],
      ["An insurer with clients only in one city office block", "These clients can easily visit the office."],
      ["A shop selling mobile phones", "The shop is not an insurer selling policies."],
      ["A bank that does not sell insurance", "It sells no policies."],
    ],
    answer: "A",
    hints: ["Who finds it hardest to reach an insurance office?"],
    explanation: "Mobile phone menus and mobile money let insurers reach rural clients cheaply, widening their market.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Why might an insurer still keep some branches and agents after moving most sales online?",
    options: [
      ["Some clients lack phones or skills and want personal advice", "Correct: not every client can or wants to buy online."],
      ["Online sales are illegal in Zimbabwe", "Online insurance sales are not illegal."],
      ["Branches make premiums lower than online sales", "Branches usually cost more to run."],
      ["Agents can change the principles of insurance", "No one can change the principles."],
    ],
    answer: "A",
    hints: ["Think about clients who cannot use ICT."],
    explanation: "ICT cuts costs, but some clients lack access or skills, and complex cover often needs personal advice.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Claims can now be reported through an insurer's app with photographs of the damage attached.",
    answer: true,
    explanation: "True. Online and app-based claims speed up the claims process.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A proposal form completed online does not need to be completed in utmost good faith.",
    answer: false,
    explanation: "False. The principles of insurance apply to electronic contracts exactly as to paper ones.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each use of ICT with its benefit.",
    pairs: [
      ["Online quotation", "Instant premium without visiting an office"],
      ["E-policy sent by email", "Immediate documents that cannot be lost"],
      ["Automatic payment reminders", "Fewer missed premiums and lapsed policies"],
      ["Data analysis software", "Detects unusual patterns that suggest fraud"],
    ],
    explanation: "ICT speeds up selling, documentation and payment, and helps insurers manage risk and fraud.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "An electronic store of records, such as an insurer's client and claims records, is called a {{blank:a}}.",
    blanks: [{ id: "a", accepted: ["database", "data base"], wrong: "spreadsheet" }],
    explanation: "Insurers keep client, policy and claims records in **databases**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for a policy document that is issued and stored electronically, for example sent by email.",
    accepted: ["e-policy", "epolicy", "e policy", "electronic policy", "an e-policy", "digital policy"],
    wrong: ["cover note", "prospectus"],
    explanation: "An **e-policy** is the electronic form of the policy document.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** advantages of ICT to an insurance company.",
    points: [
      "Lower administration costs (fewer branches, less paperwork).",
      "So premiums can be lower or profits higher.",
      "Wider market: reach clients across the country through phones.",
      "So more policies are sold / more premiums collected (or: better risk assessment, fraud detection).",
    ],
    hints: ["Think about costs and reach."],
    modelAnswer: "ICT lowers administration costs because fewer branches and less paperwork are needed, so premiums can be lower or profits higher. It also widens the market, because clients in remote areas can buy policies by phone, so more policies are sold.",
    explanation: "Insurer advantages: lower costs, wider market, better risk assessment, faster records, fraud detection, fewer lapses.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** disadvantages of ICT to an insurance company.",
    points: [
      "High cost of systems, software and security.",
      "Reduces profit, especially at first / needs skilled IT staff.",
      "Cyber attacks or data breaches.",
      "Clients' private data exposed, damaging reputation (or: system failures stop business; online fraud by clients).",
    ],
    hints: ["Think about cost and security."],
    modelAnswer: "Setting up and maintaining systems and security is expensive and needs skilled staff, which reduces profit. Cyber attacks could expose clients' private data, damaging the insurer's reputation and trust.",
    explanation: "Insurer disadvantages: system costs, cyber attacks, system failures, job losses, online fraud.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Thandeka Assurance (a fictional company) sells funeral policies in Matabeleland through agents who visit clients' homes and collect premiums in cash. It plans to let clients buy policies, pay premiums and make claims using a mobile phone menu and mobile money.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** benefits of the plan to the company's clients.",
        points: [
          "Clients can buy policies and pay premiums from home at any time.",
          "So they save travel and avoid missed payments when an agent cannot visit.",
          "Claims can be made by phone and paid quickly to mobile money.",
          "So families get funds faster when they are needed for a funeral.",
        ],
        modelAnswer: "Clients can pay premiums from home at any time, so they do not miss payments when the agent cannot visit and their policies do not lapse. Claims can be reported by phone and paid straight to mobile money, so families get the money quickly when it is needed for a funeral.",
      }),
      P.manual({
        label: "(b)", marks: 8,
        stem: "Discuss whether the company should replace its agents completely with the mobile phone system.",
        points: [
          "For: lower costs (no agents' commission or cash collection).",
          "For: less theft of cash collected by agents / better records.",
          "For: reach more clients across the region.",
          "Against: some clients lack phones, network coverage or skills.",
          "Against: clients value personal contact and advice; trust in agents.",
          "Against: risk of fraud and system failures; job losses may harm reputation.",
          "Considers a mixed approach.",
          "Justified recommendation.",
        ],
        modelAnswer: "Replacing agents would cut commission and cash-handling costs, reduce theft of premiums and keep accurate electronic records, and the company could reach clients across the region. However, some rural clients lack phones, network coverage or the skills to use a phone menu, and many trust the agents who visit them and value their advice. Phone systems can fail and attract fraud, and laying off agents could harm the company's reputation. The company should introduce the phone system but keep a smaller team of agents to sign up and support clients who cannot use it, moving towards the phone system as clients become comfortable with it.",
      }),
    ],
    hints: ["(b) Consider costs, reach, trust and access before deciding."],
    explanation: "ICT lowers costs and widens reach, but access, skills and trust mean a mixed approach often works best.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780,
    stem: "Tatenda wants to insure his car. He finds a website that compares quotations from several insurers and buys a policy online in fifteen minutes without speaking to anyone.",
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "State **three** ways in which Tatenda benefits from buying online.",
        points: ["Speed: cover in minutes.", "Easy comparison of several insurers' prices.", "Convenience: no travel / any time / e-policy received immediately."],
        modelAnswer: "He gets cover in minutes, compares several insurers' prices easily, and does not need to travel to an office.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Discuss the risks Tatenda faces in buying insurance this way.",
        points: [
          "No adviser to explain terms and exclusions; may buy unsuitable cover.",
          "May not realise what is excluded until he claims.",
          "Errors or omissions on the online proposal could breach utmost good faith.",
          "Fake or unregistered websites / phishing could steal his money or data.",
          "Weighs risks against benefits.",
          "Conclusion with how to reduce the risks (read terms, check the insurer is registered).",
        ],
        modelAnswer: "Without an adviser, Tatenda may not understand the terms and exclusions and could buy cover that does not protect him, discovering this only when he claims. A careless answer on the online proposal form could breach utmost good faith and let the insurer refuse a claim. He also risks fake websites that steal his money or personal data. These risks can be reduced by reading the policy carefully, checking the insurer is genuine and registered, and asking questions before paying, so online buying can still be worth while.",
      }),
    ],
    hints: ["(b) What would a broker or agent have done for him?"],
    explanation: "Online buying is fast and cheap, but clients must read terms, answer proposals honestly and avoid fraudulent sites.",
  });
  b.card("DEFINITION", "What is **e-insurance**?", "Buying, paying for and managing insurance electronically: websites, apps, phone menus, email, mobile money.");
  b.card("FACT", "Uses of ICT in insurance?", "Online quotations and proposals, e-policies, electronic premium payments, online claims, databases, data analysis, fraud detection.");
  b.card("FACT", "Advantages of ICT to clients?", "Convenience, speed, easy comparison, access in remote areas, documents always available.");
  b.card("FACT", "Advantages of ICT to insurers?", "Lower costs, wider market, better risk assessment, accurate records, fraud detection, fewer lapsed policies.");
  b.card("FACT", "Disadvantages of ICT for clients?", "Needs phone, data and e-money; little personal advice; cyber fraud; network failures.");
  b.card("FACT", "Disadvantages of ICT for insurers?", "System and security costs, cyber attacks and data breaches, system failures, job losses, online fraud by clients.");
  b.card("DEFINITION", "What is a **debit order**?", "An instruction for regular automatic payments, such as premiums, from a bank account.");
  b.card("CONCEPT", "Do insurance principles apply online?", "Yes: utmost good faith, insurable interest, indemnity and the others apply to electronic contracts.");
});
