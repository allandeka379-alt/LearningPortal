// Slice w3a: acs.enterprise.application-areas (ZIMSEC only, Form 5). Calculators are allowed.
import { concept, P, chk, same, py, codeBlock, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w3a-q.mjs";

// Irrigation rule for the questions: threshold 35, pump 15 minutes
const irrCode = `readings = [47, 38, 52, 37, 44, 39]
total = 0
for hour, moisture in enumerate(readings, start=6):
    if moisture < 40:
        total = total + 15
        print(hour, moisture, "ON")
    else:
        print(hour, moisture, "OFF")
print(total)`;
const irrOut = py(irrCode).split("\n");
same(irrOut, ["6 47 OFF", "7 38 ON", "8 52 OFF", "9 37 ON", "10 44 OFF", "11 39 ON", "45"]);
const irrMd = mdTable(["Hour", "Moisture reading"], [[6, 47], [7, 38], [8, 52], [9, 37], [10, 44], [11, 39]]);
const area = 84;
const perFlight = 4;
const flights = area / perFlight;
chk(flights, 21);
const minsFlight = 25;
chk(flights * minsFlight, 525);
const megabits = 0.5 * 30 * 60;
chk(megabits, 900);
const mb = megabits / 8;
chk(mb, 112.5);
const bundle = 2048;
const lessons = Math.floor(bundle / mb);
chk(lessons, 18);

concept("acs.enterprise.application-areas", { file: "enterprise/application-areas", keyPrefix: "enterprise.application-areas" }, (b) => {
  mc(b, 1, "RECALL", "What is precision farming?",
    ["Using sensors, drones and software to apply water and chemicals only where and when they are needed", "Correct."],
    [["Farming with only hand tools", "Precision farming relies on technology."], ["Growing one crop on every field", "The number of crops is not the point."], ["Selling farm produce to customers in other towns through a page on social media", "That is e-commerce, not precision farming."]],
    "Precision farming matches inputs to the needs of each part of a field.");
  mc(b, 2, "APPLICATION", "A civil engineer tests a design of a bridge on a computer before it is built. Which application area is this?",
    ["Engineering", "Correct: computer simulation is used in engineering design."],
    [["E-learning", "E-learning is about teaching and learning."], ["Telecommunications", "Telecommunications deals with networks and calls."], ["Agricultural mechanisation", "This is about farming."]],
    "Simulation and CAD are used in engineering.", { daily: true });
  mc(b, 2, "APPLICATION", "A pump switches on automatically when a sensor reports that the soil is dry. Which part of the system makes the decision?",
    ["The control program that compares the reading with the set value", "Correct."],
    [["The soil", "The soil is measured, not deciding."], ["The screen of the farmer's phone that shows the readings every hour", "The screen only displays information."], ["The water tank", "The tank only stores water."]],
    "The program compares the reading with the threshold.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which is an example of the internet of things on a farm?",
    ["Soil sensors that send readings over a network to the farmer's phone", "Correct."],
    [["A paper record of the harvest kept in a file in the office", "Paper records are not connected devices."], ["A calculator", "A calculator is not networked."], ["A spade", "A spade has no sensors or software."]],
    "IoT devices have sensors and exchange data.", { daily: true });
  mc(b, 3, "ANALYSIS", "A rural school wants to use cloud-based lessons but has a weak signal and expensive data. Which plan is most sensible?",
    ["Download lessons once and use them offline, and add solar power for the computer room", "Correct."],
    [["Stream every lesson live in high quality", "This uses the most data on a weak signal."], ["Cancel the project because the cloud cannot be used in places with a weak signal or no power", "Offline use is possible."], ["Buy the most expensive server", "A local server does not remove the cost of data."]],
    "Offline use reduces data and signal needs.", { hints: ["How can the data be used only once?"] });
  mc(b, 3, "UNDERSTANDING", "What is a challenge of using artificial intelligence in Zimbabwe?",
    ["It needs data and skilled people, and its decisions may be biased", "Correct."],
    [["It cannot work with any data at all, so it is of no use in farming or schools", "AI needs data; it can work with it."], ["It works only on paper", "AI is a computer technique."], ["It removes all need for electricity", "AI needs power."]],
    "Data, skills and bias are real challenges.", { hints: ["What does AI need in order to learn?"] });
  mc(b, 3, "APPLICATION", "Which is a benefit of green computing for a school?",
    ["Lower electricity bills because equipment uses less energy", "Correct."],
    [["The computers become faster", "Green computing is about energy and waste."], ["Passwords can be shorter", "It does not affect passwords."], ["Software no longer needs updates once green computing is used", "Updates are still needed."]],
    "Green computing saves energy and reduces waste.", { hints: ["What does green computing reduce?"] });
  mc(b, 4, "EVALUATION", "Which statement about blockchain gives the most balanced judgement for Zimbabwe?",
    ["It could help keep records that are hard to change, but it needs skills, suitable laws and in some cases much energy", "Correct."],
    [["It has no risks at all and should be used for everything in government, schools and business", "Every technology has costs and risks."], ["It is useless because it cannot store records", "It is designed to store records."], ["It works without electricity or the internet", "It needs both."]],
    "A balanced judgement has benefits and limits.", { hints: ["Does the statement give both a benefit and a limit?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Mobile money is an example of an application of telecommunications and computer systems.", answer: true, explanation: "True. Mobile money relies on networks, databases and software to move and record money." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each application area to an example of how computers are used.",
    pairs: [["Engineering", "Simulating the strength of a structure before it is built"], ["Research and development", "Analysing large sets of weather records"], ["Agricultural mechanisation", "A drone monitoring the health of a crop"], ["E-learning", "A recorded lesson watched on a phone"], ["Telecommunications", "A mobile network that carries calls and mobile money"]],
    explanation: "Each area has typical uses." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.", hints: ["Think about devices and about renting services online."],
    template: "A network of everyday devices with sensors that exchange data is called the {{blank:a}} of things. Renting storage and software over the internet is {{blank:b}} computing. Using less energy and making less e-waste is {{blank:c}} computing.",
    blanks: [
      { id: "a", accepted: ["internet"], choices: ["internet", "intranet", "inbox", "interface"] },
      { id: "b", accepted: ["cloud"], choices: ["cloud", "green", "stand-alone", "batch"] },
      { id: "c", accepted: ["green"], choices: ["green", "cloud", "quantum", "mobile"] },
    ], explanation: "Internet of things, cloud, green." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the farming approach that uses sensors, drones and software to treat each part of a field according to its needs.",
    accepted: ["precision farming", "precision agriculture"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["subsistence farming"], explanation: "Precision farming." });
  b.num({ d: 2, skill: "APPLICATION", hints: ["Flights = area ÷ area per flight."],
    stem: "A drone sprays 5 hectares in one flight. How many flights are needed to spray a farm of 40 hectares?",
    value: 8, wrong: [200, 35], workedSolution: "1. 40 ÷ 5 = 8 flights.", explanation: "40 ÷ 5 = 8 flights." });
  b.num({ d: 3, skill: "APPLICATION", hints: ["Flights first, then time."],
    stem: `A drone sprays ${perFlight} hectares in one flight and each flight takes ${minsFlight} minutes with the battery change. Calculate the total time in minutes needed for a farm of ${area} hectares.`,
    value: flights * minsFlight, wrong: [flights, area * minsFlight], workedSolution: `1. Flights = ${area} ÷ ${perFlight} = ${flights}.\n2. Time = ${flights} × ${minsFlight} = ${flights * minsFlight} minutes.`, explanation: `${flights} × ${minsFlight} = ${flights * minsFlight} minutes.` });
  b.num({ d: 4, skill: "APPLICATION", hints: ["Megabits = rate × seconds, then divide by 8 for megabytes.", "Use 1 GB = 1024 MB and round down to a whole number of lessons."],
    stem: `A video lesson lasts 30 minutes and is sent at 0.5 megabits per second. A learner has a bundle of 2 GB (1 GB = 1024 MB). Calculate how many whole lessons the bundle can carry.`,
    value: lessons, wrong: [19, 2048], workedSolution: `1. Data = 0.5 × 30 × 60 = ${megabits} megabits.\n2. In megabytes = ${megabits} ÷ 8 = ${mb} MB.\n3. Lessons = 2048 ÷ ${mb} = 18.2, so ${lessons} whole lessons.`, explanation: `${mb} MB per lesson; 2048 ÷ ${mb} gives ${lessons} whole lessons.` });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 4, hints: ["Name the area and describe two uses."],
    stem: "Describe how computers are used in agriculture. Give two examples. [4]",
    points: ["Example 1 named, for example sensors measuring soil moisture", "Description: readings are sent to a control program that switches the irrigation pump on or off", "Example 2 named, for example drones monitoring or spraying crops", "Description: they cover large areas quickly and apply chemicals only where needed"],
    modelAnswer: "Soil moisture sensors send readings to a control program that switches the irrigation pump on or off. Drones monitor or spray crops, covering large areas quickly and applying chemicals only where needed.",
    explanation: "Two examples described." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Two benefits and two limits."],
    stem: "Discuss the use of e-learning for learners in a rural area. [4]",
    points: ["Benefit: learners can reach lessons and resources that the school does not have", "Benefit: lessons can be repeated and studied at their own pace", "Limit: data and devices cost money and the signal or electricity may be unreliable", "Limit: learners may lack skills or support, and some practical work cannot be done online"],
    modelAnswer: "Learners can reach lessons and resources the school does not have and can repeat lessons at their own pace. However, data and devices cost money, the signal or electricity may be unreliable, and some practical work cannot be done online.",
    explanation: "Benefits and limits." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Meaning, a benefit for Zimbabwe and a challenge."],
    stem: "Explain what the internet of things is and give one benefit and one challenge of using it in Zimbabwe. [4]",
    points: ["A network of everyday devices with sensors and software that collect and exchange data over the internet", "Example of a device, such as a water meter or a soil sensor", "Benefit: for example better use of water and energy or earlier warnings of faults", "Challenge: for example security of many small devices, cost or power supply"],
    modelAnswer: "The internet of things is a network of everyday devices, such as water meters or soil sensors, with sensors and software that collect and exchange data over the internet. A benefit is better use of water and energy; a challenge is the security and cost of many small devices.",
    explanation: "Meaning, example, benefit, challenge." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Compare the trend's benefit with its limits for a named user."],
    stem: "A small business in Gweru is considering cloud computing for its records and software. Evaluate this decision. [4]",
    points: ["Benefit: no need to buy and maintain its own server, so costs are lower to start", "Benefit: the records can be reached from several places and are backed up by the provider", "Risk: it depends on a reliable and affordable internet connection and on electricity", "Risk: the data is held by another company, so privacy and security have to be checked; conclusion based on the business's needs"],
    modelAnswer: "Cloud computing avoids buying and maintaining a server and lets the records be reached from several places with backup by the provider. However, it depends on a reliable, affordable connection and electricity, and the data is held by another company. The business should decide on its needs and the quality of its connection.",
    explanation: "Benefits, risks, conclusion." });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["A reading below 40 switches the pump on.", "Each ON adds 15 minutes."],
    explanation: "The pump is on at hours 7, 9 and 11: 3 × 15 = 45 minutes.",
    stem: `A controller switches an irrigation pump on for 15 minutes whenever the moisture reading is below 40. Readings are taken every hour from 06:00.\n\n${irrMd}\n\nThe controller is written in Python:\n\n${codeBlock(irrCode, "python")}`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "How many times is the pump switched on?", value: 3, wrong: [2, 6], workedSolution: "1. The readings below 40 are 38, 37 and 39.\n2. The pump is on three times.", explanation: "Three readings are below 40." }),
      P.num({ label: "(b)", marks: 1, stem: "State the number printed on the last line of the output.", value: 45, wrong: [3, 15], workedSolution: "1. 3 × 15 = 45.", explanation: "3 × 15 = 45." }),
      P.short({ label: "(c)", marks: 1, stem: "State the action (ON or OFF) at hour 10.", accepted: ["off"], normalise: ["trim", "lowercase"], wrong: ["on"], explanation: "The reading 44 is not below 40." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give two advantages of using this controller instead of a worker who waters the field by hand.", points: ["The field is watered at the right times without anyone having to be present", "Water is saved because the pump runs only when the soil is dry"], modelAnswer: "The field is watered at the right times without anyone present, and water is saved because the pump runs only when the soil is dry.", explanation: "Automation benefits." }),
    ] });
  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["Think about benefits and challenges for a rural community."],
    explanation: "Each trend needs a meaning, a benefit and a challenge linked to Zimbabwe.",
    stem: "A government report on the future of computing in Zimbabwe discusses artificial intelligence and green computing.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain what is meant by artificial intelligence and give one use in farming.", points: ["Programs that learn from data to make predictions or decisions", "For example identifying crop disease from photographs or forecasting yields"], modelAnswer: "Programs that learn from data to make predictions or decisions, for example identifying crop disease from photographs.", explanation: "Meaning and use." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe two challenges of using artificial intelligence in Zimbabwe.", points: ["It needs large amounts of good data and skilled people, which may be scarce", "Decisions can be biased or wrong, and it may affect some jobs"], modelAnswer: "It needs large amounts of good data and skilled people, which may be scarce, and its decisions can be biased or wrong and may affect some jobs.", explanation: "Data, skills, bias, jobs." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain how a school could apply green computing.", points: ["Switch off or put to sleep equipment when it is not in use, or use solar power, to use less energy", "Repair, upgrade and reuse equipment and recycle e-waste properly to make less waste"], modelAnswer: "Switch off equipment when not in use or use solar power to save energy, and repair, upgrade and reuse equipment and recycle e-waste properly to make less waste.", explanation: "Energy and waste." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Name the area, then say what the computer does."],
    explanation: "Each scenario belongs to one application area.",
    stem: "Three scenarios are given. (1) A telephone company bills customers automatically from records of their calls. (2) Researchers use software to predict how a disease spreads from case data. (3) A farmer uses a drone to count cattle.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the application area of scenario 1.", accepted: ["telecommunications", "telecoms", "telecommunication"], normalise: ["trim", "lowercase"], wrong: ["engineering"], explanation: "Billing for calls belongs to telecommunications." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the application area of scenario 2.", accepted: ["research and development", "research", "r&d"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["e-learning"], explanation: "Modelling and prediction from data is research and development." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the application area of scenario 3.", accepted: ["agriculture", "agricultural mechanisation", "agricultural mechanization", "farming"], normalise: ["trim", "lowercase"], wrong: ["engineering"], explanation: "A drone on a farm is agricultural mechanisation." }),
      P.manual({ label: "(d)", marks: 3, stem: "For scenario 3 describe two benefits and one limitation of using a drone.", points: ["It saves time because it covers a large area quickly", "It gives accurate counts or images that are hard to get on foot", "Limitation: cost, training, rules on flying or weather and battery life"], modelAnswer: "A drone saves time by covering a large area quickly and gives accurate counts or images that are hard to get on foot. Its limitations are cost, training, flying rules and battery life.", explanation: "Two benefits and a limit." }),
    ] });
  b.card("DEFINITION", "Precision farming", "Using sensors, drones, satellite images and software to apply water, fertiliser and chemicals only where and when needed.");
  b.card("CONCEPT", "Application areas", "Engineering, research and development, agricultural mechanisation, e-learning and telecommunications.");
  b.card("CONCEPT", "Control rule", "IF reading < set value THEN switch the pump on for a set time; the program compares each sensor reading with the value.");
  b.card("DEFINITION", "Internet of things", "A network of everyday devices with sensors and software that exchange data over the internet.");
  b.card("CONCEPT", "Global trends", "Cloud computing, artificial intelligence, internet of things, blockchain and green computing.");
  b.card("CONCEPT", "Analysing a trend", "Give its meaning, an opportunity for Zimbabwe and a challenge such as cost, power, skills or security.");
  b.card("FORMULA", "Data used by video", "Megabits = rate in Mbit/s × seconds; megabytes = megabits ÷ 8.");
  b.card("CONCEPT", "Cloud computing", "Renting storage, servers and software over the internet; needs a reliable and affordable connection.");
});
