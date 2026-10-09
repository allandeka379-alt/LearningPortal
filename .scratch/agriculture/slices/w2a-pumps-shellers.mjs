// Slice W2a: appropriate technology: irrigation pumps and shellers (ZIMSEC only).
import { concept, P, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: treadle pump minutes to deliver 3,600 L.
const tpMin = 1.2 * 60;
const tpTime = 3600 / tpMin;
check(Math.abs(tpMin - 72) < 1e-9 && Math.abs(tpTime - 50) < 1e-9, "tp");
// Num: centrifugal pump hours.
const cpHours = 54000 / 18000;
check(cpHours === 3, "cp");
// Calc: shelling hours and cost.
const shellH = 900 / 75;
check(shellH === 12, "shell");

// Structured: pump comparison.
const PUMPS = [["Treadle pump", "Foot power", "1.5 L per stroke, about 50 strokes per minute"], ["Centrifugal pump", "Petrol engine", "15,000 L per hour"]];
const P_TABLE = table(["Pump", "Power", "Output (assume)"], PUMPS);
const treadleH = (1.5 * 50 * 60);
const timeTreadle = 9000 / treadleH;
const timeCentrifugal = 9000 / 15000;
check(treadleH === 4500 && timeTreadle === 2 && Math.abs(timeCentrifugal - 0.6) < 1e-9, "pumps");

concept("agri.machinery.pumps-shellers", { file: "machinery/pumps-shellers", keyPrefix: "machinery.pumps-shellers" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which part of a centrifugal pump spins to fling water outwards?",
    options: [
      ["The impeller", "Correct."],
      ["The foot valve", "The foot valve keeps the suction pipe full."],
      ["The strainer", "The strainer keeps debris out."],
      ["The priming plug", "It is opened to fill the casing with water."],
    ],
    answer: "A",
    explanation: "The impeller's curved vanes throw water outwards into the volute casing.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why must a centrifugal pump be primed before it is started?",
    options: [
      ["It cannot pump air, only water", "Correct."],
      ["Priming oils the bearings before the shaft turns", "Bearings are greased separately."],
      ["Priming cleans the strainer", "It does not clean the strainer."],
      ["Priming cools the engine that drives the pump", "Priming fills the pump with water; it is not for cooling the engine."],
    ],
    answer: "A",
    explanation: "An impeller spinning in air cannot create the low pressure needed to draw water up.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a treadle pump, what actually pushes the water up the suction pipe?",
    options: [
      ["Atmospheric pressure on the water surface", "Correct: the piston lowers the pressure in the cylinder."],
      ["The weight of the operator pressing directly on the water", "The operator moves the pistons, not the water directly."],
      ["Capillary action in the narrow pipe", "Capillarity cannot raise water this fast or high."],
      ["An electric motor hidden in the frame", "Treadle pumps are worked by foot."],
    ],
    answer: "A",
    explanation: "Rising pistons reduce pressure in the cylinder, and air pressure pushes water in.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the function of the spring-loaded pressure plate in a hand-cranked maize sheller?",
    options: [
      ["It presses each cob, thick or thin, onto the teeth", "Correct."],
      ["It blows the chaff away from the grain as the grains fall", "That is the fan's job in a power sheller."],
      ["It turns the toothed disc when the handle is released", "The handle and flywheel turn the disc."],
      ["It sorts the grain into sizes", "Grain is not graded by the plate."],
    ],
    answer: "A",
    explanation: "The spring presses each cob onto the teeth, adjusting to thick or thin cobs.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer needs to lift water from a borehole where the water level is 30 m below the surface. Which pump is suitable?",
    options: [
      ["A piston pump with its cylinder under water", "Correct: it lifts rather than sucks."],
      ["A treadle pump at the surface", "Suction lift is limited to a few metres."],
      ["A centrifugal pump at the surface with a very long suction pipe", "It also depends on suction from the surface."],
      ["A siphon tube", "A siphon cannot raise water above the source."],
    ],
    answer: "A",
    hints: ["What limits a pump that works by suction from the surface?"],
    explanation: "Air pressure can push water up only a limited height; deep water needs the pumping cylinder placed below the water level.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A treadle pump works but delivers less water each season, and water leaks back down when the operator stops. Which parts should be checked first?",
    options: [
      ["The piston seals and valves", "Correct: worn seals and valves let water slip back."],
      ["The paint and the colour of the frame", "Paint does not affect pumping."],
      ["The length and angle of the two treadles", "Treadle length does not cause leakage."],
      ["The fuel tank", "Treadle pumps have no engine."],
    ],
    answer: "A",
    hints: ["Which parts must seal tightly for suction to work?"],
    explanation: "Leather or rubber seals and flap valves wear and must be replaced regularly.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How are the kernels separated from the shells after a hand groundnut sheller has cracked the pods?",
    options: [
      ["By winnowing off the lighter shells", "Correct."],
      ["By soaking in water until the kernels float", "Soaking is not used and would wet the kernels."],
      ["By burning the shells", "Burning would damage the kernels."],
      ["By passing everything through the sheller a second time", "Re-shelling would split kernels."],
    ],
    answer: "A",
    hints: ["Which part is lighter: the shell or the kernel?"],
    explanation: "Kernels and shell pieces fall through the screen together and are winnowed.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Much of the maize from a power sheller is cracked and broken. Which action is most likely to reduce the damage?",
    options: [
      ["Dry the cobs well and adjust the settings", "Correct: damp grain and tight settings cause damage."],
      ["Feed the cobs in faster so the job is finished sooner", "Overloading increases damage and blockages."],
      ["Remove the fan", "The fan separates chaff; it does not crack grain."],
      ["Shell the maize while it is still damp from the field", "Damp grain smears and breaks."],
    ],
    answer: "A",
    hints: ["Think of moisture and machine settings."],
    explanation: "Well-dried grain and correctly adjusted speed and clearance reduce broken grain.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A treadle pump is worked by the operator's feet.",
    answer: true,
    explanation: "True. The operator steps on two treadles that move the pistons.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "It is safe to clear a blocked power sheller with your hand while the engine is running, provided you work quickly.",
    answer: false,
    explanation: "False. Always stop the engine and wait for moving parts to stop before clearing a blockage.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part with its function.",
    pairs: [
      ["Foot valve", "Keeps the suction pipe full of water when the pump stops"],
      ["Volute casing", "Turns the speed of the water into pressure"],
      ["Strainer", "Stops leaves and debris entering the suction pipe"],
      ["Concave", "Curved screen through which shelled grain falls"],
      ["Flywheel", "Keeps a hand sheller's disc turning smoothly"],
    ],
    explanation: "Know each part's job.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Technology that is affordable and can be operated and repaired with local skills and materials is called {{blank:a}} technology. Filling a centrifugal pump with water before starting it is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["appropriate"] },
      { id: "b", accepted: ["priming"] },
    ],
    explanation: "Appropriate technology; priming.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Assume a treadle pump delivers 1.2 L per stroke at 60 strokes per minute. How many minutes will it take to deliver 3,600 L?",
    value: tpTime, unit: "min", tol: 0, wrong: [3600 / 1.2, 3600 / 60],
    explanation: `Output = 1.2 × 60 = ${tpMin} L/min; 3,600 ÷ ${tpMin} = ${tpTime} minutes.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Assume a centrifugal pump delivers 18,000 L per hour. How many hours will it take to deliver 54,000 L?",
    value: cpHours, unit: "h", tol: 0, wrong: [18000 / 54000],
    explanation: `54,000 ÷ 18,000 = ${cpHours} h.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "Assume a hand-cranked sheller shells 75 kg of maize grain per hour. Calculate the number of hours needed to shell 900 kg of grain.",
    value: shellH, unit: "h", tol: 0, wrong: [900 * 75, 75 / 900],
    hints: ["Divide the mass by the rate."],
    explanation: `900 ÷ 75 = ${shellH} h. Multiplying the mass by the rate gives a meaningless ${900 * 75}.`,
    workedSolution: `1. Hours = mass ÷ rate.\n2. Hours = 900 kg ÷ 75 kg/h = ${shellH} h.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the hand-held tool, a short ridged tube, that is twisted along a dry cob to remove the grains.",
    accepted: ["tube sheller", "tubular sheller", "hand sheller", "tubular maize sheller", "maize sheller", "hand-held sheller"],
    keywords: { any: ["sheller"] },
    explanation: "A **tube (tubular) maize sheller**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a treadle pump draws water from a well and delivers it.",
    hints: ["Follow one piston through an up-stroke and a down-stroke."],
    points: [
      "The operator steps on the treadles, moving the two pistons alternately up and down.",
      "A rising piston lowers the pressure in its cylinder.",
      "Atmospheric pressure pushes water up the suction pipe through the inlet valve into the cylinder.",
      "On the down-stroke the inlet valve closes and water is forced out through the outlet valve.",
    ],
    modelAnswer: "The operator steps from one treadle to the other, so the two pistons move up and down in turn. As a piston rises it lowers the pressure in its cylinder, and atmospheric pressure on the well water pushes water up the suction pipe, through the inlet valve and into the cylinder. When the piston goes down, the inlet valve closes and the water is pushed out through the outlet valve, while the other cylinder fills.",
    explanation: "Sequence of pressure changes and valves.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Rudo must deliver 9,000 L of water to her garden near Masvingo each day from a shallow well. She compares two pumps.\n\n${P_TABLE}`,
    hints: ["Litres per hour = litres per stroke × strokes per minute × 60."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the output of the treadle pump in litres per hour.",
        value: treadleH, tol: 0, wrong: [1.5 * 50, 1.5 * 50 * 60 * 60],
        explanation: `1.5 × 50 = 75 L/min; × 60 = ${treadleH.toLocaleString("en-GB")} L/h.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the number of hours of pumping needed each day with the treadle pump.",
        value: timeTreadle, unit: "h", tol: 0, wrong: [treadleH / 9000],
        explanation: `9,000 ÷ ${treadleH.toLocaleString("en-GB")} = ${timeTreadle} h.`,
      }),
      P.short({
        label: "(c)", stem: "Name the action that must be carried out on the centrifugal pump before it is started each time the suction pipe has emptied.",
        accepted: ["priming", "prime it", "prime the pump", "prime"],
        keywords: { any: ["prim"] },
        explanation: "Priming.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** reasons why the treadle pump may be more appropriate for Rudo than the centrifugal pump.",
        points: ["Much cheaper to buy, with no fuel cost.", "Simple to repair locally (seals, valves) with local skills.", "Its output is enough for the garden in about two hours / the water is shallow enough for suction / no exhaust fumes or noise."],
        explanation: "Cost, repair and suitability to scale.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "State **one** routine maintenance task for the treadle pump.",
        points: ["Replace worn piston seals or valve flaps / oil the pulley or pivot / clean the strainer / tighten bolts / store in the shade."],
        explanation: "Treadle pump maintenance.",
      }),
    ],
    explanation: "Appropriate technology matches cost and skills to the job; here the shallow well and small demand suit the treadle pump.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "A school near Hwange has bought a hand-operated groundnut sheller. It has a hopper, a curved perforated screen at the bottom and a handle that rocks a beater over the screen.",
    hints: ["Rubbing, falling through, then separating."],
    parts: [
      P.manual({
        label: "(a)", marks: 3, stem: "Explain how the sheller removes the kernels from the pods.",
        points: ["The rocking beater presses and rubs the pods against the screen.", "The pods crack open.", "Kernels and shell pieces fall through the holes in the screen."],
        explanation: "Rubbing principle.",
      }),
      P.manual({
        label: "(b)", marks: 1, stem: "Explain why the screen size must suit the size of the kernels.",
        points: ["Too small a screen splits/damages kernels; too large lets whole pods fall through."],
        explanation: "Matching screen to kernel size.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State **two** safety precautions when using the sheller.",
        points: ["Keep hands and loose clothing away from the moving beater.", "Wear a dust mask / remove stones before feeding / keep children away."],
        explanation: "Safe use.",
      }),
    ],
    explanation: "Groundnut shellers crack pods by rubbing them against a screen.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Discuss whether a communal-area farmer with 1 ha of irrigated vegetables should buy a treadle pump or an engine-driven centrifugal pump.",
    hints: ["Compare cost, output, labour, maintenance and water depth.", "Conclude with conditions."],
    points: [
      "Treadle: cheap to buy, no fuel; simple local repairs (seals, valves).",
      "Treadle: hard physical labour; low output may not water 1 ha in time; limited suction lift.",
      "Centrifugal: high output under pressure, can run sprinklers and water 1 ha quickly, saves labour.",
      "Centrifugal: costly to buy, fuel and spare parts; needs priming, mechanical skills, servicing.",
      "Depth of water and distance to the field affect the choice.",
      "Judgement: for 1 ha the engine pump (or a group-owned one) may be justified if fuel and repairs are affordable; otherwise treadle pumps for part of the area.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "A treadle pump is cheap, needs no fuel and can be repaired locally by replacing seals and valves, which makes it appropriate technology for a small garden. But pumping by foot is hard work and its output is small, so watering a whole hectare would take many hours each day, and it can only lift water a few metres. A centrifugal pump driven by an engine gives a large flow under pressure, can supply sprinklers and waters a hectare quickly, saving labour. However, it costs much more, needs fuel, oil and spares, must be primed and serviced, and breakdowns can stop irrigation. For 1 ha, an engine pump, perhaps shared by a group, is probably worth it if the farmer can afford fuel and repairs; if not, a treadle pump on a smaller irrigated area is the safer choice.",
    explanation: "Weigh both and decide with conditions.",
  });

  b.card("DEFINITION", "Appropriate technology", "Affordable, simple technology that local people can operate and repair, suited to the farm's scale.");
  b.card("CONCEPT", "How a treadle pump works", "Rising piston lowers pressure → air pressure pushes water in through inlet valve → falling piston pushes it out through outlet valve.");
  b.card("FACT", "Limit of suction pumps", "Air pressure pushes the water up, so suction lift is limited (theory under about 10 m; in practice a few metres).");
  b.card("CONCEPT", "How a centrifugal pump works", "Primed; impeller spins and flings water into volute casing; speed becomes pressure; low pressure at the eye draws more in.");
  b.card("DEFINITION", "Priming", "Filling the casing and suction pipe with water before starting a centrifugal pump.");
  b.card("CONCEPT", "Pump maintenance", "Replace seals and valves, oil/grease moving parts, clean strainer, check engine oil, fuel, air filter, belts and gland.");
  b.card("CONCEPT", "Parts of a hand disc maize sheller", "Hopper/throat, toothed disc, handle and flywheel, spring-loaded pressure plate, grain and cob outlets.");
  b.card("CONCEPT", "Groundnut sheller principle", "Beater rubs pods against a perforated screen; kernels and shells fall through; winnow to separate.");
  b.card("FACT", "Safe use of shellers", "Dry crop, remove stones, adjust settings, feed steadily, guards on, hands clear, stop engine to clear blockages, dust mask.");
});
