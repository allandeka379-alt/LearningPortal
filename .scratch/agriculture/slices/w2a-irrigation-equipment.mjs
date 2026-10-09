// Slice W2a: irrigation equipment (ZIMSEC only).
import { concept, P, round, check, table, agricultureLevels } from "../lib.mjs";

// Calc: sprinkler application rate 1,620 L/h on 18 m x 12 m.
const area1 = 18 * 12;
const rate1 = 1620 / area1;
const hours1 = 30 / rate1;
check(area1 === 216 && rate1 === 7.5 && hours1 === 4, "rate1");
// Num: emitters on a line and flow.
const em2 = 40 / 0.25;
const flowLine2 = em2 * 1.6;
const flowAll2 = flowLine2 * 15;
check(em2 === 160 && Math.abs(flowLine2 - 256) < 1e-9 && Math.abs(flowAll2 - 3840) < 1e-9, "drip2");
// Num: sprinklers on a lateral.
const spr3 = 108 / 18;
check(spr3 === 6, "spr3");

// Structured: fault-finding table.
const FAULTS = [["1", "Several drippers at the far end give no water", "Screen filter not cleaned for six weeks"], ["2", "Pressure gauge reads much lower than usual; water pooling near a joint", "—"], ["3", "A sprinkler stays pointing in one direction", "Spring on the swinging arm is broken"]];
const F_TABLE = table(["Fault", "What the farmer sees", "Note"], FAULTS);

concept("agri.water.irrigation-equipment", { file: "water/irrigation-equipment", keyPrefix: "water.irrigation-equipment" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the function of a **riser** in a sprinkler system?",
    options: [
      ["It holds the sprinkler above the crop canopy", "Correct."],
      ["It lets trapped air out of the pipes as they fill", "That is an air-release valve."],
      ["It stops water flowing back into the pump", "That is a non-return valve."],
      ["It removes silt from the water before it reaches the sprinklers", "That is a filter."],
    ],
    answer: "A",
    explanation: "A riser is a short vertical pipe that holds the sprinkler above the crop canopy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which device lets water flow in one direction only, protecting a pump from backflow?",
    options: [
      ["A non-return (check) valve", "Correct."],
      ["A gate valve fitted on the main line", "A gate valve turns flow on and off in either direction."],
      ["A reducer between the pump and the main", "A reducer joins pipes of different sizes."],
      ["A hydrant", "A hydrant is an outlet for connecting laterals."],
    ],
    answer: "A",
    explanation: "A non-return valve closes if water tries to flow back.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which pipe material is usually buried for main lines because it becomes brittle in sunlight?",
    options: [
      ["PVC", "Correct: rigid PVC is buried to protect it from UV light."],
      ["Black polyethylene", "It is flexible and better at resisting sunlight."],
      ["Aluminium", "Aluminium is used above ground for portable laterals."],
      ["Galvanised steel, which rusts when buried", "Steel is used for risers and pump connections."],
    ],
    answer: "A",
    explanation: "Rigid PVC is light and cheap but degrades in sunlight, so it is buried.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which fitting is used where a lateral branches off a main line at right angles?",
    options: [
      ["A tee", "Correct: a tee makes a branch."],
      ["A coupling", "A coupling joins two pipes in a straight line."],
      ["An end cap", "An end cap closes a pipe."],
      ["A reducer", "A reducer changes the pipe size."],
    ],
    answer: "A",
    explanation: "Tees create branches; elbows change direction; couplings join; reducers change size.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer installs a new drip system and fits the emitters before running water through the pipes. Several emitters block on the first day. What should have been done?",
    options: [
      ["The pipes should have been flushed first", "Correct: flushing removes soil and debris."],
      ["The emitters should have been fitted upside down so dirt falls out", "Orientation does not stop debris."],
      ["The filter should have been removed", "Removing the filter makes blocking worse."],
      ["The pressure should have been doubled", "Higher pressure can damage drippers."],
    ],
    answer: "A",
    hints: ["What is left inside new pipes after cutting and joining them?"],
    explanation: "Flushing clears soil and plastic shavings left during assembly.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why are pressure-compensating emitters used on long drip lines laid on sloping ground?",
    options: [
      ["They keep the flow equal along the line", "Correct."],
      ["They filter the water as it leaves the line", "Emitters do not filter water."],
      ["They inject fertiliser into the water", "That is the injector's job."],
      ["They raise the water pressure at the far, uphill end of the line", "They do not increase pressure."],
    ],
    answer: "A",
    hints: ["Pressure falls with distance and changes with height."],
    explanation: "Pressure varies along long or sloping lines; pressure-compensating emitters keep each plant's supply equal.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How does a siphon tube move water from a canal into a furrow?",
    options: [
      ["Once filled, it flows because the canal level is above the outlet", "Correct."],
      ["A small pump inside the tube pushes the water", "Siphons have no pump."],
      ["The dry soil of the furrow sucks water out of the canal by capillarity", "Capillarity is far too slow."],
      ["Wind blows water through the tube", "Wind plays no part."],
    ],
    answer: "A",
    hints: ["Compare the water level in the canal with the outlet."],
    explanation: "A filled siphon keeps flowing while the outlet is below the canal water surface.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "The pressure gauge on a sprinkler system suddenly reads much lower than usual, and the sprinklers throw water only a short distance. What is the most likely cause?",
    options: [
      ["Water is escaping from a leak", "Correct: a leak lowers pressure."],
      ["The filter is perfectly clean", "A clean filter would not cause low pressure."],
      ["The springs on the sprinkler arms are too strong", "Springs affect rotation, not system pressure."],
      ["The weather is too hot", "Heat does not suddenly lower pipe pressure."],
    ],
    answer: "A",
    hints: ["Where could water be escaping?"],
    explanation: "A sudden pressure drop usually means a leak; a gradual rise in pressure before a filter means it is blocking.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A filter is an essential part of a drip irrigation system.",
    answer: true,
    explanation: "True. Without filtering, emitters block quickly.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Portable aluminium pipes should be stored lying on the ground in the open after the season.",
    answer: false,
    explanation: "False. They should be drained and stored on racks under cover, away from damage.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item of equipment with its function.",
    pairs: [
      ["Hydrant", "Outlet on a buried main for connecting a lateral"],
      ["Air-release valve", "Lets trapped air out of the pipes"],
      ["Pressure regulator", "Keeps pressure at the level the emitters need"],
      ["Gated pipe", "Releases water into each furrow through small openings"],
      ["Reducer", "Joins a large pipe to a smaller one"],
    ],
    explanation: "Know each part by name and function.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Water flows from the main line through sub-mains into the {{blank:a}}, which carry it along the crop rows. On an impact sprinkler, the jet strikes a swinging {{blank:b}} that turns the sprinkler.",
    blanks: [
      { id: "a", accepted: ["laterals", "lateral", "lateral lines", "lateral pipes"] },
      { id: "b", accepted: ["arm"] },
    ],
    explanation: "Laterals; arm.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Sprinklers are spaced 18 m apart along laterals that are 12 m apart. Each sprinkler discharges 1,620 L/h. Calculate how many hours are needed to apply 30 mm of water.",
    value: hours1, unit: "h", tol: 0.05, wrong: [rate1 * 30, round(1620 / 30, 0)],
    hints: ["Area per sprinkler = spacing × spacing.", "1 L/m² = 1 mm."],
    explanation: `Area = 18 × 12 = ${area1} m²; rate = 1,620 ÷ ${area1} = ${rate1} mm/h; time = 30 ÷ ${rate1} = ${hours1} h.`,
    workedSolution: `1. Area watered by one sprinkler = 18 × 12 = ${area1} m².\n2. Application rate = 1,620 L/h ÷ ${area1} m² = ${rate1} mm/h.\n3. Time = 30 mm ÷ ${rate1} mm/h = ${hours1} h.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A plot has 15 drip lines, each 40 m long, with an emitter every 0.25 m. Each emitter delivers 1.6 L/h. Calculate the total flow for the plot, in litres per hour.",
    value: flowAll2, tol: 0, wrong: [40 * 0.25 * 1.6 * 15, flowLine2],
    hints: ["Emitters per line = length ÷ spacing."],
    explanation: `Emitters per line = 40 ÷ 0.25 = ${em2}; per line ${em2} × 1.6 = ${flowLine2} L/h; 15 lines × ${flowLine2} = ${flowAll2.toLocaleString("en-GB")} L/h. Multiplying 40 by 0.25 instead of dividing gives far too few emitters.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A lateral is 108 m long and sprinklers are placed every 18 m, the first 9 m from the start. How many sprinklers are on the lateral?",
    value: spr3, tol: 0, wrong: [spr3 + 1, 108 * 18],
    explanation: `Sprinklers at 9, 27, 45, 63, 81 and 99 m: 108 ÷ 18 = ${spr3}.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the device that adds dissolved fertiliser to the water in a drip system.",
    accepted: ["fertiliser injector", "injector", "venturi", "venturi injector", "fertilizer injector", "fertigation injector", "dosing pump"],
    explanation: "A **fertiliser injector** (for example a venturi).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** routine maintenance tasks for a drip irrigation system.",
    hints: ["Think of the filter, the lines, leaks and storage."],
    points: [
      "Clean the filter regularly.",
      "Flush the drip lines by opening the end caps.",
      "Check for and repair leaks / damaged lines; replace blocked emitters.",
      "Protect lines from rodents, sun and machinery / treat lines to remove algae or salt deposits.",
    ],
    modelAnswer: "Clean the screen or disc filter regularly; open the end caps and flush each drip line; walk the lines to find and repair leaks and replace blocked emitters; and protect the lines from rodents, livestock and machinery, treating them to remove algae or salt deposits when needed.",
    explanation: "Specific actions linked to parts.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `Sipho's irrigation equipment near Chipinge has three faults.\n\n${F_TABLE}`,
    hints: ["Link each symptom to the part that controls it."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why fault 1 has occurred.",
        points: ["The dirty filter let silt or debris pass / restricted the flow.", "So emitters at the far end (lowest pressure) blocked or received no water."],
        explanation: "Uncleaned filters cause blockages and low flow.",
      }),
      P.short({
        label: "(b)", stem: "Name the likely cause of fault 2.",
        accepted: ["leak", "a leak", "leaking joint", "burst pipe", "leaking pipe", "a leaking joint", "broken washer", "worn washer"],
        keywords: { any: ["leak", "burst", "washer"] },
        explanation: "A leaking joint or burst pipe lowers the pressure.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe how Sipho should repair fault 2.",
        points: ["Close the valve / turn off the supply first.", "Remake the joint with a new washer or seal / replace the cracked section with a coupling, then test for leaks."],
        explanation: "Safe, specific repair.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "State the effect of fault 3 on the crop.",
        points: ["Only one strip is watered, so the rest of the circle gets no water (uneven watering, dry patches)."],
        explanation: "No rotation means no even coverage.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** routine checks that would have prevented these faults.",
        points: ["Clean filters on a schedule (e.g. weekly).", "Check the gauge, joints and sprinklers each time the system runs / replace worn washers and springs."],
        explanation: "Routine inspection.",
      }),
    ],
    explanation: "Fault-finding links each symptom to the part responsible.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "A sprinkler system on a farm near Gweru is described in order from the source: a pump with a non-return valve; a buried PVC main line with three hydrants; portable aluminium laterals with quick couplings; impact sprinklers on risers spaced 12 m apart.",
    hints: ["Think about why each part is chosen."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why the main line is PVC and buried, while the laterals are aluminium.",
        points: ["PVC is cheap and smooth but brittle in sunlight, so it is buried (and out of the way of machinery).", "Aluminium laterals are light and strong with quick couplings, so they can be moved from hydrant to hydrant."],
        explanation: "Match material to function.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "State the functions of the hydrants and the non-return valve.",
        points: ["Hydrants: outlets on the main for connecting (and controlling) the laterals.", "Non-return valve: stops water flowing back into the pump."],
        explanation: "Functions of valves.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the sprinkler circles are made to overlap.",
        points: ["Each sprinkler applies less water near the edge of its circle.", "Overlapping gives even watering across the field."],
        explanation: "Even distribution.",
      }),
    ],
    explanation: "Each part has a function that explains its material and position.",
  });

  b.card("DEFINITION", "Lateral", "Smaller pipe branching from the main or sub-main, carrying water along the rows to sprinklers or emitters.");
  b.card("DEFINITION", "Riser", "Short vertical pipe that holds a sprinkler above the crop.");
  b.card("DEFINITION", "Emitter (dripper)", "Releases water slowly at a set rate (L/h) to each plant's root zone.");
  b.card("FACT", "Pipe materials", "PVC: buried mains. Polyethylene: laterals, drip lines. Aluminium: portable laterals. Galvanised steel: risers.");
  b.card("CONCEPT", "Fittings", "Coupling joins; elbow turns; tee branches; reducer changes size; end cap closes.");
  b.card("CONCEPT", "Valves", "Gate/ball valve on-off; hydrant outlet; non-return protects pump; air-release lets air out; regulator steadies pressure.");
  b.card("FORMULA", "Sprinkler application rate", "mm/h = sprinkler discharge (L/h) ÷ area per sprinkler (m²).");
  b.card("CONCEPT", "Parts of a drip system", "Filter, fertiliser injector, pressure regulator, drip lines, emitters, flushing end caps.");
  b.card("CONCEPT", "Caring for irrigation equipment", "Flush before use, clean filters, fix leaks, replace worn nozzles and washers, store pipes under cover.");
});
