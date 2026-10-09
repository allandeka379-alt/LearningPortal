// Slice w2a: input devices (comp.hardware.input-devices).
import { concept, P, ZIM, CAM } from "../lib.mjs";

const camW = 4608;
const camH = 3456;
const camPixels = camW * camH;
const mp = Math.round(camPixels / 1e5) / 10; // megapixels to 1 d.p.

concept("comp.hardware.input-devices", { file: "hardware/input-devices", keyPrefix: "hardware.input-devices" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why does a computer need input devices?",
    options: [
      ["To capture data and convert it into a digital form the computer can process", "Correct: the CPU can only process digital (binary) data."],
      ["To show the results of processing to the user on a screen", "That is the job of output devices."],
      ["To keep data safe when the computer is switched off", "That is the job of secondary storage."],
      ["To carry out calculations on the data that has been entered", "Calculations are done by the CPU (the ALU)."],
    ],
    answer: "A",
    explanation: "Input devices capture data from users or the environment and convert it into digital data for the CPU.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which input device uses a small camera to take many images of the surface it is moved across?",
    options: [
      ["Optical mouse", "Correct: it compares successive images to work out movement."],
      ["Keyboard", "A keyboard detects which key switch completes a circuit."],
      ["Microphone", "A microphone detects sound vibrations."],
      ["2D scanner", "A 2D scanner copies flat documents placed on glass."],
    ],
    answer: "A",
    explanation: "An optical mouse shines an LED on the surface and compares images taken hundreds of times a second.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When a barcode is scanned, what happens to the light that falls on the **black** bars?",
    options: [
      ["It is absorbed", "Correct: black bars absorb light; white spaces reflect it."],
      ["It is reflected back to the sensor", "It is the white spaces that reflect the light."],
      ["It is converted into sound", "The scanner detects light, not sound."],
      ["It passes straight through the label", "The label is not transparent; the light is absorbed or reflected."],
    ],
    answer: "A",
    explanation: "The sensor detects the pattern of reflected light (white) and no reflection (black), which is converted into the barcode number.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "How does a **capacitive** touch screen detect where it is touched?",
    options: [
      ["A finger changes the electrical charge at that point on the screen", "Correct: the finger conducts electricity and disturbs the electrostatic field."],
      ["Pressure pushes two flexible layers together and completes a circuit", "That describes a resistive touch screen."],
      ["The finger breaks invisible beams of light crossing the screen", "That describes an infra-red touch screen."],
      ["A camera behind the screen photographs the finger", "Touch screens do not use a camera to locate the touch."],
    ],
    answer: "A",
    explanation: "Capacitive: change in charge; resistive: layers pressed together; infra-red: beams broken.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a microphone, what converts the electrical signal from the diaphragm into data the computer can store?",
    options: [
      ["An analogue-to-digital converter (ADC)", "Correct: the microphone's signal is analogue and must be digitised."],
      ["A digital-to-analogue converter (DAC)", "A DAC does the opposite, for example to drive a speaker."],
      ["An actuator", "An actuator is an output device that causes movement."],
      ["A barcode reader", "A barcode reader reads printed codes."],
    ],
    answer: "A",
    explanation: "Sound → diaphragm vibrates → varying electrical signal (analogue) → ADC → digital data.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: CAM,
    hints: ["Which type works with any object touching it?"],
    stem: "A mine in Hwange wants a touch screen in its control room. Workers wear thick gloves and the screen must be very large. Which type is most suitable?",
    options: [
      ["Infra-red", "Correct: it detects any object breaking the beams and suits very large screens."],
      ["Capacitive", "It needs a conductive touch, so it does not work with thick gloves."],
      ["Resistive", "It works with gloves but needs firm pressure and is easily damaged on a large display."],
      ["A screen with no touch input and a keyboard", "The question asks for a touch screen."],
    ],
    answer: "A",
    explanation: "Infra-red screens work with gloves or any object and scale well to large sizes.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which code can hold a website address and be read by a phone camera?"],
    stem: "A restaurant in Victoria Falls wants customers to open its online menu on their phones by pointing the camera at a printed code on each table. Which type of code should it print?",
    options: [
      ["A QR code", "Correct: QR codes hold enough data for a web address and are read by phone cameras."],
      ["A barcode", "A barcode holds only a short number and needs a barcode scanner."],
      ["A magnetic stripe", "A magnetic stripe needs a card reader and cannot be printed on a table card."],
      ["A 3D model", "A 3D model is created by a 3D scanner; it is not a code."],
    ],
    answer: "A",
    explanation: "QR codes store more data than barcodes (such as a URL) and can be read at any angle by a phone camera and app.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which device captures the shape of a solid object?"],
    stem: "A museum in Bulawayo wants to make an accurate digital model of a carved stone bird so that copies can be made on a 3D printer. Which input device is needed?",
    options: [
      ["A 3D scanner", "Correct: it measures many points on the object's surface to build a 3D model."],
      ["A 2D scanner", "A 2D scanner only copies flat documents and photographs."],
      ["A barcode scanner", "It reads barcodes, not shapes."],
      ["A digital camera", "One photograph is a flat 2D image, not a 3D model."],
    ],
    answer: "A",
    explanation: "A 3D scanner captures the shape of a solid object as a digital 3D model, which can be sent to a 3D printer.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A resistive touch screen works when the user is wearing gloves.",
    answer: true,
    explanation: "True. A resistive screen responds to pressure, so any object, including a gloved finger, can press the layers together.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A QR code can only be read when it is held exactly upright in front of the camera.",
    answer: false,
    explanation: "False. The three corner squares let the software work out the code's position and angle, so it can be read at any angle.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each input device to how it works.",
    pairs: [
      ["Keyboard", "A key press completes a circuit in a grid of wires"],
      ["Microphone", "A diaphragm vibrates and produces a varying electrical signal"],
      ["Digital camera", "Light falls on a sensor made of millions of light-sensitive cells"],
      ["2D scanner", "A moving row of sensors captures light reflected from a page on glass"],
    ],
    explanation: "Each device captures a different kind of data and converts it into digital form.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["Think about the data in each situation: text, sound, a product code, a shape."],
    stem: "Match each task to the most suitable input device.",
    pairs: [
      ["Recording a radio interview", "Microphone"],
      ["Reading product codes at a supermarket till", "Barcode scanner"],
      ["Copying a printed school report into a computer", "2D scanner"],
      ["Typing a long letter", "Keyboard"],
    ],
    explanation: "Choose the device that captures that kind of data quickly and accurately.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Light, reflection, sensor, conversion, look-up."],
    stem: "Complete the description of how a barcode scanner works.",
    template: "The scanner shines red light across the barcode. The white spaces {{blank:a}} the light and the black bars absorb it. A {{blank:b}} detects the reflected light, and the pattern is converted into a {{blank:c}} number. The computer uses this number to look up the product in a {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["reflect"], choices: ["reflect", "absorb", "store", "magnify"] },
      { id: "b", accepted: ["sensor"], choices: ["sensor", "speaker", "actuator", "printer"] },
      { id: "c", accepted: ["digital"], choices: ["digital", "analogue"] },
      { id: "d", accepted: ["database"], choices: ["database", "spreadsheet chart", "web browser", "printer queue"] },
    ],
    explanation: "Light → white reflects, black absorbs → sensor → digital number → database look-up.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Number of pixels = width × height."],
    stem: `A digital camera's image sensor is ${camW} pixels wide and ${camH} pixels high. How many light-sensitive pixels does the sensor have?`,
    value: camPixels,
    unit: "pixels",
    wrong: [camW + camH],
    explanation: `${camW} × ${camH} = ${camPixels} pixels (about ${mp} megapixels).`,
    workedSolution: `1. Pixels = width × height.\n2. ${camW} × ${camH} = ${camPixels} pixels, about ${mp} million.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the software that converts a scanned image of printed text into text that can be edited in a word processor (full name or abbreviation).",
    accepted: ["OCR", "optical character recognition", "optical character reader"],
    wrong: ["OMR"],
    explanation: "Optical character recognition (OCR) turns the scanned image of text into editable characters.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Start with the light, end with the movement sent to the computer."],
    stem: "Describe how an optical mouse detects that it has been moved. [3]",
    points: [
      "An LED shines light onto the surface under the mouse",
      "A light sensor / tiny camera takes many images of the surface every second",
      "A processor compares successive images to work out the direction and distance moved, and sends this to the computer",
    ],
    modelAnswer: "An LED lights up the surface. A small camera takes hundreds of images a second, and the mouse's processor compares each image with the last to calculate the direction and distance of movement, which is sent to the computer.",
    explanation: "Light, images, comparison, data sent.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4, applies: CAM,
    hints: ["Describe the layers, then what happens when the screen is pressed."],
    stem: "Explain how a **resistive** touch screen detects where it is touched. Give **one** drawback of this type of screen. [4]",
    points: [
      "Two (flexible) layers with conductive coatings separated by a small gap",
      "Pressing pushes the top layer onto the bottom layer, completing a circuit",
      "The point of contact is calculated from the change in voltage / current",
      "Drawback: needs pressure / top layer easily scratched or damaged / less clear image / usually no multi-touch",
    ],
    modelAnswer: "A resistive screen has two conductive layers separated by a tiny gap. Pressing the screen pushes the layers together and completes a circuit; the change in voltage tells the computer where it was touched. A drawback is that the soft top layer can be scratched easily.",
    explanation: "Layers, pressure, circuit completed, location calculated.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    hints: ["Link each device to the type of data the clinic must capture."],
    stem: "A health clinic in Chinhoyi is computerising its patient records. Staff will type notes, record short voice memos, scan old paper record cards and photograph skin conditions for a specialist in Harare.",
    parts: [
      P.match({ label: "(a)", stem: "Match each task to the most suitable input device.", pairs: [["Recording voice memos", "Microphone"], ["Scanning old paper record cards", "2D scanner"], ["Photographing skin conditions", "Digital camera"]], explanation: "Microphone for sound, 2D scanner for flat documents, digital camera for photographs." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe how the digital camera captures a photograph.", points: ["Light passes through the lens onto an image sensor", "The sensor has millions of light-sensitive cells/pixels that convert light into electrical signals", "The signals are converted into digital values (colour of each pixel) and stored on a memory card"], modelAnswer: "Light enters through the lens and falls on the image sensor, which has millions of light-sensitive cells, one per pixel. Each converts the light into an electrical signal, which the camera's processor turns into a digital colour value and stores on the memory card." }),
      P.manual({ label: "(c)", marks: 2, stem: "The clinic's receptionist suggests OCR software for the scanned cards. Explain one benefit and one limitation.", points: ["Benefit: text becomes editable/searchable without retyping (saves time)", "Limitation: handwriting or faded print may be read wrongly, so it must be checked"], modelAnswer: "OCR turns the scanned cards into editable, searchable text without retyping them, but it may misread handwritten or faded notes, so staff must check the results." }),
    ],
    explanation: "Choose devices by the type of data; camera: lens, sensor, digital values; OCR saves typing but must be checked.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, applies: CAM,
    hints: ["Consider gloves, outdoor dust, damage and image clarity for each type."],
    stem: "A fuel station in Kwekwe is installing an outdoor touch-screen pump display that customers will use day and night, sometimes wearing gloves. Some use a key fob instead of the screen.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which type of touch screen relies on a conductive touch, such as a bare finger?", options: [["Capacitive", "Correct."], ["Resistive", "Resistive relies on pressure."], ["Infra-red", "Infra-red relies on broken beams."], ["Optical character", "OCR is software, not a screen type."]], answer: "A", explanation: "Capacitive screens detect a change in charge from a conductive finger." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe how an **infra-red** touch screen works.", points: ["Infra-red LEDs and sensors are placed around the edges of the screen", "They form an invisible grid of beams across the screen", "A touch breaks horizontal and vertical beams, and the position is calculated from which beams are broken"], modelAnswer: "Infra-red LEDs along two edges send beams to sensors on the opposite edges, making an invisible grid. When a finger or glove touches the screen it breaks some horizontal and vertical beams, and the controller works out the position from which beams are blocked." }),
      P.manual({ label: "(c)", marks: 4, stem: "Recommend a type of touch screen for the pump and justify your choice, comparing it with the other two types.", points: ["Clear recommendation of one type (e.g. resistive or infra-red), with a reason linked to gloves", "Capacitive rejected because it does not work with gloves (or accepted with a valid reason)", "Resistive: cheap and works with gloves, but the soft top layer may be damaged outdoors / needs pressure", "Infra-red: works with gloves and has no soft layer, but can be triggered by dust/insects / costs more"], modelAnswer: "An infra-red screen behind toughened glass: it works with gloves and has no soft layer to wear out. A capacitive screen would not respond to gloved fingers. A resistive screen works with gloves and is cheaper, but its flexible top layer could be scratched or damaged by heavy outdoor use. Infra-red can be triggered by insects at night, so the software should ask the customer to confirm each choice." }),
    ],
    explanation: "Capacitive needs a conductive touch; infra-red uses beams; the choice must be justified against gloves, durability and cost.",
  });

  b.card("DEFINITION", "**Input device**", "Hardware that captures data from users or the environment and converts it into digital form for the computer.");
  b.card("CONCEPT", "Barcode scanner", "Red light shone on the code; white reflects, black absorbs; sensor detects the pattern; converted to a digital number; product looked up in a database.");
  b.card("CONCEPT", "QR code scanner", "A camera captures the 2D pattern; software uses the three corner squares to find position and decodes the data (e.g. a URL).");
  b.card("CONCEPT", "Optical mouse", "LED lights the surface; tiny camera takes hundreds of images a second; processor compares them to find direction and distance.");
  b.card("CONCEPT", "Microphone", "Sound vibrates a diaphragm → varying electrical signal (analogue) → ADC → digital data.");
  b.card("CONCEPT", "Resistive touch screen", "Pressure pushes two conductive layers together, completing a circuit. Works with gloves; easily scratched.", undefined, { applies: CAM });
  b.card("CONCEPT", "Capacitive touch screen", "A conductive finger changes the charge on the coated glass. Clear and multi-touch; no ordinary gloves.", undefined, { applies: CAM });
  b.card("CONCEPT", "Infra-red touch screen", "A touch breaks a grid of infra-red beams. Works with any object and large screens; dust or insects may trigger it.", undefined, { applies: CAM });
  b.card("FACT", "2D vs 3D scanner", "2D: copies flat documents into an image (OCR can make text editable). 3D: measures a solid object's shape to make a 3D model.");
  b.card("CONCEPT", "Digital camera", "Lens → image sensor of millions of light-sensitive cells → electrical signals → digital pixel values stored on a memory card.");
});
