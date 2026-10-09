// Slice w2b: automated systems (comp.emerging.automated-systems, Cambridge only).
import { concept, P } from "../lib.mjs";

const interval = 15; // minutes between weather-station readings
const perDay = (24 * 60) / interval;
const sensorsWx = 5;

concept("comp.emerging.automated-systems", { file: "emerging/automated-systems", keyPrefix: "emerging.automated-systems" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the job of an **actuator** in an automated system?",
    options: [
      ["To carry out a physical action, such as turning a motor", "Correct: actuators are output devices that cause movement or action."],
      ["To measure a physical quantity such as temperature", "That is the job of a sensor."],
      ["To compare readings with stored values", "That is done by the microprocessor."],
      ["To convert an analogue signal to digital data", "That is done by an ADC."],
    ],
    answer: "A",
    explanation: "Sensors measure, the microprocessor decides, actuators act.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which component compares sensor readings with stored values in an automated system?",
    options: [
      ["The microprocessor", "Correct: it processes the data and makes the decision."],
      ["The sensor", "The sensor only measures."],
      ["The actuator", "The actuator only acts on signals it receives."],
      ["The analogue-to-digital converter", "The ADC only converts the signal."],
    ],
    answer: "A",
    explanation: "The microprocessor compares each reading with pre-set values and decides whether to signal an actuator.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is an analogue-to-digital converter needed between a temperature sensor and a microprocessor?",
    options: [
      ["The sensor gives an analogue signal but the microprocessor processes only digital data", "Correct: the ADC converts the reading to binary."],
      ["The microprocessor gives out analogue signals that the temperature sensor cannot read directly", "The direction is from sensor to microprocessor."],
      ["The ADC stores the pre-set temperature values", "Stored values are held in the microprocessor's memory."],
      ["The ADC switches the heater on and off directly", "Switching is done by an actuator on a signal from the microprocessor."],
    ],
    answer: "A",
    explanation: "Physical quantities vary continuously; the ADC turns the sensor's analogue signal into digital data.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which pair of sensors is most suitable for an automatic security light that comes on only when it is dark and someone approaches?",
    options: [
      ["Light sensor and infrared (motion) sensor", "Correct: light detects darkness; infrared detects a person moving."],
      ["Temperature sensor and pressure sensor", "These do not detect darkness reliably."],
      ["Moisture sensor and light sensor", "Moisture is not relevant to detecting people."],
      ["pH sensor and humidity sensor", "Neither detects darkness or movement."],
    ],
    answer: "A",
    explanation: "Light level and movement are the two conditions to check.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Follow the cycle: read, compare, act."],
    stem: "In an automated irrigation system the moisture reading is **above** the stored minimum. What does the microprocessor do?",
    options: [
      ["It keeps the valve closed (or closes it) and continues to take readings", "Correct: no watering is needed, and monitoring continues."],
      ["It opens the valve so that the field is watered at once", "Water is needed only when the reading is below the minimum."],
      ["It switches the whole system off until the next day", "The system monitors continuously."],
      ["It changes the stored minimum value so that it matches the new moisture reading", "Stored values are set by the farmer, not changed by readings."],
    ],
    answer: "A",
    explanation: "Above the minimum means the soil is moist enough: no action, then the loop repeats.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which statement is a drawback, not a benefit?"],
    stem: "Which is a **disadvantage** of automating a factory production line?",
    options: [
      ["High set-up and maintenance costs", "Correct: machines, installation and engineers are expensive."],
      ["The line can run 24 hours a day", "This is an advantage."],
      ["Products are made to a consistent quality", "This is an advantage."],
      ["Workers are kept away from dangerous machinery", "This is an advantage."],
    ],
    answer: "A",
    explanation: "Other disadvantages include job losses, sensor faults and vulnerability to hacking.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["What must move at a level crossing?"],
    stem: "At an automated railway level crossing, which device is the actuator?",
    options: [
      ["The motor that lowers the barrier", "Correct: it produces the physical movement."],
      ["The pressure sensor on the track", "That is a sensor (input)."],
      ["The microprocessor that controls the crossing", "That is the processing component."],
      ["The stored distance at which the barrier must close", "That is a stored value, not a device."],
    ],
    answer: "A",
    explanation: "Sensors detect the train; the microprocessor decides; the motor (actuator) moves the barrier.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Think about what happens when a sensor gives a wrong reading."],
    stem: "A greenhouse's temperature sensor develops a fault and always reports 10 °C. What is the most likely effect?",
    options: [
      ["The heater stays on and the plants overheat", "Correct: the microprocessor believes it is cold and keeps heating."],
      ["The system notices the fault and corrects the reading itself", "A simple system trusts its sensor data."],
      ["The vents open and stay open all day", "Vents open when the reading is high, not at 10 °C."],
      ["Nothing happens, because the actuators work without sensors", "Actuators act only on the microprocessor's signals."],
    ],
    answer: "A",
    explanation: "A faulty sensor leads to wrong decisions; this is why automated systems need regular checks.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In an automated system the sensor decides whether the heater should be switched on.",
    answer: false,
    explanation: "False. The sensor only measures; the microprocessor compares the reading with stored values and decides.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An automated system repeats its cycle of reading, comparing and acting continuously.",
    answer: true,
    explanation: "True. The loop repeats so the system responds as conditions change.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: `An automatic weather station in Masvingo takes a reading from each sensor every ${interval} minutes. How many times does it read each sensor in one day?`,
    value: perDay,
    wrong: [perDay / 2],
    explanation: `24 hours × 60 minutes = ${24 * 60} minutes; ${24 * 60} ÷ ${interval} = ${perDay} readings.`,
    workedSolution: `1. Minutes in a day: 24 × 60 = ${24 * 60}.
2. Readings: ${24 * 60} ÷ ${interval} = ${perDay}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Find the readings per sensor first."],
    stem: `The same weather station has ${sensorsWx} sensors (temperature, humidity, pressure, rainfall and wind speed). How many readings are stored in one day altogether?`,
    value: perDay * sensorsWx,
    wrong: [perDay],
    explanation: `${perDay} readings per sensor × ${sensorsWx} sensors = ${perDay * sensorsWx}.`,
    workedSolution: `1. Readings per sensor per day: ${24 * 60} ÷ ${interval} = ${perDay}.\n2. All sensors: ${perDay} × ${sensorsWx} = ${perDay * sensorsWx}.`,
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each automated system to the most suitable sensor.",
    pairs: [
      ["Automatic irrigation of a field", "Moisture sensor"],
      ["Street lights that switch on at dusk", "Light sensor"],
      ["Motion-controlled games console", "Accelerometer"],
      ["Water tank level control at a factory", "Level (pressure) sensor"],
      ["Laboratory monitoring of an acid reaction", "pH sensor"],
    ],
    explanation: "Choose the sensor that measures the quantity being controlled.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["The heater should come on when it is too cold."],
    stem: "Complete the pseudocode for a heater that is switched on when the temperature falls below the stored minimum.\n\n```\nIF Temperature [operator] MinTemp\n    THEN\n        CALL Signal(\"Heater\", \"On\")\nENDIF\n```",
    template: "Operator: {{blank:a}}",
    blanks: [{ id: "a", accepted: ["<"], choices: ["<", ">", "=", "<>"] }],
    explanation: "Too cold means `Temperature < MinTemp`.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Give three different advantages; link them to people and accuracy."],
    stem: "Give **three** advantages of using an automated system to control the temperature in a chicken house. [3]",
    points: [
      "Responds faster than a person / keeps the temperature in range so chickens are not harmed",
      "Works 24 hours a day without breaks or tiredness",
      "More accurate / consistent readings and actions / reduces labour costs / saves energy",
    ],
    modelAnswer: "It reacts faster than a worker, so the temperature never strays far from the set range; it works day and night without breaks; and it is more accurate and consistent, which saves energy.",
    explanation: "Any three distinct, relevant advantages.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 5,
    hints: ["Sensor → ADC → microprocessor compares with stored value → actuator → repeat."],
    stem: "A dam near Mutare has an automated system that opens a sluice gate when the water level is too high. Describe how the sensors, microprocessor and actuators work together. [5]",
    points: [
      "Level / pressure sensor measures the water level continuously",
      "Analogue reading converted to digital by an ADC and sent to the microprocessor",
      "Microprocessor compares the reading with a stored maximum level",
      "If above the maximum, a signal is sent to the actuator / motor to open the sluice gate (closed again when the level is safe)",
      "The process repeats continuously",
    ],
    modelAnswer: "A level sensor measures the water level continually; its analogue reading is converted by an ADC and sent to the microprocessor, which compares it with the stored maximum. If the level is above the maximum, the microprocessor signals the motor (actuator) to open the gate; when the level falls below it, the gate is closed. This repeats continuously.",
    explanation: "Each stage of the control cycle is a marking point.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Name the sensor, the stored value, the actuator, the loop.", "Disadvantages: cost, faults, jobs, hacking."],
    stem: "A school in Gweru installs automatic lighting in its corridors. The lights come on when it is dark and someone is in the corridor, and switch off when the corridor is empty.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which device switches the lamps on and off?", options: [["An actuator (a relay)", "Correct."], ["A light sensor", "This measures the light level."], ["An infrared sensor", "This detects movement."], ["An ADC", "This converts signals."]], answer: "A", explanation: "Relays and motors are actuators." }),
      P.manual({ label: "(b)", marks: 4, stem: "Describe how the system decides to switch the lights on.", points: ["Light sensor and infrared / motion sensor send readings (via an ADC) to the microprocessor", "Microprocessor compares the light reading with a stored value for darkness", "If dark and motion is detected, a signal is sent to the actuator / relay to switch the lights on", "Readings are checked continuously (and the lights switch off after a set time with no motion)"], modelAnswer: "The light and motion sensors send readings through an ADC to the microprocessor. It compares the light level with a stored darkness value; if it is darker and motion is detected, it signals the relay to switch on the lights. It keeps checking, and switches them off when no motion is detected for a set time." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **one** advantage and **one** disadvantage of the system for the school.", points: ["Advantage: saves electricity / lights only on when needed / no one needs to remember to switch them", "Disadvantage: cost of installation and maintenance / a faulty sensor could leave the corridor dark"], modelAnswer: "It saves electricity because lights are only on when needed, but it is expensive to install and a faulty sensor could leave the corridor dark." }),
      P.tf({ label: "(d)", stem: "True or false: the light sensor is an output device of the system.", answer: false, explanation: "False: sensors are input devices; the relay is the output (actuator)." }),
    ],
    explanation: "Sensors measure, the microprocessor compares with stored values, the relay acts, the cycle repeats.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    hints: ["Link each point to the factory.", "An ADC is needed for analogue sensors."],
    stem: "A dairy in Marondera uses an automated system to pasteurise milk: the milk must be held at 72 °C before it is cooled.",
    parts: [
      P.short({ label: "(a)", stem: "Name the most suitable type of sensor.", accepted: ["temperature", "temperature sensor", "thermistor", "thermometer probe", "heat sensor"], wrong: ["pressure sensor"], explanation: "A temperature sensor." }),
      P.mcq({ label: "(b)", stem: "Which device converts the sensor's signal for the microprocessor?", options: [["Analogue-to-digital converter", "Correct."], ["Digital-to-analogue converter", "This works in the other direction."], ["Actuator", "Actuators act on outputs."], ["Relay", "A relay is an actuator."]], answer: "A", explanation: "ADC." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe what the microprocessor does with each reading.", points: ["Compares the reading with the stored value (72 °C / acceptable range)", "Sends a signal to an actuator to switch the heater on (below) or off / open a valve to the cooler (reached)"], modelAnswer: "It compares each reading with the stored 72 °C value and signals the heater on if the milk is too cool, or off and opens the valve to the cooler when it is reached." }),
      P.manual({ label: "(d)", marks: 2, stem: "Evaluate the use of automation in this dairy: give **one** advantage and **one** disadvantage linked to the scenario.", points: ["Advantage: temperature held accurately every time, so milk is safe / consistent quality / runs every shift", "Disadvantage: a sensor fault could let unsafe milk through / costly to install / fewer jobs"], modelAnswer: "Every batch is held at exactly the right temperature, so the milk is safe; but if the sensor fails, unpasteurised milk might pass before anyone notices." }),
    ],
    explanation: "Temperature sensor, ADC, compare with stored value, act; balance safety against fault risk.",
  });

  b.card("DEFINITION", "Automated system", "Hardware and software that carry out a task or control a process automatically, with little or no human involvement.");
  b.card("DEFINITION", "Actuator", "An output device that causes a physical action, e.g. motor, pump, valve, relay.");
  b.card("CONCEPT", "The control cycle", "Sensor reads → ADC converts → microprocessor compares with stored values → signal to actuator if outside range → repeat continuously.");
  b.card("CONCEPT", "Role of the ADC", "Converts the analogue signal from a sensor into digital data the microprocessor can process.");
  b.card("CONCEPT", "Advantages of automated systems", "Faster reactions, works 24/7, accurate and consistent, safer for people, lower running costs.");
  b.card("CONCEPT", "Disadvantages of automated systems", "Expensive to set up and maintain, sensor or software faults, job losses, hacking risk, cannot handle unexpected situations.");
  b.card("FACT", "Scenario areas named by Cambridge", "Industry, transport, agriculture, weather, gaming, lighting, science.");
  b.card("FACT", "Sensor for irrigation / security light / games controller", "Moisture; light + infrared (motion); accelerometer / gyroscope.");
});
