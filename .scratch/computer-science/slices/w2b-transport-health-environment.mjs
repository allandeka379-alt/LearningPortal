// Slice w2b: computers in transport, health and environmental management (comp.applications.transport-health-environment, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const hours = 24;
const perHour = 4; // readings per hour (every 15 minutes)
const stations = 6;

concept("comp.applications.transport-health-environment", { file: "applications/transport-health-environment", keyPrefix: "applications.transport-health-environment" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does a **GPS receiver** in a bus work out?",
    options: [
      ["Its position, from satellite signals", "Correct: GPS calculates location."],
      ["The number of passengers on board", "That needs a ticketing or counting system."],
      ["The speed limit on the road", "That comes from map data, not GPS itself."],
      ["The amount of fuel left in the tank", "That is measured by a fuel sensor."],
    ],
    answer: "A",
    explanation: "A GPS receiver calculates its position from the signals of several satellites.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an **electronic health record**?",
    options: [
      ["A patient's medical history stored on a computer system", "Correct: diagnoses, treatments, medicines, results and allergies."],
      ["A sensor that measures and displays a patient's heart rate", "That is part of a monitoring system."],
      ["A printed prescription given to a patient", "A printout is not the electronic record."],
      ["A video call between a patient and a doctor", "That is telemedicine."],
    ],
    answer: "A",
    explanation: "EHRs replace paper files and can be searched and shared by authorised staff.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a patient monitoring system, what happens when a patient's heart rate goes above the safe limit?",
    options: [
      ["The computer sounds an alarm to alert the nurses", "Correct: readings are compared with limits set by the doctor."],
      ["The sensor gives the patient medicine", "Sensors only measure."],
      ["The system switches itself off to save power", "Monitoring continues."],
      ["The patient's record is deleted", "Records are kept and updated."],
    ],
    answer: "A",
    explanation: "Each reading is compared with stored limits; a reading outside them triggers an alarm.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which input devices does a computerised traffic control system use to count vehicles at a junction?",
    options: [
      ["Induction loops in the road and cameras", "Correct: they detect waiting vehicles."],
      ["Barcode readers on each car", "Cars are not scanned by barcode at junctions."],
      ["Keyboards operated by traffic police", "The system counts automatically."],
      ["Microphones on the traffic lights", "Sound is not used to count vehicles."],
    ],
    answer: "A",
    explanation: "Induction loops and cameras detect vehicles; the computer adjusts the light timings.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does an online bus booking system prevent two passengers from buying the same seat?",
    options: [
      ["The central database marks each seat as sold as soon as it is booked", "Correct: the seat is no longer offered once sold."],
      ["The driver checks every ticket by hand before the booking is confirmed online", "Booking is checked by the system, not by the driver."],
      ["Each passenger chooses a seat on a different bus", "This avoids the problem only by luck."],
      ["The e-ticket is printed twice", "Printing does not prevent double booking."],
    ],
    answer: "A",
    explanation: "A single, up-to-date database of seats prevents double booking.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which information is shared nationally rather than about one patient?"],
    stem: "How does a national **health information system** help the health ministry during a malaria outbreak?",
    options: [
      ["Clinics send case numbers to a central database, so medicines go where cases are rising", "Correct: data from many clinics shows where the outbreak is."],
      ["It monitors every patient's heart rate and temperature continuously in each hospital and clinic in the country", "That is patient monitoring."],
      ["It lets patients book appointments online", "That is an appointment system."],
      ["It prints prescriptions for each patient", "Prescriptions are local tasks."],
    ],
    answer: "A",
    explanation: "Collected figures reveal trends and help plan the response.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which method works continuously in a remote place?"],
    stem: "A company must monitor the pH of a river below its mine day and night. Which method is best?",
    options: [
      ["Sensors with a data logger that records readings automatically and sends warnings", "Correct: continuous, automatic and accurate."],
      ["A worker who visits the river once a month with a set of test strips", "Too infrequent to catch spills."],
      ["A spreadsheet that estimates the pH of the river from the weather forecast", "Guesses are not measurements."],
      ["Photographs of the river posted on a social network", "Photos do not measure pH."],
    ],
    answer: "A",
    explanation: "Data logging with sensors measures continuously, even in remote places, and can trigger alerts.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["What is special about the data held in health systems?"],
    stem: "Which drawback is **most** important when a hospital moves from paper files to electronic health records?",
    options: [
      ["Sensitive patient data could be accessed by hackers or unauthorised staff", "Correct: confidentiality of medical data is critical."],
      ["Records can be searched more quickly by the staff on the wards", "This is a benefit."],
      ["Records can be backed up", "This is a benefit."],
      ["Several departments can view the same patient's record at once from different wards", "This is a benefit."],
    ],
    answer: "A",
    explanation: "Health data is personal and sensitive; access controls, encryption and backups are essential.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A vehicle tracking system needs a way, such as the mobile network, to send each vehicle's GPS position to a central computer.",
    answer: true,
    explanation: "True. GPS gives the position; the communication link sends it to the tracking computer.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Patient monitoring systems mean that nurses no longer need to check on patients.",
    answer: false,
    explanation: "False. Monitors support nurses with continuous readings and alarms, but staff still assess and treat patients.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: `An automatic weather station logs the rainfall every 15 minutes. How many readings does it log in ${hours} hours?`,
    value: hours * perHour,
    wrong: [hours],
    explanation: `${perHour} readings per hour × ${hours} hours = ${hours * perHour}.`,
    workedSolution: `1. Readings per hour: 60 ÷ 15 = ${perHour}.\n2. Readings in ${hours} hours: ${perHour} × ${hours} = ${hours * perHour}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Work out the readings for one station first."],
    stem: `The environment agency has ${stations} such stations, each logging rainfall every 15 minutes. How many rainfall readings reach the national database each day?`,
    value: hours * perHour * stations,
    wrong: [hours * perHour],
    explanation: `${hours * perHour} readings per station × ${stations} stations = ${hours * perHour * stations}.`,
    workedSolution: `1. One station: ${perHour} × ${hours} = ${hours * perHour} readings per day.\n2. All stations: ${hours * perHour} × ${stations} = ${hours * perHour * stations}.`,
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each system to the area in which it is used.",
    pairs: ["E-ticket scanned when boarding a train", "Alarm when blood oxygen falls", "Satellite images of forest cover", "Traffic lights timed by vehicle counts", "Doctor sends a scan to a distant specialist"],
    right: ["Transport", "Health", "Environmental management"],
    rightIndex: [0, 1, 2, 0, 1],
    explanation: "Ticketing and traffic control: transport. Monitoring and telemedicine: health. Satellite images: environment.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Think about speed and sharing."],
    stem: "Give **two** benefits of electronic health records over paper files. [2]",
    points: [
      "Can be searched / retrieved instantly",
      "Can be shared between departments or clinics / backed up / checked automatically against allergies / take no physical space",
    ],
    modelAnswer: "They can be found instantly, and they can be shared with other departments and backed up so they are not lost.",
    explanation: "Any two specific benefits.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    hints: ["Input, processing, output, then a benefit."],
    stem: "A transport company in Harare installs GPS tracking in its 30 delivery trucks. Describe how the system works and give **one** benefit to the company. [4]",
    points: [
      "A GPS receiver in each truck calculates its position from satellite signals",
      "The position is sent regularly over the mobile network to the company's computer",
      "The computer displays each truck on a map / records speed, stops and routes",
      "Benefit: plan efficient routes / monitor driver speed / recover stolen trucks / tell customers arrival times",
    ],
    modelAnswer: "Each truck's GPS receiver works out its position from satellites and sends it over the mobile network to the company's computer, which shows every truck on a map and records its speed and stops. The company can then plan shorter routes and find a stolen truck quickly.",
    explanation: "Position, transmission, display, benefit.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Input: sensors; processing: compare with limits; output: screen and alarm.", "Think about faulty sensors."],
    stem: "Gweru District Hospital (fictional) installs patient monitoring systems in its intensive care ward.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which of these is an input to the system?", options: [["A blood pressure sensor", "Correct."], ["The alarm", "Output."], ["The screen showing graphs", "Output."], ["The safe limits stored by the doctor", "Stored data, not an input device."]], answer: "A", explanation: "Sensors are inputs." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe how the system monitors a patient.", points: ["Sensors measure vital signs (heart rate, blood pressure, temperature) continuously", "The computer compares each reading with the safe limits set by the doctor", "Readings are displayed / stored and an alarm sounds if a reading is outside the limits"], modelAnswer: "Sensors measure the patient's heart rate, blood pressure and temperature continuously. The computer compares each reading with the doctor's limits, displays and stores it, and sounds an alarm if it is outside the limits." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **one** benefit and **one** drawback of the system.", points: ["Benefit: continuous monitoring / immediate alarm / nurses can watch several patients", "Drawback: faulty sensors cause false alarms / expensive / staff training / over-reliance"], modelAnswer: "Nurses are alerted immediately when a reading becomes dangerous, but faulty sensors can cause false alarms." }),
    ],
    explanation: "Sensors in, comparison with limits, display and alarm out.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Data logging: automatic, at intervals.", "Remote equipment can be damaged or lose power."],
    stem: "The national weather service is placing automatic weather stations across Matabeleland.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State **two** sensors an automatic weather station would use.", points: ["One of: temperature, rainfall, humidity, wind speed, pressure, light sensor", "A second different sensor from the list"], modelAnswer: "A temperature sensor and a rainfall sensor." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain **two** benefits of automatic stations over people taking readings.", points: ["Readings taken day and night / at exact intervals / in remote places", "More accurate / no human error / data sent automatically for forecasts"], modelAnswer: "They take readings day and night at exact intervals, even in remote areas, and are more accurate because there is no human error." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **two** drawbacks of the stations.", points: ["Expensive to buy / install / maintain", "Can be damaged / stolen / lose power in remote areas"], modelAnswer: "They are costly to install and maintain, and they can be stolen or lose power in remote places." }),
    ],
    explanation: "Sensors, continuous accurate logging, cost and vulnerability.",
  });

  b.card("DEFINITION", "GPS", "Global Positioning System: a receiver calculates its exact position from the signals of several satellites.");
  b.card("CONCEPT", "Vehicle tracking system", "GPS receiver in each vehicle sends its position over the mobile network to a central computer that shows vehicles on a map.");
  b.card("CONCEPT", "Computer traffic control", "Induction loops and cameras count vehicles; the computer adjusts traffic light timings to reduce queues.");
  b.card("DEFINITION", "Electronic health record", "A patient's medical history stored on a computer system for authorised staff to access and share.");
  b.card("CONCEPT", "Patient monitoring system", "Sensors measure vital signs continuously; the computer compares readings with safe limits, displays them and sounds an alarm when outside.");
  b.card("DEFINITION", "Data logging", "Collecting data automatically from sensors at set intervals and storing it for later analysis.");
  b.card("CONCEPT", "Computers in environmental management", "Weather stations, pollution sensors, satellite images and GIS, flood and fire early-warning systems.");
  b.card("FACT", "Key drawback of health systems", "Patient data is sensitive: it must be protected from hackers and unauthorised staff.");
});
