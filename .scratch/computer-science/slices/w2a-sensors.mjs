// Slice w2a: sensors (comp.hardware.sensors, Cambridge only).
import { concept, P } from "../lib.mjs";

const every = 15; // minutes between readings
const days = 7;
const perDay = (24 * 60) / every;
const perWeek = perDay * days;

concept("comp.hardware.sensors", { file: "hardware/sensors", keyPrefix: "hardware.sensors" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **sensor**?",
    options: [
      ["An input device that measures a physical property and sends readings to a computer", "Correct: a sensor measures and sends readings."],
      ["An output device that moves a motor or opens a valve when it receives a signal", "That describes an actuator."],
      ["A program that decides whether a reading is too high or too low", "The decision is made by the microprocessor running a program."],
      ["A storage device that keeps a record of all the readings taken", "Readings are stored in memory or on secondary storage."],
    ],
    answer: "A",
    explanation: "A sensor is an input device: it measures a physical property such as temperature or light and sends the reading on.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which sensor measures the amount of water vapour in the air?",
    options: [
      ["Humidity sensor", "Correct: humidity is water vapour in the air."],
      ["Moisture sensor", "A moisture sensor measures water in a material such as soil."],
      ["Level sensor", "A level sensor measures the height of a liquid in a container."],
      ["Flow sensor", "A flow sensor measures how fast a liquid or gas is moving."],
    ],
    answer: "A",
    explanation: "Humidity: water vapour in the air. Moisture: water in soil or another material.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A smartphone turns its display sideways when the phone is rotated. Which sensor detects the rotation?",
    options: [
      ["Accelerometer", "Correct: it detects changes in direction and tilt."],
      ["Proximity sensor", "That detects how close an object is, e.g. your ear during a call."],
      ["Light sensor", "That adjusts the screen brightness."],
      ["Acoustic sensor", "That detects sound."],
    ],
    answer: "A",
    explanation: "An accelerometer measures acceleration and tilt, so it can tell which way up the phone is.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which sensor should a borehole system use to switch off the pump when the water tank is full?",
    options: [
      ["Level sensor", "Correct: it measures the height of water in the tank."],
      ["pH sensor", "That measures acidity, not how full the tank is."],
      ["Humidity sensor", "That measures water vapour in the air."],
      ["Gas sensor", "That detects gases such as carbon monoxide."],
    ],
    answer: "A",
    explanation: "A level sensor measures how high the liquid is in a container.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A fish farm at Lake Kariba must check that the water in its tanks does not become too acidic. Which sensor is needed?",
    options: [
      ["pH sensor", "Correct: pH measures acidity and alkalinity."],
      ["Temperature sensor", "Temperature matters too, but it does not measure acidity."],
      ["Flow sensor", "That measures how fast the water moves."],
      ["Magnetic field sensor", "That detects changes in a magnetic field."],
    ],
    answer: "A",
    explanation: "pH sensors measure how acidic or alkaline a liquid is.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["What happens to the air in a mine if there is a leak or a build-up of fumes?"],
    stem: "Which sensor should be fitted in an underground mine to warn workers of a dangerous build-up of methane?",
    options: [
      ["Gas sensor", "Correct: gas sensors measure the amount of a particular gas such as methane."],
      ["Humidity sensor", "Humidity is water vapour, not methane."],
      ["Pressure sensor", "It measures force or pressure, not the type of gas present."],
      ["Infra-red sensor", "It detects heat or broken beams, not methane."],
    ],
    answer: "A",
    explanation: "Gas sensors detect gases such as methane, carbon monoxide and oxygen levels.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which sensor detects the heat given off by a person?"],
    stem: "A shop's burglar alarm must detect a person moving in a dark room at night. Which sensor is most suitable?",
    options: [
      ["Infra-red sensor", "Correct: it detects the heat (infra-red radiation) given off by a body, even in darkness."],
      ["Light sensor", "A burglar may not use any light, so a light sensor could miss them."],
      ["pH sensor", "pH measures acidity."],
      ["Humidity sensor", "Humidity does not change noticeably when a person enters."],
    ],
    answer: "A",
    explanation: "Infra-red sensors detect body heat or a broken infra-red beam, so they work in the dark.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Which sensor works without touching the obstacle?"],
    stem: "A car has a system that beeps faster as the car reverses towards a wall, before it touches the wall. Which sensor is used?",
    options: [
      ["Proximity sensor", "Correct: it measures how close an object is without contact."],
      ["Pressure sensor", "A pressure sensor only responds once something presses on it, which is too late."],
      ["Accelerometer", "It measures changes in the car's speed, not the distance to the wall."],
      ["Level sensor", "A level sensor measures the height of a liquid."],
    ],
    answer: "A",
    explanation: "Parking sensors are proximity sensors: they measure distance to nearby objects.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A sensor compares its reading with a stored value and decides whether to switch on a heater.",
    answer: false,
    explanation: "False. The sensor only measures; the microprocessor compares the reading and decides, then an actuator makes the change.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Most sensors produce analogue readings that must be converted to digital data by an ADC.",
    answer: true,
    explanation: "True. Quantities such as temperature vary continuously; an analogue-to-digital converter digitises the readings.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each sensor to the data it captures.",
    pairs: [
      ["Flow sensor", "The rate at which a liquid or gas moves"],
      ["Acoustic sensor", "Sound"],
      ["Magnetic field sensor", "Changes in a magnetic field"],
      ["Moisture sensor", "Water content of soil"],
      ["Pressure sensor", "Force or pressure applied"],
    ],
    explanation: "Know the data captured by each of the fourteen sensors in the syllabus.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["Ask what physical quantity changes in each situation."],
    stem: "Match each context to the most suitable sensor.",
    pairs: [
      ["Street lights that switch on at dusk", "Light sensor"],
      ["An incubator for chicken eggs that must stay at 37.5 °C", "Temperature sensor"],
      ["A water meter that records how much water a house uses", "Flow sensor"],
      ["A shop door alarm that sounds when glass breaks", "Acoustic sensor"],
    ],
    explanation: "Light for brightness, temperature for heat, flow for water usage, acoustic for the sound of breaking glass.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "A sensor measures a physical property and sends the reading to a {{blank:a}}. Most readings are {{blank:b}}, so they are converted by an ADC. If the reading is outside the set range, a signal is sent to an {{blank:c}}, such as a motor or valve.",
    blanks: [
      { id: "a", accepted: ["microprocessor"], choices: ["microprocessor", "printer", "speaker", "projector"] },
      { id: "b", accepted: ["analogue"], choices: ["analogue", "digital"] },
      { id: "c", accepted: ["actuator"], choices: ["actuator", "sensor", "ADC", "input device"] },
    ],
    explanation: "Sensor → (ADC) → microprocessor decides → actuator acts.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["First find the number of readings in one day."],
    stem: `A weather station in Masvingo takes a humidity reading every ${every} minutes, day and night. How many readings does it take in ${days} days?`,
    value: perWeek,
    wrong: [perDay, days * 24],
    explanation: `${24 * 60} ÷ ${every} = ${perDay} readings a day; ${perDay} × ${days} = ${perWeek}.`,
    workedSolution: `1. Minutes in a day: 24 × 60 = ${24 * 60}.\n2. Readings per day: ${24 * 60} ÷ ${every} = ${perDay}.\n3. Readings in ${days} days: ${perDay} × ${days} = ${perWeek}.`,
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "A phone switches its screen off when it is held close to the user's ear. Name the sensor that detects this.",
    accepted: ["proximity", "proximity sensor", "a proximity sensor"],
    wrong: ["light sensor"],
    explanation: "A proximity sensor detects how close an object is without touching it.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    hints: ["Two different sensors, each with its reason."],
    stem: "A museum in Harare stores old paper documents that are damaged by damp air and by heat. Identify **two** suitable sensors for monitoring the storeroom and give the reason for each. [4]",
    points: [
      "Humidity sensor",
      "To measure water vapour in the air, so damp conditions are detected",
      "Temperature sensor",
      "To measure how hot the room is, so overheating is detected",
    ],
    modelAnswer: "A humidity sensor, to measure water vapour in the air so the room does not become damp; and a temperature sensor, to check that the room does not become too hot.",
    explanation: "Name the sensor and link it to the quantity being monitored.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    hints: ["Think about speed, accuracy and working all the time."],
    stem: "Explain **three** advantages of using sensors to monitor a hospital patient's temperature and heart rate instead of a nurse taking readings by hand. [3]",
    points: [
      "Readings are taken continuously / more frequently, day and night",
      "Readings are more accurate / no human error in reading or recording",
      "An alarm can warn staff immediately when a reading is outside the safe range / frees nurses for other tasks",
    ],
    modelAnswer: "Sensors take readings continuously, even at night, and they are more accurate because there is no human error. The system can sound an alarm the moment a reading is outside the safe range, freeing nurses for other work.",
    explanation: "Continuous, accurate, immediate warnings.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    hints: ["Match the quantity in each requirement to a sensor.", "The sensor measures; the microprocessor compares; the actuator acts."],
    stem: "A tobacco farmer near Karoi installs a computer-controlled curing barn. The barn must be kept at the right temperature and air humidity, the vents must open if smoke from the furnace builds up, and the farmer wants to know when the barn door is left open.",
    parts: [
      P.match({ label: "(a)", stem: "Match each requirement to the most suitable sensor.", pairs: [["Keeping the barn at the right temperature", "Temperature sensor"], ["Keeping the air at the right humidity", "Humidity sensor"], ["Detecting a build-up of smoke from the furnace", "Gas sensor"], ["Detecting that the door has been left open", "Magnetic field sensor"]], explanation: "Each requirement depends on a different physical quantity." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe how the system uses the temperature sensor to keep the barn at the right temperature.", points: ["The sensor sends readings (converted by an ADC) to the microprocessor", "The microprocessor compares each reading with the stored/required value", "If too low it signals an actuator to increase heating (or open/close a damper); if too high it reduces heating; the process repeats continuously"], modelAnswer: "The temperature sensor sends readings, via an ADC, to the microprocessor, which compares each one with the required temperature. If it is too low, it signals an actuator to increase the heat; if too high, to reduce it. This repeats continuously." }),
      P.manual({ label: "(c)", marks: 1, stem: "State **one** advantage of using sensors in the barn instead of the farmer checking conditions by hand.", points: ["Readings are taken continuously, day and night / more accurately / the farmer is free for other work"], modelAnswer: "The sensors check the barn continuously, even at night, so a problem is detected at once." }),
    ],
    explanation: "Temperature, humidity, gas and magnetic field sensors; sensor → compare → actuator, repeated.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    hints: ["For each event, ask what changes: weight, heat, distance, sound or light.", "Explain why the chosen sensor detects that change."],
    stem: "A self-service car wash in Bulawayo is being automated. The system must: (1) detect when a car has driven onto the washing bay, (2) check that enough water is flowing through the spray pipes, and (3) stop the brushes if a person walks between them.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which sensor is most suitable for requirement (2)?", options: [["Flow sensor", "Correct: it measures the rate at which water moves through the pipe."], ["Level sensor", "It measures height in a container, not movement through a pipe."], ["Moisture sensor", "It measures water in a material such as soil."], ["Humidity sensor", "It measures water vapour in the air."]], answer: "A", explanation: "Flow sensors measure the rate of flow of a liquid or gas." }),
      P.manual({ label: "(b)", marks: 2, stem: "Identify a suitable sensor for requirement (1) and explain how it detects the car.", points: ["Pressure sensor (or magnetic field sensor / infra-red beam)", "Detects the weight of the car on the bay (or the metal changing the field / the car breaking the beam)"], modelAnswer: "A pressure sensor in the floor of the bay, which detects the weight of the car pressing on it." }),
      P.manual({ label: "(c)", marks: 2, stem: "Identify a suitable sensor for requirement (3) and explain why it is suitable.", points: ["Infra-red sensor (or proximity sensor)", "Detects body heat / a person breaking the beam (or nearness) without contact, so the brushes stop before anyone is hit"], modelAnswer: "An infra-red sensor, which detects the body heat of a person (or a broken beam) between the brushes, so they can be stopped before the person is touched." }),
      P.manual({ label: "(d)", marks: 1, stem: "State why the readings from the sensors must pass through an ADC.", points: ["Sensor readings are analogue and the microprocessor can only process digital data"], modelAnswer: "The readings are analogue, but the microprocessor only processes digital data." }),
    ],
    explanation: "Flow for water through pipes; pressure (or magnetic/infra-red) for the car; infra-red or proximity for a person; ADC for analogue readings.",
  });

  b.card("DEFINITION", "**Sensor**", "An input device that measures a physical property and sends the readings to a computer or microprocessor.");
  b.card("FACT", "Humidity vs moisture", "Humidity: water vapour in the air. Moisture: water in soil or another material.");
  b.card("FACT", "Accelerometer", "Measures acceleration and tilt: phone screen rotation, airbags, step counters.");
  b.card("FACT", "Proximity sensor", "Measures how close an object is without touching: parking sensors, phone screens near the ear.");
  b.card("FACT", "Infra-red sensor", "Detects heat given off by bodies or a broken infra-red beam: burglar alarms, automatic doors.");
  b.card("FACT", "Level, flow and pressure", "Level: height of liquid in a tank. Flow: rate of movement in a pipe. Pressure: force applied (weight of a car, tyre pressure).");
  b.card("FACT", "Gas, pH, acoustic, magnetic field", "Gas: e.g. methane, CO. pH: acidity. Acoustic: sound. Magnetic field: changes in a field (compass, door contacts).");
  b.card("CONCEPT", "Why an ADC is needed", "Sensor readings are analogue; the microprocessor only processes digital data.");
  b.card("CONCEPT", "Sensor, microprocessor, actuator", "The sensor measures; the microprocessor compares with stored values and decides; the actuator makes the change.");
});
