// W3b: hazard.earthquakes (Cambridge only, A Level Paper 3 option 9). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, sf, magnitudeRatios, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3b-_q.mjs";
import { perSec, dist, tsunamiSpeed } from "../tables/w3b-hazard-earthquakes.mjs";

chk(perSec, 8.4, 1e-9);
const d15 = chk(dist(15), 126, 1e-9);
const eRatio = magnitudeRatios(9.0 - 7.0).energy;
chk(eRatio, 1000, 1e-6);
const vTs = tsunamiSpeed(5000) * 3.6;
sf(vTs, 3, 797, "tsunami");
const e1 = magnitudeRatios(7.9 - 6.9).energy;
const e1R = rnd(e1, 1, 31.6, "e1");
const LAG = [9, 14, 20];
const dists = LAG.map(dist);
const d2 = chk(dists[1], 117.6, 1e-9);
const EQT = tbl(["Earthquake", "Magnitude (Mw)", "Focal depth (km)", "Distance to nearest city (km)", "Deaths"], [
  ["A", "6.9", 8, 12, "3 100"], ["B", "7.9", 45, 70, 140], ["C", "6.4", 10, 15, 12],
]);
const SEIS = tbl(["Station", "S–P time lag (s)"], LAG.map((l, i) => [i + 1, l]));

concept("ageo.hazard.earthquakes", { file: "hazard/earthquakes", keyPrefix: "hazard.earthquakes", applies: CAM }, (b) => {
  mc(b, 2, "RECALL", "What is the epicentre of an earthquake?", [
    ["The point on the surface directly above the focus", "Correct: the epicentre is vertically above the point of rupture."],
    ["The point underground where the rock first breaks", "That is the focus (hypocentre), not the epicentre."],
    ["The place where the greatest damage is recorded", "The worst damage can be away from the epicentre, for example on soft ground."],
    ["The line along which the plates slip past each other", "That is a fault or plate boundary."],
  ], "The **epicentre** is the surface point directly above the **focus**.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which seismic waves cannot travel through liquid?", [
    ["S waves", "Correct: shear waves need a solid, which is why they do not cross the outer core."],
    ["P waves", "P waves travel through solids, liquids and gases."],
    ["Both P and S waves", "P waves pass through liquid."],
    ["Neither P nor S waves", "P waves pass through liquid."],
  ], "**S waves** are shear waves and need a solid to travel through.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the main difference between magnitude and intensity?", [
    ["Magnitude measures energy released; intensity measures effects at a place", "Correct: magnitude has one value for the earthquake, intensity varies from place to place."],
    ["Magnitude measures effects at a place; intensity measures energy released", "This reverses the two terms."],
    ["Magnitude is used on land only; intensity is used at sea only", "Both scales are used for any earthquake."],
    ["Magnitude uses the Mercalli scale; intensity uses the Richter scale", "The scales are the other way round."],
  ], "**Magnitude** = source energy (one value); **intensity** = observed effects (varies with place).");
  mc(b, 3, "APPLICATION", "Which statement about a magnitude 7.0 and a magnitude 5.0 earthquake on the Richter scale is correct?", [
    ["The magnitude 7.0 earthquake has waves 100 times larger", "Correct: two whole steps give 10 × 10 = 100 times the amplitude (and about 1 000 times the energy)."],
    ["The magnitude 7.0 earthquake has waves 2 times larger", "The scale is logarithmic, not linear."],
    ["The magnitude 7.0 earthquake has waves 20 times larger", "This multiplies the difference by 10 instead of using powers of 10."],
    ["The two earthquakes have waves of equal size at the focus", "Different magnitudes mean different amplitudes."],
  ], "Amplitude ratio = 10² = **100**; energy ratio ≈ 10³ = 1 000.", { hints: ["Each whole number is a factor of ten in amplitude."] });
  mc(b, 3, "ANALYSIS", "Why does soft, water-saturated sediment increase earthquake damage?", [
    ["It amplifies shaking and can liquefy, so foundations lose support", "Correct: both amplification and liquefaction apply on loose, saturated ground."],
    ["It absorbs all seismic waves so buildings are not shaken", "Soft sediment amplifies shaking rather than absorbing it."],
    ["It is always on steep slopes where rocks fall onto roads", "Soft sediment is typical of flat basins and river deltas."],
    ["It reduces the focal depth so that the focus is much nearer the surface", "Ground type does not change the depth of the focus."],
  ], "Loose saturated soil **amplifies** shaking and **liquefies**.", { hints: ["Think of Christchurch in 2011."] });
  mc(b, 3, "ANALYSIS", "Two earthquakes have the same magnitude. Which would usually cause greater damage in a city?", [
    ["One with a shallow focus close to the city", "Correct: less energy is lost before the waves reach the buildings."],
    ["One with a deep focus far from the city", "Energy decreases with distance, so damage is lower."],
    ["One that occurs in the middle of a deep ocean basin", "It is far from the city and may only produce a tsunami."],
    ["One that is followed by no aftershocks at all", "Aftershocks add damage but do not explain a difference in the main shock."],
  ], "A **shallow focus near people** delivers more intense shaking.", { hints: ["Energy spreads out and is absorbed with distance and depth."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Surface waves are the fastest seismic waves but cause less damage than body waves.", answer: false,
    feedbackTrue: "Not so: surface waves are slower than body waves and cause most damage.", feedbackFalse: "Correct: P waves are fastest, and surface waves (Love and Rayleigh) cause most of the damage.",
    explanation: "Body waves are faster. **Surface waves** are slower but carry large energy at the ground and do most damage." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each term to its meaning.",
    pairs: [
      ["Focus", "The point underground where the rock breaks"],
      ["Liquefaction", "Saturated soil behaves like a liquid when shaken"],
      ["Aftershock", "A smaller earthquake following the main shock"],
      ["Love wave", "A surface wave that moves the ground from side to side"],
      ["Modified Mercalli scale", "An intensity scale based on observed effects"],
    ], explanation: "Each term describes a feature of earthquakes and their effects." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The Richter scale is {{blank:a}}, so each whole number is about {{blank:b}} times the wave amplitude. The {{blank:c}} magnitude scale is now the standard for large earthquakes.",
    blanks: [
      { id: "a", accepted: ["logarithmic"], choices: ["logarithmic", "linear", "circular"] },
      { id: "b", accepted: ["10"], choices: ["10", "2", "32"] },
      { id: "c", accepted: ["moment"], choices: ["moment", "Mercalli", "surface"] },
    ], explanation: "Logarithmic, ten times the amplitude per step; the moment magnitude scale is used for large events." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the process in which water-saturated sandy soil loses strength during shaking and behaves like a liquid.",
    accepted: ["liquefaction", "soil liquefaction", "liquifaction"],
    explanation: "**Liquefaction** occurs when shaking raises pore water pressure so that grains lose contact." });

  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "km",
    stem: "A seismometer records the first S wave 15 seconds after the first P wave. Take the speed of P waves as 6.0 km/s and of S waves as 3.5 km/s. Calculate the distance from the seismometer to the epicentre, in km.",
    hints: ["Each kilometre makes the S wave lag by 1/3.5 − 1/6.0 seconds."],
    value: d15, wrong: [90, 52.5, 15],
    explanation: "1. Lag per km = 1/3.5 − 1/6.0 = 0.2857 − 0.1667 = 0.1190 s.\n2. Distance = 15 ÷ 0.1190 = **126 km**.\n3. The value 90 is 15 × 6.0 (P speed used alone) and 52.5 is 15 × 3.5." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "times",
    stem: "An earthquake of magnitude 9.0 is compared with one of magnitude 7.0. About how many times more energy does the magnitude 9.0 earthquake release? (Use the energy factor of about 31.6 per magnitude unit.)",
    hints: ["The difference is 2 units, so the factor is 31.6 × 31.6 (that is, 10 to the power 3)."],
    value: eRatio, wrong: [100, 2, 63.2],
    explanation: "Energy ratio = 10^(1.5 × 2) = 10³ = **1 000**. The value 100 is the amplitude ratio, and 63.2 adds instead of multiplying." });
  b.calc({ d: 4, skill: "APPLICATION", calculator: true, unit: "km/h",
    stem: "The speed of a tsunami wave in the open ocean is given by v = √(g d), where g = 9.81 m/s² and d is the water depth in metres. Calculate the speed, in km/h, in water 5 000 m deep (to the nearest whole number).",
    hints: ["Find v in m/s first, then multiply by 3.6."],
    value: vTs, dp: 0, wrong: [221, 49050, 70.0],
    explanation: "1. v = √(9.81 × 5 000) = √49 050 = 221.5 m/s.\n2. In km/h: 221.5 × 3.6 = **797 km/h**.\n3. The value 221 is in m/s." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "State three hazards caused by earthquakes, and give one way in which each can cause deaths.",
    points: [
      "Ground shaking: buildings and bridges collapse and crush people.",
      "Liquefaction or landslides: buildings sink or tilt, or slopes fail and bury homes.",
      "Tsunami or fire: coastal flooding drowns people; broken gas pipes start fires that cannot be fought because water mains are broken.",
    ],
    modelAnswer: "Ground shaking makes buildings and bridges collapse onto people. Landslides triggered by shaking bury homes on steep slopes. A tsunami floods the coast and drowns people.",
    explanation: "Name the hazard and link it to a cause of death." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the Pacific Ring of Fire has more large earthquakes than most other parts of the world.",
    hints: ["Think about the types of plate boundary around the Pacific."],
    points: [
      "The Pacific plate and neighbouring plates meet along a long ring of boundaries.",
      "Most of these are subduction zones, where a denser oceanic plate sinks beneath another plate.",
      "The plates lock together by friction and strain builds up over decades or centuries.",
      "When the stored strain is released, the rock slips suddenly and releases large amounts of energy as great earthquakes, often at shallow depth.",
    ],
    modelAnswer: "The Pacific plate and its neighbours meet along a ring of boundaries, most of them subduction zones where denser oceanic crust sinks beneath another plate. The plates lock by friction and strain builds up for decades. When the strain is suddenly released along the long locked boundary, great earthquakes occur.",
    explanation: "Locked subduction boundaries store strain and release it as large earthquakes." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how the intensity of an earthquake changes with distance from the epicentre. Illustrative data: 5 km, Mercalli VIII; 40 km, VI; 120 km, IV.",
    points: [
      "Intensity decreases as distance from the epicentre increases.",
      "It falls from VIII at 5 km to VI at 40 km and IV at 120 km (quote figures).",
      "The fall is fastest close to the epicentre (two units in the first 35 km, then two units in the next 80 km).",
    ],
    modelAnswer: "Intensity decreases with distance from the epicentre. It falls from VIII at 5 km to VI at 40 km and IV at 120 km. The decrease is fastest near the epicentre: two units over the first 35 km and two units over the next 80 km.",
    hints: ["Describe the trend and quote at least two pairs of values."],
    explanation: "State the trend, quote the figures and comment on the rate of change." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Suggest why an earthquake of magnitude 6.5 may kill many more people in one country than in another.",
    hints: ["Think about buildings, density, warning and services."],
    points: [
      "Poor-quality or unreinforced buildings that collapse, compared with buildings made to a strict earthquake code.",
      "High population density, especially informal housing on steep slopes or soft ground.",
      "Fewer emergency services, hospitals, roads and equipment for rescue in poorer countries.",
      "Little education or practice of what to do, and no warning system or drills.",
    ],
    modelAnswer: "In one country many buildings may be poorly built and unreinforced, so they collapse, whereas elsewhere strict codes keep them standing. Dense informal housing on steep slopes or soft ground adds to the risk. Poorer countries have fewer hospitals and rescue teams, and less education, so people do not know how to respond.",
    explanation: "Vulnerability, not magnitude alone, controls deaths." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table gives data for three earthquakes in different countries (illustrative data, invented for this exercise).\n\n${EQT}`,
    hints: ["Each magnitude unit is a factor of about 31.6 in energy.", "Compare the depth and distance of A and B."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Earthquake B has a magnitude 1.0 higher than earthquake A. About how many times more energy does B release? Give your answer to one decimal place.", value: e1R, dp: 1, unit: "times", wrong: [10, 1],
        explanation: "Energy ratio = 10^(1.5 × 1.0) = 31.6. The value 10 is the amplitude ratio." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which factor in the table best explains why A killed more people than B?", options: [
        ["A was shallow and close to a city", "Correct: shallow focus and short distance give strong shaking where people live."],
        ["A had a higher magnitude", "A has the lower magnitude."],
        ["A was deeper than B", "A was shallower (8 km compared with 45 km)."],
        ["A was further from the nearest city", "A was nearer (12 km compared with 70 km)."],
      ], answer: "A", explanation: "Depth and distance outweighed magnitude." }),
      P.manual({ label: "(c)", marks: 3, stem: "Earthquake C was shallow and close to a city, but killed only 12 people. Suggest reasons.",
        points: [
          "Buildings built to a strict earthquake code (for example reinforced, flexible or base-isolated) did not collapse.",
          "The smaller magnitude (6.4) meant less energy than A or B.",
          "Good warnings, education and rapid emergency services reduced the injuries and deaths.",
        ],
        modelAnswer: "Buildings may have been built to a strict code, so few collapsed. Its magnitude (6.4) was smaller. Good education and rapid emergency services reduced injuries and deaths.",
        explanation: "Combine low hazard strength and low vulnerability." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two other pieces of information that would help to explain the differences in deaths.",
        points: ["Type and quality of buildings, and population density", "Time of day, ground type, or the level of preparedness and emergency services"],
        modelAnswer: "The quality of buildings and the population density, and the ground type or the level of preparedness.",
        explanation: "Accept any two valid factors of vulnerability or hazard." }),
    ], explanation: "Interpret a table, apply the magnitude scale and consider vulnerability." });

  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `Three seismometers record the arrival of P and S waves from the same earthquake (illustrative data). Take the speed of P waves as 6.0 km/s and of S waves as 3.5 km/s, so each second of S–P lag equals 8.4 km.\n\n${SEIS}`,
    hints: ["Distance = lag × 8.4 km.", "Where do three circles meet?"],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the distance of Station 2 from the epicentre, in km (to one decimal place).", value: d2, dp: 1, unit: "km", wrong: [14, 84, 49.0],
        explanation: "14 × 8.4 = 117.6 km." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which station is nearest to the epicentre?", options: [
        ["Station 1", "Correct: the smallest lag (9 s) means the shortest distance."],
        ["Station 2", "Its lag of 14 s is larger than Station 1's."],
        ["Station 3", "Its lag of 20 s is the largest, so it is the furthest."],
        ["They are all the same distance", "The lags differ."],
      ], answer: "A", explanation: "Distance is proportional to the lag." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why three stations are needed to find the epicentre.",
        points: ["One station gives only a distance, so the epicentre could be anywhere on a circle of that radius.", "Circles from three stations intersect at a single point, the epicentre (triangulation)."],
        modelAnswer: "A single station gives only a distance, so the epicentre could lie anywhere on a circle. The circles from three stations meet at one point, which is the epicentre.",
        explanation: "Triangulation fixes a position." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe how a landslide and liquefaction can each be triggered by the earthquake.",
        points: ["Shaking reduces friction on steep or weak slopes, so rock and soil slide down.", "In saturated loose sediment, shaking raises the water pressure between grains.", "The grains lose contact and the ground behaves like a liquid, so buildings tilt and sink."],
        modelAnswer: "Shaking reduces friction on steep or weak slopes so that rock and soil slide down. In saturated sediment, shaking raises the water pressure between grains so they lose contact and the ground behaves like a liquid, and buildings tilt and sink.",
        explanation: "Link shaking to pore-water pressure and slope stability." }),
      P.manual({ label: "(e)", marks: 4, stem: "Assess how far earthquake damage is controlled by the magnitude of the earthquake.",
        points: ["Magnitude determines the energy and the area affected: larger earthquakes shake wider areas.", "But depth and distance matter: a shallow, near event can be more damaging than a larger, deeper one.", "Local ground (soft sediment, slopes) and secondary hazards (tsunami, landslide) change the damage.", "Building quality and preparedness decide whether shaking becomes a disaster; so magnitude is important but not the main control."],
        modelAnswer: "Magnitude decides the energy and the area shaken, so it matters. But a shallow earthquake close to a city can do more damage than a larger, deeper one. Local ground and secondary hazards such as tsunami also matter. Building quality and preparedness decide whether the shaking becomes a disaster, so magnitude is important but not the main control.",
        explanation: "Weigh magnitude against depth, ground and vulnerability and judge." }),
    ], explanation: "Calculate a distance from the S–P lag, explain triangulation and secondary hazards, and assess controls on damage." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the importance of vulnerability, compared with magnitude, in explaining the number of deaths in earthquakes. Use examples.",
    hints: ["Use two contrasting events, such as Haiti 2010 and Chile 2010.", "Reach a judgement."],
    points: [
      "Magnitude matters: larger earthquakes release more energy and shake larger areas, and subduction-zone events can trigger tsunamis (Japan, 2011).",
      "Haiti, January 2010: magnitude 7.0, shallow focus near Port-au-Prince, with very high death estimates of over 100 000.",
      "Chile, February 2010: magnitude 8.8 (about 500 times the energy of Haiti), but about 500 deaths.",
      "The difference is explained by building quality and codes: weak, unreinforced buildings in Haiti and strictly enforced codes in Chile.",
      "Wealth and governance: Chile had stronger emergency services, planning and public education; Haiti had few.",
      "Secondary hazards such as tsunamis and landslides, and local ground conditions (liquefaction), alter the number of deaths.",
      "Exposure: density of population, time of day and distance to the focus affect deaths regardless of vulnerability.",
      "Judgement: magnitude sets the hazard but vulnerability determines how much of it becomes a disaster, so for explaining deaths vulnerability is usually more important.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Magnitude matters because larger earthquakes release more energy and shake larger areas, and subduction zone events can trigger tsunamis, as in Japan in 2011. However, vulnerability explains the number of deaths better. In January 2010 a magnitude 7.0 earthquake struck close to Port-au-Prince in Haiti, and estimates of deaths exceed 100 000. In February 2010 Chile suffered a magnitude 8.8 earthquake, hundreds of times more energetic, yet about 500 people died. Chile enforces strict building codes, has strong emergency services and educates its people, whereas Haiti had weak, unreinforced buildings and few services. Depth, distance, ground conditions and secondary hazards also change deaths. I conclude that magnitude sets the hazard, but vulnerability determines how much of it becomes a disaster.",
    wordLimit: { max: 300 }, explanation: "Contrast two real events and judge the controls on deaths." });

  b.card("DEFINITION", "Focus and epicentre", "The focus is the point underground where the rock breaks; the epicentre is the point on the surface directly above it.");
  b.card("DEFINITION", "Magnitude and intensity", "Magnitude = the energy released at the source (one value per earthquake). Intensity = the effects at a place (Modified Mercalli scale I–XII), which varies with distance and local conditions.");
  b.card("FACT", "Richter scale steps", "Logarithmic: each whole number is about 10 times the wave amplitude and about 32 times the energy.");
  b.card("CONCEPT", "Seismic waves", "P waves: fastest, pass through solids and liquids. S waves: slower, solids only. Love and Rayleigh waves: surface waves, slowest but do most damage.");
  b.card("FORMULA", "Distance from the S–P lag", "Distance = lag ÷ (1/vS − 1/vP). With vP = 6.0 km/s and vS = 3.5 km/s, distance = 8.4 km × lag in seconds.");
  b.card("CONCEPT", "Earthquake hazards", "Ground shaking, liquefaction, landslides, tsunami, fire and aftershocks.");
  b.card("FACT", "Haiti and Chile, 2010", "Haiti (magnitude 7.0, January 2010): estimates of over 100 000 deaths. Chile (magnitude 8.8, February 2010): about 500 deaths. Vulnerability explains the contrast.");
  b.card("CONCEPT", "Vulnerability to earthquakes", "Higher where buildings are weak, population density and poverty are high, warning and emergency services are poor, and governance is weak.");
  b.card("FORMULA", "Tsunami speed", "v = √(g d). In 4 000 m of water about 198 m/s (about 710 km/h); the wave slows and builds up as the water shallows.");
});
