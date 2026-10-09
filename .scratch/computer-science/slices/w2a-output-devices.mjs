// Slice w2a: output devices (comp.hardware.output-devices).
import { concept, P, ZIM, CAM } from "../lib.mjs";

const pages = 840;
const ppm = 35;
const minutes = pages / ppm;
if (!Number.isInteger(minutes)) throw new Error("minutes");

concept("comp.hardware.output-devices", { file: "hardware/output-devices", keyPrefix: "hardware.output-devices" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an **output** device?",
    options: [
      ["Speaker", "Correct: it converts digital sound data into sound waves."],
      ["Microphone", "A microphone captures sound: an input device."],
      ["Barcode scanner", "It reads barcodes: an input device."],
      ["Touchpad", "A touchpad detects finger movement: an input device."],
    ],
    answer: "A",
    explanation: "Output devices present the results of processing: screens, printers, projectors, speakers and actuators.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does an **actuator** do?",
    options: [
      ["Converts an electrical signal from a computer into movement", "Correct: motors, valves and solenoids are actuators."],
      ["Measures a physical quantity such as temperature or light", "That is a sensor, an input device."],
      ["Converts analogue signals into digital data", "That is an analogue-to-digital converter."],
      ["Stores the results of processing until they are printed", "Storage holds data; actuators produce movement."],
    ],
    answer: "A",
    explanation: "An actuator is an output device that produces physical movement or action from a signal.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a laser printer, which part uses heat and pressure to fix the toner permanently to the paper?",
    options: [
      ["The fuser", "Correct: the fuser melts the toner onto the paper."],
      ["The laser", "The laser changes the charge on the drum to form the image."],
      ["The print head", "Print heads are found in inkjet printers."],
      ["The colour wheel", "A colour wheel is part of a DLP projector."],
    ],
    answer: "A",
    explanation: "Drum charged → laser forms the electrostatic image → toner attracted → toner transferred to paper → fuser melts it on.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How is an image formed in an **LCD** screen?",
    options: [
      ["Liquid crystals twist to control how much backlight passes through each pixel", "Correct: the crystals act like tiny shutters in front of the backlight."],
      ["Each pixel is a small light-emitting diode that gives out its own light", "That describes a true LED screen."],
      ["Millions of tiny mirrors tilt towards or away from a lens", "That describes a DLP projector."],
      ["Droplets of ink are fired onto the inside of the glass", "Ink droplets are used in inkjet printers."],
    ],
    answer: "A",
    explanation: "LCD: backlight + liquid crystals + colour filters. The crystals do not give out light themselves.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "Which component is found in a **DLP** projector but not in an LCD projector?",
    options: [
      ["A chip of millions of tiny tilting mirrors", "Correct: each micro-mirror tilts on and off to form one pixel."],
      ["A bright lamp to light the image", "Both types of projector use a bright lamp."],
      ["A lens that focuses the image onto a screen", "Both types use a lens."],
      ["A fan that cools the lamp and the electronics", "Both types need cooling."],
    ],
    answer: "A",
    explanation: "DLP projectors use a digital micro-mirror chip and a colour wheel; LCD projectors use three LCD panels and a prism.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Compare speed and cost per page for high volumes of text."],
    stem: "A busy law firm in Harare prints hundreds of pages of black text every day. Which printer is most suitable?",
    options: [
      ["Laser printer", "Correct: fast, quiet and cheap per page for large volumes of text."],
      ["Inkjet printer", "Inkjets are slower and the ink is expensive per page for high volumes."],
      ["3D printer", "A 3D printer makes solid objects, not documents."],
      ["A DLP projector", "A projector shows images; it does not print."],
    ],
    answer: "A",
    explanation: "Laser printers suit high-volume text printing; inkjets suit small volumes and colour photographs.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which device turns a signal into physical movement?"],
    stem: "A farm near Chinhoyi uses a computer to water crops. When the soil is too dry, the computer opens an electric valve on the irrigation pipe. What type of device is the valve?",
    options: [
      ["An actuator", "Correct: it turns the computer's signal into movement (opening the pipe)."],
      ["A sensor", "The sensor measures the soil moisture; the valve acts on the decision."],
      ["An input device", "The valve receives signals from the computer, so it is an output."],
      ["A storage device", "The valve does not store data."],
    ],
    answer: "A",
    explanation: "In a control system the sensor is the input and the actuator (valve, motor, pump) is the output.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Think about which printer leaves no wet ink and handles volume."],
    stem: "Why are laser printers, rather than inkjet printers, usually chosen to print examination papers for a whole school?",
    options: [
      ["They print large numbers of pages quickly at a low cost per page", "Correct: speed and cost per page matter for high volumes."],
      ["They are always cheaper to buy than inkjet printers", "Laser printers usually cost more to buy."],
      ["They are the only printers that can print in colour", "Both types can print in colour."],
      ["They can print solid three-dimensional models of the papers", "That is a 3D printer."],
    ],
    answer: "A",
    explanation: "For large print runs, a laser printer's speed and low cost per page outweigh its higher purchase price.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A 3D printer builds a solid object layer by layer from a digital design.",
    answer: true,
    explanation: "True. This is called additive manufacturing.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In an LCD screen, the liquid crystals give out the light that the viewer sees.",
    answer: false,
    explanation: "False. The crystals only control light from the backlight; LEDs in a true LED screen give out their own light.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each output device to how it works.",
    pairs: [
      ["Inkjet printer", "Fires tiny droplets of ink from nozzles in a moving print head"],
      ["Laser printer", "Toner is attracted to charged areas of a rotating drum"],
      ["Speaker", "A current in a coil near a magnet makes a cone vibrate"],
      ["3D printer", "Melted material is built up layer by layer"],
    ],
    explanation: "Each device converts digital data into a different kind of output.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Digital to analogue first; then current, coil, magnet, cone."],
    stem: "Complete the description of how a speaker produces sound.",
    template: "Digital sound data is converted into an analogue signal by a {{blank:a}} and made stronger by an amplifier. The current flows through a {{blank:b}} that sits in the field of a permanent magnet. The changing current makes the attached {{blank:c}} vibrate, which creates sound waves in the air.",
    blanks: [
      { id: "a", accepted: ["DAC"], choices: ["DAC", "ADC", "CPU", "fuser"] },
      { id: "b", accepted: ["coil"], choices: ["coil", "drum", "lens", "nozzle"] },
      { id: "c", accepted: ["cone"], choices: ["cone", "drum", "mirror", "print head"] },
    ],
    explanation: "DAC → amplifier → coil in a magnetic field → cone vibrates → sound waves.",
  });
  b.calc({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: `A school's laser printer prints ${ppm} pages per minute. How many minutes does it take to print ${pages} pages of reports?`,
    value: minutes,
    unit: "min",
    wrong: [pages * ppm],
    explanation: `${pages} ÷ ${ppm} = ${minutes} minutes.`,
    workedSolution: `1. Time = pages ÷ pages per minute.\n2. ${pages} ÷ ${ppm} = ${minutes} minutes.`,
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Write the full name of the projector technology abbreviated **DLP**.",
    accepted: ["digital light processing"],
    wrong: ["digital laser printing"],
    explanation: "DLP = digital light processing: a chip of micro-mirrors forms the image.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    hints: ["Drum, laser, toner, paper, fuser."],
    stem: "Describe how a laser printer prints a page. [4]",
    points: [
      "The rotating drum is given an electrostatic charge",
      "A laser beam scans the drum, changing the charge to form an (electrostatic) image of the page",
      "Charged toner is attracted to the image areas of the drum and transferred to the (charged) paper",
      "The fuser uses heat and pressure to melt/fix the toner onto the paper",
    ],
    modelAnswer: "The drum is charged. The laser scans across it, changing the charge where the text and images will be. Toner sticks to those areas and is transferred to the paper as it rolls past. The fuser then melts the toner onto the paper with heat and pressure.",
    explanation: "Charge, laser image, toner transfer, fuse.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4, applies: CAM,
    hints: ["Give one benefit and one drawback of each type."],
    stem: "Compare DLP and LCD projectors, giving **one** benefit and **one** drawback of each. [4]",
    points: [
      "DLP benefit: higher contrast / smoother moving images / smaller and lighter",
      "DLP drawback: rainbow effect from the colour wheel / less saturated colours",
      "LCD benefit: brighter, well-saturated colours / sharp images in lit rooms / usually cheaper",
      "LCD drawback: lower contrast / visible pixel grid / panels can fade over time",
    ],
    modelAnswer: "A DLP projector gives high contrast and smooth video, but some viewers see a rainbow flicker. An LCD projector gives bright, saturated colours even in a lit room, but its contrast is lower and the pixel grid can be visible.",
    explanation: "One benefit and one drawback for each technology.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    hints: ["Match each output to the device that produces it.", "Inkjet steps: print head, nozzles, droplets, paper moves on."],
    stem: "Chipo runs a small design business in Gweru. She prints colour photographs of products for clients, makes plastic samples of new bottle caps, and plays videos with sound for customers in her shop.",
    parts: [
      P.match({ label: "(a)", stem: "Match each task to the most suitable output device.", pairs: [["Printing colour photographs in small numbers", "Inkjet printer"], ["Making plastic samples of bottle caps", "3D printer"], ["Playing the sound of the videos", "Speaker"]], explanation: "Inkjet for photographs, 3D printer for solid objects, speaker for sound." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe how the inkjet printer prints a photograph.", points: ["The print head moves across the paper", "Tiny droplets of ink are fired through nozzles (by a heater forming a bubble or a vibrating piezoelectric crystal)", "The paper is moved forward line by line until the image is complete"], modelAnswer: "The print head moves from side to side across the paper and fires tiny ink droplets through its nozzles, using a heater that forms a bubble or a vibrating crystal. The paper moves on a line at a time until the photograph is printed." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **two** drawbacks of using a 3D printer to make the samples.", points: ["Printing is slow (can take hours)", "Size limited by the printer / limited range of materials / material and printer costs"], modelAnswer: "Each sample can take hours to print, and the caps can only be made in the materials and sizes the printer supports." }),
    ],
    explanation: "Inkjet: moving head, droplets, line by line. 3D printers are slow and limited in size and materials.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, applies: ZIM,
    hints: ["Think about volume of printing, cost per page and quality."],
    stem: "A secondary school in Bindura must choose printers for its office (reports and letters, about 3 000 pages a month) and for its photography club (a few colour prints a week).",
    parts: [
      P.mcq({ label: "(a)", stem: "Which printer should the office buy?", options: [["Laser printer", "Correct: fast and cheap per page for large volumes."], ["Inkjet printer", "Too slow and costly per page for 3 000 pages."], ["3D printer", "Makes objects, not documents."], ["DLP printer", "DLP is a projector technology."]], answer: "A", explanation: "Laser printers suit high-volume text." }),
      P.manual({ label: "(b)", marks: 2, stem: "Justify the choice of an inkjet printer for the photography club.", points: ["Cheap to buy, and the small number of prints keeps the ink cost acceptable", "Produces high-quality colour photographs"], modelAnswer: "An inkjet printer is cheap to buy and prints high-quality colour photographs; because the club only prints a few pages, the higher ink cost per page is acceptable." }),
      P.manual({ label: "(c)", marks: 2, stem: "State **two** precautions when installing the laser printer in the office.", points: ["Place it in a well-ventilated area (toner particles / ozone)", "Handle toner cartridges carefully / keep it away from where people sit / turn off and let it cool before clearing jams (fuser is hot)"], modelAnswer: "Install it in a well-ventilated area because of toner dust and ozone, and switch it off and let the fuser cool before clearing paper jams." }),
    ],
    explanation: "Laser for volume; inkjet for occasional colour photographs; ventilate the laser printer.",
  });

  b.card("DEFINITION", "**Output device**", "Hardware that converts the results of processing into images, printed pages, sound or movement.");
  b.card("DEFINITION", "**Actuator**", "An output device that turns an electrical signal into movement (motor, valve, solenoid, pump).");
  b.card("CONCEPT", "LCD vs LED screen", "LCD: liquid crystals control a backlight (often LEDs). LED screen: each pixel's LEDs give out their own light.");
  b.card("CONCEPT", "DLP projector", "Millions of tilting micro-mirrors (one per pixel) and a spinning colour wheel; high contrast.", undefined, { applies: CAM });
  b.card("CONCEPT", "LCD projector", "Light split into red, green and blue beams through three LCD panels, combined by a prism; bright colours.", undefined, { applies: CAM });
  b.card("CONCEPT", "Laser printer steps", "Drum charged → laser forms electrostatic image → toner attracted → transferred to paper → fuser melts it on.");
  b.card("CONCEPT", "Inkjet printer", "Moving print head fires ink droplets through nozzles (thermal bubble or piezoelectric crystal); paper moves line by line.");
  b.card("DEFINITION", "**3D printer**", "Builds a solid object layer by layer from a digital design (additive manufacturing).");
  b.card("CONCEPT", "Speaker", "DAC → amplifier → current in a coil in a magnetic field → cone vibrates → sound waves.");
});
