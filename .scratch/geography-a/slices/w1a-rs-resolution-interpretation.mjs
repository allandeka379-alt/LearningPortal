// W1a: rs.resolution-interpretation. Illustrative sensors and numbers; all computed in code.
import { concept, P, t, chk, table, dpStr, geographyLevels } from "../lib.mjs";

const tab = (h, r) => table(h, r);
const SENS = [["Sensor X", "500 m", "daily", "7"], ["Sensor Y", "10 m", "5 days", "13"], ["Sensor Z", "20 m", "10 days", "9"]];
chk(250000 / 100, 2500);
chk(900000 / 400, 2250);
const pix45 = (4.5 * 1e6) / (50 * 50); // 4.5 km2 at 50 m = 1800
const width = (4000 * 25) / 1000; // 100 km
const vol = (8000 * 8000 * 4) / 1e6; // 256 MB

concept("ageo.rs.resolution-interpretation", { file: "rs/resolution-interpretation", keyPrefix: "rs.resolution-interpretation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does high spatial resolution mean?",
    options: [
      ["Small pixels that show fine detail", "Correct: each pixel covers a small area of ground."],
      ["Large pixels that cover a wide area", "That is low spatial resolution."],
      ["Images taken very often", "That is high temporal resolution."],
      ["Images with many bands", "That is high spectral resolution."],
    ],
    answer: "A",
    explanation: "High spatial resolution means each pixel represents a small ground area, so small features can be seen.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is temporal resolution?",
    options: [
      ["How often a sensor views the same place", "Correct: the revisit time."],
      ["The number of wavelength bands recorded", "That is spectral resolution."],
      ["The ground size of each pixel", "That is spatial resolution."],
      ["The number of brightness levels per pixel", "That is radiometric resolution."],
    ],
    answer: "A",
    explanation: "Temporal resolution is the time between successive images of the same place.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a standard false-colour composite (NIR shown as red), how does healthy vegetation appear?",
    options: [
      ["Bright red", "Correct: vegetation reflects NIR strongly."],
      ["Dark green", "Natural colour would show green, not this composite."],
      ["Black", "Water, which absorbs NIR, appears dark."],
      ["Bright blue", "Blue-grey tones usually show built-up areas or bare soil."],
    ],
    answer: "A",
    explanation: "Because NIR is assigned to the red channel and healthy plants reflect NIR strongly, they appear bright red.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which data are best for studying how a town has grown over the last 20 years?",
    options: [
      ["Moderate-resolution images from a long archive", "Correct: they show built-up land over time."],
      ["One coarse daily image from last week alone", "A single recent image shows no change."],
      ["A single radar image taken at night this year", "One image cannot show growth over years."],
      ["A thermal image of the whole town taken at noon", "Thermal images show temperature, not growth."],
    ],
    answer: "A",
    explanation: "Urban growth needs images of the same place at different dates over a long period, at a resolution fine enough to show built-up land.",
    hints: ["Which data allow comparison over many years?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In supervised classification, how are pixels assigned to classes?",
    options: [
      ["Using training areas of known cover to teach the computer", "Correct: the analyst provides examples."],
      ["The computer groups pixels with no input from the analyst", "That describes unsupervised classification."],
      ["By choosing the brightest pixel in each band", "Brightness alone does not classify the image."],
      ["By measuring the pixels with a ruler", "Classification uses band values, not a ruler."],
    ],
    answer: "A",
    explanation: "In supervised classification the analyst identifies training samples of each class and the software assigns all other pixels to the most similar class.",
    hints: ["Who provides the examples?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "An analyst needs weekly maps of crop condition for the whole country. Which trade-off is she most likely to accept?",
    options: [
      ["Coarse pixels for frequent coverage", "Correct: large areas and frequent images need coarser pixels."],
      ["Few images in exchange for very fine pixels", "That would not give weekly maps."],
      ["Fine pixels and very rare coverage", "Weekly maps need frequent coverage."],
      ["Radar only, with no optical bands", "NDVI needs the red and NIR bands."],
    ],
    answer: "A",
    explanation: "National weekly coverage requires frequent revisits, which sensors achieve at coarser spatial resolution.",
    hints: ["Which resolution matters most for weekly maps?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which interpretation clue describes a regular grid of rectangular fields?",
    options: [
      ["Pattern", "Correct: a regular arrangement of features."],
      ["Tone or brightness", "Tone is brightness."],
      ["Shadow and height", "Shadow suggests height."],
      ["Size of features", "Size describes dimensions."],
    ],
    answer: "A",
    explanation: "Pattern is the spatial arrangement of features, such as a grid of fields or rows of houses.",
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "An image has pixels of 50 m by 50 m. How many pixels are needed to cover a wetland of 4.5 km²?",
    value: pix45, unit: "pixels",
    wrong: [90, 18000],
    explanation: "One pixel = 50 × 50 = 2 500 m². The wetland = 4.5 × 1 000 000 = 4 500 000 m². 4 500 000 ÷ 2 500 = 1 800 pixels.",
    hints: ["Convert km² to m² first."],
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A scene is 4 000 pixels wide and each pixel is 25 m across. How wide is the scene, in km?",
    value: width, unit: "km",
    wrong: [100000, 10],
    explanation: "4 000 × 25 = 100 000 m = 100 km.",
    hints: ["Multiply, then convert metres to kilometres."],
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A scene has 8 000 × 8 000 pixels and 4 bands, each stored in 1 byte per pixel. Calculate the size of the data in megabytes (1 MB = 1 000 000 bytes).",
    value: vol, unit: undefined,
    wrong: [64, 1024],
    explanation: "8 000 × 8 000 = 64 000 000 pixels; × 4 bands = 256 000 000 bytes = 256 MB. Forgetting the number of bands gives 64 MB.",
    hints: ["Multiply pixels by bands by bytes."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A sensor records brightness using 10 bits per pixel. How many different brightness levels can it record?",
    value: 2 ** 10,
    wrong: [10, 100],
    explanation: "Number of levels = 2 raised to the number of bits: 2¹⁰ = 1 024.",
    hints: ["Each extra bit doubles the number of levels."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A sensor with 10 m pixels has a higher spatial resolution than a sensor with 30 m pixels.",
    answer: true,
    explanation: "True. Smaller pixels show more detail, so 10 m is the higher spatial resolution.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain why an image with 250 m pixels is unsuitable for mapping small farm plots of about 1 hectare.",
    points: ["Each 250 m pixel covers 6.25 hectares (62 500 m²), much larger than a plot of 1 hectare", "So each pixel contains several plots and other cover mixed together (mixed pixels)", "Individual plots and their boundaries cannot be seen or measured"],
    modelAnswer: "A 250 m pixel covers 62 500 m², or 6.25 hectares, much larger than a plot of one hectare. Each pixel therefore mixes several plots and other cover, and individual plots and their boundaries cannot be seen or measured.",
    explanation: "Compare pixel area with plot area and say what happens to the detail.",
    hints: ["Calculate the area of one pixel."],
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of resolution to its meaning.",
    pairs: [
      ["Spatial resolution", "Ground size of one pixel"],
      ["Temporal resolution", "Time between images of the same place"],
      ["Spectral resolution", "Number and width of bands"],
      ["Radiometric resolution", "Number of brightness levels per pixel"],
    ],
    explanation: "Each describes a different property of the sensor and its data.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement about false colour.",
    template: "In a standard false-colour composite, the {{blank:a}} band is shown in red, so healthy vegetation appears {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["near infrared"], choices: ["near infrared", "blue", "thermal"] },
      { id: "b", accepted: ["red"], choices: ["red", "blue", "black"] },
    ],
    explanation: "NIR is assigned to red, and healthy vegetation reflects NIR strongly.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of composite in which a near-infrared band is displayed as a visible colour.",
    accepted: ["false colour", "false-colour", "false colour composite", "false-colour composite", "false color"],
    wrong: ["natural colour", "thermal"],
    explanation: "A **false-colour composite** shows invisible bands with visible colours.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between spatial and temporal resolution.",
    points: ["Spatial resolution is the ground size of one pixel (how much detail)", "Temporal resolution is how often the same place is imaged (revisit time)", "A sensor with fine spatial detail often has less frequent coverage; trade-off between them"],
    modelAnswer: "Spatial resolution is the ground size of a pixel, which controls how much detail can be seen. Temporal resolution is how often the same place is imaged. Sensors with very fine detail usually revisit less often, so there is a trade-off between the two.",
    explanation: "Define both and note the trade-off.",
    hints: ["Detail versus frequency."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Describe how an analyst would use tone, shape and pattern to identify irrigated fields on a satellite image.",
    points: ["Tone/colour: bright (red in false colour) showing healthy vegetation, unlike the surroundings", "Shape: regular rectangular or circular fields with straight edges", "Pattern: a regular grid beside a river, dam or canal"],
    modelAnswer: "Irrigated fields appear as bright patches, red in false colour, because the crops are healthy and reflect near infrared strongly. They have regular rectangular or circular shapes with straight edges, and form a grid beside a river, dam or canal.",
    explanation: "Use all three clues with their evidence.",
    hints: ["What do healthy crops look like in false colour?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain two reasons why it is difficult to map crop condition from optical satellite images during the rainy season.",
    points: ["Cloud covers the ground and blocks optical sensors, leaving gaps", "Cloud shadows and haze change reflectance and may be mistaken for other features", "Images are available only on days with clear skies so the series of dates is irregular", "Frequent rain and mist reduce the number of usable images in the growing season"],
    modelAnswer: "Cloud blocks optical sensors for much of the rainy season, leaving gaps in the images. Cloud shadows and haze also alter reflectance and can be mistaken for other features, so images need correction or may be unusable.",
    explanation: "Two reasons, each explained.",
    hints: ["What does cloud do to optical images?"],
  });

  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`An agricultural officer is choosing satellite data to monitor crop condition and burn scars in a district (data invented for this exercise).\n\n${tab(["Sensor", "Pixel size", "Revisit time", "Bands"], SENS)}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "How many pixels of Sensor Y cover a field of 25 hectares (1 ha = 10 000 m²)?", value: 2500, unit: "pixels", wrong: [25, 250000], explanation: "25 ha = 250 000 m²; one 10 m pixel = 100 m²; 250 000 ÷ 100 = 2 500 pixels." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which sensor is most suitable for weekly national crop monitoring?", options: [["Sensor X", "Correct: daily coverage and wide scenes suit national monitoring."], ["Sensor Z", "A 10-day revisit is too infrequent for weekly maps."], ["Sensor Y", "Y is good for fields but covers smaller areas per image and less often than daily."], ["None, since none has the red and NIR bands", "All have bands in the visible and near infrared."]], answer: "A", explanation: "Daily coverage matters most for weekly national maps." }),
      P.manual({ label: "(c)", marks: 3, stem: "Justify your choice in (b).", points: ["Daily revisit gives repeated images each week, even if some are cloudy", "Coarse pixels cover wide areas so national coverage is quick and files are manageable", "Crop condition across large regions does not need fine detail (red and NIR bands give NDVI)"], modelAnswer: "Sensor X views the whole country daily, so a usable image is likely each week even with some cloud. Its coarse pixels cover large areas and keep files manageable, and national crop condition does not need fine detail because NDVI from the red and NIR bands is enough." }),
      P.num({ label: "(d)", marks: 2, type: "CALCULATION", stem: "A burn scar covers 0.9 km². How many 20 m pixels (Sensor Z) cover it?", value: 2250, unit: "pixels", wrong: [20, 22500], explanation: "0.9 km² = 900 000 m²; one pixel = 400 m²; 900 000 ÷ 400 = 2 250 pixels." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the shortwave infrared band is useful for mapping burn scars.", points: ["Burned areas lose their healthy vegetation, so NIR reflectance falls sharply", "Shortwave infrared reflectance rises/contrasts with unburned vegetation, which makes burned land stand out"], modelAnswer: "Burned areas lose healthy vegetation, so their near-infrared reflectance falls, while shortwave infrared reflectance rises, so the contrast with unburned vegetation makes burn scars stand out." }),
      P.manual({ label: "(f)", marks: 2, stem: "State two limitations of Sensor Z for monitoring the growth of a crop through a season.", points: ["A 10-day revisit gives few images in a season and cloud may remove some", "20 m pixels may mix crops with other cover in small fields"], modelAnswer: "A 10-day revisit gives few images in a season and cloud may remove some. The 20 m pixels may also mix crops with other cover in small fields." }),
    ],
    explanation: "Pixel counts, matching sensors to the task and explaining the bands used.",
    hints: ["Convert hectares or square kilometres to square metres."],
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A standard false-colour image of the area around a dam shows bright red blocks, a dark blue-black area, pale blue-grey patches and tan areas (data invented for this exercise).",
    parts: [
      P.match({ label: "(a)", marks: 4, stem: "Match each colour to the surface it most likely represents.", pairs: [["Bright red blocks", "Healthy irrigated crops"], ["Dark blue-black area", "Deep water of the dam"], ["Pale blue-grey patches", "Built-up area or bare soil"], ["Tan areas", "Dry grass or bare ground"]], explanation: "NIR is shown in red; water absorbs NIR; built-up and bare surfaces reflect all bands moderately." }),
      P.manual({ label: "(b)", marks: 2, stem: "State which band is shown in red in this composite and why vegetation appears red.", points: ["The near-infrared band is shown in red", "Healthy vegetation reflects NIR strongly, so the red channel is bright"], modelAnswer: "The near-infrared band is shown in red, and healthy vegetation reflects near infrared strongly, so it looks bright red." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give two clues, other than colour, that show the red blocks are crops and not natural vegetation.", points: ["Straight edges and regular rectangular shapes", "A regular pattern/grid beside the dam or canal (context)"], modelAnswer: "The blocks have straight edges and regular rectangular shapes, and lie in a regular pattern beside the dam." }),
    ],
    explanation: "Reading colours in a false-colour composite and using other clues.",
    hints: ["What does NIR look like in this composite?"],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the importance of spatial and temporal resolution when choosing satellite images to monitor the expansion of Harare. [8]",
    points: [
      "Spatial resolution must be fine enough to separate built-up land from fields and bare ground (10 m to 30 m)",
      "Very fine resolution images (<1 m) show buildings but cover small areas and cost more",
      "Coarse resolution (250 m to 1 km) blends cover types in a mixed city edge, so it is unsuitable",
      "Temporal resolution: growth occurs over years, so images need not be daily but need a long archive",
      "Images from the same season avoid confusing seasonal change with urban growth",
      "Cloud-free images are needed, so frequent coverage helps in the rainy season",
      "Choice involves cost, file size and processing capacity",
      "Judgement: spatial resolution is more important for detecting urban change, with moderate temporal resolution (annual) from a long archive such as Landsat sufficient",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Spatial resolution matters most because the city edge mixes buildings, fields and bare ground, so pixels of 10 to 30 m are needed to separate built-up land. Very fine images show individual buildings but cover small areas and cost more, while coarse pixels of 250 m or more blend land uses. Temporal resolution is less critical because growth occurs over years, but a long archive and images from the same season are needed to avoid confusing seasonal change with growth, and frequent coverage helps to obtain cloud-free images in the rainy season. Overall spatial resolution is more important, and an annual image from a long archive such as Landsat is enough.",
    wordLimit: { max: 300 },
    explanation: "Weigh the two resolutions for the task and reach a judgement.",
    hints: ["Which resolution is needed to separate the land uses, and how fast does a city grow?"],
  });

  b.card("DEFINITION", "Spatial resolution?", "The ground size of one pixel; smaller pixels show finer detail.");
  b.card("DEFINITION", "Temporal resolution?", "How often a sensor revisits the same place (revisit time).");
  b.card("DEFINITION", "Spectral resolution?", "The number and narrowness of the wavelength bands a sensor records.");
  b.card("FACT", "Number of brightness levels for n bits?", "2 to the power n (8-bit = 256 levels).");
  b.card("CONCEPT", "Standard false-colour composite?", "NIR shown as red, red as green, green as blue; healthy vegetation looks bright red, water dark.");
  b.card("CONCEPT", "Six image interpretation clues?", "Size, shape, tone (colour), texture, pattern and context (association, shadow).");
  b.card("CONCEPT", "Supervised and unsupervised classification?", "Supervised: analyst supplies training samples. Unsupervised: software groups similar pixels, the analyst names the groups.");
  b.card("CONCEPT", "Steps from raw band to map?", "Acquire, pre-process (geometric and atmospheric), enhance, composite, classify, check accuracy, produce map.");
  b.card("CONCEPT", "Why do spatial and temporal resolution trade off?", "Fine pixels cover small areas and are revisited less often; frequent coverage usually has coarser pixels.");
});
