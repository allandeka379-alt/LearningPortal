// W2b: ahist.empowerment.intellectual-property (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.empowerment.intellectual-property", { file: "empowerment/intellectual-property", keyPrefix: "empowerment.intellectual-property" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is intellectual property?",
    options: [
      ["Legal rights over creations of the mind, such as inventions and songs", "Correct: it covers inventions, works, designs and names."],
      ["The land and buildings that a business owns in the towns", "That is physical property, not intellectual property."],
      ["The money that a government borrows from international lenders", "That is public debt."],
      ["The knowledge that pupils gain from their teachers at school", "That is education, not a legal right of ownership."],
    ],
    answer: "A",
    explanation: "Intellectual property means legal rights over creations of the mind: inventions, works, designs, names and symbols.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which form of intellectual property protects a new invention, such as a new type of water filter?",
    options: [
      ["A patent, granted for a limited period such as twenty years", "Correct: patents protect new, inventive products and processes."],
      ["A copyright, which protects only the book that describes it", "Copyright protects expression, not an invention's method."],
      ["A trade mark, which protects only the name of the filter", "A trade mark protects the brand, not the invention."],
      ["An industrial design, which protects the way it works inside", "A design protects appearance, not function."],
    ],
    answer: "A",
    explanation: "A patent protects a new, inventive and useful product or process for a limited period, generally 20 years.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What does the Zimbabwe Intellectual Property Office (ZIPO) mainly do?",
    options: [
      ["Registers patents, trade marks and industrial designs in Zimbabwe", "Correct: it keeps the registers."],
      ["Collects royalties from radio stations and venues on behalf of musicians", "That is the work of ZIMURA."],
      ["Settles trade disputes between member states of the WTO", "That is the work of the WTO."],
      ["Grants passports and identity documents to Zimbabwean citizens", "That is a different government office."],
    ],
    answer: "A",
    explanation: "ZIPO registers patents, trade marks and designs; ZIMURA collects music royalties.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement about copyright is correct?",
    options: [
      ["It arises automatically when a work is created, usually without any need for registration", "Correct: no registration is usually needed."],
      ["It is granted only after an application is examined and approved by a patent office", "That describes patents."],
      ["It lasts for exactly one year and then ends for ever for every work of every kind", "It lasts for a long period, usually the author's life and more."],
      ["It protects ideas and methods themselves rather than the way they are expressed", "It protects expression, not ideas."],
    ],
    answer: "A",
    hints: ["Think of a song written in a home studio: must it be registered first?"],
    explanation: "Copyright arises automatically on creation of an original work and generally lasts for the author's life and a long period after death.",
  });
  b.mcq({
    d: 3, skill: "RECALL",
    stem: "Where is the African Regional Intellectual Property Organization (ARIPO) headquartered?",
    options: [
      ["Harare", "Correct: Zimbabwe hosts the organisation."],
      ["Geneva", "WIPO is headquartered in Geneva."],
      ["Gaborone", "SADC's Secretariat is in Gaborone."],
      ["Addis Ababa", "The African Union is headquartered in Addis Ababa."],
    ],
    answer: "A",
    hints: ["Think of the capital of Zimbabwe."],
    explanation: "ARIPO, created by the Lusaka Agreement of 1976, has its headquarters in Harare.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is traditional knowledge difficult to protect with ordinary patents and copyright?",
    options: [
      ["It is held by a community and passed on across generations, often unwritten", "Correct: no single author or inventor can be named."],
      ["It has never been used by any person in a business, in farming or in medicine", "It has been used by communities for generations."],
      ["It is protected only in those countries that are members of the Commonwealth of Nations", "Protection does not depend on that."],
      ["It must by law be kept secret and may never be taught to anyone outside the family", "Many traditional practices are shared openly."],
    ],
    answer: "A",
    hints: ["Think of who the owner or author would be."],
    explanation: "Patents and copyright suit individual inventors and authors; traditional knowledge belongs to communities and is often unwritten, so special frameworks such as the Swakopmund Protocol are needed.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which pairing of case and form of protection is correct?",
    options: [
      ["A logo used by a bakery and a registered trade mark", "Correct: a logo identifies a business."],
      ["A song written by a musician and a registered patent", "A song is protected by copyright."],
      ["A new machine for sorting grain and a trade mark alone", "An invention is protected by a patent."],
      ["The shape of a bottle and the Berne Convention only", "The shape can be registered as an industrial design."],
    ],
    answer: "A",
    hints: ["Match the type of creation with the right form of protection."],
    explanation: "Logos are protected as trade marks, songs by copyright, inventions by patents and shapes by industrial designs.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which of the following is the strongest argument for stronger enforcement against piracy?",
    options: [
      ["Pirated music and software deprive local creators and businesses of income", "Correct: this is the reward-and-incentive argument."],
      ["Pirated copies are always cheaper for buyers and so should be treated as legal sales", "This supports piracy, not enforcement."],
      ["Creators in Zimbabwe have no interest in whether their works are copied by others", "Many creators depend on royalties."],
      ["Piracy has never happened in any country that has a copyright law on its books", "Piracy occurs in many countries."],
    ],
    answer: "A",
    hints: ["Choose the argument that links enforcement to reward for creators."],
    explanation: "The usual argument is that piracy removes the income that rewards creators and discourages new work.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "A registered trade mark gives its owner the exclusive right to use the mark for the goods it covers.", answer: true,
    explanation: "Registration of a trade mark gives the owner exclusive rights to use it for a renewable period.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "ZIMURA collects royalties for musicians from users of their music.", answer: true,
    explanation: "ZIMURA is the collecting society that gathers royalties from radio stations, venues and other users and pays them to musicians.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "Intellectual property laws always favour creators over the public, with no allowance for public health or education.", answer: false,
    hints: ["Think of the balance between creators and users."],
    explanation: "Systems try to balance creators' rights with public access, and developing countries argue for rules that allow for health and education.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each type of intellectual property to what it protects.",
    pairs: [
      ["Patent", "A new and inventive product or process"],
      ["Copyright", "Songs, books, films and software"],
      ["Trade mark", "A brand name or logo"],
      ["Industrial design", "The look of a product such as a bottle"],
    ],
    explanation: "These are the main types of intellectual property.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each body to its role.",
    pairs: [
      ["ZIPO", "Registers patents, trade marks and designs in Zimbabwe"],
      ["ZIMURA", "Collects royalties for musicians"],
      ["ARIPO", "A regional body with protocols on patents, marks and traditional knowledge"],
      ["WIPO", "The UN agency in Geneva that administers major IP treaties"],
    ],
    hints: ["Think about which are national and which are regional or global."],
    explanation: "ZIPO and ZIMURA are national; ARIPO is regional; WIPO is global.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The {{blank:a}} Office in Zimbabwe registers patents and trade marks, while the regional body {{blank:b}} has its headquarters in Harare.",
    blanks: [
      { id: "a", accepted: ["Zimbabwe Intellectual Property"], choices: ["Zimbabwe Intellectual Property", "Zimbabwe Revenue", "Zimbabwe Electoral", "Zimbabwe Tourism"] },
      { id: "b", accepted: ["ARIPO"], choices: ["ARIPO", "WIPO", "SADC", "UNESCO"] },
    ],
    explanation: "ZIPO registers patents and trade marks; ARIPO is headquartered in Harare.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the legal right of a composer or author over the copying of a song or book, which arises automatically?",
    accepted: ["copyright", "Copyright"],
    wrong: ["patent"],
    explanation: "**Copyright**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe four types of intellectual property.",
    points: ["Patents protect new, inventive products and processes", "Copyright protects works such as songs, books and software", "Trade marks protect brand names and logos", "Industrial designs protect the appearance of products (traditional knowledge is also protected through special frameworks)"],
    modelAnswer: "Patents protect new and inventive products and processes. Copyright protects works such as songs, books and software. Trade marks protect brand names and logos, and industrial designs protect the appearance of a product such as a bottle.",
    explanation: "One mark for each type described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why protecting intellectual property is important for the empowerment of small businesses.",
    points: [["A registered trade mark or design builds a business's reputation and stops competitors copying its brand or product", 2], ["A patent or licence gives a small inventor something to sell or to show investors, and lets the owner earn from creativity", 2]],
    hints: ["Link protection to reputation and to income."],
    modelAnswer: "A registered trade mark or design builds a business's reputation and stops competitors from copying its brand or product. A patent or licence gives a small inventor something to sell or to show investors, so that the owner earns from creativity instead of watching others profit.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain two challenges to the protection of intellectual property in Zimbabwe.",
    points: [["Piracy of music, films and software, especially digital copying, is widespread, and enforcement agencies have limited resources", 2], ["Many creators and small businesses are unaware of their rights or find registration costly and slow, and traditional knowledge is hard to protect because it is held collectively", 2]],
    hints: ["Give one enforcement problem and one problem of awareness or cost."],
    modelAnswer: "Piracy of music, films and software, especially digital copying, is widespread, and the police and courts have limited resources to stop it. Many creators and small businesses do not know their rights or find registration costly and slow, and traditional knowledge is hard to protect because it belongs to whole communities.",
    explanation: "Credit developed challenges.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter from a fictional Harare musician to a newspaper, 2015",
        "My songs are played on the radio every day, and I am told that royalties are collected, yet I received less than the price of a meal last year. Meanwhile copies of my album are sold on the street for a few coins. How can I make music if no one pays for it?"),
      "",
      source("Source B", "a statement by a fictional official of a collecting society, 2015",
        "Royalties depend on stations reporting what they play, and many do not. We are working to register more users and to improve our records. Enforcement is the duty of the police and the courts, and piracy cannot end until the public understands that creators deserve payment."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What problems does the musician in Source A describe?", points: ["Very small royalty payments despite regular radio play", "Pirated copies of the album sold cheaply on the street"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What reasons does the official in Source B give for the difficulties?", points: ["Many stations do not report what they play", "Enforcement is a matter for the police and courts / the public does not understand creators' rights"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How far do the sources agree about why creators earn so little?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["Agree that piracy and lack of payment reduce incomes", 1], ["Differ in emphasis: A blames the system for failing creators, B explains weak reporting and enforcement and places some duty on others", 1], ["Provenance: A is a musician with a personal interest; B is an official defending an organisation, writing in the same year", 1], ["Own knowledge: collecting societies, piracy and limited enforcement are recognised challenges in Zimbabwe", 1]], modelAnswer: "The sources agree that creators earn very little, because of both unpaid royalties and piracy. They differ in emphasis. Source A, from a musician with a personal interest, blames a system that fails creators, while Source B, from an official defending a collecting society, explains weak reporting by stations and says that enforcement and public understanding are the responsibility of others. My own knowledge confirms that weak reporting, piracy and limited enforcement are recognised challenges." }),
    ],
    hints: ["For (c), compare who each source blames."],
    explanation: "Both sources are invented: a musician's letter and an official's statement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent have efforts to protect intellectual property in Zimbabwe been successful?",
    levels: levels(12),
    points: [
      ["Laws: separate Acts for patents, trade marks, designs, copyright and geographical indications", 2],
      ["Institutions: ZIPO, ZIMURA, membership of WIPO and ARIPO, regional protocols", 3],
      ["Achievements: registers, royalty collection, regional filing, awareness campaigns, protection for some artists and firms", 2],
      ["Challenges: piracy, low awareness, cost, limited enforcement, traditional knowledge, few patent filings", 3],
      ["Supported judgement", 2],
    ],
    hints: ["Compare the framework of laws and institutions with how well it works."],
    modelAnswer: "Efforts have been partly successful. Zimbabwe has separate laws for patents, trade marks, designs, copyright and geographical indications, a registry in ZIPO, a collecting society in ZIMURA, and membership of WIPO and ARIPO, which is headquartered in Harare and provides regional filing and a protocol on traditional knowledge. Some musicians and firms have benefited from royalties and registered brands. But piracy, especially digital copying, remains widespread, many creators and small businesses are unaware of their rights or cannot afford registration, enforcement is limited, and few patents are filed. I conclude that the legal and institutional framework is good, but its effect is limited by weak enforcement and low awareness.",
    explanation: "Credit laws, institutions, achievements, challenges and a supported judgement.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of regional and international bodies such as ARIPO and WIPO in protecting intellectual property in Zimbabwe.",
    levels: levels(8),
    points: [
      ["WIPO: global treaties and standards, assistance with laws and training", 2],
      ["ARIPO: Harare Protocol on patents and designs, Banjul Protocol on marks, Swakopmund Protocol on traditional knowledge; a single application for several states", 2],
      ["Limits: national enforcement is still needed; costs and awareness; not all states join every protocol", 2],
      ["Judgement on their importance", 2],
    ],
    hints: ["Compare what the bodies provide with what national institutions must still do."],
    modelAnswer: "Regional and international bodies are important, but they cannot replace national enforcement. WIPO administers the major treaties and gives help with laws and training. ARIPO, based in Harare, allows an applicant to seek protection in several member states through one application under the Harare and Banjul Protocols and provides a framework for traditional knowledge under the Swakopmund Protocol. But rights still have to be enforced in each country by national police and courts, and small creators often lack the money and knowledge to use these systems. I conclude that the bodies provide valuable standards and shared procedures, but their benefit depends on national action.",
    explanation: "Credit explained roles, limits and a judgement.",
  });

  b.card("DEFINITION", "What is intellectual property?", "Legal rights over creations of the mind, such as inventions, works, designs, names and symbols.");
  b.card("DEFINITION", "What is a patent?", "An exclusive right, generally for 20 years, to make, use and sell a new, inventive and useful invention.");
  b.card("DEFINITION", "What is copyright?", "The automatic right of authors, composers and artists to control the copying and public use of their works.");
  b.card("DEFINITION", "What is a trade mark?", "A sign, name or logo that distinguishes the goods or services of one business from another; protected by registration.");
  b.card("FACT", "What does ZIPO do?", "The Zimbabwe Intellectual Property Office registers patents, trade marks and industrial designs.");
  b.card("FACT", "What is ZIMURA?", "The Zimbabwe Music Rights Association, which collects royalties for musicians.");
  b.card("FACT", "What are ARIPO and WIPO?", "ARIPO: African regional organisation headquartered in Harare (Lusaka Agreement, 1976); WIPO: UN agency in Geneva that administers major IP treaties.");
  b.card("CONCEPT", "Why is traditional knowledge hard to protect?", "It belongs to communities, is passed on across generations and is often unwritten, so patents and copyright do not fit.");
  b.card("CONCEPT", "What are the main challenges to protecting IP in Zimbabwe?", "Piracy, low awareness, cost of registration, limited enforcement, few patent filings.");
});
