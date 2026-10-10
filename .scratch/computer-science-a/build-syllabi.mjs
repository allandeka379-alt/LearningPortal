// Builds content/concepts/computer-science-a.json and the two A-Level Computer Science syllabus files:
//   content/syllabi/zimsec/a-level/computer-science/2015-2022.json      (ZIMSEC A-Level Computer Science, Forms 5-6)
//   content/syllabi/cambridge/a-level/computer-science/2027-2029.json   (Cambridge International AS & A Level Computer Science 9618)
// Sources (local only, not in git): .scratch/computer-science-a/sources/zimsec-computer-science-a.pdf (+ .txt) and
// 9618-2027-2029.pdf (+ .txt). The concept registry lives in ./concepts.mjs; this script prepends each concept's coverage
// label. Run from the repo root: node .scratch/computer-science-a/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";
import { CONCEPTS, FREE_PREVIEW } from "./concepts.mjs";

const ROOT = process.cwd();
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept key in concepts.mjs");
for (const [k] of CONCEPTS) if (!/^acs\.[a-z0-9-]+\.[a-z0-9-]+$/.test(k)) throw new Error(`bad concept key ${k}`);
for (const k of FREE_PREVIEW) if (!CONCEPT_KEYS.has(k)) throw new Error(`FREE_PREVIEW names unknown concept ${k}`);

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. `form` (ZIMSEC: "Form 5" / "Form 6" / "Forms 5-6") and `stage` (Cambridge: "AS Level" / "A Level only")
// are build-time metadata used for the concept labels; keys starting with "_" are not written.
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, children, form, stage } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) n.objectives = objectives.map((o, i) => (Array.isArray(o) ? { code: o[0], text: o[1] } : { code: `${code}.${i + 1}`, text: o }));
  if (components) n.components = components;
  if (children) n.children = children;
  if (form) n._form = form;
  if (stage) n._stage = stage;
  return n;
};
const section = (key, code, name, opts) => node("SECTION", key, code, name, opts);
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);

// =====================================================================================================================
// ZIMSEC A-Level Computer Science, Forms 5-6, 2015-2022. Top-level topics are the nine topics of the topic list (numbered
// 5.1-5.9 in the copy read, which is a misnumbering; here 1-9 in that order). Sub-topics are the content items of the
// competency matrix (8.1-8.15, Form 5 = 8.1-8.9, Form 6 = 8.10-8.15) and of the scope-and-sequence chart. The matrix
// does not number its content items: every sub-topic code (1.1 ...), objective code and the Practical skills node "P"
// is ours.
const F5 = "Form 5";
const F6 = "Form 6";
const T1 = ["1"]; // Paper 1 Theory
const T12 = ["1", "2"]; // Papers 1 and 2

const ZIMSEC_TOPICS = [
  topic("data-representation", "1", "Data Representation", {
    description: "Form 5 (competency matrix 8.1). Paper 1 weighting 15%.",
    components: T1,
    children: [
      sub("data-representation.number-bases", "1.1", "Number bases", {
        form: F5,
        covers: ["acs.data.number-bases", "acs.data.binary-arithmetic"],
        description: "Binary, octal, denary, hexadecimal and two's complement; the matrix also asks for multiplication and division of binary numbers.",
        objectives: [
          "Convert numbers between binary, octal, denary and hexadecimal.",
          "Represent negative integers in two's complement and add and subtract binary numbers.",
          "Multiply and divide binary numbers.",
        ],
      }),
      sub("data-representation.floating-point", "1.2", "Floating point arithmetic", {
        form: F5,
        covers: ["acs.data.floating-point-representation"],
        objectives: [
          "Convert floating-point binary numbers to denary and back.",
          "Normalise floating-point binary numbers and explain why this is done.",
        ],
      }),
      sub("data-representation.arithmetic-errors", "1.3", "Computer arithmetic errors", {
        form: F5,
        covers: ["acs.data.floating-point-errors"],
        objectives: [
          "Distinguish overflow from underflow and say when each arises.",
          "Interpret arithmetic errors and explain their effect on results.",
        ],
      }),
      sub("data-representation.character-sets", "1.4", "Data representation: character sets", {
        form: F5,
        covers: ["acs.data.character-sets"],
        description: "Character sets ASCII, Unicode, BCD and EBCDIC. BCD encoding is taught with the number systems (concept acs.data.number-bases).",
        objectives: [
          "Represent data using the ASCII, Unicode, BCD and EBCDIC character sets.",
          "Convert text to binary codes using a character set.",
        ],
      }),
    ],
  }),
  topic("networking", "2", "Networking", {
    description: "Form 5 (competency matrix 8.2) and Form 6 (8.10). Paper 1 weighting 20%; Paper 2 section (Networking) 30%.",
    components: T12,
    children: [
      sub("networking.osi-tcpip", "2.1", "OSI and TCP/IP models", {
        form: F5,
        covers: ["acs.network.osi-tcpip-models"],
        objectives: ["Describe the layers of the OSI and TCP/IP models and map one to the other."],
      }),
      sub("networking.ip-addressing", "2.2", "IP addressing", {
        form: F5,
        covers: ["acs.network.ip-addressing"],
        objectives: ["Explain the format of an IP address.", "Distinguish between public and private IP addresses."],
      }),
      sub("networking.dns", "2.3", "Domain Name Systems", {
        form: F5,
        covers: ["acs.network.url-dns"],
        objectives: ["Explain the role of the Domain Name System."],
      }),
      sub("networking.routing", "2.4", "Routing protocols", {
        form: F5,
        covers: ["acs.network.routing-protocols"],
        objectives: ["Describe the Routing Information Protocol (RIP) and Open Shortest Path First (OSPF) and what each is used for."],
      }),
      sub("networking.cloud", "2.5", "Cloud service models and cloud types", {
        form: F6,
        covers: ["acs.network.cloud-computing"],
        description: "Form 6 (competency matrix 8.10).",
        objectives: ["Differentiate the cloud service models (SaaS, PaaS).", "Describe public and private cloud types and compare them."],
      }),
    ],
  }),
  topic("computer-architecture", "3", "Computer Architecture", {
    description: "Form 5 (competency matrix 8.3, hardware architecture) and Form 6 (8.13, software architecture). Paper 1 weighting 20%; Paper 2 section (Computer Architecture) 30%.",
    components: T12,
    children: [
      sub("computer-architecture.electronics", "3.1", "Basic electronics: passive and active components", {
        form: F5,
        covers: ["acs.hardware.electronic-components"],
        objectives: ["Explain the principle of operation of passive and active electronic components.", "Test and replace electronic components."],
      }),
      sub("computer-architecture.von-neumann-harvard", "3.2", "Von Neumann and Harvard architecture and processor components", {
        form: F5,
        covers: ["acs.cpu.architecture-registers"],
        objectives: [
          "Describe the Von Neumann and Harvard architectures and distinguish them.",
          "Describe the functions of the control unit, the ALU and the registers (program counter, memory data register, memory address register, index register, current instruction register, status register, accumulator).",
        ],
      }),
      sub("computer-architecture.buses", "3.3", "Buses", {
        form: F5,
        covers: ["acs.cpu.buses-ports"],
        objectives: ["Explain the use of the control, address and data buses."],
      }),
      sub("computer-architecture.logic-gates", "3.4", "Logic gates", {
        form: F5,
        covers: ["acs.logic.gates-truth-tables", "acs.logic.circuits-expressions"],
        description: "NAND, NOR, XOR and XNOR (with NOT, AND and OR assumed); truth tables of up to three inputs.",
        objectives: [
          "Use logic gates, including NAND, NOR, XOR and XNOR, to design logic circuits.",
          "Construct truth tables with up to three inputs and calculate the output of a circuit for given inputs.",
        ],
      }),
      sub("computer-architecture.performance-pipelining", "3.5", "Processor speed and pipelining", {
        form: F5,
        covers: ["acs.cpu.performance", "acs.cpu.risc-cisc-pipelining"],
        description: "Pipelining is named in the syllabus; the RISC and CISC comparison is Cambridge detail within the shared concept.",
        objectives: ["Identify the factors that affect processor speed and ways of improving performance.", "Explain the importance of pipelining."],
      }),
      sub("computer-architecture.fetch-decode-execute", "3.6", "Fetch-decode-execute cycle and interrupts", {
        form: F5,
        covers: ["acs.cpu.fetch-execute-interrupts"],
        objectives: [
          "Describe the fetch-decode-execute cycle.",
          "Identify the types of interrupt (internal, external and software) and justify why computers use interrupts.",
        ],
      }),
      sub("computer-architecture.addressing-modes", "3.7", "Addressing modes", {
        form: F5,
        covers: ["acs.asm.addressing-modes"],
        objectives: ["Explain the direct, indirect, immediate, indexed and relative addressing modes."],
      }),
      sub("computer-architecture.software-architecture", "3.8", "Software architecture", {
        form: F6,
        covers: ["acs.sdlc.software-architecture"],
        description: "Form 6 (competency matrix 8.13).",
        objectives: ["Construct an architectural design for a given scenario from user requirements."],
      }),
    ],
  }),
  topic("security-ethics", "4", "Security and Ethics", {
    description: "Form 5 (competency matrix 8.4) and Form 6 (8.15). Paper 1 weighting 10%.",
    components: T1,
    children: [
      sub("security-ethics.privacy-integrity", "4.1", "Data privacy and integrity", {
        form: F5,
        covers: ["acs.security.privacy-integrity"],
        objectives: ["Explain the difference between data privacy and data integrity."],
      }),
      sub("security-ethics.threats", "4.2", "Common threats and software vulnerabilities", {
        form: F5,
        covers: ["acs.security.threats-vulnerabilities"],
        objectives: ["Analyse common threats and vulnerabilities of computer systems and identify their sources.", "Evaluate the main counter-measures to software and system attacks."],
      }),
      sub("security-ethics.protection", "4.3", "Protection, access control and authentication of data", {
        form: F5,
        covers: ["acs.security.protection-methods"],
        objectives: [
          "Evaluate the tools used to eliminate vulnerabilities (anti-virus, firewalls, anti-spyware).",
          "Carry out security administration tasks such as creating accounts and setting permissions.",
        ],
      }),
      sub("security-ethics.data-in-storage", "4.4", "Keeping data safe in storage and transmission", {
        form: F5,
        covers: ["acs.security.encryption"],
        description: "From the objective 'describe how data is kept safe during storage and transmission' (encryption tools); code ours.",
        objectives: ["Describe how data is kept safe during storage and transmission, including encryption."],
      }),
      sub("security-ethics.legislation-crime", "4.5", "Legislation on computer security and crimes; laws and computer crime", {
        form: F5,
        covers: ["acs.security.legislation-crime"],
        description: "Form 5 legislation (8.4) and Form 6 laws and computer crime: types and control measures (8.15).",
        objectives: [
          "Identify the ICT legislative and regulatory frameworks relevant to security and computer crime.",
          "Describe the types of computer crime and the control measures for each.",
        ],
      }),
      sub("security-ethics.risk-recovery", "4.6", "Risk management, disaster recovery and security policies", {
        form: F5,
        covers: ["acs.security.risk-recovery-policies"],
        description: "Disaster recovery methods and risk management techniques (Form 5, 8.4); security policies (Form 6, 8.15). The matrix also asks for the importance of securing data off-site (cloud computing).",
        objectives: [
          "Identify risks to computer systems and explore techniques and practices of risk management.",
          "Formulate a disaster recovery plan for a system failure and outline the importance of securing data off site.",
          "Discuss the purpose of a security policy.",
        ],
      }),
      sub("security-ethics.code-of-ethics", "4.7", "Code of ethics and business ethics", {
        form: F5,
        covers: ["acs.ethics.professional-ethics"],
        description: "Code of ethics at the workplace; business ethics such as fairness, firmness, honesty, self-motivation and integrity (unhu/ubuntu/vumunhu); ethical principles and the ethical impact of existing and emerging technologies (Form 6).",
        objectives: [
          "Identify the code of ethics and professional practices in the computing field.",
          "Demonstrate ethical practice in computer science and explain the attributes of business ethics.",
          "Analyse the ethical impact of existing and emerging technologies.",
        ],
      }),
      sub("security-ethics.social-environment", "4.8", "Impact of social media; environmental laws and issues", {
        form: F5,
        covers: ["acs.ethics.social-environment"],
        description: "Impact of social media (Forms 5 and 6); environmental laws and issues, e-waste management and the 3Rs (Form 6).",
        objectives: [
          "Discuss the dangers and ills of misuse of social media.",
          "Identify the environmental impact of computer use and disposal and describe e-waste management (recycle, reuse, reduce).",
        ],
      }),
    ],
  }),
  topic("sdlc", "5", "Systems Development Life Cycle (SDLC)", {
    description: "Form 5 (competency matrix 8.5, software development, waterfall model) and Form 6 (8.14, object-oriented methodology and prototyping). No share of Paper 1 is printed for this topic in the specification grid.",
    components: T1,
    children: [
      sub("sdlc.waterfall", "5.1", "SDLC: the waterfall model", {
        form: F5,
        covers: ["acs.sdlc.life-cycles"],
        description: "Stages: preliminary investigation, feasibility study, system analysis, system design, system development, testing, implementation, maintenance and evaluation.",
        objectives: ["Identify the opportunity for software development.", "Apply the stages of the SDLC (waterfall model) in software development."],
      }),
      sub("sdlc.investigation-feasibility", "5.2", "Preliminary investigation, fact finding and feasibility study", {
        form: F5,
        covers: ["acs.sdlc.fact-finding-feasibility"],
        objectives: ["Outline fact-finding techniques.", "Carry out a feasibility study."],
      }),
      sub("sdlc.analysis-design", "5.3", "System analysis, design, development, implementation and documentation", {
        form: F5,
        covers: ["acs.sdlc.analysis-design-documentation", "acs.sdlc.testing-maintenance"],
        description: "Also carries testing, maintenance and evaluation of the waterfall stages.",
        objectives: ["Produce documentation for each stage.", "Test, implement, maintain and evaluate a system and present a group project."],
      }),
      sub("sdlc.prototyping-oom", "5.4", "Object-oriented methodology and prototyping", {
        form: F6,
        covers: ["acs.sdlc.prototyping-oom"],
        description: "Form 6 (competency matrix 8.14).",
        objectives: ["Explain the concept of software process models.", "Develop a project using process models such as prototyping."],
      }),
    ],
  }),
  topic("algorithms-data-structures", "6", "Algorithm Design and Data Structures", {
    description: "Form 5 (competency matrix 8.6) and Form 6 (8.11). Paper 1 weighting 15%; part of the Paper 2 section Programming, Algorithm design and Databases (40%).",
    components: T12,
    children: [
      sub("algorithms-data-structures.pseudocode", "6.1", "Pseudocode structures: selection and repetition", {
        form: F5,
        covers: ["acs.algo.algorithm-design"],
        objectives: ["Design algorithms for a given situation using sequence, selection and iteration in pseudocode."],
      }),
      sub("algorithms-data-structures.trace-tables", "6.2", "Analysing algorithms with trace tables", {
        form: F5,
        covers: ["acs.algo.trace-tables"],
        objectives: ["Analyse algorithms for a given situation by formulating trace tables."],
      }),
      sub("algorithms-data-structures.sorting", "6.3", "Standard algorithms: sorting (bubble sort, quick sort) and linear search", {
        form: F5,
        covers: ["acs.algo.linear-search-bubble-sort", "acs.algo.quick-sort"],
        objectives: ["Use bubble sort and quick sort and linear search to solve problems."],
      }),
      sub("algorithms-data-structures.searching", "6.4", "Standard algorithms: binary search", {
        form: F5,
        covers: ["acs.algo.binary-search-insertion-sort"],
        description: "Binary search is named by the syllabus; insertion sort is Cambridge detail within the shared concept.",
        objectives: ["Use a binary search to solve problems and compare it with a linear search."],
      }),
      sub("algorithms-data-structures.static-dynamic", "6.5", "Data structures: dynamic and static", {
        form: F5,
        covers: ["acs.ds.adt-introduction"],
        objectives: ["Distinguish between dynamic (binary tree) and static (array) data structures."],
      }),
      sub("algorithms-data-structures.binary-trees", "6.6", "Binary trees and array operations", {
        form: F6,
        covers: ["acs.ds.binary-tree-algorithms"],
        description: "Form 6 (competency matrix 8.11): sorting, deletion, insertion and searching in binary trees and arrays.",
        objectives: ["Perform insertion, deletion, searching and sorting operations on binary trees and arrays."],
      }),
      sub("algorithms-data-structures.primitive-types", "6.7", "Primitive data types", {
        form: F6,
        covers: ["acs.ds.data-types-records"],
        objectives: ["Outline the primitive data types: integer, floating point, character and Boolean."],
      }),
      sub("algorithms-data-structures.recursion", "6.8", "Recursion", {
        form: F6,
        covers: ["acs.algo.recursion"],
        objectives: ["Use examples to demonstrate recursion and write algorithms for recursive functions."],
      }),
    ],
  }),
  topic("programming", "7", "Programming", {
    description: "Form 5 (competency matrix 8.7) and Form 6 (8.12). Part of the Paper 2 section Programming, Algorithm design and Databases (40%); Paper 1 questions on programming sit within Algorithm Design and Data Structures.",
    components: T12,
    children: [
      sub("programming.language-types", "7.1", "Types of high-level languages", {
        form: F5,
        covers: ["acs.prog.language-paradigms"],
        description: "Imperative or procedural, declarative, general purpose, special purpose and object oriented.",
        objectives: ["Describe the features of high-level languages and their types."],
      }),
      sub("programming.language-features", "7.2", "Programming language features", {
        form: F5,
        covers: ["acs.prog.programming-basics"],
        description: "Constants, variables (local and global), expressions, statements, control structures and block structure.",
        objectives: ["Use constants, variables, expressions, statements and control structures in a program."],
      }),
      sub("programming.structured", "7.3", "Structured programming: iteration, multiple selection and nested loops", {
        form: F5,
        covers: ["acs.prog.selection", "acs.prog.iteration"],
        description: "Nested loops up to three levels.",
        objectives: ["Use programming constructs (iteration, multiple selection, nested loops) in structured programming."],
      }),
      sub("programming.functions-procedures", "7.4", "Functions and procedures", {
        form: F5,
        covers: ["acs.prog.procedures-functions"],
        description: "Parameter passing by value and by reference.",
        objectives: ["Develop programs using functions and procedures with parameters passed by value and by reference."],
      }),
      sub("programming.arrays", "7.5", "Arrays", {
        form: F5,
        covers: ["acs.ds.arrays"],
        objectives: ["Manipulate one- and two-dimensional arrays in a program."],
      }),
      sub("programming.file-handling", "7.6", "File handling", {
        form: F5,
        covers: ["acs.ds.text-files"],
        objectives: ["Read from and write to a file."],
      }),
      sub("programming.interface-design", "7.7", "Interface design: user profiling, input and output design", {
        form: F5,
        covers: ["acs.prog.interface-design"],
        objectives: ["Design input and output interfaces for a user profile."],
      }),
      sub("programming.oop", "7.8", "Object-oriented programming", {
        form: F6,
        covers: ["acs.prog.oop-concepts", "acs.prog.oop-programming"],
        description: "Form 6 (competency matrix 8.12): classes, encapsulation, polymorphism and inheritance; the matrix also mentions implementing classes and demonstrating a singleton.",
        objectives: ["Outline the features of object-oriented programming.", "Implement classes using encapsulation, inheritance and polymorphism."],
      }),
      sub("programming.advanced", "7.9", "Advanced programming: mobile applications and gaming", {
        form: F6,
        covers: ["acs.prog.mobile-games-apps"],
        objectives: ["Design games and mobile applications, including ones with an indigenous orientation."],
      }),
    ],
  }),
  topic("databases", "8", "Databases", {
    description: "Form 5 (competency matrix 8.8). Paper 1 weighting 10%; part of the Paper 2 section Programming, Algorithm design and Databases (40%).",
    components: T12,
    children: [
      sub("databases.file-based", "8.1", "File-based database systems", {
        form: F5,
        covers: ["acs.db.relational-concepts"],
        objectives: [
          "Describe the characteristics of the file-based approach and its limitations.",
          "Describe the features of a relational database that address those limitations.",
        ],
      }),
      sub("databases.dbms", "8.2", "Database management systems", {
        form: F5,
        covers: ["acs.db.dbms"],
        description: "Features of a DBMS, including the data definition language (DDL) and data manipulation language (DML).",
        objectives: ["Outline the features of a DBMS."],
      }),
      sub("databases.sql", "8.3", "Structured Query Language (DDL and DML)", {
        form: F5,
        covers: ["acs.db.sql-ddl", "acs.db.sql-dml"],
        objectives: ["Write SQL commands to create tables and to query or modify data."],
      }),
      sub("databases.modelling", "8.4", "Relational database modelling: analysis and normalisation", {
        form: F5,
        covers: ["acs.db.er-diagrams", "acs.db.normalisation"],
        description: "Normalisation up to second normal form is required by the syllabus.",
        objectives: [
          "Design database applications using entity-relationship diagrams (ERDs) and convert ERDs to a relational schema in standard normal form.",
          "Normalise database tables up to second normal form.",
        ],
      }),
      sub("databases.management", "8.5", "Database management: interfaces and access from a high-level language", {
        form: F5,
        covers: ["acs.db.application-interfaces"],
        objectives: ["Develop interfaces and queries using DBMS tools.", "Access data in a database through a high-level language."],
      }),
    ],
  }),
  topic("enterprising", "9", "Enterprising", {
    description: "Form 5 (competency matrix 8.9); the scope-and-sequence chart lists e-commerce, telecommunications and business and enterprise for Form 6 with no matching matrix row in the copy read. Paper 1 weighting 10%.",
    components: T1,
    children: [
      sub("enterprising.application-areas", "9.1", "Application areas of computer science and global trend analysis", {
        form: F5,
        covers: ["acs.enterprise.application-areas"],
        description: "Engineering, research and development, agricultural mechanisation, e-learning and telecommunications; analysis of global trends in computing.",
        objectives: ["Identify areas where computer science is applied.", "Analyse global trends in the field of computing."],
      }),
      sub("enterprising.e-business", "9.2", "E-business and financial literacy", {
        form: F5,
        covers: ["acs.enterprise.e-business"],
        objectives: ["Evaluate the importance of e-business, including financial literacy for an ICT business."],
      }),
      sub("enterprising.marketing", "9.3", "Marketing and business strategies", {
        form: F5,
        covers: ["acs.enterprise.marketing"],
        objectives: ["Explain the elements of marketing, including the 4Ps, and business strategies, skills and techniques."],
      }),
      sub("enterprising.business-proposal", "9.4", "Business proposal development", {
        form: F5,
        covers: ["acs.enterprise.business-proposal"],
        objectives: ["Design an ICT-related business proposal."],
      }),
      sub("enterprising.ipr", "9.5", "Intellectual property rights", {
        form: F5,
        covers: ["acs.ethics.copyright-licensing"],
        description: "Patents and trademarks; plagiarism and copyright.",
        objectives: ["Describe the role of intellectual property rights, including patents, trademarks, plagiarism and copyright."],
      }),
    ],
  }),
  topic("practical-skills", "P", "Practical skills and project", {
    description: "Not a topic of the syllabus: our grouping of the practical assessment (Paper 2), coursework (Paper 3) and project (Paper 4) of section 9.",
    components: ["2", "3", "4"],
    children: [
      sub("practical-skills.programming", "P.1", "Practical programming", {
        form: "Forms 5-6",
        covers: ["acs.skills.python-practical"],
        objectives: [
          "Design, develop and document computer solutions to a problem using a prescribed programming package.",
          "Clarify source code through comments and structure it with procedures and functions.",
          "Design, run and document tests, using standard, extreme and abnormal data.",
        ],
      }),
      sub("practical-skills.project", "P.2", "Project report", {
        form: "Forms 5-6",
        covers: ["acs.skills.project-report"],
        objectives: [
          "Select, investigate and analyse a real problem in the candidate's environment (Section A).",
          "Design the solution, develop it and document it, then test and evaluate it (Sections B to D).",
          "Produce a well-organised report that meets the general expectations (Section E).",
        ],
      }),
    ],
  }),
];

const zimsec = {
  board: "zimsec",
  qualification: "a-level",
  subject: "computer-science",
  versionLabel: "2015-2022",
  family: "computer-science-a",
  title: "ZIMSEC A-Level Computer Science",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Computer Science Syllabus, Forms 5 - 6, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at A Level",
    url: "https://www.zimsake.co.zw/softidrive/",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Topic names and their order (1 to 9) are transcribed from the topic list (6.0) of the Ministry's Computer Science Syllabus Forms 5 - 6 (2015 - 2022), whose items are misnumbered 5.1-5.9 in the copy read; sub-topics are the content items of the competency matrix (8.0, rows 8.1-8.15) and the scope-and-sequence chart (7.0), and the form in which each is taught comes from them. The matrix does not number its content items: all sub-topic codes (1.1 to 9.5, P.1, P.2), all objective codes and the Practical skills node are ours. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-10): Ministry document, copy obtained from zimsake.co.zw softidrive (the zimsake.co.zw document library; the URL recorded is the library's address because the file has no stable direct link). The cover prints 'Computer Science Syllabus, Forms 5 - 6, 2015 - 2022' (Curriculum Development and Technical Services, Mount Pleasant, Harare; the title is misspelt on the cover and header of the copy read). It was read through a pdftotext rendering in which the scope-and-sequence and competency-matrix tables come out with columns interleaved; check every heading, the form of each item and each objective against a clean copy from ZIMSEC.",
    "Subject code: not printed in the syllabus document. ZIMSEC A-Level Computer Science is commonly cited as 6023 (to be confirmed by the owner); left null.",
    "Heritage-Based Curriculum: ZIMSEC introduced Heritage-Based Curriculum syllabi, and 2024-2030 versions exist for Forms 5-6 in some subjects. Confirm which Computer Science syllabus November 2026 and later A-Level candidates sit, set effectiveTo, and create a new version file when a new syllabus replaces this one. Version dates assumed: first examined in November 2018 (effectiveFrom 2018-01-01).",
    "Numbering: the topic list prints the nine topics as 5.1-5.9 (a misnumbering), the scope and sequence as 7.1-7.9, and the competency matrix as 8.1-8.9 (Form 5) and 8.10-8.15 (Form 6: networking, algorithm design and data structures, programming, computer architecture, software development, security and ethics). This tree follows the topic list order (1-9).",
    "Placement of Form 6 items: the matrix gives Form 6 the cloud service models and types (networking), binary trees, primitive data types and recursion (algorithm design and data structures), object-oriented programming and advanced programming (mobile applications, gaming), software architecture, object-oriented methodology and prototyping, security policies, laws and computer crime, environmental laws and issues, impact of social media and ethical principles. The scope-and-sequence chart also lists, for Form 6 enterprising, e-commerce, telecommunications and business and enterprise, but the matrix has no Form 6 enterprising row; they are treated as part of the Enterprising topic's concepts.",
    "Concepts with no ZIMSEC node because the syllabus assumes them from O Level or does not mention them: LAN and WAN models, topologies, transmission media, internet hardware (Cambridge 2.1), input and output devices, storage and memory types, graphics, sound and compression (Cambridge 1.2-1.3), operating systems and translators (Cambridge 5, 16), assembly language and bit manipulation, Boolean algebra and Karnaugh maps, adders and flip-flops, parallel processing and virtual machines, validation and verification, AI, abstract data types beyond the introduction, OOP in depth beyond the four features, declarative programming and exception handling. They are Cambridge only.",
    "Assessment (9.0) as read: continuous assessment 30% (Paper 3 coursework 10%, Paper 4 project 20%) and a summative examination 70%: Paper 1 free-response theory (3 hours, 100 marks, 30%, 10 to 12 compulsory questions) and Paper 2 practical (3 hours, 100 marks, 40%, 3 sections with 6 practical questions, candidates answer 1 question from each section). Paper 3 coursework (5 terms, 100 marks, 10%): 7 items, five practical assignments and two theory tests (one in Form 5, one in Form 6), set and marked by teachers and moderated. Paper 4 project (4 terms, 100 marks, 20%) from term 2 of Form 5 to the end of term 2 of Form 6, up to 50 pages, marked in five sections A to E (25, 25, 25, 15 and 10 marks).",
    "Specification grid as read (9.3): Paper 1 content distribution Data Representation 15, Networking 20, Computer Architecture 20, Security and Ethics 10, Algorithm Design and Data Structures 15, Databases 10, Enterprising 10 (total 100); the grid has no rows for the SDLC and Programming topics. Paper 2 sections: Computer Architecture 30, Programming, Algorithm design and Databases 40, Networking 30. Skills distribution: Paper 1 knowledge and understanding 30%, problem solving 50%, practical skills 20%; Paper 2 10%, 40% and 50%. The text above the skills table says theory tests are 40% knowledge and 60% problem solving, which does not match the table; confirm against a clean copy.",
    "Practical language: the syllabus names VB.Net, Java and Python among suggested tools and examines the programming language syntax in the project report. This product's practical language is Python; pseudocode follows the Cambridge 9618 pseudocode style for algorithms. Paper 2 (practical) and the project are done on a computer: written practice items test the same skills but cannot replace practice on a machine.",
    "Many concepts are shared with Cambridge 9618 (concepts acs.*). Lessons are written to the depth of the deeper board; parts named only by ZIMSEC (octal, EBCDIC, passive and active electronic components, the OSI model, RIP and OSPF, quick sort, mobile applications, SDLC, software architecture, enterprising, e-waste and the 3Rs) are marked as ZIMSEC detail.",
  ],
  overview: "The ZIMSEC A-Level Computer Science syllabus (Forms 5-6) has nine topics. Form 5 covers data representation (number bases, floating point, arithmetic errors, character sets), networking (OSI and TCP/IP models, IP addressing, DNS, routing protocols), hardware architecture (electronics, Von Neumann and Harvard architectures, buses, logic gates, the fetch-decode-execute cycle, addressing modes), security and ethics, the waterfall SDLC, algorithms and data structures (pseudocode, trace tables, sorting and searching), structured programming with arrays and files, databases (relational modelling, normalisation to second normal form, SQL) and enterprising. Form 6 adds cloud computing, software architecture, prototyping and object-oriented methodology, binary trees, recursion, object-oriented programming, mobile applications and games, security policies, laws and computer crime and environmental issues.",
  assessmentOverview: "Continuous assessment carries 30%: coursework of five practical assignments and two theory tests (10%) and a project report (20%). The examination carries 70%: Paper 1 theory with 10 to 12 compulsory questions (3 hours, 100 marks, 30%) and Paper 2 practical with one question from each of three sections (3 hours, 100 marks, 40%).",
  components: [
    { code: "1", name: "Paper 1: Theory (free response)", kind: "WRITTEN", description: "10 to 12 compulsory questions on the whole syllabus; content distribution: Data Representation 15, Networking 20, Computer Architecture 20, Security and Ethics 10, Algorithm Design and Data Structures 15, Databases 10, Enterprising 10.", durationMinutes: 180, maxMarks: 100, weightingPercent: 30 },
    { code: "2", name: "Paper 2: Practical", kind: "PRACTICAL", description: "Three sections (Computer Architecture 30; Programming, Algorithm design and Databases 40; Networking 30) with six practical questions in all; candidates answer one question from each section.", durationMinutes: 180, maxMarks: 100, weightingPercent: 40 },
    { code: "3", name: "Paper 3: Coursework", kind: "COURSEWORK", description: "Continuous assessment over 5 terms: five practical assignments and two theory tests, set and marked by teachers and moderated by ZIMSEC.", maxMarks: 100, weightingPercent: 10 },
    { code: "4", name: "Paper 4: Project", kind: "PROJECT", description: "A project report (up to 50 pages) over 4 terms, marked in five sections: selection, investigation and analysis; design; software development; testing and evaluation; general expectations.", maxMarks: 100, weightingPercent: 20 },
  ],
  topics: ZIMSEC_TOPICS,
};

// =====================================================================================================================
// Cambridge International AS & A Level Computer Science 9618, 2027-2029. Topics 1-20 and sub-topics (1.1 ...) are
// numbered as printed; the syllabus does not number its learning outcomes, so objective codes (1.1.1 ...) are ours, as
// are the three sections and the practical-skills node P4.
const ASL = "AS Level";
const ALO = "A Level only";
const P1 = ["1"];
const P2 = ["2"];
const P3 = ["3"];
const P34 = ["3", "4"];

const C9618_TOPICS = [
  section("as-content", "AS", "AS Level subject content", {
    description: "Topics 1-12: studied by all candidates; Paper 1 examines topics 1-8, Paper 2 topics 9-12, and all of it is assumed knowledge for Papers 3 and 4.",
    children: [
      topic("information-representation", "1", "Information representation", {
        components: P1,
        children: [
          sub("information-representation.data", "1.1", "Data representation", {
            stage: ASL,
            covers: ["acs.data.number-bases", "acs.data.binary-arithmetic", "acs.data.character-sets"],
            objectives: [
              "Distinguish binary prefixes (kibi, mebi, gibi, tebi) from decimal prefixes (kilo, mega, giga, tera).",
              "Convert integers between binary, denary and hexadecimal, and use Binary Coded Decimal and one's and two's complement representations.",
              "Add and subtract binary numbers and explain how overflow can occur.",
              "Describe practical uses of BCD and hexadecimal.",
              "Represent character data in binary using ASCII, extended ASCII and Unicode.",
            ],
          }),
          sub("information-representation.multimedia", "1.2", "Multimedia: graphics and sound", {
            stage: ASL,
            covers: ["acs.media.graphics", "acs.media.sound"],
            objectives: [
              "Explain how a bitmap is encoded and estimate its file size from resolution and colour depth.",
              "Explain the effect of changing resolution or colour depth on image quality and file size.",
              "Explain how a vector graphic is encoded using a drawing list, and justify a bitmap or vector graphic for a task.",
              "Explain how sound is sampled and encoded, and the effect of changing the sampling rate and resolution.",
            ],
          }),
          sub("information-representation.compression", "1.3", "Compression", {
            stage: ASL,
            covers: ["acs.media.compression"],
            objectives: [
              "Explain the need for compression and give examples of its use.",
              "Compare lossless and lossy compression and justify a method for a situation.",
              "Describe how text, bitmap, vector and sound files can be compressed, including run-length encoding.",
            ],
          }),
        ],
      }),
      topic("communication", "2", "Communication", {
        components: P1,
        children: [
          sub("communication.networks", "2.1", "Networks including the internet", {
            stage: ASL,
            covers: [
              "acs.network.lan-wan-models",
              "acs.network.topologies-media",
              "acs.network.lan-hardware",
              "acs.network.internet-hardware-streaming",
              "acs.network.ip-addressing",
              "acs.network.url-dns",
              "acs.network.cloud-computing",
            ],
            objectives: [
              "Describe the purpose of networking devices and the characteristics of a LAN and a WAN.",
              "Compare client-server and peer-to-peer models and thin-client and thick-client computing.",
              "Compare bus, star, mesh and hybrid topologies and wired and wireless networks, and describe the transmission media.",
              "Describe the hardware that supports a LAN and the internet, and the role of a router.",
              "Explain how Ethernet detects and avoids collisions (CSMA/CD).",
              "Explain bit streaming, and the differences between the internet and the World Wide Web.",
              "Explain IP addresses (IPv4 and IPv6, subnetting, public and private, static and dynamic) and how a URL and the DNS locate a resource.",
              "Describe cloud computing with its benefits and drawbacks.",
            ],
          }),
        ],
      }),
      topic("hardware", "3", "Hardware", {
        components: P1,
        children: [
          sub("hardware.computers-components", "3.1", "Computers and their components", {
            stage: ASL,
            covers: ["acs.hardware.io-devices", "acs.hardware.secondary-storage", "acs.hardware.primary-memory", "acs.hardware.embedded-control"],
            objectives: [
              "Explain the need for input, output, primary memory and secondary storage.",
              "Describe the principal operations of hardware devices such as printers, microphones, touchscreens and storage devices.",
              "Distinguish RAM from ROM, SRAM from DRAM, and PROM, EPROM and EEPROM, and explain the use of buffers.",
              "Explain embedded systems and monitoring and control systems, sensors, actuators and feedback.",
            ],
          }),
          sub("hardware.logic", "3.2", "Logic gates and logic circuits", {
            stage: ASL,
            covers: ["acs.logic.gates-truth-tables", "acs.logic.circuits-expressions"],
            objectives: [
              "Draw and define NOT, AND, OR, NAND, NOR and XOR gates and construct their truth tables.",
              "Construct a logic circuit, truth table or logic expression from a problem statement or from each other.",
            ],
          }),
        ],
      }),
      topic("processor-fundamentals", "4", "Processor fundamentals", {
        components: P1,
        children: [
          sub("processor-fundamentals.cpu", "4.1", "Central Processing Unit (CPU) architecture", {
            stage: ASL,
            covers: ["acs.cpu.architecture-registers", "acs.cpu.buses-ports", "acs.cpu.performance", "acs.cpu.fetch-execute-interrupts"],
            objectives: [
              "Describe the Von Neumann model, the stored-program concept and the roles of registers, the ALU, control unit, system clock and immediate access store.",
              "Describe how data moves between components over the address, data and control buses.",
              "Explain how processor type, cores, bus width, clock speed and cache affect performance, and how ports connect peripherals (USB, HDMI, VGA).",
              "Describe the fetch-execute cycle in register transfer notation.",
              "Explain the purpose, causes and handling of interrupts and the use of an interrupt service routine.",
            ],
          }),
          sub("processor-fundamentals.assembly", "4.2", "Assembly language", {
            stage: ASL,
            covers: ["acs.asm.assembly-language", "acs.asm.addressing-modes", "acs.asm.assembly-programs"],
            objectives: [
              "Explain the relationship between assembly language and machine code and the stages of a two-pass assembler.",
              "Trace a simple assembly language program and explain how instructions are grouped.",
              "Use immediate, direct, indirect, indexed and relative addressing in the given instruction set.",
            ],
          }),
          sub("processor-fundamentals.bit-manipulation", "4.3", "Bit manipulation", {
            stage: ASL,
            covers: ["acs.asm.bit-manipulation"],
            objectives: [
              "Perform logical, arithmetic and cyclic binary shifts.",
              "Use bitwise AND, OR and XOR with masks to test and set bits, including to monitor and control a device.",
            ],
          }),
        ],
      }),
      topic("system-software", "5", "System software", {
        components: P1,
        children: [
          sub("system-software.operating-systems", "5.1", "Operating systems", {
            stage: ASL,
            covers: ["acs.os.functions-utilities"],
            objectives: [
              "Explain why a computer needs an operating system and the key management tasks it carries out.",
              "Describe utility software and program libraries, including DLL files.",
            ],
          }),
          sub("system-software.translators", "5.2", "Language translators", {
            stage: ASL,
            covers: ["acs.translation.translators-ide"],
            objectives: [
              "Explain the need for assemblers, compilers and interpreters, and the benefits and drawbacks of compilers and interpreters.",
              "Describe the features of a typical integrated development environment.",
            ],
          }),
        ],
      }),
      topic("security", "6", "Security, privacy and data integrity", {
        components: P1,
        children: [
          sub("security.data-security", "6.1", "Data security", {
            stage: ASL,
            covers: ["acs.security.privacy-integrity", "acs.security.threats-vulnerabilities", "acs.security.protection-methods"],
            objectives: [
              "Explain the difference between security, privacy and integrity of data.",
              "Describe the threats posed by networks and the internet, and methods that restrict the risks.",
              "Describe security measures from a stand-alone PC to a network, including authentication, firewalls, anti-virus software and encryption.",
            ],
          }),
          sub("security.data-integrity", "6.2", "Data integrity", {
            stage: ASL,
            covers: ["acs.security.validation-verification"],
            objectives: [
              "Describe and use methods of data validation (range, format, length, presence, existence, limit and check digit).",
              "Describe and use methods of data verification during entry and transfer (visual check, double entry, parity, checksum).",
            ],
          }),
        ],
      }),
      topic("ethics-ownership", "7", "Ethics and ownership", {
        components: P1,
        children: [
          sub("ethics-ownership.ethics", "7.1", "Ethics and ownership", {
            stage: ASL,
            covers: ["acs.ethics.professional-ethics", "acs.ethics.copyright-licensing", "acs.ethics.ai-impact"],
            objectives: [
              "Explain the need for ethics as a computing professional and the impact of acting ethically or unethically in a given situation.",
              "Explain the need for copyright legislation and the types of software licence, and justify a licence for a situation.",
              "Describe artificial intelligence and its applications and its social, economic and environmental impact.",
            ],
          }),
        ],
      }),
      topic("databases", "8", "Databases", {
        components: P1,
        children: [
          sub("databases.concepts", "8.1", "Database concepts", {
            stage: ASL,
            covers: ["acs.db.relational-concepts", "acs.db.er-diagrams", "acs.db.normalisation"],
            objectives: [
              "Explain the limitations of a file-based approach and the features of a relational database that address them.",
              "Use relational database terminology (entity, table, record, field, keys, relationships, referential integrity, indexing).",
              "Document a database design with an entity-relationship diagram.",
              "Explain and apply normalisation to third normal form.",
            ],
          }),
          sub("databases.dbms", "8.2", "Database management systems (DBMS)", {
            stage: ASL,
            covers: ["acs.db.dbms"],
            objectives: [
              "Describe the features of a DBMS that address file-based issues (data dictionary, logical schema, integrity, security).",
              "Explain how the developer interface and query processor are used.",
            ],
          }),
          sub("databases.sql", "8.3", "Data Definition Language (DDL) and Data Manipulation Language (DML)", {
            stage: ASL,
            covers: ["acs.db.sql-ddl", "acs.db.sql-dml"],
            objectives: [
              "Explain that a DBMS uses DDL to create and modify structure and DML for queries and maintenance, with SQL as the industry standard.",
              "Read and write SQL DDL statements (CREATE DATABASE, CREATE TABLE, ALTER TABLE, keys, data types).",
              "Write SQL DML queries and maintenance statements on at most two tables.",
            ],
          }),
        ],
      }),
      topic("algorithm-design", "9", "Algorithm design and problem-solving", {
        components: P2,
        children: [
          sub("algorithm-design.computational-thinking", "9.1", "Computational thinking skills", {
            stage: ASL,
            covers: [],
            description: "Abstraction and decomposition; taught in the algorithm design lesson covered at 9.2.",
            objectives: [
              "Explain the need for and benefits of abstraction and produce an abstract model keeping only essential details.",
              "Use decomposition to break a problem into sub-problems and program modules.",
            ],
          }),
          sub("algorithm-design.algorithms", "9.2", "Algorithms", {
            stage: ASL,
            covers: ["acs.algo.algorithm-design"],
            objectives: [
              "Explain that an algorithm is a defined sequence of steps and use an identifier table.",
              "Write pseudocode with input, process and output using sequence, selection and iteration.",
              "Convert between structured English, flowcharts and pseudocode.",
              "Use stepwise refinement and logic statements to express an algorithm.",
            ],
          }),
        ],
      }),
      topic("data-types-structures", "10", "Data types and structures", {
        components: P2,
        children: [
          sub("data-types-structures.records", "10.1", "Data types and records", {
            stage: ASL,
            covers: ["acs.ds.data-types-records"],
            objectives: [
              "Select and use appropriate data types for a problem.",
              "Define a record structure and read and save data to a record in pseudocode.",
            ],
          }),
          sub("data-types-structures.arrays", "10.2", "Arrays", {
            stage: ASL,
            covers: ["acs.ds.arrays", "acs.algo.linear-search-bubble-sort"],
            objectives: [
              "Use array terminology and select a 1D or 2D array for a task.",
              "Write pseudocode to declare and process array data, including a bubble sort and a linear search.",
            ],
          }),
          sub("data-types-structures.files", "10.3", "Files", {
            stage: ASL,
            covers: ["acs.ds.text-files"],
            objectives: ["Explain why files are needed.", "Write pseudocode to handle text files of one or more lines."],
          }),
          sub("data-types-structures.adt", "10.4", "Introduction to abstract data types (ADT)", {
            stage: ASL,
            covers: ["acs.ds.adt-introduction"],
            objectives: [
              "Explain that an ADT is a collection of data with a set of operations on it, with stack, queue and linked list as examples.",
              "Describe the key features of each, justify one for a situation, and add, edit and delete data.",
              "Describe how a queue, stack and linked list can be implemented using arrays.",
            ],
          }),
        ],
      }),
      topic("programming", "11", "Programming", {
        components: P2,
        children: [
          sub("programming.basics", "11.1", "Programming basics", {
            stage: ASL,
            covers: ["acs.prog.programming-basics"],
            objectives: [
              "Implement pseudocode from a design given as a program flowchart or structured English.",
              "Declare constants and variables, assign values, and write expressions, input and output.",
              "Use built-in functions and library routines.",
            ],
          }),
          sub("programming.constructs", "11.2", "Constructs", {
            stage: ASL,
            covers: ["acs.prog.selection", "acs.prog.iteration"],
            objectives: [
              "Write IF statements (including ELSE and nesting) and CASE structures.",
              "Write count-controlled, pre-condition and post-condition loops and justify the choice of loop.",
            ],
          }),
          sub("programming.structured", "11.3", "Structured programming", {
            stage: ASL,
            covers: ["acs.prog.procedures-functions"],
            objectives: [
              "Define and use procedures and functions with parameters passed by value or reference, and use the related terminology.",
              "Explain where a procedure or a function is appropriate in an algorithm and write efficient pseudocode.",
            ],
          }),
        ],
      }),
      topic("software-development", "12", "Software development", {
        components: P2,
        children: [
          sub("software-development.life-cycle", "12.1", "Program development life cycle", {
            stage: ASL,
            covers: ["acs.sdlc.life-cycles"],
            objectives: [
              "Explain the purpose of a development life cycle and its analysis, design, coding, testing and maintenance stages.",
              "Describe the principles, benefits and drawbacks of the waterfall, iterative and rapid application development models.",
            ],
          }),
          sub("software-development.design", "12.2", "Program design", {
            stage: ASL,
            covers: ["acs.sdlc.program-design"],
            objectives: [
              "Use a structure chart to decompose a problem and show the parameters passed between modules.",
              "Explain the purpose of state-transition diagrams to document an algorithm.",
            ],
          }),
          sub("software-development.testing", "12.3", "Program testing and maintenance", {
            stage: ASL,
            covers: ["acs.sdlc.testing-maintenance", "acs.algo.trace-tables"],
            objectives: [
              "Locate, identify and correct syntax, logic and run-time errors, including by dry run.",
              "Select testing methods and test data, and explain the need for a test strategy and test plan.",
              "Explain perfective, adaptive and corrective maintenance and amend an existing program.",
            ],
          }),
        ],
      }),
    ],
  }),
  section("a-level-content", "A", "A Level subject content", {
    description: "Topics 13-20: A Level only; Paper 3 examines topics 13-20 and Paper 4 practically examines topics 19-20 (except low-level and declarative programming), with AS content assumed.",
    children: [
      topic("data-representation", "13", "Data representation", {
        components: P3,
        children: [
          sub("data-representation.user-defined", "13.1", "User-defined data types", {
            stage: ALO,
            covers: ["acs.ds.user-defined-types"],
            objectives: [
              "Explain why user-defined types are needed.",
              "Define and use non-composite (enumerated, pointer) and composite (set, record, class) types and design one for a problem.",
            ],
          }),
          sub("data-representation.file-organisation", "13.2", "File organisation and access", {
            stage: ALO,
            covers: ["acs.data.file-organisation"],
            objectives: [
              "Compare serial, sequential and random file organisation and choose an organisation and access method for a problem.",
              "Describe and use hashing algorithms to read data from and write data to a file.",
            ],
          }),
          sub("data-representation.floating-point", "13.3", "Floating-point numbers, representation and manipulation", {
            stage: ALO,
            covers: ["acs.data.floating-point-representation", "acs.data.floating-point-errors"],
            objectives: [
              "Describe the format of binary floating-point real numbers in two's complement and convert them to denary and back.",
              "Normalise floating-point numbers and explain why.",
              "Explain the effect of the allocation of bits to mantissa and exponent.",
              "Explain approximation, rounding errors, overflow and underflow.",
            ],
          }),
        ],
      }),
      topic("internet-technologies", "14", "Communication and internet technologies", {
        components: P3,
        children: [
          sub("internet-technologies.protocols", "14.1", "Protocols", {
            stage: ALO,
            covers: ["acs.network.osi-tcpip-models", "acs.network.application-protocols"],
            objectives: [
              "Explain why a protocol is essential and how a protocol suite is viewed as a stack of layers.",
              "Describe the four TCP/IP layers (Application, Transport, Internet, Link) and what happens to a message sent from one host to another.",
              "Describe the purposes of HTTP, FTP, POP3, IMAP, SMTP and BitTorrent.",
            ],
          }),
          sub("internet-technologies.switching", "14.2", "Circuit switching and packet switching", {
            stage: ALO,
            covers: ["acs.network.switching"],
            objectives: [
              "Describe circuit switching and packet switching, with benefits, drawbacks and uses.",
              "Explain how a router and packet switching pass a message across a network, including the internet.",
            ],
          }),
        ],
      }),
      topic("hardware-virtual-machines", "15", "Hardware and virtual machines", {
        components: P3,
        children: [
          sub("hardware-virtual-machines.processors", "15.1", "Processors, parallel processing and virtual machines", {
            stage: ALO,
            covers: ["acs.cpu.risc-cisc-pipelining", "acs.cpu.parallel-processing", "acs.cpu.virtual-machines"],
            objectives: [
              "Compare RISC and CISC processors, including interrupt handling and the use of pipelining and registers.",
              "Describe the four basic computer architectures (SISD, SIMD, MISD, MIMD) and massively parallel computers.",
              "Explain virtual machines, with their benefits and limitations.",
            ],
          }),
          sub("hardware-virtual-machines.boolean", "15.2", "Boolean algebra and logic circuits", {
            stage: ALO,
            covers: ["acs.logic.adders-flip-flops", "acs.logic.boolean-algebra", "acs.logic.karnaugh-maps"],
            objectives: [
              "Produce truth tables for logic circuits, including half and full adders, and describe SR and JK flip-flops.",
              "Apply Boolean algebra and De Morgan's laws to simplify circuits and expressions.",
              "Use Karnaugh maps to solve logic problems.",
            ],
          }),
        ],
      }),
      topic("system-software-a", "16", "System software", {
        components: P3,
        children: [
          sub("system-software-a.os", "16.1", "Purposes of an operating system (OS)", {
            stage: ALO,
            covers: ["acs.os.process-scheduling", "acs.os.memory-management"],
            objectives: [
              "Explain how an OS maximises resource use and the user interface hides hardware complexity.",
              "Explain process management: multi-tasking, process states, scheduling routines and interrupt handling by the kernel.",
              "Explain paging, segmentation, virtual memory, page replacement and disk thrashing.",
            ],
          }),
          sub("system-software-a.translation", "16.2", "Translation software", {
            stage: ALO,
            covers: ["acs.translation.compilation-stages", "acs.translation.bnf-syntax-diagrams", "acs.translation.rpn"],
            objectives: [
              "Explain how an interpreter executes a program without producing a translated version.",
              "Describe the stages of compilation.",
              "Express grammar with syntax diagrams or Backus-Naur Form.",
              "Use Reverse Polish Notation to evaluate expressions.",
            ],
          }),
        ],
      }),
      topic("security-a", "17", "Security", {
        components: P3,
        children: [
          sub("security-a.encryption", "17.1", "Encryption, encryption protocols and digital certificates", {
            stage: ALO,
            covers: ["acs.security.encryption", "acs.security.ssl-tls-certificates"],
            objectives: [
              "Explain symmetric and asymmetric encryption with public and private keys, and how they give private and verified messages.",
              "Describe the purpose, benefits and drawbacks of quantum cryptography.",
              "Explain the purpose and use of SSL/TLS and digital certificates and signatures.",
            ],
          }),
        ],
      }),
      topic("artificial-intelligence", "18", "Artificial Intelligence (AI)", {
        components: P3,
        children: [
          sub("artificial-intelligence.ai", "18.1", "Artificial Intelligence (AI)", {
            stage: ALO,
            covers: ["acs.ai.graphs-search", "acs.ai.machine-learning"],
            objectives: [
              "Explain how graphs aid AI and use Dijkstra's and A* algorithms on a graph.",
              "Explain neural networks, deep learning, machine learning and reinforcement learning, back propagation and regression, and the machine learning categories.",
            ],
          }),
        ],
      }),
      topic("computational-thinking", "19", "Computational thinking and problem-solving", {
        components: P34,
        children: [
          sub("computational-thinking.algorithms", "19.1", "Algorithms", {
            stage: ALO,
            covers: [
              "acs.algo.binary-search-insertion-sort",
              "acs.algo.complexity-big-o",
              "acs.ds.stack-queue-algorithms",
              "acs.ds.linked-list-algorithms",
              "acs.ds.binary-tree-algorithms",
              "acs.ds.graphs-dictionaries",
            ],
            objectives: [
              "Write algorithms for linear and binary search and for insertion and bubble sort, and explain their performance.",
              "Write algorithms to insert and delete items in a stack, queue and linked list, and to find items in a linked list and binary tree.",
              "Describe a graph and a dictionary as ADTs and implement ADTs from built-in types or other ADTs.",
              "Compare algorithms by time and memory, using Big O notation.",
            ],
          }),
          sub("computational-thinking.recursion", "19.2", "Recursion", {
            stage: ALO,
            covers: ["acs.algo.recursion"],
            objectives: [
              "Explain the essential features of recursion and write and trace recursive algorithms.",
              "Explain when recursion is beneficial and how a compiler translates recursive code (stacks and unwinding).",
            ],
          }),
        ],
      }),
      topic("further-programming", "20", "Further programming", {
        components: P34,
        children: [
          sub("further-programming.paradigms", "20.1", "Programming paradigms", {
            stage: ALO,
            covers: ["acs.prog.language-paradigms", "acs.prog.oop-concepts", "acs.prog.oop-programming", "acs.prog.declarative-programming"],
            description: "Low-level programming (writing code with the addressing modes) is practised through the assembly concepts covered at 4.2; Paper 4 excludes low-level and declarative programming.",
            objectives: [
              "Explain what a programming paradigm is and the characteristics of low-level, imperative, object-oriented and declarative paradigms.",
              "Use OOP terminology (objects, classes, inheritance, polymorphism, containment, encapsulation, getters, setters) and design and write classes.",
              "Write facts and rules to solve a problem and satisfy a goal in declarative programming.",
            ],
          }),
          sub("further-programming.files-exceptions", "20.2", "File processing and exception handling", {
            stage: ALO,
            covers: ["acs.prog.file-processing-exceptions"],
            objectives: [
              "Write code to open, read, write, append and close files and to read and write records on serial, sequential and random files.",
              "Explain exceptions and when exception handling is appropriate, and write code that uses it.",
            ],
          }),
        ],
      }),
    ],
  }),
  section("practical-skills", "PS", "Practical skills", {
    description: "Not a content section of the syllabus: our grouping of the practical assessment (Paper 4).",
    children: [
      topic("practical-skills.paper-4", "P4", "Practical programming (Paper 4)", {
        components: ["4"],
        description: "Written in console-mode Java, Visual Basic or Python; this product uses Python. Candidates submit program code and evidence of testing from a computer without internet access.",
        children: [
          sub("practical-skills.paper-4.programming", "P4.1", "Programming tasks and evidence", {
            stage: ALO,
            covers: ["acs.skills.python-practical"],
            objectives: [
              "Write programs or program elements to solve scenario-based tasks on topics 19 and 20.",
              "Test the program, correct errors and copy listings and screenshots of results into the evidence document.",
            ],
          }),
        ],
      }),
    ],
  }),
];

const c9618 = {
  board: "cambridge",
  qualification: "a-level",
  subject: "computer-science",
  versionLabel: "2027-2029",
  family: "computer-science-a",
  title: "Cambridge International AS & A Level Computer Science (9618)",
  code: "9618",
  effectiveFrom: "2027-01-01",
  effectiveTo: "2029-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge International AS & A Level Computer Science 9618 syllabus for 2027, 2028 and 2029 (version 2)",
    url: "https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Topic and sub-topic headings (1 Information representation ... 20.2 File Processing and Exception Handling) are transcribed with their printed numbers; the syllabus does not number its learning outcomes, so objective codes (1.1.1 ...) are ours. Objectives paraphrase the learning outcomes in our own words. The three sections and the practical-skills topic P4 (code P4.1.1 ...) are ours, summarising the Paper 4 description. No syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-10): the official PDF 'Cambridge International AS & A Level Computer Science 9618 syllabus for 2027, 2028 and 2029', version 2 (the contents page says it is the latest version, published December 2025, with no significant changes that affect teaching; copyright line September 2024), read through a pdftotext rendering. Exams in the June and November series. Check the headings against the PDF.",
    "This syllabus starts in 2027: candidates examined in 2026 sit the previous syllabus (not in the repository), so there is no overlapping version here.",
    "Routes as printed: AS Level only (Papers 1 and 2 in one series; grades a-e); A Level staged over two years (AS in year 1, carried forward, then Papers 3 and 4); A Level in one series (all four papers; grades A*-E). Route A here covers both A Level routes.",
    "Weightings: Paper 1 50% of AS and 25% of A Level; Paper 2 50% and 25%; Paper 3 25% of A Level; Paper 4 25%. weightingPercent records the A Level share; the AS shares are in each paper's description. Assessment objectives: AO1 30%, AO2 40%, AO3 30% of both AS and A Level; by paper AO1/AO2/AO3: Paper 1 60/40/0, Paper 2 0/40/60, Paper 3 60/40/0, Paper 4 0/0/100. Calculators must not be used in any paper.",
    "Topics 1-8 are examined in Paper 1, 9-12 in Paper 2 (answers in pseudocode; an Insert gives the pseudocode built-in functions and operators), 13-20 in Paper 3, and Paper 4 is a practical programming paper on topics 19-20 except low-level and declarative programming (tasks based on a small number of scenarios; program code and testing evidence submitted; Java, Visual Basic or Python in console mode on centre computers with no internet or email). Question structures and part marks are not printed in the syllabus: our practice exam-format items use a convention that a reviewer must check against recent papers.",
    "Pseudocode: the syllabus refers to the Cambridge pseudocode guide for teachers (on the Cambridge support site, not in the repository). Pseudocode in this product follows the guide's conventions as summarised in BRIEF.md; a reviewer should check unusual constructs (classes, exception handling, random-file statements) against the current guide.",
    "Algorithm and data structure topics are split: AS content (stacks, queues and linked lists as ADTs, bubble sort and linear search, no code for ADTs) and A Level content (insertion sort, binary search, ADT algorithms, binary trees, dictionaries, graphs, Big O, recursion). Graph code is not required; Dijkstra's and A* are performed by hand.",
    "Section 9.1 (computational thinking skills) has no concept of its own: abstraction and decomposition are taught in the algorithm design lesson covered at 9.2.",
    "ZIMSEC-only concepts (electronic components, OSI model detail, RIP and OSPF, quick sort, mobile applications, SDLC, software architecture, enterprising, e-waste, computer crime law) have no Cambridge node.",
  ],
  overview: "Cambridge International AS & A Level Computer Science (9618) is a two-stage course. The AS Level content (topics 1-12) covers information representation (number systems, character sets, graphics, sound and compression), networks and the internet, hardware and logic gates, processor fundamentals (the CPU, fetch-execute cycle, assembly language and bit manipulation), system software, security, privacy and data integrity, ethics and ownership, databases and SQL, and problem solving and programming in pseudocode with data types, arrays, files, abstract data types and software development. The A Level content (topics 13-20) adds user-defined types, file organisation, floating-point numbers, protocols and switching, parallel processors and virtual machines, Boolean algebra, process scheduling and memory management, compilation, encryption, artificial intelligence, algorithms with abstract data types and recursion, and programming paradigms with file processing and exception handling.",
  assessmentOverview: "AS Level candidates take Paper 1 Theory Fundamentals (1 hour 30 minutes, 75 marks) and Paper 2 Fundamental Problem-solving and Programming Skills (2 hours, 75 marks). A Level candidates also take Paper 3 Advanced Theory (1 hour 30 minutes, 75 marks) and Paper 4 Practical (2 hours 30 minutes, 75 marks), either in the same series or a later one, carrying forward their AS result.",
  components: [
    { code: "1", name: "Paper 1: Theory Fundamentals", kind: "WRITTEN", description: "Short and longer written answers on AS Level topics 1-8 (AO1 and AO2). 50% of AS Level, 25% of A Level.", durationMinutes: 90, maxMarks: 75, weightingPercent: 25, calculatorAllowed: false },
    { code: "2", name: "Paper 2: Fundamental Problem-solving and Programming Skills", kind: "WRITTEN", description: "Written paper on AS Level topics 9-12; answers are written in pseudocode (AO2 and AO3). 50% of AS Level, 25% of A Level.", durationMinutes: 120, maxMarks: 75, weightingPercent: 25, calculatorAllowed: false },
    { code: "3", name: "Paper 3: Advanced Theory", kind: "WRITTEN", description: "Short and longer written answers on A Level topics 13-20, with AS Level content assumed (AO1 and AO2). 25% of A Level.", durationMinutes: 90, maxMarks: 75, weightingPercent: 25, calculatorAllowed: false },
    { code: "4", name: "Paper 4: Practical", kind: "PRACTICAL", description: "A practical programming paper on topics 19 and 20 (except low-level and declarative programming), taken on a computer with no internet or email; candidates submit complete program code and evidence of testing, in Java, Visual Basic or Python in console mode (AO3). 25% of A Level.", durationMinutes: 150, maxMarks: 75, weightingPercent: 25, calculatorAllowed: false },
  ],
  routes: [
    { code: "AS", name: "AS Level", description: "Papers 1 and 2 (grades a-e). Also the first year of the staged A Level route.", components: ["1", "2"] },
    { code: "A", name: "A Level", description: "All four papers, in one series or staged (AS Level carried forward, then Papers 3 and 4) (grades A*-E).", isDefault: true, components: ["1", "2", "3", "4"] },
  ],
  topics: C9618_TOPICS,
};

// =====================================================================================================================
// Checks: every covered concept exists, each concept is covered at most once per syllabus (on the most specific node),
// every concept is covered by at least one syllabus, node keys and objective codes are unique, at most one free-preview
// lesson per top-level topic of each syllabus; report what each syllabus leaves out. Then label each concept description
// with its coverage.
const coverage = new Map(); // concept -> { zimsec?: form, cambridge?: stage }
const topicOf = new Map(); // `${board}|${concept}` -> top-level topic code
for (const s of [zimsec, c9618]) {
  const seen = new Map();
  const codes = new Set();
  const keys = new Set();
  let nodes = 0;
  const walk = (list, top) => {
    for (const n of list) {
      nodes++;
      const topCode = top ?? (n.kind === "SECTION" ? null : n.code);
      if (keys.has(n.key)) throw new Error(`${s.board}: duplicate node key ${n.key}`);
      keys.add(n.key);
      if ((n.covers ?? []).length && (n.children ?? []).length) throw new Error(`${s.board}: ${n.key} covers concepts and has children (cover on the most specific node)`);
      if ((n.covers ?? []).length && !(n._form || n._stage)) throw new Error(`${s.board}: ${n.key} covers concepts but has no form/stage`);
      for (const c of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: unknown concept ${c} on ${n.key}`);
        if (seen.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: ${c} covered on ${seen.get(c)} and ${n.key}`);
        seen.set(c, n.key);
        topicOf.set(`${s.board}|${c}`, topCode);
        coverage.set(c, { ...(coverage.get(c) ?? {}), [s.board]: n._form ?? n._stage });
      }
      for (const ob of n.objectives ?? []) {
        if (codes.has(ob.code)) throw new Error(`${s.board}: duplicate objective code ${ob.code}`);
        codes.add(ob.code);
      }
      walk(n.children ?? [], n.kind === "SECTION" ? null : topCode);
    }
  };
  walk(s.topics, null);
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${s.topics.length} top-level nodes, ${nodes} nodes, ${seen.size} concepts covered, ${codes.size} objectives; not covered (${missing.length}): ${missing.join(", ") || "none"}\n`);
}
const orphans = [...CONCEPT_KEYS].filter((k) => !coverage.has(k));
if (orphans.length) throw new Error(`concepts no syllabus covers: ${orphans.join(", ")}`);

// Free-preview check: at most one per top-level topic per syllabus.
for (const board of ["zimsec", "cambridge"]) {
  const per = new Map();
  for (const k of FREE_PREVIEW) {
    const top = topicOf.get(`${board}|${k}`);
    if (top === undefined) continue;
    if (per.has(top)) throw new Error(`${board}: two free-preview lessons in topic ${top}: ${per.get(top)} and ${k}`);
    per.set(top, k);
  }
  console.log(`${board}: ${per.size} free-preview lessons (topics ${[...per.keys()].join(", ")})`);
}

const label = (cv) => {
  if (cv.zimsec && cv.cambridge) return `Both boards (ZIMSEC ${cv.zimsec}; Cambridge ${cv.cambridge}).`;
  if (cv.zimsec) return `ZIMSEC only (${cv.zimsec}).`;
  return `Cambridge only (${cv.cambridge}).`;
};
const shared = [...coverage.values()].filter((c) => c.zimsec && c.cambridge).length;
console.log(`${CONCEPTS.length} concepts in the registry (${shared} shared, ${[...coverage.values()].filter((c) => !c.cambridge).length} ZIMSEC only, ${[...coverage.values()].filter((c) => !c.zimsec).length} Cambridge only)`);

const cleanDesc = (d) => d.replace(/^(ZIMSEC only|Cambridge A Level only|A Level only): /, "");
const registry = {
  family: "computer-science-a",
  name: "Computer Science (A-Level / AS & A Level)",
  level: "A",
  prefix: "acs",
  subjects: ["zimsec/a-level/computer-science", "cambridge/a-level/computer-science"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description: `${label(coverage.get(key))} ${cleanDesc(description)}` })),
};

const strip = (k, v) => (k.startsWith("_") ? undefined : v);
const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, strip, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/computer-science-a.json", registry);
write("content/syllabi/zimsec/a-level/computer-science/2015-2022.json", zimsec);
write("content/syllabi/cambridge/a-level/computer-science/2027-2029.json", c9618);
