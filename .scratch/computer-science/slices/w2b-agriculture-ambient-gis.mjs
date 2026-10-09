// Slice w2b: computers in agriculture, ambient systems and GIS (comp.applications.agriculture-ambient-gis, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const herd = 120;
const weighings = 4; // per animal per year

concept("comp.applications.agriculture-ambient-gis", { file: "applications/agriculture-ambient-gis", keyPrefix: "applications.agriculture-ambient-gis" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **GIS** stand for?",
    options: [
      ["Geographic information system", "Correct: a system for location-based data."],
      ["Global internet service", "Not the meaning of GIS."],
      ["General irrigation sensor", "Not the meaning of GIS."],
      ["Graphical interface software", "Not the meaning of GIS."],
    ],
    answer: "A",
    explanation: "A geographic information system stores, analyses and displays data linked to locations.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which technology is used in ear tags to identify individual cattle automatically?",
    options: [
      ["RFID", "Correct: the tag's number is read by radio waves."],
      ["CAD", "CAD is computer-aided design."],
      ["OCR", "OCR reads printed text."],
      ["EFT", "EFT transfers money."],
    ],
    answer: "A",
    explanation: "Radio-frequency identification tags are read by scanners at gates and scales.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main aim of **precision farming**?",
    options: [
      ["To apply exactly the right amount of inputs to each part of a field", "Correct: GPS, sensors and maps target each area."],
      ["To replace all of the farm workers with robots and drones", "Precision farming targets inputs; it does not require full automation."],
      ["To grow crops without any soil", "That describes hydroponics."],
      ["To sell all of the farm's crops online instead of at markets", "That is market information, not precision farming."],
    ],
    answer: "A",
    explanation: "Precision farming reduces waste of seed, water, fertiliser and chemicals and increases yields.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature makes a system **ambient**?",
    options: [
      ["It senses people and conditions and responds automatically", "Correct: it blends into the surroundings."],
      ["It must be controlled by typing commands on a keyboard each time", "Ambient systems respond automatically."],
      ["It only works outdoors on farms, not inside buildings", "Ambient systems are in homes and buildings."],
      ["It displays maps made of layers that the user can query", "That describes a GIS."],
    ],
    answer: "A",
    explanation: "Ambient (smart) systems use sensors to respond to occupants and conditions automatically.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does a GIS store different kinds of data, such as roads, rivers and soil types?",
    options: [
      ["As separate layers linked to map co-ordinates", "Correct: layers can be shown together and queried."],
      ["As one printed paper map", "A paper map cannot be queried."],
      ["As a single spreadsheet of farmers' names", "A GIS links data to locations."],
      ["As photographs on a social network", "Not how a GIS stores data."],
    ],
    answer: "A",
    explanation: "Each type of data is a layer; layers are combined and analysed.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which system combines location-based layers to find suitable places?"],
    stem: "A council wants to find land within 1 km of a road, outside flood zones and close to a power line, for a new clinic. Which system should it use?",
    options: [
      ["A geographic information system", "Correct: it queries several map layers together."],
      ["A patient monitoring system", "That monitors patients' vital signs."],
      ["An ambient lighting system", "That controls lights in a building."],
      ["A CAD/CAM system", "That designs and makes products."],
    ],
    answer: "A",
    explanation: "Combining layers and querying by location is exactly what a GIS does.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which drawback concerns information collected about the occupants?"],
    stem: "Which is a **privacy** drawback of a smart home system?",
    options: [
      ["Data about the family's daily habits is collected and could be misused", "Correct: cameras and sensors record when people come and go."],
      ["Lights switch off automatically when the rooms are empty", "This is a benefit (saving energy)."],
      ["Elderly residents can get help after a fall", "This is a benefit."],
      ["Appliances can be set to run when electricity is cheapest", "This is a benefit."],
    ],
    answer: "A",
    explanation: "Smart systems collect personal data; hacking and misuse are privacy risks.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Think about cost, power and network coverage in rural areas."],
    stem: "Why might a small-scale farmer in a remote area find precision farming hard to adopt?",
    options: [
      ["Equipment is costly and needs training, power and network coverage", "Correct: these barriers are greatest for smallholders."],
      ["Precision farming only works for livestock, not for crops", "It is mainly used for crops."],
      ["GPS does not work outside cities", "GPS works anywhere with a view of the sky."],
      ["Sensors cannot measure the moisture in the soil accurately", "Soil-moisture sensors are widely used."],
    ],
    answer: "A",
    explanation: "Cost, skills and infrastructure limit adoption, widening the gap between large and small farms.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A sensor-controlled irrigation system can save water by switching pumps on only when the soil is too dry.",
    answer: true,
    explanation: "True. Readings are compared with a set moisture level, so water is applied only when needed.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A GIS is simply a paper map of an area.",
    answer: false,
    explanation: "False. A GIS is a computer system that stores, combines, analyses and displays location-based data; maps are one of its outputs.",
  });
  b.calc({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: `A farmer near Gwanda has ${herd} cattle with RFID ear tags. Each animal is weighed ${weighings} times a year, and every weighing is stored as one record. How many weight records are stored in a year?`,
    value: herd * weighings,
    wrong: [herd],
    explanation: `${herd} × ${weighings} = ${herd * weighings} records.`,
    workedSolution: `1. Records per animal per year: ${weighings}.\n2. Whole herd: ${herd} × ${weighings} = ${herd * weighings}.`,
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each technology to its use in agriculture.",
    pairs: [
      ["GPS-guided tractor", "Planting rows accurately with no overlaps"],
      ["Drone with camera", "Spotting diseased or dry areas of a crop from the air"],
      ["Soil-moisture sensor", "Deciding when to switch on irrigation"],
      ["RFID ear tag", "Identifying each animal for its records"],
      ["SMS price service", "Telling farmers today's market prices"],
    ],
    explanation: "Each technology supports a different farming task.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["Inputs measure or read; outputs act or report."],
    stem: "A model of a smart greenhouse is being designed. Classify each component as an input or an output.",
    pairs: ["Humidity sensor", "Misting pump", "Light sensor", "Ventilation fan", "Text message alert to the farmer"],
    right: ["Input", "Output"],
    rightIndex: [0, 1, 0, 1, 1],
    explanation: "Sensors are inputs; pumps, fans and alerts are outputs.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Think about energy and security."],
    stem: "Give **two** benefits of an ambient (smart) system in an office building. [2]",
    points: [
      "Saves energy / money: lights and air conditioning switched off in empty rooms or dimmed in daylight",
      "Improved security (sensors, cameras, alerts) / comfort / convenience",
    ],
    modelAnswer: "It saves electricity by switching off lights and air conditioning in empty rooms, and it improves security with motion sensors and alerts.",
    explanation: "Any two specific benefits.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 5,
    hints: ["Use the headings: purpose, inputs, processing, outputs."],
    stem: "Design a model of an automated poultry house for a farmer in Marondera. State its purpose, inputs, processing and outputs. [5]",
    points: [
      "Purpose: keep chickens at the right temperature / ventilation / feed automatically",
      "Inputs: named sensors, e.g. temperature, humidity, ammonia / light, feed-level sensors",
      "Processing: computer stores set limits and compares each reading with them",
      "Outputs: named actuators, e.g. heaters, fans, lights, feeders switched on or off",
      "Alerts / logging: farmer warned by text if a value cannot be corrected; readings recorded; repeats continuously",
    ],
    modelAnswer: "Purpose: keep the birds healthy without constant checking. Inputs: temperature, humidity and feed-level sensors. Processing: the controller stores the ideal range for each and compares readings every few minutes. Outputs: heaters, fans and the feeder motor are switched on or off; a text alert is sent if the temperature stays out of range; readings are logged.",
    explanation: "A complete model names its purpose, inputs, processing and outputs.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["GIS layers and queries.", "Benefits and drawbacks of GIS."],
    stem: "The district agricultural office in Masvingo uses a GIS.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which is an input to the GIS?", options: [["Satellite images of the district", "Correct."], ["A printed map produced by the GIS", "This is an output."], ["A report of the best sites", "This is an output."], ["A chart of rainfall trends", "This is an output."]], answer: "A", explanation: "Satellite images, GPS surveys and field data are inputs." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe how the office could use the GIS to decide where to promote drought-tolerant crops.", points: ["Load layers such as rainfall, soil type and farm locations", "Query / combine the layers to find areas with low rainfall (and suitable soil)", "Output a map / report of these areas to target farmers"], modelAnswer: "The office loads rainfall, soil and farm-location layers, queries them for areas with low rainfall and suitable soil, and prints a map of the farms in those areas to target." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **two** drawbacks of using a GIS.", points: ["Expensive software / data / hardware", "Needs trained staff / results depend on accurate, up-to-date data"], modelAnswer: "The software and data are expensive, and the results are only as good as the data entered." }),
    ],
    explanation: "Inputs, layered queries and outputs; cost and data accuracy.",
  });
  b.struct({
    d: 5, skill: "CREATION", examStyle: true,
    hints: ["Think about the elderly occupant's safety and comfort.", "Name sensors and outputs."],
    stem: "Thandeka wants an ambient system for her grandmother, who lives alone in Bulawayo.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Design a model of the system: give its inputs, processing and outputs.", points: ["Inputs: motion / door / fall sensors (and light / temperature sensors)", "Processing: computer compares readings with normal patterns / stored limits, e.g. no movement for a set time", "Outputs: lights switched on automatically at night / heating controlled", "Outputs: alert sent to Thandeka's phone if a fall or no movement is detected"], modelAnswer: "Inputs: motion sensors in each room, a door sensor and light sensors. Processing: the controller compares readings with stored settings and with her usual pattern, e.g. no movement for three hours in the day. Outputs: lights come on automatically when she moves at night; a text alert is sent to Thandeka if a fall or a long period without movement is detected." }),
      P.manual({ label: "(b)", marks: 2, stem: "Give **one** benefit and **one** drawback of the system for the grandmother.", points: ["Benefit: help arrives quickly after a fall / she can stay independent / safer at night", "Drawback: cost / privacy of being monitored / fails without power or network"], modelAnswer: "She can stay in her own home knowing help will come quickly if she falls, but she may feel watched and the system fails during power cuts." }),
    ],
    explanation: "Sensors in, comparison with stored settings, automatic lights and alerts out.",
  });

  b.card("DEFINITION", "Precision farming", "Using GPS, sensors, drones and computers to apply exactly the right amount of seed, water, fertiliser or pesticide to each part of a field.");
  b.card("CONCEPT", "Computer-controlled irrigation", "Soil-moisture sensors send readings to a controller that compares them with set values and switches pumps or valves on and off.");
  b.card("DEFINITION", "RFID tag", "Tag with a chip and antenna whose identity number is read by radio waves, e.g. cattle ear tags for livestock records.");
  b.card("DEFINITION", "Ambient (smart) system", "A system in a home or building that senses people and conditions and responds automatically (lighting, climate, security, appliances).");
  b.card("CONCEPT", "Drawbacks of smart homes", "Expensive; depend on power and network; can be hacked; privacy concerns about data on the occupants.");
  b.card("DEFINITION", "Geographic information system (GIS)", "A computer system that captures, stores, analyses and displays location-based data as map layers that can be combined and queried.");
  b.card("FACT", "Uses of GIS", "Planning roads, schools and clinics; water, forest and wildlife management; agriculture; disaster and flood maps; utilities; disease tracking.");
  b.card("CONCEPT", "Designing a model of a system", "State the purpose, inputs (sensors, data), processing (stored limits, comparisons, queries) and outputs (actuators, alerts, maps, reports).");
});
