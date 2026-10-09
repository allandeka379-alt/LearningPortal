// Slice W2a: fences: types, materials and treatment.
import { concept, P, round, money, check, table, agricultureLevels } from "../lib.mjs";

// Num: cost per year of a steel standard.
const steelPerYr = 6 / 20;
check(Math.abs(steelPerYr - 0.3) < 1e-9, "steel");
// Calc: saving over 12 years for 80 posts, treated (US\\$3.60, 12 yr) vs untreated (US\\$1.20, 3 yr).
const treated12 = 80 * 3.6;
const untreated12 = 80 * 1.2 * (12 / 3);
const saving12 = untreated12 - treated12;
check(Math.abs(treated12 - 288) < 1e-9 && Math.abs(untreated12 - 384) < 1e-9 && Math.abs(saving12 - 96) < 1e-9, "saving");

// Structured: post options.
const POSTS = [["Untreated gum pole", 1.0, 2], ["Butt-soaked gum pole", 2.4, 8], ["Pressure-treated gum pole", 4.5, 18], ["Steel standard", 7.0, 25]];
const P_TABLE = table(["Post", "Cost per post (US\\$)", "Expected life (years)"], POSTS.map(([n, c, y]) => [n, c.toFixed(2), y]));
const perYr = POSTS.map(([, c, y]) => c / y);
check(Math.abs(perYr[0] - 0.5) < 1e-9 && Math.abs(perYr[1] - 0.3) < 1e-9 && Math.abs(perYr[2] - 0.25) < 1e-9 && Math.abs(perYr[3] - 0.28) < 1e-9, "perYr");

concept("agri.structures.fencing", { file: "structures/fencing", keyPrefix: "structures.fencing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of fence is most suitable for keeping chickens in a run?",
    options: [
      ["Hexagonal wire netting", "Correct: small mesh holds poultry."],
      ["Three strands of barbed wire", "Chickens walk straight between strands."],
      ["Two strands of plain wire", "Far too open for poultry."],
      ["A windbreak of tall trees", "A windbreak gives shelter but does not enclose birds."],
    ],
    answer: "A",
    explanation: "Poultry need a small mesh; hexagonal netting is the usual choice.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is bark removed from gum poles before they are treated with preservative?",
    options: [
      ["Bark stops the preservative entering the wood and shelters insects", "Correct."],
      ["Bark makes the poles far too heavy to carry out to the fence line", "Weight is not the reason."],
      ["Bark contains a poison that harms livestock", "This is not the reason for debarking."],
      ["Bark makes the poles grow roots in the ground", "Cut poles do not root because of bark."],
    ],
    answer: "A",
    explanation: "Debarked, seasoned wood absorbs preservative well; bark blocks it and hides insects.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the function of **droppers** in a wire fence?",
    options: [
      ["To keep the wires evenly spaced between posts", "Correct: they hang on the wires."],
      ["To carry the weight of the fence into the ground", "Droppers do not reach the ground."],
      ["To tighten the wires", "A wire strainer tightens wire."],
      ["To earth an electric fence", "Earth rods do that."],
    ],
    answer: "A",
    explanation: "Droppers stop wires from spreading so animals cannot push between them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which tool is used to pull fencing wire tight before it is tied off?",
    options: [
      ["A wire strainer", "Correct."],
      ["A post-hole digger", "It digs holes for posts."],
      ["A crowbar", "A crowbar loosens and tamps soil."],
      ["A sledgehammer", "It drives standards and posts."],
    ],
    answer: "A",
    explanation: "The wire strainer grips the wire and tensions it.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An electric fence gives animals only a weak shock in the dry season, and long grass touches the bottom wire. What should the farmer do?",
    options: [
      ["Clear the grass from the wires and improve the earthing", "Correct: vegetation leaks current; dry soil earths poorly."],
      ["Connect the fence directly to mains electricity", "This is extremely dangerous and illegal."],
      ["Remove the insulators so that more current flows along the wire", "Without insulators current leaks to the posts."],
      ["Add strands of barbed wire alongside the electric wires", "This does not fix the electrical fault."],
    ],
    answer: "A",
    hints: ["The current must return through the ground to the earth rods."],
    explanation: "Vegetation touching the wire drains the pulse to the ground, and dry ground needs more or deeper earth rods.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which preservative treatment gives wooden posts the longest life?",
    options: [
      ["Pressure treatment in a closed cylinder", "Correct: preservative is forced deep into the wood."],
      ["Brushing preservative onto the surface", "It stays near the surface."],
      ["Charring the butt of each post in a fire", "Gives only limited protection."],
      ["Painting the posts white all over with ordinary paint", "Paint alone does not stop termites and rot in the ground."],
    ],
    answer: "A",
    hints: ["Which method gets the chemical deepest into the wood?"],
    explanation: "Pressure impregnation gives deep penetration and the longest life.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a disadvantage of a live hedge as a fence?",
    options: [
      ["It takes several years to grow into a stock-proof barrier", "Correct."],
      ["It must be bought as rolls of plants from a hardware shop in town", "Hedges are grown, not bought as rolls."],
      ["It rusts quickly", "Plants do not rust."],
      ["It gives no shelter from wind", "Hedges do give shelter."],
    ],
    answer: "A",
    hints: ["Think of time and growth."],
    explanation: "Hedges are cheap and long-lived but slow to establish and need trimming.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A farmer plans to divide a large grazing area into many small paddocks and move his cattle every few days. Which fence would be most suitable for the internal divisions?",
    options: [
      ["A portable electric fence", "Correct: cheap, quick to move and suited to rotational grazing."],
      ["Concrete posts with barbed wire", "Costly and permanent; cannot be moved."],
      ["Diamond-mesh security fencing", "Very costly for large areas."],
      ["A live hedge", "Too slow to establish and cannot be moved."],
    ],
    answer: "A",
    hints: ["The fences must be cheap and easy to move."],
    explanation: "Electric fences are cheap per kilometre and can be moved, making rotational and strip grazing practical.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Galvanising protects steel wire from rusting by coating it with zinc.",
    answer: true,
    explanation: "True. The zinc layer protects the steel.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Offcuts of posts treated with preservative are safe to burn as cooking fuel.",
    answer: false,
    explanation: "False. Burning treated timber can release toxic substances; dispose of offcuts safely.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each fence type with a suitable use.",
    pairs: [
      ["Barbed wire", "Boundary fence for cattle"],
      ["Goat netting", "Keeping goats out of a garden"],
      ["Electric fence", "Strip grazing on a dairy farm"],
      ["Windbreak", "Shelter for an orchard from strong wind"],
      ["Hexagonal netting", "Poultry run"],
    ],
    explanation: "Choose the fence for the animal and purpose.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each fencing tool with its use.",
    pairs: [
      ["Wire strainer", "Tensions the wire"],
      ["Fencing pliers", "Cut and twist wire, pull staples"],
      ["Post-hole digger", "Digs holes for posts"],
      ["Sledgehammer", "Drives steel standards into the ground"],
    ],
    explanation: "Know the job of each tool.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Before treatment, wooden posts are debarked and {{blank:a}} (dried), and the part that goes into the ground can be soaked in preservative, which is called {{blank:b}} treatment.",
    blanks: [
      { id: "a", accepted: ["seasoned", "dried", "air-dried"] },
      { id: "b", accepted: ["butt"] },
    ],
    explanation: "Seasoned; butt treatment.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Assume a steel standard costs US\\$6.00 and lasts about 20 years. Calculate its cost per year of life.",
    value: steelPerYr, prefix: "US$", answer: "0.30", wrong: [20 / 6, 120],
    explanation: `US\\$6.00 ÷ 20 = US\\$${steelPerYr.toFixed(2)} per year.`,
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "A fence needs 80 posts. Assume treated poles cost US\\$3.60 each and last 12 years, while untreated poles cost US\\$1.20 each and last 3 years. Calculate how much money the farmer saves on posts over 12 years by using treated poles.",
    value: saving12, prefix: "US$", wrong: [80 * (3.6 - 1.2), untreated12],
    hints: ["Untreated poles must be replaced several times in 12 years.", "Compare the total cost of each choice."],
    explanation: `Treated: 80 × US\\$3.60 = US\\$${treated12}. Untreated: bought 12 ÷ 3 = 4 times: 80 × US\\$1.20 × 4 = US\\$${untreated12}. Saving = US\\$${untreated12} − US\\$${treated12} = US\\$${saving12}. Comparing one purchase only (80 × US\\$2.40) wrongly suggests treated poles cost more.`,
    workedSolution: `1. Treated poles: 80 × US\\$3.60 = US\\$${treated12} (one set lasts 12 years).\n2. Untreated poles are replaced every 3 years: 12 ÷ 3 = 4 sets.\n3. Untreated cost = 80 × US\\$1.20 × 4 = US\\$${untreated12}.\n4. Saving = US\\$${untreated12} − US\\$${treated12} = US\\$${saving12}.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the device that supplies the short, high-voltage pulses to an electric fence.",
    accepted: ["energiser", "energizer", "fence energiser", "fence energizer", "controller", "fence controller", "charger"],
    explanation: "An **energiser**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a cattle farmer should fence the farm into paddocks.",
    hints: ["Think of grazing and of managing the herd."],
    points: [
      "Paddocks allow rotational grazing.",
      "So pastures rest and regrow / overgrazing and erosion are reduced.",
      "Different classes of stock can be kept apart (e.g. bulls from young heifers, weaners, sick animals).",
      "So breeding is controlled / disease spread is reduced.",
    ],
    modelAnswer: "Paddocks let the farmer graze one area while others rest, so the grass regrows and overgrazing and erosion are avoided. They also let him keep classes of stock apart, for example the bull away from young heifers or sick animals away from the herd, which controls breeding and reduces the spread of disease.",
    explanation: "Purpose plus benefit.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A farmer near Chinhoyi compares posts for a new boundary fence.\n\n${P_TABLE}`,
    hints: ["Cost per year = cost ÷ life."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the cost per year of life of a pressure-treated gum pole.",
        value: perYr[2], prefix: "US$", answer: "0.25", wrong: [POSTS[2][2] / POSTS[2][1], POSTS[2][1]],
        explanation: `US\\$4.50 ÷ 18 = US\\$${perYr[2].toFixed(2)} per year.`,
      }),
      P.mcq({
        label: "(b)", stem: "Which post has the lowest cost per year of life?",
        options: [
          ["Pressure-treated gum pole", "Correct: US\\$0.25 per year."],
          ["An untreated gum pole", "US\\$0.50 per year, the highest."],
          ["A butt-soaked gum pole", "US\\$0.30 per year."],
          ["Steel standard", "US\\$0.28 per year."],
        ],
        answer: "A",
        explanation: "Per year: untreated 0.50, butt-soaked 0.30, pressure-treated 0.25, steel 0.28.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the untreated gum pole has such a short life.",
        points: ["Termites eat the wood.", "Fungi cause rot, especially in the moist soil at ground level."],
        explanation: "Termites and rot.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Apart from cost per year, suggest **three** reasons why the farmer might still choose steel standards.",
        points: ["Fire-proof (veld fires do not destroy them).", "Termite-proof / do not rot.", "Quick to drive in / light to transport / no chemicals to handle."],
        explanation: "Other advantages of steel.",
      }),
    ],
    explanation: "Compare cost per year of life, then other properties of the materials.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "Nyasha has a homestead near Mutare with a vegetable garden, goats, a small herd of cattle and free-range chickens. Goats keep getting into the garden, and strong winds damage her young fruit trees.",
    hints: ["Match each fence to the animal or problem."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Suggest a suitable fence to keep goats out of the garden and give a reason.",
        points: ["Goat (woven) netting / mesh fence (with a strand of barbed wire on top).", "Small openings stop goats pushing or climbing through."],
        explanation: "Mesh for small stock.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe how a windbreak would protect the fruit trees.",
        points: ["Rows of tall trees or shrubs planted across the prevailing wind.", "They slow the wind over the land behind, reducing branch, flower and fruit damage and water loss."],
        explanation: "Windbreak placement and effect.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State **two** advantages of using a live hedge around the homestead.",
        points: ["Cheap / grown from local plants.", "Long-lasting / gives shelter and shade / habitat for useful wildlife."],
        explanation: "Advantages of hedges.",
      }),
    ],
    explanation: "Choose fences for the animals and problems on the farm.",
  });

  b.card("CONCEPT", "Purposes of fencing", "Control livestock, paddocks for rotational grazing, separate stock, disease control, protect crops, boundaries, security, shelter.");
  b.card("FACT", "Fence types and uses", "Barbed wire: cattle. Mesh/netting: goats, sheep, poultry. Electric: rotational grazing. Hedges and windbreaks: boundaries and shelter.");
  b.card("CONCEPT", "How an electric fence works", "Energiser sends pulses along insulated wire; an animal touching it completes the circuit through the ground to earth rods.");
  b.card("DEFINITION", "Dropper", "Light stay fixed to the wires between posts to keep them spaced; does not reach the ground.");
  b.card("FACT", "Fencing tools", "Wire strainer, fencing pliers, wire cutters, post-hole digger, crowbar, sledgehammer, tape and pegs, gloves.");
  b.card("CONCEPT", "Treating wooden posts", "Debark and season; then pressure treatment, hot-and-cold tank, butt soaking, brushing or charring.");
  b.card("FACT", "Preservative types", "Water-borne (e.g. copper chrome arsenate, pressure-applied) and oil-type (e.g. creosote).");
  b.card("CONCEPT", "Protecting metal", "Galvanising (zinc), rust-inhibiting paint, tar or bitumen on the buried part.");
  b.card("CONCEPT", "Steel vs wooden posts", "Steel: long life, fire- and termite-proof, costly. Wood: cheap, local, needs treatment, burns.");
});
