// Slice G3b: Cambridge Paper 4 Geographical Investigations, physical contexts (3 × 30 marks).
import { concept, P, CAM, geographyLevels } from "../lib.mjs";

concept("geo.fieldwork.physical-fieldwork", { file: "exam/cam-p4-physical", keyPrefix: "exam.cam-p4-physical", applies: CAM }, (b) => {
  // 1. River channel changes downstream.
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 4", secs: 2700,
    concepts: ["geo.fieldwork.physical-fieldwork", "geo.fieldwork.enquiry-process", "geo.rivers.drainage-basin", "geo.rivers.processes"],
    stem: "A class investigated how the channel of a small river changes downstream. They tested two hypotheses:\n\n- **Hypothesis 1:** Channel width and depth increase with distance downstream.\n- **Hypothesis 2:** Velocity increases with distance downstream.\n\nThey chose six sites at 500 m intervals along the river, starting near the source (site 1). Table 1 shows their results (fictional data).\n\n| Site | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| Distance downstream (km) | 0 | 0.5 | 1.0 | 1.5 | 2.0 | 2.5 |\n| Width (m) | 1.3 | 1.7 | 2.3 | 2.8 | 3.6 | 4.2 |\n| Mean depth (m) | 0.11 | 0.15 | 0.19 | 0.18 | 0.27 | 0.33 |\n| Mean velocity (m/s) | 0.22 | 0.27 | 0.25 | ? | 0.36 | 0.43 |\n\nAt site 3 the depth was measured at six equally spaced points across the channel: 9, 16, 23, 28, 22 and 16 cm. At site 4 a float took 30.1 s, 30.6 s and 30.2 s to travel 10 m.",
    hints: ["Convert centimetres to metres before using the discharge formula.", "When analysing, quote the first and last values and any site that breaks the trend."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which equipment should the students use to measure **depth** at each point across the channel?",
        options: [
          ["A metre rule held vertically on the river bed", "Correct: a metre rule (or graduated pole) gives depth at each point along the tape."],
          ["A clinometer pointed at a ranging pole", "A clinometer measures slope angles, not water depth."],
          ["An anemometer held just above the water", "An anemometer measures wind speed."],
          ["A quadrat placed flat on the river bed", "A quadrat samples area cover, not depth."],
        ],
        answer: "A", explanation: "Depth is read from a metre rule at regular intervals along a tape stretched across the channel.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Describe how the students should measure the **width** and the **mean depth** of the channel at one site.",
        points: [
          "Stretch a tape measure across the channel from the water's edge on one bank to the water's edge on the other, at right angles to the flow.",
          "Read the width from the tape (in metres).",
          "Measure depth with a metre rule at equal intervals along the tape (for example every 0.25 m or at ten points), including near the banks.",
          "Add the depths and divide by the number of readings to find the mean depth.",
        ],
        modelAnswer: "Two students stretch a tape tightly across the river at right angles to the flow, from water's edge to water's edge, and read the width. A third places a metre rule vertically on the bed at equal intervals along the tape, such as every 0.3 m, reading the depth each time. The mean depth is the total of the readings divided by the number of readings.",
        explanation: "Width is water's edge to water's edge; depth readings must be equally spaced so the mean is representative.",
      }),
      P.num({ label: "(c)", unit: "cm", stem: "Calculate the mean depth at site 3 from the six readings.", value: 19, tol: 0.05, wrong: [114, 28], explanation: "(9 + 16 + 23 + 28 + 22 + 16) ÷ 6 = 114 ÷ 6 = 19 cm (0.19 m)." }),
      P.num({ label: "(d)", marks: 2, unit: "m/s", stem: "Calculate the mean velocity at site 4. Give your answer to two decimal places.", value: 0.33003300330033003, answer: "0.33", tol: 0.005, wrong: [3.03, 0.1], explanation: "Mean time = (30.1 + 30.6 + 30.2) ÷ 3 = 30.3 s; velocity = 10 ÷ 30.3 = 0.33 m/s." }),
      P.num({ label: "(e)", unit: "m²", stem: "Calculate the cross-sectional area of the channel at site 5.", value: 0.972, answer: "0.97", tol: 0.005, wrong: [3.87, 97.2], explanation: "Area = width × mean depth = 3.6 × 0.27 = 0.972 ≈ 0.97 m²." }),
      P.num({ label: "(f)", marks: 2, unit: "m³/s", stem: "Calculate the discharge at site 5. Give your answer to two decimal places.", value: 0.34992, answer: "0.35", tol: 0.005, wrong: [1.33, 2.7], explanation: "Discharge = area × velocity = 0.972 × 0.36 = 0.350 ≈ 0.35 m³/s." }),
      P.mcq({
        label: "(g)", stem: "Which method is most suitable for showing how width changes with distance downstream?",
        options: [
          ["A line or scatter graph of width against distance", "Correct: distance is continuous, so a line or scatter graph shows the trend clearly."],
          ["A pie chart of the width at each of the sites", "Widths are not parts of a whole, so a pie chart is unsuitable."],
          ["A wind rose drawn for each of the six sites", "A wind rose shows direction data, such as wind or pebble orientation."],
          ["A divided bar graph of the total width", "Adding widths together has no meaning for this hypothesis."],
        ],
        answer: "A", explanation: "Plot distance downstream on the x-axis and width on the y-axis; a best-fit line shows the trend.",
      }),
      P.manual({
        label: "(h)", marks: 4, stem: "To what extent do the results in Table 1 support **Hypothesis 1**? Use data in your answer.",
        points: [
          "Width increases at every site, from 1.3 m at site 1 to 4.2 m at site 6, so this part is fully supported.",
          "Depth increases overall, from 0.11 m to 0.33 m.",
          "Identifies the anomaly: depth at site 4 (0.18 m) is less than at site 3 (0.19 m).",
          "Conclusion: Hypothesis 1 is largely / mostly accepted (width fully, depth with one exception).",
        ],
        modelAnswer: "Width increases at every site, from 1.3 m to 4.2 m. Depth also rises overall, from 0.11 m to 0.33 m, but site 4 (0.18 m) is slightly shallower than site 3 (0.19 m). Hypothesis 1 is therefore largely accepted.",
        explanation: "Make a decision, quote figures for both variables and name the anomaly.",
      }),
      P.manual({
        label: "(i)", marks: 3, stem: "Explain why velocity usually increases downstream.",
        points: [
          "Discharge increases downstream as tributaries add water (and more water enters from groundwater/throughflow).",
          "The channel becomes wider and deeper, so a smaller proportion of the water is in contact with the bed and banks (larger hydraulic radius / more efficient channel).",
          "Less energy is lost to friction (the bed is smoother, with smaller bedload), so the water flows faster.",
        ],
        modelAnswer: "Tributaries add water, so discharge rises. The channel becomes larger and more efficient: less of the water touches the bed and banks, and the bed is smoother with smaller bedload, so less energy is lost to friction and the water flows faster.",
        explanation: "Link velocity to discharge, channel efficiency and friction.",
      }),
      P.manual({
        label: "(j)", marks: 2, stem: "Velocity at site 3 (0.25 m/s) is lower than at site 2. Suggest **two** reasons for this anomaly.",
        points: [
          "A local feature such as a pool, a meander bend, a fallen tree, large boulders or dense vegetation slowing the flow.",
          "Measurement error, such as the float catching on weeds or the bank, wind blowing it, or a stopwatch reaction error.",
        ],
        modelAnswer: "Site 3 may be in a deep pool or behind a fallen branch where the water slows, or the float may have caught on weeds, making the time too long.",
        explanation: "Anomalies come from local channel conditions or method errors.",
      }),
      P.manual({
        label: "(k)", marks: 3, stem: "The students used **systematic sampling**, with sites every 500 m. Explain **one** advantage of this method and **one** problem they might have had in using it.",
        points: [
          "Advantage: sites are evenly spread along the river, so the whole length is represented and changes can be compared fairly.",
          "Advantage developed: it avoids bias from choosing only easy or interesting sites.",
          "Problem: a fixed site may be unsafe or impossible to reach (private land, steep banks, deep water, a bridge or obstruction), so the site has to be moved.",
        ],
        modelAnswer: "Sites every 500 m cover the whole stretch evenly and avoid the bias of choosing only easy places. However, one planned site may fall on private land or at a steep, unsafe bank, so the students would have to move it to the nearest safe point.",
        explanation: "Systematic sampling is fair and even, but real sites are not always accessible.",
      }),
      P.manual({
        label: "(l)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Evaluate the reliability of the students' results and suggest how the investigation could be improved.",
        points: [
          "Only six sites over 2.5 km is a small sample; one unusual site (pool, riffle, obstruction) affects the pattern.",
          "Only three float timings per site / float measures surface velocity only and is affected by wind or snagging.",
          "Depth readings affected by the rule sinking into soft mud or by uneven, rocky beds; only six readings at site 3.",
          "All measured on one day; discharge varies with recent rainfall and season.",
          "Improvements: more sites at shorter intervals; more repeats and a flow meter at several depths; more depth readings across each channel.",
          "Further improvement/judgement: repeat in the wet and dry seasons and compare; results are reasonably reliable for the general trend but not for individual sites.",
        ],
        levels: geographyLevels(6),
        modelAnswer: "The results show a clear general trend, but their reliability is limited. Six sites over 2.5 km is a small sample, so one pool or fallen branch, as perhaps at site 3, can distort the pattern. A float measures only surface speed and can be blown by wind or caught on weeds, and only three timings were taken. Depth readings may be too large where the rule sinks into mud, and at site 3 only six readings were made. All data came from one day, which may not represent normal flow. The study would be improved by using ten or more sites at 250 m intervals, a flow meter at several depths with five readings per site, depth readings every 0.2 m, and repeating the survey in the wet and dry seasons. Overall the trend is believable, but individual values should be treated with caution.",
        explanation: "Evaluate sample size, equipment, repeats and timing, then give specific improvements and a judgement.",
      }),
    ],
    explanation: "A full Paper 4 river investigation: method, calculations from a results table, choosing a graph, analysing results against hypotheses, explaining, sampling and evaluation.",
  });

  // 2. Longshore drift and pebble size on a beach.
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 4", secs: 2700,
    concepts: ["geo.fieldwork.physical-fieldwork", "geo.fieldwork.enquiry-process", "geo.coasts.processes"],
    stem: "Students investigated longshore drift on a fictional straight beach where the prevailing wind blows from the south-west and waves approach at an angle from the west. They tested:\n\n- **Hypothesis 1:** Pebbles become smaller and more rounded from west to east along the beach.\n- **Hypothesis 2:** More beach material builds up on the west side of each groyne than on the east side.\n\nTable 1 shows results from five sites 100 m apart (15 pebbles measured at each site; fictional data). Roundness is on a scale from 1 (very angular) to 6 (well rounded).\n\n| Site (west to east) | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| Mean long axis (mm) | 67 | 57 | 48 | 43 | 35 |\n| Mean roundness | 3.1 | 3.4 | 3.9 | 4.2 | 4.6 |\n\nTable 2 shows the distance from the top of a groyne down to the beach surface at three points on each side (fictional data).\n\n| Side of groyne | Point 1 (cm) | Point 2 (cm) | Point 3 (cm) |\n|---|---|---|---|\n| West | 38 | 44 | 51 |\n| East | 83 | 91 | 79 |\n\nA float placed in the sea at site 1 moved 18 m east in 10 minutes. Ten pebbles measured at site 3 had long axes of 56, 44, 48, 59, 38, 53, 43, 51, 45 and 37 mm.",
    hints: ["A smaller distance from the top of the groyne means the beach is higher on that side.", "Material is carried in the direction of the waves' swash, from west to east here."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Why would longshore drift move material from **west to east** on this beach?",
        options: [
          ["Swash carries pebbles up the beach at an angle and backwash drags them straight down", "Correct: waves from the west push material diagonally eastwards, and gravity pulls it straight back, so it zigzags east."],
          ["Backwash carries pebbles up the beach at an angle towards the east", "Backwash runs straight down the beach slope under gravity."],
          ["Rivers flowing into the sea push pebbles towards the east", "River flow is not the process that moves material along the shore."],
          ["Tides move all beach material in the same direction every day", "Tides move water up and down the beach; they do not cause a steady drift along it."],
        ],
        answer: "A", explanation: "Longshore drift: oblique swash, perpendicular backwash, repeated many times, moves material along the coast in the direction of the prevailing waves.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Describe how the students could measure the **rate** of longshore drift using a float.",
        points: [
          "Mark a starting point at the water's edge and place a float (for example an orange or a dog biscuit) in the breaking waves there.",
          "Time a fixed period (for example 10 minutes) and measure the distance the float moves along the shore with a tape.",
          "Repeat several times and calculate the mean rate (distance ÷ time), noting the direction.",
        ],
        modelAnswer: "Place a float in the breaking waves opposite a ranging pole, time 10 minutes, then measure along the beach with a tape how far it has moved. Repeat three times and divide the mean distance by the time.",
        explanation: "A rate needs a distance, a time, repeats and a direction.",
      }),
      P.num({ label: "(c)", stem: "Calculate the rate of movement of the float in metres per minute.", value: 1.8, tol: 0.05, wrong: [180, 0.56], explanation: "18 m ÷ 10 min = 1.8 m per minute." }),
      P.num({ label: "(d)", marks: 2, unit: "mm", stem: "Calculate the mean long axis of the ten pebbles measured at site 3.", value: 47.4, tol: 0.05, wrong: [474, 46.5], explanation: "Total = 474 mm; 474 ÷ 10 = 47.4 mm." }),
      P.num({ label: "(e)", unit: "mm", stem: "Find the median long axis of the same ten pebbles.", value: 46.5, tol: 0.05, wrong: [47.4, 38], explanation: "In order: 37, 38, 43, 44, 45, 48, 51, 53, 56, 59. The median is the mean of the 5th and 6th values: (45 + 48) ÷ 2 = 46.5 mm." }),
      P.mcq({
        label: "(f)", stem: "The students chose pebbles touching marks every 1 m along a tape laid down the beach. What type of sampling is this?",
        options: [
          ["Systematic sampling", "Correct: pebbles are chosen at a regular interval."],
          ["Random sampling", "Random sampling would use random numbers to choose positions."],
          ["Stratified sampling", "Stratified sampling divides the beach into zones sampled in proportion."],
          ["Opportunistic sampling", "Opportunistic sampling would mean picking whichever pebbles are convenient."],
        ],
        answer: "A", explanation: "Regular intervals along a transect make a systematic sample.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Explain why the students did **not** simply pick up pebbles by hand from anywhere on the beach.",
        points: [
          "Picking by hand leads to bias: students tend to choose larger, unusual or attractive pebbles.",
          "A sample at fixed points is fair/representative, so sites can be compared.",
        ],
        modelAnswer: "People tend to pick eye-catching or large pebbles, which biases the sample. Choosing pebbles at fixed points makes the samples fair and comparable between sites.",
        explanation: "Sampling at fixed points removes personal choice.",
      }),
      P.num({ label: "(h)", marks: 2, unit: "cm", stem: "Using Table 2, calculate the difference between the mean distance on the east side and the mean distance on the west side of the groyne.", value: 40, tol: 0.05, wrong: [120, 44.3], explanation: "West mean = (38 + 44 + 51) ÷ 3 = 44.3 cm; east mean = (83 + 91 + 79) ÷ 3 = 84.3 cm; difference = 40 cm." }),
      P.manual({
        label: "(i)", marks: 4, stem: "Do the results support **both** hypotheses? Use data from Tables 1 and 2.",
        points: [
          "Hypothesis 1: pebble size falls steadily from 67 mm at site 1 to 35 mm at site 5.",
          "Roundness rises steadily from 3.1 to 4.6, so Hypothesis 1 is accepted (no anomalies).",
          "Hypothesis 2: the beach is higher on the west side (mean 44.3 cm below the top of the groyne) than on the east side (84.3 cm), a difference of 40 cm.",
          "So Hypothesis 2 is also accepted: material builds up on the updrift (west) side, consistent with eastward drift.",
        ],
        modelAnswer: "Both are supported. Pebble length decreases at every site from 67 mm to 35 mm while roundness increases from 3.1 to 4.6, so Hypothesis 1 is accepted. The beach surface is on average 44.3 cm below the top of the groyne on the west side but 84.3 cm on the east side, so material has built up on the west side, as Hypothesis 2 predicts.",
        explanation: "Quote figures from both tables and make a decision for each hypothesis.",
      }),
      P.manual({
        label: "(j)", marks: 3, stem: "Explain why pebbles become smaller and more rounded in the direction of longshore drift.",
        points: [
          "Attrition: pebbles knock against each other as they are moved, breaking off pieces and smoothing edges.",
          "The further material is carried, the longer it is worn down, so pebbles downdrift are smaller and rounder.",
          "Sorting: smaller pebbles are moved more easily and further by the waves, while larger ones are left behind updrift.",
        ],
        modelAnswer: "As pebbles are moved along the beach they collide and are worn by attrition, losing corners and becoming smaller. Material that has travelled further has been worn for longer, and the waves carry smaller pebbles further than large ones, so the beach becomes sorted.",
        explanation: "Attrition plus sorting explains the downdrift pattern.",
      }),
      P.manual({
        label: "(k)", marks: 4, stem: "Identify **two** hazards of this fieldwork and suggest a precaution for each.",
        points: [
          "Hazard: being cut off by the incoming tide or swept by large waves.",
          "Precaution: check tide times, work on a falling tide and stay out of the breaking waves / keep an exit route.",
          "Hazard: slipping on wet rocks or groynes / rock falls from cliffs / sunburn and dehydration.",
          "Precaution matching the second hazard: strong shoes and no climbing on groynes / keep away from the cliff foot / hats, sunscreen and water.",
        ],
        modelAnswer: "The tide could cut the group off, so they check tide tables and finish before high tide. The groynes are slippery, so students wear shoes with grip and do not climb on them.",
        explanation: "Each precaution must match its hazard.",
      }),
      P.manual({
        label: "(l)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Evaluate the methods used in this investigation and suggest how they could be improved.",
        points: [
          "Only five sites and one groyne were studied; more sites and several groynes would show whether the pattern is general.",
          "Fifteen pebbles per site is a small sample; measuring 30 or more would make means more reliable.",
          "Roundness scoring by eye is subjective; the same student should score all pebbles or use a roundness chart carefully.",
          "Float results depend on wind and wave conditions on the day; repeat on several days and take a mean.",
          "Measurements at one time only; beach material changes after storms, so repeat in different seasons.",
          "Judgement: the methods show a clear pattern, but more samples and repeats are needed for reliable conclusions.",
        ],
        levels: geographyLevels(6),
        modelAnswer: "The methods give a clear pattern, but several weaknesses limit reliability. Five sites along one beach and one groyne is a small sample, so the study should use more sites and measure at three or four groynes. Fifteen pebbles per site could be increased to thirty. Roundness was judged by eye, which is subjective; one student should score every pebble using the same chart. The float was timed once on one day, when wind may have helped or hindered it, so the test should be repeated several times and on different days. Finally, beaches change after storms, so repeating the survey in another season would show whether the pattern lasts. With these changes the conclusions would be much more secure.",
        explanation: "Weigh up sample sizes, subjectivity, repeats and timing, then propose specific improvements.",
      }),
    ],
    explanation: "A full Paper 4 coastal investigation of longshore drift: method, statistics, sampling, analysing two hypotheses, explanation, risk and evaluation.",
  });

  // 3. Infiltration under different land uses.
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 4", secs: 2700,
    concepts: ["geo.fieldwork.physical-fieldwork", "geo.fieldwork.enquiry-process", "geo.rivers.drainage-basin"],
    stem: "Students investigated infiltration in a small fictional drainage basin near their school. Their hypothesis was: **Infiltration is faster under vegetation than on bare, compacted ground.**\n\nAt each of five sites they pushed an infiltration ring (a metal cylinder open at both ends) 5 cm into the ground, poured in water and timed how long it took for the water level to fall by 5 cm (50 mm). Each test was done three times. Table 1 shows their results (fictional data).\n\n| Site | Woodland | Grassland | Maize field | School football pitch | Footpath |\n|---|---|---|---|---|---|\n| Test 1 (s) | 62 | 95 | 120 | 410 | 610 |\n| Test 2 (s) | 58 | 101 | 134 | 388 | 655 |\n| Test 3 (s) | 66 | 98 | 127 | 402 | 640 |\n| Mean time (s) | 62 | ? | 127 | ? | 635 |",
    hints: ["Infiltration rate = depth of water ÷ time.", "Convert seconds to minutes by dividing by 60, or multiply a per-second rate by 60."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which variable did the students **measure** to compare infiltration at the sites?",
        options: [
          ["The time taken for the water level to fall by 50 mm", "Correct: a shorter time means faster infiltration."],
          ["The volume of rain that fell during the survey", "Rainfall was not measured in this method."],
          ["The height of the vegetation at each site", "Vegetation height was not recorded."],
          ["The width of the infiltration ring at each site", "The same ring is used at each site, so its width is kept constant."],
        ],
        answer: "A", explanation: "The time for a fixed fall in water level is the measured (dependent) variable; land use is the variable being changed between sites.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Describe how the students should carry out the infiltration test so that results at different sites can be compared fairly.",
        points: [
          "Push the ring into the ground to the same depth (5 cm) at every site, without gaps around the edge.",
          "Pour in the same volume / fill to the same starting level marked on the ring each time.",
          "Start the stopwatch as the water is poured and stop it when the level has fallen exactly 50 mm (read against a ruler fixed inside the ring).",
          "Repeat three times at each site (on fresh ground nearby) and calculate the mean, testing all sites on the same day.",
        ],
        modelAnswer: "At each site the ring is pushed 5 cm into the soil so no water leaks round it. Water is poured in to a marked starting level, and a ruler fixed inside the ring is used to time a 50 mm fall. Each test is repeated three times on nearby ground and averaged, and all sites are tested on the same dry day.",
        explanation: "Fair tests keep the ring depth, starting level, fall distance and timing method the same.",
      }),
      P.num({ label: "(c)", unit: "s", stem: "Calculate the mean time for the grassland site.", value: 98, tol: 0.05, wrong: [294, 101], explanation: "(95 + 101 + 98) ÷ 3 = 294 ÷ 3 = 98 s." }),
      P.num({ label: "(d)", unit: "s", stem: "Calculate the mean time for the school football pitch.", value: 400, tol: 0.05, wrong: [1200, 388], explanation: "(410 + 388 + 402) ÷ 3 = 1200 ÷ 3 = 400 s." }),
      P.num({ label: "(e)", marks: 2, stem: "Calculate the infiltration rate on the football pitch in **millimetres per minute**.", value: 7.5, tol: 0.05, wrong: [0.125, 8], explanation: "Rate = 50 mm ÷ 400 s = 0.125 mm/s; × 60 = 7.5 mm per minute." }),
      P.mcq({
        label: "(f)", stem: "Which graph is most suitable for comparing the mean times at the five sites?",
        options: [
          ["A bar graph with one bar for each site", "Correct: the sites are separate categories, so a bar graph compares them clearly."],
          ["A line graph joining the five sites", "A line implies a continuous change between sites, but land uses are separate categories."],
          ["A pie chart of the five mean times", "The times are not parts of a whole."],
          ["A scatter graph of time against test number", "This would compare repeats, not sites."],
        ],
        answer: "A", explanation: "Use a bar graph for categories (land-use types); line and scatter graphs suit continuous variables.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Explain why each test was repeated three times.",
        points: [
          "One test may be unusual (for example a crack, root channel or stone under the ring) or affected by a timing error.",
          "Using the mean of three tests reduces the effect of an odd result, making results more reliable.",
        ],
        modelAnswer: "A single test could hit a crack or root hole, or the timing could be wrong. The mean of three reduces the effect of one odd result, so the results are more reliable.",
        explanation: "Repeats improve reliability.",
      }),
      P.manual({
        label: "(h)", marks: 4, stem: "To what extent do the results support the hypothesis? Use data in your answer.",
        points: [
          "The vegetated sites have the shortest times: woodland 62 s, grassland 98 s, maize field 127 s.",
          "The bare, compacted sites are much slower: football pitch 400 s and footpath 635 s.",
          "Quantifies the difference, for example the footpath takes about ten times as long as the woodland.",
          "Concludes the hypothesis is accepted / strongly supported (and notes the maize field, partly bare, is between the two groups).",
        ],
        modelAnswer: "The results strongly support the hypothesis. Water infiltrated fastest under woodland (62 s) and grassland (98 s), and the maize field took 127 s. On the compacted football pitch it took 400 s and on the footpath 635 s, about ten times as long as in the woodland. The hypothesis is accepted.",
        explanation: "Use figures for both groups and make a clear decision.",
      }),
      P.manual({
        label: "(i)", marks: 3, stem: "Explain why infiltration is slower on the footpath than in the woodland.",
        points: [
          "Trampling compacts the soil on the footpath, reducing the pore spaces that water can enter.",
          "Woodland soil has roots, burrows and organic matter (leaf litter/humus) that keep it loose and open.",
          "Bare ground can form a crust when raindrops hit it, sealing the surface; vegetation protects the surface.",
        ],
        modelAnswer: "Feet compact the footpath soil, closing up the pore spaces, and the bare surface forms a crust. In the woodland, roots, animal burrows and humus keep the soil loose with many large pores, so water soaks in quickly.",
        explanation: "Compaction and lack of organic matter reduce infiltration.",
      }),
      P.manual({
        label: "(j)", marks: 3, stem: "Suggest how replacing woodland in the basin with paths, pitches and buildings would affect the river after heavy rain.",
        points: [
          "Less infiltration means more overland (surface) runoff.",
          "Water reaches the river faster, so the lag time is shorter.",
          "The peak discharge is higher, increasing the risk of flooding (and soil erosion).",
        ],
        modelAnswer: "With less infiltration, more rain runs over the surface and reaches the river quickly, so the hydrograph has a shorter lag time and a higher peak, and floods become more likely.",
        explanation: "Link infiltration to runoff, lag time and peak discharge.",
      }),
      P.manual({
        label: "(k)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Evaluate the reliability of this investigation and suggest improvements.",
        points: [
          "Only one location for each land use; results may reflect local soil type rather than land use.",
          "Antecedent soil moisture differs between sites (shade in the woodland, irrigation of the pitch), which affects infiltration.",
          "Ring leakage or uneven ring depth, and judging exactly when the level has fallen 50 mm, introduce errors.",
          "Three repeats is few; very slow sites (footpath) allow more evaporation during the test.",
          "Improvements: several sites per land use, more repeats, record soil type and moisture, test after the same period without rain.",
          "Judgement: the large differences between land uses are probably real, but exact rates are uncertain.",
        ],
        levels: geographyLevels(6),
        modelAnswer: "The differences between sites are so large that the general conclusion is probably reliable, but the exact rates are not. Each land use was tested in only one place, so soil type, rather than land use, may explain some differences. Soil moisture before the test probably varied: woodland soil may be damper than the sunny pitch. Water can leak around a ring that is not pushed in evenly, and judging the exact 50 mm fall is difficult. Three repeats is a small number. The study could be improved by testing three or four sites for each land use, using five repeats, recording soil texture and moisture with a probe, and doing all tests on one day at least two days after rain.",
        explanation: "Consider sample size, controlled variables and measurement error, then suggest specific improvements and judge.",
      }),
      P.manual({
        label: "(l)", marks: 2, stem: "Suggest **two** other measurements the students could make at each site to help explain their results.",
        points: [
          "Names one relevant measurement: soil moisture (probe or sample weighed before and after drying), soil texture or type, or soil compaction (penetrometer).",
          "Names a second, different measurement: percentage vegetation cover (quadrat), depth of leaf litter, slope angle (clinometer) or number of roots/burrows.",
        ],
        modelAnswer: "They could measure soil moisture with a probe before each test and record the percentage vegetation cover in a quadrat around the ring.",
        explanation: "Extra variables help explain differences that land use alone does not.",
      }),
    ],
    explanation: "A full Paper 4 drainage-basin investigation: fair testing, means and rates, graph choice, analysis, explanation, links to flood hydrographs and evaluation.",
  });
});
