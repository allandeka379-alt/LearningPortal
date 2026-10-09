// Slice w3a: ISPs and internet services (comp.network.isp-internet-services, ZIMSEC only).
import { concept, P } from "../lib.mjs";

concept("comp.network.isp-internet-services", { file: "network/isp-internet-services", keyPrefix: "network.isp-internet-services" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main service an internet service provider (ISP) offers?",
    options: [
      ["Access to the internet", "Correct: an ISP connects customers to the internet."],
      ["Manufacturing network interface cards", "NICs are made by hardware manufacturers."],
      ["Writing the software for web browsers", "Browsers are written by software developers."],
      ["Owning and running the whole internet", "No single organisation owns the internet."],
    ],
    answer: "A",
    explanation: "An ISP provides internet access, usually with services such as email, hosting and domain names.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A hardware shop pays its ISP to store the shop's website on a server that is always connected to the internet. What is this service called?",
    options: [
      ["Web hosting", "Correct: the site is stored on the ISP's web server."],
      ["Domain name registration", "That reserves the website's name, not the storage."],
      ["Spam filtering", "That removes unwanted email."],
      ["E-learning", "E-learning is studying online."],
    ],
    answer: "A",
    explanation: "Web hosting stores a website on a server that is permanently online.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which organisation licenses internet service providers in Zimbabwe?",
    options: [
      ["POTRAZ", "Correct: the Postal and Telecommunications Regulatory Authority regulates telecoms."],
      ["ZIMSEC", "ZIMSEC runs school examinations."],
      ["The web hosting company", "Hosting companies are themselves service providers."],
      ["The customer's bank", "Banks do not license ISPs."],
    ],
    answer: "A",
    explanation: "POTRAZ is the regulator of postal and telecommunications services, including ISPs.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Rudo pays for her electricity tokens and buys school shoes online, paying with mobile money. Which internet service is she using?",
    options: [
      ["E-commerce", "Correct: buying and paying online."],
      ["E-learning", "E-learning is studying online."],
      ["Web hosting", "Hosting stores websites."],
      ["Social media", "Social media is for sharing posts and messages."],
    ],
    answer: "A",
    explanation: "E-commerce is buying and selling goods and services over the internet, including online payment.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which risk comes from emails pretending to be from a bank?"],
    stem: "Which is a **risk** of using email?",
    options: [
      ["Phishing messages may trick users into giving away passwords", "Correct: fake emails are a common way of stealing details."],
      ["Messages take several days to arrive", "Email arrives almost instantly."],
      ["Each email can only be sent to one person at a time", "Email can be sent to many people at once."],
      ["Emails cannot carry attachments", "Attachments are common, and can carry malware."],
    ],
    answer: "A",
    explanation: "Email risks include spam, phishing and malware in attachments.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["Think about who gains from being able to study at any time."],
    stem: "Which is the strongest benefit of e-learning for a learner in a remote rural area?",
    options: [
      ["Lessons can be reached at any time without travelling", "Correct: distance and timetable are no longer barriers."],
      ["It needs no device and no data", "E-learning needs a device and data."],
      ["It gives more face-to-face time with teachers", "It usually gives less face-to-face contact."],
      ["It removes the need for self-discipline", "Studying online needs more self-discipline."],
    ],
    answer: "A",
    explanation: "E-learning lets learners study anywhere and at any time, which matters most where schools and tutors are far away.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["A business that takes online orders needs reliability and a professional presence."],
    stem: "A furniture maker in Chitungwiza wants to take orders online. Which ISP package suits the business best?",
    options: [
      ["Fibre connection, website hosting and email with its domain name", "Correct: reliable access, an always-on website and professional email."],
      ["A small monthly mobile data bundle only", "Too limited and gives no hosting or business email."],
      ["Domain name registration only, with no connection or hosting", "The business still needs a connection and hosting."],
      ["Content filtering for children", "Useful for families, but not what an online shop needs most."],
    ],
    answer: "A",
    explanation: "An online business needs a reliable connection, hosting for its shop website and email using its own domain name.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An internet service provider can register a domain name, such as a .co.zw name, for a business.",
    answer: true,
    explanation: "True. Many ISPs register domain names on their customers' behalf.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Web hosting means designing the pages of a website.",
    answer: false,
    explanation: "False. Hosting is storing the website on a server that is always connected to the internet; designing it is a separate job.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each ISP service to what it does for the customer.",
    pairs: [
      ["Internet access", "Connects the customer's devices to the internet"],
      ["Web hosting", "Keeps the customer's website on an always-online server"],
      ["Domain name registration", "Reserves a name such as shop.co.zw for the website"],
      ["Email filtering", "Removes spam and scans attachments for viruses"],
    ],
    explanation: "Each ISP service meets a different need: access, hosting, names and security.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    hints: ["Each risk belongs mostly to one service."],
    stem: "Match each risk to the internet service it is most associated with.",
    pairs: [
      ["Cyberbullying and oversharing personal photos", "Social media"],
      ["A fake online shop that never delivers goods", "E-commerce"],
      ["An attachment that installs malware", "Email"],
      ["Falling behind when the data bundle runs out before a course ends", "E-learning"],
    ],
    explanation: "Social media: bullying and privacy. E-commerce: fraud. Email: malicious attachments. E-learning: depends on data and devices.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "A company that connects customers to the internet is an internet service {{blank:a}}. Buying and selling over the internet is called {{blank:b}}. Studying through online courses and video lessons is called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["provider"], choices: ["provider", "protocol", "platform", "processor"] },
      { id: "b", accepted: ["e-commerce"], choices: ["e-commerce", "e-learning", "email", "hosting"] },
      { id: "c", accepted: ["e-learning"], choices: ["e-commerce", "e-learning", "email", "hosting"] },
    ],
    explanation: "ISP: provider. Online buying and selling: e-commerce. Online study: e-learning.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for the human-readable name of a website, such as `bakery.co.zw`, that is translated into an IP address.",
    accepted: ["domain name", "a domain name", "domain"],
    wrong: ["IP address"],
    explanation: "A domain name is translated into the server's IP address by the domain name system.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Think of access, email, hosting, names, security and support."],
    stem: "Describe **three** services, other than internet access, that an ISP may offer a small business.",
    points: [
      "Email accounts (with the business's own domain name)",
      "Web hosting: storing the business website on an always-online server",
      "Domain name registration / security services (spam and virus filtering, firewall) / technical support",
    ],
    explanation: "ISPs offer email, hosting, domain names, security and support alongside access.",
    modelAnswer: "The ISP can give the business email accounts using its own domain name, host its website on a server that is always online, and register its domain name. It may also filter spam and viruses and provide technical support.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    hints: ["Give two benefits and two risks, and keep them about a small business."],
    stem: "Discuss the benefits and risks to a small craft business in Victoria Falls of advertising on social media.",
    points: [
      "Benefit: cheap or free advertising compared with print or radio",
      "Benefit: reaches tourists and customers far beyond the town / customers can share posts / instant feedback",
      "Risk: negative comments or fake reviews can damage its reputation quickly",
      "Risk: fake accounts or scams copying the business / time needed to keep posting / customers' personal data at risk",
    ],
    explanation: "A balanced answer weighs low-cost reach against reputation and security risks.",
    modelAnswer: "Social media lets the business show its carvings to tourists around the world for almost nothing, and happy customers share the posts. However, one angry comment or fake review spreads fast and can harm its reputation, scammers may copy its page, and someone must spend time answering messages every day.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Hosting stores a site; a domain name is its address.", "Consider both the customer and the business."],
    stem: "Tatenda's family runs a poultry business in Marondera and wants to sell eggs and chickens online.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which ISP service will make the online shop available to customers at any time?",
        options: [
          ["Web hosting", "Correct: an always-online server holds the shop."],
          ["Spam filtering", "This protects the email inbox."],
          ["Parental content filtering", "This blocks unsuitable websites."],
          ["Technical support", "Support helps with problems but does not keep the site online."],
        ],
        answer: "A", explanation: "Hosting stores the shop on a server that is always online.",
      }),
      P.short({
        label: "(b)", stem: "Name the service of selling goods over the internet.",
        accepted: ["e-commerce", "ecommerce", "electronic commerce", "online shopping"], wrong: ["e-learning"],
        explanation: "E-commerce.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Describe **two** benefits to the business of selling online.",
        points: [
          "Reaches customers across the country (beyond Marondera) / more sales",
          "Open 24 hours / lower costs than a physical shop / orders and payments are received automatically",
        ],
        modelAnswer: "Customers in Harare and other towns can order, not just people who pass the farm, and orders can come in at any time of day without a shop assistant.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Describe **two** risks to customers of buying from online shops.",
        points: [
          "Fake shops / fraud: they may pay and never receive the goods",
          "Payment or personal details may be stolen (e.g. on an insecure site or through phishing)",
        ],
        modelAnswer: "A customer could pay a fake shop and receive nothing, and their payment details could be stolen if the website is not secure.",
      }),
    ],
    explanation: "(a) web hosting (b) e-commerce.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    hints: ["Learners need a device and data.", "Weigh flexibility against support."],
    stem: "A secondary school in Gokwe plans to put its Form 3 revision materials on an e-learning platform.",
    parts: [
      P.tf({
        label: "(a)", stem: "E-learning lets learners replay a lesson as many times as they need.",
        answer: true, explanation: "True. Recorded lessons can be watched again.",
      }),
      P.mcq({
        label: "(b)", stem: "Which is a drawback of e-learning for some learners in the area?",
        options: [
          ["They may not have a device or affordable data", "Correct: access depends on devices and data."],
          ["Lessons can only be viewed during school hours", "E-learning can be used at any time."],
          ["Materials cannot be updated once published", "Online materials are easy to update."],
          ["It cannot include videos", "Video lessons are common in e-learning."],
        ],
        answer: "A", explanation: "Access needs a device and data.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Evaluate the plan. Give **two** benefits, **one** drawback (other than in (b)), and a conclusion.",
        points: [
          "Benefit: learners study at their own pace and at any time / replay lessons",
          "Benefit: teachers update materials easily and reach all learners at once / learners at home can still revise",
          "Drawback: less face-to-face help / needs self-discipline / distractions online",
          "A justified conclusion, e.g. use it alongside classroom teaching",
        ],
        modelAnswer: "Learners can revise at their own pace in the evening and replay difficult lessons, and teachers can update the notes once for the whole class. However, a learner who is stuck cannot ask a quick question, and studying alone needs discipline. The plan is worthwhile if the platform supports, not replaces, lessons in class.",
      }),
    ],
    explanation: "(a) true (b) devices and data.",
  });

  b.card("DEFINITION", "What is an **internet service provider** (ISP)?", "A company that provides access to the internet, usually with email, web hosting, domain names and support.");
  b.card("DEFINITION", "What is **web hosting**?", "Storing a website on a server that is permanently connected to the internet so anyone can view it.");
  b.card("DEFINITION", "What is a **domain name**?", "The human-readable name of a website (e.g. bakery.co.zw), translated into the server's IP address.");
  b.card("FACT", "Services an ISP may offer?", "Internet access, router/modem, IP address, email, web hosting, domain names, spam/virus filtering, technical support.");
  b.card("FACT", "Who licenses ISPs in Zimbabwe?", "POTRAZ, the Postal and Telecommunications Regulatory Authority.");
  b.card("CONCEPT", "E-commerce: one benefit, one risk?", "Shop or sell at any time from anywhere; but fraud and stolen payment details.");
  b.card("CONCEPT", "E-learning: one benefit, one drawback?", "Study at your own pace, anywhere, and replay lessons; but needs a device and data and gives less face-to-face help.");
  b.card("CONCEPT", "Social media: one benefit, two risks?", "Keeps people in touch and gives cheap advertising; but cyberbullying, fake news and oversharing personal information.");
  b.card("CONCEPT", "Email: benefits and risks?", "Fast, cheap, to many people with attachments; but spam, phishing and malware attachments.");
});
