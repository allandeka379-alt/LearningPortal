// Builds content/concepts/computer-science-o.json and the two Computer Science syllabus files:
//   content/syllabi/zimsec/o-level/computer-science/2015-2022.json
//   content/syllabi/cambridge/igcse/computer-science/2026-2028.json   (Cambridge IGCSE Computer Science 0478, version 6)
// Sources (local only, not in git): .scratch/computer-science/sources/zimsec-computer-science.pdf (+ .txt),
// 0478-2026-2028.pdf (+ .txt) and 0478-2026-2028-update.pdf (+ .txt).
// Run from the repo root: node .scratch/computer-science/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

// ---------------------------------------------------------------------------------------------------------------------
// Concept registry (one concept ≈ one lesson's worth of learning). Prefix "comp" ("cs" is Combined Science).
// Descriptions say what is in and out, and name the board when only one syllabus examines the concept.
const CONCEPTS = [
  // Data representation
  ["comp.data.number-systems", "Number systems: why computers use binary", "Why computers represent all data in binary (two-state switches, logic gates, registers); bits; the denary (base 10), binary (base 2) and hexadecimal (base 16) systems and place value. Conversions are in the next concepts."],
  ["comp.data.binary-denary", "Converting between binary and denary", "Converting positive whole numbers between denary and binary in both directions, up to 16 bits, by place values and by repeated division by 2; writing 8-bit answers with leading zeros. Negative numbers and fractions are out."],
  ["comp.data.hexadecimal", "Hexadecimal: conversions and uses", "Converting positive whole numbers between hexadecimal and denary and between hexadecimal and binary (nibble groups); why hexadecimal is used (shorter, easier for humans to read than binary) and where: MAC addresses, colour codes, memory dumps, error codes, assembly code."],
  ["comp.data.octal", "Octal (base 8)", "ZIMSEC only. The octal number system: place values, converting between octal and denary and between octal and binary (groups of three bits), and comparing octal with hexadecimal."],
  ["comp.data.binary-addition", "Binary addition and overflow", "Adding two positive 8-bit binary integers column by column with carries; recognising an overflow when the result needs more than 8 bits (greater than 255) and why overflow errors occur in a fixed-size register."],
  ["comp.data.binary-subtraction", "Binary subtraction", "ZIMSEC only. Subtracting positive binary numbers column by column with borrowing, and checking the result by converting to denary. Two's complement subtraction is not required."],
  ["comp.data.logical-shifts", "Logical binary shifts", "Cambridge only. Logical left and right shifts (single and multiple places) on a positive 8-bit integer: bits lost at one end, zeros shifted in at the other, the effect (multiplying or dividing by a power of 2) and when a shift loses information."],
  ["comp.data.twos-complement", "Two's complement", "Cambridge only. Representing positive and negative 8-bit integers in two's complement (range -128 to 127), converting between denary or binary and two's complement in both directions, and the meaning of the most significant bit."],
  ["comp.data.text-character-sets", "Representing text: ASCII and Unicode", "How text is stored as binary codes from a character set; ASCII (7-bit and extended 8-bit) and Unicode; why Unicode needs more bits per character and covers many more characters, languages and emojis; converting characters to codes using a given table."],
  ["comp.data.sound-images", "Representing sound and images", "Cambridge only. Sampling a sound wave: sample rate and sample resolution and their effect on accuracy and file size. Bitmap images as pixels: resolution and colour depth and their effect on quality and file size. File size calculations are in comp.data.file-size."],
  ["comp.data.storage-units", "Units of data storage", "Bit, nibble, byte and the larger units: kibibyte (KiB), mebibyte (MiB), gibibyte (GiB), tebibyte (TiB), pebibyte (PiB) and exbibyte (EiB) with 1024 between units (Cambridge), and the kilobyte, megabyte, gigabyte and terabyte names used in the ZIMSEC syllabus; converting between units."],
  ["comp.data.file-size", "Calculating file sizes", "Cambridge only. Calculating the file size of a bitmap image (resolution x colour depth) and of a sound file (sample rate x sample resolution x length), and giving the answer in the unit asked for using 1024."],
  ["comp.data.compression", "Data compression: lossy and lossless", "Cambridge only. Why files are compressed (less storage, less bandwidth, shorter transmission time); lossy compression (reducing resolution, colour depth, sample rate or resolution; permanent loss) and lossless compression, including run-length encoding (RLE); choosing a method for a given file."],
  // Boolean logic
  ["comp.logic.gates", "Logic gates and their functions", "The six gates NOT, AND, OR, NAND, NOR and XOR: their standard symbols (described in words), what each does, the truth table of each gate, and that NOT has one input while the others have two."],
  ["comp.logic.truth-tables", "Truth tables for logic circuits and expressions", "Completing a truth table with up to three inputs (A, B, C in binary order) for a logic circuit or a logic expression, using intermediate columns; checking a circuit's output for given inputs."],
  ["comp.logic.circuits-expressions", "Designing logic circuits and writing logic expressions", "Turning a problem statement, a logic expression or a truth table into a logic circuit (at most three inputs, one output, drawn as stated without simplification) and writing a logic expression from a problem statement, a circuit or a truth table; modelling control problems such as alarms and safety interlocks."],
  // Hardware
  ["comp.hardware.cpu", "The central processing unit (CPU)", "The role of the CPU in processing instructions and data; the microprocessor as an integrated circuit on one chip; the arithmetic logic unit, the control unit and main memory as processing devices. Register-level detail of the fetch-decode-execute cycle is in comp.hardware.fetch-execute."],
  ["comp.hardware.fetch-execute", "Von Neumann architecture, the fetch-decode-execute cycle and CPU performance", "Cambridge only. The Von Neumann CPU: ALU, CU, the registers PC, MAR, MDR, CIR and ACC, and the address, data and control buses; each step of the fetch-decode-execute cycle; how the number of cores, cache size and clock speed affect performance; what an instruction set is."],
  ["comp.hardware.embedded-systems", "Embedded systems", "Cambridge only. What an embedded system is (a microprocessor system with a dedicated function inside a larger device), its characteristics, examples (domestic appliances, cars, security and lighting systems, vending machines) and how it differs from a general-purpose computer."],
  ["comp.hardware.input-devices", "Input devices", "What an input device is and why it is needed; how common devices work and when to use them: keyboard, optical mouse, microphone, digital camera, barcode and QR code scanners, touch screens (resistive, capacitive, infra-red), 2D and 3D scanners; choosing a device for a scenario."],
  ["comp.hardware.output-devices", "Output devices", "What an output device is and why it is needed; how common devices work and when to use them: LCD and LED screens, DLP and LCD projectors, inkjet, laser and 3D printers, speakers and actuators; choosing a device for a scenario."],
  ["comp.hardware.sensors", "Sensors", "Cambridge only. What a sensor is, the type of data each sensor captures (acoustic, accelerometer, flow, gas, humidity, infra-red, level, light, magnetic field, moisture, pH, pressure, proximity, temperature) and choosing the most suitable sensor for a context. Whole automated systems are in comp.emerging.automated-systems."],
  ["comp.hardware.primary-storage", "Primary storage (RAM and ROM) and virtual memory", "Primary storage as memory directly accessed by the CPU; RAM (volatile, read-write) and ROM (non-volatile, read-only, holds the bootstrap) and why a computer needs both; virtual memory: pages moved between RAM and secondary storage when RAM is full (virtual memory is Cambridge only)."],
  ["comp.hardware.secondary-storage", "Secondary storage: magnetic, optical and solid-state", "Why secondary storage is needed; how magnetic (hard disk: platters, tracks, sectors, electromagnets), optical (CD, DVD, Blu-ray: lasers, pits and lands) and solid-state (SSD, SD card, USB drive: NAND/NOR flash, control and floating gates) storage work; comparing them for capacity, speed, cost, durability and portability."],
  ["comp.hardware.ports-usb", "Ports, connections and the USB interface", "Connecting peripherals to a computer through ports and cables (USB, HDMI, audio, Ethernet) and setting them up; the universal serial bus: how it transmits data (serial), and its benefits and drawbacks. Cambridge examines USB; ZIMSEC examines connecting hardware devices."],
  ["comp.hardware.data-capture-systems", "Data capture systems, POS terminals and ATMs", "ZIMSEC only. How hardware is combined in point-of-sale terminals, automated teller machines and data-capture systems (barcodes, OMR, OCR, MICR, magnetic stripe and chip cards, RFID), with their advantages and drawbacks in Zimbabwean shops, banks and schools."],
  ["comp.hardware.maintenance", "Hardware and software maintenance and troubleshooting", "ZIMSEC only. Common faults with software, keyboards, mice, hard drives and memory; diagnosing and fixing them; replacing faulty components safely; preventive maintenance; the parts of a PC and how it is assembled."],
  // Software
  ["comp.software.system-application", "System software, application software and utilities", "The difference between system software (operating systems, utilities, drivers, translators) and application software, with examples; common utility tools (anti-virus, disk defragmenter, disk clean-up, backup, compression, file managers) and what they do."],
  ["comp.software.application-sourcing", "Off-the-shelf, customised and open-source software", "ZIMSEC only. Types of application software by source: off-the-shelf (generic) packages, customised (bespoke) software and open-source software, with advantages and disadvantages of each; licences and freeware/shareware in outline."],
  ["comp.software.operating-systems", "Operating systems", "The role and functions of an operating system: managing files, memory, peripherals and drivers, multitasking, interrupts, user accounts and security, providing an interface and a platform for applications; PC and mobile operating systems compared (ZIMSEC)."],
  ["comp.software.interrupts-firmware", "Firmware, the bootloader and interrupts", "Cambridge only. How hardware, firmware (bootloader) and the operating system together run applications; what an interrupt is, how hardware and software interrupts are generated, how an interrupt service routine handles them and what happens as a result."],
  ["comp.software.languages-translators", "Programming languages, translators and IDEs", "Cambridge only. High-level and low-level languages and their advantages and disadvantages; assembly language, mnemonics and assemblers; how a compiler and an interpreter translate code and report errors, and when each is used; the functions of an integrated development environment (editor, run-time environment, translator, error diagnostics, auto-completion, auto-correction, prettyprint)."],
  // Networks
  ["comp.network.types-topologies", "Network types and topologies", "ZIMSEC only. What a computer network is and why networks are used; LAN, WAN, PAN and MAN; client-server and peer-to-peer networks; the star, ring, bus and mesh topologies with their advantages and disadvantages."],
  ["comp.network.transmission-media", "Transmission media", "ZIMSEC only. Twisted pair, coaxial and fibre-optic cables and wireless media; comparing media on cost, bandwidth, noise immunity, distance, size and scalability; choosing a medium for a situation."],
  ["comp.network.wireless-mobile", "Mobile and wireless technologies", "ZIMSEC only. Mobile phones, tablets, PDAs and satellite communication; wireless technologies (Wi-Fi, WiMAX, Bluetooth, infra-red, microwave and radio waves): range, speed and typical uses in communication."],
  ["comp.network.devices", "Networking devices", "The network interface card; hubs, switches, bridges, routers and modems and the job each does; how a router forwards data to its destination, can assign IP addresses and connects a local network to the internet; designing a simple network (ZIMSEC)."],
  ["comp.network.addressing", "MAC addresses and IP addresses", "The MAC address (assigned at manufacture, manufacturer code and serial number, written in hexadecimal) and its purpose; the IP address (allocated by the network, static or dynamic); IPv4 and IPv6 compared."],
  ["comp.network.protocols", "Network protocols, TCP/IP and the OSI model", "ZIMSEC only. What a protocol is and why it is needed; the TCP/IP protocol suite and its layers; the seven layers of the OSI model in outline; common protocols (HTTP/HTTPS, FTP, SMTP, POP3/IMAP) and what they do."],
  ["comp.network.isp-internet-services", "Internet service providers and internet services", "ZIMSEC only. What an internet service provider does (connection, email, hosting, domain names) and services such as email, e-commerce, e-learning and social media, with their benefits and risks."],
  ["comp.network.cloud", "Cloud storage and cloud services", "What cloud computing and cloud storage are (remote physical servers accessed over the internet), examples of cloud services, and the advantages and disadvantages of storing data in the cloud compared with local storage."],
  // Data transmission
  ["comp.transmission.packets", "Packets and packet switching", "Cambridge only. Why data is broken into packets; the structure of a packet (header with destination address, packet number and originator's address; payload; trailer); packet switching: different routes chosen by routers, out-of-order arrival and reassembly."],
  ["comp.transmission.methods", "Methods of data transmission", "Serial and parallel transmission and simplex, half-duplex and full-duplex transmission modes; advantages and disadvantages of each and choosing the most suitable method for a scenario."],
  ["comp.transmission.error-detection", "Error detection: parity, checksums, echo checks, check digits and ARQ", "Cambridge only. Why errors occur in transmission (interference: data loss, gain or change); parity checks (odd, even, parity byte and parity block), checksums and echo checks; check digits for data entry (ISBN, bar codes); automatic repeat query with acknowledgements and timeouts."],
  ["comp.transmission.encryption", "Encryption", "Why data is encrypted when transmitted; plaintext, ciphertext and keys; symmetric encryption (one shared key) and asymmetric encryption (public and private keys); digital signatures and certificates in outline (ZIMSEC system security)."],
  // The internet
  ["comp.internet.web-browsing", "The internet, the world wide web, URLs, HTTP(S), browsers and DNS", "The internet as infrastructure and the world wide web as the pages on it; the parts of a URL; HTTP and HTTPS; what a web browser does (rendering HTML, bookmarks, history, tabs, cookies, navigation, address bar); how a page is located and displayed using DNS, IP addresses and the web server."],
  ["comp.internet.cookies", "Cookies", "What cookies are; session and persistent cookies; how they are used (saving personal details, tracking preferences, shopping baskets, login details) and the privacy issues they raise; managing cookies in a browser."],
  ["comp.internet.digital-currency", "Digital currency and blockchain", "Cambridge only. What a digital currency is (exists only electronically) and how it is used; blockchain in its basic form as a time-stamped digital ledger of records that cannot be altered, used to track transactions."],
  // Security and ethics
  ["comp.security.malware", "Malware", "Viruses, worms, Trojan horses, spyware, adware and ransomware: how each works, what it aims to do, and its effects; anti-malware software (anti-virus and anti-spyware) as a defence."],
  ["comp.security.cyber-attacks", "Cyber attacks and computer crime", "How brute-force attacks, data interception (sniffing), distributed denial of service, hacking, phishing, pharming, social engineering, spoofing and online fraud are carried out, what the attacker aims to achieve, and their effects on people and organisations."],
  ["comp.security.authentication-access", "Authentication and access control", "Usernames and strong passwords, biometrics and two-step verification; access levels, user accounts and file permissions; privacy settings; choosing suitable controls for a scenario."],
  ["comp.security.network-defences", "Firewalls, proxy servers, SSL and other protections", "How firewalls and proxy servers protect a network; the secure socket layer (SSL) protocol and digital certificates; automatic software updates; checking URLs, spelling and tone of communications to spot attacks; matching each solution to the threats it counters."],
  ["comp.security.cyber-wellness-ethics", "Cyber-wellness and computer ethics (Unhu/Ubuntu/Vumunhu)", "ZIMSEC only. Responsible online behaviour: handling online content, online relationships, safe and unsafe websites, cyber-bullying; computer ethics and Unhu/Ubuntu/Vumunhu values; the effects of unethical online activity on individuals and society."],
  ["comp.security.copyright-plagiarism", "Copyright, plagiarism and piracy", "ZIMSEC only. Copyright and why it matters (Zimbabwe's Copyright and Neighbouring Rights Act [Chapter 26:05] in outline; the syllabus resource list cites a Copyright Act, Chapter 26:1); plagiarism and software piracy, their consequences, and how anti-plagiarism software and licences help. Patents and other intellectual property rights for businesses are in comp.techno.laws-ipr."],
  ["comp.security.data-privacy", "Data privacy and data integrity", "ZIMSEC only. Keeping personal data private (principles of data protection, consent, user accounts with access levels) and keeping data accurate and consistent (data integrity); threats to privacy and integrity. Validation and verification techniques are in comp.algorithms.validation-verification."],
  ["comp.security.backup-recovery", "Backups and disaster recovery", "ZIMSEC only. Backing up files (full and incremental backups, on-site, off-site and cloud), restoring data with recovery tools, and the contents of a disaster recovery plan."],
  // Automated and emerging technologies
  ["comp.emerging.automated-systems", "Automated systems", "Cambridge only. How sensors, a microprocessor and actuators work together in an automated system (read, compare with stored values, act, repeat), with scenarios from industry, transport, agriculture, weather, gaming, lighting and science, and the advantages and disadvantages of automation in a given scenario."],
  ["comp.emerging.robotics", "Robotics", "What robotics is; the characteristics of a robot (mechanical structure, sensors, microprocessors, actuators, programmable); robots in industry, transport, agriculture, medicine, the home and entertainment, and the advantages and disadvantages of their use."],
  ["comp.emerging.artificial-intelligence", "Artificial intelligence and expert systems", "What artificial intelligence is; its characteristics (data and rules, reasoning, learning and adapting); expert systems (knowledge base, rule base, inference engine, interface) and machine learning; intelligent systems in use."],
  // Applications of computer science (ZIMSEC)
  ["comp.applications.banking-education-social", "Computers in banking, education, social networks and research", "ZIMSEC only. How computer systems are used in banking (ATMs, EFT, internet and mobile banking, mobile money), education (e-learning, school administration systems), social networks and research and development, with benefits and drawbacks."],
  ["comp.applications.transport-health-environment", "Computers in transport, health and environmental management", "ZIMSEC only. Computer systems for transport management (ticketing, traffic control, tracking), health (patient records, monitoring, diagnosis support, health information systems) and environmental management (monitoring weather, pollution and resources)."],
  ["comp.applications.industry-mining-wildlife", "Computers in manufacturing, mining and wildlife management", "ZIMSEC only. Computer-aided design and manufacturing, process control in mining, and wildlife management (tracking collars, anti-poaching surveillance, park records), with benefits and drawbacks."],
  ["comp.applications.agriculture-ambient-gis", "Computers in agriculture, ambient systems and GIS", "ZIMSEC only. Computer use in agriculture (precision farming, irrigation control, livestock records, market information); ambient (smart) systems in homes and buildings; geographic information systems and their uses; designing models of such systems."],
  // Systems analysis and design (ZIMSEC)
  ["comp.sad.sdlc-fact-finding", "The systems development life cycle and fact-finding", "ZIMSEC only. The stages of the systems development life cycle; problem identification and the preliminary investigation; fact-finding by questionnaire, interview, record inspection and observation, with advantages and disadvantages of each."],
  ["comp.sad.feasibility", "The feasibility study", "ZIMSEC only. Technical, economic, legal, operational and social (and schedule) feasibility; carrying out a feasibility study and writing its conclusion."],
  ["comp.sad.analysis-tools", "Systems analysis: requirements, DFDs and activity diagrams", "ZIMSEC only. Activities in the analysis stage: describing the current system, requirements, alternative solutions; drawing and interpreting data flow diagrams and activity diagrams (described in words or tables)."],
  ["comp.sad.system-design", "System design: input, output, interface, files and system flowcharts", "ZIMSEC only. Designing input forms and output reports, user interfaces, files and database tables; system flowcharts; designing algorithms for the new system."],
  ["comp.sad.documentation-training", "Documentation and user training", "ZIMSEC only. User documentation and technical documentation and their contents; why and how users are trained."],
  ["comp.sad.implementation-maintenance", "Implementation, evaluation and maintenance", "ZIMSEC only. Changeover methods (direct, parallel, phased, pilot) with advantages and disadvantages; evaluating a new system against its objectives; corrective, adaptive and perfective maintenance."],
  // Algorithm design and problem-solving
  ["comp.algorithms.decomposition-pdlc", "Problem decomposition and the program development life cycle", "The program development life cycle (analysis, design, coding, testing) and the tasks in each; systems made of sub-systems; abstraction and decomposition; inputs, processes, outputs and storage; structure diagrams; top-down and bottom-up design."],
  ["comp.algorithms.algorithm-basics", "Algorithms and the sequence construct", "What an algorithm is and why algorithms are used; the sequence construct; stating the purpose of a given algorithm and describing its processes; writing simple sequence algorithms in pseudocode."],
  ["comp.algorithms.flowcharts", "Flowcharts", "The standard flowchart symbols (terminator, process, input/output, decision, subroutine, flow line) described in words; drawing and interpreting flowcharts with sequence, selection and loops; converting between flowcharts and pseudocode."],
  ["comp.algorithms.trace-tables", "Trace tables and dry runs", "Dry-running an algorithm (pseudocode or flowchart) with given data and recording each change of the variables, outputs and user prompts in a trace table; using a trace to find the purpose of an algorithm or an error."],
  ["comp.algorithms.totalling-counting", "Totalling, counting, maximum, minimum and average", "Standard methods: running totals, counting, finding the largest and smallest values and calculating an average, in loops over input values and arrays."],
  ["comp.algorithms.search-sort", "Linear search and bubble sort", "The linear search (with a flag or early exit) and the bubble sort (passes, swaps, a flag to stop early): how they work, tracing them and writing them in pseudocode."],
  ["comp.algorithms.validation-verification", "Validation and verification", "Validation checks (range, length, type, presence, format, check digit) and why they are needed; verification checks (visual check, double entry) and their purpose; writing algorithms that validate or verify input."],
  ["comp.algorithms.test-data", "Test data and test plans", "Normal, abnormal, extreme and boundary test data and choosing values of each type; writing a test plan with expected results (ZIMSEC testing strategy)."],
  ["comp.algorithms.errors-debugging", "Finding and correcting errors", "Syntax, logic and run-time errors; identifying errors in a given algorithm or program and suggesting corrections; testing and debugging techniques and simple error handling."],
  ["comp.algorithms.scenario-problems", "Writing algorithms for scenarios", "Writing and amending complete algorithms in pseudocode (or program code) for a described problem: planning the data structures, combining input with validation, loops, selection, arrays, totals and output; the Cambridge 15-mark scenario question and ZIMSEC project-style tasks."],
  // Programming
  ["comp.prog.variables-data-types", "Variables, constants, data types, input and output", "Declaring and using variables and constants; the data types integer, real, char, string and Boolean (ZIMSEC: integer, character, string and Boolean); assignment; INPUT and OUTPUT; the structure of a simple program."],
  ["comp.prog.operators", "Operators and library routines", "Arithmetic operators (+, -, *, /, ^, MOD, DIV), relational operators (=, <, <=, >, >=, <>) and logical operators (AND, OR, NOT); precedence and brackets; the library routines ROUND and RANDOM (Cambridge)."],
  ["comp.prog.selection", "Selection: IF and CASE", "IF statements with and without ELSE, nested IF statements and CASE statements with OTHERWISE, written in pseudocode; choosing between IF and CASE."],
  ["comp.prog.iteration", "Iteration: FOR, WHILE and REPEAT loops", "Count-controlled (FOR, with STEP), pre-condition (WHILE) and post-condition (REPEAT ... UNTIL) loops; choosing the right loop; nested loops (at most three levels)."],
  ["comp.prog.string-handling", "String handling", "Cambridge only. LENGTH, SUBSTRING, UCASE and LCASE; positions starting at 1 (or 0 in some languages); using string operations in loops (counting characters, extracting parts, checking formats)."],
  ["comp.prog.subroutines", "Procedures, functions, parameters and scope", "Defining and calling procedures and functions with or without parameters (up to three); RETURN values; local and global variables; why subroutines are used."],
  ["comp.prog.maintainable-code", "Writing maintainable programs", "Meaningful identifiers for variables, constants, arrays, procedures and functions; comments; using subroutines and constants so that programs are easy to read, test and update; program structure."],
  ["comp.prog.arrays-1d", "One-dimensional arrays", "Cambridge only. Declaring a 1D array with its bounds, reading and writing elements with a variable index, and processing an array with a loop (input, output, totals, search)."],
  ["comp.prog.arrays-2d", "Two-dimensional arrays", "Cambridge only. Declaring a 2D array, row and column indexes, and processing it with nested loops (filling, row and column totals, searching)."],
  ["comp.prog.file-handling", "File handling", "Cambridge only. Why programs store data in files; OPENFILE in READ or WRITE mode, READFILE, WRITEFILE and CLOSEFILE; reading and writing single items and lines of text."],
  ["comp.prog.gui-oop", "Visual programming: interfaces, events and objects", "ZIMSEC only. Designing user interfaces with menus and controls (forms, buttons, text boxes, labels, list boxes); event-driven programming; objects, properties and methods; classes, encapsulation, inheritance and polymorphism in outline (as in Visual Basic .NET or Python)."],
  // Databases
  ["comp.db.table-design", "Database tables: fields, records, data types and primary keys", "Defining a single-table database from given requirements: fields and records, suitable data types (text/alphanumeric, character, Boolean, integer, real, date/time), field sizes and formats, validation rules and input masks; choosing a suitable primary key."],
  ["comp.db.relational-erd", "Relational databases and entity-relationship diagrams", "ZIMSEC only. Linking tables with primary and foreign keys; one-to-one, one-to-many and many-to-many relationships; entity-relationship diagrams with cardinality (described in words); database models compared; importing and exporting data."],
  ["comp.db.sql", "Querying a table with SQL", "Reading, completing and writing SQL to query a single table with SELECT, FROM, WHERE (with AND, OR), ORDER BY ASC/DESC, SUM and COUNT, and stating the output of a query on given data; designing and running queries in a database package (ZIMSEC)."],
  ["comp.db.forms-reports-crud", "Forms, reports and data manipulation", "ZIMSEC only. Creating datasheets, forms and reports; create, read (retrieve), update and delete (CRUD) operations; searching, sorting and filtering records."],
  ["comp.db.advanced-queries", "Multi-table queries and connecting databases to programs", "ZIMSEC only. Queries across related tables (joins, calculated fields, parameter queries, grouping) and connecting a database to a program so that it can read and update records."],
  ["comp.db.security", "Database security", "ZIMSEC only. Protecting a database: user accounts and passwords, access rights and views, encryption, backups and audit of changes."],
  // Web design (ZIMSEC)
  ["comp.web.html-elements", "Web pages: elements, navigation and HTML", "ZIMSEC only. The elements of a web page (headings, text, images, links, navigation bars, forms) and navigating a site; basic HTML tags and page structure; customising pages and using templates."],
  ["comp.web.cms-content", "Content management systems, templates, plugins and graphics", "ZIMSEC only. Building a website with a content management system (such as WordPress, Joomla or Drupal): templates, themes, plugins and extensions, web feeds and adverts; creating and optimising images, animations and video for the web."],
  ["comp.web.security-testing", "Web security, testing and publishing", "ZIMSEC only. Security measures in web development (HTTPS, strong admin passwords, updates, input checking, permissions), browser developer tools, testing and debugging a website (links, layout, forms, browsers and devices), and uploading and publishing a site."],
  // Technopreneurship (ZIMSEC)
  ["comp.techno.capital-ethics-marketing", "Intellectual capital, business ethics and marketing", "ZIMSEC only. Human, organisational and social capital; business ethics and Unhu/Ubuntu/Vumunhu values; marketing and business strategies for ICT businesses, including e-commerce; the outline of an ICT business plan."],
  ["comp.techno.innovation-ecosystem", "The technopreneurship ecosystem and innovation", "ZIMSEC only. Science parks, incubation centres, academic institutions and research and development centres and how they support technopreneurs; technology innovation and design thinking."],
  ["comp.techno.laws-ipr", "Laws, policies and intellectual property rights for technopreneurs", "ZIMSEC only. Laws and policies that affect technology businesses (business registration, tax, consumer protection, cyber and data protection laws in outline); intellectual property rights: patents, copyright, trademarks and industrial designs, and how to protect an innovation."],
  ["comp.techno.finance-market-research", "Finance, funding and market research", "ZIMSEC only. Sources of finance and funding for a technology start-up; conducting market research; choosing a business location."],
];
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept key");

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. Objectives are our own paraphrase. objectives: [text] (codes = node code + .n) or [[code, text]].
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, children } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) n.objectives = objectives.map((o, i) => (Array.isArray(o) ? { code: o[0], text: o[1] } : { code: `${code}.${i + 1}`, text: o }));
  if (components) n.components = components;
  if (children) n.children = children;
  return n;
};
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);

// ---------------------------------------------------------------------------------------------------------------------
// ZIMSEC O-Level Computer Science, Forms 1-4, 2015-2022. Topics 6.1-6.11; one sub-topic per form from the competency
// matrix (8.1-8.44, the board's numbers).
const ZIMSEC_TOPICS = [
  topic("hardware-software", "6.1", "Hardware and Software", {
    children: [
      sub("hardware-software.form-1", "8.1", "Form 1: Input, output, storage and processing devices; software concepts", {
        covers: ["comp.hardware.input-devices", "comp.hardware.output-devices", "comp.hardware.cpu", "comp.hardware.primary-storage", "comp.hardware.secondary-storage", "comp.hardware.ports-usb", "comp.software.system-application"],
        objectives: [
          "Explain how input, output, storage and processing devices work.",
          "Connect hardware devices to a computer and troubleshoot the connections.",
          "Identify and classify the types of software.",
        ],
      }),
      sub("hardware-software.form-2", "8.12", "Form 2: Application software and system utility tools", {
        covers: ["comp.software.application-sourcing"],
        objectives: [
          "Identify off-the-shelf, customised and open-source application software.",
          "Use utility software and tools to optimise a system.",
        ],
      }),
      sub("hardware-software.form-3", "8.23", "Form 3: Applications of hardware devices; operating systems", {
        covers: ["comp.hardware.data-capture-systems", "comp.software.operating-systems"],
        objectives: [
          "Identify how hardware devices are applied in point-of-sale terminals, ATMs and data-capturing systems.",
          "Compare personal computer and mobile operating systems.",
          "Explain the functions of an operating system.",
        ],
      }),
      sub("hardware-software.form-4", "8.34", "Form 4: Hardware and software maintenance", {
        covers: ["comp.hardware.maintenance"],
        objectives: [
          "Replace malfunctioning hardware components.",
          "Troubleshoot and fix common software and hardware problems (software, keyboard, mouse, hard drive, memory).",
        ],
      }),
    ],
  }),
  topic("applications", "6.2", "Application of Computer Science", {
    children: [
      sub("applications.form-1", "8.2", "Form 1: Agriculture, banking, education, social networks, research and development", {
        covers: ["comp.applications.banking-education-social"],
        objectives: ["Describe how computers are applied in agriculture, banking, education, social networks and research and development."],
      }),
      sub("applications.form-2", "8.13", "Form 2: Agriculture, transport, health, environmental management, robotics", {
        covers: ["comp.applications.transport-health-environment", "comp.emerging.robotics"],
        objectives: ["Describe how computers are applied in agriculture, transport management, health, environmental management and robotics."],
      }),
      sub("applications.form-3", "8.24", "Form 3: Agriculture, computer-aided manufacturing, intelligent systems, wildlife management, mining", {
        covers: ["comp.applications.industry-mining-wildlife", "comp.emerging.artificial-intelligence"],
        objectives: ["Describe how computers are applied in agriculture, computer-aided manufacturing, intelligent systems, wildlife management and mining."],
      }),
      sub("applications.form-4", "8.35", "Form 4: Agriculture, ambient systems, geographic information systems", {
        covers: ["comp.applications.agriculture-ambient-gis"],
        objectives: ["Design models of agricultural systems, ambient systems and geographic information systems."],
      }),
    ],
  }),
  topic("data-representation", "6.3", "Data Representation", {
    children: [
      sub("data-representation.form-1", "8.3", "Form 1: The binary number system", {
        covers: ["comp.data.number-systems"],
        objectives: [
          "Outline the concept of the binary number system.",
          "Recognise the use and importance of binary numbers in a computer system.",
        ],
      }),
      sub("data-representation.form-2", "8.14", "Form 2: Conversion between binary and denary; ASCII; binary addition and subtraction", {
        covers: ["comp.data.binary-denary", "comp.data.text-character-sets", "comp.data.binary-addition", "comp.data.binary-subtraction"],
        objectives: [
          "Convert numbers between binary and denary.",
          "Convert keyboard characters to binary using ASCII codes.",
          "Add binary numbers.",
          "Subtract binary numbers.",
        ],
      }),
      sub("data-representation.form-3", "8.25", "Form 3: Units of storage; octal and hexadecimal", {
        covers: ["comp.data.storage-units", "comp.data.hexadecimal", "comp.data.octal"],
        objectives: [
          "Outline the units of storage from the bit and nibble to the terabyte.",
          "Convert denary numbers to octal and hexadecimal and back.",
        ],
      }),
      sub("data-representation.form-4", "8.36", "Form 4: Logic gates and truth tables", {
        covers: ["comp.logic.gates", "comp.logic.truth-tables", "comp.logic.circuits-expressions"],
        objectives: [
          "Represent logic gates using their symbols.",
          "Construct truth tables with up to three inputs.",
          "Model electronic circuits using logic gates.",
        ],
      }),
    ],
  }),
  topic("networks", "6.4", "Communication Networks and Internet Technologies", {
    children: [
      sub("networks.form-1", "8.4", "Form 1: Networking concepts, types of networks, topologies, internet services", {
        covers: ["comp.network.types-topologies", "comp.network.isp-internet-services"],
        objectives: [
          "Outline the concept of a computer network and the LAN and WAN types.",
          "Describe the star, ring, bus and mesh topologies.",
          "Use internet services such as email, e-commerce, e-learning and social media.",
        ],
      }),
      sub("networks.form-2", "8.15", "Form 2: Transmission modes and media, types of networks, internet service providers", {
        covers: ["comp.transmission.methods", "comp.network.transmission-media"],
        objectives: [
          "Describe the simplex, half-duplex and full-duplex transmission modes.",
          "Explain the characteristics of twisted pair, coaxial, fibre-optic and wireless media (cost, noise immunity, size and scalability).",
          "Outline the LAN, WAN, PAN and MAN types of network.",
          "Explain the services offered by internet service providers.",
        ],
      }),
      sub("networks.form-3", "8.26", "Form 3: Mobile technology, wireless technologies, cloud services", {
        covers: ["comp.network.wireless-mobile", "comp.network.cloud"],
        objectives: [
          "Identify types of mobile technology and describe their role in communication.",
          "Explain the applications of Wi-Fi, WiMAX, Bluetooth, infra-red, microwave and radio waves.",
          "Explain the concept of cloud computing services.",
        ],
      }),
      sub("networks.form-4", "8.37", "Form 4: Network protocols and networking devices", {
        covers: ["comp.network.protocols", "comp.network.devices", "comp.network.addressing", "comp.internet.web-browsing"],
        objectives: [
          "Explain network protocols, including TCP/IP and the OSI model.",
          "Explain the functions of hubs, routers, switches, bridges and modems.",
          "Design and configure a network model.",
        ],
      }),
    ],
  }),
  topic("security-ethics", "6.5", "Security and Ethics (Unhu/Ubuntu/Vumunhu)", {
    children: [
      sub("security-ethics.form-1", "8.5", "Form 1: Cyber-wellness; copyright, plagiarism and piracy", {
        covers: ["comp.security.cyber-wellness-ethics", "comp.security.copyright-plagiarism"],
        objectives: [
          "Outline the characteristics of cyber culture and its impact.",
          "Describe the characteristics of safe and unsafe websites.",
          "Suggest the effects of online content and behaviour.",
          "Explain the importance of copyright.",
          "Describe the consequences of plagiarism and piracy.",
        ],
      }),
      sub("security-ethics.form-2", "8.16", "Form 2: Computer crime, data protection measures, computer ethics", {
        covers: ["comp.security.malware", "comp.security.authentication-access"],
        objectives: [
          "Explain computer crime and its effects.",
          "Apply data protection measures such as passwords and file permissions.",
          "Explain the ethical issues that can arise from online activities.",
        ],
      }),
      sub("security-ethics.form-3", "8.27", "Form 3: Privacy and data integrity, system security, cybercrime", {
        covers: ["comp.security.data-privacy", "comp.algorithms.validation-verification", "comp.security.network-defences", "comp.transmission.encryption", "comp.security.cyber-attacks"],
        objectives: [
          "Apply data privacy measures.",
          "Verify and validate data.",
          "Set up a firewall and apply network security measures such as proxy servers, digital signatures and certificates.",
          "Identify online crimes such as spoofing, sniffing, fraud and hacking.",
        ],
      }),
      sub("security-ethics.form-4", "8.38", "Form 4: Data backup and disaster recovery", {
        covers: ["comp.security.backup-recovery"],
        objectives: [
          "Back up files.",
          "Formulate a disaster recovery plan.",
          "Use data recovery tools.",
        ],
      }),
    ],
  }),
  topic("systems-analysis", "6.6", "Systems Analysis and Design", {
    children: [
      sub("systems-analysis.form-1", "8.6", "Form 1: The systems development life cycle; problem identification", {
        covers: ["comp.sad.sdlc-fact-finding"],
        objectives: [
          "Outline the stages of the systems development life cycle.",
          "Identify the problems of an existing system using questionnaires, interviews, record inspection and observation.",
        ],
      }),
      sub("systems-analysis.form-2", "8.17", "Form 2: Feasibility study", {
        covers: ["comp.sad.feasibility"],
        objectives: [
          "Explain the technical, economic, legal, operational and social areas of feasibility.",
          "Carry out a feasibility study.",
        ],
      }),
      sub("systems-analysis.form-3", "8.28", "Form 3: Systems analysis, systems design, development and testing", {
        covers: ["comp.sad.analysis-tools", "comp.sad.system-design", "comp.algorithms.test-data"],
        objectives: [
          "Describe the activities of the analysis stage, including alternative solutions, data flow diagrams and activity diagrams.",
          "Describe the activities of the design stage and design input, output and user interfaces, file structures and tables.",
          "Construct system flowcharts and pseudocode for a project.",
          "Explain the activities of the development and testing stage, including a testing plan.",
        ],
      }),
      sub("systems-analysis.form-4", "8.39", "Form 4: Documentation, user training, implementation, evaluation and maintenance", {
        covers: ["comp.sad.documentation-training", "comp.sad.implementation-maintenance"],
        objectives: [
          "Describe the types of documentation and their contents.",
          "Outline the importance of user training.",
          "Describe the activities of the implementation, evaluation and maintenance stages.",
        ],
      }),
    ],
  }),
  topic("algorithms", "6.7", "Algorithm Design and Problem-solving", {
    children: [
      sub("algorithms.form-1", "8.7", "Form 1: Introduction to algorithm tools; the sequence construct", {
        covers: ["comp.algorithms.algorithm-basics"],
        objectives: [
          "Define an algorithm and explain its purpose.",
          "Explain and apply the sequence construct, including dry-running a sequence algorithm.",
        ],
      }),
      sub("algorithms.form-2", "8.18", "Form 2: Pseudocode structures for selection and repetition", {
        covers: ["comp.prog.selection", "comp.prog.iteration"],
        objectives: [
          "Explain the selection and repetition constructs.",
          "Apply selection and repetition structures to solve problems, and dry-run the algorithms.",
        ],
      }),
      sub("algorithms.form-3", "8.29", "Form 3: Flowcharts, pseudocode, top-down design; interpreting and testing algorithms", {
        covers: ["comp.algorithms.flowcharts", "comp.algorithms.decomposition-pdlc", "comp.algorithms.trace-tables"],
        objectives: [
          "Design flowcharts and construct pseudocode.",
          "Use a top-down approach to break a problem into sub-problems.",
          "Use trace tables to dry-run algorithms.",
          "Correct errors in an algorithm.",
        ],
      }),
      sub("algorithms.form-4", "8.40", "Form 4: Algorithm design", {
        covers: ["comp.algorithms.totalling-counting", "comp.algorithms.search-sort"],
        objectives: ["Design algorithms for a project."],
      }),
    ],
  }),
  topic("programming", "6.8", "Programming", {
    children: [
      sub("programming.form-1", "8.8", "Form 1: Programming concepts", {
        covers: ["comp.prog.variables-data-types", "comp.prog.operators", "comp.prog.maintainable-code"],
        objectives: [
          "Explain the syntax and semantics of a programming language and the structure of a program.",
          "Declare variables and constants of the integer, character, string and Boolean types.",
          "Apply arithmetic, logical and relational operators to solve problems.",
        ],
      }),
      sub("programming.form-2", "8.19", "Form 2: Control structures, functions, testing and debugging", {
        covers: ["comp.prog.subroutines"],
        objectives: [
          "Develop programs that use pseudocode control structures (selection and repetition).",
          "Develop a program using functions.",
          "Test and debug programs.",
        ],
      }),
      sub("programming.form-3", "8.30", "Form 3: Interface design, visual programming, errors", {
        covers: ["comp.prog.gui-oop", "comp.algorithms.errors-debugging"],
        objectives: [
          "Create user interfaces with menus and sub-menus.",
          "Declare functions and use objects in interface design.",
          "Identify types of errors and apply error-handling techniques.",
        ],
      }),
      sub("programming.form-4", "8.41", "Form 4: Coding programs; testing and debugging", {
        covers: ["comp.algorithms.scenario-problems"],
        objectives: [
          "Develop project code using programming concepts.",
          "Test and debug programs.",
        ],
      }),
    ],
  }),
  topic("databases", "6.9", "Databases", {
    children: [
      sub("databases.form-1", "8.9", "Form 1: Database creation; file structure elements; database objects", {
        covers: ["comp.db.table-design", "comp.db.sql"],
        objectives: [
          "Create a database and a file structure (fields, data types, field sizes, formats, validation rules and input masks).",
          "Design forms, reports and queries.",
        ],
      }),
      sub("databases.form-2", "8.20", "Form 2: Database objects; data manipulation; database security", {
        covers: ["comp.db.forms-reports-crud", "comp.db.security"],
        objectives: [
          "Develop databases using datasheets, queries, forms and reports, and edit them.",
          "Perform create, read, update and delete operations, and search, filter and sort records.",
          "Apply database security controls.",
        ],
      }),
      sub("databases.form-3", "8.31", "Form 3: Relational databases; external data sources; database security", {
        covers: ["comp.db.relational-erd"],
        objectives: [
          "Create relational databases.",
          "Design forms, reports and queries on related tables.",
          "Import and export data.",
        ],
      }),
      sub("databases.form-4", "8.42", "Form 4: Advanced queries; database connection; database security", {
        covers: ["comp.db.advanced-queries"],
        objectives: [
          "Create queries based on several tables.",
          "Link a database to project modules.",
          "Apply security measures to a database.",
        ],
      }),
    ],
  }),
  topic("web-design", "6.10", "Web Design", {
    children: [
      sub("web-design.form-1", "8.10", "Form 1: Web page templates; web content development", {
        covers: ["comp.web.html-elements"],
        objectives: [
          "Navigate a web page and customise web pages.",
          "Use web page templates to create web pages and generate web content.",
        ],
      }),
      sub("web-design.form-2", "8.21", "Form 2: Content management systems; testing and debugging; plugins and extensions", {
        covers: ["comp.web.cms-content"],
        objectives: [
          "Use content management system templates to create and customise websites.",
          "Generate content using a graphics design package.",
          "Use plugins and extensions in web development.",
        ],
      }),
      sub("web-design.form-3", "8.32", "Form 3: CMS; graphic design; adverts; web security; plugins and extensions", {
        covers: ["comp.internet.cookies"],
        objectives: [
          "Use web feeds and adverts in a CMS website.",
          "Generate animations and videos with graphic design packages.",
          "Integrate web security, including cookies and developer tools, in web design.",
        ],
      }),
      sub("web-design.form-4", "8.43", "Form 4: Web development; web security; testing and debugging", {
        covers: ["comp.web.security-testing"],
        objectives: [
          "Develop websites using web development tools.",
          "Apply security measures in web development.",
          "Test and debug a web application.",
        ],
      }),
    ],
  }),
  topic("technopreneurship", "6.11", "Technopreneurship", {
    children: [
      sub("technopreneurship.form-1", "8.11", "Form 1: Intellectual capital; business ethics; marketing and business strategies", {
        covers: ["comp.techno.capital-ethics-marketing"],
        objectives: [
          "Describe human, organisational and social capital.",
          "Explain the attributes of business ethics (Unhu/Ubuntu/Vumunhu).",
          "Identify and explain the elements of marketing and business strategies, including e-commerce.",
        ],
      }),
      sub("technopreneurship.form-2", "8.22", "Form 2: Environmental technopreneurship components; innovation and design thinking", {
        covers: ["comp.techno.innovation-ecosystem"],
        objectives: ["Describe science parks, incubation centres, academic institutions and research and development centres as technopreneurship components."],
      }),
      sub("technopreneurship.form-3", "8.33", "Form 3: Laws and policies; intellectual property rights", {
        covers: ["comp.techno.laws-ipr"],
        objectives: [
          "Identify laws that govern technopreneurship.",
          "Describe intellectual property rights such as patents and copyright.",
        ],
      }),
      sub("technopreneurship.form-4", "8.44", "Form 4: Finance and funding; market research", {
        covers: ["comp.techno.finance-market-research"],
        objectives: [
          "Outline sources of finance and funding.",
          "Identify ideal conditions for a business location and conduct market research.",
        ],
      }),
    ],
  }),
];

const zimsec = {
  board: "zimsec",
  qualification: "o-level",
  subject: "computer-science",
  versionLabel: "2015-2022",
  family: "computer-science-o",
  title: "ZIMSEC O-Level Computer Science",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Computer Science Syllabus, Forms 1 - 4, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at O Level",
    url: "https://www.mopsemashwest.gov.zw/files/Computer%20Science%20O%20level%20Syllabus.pdf",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Topic names and numbers (6.1 to 6.11) are transcribed from the topic list (6.0) of the Ministry's Computer Science Syllabus Forms 1 - 4 (2015 - 2022); each topic's sub-topics are the Form 1 to Form 4 rows of the competency matrix (8.0) with the board's numbers (8.1 to 8.44) and the content headings of each row. Objective codes (8.1.1, ...) are ours. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-08): the Mashonaland West provincial education office's copy of the Ministry document, file 'Computer Science O level Syllabus.pdf' (http://www.mopsemashwest.gov.zw/files/Computer%20Science%20O%20level%20Syllabus.pdf; the site's https certificate has expired), read through a text rendering. The document is dated 2015 and covers Forms 1 to 4. The scope-and-sequence chart (7.0) is scrambled in the text rendering (the Programming, Databases, Web design and Technopreneurship rows run into each other); the sub-topics follow the competency matrix, which is legible. Check every heading and objective against a clean copy from ZIMSEC and record the exact document URL.",
    "Subject code: not printed in the syllabus document. ZIMSEC O-Level Computer Science is commonly cited as 4021; confirm it (code left null).",
    "Version dates: assumed first examined in November 2018 (effectiveFrom 2018-01-01), as for the other 2015-2022 files. Under the Heritage-Based Curriculum (2024-2030) new syllabi were issued; confirm which syllabus the November 2026 and later O-Level Computer Science examinations use, set effectiveTo, and create a new version file when a new syllabus replaces this one.",
    "Scheme of assessment (9.2) as read: Paper 1 Multiple Choice (1 hour, 40 compulsory items, 40 marks, 10%); Paper 2 Structured (2 hours, 10-12 compulsory structured questions answered in the spaces provided, 100 marks, 30%); Paper 3 Practical Test (3 hours, 100 marks, 40%) in two options: Option A practical questions on databases, web design and programming, Option B practical questions on hardware and software, data representation, communication and internet technologies and technopreneurship, with pre-release material published before the end of Term 1 of Form 4; the practical exam is marked by the teacher and moderated by ZIMSEC; Paper 4 School-Based Assessment (coursework: 10 assignments, 10 tests and 5 practical assignments from Form 1 Term 2 to Form 4 Term 2, each marked out of 100, 10%); Paper 5 Project (10%): an application in a high-level language (such as Visual Basic or Python) based on a relational database, developed in Form 4 from pre-release material and filed in at most 40 pages.",
    "Specification grid (9.3): the Paper 1 and Paper 2 topic weightings are unreadable in the text rendering (overlapping text); most topics appear to carry 10% with some at 5%. Paper 3 Option B as read: hardware and software 30%, data representation 10%, communication networks and internet technologies 50%, technopreneurship 10%. Paper 3 Option A appears to weight programming 50%, databases 30% and web design 20%, but the figures overlap; confirm both grids and whether candidates take one option or both, against a clean copy. Skills distribution as read: theory assessments 40% knowledge and understanding and 60% problem solving; practical assessments 100% practical skills.",
    "Paper 3 is described as both 'Practical Test' (9.2) and 'Option A / Option B: Practical Exam' (9.5); components 3A and 3B below record the two options as alternatives with the same weighting.",
    "The grade descriptors (9.4) mention content not in the competency matrix: entity-relationship diagrams with cardinality, inheritance, polymorphism and encapsulation in Visual Basic, searching and sorting techniques, and static and dynamic data structures. ERDs, object-oriented ideas in outline and linear search and bubble sort are covered (comp.db.relational-erd, comp.prog.gui-oop, comp.algorithms.search-sort); static and dynamic data structures are not covered by any concept.",
    "Placement decisions: robotics (Form 2) and intelligent systems (Form 3) in Application of Computer Science use the concepts shared with Cambridge (comp.emerging.robotics, comp.emerging.artificial-intelligence); verification and validation are taught under Security and Ethics Form 3 as the syllabus does; testing strategy (Systems Analysis Form 3) uses comp.algorithms.test-data; agriculture, which appears in every form, is covered once with ambient systems and GIS (Form 4); URLs, HTTP and DNS (not named in the syllabus) are covered with network protocols (Form 4); cookies are taught under web security (Form 3). Each concept is covered on exactly one node.",
    "Not in the ZIMSEC syllabus but in the shared registry (Cambridge only): logical shifts, two's complement, sound and image representation, file-size calculation, compression, packets, error-detection methods, the fetch-decode-execute cycle, embedded systems, sensors, interrupts and firmware, translators and IDEs, digital currency, automated systems, string handling, arrays, file handling.",
    "Platform limits: the practical test (Paper 3), the school-based assessment (Paper 4) and the project (Paper 5) cannot be run on the platform. Lessons and written practice cover the skills they assess (pseudocode and Python, database design and SQL, HTML and website planning); mock exams simulate Papers 1 and 2 only.",
  ],
  overview: "ZIMSEC O-Level Computer Science (Forms 1 to 4) covers eleven topics, each taught across the four forms: hardware and software, applications of computer science, data representation and logic gates, communication networks and internet technologies, security and ethics (Unhu/Ubuntu/Vumunhu), systems analysis and design, algorithm design and problem-solving, programming, databases, web design and technopreneurship. It is a practical subject: about two thirds of class time is practical work.",
  assessmentOverview: "Five papers: Paper 1 multiple choice (1 hour, 40 marks, 10%), Paper 2 structured questions (2 hours, 100 marks, 30%), Paper 3 practical test (3 hours, 100 marks, 40%; Option A databases, web design and programming, Option B hardware and software, data representation, networks and technopreneurship), Paper 4 school-based coursework (10%) and Paper 5 a programming project with a relational database (10%).",
  components: [
    { code: "1", name: "Paper 1: Multiple Choice", kind: "MULTIPLE_CHOICE", description: "40 compulsory multiple-choice items on the whole syllabus.", durationMinutes: 60, maxMarks: 40, weightingPercent: 10 },
    { code: "2", name: "Paper 2: Structured", kind: "WRITTEN", description: "10 to 12 compulsory structured questions on the whole syllabus, answered in the spaces provided.", durationMinutes: 120, maxMarks: 100, weightingPercent: 30 },
    { code: "3A", name: "Paper 3 Option A: Practical Exam (databases, web design, programming)", kind: "PRACTICAL", description: "Practical questions on databases, web design and programming, marked by the teacher and moderated by ZIMSEC.", durationMinutes: 180, maxMarks: 100, weightingPercent: 40 },
    { code: "3B", name: "Paper 3 Option B: Practical Exam (hardware, data, networks, technopreneurship)", kind: "PRACTICAL", description: "Practical questions on hardware and software, data representation, communication and internet technologies and technopreneurship, with pre-release material.", durationMinutes: 180, maxMarks: 100, weightingPercent: 40 },
    { code: "4", name: "Paper 4: School-Based Assessment", kind: "COURSEWORK", description: "10 assignments, 10 tests and 5 practical assignments set and marked by the teacher from Form 1 to Form 4.", maxMarks: 100, weightingPercent: 10 },
    { code: "5", name: "Paper 5: Project", kind: "PROJECT", description: "A program in a high-level language based on a relational database, developed in Form 4 from pre-release material.", maxMarks: 100, weightingPercent: 10 },
  ],
  topics: ZIMSEC_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Cambridge IGCSE Computer Science 0478, 2026-2028 (version 6). Topic and subtopic numbers are the board's; objective
// codes are the subtopic code plus the board's statement number and letter (topics 7, 9 and 10 have no subtopics, so
// their codes are topic.statement).
const P1 = ["1"];
const P2 = ["2"];
const CAMBRIDGE_TOPICS = [
  topic("data-representation", "1", "Data representation", {
    components: P1,
    children: [
      sub("data-representation.number-systems", "1.1", "Number systems", {
        covers: ["comp.data.number-systems", "comp.data.binary-denary", "comp.data.hexadecimal", "comp.data.binary-addition", "comp.data.logical-shifts", "comp.data.twos-complement"],
        objectives: [
          ["1.1.1", "Understand how and why computers use binary to represent all forms of data."],
          ["1.1.2a", "Understand the denary, binary and hexadecimal number systems."],
          ["1.1.2b", "Convert positive integers (up to 16 bits) between denary and binary, denary and hexadecimal, and hexadecimal and binary."],
          ["1.1.3", "Explain why hexadecimal is a useful representation and identify where it is used."],
          ["1.1.4a", "Add two positive 8-bit binary integers."],
          ["1.1.4b", "Explain overflow and why it happens in binary addition."],
          ["1.1.5", "Carry out single and multiple logical shifts on a positive 8-bit integer and describe their effect."],
          ["1.1.6", "Represent positive and negative 8-bit integers in two's complement and convert to and from it."],
        ],
      }),
      sub("data-representation.text-sound-images", "1.2", "Text, sound and images", {
        covers: ["comp.data.text-character-sets", "comp.data.sound-images"],
        objectives: [
          ["1.2.1", "Explain how text is represented using character sets, including ASCII and Unicode."],
          ["1.2.2", "Explain how sound is represented and the effect of sample rate and sample resolution."],
          ["1.2.3", "Explain how images are represented and the effect of resolution and colour depth."],
        ],
      }),
      sub("data-representation.storage-compression", "1.3", "Data storage and compression", {
        covers: ["comp.data.storage-units", "comp.data.file-size", "comp.data.compression"],
        objectives: [
          ["1.3.1", "Use the units of data storage from the bit to the exbibyte, with 1024 between units."],
          ["1.3.2", "Calculate the file size of an image file and a sound file from given information."],
          ["1.3.3", "Explain the purpose of and need for data compression."],
          ["1.3.4", "Explain how lossy and lossless compression (including run-length encoding) reduce file size."],
        ],
      }),
    ],
  }),
  topic("data-transmission", "2", "Data transmission", {
    components: P1,
    children: [
      sub("data-transmission.types-methods", "2.1", "Types and methods of data transmission", {
        covers: ["comp.transmission.packets", "comp.transmission.methods", "comp.hardware.ports-usb"],
        objectives: [
          ["2.1.1a", "Understand that data is split into packets for transmission."],
          ["2.1.1b", "Describe the structure of a packet: header, payload and trailer."],
          ["2.1.1c", "Describe packet switching."],
          ["2.1.2a", "Describe serial, parallel, simplex, half-duplex and full-duplex transmission."],
          ["2.1.2b", "Explain which transmission method suits a given scenario."],
          ["2.1.3", "Explain how the USB interface transmits data, with its benefits and drawbacks."],
        ],
      }),
      sub("data-transmission.error-detection", "2.2", "Methods of error detection", {
        covers: ["comp.transmission.error-detection"],
        objectives: [
          ["2.2.1", "Explain why data is checked for errors after transmission and how errors occur."],
          ["2.2.2", "Describe parity checks (odd and even, parity byte and parity block), checksums and echo checks."],
          ["2.2.3", "Describe how a check digit detects data-entry errors, with examples such as ISBNs and bar codes."],
          ["2.2.4", "Describe how an automatic repeat query uses acknowledgements and timeouts."],
        ],
      }),
      sub("data-transmission.encryption", "2.3", "Encryption", {
        covers: ["comp.transmission.encryption"],
        objectives: [
          ["2.3.1", "Explain why data is encrypted when it is transmitted."],
          ["2.3.2", "Explain symmetric and asymmetric encryption, including public and private keys."],
        ],
      }),
    ],
  }),
  topic("hardware", "3", "Hardware", {
    components: P1,
    children: [
      sub("hardware.architecture", "3.1", "Computer architecture", {
        covers: ["comp.hardware.cpu", "comp.hardware.fetch-execute", "comp.hardware.embedded-systems"],
        objectives: [
          ["3.1.1a", "Explain the role of the CPU."],
          ["3.1.1b", "Explain what a microprocessor is."],
          ["3.1.2a", "Explain the purpose of the units, registers and buses of a Von Neumann CPU."],
          ["3.1.2b", "Describe the fetch-decode-execute cycle and the part each component plays."],
          ["3.1.3", "Explain how cores, cache and the clock affect CPU performance."],
          ["3.1.4", "Explain the purpose of an instruction set."],
          ["3.1.5", "Describe embedded systems and identify devices that use them."],
        ],
      }),
      sub("hardware.input-output", "3.2", "Input and output devices", {
        covers: ["comp.hardware.input-devices", "comp.hardware.output-devices", "comp.hardware.sensors"],
        objectives: [
          ["3.2.1", "Explain what an input device is and why it is needed."],
          ["3.2.2", "Explain what an output device is and why it is needed."],
          ["3.2.3a", "Explain what a sensor is and what sensors are used for."],
          ["3.2.3b", "Identify the data each sensor captures and choose the most suitable sensor for a context."],
        ],
      }),
      sub("hardware.data-storage", "3.3", "Data storage", {
        covers: ["comp.hardware.primary-storage", "comp.hardware.secondary-storage", "comp.network.cloud"],
        objectives: [
          ["3.3.1", "Explain primary storage, including the roles of RAM and ROM."],
          ["3.3.2", "Explain secondary storage."],
          ["3.3.3", "Describe how magnetic, optical and solid-state storage work, with examples."],
          ["3.3.4", "Describe virtual memory: how it is created and used and why it is needed."],
          ["3.3.5", "Explain cloud storage."],
          ["3.3.6", "Compare storing data in the cloud with storing it locally."],
        ],
      }),
      sub("hardware.network-hardware", "3.4", "Network hardware", {
        covers: ["comp.network.devices", "comp.network.addressing"],
        objectives: [
          ["3.4.1", "Explain why a computer needs a network interface card to access a network."],
          ["3.4.2", "Explain the purpose and structure of a MAC address."],
          ["3.4.3a", "Explain the purpose of an IP address."],
          ["3.4.3b", "Compare static and dynamic addresses and IPv4 and IPv6."],
          ["3.4.4", "Describe the role of a router in a network."],
        ],
      }),
    ],
  }),
  topic("software", "4", "Software", {
    components: P1,
    children: [
      sub("software.types-interrupts", "4.1", "Types of software and interrupts", {
        covers: ["comp.software.system-application", "comp.software.operating-systems", "comp.software.interrupts-firmware"],
        objectives: [
          ["4.1.1", "Distinguish system software from application software, with examples."],
          ["4.1.2", "Describe the role and basic functions of an operating system."],
          ["4.1.3", "Explain how hardware, firmware and an operating system are needed to run applications."],
          ["4.1.4", "Describe how interrupts are generated and handled, and their effect."],
        ],
      }),
      sub("software.languages-translators", "4.2", "Types of programming language, translators and integrated development environments (IDEs)", {
        covers: ["comp.software.languages-translators"],
        objectives: [
          ["4.2.1", "Explain high-level and low-level languages and the advantages and disadvantages of each."],
          ["4.2.2", "Explain that assembly language uses mnemonics and needs an assembler."],
          ["4.2.3", "Describe how a compiler and an interpreter translate code and report errors."],
          ["4.2.4", "Explain the advantages and disadvantages of compilers and interpreters."],
          ["4.2.5", "Explain the role and common functions of an IDE."],
        ],
      }),
    ],
  }),
  topic("internet", "5", "The internet and its uses", {
    components: P1,
    children: [
      sub("internet.www", "5.1", "The internet and the world wide web", {
        covers: ["comp.internet.web-browsing", "comp.internet.cookies"],
        objectives: [
          ["5.1.1", "Distinguish the internet from the world wide web."],
          ["5.1.2", "Explain what a URL is and its parts."],
          ["5.1.3", "Describe the purpose and operation of HTTP and HTTPS."],
          ["5.1.4", "Explain the purpose and functions of a web browser."],
          ["5.1.5", "Describe how a web page is located, retrieved and displayed when a URL is entered."],
          ["5.1.6", "Explain session and persistent cookies and how cookies are used."],
        ],
      }),
      sub("internet.digital-currency", "5.2", "Digital currency", {
        covers: ["comp.internet.digital-currency"],
        objectives: [
          ["5.2.1", "Explain what a digital currency is and how it is used."],
          ["5.2.2", "Explain how blockchain tracks digital currency transactions."],
        ],
      }),
      sub("internet.cyber-security", "5.3", "Cyber security", {
        covers: ["comp.security.malware", "comp.security.cyber-attacks", "comp.security.authentication-access", "comp.security.network-defences"],
        objectives: [
          ["5.3.1", "Describe how a range of cyber security threats are carried out and what they aim to do."],
          ["5.3.2", "Explain how a range of solutions help keep data safe from these threats."],
        ],
      }),
    ],
  }),
  topic("automated-emerging", "6", "Automated and emerging technologies", {
    components: P1,
    children: [
      sub("automated-emerging.automated-systems", "6.1", "Automated systems", {
        covers: ["comp.emerging.automated-systems"],
        objectives: [
          ["6.1.1", "Describe how sensors, microprocessors and actuators work together in automated systems."],
          ["6.1.2", "Describe the advantages and disadvantages of an automated system in a given scenario."],
        ],
      }),
      sub("automated-emerging.robotics", "6.2", "Robotics", {
        covers: ["comp.emerging.robotics"],
        objectives: [
          ["6.2.1", "Explain what robotics is."],
          ["6.2.2", "Describe the characteristics of a robot."],
          ["6.2.3", "Describe the roles of robots and the advantages and disadvantages of their use."],
        ],
      }),
      sub("automated-emerging.ai", "6.3", "Artificial intelligence", {
        covers: ["comp.emerging.artificial-intelligence"],
        objectives: [
          ["6.3.1", "Explain what artificial intelligence is."],
          ["6.3.2", "Describe the main characteristics of AI: data and rules, reasoning, and learning and adapting."],
          ["6.3.3", "Explain the basic operation and components of expert systems and machine learning."],
        ],
      }),
    ],
  }),
  topic("algorithm-design", "7", "Algorithm design and problem-solving", {
    components: P2,
    covers: [
      "comp.algorithms.decomposition-pdlc", "comp.algorithms.algorithm-basics", "comp.algorithms.flowcharts", "comp.algorithms.totalling-counting",
      "comp.algorithms.search-sort", "comp.algorithms.validation-verification", "comp.algorithms.test-data", "comp.algorithms.trace-tables",
      "comp.algorithms.errors-debugging", "comp.algorithms.scenario-problems",
    ],
    objectives: [
      ["7.1", "Identify the stages of the program development life cycle (analysis, design, coding, testing) and the tasks in each."],
      ["7.2a", "Understand that a computer system is made of sub-systems."],
      ["7.2b", "Decompose a problem into its component parts (inputs, processes, outputs, storage)."],
      ["7.2c", "Design solutions with structure diagrams, flowcharts and pseudocode."],
      ["7.3", "State the purpose of a given algorithm and describe its processes."],
      ["7.4", "Use the standard methods: linear search, bubble sort, totalling, counting, and maximum, minimum and average."],
      ["7.5a", "Explain the need for validation and use range, length, type, presence, format and check-digit checks."],
      ["7.5b", "Explain the need for verification and use visual and double-entry checks."],
      ["7.6", "Suggest and apply normal, abnormal, extreme and boundary test data."],
      ["7.7", "Complete a trace table for a dry run of an algorithm."],
      ["7.8", "Identify errors in an algorithm and suggest corrections."],
      ["7.9", "Write and amend algorithms in pseudocode, program code and flowcharts for given problems."],
    ],
  }),
  topic("programming", "8", "Programming", {
    components: P2,
    children: [
      sub("programming.concepts", "8.1", "Programming concepts", {
        covers: ["comp.prog.variables-data-types", "comp.prog.operators", "comp.prog.selection", "comp.prog.iteration", "comp.prog.string-handling", "comp.prog.subroutines", "comp.prog.maintainable-code"],
        objectives: [
          ["8.1.1", "Declare and use variables and constants."],
          ["8.1.2", "Use the integer, real, char, string and Boolean data types."],
          ["8.1.3", "Use input and output."],
          ["8.1.4a", "Use sequence."],
          ["8.1.4b", "Use selection with IF and CASE statements."],
          ["8.1.4c", "Use count-controlled, pre-condition and post-condition loops."],
          ["8.1.4d", "Use totalling and counting."],
          ["8.1.4e", "Use string handling: length, substring, upper and lower case."],
          ["8.1.4f", "Use arithmetic, relational and logical operators."],
          ["8.1.5", "Use nested selection and iteration (up to three levels)."],
          ["8.1.6a", "Explain procedures, functions and parameters."],
          ["8.1.6b", "Define and use procedures and functions with or without parameters (up to three)."],
          ["8.1.6c", "Use local and global variables."],
          ["8.1.7", "Use the library routines MOD, DIV, ROUND and RANDOM."],
          ["8.1.8", "Create maintainable programs with meaningful identifiers, comments, procedures and functions."],
        ],
      }),
      sub("programming.arrays", "8.2", "Arrays", {
        covers: ["comp.prog.arrays-1d", "comp.prog.arrays-2d"],
        objectives: [
          ["8.2.1", "Declare and use one-dimensional and two-dimensional arrays."],
          ["8.2.2", "Explain the use of arrays."],
          ["8.2.3", "Write values into and read values from an array using iteration, including nested iteration."],
        ],
      }),
      sub("programming.file-handling", "8.3", "File handling", {
        covers: ["comp.prog.file-handling"],
        objectives: [
          ["8.3.1", "Explain why programs store data in files."],
          ["8.3.2", "Open, close, read from and write to a file (single items and lines of text)."],
        ],
      }),
    ],
  }),
  topic("databases", "9", "Databases", {
    components: P2,
    covers: ["comp.db.table-design", "comp.db.sql"],
    objectives: [
      ["9.1", "Define a single-table database (fields, records, validation) from given requirements."],
      ["9.2", "Suggest suitable basic data types for fields."],
      ["9.3", "Explain the purpose of a primary key and choose a suitable one."],
      ["9.4", "Read, complete and write SQL scripts that query a single table (SELECT, FROM, WHERE, ORDER BY, SUM, COUNT, AND, OR) and state their output."],
    ],
  }),
  topic("boolean-logic", "10", "Boolean logic", {
    components: P2,
    covers: ["comp.logic.gates", "comp.logic.truth-tables", "comp.logic.circuits-expressions"],
    objectives: [
      ["10.1", "Identify and use the standard symbols for the NOT, AND, OR, NAND, NOR and XOR gates."],
      ["10.2", "Define the function of each logic gate and its output for every input combination."],
      ["10.3a", "Create a logic circuit from a problem statement, a logic expression or a truth table."],
      ["10.3b", "Complete a truth table from a problem statement, a logic expression or a logic circuit."],
      ["10.3c", "Write a logic expression from a problem statement, a logic circuit or a truth table."],
    ],
  }),
];

const c0478 = {
  board: "cambridge",
  qualification: "igcse",
  subject: "computer-science",
  versionLabel: "2026-2028",
  family: "computer-science-o",
  title: "Cambridge IGCSE Computer Science (0478)",
  code: "0478",
  effectiveFrom: "2026-01-01",
  effectiveTo: "2028-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge IGCSE Computer Science 0478 syllabus for 2026, 2027 and 2028 (version 6, September 2026)",
    url: "https://www.cambridgeinternational.org/Images/697167-2026-2028-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Topic and subtopic headings and their numbering (1 to 10, 1.1 to 8.3) are transcribed from the subject content of the official syllabus. Objective codes are the board's statement numbers (subtopic or topic code plus the statement number and letter, e.g. 1.1.4b, 7.5a). Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Read on 2026-10-08: the syllabus for examination in 2026, 2027 and 2028 (the cover says version 6; the back-page copyright line still reads September 2023) and the separate syllabus update notice for version 6 (September 2026). The update lists the changes since version 1: v6 (September 2026) updated the description of the ROUND library routine (it rounds a real value or expression to a given number of decimal places; ROUND(RANDOM() * 6, 0) gives a whole number from 0 to 6, and RANDOM() returns a number between 0 and 1 inclusive); v5 changed a web link only; v4 updated operator names and allowed procedures and functions up to three parameters; v3 updated operator names; v2 clarified that Paper 2 solutions involving code must be in pseudocode, except the 15-mark scenario question, which may be answered in pseudocode, Python, Visual Basic or Java. The text read already contains these changes; objectives 8.1.6b and 8.1.7 and the components below reflect them.",
    "Assessment as read: all candidates take Paper 1 Computer Systems (1 hour 45 minutes, 75 marks, 50%: short-answer and structured questions on topics 1-6) and Paper 2 Algorithms, Programming and Logic (1 hour 45 minutes, 75 marks, 50%: short-answer and structured questions on topics 7-10, ending with a 15-mark unseen scenario question of about 30 minutes in which candidates write an algorithm in pseudocode or program code). All questions are compulsory; calculators are not allowed in either paper; grades A* to G. Assessment objectives: AO1 40%, AO2 40%, AO3 20% overall (Paper 1 60/20/20, Paper 2 20/60/20).",
    "Section 4 of the syllabus sets the flowchart symbols, logic gate symbols and pseudocode conventions used in the examination (assignment with a left arrow, upper-case keywords, Pascal-case identifiers, DECLARE, CONSTANT, IF ... THEN ... ELSE ... ENDIF, CASE OF ... OTHERWISE ... ENDCASE, FOR ... NEXT, WHILE ... ENDWHILE, REPEAT ... UNTIL, PROCEDURE/FUNCTION with RETURNS, OPENFILE/READFILE/WRITEFILE/CLOSEFILE). The platform shows no symbol images: content describes gates and flowcharts in words or tables and writes pseudocode in those conventions.",
    "Mathematical requirements as read: arithmetic, averages, random numbers, decimals, fractions, percentages and ratios, positive and negative integers and real numbers, number systems, counting, totalling and rounding, all without a calculator.",
    "Sharing with ZIMSEC: concepts shared with the ZIMSEC syllabus are taught at Cambridge depth; ZIMSEC-only concepts (octal, binary subtraction, networks and topologies, applications, systems analysis, web design, technopreneurship and others) are not covered by this file.",
  ],
  overview: "Cambridge IGCSE Computer Science has two halves. Computer systems (topics 1-6): data representation, data transmission, hardware, software, the internet and its uses, and automated and emerging technologies. Algorithms, programming and logic (topics 7-10): algorithm design and problem-solving, programming in pseudocode, databases and SQL, and Boolean logic. Learners are expected to write, run, test and debug their own programs.",
  assessmentOverview: "Two compulsory written papers, each 1 hour 45 minutes, 75 marks and 50%, no calculators: Paper 1 Computer Systems (topics 1-6) and Paper 2 Algorithms, Programming and Logic (topics 7-10), which ends with a 15-mark scenario question answered in pseudocode, Python, Visual Basic or Java.",
  components: [
    { code: "1", name: "Paper 1: Computer Systems", kind: "WRITTEN", description: "Compulsory short-answer and structured questions on topics 1-6.", durationMinutes: 105, maxMarks: 75, weightingPercent: 50, calculatorAllowed: false },
    { code: "2", name: "Paper 2: Algorithms, Programming and Logic", kind: "WRITTEN", description: "Compulsory short-answer and structured questions on topics 7-10, ending with a 15-mark unseen scenario question (pseudocode or Python, Visual Basic or Java).", durationMinutes: 105, maxMarks: 75, weightingPercent: 50, calculatorAllowed: false },
  ],
  topics: CAMBRIDGE_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Checks: every covered concept exists, each concept is covered at most once per syllabus, objective codes are unique,
// every concept is covered by at least one syllabus; report what each syllabus leaves out.
const coveredAnywhere = new Set();
for (const s of [zimsec, c0478]) {
  const seen = new Map();
  const codes = new Set();
  const keys = new Set();
  let nodes = 0;
  const walk = (list) => {
    for (const n of list) {
      nodes++;
      if (keys.has(n.key)) throw new Error(`${s.subject}/${s.versionLabel}: duplicate node key ${n.key}`);
      keys.add(n.key);
      for (const c of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(c)) throw new Error(`${s.board}/${s.versionLabel}: unknown concept ${c} on ${n.key}`);
        if (seen.has(c)) throw new Error(`${s.board}/${s.versionLabel}: ${c} covered on ${seen.get(c)} and ${n.key}`);
        seen.set(c, n.key);
        coveredAnywhere.add(c);
      }
      for (const o of n.objectives ?? []) {
        if (codes.has(o.code)) throw new Error(`${s.board}: duplicate objective code ${o.code}`);
        codes.add(o.code);
      }
      walk(n.children ?? []);
    }
  };
  walk(s.topics);
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${s.topics.length} topics, ${nodes} nodes, ${codes.size} objectives, ${seen.size}/${CONCEPT_KEYS.size} concepts covered`);
  console.log(`  not covered (${missing.length}): ${missing.join(", ") || "none"}`);
}
const orphans = [...CONCEPT_KEYS].filter((k) => !coveredAnywhere.has(k));
if (orphans.length) throw new Error(`concepts no syllabus covers: ${orphans.join(", ")}`);

const registry = {
  family: "computer-science-o",
  name: "Computer Science (O-Level / IGCSE)",
  level: "O",
  prefix: "comp",
  subjects: ["zimsec/o-level/computer-science", "cambridge/igcse/computer-science"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description })),
};

const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/computer-science-o.json", registry);
write("content/syllabi/zimsec/o-level/computer-science/2015-2022.json", zimsec);
write("content/syllabi/cambridge/igcse/computer-science/2026-2028.json", c0478);
console.log(`${CONCEPTS.length} concepts`);
