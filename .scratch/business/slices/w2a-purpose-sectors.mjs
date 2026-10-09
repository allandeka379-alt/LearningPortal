// W2a: purpose of business organisations; private/public and formal/informal sectors (COM, BES, CAM).
import { concept, P, COM, BES } from "../lib.mjs";

concept("bus.organisation.purpose-sectors", { file: "organisation/purpose-sectors", keyPrefix: "organisation.purpose-sectors" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which business unit is in the **public** sector?",
    options: [
      ["A rural district council", "Correct: a local authority is owned and controlled by government on behalf of residents."],
      ["A public limited company", "A plc is owned by private shareholders, so it is in the private sector."],
      ["A partnership of lawyers", "Partnerships are owned by private individuals."],
      ["A co-operative of farmers", "Co-operatives are owned by their private members."],
    ],
    answer: "A",
    explanation: "The public sector is owned by central or local government. Local authorities (city, town and rural district councils) belong to it.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What decides whether a business is in the private or the public sector?",
    options: [
      ["Who owns and controls it", "Correct: ownership is the test."],
      ["How many workers it employs", "Size does not decide the sector; small and large businesses exist in both."],
      ["Whether it makes a profit", "Some public enterprises make profits and many private firms make losses."],
      ["What kind of goods it makes", "The type of activity decides primary/secondary/tertiary, not private/public."],
    ],
    answer: "A",
    explanation: "Private sector businesses are owned by individuals or shareholders; public sector organisations are owned by central or local government.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A company's shares are bought and sold on the Zimbabwe Stock Exchange. In which sector is it?",
    options: [
      ["Private sector", "Correct: a public limited company is owned by private shareholders."],
      ["Public sector", "The word public refers to who can buy the shares, not to state ownership."],
      ["Informal sector", "A listed company is registered and regulated, so it is formal."],
      ["Primary sector", "Nothing in the stem says it extracts natural resources."],
    ],
    answer: "A",
    explanation: "Public limited companies are private-sector businesses whose shares can be offered to the general public.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a feature of the **informal** sector?",
    options: [
      ["Businesses are often unregistered and keep few records", "Correct: informal businesses are largely outside registration and tax rules."],
      ["Workers usually have written contracts and pensions", "That describes formal employment."],
      ["Businesses find it easy to borrow from banks", "Informal businesses lack records and collateral, so bank loans are hard to get."],
      ["Businesses must publish audited accounts", "Only some formal businesses, such as companies, must do this."],
    ],
    answer: "A",
    explanation: "The informal sector consists of small businesses that are not (fully) registered, pay little tax and keep few written records.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the **main** aim of most public sector organisations?",
    options: [
      ["To provide essential services to the public", "Correct: profit is usually secondary to the service."],
      ["To pay the highest dividends to shareholders", "Public sector organisations have no private shareholders."],
      ["To avoid paying any wages to workers", "All organisations pay their workers."],
      ["To compete with every private business", "Their purpose is the service, not competing for its own sake."],
    ],
    answer: "A",
    explanation: "Public sector bodies exist mainly to provide services such as water, electricity and transport; they may aim to cover costs or make a surplus.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A mining company builds a tarred road and a clinic that the nearby village also uses. Which purpose of business organisations does this show?",
    options: [
      ["Developing infrastructure", "Correct: roads and clinics are infrastructure that serve the community."],
      ["Satisfying wants through retailing", "Retailing is not described here."],
      ["Paying taxes to ZIMRA", "Building a road is not a tax payment."],
      ["Earning foreign currency from exports", "The road and clinic are not exports."],
    ],
    answer: "A",
    explanation: "Large businesses often build roads, clinics, schools and housing, which develop infrastructure for local communities.",
    hints: ["What do roads and clinics have in common?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A vendor sells tomatoes at a street corner without a licence. Which description is correct?",
    options: [
      ["Private, informal and tertiary", "Correct: privately owned, unregistered and a trading (service) activity."],
      ["Public, informal and primary", "The vendor is not owned by the state and is not growing the tomatoes."],
      ["Private, formal and secondary", "Without a licence the vendor is informal, and selling is not manufacturing."],
      ["Public, formal and tertiary", "The vendor is privately owned and unregistered."],
    ],
    answer: "A",
    explanation: "Three separate classifications: ownership (private), registration (informal) and type of activity (tertiary, because trade is a service).",
    hints: ["Answer three questions: who owns it, is it registered, what does it do?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A public limited company is part of the public sector.",
    answer: false,
    explanation: "False. A public limited company is owned by private shareholders, so it is in the private sector.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Public sector organisations are allowed to make a profit.",
    answer: true,
    explanation: "True. Many public corporations charge for their services and may make a surplus, although their main aim is the service.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each business unit with the sector it belongs to.",
    pairs: [
      ["A city council's refuse collection department", "Public sector"],
      ["A hair salon owned by two friends", "Private sector"],
      ["An unlicensed airtime seller at a bus terminus", "Informal sector"],
    ],
    explanation: "The council is owned by a local authority (public); the salon is privately owned (private); the unlicensed seller is unregistered (informal, and also private).",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "The private sector is owned by {{blank:a}} and usually aims to make a {{blank:b}}. The public sector is owned by the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["individuals", "private individuals", "shareholders", "private owners", "individuals or shareholders"] },
      { id: "b", accepted: ["profit"] },
      { id: "c", accepted: ["government", "state", "the government", "the state", "government or local authorities"] },
    ],
    wrong: [["government", "profit", "shareholders"]],
    explanation: "Private sector: owned by individuals or shareholders, aiming for profit. Public sector: owned by central or local government, aiming to provide services.",
  });
  b.short({
    d: 2,
    stem: "Give the term for the process by which an informal business registers, obtains licences and begins paying taxes.",
    accepted: ["formalisation", "formalization", "formalising", "formalizing", "formalisation of the business"],
    wrong: ["privatisation", "registration fee"],
    explanation: "**Formalisation** moves a business from the informal to the formal sector.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** purposes of business organisations.",
    points: [
      "Purpose 1 identified, e.g. creating employment (1)",
      "Explained, e.g. workers earn wages to support their families and spend in the economy (1)",
      "Purpose 2 identified, e.g. satisfying needs and wants / paying taxes / developing infrastructure (1)",
      "Explained, e.g. goods are available where and when people want them / taxes fund schools and clinics (1)",
    ],
    modelAnswer: "Businesses create employment: they hire workers, who earn wages and can support their families. They also satisfy needs and wants by producing goods and services and making them available where people live.",
    explanation: "Each purpose needs to be stated and then explained in terms of its effect.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why the informal sector is important to Zimbabwe's economy.",
    points: [
      "Reason 1, e.g. provides a living for people who cannot find formal jobs (1)",
      "Developed, e.g. reduces poverty / supports households (1)",
      "Reason 2, e.g. supplies cheap goods in small quantities close to homes / develops enterprise skills (1)",
      "Developed, e.g. convenient for low-income consumers / some informal businesses grow and formalise (1)",
    ],
    modelAnswer: "The informal sector gives many people a way to earn a living when formal jobs are scarce, so households can buy food and pay school fees. It also supplies goods in small quantities near people's homes, which suits low-income customers who cannot buy in bulk.",
    explanation: "State each reason and show its effect on people or the economy.",
    hints: ["Think about jobs and about customers on low incomes."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Discuss whether the government should force all informal businesses to register. Give a justified conclusion.",
    points: [
      "For: more tax revenue for public services (1)",
      "For: better working conditions, safety and consumer protection (1)",
      "Against: registration costs and taxes may close very small businesses (1)",
      "Against: job and income losses for poor households (1)",
      "Alternative, e.g. simplify registration / offer workspace and loans in return (1)",
      "Justified conclusion (1)",
    ],
    modelAnswer: "Registration would raise tax revenue and let the government enforce safety and hygiene rules. However, forcing registration could close the smallest businesses, which cannot afford fees and taxes, causing hardship. It is better to encourage registration by making it simple and cheap and linking it to benefits such as workspace and loans, so formalisation happens without destroying livelihoods.",
    explanation: "A balanced answer weighs gains (tax, regulation) against losses (closures, poverty) and reaches a reasoned judgement.",
    hints: ["Who gains and who loses from registration?", "Is there a middle way?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720,
    stem: "Gweru has the following organisations on one street: (1) a branch of a water authority owned by the city council; (2) a clothing shop owned by Tendai; (3) a public limited company that runs a supermarket; (4) a man who repairs shoes on the pavement without a licence.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which of the four is in the public sector?",
        options: [["The water authority branch", "Correct: owned by the city council."], ["The supermarket plc", "Owned by private shareholders."], ["Tendai's clothing shop", "Owned by an individual."], ["The shoe repairer", "A private, informal business."]],
        answer: "A",
      }),
      P.short({
        label: "(b)", marks: 1,
        stem: "Name the sector (formal or informal) of the shoe repairer.",
        accepted: ["informal", "informal sector", "the informal sector"],
        wrong: ["formal"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** differences between the aims of the water authority and the supermarket.",
        points: ["Water authority aims to provide an essential service (1)", "To all residents at affordable charges, including poor households (1)", "Supermarket aims to make a profit (1)", "For its shareholders, who receive dividends (1)"],
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Explain how the four organisations together benefit the people of Gweru.",
        points: ["Satisfy needs and wants (water, food, clothes, repairs) (1)", "Create jobs and incomes (1)", "Formal businesses pay taxes / rates used for public services (1)", "Informal repairer offers cheap services and self-employment (1)"],
      }),
    ],
    explanation: "Ownership decides the sector: council-owned is public; Tendai's shop, the plc and the repairer are private. The repairer is informal. Public bodies aim at service; private firms at profit.",
    hints: ["Who owns each organisation?", "Think of services, jobs and taxes for (d)."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "A town council plans to build 150 covered market stalls in Masvingo and charge vendors a monthly rent. At present most vendors sell on the pavement without licences.",
    parts: [
      P.tf({
        label: "(a)", marks: 1,
        stem: "The town council is a private sector organisation.",
        answer: false,
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Identify **three** features of the vendors that show they are in the informal sector.",
        points: ["Unlicensed / unregistered (1)", "Trade on the pavement / no fixed premises (1)", "Pay little or no tax / few records (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** benefits to the vendors of moving into the council's stalls.",
        points: ["Benefit 1, e.g. shelter and security for goods (1)", "Developed, e.g. less loss from rain or theft (1)", "Benefit 2, e.g. legal status, no removal by authorities (1)", "Developed, e.g. can build a regular customer base / access loans (1)"],
      }),
      P.manual({
        label: "(d)", marks: 4, type: "EXTENDED_RESPONSE",
        stem: "Evaluate whether the plan will benefit the town as a whole.",
        points: ["Benefit: cleaner, safer streets and orderly trading (1)", "Benefit: rent and licence income for the council's services (1)", "Drawback: rent may be too high for poorer vendors, who lose their livelihood or stay on the street (1)", "Justified conclusion (1)"],
        modelAnswer: "The town benefits from cleaner, safer streets and the council gains rent to spend on services. However, if rents are too high, the poorest vendors may be unable to move and either lose their income or remain on the street. The plan is worthwhile if rents are set at a level vendors can afford.",
      }),
    ],
    explanation: "A council is a public-sector local authority. Formalising vendors brings security and order but must be affordable.",
    hints: ["Who owns a town council?", "Consider vendors, the council and residents."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: COM,
    stem: "Which of these is a business unit in the **public** sector, as classified in Commerce?",
    options: [
      ["A marketing board", "Correct: marketing boards are public bodies."],
      ["A sole proprietorship", "Owned by one private individual."],
      ["A private limited company", "Owned by private shareholders."],
      ["A franchise outlet", "Owned by a private franchisee."],
    ],
    answer: "A",
    explanation: "Public sector business units include government departments, public corporations, local authorities and marketing boards.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: BES,
    stem: "A new factory in a rural area employs 120 local people. Which purpose of business enterprises does this mainly show?",
    options: [
      ["Employment creation", "Correct: it provides jobs for local people."],
      ["Infrastructure development", "Nothing is said about roads, power or water."],
      ["Import substitution", "Nothing is said about replacing imports."],
      ["Consumer protection", "That is not a purpose shown by hiring workers."],
    ],
    answer: "A",
    explanation: "Employment creation is one of the main purposes of business enterprises: jobs give people incomes.",
  });
  b.card("DEFINITION", "Private sector", "The part of the economy owned by private individuals or shareholders, usually aiming for profit.");
  b.card("DEFINITION", "Public sector", "The part of the economy owned and controlled by central or local government, usually to provide services.");
  b.card("DEFINITION", "Informal sector", "Businesses that are unregistered or only partly registered, pay little tax and keep few records.");
  b.card("DEFINITION", "Formal sector", "Registered, licensed businesses that pay taxes and follow employment laws.");
  b.card("FACT", "Public sector business units", "Government departments, public corporations (parastatals), local authorities and marketing boards.");
  b.card("CONCEPT", "Is a plc in the public sector?", "No. A public limited company is owned by private shareholders, so it is in the private sector.");
  b.card("CONCEPT", "Purposes of business organisations", "Satisfy needs and wants, create jobs, generate income and taxes, develop infrastructure and the economy.");
  b.card("CONCEPT", "Three ways to classify a business", "Ownership (private/public), registration (formal/informal) and activity (primary/secondary/tertiary).");
  b.card("DEFINITION", "Formalisation", "The process of an informal business registering, obtaining licences and paying taxes.");
});
