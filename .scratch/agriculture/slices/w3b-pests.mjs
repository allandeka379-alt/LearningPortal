// Slice W3b: crop pests: feeding groups, metamorphosis, named pests, spread and scouting.
import { concept, P, pct, round, check, table } from "../lib.mjs";

// Num: scouting 18 of 80 plants.
const scout = pct(18, 80);
check(Math.abs(scout - 22.5) < 1e-9, "scout");
// Structured: five scouting points of 20 plants.
const POINTS = [["1", 3], ["2", 6], ["3", 2], ["4", 7], ["5", 4]];
const S_TABLE = table(["Scouting point", "Plants inspected", "Plants with fresh damage"], POINTS.map(([p, n]) => [p, 20, n]));
const sDamaged = POINTS.reduce((s, [, n]) => s + n, 0);
const sPct = pct(sDamaged, 20 * POINTS.length);
check(sDamaged === 22 && Math.abs(sPct - 22) < 1e-9, "struct scout");

concept("agri.protection.pests", { file: "protection/pests", keyPrefix: "protection.pests" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these crop pests feeds by **piercing and sucking**?",
    options: [
      ["Aphid", "Correct: aphids pierce the plant with a stylet and suck sap."],
      ["Locust", "Locusts bite and chew leaves with strong mandibles."],
      ["Cutworm", "Cutworms chew through seedlings at ground level."],
      ["Termite", "Termite workers chew roots and stems."],
    ],
    answer: "A",
    explanation: "Piercing and sucking pests (aphids, whiteflies, stink bugs) have a needle-like stylet; biting and chewing pests have mandibles.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which sequence shows **complete** metamorphosis?",
    options: [
      ["Egg → larva → pupa → adult", "Correct: four stages with a pupa."],
      ["Egg → nymph → adult", "This is incomplete metamorphosis."],
      ["Egg → pupa → larva → adult", "The pupa comes after the larva, not before it."],
      ["Egg → nymph → pupa → adult", "Nymphs belong to incomplete metamorphosis, which has no pupa."],
    ],
    answer: "A",
    explanation: "Complete metamorphosis has four stages (egg, larva, pupa, adult), as in moths and weevils.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "In which pest do larvae survive the dry season resting inside old, dry maize stalks?",
    options: [
      ["Maize stalk borer", "Correct: larvae rest in old stalks and pupate before the next rains."],
      ["Aphids", "Aphids are sap feeders that live on growing plants."],
      ["Red locust", "Locusts lay their egg pods in the soil."],
      ["Grain weevil", "Weevils develop inside stored grain."],
    ],
    answer: "A",
    explanation: "Stalk borer larvae spend the dry season in crop residues, so destroying old stalks after harvest breaks the life cycle.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which stage of the fall armyworm damages the maize crop?",
    options: [
      ["The larva", "Correct: the caterpillars eat the leaves, the funnel and sometimes the cob."],
      ["The pupa", "The pupa rests in the soil and does not feed."],
      ["The adult moth", "The moth lays eggs; it does not eat the maize leaves."],
      ["The egg mass", "Eggs do not feed; they hatch into larvae."],
    ],
    answer: "A",
    explanation: "In complete metamorphosis the larva is usually the damaging stage; the pupa does not feed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A crop has sticky leaves with patches of black sooty mould but no holes. To which feeding group does the pest most likely belong?",
    options: [
      ["Piercing and sucking", "Correct: sap feeders excrete honeydew, on which sooty mould grows."],
      ["Biting and chewing", "Chewing pests leave holes and ragged edges."],
      ["Boring into the stem", "Borers make tunnels, not sticky deposits on leaves."],
      ["Feeding on the roots", "Root feeders cause wilting, not honeydew."],
    ],
    answer: "A",
    explanation: "Aphids and whiteflies excrete sugary honeydew; a black sooty mould fungus grows on it.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Young maize plants have a withered central shoot (\"dead heart\"). What causes this when maize stalk borer is the pest?",
    options: [
      ["Larvae bore into the stem and kill the growing point", "Correct."],
      ["Adult moths suck sap from the youngest unrolled leaves", "Stalk borer moths do not feed on maize."],
      ["Eggs laid on the leaves poison the funnel tissue", "The eggs cause no damage."],
      ["Pupae in the soil feed on the roots of the plant", "Pupae do not feed."],
    ],
    answer: "A",
    hints: ["Which stage feeds, and where?"],
    explanation: "Stalk borer larvae move from the funnel into the stem; destroying the growing point kills the central leaves (dead heart).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which feature helps a farmer recognise a **fall armyworm** larva in the field?",
    options: [
      ["A pale inverted Y on the head", "Correct: with four dark spots in a square near the tail."],
      ["A long snout with antennae on it", "This describes an adult weevil."],
      ["A pair of large hind legs for jumping", "This describes a grasshopper or locust."],
      ["A soft green body that is fixed to the leaf", "This sounds like an aphid or scale insect."],
    ],
    answer: "A",
    hints: ["Look at the head and the tail end of the caterpillar."],
    explanation: "Fall armyworm larvae have a pale inverted Y on the head and four dark spots in a square near the tail end.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Stored maize grain has small round holes, fine powder in the bag and a few grains that are hollow inside. Which conclusion is best supported?",
    options: [
      ["Weevil larvae developed inside the grains", "Correct: adults chewed out, leaving exit holes."],
      ["Termites entered the store through the floor", "Termites attack wood and plants, not grain this way."],
      ["Aphids sucked the sap from the grains in the field", "Aphids feed on living plants, not dry grain."],
      ["Fall armyworm larvae fed on the dry grains in the bag", "Fall armyworm attacks the growing crop."],
    ],
    answer: "A",
    hints: ["Which pest completes its whole life cycle inside a grain?"],
    explanation: "Weevil eggs are laid in grains; the larva eats the inside and pupates there, then the adult leaves a round exit hole.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why can aphid numbers on a crop rise very quickly in warm weather?",
    options: [
      ["Females produce live young without mating", "Correct: no males or eggs are needed, so generations are short."],
      ["Each aphid pupates for many weeks in the soil", "Aphids have no pupa; a long pupal stage would slow increase."],
      ["Adults lay egg pods deep in the soil", "This describes locusts."],
      ["The larvae are protected inside the stem", "This describes borers; aphids live on the plant surface."],
    ],
    answer: "A",
    hints: ["How do aphids reproduce in the warm season?"],
    explanation: "In warm weather female aphids give birth to live nymphs without mating, so colonies multiply in days.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Termites develop by complete metamorphosis, with a pupal stage.",
    answer: false,
    explanation: "False. Termites have incomplete metamorphosis: egg, nymph, adult.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each pest with the damage it causes.",
    pairs: [
      ["Cutworm", "Seedlings cut off at ground level at night"],
      ["Maize stalk borer", "Rows of small holes in leaves and dead heart"],
      ["Aphids", "Curled, sticky leaves and spread of viruses"],
      ["American bollworm", "Holes bored into cotton bolls and tomato fruits"],
      ["Grain weevil", "Round exit holes in stored grain"],
    ],
    explanation: "Each pest has typical damage that helps you identify it.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "In incomplete metamorphosis an insect develops from egg to {{blank:a}} to adult; the young stage of a locust is often called a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["nymph", "nymphs"] },
      { id: "b", accepted: ["hopper", "hoppers"] },
    ],
    explanation: "Egg → nymph → adult; locust nymphs are hoppers.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the resting, non-feeding stage between larva and adult in complete metamorphosis.",
    accepted: ["pupa", "pupae", "the pupa", "pupal stage", "chrysalis"],
    explanation: "The **pupa**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of insect pest whose larva develops inside stored maize grains, leaving round exit holes.",
    accepted: ["weevil", "weevils", "grain weevil", "maize weevil", "grain weevils", "maize weevils"],
    keywords: { any: ["weevil"] },
    explanation: "The **grain (maize) weevil**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Farai inspects 80 young cotton plants and finds aphid colonies on 18 of them. Calculate the percentage of plants infested, to one decimal place.",
    value: scout, unit: "%", tol: 0.05, answer: "22.5", wrong: [round((80 / 18) * 100, 1), 18],
    explanation: `18 ÷ 80 × 100 = ${scout}%. Dividing the other way (80 ÷ 18) gives a number above 100%, which is impossible.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the life cycle of the maize stalk borer, showing how the pest survives from one season to the next.",
    hints: ["Start with the moth laying eggs and finish with moths emerging in the new season."],
    points: [
      "The moth lays eggs in batches between the leaf sheath and the stem.",
      "Young larvae feed in the funnel (rows of small holes); older larvae bore into the stem (dead heart, tunnels).",
      "At the end of the season larvae rest in the old dry stalks through the dry season.",
      "They pupate, and moths emerge early in the next rains to lay eggs on the new crop.",
    ],
    modelAnswer: "The moth lays batches of eggs between the leaf sheath and the stem. The larvae feed in the funnel, making rows of small holes, then bore into the stem. After harvest the larvae rest in the old dry stalks through the dry season, pupate in spring and the moths emerge early in the rains to attack the new crop.",
    explanation: "Egg, larva in funnel and stem, resting larva in stalks, pupa, moth.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which piercing and sucking pests reduce the yield of a crop.",
    hints: ["Think of what is removed from the plant and what the insect may carry."],
    points: [
      "They remove sap (sugars and water) from the plant.",
      "So less food for growth: leaves curl and yellow, plants are stunted or wilt.",
      "They transmit viruses from diseased plants (e.g. aphids).",
      "Virus diseases (or sooty mould on honeydew, which shades leaves) reduce photosynthesis and yield.",
    ],
    modelAnswer: "Sucking pests such as aphids remove sap, so the plant loses sugars and water and its leaves curl and it is stunted. They also carry viruses from plant to plant, and the virus disease, like the sooty mould growing on their honeydew, cuts photosynthesis and yield.",
    explanation: "Identify each way, then explain its effect on yield.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Thandeka scouts her 3-week-old maize near Masvingo for fall armyworm. At each point she looks for ragged holes in the leaves and wet, sawdust-like droppings in the funnel.\n\n${S_TABLE}`,
    hints: ["% infested = damaged plants ÷ plants inspected × 100, using the totals.", "Think about how the pest's numbers change from week to week."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage of all the inspected plants that had fresh damage.",
        value: sPct, unit: "%", tol: 0, wrong: [round(sDamaged / POINTS.length, 1), sDamaged * 5],
        explanation: `Damaged = 3 + 6 + 2 + 7 + 4 = ${sDamaged}; inspected = 5 × 20 = 100; ${sDamaged} ÷ 100 × 100 = ${sPct}%.`,
      }),
      P.short({
        label: "(b)", stem: "State the feeding group to which the fall armyworm larva belongs.",
        accepted: ["biting and chewing", "chewing", "biting", "biting/chewing", "chewing and biting"],
        keywords: { any: ["chew", "biting"] },
        explanation: "Ragged holes show a **biting and chewing** pest.",
      }),
      P.mcq({
        label: "(c)", stem: "Where does the fall armyworm pupate?",
        options: [
          ["In the soil", "Correct: the full-grown larva drops to the ground."],
          ["Inside the maize grain", "This is where weevils develop."],
          ["Inside old maize stalks", "This is where stalk borer larvae rest."],
          ["On the tassel of the plant", "It does not pupate there."],
        ],
        answer: "A",
        explanation: "Fall armyworm pupates in the soil.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why Thandeka inspects plants at five points spread across the field rather than only near the gate.",
        points: ["Pests are not spread evenly; some parts of a field are more infested than others.", "Sampling across the field gives a fair (representative) estimate of the whole crop."],
        explanation: "Representative sampling.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest why she should scout the field again within a week.",
        points: ["Eggs hatch and larvae grow fast, and moths keep arriving / new generations build up.", "Damage may rise above the action level; early detection lets control work on small larvae."],
        explanation: "Pest numbers change quickly.",
      }),
    ],
    explanation: "Calculate infestation from scouting data and explain how and why scouting is done.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: "Rudo grows tomatoes near Chipinge. She notices three problems: (1) some green fruits have round holes with a caterpillar inside; (2) many leaves are curled and sticky, with tiny green insects on their undersides; (3) a few plants have mottled, distorted leaves although she sees no insects on them.",
    hints: ["Problem 1 is a moth larva that bores into fruit.", "Link problem 3 to problem 2."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the pest most likely causing problem (1).",
        accepted: ["American bollworm", "bollworm", "African bollworm", "Helicoverpa armigera", "Helicoverpa", "tomato fruitworm"],
        keywords: { any: ["bollworm", "helicoverpa"] },
        explanation: "The **American bollworm** (Helicoverpa armigera) bores into tomato fruit.",
      }),
      P.mcq({
        label: "(b)", stem: "To which feeding group do the insects in problem (2) belong?",
        options: [
          ["Piercing and sucking", "Correct: aphids suck sap and excrete honeydew."],
          ["Biting and chewing", "There are no holes in the leaves."],
          ["Boring", "Borers live inside stems and fruits."],
          ["Root feeding", "The insects are on the leaves."],
        ],
        answer: "A",
        explanation: "Curled, sticky leaves with small insects underneath: aphids, which pierce and suck.",
      }),
      P.short({
        label: "(c)", stem: "State the type of metamorphosis shown by the pest in problem (1).",
        accepted: ["complete", "complete metamorphosis"],
        rejected: ["incomplete", "incomplete metamorphosis"],
        explanation: "Moths have **complete** metamorphosis.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Describe the life cycle of the pest in problem (1).",
        points: ["Eggs are laid singly on young leaves, buds and flowers.", "Larvae (caterpillars) feed on buds and flowers and bore into the fruit.", "Larvae drop to the soil and pupate there; adult moths emerge and fly to lay eggs."],
        explanation: "Egg, larva, pupa in soil, moth.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest how problem (3) may be linked to problem (2).",
        points: ["Aphids transmit (carry) viruses from plant to plant while feeding.", "Mottled, distorted leaves are symptoms of a virus disease, so the aphids probably spread it."],
        explanation: "Aphids as virus vectors.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain how problem (1) reduces Rudo's income.",
        points: ["Bored fruits rot or drop / cannot be sold.", "Damaged fruit is graded lower and fetches a lower price (and control adds costs)."],
        explanation: "Yield and quality losses.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Explain why a pest that bores inside the fruit is harder to control than one feeding openly on leaves.",
        points: ["Inside the fruit the larva is protected from contact sprays and natural enemies.", "So control must target eggs and young larvae before they enter the fruit (early scouting)."],
        explanation: "Boring pests are hidden.",
      }),
    ],
    explanation: "Identify pests from symptoms, describe a life cycle and explain the effects on yield and income.",
  });

  b.card("DEFINITION", "Pest", "An organism, usually an insect, that damages crops or stored produce and lowers yield, quality or income.");
  b.card("CONCEPT", "Three feeding groups of pests", "Biting and chewing (locusts, termites, armyworm); piercing and sucking (aphids, whiteflies); boring (stalk borer, bollworm, weevils).");
  b.card("DEFINITION", "Complete metamorphosis", "Egg → larva → pupa → adult; the larva differs from the adult. Moths, beetles, weevils.");
  b.card("DEFINITION", "Incomplete metamorphosis", "Egg → nymph → adult; the nymph looks like a small wingless adult. Locusts, aphids, termites.");
  b.card("FACT", "How does maize stalk borer survive the dry season?", "As resting larvae inside old dry maize stalks; moths emerge early in the next rains.");
  b.card("FACT", "How do you recognise a fall armyworm larva?", "Pale inverted Y on the head, four dark spots in a square near the tail; ragged holes and wet frass in the funnel.");
  b.card("FACT", "What do honeydew and sooty mould on leaves suggest?", "Sap-sucking pests such as aphids or whiteflies.");
  b.card("CONCEPT", "Ways pests harm crops", "Lower yield and quality, spread viruses and open wounds, kill seedlings, raise control costs, destroy stored grain.");
  b.card("CONCEPT", "Scouting", "Walk a W or zig-zag, inspect set numbers of plants at several points, record damage, calculate % infested, compare with the action level.", "% infested = plants infested ÷ plants inspected × 100.");
});
