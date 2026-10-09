// Slice W3a: farm tools: use and maintenance (Cambridge only; tagged automatically).
import { concept, P, agricultureLevels, money, check, table } from "../lib.mjs";

// Q: cost per year of tool life.
const good = 12 / 6;
const cheap = 5 / 2;
check(good === 2 && cheap === 2.5, "tools");

const TOOL_TABLE = table(["Tool", "Condition found in the store"], [["Saw", "Blade rusty; teeth blunt; cut binds in the wood"], ["File", "No handle; teeth clogged with metal filings"], ["Knapsack sprayer", "Nozzle blocked; tank still contains herbicide mixture"], ["Hoe", "Blade blunt; handle loose and split"]]);

concept("agri.machinery.hand-tools", { file: "machinery/hand-tools", keyPrefix: "machinery.hand-tools" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which tool is used to cut metal such as a steel bar?",
    options: [
      ["Hacksaw", "Correct: its fine teeth cut metal."],
      ["Crosscut saw", "A crosscut saw cuts timber across the grain."],
      ["Rip saw", "A rip saw cuts timber along the grain."],
      ["Bow saw", "A bow saw cuts logs and branches."],
    ],
    answer: "A",
    explanation: "Hacksaws have fine, hardened teeth for metal.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are the teeth of a saw \"set\" (bent alternately left and right)?",
    options: [
      ["So the cut is wider than the blade and the saw does not stick", "Correct: the blade runs freely in the kerf."],
      ["So the saw can cut equally well on the push and the pull stroke", "Setting does not create two-way cutting."],
      ["To make the teeth stronger against rusting", "Setting has no effect on rust."],
      ["To make the saw lighter to carry", "Mass hardly changes."],
    ],
    answer: "A",
    explanation: "Without set, the blade binds in the cut.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which hand tool is best for lifting potatoes and turning a compost heap?",
    options: [
      ["Digging fork", "Correct: its tines lift without cutting tubers."],
      ["Rake", "A rake levels and collects trash."],
      ["Slasher", "A slasher cuts grass."],
      ["Screwdriver", "A screwdriver drives screws."],
    ],
    answer: "A",
    explanation: "Forks penetrate heavy soil and lift tubers with less damage than a spade.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The nozzle of a knapsack sprayer is blocked during spraying. What should the operator do?",
    options: [
      ["Remove it with gloves on and clean it with a soft brush or grass stalk", "Correct: safe and does not damage the nozzle."],
      ["Blow through the nozzle with the mouth to clear it", "This puts pesticide into the body."],
      ["Push a piece of wire through the hole", "Wire damages the nozzle opening and spray pattern."],
      ["Pump the pressure up as high as possible until the blockage is forced out", "This can burst seals and does not clear dirt reliably."],
    ],
    answer: "A",
    hints: ["Think of safety and of the nozzle's opening."],
    explanation: "Never blow through nozzles; clean gently and wear PPE.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why should a farmer keep a separate knapsack sprayer for herbicides?",
    options: [
      ["Traces of herbicide left in the tank can damage crops later", "Correct."],
      ["Herbicides cannot be sprayed through a normal knapsack nozzle", "Normal nozzles can spray herbicides."],
      ["Insecticides make herbicides stronger", "This is not the reason."],
      ["Herbicide sprayers must be painted a special colour", "Colour is not the reason."],
    ],
    answer: "A",
    hints: ["What does a herbicide do to plants?"],
    explanation: "Residues of herbicide are hard to remove completely and can injure the next crop sprayed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why must a file always be fitted with a handle?",
    options: [
      ["The pointed tang could pierce the user's hand", "Correct."],
      ["Files cut only when they have a handle", "The teeth cut either way, but it is unsafe."],
      ["The handle keeps the teeth sharp", "Handles do not sharpen."],
      ["The handle stops the file rusting", "Rust is prevented by keeping it dry."],
    ],
    answer: "A",
    explanation: "A bare tang can be driven into the palm on the forward stroke.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A bolt head on a plough is becoming rounded because the farmer's spanner slips. What is the most likely cause?",
    options: [
      ["The spanner is the wrong size for the bolt head", "Correct: an oversized spanner slips and rounds the corners."],
      ["The spanner has been oiled", "Oiling the tool is normal care."],
      ["The farmer pulled the spanner towards himself as he turned it", "Pulling is the safe way to use a spanner."],
      ["The bolt is made of galvanised steel", "Galvanising does not cause rounding."],
    ],
    answer: "A",
    hints: ["What happens if the jaws are loose on the head?"],
    explanation: "Use the exact size of spanner and pull steadily.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "After spraying, Tatenda has 2 L of rinse water from cleaning the knapsack tank. What is the safest way to dispose of it?",
    options: [
      ["Spray it over the crop area that was just treated", "Correct: the dilute chemical stays where it was meant to be."],
      ["Pour it into the nearest stream so that it is diluted", "This pollutes water and harms fish and people."],
      ["Pour it down the toilet in the farmhouse", "It may reach water sources and is unsafe."],
      ["Give it to the cattle to drink", "Very dangerous to animals."],
    ],
    answer: "A",
    hints: ["Where can the chemical do least harm?"],
    explanation: "Rinsate is sprayed onto the treated crop, never into water or drains.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A claw hammer can both drive nails and pull them out.",
    answer: true,
    explanation: "True. The claw grips the nail head for removal.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A screwdriver may be used as a small chisel or lever if no other tool is available.",
    answer: false,
    explanation: "False. This damages the tip and can cause injury; use the correct tool.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each knapsack sprayer part with its function.",
    pairs: [
      ["Filter (strainer)", "Keeps dirt out of the tank"],
      ["Lever handle and pump", "Builds up pressure"],
      ["Pressure chamber", "Keeps the pressure even"],
      ["Trigger valve", "Turns the spray on and off"],
      ["Nozzle", "Breaks the liquid into droplets"],
    ],
    explanation: "Know the parts of a knapsack sprayer in order.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each tool with its main use.",
    pairs: [
      ["Pick", "Breaking hard ground and rocks"],
      ["Rake", "Levelling a seedbed to a fine tilth"],
      ["Slasher", "Cutting grass for a fire guard"],
      ["Spade", "Digging trenches and mixing compost"],
    ],
    explanation: "Choose the right tool for the job.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Filings are cleaned from the teeth of a file with a file {{blank:a}}; a loose hammer head is tightened by driving in a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["card", "brush", "card (wire brush)"] },
      { id: "b", accepted: ["wedge", "metal wedge"] },
    ],
    explanation: "File card; wedge.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Assume a good-quality hoe costs US\\$12 and lasts 6 years, and a cheap hoe costs US\\$5 and lasts 2 years. Calculate the cost per year of the cheap hoe, in US dollars.",
    value: cheap, prefix: "US$", answer: "2.50", wrong: [0.4, 10],
    hints: ["Cost ÷ years of life."],
    explanation: `US\\$5 ÷ 2 = ${money(cheap)} a year, compared with US\\$12 ÷ 6 = ${money(good)} for the good hoe, which is cheaper in the long run.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of saw with a curved metal frame used to cut logs and prune branches.",
    accepted: ["bow saw", "bowsaw", "bow-saw"],
    keywords: { any: ["bow"] },
    explanation: "A **bow saw**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the part of a knapsack sprayer that breaks the liquid into droplets.",
    accepted: ["nozzle", "nozzle tip", "spray nozzle"],
    explanation: "The **nozzle**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a knapsack sprayer should be cleaned and stored after spraying an insecticide.",
    hints: ["Rinse, flush, check, store."],
    points: [
      "Rinse the tank three times with clean water (wearing PPE).",
      "Spray the rinse water through the lance onto the treated crop, not into water sources.",
      "Clean the filter and nozzle; check washers and seals and oil moving parts.",
      "Store empty, dry and open to air, locked away from food, children and animals.",
    ],
    modelAnswer: "Wearing gloves, rinse the tank three times and spray the rinse water through the lance over the treated crop. Clean the filter and nozzle, check the seals and oil the pump, then store the sprayer empty and dry in a locked store away from food and children.",
    explanation: "Rinse, flush, maintain, store.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Explain **two** safety rules for using cultivation hand tools on a school farm.",
    hints: ["Rule plus reason."],
    points: [
      "Carry sharp tools with the blade pointing down.",
      "So that people are not cut if the carrier trips or turns.",
      "Never leave rakes or forks lying with the points upward / keep a safe distance when swinging picks and slashers.",
      "So nobody steps on the points or is struck by the swinging tool (also: check heads are tight so they do not fly off).",
    ],
    modelAnswer: "Sharp tools are carried with the blades pointing down so nobody is cut if the carrier trips. Rakes are never left with the teeth upward, because someone could step on them and be injured or hit by the handle.",
    explanation: "Rule plus reason.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8,
    stem: `A teacher checks the farm tool store at the end of term.\n\n${TOOL_TABLE}`,
    hints: ["Give the maintenance needed for each fault."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Describe how the saw should be restored.",
        points: ["Remove rust (wire brush or emery) and oil the blade.", "Sharpen the teeth with a (triangular) file and reset them so the saw does not bind."],
        explanation: "Saw care.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe what should be done with the file.",
        points: ["Fit a handle before using it again.", "Clean the teeth with a file card (wire brush) and store it apart from other tools."],
        explanation: "File care.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe how the sprayer should be dealt with.",
        points: ["Wearing PPE, empty the mixture safely onto the target area and rinse the tank three times.", "Clean the nozzle with a soft brush (not by blowing) and store the sprayer dry and locked away."],
        explanation: "Sprayer care.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Describe how the hoe should be repaired.",
        points: ["Sharpen the blade with a file.", "Replace the split handle and fix the head firmly (wedge)."],
        explanation: "Hoe repair.",
      }),
    ],
    explanation: "Maintenance of workshop tools, sprayers and cultivation tools.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 12,
    stem: "Rudo is starting a vegetable garden on hard, stony ground and will build a fowl run from gum poles and wire. She has a small budget for tools and must protect her crops from aphids.",
    hints: ["Choose tools for each job and justify them."],
    parts: [
      P.manual({
        label: "(a)", marks: 3, stem: "Suggest **three** cultivation tools Rudo needs to prepare the garden, giving the use of each.",
        points: ["Pick (or mattock) to break the hard, stony ground.", "Digging fork or hoe to dig and loosen the soil / spade to dig and mix compost.", "Rake to level the bed and make a fine tilth."],
        explanation: "Cultivation tools.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Suggest **three** workshop tools for building the fowl run, giving the use of each.",
        points: ["Bow saw or crosscut saw to cut poles and timber to length.", "Claw hammer to drive (and pull) nails or staples.", "Pliers/spanner/screwdriver to fix wire, bolts or screws on the door."],
        explanation: "Workshop tools.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Name **two** items of protective clothing she should wear when spraying the aphids.",
        points: ["Gloves / overalls with long sleeves.", "Goggles or face shield / mask / boots."],
        explanation: "PPE.",
      }),
      P.manual({
        label: "(d)", marks: 4, stem: "Discuss whether Rudo should buy cheap tools or fewer, better-quality tools.",
        points: ["Cheap tools cost less now, so she can buy more of them with a small budget.", "But they wear, bend or break quickly, and replacements and lost work cost more over time.", "Good tools last longer, are safer and cost less per year of use if maintained.", "Judgement: buy fewer, good-quality essential tools and maintain them (borrow or share others)."],
        levels: agricultureLevels(4),
        explanation: "Cost now versus cost over time.",
      }),
    ],
    explanation: "Choosing, using and buying tools for a new garden and structure.",
  });

  b.card("FACT", "Types of saw", "Crosscut (across grain), rip (along grain), bow saw (logs, pruning), hacksaw (metal).");
  b.card("DEFINITION", "Set of a saw", "Alternate teeth bent left and right so the cut is wider than the blade and it does not bind.");
  b.card("CONCEPT", "Using a file safely", "Always fit a handle; cut on the forward stroke; clean with a file card; never use as a lever (brittle).");
  b.card("CONCEPT", "Using a spanner", "Exact size; pull towards you; never hammer it or extend it with a pipe.");
  b.card("FACT", "Knapsack sprayer parts", "Tank, filter, pump and lever, pressure chamber, hose, trigger valve, lance, nozzle.");
  b.card("CONCEPT", "Cleaning a sprayer", "Triple rinse; spray rinse water on treated crop; clean nozzle with soft brush (never blow); store dry and locked.");
  b.card("FACT", "Cultivation hand tools", "Hoe, spade, shovel, digging fork, rake, pick, mattock, slasher.");
  b.card("CONCEPT", "General care of hand tools", "Clean, dry, oil metal, sharpen edges, repair handles, store hung up under cover.");
  b.card("CONCEPT", "Carrying sharp tools", "Blade pointing down; never leave rakes or forks with points upward.");
});
