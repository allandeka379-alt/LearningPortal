// W2b: intellectual property (ZIMSEC Commerce only).
import { concept, P, money } from "../lib.mjs";

const units = 1800, royalty = 4;
const totalRoyalty = units * royalty; // 7200

concept("bus.enterprise.intellectual-property", { file: "enterprise/intellectual-property", keyPrefix: "enterprise.intellectual-property" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of intellectual property protects a new invention?",
    options: [
      ["A patent", "Correct: patents protect new inventions."],
      ["A trademark", "Trademarks protect brand names and logos."],
      ["Copyright", "Copyright protects creative work such as music and books."],
      ["A geographical indication", "This protects names linked to a place of origin."],
    ],
    answer: "A",
    explanation: "A **patent** gives an inventor the right to stop others making or selling the invention for a limited time.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does copyright protect?",
    options: [
      ["Original creative work such as songs and books", "Correct: copyright covers literary, artistic and musical work."],
      ["A business's brand name and logo", "That is a trademark."],
      ["A new machine or production process", "That is a patent."],
      ["The shape of a product", "That is an industrial design."],
    ],
    answer: "A",
    explanation: "**Copyright** protects original creative work: books, music, films, art, photographs and software.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A vendor at a bus terminus sells copied films on flash drives without permission. What is this infringement called?",
    options: [
      ["Piracy", "Correct: unauthorised copying and selling of copyright work."],
      ["Plagiarism", "Plagiarism is passing off someone's work as your own."],
      ["Counterfeiting", "Counterfeiting copies branded goods and trademarks."],
      ["Patent infringement", "Films are protected by copyright, not patents."],
    ],
    answer: "A",
    explanation: "Copying and selling films, music or software without permission is **piracy**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Fake batteries carrying a well-known brand's name and logo are sold in a market. Which type of intellectual property is being infringed?",
    options: [
      ["Trademark", "Correct: the brand name and logo are trademarks."],
      ["Copyright", "Copyright protects creative work, not brand names."],
      ["Geographical indication", "Nothing about the place of origin is involved."],
      ["Industrial design", "The issue is the brand name and logo, not the product's shape."],
    ],
    answer: "A",
    explanation: "Making fake goods with someone else's brand is **counterfeiting**, an infringement of the **trademark**.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Where are the headquarters of ARIPO?",
    options: [
      ["Harare", "Correct: ARIPO's headquarters are in Harare."],
      ["Geneva", "Geneva is the home of WIPO."],
      ["Bulawayo", "ARIPO is not based in Bulawayo."],
      ["Gaborone", "ARIPO is not based in Gaborone."],
    ],
    answer: "A",
    explanation: "The **African Regional Intellectual Property Organization** has its headquarters in **Harare**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main benefit to an inventor of applying through ARIPO?",
    options: [
      ["Protection in several member countries with one application", "Correct: this is ARIPO's main service."],
      ["Protection in every country in the world automatically", "No organisation gives automatic worldwide protection."],
      ["Free advertising of the invention", "ARIPO does not advertise inventions."],
      ["A government grant to manufacture the invention", "ARIPO does not give manufacturing grants."],
    ],
    answer: "A",
    explanation: "ARIPO allows one application to cover **several African member states**, saving time and cost.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which organisation is a United Nations agency that promotes the protection of intellectual property worldwide?",
    options: [
      ["WIPO", "Correct: the World Intellectual Property Organization."],
      ["ARIPO", "ARIPO is a regional African organisation."],
      ["The Zimbabwe Stock Exchange", "The stock exchange deals in shares."],
      ["The Consumer Council of Zimbabwe", "The consumer council protects consumers' interests."],
    ],
    answer: "A",
    explanation: "**WIPO** is the UN agency for IP: it administers treaties, provides international filing systems and helps developing countries.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does protecting intellectual property encourage businesses to spend money on research?",
    options: [
      ["Rivals cannot copy the results, so the business can earn a return", "Correct: protection lets the inventor profit from the investment."],
      ["Research becomes free for registered businesses", "Registration does not pay for research."],
      ["Protected inventions never need to be sold", "Inventions must be sold or licensed to earn money."],
      ["Registered businesses no longer pay any tax on their profits", "IP protection has no effect on tax liability."],
    ],
    answer: "A",
    hints: ["Would you spend two years developing a product if a rival could copy it the next day?"],
    explanation: "Without protection, rivals could copy an invention without paying for the research, so few businesses would invest in it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Copyright arises automatically when an original work is created.",
    answer: true,
    explanation: "True. Unlike patents and trademarks, copyright does not need to be registered.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A patent protects an invention for ever.",
    answer: false,
    explanation: "False. A patent lasts for a limited time; afterwards anyone may use the invention.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item with the type of intellectual property that protects it.",
    pairs: [
      ["A new process for drying fruit", "Patent"],
      ["The logo of a bakery", "Trademark"],
      ["A novel written by a local author", "Copyright"],
      ["The distinctive shape of a chair", "Industrial design"],
    ],
    explanation: "Invention: patent; brand: trademark; creative work: copyright; appearance: industrial design.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each organisation with one of its functions.",
    pairs: [
      ["Zimbabwe Intellectual Property Office", "Registers patents and trademarks in Zimbabwe"],
      ["ARIPO", "Regional protection in several African member states through one application"],
      ["WIPO", "Administers international treaties on intellectual property"],
    ],
    explanation: "National, regional and international levels of IP protection.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Presenting someone else's written work as your own is called {{blank:a}}. A court order telling an infringer to stop is called an {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["plagiarism"], choices: ["plagiarism", "piracy", "counterfeiting", "royalty"] },
      { id: "b", accepted: ["injunction"], choices: ["injunction", "invoice", "indemnity", "integration"] },
    ],
    explanation: "**Plagiarism** passes off another's work; an **injunction** orders the infringer to stop.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Chipo has patented a water pump. She licenses a factory in Gweru to make it and receives a royalty of ${money(royalty)} for every pump sold. The factory sold ${units.toLocaleString("en-GB")} pumps last year. Calculate Chipo's royalty income for the year.`,
    kind: "money", value: totalRoyalty, wrong: [units + royalty],
    hints: ["Royalty income = royalty per unit × number of units sold."],
    explanation: `${units.toLocaleString("en-GB")} × ${money(royalty)} = ${money(totalRoyalty)}. Licensing lets an inventor earn from a patent without manufacturing.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** reasons why intellectual property should be protected.",
    points: [
      "Rewards creators / inventors with income.",
      "Explains: they can sell or license the work, so creativity pays.",
      "Encourages innovation / protects consumers from fakes / protects reputation / supports the economy.",
      "Explains the second reason.",
    ],
    hints: ["Think about the creator, the consumer and the economy."],
    modelAnswer: "Protection rewards inventors and artists: they can sell or license their work and earn royalties, which encourages them to create more. It also protects consumers, because trademarks show who made a product, so buyers are not tricked into buying unsafe counterfeit goods.",
    explanation: "Reasons: reward, innovation, consumer protection, reputation, economy and foreign investment.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Describe **four** remedies available when intellectual property is infringed.",
    points: [
      "Suing for damages / compensation.",
      "Injunction ordering the infringer to stop.",
      "Seizure and destruction of pirated or counterfeit goods.",
      "Fines or imprisonment / account of profits.",
    ],
    hints: ["Think about the courts, the police and customs."],
    modelAnswer: "The owner can sue for damages, ask a court for an injunction to stop the infringement, have pirated or counterfeit goods seized and destroyed by police or customs, and the offender can be fined or imprisoned.",
    explanation: "Remedies: damages, injunctions, seizure, fines and imprisonment, account of profits.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Tendai is a musician in Harare. His latest album sells well in shops, but he discovers that copies are being sold cheaply on flash drives in several markets. A clothing company has also printed his photograph on T-shirts without asking him.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the type of intellectual property that protects Tendai's album.", accepted: ["copyright", "copy right"], wrong: ["patent"] }),
      P.short({ label: "(b)", marks: 1, stem: "Name the infringement committed by the sellers of the flash drives.", accepted: ["piracy", "music piracy"], wrong: ["plagiarism"] }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain how the piracy affects **two** groups other than Tendai.",
        points: [
          "Honest music shops / distributors.",
          "Lose sales to cheap copies (unfair competition).",
          "Government / consumers.",
          "Loses tax on legitimate sales / consumers get poor-quality copies.",
        ],
        modelAnswer: "Honest music shops lose sales because customers buy the cheap copies instead, which is unfair competition. The government loses tax because pirated sales are not recorded.",
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Recommend what Tendai should do. Justify your answer.",
        points: [
          "Report the sellers to the police so that copies are seized.",
          "Seek legal action / injunction / damages against the clothing company.",
          "Justifies: stops further losses and recovers income.",
          "Prevention: educate fans / sell cheap legal downloads, with justification.",
        ],
        modelAnswer: "Tendai should report the market sellers to the police so that the pirated copies are seized, and take legal action against the clothing company for using his photograph without permission, asking for damages and an injunction. This stops further losses and may recover lost income. He could also sell his music cheaply online so that fans have an easy legal choice.",
      }),
    ],
    hints: ["(c) Who else loses when cheap copies are sold?"],
    explanation: "(a) Copyright. (b) Piracy. (c) Honest traders, government and consumers lose. (d) Police action, legal action and prevention.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Nyasha has invented a low-cost machine for shelling groundnuts. She wants to sell it in Zimbabwe, Zambia and Malawi. Registering patents will cost money, and she is not sure it is worth it.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain how the Zimbabwe Intellectual Property Office and ARIPO could help Nyasha.",
        points: [
          "National office registers her patent in Zimbabwe.",
          "Gives her the legal right to stop copies in Zimbabwe.",
          "ARIPO: one application for protection in several member states.",
          "Saves time and cost compared with applying separately in Zambia and Malawi.",
        ],
        modelAnswer: "The Zimbabwe office can register her patent, giving her the legal right to stop others copying the machine in Zimbabwe. Through ARIPO she could seek protection in several African member states, such as her other target markets, with one application, saving time and money.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Discuss whether Nyasha should pay to patent her invention.",
        points: [
          "For: stops rivals copying; she earns the reward for her work.",
          "For: can license the design and earn royalties.",
          "For: easier to attract investors or lenders.",
          "Against: registration and legal costs; enforcement in several countries is costly.",
          "Against: a simple machine may be copied anyway; small markets.",
          "Justified conclusion.",
        ],
        modelAnswer: "A patent would stop rivals copying her machine, so she earns the reward for her invention, and she could license the design to manufacturers for royalties. It would also help her attract investors. However, registration costs money and enforcing her rights in three countries could be expensive, and copiers may still appear in informal markets. Because she plans to sell in three countries, where copying could quickly take away her market, she should patent the machine, using ARIPO to keep costs down.",
      }),
    ],
    hints: ["(b) Compare the cost of a patent with the income she could lose to copiers."],
    explanation: "National and regional registration protect inventors. A patent costs money but protects income in several markets.",
  });
  b.card("DEFINITION", "What is **intellectual property**?", "Creations of the mind (inventions, brands, designs, creative work) that the law allows owners to protect.");
  b.card("FACT", "Five types of intellectual property?", "Patents, trademarks, copyright, industrial designs, geographical indications.");
  b.card("CONCEPT", "Patent vs copyright?", "Patent: protects an invention; must be registered; limited time. Copyright: protects creative work; automatic.");
  b.card("DEFINITION", "What is **piracy**?", "Copying and selling copyright work (music, films, software) without permission.");
  b.card("DEFINITION", "What is **counterfeiting**?", "Making fake goods that copy another business's brand or trademark.");
  b.card("FACT", "What is **ARIPO**?", "African Regional Intellectual Property Organization, HQ Harare: one application for protection in several member states.");
  b.card("FACT", "What is **WIPO**?", "World Intellectual Property Organization, a UN agency in Geneva: promotes IP protection, administers treaties, helps developing countries.");
  b.card("FACT", "Remedies for infringement?", "Damages, injunction, seizure and destruction of goods, fines or imprisonment, account of profits.");
  b.card("DEFINITION", "What is a **royalty**?", "A payment to the owner of intellectual property for each use or sale under a licence.");
});
