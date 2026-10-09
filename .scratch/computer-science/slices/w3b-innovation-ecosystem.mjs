// Slice w3b: the technopreneurship ecosystem and innovation (comp.techno.innovation-ecosystem, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const DT = ["Empathise", "Define", "Ideate", "Prototype", "Test"];

concept("comp.techno.innovation-ecosystem", { file: "techno/innovation-ecosystem", keyPrefix: "techno.innovation-ecosystem" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an **incubation centre**?",
    options: [
      ["An organisation that helps new start-ups with workspace, mentoring and training", "Correct: it nurtures young businesses."],
      ["A factory that mass-produces electronic components", "That is a manufacturer."],
      ["A government office that registers new companies and collects their taxes", "That is a revenue authority."],
      ["A bank that only lends to large companies", "Incubators support small start-ups."],
    ],
    answer: "A",
    explanation: "Incubators support early-stage start-ups with cheap space, mentoring, training and links to investors.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the **first** stage of design thinking?",
    options: [
      ["Empathise", "Correct: understand the users and their needs first."],
      ["Prototype", "Prototyping comes after ideas are generated."],
      ["Test", "Testing is the last stage."],
      ["Ideate", "Ideas come after the problem is defined."],
    ],
    answer: "A",
    explanation: `The stages are ${DT.join(", ")}.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement best describes a **science park**?",
    options: [
      ["A site near a university where technology firms are located together", "Correct: firms share facilities and work with researchers."],
      ["A public park with free Wi-Fi for students", "This is not a business site."],
      ["A short holiday course that teaches coding skills to school learners", "That is a training course."],
      ["A shop that sells scientific equipment", "That is a retailer."],
    ],
    answer: "A",
    explanation: "A science park houses technology and research-based firms close to a university or research centre.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How do **academic institutions** mainly support technopreneurship?",
    options: [
      ["By training skilled graduates and doing research that can become products", "Correct: they supply human capital and new knowledge."],
      ["By collecting taxes from new businesses", "That is a government role."],
      ["By selling finished products directly to customers in local markets", "Universities do not usually sell products."],
      ["By regulating mobile network prices", "That is the role of a regulator."],
    ],
    answer: "A",
    explanation: "Universities and colleges educate skilled people and carry out research, and many run innovation hubs.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Small change or completely new?"],
    stem: "A mobile banking app adds a feature that lets users download their statement as a PDF. What type of innovation is this?",
    options: [
      ["Incremental", "Correct: a small improvement to an existing product."],
      ["Radical", "Radical innovation is a completely new technology."],
      ["Disruptive", "It does not replace an established market."],
      ["Invention only", "It is being used, so it is an innovation."],
    ],
    answer: "A",
    explanation: "Small improvements to an existing product are incremental innovation.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Is the idea being used and creating value?"],
    stem: "What is the difference between an **invention** and an **innovation**?",
    options: [
      ["An innovation is an idea that has been turned into something people use", "Correct: innovation creates value from ideas."],
      ["An invention always makes more money than an innovation, because it is completely new", "Many inventions never make money."],
      ["An innovation must always be a physical device", "Services and processes can be innovations."],
      ["They mean exactly the same thing in business", "They are different."],
    ],
    answer: "A",
    explanation: "An invention is a new idea or device; it becomes an innovation when it is put into use and creates value.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which stage builds quick, cheap versions?"],
    stem: "A team draws paper sketches of an app's screens and asks farmers to try them. Which design thinking stages are these?",
    options: [
      ["Prototype and test", "Correct: building a quick model, then trying it with users."],
      ["Empathise and define", "These come earlier, understanding users and stating the problem."],
      ["Define and ideate", "Ideas are not yet being tried by users here."],
      ["Ideate and empathise", "No brainstorming or interviewing is described."],
    ],
    answer: "A",
    explanation: "Making paper screens is prototyping; asking farmers to try them is testing.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Which support does a brand-new, two-person start-up need most?"],
    stem: "Two school leavers in Gweru have a prototype app but no business experience, no office and no investors. Which part of the ecosystem would help them **most** now?",
    options: [
      ["An incubation centre", "Correct: mentoring, cheap space and investor links suit an early start-up."],
      ["A science park", "Science parks suit established, growing firms."],
      ["A large company's sales team", "Sales help is premature without a business."],
      ["A tax office", "They need support, not tax collection."],
    ],
    answer: "A",
    explanation: "Incubators exist for exactly this stage: early start-ups needing space, mentoring and contacts.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Design thinking starts by understanding the needs of the people who have the problem.",
    answer: true,
    explanation: "True. The first stage, empathise, focuses on users before any solution is considered.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Design thinking is always completed in one pass, with no going back to earlier stages.",
    answer: false,
    explanation: "False. It is iterative: test results often send the team back to define, ideate or prototype again.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each component of the ecosystem to how it supports technopreneurs.",
    pairs: [
      ["Incubation centre", "Mentoring and cheap workspace for new start-ups"],
      ["Science park", "Premises for growing technology firms near researchers"],
      ["Research and development centre", "Creates and tests new technologies and prototypes"],
      ["Academic institution", "Trains skilled graduates and runs innovation competitions"],
    ],
    explanation: "Incubators nurture; science parks house; R&D centres create and test; academic institutions educate.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["Understand, state, brainstorm, build, try."],
    stem: "A team designs a water-saving system for a school. Match each activity to its design thinking stage.",
    pairs: [
      ["Interviewing the groundsman about watering the gardens", "Empathise"],
      ["Writing: 'The school needs to water gardens using less borehole water'", "Define"],
      ["Listing twenty possible ideas on a board", "Ideate"],
      ["Building a cardboard model of a drip system", "Prototype"],
    ],
    explanation: "Interviewing: empathise. Problem statement: define. Brainstorming: ideate. Model: prototype.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    hints: ["Five stages, starting with understanding users."],
    stem: "Complete the stages of design thinking in order.",
    template: `1 ${DT[0]}, 2 {{blank:a}}, 3 ${DT[2]}, 4 {{blank:b}}, 5 {{blank:c}}`,
    blanks: [
      { id: "a", accepted: [DT[1]], choices: [DT[1], DT[3], DT[4], "Market"] },
      { id: "b", accepted: [DT[3]], choices: [DT[1], DT[3], DT[4], "Market"] },
      { id: "c", accepted: [DT[4]], choices: [DT[1], DT[3], DT[4], "Market"] },
    ],
    explanation: `${DT.join(", ")}.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What does the abbreviation **R&D** stand for?",
    accepted: ["research and development", "research & development"],
    wrong: ["research and design"],
    explanation: "R&D is research and development.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Space, people, skills, money."],
    stem: "Describe **four** ways an incubation centre supports a new technology start-up.",
    points: [
      "Low-cost workspace with internet and power",
      "Mentoring / advice from experienced business people",
      "Training in business skills (business plans, marketing, finance)",
      "Networking and introductions to investors / help with registration and legal issues / shared equipment",
    ],
    explanation: "Incubators provide space, mentoring, training and contacts.",
    modelAnswer: "It gives the start-up a cheap desk with reliable internet and power, assigns a mentor who has run a business, runs workshops on writing a business plan, and introduces the founders to investors at pitch events.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 5,
    hints: ["One sentence per stage, all about the same problem."],
    stem: "Apply the five stages of design thinking to this problem: patients at a rural clinic wait many hours because they do not know when the nurse will be free.",
    points: [
      "Empathise: interview/observe patients and nurses to understand the waiting",
      "Define: a clear problem statement from the patients' point of view",
      "Ideate: several possible solutions (e.g. SMS queue numbers, booking by phone, a display board)",
      "Prototype: a quick, cheap version of the chosen idea (e.g. paper tickets with SMS)",
      "Test: patients try it, feedback is collected and the idea improved / repeat",
    ],
    explanation: "Each stage should be applied to the clinic problem.",
    modelAnswer: "Empathise: watch the queue and talk to patients and nurses. Define: 'Patients need to know when they will be seen so they can wait elsewhere.' Ideate: SMS queue numbers, phone bookings, a number display. Prototype: hand out numbered tickets and send a text when a patient is three places away. Test: try it for a week, ask for feedback and improve it.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    hints: ["Early start-up versus growing firm.", "Which part produces research?"],
    stem: "Tatenda has invented a low-cost solar charger for phones while studying at a polytechnic in Harare. He wants to turn it into a business.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Tatenda has a working prototype but no company and no business skills. Where should he go first?",
        options: [["An incubation centre", "Correct."], ["A science park", "For growing firms."], ["A stock exchange", "Far too early."], ["A retail chain", "He has no product ready for shops."]],
        answer: "A", explanation: "Incubators support early start-ups.",
      }),
      P.match({
        label: "(b)", stem: "Match each type of support to the part of the ecosystem that provides it.",
        pairs: ["Testing the charger's battery life in a laboratory", "Lectures in electronics that gave Tatenda his skills", "A unit beside other energy firms once the company grows"],
        right: ["Research and development centre", "Academic institution", "Science park", "Incubation centre"],
        rightIndex: [0, 1, 2],
        explanation: "Lab testing: R&D centre. Lectures: academic institution. Premises for growing firm: science park.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain whether Tatenda's charger is an invention, an innovation, or both.",
        points: ["It is an invention (a new device he created)", "It becomes an innovation when it is produced and used by customers / creates value"],
        modelAnswer: "The charger is an invention because it is a new device. It becomes an innovation once it is made and sold and people use it to charge their phones.",
      }),
    ],
    explanation: "(a) Incubation centre. (b) R&D centre, academic institution, science park.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 5,
    hints: ["Which stage has been skipped?"],
    stem: "A company built an expensive farming app without speaking to any farmers. Few farmers downloaded it.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which design thinking stage did the company skip?",
        options: [["Empathise", "Correct: it never learnt the farmers' needs."], ["Prototype", "It built a full app, beyond a prototype."], ["Ideate", "It had an idea."], ["Build", "Not a design thinking stage."]],
        answer: "A", explanation: "Without empathising, the company did not understand its users.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain how following design thinking could have avoided this failure.",
        points: ["Empathise: talking to farmers would reveal their real needs, phones and data limits", "Define: the problem would be stated from the farmers' point of view", "Prototype: cheap prototypes instead of an expensive full app, so less money is wasted", "Test: farmers' feedback would improve the design before launch / iterate"],
        modelAnswer: "By talking to farmers first the company would have learnt what they need and what phones they have. It could then define the real problem, test cheap paper prototypes with farmers, and improve the design from their feedback before spending money on a full app.",
      }),
    ],
    explanation: "(a) Empathise.",
  });

  b.card("DEFINITION", "Technopreneurship ecosystem", "The network that supports technology businesses: academic institutions, R&D centres, incubators, science parks, investors, government, industry.");
  b.card("DEFINITION", "Incubation centre", "Supports early-stage start-ups for a limited time with cheap workspace, mentoring, training, shared equipment and links to investors.");
  b.card("DEFINITION", "Science park", "A site, often linked to a university, where technology and research firms locate together to share facilities and work with researchers.");
  b.card("DEFINITION", "Research and development (R&D)", "Systematic work to discover new knowledge and use it to create or improve products, processes and services.");
  b.card("CONCEPT", "Academic institutions in the ecosystem", "Train skilled graduates, do research, provide labs and mentors, run innovation hubs and competitions.");
  b.card("DEFINITION", "Innovation", "Turning a new idea into a product, service or process that people use and that creates value.");
  b.card("CONCEPT", "Types of innovation", "Incremental (small improvement), radical (completely new), disruptive (cheaper, simpler product that replaces established ones).");
  b.card("FACT", "Design thinking stages", "Empathise, define, ideate, prototype, test (repeated as needed).");
  b.card("CONCEPT", "Incubator vs science park", "Incubator: new, small start-ups, mentoring, limited time. Science park: premises for established or growing firms near research.");
});
