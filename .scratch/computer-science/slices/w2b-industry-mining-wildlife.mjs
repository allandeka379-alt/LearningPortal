// Slice w2b: computers in manufacturing, mining and wildlife management (comp.applications.industry-mining-wildlife, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const every = 30; // minutes between collar fixes
const fixesPerDay = (24 * 60) / every;
const elephants = 8;

concept("comp.applications.industry-mining-wildlife", { file: "applications/industry-mining-wildlife", keyPrefix: "applications.industry-mining-wildlife" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **CAD** stand for?",
    options: [
      ["Computer-aided design", "Correct: designing products with computer software."],
      ["Computer-aided delivery", "Not the meaning of CAD."],
      ["Central automatic drilling", "Not the meaning of CAD."],
      ["Computer and data", "Not the meaning of CAD."],
    ],
    answer: "A",
    explanation: "CAD: computer-aided design. CAM: computer-aided manufacturing.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which device is fitted to an elephant so that rangers can follow its movements?",
    options: [
      ["A GPS tracking collar", "Correct: it sends the animal's position regularly."],
      ["A barcode tag", "Barcodes must be scanned close up."],
      ["A CNC controller", "CNC controls machine tools."],
      ["A magnetic stripe card", "Cards are used for payments and access."],
    ],
    answer: "A",
    explanation: "Tracking collars contain a GPS receiver and a transmitter.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In CAD/CAM, what happens to the CAD design file?",
    options: [
      ["It is converted into instructions that control CNC machines to make the part", "Correct: design and manufacture are linked."],
      ["It is printed and given to the workers, who cut each part by hand", "That is not computer-aided manufacturing."],
      ["It is deleted once the part has been drawn", "The design is used to make the part."],
      ["It is posted on a social network so that customers can approve it", "Not part of CAD/CAM."],
    ],
    answer: "A",
    explanation: "CAM machines work directly from the CAD file.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a benefit of CAD over drawing by hand?",
    options: [
      ["Designs can be changed and tested on screen before anything is made", "Correct: mistakes are found early, saving materials."],
      ["No training at all is needed to use the CAD software", "CAD needs training."],
      ["CAD software and computers cost nothing", "They are expensive."],
      ["CAD software makes the parts as well as designing them", "Making parts is CAM."],
    ],
    answer: "A",
    explanation: "CAD drawings are accurate, easy to edit, viewable in 3D and testable by simulation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which sensor is most important for the safety of miners working underground?",
    options: [
      ["A gas sensor detecting methane or carbon monoxide", "Correct: dangerous gases must be detected early."],
      ["A light sensor fitted to the windows of the mine office", "Not a safety sensor for miners."],
      ["A moisture sensor in a flower bed", "Not relevant."],
      ["A barcode reader used to record items in the mine's stores", "Used for stock, not safety."],
    ],
    answer: "A",
    explanation: "Gas, temperature and airflow sensors protect miners; the computer controls fans and alarms.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Process control follows the read–compare–act cycle."],
    stem: "In an ore-processing plant, a sensor shows that the pH in a tank is below the stored limit. What does the control computer do?",
    options: [
      ["Signals a pump to add more lime until the pH is within limits", "Correct: the actuator corrects the condition."],
      ["Switches off the pH sensor", "The sensor must keep measuring."],
      ["Prints a report for the manager to read next month", "The correction must be immediate."],
      ["Increases the speed of the ore conveyor", "Adding more ore does not correct the pH."],
    ],
    answer: "A",
    explanation: "The computer compares readings with limits and signals actuators to correct them.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which technology detects people at night without light?"],
    stem: "Rangers want to detect poachers entering a park at night. Which system is most suitable?",
    options: [
      ["Thermal cameras and drones sending alerts to a control room", "Correct: thermal imaging works in the dark."],
      ["A spreadsheet of the park's visitor bookings and permits", "Poachers do not book."],
      ["A CAD drawing of the park fence", "A drawing cannot detect people."],
      ["A tracking collar fitted to each of the rangers on patrol", "Tracks rangers, not intruders."],
    ],
    answer: "A",
    explanation: "Thermal cameras, camera traps, drones and acoustic sensors are used against poaching.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Who else would like to know where rhinos are?"],
    stem: "Why must the location data from rhino tracking collars be kept secure?",
    options: [
      ["Poachers could use it to find the rhinos", "Correct: the data is valuable to criminals."],
      ["The collars stop working if the data is shared", "Sharing does not affect the collars."],
      ["Tourists are not allowed to see rhinos", "Tourists may see rhinos; the issue is criminals."],
      ["The data is too large to store on a computer", "Size is not the reason."],
    ],
    answer: "A",
    explanation: "Location data must be protected by access controls and encryption.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Computer-aided manufacturing uses computers to control machines such as CNC lathes and 3D printers.",
    answer: true,
    explanation: "True. CAM is computer-controlled manufacturing.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A tracking collar on its own stops an elephant from entering farmland.",
    answer: false,
    explanation: "False. The collar only reports its position; rangers or farmers act on alerts.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: `A lion's tracking collar sends its position every ${every} minutes. How many positions does it send in one day?`,
    value: fixesPerDay,
    wrong: [24],
    explanation: `${24 * 60} minutes ÷ ${every} = ${fixesPerDay}.`,
    workedSolution: `1. Minutes in a day: 24 × 60 = ${24 * 60}.\n2. Positions: ${24 * 60} ÷ ${every} = ${fixesPerDay}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Find the number for one collar first."],
    stem: `Researchers fit the same type of collar (one position every ${every} minutes) to ${elephants} elephants. How many positions are stored in their database each day?`,
    value: fixesPerDay * elephants,
    wrong: [fixesPerDay],
    explanation: `${fixesPerDay} per collar × ${elephants} = ${fixesPerDay * elephants}.`,
    workedSolution: `1. One collar: ${24 * 60} ÷ ${every} = ${fixesPerDay} positions per day.\n2. ${elephants} collars: ${fixesPerDay} × ${elephants} = ${fixesPerDay * elephants}.`,
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each system to its use.",
    pairs: [
      ["CAD", "Drawing and testing a new pump design on screen"],
      ["CNC machine", "Cutting metal parts to exact sizes from a program"],
      ["Gas sensor network", "Warning miners of dangerous air underground"],
      ["Camera trap", "Photographing animals or intruders when motion is detected"],
      ["Park database", "Recording animal counts and ranger patrols"],
    ],
    explanation: "Design, manufacture, mine safety, surveillance and records.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Using computers to monitor and control an industrial process continuously is called process {{blank:a}}. A machine tool controlled by a program of exact co-ordinates is a {{blank:b}} machine.",
    blanks: [
      { id: "a", accepted: ["control"], choices: ["control", "design", "tracking", "logging"] },
      { id: "b", accepted: ["CNC"], choices: ["CNC", "CAD", "GPS", "ATM"] },
    ],
    explanation: "Process control; CNC (computer numerical control).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Think about safety and recovery of minerals."],
    stem: "Give **two** benefits of using computers to control ore processing at a mine. [2]",
    points: [
      "Continuous, accurate control keeps each stage within limits / more mineral recovered, less waste",
      "Fewer workers needed in dangerous areas / faster response / alarms when a value cannot be corrected",
    ],
    modelAnswer: "Conditions are controlled continuously and accurately, so more gold is recovered, and fewer workers are exposed to dangerous chemicals.",
    explanation: "Any two specific benefits.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    hints: ["Position → transmitted → computer map → alert → rangers act."],
    stem: "Describe how GPS tracking collars help reduce conflict between elephants and farmers near a national park. [4]",
    points: [
      "The collar's GPS receiver works out the elephant's position at regular intervals",
      "The position is transmitted by satellite / mobile network to the park's computer",
      "The computer shows the elephants on a map and sends an alert when one crosses a set boundary near farms (geofence)",
      "Rangers / farmers are warned in time to move the elephants away / protect crops",
    ],
    modelAnswer: "Each collar works out the elephant's position regularly and sends it to the park's computer. The computer plots it on a map and sends an alert when an elephant crosses a boundary near the farms, so rangers can drive it back before crops are damaged.",
    explanation: "Position, transmission, alert, action.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["CAD designs; CAM makes.", "Drawbacks: cost, training, jobs."],
    stem: "Zambezi Metalworks (fictional) in Bulawayo is moving from hand drawing and manual lathes to CAD/CAM.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which statement describes CAM?", options: [["Machines are controlled by computer to make the parts", "Correct."], ["Parts are designed and tested on screen", "That is CAD."], ["Parts are checked by hand with a ruler and gauge", "Manual inspection."], ["Customers' orders are taken by email", "Communication, not manufacturing."]], answer: "A", explanation: "CAM: computer-controlled manufacture." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe **three** benefits of CAD/CAM for the company.", points: ["Accurate / identical parts every time", "Designs changed and tested on screen before making, so less waste", "Faster production / machines work continuously / safer for workers"], modelAnswer: "Every part is made to exactly the same size; designs can be tested and corrected on screen, so less metal is wasted; and CNC machines work quickly and continuously." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **two** drawbacks for the company or its workers.", points: ["Expensive software / machines / maintenance", "Workers need retraining / some manual jobs lost"], modelAnswer: "The equipment is expensive, and lathe operators must be retrained or may lose their jobs." }),
    ],
    explanation: "CAM makes, CAD designs; accuracy and speed against cost and jobs.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    hints: ["Use the control cycle.", "Name a sensor and an actuator."],
    stem: "A coal mine near Hwange uses computers to keep the air underground safe.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how the computer system controls the ventilation.", points: ["Gas (methane / carbon monoxide) and airflow sensors take readings continuously", "Readings are converted (ADC) and sent to the computer, which compares them with stored safe limits", "If gas is above the limit, the computer signals the fans (actuators) to speed up / sounds an alarm", "The process repeats continuously"], modelAnswer: "Methane and airflow sensors take readings continuously; these are converted to digital and compared with the stored safe limits. If methane rises above its limit, the computer speeds up the ventilation fans and sounds an alarm. This repeats continuously." }),
      P.manual({ label: "(b)", marks: 2, stem: "Evaluate the system: give **one** benefit and **one** drawback.", points: ["Benefit: dangerous gas detected and cleared faster than by people / continuous monitoring saves lives", "Drawback: dust / water damage sensors so faulty readings / expensive / power failure stops fans"], modelAnswer: "Gas is detected and cleared faster than any person could, saving lives; but dust and water can damage the sensors and give false readings." }),
    ],
    explanation: "Sensors, comparison with limits, fans and alarms, repeated; life-saving but sensors need maintenance.",
  });

  b.card("DEFINITION", "Computer-aided design (CAD)", "Using software to create, edit, analyse and test precise drawings and 3D models of products.");
  b.card("DEFINITION", "Computer-aided manufacturing (CAM)", "Using computers to control machines (CNC, 3D printers, robots) that make products, often directly from a CAD file.");
  b.card("DEFINITION", "CNC", "Computer numerical control: a machine tool controlled by a program of exact co-ordinates and movements.");
  b.card("DEFINITION", "Process control", "Computers, sensors and actuators monitoring and controlling an industrial process continuously within set limits.");
  b.card("CONCEPT", "Computers in mining", "Exploration models, process control of ore processing, gas and airflow safety monitoring, remote / driverless equipment, records.");
  b.card("DEFINITION", "Tracking collar", "A collar with a GPS receiver and transmitter that sends an animal's position at regular intervals.");
  b.card("CONCEPT", "Anti-poaching technology", "Camera traps, thermal cameras, drones, acoustic (gunshot) sensors, alerts to a control room.");
  b.card("FACT", "Key drawback of wildlife tracking", "Location data must be kept secure because poachers could use it; equipment is costly and batteries run out.");
});
