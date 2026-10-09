// Slice w2b: robotics (comp.emerging.robotics).
import { concept, P } from "../lib.mjs";

concept("comp.emerging.robotics", { file: "emerging/robotics", keyPrefix: "emerging.robotics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **robotics**?",
    options: [
      ["The design, construction and operation of robots", "Correct: this is the accepted meaning."],
      ["The simulation of intelligent behaviour by computers", "That describes artificial intelligence."],
      ["The use of sensors to collect weather data", "That is data logging or an automated system."],
      ["The process of writing programs in a low-level language", "That is low-level programming, not robotics."],
    ],
    answer: "A",
    explanation: "Robotics deals with designing, building and operating robots.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is one of the characteristics of a robot?",
    options: [
      ["It can be programmed and reprogrammed", "Correct: programmability is a defining characteristic."],
      ["It must look like a human being", "Most robots look nothing like people."],
      ["It must be able to talk", "Speech is not required."],
      ["It must work without electricity", "Robots need electrical components."],
    ],
    answer: "A",
    explanation: "A robot has a mechanical structure, electrical components (sensors, microprocessor, actuators) and is programmable.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a robot arm that welds car bodies, which component makes the arm move?",
    options: [
      ["The actuators, such as electric motors", "Correct: actuators produce the movement."],
      ["The sensors, such as cameras", "Sensors gather information; they do not move the arm."],
      ["The program stored in memory", "The program decides; it needs actuators to act."],
      ["The welding torch at the end of the arm", "That is the end effector; it does the welding, not the moving."],
    ],
    answer: "A",
    explanation: "Motors or hydraulic and pneumatic cylinders (actuators) move the joints of the arm.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which task is a robot **most** suitable for?",
    options: [
      ["Spray painting cars in a booth filled with toxic fumes", "Correct: repetitive, precise and hazardous to people."],
      ["Comforting a patient who has received bad news", "This needs human empathy."],
      ["Deciding the school's new policy on uniforms", "This needs human judgement and discussion."],
      ["Writing a poem for a national competition", "This is a creative human task."],
    ],
    answer: "A",
    explanation: "Robots excel at repetitive, precise or dangerous tasks.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a **drone**?",
    options: [
      ["An unmanned aircraft controlled remotely or by its own program", "Correct: drones are flying robots."],
      ["A robot arm fixed to a factory floor", "That is an industrial robot arm."],
      ["A type of sensor that measures height", "A drone is a whole aircraft, not a sensor."],
      ["A computer program that flies aeroplanes in a flight-simulator game", "A drone is a physical aircraft."],
    ],
    answer: "A",
    explanation: "Drones carry sensors such as cameras and GPS and are used in agriculture, delivery and surveying.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Check all three characteristics: structure, electrical components, programmable."],
    stem: "Which of these is a robot?",
    options: [
      ["A lawn mower that maps the garden and mows it on a programmed schedule", "Correct: body, sensors, microprocessor, motors and programmable."],
      ["A television remote control with infrared buttons", "No moving mechanical structure or actuators."],
      ["A digital thermometer that records the room temperature and shows it on a small screen", "It only measures; it has no actuators."],
      ["A calculator that solves equations", "No mechanical structure or actuators."],
    ],
    answer: "A",
    explanation: "Only the robotic lawn mower has a mechanical structure, sensors, a microprocessor, actuators and a program.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which statement is a drawback rather than a benefit?"],
    stem: "Which is a **disadvantage** of using robots on a packaging line?",
    options: [
      ["Workers doing repetitive packing jobs may lose their jobs", "Correct: robots can replace unskilled labour."],
      ["The robots can keep packing for 24 hours a day", "This is an advantage."],
      ["Each box is packed in exactly the same way every time", "Consistency is an advantage."],
      ["The robots do not get bored or tired", "This is an advantage."],
    ],
    answer: "A",
    explanation: "Disadvantages include cost, unemployment, inflexibility and breakdowns.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["What happens when something unexpected happens that the program did not foresee?"],
    stem: "A robot in a warehouse in Harare stops when a fallen box blocks its path. What does this show about robots?",
    options: [
      ["They can only respond to situations they are programmed for", "Correct: robots act on programs and sensor data."],
      ["Their sensors do not work in warehouses", "The robot sensed the box; the sensors worked."],
      ["They need a person to move every item for them", "The robot normally moves items itself."],
      ["They have a faulty mechanical structure that makes them stop suddenly", "Stopping safely is designed behaviour, not a mechanical fault."],
    ],
    answer: "A",
    explanation: "Robots lack general judgement; unexpected situations need human help or extra programming.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A robot must look like a human being.",
    answer: false,
    explanation: "False. Robots are shaped for their task: arms, vehicles, drones and discs are all robots.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In robotic surgery the surgeon usually controls the robot's instruments, so the robot is dependent rather than independent.",
    answer: true,
    explanation: "True. The surgeon guides the robot, which gives steadier, more precise movements.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each robot to the area in which it is used.",
    pairs: [
      ["Weeding robot that removes weeds between rows of maize", "Agriculture"],
      ["Arm that welds car bodies", "Industry"],
      ["Driverless delivery vehicle", "Transport"],
      ["Instrument arm guided during an operation", "Medicine"],
      ["Robot vacuum cleaner", "Domestic"],
      ["Animatronic dinosaur in a theme park", "Entertainment"],
    ],
    explanation: "Cambridge names industry, transport, agriculture, medicine, domestic and entertainment.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Sensors gather data; the microprocessor decides; actuators move."],
    stem: "Classify each part of a crop-spraying drone.",
    pairs: ["GPS receiver", "Propeller motors", "Camera", "Spray pump", "Frame and arms"],
    right: ["Sensor", "Actuator", "Mechanical structure"],
    rightIndex: [0, 1, 0, 1, 2],
    explanation: "GPS and camera are sensors; motors and pump are actuators; the frame is the mechanical structure.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence about the characteristics of a robot.",
    template: "A robot has a mechanical {{blank:a}}, electrical components such as sensors, a microprocessor and {{blank:b}}, and it is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["structure"], choices: ["structure", "keyboard", "screen", "battery"] },
      { id: "b", accepted: ["actuators"], choices: ["actuators", "printers", "monitors", "routers"] },
      { id: "c", accepted: ["programmable"], choices: ["programmable", "human-shaped", "wireless", "portable"] },
    ],
    explanation: "Mechanical structure; actuators; programmable.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the tool at the end of a robot arm, such as a gripper or welding torch.",
    accepted: ["end effector", "end-effector", "effector"],
    wrong: ["actuator", "sensor"],
    explanation: "The end effector does the work: gripping, welding, painting, drilling.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Three characteristics: body, electrical parts, programs."],
    stem: "Describe the **three** characteristics of a robot. [3]",
    points: [
      "Has a mechanical structure / framework (e.g. arm, wheels)",
      "Has electrical components: sensors, a microprocessor and actuators",
      "Is programmable / can be reprogrammed to do different tasks",
    ],
    modelAnswer: "It has a mechanical structure such as an arm or wheels; it has electrical components (sensors to gather data, a microprocessor to decide and actuators to move); and it is programmable.",
    explanation: "One mark per characteristic.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    hints: ["Two advantages and two disadvantages, each linked to farming."],
    stem: "A tobacco farmer near Karoi is considering harvesting robots. Discuss the advantages and disadvantages for the farm. [4]",
    points: [
      "Advantage: can work long hours / day and night during the short harvest season",
      "Advantage: consistent / gentle picking reduces waste / fewer workers to pay over time",
      "Disadvantage: very expensive to buy and maintain / repair",
      "Disadvantage: seasonal farm workers lose income / robots may not cope with uneven fields or unusual plants",
    ],
    modelAnswer: "Robots could harvest day and night during the short season and pick consistently, reducing waste and labour costs. However, they are very expensive to buy and repair, many seasonal workers would lose their jobs, and they may struggle with uneven ground or unusual plants.",
    explanation: "Two of each, linked to the farm.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Name a sensor, the microprocessor and an actuator in this robot.", "Give one advantage and one disadvantage for patients or the hospital."],
    stem: "Sunrise Hospital (a fictional hospital in Harare) is introducing robots that carry medicines from the pharmacy to the wards.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe how the robot's components allow it to travel safely along a corridor.", points: ["Sensors (e.g. proximity / camera / lidar) detect obstacles and people", "The microprocessor processes sensor data and decides on the route / when to stop", "Actuators (motors) drive the wheels to move, turn or stop"], modelAnswer: "Proximity sensors and a camera detect people and obstacles; the microprocessor decides whether to continue, steer or stop; motors (actuators) drive and steer the wheels." }),
      P.mcq({ label: "(b)", stem: "Which statement about the robot is correct?", options: [["It can be reprogrammed with new routes if wards move", "Correct: robots are programmable."], ["It understands spoken requests in any language", "Not a characteristic of robots."], ["It never needs maintenance", "All robots need maintenance."], ["It decides which medicines each patient needs", "That is a clinical decision for staff."]], answer: "A", explanation: "Programmability." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **one** advantage and **one** disadvantage of the robots for the hospital.", points: ["Advantage: nurses spend more time with patients / deliveries run day and night / reliable record of deliveries", "Disadvantage: expensive to buy and maintain / may break down so medicines are delayed / may be blocked by unexpected obstacles"], modelAnswer: "Nurses no longer walk to the pharmacy, so they spend more time with patients; but the robots are costly and a breakdown could delay medicines." }),
    ],
    explanation: "Sensors detect, microprocessor decides, motors move; programmable; balance benefits with cost and breakdowns.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    hints: ["Use the three characteristics as a checklist.", "Link advantages to the danger underground."],
    stem: "A gold mine near Kadoma wants to use robots to inspect flooded and unstable tunnels.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why an inspection vehicle with tracks, gas sensors, a camera, a microprocessor and motors, which follows a programmed route, is a robot.", points: ["Mechanical structure: tracks / body", "Electrical components: sensors (gas, camera), microprocessor and actuators (motors)", "Programmable: follows a programmed route that can be changed"], modelAnswer: "It has a mechanical structure (tracked body); electrical components (gas sensors and camera, a microprocessor and motors); and it is programmable, following a route that can be changed." }),
      P.manual({ label: "(b)", marks: 3, stem: "Evaluate the use of the robot in the mine.", points: ["Advantage: miners are not exposed to gas, flooding or rock falls", "Advantage: accurate gas readings and video recorded continuously / can enter spaces too small or dangerous for people", "Disadvantage: high cost / could be damaged or lost / cannot cope with unexpected obstacles / trained operators needed"], modelAnswer: "The robot keeps miners away from gas and rock falls and records accurate gas readings and video, even in narrow passages. However, it is expensive, could be lost in a collapse, and may not cope with obstacles it was not programmed for." }),
    ],
    explanation: "Structure, electrical components and programmability; safety versus cost and inflexibility.",
  });

  b.card("DEFINITION", "Robotics", "The branch of computer science dealing with the design, construction and operation of robots.");
  b.card("CONCEPT", "Characteristics of a robot", "1 Mechanical structure / framework. 2 Electrical components: sensors, microprocessor, actuators. 3 Programmable.");
  b.card("DEFINITION", "Drone", "An unmanned aircraft controlled remotely or by its own program using sensors and GPS.");
  b.card("DEFINITION", "End effector", "The tool at the end of a robot arm that does the work: gripper, welding torch, spray gun, drill.");
  b.card("FACT", "Areas where robots are used", "Industry, transport, agriculture, medicine, domestic settings, entertainment (and hazardous places such as mines and bomb disposal).");
  b.card("CONCEPT", "Advantages of robots", "Work in dangerous conditions, 24/7 operation, consistent and accurate, no boredom or tiredness, lower long-term costs.");
  b.card("CONCEPT", "Disadvantages of robots", "High initial and maintenance costs, job losses, only do what they are programmed for, faults stop work, need skilled staff.");
  b.card("CONCEPT", "Independent vs dependent robots", "Independent (autonomous) robots decide from sensor data; dependent robots are controlled or guided by a person (e.g. surgical robots).");
  b.card("FACT", "Is a washing machine a robot?", "Usually no: it is an automated appliance with an embedded system, fixed programmes and no moving manipulator.");
});
