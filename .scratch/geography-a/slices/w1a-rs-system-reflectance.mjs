// W1a: rs.system-reflectance. Illustrative reflectance data; numbers computed in code.
import { concept, P, t, chk, table, pctChange, dpStr, geographyLevels } from "../lib.mjs";

const mt = (x, dp) => dpStr(x, dp).replace("−", "-");
const tab = (h, r) => table(h, r);
const ndvi = (nir, red) => (nir - red) / (nir + red);
const PIX = [["A", 0.07, 0.45], ["B", 0.07, 0.03], ["C", 0.19, 0.25], ["D", 0.11, 0.14]]; // red, nir
const nd = PIX.map(([, r, n]) => ndvi(n, r));
const f500 = 3e8 / 0.5e-6 / 1e14; // 6 (x1e14 Hz)
chk(f500, 6, 1e-9);
const lam = 3e8 / (5e14) * 1e6; // 0.6 um
chk(lam, 0.6, 1e-9);
const drop = -pctChange(0.74, 0.52);

concept("ageo.rs.system-reflectance", { file: "rs/system-reflectance", keyPrefix: "rs.system-reflectance" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main source of energy for a passive remote sensing system?",
    options: [
      ["The Sun", "Correct: passive sensors record reflected sunlight."],
      ["The sensor itself", "That is the source for active systems such as radar."],
      ["The target surface", "A surface reflects or emits energy but is not the main source."],
      ["The atmosphere", "The atmosphere absorbs and scatters energy."],
    ],
    answer: "A",
    explanation: "Passive systems rely on solar radiation reflected by the target (or on heat emitted by it).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Healthy green vegetation reflects strongly in which part of the spectrum?",
    options: [
      ["Near infrared", "Correct: leaf structure reflects NIR strongly."],
      ["Red", "Chlorophyll absorbs red light."],
      ["Blue", "Chlorophyll also absorbs blue light."],
      ["Thermal infrared", "Thermal bands record emitted heat, not reflectance."],
    ],
    answer: "A",
    explanation: "Healthy leaves absorb blue and red for photosynthesis, but the internal structure of the leaf scatters near-infrared strongly.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can clear water be separated easily from land in a near-infrared band?",
    options: [
      ["Water absorbs NIR and appears very dark", "Correct: reflectance is close to zero."],
      ["Water reflects NIR more strongly than land", "Water reflects very little NIR."],
      ["Water emits NIR radiation at night", "Emission is mainly in the thermal bands."],
      ["Water and land have identical NIR values", "Their NIR reflectance is very different."],
    ],
    answer: "A",
    explanation: "Water absorbs almost all NIR radiation, so it is dark while vegetation and soil are brighter.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A pixel has red reflectance 0.08 and NIR reflectance 0.40. Which description of the pixel is most likely?",
    options: [
      ["Healthy vegetation", "Correct: NDVI = 0.32 ÷ 0.48 = 0.67."],
      ["Clear water, since NDVI is negative", "Water has very low NIR and negative NDVI."],
      ["Bare soil, since NDVI is near 0.1", "Bare soil has a much lower NDVI."],
      ["A cloud, since NDVI is 1", "Cloud has NDVI near zero, and the value here is not 1."],
    ],
    answer: "A",
    explanation: "NDVI = (0.40 − 0.08) ÷ (0.40 + 0.08) = 0.67, a high value typical of healthy vegetation.",
    hints: ["Calculate NDVI first."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An analyst needs to map the extent of floods under cloud during the rainy season. Which sensor type is most suitable?",
    options: [
      ["An active radar sensor", "Correct: microwaves pass through cloud and radar works at night."],
      ["A passive visible-light sensor", "Cloud blocks visible light."],
      ["A passive thermal sensor", "Cloud also blocks thermal infrared."],
      ["A black-and-white aerial camera", "A camera cannot see through cloud either."],
    ],
    answer: "A",
    explanation: "Radar wavelengths pass through cloud, and being active the sensor needs no sunlight.",
    hints: ["Which radiation passes through cloud?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is an atmospheric window?",
    options: [
      ["Wavelengths that pass easily through air", "Correct: sensors use these ranges."],
      ["A gap in the clouds above the study area", "That is a weather condition, not a spectral range."],
      ["The time of day when the sky is clear", "A window refers to wavelength, not time."],
      ["The opening in a satellite through which energy enters", "That is part of the sensor, not the atmosphere."],
    ],
    answer: "A",
    explanation: "Gases absorb some wavelengths; remote sensing bands are placed in the windows where transmission is high.",
    hints: ["It refers to wavelength."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What does a plot of red reflectance against near-infrared reflectance for all the pixels in an image show?",
    options: [
      ["Feature space, where same covers cluster", "Correct: this is how classification uses band values."],
      ["Image space, in which pixels keep their map positions", "Image space shows rows and columns, not band values."],
      ["A climate graph for the area", "That would show temperature and rainfall."],
      ["The orbit of the satellite", "An orbit is not shown by band values."],
    ],
    answer: "A",
    explanation: "In feature space each pixel is a point positioned by its band values, so similar surfaces group together whatever their location in the image.",
    hints: ["Which space uses band values as axes?"],
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A pixel has a red reflectance of 0.08 and a near-infrared reflectance of 0.46. Calculate its NDVI, to two decimal places, using NDVI = (NIR − Red) ÷ (NIR + Red).",
    value: ndvi(0.46, 0.08), dp: 2,
    wrong: [0.38, 5.75],
    explanation: "NIR − Red = 0.38; NIR + Red = 0.54; NDVI = 0.38 ÷ 0.54 = 0.70. Forgetting to divide gives 0.38; dividing NIR by Red gives 5.75.",
    hints: ["Subtract for the top, add for the bottom."],
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Green light has a wavelength of 0.50 µm. Using c = fλ with c = 3 × 10⁸ m/s, calculate its frequency in units of 10¹⁴ Hz.",
    value: f500, dp: 1,
    wrong: [0.6, 1.5],
    explanation: "f = 3 × 10⁸ ÷ (0.50 × 10⁻⁶) = 6 × 10¹⁴ Hz, so the answer is 6.0 in units of 10¹⁴ Hz.",
    hints: ["0.50 µm = 0.50 × 10⁻⁶ m."],
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A band has a frequency of 5.0 × 10¹⁴ Hz. Calculate its wavelength, in µm (c = 3 × 10⁸ m/s).",
    value: lam, dp: 1, unit: undefined,
    wrong: [1.67, 6],
    explanation: "λ = c ÷ f = 3 × 10⁸ ÷ 5.0 × 10¹⁴ = 6.0 × 10⁻⁷ m = 0.6 µm (orange-red).",
    hints: ["Rearrange c = fλ."],
  });
  b.num({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "The mean NDVI of a maize field falls from 0.74 in January to 0.52 in February. Calculate the percentage decrease, to one decimal place.",
    value: drop, dp: 1, unit: "%",
    wrong: [42.3, 22],
    explanation: "Decrease = 0.74 − 0.52 = 0.22; 0.22 ÷ 0.74 × 100 = 29.7%. Using 0.52 as the base gives 42.3%.",
    hints: ["Divide the change by the starting value."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Active sensors such as radar need sunlight to work.",
    answer: false,
    explanation: "False. Active sensors supply their own energy, so they work at night and through cloud.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Distinguish between passive and active remote sensing systems, giving an example of each.",
    points: ["Passive sensors record energy from an outside source (the Sun) that is reflected or emitted by the target, for example Landsat", "Active sensors send out their own energy and record what is returned, for example radar", "Active systems work at night and through cloud, whereas passive optical systems need daylight and clear skies"],
    modelAnswer: "Passive sensors, such as the optical sensors on Landsat, record sunlight reflected or heat emitted by the target. Active sensors, such as radar, send out their own energy and record what returns. Active systems work at night and through cloud, whereas passive optical ones need daylight and clear skies.",
    explanation: "Define both, give an example of each, and contrast their conditions of use.",
    hints: ["Which kind of sensor supplies its own energy?"],
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each surface with its typical spectral signature.",
    pairs: [
      ["Healthy vegetation", "Low in red, very high in near infrared"],
      ["Clear water", "Low everywhere and close to zero in near infrared"],
      ["Dry bare soil", "Reflectance rising steadily from visible to shortwave infrared"],
      ["Tarred road", "Low reflectance, fairly flat across bands"],
    ],
    explanation: "Each surface has a recognisable pattern of reflectance across the bands.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement about NDVI.",
    template: "NDVI is calculated from the {{blank:a}} and {{blank:b}} bands; high values indicate healthy vegetation.",
    blanks: [
      { id: "a", accepted: ["red"], choices: ["red", "thermal", "radar"] },
      { id: "b", accepted: ["near infrared"], choices: ["near infrared", "blue", "green"] },
    ],
    explanation: "NDVI contrasts red absorption with near-infrared reflection.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the pattern of reflectance of a surface across different wavelengths?",
    accepted: ["spectral signature", "spectral reflectance curve", "spectral response", "signature"],
    wrong: ["resolution", "datum"],
    explanation: "A **spectral signature** is a surface's reflectance pattern across wavelengths.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why healthy vegetation reflects strongly in the near infrared but weakly in the red.",
    points: ["Chlorophyll absorbs red (and blue) light for photosynthesis, so little red is reflected", "The internal cell structure of leaves scatters near-infrared radiation", "Plants do not use NIR for photosynthesis, so it is reflected rather than absorbed"],
    modelAnswer: "Chlorophyll absorbs red and blue light for photosynthesis, so little red is reflected. Near-infrared radiation is not used by the plant and the internal structure of the leaf scatters it, so it is strongly reflected.",
    explanation: "Absorption of red versus scattering of NIR.",
    hints: ["What does chlorophyll absorb?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe the sequence of the remote sensing system from energy source to final image.",
    points: ["Energy source (the Sun, or the sensor for active systems) sends radiation through the atmosphere", "The target reflects or emits it and the sensor records the radiation", "Data are transmitted, processed and displayed as an image for interpretation"],
    modelAnswer: "Radiation from the energy source, usually the Sun, passes through the atmosphere to the target, which reflects or emits it back through the atmosphere. The sensor records it, the data are transmitted to a ground station and processed, and an image is displayed for interpretation.",
    explanation: "Source, target and sensor, then processing and interpretation.",
    hints: ["Begin with the source and end with the image."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest two limitations of using optical satellite images (visible and near infrared) to monitor crops in the rainy season.",
    points: ["Cloud cover blocks the view, leaving gaps in the images", "Atmospheric haze and scattering alter reflectance and need correction", "Cloud shadows can be mistaken for dark features/water", "Images may be too infrequent to catch rapid changes in crop condition"],
    modelAnswer: "Cloud cover is common in the rainy season and blocks optical sensors, leaving gaps in the record. Haze and scattering also change reflectance values so that images need correction before they can be compared, and cloud shadows can be mistaken for dark features such as water.",
    explanation: "Any two limitations, each explained.",
    hints: ["What is the weather like in the growing season?"],
  });

  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Four pixels (A to D) from a multispectral image of a farming area have these reflectance values (illustrative data).\n\n${tab(["Pixel", "Red", "Near infrared"], PIX.map(([n, r, ni]) => [n, dpStr(r, 2), dpStr(ni, 2)]))}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the NDVI of pixel A, to two decimal places.", value: nd[0], dp: 2, wrong: [0.38, 6.43], explanation: t`$(0.45 - 0.07) \div (0.45 + 0.07) = 0.38 \div 0.52 = ${dpStr(nd[0], 2)}$.` }),
      P.short({ label: "(b)", marks: 1, stem: "Pixel B has a negative NDVI. Name the surface it most likely shows.", accepted: ["water", "a water body", "dam", "lake", "reservoir"], explanation: t`$(0.03 - 0.07) \div (0.03 + 0.07) = ${mt(nd[1], 2)}$, typical of water.` }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the NDVI of pixel A is much higher than that of pixel C.", points: ["Pixel A is dense healthy vegetation: chlorophyll absorbs red so red reflectance is low", "A has very high NIR reflectance because leaf structure reflects it", "Pixel C has similar red and NIR values, typical of bare soil/sparse vegetation, so the contrast is small"], modelAnswer: "Pixel A is healthy vegetation: chlorophyll absorbs red light, so red reflectance is low, while the leaf structure reflects near infrared strongly. Pixel C has similar red and NIR values, typical of bare soil or sparse vegetation, so the contrast and NDVI are small." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why radar images might be used to monitor the same farming area during the rainy season.", points: ["Cloud is common in the rainy season and blocks optical sensors", "Radar uses microwaves which pass through cloud", "As an active sensor it supplies its own energy so it works day or night, giving regular images"], modelAnswer: "Cloud is common in the rainy season and blocks optical sensors. Radar uses microwaves that pass through cloud, and because it is an active sensor that supplies its own energy it works day and night, giving regular images." }),
      P.manual({ label: "(e)", marks: 3, stem: "Describe how the four pixels would appear if plotted in feature space (red on one axis, NIR on the other).", points: ["Pixel A is at low red and high NIR (top left)", "Pixel B is at low red and very low NIR (close to the origin)", "Pixels C and D lie close together at medium values, forming a separate cluster of soil/sparse cover"], modelAnswer: "Pixel A lies at low red and high NIR, at the top left. Pixel B lies near the origin with low values in both bands. Pixels C and D plot close together at medium red and NIR values, forming a cluster for bare soil or sparse cover." }),
    ],
    explanation: "NDVI calculation and the reasons for the differences between surfaces and sensors.",
    hints: ["NDVI = (NIR − Red) ÷ (NIR + Red)."],
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "A catchment manager compares optical and radar satellite images for mapping the extent of flooding after a storm (data invented for this exercise).",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which sensor type supplies its own energy?", options: [["Radar", "Correct: radar is an active sensor."], ["A visible-light camera", "A camera records reflected sunlight, which is passive."], ["A thermal scanner", "A thermal scanner records emitted heat."], ["A near-infrared scanner", "NIR scanners record reflected sunlight."]], answer: "A", explanation: "Radar is active." }),
      P.manual({ label: "(b)", marks: 2, stem: "State two advantages of radar for mapping a flood.", points: ["Microwaves pass through cloud, so it can see during a storm", "Works day or night (active sensor); smooth flood water gives a clear, dark return"], modelAnswer: "Radar sees through cloud during the storm and works day and night, and smooth flood water gives a dark return that is easy to map." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two limitations of optical sensors for the same task.", points: ["Cloud blocks the view during the storm", "Optical sensors need daylight (passive) and images may be several days apart"], modelAnswer: "Cloud blocks the view of the flood and optical sensors need daylight, so images may be delayed for days." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest how a near-infrared band could still be useful in mapping the flood once the sky clears.", points: ["Water absorbs NIR so it appears very dark", "Land (soil and vegetation) is much brighter in NIR, giving a sharp boundary", "Comparing a before and after image shows the area flooded"], modelAnswer: "Water absorbs near infrared and looks very dark, whereas land is much brighter, so the edge of the flood is clear. Comparing images before and after the storm shows the extent of the flooded area." }),
    ],
    explanation: "Comparing sensors and using NIR to map water.",
    hints: ["What happens to NIR over water?"],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the usefulness of NDVI for monitoring crop condition across a country such as Zimbabwe. [8]",
    points: [
      "Simple to calculate from two bands and can be mapped for large areas",
      "Repeated images (every few days) show change through the season",
      "Healthy dense crops give high values; stress or drought lowers NDVI before damage is visible on the ground",
      "Useful for early warning and for estimating yield or food security",
      "Cloud in the rainy season blocks optical data and gaps must be filled",
      "NDVI saturates over dense vegetation and soil colour and moisture affect low values",
      "Cannot identify the cause of stress (drought, pests, nutrient shortage) without field data",
      "Judgement: a powerful early-warning tool when used with rainfall data and field checks, not on its own",
    ],
    levels: geographyLevels(8),
    modelAnswer: "NDVI is simple to calculate from the red and near-infrared bands and can be mapped over very large areas, with repeated images showing how crops change through the season. Stress or drought lowers NDVI before damage is visible on the ground, so it is useful for early warning and for estimating yields. However, cloud blocks optical data in the rainy season, NDVI saturates over dense vegetation, soil colour and moisture affect low values, and it cannot say why a crop is stressed. Overall it is a powerful early-warning tool, but it should be used with rainfall data and field checks.",
    wordLimit: { max: 300 },
    explanation: "Strengths, limitations and a judgement.",
    hints: ["Think of coverage and timing, then of what NDVI cannot show."],
  });

  b.card("DEFINITION", "Passive and active sensors?", "Passive: record reflected sunlight or emitted heat. Active: send out their own energy (radar, lidar) and record the return.");
  b.card("CONCEPT", "Parts of the remote sensing system?", "Energy source, atmosphere, target, sensor, transmission and processing, image and interpretation.");
  b.card("FACT", "Spectral signature of healthy vegetation?", "Low in blue and red, small green peak, very high in near infrared, lower in shortwave infrared.");
  b.card("FACT", "Spectral signature of water?", "Low reflectance everywhere, highest in blue-green, near zero in near infrared.");
  b.card("FORMULA", "NDVI?", t`$NDVI = \dfrac{NIR - Red}{NIR + Red}$`, "High: dense healthy vegetation. About 0.1-0.2: bare soil. Negative: water.");
  b.card("FORMULA", "Wavelength and frequency?", t`$c = f\lambda$, with $c = 3 \times 10^{8}$ m/s; shorter wavelength means higher frequency.`);
  b.card("CONCEPT", "Why use radar in the rainy season?", "Microwaves pass through cloud and radar is active, so it works day and night.");
  b.card("DEFINITION", "Atmospheric window?", "A range of wavelengths that the atmosphere transmits well; sensor bands are placed in these ranges.");
  b.card("DEFINITION", "Image space and feature space?", "Image space: pixels by row and column. Feature space: pixels plotted by their band values; cover types form clusters.");
});
