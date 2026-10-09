// Slice w3b: copyright, plagiarism and software piracy (comp.security.copyright-plagiarism, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const computers = 24;
const singlePrice = 30; // USD per single-user licence
const sitePrice = 450; // USD for a site licence
const singleTotal = computers * singlePrice;
const saving = singleTotal - sitePrice;

concept("comp.security.copyright-plagiarism", { file: "security/copyright-plagiarism", keyPrefix: "security.copyright-plagiarism" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **plagiarism**?",
    options: [
      ["Presenting someone else's work or ideas as your own without acknowledging them", "Correct: the key idea is passing off another person's work as yours."],
      ["Installing one licensed program on more computers than the licence allows", "That is software piracy."],
      ["Gaining access to another person's computer without their permission", "That is hacking."],
      ["Sending fake emails that trick people into revealing their passwords", "That is phishing."],
    ],
    answer: "A",
    explanation: "Plagiarism is presenting another person's words, ideas or work as your own without acknowledging the source.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Zimbabwean law protects copyright in books, music and computer programs?",
    options: [
      ["The Copyright and Neighbouring Rights Act", "Correct: [Chapter 26:05] protects original works, including software."],
      ["The Cyber and Data Protection Act", "This deals with cybercrime and personal data, not copyright."],
      ["The Postal and Telecommunications Act", "This regulates telecommunications services."],
      ["The Consumer Protection Act of Zimbabwe", "This protects buyers in trade, not creators' works."],
    ],
    answer: "A",
    explanation: "Copyright in Zimbabwe is governed by the Copyright and Neighbouring Rights Act [Chapter 26:05].",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A company installs a **single-user** copy of a design program on 15 office computers. What has the company done?",
    options: [
      ["Committed software piracy", "Correct: using software beyond the terms of its licence is piracy."],
      ["Committed plagiarism", "Plagiarism means claiming the work as your own; the company is not doing that."],
      ["Used the software legally under fair dealing", "Fair dealing covers short extracts for study or criticism, not installing software."],
      ["Bought a valid site licence for all the computers", "A single-user licence covers one computer only."],
    ],
    answer: "A",
    explanation: "A single-user licence allows one installation. Installing it on 15 computers without further licences is software piracy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which licence type gives users the **source code** and allows them to change and share the program?",
    options: [
      ["Open source", "Correct: open-source licences make the source code available to study, change and share."],
      ["Freeware", "Freeware is free to use, but the code is not given out and may not be changed."],
      ["Shareware", "Shareware is a free trial; the code is not available."],
      ["Single-user", "A single-user licence allows use on one computer only."],
    ],
    answer: "A",
    explanation: "Only open-source licences give access to the source code with permission to modify and redistribute it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is copyright important to a software developer?",
    options: [
      ["It lets the developer earn income from the program", "Correct: copyright stops others copying and selling the program, so the developer is paid."],
      ["It makes the program run faster on old computers", "Copyright is a legal right; it has no effect on performance."],
      ["It stops viruses from infecting the program's files", "Copyright cannot protect against malware."],
      ["It allows anyone to copy the program for free", "This is the opposite of what copyright does."],
    ],
    answer: "A",
    explanation: "Copyright gives the developer control over copying and selling, so they earn income and are rewarded for their work.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which tool compares a document with many sources?"],
    stem: "A college lecturer in Gweru wants to check whether students' assignments have been copied from websites. Which tool should she use?",
    options: [
      ["Anti-plagiarism software", "Correct: it compares the text with a database of sources and highlights matches."],
      ["Anti-virus software", "Anti-virus software detects malware, not copied text."],
      ["A firewall on the college network", "A firewall filters network traffic."],
      ["A spell checker in the word processor", "A spell checker finds spelling errors, not copied passages."],
    ],
    answer: "A",
    explanation: "Anti-plagiarism software compares a document with web pages, books and earlier submissions and reports a similarity score with the matching sources.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["What do pirated copies lack, and what might they contain?"],
    stem: "Which is a **risk to the user** of installing a cracked (pirated) copy of an operating system?",
    options: [
      ["It may contain malware and will not receive security updates", "Correct: cracked copies are often infected and cannot be updated safely."],
      ["The developer automatically refunds the user's money", "There is no payment to refund; this is not a risk."],
      ["The computer's hardware warranty is doubled", "Software piracy has no effect on a hardware warranty."],
      ["It runs faster than the genuine licensed version", "A cracked copy is not faster; this is not a risk."],
    ],
    answer: "A",
    explanation: "Pirated software is a common route for malware and does not receive genuine updates or support, as well as being illegal.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Which option is legal and covers every computer?"],
    stem: "A school with a 40-computer laboratory needs a spreadsheet program but has a small budget. Which is the **best** legal choice?",
    options: [
      ["Use an open-source spreadsheet on all 40 computers", "Correct: it is legal to install on every computer and costs nothing."],
      ["Buy one single-user licence and copy it to every computer", "This is software piracy."],
      ["Install a shareware trial and reinstall it when it expires", "Repeatedly resetting a trial breaks the licence terms."],
      ["Download a cracked full version from a file-sharing site", "This is piracy and risks malware."],
    ],
    answer: "A",
    explanation: "An open-source program may legally be installed on all 40 computers at no cost. A site licence would also be legal but costs money.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A creator must register a work with the government before it is protected by copyright.",
    answer: false,
    explanation: "False. Copyright exists automatically once an original work is created and recorded in some form. Patents and trademarks are the rights that must be registered.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Freeware may be used without paying, but the creator still owns the copyright.",
    answer: true,
    explanation: "True. Freeware is free to use, but it is not copyright-free: it may not be changed or sold as your own.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each licence type to what it allows.",
    pairs: [
      ["Single-user licence", "Installation on one computer only"],
      ["Site licence", "Installation on every computer at one location for one fee"],
      ["Shareware", "Free use for a trial period, then payment is required"],
      ["Open source", "The source code may be studied, changed and shared"],
    ],
    explanation: "Single-user: one computer. Site: every computer at one site. Shareware: trial then pay. Open source: code available to change and share.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["Plagiarism is about claiming authorship; piracy is about copying without permission."],
    stem: "Classify each action.",
    pairs: ["Handing in a friend's essay under your own name", "Selling copied films on flash drives", "Sharing a product key so friends can activate paid software", "Pasting a paragraph from a website into an assignment with no reference"],
    right: ["Plagiarism", "Piracy"],
    rightIndex: [0, 1, 1, 0],
    explanation: "Claiming another's work as yours is plagiarism; copying or distributing protected material without permission is piracy.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    hints: ["One is a code you type in; the other checks it over the internet."],
    stem: "Complete the sentences about preventing software piracy.",
    template: "A unique code supplied with legally bought software is a product {{blank:a}}. When the software checks that code against the developer's server over the internet, this is called online {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["key"], choices: ["key", "licence", "patent", "password"] },
      { id: "b", accepted: ["activation"], choices: ["activation", "encryption", "validation", "registration"] },
    ],
    explanation: "Product key; online activation.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Work out the total cost of the single-user licences first."],
    stem: `A college needs a program on ${computers} computers. A single-user licence costs USD ${singlePrice} each; a site licence costs USD ${sitePrice}. How many US dollars does the college **save** by buying the site licence?`,
    value: saving, prefix: "USD",
    wrong: [singleTotal],
    explanation: `${computers} × ${singlePrice} = ${singleTotal}; ${singleTotal} − ${sitePrice} = ${saving}.`,
    workedSolution: `1. Cost of single-user licences: ${computers} × ${singlePrice} = USD ${singleTotal}.\n2. Saving: ${singleTotal} − ${sitePrice} = USD ${saving}.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Think of the creator, the industry and the country."],
    stem: "Explain **three** reasons why copyright is important.",
    points: [
      "Creators earn income / are rewarded for their time and investment",
      "Encourages creativity and innovation (people will create if their work is protected)",
      "Protects the creator's reputation / stops others altering or claiming the work / supports creative industries and jobs",
    ],
    explanation: "Copyright protects the creator's income and reputation and encourages further creative work.",
    modelAnswer: "Copyright means a musician is paid whenever her song is sold or broadcast, which rewards her work. Because creators know their work cannot simply be copied, they are encouraged to produce more. It also stops others changing the work and passing it off under the creator's name.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    hints: ["Consequences for the learner, and ways the school can stop it."],
    stem: "A learner copies a project from a website. Describe **two** consequences for the learner and **two** ways the school can reduce plagiarism.",
    points: [
      "Consequence: zero marks / disqualification",
      "Consequence: disciplinary action (suspension) / loss of trust / does not learn the skills",
      "Prevention: use anti-plagiarism software to check work",
      "Prevention: teach referencing / require sources to be acknowledged / set personal or local tasks",
    ],
    explanation: "Plagiarism leads to penalties and lost learning; schools reduce it with detection software and by teaching referencing.",
    modelAnswer: "The learner could be given zero for the project and suspended. The school can check every project with anti-plagiarism software and teach learners how to quote and reference sources correctly.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    hints: ["Single-user licences cover one computer each.", "Think of technical and legal measures."],
    stem: "Tendai Graphics (fictional) in Harare has bought **one** single-user licence for a photo-editing package and installed it on all eight of its computers. It also sells pirated films on flash drives at the front counter.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What has the business done by installing the package on eight computers?",
        options: [
          ["Committed software piracy", "Correct."],
          ["Committed plagiarism", "Plagiarism is claiming authorship."],
          ["Used a valid site licence", "It bought a single-user licence."],
          ["Used the package fairly for study", "Fair dealing does not cover this."],
        ],
        answer: "A", explanation: "Using software beyond its licence is piracy.",
      }),
      P.num({ label: "(b)", stem: "How many **more** single-user licences must the business buy to use the package legally on all eight computers?", value: 7, wrong: [8], explanation: "It has 1 licence and needs 8, so it must buy 7 more.", workedSolution: "1. Licences needed: 8.\n2. Licences owned: 1.\n3. Extra: 8 − 1 = 7." }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Describe **two** consequences for the business of selling pirated films.",
        points: ["Fines or imprisonment under the Copyright and Neighbouring Rights Act / prosecution", "Loss of reputation / confiscation of goods / civil claims from the film makers"],
        modelAnswer: "The owner could be prosecuted and fined or jailed under the Copyright Act, and the shop's reputation would suffer if the story became public.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Describe **two** methods software developers use to make piracy of their programs harder.",
        points: ["Product key / serial number needed to install", "Online activation / DRM / dongle / licence server checks"],
        modelAnswer: "Developers require a unique product key to install the program and use online activation, so the same key cannot be used on many computers.",
      }),
    ],
    explanation: "(a) Software piracy. (b) 7 more licences.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 5,
    hints: ["Fair dealing needs acknowledgement and a short extract.", "Who loses when piracy is common?"],
    stem: "Sipho is writing a school magazine article about Zimbabwean music.",
    parts: [
      P.tf({ label: "(a)", stem: "Sipho may quote two lines from a published song review if he names the source.", answer: true, explanation: "True: a short, acknowledged quotation for criticism or review is fair dealing." }),
      P.tf({ label: "(b)", stem: "Sipho may print the full lyrics of a new song without permission because the magazine is free.", answer: false, explanation: "False: copying a whole work needs permission, even if no money is charged." }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how widespread music piracy affects musicians, the music industry and the country.",
        points: ["Musicians lose income / royalties", "The industry invests less in recording and promoting new artists / jobs lost", "The country loses tax revenue / creative economy and investment are discouraged"],
        modelAnswer: "Musicians earn less because people copy their songs instead of buying them. Record labels and studios then invest less in new artists, so jobs are lost. The government also collects less tax, and the creative economy grows more slowly.",
      }),
    ],
    explanation: "(a) True (fair dealing). (b) False.",
  });

  b.card("DEFINITION", "Copyright", "A legal right giving the creator of an original work (text, music, film, art, software) control over copying, distribution and adaptation, for a limited period.");
  b.card("DEFINITION", "Plagiarism", "Presenting another person's words, ideas or work as your own without acknowledging the source.");
  b.card("DEFINITION", "Software piracy", "Copying, distributing, selling or using software without the copyright holder's permission (licence).");
  b.card("FACT", "Zimbabwe's copyright law", "The Copyright and Neighbouring Rights Act [Chapter 26:05]: protects literary, musical, artistic works, recordings, broadcasts and computer programs.");
  b.card("CONCEPT", "Why copyright matters", "Creators earn income; creativity is encouraged; reputation is protected; creative and software industries grow.");
  b.card("CONCEPT", "Consequences of plagiarism", "Zero marks or disqualification; suspension or expulsion; loss of trust; legal action; skills not learnt.");
  b.card("CONCEPT", "Consequences of piracy", "Developers lose income; users risk fines, malware and no updates; the country loses tax and investment.");
  b.card("CONCEPT", "Licence types", "Single-user (one computer); site (all computers at one site); freeware (free, still copyright); shareware (trial then pay); open source (code may be changed and shared).");
  b.card("CONCEPT", "Anti-plagiarism software", "Compares a document with a database of web pages, books and earlier work and highlights matching passages with a similarity score.");
});
