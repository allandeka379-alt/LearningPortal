// Slice w1b: input and output devices (acs.hardware.io-devices, Cambridge AS).
import { concept, P, chk, CAM } from "../lib.mjs";
import { mc, pm } from "../tables/w1b-q.mjs";

concept("acs.hardware.io-devices", { file: "hardware/io-devices", keyPrefix: "hardware.io-devices", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "In a laser printer, which component uses heat and pressure to fix the toner onto the paper?",
    ["The fuser", "Correct: the fuser melts the toner so that it stays on the paper."],
    [["The drum", "The drum holds the electrostatic image; it does not fix the toner."], ["The laser", "The laser writes the image on the drum."], ["The cone", "A cone is part of a speaker, not a printer."]],
    "The fuser melts the toner into the paper using heat and pressure.");
  mc(b, 2, "UNDERSTANDING", "What is the purpose of the analogue-to-digital converter (ADC) in a microphone system?",
    ["To turn the voltage into binary numbers", "Correct: sound is analogue; the computer stores numbers."],
    [["To make the sound louder before it is stored on disk", "Making a signal stronger is the job of an amplifier."], ["To turn stored numbers back into sound for the listener", "That is the job of a digital-to-analogue converter."], ["To move the diaphragm in time with the sound wave", "The sound wave moves the diaphragm; the ADC does not."]],
    "The microphone produces a continuously varying (analogue) voltage. The ADC samples it and gives the processor binary numbers.", { daily: true });
  mc(b, 2, "RECALL", "Which is the first stage in the operation of a laser printer?",
    ["The drum is given an even charge", "Correct: the drum must be charged before the laser can write an image on it."],
    [["The toner is melted onto the paper by heat", "Fusing is the last stage of printing, not the first."], ["Toner is attracted to the image on the drum", "Toner can only stick once the image has been written on the drum."], ["The paper passes through the hot fuser rollers", "The paper is fused after the toner has been transferred."]],
    "Order: charge the drum, write the image with the laser, apply toner, transfer to paper, fuse.", { daily: true });
  mc(b, 3, "APPLICATION", "A workshop in Bulawayo needs one replacement plastic gear for an old machine, made in a single piece from a digital design. Which output device is most suitable?",
    ["A 3D printer", "Correct: it builds a solid object layer by layer from a digital model."],
    [["A laser printer", "A laser printer produces flat printed pages."], ["A speaker", "A speaker outputs sound."], ["A virtual reality headset", "A VR headset displays an environment; it cannot make a physical part."]],
    "Making a physical object from a digital design is additive manufacturing, done by a 3D printer.", { hints: ["Which device produces a solid object rather than a page or a sound?"] });
  mc(b, 3, "ANALYSIS", "A VR headset shows each eye a slightly different image. What is the effect of this?",
    ["The brain perceives depth in the scene", "Correct: the two views are combined into a sense of depth."],
    [["The scene is drawn twice as quickly as a single image", "Two images do not double the speed; they give a stereoscopic view."], ["The head movement is detected without needing any sensors", "Head tracking uses a gyroscope and an accelerometer."], ["The headset uses less power than for a single image", "Drawing two images needs more processing, not less."]],
    "Each eye sees a view from a slightly different position. The brain merges them and perceives depth.", { hints: ["Think about why humans have two eyes."] });
  mc(b, 3, "APPLICATION", "Tendai uses a touchscreen with thick work gloves in a cold storage room. The screen must respond to pressure and does not need multi-touch. Which type is the better choice?",
    ["A resistive touchscreen", "Correct: pressing the layers together works through a glove."],
    [["A capacitive touchscreen", "A capacitive screen needs a conducting fingertip, so it often ignores gloves."], ["A virtual reality display", "A VR display is worn on the head and is not a touchscreen."], ["A laser printer touch panel", "This is not a type of touchscreen technology."]],
    "Resistive screens detect pressure, so a glove, a pen or a fingernail works.", { hints: ["Which screen type detects a conducting finger, and which detects pressure?"] });
  mc(b, 4, "EVALUATION", "A school wants one device for its Form 5 classroom so that pupils can pinch to zoom and drag several items at once. Which statement best justifies a capacitive touchscreen?",
    ["It detects several touches at once", "Correct: capacitive grids support multi-touch gestures."],
    [["It works only with a plastic stylus held by the user", "Most capacitive screens respond to a finger, not only a plastic stylus."], ["It needs a layer to be pressed down firmly by the user", "Pressure is how a resistive screen works."], ["It is always cheaper than any resistive screen", "Cost is not the reason; capacitive screens are usually the more expensive."]],
    "Multi-touch gestures need the controller to find several changes in the field at once, which a capacitive grid can do.", { hints: ["What does the question require pupils to do with the screen? Match it to the technology."] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A capacitive touchscreen will normally respond to a touch from a plastic pen.", answer: false,
    explanation: "False. It senses the change in the electric field caused by a conducting fingertip. A plastic pen does not conduct, so a resistive screen is needed for that." });
  b.tf({ d: 2, skill: "RECALL", daily: true, stem: "A speaker needs a digital-to-analogue converter (DAC) to turn stored sound data into a varying voltage.", answer: true,
    explanation: "True. The processor holds sound as binary numbers; the DAC changes them into an analogue voltage that is amplified and sent to the coil." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each device to a part that is essential to how it works.",
    pairs: [["Laser printer", "Fuser"], ["Microphone", "Diaphragm"], ["Speaker", "Cone with a coil"], ["VR headset", "Gyroscope"], ["Filament 3D printer", "Heated nozzle"]],
    explanation: "Fuser fixes toner; the diaphragm vibrates with sound; the cone and coil move the air; the gyroscope tracks head movement; the nozzle melts and places plastic." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the description of a laser printer.",
    template: "The drum is charged, then a {{blank:a}} writes the image. {{blank:b}} sticks to the image on the drum and is transferred to the paper, where the {{blank:c}} fixes it with heat and pressure.",
    blanks: [
      { id: "a", accepted: ["laser"], choices: ["laser", "fuser", "diaphragm", "nozzle"] },
      { id: "b", accepted: ["toner"], choices: ["toner", "filament", "resin", "ink"] },
      { id: "c", accepted: ["fuser"], choices: ["fuser", "laser", "cone", "lens"] },
    ],
    explanation: "The laser writes the electrostatic image, toner is attracted to it, and the fuser melts the toner onto the paper." });
  const mins = 450 / 18;
  chk(mins, 25);
  b.num({ d: 2, skill: "APPLICATION", calculator: false, stem: "A school office needs to print 450 pages on a laser printer that prints 18 pages each minute. How many minutes will the job take, ignoring any warm-up time?",
    value: mins, unit: "min", wrong: [27, 8100],
    workedSolution: "1. Time = pages ÷ pages per minute.\n2. 450 ÷ 18 = 25 minutes.",
    explanation: "Time = 450 ÷ 18 = 25 minutes." });
  const pos = (3.5 / 5) * 90;
  chk(pos, 63);
  b.calc({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Position = (reading ÷ supply) × length."],
    stem: "A resistive touchscreen layer is 90 mm long. A 5 V supply is connected across it and the controller reads 3.5 V at the point of contact. How far, in millimetres, from the supply edge was the screen touched?",
    value: pos, wrong: [3.5, 45],
    explanation: "Distance = (3.5 ÷ 5) × 90 = 63 mm.",
    workedSolution: "1. The voltage is proportional to the distance along the layer.\n2. Fraction = 3.5 ÷ 5 = 0.7.\n3. Distance = 0.7 × 90 = 63 mm." });
  const bytes = 1600 * 900 * 3;
  chk(bytes, 4320000);
  b.num({ d: 3, skill: "APPLICATION", calculator: false, unit: "bytes", hints: ["24 bits is 3 bytes per pixel."],
    stem: "One eye of a VR headset shows an image of 1600 × 900 pixels with 24 bits per pixel. How many bytes are needed to store one uncompressed image for that eye?",
    value: bytes, wrong: [1440000, 34560000],
    workedSolution: "1. Pixels = 1600 × 900 = 1 440 000.\n2. 24 bits = 3 bytes per pixel.\n3. 1 440 000 × 3 = 4 320 000 bytes.", explanation: "Pixels = 1600 × 900 = 1 440 000. Bytes = 1 440 000 × 3 = 4 320 000." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Four stages: charge, laser, toner and transfer, fuse."],
    stem: "Describe how a laser printer produces a page of text. [4]",
    points: ["The drum is given an even electrostatic charge", "A laser (steered by a mirror) alters the charge to form the image of the page on the drum", "Toner is attracted to the image on the drum and transferred to the charged paper", "The paper passes through the fuser, where heat and pressure melt the toner onto it"],
    modelAnswer: "The drum is charged evenly. The laser draws the page as a pattern of charge on the drum. Toner sticks to that pattern and is transferred to the paper. The fuser then melts the toner into the paper with heat and pressure.",
    explanation: "Each mark is one stage in the correct order." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Sound wave, voltage, conversion to numbers."],
    stem: "Explain how a microphone allows the sound of a voice to be stored in a computer. [3]",
    points: ["Sound waves make the diaphragm vibrate", "The vibration produces a varying (analogue) voltage", "An analogue-to-digital converter samples the voltage and changes it into binary numbers"],
    modelAnswer: "The voice makes a diaphragm vibrate. This produces a varying analogue voltage. An ADC samples the voltage and turns each sample into a binary number that the computer can store.",
    explanation: "Diaphragm, analogue voltage, ADC: one mark each." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Name the screen type, then give reasons linked to the way pupils use the tablets."],
    stem: "A school gives tablets to Form 5 pupils who draw circuit diagrams with a finger and pinch to zoom. Recommend a type of touchscreen and justify your choice with two reasons. [4]",
    points: ["Recommends a capacitive touchscreen", "Supports multi-touch, so pinch to zoom works", "Responds to a light touch of a finger, so drawing is easy", "Clearer display (more light passes through) than a resistive screen"],
    modelAnswer: "A capacitive touchscreen. It supports multi-touch gestures such as pinching, and it responds to a light finger touch so drawing is smooth. The display is also brighter and clearer than a resistive screen.",
    explanation: "One mark for the choice and up to three for linked reasons." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3, hints: ["One benefit and two drawbacks, each in terms of the user."],
    stem: "Give one benefit and two drawbacks of using a virtual reality headset for training student nurses. [3]",
    points: ["Benefit: procedures can be practised safely without a real patient", "Drawback: the equipment and the computer to run it are expensive", "Drawback: some users feel unwell or tired when the image lags behind head movement"],
    modelAnswer: "Benefit: nurses can practise a procedure many times without risk to a patient. Drawbacks: the headset and powerful computer are costly, and some users feel dizzy if the display lags.",
    explanation: "Credit any sensible benefit and two sensible drawbacks." });
  const layers = 48 / 0.2;
  const totalMin = (layers * 30) / 60;
  chk(layers, 240);
  chk(totalMin, 120);
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Layers = height ÷ layer thickness.", "Time = layers × seconds per layer, then convert to minutes."],
    explanation: "Layers = 48 ÷ 0.2 = 240; time = 240 × 30 s = 7200 s = 120 minutes; the process is additive manufacturing.",
    stem: "A school workshop uses a filament 3D printer to make a plastic bracket 48 mm tall. The slicing software builds it in layers 0.2 mm thick, and each layer takes 30 seconds.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the number of layers needed.", value: layers, unit: undefined, wrong: [9.6, 96], explanation: "48 ÷ 0.2 = 240 layers.", workedSolution: "1. Layers = height ÷ layer thickness.\n2. 48 ÷ 0.2 = 240." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the printing time in minutes.", value: totalMin, unit: "min", wrong: [7200, 240], explanation: "240 × 30 s = 7200 s; 7200 ÷ 60 = 120 minutes.", workedSolution: "1. 240 layers × 30 s = 7200 s.\n2. 7200 ÷ 60 = 120 minutes." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which term describes building an object by adding material layer by layer?", options: [["Additive manufacturing", "Correct."], ["Subtractive manufacturing", "That removes material, as in cutting."], ["Analogue conversion", "This is about signals, not objects."], ["Electrostatic transfer", "That is how a laser printer works."]], answer: "A", explanation: "Adding layers is additive manufacturing." }),
      P.manual({ label: "(d)", marks: 1, stem: "State one drawback of a 3D printer for making many copies of a part.", points: ["Printing is slow (each part takes a long time) or limited choice of materials"], modelAnswer: "Each part takes a long time to print.", explanation: "Accept slow printing, high material cost or limited materials." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Think about what each device does for the cashier and the customer."],
    explanation: "Scanners input data, printers output it; scanning is faster and more accurate than typing; capacitive screens suit light-touch, gesture-based use.",
    stem: "A supermarket in Harare uses a point-of-sale (POS) system at each till. The cashier uses a barcode scanner, a touchscreen and a receipt printer.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which of these is an output device only?", options: [["The receipt printer", "Correct: it presents the transaction on paper."], ["The barcode scanner", "It is an input device."], ["The keypad of the card reader", "A keypad is an input device."], ["A computer mouse", "A mouse is an input device."]], answer: "A", explanation: "A receipt printer outputs the transaction on paper." }),
      P.short({ label: "(b)", marks: 1, stem: "State the type of input device used to read the product code.", accepted: ["barcode scanner", "bar code scanner", "barcode reader", "scanner"], wrong: ["keyboard"], explanation: "A barcode scanner reads the code." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain two benefits of scanning barcodes instead of typing product codes.", points: ["Faster, so customers are served more quickly", "Fewer errors than keying in digits"], modelAnswer: "Scanning is quicker than typing, and it avoids mistyped codes.", explanation: "Accept speed, accuracy or automatic stock update." }),
      P.manual({ label: "(d)", marks: 2, stem: "The supermarket also offers a self-service screen. Give two reasons for choosing a capacitive screen for it.", points: ["Responds to a light touch so it is easy to use", "Clear, bright display that supports gestures such as scrolling"], modelAnswer: "A capacitive screen responds to a light touch and gives a clear display with swipe gestures.", explanation: "Any two valid reasons." }),
    ] });
  b.card("DEFINITION", "Touchscreen", "A display that is also an input device because it detects where it is touched and sends the position to the processor.");
  b.card("CONCEPT", "Laser printer stages", "Charge the drum, write the image with the laser, apply toner, transfer to paper, fuse with heat and pressure.");
  b.card("CONCEPT", "Resistive touchscreen", "Two conducting layers pressed together at the touch point; works with gloves or a pen; usually single touch.");
  b.card("CONCEPT", "Capacitive touchscreen", "Grid of electrodes holds a field; a conducting finger changes it; supports multi-touch; ignores plain gloves.");
  b.card("CONCEPT", "Microphone to computer", "Sound moves a diaphragm, giving a varying voltage; an ADC turns it into binary numbers.");
  b.card("CONCEPT", "Speaker operation", "A DAC makes a voltage from stored numbers; an amplifier strengthens it; a coil moves the cone to make sound.");
  b.card("DEFINITION", "Additive manufacturing", "Building an object layer by layer from a digital model, as a 3D printer does.");
  b.card("FACT", "VR headset hardware", "Two screens or images (one per eye) behind lenses, plus a gyroscope and an accelerometer to track head movement.");
  b.card("FORMULA", "Print time", "Time = pages ÷ pages per minute.", "Check the units before dividing.");
});
