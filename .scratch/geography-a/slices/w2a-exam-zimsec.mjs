// W2a exam rows (ZIMSEC): ZIM_STRUCT25 x 4 — Paper 1 (physical component): geomorphology x 2 (topic 5: plate tectonics, rift valleys;
// slopes, weathering and granite landforms) and hydrology x 2 (topic 6: storm hydrograph; morphometry, water balance and
// groundwater). All datasets are invented for this exercise; every number is computed in code (tables/w2a-exam.mjs).
import { concept, P, chk, rnd, mean, checkExam, EXAM, geographyLevels, ZIM } from "../lib.mjs";
import { tbl } from "../tables/w2a-_q.mjs";

const BASE = { d: 4, skill: EXAM.ZIM_STRUCT25.skill, secs: EXAM.ZIM_STRUCT25.secs, examStyle: true, paper: "Paper 1", applies: EXAM.ZIM_STRUCT25.applies };

// ---- Item 1: rift valley earthquakes (geomorphology)
const EV = [["E1", 4.2, 6], ["E2", 4.8, 9], ["E3", 5.1, 12], ["E4", 6.2, 8], ["E5", 4.5, 15]];
const meanDepth = chk(mean(EV.map((e) => e[2])), 10, 1e-9);
const energyRatio = chk(10 ** (1.5 * (6.2 - 4.2)), 1000, 1e-6);
const spreadKm = chk((6 * 5e6) / 1e6, 30, 1e-9);
const EVT = tbl(["Event", "Magnitude (moment)", "Focal depth (km)"], EV);

// ---- Item 2: slope profile (geomorphology)
const ANG = [3, 8, 14, 30, 10, 5];
const DESC = ["Gently sloping crest with deep soil", "Convex upper slope with a thin soil", "Mid-slope of soil and weathered rock", "Steep, bare rock face with boulders", "Concave lower slope with sandy soil", "Gently sloping footslope beside a stream"];
const vert = (a) => 20 * Math.sin((a * Math.PI) / 180);
const v4 = rnd(vert(30), 1, 10.0, "v4");
const vTot = rnd(ANG.reduce((s, a) => s + vert(a), 0), 1, 23.9, "vTot");
const SLT = tbl(["Segment", "Slope angle (°)", "Description"], ANG.map((a, i) => [`S${i + 1}`, a, DESC[i]]));

// ---- Item 3: storm hydrograph (hydrology)
const H = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const RAIN = [0, 4, 12, 28, 10, 2, 0, 0, 0, 0, 0, 0];
const Q = [6, 6, 7, 9, 14, 26, 41, 38, 29, 20, 14, 10];
const BASEFLOW = 6;
const HT = tbl(["Time (h)", ...H], [["Rainfall (mm/h)", ...RAIN], ["Discharge (m³/s)", ...Q]]);
const peakQ = chk(Math.max(...Q), 41);
const lag = chk(H[Q.indexOf(peakQ)] - H[RAIN.indexOf(Math.max(...RAIN))], 3);
const rise = chk((Q[6] - Q[4]) / 2, 13.5, 1e-9);
const stormflow = chk(Q.reduce((s, q) => s + (q - BASEFLOW), 0) * 3600, 532800);
const rainTot = chk(RAIN.reduce((a, b) => a + b, 0), 56);
const rainVol = chk((rainTot / 1000) * 120e6, 6.72e6, 1e-3);
const sfPct = rnd((stormflow / rainVol) * 100, 1, 7.9, "sfPct");

// ---- Item 4: morphometry, water balance (hydrology)
const N = [52, 12, 3, 1];
const AREA = 64;
const LEN = 108.8;
const dd = chk(LEN / AREA, 1.7, 1e-9);
const rbs = [N[0] / N[1], N[1] / N[2], N[2] / N[3]];
const rbMean = rnd(mean(rbs), 2, 3.78, "rbMean");
const PRECIP = 780, ET = 640, RUN = 110;
const dS = chk(PRECIP - ET - RUN, 30);
const rc = rnd((RUN / PRECIP) * 100, 1, 14.1, "rc");
const MT = tbl(["Stream order", "1", "2", "3", "4"], [["Number of streams", ...N]]);

concept("ageo.tectonics.plates-evidence", { file: "exam/w2a-zimsec", keyPrefix: "exam.w2a-zimsec", applies: ZIM }, (b) => {
  // ============================================================ Item 1: rift valley (topic 5)
  b.struct({
    ...BASE,
    concepts: ["ageo.tectonics.plates-evidence", "ageo.tectonics.processes-landforms"],
    hints: ["Each whole step of magnitude is about 32 times more energy.", "Distance = rate × time; keep the units consistent.", "In (d) give evidence for and a limitation before judging."],
    stem: `A seismic network recorded five earthquakes along a rift valley in eastern Africa (data invented for this exercise).\n\n${EVT}\n\nThe two sides of the rift are moving apart at about 6 mm per year (illustrative rate for this exercise).`,
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the mean focal depth of the five earthquakes, in km.", value: meanDepth, unit: "km", wrong: [50, 12],
            explanation: "(6 + 9 + 12 + 8 + 15) ÷ 5 = 50 ÷ 5 = 10 km." }),
          P.num({ label: "(ii)", marks: 2, stem: "Each increase of 1 in moment magnitude releases about 32 times more energy (31.6). How many times more energy was released by E4 (6.2) than by E1 (4.2)? Give the answer to the nearest whole number using 32 × 32 as an approximation of 1 000.", value: energyRatio, wrong: [100, 2],
            explanation: "The difference is 2 magnitude units, so the energy ratio is about 31.6² = 1 000. The value 100 is the amplitude ratio (10²)." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Which is the best explanation of why all the earthquakes are shallow?", options: [
            ["The crust is thin and stretched, and brittle rock lies close to the surface", "Correct: tension fractures the thin crust near the surface."],
            ["Oceanic crust is being subducted to a great depth below the rift", "Subduction gives deep earthquakes, but not at a continental rift."],
            ["The plates are sliding past each other along a transform fault", "That is a different plate boundary."],
            ["The earthquakes are caused by volcanic eruptions only", "Earthquakes at rifts are mainly caused by faulting."],
          ], answer: "A", explanation: "Rifting thins the crust, so earthquakes occur at shallow depths." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "The rift valley.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "At 6 mm per year, how far apart do the two sides move in 5 million years, in km?", value: spreadKm, unit: "km", wrong: [30000, 3],
            explanation: "6 mm × 5 000 000 = 30 000 000 mm = 30 000 m = 30 km." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "What type of plate boundary is a continental rift?", options: [
            ["A divergent (constructive) boundary", "Correct: the plates move apart."],
            ["A convergent (destructive) boundary", "Plates move together at convergent boundaries."],
            ["A conservative boundary", "Plates slide past each other at conservative boundaries."],
            ["A subduction zone", "Subduction occurs at convergent boundaries."],
          ], answer: "A", explanation: "Tension pulls the plates apart at a divergent boundary." }),
          P.manual({ label: "(iii)", marks: 4, stem: "Explain how a rift valley forms.",
            points: [
              "Convection currents or the rising of hot mantle material (and slab pull) pull the continental crust apart, causing tension.",
              "The crust is stretched and cracks along normal faults.",
              "The block between two roughly parallel faults sinks, forming a down-faulted valley (graben).",
              "The valley sides are steep scarps, and faulting and further sinking can form lakes (as in the East African rift).",
            ],
            modelAnswer: "Tension from the movement of the plates away from each other stretches the crust, which cracks along normal faults. The block between two parallel faults sinks to form a graben, bounded by steep fault scarps, and lakes may fill the floor of the valley.",
            explanation: "Tension, normal faults and a sinking block form the rift." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 5, stem: "Explain why volcanoes can occur along a rift valley.",
        points: [
          "Stretching thins the crust and the lithosphere, so pressure on the hot mantle below falls.",
          "The lower pressure allows the mantle rock to partially melt (decompression melting) and produce magma.",
          "The magma is less dense than the surrounding rock and rises.",
          "Faults and fractures provide pathways for the magma to reach the surface.",
          "It erupts as basaltic lava (or as volcanoes with more evolved magma), forming cones and lava fields along the rift.",
        ],
        modelAnswer: "Stretching thins the crust and lowers the pressure on the hot mantle, so the mantle partly melts and produces magma. The magma is less dense than the rock around it and rises along faults and fractures. It erupts at the surface as lava, building volcanoes and lava fields along the rift.",
        explanation: "Thinning, decompression melting, rise along faults and eruption." }),
      P.manual({ label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Assess the evidence that supports the theory of plate tectonics.",
        points: [
          "The continents fit together, as with South America and Africa.",
          "Similar fossils (such as Mesosaurus and Glossopteris) and matching rock sequences are found on continents now separated by oceans.",
          "Palaeomagnetism: magnetic stripes of equal width and age lie in a symmetrical pattern on each side of mid-ocean ridges, showing sea-floor spreading.",
          "The ocean floor is youngest at the ridges and becomes older away from them, and is nowhere older than about 180 million years.",
          "Earthquakes and volcanoes occur in belts that match plate boundaries, and deep earthquakes follow the Benioff zone at subduction zones.",
          "Direct measurements by GPS and satellites show the plates moving at a few centimetres per year.",
          "Limitations: the driving force (convection, slab pull and ridge push) is not fully understood, and some evidence is indirect.",
          "Judgement: the evidence from several independent sources is strong and consistent, so the theory is widely accepted.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Several independent lines of evidence support plate tectonics. The continental coastlines of South America and Africa fit together, and matching fossils and rock sequences occur on both sides of the Atlantic. Magnetic stripes in symmetrical patterns on either side of mid-ocean ridges show sea-floor spreading, and the ocean floor is youngest at the ridge and older away from it. Earthquakes and volcanoes occur in belts along plate boundaries, and deep earthquakes follow subducting plates. GPS now measures plate movement of a few centimetres per year. Some questions remain about the driving forces, and some evidence is indirect. Overall the evidence is consistent and strong, so the theory is well supported.",
        explanation: "Weigh the evidence and reach a judgement." }),
    ]),
    pp: undefined,
    explanation: "Interpret data on a rift, explain rift valley and volcano formation, and assess the evidence for plate tectonics.",
  });

  // ============================================================ Item 2: slope below a dwala (topic 5)
  b.struct({
    ...BASE,
    concepts: ["ageo.geomorph.slopes", "ageo.geomorph.weathering", "ageo.tropical.landforms-granite-karst", "ageo.geomorph.mass-movements"],
    hints: ["Vertical height = slope length × sin(angle).", "In (e) weigh weathering against mass movement and say which is more important."],
    stem: `A student measured a slope below a granite dwala in the Matobo Hills in Zimbabwe. The slope was divided into six segments, each measured along the slope over 20 m (data invented for this exercise).\n\n${SLT}`,
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which segment is most likely to be the rock face of the dwala?", options: [
            ["S4", "Correct: it is the steepest segment and is bare rock."],
            ["S1", "S1 is a gently sloping crest with deep soil."],
            ["S3", "S3 is a soil and weathered rock slope of 14°."],
            ["S6", "S6 is a gentle footslope beside the stream."],
          ], answer: "A", explanation: "S4 is the steepest segment (30°) and is described as bare rock." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the vertical height of segment S4, in metres to 1 decimal place. (Vertical height = 20 × sin of the slope angle.)", value: v4, dp: 1, unit: "m", wrong: [17.3, 20],
            explanation: "20 × sin 30° = 20 × 0.5 = 10.0 m. The value 17.3 uses the cosine (the horizontal distance)." }),
          P.num({ label: "(iii)", marks: 2, stem: "Calculate the total vertical drop over the whole slope, in metres to 1 decimal place.", value: vTot, dp: 1, unit: "m", wrong: [120, 10],
            explanation: "Segment drops: 1.0 + 2.8 + 4.8 + 10.0 + 3.5 + 1.7 = 23.9 m (to 1 d.p.)." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain how soil creep occurs on segment S3.",
        points: [
          "Soil particles expand when wetted or heated and contract when dried or cooled.",
          "Particles are lifted at right angles to the slope on expansion and drop vertically under gravity on contraction.",
          "Each cycle moves the particle a small distance downslope.",
          "Movement is very slow and continuous (a few millimetres a year), and is shown by leaning fence posts or curved tree trunks.",
        ],
        modelAnswer: "Soil particles expand when wet or warm and contract when dry or cool. On expansion they are lifted at right angles to the slope and on contraction they fall vertically under gravity, so each cycle moves them slightly downslope. The movement is slow and continuous, and leaning fence posts or curved tree trunks show it.",
        explanation: "Wetting, drying and gravity move soil downslope slowly." }),
      P.fib({ label: "(c)", marks: 3, stem: "Complete the sentences on the weathering of the dwala.",
        template: "Large curved slabs of rock peel off the dome because of {{blank:a}} (unloading). Feldspar in granite changes to clay mainly by {{blank:b}}. A dwala is exposed when deeply weathered rock is removed in a {{blank:c}} stage.",
        blanks: [
          { id: "a", accepted: ["pressure release"], choices: ["pressure release", "salt crystallisation", "freeze-thaw"] },
          { id: "b", accepted: ["hydrolysis"], choices: ["hydrolysis", "carbonation", "abrasion"] },
          { id: "c", accepted: ["second"], choices: ["first", "second", "third"] },
        ],
        explanation: "Pressure release (sheeting) peels the dome, hydrolysis changes feldspar to clay, and stripping of the weathered rock is the second stage of the two-stage formation." }),
      P.manual({ label: "(d)", marks: 5, stem: "Explain how a dwala such as those of the Matobo Hills is formed.",
        points: [
          "Granite is a massive rock with joints that are widely spaced in some parts and close together in others.",
          "In a warm, humid climate, water enters the joints and chemical weathering (hydrolysis) rots the rock below the surface to a great depth.",
          "Where the joints are widely spaced, less water reaches the rock, so it remains fresh and unweathered.",
          "Erosion and mass movement later strip away the weathered rock (regolith) in a second stage.",
          "The fresh rock is exposed as a dome, which is then shaped by pressure release (sheeting).",
        ],
        modelAnswer: "Granite has widely spaced joints in some places and closely spaced joints in others. In a warm, humid climate water enters the joints and chemical weathering, mainly hydrolysis, rots the rock below the surface to a great depth, but where the joints are wide apart less weathering occurs and fresh rock remains. In a second stage erosion strips away the weathered rock and exposes the dome. Pressure release then causes sheeting of the surface.",
        explanation: "Two-stage formation: deep weathering, then stripping." }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Assess the relative importance of weathering and mass movement in shaping a hillslope.",
        points: [
          "Weathering breaks down the rock in place, preparing material that can be moved; without it there would be nothing to transport.",
          "Physical weathering (freeze-thaw is rare in Zimbabwe, but heating and cooling, and pressure release occur) and chemical weathering (hydrolysis, solution) are important in warm, humid climates.",
          "Mass movements (creep, slides, flows, rockfall) move the weathered material downslope and change the slope's shape.",
          "Slow movements such as creep rounded the upper slope (convex), and rapid movements such as rockfalls form screes.",
          "The two work together: weathering creates the regolith and mass movement removes it, exposing fresh rock to weathering.",
          "Climate, rock type, slope angle, vegetation and water also control the rates.",
          "On steep slopes, rapid mass movement is important; on gentle slopes weathering and slow creep dominate.",
          "Judgement: mass movement is the process that actually changes the slope shape, but weathering controls the rate of supply and is therefore equally important; the slope reflects their interaction.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Weathering breaks the rock down and produces the regolith that can be moved, so it controls how much material is available. Chemical weathering is especially important in warm, humid conditions. Mass movement then carries the material downslope: slow creep rounds the upper slope into a convex form, while rockfalls and slides on steep faces produce screes. The two processes work together, because mass movement removes the regolith and exposes fresh rock to weathering. Slope angle, rock type, climate and vegetation control the rates. Mass movement changes the slope shape most directly, but weathering controls the rate at which material is supplied, so they are equally important.",
        explanation: "Weigh the two processes and reach a judgement." }),
    ]),
    explanation: "Interpret a slope profile, calculate heights, explain creep and dwala formation, and assess weathering and mass movement.",
  });

  // ============================================================ Item 3: storm hydrograph (topic 6)
  b.struct({
    ...BASE,
    concepts: ["ageo.hydro.hydrographs-morphometry", "ageo.hydro.river-floods", "ageo.hydro.flood-management"],
    hints: ["Lag time = hour of peak discharge − hour of peak rainfall.", "Stormflow = discharge above baseflow; each hour is 3 600 seconds.", "In (d) compare hard and soft engineering and reach a judgement."],
    stem: `Hourly rainfall and discharge were recorded for a storm in a basin of 120 km² in northern Zimbabwe (data invented for this exercise). The baseflow before the storm was ${BASEFLOW} m³/s.\n\n${HT}`,
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Describe the hydrograph.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "State the peak discharge, in m³/s.", value: peakQ, unit: "m³/s", wrong: [38, 28],
            explanation: "The highest discharge is 41 m³/s (hour 6)." }),
          P.num({ label: "(ii)", marks: 1, stem: "Calculate the lag time, in hours.", value: lag, unit: "h", wrong: [6, 2],
            explanation: "Peak rainfall at hour 3 (28 mm/h); peak discharge at hour 6. Lag = 3 hours." }),
          P.num({ label: "(iii)", marks: 2, stem: "Calculate the mean rate of rise of discharge between hour 4 and hour 6, in m³/s per hour.", value: rise, wrong: [27, 5],
            explanation: "(41 − 14) ÷ 2 = 13.5 m³/s per hour." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Runoff from the storm.",
        parts: [
          P.num({ label: "(i)", marks: 3, stem: "The sum of the discharge above baseflow for the 12 hours is 148 m³/s. Calculate the volume of stormflow, in m³. (One hour = 3 600 seconds.)", value: stormflow, unit: undefined, wrong: [148, 5400],
            explanation: "148 m³/s × 3 600 s = 532 800 m³. The value 148 is not multiplied by the time." }),
          P.num({ label: "(ii)", marks: 2, stem: "The total rainfall was 56 mm over the whole basin (6.72 million m³). Calculate the stormflow as a percentage of the rainfall, to 1 decimal place.", value: sfPct, dp: 1, unit: "%", wrong: [79.3, 0.08],
            explanation: "532 800 ÷ 6 720 000 × 100 = 7.9%." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain why the discharge peaks three hours after the rainfall peak.",
        points: [
          "Rain falling on distant parts of the basin takes time to reach the channel.",
          "Some water infiltrates and moves slowly as throughflow, while overland flow is slowed by vegetation and rough ground.",
          "Water reaching the channel from tributaries arrives at different times, so discharge increases gradually.",
          "The basin shape and size, soils and slope determine the delay (lag time).",
        ],
        modelAnswer: "Rain that falls on distant parts of the basin takes time to reach the main channel. Some water soaks in and moves slowly as throughflow, and overland flow is slowed by vegetation and rough ground. Water from tributaries arrives at different times, so discharge builds up gradually and the peak is delayed.",
        explanation: "Travel time within the basin causes the lag." }),
      P.manual({ label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Assess the effectiveness of measures to reduce the risk of flooding in a town on this river.",
        points: [
          "Dams and reservoirs store the flood peak and release it slowly, but are costly and flood land.",
          "Embankments and artificial levees protect the town directly, but may be overtopped and raise levels downstream.",
          "Afforestation and soil conservation in the catchment increase interception and infiltration and lengthen the lag time, but are slow.",
          "Floodplain zoning keeps buildings out of the flood-prone land, which is cheap but hard to enforce where housing is short.",
          "Forecasts and warnings from gauging stations (using a lag time of about three hours) give time to move people and livestock.",
          "The town's lag time is short, so the warning time is limited and communication must be fast.",
          "Soft measures are cheaper and sustainable; hard measures are more reliable for a high-value area up to their design flood.",
          "Judgement: a combination, with warnings and zoning for the whole community and defences for the most valuable areas, is most effective.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "A dam can store the peak and release it slowly, but it is expensive and floods land. Embankments protect a town directly but may be overtopped and raise water levels downstream. Afforestation increases infiltration and lengthens the lag time, and floodplain zoning keeps buildings away from the river, both cheaply but slowly. Forecasts and warnings give people time to move, although the lag time here is only three hours, so the message must be quick. Soft measures are cheaper and sustainable, hard measures are more reliable up to their design size. The best approach combines warnings and zoning with defences for the most valuable areas.",
        explanation: "Compare measures on cost, effect and sustainability, then judge." }),
      P.manual({ label: "(e)", marks: 4, stem: "Suggest how the hydrograph would change if 30% of the basin were covered by roads, roofs and drains.",
        points: [
          "The peak discharge would be higher, because less water infiltrates and more runs off.",
          "The lag time would be shorter, because drains and smooth surfaces carry water quickly to the river.",
          "The rising limb would be steeper and the hydrograph flashier.",
          "Baseflow may be lower, because less water recharges the groundwater.",
        ],
        modelAnswer: "The peak discharge would be higher because less rain infiltrates and more runs off. The lag time would be shorter and the rising limb steeper because drains and smooth surfaces send the water quickly to the river. Baseflow might fall because less recharges the groundwater.",
        explanation: "Urbanisation produces a flashier hydrograph." }),
    ]),
    explanation: "Interpret a hydrograph, calculate runoff, explain the lag, assess flood measures and predict the effect of urbanisation.",
  });

  // ============================================================ Item 4: morphometry, water balance, groundwater (topic 6)
  b.struct({
    ...BASE,
    concepts: ["ageo.hydro.hydrographs-morphometry", "ageo.hydro.drainage-basin-system", "ageo.water.supply-demand-security"],
    hints: ["Rb = N(u) ÷ N(u + 1); take the mean of the three ratios.", "Water balance: precipitation − evapotranspiration − runoff.", "In (d) give both dams and boreholes with strengths and limits."],
    stem: `A student studied a semi-arid river basin of ${AREA} km² in southern Zimbabwe (data invented for this exercise). The total length of all streams is ${LEN} km. The mean annual water balance is: precipitation ${PRECIP} mm, evapotranspiration ${ET} mm and runoff ${RUN} mm.\n\n${MT}`,
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Morphometry.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the drainage density, in km/km².", value: dd, dp: 1, unit: "km/km²", wrong: [0.59, 6963],
            explanation: "108.8 ÷ 64 = 1.7 km/km²." }),
          P.num({ label: "(ii)", marks: 3, stem: "Calculate the mean bifurcation ratio, to 2 decimal places.", value: rbMean, dp: 2, wrong: [11.33, 4.0],
            explanation: "52 ÷ 12 = 4.33; 12 ÷ 3 = 4.00; 3 ÷ 1 = 3.00. Mean = (4.33 + 4.00 + 3.00) ÷ 3 = 3.78." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Water balance.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the change in storage, in mm per year.", value: dS, unit: "mm", wrong: [1530, 140],
            explanation: "Storage = 780 − 640 − 110 = +30 mm." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the runoff as a percentage of the precipitation, to 1 decimal place.", value: rc, dp: 1, unit: "%", wrong: [141, 17.2],
            explanation: "110 ÷ 780 × 100 = 14.1%." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Which is the best interpretation of the water balance?", options: [
            ["Most precipitation returns to the air by evapotranspiration, and a small surplus is stored", "Correct: 640 of 780 mm evaporates or transpires, and 30 mm goes to storage."],
            ["Most precipitation becomes runoff, and storage is falling", "Runoff is only 14% and storage is rising."],
            ["There is a deficit of 30 mm in storage", "The balance is a surplus of 30 mm."],
            ["Evapotranspiration is smaller than runoff", "Evapotranspiration (640 mm) is far larger than runoff (110 mm)."],
          ], answer: "A", explanation: "Evapotranspiration takes about 82% of precipitation in this semi-arid basin." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why evapotranspiration takes such a large share of the precipitation in a semi-arid area.",
        points: [
          "High temperatures and long hours of sunshine increase evaporation from soil and water surfaces.",
          "Plants lose water by transpiration, and rainfall is short and intense, so much water stays near the surface for evaporation.",
          "Little water drains away or infiltrates deep into the ground, since soils are thin or dry, and dams and ponds expose large surfaces to evaporation.",
        ],
        modelAnswer: "Temperatures are high and sunshine is long, so evaporation from soil and open water is high, and plants lose much water by transpiration. Much of the rain falls in short storms and stays near the surface, where it evaporates, and little infiltrates deeply or drains away.",
        explanation: "Energy supply and surface storage drive evapotranspiration." }),
      P.manual({ label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Assess the value of dams and boreholes as sources of water for people in a semi-arid area of Zimbabwe.",
        points: [
          "Dams store the wet-season runoff for the long dry season and can supply large volumes for towns, irrigation and livestock.",
          "Dams are costly, lose water by evaporation (high in semi-arid areas) and silt up, and small dams may dry up in drought.",
          "Boreholes reach groundwater, which is protected from evaporation and is available in the dry season at the point of use.",
          "Yields in crystalline rock are patchy and often low, and boreholes may fail in drought if recharge is limited.",
          "Over-abstraction lowers the water table, and quality problems (minerals, pollution from pit latrines) may arise.",
          "Boreholes are cheaper and can be maintained by communities, and may use hand pumps that need no power.",
          "Sustainable use needs abstraction below recharge, monitoring of water levels and protection of the catchment.",
          "Judgement: dams are better for large towns and irrigation, boreholes for scattered rural users, and the two are best used together.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Dams store wet-season runoff and can supply large volumes for towns, irrigation and livestock. They are costly, lose a lot of water to evaporation in a semi-arid climate and silt up, and small ones may dry in a drought. Boreholes reach groundwater that is protected from evaporation and available at the point of use, and they are cheaper and can be run by communities. Yields in crystalline rock are patchy, and over-abstraction lowers the water table and may harm quality. Dams suit large towns and irrigation, and boreholes suit scattered rural users, and using both with careful management is best.",
        explanation: "Compare dams and boreholes on volume, cost, reliability and sustainability." }),
      P.manual({ label: "(e)", marks: 4, stem: "Explain how afforestation of the catchment and indigenous knowledge could help to make groundwater use more sustainable.",
        points: [
          "Trees and ground cover increase infiltration and reduce erosion, so recharge to groundwater rises and silting falls.",
          "Trees slow runoff and protect springs and wetlands, which keeps the dry-season flow.",
          "Indigenous knowledge identifies reliable water sources and traditional rules protect springs, wetlands and headwater forests.",
          "Communities that apply these rules and share knowledge with scientists can monitor and limit abstraction.",
        ],
        modelAnswer: "Trees and ground cover increase infiltration and reduce erosion, so more water recharges the groundwater and dams silt up more slowly. They protect springs and wetlands. Indigenous knowledge shows where reliable water lies, and traditional rules protect springs and headwater forests. Communities can combine this with scientific monitoring to keep abstraction within recharge.",
        explanation: "Catchment protection and local knowledge support sustainability." }),
    ]),
    explanation: "Calculate morphometry and a water balance, explain evapotranspiration and assess dams and boreholes.",
  });
});
