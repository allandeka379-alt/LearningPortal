// Slice w2b: ZIMSEC Paper 2 exam-format items (STRUCTURED, 10 marks, ANALYSIS, ZIMSEC only).
import { concept, P, ZIM } from "../lib.mjs";

const C = (k) => `comp.${k}`;
const fence = (s) => "```\n" + s + "\n```";
const every = 20; // minutes between collar positions
const perDay = (24 * 60) / every;

concept(C("software.operating-systems"), { file: "exam/w2b-zimsec", keyPrefix: "exam.w2b-zimsec", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900,
    concepts: [C("software.system-application"), C("software.application-sourcing"), C("software.operating-systems")],
    hints: ["System software serves the computer; application software serves the user.", "Bespoke software suits unique needs."],
    stem: "This question is about software. The accounts office of Chitungwiza Technical College (fictional) is replacing its computers.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which utility rearranges the parts of files on a magnetic hard disk so they are stored together?", options: [["Disk defragmenter", "Correct."], ["Disk clean-up", "Deletes unwanted files."], ["Backup software", "Copies files elsewhere."], ["File manager", "Organises folders and files for the user."]], answer: "A", explanation: "Defragmenting stores each file in one continuous area." }),
      P.match({ label: "(b)", stem: "Classify each program installed on the new computers.", pairs: ["Payroll package", "Printer driver", "Operating system", "Spreadsheet"], right: ["System software", "Application software"], rightIndex: [1, 0, 0, 1], explanation: "Payroll and spreadsheet: application; driver and OS: system." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe **two** functions of the operating system.", points: ["A named function with a description (e.g. memory management: allocates RAM to programs)", "A second named function with a description (e.g. file management / peripherals / security and user accounts / multitasking)"], modelAnswer: "It manages memory, giving each program its own area of RAM, and it manages user accounts, so each clerk logs in with a password and sees only permitted files." }),
      P.manual({ label: "(d)", marks: 1, stem: "The bursar also uses a smartphone. State **one** difference between a mobile operating system and a personal computer operating system.", points: ["e.g. mobile is touch-based whereas PC uses mouse and keyboard / mobile manages battery strictly / apps from an app store"], modelAnswer: "A mobile OS is controlled by touch, whereas a PC OS is used mainly with a mouse and keyboard." }),
      P.manual({ label: "(e)", marks: 2, stem: "The college's fee rules are unusual and no package handles them. Recommend a type of application software and justify your choice.", points: ["Recommends customised (bespoke) software", "Justification: written to fit the college's unique fee rules exactly / can be changed as rules change"], modelAnswer: "Customised software, because it can be written to follow the college's unusual fee rules exactly, which no off-the-shelf package does." }),
    ],
    explanation: "(a) defragmenter; (b) payroll and spreadsheet application, driver and OS system; (e) bespoke software for unique needs.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900,
    concepts: [C("applications.banking-education-social"), C("applications.transport-health-environment"), C("applications.industry-mining-wildlife"), C("applications.agriculture-ambient-gis")],
    hints: ["Link each system to its sector.", "Irrigation control follows read → compare → act → repeat."],
    stem: "This question is about how computers are applied in different sectors of the Zimbabwean economy.",
    parts: [
      P.mcq({ label: "(a)", stem: "A customer withdraws cash from an ATM. Where is the balance of the account checked?", options: [["On the bank's central computer", "Correct."], ["On the bank card's chip", "The card identifies the account."], ["In the cash dispenser", "It only releases notes."], ["On the receipt printer", "Prints the result."]], answer: "A", explanation: "The ATM sends a request to the bank's computer." }),
      P.match({ label: "(b)", stem: "Match each system to the sector in which it is used.", pairs: ["GPS collars on elephants", "Soil-moisture sensors controlling pumps", "Electronic patient records", "Gas sensors controlling ventilation fans underground"], right: ["Wildlife management", "Agriculture", "Health", "Mining"], rightIndex: [0, 1, 2, 3], explanation: "Collars: wildlife; moisture sensors: agriculture; records: health; gas sensors: mining." }),
      P.num({ label: "(c)", stem: `A tracking collar sends a position every ${every} minutes. How many positions does it send in one day?`, value: perDay, wrong: [24], explanation: `${24 * 60} ÷ ${every} = ${perDay}.`, workedSolution: `1. Minutes in a day: 24 × 60 = ${24 * 60}.\n2. Positions: ${24 * 60} ÷ ${every} = ${perDay}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe how a computer-controlled irrigation system decides when to water a crop.", points: ["Soil-moisture sensors send readings to the computer, which compares them with a stored minimum value", "If below the minimum, the pump / valve is switched on (off when moist enough); the process repeats continuously"], modelAnswer: "Moisture sensors send readings to the computer, which compares each with the stored minimum. If the soil is drier than the minimum it switches the pump on, and off again when the soil is moist enough, checking continuously." }),
      P.manual({ label: "(e)", marks: 2, stem: "Give **one** benefit and **one** drawback of electronic patient records at a district hospital.", points: ["Benefit: found instantly / shared between departments / backed up", "Drawback: sensitive data could be hacked or seen by unauthorised staff / power or system failure / cost"], modelAnswer: "Records can be found and shared instantly, but sensitive patient data could be accessed by hackers or unauthorised staff." }),
    ],
    explanation: `(a) bank's computer; (b) wildlife, agriculture, health, mining; (c) ${perDay}.`,
  });

  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900,
    concepts: [C("emerging.robotics"), C("emerging.artificial-intelligence")],
    hints: ["Sensors gather data, actuators move, the frame is the structure.", "Knowledge base stores facts; inference engine reasons."],
    stem: "This question is about robotics and intelligent systems used on a large farm near Chinhoyi.",
    parts: [
      P.mcq({ label: "(a)", stem: "What is robotics?", options: [["The design, construction and operation of robots", "Correct."], ["The simulation of intelligent behaviour by computers", "That is AI."], ["Controlling a process with sensors only", "Incomplete; that is automation."], ["Writing programs in assembly language", "Low-level programming."]], answer: "A", explanation: "Robotics deals with designing, building and operating robots." }),
      P.match({ label: "(b)", stem: "The farm uses a crop-spraying drone. Classify each of its parts.", pairs: ["Camera", "Spray pump", "Propeller motors", "Carbon-fibre frame"], right: ["Sensor", "Actuator", "Mechanical structure"], rightIndex: [0, 1, 1, 2], explanation: "Camera: sensor; pump and motors: actuators; frame: structure." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **one** advantage and **one** disadvantage of using harvesting robots on the farm.", points: ["Advantage: work long hours / consistent / fewer wages over time", "Disadvantage: expensive / job losses for seasonal workers / cannot cope with unexpected conditions"], modelAnswer: "They can harvest day and night during the short season, but they are expensive and seasonal workers lose income." }),
      P.fib({ label: "(d)", stem: "The farm manager uses an expert system to identify crop diseases. Complete the sentences.", template: "The facts about diseases are stored in the {{blank:a}}. The part that applies the rules to the manager's answers is the {{blank:b}}.", blanks: [{ id: "a", accepted: ["knowledge base"], choices: ["knowledge base", "inference engine", "interface", "actuator"] }, { id: "b", accepted: ["inference engine"], choices: ["inference engine", "knowledge base", "rule base", "sensor"] }], explanation: "Knowledge base; inference engine." }),
      P.manual({ label: "(e)", marks: 1, stem: "State what is meant by machine learning.", points: ["A program automatically adapts its own processes / data from experience without being reprogrammed"], modelAnswer: "A program that improves by automatically adapting its own processes or data from experience." }),
    ],
    explanation: "(a) design, construction, operation; (b) sensor, actuator, actuator, structure; (d) knowledge base, inference engine.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900,
    concepts: [C("web.html-elements"), C("web.cms-content"), C("web.security-testing")],
    hints: ["`src` names the image file; `href` names the linked page.", "Theme = look; plugin = feature."],
    stem: `This question is about web page design. Study this HTML from a school website.\n\n${fence(`<html>
  <head>
    <title>Gweru Debating Society</title>
  </head>
  <body>
    <h1>Next debate</h1>
    <p>Friday in the main hall.</p>
    <img src="hall.jpg" alt="The main hall">
    <a href="members.html">Members</a>
  </body>
</html>`)}`,
    parts: [
      P.mcq({ label: "(a)", stem: "Where does the text *Gweru Debating Society* appear?", options: [["On the browser tab", "Correct."], ["As the main heading on the page", "That is the h1 text."], ["As a link", "Links use the a tag."], ["Under the image", "Not specified."]], answer: "A", explanation: "`<title>` sets the browser-tab text." }),
      P.short({ label: "(b)", stem: "State the name of the file that opens when *Members* is clicked.", accepted: ["members.html"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["hall.jpg"], explanation: "`href=\"members.html\"`." }),
      P.fib({ label: "(c)", stem: "Complete the HTML so that the word *Friday* is bold.\n\n```\n<p>[1]Friday[2] in the main hall.</p>\n```", template: "[1]: {{blank:a}} [2]: {{blank:b}}", blanks: [{ id: "a", accepted: ["<b>"], choices: ["<b>", "</b>", "<br>", "<a>"] }, { id: "b", accepted: ["</b>"], choices: ["</b>", "<b>", "</p>", "<br>"] }], explanation: "`<p><b>Friday</b> in the main hall.</p>`." }),
      P.tf({ label: "(d)", stem: "True or false: the `alt` text is shown if `hall.jpg` cannot be loaded.", answer: true, explanation: "True." }),
      P.manual({ label: "(e)", marks: 2, stem: "The site is moved to a content management system. Explain the difference between a theme and a plugin.", points: ["A theme controls how the site looks (layout, colours, fonts)", "A plugin adds a feature / function (e.g. a contact form, gallery)"], modelAnswer: "A theme controls the site's layout, colours and fonts; a plugin adds a new feature such as a photo gallery." }),
      P.manual({ label: "(f)", marks: 2, stem: "Describe **two** security measures for the website, with a reason for each.", points: ["A measure with a reason (e.g. HTTPS so data is encrypted in transit)", "A second measure with a reason (e.g. strong admin password / updates / validation / backups)"], modelAnswer: "Use HTTPS so that members' details are encrypted when sent, and keep the CMS and plugins updated so known weaknesses are fixed." }),
      P.manual({ label: "(g)", marks: 1, stem: "State **one** test that should be carried out before the site is published.", points: ["e.g. click every link / test forms with normal, abnormal and boundary data / view on phones and in different browsers"], modelAnswer: "Click every link to check that none is broken." }),
    ],
    explanation: "(a) browser tab; (b) members.html; (c) `<b>` and `</b>`; (d) true.",
  });
});
