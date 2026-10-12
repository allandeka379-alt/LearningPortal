// Slice w1b: passive and active electronic components (acs.hardware.electronic-components, ZIMSEC Form 5).
import { concept, P, chk, ZIM, seriesR, parallelR } from "../lib.mjs";
import { mc, pm } from "../tables/w1b-q.mjs";

concept("acs.hardware.electronic-components", { file: "hardware/electronic-components", keyPrefix: "hardware.electronic-components", applies: ZIM }, (b) => {
  mc(b, 1, "RECALL", "In which unit is capacitance measured?",
    ["The farad", "Correct: the farad (F) is the unit of capacitance."],
    [["The ohm", "The ohm is the unit of resistance."], ["The henry", "The henry is the unit of inductance."], ["The ampere", "The ampere is the unit of current."]],
    "Resistance: ohm. Capacitance: farad. Inductance: henry. Current: ampere.");
  mc(b, 2, "UNDERSTANDING", "What is the main function of a diode?",
    ["To allow current to flow in one direction only", "Correct: it conducts when forward biased and blocks the reverse direction."],
    [["To store charge and release it later", "That is a capacitor."], ["To store energy in a magnetic field", "That is an inductor."], ["To make the current in a circuit smaller by a fixed amount", "That is the job of a resistor."]],
    "A diode has a low resistance in one direction and a very high resistance in the other.", { daily: true });
  mc(b, 2, "RECALL", "Which of these components is an active component?",
    ["A transistor", "Correct: it can switch or amplify."],
    [["A resistor", "A resistor is passive."], ["A capacitor", "A capacitor is passive."], ["An inductor", "An inductor is passive."]],
    "Resistors, capacitors and inductors are passive; diodes, transistors and ICs are active.", { daily: true });
  mc(b, 2, "APPLICATION", "A technician must measure the resistance of a resistor on a circuit board. What must be done first?",
    ["Isolate it with the power off", "Correct: other parts and the supply would otherwise give a false reading."],
    [["Connect the meter in series with the power supply", "That is how current is measured."], ["Switch the circuit on and run it at full power", "Measuring resistance with the power on gives false readings and can damage the meter."], ["Reverse the polarity of the supply", "Resistors are not polarised and the supply is not needed."]],
    "Resistance is measured with the power off and the component isolated.");
  mc(b, 3, "APPLICATION", "To measure the current through a lamp, where is the ammeter connected?",
    ["In series with the lamp", "Correct: all of the current must pass through the meter."],
    [["In parallel with the lamp across its two ends", "A meter across the lamp measures voltage, and an ammeter there would act as a short circuit."], ["Across the battery terminals at all times", "This would short the battery through the meter."], ["Next to the lamp but not in the circuit", "The meter must be part of the current path."]],
    "An ammeter has a very low resistance and is connected in series so the current passes through it.", { hints: ["Current is measured by letting it flow through the meter."] });
  mc(b, 3, "APPLICATION", "Rudo connects an LED directly to a 9 V battery without a resistor and it burns out at once. What is the reason?",
    ["Nothing limited the current through the LED", "Correct: an LED needs a series resistor to keep the current within its limit."],
    [["The LED was connected in parallel with a capacitor", "No capacitor was used."], ["The battery voltage was too low to light the LED", "A voltage too low would give no light, not damage."], ["The LED needs an alternating current to work", "An LED needs direct current in the forward direction."]],
    "An LED has a low resistance once it conducts, so the current is limited only by a series resistor.", { hints: ["What does the resistor do in an LED circuit?"] });
  mc(b, 3, "UNDERSTANDING", "How does a transistor act as a switch?",
    ["A small base current controls a larger collector current", "Correct: with no base current the transistor is off."],
    [["It stores charge on two plates and releases it later in short pulses", "That is how a capacitor works."], ["It lets current through only when the polarity of the supply is correct", "That describes a diode."], ["It gives out light whenever current passes through it", "That describes an LED."]],
    "The base current controls the collector current: no base current, no collector current.", { hints: ["Name the three leads first."] });
  mc(b, 4, "ANALYSIS", "A 12 Ω resistor and a 4 Ω resistor are connected in parallel. Which statement about the combined resistance must be true?",
    ["It is less than 4 Ω", "Correct: parallel resistance is always smaller than the smallest branch."],
    [["It is 16 Ω because the resistances add", "Adding is for series circuits."], ["It is 8 Ω, the average of the two", "The combined resistance is not the average."], ["It is 12 Ω, the larger of the two", "It cannot be larger than the smallest branch."]],
    "In parallel, 1 ÷ R = 1 ÷ 12 + 1 ÷ 4 = 4 ÷ 12, so R = 3 Ω, smaller than 4 Ω.", { hints: ["Extra branches give the current more paths."] });
  b.tf({ d: 2, skill: "RECALL", daily: true, stem: "An inductor stores energy in a magnetic field.", answer: true,
    explanation: "True. An inductor is a coil; the current in it creates a magnetic field which stores energy and opposes sudden changes of current." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Resistance should be measured with the circuit switched on so that the meter has a supply to work with.", answer: false,
    explanation: "False. The meter has its own battery. The circuit must be off and the component isolated, otherwise the supply and other components affect the reading." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each component to its function.",
    pairs: [["Resistor", "Limits the current"], ["Capacitor", "Stores charge"], ["Inductor", "Stores energy in a magnetic field"], ["LED", "Gives out light when current flows forward"], ["Transistor", "Switches or amplifies"]],
    explanation: "Each component has a distinct role; the first three are passive and the last two are active." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete Ohm's law.",
    template: "Voltage = {{blank:a}} × resistance. For a given voltage, a larger resistance gives a {{blank:b}} current. Resistances in series are {{blank:c}} to find the total.",
    blanks: [
      { id: "a", accepted: ["current"], choices: ["current", "power", "charge", "energy"] },
      { id: "b", accepted: ["smaller"], choices: ["smaller", "larger", "equal", "zero"] },
      { id: "c", accepted: ["added"], choices: ["added", "divided", "subtracted", "multiplied"] },
    ],
    explanation: "V = I × R, so I = V ÷ R: more resistance, less current. Series resistances add." });
  const rS = seriesR(150, 250);
  const iS = (6 / rS) * 1000;
  chk(iS, 15);
  b.calc({ d: 2, skill: "APPLICATION", unit: "mA", stem: "A 150 Ω resistor and a 250 Ω resistor are in series with a 6 V battery. Calculate the current in milliamperes.",
    value: iS, wrong: [0.015, 40],
    workedSolution: "1. Total resistance = 150 + 250 = 400 Ω.\n2. I = V ÷ R = 6 ÷ 400 = 0.015 A.\n3. 0.015 A = 15 mA.",
    explanation: "Current = 6 ÷ 400 = 0.015 A = 15 mA." });
  const rP = parallelR(12, 4);
  chk(rP, 3);
  b.calc({ d: 3, skill: "APPLICATION", unit: "ohms", hints: ["Use 1 ÷ R = 1 ÷ R1 + 1 ÷ R2."], stem: "Calculate the combined resistance of a 12 Ω resistor and a 4 Ω resistor connected in parallel.",
    value: rP, wrong: [16, 8],
    workedSolution: "1. 1 ÷ R = 1 ÷ 12 + 1 ÷ 4 = 1 ÷ 12 + 3 ÷ 12 = 4 ÷ 12.\n2. R = 12 ÷ 4 = 3 Ω.",
    explanation: "1 ÷ R = 4 ÷ 12, so R = 3 Ω." });
  const rLed = (5 - 2) / 0.01;
  chk(rLed, 300);
  b.calc({ d: 3, skill: "APPLICATION", unit: "ohms", hints: ["The resistor takes the voltage that the LED does not."],
    stem: "An LED needs 2 V across it and a current of 10 mA (0.01 A). It is powered from a 5 V supply. Calculate the value of the series resistor.",
    value: rLed, wrong: [500, 700],
    workedSolution: "1. Voltage across the resistor = 5 − 2 = 3 V.\n2. R = V ÷ I = 3 ÷ 0.01 = 300 Ω.",
    explanation: "R = (5 − 2) ÷ 0.01 = 300 Ω." });
  const v = 0.05 * 80;
  chk(v, 4);
  b.calc({ d: 2, skill: "APPLICATION", unit: "V", stem: "A current of 0.05 A flows through an 80 Ω resistor. Calculate the voltage across the resistor.",
    value: v, wrong: [1600, 0.000625],
    workedSolution: "1. V = I × R.\n2. V = 0.05 × 80 = 4 V.",
    explanation: "V = 0.05 × 80 = 4 V." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Name the three leads and say which current controls which."],
    stem: "Explain how a transistor can be used as a switch to turn on a buzzer from a weak signal. [3]",
    points: ["The weak signal is applied to the base", "A small base current allows a larger current to flow from collector to emitter", "The larger current powers the buzzer; with no base current the buzzer is off"],
    modelAnswer: "The weak signal is connected to the base. A small base current lets a much larger current flow between collector and emitter through the buzzer. With no signal the transistor is off and the buzzer is silent.",
    explanation: "Base signal, larger collector current, buzzer on or off." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 4, hints: ["Power, function, probes, result."],
    stem: "Describe how a technician uses a multimeter to test whether a fuse has blown. [4]",
    points: ["Switch off the power and remove the fuse", "Set the multimeter to the continuity (or resistance) setting", "Touch the probes to the two ends of the fuse", "A buzzer or a very low reading shows the fuse is good; no buzzer or an infinite reading shows it has blown"],
    modelAnswer: "Switch off and remove the fuse. Set the meter to continuity and touch the probes to the two ends. A buzzer means the fuse is good; no buzzer means it has blown.",
    explanation: "Isolate, set function, connect, interpret." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, hints: ["Think about heat, fumes and eyes."],
    stem: "State three safety precautions when soldering a component onto a circuit board. [3]",
    points: ["Place the hot iron in a stand when it is not in use", "Work in a ventilated place so the fumes are not breathed in", "Wear eye protection / unplug the iron when finished"],
    modelAnswer: "Keep the hot iron in its stand, work where there is good ventilation, and wear eye protection.",
    explanation: "Any three valid precautions." });
  const rPar = parallelR(30, 60);
  const rTot = seriesR(20, rPar);
  const iTot = 12 / rTot;
  const vR1 = iTot * 20;
  const vPar = 12 - vR1;
  chk(rPar, 20); chk(rTot, 40); chk(iTot, 0.3); chk(vR1, 6); chk(vPar, 6);
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Combine the parallel pair first, then add the series resistor.", "The parallel pair has the same voltage across each branch."],
    explanation: "Parallel pair 20 Ω, total 40 Ω, current 0.3 A, voltage across the series resistor 6 V so 6 V across the pair.",
    stem: "A 12 V battery is connected to a 20 Ω resistor (R1) in series with two resistors in parallel: R2 of 30 Ω and R3 of 60 Ω.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the combined resistance of R2 and R3 in parallel.", value: rPar, unit: "ohms", wrong: [90, 45],
        workedSolution: "1. 1 ÷ R = 1 ÷ 30 + 1 ÷ 60 = 2 ÷ 60 + 1 ÷ 60 = 3 ÷ 60.\n2. R = 60 ÷ 3 = 20 Ω.", explanation: "1 ÷ R = 3 ÷ 60 so R = 20 Ω." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the total resistance of the circuit.", value: rTot, unit: "ohms", wrong: [110, 20],
        workedSolution: "1. Total = R1 + parallel pair = 20 + 20 = 40 Ω.", explanation: "20 + 20 = 40 Ω." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the current from the battery, in amperes.", value: iTot, answer: "0.3", unit: "A", wrong: [0.6, 3.33],
        workedSolution: "1. I = V ÷ R = 12 ÷ 40.\n2. I = 0.3 A.", explanation: "12 ÷ 40 = 0.3 A." }),
      P.num({ label: "(d)", marks: 2, stem: "Calculate the voltage across R2.", value: vPar, unit: "V", wrong: [12, 9],
        workedSolution: "1. Voltage across R1 = 0.3 × 20 = 6 V.\n2. The pair shares the remaining 12 − 6 = 6 V.\n3. Voltage across R2 = 6 V.", explanation: "R1 takes 6 V, leaving 6 V across each branch of the pair." }),
      P.mcq({ label: "(e)", marks: 1, stem: "How does the current through R3 compare with the current through R2?", options: [["Smaller", "Correct: R3 has the larger resistance and the same voltage."], ["Larger", "More resistance gives less current for the same voltage."], ["Equal", "The currents are equal only if the resistances are equal."], ["Zero", "Both branches carry current."]], answer: "A", explanation: "Same 6 V across both, but 60 Ω gives half the current of 30 Ω." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Which tests need the power off?"],
    explanation: "Voltage is measured across a powered component, resistance and continuity with power off, and current in series.",
    stem: "A technician is repairing the power supply board of a school projector using a multimeter.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "How is the meter connected to measure the voltage across a component in a powered circuit?", options: [["Across the component", "Correct: voltage is measured in parallel."], ["In series with the component", "That is how current is measured."], ["Between the mains and the fuse only", "This is neither a standard test nor safe."], ["Not connected: the meter is held near the component", "The probes must make contact."]], answer: "A", explanation: "Voltage is measured across (in parallel with) the component." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the multimeter setting that gives an audible sign that a wire or track is unbroken.", accepted: ["continuity", "continuity test"], wrong: ["voltage"], explanation: "The continuity setting beeps when the path is complete." }),
      P.manual({ label: "(c)", marks: 2, stem: "A new electrolytic capacitor and a diode are to be fitted. Explain why their orientation matters.", points: ["Both are polarised, so they only work correctly one way round", "Fitting them backwards can damage the component or the circuit"], modelAnswer: "A diode and an electrolytic capacitor are polarised. If they are fitted backwards the diode will not conduct as intended and the capacitor can be damaged.", explanation: "Polarity and the risk of damage." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two safety precautions before removing a faulty component from the board.", points: ["Switch off and unplug the equipment", "Allow capacitors to discharge / let hot parts cool"], modelAnswer: "Switch off and unplug the equipment, and wait for the capacitors to discharge and hot parts to cool.", explanation: "Isolation and discharge." }),
    ] });
  b.card("DEFINITION", "Passive component", "Does not need a supply to work and cannot switch or amplify: resistor, capacitor, inductor.");
  b.card("DEFINITION", "Active component", "Controls current and can switch or amplify: diode, LED, transistor, integrated circuit.");
  b.card("FACT", "Units", "Resistance: ohm. Capacitance: farad. Inductance: henry. Current: ampere. Voltage: volt.");
  b.card("FORMULA", "Ohm's law", "V = I × R, so I = V ÷ R and R = V ÷ I.");
  b.card("FORMULA", "Series and parallel resistance", "Series: R = R1 + R2 + R3. Parallel: 1 ÷ R = 1 ÷ R1 + 1 ÷ R2 + 1 ÷ R3.");
  b.card("FORMULA", "LED series resistor", "R = (supply voltage − LED voltage) ÷ LED current.");
  b.card("CONCEPT", "Transistor as a switch", "A small base current allows a larger current between collector and emitter; no base current means off.");
  b.card("CONCEPT", "Multimeter tests", "Voltage across, current in series, resistance and continuity with the power off.");
  b.card("FACT", "Polarised parts", "Diode, LED, electrolytic capacitor and IC must be fitted the right way round.");
});
