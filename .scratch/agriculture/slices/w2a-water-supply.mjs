// Slice W2a: farm water supplies (Cambridge only).
import { concept, P, round, check, table, agricultureLevels } from "../lib.mjs";

// Calc: cylindrical tank volume in litres.
const cylL = Math.PI * 1 ** 2 * 1.8 * 1000;
check(Math.abs(cylL - 5654.87) < 0.01, "cyl");
// Num: rectangular tank.
const rectL = 3 * 2 * 1.5 * 1000;
check(rectL === 9000, "rect");
// Num: days of supply for sheep.
const sheepDay = 120 * 6;
const sheepDays = rectL / sheepDay;
check(sheepDay === 720 && sheepDays === 12.5, "sheep");
// Num: pressure ratio.
const ratio = 6 / 2;
check(ratio === 3, "ratio");

// Structured: dam wall description and tank.
const TANK_R = 1.2, TANK_H = 2.5;
const tankL = Math.PI * TANK_R ** 2 * TANK_H * 1000;
const cattleDay = 25 * 45;
const tankDays = tankL / cattleDay;
check(Math.abs(tankL - 11309.73) < 0.01 && cattleDay === 1125 && Math.abs(tankDays - 10.053) < 1e-3, "tank struct");

concept("agri.structures.water-supply", { file: "structures/water-supply", keyPrefix: "structures.water-supply" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why is a dam wall built much thicker at the base than at the top?",
    options: [
      ["Water pressure increases with depth", "Correct: the greatest force is at the bottom."],
      ["The top must be thin so cattle can cross it", "Crossing is not the reason for the shape."],
      ["Thin tops let water flow over the wall in floods", "Floods must go through the spillway, not over the wall."],
      ["Soil at the base is lighter than soil at the top", "Soil density is not the reason."],
    ],
    answer: "A",
    explanation: "Pressure rises with depth, so the wall must be strongest at the bottom.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the purpose of the spillway of an earth dam?",
    options: [
      ["To carry flood water safely past the wall", "Correct: overtopping would wash the wall away."],
      ["To stop water seeping under the wall", "That is the cut-off trench."],
      ["To let cattle drink without trampling the wall", "Troughs are used for that."],
      ["To filter the water for drinking", "A spillway does not treat water."],
    ],
    answer: "A",
    explanation: "Water flowing over an earth wall erodes it; the spillway diverts floods round the end in firm ground.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a slow sand filter, what is the correct order of layers from top to bottom?",
    options: [
      ["Fine sand, coarse sand, gravel", "Correct: water passes the finest layer first."],
      ["Gravel, coarse sand, fine sand", "This is upside down."],
      ["Coarse sand, gravel, fine sand", "Fine sand is on top."],
      ["Fine sand, gravel, coarse sand", "Gravel supports the sand at the bottom."],
    ],
    answer: "A",
    explanation: "Fine sand on top traps particles; coarse sand and gravel below support it and let water drain to the outlet.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the outlet tap of a storage tank placed a little above the floor of the tank?",
    options: [
      ["So that sediment settled on the floor is not drawn off", "Correct."],
      ["So that the tank can never be emptied", "A drain valve empties it."],
      ["So that mosquitoes cannot enter the tank through the tap", "The cover keeps mosquitoes out."],
      ["So that the water pressure at the tap is higher", "A higher outlet gives slightly less head, not more."],
    ],
    answer: "A",
    explanation: "Silt settles on the floor; a raised outlet draws cleaner water, and a separate drain valve is used for cleaning.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Muddy dam water is to be made suitable for drinking. Which order of treatment is correct?",
    options: [
      ["Settle, filter, then disinfect", "Correct: remove particles first, then kill pathogens."],
      ["Disinfect, then settle, then filter", "Chlorine works poorly in muddy water."],
      ["Filter the muddy water straight away, then settle it", "A filter clogs quickly with unsettled mud."],
      ["Settle only, and drink the clear water on top", "Clear water may still carry pathogens."],
    ],
    answer: "A",
    hints: ["Which step would clog if it came first?"],
    explanation: "Settling removes most silt so the filter does not clog; disinfection of clear water then kills pathogens.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer moves a water tank from ground level onto a stand 4 m high. What happens to the water at the taps in the cattle troughs below?",
    options: [
      ["It flows with greater pressure, because the head is greater", "Correct."],
      ["It stops flowing, because water cannot flow downhill in pipes", "Water flows downhill by gravity."],
      ["It becomes cleaner, because the tank is higher", "Height does not clean water."],
      ["Its pressure falls, because the tank is further away", "Greater head gives more pressure."],
    ],
    answer: "A",
    hints: ["Pressure depends on the height of the water surface above the outlet."],
    explanation: "Raising the tank increases the head, so water reaches the troughs at higher pressure.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A new earth dam leaks: water seeps out under the downstream toe of the wall, carrying fine soil. Which part was most likely built badly?",
    options: [
      ["The clay-filled cut-off trench beneath the wall", "Correct: it should stop seepage under the wall."],
      ["The grass on the downstream face", "Grass protects against erosion by rain, not seepage."],
      ["The stone pitching on the upstream face", "Stones resist wave action."],
      ["The freeboard above the water level", "Freeboard relates to overtopping."],
    ],
    answer: "A",
    hints: ["Water is escaping beneath the wall, not over it."],
    explanation: "A cut-off trench dug down to impermeable material and filled with compacted clay prevents seepage under the wall; seepage that carries soil can destroy the dam.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Water pressure in a dam is greatest at the bottom of the water.",
    answer: true,
    explanation: "True. Pressure increases with depth.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When replacing a tap washer, the water supply can be left on if you work quickly.",
    answer: false,
    explanation: "False. Turn off the supply and drain the tap first, or water will spray out when the headgear is removed.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of a water storage system with its purpose.",
    pairs: [
      ["Overflow pipe on a tank", "Removes excess water safely when the tank is full"],
      ["Tank cover", "Keeps out dirt, animals and mosquitoes"],
      ["Cut-off trench", "Stops water seeping under a dam wall"],
      ["Stone pitching", "Protects the upstream face of a dam from waves"],
      ["Float (ball) valve", "Shuts off the flow when a trough is full"],
    ],
    explanation: "Each part protects the structure or the water.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "PVC pipes are joined with solvent {{blank:a}}. The threads of steel pipe fittings are wrapped with PTFE {{blank:b}} before they are screwed together.",
    blanks: [
      { id: "a", accepted: ["cement", "weld", "glue"] },
      { id: "b", accepted: ["tape", "thread tape", "seal tape"] },
    ],
    explanation: "Solvent cement; PTFE (thread seal) tape.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A cylindrical tank has an inside radius of 1 m and holds water to a depth of 1.8 m. Calculate the volume of water in litres, to the nearest litre. (1 m³ = 1,000 L.)",
    value: cylL, unit: "L", tol: 0.5, answer: String(Math.round(cylL)), wrong: [round(Math.PI * 2 ** 2 * 1.8 * 1000, 0), round(cylL / 1000, 3)],
    hints: ["Volume of a cylinder = π r² h.", "Do not use the diameter in place of the radius."],
    explanation: `V = π × 1² × 1.8 = ${round(cylL / 1000, 3)} m³ = ${Math.round(cylL).toLocaleString("en-GB")} L. Using the diameter (2 m) instead of the radius gives four times too much.`,
    workedSolution: `1. Volume = π r² h = π × 1² × 1.8 = ${round(cylL / 1000, 3)} m³.\n2. In litres: ${round(cylL / 1000, 3)} × 1,000 = ${Math.round(cylL).toLocaleString("en-GB")} L (to the nearest litre).`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A rectangular tank is 3 m long, 2 m wide and holds water 1.5 m deep. How many litres does it hold?",
    value: rectL, unit: "L", tol: 0, wrong: [9, 3 * 2 * 1.5 * 100],
    explanation: `3 × 2 × 1.5 = 9 m³ = ${rectL.toLocaleString("en-GB")} L.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Assume each of 120 sheep drinks about 6 L of water a day. For how many days will a full 9,000 L tank supply them? Give your answer to one decimal place.",
    value: sheepDays, unit: "days", tol: 0.05, wrong: [9000 / 120, 9000 / 6],
    hints: ["Find the daily demand of the whole flock first."],
    explanation: `Daily demand = 120 × 6 = ${sheepDay} L; ${rectL.toLocaleString("en-GB")} ÷ ${sheepDay} = ${sheepDays} days.`,
  });
  b.num({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How many times greater is the water pressure at a depth of 6 m in a dam than at a depth of 2 m?",
    value: ratio, tol: 0, wrong: [4, 12],
    explanation: "Pressure is proportional to depth: 6 ÷ 2 = 3 times.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the small plate at the bottom of a tap spindle that carries the washer.",
    accepted: ["jumper", "the jumper", "jumper plate", "jumper valve"],
    explanation: "The **jumper**.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how to replace the washer of a dripping tap.",
    hints: ["Begin with safety."],
    points: [
      "Turn off the water supply (stop valve) and open the tap to drain it.",
      "Unscrew the headgear with a spanner.",
      "Remove the old washer from the jumper and fit a new one of the right size.",
      "Reassemble, turn the supply back on and check for drips.",
    ],
    modelAnswer: "Turn off the supply at the stop valve and open the tap to let the water drain. Unscrew the headgear with a spanner, take out the jumper and remove the worn washer, then fit a new washer of the correct size. Screw the headgear back, turn the water on slowly and check that the tap has stopped dripping.",
    explanation: "Numbered, safe steps.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `A farmer near Gweru keeps 25 cattle. He plans to pump borehole water into a covered cylindrical tank of inside radius ${TANK_R} m, filled to a depth of ${TANK_H} m, standing on a stand above the troughs. Assume each animal drinks about 45 L a day.`,
    hints: ["V = π r² h; 1 m³ = 1,000 L.", "Daily demand = number of animals × litres each."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the volume of water in the full tank, in litres, to the nearest litre.",
        value: tankL, unit: "L", tol: 0.5, answer: String(Math.round(tankL)), wrong: [round(Math.PI * 2.4 ** 2 * 2.5 * 1000, 0), round(tankL / 1000, 2)],
        explanation: `π × ${TANK_R}² × ${TANK_H} = ${round(tankL / 1000, 3)} m³ = ${Math.round(tankL).toLocaleString("en-GB")} L.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate how many whole days a full tank will supply the herd.",
        value: Math.floor(tankDays), unit: "days", tol: 0, wrong: [round(tankL / 45, 0), Math.ceil(tankDays) + 1],
        explanation: `Daily demand = 25 × 45 = ${cattleDay.toLocaleString("en-GB")} L; ${Math.round(tankL).toLocaleString("en-GB")} ÷ ${cattleDay.toLocaleString("en-GB")} = ${round(tankDays, 2)}, so ${Math.floor(tankDays)} whole days.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the tank is placed on a stand.",
        points: ["The raised water surface gives a head (height) above the troughs.", "So water flows to the troughs by gravity with enough pressure, without pumping each time."],
        explanation: "Head and gravity flow.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Describe **three** features the tank should have, giving the purpose of each.",
        points: ["A cover: keeps out dirt, animals and mosquitoes / reduces evaporation and algae.", "An overflow: removes excess water safely when full.", "An outlet above the floor (so sediment is not drawn off) / a drain valve at the bottom for cleaning / a screened inlet."],
        explanation: "Features with purposes.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "The farmer uses polyethylene pipe from the tank to the troughs. Describe how the pipe is joined, and how the troughs are kept full without overflowing.",
        points: ["Polyethylene is joined with compression fittings (tighten the nut) or barbed insert fittings with clips.", "Each trough has a float (ball) valve.", "The float rises with the water level and closes the valve when the trough is full."],
        explanation: "Simple plumbing and float valves.",
      }),
    ],
    explanation: "Volume and demand calculations, then gravity supply, tank design and simple plumbing.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: "A farming cooperative plans a small earth dam across a stream to water livestock and irrigate gardens in the dry season.",
    hints: ["Think of the site, the wall and protection from floods."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "State **two** features of a good site for the dam.",
        points: ["A narrow part of the valley (short wall) with a wide basin behind it.", "An impermeable clay or rock base / a large enough catchment."],
        explanation: "Site features.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Outline how the wall should be built so that it resists water pressure and does not leak.",
        points: ["Dig a cut-off trench down to impermeable material and fill it with compacted clay.", "Build a clay core in the centre of the wall.", "Build in thin layers, each moistened and compacted.", "Make the wall much wider at the base than the top (gentle slopes) because pressure increases with depth."],
        explanation: "Seepage control, compaction and shape.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the spillway must be cut in firm ground at the end of the wall.",
        points: ["Flood water must pass the dam without flowing over the earth wall.", "Water over the wall, or a spillway in loose soil, would erode and could destroy the dam."],
        explanation: "Spillway protects the wall.",
      }),
    ],
    explanation: "Dam design follows from pressure increasing with depth and from the need to stop seepage and overtopping.",
  });

  b.card("FACT", "Sources of farm water", "Boreholes, wells, springs, rivers, dams, roof rainwater, piped supply; people need the cleanest.");
  b.card("CONCEPT", "Treating water", "Screen → settle (coagulant such as alum) → slow sand filter → disinfect drinking water.");
  b.card("CONCEPT", "Slow sand filter", "Fine sand on top, coarse sand, gravel at the bottom; a living surface layer traps microbes; scrape when slow.");
  b.card("FACT", "Why are dam walls thickest at the base?", "Water pressure increases with depth.");
  b.card("CONCEPT", "Building an earth dam", "Good site, cut-off trench with clay, clay core, compacted layers, wide base, stone pitching, grassed face, spillway, freeboard.");
  b.card("CONCEPT", "Features of a storage tank", "Cover, screened inlet, overflow, outlet above the floor, drain valve, firm or raised base.");
  b.card("FORMULA", "Volume of a cylindrical tank", "V = π r² h (m³); × 1,000 for litres.");
  b.card("CONCEPT", "Joining pipes", "PVC: solvent cement. Polyethylene: compression or insert fittings with clips. Steel: threads with PTFE tape.");
  b.card("CONCEPT", "Replacing a tap washer", "Supply off → drain tap → unscrew headgear → replace washer on jumper → reassemble → test.");
});
