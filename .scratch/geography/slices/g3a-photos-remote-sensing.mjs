// Slice G3a: maps.photos-remote-sensing (photograph types, describing photos, EM spectrum, spectral signatures,
// false colour, passive/active sensors, uses and limits). Computed: 2 km = 200 000 cm, 5:200 000 = 1:40 000;
// (300/30) x (150/30) = 10 x 5 = 50 pixels; (1000/20)^2 = 2500 pixels.
import { concept, P, geographyLevels } from "../lib.mjs";

const REFLECT = [
  "Table 1 shows the percentage of radiation reflected by three surfaces (X, Y and Z) in three bands, as recorded by a satellite sensor (fictional data).",
  "",
  "| Surface | Green (%) | Red (%) | Near-infrared (%) |",
  "|---|---|---|---|",
  "| X | 10 | 5 | 50 |",
  "| Y | 6 | 4 | 1 |",
  "| Z | 20 | 25 | 30 |",
].join("\n");

const PHOTO = [
  "A Form 3 class is given this written description of a photograph taken from a light aircraft at an angle to the ground (fictional place).",
  "",
  "- **Foreground:** a large field of tall, green maize; a dirt road crosses from left to right.",
  "- **Middle ground:** a river with a low bridge; a village of about thirty thatched huts and a school on gently sloping land beside the river.",
  "- **Background:** steep hills covered in forest; a waterfall on the left; the horizon and sky are visible along the top.",
].join("\n");

concept("geo.maps.photos-remote-sensing", { file: "maps/photos-remote-sensing", keyPrefix: "maps.photos-remote-sensing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of photograph is taken from **directly above** the ground?",
    options: [
      ["A vertical aerial photograph", "Correct: the camera points straight down, giving a plan view like a map."],
      ["A low oblique aerial photograph", "Oblique photographs are taken at an angle, not straight down."],
      ["A ground photograph", "Ground photographs are taken horizontally at ground level."],
      ["A high oblique aerial photograph", "High oblique photographs are taken at an angle and include the horizon."],
    ],
    answer: "A",
    explanation: "A **vertical aerial photograph** looks straight down, so its scale is nearly even and it can be used like a map.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What distinguishes a **high oblique** aerial photograph from a low oblique one?",
    options: [
      ["It shows the horizon", "Correct: the camera is tilted enough for the horizon and sky to appear."],
      ["It is taken straight down", "A photograph taken straight down is vertical, not oblique."],
      ["It is taken from ground level", "Oblique aerial photographs are taken from the air."],
      ["It has an even scale throughout", "Oblique photographs never have an even scale; distant features look smaller."],
    ],
    answer: "A",
    explanation: "Both oblique types are taken at an angle; a **high oblique** shows the **horizon**, a low oblique does not.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On a ground or oblique photograph, where is the **foreground**?",
    options: [
      ["At the bottom, nearest the camera", "Correct: the foreground is the part closest to the photographer."],
      ["At the top, furthest from the camera", "That is the background."],
      ["In the centre of the photograph", "The centre band is usually the middle ground."],
      ["Along the left-hand edge", "Foreground, middle ground and background run from bottom to top, not left to right."],
    ],
    answer: "A",
    explanation: "Foreground (bottom, nearest), middle ground, background (top, furthest).",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of these types of radiation has the **longest** wavelength?",
    options: [
      ["Near-infrared", "Correct: near-infrared lies just beyond red, at longer wavelengths than all visible light."],
      ["Red light", "Red has the longest wavelength of visible light, but near-infrared is longer still."],
      ["Ultraviolet", "Ultraviolet is shorter than visible light."],
      ["X-rays", "X-rays have very short wavelengths."],
    ],
    answer: "A",
    explanation: "Order, short to long: X-rays → ultraviolet → visible (violet ... red) → **near-infrared** → microwaves → radio.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Roughly what range of wavelengths can the human eye see?",
    options: [
      ["About 400 to 700 nanometres", "Correct: from violet (about 400 nm) to red (about 700 nm)."],
      ["About 1 to 10 nanometres", "These very short wavelengths are X-rays, which we cannot see."],
      ["About 1 to 10 metres", "Wavelengths of metres are radio waves."],
      ["About 1 to 10 millimetres", "Millimetre wavelengths are microwaves, used by radar."],
    ],
    answer: "A",
    explanation: "Visible light spans roughly **400–700 nm**; everything outside that band is invisible to us.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true, secs: 45,
    stem: "In which band does **healthy green vegetation** reflect the most radiation?",
    options: [
      ["Near-infrared", "Correct: the internal structure of healthy leaves reflects near-infrared very strongly."],
      ["Red", "Chlorophyll absorbs most red light for photosynthesis."],
      ["Blue", "Chlorophyll absorbs most blue light as well."],
      ["Ultraviolet", "Leaves reflect very little ultraviolet."],
    ],
    answer: "A",
    explanation: "Leaves absorb blue and red, reflect some green and reflect **near-infrared** strongly, which is why vegetation stands out in infrared images.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", secs: 60,
    stem: "In a standard false-colour satellite image (near-infrared shown as red, red as green, green as blue), how does a field of healthy irrigated wheat appear?",
    hints: ["Which band does healthy vegetation reflect most strongly?", "Which display colour is that band given?"],
    options: [
      ["Bright red", "Correct: strong near-infrared reflection is displayed in red."],
      ["Bright green", "Green would be natural colour; in this composite green shows the red band, which plants absorb."],
      ["Dark blue or black", "Dark blue or black is typical of clear water, which absorbs near-infrared."],
      ["Pale grey-blue", "Grey-blue tones usually show built-up areas."],
    ],
    answer: "A",
    explanation: "Healthy crops reflect near-infrared strongly; the composite displays near-infrared as red, so the field appears **bright red**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does a clear lake appear **very dark** in a near-infrared image?",
    options: [
      ["Water absorbs nearly all near-infrared", "Correct: almost no near-infrared is reflected back to the sensor."],
      ["Water reflects near-infrared very strongly", "Strong reflection would make the lake appear bright, not dark."],
      ["Lakes are always covered by cloud", "Cloud appears bright; the darkness comes from absorption by water."],
      ["Satellites cannot pass over lakes", "Satellites record lakes like any other surface."],
    ],
    answer: "A",
    explanation: "Clear water **absorbs** near-infrared, so little returns to the sensor and the water appears dark.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are **radar** satellites especially useful for mapping floods during a tropical cyclone?",
    options: [
      ["Their microwaves pass through cloud", "Correct: radar is an active sensor that sends its own microwave signal through cloud and works at night."],
      ["They record visible light more sharply", "Visible-light sensors are blocked by cloud, the problem during a cyclone."],
      ["They take photographs from ground level", "Radar satellites operate from orbit, not the ground."],
      ["They need bright sunshine to work", "Radar provides its own signal and does not need sunlight."],
    ],
    answer: "A",
    explanation: "Radar is an **active** sensor using **microwaves**, which pass through cloud and need no daylight.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", secs: 75,
    stem: "Two bridges are **5 cm** apart on a vertical aerial photograph and **2 km** apart on the ground. What is the scale of the photograph?",
    hints: ["Convert 2 km to centimetres.", "Write photo distance : ground distance and simplify so the first number is 1."],
    options: [
      ["1:40 000", "Correct: 2 km = 200 000 cm, and 5 : 200 000 = 1 : 40 000."],
      ["1:400 000", "This uses 2 000 000 cm for 2 km; 1 km is 100 000 cm."],
      ["1:10 000", "This multiplies by 5 instead of dividing: 200 000 ÷ 5 = 40 000."],
      ["1:4 000", "This uses 20 000 cm for 2 km."],
    ],
    answer: "A",
    explanation: "2 km = 200 000 cm. Scale = 5 : 200 000 = **1 : 40 000**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Trees and buildings on a ground photograph cast **long shadows**. What does this suggest?",
    options: [
      ["It was taken early or late in the day", "Correct: the Sun is low in the sky then, so shadows are long."],
      ["It was taken at about midday", "Near midday the Sun is high and shadows are short."],
      ["It was taken under heavy rain cloud", "Thick cloud gives weak or no shadows."],
      ["It was taken at night by moonlight", "Without sunlight there are no clear shadows."],
    ],
    answer: "A",
    explanation: "A **low Sun** gives long shadows, so the photograph was probably taken early or late in the day.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is **ground truthing** in remote sensing?",
    options: [
      ["Checking what is on the ground to confirm image interpretation", "Correct: field visits test whether a coloured area really is, say, a crop or a forest."],
      ["Correcting a satellite's orbit using ground signals", "Orbit control is not part of image interpretation."],
      ["Taking ground photographs instead of satellite images", "Ground truthing supports images; it does not replace them."],
      ["Measuring the height of the ground with contours", "Contours show relief; ground truthing checks land cover."],
    ],
    answer: "A",
    explanation: "**Ground truthing** means visiting sample sites to check that image classes match reality.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", secs: 90,
    stem: "A satellite image has a spatial resolution of **30 m** (each pixel covers 30 m × 30 m). A rectangular field measures **300 m by 150 m**. How many pixels does the field cover?",
    value: 50,
    wrong: [15, 1500],
    hints: ["Work out how many pixels fit along each side."],
    explanation: "300 ÷ 30 = 10 pixels long; 150 ÷ 30 = 5 pixels wide; 10 × 5 = **50 pixels**.",
    workedSolution: "1. Length in pixels: 300 m ÷ 30 m = 10.\n2. Width in pixels: 150 m ÷ 30 m = 5.\n3. Total: 10 × 5 = 50 pixels.",
  });
  b.num({
    d: 3, skill: "APPLICATION", secs: 75,
    stem: "An image has **20 m** pixels. How many pixels cover **1 km²**?",
    value: 2500,
    wrong: [50, 50000],
    hints: ["1 km² is 1 000 m × 1 000 m."],
    explanation: "1 000 ÷ 20 = 50 pixels each way; 50 × 50 = **2 500** pixels.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the invisible band of radiation, just beyond red light, that healthy vegetation reflects strongly.",
    accepted: ["near-infrared", "near infrared", "nearinfrared", "near infra-red", "near infra red", "NIR", "infrared", "infra-red", "infra red"],
    wrong: ["ultraviolet", "red"],
    explanation: "**Near-infrared** lies just beyond the red end of the visible spectrum.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An oblique aerial photograph has the same scale across the whole image.",
    answer: false,
    feedbackFalse: "Correct: on an oblique photograph distant features appear smaller than near ones, so the scale changes.",
    feedbackTrue: "Not so: only a vertical photograph has a nearly even scale; oblique photographs shrink towards the background.",
    explanation: "Oblique photographs have a **changing scale**; vertical photographs are nearly even, like a map.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "Ultraviolet has a {{blank:a}} wavelength than visible light. Infrared has a {{blank:b}} wavelength than visible light. Radar uses {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["shorter"], choices: ["shorter", "longer"] },
      { id: "b", accepted: ["longer"], choices: ["longer", "shorter"] },
      { id: "c", accepted: ["microwaves"], choices: ["microwaves", "X-rays", "ultraviolet"] },
    ],
    explanation: "UV is shorter than visible light; infrared is longer; radar uses microwaves, longer still.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each surface to how it usually appears in a standard false-colour image (near-infrared shown as red).",
    hints: ["Think about how strongly each surface reflects near-infrared."],
    pairs: [
      ["Healthy forest", "Bright red"],
      ["Clear, deep water", "Dark blue or black"],
      ["Town centre with concrete and roofs", "Blue-grey or cyan"],
      ["Dry bare soil", "Pale or brownish tones"],
    ],
    explanation: "Strong near-infrared → red (vegetation); absorption → dark (water); urban → blue-grey; bare soil → pale.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Suggest three advantages of satellite images over field surveys for monitoring the loss of woodland in a large district.",
    hints: ["Think about area, repeat images and cost or access."],
    points: [
      "They cover a very large area at once.",
      "Images are repeated regularly, so changes over time (before and after) can be compared.",
      "They reach remote or dangerous areas without travel / are cheaper and faster than surveying on foot.",
    ],
    modelAnswer: "A satellite image covers the whole district at once, images are taken again every few days or weeks so before-and-after comparisons show where trees have been cleared, and remote areas can be monitored without the cost and time of travelling there.",
    explanation: "Coverage, repetition and access are the main advantages.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Evaluate the usefulness of remote sensing for managing a disaster such as a flood caused by a tropical cyclone.",
    hints: ["Think about what images show, how quickly, and through what conditions.", "Consider limitations: cloud, resolution, cost, ground truthing."],
    points: [
      "Images map the extent of flooding quickly over a large area, helping rescuers decide where to go.",
      "Damage to roads, bridges and settlements can be identified to plan access and aid.",
      "Before-and-after images show change and help plan recovery and future hazard maps.",
      "Radar (active, microwave) works through cloud and at night, when optical images fail.",
      "Limitations: optical images blocked by cloud; resolution may miss small features; need ground truthing; cost, skills and internet access needed.",
      "Judgement: very useful, especially combined with radar and local reports, but not a replacement for people on the ground.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Remote sensing is very useful in floods because satellite and aerial images show the extent of the water over a large area within days, so rescuers and planners can see which villages, roads and bridges are cut off. Images taken before and after the event show the damage and help plan rebuilding and future hazard maps. Radar satellites, which use microwaves, see through the thick cloud of a cyclone and work at night. However, ordinary optical images may be blocked by cloud, small features may be smaller than one pixel, interpretations must be checked on the ground, and processing needs skilled staff, equipment and internet access. Overall, remote sensing is a valuable tool, especially radar combined with local reports, but it cannot replace teams on the ground.",
    explanation: "Weigh speed, coverage and all-weather radar against cloud, resolution and the need for ground truthing.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: REFLECT,
    hints: ["Vegetation reflects near-infrared strongly; water absorbs it.", "Bare soil reflects fairly evenly across the bands."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which surface is most likely to be healthy vegetation?",
        options: [
          ["X", "Correct: low red reflection (absorbed by chlorophyll) and very high near-infrared reflection."],
          ["Y", "Y reflects almost no near-infrared, typical of water."],
          ["Z", "Z reflects fairly evenly, typical of bare soil."],
          ["Y and Z equally", "Neither reflects much more near-infrared than red; only X does."],
        ],
        answer: "A",
        explanation: "Vegetation: low red, high near-infrared.",
      }),
      P.mcq({
        label: "(b)", stem: "Which surface is most likely to be clear water?",
        options: [
          ["Y", "Correct: very low reflection in every band, especially near-infrared (1%)."],
          ["X", "X reflects 50% of near-infrared, which water absorbs."],
          ["Z", "Z reflects 20-30% in all bands, too bright for clear water."],
          ["X and Z equally", "Both reflect far more near-infrared than water does."],
        ],
        answer: "A",
        explanation: "Clear water absorbs almost all near-infrared.",
      }),
      P.num({
        label: "(c)", stem: "Calculate the difference between the near-infrared and red reflection of surface X, in percentage points.",
        value: 45, wrong: [55, 10],
        explanation: "50 − 5 = 45 percentage points.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why surface X reflects so little red light.",
        points: [
          "Chlorophyll in the leaves absorbs red light.",
          "The absorbed red light is used for photosynthesis.",
        ],
        explanation: "Chlorophyll absorbs red (and blue) light for photosynthesis.",
      }),
    ],
    explanation: "Each surface has a spectral signature; comparing bands identifies the surface.",
  });
  b.struct({
    d: 2, skill: "APPLICATION",
    stem: PHOTO,
    hints: ["Look at the angle of the camera and whether the horizon shows.", "Think about when maize is tall and green in Zimbabwe."],
    parts: [
      P.mcq({
        label: "(a)", stem: "What type of photograph is described?",
        options: [
          ["High oblique aerial photograph", "Correct: taken from the air at an angle, and the horizon is visible."],
          ["Low oblique aerial photograph", "A low oblique photograph does not show the horizon."],
          ["Vertical aerial photograph", "A vertical photograph looks straight down and shows no horizon."],
          ["Ground photograph", "It was taken from an aircraft, not at ground level."],
        ],
        answer: "A",
        explanation: "Angle from the air + horizon visible = high oblique.",
      }),
      P.short({
        label: "(b)", stem: "In which part of the photograph is the village?",
        accepted: ["middle ground", "the middle ground", "middleground", "middle-ground"],
        wrong: ["foreground"],
        explanation: "The village is described in the middle ground.",
      }),
      P.mcq({
        label: "(c)", stem: "In which season was the photograph most likely taken?",
        options: [
          ["The hot wet season", "Correct: rain-fed maize is tall and green in about January to March."],
          ["The cool dry season", "Rain-fed maize has been harvested by then."],
          ["The hot dry season", "Fields are usually bare before the rains in about September and October."],
          ["Any season equally", "Tall green rain-fed maize is a seasonal clue."],
        ],
        explanation: "Tall green maize points to the wet season, about November to March.",
        answer: "A",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Describe two land uses shown in the photograph.",
        points: [
          "Cultivation / arable farming (maize) in the foreground.",
          "A second land use: settlement (village, school) in the middle ground / forestry or woodland on the hills in the background / transport (road, bridge).",
        ],
        explanation: "Describe land use part by part across the photograph.",
      }),
    ],
    explanation: "Photograph interpretation: identify the type, divide into foreground, middle ground and background, and use clues such as crops and shadows.",
  });

  b.card("VOCABULARY", "Types of photograph", "Ground (horizontal view), oblique aerial (at an angle; high oblique shows the horizon), vertical aerial (straight down, map-like).");
  b.card("CONCEPT", "Describing a photograph", "Divide into foreground (bottom, nearest), middle ground and background (top, furthest); describe relief, vegetation, land use, settlement.");
  b.card("DEFINITION", "Remote sensing", "Collecting information about the Earth's surface from a distance (satellites, aircraft, drones) by recording reflected or emitted radiation.");
  b.card("FACT", "Electromagnetic spectrum order", "Gamma → X-rays → ultraviolet → visible (≈400–700 nm) → infrared → microwaves → radio (short to long).");
  b.card("CONCEPT", "Vegetation's spectral signature", "Absorbs blue and red (chlorophyll), reflects some green and strongly reflects near-infrared.");
  b.card("CONCEPT", "Standard false colour", "Near-infrared shown as red: healthy vegetation bright red, clear water dark, towns blue-grey.");
  b.card("VOCABULARY", "Passive vs active sensors", "Passive: record reflected sunlight (need daylight, clear skies). Active (radar): send microwaves, work through cloud and at night.");
  b.card("VOCABULARY", "Ground truthing", "Visiting sample sites to check that an image interpretation matches what is really on the ground.");
});
