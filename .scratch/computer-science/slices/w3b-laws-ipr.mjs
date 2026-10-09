// Slice w3b: laws, policies and intellectual property rights for technopreneurs (comp.techno.laws-ipr, ZIMSEC only).
import { concept, P } from "../lib.mjs";

concept("comp.techno.laws-ipr", { file: "techno/laws-ipr", keyPrefix: "techno.laws-ipr" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does a **patent** protect?",
    options: [
      ["A new, inventive and useful invention", "Correct: patents protect how an invention works."],
      ["The name and logo of a business", "That is a trademark."],
      ["The text of a novel or a song's lyrics", "That is copyright."],
      ["The colour scheme of a website", "This is not what patents protect."],
    ],
    answer: "A",
    explanation: "A patent gives the inventor exclusive rights to a new invention for a limited period.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which intellectual property right protects an app's **name and logo**?",
    options: [
      ["Trademark", "Correct: trademarks protect brand names, logos and slogans."],
      ["Patent", "Patents protect inventions."],
      ["Industrial design", "Industrial designs protect a product's shape or pattern."],
      ["Trade secret", "Trade secrets are confidential information, not public brands."],
    ],
    answer: "A",
    explanation: "Names and logos that identify a business's goods or services are trademarks.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The source code of a newly written program is protected by:",
    options: [
      ["Copyright, automatically", "Correct: code is an original work and copyright arises when it is created."],
      ["A patent, automatically", "Patents are never automatic; they must be applied for."],
      ["A trademark, after registration", "Trademarks protect brands, not code."],
      ["An industrial design, after registration", "Designs protect appearance, not code."],
    ],
    answer: "A",
    explanation: "Software code is protected by copyright as soon as it is written.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which organisation should a Zimbabwean technology business register with in order to pay income tax?",
    options: [
      ["The Zimbabwe Revenue Authority (ZIMRA)", "Correct: ZIMRA collects taxes."],
      ["The Zimbabwe Intellectual Property Office", "ZIPO registers patents, trademarks and designs."],
      ["The Postal and Telecommunications Regulatory Authority", "POTRAZ regulates telecommunications."],
      ["The Zimbabwe School Examinations Council", "ZIMSEC runs examinations."],
    ],
    answer: "A",
    explanation: "Businesses register with ZIMRA, declare income and pay tax.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Shape and look, not function."],
    stem: "A Harare company creates a phone stand with an unusual curved shape that customers recognise. Which right protects the **shape**?",
    options: [
      ["Industrial design", "Correct: it protects a product's appearance."],
      ["Copyright", "Copyright protects creative works such as code and text."],
      ["Patent", "A patent protects how something works, not its look."],
      ["Trade secret", "The shape is visible to everyone, so it cannot be secret."],
    ],
    answer: "A",
    explanation: "The appearance (shape, pattern, lines) of a product is protected by registering an industrial design.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["What happens to novelty when an invention is shown in public?"],
    stem: "Why should an inventor apply for a patent **before** showing the invention at a trade fair?",
    options: [
      ["Public disclosure can mean the invention is no longer new", "Correct: novelty is required for a patent."],
      ["Trade fairs only accept products that already have patents", "This is not the main reason."],
      ["The patent fee doubles after any trade fair", "Fees are not linked to trade fairs."],
      ["Copyright stops applying once a product is shown", "Copyright is not affected; patentability is."],
    ],
    answer: "A",
    explanation: "An invention must be new to be patented; showing it publicly first can destroy its novelty.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which law covers personal data?"],
    stem: "An online shop sells its customers' phone numbers to advertisers without consent. Which law has it most likely broken?",
    options: [
      ["The Cyber and Data Protection Act", "Correct: it governs the use of personal data."],
      ["The Copyright and Neighbouring Rights Act", "Copyright concerns creative works."],
      ["Patent law", "No invention is involved."],
      ["Trademark law", "No brand is involved."],
    ],
    answer: "A",
    explanation: "Using personal data without consent breaks data protection law: the Cyber and Data Protection Act [Chapter 12:07].",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Which method needs no registration and protects confidential know-how?"],
    stem: "A start-up's secret algorithm for detecting fraud would be easy for competitors to copy if they saw it, and it may not be patentable. What is the **best** way to protect it?",
    options: [
      ["Keep it as a trade secret with NDAs for staff", "Correct: confidentiality protects it without publishing how it works."],
      ["Publish it online with a copyright notice", "Publishing reveals the idea; copyright protects only the exact code."],
      ["Register the algorithm as a trademark", "Trademarks protect brand names and logos."],
      ["Register the algorithm as an industrial design", "Designs protect appearance, not methods."],
    ],
    answer: "A",
    explanation: "Valuable know-how that cannot or should not be published is best protected as a trade secret, backed by non-disclosure agreements.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Copyright protects the code of a program but not the idea behind it.",
    answer: true,
    explanation: "True. Another programmer may write different code that achieves the same thing without infringing copyright.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A patent lasts for ever once it has been granted.",
    answer: false,
    explanation: "False. A patent lasts for a limited period, usually 20 years, after which anyone may use the invention.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each intellectual property right to what it protects.",
    pairs: [
      ["Patent", "How a new invention works"],
      ["Copyright", "Original works such as code, text and images"],
      ["Trademark", "Brand names, logos and slogans"],
      ["Industrial design", "The shape or pattern of a product"],
    ],
    explanation: "Patent: invention. Copyright: works. Trademark: brand. Industrial design: appearance.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["Link each duty to the area of law."],
    stem: "Match each duty of a technology business to the area of law it comes from.",
    pairs: [
      ["Declaring profits and paying income tax", "Tax law"],
      ["Getting consent before collecting users' personal data", "Cyber and data protection law"],
      ["Describing products honestly and honouring guarantees", "Consumer protection law"],
      ["Paying at least the agreed minimum wage", "Employment law"],
    ],
    explanation: "Tax: profits. Data protection: consent. Consumer protection: honest sales. Employment: wages.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    hints: ["Both offices have their headquarters in Harare."],
    stem: "Complete the sentences.",
    template: "Patents and trademarks in Zimbabwe are registered with the Zimbabwe Intellectual {{blank:a}} Office. A contract in which a partner promises to keep information confidential is a non-{{blank:b}} agreement.",
    blanks: [
      { id: "a", accepted: ["Property"], choices: ["Property", "Patent", "Design", "Revenue"] },
      { id: "b", accepted: ["disclosure"], choices: ["disclosure", "compete", "payment", "copyright"] },
    ],
    explanation: "Zimbabwe Intellectual Property Office (ZIPO); non-disclosure agreement (NDA).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the intellectual property right that exists automatically, without registration, as soon as an original work is created.",
    accepted: ["copyright"],
    wrong: ["patent"],
    explanation: "Copyright is automatic; patents, registered trademarks and industrial designs must be applied for.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Think of income, competitors and investors."],
    stem: "Explain **three** reasons why intellectual property rights are important to a technopreneur.",
    points: [
      "Stop competitors copying the product, so the investment pays off",
      "IP can be licensed or sold for income (royalties)",
      "Registered IP is an asset that attracts investors / supports loans / builds brand trust",
    ],
    explanation: "IPR protects investment, creates income and adds value to the business.",
    modelAnswer: "IPR stops competitors from copying her product, so the money she spent developing it is rewarded. She can license her patent to other manufacturers for royalties. Registered IP also makes the business more valuable to investors.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    hints: ["Registration, tax, data, licences."],
    stem: "Nyasha is starting an online tutoring business in Bulawayo that collects learners' names and phone numbers. Describe **four** legal requirements she must meet.",
    points: [
      "Register the business name or company (with the Registrar of Companies)",
      "Register with ZIMRA and pay tax on profits / keep financial records",
      "Follow the Cyber and Data Protection Act: consent, secure storage of learners' data",
      "Use licensed software and materials (copyright) / consumer protection: honest prices and terms / employment law for tutors",
    ],
    explanation: "A technology business must meet registration, tax, data protection and other legal duties.",
    modelAnswer: "She must register her business name, register with ZIMRA and pay tax on her profits, obtain consent from learners (or parents) and store their data securely under the Cyber and Data Protection Act, and use only licensed software and learning materials.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    hints: ["Each asset has its own right.", "Which right needs no registration?"],
    stem: "Farai's start-up in Mutare makes *AquaAlert* (fictional), a borehole-monitoring device. It has a new type of sensor circuit, firmware he wrote, a distinctive dome-shaped casing, and the brand name AquaAlert with a blue drop logo.",
    parts: [
      P.match({
        label: "(a)", stem: "Match each asset to the right that protects it.",
        pairs: ["The new sensor circuit", "The firmware", "The dome-shaped casing", "The name and logo"],
        right: ["Patent", "Copyright", "Industrial design", "Trademark"],
        rightIndex: [0, 1, 2, 3],
        explanation: "Circuit: patent. Firmware: copyright. Casing: industrial design. Name and logo: trademark.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Describe **two** steps Farai should take before showing *AquaAlert* to possible manufacturers.",
        points: ["Apply for the patent (and design/trademark) before disclosing / search existing registrations", "Ask manufacturers to sign a non-disclosure agreement / keep technical details confidential"],
        modelAnswer: "He should file his patent application and register the design and trademark with ZIPO before showing it, and ask each manufacturer to sign a non-disclosure agreement.",
      }),
    ],
    explanation: "(a) Patent, copyright, industrial design, trademark.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 6,
    hints: ["Name the law and the duty broken."],
    stem: "*QuickFix Phones* (fictional), a phone-repair business in Harare, has been reported for several problems: it has never registered with the tax authority; it installs pirated software on customers' phones; it advertises 'a 12-month guarantee' but refuses all repairs under guarantee; and it copies customers' contacts to sell to marketers.",
    parts: [
      P.match({
        label: "(a)", stem: "Match each problem to the law broken.",
        pairs: ["Not registered with the tax authority", "Installing pirated software", "Refusing guarantee repairs", "Selling customers' contacts"],
        right: ["Tax law", "Copyright law", "Consumer protection law", "Cyber and data protection law"],
        rightIndex: [0, 1, 2, 3],
        explanation: "Tax: ZIMRA. Pirated software: copyright. Broken guarantee: consumer protection. Selling contacts: data protection.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain the likely consequences for the business.",
        points: ["Legal: fines, back taxes and penalties, prosecution, closure", "Business: loss of customers' trust / damaged reputation / lost income"],
        modelAnswer: "The owner could be fined, made to pay back taxes with penalties, or prosecuted, and the shop could be closed. Customers who learn of the data selling and broken guarantees would stop using it, so its income would fall.",
      }),
    ],
    explanation: "(a) Tax, copyright, consumer protection, data protection.",
  });

  b.card("DEFINITION", "Intellectual property", "Creations of the mind (inventions, software, works, brands, designs) that can be owned and protected by law.");
  b.card("DEFINITION", "Patent", "Registered right giving an inventor exclusive use of a new, inventive, useful invention for a limited period (usually 20 years).");
  b.card("CONCEPT", "Copyright for technopreneurs", "Protects code, text, images and music automatically; protects the expression, not the idea.");
  b.card("DEFINITION", "Trademark", "A registered name, logo, slogan or symbol that distinguishes a business's goods or services.");
  b.card("DEFINITION", "Industrial design", "Registered right in the appearance (shape, pattern, lines) of a product, not how it works.");
  b.card("DEFINITION", "Trade secret", "Confidential information that gives an advantage; protected by secrecy and non-disclosure agreements, not registration.");
  b.card("FACT", "Where IP is registered", "Zimbabwe Intellectual Property Office (ZIPO); ARIPO (headquarters in Harare) for several African countries.");
  b.card("CONCEPT", "Laws affecting a technology business", "Business registration; tax (ZIMRA); consumer protection; Cyber and Data Protection Act; Copyright Act; employment law; POTRAZ licences; council trading licences.");
  b.card("CONCEPT", "Protecting an innovation", "Keep it secret; use NDAs; search existing rights; register patent, design and trademark; use licences; monitor and act against copying.");
});
