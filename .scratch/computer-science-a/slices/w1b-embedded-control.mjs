// Slice w1b: embedded systems, monitoring and control (acs.hardware.embedded-control, Cambridge AS).
import { concept, P, chk, CAM, bin, twos } from "../lib.mjs";
import { mc, pm } from "../tables/w1b-q.mjs";

// Tank pump: ON below 40, OFF at 90 or above, unchanged in between (mirror of the question text).
function pumpRun(levels, low, high) {
  let on = false;
  return levels.map((l) => {
    if (l < low) on = true;
    else if (l >= high) on = false;
    return on;
  });
}
// Soil moisture valve: OPEN below 30, CLOSED above 50.
function valveRun(vals) {
  let open = false;
  return vals.map((v) => {
    if (v < 30) open = true;
    else if (v > 50) open = false;
    return open ? "OPEN" : "CLOSED";
  });
}

concept("acs.hardware.embedded-control", { file: "hardware/embedded-control", keyPrefix: "hardware.embedded-control", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "Which description fits an embedded system?",
    ["A microprocessor built into a device to do one job", "Correct: it has a dedicated function and a fixed program."],
    [["A general-purpose computer on which the user installs software", "That describes a desktop or laptop computer."], ["A network of computers that share a printer", "That is a local area network, not an embedded system."], ["A program that translates source code into machine code", "That is a translator, which is software."]],
    "An embedded system is a computer built into a larger device and dedicated to one function.");
  mc(b, 2, "RECALL", "Which of these is an actuator?",
    ["A motor that opens a gate", "Correct: an actuator produces a physical action."],
    [["A thermistor that measures temperature", "A thermistor is a sensor."], ["A moisture probe in the soil", "A moisture probe is a sensor."], ["An infra-red detector at a door", "An infra-red detector is a sensor."]],
    "Actuators act (motors, heaters, valves, buzzers); sensors measure.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "A fridge in a clinic has a unit that records the temperature every hour on a display but cannot change it. What type of system is this?",
    ["A monitoring system", "Correct: it measures and records but does not act on the process."],
    [["A control system with a heater actuator", "There is no actuator that changes the temperature."], ["A closed-loop control system with feedback", "Nothing the unit does affects the next reading."], ["An actuator", "An actuator is a device, not a type of system."]],
    "A monitoring system records or displays; it does not change the process.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why is an analogue-to-digital converter placed between a temperature sensor and the microprocessor?",
    ["The sensor gives a varying voltage and the processor needs binary numbers", "Correct: the ADC converts the analogue signal to digital."],
    [["The sensor gives binary numbers that are too large for the processor", "The sensor output is an analogue voltage."], ["The processor needs the sensor signal to be amplified to switch the heater", "Amplifying is not the job of the ADC."], ["The ADC stores the readings permanently for the user", "An ADC converts; it does not store."]],
    "Sensors give continuously varying voltages; only digital values can be processed.");
  mc(b, 3, "UNDERSTANDING", "In a control system, what is meant by feedback?",
    ["The result of the action is sensed as the next input", "Correct: the new value is sensed so the system can correct itself."],
    [["The user is shown the final result on a display screen", "That is output to the user; feedback is within the system."], ["The processor sends its result to a printer or speaker", "That is ordinary output."], ["The program is copied from ROM into RAM at start-up", "That is loading a program."]],
    "Feedback closes the loop: the sensor measures the result of the actuator's action.", { hints: ["Think about what the sensor reads on the next cycle."] });
  mc(b, 3, "ANALYSIS", "A greenhouse heater is switched on below 18 °C and switched off above 23 °C. What is the reason for using two different limits?",
    ["It stops rapid switching near the limit", "Correct: between the limits the heater stays as it is."],
    [["It allows the ADC to use fewer bits for every reading", "The ADC resolution is not affected by the limits."], ["It lets the sensor work without a power supply", "A sensor still needs its supply."], ["It means no feedback is needed for the loop", "The loop still needs feedback to work."]],
    "Using two limits (hysteresis) avoids constant switching of the heater and reduces wear.", { hints: ["What would happen if the on and off limits were the same value?"] });
  mc(b, 3, "APPLICATION", "An automatic door at a shop in Mutare opens when a customer walks up to it. Which sensor is most suitable?",
    ["An infra-red sensor", "Correct: it detects a person's heat or an interrupted beam."],
    [["A moisture sensor", "Moisture sensors detect water, not people."], ["A sound sensor", "Noise does not reliably show that someone is at the door."], ["A pressure sensor on the roof", "Pressure on the roof is not caused by a customer approaching."]],
    "Presence detection uses infra-red (or a pressure mat on the floor).", { hints: ["Which sensor detects a person at a distance?"] });
  mc(b, 4, "EVALUATION", "A manufacturer builds the controller of a washing machine as an embedded system. Which is a drawback of that choice?",
    ["The functions cannot easily be changed or upgraded by the owner", "Correct: the program is fixed for one purpose."],
    [["The controller uses much more power than a general computer", "Embedded systems usually use very little power."], ["The controller needs a large amount of memory for its program", "The program is small and fixed."], ["The controller is much more expensive than a general computer", "Mass-produced microcontrollers are cheap."]],
    "A fixed function is both the strength and the weakness: it is cheap and reliable but hard to upgrade.", { hints: ["What does 'dedicated' take away from the user?"] });
  b.tf({ d: 2, skill: "RECALL", stem: "A monitoring system always contains at least one actuator.", answer: false,
    explanation: "False. A monitoring system measures and reports or records. Actuators are part of control systems." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In a closed-loop control system the sensor measures the effect of the actuator's action.", answer: true,
    explanation: "True. This is feedback: the result of the action changes the sensor reading used on the next cycle." });
  b.match({ d: 2, skill: "APPLICATION", stem: "Match each task to the most suitable sensor.",
    pairs: [["Switch on street lights at dusk", "Light sensor"], ["Warn that a tank is about to overflow", "Moisture sensor"], ["Start an alarm when a window breaks", "Sound sensor"], ["Keep an incubator at a set temperature", "Temperature sensor"], ["Detect a vehicle on a road by weight", "Pressure sensor"]],
    explanation: "Match what is being measured: light, water, noise, heat and force." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the control cycle.",
    template: "A {{blank:a}} measures a quantity. An {{blank:b}} converts the voltage to a binary value. The {{blank:c}} compares it with the stored limit and signals an {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["sensor"], choices: ["sensor", "actuator", "buffer", "heater"] },
      { id: "b", accepted: ["ADC"], choices: ["ADC", "DAC", "ROM", "valve"] },
      { id: "c", accepted: ["microprocessor"], choices: ["microprocessor", "speaker", "sensor", "motor"] },
      { id: "d", accepted: ["actuator"], choices: ["actuator", "sensor", "ADC", "buffer"] },
    ],
    explanation: "Sensor, ADC, microprocessor, actuator." });
  // 4-bit ADC over 0 to 3.2 V: step 0.2 V
  const reading = Math.round(2.0 / (3.2 / 16));
  chk(reading, 10);
  b.bits({ d: 3, skill: "APPLICATION", value: reading, width: 4, calculator: false, hints: ["Step = range ÷ 2^4; reading = voltage ÷ step."],
    stem: "A 4-bit ADC converts voltages from 0 V to 3.2 V. Each step is 0.2 V. Write the 4-bit binary reading for an input of 2.0 V.",
    explanation: "Step = 3.2 ÷ 16 = 0.2 V. Reading = 2.0 ÷ 0.2 = 10, which is 1010 in binary." });
  b.num({ d: 2, skill: "APPLICATION", calculator: false, stem: "A 10-bit ADC is used with a pressure sensor. How many different readings can it give?",
    value: 2 ** 10, wrong: [10, 100], workedSolution: "1. An n-bit ADC gives 2^n readings.\n2. 2^10 = 1024.", explanation: "2^10 = 1024 different readings." });
  const stepV = 5.12 / 256;
  chk(stepV, 0.02);
  b.num({ d: 3, skill: "APPLICATION", calculator: false, unit: "V", hints: ["Step = voltage range ÷ number of readings."],
    stem: "An 8-bit ADC covers a range from 0 V to 5.12 V. What voltage does one step represent? Give your answer in volts.",
    value: stepV, answer: "0.02", wrong: [0.5, 0.002], workedSolution: "1. Readings = 2^8 = 256.\n2. Step = 5.12 ÷ 256 = 0.02 V.", explanation: "5.12 ÷ 256 = 0.02 V (20 mV)." });
  const levels = [30, 45, 62, 80, 91, 85, 70, 55, 38, 25];
  const pump = pumpRun(levels, 40, 90);
  const onCount = pump.filter(Boolean).length;
  b.num({ d: 4, skill: "ANALYSIS", calculator: false, hints: ["The pump switches on below 40, off at 90 or above, and keeps its state in between."],
    stem: "A borehole pump controller reads the water level in a tank every minute. The pump is switched ON if the level is below 40 and OFF if the level is 90 or above; between 40 and 89 the pump keeps its previous state. The pump is OFF at the start. The ten readings are 30, 45, 62, 80, 91, 85, 70, 55, 38, 25. For how many of the ten readings is the pump ON after the reading has been processed?",
    value: onCount, wrong: [2, 10],
    workedSolution: `1. 30: below 40, ON.\n2. 45, 62, 80: between the limits, stays ON.\n3. 91: 90 or above, OFF.\n4. 85, 70, 55: stays OFF.\n5. 38: below 40, ON. 25: stays ON.\n6. ON after readings 1, 2, 3, 4, 9 and 10: ${onCount} readings.`,
    explanation: `The pump is ON after readings 1 to 4, then OFF for readings 5 to 8, then ON for readings 9 and 10: ${onCount} readings in total.` });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Sensor, ADC, comparison, actuator."],
    stem: "Describe how a microprocessor controls the pump of a borehole so that the tank does not run dry. [4]",
    points: ["A level sensor measures the water level in the tank", "An ADC converts the sensor signal to a digital value", "The microprocessor compares the value with the stored lower limit", "If the level is too low, a signal switches on the pump motor (the actuator); the process repeats"],
    modelAnswer: "A level sensor measures the water. An ADC converts the signal to a number. The microprocessor compares it with the stored limit and, if the water is too low, signals the motor to start the pump. The cycle repeats and the new level is read.",
    explanation: "Sensor, conversion, comparison and action." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Use one example of each type of system."],
    stem: "Explain the difference between a monitoring system and a control system, giving an example of each. [3]",
    points: ["A monitoring system only measures and records or displays the values", "A control system uses the values to switch actuators and change the process", "Example of each, such as a fridge temperature logger and a greenhouse heater controller"],
    modelAnswer: "A monitoring system only measures and displays values, such as a fridge logger. A control system uses the values to drive actuators and change the process, such as a greenhouse heater controller.",
    explanation: "Definition of each plus examples." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Two benefits and two drawbacks, each linked to a smart meter."],
    stem: "A power company fits a smart meter, an embedded system, in each house. Evaluate the use of an embedded system for this purpose. [4]",
    points: ["Benefit: low cost to produce in large numbers", "Benefit: reliable and uses little power because the program is simple and fixed", "Drawback: cannot easily be upgraded or reprogrammed", "Drawback: if connected to a network, security faults may be hard to correct"],
    modelAnswer: "Embedded meters are cheap to make in large numbers and reliable with low power use. However, they are difficult to upgrade, and if they are on a network, faults in security may be hard to patch.",
    explanation: "Two benefits and two drawbacks, each in context." });
  const vals = [36, 27, 19, 52, 33];
  const states = valveRun(vals);
  chk(states.filter((s) => s === "OPEN").length, 2);
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["The valve opens below 30 and closes above 50. Between those values it keeps its state."],
    explanation: "Trace: the valve is CLOSED at 36, opens at 27 and stays open at 19, closes at 52 and stays closed at 33.",
    stem: "A farm in Masvingo uses a soil moisture sensor to control an irrigation valve. The valve is closed at the start. A reading below 30 opens it; a reading above 50 closes it; otherwise it keeps its state. Five readings are taken: 36, 27, 19, 52 and 33.",
    parts: [
      P.fib({ label: "(a)", marks: 5, stem: "State whether the valve is OPEN or CLOSED after each reading.",
        template: "36: {{blank:r1}}\n\n27: {{blank:r2}}\n\n19: {{blank:r3}}\n\n52: {{blank:r4}}\n\n33: {{blank:r5}}",
        blanks: states.map((s, i) => ({ id: `r${i + 1}`, accepted: [s], choices: ["OPEN", "CLOSED"] })),
        explanation: `The states are ${states.join(", ")}.` }),
      P.short({ label: "(b)", marks: 1, stem: "Name the actuator in this system.", accepted: ["valve", "the valve", "irrigation valve", "motor that opens the valve"], wrong: ["sensor"], explanation: "The valve is the actuator." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the system uses two different moisture limits.", points: ["So the valve does not open and close repeatedly when the moisture is near one limit", "Between the limits the valve keeps its state, which reduces wear and wasted water"], modelAnswer: "With two limits the valve does not switch continuously around a single value. It keeps its state between them, which reduces wear.", explanation: "Hysteresis prevents constant switching." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Think about cost, size, power and flexibility."],
    explanation: "A smart meter is a dedicated embedded system: cheap and low-power, but difficult to upgrade.",
    stem: "A smart electricity meter is an embedded system with a temperature sensor inside, a microprocessor and a display.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which statement describes an embedded system?", options: [["It has one dedicated function", "Correct."], ["It runs any software the user installs", "That describes a general-purpose computer."], ["It has no processor", "Embedded systems contain a processor."], ["It cannot contain memory", "It contains memory for its program and data."]], answer: "A", explanation: "An embedded system has a dedicated function." }),
      P.manual({ label: "(b)", marks: 2, stem: "State two benefits of using an embedded system in the meter.", points: ["Low cost to produce", "Low power consumption / small size / reliable"], modelAnswer: "It is cheap to make and uses little power.", explanation: "Any two valid benefits." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two drawbacks of using an embedded system in the meter.", points: ["Difficult to upgrade or add functions", "Limited processing power / difficult to repair"], modelAnswer: "It is hard to upgrade and has limited processing power.", explanation: "Any two valid drawbacks." }),
      P.short({ label: "(d)", marks: 1, stem: "Write out in full the abbreviation ADC.", accepted: ["analogue to digital converter", "analogue-to-digital converter", "analog to digital converter", "analogue to digital conversion"], wrong: ["actuator digital circuit"], explanation: "ADC stands for analogue-to-digital converter." }),
    ] });
  b.card("DEFINITION", "Embedded system", "A computer built into a larger device to perform one dedicated function with a fixed program.");
  b.card("CONCEPT", "Monitoring against control", "Monitoring measures and records or displays. Control also compares with limits and uses actuators to change the process.");
  b.card("DEFINITION", "Sensor", "An input device that measures a physical quantity and produces an electrical signal.");
  b.card("DEFINITION", "Actuator", "An output device that produces a physical action, such as a motor, heater, valve or buzzer.");
  b.card("CONCEPT", "Role of the ADC", "Converts the sensor's analogue voltage to a binary value for the microprocessor.");
  b.card("FORMULA", "ADC step", "Step = voltage range ÷ 2^n for an n-bit ADC.");
  b.card("DEFINITION", "Feedback", "Using the result of an action as the next input so that a system can correct itself (closed loop).");
  b.card("CONCEPT", "Two limits", "Switch on below the lower limit and off above the upper one; between them keep the state to stop rapid switching.");
});
