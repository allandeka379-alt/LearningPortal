// Slice W2a: fence construction, anchors and fencing calculations.
import { concept, P, fence, field, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: posts for a square 1 ha paddock, posts every 5 m.
const sq = field(100, 100);
const Fsq = fence({ perimeterM: sq.perimeterM, postSpacingM: 5, strands: 4 });
check(sq.ha === 1 && Fsq.posts === 80, "sq");
// Num: open straight fence.
const openSpans = 240 / 8;
const openPosts = openSpans + 1;
check(openSpans === 30 && openPosts === 31, "open");

// Structured: paddock 180 m x 120 m.
const pad = field(180, 120);
const F = fence({ perimeterM: pad.perimeterM, postSpacingM: 12, strands: 5, rollM: 400, droppersPerSpan: 2 });
check(pad.perimeterM === 600 && F.posts === 50 && F.wireM === 3000 && F.rolls === 8 && F.droppers === 100, "pad");
const PRICES = { post: 4.5, roll: 55, dropper: 0.6 };
const cost = F.posts * PRICES.post + F.rolls * PRICES.roll + F.droppers * PRICES.dropper;
check(Math.abs(cost - 725) < 1e-9, "cost");

// Calc: rolls for a 220 m x 80 m paddock, 4 strands, 450 m rolls.
const pad13 = { lengthM: 220, widthM: 80, rollM: 450 };
const field13 = field(pad13.lengthM, pad13.widthM);
const F13 = fence({ perimeterM: field13.perimeterM, postSpacingM: 10, strands: 4, rollM: pad13.rollM });
check(field13.perimeterM === 600 && F13.wireM === 2400 && F13.rolls === 6, "F13");

// Calc: wire for a goat camp with netting and barbed strands.
const camp = field(45, 35);
const netRolls = Math.ceil(camp.perimeterM / 50 - 1e-9);
const barbM = camp.perimeterM * 2;
check(camp.perimeterM === 160 && netRolls === 4 && barbM === 320, "camp");

concept("agri.structures.fence-construction", { file: "structures/fence-construction", keyPrefix: "structures.fence-construction" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where must straining posts be placed in a wire fence?",
    options: [
      ["At corners, ends, gates and sharp bends", "Correct."],
      ["Only in the middle of each straight run", "Corners and ends carry the greatest pull."],
      ["Between every pair of droppers along the whole fence", "Droppers sit between line posts."],
      ["Only where the soil is too sandy to hold ordinary posts", "Soil type does not decide their position."],
    ],
    answer: "A",
    explanation: "Wire is strained from and tied off on straining posts at corners, ends, gates and changes of direction.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main function of an anchor (brace) on a corner post?",
    options: [
      ["To resist the pull of the wires on the post", "Correct."],
      ["To hold the droppers in place", "Droppers are fixed to the wires."],
      ["To earth an electric fence", "Earth rods do that."],
      ["To keep termites away from the wood of the post", "Anchors do not protect against termites."],
    ],
    answer: "A",
    explanation: "Tight wires pull the corner post; the anchor resists that pull so the wires stay tight.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In what order are these steps carried out when building a fence?",
    options: [
      ["Set straining posts, run guide wire, set line posts, strain wires", "Correct."],
      ["Strain wires, set line posts, set straining posts, run guide wire", "Wire cannot be strained before posts exist."],
      ["Set line posts, set straining posts, strain wires, run guide wire", "Straining posts and anchors come first."],
      ["Run guide wire, strain wires, set straining posts, set line posts", "The guide wire is run between the straining posts."],
    ],
    answer: "A",
    explanation: "Straining posts and anchors first; guide wire to align line posts; then run out and strain the wires.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why should barbed wire be unrolled from a turning coil rather than pulled off a coil lying still on the ground?",
    options: [
      ["Pulling it off a still coil kinks the wire", "Correct: kinks weaken the wire and stop it straining evenly."],
      ["Unrolling makes the wire longer", "The length does not change."],
      ["Pulling it removes the zinc coating completely, so it rusts", "The coating is not removed by pulling."],
      ["Barbs fall off when the coil is still", "Barbs are firmly twisted on."],
    ],
    answer: "A",
    hints: ["Think of what happens to a hosepipe pulled off a coil sideways."],
    explanation: "Kinked wire is weaker and strains unevenly; unrolling keeps it straight.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which is a disadvantage of a buried (dead man) anchor?",
    options: [
      ["It slips in loose, wet soil and is hard to inspect", "Correct."],
      ["It uses more posts than any other anchor", "A box brace uses more posts."],
      ["It sticks up above the ground and gets in the way of tractors and implements", "It is buried, so little is above ground."],
      ["It can only be used with electric fences", "It is used with ordinary wire fences."],
    ],
    answer: "A",
    hints: ["What can you not see once it is buried?"],
    explanation: "Buried anchors are cheap and out of the way, but their tie wire may rust unseen and they slip in soft ground.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A straight boundary fence is 240 m long with posts every 8 m, including a post at each end. How many posts are needed?",
    options: [
      ["31", "Correct: 30 spans need 31 posts on an open fence."],
      ["30", "That is the number of spans; an open fence needs one more post."],
      ["29", "This leaves one end without a post."],
      ["1,920", "This multiplies instead of dividing."],
    ],
    answer: "A",
    hints: ["Is the fence a closed loop or open?"],
    explanation: "240 ÷ 8 = 30 spans; an open fence needs spans + 1 = 31 posts.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Six months after a fence was built, the wires near one corner are slack and the corner post leans towards the fence line. What is the most likely cause?",
    options: [
      ["The corner post was poorly anchored", "Correct: the pull of the wires moved it."],
      ["Too many droppers were fitted", "Droppers do not loosen the wire."],
      ["The wire was galvanised instead of being left plain", "Galvanising prevents rust; it does not cause slack."],
      ["The line posts were too far apart", "This would not make the corner post lean."],
    ],
    answer: "A",
    hints: ["Which force acts on a corner post?"],
    explanation: "An unanchored or loosely set straining post gives way to the wire's pull, so the wires slacken.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A wire strainer is used to tighten fence wires.",
    answer: true,
    explanation: "True. The wire is strained and then tied off on a straining post.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "On a closed fence round a paddock, the number of posts is one more than the number of spans.",
    answer: false,
    explanation: "False. On a closed loop the number of posts equals the number of spans; only an open fence needs one extra post.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each anchor with its description.",
    pairs: [
      ["Box (H) brace", "Second post with a top rail and a twisted diagonal wire"],
      ["Diagonal stay", "Pole from high on the post down to a block in the ground"],
      ["Dead man", "Stone or log buried behind the post and wired to it"],
      ["Concrete footing", "Post set in a block of concrete"],
    ],
    explanation: "Know how each anchor is built.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "The intermediate posts between straining posts are called {{blank:a}} posts, and the distance between two neighbouring posts is called a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["line", "intermediate"] },
      { id: "b", accepted: ["span"] },
    ],
    explanation: "Line posts; span.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A square paddock has an area of 1 ha (100 m × 100 m). How many posts are needed for a fence round it with posts every 5 m?",
    value: Fsq.posts, unit: "posts", tol: 0, wrong: [Fsq.posts + 1, 100 / 5],
    explanation: `Perimeter = 4 × 100 = ${sq.perimeterM} m; posts = ${sq.perimeterM} ÷ 5 = ${Fsq.posts} (a closed fence).`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A paddock is ${pad13.lengthM} m by ${pad13.widthM} m. It is to be fenced with 4 strands of barbed wire. How many ${pad13.rollM} m rolls of barbed wire are needed? Round UP to whole rolls.`,
    value: F13.rolls, tol: 0, wrong: [Math.floor(F13.wireM / pad13.rollM), Math.ceil(field13.perimeterM / pad13.rollM - 1e-9)],
    hints: ["Wire = perimeter × strands."],
    explanation: `Perimeter = 2 × (${pad13.lengthM} + ${pad13.widthM}) = ${field13.perimeterM} m; wire = ${field13.perimeterM} × 4 = ${F13.wireM.toLocaleString("en-GB")} m; ${F13.wireM.toLocaleString("en-GB")} ÷ ${pad13.rollM} = ${round(F13.wireM / pad13.rollM, 2)}, so ${F13.rolls} rolls. Forgetting the 4 strands gives only ${Math.ceil(field13.perimeterM / pad13.rollM - 1e-9)} rolls.`,
    workedSolution: `1. Perimeter = 2 × (${pad13.lengthM} + ${pad13.widthM}) = ${field13.perimeterM} m.\n2. Wire = ${field13.perimeterM} × 4 strands = ${F13.wireM.toLocaleString("en-GB")} m.\n3. Rolls = ${F13.wireM.toLocaleString("en-GB")} ÷ ${pad13.rollM} = ${round(F13.wireM / pad13.rollM, 2)}, rounded up to ${F13.rolls}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A goat camp measures 45 m by 35 m. It is fenced with woven netting sold in 50 m rolls, with 2 strands of barbed wire along the top. Calculate the length of barbed wire needed, in m.",
    value: barbM, unit: "m", tol: 0, wrong: [camp.perimeterM, 45 * 35 * 2],
    hints: ["Find the perimeter first."],
    explanation: `Perimeter = 2 × (45 + 35) = ${camp.perimeterM} m; barbed wire = ${camp.perimeterM} × 2 = ${barbM} m. (Netting: ${camp.perimeterM} ÷ 50 = ${camp.perimeterM / 50}, so ${netRolls} rolls.)`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the strong post at a corner or end of a fence from which the wires are tightened.",
    accepted: ["straining post", "strainer post", "strainer", "corner post", "anchor post", "end post"],
    keywords: { any: ["strain"] },
    explanation: "A **straining post**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** routine maintenance tasks for a farm boundary fence.",
    hints: ["Wires, posts, vegetation, gates."],
    points: [
      "Patrol the fence regularly (and after storms).",
      "Re-strain slack wires / join broken wires.",
      "Replace rotten, broken or termite-damaged posts and droppers / check anchors.",
      "Clear vegetation along the line (firebreak) / repair gates and close gaps under the fence.",
    ],
    modelAnswer: "Walk the fence regularly, especially after storms; re-strain slack wires and join any broken ones; replace rotten or termite-damaged posts and broken droppers and check that anchors are firm; and clear grass and bushes along the line, which also makes a firebreak, while repairing gates and filling gaps where animals have dug under.",
    explanation: "Specific tasks.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `Farai plans to fence a rectangular paddock 180 m long and 120 m wide near Masvingo. The fence will have 5 strands of barbed wire, posts every 12 m and 2 droppers in each span. Assume these prices:\n\n${table(["Item", "Price (US\\$)"], [["Post", PRICES.post.toFixed(2)], ["Roll of barbed wire (400 m)", PRICES.roll.toFixed(2)], ["Dropper", PRICES.dropper.toFixed(2)]])}`,
    hints: ["Posts on a closed fence = perimeter ÷ spacing.", "Round rolls UP."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the perimeter of the paddock, in m.",
        value: pad.perimeterM, unit: "m", tol: 0, wrong: [pad.m2, 300],
        explanation: `2 × (180 + 120) = ${pad.perimeterM} m.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the number of posts needed.",
        value: F.posts, unit: "posts", tol: 0, wrong: [F.posts + 1, F.posts * 2],
        explanation: `${pad.perimeterM} ÷ 12 = ${F.posts} posts (closed fence).`,
      }),
      P.num({
        label: "(c)", stem: "Calculate the number of droppers needed.",
        value: F.droppers, tol: 0, wrong: [F.posts, F.droppers + 2],
        explanation: `${F.spans} spans × 2 = ${F.droppers} droppers.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Calculate the number of rolls of barbed wire needed.",
        value: F.rolls, tol: 0, wrong: [Math.floor(F.wireM / 400), 2],
        explanation: `${pad.perimeterM} × 5 = ${F.wireM.toLocaleString("en-GB")} m; ÷ 400 = ${F.wireM / 400}, so ${F.rolls} rolls.`,
      }),
      P.num({
        label: "(e)", marks: 2, stem: "Calculate the total cost of the posts, wire and droppers.",
        value: cost, prefix: "US$", wrong: [F.posts * PRICES.post + (F.wireM / 400) * PRICES.roll + F.droppers * PRICES.dropper, F.posts * PRICES.post + F.rolls * PRICES.roll],
        explanation: `Posts ${F.posts} × US\\$4.50 = US\\$${F.posts * PRICES.post}; wire ${F.rolls} × US\\$55 = US\\$${F.rolls * PRICES.roll}; droppers ${F.droppers} × US\\$0.60 = US\\$${F.droppers * PRICES.dropper}; total US\\$${cost}.`,
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why the four corner posts need anchors.",
        points: ["The strained wires pull each corner post inwards along both fence lines.", "Without an anchor the post leans or lifts, so the wires slacken and cattle push through."],
        explanation: "Anchors resist wire tension.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Describe how Farai should set the line posts in a straight line at the correct spacing.",
        points: ["Set and anchor the straining posts first.", "Run a guide wire tightly between the straining posts.", "Measure the spacing (12 m) along the guide wire and set each line post upright against it, ramming the soil firmly."],
        explanation: "Guide wire method.",
      }),
    ],
    explanation: "Closed fence: posts = perimeter ÷ spacing; wire = perimeter × strands; rolls up; then cost and construction.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A farmer must choose between a box (H) brace and a buried (dead man) anchor for the corners of a new cattle fence on a clay loam soil. Discuss the advantages and disadvantages of each and recommend one.",
    hints: ["Compare strength, cost, materials and inspection.", "Use the soil type."],
    points: [
      "Box brace: very strong and stable, suited to main corners and gates.",
      "Box brace: uses extra posts, rail and wire; more labour and cost.",
      "Dead man: cheap, uses a stone or log; little above ground.",
      "Dead man: tie wire may rust underground unseen; holds poorly in loose/wet soil; hard to inspect.",
      "Clay loam is firm, which helps both, but heavy cattle pressure needs strength.",
      "Judgement: box braces for the main corners and gates; dead men may do on lighter-strain points if cost is a problem.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "A box brace is the strongest anchor: the second post, the top rail and the twisted diagonal wire spread the pull of the wires, so the corner stays upright even when cattle lean on the fence. However, it needs an extra post, a rail and wire, and more labour, so it costs more. A buried dead man is cheap, using a stone or log on the farm, and nothing sticks up to get in the way, but its wire can rust unseen and it can slip, especially if the soil is wet or loose, and it is hard to check. On a firm clay loam either can work, but because cattle put heavy pressure on fences and corners carry the greatest strain, I recommend box braces at the corners and gates, with cheaper anchors only where the strain is lighter.",
    explanation: "Weigh both, use the situation, recommend.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "At the corner of a new cattle fence near Hwange, a straining post is joined to a second post about 2.5 m away by a horizontal rail at the top. A wire runs diagonally from the top of the second post to the bottom of the straining post and is twisted tight. After a season, another corner of the same fence, which had no such structure, is leaning and its wires are slack.",
    hints: ["Which force acts on corner posts?"],
    parts: [
      P.short({
        label: "(a)", stem: "Name the type of anchor described.",
        accepted: ["box brace", "H brace", "H-brace", "box (H) brace", "box anchor", "brace"],
        keywords: { any: ["brace"] },
        explanation: "A box (H) brace.",
      }),
      P.mcq({
        label: "(b)", stem: "Which posts should be set first when building the fence?",
        options: [
          ["The straining posts with their anchors", "Correct: the wire is strained between them."],
          ["The line posts along the fence", "They are lined up between the straining posts afterwards."],
          ["The gate posts last of all", "Gate posts are straining posts and go in first."],
          ["The droppers between the posts", "Droppers are fitted after the wire is strained."],
        ],
        answer: "A",
        explanation: "Straining posts and anchors come first, then the guide wire and line posts.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain how the twisted diagonal wire helps the corner post resist the pull of the fence wires.",
        points: ["The pull of the fence wires tries to tip the straining post towards the fence.", "The tight diagonal wire and rail transfer this pull to the second post and the ground, so the straining post cannot lean."],
        explanation: "Bracing spreads the load.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **two** reasons why the unanchored corner is leaning.",
        points: ["There was no anchor to resist the pull of the strained wires.", "The post was not set deep enough / not rammed firmly / the soil was loose or wet / the post rotted."],
        explanation: "Lack of anchoring and poor setting.",
      }),
    ],
    explanation: "Anchors let straining posts withstand the pull of tight wires.",
  });

  b.card("DEFINITION", "Straining post", "Strong, deeply set post at corners, ends, gates and changes of direction from which wires are strained and tied off.");
  b.card("DEFINITION", "Anchor (brace)", "Structure that holds a straining post against the pull of the strained wires.");
  b.card("CONCEPT", "Types of anchor", "Box (H) brace, diagonal stay, buried dead man, concrete footing.");
  b.card("CONCEPT", "Steps in building a wire fence", "Mark and clear line → straining posts and anchors → guide wire → line posts → run out and strain wire → fix to posts → droppers → gates.");
  b.card("FORMULA", "Posts on a closed fence", "Posts = perimeter ÷ post spacing (posts = spans).");
  b.card("FORMULA", "Posts on an open (straight) fence", "Posts = length ÷ spacing + 1.");
  b.card("FORMULA", "Fence wire", "Wire (m) = perimeter × strands; rolls = wire ÷ roll length, rounded UP.");
  b.card("CONCEPT", "Fence maintenance", "Patrol, re-strain, join broken wire, replace posts and droppers, check anchors, clear vegetation, repair gates.");
  b.card("FACT", "Safety when straining wire", "Wear gloves and eye protection; a snapping wire whips back with great force.");
});
